import React, { Fragment, useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import './styles.scss';
// Model
import { ChatRoom } from '../../model/Chats';
import RoomItem from '../../components/RoomItem';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

function ChatListPage() {
  const history = useHistory();
  const { uid } = useAppSelector(state => state.user.userProfile);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    getChatrooms();
  }, []);

  const getChatrooms = async () => {
    const result: ChatRoom[] = [];
    const collection = await db.collection('Chatrooms').get();
    if (collection.docs.length) {
      const myRooms = collection.docs;
      if (myRooms.length) {
        myRooms.forEach(roomDoc => {
          const newData = roomDoc.data() as ChatRoom;
          newData.id = roomDoc.id;
          result.push(newData);
        });
      }
      setRooms(result);
    }
  };

  const filteredRoomsNotMine: ChatRoom[] = [];
  const filteredRoomsMine = rooms.filter(room => {
    if (room.authenticatedPeople.includes(uid)) return true;
    else {
      filteredRoomsNotMine.push(room);
      return false;
    }
  });

  return !rooms.length ? (
    <div>Loading</div>
  ) : (
    <Fragment>
      <ul>
        {filteredRoomsMine.map(room => (
          <RoomItem
            onClickNotLongPress={() => {
              history.push(`/chat/room/${room.id}`);
            }}
            onDelete={getChatrooms}
            key={room.id}
            item={room}
          />
        ))}
      </ul>
      {filteredRoomsNotMine.length > 0 && (
        <h3>메시지 권한 얻고 챗방을 활성화하세요</h3>
      )}
      <ul>
        {filteredRoomsNotMine.map(room => (
          <RoomItem
            onClickNotLongPress={() => {
              history.push(`/chat/room/${room.id}`);
            }}
            onDelete={getChatrooms}
            key={room.id}
            item={room}
          />
        ))}
      </ul>
    </Fragment>
  );
}

export default ChatListPage;

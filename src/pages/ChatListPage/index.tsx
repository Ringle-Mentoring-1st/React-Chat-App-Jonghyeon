import React, { Fragment, useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import './styles.scss';
// Model
import { ChatRoom } from '../../model/Chats';
import RoomItem from '../../components/RoomItem';
import { useHistory } from 'react-router-dom';

function ChatListPage() {
  const history = useHistory();
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

  return !rooms.length ? (
    <div>Loading</div>
  ) : (
    <Fragment>
      <ul>
        {rooms.map(room => (
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

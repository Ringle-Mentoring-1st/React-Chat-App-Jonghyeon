import React, { useEffect, useState } from 'react';
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
    const result: ChatRoom[] = [];
    db.collection('Chatrooms')
      .get()
      .then(collection => {
        const myRooms = collection.docs;
        if (myRooms.length) {
          myRooms.forEach(roomDoc => {
            const newData: ChatRoom = { title: '', password: '', id: '' };
            const roomData = roomDoc.data();
            newData.id = roomDoc.id;
            newData.title = roomData.title;
            newData.password = roomData.password;
            result.push(newData);
          });
        }
        setRooms(result);
      });
  }, []);

  return !rooms.length ? (
    <div>Loading</div>
  ) : (
    <ul>
      {rooms.map(room => (
        <RoomItem
          onClickNotLongPress={() => {
            history.push(`/chat/room/${room.id}`);
          }}
          key={room.id}
          item={room}
        />
      ))}
    </ul>
  );
}

export default ChatListPage;

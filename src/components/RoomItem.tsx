import React from 'react';
import { Link } from 'react-router-dom';
import { ChatRoom } from '../model/Chats';

interface RoomItemProps {
  item: ChatRoom;
}

function RoomItem({ item }: RoomItemProps) {
  return (
    <Link to={`/chat/room/${item.id}`}>
      <li key={item.id}>
        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            padding: 20,
            borderRadius: 16,
            margin: '0 12px 12px 12px',
            textAlign: 'left',
          }}
        >
          <h2>{item.title}</h2>
          <text>{item.id}</text>
        </div>
      </li>
    </Link>
  );
}

export default RoomItem;

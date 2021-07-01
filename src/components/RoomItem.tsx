import React from 'react';

import { ChatRoom } from '../model/Chats';
import useMouseBehaviors from '../utils/useMouseBehaviors';

interface RoomItemProps {
  onClickNotLongPress: () => {} | void;
  item: ChatRoom;
}

function RoomItem({ onClickNotLongPress, item }: RoomItemProps) {
  const longPress = useMouseBehaviors(
    onClickNotLongPress,
    () => {
      console.log('long');
    },
    500
  );

  return (
    <li key={item.id}>
      <div
        {...longPress}
        style={{
          background: 'rgba(255,255,255,0.08)',
          padding: 20,
          borderRadius: 16,
          margin: '0 12px 12px 12px',
          textAlign: 'left',
        }}
      >
        <h2>{item.title}</h2>
        {item.id}
      </div>
    </li>
  );
}

export default RoomItem;

import React, { useState } from 'react';

import { ChatRoom } from '../model/Chats';
import { useAppSelector } from '../store/hooks';
import Button from '../ui/Button';
import { db } from '../utils/firebase';
import useMouseBehaviors from '../utils/useMouseBehaviors';

interface RoomItemProps {
  item: ChatRoom;
  onClickNotLongPress: () => {} | void;
  onDelete: () => {} | void;
}

function RoomItem({ item, onClickNotLongPress, onDelete }: RoomItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uid = useAppSelector(state => state.user.userProfile.uid);

  const longPress = useMouseBehaviors(
    onClickNotLongPress,
    () => setIsOpen(prev => !prev),
    500
  );

  const deleteHandler = async () => {
    await db.collection('Chatrooms').doc(item.id).delete();
    onDelete();
  };

  const isAuthenticated = item.authenticatedPeople.includes(uid);
  const isCreator = item.creator === uid;

  return (
    <li key={item.id} style={{ display: 'flex' }}>
      <div
        {...longPress}
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.08)',
          padding: 20,
          borderRadius: 16,
          margin: '0 12px 12px 12px',
          textAlign: 'left',
        }}
      >
        <h2>{item.title}</h2>
        {isAuthenticated && '참여하고 있는 방입니다.'}
        {item.creator === uid && <p>내 챗방을 길게 눌러보세요👈</p>}
      </div>

      {isCreator && isOpen && (
        <div>
          <Button
            onClick={deleteHandler}
            variant="outlined"
            color="secondary"
            size="small"
          >
            삭제 🗑
          </Button>
          <br />
          <Button onClick={() => setIsOpen(false)} color="default" size="small">
            취소하기
          </Button>
        </div>
      )}
    </li>
  );
}

export default RoomItem;

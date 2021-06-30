import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chat } from '../model/Chats';
import { useAppSelector } from '../store/hooks';
import { db } from '../utils/firebase';

interface ChatItemProps {
  item: Chat;
}

function ChatItem({ item }: ChatItemProps) {
  const { roomId }: { roomId: string } = useParams();
  const { uid: reduxUid } = useAppSelector(state => state.user.userProfile);
  const isMine = reduxUid === item.uid;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(item.liked);
    // 내용 계속 업데이트
  });

  const clickHandler = (e: React.UIEvent<HTMLLIElement>) => {
    if (e.detail === 1) {
    } else if (e.detail === 2) {
      onDoubleClick();
    }
  };

  const onDoubleClick = () => {
    // 뷰에서 즉각적인 좋아요
    setLiked(prev => !prev);
    const chatDoc = db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('Chats')
      .doc(item.id)
      .update({ liked: !item.liked })
      .catch(() => {
        // 에러 시 뷰의 좋아요 취소
        setLiked(prev => !prev);
      });
    console.log(chatDoc);
  };

  return (
    <li style={{}} onClick={e => clickHandler(e)}>
      <div
        style={{
          textAlign: 'left',
          background: isMine
            ? 'rgba(255, 255, 255, 0.10)'
            : 'rgba(255, 255, 255, 0.05)',
          margin: isMine ? '0 16px 12px 90px' : '0 90px 12px 16px',
          borderRadius: isMine ? '24px 24px 4px 24px' : 24,
          minHeight: 50,
          minWidth: 100,
          padding: '16px 26px',
        }}
      >
        <div>{item.content}</div>
        <br />
        {/* id:{item.id} */}

        {liked && '❤️'}
      </div>
    </li>
  );
}

export default ChatItem;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chat } from '../model/Chats';
import { useAppSelector } from '../store/hooks';
import Button from '../ui/Button';
import { db } from '../utils/firebase';
import useMouseBehaviors from '../utils/useMouseBehaviors';
import EmojiSet from './EmojiSet';

interface ChatItemProps {
  item: Chat;
}

function ChatItem({ item }: ChatItemProps) {
  const { roomId }: { roomId: string } = useParams();
  const { uid: reduxUid, nickName } = useAppSelector(
    state => state.user.userProfile
  );
  const isMine = reduxUid === item.uid;
  const [liked, setLiked] = useState(false);
  const [emojis, setEmojis] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const longPress = useMouseBehaviors(
    () => {
      console.log('click');
    },
    () => setIsOpen(prev => !prev),
    500
  );

  useEffect(() => {
    // 내용 계속 업데이트
    setLiked(item.liked);
    setEmojis(item.emojis);
  });

  useEffect(() => {
    for (let emojiKey in item.emojis) {
      for (let key in item.emojis[emojiKey]) {
        setIsOpen(true);
        break;
      }
    }
  }, [emojis]);

  const clickHandler = (e: React.UIEvent<HTMLLIElement>) => {
    if (e.detail === 1) {
    } else if (e.detail === 2) {
      doubleClickHandler();
    }
  };

  const doubleClickHandler = () => {
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

  const deleteMessage = async () => {
    const result = await db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('Chats')
      .doc(item.id)
      .delete();
    console.log(result);
  };

  const clickEmojiHandler = async (keyEmoji: string) => {
    const docRef = db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('Chats')
      .doc(item.id);
    const result = await docRef.get();
    if (result.exists) {
      const oldChatData = result.data() as Chat;
      const newChatData = { ...oldChatData };
      const isMyEmoji = oldChatData.emojis[keyEmoji][reduxUid];

      if (isMyEmoji) {
        delete newChatData.emojis[keyEmoji][reduxUid];
      } else {
        newChatData.emojis[keyEmoji][reduxUid] = !isMyEmoji;
      }
      console.log(newChatData, isMyEmoji);

      result.ref.update(newChatData);
    }
  };

  return (
    <li style={{}} onClick={e => clickHandler(e)}>
      <div
        {...longPress}
        style={{
          textAlign: 'left',
          background: isMine
            ? 'rgba(255, 255, 255, 0.20)'
            : 'rgba(255, 255, 255, 0.10)',
          margin: isMine ? '0 16px 12px 90px' : '0 90px 12px 16px',
          borderRadius: isMine ? '24px 24px 4px 24px' : 24,
          minHeight: 50,
          minWidth: 100,
          padding: '16px 26px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {item.content}
          {isMine && (
            <Button
              variant="outlined"
              color="default"
              onClick={deleteMessage}
              size="small"
            >
              삭제
            </Button>
          )}
        </div>

        <br />
        {/* id:{item.id} */}
        {liked && '❤️'}
        {isOpen && (
          <div>
            {' '}
            <EmojiSet emojis={emojis} onClickEmoji={clickEmojiHandler} />
          </div>
        )}
      </div>
    </li>
  );
}

export default ChatItem;

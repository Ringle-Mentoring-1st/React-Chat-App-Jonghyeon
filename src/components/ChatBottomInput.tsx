import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import { db, nowSecond } from '../utils/firebase';

interface ChatBoottomInputProps {
  roomId: string;
}

function ChatBottomInput({ roomId }: ChatBoottomInputProps) {
  const [content, setContent] = useState('');
  const { uid } = useAppSelector(state => state.user.userProfile);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newChat = {
      content,
      createdAt: nowSecond(),
      uid,
      emojis: { '🥳': {}, '🚀': {}, '👍': {}, '👋': {} },
    };
    db.doc(`Chatrooms/${roomId}`)
      .collection('Chats')
      .add(newChat)
      .then(value => {
        console.log(value);
      });
    setContent('');
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: 'flex',
        background: '#222222',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        margin: 0,
        padding: 8,
      }}
    >
      <TextInput
        type="text"
        value={content}
        onChange={changeHandler}
        placeholder="여기에 메시지를 입력하세요"
        style={{ flex: 1, margin: 0 }}
      />{' '}
      {content.length > 0 && <Button color="primary">보내기</Button>}
    </form>
  );
}

export default ChatBottomInput;

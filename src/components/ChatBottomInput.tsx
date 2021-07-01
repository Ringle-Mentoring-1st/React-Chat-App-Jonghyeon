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
      style={{ background: 'rgba(255,255,255,0.02)', padding: 16 }}
    >
      <TextInput type="text" value={content} onChange={changeHandler} />{' '}
      <Button color="primary">보내기</Button>
    </form>
  );
}

export default ChatBottomInput;

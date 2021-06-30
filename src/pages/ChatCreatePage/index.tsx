import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../ui/Button';
import TextInput from '../../ui/TextInput';
import { db } from '../../utils/firebase';

function ChatCreatePage() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const clickHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection('Chatrooms')
      .add({
        title: title,
        password: password,
      })
      .then(() => {
        console.log('Document successfully written!');
        history.push('/chat/list');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  };

  return (
    <form onSubmit={e => clickHandler(e)}>
      <TextInput
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="방 이름을 알려주세요"
      />
      <TextInput
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="방에 비밀번호를 적어주세요"
      />
      <br />

      <Button>방만들기</Button>
    </form>
  );
}

export default ChatCreatePage;

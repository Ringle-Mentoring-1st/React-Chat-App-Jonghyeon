import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/firebase';
import { Chat } from '../../model/Chats';
import Button from '../../ui/Button';
import TextInput from '../../ui/TextInput';

function ChatPage() {
  const { roomId }: { roomId: string } = useParams();

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const newChats: Chat | any[] = [];

    db.doc(`Chatrooms/${roomId}`)
      .collection('Chats')
      .get()
      .then(collection => {
        const chats = collection.docs;
        chats.forEach(chatDoc => {
          const chatData = chatDoc.data();
          chatData.id = chatDoc.id;

          newChats.push(chatData);
        });
        setChats(newChats);
      });
  }, []);

  const changeHandler = () => {
    console.log('change');
  };

  return (
    <div>
      <h1>ChatPage</h1>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>
            {console.log(chat)}
            <div> {chat.content}</div>
          </li>
        ))}
      </ul>
      <div>
        <TextInput type="text" value="" onChange={changeHandler} />{' '}
        <Button color="primary">보내기</Button>
      </div>
    </div>
  );
}

export default ChatPage;

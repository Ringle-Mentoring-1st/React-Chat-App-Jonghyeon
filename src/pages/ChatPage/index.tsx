import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { db } from '../../utils/firebase';
import { Chat } from '../../model/Chats';

import ChatBottomInput from '../../components/ChatBottomInput';
import ChatItem from '../../components/ChatItem';

function ChatPage() {
  const { roomId }: { roomId: string } = useParams();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chatsRef = db.collection('Chatrooms').doc(roomId).collection('Chats');
    const unsubscribe = chatsRef.orderBy('createdAt').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const newChat = change.doc.data() as Chat;
          newChat.id = change.doc.id;
          setChats(prevChats => [...prevChats, newChat]);
        } else if (change.type === 'modified') {
          const newChat = change.doc.data() as Chat;
          newChat.id = change.doc.id;
          setChats(prevChats =>
            prevChats.map(prev => (prev.id === newChat.id ? newChat : prev))
          );
        } else if (change.type === 'removed') {
          console.log(change, change.type);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>ChatPage</h1>
      <ul>
        {chats.map(chat => (
          <ChatItem key={chat.id} item={chat} />
        ))}
      </ul>
      <ChatBottomInput roomId={roomId} />
    </div>
  );
}

export default ChatPage;

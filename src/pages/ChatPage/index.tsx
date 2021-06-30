import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { db } from '../../utils/firebase';
import { Chat } from '../../model/Chats';

import ChatBottomInput from '../../components/ChatBottomInput';

function ChatPage() {
  const { roomId }: { roomId: string } = useParams();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chatsRef = db.collection('Chatrooms').doc(roomId).collection('Chats');
    const unsubscribe = chatsRef.orderBy('createdAt').onSnapshot(snapshot => {
      console.log(snapshot.docChanges());

      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const newChat = change.doc.data() as Chat;
          setChats(prevChats => [...prevChats, newChat]);
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
          <li key={chat.id}>
            <div
              style={{
                textAlign: 'left',
                padding: '16px 26px',
                background: 'rgba(255, 255, 255, 0.05)',
                margin: '0 16px 12px 16px',
                borderRadius: 16,
              }}
            >
              {chat.content}
            </div>
          </li>
        ))}
      </ul>
      <ChatBottomInput roomId={roomId} />
    </div>
  );
}

export default ChatPage;

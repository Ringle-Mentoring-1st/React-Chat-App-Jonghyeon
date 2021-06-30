import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { db } from '../../utils/firebase';
import { Chat } from '../../model/Chats';

import ChatBottomInput from '../../components/ChatBottomInput';
import ChatItem from '../../components/ChatItem';
import { useAppSelector } from '../../store/hooks';

function ChatPage() {
  const { roomId }: { roomId: string } = useParams();
  const [chats, setChats] = useState<Chat[]>([]);
  const [livePeople, setLivePeople] = useState<
    { nickName: string; uid: string }[]
  >([]);
  const { uid, nickName } = useAppSelector(state => state.user.userProfile);

  useEffect(() => {
    // 시작시 라이브 피플에 추가
    const livePeopleRef = db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('livePeople');
    livePeopleRef
      .doc(uid)
      .set({ nickName })
      .then(() => {});

    return () => {
      livePeopleRef.doc(uid).delete();
    };
  }, []);

  useEffect(() => {
    const chatsRef = db.collection('Chatrooms').doc(roomId).collection('Chats');
    const unsubscribeChats = chatsRef
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
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

    // livePeople subscribe
    const livePeopleRef = db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('livePeople');
    const unsubscribeLivePeople = livePeopleRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const person = change.doc.data() as { nickName: string; uid: string };
          person.uid = change.doc.id;
          setLivePeople(prev => [...prev, person]);
        } else if (change.type === 'removed') {
          setLivePeople(prev => {
            const filteredPrev = prev.filter(a => a.uid !== change.doc.id);
            console.log(filteredPrev);

            return filteredPrev;
          });
        }
      });
    });

    return () => {
      unsubscribeChats();
      unsubscribeLivePeople();
    };
  }, []);

  return (
    <div>
      {livePeople.length > 1 ? (
        <span>
          나와{' '}
          {livePeople.map(person =>
            person.uid === uid ? '' : <span>{person.nickName}님 </span>
          )}{' '}
          {livePeople.length}명이 지금 이방에 함께 있어요 🥳
        </span>
      ) : (
        '지금 이 방에 나만 있어요 😂'
      )}

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

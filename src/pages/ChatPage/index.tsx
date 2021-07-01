import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { db, nowSecond } from '../../utils/firebase';
import { Chat, ChatRoom, LivePerson } from '../../model/Chats';

import ChatBottomInput from '../../components/ChatBottomInput';
import ChatItem from '../../components/ChatItem';
import { useAppSelector } from '../../store/hooks';

function ChatPage() {
  const { roomId }: { roomId: string } = useParams();
  const [chats, setChats] = useState<Chat[]>([]);
  const [livePeople, setLivePeople] = useState<LivePerson[]>([]);
  const { uid, nickName } = useAppSelector(state => state.user.userProfile);
  const [title, setTitle] = useState('');

  const chatroomData = async () => {
    const chatroomDoc = await db.collection('Chatrooms').doc(roomId).get();
    if (chatroomDoc.exists) {
      setTitle(chatroomDoc.data()!.title);
    }
    return { exist: chatroomDoc.exists };
  };

  useEffect(() => {
    chatroomData();

    // 시작시 라이브 피플에 추가
    const livePeopleRef = db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('livePeople');
    livePeopleRef
      .doc(uid)
      .set({ nickName, liveAt: nowSecond() })
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
            const modifiedChat = change.doc.data() as Chat;
            modifiedChat.id = change.doc.id;
            setChats(prevChats =>
              prevChats.map(prev =>
                prev.id === modifiedChat.id ? modifiedChat : prev
              )
            );
          } else if (change.type === 'removed') {
            const removedChat = change.doc.data() as Chat;
            removedChat.id = change.doc.id;
            setChats(prevChats =>
              prevChats.filter(prev => prev.id !== removedChat.id)
            );
          }
        });
      });

    // livePeople subscribe
    const livePeopleRef = db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('livePeople');
    const unsubscribeLivePeople = livePeopleRef.onSnapshot(snapshot => {
      const MINUTE_SENSITIVITY_liveAt = 30;
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const person = change.doc.data() as LivePerson;
          if (person.liveAt < nowSecond() - MINUTE_SENSITIVITY_liveAt * 60)
            return;
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
    <div style={{ paddingBottom: 70 }}>
      <h1>{title}</h1>
      {livePeople.length !== 0 ? (
        livePeople.length > 1 ? (
          <span>
            나와{' '}
            {livePeople.map(person =>
              person.uid === uid ? (
                ''
              ) : (
                <span key={person.uid}>{person.nickName}님 </span>
              )
            )}{' '}
            {livePeople.length}명이 지금 이방에 함께 있어요 🥳
          </span>
        ) : (
          '지금 이 방에 나만 있어요 😂'
        )
      ) : (
        ''
      )}
      <ul>
        {chats.map(chat => (
          <ChatItem key={chat.id} item={chat} />
        ))}
      </ul>
      {title && <ChatBottomInput roomId={roomId} />}
    </div>
  );
}

export default ChatPage;

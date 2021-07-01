import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { db, nowSecond, firebase } from '../../utils/firebase';
import { Chat, ChatRoom, LivePerson } from '../../model/Chats';

import ChatBottomInput from '../../components/ChatBottomInput';
import ChatItem from '../../components/ChatItem';
import { useAppSelector } from '../../store/hooks';
import ChatBottomRequestAuthButton from '../../components/ChatBottomRequestAuthButton';
import Button from '../../ui/Button';

function ChatPage() {
  const { roomId }: { roomId: string } = useParams();
  const [chats, setChats] = useState<Chat[]>([]);
  const [livePeople, setLivePeople] = useState<LivePerson[]>([]);
  const nickName = useAppSelector(state => state.user.userProfile.nickName);
  const uid = useAppSelector(state => state.user.userProfile.uid);
  const [isRequested, setIsRequested] = useState(false);
  const [requestPeople, setRequestPeople] = useState<
    { nickName: string; uid: string }[]
  >([]);
  const [chatroom, setChatroom] = useState<any>({ authenticatedPeople: [] });

  useEffect(() => {
    db.collection('Chatrooms')
      .doc(roomId)
      .onSnapshot(doc => {
        setChatroom(doc.data());
      });

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

    // requestPeople subscribe
    const requestPeopleRef = db
      .collection('Chatrooms')
      .doc(roomId)
      .collection('requestPeople');
    const unsubscribeRequestPeople = requestPeopleRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          setRequestPeople(prev => [
            ...prev,
            { nickName: change.doc.data().nickName, uid: change.doc.id },
          ]);
          if (change.doc.id === uid) setIsRequested(true);
        } else if (change.type === 'removed') {
          setRequestPeople(prev => {
            const filteredPrev = prev.filter(a => a.uid !== change.doc.id);
            return filteredPrev;
          });
        }
      });
    });

    return () => {
      unsubscribeChats();
      unsubscribeLivePeople();
      unsubscribeRequestPeople();
    };
  }, []);

  const requestAuthHandler = () => {
    db.collection('Chatrooms')
      .doc(roomId)
      .collection('requestPeople')
      .doc(uid)
      .set({ nickName })
      .then(() => {
        setIsRequested(true);
      });
  };

  // 권한요청 승인, 거절
  const roomDocRef = db.collection('Chatrooms').doc(roomId);
  const requestPeopleRef = roomDocRef.collection('requestPeople');
  const rejectRequest = (person: { nickName: string; uid: string }) => {
    requestPeopleRef.doc(person.uid).delete();
  };
  const acceptRequest = (person: { nickName: string; uid: string }) => {
    requestPeopleRef
      .doc(person.uid)
      .delete()
      .then(() => {
        roomDocRef
          .update({
            authenticatedPeople: firebase.firestore.FieldValue.arrayUnion(
              person.uid
            ),
          })
          .then(() => {
            console.log('hi');

            roomDocRef
              .collection('Chats')
              .add({
                content:
                  person.nickName +
                  '님 승인했습니당! 🥳 이제부터 메시지를 보낼 수 있어요!',
                createdAt: nowSecond(),
                uid,
                emojis: { '🥳': {}, '🚀': {}, '👍': {}, '👋': {} },
                isSpecial: true,
              })
              .then(() => {
                console.log('성공');
              });
          });
      });
  };

  // 내가 만든 방인지
  const isMyroom = chatroom.creator === uid;

  // 내가 권한이 있는지
  let isAuth = false;
  for (let uidAuth of chatroom.authenticatedPeople) {
    if (uidAuth === uid) {
      isAuth = true;
      break;
    }
  }

  return (
    <div style={{ paddingBottom: 70 }}>
      <h1>{chatroom.title}</h1>
      {isMyroom && requestPeople.length > 0 && (
        <div
          className="chatroom--active"
          style={{ padding: '16px 0', margin: 12 }}
        >
          대화를 원하면 권한을 승인해주세요
          <ul>
            {requestPeople.map(person => (
              <li key={person.uid}>
                <strong>{person.nickName}</strong>
                {'님 '}
                <Button
                  onClick={() => rejectRequest(person)}
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  거절하기
                </Button>
                <Button
                  onClick={() => acceptRequest(person)}
                  size="small"
                  color="primary"
                >
                  승인하기
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
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
      {isAuth && chatroom.title && <ChatBottomInput roomId={roomId} />}
      {!isAuth &&
        (!isRequested ? (
          <div style={{ padding: '16px 0' }}>
            <ChatBottomRequestAuthButton
              onClick={requestAuthHandler}
              roomId={roomId}
            />
          </div>
        ) : (
          <div className="chatroom--active" style={{ padding: '16px 0' }}>
            <Button color="default" variant="outlined">
              성공적으로 요청을 보냈습니다
            </Button>
            <br />
            <br />
            방장의 수락을 기다려주세요
          </div>
        ))}
    </div>
  );
}

export default ChatPage;

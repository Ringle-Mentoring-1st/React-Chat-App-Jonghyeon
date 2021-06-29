import React, { useEffect } from 'react';
import { db } from '../../utils/firebase';

function ChatListPage() {
  useEffect(() => {
    db.collection('Chatrooms')
      .get()
      .then(collection => {
        const myChatrooms = collection.docs;
        if (myChatrooms.length) {
        }
      });
  }, []);

  return <div>ChatListPage</div>;
}

export default ChatListPage;

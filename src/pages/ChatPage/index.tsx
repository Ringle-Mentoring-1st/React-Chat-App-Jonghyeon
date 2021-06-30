import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/firebase';

function ChatPage() {
  useEffect(() => {}, []);

  const { roomId }: { roomId: string } = useParams();
  return <div>ChatPage - {roomId}</div>;
}

export default ChatPage;

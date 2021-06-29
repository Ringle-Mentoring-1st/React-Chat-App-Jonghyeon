import React from 'react';
import { useParams } from 'react-router-dom';

function ChatPage() {
  const { roomId }: { roomId: string } = useParams();
  return <div>ChatPage - {roomId}</div>;
}

export default ChatPage;

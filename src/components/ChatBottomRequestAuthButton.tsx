import React from 'react';
import Button from '../ui/Button';

interface ChatBottomRequestAuthButtonProps {
  roomId: string;
  onClick: () => {} | void;
}

function ChatBottomRequestAuthButton({
  roomId,
  onClick,
}: ChatBottomRequestAuthButtonProps) {
  return (
    <>
      <Button color="primary" onClick={onClick}>
        나랑도 이야기 해요
      </Button>
      <br />
      승인되면 이야기 할 수 있습니다.
    </>
  );
}

export default ChatBottomRequestAuthButton;

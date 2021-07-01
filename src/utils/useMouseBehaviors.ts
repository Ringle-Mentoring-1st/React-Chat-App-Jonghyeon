import { useState, useEffect } from 'react';

export default function useMouseBehaviors(
  onClickCallback = () => {},
  onLongPressCallback = () => {},
  ms = 300
) {
  const [press, setPress] = useState(false);

  useEffect(() => {
    let timerId: any; // TODO: I Can't know type 🥲 Could anyone use issue or Request in github for me?

    if (press) {
      timerId = setTimeout(() => {
        setPress(false);
        onLongPressCallback();
      }, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [onLongPressCallback, ms, press]);

  return {
    onMouseDown: () => setPress(true),
    onMouseUp: () => {
      if (press) {
        setPress(false);
        onClickCallback();
      }
    },
    onMouseLeave: () => setPress(false),
    onTouchStart: () => setPress(true),
    onTouchEnd: () => setPress(false),
  };
}

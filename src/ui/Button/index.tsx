import React, { ReactChild, ReactChildren } from 'react';
import './Button.scss';

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'default';
  size?: 'large' | 'medium' | 'small';
  fill?: boolean;
  onClick?: () => {} | void;
  children: ReactChild | ReactChildren;
}

export default function Button({
  color,
  size,
  fill,
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${size} ${fill ? 'filled' : ''} ${color}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

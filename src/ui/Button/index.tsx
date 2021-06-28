import React, { ReactChild, ReactChildren } from 'react';
import './Button.scss';

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'default';
  size?: 'large' | 'medium' | 'small';
  fill?: boolean;
  children: ReactChild | ReactChildren;
}

export default function Button({
  color,
  size,
  fill,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${size} ${fill ? 'filled' : ''} ${color}`}
      {...props}
    >
      {children}
    </button>
  );
}

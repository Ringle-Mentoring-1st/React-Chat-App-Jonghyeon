import React, { ReactChild, ReactChildren } from 'react';
import './styles.scss';

interface ButtonProps {
  variant?: 'outlined';
  color?: 'primary' | 'secondary' | 'default';
  size?: 'large' | 'medium' | 'small';
  fill?: boolean;
  onClick?: () => {} | void;
  children: ReactChild | ReactChildren;
}

export default function Button({
  variant,
  color,
  size,
  fill,
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button ${size} ${fill ? 'filled' : ''} ${color} ${
        variant ? variant : ''
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

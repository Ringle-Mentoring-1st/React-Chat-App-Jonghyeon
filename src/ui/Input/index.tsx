import React from 'react';
import './Input.scss';

interface InputProps {
  type: 'text' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fill?: boolean;
  style?: any;
}

function Input({
  type,
  value,
  onChange,
  placeholder,
  fill,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e)}
      placeholder={placeholder}
      className={fill ? 'filled' : ''}
      {...props}
    />
  );
}

export default Input;

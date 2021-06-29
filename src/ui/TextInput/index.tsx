import React from 'react';
import './TextInput.scss';

interface TextInputProps {
  type: 'text' | 'password' | 'checkbox';
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  fill?: boolean;
  style?: any;
}

function TextInput({
  type,
  value,
  onChange,
  placeholder,
  fill,
  ...props
}: TextInputProps) {
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

export default TextInput;

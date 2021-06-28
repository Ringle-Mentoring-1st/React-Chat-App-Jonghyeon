import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickName, setNickName] = useState('');
  const [isAgreeInfo, setIsAgreeInfo] = useState(false);
  const [signupPath, setSignupPath] = useState('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={e => onEmailChange(e)}
        placeholder="이메일을 입력해주세요"
      />
      <input
        type="password"
        value={pw}
        onChange={e => onPasswordChange(e)}
        placeholder="비밀번호를 입력해주세요"
      />
    </div>
  );
}

export default LoginPage;

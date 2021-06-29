import React, { useState } from 'react';
import './SignupPage.scss';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickName, setNickName] = useState('');
  const [isAgreeInfo, setIsAgreeInfo] = useState(false);
  const [signupPath, setSignupPath] = useState('');

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={email}
          onChange={e => emailChangeHandler(e)}
          placeholder="이메일을 입력해주세요"
        />
        <input
          type="password"
          value={pw}
          onChange={e => passwordChangeHandler(e)}
          placeholder="비밀번호를 입력해주세요"
        />
      </form>
    </div>
  );
}

export default SignupPage;

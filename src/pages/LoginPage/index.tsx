import React, { Fragment, useState } from 'react';
import './LoginPage.scss';

//Components
import Button from '../../ui/Button';
import Input from '../../ui/Input';

// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';

function LoginPage() {
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

  const submitHandler = () => {};

  return (
    <Fragment>
      <div className="flexbox">
        <div className="title">
          <Logo className="logo" />
          <h1>로그인하고 친구들과 커피챗</h1>
        </div>
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            value={email}
            onChange={e => emailChangeHandler(e)}
            placeholder="이메일을 입력해주세요"
          />
          <Input
            type="password"
            value={pw}
            onChange={e => passwordChangeHandler(e)}
            placeholder="비밀번호를 입력해주세요"
          />
          <Button fill color="primary">
            로그인하기
          </Button>
        </form>
      </div>
    </Fragment>
  );
}

export default LoginPage;

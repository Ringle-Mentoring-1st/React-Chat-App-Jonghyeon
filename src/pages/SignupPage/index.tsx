import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPage.scss';

//Components
import Button from '../../ui/Button';
import TextInput from '../../ui/TextInput';

// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';

// Utils
import { emailValidator, pwValidator } from '../../utils/validator';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickName, setNickName] = useState('');
  const [isAgreeInfo, setIsAgreeInfo] = useState(false);
  const [signupPath, setSignupPath] = useState('');

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPw(e.target.value);

  const nickNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);

  const isAgreeInfoChangeHandler = () => setIsAgreeInfo(prev => !prev);

  const signupPathChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupPath(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage: { [key: string]: string } = {};

    if (emailValidator(email)) errorMessage.email = emailValidator(email);
    if (pwValidator(pw)) errorMessage.pw = pwValidator(pw);
    if (!nickName) errorMessage.nickName = '닉네임을 적어주세요';
    if (!signupPath) errorMessage.signupPath = '가입경로를 적어주세요';
    if (!isAgreeInfo)
      errorMessage.isAgreeInfo = '이용약관 및 정보처리방침에 동의주세요';

    if (Object.keys(errorMessage).length) {
      return alert(JSON.stringify(errorMessage));
    } else {
      const payload = {
        email,
        pw,
        nickName,
        isAgreeInfo,
        signupPath,
      };
      return console.log(payload);
    }
  };

  return (
    <Fragment>
      <div className="flexbox">
        <div className="title">
          <Logo className="logo" />
          <h1>회원가입하고 친구들과 커피챗</h1>
        </div>
        <form onSubmit={onSubmitHandler}>
          <TextInput
            type="text"
            value={email}
            onChange={emailChangeHandler}
            placeholder="이메일을 입력해주세요"
          />
          <TextInput
            type="password"
            value={pw}
            onChange={passwordChangeHandler}
            placeholder="비밀번호를 입력해주세요"
          />
          <TextInput
            type="text"
            value={nickName}
            onChange={nickNameChangeHandler}
            placeholder="닉네임를 입력해주세요"
          />
          <select
            name="pets"
            value={signupPath}
            onChange={signupPathChangeHandler}
          >
            <option value="">어떤 경로로 커피챗을 알게 됐나요?</option>
            <option value="ad">광고</option>
            <option value="search">검색</option>
            <option value="etc">기타</option>
          </select>
          <br />
          <label htmlFor="agree">
            이용약관 및 개인정보처리방침에 동의하십니까?
          </label>
          <input
            id="agree"
            type="checkbox"
            checked={isAgreeInfo}
            onChange={isAgreeInfoChangeHandler}
          />

          <Button color="primary" fill onClick={() => onSubmitHandler}>
            회원가입하기
          </Button>
        </form>
        <p>
          이미 회원이라면?{' '}
          <Link to="/login">
            <span>로그인하기</span>
          </Link>
        </p>
      </div>
    </Fragment>
  );
}

export default SignupPage;

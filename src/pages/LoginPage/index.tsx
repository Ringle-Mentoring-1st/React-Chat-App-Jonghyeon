import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setJwtToken } from '../../store/slices/userSlice';
import './LoginPage.scss';

//Components
import Button from '../../ui/Button';
import TextInput from '../../ui/TextInput';

// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';

function LoginPage() {
  const history = useHistory();
  const { jwtToken } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const makeFakeid = (length: number) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setJwtToken(makeFakeid(8)));
  };

  return (
    <Fragment>
      <div className="flexbox">
        {jwtToken}
        <div className="title">
          <Logo className="logo" />
          <h1>로그인하고 친구들과 커피챗</h1>
        </div>
        <form onSubmit={e => submitHandler(e)}>
          <TextInput
            type="text"
            value={email}
            onChange={e => emailChangeHandler(e)}
            placeholder="이메일을 입력해주세요"
          />
          <TextInput
            type="password"
            value={pw}
            onChange={e => passwordChangeHandler(e)}
            placeholder="비밀번호를 입력해주세요"
          />
          <Button fill color="primary">
            로그인하기
          </Button>
        </form>
        <p>
          아직 회원이 아니라면?{' '}
          <Link to="/signup">
            <span>회원가입하기</span>
          </Link>
        </p>
      </div>
    </Fragment>
  );
}

export default LoginPage;

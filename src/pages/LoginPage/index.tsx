import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.scss';
// Redux
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserProfile } from '../../store/slices/userSlice';
//Components
import Button from '../../ui/Button';
import TextInput from '../../ui/TextInput';
// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';
// Utils
import { app, db } from '../../utils/firebase';

function LoginPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      const uid = (app.auth().currentUser || {}).uid;
      console.log(user);

      if (uid) {
        console.log('Home:', uid);
        history.push('/chat/list');
      } else {
        console.log('Home:', uid);
      }
    });
  }, []);

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    app
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then(user => {
        const currentUser = app.auth().currentUser;
        const uid = (currentUser || {}).uid;
        if (uid) {
          db.doc(`user/${uid}`)
            .get()
            .then(doc => {
              const payload = {
                uid,
                email: currentUser!.email!,
                nickName: '',
              };
              payload.nickName = doc.data()!.nickName;
              dispatch(setUserProfile(payload));

              history.push('/chat/list');
            });
        } else {
          alert('해당하는 유저가 없습니다.');
        }
      })
      .catch(error => {
        const errorMessage = error.message;
      });
  };

  return (
    <Fragment>
      <div className="flexbox">
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
            fill
          />
          <TextInput
            type="password"
            value={pw}
            onChange={e => passwordChangeHandler(e)}
            placeholder="비밀번호를 입력해주세요"
            fill
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

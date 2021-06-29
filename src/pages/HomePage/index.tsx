import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './HomePage.scss';
// Components
import Button from '../../ui/Button';
// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';
// Utils
import { app } from '../../utils/firebase';

function HomePage() {
  const history = useHistory();

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

  return (
    <Fragment>
      <div className="flexbox">
        <div className="title">
          <Logo className="logo" />
          <h1>커피챗에 오신 것을 환영합니다</h1>
          <h3>친구들과 쉽게 메시지를 보내세요</h3>
        </div>
        <div className="buttons">
          <Link to="/login">
            <Button color="primary" size="medium" fill>
              로그인하고 메시지보내기
            </Button>{' '}
          </Link>
          <p>
            아직 회원이 아니라면?{' '}
            <Link to="/signup">
              <span>회원가입하기</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default HomePage;

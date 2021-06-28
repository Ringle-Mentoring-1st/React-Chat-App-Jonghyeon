import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

// Components
import Button from '../../ui/Button';
import Container from '../../ui/Container';

// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';

function HomePage() {
  return (
    <Container>
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
    </Container>
  );
}

export default HomePage;

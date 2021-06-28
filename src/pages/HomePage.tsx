import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from '../ui/Button';

// Assets
import { ReactComponent as Logo } from '../assets/logo.svg';

function HomePage() {
  return (
    <div>
      <div>
        <Logo />
      </div>
      커피챗에 오신 것을 환영합니다 친구들과 쉽게 메시지를 보내세요
      <div>
        <Link to="/login">
          <Button>로그인하고 메시지보내기</Button>
        </Link>

        <Button color="primary" size="small" fill>
          로그인하고 메시지보내기
        </Button>
      </div>
      <p>
        아직 회원이 아니라면?{' '}
        <Link to="/signup">
          <span>회원가입하기</span>
        </Link>
      </p>
    </div>
  );
}

export default HomePage;

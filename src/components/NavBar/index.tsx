import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.scss';
// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';
// Components
import Button from '../../ui/Button';
// Utils
import { app } from '../../utils/firebase';

function NavBar() {
  const history = useHistory();

  const logOut = () => {
    app.auth().signOut();
    history.push('/');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.02)',
        padding: '0px 16px',
      }}
    >
      <Link
        aria-label="coffeechat"
        to="/chat/list"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Logo className="logo" style={{ margin: 0, width: 50, height: 50 }} />
      </Link>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        <li>
          <Button color="primary" size="small" onClick={logOut}>
            로그아웃
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

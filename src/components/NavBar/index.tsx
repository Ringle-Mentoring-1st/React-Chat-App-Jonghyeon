import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
// Assets
import { ReactComponent as Logo } from '../../assets/logo.svg';
// Components
import Button from '../../ui/Button';
import LogoutButton from '../LogoutButton';

function NavBar() {
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
          <Link to="/chat/list/create">
            <Button variant="outlined" color="secondary" size="small">
              +
            </Button>
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

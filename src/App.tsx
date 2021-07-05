import React from 'react';

import Routes from './Routes';
import './App.scss';
import { useAppSelector } from './store/hooks';
import LogoutButton from './components/LogoutButton';

function App() {
  const user = useAppSelector(state => state.user);

  if (user.userProfile === null)
    return (
      <div
        style={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>다시 로그인이 필요합니다</div>
        <br />
        <LogoutButton />
      </div>
    );

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;

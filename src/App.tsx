import React from 'react';

import Routes from './Routes';
import './App.scss';

// Components
import Container from './ui/Container';

function App() {
  return (
    <div className="App">
      <Container>
        <Routes />
      </Container>
    </div>
  );
}

export default App;

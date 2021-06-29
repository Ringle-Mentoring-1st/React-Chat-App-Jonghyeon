import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// Pages
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Components
import Container from './ui/Container';

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={SignupPage} exact />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;

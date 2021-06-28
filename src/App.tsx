import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// Pages
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={SignupPage} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import ChatList from './pages/ChatListPage';
import Chat from './pages/ChatPage';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/chat/list" component={ChatList} exact />
        <Route path="/chat/room/:roomId" component={Chat} exact />
      </Switch>
    </Router>
  );
}
export default Routes;

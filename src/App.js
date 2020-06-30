import React from 'react';
import { Account } from './components/accounts';
import Status from './components/status'
import SignUp from './components/createSession';
import Login from './components/login';

function App() {
  return (
    <Account>
      <Status></Status>
      <SignUp></SignUp>
      <Login></Login>
    </Account>
  );
}

export default App;

import React from 'react';
import { Account } from './components/Accounts';
import Status from './components/Status'
import CreateSession from './components/CreateSession';
import JoinSession from './components/JoinSession';
import Settings from './components/Settings';

function App() {
  return (
    <Account>
      <Status></Status>
      <CreateSession></CreateSession>
      <JoinSession></JoinSession>
      <Settings></Settings>
    </Account>
  );
}

export default App;

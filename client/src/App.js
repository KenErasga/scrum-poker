import React from 'react';

import { Account, Authentication } from './components/Accounts/CognitoProvider';

import PrivateRoute from './commonComponents/PrivateRoute';

import NavBar from './components/NavBar/NavBar';
import HandleRooms from './components/Rooms/HandleRooms';
import HandleScrumPoker from './components/ScrumPoker/ScrumPoker';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (<div>
    <Account>
      <Authentication>
        <NavBar />
        <Router>
         <Route path='/' exact component={HandleRooms} />
         <PrivateRoute path='/scrum-poker' component={HandleScrumPoker} />
        </Router>
      </Authentication>
    </Account>
  </div>
  )
}

export default App;
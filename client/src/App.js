import React, {useState} from 'react';
import { Account, AppContext } from './components/Accounts/Accounts';
import NavBar from './components/NavBar/NavBar';

import HandleSessions from './components/Sessions/HandleSessions';
import HandleScrumPoker from './components/ScrumPoker/HandleScrumPoker';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <Account>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated}}>
      <NavBar />
      <Router>
        {/* <Route path='/' exact component={HandleSessions} /> */}
        {isAuthenticated ? <Route path='/scrum-poker' exact component={HandleScrumPoker} /> : <Route path='/' exact component={HandleSessions} />}
      </Router>
      </AppContext.Provider>
    </Account>
  )
}

export default App;
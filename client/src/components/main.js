import React from 'react';
import PrivateRoute from '../common/PrivateRoute';

import HandleRooms from './Rooms/HandleRooms';
import HandleScrumPoker from './ScrumPoker/ScrumPoker';
import { ErrorHandler } from './Error/ErrorHandler'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ErrorAlert } from './Error/ErrorAlert';

import { useDarkTheme } from './hooks/useDarkTheme';
import { ThemeProvider } from "@material-ui/core/styles";

const MainContent = (props) => {

    const { darkTheme } = useDarkTheme();

    return (
        
            <Router>
                
                <ErrorHandler>
                <ThemeProvider theme={darkTheme}>
                    <Route path='/' exact component={HandleRooms} />
                    <PrivateRoute path='/scrum-poker' component={HandleScrumPoker} isAuthenticated={props.isAuthenticated} />
                    </ThemeProvider>
                    <ErrorAlert />
                </ErrorHandler>
                
            </Router>

    )
}

export default MainContent;
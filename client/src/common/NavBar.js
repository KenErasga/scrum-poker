import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const NavBar = ({ isAuthenticated }) => {
    return (
        <div>
            {isAuthenticated ? null :
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h4" component="h4">
                            Scrum Poker Online
        </Typography>
                    </Toolbar>
                </AppBar>}
        </div>
    )
}
export default NavBar;
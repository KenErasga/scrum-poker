import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const HeaderBar = (props) => {
    return (
        <div>
            <AppBar className={props.styling}>
                <Toolbar>
                    <Typography variant="h4" component="h4" className={props.title}>
                        {props.description}
                    </Typography>
                    {props.children}
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default HeaderBar;
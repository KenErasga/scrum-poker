import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const HeaderBar = ({description, styling}) => {
    return (
        <div>
            <AppBar className={styling}>
                <Toolbar>
                    <Typography variant="h4" component="h4" noWrap>
                        {description}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default HeaderBar;
import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
} from '@material-ui/core';

// Icons imports:
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import StarsIcon from '@material-ui/icons/Stars';

const UserListItem = ({
    selectedUserIndex,
    handleUserListClick,
    emitUpdateScrumMaster,
    setScrumMaster,
    emitKickUser,
    usersExpandState,
    classes,
    index,
    user }) => {
    return (
        <div key={user.id}>
            <ListItem
                button
                selected={selectedUserIndex === index}
                onClick={(event) => handleUserListClick(event, index)}
            >
                <ListItemText primary={`${user.users_name}`} />
                {usersExpandState[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                in={usersExpandState[index]}
                timeout="auto"
                style={{ borderBottom: "1px solid grey" }}
                unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Set Scrum Master" onClick={() => emitUpdateScrumMaster(user, setScrumMaster)} />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <PersonAddDisabledIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Kick User`} onClick={() => emitKickUser(user)} />
                    </ListItem>
                </List>
            </Collapse>
        </div>
    );
}

export default UserListItem;
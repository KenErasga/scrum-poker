import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemButton = ({ description, onClick, Icon }) => {
    return (
        <ListItem button>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={description} onClick={onClick} />
        </ListItem>
    );
};

export default ListItemButton;






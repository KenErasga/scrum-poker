// General imports:
import React, { useEffect, useState } from 'react';
import { useAccountContext, useAuthContext } from '../../providers/Cognito';
import config from '../../config/config'
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { DropDownList, ListItemButton, PokerCard } from '../../common/index';
import {useEstimate, useExpand, useResetEstimate, useDeleteRoom } from './scrumPokerHooks';
import { useSocket } from '../../providers/SocketIO';

import {
    CssBaseline,
    Typography,
    Grid,
    makeStyles,
    Paper,
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Divider,
} from '@material-ui/core';

// Icons imports:
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import StarsIcon from '@material-ui/icons/Stars';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// MUI Classes
const useStyles = makeStyles((theme) => ({
    gridItem: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        padding: 20
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        elevation: 10,
        variant: "outlined",
    },
}));


const HandleScrumPoker = ({ location }) => {
    /* Scrum master flag (determine if this user is SM) */
    const [isScrumMaster, setScrumMaster] = useState(false);
    /* User control list selected index tracker */
    const [selectedUserIndex, setSelectedUserIndex] = React.useState(-1);
    /**
     * Could reduce the useState's here, the user based fields could be a single object
     * with all user state inside. Until then I've added a new state for scrummy above ^.
     */
    const [room, setRoom] = useState('');

    const { logout } = useAccountContext();
    const { setIsAuthenticated } = useAuthContext();

    const history = useHistory();
    const classes = useStyles();

    const {
        initialiseSocket,
        emitJoin,
        emitDisconnect,
        emitExpand,
        onScrumMasterUpdate,
        emitUpdateScrumMaster,
        emitKickUser,
        onKickUser,
        socket } = useSocket();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        initialiseSocket();
        emitJoin(setRoom, name, room, estimate, setScrumMaster);
        onScrumMasterUpdate(setScrumMaster, handleEstimate);
        onKickUser(logout, setIsAuthenticated, emitDisconnect, history);

        // temporary fix for when a new user joins it automatically set the expanded card to not show
        emitExpand(true);

        return () => {
            emitDisconnect();
        };

    }, [config.SOCKET_IO_HOST, location.search]);

    const { estimate, estimates, handleEstimate, setEstimate } = useEstimate();
    const { expandAll, handleExpandClick } = useExpand();
    const { handleResetEstimate } = useResetEstimate(estimate, estimates, setEstimate);
    const { deleteRoom } = useDeleteRoom(room, setIsAuthenticated, history);

    /**
     * Handles controlling the state of an 'expanded' user in the list.
     * It corresponds to their index in the estimates
     */
    const [usersExpandState, setUserExpandState] = React.useState(new Array(estimates.length).fill(false));

    /**
     * Sets the selected user index (for highlighting etc.)
     * @todo Not a fan of multiple setting of the state, we need one wholesome state ideally.
     */
    const handleUserListClick = (event, index) => {
        setSelectedUserIndex(prevIndex => {
            if (prevIndex === index) {
                setUserExpandState(prevExpandStates => {
                    prevExpandStates[prevExpandStates.findIndex(item => item === true)] = false;
                    return prevExpandStates;
                })
                return -1;
            } else {
                setUserExpandState(prevExpandStates => {
                    prevExpandStates[prevExpandStates.findIndex(item => item === true)] = false;
                    prevExpandStates[index] = true;
                    return prevExpandStates;
                })

                return index;
            }
        });
    };

    const exit = async () => {
        logout();
        setIsAuthenticated(false);

        localStorage.clear();
        emitDisconnect();
        history.push('/');
    };

    return (<div>

        {/**
         * Room name
         */}
        <Paper className={classes.paper}>
            <Typography className={classes.gridItem} variant="h4">
                Room Name: {room}
            </Typography>
        </Paper>
        {/**
         * Main screen wrapper
         */}
        <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={1}
        >

            {/**
             * Cards & Estimate updater / dropdown
             */}
            <Grid container item xs={8}>

                {estimates.map(item =>
                    <Grid key={`${item.users_name}${item.estimate}`} item xs={2}>
                        <PokerCard name={item.users_name} estimate={item.estimate} isExpanded={expandAll}></PokerCard>
                    </Grid>
                )}

                <Grid item xs={2}>
                    <DropDownList estimate={estimate} numberList={config.numberList} setEstimate={handleEstimate}></DropDownList>
                </Grid>

            </Grid>

            {/**
             * Buttons
             */}
            <Grid container item xs={4}>
                <div className={classes.root}>
                    <List component="scrum-controls" className={classes.root}>
                        <ListSubheader component="div" id="nested-list-subheader-1">
                            General:
                    </ListSubheader>
                        <ListItemButton description="Exit Room" onClick={exit} Icon={ExitToAppIcon} />
                    </List>
                    <List className={classes.root}>
                        {
                            isScrumMaster ?

                                <ListSubheader component="div" id="nested-list-subheader-2">
                                    ScrumMaster Controls:
                            </ListSubheader>
                                : null
                        }
                        {isScrumMaster ?
                            !expandAll ?
                                <ListItemButton description="Show Estimates" onClick={handleExpandClick} Icon={VisibilityIcon} /> :
                                <ListItemButton description="Hide Estimates" onClick={handleExpandClick} Icon={VisibilityOffIcon} />
                            : null
                        }
                        {isScrumMaster ?
                            <div>
                                <ListItemButton description="Reset Estimates" onClick={handleResetEstimate} Icon={RotateLeftIcon} />
                                <ListItemButton description="Delete Room" onClick={deleteRoom} Icon={DeleteForeverIcon} />
                            </div>
                            :
                            null
                        }
                    </List>
                    <Divider />
                    {/**
                     * User list
                     */}
                    {isScrumMaster ?
                        <List component="user-list">
                            <ListSubheader component="div" id="nested-list-subheader-1">
                                Users:
                            </ListSubheader>
                            {estimates.map((user, i) => {
                                if (user.scrum_master !== true) {
                                    return <UserListItem
                                        key={user.id}
                                        selectedUserIndex={selectedUserIndex}
                                        handleUserListClick={handleUserListClick}
                                        emitUpdateScrumMaster={emitUpdateScrumMaster}
                                        setScrumMaster={setScrumMaster}
                                        emitKickUser={emitKickUser}
                                        usersExpandState={usersExpandState}
                                        classes={classes}
                                        index={i}
                                        user={user} />
                                }
                            }
                            )}
                        </List>
                        : null}
                </div>

            </Grid>
        </Grid>
    </div>
    );
};

export default HandleScrumPoker;

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

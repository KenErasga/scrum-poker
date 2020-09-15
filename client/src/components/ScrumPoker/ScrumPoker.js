// General imports:
import React, { useContext, useEffect, useState } from 'react';
import { AccountContext, AuthContext } from '../../providers/Cognito';
import { Typography, Button, Grid, makeStyles } from '@material-ui/core';
import config from '../../config/config'
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PokerCard from '../../commonComponents/PokerCard';
import DropDownList from '../Dropdown/Dropdown';
import useEstimate from './useEstimate';
import useExpand from './useExpand';
import useResetEstimate from './useResetEstimate'
import useDeleteRoom from './useDeleteRoom'
import { useSocket } from '../../providers/SocketIO';
import ListItemButton from '../../commonComponents/ListItemButton'

// List imports:
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
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
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
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

    const { logout, deleteUser, globalSignOut } = useContext(AccountContext);
    const { setIsAuthenticated } = useContext(AuthContext);

    const history = useHistory();
    const classes = useStyles();

    const {
        initialiseSocket,
        emitJoin,
        emitDisconnect,
        emitExpand,
        onDeleteRoom,
        emitDeleteRoom,
        onScrumMasterUpdate,
        emitUpdateScrumMaster, socket } = useSocket();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        initialiseSocket();
        emitJoin(setRoom, name, room, estimate, setScrumMaster);
        onScrumMasterUpdate(setScrumMaster, handleEstimate);

        // temporary fix for when a new user joins it automatically set the expanded card to not show
        emitExpand(true);

        return () => {
            emitDisconnect();
        };

    }, [config.SOCKET_IO_HOST, location.search]);

    const { estimate, estimates, handleEstimate, setEstimate } = useEstimate();
    const { expandAll, handleExpandClick } = useExpand();
    const { handleResetEstimate } = useResetEstimate(estimate, estimates, setEstimate);
    const { wipeRoom } = useDeleteRoom(room, setIsAuthenticated, history);

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
        <Typography className={classes.gridItem} variant="h4">
            Room Name: {room}
        </Typography>
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
             * Buttons & User list
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
                                <ListItemButton description="Wipe Room" onClick={wipeRoom} Icon={DeleteForeverIcon} />
                            </div>
                            :
                            null
                        }
                    </List>
                    <Divider />
                    <List component="user-list">
                        {isScrumMaster ? estimates.map((user, i) => {
                            if (user.scrum_master !== true) {
                                return <UserListItem
                                    key={user.id}
                                    selectedUserIndex={selectedUserIndex}
                                    handleUserListClick={handleUserListClick}
                                    emitUpdateScrumMaster={emitUpdateScrumMaster}
                                    setScrumMaster={setScrumMaster}
                                    usersExpandState={usersExpandState}
                                    classes={classes}
                                    index={i}
                                    user={user} />
                            }
                        }
                        ) : null}

                    </List>
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
                        <ListItemText primary={`Kick User`} />
                    </ListItem>
                </List>
            </Collapse>
        </div>
    );
}


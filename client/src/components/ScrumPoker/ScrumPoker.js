import React, { useEffect, useState } from 'react';
// General imports:
import { useAccountContext, useAuthContext } from '../../providers/Cognito';
import config from '../../config/config'
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { DropDownList, ListItemButton, PokerCard, HeaderBar } from '../../common/index';
import { useEstimate, useExpand, useResetEstimate, useDeleteRoom } from './scrumPokerHooks';
import { useSocket } from '../../providers/SocketIO';
import UserListItem from './userListItem'

// MAterial UI
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core/styles";
import {Button, Switch, FormControlLabel } from '@material-ui/core';


import {
  Grid,
  makeStyles,
  useTheme,
  ListSubheader,
  List,
  Divider,
  Toolbar,
} from '@material-ui/core';

// Icons imports:
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDarkTheme} from '../hooks/useDarkTheme';

const drawerWidth = 240;

// MUI Classes
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: drawerWidth ? {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    } : null
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  switch: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  exit: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));


const HandleScrumPoker = ({ location }, props) => {
  /* Scrum master flag (determine if this user is SM) */
  const [isScrumMaster, setScrumMaster] = useState(false);
  /* User control list selected index tracker */
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  /**
   * Could reduce the useState's here, the user based fields could be a single object
   * with all user state inside. Until then I've added a new state for scrummy above ^.
   */
  const [room, setRoom] = useState('');

  const { logout } = useAccountContext();
  const { setIsAuthenticated } = useAuthContext();

  const history = useHistory();

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
  const { darkState,
    setDarkState,
    darkTheme } = useDarkTheme();
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

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar className={classes.toolbar} />
      <List component="scrum-controls">
        <Divider />
        <ListSubheader>
          General:
        </ListSubheader>
        <ListItem description="Send Estimate">
          <DropDownList estimate={estimate} numberList={config.numberList} setEstimate={handleEstimate}></DropDownList>
        </ListItem>
      </List>
      <List>
        <Divider />
        {
          isScrumMaster ?
            <ListSubheader>
              Controls:
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
          <ListItemButton description="Reset Estimates" onClick={handleResetEstimate} Icon={RotateLeftIcon} />
          :
          null
        }
        {isScrumMaster ?
          <ListItemButton description="Delete Room" onClick={deleteRoom} Icon={DeleteForeverIcon} />
          :
          null
        }
      </List>
      <Divider />
      {/**
             * User list
             */}
      {isScrumMaster ?
        <List>
          <ListSubheader>
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
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HeaderBar description={`Room Name: ${room}`} styling={classes.appBar} title={classes.title}>
        <Button  color='inherit' onClick={exit} endIcon={<ExitToAppIcon />}>Exit</Button>
      </HeaderBar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={1}
        >
          <Grid container item xs={12} spacing={3}>

            {estimates.map(item =>
              <Grid container key={`${item.users_name}${item.estimate}`} item xs={2} spacing={3}>
                <PokerCard name={item.users_name} estimate={item.estimate} isExpanded={expandAll}></PokerCard>
              </Grid>
            )}

          </Grid>
        </Grid>

      </main>
      <FormControlLabel control={      <Switch 
                    checked={darkState}
                    onChange={e => setDarkState(!darkState)}
                    color="primary"
                    name="darkState"
                    className={classes.switch}         
        />} label="Dark Mode" className={classes.switch}/>
      </ThemeProvider>
    </div>
  );
};

export default HandleScrumPoker;

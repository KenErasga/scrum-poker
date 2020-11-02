import React, { useContext, useState, useEffect } from 'react'
import { CognitoAccessContext } from '../../providers/Cognito';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import { Container } from '@material-ui/core';

// MUI Imports:
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  vTabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabContainer: {
    width: "90%"
  },
  modalContainer: {
    backgroundColor: "white"
  },
  modalReset: {
    border: "none",
    outline: "none"
  }
}));

/**
 * Specifically used within the vertical tabs only
 * @param {*} props 
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container maxWidth="xl">{children}</Container>
      )}
    </div>
  );
}

const HandleRooms = () => {
  const classes = useStyles();
  const [userList, setUserList] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [modalState, setModalState] = useState({
    username: "",
    open: false
  });

  const { listCognitoUsers } = useContext(CognitoAccessContext);

  useEffect(() => {
    listCognitoUsers().then(data => {
      data.Users = data.Users
        .map(u => {
          u.UserCreateDate = Date.parse(u.UserCreateDate)
          return u;
        })
        .sort((a, b) => (a.UserCreateDate < b.UserCreateDate) ? 1 : -1)
        .map(u => {
          u.UserCreateDate = new Date(u.UserCreateDate).toLocaleDateString();
          return u;
        });
      setUserList(data)
    });
  }, [Object.keys(userList).length])


  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>

      {/**
       * Tabs:
       */}
      <div className={classes.vTabRoot}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Create Room" id={0} />
          <Tab label="Join Room" id={1} />
          <Tab label="View Rooms" id={2} />
        </Tabs>
        {/**
         * Create Room:
         */}
        <TabPanel value={tabIndex} index={0} className={classes.tabContainer}>
          <CreateRoom></CreateRoom>
        </TabPanel>
        {/**
         * Join Room:
         */}
        <TabPanel value={tabIndex} index={1} className={classes.tabContainer}>
          <JoinRoom/>
        </TabPanel>
        {/**
         * View Rooms:
         */}
        <TabPanel value={tabIndex} index={2} className={classes.tabContainer}>
          <blockquote>Note: You can click on a room to join it!</blockquote>
          <List component="view-rooms" className={classes.root} aria-label="mailbox folders">
            {userList.Users?.map(({ Username, UserCreateDate }, i) => {
              if (i === userList.length - 1) {
                console.log("mhm?", Username)
              } else {
                return (
                  <ListItem key={i} button divider dense onClick={() => setModalState((p) => ({
                    open: true,
                    username: Username
                  }))}>
                    <ListItemText primary={Username} secondary={`Created at: ${UserCreateDate}`} />
                  </ListItem>
                );
              }
            })}
          </List>
        </TabPanel>
        {/**
         * Modal instance
         */}
        <JoinRoomModal modalState={modalState} setModalState={setModalState} />
      </div>
    </>
  )
};


const JoinRoomModal = ({ modalState, setModalState }) => {
  const classes = useStyles();

  return (
    <Modal 
      style={{ 
        width: "50vw",
        margin: "10vw auto",
        outline: "none"
      }}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      open={modalState.open} 
      onClose={() => setModalState(({ open: false, username: "" }))}>
        <Container className={classes.modalContainer} maxWidth="sm">
          <JoinRoom listJoin={true} listJoinRoomName={modalState.username}/>
        </Container>
    </Modal>
  )

}

export default HandleRooms;
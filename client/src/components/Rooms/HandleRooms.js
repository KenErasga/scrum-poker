import React, { useContext, useState, useEffect } from 'react'
import { CognitoAccessContext } from '../../providers/Cognito';
import JoinCreateRoom from './JoinCreateRoom';
import { Card, Container, Grid, Paper } from '@material-ui/core';

// MUI Imports:
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: "white"
  },
  modalReset: {
    border: "none",
    outline: "none"
  },
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 10,
    variant: "outlined",
  }  
}));

const HandleRooms = () => {
  const classes = useStyles();
  const [userList, setUserList] = useState({});
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

  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={2} justify='space-between'>
        
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <JoinCreateRoom />
            </Paper>
          </Grid>

          <Grid item xs={10}>
            <Grid container justify="center" spacing={1}>
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
              <JoinRoomModal modalState={modalState} setModalState={setModalState} />
            </Grid>
          </Grid>
      </Grid>
    </Container>
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
        <JoinCreateRoom listJoin={true} listJoinRoomName={modalState.username} />
      </Container>
    </Modal>
  )

}

export default HandleRooms;
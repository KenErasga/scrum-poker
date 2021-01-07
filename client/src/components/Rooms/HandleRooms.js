import React, { useContext, useState, useEffect } from 'react'
import { CognitoAccessContext } from '../../providers/Cognito';
import JoinCreateRoom from './JoinCreateRoom';
import JoinRoomModal from './JoinRoomModal';
import { Container, Grid, Paper } from '@material-ui/core';

// MUI Imports:
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 10,
    variant: "outlined",
  },
  control: {
    padding: theme.spacing(4),
  },
}));

const HandleRooms = () => {
  const classes = useStyles();
  const [userList, setUserList] = useState([]);
  const [modalState, setModalState] = useState({
    username: "",
    open: false
  });

  const { listCognitoUsers } = useContext(CognitoAccessContext);

  useEffect(() => {
    listCognitoUsers().then(data => setUserList(data));
  }, [userList])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Username', headerName: 'Room name', flex: 2 },
    { field: 'UserCreateDate', headerName: 'Created at', flex: 0.5 },
  ];

  const onRowClick = (event) => {
      setModalState((p) => ({
      open: true,
      username: event.row.Username
    }))
  };

  return (
    <Grid container className={classes.root} spacing={12} >

      <Grid item xs={12}>
        <Grid container justify='center' spacing={2}>
          <Paper className={classes.paper}>
            <JoinCreateRoom />
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12}>
          <Grid Container className={classes.control}>
            <blockquote>Note: You can click on a room to join it!</blockquote>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={userList} columns={columns} pageSize={5} onRowClick={(event) => onRowClick(event)}/>
            </div>
            <JoinRoomModal modalState={modalState} setModalState={setModalState} />
          </Grid>
      </Grid>

    </Grid>
  )
};

export default HandleRooms;
import React, { useContext, useState, useEffect } from 'react'
import { CognitoAccessContext } from '../../providers/Cognito';
import JoinCreateRoom from './JoinCreateRoom';
import JoinRoomModal from './JoinRoomModal';
import TabPanel from './TabPanel';
import { HeaderBar } from '../../common/index'
import { Grid, Paper, Tabs, Tab, Box, Typography } from '@material-ui/core';

import {useDarkTheme} from '../hooks/useDarkTheme';
// MUI Imports:
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import {Switch } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  appBar: {
    position: "static"
  },
  vTabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  tabContainer: {
    width: "90%"
  },
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 100,
    variant: "outlined",
  },
  control: {
    padding: theme.spacing(6),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  switch: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const HandleRooms = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [userList, setUserList] = useState([]);
  const [modalState, setModalState] = useState({
    username: "",
    open: false
  });

  const { listCognitoUsers } = useContext(CognitoAccessContext);

  useEffect(() => {
    listCognitoUsers().then(data => setUserList(data));
  }, [userList.length])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Username', headerName: 'Room name', flex: 2 },
    { field: 'UserCreateDate', headerName: 'Created at', flex: 0.5 },
  ];

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const onRowClick = (event) => {
    setModalState((p) => ({
      open: true,
      username: event.row.Username
    }))
  };

  const { darkState,
    setDarkState,
    darkTheme } = useDarkTheme();

  return (<ThemeProvider theme={darkTheme}>
    
    <div>
    
    <HeaderBar description="Scrum Poker Online" styling={classes.appBar}/>
    <CssBaseline>
    <Box component= 'div' className={classes.vTabRoot}>
    
      <Paper>
      <Tabs
      orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Join or Create Room" id="vertical-tab-0" aria-controls="vertical-tabpanel-0" />
        <Tab label="Find a room to join" id="vertical-tab-1" aria-controls="vertical-tabpanel-1" />
      </Tabs>
      </Paper>
      <TabPanel value={tabIndex} index={0} className={classes.tabContainer}>
          <Grid justify='center' spacing={2}>
            <Paper className={classes.paper}>
              <JoinCreateRoom />
            </Paper>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.tabContainer}>
          <Grid className={classes.control}>
            <Paper style={{ height: 400, width: '100%' }}>
              <DataGrid rows={userList} columns={columns} pageSize={5} onRowClick={(event) => onRowClick(event)} />
            </Paper>
            <JoinRoomModal modalState={modalState} setModalState={setModalState} />
          </Grid>
      </TabPanel>
    </Box>
    <Switch 
                    checked={darkState}
                    onChange={e => setDarkState(!darkState)}
                    color="primary"
                    name="darkState"
                    className={classes.switch}
                  />
                  </CssBaseline>
  </div>
  </ThemeProvider>
  )
};

export default HandleRooms;
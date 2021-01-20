import React, { useContext, useState, useEffect } from 'react'
import { CognitoAccessContext } from '../../providers/Cognito';
import JoinCreateRoom from './JoinCreateRoom';
import RoomList from './RoomList';
import TabPanel from './TabPanel';
import { HeaderBar } from '../../common/index'
import { Grid, Paper, Tabs, Tab, CssBaseline, Container } from '@material-ui/core';
import JoinRoomModal from './JoinRoomModal';

import {useDarkTheme} from '../hooks/useDarkTheme';
// MUI Imports:
import { makeStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

import { ThemeProvider } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  appBar: {
    position: "static",
  },
  vTabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  tabContainer: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
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
    backgroundColor: theme.palette.background.default,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  switch: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  gridContainer: {
    padding: theme.spacing(6),
    spacing: 2,
    backgroundColor: theme.palette.background.default,
  },
  containerTab: {
    backgroundColor: theme.palette.background.default,
  }
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

  const { darkState,
    setDarkState,
    darkTheme } = useDarkTheme();

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

  return (<ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <div>
    
    <HeaderBar description="Scrum Poker Online" styling={classes.appBar}/>
    
    <div className={classes.vTabRoot}>
    
      <Paper variant="square" position="static">
        <Tabs
          variant="fullWidth"
          value={tabIndex}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Join or Create Room" id="vertical-tab-0" aria-controls="vertical-tabpanel-0" />
          <Tab label="Find a room to join" id="vertical-tab-1" aria-controls="vertical-tabpanel-1" />
        </Tabs>
      </Paper>

      <Container classname={classes.containerTab}>
      <TabPanel value={tabIndex} index={0} className={classes.tabContainer}>
        <Grid container className={classes.gridContainer} justify='center'>
              <JoinCreateRoom />
        </Grid>
      </TabPanel>
      </Container>

      <TabPanel value={tabIndex} index={1} className={classes.tabContainer} >
          <Grid className={classes.control} >
            <RoomList userList={userList} onRowClick={onRowClick}></RoomList>
          </Grid>
      </TabPanel>
      
    </div>

    <JoinRoomModal modalState={modalState} setModalState={setModalState} />

    <Switch 
        checked={darkState}
        onChange={e => setDarkState(!darkState)}
        color="primary"
        name="darkState"
        className={classes.switch}
      />
  </div>
  </ThemeProvider>
  )
};

export default HandleRooms;
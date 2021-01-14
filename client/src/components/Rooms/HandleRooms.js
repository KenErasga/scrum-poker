import React, { useContext, useState, useEffect } from 'react'
import { CognitoAccessContext } from '../../providers/Cognito';
import JoinCreateRoom from './JoinCreateRoom';
import JoinRoomModal from './JoinRoomModal';
import { Grid, Paper, Tabs, Tab, Container } from '@material-ui/core';

// MUI Imports:
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
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
  tabContainer: {
    width: "90%"
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
    padding: theme.spacing(6),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
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
  }, [userList])

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

  return (
    <div className={classes.vTabRoot}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Join or Create Room" id="vertical-tab-0" aria-controls="vertical-tabpanel-0"/>
        <Tab label="List of Rooms" id="vertical-tab-1" aria-controls="vertical-tabpanel-1" />
      </Tabs>
      <TabPanel value={tabIndex} index={0} className={classes.tabContainer}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            <Paper className={classes.paper}>
              <JoinCreateRoom />
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.tabContainer}>
        <Grid item xs={12}>
            <Grid container className={classes.control}>
              <blockquote>Note: You can click on a room to join it!</blockquote>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={userList} columns={columns} pageSize={5} onRowClick={(event) => onRowClick(event)} />
              </div>
              <JoinRoomModal modalState={modalState} setModalState={setModalState} />
            </Grid>
        </Grid>
      </TabPanel>
    </div>
  )
};

export default HandleRooms;

function TabPanel(props) {
  const { children, value, index, classes, ...other } = props;

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

function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Join or Create Room" id="vertical-tab-0" aria-controls="vertical-tabpanel-0"/>
        <Tab label="List of Rooms" id="vertical-tab-1" aria-controls="vertical-tabpanel-1" />
      </Tabs>
      <TabPanel value={value} index={0} classes={classes}>
      </TabPanel>
      <TabPanel value={value} index={1} classes={classes}>
      </TabPanel>
    </div>
  );
}
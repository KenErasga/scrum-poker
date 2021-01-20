import React, { useState  } from 'react'

import { Paper, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      elevation: 10,
      variant: "outlined",
      margin: 20,
      padding: 20,
      height: 400,
    },
    control: {
      padding: theme.spacing(6),
    },
  }));

const RoomList = ({ userList, onRowClick }) => {
    const classes = useStyles();

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'Username', headerName: 'Room name', flex: 2 },
        { field: 'UserCreateDate', headerName: 'Created at', flex: 0.5 },
    ];

    return (
            <Paper className={classes.paper}>
                <DataGrid rows={userList} columns={columns} pageSize={5} onRowClick={(event) => onRowClick(event)} />
            </Paper>

    )
};

export default RoomList;
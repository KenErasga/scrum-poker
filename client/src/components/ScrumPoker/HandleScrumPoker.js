import React, { useContext, useEffect, useState } from 'react';
import { AccountContext, useAppContext } from '../Accounts/CognitoProvider';
import { Typography, Button, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PokerCard from '../Card/Card';
import DropDownList from '../Dropdown/Dropdown'
import io from 'socket.io-client';
let socket;

const HandleScrumPoker = ({ location }) => {
    const [room, setRoom] = useState('');
    // const [name, setName] = useState('');
    const [number, setNumber] = useState("1");
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandAll, setExpandAll] = useState(false);
    const [estimates, setEstimates] = useState([]);
    const numberList = ["1", "2", "3", "5", "8", "13", "20", "40"];

    const ENDPOINT = process.env.SOCKETIO_HOST || '192.168.64.2:30001';
    // const ENDPOINT = process.env.SOCKETIO_HOST || "localhost:3001";

    const { logout } = useContext(AccountContext);
    const { userHasAuthenticated } = useAppContext();

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        // setName(name);
        setRoom(room);

        socket.emit('join', { name, room, number }, () => {
            console.log("USER JOINED!");
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('estimate', ({ users }) => {
            setEstimates(users);
        });
    }, [number]);

    useEffect(() => {
        socket.on('expand', ({ expand }) => {
            setExpandAll(!expand.isExpanded);
            console.log("is expanded", !expand.isExpanded);
        });
    }, [isExpanded]);

    const handleExpandClick = async (e) => {
        e.preventDefault();

        setIsExpanded(!isExpanded);

        socket.emit('clickExpand', { isExpanded }, () => {
            console.log("Show Estimate is clicked");
        });
    };

    const handleEstimate = (e) => {
        setNumber(e);
        if (e) {
            socket.emit('sendEstimate', e, () => console.log("Estimate CHANGE!"));
        };
    };

    const exit = async () => {
        logout();
        userHasAuthenticated(false);
        history.push('/');
        history.go();
    };

    const ScrumPoker = () => {
        return (<div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography className={classes.gridItem} variant="h4">
                        Room Name: {room}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        className={classes.gridItem}
                        onClick={handleExpandClick}
                        variant="contained"
                    >
                        Show estimate
                        </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button className={classes.gridItem} onClick={exit} variant="contained">Exit room</Button>
                </Grid>
                {estimates.map(item => {
                    return (
                        <Grid item xs={2}>
                            <PokerCard name={item.name} number={item.number} isExpanded={expandAll}></PokerCard>
                        </Grid>
                    );
                })}
                <Grid item xs={2}>
                    <DropDownList number={number} numberList={numberList} setNumber={handleEstimate}></DropDownList>
                </Grid>
            </Grid>
        </div>
        );
    };

    return (<div>
        <ScrumPoker />
    </div>
    )
};

export default HandleScrumPoker;


const useStyles = makeStyles((theme) => ({
    gridItem: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        padding: 20
    },
}));
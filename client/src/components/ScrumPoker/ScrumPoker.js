import React, { useContext, useEffect, useState } from 'react';
import { AccountContext, AuthContext } from '../Accounts/CognitoProvider';
import { Typography, Button, Grid, makeStyles } from '@material-ui/core';
import config from '../../config/config'
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PokerCard from '../../commonComponents/Card';
import DropDownList from '../Dropdown/Dropdown'
import io from 'socket.io-client';
let socket;

const HandleScrumPoker = ({ location }) => {
    const [room, setRoom] = useState('');
    const [number, setNumber] = useState("1");
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandAll, setExpandAll] = useState(false);
    const [estimates, setEstimates] = useState([]);
    const numberList = config.numberList;

    const ENDPOINT = process.env.REACT_APP_SOCKETIO_HOST || '192.168.64.2:30001';
    // const ENDPOINT = process.env.SOCKETIO_HOST || "localhost:3001";

    const { logout } = useContext(AccountContext);
    const { setIsAuthenticated } = useContext(AuthContext);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

        setRoom(room);

        socket.emit('join', { users_name: name, room, estimate: number }, (data) => {
            console.log("USER JOINED!");
            console.log(data, "this is where u error handle ken")
        });

        return () => {
            socket.emit('disconnect');
            socket.close();
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.once('estimate', ({ users }) => {
            setEstimates(users);
        })
    }, [estimates]);

    useEffect(() => {
        socket.on('expand', ({ expand }) => {
            setExpandAll(!expand);
            console.log("is expanded", !expand);
        });
    }, [isExpanded]);

    const handleExpandClick = async (e) => {
        e.preventDefault();

        setIsExpanded(!isExpanded);

        socket.emit('clickExpand', { isExpanded }, (data) => {
            console.log("Show Estimate is clicked");
            console.log(data, "this is where u handle the expaded errors ken");
        });
    };

    const handleEstimate = (e) => {
        setNumber(e);
        if (e) {
            console.log("Changing estimate...");
            socket.emit('sendEstimate', e, (data) => console.log(data));
        };
    };

    const exit = async () => {
        logout();
        setIsAuthenticated(false);

        history.push('/');
        history.go()
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
                        <Grid key={`${item.name}${item.estimate}`} item xs={2}>
                            <PokerCard name={item.name} number={item.estimate} isExpanded={expandAll}></PokerCard>
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
import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Accounts/Accounts';
import { Typography, Button, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PokerCard from '../Card/Card';
import DropDownList from '../Dropdown/Dropdown'
import io from 'socket.io-client';
let socket;

const HandleScrumPoker = ({ location }) => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState("1");
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandAll, setExpandAll] = useState(false)
    const [estimates, setEstimates] = useState([])
    const numberList = ["1", "2", "3", "5", "8", "13", "20"];

    const ENDPOINT = "localhost:5000";

    const { getSession, logout, loggedIn, setLoggedIn } = useContext(AccountContext);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        getSession().then(() => setLoggedIn(true))
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room, number }, () => {
            console.log("USER JOINED!");
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('estimate', ({ users }) => {
            setEstimates(users);
        });
    }, [number]);

    useEffect(() => {
        socket.on('expand', ({expand}) => {
            setExpandAll(!expand.isExpanded);
            console.log("is expandedsas2", !expand.isExpanded);
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
            console.log("estimate in front end", e)
            socket.emit('sendEstimate', e, () => console.log("Estimate CHANGE!"));
        };
    };

    const exit = () => {

        if (estimates.length < 1) {
            logout();
        }

        socket.emit('disconnect', { name, room }, () => {
            console.log("USER HAS LEFT!");

        });

        socket.off();

        history.push('/')
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
        {loggedIn && <ScrumPoker />}
    </div>
    )
};

export default HandleScrumPoker;


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    gridItem: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        padding: 20
    },
}));
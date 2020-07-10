import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Accounts/Accounts';
import { Typography, Button, Grid, Paper, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PokerCard from '../Card/Card';

const HandleScrumPoker = ({ location }) => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState(8);
    const [isExpanded, setIsExpanded] = useState(false);
    const [estimates, setEstimates] = useState([
        {name: "ken", number: 8},
        {name: "ken1", number: 13},
        {name: "ken2", number: 5},
        {name: "ken2", number: 5},
        {name: "ken2", number: 5},
        {name: "ken2", number: 5},
    ])

    const { getSession, logout, setLoggedIn } = useContext(AccountContext);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const history = useHistory();
    const classes = useStyles();

    const ENDPOINT = "localhost:3001";

    useEffect(() => {
        getSession().then(() => setLoggedIn(true))
    });

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);

    }, [ENDPOINT, location.search]);

    const exit = () => {
        logout();
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
                    <Button className={classes.gridItem}  onClick={exit} variant="contained">Exit room</Button>
                </Grid>
                <Grid item xs={2}>
                    <PokerCard name={name} number={number} isExpanded={isExpanded} handleExpandClick={handleExpandClick}></PokerCard>
                </Grid>
                <Grid item xs={2}>
                    <PokerCard name={name} number={number} isExpanded={isExpanded} handleExpandClick={handleExpandClick}></PokerCard>
                </Grid>
                {estimates.map(item => {
                    return (
                    <Grid item xs={2}>
                        <PokerCard name={item.name} number={item.number} isExpanded={isExpanded} handleExpandClick={handleExpandClick}></PokerCard>
                    </Grid>
                    );
                })}
            </Grid>
        </div>
        );
    };

    return (
        <ScrumPoker />
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
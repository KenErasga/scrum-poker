import React, { useContext, useEffect, useState } from 'react';
import { AccountContext, AuthContext } from '../../providers/Cognito/Cognito';
import { Typography, Button, Grid, makeStyles } from '@material-ui/core';
import config from '../../config/config'
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PokerCard from '../../commonComponents/PokerCard';
import DropDownList from '../Dropdown/Dropdown';
import {
    emitJoin,
    emitDisconnect,
    emitExpand,
    emitSendEstimate,
    onEstimate,
    onExpand
} from '../../providers/SocketIO/SocketIO';

const HandleScrumPoker = ({ location }) => {
    const [room, setRoom] = useState('');
    const [estimate, setNumber] = useState("1");
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandAll, setExpandAll] = useState(false);
    const [estimates, setEstimates] = useState([]);

    const { logout } = useContext(AccountContext);
    const { setIsAuthenticated } = useContext(AuthContext);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        emitJoin(setRoom, name, room, estimate);

        return () => {
            emitDisconnect();
        };
    }, [config.SOCKET_IO_HOST, location.search]);

    useEffect(() => {
        onEstimate(setEstimates);
    }, [estimates]);

    useEffect(() => {
        onExpand(setExpandAll, isExpanded);
    }, [isExpanded]);

    const handleExpandClick = async (e) => {
        e.preventDefault();

        setIsExpanded(!isExpanded);

        emitExpand(isExpanded);
    };

    const handleEstimate = (e) => {
        emitSendEstimate(setNumber, e);
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
                        <Grid key={`${item.users_name}${item.estimate}`} item xs={2}>
                            <PokerCard name={item.users_name} estimate={item.estimate} isExpanded={expandAll}></PokerCard>
                        </Grid>
                    );
                })}
                <Grid item xs={2}>
                    <DropDownList estimate={estimate} numberList={config.numberList} setNumber={handleEstimate}></DropDownList>
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
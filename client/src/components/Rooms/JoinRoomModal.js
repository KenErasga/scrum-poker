import React from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import JoinCreateRoom from './JoinCreateRoom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    modalContainer: {
        backgroundColor: "white"
    },
    modalReset: {
        border: "none",
        outline: "none"
    },
}));

const JoinRoomModal = ({ modalState, setModalState }) => {
    const classes = useStyles();

    return (
        <Modal
            style={{
                width: "50vw",
                margin: "10vw auto",
                outline: "none"
            }}
            disableAutoFocus={true}
            disableEnforceFocus={true}
            open={modalState.open}
            onClose={() => setModalState(({ open: false, username: "" }))}>
            <Container className={classes.modalContainer} maxWidth="sm">
                <JoinCreateRoom listJoin={true} listJoinRoomName={modalState.username} />
            </Container>
        </Modal>
    )

}

export default JoinRoomModal;
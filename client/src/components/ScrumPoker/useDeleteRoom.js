import { useState, useEffect, useContext } from 'react';
import { useSocket } from '../../providers/SocketIO';
import { AccountContext } from '../../providers/Cognito';

const useDeleteRoom = (room, setIsAuthenticated, history) => {
    const { logout, deleteUser } = useContext(AccountContext);

    const { onDeleteRoom, emitDeleteRoom, emitDisconnect } = useSocket();

    useEffect(() => {
        onDeleteRoom(logout, setIsAuthenticated, emitDisconnect, history);
    }, []);

    const wipeRoom = (e) => {
        e.preventDefault();
        deleteUser(room);
        emitDeleteRoom();
    };

    return {
        wipeRoom
    }
};

export default useDeleteRoom;
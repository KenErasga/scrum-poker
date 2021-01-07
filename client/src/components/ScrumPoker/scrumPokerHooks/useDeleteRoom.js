import { useEffect, useContext } from 'react';
import { useSocket } from '../../../providers/SocketIO';
import { AccountContext } from '../../../providers/Cognito';

const useDeleteRoom = (room, setIsAuthenticated, history) => {
    const { logout, deleteUser } = useContext(AccountContext);

    const { onDeleteRoom, emitDeleteRoom, emitDisconnect } = useSocket();

    useEffect(() => {
        onDeleteRoom(logout, setIsAuthenticated, emitDisconnect, history);
    });

    const deleteRoom = (e) => {
        e.preventDefault();
        deleteUser(room);
        emitDeleteRoom();
    };

    return {
        deleteRoom
    }
};

export default useDeleteRoom;
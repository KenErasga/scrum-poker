import io from 'socket.io-client';
import { useErrorHandler } from '../../components/Error/ErrorHandler'
import React, { createContext, useContext } from 'react';
const ENDPOINT = process.env.REACT_APP_SOCKETIO_HOST || '192.168.99.101:30001';

const SocketContext = createContext();

const Socket = props => {
    let socket

    const { setErrorMessage } = useErrorHandler();

    const initialiseSocket = () => {
        socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

        onConnectionError();
        onError();
        onTimeout();
    };

    const emitJoin = (setRoom, name, room, estimate) => {
        setRoom(room);
        socket.emit('join', { users_name: name, room, estimate }, (data) => {
            console.log(data);
        });
    };

    const emitDisconnect = () => {
        socket.emit('disconnect');
        socket.close();
    };

    const emitExpand = (isExpanded) => {
        socket.emit('clickExpand', { isExpanded }, (data) => {
            console.log(data);
        });
    };

    const emitSendEstimate = (setNumber, e) => {
        setNumber(e);
        if (e) {
            socket.emit('sendEstimate', e, (data) => {
                console.log(data);
            });
        };
    };

    const onEstimate = (setEstimates) => {
        socket.once('estimate', ({ users }) => {
            setEstimates(users);
        });

    };

    const onExpand = (setExpandAll) => {
        socket.on('expand', ({ expand }) => {
            setExpandAll(!expand.isExpanded);
            console.log("is expanded", !expand.isExpanded);
        });
    };

    const onConnectionError = () => {
        socket.on('connect_error', function (error) {
            console.error(error);
            setErrorMessage('Error on connection')
        });
    };

    const onError = () => {
        socket.on('error', function (error) {
            console.error(error);
            setErrorMessage('Error in server')
        });
    };

    const onTimeout = () => {
        socket.on('connect_timeout', function (timeout) {
            console.log(timeout);
            setErrorMessage('Connection Timeout')
        });
    };

    return (
        <SocketContext.Provider value={{
            initialiseSocket,
            emitJoin,
            emitDisconnect,
            emitExpand,
            emitSendEstimate,
            onEstimate,
            onExpand
        }}>
            {props.children}
        </SocketContext.Provider>
    );
};

const useSocket = () => useContext(SocketContext);

export { Socket, useSocket }
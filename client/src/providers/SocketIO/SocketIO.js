import io from 'socket.io-client';
import { useErrorHandler } from '../../components/Error/ErrorHandler'
import React, { createContext, useContext } from 'react';
const ENDPOINT = process.env.REACT_APP_SOCKETIO_HOST || '192.168.99.101:30001';

const SocketContext = createContext();

const Socket = props => {
    let socket

    const { setErrorMessage } = useErrorHandler();

    const emitJoin = (setRoom, name, room, estimate) => {
        try {
            socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

            socket.on('connect_error', function () {
                console.log("Sorry, there seems to be an issue with the connection!");
                setErrorMessage('Error on connection')
            });

            setRoom(room);

            socket.emit('join', { users_name: name, room, estimate }, (data) => {
                console.log("USER JOINED!");
                console.log(data);
            });

            emitExpand({ isExpanded: true });     // temporary fix for when a new user joins it automatically set the expanded card to not show

        } catch (error) {
            console.log(error)
            throw error
        }
    };

    const emitDisconnect = () => {
        try {
            socket.emit('disconnect');
            socket.close();
        } catch (error) {
            console.log(error)
            throw error
        };
    };

    const emitExpand = (isExpanded) => {
        try {
            socket.emit('clickExpand', { isExpanded }, (data) => {
                console.log(data);
            });
        } catch (error) {
            console.log(error)
            throw error
        };

    };

    const emitSendEstimate = (setNumber, e) => {
        try {
            setNumber(e);
            if (e) {
                socket.emit('sendEstimate', e, (data) => {
                    console.log("Estimate CHANGE!")
                    console.log(data);
                });
            };
        } catch (error) {
            throw error
        };

    };

    const onEstimate = (setEstimates) => {
        try {
            socket.once('estimate', ({ users }) => {
                setEstimates(users);
            });
        } catch (error) {
            console.log(error)
            throw error
        };

    };

    const onExpand = (setExpandAll) => {
        try {
            socket.on('expand', ({ expand }) => {
                setExpandAll(!expand.isExpanded);
                console.log("is expanded", !expand.isExpanded);
            });
        } catch (error) {
            console.log(error)
            throw error
        };

    };

    return (
        <SocketContext.Provider value={{
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
import io from 'socket.io-client';
import { useErrorHandler } from '../../components/Error/ErrorHandler'
import React, { createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ENDPOINT = process.env.REACT_APP_SOCKETIO_HOST || '192.168.99.101:30001';

const SocketContext = createContext();

const Socket = props => {

    let socket

    const { setErrorMessage, setIsError, socketError, disconnectError } = useErrorHandler();

    const history = useHistory();

    useEffect(() => {
        return history.listen(() => setErrorMessage(undefined));
    }, []);

    const initialiseSocket = () => {
        try {
            socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

            onConnectionError();
            onError();
            onTimeout();
        } catch (error) {
            disconnectError(error);
        }
    };

    const emitJoin = (setRoom, name, room, estimate) => {
        try {
            setRoom(room);
            socket.emit('join', { users_name: name, room, estimate }, (data) => {
                console.log(data);
                socketError(data)
            });
        } catch (error) {
            disconnectError(error);
        }
    };

    const emitDisconnect = () => {
        try {
            socket.emit('disconnect');
            socket.close();
        } catch (error) {
            disconnectError(error);
        }

    };

    const emitExpand = (isExpanded) => {
        try {
            socket.emit('clickExpand', { isExpanded }, (data) => {
                console.log(data);
                socketError(data)
            });
        } catch (error) {
            disconnectError(error);
        }
    };

    const emitSendEstimate = (setNumber, e) => {
        try {
            setNumber(e);
            if (e) {
                socket.emit('sendEstimate', e, (data) => {
                    console.log(data);
                    socketError(data)
                });
            };
        } catch (error) {
            disconnectError(error);
        }
    };

    const onEstimate = (setEstimates) => {
        try {
            socket.once('estimate', ({ users }) => {
                setEstimates(users);
            });
        } catch (error) {
            disconnectError(error);
        }

    };

    const onExpand = (setExpandAll) => {
        try {
            socket.on('expand', ({ expand }) => {
                setExpandAll(!expand.isExpanded);
                console.log("is expanded", !expand.isExpanded);
            });
        } catch (error) {
            disconnectError(error);
        }
    };

    const onConnectionError = () => {
        try {
            socket.on('connect_error', function (error) {
                console.error(error);
                socketError('Connection error')
            });
        } catch (error) {
            disconnectError(error);
        }
    };

    const onError = () => {
        try {
            socket.on('error', function (error) {
                console.error(error);
                socketError('Error in server')
            });
        } catch (error) {
            disconnectError(error);
        }
    };

    const onTimeout = () => {
        try {
            socket.on('connect_timeout', function (timeout) {
                console.log(timeout);
                socketError('Connection Timeout')
            });
        } catch (error) {
            disconnectError(error);
        }
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
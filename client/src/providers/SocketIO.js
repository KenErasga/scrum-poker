import io from 'socket.io-client';
import { useErrorHandler } from '../components/Error/ErrorHandler'
import React, { createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {AccountContext, AuthContext} from './Cognito';

const SocketContext = createContext();

const Socket = props => {

    let socket

    const { setErrorMessage, setIsError, socketError, disconnectError } = useErrorHandler();
    const { logout } = useContext(AccountContext);
    const { setIsAuthenticated } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        return history.listen(() => setErrorMessage(undefined));
    }, []);

    const initialiseSocket = () => {
        try {
            socket = io(process.env.REACT_APP_SOCKETIO_HOST, { transports: ['websocket', 'polling'] });

            onConnectionError();
            onError();
            onTimeout();
        } catch (error) {
            disconnectError(error);
        }
    };

    const emitJoin = (setRoom, name, room, estimate, setScrumMaster) => {
        try {
            setRoom(room);
            socket.emit('join', { users_name: name, room, estimate }, (data) => {
                socketError(data)
                /**
                 * As we're aware we joined, we'll now query the scrum master endpoint
                 */
                fetch(
                    `http://${process.env.REACT_APP_SOCKETIO_HOST}/sio/scrum-poker/get-scrum-master?room=${room}&id=${socket.id}`
                ).then(
                    res => res.json()
                ).then(d => {
                    if (d.scrum_master) {
                        console.log(d);
                        setScrumMaster(true)
                    }
                });
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
                socketError(data)
            });
        } catch (error) {
            disconnectError(error);
        }
    };

    const emitSendEstimate = (setEstimate, e) => {
        try {
            setEstimate(e);
            if (e) {
                socket.emit('sendEstimate', e, (data) => {
                    socketError(data);
                });
            };
        } catch (error) {
            disconnectError(error);
        }
    };

    const emitResetEstimate = () => {
        try {
                socket.emit('resetEstimates', "N/A", (data) => {
                    console.log(data);
                    socketError(data);
                });
        } catch (error) {
            disconnectError(error);
        }
    };

    const emitDeleteRoom = () => {
        try {
                socket.emit('deleteRoom', "test101", (data) => {
                    console.log(data, '<<<<<<<<<<<<<<<<<');
                    socketError(data);
                });
        } catch (error) {
            disconnectError(error);
        }
    };

    const onDeleteRoom = (logout, setIsAuthenticated, emitDisconnect, history) => {
        try {
            socket.once('deleteUser', ({ test, testing }) => {
                logout();
                setIsAuthenticated(false);
        
                localStorage.clear();
                emitDisconnect();
                history.push('/');
            });
            
        } catch (error) {
            disconnectError(error);
        }
    };

    const onResetEstimate = (setEstimate) => {
        try {
            socket.once('resetEstimate', ({ reset }) => {
                setEstimate('N/A');
            });
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
                setExpandAll(!expand);
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
            emitResetEstimate,
            emitDeleteRoom,
            onDeleteRoom,
            onResetEstimate,
            onEstimate,
            onExpand
        }}>
            {props.children}
        </SocketContext.Provider>
    );
};

const useSocket = () => useContext(SocketContext);

export { Socket, useSocket }
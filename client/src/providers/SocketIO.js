import io from 'socket.io-client';
import { useErrorHandler } from '../components/Error/ErrorHandler'
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

    const emitJoin = (setRoom, name, room, estimate, setScrumMaster) => {
        try {
            setRoom(room);
            socket.emit('join', { users_name: name, room, estimate }, (data) => {
                console.log(data);
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

    const emitUpdateScrumMaster = (user, setScrumMaster) => {
        socket.emit("update-scrum-master", user, (data) => {
            console.log(data); // SCRUM MASTER UPDATE ACKNOWLEDGEMENT
            setScrumMaster(false);
        });
    } 

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
                    console.log(data);
                    socketError(data);
                });
            };
        } catch (error) {
            disconnectError(error);
        }
    };

    /**
     * Updates Scrum Master, but additionally sends new estimates immediately
     * afterwards, to ensure everyone is *absolutely* in sync.
     */
    const onScrumMasterUpdate = (setScrumMaster, handleEstimate) => {
        socket.on("scrum-master-update", (data) => {
            setScrumMaster(data);
            handleEstimate("N/A"); // We reset their estimate on becoming the Scrum Master
            console.log("Scrum Master Updated.")
        })
    }
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

    const onResetEstimate = (setEstimate) => {
        try {
            socket.once('resetEstimate', ({ reset }) => {
                setEstimate('N/A');
                console.log('something Change')
            });
        } catch (error) {
            disconnectError(error);
        }
    };

    const onEstimate = (setEstimates) => {
        try {
            socket.once('estimate', ({ users }) => {
                console.log("our socket id is: ", socket.id)
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
            emitUpdateScrumMaster,
            emitResetEstimate,
            onResetEstimate,
            onEstimate,
            onExpand,
            onScrumMasterUpdate,
            socket
        }}>
            {props.children}
        </SocketContext.Provider>
    );
};

const useSocket = () => useContext(SocketContext);

export { Socket, useSocket }
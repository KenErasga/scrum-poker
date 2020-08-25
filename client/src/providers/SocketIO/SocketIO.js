import io from 'socket.io-client';
const ENDPOINT = process.env.REACT_APP_SOCKETIO_HOST || '192.168.99.101:30001';

let socket

const emitJoin = (setRoom, name, room, estimate) => {
    socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

    setRoom(room);

    socket.emit('join', { users_name: name, room, estimate }, (data) => {
        console.log("USER JOINED!");
        console.log(data);
    });
};

const emitDisconnect = () => {
    socket.emit('disconnect');
    socket.off();
};

const emitExpand = (isExpanded) => {
    socket.emit('clickExpand', {isExpanded}, (data) => {
        console.log(data);
    });
};

const emitSendEstimate = (setNumber, e) => {
    setNumber(e);
    if (e) {
        socket.emit('sendEstimate', e, (data) => {
            console.log("Estimate CHANGE!")
            console.log(data);
        });
    };
};

const onEstimate = (setEstimates) => {
    socket.on('estimate', ({ users }) => {
        setEstimates(users);
    });
};

const onExpand = (setExpandAll) => {
    socket.on('expand', ({ expand }) => {
        setExpandAll(!expand.isExpanded);
        console.log("is expanded", !expand.isExpanded);
    });
};

export { emitJoin, emitDisconnect, emitExpand, emitSendEstimate, onEstimate, onExpand }
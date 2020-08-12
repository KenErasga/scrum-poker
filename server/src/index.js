const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const {addUser, changeUserEstimate, removeUser, getUser, getUsersInRoom} = require('./user');
const PORT = process.env.PORT || 3001;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({name, room, number}, callback)=> {

        const { error, user } = addUser({id: socket.id, name, room, number});
        
        if (error) {
            return callback(error)
        };

        socket.join(user.room);

        io.to(user.room).emit('estimate', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendEstimate', (number, callback) => {
        const user = getUser(socket.id);

        const usersInRoom = changeUserEstimate(socket.id, number);

        io.to(user.room).emit('estimate', { room: user.room, users: usersInRoom });

        callback();
    });

    socket.on('clickExpand', (isExpanded, callback) => {
        const user = getUser(socket.id);

        const expanded = isExpanded;

        io.to(user.room).emit('expand', {room: user.room, expand: expanded});

        callback();
    });

    socket.on('disconnect', () => {

        const user = removeUser(socket.id);

        if (user) {
            console.log("User has left room")
        }

    });
});

app.use(router);

server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`))
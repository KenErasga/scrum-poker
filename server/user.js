const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    console.log()
    const existingUser = users.find(user => user.room === room && user.name === name);

    if (existingUser) {
        return { error: "Name is taken" }
    }

    const user = { id, name, room };

    users.push(user);
    console.log("---------USERS--------",users)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== 1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    const user = users.find(user => user.id === id);
    console.log("------------USER-GETUSER", user)
    return user;
}

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room) 
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom}
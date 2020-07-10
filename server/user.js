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
    console.log("---------USER-ADDED--------",users);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== 1) {
        console.log("---------USER-REMOVED--------",users);
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    const user = users.find(user => user.id === id);
    console.log("-----------GET-USER------------", user)
    return user;
}

const getUsersInRoom = (room) => {
    console.log("--------GET-USERS-IN-ROOM-------",users);
    return users.filter(user => user.room === room);
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom}
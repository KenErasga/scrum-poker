let users: any[] = [];

const addUser = ({ id, users_name, room }: any) => {
    users_name = users_name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    console.log();
    const existingUser = users.find(user => user.room === room && user.users_name === users_name);

    if (existingUser) {
        return { error: "Name is taken" };
    }

    const user = { id, users_name, room };

    users.push(user);
    // console.log("---------USER-ADDED--------",users);
    return { user };
};

const changeUserEstimate = ( id: any, number: any ) => {
    console.log("USERS ID AND NUMBER", id, number);
    users = users.map(user => {
        if(user.id === id) {
           return {
             ...user,
             number,
           };
        }
        return user;
      });
    // console.log("---------USER-CHANGE_ESTIMATE--------",users);
    return users;
};

const removeUser = (id: any) => {
    const index = users.findIndex(user => user.id === id);
    // console.log('removeUser function', users.splice(index, 1)[0])
    if (index !== -1) {
        const user = users.splice(index, 1)[0];
        return user;
    }
};

const getUser = (id: any) => {
    const user = users.find(user => user.id === id);
    // console.log("-----------GET-USER------------", user)
    return user;
};

const getUsersInRoom = (room: any) => {
    // console.log("--------GET-USERS-IN-ROOM-------", users);
    return users.filter(user => user.room === room);
};

export {addUser, changeUserEstimate, removeUser, getUser, getUsersInRoom};

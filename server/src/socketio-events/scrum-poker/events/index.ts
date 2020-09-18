import UserJoin from "./UserJoin.sio";
import UserSendEstimate from "./UserSendEstimate.sio";
import UserViewEstimates from "./UserViewEstimates.sio";
import UserDisconnect from "./UserDisconnect.sio";
import UpdateScrumMaster from "./UpdateScrumMaster";
import UsersResetEstimate from "./UsersResetEstimate";
import UserDeleteRoom from "./UserDeleteRoom";
import KickUser from "./KickUser.sio";

export default [
    UpdateScrumMaster,
    UserJoin,
    UserSendEstimate,
    UsersResetEstimate,
    UserViewEstimates,
    UserDisconnect,
    UserDeleteRoom,
    KickUser
];

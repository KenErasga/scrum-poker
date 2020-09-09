import UserJoin from "./UserJoin.sio";
import UserSendEstimate from "./UserSendEstimate.sio";
import UserViewEstimates from "./UserViewEstimates.sio";
import UserDisconnect from "./UserDisconnect.sio";
import UpdateScrumMaster from "./UpdateScrumMaster";

export default [
    UpdateScrumMaster,
    UserJoin,
    UserSendEstimate,
    UserViewEstimates,
    UserDisconnect
];

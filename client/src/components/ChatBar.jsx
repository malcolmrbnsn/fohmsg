import React from "react";
// import moment from 'moment';

const ChatBar = ({ chatroom, isConnected, handleLogout}) => {

    return (
        <div className="side">
            { isConnected ?
            <h2 className="connected">Connected</h2> : 
            <h2 className="disconnected">Disconnected</h2>}
            <button onClick={handleLogout}>Disconnect</button>

            <h4>Active Users</h4>
            <ul>
                {chatroom.map(user => <li key={user.socketID}>{user.username}</li>)}
            </ul>
            {/* <p className="lastmsg">Last message {moment(message.date).fromNow()} ago by {message.username}</p> */}
        </div>
    )
}

export default ChatBar;
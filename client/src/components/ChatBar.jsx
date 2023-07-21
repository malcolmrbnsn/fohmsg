import React from "react";
// import moment from 'moment';

const ChatBar = ({ isConnected, handleLogout, username, chatroom }) => {

    return (
        <div className="col-2">
            <h4>{username}</h4>
            {isConnected ?
                <h2 className="connected">Connected</h2> :
                <h2 className="disconnected">Disconnected</h2>}
            <button onClick={handleLogout}>Disconnect</button>
            <div>
                <h3>Default { }</h3>
                <ul>
                    <ul>
                        {chatroom.map(user => <li key={user.socketID}>{user.username} - {user.status}</li>)}
                    </ul>
                </ul>
            </div>

            <div className="{}">
                <h4>Settings</h4>
            </div>

        </div>
    )
}

export default ChatBar;
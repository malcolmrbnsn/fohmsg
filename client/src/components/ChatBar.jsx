import React from "react";
import './ChatBar.css';

const ChatBar = ({ isConnected, handleLogout, username, chatroom }) => {

    return (
        <div className="col-md-2">
            <h4>{username} - {isConnected ?
                <span className="connected">Connected</span> :
                <span className="disconnected">Disconnected</span>}
            </h4>
            <button onClick={handleLogout}>Disconnect</button>
            <div>
                <h3>Users { }</h3>
                <ul>
                    {chatroom.map(user => <li key={user.userID}>{user.username} - {user.status}</li>)}
                </ul>
            </div>

            {/* <div className="{}">
                <h4>Settings</h4>
            </div> */}

        </div>
    )
}

export default ChatBar;
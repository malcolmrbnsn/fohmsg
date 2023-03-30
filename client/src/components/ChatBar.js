import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBar = ({ users, isConnected }) => {


    const navigate = useNavigate();

    const handleChatLeave = () => {
        localStorage.removeItem('username');
        navigate("/");
        window.location.reload();
    }


    return (
        <div className="side">
            { isConnected ?
            <h2 className="connected">Connected</h2> : 
            <h2 className="disconnected">Disconnected</h2>}
            <button onClick={handleChatLeave}>Disconnect</button>
            <h4>Active Users</h4>
            <ul>
                {users.map(user => <li key={user.socketID}>{user.username}</li>)}
            </ul>
            <button>talk to me</button>
            <button>copy</button>
            <button>cancel</button>
            <button>repeat</button>
            <button>act 1</button>
            <button>act 2</button>
            <button>clear</button>
        </div>
    )
}

export default ChatBar;
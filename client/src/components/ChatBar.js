import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const ChatBar = ({ users, isConnected, message }) => {


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
            <p className="lastmsg">Last message {moment(message.date).fromNow()} ago by {message.username}</p>
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
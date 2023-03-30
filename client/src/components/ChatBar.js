import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBar = ({ users }) => {


    const navigate = useNavigate();

    const handleChatLeave = () => {
        localStorage.removeItem('username');
        navigate("/");
        window.location.reload();
    }


    return (
        <div>
            <h2>Open Chat</h2>
            <button onClick={handleChatLeave}>
            Leave
          </button>
            <div>
                <h4>Active Users</h4>
                <ul>
                    {users.map(user => <li key={user.socketID}>{user.username}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default ChatBar;
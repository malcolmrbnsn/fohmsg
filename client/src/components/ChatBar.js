import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleChatLeave = () => {
        localStorage.removeItem('username');
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        socket.on('newUserResponse', data => setUsers(data));
    }, [socket, users]);

    return (
        <div>
            <h2>Open Chat</h2>
            <button onClick={handleChatLeave}>
            Leave
          </button>
            <div>
                <h4>Active Users</h4>
                <div>
                    {users.map(user => <p key={user.socketID}>{user.username}</p>)}
                </div>
            </div>
        </div>
    )
}

export default ChatBar
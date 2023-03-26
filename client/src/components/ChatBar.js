import React, { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('newUserResponse', data => setUsers(data));
    }, [socket, users]);

    return (
        <div>
            <h2>Open Chat</h2>
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
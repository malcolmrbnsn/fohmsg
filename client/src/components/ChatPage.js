import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";

const ChatPage = ({socket, isConnected}) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({});

    useEffect(() => {
        socket.on('messageResponse', data => {
            setMessage(data);
        });
    }, [socket, message]);

    useEffect(() => {
        socket.on('newUserResponse', data => setUsers(data));
    }, [socket, users]);



    const navigate = useNavigate();

    // poll user state at the start!!!!
    useEffect(() => {
        // if theres a username in local storage
        const username = localStorage.getItem('username')
        if (username) {
            // DO NOT USE THIS, ITS A DOS lol
            // TODO: find something better :p
            // add the user
            // socket.emit('newUser', {username, socketID: socket.id});
            // send pullMessage request
            // socket.emit('pullMessage');
        } else {
            navigate('/');
        }

    })


    return (
        <div className="row">
            <ChatBar users={users} message={message} isConnected={isConnected}/>
            <ChatBody socket={socket} message={message} setMessage={setMessage} />
        </div>
    )
}

export default ChatPage;
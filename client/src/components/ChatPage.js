import React, { useEffect, useState } from "react";
import ChatBar from "./ChatBar";
import ChatFooter from "./ChatFooter";

const ChatPage = ({socket}) => {
    const [message, setMessage] = useState({
        message: '',
        username: '',
        socketID: '',
        date: 0
    });

    useEffect(() => {
        socket.on('messageResponse', data => setMessage(data));
    }, [socket, message]);


    return (
        <div>
            <ChatBar socket={socket}/>
            <ChatFooter socket={socket} message={message} setMessage={setMessage} />
        </div>
    )
}

export default ChatPage
import React, { useEffect, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";

const ChatPage = ({socket}) => {
    const [message, setMessage] = useState({});

    useEffect(() => {
        socket.on('messageResponse', data => {
            // setMessage(data);
            console.log(data);
        });
    }, [socket, message]);


    return (
        <div>
            <ChatBar socket={socket}/>
            <ChatBody socket={socket} message={message} setMessage={setMessage} />
        </div>
    )
}

export default ChatPage;
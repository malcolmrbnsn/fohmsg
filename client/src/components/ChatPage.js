import React, { useEffect, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('messageResponse', data => setMessages(data));
    }, [socket, messages]);

    return (
        <div>
            <ChatBar socket={socket}/>
            <ChatBody messages={messages}/>
            <ChatFooter socket={socket} />
        </div>
    )
}

export default ChatPage
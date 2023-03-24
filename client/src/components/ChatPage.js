import React, { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', data => setMessages(data));
    }, [socket, messages]);

    useEffect(() => {
        socket.on('typingResponse', data => setTypingStatus(data));
    })

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView();
    }, [messages]);

    return (
        <div>
            <ChatBar socket={socket}/>
            <ChatBody 
                messages={messages} 
                lastMessageRef={lastMessageRef}
                typingStatus={typingStatus}
            />
            <ChatFooter socket={socket} />
        </div>
    )
}

export default ChatPage
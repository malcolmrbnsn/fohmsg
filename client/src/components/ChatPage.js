import React from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({socket}) => {
    return (
        <div>
            <ChatBar />
            <ChatBody />
            <ChatFooter socket={socket} />
        </div>
    )
}

export default ChatPage
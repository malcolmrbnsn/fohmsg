import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";

const ChatPage = ({ isConnected, handleTyping, handleLogout, chatroom }) => {

    return (
        <div className="row">
            <ChatBar chatroom={chatroom} isConnected={isConnected} handleLogout={handleLogout}/>
            <ChatBody chatroom={chatroom} handleTyping={handleTyping} />
        </div>
    )
}

export default ChatPage;
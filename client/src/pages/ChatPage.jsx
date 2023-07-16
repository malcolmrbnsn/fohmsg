import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";

const ChatPage = ({ isConnected, handleTyping, handleLogout, chatroom, username }) => {

    return (
        <div className="container-fluid h-100">
        <div className="row h-100">
            <ChatBar isConnected={isConnected} handleLogout={handleLogout} username={username}/>
            <ChatBody chatroom={chatroom} handleTyping={handleTyping} />
            </div>
        </div>
    )
}

export default ChatPage;
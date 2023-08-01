import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";

const ChatPage = ({ isConnected, handleTyping, handleLogout, chatroom, username, message }) => {

    return (
        <div className="container-fluid h-100">
        <div className="row h-100">
            <ChatBar isConnected={isConnected} handleLogout={handleLogout} username={username} chatroom={chatroom}/>
            <ChatBody chatroom={chatroom} handleTyping={handleTyping} message={message}/>
            </div>
        </div>
    )
}

export default ChatPage;
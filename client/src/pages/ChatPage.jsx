import React from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";

const ChatPage = ({ isConnected, handleTyping, handleLogout, users, message}) => {

    return (
        <div className="row">
            <ChatBar users={users} message={message} isConnected={isConnected} handleLogout={handleLogout}/>
            <ChatBody message={message} handleTyping={handleTyping} />
        </div>
    )
}

export default ChatPage;
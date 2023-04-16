import React, { useEffect, useState } from "react";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";

const ChatPage = ({}) => {

    // useEffect(() => {
    //     const handleEsc = (event) => {
    //         if (event.keyCode === 27) {
    //             socket.emit('message', {
    //                 message: "",
    //                 username: localStorage.getItem('username'),
    //                 socketID: socket.id,
    //                 date: Date.now()
    //             })
    //         }
    //     };
    //     window.addEventListener('keydown', handleEsc);

    //     return () => {
    //         window.removeEventListener('keydown', handleEsc);
    //     };
    // }, [socket]);


    return (
        <div className="row">
            <ChatBar users={users} message={message} isConnected={isConnected} />
            <ChatBody message={message}/>
        </div>
    )
}

export default ChatPage;
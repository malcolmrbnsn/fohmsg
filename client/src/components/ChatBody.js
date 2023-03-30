import React from "react";

const ChatBody = ({socket, message}) => {

    const handleTyping = ((e) => {
        e.preventDefault();
        if (localStorage.getItem('username')) {
            socket.emit('message', {
                message: e.target.value,
                username: localStorage.getItem('username'),
                socketID: socket.id,
                date: Date.now()
            });
        }

    });

    return (
        <div className="main">
            <textarea className="textbox"
                type="text"
                value={message.message}
                onChange={handleTyping}
            />
        </div>
    )
}

export default ChatBody
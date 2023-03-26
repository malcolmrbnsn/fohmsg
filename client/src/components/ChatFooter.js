import React from "react";

const ChatFooter = ({socket, message, setMessage}) => {

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

        setMessage(e.target.value);
    });

    return (
        <div>
            <input
                type="text"
                placeholder=""
                value={message.message}
                onChange={handleTyping}
            />
        </div>
    )
}

export default ChatFooter
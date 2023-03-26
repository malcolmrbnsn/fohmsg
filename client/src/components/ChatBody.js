import React from "react";
import moment from 'moment';

const ChatBody = ({socket, message, setMessage}) => {

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
            <textarea
                type="text"
                value={message.message}
                cols="80"
                rows="5"
                onChange={handleTyping}
            />
            <p>Edited {moment(message.date).fromNow()} ago by {message.username}</p>
        </div>
    )
}

export default ChatBody
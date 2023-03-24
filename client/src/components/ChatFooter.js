import React, { useState } from "react";

const ChatFooter = ({socket}) => {

    const [message, setMessage] = useState('');

    const handleMessageSend = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('username')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('username'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id
            })
        }
        console.log({ userName: localStorage.getItem('userName'), message });
        setMessage('');
    }

    return (
        <div>
            <form onSubmit={handleMessageSend}>
                <input type="text" placeholder="type something..." value={message} onChange={e => setMessage(e.target.value)}/>
                <button type="submit">SEND</button>
            </form>

        </div>
    )
}

export default ChatFooter
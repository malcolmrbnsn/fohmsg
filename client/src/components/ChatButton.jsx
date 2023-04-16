import React from 'react';

const ChatButton = ({alert, socket}) => {

    const handleButtonPress = () => {
        if (localStorage.getItem('username')) {
            socket.emit('message', {
                message: alert.text,
                username: localStorage.getItem('username'),
                socketID: socket.id,
                date: Date.now()
            });
        }
    }

    return (
        <button onClick={handleButtonPress}>{alert.label}</button>
    )
}

export default ChatButton
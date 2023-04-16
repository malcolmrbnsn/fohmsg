import React from "react";
import moment from 'moment';
import ChatButton from "./ChatButton";

const ChatBar = ({ users, isConnected, message, socket }) => {


    const handleChatLeave = () => {
        localStorage.removeItem('username');
    }

    const alertButtons = [
        {
            id: 0,
            label: "talk to me",
            text: "talk to me !!"
        },
        {
            id: 1,
            label: "cancel",
            text: "---------------- CANCEL !! ----------------"
        },
        {
            id: 2,
            label: "copy",
            text: "message received !!"
        },
        {
            id: 3,
            label: "repeat",
            text: "repeat message !!"
        },
        {
            id: 4,
            label: "act 1",
            text: "---------------- ACT 1 CLEARANCE -------------"
        },
        {
            id: 5,
            label: "act 2",
            text: "---------------- ACT 2 CLEARANCE -------------"
        },
    ]


    return (
        <div className="side">
            { isConnected ?
            <h2 className="connected">Connected</h2> : 
            <h2 className="disconnected">Disconnected</h2>}
            <button onClick={handleChatLeave}>Disconnect</button>
            <h4>Active Users</h4>
            <ul>
                {users.map(user => <li key={user.socketID}>{user.username}</li>)}
            </ul>
            <p className="lastmsg">Last message {moment(message.date).fromNow()} ago by {message.username}</p>
            {/* <button>talk to me</button>
            <button>copy</button>
            <button>cancel</button>
            <button>repeat</button>
            <button>act 1</button>
            <button>act 2</button>
            <button>clear</button> */}
            { alertButtons.map((alert) => <ChatButton id={alert.id} alert={alert} socket={socket} />)}
            {/* <ChatButton alertMessage="asdf" socket={socket}/> */}
        </div>
    )
}

export default ChatBar;
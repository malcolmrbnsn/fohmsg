import React from "react";
import RelativeDate from '../atomics/RelativeDate';


const ChatBody = ({ chatroom, handleTyping, message }) => {

    const onChange = ((e) => {
        e.preventDefault();
        handleTyping(e.target.value);
    });

    const messages = chatroom.map(user => {
        // no empty messages
        if (user.message) {
            return <div key={user.userID}>
                <h4>{user.username}</h4>
                <em><RelativeDate date={new Date(user.message.date)}/></em>
                <p>&nbsp;{user.message.text}</p>
                </div>
        }
        else {
            return <div key={user.userID}>
            <h4>{user.username}</h4>
            <p>&nbsp;</p>
            </div>
        }
    })

    return  <div className="col-md-10 h-100">

                {messages}


                <div className="input-group">
                    <textarea name="" className="form-control type_msg" placeholder="Type your message..."
                        value={message.text}
                        onChange={onChange}
                    ></textarea>
                </div>

            </div>

}

export default ChatBody
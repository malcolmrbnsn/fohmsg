import React from "react";
import { useNavigate } from "react-router-dom";


const ChatBody = ({ messages }) => {
    const navigate = useNavigate();

    const handleChatLeave = () => {
        localStorage.removeItem('username');
        navigate("/");
        window.location.reload();
    }

    return (
        <>
        <header>
          <h2>Chat Log</h2>
          <button onClick={handleChatLeave}>
            Leave
          </button>
        </header>
  
        <div>

          {messages.map((message) => {
            return (
            <div>
              <b>{message.name}</b>
              <p>{message.text}</p>
            </div>
            )
          })}
    
            {/*This is triggered when a user is typing*/}
    
            <div>
              <i>Someone is typing...</i>
            </div>

        </div>
      </>
    )
}

export default ChatBody;
import React from "react";
import { useNavigate } from "react-router-dom";


const ChatBody = ({socket}) => {
    const navigate = useNavigate();

    const handleChatLeave = () => {
        localStorage.removeItem('username');
        navigate("/");
        window.location.reload();
    }

    return (
        <>
        <header>
          <p>Chat !!!!</p>
          <button onClick={handleChatLeave}>
            Leave
          </button>
        </header>
  
  
        {/*This shows messages sent from you*/}
        <div>
          <div>
            <b>You</b>
            <p>Hello</p>
          </div>
  
  
          {/*This shows messages received by you*/}
  
          <div>
            <b>Other</b>
            <p>Hey, I?</p>
          </div>
  
  
          {/*This is triggered when a user is typing*/}
  
          <div>
            <i>Someone is typing...</i>
          </div>
  
        </div>
      </>
    )
}

export default ChatBody;
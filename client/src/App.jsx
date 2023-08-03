import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage';
import socketIO from 'socket.io-client';
import ChatPage from './pages/ChatPage';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

const socket = socketIO.connect("http://100.97.123.8:3001");

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatroom, setChatroom] = useState([]);
  const [message, setMessage] = useState({});

  const handleLogin = useCallback(value =>  {
    localStorage.setItem('username', value);
    const userID = localStorage.getItem('userID')
      socket.emit('joinChatroom', { username: value, userID });
    setLoggedIn(true);
    setUsername(value);
  }, [setLoggedIn, setUsername])

  function handleLogout() {
    const userID = localStorage.getItem('userID')
    socket.emit("leaveChatroom", {userID});
    localStorage.removeItem('username');
    setLoggedIn(false);
  }

  function handleTyping(text) {
    const userID = localStorage.getItem('userID')
    socket.emit('message', {
      message: {
        text,
        userID,
        date: Date.now()
      }
    });
  }


  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      const _userID = localStorage.getItem('userid')
      if (!_userID) {
        const key = uuidv4();
        localStorage.setItem('userID', key);
      }
      const _username = localStorage.getItem('username')
      if (_username) {
        handleLogin(_username);
      }
    }
  }, [loggedIn, handleLogin]);

  useEffect(() => {
    socket.on('push', data => {
      // filter our user from message
      let user = data.filter(usr => usr.userID === socket.id);
      // // set our message
      let userMessage = {}
      if (user.message) {
        userMessage = user.message
      }
      setMessage(userMessage);
      // set chatroom
      setChatroom(data);
    });
    return () => {
      socket.off('push');
    }
  }, [chatroom, message]);

  let Element = loggedIn ?
    <ChatPage isConnected={isConnected} handleTyping={handleTyping} handleLogout={handleLogout} chatroom={chatroom} username={username} message={message} /> :
    <HomePage handleLogin={handleLogin} />

  return (
    Element
  );
}

export default App;

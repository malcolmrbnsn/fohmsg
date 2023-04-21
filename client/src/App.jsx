import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import socketIO from 'socket.io-client';
import ChatPage from './pages/ChatPage';
import './App.css';

const socket = socketIO.connect("http://127.0.0.1:3001");

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({});

  function handleLogin(value) {
    localStorage.setItem('username', value);
    socket.emit('newUser', { username: value, socketID: socket.id });
    setLoggedIn(true);
    setUsername(value);
  }

  function handleLogout() {
    localStorage.removeItem('username');
    setLoggedIn(false);
  }

  function handleTyping(text) {
    socket.emit('message', {
      text,
      username,
      socketID: socket.id,
      date: Date.now()
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
      const _username = localStorage.getItem('username')
      if (_username) {
        handleLogin(_username);
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    socket.on('messageResponse', data => {
      setMessage(data);
    });
    return () => {
      socket.off('messageResponse');
    }
  }, [message]);

  useEffect(() => {
    socket.on('newUserResponse', data => setUsers(data));
    return () => {
      socket.off('newUserResponse');
    }
  }, [users]);

  return (
    <div>
      {
        loggedIn ?
          <ChatPage isConnected={isConnected} handleTyping={handleTyping} handleLogout={handleLogout} users={users} message={message} /> :
          <HomePage handleLogin={handleLogin} />
      }
    </div>
  );
}

export default App;

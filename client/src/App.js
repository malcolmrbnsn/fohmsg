import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import socketIO from 'socket.io-client';
import ChatPage from './components/ChatPage';

const socket = socketIO.connect("http://localhost:3001")


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={ <Home socket={socket}/> } />
          <Route path="/chat" element={ <ChatPage socket={socket}/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

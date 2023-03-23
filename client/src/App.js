import socketIO from 'socket.io-client';
const socket = socketIO.connect("http://localhost:3001")


function App() {
  return (
    <div>
      Hello World!
    </div>
  );
}

export default App;

const WebSocket = require('ws');

// setup the server socket
const server = new WebSocket.Server({ port: 8081 }, () => console.log("server running"));

// collection of current connections
const connections = new Set();

// blast a message to all connections
function sendMessage(message) {
    connections.forEach((connection) => {
        connection.ws.send(JSON.stringify(message));
    })
}


server.on("connection", (ws) => {
    const connRef = {
        ws,
    };
    connections.add(connRef);

    ws.on('message', (message) => {

        console.log("new message: " + message);

        try {
            const data = JSON.parse(message);
            
            const messageToSend = {
                sender: data.body.sender,
                body: data.body,
                date: Date.now()
            }

            sendMessage(messageToSend);

        } catch (e) {
            console.error('Error passing message!', e)
        }

    })

    ws.on("close", (code, reason) => {
        connections.delete(connRef);
        console.log(`Connection closed: ${code} ${reason}!`);
    })

})

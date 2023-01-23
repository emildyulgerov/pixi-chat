// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:8080"
//     }
// });

// io.on('connection', (socket) => {
//     socket.on('message', (message) => {
//         console.log('message: ' + message);
//         io.emit('message', {message})
//     })
// })

// server.listen(3000, () => console.log('server started on port :3000'));
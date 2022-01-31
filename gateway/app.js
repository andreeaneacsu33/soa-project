const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
const { json, urlencoded } = express;
const app = express();

const port = process.env.PORT || 8092;
app.use(json());
app.use(urlencoded({extended: false}));

const corsOptions = {
    origin: '*',
    optionsSuccessCors: 200
};
app.use(cors(corsOptions));
app.use(router);

var server = app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

// websocket
var socketIO = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
socketIO.on("connection", (socket) => {
    console.log("SOCKET.IO: Made socket connection");
    socket.on('message', ({name, message}) => {
        socketIO.emit('message', {name, message});
    });
    socketIO.emit('message', 'Welcome to the app!');
});

module.exports.message = 'Hello';

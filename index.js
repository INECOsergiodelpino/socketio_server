const express = require('express');
const path = require ('path');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
const server = app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});

//websocket
const Socket = require('socket.io');
const io = Socket(server);
io.on('connection', (socket)=>{
    console.log('new conection', socket.id);
    socket.on('chat-message', (data)=>{
        //console.log(data);
        io.sockets.emit('chat-message', data);
    })
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    })
});


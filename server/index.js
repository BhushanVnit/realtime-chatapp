// node server serving socket.io

const io = require('socket.io')(8000);

const user = {};
io.on('connection', socket => {

    socket.on('new-user', name => {
        user[socket.id] = name;
        socket.broadcast.emit('new-user-joined', name);
    });
    socket.on('send', msg => {
        socket.broadcast.emit('recieve-msg', { msg: msg, name: user[socket.id]});
    });

    socket.on('disconnect' ,msg =>{
        socket.broadcast.emit('left' , user[socket.id]);
        delete user[socket.id];
    } )
});
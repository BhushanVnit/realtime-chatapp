
const socket = io('http://localhost:8000');

const form = document.getElementById('msg-form');
const msg = document.getElementById('msgInput');
const msgcontainer = document.querySelector('.container');

const name = prompt('Enter your name:');

const append = (msg , position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = msg;
    messageElement.classList.add('msg');
    messageElement.classList.add('position');
    msgcontainer.append(messageElement);
};

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const msg = msgInput.value;
    append(`You:${msg}`,'right');
    socket.emit('send',msg);
    msgInput.value = '';
});

socket.emit('new-user', name);

socket.on('new-user-joined', name => {
    append(`${name} joined the chat`, 'left');
})

socket.on('recieve-msg', data => {
    append(`${data.name} : ${data.msg}`, 'left');
})
socket.on('left', name => {
    append(`${data.name} left the chat`, 'left');
})
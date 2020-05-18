//client.js
var socket = io();

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('d', 'me', 'test msg');

socket.on('data', function(data) {
  document.write(data);
});
const https = require('https');
const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
  console.log('Server on port:', app.get('port'));
})

const SocketIO = require('socket.io');
const io = SocketIO(server);

var data = [];
https.get('https://api.covid19api.com/summary', (resp) => {
  

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    console.log(JSON.parse(chunk));
   data.push(chunk);
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
   // console.log(JSON.parse(data).Countries[1]);
      console.log(data)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

io.on('connection', (socket) => {
  console.log("New connection");
  socket.emit('datos', data)
})
/*jshint esversion: 6 */
const requestSync = require('syncrequest');
//server.js
var path = require('path');
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
const server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
var io = require('socket.io')(server);

var data = requestSync.sync("https://api.covid19api.com/summary");
io.on('connection', function (socket){
  console.log('connection');
  socket.emit('data', data.body);
});

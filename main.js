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
console.log(data.body);
var c = JSON.parse(data.body).Countries;
var country, newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered;
for(var i in c) {
  /*country = c[i].Country;
  newConfirmed = c[i].NewConfirmed;
  totalConfirmed = c[i].TotalConfirmed;
  newDeaths = c[i].NewDeaths;
  totalDeaths = c[i].TotalDeaths;
  newRecovered = c[i].NewRecovered;
  totalRecovered = c[i].TotalRecovered;
  // Show data of each country
  console.log(
    "----------------------------------------------------------------" + '\n' + 
    " " + country + '\n' + " New confirmed " + newConfirmed + '\n' + 
    " Total confirmed " + totalConfirmed + '\n' +
    " New deaths " + newDeaths + '\n' + 
    " Total deaths " + totalDeaths + '\n' + 
    " New recovered " + newRecovered + '\n' + 
    " Total recovered " + totalRecovered + '\n' +
    "----------------------------------------------------------------" 
  );*/
}
io.on('connection', function (socket){
  console.log('connection');
  socket.on('d', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });
  socket.emit('data', data.body);
});

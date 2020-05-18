/*jshint esversion: 6 */
var https = require('https');
var server = require('http').createServer();
const requestSync = require('syncrequest');
//server.js
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var data = requestSync.sync("https://api.covid19api.com/summary");
console.log(data.body);
var c = JSON.parse(data.body).Countries;
var country, newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered;
for(var i in c) {
  country = c[i].Country;
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
  );
}
/*https.get('https://api.covid19api.com/summary', (resp) => {
  var data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log(JSON.parse(data).Countries);
    var c = JSON.parse(data).Countries;
    var i = 0;
    var country, newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered;
    for(i in c) {
      country = c[i].Country;
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
      );   
    }
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});*/


io.on('connection', function (socket){
  console.log('connection');

  socket.on('d', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });
  socket.emit('data', data);
});

http.listen(3000, function () {
 console.log('listening on *:3000');
});

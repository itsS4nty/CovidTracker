/*jshint esversion: 6 */
//client.js
var socket = io();

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('d', 'me', 'test msg');

socket.on('data', function(data) {
  var n = 0;
  var c = JSON.parse(data.body).Countries;
  var country, newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered;
  for(var i in c) {
    /*country = c[i].Country;
    console.log(country);
    newConfirmed = c[i].NewConfirmed;
    totalConfirmed = c[i].TotalConfirmed;
    newDeaths = c[i].NewDeaths;
    totalDeaths = c[i].TotalDeaths;
    newRecovered = c[i].NewRecovered;
    totalRecovered = c[i].TotalRecovered;
    // Show data of each country
    document.write(
      "----------------------------------------------------------------" + '\n' + 
      " " + country + '\n' + " New confirmed " + newConfirmed + '\n' + 
      " Total confirmed " + totalConfirmed + '\n' +
      " New deaths " + newDeaths + '\n' + 
      " Total deaths " + totalDeaths + '\n' + 
      " New recovered " + newRecovered + '\n' + 
      " Total recovered " + totalRecovered + '\n' +
      "----------------------------------------------------------------" 
    );*/
    document.write(JSON.parse(data).Countries[0].Country);
  }
  //document.write(JSON.parse(data).Countries[150].Country);
});
/*jshint esversion: 6 */
//client.js
var socket = io();

socket.on('data', function(data) {
  var c = JSON.parse(data).Countries;
  var container = document.getElementById('countries');
  var country, newConfirmed, totalConfirmed, newDeaths, totalDeaths, newRecovered, totalRecovered;
  c.sort(function (a, b) {
    return b.TotalConfirmed - a.TotalConfirmed;
  });
  for(var i in c) {
    country = c[i].Country;
    console.log(country);
    newConfirmed = c[i].NewConfirmed;
    totalConfirmed = c[i].TotalConfirmed;
    newDeaths = c[i].NewDeaths;
    totalDeaths = c[i].TotalDeaths;
    newRecovered = c[i].NewRecovered;
    totalRecovered = c[i].TotalRecovered;
    var textToAdd = `
      <p class="country">
        Country: ${country} <br>
        Latest confirmed: ${newConfirmed} <br>
        Total confirmed: ${totalConfirmed} <br>
        Latest deaths: ${newDeaths} <br>
        Total deaths: ${totalDeaths} <br>
        Latest recovered: ${newRecovered} <br>
        Total recovered: ${totalRecovered} <br>
      </p>
    `;
    // Add data to div
    container.innerHTML += textToAdd;
  }
});
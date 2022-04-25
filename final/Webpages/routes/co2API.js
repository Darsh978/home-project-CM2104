const express = require('express')
const co2Route = express.Router()
const request = require('node-fetch');
const headers = {
  'Accept':'application/json'

};
 
fetch('https://api.carbonintensity.org.uk/regional/scotland',
{
  method: 'GET',
 
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    document.getElementsByIdName("CO2");
});
/**
 * @Author: Darsh Narain <darsh>
 * @Date:   20 Nov 2021
 * @Filename: Map.js
* @Last modified by: darsh 
 */


//Darsh's Code Start

// Code for Map Page

//set the map and initial coordinates
var map = L.map('mapid').setView([50, 1], 5);

// Making a marker om map on set Location
L.marker([51.505, 20]).addTo(map);

//  Making a marker with a custom icon 
const evIcon = L.icon({
  iconUrl: 'Pics/electric icon.png',
  iconSize: [30, 32],
  iconAnchor: [25, 16]
});

//set marker for teting Popup mad market settings
//var tmarker = L.marker([51,1], {draggable :true});
//var tpopup = tmarker.bindPopup('Test popup  ' + tmarker.getLatLng()).openPopup()
//tpopup.addTo(map);


//set the initial tilelayer

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZGFyc2g5NzgiLCJhIjoiY2t3Z3lwYTluMGFjNzJvbzB3Ym1teW1uaiJ9.Qw_1snRS2-UPzTfIE-0rRA'
}).addTo(map);

//use geolocate to find get home users location in map 

L.control.locate().addTo(map);

//search in map 

L.Control.geocoder().addTo(map);




//when the button Load Charging Points  is clicked
$('#CBtn').click(function () {
  console.log("Getting Charging points")
  //use the jquery get json method to retrieve our json
  // Using this from moodle 
  //https://cors-anywhere.herokuapp.com/http://chargepoints.dft.gov.uk/api/retrieve/registry/postcode/EC3A+7BR/limit/10/
  //https://cors-anywhere.herokuapp.com/http://

  $.getJSON("https://cors-anywhere.herokuapp.com/http://chargepoints.dft.gov.uk/api/retrieve/registry/postcode/AB15/limit/10/format/json/", function (result) {
    //response data is now in the result variable
    //the line below to see the raw json,to see the structure of the response
    console.log(result);

    // for each entry, get the lat long coordinates & location  and add to the Map
    result.ChargeDevice.forEach(function (cp) {
      //for each charging point
      //get its coordinates
      var lng = cp.ChargeDeviceLocation.Longitude;
      var lat = cp.ChargeDeviceLocation.Latitude;
      var marker = L.marker([lat, lng]).addTo(map);
      var deviceName = cp.ChargeDeviceName;
      // add popup to display the values from the APi on the map
      marker
        .bindPopup(
          "<b>Latitude: </b>" +
          lat +
          " <b>Longitude: </b>" +
          lng +
          "Location: " +
          deviceName
        )
        .openPopup();
      // Uncomment these to see data value in console log
      // console.log(lng)
      // console.log(lat)
      // console.log("plot the point data")
    });
    //map.panTo([50,30]); 

  });

});// End of code for button Load Charging Points 





//when the button Get Carbon Intensity data when clicked
$('#EBtn').click(function () {
  console.log("getting carbon intensity data");

  
  // for prototype tested with scotland only
  // Later - extend to dynamic selection based on user input areas

  $.getJSON("https://api.carbonintensity.org.uk/regional/scotland", function (result) {
    //response data is now in the result variable
    
    //the line below to see the raw json,to see the structure of the response
    console.log(result)

     // get the region
    var region = result.data[0].shortname
    console.log(region)

    //get the forecast for the region
    var forecast = result.data[0].data[0].intensity.forecast
    console.log(forecast)

    //get the intesity for the region
    var index = result.data[0].data[0].intensity.index
    console.log(index)

    //set marker using custom icon and display the values from the API
    var tmarker = L.marker([57, -3], { icon: evIcon });
    var popupstr = "For Region :" + region + "  Index is " + index + "  Forecast is " + forecast;
    var tpopup = tmarker.bindPopup(popupstr).openPopup()
    tpopup.addTo(map);




  });
});// End of code for button get carbon intensity



//Darsh's Code End

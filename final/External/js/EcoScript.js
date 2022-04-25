/***Fatima's Javascript***/
var index = 0;
slideshow();

function slideshow() {
  var i;
  var x = document.getElementsByClassName("slides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  index++;
  if (index > x.length) {index = 1}    
  x[index-1].style.display = "block";  
  setTimeout(slideshow, 6000); // Change image every 5 seconds
}

function HiddenParagraphs() {
  var hide = document.getElementById("hide");
  var readMore = document.getElementById("expand2");
  var rdBtn = document.getElementById("RdBtn");

  if (hide.style.display === "none") {
    hide.style.display = "inline";
    rdBtn.innerHTML = "Continue Reading"; 
    readMore.style.display = "none";
  } else {
    hide.style.display = "none";
    rdBtn.innerHTML = "Read less"; 
    readMore.style.display = "inline";
  }
}

/***Neil's Javascript ***/
/*navbar script*/
const toggleButton = document.getElementById('toggle-button');
const naviList = document.getElementById('navi-list');

toggleButton.addEventListener('click', () => {
    naviList.classList.toggle('active');
})

/***Alex's Javascript***/
function getInputValue() {
  return document.getElementById("miles").value;

}
function getDropdownValue() {
  var dropdownOptions = document.getElementById("myDropdown");
  return dropdownOptions.value;
}
function consumptionKwh() {
  inputVal = getInputValue();
  myDropdown = getDropdownValue();
  consumption = 0;
  consumption.toFixed(2);
  if (myDropdown == "tesla") {
      consumption = inputVal * 0.24;
  } else if (myDropdown == "porsche") {
      consumption = inputVal * 0.43;
  } else if (myDropdown == "ford") {
      consumption = (inputVal * 0.335).toFixed(2);
  }
  document.getElementById("consumptionKwh").innerHTML = "KWh used for the trip: " + consumption;

}
function costOfTrip() {
  document.getElementById("costOfTrip").innerHTML = "Cost of trip: " + (consumption * 0.17).toFixed(2) + " £";
}

/***Darsh's Javascript***/
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

// Code for validation for Login and Register Pages
function clearErrors() {
  errors = document.getElementsByClassName("formerror");
  for (let item of errors) {
    item.innerHTML = "";
  }
}
function seterror(id, error) {
  //sets error inside tag of id
  element = document.getElementById(id);
  element.getElementsByClassName("formerror")[0].innerHTML = error;
}

function validateForm() {
  var returnval = true;

  clearErrors();

  //perform validation and if validation fails, set the value of returnval to false
  var name = document.forms["myForm"]["fname"].value;
  if (name.length < 5) {
    seterror("name", "*Length of name is too short");
    returnval = false;
  }

  if (name.length == 0) {
    seterror("name", "*Length of name cannot be zero!");
    returnval = false;
  }

  var email = document.forms["myForm"]["femail"].value;
  if (email.length > 15) {
    seterror("email", "*Email length is too long");
    returnval = false;
  }

  var phone = document.forms["myForm"]["fphone"].value;
  if (phone.length != 10) {
    seterror("phone", "*Phone number should be of 10 digits!");
    returnval = false;
  }

  var password = document.forms["myForm"]["fpass"].value;
  if (password.length < 6) {
    seterror("pass", "*Password should be atleast 6 characters long!");
    returnval = false;
  }

  var cpassword = document.forms["myForm"]["fcpass"].value;
  if (cpassword != password) {
    seterror("cpass", "*Password and Confirm password should match!");
    returnval = false;
  }

  return returnval;
}
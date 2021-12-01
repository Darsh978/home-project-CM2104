/**
 * @Author: Darsh Narain <darsh>
 * @Date:   27 Nov 2021
 * @Filename: main.js
* @Last modified by: darsh 
 */


//Darsh's Code Start
//set the map and initial coordinates

var map = L.map('mapid').setView([0, 0], 1); 

//set the initial tilelayer


                // Making a map and tiles 

               // L.marker([51.505, 20]).addTo(map); 

                 //  Making a marker with a custom icon 

             // const evIcon = L.icon({
             //     iconUrl: 'Images/icons/blue ev icon 1.png',
             //     iconSize: [50, 32],
             //     iconAnchor: [25, 16] 
             // });

             // L.marker([51.505, 10], { icon: evIcon }).addTo(map); 


                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                     maxZoom: 18,
                     id: 'mapbox/streets-v11',
                     tileSize: 512,
                     zoomOffset: -1,
                     accessToken: 'pk.eyJ1IjoiZGFyc2g5NzgiLCJhIjoiY2t3Z3lwYTluMGFjNzJvbzB3Ym1teW1uaiJ9.Qw_1snRS2-UPzTfIE-0rRA'
                 }).addTo(map);

                 //use geolocate to find get home users exact location in map 
                
                 L.control.locate().addTo(map);

                 //search in map 

                L.Control.geocoder().addTo(map); 

            
                // var tiles = L.tileLayer(tileUrl, { attribution }); 
                
         

//when the button on is clicked
$('#EBtn').click(function() {
    console.log("getting carbon intensity data");
    //use the jquery get json method to retrieve our json
     //https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson




    $.getJSON("https://api.carbonintensity.org.uk/regional/scotland", function(result) {
        //response data is now in the result variable
        //uncomment the line below to see the raw json, this would let you see the structure of the response
        console.log(result)

        var region= result.data[0].shortname
         console.log(region)

         var forecast= result.data[0].data[0].intensity.forecast
         console.log(forecast)
        
         var index= result.data[0].data[0].intensity.index
         console.log(index)
        
        

    });
});

    
//when the button on is clicked
$('#CBtn').click(function() {
    console.log("Getting Charging points")
    //use the jquery get json method to retrieve our json
    //https://cors-anywhere.herokuapp.com/http://chargepoints.dft.gov.uk/api/retrieve/registry/postcode/EC3A+7BR/limit/10/

     //https://cors-anywhere.herokuapp.com/http://

    $.getJSON("https://cors-anywhere.herokuapp.com/http://chargepoints.dft.gov.uk/api/retrieve/registry/postcode/AB15/limit/10/format/json/", function(result) {
        //response data is now in the result variable
        //uncomment the line below to see the raw json, this would let you see the structure of the response
        console.log(result);
        //I know that the earthquakes are defined in an array (or list) result.features
       
       result.ChargeDevice.forEach(function(cp) {
            //for each charging point
            //get its coordinates
            var lng = cp.ChargeDeviceLocation.Longitude;
            var lat = cp.ChargeDeviceLocation.Latitude;
            L.marker([lat, lng]).addTo(map); 
            console.log(lng)
            console.log(lat)
            console.log("plot the point data")
        });


    });

});
    
   

//Darsh's Code End

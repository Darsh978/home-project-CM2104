/**
 * @Author: Darsh Narain <darsh>
 * @Date:   27 Nov 2021
 * @Filename: main.js
* @Last modified by: darsh 
 */



//set the map and initial coordinates

var map = L.map('mapid').setView([0, 0], 1); 

//set the initial tilelayer


                // Making a map and tiles 

                L.marker([51.505, 20]).addTo(map); 

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

                // var tiles = L.tileLayer(tileUrl, { attribution }); 
                

//when the button on is clicked
$('#CBtn').click(function() {
    console.log("getting quakes");
    //use the jquery get json method to retrieve our json
    $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(result) {
        //response data is now in the result variable
        //uncomment the line below to see the raw json, this would let you see the structure of the response
        //console.log(result)
        //I know that the earthquakes are defined in an array (or list) result.features
        result.features.forEach(function(quake) {
          //for each earthquake
          //get its coordinates
          var lng = quake.geometry.coordinates[0];
          var lat = quake.geometry.coordinates[1];
          //and it magnitude
          var mag = quake.properties.mag * 50;
          //for each earthquake create a circle
            var circle = L.circle([lat, lng],mag*50, {
                color: 'blue',
                opacity:0,
                fillColor: 'blue', 
                fillOpacity: 0.8,
                //radius: mag
            })
            //and add it to the map
            circle.addTo(map);

        });

    });
    // $.getJSON("http://www.kuakes.com/json/?callback=?", function(result) {
    //   console.log(result); 
    // });

});


/*
COVID-19 API by continent and country
*/

var byContinent = {
  "url": "https://corona.lmao.ninja/v2/continents?sort&yesterday=false",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Cookie": "__cfduid=d0d426a70ca4abcce452e894a8bd604a81611927172"
  },
};

var byCountries = {
  "url": "https://corona.lmao.ninja/v2/countries?sort&yesterday",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Cookie": "__cfduid=d9380a3e9f1eaf698e12001d8e156801f1611803835"
  },
};

var covidGlobal;
$.ajax(byContinent).done(function (response) {
  console.log(response);
  covidGlobal = response[0].active + response[1].active + response[2].active + response[3].active + response[4].active + response[5].active
  $("#total-home").html(covidGlobal);
});



/*
Mapbox API for map usage
*/

var countryCoordinate = [];
$.ajax(byCountries).done(function (response) {
  for (i = 0; i < response.length; i++) {
    countryCoordinate.push([`${response[i].countryInfo.long}, ${response[i].countryInfo.lat}`]);
  }
});

mapboxgl.accessToken = 'pk.eyJ1IjoiazRuZ2dnIiwiYSI6ImNra2NwaG9rMzBneGwyd29sZjQ0ZDlnNW8ifQ.S5yJ6Rta3agYAdE9iNzDmw';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  maxZoom: 3
});

console.log(countryCoordinate[2]);
var countryMarker = new mapboxgl.Marker()
.setLngLat([countryCoordinate[2][0]])
.addTo(map); // add the marker to the map


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


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
  console.log(response);
  for (i = 0; i < response.length; i++) {
    countryCoordinate.push([`${response[i].countryInfo.long}`, `${response[i].countryInfo.lat}`]);
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoiazRuZ2dnIiwiYSI6ImNra2NwaG9rMzBneGwyd29sZjQ0ZDlnNW8ifQ.S5yJ6Rta3agYAdE9iNzDmw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    maxZoom: 3
  });
  
  for (i = 0; i < countryCoordinate.length; i++) {
    // Create the popup
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 1px;">${response[i].country}</div>
        <b>Active Cases:</b> ${response[i].active} (+${response[i].todayCases})<br>
        <b>Critical:</b> ${response[i].critical}<br>
        <b>Deaths:</b> ${response[i].deaths} (+${response[i].todayDeaths})<br>
        <b>Recovered:</b> ${response[i].recovered} (+${response[i].todayRecovered})<br>
      `
    );

    // Create the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${response[i].countryInfo.flag})`;
    
    let tmpMarker = new mapboxgl.Marker(el)
    .setLngLat(countryCoordinate[i]) // Set the marker coordinates
    .setPopup(popup) // Set a popup on the marker
    .addTo(map); // Add the marker to the map

    el.markerInstance = tmpMarker;
    el.addEventListener("click", e => {
      let coords = e.target.markerInstance.getLngLat();

      map.flyTo({
        center: coords,
        speed: 0.5
      });
    });
  }

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
});




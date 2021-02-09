function endDate() { // Function to gather all the end days for each month since January 2020 in the format mm/dd/yy
  var dateList = [];
  var cYear = 2020;
  var cMonth = 0;
  var cDay = 1;
  var currentDate = new Date();

  for (var i = 0; i < 100; i++) {
    if (cMonth == 12) {
      cMonth = 0;
      cYear += 1;
    } else {
      if ((cMonth == currentDate.getMonth() + 1) && (cYear == currentDate.getFullYear())) {
        break // Breaks the loop if cMonth and cYear == the current month+1 and year we are in, in this case if cMonth and cYear == 3 and 2021
      } else {
        var date = new Date(cYear, cMonth, cDay);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        dateList.push(`${lastDay.getMonth() + 1}` + "/" + `${lastDay.getDate()}` + "/" + `${lastDay.getYear().toString().substr(-2)}`);
        cMonth += 1;
      }
    }
  }

  return dateList
}

function chartCountry(cDate, cData) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: cDate,
      datasets: [{
        label: "Total Cases",
        data: cData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  return myChart
}



/*
COVID-19 API by continent and country
*/

function historicalData(country) {
  var countryHistory = {
    "url": "https://corona.lmao.ninja/v2/historical/" + country + "?lastdays=all",
    "method": "GET",
    "timeout": 0,
  };

  return countryHistory
}

var byContinent = {
  "url": "https://corona.lmao.ninja/v2/continents?sort&yesterday=false",
  "method": "GET",
  "timeout": 0,
};

var byCountries = {
  "url": "https://corona.lmao.ninja/v2/countries?sort&yesterday",
  "method": "GET",
  "timeout": 0,
};

var covidGlobal;
$.ajax(byContinent).done(function (response) {
  console.log(response);
  covidGlobal = response[0].active + response[1].active + response[2].active + response[3].active + response[4].active + response[5].active
  $("#total-home").html(covidGlobal);
});



/*
Mapbox API and ChartJS
*/

chartCountry(0, 0); // Initiate the chart first with an X and Y axis value of 0
var countryName = []; // Set global variable countryName
var countryCoordinate = []; // Set global variable countryCoordinate
var globalCases = []; // Set global variable globalCases

$.ajax(byCountries).done(function (response) {
  console.log(response);

  for (i = 0; i < response.length; i++) {
    countryName.push(response[i].country);
    countryCoordinate.push([`${response[i].countryInfo.long}`, `${response[i].countryInfo.lat}`]);
  }



  

  
  for (j = 0; j < countryName.length; j++) {
    console.log(j);
    $.ajax(historicalData(countryName[j])).done(function (response) {
      
      console.log(response);
    });
  }


  mapboxgl.accessToken = 'pk.eyJ1IjoiazRuZ2dnIiwiYSI6ImNra2NwaG9rMzBneGwyd29sZjQ0ZDlnNW8ifQ.S5yJ6Rta3agYAdE9iNzDmw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    minZoom: 2,
    maxZoom: 8
  });
  
  for (i = 0; i < countryCoordinate.length; i++) {
    // Create the popup
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `
        <div class="country-name" style="font-size: 14px; font-weight: bold; margin-bottom: 1px;">${response[i].country}</div>
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
    el.markerInformation = popup
    el.addEventListener("click", function(e) {
      let coords = e.target.markerInstance.getLngLat();
      let info = e.target.markerInformation._content.getElementsByClassName("country-name")[0].textContent;

      $.ajax(historicalData(info)).done(function (response) {
        let historyCases = response.timeline.cases;
        let historyCasesArray = [];
        let dateArray = [];

        for (i = 0; i < endDate().length - 1; i++) {
          historyCasesArray.push(historyCases[endDate()[i]]);
          dateArray.push(endDate()[i]);
        }
        chartCountry(dateArray, historyCasesArray);

      });

      map.flyTo({
        center: coords
      });
    });
  }

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
});

console.log("test");





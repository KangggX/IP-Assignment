var covidGlobal;
var globalSettings = {
    "url": "https://corona.lmao.ninja/v2/continents?sort&yesterday=false",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Cookie": "__cfduid=d0d426a70ca4abcce452e894a8bd604a81611927172"
    },
  };
  
$.ajax(globalSettings).done(function (response) {
    console.log(response);
    covidGlobal = response[0].active + response[1].active + response[2].active + response[3].active + response[4].active + response[5].active
    $("#total-home").html(covidGlobal);
});
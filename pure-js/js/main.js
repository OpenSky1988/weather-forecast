// Foursquare API Info
const clientId = 'X300CL4Y4M1F3QT1AAOSQPX4PTEIIRQIEV40Z04EHJVULQ3Y'; // Customise
const clientSecret = 'PAYRGKI4BBCH5UCET0JJGDH2YENOV3CDNWNDNB20Y4CXS1BQ'; // Customise
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const imgPrefix = 'https://igx.4sqi.net/img/general/150x200';

// APIXU Info
const apiKey = '8403fec3c61c4b428b0145310180501'; // Customise
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const input = document.getElementById('city');
const submit = document.getElementById('button');
const destination = document.getElementById('destination');
const container = document.getElementsByClassName('container');
const weatherDivs = [document.getElementById("weather1"), document.getElementById("weather2"), document.getElementById("weather3"), document.getElementById("#weather4")];
const weekDays = ['Monday', 'Tuesday', 'Wednesday'];

async function getForecast() {
  const urlToFetch = forecastUrl + apiKey + '&q=' + input.value + '&days=7';
  try {
    let response = await fetch(urlToFetch);
    if(response.ok) {
      let jsonResponse = await response.json();
      let days = jsonResponse.forecast.forecastday;
      return days;
    }
    throw new Error('Forecast request failed!');
  } catch (error) {
    console.log(error);
  }
}

function renderForecast(days) {
  weatherDivs.forEach((day, i) => {
    let weatherContent =
      '<h2> Sunrise: ' + days[i].astro.sunrise +
      '<h2> High: ' + days[i].day.maxtemp_f +
      '</h2>' + '<h2> Low: ' + days[i].day.mintemp_f +
      '</h2>' + '<h2> Total Precipitation: ' + days[i].day.totalprecip_in +
      '</h2>' + '<img src="http://' +  days[i].day.condition.icon + '" class="weathericon" />' +
      '<h2> Sunset: ' + days[i].astro.sunset +
      '<h2> Humidity: ' + days[i].day.avghumidity +
      '<h2>' + weekDays[(new Date(days[i].date)).getDay()] + '</h2>';
    day.innerHTML += weatherContent;
  });
}

function executeSearch() {
  weatherDivs.forEach(day => {
    while(day.firstChild) 
      day.removeChild(day.firstChild)
  });
  
  while(destination.firstChild) 
    destination.removeChild(destination.firstChild);

  container[0].style.visibility = 'visible';
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

submit.addEventListener("click", executeSearch);
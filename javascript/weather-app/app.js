//const fetch = require('node-fetch');	

const myAPIKey = '67d28d44e5a491ed4c77c7cee4648ef8'
const initialCity = 'San Francisco'
let searchBtn = document.getElementById('search-button')
searchBtn.addEventListener('click', handleSubmit)
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const tempUnitsSwitch = document.getElementById('degrees-units')
tempUnitsSwitch.addEventListener('click', toggleTempUnits)
let weatherDataObj = {}

function toggleTempUnits() {
    let CorF = document.getElementById("degrees-units").checked ? true : false;
    console.log('Need to toggle from C to F and vice versa')
    console.log(weatherDataObj)
    let currentDeg = document.getElementById('current-degrees')
    currentDeg.innerHTML = CorF ? String(KtoC(weatherDataObj.currentTemp)) + ' ºC' : String(KtoF(weatherDataObj.currentTemp)) + ' ºF';
    let currentTempConditions = document.getElementById('degrees')
    currentTempConditions.innerHTML = CorF ? weatherDataObj.weatherDesc.slice(0, 1).toUpperCase() + weatherDataObj.weatherDesc.slice(1) + '  | High: ' + String(KtoC(weatherDataObj.hiTemp)) + ' ºC | Low: ' + String(KtoC(weatherDataObj.loTemp) + ' ºC') : weatherDataObj.weatherDesc.slice(0, 1).toUpperCase() + weatherDataObj.weatherDesc.slice(1) + '  | High: ' + String(KtoF(weatherDataObj.hiTemp)) + ' ºF | Low: ' + String(KtoF(weatherDataObj.loTemp) + ' ºF');

}

function handleSubmit(e) {
    e.preventDefault();
    fetchWeather();
}

function fetchWeather() {
    const input = document.querySelector('input[type="text"]');
    console.log(input)
    const userLocation = input.value;
    getWeatherData(userLocation);
}

function throwErrorMsg(){
    let errorText = document.getElementById('error-message')
    errorText.style.display = 'flex';
    
}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
async function getWeatherData(cityName) {
    //let weatherDataObj = {}

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myAPIKey}`, {
        mode: 'cors'
    });
    console.log(response)
    const weatherData = await response.json();
    if (response.ok !== true) {
        throwErrorMsg();
    } else {
        let errorText = document.getElementById('error-message')
        errorText.style.display = 'none';
        console.log(weatherData)
        console.log(weatherData.name + ', ' + weatherData.sys.country)
        console.log()

        console.log('Current Temp:', KtoF(weatherData.main.temp));
        console.log('Hi Temp:', KtoF(weatherData.main.temp_max));
        console.log('Lo Temp:', KtoF(weatherData.main.temp_min), '\n');


        console.log('Current Weather:', weatherData.weather[0].description);
        let hoursOffset = weatherData.timezone / 3600;
        let x = new Date()
        var UTCseconds = new Date(x.getTime()) // + weatherData.timezone);
        UTCseconds.setHours(UTCseconds.getHours() + hoursOffset);
        console.log('Local Time ', UTCseconds.toUTCString().slice(0, UTCseconds.toUTCString().length - 5))

        weatherDataObj.cityName = weatherData.name
        weatherDataObj.countryInitials = weatherData.sys.country
        weatherDataObj.currentTemp = weatherData.main.temp
        weatherDataObj.hiTemp = weatherData.main.temp_max
        weatherDataObj.loTemp = weatherData.main.temp_min
        weatherDataObj.weatherDesc = weatherData.weather[0].description
        weatherDataObj.currentTime = UTCseconds.toUTCString().slice(0, UTCseconds.toUTCString().length - 7)
        weatherDataObj.weatherIconCode = weatherData.weather[0].icon
        weatherDataObj.humidity = weatherData.main.humidity;
        weatherDataObj.pressure = weatherData.main.pressure;


        populateDOM(weatherDataObj)
    }
}

function KtoF(temp) {
    return Math.round((temp - 273.15) * (9 / 5) + 32)
}

function KtoC(temp) {
    return Math.round(temp - 273.15)
}

getWeatherData(initialCity);

function fetchNewCityWeatherData() {
    let newCity = document.getElementById('city-input').value
    console.log(newCity)
    getWeatherData(newCity)
}

function populateDOM(weatherData) {
    let CorF = document.getElementById("degrees-units").checked ? true : false;
    console.log(weatherData);
    let cityName = document.getElementById('location')
    cityName.innerHTML = weatherData.cityName + ', ' + weatherData.countryInitials;
    let currentDeg = document.getElementById('current-degrees')

    currentDeg.innerHTML = CorF ? String(KtoC(weatherData.currentTemp)) + ' ºC' : String(KtoF(weatherData.currentTemp)) + ' ºF';

    let currentTempConditions = document.getElementById('degrees')
    currentTempConditions.innerHTML = CorF ? weatherData.weatherDesc.slice(0, 1).toUpperCase() + weatherData.weatherDesc.slice(1) + '  | High: ' + String(KtoC(weatherData.hiTemp)) + ' ºC | Low: ' + String(KtoC(weatherData.loTemp) + ' ºC') : weatherData.weatherDesc.slice(0, 1).toUpperCase() + weatherData.weatherDesc.slice(1) + '  | High: ' + String(KtoF(weatherData.hiTemp)) + ' ºF | Low: ' + String(KtoF(weatherData.loTemp) + ' ºF');

    let currentConditions = document.getElementById('current-temp')
    //currentConditions.innerHTML =  weatherData.weatherDesc.slice(0,1).toUpperCase()+weatherData.weatherDesc.slice(1);
    let flagImg = document.getElementById('flag')
    flagImg.src = 'https://www.countryflags.io/' + weatherData.countryInitials + '/flat/64.png';

    let weatherImg = document.getElementById('weather-icon')
    weatherImg.src = 'http://openweathermap.org/img/wn/' + weatherData.weatherIconCode + '@2x.png';

    let currentTempConditions2 = document.getElementById('conditions-2');
    currentTempConditions2.textContent = 'Humidity: ' + String(weatherData.humidity) + '% | Pressure: ' + String(weatherData.pressure) +  ' hPA';

    let localTime = document.getElementById('local-time');
    localTime.innerHTML = 'Local Time: ' + weatherData.currentTime;
}

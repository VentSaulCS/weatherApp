var searchCity = document.getElementById('search-city')
var searchBtn = document.getElementById('search-btn')


var apiKey = 'caf242ae5fdf25cb6d36292e18b79f34';
var city;

function getCity(event) {
    event.preventDefault()
    console.log(searchCity.value)


    city = searchCity.value
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => getWeather(data));
}
function getWeather(data) {
    console.log(data[0])
    // Create Variables for longtitude and latitude
    var lat = data[0].lat
    console.log(lat);
    var lon = data[0].lon
    console.log(lon)
    city = data[0].name
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => renderWeather(data));
}
var dateElement;
var dateContent;
var element;

function renderWeather(forcast) {
    console.log(forcast)
    var date = forcast.current.dt
    date = new Date(date * 1000)
    date = date.toLocaleString()
    date = date.split(',')
    date = date[0]
    var temp = forcast.current.temp
    temp = 1.8 * (temp - 273) + 32
    temp = Math.round(temp)
    var windSpeed = forcast.current.wind_speed
    var humidity = forcast.current.humidity
    var uvi = forcast.current.uvi

    var dateElement = document.createElement('h2')
    dateElement.innerText = `${city} ${date}` //strings  interpellation
    var tempElement = document.createElement('p')
    tempElement.innerText = `Temp: ${temp}°F`
    var windElement = document.createElement('p')
    windElement.innerText = `Wind Speed: ${windSpeed} MPH`
    var humidityElement = document.createElement('p')
    humidityElement.innerText = `Humidity: ${humidity} %`
    var uviElement = document.createElement('p')
    uviElement.innerText = `UV index : ${uvi}`


    var currentContainer = document.getElementById('current')
    currentContainer.appendChild(dateElement)
    currentContainer.appendChild(tempElement)
    currentContainer.appendChild(windElement)
    currentContainer.appendChild(uviElement)

    //Loop over the first 5 elements of daily objects
    for (var i = 1; i < 6; i++) {
        console.log(forcast.daily[i])
        date = forcast.daily[i].dt
        date = new Date(date * 1000)
        date = date.toLocaleString()
        date = date.split(',')
        date = date[0]
        temp = forcast.daily[i].temp.max
        temp = 1.8 * (temp - 273) + 32
        temp = Math.round(temp)
        windSpeed = forcast.daily[i].wind_speed
        humidity = forcast.daily[i].humidity
        uvi = forcast.daily[i].uvi
        console.log(date, temp, windSpeed, humidity, uvi)

        var dailyDate = document.createElement('h2')
        var dailyTemp = document.createElement('p')
        var dailyWindspeed = document.createElement('p')
        var dailyHumidity = document.createElement('p')
        var dailyUvi = document.createElement('p')

        dailyDate.innerText = `${date}`
        var dailyContainer = document.getElementById('forcast')

        dailyTemp.innerText = `Temp: ${temp}°F`
        var dailyContainer = document.getElementById('forcast')

        dailyWindspeed.innerText = `Wind Speed: ${windSpeed} MPH`
        var dailyContainer = document.getElementById('forcast')

        dailyHumidity.innerText = `Humidity: ${humidity} %`
        var dailyContainer = document.getElementById('forcast')

        dailyUvi.innerText = `UV index : ${uvi}`
        var dailyContainer = document.getElementById('forcast')





        dailyContainer.appendChild(dailyDate)
        dailyContainer.appendChild(dailyTemp)
        dailyContainer.appendChild(dailyWindspeed)
        dailyContainer.appendChild(dailyHumidity)
        dailyContainer.appendChild(dailyUvi)


        //use appendChild to add element with variables to forCast cards
        //after append all elements you have to append forcast card to the ForCast

    }

}
searchBtn.addEventListener('click', getCity)

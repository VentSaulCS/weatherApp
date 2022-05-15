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
    var dateElement = document.createElement('p')
    var dateContent = document.createTextNode(date)
    dateElement.appendChild(dateContent)
    var date1 = document.getElementById('container');
    date1.appendChild(dateElement);


    console.log(date)

   

    var temp = forcast.current.temp
    temp = 1.8 * (temp - 273) + 32
    temp = Math.round(temp)
    var tempElement = document.createElement('p')
    var tempContent = document.createTextNode(temp)
    tempElement.appendChild(tempContent)
    var temp1 = document.getElementById('container');
    temp1.appendChild(tempElement);

    console.log(temp)

    var clouds = forcast.current.clouds
    var cloudsElement = document.createElement('p')
    var cloudsContent = document.createTextNode(clouds)
    cloudsElement.appendChild(cloudsContent)
    var clouds1 = document.getElementById('container');
    clouds1.appendChild(cloudsElement);
    console.log(clouds)
    

    // research inner Html method 


   

    


}
searchBtn.addEventListener('click', getCity)

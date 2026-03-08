const apiKey='9be4155d55710f4d322b2bebc1302cfc';
const searchBtn = document.getElementById('searchBtn');

if (searchBtn) {
    searchBtn.addEventListener('click', getWeather);
}
function getWeather(){
    const city=document.getElementById('cityInput').value;
    if (city==''){
        alert("Enter the city name");
        return;
    }
  const url =
 `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

 fetch(url)

 .then(response => response.json())

 .then(data => {

    document.getElementById("cityName").innerText = data.name;

    document.getElementById("temperature").innerText =
    Math.round(data.main.temp) + "°C";

    document.getElementById("description").innerText =
    data.weather[0].description;

    document.getElementById("feelsLike").innerText =
    Math.round(data.main.feels_like) + "°C";

    document.getElementById("humidity").innerText =
    data.main.humidity + "%";

    document.getElementById("wind").innerText =
    data.wind.speed + " m/s";

})

.catch(error => {
alert("City not found");
});

}

// forecast script

const forecastBtn = document.getElementById("forecastBtn");

if(forecastBtn){

forecastBtn.addEventListener("click", getForecast);

}

function getForecast(){

    const city = document.getElementById("forecastCity").value;

    const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)

    .then(res => res.json())

    .then(data => {

        const container = document.getElementById("forecastContainer");

        container.innerHTML = "";

        data.list.slice(0,5).forEach(item => {

            const card = document.createElement("div");

            card.classList.add("forecast-card");

            const date = new Date(item.dt_txt);

            card.innerHTML = `
            <p>${date.toDateString()}</p>
            <h3>${Math.round(item.main.temp)}°C</h3>
            <p>${item.weather[0].main}</p>
            `;

            container.appendChild(card);

        });

    });

}


// save page 
const input = document.getElementById("saveCityInput");
const btn = document.getElementById("saveCityBtn");
const list = document.getElementById("cityList");

btn.addEventListener("click", function(){

const city = input.value;

if(city === ""){
alert("Enter city");
return;
}

let cities = JSON.parse(localStorage.getItem("cities")) || [];

cities.push(city);

localStorage.setItem("cities", JSON.stringify(cities));

showCities();

});

function showCities(){

let cities = JSON.parse(localStorage.getItem("cities")) || [];

list.innerHTML = "";

cities.forEach(function(city){

const li = document.createElement("li");

li.textContent = city;

list.appendChild(li);

});

}

showCities();
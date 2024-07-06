"use strict"
const container = document.querySelector("#holder");

const inputSearch = document.querySelector("#hsbc");
const searchBtn = document.querySelector("#inpBtn");

const todayName = document.querySelector("#hyoom");
const todayDate = document.querySelector("#hyoom-spe");
const locationCity = document.querySelector("#city")
const degree = document.querySelector("#degree-hyoom")
const icon = document.querySelector("#icon");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const speed = document.querySelector("#speed");
const direction = document.querySelector("#direction");


const dayNext = document.querySelectorAll(".day-next");
const iconsNext = document.querySelectorAll(".img-next");
const maxDegree = document.querySelectorAll(".max-deg-next");
const minDegree = document.querySelectorAll(".min-deg-next");
const condNext = document.querySelectorAll(".condition-next");



async function getWeather(data) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2e01892c5e8f4b39939215139240407&q=${data}&days=3`);
    let allWeather = await weather.json();
    return allWeather
}


//display current weather
function displayCurrent(data) {
    let currentDate = new Date(data.current.last_updated);
    todayName.innerHTML = currentDate.toLocaleDateString("en-us", { weekday: "long" });
    todayDate.innerHTML = currentDate.getDate() + " " + currentDate.toLocaleDateString("en-us", { month: "long" })
    locationCity.innerHTML = data.location.name;
    degree.innerHTML = data.current.temp_c + " °C";
    icon.setAttribute("src", data.current.condition.icon);
    condition.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + " %";
    speed.innerHTML = data.current.wind_kph + " km/h";
    direction.innerHTML = data.current.wind_dir;
}
//display next 2 days weather

function nextData(data) {

    let nextDataDays = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let dynamicDate = new Date(nextDataDays[i+1].date);
        console.log(dynamicDate);
        dayNext[i].innerHTML = dynamicDate.toLocaleDateString("en-us", { weekday: "long" });
        maxDegree[i].innerHTML = nextDataDays[i + 1].day.maxtemp_c +" °C";
        minDegree[i].innerHTML = nextDataDays[i + 1].day.mintemp_c +" °C";
        iconsNext[i].setAttribute("src", nextDataDays[i + 1].day.condition.icon);
        condNext[i].innerHTML = nextDataDays[i + 1].day.condition.text;


    }

}

//all data func



async function allData(city = "london") {
    let allWeatherData = await getWeather(city);
    
        displayCurrent(allWeatherData);
        nextData(allWeatherData);
    
}
allData();

searchBtn.addEventListener("click", function () {
    allData(inputSearch.value)
})
searchBtn.addEventListener("click", function () {
    allData(inputSearch.value)
})
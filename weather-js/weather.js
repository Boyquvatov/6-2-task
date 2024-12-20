const API_KEY = "0e5a9941ba9582c9b5a4e7068fd380c4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const HOURLY_URL = `${BASE_URL}/forecast`;
const DAILY_URL = `${BASE_URL}/forecast/daily`;

const result = document.querySelector("#result");
const input = document.querySelector("#input");
const button = document.querySelector("button");
const temp = document.querySelector("#temp");
const a=3
function updateBackground(tempValue) {
    if (tempValue < 10) {
        document.body.style.backgroundImage = "url('../weather-img/winterr.jpg')";
        document.querySelectorAll('.text-temp').forEach(h2 => {
            h2.style.color = "black";
        });
    } else {
        document.body.style.backgroundImage = "url('../weather-img/summer.jpg')";
        document.querySelectorAll('.text-temp').forEach(h2 => {
            h2.style.color = "white";
        });
    }
}

function fetchWeatherData(city) {
    fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            result.innerHTML = `
            <div class="text-center">
                <h1>${data.name ? data.name : "Toshkent"}</h1>
                <p id="temp">${data.main.temp} °C</p>
                <p>${data.sys.country}</p>
            </div>
            `;
            updateBackground(data.main.temp);
        });
}

function fetchHourlyWeather(city) {
    fetch(`${HOURLY_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const hourlyForecasts = data.list.slice(0, 8);
            const hourlyResult = document.querySelector("#hourly-result");
            hourlyResult.innerHTML = `
                ${hourlyForecasts.map(item => `
                    <div class="d-flex flex-row bd-highlight mb-2 gap-4">
                        <h3>${new Date(item.dt * 1000).toLocaleTimeString()}</h3>
                        <p>Harorat: ${item.main.temp} °C</p>
                        <p>Ob-Havo: ${item.weather[0].description}</p>
                    </div>
                `).join('')}
            `;
        });
}

function fetchDailyWeather(city) {
    fetch(`${HOURLY_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 5); // Har 8 soatlik ma'lumotdan 1 kunni tanlash
            const dailyResult = document.querySelector("#daily-result");
            dailyResult.innerHTML = `
                ${dailyForecasts.map(item => `
                    <div class="d-flex flex-row bd-highlight mb-2 gap-4">
                        <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
                        <p>Harorat: ${item.main.temp} °C</p>
                        <p>Ob-Havo: ${item.weather[0].description}</p>
                    </div>
                `).join('')}
            `;
        });
}

const init = () => {
    const defaultCity = "Toshkent";
    fetchWeatherData(defaultCity);
    fetchHourlyWeather(defaultCity);
    fetchDailyWeather(defaultCity);
};

button.addEventListener("click", () => {
    const city = input.value;
    fetchWeatherData(city);
    fetchHourlyWeather(city);
    fetchDailyWeather(city);
});

document.addEventListener('DOMContentLoaded', init);

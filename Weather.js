const apiKey = "614edcadbc1375b0832fa7575c5c0bc9";

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found. Try correct spelling.");
                return;
            }

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temperature").innerText =
                Math.round(data.main.temp) + "°C";
            document.getElementById("description").innerText =
                data.weather[0].description;
            document.getElementById("humidity").innerText =
                data.main.humidity + "%";
            document.getElementById("wind").innerText =
                data.wind.speed + " km/h";

            setIcon(data.weather[0].main);
        })
        .catch(() => {
            alert("Something went wrong");
        });
}
function setIcon(weather) {
    const icon = document.getElementById("weatherIcon");

    if (weather === "Clear") icon.innerText = "☀️";
    else if (weather === "Clouds") icon.innerText = "☁️";
    else if (weather === "Rain") icon.innerText = "🌧️";
    else if (weather === "Snow") icon.innerText = "❄️";
    else icon.innerText = "🌤️";
}

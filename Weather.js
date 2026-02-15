const apiKey = "614edcadbc1375b0832fa7575c5c0bc9";

window.onload = function() {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').innerText = today.toLocaleDateString('en-US', options);
    

    document.getElementById('cityInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
};

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found");
                return;
            }

            // Update city name
            document.getElementById("cityName").innerText = data.name + ", " + data.sys.country;

            // Update temperature
            document.getElementById("temp").innerText = Math.round(data.main.temp);

            // Update description
            document.getElementById("description").innerText = data.weather[0].description;

            // Update humidity
            document.getElementById("humidity").innerText = data.main.humidity + "%";

            // Update wind
            document.getElementById("wind").innerText = Math.round(data.wind.speed * 3.6) + " km/h";

            // Update feels like
            document.getElementById("feelsLike").innerText = Math.round(data.main.feels_like) + "°C";

            // Update visibility
            const visibility = (data.visibility / 1000).toFixed(1);
            document.getElementById("visibility").innerText = visibility + " km";

            // Update icon
            setIcon(data.weather[0].main);

            // Update background
            updateBackground(data.weather[0].main);
        })
        .catch(() => {
            alert("Something went wrong");
        });
}

function setIcon(weather) {
    const icon = document.getElementById("weatherIcon");

    if (weather === "Clear") {
        icon.innerText = "☀️";
    } else if (weather === "Clouds") {
        icon.innerText = "☁️";
    } else if (weather === "Rain") {
        icon.innerText = "🌧️";
    } else if (weather === "Snow") {
        icon.innerText = "❄️";
    } else if (weather === "Thunderstorm") {
        icon.innerText = "⛈️";
    } else {
        icon.innerText = "🌤️";
    }
}


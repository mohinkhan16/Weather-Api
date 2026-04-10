async function featchweather() {
    const input = document.getElementById("cityInput").value.trim();
    const error = document.getElementById("error");
    const city = document.getElementById("city");
    const weatherBox = document.getElementById("weather");

    
    error.textContent = "";
    city.textContent = "";
    weatherBox.innerHTML = "";

    if (!input) {
        error.textContent = "Please enter a city name ";
        return;
    }

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=741c8e2867412a6d048b623e3dbfc3c6&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) {
            throw new Error("City not found");
        }

        city.textContent = data.name;

        weatherBox.innerHTML = `
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind Speed: ${data.wind.speed} km/h</p>
            <p>🌥 Condition: ${data.weather[0].main}</p>
        `;

    } catch (err) {
        error.textContent = "City not found";
        console.log(err);
    }
}
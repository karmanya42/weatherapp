

 document.querySelector("button").addEventListener("click", fetchCityData);

  function fetchCityData() {
    const city = document.getElementById("cityinput").value;
    const apiUrl = `
https://api.weatherapi.com/v1/current.json?key=a44ba48aaf7a48a2bf6133842250507&q=${city}&aqi=no`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("API Response:", data);
        
        // Update temperature and location
        document.querySelector(".temperature-display h2").textContent = `${data.current.temp_c}°C`;
        document.querySelector(".temperature-display p").textContent = data.location.name;

        // Update wind info
        document.querySelectorAll(".card")[0].innerHTML = `
          <h3>Wind</h3>
          <p>${data.current.wind_kph} km/h</p>
          <p>${data.current.wind_dir}</p>
        `;

        // Update humidity
        document.querySelectorAll(".card")[1].innerHTML = `
          <h3>Humidity</h3>
          <p>${data.current.humidity}%</p>
        `;

        // Update visibility
        document.querySelectorAll(".card")[2].innerHTML = `
          <h3>Visibility</h3>
          <p>${data.current.vis_km} km</p>
        `;

        // Update last updated time
        document.querySelector(".footer p").textContent = `Last updated: ${data.current.last_updated}`;
      })
      .catch(error => {
        console.error("Fetch error:", error);
        alert("Could not fetch weather data. Please check the city name.");
      });
  }

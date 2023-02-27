const iconContainer = document.querySelector(".weather-icon");
const tempContainer = document.querySelector(".weather-temp");
const statusContainer = document.querySelector(".weather-status");

const apiKey = "257b728760811fc7c3ac84235d147239";

document.addEventListener("DOMContentLoaded", () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					const temp = data.main.temp;
					const place = data.name;
					const status = data.weather[0].main;
					const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
					tempContainer.innerHTML = `${temp} °C`;
					statusContainer.innerHTML = status;
					if (iconUrl) {
						const img = document.createElement("img");
						img.src = iconUrl;
						iconContainer.appendChild(img);
					}
				});
		});
	} else {
		console.error("Geolocation is not supported by this browser!");
	}
});

const _time = document.querySelector(".time");
const _date = document.querySelector(".date");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const screenSaver = document.querySelector(".screen-saver");
const screenSaverTime = document.querySelector(".screen-saver-time");
const searchForm = document.querySelector("form.search");

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const setTime = () => {
	const time = new Date();
	const Month = time.getMonth();
	const Day = time.getDay();
	const DatE = time.getDate();
	const Hours = time.getHours();
	const Minutes = time.getMinutes();
	const Seconds = time.getSeconds();
	_time.innerHTML = `
${Hours < 10 ? `0${Hours}` : Hours} :
${Minutes < 10 ? `0${Minutes}` : Minutes}
`;
	_date.innerHTML = `
${days[Day]} , ${months[Month]} ${DatE}
`;
	screenSaverTime.innerHTML = `
${Hours < 10 ? `0${Hours}` : Hours} :
${Minutes < 10 ? `0${Minutes}` : Minutes} :
${Seconds < 10 ? `0${Seconds}` : Seconds}
`;
};
setTime();
setInterval(setTime, 1000);

fullScreenBtn.addEventListener("click", () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
});

document.addEventListener("fullscreenchange", () => {
	console.log("fullscreenchange", screenSaver.classList);
	screenSaver.classList.toggle("screen-saver-visible");
	screenSaver.classList.toggle("screen-saver-invisible");
});

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchInput = searchForm.querySelector("input");
	const searchValue = searchInput.value;
	window.location.href = `https://www.google.com/search?q=${searchValue}`;
});

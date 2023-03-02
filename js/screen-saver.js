const fullScreenBtn = document.querySelector(".full-screen-btn");
const screenSaver = document.querySelector(".screen-saver");
const screenSaverTime = document.querySelector(".screen-saver-time");

const setScreenSaverTime = () => {
	const time = new Date();
	const Hours = time.getHours();
	const Minutes = time.getMinutes();
	const Seconds = time.getSeconds();
	screenSaverTime.innerHTML = `
${Hours < 10 ? `0${Hours}` : Hours} :
${Minutes < 10 ? `0${Minutes}` : Minutes} :
${Seconds < 10 ? `0${Seconds}` : Seconds}
`;
};
setScreenSaverTime();
setInterval(setScreenSaverTime, 1000);

fullScreenBtn.addEventListener("click", () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
});

document.addEventListener("fullscreenchange", () => {
	screenSaver.classList.toggle("visible");
	screenSaver.classList.toggle("invisible");
});

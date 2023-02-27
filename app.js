const _time = document.querySelector(".time");
const _date = document.querySelector(".date");

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
${Hours} :
${Minutes < 10 ? `0${Minutes}` : Minutes}
`;
	_date.innerHTML = `
${days[Day]} , ${months[Month]} ${DatE}
`;
};
setTime();
setInterval(setTime, 1000);

const searchForm = document.querySelector("form.search");

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchInput = searchForm.querySelector("input");
	const searchValue = searchInput.value;
	const urlRegex =
		/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
	if (urlRegex.test(searchValue)) window.location.href = searchValue;
	else
		window.location.href = `https://www.google.com/search?q=${searchValue}`;
});

const currentTime = new Date();

if (currentTime.getHours() >= 20 || currentTime.getHours() < 7) {
	document.body.classList.add("dark");
	document.body.classList.remove("light");
} else {
	document.body.classList.add("light");
	document.body.classList.remove("dark");
}

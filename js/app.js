const searchForm = document.querySelector("form.search");

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchInput = searchForm.querySelector("input");
	const searchValue = searchInput.value;
	window.location.href = `https://www.google.com/search?q=${searchValue}`;
});

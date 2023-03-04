const addShortcutBtn = document.querySelector(".add-shortcut-btn");
const addShortcutPopup = document.querySelector(".add-shortcut-popup");
const addShortcutForm = document.querySelector(".add-shortcut-form");
const addShortcutPopupCloseBtn = document.querySelector(".popup-close");
const addShortcutCancelBtn = document.querySelector(
	"button#add-shortcut-action-btn-cancel"
);
const addShortcutSaveBtn = document.querySelector(
	"button#add-shortcut-action-btn-save"
);

const shortcutTitleInput = document.querySelector("input#shortcut-title");
const shortcutUrlInput = document.querySelector("input#shortcut-url");

const overlay = document.querySelector(".overlay");
const shortcutsContainer = document.querySelector(".shortcuts-container");
const shortcuts = document.querySelectorAll(".shortcut");
const shortcutDeleteBtns = document.querySelectorAll(".shortcut-delete-btn");

const getShortcuts = () =>
	JSON.parse(localStorage.getItem("shortcuts") || "[]");
const setShortcuts = (shortcuts) =>
	localStorage.setItem("shortcuts", JSON.stringify(shortcuts));

const togglePopup = (action = "close") => {
	if (action === "open") {
		addShortcutPopup.classList.remove("invisible");
		addShortcutPopup.classList.add("visible");
		overlay.classList.remove("invisible");
		overlay.classList.add("visible");
		return;
	}
	if (action === "close") {
		addShortcutPopup.classList.remove("visible");
		addShortcutPopup.classList.add("invisible");
		overlay.classList.remove("visible");
		overlay.classList.add("invisible");
		return;
	}
};

const getFavicon = (url) =>
	`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=48`;

const createShortcut = (id, title, url, icon) => {
	const shortcutEl = document.createElement("a");
	shortcutEl.classList.add("shortcut");
	shortcutEl.href = url;
	shortcutEl.id = id;

	const shortcutIcon = document.createElement("img");
	shortcutIcon.classList.add("shortcut-icon");
	shortcutIcon.src = icon;
	shortcutEl.appendChild(shortcutIcon);

	const shortcutText = document.createElement("span");
	shortcutText.classList.add("shortcut-text");
	shortcutText.textContent = title;
	shortcutEl.appendChild(shortcutText);

	const shortcutDelete = document.createElement("button");
	shortcutDelete.classList.add("shortcut-delete-btn");
	shortcutDelete.classList.add("material-symbols-outlined");
	shortcutDelete.id = "delete-btn " + id;
	shortcutDelete.textContent = "close";
	shortcutDelete.addEventListener("click", deleteShortcut);
	shortcutEl.appendChild(shortcutDelete);

	return shortcutEl;
};

const displayShortcuts = (shortcuts) => {
	shortcutsContainer.innerHTML = "";
	shortcuts
		.sort((a, b) => b.id - a.id)
		.forEach((shortcut) => {
			const shortcutEl = createShortcut(
				shortcut.id,
				shortcut.title,
				shortcut.url,
				shortcut.icon
			);
			shortcutsContainer.appendChild(shortcutEl);
		});
};

const addShortcut = (e) => {
	e.preventDefault();
	const shortcuts = getShortcuts();
	if (!shortcutTitleInput.value || !shortcutUrlInput.value) return;
	shortcuts.push({
		id: Date.now(),
		title: shortcutTitleInput.value,
		url: shortcutUrlInput.value,
		icon: getFavicon(shortcutUrlInput.value),
	});
	setShortcuts(shortcuts);
	displayShortcuts(shortcuts);
	togglePopup("close");
	addShortcutForm.reset();
};

const deleteShortcut = (e) => {
	e.preventDefault();
	const confirmDelete = confirm(
		"Are you sure you want to delete this shortcut?"
	);
	if (!confirmDelete) return;
	const shortcuts = getShortcuts();
	const shortcutId = e.target.id.split(" ")[1];
	const newShortcuts = shortcuts.filter(
		(shortcut) => shortcut.id != shortcutId
	);
	setShortcuts(newShortcuts);
	displayShortcuts(newShortcuts);
};

addShortcutBtn.addEventListener("click", () => togglePopup("open"));
addShortcutSaveBtn.addEventListener("click", addShortcut);
addShortcutForm.addEventListener("submit", addShortcut);
addShortcutPopupCloseBtn.addEventListener("click", () => togglePopup("close"));
addShortcutCancelBtn.addEventListener("click", () => togglePopup("close"));
overlay.addEventListener("click", () => togglePopup("close"));
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && addShortcutPopup.classList.contains("visible"))
		togglePopup();
});

document.addEventListener("DOMContentLoaded", () => {
	displayShortcuts(getShortcuts());
});

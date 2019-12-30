let themeToggleButton = document.querySelector("#theme-toggle");
let stylesheetLink = document.querySelector("#stylesheet");


// name must equal the key
let themes = {
	"light": {
		"name": "light",
		"href": "light.css",
	},
	"dark": {
		"name": "dark",
		"href": "dark-lite.css",
	},
	"hax": {
		"name": "hax",
		"href": "hax-lite.css"
	},
	"wack": {
		"name": "wack",
		"href": "wack-lite.css"
	}
}

let themeKeys = Object.keys(themes);
let currentTheme = themes[getThemeNameFromStorage()];

window.addEventListener("DOMContentLoaded", displayInitTheme);

function displayInitTheme() {
	console.log(currentTheme);
	stylesheetLink.setAttribute("href", `css/${currentTheme.href}`);
	let nextIndex = (themeKeys.indexOf(currentTheme.name) + 1) % themeKeys.length;
	console.log(nextIndex);
	themeToggleButton.innerHTML = themes[themeKeys[nextIndex]].name;
}

themeToggleButton.addEventListener("click", function() {
	let nextIndex = (themeKeys.indexOf(currentTheme.name) + 1) % themeKeys.length;
	currentTheme = themes[themeKeys[nextIndex]];
	console.log(currentTheme);
	updateThemeFromStorage(currentTheme);
	this.innerHTML = themes[themeKeys[(nextIndex + 1) % themeKeys.length]].name;
	stylesheetLink.setAttribute("href", `css/${currentTheme.href}`);
});

function getThemeNameFromStorage() {
	if (typeof(Storage) !== "undefined") {
		if (localStorage.themeName) {
			return localStorage.themeName;
		}
		else {
			localStorage.setItem("themeName", themes.light.name);
			return localStorage.themeName;
		}
	}
	else {
		console.log("No web storage support");
	}
}

function updateThemeFromStorage(ctheme) {
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("themeName", ctheme.name);
	}
	else {
		console.log("No web storage support");
	}
}
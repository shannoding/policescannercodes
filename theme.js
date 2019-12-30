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
let currentTheme = themes.light;

window.addEventListener("DOMContentLoaded", displayInitTheme);

function displayInitTheme() {
	// let defaultTheme = getCookie("theme");
	// if (defaultTheme != "") {
	// 	currentTheme = themes[defaultTheme];
	// }
	// else {
	// 	setCookie("theme", currentTheme.name, 365);
	// }
	stylesheetLink.setAttribute("href", `css/${currentTheme.href}`);
	let nextIndex = (themeKeys.indexOf(currentTheme.name) + 1) % themeKeys.length;
	console.log(nextIndex);
	themeToggleButton.innerHTML = themes[themeKeys[nextIndex]].name;
}

themeToggleButton.addEventListener("click", function() {
	let nextIndex = (themeKeys.indexOf(currentTheme.name) + 1) % themeKeys.length;
	currentTheme = themes[themeKeys[nextIndex]];
	console.log(currentTheme);
	// setCookie("theme", currentTheme.name, 365);
	this.innerHTML = themes[themeKeys[(nextIndex + 1) % themeKeys.length]].name;
	stylesheetLink.setAttribute("href", `css/${currentTheme.href}`);
});
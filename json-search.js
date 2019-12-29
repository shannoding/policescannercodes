let inp = document.querySelector("input");
let resultsBox = document.querySelector("#results .list");
let pinnedBox = document.querySelector("#pinned .list");
let allCodesBox = document.querySelector("#codes");
let themeToggleButton = document.querySelector("#theme-toggle");
let stylesheetLink = document.querySelector("#stylesheet");

var manageInput = {
	typingTimer: function() {},
	doneTypingInterval: 500,
	findInput: function() {
		let co = inp.value.trim();
		co = co.replace(/[^a-z0-9]/gi, "").toUpperCase();
		return co;
	}
};

inp.addEventListener('keyup', function() {
	clearTimeout(manageInput.typingTimer);
	manageInput.typingTimer = setTimeout(showResults, manageInput.doneTypingInterval);
});

inp.addEventListener('keydown', function() {
	clearTimeout(manageInput.typingTimer);
});


var cleanCodes = [];
var infoArray = [];
let requestURL = "https://shannoding.github.io/policescannercodes/ca.json";
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.addEventListener('load', transferComplete);
request.send();

let data;
let categories;

// Callback after request is complete
function transferComplete() {
	data = request.response.data;
	categories = request.response.categories;
	console.log("Transfer complete");
	init();
}

function init() {
	fillCleanCodes(data, cleanCodes);
	fillInfoArray(data, infoArray);
	displayCodeBoxes(data, categories);
	console.log("Init complete");
}


// Fills cleanCodes array with clean codes
function fillCleanCodes(cdata, carray) {
	for (let obj of cdata) {
		let ccode = cleanCode(obj.code);
		carray.push(ccode);
	}
	console.log(carray);
}

// Fills infoArray from data
function fillInfoArray(cdata, iarray) {
	for (let i = 0; i < cdata.length; i++) {
		iarray.push({
			"index": i,
			"code": cdata[i].code,
			"description": cdata[i].description,
			"pinned": false
		});
	}
	console.log(iarray);
}

// Cleans individual codes
function cleanCode(code) {
	return code.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

function displayCodeBoxes(cdata, cat) {
	let domCodesBoxes = [];
	for (let i = 0; i < cat.length; i++) {
		let domCodesBox = document.createElement("div");
		domCodesBox.className = "codesBox";

		let domCodesHead = document.createElement(h1);
		let domCodesHeadText = document.createTextNode(cat[i]);
		domCodesHead.appendChild(domCodesHeadText);

		let domCodesList = document.createElement("div");
		domCodesList.className = "list";

		domCodesBox.appendChild(domCodesHead);
		domCodesBox.appendChild(domCodesList);

		allCodesBox.appendChild(domCodesBox);

		domCodesBoxes[i] = domCodesList;
	}
	console.log(domCodesBoxes);
	for (let obj of cdata) {

	}
}


var searchResults = {
	resultsArray: [],
}

var pinArray = [];

function showResults() {
	console.log("Here's your results!");
	let input = manageInput.findInput();
	// Do something if input is empty
	console.log(`Your input was ${input}`);
	if (input === "") {
		searchResults.resultsArray = [];
		displayNoResultsFound();
		return;
	}
	findResults(input);
	if (searchResults.resultsArray.length === 0) {
		displayNoResultsFound();
		return;
	}
	// Clear resultsBox
	resultsBox.innerHTML = "";
	displayResults(searchResults.resultsArray);
}

function findResults(input) {
	searchResults.resultsArray = []; // Clears results
	for (let i = 0; i < cleanCodes.length; i++) {
		let eachCode = cleanCodes[i];
		if (eachCode.includes(input)) {
			searchResults.resultsArray.push({
				"index": i,
				"code": infoArray[i].code,
				"description": infoArray[i].description,
				"pinned": infoArray[i].pinned
			});
		}
	}
	console.log(searchResults.resultsArray);
}

function displayResults(rArray) {
	for (let res of rArray) {
		let domCodeDisplay = document.createElement("span");
		let domDescDisplay = document.createElement("span");
		let domPinSpan = document.createElement("span");
		if (res.pinned) {
			domPinSpan.innerHTML = `<button class="but pinBut pinnedButton" id="r${res.index}" onclick="addPin(this)">pin</button>`;
		}
		else {
			domPinSpan.innerHTML = `<button class="but pinBut" id="r${res.index}" onclick="addPin(this)">pin</button>`;
		}
		domCodeDisplay.appendChild(domPinSpan);
		let domCode = document.createTextNode(`${res.code}`);
		domCodeDisplay.appendChild(domCode);
		domCodeDisplay.className = "codeDisplay";

		domDescDisplay.innerHTML = `${res.description}`;
		domDescDisplay.className = "descDisplay";

		resultsBox.appendChild(domCodeDisplay);
		resultsBox.appendChild(domDescDisplay);
		resultsBox.appendChild(document.createElement("br"));
	}
}


function displayNoResultsFound() {
	resultsBox.innerHTML = "<p>no results found</p>";
}

function addPin(button) {
	let i = button.id.substring(1);
	if (infoArray[i].pinned) {
		// Do nothing if already pinned
		return;
	}
	infoArray[i].pinned = true;
	button.classList.add("pinnedButton");
	// pinArray push
	let nextPin = {
		"index": i,
		"code": infoArray[i].code,
		"description": infoArray[i].description
	};
	pinArray.push(nextPin);
	displayPin(nextPin);
	console.log(infoArray[i]);
}

function displayPin(npin) {
	let domCodeDisplay = document.createElement("span");
	let domDescDisplay = document.createElement("span");
	let domRemSpan = document.createElement("span");
	domRemSpan.innerHTML = `<button class="but pinBut" id="p${npin.index}" onclick="removePin(this)">remove</button>`;
	
	domCodeDisplay.appendChild(domRemSpan);
	let domCode = document.createTextNode(`${npin.code}`);
	domCodeDisplay.appendChild(domCode);
	domCodeDisplay.className = "codeDisplay";

	domDescDisplay.innerHTML = `${npin.description}`;
	domDescDisplay.className = "descDisplay";

	pinnedBox.appendChild(domCodeDisplay);
	pinnedBox.appendChild(domDescDisplay);
	pinnedBox.appendChild(document.createElement("br"));
}

function removePin(button) {
	let i = button.id.substring(1);
	for (let j = 0; j < pinArray.length; j++) {
		if (pinArray[j].index == i) {
			pinArray.splice(j, 1);
			pinnedBox.removeChild(pinnedBox.childNodes[3*j + 2]);
			pinnedBox.removeChild(pinnedBox.childNodes[3*j + 1]);
			pinnedBox.removeChild(pinnedBox.childNodes[3*j]);
			// Unpin in infoArray
			infoArray[i].pinned = false;
			// also redisplay resultsArray
			
			showResults();
			return;
		}
	}
}


let themes = {
	"light": {
		"name": "light",
		"href": "light.css",
	},
	"dark": {
		"name": "dark",
		"href": "dark.css",
	}
}
let currentTheme = themes.light;

themeToggleButton.addEventListener("click", function() {
	if (currentTheme == themes.light) {
		currentTheme = themes.dark;
		this.innerHTML = themes.light.name;
		stylesheetLink.setAttribute("href", currentTheme.href);
	}
	else if (currentTheme == themes.dark) {
		currentTheme = themes.light;
		this.innerHTML =  themes.dark.name;
		document.body.transition = "0.5s";
		stylesheetLink.setAttribute("href", currentTheme.href);
	}
});
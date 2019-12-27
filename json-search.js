let inp = document.querySelector("input");
let resultsBox = document.querySelector("#results .list");
let pinnedBox = document.querySelector("#pinned .list");

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

function showResults() {
	console.log("Here's your results!");
	console.log(`Your input was ${manageInput.findInput()}`);
	// Now we go through all clean codes index by index -> O(n)
		// Check to see if input is a substring
		// Use the index to get the corresponding entry in data
		// Fill results array with that object
	// Check if results array is empty
	// Go through results array and display results
}

var cleanCodes = [];
let requestURL = "https://shannoding.github.io/policescannercodes/ca.json";
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.addEventListener('load', transferComplete);
request.send();

// Callback after request is complete
function transferComplete() {
	const data = request.response.data;
	console.log("Transfer complete");
	fillCleanCodes(data, cleanCodes);
}


// Fills cleanCodes array with clean codes
function fillCleanCodes(cdata, carray) {
	for (let obj of cdata) {
		let ccode = cleanCode(obj.code);
		carray.push(ccode);
	}
	console.log(carray);
}

// Cleans individual codes
function cleanCode(code) {
	return code.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

function checkResults() {

}

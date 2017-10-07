var inp = document.querySelector("input");
var allCodes = document.querySelectorAll("#codes .code");
var allDesc = document.querySelectorAll("#codes .desc");
var resultsBox = document.querySelector("#results .list");
var getDescArray = function()  {
  var descArray = [];
  var co = inp.value.trim();
  co = co.replace(/[^a-z0-9]/gi, "");
  console.log("CO IS " + co);
  if (co === "") {
    return [];
  }
  for (var i = 0; i < allCodes.length; i++) {
    var eachCode = allCodes[i].textContent.replace(/[^a-z0-9]/gi, "");
    console.log(eachCode);
    if (eachCode.includes(co.toUpperCase())) {
        descArray.push(i);
      }
  }
console.log(descArray);
return descArray;
};
var showResults = function() {
  var descArray = getDescArray();
  resultsBox.innerHTML = "";
  if (descArray.length === 0) {
    resultsBox.innerHTML = "<p>no results found</p>";
  }
  descArray.forEach(function(element) {
    resultsBox.innerHTML += '<span class="code">' + allCodes[element].textContent + "</span>     <span class='desc'>" + allDesc[element].textContent + "</span><br>";
  });
};
// inp.addEventListener("change", showResults);
//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 500;  //time in ms, 5 second for example

//on keyup, start the countdown
inp.addEventListener('keyup', function () {
clearTimeout(typingTimer);
typingTimer = setTimeout(showResults, doneTypingInterval);
});

//on keydown, clear the countdown
inp.addEventListener('keydown', function () {
clearTimeout(typingTimer);
});

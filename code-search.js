var inp = document.querySelector("input");
var allCodes = document.querySelectorAll("#codes .code");
var allDesc = document.querySelectorAll("#codes .desc");
var resultsBox = document.querySelector("#results .list");
var getDescArray = function()  {
  var descArray = [];
  var co = inp.value.trim();
  co = co.replace(/[^a-z0-9]/gi, "");
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
    if (pin.check(allCodes[element].textContent.trim())) {
      resultsBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut pinnedButton">pin</button></span>' + allCodes[element].textContent + '</span>     <span class="descDisplay">' + allDesc[element].textContent + "</span><br>";
    }
    else {
      resultsBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut" onclick="pin.add(this)">pin</button></span>' + allCodes[element].textContent + '</span>     <span class="descDisplay">' + allDesc[element].textContent + "</span><br>";
    }
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

var pin = {
  list: [],
  getCode: function(elementClicked) {
    var newCode = elementClicked.parentElement.parentElement.textContent.substring(3).trim();
    return newCode;
  },
  add: function(pinClicked) {
    var newCode = pin.getCode(pinClicked);
    if (!pin.check(newCode)) {
      pin.list.push(newCode);
      pinClicked.classList.add("pinnedButton");
      pinned.fill();
    }
    console.log(this.list);
  },
  check: function(checkCode) {
    console.log("entered check. checkCode is " + checkCode + " and array is " + this.list);
    for (var i = 0; i < pin.list.length; i++) {
      if (pin.list[i] == checkCode) {
        return true;
      }
    }
    return false;
  }
};
var pinBut = document.getElementsByClassName("pinBut");
var pinnedBox = document.querySelector("#pinned .list");
var pinned =
{
  fill: function() {
    pinnedBox.innerHTML = "";
    for (var i = 0; i < pin.list.length; i++) {
        pinnedBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut pinnedButton">unpin</button></span>' + pin.list[i] + '</span>     <span class="descDisplay">' + "the description" + "</span><br>";
    }
  }
};

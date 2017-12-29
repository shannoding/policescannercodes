var inp = document.querySelector("input");
var allCodes = document.querySelectorAll("#codes .code");
var allDesc = document.querySelectorAll("#codes .desc");
var resultsBox = document.querySelector("#results .list");
var pinnedBox = document.querySelector("#pinned .list");


// gets the codes from the html. only run during init
var codeDescList = {
  cleanCodesList: [],
  descList: [],
  cleanCodesAndDescList: [],
  codesList: [],
  codesAndDescList: [],
  getCleanCodesList: function() {
    cleanCodesList = [];
    for (var i = 0; i < allCodes.length; i++) {
      var eachCode = allCodes[i].textContent.replace(/[^a-z0-9]/gi, "");
      this.cleanCodesList.push({
        index: i,
        code: eachCode
      });
    }
    return this.cleanCodesList;
  },
  getCodesList: function() {
    this.codesList = [];
    for (var i = 0; i < allCodes.length; i++) {
      var eachCode = allCodes[i].textContent;
      this.codesList.push({
        index: i,
        code: eachCode
      });
    }
    return this.codesList;
  },
  getDescList: function() {
    this.descList = [];
    for (var i = 0; i < allCodes.length; i++) {
      var eachDesc = allDesc[i].textContent;
      this.descList.push({
        index: i,
        desc: eachDesc
      });
    }
    return this.descList;
  },
  getCleanCodesAndDescList: function() {
    this.cleanCodesAndDescList = [];
    this.getCleanCodesList();
    this.getDescList();
    for (var i = 0; i < allCodes.length; i++) {
      var eachCode = this.cleanCodesList[i].code.toUpperCase();
      var eachDesc = this.descList[i].desc;
      this.cleanCodesAndDescList.push({
        index: i,
        code: eachCode,
        desc: eachDesc
      });
    }
    return this.cleanCodesAndDescList;
  },
  getCodesAndDescList: function() {
    this.codesAndDescList = [];
    this.getCodesList();
    this.getDescList();
    for (var i = 0; i < allCodes.length; i++) {
      var eachCode = this.codesList[i].code;
      var eachDesc = this.descList[i].desc;
      this.codesAndDescList.push({
        index: i,
        code: eachCode,
        desc: eachDesc
      });
    }
    return this.codesAndDescList;
  }
};

init();

// fills the full array of objects with all codes
function init() {
  codeDescList.cleanCodesList = codeDescList.getCleanCodesList();
  codeDescList.descList = codeDescList.getDescList();
  codeDescList.cleanCodesAndDescList = codeDescList.getCleanCodesAndDescList();
  codeDescList.codesList = codeDescList.getCodesList();
  codeDescList.codesAndDescList = codeDescList.getCodesAndDescList();
}



var codeSearch = {
  resultArray: [],
  indexArray: [],
  input: "",
  findInput: function() {
    var co = inp.value.trim();
    co = co.replace(/[^a-z0-9]/gi, "").toUpperCase();
    this.input = co;
    console.log("INPUT IS " + this.input);
    return co;
  },
  getResultArray: function() {
    this.input = this.findInput();
    this.resultArray = [];
    if (this.input === "") {
      return this.resultArray;
    }
    codeDescList.cleanCodesAndDescList.forEach(function(element) {
      var eachCode = element.code;
      console.log(codeSearch.input);
      if (eachCode.includes(codeSearch.input)) {
        console.log(element);
        var eachDesc = element.desc;
        var i = element.index;
        codeSearch.resultArray.push({
          index: i,
          code: eachCode,
          desc: eachDesc
        });
      }
    });
    return this.resultArray;
  },
  showResults: function() {
    var rArray = this.getResultArray();
    resultsBox.innerHTML = "";
    if (rArray.length === 0) {
      resultsBox.innerHTML = "<p>no results found</p>";
    }

    rArray.forEach(function(element) {
      if (pin.indexOf(element) === -1) {
        resultsBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut" id="r' + element.index + '" onclick="pin.add(this)">pin</button></span>' + codeDescList.codesAndDescList[element.index].code + '</span>     <span class="descDisplay">' + element.desc + "</span><br>";
      }
      else {
        resultsBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut pinnedButton" id="r' + element.index + '" onclick="pin.add(this)">pin</button></span>' + codeDescList.codesAndDescList[element.index].code + '</span>     <span class="descDisplay">' + element.desc + "</span><br>";
      }
    });
  }
};


var pin = {
  pinnedList: [],
  indexOf: function(e) {
    for (var i = 0; i < this.pinnedList.length; i++) {
      if (this.pinnedList[i].index === e.index) {
        return i;
      }
    }
    return -1;
  },
  add: function(button) {
    var i = button.id.substring(1);
    if (this.indexOf(codeDescList.codesAndDescList[i]) !== -1) {
      return;
    }
    this.pinnedList.push(codeDescList.codesAndDescList[i]);
    button.classList.add("pinnedButton");
    console.log(this.indexOf(codeDescList.codesAndDescList[i]));
    this.showPinned();
  },
  remove: function(button) {
    var i = button.id.substring(1);
    var j = this.indexOf(codeDescList.codesAndDescList[i]);
    this.pinnedList.splice(j, 1);
    this.showPinned();
    codeSearch.showResults();
  },
  showPinned: function() {
    pinnedBox.innerHTML = "";
    this.pinnedList.forEach(function(element) {
      pinnedBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut" id="r' + element.index + '" onclick="pin.remove(this)">remove</button></span>' + codeDescList.codesAndDescList[element.index].code + '</span>     <span class="descDisplay">' + element.desc + "</span><br>";
    });
  }
}

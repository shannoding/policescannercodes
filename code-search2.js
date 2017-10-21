var inp = document.querySelector("input");
var allCodes = document.querySelectorAll("#codes .code");
var allDesc = document.querySelectorAll("#codes .desc");
var resultsBox = document.querySelector("#results .list");
var codeDescList = {
  cleanCodesList: [],
  descList: [],
  cleanCodesAndDescList: [],
  codesList: [],
  codesAndDescList: [],
  getCleanCodesList: function() {
    this.cleanCodesList = [];
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
      var eachCode = this.cleanCodesList[i].code;
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


codeDescList.cleanCodesList = codeDescList.getCleanCodesList();
codeDescList.descList = codeDescList.getDescList();
codeDescList.cleanCodesAndDescList = codeDescList.getCleanCodesAndDescList();
codeDescList.codesList = codeDescList.getCodesList();
codeDescList.codesAndDescList = codeDescList.getCodesAndDescList();




var codeSearch = {
  indexArray: [],
  input: "",
  findInput: function() {
    var co = inp.value.trim();
    co = co.replace(/[^a-z0-9]/gi, "").toUpperCase();
    return co;
  },
  getSearchIndexArray: function()  { //call this to get all indexes from search
    this.input = this.findInput();
    this.indexArray = [];
    if (this.input === "") {
      return this.indexArray;
    }
    for (var i = 0; i < codeDescList.getCleanCodesList().length; i++) {
      var eachCode = codeDescList.cleanCodesList[i].code;
      console.log(eachCode);
      if (eachCode.includes(this.input)) {
          this.indexArray.push(i);
        }
    }
    return this.indexArray;
    // have an array of all input matching indexes
  }
};

var showResults = {
  searchResults: function() {
    var descArray = codeSearch.getSearchIndexArray();
    resultsBox.innerHTML = "";
    if (descArray.length === 0) {
      resultsBox.innerHTML = "<p>no results found</p>";
    }
    var codesAndDescs = codeDescList.codesAndDescList;

    descArray.forEach(function(element) {
      console.log("codesAndDesc is " + codeDescList.codesList[element].code);

      // if (pin.check(allCodes[element].textContent.trim())) {
      //   resultsBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut pinnedButton">pin</button></span>' + allCodes[element].textContent + '</span>     <span class="descDisplay">' + allDesc[element].textContent + "</span><br>";
      // }

        resultsBox.innerHTML += '<span class="codeDisplay"><span><button class="but pinBut" onclick="pin.add(this)">pin</button></span>' + codesAndDescs[element].code + '</span>     <span class="descDisplay">' + codesAndDescs[element].desc + "</span><br>";
    });
  }
};

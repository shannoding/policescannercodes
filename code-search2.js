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
    codesList = [];
    for (var i = 0; i < allCodes.length; i++) {
      var eachCode = allCodes[i];
      this.codesList.push({
        index: i,
        code: eachCode
      });
    }
    return this.codesList;
  },
  getDescList: function() {
    descList = [];
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
    cleanCodesAndDescList = [];
    this.getCleanCodesList();
    this.getDescList();
    for (var i = 0; i < allCodes.length; i++) {
      var eachCode = this.cleanCodesList[i];
      var eachDesc = this.descList[i];
      this.cleanCodesAndDescList.push({
        index: i,
        code: eachCode,
        desc: eachDesc
      });
    }
    return this.cleanCodesAndDescList;
  },
  getCodesAndDescList: function() {
    codesAndDescList = [];
    this.getCodesList();
    this.getDescList();
    for (var i = 0; i < allCodes.length; i++) {
      var eachCode = this.codesList[i];
      var eachDesc = this.descList[i];
      this.codesAndDescList.push({
        index: i,
        code: eachCode,
        desc: eachDesc
      });
    }
    return this.cleanCodesAndDescList;
  }
};

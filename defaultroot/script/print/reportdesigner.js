var total = 1;
var current = 1;
var unique = null;
var callName = null;

function call_mouseOver() {
  event.srcElement.style.color="#FBDD64";
}

function call_mouseOut() {
  event.srcElement.style.color = "white";
}

function psearch(){
  var pNames = new Array();
  var pValues = new Array();
  pNames[0] = "REPO_ID";
  pValues[0] = top.opener.pk;
  pNames[1] = "params";
  pValues[1] = top.mainFrame.getPageData();
  var com = getCommunity();
  if (com != null){
    doRequest("getreportdata","all",pNames,pValues,"psearch_R");
  }
}

function psearch_R(result,totalPage,uniqueID){
  total = totalPage;
  if (total > 1){
    unique = uniqueID;
  }
  top.mainFrame.document.getElementById("dataArea").innerHTML = result.innerHTML;
  if (top.mainFrame.document.getElementById("gridBodyTable") != null){
    top.mainFrame.colResize();
    top.mainFrame.data_fillTableColor();
  }
}

function pprint(){
  top.mainFrame.print();
}

function pfirst(){
  if (current == 1) return;
  callName = "first";
  var names = new Array();
  var values = new Array();
  names[0] = "pagename";
  values[0] = unique;
  var com = getCommunity();
  if (com != null)
    com.doRequest("first", "AS_TEMP", names, values, "resetData");
}

function pprior(){
  if (current == 1) return;
  callName = "prior";
  var names = new Array();
  var values = new Array();
  names[0] = "pagename";
  values[0] = unique;
  var com = getCommunity();
  if (com != null)
    com.doRequest("prior", "AS_TEMP", names, values, "resetData");
}

function pnext(){
  if (current == total) return;
  callName = "next";
  var names = new Array();
  var values = new Array();
  names[0] = "pagename";
  values[0] = unique;
  var com = getCommunity();
  if (com != null)
    com.doRequest("next", "AS_TEMP", names, values, "resetData");
}

function plast(){
  if (current == total) return;
  callName = "last";
  var names = new Array();
  var values = new Array();
  names[0] = "pagename";
  values[0] = unique;
  var com = getCommunity();
  if (com != null)
    com.doRequest("last", "AS_TEMP", names, values, "resetData");
}

function resetData(result){
  if (result.getAttribute("success") == "false"){
    alert(result.innerHTML);
  }else{
    if (callName == "first"){
      current = 1;
    }else if (callName == "prior"){
      current = current -1;
    }else if (callName == "next"){
      current = current + 1;
    }else{
      current = total;
    }
    top.mainFrame.addTableRows(result);
  }
}

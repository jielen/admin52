//$Id: datagrid.js,v 1.28 2006/06/13 08:57:31 leidaohong Exp $
//拖动表格宽度变量
var sign=false;
var begin_x = 0;
var td = null;
var originColor = null;
var initialized = false;
var imgPath = "/style/img/main/";
var tableChanged = null;
//var row_color1 = "#E1E1E1";
//var row_color2 = "#F8F8F8";
var row_color1 = "#DBDFE8";
var row_color2 = "#F7F8FA";
var rowNum = null;
var initColor = null;

var hideFields = new Array();
var lockFields = new Array();

//移动滚动条
function data_body_Scroll(tableName)
{
	//alert("data_body_Scroll();");
	var head = document.getElementById(tableName + "HeadTable");
 	var tableWidth = head.clientWidth;
	var scrollWidth = getScrollWidth(tableName);
	var leftWidth = scrollWidth;

  //不锁定者,快速滚动;leidh; 20040715;
	if (_AllowGridLock== false || head.rows.length!= 1)
	{
  	head.style.left = -leftWidth;
  	return;
	}

	var colInfo = document.getElementById(tableName + "ColTable").rows[0];
	for (var i=1,j=colInfo.cells.length - 1; i<j; i++)
	{
		if (colInfo.cells[i].locked == "true"){ continue; }

		var fieldName = colInfo.cells[i].field;
    var vjTD = document.getElementById(tableName + "_" + fieldName + "Cell");
		if (vjTD.U_Hidden== true) continue;

		if (scrollWidth > 0){
			scrollWidth -= getColWidth(tableName,fieldName);
			scrollCol(tableName,fieldName,true);
		}else{
			scrollCol(tableName,fieldName,false);
		}
	}

	var hfill = document.getElementById(tableName + "_HFillCell");

	//alert(head.offsetWidth+ "|"+ tableWidth);
	/*
	//var hfill = document.getElementById(tableName + "_HFillCell");
  var vjTFillTD= document.getElementById(tableName + "_" + "TFill" + "Cell");
  var viTFillTDWidth= vjTFillTD.offsetWidth+ (hfill.offsetWidth- leftWidth);
  vjTFillTD.style.width= (viTFillTDWidth> 0)? viTFillTDWidth: 0; //leidh;20040402;
  //*/

  //alert(hfill.offsetWidth+ "|"+ leftWidth);
	if (head.offsetWidth < tableWidth)
	{
	  head.width = tableWidth + 2 ;
		hfill.style.width = leftWidth;
	}
	else
	{
		hfill.style.width = leftWidth;
	  head.width = tableWidth + 2 ;
	}

	var gridBodyTable = document.getElementById(tableName + "BodyTable");
  gridBodyTable.style.width = tableWidth + 2;
  colResize(tableName);
	head.style.left = -leftWidth;
}

function scrollCol(tableName,fieldName,scrollIn)
{
	var head = document.getElementById(tableName + "HeadTable");
	if (_AllowGridLock== false || head.rows.length!= 1) return false;

	var cell = document.getElementById(tableName + fieldName + "Field");
	if (cell.app == "" + scrollIn){ return false; }

	var vkRet= false;
	var visible= (scrollIn)? false: true;

  var doc = document.getElementById(tableName + "_" + fieldName + "Cell");
  var viEffectWidth= doc.offsetWidth;

	if (scrollIn){
		cell.originalWidth = getColWidth(tableName,fieldName);
		vkRet= setGridFieldVisible(tableName,fieldName,visible,true);
	}else{
		vkRet= setGridFieldVisible(tableName,fieldName,visible,true);
	}

	if (viEffectWidth== 0) viEffectWidth= doc.offsetWidth;
	//alert(viEffectWidth);

	//隐藏(实现锁定)后,对 HFill 和 TFill 进行处理;
	//*
	if (vkRet)
	{
  	var scrollWidth = getScrollWidth(tableName);
	  var leftWidth = scrollWidth;

	  var viAdjustWidth= 0;
	  if(visible)
	  {
	  	viAdjustWidth= 0- viEffectWidth;
	  }
	  else
	  {
	  	viAdjustWidth= viEffectWidth;
	  }

		//alert(viAdjustWidth);
	  var vjGridTBody= null;
	  var vjRow= null;
	  var vjRowLastTD= null;
	  var vjDataTD= null;
    var viDataTDIndex= parseInt(doc.colno)+ getColIndexOffset(tableName);

	  var vjHFillTD= document.getElementById(tableName + "_" + "HFill" + "Cell");
	  var vjTFillTD= document.getElementById(tableName + "_" + "TFill" + "Cell");
	  var viHFillTDWidth= vjHFillTD.offsetWidth+ viAdjustWidth;
	  //alert(viHFillTDWidth+ "|"+ viAdjustWidth);
	  vjHFillTD.style.width= (viHFillTDWidth> 0)? viHFillTDWidth: 0;
  }
  //*/

	cell.app = "" + scrollIn;
}

function getScrollWidth(tableName){
  var gridBody = document.getElementById(tableName + "Body");
	return gridBody.scrollLeft;
}

function getColWidth(tableName,fieldName){
	if (document.getElementById(tableName + fieldName + "Field").app == "true"){
		return document.getElementById(tableName + fieldName + "Field").originalWidth;
	}else{
		return document.getElementById(tableName + "_" + fieldName + "Cell").clientWidth;
	}
}

function data_fillTableColor(tablename){
  var grid = document.getElementById(tablename + "BodyTable");
  if(grid == null)
    return;
  var head = document.getElementById(tablename + "HeadTable");
  var colIndex = new Array();//得到需要加超级连接的列
  for(var k = 0; k < head.rows[0].cells.length; k++){
    var fieldname = head.rows[0].cells[k].getAttribute("fieldname");
    if(eval("typeof " + fieldname + "_Click ==\"function\"")){
      colIndex[colIndex.length] = k;
    }
  }
  var qian = false;
  //设置表格的颜色
  for (var i=0,j=grid.rows.length; i<j; i++){
    if (qian){
      grid.rows[i].style.backgroundColor = row_color1;
      qian = false;
    }else{
      grid.rows[i].style.backgroundColor = row_color2;
      qian = true;
    }
    //加超级连接的下画线和手型鼠标
    for(var k = 0; k < colIndex.length; k++){
      grid.rows[i].cells[colIndex[k]].style.textDecoration = "underline";
      grid.rows[i].cells[colIndex[k]].style.cursor = "hand";
    }
  }
}

function data_sortTable(colIndex)
{
	//alert("data_sortTable();");
  var preSortDir = event.srcElement.getAttribute("sortdir");
  var isUp = true;
  if (preSortDir == "0")
  {
    event.srcElement.setAttribute("sortdir","1");
    isUp = true;
  }
  else
  {
    event.srcElement.setAttribute("sortdir","0");
    isUp = false;
  }

  var tablename = areaId;
  //报表 <table class="hideArea" id="A3indexContrastEditTable">; leidh;20040604;
  //if(isTab == true) tablename += "_" + areaTabName;
  if(isTab == true) tablename += areaTabName;

  var vjEditTable = document.getElementById(tablename + "EditTable");
  var vsFieldName= vjEditTable.firstChild.firstChild.childNodes[colIndex].fieldname;
  setSortImg(tablename, vsFieldName, isUp);
  //setSortImg(tablename, colIndex,isUp);

  var gridBodyTable = document.getElementById(tablename + "BodyTable");
	if (gridBodyTable.rows.length < 2) return;
  var fieldName = event.srcElement.getAttribute("field");
  var fieldType = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("type");
  var values = new Array();
  var originValue = null;
	for (var i=0,j=gridBodyTable.rows.length; i < j; i++) {
    originValue = gridBodyTable.rows[i].cells(colIndex).innerHTML;
		values[i] = getCompareValue(fieldType,originValue);
	}
  var tmp = null;
  for (var i=1,j=values.length; i<j; i++){
    tmp = values[i];
    for (var m=0; m<i; m++){
      if (isUp){
        if (tmp < values[m]){
          gridBodyTable.moveRow(i,m);
          for (var n = i; n>m; n--){
            values[n] = values[n-1];
          }
          values[m] = tmp;
          break;
        }
      }else{
        if (tmp > values[m]){
          gridBodyTable.moveRow(i,m);
          for (var n = i; n>m; n--){
            values[n] = values[n-1];
          }
          values[m] = tmp;
          break;
        }
      }
    }
  }
	data_fillTableColor(tablename);
  colResize(tablename);
}

function getCompareValue(type,cValue) {
  if (type.toUpperCase() == "N"){
    var myNum = parseFloat(cValue);
    if (isNaN(myNum)){
      return 0;
    }else{
      return myNum;
    }
  }else{
    return cValue.toUpperCase();
  }
}
function data_getGridFieldName(tableName){
  var td = event.srcElement;

  //正确定位TD的列序号;leidh;20040607;
  //var cellindex = td.cellIndex;
  var vjTR= td.parentNode;
  var cellindex = -1;
  for (var i= 0; i< vjTR.childNodes.length; i++)
  {
    var vjTD= vjTR.childNodes[i];
    if (vjTD== td)
    {
      cellindex= i;
      break;
    }
  }

  var table = document.getElementById(tableName + "EditTable");
  var edit = table.rows[0].cells[cellindex];
  var fieldname = edit.getAttribute("fieldname");
  return fieldname;
  }

function data_gridRowClick(tablename){
  //var tablename = areaId;
  //控制取数页面选定行背景色，wtm，20041126
  if (rowNum){
    rowNum.style.color = "";
    rowNum.style.backgroundColor = initColor;
  }
  if (getCurrentRow(tablename)){
    rowNum = getCurrentRow(tablename);
    initColor = rowNum.style.backgroundColor;
    rowNum.style.backgroundColor = "";
    rowNum.style.color = "white";
    rowNum.style.backgroundColor = "#0A246A";
  }
  if(isTab == true)
    tablename += areaTabName;
  if(eval("typeof " + tablename + "_Click ==\"function\"")){
    eval(tablename + "_Click()");
  }
  if(document.getElementById(tablename + "Container").getAttribute("readonly") == "true") return;
  if (event.srcElement.tagName.toLowerCase() != "td") return;
  if (event.srcElement.cellIndex == 0) return;
  if (event.srcElement.getAttribute("read")) return;
  var tr = event.srcElement.parentNode;
  var head = document.getElementById(tablename + "HeadTable");
  var colIndex = 0;
  var rowIndex = tr.rowIndex;
  var curValue = event.srcElement.innerHTML;
  var bodyTable = document.getElementById(tablename + "BodyTable");
  for (var i=1,j=bodyTable.rows[rowIndex].cells.length; i<j; i++){
    if (event.srcElement == bodyTable.rows[rowIndex].cells[i]){
      colIndex = i;
      break;
    }
  }
  if(eval("typeof " + fieldname + "_Click ==\"function\"")){
    eval(fieldname + "_Click()");
  }
  uneditGrid(tablename);
  head.setAttribute("editing","y");
  head.setAttribute("row",rowIndex);
  head.setAttribute("col",colIndex);
  var editTable = document.getElementById(tablename + "EditTable");
  var fieldname = editTable.rows[0].cells[colIndex].getAttribute("fieldname");
  head.setAttribute("editingfield",fieldname);
  //先把当前值设置到input框中
  setField(fieldname,curValue,tablename,false,true);
  event.srcElement.innerHTML = editTable.rows[0].cells[colIndex].innerHTML;
  editTable.rows[0].cells[colIndex].innerHTML = "";
}

function getReportField(Name){
  var row = getReportCurrentRow();
  var head = document.getElementById("head");
  var colIndex = 0;
  for(var k = 0; k < head.rows[0].cells.length; k++){
    var fieldname = head.rows[0].cells[k].getAttribute("fieldname");
    if(fieldname == Name){
      colIndex = k;
    }
  }
  return row.cells[colIndex].innerHTML;
}

function getDBDataToPage(ruleID, names, values){
  var d = new Date();
  var str = "<entity name=\"kkk\"><field name=\"user\" value=\"sa\" /></entity>";
  win_select = showModalDialog("Proxy?function=getdbdatatopage&ruleid="
      + ruleID + "&param=" + str
      + "&d=" + d.getMilliseconds(),null,"resizable:yes;help:no;status:no");
  if(win_select){
    return win_select;
  }
}

function Ok_Click(){
  var result = getSelectedRows();
  var head = document.getElementById("head");
  var fieldnames = new Array();
  for(var k = 2; k < head.rows[0].cells.length; k++){
    var fieldname = head.rows[0].cells[k].getAttribute("fieldname");
    fieldnames[fieldnames.length] = fieldname;
  }
  var resultTmp = "<delta>";
  for(i = 0; i < result.length; i++){
    resultTmp += "<entity>";
    for(var k = 2; k < result[i].cells.length; k++){
      resultTmp += "<filed name=\"" + fieldnames[k - 2] + "\" value=\"" +
                result[i].cells[k].innerHTML + "\"/>"
    }
    resultTmp += "</entity>";
  }
  resultTmp += "</delta>";
  returnValue = resultTmp;
  close();
}

function getReportCurrentRow(){
  var tr = event.srcElement.parentNode;
  var rowIndex = tr.rowIndex;
  var gridBodyTable = document.getElementById("gridBodyTable");
  return gridBodyTable.rows[rowIndex];
}

function deleteTableRows(){
  for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
    gridBodyTable.deleteRow(0);
  }
}

function setSpeFields(){
  hideFields = new Array();
  lockFields = new Array();
  var hideF = 0;
  var lockF = 0;
  var temp = document.getElementById(areaId + "EditTable").firstChild.firstChild.childNodes;
  for(var x = 0, y = temp.length; x < y; x++){
    var item = temp.item(x).fieldname;
    if(item == "HFill" || item == "TFill" || item == "CHK"){
      continue;
    }
    if(document.getElementById(areaId + "_" + item + "Cell").U_Hidden){
      hideFields[hideF] = item;
      hideF++;
    }
  }
  var colInfo = document.getElementById(areaId + "ColTable").rows[0];
  for (var i=1,j=colInfo.cells.length - 1; i<j; i++){
    if (colInfo.cells[i].locked == "true"){
      lockFields[lockF] = colInfo.cells[i].field;
      lockF++;
    }
  }
}

function setPageGrid(){
  for(var x = 0, y = hideFields.length; x < y; x++){
    var item = hideFields[x];
    setGridFieldVisible(areaId, item, false, false);
    document.getElementById(areaId + "_" + item + "Cell").U_Hidden = true;
  }
  var colInfo = document.getElementById(areaId + "ColTable").rows[0];
  for (var i=1,j=colInfo.cells.length - 1; i<j; i++){
    for (var i1=0,j1=lockFields.length; i1<j1; i1++){
      if (colInfo.cells[i].field == lockFields[i1]){
        colInfo.cells[i].locked = "true";
        break;
      }
    }
  }
}

function clearSpeFields(){
  hideFields = new Array();
  lockFields = new Array();
}

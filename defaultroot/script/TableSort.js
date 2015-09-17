//$Id: TableSort.js,v 1.4 2008/06/26 15:04:25 liuxiaoyong Exp $
//拖动表格宽度变量
var sign=false;
var begin_x = 0;
var td = null;
var originColor = null;
var initialized = false;
var imgPath = "/style/img/main/";
//var row_color1 = "#E1E1E1";
//var row_color2 = "#F8F8F8";
var row_color1 = "#DBDFE8";
var row_color2 = "#F7F8FA";

function mousedown() {
  if(!sign){
    window.event.cancelBubble=true;
    begin_x =  window.event.clientX;
    td = event.srcElement.parentNode.parentNode.parentNode.parentNode;
    slide.style.left= window.event.clientX;
    slide.style.height = grid.clientHeight;
    slide.style.top = grid.offsetTop + 2;
    slide.style.visibility="visible";
    sign=true;
  }
}

function mousemove() {
  if(sign){
    slide.style.left= window.event.clientX;
  }
}

function mouseup() {
  if(sign){
    var x1 = window.event.clientX - begin_x;

    if ((td.clientWidth + x1) < 20){
			x1 = 0;
			return;
    }
		if (x1 > 0){
			head.style.width = head.clientWidth + x1;
		}else{
			td.firstChild.style.width = td.firstChild.clientWidth + x1;
		}

		if (td.clientWidth + x1 >= 20){
    	td.style.width = td.clientWidth + x1;
    }

		if (x1 < 0){
			head.style.width = head.clientWidth + x1;
		}else{
			td.firstChild.style.width = td.firstChild.clientWidth + x1;
		}
		var ele = document.getElementById("entityMeta");
		var tname = ele.getAttribute("tableName");
		var fieldname = td.firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute("field");
    var temp = parseInt(document.getElementById(tname + "_" + fieldname + "Cell").offsetWidth);
		var entityMeta = document.getElementById("entityMeta");
		var entityName = entityMeta.entityName;
		if(isException == false){
			setFieldWidth(entityName,tname,fieldname,temp);
		}
    begin_x=0;
    slide.style.visibility="hidden";
    colResize();
    document.selection.clear();
    sign=false;

		gridBodyTable.style.width= head.offsetWidth;//宽度一致;leidh;20040412;
  }
}

function body_Scroll1() {//移动滚动条
  head.style.left = -gridBody.scrollLeft;
}

function color_bh(){//改变表格颜色
  var tr = event.srcElement.parentNode;
  originColor = tr.style.backgroundColor;
  tr.style.backgroundColor = "highlight";
  tr.style.color = "highlighttext";
}

function color_re(){//恢复颜色
  var tr = event.srcElement.parentNode;
  tr.style.backgroundColor = originColor;
  tr.style.color = "black";
}

function fillTableColor(){
  return; //leidh;20060103;
  var grid = document.getElementById("gridBodyTable");
  var qian = false;
  for (var i=0,j=grid.rows.length; i<j; i++){
    if (qian){
      grid.rows[i].style.backgroundColor = row_color1;
      qian = false;
    }else{
      grid.rows[i].style.backgroundColor = row_color2;
      qian = true;
    }
  }
}

function colResize(){
  gridBodyTable.style.width = head.clientWidth;
  if (gridBodyTable.rows.length > 0){
    if(gridBodyTable.rows[0].cells.length > 1){
      for (var i=0,j = head.rows[0].cells.length; i<j; i++){
      	if (head.rows[0].cells[i].style.display != "none")
      	{
      		if (gridBodyTable.rows[0].cells[i]!= null)
      		{
       		  gridBodyTable.rows[0].cells[i].style.width = head.rows[0].cells[i].offsetWidth;
       		}
       	}
      }
    }
    //修改字段内容较多,所占宽宽度较大，拖动滚动条使宽带变窄。wtm，20041108
    for (var ro=0,tl=gridBodyTable.rows.length ;ro<tl;ro++){
       gridBodyTable.rows[ro].height = gridBodyTable.rows[ro].clientHeight;
    }
    gridBody.style.top = head.clientHeight;
  }
  head.style.left = -gridBody.scrollLeft;
}

function setInitColSize(){
  gridBodyTable.style.width = head.clientWidth;
  if (gridBodyTable.rows.length > 0){
    if(gridBodyTable.rows[0].cells.length > 1){
      for (var i=1,j = head.rows[0].cells.length - 1; i<j; i++){
      	var ele = document.getElementById("entityMeta");
      	var tablename = ele.getAttribute("tableName");
				var td = head.rows[0].cells[i];
				var fieldName = null;
				if (i != 1){
        	 fieldName = td.firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute("field");
  			}
				var entityMeta = document.getElementById("entityMeta");
				var entityName = entityMeta.entityName;
				var width = 0;
				if(isException == false){
        	width = getFieldWidth(entityName,tablename,fieldName);
				}
				if ((width) && (!sign)){
      		if (i != 1){
						td.firstChild.style.width = width - 2;
						td.style.width = width;
						gridBodyTable.rows[0].cells[i].style.width = td.offsetWidth;
      		}
        }
      	else{
        	gridBodyTable.rows[0].cells[i].style.width = head.rows[0].cells[i].offsetWidth;
  			}
        gridBodyTable.rows[0].cells[i].style.visibility = head.rows[0].cells[i].style.visibility;
      }
    }
    gridBody.style.top = head.clientHeight;
    gridBody.style.height = Math.abs(grid.clientHeight-head.clientHeight);
  }
	else{
      for (var i=1,j = head.rows[0].cells.length - 1; i<j; i++){
      	var ele = document.getElementById("entityMeta");
      	var tablename = ele.getAttribute("tableName");
				var td = head.rows[0].cells[i];
				var fieldName = null;
				if (i != 1){
        	 fieldName = td.firstChild.firstChild.firstChild.firstChild.firstChild.getAttribute("field");
  			}
				var entityMeta = document.getElementById("entityMeta");
				var entityName = entityMeta.entityName;
				var width = 0;
				if(isException == false){
        	width = getFieldWidth(entityName,tablename,fieldName);
				}
				if ((width) && (!sign)){
      		if (i != 1){
						td.firstChild.style.width = width - 2;
						td.style.width = width;
      		}
        }
      }
    gridBody.style.top = head.clientHeight;
    gridBody.style.height = Math.abs(grid.clientHeight-head.clientHeight);
	}
  head.style.left = -gridBody.scrollLeft;
}
function pageResize(width){
  if(width == undefined){
    if(entityMeta.getAttribute("dateField") != "null" &&
       entityMeta.getAttribute("valsetField") != "null"){
      width = 130;
    }else{
      width = 110;
    }
  }
  grid.style.height = Math.abs(document.body.clientHeight - width);
  gridBody.style.width = Math.abs(grid.clientWidth);
	setInitColSize();
  colResize();
}
//设置页面相应键盘事件
function setPageEvent(){
	//alert("setPageEvent");
	//window.onkeypress = shortCutDispose;
	//window.document.onkeypress = shortCutDispose;
	//window.onkeydown = shortCutDispose;
	//window.document.onkeykown = shortCutDispose;
	window.onkeyup = shortCutDispose;
	window.document.onkeyup = shortCutDispose;
}
//快捷键响应事件
function shortCutDispose(){
  var key = event.keyCode;
  if(key == 123){
    listSelectedRowTotal();
    return;
  }
	//alert("shortCutDispose");
	var functions = new Array();
	functions = getPageFunctions();
	if (functions != null){
	for (var n = 0; n < functions.length; n++){
	var funcName = functions[n];
	var funcID = funcName + "ID";
	var element = document.getElementById(funcID);
	var funID = element.getAttribute("name");
	var shortCutKey = element.getAttribute("shortCutKey");
	var isCtrl = element.getAttribute("isCtrl");
	var isShift = element.getAttribute("isShift");
	var isAlt = element.getAttribute("isAlt");
	var key = event.keyCode;
  	var keyStr = String.fromCharCode(key);
  	//keyStr = String.toUpperCase(keyStr);
  	//alert("keyStr:" + keyStr);
	if ((event.shiftKey) && (event.ctrlKey) && (event.altKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "y") && (isAlt == "y")){
			if (eval("typeof listPage_Call_Click==\"function\""))
				listPage_Call_Click(funID);
		}
	}
	else if ((event.shiftKey) && (event.altKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "y") && (isAlt == "y")){
			if (eval("typeof listPage_Call_Click==\"function\""))
				listPage_Call_Click(funID);
		}
	}
	else if ((event.shiftKey) && (event.ctrlKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "y") && (isAlt == "n")){
			if (eval("typeof listPage_Call_Click==\"function\""))
				listPage_Call_Click(funID);
		}
	}
	else if ((event.ctrlKey) && (event.altKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "n") && (isAlt == "y")){
			if (eval("typeof listPage_Call_Click==\"function\""))
				listPage_Call_Click(funID);
		}
	}
	else if (event.ctrlKey){
		if ((keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "n") && (isAlt == "n")){
			if (eval("typeof listPage_Call_Click==\"function\""))
				listPage_Call_Click(funID);
		}
	}
  	else if (event.shiftKey){
		if ((keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "y") && (isAlt == "n")){
			if (eval("typeof listPage_Call_Click==\"function\""))
				listPage_Call_Click(funID);
		}
  	}
	else if (event.altKey){
		if ((keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "n") && (isAlt == "y")){
			if (eval("typeof listPage_Call_Click==\"function\""))
				listPage_Call_Click(funID);
		}
  	}
	}//for循环
	}
	if ((key == 33)){
			priorpage();
		}
		else if ((key == 34)){
			nextpage();
		}
		else if ((key == 36)){
			firstpage();
		}
		else if ((key == 35)){
			lastpage();
		}
}
function getPageFunctions(){
	var element = document.getElementById("functionBarID");
	//alert(element.outerHTML);
	var functions =  new Array();
	if (element != null){
		var elementChild = element.childNodes;
		for (var i = 0; i < elementChild.length; i+=3){
			functions[functions.length] = elementChild.item(i).getAttribute("name");
			//lert(elementChild.item(i).getAttribute("id"));
		}
		return functions;
	}
	return null;
}
function initPage(width){
  if (window._sDefSearchTextFromArg!= null && window._sDefSearchTextFromArg!= ""){
    _sDefSearchText= _sDefSearchTextFromArg;
    matchValue.value= _sDefSearchText;
  }
  
	setPageEvent();
  pageResize(width);
  fillTableColor();
  initialTotalPage();
  ////handleWFListPage();//初始化时处理工作流的列表页面

  initialized = true;

  if (typeof init == "function"){
    init();
  }
  if (typeof hideFieldsAsForeign == "function"){
    hideFieldsAsForeign();
  }

}

function windowResize(marginHeight){
  if (initialized){
    if (marginHeight!= null 
        && parseInt(document.body.clientHeight)- parseInt(marginHeight)< 50){
      return;
    }
    gridBody.scrollLeft= 0;//改变尺寸会造成表格页面混乱;leidh;20040603;
    pageResize(marginHeight);
  }
}

function selectAll() {
  var isSelected = event.srcElement.checked;
  // 20040816 wantm 全选时应先清除已选中的关键字
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    deleteSelectedVal(isSelected,gridBodyTable.rows[i].cells[1].firstChild);
  }
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    gridBodyTable.rows[i].cells[1].firstChild.checked = isSelected;
		if(isSelected){
			insertSelectedVal(isSelected,gridBodyTable.rows[i].cells[1].firstChild);
		}
  }
}

function deleteSelectedVal(curSelected,selectedEle){
	var primaryFields = listPage_getPrimaryFields();
  var primaryFieldsNo = primaryFields[0];
	var primaryFieldsName = primaryFields[1];
	var primaryFieldsType = primaryFields[2];
	var keyVal = null;
  for (var i=0;i<gridBodyTable.rows.length;i++){
  	if(gridBodyTable.rows[i].firstChild.nextSibling.firstChild == selectedEle){
			for( var m=0; m<selectedRowsVal.length; m++){
        var equal = true;
				for(var j=0;j<primaryFieldsNo.length; j++){
          if(primaryFieldsType[j].toLowerCase() == "valueset"){
        		var vVal = doubleApos(gridBodyTable.rows[i].cells[primaryFieldsNo[j]+COLUMN_OFFSET].firstChild.value);
        		keyVal = vVal;
        		var vi = vVal.indexOf(" ");
        		if (vi > -1){
          		vVal = vVal.substring(0,vi);
        		}
           	if(vVal != selectedRowsVal[m][j]){
							equal = false;
							break;
						}
					}else{
						var vVal = gridBodyTable.rows[i].cells[primaryFieldsNo[j]+COLUMN_OFFSET].innerHTML;
						if (vVal!="*") keyVal = vVal;
            if(vVal != selectedRowsVal[m][j]){
							equal = false;
							break;
            }
          }
				}
        if(!equal)
					continue;
        else{
					for(var n=0; n<selectedRowsVal[0].length; n++){
						selectedRowsVal[m][n] = null;


					}
					selectedRowsObj[m] = null;
					/*
					//控制外部实体选择时，全局变量selectedRowsAllVal的删除
					for (var t = 0;t < selectedRowsAllVal.length; t++){
					   for (var y = 0;y < primaryFieldsNo.length; y++){
					  //for (var y = 0;y < selectedRowsAllVal[0].length; y++){
				           if (selectedRowsAllVal[t][y] == keyVal){
				               for(var n = 0; n < selectedRowsAllVal[0].length; n++){
						delete selectedRowsAllVal[t][n];
						//if (t < (selectedRowsAllVal.length-1)){
						//var p=t++;
						//selectedRowsAllVal[t][n]=selectedRowsAllVal[p][n];
						//}
				               }
				           }
				          }

				        }*/
					break;
        }
			}
			break;
 		}
 	}
}

function insertSelectedVal(curSelected,selectedEle){
	var fields = getFields();
  var fieldsNo = fields[0];
	var fieldsName = fields[1];
	var fieldsType = fields[2];
	var fieldsIsPK = fields[3];
	if(curSelected){
		rowValue = new Array();
		rowAllValue = new Array();
  	for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
  		if(gridBodyTable.rows[i].firstChild.nextSibling.firstChild == selectedEle){
				for(var m=0;m<fieldsNo.length; m++){
					if(fieldsType[m].toLowerCase() == "valueset"){
						if(gridBodyTable.rows[i].cells[parseInt(fieldsNo[m])+COLUMN_OFFSET].innerHTML){
//        			var vVal = doubleApos(gridBodyTable.rows[i].cells[parseInt(fieldsNo[m])+COLUMN_OFFSET].innerHTML);
//							var vi = vVal.indexOf(" ");
//        			if (vi > -1){
//          			vVal = vVal.substring(0,vi);
//        			}
        			var vVal = doubleApos(gridBodyTable.rows[i].cells[parseInt(fieldsNo[m])+COLUMN_OFFSET].firstChild.value);
							if(fieldsIsPK[m] == "true"){
								rowValue[rowValue.length] = vVal;
							}
							rowAllValue[rowAllValue.length] = vVal;
						}
						else{
							rowAllValue[rowAllValue.length] = "";
						}
					}
					else{
if(gridBodyTable.rows[i].cells[parseInt(fieldsNo[m])+COLUMN_OFFSET].innerHTML){
							if(fieldsIsPK[m] == "true"){
								rowValue[rowValue.length] = gridBodyTable.rows[i].cells[parseInt(fieldsNo[m])+COLUMN_OFFSET].innerHTML;
							}
			rowAllValue[rowAllValue.length] =	gridBodyTable.rows[i].cells[parseInt(fieldsNo[m])+COLUMN_OFFSET].innerHTML;
						}
          	else{
           rowAllValue[rowAllValue.length] = "";
						}
					}
				}
	selectedRowsObj[selectedRowsObj.length] = gridBodyTable.rows[i].innerHTML;
				break;
			}
  	}
selectedRowsVal[selectedRowsVal.length] = rowValue;
selectedRowsAllVal[selectedRowsAllVal.length] = rowAllValue;
/*
  for (var i=0,j=selectedRowsObj.length; i<j; i++){
   if (gridBodyTable.rows[i].cells[1].firstChild.checked){
     result[result.length] = selectedRowsAllVal[i];
     */
	}
}
function selectPart(){

  event.cancelBubble = true;
  var curSelected = event.srcElement.checked;
	if(curSelected){
		insertSelectedVal(curSelected,event.srcElement);
  }else{
		deleteSelectedVal(curSelected,event.srcElement);
  }
  var same = true;
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    same = gridBodyTable.rows[i].cells[1].firstChild.checked == curSelected;
    if (!same) break;
  }
  if (same){
    head.rows[0].cells[1].firstChild.checked = curSelected;
  }else{
    head.rows[0].cells[1].firstChild.checked = false;
  }
}

function sortTable(colIndex) {
  var preSortDir = event.srcElement.getAttribute("sortdir");
  var isUp = true;
  if (preSortDir == "0"){
    event.srcElement.setAttribute("sortdir","1");
    isUp = true;
  }else{
    event.srcElement.setAttribute("sortdir","0");
    isUp = false;
  }
  setSortImg(colIndex,isUp);
	colIndex++;
	if (gridBodyTable.rows.length < 2) return;
  var fieldName = event.srcElement.getAttribute("field");
  var fieldType = getFieldType(fieldName);
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
	fillTableColor();
  colResize();
}

function setSortImg(sortCol, isUp) {
	var imgs = head.getElementsByTagName("img");
  for (var i=0,j=imgs.length; i<j; i++){
    if (i!=sortCol-1)
      imgs.item(i).setAttribute("src",imgPath+"blank.gif");
    else if (isUp)
      imgs.item(i).setAttribute("src",imgPath+"sortup.gif");
    else
      imgs.item(i).setAttribute("src",imgPath+"sortdown.gif");
  }
}

function getCompareValue(type,cValue) {
  if (type.toUpperCase() == "NUM"){
    var myNum = parseFloat(deleteComma(cValue));
    if (isNaN(myNum)){
      return 0;
    }else{
      return myNum;
    }
  }else{
    return cValue.toUpperCase();
  }
}

function getFieldType(fieldName){
  var fields = entityMeta.childNodes;
  for (var i=0,j=fields.length; i<j; i++){
    if (fields.item(i).getAttribute("name").toUpperCase() == fieldName.toUpperCase()){
      return fields.item(i).getAttribute("type");
    }
  }
}

function gridRowClick(){
	var index = 0;
	if (event.srcElement.tagName == "TD"){
	     index = event.srcElement.parentNode.rowIndex;
	}else if(event.srcElement.tagName == "SPAN"){
             index = event.srcElement.parentNode.parentNode.rowIndex;
        }else{
	     index = event.srcElement.rowIndex;
	}
	if (index != 0 && !index) return;
        if (typeof gridRow_Click == "function"){
           gridRow_Click(index);
        }else{
           gridRow_ClickF(index);
        }
}

function deleteTableRow(rowIndex)
{
	//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040412;
	var vaiColWidth= new Array();
	if (rowIndex== 0)
	{
	  var vjFirstTR= gridBodyTable.rows[rowIndex];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vaiColWidth[i]= vjFirstTR.childNodes[i].offsetWidth;
	  }
	}

  gridBodyTable.deleteRow(rowIndex);
  fillTableColor();

  //恢复列宽.
	if (rowIndex== 0 && gridBodyTable.rows.length> 0)
	{
	  var vjFirstTR= gridBodyTable.rows[rowIndex];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vjFirstTR.childNodes[i].style.width= vaiColWidth[i];
	  }
		gridBodyTable.style.width= head.offsetWidth;
	}

  return true;
}

function deleteTableRows(){
  for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
    gridBodyTable.deleteRow(0);
  }
}

/** 根据列名和列值在 gridBodyTable 中查找对应列 */
function locateRow(fieldNames,fieldValues){
  //alert("locateRow();"+ "|"+ entityMeta.getAttribute("wftype"));
  var colNos = new Array();
  var fields = entityMeta.childNodes;

  //得加上对 "null" 的判断; leidh; 20040513;
  //if (entityMeta.getAttribute("wftype")!=null) return; //mod by xujh
  if (entityMeta.getAttribute("wftype")!=null
      && entityMeta.getAttribute("wftype")!= "null")
      return null; //mod by xujh
  for (var i=0,j=fieldNames.length; i<j; i++){
    for (var m=0,n=fields.length; m<n; m++){
      if (fields.item(m).getAttribute("name") == fieldNames[i]){
        colNos[colNos.length] = parseInt(fields.item(m).getAttribute("no"));
        break;
      }
    }
  }
  if(colNos.length == 0 || colNos.length < fieldNames.length)
    return null;
  for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
    var bFound = true;
    for (var m=0,n=colNos.length; m<n; m++){
      if (trim(fieldValues[m])
        != trim(gridBodyTable.rows[i].cells[colNos[m] + COLUMN_OFFSET].innerText)){ // 2004-5-26 HH 原来是 innerHTML
        bFound = false;
        break;
      }
    }
    if (bFound){
      return gridBodyTable.rows[i];
    }
  }
  return null;
}

function addBlankRow(){
  var row = gridBodyTable.insertRow(-1);
  row.style.color = "#000000";
  row.style.fontFamily = "MS Sans Serif";
  row.style.fontSize = "12px";
  row.onclick = gridRowClick;
  row.onmouseover = color_bh;
  row.onmouseout = color_re;
  row.onclick = gridRowClick;
  var cell = row.insertCell(-1);
  cell = row.insertCell(-1);

  cell.align = "center";
  cell.style.width = 30;
  cell.innerHTML = "<input type=\"checkbox\" onclick=\"selectPart()\"></input>";
  fillTableColor();
  colResize();
  var imgs = head.getElementsByTagName("img");
  for (var i=0,j=imgs.length; i<j; i++){
    imgs.item(i).setAttribute("src",imgPath+"blank.gif");
  }
  return row;
}

function addTableRows(data){
  if (data.childNodes.length == 0) return;
  var fields = data.firstChild.childNodes;
  var fieldMetas = entityMeta.childNodes;
  var fieldOrder = new Array();
	var isKiloStyle = new Array();
  var isSelect = new Array();
  for (var i=0,j=fieldMetas.length; i<j; i++){
    fieldOrder[i] = -1;
    for (var m=0,n= fields.length; m<n; m++){
      if (fields.item(m).getAttribute("name").toUpperCase()
          == fieldMetas.item(i).getAttribute("name").toUpperCase()){
        fieldOrder[i] = m;
        break;
      }
    }
		isKiloStyle[i] = fieldMetas.item(i).getAttribute("isKiloStyle");
    isSelect[i] = fieldMetas.item(i).getAttribute("type");
  }
  for (var i=0,j=data.childNodes.length; i<j; i++){
    var field = data.childNodes.item(i).childNodes;
    var row = gridBodyTable.insertRow(-1);
    row.onmouseover = color_bh;
    row.onmouseout = color_re;
    row.onclick = gridRowClick;
    
    var voBeforeFillCell= row.insertCell(-1);
    voBeforeFillCell.className= "clsGridBodyCell4";
    voBeforeFillCell.innerHTML= "&nbsp;";
    
    var chkboxCell = row.insertCell(-1);
    chkboxCell.style.width = 30;
    chkboxCell.align = "center";
    var chkbox = document.createElement("input");
    chkbox.type = "checkbox";
    chkbox.value = "";
    chkbox.onclick = selectPart;
    chkboxCell.appendChild(chkbox);
    chkboxCell.className= "clsGridBodyCell4";

    for (var m=0,n=fieldOrder.length; m<n; m++){
      var cell = row.insertCell(-1);
      cell.className= "clsGridBodyCell4";
      if (fieldOrder[m] != -1){
				if (isKiloStyle[m] == "true"){
					var temp = field.item(fieldOrder[m]).getAttribute("value");
          if(temp.indexOf(",") > 0){
						cell.innerText = temp;
          }else{
        		var temp2 = kiloStyle(temp);
        		cell.innerText = temp; // 2004-5-26 HH 原来是 innerHTML
          }
				}else{
        	cell.innerText = field.item(fieldOrder[m]).getAttribute("value"); // 2004-5-26 HH 原来是 innerHTML
          if(isSelect[m] == "ValueSet"){
          	var value = field.item(fieldOrder[m]).getAttribute("value");
          	var blankIndex = value.indexOf(" ");
          	if(blankIndex > 0){
            	cell.innerHTML = "<span value=\"" + value.substring(0, blankIndex) + "\"></span><span value=\"" + value.substr(blankIndex + 1) + "\">" + value.substr(blankIndex + 1) + "</span>";
          	}
          }
				}
      }
      if (cell.innerText== "" && cell.innerHTML== ""){
        cell.innerHTML= "&nbsp;";
      }
    }
    var voAfterFillCell= row.insertCell(-1);
    voAfterFillCell.className= "clsGridBodyCell4";
    voAfterFillCell.innerHTML= "&nbsp;";
    
    var isChecked = isMultiRowChecked(field);
    if(isChecked) chkbox.checked = true;
  }
  fillTableColor();
  ////handleWFListPage();
	setInitColSize();
  colResize();
  var imgs = head.getElementsByTagName("img");
  for (var i=0,j=imgs.length; i<j; i++){
    imgs.item(i).setAttribute("src",imgPath+"blank.gif");
  }
}

//外部实体跨页多选处理，wtm,20040713
function getSelectedMultiRows(){
	for (var i=0,j=entityMeta.childNodes.length; i<j; i++)
	{
		var fieldName = entityMeta.childNodes.item(i).getAttribute("name").toUpperCase();
		var fieldNo = entityMeta.childNodes.item(i).getAttribute("no");
		listPageFieldNames[fieldNo] = fieldName;
	}

	var result = new Array();

  for (var i=0,j=selectedRowsObj.length; i<j; i++){

     	if (!selectedRowsVal[i][0]){
               continue;
        }
     result[result.length] = selectedRowsAllVal[i];
  }

  //*
  if (result.length== 0){
    for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
      if (gridBodyTable.rows[i].cells[1].firstChild.checked){
        result[i] = new Array();
        for (var x= 2; x< gridBodyTable.rows[i].childNodes.length; x++){
          result[i][x- 2] = gridBodyTable.rows[i].childNodes[x].innerText;
        }
      }
    }
  }
  //*/
  return result;
}

function getSelectedRows(){
	//  head.rows[0].cells[1].firstChild.checked = false;
  var result = new Array();

  for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
   if (gridBodyTable.rows[i].cells[1].firstChild.checked){
     result[result.length] = gridBodyTable.rows[i];
    }

  }
  return result;
}

function getRowField(row,fieldName,withName)
{
  var colNo = 0;
  for (var i=0,j=entityMeta.childNodes.length; i<j; i++)
  {
    if (entityMeta.childNodes.item(i).getAttribute("name").toUpperCase()== fieldName.toUpperCase())
    {
      colNo = parseInt(entityMeta.childNodes.item(i).getAttribute("no")) + COLUMN_OFFSET; //前面加有 HFillCell;leidh;20040408;
    }
  }
  var vsRet= "";
  if (colNo != 0)
  {
  	  if (row.cells[colNo].childNodes.length == 2){//列表页面取值集，wtm，20041222
  	  	if (!withName){//默认false，取id
  	  		vsRet= packSpecialChar(row.cells[colNo].firstChild.value);
  	  	}else{
  	  	    vsRet= packSpecialChar(row.cells[colNo].innerText);
  	  	}
  	  }else{
  	    vsRet= packSpecialChar(row.cells[colNo].innerHTML);
  	  }
    //alert(row.rowIndex+ "|"+ fieldName+ "|"+ vsRet);
    return vsRet;
  }
  else
  {
    alert("没有" + fieldName + "字段。");
  }
}

function setRowField(row,fieldName,fieldValue){
  var colNo = 0;
  for (var i=0,j=entityMeta.childNodes.length; i<j; i++){
    if (entityMeta.childNodes.item(i).getAttribute("name").toUpperCase()
        == fieldName.toUpperCase()){
      colNo = parseInt(entityMeta.childNodes.item(i).getAttribute("no")) + COLUMN_OFFSET; //前面加有 HFillCell;leidh;20040408;
    }
  }
  if (colNo != 0){
    return row.cells[colNo].innerHTML = fieldValue;
  }else{
    alert("没有" + fieldName + "字段。");
  }
}

function deleteRow(row)
{
	//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040412;
	var viRowIndex= row.rowIndex;
	var vaiColWidth= new Array();
	if (viRowIndex== 0)
	{
	  var vjFirstTR= gridBodyTable.rows[viRowIndex];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vaiColWidth[i]= vjFirstTR.childNodes[i].offsetWidth;
	  }
	}

  gridBodyTable.deleteRow(row.rowIndex);
  fillTableColor();

  //恢复列宽.
	if (viRowIndex== 0 && gridBodyTable.rows.length> 0)
	{
	  var vjFirstTR= gridBodyTable.rows[viRowIndex];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vjFirstTR.childNodes[i].style.width= vaiColWidth[i];
	  }
		gridBodyTable.style.width= head.offsetWidth;
	}

  return true;
}

function setRowChecked(row,checked){
  row.cells[0].firstChild.checked = checked;
}

function releaseAll() {
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    gridBodyTable.rows[i].cells[0].firstChild.checked = false;
  }
}

function body_Scroll() {//移动滚动条
 	var tableName = document.getElementById("entityMeta").getAttribute("tableName");
 	var tableWidth = head.clientWidth;
	var scrollWidth = getScrollWidth(tableName);
	var leftWidth = scrollWidth;
	var colInfo = document.getElementById(tableName + "ColTable");
	if (colInfo) {
		colInfo = colInfo.rows[0];
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
	}

	//alert(head.offsetWidth+ "|"+ tableWidth);
	var hfill = document.getElementById(tableName + "_HFillCell");
	var vjTFillTD= document.getElementById(tableName + "_" + "TFill" + "Cell");
	if (vjTFillTD) {
		var viTFillTDWidth= vjTFillTD.offsetWidth+ (hfill.offsetWidth- leftWidth);
		vjTFillTD.style.width= (viTFillTDWidth> 0)? viTFillTDWidth: 0; //leidh;20040402;

		if (head.offsetWidth < tableWidth){
			head.width = tableWidth + 2 ;
			hfill.style.width = leftWidth;
		}else{
			hfill.style.width = leftWidth;
			head.width = tableWidth + 2 ;
		}
	}

	gridBodyTable.style.width = tableWidth + 2;
	colResize(tableName);
	head.style.left = -leftWidth;
}

//滚动列;
function scrollCol(tableName,fieldName,scrollIn)
{
	var cell = document.getElementById(tableName + fieldName + "Field");
	if (cell.app == "" + scrollIn){ return false; }

	var vkRet= false;
	var visible= (scrollIn)? false: true;
	if (scrollIn){
		cell.originalWidth = getColWidth(tableName,fieldName);
		vkRet= setGridFieldVisible(tableName,fieldName,visible,true);
	}else{
		vkRet= setGridFieldVisible(tableName,fieldName,visible,true);
	}

	//隐藏(实现锁定)后,对 HFill 和 TFill 进行处理;
	if (vkRet)
	{
	  var doc = document.getElementById(tableName + "_" + fieldName + "Cell");

	  var viAdjustWidth= 0;
	  if(visible)
	  {
	  	viAdjustWidth= 0- doc.offsetWidth;
	  }
	  else
	  {
	  	viAdjustWidth= doc.offsetWidth;
	  }

		//alert(viAdjustWidth);
	  var vjGridTBody= null;
	  var vjRow= null;
	  var vjRowLastTD= null;
	  var vjDataTD= null;
	  var viDataTDIndex= parseInt(doc.U_ColIndex);

	  var vjHFillTD= document.getElementById(tableName + "_" + "HFill" + "Cell");
	  var vjTFillTD= document.getElementById(tableName + "_" + "TFill" + "Cell");
	  var viHFillTDWidth= vjHFillTD.offsetWidth+ viAdjustWidth;
	  vjHFillTD.style.width= (viHFillTDWidth> 0)? viHFillTDWidth: 0;
  }

	cell.app = "" + scrollIn;

	return true;
}

function getScrollWidth(tableName){
	return gridBody.scrollLeft;
}

function getColWidth(tableName,fieldName){
	if (document.getElementById(tableName + fieldName + "Field").app == "true"){
		return document.getElementById(tableName + fieldName + "Field").originalWidth;
	}else{
		return document.getElementById(tableName + "_" + fieldName + "Cell").clientWidth;
	}
}

function setGridFieldVisible(tablename, fieldname, visible,unadjust)
{
  if(gridBodyTable == null) return false;
  //alert(fieldname);

  var doc = document.getElementById(tablename + "_" + fieldname + "Cell");
  if (doc.U_Hidden== true) return false;
  if((visible) && doc.style.display == "") return false;
  if((!visible) && doc.style.display == "none") return false;
  //*
  if(visible){
    head.width = Math.abs(parseInt(head.clientWidth) + parseInt(doc.offsetWidth));
  }else{
    head.width = Math.abs(parseInt(head.clientWidth) - parseInt(doc.offsetWidth));
  }
  //*/


  gridBodyTable.style.width = head.clientWidth;
  doc.style.display = visible?"":"none";
  document.getElementById(tablename + fieldname + "COL").style.display = visible?"":"none";
  if (!unadjust){
  	colResize(tablename);
  }

  return true;
}

function getMultiRowField(row, fieldName){
	var i = 0;
	for(i = 0; i < listPageFieldNames.length; i++){
		if(listPageFieldNames[i] == fieldName) break;
	}
	return row[i];
}

function isMultiRowChecked(checkField){
	if(selectedRowsAllVal == null || selectedRowsAllVal.length == 0
	  || checkField == null)
		return false;
		
	var fields = getFields();
	var fieldNo = fields[0];
	var fieldsName = fields[1];
	var fieldsIsPK = fields[3];
	var pkFields = new Array();
	var pkFieldsIndex = new Array();
	for(var i = 0; i < fieldsName.length; i++){//主键的name和no
		if(fieldsIsPK[i] == "true"){
			pkFields[pkFields.length] = fieldsName[i];
			pkFieldsIndex[pkFieldsIndex.length] = fieldNo[i];
		}
	}
	
	for(var j = 0; j < selectedRowsAllVal.length; j++){//遍历所有选择的行
		var isChecked = true;
		for(var i = 0; i < pkFields.length; i++){//遍历主键字段
			var selectedRowVal = selectedRowsAllVal[j][pkFieldsIndex[i]];
			var fieldVal = "";
			for(var k = 0; k < checkField.length; k++){//选择数据中的主键值
				if(checkField.item(k).getAttribute("name").toUpperCase() == pkFields[i].toUpperCase()){
					fieldVal = checkField.item(k).getAttribute("value");
					break;
				}
			}
			if(fieldVal != selectedRowVal){//如果不相等，则没有选择，跳出
				isChecked = false;
				break;
			}
		}
		
		if(isChecked)//如果true，则存在选择的，跳出
			break;
	}
	
	return isChecked;
}
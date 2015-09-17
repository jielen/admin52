/* $Id: prnsvariabledesigner.js,v 1.3 2008/03/21 05:48:07 guohui Exp $ */
function ok(){
  returnValue = new Array();
  var tableName = event.srcElement.getAttribute("tablename");
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")== "true") 
  	return;
  var table = document.getElementById(tableName + "BodyTable");
	var viOffetColX=0;
 	var vsKeyValue="";
  if (table.rows.length<= 0) 
  	return false;
	var m=0;
	for (var j= 0; j< table.rows.length; j++){
  	if (table.rows[j].cells[0+ viOffetColX].firstChild.checked== false) 
  		continue;
		returnrowvalue = new Array();
    var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
    vsKeyValue= table.rows[j].cells[viCol].innerText;
    vsKeyValue= trim(vsKeyValue);
		returnrowvalue[0]=vsKeyValue;
		var viColn = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM_NA" + "Cell").colno);
    vsKeyValue= table.rows[j].cells[viColn].innerText;
    vsKeyValue= trim(vsKeyValue);
		returnrowvalue[1]=vsKeyValue;
		returnValue[m]=returnrowvalue;
		m++;
  }
  checkVariables();
  var variablesStr = "";
  if(variableArr!="")
			for( i=0;i<variableArr.length;i++)
				variablesStr = variablesStr  + variableArr[i] ;	
	//alert(variablesStr)
	pageSetupObj.setAttribute("variables",variablesStr);
    close();
  /*
	var names = new Array();
	var values = new Array();
	var fieldsWithKilo = new Array();
	names[0]="compo_id";
	values[0]="AS_ROLE";
	getDBDataToArea("AS_COMPO_FIELD",names,values,"A3","",false,null,null,null,20);
      qryDataAsGrid("AS_COMPO_FIELD",names,values,false,null,null,"A3","",null,20);

	if (document.getElementById("upfile").value){
		document.getElementById("uploadform").submit();
	}
	*/
}

function closes(){
	window.close();
}


var pageSetupObj;
var variablesStr;//从页面属性中获得的变量串
var variableArr = new Array();//分解开的子串数组
var variableValues = new Array();//每个子串再分解的变量属性值数组
var variableNames = new Array();//每个子串再分解的变量属性名数组
var index = 0;//修改的哪个变量标志
var tableName = "";//修改的表名
var dragobject = null;//拖动对象

/**
 *以下用来处理自定义变量的情况
 *从templatebody的属性中获得自定义变量串，显示在变量对话框中。
 *可以修改自定义变量的属性，最后将修改后的变量及属性放到templatebody的属性中。
 */
///窗口初始化
function windowload(){
	initGrid("AS_COMPO_FIELD");
	variableArr = "";
	variableValues = "" ;
	variablesStr = "";
	index = 0 ;
	tableName = "";
	dragobject =null ;
  var name = "name=";
	var title = "title=";
	var classname = "class=";
	var resetType = "resetType=";
	var resetGroup = "resetGroup=";
	var calculation = "calculation=";
	var expression = "variableExpression=";
	variableNames[0] = name;
	variableNames[1] = title;
	variableNames[2] = classname;
	variableNames[3] = resetType;
	variableNames[4] = resetGroup;
	variableNames[5] = calculation;
	variableNames[6] = expression;
  pageSetupObj = window.dialogArguments;
	variablesStr = pageSetupObj.getAttribute("variables");
	if(variablesStr!=null&&variablesStr!=""){
		variableArr = splitVariables(variablesStr);
		var variableValues = new Array();
		var tr;
		for(var i=0;i<variableArr.length;i++){
			variableValues = splitVari(variableArr[i]) ;
			if(isPredefineVariable(variableValues[0]))
				continue;
			tr = addBlankRow("AS_COMPO_FIELD");
			createTR(variableValues,tr);
		}
	}
}
function isPredefineVariable(variable){
	var isSystemVariable = false;
	if(variable == "SYSTEM_DATE" || variable == "SYSTEM_YEAR" || variable == "SYSTEM_MONTH" || variable == "SYSTEM_DAR")
		isSystemVariable = true;
	return isSystemVariable;
}
function createTR(variableValues,tr){
	tr.childNodes[1].innerText = variableValues[0];
	tr.childNodes[2].innerText = variableValues[1];
}
/**
 *将多个变量组成的串拆分成一个个变量子串，并放到数组variablesArr中
 */
function splitVariables(variables){
	var name = "name=" ;
	variablesArr = new Array();
	var index0  =  variables.indexOf(name);
	var index1 = variables.indexOf(name,index0+1);
	var i = 0;
	while(index1!=-1){
		variablesArr[i] =  variables.substring(index0,index1);
		index0 = index1;
		index1 = variables.indexOf(name,index0+1);
		i++;
	}
	variablesArr[i] = variables.substring(index0,variables.length);
	return  variablesArr; 
}
/**
 *将单个变量串拆分成一个个属性，并放到数组variableValues中
 */
function splitVari(variables){
	var name = "name=";
	var variableValues = new Array();
	var interval = "|";
	var i=0;
	var index = variables.indexOf(name);
	var intervalIndex = variables.indexOf(interval);
	while(i<variableNames.length-1){
		variableValues[i] = variables.substring(index + variableNames[i].length,intervalIndex);
		index = intervalIndex + 1;
		intervalIndex = variables.indexOf(interval,index);
		i++;
	}
	variableValues[i] = variables.substring(index + variableNames[i].length,variables.length);
	return variableValues;
}
/**
 *显示修改变量属性对话框
 */
function grid_Modify(){
	var value  = getSelectItem();
	if(value.length!=1){
		alert("请选择一项修改!");
		return;
	}
	//else if(value[0][0]==""||value[0][1]==""){
	//	alert("请先取消选项编辑状态!");
	//	return ;
	//} 
else if(value[0][0]=="PAGE_NUMBER"||value[0][0]=="REPORT_COUNT"||value[0][0]=="COLUMN_COUNT"
				||value[0][0]=="TABLE_COUNT" ||value[0][0]=="SYSTEM_DATE" ||value[0][0]=="SYSTEM_YEAR"
				||value[0][0]=="SYSTEM_MONTH"||value[0][0]=="SYSTEM_DAY"){
		alert("系统变量不能修改!");
		return;
	}
	else{
		var styleObj=document.getElementById("PRN_fieldstyle");
		styleObj.style.display="";
		styleObj.attachEvent("onmousedown",mousedown);
		styleObj.attachEvent("onmousemove",mousemove);
		styleObj.attachEvent("onmouseup",mouseup);
		//setPopMenuPos(styleObj);
		var i = 0 ;
		if(variableArr!="")
			for( i=0;i<variableArr.length;i++){
				variableValues = splitVari(variableArr[i]) ;
				if(value[0][0]==variableValues[0]&&value[0][1]==variableValues[1])
				break;
		}
		index = i;
		styleObj.all.item.value = i>=variableArr.length?value[0][0]:variableValues[0];
		styleObj.all.itemname.value = i>=variableArr.length?value[0][1]:variableValues[1];
		styleObj.all.vartype.value = i>=variableArr.length?"java.lang.String":variableValues[2];
		styleObj.all.resettype.value = i>=variableArr.length?"None":variableValues[3];
		styleObj.all.caltype.value = i>=variableArr.length?"Nothing":variableValues[5];
		styleObj.all.vexpression.value = i>=variableArr.length?"":variableValues[6];
	}
}
/**
 *取得要修改的变量选择项
 */
function getSelectItem(){
	var Value = new Array();
  tableName = event.srcElement.getAttribute("tablename");
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")== "true") 
  	return;
  var table = document.getElementById(tableName + "BodyTable");
	var viOffetColX=0;
 	var vsKeyVal  ;
 	if (table.rows.length<= 0) 
 		return false;
	var m=0;
	for (var j= 0; j< table.rows.length; j++){
     if (table.rows[j].cells[0+ viOffetColX].firstChild.checked== false) 
     	 continue;
		 returnrowvalue = new Array();
     var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
     vsKeyValue= table.rows[j].cells[viCol].innerText;
     vsKeyValue= trim(vsKeyValue);
		 returnrowvalue[0]=vsKeyValue;
		 var viColn = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM_NA" + "Cell").colno);
 	   vsKeyValue= table.rows[j].cells[viColn].innerText;
  	 vsKeyValue= trim(vsKeyValue);
		 returnrowvalue[1]=vsKeyValue;
		 Value[m]=returnrowvalue;
		 m++;
  	 }
  return Value;
}
/**
 *修改变量对话框中的选择的数据项和数据项名
 */
function setSelectItem(item , itemname){
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")== "true") return;
  var table = document.getElementById(tableName + "BodyTable");
	var viOffetColX=0;
 	var vsKeyValue="";
  if (table.rows.length<= 0) 
  	return false;
	for (var j= 0; j< table.rows.length; j++){
     if (table.rows[j].cells[0+ viOffetColX].firstChild.checked== false) 
     	continue;
		 var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
     table.rows[j].cells[viCol].innerText  = item ;
     var viColn = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM_NA" + "Cell").colno);
 		 table.rows[j].cells[viColn].innerText = itemname ;
  	}
}
/*
function setPopMenuPos(menuObj){
	var rightedge = document.body.clientWidth;
	var clickX = event.clientX;
	var bottomedge = document.body.clientHeight;
	var clickY = event.clientY;
	var menuWidth = menuObj.offsetWidth;
	var menuHeight = menuObj.offsetHeight;
	var menuX, menuY;
	if(clickX >= menuWidth){
		if((clickX + menuWidth) > rightedge)
			menuX = clickX - menuWidth;
		else
			menuX = clickX;
	}else
		menuX = clickX;
	if(clickY >= menuHeight){
		if((clickY + menuHeight) > bottomedge)
			menuY = clickY - menuHeight;
		else
			menuY = clickY;
	}else
	//menuObj.style.pixelLeft=menuX+document.body.scrollLeft;
		menuY = clickY;
	//menuObj.style.pixelTop=menuY+document.body.scrollTop;
	var contentDiv=document.getElementById("contentDiv");
	menuObj.style.pixelLeft=menuX+contentDiv.scrollLeft-32;
	menuObj.style.pixelTop=menuY+contentDiv.scrollTop;
}*/
/**
 *对话框拖动操作
 */
function mousedown(){
	el = window.event.srcElement;
	if (el.id == "TITLE"){ 
		dragobject = el.parentElement;
		ty = window.event.clientY - el.offsetTop;
		tx = window.event.clientX - el.offsetLeft;
		window.event.returnValue = false;
		window.event.cancelBubble = true;
		}
	else {
		dragobject = null;
	}
}
function mousemove(){
	if (dragobject&&event.button==1) {
		if (window.event.clientX >= 0 && window.event.clientY >= 0) {
			dragobject.style.left = window.event.clientX - tx;
			dragobject.style.top = window.event.clientY - ty;
		}
		window.event.returnValue = false;
		window.event.cancelBubble = true;
	}
}
function mouseup(){
	if(dragobject) {
		dragobject = null;
	}
}
function closePopMenu(){
	var styleObj=document.getElementById("PRN_fieldstyle");
	styleObj.style.display="none";
}
/**
 *设置变量属性修改
 */
function setModify(){
	var styleObj=document.getElementById("PRN_fieldstyle");
	var item = styleObj.all.item.value ;
	var itemname = styleObj.all.itemname.value ;
	if(item ==""){
		alert("数据项不能为空!");
		return;
	}
	if(itemname ==""){
		alert("数据项名不能为空!");
		return;
	}
	setSelectItem(item,itemname);
	variableValues[0] = item;
	variableValues[1] = itemname;
	variableValues[2] = styleObj.all.vartype.value;
	variableValues[3] = styleObj.all.resettype.value; 
	variableValues[4] = "table" ;
	variableValues[5] = styleObj.all.caltype.value; 
	variableValues[6] = styleObj.all.vexpression.value;
	
	var variStr = "";
	for( i=0;i<variableValues.length-1;i++)
				variStr = variStr  + variableNames[i] + variableValues[i] + "|" ;	
	variStr = variStr + variableNames[i] + variableValues[i] ;
	if(variableArr=="") variableArr = new Array();
	variableArr[index] = variStr; 
	styleObj.style.display="none";
}
/**
 *保存属性时检查变量对话框中的变量是否在variableArr数组中
 */
function checkVariables(){

	var tableName = event.srcElement.getAttribute("tablename");
  var table = document.getElementById(tableName + "BodyTable");
	var viOffetColX=0;
 	var vsKeyValue="";
  if (table.rows.length<= 0) 
  	return false;

	for (var j= 0; j< table.rows.length; j++){
		
     var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
     var item  = table.rows[j].cells[viCol].innerText  ;
     var viColn = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM_NA" + "Cell").colno);
 		 var itemname = table.rows[j].cells[viColn].innerText ;
 		 if ( item=="数据项" )
 		 		continue ;
 		 if ( item=="" && itemname=="" )
		 		continue ;
		 if	( item=="" && itemname!="")
		 		item = itemname ;
		 if	( item!="" && itemname=="")
		 		itemname = item ;
 		 if(item=="PAGE_NUMBER"||item=="REPORT_COUNT"||item=="COLUMN_COUNT"||item=="TABLE_COUNT")
		 		continue ; 
		 for (var k= 0; k< variableArr.length; k++){
		 			var variableValues = new Array();
     			variableValues = splitVari(variableArr[k]) ;
					if(item ==variableValues[0]&&itemname ==variableValues[1])
     					break ;
     		}
     if ( k < variableArr.length){
     		continue;
     }
		 else{
		 		setDefaultVar(item,itemname);
		 }
  	}
  
  	for (var k= 0; k< variableArr.length; k++){
		 			var variableValues = new Array();
     			variableValues = splitVari(variableArr[k]) ;
     			
     			for (var j= 0; j< table.rows.length; j++){
		
     				var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
     				var item  = table.rows[j].cells[viCol].innerText  ;
     				var viColn = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM_NA" + "Cell").colno);
 		 				var itemname = table.rows[j].cells[viColn].innerText ;
 		 				if ( item=="数据项" )
 		 					continue ;
 		 				if ( item=="" && itemname=="" )
		 					continue ;
		 				if	( item=="" && itemname!="")
		 					item = itemname ;
		 				if	( item!="" && itemname=="")
		 					itemname = item ;
 		 				if(item=="PAGE_NUMBER"||item=="REPORT_COUNT"||item=="COLUMN_COUNT"||item=="TABLE_COUNT")
		 					continue ; 
		 				if(item ==variableValues[0]&&itemname ==variableValues[1])
     					break ;
		 			}
     		if ( j<table.rows.length){
     			continue;
    	 	}
		 		else{
		 		deleteVariable(k);
		 		}
  		}
}
/**
 *若变量对话框中的变量不在variableArr数组中，则赋给默认值放到variableArr中
 */
function setDefaultVar(item,itemname ){
	var variableValues = new Array();
	variableValues[0] = item;
	variableValues[1] = itemname;
	variableValues[2] = "java.lang.String";
	variableValues[3] = "None"; 
	variableValues[4] = "table" ;
	variableValues[5] = "Nothing"; 
	variableValues[6] = "";
	var variStr = "";
	for( i=0;i<variableValues.length-1;i++)
				variStr = variStr  + variableNames[i] + variableValues[i] + "|" ;	
	variStr = variStr + variableNames[i] + variableValues[i] ;
	if(variableArr=="") variableArr = new Array();
	variableArr[variableArr.length] =  variStr;
}
/**
 *若variableArr数组中变量不在对话框中，则将variableArr中的变量删除
 */
function deleteVariable(k){
	
		variableArr[k] = "";
}



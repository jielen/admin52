/* $Id: prnsltfielddesigner.js,v 1.3 2008/03/21 05:48:07 guohui Exp $ */
function ok(){
  returnValue = new Array();
  var tableName = event.srcElement.getAttribute("tablename");
   if (document.getElementById(tableName + "HeadTable").getAttribute("read")
      == "true") return;
  var table = document.getElementById(tableName + "BodyTable");
var   viOffetColX=0;
 var vsKeyValue="";
 var vsKeyValues="";
  if (table.rows.length<= 0) return false;
var m=0;

  	for (var j= 0; j< table.rows.length; j++)
      {
        if (table.rows[j].cells[0+ viOffetColX].firstChild.checked== false) continue;
		//alert("ok()"+table.rows[j].cols.length);	
	      //for (var k=1;k<table.cols.length;k++)
		//{
        	//
        	returnrowvalue = new Array();
        	//var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
        	vsKeyValue= table.rows[j].cells[1].innerText;
        	vsKeyValue= trim(vsKeyValue);
		returnrowvalue[0]=vsKeyValue;
		//alert("ok()"+returnrowvalue[0]);
		//var viColn = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM_NA" + "Cell").colno);
        	vsKeyValue= table.rows[j].cells[2].innerText;
		vsKeyValues= table.rows[j].cells[3].innerText;
        	vsKeyValue= trim(vsKeyValue)+"["+vsKeyValues+"]";
		returnrowvalue[1]=vsKeyValue;
		//alert("ok()"+returnrowvalue[1]);
		returnValue[m]=returnrowvalue;
		m++;
		//}
  }
  checkParameters();
  var parametersStr = "";
  if(parametersArr!="")
			for( i=0;i<parametersArr.length;i++)
				parametersStr = parametersStr  + parametersArr[i] ;	
	//alert(parametersStr)
	pageSetupObj.setAttribute("parameters",parametersStr);
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
function selectfield(){
	var names = new Array();
	var values = new Array();
	//var AS_COMPO_NAME = event.srcElement.getAttribute("tablename");
	var fieldsWithKilo = new Array();
	names[0]="compo_id";
	values[0]=entityName;
	//alert(entityName);
	getDBData("print-ruleData.AS_COMPO_FIELD",names,values,"selectfield_re");
	//getDBDataToArea("AS_COMPO_FIELD",names,values,"A3","",false,null,null,null,20);
}
function selectfield_re(result){
   if(result.getAttribute("success") == "false"){
    //出错处理
    alert("错误信息："+result.innerHTML);
  }else{
  /*
    var deltaNode = result.documentElement;///根结点
    //var entityName = getCompoName();
    ///alert(entityName);
    var prn_compo_id;
    var prn_tpl_jpcode;
    var prn_tpl_name;
    prn_compo_id=deltaNode.firstChild.firstChild.getAttribute("value");
    prn_tpl_jpcode=deltaNode.firstChild.firstChild.nextSibling.getAttribute("value");
    prn_tpl_name=deltaNode.firstChild.firstChild.nextSibling.nextSibling.getAttribute("value");

    var table = document.getElementById(tableName + "BodyTable");
    */
    addTableRows("AS_COMPO_FIELD",result);
    flag = true;
  } 
}

function closes(){
	window.close();
}
/**
 *以下用来处理自定义参数的情况
 *从templatebody的属性中获得自定义参数串，显示在参数对话框中。
 *将修改后的变量及属性放到templatebody的属性中。
 */

var pageSetupObj;
var parametersStr;//从页面属性中获得的新增参数串
var parametersArr = new Array();//分解开的子串数组
var parameterValues = new Array();//每个子串再分解的参数属性值数组
var parameterNames = new Array();//每个子串再分解的参数属性名数组
var oldParameters = new Array();//存放与部件相关的固有的参数
var flag = false;
///窗口初始化
function windowload(){
	initGrid("AS_COMPO_FIELD");
	selectfield();
  init();
}
function init(){

  	addSystemParas();
  	oldParameters = "";
  	getOldParameters(); 
 		parametersStr = "";
		parametersArr = "";
		parameterValues = "" ;
		parameterNames = new Array("name=","item=","title=");
		pageSetupObj = window.dialogArguments;
		parametersStr = pageSetupObj.getAttribute("parameters");
		if(parametersStr!=null&&parametersStr!=""){
			parametersArr = splitParameters(parametersStr);
			
			var tr;
			for(var i=0;i<parametersArr.length;i++){
				parameterValues = splitPara(parametersArr[i]) ;
				
				if(!paraIsIn(parameterValues[0])){
					tr = addBlankRow("AS_COMPO_FIELD");
					createTR(parameterValues,tr);
						}
			}
	}
}
/**
 *增加系统参数和字段，用户使用这些参数或字段自定义设置
 *Recordid 记录顺序号，字段
 *RecordTotal0 总记录数，参数
 *FIXROWCOUNT 分组标记，字段
 */
function addSystemParas(){
	var str = new Array();
	str[0] = "Recordid";
	str[1] = "记录顺序号";
	str[2] = "系统字段";
	tr = addBlankRow("AS_COMPO_FIELD");
	createTR(str,tr);
	
	str[0] = "RecordTotal0";
	str[1] = "总记录数";
	str[2] = "系统参数";
	tr = addBlankRow("AS_COMPO_FIELD");
	createTR(str,tr);
	
	str[0] = "FIXROWCOUNT";
	str[1] = "分组标记号";
	str[2] = "系统字段";
	tr = addBlankRow("AS_COMPO_FIELD");
	createTR(str,tr);
}
/**
 *取得系统预先定义的参数，即与部件相关的参数
 */
function getOldParameters(){
	var tableName = "AS_COMPO_FIELD";
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")== "true") return;
  var table = document.getElementById(tableName + "BodyTable");
	var viOffetColX=0;
 	var vsKeyValue="";
  if (table.rows.length<= 0) 
  	return false;
  if(oldParameters=="")
  	oldParameters = new Array();
	for (var j= 0; j< table.rows.length; j++){
		 var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
     oldParameters[j] = table.rows[j].cells[viCol].innerText;
  	}
}

/**
 *将多个参数组成的串拆分成一个个参数子串，并放到数组parametersArr中
 */
function splitParameters(parameterStr){
	var name = "name=" ;
	var variablesArr = new Array();
	var index0  =  parameterStr.indexOf(name);
	var index1 = parameterStr.indexOf(name,index0+1);
	var i = 0;
	while(index1!=-1){
		variablesArr[i] =  parameterStr.substring(index0,index1);
		index0 = index1;
		index1 = parameterStr.indexOf(name,index0+1);
		i++;
	}
	variablesArr[i] = parameterStr.substring(index0,parameterStr.length);
	return  variablesArr; 
}
/**
 *将单个参数串拆分成一个个属性，并放到数组parameterValues中
 */
function splitPara(parameterStr){
	var name = "name=";
	var variableValues = new Array();
	var interval = "|";
	var i=0;
	var index = parameterStr.indexOf(name);
	var intervalIndex = parameterStr.indexOf(interval);
	while(i<parameterNames.length-1){
		variableValues[i] = parameterStr.substring(index + parameterNames[i].length,intervalIndex);
		index = intervalIndex + 1;
		intervalIndex = parameterStr.indexOf(interval,index);
		i++;
	}
	variableValues[i] = parameterStr.substring(index + parameterNames[i].length,parameterStr.length);
	return variableValues;
}
function paraIsIn(item){
	var value = false;
	var tableName = "AS_COMPO_FIELD";
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")== "true") return;
  var table = document.getElementById(tableName + "BodyTable");
	var viOffetColX=0;
 	var vsKeyValue="";
  if (table.rows.length<= 0) 
  	return false;
	for (var j= 0; j< table.rows.length; j++){
		 var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
     if(table.rows[j].cells[viCol].innerText == item )
     	 break;
  	}
  if(j<table.rows.length) 
  	value = true;
  return value;
}
function createTR(variableValues,tr){
	tr.childNodes[1].innerText = variableValues[0];
	tr.childNodes[2].innerText = variableValues[1];
	tr.childNodes[3].innerText = variableValues[2];
}
/**
 *保存属性时检查变量对话框中的变量是否在variableArr数组中
 */
function checkParameters(){

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
 		 var viColnn = parseInt(document.getElementById(tableName + "_" + "TAB_NA" + "Cell").colno);
 		 var title = table.rows[j].cells[viColnn].innerText ;
 		 
 		 if (itemIsInOld(item))
 		 		continue ;
 		 if ( item=="" && itemname=="" )
		 		continue ;
		 if	( item=="" && itemname!="")
		 		item = itemname ;
		 if	( item!="" && itemname=="")
		 		itemname = item ;
 		 
		 for (var k= 0; k< parametersArr.length; k++){
		 			var variableValues = new Array();
     			variableValues = splitPara(parametersArr[k]) ;
					if(item ==variableValues[0]&&itemname ==variableValues[1])
     					break ;
     		}
     if ( k < parametersArr.length){
     		continue;
     }
		 else{
		 		setParameter(item,itemname,title);
		 }
  	}

  	for (var k= 0; k< parametersArr.length; k++){
		 			var variableValues = new Array();
     			variableValues = splitPara(parametersArr[k]) ;
     			
     			for (var j= 0; j< table.rows.length; j++){
		
     				var viCol = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM" + "Cell").colno);
     				var item  = table.rows[j].cells[viCol].innerText  ;
     				var viColn = parseInt(document.getElementById(tableName + "_" + "DATA_ITEM_NA" + "Cell").colno);
 		 				var itemname = table.rows[j].cells[viColn].innerText ;
 		 				var viColnn = parseInt(document.getElementById(tableName + "_" + "TAB_NA" + "Cell").colno);
 		 				var title = table.rows[j].cells[viColnn].innerText ;
 		 				if (itemIsInOld(item))
 		 					continue ;
 		 				if ( item=="" && itemname=="" )
		 					continue ;
		 				if	( item=="" && itemname!="")
		 					item = itemname ;
		 				if	( item!="" && itemname=="")
		 					itemname = item ;
		 				if(item ==variableValues[0]&&itemname ==variableValues[1])
     					break ;
		 			}
     		if ( j<table.rows.length){
     			continue;
    	 	}
		 		else{
		 		deleteParameter(k);
		 		}
  		}
}
function setParameter(item,itemname ,title){
	var variableValues = new Array();
	variableValues[0] = item;
	variableValues[1] = itemname;
	variableValues[2] = title;
	var variStr = "";
	for( i=0;i<variableValues.length-1;i++)
				variStr = variStr  + parameterNames[i] + variableValues[i] + "|" ;	
	variStr = variStr + parameterNames[i] + variableValues[i] ;
	if(parametersArr=="") parametersArr = new Array();
	parametersArr[parametersArr.length] =  variStr;
}
function deleteParameter(k){
	
		parametersArr[k] = "";
}
function itemIsInOld(item){
	var value = false;
	for( i=0;i<oldParameters.length;i++)
		if(oldParameters[i]==item)
			break;
	if(i<oldParameters.length)
		value = true;
	return value;
}
/** $Id: foreign.js,v 1.4 2008/07/28 07:41:27 zhuyulong Exp $ */
var isSelect = false;
var srcEle = null;

function foreignKey_Change(foreign){
  changed = true;
  //foreign为空，返回。wtm,20040819
  if (foreign == 'null' ) return;
  //如果部门被清空,则触发的 onchange() 事件无效;leidh;20040609;
  var vjSrcEle= event.srcElement;
  var sfieldname = event.srcElement.getAttribute("fieldname");
  var tablename = event.srcElement.getAttribute("tablename");
  if ((vjSrcEle.value== null || vjSrcEle.value.length== 0)
      && (vjSrcEle.innerText== null || vjSrcEle.innerText.length== 0))
  {
		fillForeignNoSelect(tablename,foreign,sfieldname);
    return false;
  }

  if (event.srcElement.getAttribute("reselect") != "true"){
    var result = oneForeign_Select(foreign);
	  field_Change(event.srcElement);
  }else{
    vjSrcEle.setAttribute("reselect","false");
    if (isSelect){
      //因为是连续触发,所以使用 setTimeout("fireChange()" ,5) 会造成触发信息的丢失;
      //从而造成了触发无效的情况;leidh;20040519;
    	//srcEle = event.srcElement;
    	//setTimeout("fireChange()" ,5);
  	  field_Change(vjSrcEle);
    }
  }
}

function fireChange(){
	field_Change(srcEle);
}

function oneForeign_Select(foreign){
  var sfieldname = event.srcElement.getAttribute("fieldname");
  var tablename = event.srcElement.getAttribute("tablename");
	if (!foreignPrepare(tablename,sfieldname)){ return; }
	var beforeCon = foreignBeforeCondition(foreign);
	if (!beforeCon){ return; }

  var condition = "";
  var fTableName = document.getElementById(foreign + "Meta").getAttribute("foreigntablename");
  if(!isSearchPage){

  	condition = appendDynaCondition(foreign,tablename,condition,fTableName);
  }

  condition = appendFixCondition(foreign, condition, fTableName);

  condition = appendBeforeCondition(beforeCon,condition);

  condition = appendEqualCondition(sfieldname,foreign,condition,tablename);

	var data = foreignRequestData(foreign,condition);

	if (data){
		fillForeignOneRow(tablename,foreign,data[0],data[1]);
    setValueRight(tablename, sfieldname, true);
	}else{
    setValueRight(tablename, sfieldname, false);
		foreign_Select(foreign,true,true);
	}
}

function foreign_Select(foreign, like, unfire){
  var sfieldname = event.srcElement.getAttribute("fieldname");
  var tablename = event.srcElement.getAttribute("tablename");
  var isSelectTreePage = event.srcElement.getAttribute("treeview");//add by wunianyang
  if (!foreignPrepare(tablename,sfieldname)){ return; }
  isSelect = event.srcElement.tagName != "INPUT";
  var beforeCon = foreignBeforeCondition(foreign);
  if (!beforeCon){ return; }

  var condition = "";
  var fTableName = document.getElementById(foreign + "Meta").getAttribute("foreigntablename");
  if(!isSearchPage){
  	condition = appendDynaCondition(foreign,tablename,condition,fTableName);
  }
	//zhangys 2004-06-25 外部实体名称被加上按钮的时候，拼不上其固定条件
  if( !isSelectTreePage ||(isSelectTreePage == "false"))
  	condition = appendFixCondition(foreign, condition, fTableName);
  condition = appendBeforeCondition(beforeCon,condition);
  if (like){
  	condition = appendLikeCondition(sfieldname,foreign,condition,tablename);
  }

  var backObj=event.srcElement;
  var ismultisel = document.getElementById(foreign + "Meta").getAttribute("ismultisel").toLowerCase();
  if (tablename.toLowerCase() == maintable.tablename.toLowerCase()){
    ismultisel = "false";
  }
  var win_select = null;
	//--- add by wunianyang -----------
  var masterCompoName = document.getElementById("meta").getAttribute("componame");
  var realtablename = document.getElementById(foreign + "Meta").foreigntablename;
  var realfieldname = "";
  var temp = document.getElementById(foreign + "fields").childNodes;
  for (var i=0,j=temp.length; i<j; i++) {
    if(temp.item(i).fieldname == sfieldname){
      realfieldname = temp.item(i).alias;
      break;
    }
  }
  var isSub = "Y";
  if(document.getElementById("maintable").getAttribute("tablename") == tablename){
    isSub = "N";
  }
  /*
  if (isSelectTreePage == "true"){
  	var foreignCompoName = document.getElementById(foreign + "Meta").getAttribute("componame");
  	//var foreignCompoName = foreign;
		win_select = showModalDialog(BASE_URL+ "/selectTreePage?masterCompoName="+masterCompoName
      +"&masterTableName="+tablename+"&isSub="+isSub
      +"&masterFieldName="+sfieldname
      +"&foreignname="+foreign
      +"&realTableName="+realtablename+"&realFieldName="+realfieldname
      +"&sql="
			+"&componame="+foreignCompoName+"&condition="+condition,null,"resizable:no;help:no;status:no");
	} else {
	*/
               win_select = foreignRequest(tablename,foreign,condition,ismultisel,masterCompoName,sfieldname,realtablename, realfieldname, isSub);
	//}
  //如果是查询页面，则自己作处理，不采用统一处理
  if(isSearchPage){
    exeCallBack(foreign,backObj,win_select); //此函数在 searchPage.jsp
    return ;
  }
  if (!win_select){
    var id = document.getElementById(tablename + "_" + sfieldname + "ID");
    if(id.getAttribute("isRight") == "Y") return;
    fillForeignNoSelect(tablename,foreign,sfieldname);
  }else{
    changed = true;
    setValueRight(tablename, sfieldname, true);
    if (ismultisel == "true") {
	  if (win_select[1].length == 0){
	    	return;
	  }
	  //在此处区分多选中的单选,现筛选条件根据传入的数据判断,若为多重数据的话win_select[1][0]是一对象.wtm.20040924
	  if ( typeof(win_select[1][0])=="string" ){
	      fillForeignOneRow(tablename,foreign,win_select[0],win_select[1],unfire);
              //fillForeignMultiRow(foreign,tablename,win_select[0],win_select[1]);
	  }else{
              fillForeignOneRow(tablename,foreign,win_select[0],win_select[1][0],unfire);
              fillForeignMultiRow(foreign,tablename,win_select[0],win_select[1]);
          }

    }else{
          fillForeignOneRow(tablename,foreign,win_select[0],win_select[1],unfire);
    }
  }
}
function foreignBeforeCondition(foreign){
  var beforeCon = " ";
  if (eval("typeof before_" + foreign + "_Select == \"function\"")){
    beforeCon = eval("before_" + foreign + "_Select()");
  }
  return beforeCon;
}
function before_F_MA_CP_EXTEND01_Select(){
	return "EXTEND_TYPE=01";
}
function before_F_MA_CP_EXTEND02_Select(){
	return "EXTEND_TYPE=02";
}
function before_F_MA_CP_EXTEND03_Select(){
	return "EXTEND_TYPE=03";
}
function before_F_MA_CP_EXTEND04_Select(){
	return "EXTEND_TYPE=04";
}
function before_F_MA_CP_EXTEND05_Select(){
	return "EXTEND_TYPE=05";
}

function foreignPrepare(tablename,sfieldname){
  var fieldEle = document.getElementById(tablename + "_" + sfieldname + "ID");
  if ((fieldEle.getAttribute("fieldType") == "select")
      && (fieldEle.getAttribute("read") == "true")) return false;

   //zhangcheng 2004/07/29 公式不可编辑，但可以选择
  var isEditableExpr=false;//判断当前是否时刻编辑的表达式
  if(sfieldname=="ITEM_EXPR")
  	if(document.getElementById("feditID"))
		if(document.getElementById("feditID").isDisabled) isEditableExpr=true;

  if (!fieldEle.isContentEditable&&!isEditableExpr) return false;
  if (eval("typeof " + sfieldname + "_Select == \"function\"")){
    eval(sfieldname + "_Select()");
    return false;
  }
  return true;
}

function appendDynaCondition(foreign,tablename,condition,fTableName){
  var effectFieldMeta = document.getElementById(foreign + "effectFields");
  var effectFields = effectFieldMeta.childNodes;
  for (var i=0,j=effectFields.length; i<j; i++) {
    var sfield = effectFields.item(i).getAttribute("sfield");
    var dfield = effectFields.item(i).getAttribute("dfield");
    if (document.getElementById(tablename + "_" + sfield + "ID") == null){
      //子表没有这个字段，就到主表中去找
      var tmpValue = doubleApos(getField(sfield));
      if((tmpValue != null) && (tmpValue.length > 0)){
        if(condition.length > 1)
          condition = condition + " and ";
        condition += fTableName + "." + dfield + "='" + tmpValue + "'";
      }
    }else{
      //得到子表中当前行的字段值，或主表的字段值
      if(document.getElementById(tablename + "_" + sfield + "Cell") != null){
        var row = getCurrentRow(tablename);
        var tmpValue = getRowField(row, sfield);
      }else{
        tmpValue = doubleApos(getField(sfield));
      }
      if((tmpValue != null) && (tmpValue.length > 0)){
        if(condition.length > 1)
          condition = condition + " and ";
        condition += fTableName + "." + dfield + "='" + tmpValue + "'";
      }
    }
  }
  return condition;
}

function appendFixCondition(foreign, condition, fTableName){
  var fixCondition = document.getElementById(foreign + "condition");
  if (fixCondition.getAttribute("condition") != null){
    if (condition != "")
      condition += " and  ";
    var fixC = fixCondition.getAttribute("condition");
    var foreignLen = foreign.length;
    if(foreign != fTableName){
      var re = new RegExp(foreign + "\\\.", "g");
      fixC = fixC.replace(re, fTableName + ".");
    }
    condition += fixC;
  }
  return condition;
}

function appendBeforeCondition(beforeCon,condition){
  if(beforeCon != " "){
    if(condition != "")
      condition = condition + " and ";
    condition = condition + beforeCon;
  }
  return condition;
}

function appendLikeCondition(sfieldname,foreign,condition,tablename){
  var dfieldname = sfieldname;
  var fields = document.getElementById(foreign + "fields").childNodes;
  for (var i=0,j=fields.length; i<j; i++){
    if (fields.item(i).getAttribute("fieldname") == sfieldname){
      dfieldname = fields.item(i).getAttribute("alias");
    }
  }
  var foreignTableName = document.getElementById(foreign
      + "Meta").getAttribute("foreigntablename").toLowerCase();
  if (condition != ""){
    condition += " and ";
  }
  var tempField = getField(sfieldname, tablename);
  tempField = tempField.replace(/%/g, "%25");
  condition += foreignTableName + "." + dfieldname + " like '" + tempField + "%'";
  return condition;
}

function appendEqualCondition(sfieldname,foreign,condition,tablename){
  var dfieldname = sfieldname;
  var fields = document.getElementById(foreign + "fields").childNodes;
  for (var i=0,j=fields.length; i<j; i++){
    if (fields.item(i).getAttribute("fieldname") == sfieldname){
      dfieldname = fields.item(i).getAttribute("alias");
    }
  }
  var foreignTableName = document.getElementById(foreign
      + "Meta").getAttribute("foreigntablename").toLowerCase();
  if (condition != ""){
    condition += " and ";
  }
  var tempField = getField(sfieldname, tablename);
  tempField = tempField.replace(/%/g, "%25");
  condition += foreignTableName + "." + dfieldname + " = '" + tempField + "'";
  return condition;
}

function foreignRequest(tablename,foreign,condition,ismultisel,masterCompoName,sfieldname,realtablename, realfieldname, isSub){
  var maintable = document.getElementById("maintable").getAttribute("tablename");
  var foreignCompoName = document.getElementById(foreign + "Meta").getAttribute("componame");

  var d = new Date();
  var win_select = showModalDialog(BASE_URL+ "/dispatcher.action?function=selectPage&componame="
      + foreignCompoName + "&condition=" + condition + "&ismulti=" + ismultisel
      +"&masterCompoName="+masterCompoName
      +"&masterTableName="+tablename+"&isSub="+isSub
      +"&masterFieldName="+sfieldname
      +"&realTableName="+realtablename+"&realFieldName="+realfieldname
      +"&sql=&sqlid=&isFromSql=true"
      + "&d=" + d.getMilliseconds(),foreign,"resizable:no;help:no;status:no");
//  window.open("Proxy?function=getSelectPage&componame="
//      + foreignCompoName + "&condition=" + condition + "&ismulti=" + ismultisel
//      + "&d=" + d.getMilliseconds());
  return win_select;
}

function foreignRequestData(foreign,condition){
	var foreignCompoName = document.getElementById(foreign + "Meta").getAttribute("componame");
  var names1 = new Array();
  var values1 = new Array();
  names1[0] = "componame";
  values1[0] = foreignCompoName
  names1[1] = "condition";
  values1[1] = condition;
  var result = requestData("getOneForeign", foreignCompoName, names1, values1);
  var xmldom = new ActiveXObject("Microsoft.XMLDOM");
  xmldom.loadXML(result.text);
  var result = false;
  if(xmldom.firstChild){
  var entitys = xmldom.firstChild.childNodes;
  if(entitys.length == 1){
	  var fields = xmldom.firstChild.firstChild.childNodes;
	  var names = new Array();
	  var values = new Array();
	  for(var i = 0; i < fields.length; i++){
    	names[names.length] = fields.item(i).getAttribute("name");
    	values[values.length] = fields.item(i).getAttribute("value");
  	}
  	result = new Array();
  	result[0] = names;
  	result[1] = values;
  }
  }
  return result;
}

function fillForeignMultiRow(foreign,tablename,names,values){

  var foreignFields = document.getElementById(foreign + "fields").childNodes;
  var valueIndex = new Array();
  var fieldnames = new Array();
  var alias = new Array();
  for (var i=0,j=foreignFields.length; i<j; i++){
    alias[i] = foreignFields.item(i).getAttribute("alias");
    fieldnames[i] = foreignFields.item(i).getAttribute("fieldname");
    for (var m=0,n=names.length; m<n; m++){
      if (names[m] == alias[i]){
        valueIndex[i] = m;
        break;
      }
    }
  }

  for (var i=1,j=values.length; i<j; i++){
	  var tr = addBlankRow(tablename);
    for (var m=0,n=fieldnames.length; m<n; m++){
    //外部实体跨页选出现空行或undefine，控制。wtm，20040713
      if ((!values[i][valueIndex[0]])&(!values[i][valueIndex[1]])){
      	deleteRow(tr);
      	break;
      }
      setRowField(tr,fieldnames[m],values[i][valueIndex[m]]);
      if (eval("typeof after_" + foreign + "_Multi_Select == \"function\"")){
        eval("after_" + foreign + "_Multi_Select(tr)");
      }
    }
  }
}

function fillForeignNoSelect(tablename,foreign,sfieldname){
  var foreignFields = document.getElementById(foreign + "fields").childNodes;
  if (document.getElementById(tablename + "EditTable") != null){//子表中的外部实体
    var row = getCurrentRow(tablename);
	  setRowField(row, sfieldname, "", true);
    for (var i=foreignFields.length-1; i>=0; i--){
      var name = foreignFields.item(i).getAttribute("fieldname");
      setRowField(row, name, "", true);
    }
  }else{//主表中的外部实体
    setField(sfieldname, "", null, false, true);
    for (var i=foreignFields.length-1; i>=0; i--){
      var name = foreignFields.item(i).getAttribute("fieldname");
      setField(name, "", tablename, false, true);
    }
  }
}

function fillForeignOneRow(tablename,foreign,names,values,unfire){
  if (document.getElementById(tablename + "EditTable") != null){//子表中的外部实体
  	fillInChildEditRow(tablename,foreign,names,values,unfire);
  }else{//主表中的外部实体
  	fillInMainEdit(foreign,names,values,unfire,tablename);
  }
}

function fillInChildEditRow(tablename,foreign,names,values,unfire){
	//alert("tablename=["+tablename+"]&foreign=["+foreign+"]&names=["+names+"]&values=["+values+"]&unfire=["+unfire+"]");
	if (names.length<= 0) return false;
  var head = document.getElementById(tablename + "HeadTable");
  var grid = document.getElementById(tablename + "BodyTable");
	var row = grid.rows[parseInt(head.getAttribute("row"))];
	var col = parseInt(head.getAttribute("col"));
	var notSet = true;

	var vajEventElement= new Array(); //记录需要触发事件的元素;leidh;20040526;

	var vjFirstFMeta = null;
	for (var i= 0; i< names.length; i++)
	{
  	vjFirstFMeta = document.getElementById("F" + foreign + "_" + names[i]);
  	if (vjFirstFMeta!= null) break;
  }
  if (vjFirstFMeta== null) return false;
	var vjFMeta= vjFirstFMeta.parentNode;
	var vjChild= null;
	for (var i= 0; i< vjFMeta.childNodes.length; i++)
	{
	  vjChild= vjFMeta.childNodes[i];
  	var vsDestFieldName = vjChild.getAttribute("fieldname");
  	var vsValue= "";

  	for (var j= 0; j< names.length; j++)
  	{
  	  if ("F" + foreign + "_" + names[j]== vjChild.id)
  	  {
  	    vsValue= values[j];
  	  }
  	}

		if(document.getElementById(tablename + "_" + vsDestFieldName + "Cell") == null) continue;
    var colNo = parseInt(document.getElementById(tablename + "_" + vsDestFieldName + "Cell").colno);
    if (notSet){
      if (col == colNo){
         //填入值,不允许事件触发；leidh; 20040526;
     	  //setField(name,values[m],tablename,false,unfire);
				//notSet = false;
     	  setField(vsDestFieldName,vsValue,tablename,false,true);
				notSet = false;
         var vjElement = document.getElementById(tablename + "_" + vsDestFieldName + 'ID');
         if (vjElement!= null) vajEventElement[vajEventElement.length]= vjElement;
      }else{//值集改造后外部实体带入值集显示错误，去掉<SPAN等信息。wtm，20041117
         if (!(vsValue.indexOf("SPAN")<0)){
	     var beg2 = vsValue.indexOf(">");
	     var beg1 = vsValue.indexOf("\"");
	     var beg3 = beg1 + 1;
	     var lengtht = beg2 - beg1 - 2;
	     vsValue = vsValue.substr(beg3,lengtht);
	     row.cells[colNo].innerHTML = vsValue;
         }else{
             row.cells[colNo].innerHTML = vsValue;
        }
      }
   }else{
      if (!(vsValue.indexOf("SPAN")<0)){
	     var beg2 = vsValue.indexOf(">");
	     var beg1 = vsValue.indexOf("\"");
	     var beg3 = beg1 + 1;
	     var lengtht = beg2 - beg1 - 2;
	     vsValue = vsValue.substr(beg3,lengtht);
	     row.cells[colNo].innerHTML = vsValue;
      }else{
          if(vsValue.indexOf(" ")>=0){
              var tlengt = vsValue.indexOf(" ");
              row.cells[colNo].innerHTML = vsValue.substr(0,tlengt);
          }else{
              row.cells[colNo].innerHTML = vsValue;
          }
     }
   }
  }

  //因为从外部实体中填入一行数据时，在未填完的情况下，setField() 就会触发事件,
  //造成事件侦听者无法获取即将填入而尚未填入的信息;所以,先填完值,事件后触发.
  //触发事件；leidh; 20040526;
  if (!unfire)
  {
    for (var i= 0; i< vajEventElement.length; i++)
    {
      var vjElement= vajEventElement[i];
      vjElement.setAttribute("reselect","true");
      vjElement.fireEvent("onchange");
    }
  }
}

function fillInMainEdit(foreign,names,values,unfire,tableName){
	if (names.length<= 0) return false;
	var vajEventElement= new Array(); //记录需要触发事件的元素;leidh;20040526;
	var vjFirstFMeta = null;
	for (var i= 0; i< names.length; i++)
	{
  	vjFirstFMeta = document.getElementById("F" + foreign + "_" + names[i]);
  	if (vjFirstFMeta!= null) break;
  }
  if (vjFirstFMeta== null) return false;

	var vjFMeta= vjFirstFMeta.parentNode;
	var vjChild= null;
	for (var i= 0; i< vjFMeta.childNodes.length; i++)
	{
	  vjChild= vjFMeta.childNodes[i];
  	var vsDestFieldName = vjChild.getAttribute("fieldname");
  	var vsValue= "";

  	for (var j= 0; j< names.length; j++)
  	{
  	  if ("F" + foreign + "_" + names[j]== vjChild.id)
  	  {
  	    vsValue= values[j];
	    if (!(vsValue.indexOf("SPAN")<0)){
		var beg2 = vsValue.indexOf(">");
		var beg1 = vsValue.indexOf("\"");
		var beg3 = beg1 + 1;
		var lengtht = beg2 - beg1 - 2;
		vsValue = vsValue.substr(beg3,lengtht);
	    }
  	  }
  	}

    //填入值,不允许事件触发；leidh; 20040526;
    if(tableName != getMainTableName()){
 	  	setField(vsDestFieldName, vsValue, tableName, false, true);
    	var vjElement = document.getElementById(tableName + "_" + vsDestFieldName + 'ID');
    	if (vjElement!= null) vajEventElement[vajEventElement.length]= vjElement;
      }
    else{
 	  	setField(vsDestFieldName, vsValue, getMainTableName(), false, true);
    	var vjElement = document.getElementById(getMainTableName() + "_" + vsDestFieldName + 'ID');
    	if (vjElement!= null) vajEventElement[vajEventElement.length]= vjElement;
    }
  }

  //因为从外部实体中填入一行数据时，在未填完的情况下，setField() 就会触发事件,
  //造成事件侦听者无法获取即将填入而尚未填入的信息;所以,先填完值,事件后触发.
  //触发事件；leidh; 20040526;
  if (!unfire)
  {
    for (var i= 0; i< vajEventElement.length; i++)
    {
      var vjElement= vajEventElement[i];
      vjElement.setAttribute("reselect","true");
      vjElement.fireEvent("onchange");
    }
  }
}

/**
 * @title 设置外部实体的值正确还是错误
 * @return none
 */
function setValueRight(tableName, fieldName, isRight){
  var id = document.getElementById(tableName + "_" + fieldName + "ID");
  if(isRight){
    id.setAttribute("isRight", "Y");
  }else{
    id.setAttribute("isRight", "N");
  }
}

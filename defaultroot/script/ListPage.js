// $Id: ListPage.js,v 1.14 2008/08/28 06:31:57 liuxiaoyong Exp $
	var vlPubBeginTime= (new Date()).getTime();


var delNumber = 0;
var fcall = null;
var pageNumber = 0;
var currentRowIndex = 0;
var subWindowName = new Array();
// 记录跨页选取列表页面记录的主键值
var selectedRowsVal = new Array();
//记录跨页选取记录的行对象
var selectedRowsObj = new Array();
//记录跨页选取记录的所有值
var selectedRowsAllVal = new Array();
//记录列表页面的字段的名称
var listPageFieldNames = new Array();
//高级搜索弹出菜单是否可见
var isSearchVisible = false;
//统计弹出菜单是否可见
var isStatVisible = false;
//高级搜索首次点击时状态
var searchFirstTime = false;
//统计处理首次点击时状态
var statFirstTime = false;
//是否做了设置高级搜索处理
var isSetSearchSchema = false;
//是否做了设置统计处理
var isSetStatSchema = false;
//设置搜索类型，默认为简单搜索
var searchType = "simpleSearch";
//设置高级搜索的条件
var searchCondition = null;
var vsOrderBy = null;

var msg;
var start = 1;
var control;

var _sDefSearchText= "输入要搜索的关键字";

function listPage_Call_Click(call){
	/*-----------------------------------------------------------------*/
	/*get operation info to be used in community.js (add by xjh 3.12)   */
	operationID = call;
 /*-----------------------------------------------------------------*/
	if (eval("typeof " + call + " ==\"function\"")){
		eval(call +"()");
	}else if (eval("typeof " + call + "F ==\"function\"")){
		var r1 = true;
		if (eval("typeof before_" + call + " ==\"function\""))
			r1 = eval("before_" + call + "()");
		if (r1)
			eval(call + "F(r1)");
	}else{
		var r2 = true;
		if (eval("typeof before_" + call + " ==\"function\""))
			r2 = eval("before_" + call + "()");
		if (r2){
			generalCall(call);
		}
	}
	operationID=null;//add by xjh 4.6
}

function flistimport(){
	var rows = getSelectedRows();
	var condition = "";
	for(var x = 0; x < rows.length; x++){
		var row = rows[x];
		var fieldValue = getRowField(row,"FIMP_TABLE");
		if( x == 0 ){
			condition += fieldValue;
		}else{
			condition += ",";
			condition += fieldValue;
		}
	}
	if(condition.length>0)
		win=open("listUpFileToDb.jsp" + "?table=" + condition);
	else
		win=open("listUpFileToDb.jsp");
}

function generalCall(call){
	var condition = null;
	var primaryFields = listPage_getPrimaryFields();
	var fieldsNo = primaryFields[0];
	var fieldsName = primaryFields[1];
	var fieldsType = primaryFields[2];
	condition = "<delta>";
	var hasSelected = false;
	for (var m=0,n=gridBodyTable.rows.length; m<n; m++){
		if (!gridBodyTable.rows[m].cells[1].firstChild.checked) continue;
		hasSelected = true;
		// <inline> 2004-6-8 TODO: 提取，处理 value 中的特殊字符
		condition += "<entity name=\"\">";
		for (var i = 0; i < fieldsNo.length; i++) {
			if (fieldsType[i].toLowerCase() == "valueset"){
				var vVal = gridBodyTable.rows[m].cells[fieldsNo[i]+COLUMN_OFFSET].innerHTML;
				vVal = packSpecialChar(vVal);
				var vi = vVal.indexOf(" ");
				if (vi > -1){
					vVal = vVal.substring(0,vi);
				}
				condition += "<field name=\"" + fieldsName[i] + "\" value=\""
								 + vVal +"\"/>";
			}
			else{
				var fieldValue = gridBodyTable.rows[m].cells[fieldsNo[i]+COLUMN_OFFSET].innerHTML;
				fieldValue = packSpecialChar(fieldValue);
				condition += "<field name=\"" + fieldsName[i] + "\" value=\""
									 + fieldValue +"\"/>";
			}
		}
		condition += "</entity>";
		// </inline>
	}
	condition += "</delta>";
	if (!hasSelected) return;
	var compoName = document.getElementById("entityMeta").getAttribute("entityName");
	var names = new Array();
	var values = new Array();
	names[0] = "pks";
	values[0] = condition;
	fcall = call;
	var com = getCommunity();
	if (com != null){
		com.doRequest(call + "_l",compoName,names,values,"generalCall_R");
	}
}

function generalCall_R(result){
	if (result.getAttribute("success") == "false"){
		alert(result.innerHTML);
	}else{
		if (eval("typeof after_" + fcall + " == \"function\"")){
			eval("after_" + fcall + "(result)");
		}
	}
}

function fdeleteF(){
	var metatemp = document.getElementById("entityMeta");
	var wftype = metatemp.getAttribute("wftype");
	var compoNM = metatemp.getAttribute("entityName");
	//zhangcheng 20041106
	if (wftype && "" != wftype &&"null"!=wftype && compoNM!="AS_LOG" && compoNM!="WF_WATCH" ) {
		alert("工作流方式的列表页面不允许删除，请到编辑页面中进行删除！");
		return;
	}
	var selectedRows = getSelectedMultiRows()
	//var selectedRows = getSelectedRows();wtm,20040714,操作日志跨页删除
	if (selectedRows.length == 0) return;
	if (compoNM=="WF_WATCH" ){
		if(!confirm("确定要删除吗，本操作将删除实例的所有信息及业务内容？")){
			return;
		}
	}
	var condition = null;
	var primaryFields = listPage_getPrimaryFields();
	var fieldsNo = primaryFields[0];
	var fieldsName = primaryFields[1];
	var fieldsType = primaryFields[2];
	condition = "<delta>";
	for (var m=0,n=selectedRows.length; m<n; m++){
	//wtm,20040714,操作日志跨页删除，采用全局变量，不用gridBodyTable
	//for (var m=0,n=gridBodyTable.rows.length; m<n; m++){
		//if (!gridBodyTable.rows[m].cells[1].firstChild.checked)
		 // continue;
		delNumber++;
		// <inline> 2004-6-8 TODO: 提取，处理 value 中的特殊字符
		condition += "<entity name=\"\">";
		for (var i = 0; i < fieldsNo.length; i++) {
			if (fieldsType[i].toLowerCase() == "valueset"){
				// HH 2004-6-8 13:47 从 innerHTML 修改为 innerText <mod>
				var vVal = selectedRowsAllVal[m][i];
				//wtm,20040714
				//var vVal = gridBodyTable.rows[m].cells[fieldsNo[i]+COLUMN_OFFSET].innerText;
				vVal = doubleApos(vVal);
				// </mod>
				var vi = vVal.indexOf(" ");
				if (vi > -1){
					vVal = vVal.substring(0,vi);
				}
				condition += "<field name=\"" + fieldsName[i] + "\" value=\""
								 + vVal +"\"/>";
			}else{
					if(compoNM =="WF_WATCH"){
			condition+= "<field name=\"USER\" value=\""+getListPageUserId()+"\"/>";
					}
				 condition +=  "<field name=\"" + fieldsName[i] + "\" value=\""+ selectedRowsAllVal[m][fieldsNo[i]] +"\"/>";//zhangcheng 20041106 selectedRowsAllVal[m][i]-->selectedRowsAllVal[m][fieldsNo[i]]
				 //如果先选定后取消，则记录删除数据数目的delNumber-1，用在fdeleteF_R(result)
				 if (!selectedRowsAllVal[m][i]){
					 delNumber--;
				}
				 //wtm,20040714
				//condition += "<field name=\"" + fieldsName[i] + "\" value=\""
				//           + gridBodyTable.rows[m].cells[fieldsNo[i]+COLUMN_OFFSET].innerHTML +"\"/>";
			}
		}
		condition += "</entity>";
		// </inline>
	}

	condition += "</delta>";
	var compoName = document.getElementById("entityMeta").getAttribute("entityName");
	var names = new Array();
	var values = new Array();
	names[0] = "data";
	values[0] = condition;
	names[1] = "pagename";
	values[1] = document.getElementById("uniqueID").getAttribute("value");
	var com = getCommunity();

	if (com != null){
		if(compoNM =="WF_WATCH"){
	names[0]="indata";
	names[1]="funcname";
	values[1]="delete";
	com.doRequest("wfCommon",compoName,names,values,"fwfWatchDeleteF_R");//fwfWatcjDeleteF_R定义于workflow.js中.
			}
		 else
		com.doRequest("delete",compoName,names,values,"fdeleteF_R");
	}
}

/**
 *获取当前列表页面的sUserId
 * @return
 */

function getListPageUserId(){
	var voHeadFrame=parent.frames["head"];
	var voUserId=null;
	if(voHeadFrame!=null)voUserId=voHeadFrame.document.getElementById("svUserID");
	return voUserId.getAttribute("value");

}
/**
 * 本函数由刘明书写，专用列表页面数据导出
 * 得到表格TITLE 的导出内容
 * @return
 */
function getheadExport(){
	var headObj=head.getElementsByTagName("table");
	var result;
	for(var i = 0; i < headObj.length; i++){
		if(i == 0){
			result= headObj[i].rows[0].cells[0].innerText;
			continue;
		}
		if(i == headObj.length-1){
			result+="\t"+headObj[i].rows[0].cells[0].innerText+"\n";
			continue;
		}
		result+="\t"+headObj[i].rows[0].cells[0].innerText;
	}
	return result;
}

/**
 * 此函数由刘明编写，2003-5-28，
 * 专用于列表页面的数据导出
 * @return
 */
function getRowData(row){
	var result;
	for(i=2;i<row.cells.length-1;i++){
		if(i==2){
			result= row.cells[i].innerText;
			continue;
		}
		if(i==row.cells.length-2){
      voValue = row.cells[i].innerText;
      if (voValue == null || voValue == "")
        voValue = "&nbsp;";
			result+="\t"+ voValue +"\n";
			continue;
		}
		result+="\t"+row.cells[i].innerText;
	}
	return result;
}

/**
 * 此函数由刘明编写，2003-5-28
 * 专用于获取GRID 区的数据，用于导出操作的数据
 * @return
 */
function getGridData(){
	var tbobj = gridBodyTable;
	var result = "";
	for(var j = 0; j < tbobj.rows.length; j++){
		result += getRowData(tbobj.rows[j]);
	}
	return result;
}

function fexport(){
	var data = getheadExport();
			data += getGridData();
	exportFrame.document.open("text/html","replace");
	exportFrame.document.charset="gb2312";
	exportFrame.document.writeln(data);
	exportFrame.document.close();
	exportFrame.focus();
	var filename = "export-"
	var dt = new Date();
  var month = (parseInt(dt.getMonth(),10)+1).toString(10);
  filename += dt.getYear() + "-" + month + "-"+dt.getDate();  // + ".xls";
	exportFrame.document.execCommand('SaveAs',false,filename);
}

function fdeleteF_R(result){

	if (result.getAttribute("success") == "false"){
		alert(result.innerHTML);
	}else{
		var tmpElement=document.getElementById("totalCountsID");
		if (tmpElement){
			tmpElement.innerHTML = parseInt(tmpElement.innerHTML) - delNumber;
			delNumber = 0;
		}
		for (var m=gridBodyTable.rows.length-1; m>=0; m--){
			if (gridBodyTable.rows[m].cells[1].firstChild.checked){

				//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040607;
				var viRowIndex= m;
				var vaiColWidth= new Array();
				if (viRowIndex== 0)
				{
					var vjFirstTR= gridBodyTable.rows[viRowIndex];
					for (var i= 0; i< vjFirstTR.childNodes.length; i++)
					{
						vaiColWidth[i]= vjFirstTR.childNodes[i].offsetWidth;
					}
				}

				gridBodyTable.deleteRow(gridBodyTable.rows[m].rowIndex);

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
			}
		}

		if (typeof after_fdelete == "function"){
			after_fdelete();
		}
	}
}

function gridRow_ClickF(rowIndex){
	var result = true;
	if (eval("typeof before_ListRow_Click ==\"function\""))
		result = before_ListRow_Click(rowIndex);
	if(result == false) return;
	var condition = listPage_getCurrentRecordCondition(rowIndex);
	if (condition == "") {
		alert("列表页中没有主键字段！");
	} else {
		currentRowIndex = rowIndex;
		 Query_ClickF(getEntityName(),condition,listPage_getPageFieldValue(rowIndex));
	}
}

function faddF(result) {
	//_HH <add>
	var wfType = document.getElementById("entityMeta").getAttribute("wfType");
	var template_id = null;


	if (wfType && "" != wfType && wfType != "null") {
		// TODO:
		//--template_id = window.prompt("请输入流程模板名称:", "");
		if (getEntityName().toUpperCase()=="WF_TODO"){
			template_id = getSelectedTemplateDatas("")[1]; //_hd
		}else{
      var default_wf_template=document.getElementById("entityMeta").getAttribute("defaultTemplate");
      var template_isused=document.getElementById("entityMeta").getAttribute("templateIsUsed");
      if (template_isused!="Y" || default_wf_template=="null"){
			   template_id = getSelectedTemplateDatas(wfType)[1]; //_hd
      }else{
         template_id=default_wf_template;
      }
		}
		//--dump(template_id);
		if (!template_id)
			return;
	}
	// </add>

	var names = new Array();
	var values = new Array();
	var fieldValue = null;
	var condition = new String("1=0"); //_hd
	if((result != null) && (result != true)){
		fieldValue = result[1][0];
		for(var i = 0; i < result[0].length; i++){
			names[names.length] = result[0][i];
			values[values.length] = result[1][i];
		}
	}else{
		var parentCompo = getParentCompoName();
		if((parentCompo != "null") && (parentCompo.length > 1)){
			fieldValue = parentCompo + "_E";
		}else{
			fieldValue = getEntityName() + "_E";
		}
	}
	if (getEntityName().toUpperCase() == "FA_CARD"){
		var win = showModalDialog("selectLb.htm","",
		"resizable:no;dialogHeight:200px;dialogWidth:300px;help:no");
		if (!win) return;
		fieldValue = win[0];
		fa = win;
	}
	Query_ClickF(getEntityName(), condition, fieldValue, names, values, template_id);
}


function Query_ClickF(entityname,condition,fieldvalue, names, values, template_id) {
	if (eval("typeof query_Click ==\"function\"")){
		eval("query_Click(\"" + entityname + "\",\""
			+ condition + "\",\"" + fieldvalue + "\")");
	}else{
		var unique = uniqueID.getAttribute("value");
		pageNumber++;
		var ds = (new Date()).toTimeString();

		///取工作流的数据
		var metatemp = document.getElementById("entityMeta");
		var wftype = metatemp.getAttribute("wftype");
		var pInstId="",activity_id="",workitem_id="";
		if(wftype && wftype != "null"){
			if (entityname=="WF_WATCH"){
				showInstanceTrace(getWFFieldValue(currentRowIndex,"WF_INSTANCE_ID"));
				return;
			}
			if (template_id){
				template_id = "&WF_TEMPLATE_ID=" + template_id;
			}
			else{
				var wfPkInfo = getWFPkInfo(currentRowIndex);
				if(wfPkInfo[0]){
					template_id = "&WF_TEMPLATE_ID=" + wfPkInfo[0];
				}else{
					template_id="";
				}
				if(wfPkInfo[1]){
					pInstId = "&WF_INSTANCE_ID=" + wfPkInfo[1];
				}
				if(wfPkInfo[2]){
					if(wfPkInfo[2]=="-9"){
						alert("抱歉,当前任务已经冻结,不能察看.\n如果您希望察看当前任务请找流程管理员激活当前实例");
						return ;
					}
					activity_id = "&WF_NODE_ID=" + wfPkInfo[2];
				}
				if(wfPkInfo[3])
					workitem_id = "&WF_TASK_ID=" + wfPkInfo[3];
			}

		}else{
			template_id = "";
		}

		var url;
		var condition=encodeParams("condition", condition);
		if (condition=="") condition="null";
		url = "Proxy?function=geteditpage&"
			+ condition
			+ template_id+pInstId+activity_id+workitem_id
		+ "&componame=" + entityname
		+ "&fieldvalue=" + fieldvalue
		+ "&unique=" + unique;
	var win_edit = open(url,"L" + unique + pageNumber,"menubar=no,scrollbars=no,status=yes,toolbar=no,"
  +"resizable=yes,titlebar=yes,scrollbars=yes," +"height=" + (screen.availHeight - 50)
  + ",width=" +(screen.availWidth - 10) + ",top=0,left=0");
		win_edit.ds = ds;
		win_edit.names = names;
		win_edit.values = values;
		subWindowName[subWindowName.length] = win_edit;
		winStatusContent();
		rtol();
    //win_edit.status = winStatusContent();
		win_edit.focus();
    //showProcessbar();

	vlPubBeginTime= (new Date()).getTime();
	}
}

function listPage_getCurrentRecordCondition(rowIndex) {
	var result = "";
	var doc = document.getElementById("entityMeta");
	var tableName = doc.getAttribute("tableName");
	var primaryFields = listPage_getPrimaryFields();
	var fieldsNo = primaryFields[0];
	var fieldsName = primaryFields[1];
	var fieldsType = primaryFields[2];
	for (var i = 0; i < fieldsNo.length; i++) {
		if (i != 0)
			result += " and ";
		// HH 2004-6-8 13:47 从 innerHTML 修改为 innerText <mod>
		var vVal = gridBodyTable.rows[rowIndex].cells[fieldsNo[i]+COLUMN_OFFSET].innerText;
		vVal = doubleApos(vVal);
		// </mod>
		if (fieldsType[i].toLowerCase() == "valueset"){
			vVal = gridBodyTable.rows[rowIndex].cells[fieldsNo[i]+COLUMN_OFFSET].firstChild.value;
		}
		result += tableName + "." + fieldsName[i] + "=";
		if (fieldsType[i].toLowerCase() == "num") {
			result += vVal;
		} else {
			result += "'" + vVal + "'";
		}
	}
	return result;
}

function listPage_getPageFieldValue(index) {
	var result = "";
	var meta = document.getElementById("entityMeta");
	var pageFieldName = meta.getAttribute("pageField");
	var fields = meta.getElementsByTagName("field");
	for (var i = 0, j = fields.length; i < j; i++) {
		var fieldName = fields.item(i).getAttribute("name");
		if (fieldName.toLowerCase() == pageFieldName.toLowerCase()) {
			var fieldNo = parseInt(fields.item(i).getAttribute("no")) + COLUMN_OFFSET;
			if (fields.item(i).getAttribute("type").toLowerCase() == "valueset"){
				var vVal = gridBodyTable.rows[rowIndex].cells[fieldsNo[i]+COLUMN_OFFSET].innerHTML;
				var vi = vVal.indexOf(" ");
				if (vi > -1){
					vVal = vVal.substring(0,vi);
				}
				result += tableName + "." + fieldsName[i] + "='" + vVal + "'";
			}
			else{
				result = gridBodyTable.rows[index].cells[fieldNo].innerHTML;
			}
			break;
		}
	}
	if (result == ""){
		var parentCompo = getParentCompoName();
		if((parentCompo != "null") && (parentCompo.length > 1)){
			result = parentCompo + "_E";
		}else{
			result = getEntityName() + "_E";
		}
	}
	return result;
}

function getTableName(){
	return document.getElementById("entityMeta").tableName;
}

function listPage_getPrimaryFields(){
	var result = new Array();
	var fieldsNo = new Array();
	var fieldsName = new Array();
	var fieldsType = new Array();
	var meta = document.getElementById("entityMeta");
	var fields = meta.getElementsByTagName("field");
	for (var i = 0, j = fields.length; i < j; i++) {
		fieldNo = fields.item(i).getAttribute("no");
		fieldName = fields.item(i).getAttribute("name");
		fieldType = fields.item(i).getAttribute("type");
		var pk = fields.item(i).getAttribute("pk");
		if (pk == "true") {
			arrayLength = fieldsNo.length;
			fieldsNo[arrayLength] = parseInt(fieldNo);
			fieldsName[arrayLength] = fieldName;
			fieldsType[arrayLength] = fieldType;
		}
	}
	result[0] = fieldsNo;
	result[1] = fieldsName;
	result[2] = fieldsType;
	return result;
}

function listPage_getFields(){
	var result = new Array();
	var fieldsNo = new Array();
	var fieldsName = new Array();
	var fieldsType = new Array();
	var meta = document.getElementById("entityMeta");
	var fields = meta.getElementsByTagName("field");
	for (var i = 0, j = fields.length; i < j; i++) {
		fieldNo = fields.item(i).getAttribute("no");
		fieldName = fields.item(i).getAttribute("name");
		fieldType = fields.item(i).getAttribute("type");
		var pk = fields.item(i).getAttribute("pk");
		fieldsNo[i] = parseInt(fieldNo);
		fieldsName[i] = fieldName;
		fieldsType[i] = fieldType;
	}
	result[0] = fieldsNo;
	result[1] = fieldsName;
	result[2] = fieldsType;
	return result;
}

function addBlankRowForSelect(){
	var row = gridBodyTable.insertRow(-1);
	row.style.color = "#000000";
	row.style.fontFamily = "MS Sans Serif";
	row.style.fontSize = "12px";
	row.onclick = gridRowClick;
	row.onmouseover = color_bh;
	row.onmouseout = color_re;
	row.onclick = gridRowClick;
	var cell = row.insertCell(-1);
	cell.style.width = 0;
	cell.innerHTML = "&nbsp;";
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
/*
* 取得跨页所选取的所有记录
*/
function getSelectedAllRows(){
	var result = new Array();
	for(var i = 0; i<selectedRowsObj.length; i++){
		if(selectedRowsObj[i] != null){
			var tr = addBlankRowForSelect();
			tr.style.display = "none";
			for(var j = 0; j<selectedRowsAllVal[0].length; j++){
					var td = tr.insertCell(-1);
					if(!selectedRowsAllVal[i][j])
						td.innerHTML = "";
					else
						td.innerHTML = selectedRowsAllVal[i][j];
			}
			result[result.length] = tr;
		}
	}
	return result;
}
function fhelpF(){
	var compoName = getEntityName();
	var metatemp = document.getElementById("entityMeta");
	var wftype = metatemp.getAttribute("wftype");
	var wfCompoName = metatemp.getAttribute("wfCompoName");
//  if(wftype && wftype != "null" && wfCompoName && wfCompoName != "null")
//  	compoName = wfCompoName;
	var subsys;
	if(compoName.indexOf("_")>0)  {
		subsys= compoName.substr(0, compoName.indexOf("_"));
	}else{
		subsys= compoName.substr(0,2);
	}
	if(subsys != "AS"){
		var win_help = open("/" + subsys + "/help/" + subsys + "/"
											+ compoName + ".htm", "anonymous",
											"menubar=no,status=no,toolbar=yes,"
											+ "resizable=yes,titlebar=yes,scrollbars=yes,"
											+ "height=" + (screen.availHeight - 30)*2/3 + ",width="
											+ (screen.availWidth - 460) + ",top=0,left=450");
  	win_help.focus();
	}else{
		var win_help = open("help/" + subsys + "/" + compoName + ".htm", "anonymous",
											"menubar=no,status=no,toolbar=yes,"
											+ "resizable=yes,titlebar=yes,scrollbars=yes,"
											+ "height=" + (screen.availHeight - 30)*2/3 + ",width="
											+ (screen.availWidth - 460) + ",top=0,left=450");
  	win_help.focus();
	}
}

function searchF(){
    closeMenu(event);
    clearSelectedRows();
	var entityName = getEntityName();
	var window_search;
	var foreign = null;
	var ignoreFields = "";
	var tablename = document.getElementById("entityMeta").getAttribute("tableName");
	if (document.getElementById(tablename + "ColTable")== null) return;
	var cols = document.getElementById(tablename + "ColTable").rows[0];
	for (var i = 2, l=cols.cells.length - 1;i<l; i++){
		var vjHeadFieldTD = document.getElementById(tablename + "_" + cols.cells[i].field + "Cell");
		if (vjHeadFieldTD.V_Hidden == true){
			ignoreFields = ignoreFields + cols.cells[i].field + ",";
		}
	}

	if(window.dialogArguments){
		foreign=dialogArguments;
	}
	var vasSearch = showModalDialog("dispatcher.action?function=searchPage&" +
																	"componame=" + entityName +
																	// 20040806 setListFieldVisible
																	"&ignoreFields=" + ignoreFields +
																	"&pageType=selectPage",foreign,
																	"resizable:no;status:no;help:no;dialogWidth:900px;dialogHeight:600px");

	//vasSearch= String[2];leidh;20040608;
	//var window_search= "";
	//var vsOrderBy= "";
	if (vasSearch== null) vasSearch= new Array("", "","","");
	//if (vasSearch.length>= 1) window_search= vasSearch[0];
	//if (vasSearch.length>= 2) vsOrderBy= vasSearch[1];
	if (vasSearch.length>= 1) this.searchCondition= vasSearch[0];
	if (vasSearch.length>= 2) this.vsOrderBy = vasSearch[1];
	//alert(searchCondition+vsOrderBy);
	isSetSearchSchema = vasSearch[2];
	var isExitSche = false;
    if(vasSearch[3] > 1)isExitSche = true;
   	updateImg("search",isExitSche)
	if(this.searchCondition == "ALL"){
		highSearchAll();
		return;
	}
	this.searchType = "advancedSearch";
	//alert(pageTypeID.value);
	//alert(document.body.innerHTML);
	
	simpleSearchK();
		//leidh;20051230;
		
	/**
  		if (pageTypeID!= null && pageTypeID.value== "selectPage"){
	    	disposeSearchCond();
	  	}
		var pageCond = "";
		var condId = document.getElementById("pageCondition");
		if(condId != null){
			pageCond = condId.getAttribute("value");
		}
		var names = new Array();
		var values = new Array();
		names[0] = "condition";
		if(condId != null && pageCond != "" && window_search != ""){
			values[0] = window_search + " and (" + pageCond + ")";
		}else if(condId != null && pageCond != ""){
			values[0] = pageCond;
		}else{
			values[0] = window_search;
		}
		//alert("condition==="+values[0]);

		if("function" == typeof getListCondition){
			var listCondition = getListCondition();
			if(values[0].length > 1){
				if((listCondition != null) && (listCondition != "")){
					values[0] += " and (" + listCondition + ")";
				}
			}else{
				values[0] = listCondition;
			}
		}
		//alert("condition==="+values[0]);

		names[1] = "OrderBy";
		values[1] = vsOrderBy;
		var com = getCommunity();
		if (com != null){
			names[2] = "pageType";
			values[2] = document.getElementById("pageTypeID").value;
			names[3] = "pageUniqueID";
			values[3] = uniqueID.getAttribute("value");
			names[4] = "sql";
			values[4] = window._sSelectSql==null?"":window._sSelectSql;
			com.doRequest("getSearchResult", getEntityName(), names, values, "search_refreshData");

	}
	*/
}

function search_refreshData(tableData,vtotalPage) {
	if (tableData.getAttribute("success") == "false")
		alert(tableData.innerHTML);
	else {
		deleteTableRows();
  		var totalPage = 1;
		var headNode = tableData.firstChild;
		var dataNode = headNode.firstChild;
		var pNode = dataNode.firstChild;


		var pagesBool = true, countsBool = true;
		while (pagesBool || countsBool){
			var pName = pNode.getAttribute("name");
			if((pName == "PAGES") || (pName == "TOTALCOUNTS")){
				if(pName == "PAGES"){
					totalPage = pNode.getAttribute("value");
					pageBool = false;
					var tmpNode = pNode.nextSibling;
					if(tmpNode == null)
						break;
					else
						pNode = tmpNode;
				}
				if(pName == "TOTALCOUNTS"){
					totalCounts = pNode.getAttribute("value");
					countsBool = false;
					var tmpNode = pNode.nextSibling;
					if(tmpNode == null)
						break;
					else
						pNode = tmpNode;
				}
			}
			else{
				var tmpNode = pNode.nextSibling;
				if(tmpNode == null)
					break;
				else
					pNode = tmpNode;
			}
		}

		headNode.removeChild(headNode.firstChild);
		addTableRows(headNode);
		var currentPage = 0;
		if (isNaN(totalPage)) totalPage = 0;
		if (totalPage != 0) currentPage = 1;
		setCurrentTotalPage(currentPage, totalPage);
		setTotalCounts(totalCounts);
		if(typeof after_Simple_Search == "function"){
			after_Simple_Search();
		}
	}
}

///打印模板设置，首先判断指定代码的打印模板是否存在，然后调用打印模板设置页面；
function fprn_tpl_setF(){
fdynamicPrintSet();
}

//进入fop模板设计器
function fopdesigner(entityName){
		var names = new Array();
		var values = new Array();
		names[0] = "prn_tpl_code";
		values[0] = entityName;
		var sdetaildelta=qryData("AS_GET_Prn_Tpl_Code",names,values);
		//showMessage(sdetaildelta);
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		xmldom.loadXML(sdetaildelta);
		var result = xmldom.documentElement;
		 if(result.getAttribute("success") == "false"){
				//出错处理
			alert("错误信息："+result.innerHTML);
			return;
		}else{
		if(result.hasChildNodes)
			newflag = false;
		else
			newflag = true;
		var win = window.open(BASE_URL+ "/prntemplate?prnTplName="+entityName+"&prnTplCode="+entityName+"&newflag="+newflag,"printTemplate",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
		}
}

/*
//进入jasperreport模板设计器
function jasperdesigner(entityName,tpl_code){
	var sqljpcode;
	var names = new Array();
	var values = new Array();
	names[0] = "componame";
	values[0] = getCompoName();//entityName.substring(0,entityName.length-2);
	names[1] = "sqljpcode";
	if (trim(tpl_code)!=""){
		sqljpcode=" and PRN_TPL_JPCODE='"+tpl_code+"'";
		values[1] = sqljpcode;
	}else{
		if (entityName.charAt(entityName.length-1)=="L"){
			values[1]= " AND (PRN_TPL_REPORTTYPE LIKE '%L')";
		}else if (entityName.charAt(entityName.length-1)=="E"){
			values[1]= " AND (PRN_TPL_REPORTTYPE LIKE '%E')";
		}else
			values[1]= "";
	}
	//设置时间延迟，有时
 // setTimeout("", 500);
	var sdetaildelta=qryData("AS_GET_PRINT_JASPERTEMP",names,values);
	//showMessage(sdetaildelta);
	if (!sdetaildelta ||  (sdetaildelta.substring(0,24)=="SYSTEM_EXCEPTION_MESSAGE")) {
		window.close();
		return;
		}
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(sdetaildelta);
	var result = xmldom.documentElement;
	var prn_compo_id;
	var prn_tpl_jpcode;
	var prn_tpl_name;
	var prn_tpl_reporttype;
	var prn_tpl_fixrowcount;
	var newflag=true;//数据库中存在为false，不存在为true
	if (result){
			if(result.getAttribute("success") == "false"){
				alert("错误信息："+result.innerHTML);
				return;
			}
			if (result.childNodes.length == 0) {
				prn_compo_id = entityName.substring(0,entityName.length-2);
				prn_tpl_jpcode=entityName;
				if (opener != null){
						doc= opener.document;
						if (doc){
							prn_tpl_name=doc.title;
						}
				}else
					prn_tpl_name=entityName;
				if (entityName.charAt(entityName.length-1)=="L"){
					prn_tpl_reporttype = "mainTable_L";
				}
				else if (entityName.charAt(entityName.length-1)=="E"){
					prn_tpl_reporttype = "mainTable_E";
				}
				prn_tpl_fixrowcount=0;
		}else{
			prn_compo_id=result.firstChild.firstChild.getAttribute("value");
			prn_tpl_jpcode=result.firstChild.firstChild.nextSibling.getAttribute("value");
			prn_tpl_name=result.firstChild.firstChild.nextSibling.nextSibling.getAttribute("value");
			prn_tpl_reporttype=result.firstChild.firstChild.nextSibling.nextSibling.nextSibling.getAttribute("value");
			prn_tpl_fixrowcount=result.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("value");
			newflag=false;
		}
	}else{
		prn_compo_id = entityName.substring(0,entityName.length-2);
		prn_tpl_jpcode=entityName;
		if (opener != null){
			doc= opener.document;
			if (doc){
				prn_tpl_name=doc.title;
			}
		}else
				 prn_tpl_name=entityName;
		if (entityName.charAt(entityName.length-1)=="L"){
			prn_tpl_reporttype = "mainTable_L";
		}else if (entityName.charAt(entityName.length-1)=="E"){
			prn_tpl_reporttype = "mainTable_E";
		}
		prn_tpl_fixrowcount=0;
	}
	var componameprn=entityName;
	var win = window.open("BASE_URL/prntempdesigner?componame="+prn_compo_id+"&prnTplName="+prn_tpl_name+"&prnTplCode="+prn_tpl_jpcode+"&reporttype="+prn_tpl_reporttype+"&newflag="+newflag+"&FIXROWCOUNT="+prn_tpl_fixrowcount+"&componameprn="+componameprn,"模板设计器",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
}

*/

function getCompoName(){
	return document.getElementById("entityMeta").getAttribute("entityName");
}
function getWfType(){
	return document.getElementById("entityMeta").getAttribute("wftype");
}
function getParentCompoName(){
	return document.getElementById("entityMeta").getAttribute("parentCompo");
}
//2004/07/01 zuodf 打印增加excel方式
function getPrintType(){
	return document.getElementById("entityMeta").getAttribute("printtype");
}
function getpagenameC(){
	return document.getElementById("pagenameC").getAttribute("value");
}


/**
 *
 */
function fprint(){
	var beforeF = true;
	if (eval("typeof before_fprint ==\"function\"")){
		beforeF = eval("before_fprint()");
	}
	if(!beforeF)
		return;

	var names = new Array();
	var values = new Array();
	var vasInfo = getPrintSetInfo();
	if(isNoTemplatePrint(vasInfo)){
		values[0] = "30,0,50,20,printer_title,n,打印人";
		values[1] = "70,0,80,20,printer,n," + getListSv("svUserName");
	}
	else{
		getAllListSV(names,values);
	}
	fprintStartL(vasInfo, names, values);
}

/**
 *
 */
function fprintStartL(vasInfo, names, values){
	if(isNoTemplatePrint(vasInfo)){
		printNoTemplate_L(vasInfo, names, values, 40, 40);
	}
	else{
		var printData = getPrintParameter("PrintData");
		if(printData){
			callEditPagePrintWithTpl(vasInfo, false);
		}else{
			var selectRows = getSelectedMultiRows();
			if(selectRows.length == 0){
				var tplCode = vasInfo["TplCode"];
			  var vsIsListPageTemplate = isListPageTemplate(tplCode);
		 	  if(!vsIsListPageTemplate)
		 	 	  callEditPagePrintWithTpl(vasInfo, false);
		 	  else
			 	  printWithTemplate_L(vasInfo, names, values);
			}else{
				callEditPagePrintWithTpl(vasInfo, true);
			}
		}
	}
}


function isListPageTemplate(tpl_code){
	var isListPageTemplate = true;
	if(!tpl_code)
		return !isListPageTemplate;
	if(tpl_code.indexOf(",") != -1){
		tpl_code = tpl_code.substring(0, tpl_code.indexOf(","));
	}
	var names = new Array();
	var values = new Array();
	names[0] = "componame";
	values[0] = getCompoName();
	names[1] = "sqljpcode";
	var sqljpcode = " AND PRN_TPL_JPCODE='"+tpl_code+"'";
	sqljpcode += " AND PRN_TPL_REPORTTYPE LIKE '%L'";
	values[1] = sqljpcode;
	var sdetaildelta=qryData("AS_GET_PRINT_JASPERTEMP",names,values);
	if(!sdetaildelta)
		return !isListPageTemplate;
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(sdetaildelta);

	var xmldata = xmldom.documentElement;
	if(!xmldata || xmldata.childNodes.length == 0)
		return !isListPageTemplate;
	var tplType = xmldata.firstChild.childNodes[3].getAttribute("value");
	if(!tplType)
		return !isListPageTemplate;
	if(tplType.substring(tplType.length - 2, tplType.length) == "_L")
		return isListPageTemplate;
	return !isListPageTemplate;
}


/**
 *
 */
function callEditPagePrintWithTpl(vasInfo, isSelectRows){
	var names = new Array();
	var values = new Array();
	names[names.length] = "TPL_CODE";
	values[values.length] = vasInfo["TplCode"];
	names[names.length] = "PRINT_DATA";
	values[values.length] = getPrintParameter("PrintData");
	if(!values[values.length - 1]){
		values[values.length - 1] = getListSelectPrintData();
	}
	names[names.length] = "EXPORT_TYPE";
	values[values.length] = vasInfo["ExportType"];
  names[names.length] = "componame";
  values[values.length] = getCompoName();
  var sDynamicTpl = getPrintParameter("DynamicTpl");
	if(sDynamicTpl == "1"){
		names[names.length] = "DynamicTpl";
		values[values.length] = "1";
	}
	var continuePrint = getPrintParameter("ContinuePrint");
  if(continuePrint){
  	names[names.length] = "ContinuePrint";
  	values[values.length] = continuePrint;
  }
	if(!getPrintParameter("PrintData")){
		names[names.length] = "CONTINUE_CONDITION";
	  if(isSelectRows)
	  	values[values.length] = getContinuePrintCondition();
	  else
	  	values[values.length] = "NO_SELECTED_ROWS";
  }

  var childTableName = getPrintParameter("ChildTableName");
  if(childTableName){
  	names[names.length] = "ChildTableName";
  	values[values.length] = childTableName;
  }
  printWithTemplate(vasInfo, names, values);
}


function getListSelectPrintData(){
	var result = "";
	var selectRows = getSelectedMultiRows();
	if(selectRows.length == 0){
		result = "<template><delta></delta></template>";
		return result;
	}
	var fieldNames = listPage_getFields()[1];
	for (var i = 0; i < selectRows.length; i ++ ){
		result += "<template>\n";
		result += "<delta>\n";
		result += "<entity name = \"head\">\n";
		for(var j = 0; j < fieldNames.length; j++){
			var fieldValue = getMultiRowField(selectRows[i], fieldNames[j]);
			if(fieldValue == null){
				fieldValue = "";
			}
			result += "<field name=\""+fieldNames[j]+"\" value=\""+fieldValue+"\" />\n";
 		}
 		result += "</entity>\n";
 		result += "</delta>\n";
 		result += "</template>\n";
  }
  //showMessage(result)
  return result;
}


function getContinuePrintCondition(){
	var result = new Array();
	var doc = document.getElementById("entityMeta");
	var tableName = doc.getAttribute("tableName");
	var primaryFields = listPage_getPrimaryFields();
	var fieldsNo = primaryFields[0];
	var fieldsName = primaryFields[1];
	var fieldsType = primaryFields[2];
	var selectRows = getSelectedMultiRows();
	for(var i = 0; i < selectRows.length; i++){
		var condition = "";
		var selectRow = selectRows[i];
		for (var j = 0; j < fieldsNo.length; j++) {
			if (j != 0)
				condition += " and ";
			var vVal = getMultiRowField(selectRow, fieldsName[j]);
			vVal = doubleApos(vVal);

			if (fieldsType[j].toLowerCase() == "valueset"){
				var vsVal = getListPageVSvalue(i, fieldsNo[j]);

				vVal = !vsVal ? vVal : vsVal;
			}
			condition += tableName + "." + fieldsName[j] + "=";
			if (fieldsType[j].toLowerCase() == "num") {
				condition += vVal;
			} else {
				condition += "'" + vVal + "'";
			}
		}
		result[i] = condition;
	}
	return result;
}

function getListPageVSvalue(selectRowNo, fieldNo){
	var result = null;
	var selectedRowsObj = getSelectedRowsObj();
	if(!selectedRowsObj || selectedRowsObj.length == 0)
		return result;
	if(!selectedRowsObj[selectRowNo])
		return result;
	var rowStr = selectedRowsObj[selectRowNo];
	if(!rowStr)
		return result;
	fieldNo = fieldNo + COLUMN_OFFSET;
	while(fieldNo-- > 0)
		rowStr = rowStr.substring(rowStr.indexOf("</TD>") + 5);
	rowStr = rowStr.substring(0, rowStr.indexOf("</TD>") + 5);
	rowStr = rowStr.replace(/&nbsp;/g, " ");
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(rowStr);
	var tr = xmldom.documentElement;
	if(!tr)
		return result;
	if(tr.lastChild)
		if(tr.lastChild.lastChild)
			result = tr.lastChild.lastChild.xml;
	return result;
}

function getSelectedRowsObj(){
	return selectedRowsObj;
}

//底层列表页面采用编辑页面打印方式，其他应用中打印调用fprintSetE(param,names,values)即可
function fprintStartE(param,names,values){
	if (param[1]=="jasperreport"){
		if (param[2]=="notemplate"){
				printNoTemplate_L(values,40,40);
		}else
		{if (param[2]=="template"){
				var com = getPageCommunity();
				if (com != null){
					com.doRequestPage("editprint",getCompoName(),names,values,"printpg_e");
					}
			}
		}
	}
	else{
		if (param[1]=="fop"){
			//2004/07/01 zuodf 打印增加excel方式
			var printtype=getPrintType();
			if (printtype=="0")   //pdf打印
			{
				var com = getPageCommunity();
				if (com != null){
				com.doRequestPage("fprint",getCompoName(),names,values,"printpg");
				}
			}
			else {
				var templatefile=getpagenameC();
				var win = window.open("printExcelFactory?printtype="+printtype+"&TPL_CODE="+values[0]+"&componame="+getCompoName()+"&templatefile="+templatefile,"printExcelTemplate",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
			}
		}
	}
}
/*
function getAllListSV(names,values){
	var svSpan;
	var winName = window.name;
	if(winName == "main" || opener == null){
		svSpan = top.head.document.getElementById("listSession");
	}else{
		svSpan = opener.window.top.head.document.getElementById("listSession");
	}
	if(svSpan){
		var nodes = svSpan.childNodes;
		for(var i=0,j=nodes.length; i<j; i++){
			var spanEle = nodes.item(i);
			var sessionName = spanEle.id;
			var sessionValue = spanEle.getAttribute("value");
			names[names.length] = sessionName;
			values[values.length] = sessionValue;
		}
	}
}
*/
function getAllListSV(names,values){
	/*
	var svSpan;
	var winName = window.name;
	if(winName == "main" || opener == null){
		svSpan = top.head.document.getElementById("listSession");
	}else{
		svSpan = opener.window.top.head.document.getElementById("listSession");
	}
	*/
	var svSpan = document.getElementById("sessionParam");
	if(svSpan){
		var nodes = svSpan.childNodes;
		for(var i=0,j=nodes.length; i<j; i++){
			var spanEle = nodes.item(i);
			var sessionName = spanEle.getAttribute("name");//spanEle.id;
			var sessionValue = spanEle.getAttribute("value");
			names[names.length] = sessionName;
			values[values.length] = sessionValue;
		}
	}
}


function getListSv(fieldName){
	var winName = window.name;
	if(winName == "main" || opener == null){
	  if (!top.head.document.getElementById(fieldName)) return "";
		return top.head.document.getElementById(fieldName).getAttribute("value");
	}else{
		return opener.window.top.head.document.getElementById(fieldName).getAttribute("value");
	}
}


function setFuncDisabled(funcName, isDisabled){
	//isDisabled为true，表示不允许
 try{
		var doc = document.getElementById(funcName + "ID");
		if(doc != null){
			 doc.disabled = isDisabled;
			 call_editPageMouseOut(funcName);
		}
	}catch(e){
	}
}

function getRowsLength(){
	return gridBodyTable.rows.length;
}

//不再使用
function simpleSearch_1(){
  //alert("simpleSearch();");
  clearSelectedRows();
	var condition = "";
	var doc = document.getElementById("entityMeta");
	var tableName = doc.getAttribute("tableName");
	
  //leidh;20051230;
	if (pageTypeID!= null && pageTypeID.value== "selectPage"){
	  disposeSearchCond();
	}
	//即使是全部返回,也要加上相应的页面条件;leidh;20040420;
	var vjPageCondObj= document.getElementById("pageCondition");
	if (vjPageCondObj!= null) condition= vjPageCondObj.getAttribute("value");
	if(document.getElementById("searchStartDate") != null){
		var start = document.getElementById("searchStartDate").getAttribute("value");
		var end = document.getElementById("searchendDate").getAttribute("value");
		var dateField = document.getElementById("entityMeta").getAttribute("dateField");
		if(start != null && start != ""){
			if(!search_date_Check(start))
				 return false;
			else {
				condition += tableName + "." + dateField + ">='" + start + "'";

			}
		}
		if(end != null && end != ""){
			 if(search_date_Check(end)){
				if(condition.length > 1)
					 condition += " and ";
					 condition += tableName + "." + dateField + "<='" + end + "'";
				}else
					return false;
		}
	}

	if(doc.getAttribute("valsetField") != "null"){
		var valsetField = doc.getAttribute("valsetField");
    var fieldNames = valsetField.split(",");
    for(var i = 0; i < fieldNames.length; i++){
      var fieldName = trim(fieldNames[i]);
			var valset = document.getElementById("valset_" + fieldName);
      if(valset == null) break;
			var valueTmp = valset.options[valset.selectedIndex].value;
			if(valueTmp != "ALL"){
				if(condition.length > 1){
					condition += " and ";
				}
				condition += tableName + "." + fieldName + "='" + valueTmp + "'";
			}
    }
	}

	if(document.getElementById("matchValue") != null){
  	//leidh;20060716;
	  var fieldCondition= "";
  	var matchValue = trim(document.getElementById("matchValue").getAttribute("value"));
    if ((window._sSelectSql!=null && window._sSelectSql!= "")){
      for (var x= 0; x< doc.childNodes.length; x++){
        if (fieldCondition!= ""){
          fieldCondition+= " or ";
        }
        fieldCondition+= doc.childNodes[x].getAttribute("name")+ " like '%"+ matchValue+ "%'";
      }
    }else{
			var fields = doc.getElementsByTagName("field");
			if(matchValue != null && matchValue != "" && matchValue != _sDefSearchText){
        var condnames = new Array();
        var condvalues = new Array();
        condnames[0] = "compoName";
        condvalues[0] = getCompoName();
        condnames[1] = "mValue";
        condvalues[1] = matchValue;
        var voData = requestData("getSimpleSearchCondition", "all", condnames, condvalues);
        if(voData && voData.text){
          fieldCondition = "( " + voData.text + ")";
        }

/*
				var fieldCondition = "("
				for (var i = 0, j = fields.length; i < j; i++) {
					var save = fields.item(i).getAttribute("save");
					var name = fields.item(i).getAttribute("name");
					if(save == "y"){
						if(fieldCondition.length == 1)
							fieldCondition += tableName + "." + name + " like '%" + matchValue + "%'";
						else
							fieldCondition += " or " + tableName + "." + name + " like '%" + matchValue + "%'";
					}
				}
				fieldCondition += ")";
*/
			}
		}
		if (fieldCondition!= null && trim(fieldCondition)!= ""){
    	if(condition.length > 1)
  	  	condition += " and " + fieldCondition;
  		else
  			condition = fieldCondition;
		}
	}

	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(condition.length > 1){
			if((listCondition != null) && (listCondition != "")){
				condition += " and (" + listCondition + ")";
			}
		}else{
			condition = listCondition;
		}
	}

	//leidh;20060716;
	/*
  if ((window._sSelectSql!=null && window._sSelectSql!= "")){
    var r = new RegExp(tableName + "\.", "g");
    condition = condition.replace(r, "");
  }
  //*/
	
	var names = new Array();
	var values = new Array();
	names[0] = "condition";
	values[0] = condition;
//	if (getEntityName()=="WF_WATCH"){
//		 values[0] = document.getElementById("valset_WF_TEMPLATE_ID").value;
//	}
	var com = getCommunity();
	if (com != null){
		names[1] = "pageType";
		values[1] = document.getElementById("pageTypeID").value;
		names[2] = "pageUniqueID";
		values[2] = uniqueID.getAttribute("value");
		if(document.getElementById("searchStartDate") != null){
			var startTime = document.getElementById("searchStartDate").getAttribute("value");
			var endTime = document.getElementById("searchendDate").getAttribute("value");
			names[3] = "startTime";
			values[3] = startTime;
			names[4] = "endTime";
			values[4] = endTime;
		}
		names[5] = "sql";
		values[5] = window._sSelectSql==null?"":window._sSelectSql;
		com.doRequest("getSearchResult", getEntityName(), names, values, "search_refreshData");

	}
}

function Date_Select(id){
	var src=document.getElementById(id);
	if (!isSearchPage && !src.isContentEditable) return;
	autoDateInput(src);
}

function getValsetValue(fieldName){
  	var tmpFieldName;
  	if(!fieldName){
    		var valsetField = document.getElementById("entityMeta").getAttribute("valsetField");
    		var fieldNames = valsetField.split(",");
    		tmpFieldName = trim(fieldNames[0]);
  	}else{
    		tmpFieldName = fieldName;
  	}
	var valset = document.getElementById("valset_" + tmpFieldName);
	var value = valset.options[valset.selectedIndex].value;
	return value;
}

function getValsetName(fieldName){
  	var tmpFieldName;
  	if(!fieldName){
    		var valsetField = document.getElementById("entityMeta").getAttribute("valsetField");
    		var fieldNames = valsetField.split(",");
    		tmpFieldName = trim(fieldNames[0]);
  	}else{
    		tmpFieldName = fieldName;
  	}
	var valset = document.getElementById("valset_" + tmpFieldName);
	var value = valset.options[valset.selectedIndex].text;
	return value;
}

function setValsetOption(index, array, fieldName){
  var tmpFieldName;
  if(!fieldName){
    var valsetField = document.getElementById("entityMeta").getAttribute("valsetField");
    var fieldNames = valsetField.split(",");
    tmpFieldName = trim(fieldNames[0]);
  }else{
    tmpFieldName = fieldName;
  }
	var valset = document.getElementById("valset_" + tmpFieldName);
	valset.options.length = index + 1;
	for(var i = 0; i < index; i++){
		var blankIndex = array[i].indexOf(" ");
		var id = array[i].substr(0, blankIndex);
		var text = array[i].substr(blankIndex + 1);
		valset.options[i].value = id;
		valset.options[i].text = text;
	}
	valset.options[index].value = "ALL";
	valset.options[index].text = "全部";
  simpleSearch();
}

function valset_Change(){
	if(eval("typeof Valset_Change == \"function\"")){
		Valset_Change();
	}
	simpleSearch();
}
/**
* 根据行号返回行对象
* index:行号(从0开始)
* return:行对象
*/
function getRowByIndex(index1){
	var table = document.getElementById("gridBodyTable");
	return table.rows[index1];
	}
/**
*返回当前列表页面行数.
*return:当前列表页面的行数.
*/
function getRowNum(){
	var table = document.getElementById("gridBodyTable");
	return table.rows.length;
}
/**
* 取得列表页面字段值
* row:所取字段所在的行;
* fieldName:所取字段名
* return:字段值
*/
function getListPageField(row,fieldName){
	var bodyTable = document.getElementById("gridBodyTable");
	var head = document.getElementById("head");
	var value = "";
	var entity = document.getElementById("entityMeta");
	var fieldType;
	var isKilo;
	var col = -1;
	for(var i = 2; i < head.rows[0].cells.length - 1; i++){
		var cell = head.rows[0].cells[i];
		var fieldCell = cell.firstChild.firstChild.firstChild.firstChild.firstChild;
		var fieldname = fieldCell.getAttribute("field");
		if(fieldName == fieldname){
			col = i;
			break;
		}
	}
	var childs = entity.childNodes;
	for( var j = 0; j < childs.length; j++){
		var child = childs.item(j);
		if (child.getAttribute("name") == fieldName ){
			fieldType = child.getAttribute("type");
			isKilo = child.getAttribute("isKiloStyle");
		}
	}
	if( col != -1){
		value = row.cells[col].innerHTML;
		if (fieldType == "ValueSet" ){
			var blankIndex = value.indexOf(" ");
			if(blankIndex > 0){
				value = value.substring(0,blankIndex);
			}
			if (value.length == 0){ value = " "; }
		}else if (fieldType == "Num" ){
			if(value.length == 0)
				 value = 0;
			else {
				if (isKilo == "true"){
					 value = deleteComma(value);
				 }
			}
		}
	}else{
		 alert("没有" + fieldName + "字段");
	}
	return value;
}

function setListPageRowBgColor(index, color){
	gridBodyTable.rows[index].style.backgroundColor = color;
}

function getListAllRows(){
	return document.getElementById("gridBodyTable");
}
/**
*统计查询
*/
function statSearch(){
	closeMenu(event);
	var entityName = getEntityName();
	var window_search;
	var foreign=null;
	if(window.dialogArguments){
		foreign=dialogArguments;
	}
	window_search = showModalDialog("Proxy?function=getStatSearchPage" +
																	"&componame=" + entityName +
																	"&pageType=listPage",foreign,
																	"resizable:no;status:no;help:no;dialogHeight:600px;dialogWidth:900px;");
	if (window_search){
	  var vsLastCond= ""; //leidh;20060725;
		var length = window_search.length;
		var isExitStatSche = false;
		if(length == 2){
		    if(window_search[0] > 1)
		    	isExitStatSche = true;
			isSetStatSchema = window_search[1]
		  	window_search = null;
		}
	if (window_search) {
		    if(window_search[6] > 1)
		    	isExitStatSche = true;
		var returnR = new Array();
		returnR[0] = window_search[0];
		returnR[1] = window_search[1];
		returnR[2] = window_search[2];
		returnR[3] = window_search[3];
 		returnR[4] = window_search[4];
	 		isSetStatSchema = window_search[5]
		var pageCond = "";
		var condId = document.getElementById("pageCondition");
		if(condId != null){
			pageCond = condId.getAttribute("value");
		}
		if(condId != null && pageCond != ""){
			returnR[1] += " and (" + pageCond + ")";
		}
	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(returnR[1].length > 1){
			if((listCondition != null) && (listCondition != "")){
				returnR[1] += " and (" + listCondition + ")";
				}
			}else{
				returnR[1] = listCondition;
			}
		}
		
		vsLastCond= returnR[1]; //leidh;20060725;
		
		var names = new Array();
		var values = new Array();
		names[0] = "condition";
		var conditionValue = "";
		var tableName = document.getElementById("entityMeta").getAttribute("tableName");
		if(returnR[0].length !=0){
			conditionValue += "select " + returnR[0];
		}
		else{
			conditionValue += "select *"
		}
		conditionValue += " from " + tableName;
		if(returnR[1].length != 0){
			conditionValue += " where " + returnR[1];
		}
		if(returnR[2].length !=0){
			conditionValue += " group by " + returnR[2];
		}
		if(returnR[3].length !=0){
			conditionValue += " order by " + returnR[3];
		}
		values[0] = conditionValue;
		//alert(conditionValue);
		conditionValue = escapeSpecial(conditionValue);
		var compoName = document.getElementById("entityMeta").getAttribute("entityName");
		
		conditionValue= vsLastCond; //leidh;20060725;
		conditionValue = escapeSpecial(conditionValue);
		win = open("Proxy?function=statSearchDataToPage" +
																	"&componame=" + compoName +
                                  "&kilocol=" + returnR[4] +
																	"&condition=" + conditionValue+
																	"&orderBy=" + returnR[3]+
																	"&groupBy=" + returnR[2]+
																	"&groupList=" + returnR[0],
																	"",
																	"resizable=no,status=no,help=no,"
													                + "height=" + 380 + ",width="+ 450+",top=180,left=250");
		}
		updateImg("stat",isExitStatSche);
	}
}

function directStatSearch(statSearchSelect){
	var entityName = getEntityName();
	var window_search;
	var foreign=null;
	//var defaultCon = document.getElementById("condition_id").value;
	var tableName = document.getElementById("entityMeta").getAttribute("tableName");

	if(window.dialogArguments){
		foreign=dialogArguments;
	}
	var names = new Array();
  	var values = new Array();
  	var window_search = new Array();
  	names[0] = "compoId";
  	names[1] = "userId";
  	names[2] = "schemaName";
  	names[3] = "tableName";
  	values[0] = document.getElementById("compo_id").value;
  	values[1] = document.getElementById("svUserID").value;
  	values[2] = statSearchSelect;
  	values[3] = tableName;
  	var search = requestDataK("getSQLByDelta", values[0], names, values);
	var fieldValues = search.split("!#$");
	for(var i=1;i<fieldValues.length - 1;i++)
	    window_search[i-1] = trim(fieldValues[i]);
	/*if(trim(window_search[1]) != "" && defaultCon != "" &&defaultCon != "null")
	    window_search[1] +=  " and (" + defaultCon + ")";
	if(trim(window_search[1]) == "" && defaultCon != "" && defaultCon != "null")
		window_search[1] =  "(" + defaultCon + ")"; */
	if (window_search) {
		var returnR = new Array();
		returnR[0] = window_search[0];
		returnR[1] = window_search[1];
		returnR[2] = window_search[2];
		returnR[3] = window_search[3];
 		returnR[4] = window_search[4];
		var pageCond = "";
		var condId = document.getElementById("pageCondition");
		if(condId != null){
			pageCond = condId.getAttribute("value");
		}
		if(condId != null && pageCond != ""){
			returnR[1] += " and (" + pageCond + ")";
		}

	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(returnR[1].length > 1){
			if((listCondition != null) && (listCondition != "")){
				returnR[1] += " and (" + listCondition + ")";
			}
		}else{
			returnR[1] = listCondition;
		}
	}
		var names = new Array();
		var values = new Array();
		names[0] = "condition";
		var conditionValue = "";
		if(returnR[0].length !=0){
			conditionValue += "select " + returnR[0];
		}
		else{
			conditionValue += "select *"
		}
		conditionValue += " from " + tableName;
		if(returnR[1].length != 0){
			conditionValue += " where " + returnR[1];
		}
		if(returnR[2].length !=0){
			conditionValue += " group by " + returnR[2];
		}
		if(returnR[3].length !=0){
			conditionValue += " order by " + returnR[3];
		}
		values[0] = conditionValue;
		//alert(conditionValue);
		conditionValue = escapeSpecial(conditionValue);
		var compoName = document.getElementById("entityMeta").getAttribute("entityName");
		win = open("Proxy?function=statSearchDataToPage" +
																	"&componame=" + compoName +
                                  "&kilocol=" + returnR[4] +
																	"&condition=" + //conditionValue+
																	"&orderBy=" +
																	"&groupBy=" + 
																	"&groupList=",
																	"",
																	"resizable=no,status=no,help=no,"
													                + "height=" + 380 + ",width="+ 450+",top=180,left=250");
	}
}

function ftxtexportF(){
	blankVals = 0;
	for (var i=0; i<selectedRowsVal.length; i++){
		if (selectedRowsVal[i][0] == null || selectedRowsVal[i][0] == ""){
			blankVals++;
		}
	}

	var names = new Array();
	var values = new Array();
	names[0] = "compoId";
	values[0] = getCompoName();
	names[1] = "tableId";
	values[1] = document.getElementById("entityMeta").getAttribute("tableName");
	names[2] = "data";
	if (selectedRowsVal.length-blankVals == 0){
    if(confirm("导出所有数据吗？")){
      values[2] = "<delta></delta>\n";
    }else{
      alert("请先选择需要导出的数据！");
      return;
    }
	}else{
  	values[2] = getExportData();
	}
	var com = getCommunity();
	if (com != null){
		com.doRequest("ftxtexport",getCompoName(),names,values,"");
	}
}

function getExportData(){
	var pkFields = listPage_getPrimaryFields();
	var pkFieldNames = pkFields[1];
	var data = "";
	for (var i=0; i<selectedRowsVal.length; i++){
		if (selectedRowsVal[i][0] == null || selectedRowsVal[i][0] == ""){
			continue;
		}
		data += "<entity>\n";
		for (var j=0; j<pkFieldNames.length; j++){
			data += "<field name=\"" + pkFieldNames[j] + "\" ";
			data += "value=\"" + selectedRowsVal[i][j] + "\"/>\n";
		}
		data += "</entity>\n";
	}
	data = "<delta>\n" + data + "</delta>\n";
	return data;
}

function setListFieldVisible(fieldname, isVisible){
	tablename = document.getElementById("entityMeta").getAttribute("tableName");
	if (isVisible){
		disp = "";
	}
	else{
		disp = "none";
	}

	var tCell = document.getElementById(tablename + "_" + fieldname + "Cell");
	if (!tCell){
		 return;
	}
	tCell.style.display = disp;
	tCell.U_Hidden = !isVisible;

	document.getElementById(tablename + fieldname + "COL").style.display = disp;
/*
	colNo = 0;
	var gridCol = document.getElementById("entityMeta").childNodes;
	for (var i=0; i<gridCol.length; i++){
		if (gridCol[i].name == fieldname){
			colNo = i+2;
		}
	}
	var grid = document.getElementById("gridBodyTable");
	for (var i=0; i<grid.rows.length; i++){
		grid.rows[i].cells[colNo].style.display = disp;
	}
*/
	colResize(tablename);
}

/* 2004-08-04 zhangys 搜索框焦点事件，获得焦点清空内容 */
function matchValue_Focus(){
	if(event.srcElement.value == _sDefSearchText){
		event.srcElement.value = '';
	}
}

function matchValue_KeyPress(){
	 if (event.keyCode == 13){
		 simpleSearch();
	 }
}

/* 2005/09/23 fuwb 高级搜索，统计框焦点事件，失去焦点清空内容 */
function matchValue_Blur(){
	if(event.srcElement.value == ''){
		event.srcElement.value = _sDefSearchText;
	}
}

/**
 * 双击页面上得搜索框，清空内容。wtm，20040913
 */
function matchValue_DblClick(){
	 event.srcElement.value = '';
}


/*修改列表页面的列名,wtm,20040807
*/
function setListFieldCaption(fieldName, value){
		var tableName = entityMeta.getAttribute("tableName");
		var cellId = document.getElementById(tableName + "_" + fieldName + "Cell");
		cellId.firstChild.firstChild.firstChild.firstChild.firstChild.innerHTML = value;
}

/**
*判断列表页面搜索日期是否填写正确。wtm,20040817
*/
function search_date_Check(value){
		var value = value;
		if (value == "") return true;
		result = true;
		first = value.indexOf("-");
		last = value.lastIndexOf("-");
		x1 = value.indexOf("/");
		x2 = value.lastIndexOf("/");
		var fir,sec;
		if (first == -1) {
			sec = x2;
			fir = x1
		} else if (x1 == -1) {
			sec = last;
			fir = first;
		} else if (x1 >first) {
			sec = x1;
			fir = first;
		} else {
			sec = first;
			fir = x1;
		}
		var year,month,day;
		year = parseInt(value.substring(0,fir));
		if (!( year >= 1949 && year <= 2025)){
			alert("日期格式无效！请输入正确的日期！");
			return false;
		}
		//日期录入-08-99，保存时报错。wtm,20040809
		month = parseInt(value.substring(fir+1,sec),10);
		if (!( month >= 0 && month<= 12)){
			alert("日期格式无效！请输入正确的日期！");
			return false;
		}
		day = parseInt(value.substring(sec+1,value.length));
		var daysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
		if (((year % 4 ==0)&&(year % 100 !==0))||(year % 400 ==0))//闰年
			daysOfMonth[1] = 29;
		if (day > daysOfMonth[month-1]) {
			alert("日期格式无效！请输入正确的日期！");
			return false;
		}
		if(fir == sec){
			alert("日期格式无效！请输入正确的日期！");
				return false;
		}
		return true;
}

function hideForeignFields(fields){
	tablename = document.getElementById("entityMeta").getAttribute("tableName");
	for(i=0,l=fields.length; i<l; i++){
		fieldname = fields[i];
		var tCell = document.getElementById(tablename + "_" + fieldname + "Cell");
		if (!tCell){
			 return;
		}
		tCell.style.display = "none";
		tCell.U_Hidden = true;
		document.getElementById(tablename + fieldname + "COL").style.display = "none";
	}
	colResize(tablename);
}
/*
 *获取表格固定行数
 */
function getFixRowCount(tpl_code){
	var sqljpcode;
	var names = new Array();
	var values = new Array();
	names[0] = "componame";
	values[0] = getCompoName();
	names[1] = "sqljpcode";
	if (trim(tpl_code)!=""){
		sqljpcode=" and PRN_TPL_JPCODE='"+tpl_code+"'";
		values[1] = sqljpcode;
	}
	var sdetaildelta=qryData("AS_GET_PRINT_JASPERTEMP",names,values);
	//showMessage(sdetaildelta);
	if (!sdetaildelta ||  (sdetaildelta.substring(0,24)=="SYSTEM_EXCEPTION_MESSAGE")) {
		window.close();
		return;
	}
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(sdetaildelta);
	var result = xmldom.documentElement;
	var prn_tpl_fixrowcount;
	if (result){
			if(result.getAttribute("success") == "false"){
				alert("错误信息："+result.innerHTML);
				return;
			}
			if (result.childNodes.length == 0) {
				prn_tpl_fixrowcount=0;
			}
			else{
				prn_tpl_fixrowcount=result.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("value");
			}
	}
	else{
		prn_tpl_fixrowcount=0;
	}
	return prn_tpl_fixrowcount ;
}

/**
*状态栏显示信息。wtm。20041228
*/
function winStatusContent(){
  var result = "";
  if (!opener){
    result = "单位代码:" + getListSv("svCoCode") + "  ";
    result += "单位名称:" + getListSv("svCoName") + "  ";
   	var svOrgCode = getListSv("svOrgCode");
  	if(svOrgCode != null){
  		result += "内部机构代码:" + svOrgCode + "  ";
  	}
  	var svOrgName = getListSv("svOrgName");
  	if(svOrgName != null){
  		result += "内部机构名称:" + svOrgName + "  ";
  	}
  	var svAccountId = getListSv("svAccountId");
  	if(svAccountId != null){
  		result += "帐套代码:" + svAccountId + "  ";
  	}
    var ACCOUNT_NAME = getListSv("ACCOUNT_NAME");
    if(ACCOUNT_NAME != null){
      result += "帐套名称:" + ACCOUNT_NAME + "  ";
    }
    var transDateId = getListSv("svTransDate");
    if(transDateId != null){
      result += "业务日期:" + transDateId + "  ";
    }
    var svFiscalYear = getListSv("svFiscalYear");
    if(svFiscalYear != null){
      result += "会计年度:" + svFiscalYear + "  ";
    }
    var svFiscalPeriod = getListSv("svFiscalPeriod");
    if(svFiscalPeriod != null){
      result += "会计期间:" + svFiscalPeriod + "  ";
    }
    var svNd = getListSv("svNd");
    if(svNd != null){
      result += "年度:" + svNd + "  ";
    }
    var svRpType = getListSv("svRpType");
    if(svRpType != null && svRpType.length > 0){
      result += "表套代码:" + svRpType + "  ";
    }
    var svRpTypeName = getListSv("svRpTypeName");
    if(svRpTypeName != null && svRpTypeName.length > 0){
      result += "表套名称:" + svRpTypeName + "  ";
    }
    var svPoCode = getListSv("svPoCode");
    if(svPoCode != null && svPoCode.length > 0){
      result += "职位代码:" + svPoCode + "  ";
    }
    var svPoName = getListSv("svPoName");
    if(svPoName != null && svPoName.length > 0){
      result += "职位名称:" + svPoName + "  ";
    }
    var userId = getListSv("svUserId");
    result += "登录帐号:" + userId + "  ";
    var userName = getListSv("svUserName");
    result += "登录帐号名:" + userName + "  ";
    var sysDateId = getListSv("svSysDate");
    if(sysDateId != null){
      result += "系统日期:" + sysDateId + "  ";
    }
  }
  msg = result + "                    ";
}

function rtol() {
  control = 1;
  window.status = msg.substring(start, msg.length) + msg.substring(0, start);
  start++;
  if (start > msg.length) {
  	start = 0;
  }
  if(control == 1) {
  	window.setTimeout("rtol()", 20000);
  }
}

//获取指定大小的区域在屏幕中心的位置;
function getCenterRect(iWidth, iHeight){
	var viScreenWidth= screen.availWidth- 10;
	var viScreenHeight= screen.availHeight- 30;
	if (iWidth== null) iWidth= viScreenWidth;
	if (iHeight== null) iHeight= viScreenHeight;
	var vaiRect= new Array();
	vaiRect[0]= (viScreenWidth- parseInt(iWidth))/ 2;
	vaiRect[1]= (viScreenHeight- parseInt(iHeight))/ 2;
	vaiRect[2]= iWidth;
	vaiRect[3]= iHeight;
	return vaiRect;
}

function showProcessbar(){
  var vaiRect= getCenterRect(400, 100);
  var vsStyle= "menubar= no, toolbar= no, scrollbars= no, "
             + "resizable=no, resizable= no, titlebar= no, "
             + "left= "+ vaiRect[0]+ "px, top= "+ vaiRect[1]+ "px, "
             + "width= "+ vaiRect[2]+ "px, height= "+ vaiRect[3]+ "px";
	window.oProcessWin= open("gp/webpage/html/RunProcess.htm", "_blank", vsStyle);
	window.oProcessWin.focus();
  return;
}

function clearSelectedRows(){
  delNumber = 0;
  selectedRowsVal = new Array();
  selectedRowsObj = new Array();
  selectedRowsAllVal = new Array();
}

function listSelectedRowTotal(){
  var fieldLength = entityMeta.childNodes.length;
  var fieldNames = new Array();
  var captions = new Array();
  var tableName = getTableName();
  var totals = new Array();
  for(var i = 0; i < fieldLength; i++){
    if(entityMeta.childNodes.item(i).getAttribute("type") == "NUM"){
      fieldNames[fieldNames.length] = entityMeta.childNodes.item(i).getAttribute("name");
      captions[captions.length] = document.getElementById(tableName + "_" + fieldNames[fieldNames.length - 1] + "Cell").firstChild.firstChild.firstChild.firstChild.firstChild.innerHTML;
      totals[totals.length] = 0;
    }
  }
  var rows = getSelectedMultiRows();
  for(var i = 0; i < rows.length; i++){
    for(var j = 0; j < fieldNames.length; j++){
      var fieldName = fieldNames[j];
      var value = parseFloat(deleteComma(getMultiRowField(rows[i], fieldName)));
      if(!totals[j]) totals[j] = 0;
      totals[j] += value;
    }
  }
  var result = "名    称————合计\n";
  for(var i = 0; i < fieldNames.length; i++){
    result += captions[i];
    result += "————" + kiloMoneyStyle("" + totals[i]) + "\n";
  }
  showMessage(result);
}

/**
* 设置列表页面字段值
* row:所取字段所在的行;
* fieldName:所取字段名
* value:值
*/
function setListPageRowFieldValue(row,fieldName,value){
  var bodyTable = document.getElementById("gridBodyTable");
  var head = document.getElementById("head");
  var entity = document.getElementById("entityMeta");
  var col = -1;
  for(var i = 2; i < head.rows[0].cells.length - 1; i++){
		var cell = head.rows[0].cells[i];
		var fieldCell = cell.firstChild.firstChild.firstChild.firstChild.firstChild;
		var fieldname = fieldCell.getAttribute("field");
		if(fieldName == fieldname){
			col = i;
			break;
		}
	}
  if( col != -1){
    row.cells[col].innerHTML= value;
  }else{
		 alert("没有" + fieldName + "字段");
	}
}

function updateScheMenu(schemaType){
    var stable = document.getElementById("schemaMenuID");
  	var values = new Array();
  	var names = new Array();
  	names[0] = "schemaType";
  	names[1] = "compoId";
  	names[2] = "userId";
  	var compoId = document.getElementById("compo_id").value;
  	var userId = document.getElementById("svUserID").value;
  	values[0] = schemaType;
  	values[1] = compoId;
  	values[2] = userId;
	var search = requestDataK("getSchemaNameMenuHTML", compoId, names, values);
  	var start = search.indexOf("[<");
  	var end = search.indexOf(">]");
  	search = search.substring(start+1,end+1);
  	if(schemaType=="search"){
  	   stable.deleteRow(0);
       var newRow= stable.insertRow(0);
        var nowCell=newRow.insertCell();
        nowCell.innerHTML=search;
    }else{
      stable.deleteRow(1);
       var newRow= stable.insertRow(1);
        var nowCell=newRow.insertCell();
        nowCell.innerHTML=search;
    }
}

function updateImg(schemaType,isExitSche){
  if(schemaType == "stat"){
  	if(!isExitSche)
  		document.getElementById("statSearch").src = "/style/img/main/stat.jpg";
  	else document.getElementById("statSearch").src = "/style/img/main/stat_menu.jpg";
  }
  if(schemaType == "search"){
  	if(!isExitSche)
  		document.getElementById("highSearch").src = "/style/img/main/high_search.jpg";
  	else document.getElementById("highSearch").src = "/style/img/main/search_menu.jpg";
  }
}
function openMenu(event, id){
  var el, x, y;
  var isExitSche;
  var maxLength;
  var menuWidth;
  var e=event.srcElement
  if(isSetStatSchema){
   // alert("修改了方案！");
  	//updateScheMenu("stat");
  	//isSetStatSchema = false;
  }
  if(isSetSearchSchema){
  // alert("修改了方案！");
  	//updateScheMenu("search");
  	//isSetSearchSchema = false;
  }
  
  setFuncDisabled("fhelpID", false);
  isExitSche = document.getElementById(id+1) == null ? "" : document.getElementById(id+1).value;
  if(trim(isExitSche) =="" || isExitSche == null){
  	if(id == "searchMenu")
  		searchF();
  	if(id == "statMenu")
  	    statSearch();
  	return;
  }
  el = document.getElementById(id);
  if(id == "searchMenu")
    maxLength = document.getElementById("searchMaxLen").value;
  if(id == "statMenu")
    maxLength = document.getElementById("statMaxLen").value;
  if(maxLength < 4)
  	maxLength = 4;
  //maxLength = maxLength * 20 + 50;
  maxLength = maxLength * 16 + 45;
  if (window.event) {
    x = window.event.clientX + document.documentElement.scrollLeft
                             + document.body.scrollLeft;
    y =  e.offsetHeight + document.documentElement.scrollTop +
                             + document.body.scrollTop;
  }
  else {
    x = event.clientX + window.scrollX;
    y = e.offsetHeight + window.scrollY;
  }
  if(id == "searchMenu"){
     isSearchVisible = true;
     searchFirstTime = true;
  }
  if(id == "statMenu"){
     isStatVisible = true;
     statFirstTime = true;
  }
  menuWidth = document.body.clientWidth - x;
  if(event.clientY > 100)
  	y += 120;
  else y += 45;
  if((event.clientY - y) > 0)  //调整位置
  	  	y = event.clientY + 4;
  if(menuWidth < maxLength)
  	x +=-maxLength;
  x -= 2; y -= 2;
  el.style.width = maxLength + "px";
  el.style.left = x + "px";
  el.style.top  = y + "px";
  el.style.visibility = "visible";
}

function closeMenu(event) {
   var searchCurrent, statCurrent;
	searchCurrent = document.getElementById("searchMenu");
    statCurrent = document.getElementById("statMenu");
    if(searchFirstTime){
      //if(statCurrent.style.visibility == "visible")
      // 	statCurrent.style.visibility = "hidden";
      searchFirstTime = false;
      return;
    }
    if(statFirstTime){
      if(searchCurrent.style.visibility == "visible")
        searchCurrent.style.visibility = "hidden";
      statFirstTime = false;
      return;
    }
    if(isSearchVisible && searchCurrent.style.visibility == "visible"){
      searchCurrent.style.visibility = "hidden";
    }
    //if(isStatVisible && statCurrent.style.visibility == "visible"){
    //  statCurrent.style.visibility = "hidden";
    //}
}

function doHight(event){
  var el = event;
  el.style.color ="black";
  el.style.background ="#E5FAAC";

}

function clearHight(event,id){
  var el = document.getElementById(id);
  el.style.color ="black";
  el.style.background ="#D7E1F3";  //#E1E1E1
}

function menuChange(event){
  var e = event.toElement;
  e.style.borderBottom = "#888380 solid 1px";
  e.style.borderRight = "#827E74 none 1px";
  e.style.borderLeft = "#888380 none 1px";
  e.style.borderTop = "#827E74 solid 1px";
  e.background = "red";//"#D7E1F3";
}

function menuBlur(id){
  var e = document.getElementById(id);
	e.style.border="0px";
	e.background = "/style/img/main/buttonmid.gif";
}

function directSearchF(highSearchSelect){
	var vasSearch = getScheSearchCondition(highSearchSelect,getEntityName());
	this.searchCondition= vasSearch[0];
	this.vsOrderBy = vasSearch[1];
	if(trim(this.searchCondition) != ""){
		this.searchCondition = "(" + this.searchCondition + ")"
	}
	this.searchType = "advancedSearch";
	simpleSearchK();
}

function directSearchF1(highSearchSelect){
   // clearSelectedRows();
	var entityName = getEntityName();
	var window_search;
	var foreign=null;
	//var defaultCon = document.getElementById("condition_id").value;
	var ignoreFields = "";
	var tableName = document.getElementById("entityMeta").getAttribute("tableName");
	var cols = document.getElementById(tableName + "ColTable").rows[0];
	for (var i = 2, l=cols.cells.length - 1;i<l; i++){
		var vjHeadFieldTD = document.getElementById(tableName + "_" + cols.cells[i].field + "Cell");
		if (vjHeadFieldTD.V_Hidden == true){
			ignoreFields = ignoreFields + cols.cells[i].field + ",";
		}
	}

	if(window.dialogArguments){
		foreign=dialogArguments;
	}

	var names = new Array();
  	var values = new Array();
  	var return_search = new Array();
	var window_search= "";
	var vsOrderBy= "";

  	names[0] = "compoId";
  	names[1] = "userId";
  	names[2] = "schemaName";
  	names[3] = "tableName";
  	compoId = document.getElementById("compo_id").value;
  	values[0] = compoId + "_"+"search";
  	values[1] = document.getElementById("svUserID").value;
  	values[2] = highSearchSelect;
  	values[3] = tableName;
  	var search = requestDataK("getSQLByDelta", compoId, names, values);
	var fieldValues = search.split("!#$");
	for(var i=1;i<fieldValues.length - 1;i++)
	    return_search[i-1] = trim(fieldValues[i]);

	if (trim(return_search[1]).length>= 1) window_search= return_search[1];
	if (trim(return_search[3]).length>= 2) vsOrderBy= return_search[3];
	/*if(trim(window_search) != "" && defaultCon != "" && defaultCon != "null")
	    window_search +=  " and (" + defaultCon + ")";
	if(trim(window_search) == "" && defaultCon != "" && defaultCon != "null")
		window_search =  "(" + defaultCon + ")"; */
		var pageCond = "";
		var condId = document.getElementById("pageCondition");
		if(condId != null){
			pageCond = condId.getAttribute("value");
		}
		var names = new Array();
		var values = new Array();
		names[0] = "condition";
		if(condId != null && pageCond != "" && window_search != ""){
			values[0] = window_search + " and (" + pageCond + ")";
		}else if(condId != null && pageCond != ""){
			values[0] = pageCond;
		}else{
			values[0] = window_search;
		}

	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(values[0].length > 1){
			if((listCondition != null) && (listCondition != "")){
				values[0] += " and (" + listCondition + ")";
			}
		}else{
			values[0] = listCondition;
		}
	}

		names[1] = "OrderBy";
		values[1] = vsOrderBy;
		var com = getCommunity();
		if (com != null){
			names[2] = "pageType";
			values[2] = document.getElementById("pageTypeID").value;
			names[3] = "pageUniqueID";
			values[3] = uniqueID.getAttribute("value");
			names[4] = "sql";
			values[4] = window._sSelectSql==null?"":window._sSelectSql;
			com.doRequest("getSearchResult", getEntityName(), names, values, "search_refreshData");

	}
}

function highSearchAll(){
    clearSelectedRows();
	var condition = "";
	var doc = document.getElementById("entityMeta");
	var tableName = doc.getAttribute("tableName");
	var vjPageCondObj= document.getElementById("pageCondition");
	if (vjPageCondObj!= null) condition= vjPageCondObj.getAttribute("value");

	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(condition.length > 1){
			if((listCondition != null) && (listCondition != "")){
				condition += " and (" + listCondition + ")";
			}
		}else{
			condition = listCondition;
		}
	}

	var names = new Array();
	var values = new Array();
	names[0] = "condition";
	values[0] = condition;
	if (getEntityName()=="WF_WATCH"){
		 values[0] = document.getElementById("valset_WF_TEMPLATE_NAME").value;
	}
	var com = getCommunity();
	if (com != null){
		names[1] = "pageType";
		values[1] = document.getElementById("pageTypeID").value;
		names[2] = "pageUniqueID";
		values[2] = uniqueID.getAttribute("value");
		if(document.getElementById("searchStartDate") != null){
			names[3] = "startTime";
			values[3] = "";
			names[4] = "endTime";
			values[4] = "";
		}
  	names[5] = "sql";
		values[5] = window._sSelectSql==null?"":window._sSelectSql;
		com.doRequest("getSearchResult", getEntityName(), names, values, "search_refreshData");

	}
}

/**
 * 本地数据批保存
 */
function fsavelocalF(){
  var vsPath = PF.readFile("C:\\UFIDA\\localSavePath");
  if (vsPath == null){
    vsPath = "c:\\UFIDA\\";
  }
  if (document.getElementById("svUserId") != null){
    vsPath += document.getElementById("svUserId").value;
  }
  var vsFileNames = PF.getFileNames(vsPath);
  var vsCompoName= document.getElementById("entityMeta").getAttribute("entityName");
  for (var i=0, l=vsFileNames.length; i<l; i++){
    var vsFileName = vsFileNames[i];
    if (vsFileName.length < vsCompoName.length + vsPath.length)
      continue;
    if (vsFileName.substring(vsPath.length + 1, vsPath.length + vsCompoName.length  + 1) != vsCompoName)
      continue;
    if (vsFileName.indexOf(".xml") != vsFileName.length - 4)
      continue;
    if (PF.isEmpty(vsFileName)) return false;
    var vsText= PF.readFile(vsFileName);
    var vasParamName= new Array("data", "componame");
    var vasParamValue= new Array(vsText, vsCompoName);
    var voRetRoot= Info.requestData("resolve", vsCompoName, vasParamName, vasParamValue, BASE_URL+ "/XmlProxy"); //请求;
    if (voRetRoot == null){
      continue;
    }
    var vtSuccess= PF.parseBool(voRetRoot.getAttribute("success"));
    if (vtSuccess){
      PF.deleteFile(vsFileName);
      PF.deleteFile(vsFileName + "_page");
    }
  }
  if (eval("typeof after_fsavelocal ==\"function\""))
    after_fsavelocal();
}

function simpleSearch(){
	this.searchCondition= "";
	this.vsOrderBy = "";
	this.searchType = "simpleSearch";
	simpleSearchK();
}

function simpleSearchK() {
	clearSelectedRows();
	//debugger;
	var matchValue = document.getElementById("matchValue").value;
	if(!matchValue || matchValue == "输入要搜索的关键字"){
	  	matchValue = "";
	}
  
	var condition = "";
	var entityMeta = document.getElementById("entityMeta");
	//var tableName = entityMeta.getAttribute("tableName");
	//var compoName = entityMeta.getAttribute("compoName");
	var names = new Array();
	var values = new Array();	
  	names[names.length] = "totalcount";
  	values[values.length] = -1;  
  	names[names.length] = "sqlid";
  	values[values.length] = entityMeta.getAttribute("sqlid"); 
  	names[names.length] = "condition";
  	values[values.length] = entityMeta.getAttribute("condition"); 
  	names[names.length] = "currentpage";
  	values[values.length] = 1;
  	names[names.length] = "direction";
  	values[values.length] = "first";
  	names[names.length] = "masterCompoName";
  	values[values.length] = entityMeta.getAttribute("masterCompoName");  
  	names[names.length] = "masterTableName";
  	values[values.length] = entityMeta.getAttribute("masterTableName"); 
  	names[names.length] = "masterSelectField";
  	values[values.length] = entityMeta.getAttribute("masterSelectField"); 
  	names[names.length] = "isFromSql";
  	values[values.length] = entityMeta.getAttribute("isFromSql");
    names[names.length] = "realFieldName";
  	values[values.length] = entityMeta.getAttribute("realFieldName");
  	
  	var spanUser = document.getElementById("svUserID");
  	if(spanUser){
	  	names[names.length] = "userid";
	  	values[values.length] = spanUser.getAttribute("value");  	
  	}
  	if(searchType != "advancedSearch"){  
	  	if(matchValue != ""){
		  	names[names.length] = "searchCond";
		  	values[values.length] = "matchCond=%" + matchValue + "%";
	  	}
	  	names[names.length] = "type";
		values[values.length] = "simpleSearch";
	}else{
		if(searchCondition != null){
			if(!PF.isEmpty(vsOrderBy)){
				names[names.length] = "searchCond";
				values[values.length] = searchCondition + "Order by" + vsOrderBy;
				names[names.length] = "type";
				values[values.length] = searchType;
			}else{
				names[names.length] = "searchCond";
				values[values.length] = searchCondition;
				names[names.length] = "type";
				values[values.length] = searchType;
			}
		}
	}
  
	var tableData = Info.requestData("getselectpagedata", compoName, names, values);
	refreshSelectData(tableData);
	//增加搜索后方法处理
	if(typeof(afterSearch) == "function"){
  		afterSearch();
  	}
}


function getScheSearchCondition(scheName, compoId){
	var names = new Array();
  var values = new Array();
  names[0] = "compoId";
  names[1] = "userId";
  names[2] = "schemaName";
  values[0] = compoId + "_search";
  values[1] = document.getElementById("svUserID").value;
  values[2] = scheName;
  var schema = Info.requestDataK("loadschema", "all", names, values);
  //debugger;
  var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
  xmlDom.loadXML(schema);
  var root = xmlDom.getElementsByTagName("entity");
  if (!root) return;
 
  var sl = root.length;
  var userID = document.getElementById("svUserID").value;	
  var condition = "";
  var orderStr = "";
  var tableName = document.getElementById("entityMeta").getAttribute("tableName");
	for(var i=0; i<sl; i++){
    var schemaLoca = root[i].getAttribute("name");
    var tmpS = root[i].childNodes;
    if(schemaLoca == "condition"){
    	var tCond = getSchemaCond(tableName, tmpS);
    	if(tCond != ""){
    		condition += tCond;
    	}
    }
    if(schemaLoca == "order"){
			var tOrder = getSchemaOrder(tmpS);
			if(tOrder != ""){
				if(orderStr != "")
					orderStr += ",";
				orderStr += tOrder;
			}
    }
  }
  return [condition, orderStr];  
}

function getSchemaCond(tableName, tmpS){
	var condition = "";
  var l = tmpS.length;
  var fName;
  var fn;
  var fType = "";
  var str1 = "";
  var str2 = "";
  var fields = listPage_getFields();
  var fieldNames = fields[1];
  var fieldTypes = fields[2];
  
  for(var i=0; i<l; i++){	
    fn = tmpS[i].getAttribute("name");
    fName = tmpS[i].getAttribute("value");
    if(fn == "C3"){
    	//fType = DataTools.getTableFieldAttr(tableName, fName, "type");
    	for(var j = 0; j < fieldNames.length; j++){
    		if(fieldNames[j] == fName){
    			fType = fieldTypes[j];
    			break;
    		}
    	}
    	
      condition += " MASTER." + fName + " ";
    }else if(fn == "C4"){
    	if(fType == "TEXT"){
    		if(fName == "0"){
    			condition += " = ";
    			str1 = "'";
    			str2 = "'";
    		}else if(fName == "1"){
    			condition += " <> ";
    			str1 = "'";
    			str2 = "'";
    		}else if(fName == "2"){
    			condition += " like ";
    			str1 = "'%";
    			str2 = "%'";
    		}else if(fName == "3"){
    			condition += " not like ";
    			str1 = "'%";
    			str2 = "%'";
    		}else if(fName == "4"){
    			condition += " like ";
    			str2 = "%'";
    			str1 = "'"
    		}else if(fName == "5"){
    			condition += " like ";
    			str1 = "'%";
    			str2 = "'";
    		}else{
    			condition += " is null ";
    			str1 = "";
    			str2 = "";
    		}
    	}else{
    		if(fName == "0"){
    			condition += " = ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "1"){
    			condition += " <> ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "2"){
    			condition += " > ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "3"){
    			condition += " >= ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "4"){
    			condition += " < ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "5"){
    			condition += " <= ";
    			str1 = "";
    			str2 = "";
    		}else{
    			condition += " is null ";
    			str1 = "";
    			str2 = "";
    		}
    	}
    }
    else if(fn == "C5"){
			condition += " " + str1 + fName + str2 + " ";
    }else{
			condition += " " + fName + " ";
    }
  }
	return condition;
}

function getSchemaOrder(tmpS){
	var orderStr = "";
  var l = tmpS.length;
  var fName;
  
  for(var i=0; i<l; i++){
  	var fn = tmpS[i].getAttribute("name");
    fName = tmpS[i].getAttribute("value");
    if(fn == "01" && fName == "")
    	break;
		orderStr += " " + fName + " ";
  }
  return orderStr;
}
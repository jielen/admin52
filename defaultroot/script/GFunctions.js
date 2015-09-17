// $Id: GFunctions.js,v 1.1 2008/03/26 02:30:05 liuxiaoyong Exp $
// 编辑页面专用

var save,getDataBegin,getDataEnd,comBegin,comEnd,end, initTime;

function Call_ClickF(call){
	initTime = new Date();
	/*get operation info to be used in community.js (add by xjh 3.12) */
	operationID = call;

	var r2 = true;
	if (eval("typeof before_" + call + " ==\"function\""))
		r2 = eval("before_" + call + "()");
	if(!r2) return;

	if (eval("typeof " + call + " ==\"function\"")){
		var r = true;
		r = eval(call +"()");
		if (r) {
			if (eval("typeof " + call + "F ==\"function\"")){
				eval(call + "F()");
			}
		}
	}else if (eval("typeof " + call + "F ==\"function\"")){
		eval(call + "F()");
	}else{
		var auto = false;
		var param = document.getElementById(call + "Meta");
		if (param != null){
			params = param.childNodes;
			auto = true;
			for (var i=0,j=params.length; i<j; i++){
				if (!isFieldExist(params.item(i).getAttribute("name"))){
					auto = false;
					alert("此功能的参数在页面上不存在！");
					break;
				}
			}
		}
		if (auto)
			sendParam(call);
		else
			alert("此功能目前还未定义，请以后再试！");
	}
}

function sendParam(call){
	var params = document.getElementById(call + "Meta").childNodes;
	var compoName = getCompoName();
	var names = new Array();
	var values = new Array();
	for (var i=0,j=params.length; i<j; i++){
		names[i] = params.item(i).getAttribute("name");
		values[i] = getField(names[i]);
	}
	var callback;
	if (eval("typeof after_" + call + " ==\"function\""))
		callback = "after_" + call;
	else
		callback = "afterSendParam";
	var com = getCommunity();
	if (com != null){
		com.doRequest(call,compoName,names,values,callback);
	}
}

function afterSendParam(result){
	if (result.getAttribute("success") == "false"){
		/*
		var win = open("", null,
									 "menubar=no,scrollbars=no,status=no,toolbar=no"
									 + ",resizable=yes,titlebar=yes,scrollbars=yes");
		win.document.body = result.innerHTML;
		*/
		showMessage(result.innerHTML);
	}
}

function fdeleteF(){
	var condition = null;

	//_HH <add>
	var wfData = getWfData();
	var bIsWorkflow = wfData && wfData.getProcessInstId() && "" != wfData.getProcessInstId();
	if (bIsWorkflow) {
		fdeleteWithWorkflow(wfData);
		return ;
	}
	if(!confirm("确定要删除吗？"))
			return;

	var fieldsName = getPrimaryFields();
	condition = "<delta>"
	condition += pageDataToEntityString(null, fieldsName); // 2004-6-8
	/*
	condition += "<entity name=\"\">";
	for (var i = 0; i < fieldsName.length; i++) {
		var fieldValue = getField(fieldsName[i]);
		if(fieldValue == "")
			return;
		condition += "<field name=\"" + fieldsName[i] + "\" value=\""
						 + getField(fieldsName[i]) +"\"/>";
	}
	condition += "</entity>";
	*/
	condition += "</delta>";

	var compoName = getCompoName();
	var names = new Array();
	var values = new Array();
	names[0] = "data";
	values[0] = condition;
	names[1] = "pagename";
	values[1] = meta.getAttribute("unique");

	var com = getCommunity();
	com.doRequest("delete",compoName,names,values,"fdeleteF_R");
}

/*删除带工作流的编辑页面数据*/
function fdeleteWithWorkflow(wfData){
	if(wfData==null)wfData=getWfData();
	if(wfData==null){
		alert("参数不正确,没有取得页面工作流数据!");
	}
	if(!confirm("确定要删除吗？当前流程的所有待办事宜和已办事宜都将被删除！"))
			return;

	var com = getCommunity();
	var names = new Array();
	var values = new Array();
	names[0] = "pagename";
	values[0] = meta.getAttribute("unique");
	names[1] = "wfdata";
	values[1] = wfData.toString();
	com.doRequest("deleteWithWorkflow", compoName, names, values,"deleteWithWorkflow_re");
}

function fdeleteF_R(result)
{
	if (result.getAttribute("success") == "false")
	{
		alert(result.innerHTML);
	}
	else
	{
		if (opener) // 2004-5-20 HH 改回来，与 appendToList 和 updateToList 一致
		{
			var doc = opener.document;
			var win = opener;
			var hrefLen = win.location.href.length;

			if(win.location.href.substring(hrefLen - 10, hrefLen) == "createMenu")
			{
				Call_ClickF("fadd");
				changed = false;
				return;
			}

			if (doc.getElementById("grid") == null)
			{
				doc = opener.main.document;
				win = opener.main;
			}

			var names = getPrimaryFields();
			var session = document.getElementById("sessionParam").childNodes;
			var tmpNames = new Array();
			var values = new Array();

			for (var i = 0,j = names.length; i < j; i++)
			{
				var isFilter = false;
				for(var x = 0, y = session.length; x < y; x++)
				{
					var item = session.item(x);
					if(item.getAttribute("filter") != null)
					{
						alias = item.getAttribute("alias");

						if(alias == null) name = item.getAttribute("name");
						else name = alias;

						if(name == names[i])
						{
							isFilter = true;
							break;
						}
					}
				}

				if(!isFilter)
				{
					tmpNames[tmpNames.length] = names[i];
					values[values.length] = getField(names[i],null,true);
				}
			}

			var row = win.locateRow(tmpNames,values);
			if (row)
			{
				//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040614;
				var gridBodyTable= doc.getElementById("gridBodyTable"); //leidh;20040614;
				var viGridBodyWidth= gridBodyTable.offsetWidth;

				var viRowIndex= row.rowIndex;
				var vaiColWidth= new Array();
				if (viRowIndex== 0)
				{
					var vjFirstTR= row;//gridBodyTable.rows[viRowIndex];
					for (var i= 0; i< vjFirstTR.childNodes.length; i++)
					{
						vaiColWidth[i]= vjFirstTR.childNodes[i].offsetWidth;
					}
				}

				gridBodyTable.deleteRow(viRowIndex);

				//恢复列宽.
				if (viRowIndex== 0 && gridBodyTable.rows.length> 0)
				{
					gridBodyTable.style.width= 10;//wtm,20040722
					var vjFirstTR= gridBodyTable.rows[viRowIndex];
					for (var i= 0; i< vjFirstTR.childNodes.length; i++)
					{
						 vjFirstTR.childNodes[i].style.width= vaiColWidth[i];
					}
					gridBodyTable.style.width= viGridBodyWidth;
				}

				//doc.getElementById("gridBodyTable").deleteRow(row.rowIndex);
				win.fillTableColor();
			}
			var oldCounts = parseInt(win.totalCountsID.innerHTML);
			oldCounts--;
			win.totalCountsID.innerHTML = oldCounts;
		}

		changed = false;
		if (typeof after_fdelete == "function")
		{
			after_fdelete();
		}
		Call_ClickF("fadd");
	}
}

/**
 * 工作流方式的删除，成功后关闭窗口
 */
function deleteWithWorkflow_re(result) {
	if (result.getAttribute("success") == "false"){
		alert(result.innerHTML);
		return;
	}
	alert("删除成功，即将关闭此窗口！");
	if (window.top == window)
		window.close();
}

// 根据当前页面条件,取出其他(第一条,前条,后条,末条)记录的条件
function getDataCondition(direction){
	var condition = "";
	var tableName = getMainTableName();
	if (opener != null){
			var doc = opener.document;
			var win = opener;
			if (doc.getElementById("grid") == null){
				doc = opener.main.document;
				win = opener.main;
			}
			var names = getPrimaryFields();
			var session = document.getElementById("sessionParam").childNodes;
			var tmpNames = new Array();
			var values = new Array();
			for (var i = 0,j = names.length; i < j; i++){
				var isFilter = false;
				for(var x = 0, y = session.length; x < y; x++){
					var item = session.item(x);
					if(item.getAttribute("filter") != null){
						alias = item.getAttribute("alias");
						if(alias == null)
							name = item.getAttribute("name");
						else
							name = alias;
						if(name == names[i]){
							isFilter = true;
							break;
						}
					}
				}
				if(!isFilter){
					tmpNames[tmpNames.length] = names[i];
					values[values.length] = getField(names[i],null,true);
				}
			}
	//找到编辑页面当前记录的行数.
	var numOfRow = doc.getElementById("gridBodyTable").rows.length;
	var currentPage = parseInt(doc.getElementById("currentPageID").innerHTML);
	var totalPage = parseInt(doc.getElementById("totalPageID").innerHTML);
	var row = win.locateRow(tmpNames,values);
	if (row){
	var rowNum = row.rowIndex;
	//首条记录的行数
	if (direction == "first"){
		rowNum = 0;
	}
	//前条记录行数
	else if (direction == "previous"){
		if (rowNum >= 1)
			rowNum = rowNum - 1;
	}
	//下一条记录行数
	else if (direction == "next"){
		if (rowNum < numOfRow-1)
			rowNum = rowNum + 1;
	}
	//末条记录行数
	else if (direction == "last"){
			rowNum = numOfRow-1;
	}
	row = doc.getElementById("gridBodyTable").rows[rowNum];
	var fieldTypes = getPrimaryFieldType();
	var fieldNames = fieldTypes[0];
	var fieldType = fieldTypes[1];
	var colNos = new Array();
	var fields = doc.getElementById("entityMeta").childNodes;
		for (var i=0,j=fieldNames.length; i<j; i++){
				for (var m=0,n=fields.length; m<n; m++){
					if (fields.item(m).getAttribute("name") == fieldNames[i]){
						colNos[i] = parseInt(fields.item(m).getAttribute("no")) + COLUMN_OFFSET;
						break;
						}
				}
		}
		// <inline> 2004-6-8 TODO: 提取，处理 value 中的特殊字符
		for(var i = 0; i < fieldNames.length; i++){
			if(i != 0)
				condition += " and ";
			var fieldName = fieldNames[i];
			var type = fieldType[i];
			var value = trim(row.cells[colNos[i]].innerHTML);
			if(type.toLowerCase() == "num"){
				condition += tableName + "." + fieldName + " = " + value;
			}else{
				condition += tableName + "." + fieldName + " = '" + value + "'";
			}
			}//for
			// </inline>
		}//if(row)
	 }//if(opener != null)
	//alert("+++++" + condition);
	return condition;
}
//根据导航条件-Direction确定编辑页面的地址.参数direction-first,previous,next,last
function getLocation(direction){
	//alert("getLocation();");
	var condition = "";
	var status = document.getElementById("status").getAttribute("value");

	//这里有一个快捷键冲突的问题。对于上一条，下一条，在编辑时无效。leidh;20040509;
	if(status == "editing" || status == "new") return false;

	var tableName = getMainTableName();
	var pageName = getPageMeta().getPageName();
	var compoName = getPageMeta().getCompoName();
	var unique = getPageMeta().getUnique();
	var fieldTypes = getPrimaryFieldType();
	var fieldNames = fieldTypes[0];
	var fieldType = fieldTypes[1];
	// <inline> 2004-6-8 TODO: 提取，处理 value 中的特殊字符
	for(var i = 0; i < fieldNames.length; i++){
		if(i != 0)
			condition += " and ";
		var fieldName = fieldNames[i];
		var type = fieldType[i];
		var value = getField(fieldName, tableName);
		if(type.toLowerCase() == "num"){
			condition += tableName + "." + fieldName + " = " + value;
		}else{
			condition += tableName + "." + fieldName + " = '" + value + "'";
		}
	}
	// </inline>
	condition = trim(condition);
	var conditionAfter = "";
	conditionAfter = getDataCondition(direction);
	if ((conditionAfter != null) && (conditionAfter != "")) {
		var hrefAfter = "Proxy?function=geteditpage&condition=" + conditionAfter +
												"&componame=" + compoName + "&fieldvalue=" + pageName;
		if(status == "editing"){
			if(changed){
				if(confirm("页面数据已经更改!")){
						changed = false;
						window.location.href = hrefAfter;
					}
				}else{
				window.location.href = hrefAfter;
			}
		}else{
			window.location.href = hrefAfter;
		}
	}
	else{
		alert("当前列表页面无此记录!不能进行浏览");
	}
}
//取第一条记录信息显示在编辑页面上
function ffirstrecF(){
	getLocation("first");
}

//取前一条记录信息显示在编辑页面上
function fprerecF(){
	getLocation("previous");
}

//取后一条记录信息显示在编辑页面上
function fnextrecF(){
	getLocation("next");
}

//取最后一条记录信息显示在编辑页面上
function flastrecF(){
	getLocation("last");
}

function fsaveF(){
	save = new Date();
	if (!getChanged()){
		//zhangys 2004-06-04 页面未改动时，给用户的友好提示
		alert("当前页面未做任何改动，不需要保存！");
		return;
	}
	//20040812 子表主键重复
	if (gridsRowRepeat()){
		return;
	}
	if (!page_Check())
		return;
	if (isSaving()) {
		alert("前一个处理尚未完成，请稍后再试！");
		return;
	}

	var f = null;
	var pageStatus = document.getElementById("status").getAttribute("value");
	if (pageStatus == "new")
		f = "insert";
	else if ((pageStatus == "edit") || (pageStatus == "editing"))
		f = "update";
	var com = getCommunity();
	if ((com == null) || (f == null))
		return;

		var names = new Array();
		var values = new Array();
		names[0] = "data";
		getDataBegin = new Date();
		values[0] = getPageData1();
		getDataEnd = new Date();
		if(values[0] == null) return;
		var componame = getCompoName();
		names[1] = "componame";
		values[1] = componame;
		names[2] = "pagename";
		values[2] = meta.getAttribute("unique");
		names[3] = "editPageName";
		values[3] = meta.getAttribute("pageName");

		var callbackFunc = "save_R";
		// 如果是工作流模式的新增, 增加额外的参数，使用不同的回调函数
		var WF_FLOW_TYPE = getPageMeta().getFlowType();
		if (WF_FLOW_TYPE && "insert" == f) {
			var wfData = getWfData();
			if (!wfData.getTemplateId()) {
				alert("错误：未设置工作流模板，不能继续进行保存！");
				return;
			}
			names[4] = "wfdata";
			values[4] = wfData.toString();
			if (WF_FLOW_TYPE && WF_FLOW_TYPE != "") {
				f = "insertWithWorkflow";
				callbackFunc = "insertWithWorkflow_re";
			}
		}
		if (WF_FLOW_TYPE && "update" == f) {
			var wfData = getWfData();
			names[4] = "wfdata";
			values[4] = wfData.toString();
			if (WF_FLOW_TYPE && WF_FLOW_TYPE != "") {
				f = "updateWithWorkflow";
			}
		}
		// </add>
		comBegin = new Date();
		if (isSaving()) return;
		//setIsSaving();
		com.doRequest(f,componame,names,values,callbackFunc);
}

/**
 * 使用这几个标志位判断操作能否继续(是否正在进行保存)
 * 用法：
 * if (isSaving()) return;
 */
var _isSaving = false; // 保存标志位
function isSaving() { return _isSaving;}
function setIsSaving() { _isSaving = true;}
function clearIsSaving() { _isSaving = false;}

function save_R(result){
	clearIsSaving();
	comEnd = new Date();
	if (result.getAttribute("success") == "false"){
		alert(result.innerHTML);
		if (eval("typeof save_Failure == \"function\""))
			save_Failure();
		return;
	}

		if(document.getElementById("status").getAttribute("value") == "new"){
			var fields = getMainFields();
			var table = document.getElementById("maintable");
			var tablename = table.getAttribute("tablename");
			var isNoRule = true;
			for(var i=0,j=fields.length; i<j; i++){
				var element = document.getElementById(tablename + "_" + fields[i] + "ID");
				if(element.getAttribute("autonum") == "true"){
					setField(fields[i], result.innerHTML, tablename); //_HH: 用 innerText 如何
					isNoRule = false;
					break;
				}
			}
			if(isNoRule){
				var temp = result.innerHTML; //_HH: 用 innerText 如何
				var names = new Array();
				var values = new Array();
				if((temp.length > 0) && (temp.indexOf(",") > 1)){
					var regexp = /,/
					var newArray = temp.split(regexp);
					for(var i = 0; i < newArray.length; i++){
						if((i%2 === 0))
							names[names.length] = newArray[i];
						else
							values[values.length] = newArray[i];
					}
					for(var i = 0; i < names.length; i++){
						for(var j = 0; j < fields.length; j++){
							if(names[i] == fields[j]){
								var element = document.getElementById(tablename + "_" + fields[j] + "ID");
								if(element.getAttribute("norulenum") == "true"){
									setField(names[i], values[i]);
									break;
								}
							}
						}
					}
				}
			}
			appendToList();
		}else{
			updateToList();
		}
		document.getElementById("status").setAttribute("value","edit");
		setPageReadOnly(true);//保存后设置页面所有字段为只读
		setChanged(false);
		setFuncDisabled("fsave", true);
		setFuncDisabled("fedit", false);
		setFuncDisabled("fdelete", false);
		//保存时恢复提交
		var wfDataObj = getWfData();
		if (wfDataObj.getProcessInstId()) {
				var workitemId = wfDataObj.getWorkitemId();
				if(workitemId){
					 setFuncDisabled("fimpower",false);
					 setFuncDisabled("fhandover",false);
					 setFuncDisabled("fwithdraw",false);
					 setFuncDisabled("funtreadflow",false);
					 setFuncDisabled("fcommit",false);
				}
		}
		//update the digest of page    add by zhangys 2003-09-28
		updateDigest();
		if (eval("typeof after_fsave ==\"function\""))
			eval("after_fsave()");

	end = new Date();
	/*
	alert("save" + getDetailTime(save) + "\n"
	 + "getDataBegin:" + getDetailTime(getDataBegin) + "\n"
	 + "getDataend:" +getDetailTime(getDataEnd) + "\n"
	 + "comBegin:" + getDetailTime(comBegin) + "\n"
	 + "comEnd:" + getDetailTime(comEnd) + "\n"
	 + getDetailTime(end));
	*/
}

function appendToList(){
	if (opener){
		var doc = opener.document;
		var win = opener;
		var hrefLen = win.location.href.length;
		if(win.location.href.substring(hrefLen - 10, hrefLen) == "createMenu") return;
		if (getCompoName() != win.getCompoName()) return;
		if (doc.getElementById("grid") == null){
			doc = opener.main.document;
			win = opener.main;
		}
		var row = win.addBlankRow();
		var cell = null;
		var listFields = doc.getElementById("entityMeta").childNodes;
		for (var i=0,j=listFields.length; i<j; i++){
			var itemi = listFields.item(i);
			var isKiloStyle = itemi.getAttribute("isKiloStyle");
			cell = row.insertCell(-1);
			if (isKiloStyle == "true"){
				var temp = getField(itemi.getAttribute("name"),null,true);
				var temp2 = kiloStyle(temp);
				cell.innerText = temp2; // 2004-5-26 HH 原来是 innerHTML
			}else{
        if(itemi.getAttribute("type") == "ValueSet"){
          var tmpHTML = "<SPAN value=\""
          tmpHTML += getField(itemi.getAttribute("name"),null,false) + "\"></SPAN>";
          tmpHTML += "<SPAN value=\""
          tmpHTML += getField(itemi.getAttribute("name"),null,true)+ "\">"
          tmpHTML += getField(itemi.getAttribute("name"),null,true) + "</SPAN>";
          cell.innerHTML = tmpHTML;
        }else{
  				cell.innerText = getField(itemi.getAttribute("name"),null,true); // 2004-5-26 HH 原来是 innerHTML
        }
			}
		}
		row.insertCell(-1);
		win.colResize();
		var oldCounts = parseInt(win.totalCountsID.innerHTML);
		oldCounts++;
		win.totalCountsID.innerHTML = oldCounts;
	}
}

function updateToList(){
	if (opener){
		var doc = opener.document;
		var win = opener;
		var hrefLen = win.location.href.length;
		if(win.location.href.substring(hrefLen - 10, hrefLen) == "createMenu") return;

		//zhangys 2004-06-24 首页不是列表页面引起的错误
		if(doc.getElementById("welcome_page")) return;

		if (getCompoName() != win.getCompoName()) return;
		if (doc.getElementById("grid") == null){
			doc = opener.main.document;
			win = opener.main;
		}
		var session = document.getElementById("sessionParam").childNodes;
		var vnames = getPrimaryFields();
		var names = new Array();
		for (var i=0,j=vnames.length; i<j; i++){
			var isFilter = false;
			for(var x = 0, y = session.length; x < y; x++){
				var item = session.item(x);
				if(item.getAttribute("filter") != null){
					var name = item.getAttribute("name");
					var alias = item.getAttribute("alias");
					if(alias == null)
						alias = name;
					if(alias == vnames[i]){
						isFilter = true;
						break;
					}
				}
			}
			if(!isFilter){
				names[names.length] = vnames[i];
			}
		}
		var values = new Array();
		for (var i=0,j=names.length; i<j; i++){
			values[i] = getField(names[i],null,true);
		}
		var row = win.locateRow(names,values);
		if (row){
			var colNo = 0;
			var listFields = doc.getElementById("entityMeta").childNodes;
			//-- for (var i=1,j=listFields.length; i<j; i++) // 2004-5-20 HH 解决编辑页面修改后列表页面第一列不更新的问题
			for (var i=0,j=listFields.length; i<j; i++){
				var itemi = listFields.item(i);
				var isKiloStyle = itemi.getAttribute("isKiloStyle");
				colNo = parseInt(listFields.item(i).getAttribute("no")) + COLUMN_OFFSET;
				if (isKiloStyle == "true"){
					var temp = getField(itemi.getAttribute("name"),null,true);
					var temp2 = kiloStyle(temp);
					row.cells[colNo].innerText = temp2; // 2004-5-26 HH 原来是 innerHTML
				}else{
          if(itemi.getAttribute("type") == "ValueSet"){
            var tmpHTML = "<SPAN value=\""
            tmpHTML += getField(itemi.getAttribute("name"),null,false) + "\"></SPAN>";
            tmpHTML += "<SPAN value=\""
            tmpHTML += getField(itemi.getAttribute("name"),null,true)+ "\">"
            tmpHTML += getField(itemi.getAttribute("name"),null,true) + "</SPAN>";
            row.cells[colNo].innerHTML = tmpHTML;
          }else{
		  			row.cells[colNo].innerText = getField(itemi.getAttribute("name"),null,true); // 2004-5-26 HH 原来是 innerHTML
          }
				}
			}
		}
	}
}

/**
 * 工作流方式的新增－保存处理，如果成功，打开返回的待办事宜
 */
function insertWithWorkflow_re(result) {
	if (result.getAttribute("success") == "false"){
		clearIsSaving();
		alert(result.innerHTML);
		if (eval("typeof save_Failure == \"function\""))
			save_Failure();
		return;
	}
	setFuncDisabled("fsave", true);
	setFuncDisabled("fedit", true);
	// 根据返回的 wftemplate, process_inst_id, workitem_id 刷新页面
	if (result.firstChild) {
		var wfData = new WfData();
		AS_initObjectByChildNodes(wfData, result.firstChild);
		if (wfData.getWorkitemId()) {
			refreshEditWindow(wfData);
			if (typeof after_fsave == "function"){
				 after_fsave();
			}
			return;
		}
	}
	alert("保存成功，请关闭此窗口！");
}

/** 切换到指定的编辑窗口 */
function refreshEditWindow(wfData) {
	var pageMeta = getPageMeta();
	var sURL = "Proxy?function=geteditpage&condition=1=0"
		+ "&wf_template_id=" + wfData.getTemplateId()
		+ "&process_inst_id=" + wfData.getProcessInstId()
		+ "&workitem_id=" + wfData.getWorkitemId()
		+ "&componame=" + pageMeta.getCompoName()
		+ "&wf_activity_id=" + wfData.getActivityId()
		+ "&fieldvalue=" + pageMeta.getPageName()
		+ "&unique=" + pageMeta.getUnique();
	window.navigate(sURL);
}

function page_Check(){
	var result = true;
	var fields = getMainFields();
	var table = document.getElementById("maintable");
	var tablename = table.getAttribute("tablename");
	for(var i=0,j=fields.length; i<j; i++){
		var element = document.getElementById(tablename + "_" + fields[i] + "ID");
		if( element != null){
		var type = element.getAttribute("fieldType");
		var caption = document.getElementById(tablename + "_" + fields[i] + "CaptionID");
		var capValue = caption.innerHTML;
		var index = capValue.indexOf("<SPAN");
		if(index > 1){
			//为非空字段或主键
			var value = element.getAttribute("value");
			if((value == null) || (trim(value).length == 0)){
				alert("“" + capValue.substr(0, index) + "”不允许为空！");
				return false;
			}
		}

		if (type == "text"){
			result = text_Check(element);
			if (!result){
				element.setFocus();
				break;
			}
		}else if (type == "num"){
			result = num_Check(element);
			if (!result){
				element.setFocus();
				break;
			}
		}else if (type == "date"){
			result = date_Check(element);
			if (!result){
				element.setFocus();
				break;
			}
		}else if (type == "datetime"){
			result = date_Check(element);
			if (!result){
				element.setFocus();
				break;
			}
		}
		}
	}
	return result;
}

function faddF(){
	var pageStatus = document.getElementById("status").getAttribute("value");
	if ((pageStatus != "new") && (pageStatus != "edit") && (pageStatus != "editing"))
		return;

	var bIsClick = false; // 是否是通过点击新增按钮触发的
	if (event && event.srcElement) bIsClick = true;

	if (bIsClick && getChanged() && !confirm("当前页面上的数据已修改，真的不保存吗?"))
		return;

	//_HH <add>
	var pageMeta = getPageMeta();
	if (bIsClick && pageMeta.getFlowType() && "" != pageMeta.getFlowType()) {
		var template_id = getWfData().getTemplateId();
		var template_id; // = window.prompt("请输入流程模板名称:", template_id);
		template_id = getSelectedTemplateDatas(pageMeta.getFlowType())[1]; //_hd
		if (!template_id)
			return;

		// <inline 031601> TODO: 参考 refreshEditWindow
		var sURL = "Proxy?function=geteditpage&condition=1=0"
			+ "&wf_template_id=" + template_id
			+ "&componame=" + pageMeta.getCompoName()
			+ "&fieldvalue=" + pageMeta.getPageName()
			+ "&unique=" + pageMeta.getUnique();
		//--dump(sURL);
		setForceLeave();
		window.navigate(sURL);
		// </inline>
		return;
	}
	// </add>

	setFuncDisabled("fsave", false);
	setFuncDisabled("fedit", true);
	setFuncDisabled("fdelete", true);
	setFuncDisabled("frefresh", true);

		/* 主表 */
		var tableName = getMainTableName();
		var mFields = getMainFields();
		for(var i=0,j=mFields.length; i<j; i++){
			setInitial(mFields[i],tableName);
		}
		var primaryFields = getPrimaryFields();
		for (var i=0,j=primaryFields.length; i<j; i++){
			setReadOnly(primaryFields[i],false,tableName);
		}
		/* 二级子表 */
		var table2s = document.getElementById("maintable").childNodes;
		for (var i=0,j=table2s.length; i<j; i++){
			var table2Name = table2s.item(i).getAttribute("tablename");
			var displayType= table2s.item(i).getAttribute("display_type");
			if(displayType == "normal"){
				var childTables = document.getElementById("childTableFields").childNodes;
				for(var x=0; x<childTables.length; x++){
					var tableName = childTables.item(x).getAttribute("tableName");
					if(table2Name == tableName){
						var childFields = document.getElementById(tableName + "Fields").childNodes;
						for (var k=0,y=childFields.length; k<y; k++){
							setField(childFields.item(k).getAttribute("fieldName"),"",table2Name);
							setInitial(childFields.item(k).getAttribute("fieldName"),table2Name);
						}
					}
				}
			}
			else{
				uneditGrid(table2Name);
				var table2Grid = document.getElementById(table2Name + "BodyTable");
				for (var m=table2Grid.rows.length-1,n=-1; m>n; m--){
					table2Grid.deleteRow(m);
				}
			}
			/* 三级子表 */
			var table3s = table2s.item(i).childNodes;
			for (var i3=0,j3=table3s.length; i3<j3; i3++){
				var table3Name = table3s.item(i3).getAttribute("tablename");
				uneditGrid(table3Name);
				var table3Grid = document.getElementById(table3Name + "BodyTable");
				for (var m3=table3Grid.rows.length-1,n3=-1; m3>n3; m3--){
					table3Grid.deleteRow(m3);
				}
			}
		}
		document.getElementById("status").setAttribute("value","new");
		/* 将所有的字段设置为可写 */
		setPageReadOnly(false);
		setChanged(false);
		if (eval("typeof after_fadd ==\"function\"")){
			eval("after_fadd()");
		}
}

function fhelpF(){
	var names = new Array();
	var values = new Array();
	var fieldsWithKilo = new Array();
	/*
	var bodyTable = document.getElementById("GL_VOU_DETAIL_ASSBodyTable");
	var row = bodyTable.rows[3];
	for(var m =0; m < bodyTable.rows.length; m++){
		alert(m +":" + bodyTable.rows[m].innerHTML);
		}
	//alert(getRowField(row,"VOU_SEQ"));
	*/
	//getDBDataToArea("AS_GETPRIV_MENU",names,values,"A1",null,false,null,null,null);
	//getDBDataToArea("rule_test",names,values,"A3","",false,null,null,null,20);
	//setGridFieldVisible("GL_VOU_DETAIL","ACC_CODE",false);
	//qryDataAsGrid("rule_test",names,values,false,null,null,"A3",null,null,20);
	//var row = getCurrentRow("MA_CASH_CONVERSION");
	//setRowField(row,"BILL_VAL","999");
	//doPreCol("","",true,true);
	//var result = getSelectedRows("GL_VOU_DETAIL");
	//alert(result[0].outerHTML);
	//alert("length:" + result.length);

	var compoName = getCompoName();
	var subsys;

	if (compoName.indexOf("_")>0)
	{
		subsys= compoName.substr(0, compoName.indexOf("_"));
	}
	else
	{
	subsys= compoName.substr(0,2);
	}
	if(subsys != "AS"){
		var win_help = open("/" + subsys + "/help/" + subsys + "/"
			+ compoName + ".htm", "anonymous",
			"menubar=no,status=no,toolbar=yes,"
			+ "resizable=yes,titlebar=yes,scrollbars=yes,"
			+ "height=" + (screen.availHeight - 30)*2/3 + ",width="
			+ (screen.availWidth - 460) + ",top=0,left=450");

	}else{
		var win_help = open("help/" + subsys + "/" + compoName + ".htm", "anonymous",
			"menubar=no,status=no,toolbar=yes,"
			+ "resizable=yes,titlebar=yes,scrollbars=yes,"
			+ "height=" + (screen.availHeight - 30)*2/3 + ",width="
			+ (screen.availWidth - 460) + ",top=0,left=450");
	}
	//setGridFieldVisible("A3","IS_ALT",false);
	//setGridFieldVisible("A1","NAME",false);
}

function feditF(){
	var names = new Array();
	var values = new Array();
	var fieldsWithKilo = new Array();
	//getDBDataToArea("AS_GETPRIV_MENU",names,values,"A1",null,false,null,null,null);
	//getDBDataToArea("rule_test",names,values,"A3","",false,null,null,null,20);
	//qryDataAsGrid("rule_test",names,values,false,null,null,"A3",null,null,20);

	setPageReadOnly(false);
	setFuncDisabled("fsave", false);
	setFuncDisabled("fedit", true);

	//修改时控制不能提交
	var wfDataObj = getWfData();
	if (wfDataObj.getProcessInstId()) {
		 var workitemId = wfDataObj.getWorkitemId();
		 if(workitemId){
			 setFuncDisabled("fimpower",true);
			 setFuncDisabled("fhandover",true);
			 setFuncDisabled("fwithdraw",true);
			 setFuncDisabled("funtreadflow",true);
			 setFuncDisabled("fcommit",true);
		 }
	}

	var tableName = getMainTableName();
	var pFields = getPrimaryFields();
	for (var i=0,j=pFields.length; i<j; i++){
		setReadOnly(pFields[i],true,tableName);
	}
	document.getElementById("status").setAttribute("value","editing");
	if (eval("typeof after_fedit ==\"function\""))
		eval("after_fedit()");

}
function isEditing(){
	var rtn = false;
	var tempEdit = document.getElementById("status").getAttribute("value");
	if(tempEdit == "editing")
		rtn = true;
	return rtn;
}
//打印设置
function fdynamicPrintSet(){
	var r2 = true;
	if(typeof(before_fdynamicPrintSet) == "function")
			r2 = eval("before_fdynamicPrintSet()");
	if(!r2) return;
	var params = getPrintSetParam();
	var componame = getCompoName();
	var win = showModalDialog("./dynamicPrintSet?componame="+componame+"",params,
													"resizable:yes;status:no;help:no;dialogHeight:400px;dialogWidth:400px;");
	if(win){
		var params = win;
		//setPrintSetParam(params);
		if (params[0]!="applySet"){
			var entityName=params[0];
			if (params[1]=="fop")
				fopdesigner(entityName.substring(0,entityName.length - 2));
			else if (params[2] == "template"){
					var i = params[3].indexOf(",");
					if(i > -1){
						params[3] = params[3].substring(0,i);
						}
					jasperdesigner(entityName,params[3]);
			}
		}
	}
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
		var win = window.open("./prntemplate?prnTplName="+entityName+"&prnTplCode="+entityName+"&newflag="+newflag,"printTemplate",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
		}
}
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
//  setTimeout("", 500);
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
			newflag=false;//数据库中存在为false，不存在为true
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
	var win = window.open("./prntempdesigner?componame="+prn_compo_id+"&prnTplName="+prn_tpl_name+"&prnTplCode="+prn_tpl_jpcode+"&reporttype="+prn_tpl_reporttype+"&newflag="+newflag+"&FIXROWCOUNT="+prn_tpl_fixrowcount+"&componameprn="+componameprn,"模板设计器",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
}
///废弃,不使用zuodf 2004/10/14 新的 进入模板设计器 功能 设置，首先判断指定代码的打印模板是否存在，然后调用模板设计器 设置主体页面；
function ftempdesigner(){
	var entityName = getCompoName();
	///alert(entityName);
	var sqljpcode;
	var names = new Array();
	var values = new Array();
	names[0] = "componame";
	if (entityName=="AS_PRINT_JASPERTEMP"){
	entityName=getField("PRN_COMPO_ID");
	names[1] = "sqljpcode";
	sqljpcode=" and PRN_TPL_JPCODE='"+getField("PRN_TPL_JPCODE")+"'";
	values[1] = sqljpcode;
		}
	values[0] = entityName;
	//names[1] = "sqljpcode";
	//values[1] = entityName;

	getDBData("AS_GET_PRINT_JASPERTEMP",names,values,"ftempdesigner_re");

}
///废弃,不使用zuodf 2004/10/14 新的 进入模板设计器 功能 设置 依据结果进行处理，首先判断指定代码的打印模板是否存在，然后调用模板设计器 设置主体页面；
function ftempdesigner_re(result){

	 if(result.getAttribute("success") == "false"){
		//出错处理
		alert("错误信息："+result.innerHTML);
	}else{
		var deltaNode = result.documentElement;///根结点
		//var entityName = getCompoName();
		///alert(entityName);
		var prn_compo_id;
		var prn_tpl_jpcode;
		var prn_tpl_name;
		var prn_tpl_reporttype;
		var prn_tpl_html,prn_tpl_reporttype,prn_tpl_fixrowcount;
		prn_compo_id=deltaNode.firstChild.firstChild.getAttribute("value");
		prn_tpl_jpcode=deltaNode.firstChild.firstChild.nextSibling.getAttribute("value");
		prn_tpl_name=deltaNode.firstChild.firstChild.nextSibling.nextSibling.getAttribute("value");
		prn_tpl_reporttype=deltaNode.firstChild.firstChild.nextSibling.nextSibling.nextSibling.getAttribute("value");
		prn_tpl_fixrowcount=deltaNode.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("value");
		var newflag = false;
		/*
		if(prn_tpl_html=="")
			newflag = true;
		else
			newflag = false;
*/
			 var win = window.open("prntempdesigner?componame="+prn_compo_id+"&prnTplName="+prn_tpl_name+"&prnTplCode="+prn_tpl_jpcode+"&newflag="+newflag+"&reporttype="+prn_tpl_reporttype+"&FIXROWCOUNT="+prn_tpl_fixrowcount,"模板设计器",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
	}
}


///打印模板设置，首先判断指定代码的打印模板是否存在，然后调用打印模板设置页面；
function fprn_tpl_setF(){
	fdynamicPrintSet();
		/*
	var params = getPrintSetParam();
if (params[1]=="fop"){
	var entityName = getCompoName();
	///alert(entityName);
	var names = new Array();
	var values = new Array();
	names[0] = "prn_tpl_code";
	values[0] = entityName;

	getDBData("AS_GET_Prn_Tpl_Code",names,values,"fprn_tpl_setF_re");
}else
{ if (params[1]=="jasperreport"){
	if (params[2]=="template"){
		ftempdesigner();
		}
	else{
		alert("直接打印，不需要设置打印模板。");
	}
}
}
*/
}
//废弃,不使用zuodf 2004/10/14
function fprn_tpl_setF_re(result)
{
	if(result.getAttribute("success") == "false"){
		//出错处理
		alert("错误信息："+result.innerHTML);
	}else{
		var deltaNode = result.documentElement;///根结点
		var entityName = getCompoName();
		///alert(entityName);
		var newflag = null;
		if(deltaNode.hasChildNodes)
			newflag = false;
		else
			newflag = true;
/*
			 var win = window.open("prntempdesigner?prnTplName="+entityName+"&prnTplCode="+entityName+"&newflag="+newflag,"模板设计器",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
*/
			var win = window.open("prntemplate?prnTplName="+entityName+"&prnTplCode="+entityName+"&newflag="+newflag,"printTemplate",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");

	}
}

function getBtnStatus(func){
	return (!document.getElementById(func + "ID").disabled);
}

function setBrowseVisible(tableName, fieldName, visible){
	var span = document.getElementById(tableName + "_" + fieldName + "Span");
	var browse = span.childNodes.item(2);
	browse.style.display = visible ? "":"none";
}

function setOpenVisible(tableName, fieldName, visible){
	var span = document.getElementById(tableName + "_" + fieldName + "Span");
	var browse = span.childNodes.item(3);
	browse.style.display = visible ? "":"none";
}

function frefreshF(){
	var status = document.getElementById("status").getAttribute("value");
	if(status == "new") return;
	var condition = "";
	var tableName = getMainTableName();
	var pageName = getPageMeta().getPageName();
	var compoName = getPageMeta().getCompoName();
	var unique = getPageMeta().getUnique();
	var fieldTypes = getPrimaryFieldType();
	var fieldNames = fieldTypes[0];
	var fieldType = fieldTypes[1];
	// <inline> 2004-6-8 TODO: 提取，处理 value 中的特殊字符
	for(var i = 0; i < fieldNames.length; i++){
		if(i != 0)
			condition += " and ";
		var fieldName = fieldNames[i];
		var type = fieldType[i];
		var value = getField(fieldName, tableName);
		if(type.toLowerCase() == "num"){
			condition += tableName + "." + fieldName + " = " + value;
		}else{
			condition += tableName + "." + fieldName + " = '" + value + "'";
		}
	}
	// </inline>
	var href = "Proxy?function=geteditpage&condition=" + condition +
												 "&componame=" + compoName + "&fieldvalue=" +
												 pageName + "&unique=" + unique;
		if(status == "editing"){
		if(changed){
			if(confirm("页面数据不保存吗？")){
				changed = false;
				window.location.href = href;
				window.location.reload();
			}
		}else{
			window.location.href = href;
			window.location.reload();
		}
	}else{
		window.location.href = href;
		window.location.reload();
	}
}

function getPrimaryFieldType(){
	var result = new Array();
	var fieldsName = new Array();
	var fieldsType = new Array();
	var meta = document.getElementById("fields");
	var fields = meta.getElementsByTagName("span");
	for (var i = 0, j = fields.length; i < j; i++) {
		fieldName = fields.item(i).getAttribute("fieldname");
		fieldType = fields.item(i).getAttribute("type");
		var pk = fields.item(i).getAttribute("pk");
		if(pk == "true"){
			fieldsName[fieldsName.length] = fieldName;
			fieldsType[fieldsType.length] = fieldType;
		}
	}
	result[0] = fieldsName;
	result[1] = fieldsType;
	return result;
}

function updateDigest(){
	var pageName = getPageMeta().getPageName();
	var compoName = getCompoName();
	var meta = document.getElementById("maintable");
	var maintable = meta.getAttribute("tablename");
	var fieldTypes = getPrimaryFieldType();
	var fieldNames = fieldTypes[0];
	var fieldType = fieldTypes[1];
	var delta = pageDataToEntityString(maintable, fieldNames); // 2004-6-8
	var names = new Array();
	var values = new Array();
	names[0] = "pageName";
	values[0] = pageName;
	names[1] = "data";
	values[1] = delta;
	names[2] = "compoName";
	values[2] = compoName;
	var digest = requestData("getDigest", compoName, names, values);
	if (digest && digest.text)
		document.getElementById("digest").setAttribute("value", digest.text);
}

function fcommitF() {
	var wfData = getWfData();
	if (!wfData.getProcessInstId()) {
		alert("错误: 不是工作流模式的页面，操作无法继续！");
		return;
	}
	// 注意032551: 已提交的工作项没有工作项ID
	if (!wfData.getWorkitemId()) {
		alert("错误: 工作项已提交，不能再次提交！");
		return;
	}
	if (isSaving()) {
		alert("前一个处理尚未完成，请稍后再试！");
		return;
	}

	var action = commitDialog(wfData);
	//dump(action);
	if (!action || !action.isOk)
		return;

	action.ACTION_NAME = action.ACTION_NAME;
	var positionId = getSv("svOrgPoCode");
	action.POSITION_ID = positionId;
//  alert(action.needMessage);
	commit_default(action);
}

/**
 * 工作流提交的默认处理函数
 * 0. 检查页面参数 1. 选择下一个活动 2. 选择下一个活动的执行者 3. 填写意见，添加附件等
 * @param action 执行的动作，应该有这些数据项 NEXT_EXECUTOR, NEXT_EXECUTOR2,
 *   ACTION_NAME, COMMENT, POSITION_ID，分别为主办人、辅办人、动作ID、意见、职位，
 *   另外还有 WF_IS_BIND_COMMIT，表示提交时是否更新整条记录，为 "Y" 时更新。
 */
function commit_default(action) {
	var pageMeta = getPageMeta();
	var wfData = getWfData();
	//dump(wfData); dump(wfData.toString());
	if (!wfData.getProcessInstId()) {
		alert("错误: 不是工作流模式的页面，操作无法继续！");
		return;
	}
	// 注意032551: 已提交的工作项没有工作项ID
	if (!wfData.getWorkitemId()) {
		alert("错误: 工作项已提交，不能再次提交！");
		return;
	}
	if (!action) {
		alert("错误: action 参数无效！");
		return;
	}
	wfData.setNextExecutor(action.NEXT_EXECUTOR);
	wfData.setNextExecutor2(action.NEXT_EXECUTOR2);
	//wfData.setNextActivity(...);
	wfData.setActionId(action.ACTION_NAME);
	wfData.setComment(action.COMMENT);
	wfData.setPositionId(action.POSITION_ID);
	wfData.setIsBindCommit(action.WF_IS_BIND_COMMIT);
	wfData.setNeedMessage(action.needMessage);
	wfData.setNeedShortMessage(action.needShortMessage);
	wfData.setNeedEmail(action.needEmail);
	wfData.setSvUserName(getSv("svUserName"));
//  wfData.setBaseUrl(getBaseURL());
//  wfData.setWFVariable("A","6");

	var componame = pageMeta.getCompoName();
	var names = new Array();
	var values = new Array();
	names[0] = "data";
	values[0] = getPageData1();
	names[1] = "componame";
	values[1] = componame;
	names[2] = "pagename";
	values[2] = pageMeta["unique"];
	names[3] = "wfdata";
	values[3] = wfData.toString();
	updateDigest();

	var com = getCommunity();
	if (com == null)
		return;
	com.doRequest("commit", componame, names, values, "commit_default_re");
}

function commit_default_re(result) {
	clearIsSaving();
	if ("false" == result.getAttribute("success")) {
		alert(result.innerHTML);
		return;
	}
	if (typeof after_fcommit == "function"){
			after_fcommit();
	}
	alert("提交成功！");
	setFuncDisabled("fcommit", true);
	setFuncDisabled("fwithdraw", true);
	setFuncDisabled("fhandover", true);
	setFuncDisabled("fimpower", true);
	setFuncDisabled("ftransferflow", true);
	setFuncDisabled("funtreadflow", true);
	setFuncDisabled("fsave", true);
	setFuncDisabled("fedit", true);
	setBindCommitButtonEnable(false);
	// TODO: 也禁止提交窗口的确定按钮
	setFuncDisabled("foa_agree", true);
	setFuncDisabled("foa_comment", true);
	setFuncDisabled("foa_edit_num", true);
	setFuncDisabled("foa_pass", true);
	setFuncDisabled("foa_publish", true);
	setFuncDisabled("foa_sign_send", true);
	setFuncDisabled("fopensearch", true);
	setFuncDisabled("fhandin", true);
	if (opener){
		opener.simpleSearch();
	}
	window.close();
}

/** 显示工作流意见历史 */
function fhistoryF() {
	var wfData = getWfData();
	if (!wfData.getProcessInstId()) {
		alert("错误: 不是工作流模式的页面，操作无法继续！");
		return;
	}
	showModalDialog("processHistory.jsp?process_inst_id="
		+ wfData.getProcessInstId(), null,
		"status:no;resizable:yes;help:no;dialogHeight:400px;dialogWidth:600px");
}

/** 暂存意见，输入参数包含 PROCESS_INST_ID, WORKITEM_ID, COMMENT */
function WF_saveComment(wfData) {
	var newWfData = new Object();
	newWfData.PROCESS_INST_ID = wfData.PROCESS_INST_ID;
	newWfData.WORKITEM_ID = wfData.WORKITEM_ID;
	newWfData.COMMENT = wfData.COMMENT;

	var names = new Array();
	var values = new Array();
	names[0] = "wfdata";
	values[0] = AS_objectToEntityString(newWfData);
	var com = getCommunity();
	if (com == null)
		return;
	com.doRequest("updateWFData", getCompoName(), names, values, "WF_saveComment_re");
}

function WF_saveComment_re(result) {
	if ("false" == result.getAttribute("success")) {
		alert(result.innerHTML);
		return;
	}
}

/**
 * 检查所有子表中的主键是否重复
 * 20040812
 */
function gridsRowRepeat(){
	var table2s = document.getElementById("maintable").childNodes;
	for (var i=0,l=table2s.length; i<l; i++){
		var tableName = table2s.item(i).getAttribute("tablename");
		if (document.getElementById(tableName + "HeadTable")==null){
		  continue;
		}
		if (gridRowRepeat(tableName)){
			return true;
		}
	}
	return false;
}

/**
 * 检查某个子表中的主键是否重复
 * tableName 表名
 * 20040812
 */
function gridRowRepeat(tableName){
	var tmp = document.getElementById(tableName + "PKs").childNodes;
	if (tmp.length == 0) return false;
	uneditGrid(tableName);
	var PKs = new Array();
	for(var i=0,l=tmp.length; i<l; i++){
		var fieldName = tmp.item(i).getAttribute("fieldname");
		PKs[i] = parseInt(document.getElementById(tableName + "_" + fieldName + "Cell").colno);
	}
	var grid = document.getElementById(tableName + "BodyTable");
	var l = grid.rows.length;
	for (var k=0; k<l; k++){
		var row1 = grid.rows[k];
		for (var i=k+1; i<l; i++){
			var row2 = grid.rows[i];
			var j=0, p=PKs.length;
			for(; j<p; j++){
				if(row1.cells[PKs[j]].innerHTML != row2.cells[PKs[j]].innerHTML) break;
			}
			if (j == p){
				alert("子表第" + parseInt(k+1) + "行与第" + parseInt(i+1) + "行数据重复，请重新输入！");
				return true;
			}
		}
	}
	return false;
}

function fbindcommitF(func,action) {
	var pageMeta = getPageMeta();
	var wfData = getWfData();
	if (!wfData.getProcessInstId()) {
		alert("错误: 不是工作流模式的页面，操作无法继续！");
		return;
	}
	if (!wfData.getWorkitemId()) {
		alert("错误: 工作项已提交，不能再次提交！");
		return;
	}
//  if (isSaving()) {
//    alert("前一个处理尚未完成，请稍后再试！");
//    return;
//  }
	if (!action) {
		alert("错误: action 参数无效！");
		return;
	}
	wfData.setActionId(action);
	wfData.setPositionId(getSv("svOrgPoCode"));
	wfData.setIsBindCommit("Y");
	wfData.setSvUserName(getSv("svUserName"));
	var r = true;
	if (eval("typeof " + func + " ==\"function\"")){
		 r=eval(func + "()");
	}
	if (!r){
		 return;
	}
	var componame = pageMeta.getCompoName();
	var names = new Array();
	var values = new Array();
	names[0] = "data";
	values[0] = getPageData1();
	names[1] = "componame";
	values[1] = componame;
	names[2] = "pagename";
	values[2] = pageMeta["unique"];
	names[3] = "wfdata";
	values[3] = wfData.toString();
	//setIsSaving();
	updateDigest();
	var com = getCommunity();
	if (com == null)
		return;
	com.doRequest("commit", componame, names, values, "commit_default_re");
}
//function fbindcommit() {
//   var wfData = getWfData();
//   alert(wfData.getActionId() + wfData.getIsBindCommit());
	 //wfData.setNextExecutor("CFL,CNK");
//   return true;
//}

function hasOrg(){
	var names = new Array();
	var values = new Array();
	var count = qryData("AS_GET_HAS_ORG", names, values);
	var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
	xmlDom.loadXML(count);
	if(xmlDom.firstChild.firstChild.firstChild.getAttribute("value") == "N"){
		return "N";
	}
	return "Y";
}

//桌面批处理提交后台。wtm，20041214
function fdesktop_batch(){
    if(!confirm("确定要进行桌面批设置吗?"))
    return;
    var data ;
    var retValue = showModalDialog("desktopbatch.jsp", data,
    "status:no;resizable:no;help:no;dialogHeight:450px;dialogWidth:500px");
    if (!retValue || !retValue.isOk)
    return;
    var userId = retValue.NEXT_EXECUTOR;
    var userName = retValue.NEXT_EXECUTOR_NAME;
    var userNums = userId.split(",").length;
    if (userNums >10){
      alert("对不起，您每次最多只能为10位用户进行桌面批设置，请重新选择用户！");
      return;
    }
    if (userNums==1 && userName==""){
      alert("您未选定任何用户，请重新选择用户");
      return;
    }
    var names = new Array();
    var values = new Array();
    names[0] = "AREA_ID";
    values[0] = getField("AREA_ID");
    names[1] = "userId";
    values[1]= userId;
    //values[1]= String(userId).split(',');
    var result = requestData("desktopBatch", "all", names, values);
    //alert(result.xml);
    setFuncDisabled("fdesktop_batch", true);
    if (result==null){
       var resu = "";
       return resu ;
    }else{
       return result.xml;
    }
}
/**
*内容发布模板设置。wtm，20041216
*/
function fpubset(){
   var compo_id = null;
   var isMain = false;
   var fieldName = null;
   var fieldId = null;
   var pubHtml = "" ;
   if (!document.getElementById("entityMeta")&& document.getElementById("entityMeta")!=null ){	//取部件名
      compo_id = document.getElementById("entityMeta").getAttribute("entityName");
   }else{
      compo_id = document.getElementById("maintable").getAttribute("tablename");
      isMain = true;
   }
   var tplcode = compo_id + "_TEMP";
   var pubHtml2 = queryTempExist(tplcode);
   if(isMain){//编辑页面
        var fieldname = getMainFields();
        var fieldnames = fieldname.toString().split(",");
        var lentmp = fieldnames.length;
        for (var i = 0; i <lentmp;i++){
          fieldid = fieldnames[i];
          var fieldname = document.getElementById(compo_id + "_"+fieldid+"CaptionID").innerText;
          if (fieldname == null || document.getElementById(compo_id + "_"+fieldid+"CaptionID").style.display == "none"){
            continue;
          }
          if(fieldname.indexOf("*")>=0){
    	       fieldname = fieldname.substr(0,fieldname.indexOf("*"));
          }
          pubHtml = pubHtml+  fieldname + "[@" + fieldid +"@]" +"\r\n" ;
        }
    }
   if (pubHtml2=="@@") pubHtml2 = "";//模板内容为空。
   var pubData=new pubData1();
   pubData.setinitHtml(pubHtml);
   pubData.setDBHtml(pubHtml2);
   if (pubHtml2 == ""){//若不存在模板，直接获取页面字段
     var win_edit = showModalDialog("pubset.jsp?compo_id="+compo_id,pubData,"menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;scrollbars=yes;dialogHeight=575px;DialogWidth=500px;top=" + ((screen.availHeight-400)/2-100) + "px;left=" + (screen.availWidth-450)/2 + "px;help=no");
   }else{//数据库有记录，
     var win_edit = showModalDialog("pubset.jsp?compo_id="+compo_id,pubData,"menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;scrollbars=yes;dialogHeight=575px;DialogWidth=500px;top=" + ((screen.availHeight-400)/2-100) + "px;left=" + (screen.availWidth-450)/2 + "px;help=no");
   }
}


//查询是否已存在发布模板，wtm,20041219
function queryTempExist(tplcode){
      var names = new Array();
      var values = new Array();
      names[0] = "tplcode";
      values[0] = tplcode;
      var result = requestData("queryTemp", "all", names, values);
      if (result==null){
         var resu = "";
         return resu ;
      }else{
      	 return result.xml;
      }
}


function queryPubSid(masterTabFilter){
      var names = new Array();
      var values = new Array();
      names[0] = "masterTabFilter";
      values[0] = masterTabFilter;
      var result = requestData("getPublishSid", "all", names, values);
      return result.text;
}
function getTemplateContent(){
   var compo_id = null;
   var isMain = false;
   if (!document.getElementById("entityMeta")&& document.getElementById("entityMeta")!=null ){	//取部件名
      compo_id = document.getElementById("entityMeta").getAttribute("entityName");
   }else{
      compo_id = document.getElementById("maintable").getAttribute("tablename");
      isMain = true;
   }
   var tplcode = compo_id + "_TEMP";
   var pubHtml = queryTempExist(tplcode);
   if (pubHtml == ""){//若不存在模板，直接获取页面字段
//     alert("发布模板不存在，请先设置模板!");
     return "";
   }
   var fieldSpan=document.getElementById("fields");
   var tableName=fieldSpan.getAttribute("tablename");
   var fieldList = fieldSpan.childNodes;

   for (var m = 0, n = fieldList.length; m < n; m++){
     var fieldName = fieldList.item(m).getAttribute("fieldname");
     var fieldValue=getField(fieldName,tableName,true);
//     alert(fieldValue);
//     alert(pubHtml2);
     fieldName = "\\[\\@" + fieldName + "\\@\\]";
     var re = new RegExp(fieldName,"ig");
     pubHtml = pubHtml.replace(re, fieldValue);
   }
  return pubHtml;
}
/**
 *内容发布接口
 *参数：mainTableData，可以为空，当且仅到pdf方式发布时，使用的一个可选参数
 *当用户要发布报表页面时，用户可以指定要发布的主表数据。
 */
 function fpublishF(mainTableData){
   var pageUrl=getFilterHostUrl(document.URL,true);
   var pubData = new PublishData();
   pubData.setMasterTabFilter(pageUrl);
   var sid=queryPubSid(pageUrl);

   var mode="1";
   var mainTableName=getMainTableName();
   if (mainTableName.length>5){
      if (mainTableName.substr(mainTableName.length-5).toUpperCase()=="_TEMP"){
         mode="2";
      }
   }
   if (mode=="2"){
//     var names = new Array();
     var values = new Array();
	 values[2]="";
     values[3]="";
	 values[4]="";
	 values[5]="";
	 values[6]="false";
     var params = getPrintSetParam();
	   if (params[1]=="jasperreport"){
       if (params[2]=="template"){
       				   values[0]= params[3];
			 	if ((!document.getElementById("gridfirstpageID"))){//不分页  
	          		values[1] = getPrintDataDirect();//直接从页面获取
	          		}
	          	else{
	          		//不从页面获取，而是从服务端获取，并传递必要参数
	          		values[1]="";
	          		values[3]= getPageMeta().getPageName();//页面名称，用于服务端取发布数据
	          		values[4]=getAreaName();//区域名称
	          		if(!mainTableData){
	          			mainTableData=getMainTableData();	
	          		}
	          		values[5]=mainTableData;
	          		values[6]="true";//要从服务端获取数据
	          		//alert(values[5]);
	          		//return  ;
	          	}
	          	
			   values[2] =params[4];
		   }
		 }
//     pubData.setPrintNames(names);
     pubData.setPrintValues(values);
//     pubData.setPrintParams(params);
     pubData.setWindowObject(window);
	 }else{
        if (sid==""){
          pubHtml=getTemplateContent();
          if (pubHtml==""){
             alert("发布模板不存在，请先设置模板!");
             return;
          }
          pubData.setContent(pubHtml);
       }
	 }

   pubData.setMode(mode);
   pubData.setCompoName(getCompoName());
   pubData.setSid(sid);
   var win_edit = showModalDialog("./jsp/platform/publish.jsp?sid=" + sid,pubData,
                 "menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;" +
                        "scrollbars=yes;dialogHeight=" + (screen.availHeight - 30) +
                         ";DialogWidth=" + (screen.availWidth - 10) + ";top=0;left=0;" +
                         "help=no");
 }

 function fpublish_RPF(){
//   alert(document.URL);
//   alert(parent.document.URL);
//   alert(rpTypeCode);
//   return;
   var pageUrl=getFilterHostUrl(parent.document.URL,true);
//   alert(pageUrl);
   var pageUrl=pageUrl + getRpFilterUrl(document.URL);

//   alert(pageUrl);
//   return;
   var pubData=new PublishData();
   pubData.setMasterTabFilter(pageUrl);

   var mode="3";
   var sid=queryPubSid(pageUrl);
   var content=getRpFileStr();
   pubData.setContent(content);
   pubData.setWindowObject(window);

   pubData.setMode(mode);
   pubData.setCompoName("RP");
   pubData.setSid(sid);
   pubData.setFileName(saveRP());

   var win_edit = showModalDialog("./jsp/platform/publish.jsp?sid=" + sid,pubData,
                 "menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;" +
                        "scrollbars=yes;dialogHeight=" + (screen.availHeight - 30) +
                         ";DialogWidth=" + (screen.availWidth - 10) + ";top=0;left=0;" +
                         "help=no");
 }

function freturnPublishF(){
  var tableName = getMainTableName();
  var pageUrl=getField("MASTER_TAB_FILTER",tableName,true);
  if (trim(pageUrl)==""){
    alert("没有要返回修改的内容！");
    return;
  }
//  alert(Math.random() * 100000000000000000);
  pageUrl=pageUrl + "&unique=123";
//  alert(pageUrl);
  var win = window.open(pageUrl,"",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
//  alert(win.document.getElementById("TITLEEdit").value);
//  win.Call_ClickF('fpublish');
//  alert("ok");
}
function fpublishToPortal(){
  var tableName = getMainTableName();
  var pageUrl="publishToPortal?sid=" + getField("SID",tableName,true);
//  alert(pageUrl);
  var win = window.open(pageUrl,"发布至Portal",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
}
function getFilterHostUrl(oldUrl,isFilterTail){
   if (oldUrl==""){
      return "";
   }
   var pageUrl=oldUrl;
   var charNum=pageUrl.indexOf("//");
   if (charNum>0){
     charNum=pageUrl.indexOf("/",charNum+2);
     if (charNum>0){
       pageUrl=pageUrl.substr(charNum);
     }else{
       return "";
     }
   }else{
     return "";
   }
   if (isFilterTail){
     charNum=pageUrl.lastIndexOf("&unique=");
     if (charNum>0){
       pageUrl=pageUrl.substring(0,charNum);
     }
   }
   return pageUrl;
}
function getRpFilterUrl(pageUrl){
   if (pageUrl==""){
      return "";
   }
   var url=pageUrl;
   var charNum=pageUrl.indexOf("?");
   if (charNum > 0){
      url=url.substr(charNum);
   }
   var rpStr="rpTypeCodes=";
   charNum=url.indexOf(rpStr);

   if (charNum>0){
     var leftUrl=url.substring(0,charNum+rpStr.length);
     charNum=url.indexOf("&",charNum);
     var rightUrl="";
     if (charNum>0){
       rightUrl=url.substr(charNum);
     }
     var url=leftUrl + "(" + "'" + rpTypeCode + "'" + ")" + rightUrl;
     return url;
   }else{
     return pageUrl;
   }
}
function saveRP(){
   var rptypename = document.getElementById(rpTypeCode+"Tab").getAttribute("RP_TYPE_NAME");
   var rptypecode = document.getElementById(rpTypeCode+"Tab").getAttribute("RP_TYPE_CODE");
   var savefilename = rptypename + "_" + s_rpRptPeriod + "_" + rptypecode;
   var filename = "c:\\RP\\" + savefilename;
   var fso = new ActiveXObject("Scripting.FileSystemObject");
   var path = "c:\\RP";
   if (!fso.FolderExists(path)) {
    	var a  = fso.createFolder("c:\\RP\\");
   }
   filename =filename + ".xls";
   var f;
   var ForWriting = 2;
   try{
       f = fso.OpenTextFile(filename, ForWriting, true);
   }catch(e) {
    return filename;
  }
  var htmldata = getRpFileStr();
  var i=0;
  for( ;i < htmldata.length;i++)
  {
   try{
      f.Write(htmldata.charAt(i));
    }
    catch(e) {
      f.Close();
      return filename;
    }
  }
  f.Close();
  return filename;
}

function pubData1() {
}
pubData1.prototype.getinitHtml = function(){return this.initHtml;};
pubData1.prototype.setinitHtml = function(v){this.initHtml = v;};
pubData1.prototype.getDBHtml = function(){return this.DBHtml;};
pubData1.prototype.setDBHtml = function(v){this.DBHtml = v;};

function PublishData() {
}
PublishData.prototype.getMasterTabFilter = function(){return this.MasterTabFilter;};
PublishData.prototype.setMasterTabFilter = function(v){this.MasterTabFilter = v;};
PublishData.prototype.getContent = function(){return this.Content;};
PublishData.prototype.setContent = function(v){this.Content = v;};
PublishData.prototype.getMode = function(){return this.Mode;};
PublishData.prototype.setMode = function(v){this.Mode = v;};
PublishData.prototype.getPrintNames = function(){return this.PrintNames;};
PublishData.prototype.setPrintNames = function(v){this.PrintNames = v;};
PublishData.prototype.getPrintValues = function(){return this.PrintValues;};
PublishData.prototype.setPrintValues = function(v){this.PrintValues = v;};
PublishData.prototype.getPrintParams = function(){return this.PrintParams;};
PublishData.prototype.setPrintParams = function(v){this.PrintParams = v;};
PublishData.prototype.getCompoName = function(){return this.CompoName;};
PublishData.prototype.setCompoName = function(v){this.CompoName = v;};
PublishData.prototype.getWindowObject = function(){return this.WindowObject;};
PublishData.prototype.setWindowObject = function(v){this.WindowObject = v;};
PublishData.prototype.getSid = function(){return this.Sid;};
PublishData.prototype.setSid = function(v){this.Sid = v;};
PublishData.prototype.getFileName = function(){return this.FileName;};
PublishData.prototype.setFileName = function(v){this.FileName = v;};

function setInputInitial(subTableName, subTableField){
  var inp = document.getElementById(subTableName + "." + subTableField);
  if(inp){
    document.getElementById("controlSelect").value = inp.isGran;
    if(inp.range == null || inp.range == "null"){
      document.getElementById("rangeInput").value = "";
    }else{
      document.getElementById("rangeInput").value = inp.range;
    }
  }else{
    document.getElementById("controlSelect").value = 0;
    document.getElementById("rangeInput").value = "";
  }
}

function refreshInputInitial(subTableName, subTableField, sValue, rValue){
  var inp = document.getElementById(subTableName + "." + subTableField);
  if(inp){
    inp.isGran = sValue;
    inp.range = rValue;
  }else{
    var tmp = document.getElementById("inputOriginal");
    tmp.innerHTML += "<span id=\"" + subTableName + "." + subTableField
                     + "\" range=\"" + rValue + "\" isGran=\"" + sValue + "\"></span>";
  }
}

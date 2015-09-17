/************全局变量定义*******************/
var voFree = null;
var voChildFree = null;
var voToolbar = null;
var voGrid1 = null;
//var voGrid2 = null;
var voGrid3 = null;
var voImageBox = null;
var optEmpLength = 0;//人员编码长度
var userId = null;//登录帐号
var optEmp = null;//人员编码是否固定
var optAsNameDupl = null;//是否允许人员同名
var _global_tIsDeleted= false;//删除判断，组织树用
var _global_tIsSaved= false;
var _global_tIsNew = true;

var vsGroupIdMap = new Map();//用户组ID，根据职位码查出


//---页面初始化------------------------------------
function setPageInit(){
	if (PageX.shouldAddRow){
		DataTools.insertRow("AS_USER", null, null, null, true);
	}
	var mainTableName = DataTools.getMainTableName("AS_EMP");
	var childTableName = DataTools.getMainTableName("AS_USER");
  	voFree = PageX.getFree(mainTableName);
  	voChildFree = PageX.getFree(childTableName);
  	voChildFree.fillDefaultValueToBox();
  	
  	voImageBox = PageX.getCtrlObj("PHOTO");
  	
	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
  	
  	voEmpCode = PageX.getCtrlObj("EMP_CODE");
  	voEmpCode.addListener(new Listener(voEmpCode.OnChange, eventAnswer_EmpCode_OnChange, this));
  	
	voGrid1 = PageX.getCtrlObj("AS_EMP_POSITION_Grid");
	voGrid1.addListener(new Listener(voGrid1.OnAfterDeleteRows, eventAnswer_Grid1_OnAfterDeleteRows, this));
	voGrid1.addListener(new Listener(voGrid1.OnAfterInsertRow, eventAnswer_Grid1_OnAfterInsertRow, this));
	//voGrid2 = PageX.getCtrlObj("AS_EMP_ROLE_Grid");
	voGrid3 = PageX.getCtrlObj("AS_USER_GROUP_Grid");
	voGrid3.addListener(new Listener(voGrid3.OnBeforeDeleteRow, eventAnswer_Grid3_OnBeforeDeleteRow, this));
	
	voGridOrg = voGrid1.getEditBox("ORG_CODE");
	voGridOrg.addListener(new Listener(voGridOrg.OnBeforeSelect, eventAnswer_GridOrg_OnBeforeSelect, this));
	
	voGridPosi = voGrid1.getEditBox("POSI_CODE");
	voGridPosi.addListener(new Listener(voGridPosi.OnBeforeSelect, eventAnswer_GridPosi_OnBeforeSelect, this));
	voGridPosi.addListener(new Listener(voGridPosi.OnAfterSelect, eventAnswer_GridPosi_OnAfterSelect, this));
	
	pageInit();
}

function pageInit(){
	//-----只有系统管理员能看到证书序列号
	if("sa" != DataTools.getSV("svUserID")){
      	voFree.setFieldVisible("CA_SERIAL", false);
    }
    if(!PageX.isNew()){
	    //-----------编辑用户时，如果要编辑的用户是SA，置灰部分功能
	    if (trim(voFree.getValue("EMP_CODE").toUpperCase()) == "SA"){
	    	voFree.setValue("IS_LOGIN", "Y");
	    	voToolbar.setCallDisabled("fdelete", true);
	    	voToolbar.setCallDisabled("fgrantfunc", true);
	    	voToolbar.setCallDisabled("fcopyright", true);
	  	}
	  	voToolbar.setCallDisabled("fsave", true);
		voFree.setReadOnly(true);
		voGrid1.setReadOnly(true);
		//voGrid2.setReadOnly(true);
		voGrid3.setReadOnly(true);
		userId = voFree.getValue("USER_ID");
		setUserGroupMap();
	}else{
		voFree.setReadOnly(false);
		voGrid1.setReadOnly(false);
		//voGrid2.setReadOnly(false);
		voGrid3.setReadOnly(false);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fdelete", true);
		_global_tIsNew = true;
		voFree.setValue("IS_LOGIN", "Y");
		voFree.setValue("SEX", "1");
		empInfo();
	}
	setButtonDisabled(true);
	//---------获取人员的编码规则---------------------
  	getOptEmpRule();
  	//-----------------显示照片------------------------
  	setEmpPic();
}

function setButtonDisabled(isDisabled){
	voToolbar.setCallDisabled("fgrantfunc", isDisabled);
	voToolbar.setCallDisabled("fcopyright", isDisabled);
	voToolbar.setCallDisabled("fsetpwd", isDisabled);
	voToolbar.setCallDisabled("fpsdreset", isDisabled);
}

/******************将根据职位代码查询出的用户组ID放入MAP中*********************/
function setUserGroupMap(){
	var grid3_Rowcount = voGrid3.getRowCount();
	for(var i=0; i<grid3_Rowcount; i++){
		var groupId = voGrid3.getValueByRowField(i, "GROUP_ID");
		vsGroupIdMap.put(groupId, i);
	}
}
//----------------------------------------------
function setUserGroupReadOnly(){
	var vsGroupId = vsGroupIdMap.getAllItem();
	for(var i=0; i<vsGroupId.length; i++){
		voGrid3.setRowReadOnly(vsGroupId[i],true);
	}
}
/************************************************/
function setEmpPic(){
	var ischange = PageX.isChanged();
	var vsFileId= DataTools.getValue(voImageBox.getTableName(), voImageBox.getOuterObjCurRowX(), voImageBox.sBlobField);
	if(!PF.isEmpty(vsFileId)){
		voImageBox.setFileId(vsFileId);
	}
	PageX.tIsChanged = ischange;
}
function empInfo(){
	if(!PF.isEmpty(currentPath)){
		var curPath = "";
		if(pageType == "edit"){
			var parentPath = currentPath.substring(0, currentPath.length-1);
			curPath = parentPath.substring(0, parentPath.lastIndexOf("/")+1);
		}else{
			curPath = currentPath;
		}
		var pathArray = curPath.split("/");
		var pathNameArray = currentName.split("/");
		var posi_name = pathNameArray[pathNameArray.length-2];
		var org_name = pathNameArray[pathNameArray.length-3];
		var co_name = pathNameArray[pathNameArray.length-4];
		if(pathArray.length > 0){
			var allCode = pathArray[pathArray.length-2];
			var co_code = allCode.substring(0, allCode.indexOf("ORG_"));
			var org_code = allCode.substring(allCode.indexOf("ORG_")+4, allCode.indexOf("PO_"));
			var posi_code = allCode.substring(allCode.indexOf("PO_")+3);
			//alert("co_code=="+co_code+", org_code=="+org_code+", posi_code=="+posi_code);
			voGrid1.insertRow(-1);
			voGrid1.setColValue("CO_CODE", co_code);
			voGrid1.setColValue("CO_NAME", co_name);
			voGrid1.setColValue("ORG_CODE", org_code);
			voGrid1.setColValue("ORG_NAME", org_name);
			voGrid1.setColValue("POSI_CODE", posi_code);
			voGrid1.setColValue("POSI_NAME", posi_name);
		}
		changeUserGroup();
	}
}
function getOptEmpRule(){
	//系统级选项设置-人员代码编码长度（A-自动；N-不定；Y-固定）
	var names = new Array("optIds", "type");
  	var values = new Array("OPT_EMP", "one");
  	var result = Info.requestData("getOptions", "all", names, values);
  	if(result.childNodes.length > 0){
  		optEmp =  result.childNodes[0].getAttribute("OPT_VAL");
  	}
  	//系统级选项设置-人员代码长度（当人员代码编码长度设置为Y时，该项有用）
  	if(!PF.isEmpty(optEmp)){
  		if(optEmp == "Y"){
  			var result = Info.requestData("getOptions", "all", ["optIds", "type"], ["OPT_EMP_LENGTH", "one"]);
  			if(result.childNodes.length != 0){
			  	optEmpLength =  result.childNodes[0].getAttribute("OPT_VAL");
  			}
  		}
  	}
  	//系统级选项设置-是否允许人员同名（Y-是；N-否）
  	var names = new Array("optIds", "type");
  	var values = new Array("OPT_AS_NAME_DUPL", "one");
  	var result = Info.requestData("getOptions", "all", names, values);
  	if(result.childNodes.length > 0){
  		optAsNameDupl =  result.childNodes[0].getAttribute("OPT_VAL");
  	}
}

//------------------------删除人员前的判断-------------------------------------
function before_fdelete(){
	var empId = voFree.getValue("EMP_CODE");
	if(empId == "sa"){
  		alert("“sa”人员是系统为管理员预置的人员，任何操作员都不能删除！");
		return false;
	}
	var userId = voFree.getValue("USER_ID");
	if(userId == DataTools.getSV("svUserID")){
		alert("当前登录的操作员，不能删除与自己对应的人员！");
		return false;
	}
	return true;
}
//---------------------保存前的判断----------------------------------------
function before_fsave(){
  	if(!empCode_Check()){return false;}
  	if(!userId_Check()){return false;}
  	
  	var userid = voFree.getValue("USER_ID");
  	voGrid3.setColValue("USER_ID",userid);
  
  	//leidh;20060724;
  	var voResMap= new Map();
  	voResMap.put("AS_EMP", "人员资料");
  	voResMap.put("AS_EMP_POSITION", "任职情况");
  	//voResMap.put("AS_EMP_ROLE", "人员角色");
  	voResMap.put("AS_USER_GROUP", "用户组");
  	var vavRet= PageX.checkEmptyValue(voResMap);
  	if (!vavRet[0]){
    	alert(vavRet[1]);
  	}
  	return vavRet[0];
}
//-------------------------------------------------------------
function empCode_Check(){
  	var empCode = trim(voFree.getValue("EMP_CODE"));
  	if (empCode.toLowerCase() == "sa"){
	    alert("人员代码不能为: "+ empCode);
	    return false;
  	}
  	if(empCode == "" || trim(voFree.getValue("EMP_NAME")) == ""){
    	alert("人员代码/名称为空，不能保存！");
    	return false;
  	}
  	if((optEmpLength != 0) && (empCode.length != optEmpLength)){
    	alert("人员代码（" + empCode + "）长度不符合“系统级选项设置”中的要求（"
    		+	optEmpLength + "）！");
    	return false;
  	}
  	var empName = trim(voFree.getValue("EMP_NAME"));
  	var result = PageX.getRuleDeltaXML("admin-ruleData.AS_EMP_IsUsed", ["EMP_NAME"], [empName]);
  	var isExistEmp = result.firstChild.firstChild.firstChild.getAttribute("value");
  	if(optAsNameDupl == "N" && parseInt(isExistEmp) > 0){
  		alert("“系统级选项设置”中要求人员名称不能重复，你输入的人员名称已经被使用，请重新输入！");
    	return false;
  	}
  	if(_global_tIsNew){
	  	var result = PageX.getRuleDeltaXML("admin-ruleData.AS_EMP_IsUsed", ["EMP_CODE"], [empCode]);
	  	var isExistEmp = result.firstChild.firstChild.firstChild.getAttribute("value");
	  	if(parseInt(isExistEmp) > 0){
	  		alert("人员代码已经被使用，请修改");
	  		return false;
	  	}
	}
  	return true;
}

//-------------------------------------------------------------
function userId_Check(){
  	userId = trim(voFree.getValue("USER_ID")).toLowerCase();
  	if(userId != ""){
    	var empCode = voFree.getValue("EMP_CODE");
    	var names = new Array();
    	var values = new Array();
    	names[0] = "USER_ID";
    	values[0] = userId;
    	names[1] = "EMP_CODE";
    	values[1] = empCode;
    	var result = PageX.getRuleDeltaXML("admin-ruleData.GET_AS_USED_USER", names, values);
    	if(result.firstChild.firstChild.firstChild.getAttribute("value") == "1"){
      		alert("登录帐号（" + userId + "）已经被其他人员引用，请重新输入登录帐号！");
      		return false;
    	}
    	add_UserData();
  	}
	return true;
}
function add_UserData(){
	voChildFree.setValue("USER_NAME", voFree.getValue("EMP_NAME"));
	voChildFree.setValue("USER_ID", voFree.getValue("USER_ID"));
	voChildFree.setValue("RTXUIN", voFree.getValue("RTXUIN"));
}

function after_fadd(){
	voFree.setReadOnly(false);
	voGrid1.setReadOnly(false);
	//voGrid2.setReadOnly(false);
	voGrid3.setReadOnly(false);
	voToolbar.setCallDisabled("fsave", false);
	voToolbar.setCallDisabled("fedit", true);
	voToolbar.setCallDisabled("fdelete", true);
	setButtonDisabled(true);
	_global_tIsNew = true;
   	getOptEmpRule();
   	empInfo("edit");
   	voFree.setValue("IS_LOGIN", "Y");
	voFree.setValue("SEX", "1");
}

function changeUserGroup(){
	var grid1_Rows = voGrid1.getRowCount();
	var vsPosiCode = "";
	var vsGroupId = new Array();
	var vsGroupName = new Array();
	delete_Grid3_MapRow();//删除需要删除的行（即vsGroupIdMap中指定的行）
	var grid3_Rows = voGrid3.getRowCount();
	if(grid1_Rows >0){
		for(var i=0; i<grid1_Rows; i++){
			vsPosiCode += voGrid1.getValueByRowField(i,"POSI_CODE") + "|";
		}
		var result = PageX.getRuleDeltaXML("admin-ruleData.GET_GROUP_BY_POSICODE", ["POSI_CODE"], [vsPosiCode]);
		if(result != null){
			var entity = result.selectNodes("//entity");
			if(entity != null){
				for(var j=0; j<entity.length; j++){
					vsGroupId[vsGroupId.length] = entity[j].childNodes[0].getAttribute("value");
					vsGroupName[vsGroupName.length] = entity[j].childNodes[1].getAttribute("value");
					vsGroupIdMap.put(entity[j].childNodes[0].getAttribute("value"), (j+grid3_Rows));
				}
			}
		}
	}
	for(i=0; i<vsGroupId.length; i++){
		voGrid3.insertRow(-1);
		voGrid3.setValue("GROUP_ID", vsGroupId[i]);
		voGrid3.setValue("GROUP_NAME", vsGroupName[i]);
		voGrid3.setRowReadOnly((i+grid3_Rows), true);
	}
}
function delete_Grid3_MapRow(){
	var vsGroupId = new Array();
	var vsGroupmap = vsGroupIdMap.getAllItem();
	for(var i=0;i<vsGroupmap.length;i++){
		vsGroupId[vsGroupId.length] = vsGroupmap[i];
	}
	vsGroupIdMap.clear();
	voGrid3.deleteRows(vsGroupId);
}
function setRowChecked(iRow, checked){
  	var voRow = voGrid3.oLockBodyTable.rows(iRow);
  	if (voRow== null) return false; 
  	var voCheckBox= voRow.firstChild.firstChild;
  	if (voCheckBox== null || voCheckBox.nodeName!= "INPUT") return;
  	voCheckBox.checked = checked;
}
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  	switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
     	PageX.newBill();
     	after_fadd();
     	break;
  	//-----------------------修改-----------------------------
   	case "fedit":
   		voFree.setReadOnly(false);
   		voGrid1.setReadOnly(false);
	  	//voGrid2.setReadOnly(false);
	  	voGrid3.setReadOnly(false);
	  	setUserGroupReadOnly();
	  	voFree.setFieldReadOnly("EMP_CODE", true);
	  	voToolbar.setCallDisabled("fsave", false);
	  	voToolbar.setCallDisabled("fedit", true);
	  	setButtonDisabled(false);
	  	_global_tIsNew = false;
      	break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	if (PageX.isChanged()== false){
      		alert("没有发生更改,不用保存!");
      		break;
    	}
    	if(!before_fsave())break;
    	else{
       		var vvRet= PageX.saveBill();
       		if (vvRet== true) {
         		voFree.setReadOnly(true);
         		voGrid1.setReadOnly(true);
				//voGrid2.setReadOnly(true);
				voGrid3.setReadOnly(true);
				voToolbar.setCallDisabled("fsave", true);
				voToolbar.setCallDisabled("fedit", false);
				voToolbar.setCallDisabled("fdelete", false);
				setButtonDisabled(false);
				_global_tIsSaved = true;
         		alert("保存成功!");
       		}
       		else{
         		alert("保存失败 ,失败的原因是: \n" + vvRet);
       		}
     	}
     	break;
    case "fgrantfunc":
       	fgrantfuncF();
     	break;           
  	//-----------------------删除-----------------------------
  	case "fdelete":
    	if (!confirm("确定删除？")) break;
      	if(!before_fdelete()){
      	 	break;
    	}
      	var names1 = new Array();
  	    var values1 = new Array();
        var userId = voFree.getValue("USER_ID");
  	    names1[0] = "userId";
  	    values1[0] = userId;
      	var vvRet = PageX.deleteBill("deleteEmpRelation",names1,values1);
      	if (vvRet== true) {
        	PageX.newBill();
        	after_fadd();
        	_global_tIsDeleted = true;
        	setButtonDisabled(true);
        	alert("删除成功");
      	}
      	else{
        	alert("删除失败,失败的原因是: \n" + vvRet);
      	}
      	break;
      //-----------------------密码设置-----------------------------
    case "fsetpwd":
      	var userID = voFree.getValue("USER_ID");
      	var win = window.open(Base64.encodeUrl("dispatcher.action?function=passwd&METH=main&USERID="+userID),"new",
      							"left=" + (screen.availWidth-450)/2 + "px,top=" + (screen.availHeight-400)/2 + "px,width=450px,height=300px,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no");
      	break;
    	//-----------------------密码重置-----------------------------
    	case "fpsdreset":
    		var userID = voFree.getValue("USER_ID");
      	var win = window.open(Base64.encodeUrl("dispatcher.action?function=resetPsd&METH=main&USERID="+userID),"new",
      							"left=" + (screen.availWidth-450)/2 + "px,top=" + (screen.availHeight-400)/2 + "px,width=450px,height=300px,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no");
    		break;
    	//-----------------------帮助-----------------------------
    case "fhelp":
       	PageX.showHelp();
       	break;
       //----------------------权限复制----------------------------- 
    case "fcopyright":
       	fcopyright();
       	break; 
    	//-----------------------缺省-----------------------------
  	default:
  	}
  	return;
}
//---------------科室代码外部实体查询条件的监听事件----------------
function eventAnswer_GridOrg_OnBeforeSelect(){
	var cocode = voGrid1.getValue("CO_CODE");
	voGridOrg.setBeforeCond("CO_CODE="+cocode);
}
//------------------职位代码外部实体查询条件的监听事件------------------------------------
function eventAnswer_GridPosi_OnBeforeSelect(){
	var cocode = voGrid1.getValue("CO_CODE");
	var orgcode = voGrid1.getValue("ORG_CODE");
	voGridPosi.setBeforeCond("CO_CODE="+cocode+";ORG_CODE="+orgcode);
}
//------------------职位代码发生改变的监听事件------------------------------------
function eventAnswer_GridPosi_OnAfterSelect(){
	changeUserGroup();
}
//--------Grid1删除数据后的监听事件------------------------------------
function eventAnswer_Grid1_OnAfterDeleteRows(){
	changeUserGroup();
}
//------------------人员代码发生改变的监听事件------------------------------------
function eventAnswer_EmpCode_OnChange(){
	var empCode = voFree.getValue("EMP_CODE");
	if(voFree.getValue("USER_ID")==""){
		voFree.setValue("USER_ID", empCode);
		voChildFree.setValue("USER_ID", empCode);
	}
}
//----------------用户组GRID删除数据的监听事件----------------------------------
function eventAnswer_Grid3_OnBeforeDeleteRow(oSender, iRowIndex){
	var groupId = oSender.getValueByRowField(iRowIndex, "GROUP_ID");
	var hasGroupId = vsGroupIdMap.get(groupId);
	if(!PF.isEmpty(hasGroupId)){
		alert("用户组代码为"+groupId+"的项是根据职位码查询数据库得到，不能删除！");
		oSender.abortEvent(true);
	}
	setRowChecked(iRowIndex, false);
}
//-----------------权限设置---------------------
function fgrantfuncF(){
  	userId = voFree.getValue("USER_ID");
  	var win = showModalDialog(Base64.encodeUrl("dispatcher.action?function=privilege&userId=" + userId), window,
                          "menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;" +
                        "scrollbars=yes;dialogHeight=" + (screen.availHeight - 30) +
                         ";DialogWidth=" + (screen.availWidth - 10) + ";top=0;left=0;" +
                         "help=no");
  //Window.open("privilege.htm");
}

//-------------------权限复制--------------------
function fcopyright(){
  if(PageX.isChanged()){
    alert("数据已经被修改，请首先保存，再进行复制！");
    return;
  }
	if(trim(voFree.getValue("EMP_CODE")) == ""){
    alert("请先输入<人员ID>！");
    return;
	}
  if(!confirm("确定要复制吗？" + voFree.getValue("EMP_NAME") + "当前的所有功能授权都将被删除！")){
    return;
  }
  emp_Select();
}
function emp_Select(){
  var sfieldname = "EMP_CODE";
  var tablename = "AS_EMP";
  var condition = "AS_EMP.EMP_CODE != '" + trim(voFree.getValue("EMP_CODE")) + "'";
  var d = new Date();
  var win_select = showModalDialog(Base64.encodeUrl(PageX.sRootPath + "/dispatcher.action?function=selectPage&componame="
      + "AS_EMP&condition=" + condition + "&ismulti=false"
      + "&sql=&sqlid=admin-selectPage.getDataFromAS_EMP&condition="
      + "&d=" + d.getMilliseconds()),"AS_EMP","resizable:no;help:no;status:no");
  if (!win_select){
    return;
  }
  var empCode = win_select[1][0];
  emp_Copy(empCode);
}

function emp_Copy(empCode){
  if(empCode == null){
    return;
  }
  var names = new Array();
  var values = new Array();
  names[0] = "empCodeS";
  values[0] = empCode;
  names[1] = "empCodeD";
  values[1] = trim(voFree.getValue("EMP_CODE"));
  names[2] = "userId";
  values[2] = trim(voFree.getValue("USER_ID"));
  var com = getCommunity();
  if (com != null){
    com.doRequest("empCopy","AS_EMP",names,values,"afterCopy");
  }
}

function afterCopy(result){
	var text = result.getAttribute("success");
	if(text == "true")
  	alert("复制成功！");
  else
  	alert("复制失败！");
}

function eventAnswer_Grid1_OnAfterInsertRow(oSender, iRowIndex){
	//var currentRow = voGrid1.getRow(iRowIndex);
	var nd = DataTools.getSV("svNd")
	if(nd != null && nd != "" && nd != "null")
		voGrid1.setValueByRowField(iRowIndex, "ND", nd);
}
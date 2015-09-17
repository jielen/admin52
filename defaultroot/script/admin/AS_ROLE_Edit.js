var voForeign = null;//外部实体
var voFree = null; //自由表格
var voToolbar = null;//工具栏
var subCompo = "";
var roleId = null;//角色ID,必须设置全局变量，权限设置用

window.onbeforeunload = function closeEditPage(){
	if(PageX.sPageType == 'edit'){
		var iSearch = window.opener.PageX.getCtrlObj("AS_ROLE_search");
		iSearch.search();
	}
}
//---------------------------------------------
function setPageInit(){
	var mainTableName = DataTools.getMainTableName("AS_ROLE");
  	voFree = PageX.getFree(mainTableName);
	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	voToolbar.setCallDisabled("fsave", true);
	voForeign = PageX.getCtrlObj("CO_CODE");
	voGrid = PageX.getCtrlObj("AS_ROLE_GROUP_Grid");

	after_PageInit();
}
function after_PageInit(){
	var userId = DataTools.getSV("svUserID");
  	if (PageX.isNew()){
  		if(userId == "sa"){
  			voForeign.tAnswerOnChange = false;
  			voFree.setValue("CO_CODE", "*");
  			voForeign.tAnswerOnChange = true;
  		}else{
  			var voCoCode = DataTools.getSV("svCoCode");
			voFree.setValue("CO_CODE", voCoCode);
  		}
  		voFree.setReadOnly(false);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fdelete", true);
		voToolbar.setCallDisabled("fgrantfunc", true);
		voToolbar.setCallDisabled("fcopyright", true);
		voGrid.setReadOnly(false);
  	}else{
	  	var co_code = voFree.getValue("CO_CODE");
	  	roleId = voFree.getValue("ROLE_ID");
	  	if(trim(roleId.toUpperCase()) == "SA"){
	  		voToolbar.setCallDisabled("fedit", true)
		    voToolbar.setCallDisabled("fgrantfunc", true);
		    voToolbar.setCallDisabled("fdelete", true);
		    voToolbar.setCallDisabled("fcopyright", true);
	  	}
	  	if(userId != "sa" && co_code == "*"){
	  		voToolbar.setCallDisabled("fsave", true);
			voToolbar.setCallDisabled("fedit", true);
			voToolbar.setCallDisabled("fdelete", true);
			voToolbar.setCallDisabled("fgrantfunc", true);
			voToolbar.setCallDisabled("fcopyright", true);
	  	}
	  	if(trim(roleId) == "ca"){
	  		voToolbar.setCallDisabled("fdelete", true);
			}
	  	voFree.setReadOnly(true);
	  	voGrid.setReadOnly(true);
	}
}
//------------------------保存前判断----------------------------------
function before_fsave(){
	if(voFree.getValue("ROLE_ID") == ""){
		alert("角色编号不能为空！");
		return false;
	}
	if(voFree.getValue("ROLE_NAME") == ""){
		alert("角色名称不能为空！");
		return false;
	}
	var ruleId = voFree.getValue("ROLE_ID");
  	voGrid.setColValue("ROLE_ID",ruleId);
	if(DataTools.getSV("svUserID") == "sa"){
		if(voFree.getValue("CO_CODE") == ""){
			voForeign.tAnswerOnChange = false;
  			voFree.setValue("CO_CODE", "*");
  			voForeign.tAnswerOnChange = true;
		}
	}
	return true;
}
function after_fsave(){
  	voToolbar.setCallDisabled("fgrantfunc", false);
  	voToolbar.setCallDisabled("fcopyright", false);
}


function caRole(){
	if(voFree.getValue("ROLE_ID")=="ca"){
		voFree.setFieldReadOnly("CO_CODE", true);
	}
}
//----------------------------------------------
function before_fdelete(){
	//先判断当前的角色是否被使用
  	var roleNo = "admin-ruleData.AS_ROLE_IsUsed";
  	var names = new Array();
  	var values = new Array();
	var roleId = voFree.getValue("ROLE_ID");
  	names[0] = "ROLE_ID";
  	values[0] = roleId;
  	var result = PageX.getRuleDeltaXML(roleNo, names, values);
	if(result.firstChild.firstChild.firstChild.getAttribute("value") != "0"){
		alert("这个角色（" + roleId + "）已经被使用，如果确实要删除，"
					+ "请先修改引用它的职位！");
		return false;
	}
	roleNo = "admin-ruleData.AS_ROLE_IsSetRights";
	result = PageX.getRuleDeltaXML(roleNo, names, values);
	if(result.firstChild.firstChild.firstChild.getAttribute("value")!="0"){
		var bln = window.confirm("这个角色（" + roleId + "）已经设置了权限，确定删除吗?"); 
		if(!bln) return false;
	}	
	return true;
}
//-------------------------权限设置-----------------------------
function fgrantfuncF(){
  	var roleId = voFree.getValue("ROLE_ID");
  	var win = showModalDialog(Base64.encodeUrl("dispatcher.action?function=privilege&roleId=" + roleId), window,
                          "menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;" +
                        "scrollbars=yes;dialogHeight=" + (screen.availHeight - 30) +
                         ";DialogWidth=" + (screen.availWidth - 10) + ";top=0;left=0;" +
                         "help=no");
}
//---------------------------权限复制--------------------------------------------
function fcopyright(){
  	if(PageX.isChanged()){
	    alert("数据已经被修改，请首先保存，再进行复制！");
	    return;
  	}
	if(trim(voFree.getValue("ROLE_ID")) == ""){
	    alert("请先输入<角色ID>！");
	    return;
	}
  	if(!confirm("确定要复制吗？" + voFree.getValue("ROLE_NAME") + "当前的所有功能授权都将被删除！")){
    	return;
  	}
  	role_Select();
}
function role_Select(){
  	var sfieldname = "ROLE_ID";
  	var tablename = "AS_ROLE";
  	var condition = "AS_ROLE.ROLE_ID != '" + trim(voFree.getValue("ROLE_ID")) + "'";
  	var d = new Date();
  	var win_select = showModalDialog(Base64.encodeUrl(PageX.sRootPath + "/dispatcher.action?function=selectPage&componame="
      	+ "AS_ROLE&condition=" + condition + "&ismulti=false"
      	+ "&sql=&sqlid=admin-selectPage.getDataFromAS_ROLE&condition="
      	+ "&d=" + d.getMilliseconds()),"AS_ROLE","resizable:no;help:no;status:no");
  	if (!win_select){
    	return;
  	}
  	var roleId = win_select[1][0];
  	role_Copy(roleId);
}
function role_Copy(roleId){
  	if(roleId == null){
    	return;
  	}
  	var names = new Array();
  	var values = new Array();
  	names[0] = "roleIdS";
  	values[0] = roleId;
  	names[1] = "roleIdD";
  	values[1] = trim(voFree.getValue("ROLE_ID"));
  	var com = getCommunity();
  	if (com != null){
    	var result = com.doRequest("roleCopy","AS_ROLE",names,values,"");
    	afterCopy(result);
  	}
}
function afterCopy(result){
	var text = result.getAttribute("success");
	if(text == "true")
  		alert("复制成功！");
  	else
  		alert("复制失败！");
}
//-----------------------帮助--------------------------------
function help(){
  	var win_help = open("help/AS/AS_GRAN_FUNC.htm", null,
                      "menubar=no,status=no,toolbar=yes,"
                      + "resizable=yes,titlebar=yes,scrollbars=yes,"
                      + "height=" + (screen.availHeight - 30)*2/3 + ",width="
                      + (screen.availWidth - 460) + ",top=0,left=450");
}

//------------------------工具栏时事件监听-------------------------------
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  	switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
  		voFree.setReadOnly(false);
  		voGrid.setReadOnly(false);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fdelete", true);
      	PageX.newBill();
      	after_PageInit();
      	break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voGrid.setReadOnly(false);
    	caRole();
    	voFree.setFieldReadOnly("ROLE_ID", true);
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
      break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	if(!before_fsave()){
       		break;
    	}
    	if (PageX.isChanged()== false){
      		alert("没有发生更改,不用保存!");
    	}
    	else{
       		var vvRet= PageX.saveBill();
       		if (vvRet== true) {
         		voFree.setReadOnly(true);
         		voGrid.setReadOnly(true);
         		voToolbar.setCallDisabled("fsave", true);
         		voToolbar.setCallDisabled("fedit", false);
         		voToolbar.setCallDisabled("fdelete", false);
         		alert("保存成功!");
       		}
       		else{
         		alert("保存失败 ,失败的原因是: \n" + vvRet);
       		}
     	}
     	after_fsave();
     	break;      
  	//-----------------------删除-----------------------------
  	case "fdelete":
    	if (!confirm("确定删除？")) break;
      	if(!before_fdelete()){
       		break;
    	}
      	var vvRet = PageX.deleteBill();
      	if (vvRet== true) {
	        PageX.newBill();
	        voToolbar.setCallDisabled("fsave", false);
	       	voToolbar.setCallDisabled("fedit", true);
					voToolbar.setCallDisabled("fdelete", true);
					voToolbar.setCallDisabled("fgrantfunc", true);
					voToolbar.setCallDisabled("fcopyright", true);
	        alert("删除成功");
      	}
      	else{
        	alert("删除失败,失败的原因是: \n" + vvRet);
      	}
      	break;
    //------------------------权限设置----------------------------
    case "fgrantfunc":
       	fgrantfuncF();
       	break;
    //----------------------权限复制----------------------------- 
    case "fcopyright":
       	fcopyright();
       	break;     
  	//-----------------------帮助-----------------------------
    case "fhelp":
       	PageX.showHelp();
       	break;
    //-----------------------缺省-----------------------------
  	default:
  	}
  	return;
}

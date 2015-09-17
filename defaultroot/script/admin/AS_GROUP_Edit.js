//---------初始化变量---------//
var voFree  = null;
var voToolbar = null;
var voGrid = null;

window.onbeforeunload = function closeEditPage(){
	try{
		if(PageX.sPageType == 'edit'){
			//window.opener.location.reload();
			var iSearch = window.opener.PageX.getCtrlObj("AS_GROUP_search");
			iSearch.search();
		}
	}catch(e){}
}
function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  	voFree = PageX.getFree(mainTableName);
    
	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
  	voGrid_1 = PageX.getCtrlObj("AS_GROUP_Grid_1");
    voGrid_2 = PageX.getCtrlObj("AS_GROUP_Grid_2");

	voToolbar.setCallVisible("fpageContentdef", false);
	var resXml = PageX.getRuleDeltaXML("admin-ruleData.PRODUCT_PORTAL_Version", [], []);
	var version = "1.0";
	if(resXml.firstChild.firstChild != null)
	  version = resXml.firstChild.firstChild.firstChild.getAttribute("value");
	if(PF.parseFloat(version)<2.0){
		voToolbar.setCallVisible("fpagedef", true);
		voToolbar.setCallVisible("fpageContentdef", true);
	}else{
		voToolbar.setCallVisible("fpagedef", false);
		voToolbar.setCallVisible("fpageContentdef", false);
	}
	
	
	voToolbar.setCallDisabled("fsave", true);
    var groupID = trim(voFree.getValue("GROUP_ID"));
	if(groupID=="admin"||groupID=="guest"){
		voToolbar.setCallDisabled("fdelete", true);
		}
	if(groupID=="sa"){
		voToolbar.setCallDisabled("fsave", true);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fdelete", true);
		}
	
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fdelete", true);
		voToolbar.setCallDisabled("fpagedef", true);
		voToolbar.setCallDisabled("fpageContentdef", true);
	}
	else{
		voFree.setReadOnly(true);
		voGrid_1.setReadOnly(true);
		voGrid_2.setReadOnly(true);
	}
	
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
  		voFree.setReadOnly(false);
  		voGrid_1.setReadOnly(false);
    	voGrid_2.setReadOnly(false);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fdelete", true);
		voToolbar.setCallDisabled("fpagedef", true);
      	PageX.newBill();
      	break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voGrid_1.setReadOnly(false);
    	voGrid_2.setReadOnly(false);
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
    	}else{
    	    var res = new Map();
    	    res.put("AS_GROUP", "用户组");
    	    res.put("AS_USER_GROUP", "用户明细");
    	    res.put("AS_ROLE_GROUP", "角色明细");     	    
       		var vvRet= PageX.saveBillK(null,null,null,true, res);
       		if (vvRet[0]== true) {
         		after_fsave();
         		alert("保存成功!");
       		}
       		else{
         		alert("保存失败 ,失败的原因是: \n" + vvRet);
       		}
     	}
     	break;   
  	//-----------------------删除-----------------------------
  	case "fdelete":
    	if (!confirm("确定删除？")) break;
        var names = new Array();
      var values = new Array();
      names[0] = "groupId";
      values[0] = trim(voFree.getValue("GROUP_ID"));
      var com = getCommunity();
      if (com != null){
      com.doRequest("delGroupRelation","AS_GROUP",names,values);
      }
      	var vvRet = PageX.deleteBill();
      	if (vvRet== true) {
	        //window.opener.location.reload();
	        voFree.setReadOnly(false);
	        voGrid_1.setReadOnly(false);
    	    voGrid_2.setReadOnly(false);
					voToolbar.setCallDisabled("fsave", false);
					voToolbar.setCallDisabled("fedit", true);
					voToolbar.setCallDisabled("fdelete", true);
					voToolbar.setCallDisabled("fpagedef", true);
	        PageX.newBill();
	        alert("删除成功");
      	}
      	else{
        	alert("删除失败,失败的原因是: \n" + vvRet);
      	}
      	break;
    //-----------------------帮助-----------------------------
    case "fhelp":
     	PageX.showHelp();
     	break;
    case "fpagedef":
        fpagedef();
    	break;
    case "fpageContentdef":
        fpageContentdef();
    	break;	
       //----------------------权限复制----------------------------- 
    case "fgroupcopy":
       fgroupcopy();
       break;     
    	//-----------------------缺省-----------------------------
  	default:
  }
  return;
}

function fgroupcopy(){
  	if(PageX.isChanged()){
	    alert("数据已经被修改，请首先保存，再进行复制！");
	    return;
  	}
	if(trim(voFree.getValue("GROUP_ID")) == ""){
	    alert("请先输入<用户组ID>！");
	    return;
	}
  	if(!confirm("确定要复制吗？" + voFree.getValue("GROUP_NAME") + "当前的所有功能授权都将被删除！")){
    	return;
  	}
  	group_Select();
}

function group_Select(){
  var sfieldname = "GROUP_ID";
  var tablename = "AS_GROUP";
  var condition = "AS_GROUP.GROUP_ID != '" + trim(voFree.getValue("GROUP_ID")) + "'";
  var d = new Date();
  var win_select = showModalDialog(Base64.encodeUrl(PageX.sRootPath + "/dispatcher.action?function=selectPage&componame="
      + "AS_GROUP&condition=" + condition + "&ismulti=false"
      + "&sql=&sqlid=admin-editPage.getDataFromAS_GROUP&condition="
      + "&d=" + d.getMilliseconds()),"AS_GROUP","resizable:no;help:no;status:no");
  if (!win_select){
    return;
  }
  var uuId = win_select[1][0];
  group_Copy(uuId);
}

function group_Copy(uuId){
  if(uuId == null){
    return;
  }
  var names = new Array();
  var values = new Array();
  names[0] = "groupIdS";
  values[0] = uuId;
  names[1] = "groupIdD";
  values[1] = trim(voFree.getValue("GROUP_ID"));
  names[2] = "userId";
  values[2] = trim(voFree.getValue("USER_ID"));
  var com = getCommunity();
  if (com != null){
    com.doRequest("groupCopy","AS_GROUP",names,values,"afterCopy");
  }
}

function afterCopy(result){
	var text = result.getAttribute("success");
	if(text == "true")
  	alert("复制成功！");
  else
  	alert("复制失败！");
}
//-------------------保存前------------------------------
function before_fsave(){
	var voGroupName = voFree.getValue("GROUP_NAME");
	if(voGroupName && voGroupName.length > 60){
		alert("用户组名称长度不能大于60，请重新设置！");
		return false;
	}
	voGroupId = voFree.getValue("GROUP_ID");
	voGrid_1.setColValue("GROUP_ID",voGroupId);
	voGrid_2.setColValue("GROUP_ID",voGroupId);
	if(isRepeData())return false;
	return true;
}
function isRepeData(){
	//debugger;
	var rowCount = voGrid_1.getRowCount();
	if(rowCount > 1){
		for(var i=0; i<rowCount-1; i++){
			var iRowValue = voGrid_1.getValueByRowField(i, "USER_ID");
			for(var j=i+1; j<rowCount; j++){
				var jRowValue = voGrid_1.getValueByRowField(j, "USER_ID");
				if(iRowValue == jRowValue){
					alert("第"+(j+1)+"行的值'用户编号:"+jRowValue+"'与第"+(i+1)+"行的值相同，请改正！");
					return true;
				}
			}
		}
	}
	rowCount = voGrid_2.getRowCount();
	if(rowCount > 1){
		for(var i=0; i<rowCount-1; i++){
			var iRowValue = voGrid_2.getValueByRowField(i, "ROLE_ID");
			for(var j=i+1; j<rowCount; j++){
				var jRowValue = voGrid_2.getValueByRowField(j, "ROLE_ID");
				if(iRowValue == jRowValue){
					alert("第"+(j+1)+"行的值'角色编号:"+jRowValue+"'与第"+(i+1)+"行的值相同，请改正！");
					return true;
				}
			}
		}
	}
	return false;
}
//--------------------保存后----------------------------------
function after_fsave(){
	//window.opener.location.reload();
	//window.focus();
	voFree.setReadOnly(true);
	voGrid_1.setReadOnly(true);
    voGrid_2.setReadOnly(true);
	voToolbar.setCallDisabled("fsave", true);
	voToolbar.setCallDisabled("fedit", false);
	voToolbar.setCallDisabled("fdelete", false);
	voToolbar.setCallDisabled("fdelete", false);
	voToolbar.setCallDisabled("fpagedef", false);
	//return true;
}

function fpagedef(){
	fgroupPageSet("edit");
}

function fpageContentdef(){
	fgroupPageSet("conf");
}

function fgroupPageSet(type){
	var groupId = voFree.getValue("GROUP_ID");
	if(groupId == null || groupId == "" || groupId == "null"){
		alert("用户组代码为空！");
		return;
	}
  var groupName = voFree.getValue("GROUP_NAME");
  var url = "dispatcher.action?function=groupPageDesigner&groupId=" 
  				+ groupId + "&groupName=" + groupName + "&type=" + type;

  	window.open(Base64.encodeUrl(url), null,
                  "menubar=no,scrollbars=yes,status=yes,toolbar=no,"
                  + "resizable=yes,titlebar=no,scrollbars=yes,location=no,"
                  + "height=" + (screen.availHeight - 30) + ",width="
                  + (screen.availWidth - 10) + ",top=0,left=0");                        
}
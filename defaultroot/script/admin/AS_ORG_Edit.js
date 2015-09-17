//----------------------------------------------------------------------
//----- 全局变量---------------------------------
var voFree = null;
var voToolbar = null;
var voGrid = null;
//var voCoCode = null;
//var voCoName = null;
var voOrgCode = null;
var voOptOrg = "";
var voOptOrgRule = "";

var _global_tIsDeleted = false;//组织结构树中使用
var _global_tIsSaved = false;
var _global_tIsNew = true;
//--------------------------------------------------
function setPageInit(){
	var mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  	voFree = PageX.getFree(mainTableName);
	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	voGrid = PageX.getCtrlObj("AS_ORG_Grid");
	voToolbar.setCallDisabled("fsave", true);
	
	var voParentOrgCode= voFree.getEditBox("PARENT_ORG_CODE");
  	voParentOrgCode.addListener(new Listener(voParentOrgCode.OnChange, eventAnswer_PARENT_ORG_CODE_Change, this));

  	voOrgCode= voFree.getEditBox("ORG_CODE");
  	voOrgCode.addListener(new Listener(voOrgCode.OnChange, eventAnswer_ORG_CODE_Change, this));
  	
	after_fadd();
	
}
//-------------------------------------------------------------
function after_fadd(){
   	/*
   	1．	是否末级=Y，
   	2．	是否使用=Y，
   	3．	IF OPT_ORG='n'，上级单位组织编码和上级组织名称IS_READONLY=TRUE。
   		注意：这是单位级选项，先在AS_OPTION表中查找本单位的记录，如果找不到的话，再去找所有单位（单位代码为*的记录）。
   	4．	fedit＝DISABLE; 
   	5．	Fsave=enable;
   	6．	Fdelete=disable
   	7．	Fadd=disable;
   	*/
   	getOptOrg();//获取编码规则
  	voFree.setValue("AS_OPT_RULE",voOptOrgRule);
   	//alert(PageX.isNew());
  	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
	    voToolbar.setCallDisabled("fsave", false);
	    voToolbar.setCallDisabled("fdelete", true);
	    _global_tIsNew = true;
	    voFree.setValue("IS_LOWEST", "Y");
	  	voFree.setValue("ND", DataTools.getSV("svNd"));
	   	if(!PF.isEmpty(voOptOrg)){
	   		if(voOptOrg == "N" ){
		      	voFree.setFieldReadOnly("PARENT_ORG_CODE", true);
		      	voFree.setFieldReadOnly("PARENT_ORG_NAME", true);
		   	}else{
		      	voFree.setFieldReadOnly("PARENT_ORG_CODE", false);
		      	voFree.setFieldReadOnly("PARENT_ORG_NAME", false);
		   	}
		   	//alert(adminPath+"             "+curPath);
		   	if(!PF.isEmpty(adminPath) && curPath == adminPath) {
		  		voFree.setFieldReadOnly("CO_CODE", true);
			}
		   // 设置单位初始值 xiexx
		   	if (!PF.isEmpty(vsParentCode)) {
			   	voFree.setValue("CO_CODE", vsParentCode);
			   	voFree.setValue("CO_NAME", vsParentName);
			   	voFree.setFieldReadOnly("CO_CODE", true);
			   	voToolbar.setCallDisabled("fadd", true);
			} else {
			   	voFree.setFieldReadOnly("CO_CODE", false);	
			}
	   	}
	}
	else{
		voFree.setReadOnly(true);
		voGrid.setReadOnly(true);
		_global_tIsNew = false;
	}
}

//-------------------------保存前执行----------------------
function before_fsave(){
	if(trim(voFree.getValue("ORG_NAME")) == "" || trim(voFree.getValue("ORG_CODE")) == ""){
   		alert("内部机构代码/名称不允许为空，请输入后再保存！");
   		return false;
  	}
  	//对ND字段做控制
 	var nd= voFree.getValue("ND");
	var viNd= parseInt(nd);
  	if (viNd > 2025 || viNd< 1900){
	    alert("年度值不正确！");
	    return false;
  	}
  	var optLevelFirst = parseInt(voOptOrgRule.charAt(0));
  	var divLength = voFree.getValue("ORG_CODE").length;
  	if (divLength != optLevelFirst && voFree.getValue("PARENT_ORG_CODE")==""){
	  	alert("内部机构（" + voFree.getValue("ORG_CODE") + "）找不到父代码，" +
				"或者代码长度不符合级次要求(" + voOptOrgRule + ")，请检查！");
	    return false;
  	}

  	var voResMap= new Map();
  	voResMap.put("AS_ORG", "内部机构资料");
  	voResMap.put("AS_ORG_POSITION", "内部机构职位");
  	var vavRet= PageX.checkEmptyValue(voResMap);
  	if (!vavRet[0]){
    	alert(vavRet[1]);
  	}
  	return vavRet[0];
}

//-------------------------------------------------------------
function getOptOrg(){
	var names = new Array("optIds", "type");
	var values = new Array("OPT_ORG", "one");
	var result = Info.requestData("getOptions", "all", names, values);
	if(result.childNodes.length > 0){
		voOptOrg = result.childNodes[0].getAttribute("OPT_VAL");
	}
	var names = new Array("optIds", "type");
	var values = new Array("OPT_ORG_LEVEL", "one");
	var result = Info.requestData("getOptions", "all", names, values);
	if(result.childNodes.length > 0){
   		voOptOrgRule = result.childNodes[0].getAttribute("OPT_VAL");
   	}
}

//-------------------------------------------------------------
function after_fedit(){
  	voFree.setFieldReadOnly("CO_CODE", true);
   	voFree.setFieldReadOnly("CO_NAME", true);
   	voFree.setFieldReadOnly("ORG_CODE", true);
   	voFree.setFieldReadOnly("AS_OPT_RULE", true);
  	voFree.setFieldReadOnly("ND", true);
  	_global_tIsNew = false;
}

//-------------------------------------------------------------
function before_fdelete(){
	//先判断当前的组织是否被其他组织引用
  	var roleNo = "admin-ruleData.AS_ORG_IsLowest";
  	var fieldValue = voFree.getValue("ORG_CODE");
  	var names = new Array();
  	var values = new Array();
  	names[0] = "CO_CODE";
  	names[1] = "ORG_CODE";
  	values[0] = voFree.getValue("CO_CODE");
  	values[1] = fieldValue;
  	var result = PageX.getRuleDeltaXML(roleNo, names, values);
	if(result.firstChild.firstChild.firstChild.getAttribute("value") != "0"){
		alert("这个内部机构（" + fieldValue + "）存在下级机构，如果确实要删除，"
					+ "请先删除其下级机构！");
		return false;
	}

	//后判断当前的组织是否在职员任职表中被引用
	roleNo = "admin-ruleData.AS_ORG_IsEmpPosi";
	result = PageX.getRuleDeltaXML(roleNo, names, values);
	if(result.firstChild.firstChild.firstChild.getAttribute("value") != "0"){
		alert("已经有职员在这个内部机构（" + fieldValue + "）内任职，如果确实要删除，"
					+ "请先删除职员在这个内部机构的任职！");
		return false;
	}
  	return true;
}

//---------------对按钮功能的响应---------------------
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
  	switch(oCall.id){
    	//-----------------------新建-----------------------------
  		case "fadd":
  			voFree.setReadOnly(false);
			voGrid.setReadOnly(false);
			voToolbar.setCallDisabled("fedit", true);
    		voToolbar.setCallDisabled("fsave", false);
    		voToolbar.setCallDisabled("fdelete", true);
      		PageX.newBill();
      		after_fadd();
      		break;
  		//-----------------------修改-----------------------------
    	case "fedit":
	    	voFree.setReadOnly(false);
	    	voGrid.setReadOnly(false);
	    	voToolbar.setCallDisabled("fedit", true);
	    	voToolbar.setCallDisabled("fsave", false);
	    	after_fedit();
      		break;
  		//-----------------------保存-----------------------------
    	case "fsave":
    		if(!before_fsave()){
    			_global_tIsSaved = false;
    			break;
    		}
    		if (PageX.isChanged()== false){
      			alert("没有发生更改,不用保存!");
    		}
    		else{
       			var vvRet= PageX.saveBill();
       			if (vvRet == true) {
	         		voFree.setReadOnly(true);
	         		voGrid.setReadOnly(true);
	         		voToolbar.setCallDisabled("fedit", false);
	         		voToolbar.setCallDisabled("fsave", true);
	         		voToolbar.setCallDisabled("fdelete", false);
	         		voToolbar.setCallDisabled("fadd", false);
	         		_global_tIsSaved = true;
	         		alert("保存成功!");
       			}
       			else{
         			alert(vvRet);
       			}
     		}
     		break;      
  		//-----------------------删除-----------------------------
  		case "fdelete":
  			if (!confirm("确定删除？")) break;
  			if (!before_fdelete()) break;
	  		vvRet = PageX.deleteBill();
      		if (vvRet == true) {
        		PageX.newBill();
        		_global_tIsDeleted = true;
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
    	//-----------------------缺省-----------------------------
  		default:
  	}
  	return;
}
/**
* 上级内部机构变化后，触发事件
*/
function eventAnswer_PARENT_ORG_CODE_Change(oSender, sValue, oEvent){
	if(voFree.getValue("ORG_CODE") == sValue){
		alert("一个内部机构不能引用自己作为上级代码！");
		voFree.setValue("PARENT_ORG_CODE", "");
		voFree.setValue("PARENT_ORG_NAME", "");
	}
}
//-------------------------------------------------------------
function eventAnswer_ORG_CODE_Change(oSender, sValue, oEvent){
    //判断代码（长度）是否符合"分级次设置"
    var optLevelFirst = parseInt(voOptOrgRule.charAt(0));
    var optLevelTotal = 0;
    var num = 0;
    var optLevelArray = new Array();
    for(var i=0; i<voOptOrgRule.length; i++){
    	var onechar = voOptOrgRule.charAt(i);
        if( onechar <= "6" && onechar >= "1" )
        {
            optLevelTotal += parseInt(onechar);
            optLevelArray[num] = optLevelTotal;
            num++;
        }
    }
    //debugger;
    var divLength = sValue.length;
    var isFirst = 1;
    if (divLength != optLevelFirst)isFirst=0;
    var isEqual = 0;
    for(var k=0; k<optLevelArray.length; k++){
    	if (divLength == optLevelArray[k])isEqual=1;
    }
    if(isEqual==0){
        alert("内部机构代码（" + sValue + "）长度不符合“内部机构级次" +
			"设置(" + voOptOrgRule + ")”");
    }
    // 对于非一级，判断ORG_CODE的上级分类是否存在，如果不存在，不能保存。
    //   如果存在，直接写入。　
    if(isFirst == 0)
    {
    	var superLength = 0;
      	for(var k=0; k<optLevelArray.length; k++)
      	{
            if (divLength == optLevelArray[k])superLength = optLevelArray[k-1];
        }
        var ruleId = "admin-ruleData.AS_ORG_IsExist";
        var fieldname = "PARENT_ORG_CODE";
        var fieldvalue = sValue.substring(0, superLength);
        var names = new Array("CO_CODE", fieldname);
        var values = new Array(voFree.getValue("CO_CODE"), fieldvalue);
        var result = PageX.getRuleDeltaXML(ruleId, names, values);
        if (result != null){
			var entity = result.firstChild.firstChild;
			if(entity == null){
	            //voFree.setValue("PARENT_ORG_CODE", "");
	            //voFree.setValue("PARENT_ORG_NAME", "");          
	            alert("上级机构不存在，或者已经是末级，请重新录入内部机构代码!");
	            voFree.getEditBox("ORG_CODE").setFocus();
	     	}else{
	            voFree.setValue("PARENT_ORG_CODE", entity.childNodes(0).getAttribute("value"));
	            voFree.setValue("PARENT_ORG_NAME", entity.childNodes(1).getAttribute("value"));
	        }
	   	}
	   	//return true;
    }
}

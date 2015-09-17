
var voCompoName;
var voCoCode; 
var voTransType;

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
  voCompoName = DataTools.getCompoName();
  voCoCode = DataTools.getSV ("svCoCode");
  voTransType = null;
	if(voCompoName == null || voCompoName == "") voCompoName = "*";
	if(voCoCode == null || voCoCode == "") voCoCode = "*";
	if(voTransType == null || voTransType == "") voTransType = "*";
	voOptOrg = PageX.getCtrlObj("OPT_ORG");
	voOptOrg.addListener(new Listener(voOptOrg.OnChange, eventAnswer_Opt_Org_OnChange, this));
	
  var voNames = new Array("coCode", "compoId", "optIds", "transType");
  var voVals = new Array(voCoCode, voCompoName, "OPT_ORG, OPT_ORG_LEVEL", voTransType);
	var result = requestData2("getOptions", "all", voNames, voVals);
	var volist = result.getElementsByTagName("row");
	var i = 0;
	var voname = null;

	voFree.setValue("OPT_COMPANY", voCoCode);
	for(i; i < volist.length; i++){
		var voVal = volist.item(i).getAttribute("OPT_VAL");
		if(voVal == "null" || voVal == null) voVal = "";
		voFree.setValue(volist.item(i).getAttribute("OPT_ID"), voVal);
	}
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		isOptOrg();
	}
	else{
		voFree.setReadOnly(true);
	}
	asOrgIsUsed();
	PageX.oRowManager.clearAll();
	
}
function asOrgIsUsed(){
	var names= new Array("CO_CODE", "ND");
    var values= new Array(voCoCode, DataTools.getSV("svNd"));
    var voResult= PageX.getRuleDeltaXML("admin-ruleData.MA_COMPANY_IsOrg", names, values);
    if (voResult!= null){
		if(voResult.firstChild.firstChild.firstChild.getAttribute("value") != "0"){
			voFree.setFieldReadOnly("OPT_ORG", true);
			voFree.setFieldReadOnly("OPT_ORG_LEVEL", true);
		}
	}
}
function eventAnswer_Opt_Org_OnChange(){
	var voOptOrg1 = voFree.getValue("OPT_ORG");
	if(voOptOrg1=="Y"){
		voFree.setFieldReadOnly("OPT_ORG_LEVEL", true);
	}else{
		voFree.setFieldReadOnly("OPT_ORG_LEVEL", false);
	}
}

function isOptOrg(){
	return eventAnswer_Opt_Org_OnChange();
}

function getFieldValue(){
	var voNames = new Array("coCode", "compoId", "optIds", "transType");
  var voVals = new Array(voCoCode, voCompoName, "OPT_ORG, OPT_ORG_LEVEL", voTransType);
	var result = requestData2("getOptions", "all", voNames, voVals);
	var volist = result.getElementsByTagName("row");
	if(volist.length == 0){
		voNames = new Array("coCode", "compoId", "optIds", "transType");
		voVals = new Array("*", "*", "OPT_ORG, OPT_ORG_LEVEL", "*");
		result = requestData2("getOptions", "all", voNames, voVals);
		volist = result.getElementsByTagName("row");
		if(volist.length == 0){
			voNames = new Array("coCode", "compoId", "optIds", "transType");
			voVals = new Array(voCoCode, voCompoName, "OPT_ORG, OPT_ORG_LEVEL", "*");
			result = requestData2("getOptions", "all", voNames, voVals);
			volist = result.getElementsByTagName("row");
		}
	}
	var i = 0;
	var voname = null;
	for(i; i < volist.length; i++){
		var voVal = volist.item(i).getAttribute("OPT_VAL");
		if(voVal == "null" || voVal == null) voVal = "";
		voFree.setValue(volist.item(i).getAttribute("OPT_ID"), voVal);
	}
}

function fsave(){
  /* 单位代码级次设置的格式  */
  var names = new Array();
  var values = new Array();
  //var count = qryData("admin-ruleData.AS_ORG_IsUsed", names, values);
  //var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
  //xmlDom.loadXML(count);
  if(voFree.getValue("OPT_ORG")=="N"){
  var optOrgLevel=voFree.getValue("OPT_ORG_LEVEL");
  var optOrgLevelTotal=0;
  var firstchar=optOrgLevel.charAt(0);
  var lastchar=optOrgLevel.charAt(optOrgLevel.length-1);
  if(firstchar<"1" || firstchar>"6" ||lastchar<"1" || lastchar>"6"){
     alert("内部机构代码级次设置只能由1位数字(1-6)和“-”间隔组成！首位和末位是数字！");
     return false;
  }
  for(var i=0;i<optOrgLevel.length;i++){
     var onechar=optOrgLevel.charAt(i);
     var onechar2=optOrgLevel.charAt(i+1);
     if( onechar != "-" && (onechar < "1" || onechar > "6")){
        alert("内部机构代码级次设置只能由1位数字(1-6)和“-”间隔组成！ ");
        return false;
     }
     if(  onechar>="1" && onechar<="6"&& onechar2!="-" && i!=(optOrgLevel.length-1)){
        alert("内部机构代码级次设置只能由1位数字(1-6)和“-”间隔组成！ ");
        return false;
     }
     if( onechar=="-" && onechar2=="-" ){
        alert("内部机构代码级次设置只能由1位数字(1-6)和“-”间隔组成！ ");
        return false;
     }

     if( onechar<="6" && onechar>="1" ){
       num=parseInt(onechar);
       optOrgLevelTotal=optOrgLevelTotal+num;
     }
     if(optOrgLevelTotal>30){
     	alert("内部机构代码级次设置各级长度之和不能超过30位");
     	return false;
     }
  } /* end_for */
  } /* end___OPT_ORG  */

  /*  OPT_EMP */
  if((voFree.getValue("OPT_EMP") == "Y") && (voFree.getValue("OPT_EMP_LENGTH") > 30 ||
			voFree.getValue("OPT_EMP_LENGTH") < 1) ){
     alert("职员代码长度:不能超过30,不能小于1");
     return false;
	}
  saveoption("AS_COMPANY_OPT", "getValFromFree");
}

function getValFromFree(){
	var voParas = new Array();
	voParas[0] = "OPT_COMPANY";
	voParas[1] = "OPT_ORG";
	voParas[2] = "OPT_ORG_LEVEL";
	return freeValToXML(voParas, voCoCode, voCompoName, voTransType);
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    
  	//-----------------------保存-----------------------------
    case "fsave":

    	if (PageX.isChanged()== false){
      	alert("没有发生更改,不用保存!");
    	}
    	else{
        fsave();
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
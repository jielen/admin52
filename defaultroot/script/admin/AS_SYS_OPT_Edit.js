
var voCompoName;
var voCoCode;
var voTransType;
var isEditOptCoCode = null;
var isEditOptEmp = null;
var isEditOptOrg = null;

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
	
	var voOptEmp = PageX.getCtrlObj("OPT_EMP");
	voOptEmp.addListener(new Listener(voOptEmp.OnChange, eventAnswer_Opt_Emp_OnChange, this));
	
  	getFieldValue();
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		//isOptEmp();
	}
	else{
		voFree.setReadOnly(true);
	}
	isEditInit();
	PageX.tIsChanged = false;
}
function isEditInit(){
	//debugger;
	var result = PageX.getRuleDeltaXML("admin-ruleData.MA_COMPANY_IsAllowed", ["ND"], [DataTools.getSV("svNd")]);
	isEditOptCoCode = result.firstChild.firstChild.firstChild.getAttribute("value");
	if(parseInt(isEditOptCoCode)>0){
		voFree.setFieldReadOnly("OPT_CO_CODE", true);
	}
	result = PageX.getRuleDeltaXML("admin-ruleData.AS_ORG_IsUsed", ["ND"], [DataTools.getSV("svNd")]);
	isEditOptOrg = result.firstChild.firstChild.firstChild.getAttribute("value");
	if(parseInt(isEditOptOrg)>0){
		voFree.setFieldReadOnly("OPT_HAS_ORG", true);
	}
	result = PageX.getRuleDeltaXML("admin-ruleData.AS_EMP_IsUsed");
	isEditOptEmp = result.firstChild.firstChild.firstChild.getAttribute("value");
	if(parseInt(isEditOptEmp)>0){
		voFree.setFieldReadOnly("OPT_EMP", true);
		voFree.setFieldReadOnly("OPT_EMP_LENGTH", true);
		voFree.setFieldReadOnly("OPT_AS_NAME_DUPL", true);
	}
}
function eventAnswer_Opt_Emp_OnChange(){
	var voOptEmp1 = voFree.getValue("OPT_EMP");
	if(voOptEmp1 == "N"){
		voFree.setFieldReadOnly("OPT_EMP_LENGTH", true);
	}else{
		voFree.setFieldReadOnly("OPT_EMP_LENGTH", false);
	}
}

function isOptEmp(){
	return eventAnswer_Opt_Emp_OnChange();
}

function getFieldValue(){
	var voNames = new Array("coCode", "compoId", "optIds", "transType");
  var voVals = new Array(voCoCode, voCompoName, "OPT_CO_CODE, OPT_EMP, OPT_EMP_LENGTH, OPT_HAS_ORG, OPT_AS_NAME_DUPL, OPT_DB_USER, OPT_DB_URL", voTransType);
	var result = requestData2("getOptions", "all", voNames, voVals);
	var volist = result.getElementsByTagName("row");
	var i = 0;

	if(volist.length == 0){
		voNames = new Array("coCode", "compoId", "optIds", "transType");
		voVals = voVals = new Array("*", voCompoName, "OPT_CO_CODE, OPT_EMP, OPT_EMP_LENGTH, OPT_HAS_ORG, OPT_AS_NAME_DUPL, OPT_DB_USER, OPT_DB_URL", "*");
		result = requestData2("getOptions", "all", voNames, voVals);
		volist = result.getElementsByTagName("row");
		if(volist.length == 0){
			voNames = new Array("coCode", "compoId", "optIds", "transType");
			voVals =  new Array("*", "*", "OPT_CO_CODE, OPT_EMP, OPT_EMP_LENGTH, OPT_HAS_ORG, OPT_AS_NAME_DUPL, OPT_DB_USER, OPT_DB_URL", "*");
			result = requestData2("getOptions", "all", voNames, voVals);
			volist = result.getElementsByTagName("row");
		}
	}
	for(i; i < volist.length; i++){
		var voVal = volist.item(i).getAttribute("OPT_VAL");
		if(voVal == "null" || voVal == null) voVal = "";
		voFree.setValue(volist.item(i).getAttribute("OPT_ID"), voVal);
	}
	if(voFree.getValue("OPT_HAS_ORG")=="" || voFree.getValue("OPT_HAS_ORG").length==0){
		voFree.setValue("OPT_HAS_ORG", "Y");
	}
	if(voFree.getValue("OPT_EMP")=="" || voFree.getValue("OPT_EMP").length==0){
		voFree.setValue("OPT_EMP", "N");
	}
	
}

function fsave(){
  /* 单位代码级次设置的格式  */
  var optCoCodeLevel = voFree.getValue("OPT_CO_CODE")//getField("OPT_CO_CODE");
  var optCoCodeLevelTotal = 0;
  var firstchar = optCoCodeLevel.charAt(0);
  var lastchar = optCoCodeLevel.charAt(optCoCodeLevel.length - 1);
  var beforeSaveHasOrg = voFree.getValue("OPT_HAS_ORG");//getField("OPT_HAS_ORG");
  //alert("initHasOrg"+initHasOrg);
  //alert("beforeSaveHasOrg"+beforeSaveHasOrg);
  //if((initHasOrg != beforeSaveHasOrg) && (initHasOrg.length > 0))
  //  alert("“是否需要内部机构“选项修改后，请重新启动系统！");

  if(firstchar < "1" || firstchar > "6" ||lastchar < "1" || lastchar > "6"){
     alert("单位代码分级设置只能由1位数字(1-6)和“-”间隔组成，" +
           "首位和末位是数字！");
     return false;
  }
  for(var i = 0; i < optCoCodeLevel.length; i++){
    var onechar = optCoCodeLevel.charAt(i);
    var onechar2 = optCoCodeLevel.charAt(i+1);
    if(onechar != "-" && (onechar < "1" || onechar > "6")){
      alert("单位代码分级设置只能由1位数字(1-6)和“-”间隔组成！");
      return false;
    }
    if(onechar >= "1" && onechar <= "6" && onechar2 != "-" &&
			i != (optCoCodeLevel.length - 1)){
      alert("单位代码分级设置只能由1位数字(1-6)和“-”间隔组成！");
      return false;
    }
    if(onechar == "-" && onechar2 == "-"){
      alert("单位代码分级设置只能由1位数字(1-6)和“-”间隔组成！");
      return false;
    }
    if(onechar <= "6" && onechar >= "1"){
      num=parseInt(onechar);
      optCoCodeLevelTotal=optCoCodeLevelTotal+num;
    }
    if(optCoCodeLevelTotal > 30){
      alert("单位代码分级设置各级长度之和不能超过30位！");
      return false;
    }
  }
	saveoption("AS_SYS_OPT", "getValFromFree");
}

function getValFromFree(){
	var voParas = new Array("OPT_CO_CODE", "OPT_EMP", "OPT_EMP_LENGTH", "OPT_HAS_ORG", "OPT_AS_NAME_DUPL", "OPT_DB_USER", "OPT_DB_URL");
	return freeValToXML(voParas, voCoCode, "*", voTransType);
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    
  	//-----------------------保存-----------------------------
    case "fsave":
    	//debugger;
    	if (PageX.isChanged()== false){
      		alert("没有发生更改,不用保存!");
    	}else{
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
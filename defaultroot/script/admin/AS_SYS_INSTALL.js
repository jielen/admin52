
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
	var voOptGoComUsed = PageX.getCtrlObj("OPT_GOCOM_USED");
	voOptGoComUsed.addListener(new Listener(voOptGoComUsed.OnChange, eventAnswer_Opt_GoCom_OnChange, this));
	
	var voOptUmailUsed = PageX.getCtrlObj("OPT_UMAIL_USED");
	voOptGoComUsed.addListener(new Listener(voOptUmailUsed.OnChange, eventAnswer_Opt_Umail_OnChange, this));
	
  	getFieldValue();
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		//isOptEmp();
	}
	else{
		voFree.setReadOnly(true);
	}
	//isEditInit();
	PageX.tIsChanged = false;
}

function eventAnswer_Opt_GoCom_OnChange(){
	var voOptGoComUsed = voFree.getValue("OPT_GOCOM_USED");
	if(voOptGoComUsed == "N"){
		voFree.setFieldReadOnly("OPT_GOCOM_CLIENT", true);
		voFree.setFieldReadOnly("OPT_GOCOM_SERVER", true);
		voFree.setFieldReadOnly("OPT_GOCOM_AUTO_LOGIN", true);
		voFree.setValue("OPT_GOCOM_CLIENT", "");
		voFree.setValue("OPT_GOCOM_SERVER", "");
		voFree.setValue("OPT_GOCOM_AUTO_LOGIN", "N");
	}else{
		voFree.setFieldReadOnly("OPT_GOCOM_CLIENT", false);
		voFree.setFieldReadOnly("OPT_GOCOM_SERVER", false);
		voFree.setFieldReadOnly("OPT_GOCOM_AUTO_LOGIN", false);
	}
}

function eventAnswer_Opt_Umail_OnChange(){
	var voOptUmailUsed = voFree.getValue("OPT_UMAIL_USED");
		if(voOptUmailUsed == "N"){
		voFree.setFieldReadOnly("OPT_UMAIL_SERVER", true);
		voFree.setValue("OPT_UMAIL_SERVER", "");
	}else{
		voFree.setFieldReadOnly("OPT_UMAIL_SERVER", false);
	}
}

function getFieldValue(){
	var i = 0;


		voNames = new Array("coCode", "compoId", "optIds", "transType");
		voVals = voVals = new Array("*", "*", "OPT_PASSWD_TIME,OPT_GOCOM_USED,OPT_GOCOM_CLIENT,OPT_GOCOM_SERVER,OPT_GOCOM_AUTO_LOGIN,OPT_UMAIL_USED,OPT_UMAIL_SERVER", "*");
		result = requestData2("getOptions", "all", voNames, voVals);
		var volist = result.getElementsByTagName("row");

	for(i; i < volist.length; i++){
		var voVal = volist.item(i).getAttribute("OPT_VAL");
		if(voVal == "null" || voVal == null) voVal = "";
		voFree.setValue(volist.item(i).getAttribute("OPT_ID"), voVal);
	}
	
}

function fsave(){
	saveoption("AS_SYS_INSTALL", "getValFromFree");
}

function getValFromFree(){
	var voParas = new Array("OPT_PASSWD_TIME", "OPT_GOCOM_USED", "OPT_GOCOM_CLIENT", "OPT_GOCOM_SERVER", "OPT_GOCOM_AUTO_LOGIN", "OPT_UMAIL_USED", "OPT_UMAIL_SERVER");
	return freeValToXML(voParas, '*', '*', voTransType);
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
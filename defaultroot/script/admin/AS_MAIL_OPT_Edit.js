
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
	
	getFieldValue();
	
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		//isOptEmp();
	}
	else{
		voFree.setReadOnly(true);
	}
	PageX.oRowManager.clearAll();
}

function fsave(){
	saveoption("AS_SYS_OPT", "getValFromFree");
}

function getFieldValue(){
	var voNames = new Array("coCode", "compoId", "optIds", "transType");
  var voVals = new Array(voCoCode, voCompoName, "OPT_MAIL_SMTPHOST, OPT_MAIL_NEEDAUTH, OPT_MAIL_ADMINEMAIL, OPT_MAIL_USER, OPT_MAIL_PASSWORD", voTransType);
	var result = requestData2("getOptions", "all", voNames, voVals);
	var volist = result.getElementsByTagName("row");
	if(volist.length == 0){
		voNames = new Array("coCode", "compoId", "optIds", "transType");
		voVals = new Array("*", "*", "OPT_MAIL_SMTPHOST, OPT_MAIL_NEEDAUTH, OPT_MAIL_ADMINEMAIL, OPT_MAIL_USER, OPT_MAIL_PASSWORD", "*");
		result = requestData2("getOptions", "all", voNames, voVals);
		volist = result.getElementsByTagName("row");
		if(volist.length == 0){
			voNames = new Array("coCode", "compoId", "optIds", "transType");
			voVals = new Array("*", voCompoName, "OPT_MAIL_SMTPHOST, OPT_MAIL_NEEDAUTH, OPT_MAIL_ADMINEMAIL, OPT_MAIL_USER, OPT_MAIL_PASSWORD", "*");
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
	if(voFree.getValue("OPT_MAIL_NEEDAUTH")=="" || voFree.getValue("OPT_MAIL_NEEDAUTH").length==0){
		voFree.setValue("OPT_MAIL_NEEDAUTH", "N");
	}
}

function getValFromFree(){
	var voParas = new Array("OPT_MAIL_SMTPHOST", "OPT_MAIL_NEEDAUTH", "OPT_MAIL_ADMINEMAIL", "OPT_MAIL_USER", "OPT_MAIL_PASSWORD");
	return freeValToXML(voParas, voCoCode, voCompoName, voTransType);
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    case "fadd":
      PageX.newBill();
      getFieldValue();
      break;
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
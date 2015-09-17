function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  	voFree = PageX.getFree(mainTableName);

	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
  
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voToolbar.setCallDisabled("fsaveas", true);
		voToolbar.setCallDisabled("fprint", true);
	}
}

function fwatch(){
	 
   if (document.getElementById("totalPageID")){
     document.getElementById("currentPageID").innerText = "";
     document.getElementById("totalPageID").innerText = "";
   }
   var names = new Array();
   var values = new Array();
   if(voFree.getValue("USER_ID")!="" && voFree.getValue("USER_ID")!=null){
	   names[names.length] = "user_id";
	   values[values.length] = voFree.getValue("USER_ID");
	}
	if(voFree.getValue("LOGIN_TIME")!="" && voFree.getValue("LOGIN_TIME")!=null )
	{
	   names[names.length] = "login_min";
	   values[values.length] = voFree.getValue("LOGIN_TIME")+":00";
	   	if(voFree.getValue("LOGOUT_TIME")!="" && voFree.getValue("LOGOUT_TIME")!=null){
	   		names[names.length] = "login_max";
	   		values[values.length] = voFree.getValue("LOGOUT_TIME")+":00";
	  	}
	  	else{
	  		names[names.length] = "login_max";
	  		var myDate = new Date();
	  		var month = myDate.getMonth() + 1 + "";
	  		var date = myDate.getDate() + "";
	  		var hours = myDate.getHours() + "";
	  		var minutes = myDate.getMinutes() + "";
	  		var seconds = myDate.getSeconds() + "";
	  		month = month.length > 1 ? month : "0" + month;
	  		date = date.length > 1 ? date : "0" + date; 
	  		hours = hours.length > 1 ? hours : "0" + hours;
	  		minutes = minutes.length > 1 ? minutes : "0" + minutes;
	  		seconds = seconds.length > 1 ? seconds : "0" + seconds;
	   		values[values.length] = myDate.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
	  	}
   }
   
   	 
   //PageX.getRuleData("admin-ruleData.AS_GETUSER_AUTH",names,values,null,null,null,30,"","A3","AS_AUTHPRT");
   PageX.makeReportGrid("admin-ruleData.AS_USER_STATINFO", names, values,null, null, "", 50, "AS_USER_STATINFO", true, null);
   voGrid = PageX.getCtrlObj("AS_USER_STATINFO");
	 if (voGrid!= null){
  	 voGrid.setRect(new Rect(10, voGrid.oOuterPanel.offsetTop+10, document.body.clientWidth- 20, document.body.clientHeight- voGrid.oOuterPanel.offsetTop-30));
   }

}


function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
  	  case "fsaveas":
  	    PageX.exportData();
  	    break;
  	  case "fwatch":
  	   
  	  	voToolbar.setCallDisabled("gridnextpage", false);
  		 	voToolbar.setCallDisabled("gridlastpage", false);
  		 	voToolbar.setCallDisabled("fprint", false);
   			voToolbar.setCallDisabled("fprn_tpl_set", false);
   			voToolbar.setCallDisabled("fsaveas", false);
  	  	fwatch();
  	  	break;
  	  case "fprint":
  	  	var userid = voFree.getValue("USER_ID");
  	  	PrintX.setParameter("sqlid","admin-ruleData.AS_USER_STATINFO");
  	  	PrintX.setParameter("condition","user_id="+userid);
  	  	PrintX.fprint();
  	  	break;
  	  case "fprn_tpl_set":
  	  	PrintX.fprintset();
  	  	break;
  	  //case "fpublish":
  	  	//fpublish();
  	  	//break;	
    	//-----------------------帮助-----------------------------
    	case "fhelp":
       PageX.showHelp();
       break;
    	//-----------------------缺省-----------------------------
  	default:
  }
  return;
}
/*
function fpublish(){
	if(voFree.getValue("OPT_USERID") == ""){
		alert("请选择帐号！");
		return;
	}
	var sqlid = "admin-ruleData.AS_GETUSER_AUTH";
	var condition = "user_id=" + voFree.getValue("OPT_USERID");
	var result = PageX.publishToReport(sqlid, condition);
	if(result == "false"){
		return;
	}
	else if(result == "success"){
		alert("发布成功！");
	}else{
		alert(result);
	}
}*/
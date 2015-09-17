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
	else{
		//voFree.setReadOnly(true);
	}
	
}

function fwatch(){
	 
   if (document.getElementById("totalPageID")){
     document.getElementById("currentPageID").innerText = "";
     document.getElementById("totalPageID").innerText = "";
   }
   var names = new Array();
   var values = new Array();
   names[0] = "user_id";
   values[0] = voFree.getValue("OPT_USERID");
   	 
   //PageX.getRuleData("admin-ruleData.AS_GETUSER_AUTH",names,values,null,null,null,30,"","A3","AS_AUTHPRT");
   PageX.makeReportGrid("admin-ruleData.AS_GETUSER_AUTH", names, values,null, null, "", 50, "AS_AUTHPRT", true, null);
   voGrid = PageX.getCtrlObj("AS_AUTHPRT");
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
  	    if(voFree.getValue("OPT_USERID")=="" || voFree.getValue("OPT_USERID")==null || voFree.getValue("OPT_USERNAME")==null || voFree.getValue("OPT_USERNAME")==""){
  	      alert("请先输入用户名！");
  	      return;
  	    }
  	  	voToolbar.setCallDisabled("gridnextpage", false);
  		 	voToolbar.setCallDisabled("gridlastpage", false);
  		 	voToolbar.setCallDisabled("fprint", false);
   			voToolbar.setCallDisabled("fprn_tpl_set", false);
   			voToolbar.setCallDisabled("fsaveas", false);
  	  	fwatch();
  	  	break;
  	  case "fprint":
  	  	var userid = voFree.getValue("OPT_USERID");
  	  	PrintX.setParameter("sqlid","admin-ruleData.AS_GETUSER_AUTH");
  	  	PrintX.setParameter("condition","user_id="+userid);
  	  	PrintX.fprint();
  	  	break;
  	  case "fprn_tpl_set":
  	  	PrintX.fprintset();
  	  	break;
  	  case "fpublish":
  	  	fpublish();
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
}
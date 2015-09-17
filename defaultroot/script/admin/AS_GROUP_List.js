
function setPageInit(){
  voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_GROUP_Grid");
	voGrid.addListener(new Listener(voGrid.OnRowDblClick, eventAnswer_VouHeadGrid_OnRowDblClick, this));  		
}

function eventAnswer_VouHeadGrid_OnRowDblClick(oSender, oRow, oEvent){
  var names = new Array(); 
  var values = new Array();
  PageX.openEditPage(DataTools.getMainTableName(), oRow.rowIndex, null, null, names, values);
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
      PageX.openBill(null, screen.availWidth, screen.availHeight-30,"","","scrollbars=yes");
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
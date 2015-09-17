
function setPageInit(){
  voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_PRINT_JASPERTEMP_Grid");
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
       //------------------------下发打印模板--------------------
    case "ftemplatedistribute":
    	if(!before_ftempDist()){
    		break;
    	}
       	ftemplatedistribute();
       	break;
    case "fprint":
    	PrintX.setParameter("DynamicTpl","1");
    	PrintX.setParameter("sqlid","admin-listPage.getDataFromAS_PRINT_JASPERTEMP");
    	PrintX.fprint();
    	break;
    case "fprn_tpl_set":
    	PrintX.fprintset();
    	break;
    case "fexport":
    	voGrid.saveAsExcel();
    	break;
    //-----------------------缺省-----------------------------
  	default:
  }
  return;
}
function before_ftempDist(){
	var userId = DataTools.getSV("svUserID");
	var cocode = DataTools.getSV("svCoCode");
	if(!cocode){
		alert("请在工作环境中选择单位代码！");
		return false;
	}
	//if(userId == "sa"){
	//	alert("登录帐号为sa的系统管理员不需要下发打印模板!");
	//	return false;
	//}
	return true;
}
//-------------下发打印模板到本单位-----------------------
function ftemplatedistribute(){
	var surl = PageX.sRootPath + "/dispatcher.action?function=prntemplatedistribute&componame=AS_PRINT_JASPERTEMP";
	var win = showModalDialog(surl,"","resizable:yes;status:no;help:no;dialogHeight:500px;dialogWidth:500px;");
	var params = win;
	if(!params){
		return false;	
	}
	if("" == params[0]){
		alert("没有选择要下发的模板!");
		return false;	
	}else if(params[1] == false && trim(params[2]) ==""){
		alert("没有选择要下发的模板!");
		return false;
	}else{
		var names = new Array();
		var values = new Array();
		names[0] = "tplcode";
		values[0] = params[0];
		names[1] = "isredo";
		values[1] = params[1];
		names[2] = "dbtpl";
		values[2] = params[2];
		names[3] = "userId";
		values[3] = DataTools.getSV("svUserID");
		names[4] = "cocode";
		values[4] = DataTools.getSV("svCoCode");
		var result = Info.requestData("prnTempDist", "AS_PRINT_JASPERTEMP", names, values);
		if(result.getAttribute("success") == "true"){
			alert("模板下发成功！");
			window.location.reload();
			return true;	
		}else{
			alert("模板下发失败！");
			return false;	
		}
	}
}      
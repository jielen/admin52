
function setPageInit(){
	voGrid = PageX.getCtrlObj("AM_WFTEST_Grid");
	voGrid.addListener(new Listener(voGrid.OnRowDblClick, eventAnswer_VouHeadGrid_OnRowDblClick, this));  		
	
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	
	search = PageX.getCtrlObj("WFTEST_search");
	search.setConditionEditor(
		function(paramName,paramValue) {
			var res = "";
			if (paramName == "listtype") {
				res += paramName + "=" + paramValue + ";";
				res += "executor=" + DataTools.getSV("svUserID") + ";";
				res += "wfcompoId=" + DataTools.getCompoName() ;
			} else {
				res = paramName + "=" + paramValue;
			}
			return res;
		}
	);
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
    //-------------------------送审--------------------------------
    case "fnewcommit":
    	newcommit();
      break;
    //-----------------------通过提交-----------------------------
  	case "fautocommit":
      fautocommit();
      break;
  	//-----------------------退回-----------------------------
    case "funtread":
    	funtread();
      break;
    //-------------------------收回-------------------------------
    case "fcallback":
    	fcallback();
      break;
    //-------------------------重做-------------------------------
    case "frework":
    	frework();
      break;
  	//-----------------------流程跟踪-----------------------------
    case "fshowinstancetrace":
      instancetrace();
      break;
   //---------------------------作废--------------------------- 
    case "finterruptinstance":
      finterruptinstance();
      break;
    	//-----------------------帮助-----------------------------
    	case "fhelp":
       PageX.showHelp();
       break;
      case "fgrantfunc":
       fgrantfuncF();
       break;       
    	//-----------------------缺省-----------------------------
  	default:
  }
  return;
}
//送审操作
function newcommit() {
	
  var aiRow = voGrid.getSelectedRowIndexs();
  if (aiRow.length == 0) {
    alert("请先在列表中勾选需要操作的行！");
    return;
  }
  var oneRow;
  var vsRets = new Array();
  var vsRet = "";
  /*for(i=0;i<aiRow.length;i++){
    oneRow = new Array(); 
    oneRow[0] = aiRow[i];
    vsRets[i] = PageX.newCommit(oneRow, true);
  }

  for(i=0;i<aiRow.length;i++){
    var n = parseInt(vsRets[i]);
    if (!(!isNaN(n) && (n > 0))){
      vsRet += vsRets[i];
    }
  }*/
  vsRet = PageX.newCommit(aiRow,false);
  if(""==vsRet){
    alert("送审成功！");
  }else {
    alert(vsRet);
  }
  //if (voSearch) voSearch.search(); //刷新页面
  voGrid.deleteSelectedRows();
  PageX.tIsChanged= false;
	//alert("newCommit");
}
//提交
function fautocommit() {
  if(PageX.isChanged()){
    if (confirm("页面上的数据已经修改，是否保存修改的数据并执行当前操作？\n\n" + 
                "选择\"确定\":  保存数据后执行当前操作；\n" + 
                "选择\"取消\":  不保存数据，也不会执行当前操作。")) {
      if (!fsave()) {
        alert("保存数据失败，无法完成当前操作！");
        return;
      }
    } else {
      return;
    }
  }
  var aiRow = voGrid.getSelectedRowIndexs();
  if (aiRow.length == 0) {
    alert("请先在列表中勾选需要操作的行！");
    return;
  }
  
  //获得系统选项:是否在通过、作废、收回、退回之前加提示
  var mRule = PageX.getOptions("OPT_CP_CONFIRM");
  var optCpConfirm = mRule.get("OPT_CP_CONFIRM");
  if(optCpConfirm != null && optCpConfirm == "1"){
		if(!confirm("是否确定通过？")){
			return false;
		}
	}
	
  var vsRet = PageX.autoCommitSimply(aiRow);;

  
  if(vsRet == "success"){
    alert("提交成功！");
  }else {
    if (vsRet != "")
      alert(vsRet);
  }  
  //if (voSearch) voSearch.search(); //刷新页面
  voGrid.deleteSelectedRows();
  PageX.tIsChanged= false;
}
  //退回
function funtread() {
  var aiRow = voGrid.getSelectedRowIndexs();
  if (aiRow.length == 0) {
    alert("请先在列表中勾选需要操作的行！");
    return;
  }
  
  //add by liuyan 2007-2-5 begin
  //获得系统选项:是否在作废、收回、退回之前加提示
  var mRule = PageX.getOptions("OPT_CP_CONFIRM");
  var optCpConfirm = mRule.get("OPT_CP_CONFIRM");
  if(optCpConfirm != null && optCpConfirm == "1"){
		if(!confirm("是否确定退回？")){
			return;
		}
	}
	//add by liuyan 2007-2-5 end
	//mazy 2007-7-25 平台支持2个参数（-1，-2）加判断，若是退到第一节点传-2，其他都传-1
	var mRule = PageX.getOptions("OPT_CP_BILL_AUDIT_RTN");
  var optCpBillAuditRtn = mRule.get("OPT_CP_BILL_AUDIT_RTN");
  if(optCpBillAuditRtn == -1){
  		var	opt=-2;
  	}else{
  		var	opt=-1;
  	}
  	//end
  var vsRet = PageX.giveBackSimply(aiRow, false,opt);
  if(vsRet == "success"){
    alert("退回成功！");
  }else {
    if (vsRet != "")
      alert(vsRet);
  }
  //if (voSearch) voSearch.search(); //刷新页面
  voGrid.deleteSelectedRows();
  PageX.tIsChanged= false;  
}
//收回
function fcallback() {
  var aiRow = voGrid.getSelectedRowIndexs();
  if (aiRow.length == 0) {
    alert("请先在列表中勾选需要操作的行！");
    return;
  }
  
  //add by liuyan 2007-2-5 begin
  //获得系统选项:是否在作废、收回、退回之前加提示
  var mRule = PageX.getOptions("OPT_CP_CONFIRM");
  var optCpConfirm = mRule.get("OPT_CP_CONFIRM");
  if(optCpConfirm != null && optCpConfirm == "1"){
		if(!confirm("是否确定收回？")){
			return;
		}
	}
	//add by liuyan 2007-2-5 end
  var vsRet = PageX.callBackSimply(aiRow);
  if(vsRet == "success"){
    alert("收回成功！");
  }else {
    if (vsRet != "")
      alert(vsRet);
  }
 // if (voSearch) voSearch.search(); //刷新页面
 voGrid.deleteSelectedRows();
  PageX.tIsChanged= false; 
}

//流程跟踪
function instancetrace(){
	  var aiRow = voGrid.getSelectedRowIndexs();
  if (aiRow.length == 0) {
    alert("请先在列表中勾选需要操作的行！");
    return;
  } else if (aiRow.length > 1) {
    alert("只能勾选一行进行本操作！请重新勾选。");
    return;
  }
  PageX.showTrace(aiRow);
	}
	
	//作废
function finterruptinstance(){ 
  var aiRow = voGrid.getSelectedRowIndexs();
  if (aiRow.length == 0) {
    alert("请先在表格中勾选需要作废的行！");
    return;
  }
  
  //add by liuyan 2007-2-5 begin
  //获得系统选项:是否在作废、收回、退回之前加提示
  var mRule = PageX.getOptions("OPT_CP_CONFIRM");
  var optCpConfirm = mRule.get("OPT_CP_CONFIRM");
  if(optCpConfirm != null && optCpConfirm == "1"){
		if(!confirm("是否确定作废？")){
			return;
		}
	}
	//add by liuyan 2007-2-5 end

  var vsRet=PageX.interruptInstance();
  if(vsRet == "success"){
    alert("作废成功！");
  }else {
    if (vsRet != "")
      alert(vsRet);
  }
  //if (voSearch) voSearch.search(); //刷新页面
  voGrid.deleteSelectedRows();
  PageX.tIsChanged= false;  

}

//重做
function frework() { 
  var aiRow = voGrid.getSelectedRowIndexs();
  var result = "";
  var alertResult = "";
  if (aiRow.length == 0) {
    alert("请先在列表中勾选需要操作的行！");
    return false;
  } 
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
	var compoData = DataTools.getTableRows(tableName, aiRow);
  var asInstId = DataTools.getFieldValues(tableName, aiRow, new Array("PROCESS_INST_ID"));
  var voComment = new Object();
  voComment.text = "";
  var vsComment = "";
  //debugger;
  var names = new Array();
  var values = new Array();
  names[0] = "instanceId";
  names[1] = "userId";
  names[2] = "comment";
  names[3] = "strBnData"
  values[0] = asInstId;
  values[1] = DataTools.getSV("svUserID");
  values[2] = vsComment;
  for (var i = 0; i < aiRow.length; i++) {
    values[0] = asInstId[i].avItemByIndex[0];
    values[3] = DataTools.getTableDataXML(tableName,aiRow[i]);
  	if(PF.isEmpty(values[0])){ 
    	result += "第" + (aiRow[i] + 1) + "行：" + "页面数据不正确!" + "\n";
    	continue;
  	} 
    if(!WFInterface.isInstanceFinish(values[0])){
    	result += "第" + (aiRow[i] + 1) + "行：" + "流程未结束，不能执行重做!" + "\n";
    	continue;
  }

  	var retXml = Info.requestData("rework", compoName,names, values, null);
  	if (retXml) {
    	var retText = retXml.text;
    	var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    	if (vtSuccess){
    		if (retText != "success")
      		result += "第" + (aiRow[i] + 1) + "行：" + retText + "\n";
    		} else
      		result += "第" + (aiRow[i] + 1) + "行：" + retText + "\n";
		} else
    	result += "第" + (aiRow[i] + 1) + "行：调用后台时发生错误。\n";
	}     
  if (result == ""){
  	alertResult ="流程重启成功.";
  }else{
  	alertResult = "处理失败。  \n错误原因 ------ \n" + result;
 	}
  alert(alertResult);
  //if (voSearch) voSearch.search(); 
  voGrid.deleteSelectedRows();
  PageX.tIsChanged= false;  
}

/*
Title: gp.workflow.WFPage4
Description:
WFPage4 :进行工作流页面的管理.
Company: 用友政务
Author:chupp,zhangcheng
*/

//----------------------------------------------------------------------
//声明页面中的全局对象

//alert("wfpage4 init");
//----------------------------------------------------------------------
//类的声明，也是类的构造函数
function WFPage4(){
  //1.超类
  Page4.call(this);
  //2.常量声明区
  this.CLASSNAME= "gp.page.WFPage4";

  //3.变量声明区

  //5.方法声明区
  //public;
  this.newBill= WFPage4_newBill;
  this.openEditPage= WFPage4_openEditPage;
  this.openBill= WFPage4_openBill;
  this.makeCondition=WFPage4_makeCondition;
//  this.deleteBill= WFPage4_deleteBill;
//  this.saveBill= WFPage4_saveBill;
//  this.saveBillK= WFPage4_saveBillK;
  this.manualCommit=WFPage4_manualCommit;
  this.autoCommit=WFPage4_autoCommit;
  this.autoCommitSimply=WFPage4_autoCommitSimply;
  
  this.callBack=WFPage4_callBack;
  this.callBackSimply=WFPage4_callBackSimply;
    
  this.untread=WFPage4_giveBack;
  this.giveBack=WFPage4_giveBack;
  this.giveBackSimply=WFPage4_giveBackSimply;
   
  this.rework=WFPage4_rework;
  
  this.handOver=WFPage4_handOver;
  this.impower=WFPage4_impower;  
  this.transfer=WFPage4_transfer;
  
  this.interruptInstance=WFPage4_interruptInstance;
  this.restartInstance=WFPage4_restartInstance;
  this.deleteWFWatchRow= WFPage4_deleteWFWatchRow;
  this.deactivateInstance=WFPage4_deactivateInstance;  
  this.activateInstance=WFPage4_activateInstance; 
  
  this.showOption=WFPage4_showOption;
  this.showTrace= WFPage4_showTrace;
  this.showComment=WFPage4_showComment;
  
  //4.事件声明区 =function();
  //凡是 Before 类的事件都是可以调用 abortEvent(true) 方法进行中止的.
  this.OnBeforeShowWFOptionDialog= "OnBeforeShowWFOptionDialog";                        //参数: oSender;
  this.OnAfterShowWFOptionDialog= "OnAfterShowWFOptionDialog";                    //参数: oSender;
  this.OnBeforeCommit= "OnBeforeCommit";                        //参数: oSender;
  this.OnAfterCommit= "OnAfterCommit";                    //参数: oSender;

  this.OnBeforeNewBill="OnBeforeNewBill";

  //private;
  this.newWorkflowBill= WFPage4_newWorkflowBill;
  this.getTemplateIdForOpenBill= WFPage4_getTemplateIdForOpenBill;
  this.getWFCondiForOpenEditPage= WFPage4_getWFCondiForOpenEditPage;
  this.getWFCondiForOpenBill= WFPage4_getWFCondiForOpenBill;
  this.showInstanceTrace= WFPage4_showInstanceTrace;
  this.checkBeforeDeleteBill= WFPage4_checkBeforeDeleteBill;
  this.getInstanceTitle= WFPage4_getInstanceTitle;
  this.ProcessAfterSaveSuccess= WFPage4_ProcessAfterSaveSuccess;
  this.refreshEditWindow= WFPage4_refreshEditWindow;
  this.getInstanceIdFromPage= WFPage4_getInstanceIdFromPage;
  this.getNextExecutorAndAssNameFromObj= WFPage4_getNextExecutorAndAssNameFromObj;
  this.removeNextNodeExecutor = WFPage4_removeNextNodeExecutor;
  this.removeExecutor = WFPage4_removeExecutor;
  this.appendExecutor = WFPage4_appendExecutor
}
//----------------------------------------------------------------------
//6.方法区
//----------------------------------------------------------------------
//public; 开工作流新单;
//只对新方式下的 edit 页面有效;
//列表页面新增调用的时openBill();
//返回值: 成功: true; 否则: false;

function WFPage4_newBill(){
 //alert("WFPage4_newBill");
  if (this.sPageLayout!= this.PAGE_LAYOUT_FREE) return false;
  if (this.sPageType!= this.PAGE_TYPE_EDIT) return false;

  var tIsClick = false;
  if (event && event.srcElement) tIsClick = true;

  //if (WFInterface.isWorkflowCompo() && tIsClick) {
  //  this.newWorkflowBill();
  //  return;
  //}

  var voRM= this.getRowManager();
  voRM.clearAll();
  voRM.tAllowInsert= false;
  voRM.tAllowDelete= false;
  voRM.tAllowUpdate= false;

  var vaxxsTableName= DataTools.getLevelTables();
  var voCtrl= null;
  var vaoCtrl= null;
  var vaoRelaObj= new Array();
  var vsTableName= "";
  for (var i= vaxxsTableName.length- 1; i>= 0; i--){
    for (var j= 0; j< vaxxsTableName[i].length; j++){
      vsTableName= vaxxsTableName[i][j];
      vaoCtrl= this.oDataPartMap.get(vsTableName);
      if (vaoCtrl== null) continue;
      for (var k= 0; k< vaoCtrl.length; k++){
        voCtrl= vaoCtrl[k];
        if (this.isGrid(voCtrl)== false
            && this.isFree(voCtrl)== false
            && this.isNormal(voCtrl)== false) continue;
        voCtrl.clear();
        vaoRelaObj[vaoRelaObj.length]= voCtrl;
      }
    }
  }

  this.tIsNew= true;
  this.tIsChanged= false;
  voRM.tAllowInsert= true;
  voRM.tAllowDelete= true;
  voRM.tAllowUpdate= true;

  var compoName = DataTools.getCompoName();
  this.initNewBill(compoName, vaoRelaObj);
  return true;
}
//----------------------------------------------------------------------
//public; 打开工作流编辑页面;
//返回值: 成功: true; 否则: false;

function WFPage4_openEditPage(sTableName, iRow, iWidth, iHeight,asName, asValue, sOpenFeatures, tIsShowProcess){
  //alert("WFPage4_openEditPage");

  if (!WFInterface.isWorkflowCompo()) return false;

  var vsCompoName= DataTools.getCompoName();
  if (vsCompoName== WFConst.WF_WATCH){
    this.showInstanceTrace();
    return;
  }
  sTableName= PF.trim(sTableName);
  if (sTableName== null || sTableName== "") return false;
  if (DataTools.isValidRow(sTableName, iRow)== false) return false;

  var vasKeyField= DataTools.getKeyFieldNames(sTableName);
  if (PF.isValidArray(vasKeyField)== false){
    alert("表没有描述主键信息,不能打开编辑页面.\ntable: "+ sTableName);
    return false;
  }
  var vsCondition= this.makeCondition(sTableName, iRow, vasKeyField);
  /*if (vsCondition== null) return false;
  var vsWFCondition= this.getWFCondiForOpenEditPage(iRow);

  if (!PF.isEmpty(vsWFCondition))
    vsCondition += " and " + vsWFCondition;*/
  if (vsCondition== null) return false;
  if (tIsShowProcess== null) tIsShowProcess= true;
  this.openBill(vsCondition, iWidth, iHeight,asName, asValue, sOpenFeatures);
  return true;
}
function WFPage4_makeCondition(sTableName, iRow, vasKeyField){
	
  var vsCondition= Page4_makeCondition.call(this,sTableName, iRow, vasKeyField);
  var vsWFCondition;
  if (!PF.isEmpty(vsCondition)){
    vsWFCondition= this.getWFCondiForOpenEditPage(iRow);
    if (!PF.isEmpty(vsWFCondition)){
      vsCondition += ";" + vsWFCondition;
    }
  }
  return vsCondition;
}
//----------------------------------------------------------------------
//public; 打开工作流编辑页面;列表页面新增，调用的也是这个函数
//返回值: 成功: true; 否则: false;

function WFPage4_openBill(sCondition, iWidth, iHeight, asName, asValue, sOpenFeatures, oFrame, sTableName, sCompoName){
  //alert("Page4_openBill();");
  if (PF.isEmpty(sCondition)) sCondition= "1=0";
  if (iWidth== null) iWidth= screen.availWidth- 10;
  if (iHeight== null) iHeight= screen.availHeight- 80;
  if (sOpenFeatures== null) sOpenFeatures= "";

  //var vsCompoName= DataTools.getMainCompoName();
  //var vsPageName= vsCompoName+ "_E";
  if (sCompoName== null){
    sCompoName= DataTools.getMainCompoName();
  }
  if (sTableName== null){
    sTableName= DataTools.getMainTableName(sCompoName);
  }
  var vsPageName= sCompoName+ "_E";
  var vsFunction= "geteditpage";
  var vsURL= PageX.getRoot()+ "/getpage_" + sCompoName + ".action?function="+ vsFunction
  	  + "&componame=" + URLEncoding(escapeSpecial(sCompoName))
  	  + "&tablename=" + URLEncoding(escapeSpecial(sTableName))
  	  + "&condition=" + URLEncoding(escapeSpecial(sCondition));
	//change by liubo
	if (PF.isValidArray(asName)){
	  vsURL+= "&"+ encodeParamArray(asName, asValue);
	}

  var voRect= PF.getCenterRect(iWidth, iHeight);
  if (voRect.iLeft< 0) voRect.iLeft= 0;
  if (voRect.iTop< 0) voRect.iTop= 0;

  var vsStyle= "menubar= no, toolbar= no, scrollbars=no, status=yes, "
             + "resizable= yes, titlebar= yes, "
             + "left= "+ voRect.iLeft+ "px, top= "+ voRect.iTop+ "px, "
             + "width= "+ iWidth+ "px, height= "+ iHeight+ "px, "+ sOpenFeatures;
  //alert(vsStyle);
  if (oFrame== null){
    this.oOpenedWin= open(vsURL, vsPageName, vsStyle);
  }else{
    oFrame.location.href= vsURL;
  }
  window.setTimeout("PageX.setOpenedWinFocus();", 500);

  var voRM= PageX.getRowManager();
  voRM.setValidChanged(false);
  voRM.setValidChanged(true);
  return true;
}
//----------------------------------------------------------------------
//public; 工作流部件编辑页面的删除功能;
//返回值: 成功:true, 失败:false;
/*本方法已移动到Page4.js中实现。
function WFPage4_deleteBill(){
  //alert("WFPage4_deleteBill");
  if (!this.checkBeforeDeleteBill()) return false;
  var voWfData= WFInterface.getWfData();
  var vasNames= new Array("wfdata");
  var vasValues= new Array(voWfData.toString());
  var vsCompoName= DataTools.getCompoName();
  var voRetRoot= Info.requestData("deleteWithWorkflow", vsCompoName, vasNames, vasValues);
  if (PF.parseBool(voRetRoot.getAttribute("success"))){
      closeWindowOfWF("delete");
      alert("删除成功，即将关闭此窗口！");
      //if (window.top == window)
    //    window.close();
      return true;
  }

  else {
     alert("删除失败！");
     return false;
  }
}*/
//----------------------------------------------------------------------
//private; 在删除表单之前进行条件判断,是否能够删除;
//返回值: true:继续删除, false:不删除;
function WFPage4_checkBeforeDeleteBill(){
  if (!WFInterface.isWorkflowCompo()) return false;
  //注掉，可以在编辑页面删除
  //if (this.sPageLayout!= this.PAGE_LAYOUT_FREE) return false;
  if (this.sPageType!= this.PAGE_TYPE_EDIT) return false;

  var voWfData= WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  if (PF.isEmpty(vsInstanceId)) return false;
  //注掉重复询问
  //if(!confirm("确定要删除吗？当前流程的所有待办事宜和已办事宜都将被删除！")) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 这个接口目前调用和WFPage4_saveBill一样
//由于Page4.js中保存表单存在两个版本,所以要实现这个方法.
//返回值: 成功: true; 否则: false;
/*本方法已移动到Page4.js中实现。
function WFPage4_saveBillK(sFunction, asName, asValue, isCheckEmpty, oResourceMap){
WFPage4_saveBill();
}*/
//----------------------------------------------------------------------
//public; 保存工作流单据;
//返回值: 成功: true; 否则: false;
/*本方法已移动到Page4.js中实现。
function WFPage4_saveBill(){
  if (!WFInterface.isWorkflowCompo()) return false;
  if (this.isChanged()== false) return false;

  var voWfData= WFInterface.getWfData();
  if (!voWfData.getTemplateId()) {
    alert("错误：未设置工作流模板，不能继续进行保存！");
    return false;
  }
  var vsInstanceTitle= this.getInstanceTitle();

  var voRM= PageX.getRowManager();
  var vsData= voRM.getAllRecord();
  var vsCompoName= DataTools.getCompoName();
  var voWfData= WFInterface.getWfData();
  var vasParamName= new Array("data", "componame","wfdata","title");
  var vasParamValue= new Array(vsData, vsCompoName,voWfData.toString(),vsInstanceTitle);
  var voRetRoot= Info.requestData("resolvewithworkflow", vsCompoName, vasParamName, vasParamValue);
  if (voRetRoot== null){
    alert("保存返回值为:null,可能保存时出现异常.");
    return false;
  }
  var vtSuccess= PF.parseBool(voRetRoot.getAttribute("success"));
  if (vtSuccess){
    PageX.tIsNew=false;
  voRM.clearAll();
    var vtAfterSaveProcess= this.ProcessAfterSaveSuccess(voRetRoot);
    return vtAfterSaveProcess;
  }else{
    alert("保存失败,错误信息是：" + voRetRoot.text);
    return false;
  }
}*/
//----------------------------------------------------------------------
//TODO:REFACTOR
//public; 删除流程监控页面的选定行
//返回值:删除成功:true, 删除失败:false;
function WFPage4_deleteWFWatchRow(iRowIndex){
  var vsMainTableName= DataTools.getMainTableName();
  var vsInstanceId= DataTools.getValue(vsMainTableName, iRowIndex, WFConst.WF_INSTANCE_ID);
  var voWfData= new WFData();
  voWfData.setCurrentExecutorId(DataTools.getSV("svUserID"));
  voWfData.setInstanceId(vsInstanceId);
  var vasNames= new Array("indata", "funcname");
  var vasValues= new Array(voWfData.toString(), "delete");
  var voRetRoot= Info.requestData("wfCommon", WFConst.WF_WATCH, vasNames, vasValues);
  if (PF.parseBool(voRetRoot.getAttribute("success")))
    return true;
  else
    return false;
}
//----------------------------------------------------------------------
//private; 在数据成功保存之后的处理;
//返回值:成功:true, 失败:false;
function WFPage4_ProcessAfterSaveSuccess(oRetRoot){
  voXMLDoc= PF.parseXml(oRetRoot.text);
  if (voXMLDoc) {
  var voTaskIdNode= voXMLDoc.selectSingleNode("field[@name='"+ WFConst.WF_TASK_ID+"' ]");
  if (voTaskIdNode!= null){
    var vsTaskId= voTaskIdNode.getAttribute("value");
    if (!PF.isEmpty(vsTaskId)){
      this.refreshEditWindow(voXMLDoc);
      return true;
    }
    return false;
  }
  return false;
  }
  return true;
}
//----------------------------------------------------------------------
//private; 得到流程实例的标题;
//返回值：流程实例的标题;
function WFPage4_getInstanceTitle(){
  var vsInstanceTitle= "";
  var vsTitleFieldName=DataTools.getCompoMeta().getAttribute("titlefield");
  if(PF.isEmpty(vsTitleFieldName))
    vsInstanceTitle= "";
  else{
    var vsMainTableName= DataTools.getMainTableName();
    vsInstanceTitle=DataTools.getValue(vsMainTableName, 0, vsTitleFieldName)
  }
  return vsInstanceTitle;
}
//----------------------------------------------------------------------
//private; 得到挂接的流程模板;
//返回值:挂接的流程模板;
function WFPage4_getSelectedTemplateDatas(){
  var vsCompoName= DataTools.getCompoName();
  var vasTemplateDatas= new Array();
  var vsCompoEnbleStartedTemplate= this.queryCompoEnableStartedTempate(vsCompoName);
  if(vsCompoEnbleStartedTemplate== "") return vasTemplateDatas;
  if(vsCompoEnbleStartedTemplate.indexOf(",")== -1){
    vasTemplateDatas[1]= vsCompoEnbleStartedTemplate;
    return vasTemplateDatas;
  }
  vasTemplateDatas= this.getSelectedTemplateDatasFromDialog();
  return vasTemplateDatas;
}
//----------------------------------------------------------------------
//private; 通过对话框选择挂接的流程模板;
//返回值:选择的流程模板
function WFPage4_getSelectedTemplateDatasFromDialog(){
  var vjNow= new Date();
  var vsCompoName= DataTools.getCompoName();
  var vasTemplateDatas= new Array();
  var voWinSelect= showModalDialog("Proxy?function=getSelectPage&componame="
      + "WF_TEMPLATE" + "&condition="+ ""
      + "&originCompoName="+vsCompoName+ "&ismulti=" + false
      + "&d=" + vjNow.getMilliseconds(),new Array(window),"status:no;help:no;resizable:yes");
  if (voWinSelect){
      var vasNames= new Array();
      var vasValues= new Array();
      vasNames= voWinSelect[0];
      vasValues= voWinSelect[1];
      var viNamesLen= vasNames.length;
      for(var i=0; i<viNamesLen; i++){
        if(vasNames[i].toUpperCase()== WFConst.WF_TEMPLATE_ID){
             vasTemplateDatas[1]= vasValues[i];
             break;
        }
      }
  }
  return vasTemplateDatas;
}
//----------------------------------------------------------------------
//public; 工作流部件编辑页面下的新开表单；
//返回值:void;
function WFPage4_newWorkflowBill(){
  var vsTemplateId= this.getTemplateIdForOpenBill();
  if (!vsTemplateId)
    return;

  var vsWfCondi= encodeParams(WFConst.WF_TEMPLATE_ID, vsTemplateId);
  var vsCompoName= DataTools.getCompoName();
  var vsPageName= vsCompoName+ "_E";
  var vsUrl= "Proxy?function=geteditpage"
            + "&"+ vsWfCondi
            + "&componame=" + vsCompoName
            + "&fieldvalue=" + vsPageName
  window.navigate(vsUrl);
}
//----------------------------------------------------------------------
//public; 得到列表页面的新增功能所对应的流程模板id;
//返回值:对应的流程模板id;
function WFPage4_getTemplateIdForOpenBill(){
  var vsTemplateId= "";
  var vsDefTemplateId= this.getDefaultTemplateId();
  if (!PF.isEmpty(vsDefTemplateId))
    vsTemplateId= vsDefTemplateId;
  else{
    vsTemplateId= this.getSelectedTemplateDatas()[1];
    }
  return vsTemplateId;
}
//----------------------------------------------------------------------
//public; 得到部件使用的默认流程模板; 在AS_COMPO中描述的;
//返回值:存在可用的默认流程模板:返回流程模板id, 否则:返回"";
function WFPage4_getDefaultTemplateId(){
  var voCompoMeta= DataTools.getCompoMeta();
  var vsDefTemplateId= voCompoMeta.getAttribute("wfdeftemp");
  var vtDefTemplateUsed= voCompoMeta.getAttribute("iswfusedtemp");
  if (vtDefTemplateUsed== true && PF.trim(vsDefTemplateId) != "")
    return vsDefTemplateId;
  return "";
}
//----------------------------------------------------------------------
//public; 对于工作流部件得到工作流数据拼接的条件;
//返回值:成功:拼接的工作流数据条件, 否则:"";
function WFPage4_getWFCondiForOpenBill(){
  var vsCondition= "";
  var vsTemplateId="";
  //vsTemplateId= this.getTemplateIdForOpenBill();
  //if (!vsTemplateId || vsTemplateId== "")
  //  return "";

  var voCompoMeta= DataTools.getCompoMeta();
  var vsCompoName= voCompoMeta.getAttribute("name");
  var vsPageName= vsCompoName+ "_E";
  //vsCondition= encodeParams(WFConst.WF_TEMPLATE_ID, vsTemplateId,"componame", vsCompoName,
  //vsCondition= encodeParams("componame", vsCompoName,
  //                          "condition","1=0","fieldvalue", vsPageName);
  vsCondition= encodeParams("condition","1=0");
  return vsCondition;
}
//----------------------------------------------------------------------
//private; 获取双击工作流部件列表页面的一行拼接的工作流数据条件;
//返回值:拼接的工作流数据条件;
function WFPage4_getWFCondiForOpenEditPage(iRowIndex){
  var vsCondition= "";;
  var vasWfPkInfo= WFInterface.getWFPkInfo(iRowIndex);

  var vasParamNames= new Array();
  var vasParamValues= new Array();
  if(vasWfPkInfo[0]){
    vasParamNames[vasParamNames.length]= WFConst.WF_TEMPLATE_ID;
    vasParamValues[vasParamValues.length]= vasWfPkInfo[0];
  }
  if(vasWfPkInfo[1]){
    //vasParamNames[vasParamNames.length]= WFConst.WF_INSTANCE_ID;
    vasParamNames[vasParamNames.length]= WFConst.PROCESS_INST_ID_FIELD;
    vasParamValues[vasParamValues.length]= vasWfPkInfo[1];
  }
  if(vasWfPkInfo[2]){
    vasParamNames[vasParamNames.length]= WFConst.WF_NODE_ID;
    vasParamValues[vasParamValues.length]= vasWfPkInfo[2];
  }
  if(vasWfPkInfo[3]){
    vasParamNames[vasParamNames.length]= WFConst.WF_TASK_ID;
    vasParamValues[vasParamValues.length]= vasWfPkInfo[3];
  }
  var voCompoMeta= DataTools.getCompoMeta();
  var vsCompoName= voCompoMeta.getAttribute("name");

  /*vasParamNames[vasParamNames.length]= "componame";
  vasParamValues[vasParamValues.length]= vsCompoName;
  vasParamNames[vasParamNames.length]= "fieldvalue";
  vasParamValues[vasParamValues.length]= vsCompoName+"_E";
  */
  vsCondition= encodeParamArray(vasParamNames, vasParamValues);
  return vsCondition;
}
//----------------------------------------------------------------------
//public: 显示流程跟踪对话框;
//返回值: void;
function WFPage4_showInstanceTrace(sInstanceId){
	//debugger;
  if (!sInstanceId){
    sInstanceId= this.getInstanceIdFromPage();
  }

  if (PF.isEmpty(sInstanceId)){alert("页面数据不正确，操作无法继续，请与管理员联系!");return ;}
    var vjNow = new Date();
    var svCondition=encodeParams("componame","WF_INSTANCE_TRACE",
                                 "instanceid",sInstanceId);
    var voWinSelect = showModalDialog(PageX.getRoot() +"/wfInstanceTrace.action?" + svCondition ,new Array(window),
               'status:no;help:no;dialogHeight:500px;dialogWidth:700px;center:yes;');
  }

function WFPage4_showTrace(iRow) {
  if (!iRow) {
    iRow = 0;
  }
  var tableName = DataTools.getMainTableName(DataTools.getCompoName());
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0 && iRow < rowCount) {
    var vsInstId = DataTools.getValue(tableName, iRow, "PROCESS_INST_ID");
    if (vsInstId && vsInstId.length > 0) {
      if (vsInstId.indexOf("-") < 0) {
        this.showInstanceTrace(vsInstId);
      } else {
        alert("当前单据还处于草稿状态，无法显示流程跟踪。");
      }
    } else {
      alert("当前单据没有相关的流程信息，无法显示流程跟踪。");
    }
  } else {
    alert("没有需要显示流程跟踪的单据。");
  }
}

//----------------------------------------------------------------------
//public:根据工作流数据对象重新刷新窗口;
//返回值:void;
function WFPage4_refreshEditWindow(oXMLDoc){
  var vsTemplateId= oXMLDoc.selectSingleNode("field[@name='"+WFConst.WF_TEMPLATE_ID+"']").getAttribute("value");
  var vsInstanceId= oXMLDoc.selectSingleNode("field[@name='"+WFConst.WF_INSTANCE_ID+"']").getAttribute("value");
  var vsNodeId= oXMLDoc.selectSingleNode("field[@name='"+WFConst.WF_NODE_ID+"']").getAttribute("value");
  var vsTaskId= oXMLDoc.selectSingleNode("field[@name='"+WFConst.WF_TASK_ID+"']").getAttribute("value");
  var vsCompoName= DataTools.getCompoName();
  var vsPageName= vsCompoName+ "_E";

  var vasParamNames= new Array(WFConst.WF_TEMPLATE_ID, WFConst.WF_INSTANCE_ID,
                               WFConst.WF_NODE_ID, WFConst.WF_TASK_ID);
  var vasParamValues= new Array(vsTemplateId, vsInstanceId, vsNodeId, vsTaskId);
  var vsCondition= encodeParamArray(vasParamNames, vasParamValues);

  var vsURL = "Proxy?function=geteditpage"
    + "&componame=" + vsCompoName
    +"&condition="
    + "&" + vsCondition
    + "&fieldvalue=" + vsPageName
  window.navigate(vsURL);
}
//----------------------------------------------------------------------
//得到编辑页面或者列表页面的工作流部件的实例id;
//返回值:实例id;
function WFPage4_getInstanceIdFromPage(){
  var vsInstanceId= "";
  if (WFInterface.isWorkflowCompo()){
    if (PageX.sPageType== this.PAGE_TYPE_LIST){
      var vsMainTable= DataTools.getMainTableName();
      var voGrid= PageX.getAreaGrid(vsMainTable);
      var viCurRowIndex=voGrid.getCurRowIndex();
      vsInstanceId= DataTools.getValue(vsMainTable, viCurRowIndex, WFConst.WF_INSTANCE_ID);
      if (vsInstanceId== null) //字段名有待于统一
        vsInstanceId= DataTools.getValue(vsMainTable, viCurRowIndex, "PROCESS_INST_ID");
     }
     else if (PageX.sPageType== this.PAGE_TYPE_EDIT){
       var voWfData= WFInterface.getWfData();
       vsInstanceId= voWfData.getInstanceId();
     }
  }
  return vsInstanceId;
}
//----------------------------------------------------------------------
//public:从工作流数据的对象中获得主办人和辅办人的名字;
//返回值:主办人与辅办人的名字;
function WFPage4_getNextExecutorAndAssNameFromObj(oWfData){
  var vsNames= "";
  var vsExecutorName= oWfData.getNextExecutorName();
  var vsExecutorAssName= oWfData.getNextExecutorAssName();
  if (vsExecutorName)
    vsNames+= vsExecutorName;
  if (vsExecutorAssName)
    vsNames+= vsExecutorAssName;

  return vsNames;
}

//public:激活流程
//返回值:
function WFPage4_activateInstance(){
  //判断是否是列表页面(只有流程监控列表页面才有此功能)
  if(this.sPageType!=this.PAGE_TYPE_LIST){alert("只有列表页面可以使用此功能"); return;}

  //获取页面数据,并进行条件检查(目前只支持一次激活一条流程)
  var vsTableName="AS_WF_WATCH";
  var oGrid=this.oDataPartMap(vsTableName);
  var varSelectIndex=oGrid.getSelectedRowIndexs();
  if(varSelectIndex.length==0){alert("请选择您需要操作的记录");return;}
  if(varSelectIndex.length>1){alert("您一次只能选择一条操作记录。");return ;}

  var voWfData=new WFData();
  //	var voRow=oGrid.getRow(varSelectIndex[0]);
  var viRowIndex=varSelectIndex[0];
  var vasFieldName=oGrid.getFieldNames();
  for(var i=0,j=vasFieldName.length;i<j;i++){
    var vsFieldName=vasFieldName[i];
    if(vsFieldName==WFConst.WF_INSTANCE_ID){
      voWfData.setInstanceId(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }
    if(vsFieldName==WFConst.WF_TEMPLATE_ID){
      voWfData.setTemplateId(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }

    if(vsFieldName==WFConst.WF_INSTANCE_STATUS){
      voWfData.setInstanceStatus(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }
  }

  if(voWfData.getInstanceId()==null || voWfData.getInstanceId()==""){
    alert("页面数据不正确!请于管理员联系。");
    return ;
  }

  //流程状态有四种:活动，挂起，正常终止，不正常终止。
  if(voWfData.getInstanceStatus==WFConst.WF_STATUS_SUSPEND){
    alert("当前任务不是挂起任务，不能激活实例!");
    return;
  }

  if(!confirm("确定要激活实例吗？")){
    return;
  }

  //提交客户端请求
  var vasNames= new Array("funcname","indata");
  var vasValues= new Array("activeInstance",voWfData.toString());
  var voRetRoot= Info.requestData("wfCommon", "WF_WATCH", vasNames, vasValues);
  if (PF.parseBool(voRetRoot.getAttribute("success"))){
      alert("流程激活成功，即将关闭此窗口！");
      if(opener)opener.location.reload();
      if (window.top == window)
        window.close();
      return true;
  }
  else {
     alert("流程激活失败！");
     return false;
  }

}

//----------------------------------------------------------------------

//public:自动提交
//返回值:
function WFPage4_autoCommit(){
  var voWfData=WFInterface.getWfData();
  //数据检查
  if (!voWfData.getInstanceId()) {
    return "错误: 不是工作流模式的页面，操作无法继续！";
  }
  if (!voWfData.getTaskId()) {// 注意032551: 已提交的工作项没有工作项ID
    return "错误: 工作项已提交，不能再次提交！";
  }
  //添加svPoCode,提交设置，并且先检查wfData中的svPoCode，供业务临时设置.zhanggh
  var positionId = DataTools.getSV("svOrgPoCode");
  //首先判断wfData中是否有业务部门用脚本设置的职位代码
  //(一般在before_fautocommit中设置)
  //如果有，就使用；如果没有，就从环境中取
  if(!voWfData.getPositionId()){
    voWfData.setPositionId(positionId);
  }
  //alert(voWfData);
  //设置默认执行人以及流向
  var bError=WFPage4_setDefaultActionAndNextExecutor(voWfData);
  if(bError)
    return "";

  //发送事件
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeCommit)){
      this.eventAnswer_OnBeforeShowCommit();
  }
  if (this.isAbortEvent()) return "";
  //向外发送事件;
  this.fireEvent(this.OnBeforeCommit, null);
  if (this.isAbortEvent()) return "";

  //提交客户端请求
  var ret = WFPage4_doCommitRequest(voWfData);

  //发送事件
  if (PF.isExistMethodK(this.eventAnswer_OnAfterCommit)){
      this.eventAnswer_OnAfterShowCommit();
  }
  if (this.isAbortEvent()) return "";
    //向外发送事件;
      this.fireEvent(this.OnAfterCommit, new Array(ret));
      if (this.isAbortEvent()) return "";

  return ret;
}

function WFPage4_autoCommitSimply(aiRow, isNeedComment) {
  var result = "";
  // 1、准备工作流数据
  var compoName = DataTools.getCompoName();
  var userId =  DataTools.getSV("svUserID");
  var wfDataXml = WFInterface.getWFSessionXml().xml;
  var wfData = wfDataXml;
  var funcName = compoName + "_before_commitsimply";
  if (eval("typeof " + funcName + "==\"function\"")) {
   wfData = eval(funcName + "(wfDataXml)");
  }

  if (isNeedComment) {
    var voComment = new Object();
    voComment.text = "";
    var ret = showModalDialog("dispatcher.action?function=commentDialog", voComment, "status:no;resizable:yes;help:no;dialogHeight:250px;dialogWidth:355px");
    if (!ret || ret != "isOk"){
      return "";
    } else {
      wfData = wfData.replace("<entity>", "<entity>" + PF.getFieldXml("WF_COMMENT" , PF.getHtmlEncode(voComment.text)));
    }
  }

  // 2、处理业务数据
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0) {
    if (!aiRow) {
      aiRow = new Array(rowCount);
      for (var i = 0; i < rowCount; i++)
        aiRow[i] = i;
    }
    var retXml = "";
    var retText = "";
    var vtSuccess = false;

    var asInstId = DataTools.getFieldValues(tableName, aiRow, new Array("PROCESS_INST_ID"));
    var instIds = "";
    for (var i = 0; i < asInstId.length; i++) {
    	instIds += asInstId[i].avItemByIndex[0] + ",";
    }
    if (instIds.length > 0) {
    	instIds =instIds.substr(0, instIds.length - 1);
  	}
    var names = new Array();
    var values = new Array();
    names[0]="strInstanceId";values[0] = instIds;
    names[1]="strTemplateId";values[1]="";
    names[2]="strCompoId";values[2]=compoName;
    names[3]="strUserId";values[3]=userId;
    names[4]="strWfData";values[4]= wfData;
    names[5] = "strBuData";//business data
    values[5] = "";
    //chupp; 20080624
	/*
	compoData = "<delta>";
	var vsBusiData= "";
    if (eval("typeof getBusinessData ==\"function\"")){
	    var vsBusinessData= eval("getBusinessData(tableName, aiRow)");
	    compoData += vsBusinessData;
    } else {
        for (var i = 0; i < aiRow.length; i++) {
    	    compoData += DataTools.getTableDataXML(tableName,aiRow[i])
        }
    }
    compoData += "</delta>";
 */
  
    var actionName = this.getWfAction(WFConst.COMMITSIMPLY);
    retXml = Info.requestData(actionName, compoName, names, values, null);
    if (retXml) {
    	var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    	if (vtSuccess) {
    		return "success";
    	} else {
    		return retXml.text;
    	}
    }
  } else {
    return "没有需要处理的单据！";
  }
}
//----------------------------------------------------------------------

//private:提交客户端请求
//return:无
function WFPage4_doCommitRequest(oWfData){
  var vsCompoName=DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(vsCompoName);
	
  var vasNames= new Array("data","componame","wfdata");
  var vasValues= new Array();
  vasValues[0] = DataTools.getTableDataXML(tableName);
  vasValues[1]=vsCompoName;
  vasValues[2]=oWfData.toString(true);
  //alert(vasValues[3]);
  //return ;

  var retXml = Info.requestData("commit", vsCompoName, vasNames, vasValues);

    /*//发送事件
  if (PF.isExistMethodK(this.eventAnswer_OnAfterCommit)){
    this.eventAnswer_OnAfterShowCommit();
  }
  if (this.isAbortEvent()) return false;
   //向外发送事件; OnAfterShowWFOptionDialog
  this.fireEvent(this.OnAfterCommit, null);
  if (this.isAbortEvent()) return false;*/

  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += PF.parseXml(retText).text + "\n";
  } else
    result += "调用后台时发生错误系。\n";

  if(opener)opener.location.reload();

  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;

}


//----------------------------------------------------------------------
//private;自动提交时，设置默认流向以及执行人
// 从服务器段获取下一步默认流向,以及提交人,并设置到全局变量wfData中.
 //返回false表示可以继续提交,返回true表示不能继续提交
 function WFPage4_setDefaultActionAndNextExecutor(oWfData){
   if(oWfData==null){alert("工作流设置默认提交人和下一步提交人时，参数不正确!");return;}

    var bExistDefaultActionAndNextExecutor=true;
    var strConfirmMsg="抱歉,现在工作流无法自动提交,可能是由于:\n";

   //获取默认流向,并设置到wfData中
  if(PF.isEmpty(oWfData.getAction())){
    var strActionName=WFInterface.getDefaultAction(oWfData.getTemplateId(),oWfData.getNodeId());
    if(strActionName==""){
      bExistDefaultActionAndNextExecutor=false;
      strConfirmMsg+="1:无法获取当前环节流向，请在工作流定义处指定默认流向．\n"
    }else{
      oWfData.setAction(strActionName);
    }
  }

  //获取默认执行人
  if(PF.isEmpty(oWfData.getNextExecutorId())){
    var strDefaultNextExecutor=WFInterface.getDefaultNextExecutor();
    //alert(strDefaultNextExecutor);
    if( strDefaultNextExecutor == ""){
      if(!bExistDefaultActionAndNextExecutor){
        strConfirmMsg+="2:";
      }else{
        strConfirmMsg+="1:";
      }
      bExistDefaultActionAndNextExecutor=false;
      strConfirmMsg+="无法获取默认提交人，请定义当前执行人与下一步执行人的关系或者指定默认执行人．\n";
    }
    strConfirmMsg+="如果您希望手动指定提交参数请按YES ,否则按NO.";

    if(bExistDefaultActionAndNextExecutor){
      oWfData.setNextExecutorId(strDefaultNextExecutor);//TODO :考虑辅办人
    }else{
      //询问是否要进行手动设置提交
      return false;//临时方案，为财政局演示用。
      if(confirm(strConfirmMsg)){
      //是否要发送事件
        var vsRet=WFPage4_showWFOptionDialog(oWfData,"手动提交",WFConst.WF_FUNC_MANUALCOMMIT);
         if (!vsRet || vsRet!="isOk" )			return true;
      }else{
        return true;//不提交
      }
    }
  }
  return false;
 }

//----------------------------------------------------------------------
//private;工作流选项窗口
/**
* 通用提交对话框
* @param oWfData是WFData对象请参考WFData.js
* @return :Map对象，请参考Map.js
*/

function WFPage4_showWFOptionDialog(oWfData,dlgTitle,nfuncId,allowWhich){
  if(!allowWhich) allowWhich = 1; //default
  var vsCondition=encodeParams(WFConst.WF_INSTANCE_ID, oWfData.getInstanceId(),
                                WFConst.WF_TEMPLATE_ID, oWfData.getTemplateId(),
                                WFConst.WF_NODE_ID,oWfData.getNodeId(),
                                WFConst.WF_CURRENT_EXECUTOR_ID,oWfData.getCurrentExecutorId(),
                                "func_id",nfuncId,
                                "title",dlgTitle,
                                "allowwhich",allowWhich);
//processInstId=" + wfData.PROCESS_INST_ID+"&sTemplate_id="+		wfData.WF_TEMPLATE_ID + "&activityID=" + wfData.WF_ACTIVITY_ID+"&userId="+svUserId + 		"&funcId=commit"
  var ret = showModalDialog("dispatcher.action?function=optionDialog&"+vsCondition, oWfData,"status:no;resizable:yes;help:no;dialogHeight:460px;dialogWidth:600px");
  return ret;
}
//----------------------------------------------------------------------

//public:回收.
//返回值:
function WFPage4_callBack(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsCurrentExecutorId=voWfData.getCurrentExecutorId();
  var vsTaskId = voWfData.getTaskId();
  if(PF.isEmpty(vsInstanceId)){ return "页面数据不正确，请与管理员联系!";}
  if(vsTaskId){ return "当前是待办任务，不能回收!"; }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"回收",WFConst.WF_FUNC_CALLBACK)

  //var paras = selectWorkflowParameter("withdraw",wfDataObj,vsInstanceId);


  if (!vsRet){
    //alert("您忘记输入意见了!");
    return "";
  }

  /*var nextNodeId=paras.ACTIVITY_ID
  var comment = paras.COMMENT;
  var primaryUserIds = paras.NEXT_EXECUTOR;///主办人
  var secondUserIds = paras.NEXT_EXECUTOR2;///辅办人
  var needMessage= paras.needMessage;
  var needShortMessage= paras.needShortMessage;
  var needEmail= paras.needEmail;
  if(!nextNodeId || nextNodeId==""){
    alert("请选择退回节点!");
    return;
  }
  if (!comment){
    //alert("请输入回退意见!");
    //return;
    comment="同意回退!";
  }*/
		var names = ["instanceId","executeStat"];
  	var values = [vsInstanceId,"getExecuteByCallBack"];
  	var resStat = Info.requestDataK("mailAction", compoName, names, values);
  	
  voWfData.setNodeId(-1);

  //提交客户端请求
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);;
  var vasNames = new Array("funcname","indata");
  var vasValues = new Array("callback",voWfData.toString(),DataTools.getTableDataXML(tableName));
  var actionName = this.getWfAction(WFConst.CALLBACK);
  var retXml = Info.requestData(actionName, compoName, vasNames, vasValues);
  if(retXml.text == "success"){
  	var funcName2 = "after_callBack";
				if (eval("typeof " + funcName2 + "==\"function\"")) {
						f = eval(after_callBack);
						f(voWfData,"callBack",resStat);
    }
		return "success";
  }
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += retText+ "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}
//----------------------------------------------------------------------

//public:批量回收.
//返回值:
function WFPage4_callBackSimply(aiRow,isNeedComment) {
  var result = "";
  // 1、准备业务数据
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0) {
    if (!aiRow) {
      aiRow = new Array(rowCount);
      for (var i = 0; i < rowCount; i++)
        aiRow[i] = i;
    }
    var voComment = new Object();
    voComment.text = "";
    var vsComment = "";
    if (isNeedComment) {
      voComment.text = "";
      var ret = showModalDialog("dispatcher.action?function=commentDialog", voComment, "status:no;resizable:yes;help:no;dialogHeight:250px;dialogWidth:355px");
      if (!ret || ret != "isOk"){
        return "";
      } else {
        vsComment = PF.getHtmlEncode(voComment.text);
      }
    }
    var compoData = DataTools.getTableRows(tableName, aiRow);
    var userId = DataTools.getSV("svUserID");
    var instId = "";
    var wfData = "";

    var retXml = "";
    var vtSuccess = false;

    var asInstId = DataTools.getFieldValues(tableName, aiRow, new Array("PROCESS_INST_ID"));
    var names = new Array("funcname", "indata","strBnData");
    var values = new Array("callback", "");
    var actionName = this.getWfAction(WFConst.CALLBACK);
     // 2、循环处理回退操作
    for (var i = 0; i < aiRow.length; i++) {
      instId = asInstId[i].avItemByIndex[0];
      if (instId.indexOf("-") < 0) {
        wfData = PF.getFieldXml("WF_CURRENT_EXECUTOR_ID", userId);
        wfData += PF.getFieldXml("WF_INSTANCE_ID", instId);
        wfData += PF.getFieldXml("WF_NODE_ID", "-1");  // 批量收回节点号必须是-1。
        wfData += PF.getFieldXml("WF_COMMENT", vsComment);
        wfData = PF.getWraptXml("entity", wfData);
        values[1] = wfData;
        values[2] = DataTools.getTableDataXML(tableName,aiRow[i]);
        retXml = Info.requestData(actionName, compoName, names, values);
        if (retXml) {
          vtSuccess = PF.parseBool(retXml.getAttribute("success"));
          if (!vtSuccess)
            result += "第" + (aiRow[i] + 1) + "行：" + retXml.text + "\n";
        } else
          result += "第" + (aiRow[i] + 1) + "行：调用后台时发生错误。\n";
      } else {
        result += "第" + (aiRow[i] + 1) + "行：单据还处于草稿状态，无需收回。\n"
      }
    }
    if (result == "")
      return "success";
    else
      return "处理失败。  \n错误原因 ------ \n" + result;
  } else {
    return "没有需要处理的单据！";
  }
}

//----------------------------------------------------------------------
//public:打开选项设置窗口
//返回值:
function WFPage4_showOption(){
  var voWfData=WFInterface.getWfData();
  //数据检查
  if (!voWfData.getInstanceId()) {
    alert("错误: 不是工作流模式的页面，操作无法继续！");
    return;
  }

  //设置默认流向
  var strAction=WFInterface.getDefaultAction(voWfData.getTemplateId(),voWfData.getNodeId());
  if(!PF.isEmpty(strAction)){
    voWfData.setAction(strAction);
  }

  //获取默认执行人
  var strDefaultNextExecutorId=WFInterface.getDefaultNextExecutor();
  if(!PF.isEmpty(strDefaultNextExecutorId)){
    voWfData.setNextExecutorId(strDefaultNextExecutorId);
  }
    //发送显示提交窗口的事件
     //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeShowWFOptionDialog)){
    this.eventAnswer_OnBeforeShowWFOptionDialog();
  }
   if (this.isAbortEvent()) return false;
    //向外发送事件; OnBeforeShowWFOptionDialog
   this.fireEvent(this.OnBeforeShowWFOptionDialog, null);
   if (this.isAbortEvent()) return false;

  var vsRet=	WFPage4_showWFOptionDialog(voWfData,"选项设置",WFConst.WF_FUNC_SHOWOPTION);
  if (PF.isExistMethodK(this.eventAnswer_OnAfterShowWFOptionDialog)){
    this.eventAnswer_OnAfterShowWFOptionDialog();
  }
   if (this.isAbortEvent()) return false;
    //向外发送事件; OnBeforeShowWFOptionDialog
   this.fireEvent(this.OnAfterShowWFOptionDialog, null);
  if (this.isAbortEvent()) return false;

}
//----------------------------------------------------------------------

//public:
//返回值:
function WFPage4_deactivateInstance(){
  //判断是否是列表页面(只有流程监控列表页面才有此功能)
  if(this.sPageType!=this.PAGE_TYPE_LIST){ return "只有列表页面可以使用此功能"; }

  //获取页面数据,并进行条件检查(目前只支持一次激活一条流程)
  var vsTableName="AS_WF_WATCH";
  var oGrid=this.oDataPartMap(vsTableName);
  var varSelectIndex=oGrid.getSelectedRowIndexs();
  if(varSelectIndex.length==0){ return "请选择您需要操作的记录"; }
  if(varSelectIndex.length>1){ return "您一次只能选择一条操作记录。"; }

  var oWfData=new WFData();
  //	var voRow=oGrid.getRow(varSelectIndex[0]);
  var viRowIndex=varSelectIndex[0];
  var vasFieldName=oGrid.getFieldNames();
  for(var i=0,j=vasFieldName.length;i<j;i++){
    var vsFieldName=vasFieldName[i];
    if(vsFieldName==WFConst.WF_INSTANCE_ID){
      oWfData.setInstanceId(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }
    if(vsFieldName==WFConst.WF_TEMPLATE_ID){
      oWfData.setTemplateId(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }

    if(vsFieldName==WFConst.WF_INSTANCE_STATUS){
      oWfData.setInstanceStatus(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }
  }

  if(oWfData.getInstanceId()==null || oWfData.getInstanceId()==""){
    return "页面数据不正确!请于管理员联系。";
  }

  //流程状态有四种:活动，挂起，正常终止，不正常终止。
  if(oWfData.getInstanceStatus==WFConst.WF_STATUS_ACTIVE){
    return "当前任务不是活动任务，不能冻结实例!";
  }

  if(!confirm("确定要冻结实例吗？")){
    return "";
  }

  //提交客户端请求
  var vasNames = new Array("funcname","indata");
  var vasValues = new Array("deactiveInstance",oWFData.toString());
  var retXml = Info.requestData("wfCommon", "WF_WATCH", vasNames, vasValues);
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += PF.parseXml(retText).text + "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}
//----------------------------------------------------------------------

//public:
//allowwhich,-1，仅起始，0，仅起始+前一个，1，仅前一个，2，所有
//返回值:
function WFPage4_giveBack(allowWhich, isNew, airow){
  var voWfData = WFInterface.getWfData(isNew);
  var vsTaskId= voWfData.getTaskId();
  if(PF.isEmpty(vsTaskId)){
    return "当前是已办任务，不能回退!";
  }
  var vsInstanceId;

  /*if(isCollectTaskPage()){
    var allRows=getAllRows("A3");
    var selectRows=getSelectedRows("A3");
    if(allRows.length == 1){
      alert("抱歉,您现在不能回退当前任务,因为当前任务是汇总任务的唯一子任务.\n您可以选择重新汇总.将任务回退到汇总节点.");
      return ;
    }

    if(selectRows.length==0){
      alert("您需要选择一个回退任务。\n如果您希望回退所有任务，您也可以点击重新汇总，汇总人员将重新汇总重新汇总。");
      return;

    }else if(selectRows.length>1){
      alert("您一次只能选择一个任务进行回退!");
      return ;

    }else if(selectRows.length==1){
      vsInstanceId=getRowField(selectRows[0], "INSTANCE_ID");
    }
  }*/

  if(!vsInstanceId)vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();

  //考虑汇总页面的子任务的回退
  var vsRet=WFPage4_showWFOptionDialog(voWfData,"流程回退",WFConst.WF_FUNC_GIVEBACK,allowWhich);
  if (!vsRet || vsRet!="isOk"){
    //alert("您忘记输入意见了!");
    return "";
  }

  //提交客户端请求f
  //alert(voWfData.toString());
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var vasNames = new Array("funcname","indata","strBnData");
  //var vasValues= new Array("untreadflow",voWfData.toString(),DataTools.getTableDataXML(tableName, airow));
  /* 
	  var   strBnData = "<delta>";
	  for (var i = 0; i < airow.length; i++) {
	      strBnData += DataTools.getTableDataXML(tableName,airow[i]);
	  }
	  strBnData += "</delta>";
   */
  var vasValues= new Array("untreadflow",voWfData.toString(),"");
  var retXml = Info.requestData("wfCommon", compoName, vasNames, vasValues);
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += retText + "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}

//----------------------------------------------------------------------

function WFPage4_giveBackSimply(aiRow,isNeedComment,toWhich) {
  var result = "";
  // 1、准备业务数据
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0) {
    if (!aiRow) {
      aiRow = new Array(rowCount);
      for (var i = 0; i < rowCount; i++)
        aiRow[i] = i;
    }
    var voComment = new Object();
    voComment.text = "";
    var vsComment = "";
    if (isNeedComment) {
      voComment.text = "";
      var ret = showModalDialog("dispatcher.action?function=commentDialog", voComment, "status:no;resizable:yes;help:no;dialogHeight:250px;dialogWidth:355px");
      if (!ret || ret != "isOk"){
        return "";
      } else {
        vsComment = PF.getHtmlEncode(voComment.text);
      }
    }
    var compoData = DataTools.getTableRows(tableName, aiRow);
    var userId = DataTools.getSV("svUserID");

    var retXml = "";
    var retText = "";
    var vtSuccess = false;

    var asInstId = DataTools.getFieldValues(tableName, aiRow, new Array("PROCESS_INST_ID"));
    var instIds = "";
    for (var i = 0; i < asInstId.length; i++) {
    	instIds += asInstId[i].avItemByIndex[0] + ",";
    }
    if (instIds.length > 0) {
    	instIds =instIds.substr(0, instIds.length - 1);
  	}
    var names = new Array();
    var values = new Array();
    names[0] = "instanceId";values[0] = instIds;
    names[1] = "userId";values[1] = userId;
    names[2] = "comment";values[2] = vsComment;
    names[3] = "toWhich";values[3] = toWhich;
    names[4] = "strBnData";
     // 2、循环处理回退操作
    compoData = "<delta>";
    for (var i = 0; i < aiRow.length; i++) {
    	compoData += DataTools.getTableDataXML(tableName,aiRow[i])
    }
    compoData += "</delta>";
	values[4] = compoData;
	retXml = Info.requestData("untreadSimply", compoName, names, values, null);
	if (retXml) {
		var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
		if (vtSuccess) {
			return "success";
		} else {
			return retXml.text;
		}
	}
  } else {
    return "没有需要处理的单据！";
  }
}

//public:移交任务
//返回值:
function WFPage4_handOver(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsTaskId = voWfData.getTaskId();

  if(PF.isEmpty(vsInstanceId)){ return "页面数据不正确，请与管理员联系!";	}
  if(!vsTaskId){
    return "当前是已办任务，不能移交!";
  }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"移交",WFConst.WF_FUNC_HANDOVER)

  if (!vsRet ||vsRet!="isOk"){
    //alert("您忘记输入意见了!");
    return "";
  }

  /*var nextNodeId=paras.ACTIVITY_ID
  var comment = paras.COMMENT;
  var primaryUserIds = paras.NEXT_EXECUTOR;///主办人
  var secondUserIds = paras.NEXT_EXECUTOR2;///辅办人
  var needMessage= paras.needMessage;
  var needShortMessage= paras.needShortMessage;
  var needEmail= paras.needEmail;
  if(!nextNodeId || nextNodeId==""){
    alert("请选择退回节点!");
    return;
  }
  if (!comment){
    //alert("请输入回退意见!");
    //return;
    comment="同意回退!";
  }*/

  //提交客户端请求
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var vasNames= new Array("funcname","indata");
  var vasValues= new Array("handover",voWfData.toString());
  var actionName = this.getWfAction(WFConst.HANDOVER);
  var retXml = Info.requestData(actionName, DataTools.getCompoName(), vasNames, vasValues);
	if(retXml.text==="success"){
				  		var funcName2 = "after_handOver";
						  if (eval("typeof " + funcName2 + "==\"function\"")) {
							 f = eval(after_handOver);
							 f(voWfData,"handOver");
		  		}
		  	}  
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += PF.parseXml(retText).text + "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}

//----------------------------------------------------------------------

//public:
//返回值:
function WFPage4_impower(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsTaskId = voWfData.getTaskId();

  if(PF.isEmpty(vsInstanceId)){ return "页面数据不正确，请与管理员联系!";	}
  if(!vsTaskId){
    return "当前是已办任务，不能授权!";
  }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"授权",WFConst.WF_FUNC_IMPOWER)

  if (!vsRet ||vsRet!="isOk"){
    //alert("您忘记输入意见了!");
    return "";
  }

  //提交客户端请求
  var vasNames= new Array("funcname","indata");
  var vasValues= new Array("impower",voWfData.toString());
  var retXml = Info.requestData("wfCommon", DataTools.getCompoName(), vasNames, vasValues);
 	if(retXml.text==="success"){
				  		var funcName2 = "after_impower";
						  if (eval("typeof " + funcName2 + "==\"function\"")) {
							 f = eval(after_impower);
							 f(voWfData,"impower");
		  		}
		  	}
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    
    if (!vtSuccess)
      result += PF.parseXml(retText).text + "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}
//----------------------------------------------------------------------

//public:中止流程
//返回值:
function WFPage4_interruptInstance(){
  var instanceIds = new Array();
  var varSelectIndexs = null;
  //判断是否是列表页面
  var vsTableName=DataTools.getMainTableName();//"AS_WF_WATCH";
  var oGrid= PageX.getListGrid();
  if(this.sPageType==this.PAGE_TYPE_LIST){
    //获取页面数据,并进行条件检查(目前只支持一次中止一条流程)
    varSelectIndexs=oGrid.getSelectedRowIndexs();
    if(varSelectIndexs.length==0){ return "请选择您需要操作的记录"; }
    for (var i = 0;i<varSelectIndexs.length; i++){
      instanceIds[i] = DataTools.getValue(vsTableName,varSelectIndexs[i],WFConst.PROCESS_INST_ID_FIELD);
      if(instanceIds[i] == null || instanceIds[i] == ""){
        return "页面数据不正确，请与管理员联系!";
      }
    }
  }else{
    var voWfData=WFInterface.getWfData();;//编辑页面已经加载了流程id
    instanceIds[0]= voWfData.getInstanceId();
    varSelectIndexs = new Array();
    varSelectIndexs[0] = 0;
  }

  //提交客户端请求
  var hasFailure = false;
  var result = "";
  for (var i = 0; i < instanceIds.length; i++){
    var vasNames= new Array("instanceId","comment");
    var vasValues= new Array(instanceIds[i],"");
    var actionName = this.getWfAction(WFConst.INTERRUPT);
    var voRetRoot= Info.requestData(actionName, DataTools.getCompoName(), vasNames, vasValues);
    if (voRetRoot) {
      var retText = voRetRoot.text;
      var vtSuccess = PF.parseBool(voRetRoot.getAttribute("success"));
      if (!vtSuccess)
        result += retText + "\n";
    }    
  }
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}
//----------------------------------------------------------------------

//public:手动提交
//增加参数allWhich,是否允许选单位
//  0,不允许选； 1，只允许选本单位； 2，所有单位
//返回值:
function WFPage4_manualCommit(allWhich){
  var voWfData=WFInterface.getWfData();
  //数据检查
  if (!voWfData.getInstanceId()) {
    return "错误: 不是工作流模式的页面，操作无法继续！";
  }
  if (!voWfData.getTaskId()) {// 注意032551: 已提交的工作项没有工作项ID
    return "错误: 工作项已提交，不能再次提交！";
  }

  //设置默认流向
  var strAction=WFInterface.getDefaultAction(voWfData.getTemplateId(),voWfData.getNodeId());
  if(!PF.isEmpty(strAction)){
    voWfData.setAction(strAction);
  }

  //获取默认执行人
  //var strDefaultNextExecutorId=WFInterface.getDefaultNextExecutor();
  var strDefaultNextExecutors=WFInterface.getExecutorsByRelation(strAction);
  if(!PF.isEmpty(strDefaultNextExecutors)){
    var strDefaultNextExecutorss = strDefaultNextExecutors.split(";");
    var strDefaultNextExecutorId = strDefaultNextExecutorss[0];
    var strDefaultNextExecutorName = strDefaultNextExecutorss[1];
    if(!PF.isEmpty(strDefaultNextExecutorId)){
      voWfData.setNextExecutorId(strDefaultNextExecutorId);
      voWfData.setNextExecutorName(strDefaultNextExecutorName);
    }
  }

  //发送显示提交窗口的事件
  //事件快速响应通道,仅供继承类使用;
  //向外发送事件; OnBeforeShowWFOptionDialog
  this.fireEvent(this.OnBeforeShowWFOptionDialog, null);
  if (this.isAbortEvent()) return "";

  var vsRet = WFPage4_showWFOptionDialog(voWfData,"手动提交",WFConst.WF_FUNC_MANUALCOMMIT,allWhich);


  //向外发送事件; OnBeforeShowWFOptionDialog
  this.fireEvent(this.OnAfterShowWFOptionDialog, null);
  if (this.isAbortEvent()) return "";
  if (!vsRet ||vsRet!="isOk")			return "";
  //alert(voWfData.toString());

  //向外发送事件;
  this.fireEvent(this.OnBeforeCommit, null);
  if (this.isAbortEvent()) return "";

  var ret = WFPage4_doCommitRequest(voWfData);

  //向外发送事件;
  this.fireEvent(this.OnAfterCommit, new Array(ret));
  if (this.isAbortEvent()) return "";
  
  return ret;
}
//----------------------------------------------------------------------

//public:
//返回值:
function WFPage4_restartInstance(){
  //判断是否是列表页面(只有流程监控列表页面才有此功能)
  if(this.sPageType!=this.PAGE_TYPE_LIST){ return "只有列表页面可以使用此功能"; }

  //获取页面数据,并进行条件检查(目前只支持一次重启一条流程)
  var vsTableName="AS_WF_WATCH";
  var oGrid=this.oDataPartMap(vsTableName);
  var varSelectIndex=oGrid.getSelectedRowIndexs();
  if(varSelectIndex.length==0){ return "请选择您需要操作的记录"; }
  if(varSelectIndex.length>1){ return "您一次只能选择一条操作记录。"; }

  var voWfData=new WFData();
  var viRowIndex=varSelectIndex[0];
  var vasFieldName=oGrid.getFieldNames();
  for(var i=0,j=vasFieldName.length;i<j;i++){
    var vsFieldName=vasFieldName[i];
    if(vsFieldName==WFConst.WF_INSTANCE_ID){
      voWfData.setInstanceId(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }
    if(vsFieldName==WFConst.WF_TEMPLATE_ID){
      voWfData.setTemplateId(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }

    if(vsFieldName==WFConst.WF_INSTANCE_STATUS){
      voWfData.setInstanceStatus(oGrid.getValueByRowField(viRowIndex,vsFieldName));
    }
  }

  if(voWfData.getInstanceId()==null || voWfData.getInstanceId()==""){
    return "页面数据不正确!请于管理员联系。";
  }

  //流程状态有四种:活动，挂起，正常终止，不正常终止。
  if(voWfData.getInstanceStatus!=WFConst.WF_STATUS_ACTIVE){
    return "当前任务不是挂起任务，不能重启实例!";
  }

  if(!confirm("确定要重启实例吗？")){
    return "";
  }

  //提交客户端请求
  var vasNames = new Array("funcname","indata");
  var vasValues = new Array("restartInstance",voWfData.toString());
  var retXml = Info.requestData("wfCommon", "WF_WATCH", vasNames, vasValues);
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += PF.parseXml(retText).text + "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}

//----------------------------------------------------------------------

//public:显示历史意见
//返回值:
function WFPage4_showComment(iRow) {
  if (!iRow) {
    iRow = 0;
  }
  var tableName = DataTools.getMainTableName(DataTools.getCompoName());
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0 && iRow < rowCount) {
    var vsInstId = DataTools.getValue(tableName, iRow, "PROCESS_INST_ID");
    if (vsInstId && vsInstId.length > 0) {
      if (vsInstId.indexOf("-") < 0) {
        showModalDialog("dispatcher.action?function=processHistory&" + WFConst.WF_INSTANCE_ID + "=" + vsInstId, null,
          "status:no;resizable:yes;help:no;dialogHeight:400px;dialogWidth:600px");
      } else {
        alert("当前单据还处于草稿状态，无法查看审核意见。");
      }
    } else {
      alert("当前单据没有相关的流程信息，无法查看审核意见。");
    }
  } else {
    alert("没有需要查看审核意见的单据。");
  }
}
//----------------------------------------------------------------------
//public:流程跳转
//返回值:
function WFPage4_transfer(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsTaskId = voWfData.getTaskId();

  if(PF.isEmpty(vsInstanceId)){ alert("页面数据不正确，请与管理员联系!");		return;	}
  if(!vsTaskId){
    alert("当前是已办任务，不能跳转!");
    return;
  }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"流程跳转",WFConst.WF_FUNC_TRANSFER)

  if (!vsRet ||vsRet!="isOk"){
    //alert("您忘记输入意见了!");
    return;
  }

  //提交客户端请求
  var vasNames= new Array("funcname","indata");
  var vasValues= new Array("transferflow",voWfData.toString());
  var retXml = Info.requestData("wfCommon", DataTools.getCompoName(), vasNames, vasValues);
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += PF.parseXml(retText).text + "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}
//public:流程重做
//返回值:
function WFPage4_rework(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();

  if(PF.isEmpty(vsInstanceId)){ 
    alert("页面数据不正确!");	
    return;	
  }
  if(!WFInterface.isInstanceFinish(vsInstanceId)){
    alert("流程未结束，不能执行重做!");
    return;
  }

  var voComment = new Object();
  voComment.text = "";
  var vsComment = "";
  //var ret = showModalDialog("commentDialog?", voComment, "status:no;resizable:yes;help:no;dialogHeight:250px;dialogWidth:355px");
  //if (!ret || ret != "isOk"){
   // alert("您忘记输入意见了!");
  //  return "";
 // }else{
 //   vsComment = voComment.text;
 // }

  var names = new Array();
  var values = new Array();
  names[0] = "instanceId";
  names[1] = "userId";
  names[2] = "comment";
  values[0] = vsInstanceId;
  values[1] = DataTools.getSV("svUserID");
  values[2] = vsComment;
  var actionName = this.getWfAction(WFConst.REWORK);
  retXml = Info.requestData(actionName, DataTools.getCompoName(),
   names, values, null);
  //提交客户端请求
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += retText + "\n";
  } else
    result += "调用后台时发生错误。\n";
  if (result == "")
    return "success";
  else
    return "处理失败。  \n错误原因 ------ \n" + result;
}


function closeWindowOfWF(call){
  //关闭window前先检查是否需要执行after_call(例after_fgiveback)
  if (eval("typeof after_f" + call + " ==\"function\""))
    r2 = eval("after_f"+call + "()");
  if (window.top == window)
    window.close();
}


function WFPage4_removeNextNodeExecutor(aiRow) {
  var result = "";
  // 1、准备工作流数据
  var compoName = DataTools.getCompoName();
  var userId =  DataTools.getSV("svUserID");
  var wfDataXml = WFInterface.getWFSessionXml().xml;
  var wfData = wfDataXml;
  var voWfData=WFInterface.getWfData();
  
	var condition = encodeParams("func_id",14,
										 "title","删除下步执行人",
										 "allowwhich",1,
										 WFConst.WF_TEMPLATE_ID, voWfData.getTemplateId(),
										 WFConst.WF_NODE_ID,voWfData.getNodeId(),
										 "direction","4");
	var ret = showModalDialog("dispatcher.action?function=optionDialog&"+condition,voWfData,"status:no;resizable:yes;help:no;dialogHeight:460px;dialogWidth:600px");
	if(!ret || !voWfData.getNextExecutorId()) {
		return "";
	}
	var fieldString = voWfData.fieldInMapToString();
	wfData = wfData.replace("<entity>","<entity>"+ fieldString );//加上信息
	
  //var voWfData=WFInterface.getWfData();
	//:TODO 添加执行人

  // 2、处理业务数据
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0) {
    if (!aiRow) {
      aiRow = new Array(rowCount);
      for (var i = 0; i < rowCount; i++)
        aiRow[i] = i;
    }
    var retXml = "";
    var retText = "";
    var vtSuccess = false;
    var asInstId = DataTools.getFieldValues(tableName, aiRow, new Array("PROCESS_INST_ID"));
    var names = new Array();
    var values = new Array();
    names[0]="instanceId"; values[0]=voWfData.getInstanceId();
    names[1]="userId";values[1]=DataTools.getSV("svUserID");
    names[2]="action";values[2]=voWfData.getAction();
		names[3]="strWfData";values[3]= wfData;
		names[4]="comment"; values[4] = voWfData.getComment();
    retDoc = Info.requestData("removeNextNodeExecutor", compoName, names, values, null);
    var flag = retDoc.getAttribute("success");
    if(flag==="success"){
		  var funcName2 = "after_removeNextExecutor";
			if (eval("typeof " + funcName2 + "==\"function\"")) {
				f = eval(after_removeNextExecutor);
				f(voWfData,"removeNextExecutor");
			}
			return "success";
		} else {
			alert("处理失败。  \n错误原因 ------ \n" + retDoc.text);
			return "";
		}
}

}
//删除当前执行人
function WFPage4_removeExecutor(aiRow) {
  var result = "";
  // 1、准备工作流数据
  var compoName = DataTools.getCompoName();
  var userId =  DataTools.getSV("svUserID");
  var wfDataXml = WFInterface.getWFSessionXml().xml;
  var wfData = wfDataXml;
  var voWfData=WFInterface.getWfData();
  
	var condition = encodeParams("func_id",15,
										 "title","删除执行人",
										 "allowwhich",1,
										 WFConst.WF_TEMPLATE_ID, voWfData.getTemplateId(),
										 WFConst.WF_NODE_ID,voWfData.getNodeId(),
										 "direction","4");
	var ret = showModalDialog("dispatcher.action?function=optionDialog&"+condition,voWfData,"status:no;resizable:yes;help:no;dialogHeight:460px;dialogWidth:600px");
  if (!ret || ret != "isOk"){
    return "";
  }
	var fieldString = voWfData.fieldInMapToString();
	wfData = wfData.replace("<entity>","<entity>"+ fieldString );//加上信息
	
  //var voWfData=WFInterface.getWfData();
	//:TODO 添加执行人

  // 2、处理业务数据
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0) {
    if (!aiRow) {
      aiRow = new Array(rowCount);
      for (var i = 0; i < rowCount; i++)
        aiRow[i] = i;
    }
    var retXml = "";
    var retText = "";
    var vtSuccess = false;
    var asInstId = DataTools.getFieldValues(tableName, aiRow, new Array("PROCESS_INST_ID"));
    var names = new Array();
    var values = new Array();
    names[0]="instanceId"; values[0]=voWfData.getInstanceId();
    names[1]="userId";values[1]=DataTools.getSV("svUserID");
    names[2]="action";values[2]=voWfData.getAction();
		names[3]="strWfData";values[3]= wfData;
    retDoc = Info.requestData("removeNodeExecutor", compoName, names, values, null);
    var flag = retDoc.getAttribute("success");
    if(flag==="success"){
		  var funcName2 = "after_removeExecutor";
			if (eval("typeof " + funcName2 + "==\"function\"")) {
				f = eval(after_removeExecutor);
				f(voWfData,"removeExecutor");
			}
			return "success";
		} else {
			alert("处理失败。  \n错误原因 ------ \n" + retDoc.text);
			return "";
		}
}
}
function WFPage4_appendExecutor(aiRow,direction) {
	if (!direction) direction = "0";
  var result = "";
  // 1、准备工作流数据
  var compoName = DataTools.getCompoName();
  var userId =  DataTools.getSV("svUserID");
  var wfDataXml = WFInterface.getWFSessionXml().xml;
  var wfData = wfDataXml;
  var voWfData=WFInterface.getWfData();
  
	var condition = encodeParams("func_id",12,
										 "title","追加执行人",
										 "allowwhich",1,
										 WFConst.WF_TEMPLATE_ID, voWfData.getTemplateId(),
										 WFConst.WF_NODE_ID,voWfData.getNodeId(),
										 "direction",direction);
										 
	var ret = showModalDialog("dispatcher.action?function=optionDialog&"+condition,voWfData,"status:no;resizable:yes;help:no;dialogHeight:460px;dialogWidth:600px");
	if(!ret || !voWfData.getNextExecutorId()) {
		return "";
	}
	var fieldString = voWfData.fieldInMapToString();
	wfData = wfData.replace("<entity>","<entity>"+ fieldString );//加上信息
	
  //var voWfData=WFInterface.getWfData();
	//:TODO 添加执行人

  // 2、处理业务数据
  var compoName = DataTools.getCompoName();
  var tableName = DataTools.getMainTableName(compoName);
  var rowCount = DataTools.getTableRowCount(tableName);
  if (rowCount > 0) {
    if (!aiRow) {
      aiRow = new Array(rowCount);
      for (var i = 0; i < rowCount; i++)
        aiRow[i] = i;
    }
    var retXml = "";
    var retText = "";
    var vtSuccess = false;
    var asInstId = DataTools.getFieldValues(tableName, aiRow, new Array("PROCESS_INST_ID"));
    var names = new Array();
    var values = new Array();
    names[0]="instanceId";values[0]=voWfData.getInstanceId();
    names[1]="templateId";values[1]=voWfData.getTemplateId();
		names[2]="nodeId";values[2]= voWfData.getNodeId();
    names[3]="compoName"; values[3]=compoName;
    names[4]="userId"; values[4]=userId;
    names[5]="strWfData"; values[5]= wfData;
    names[6]="direction"; values[6]= direction;
    retDoc = Info.requestData("appendExecutor", compoName, names, values, null);
    var flag = retDoc.getAttribute("success");
    if(retXml.text==="success"){
			 var funcName2 = "after_appendExecutor";
			 if (eval("typeof " + funcName2 + "==\"function\"")) {
				 f = eval(after_appendExecutor);
				 f(voWfData,"appendExecutor");
		   }
		   return "success";
		} else {
			alert("处理失败。  \n错误原因 ------ \n" + result);
			return "";
		}
}
}
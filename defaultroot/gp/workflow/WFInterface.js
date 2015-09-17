/* $Id: WFInterface.js,v 1.6 2008/07/14 01:26:50 wangbw Exp $ */
/*
Title: gp.workflow.WFInterface
Description:
WFInterface 类，用于封装工作流接口，内部接口和外部接口
Company: 用友政务
Author:chupp
*/

//----------------------------------------------------------------------
//声明页面中的全局对象
var	WFInterface= new WFInterface();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数
function WFInterface(){

  //常量声明区
  //AS_WF_TODO AS_WF_DONE 统一后用WFConst.js中的即可
  this.PROCESS_INST_ID= "PROCESS_INST_ID";
  this.NODE_ID= "WF_ACTIVITY_ID";

  //变量声明区
  this.oDataSourceFrame=window;   //private;

  //方法声明区
  //public;
  this.isWorkflowCompo= WFInterface_isWorkflowCompo;
  this.getWfData= WFInterface_getWfData;
  this.getWFPkInfo= WFInterface_getWFPkInfo;
  this.getWFFieldValue= WFInterface_getWFFieldValue;
  this.getWFState= WFInterface_getWFState;
  this.getWFVariable= WFInterface_getWFVariable;
  this.setWFVariable= WFInterface_setWFVariable;
  this.getDefaultAction= WFInterface_getDefaultAction;
  this.getDefaultNextExecutor= WFInterface_getDefaultNextExecutor;
  this.getExecutorsByRelation = WFInterface_getExecutorsByRelation;
  this.queryNodeWFState= WFInterface_queryNodeWFState;
  this.queryNextNodeWFState= WFInterface_queryNextNodeWFState;
  this.queryPreviewNodeWFState= WFInterface_queryPreviewNodeWFState;
  this.queryPreviousNodeFieldListValue= WFInterface_queryPreviousNodeFieldListValue;
  this.getWFMainTableName=WFInterface_getWFMainTableName;
  this.queryNodePageDataByStep= WFInterface_queryNodePageDataByStep;
  this.queryNodePageDataByNode= WFInterface_queryNodePageDataByNode;
  this.getExecutedNodeList= WFInterface_getExecutedNodeList;

  //获取或者设置工作流相关数据
  this.getTemplateId= WFInterface_getTemplateId;
  this.getNodeId= WFInterface_getNodeId;
  this.getInstanceId= WFInterface_getInstanceId;
  this.getTaskId= WFInterface_getTaskId;
  this.getNextExecutorId= WFInterface_getNextExecutorId;
  this.setNextExecutorId= WFInterface_setNextExecutorId;
  this.getNextExecutorName= WFInterface_getNextExecutorName;
  this.setNextExecutorName= WFInterface_setNextExecutorName;
  this.getDefaultNextExecutorId= WFInterface_getDefaultNextExecutorId;
  this.setDefaultNextExecutorId= WFInterface_setDefaultNextExecutorId;
  this.getDefaultNextExecutorName= WFInterface_getDefaultNextExecutorName;
  this.setDefaultNextExecutorName= WFInterface_setDefaultNextExecutorName;
  this.getNextExecutorAssId= WFInterface_getNextExecutorAssId;
  this.setNextExecutorAssId= WFInterface_setNextExecutorAssId;
  this.getNextExecutorAssName= WFInterface_getNextExecutorAssName;
  this.setNextExecutorAssName= WFInterface_setNextExecutorAssName;
  this.getAction= WFInterface_getAction;
  this.setAction= WFInterface_setAction;
  this.getComment= WFInterface_getComment;
  this.setComment= WFInterface_setComment;
  this.getCurrentExecutorId= WFInterface_getCurrentExecutorId;
  this.setCurrentExecutorId= WFInterface_setCurrentExecutorId;
  this.getCurrentExecutorName= WFInterface_getCurrentExecutorName;
  this.setCurrentExecutorName= WFInterface_setCurrentExecutorName;
  this.getInstanceName= WFInterface_getInstanceName;
  this.setInstanceName= WFInterface_setInstanceName;
  this.getInstanceStatus=WFInterface_getInstanceStatus;
  this.isInstanceFinish=WFInterface_isInstanceFinish;
  this.isInstanceInterrupt=WFInterface_isInstanceInterrupt;
  this.isInstanceActive=WFInterface_isInstanceActive;
  this.getWFSessionXml=WFInterface_getWFSessionXml;
  //for oa
  this.getExecutorsByResource = WFInterface_getExecutorsByResource;
  this.getRuntimeExecutor = WFInterface_getRuntimeExecutor;
  this.getFirstNode = WFInterface_getFirstNode;
}
//----------------------------------------------------------------------
//方法区
//----------------------------------------------------------------------
//public; 判断是否为工作流部件;
//返回值:是:true, 否则:false;
function WFInterface_isWorkflowCompo(){
  var voCompoMeta= DataTools.getCompoMeta();
  var vsTemplateIsUsed= voCompoMeta.getAttribute("iswfusedtemp");
  if (PF.isEmpty(vsTemplateIsUsed)||"false"==vsTemplateIsUsed)
      return false;
   return true;
}
//----------------------------------------------------------------------
//public; 获取页面的工作流相关数据;
//返回值:页面上工作流相关数据的对象;
function WFInterface_getWfData(isNew){
	if (isNew || _oWfData== null) {
		  var voWfData= new WFData();
	    voWfData.initWfData();
	    _oWfData= voWfData;	
	}
  return _oWfData;
}
//----------------------------------------------------------------------
//public; 返回部件能够启动的所有流程模板;
//返回值:成功:用','隔开的流程模板, 否则:""
//2006.04.06 cuiliguo  此方法已经移动到 Page4.js 中实现。
//function WFInterface_queryCompoEnableStartedTempate(sCompoId){
//  var vasNames= new Array();
//  var vasValues= new Array();
//  vasNames[0]= "compoId";
//  vasValues[0]=sCompoId;
//  var voRetRoot= Info.requestData("queryCompoEnableStartedTempate", "all", vasNames, vasValues);
//  if (voRetRoot== null) return "";
//  return voRetRoot.text;
//}
//----------------------------------------------------------------------
//public; 获取列表页面选中一行的工作流数据的主键信息;
//返回值:工作数据的主键信息;
function WFInterface_getWFPkInfo(iRowIndex){
  var vasPkInfo= new Array();
  var vsMainTableName= DataTools.getMainTableName();
  vasPkInfo[0] = getWFFieldValue(vsMainTableName, 
    iRowIndex,WFConst.WF_TEMPLATE_ID);
  vasPkInfo[1] = getWFFieldValue(vsMainTableName, 
    iRowIndex,WFConst.WF_INSTANCE_ID);
  if(!vasPkInfo[1]){
    vasPkInfo[1] = getWFFieldValue(vsMainTableName, 
      iRowIndex,WFConst.PROCESS_INST_ID_FIELD);
  }
  vasPkInfo[2] = getWFFieldValue(vsMainTableName, 
    iRowIndex,WFConst.NODE_ID);
  if(!vasPkInfo[2]){
    vasPkInfo[2] = getWFFieldValue(vsMainTableName, 
      iRowIndex,WFConst.WF_NODE_ID);
  }
  vasPkInfo[3] = getWFFieldValue(vsMainTableName, 
    iRowIndex,WFConst.WF_TASK_ID);
  return vasPkInfo;
}
function getWFFieldValue(vsTableName,iRowIndex,vsFieldName){
  if(DataTools.isValidField(vsTableName,vsFieldName)){
    return DataTools.getValue(vsTableName, iRowIndex, vsFieldName);
  }
  if(DataTools.isValidField(vsTableName,vsFieldName.toLowerCase)){
    return DataTools.getValue(vsTableName, iRowIndex, vsFieldName.toLowerCase);
  }
  return null;
}
//----------------------------------------------------------------------
//public; 获取一个工作流数据的值;
//返回值:存在:返回工作流数据的值;否则:null;
function WFInterface_getWFFieldValue(sFieldName){
  var voWfData= this.getWfData();
  return voWfData.oFieldMap.get(sFieldName);
}
//----------------------------------------------------------------------
//public; 获取工作流状态的值;
//返回值:成功:工作状态的值;失败:""
function WFInterface_getWFState(sStateName){
  var voWfData= this.getWfData();
  var vsStateValue= voWfData.getWFState(sStateName);
  return vsStateValue;
}
//----------------------------------------------------------------------
//public; 获取工作流变量的值;
//返回值:成功:工作流变量的值,失败:"";
function WFInterface_getWFVariable(sVarName){
  var voWfData= this.getWfData();
  var vsVarValue= voWfData.getWFVariable(sVarName);
  return vsVarValue;
}
//----------------------------------------------------------------------
//public; 设置工作流变量的值;
//返回值:void;
function WFInterface_setWFVariable(sVarName, sVarValue){
  var voWfData= this.getWfData();
  voWfData.setWFVariable(sVarName, sVarValue);
}
//----------------------------------------------------------------------
//public; 获取当前节点的默认流向;
//返回值:成功:默认流程, 失败:null;
function WFInterface_getDefaultAction(sTemplateId,sNodeId){
  var vsDefaultAction= "";
  var vasNames = new Array("templateId", "nodeId");
  var vasValues = new Array(sTemplateId, sNodeId);
  var voRetRoot= Info.requestData("queryDefaultActionName", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsDefaultAction= voRetRoot.text;
  else
    vsDefaultAction= null;
  return vsDefaultAction;
 }
//----------------------------------------------------------------------
//public; 得到默认的主办人;
//返回值:成功:默认的主办人, 失败:null;
function WFInterface_getDefaultNextExecutor(){
  var vsDefaultNextExecutor= "";
//  var vsPageData=WFInterface_getOldPageData();
  var vsCompoName = DataTools.getCompoName();
  var vsCompoData = DataTools.getTableDelta(DataTools.getMainTableName(vsCompoName), new Array("0"));
  vsCompoData = vsCompoData.replace("<delta>\n", "").replace("<delta>", "").replace("\n</delta>", "").replace("</delta>", "");
  vsCompoData = vsCompoData.replace("<entity>", "<entity name=\"" + vsCompoName + "\">");
  var vasNames= new Array("data", "sWfData","entityName");
  var vasValues= new Array(vsCompoData, this.getWfData().toString(true),DataTools.getCompoName());
  var voRetRoot= Info.requestData("queryDefaultNextExecutor", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsDefaultNextExecutor= voRetRoot.text;
  else
    vsDefaultNextExecutor= null;
  return vsDefaultNextExecutor;
 }
 function WFInterface_getExecutorsByRelation(action){
  var vsNextExecutor= "";
  var vsCompoName = DataTools.getCompoName();
  var vsCompoData = DataTools.getTableDelta(DataTools.getMainTableName(vsCompoName), new Array("0"));
  vsCompoData = vsCompoData.replace("<delta>\n", "").replace("<delta>", "").replace("\n</delta>", "").replace("</delta>", "");
  vsCompoData = vsCompoData.replace("<entity>", "<entity name=\"" + vsCompoName + "\">");
  var vasNames= new Array("data", "sWfData","entityName","action");
  var vasValues= new Array(vsCompoData, this.getWfData().toString(true),DataTools.getCompoName(),action);
  var voRetRoot= Info.requestData("getExecutorsByRelation", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsNextExecutor= voRetRoot.text;
  else
    vsNextExecutor= null;
  return vsNextExecutor;
 }
//----------------------------------------------------------------------
//private  临时的方法，等待服务端重构以后，即可删除。
function WFInterface_getOldPageData(){
	var voPageData=WFInterface_getPageData();

	var names = new Array();
	var values = new Array();
	var vsCompName =DataTools.getCompoName();
	names[0] = "pagedata";
	values[0] = voPageData;
	names[1] = "componame";
	values[1] = vsCompName;
	var voData = requestData("convertPageData", vsCompName, names, values);
	if(voData && voData.text)
		return voData.text;

}
//----------------------------------------------------------------------
/**
 *  *临时的方法，当服务端重构子后此方法将不需要
 * 获得页面数据 新数据格式（没有转换）
 */
function WFInterface_getPageData(){
	var voBuffer = new StringBuffer();
	var vsMainTable = DataTools.getMainTableName();
	voBuffer.append("<pagedata>");
	voBuffer.append(DataTools.getTableData(vsMainTable).xml);
	var vasTable2 = DataTools.getChildTableName(vsMainTable);
	var vsTable2 = null;
	var vasTable3;
	for(var i=0,j=vasTable2.length; i<j; i++){
		vsTable2 = vasTable2[i];
		if(DataTools.getTableData(vsTable2))
			voBuffer.append(DataTools.getTableData(vsTable2).xml);
		vasTable3= DataTools.getChildTableName(vsTable2);
		var vsTable3 = null;
		for(var m=0,n=vasTable3.length; m<n; m++){
			vsTable3 = vasTable3[m];
			if(DataTools.getTableData(vsTable3))
				voBuffer.append(DataTools.getTableData(vsTable3).xml);
		}
	}
	voBuffer.append("</pagedata>");
	//showMessage(voBuffer.toString());
	return voBuffer.toString();
}

//public; 获得工作流的状态值;
//返回值:成功:工作的状态值; 失败:null;
function WFInterface_queryNodeWFState(sNodeId,sStateName){
  var vsStateValue= "";
  var vasNames= new Array("nodeId", "wfStateName", "offset", "actionName");
  var vasValues= new Array(sNodeId, sStateName, 0, "");
  var voRetRoot= Info.requestData("queryWFState", "all", vasNames, vasValues);

  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsStateValue= voRetRoot.text;
  else
    vsStateValue= null;
  return vsStateValue;
}
//----------------------------------------------------------------------
//public; 查询下一个节点的工作流状态值;
//返回值:成功:工作流状态值; 失败:null;
function WFInterface_queryNextNodeWFState(sNodeId,sStateName,sActionName){
  var vsStateValue= "";
  var vasNames = new Array("nodeId", "wfStateName", "offset", "actionName");
  var vasValues = new Array(sNodeId, sStateName, 1, sActionName);
  var voRetRoot= Info.requestData("queryWFState", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsStateValue= voRetRoot.text;
  else
    vsStateValue= null;
  return vsStateValue;
}
//----------------------------------------------------------------------
//public; 查询前一个节点的工作流状态值;
//返回值:成功:工作流状态值, 失败:null;
function WFInterface_queryPreviewNodeWFState(sNodeId,sStateName){
  var vsStateValue= "";
  var vasNames= new Array("nodeId", "wfStateName", "offset", "actionName");
  var vasValues= new Array(sNodeId, sStateName, -1, "");
  var voRetRoot= Info.requestData("queryWFState", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsStateValue= voRetRoot.text;
  else
    vsStateValue= null;
  return vsStateValue;
}
//----------------------------------------------------------------------
//public; 查询前一个节点的业务数据;
//sFieldList:以逗号分割的字段名称;
//返回值:成功:前一个节点的业务数据,用逗号分隔的值列表 失败:null;
function WFInterface_queryPreviousNodeFieldListValue(sInstanceId,sCurNodeId,sFieldList){
  var vsFieldListValue= "";
  var vasNames = new Array("instanceId", "nodeId", "fieldNameList", "step");
  var vasValues = new Array(sInstanceId, sCurNodeId, sFieldList, 1);
  var voRetRoot= Info.requestData("queryPreviousNodeFieldListValue", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsFieldListValue= voRetRoot.text;
  else
    vsFieldListValue= null;
  return vsFieldListValue;
}
//----------------------------------------------------------------------
//public; 得到当前实例，当前节点的前iStep个节点的业务数据
//返回值:成功:前iStep个节点的业务数据, 失败:null;
function WFInterface_queryNodePageDataByStep(iStep){
  var vsPageData= null;
  if (!PF.isInt(iStep)) return vsPageData;
  var vsInstanceId= this.getInstanceId();
  var vsNodeId= this.getNodeId();
  if (!vsInstanceId || !vsNodeId) return vsPageData;

  var vasNames= new Array("instanceId", "nodeId", "step");
  var vasValues= new Array(vsInstanceId, vsNodeId, iStep);
  var voRetRoot= Info.requestData("queryPreviousNodePageData", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    vsPageData= voRetRoot.text;
  else{
    vsPageData= null;
    alert("内部错误!系统在获取历史数据时候出错，请于管理员联系!");
  }
  return vsPageData;
}
//----------------------------------------------------------------------
//public; 得到当前实例，指定节点环节的的业务数据
//返回值:成功:指定环节的业务数据, 如果为""空字符串表示数据没有任何变化，就和最新的业务数据一样。
//失败:null;
function WFInterface_queryNodePageDataByNode(sNodeId){
  var vsPageData= null;
  if (!PF.isInt(sNodeId)) return null
  var vsInstanceId= this.getInstanceId();
  if (!vsInstanceId || !sNodeId) return null

  var vasNames= new Array("instanceId", "nodeId","beforeModified");
  var vasValues= new Array(vsInstanceId, sNodeId,"false");
  var voRetRoot= Info.requestData("queryPreviousNodePageDataByNode", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success"))){
    vsPageData= voRetRoot.text;
	//(vsPageData=="")			vsPageData=DataTools.getDataXML();
  	}
  else{
   alert("内部错误!系统在获取历史数据时候出错，请于管理员联系!");
    vsPageData= null; 
  }
  return vsPageData;
}

//----------------------------------------------------------------------
//public; 获得当前实例中在某两个节点之间已经执行的节点列表
//sStartNode=-1:表示开始节点; sEndNode=-1:表示当前节点;
//返回值:成功：节点列表,用','隔开的, 失败:null;
function WFInterface_getExecutedNodeList(sStartNode, sEndNode){
  var voList= null;
  var vsInstanceId= this.getInstanceId();
  if (!sEndNode || !sStartNode || !vsInstanceId) return voList;
  var vasNames= new Array("instanceId", "startNode", "endNode");
  var vasValues= new Array(vsInstanceId, sStartNode, sEndNode);

  var voRetRoot= Info.requestData("queryExecutedNodeList", "all", vasNames, vasValues);
  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    voList= voRetRoot.text;
  else
    voList= null;

  return voList;
}
//----------------------------------------------------------------------
//public; 获取流程模板id;
//返回值:成功:流程模板id, 失败:null;
function WFInterface_getTemplateId(){
  var voWfData= this.getWfData();
  return voWfData.getTemplateId();
}
//----------------------------------------------------------------------
//public; 获取流程节点id;
//返回值:成功:流程节点id, 失败:null;
function WFInterface_getNodeId(){
  var voWfData= this.getWfData();
  return voWfData.getNodeId();
}
//----------------------------------------------------------------------
//public; 获取流程实例id;
//返回值:成功:流程实例id, 失败:null;
function WFInterface_getInstanceId(){
  var voWfData= this.getWfData();
  return voWfData.getInstanceId();
}
//----------------------------------------------------------------------
//public; 获取任务id;
//返回值:成功:任务id, 失败:null;
function WFInterface_getTaskId(){
  var voWfData= this.getWfData();
  return voWfData.getTaskId();
}
//----------------------------------------------------------------------
//public; 获取主办人id;
//返回值:主办人id;
function WFInterface_getNextExecutorId(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorId();
}
//----------------------------------------------------------------------
//public; 设置主办人id;
//返回值:void;
function WFInterface_setNextExecutorId(sNextExecutorId){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorId(sNextExecutorId);
}
//----------------------------------------------------------------------
//public; 获取主办人name;
//返回值: 主办人name;
function WFInterface_getNextExecutorName(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorName();
}
//----------------------------------------------------------------------
//public; 设置主办人name;
//返回值:void;
function WFInterface_setNextExecutorName(sNextExecutorName){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorName(sNextExecutorName);
}
//----------------------------------------------------------------------
//public; 获取默认主办人id;
//返回值:默认主办人id;
function WFInterface_getDefaultNextExecutorId(){
  var voWfData= this.getWfData();
  return voWfData.getDefaultNextExecutorId();
}
//----------------------------------------------------------------------
//public;设置默认主办人id;
//返回值:void;
function WFInterface_setDefaultNextExecutorId(sDefaultNextExecutorId){
  var voWfData= this.getWfData();
  voWfData.setDefaultNextExecutorId(sDefaultNextExecutorId);
}
//----------------------------------------------------------------------
//public; 获取默认主办人name;
//返回值:默认主办人name;
function WFInterface_getDefaultNextExecutorName(){
  var voWfData= this.getWfData();
  return voWfData.getDefaultNextExecutorName();
}
//----------------------------------------------------------------------
//public; 设置默认主办人name;
//返回值:void;
function WFInterface_setDefaultNextExecutorName(sDefaultNextExecutorName){
  var voWfData= this.getWfData();
  voWfData.setDefaultNextExecutorName(sDefaultNextExecutorName);
}
//----------------------------------------------------------------------
//public; 获取辅办人id;
//返回值:辅办人id;
function WFInterface_getNextExecutorAssId(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorAssId();
}
//----------------------------------------------------------------------
//public; 设置辅办人id;
//返回值:void;
function WFInterface_setNextExecutorAssId(sNextExecutorAssId){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorAssId(sNextExecutorAssId);
}
//----------------------------------------------------------------------
//public; 获取辅办人name;
//返回值:辅办人name;
function WFInterface_getNextExecutorAssName(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorAssName();
}
//----------------------------------------------------------------------
//public; 设置辅办人name;
//返回值:void;
function WFInterface_setNextExecutorAssName(sNextExecutorAssName){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorAssName(sNextExecutorAssName);
}
//----------------------------------------------------------------------
//public; 获取动作的名称;
//返回值:动作的名称;
function WFInterface_getAction(){
  var voWfData= this.getWfData();
  return voWfData.getAction();
}
//----------------------------------------------------------------------
//public; 设置动作的名称;
//返回值:void;
function WFInterface_setAction(sAction){
  var voWfData= this.getWfData();
  voWfData.setAction(sAction);
}
//----------------------------------------------------------------------
//public; 获取流程意见;
//返回值:流程意见;
function WFInterface_getComment(){
  var voWfData= this.getWfData();
  return voWfData.getComment();
}
//----------------------------------------------------------------------
//public; 设置流程意见;
//返回值:void;
function WFInterface_setComment(sComment){
  var voWfData= this.getWfData();
  voWfData.setComment(sComment);
}
//----------------------------------------------------------------------
//public; 获取当前执行者id;
//返回值:流程意见;
function WFInterface_getCurrentExecutorId(){
  var voWfData= this.getWfData();
  return voWfData.getCurrentExecutorId();
}
//----------------------------------------------------------------------
//public; 设置当前执行者id;
//返回值:流程意见;
function WFInterface_setCurrentExecutorId(sCurrentExecutorId){
  var voWfData= this.getWfData();
  voWfData.setCurrentExecutorId(sCurrentExecutorId);
}
//----------------------------------------------------------------------
//public; 获取当前执行者Name;
//返回值:流程意见;
function WFInterface_getCurrentExecutorName(){
  var voWfData= this.getWfData();
  return voWfData.getCurrentExecutorName();
}
//----------------------------------------------------------------------
//public; 设置当前执行者Name;
//返回值:流程意见;
function WFInterface_setCurrentExecutorName(sCurrentExecutorName){
  var voWfData= this.getWfData();
  voWfData.setCurrentExecutorName(sCurrentExecutorName);
}
//----------------------------------------------------------------------
//public; 获取实例名称;
//返回值:实例名称;
function WFInterface_getInstanceName(){
  var voWfData= this.getWfData();
 return voWfData.getInstanceName();
}
//----------------------------------------------------------------------
//public; 设置实例名称;
//返回值:void;
function WFInterface_setInstanceName(sInstanceName){
  var voWfData= this.getWfData();
  voWfData.setInstanceName(sInstanceName);
}
//----------------------------------------------------------------------
//public;获取工作流列表页面主表名。
function WFInterface_getWFMainTableName(){
  var voCompoMeta= DataTools.getCompoMeta();
  var vsMainTableName=null;
  var vsWfListType=voCompoMeta.getAttribute("wflisttype");
  if(!PF.isEmpty(vsWfListType)&&PageX.sPageType==PageX.PAGE_TYPE_LIST){
    if(vsWfListType==WFConst.WF_LIST_TYPE_TODO)
      vsMainTableName=WFConst.WF_MAINTABLE_TODO;
    else if(vsWfListType==WFConst.WF_LIST_TYPE_DONE)
      vsMainTableName=WFConst.WF_MAINTABLE_DONE;
    }
    return vsMainTableName;
}

//----------------------------------------------------------------------
//public;获取工作流制定流程实例的状态
function WFInterface_getInstanceStatus(sInstanceId){
  var result= "";
  var vasNames= new Array("sInstanceId");
  var vasValues= new Array(sInstanceId);
  var voRetRoot= Info.requestData("queryInstanceStatus", "all", vasNames, vasValues);

  if (voRetRoot && PF.parseBool(voRetRoot.getAttribute("success")))
    result= voRetRoot.text;
  else
    result= null;
  return result;	
}


//----------------------------------------------------------------------
//public;获取工作流指定流程实例是否结束
function WFInterface_isInstanceFinish(sInstanceId){
return (WFInterface_getInstanceStatus(sInstanceId)==WFConst.WF_INSTANCE_STATUS_FINISH);
}

//----------------------------------------------------------------------
//public;工作流指定流程实例是否是中止
function WFInterface_isInstanceInterrupt(sInstanceId){
return (WFInterface_getInstanceStatus(sInstanceId)==WFConst.WF_INSTANCE_STATUS_INTERRUPT);
}

//----------------------------------------------------------------------
//public;工作流指定流程实例是否是激活状态
function WFInterface_isInstanceActive(sInstanceId){
return (WFInterface_getInstanceStatus(sInstanceId)==WFConst.WF_INSTANCE_STATUS_ACTIVE);
}

function WFInterface_getWFSessionXml(){
  return window.document.all("WFSessionXml");
}
//for oa
function WFInterface_getExecutorsByResource(oWfData) {
  var templateId = oWfData.getTemplateId();
  var nodeId = oWfData.getNodeId();
  var action = oWfData.getAction();
  //var nd = 2007
  var vasNames= new Array("templateId", "nodeId","action","nd");
  var vasValues= new Array(templateId,nodeId,action,svNd);
  var res = Info.requestDataK("getNodeExecutorBySource", "all", vasNames, vasValues);
  return res;	
}

function WFInterface_getRuntimeExecutor(oWfData) {
  var templateId = oWfData.getTemplateId();
  var instanceId = oWfData.getInstanceId();
  var nodeId = oWfData.getNodeId();
  var action = oWfData.getAction();
  var vasNames = new Array("strTemplateId","strInstanceId","strNodeId","action");
  var vasValues = new Array(templateId,instanceId,nodeId,action);
  var res = Info.requestDataK("getRuntimeExecutor", "all", vasNames, vasValues);
  return  res;
}

function WFInterface_getFirstNode(compoId) {
	var names = ["compoId"];
	var values = [compoId];
	var xmlDoc = Info.requestData("getFirstNode","all",names,values);
	var flag = xmlDoc.getAttribute("success");
	var info = xmlDoc.text;
	var result = info.split(",");
	return result;
}

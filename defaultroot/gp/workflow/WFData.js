/* $Id: WFData.js,v 1.5 2008/05/13 04:48:54 liubo Exp $ */
/*
Title: gp.workflow.WFData
Description:
WFData 类，用于封装对页面工作流数据的访问.
Company: 用友政务
Author:chupp
*/

//----------------------------------------------------------------------
//声明页面中的全局对象
var _oWfData= null;
//----------------------------------------------------------------------
//类的声明，也是类的构造函数
function WFData(){
  //1.超类

  //2.常量声明区

  //3.变量声明区
  this.oDataSourceFrame= window;                 //private;
  this.oFieldMap= new Map();                     //private;

  //5.方法声明区
  //public;
  this.getWFDataXML= WFData_getWFDataXML;
  this.getWFDataDoc= WFData_getWFDataDoc;
  this.getTemplateId= WFData_getTemplateId;
  this.setTemplateId= WFData_setTemplateId;
  this.getNodeId= WFData_getNodeId;
  this.setNodeId= WFData_setNodeId;
  this.getInstanceId= WFData_getInstanceId;
  this.setInstanceId= WFData_setInstanceId;
  this.getTaskId= WFData_getTaskId;
  this.setTaskId= WFData_setTaskId;
  this.getNextExecutorId= WFData_getNextExecutorId;
  this.setNextExecutorId= WFData_setNextExecutorId;
  this.getNextExecutorName= WFData_getNextExecutorName;
  this.setNextExecutorName= WFData_setNextExecutorName;
  this.getDefaultNextExecutorId= WFData_getDefaultNextExecutorId;
  this.setDefaultNextExecutorId= WFData_setDefaultNextExecutorId;
  this.getDefaultNextExecutorName= WFData_getDefaultNextExecutorName;
  this.setDefaultNextExecutorName= WFData_setDefaultNextExecutorName;
  this.getNextExecutorAssId= WFData_getNextExecutorAssId;
  this.setNextExecutorAssId= WFData_setNextExecutorAssId;
  this.getNextExecutorAssName= WFData_getNextExecutorAssName;
  this.setNextExecutorAssName= WFData_setNextExecutorAssName;
  this.getAction= WFData_getAction;
  this.setAction= WFData_setAction;
  this.getPositionId= WFData_getPositionId;
  this.setPositionId= WFData_setPositionId;
  this.getComment= WFData_getComment;
  this.setComment= WFData_setComment;
  this.getCurrentExecutorId= WFData_getCurrentExecutorId;
  this.setCurrentExecutorId= WFData_setCurrentExecutorId;
  this.getCurrentExecutorName= WFData_getCurrentExecutorName;
  this.setCurrentExecutorName= WFData_setCurrentExecutorName;
  this.getNextTransferNodeId= WFData_getNextTransferNodeId;
  this.setNextTransferNodeId= WFData_setNextTransferNodeId;
  this.getNextGiveBackNodeId= WFData_getNextGiveBackNodeId;
  this.setNextGiveBackNodeId= WFData_setNextGiveBackNodeId;

  this.getIsBindCommit= WFData_getIsBindCommit;
  this.setIsBindCommit= WFData_setIsBindCommit;
  this.getNeedMessage= WFData_getNeedMessage;
  this.setNeedMessage= WFData_setNeedMessage;
  this.getNeedShortMessage= WFData_getNeedShortMessage;
  this.setNeedShortMessage= WFData_setNeedShortMessage;
  this.getNeedEmail= WFData_getNeedEmail;
  this.setNeedEmail= WFData_setNeedEmail;
  this.getInstanceName= WFData_getInstanceName;
  this.setInstanceName= WFData_setInstanceName;
  this.getWFVariable= WFData_getWFVariable;
  this.setWFVariable= WFData_setWFVariable;
  this.getWFState= WFData_getWFState;
  this.toString= WFData_toString;

  //private;
  this.getWFVariableNode= WFData_getWFVariableNode;
  this.getWFStateNode= WFData_getWFStateNode;
  this.fieldInMapToString= WFData_fieldInMapToString;
  this.variableToString= WFData_variableToString;
  this.initWfData= WFData_initWfData;
  this.initWfDataByXml = WfData_initWfDataByXml;
}
//----------------------------------------------------------------------
//6.方法区
//----------------------------------------------------------------------
//public; 获取页面上工作流数据的XML对象;
//返回值:成功: WFDataXML, 失败:null;
function WFData_getWFDataXML(){
	var doc = this.oDataSourceFrame.WFDataXML;
	if (doc == null) {
		doc = document.getElementById("WFDataXML");
	}
  	return doc;
}
//----------------------------------------------------------------------
//public; 获取页面上工作流数据的根节点对象;
//返回值:成功:WFData,失败:null
function WFData_getWFDataDoc(){//change by liubo
  var voWFDataXML = this.getWFDataXML();
  if (voWFDataXML == null) return null;
  var voWFDataDoc = null;
  if (voWFDataXML.nodeType == 9) {
  	voWFDataDoc = voWFDataXML.documentElement;
  } else {
  	voWFDataDoc = voWFDataXML.childNodes[0];
  }
  return voWFDataDoc;
}
//----------------------------------------------------------------------
//public; 获取流程模板id;
//返回值:成功:流程模板id, 失败:null;
function WFData_getTemplateId(){
  return this.oFieldMap.get(WFConst.WF_TEMPLATE_ID);
}
//----------------------------------------------------------------------
//public; 设置流程模板id;
//返回值:void;
function WFData_setTemplateId(sTemplateId){
  if (PF.isEmpty(sTemplateId)) return;
  this.oFieldMap.put(WFConst.WF_TEMPLATE_ID, sTemplateId);
}
//----------------------------------------------------------------------
//public; 获取流程节点id;
//返回值:成功:流程节点id, 失败:null;
function WFData_getNodeId(){
  return this.oFieldMap.get(WFConst.WF_NODE_ID);
}
//----------------------------------------------------------------------
//public; 设置流程节点id;
//返回值:void;
function WFData_setNodeId(sNodeId){
  if (PF.isEmpty(sNodeId)) return;
  this.oFieldMap.put(WFConst.WF_NODE_ID, sNodeId);
}
//----------------------------------------------------------------------
//public; 获取流程实例id;
//返回值:成功:流程实例id, 失败:null;
function WFData_getInstanceId(){
  return this.oFieldMap.get(WFConst.WF_INSTANCE_ID);
}
//----------------------------------------------------------------------
//public; 设置流程实例id;
//返回值:void;
function WFData_setInstanceId(sInstanceId){
  if (PF.isEmpty(sInstanceId)) return;
  this.oFieldMap.put(WFConst.WF_INSTANCE_ID, sInstanceId);
}
//----------------------------------------------------------------------
//public; 获取任务id;
//返回值:成功:任务id, 失败:null;
function WFData_getTaskId(){
  return this.oFieldMap.get(WFConst.WF_TASK_ID);
}
//----------------------------------------------------------------------
//public; 设置任务id;
//返回值:void;
function WFData_setTaskId(sTaskId){
  if (PF.isEmpty(sTaskId)) return;
  this.oFieldMap.put(WFConst.WF_TASK_ID, sTaskId);
}
//----------------------------------------------------------------------
//private; 获取工作流变量的节点; <WF_VARIABLE></WF_VARIABLE>
//返回值:成功:工作流变量的节点,失败:null;
function WFData_getWFVariableNode(){
  var voWFDataDoc= this.getWFDataDoc();
  if (voWFDataDoc== null) return null;
  var voVariableNode= voWFDataDoc.selectSingleNode(WFConst.WF_VARIABLE_NODE_ID);
  return voVariableNode;
}
//----------------------------------------------------------------------
//public; 获取工作流变量的值;
//返回值:成功:工作流变量的值,失败:"";
function WFData_getWFVariable(sVarName){
  var voVariableNode= this.getWFVariableNode();
  if (voVariableNode== null) return "";
  var voRowSetNode= voVariableNode.selectSingleNode("ROWSET");
  if (voRowSetNode== null) return "";
  var vsVarName= "";
  var vsVarValue= "";
  for (var i=0, len=voRowSetNode.childNodes.length; i<len; i++){
    vsVarName= voVariableNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "VARIABLE_NAME").text;
    if (vsVarName== sVarName){
       vsVarValue= voVariableNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "VARIABLE_VALUE").text;
       break;
    }
  }
  return vsVarValue;
}
//----------------------------------------------------------------------
//public; 设置工作流变量的值;
//返回值:void;
function WFData_setWFVariable(sVarName, sVarValue){
  var voVariableNode= this.getWFVariableNode();
  if (voVariableNode== null) return;
  var voRowSetNode= voVariableNode.selectSingleNode("ROWSET");
  if (voRowSetNode== null) return;
  var vsVarName= "";
  for (var i=0, len=voRowSetNode.childNodes.length; i<len; i++){
    vsVarName= voVariableNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "VARIABLE_NAME").text;
    if (vsVarName== sVarName){
       voVariableNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "VARIABLE_VALUE").text= sVarValue;
       break;
    }
  }
  return;
}
//----------------------------------------------------------------------
//private; 获取工作流状态数据的节点; <WF_STATE></WF_STATE>
//返回值:成功:工作流状态的节点, 失败:null;
function WFData_getWFStateNode(){
  var voWFDataDoc= this.getWFDataDoc();
  if (voWFDataDoc== null) return null;
  var voStateNode= voWFDataDoc.selectSingleNode(WFConst.WF_STATE_NODE_ID);
  return voStateNode;
}
//----------------------------------------------------------------------
//public; 获取工作流状态的值;
//返回值:成功:工作状态的值;失败:""
function WFData_getWFState(sStateName){
  var voStateNode= this.getWFStateNode();
  if (voStateNode== null) return "";
  var voRowSetNode= voStateNode.selectSingleNode("ROWSET");
  if (voRowSetNode== null) return "";
  var vsStateName= "";
  var vsStateValue= "";
  for (var i=0, len=voRowSetNode.childNodes.length; i<len; i++){
    vsStateName= voStateNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "STATE_NAME").text;
    if (vsStateName== sStateName){
       vsStateValue= voStateNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "STATE_VALUE").text;
       break;
    }
  }
  return vsStateValue;
}
//----------------------------------------------------------------------
//public; 获取主办人id;
//返回值:主办人id;
function WFData_getNextExecutorId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_ID);
}
//----------------------------------------------------------------------
//public; 设置主办人id;
//返回值:void;
function WFData_setNextExecutorId(sNextExecutorId){
  if (PF.isEmpty(sNextExecutorId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_ID, sNextExecutorId);
}
//----------------------------------------------------------------------
//public; 获取主办人name;
//返回值: 主办人name;
function WFData_getNextExecutorName(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_NAME);
}
//----------------------------------------------------------------------
//public; 设置主办人name;
//返回值:void;
function WFData_setNextExecutorName(sNextExecutorName){
  if (PF.isEmpty(sNextExecutorName)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_NAME, sNextExecutorName);
}
//----------------------------------------------------------------------
//public; 获取默认主办人id;
//返回值:默认主办人id;
function WFData_getDefaultNextExecutorId(){
  return this.oFieldMap.get(WFConst.WF_DEFAULT_NEXT_EXECUTOR_ID);
}
//----------------------------------------------------------------------
//public;设置默认主办人id;
//返回值:void;
function WFData_setDefaultNextExecutorId(sDefaultNextExecutorId){
  if (PF.isEmpty(sDefaultNextExecutorId)) return;
  this.oFieldMap.put(WFConst.WF_DEFAULT_NEXT_EXECUTOR_ID, sDefaultNextExecutorId);
}
//----------------------------------------------------------------------
//public; 获取默认主办人name;
//返回值:默认主办人name;
function WFData_getDefaultNextExecutorName(){
  return this.oFieldMap.get(WFConst.WF_DEFAULT_NEXT_EXECUTOR_NAME);
}
//----------------------------------------------------------------------
//public; 设置默认主办人name;
//返回值:void;
function WFData_setDefaultNextExecutorName(sDefaultNextExecutorName){
  if (PF.isEmpty(sDefaultNextExecutorName)) return;
  this.oFieldMap.put(WFConst.WF_DEFAULT_NEXT_EXECUTOR_NAME, sDefaultNextExecutorName);
}
//----------------------------------------------------------------------
//public; 获取辅办人id;
//返回值:辅办人id;
function WFData_getNextExecutorAssId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_ASS_ID);
}
//----------------------------------------------------------------------
//public; 设置辅办人id;
//返回值:void;
function WFData_setNextExecutorAssId(sNextExecutorAssId){
  if (PF.isEmpty(sNextExecutorAssId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_ASS_ID, sNextExecutorAssId);
}
//----------------------------------------------------------------------
//public; 获取辅办人name;
//返回值:辅办人name;
function WFData_getNextExecutorAssName(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_ASS_NAME);
}
//----------------------------------------------------------------------
//public; 设置辅办人name;
//返回值:void;
function WFData_setNextExecutorAssName(sNextExecutorAssName){
  if (PF.isEmpty(sNextExecutorAssName)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_ASS_NAME, sNextExecutorAssName);
}
//----------------------------------------------------------------------
//public; 获取动作的名称;
//返回值:动作的名称;
function WFData_getAction(){
  return this.oFieldMap.get(WFConst.WF_ACTION);
}
//----------------------------------------------------------------------
//public; 设置动作的名称;
//返回值:void;
function WFData_setAction(sAction){
  if (PF.isEmpty(sAction)) return;
  this.oFieldMap.put(WFConst.WF_ACTION, sAction);
}
//----------------------------------------------------------------------
//public; 获取职位id;
//返回值:职位id;
function WFData_getPositionId(){
  return this.oFieldMap.get(WFConst.WF_POSITION_ID);
}
//----------------------------------------------------------------------
//public; 设置职位id;
//返回值:void;
function WFData_setPositionId(sPositionId){
  if (PF.isEmpty(sPositionId)) return;
  this.oFieldMap.put(WFConst.WF_POSITION_ID, sPositionId);
}
//----------------------------------------------------------------------
//public; 获取流程意见;
//返回值:流程意见;
function WFData_getComment(){
  return this.oFieldMap.get(WFConst.WF_COMMENT);
}
//----------------------------------------------------------------------
//public; 设置流程意见;
//返回值:void;
function WFData_setComment(sComment){
  if (PF.isEmpty(sComment)) return;
  this.oFieldMap.put(WFConst.WF_COMMENT, sComment);
}
//----------------------------------------------------------------------
//public; 获取当前执行者id;
//返回值:流程意见;
function WFData_getCurrentExecutorId(){
  return this.oFieldMap.get(WFConst.WF_CURRENT_EXECUTOR_ID);
}
//----------------------------------------------------------------------
//public; 设置当前执行者id;
//返回值:流程意见;
function WFData_setCurrentExecutorId(sCurrentExecutorId){
  if (PF.isEmpty(sCurrentExecutorId)) return;
  this.oFieldMap.put(WFConst.WF_CURRENT_EXECUTOR_ID,sCurrentExecutorId);
}
//----------------------------------------------------------------------
//public; 获取当前执行者Name;
//返回值:流程意见;
function WFData_getCurrentExecutorName(){
  return this.oFieldMap.get(WFConst.WF_CURRENT_EXECUTOR_NAME);
}
//----------------------------------------------------------------------
//public; 设置当前执行者Name;
//返回值:流程意见;
function WFData_setCurrentExecutorName(sCurrentExecutorName){
  if (PF.isEmpty(sCurrentExecutorName)) return;
  this.oFieldMap.put(WFConst.WF_CURRENT_EXECUTOR_NAME,sCurrentExecutorName);
}
//----------------------------------------------------------------------
//public;
//返回值:
function WFData_getNextTransferNodeId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_TRANSFER_NODE_ID);
}
//----------------------------------------------------------------------
//public;
//返回值:
function WFData_setNextTransferNodeId(sNextTransferNodeId){
  if (PF.isEmpty(sNextTransferNodeId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_TRANSFER_NODE_ID,sNextTransferNodeId);
}
//----------------------------------------------------------------------
//public;
//返回值:
function WFData_getNextGiveBackNodeId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_GIVEBACK_NODE_ID);
}
//----------------------------------------------------------------------
//public;
//返回值:
function WFData_setNextGiveBackNodeId(sNextGiveBackNodeId){
  if (PF.isEmpty(sNextGiveBackNodeId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_GIVEBACK_NODE_ID,sNextGiveBackNodeId);
}
//----------------------------------------------------------------------
//public; 获取是否绑定提交;
//返回值:是否绑定提交;
function WFData_getIsBindCommit(){
  return this.oFieldMap.get(WFConst.WF_IS_BIND_COMMIT);
}
//----------------------------------------------------------------------
//public; 设置是否绑定提交;
//返回值:void;
function WFData_setIsBindCommit(tIsBindCommit){
  if (PF.isEmpty(tIsBindCommit)) return;
  this.oFieldMap.put(WFConst.WF_IS_BIND_COMMIT, tIsBindCommit);
}
//----------------------------------------------------------------------
//public; 获取是否需要消息通知;
//返回值:是否需要消息通知;
function WFData_getNeedMessage(){
  return this.oFieldMap.get(WFConst.WF_NEED_MESSAGE);
}
//----------------------------------------------------------------------
//public; 设置是否需要消息通知;
//返回值:void;
function WFData_setNeedMessage(tNeedMessage){
  if (PF.isEmpty(tNeedMessage)) return;
  this.oFieldMap.put(WFConst.WF_NEED_MESSAGE, tNeedMessage);
}
//----------------------------------------------------------------------
//public; 获取是否需要短消息通知;
//返回值:是否需要短消息通知;
function WFData_getNeedShortMessage(){
  return this.oFieldMap.get(WFConst.WF_NEED_SHORTMESSAGE);
}
//----------------------------------------------------------------------
//public; 设置是否需要短消息通知;
//返回值:void;
function WFData_setNeedShortMessage(tNeedShortMessage){
  if (PF.isEmpty(tNeedShortMessage)) return;
  this.oFieldMap.put(WFConst.WF_NEED_SHORTMESSAGE, tNeedShortMessage);
}
//----------------------------------------------------------------------
//public; 获取是否需要Email通知;
//返回值:是否需要Email通知;
function WFData_getNeedEmail(){
  return this.oFieldMap.get(WFConst.WF_NEED_EMAIL);
}
//----------------------------------------------------------------------
//public; 设置是否需要Email通知;
//返回值:void;
function WFData_setNeedEmail(tNeedEmail){
  if (PF.isEmpty(tNeedEmail)) return;
  this.oFieldMap.put(WFConst.WF_NEED_EMAIL, tNeedEmail);
}
//----------------------------------------------------------------------
//public; 获取实例名称;
//返回值:实例名称;
function WFData_getInstanceName(){
 return this.oFieldMap.get(WFConst.WF_INSTANCE_NAME);
}
//----------------------------------------------------------------------
//public; 设置实例名称;
//返回值:void;
function WFData_setInstanceName(sInstanceName){
  if (PF.isEmpty(sInstanceName)) return;
  this.oFieldMap.put(WFConst.WF_INSTANCE_NAME, sInstanceName);
}
//----------------------------------------------------------------------
//public; 将类中的工作流相关数据拼接为String;
//参数tNeedVarToString标识是否将工作流变量数据序列化; true:需要, false:不需要
//返回值: 拼接的工作流相关数据;
function WFData_toString(tNeedVarToString){
  var voBuf= new StringBuffer();
  var vsFieldString= this.fieldInMapToString();
  voBuf.append("<entity>\r\n");
  voBuf.append(vsFieldString);
  if (tNeedVarToString){
    var vsVariableString= this.variableToString();
    voBuf.append("  <entity name=\""+WFConst.WF_VARIABLE_NODE_ID+"\">\r\n");
    voBuf.append(vsVariableString);
    voBuf.append("  </entity>\r\n");
  }

  voBuf.append("</entity>");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 将类中的工作流相关数据的field拼接为String;
//返回值:拼接的工作流相关数据的field;
function WFData_fieldInMapToString(){
  var voFieldBuf= new StringBuffer();
  var vasFieldInMap= this.oFieldMap.getAllKey();
  if (vasFieldInMap != null) {
    var vsFieldName= "";
    var vsFieldValue= "";
    for (var i=0, len= vasFieldInMap.length; i<len; i++){
      vsFieldName= vasFieldInMap[i];
      vsFieldValue= this.oFieldMap.get(vsFieldName);
      vsFieldName = packSpecialChar(vsFieldName);
      vsFieldValue = packSpecialChar(vsFieldValue.toString());
      vsFieldValue = escapeLineBreak(vsFieldValue);
      voFieldBuf.append("<field name=\"" + vsFieldName + "\" value=\"" + vsFieldValue + "\"/>\r\n");
    }
  }
  return voFieldBuf.toString();
}
//----------------------------------------------------------------------
//private; 将类中的工作流变量数据拼接为String;
//返回值:拼接的工作流变量数据;
function WFData_variableToString(){
  var voVariableBuf= new StringBuffer();
  var voVariableNode= this.getWFVariableNode();
  if (voVariableNode!= null){
    var voRowSetNode= voVariableNode.selectSingleNode("ROWSET");
    if (voRowSetNode!= null){
      var vsVarId= "";
      var vsVarName= "";
      var vsVarValue= "";
        for (var i=0, len=voRowSetNode.childNodes.length; i<len; i++){
          vsVarId= voVariableNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "VARIABLE_ID").text;
          vsVarName= voVariableNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "VARIABLE_NAME").text;
          vsVarValue= voVariableNode.selectSingleNode("ROWSET/ROW["+ i+ "]/"+ "VARIABLE_VALUE").text;
          voVariableBuf.append("    <row>\r\n");
          voVariableBuf.append("      <entity>\r\n");
          voVariableBuf.append("        <field name=\"VariableId\" value=\""+ vsVarId+ "\" />\r\n ");
          voVariableBuf.append("        <field name=\"VariableName\" value=\""+ vsVarName+ "\" />\r\n");
          voVariableBuf.append("        <field name=\"VariableValue\" value=\""+ vsVarValue+ "\" />\r\n");
          voVariableBuf.append("      </entity>\r\n");
          voVariableBuf.append("    </row>\r\n");
        }
    }
  }
  return voVariableBuf.toString();
}
//----------------------------------------------------------------------
//private; 用页面上的数据初始化工作流数据的全局对象变量WFData;
//返回值: void;
function WFData_initWfData(){
  var voWfDataDoc= this.getWFDataDoc();
  var vsFieldName= "";
  var vsFieldValue= "";
  var voField= null;
  for (var i=0, len= voWfDataDoc.childNodes.length; i<len; i++){
    voField= voWfDataDoc.childNodes[i];
    vsFieldName= voField.nodeName;
    if (vsFieldName!= WFConst.WF_STATE_NODE_ID && vsFieldName!= WFConst.WF_VARIABLE_NODE_ID){
      vsFieldValue= voField.text;
      this.oFieldMap.put(vsFieldName, vsFieldValue);
    }
  }
	this.oFieldMap.put(WFConst.WF_CURRENT_EXECUTOR_ID,DataTools.getSV("svUserID"));
	this.oFieldMap.put(WFConst.WF_POSITION_ID,DataTools.getSV("svOrgPoCode"));
}
//----------------------------------------------------------------------
function WfData_initWfDataByXml(xml) {
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(xml);
	var voWfDataDoc= xmldom;
	var vsFieldName= "";
	var vsFieldValue= "";
	var voField= null;
	for (var i=0, len= voWfDataDoc.childNodes.length; i<len; i++){
		voField= voWfDataDoc.childNodes[i];
		vsFieldName= voField.nodeName;
		if (vsFieldName!= WFConst.WF_STATE_NODE_ID && vsFieldName!= WFConst.WF_VARIABLE_NODE_ID){
		  vsFieldValue= voField.text;
		  this.oFieldMap.put(vsFieldName, vsFieldValue);
		}
	}
	this.oFieldMap.put(WFConst.WF_CURRENT_EXECUTOR_ID,DataTools.getSV("svUserID"));
	this.oFieldMap.put(WFConst.WF_POSITION_ID,DataTools.getSV("svOrgPoCode"));
}
/* $Id: WFData.js,v 1.5 2008/05/13 04:48:54 liubo Exp $ */
/*
Title: gp.workflow.WFData
Description:
WFData �࣬���ڷ�װ��ҳ�湤�������ݵķ���.
Company: ��������
Author:chupp
*/

//----------------------------------------------------------------------
//����ҳ���е�ȫ�ֶ���
var _oWfData= null;
//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯��
function WFData(){
  //1.����

  //2.����������

  //3.����������
  this.oDataSourceFrame= window;                 //private;
  this.oFieldMap= new Map();                     //private;

  //5.����������
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
//6.������
//----------------------------------------------------------------------
//public; ��ȡҳ���Ϲ��������ݵ�XML����;
//����ֵ:�ɹ�: WFDataXML, ʧ��:null;
function WFData_getWFDataXML(){
	var doc = this.oDataSourceFrame.WFDataXML;
	if (doc == null) {
		doc = document.getElementById("WFDataXML");
	}
  	return doc;
}
//----------------------------------------------------------------------
//public; ��ȡҳ���Ϲ��������ݵĸ��ڵ����;
//����ֵ:�ɹ�:WFData,ʧ��:null
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
//public; ��ȡ����ģ��id;
//����ֵ:�ɹ�:����ģ��id, ʧ��:null;
function WFData_getTemplateId(){
  return this.oFieldMap.get(WFConst.WF_TEMPLATE_ID);
}
//----------------------------------------------------------------------
//public; ��������ģ��id;
//����ֵ:void;
function WFData_setTemplateId(sTemplateId){
  if (PF.isEmpty(sTemplateId)) return;
  this.oFieldMap.put(WFConst.WF_TEMPLATE_ID, sTemplateId);
}
//----------------------------------------------------------------------
//public; ��ȡ���̽ڵ�id;
//����ֵ:�ɹ�:���̽ڵ�id, ʧ��:null;
function WFData_getNodeId(){
  return this.oFieldMap.get(WFConst.WF_NODE_ID);
}
//----------------------------------------------------------------------
//public; �������̽ڵ�id;
//����ֵ:void;
function WFData_setNodeId(sNodeId){
  if (PF.isEmpty(sNodeId)) return;
  this.oFieldMap.put(WFConst.WF_NODE_ID, sNodeId);
}
//----------------------------------------------------------------------
//public; ��ȡ����ʵ��id;
//����ֵ:�ɹ�:����ʵ��id, ʧ��:null;
function WFData_getInstanceId(){
  return this.oFieldMap.get(WFConst.WF_INSTANCE_ID);
}
//----------------------------------------------------------------------
//public; ��������ʵ��id;
//����ֵ:void;
function WFData_setInstanceId(sInstanceId){
  if (PF.isEmpty(sInstanceId)) return;
  this.oFieldMap.put(WFConst.WF_INSTANCE_ID, sInstanceId);
}
//----------------------------------------------------------------------
//public; ��ȡ����id;
//����ֵ:�ɹ�:����id, ʧ��:null;
function WFData_getTaskId(){
  return this.oFieldMap.get(WFConst.WF_TASK_ID);
}
//----------------------------------------------------------------------
//public; ��������id;
//����ֵ:void;
function WFData_setTaskId(sTaskId){
  if (PF.isEmpty(sTaskId)) return;
  this.oFieldMap.put(WFConst.WF_TASK_ID, sTaskId);
}
//----------------------------------------------------------------------
//private; ��ȡ�����������Ľڵ�; <WF_VARIABLE></WF_VARIABLE>
//����ֵ:�ɹ�:�����������Ľڵ�,ʧ��:null;
function WFData_getWFVariableNode(){
  var voWFDataDoc= this.getWFDataDoc();
  if (voWFDataDoc== null) return null;
  var voVariableNode= voWFDataDoc.selectSingleNode(WFConst.WF_VARIABLE_NODE_ID);
  return voVariableNode;
}
//----------------------------------------------------------------------
//public; ��ȡ������������ֵ;
//����ֵ:�ɹ�:������������ֵ,ʧ��:"";
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
//public; ���ù�����������ֵ;
//����ֵ:void;
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
//private; ��ȡ������״̬���ݵĽڵ�; <WF_STATE></WF_STATE>
//����ֵ:�ɹ�:������״̬�Ľڵ�, ʧ��:null;
function WFData_getWFStateNode(){
  var voWFDataDoc= this.getWFDataDoc();
  if (voWFDataDoc== null) return null;
  var voStateNode= voWFDataDoc.selectSingleNode(WFConst.WF_STATE_NODE_ID);
  return voStateNode;
}
//----------------------------------------------------------------------
//public; ��ȡ������״̬��ֵ;
//����ֵ:�ɹ�:����״̬��ֵ;ʧ��:""
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
//public; ��ȡ������id;
//����ֵ:������id;
function WFData_getNextExecutorId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_ID);
}
//----------------------------------------------------------------------
//public; ����������id;
//����ֵ:void;
function WFData_setNextExecutorId(sNextExecutorId){
  if (PF.isEmpty(sNextExecutorId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_ID, sNextExecutorId);
}
//----------------------------------------------------------------------
//public; ��ȡ������name;
//����ֵ: ������name;
function WFData_getNextExecutorName(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_NAME);
}
//----------------------------------------------------------------------
//public; ����������name;
//����ֵ:void;
function WFData_setNextExecutorName(sNextExecutorName){
  if (PF.isEmpty(sNextExecutorName)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_NAME, sNextExecutorName);
}
//----------------------------------------------------------------------
//public; ��ȡĬ��������id;
//����ֵ:Ĭ��������id;
function WFData_getDefaultNextExecutorId(){
  return this.oFieldMap.get(WFConst.WF_DEFAULT_NEXT_EXECUTOR_ID);
}
//----------------------------------------------------------------------
//public;����Ĭ��������id;
//����ֵ:void;
function WFData_setDefaultNextExecutorId(sDefaultNextExecutorId){
  if (PF.isEmpty(sDefaultNextExecutorId)) return;
  this.oFieldMap.put(WFConst.WF_DEFAULT_NEXT_EXECUTOR_ID, sDefaultNextExecutorId);
}
//----------------------------------------------------------------------
//public; ��ȡĬ��������name;
//����ֵ:Ĭ��������name;
function WFData_getDefaultNextExecutorName(){
  return this.oFieldMap.get(WFConst.WF_DEFAULT_NEXT_EXECUTOR_NAME);
}
//----------------------------------------------------------------------
//public; ����Ĭ��������name;
//����ֵ:void;
function WFData_setDefaultNextExecutorName(sDefaultNextExecutorName){
  if (PF.isEmpty(sDefaultNextExecutorName)) return;
  this.oFieldMap.put(WFConst.WF_DEFAULT_NEXT_EXECUTOR_NAME, sDefaultNextExecutorName);
}
//----------------------------------------------------------------------
//public; ��ȡ������id;
//����ֵ:������id;
function WFData_getNextExecutorAssId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_ASS_ID);
}
//----------------------------------------------------------------------
//public; ���ø�����id;
//����ֵ:void;
function WFData_setNextExecutorAssId(sNextExecutorAssId){
  if (PF.isEmpty(sNextExecutorAssId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_ASS_ID, sNextExecutorAssId);
}
//----------------------------------------------------------------------
//public; ��ȡ������name;
//����ֵ:������name;
function WFData_getNextExecutorAssName(){
  return this.oFieldMap.get(WFConst.WF_NEXT_EXECUTOR_ASS_NAME);
}
//----------------------------------------------------------------------
//public; ���ø�����name;
//����ֵ:void;
function WFData_setNextExecutorAssName(sNextExecutorAssName){
  if (PF.isEmpty(sNextExecutorAssName)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_EXECUTOR_ASS_NAME, sNextExecutorAssName);
}
//----------------------------------------------------------------------
//public; ��ȡ����������;
//����ֵ:����������;
function WFData_getAction(){
  return this.oFieldMap.get(WFConst.WF_ACTION);
}
//----------------------------------------------------------------------
//public; ���ö���������;
//����ֵ:void;
function WFData_setAction(sAction){
  if (PF.isEmpty(sAction)) return;
  this.oFieldMap.put(WFConst.WF_ACTION, sAction);
}
//----------------------------------------------------------------------
//public; ��ȡְλid;
//����ֵ:ְλid;
function WFData_getPositionId(){
  return this.oFieldMap.get(WFConst.WF_POSITION_ID);
}
//----------------------------------------------------------------------
//public; ����ְλid;
//����ֵ:void;
function WFData_setPositionId(sPositionId){
  if (PF.isEmpty(sPositionId)) return;
  this.oFieldMap.put(WFConst.WF_POSITION_ID, sPositionId);
}
//----------------------------------------------------------------------
//public; ��ȡ�������;
//����ֵ:�������;
function WFData_getComment(){
  return this.oFieldMap.get(WFConst.WF_COMMENT);
}
//----------------------------------------------------------------------
//public; �����������;
//����ֵ:void;
function WFData_setComment(sComment){
  if (PF.isEmpty(sComment)) return;
  this.oFieldMap.put(WFConst.WF_COMMENT, sComment);
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰִ����id;
//����ֵ:�������;
function WFData_getCurrentExecutorId(){
  return this.oFieldMap.get(WFConst.WF_CURRENT_EXECUTOR_ID);
}
//----------------------------------------------------------------------
//public; ���õ�ǰִ����id;
//����ֵ:�������;
function WFData_setCurrentExecutorId(sCurrentExecutorId){
  if (PF.isEmpty(sCurrentExecutorId)) return;
  this.oFieldMap.put(WFConst.WF_CURRENT_EXECUTOR_ID,sCurrentExecutorId);
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰִ����Name;
//����ֵ:�������;
function WFData_getCurrentExecutorName(){
  return this.oFieldMap.get(WFConst.WF_CURRENT_EXECUTOR_NAME);
}
//----------------------------------------------------------------------
//public; ���õ�ǰִ����Name;
//����ֵ:�������;
function WFData_setCurrentExecutorName(sCurrentExecutorName){
  if (PF.isEmpty(sCurrentExecutorName)) return;
  this.oFieldMap.put(WFConst.WF_CURRENT_EXECUTOR_NAME,sCurrentExecutorName);
}
//----------------------------------------------------------------------
//public;
//����ֵ:
function WFData_getNextTransferNodeId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_TRANSFER_NODE_ID);
}
//----------------------------------------------------------------------
//public;
//����ֵ:
function WFData_setNextTransferNodeId(sNextTransferNodeId){
  if (PF.isEmpty(sNextTransferNodeId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_TRANSFER_NODE_ID,sNextTransferNodeId);
}
//----------------------------------------------------------------------
//public;
//����ֵ:
function WFData_getNextGiveBackNodeId(){
  return this.oFieldMap.get(WFConst.WF_NEXT_GIVEBACK_NODE_ID);
}
//----------------------------------------------------------------------
//public;
//����ֵ:
function WFData_setNextGiveBackNodeId(sNextGiveBackNodeId){
  if (PF.isEmpty(sNextGiveBackNodeId)) return;
  this.oFieldMap.put(WFConst.WF_NEXT_GIVEBACK_NODE_ID,sNextGiveBackNodeId);
}
//----------------------------------------------------------------------
//public; ��ȡ�Ƿ���ύ;
//����ֵ:�Ƿ���ύ;
function WFData_getIsBindCommit(){
  return this.oFieldMap.get(WFConst.WF_IS_BIND_COMMIT);
}
//----------------------------------------------------------------------
//public; �����Ƿ���ύ;
//����ֵ:void;
function WFData_setIsBindCommit(tIsBindCommit){
  if (PF.isEmpty(tIsBindCommit)) return;
  this.oFieldMap.put(WFConst.WF_IS_BIND_COMMIT, tIsBindCommit);
}
//----------------------------------------------------------------------
//public; ��ȡ�Ƿ���Ҫ��Ϣ֪ͨ;
//����ֵ:�Ƿ���Ҫ��Ϣ֪ͨ;
function WFData_getNeedMessage(){
  return this.oFieldMap.get(WFConst.WF_NEED_MESSAGE);
}
//----------------------------------------------------------------------
//public; �����Ƿ���Ҫ��Ϣ֪ͨ;
//����ֵ:void;
function WFData_setNeedMessage(tNeedMessage){
  if (PF.isEmpty(tNeedMessage)) return;
  this.oFieldMap.put(WFConst.WF_NEED_MESSAGE, tNeedMessage);
}
//----------------------------------------------------------------------
//public; ��ȡ�Ƿ���Ҫ����Ϣ֪ͨ;
//����ֵ:�Ƿ���Ҫ����Ϣ֪ͨ;
function WFData_getNeedShortMessage(){
  return this.oFieldMap.get(WFConst.WF_NEED_SHORTMESSAGE);
}
//----------------------------------------------------------------------
//public; �����Ƿ���Ҫ����Ϣ֪ͨ;
//����ֵ:void;
function WFData_setNeedShortMessage(tNeedShortMessage){
  if (PF.isEmpty(tNeedShortMessage)) return;
  this.oFieldMap.put(WFConst.WF_NEED_SHORTMESSAGE, tNeedShortMessage);
}
//----------------------------------------------------------------------
//public; ��ȡ�Ƿ���ҪEmail֪ͨ;
//����ֵ:�Ƿ���ҪEmail֪ͨ;
function WFData_getNeedEmail(){
  return this.oFieldMap.get(WFConst.WF_NEED_EMAIL);
}
//----------------------------------------------------------------------
//public; �����Ƿ���ҪEmail֪ͨ;
//����ֵ:void;
function WFData_setNeedEmail(tNeedEmail){
  if (PF.isEmpty(tNeedEmail)) return;
  this.oFieldMap.put(WFConst.WF_NEED_EMAIL, tNeedEmail);
}
//----------------------------------------------------------------------
//public; ��ȡʵ������;
//����ֵ:ʵ������;
function WFData_getInstanceName(){
 return this.oFieldMap.get(WFConst.WF_INSTANCE_NAME);
}
//----------------------------------------------------------------------
//public; ����ʵ������;
//����ֵ:void;
function WFData_setInstanceName(sInstanceName){
  if (PF.isEmpty(sInstanceName)) return;
  this.oFieldMap.put(WFConst.WF_INSTANCE_NAME, sInstanceName);
}
//----------------------------------------------------------------------
//public; �����еĹ������������ƴ��ΪString;
//����tNeedVarToString��ʶ�Ƿ񽫹����������������л�; true:��Ҫ, false:����Ҫ
//����ֵ: ƴ�ӵĹ������������;
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
//private; �����еĹ�����������ݵ�fieldƴ��ΪString;
//����ֵ:ƴ�ӵĹ�����������ݵ�field;
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
//private; �����еĹ�������������ƴ��ΪString;
//����ֵ:ƴ�ӵĹ�������������;
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
//private; ��ҳ���ϵ����ݳ�ʼ�����������ݵ�ȫ�ֶ������WFData;
//����ֵ: void;
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
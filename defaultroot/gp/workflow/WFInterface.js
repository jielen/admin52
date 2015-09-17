/* $Id: WFInterface.js,v 1.6 2008/07/14 01:26:50 wangbw Exp $ */
/*
Title: gp.workflow.WFInterface
Description:
WFInterface �࣬���ڷ�װ�������ӿڣ��ڲ��ӿں��ⲿ�ӿ�
Company: ��������
Author:chupp
*/

//----------------------------------------------------------------------
//����ҳ���е�ȫ�ֶ���
var	WFInterface= new WFInterface();
//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯��
function WFInterface(){

  //����������
  //AS_WF_TODO AS_WF_DONE ͳһ����WFConst.js�еļ���
  this.PROCESS_INST_ID= "PROCESS_INST_ID";
  this.NODE_ID= "WF_ACTIVITY_ID";

  //����������
  this.oDataSourceFrame=window;   //private;

  //����������
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

  //��ȡ�������ù������������
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
//������
//----------------------------------------------------------------------
//public; �ж��Ƿ�Ϊ����������;
//����ֵ:��:true, ����:false;
function WFInterface_isWorkflowCompo(){
  var voCompoMeta= DataTools.getCompoMeta();
  var vsTemplateIsUsed= voCompoMeta.getAttribute("iswfusedtemp");
  if (PF.isEmpty(vsTemplateIsUsed)||"false"==vsTemplateIsUsed)
      return false;
   return true;
}
//----------------------------------------------------------------------
//public; ��ȡҳ��Ĺ������������;
//����ֵ:ҳ���Ϲ�����������ݵĶ���;
function WFInterface_getWfData(isNew){
	if (isNew || _oWfData== null) {
		  var voWfData= new WFData();
	    voWfData.initWfData();
	    _oWfData= voWfData;	
	}
  return _oWfData;
}
//----------------------------------------------------------------------
//public; ���ز����ܹ���������������ģ��;
//����ֵ:�ɹ�:��','����������ģ��, ����:""
//2006.04.06 cuiliguo  �˷����Ѿ��ƶ��� Page4.js ��ʵ�֡�
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
//public; ��ȡ�б�ҳ��ѡ��һ�еĹ��������ݵ�������Ϣ;
//����ֵ:�������ݵ�������Ϣ;
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
//public; ��ȡһ�����������ݵ�ֵ;
//����ֵ:����:���ع��������ݵ�ֵ;����:null;
function WFInterface_getWFFieldValue(sFieldName){
  var voWfData= this.getWfData();
  return voWfData.oFieldMap.get(sFieldName);
}
//----------------------------------------------------------------------
//public; ��ȡ������״̬��ֵ;
//����ֵ:�ɹ�:����״̬��ֵ;ʧ��:""
function WFInterface_getWFState(sStateName){
  var voWfData= this.getWfData();
  var vsStateValue= voWfData.getWFState(sStateName);
  return vsStateValue;
}
//----------------------------------------------------------------------
//public; ��ȡ������������ֵ;
//����ֵ:�ɹ�:������������ֵ,ʧ��:"";
function WFInterface_getWFVariable(sVarName){
  var voWfData= this.getWfData();
  var vsVarValue= voWfData.getWFVariable(sVarName);
  return vsVarValue;
}
//----------------------------------------------------------------------
//public; ���ù�����������ֵ;
//����ֵ:void;
function WFInterface_setWFVariable(sVarName, sVarValue){
  var voWfData= this.getWfData();
  voWfData.setWFVariable(sVarName, sVarValue);
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰ�ڵ��Ĭ������;
//����ֵ:�ɹ�:Ĭ������, ʧ��:null;
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
//public; �õ�Ĭ�ϵ�������;
//����ֵ:�ɹ�:Ĭ�ϵ�������, ʧ��:null;
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
//private  ��ʱ�ķ������ȴ�������ع��Ժ󣬼���ɾ����
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
 *  *��ʱ�ķ�������������ع��Ӻ�˷���������Ҫ
 * ���ҳ������ �����ݸ�ʽ��û��ת����
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

//public; ��ù�������״ֵ̬;
//����ֵ:�ɹ�:������״ֵ̬; ʧ��:null;
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
//public; ��ѯ��һ���ڵ�Ĺ�����״ֵ̬;
//����ֵ:�ɹ�:������״ֵ̬; ʧ��:null;
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
//public; ��ѯǰһ���ڵ�Ĺ�����״ֵ̬;
//����ֵ:�ɹ�:������״ֵ̬, ʧ��:null;
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
//public; ��ѯǰһ���ڵ��ҵ������;
//sFieldList:�Զ��ŷָ���ֶ�����;
//����ֵ:�ɹ�:ǰһ���ڵ��ҵ������,�ö��ŷָ���ֵ�б� ʧ��:null;
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
//public; �õ���ǰʵ������ǰ�ڵ��ǰiStep���ڵ��ҵ������
//����ֵ:�ɹ�:ǰiStep���ڵ��ҵ������, ʧ��:null;
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
    alert("�ڲ�����!ϵͳ�ڻ�ȡ��ʷ����ʱ��������ڹ���Ա��ϵ!");
  }
  return vsPageData;
}
//----------------------------------------------------------------------
//public; �õ���ǰʵ����ָ���ڵ㻷�ڵĵ�ҵ������
//����ֵ:�ɹ�:ָ�����ڵ�ҵ������, ���Ϊ""���ַ�����ʾ����û���κα仯���ͺ����µ�ҵ������һ����
//ʧ��:null;
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
   alert("�ڲ�����!ϵͳ�ڻ�ȡ��ʷ����ʱ��������ڹ���Ա��ϵ!");
    vsPageData= null; 
  }
  return vsPageData;
}

//----------------------------------------------------------------------
//public; ��õ�ǰʵ������ĳ�����ڵ�֮���Ѿ�ִ�еĽڵ��б�
//sStartNode=-1:��ʾ��ʼ�ڵ�; sEndNode=-1:��ʾ��ǰ�ڵ�;
//����ֵ:�ɹ����ڵ��б�,��','������, ʧ��:null;
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
//public; ��ȡ����ģ��id;
//����ֵ:�ɹ�:����ģ��id, ʧ��:null;
function WFInterface_getTemplateId(){
  var voWfData= this.getWfData();
  return voWfData.getTemplateId();
}
//----------------------------------------------------------------------
//public; ��ȡ���̽ڵ�id;
//����ֵ:�ɹ�:���̽ڵ�id, ʧ��:null;
function WFInterface_getNodeId(){
  var voWfData= this.getWfData();
  return voWfData.getNodeId();
}
//----------------------------------------------------------------------
//public; ��ȡ����ʵ��id;
//����ֵ:�ɹ�:����ʵ��id, ʧ��:null;
function WFInterface_getInstanceId(){
  var voWfData= this.getWfData();
  return voWfData.getInstanceId();
}
//----------------------------------------------------------------------
//public; ��ȡ����id;
//����ֵ:�ɹ�:����id, ʧ��:null;
function WFInterface_getTaskId(){
  var voWfData= this.getWfData();
  return voWfData.getTaskId();
}
//----------------------------------------------------------------------
//public; ��ȡ������id;
//����ֵ:������id;
function WFInterface_getNextExecutorId(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorId();
}
//----------------------------------------------------------------------
//public; ����������id;
//����ֵ:void;
function WFInterface_setNextExecutorId(sNextExecutorId){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorId(sNextExecutorId);
}
//----------------------------------------------------------------------
//public; ��ȡ������name;
//����ֵ: ������name;
function WFInterface_getNextExecutorName(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorName();
}
//----------------------------------------------------------------------
//public; ����������name;
//����ֵ:void;
function WFInterface_setNextExecutorName(sNextExecutorName){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorName(sNextExecutorName);
}
//----------------------------------------------------------------------
//public; ��ȡĬ��������id;
//����ֵ:Ĭ��������id;
function WFInterface_getDefaultNextExecutorId(){
  var voWfData= this.getWfData();
  return voWfData.getDefaultNextExecutorId();
}
//----------------------------------------------------------------------
//public;����Ĭ��������id;
//����ֵ:void;
function WFInterface_setDefaultNextExecutorId(sDefaultNextExecutorId){
  var voWfData= this.getWfData();
  voWfData.setDefaultNextExecutorId(sDefaultNextExecutorId);
}
//----------------------------------------------------------------------
//public; ��ȡĬ��������name;
//����ֵ:Ĭ��������name;
function WFInterface_getDefaultNextExecutorName(){
  var voWfData= this.getWfData();
  return voWfData.getDefaultNextExecutorName();
}
//----------------------------------------------------------------------
//public; ����Ĭ��������name;
//����ֵ:void;
function WFInterface_setDefaultNextExecutorName(sDefaultNextExecutorName){
  var voWfData= this.getWfData();
  voWfData.setDefaultNextExecutorName(sDefaultNextExecutorName);
}
//----------------------------------------------------------------------
//public; ��ȡ������id;
//����ֵ:������id;
function WFInterface_getNextExecutorAssId(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorAssId();
}
//----------------------------------------------------------------------
//public; ���ø�����id;
//����ֵ:void;
function WFInterface_setNextExecutorAssId(sNextExecutorAssId){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorAssId(sNextExecutorAssId);
}
//----------------------------------------------------------------------
//public; ��ȡ������name;
//����ֵ:������name;
function WFInterface_getNextExecutorAssName(){
  var voWfData= this.getWfData();
  return voWfData.getNextExecutorAssName();
}
//----------------------------------------------------------------------
//public; ���ø�����name;
//����ֵ:void;
function WFInterface_setNextExecutorAssName(sNextExecutorAssName){
  var voWfData= this.getWfData();
  voWfData.setNextExecutorAssName(sNextExecutorAssName);
}
//----------------------------------------------------------------------
//public; ��ȡ����������;
//����ֵ:����������;
function WFInterface_getAction(){
  var voWfData= this.getWfData();
  return voWfData.getAction();
}
//----------------------------------------------------------------------
//public; ���ö���������;
//����ֵ:void;
function WFInterface_setAction(sAction){
  var voWfData= this.getWfData();
  voWfData.setAction(sAction);
}
//----------------------------------------------------------------------
//public; ��ȡ�������;
//����ֵ:�������;
function WFInterface_getComment(){
  var voWfData= this.getWfData();
  return voWfData.getComment();
}
//----------------------------------------------------------------------
//public; �����������;
//����ֵ:void;
function WFInterface_setComment(sComment){
  var voWfData= this.getWfData();
  voWfData.setComment(sComment);
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰִ����id;
//����ֵ:�������;
function WFInterface_getCurrentExecutorId(){
  var voWfData= this.getWfData();
  return voWfData.getCurrentExecutorId();
}
//----------------------------------------------------------------------
//public; ���õ�ǰִ����id;
//����ֵ:�������;
function WFInterface_setCurrentExecutorId(sCurrentExecutorId){
  var voWfData= this.getWfData();
  voWfData.setCurrentExecutorId(sCurrentExecutorId);
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰִ����Name;
//����ֵ:�������;
function WFInterface_getCurrentExecutorName(){
  var voWfData= this.getWfData();
  return voWfData.getCurrentExecutorName();
}
//----------------------------------------------------------------------
//public; ���õ�ǰִ����Name;
//����ֵ:�������;
function WFInterface_setCurrentExecutorName(sCurrentExecutorName){
  var voWfData= this.getWfData();
  voWfData.setCurrentExecutorName(sCurrentExecutorName);
}
//----------------------------------------------------------------------
//public; ��ȡʵ������;
//����ֵ:ʵ������;
function WFInterface_getInstanceName(){
  var voWfData= this.getWfData();
 return voWfData.getInstanceName();
}
//----------------------------------------------------------------------
//public; ����ʵ������;
//����ֵ:void;
function WFInterface_setInstanceName(sInstanceName){
  var voWfData= this.getWfData();
  voWfData.setInstanceName(sInstanceName);
}
//----------------------------------------------------------------------
//public;��ȡ�������б�ҳ����������
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
//public;��ȡ�������ƶ�����ʵ����״̬
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
//public;��ȡ������ָ������ʵ���Ƿ����
function WFInterface_isInstanceFinish(sInstanceId){
return (WFInterface_getInstanceStatus(sInstanceId)==WFConst.WF_INSTANCE_STATUS_FINISH);
}

//----------------------------------------------------------------------
//public;������ָ������ʵ���Ƿ�����ֹ
function WFInterface_isInstanceInterrupt(sInstanceId){
return (WFInterface_getInstanceStatus(sInstanceId)==WFConst.WF_INSTANCE_STATUS_INTERRUPT);
}

//----------------------------------------------------------------------
//public;������ָ������ʵ���Ƿ��Ǽ���״̬
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

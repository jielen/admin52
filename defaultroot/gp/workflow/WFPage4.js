/*
Title: gp.workflow.WFPage4
Description:
WFPage4 :���й�����ҳ��Ĺ���.
Company: ��������
Author:chupp,zhangcheng
*/

//----------------------------------------------------------------------
//����ҳ���е�ȫ�ֶ���

//alert("wfpage4 init");
//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯��
function WFPage4(){
  //1.����
  Page4.call(this);
  //2.����������
  this.CLASSNAME= "gp.page.WFPage4";

  //3.����������

  //5.����������
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
  
  //4.�¼������� =function();
  //���� Before ����¼����ǿ��Ե��� abortEvent(true) ����������ֹ��.
  this.OnBeforeShowWFOptionDialog= "OnBeforeShowWFOptionDialog";                        //����: oSender;
  this.OnAfterShowWFOptionDialog= "OnAfterShowWFOptionDialog";                    //����: oSender;
  this.OnBeforeCommit= "OnBeforeCommit";                        //����: oSender;
  this.OnAfterCommit= "OnAfterCommit";                    //����: oSender;

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
//6.������
//----------------------------------------------------------------------
//public; ���������µ�;
//ֻ���·�ʽ�µ� edit ҳ����Ч;
//�б�ҳ���������õ�ʱopenBill();
//����ֵ: �ɹ�: true; ����: false;

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
//public; �򿪹������༭ҳ��;
//����ֵ: �ɹ�: true; ����: false;

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
    alert("��û������������Ϣ,���ܴ򿪱༭ҳ��.\ntable: "+ sTableName);
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
//public; �򿪹������༭ҳ��;�б�ҳ�����������õ�Ҳ���������
//����ֵ: �ɹ�: true; ����: false;

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
//public; �����������༭ҳ���ɾ������;
//����ֵ: �ɹ�:true, ʧ��:false;
/*���������ƶ���Page4.js��ʵ�֡�
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
      alert("ɾ���ɹ��������رմ˴��ڣ�");
      //if (window.top == window)
    //    window.close();
      return true;
  }

  else {
     alert("ɾ��ʧ�ܣ�");
     return false;
  }
}*/
//----------------------------------------------------------------------
//private; ��ɾ����֮ǰ���������ж�,�Ƿ��ܹ�ɾ��;
//����ֵ: true:����ɾ��, false:��ɾ��;
function WFPage4_checkBeforeDeleteBill(){
  if (!WFInterface.isWorkflowCompo()) return false;
  //ע���������ڱ༭ҳ��ɾ��
  //if (this.sPageLayout!= this.PAGE_LAYOUT_FREE) return false;
  if (this.sPageType!= this.PAGE_TYPE_EDIT) return false;

  var voWfData= WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  if (PF.isEmpty(vsInstanceId)) return false;
  //ע���ظ�ѯ��
  //if(!confirm("ȷ��Ҫɾ���𣿵�ǰ���̵����д������˺��Ѱ����˶�����ɾ����")) return false;
  return true;
}
//----------------------------------------------------------------------
//public; ����ӿ�Ŀǰ���ú�WFPage4_saveBillһ��
//����Page4.js�б�������������汾,����Ҫʵ���������.
//����ֵ: �ɹ�: true; ����: false;
/*���������ƶ���Page4.js��ʵ�֡�
function WFPage4_saveBillK(sFunction, asName, asValue, isCheckEmpty, oResourceMap){
WFPage4_saveBill();
}*/
//----------------------------------------------------------------------
//public; ���湤��������;
//����ֵ: �ɹ�: true; ����: false;
/*���������ƶ���Page4.js��ʵ�֡�
function WFPage4_saveBill(){
  if (!WFInterface.isWorkflowCompo()) return false;
  if (this.isChanged()== false) return false;

  var voWfData= WFInterface.getWfData();
  if (!voWfData.getTemplateId()) {
    alert("����δ���ù�����ģ�壬���ܼ������б��棡");
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
    alert("���淵��ֵΪ:null,���ܱ���ʱ�����쳣.");
    return false;
  }
  var vtSuccess= PF.parseBool(voRetRoot.getAttribute("success"));
  if (vtSuccess){
    PageX.tIsNew=false;
  voRM.clearAll();
    var vtAfterSaveProcess= this.ProcessAfterSaveSuccess(voRetRoot);
    return vtAfterSaveProcess;
  }else{
    alert("����ʧ��,������Ϣ�ǣ�" + voRetRoot.text);
    return false;
  }
}*/
//----------------------------------------------------------------------
//TODO:REFACTOR
//public; ɾ�����̼��ҳ���ѡ����
//����ֵ:ɾ���ɹ�:true, ɾ��ʧ��:false;
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
//private; �����ݳɹ�����֮��Ĵ���;
//����ֵ:�ɹ�:true, ʧ��:false;
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
//private; �õ�����ʵ���ı���;
//����ֵ������ʵ���ı���;
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
//private; �õ��ҽӵ�����ģ��;
//����ֵ:�ҽӵ�����ģ��;
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
//private; ͨ���Ի���ѡ��ҽӵ�����ģ��;
//����ֵ:ѡ�������ģ��
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
//public; �����������༭ҳ���µ��¿�����
//����ֵ:void;
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
//public; �õ��б�ҳ���������������Ӧ������ģ��id;
//����ֵ:��Ӧ������ģ��id;
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
//public; �õ�����ʹ�õ�Ĭ������ģ��; ��AS_COMPO��������;
//����ֵ:���ڿ��õ�Ĭ������ģ��:��������ģ��id, ����:����"";
function WFPage4_getDefaultTemplateId(){
  var voCompoMeta= DataTools.getCompoMeta();
  var vsDefTemplateId= voCompoMeta.getAttribute("wfdeftemp");
  var vtDefTemplateUsed= voCompoMeta.getAttribute("iswfusedtemp");
  if (vtDefTemplateUsed== true && PF.trim(vsDefTemplateId) != "")
    return vsDefTemplateId;
  return "";
}
//----------------------------------------------------------------------
//public; ���ڹ����������õ�����������ƴ�ӵ�����;
//����ֵ:�ɹ�:ƴ�ӵĹ�������������, ����:"";
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
//private; ��ȡ˫�������������б�ҳ���һ��ƴ�ӵĹ�������������;
//����ֵ:ƴ�ӵĹ�������������;
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
//public: ��ʾ���̸��ٶԻ���;
//����ֵ: void;
function WFPage4_showInstanceTrace(sInstanceId){
	//debugger;
  if (!sInstanceId){
    sInstanceId= this.getInstanceIdFromPage();
  }

  if (PF.isEmpty(sInstanceId)){alert("ҳ�����ݲ���ȷ�������޷��������������Ա��ϵ!");return ;}
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
        alert("��ǰ���ݻ����ڲݸ�״̬���޷���ʾ���̸��١�");
      }
    } else {
      alert("��ǰ����û����ص�������Ϣ���޷���ʾ���̸��١�");
    }
  } else {
    alert("û����Ҫ��ʾ���̸��ٵĵ��ݡ�");
  }
}

//----------------------------------------------------------------------
//public:���ݹ��������ݶ�������ˢ�´���;
//����ֵ:void;
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
//�õ��༭ҳ������б�ҳ��Ĺ�����������ʵ��id;
//����ֵ:ʵ��id;
function WFPage4_getInstanceIdFromPage(){
  var vsInstanceId= "";
  if (WFInterface.isWorkflowCompo()){
    if (PageX.sPageType== this.PAGE_TYPE_LIST){
      var vsMainTable= DataTools.getMainTableName();
      var voGrid= PageX.getAreaGrid(vsMainTable);
      var viCurRowIndex=voGrid.getCurRowIndex();
      vsInstanceId= DataTools.getValue(vsMainTable, viCurRowIndex, WFConst.WF_INSTANCE_ID);
      if (vsInstanceId== null) //�ֶ����д���ͳһ
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
//public:�ӹ��������ݵĶ����л�������˺͸����˵�����;
//����ֵ:�������븨���˵�����;
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

//public:��������
//����ֵ:
function WFPage4_activateInstance(){
  //�ж��Ƿ����б�ҳ��(ֻ�����̼���б�ҳ����д˹���)
  if(this.sPageType!=this.PAGE_TYPE_LIST){alert("ֻ���б�ҳ�����ʹ�ô˹���"); return;}

  //��ȡҳ������,�������������(Ŀǰֻ֧��һ�μ���һ������)
  var vsTableName="AS_WF_WATCH";
  var oGrid=this.oDataPartMap(vsTableName);
  var varSelectIndex=oGrid.getSelectedRowIndexs();
  if(varSelectIndex.length==0){alert("��ѡ������Ҫ�����ļ�¼");return;}
  if(varSelectIndex.length>1){alert("��һ��ֻ��ѡ��һ��������¼��");return ;}

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
    alert("ҳ�����ݲ���ȷ!���ڹ���Ա��ϵ��");
    return ;
  }

  //����״̬������:�������������ֹ����������ֹ��
  if(voWfData.getInstanceStatus==WFConst.WF_STATUS_SUSPEND){
    alert("��ǰ�����ǹ������񣬲��ܼ���ʵ��!");
    return;
  }

  if(!confirm("ȷ��Ҫ����ʵ����")){
    return;
  }

  //�ύ�ͻ�������
  var vasNames= new Array("funcname","indata");
  var vasValues= new Array("activeInstance",voWfData.toString());
  var voRetRoot= Info.requestData("wfCommon", "WF_WATCH", vasNames, vasValues);
  if (PF.parseBool(voRetRoot.getAttribute("success"))){
      alert("���̼���ɹ��������رմ˴��ڣ�");
      if(opener)opener.location.reload();
      if (window.top == window)
        window.close();
      return true;
  }
  else {
     alert("���̼���ʧ�ܣ�");
     return false;
  }

}

//----------------------------------------------------------------------

//public:�Զ��ύ
//����ֵ:
function WFPage4_autoCommit(){
  var voWfData=WFInterface.getWfData();
  //���ݼ��
  if (!voWfData.getInstanceId()) {
    return "����: ���ǹ�����ģʽ��ҳ�棬�����޷�������";
  }
  if (!voWfData.getTaskId()) {// ע��032551: ���ύ�Ĺ�����û�й�����ID
    return "����: ���������ύ�������ٴ��ύ��";
  }
  //���svPoCode,�ύ���ã������ȼ��wfData�е�svPoCode����ҵ����ʱ����.zhanggh
  var positionId = DataTools.getSV("svOrgPoCode");
  //�����ж�wfData���Ƿ���ҵ�����ýű����õ�ְλ����
  //(һ����before_fautocommit������)
  //����У���ʹ�ã����û�У��ʹӻ�����ȡ
  if(!voWfData.getPositionId()){
    voWfData.setPositionId(positionId);
  }
  //alert(voWfData);
  //����Ĭ��ִ�����Լ�����
  var bError=WFPage4_setDefaultActionAndNextExecutor(voWfData);
  if(bError)
    return "";

  //�����¼�
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeCommit)){
      this.eventAnswer_OnBeforeShowCommit();
  }
  if (this.isAbortEvent()) return "";
  //���ⷢ���¼�;
  this.fireEvent(this.OnBeforeCommit, null);
  if (this.isAbortEvent()) return "";

  //�ύ�ͻ�������
  var ret = WFPage4_doCommitRequest(voWfData);

  //�����¼�
  if (PF.isExistMethodK(this.eventAnswer_OnAfterCommit)){
      this.eventAnswer_OnAfterShowCommit();
  }
  if (this.isAbortEvent()) return "";
    //���ⷢ���¼�;
      this.fireEvent(this.OnAfterCommit, new Array(ret));
      if (this.isAbortEvent()) return "";

  return ret;
}

function WFPage4_autoCommitSimply(aiRow, isNeedComment) {
  var result = "";
  // 1��׼������������
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

  // 2������ҵ������
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
    return "û����Ҫ����ĵ��ݣ�";
  }
}
//----------------------------------------------------------------------

//private:�ύ�ͻ�������
//return:��
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

    /*//�����¼�
  if (PF.isExistMethodK(this.eventAnswer_OnAfterCommit)){
    this.eventAnswer_OnAfterShowCommit();
  }
  if (this.isAbortEvent()) return false;
   //���ⷢ���¼�; OnAfterShowWFOptionDialog
  this.fireEvent(this.OnAfterCommit, null);
  if (this.isAbortEvent()) return false;*/

  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += PF.parseXml(retText).text + "\n";
  } else
    result += "���ú�̨ʱ��������ϵ��\n";

  if(opener)opener.location.reload();

  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;

}


//----------------------------------------------------------------------
//private;�Զ��ύʱ������Ĭ�������Լ�ִ����
// �ӷ������λ�ȡ��һ��Ĭ������,�Լ��ύ��,�����õ�ȫ�ֱ���wfData��.
 //����false��ʾ���Լ����ύ,����true��ʾ���ܼ����ύ
 function WFPage4_setDefaultActionAndNextExecutor(oWfData){
   if(oWfData==null){alert("����������Ĭ���ύ�˺���һ���ύ��ʱ����������ȷ!");return;}

    var bExistDefaultActionAndNextExecutor=true;
    var strConfirmMsg="��Ǹ,���ڹ������޷��Զ��ύ,����������:\n";

   //��ȡĬ������,�����õ�wfData��
  if(PF.isEmpty(oWfData.getAction())){
    var strActionName=WFInterface.getDefaultAction(oWfData.getTemplateId(),oWfData.getNodeId());
    if(strActionName==""){
      bExistDefaultActionAndNextExecutor=false;
      strConfirmMsg+="1:�޷���ȡ��ǰ�����������ڹ��������崦ָ��Ĭ������\n"
    }else{
      oWfData.setAction(strActionName);
    }
  }

  //��ȡĬ��ִ����
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
      strConfirmMsg+="�޷���ȡĬ���ύ�ˣ��붨�嵱ǰִ��������һ��ִ���˵Ĺ�ϵ����ָ��Ĭ��ִ���ˣ�\n";
    }
    strConfirmMsg+="�����ϣ���ֶ�ָ���ύ�����밴YES ,����NO.";

    if(bExistDefaultActionAndNextExecutor){
      oWfData.setNextExecutorId(strDefaultNextExecutor);//TODO :���Ǹ�����
    }else{
      //ѯ���Ƿ�Ҫ�����ֶ������ύ
      return false;//��ʱ������Ϊ��������ʾ�á�
      if(confirm(strConfirmMsg)){
      //�Ƿ�Ҫ�����¼�
        var vsRet=WFPage4_showWFOptionDialog(oWfData,"�ֶ��ύ",WFConst.WF_FUNC_MANUALCOMMIT);
         if (!vsRet || vsRet!="isOk" )			return true;
      }else{
        return true;//���ύ
      }
    }
  }
  return false;
 }

//----------------------------------------------------------------------
//private;������ѡ���
/**
* ͨ���ύ�Ի���
* @param oWfData��WFData������ο�WFData.js
* @return :Map������ο�Map.js
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

//public:����.
//����ֵ:
function WFPage4_callBack(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsCurrentExecutorId=voWfData.getCurrentExecutorId();
  var vsTaskId = voWfData.getTaskId();
  if(PF.isEmpty(vsInstanceId)){ return "ҳ�����ݲ���ȷ���������Ա��ϵ!";}
  if(vsTaskId){ return "��ǰ�Ǵ������񣬲��ܻ���!"; }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"����",WFConst.WF_FUNC_CALLBACK)

  //var paras = selectWorkflowParameter("withdraw",wfDataObj,vsInstanceId);


  if (!vsRet){
    //alert("���������������!");
    return "";
  }

  /*var nextNodeId=paras.ACTIVITY_ID
  var comment = paras.COMMENT;
  var primaryUserIds = paras.NEXT_EXECUTOR;///������
  var secondUserIds = paras.NEXT_EXECUTOR2;///������
  var needMessage= paras.needMessage;
  var needShortMessage= paras.needShortMessage;
  var needEmail= paras.needEmail;
  if(!nextNodeId || nextNodeId==""){
    alert("��ѡ���˻ؽڵ�!");
    return;
  }
  if (!comment){
    //alert("������������!");
    //return;
    comment="ͬ�����!";
  }*/
		var names = ["instanceId","executeStat"];
  	var values = [vsInstanceId,"getExecuteByCallBack"];
  	var resStat = Info.requestDataK("mailAction", compoName, names, values);
  	
  voWfData.setNodeId(-1);

  //�ύ�ͻ�������
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
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}
//----------------------------------------------------------------------

//public:��������.
//����ֵ:
function WFPage4_callBackSimply(aiRow,isNeedComment) {
  var result = "";
  // 1��׼��ҵ������
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
     // 2��ѭ��������˲���
    for (var i = 0; i < aiRow.length; i++) {
      instId = asInstId[i].avItemByIndex[0];
      if (instId.indexOf("-") < 0) {
        wfData = PF.getFieldXml("WF_CURRENT_EXECUTOR_ID", userId);
        wfData += PF.getFieldXml("WF_INSTANCE_ID", instId);
        wfData += PF.getFieldXml("WF_NODE_ID", "-1");  // �����ջؽڵ�ű�����-1��
        wfData += PF.getFieldXml("WF_COMMENT", vsComment);
        wfData = PF.getWraptXml("entity", wfData);
        values[1] = wfData;
        values[2] = DataTools.getTableDataXML(tableName,aiRow[i]);
        retXml = Info.requestData(actionName, compoName, names, values);
        if (retXml) {
          vtSuccess = PF.parseBool(retXml.getAttribute("success"));
          if (!vtSuccess)
            result += "��" + (aiRow[i] + 1) + "�У�" + retXml.text + "\n";
        } else
          result += "��" + (aiRow[i] + 1) + "�У����ú�̨ʱ��������\n";
      } else {
        result += "��" + (aiRow[i] + 1) + "�У����ݻ����ڲݸ�״̬�������ջء�\n"
      }
    }
    if (result == "")
      return "success";
    else
      return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
  } else {
    return "û����Ҫ����ĵ��ݣ�";
  }
}

//----------------------------------------------------------------------
//public:��ѡ�����ô���
//����ֵ:
function WFPage4_showOption(){
  var voWfData=WFInterface.getWfData();
  //���ݼ��
  if (!voWfData.getInstanceId()) {
    alert("����: ���ǹ�����ģʽ��ҳ�棬�����޷�������");
    return;
  }

  //����Ĭ������
  var strAction=WFInterface.getDefaultAction(voWfData.getTemplateId(),voWfData.getNodeId());
  if(!PF.isEmpty(strAction)){
    voWfData.setAction(strAction);
  }

  //��ȡĬ��ִ����
  var strDefaultNextExecutorId=WFInterface.getDefaultNextExecutor();
  if(!PF.isEmpty(strDefaultNextExecutorId)){
    voWfData.setNextExecutorId(strDefaultNextExecutorId);
  }
    //������ʾ�ύ���ڵ��¼�
     //�¼�������Ӧͨ��,�����̳���ʹ��;
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeShowWFOptionDialog)){
    this.eventAnswer_OnBeforeShowWFOptionDialog();
  }
   if (this.isAbortEvent()) return false;
    //���ⷢ���¼�; OnBeforeShowWFOptionDialog
   this.fireEvent(this.OnBeforeShowWFOptionDialog, null);
   if (this.isAbortEvent()) return false;

  var vsRet=	WFPage4_showWFOptionDialog(voWfData,"ѡ������",WFConst.WF_FUNC_SHOWOPTION);
  if (PF.isExistMethodK(this.eventAnswer_OnAfterShowWFOptionDialog)){
    this.eventAnswer_OnAfterShowWFOptionDialog();
  }
   if (this.isAbortEvent()) return false;
    //���ⷢ���¼�; OnBeforeShowWFOptionDialog
   this.fireEvent(this.OnAfterShowWFOptionDialog, null);
  if (this.isAbortEvent()) return false;

}
//----------------------------------------------------------------------

//public:
//����ֵ:
function WFPage4_deactivateInstance(){
  //�ж��Ƿ����б�ҳ��(ֻ�����̼���б�ҳ����д˹���)
  if(this.sPageType!=this.PAGE_TYPE_LIST){ return "ֻ���б�ҳ�����ʹ�ô˹���"; }

  //��ȡҳ������,�������������(Ŀǰֻ֧��һ�μ���һ������)
  var vsTableName="AS_WF_WATCH";
  var oGrid=this.oDataPartMap(vsTableName);
  var varSelectIndex=oGrid.getSelectedRowIndexs();
  if(varSelectIndex.length==0){ return "��ѡ������Ҫ�����ļ�¼"; }
  if(varSelectIndex.length>1){ return "��һ��ֻ��ѡ��һ��������¼��"; }

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
    return "ҳ�����ݲ���ȷ!���ڹ���Ա��ϵ��";
  }

  //����״̬������:�������������ֹ����������ֹ��
  if(oWfData.getInstanceStatus==WFConst.WF_STATUS_ACTIVE){
    return "��ǰ�����ǻ���񣬲��ܶ���ʵ��!";
  }

  if(!confirm("ȷ��Ҫ����ʵ����")){
    return "";
  }

  //�ύ�ͻ�������
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
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}
//----------------------------------------------------------------------

//public:
//allowwhich,-1������ʼ��0������ʼ+ǰһ����1����ǰһ����2������
//����ֵ:
function WFPage4_giveBack(allowWhich, isNew, airow){
  var voWfData = WFInterface.getWfData(isNew);
  var vsTaskId= voWfData.getTaskId();
  if(PF.isEmpty(vsTaskId)){
    return "��ǰ���Ѱ����񣬲��ܻ���!";
  }
  var vsInstanceId;

  /*if(isCollectTaskPage()){
    var allRows=getAllRows("A3");
    var selectRows=getSelectedRows("A3");
    if(allRows.length == 1){
      alert("��Ǹ,�����ڲ��ܻ��˵�ǰ����,��Ϊ��ǰ�����ǻ��������Ψһ������.\n������ѡ�����»���.��������˵����ܽڵ�.");
      return ;
    }

    if(selectRows.length==0){
      alert("����Ҫѡ��һ����������\n�����ϣ����������������Ҳ���Ե�����»��ܣ�������Ա�����»������»��ܡ�");
      return;

    }else if(selectRows.length>1){
      alert("��һ��ֻ��ѡ��һ��������л���!");
      return ;

    }else if(selectRows.length==1){
      vsInstanceId=getRowField(selectRows[0], "INSTANCE_ID");
    }
  }*/

  if(!vsInstanceId)vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();

  //���ǻ���ҳ���������Ļ���
  var vsRet=WFPage4_showWFOptionDialog(voWfData,"���̻���",WFConst.WF_FUNC_GIVEBACK,allowWhich);
  if (!vsRet || vsRet!="isOk"){
    //alert("���������������!");
    return "";
  }

  //�ύ�ͻ�������f
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
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}

//----------------------------------------------------------------------

function WFPage4_giveBackSimply(aiRow,isNeedComment,toWhich) {
  var result = "";
  // 1��׼��ҵ������
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
     // 2��ѭ��������˲���
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
    return "û����Ҫ����ĵ��ݣ�";
  }
}

//public:�ƽ�����
//����ֵ:
function WFPage4_handOver(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsTaskId = voWfData.getTaskId();

  if(PF.isEmpty(vsInstanceId)){ return "ҳ�����ݲ���ȷ���������Ա��ϵ!";	}
  if(!vsTaskId){
    return "��ǰ���Ѱ����񣬲����ƽ�!";
  }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"�ƽ�",WFConst.WF_FUNC_HANDOVER)

  if (!vsRet ||vsRet!="isOk"){
    //alert("���������������!");
    return "";
  }

  /*var nextNodeId=paras.ACTIVITY_ID
  var comment = paras.COMMENT;
  var primaryUserIds = paras.NEXT_EXECUTOR;///������
  var secondUserIds = paras.NEXT_EXECUTOR2;///������
  var needMessage= paras.needMessage;
  var needShortMessage= paras.needShortMessage;
  var needEmail= paras.needEmail;
  if(!nextNodeId || nextNodeId==""){
    alert("��ѡ���˻ؽڵ�!");
    return;
  }
  if (!comment){
    //alert("������������!");
    //return;
    comment="ͬ�����!";
  }*/

  //�ύ�ͻ�������
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
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}

//----------------------------------------------------------------------

//public:
//����ֵ:
function WFPage4_impower(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsTaskId = voWfData.getTaskId();

  if(PF.isEmpty(vsInstanceId)){ return "ҳ�����ݲ���ȷ���������Ա��ϵ!";	}
  if(!vsTaskId){
    return "��ǰ���Ѱ����񣬲�����Ȩ!";
  }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"��Ȩ",WFConst.WF_FUNC_IMPOWER)

  if (!vsRet ||vsRet!="isOk"){
    //alert("���������������!");
    return "";
  }

  //�ύ�ͻ�������
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
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}
//----------------------------------------------------------------------

//public:��ֹ����
//����ֵ:
function WFPage4_interruptInstance(){
  var instanceIds = new Array();
  var varSelectIndexs = null;
  //�ж��Ƿ����б�ҳ��
  var vsTableName=DataTools.getMainTableName();//"AS_WF_WATCH";
  var oGrid= PageX.getListGrid();
  if(this.sPageType==this.PAGE_TYPE_LIST){
    //��ȡҳ������,�������������(Ŀǰֻ֧��һ����ֹһ������)
    varSelectIndexs=oGrid.getSelectedRowIndexs();
    if(varSelectIndexs.length==0){ return "��ѡ������Ҫ�����ļ�¼"; }
    for (var i = 0;i<varSelectIndexs.length; i++){
      instanceIds[i] = DataTools.getValue(vsTableName,varSelectIndexs[i],WFConst.PROCESS_INST_ID_FIELD);
      if(instanceIds[i] == null || instanceIds[i] == ""){
        return "ҳ�����ݲ���ȷ���������Ա��ϵ!";
      }
    }
  }else{
    var voWfData=WFInterface.getWfData();;//�༭ҳ���Ѿ�����������id
    instanceIds[0]= voWfData.getInstanceId();
    varSelectIndexs = new Array();
    varSelectIndexs[0] = 0;
  }

  //�ύ�ͻ�������
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
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}
//----------------------------------------------------------------------

//public:�ֶ��ύ
//���Ӳ���allWhich,�Ƿ�����ѡ��λ
//  0,������ѡ�� 1��ֻ����ѡ����λ�� 2�����е�λ
//����ֵ:
function WFPage4_manualCommit(allWhich){
  var voWfData=WFInterface.getWfData();
  //���ݼ��
  if (!voWfData.getInstanceId()) {
    return "����: ���ǹ�����ģʽ��ҳ�棬�����޷�������";
  }
  if (!voWfData.getTaskId()) {// ע��032551: ���ύ�Ĺ�����û�й�����ID
    return "����: ���������ύ�������ٴ��ύ��";
  }

  //����Ĭ������
  var strAction=WFInterface.getDefaultAction(voWfData.getTemplateId(),voWfData.getNodeId());
  if(!PF.isEmpty(strAction)){
    voWfData.setAction(strAction);
  }

  //��ȡĬ��ִ����
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

  //������ʾ�ύ���ڵ��¼�
  //�¼�������Ӧͨ��,�����̳���ʹ��;
  //���ⷢ���¼�; OnBeforeShowWFOptionDialog
  this.fireEvent(this.OnBeforeShowWFOptionDialog, null);
  if (this.isAbortEvent()) return "";

  var vsRet = WFPage4_showWFOptionDialog(voWfData,"�ֶ��ύ",WFConst.WF_FUNC_MANUALCOMMIT,allWhich);


  //���ⷢ���¼�; OnBeforeShowWFOptionDialog
  this.fireEvent(this.OnAfterShowWFOptionDialog, null);
  if (this.isAbortEvent()) return "";
  if (!vsRet ||vsRet!="isOk")			return "";
  //alert(voWfData.toString());

  //���ⷢ���¼�;
  this.fireEvent(this.OnBeforeCommit, null);
  if (this.isAbortEvent()) return "";

  var ret = WFPage4_doCommitRequest(voWfData);

  //���ⷢ���¼�;
  this.fireEvent(this.OnAfterCommit, new Array(ret));
  if (this.isAbortEvent()) return "";
  
  return ret;
}
//----------------------------------------------------------------------

//public:
//����ֵ:
function WFPage4_restartInstance(){
  //�ж��Ƿ����б�ҳ��(ֻ�����̼���б�ҳ����д˹���)
  if(this.sPageType!=this.PAGE_TYPE_LIST){ return "ֻ���б�ҳ�����ʹ�ô˹���"; }

  //��ȡҳ������,�������������(Ŀǰֻ֧��һ������һ������)
  var vsTableName="AS_WF_WATCH";
  var oGrid=this.oDataPartMap(vsTableName);
  var varSelectIndex=oGrid.getSelectedRowIndexs();
  if(varSelectIndex.length==0){ return "��ѡ������Ҫ�����ļ�¼"; }
  if(varSelectIndex.length>1){ return "��һ��ֻ��ѡ��һ��������¼��"; }

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
    return "ҳ�����ݲ���ȷ!���ڹ���Ա��ϵ��";
  }

  //����״̬������:�������������ֹ����������ֹ��
  if(voWfData.getInstanceStatus!=WFConst.WF_STATUS_ACTIVE){
    return "��ǰ�����ǹ������񣬲�������ʵ��!";
  }

  if(!confirm("ȷ��Ҫ����ʵ����")){
    return "";
  }

  //�ύ�ͻ�������
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
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}

//----------------------------------------------------------------------

//public:��ʾ��ʷ���
//����ֵ:
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
        alert("��ǰ���ݻ����ڲݸ�״̬���޷��鿴��������");
      }
    } else {
      alert("��ǰ����û����ص�������Ϣ���޷��鿴��������");
    }
  } else {
    alert("û����Ҫ�鿴�������ĵ��ݡ�");
  }
}
//----------------------------------------------------------------------
//public:������ת
//����ֵ:
function WFPage4_transfer(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();
  var vsNodeId = voWfData.getNodeId();
  var vsTaskId = voWfData.getTaskId();

  if(PF.isEmpty(vsInstanceId)){ alert("ҳ�����ݲ���ȷ���������Ա��ϵ!");		return;	}
  if(!vsTaskId){
    alert("��ǰ���Ѱ����񣬲�����ת!");
    return;
  }

  var vsRet=WFPage4_showWFOptionDialog(voWfData,"������ת",WFConst.WF_FUNC_TRANSFER)

  if (!vsRet ||vsRet!="isOk"){
    //alert("���������������!");
    return;
  }

  //�ύ�ͻ�������
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
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}
//public:��������
//����ֵ:
function WFPage4_rework(){
  var voWfData = WFInterface.getWfData();
  var vsInstanceId= voWfData.getInstanceId();

  if(PF.isEmpty(vsInstanceId)){ 
    alert("ҳ�����ݲ���ȷ!");	
    return;	
  }
  if(!WFInterface.isInstanceFinish(vsInstanceId)){
    alert("����δ����������ִ������!");
    return;
  }

  var voComment = new Object();
  voComment.text = "";
  var vsComment = "";
  //var ret = showModalDialog("commentDialog?", voComment, "status:no;resizable:yes;help:no;dialogHeight:250px;dialogWidth:355px");
  //if (!ret || ret != "isOk"){
   // alert("���������������!");
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
  //�ύ�ͻ�������
  var result = "";
  if (retXml) {
    var retText = retXml.text;
    var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
    if (!vtSuccess)
      result += retText + "\n";
  } else
    result += "���ú�̨ʱ��������\n";
  if (result == "")
    return "success";
  else
    return "����ʧ�ܡ�  \n����ԭ�� ------ \n" + result;
}


function closeWindowOfWF(call){
  //�ر�windowǰ�ȼ���Ƿ���Ҫִ��after_call(��after_fgiveback)
  if (eval("typeof after_f" + call + " ==\"function\""))
    r2 = eval("after_f"+call + "()");
  if (window.top == window)
    window.close();
}


function WFPage4_removeNextNodeExecutor(aiRow) {
  var result = "";
  // 1��׼������������
  var compoName = DataTools.getCompoName();
  var userId =  DataTools.getSV("svUserID");
  var wfDataXml = WFInterface.getWFSessionXml().xml;
  var wfData = wfDataXml;
  var voWfData=WFInterface.getWfData();
  
	var condition = encodeParams("func_id",14,
										 "title","ɾ���²�ִ����",
										 "allowwhich",1,
										 WFConst.WF_TEMPLATE_ID, voWfData.getTemplateId(),
										 WFConst.WF_NODE_ID,voWfData.getNodeId(),
										 "direction","4");
	var ret = showModalDialog("dispatcher.action?function=optionDialog&"+condition,voWfData,"status:no;resizable:yes;help:no;dialogHeight:460px;dialogWidth:600px");
	if(!ret || !voWfData.getNextExecutorId()) {
		return "";
	}
	var fieldString = voWfData.fieldInMapToString();
	wfData = wfData.replace("<entity>","<entity>"+ fieldString );//������Ϣ
	
  //var voWfData=WFInterface.getWfData();
	//:TODO ���ִ����

  // 2������ҵ������
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
			alert("����ʧ�ܡ�  \n����ԭ�� ------ \n" + retDoc.text);
			return "";
		}
}

}
//ɾ����ǰִ����
function WFPage4_removeExecutor(aiRow) {
  var result = "";
  // 1��׼������������
  var compoName = DataTools.getCompoName();
  var userId =  DataTools.getSV("svUserID");
  var wfDataXml = WFInterface.getWFSessionXml().xml;
  var wfData = wfDataXml;
  var voWfData=WFInterface.getWfData();
  
	var condition = encodeParams("func_id",15,
										 "title","ɾ��ִ����",
										 "allowwhich",1,
										 WFConst.WF_TEMPLATE_ID, voWfData.getTemplateId(),
										 WFConst.WF_NODE_ID,voWfData.getNodeId(),
										 "direction","4");
	var ret = showModalDialog("dispatcher.action?function=optionDialog&"+condition,voWfData,"status:no;resizable:yes;help:no;dialogHeight:460px;dialogWidth:600px");
  if (!ret || ret != "isOk"){
    return "";
  }
	var fieldString = voWfData.fieldInMapToString();
	wfData = wfData.replace("<entity>","<entity>"+ fieldString );//������Ϣ
	
  //var voWfData=WFInterface.getWfData();
	//:TODO ���ִ����

  // 2������ҵ������
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
			alert("����ʧ�ܡ�  \n����ԭ�� ------ \n" + retDoc.text);
			return "";
		}
}
}
function WFPage4_appendExecutor(aiRow,direction) {
	if (!direction) direction = "0";
  var result = "";
  // 1��׼������������
  var compoName = DataTools.getCompoName();
  var userId =  DataTools.getSV("svUserID");
  var wfDataXml = WFInterface.getWFSessionXml().xml;
  var wfData = wfDataXml;
  var voWfData=WFInterface.getWfData();
  
	var condition = encodeParams("func_id",12,
										 "title","׷��ִ����",
										 "allowwhich",1,
										 WFConst.WF_TEMPLATE_ID, voWfData.getTemplateId(),
										 WFConst.WF_NODE_ID,voWfData.getNodeId(),
										 "direction",direction);
										 
	var ret = showModalDialog("dispatcher.action?function=optionDialog&"+condition,voWfData,"status:no;resizable:yes;help:no;dialogHeight:460px;dialogWidth:600px");
	if(!ret || !voWfData.getNextExecutorId()) {
		return "";
	}
	var fieldString = voWfData.fieldInMapToString();
	wfData = wfData.replace("<entity>","<entity>"+ fieldString );//������Ϣ
	
  //var voWfData=WFInterface.getWfData();
	//:TODO ���ִ����

  // 2������ҵ������
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
			alert("����ʧ�ܡ�  \n����ԭ�� ------ \n" + result);
			return "";
		}
}
}
/* $Id: Free.js,v 1.5 2008/06/18 13:44:00 liuxiaoyong Exp $ */
/*
Title: gp.page.Free
Description:
Free �����࣬��ҳ���ʼ��ʱ�����ڶ�ҳ���ע��ĸ��� EditBox
�� TableName �� FreeCode ���з�������磺����ͬһ�����ݡ�
������ʾ������ȣ�
Company: ��������
Author: leidh;
*/

//----------------------------------------------------------------------
function Free(){
  //1.���� =function();
  Base.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.Free";

  //3.���������� =function();
  this.sName= "";
  this.oOuterObj= null;
  this.iTabIndex= 0;        //public;

  this.sTableName= "";      //private; �ṩ��ʾ���ݷ����ϢԪ�ı���;

  this.oEditBoxMap= new Map();         //private;
  this.iCurRow= -1;
  this.oOldValueMap= new Map();

  this.ax2vTabIndexQueue= new Array(); //private; [index][box];
  this.oTabIndexMap= new Map();        //private; key=fieldname; value=tabindex;
  this.oCurEditBox= null;              //private;

  this.tHasInit= false;
  //���ڽ��е�״̬;
  this.tIsInitialing= false;
  this.tIsSettingValue= false;
  this.tIsLoadingData= false;

  //4.�¼������� =function();
  this.OnInit= "OnInit";                    //����: oSender;
  this.OnEnterRow= "OnEnterRow";            //����: oSender, iNewRow, iOldRow;
  this.OnOutRow= "OnOutRow";                //����: oSender, iRow;
  this.OnBeforeInsertRow= "OnBeforeInsertRow";  //oSender, iRowIndex;
  this.OnAfterInsertRow= "OnAfterInsertRow";    //oSender, iRowIndex;
  this.OnBeforeDeleteRow= "OnBeforeDeleteRow";  //����: oSender, iRowIndex;
  this.OnAfterDeleteRow= "OnAfterDeleteRow";    //����: oSender, iRowIndex;
	this.OnBeforeUpdate= "OnBeforeUpdate";        //����: oSender, iRowIndex, sFieldName, sValue, sOldValue
	this.OnAfterUpdate= "OnAfterUpdate";          //����: oSender, iRowIndex, sFieldName, sValue, sOldValue
	//�����ѽ����ĵ�;
	
  this.OnLoadData= "OnLoadData";                //oSender;

  //5.���������� =function();
  //public;
  this.addEditBox= Free_addEditBox;
  this.clear= Free_clear;
  this.deleteRow= Free_deleteRow;
  this.getAllEditBox= Free_getAllEditBox;
  this.getCurRowIndex= Free_getCurRowIndex;
  this.getEditBox= Free_getEditBox;
  this.getNamesValues= Free_getNamesValues;
  this.getRowCount= Free_getRowCount;
  this.getValue= Free_getValue;
  this.getValueByRowField= Free_getValueByRowField;
  this.init= Free_init;
  this.initMeta= Free_initMeta;
  this.insertRow= Free_insertRow;
  this.isValidFieldName= Free_isValidFieldName;
  this.isValidRow= Free_isValidRow;
  this.loadData= Free_loadData;
  this.setCurRow= Free_setCurRow;
  this.setFocus= Free_setFocus;
  this.setValue= Free_setValue;
  this.setValueByRowField= Free_setValueByRowField;
  this.getFieldNames= Free_getFieldNames;
  this.getTableName= Free_getTableName;
  this.setTableName= Free_setTableName;
  //����������ĵ�;

  this.loadRow= Free_loadRow;
  this.setReadOnly= Free_setReadOnly;
  this.isReadOnly= Free_isReadOnly;
  this.setFieldReadOnly= Free_setFieldReadOnly;
  this.isFieldReadOnly= Free_isFieldReadOnly;
  this.setFieldVisible= Free_setFieldVisible;
  this.isFieldVisible= Free_isFieldVisible;
  this.setVisible= Free_setVisible;
  this.isVisible= Free_isVisible;
  this.getFieldCaptionElement= Free_getFieldCaptionElement;
  this.getFieldCaption= Free_getFieldCaption;
  this.setFieldCaption= Free_setFieldCaption;
  this.getValueFromBox= Free_getValueFromBox;
  this.fillDefaultValueToBox= Free_fillDefaultValueToBox;

  //private;
  this.clearAllBox= Free_clearAllBox;
  this.sortTabIndex= Free_sortTabIndex;
  this.EditBox_OnKeyDown_Dispose= Free_EditBox_OnKeyDown_Dispose;
  this.getVisibleIndex= Free_getVisibleIndex;
  this.setValueByRowFieldK= Free_setValueByRowFieldK;
  this.setValueToRS= Free_setValueToRS;
  this.setValueToEditBox= Free_setValueToEditBox;
  this.makeCaptionId= Free_makeCaptionId;
  this.makeBoxTDId= Free_makeBoxTDId;
  
   this.release = Free_release;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
function Free_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;

  if (Base_init.call(this, false)== false) return false;
  if (this.initMeta()== false) return false;

  this.tHasInit= true;
  this.tIsInitialing= true;

  var voDM= PageX.getDataManager();
  if (voDM!= null){
    voDM.addListener(new Listener(voDM.OnRowsInserted, Free_DataXML_OnRowsInserted, this));
    voDM.addListener(new Listener(voDM.OnRowsDelete, Free_DataXML_OnRowsDelete, this));
  }

	//huangcb:20080418�˶�ѭ�����ÿ��addListener������ʱ30ms����Ҫ����ת�Ƶ���̨
  var vaoEditBox= this.oEditBoxMap.getAllItem();
  var voBox= null;
  for (var i= 0, len= vaoEditBox.length; i< len; i++){
    voBox= vaoEditBox[i];
    voBox.addListener(new Listener(voBox.OnChange, Free_oEditBox_OnChange, this));
    voBox.addListener(new Listener(voBox.OnKeyDown, Free_oEditBox_OnKeyDown, this));
  }

	//huangcb:20080418������ʱ30ms���Ƴ��󾭳������ԣ���Ӱ�콹��˳��
  //this.sortTabIndex();
  
  if (DataTools.getTableRowCount(this.getTableName())> 0){
  	this.iCurRow= 0;
  }
  if (tIsFinalClass) this.setInitMark();
  this.tIsInitialing= false;
  return true;
}
//----------------------------------------------------------------------
//public; ��ʼ������.
//����ֵ: �ɹ�: true, ʧ��: false;
function Free_initMeta(){
  if (PF.isEmpty(this.getTableName())) return false;
  var voRS= DataTools.getRecordset(this.getTableName());

  if (PageX.sPageType== PageX.PAGE_TYPE_REPORT
      && voRS.RecordCount<= 0) voRS.AddNew();
  if (voRS.RecordCount>= 1) voRS.MoveFirst();
  return true;
}
//----------------------------------------------------------------------
//public; װ������;
//return: void;
function Free_loadData(){
  if (this.tHasInit== false) return;
  var viRow= this.iCurRow;
  if (viRow< 0) viRow= 0;
  this.tIsLoadingData= true;
  this.iCurRow= -1;
  this.clearAllBox();
  this.initMeta();
  this.setCurRow(viRow);
  this.tIsLoadingData= false;

  //���ⷢ���¼�; OnLoadData
  if (PF.isExistMethodK(this.eventAnswer_OnLoadData)){
    this.eventAnswer_OnLoadData(this);
  }
  this.fireEvent(this.OnLoadData, new Array(this));
  return;
}
//----------------------------------------------------------------------
//public; ���� EditBox.
//����ֵ:�ɹ�: true, ʧ��: false;
function Free_addEditBox(oEditBox){
  if (PageX.isEditBox(oEditBox)== false) return false;
  this.oEditBoxMap.put(oEditBox.getFieldName(), oEditBox);
  oEditBox.oOuterObj= this;
  if (this.getTableName()== null || this.getTableName()== "") this.setTableName(oEditBox.getTableName());
  return true;
}
//----------------------------------------------------------------------
//private; ���� EditBox.
//����ֵ:void;
function Free_sortTabIndex(){
  this.ax2vTabIndexQueue= new Array();
  var vaoEditBox= this.oEditBoxMap.getAllItem();
  var voBox= null;
  var vsZeros= "0000000000";
  for (var i= 0, len= vaoEditBox.length; i< len; i++){
    voBox= vaoEditBox[i];
    var vsTabIndex= ""+ PF.parseInt(voBox.getTabIndex());
    vsTabIndex= vsZeros.substr(vsTabIndex.length)+ vsTabIndex;
    this.ax2vTabIndexQueue[i]= new Array(vsTabIndex, voBox);
  }
  this.ax2vTabIndexQueue.sort();

  this.oTabIndexMap.clear();
  for (var i= 0, len= this.ax2vTabIndexQueue.length; i< len; i++){
    voBox= this.ax2vTabIndexQueue[i][1];
    if (voBox== null) continue;
    this.oTabIndexMap.put(voBox.getFieldName(), i);
  }
  return;
}
//----------------------------------------------------------------------
//public; ��ȡ EditBox.
//����ֵ: �ɹ�: EditBox, ʧ��: null;
function Free_getEditBox(sFieldName){
  var voEditBox= this.oEditBoxMap.get(sFieldName);
  return voEditBox;
}
//----------------------------------------------------------------------
//public; ��ȡ���е� EditBox.
//����ֵ: �ɹ�: EditBox ����, ʧ��: null;
function Free_getAllEditBox(){
  var vaoEditBox= this.oEditBoxMap.getAllItem();
  return vaoEditBox;
}
//----------------------------------------------------------------------
//public; ��ȡ���е� EditBox ����ֵ����.
//����ֵ: field name array/ null;
function Free_getFieldNames(){
  var vasField= this.oEditBoxMap.getAllKey();
  return vasField;
}
//----------------------------------------------------------------------
//public; ��ȡ���е� EditBox ����ֵ����.
//����ֵ: �ɹ�: new Array(asName, asValue) ����, ʧ��: null;
function Free_getNamesValues(){
  var vasField= this.oEditBoxMap.getAllKey();
  var vasName= new Array();
  var vasValue= new Array();
  var viCurRow= this.getCurRowIndex();
  for (var i= 0, len= vasField.length; i< len; i++){
    vasName[i]= vasField[i];
    vasValue[i]= this.getValue(vasField[i]);
  }
  return new Array(vasName, vasValue);
}
//----------------------------------------------------------------------
//public; �ж�ָ�����ֶ����Ƿ���Ч.
//����ֵ:��Ч: true, ����: false;
function Free_isValidFieldName(sFieldName){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "isValidFieldName");
  var voEditBox= this.oEditBoxMap.get(sFieldName);
  if (voEditBox== null) return false;
  return true;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶε�ֵ.
//����ֵ: void;
function Free_setValue(sFieldName, sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValue");
  this.setValueByRowField(this.getCurRowIndex(), sFieldName, sValue);
  return;
}
//----------------------------------------------------------------------
//public; ����ָ���к�������Ԫ���ֵ.
//����ֵ: void;
function Free_setValueByRowField(iRowIndex, sFieldName, sValue){
  this.setValueByRowFieldK(iRowIndex, sFieldName, sValue, true);
}
//----------------------------------------------------------------------
//private; ����ָ���к�������Ԫ���ֵ.
//����ֵ: void;
function Free_setValueByRowFieldK(iRowIndex, sFieldName, sValue, tIsToEditBox){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValueByRowField");
  if (DataTools.getTableRowCount(this.getTableName())> 0 
      && this.isValidRow(iRowIndex)== false) return;
  if (this.getCurRowIndex()>= 0 && this.getCurRowIndex()!= iRowIndex) return;
  if (this.isValidFieldName(sFieldName)== false) return;
  if (tIsToEditBox== null) tIsToEditBox= true;

  var vsValue= (sValue== null)? "": sValue;
  var vsOldValue= this.oOldValueMap.get(sFieldName);
  if (this.tIsInitialing== false 
      && this.tIsLoadingData== false
      && vsOldValue== vsValue){
    return;
  }

  //���ⷢ���¼�; OnBeforeUpdate
  if (!this.tIsLoadingData){
  	this.abortEvent(false);
    if (PF.isExistMethodK(this.eventAnswer_OnBeforeUpdate)){
    	this.eventAnswer_OnBeforeUpdate(this, iRowIndex, sFieldName, sValue, vsOldValue);
    }
    if (this.isAbortEvent()) return;
    this.fireEvent(this.OnBeforeUpdate, new Array(this, iRowIndex, sFieldName, sValue, vsOldValue));
    if (this.isAbortEvent()) return;
  }

  this.tIsSettingValue= true;
  this.setValueToRS(iRowIndex, sFieldName, sValue);
  if (tIsToEditBox){
    this.setValueToEditBox(sFieldName, sValue);
  }
  this.oOldValueMap.put(sFieldName, sValue);
  this.tIsSettingValue= false;

  //���ⷢ���¼�; OnAfterUpdate
  if (!this.tIsLoadingData){
    if (PF.isExistMethodK(this.eventAnswer_OnAfterUpdate)){
    	this.eventAnswer_OnAfterUpdate(this, iRowIndex, sFieldName, sValue, vsOldValue);
    }
    this.fireEvent(this.OnAfterUpdate, new Array(this, iRowIndex, sFieldName, sValue, vsOldValue));
  }
  return;
}
//----------------------------------------------------------------------
//private; ����ָ���к�������Ԫ���ֵ.
//����ֵ: void;
function Free_setValueToRS(iRowIndex, sFieldName, sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValueByRowField");
  if (this.isValidRow(iRowIndex)== false) return;
  if (this.getCurRowIndex()!= iRowIndex) return;
  if (this.isValidFieldName(sFieldName)== false) return;

  this.tIsSettingValue= true;
  if (this.tIsLoadingData== false){
    if (this.isValidRow(iRowIndex)){
    	var bIn = DataTools.isValidField(this.getTableName(), sFieldName);
    	if(bIn){
      	var voRS= DataTools.getRecordset(this.getTableName());
      	voRS.Move(iRowIndex, DataTools.RS_BOOK_MARK_FIRST);
      	if (!voRS.BOF && !voRS.EOF) voRS.Update(sFieldName, sValue);
    	}
    }
  }
  this.tIsSettingValue= false;
}
//----------------------------------------------------------------------
//private; ����ָ���к�������Ԫ���ֵ.
//����ֵ: void;
function Free_setValueToEditBox(sFieldName, sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValueByRowField");

  this.tIsSettingValue= true;
	var voEditBox=this.getEditBox(sFieldName);
	if (voEditBox==null) Info.throws("û�з����ֶ�: "+ sFieldName+ " ����Ӧ����������;", this.CLASSNAME, "setValue");
	if (this.tIsInitialing || this.tIsLoadingData){
  	var vtIsFireOnChange2= voEditBox.tIsFireOnChange;
  	voEditBox.tIsFireOnChange= false;
    voEditBox.setValue(sValue);
    voEditBox.tIsFireOnChange= vtIsFireOnChange2;
  }else{
    voEditBox.setValue(sValue);
  }
  this.tIsSettingValue= false;
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰ����ָ���ֶε�ֵ.
//����ֵ:�ɹ�: ��Ԫ���ֵ, ʧ��: null;
function Free_getValue(sFieldName){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "getValue");
  var vsValue= this.getValueByRowField(this.getCurRowIndex(), sFieldName);
  return vsValue;
}
//----------------------------------------------------------------------
//public; ͨ�����кŻ�ȡָ����Ԫ���ֵ.
//��Ӱ�� this.oRS �ĵ�ǰ��;�Ǵ� PageDataXML ��ȡֵ;
//����ֵ:�ɹ�: ��Ԫ���ֵ, ʧ��: null;
function Free_getValueByRowField(iRowIndex, sFieldName){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "getValueByRC");
  if (DataTools.getTableRowCount(this.getTableName())> 0 
      && this.isValidRow(iRowIndex)== false) return null;
  if (this.isValidFieldName(sFieldName)== false) return null;
  var vsValue= "";
  if (DataTools.getTableRowCount(this.getTableName())> 0){
    vsValue= DataTools.getValue(this.getTableName(), iRowIndex, sFieldName);
  }else{
    vsValue= this.getValueFromBox(sFieldName);
  }
  return vsValue;
}
//----------------------------------------------------------------------
//public;
function Free_getValueFromBox(sField){
  var vsValue= "";
  var voBox= this.getEditBox(sField);
  if (voBox!= null) vsValue= voBox.getValue();
  return vsValue;
}
//----------------------------------------------------------------------
//public; �����ǰ���������ݣ��������ݲ��������ݿ���б���.
//����ֵ:�ɹ�: true, ʧ��: false;
function Free_clear(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "clear");
  this.clearAllBox();
  DataTools.clearTableData(this.getTableName());
  this.oOldValueMap.clear();
  return true;
}
//----------------------------------------------------------------------
//public; 
//return: void;
function Free_fillDefaultValueToBox(){
  var vaoBox= this.getAllEditBox();
  if (!PF.isValidArray(vaoBox)) return;
  for (var i= 0; i< vaoBox.length; i++){
    var vsExpress= DataTools.getDefExpr(this.getTableName(), vaoBox[i].getFieldName());
    vaoBox[i].setFireOnChange(false);
    vaoBox[i].setValue(DataTools.makeDefaultValueK(vsExpress));
    vaoBox[i].setFireOnChange(true);
  }
}
//----------------------------------------------------------------------
//public; ������;
//iRowIndex: ��ָ��Ҫ�����е�λ��;
//��� iRowIndex< 0 ����ڵ�ǰ������л�null,����Ϊ׷�ӽ��д���;
//����ֵ:�ɹ�: �����е�λ��, ʧ��: -1;
function Free_insertRow(iRowIndex){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");

  //���ⷢ���¼�; OnBeforeInsertRow
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeInsertRow)){
    this.eventAnswer_OnBeforeInsertRow(this, iRowIndex);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeInsertRow, new Array(this, iRowIndex));
  if (this.isAbortEvent()) return false;

  this.iCurRow= DataTools.insertRow(this.getTableName(), null, null, iRowIndex, true);
  this.loadData();

  //���ⷢ���¼�; OnAfterInsertRow
  if (PF.isExistMethodK(this.eventAnswer_OnAfterInsertRow)){
    this.eventAnswer_OnAfterInsertRow(this, this.iCurRow);
  }
  this.fireEvent(this.OnAfterInsertRow, new Array(this, this.iCurRow));
  return this.iCurRow;
}
//----------------------------------------------------------------------
//private; ���Ĭ��ֵ;
//����ֵ:�ɹ�: true, ʧ��: false;
function Free_clearAllBox(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "clearAllBox");

  var vaoEditBox= this.oEditBoxMap.getAllItem();
  var voBox= null;
  for (var i= 0, len= vaoEditBox.length; i< len; i++){
    voBox= vaoEditBox[i];
    var vtOld= voBox.tIsFireOnChange;
    voBox.tIsFireOnChange= false;
    voBox.clear();
    voBox.tIsFireOnChange= vtOld;
  }
  return true;
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰ�е��к�;
//����ֵ: �ɹ�: ��ǰ�е��к�, ʧ��: -1;
function Free_getCurRowIndex(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "getCurRowIndex");
  if (this.iCurRow< 0) return -1;
  return this.iCurRow;
}
//----------------------------------------------------------------------
//public; ���õ�ǰ��;
//paramters: iRowIndex �� 0 ��ʼ;
//return: void;
function Free_loadRow(iRowIndex){
  if (this.isValidRow(iRowIndex)== false) return;

  var vtIsLoadingData= this.tIsLoadingData;
  this.tIsLoadingData= true;

  var voRM= PageX.getRowManager();
  var vtIsAllowUpdate= voRM.tAllowUpdate;
  voRM.tAllowUpdate= false;

  var voRS= DataTools.getRecordset(this.getTableName());
  voRS.Move(iRowIndex, DataTools.RS_BOOK_MARK_FIRST);
  this.iCurRow= voRS.AbsolutePosition-1;
  var vaoEditBox= this.oEditBoxMap.getAllItem();
  var voBox= null;
  var vsFieldName= "";
	var vsValue= "";
  for (var i= 0, len= vaoEditBox.length; i< len; i++){
    voBox= vaoEditBox[i];
    vsFieldName= voBox.getFieldName();
    vsValue= DataTools.getValueByRS(voRS,voBox.getTableName(), vsFieldName);
    this.setValueToEditBox(vsFieldName, vsValue);
  }
  voRM.tAllowUpdate= vtIsAllowUpdate;
  this.tIsLoadingData= vtIsLoadingData;
}
//----------------------------------------------------------------------
//public; ���õ�ǰ��;
//paramters: iRowIndex �� 0 ��ʼ;
//return: void;
function Free_setCurRow(iRowIndex){
  if (this.tHasInit== false) return;
  if (this.isValidRow(iRowIndex)== false) return;
  if (iRowIndex== this.iCurRow) return;
  //�¼�������Ӧͨ��,�����̳���ʹ��;
  if (PF.isExistMethodK(this.eventAnswer_OnOutRow)){
    this.eventAnswer_OnOutRow(this, this.iCurRow);
  }
  this.fireEvent(this.OnOutRow, new Array(this, this.iCurRow));

  var viOldRow= this.iCurRow;
  this.loadRow(iRowIndex);

  //�¼�������Ӧͨ��,�����̳���ʹ��;
  if (PF.isExistMethodK(this.eventAnswer_OnEnterRow)){
    this.eventAnswer_OnEnterRow(this, this.iCurRow, viOldRow);
  }
  this.fireEvent(this.OnEnterRow, new Array(this, this.iCurRow, viOldRow));
  return;
}
//----------------------------------------------------------------------
//public; ��ȡ������;
//����ֵ: �ɹ�: ����, ʧ��: -1;
function Free_getRowCount(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "getRowCount");
  var viRowCount= DataTools.getTableRowCount(this.getTableName());
  return viRowCount;
}
//----------------------------------------------------------------------
//public; �ж�ָ�����к��Ƿ���Ч.
//����ֵ:��Ч: true, ����: false;
function Free_isValidRow(iRowIndex){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "isValidRow");
  if (iRowIndex== null) return false;
  if (iRowIndex< 0 || iRowIndex>= this.getRowCount()) return false;
  return true;
}
//----------------------------------------------------------------------
//public; ɾ��ָ������;
//����ֵ:�ɹ�: true, ʧ��: false;
function Free_deleteRow(iRowIndex){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "deleteRow");
  if (this.isValidRow(iRowIndex)== false){
    iRowIndex= this.getCurRowIndex();
    if (this.isValidRow(iRowIndex)== false) return false;
  }

  //�¼�������Ӧͨ��,�����̳���ʹ��;
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeDeleteRow)){
    this.eventAnswer_OnBeforeDeleteRow(this, iRowIndex);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeDeleteRow, new Array(this, iRowIndex));
  if (this.isAbortEvent()) return false;

  var voRS= DataTools.getRecordset(this.getTableName());
  voRS.MoveFirst();
  voRS.Move(iRowIndex, DataTools.RS_BOOK_MARK_FIRST);
  voRS.Delete();

  var viRowCount= this.getRowCount();
  var viRow= iRowIndex;
  if (viRowCount> 0){
    if (viRow>= viRowCount) viRow= viRowCount- 1;
    if (viRow>= 0){
      this.iCurRow= -1;
      this.setCurRow(viRow);
    }
  }else this.clearAllBox();

  //�¼�������Ӧͨ��,�����̳���ʹ��;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterDeleteRow)){
    this.eventAnswer_OnAfterDeleteRow(this, iRowIndex);
  }
  //���ⷢ���¼�; OnAfterDeleteRow
  this.fireEvent(this.OnAfterDeleteRow, new Array(this, iRowIndex));
  return true;
}
//----------------------------------------------------------------------
//private; ��Ӧ OuterPanel.onkeydown �¼��Ĵ�����.
//����ֵ: void;
function Free_EditBox_OnKeyDown_Dispose(oBox){
  if (event.shiftKey) return;
  var viKey= event.keyCode;
  if (viKey== 9) viKey= 13;

  var viIndex= this.oTabIndexMap.get(oBox.getFieldName());
  if (viIndex== null) return;
  var viNewIndex= viIndex;
  var vtIsSetNewBoxFocus= false;

  if (viKey== 37){    //��;
    if (event.ctrlKey== false || event.altKey) return;
    viNewIndex= this.getVisibleIndex(viIndex, -1);
    if (viNewIndex< 0) return;
    vtIsSetNewBoxFocus= true;
  }else if (viKey== 39){    //��;
    if (event.ctrlKey== false || event.altKey) return;
    viNewIndex= this.getVisibleIndex(viIndex, 1);
    if (viNewIndex>= this.ax2vTabIndexQueue.length) return;
    vtIsSetNewBoxFocus= true;
  }else if (viKey== 13){    //�س�����;
    if (event.ctrlKey || event.altKey) return;
    viNewIndex= this.getVisibleIndex(viIndex, 1);
    if (viNewIndex>= this.ax2vTabIndexQueue.length) return;
    vtIsSetNewBoxFocus= true;
  }

  if (vtIsSetNewBoxFocus){
    var voNewBox= this.ax2vTabIndexQueue[viNewIndex][1];
    if (voNewBox== null) return;
    voNewBox.setFocus();
    this.oCurEditBox= voNewBox;
  }
  return;
}
//----------------------------------------------------------------------
//private; ��ȡ���ӵı༭�����;
//����ֵ: �ɹ�: index; ����: -1;
function Free_getVisibleIndex(iOriginIndex, iStep){
  var viNewIndex= iOriginIndex;
  if (iStep== null || iStep== 0) return viNewIndex;
  var viCount= this.ax2vTabIndexQueue.length;
  var voBox= null;
  while(true){
    viNewIndex= viNewIndex+ iStep;
    if ((iStep< 0 && viNewIndex< 0)
        || (iStep> 0 && viNewIndex>= viCount)){
      viNewIndex= iOriginIndex;
      break;
    }
    voBox= this.ax2vTabIndexQueue[viNewIndex][1];
    if (voBox.isVisible() && voBox.isReadOnly()== false) break;
  }
  return viNewIndex;
}
//----------------------------------------------------------------------
//public; ���ý���.
//����ֵ: void;
function Free_setFocus(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setFocus");
  if (PF.isValidArray(this.ax2vTabIndexQueue)== false) return;
  if (this.oCurEditBox== null) this.oCurEditBox= this.ax2vTabIndexQueue[0][1];
  this.oCurEditBox.setFocus();
  return;
}
//----------------------------------------------------------------------]
//public;
function Free_getTableName(){
  return this.sTableName;
}
//----------------------------------------------------------------------]
//public;
function Free_setTableName(sTable){
  this.sTableName= sTable;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: void;
function Free_setReadOnly(tIsReadOnly){
  var vaoBox= this.getAllEditBox();
  for (var i= 0, len= vaoBox.length; i< len; i++){
    if (vaoBox[i]== null) continue;
    vaoBox[i].setReadOnly(tIsReadOnly);
  }
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: true/false;
function Free_isReadOnly(){
  var vaoBox= this.getAllEditBox();
  for (var i= 0, len= vaoBox.length; i< len; i++){
    if (vaoBox[i]== null) continue;
    if (vaoBox[i].isReadOnly()== false) return false;
  }
  return true;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: void;
function Free_setFieldReadOnly(sFieldName, tIsReadOnly){
  var voBox= this.getEditBox(sFieldName);
  if (voBox!= null){
    voBox.setReadOnly(tIsReadOnly);
  }
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: true/false;
function Free_isFieldReadOnly(sFieldName){
  var voBox= this.getEditBox(sFieldName);
  if (voBox== null) return false;
  voBox.isReadOnly();
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: void;
function Free_setFieldVisible(sFieldName, tIsVisible){
  var vsCapId= this.makeCaptionId(sFieldName);
  var vsBoxTDId= this.makeBoxTDId(sFieldName);
  if (vsCapId== null || vsCapId== "") return;
  if (vsBoxTDId== null || vsBoxTDId== "") return;
  var voCap= document.all(vsCapId);
  var voBoxTD= document.all(vsBoxTDId);
  var voBox= this.getEditBox(sFieldName);
  if (voCap!= null){
    voCap.style.display= (tIsVisible)? "": "none";
  }
  if (voBoxTD!= null){
    voBoxTD.style.display= (tIsVisible)? "": "none";
  }
  if (voBox!= null){
    voBox.setVisible(tIsVisible);
  }
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//return: true/false;
function Free_isFieldVisible(sFieldName){
  var voBox= this.getEditBox(sFieldName);
  if (voBox== null) return false;
  return voBox.isVisible();
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: void;
function Free_setVisible(tIsVisible){
  var vasField= this.getFieldNames();
  for (var i= 0, len= vasField.length; i< len; i++){
    this.setFieldVisible(vasField[i], tIsVisible);
  }
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: true/false;
function Free_isVisible(){
  var vasField= this.getFieldNames();
  for (var i= 0, len= vasField.length; i< len; i++){
    if (this.isFieldVisible(vasField[i])) return true;
  }
  return false;
}
//----------------------------------------------------------------------
//private;
//return: id string;
function Free_makeCaptionId(sField){
  var voBox= this.getEditBox(sField);
  if (voBox== null) return null;
  return "label_"+ voBox.getOuterPanel().id;
}
//----------------------------------------------------------------------
//private;
//return: id string;
function Free_makeBoxTDId(sField){
  var voBox= this.getEditBox(sField);
  if (voBox== null) return null;
  return "editbox_"+ voBox.getOuterPanel().id;
}
//----------------------------------------------------------------------
//public;
//return: string / null;
function Free_getFieldCaption(sField){
  var voEle= this.getFieldCaptionElement(sField);
  if (voEle== null) return null;
  var vsCap= voEle.innerText;
  return vsCap;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Free_setFieldCaption(sField, sValue){
  var voEle= this.getFieldCaptionElement(sField);
  if (voEle== null) return null;
  voEle.innerText= sValue;
}
//----------------------------------------------------------------------
//public;
//return: element;
function Free_getFieldCaptionElement(sField){
  if (sField== null) return null;
  var vsCapId= this.makeCaptionId(sField);
  if (vsCapId== null) return null;
  var voEle= document.all(vsCapId);
  if(voEle == null){
  	vsCapId= "label_" + this.getTableName() + "_" + sField;
  	if (vsCapId== null) return null;
  	voEle= document.all(vsCapId);
  }
  return voEle;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
function Free_DataXML_OnRowsInserted(oSender, sTable, iRow){
  if (this.getTableName()!= sTable) return;
  if (!this.isValidRow(this.getCurRowIndex())
      && DataTools.getTableRowCount(this.getTableName())== 1){
    var vasField= this.getFieldNames();
    for (var i= 0; i< vasField.length; i++){
      var voBox= this.getEditBox(vasField[i]);
      DataTools.setValue(this.getTableName(), 0, vasField[i], voBox.getValue());
    }
    this.setCurRow(0);
  }
}
//----------------------------------------------------------------------
function Free_DataXML_OnRowsDelete(oSender, sTable, iRow){
  if (this.getTableName()!= sTable) return;
  if (DataTools.getTableRowCount(this.getTableName())<= 0){
    this.iCurRow= -1;
  }
}
//----------------------------------------------------------------------
//public; ����EditBox ������OnChange�¼�.
//����:�ַ�������.
//����ֵ:void;
function Free_oEditBox_OnChange(oSender, sValue, sOldValue){
  var voEditBox= oSender;
  if (this.tIsSettingValue== false){
    var vsFieldName= voEditBox.getFieldName();
    this.setValueByRowFieldK(this.getCurRowIndex(), vsFieldName, sValue, false);
  }
	return;
}
//----------------------------------------------------------------------
//public; ����EditBox ������OnKeyDown�¼�.
//����:�ַ�������.
//����ֵ:void;
function Free_oEditBox_OnKeyDown(oSender, oEvent){
  var voEditBox= oSender;
  this.EditBox_OnKeyDown_Dispose(voEditBox);
	return;
}
//----------------------------------------------------------------------

function Free_release() {
	var vaoEditBox= this.oEditBoxMap.getAllItem();
	if (vaoEditBox != null) {
		for (var i = 0; i < vaoEditBox.length; i++) {
			var voBox= vaoEditBox[i];
			voBox.release();
			vaoEditBox[i] = null;
		}
	}
	Base_release.call(this);
}



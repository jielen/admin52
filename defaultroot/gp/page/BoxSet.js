/* $Id: BoxSet.js,v 1.2 2008/06/02 13:39:03 huangcb Exp $ */
/*
Title: gp.page.BoxSet
Description: 输入框集;
Company: 用友政务
Date: 2006-03-12
Author: leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数;
function BoxSet(){
  //1.超类 =function();
  Free.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.BoxSet";
  this.RELA_OBJ_TYPE_NONE= "none";
  this.RELA_OBJ_TYPE_GRID= "grid";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterPanel= null; //private;
  this.oEditBoxIdSpan= null; 
  this.oGrid= null;  //private;

  this.tHasInit= false;    //对象是否被始化的标志;
  
  //private;
  this.tIsActive= false;

  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.make= BoxSet_make;
  this.init= BoxSet_init;
  this.getRelaObjId= BoxSet_getRelaObjId;
  this.getRelaObjType= BoxSet_getRelaObjType;
  this.getTableName= BoxSet_getTableName;
  this.setTableName= BoxSet_setTableName;
  this.getCompoName= BoxSet_getCompoName;
  this.getTabIndex = BoxSet_getTabIndex;
  this.isFromDB= BoxSet_isFromDB;

  //private;
  this.makeEditBox= BoxSet_makeEditBox;
  this.relaBoxSet= BoxSet_relaBoxSet;
  this.readOnlyWithRelaObj= BoxSet_readOnlyWithRelaObj;
  this.eventAnswer_OnMouseDown= BoxSet_EventAnswer_OnMouseDown;
  this.eventAnswer_OnKeyDown= BoxSet_EventAnswer_OnKeyDown;
  this.eventAnswer_OnEnterRow= BoxSet_EventAnswer_Free_OnEnterRow;
  this.eventAnswer_OnBeforeInsertRow= BoxSet_EventAnswer_Free_OnBeforeInsertRow;
  this.eventAnswer_OnBeforeDeleteRow= BoxSet_EventAnswer_Free_OnBeforeDeleteRow;
  this.eventAnswer_OnBeforeUpdate= BoxSet_EventAnswer_Free_OnBeforeUpdate;
  this.eventAnswer_OnAfterUpdate= BoxSet_EventAnswer_Free_OnAfterUpdate;
  this.findActivityFields= BoxSet_findActivityFields;
  
  this.release = BoxSet_release;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function BoxSet_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  
  var time1= Dev.getTime();
  
  Free_init.call(this, false);

  Dev.addNote("Free_init "+ this.getTableName()+ ": ", Dev.getSecondMargin(time1, Dev.getTime()));
  var time1= Dev.getTime();

  if (PF.isEmpty(this.getTableName())){
    this.setInitMark();
    return true;
  }
  
  if (!PF.isEmpty(this.getRelaObjId()) && this.getRelaObjType()!= this.RELA_OBJ_TYPE_NONE){
    this.oGrid= PageX.getCtrlObj(this.getRelaObjId());
    this.oGrid.addListener(new Listener(this.oGrid.OnEnterRow, BoxSet_EventAnswer_Grid_OnEnterRow, this));
    this.oGrid.addListener(new Listener(this.oGrid.OnAfterUpdate, BoxSet_EventAnswer_Grid_OnAfterUpdate, this));
    this.oGrid.addListener(new Listener(this.oGrid.OnAfterInsertRow, BoxSet_EventAnswer_Grid_OnAfterInsertRow, this));
    this.oGrid.addListener(new Listener(this.oGrid.OnAfterDeleteRow, BoxSet_EventAnswer_Grid_OnAfterDeleteRow, this));
    this.oGrid.addListener(new Listener(this.oGrid.OnLoadData, BoxSet_EventAnswer_Grid_OnLoadData, this));
    this.oGrid.addListener(new Listener(this.oGrid.OnColVisibleChange, BoxSet_EventAnswer_Grid_OnColVisibleChange, this));
    if (DataTools.getTableRowCount(this.getTableName())<= 0){
      this.setReadOnly(true);
    }
  }
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 生成 BoxSet 的 HTML DOM 对象；
//return:成功: true, 失败: false;
function BoxSet_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;
  this.oEditBoxIdSpan= this.oOuterPanel.all("EditBoxIdSpan_"+ sId);
  this.oOuterPanel.oOwner= this;
  this.oEditBoxIdSpan.oOwner= this;
  return true;
}
//----------------------------------------------------------------------
//public; 生成 BoxSet 的 HTML DOM 对象；
//return: void;
function BoxSet_makeEditBox(){
  if (this.oEditBoxIdSpan== null) return;
  for (var i= 0; i< this.oEditBoxIdSpan.childNodes.length; i++){
    var vsId= this.oEditBoxIdSpan.childNodes[i].editboxid;
    var voBox= PageX.getCtrlObj(vsId);
    if (voBox.oOuterObj!= null) continue;
    if (!voBox.isFreeMember()) continue;
    if (!PF.isEmpty(voBox.getGroupId())) continue;
    this.addEditBox(voBox);
  }
}
//----------------------------------------------------------------------
//private; 生成 BoxSet 的 HTML DOM 对象;
//return: void;
function BoxSet_relaBoxSet(sId){
  var voOuterPanel= document.all(sId);
  if (voOuterPanel== null) return;
  voOuterPanel.oOwner= PageX.getBoxSet(this.getTableName(), this.getRelaObjType());
  PageX.regCtrlObj(sId, this);
  this.oEditBoxIdSpan= voOuterPanel.all("EditBoxIdSpan_"+ sId);
  this.makeEditBox();
}
//----------------------------------------------------------------------
//public;
function BoxSet_getRelaObjId(){
  return this.oOuterPanel.relaobjid;
}
//----------------------------------------------------------------------
//public;
function BoxSet_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public;
function BoxSet_setTableName(sTableName){
  this.oOuterPanel.tablename= sTableName;
}
//----------------------------------------------------------------------
//public;
function BoxSet_getCompoName(){
  return this.oOuterPanel.componame;
}
//----------------------------------------------------------------------
//public;
function BoxSet_getRelaObjType(){
  return this.oOuterPanel.relaobjtype;
}
//----------------------------------------------------------------------
//public;
function BoxSet_getTabIndex(){
  return this.oOuterPanel.tabindex
}
//----------------------------------------------------------------------
//public;
function BoxSet_isFromDB(){
  return PF.parseBool(this.oOuterPanel.isfromdb);
}
//----------------------------------------------------------------------
//private;
function BoxSet_readOnlyWithRelaObj(){
  if (PF.isEmpty(this.getRelaObjId()) 
      || this.getRelaObjType()== this.RELA_OBJ_TYPE_NONE){
    return;
  }
  var vasField= this.getFieldNames();
  for (var i= 0; i< vasField.length; i++){
    var voCol= this.oGrid.getCol(this.oGrid.getColIndexByField(vasField[i]));
    this.setFieldReadOnly(vasField[i], PF.parseBool(voCol.isreadonly));
  }
}
//----------------------------------------------------------------------
//private;
//return: field array;
function BoxSet_findActivityFields(iRow){
  if (!this.tIsActive) return null;
  var vasField= new Array();
  var vaoBox= this.getAllEditBox();
  for (var i= 0, len= vaoBox.length; i< len; i++){
    var v1= DataTools.getValue(this.getTableName(), iRow, vaoBox[i].getFieldName());
    var v2= vaoBox[i].getValue();
    if (v1!= v2){
      vasField[vasField.length]= vaoBox[i].getFieldName();
    }
  }
  return vasField;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_OnMouseDown(oSender, oEvent){
  this.tIsActive= true;
}
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_OnKeyDown(oSender, oEvent){
  this.tIsActive= true;
}
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_Grid_OnEnterRow(oSender, oNewRow, oOldRow){
  if (oOldRow!= null){
    var vasField= this.findActivityFields(oOldRow.rowIndex);
    if (PF.isValidArray(vasField)){
      var vasOldValue= new Array();
      var vasValue= new Array();
      for (var i= 0, len= vasField.length; i< len; i++){
        var voBox= this.getEditBox(vasField[i]);
        vasValue[i]= voBox.getValue();
        vasOldValue[i]= voBox.sOldValue;
      }
      for (var i= 0, len= vasField.length; i< len; i++){
        BoxSet_EventAnswer_Free_OnBeforeUpdate(this, oOldRow.rowIndex, vasField[i], vasValue[i], vasOldValue[i]);
      }
    }
  }
  
  var voGrid= oSender;
  var viRow= voGrid.getDataRowX(oNewRow.rowIndex);
  this.iCurRow= -1;
  this.setCurRow(viRow);
}
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_Free_OnEnterRow(oSender, iNewRow, iOldRow){
  if (this.oGrid== null) return;
  var voFree= oSender;
  if (!PF.isEmpty(this.getRelaObjId()) && this.getRelaObjType()!= this.RELA_OBJ_TYPE_NONE){
    if (this.oGrid.getCurRowIndex()== this.getCurRowIndex()) return;
    this.oGrid.setCurRow(iNewRow);
    this.readOnlyWithRelaObj();
  }
}
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_Free_OnBeforeInsertRow(oSender, iRow){
  if (this.oGrid== null) return;
  var voFree= oSender;
  voFree.abortEvent(true);
  this.oGrid.insertRow(iRow);
}
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_Free_OnBeforeDeleteRow(oSender, iRow){
  if (this.oGrid== null) return;
  var voFree= oSender;
  voFree.abortEvent(true);
  this.oGrid.deleteRow(iRow);
}
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_Free_OnBeforeUpdate(oSender, iRow, sField, sValue, sOldValue){
  if (this.oGrid== null) return;
  oSender.tIsActive= false;
  if (oSender.oGrid.CLASSNAME!= "gp.page.DataGrid") return;
  oSender.oGrid.setValueByRowField(iRow, sField, sValue);
  var voFree= oSender;
  voFree.abortEvent(true);
}
//----------------------------------------------------------------------
//private;
function BoxSet_EventAnswer_Free_OnAfterUpdate(oSender, iRow, sField, sValue, sOldValue){
  if (this.oGrid== null) return;
  this.oGrid.loadRow(iRow);
}
//----------------------------------------------------------------------
function BoxSet_EventAnswer_Grid_OnAfterUpdate(oSender, iRow, sField, sValue, sOldValue){
  this.loadRow(iRow);
}
//----------------------------------------------------------------------
function BoxSet_EventAnswer_Grid_OnAfterInsertRow(oSender, iRow){
  if (DataTools.getTableRowCount(this.getTableName())<= 0){
    this.setReadOnly(true);
  }else{
    this.readOnlyWithRelaObj();
  }
}
//----------------------------------------------------------------------
function BoxSet_EventAnswer_Grid_OnAfterDeleteRow(oSender, iRow){
  if (DataTools.getTableRowCount(this.getTableName())<= 0){
    this.setReadOnly(true);
    this.clear();
  }else{
    this.readOnlyWithRelaObj();
  }
}
//----------------------------------------------------------------------
function BoxSet_EventAnswer_Grid_OnLoadData(oSender){
  if (DataTools.getTableRowCount(this.getTableName())<= 0){
    this.setReadOnly(true);
    this.clear();
  }else{
    this.readOnlyWithRelaObj();
    this.iCurRow= -1;
  }
}
//----------------------------------------------------------------------
function BoxSet_EventAnswer_Grid_OnColVisibleChange(oSender, sFieldName, tIsVisible){
  if (!PF.parseBool(this.oOuterPanel.issynchfieldvisible)) return;
  this.setFieldVisible(sFieldName, tIsVisible);
}
//----------------------------------------------------------------------

function BoxSet_release() {
	var editBoxSpan = this.oEditBoxIdSpan;
	if (editBoxSpan != null) {
		editBoxSpan.oOwner = null;
	}
	Free_release.call(this);
}



/* $Id: FillValueFromBoxSet.js,v 1.6 2008/09/02 09:18:12 zhuyulong Exp $ */
/*
Title: gp.logiclib.FillValueFromBoxSet
Description: 
Company: 用友政务
Date: 2004/08/19
Author: leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function FillValueFromBoxSet(){
  //1.超类 =function();

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.logiclib.FillValueFromBoxSet";

  //3.变量声明区 =function();
  this.sUID= "";
  
  //标记参数变量;
  this.sTableName= null;
  this.sBoxSetId= null;
  
  //通用变量;
  this.oBoxSet= null;
  this.oSearch= null;
  this.oCondFieldMap= new Map();

  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.doLogic= FillValueFromBoxSet_doLogic;

  //private;
  this.init= FillValueFromBoxSet_init;
  this.synchGrid= FillValueFromBoxSet_synchGrid;
  this.setTableName= FillValueFromBoxSet_setTableName;
  this.getTableName= FillValueFromBoxSet_getTableName;
  this.setBoxSetId= FillValueFromBoxSet_setBoxSetId;
  this.getBoxSetId= FillValueFromBoxSet_getBoxSetId;
  this.checkCondField= FillValueFromBoxSet_checkCondField;
  this.setManagedFields = FillValueFromBoxSet_setManagedFields;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public;
function FillValueFromBoxSet_doLogic(){
  this.init();
}
//----------------------------------------------------------------------
//private;
function FillValueFromBoxSet_init(){
  //alert("FillValueFromBoxSet_init();");
  if (this.sUID== null || this.sUID== "") this.sUID= PF.getUID();
  this.oBoxSet= PageX.getCtrlObj(this.getBoxSetId());
  if (this.oBoxSet!= null && PF.isEmpty(this.getTableName())){
    this.setTableName(this.oBoxSet.getTableName());
  }
  var voGrid= PageX.getAreaGrid(this.getTableName());
  if (voGrid== null) return;
  
//  this.initCondFields();

//如下两个监听有必要吗？表格已经插入数据，为什么还需要把EditBox里的数据放入表格？
  voGrid.addListener(new Listener(voGrid.OnAfterInsertData, FillValueFromBoxSet_Grid_OnAfterInsertData, this));
  voGrid.addListener(new Listener(voGrid.OnAfterInsertRow, FillValueFromBoxSet_Grid_OnAfterInsertRow, this));
  var voDM= PageX.getDataManager();
  if (voDM!= null){
    voDM.addListener(new Listener(voDM.OnDataReadyStateChange, FillValueFromBoxSet_DataXML_OnDataReadyStateChange, this));
  }
  this.oBoxSet.addListener(new Listener(this.oBoxSet.OnBeforeUpdate, FillValueFromBoxSet_BoxSet_OnBeforeUpdate, this));
  this.oBoxSet.addListener(new Listener(this.oBoxSet.OnAfterUpdate, FillValueFromBoxSet_BoxSet_OnAfterUpdate, this));
}
//----------------------------------------------------------------------
//private;
function FillValueFromBoxSet_synchGrid(sField){
  var voGrid= PageX.getAreaGrid(this.getTableName());
  if (voGrid== null) return;
  var vaoBox= this.oBoxSet.getAllEditBox();
  for (var i= 0; i< vaoBox.length; i++){
    var vsField= vaoBox[i].getFieldName();
    if (sField!= null && vsField!= sField) continue;
    
    if (voGrid.isValidFieldName(vsField)){
      voGrid.setColValue(vsField, vaoBox[i].getValue());
    }else{
      DataTools.setColValue(voGrid.getTableName(), vsField, vaoBox[i].getValue());
    }
  }
}
//----------------------------------------------------------------------
//private;
//return: true/false;
var map = new Map();
function FillValueFromBoxSet_checkCondField(oBox, sOldValue,sFieldName){
  if (DataTools.getTableRowCount(this.getTableName())> 0){
    var voField= DataTools.getTableMeta(this.getTableName()).selectSingleNode("fields/field[@name='"+ sFieldName+ "']");
    var voForeignname=voField.getAttribute("foreignname");
    if(map.get(voForeignname) == null && voForeignname !=""){
	   	alert("目标表中已有数据,不能更改查询条件项;");
	   	map.clear();
	   	map.put(voForeignname,"1");
    }else if(voForeignname ==""){
    	alert("目标表中已有数据,不能更改查询条件项;");
		map.clear();
    }
    var vtIsFire= oBox.isFireOnChange();
    oBox.setFireOnChange(false);
    oBox.setValue(sOldValue);
    oBox.setFireOnChange(vtIsFire);
    DataTools.setValue(this.getTableName(),0,sFieldName,sOldValue);
    
	var rm=DataTools.oDataSourceFrame.PageX.getRowManager();
	var voAction ="";
	if(rm !=null){
		voAction = rm.sMainTableAction;
		if("insert"==voAction) {
		     DataTools.oDataSourceFrame.PageX.tIsChanged = true;
		}else{
		     DataTools.oDataSourceFrame.PageX.tIsChanged = false;
		}
	}
    return false;
  }
  return true;
}
//----------------------------------------------------------------------
//public;
function FillValueFromBoxSet_setBoxSetId(value){
  this.sBoxSetId= value;
}
//----------------------------------------------------------------------
//public;
function FillValueFromBoxSet_getBoxSetId(){
  return this.sBoxSetId;
}
//----------------------------------------------------------------------
//public;
function FillValueFromBoxSet_setTableName(value){
  this.sTableName= value;
}
//----------------------------------------------------------------------
//public;
function FillValueFromBoxSet_getTableName(){
  return this.sTableName;
}
function FillValueFromBoxSet_setManagedFields(value){
	if (value == "") return;
	var vasBoxIds = value.split(/\s/);
  if(vasBoxIds != null){
    for (var i= 0; i< vasBoxIds.length; i++){
      var voBox= PageX.getCtrlObj(vasBoxIds[i]);
      if (!PageX.isEditBox(voBox)) continue;
      this.oCondFieldMap.put(voBox.getTableName()+ "_"+ voBox.getFieldName(), i);
    }
  }
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private;
function FillValueFromBoxSet_DataXML_OnDataReadyStateChange(oSender, sTable, oEvent){
  if (this.oBoxSet.getTableName()!= sTable) return;
  this.synchGrid();
}
//----------------------------------------------------------------------
//private;
function FillValueFromBoxSet_Grid_OnAfterInsertData(oSender, iFromRow){
  var voRM= PageX.getRowManager();
  var vsRMKey= voRM.updateAction(false, false, false);
  this.synchGrid();
  voRM.restoreAction(vsRMKey);
  voRM.clearAction(vsRMKey);
}
//----------------------------------------------------------------------
//private;
function FillValueFromBoxSet_Grid_OnAfterInsertRow(oSender, iRow){
  var voRM= PageX.getRowManager();
  var vsRMKey= voRM.updateAction(false, false, false);
  this.synchGrid();
  voRM.restoreAction(vsRMKey);
  voRM.clearAction(vsRMKey);
}
//----------------------------------------------------------------------
//private;
function FillValueFromBoxSet_BoxSet_OnBeforeUpdate(oSender, iRowIndex, sFieldName, sValue, sOldValue){
  //alert("FillValueFromBoxSet_BoxSet_OnBeforeUpdate();");
  //alert(oSender.getTableName()+ "_"+ sFieldName);
  if (this.oCondFieldMap.isContain(oSender.getTableName()+ "_"+ sFieldName)){
    if (!this.checkCondField(oSender.getEditBox(sFieldName), sOldValue,sFieldName)){
      oSender.abortEvent(true);
    }
  }
}
//----------------------------------------------------------------------
//private;
function FillValueFromBoxSet_BoxSet_OnAfterUpdate(oSender, iRowIndex, sFieldName, sValue, sOldValue){
  this.synchGrid(sFieldName);
}
//----------------------------------------------------------------------


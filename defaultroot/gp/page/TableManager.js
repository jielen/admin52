/* $Id: TableManager.js,v 1.2 2008/06/02 13:41:19 huangcb Exp $ */
/*
Title: gp.page.TableManager
Description: 对页面中的 table 的相互关系进行管理;
Company: 用友政务
Date: 2004-11-17
Author: leidh;

允许对象:
gp.page.Grid;
gp.page.DataGrid;
gp.page.SelectGrid;
gp.page.Normal;
gp.page.Free;

公共属性:

公共方法:
getTableName();
getCurRowIndex();
setValueByRowField(iRowIndex, sFieldName, sValue);
deleteRow(iRowIndex);
isValidFieldName(sFieldName);
getEffectRows(sEffectValue);          //仅需 Grid家族 提供;
setRowVisible(iRowIndex, tIsVisible); //仅需 Grid家族 提供;

公共事件：
OnBeforeDeleteRow:  //参数: oSender, iRowIndex;
OnAfterDeleteRow:   //参数: oSender, iRowIndex;
OnAfterUpdate:   //参数: oSender, sFieldName, sValue, sOldValue;
OnAfterInsertRow:   //参数: oSender, iRowIndex;          //仅需 Grid家族 提供;
OnEnterRow:         //参数: oSender, oNewRow, oOldRow;   //仅需 Grid家族 提供;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function TableManager(){
  //1.超类 =function();

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.TableManager";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部对象;

  this.oCtrlRelaMap= new Map();    //private; key:tablename; value:ctrl object;
  this.oDeleteMap= new Map();      //private; 用于删除操作;

  this.tHasInit= false;    //对象是否被始化的标志;

  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.init= TableManager_init;
  //以上已完成文档
  
  this.autoEnterFirstRow= TableManager_autoEnterFirstRow;

  //private;
  this.initMeta= TableManager_initMeta;
  this.makeCtrlRela= TableManager_makeCtrlRela;
  this.listenCtrl= TableManager_listenCtrl;
  this.setValue= TableManager_setValue;
  this.getEffectField= TableManager_getEffectField;
  this.getCtrlObj= TableManager_getCtrlObj;
  this.getEffectChildRowX= TableManager_getEffectChildRowX;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function TableManager_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (this.initMeta()== false) return false;

  if (tIsFinalClass){
    this.tHasInit= true;
  }
  return true;
}
//----------------------------------------------------------------------
//private; 从 TableMetaXML 中获取初始化数据;
//返回值: 成功: true, 失败: false;
function TableManager_initMeta(){
  var vaoTableMeta= DataTools.getCompoMeta().selectNodes("tables/table");
  var voTable= null;
  for (var i= 0, len= vaoTableMeta.length; i< len; i++){
    voTable= vaoTableMeta[i];
    this.makeCtrlRela(voTable, null);
  }
  this.listenCtrl();
  return true;
}
//----------------------------------------------------------------------
//private; 从 TableMetaXML 中获取初始化数据;
//返回值: 成功: true, 失败: false;
function TableManager_makeCtrlRela(oTableMeta, oParentTableMeta){
  if (oTableMeta== null) return false;

  var voRela= new Object;
  voRela.oSelf= null;
  voRela.oParent= null;
  voRela.aoChild= new Array();

  var vsTable= oTableMeta.getAttribute("name");
  voRela.oSelf= this.getCtrlObj(vsTable);
  if (voRela.oSelf != null){
    this.oCtrlRelaMap.put(voRela.oSelf.getTableName(), voRela);
    if (oParentTableMeta!= null){
      vsTable= oParentTableMeta.getAttribute("name");
      voRela.oParent= this.getCtrlObj(vsTable);
    }

    var vaoTable= oTableMeta.selectNodes("table");
    var voTable= null;
    for (var i= 0, len= vaoTable.length; i< len; i++){
      voTable= vaoTable[i];
      vsTable= voTable.getAttribute("name");
      voRela.aoChild[voRela.aoChild.length]= this.getCtrlObj(vsTable);

      this.makeCtrlRela(voTable, oTableMeta);
    }
  }
  return true;
}
//----------------------------------------------------------------------
//private; 根据表名获取 Grid Object;
//返回值: 成功: Grid Object, 失败: null;
function TableManager_getCtrlObj(sTableName){
  if (sTableName== null) return null;
  var vaoCtrl= PageX.getAllCtrlObj();
  var voCtrl= null;
  for (var i= 0, len= vaoCtrl.length; i< len; i++){
    voCtrl= vaoCtrl[i];
    if (voCtrl== null) continue;
    if ((voCtrl.CLASSNAME== "gp.page.Grid"
        || voCtrl.CLASSNAME== "gp.page.DataGrid"
        || voCtrl.CLASSNAME== "gp.page.SelectGrid"
        || voCtrl.CLASSNAME== "gp.page.Free"
        || voCtrl.CLASSNAME== "gp.page.Normal")
        && voCtrl.getTableName()== sTableName){
      break;
    }
    voCtrl= null;
  }
  return voCtrl;
}
//----------------------------------------------------------------------
//private; 对 this.oCtrlRelaMap 中存在的 Grid Object 进行事件侦听;
//返回值: 成功: true, 失败: false;
function TableManager_listenCtrl(){
  //alert("TableManager_listenCtrl();");
  var vaoCtrl= this.oCtrlRelaMap.getAllItem();
  var voParent= null;
  var voChild= null;
  for (var i= 0, len= vaoCtrl.length; i< len; i++){
    voParent= vaoCtrl[i].oParent;
    voSelf= vaoCtrl[i].oSelf;
    vaoChild= vaoCtrl[i].aoChild;

    if (voParent!= null){
      if (PageX.isGrid(voParent)){
    	  voParent.addListener(new Listener(voParent.OnEnterRow, TableManager_Ctrl_OnEnterRow, this));
    	}
    	voParent.addListener(new Listener(voParent.OnBeforeDeleteRow, TableManager_Ctrl_OnBeforeDeleteRow, this));
    	voParent.addListener(new Listener(voParent.OnAfterDeleteRow, TableManager_Ctrl_OnAfterDeleteRow, this));
    	voParent.addListener(new Listener(voParent.OnAfterUpdate, TableManager_Ctrl_OnAfterUpdate, this));
  	}

    if (voSelf!= null){
      if (PageX.isGrid(voSelf)){
      	voSelf.addListener(new Listener(voSelf.OnAfterInsertRow, TableManager_Ctrl_OnAfterInsertRow, this));
    	}
    }
  }
  return true;
}
//----------------------------------------------------------------------
//private; 获取子表的影响行序号组;
//返回值: 成功: 影响行序号组, 失败: null;
function TableManager_getEffectChildRowX(oParent, oChild, iParentRow){
  //alert("TableManager_getEffectChildRowX();");
  if (oParent== null) return null;
  if (oChild== null) return null;
  if (iParentRow== null) return null;

  var vaiRow= new Array();
  if (PageX.isGrid(oParent) && PageX.isGrid(oChild)){
    var vsEffectField= this.getEffectField(oChild.getTableName());
    var vsEffectValue= DataTools.getValue(oParent.getTableName(), iParentRow, vsEffectField);
    if (vsEffectValue== null) return null;
    vaiRow= oChild.getEffectRows(vsEffectValue);
  }else{
    if (PageX.isGrid(oChild)){
      for (var x= 0, lenx= oChild.getRowCount(); x< lenx; x++){
        vaiRow[x]= x;
      }
    }else{
      vaiRow[0]= oChild.getCurRowIndex();
    }
  }
  return vaiRow;
}
//----------------------------------------------------------------------
//private; 设置值;
//返回值: void;
function TableManager_setValue(oCtrl, iRow, sField, sValue){
  if (oCtrl== null) return;
  if (PF.isEmpty(oCtrl.getTableName())) return;
  if (iRow== null) return;
  if (PF.isEmpty(sField)) return;
  if (PF.isEmpty(sValue)) return;
  if (oCtrl.isValidFieldName(sField)){
    oCtrl.setValueByRowField(iRow, sField, sValue);
  }else{
    DataTools.setValue(oCtrl.getTableName(), iRow, sField, sValue);
  }
}
//----------------------------------------------------------------------
//private;
//返回值: effect field/ "";
function TableManager_getEffectField(sTableName){
  var vsEffectField= PF.trim(DataTools.getCompoMeta().selectSingleNode("tables//table[@name='"+ sTableName+ "']").getAttribute("effectfield"));
  return vsEffectField;
}
//----------------------------------------------------------------------
//public; Grid 中自动进入第一行的处理;
//返回值: void;
function TableManager_autoEnterFirstRow(){
  var vasTable= DataTools.getTableNames();
  var voGrid= null;
  for (var i= 0; i< vasTable.length; i++){
    voGrid= PageX.getAreaGrid(vasTable[i]);
    if (voGrid== null) continue;
    if (voGrid.isEnterFirstRow()){
      var viFirstRow= voGrid.getDispRow(0);
      if (viFirstRow>= 0){
        var viCol= voGrid.getUsableCol(viFirstRow);
        if (viCol>= 0){
          voGrid.setCurCell(viFirstRow, viCol);
        }
        voGrid.setFocus();
      }
    }
  }
  return;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; Grid Object 的 OnEnterRow 事件.
//return: void;
function TableManager_Ctrl_OnEnterRow(oSender, oNewRow, oOldRow){
  var voCtrl= oSender;
  if (PageX.isGrid(voCtrl)== false) return;
  var voCtrlRela= this.oCtrlRelaMap.get(voCtrl.getTableName());
  if (voCtrlRela== null) return;
  var vaoChild= voCtrlRela.aoChild;
  var voRow= null;

  var voChild= null;
  for (var x= 0, lenx= vaoChild.length; x< lenx; x++){
    voChild= vaoChild[x];
    if (voChild== null) continue;

    if (oOldRow!= null){
      var vaiOldRow= this.getEffectChildRowX(voCtrl, voChild, oOldRow.rowIndex);
      if (vaiOldRow!= null){
        for (var i= 0, len= vaiOldRow.length; i< len; i++){
          voChild.setRowVisible(vaiOldRow[i], false);
        }
      }
    }

    var vaiNewRow= this.getEffectChildRowX(voCtrl, voChild, oNewRow.rowIndex);
    if (vaiNewRow!= null){
      for (var i= 0, len= vaiNewRow.length; i< len; i++){
        voChild.setRowVisible(vaiNewRow[i], true);
      }
    }
    
    var vsEffectField= this.getEffectField(voChild.getTableName());
    var vsEffectValue= DataTools.getValue(voCtrl.getTableName(), oNewRow.rowIndex, vsEffectField);
    voChild.sEffectValue= vsEffectValue;
  }
  
  return;
}
//----------------------------------------------------------------------
//private; Grid Object 的 OnBeforeDeleteRow 事件.
//return: void;
function TableManager_Ctrl_OnBeforeDeleteRow(oSender, iRowIndex){
  var voCtrl= oSender;
  var voCtrlRela= this.oCtrlRelaMap.get(voCtrl.getTableName());
  if (voCtrlRela== null) return;
  var vaoChild= voCtrlRela.aoChild;
  if (vaoChild== null || vaoChild.length== 0) return;

  var voMap= new Map();
  var voChild= null;
  for (var x= 0, lenx= vaoChild.length; x< lenx; x++){
    voChild= vaoChild[x];
    var vaiRow= this.getEffectChildRowX(voCtrl, voChild, iRowIndex);
    if (vaiRow== null) continue;
    voMap.put(x, new Array(voChild, vaiRow));
  }
  this.oDeleteMap.put(voCtrl.getTableName(), voMap);
  return;
}
//----------------------------------------------------------------------
//private; Grid Object 的 OnBeforeDeleteRow 事件.
//return: void;
function TableManager_Ctrl_OnAfterDeleteRow(oSender, iRowIndex){
  var voCtrl= oSender;
  var voMap= this.oDeleteMap.get(voCtrl.getTableName());
  if (voMap== null) return;

  var vavItem= voMap.getAllItem();
  var voChild= null;
  var vaiRow= new Array();
  for (var x= 0, lenx= vavItem.length; x< lenx; x++){
    voChild= vavItem[x][0];
    vaiRow= vavItem[x][1];
    if (voChild== null) continue;
    if (vaiRow== null) continue;
    vaiRow.sort(PF.compareInt);
    for (var i= vaiRow.length- 1; i>= 0; i--){
      voChild.deleteRow(vaiRow[i]);
    }
    voChild.sEffectValue= "";
  }
  voMap.clear();
  this.oDeleteMap.remove(voCtrl.getTableName());
  return;
}
//----------------------------------------------------------------------
//private; Grid Object 的 OnAfterUpdate 事件.
//return: void;
function TableManager_Ctrl_OnAfterUpdate(oSender, iRow, sFieldName, sValue, sOldValue){
  var voCtrl= oSender;
  var voCtrlRela= this.oCtrlRelaMap.get(voCtrl.getTableName());
  if (voCtrlRela== null) return;
  var vaoChild= voCtrlRela.aoChild;
  if (vaoChild== null || vaoChild.length== 0) return;

  var voField= DataTools.getTableMeta(voCtrl.getTableName()).selectSingleNode("fields/field[@name='"+ sFieldName+ "']");
  if (voField== null) return;
  if (PF.parseBool(voField.getAttribute("ispk"))== false) return;

  var vaiRow= new Array();
  var voChild= null;
  for (var x= 0, lenx= vaoChild.length; x< lenx; x++){
    voChild= vaoChild[x];
    if (PageX.isGrid(voChild)
        && sFieldName== this.getEffectField(voChild.getTableName())){
      vaiRow= voChild.getEffectRows(sOldValue);
    }else{
      vaiRow= this.getEffectChildRowX(voCtrl, voChild, voCtrl.getCurRowIndex());
    }
    if (vaiRow== null) continue;
    
    if (voChild.isValidFieldName(sFieldName)){
      for (var i= 0, len= vaiRow.length; i< len; i++){
        voChild.setValueByRowField(vaiRow[i], sFieldName, sValue);
      }
      
      if (sFieldName== voChild.sEffectField) voChild.sEffectValue= sValue;
    }else{
      for (var i= 0, len= vaiRow.length; i< len; i++){
        DataTools.setValue(voChild.getTableName(), vaiRow[i], sFieldName, sValue);
      }
    }
  }
  return;
}
//----------------------------------------------------------------------
//private; Grid Object 的 OnAfterInsertRow 事件.
//return: void;
function TableManager_Ctrl_OnAfterInsertRow(oSender, iRowIndex){
  var voCtrl= oSender;
  var voCtrlRela= this.oCtrlRelaMap.get(voCtrl.getTableName());
  if (voCtrlRela== null) return;

  var voParent= voCtrlRela.oParent;
  if (voParent== null) return;
  var voSelf= voCtrlRela.oSelf;
  var viParentRow= voParent.getCurRowIndex();
  var vasKeyField= DataTools.getKeyFieldNames(voParent.getTableName());
  var vaoKeyFieldValue= DataTools.getFieldValues(voParent.getTableName(), new Array(""+ viParentRow), vasKeyField);
  if (PF.isValidArray(vaoKeyFieldValue)== false) return;

  var vsField= "";
  var vsValue= "";
  for (var i= 0, len= vasKeyField.length; i< len; i++){
    vsField= vasKeyField[i];
    vsValue= vaoKeyFieldValue[0].get(vsField);
    this.setValue(voSelf, iRowIndex, vsField, vsValue);
  }
  return;
}
//----------------------------------------------------------------------



/*
Title: gp.page.DataGrid
Description:
数据表格类，用于显示 XML 数据，提供数据的访问，并对数据进行编辑。
Company: 用友政务
Author: leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function DataGrid(){
  //1.超类=function();
  Grid.call(this);

  //2.常量声明区=function();
  this.CLASSNAME= "gp.page.DataGrid";

  this.ACTION_BUTTON_PANEL_HEIGHT= 22;

  this.INPUT_STYLE_LIGHT_ROW= 0;
  this.INPUT_STYLE_TRANSPARENT= 1;

  //3.变量声明区=function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.iInputStyle= this.INPUT_STYLE_LIGHT_ROW;

  //this.aoEditBox= new Array(); //private; 输入框,每列一个;
  //this.aoLockedEditBox= new Array(); //private; 锁定表格的输入框,每列一个;
  this.oBoxMap= new Map();       //private;
  this.oLockedBoxMap= new Map(); //private;
  this.oCurEditBox= null;        //private; 当前的编辑框;

  this.iCurEditBoxLeft= 0; //private;
  this.iCurEditBoxTop= 0;  //private;
  this.oReadOnlyCellMap = new Map();  //private;存放只读单元格

  //4.事件声明区=function();
  this.OnBeforeUpdate= "OnBeforeUpdate";  //oSender, iRowIndex, sFieldName, sValue, sOldValue;
  this.OnAfterUpdate= "OnAfterUpdate";    //oSender, iRowIndex, sFieldName, sValue, sOldValue;
  this.OnCellClick= "OnCellClick";              //oSender, oCell, oEvent;
  this.OnCellDblClick= "OnCellDblClick";        //oSender, oCell, oEvent;

	//5.方法声明区= function();
	//public;
  this.clear= DataGrid_clear;
  this.getCurCell= DataGrid_getCurCell;
  this.getCurColIndex= DataGrid_getCurColIndex;
  this.getCurValue= DataGrid_getCurValue;
  this.getEditBox= DataGrid_getEditBox;
  this.getInputStyle= DataGrid_getInputStyle;
  this.hideFocusRow= DataGrid_hideFocusRow;
  this.init= DataGrid_init;
  this.isColReadOnly= DataGrid_isColReadOnly;
  this.isRowReadOnly= DataGrid_isRowReadOnly;
  this.resize= DataGrid_resize;
  this.setColReadOnly= DataGrid_setColReadOnly;
  this.setCurValue= DataGrid_setCurValue;
  this.setInputStyle= DataGrid_setInputStyle;
  this.setRowReadOnly= DataGrid_setRowReadOnly;
  this.setValue= DataGrid_setValue;
  this.setValueByCell= DataGrid_setValueByCell;
  this.setValueByRC= DataGrid_setValueByRC;
  this.setValueByRowField= DataGrid_setValueByRowField;
  this.setRowReadOnly= DataGrid_setRowReadOnly;
  this.isCellReadOnly= DataGrid_isCellReadOnly;
	this.setCellReadOnly = DataGrid_setCellReadOnly;
	this.lightFocusRow= DataGrid_lightFocusRow;

  this.isAppBtnVisible= DataGrid_isAppBtnVisible;
  this.isDelBtnVisible= DataGrid_isDelBtnVisible;
  this.isEditBtnVisible= DataGrid_isEditBtnVisible;
  this.isInsBtnVisible= DataGrid_isInsBtnVisible;
  this.isWritable= DataGrid_isWritable;
  this.make= DataGrid_make;
  this.setAppBtnVisible= DataGrid_setAppBtnVisible;
  this.setDelBtnVisible= DataGrid_setDelBtnVisible;
	this.setFocus= DataGrid_setFocus;
  this.setInsBtnVisible= DataGrid_setInsBtnVisible;
  this.setWritable= DataGrid_setWritable;
  //以上已进入文档;
  
  this.setReadOnly= DataGrid_setReadOnly;
  this.getCardFields= DataGrid_getCardFields;
  this.openCardPage= DataGrid_openCardPage;
  this.setCardColCount= DataGrid_setCardColCount;
  this.getCardColCount= DataGrid_getCardColCount;
  this.getEditBoxByCol= DataGrid_getEditBoxByCol;
  this.setValueByRowFieldK= DataGrid_setValueByRowFieldK;

	//private;
	this.setValueByRowField_UpdateCheckBox= DataGrid_setValueByRowField_UpdateCheckBox;
	this.resizeCurEditBox= DataGrid_resizeCurEditBox;
	this.eventAnswer_OnFocus= DataGrid_eventAnswer_OnFocus;
	this.eventAnswer_OnEnterCell= DataGrid_eventAnswer_OnEnterCell;
	this.eventAnswer_OnScroll= DataGrid_eventAnswer_OnScroll;
	this.eventAnswer_OnKeyDown= DataGrid_eventAnswer_OnKeyDown;
	this.eventAnswer_OnRowClick= DataGrid_eventAnswer_OnRowClick;
	this.eventAnswer_OnRowDblClick= DataGrid_eventAnswer_OnRowDblClick;
	this.eventAnswer_OnRowVisibleChange= DataGrid_eventAnswer_OnRowVisibleChange;
	this.eventAnswer_OnColVisibleChange= DataGrid_eventAnswer_OnColVisibleChange;
	this.eventAnswer_OnColWidthChange= DataGrid_eventAnswer_OnColWidthChange;
	this.eventAnswer_OnColIndexChange= DataGrid_eventAnswer_OnColIndexChange;
	this.eventAnswer_OnLoadData= DataGrid_eventAnswer_OnLoadData;
	this.eventAnswer_OnAfterInsertRow= DataGrid_eventAnswer_OnAfterInsertRow;
	this.eventAnswer_OnAfterDeleteRow= DataGrid_eventAnswer_OnAfterDeleteRow;
	this.setInputStyle_Box= DataGrid_setInputStyle_Box;
	this.adjustCurEditBoxReadOnly= DataGrid_adjustCurEditBoxReadOnly;
  this.enterCell= DataGrid_enterCell;
  this.outCell= DataGrid_outCell;
  this.makeEditBox= DataGrid_makeEditBox;
  this.makeEditBox2= DataGrid_makeEditBox2;
  
  this.release = DataGrid_release;
}
//----------------------------------------------------------------------
//6.方法区=function();
//----------------------------------------------------------------------
//public; 生成 DataGrid 的网页对象;
//返回值:成功: true, 失败: false;
function DataGrid_make(sId){
  if (Grid_make.call(this, sId)== false) return false;
	this.oAppendRowButton.onclick= DataGrid_oAppendRowButton_onclick;
	this.oInsertRowButton.onclick= DataGrid_oInsertRowButton_onclick;
	this.oDeleteRowButton.onclick= DataGrid_oDeleteRowButton_onclick;
  return true;
}
//----------------------------------------------------------------------
//private;
//return: Box/null;
function DataGrid_makeEditBox(sField){
  if (this.oBodyColGroup== null) return null;
  var viCol= this.getColIndexByField(sField);
  var voCol= this.oBodyColGroup.childNodes[viCol];
  if (voCol== null) return null;
  var voBox = this.makeEditBox2(voCol.editboxtype,voCol.editboxid);
  if (voBox== null) return null;
  voBox.make(voCol.editboxid);
  voBox.init();
  voBox.setPosition("absolute");
  voBox.isInGrid = true;
  voBox.oOuterObj= this;
  voBox.moveTo(-1000, -1000);
  voBox.addListener(new Listener(voBox.OnChange, DataGrid_eventAnswer_EditBox_OnChange, this));
  this.oBoxMap.put(sField, voBox);
  this.setInputStyle_Box(voBox, this.INPUT_STYLE_LIGHT_ROW);
  return voBox;
}
//----------------------------------------------------------------------
//private;
//return: Box/null;
function DataGrid_makeEditBox2(sBoxType,sid){
  var voBox= null;
  switch(sBoxType){
    case "TextBox":
      voBox= new TextBox(sid);
      break;
    case "TextAreaBox":
      voBox= new TextAreaBox(sid);
      break;
    case "PasswordBox":
      voBox= new PasswordBox(sid);
      break;
    case "NumericBox":
      voBox= new NumericBox(sid);
      break;
    case "PopupTextBox":
      voBox= new PopupTextBox(sid);
      break;
    case "ComboBox":
      voBox= new ComboBox(sid);
      break;
    case "ForeignBox":
      voBox= new ForeignBox(sid);
      break;
    case "DateBox":
      voBox= new DateBox(sid);
      break;
    case "DatetimeBox":
      voBox= new DatetimeBox(sid);
      break;
    case "FileBox":
      voBox= new FileBox(sid);
      break;
    case "ImageBox":
      voBox= new ImageBox(sid);
      break;
    default:
      alert("错误的输入框类型:\r\n"+ sBoxType);
  }
  return voBox;
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function DataGrid_init(tFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Grid_init.call(this,false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值:成功: true, 失败: false;
function DataGrid_resize(){
  if (this.tHasInit== false) return false;
  if (this.isEditBtnVisible()) this.iBottomMargin= this.ACTION_BUTTON_PANEL_HEIGHT;
  if (Grid_resize.call(this)== false) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//public; 获取当前单元格的值;
//返回值:成功: 当前单元格的值, 失败: null;
function DataGrid_isEditBtnVisible(){
  if (this.isAppBtnVisible()) return true;
  if (this.isInsBtnVisible()) return true;
  if (this.isDelBtnVisible()) return true;
  return false;
}
//----------------------------------------------------------------------
//public;
function DataGrid_isAppBtnVisible(){
  return PF.parseBool(this.oOuterPanel.isappendbutton);
}
//----------------------------------------------------------------------
//public;
function DataGrid_setAppBtnVisible(tIsAppendButton){
  this.oOuterPanel.isappendbutton= tIsAppendButton;
  this.oAppendRowButton.style.display= (this.isAppBtnVisible())? "": "none";
}
//----------------------------------------------------------------------
//public;
function DataGrid_isInsBtnVisible(){
  return PF.parseBool(this.oOuterPanel.isinsertbutton);
}
//----------------------------------------------------------------------
//public;
function DataGrid_setInsBtnVisible(tIsInsertButton){
  this.oOuterPanel.isinsertbutton= tIsInsertButton;
  this.oInsertRowButton.style.display= (this.isInsBtnVisible())? "": "none";
}
//----------------------------------------------------------------------
//public;
function DataGrid_isDelBtnVisible(){
  return PF.parseBool(this.oOuterPanel.isdeletebutton);
}
//----------------------------------------------------------------------
//public;
function DataGrid_setDelBtnVisible(tIsDeleteButton){
  this.oOuterPanel.isdeletebutton= tIsDeleteButton;
  this.oDeleteRowButton.style.display= (this.isDelBtnVisible())? "": "none";
}
//----------------------------------------------------------------------
//public; 获取当前单元格的值;
//返回值:成功: 当前单元格的值, 失败: null;
function DataGrid_getCurValue(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getValue");
  var vsValue= this.getValueByRC(this.iCurRow, this.iCurCol);
  return vsValue;
}
//----------------------------------------------------------------------
//public; 更改指定行号列名单元格的值.
//notUpdateRecordset:仅仅修改表格数据，不修改数据集，在Page4.saveBillK中用到
//返回值: void;
function DataGrid_setValueByRowField(iRowIndex, sFieldName, sValue,voRS){
  if (this.tHasInit== false) return;
  return this.setValueByRowFieldK(iRowIndex, sFieldName, sValue,true,voRS);
}
//----------------------------------------------------------------------
//public; 更改指定行号列名单元格的值.
//返回值: void;
function DataGrid_setValueByRowFieldK(iRowIndex, sFieldName, sValue, tIsUpdateEditBox,voRS){
  if (this.tHasInit== false) return;
  if (this.isValidRow(iRowIndex)== false) return;
  if (this.isValidFieldName(sFieldName)== false) return;
  if (tIsUpdateEditBox== null) tIsUpdateEditBox= true;
  
  //对于列固定值的处理;
  var viCol= this.getColIndexByField(sFieldName);
  var voCol= this.getCol(viCol);
  if (voCol!= null){
    var vtIsForceDflt= PF.parseBool(voCol.isforcedflt);
    if (vtIsForceDflt){
      var voField= DataTools.getTableFieldMeta(this.getTableName(), sFieldName);
      if (voField!= null){
        var voDflt= voField.firstChild;
        if (voDflt!= null){
          sValue= DataTools.makeDefaultValue(voDflt);
        }
      }
    }
  }
	if (!voRS){
  	voRS = DataTools.getRecordset(this.getTableName());
  	voRS.Move(this.getDataRowX(iRowIndex), DataTools.RS_BOOK_MARK_FIRST);
	}
  var vsValue= (sValue== null)? "": sValue;
  var vsOldValue= voRS(sFieldName)+ "";
  if (vsValue== vsOldValue) {
    var voCell= this.getCell(iRowIndex, viCol);
    if (PF.trim(voCell.innerText)!= PF.trim(vsValue)){
      this.loadFieldK(iRowIndex, sFieldName, vsValue);
    }
    return;
  }

  //向外发送事件; OnBeforeUpdate
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeUpdate)){
    this.eventAnswer_OnBeforeUpdate(this, iRowIndex, sFieldName, vsValue, vsOldValue);
  }
  if (this.isAbortEvent()) return;
  this.fireEvent(this.OnBeforeUpdate, new Array(this, iRowIndex, sFieldName, vsValue, vsOldValue));
  if (this.isAbortEvent()) return;

  voRS.Move(this.getDataRowX(iRowIndex), DataTools.RS_BOOK_MARK_FIRST);
  voRS.Update(sFieldName, vsValue);
  this.loadFieldK(iRowIndex, sFieldName, vsValue, tIsUpdateEditBox);

  if (PF.isExistMethodK(this.eventAnswer_OnAfterUpdate)){
    this.eventAnswer_OnAfterUpdate(this, iRowIndex, sFieldName, vsValue, vsOldValue);
  }
  this.fireEvent(this.OnAfterUpdate, new Array(this, iRowIndex, sFieldName, vsValue, vsOldValue));
  return;
}

//----------------------------------------------------------------------
//private; 更改指定行号的 select checkbox.
//返回值: 成功或不用更改: true, 否则: false;
function DataGrid_setValueByRowField_UpdateCheckBox(iRowIndex, sFieldName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValueByRowField");
  if (sFieldName!= this.sEffectField) return true;
  if (this.isValidRow(iRowIndex)== false) return true;
  if (this.isValidFieldName(sFieldName)== false) return true;

  var vsValue= (sValue== null)? "": sValue;
  var voCell= this.oLockBodyTable.rows[iRowIndex].firstChild;
  var vsChecked= voCell.firstChild.checked? "checked" : "";
  var vsCheck= "<input type='checkbox' class='clsCHK4' name='"+ this.EFFECT_PREFIX+ sValue+ "' "+ vsChecked+ ">\n";
  voCell.innerHTML= vsCheck;
  return true;
}
//----------------------------------------------------------------------
//public; 设置指定单元格的值;
//返回值: void;
function DataGrid_setValueByCell(oCell, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValueByCell");
  if (oCell== null || oCell.nodeName!= "TD") return false;

  var viRowIndex= this.getRowIndexByCell(oCell);
  var viColIndex= this.getColIndexByCell(oCell);
  this.setValueByRC(viRowIndex, viColIndex, sValue);
  return;
}
//----------------------------------------------------------------------
//public; 设置当前行指定字段的值;
//返回值: void;
function DataGrid_setValue(sFieldName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValue");
  this.setValueByRowField(this.getCurRowIndex(), sFieldName, sValue);
  return;
}
//----------------------------------------------------------------------
//public; 设置当前行指定字段的值;
//返回值: void;
function DataGrid_setCurValue(sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setCurValue");
  this.setValueByRC(this.getCurRowIndex(), this.getCurColIndex(), sValue);
  return;
}
//----------------------------------------------------------------------
//public; 设置指定行列的值;
//返回值: void;
function DataGrid_setValueByRC(iRowIndex, iColIndex, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValueByRC");
  if (this.isValidCol(iColIndex)== false) return;
  if (iColIndex< 0) return;
  var vsFieldName= this.getFieldNameByCol(iColIndex);
  var vsValue= this.setValueByRowField(iRowIndex, vsFieldName, sValue);
  return;
}
//----------------------------------------------------------------------
//public; 清除当前的所有数据；清理数据并不向数据库进行保存.
//返回值:成功: true, 失败: false;
function DataGrid_clear(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  Grid_clear.call(this);
  this.oReadOnlyCellMap.clear();
  this.hideFocusRow();
  return true;
}
//----------------------------------------------------------------------
//private; 设置编辑框进入一个指定的单元格;
//返回值: void;
function DataGrid_resizeCurEditBox(){
  if (this.oCurEditBox== null) return;

  var voCell= this.oCurEditBox.oGridCell;//this.getCell(this.oCurEditBox.oGridCell.parentNode.rowIndex, this.getColIndexByField(this.oCurEditBox.getFieldName()));
  if (voCell== null) return;
  var voBodyPanel= this.oBodyPanel;
 	var voRect= PF.getAbsRect(voCell, voBodyPanel);
 	if(voRect== null) return;
 	voRect.iWidth-= ((isNaN(parseInt(voCell.currentStyle.borderLeftWidth)))? 0: parseInt(voCell.currentStyle.borderLeftWidth))+ ((isNaN(parseInt(voCell.currentStyle.borderRightWidth)))? 0: parseInt(voCell.currentStyle.borderRightWidth));
 	voRect.iHeight-= ((isNaN(parseInt(voCell.currentStyle.borderTopWidth)))? 0: parseInt(voCell.currentStyle.borderTopWidth))+ ((isNaN(parseInt(voCell.currentStyle.borderBottomWidth)))? 0: parseInt(voCell.currentStyle.borderBottomWidth));
 	this.oCurEditBox.oRect= voRect;
 	this.oCurEditBox.resize();
 	this.iCurEditBoxLeft= this.oCurEditBox.oRect.iLeft+ this.oBodyImagePanel.scrollLeft;
 	this.iCurEditBoxTop= this.oCurEditBox.oRect.iTop+ this.oBodyImagePanel.scrollTop;
 	return;
}
//----------------------------------------------------------------------
//private; 设置编辑框进入一个指定的单元格;
//返回值:成功: true, 失败: false;
function DataGrid_enterCell(oCell){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "enterCell");

  var voBodyPanel= this.oBodyPanel;
  var voCell= oCell;
  if (this.iCurCol<= this.iLockedCol){
    voBodyPanel= this.oLockBodyPanel;
    var viColIndex= this.iCurCol;
    if (this.isExistCheck()) viColIndex++;
    voCell= this.oLockBodyTable.rows(oCell.parentNode.rowIndex).cells(viColIndex);
  }
	var voBox= this.getEditBoxByCol(this.iCurCol);
	voBox.setContainer(voBodyPanel);
 	var voRect= PF.getAbsRect(voCell, voBodyPanel);
 	if(voRect== null){
 		this.oCurEditBox= null;
 		return true;
 	}
 	voRect.iWidth= voCell.clientWidth;
 	voRect.iHeight= voCell.clientHeight;
 	voBox.oRect= voRect;
 	voBox.resize();
 	voBox.setVisible(true);
 	voBox.oGridCell= voCell;
 	voBox.oGridBodyCell= oCell;
 	voBox.oGridCell.oEditBox= voBox;
 	voBox.oGridBodyCell.oEditBox= voBox;
 	voBox.oInputBox.style.textAlign= oCell.currentStyle.textAlign;

 	this.oCurEditBox= voBox;
 	this.iCurEditBoxLeft= this.oCurEditBox.oRect.iLeft+ this.oBodyImagePanel.scrollLeft;
 	this.iCurEditBoxTop= this.oCurEditBox.oRect.iTop+ this.oBodyImagePanel.scrollTop;

  this.adjustCurEditBoxReadOnly();
  this.lightFocusRow(true);

 	var vsValue= this.getValueByRC(voCell.parentNode.rowIndex, this.iCurCol);
 	var vtIsFireOnChange= voBox.tIsFireOnChange; 	
 	//当进入单元格时ComboBox缺省为第一个选项，此时若就选择第一个选项，就不会
 	//触发onchange事件，导致第一个选项的值没有写到表格中，结果就是第一个选项
 	//无法选中。
	voBox.tIsFireOnChange= false;
 	if (vsValue == "" && voBox.CLASSNAME == "gp.page.ComboBox" 
 				&& voBox.getSelectElement().options[0].value != "" && !voBox.isReadOnly()){
 		vsValue = "????";//故意给一个不可能的值
	}
  voBox.setValue(vsValue);
 	voBox.tIsFireOnChange= vtIsFireOnChange;

  if (this.iInputStyle== this.INPUT_STYLE_TRANSPARENT) voCell.innerText= " ";
  return true;
}
//----------------------------------------------------------------------
//private; 设置编辑框进入一个指定的单元格;
//返回值:成功: true, 失败: false;
function DataGrid_outCell(oCell){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "outCell");
  if (oCell== null) return true;
  var voBox= oCell.oEditBox;
  if (voBox== null) return true;
  var vsValue = "";
  voBox.fireOnChange();
 	if (voBox.CLASSNAME== "gp.page.ComboBox"){
 		vsValue = PF.trim(voBox.getText())
 	}else{
  	vsValue= voBox.getValue();
	}
  if (PF.trim(oCell.innerText)!= vsValue){
	  if (vsValue== "") vsValue= " ";
	  if (voBox.CLASSNAME== "gp.page.NumericBox"){
	    if (voBox.isKilo()) vsValue = PF.parseKilo(vsValue);
	  }
	  if (vsValue== "") vsValue= " ";
	  voBox.oGridCell.innerText= vsValue;
	  voBox.oGridBodyCell.innerText= vsValue;
  }
  voBox.setVisible(false);
  return true;
}
//----------------------------------------------------------------------
//public; 设置单元格只读;
//返回值: void;
function DataGrid_setCellReadOnly(iRowIndex, iColIndex, tIsReadOnly){
  if (this.isValidRow(iRowIndex)== false) return;
  var vsField= this.getFieldNameByCol(iColIndex);
  this.oReadOnlyCellMap.put(iRowIndex+"_"+ vsField, tIsReadOnly);
  if ((this.getCurRowIndex()== iRowIndex) && (this.getCurColIndex()== iColIndex)){
    this.adjustCurEditBoxReadOnly();
  }
  return;
}
//----------------------------------------------------------------------
//private; 设置当前输入框只读;
//返回值: void;
function DataGrid_adjustCurEditBoxReadOnly(){
  if(this.oCurEditBox== null) return;
  if (this.isReadOnly()) this.oCurEditBox.setReadOnly(true);
  else if (this.isWritable()== false) this.oCurEditBox.setReadOnly(true);
  else if (this.isRowReadOnly(this.iCurRow)) this.oCurEditBox.setReadOnly(true);
  else if (this.isColReadOnly(this.iCurCol)) this.oCurEditBox.setReadOnly(true);
  else if (this.isCellReadOnly(this.iCurRow, this.iCurCol)) this.oCurEditBox.setReadOnly(true);
  else this.oCurEditBox.setReadOnly(false);
  return;
}
//----------------------------------------------------------------------
//public; 判断单元格是否只读;
//返回值: 只读:true;否则:false
function DataGrid_isCellReadOnly(iRowIndex, iColIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setRowReadOnly");
  if (this.isValidRow(iRowIndex)== false) return false;
  if (this.isValidCol(iColIndex)== false) return false;
  if (this.isRowReadOnly(iRowIndex)) return true;
  if (this.isColReadOnly(iColIndex)) return true;

  var vsField= this.getFieldNameByCol(iColIndex);
	var vtResult = PF.parseBool(this.oReadOnlyCellMap.get(iRowIndex+"_"+ vsField));
  return vtResult;
}
//----------------------------------------------------------------------
//public;
function DataGrid_setReadOnly(tIsReadOnly){
  Grid_setReadOnly.call(this, tIsReadOnly);
  this.adjustCurEditBoxReadOnly();
}
//----------------------------------------------------------------------
//public; 设置行只读;
//<tr> 中加入属性: IsReadOnly= "true";
//返回值: void;
function DataGrid_setRowReadOnly(iRowIndex, tIsReadOnly){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setRowReadOnly");
  if (this.isValidRow(iRowIndex)== false) return;

  var voRow= this.getRow(iRowIndex);
  voRow.isreadonly= PF.parseBool(tIsReadOnly);
  if (this.getCurRowIndex()== iRowIndex && this.oCurEditBox!= null){
    this.oCurEditBox.setReadOnly(voRow.isreadonly);
  }
}
//----------------------------------------------------------------------
//public; 设置列只读;
//<col> 中加入属性: IsReadOnly= "true";
//返回值: void;
function DataGrid_setColReadOnly(iColIndex, tIsReadOnly){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setColReadOnly");
  if (this.isValidCol(iColIndex)== false) return;
  var vsField= this.getFieldNameByCol(iColIndex);
  if (vsField== this.sRowIdField) tIsReadOnly= true;
  var voCol= this.getCol(iColIndex);
  voCol.isreadonly= PF.parseBool(tIsReadOnly);
  var voBox= this.getEditBoxByCol(iColIndex);
  voBox.setReadOnly(voCol.isreadonly);
  return;
}
//----------------------------------------------------------------------
//public; 判断行是否只读;
//返回值: 只读为 true, 否则为: false;
function DataGrid_isRowReadOnly(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  if (this.isValidRow(iRowIndex)== false) return false;

  var voRow= this.getRow(iRowIndex);
  var vtIsReadOnly= PF.parseBool(voRow.isreadonly);
  return vtIsReadOnly;
}
//----------------------------------------------------------------------
//public; 判断列是否只读;
//返回值:只读为 true, 否则为: false;
function DataGrid_isColReadOnly(iColIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  if (this.isValidCol(iColIndex)== false) return false;

  var voCol= this.getCol(iColIndex);
  var vtIsReadOnly= PF.parseBool(voCol.isreadonly);
  return vtIsReadOnly;
}
//----------------------------------------------------------------------
//private; EditBox 的事件响应; OnChange
//返回值: void;
function DataGrid_eventAnswer_EditBox_OnChange(oSender, sValue, oEvent){
  var voBox= oSender;
  this.setValueByRowFieldK(this.getRowIndexByCell(voBox.oGridBodyCell), voBox.getFieldName(), sValue, false);
  if (this.iInputStyle== this.INPUT_STYLE_TRANSPARENT){
    if (this.oCurEditBox!= null){
      this.oCurEditBox.oGridCell.innerText= " ";
    }
  }
}
//----------------------------------------------------------------------
//private; EditBox 的事件响应; OnBlur
//返回值: void;
function DataGrid_eventAnswer_EditBox_OnBlur(oSender, oEvent){
  var voBox= oSender;
  this.lostFocus();
}
//----------------------------------------------------------------------
//public; 获取输入的风格;
//返回值: 成功:输入框类型;否则:null;;
function DataGrid_getInputStyle(){
  return this.iInputStyle;
}
//----------------------------------------------------------------------
//public; 设置输入的风格;
//返回值: void;
function DataGrid_setInputStyle(iStyle){
  if (iStyle== this.INPUT_STYLE_LIGHT_ROW){
    this.tIsLightRow= true;
  }else if(iStyle== this.INPUT_STYLE_TRANSPARENT){
    this.tIsLightRow= false;
  }
  for (var i= 0; i< this.asFieldName.length; i++){
    this.setInputStyle_Box(this.getEditBox(this.asFieldName[i]), iStyle);
  }
  this.iInputStyle= iStyle;
}
//----------------------------------------------------------------------
//private; 设置输入的风格;
//返回值: void;
function DataGrid_setInputStyle_Box(oBox, iStyle){
  if (oBox== null) return;
  if (iStyle== this.INPUT_STYLE_LIGHT_ROW){
    oBox.oOuterPanel.style.backgroundColor= "white";
  }else if(iStyle== this.INPUT_STYLE_TRANSPARENT){
    oBox.oOuterPanel.style.backgroundColor= "transparent";
  }
  return;
}
//----------------------------------------------------------------------
//public; 加亮显示焦点行.
//返回值: void;
function DataGrid_lightFocusRow(tIsLight){
  tIsLight= PF.parseBool(tIsLight);
  if (this.oCurEditBox!= null && tIsLight){
    this.adjustCellToView(this.oCurEditBox.oGridCell);
    this.oCurEditBox.setFocus();
  }
  Grid_lightFocusRow.call(this, true);
  return;
}
//----------------------------------------------------------------------
//public; 隐藏焦点;
//返回值: void;
function DataGrid_hideFocusRow(){
  if (this.oCurEditBox== null) return;
  this.setRowBackColor(this.iCurRow, "", false);
  this.setRowForeColor(this.iCurRow, this.ROW_FORE_COLOR_NORMAL, false);
  this.outCell(this.oCurEditBox.oGridCell);
  this.iCurRow= -1;
  this.oCurEditBox= null;
  return;
}
//----------------------------------------------------------------------
//public; 获取当前单元格;
//返回值: 成功:当前单元格;否则:null;
function DataGrid_getCurCell(){
  return Grid_getCurCell.call(this);
}
//----------------------------------------------------------------------
//public; 获取当前单元格;
//返回值: 成功:当前单元格;否则:-1;
function DataGrid_getCurColIndex(){
  return Grid_getCurColIndex.call(this);
}
//----------------------------------------------------------------------
//public;
function DataGrid_isWritable(){
  return PF.parseBool(this.oOuterPanel.iswritable);
}
//----------------------------------------------------------------------
//public;
function DataGrid_setWritable(tIsWritable){
  this.oOuterPanel.iswritable= tIsWritable;
}
//----------------------------------------------------------------------
//public;
//return: edit box/ null;
function DataGrid_getEditBox(sFieldName){
  var voBox= this.oBoxMap.get(sFieldName);
  if (voBox== null){
    voBox= this.makeEditBox(sFieldName);
  }
  return voBox;
}
//----------------------------------------------------------------------
//public;
//return: edit box/ null;
function DataGrid_getEditBoxByCol(iCol){
  if (iCol< 0 || iCol>= this.getColCount()) return null;
  return this.getEditBox(this.getFieldNameByCol(iCol));
}
//----------------------------------------------------------------------
//public; 生成列串,供 cardpage.jsp 中的<applus:card>使用;
//return:
/*
    <fields>
      <field name=""
             type=""
             caption=""
             align=""
             editboxtype="TextBox" 
             isvisible="true"
             isallowinput="true"
             isreadonly="false" 
             iszoomimage="false"
             ispopupimage="false"
             row= "0"
             col= "0"
             rowspan= "1"
             colspan= "1"
             width="100"
             height="20"
           >
      </field>
      ......
    </fields>
//*/
function DataGrid_getCardFields(iColCount){
  if (iColCount== null) iColCount= 1;
  iColCount= PF.parseInt(iColCount);
  var voBuf= new StringBuffer();
  var vaoCol= this.getCols();
  var viRow= 0;
  var viCol= 0;
  voBuf.append("<fields>\n");
  for (var i= 0; i< vaoCol.length; i++){
    voBuf.append("<field ");
    voBuf.append("name='"+ vaoCol[i].fieldname+ "' ");
    voBuf.append("type='"+ vaoCol[i].fieldtype+ "' ");
    voBuf.append("caption='"+ vaoCol[i].caption+ "' ");
    voBuf.append("align='"+ vaoCol[i].align+ "' ");
    voBuf.append("editboxtype='"+ this.getEditBoxByCol(i).getBoxType()+ "' ");
    voBuf.append("isvisible='"+ ((vaoCol[i].style.display=="none")?false:true)+ "' ");
    voBuf.append("isallowinput='"+ vaoCol[i].isallowinput+ "' ");
    voBuf.append("isreadonly='"+ vaoCol[i].isreadonly+ "' ");
    voBuf.append("iszoomimage='"+ vaoCol[i].iszoomimage+ "' ");
    voBuf.append("ispopupimage='"+ vaoCol[i].ispopupimage+ "' ");
    if (vaoCol[i].style.display== "none"){
      voBuf.append("row='-1' ");
      voBuf.append("col='-1' ");
    }else{
      voBuf.append("row='"+ viRow+ "' ");
      voBuf.append("col='"+ viCol+ "' ");
      viCol++;
      if (viCol>= iColCount){
        viCol= 0;
        viRow++;
      }
    }
    voBuf.append("rowspan='1' ");
    voBuf.append("colspan='1' ");
    voBuf.append("width='"+ PF.parseInt(vaoCol[i].style.width)+ "' ");
    voBuf.append("height='20' ");
    voBuf.append("/>\n");
  }
  voBuf.append("</fields>\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//public;
//return: void;
function DataGrid_openCardPage(){
  var viColCount= this.getCardColCount();
  if (viColCount== null) viColCount= 1;
  var vsFields= this.getCardFields(viColCount);
  PageX.openCardPage(this.getTableName(), "fromparent", viColCount, vsFields, null, 500, 500);
}
//----------------------------------------------------------------------
//public;
function DataGrid_getCardColCount(){
  return PF.parseInt(this.oOuterPanel.cardcolcount);
}
//----------------------------------------------------------------------
//public;
function DataGrid_setCardColCount(iColCount){
  this.oOuterPanel.cardcolcount= iColCount;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区=function();
//----------------------------------------------------------------------
//private; 按下追加行按钮时的处理;
//返回值: void;
function DataGrid_oAppendRowButton_onclick(){
  var voDG= this.oOwner;
  voDG.insertRow(-1);
}
//----------------------------------------------------------------------
//private; 按下插入行按钮时的处理;
//返回值: void;
function DataGrid_oInsertRowButton_onclick(){
  var voDG= this.oOwner;
  var viCurRow= voDG.getCurRowIndex();
  voDG.insertRow(viCurRow);
  return;
}
//----------------------------------------------------------------------
//private; 按下删除行按钮时的处理;
//返回值: void;
function DataGrid_oDeleteRowButton_onclick(){
  var voDG= this.oOwner;
  var vaiRowIndex= voDG.getSelectedRowIndexs();
  voDG.deleteRowsK(vaiRowIndex, (vaiRowIndex.length>50)?true:false);
  return;
}
//----------------------------------------------------------------------
//public; 设置焦点.
//返回值: void;
function DataGrid_setFocus(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setFocus");
  this.setFocusK(false);
  return;
}
//----------------------------------------------------------------------
//private; 焦点处理;
//返回值: void;
function DataGrid_eventAnswer_OnFocus(oSender, oEvent){
  if (this.oCurEditBox== null) return;
  if (this.oCurEditBox.isFocus()== false){
  }
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的进入单元格的事件;
//返回值: void;
function DataGrid_eventAnswer_OnEnterCell(jSender, oNewCell, oOldCell){
  if (this.tHasInit== false) return;
  this.isEnterCell = true;
  this.outCell(oOldCell);
  this.enterCell(oNewCell);
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnScroll(oSender, oEvent){
  if (this.tHasInit== false) return;
  if (this.iCurCol> this.iLockedCol){
    if (this.oCurEditBox!= null){
    	var viLeft= 0- this.oBodyImagePanel.scrollLeft+ this.iCurEditBoxLeft;
    	var viTop= 0- this.oBodyImagePanel.scrollTop+ this.iCurEditBoxTop;
      this.oCurEditBox.moveTo(viLeft, viTop);
    }
  }
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnRowVisibleChange(oSender, iRowIndex, tIsVisible){
  if (this.tHasInit== false) return;
  if (this.oCurEditBox== null) return;
  if (this.oCurEditBox.oGridCell== null) return;
  if (this.oCurEditBox.oGridCell.parentNode== null) return;
  if (this.oCurEditBox.oGridCell.parentNode.rowIndex== iRowIndex){
    this.hideFocusRow();
  }
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnColVisibleChange(oSender, sFieldName, tIsVisible){
  if (this.tHasInit== false) return;
  if (this.oCurEditBox== null) return;
  var voCell= this.getCell(this.oCurEditBox.oGridCell.parentNode.rowIndex, this.getColIndexByField(sFieldName));
  if (this.oCurEditBox.oGridBodyCell== voCell){
    this.hideFocusRow();
  }else{
  	this.resizeCurEditBox();
  }
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnColIndexChange(oSender, sFieldName, iNewCol, iOldCol){
  if (this.tHasInit== false) return;
  if (this.oCurEditBox!= null){
    this.resizeCurEditBox();
  }
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnColWidthChange(oSender, sFieldName, iNewWidth, iOldWidth){
  if (this.tHasInit== false) return;
  if (this.oCurEditBox== null) return;
  if (this.oCurEditBox.oGridCell.parentNode== null) return;
  var voCell= this.getCell(this.oCurEditBox.oGridCell.parentNode.rowIndex, this.getColIndexByField(sFieldName));
  if (this.oCurEditBox.oGridBodyCell== voCell){
   	this.oCurEditBox.oRect.iWidth= iNewWidth- ((isNaN(parseInt(voCell.currentStyle.borderLeftWidth)))? 0: parseInt(voCell.currentStyle.borderLeftWidth))+ ((isNaN(parseInt(voCell.currentStyle.borderRightWidth)))? 0: parseInt(voCell.currentStyle.borderRightWidth));
  }
  if (this.oCurEditBox!= null){
    this.resizeCurEditBox();
  }
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnLoadData(oSender){
  if (this.tHasInit== false) return;
  this.hideFocusRow();
  this.oCurEditBox= null;
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnAfterInsertRow(oSender, iRowIndex){
  if (this.tHasInit== false) return;
  if (this.oCurEditBox== null) return;
 	var voRect= PF.getAbsRect(this.oCurEditBox.oGridCell, this.oBodyPanel);
 	if (voRect== null) return;
 	this.oCurEditBox.moveTo(voRect.iLeft, voRect.iTop);
  return;
}
//----------------------------------------------------------------------
//public; 快速响应 Grid 的事件;
//返回值: void;
function DataGrid_eventAnswer_OnAfterDeleteRow(oSender, iRowIndex){
//	debugger;
  if (this.tHasInit== false) return;
  if (this.oCurEditBox== null) return;
  if (this.getRowCount()== 0
      || this.oCurEditBox.oGridCell== null
      || this.oCurEditBox.oGridCell.parentNode== null){
    this.oCurEditBox.moveTo(-1000, -1000);
    this.oCurEditBox= null;
    this.disposeNewCurRow();
  }else{
    this.oCurEditBox.moveTo(-1000, -1000);
    this.oCurEditBox= null;
  }
  var vsKey = "";
  for(var i=0,j=this.getColCount(); i<j; i++){
  	vsKey = iRowIndex + "_" + i;
  	this.oReadOnlyCellMap.remove(vsKey);
  }
  return;
}
//----------------------------------------------------------------------
//private; Base 的事件响应; OnKeyDown;
//返回值: void;
function DataGrid_eventAnswer_OnKeyDown(oSender, oEvent){
  if (event.shiftKey) return;
  var viKey= event.keyCode;
  var vtIsSetCurCell= true;
  switch(viKey){
    case 38: //上;
      if (event.ctrlKey== false || event.altKey) return;
      break;
    case 40: //下;
      if (event.ctrlKey== false || event.altKey) return;
      break;
    case 37: //左;
      if (event.ctrlKey== false || event.altKey) return;
      break;
    case 39: //右;
      if (event.ctrlKey== false || event.altKey) return;
      break;
    case 33: //上页;
      if (event.ctrlKey== false || event.altKey) return;
      break;
    case 34: //下页;
      if (event.ctrlKey== false || event.altKey) return;
      break;
    case 73:  //i:append;
      break;
    case 45: //insert;
      break;
    case 46: //delete;
      break;
    case 49:  //1:append; 大键盘;
      if (event.ctrlKey== false || event.altKey) return;
      this.oAppendRowButton.fireEvent("onclick");
      vtIsSetCurCell= false;
      break;
    case 50: //2:insert; 大键盘;
      if (event.ctrlKey== false || event.altKey) return;
      this.oInsertRowButton.fireEvent("onclick");
      vtIsSetCurCell= false;
      break;
    case 51: //3:delete; 大键盘;
      if (event.ctrlKey== false || event.altKey) return;
      this.oDeleteRowButton.fireEvent("onclick");
      vtIsSetCurCell= false;
      break;
    case 97: //1:append; 小键盘;
      if (event.ctrlKey== false || event.altKey) return;
      this.oAppendRowButton.fireEvent("onclick");
      vtIsSetCurCell= false;
      break;
    case 98: //2:insert; 小键盘;
      if (event.ctrlKey== false || event.altKey) return;
      this.oInsertRowButton.fireEvent("onclick");
      vtIsSetCurCell= false;
      break;
    case 99: //3:delete; 小键盘;
      if (event.ctrlKey== false || event.altKey) return;
      this.oDeleteRowButton.fireEvent("onclick");
      vtIsSetCurCell= false;
      break;
    default:
  }

  if (vtIsSetCurCell){
    this.grid_OuterPanel_onkeydown_Dispose();
  }
  Grid_lightFocusRow.call(this, true);
  return;
}
//----------------------------------------------------------------------
//private; Grid 的事件响应; OnCellClick;
//返回值: void;
function DataGrid_eventAnswer_OnRowClick(oSender, oRow, oEvent){
  var voCurCell= this.getCurCell();

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnCellClick)){
    this.eventAnswer_OnCellClick(this, voCurCell, oEvent);
  }
  this.fireEvent(this.OnCellClick, new Array(this, voCurCell, oEvent));
  return;
}
//----------------------------------------------------------------------
//private; Grid 的事件响应; OnCellDblClick;
//返回值: void;
function DataGrid_eventAnswer_OnRowDblClick(oSender, oRow, oEvent){
  var voCurCell= this.getCurCell();
  this.fireEvent(this.OnCellDblClick, new Array(this, voCurCell, oEvent));
  return;
}
//----------------------------------------------------------------------

function DataGrid_release() {
	var vaoEditBox= this.oBoxMap.getAllItem();
	for (var i = 0; i < vaoEditBox.length; i++) {
		var voBox= vaoEditBox[i];
		voBox.release();
		vaoEditBox[i] = null;
	}
	var vaoEditBox1 = this.oLockedBoxMap.getAllItem();
	for (var i = 0; i < vaoEditBox1.length; i++) {
		var voBox= vaoEditBox1[i];
		voBox.release();
		vaoEditBox1[i] = null;
	}
	Grid_release.call(this);
}



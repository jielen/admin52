/* $Id: TextBox.js,v 1.5 2008/06/16 02:56:16 hemg Exp $ */
/*
Title: gp.page.TextBox
Description: 文本编辑框类;用于普通字符串的编辑;
Company: 用友政务
Date: 2004/08/19
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function TextBox(sid){
  //1.超类 =function();
  Base.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.TextBox";

  this.OWNER_TYPE_FREE= "free";
  this.OWNER_TYPE_GRID= "grid";
  this.OWNER_TYPE_BOXSET= "boxset";
  this.OWNER_TYPE_SEARCH= "search";

  this.DOMID_INPUT= "TextInput";
  this.DOMID_FOCUS_BUTTON= "FocusButton";
  this.DOMID_BOX_SUBFIX= "_BOX";
  
  this.DISABLED_COLOR= "black";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部对象;

  this.oOuterPanel= null; //private; 外部面板,是整个 TextBox 的基础平台它实际上是一个Div对象
  this.oInputBox= null;   //private; 输入框;
  this.oFocusButton= null;//private;
  this.oDefValSpan= null; //private;

  this.oRect= new Rect(0, 0, 120, 20);       //private; 对象的大小;
  this.oDefRect= new Rect(0, 0, 120, 20);    //private; 对象默认的大小;
  this.iMaxWidth= -1;

  this.tIsFireOnChange= true;//private;
  this.tIsEditBox= true;     //private;
  this.tHasInit= false;      //对象是否被始化的标志;
  this.isInGrid = false;		//是否是Grid中的编辑框，Grid中的编辑框对keydown事件响应不一样

  this.sOldValue= "";        //private;
  
  this.sNormColor= "blue";

  //4.事件声明区 =function();
  this.OnInit= "OnInit";          //参数: oSender;
  this.OnResize= "OnResize";      //参数: oSender;
  this.OnChange= "OnChange";      //参数: oSender, sValue, oEvent;

  //5.方法声明区 =function();
  //public;
  this.clear= TextBox_clear;
  this.getValue= TextBox_getValue;
  this.init= TextBox_init;
  this.isAllowInput= TextBox_isAllowInput;
  this.isDataRela= TextBox_isDataRela;
  this.isReadOnly= TextBox_isReadOnly;
  this.resize= TextBox_resize;
  this.setAllowInput= TextBox_setAllowInput;
  this.setFocus= TextBox_setFocus;
  this.setReadOnly= TextBox_setReadOnly;
  this.setRect= TextBox_setRect;
  this.setValue= TextBox_setValue;

  this.getDefExpr= TextBox_getDefExpr;
  this.getFieldName= TextBox_getFieldName;
  this.getFieldType= TextBox_getFieldType;
  this.getGroupId= TextBox_getGroupId;
  this.getMaxLen= TextBox_getMaxLen;
  this.getMinLen= TextBox_getMinLen;
  this.getTabIndex= TextBox_getTabIndex;
  this.getTableName= TextBox_getTableName;
  this.setDefExpr= TextBox_setDefExpr;
  this.setFieldName= TextBox_setFieldName;
  this.setFieldType= TextBox_setFieldType;
  this.setGroupId= TextBox_setGroupId;
  this.setMaxLen= TextBox_setMaxLen;
  this.setMinLen= TextBox_setMinLen;
  this.setTabIndex= TextBox_setTabIndex;
  this.setTableName= TextBox_setTableName;
  this.getOuterObjCurRowX= TextBox_getOuterObjCurRowX;
  this.getBoxType= TextBox_getBoxType;
  this.fireOnChange= TextBox_fireOnChange;
  this.isForceReadOnly= TextBox_isForceReadOnly;
  this.setForceReadOnly= TextBox_setForceReadOnly;
  this.isFreeMember= TextBox_isFreeMember;
  this.isAllowNull= TextBox_isAllowNull;
  this.setAllowNull= TextBox_setAllowNull;
  this.isForceDflt= TextBox_isForceDflt;
  this.getOwnerType= TextBox_getOwnerType;
  this.isFireOnChange= TextBox_isFireOnChange;
  this.setFireOnChange= TextBox_setFireOnChange;
  this.canFocus = TextBox_canFocus;

  //private;
  this.initDefaultValue= TextBox_initDefaultValue;
  this.eventAnswer_OnKeyDown= TextBox_eventAnswer_OnKeyDown;
  this.getInputAdjustWidth= TextBox_getInputAdjustWidth;
  this.setInputAdjustWidth= TextBox_setInputAdjustWidth;
  this.setReadOnlyColor= TextBox_setReadOnlyColor;
  this.make = TextBox_make;
  
  this.release = TextBox_release;
  this.isexact = true;
  this.sid = sid;
  return true;
}
function TextBox_make(){
	this.oOuterPanel = document.all(this.sid); 
	//var row = this.oOuterPanel.rows[0];
	var row = this.oOuterPanel.rows[this.oOuterPanel.rows.length-1];
	this.oInputBox = row.cells[0].firstChild;
	this.oFocusButton = row.cells[1].firstChild;
	if (this.oOuterPanel.havedefault == "true"){
		this.oDefValSpan = row.cells[row.cells.length - 1];
	}

  this.oOuterPanel.oOwner= this;
  this.oInputBox.oOwner= this;
  this.oFocusButton.oOwner= this;
  if (this.oDefValSpan!= null) this.oDefValSpan.oOwner= this;	

  this.oInputBox.onfocus = TextBox_oInputBox_onfocus;
  this.oInputBox.onblur = TextBox_oInputBox_onblur;
//  this.oOuterPanel.onfocus= TextBox_oOuterPanel_onfocus;
//  this.oOuterPanel.onblur= TextBox_oOuterPanel_onblur;
  this.oFocusButton.onfocus= TextBox_oFocusButton_onfocus;
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function TextBox_init(){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  this.sOldValue = this.oInputBox.value;
  this.initDefaultValue(); //?
  return true;
}
//----------------------------------------------------------------------
//private;
//return: void;
function TextBox_initDefaultValue(){
  if (this.oDefValSpan== null) return;
   DataTools.setDefExpr(this.getTableName(), this.getFieldName(), this.oDefValSpan.innerText);
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值: 成功: true, 失败: false;
function TextBox_resize(){
  if (this.tHasInit== false) return false;
  if (this.oRect.iWidth<= 0) return false;
  if (this.oRect.iHeight<= 0) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= true;
  if (this.oRect.iWidth== null || (!this.oRect.isWidthPercent() && this.oRect.iWidth< 20)) this.oRect.iWidth= 20;
  if (this.oRect.iHeight== null || (!this.oRect.isHeightPercent() && this.oRect.iHeight< 18)) this.oRect.iHeight= 18;

  this.oOuterPanel.style.left= this.oRect.iLeft;
  this.oOuterPanel.style.top= this.oRect.iTop;
  this.oOuterPanel.style.width= this.oRect.iWidth;
  this.oOuterPanel.style.height= this.oRect.iHeight;
  this.fireOnResize();
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//返回值: void;
function TextBox_setRect(oRect){
  this.oRect.iLeft= oRect.iLeft;
  this.oRect.iTop= oRect.iTop;
  this.oRect.iWidth= oRect.iWidth;
  this.oRect.iHeight= oRect.iHeight;

  this.oDefRect.iLeft= oRect.iLeft;
  this.oDefRect.iTop= oRect.iTop;
  this.oDefRect.iWidth= oRect.iWidth;
  this.oDefRect.iHeight= oRect.iHeight;

  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; 设置焦点.
//返回值: void;
function TextBox_setFocus(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setFocus");
  if (this.isVisible()== false) return;
  if(PF.parseBool(this.oFocusButton.disabled)== true) return;
  this.oFocusButton.focus();
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function TextBox_setValue(sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValue");
  this.sOldValue= this.oInputBox.value;
  if (this.oInputBox.value== new String(sValue)) return;
  this.oInputBox.value= sValue;
  this.fireOnChange();
  return;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值:成功: 值, 失败: "";
function TextBox_getValue(){
  if (this.tHasInit== false) return "";
  return this.oInputBox.value;
}
//----------------------------------------------------------------------
//public; 清理值;
//返回值: void;
function TextBox_clear(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "clear");
  this.setValue("");
  return;
}
//----------------------------------------------------------------------
//public; 是否是数据相关;
//返回值: 是:true; 否则: false;
function TextBox_isDataRela(){
  var vsTable= this.getTableName();
  var vsField= this.getFieldName();
  if (vsTable== null || vsTable== "") return false;
  if (vsField== null || vsField== "") return false;
  return true;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: table name/ "";
function TextBox_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function TextBox_setTableName(sTable){
  this.oOuterPanel.tablename= sTable;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: table name/ "";
function TextBox_isFreeMember(){
  return PF.parseBool(this.oOuterPanel.isfreemember);
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: data type/ "";
function TextBox_isForceDflt(){
  return PF.parseBool(this.oOuterPanel.isforcedflt);
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: data type/ "";
function TextBox_getOwnerType(){
  return this.oOuterPanel.ownertype;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: data type/ "";
function TextBox_getFieldType(){
  return this.oOuterPanel.fieldtype;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function TextBox_setFieldType(sFieldType){
  this.oOuterPanel.fieldtype= sFieldType;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: field name/ "";
function TextBox_getFieldName(){
  return this.oOuterPanel.fieldname;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function TextBox_setFieldName(sField){
  this.oOuterPanel.fieldname= sField;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: maxlen/ 0;
function TextBox_getMaxLen(){
  return PF.parseInt(this.oOuterPanel.maxlen);
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function TextBox_setMaxLen(iMaxLen){
  this.oOuterPanel.maxlen= iMaxLen;
  this.oInputBox.maxLength= iMaxLen;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: minlen/ 0;
function TextBox_getMinLen(){
  return PF.parseInt(this.oOuterPanel.minlen);
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function TextBox_setMinLen(iMinLen){
  this.oOuterPanel.minlen= iMinLen;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: groupid/ "";
function TextBox_getGroupId(){
  return this.oOuterPanel.groupid
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function TextBox_setGroupId(sGroupId){
  this.oOuterPanel.groupid= sGroupId;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: tabindex/ -1;
function TextBox_getTabIndex(){
  return this.oOuterPanel.tabIndex;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function TextBox_setTabIndex(iTabIndex){
  this.oOuterPanel.tabIndex= iTabIndex;
}
//----------------------------------------------------------------------
//public; 设置允许键盘录入属性.
//返回值:void;
function TextBox_setAllowInput(tIsAllowInput){
  if (this.tHasInit== false) reutrn;
  tIsAllowInput= PF.parseBool(tIsAllowInput);
  if (tIsAllowInput && !this.isReadOnly()){
    this.setReadOnlyColor(false);
    this.oInputBox.readOnly= false;
  }else{
    this.setReadOnlyColor(true);
    this.oInputBox.readOnly= true;
  }
	this.oOuterPanel.isallowinput= PF.parseBool(tIsAllowInput);
  return;
}
//----------------------------------------------------------------------
//public; 判断是否允许键盘录入.
//返回值: 允许: true; 否则: false;
function TextBox_isAllowInput(){
	return PF.parseBool(this.oOuterPanel.isallowinput);
}
//----------------------------------------------------------------------
//public; 设置只读属性.
//返回值: void;
function TextBox_setReadOnly(tIsReadOnly){
	if (this.isForceReadOnly()) tIsReadOnly= true;
  tIsReadOnly= PF.parseBool(tIsReadOnly);
  if (!tIsReadOnly && this.isAllowInput()){
    this.setReadOnlyColor(false);
    this.oInputBox.readOnly= false;
  }else{
    this.setReadOnlyColor(true);
    this.oInputBox.readOnly= true;
  }
  this.oOuterPanel.isreadonly= tIsReadOnly;
  return;
}
//----------------------------------------------------------------------
//private; 设置只读属性.
//返回值: void;
function TextBox_setReadOnlyColor(tIsReadOnly){
  if (!this.oInputBox.readOnly){
    this.sNormColor= this.oInputBox.style.color;
  }
  var vsColor= tIsReadOnly? this.DISABLED_COLOR: this.sNormColor;
  this.oInputBox.style.color= vsColor;
}
//判断当前编辑框是否可以接受焦点，焦点切换时调用
function TextBox_canFocus(){
	return this.isVisible() && !this.isReadOnly();
}
//----------------------------------------------------------------------
//public; 判断是否只读.
//返回值: 只读: true; 否则: false;
function TextBox_isReadOnly(){
  return PF.parseBool(this.oOuterPanel.isreadonly);
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: default value/ "";
function TextBox_isForceReadOnly(){
  return PF.parseBool(this.oOuterPanel.isforcereadonly);
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function TextBox_setForceReadOnly(tIsForceReadOnly){
  this.oOuterPanel.isforcereadonly= tIsForceReadOnly;
}
//----------------------------------------------------------------------
//public; 获取值.
//return: true/false;
function TextBox_isAllowNull(){
  return PF.parseBool(this.oOuterPanel.isallownull);
}
//----------------------------------------------------------------------
//public; 设置值.
//return: true/false;
function TextBox_setAllowNull(tIsAllowNull){
  this.oOuterPanel.isallownull= tIsAllowNull;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: default value/ "";
function TextBox_getDefExpr(){
  if (this.oDefValSpan== null) return "";
  return this.oDefValSpan.innerText;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function TextBox_setDefExpr(value){
  this.oDefValSpan.innerText= value;
}
//----------------------------------------------------------------------
//private; 获取值.
//返回值: inputadjustwidth/ 0;
function TextBox_getInputAdjustWidth(){
  return this.oOuterPanel.inputadjustwidth;
}
//----------------------------------------------------------------------
//private; 设置值.
//返回值:void;
function TextBox_setInputAdjustWidth(iInputAdjustWidth){
  this.oOuterPanel.inputadjustwidth= iInputAdjustWidth;
}
//----------------------------------------------------------------------
//public; 
//return: row index / -1;
function TextBox_getOuterObjCurRowX(){
  var row= -1;
  var voObj= this.oOuterObj;
  if (voObj== null) return row;
  if (PageX.isGrid(voObj)){
    if (this.oGridBodyCell== null) return voObj.getCurRowIndex();
    if (this.oGridBodyCell.parentNode== null) return -1;
    row= this.oGridBodyCell.parentNode.rowIndex;
  }else{
    row= voObj.getCurRowIndex();
  }
  return row;
}
//----------------------------------------------------------------------
//public; 
//return: box type;
function TextBox_getBoxType(){
  var viPos= this.CLASSNAME.lastIndexOf(".");
  return this.CLASSNAME.substr(viPos+ 1);
}
//----------------------------------------------------------------------
function TextBox_isFireOnChange(){
  return PF.parseBool(this.tIsFireOnChange);
}
//----------------------------------------------------------------------
function TextBox_setFireOnChange(isFire){
  this.tIsFireOnChange= isFire;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; 内容改变事件.
//返回值:成功: true, 失败: false;
function TextBox_fireOnChange(){
  if (this.oInputBox.value== this.sOldValue) return;
  this.sOldValue= this.oInputBox.value;
  //事件快速响应通道,仅供继承类使用;
  if (this.tIsFireOnChange){
    var vsValue= this.getValue();
    if (PF.isExistMethodK(this.eventAnswer_OnChange)){
      this.eventAnswer_OnChange(this, vsValue, event);
    }
    var vsValue= this.getValue();
    this.fireEvent(this.OnChange, new Array(this, vsValue, event));
  }
  return;
}
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值:成功: true, 失败: false;
function TextBox_oFocusButton_onfocus(){
  var voBox= this.oOwner;
  if (voBox.isVisible()
      && voBox.oInputBox.style.display!= "none"
      && voBox.oInputBox.readOnly== false
      && voBox.oInputBox.disabled== false){
    voBox.oInputBox.focus();
  }else{
    voBox.oInputBox.select();
  }
}
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值:成功: true, 失败: false;
function TextBox_oOuterPanel_onfocus(){
  var voBox= this.oOwner;
  if (PF.parseBool(voBox.oFocusButton.disabled)== true) return;//人员照片input出错
  if (PF.isVisible(voBox.oFocusButton)) voBox.oFocusButton.focus();
}
//----------------------------------------------------------------------
//private; 失去焦点.
//返回值:成功: true, 失败: false;
function TextBox_oOuterPanel_onblur(){
  return true;
}
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值:成功: true, 失败: false;
function TextBox_oInputBox_onfocus(){
  var voBox= this.oOwner;
  voBox.oInputBox.select();
  voBox.fireOnFocus();
}
//----------------------------------------------------------------------
//private; 失去焦点.
//返回值:成功: true, 失败: false;
function TextBox_oInputBox_onblur(){
  this.oOwner.fireOnChange();
}
//----------------------------------------------------------------------
//private; 响应 OuterPanel.onkeydown 事件的处理方法.
//return: void;
function TextBox_eventAnswer_OnKeyDown(){
	if (!this.isInGrid){
	  var viKey= event.keyCode;
	  if (viKey== 9) viKey= 13;
	  if (viKey== 13){          //enter;
	  	if (event.shiftKey){
	  		PageX.focusPreviousBox(this.sid);
	  	}else{
				PageX.focusNextBox(this.sid);
			}
	  }
	}
}

//----------------------------------------------------------------------
function TextBox_release() {
	if (this.oInputBox != null) {
		this.oInputBox.oOwner = null;
		this.oInputBox.onfocus = null;
		this.oInputBox.onblur = null;
	}
	if (this.oFocusButton != null) {
		this.oFocusButton.oOwner = null;
		this.oFocusButton.onfocus = null;
	}
	if (this.oDefValSpan != null) {
		this.oDefValSpan.oOwner = null;
	}
	Base_release.call(this);
}



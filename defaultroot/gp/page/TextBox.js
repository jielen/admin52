/* $Id: TextBox.js,v 1.5 2008/06/16 02:56:16 hemg Exp $ */
/*
Title: gp.page.TextBox
Description: �ı��༭����;������ͨ�ַ����ı༭;
Company: ��������
Date: 2004/08/19
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function TextBox(sid){
  //1.���� =function();
  Base.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.TextBox";

  this.OWNER_TYPE_FREE= "free";
  this.OWNER_TYPE_GRID= "grid";
  this.OWNER_TYPE_BOXSET= "boxset";
  this.OWNER_TYPE_SEARCH= "search";

  this.DOMID_INPUT= "TextInput";
  this.DOMID_FOCUS_BUTTON= "FocusButton";
  this.DOMID_BOX_SUBFIX= "_BOX";
  
  this.DISABLED_COLOR= "black";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.
  this.oOuterObj= null;        //�ⲿ����;

  this.oOuterPanel= null; //private; �ⲿ���,������ TextBox �Ļ���ƽ̨��ʵ������һ��Div����
  this.oInputBox= null;   //private; �����;
  this.oFocusButton= null;//private;
  this.oDefValSpan= null; //private;

  this.oRect= new Rect(0, 0, 120, 20);       //private; ����Ĵ�С;
  this.oDefRect= new Rect(0, 0, 120, 20);    //private; ����Ĭ�ϵĴ�С;
  this.iMaxWidth= -1;

  this.tIsFireOnChange= true;//private;
  this.tIsEditBox= true;     //private;
  this.tHasInit= false;      //�����Ƿ�ʼ���ı�־;
  this.isInGrid = false;		//�Ƿ���Grid�еı༭��Grid�еı༭���keydown�¼���Ӧ��һ��

  this.sOldValue= "";        //private;
  
  this.sNormColor= "blue";

  //4.�¼������� =function();
  this.OnInit= "OnInit";          //����: oSender;
  this.OnResize= "OnResize";      //����: oSender;
  this.OnChange= "OnChange";      //����: oSender, sValue, oEvent;

  //5.���������� =function();
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
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
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
//public; ���������Ĵ�С.
//����ֵ: �ɹ�: true, ʧ��: false;
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
//public; ���ö����С.
//����ֵ: void;
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
//public; ���ý���.
//����ֵ: void;
function TextBox_setFocus(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setFocus");
  if (this.isVisible()== false) return;
  if(PF.parseBool(this.oFocusButton.disabled)== true) return;
  this.oFocusButton.focus();
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function TextBox_setValue(sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValue");
  this.sOldValue= this.oInputBox.value;
  if (this.oInputBox.value== new String(sValue)) return;
  this.oInputBox.value= sValue;
  this.fireOnChange();
  return;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ:�ɹ�: ֵ, ʧ��: "";
function TextBox_getValue(){
  if (this.tHasInit== false) return "";
  return this.oInputBox.value;
}
//----------------------------------------------------------------------
//public; ����ֵ;
//����ֵ: void;
function TextBox_clear(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "clear");
  this.setValue("");
  return;
}
//----------------------------------------------------------------------
//public; �Ƿ����������;
//����ֵ: ��:true; ����: false;
function TextBox_isDataRela(){
  var vsTable= this.getTableName();
  var vsField= this.getFieldName();
  if (vsTable== null || vsTable== "") return false;
  if (vsField== null || vsField== "") return false;
  return true;
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: table name/ "";
function TextBox_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public; ����ֵ;
//return: void;
function TextBox_setTableName(sTable){
  this.oOuterPanel.tablename= sTable;
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: table name/ "";
function TextBox_isFreeMember(){
  return PF.parseBool(this.oOuterPanel.isfreemember);
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: data type/ "";
function TextBox_isForceDflt(){
  return PF.parseBool(this.oOuterPanel.isforcedflt);
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: data type/ "";
function TextBox_getOwnerType(){
  return this.oOuterPanel.ownertype;
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: data type/ "";
function TextBox_getFieldType(){
  return this.oOuterPanel.fieldtype;
}
//----------------------------------------------------------------------
//public; ����ֵ;
//return: void;
function TextBox_setFieldType(sFieldType){
  this.oOuterPanel.fieldtype= sFieldType;
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: field name/ "";
function TextBox_getFieldName(){
  return this.oOuterPanel.fieldname;
}
//----------------------------------------------------------------------
//public; ����ֵ;
//return: void;
function TextBox_setFieldName(sField){
  this.oOuterPanel.fieldname= sField;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: maxlen/ 0;
function TextBox_getMaxLen(){
  return PF.parseInt(this.oOuterPanel.maxlen);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function TextBox_setMaxLen(iMaxLen){
  this.oOuterPanel.maxlen= iMaxLen;
  this.oInputBox.maxLength= iMaxLen;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: minlen/ 0;
function TextBox_getMinLen(){
  return PF.parseInt(this.oOuterPanel.minlen);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function TextBox_setMinLen(iMinLen){
  this.oOuterPanel.minlen= iMinLen;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: groupid/ "";
function TextBox_getGroupId(){
  return this.oOuterPanel.groupid
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function TextBox_setGroupId(sGroupId){
  this.oOuterPanel.groupid= sGroupId;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: tabindex/ -1;
function TextBox_getTabIndex(){
  return this.oOuterPanel.tabIndex;
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function TextBox_setTabIndex(iTabIndex){
  this.oOuterPanel.tabIndex= iTabIndex;
}
//----------------------------------------------------------------------
//public; �����������¼������.
//����ֵ:void;
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
//public; �ж��Ƿ��������¼��.
//����ֵ: ����: true; ����: false;
function TextBox_isAllowInput(){
	return PF.parseBool(this.oOuterPanel.isallowinput);
}
//----------------------------------------------------------------------
//public; ����ֻ������.
//����ֵ: void;
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
//private; ����ֻ������.
//����ֵ: void;
function TextBox_setReadOnlyColor(tIsReadOnly){
  if (!this.oInputBox.readOnly){
    this.sNormColor= this.oInputBox.style.color;
  }
  var vsColor= tIsReadOnly? this.DISABLED_COLOR: this.sNormColor;
  this.oInputBox.style.color= vsColor;
}
//�жϵ�ǰ�༭���Ƿ���Խ��ܽ��㣬�����л�ʱ����
function TextBox_canFocus(){
	return this.isVisible() && !this.isReadOnly();
}
//----------------------------------------------------------------------
//public; �ж��Ƿ�ֻ��.
//����ֵ: ֻ��: true; ����: false;
function TextBox_isReadOnly(){
  return PF.parseBool(this.oOuterPanel.isreadonly);
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: default value/ "";
function TextBox_isForceReadOnly(){
  return PF.parseBool(this.oOuterPanel.isforcereadonly);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function TextBox_setForceReadOnly(tIsForceReadOnly){
  this.oOuterPanel.isforcereadonly= tIsForceReadOnly;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//return: true/false;
function TextBox_isAllowNull(){
  return PF.parseBool(this.oOuterPanel.isallownull);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//return: true/false;
function TextBox_setAllowNull(tIsAllowNull){
  this.oOuterPanel.isallownull= tIsAllowNull;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: default value/ "";
function TextBox_getDefExpr(){
  if (this.oDefValSpan== null) return "";
  return this.oDefValSpan.innerText;
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function TextBox_setDefExpr(value){
  this.oDefValSpan.innerText= value;
}
//----------------------------------------------------------------------
//private; ��ȡֵ.
//����ֵ: inputadjustwidth/ 0;
function TextBox_getInputAdjustWidth(){
  return this.oOuterPanel.inputadjustwidth;
}
//----------------------------------------------------------------------
//private; ����ֵ.
//����ֵ:void;
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
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private; ���ݸı��¼�.
//����ֵ:�ɹ�: true, ʧ��: false;
function TextBox_fireOnChange(){
  if (this.oInputBox.value== this.sOldValue) return;
  this.sOldValue= this.oInputBox.value;
  //�¼�������Ӧͨ��,�����̳���ʹ��;
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
//private; ��ý���.
//����ֵ:�ɹ�: true, ʧ��: false;
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
//private; ��ý���.
//����ֵ:�ɹ�: true, ʧ��: false;
function TextBox_oOuterPanel_onfocus(){
  var voBox= this.oOwner;
  if (PF.parseBool(voBox.oFocusButton.disabled)== true) return;//��Ա��Ƭinput����
  if (PF.isVisible(voBox.oFocusButton)) voBox.oFocusButton.focus();
}
//----------------------------------------------------------------------
//private; ʧȥ����.
//����ֵ:�ɹ�: true, ʧ��: false;
function TextBox_oOuterPanel_onblur(){
  return true;
}
//----------------------------------------------------------------------
//private; ��ý���.
//����ֵ:�ɹ�: true, ʧ��: false;
function TextBox_oInputBox_onfocus(){
  var voBox= this.oOwner;
  voBox.oInputBox.select();
  voBox.fireOnFocus();
}
//----------------------------------------------------------------------
//private; ʧȥ����.
//����ֵ:�ɹ�: true, ʧ��: false;
function TextBox_oInputBox_onblur(){
  this.oOwner.fireOnChange();
}
//----------------------------------------------------------------------
//private; ��Ӧ OuterPanel.onkeydown �¼��Ĵ�����.
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



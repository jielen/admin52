/* $Id: Card.js,v 1.1 2008/02/20 11:42:01 liuxiaoyong Exp $ */
/*
Title: gp.page.Card
Description:
��Ƭ�࣬������ʾ XML ���ݣ����ṩ���ݵķ��ʣ�
Company: ��������
Author: leidh;
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function Card(){
  //1.���� =function();
  Free.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.Card";

  this.DATA_SOURCE_TYPE_ALONE = "alone";
  this.DATA_SOURCE_TYPE_FROM_PARENT = "fromparent";
  this.DATA_SOURCE_TYPE_FROM_PAGE = "frompage";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.
  this.oOuterObj= null;        //�ⲿ����;

  this.oOuterPanel= null;        //private; �ⲿ���,������ Card �Ļ���ƽ̨.
  this.oVisibleAreaPanel= null;  //private;
  this.oInvisibleAreaPanel= null;//private;
  this.oAreaTable= null;         //private;
  this.oBoxIdsSpan= null;        //private;  

  this.oDefRect= new Rect(0, 0, 400, 300);    //private; ����Ĭ�ϵĴ�С;
  this.oRect= new Rect(0, 0, 400, 300);       //private; ����Ĵ�С;

  this.tIsFocus= false;      //private; �������ڱ��ؼ���;����onblurʱ���ж�;onmousedownʱ��ֵ;
  this.tHasInit= false;      //�����Ƿ�ʼ���ı�־;
  
  //������;
  this.oParentObj= null;   //public; ָ parent Grid; interface method: loadField();  

  //4.�¼������� =function();
  //���� Before ����¼����ǿ��Ե��� abortEvent(true) ����������ֹ��.
  this.OnResize= "OnResize";                    //����: oSender;
  //�����¼�������ĵ�;


	//5.����������= function();
	//public;
  this.init= Card_init
  this.resize= Card_resize
  this.make= Card_make
  this.getTableName= Card_getTableName
  this.setTableName= Card_setTableName
  this.getDataSourceType= Card_getDataSourceType
  this.setDataSourceType= Card_setDataSourceType
  this.getColCount= Card_getColCount
  this.setColCount= Card_setColCount
  this.getTabIndex= Card_getTabIndex
  this.setTabIndex= Card_setTabIndex
  this.isVisible= Card_isVisible
  this.setVisible= Card_setVisible
  this.isReadOnly= Card_isReadOnly
  this.setReadOnly= Card_setReadOnly
  this.isWritable= Card_isWritable
  this.setWritable= Card_setWritable
  this.setClass= Card_setClass;
  this.setStyle= Card_setStyle;
  this.setStyleItem= Card_setStyleItem;

	//private;
	this.adjustStyle= Card_adjustStyle;
	this.eventAnswer_OnBeforeUpdate= Card_eventAnswer_OnBeforeUpdate;
	//this.eventAnswer_OnAfterUpdate= Card_eventAnswer_OnAfterUpdate;
	this.release = Card_release;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ��ʼ��.
//return:�ɹ�: true, ʧ��: false;
function Card_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Free_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; ���������Ĵ�С.
//return:�ɹ�: true, ʧ��: false;
function Card_resize(){
  //alert(this.CLASSNAME+ ".resize();");
  if (this.tHasInit== false) return false;

  if (this.oRect.iWidth== null || (!this.oRect.isWidthPercent() && parseInt(this.oRect.iWidth)< 50)) this.oRect.iWidth= 50;
  if (this.oRect.iHeight== null || (!this.oRect.isHeightPercent() && parseInt(this.oRect.iHeight)< 50)) this.oRect.iHeight= 50;

  /*
  if (this.getPosition()== "absolute"){
    this.oOuterPanel.style.left= this.oRect.iLeft;
    this.oOuterPanel.style.top= this.oRect.iTop;
  }
  //*/
  this.oOuterPanel.style.left= this.oRect.iLeft;
  this.oOuterPanel.style.top= this.oRect.iTop;
  this.oOuterPanel.style.width= this.oRect.iWidth;
  this.oOuterPanel.style.height= this.oRect.iHeight;
  
  //this.oAreaTable.style.left= 0;
  //this.oAreaTable.style.top= 0;
  //this.oAreaTable.style.width= this.oOuterPanel.clientWidth;

  //���ⷢ���¼�;
  if (PF.isExistMethodK(this.eventAnswer_OnResize)){
    this.eventAnswer_OnResize(this);
  }
  this.fireEvent(this.OnResize, new Array(this));
  return true;
}
//----------------------------------------------------------------------
//public; ���� Card �� HTML DOM ����
//return:�ɹ�: true, ʧ��: false;
function Card_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;

  this.oVisibleAreaPanel= this.oOuterPanel.all("VisibleAreaPanel");
  this.oInvisibleAreaPanel= this.oOuterPanel.all("InvisibleAreaPanel");
  this.oAreaTable= this.oVisibleAreaPanel.all("AreaTable");
  this.oBoxIdsSpan= this.oOuterPanel.all("EditBoxIdsSpan");
  
  this.oOuterPanel.oOwner= this;
  this.oVisibleAreaPanel.oOwner= this;
  this.oInvisibleAreaPanel.oOwner= this;
  this.oAreaTable.oOwner= this;
  this.oBoxIdsSpan.oOwner= this;

  var vsBoxId= "";
  var voBox= null;
	for (var i= 0, len= this.oBoxIdsSpan.childNodes.length; i< len; i++){
	  vsBoxId= this.oBoxIdsSpan.childNodes[i].innerText;
	  if (PF.isEmpty(vsBoxId)) continue;
	  voBox= this.oOuterPanel.all(vsBoxId).oOwner;
	  this.addEditBox(voBox);
	  voBox.resize();
	}
  return true;
}
//----------------------------------------------------------------------
//public;
function Card_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public;
function Card_setTableName(sTableName){
  this.oOuterPanel.tablename= sTableName;
}
//----------------------------------------------------------------------
//public;
function Card_getDataSourceType(){
  return this.oOuterPanel.datasourcetype;
}
//----------------------------------------------------------------------
//public;
function Card_setDataSourceType(sDataSourceType){
  this.oOuterPanel.datasourcetype= sDataSourceType;
}
//----------------------------------------------------------------------
//public;
function Card_getColCount(){
  return this.oOuterPanel.colcount;
}
//----------------------------------------------------------------------
//public;
function Card_setColCount(iColCount){
  this.oOuterPanel.colcount= iColCount;
}
//----------------------------------------------------------------------
//public;
function Card_getTabIndex(){
  return PF.parseInt(this.oOuterPanel.tabindex);
}
//----------------------------------------------------------------------
//public;
function Card_setTabIndex(iTabIndex){
  this.oOuterPanel.tabindex= iTabIndex;
}
//----------------------------------------------------------------------
//public;
function Card_isVisible(){
  return PF.parseBool(this.oOuterPanel.isvisible);
}
//----------------------------------------------------------------------
//public;
function Card_setVisible(tIsVisible){
  this.oOuterPanel.isvisible= tIsVisible;
}
//----------------------------------------------------------------------
//public;
function Card_isReadOnly(){
  return PF.parseBool(this.oOuterPanel.isreadonly);
}
//----------------------------------------------------------------------
//public;
function Card_setReadOnly(tIsReadOnly){
  Free_setReadOnly.call(this, tIsReadOnly);
  this.oOuterPanel.isreadonly= tIsReadOnly;
}
//----------------------------------------------------------------------
//public;
function Card_isWritable(){
  return PF.parseBool(this.oOuterPanel.iswritable);
}
//----------------------------------------------------------------------
//public;
function Card_setWritable(tIsWritable){
  this.oOuterPanel.iswritable= tIsWritable;
}
//----------------------------------------------------------------------
//private; �������,�Ա��������ؼ��ĵķ����ȷ��;
//return: void;
function Card_adjustStyle(){
  //alert(this.CLASSNAME+ ".adjustStyle();");
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "adjustStyle");

  this.oOuterPanel.style.overflow= "hidden";
  //this.oOuterPanel.style.borderWidth= "0";
  
  this.oAreaTable.style.position= "relative";

  if (isNaN(parseInt(this.oOuterPanel.currentStyle.width))){
    this.oOuterPanel.style.width= this.oDefRect.iWidth;
  }
  if (isNaN(parseInt(this.oOuterPanel.currentStyle.height))){
    this.oOuterPanel.style.height= this.oDefRect.iHeight;
  }

  this.oRect.iLeft= this.oOuterPanel.offsetLeft;
  this.oRect.iTop= this.oOuterPanel.offsetTop;
  this.oRect.iWidth= this.oOuterPanel.offsetWidth;
  this.oRect.iHeight= this.oOuterPanel.offsetHeight;
  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; ���÷��;
//return: void;
function Card_setStyle(sStyle){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; ���÷���е�ָ����Ŀ;
//param: sName ��д������Ϊ js ��д��,��: border-color,����д�� borderColor;
//return: void;
function Card_setStyleItem(sName, sValue){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; ���÷��;
//return: void;
function Card_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private;
//return: void;
function Card_eventAnswer_OnBeforeUpdate(oSender, iRowIndex, sFieldName, sValue, sOldValue){
  //alert("Card_eventAnswer_OnBeforeUpdate");
  if (this.oParentObj== null) return;
  var voGrid= this.oParentObj;
  voGrid.setValueByRowField(voGrid.getGridRowX(iRowIndex), sFieldName, sValue);
  this.abortEvent(true);
}
//----------------------------------------------------------------------
//private;
//return: void;
/*
function Card_eventAnswer_OnAfterUpdate(oSender, iRowIndex, sFieldName, sValue, sOldValue){
  //alert("Card_eventAnswer_OnAfterUpdate");
  if (this.oParentObj== null) return;
  this.oParentObj.loadField(iRowIndex, sFieldName);
}
//*/
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//8.���㴦���¼���= function();
//----------------------------------------------------------------------
//private; ��ý���.
//return: void;
function Card_oOuterPanel_onfocus(){
  var voCard= this.oOwner;
  //voCard.fireOnFocus();
  return;
}
//----------------------------------------------------------------------
//private; ʧȥ����.
//return: void;
function Card_oOuterPanel_onblur(){
  var voCard= this.oOwner;
  if (voCard.isKeepFocus()) return;
  voCard.lostFocus();
  //voCard.fireOnBlur();
  return;
}
//----------------------------------------------------------------------
//private; Base ���¼���Ӧ; OnClick;
//return: void;
function Card_eventAnswer_OnClick(oSender, oEvent){
  var voOwner= PF.getOwner(event.srcElement);
  if (voOwner== this) this.setFocus();
}
//----------------------------------------------------------------------
//private; ���㴦��;
//return: void;
function Card_eventDispose_OnFocus(){
  this.oInnerPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oHeadPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oHeadTablePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oBodyPanel.onfocus= function(){this.oOwner.setFocus();};
  //this.oBodyImagePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oBodyImagePanel.onfocus= function(){this.oOwner.oFocusStopInput.focus();};
  this.oFocusStopInput.onfocus= function(){
    var voCard= this.oOwner;
    voCard.setHeadBackColor(voCard.sHeadBackLightColor);
    //voCard.setCurRowBackColor();
    voCard.setRowBackColor(voCard.iCurRow, voCard.ROW_BACK_COLOR_SELECT_LIGHT);
    voCard.setCurRowForeColor();
    voCard.tIsFocus= true;
  };
  this.oBodyTableImagePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oBodyTablePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockBodyTablePanel.onfocus= function(){this.oOwner.setFocus();};

  this.oHeadTable.onfocus= function(){this.oOwner.setFocus();};
  this.oHeadRepCellTable.onfocus= function(){this.oOwner.setFocus();};

  this.oLockHeadPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockHeadTablePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockBodyPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockBodyTablePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockHeadTable.onfocus= function(){this.oOwner.setFocus();};

  this.oNewPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oMoveLine.onfocus= function(){this.oOwner.setFocus();};
  this.oSelectAllCheckBox.onfocus= function(){this.oOwner.setFocus();};
}
//----------------------------------------------------------------------

function Card_release() {
	if (this.oVisibleAreaPanel != null) {
		this.oVisibleAreaPanel.oOwner = null;
	}
	if (this.oInvisibleAreaPanel != null) {
		this.oInvisibleAreaPanel.oOwner = null;
	}
	if (this.oAreaTable != null) {
		this.oAreaTable.oOwner = null;
	}
	if (this.oBoxIdsSpan != null) {
		this.oBoxIdsSpan.oOwner = null;
	}
	if (this.oINnerPanel != null) {
		this.oInnerPanel.onfocus = null;
	}
	if (this.oHeadPanel != null) {
		this.oHeadPanel.onfocus = null;
	}
	if (this.oHeadTablePanel != null) {
		this.oHeadTablePanel.onfocus = null;
	}
	if (this.oBodyPanel != null) {
		this.oBodyPanel.onfocus = null;
	}	
	if (this.oBodyImagePanel != null) {
		this.oBodyImagePanel.onfocus = null;
	}
	if (this.oFocusStopInput!= null) {
		this.oFocusStopInput.onfocus = null;
	}
	if (this.oBodyTableImagePanel!= null) {
		this.oBodyTableImagePanel.onfocus = null;
	}
	if (this.oBodyTablePanel != null) {
		this.oBodyTablePanel.onfocus = null;
	}
	if (this.oLockBodyTablePanel != null) {
		this.oLockBodyTablePanel.onfocus = null;
	}
	if (this.oHeadTable != null) {
		this.oHeadTable.onfocus = null;
	}
	if (this.oHeadRepCellTable != null) {
		this.oHeadRepCellTable.onfocus = null;
	}
	if (this.oLockHeadPanel != null) {
		this.oLockHeadPanel.onfocus = null;
	}
	if (this.oLockBodyPanel != null) {
		this.oLockBodyPanel.onfocus = null;
	}
	if (this.oLockBodyTablePanel != null) {
		this.oLockBodyTablePanel.onfocus = null;
	}
	if (this.oLockHeadTable != null) {
		this.oLockHeadTable.onfocus = null;
	}
	if (this.oNewPanel.onfocus != null) {
		this.oNewPanel.onfocus = null;
	}
	if (this.oMoveLine != null) {
		this.oMoveLine.onfocus = null;
	}
	if (this.oSelectAllCheckBox != null) {
		this.oSelectAllCheckBox.onfocus = null;
	}
	Free_release.call(this);
}



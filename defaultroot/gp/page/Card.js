/* $Id: Card.js,v 1.1 2008/02/20 11:42:01 liuxiaoyong Exp $ */
/*
Title: gp.page.Card
Description:
卡片类，用于显示 XML 数据，并提供数据的访问，
Company: 用友政务
Author: leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Card(){
  //1.超类 =function();
  Free.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.Card";

  this.DATA_SOURCE_TYPE_ALONE = "alone";
  this.DATA_SOURCE_TYPE_FROM_PARENT = "fromparent";
  this.DATA_SOURCE_TYPE_FROM_PAGE = "frompage";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部对象;

  this.oOuterPanel= null;        //private; 外部面板,是整个 Card 的基础平台.
  this.oVisibleAreaPanel= null;  //private;
  this.oInvisibleAreaPanel= null;//private;
  this.oAreaTable= null;         //private;
  this.oBoxIdsSpan= null;        //private;  

  this.oDefRect= new Rect(0, 0, 400, 300);    //private; 对象默认的大小;
  this.oRect= new Rect(0, 0, 400, 300);       //private; 对象的大小;

  this.tIsFocus= false;      //private; 焦点仍在本控件中;用于onblur时作判断;onmousedown时赋值;
  this.tHasInit= false;      //对象是否被始化的标志;
  
  //父对象;
  this.oParentObj= null;   //public; 指 parent Grid; interface method: loadField();  

  //4.事件声明区 =function();
  //凡是 Before 类的事件都是可以调用 abortEvent(true) 方法进行中止的.
  this.OnResize= "OnResize";                    //参数: oSender;
  //以上事件已完成文档;


	//5.方法声明区= function();
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
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//return:成功: true, 失败: false;
function Card_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Free_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//return:成功: true, 失败: false;
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

  //向外发送事件;
  if (PF.isExistMethodK(this.eventAnswer_OnResize)){
    this.eventAnswer_OnResize(this);
  }
  this.fireEvent(this.OnResize, new Array(this));
  return true;
}
//----------------------------------------------------------------------
//public; 生成 Card 的 HTML DOM 对象；
//return:成功: true, 失败: false;
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
//private; 调整风格,以保持整个控件的的风格正确性;
//return: void;
function Card_adjustStyle(){
  //alert(this.CLASSNAME+ ".adjustStyle();");
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "adjustStyle");

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
//public; 设置风格;
//return: void;
function Card_setStyle(sStyle){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格中的指定项目;
//param: sName 的写法必须为 js 的写法,如: border-color,必须写成 borderColor;
//return: void;
function Card_setStyleItem(sName, sValue){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//return: void;
function Card_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
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
//8.焦点处理事件组= function();
//----------------------------------------------------------------------
//private; 获得焦点.
//return: void;
function Card_oOuterPanel_onfocus(){
  var voCard= this.oOwner;
  //voCard.fireOnFocus();
  return;
}
//----------------------------------------------------------------------
//private; 失去焦点.
//return: void;
function Card_oOuterPanel_onblur(){
  var voCard= this.oOwner;
  if (voCard.isKeepFocus()) return;
  voCard.lostFocus();
  //voCard.fireOnBlur();
  return;
}
//----------------------------------------------------------------------
//private; Base 的事件响应; OnClick;
//return: void;
function Card_eventAnswer_OnClick(oSender, oEvent){
  var voOwner= PF.getOwner(event.srcElement);
  if (voOwner== this) this.setFocus();
}
//----------------------------------------------------------------------
//private; 焦点处理;
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



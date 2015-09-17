/* $Id: Base.js,v 1.6 2008/06/20 05:30:14 liuxiaoyong Exp $ */
/*
Title: gp.common.Base
Description:
所有类的基类，如果一个对象需要作为事件源向外传送事件,最好从这个类中继承.
Company: 用友政务
Author:leidh
*/
var initialized = false;
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Base(){
  //1.超类 =function();

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.common.Base";

  this.FOCUS_EXIST= 1;  //焦点事件已发出;不要再发;
  this.FOCUS_KEEP= 2;   //焦点仍存在于本控件中;不要失去;

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;   //对象名称.

  this.oOuterPanel= null;       //private;
  this.oRect= new Rect();       //private;
  this.oOriginalRect= new Rect();//private;
  this.oDefRect= new Rect();    //private;

  this.oEventMap= null;         //private; 按事件名称分组的事件侦听队列;
  this.sUID= "";                //private; 事件消息发送中用;
  this.tIsAbortEvent= false;    //private; 是否中止事件继续执行; 只对 will 类的事件有效;

  this.iFocusMark= 0;           //private;
  this.tHasInit= false;         //public;
  this.tHasResize= false;       //private;
  
  //resize 振荡控制;
  this.tIsResizing= false;
  this.tIsResizeEnd= false;     //private;
  this.iResizingTime= 0;        //private;

  //4.事件声明区 =function();
  this.OnInit= "OnInit";              //oSender;
  this.OnClick= "OnClick";            //oSender, oEvent;
  this.OnDblClick= "OnDblClick";      //oSender, oEvent;
  this.OnMouseDown= "OnMouseDown";    //oSender, oEvent;
  this.OnMouseUp= "OnMouseUp";        //oSender, oEvent;
  this.OnMouseEnter= "OnMouseEnter";  //oSender, oEvent;
  this.OnMouseMove= "OnMouseMove";    //oSender, oEvent;
  this.OnMouseOver= "OnMouseOver";    //oSender, oEvent;
  this.OnMouseOut= "OnMouseOut";      //oSender, oEvent;
  this.OnKeyPress= "OnKeyPress";      //oSender, oEvent;
  this.OnKeyDown= "OnKeyDown";        //oSender, oEvent;
  this.OnKeyUp= "OnKeyUp";            //oSender, oEvent;
  this.OnFocus= "OnFocus";            //oSender, oEvent;
  this.OnBlur= "OnBlur";              //oSender, oEvent;

  //5.方法声明区 =function();
  //public;
  this.abortEvent= Base_abortEvent;
  this.addListener= Base_addListener;
  this.changeFocus= Base_changeFocus;
  this.deleteListener= Base_deleteListener;
  this.findListener= Base_findListener;
  this.fireEvent= Base_fireEvent;
  this.fireOnBlur= Base_fireOnBlur;
  this.fireOnFocus= Base_fireOnFocus;
  this.getContainer= Base_getContainer;
  this.getOffsetRect= Base_getOffsetRect;
  this.getPosition= Base_getPosition;
  this.getRect= Base_getRect;
  this.getZIndex= Base_getZIndex;
  this.init= Base_init;
  this.isAbortEvent= Base_isAbortEvent;
  this.isFocus= Base_isFocus;
  this.isVisible= Base_isVisible;
  this.lostFocus= Base_lostFocus;
  this.moveTo= Base_moveTo;
  this.resize= Base_resize;
  this.setContainer= Base_setContainer;
  this.setFocus= Base_setFocus;
  this.setListenerEnabled= Base_setListenerEnabled;
  this.setPosition= Base_setPosition;
  this.setRect= Base_setRect;
  this.setVisible= Base_setVisible;
  this.setZIndex= Base_setZIndex;
  this.fireOnResize= Base_fireOnResize;
  this.getOuterPanel= Base_getOuterPanel;
  //以上已完成文档
  
  //private;
  this.setInitMark= Base_setInitMark;
  this.setFocusMark= Base_setFocusMark;
  this.isKeepFocus= Base_isKeepFocus;
  this.setRectWithOuterPanel= Base_setRectWithOuterPanel;
  this.bindResizeToOuterPanel= Base_bindResizeToOuterPanel;
  
  this.release = Base_release;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function Base_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (this.sUID== null || this.sUID== "") this.sUID= PF.getUID();
  if (this.oEventMap== null) this.oEventMap= new Map();

//*huangcb:20080418此段执行耗时60ms,移除后Tree有问题
  if (typeof(this.oOuterPanel)!= "undefined" && this.oOuterPanel!= null){
    this.oOuterPanel.oOwner= this;
    if (this.oOuterPanel.onclick== null) this.oOuterPanel.onclick= Base_oOuterPanel_onclick;
    if (this.oOuterPanel.ondblclick== null) this.oOuterPanel.ondblclick= Base_oOuterPanel_ondblclick;
    if (this.oOuterPanel.onkeydown== null) this.oOuterPanel.onkeydown= Base_oOuterPanel_onkeydown;
    if (this.oOuterPanel.onkeypress== null) this.oOuterPanel.onkeypress= Base_oOuterPanel_onkeypress;
/*    if (this.oOuterPanel.onkeyup== null) this.oOuterPanel.onkeyup= Base_oOuterPanel_onkeyup;
    if (this.oOuterPanel.onkeypress== null) this.oOuterPanel.onkeypress= Base_oOuterPanel_onkeypress;
    if (this.oOuterPanel.onmousedown== null) this.oOuterPanel.onmousedown= Base_oOuterPanel_onmousedown;
    if (this.oOuterPanel.onmouseenter== null) this.oOuterPanel.onmouseenter= Base_oOuterPanel_onmouseenter;
    if (this.oOuterPanel.onmousemove== null) this.oOuterPanel.onmousemove= Base_oOuterPanel_onmousemove;
    if (this.oOuterPanel.onmouseout== null) this.oOuterPanel.onmouseout= Base_oOuterPanel_onmouseout;
    if (this.oOuterPanel.onmouseover== null) this.oOuterPanel.onmouseover= Base_oOuterPanel_onmouseover;
    if (this.oOuterPanel.onmouseup== null) this.oOuterPanel.onmouseup= Base_oOuterPanel_onmouseup;
    if (this.oOuterPanel.onfocus== null) this.oOuterPanel.onfocus= Base_oOuterPanel_onfocus;
    if (this.oOuterPanel.onblur== null) this.oOuterPanel.onblur= Base_oOuterPanel_onblur;
    this.bindResizeToOuterPanel(true);
*/
  }
//*/
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//private; 设置初始化标记.
//返回值: 成功: true, 失败: false;
function Base_setInitMark(){
  this.tHasInit= true;

  //向外发送事件; OnInit
  if (PF.isExistMethodK(this.eventAnswer_OnInit)){
    this.eventAnswer_OnInit(this);
  }
  this.fireEvent(this.OnInit, new Array(this));
  return true;
}
//----------------------------------------------------------------------
//public; 向外发送事件; OnResize
//返回值: void;
function Base_fireOnResize(){
  //向外发送事件; OnResize
  if (PF.isExistMethodK(this.eventAnswer_OnResize)){
    this.eventAnswer_OnResize(this);
  }
  this.fireEvent(this.OnResize, new Array(this));
  this.tHasResize= true;    //private;
}
//----------------------------------------------------------------------
//public; 增加事件侦听对象.
//返回值:成功:true; 失败:false;
function Base_addListener(oListener){
  if (oListener== null) return;
  oListener.oSource= this;
  oListener.oOwnerFrame= window;
  oListener.init();
  return PF.addListener(oListener);
}
//----------------------------------------------------------------------
//public; 删除事件侦听对象.
//返回值:成功:true; 失败:false;
function Base_deleteListener(sEvent, oDest, oAnswerMethod){
  return PF.deleteListener(sEvent, this, oDest, oAnswerMethod);
}
//----------------------------------------------------------------------
//public; 设置指定的事件侦听对象是否可用.
//返回值: void;
function Base_setListenerEnabled(oListener, tEnabled){
  PF.setListenerEnabled(oListener, tEnabled);
  return;
}
//----------------------------------------------------------------------
//public; 查找事件侦听对象.
//返回值:成功:aiIndex,是指所有符合条件的事件侦听对象的序号; 失败:null;
function Base_findListener(sEvent, oDest, oAnswerMethod){
  return PF.findListener(sEvent, this, oDest, oAnswerMethod);
}
//----------------------------------------------------------------------
//public; 触发事件.
//返回值:成功:true; 失败:false;
function Base_fireEvent(sEventName, avArg){
  return PF.fireEvent(this, sEventName, avArg);
}
//----------------------------------------------------------------------
//public; 设置事件是否中止.
//返回值: void;
function Base_abortEvent(tIsAbortEvent){
  this.tIsAbortEvent= tIsAbortEvent;
}
//----------------------------------------------------------------------
//public; 设置事件是否中止.
//这个方法很有意思,只能调用一次,
//调用后,立该会将 this.tIsAbortEvent 恢复成默认值: false; 以供下次调用;
//返回值：true / false;
function Base_isAbortEvent(){
  var vtIsAbortEvent= this.tIsAbortEvent;
  this.abortEvent(false);
  return vtIsAbortEvent;
}
//----------------------------------------------------------------------
//public; 移动到指定的位置.
//返回值: 成功: true, 失败: false;
function Base_moveTo(iLeft, iTop){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "moveTo");
  if (this.oOuterPanel== null) false;
  this.oRect.iLeft= iLeft;
  this.oRect.iTop= iTop;
  this.oOuterPanel.style.left= iLeft;
  this.oOuterPanel.style.top= iTop;
  return true;
}
//----------------------------------------------------------------------
//public; 设置控件的坐标系是absolute 或者是 relative
//返回值:void
function Base_setPosition(sPosition){
  if (this.oOuterPanel== null) return;
  this.oOuterPanel.style.position= sPosition;
  return;
}
//----------------------------------------------------------------------
//public; 设置控件的 container object;
//返回值: void
function Base_setContainer(oContainer){
  if (this.oOuterPanel== null) return;
  if (oContainer== null) return;
  oContainer.appendChild(this.oOuterPanel);
  return;
}
//----------------------------------------------------------------------
//public; 获取控件的 container object;
//返回值: 成功: container object; 否则: null;
function Base_getContainer(){
  if (this.oOuterPanel== null) return null;
  return this.oOuterPanel.parentNode;
}
//----------------------------------------------------------------------
//public; 设置控件的坐标系是absolute 或者是 relative
//返回值: 成功:定位方式; 否则:null;
function Base_getPosition(){
  if (this.oOuterPanel== null) return null;
  var vsPostion= this.oOuterPanel.currentStyle.position;
  return vsPostion;
}
//----------------------------------------------------------------------
//public; 获取对象的 OuterPanel;
//返回值: 成功:OuterPanel; 否则:null;
function Base_getOuterPanel(){
  return this.oOuterPanel;
}
//----------------------------------------------------------------------
//public; 设置 z-index;
//返回值: void;
function Base_setZIndex(iZIndex){
  if (this.oOuterPanel== null) return;
  this.oOuterPanel.style.zIndex= iZIndex;
}
//----------------------------------------------------------------------
//public; 获取 z-index;
//返回值: 成功:z-index; 否则:null;
function Base_getZIndex(){
  if (this.oOuterPanel== null) return null;
  return this.oOuterPanel.currentStyle.zIndex;
}
//----------------------------------------------------------------------
//public; 设置整个 TextBox 是否可见.
//返回值: void;
function Base_setVisible(tIsVisible){
  if (this.oOuterPanel== null) return;
  tIsVisible= PF.parseBool(tIsVisible);
  this.oOuterPanel.style.display= (tIsVisible)? "": "none";
}
//----------------------------------------------------------------------
//public; 判断整个 TextBox 是否可见.
//返回值:可见: true, 不可见: false;
function Base_isVisible(){
  if (this.oOuterPanel== null) return false;
  var vtIsVisible= PF.isVisible(this.oOuterPanel);
  return vtIsVisible;
}
//----------------------------------------------------------------------
//public; 获取 Rect;
//返回值: 成功: this.oRect; 否则: null;
function Base_getOffsetRect(){
  if (this.oOuterPanel== null) return null;
  var voRect= new Rect();
  voRect.iLeft= this.oOuterPanel.offsetLeft;
  voRect.iTop= this.oOuterPanel.offsetTop;
  voRect.iWidth= this.oOuterPanel.offsetWidth;
  voRect.iHeight= this.oOuterPanel.offsetHeight;
  return voRect;
}
//----------------------------------------------------------------------
//public; 获取 Rect;
//返回值: 成功: this.oRect; 否则: null;
function Base_getRect(){
  return this.oRect;
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//返回值: void;
function Base_setRect(oRect){
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
//private; 根据 OuterPanel 设置 Rect;
//return: void;
function Base_setRectWithOuterPanel(){
  if (this.oOuterPanel== null) return;
  this.tIsResizing= true;
  
  this.oOriginalRect.iLeft= this.oOuterPanel.currentStyle.left;
  this.oOriginalRect.iTop= this.oOuterPanel.currentStyle.top;
  this.oOriginalRect.iWidth= this.oOuterPanel.currentStyle.width;
  this.oOriginalRect.iHeight= this.oOuterPanel.currentStyle.height;
  
  if (this.oOuterPanel.currentStyle.overflow== "hidden"
      || this.oOuterPanel.currentStyle.overflow== "auto"){
    this.oRect.iLeft= this.oOriginalRect.iLeft;
    this.oRect.iTop= this.oOriginalRect.iTop;
    this.oRect.iWidth= this.oOriginalRect.iWidth;
    this.oRect.iHeight= this.oOriginalRect.iHeight;
    
    if (this.getPosition()== "absolute"
        && (this.oRect.iLeft== null 
            || this.oRect.iLeft== "" 
            || ((this.oRect.iLeft+ "").indexOf("%")< 1 && isNaN(this.oRect.iLeft)))){
      this.oRect.iLeft= this.oOuterPanel.offsetLeft;
    }
    if (this.getPosition()== "absolute"
        && (this.oRect.iTop== null 
            || this.oRect.iTop== "" 
            || ((this.oRect.iTop+ "").indexOf("%")< 1 && isNaN(this.oRect.iTop)))){
      this.oRect.iTop= this.oOuterPanel.offsetTop;
    }
    if (this.getPosition()== "absolute"
        && (this.oRect.iWidth== null 
            || this.oRect.iWidth== "" 
            || ((this.oRect.iWidth+ "").indexOf("%")< 1 && isNaN(this.oRect.iWidth)))){
      this.oRect.iWidth= this.oOuterPanel.offsetWidth;
    }
    if (this.getPosition()== "absolute"
        && (this.oRect.iHeight== null 
            || this.oRect.iHeight== "" 
            || ((this.oRect.iHeight+ "").indexOf("%")< 1 && isNaN(this.oRect.iHeight)))){
      this.oRect.iHeight= this.oOuterPanel.offsetHeight;
    }
  }else{
    this.oRect.iLeft= this.oOuterPanel.offsetLeft;
    this.oRect.iTop= this.oOuterPanel.offsetTop;
    this.oRect.iWidth= this.oOuterPanel.offsetWidth;
    this.oRect.iHeight= this.oOuterPanel.offsetHeight;
  }
  this.tIsResizing= false;
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//返回值: 成功:true; 否则:false;
function Base_resize(){
  return true;
}
//----------------------------------------------------------------------
//public; 设置焦点.
//返回值: void;
function Base_setFocus(){
  return;
}
//----------------------------------------------------------------------
//public; 失去焦点.
//返回值: void;
function Base_lostFocus(){
  return;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; OuterPanel.onclick 处理;
//返回值: void;
function Base_oOuterPanel_onclick(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnClick)){
    voBase.eventAnswer_OnClick(voBase, event);
  }
  voBase.fireEvent(voBase.OnClick, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.ondblclick 处理;
//返回值: void;
function Base_oOuterPanel_ondblclick(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnDblClick)){
    voBase.eventAnswer_OnDblClick(voBase, event);
  }
  voBase.fireEvent(voBase.OnDblClick, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmousedown 处理;
//返回值: void;
function Base_oOuterPanel_onmousedown(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  voBase.setFocusMark(true);   //焦点处理用;

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnMouseDown)){
    voBase.eventAnswer_OnMouseDown(voBase, event);
  }
  voBase.fireEvent(voBase.OnMouseDown, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmouseup 处理;
//返回值: void;
function Base_oOuterPanel_onmouseup(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  voBase.setFocusMark(false);   //焦点处理用;

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnMouseUp)){
    voBase.eventAnswer_OnMouseUp(voBase, event);
  }
  voBase.fireEvent(voBase.OnMouseUp, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmouseenter 处理;
//返回值: void;
function Base_oOuterPanel_onmouseenter(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnMouseEnter)){
    voBase.eventAnswer_OnMouseEnter(voBase, event);
  }
  voBase.fireEvent(voBase.OnMouseEnter, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmousemove 处理;
//返回值: void;
function Base_oOuterPanel_onmousemove(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnMouseMove)){
    voBase.eventAnswer_OnMouseMove(voBase, event);
  }
  voBase.fireEvent(voBase.OnMouseMove, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmouseover 处理;
//返回值: void;
function Base_oOuterPanel_onmouseover(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnMouseOver)){
    voBase.eventAnswer_OnMouseOver(voBase, event);
  }
  voBase.fireEvent(voBase.OnMouseOver, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmouseout 处理;
//返回值: void;
function Base_oOuterPanel_onmouseout(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnMouseOut)){
    voBase.eventAnswer_OnMouseOut(voBase, event);
  }
  voBase.fireEvent(voBase.OnMouseOut, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onkeypress 处理;
//返回值: void;
function Base_oOuterPanel_onkeypress(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnKeyPress)){
    voBase.eventAnswer_OnKeyPress(voBase, event);
  }
  voBase.fireEvent(voBase.OnKeyPress, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onkeydown 处理;
//返回值: void;
function Base_oOuterPanel_onkeydown(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnKeyDown)){
    voBase.eventAnswer_OnKeyDown(voBase, event);
  }
  voBase.fireEvent(voBase.OnKeyDown, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onkeyup 处理;
//返回值: void;
function Base_oOuterPanel_onkeyup(){
	alert("keyup");
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voBase.eventAnswer_OnKeyUp)){
    voBase.eventAnswer_OnKeyUp(voBase, event);
  }
  voBase.fireEvent(voBase.OnKeyUp, new Array(voBase, event));
  return;
}
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值: void;
function Base_oOuterPanel_onfocus(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  voBase.fireOnFocus();
  return;
}
//----------------------------------------------------------------------
//private; 失去焦点.
//返回值: void;
function Base_oOuterPanel_onblur(){
  var voBase= this.oOwner;
  if (voBase== null) voBase= this.oOuterPanel.oOwner;
  if (voBase== null) return;
  voBase.fireOnBlur();
  return;
}
//----------------------------------------------------------------------
//private;
//return: void;
function Base_bindResizeToOuterPanel(tIsBind){
  if (this.oOuterPanel== null) return;
  this.oOuterPanel.onresize= null;
  if (tIsBind){
    this.oOuterPanel.onresize= Base_oOuterPanel_OnResize;
  }
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//8.焦点事件处理方法组= function();
//  供继承类使用;
//----------------------------------------------------------------------
//friendly; 获得焦点事件发出方法;
//焦点事件已发出,则不发去 OnFocus 事件;
//return: void;
function Base_fireOnFocus(){
  this.setFocusMark(false);
  if (this.isFocus()) return;
  this.iFocusMark|= this.FOCUS_EXIST;

  if (PF.isExistMethodK(this.eventAnswer_OnFocus)){
  	this.eventAnswer_OnFocus(this, event);
  }
  this.fireEvent(this.OnFocus, new Array(this, event));
}
//----------------------------------------------------------------------
//friendly; 失去焦点事件发出方法;
//焦点仍然存在,则不发去 OnBlur 事件;
//return: void;
function Base_fireOnBlur(){
  if (this.isKeepFocus()) return;
  this.iFocusMark-= this.iFocusMark & this.FOCUS_EXIST;

  if (PF.isExistMethodK(this.eventAnswer_OnBlur)){
  	this.eventAnswer_OnBlur(this, event);
  }
  this.fireEvent(this.OnBlur, new Array(this, event));
}
//----------------------------------------------------------------------
//friendly; 内部对象间的焦点转移;
//return: void;
function Base_changeFocus(oHtmlElement){
  if (oHtmlElement== null) return;
  this.setFocusMark(true);
  if (oHtmlElement.onfocus== null){
    oHtmlElement.oOwner= this;
    oHtmlElement.onfocus= function(){oHtmlElement.oOwner.setFocusMark(false);};
  }
  oHtmlElement.focus();
}
//----------------------------------------------------------------------
//private; 设置焦点标记;
//return: void;
function Base_setFocusMark(tIsExist){
  tIsExist= PF.parseBool(tIsExist);
  if (tIsExist) this.iFocusMark|= this.FOCUS_KEEP;
  else this.iFocusMark-= this.iFocusMark & this.FOCUS_KEEP;
}
//----------------------------------------------------------------------
//private; 判断焦点是否还将存在于本控件中;
//用于 onblur 时;
//return: 将继续存在: true; 否则: false;
function Base_isKeepFocus(){
  if ((this.iFocusMark & this.FOCUS_KEEP)!= 0) return true;
  return false;
}
//----------------------------------------------------------------------
//public; 判断焦点是否在本控件中;
//return: 将继续存在: true; 否则: false;
function Base_isFocus(){
  if ((this.iFocusMark & this.FOCUS_EXIST)!= 0) return true;
  return false;
}
//----------------------------------------------------------------------
//private;
function Base_oOuterPanel_OnResize(){
  var voBase= this.oOwner;
  if (voBase.tIsResizing) return;
  if (!PageX.tHasInit) return;
  if (voBase.tIsResizeEnd) return;
  if (voBase.iResizingTime== 0) voBase.iResizingTime= new Date().getTime();
  if ((new Date().getTime())- voBase.iResizingTime>= 500){
    voBase.tIsResizeEnd= true;
    voBase.iResizingTime= 0;
    setTimeout(voBase.oOuterPanel.id+ ".oOwner.tIsResizeEnd= false;", 100);
  }
  voBase.resize();
}
//----------------------------------------------------------------------

//add by liubo 
function Base_release() {
	var outerpanel = this.oOuterPanel;
	if (outerpanel != null) {
		outerpanel.oOwner = null;
		outerpanel.onclick = null;
		outerpanel.ondblclick = null;
		outerpanel.onkeydown = null;
		outerpanel.onkeyup = null;
		outerpanel.onkeypress = null;
		outerpanel.onmousedown = null;
		outerpanel.onmouseenter = null;
		outerpanel.onmousemove = null;
		outerpanel.onmouseout = null;
		outerpanel.onmouseover = null;
	  outerpanel.onmouseup = null;
	  outerpanel.onfocus = null;
	  outerpanel.onblur = null;
	} 
	for (var prop in this) {
		if (typeof(this[prop]) != "function" &&
				this[prop] != null &&
				this[prop].CLASSNAME != "gp.common.Map") {
				this[prop] = null;
		}
	}
}


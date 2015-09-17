/* $Id: Toolbar4.js,v 1.2 2008/04/28 07:14:44 liuxiaoyong Exp $ */
/*
Title: gp.page.Toolbar4
Description: 工具条;
Company: 用友政务
Date: 2004.10.21
Author: leidh
*/
// import PageX.sRootPath; // defined in ..\..\script\Community.js

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Toolbar4(){
  Base.call(this);

  this.CLASSNAME= "gp.page.Toolbar4";

  this.CALL_TYPE_COMMAND= "command";
  this.CALL_TYPE_CHECK= "check";
  this.CALL_TYPE_SEPARATOR= "separator";
  this.CALL_TYPE_GROUP= "group";

  this.sName= this.CLASSNAME;
  this.oOuterObj= null;

  this.oContainer= null;     //private;
  this.oOuterPanel= null;    //private;
  this.oCallTR= null;        //private; 按钮行.

  this.oTipBar= null;        //private;
  this.oCallMap= new Map();  //private;

  this.oRect= new Rect(0, 0, 100, 20);    //public;
  //this.iHeight= 24;

  this.tHasInit= false;

  this.OnInit= "OnInit";                //参数: oSender;
  this.OnResize= "OnResize";            //参数: oSender;
  this.OnCallClick= "OnCallClick";      //参数: oSender, oCall, oEvent;

  //public;
  this.getCall= Toolbar4_getCall;
  this.getCallCount= Toolbar4_getCallCount;
  this.getCallIds= Toolbar4_getCallIds;
  this.getCalls= Toolbar4_getCalls;
  this.init= Toolbar4_init;
  this.make= Toolbar4_make;
  this.resize= Toolbar4_resize;
  this.setCallVisible= Toolbar4_setCallVisible;
  this.setClass= Toolbar4_setClass;
  this.setRect= Toolbar4_setRect;
  this.setStyle= Toolbar4_setStyle;
  this.setStyleItem= Toolbar4_setStyleItem;
  //以上已完成文档;

  this.isCallVisible= Toolbar4_isCallVisible;
  this.setCallDisabled= Toolbar4_setCallDisabled;
  this.isCallDisabled= Toolbar4_isCallDisabled;

  //private;
  this.adjustStyle= Toolbar4_adjustStyle;
  this.addCallEvents= Toolbar4_addCallEvents;
  
  this.release = Toolbar4_release;
}
//----------------------------------------------------------------------
//5.方法区 =function();
//----------------------------------------------------------------------
//public; 生成构件的HTML对象.
//返回值:成功: true, 失败: false;
function Toolbar4_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;
  this.oOuterPanel.oOwner= this;

  this.oCallTR= this.oOuterPanel.all("CallsTR");
  for (var i= 0, len= this.oCallTR.childNodes.length, call= null; i< len; i++){
    call= this.oCallTR.childNodes[i].firstChild;
    if (call== null) continue;
    call.oOwner= this;
    this.addCallEvents(call);
    this.oCallMap.put(call.callId, call);
  }

  return true;
}
//----------------------------------------------------------------------
//private; 加入按钮事件;
//oCall 即 <table>;
//返回值: void;
function Toolbar4_addCallEvents(oCall){
  //事件.
  oCall.onmouseover= function(){
    var voTB= this.oOwner;
    var voTR= oCall.rows[0];
    voTR.cells[0].firstChild.src=PageX.sRootPath + "/gp/image/call/left_select.gif";
    voTR.cells[1].background=PageX.sRootPath + "/gp/image/call/mid_select.gif";
    voTR.cells[2].firstChild.src=PageX.sRootPath + "/gp/image/call/right_select.gif";

    var vsAccessKey= "";
    if (PF.isEmpty(this.accessKey)== false) vsAccessKey= "ALT+ "+ this.accessKey;
    voTB.oTipBar.setText(this.tip+ " "+ vsAccessKey);
    voTB.oTipBar.setVisible(true);
  };
  oCall.onmouseout= function(){
    var voTB= this.oOwner;
    var voTR= oCall.rows[0];
    voTR.cells[0].firstChild.src=PageX.sRootPath + "/gp/image/call/left_behind.gif";
    voTR.cells[1].background=PageX.sRootPath + "/gp/image/call/mid_behind.gif";
    voTR.cells[2].firstChild.src=PageX.sRootPath + "/gp/image/call/right_behind.gif";

    voTB.oTipBar.setVisible(false);
  };
  oCall.onmousedown= function(){
    this.oOwner.oTipBar.setVisible(false);
  }
  oCall.onmouseup= function(){
    var voTB= this.oOwner;
    if(voTB.isCallDisabled(this.id)) return;
    PageX.sOperationId= this.id;
    //产生一个点击事件; 事件参数: oSender, oCall;
    voTB.fireEvent(voTB.OnCallClick, new Array(voTB, this, event));
  };
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function Toolbar4_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;
  if (typeof(this.oOuterPanel)!= "undefined" && this.oOuterPanel!= null){
    this.oOuterPanel.oOwner= this;
    if (this.oOuterPanel.onclick== null) this.oOuterPanel.onclick= Base_oOuterPanel_onclick;
    if (this.oOuterPanel.ondblclick== null) this.oOuterPanel.ondblclick= Base_oOuterPanel_ondblclick;
  	this.bindResizeToOuterPanel(true);
  }
  this.oTipBar= new Tipbar();
  this.oTipBar.make();
  this.oTipBar.init();

  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值: 成功: true, 失败: false;
function Toolbar4_resize(){
  if (this.tHasInit== false) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= true;

  if (this.oRect.iWidth< 20) this.oRect.iWidth= 20;
  if (this.oRect.iHeight< 18) this.oRect.iHeight= 18;

  this.oOuterPanel.style.left= this.oRect.iLeft;
  this.oOuterPanel.style.top= this.oRect.iTop;

  this.oRect.iWidth= this.oOuterPanel.offsetWidth;
  this.oRect.iHeight= this.oOuterPanel.offsetHeight;

  //向外发送事件; OnResize
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnResize)){
    this.eventAnswer_OnResize(this);
  }
  //向外发送事件; OnResize
  this.fireEvent(this.OnResize, new Array(this));
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//public; 查找按钮;
//返回值: 成功: 按钮对象 <TD>, 失败: null;
function Toolbar4_getCall(id){
  //检查.
  if (this.tHasInit== false) return null;
  //if (this.oCallTR.firstChild== null) return null;
  var voCall= this.oCallMap.get(id);  //查找按钮.
  return voCall;
}
//----------------------------------------------------------------------
//public; 设置按钮的可见性;
//返回值: void;
function Toolbar4_setCallVisible(sId, tIsVisible){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sId)) return;
  //if (PF.isValidArray(asId)== false) return;
  tIsVisible= PF.parseBool(tIsVisible);
  var voCall= this.getCall(sId);
  if (voCall== null) return;
  voCall.style.display= tIsVisible? "": "none";
  voCall.parentNode.style.display= tIsVisible? "": "none";
  return;
}
//----------------------------------------------------------------------
//public; 设置按钮的可见性;
//返回值: true/false;
function Toolbar4_isCallVisible(sId){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  //return voCall.parentNode.style.display== "none"?false:true;
  return voCall.style.display== "none"?false:true;
}
//----------------------------------------------------------------------
//public; 设置按钮的可用性;
//返回值: void;
function Toolbar4_setCallDisabled(sId, tIsDisabled){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  voCall.disabled= PF.parseBool(tIsDisabled);
  voCall.parentNode.disabled= PF.parseBool(tIsDisabled);
  var voTR= voCall.rows[0];
  voTR.cells[0].firstChild.src=PageX.sRootPath + "/gp/image/call/left_behind.gif";
  voTR.cells[1].background=PageX.sRootPath + "/gp/image/call/mid_behind.gif";
  voTR.cells[2].firstChild.src=PageX.sRootPath + "/gp/image/call/right_behind.gif";
  return;
}
//----------------------------------------------------------------------
//public; 设置按钮的可用性;
//返回值: true/ false;
function Toolbar4_isCallDisabled(sId){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  return voCall.disabled;
}
//----------------------------------------------------------------------
//public; 获取所有按钮的 key 值;
//返回值: 成功: 所有按钮的 key 值所组成的数组; 否则: null;
function Toolbar4_getCallIds(){
  if (this.tHasInit== false) return null;
  return this.oCallMap.getAllKey();
}
//----------------------------------------------------------------------
//public; 获取所有的按钮对象;
//返回值: 成功: 所有的按钮对象所组成的数组; 否则: null;
function Toolbar4_getCalls(){
  if (this.tHasInit== false) return null;
  return this.oCallMap.getAllItem();
}
//----------------------------------------------------------------------
//public; 获取所有的按钮对象的个数;
//返回值: 成功: 按钮的个数; 否则: -1;
function Toolbar4_getCallCount(){
  if (this.tHasInit== false) return -1;
  return this.oCallMap.size();
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//返回值: void;
function Toolbar4_setRect(oRect){
  this.oRect.iLeft= oRect.iLeft;
  this.oRect.iTop= oRect.iTop;
  this.oRect.iWidth= oRect.iWidth;
  this.oRect.iHeight= oRect.iHeight;

  this.resize();
  return;
}
//----------------------------------------------------------------------
//private; 调整风格,以保持整个控件的的风格正确性;
//返回值: void;
function Toolbar4_adjustStyle(){
  //alert(this.CLASSNAME+ ".adjustStyle();");
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "adjustStyle");
  this.oOuterPanel.style.overflow= "visible";
  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Toolbar4_setStyle(sStyle){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格中的指定项目;
//param: sName 的写法必须为 js 的写法,如: border-color,必须写成 borderColor;
//返回值: void;
function Toolbar4_setStyleItem(sName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyleItem");
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Toolbar4_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------

function Toolbar4_release() {
	var callTR = this.oCallTR;
	if (callTR != null) {
	  for (var i = 0, len= callTR.childNodes.length, call= null; i < len; i++){
	    call= callTR.childNodes[i].firstChild;
	    if (call== null) continue;
	    call.oOwner= null;
	    this.oCallMap.put(call.callId, null);
	    call.onmouseover= null;
	    call.onmouseout= null;
	    call.onmouseup= null;
	  }
	  callTR.oOwner = null;
	}
  var voMoreCallsImg= this.oOuterPanel.all("MoreCallsImg");
  if (voMoreCallsImg != null) {
	  voMoreCallsImg.oOwner= null;
	  voMoreCallsImg.onclick= null;
	}
	this.oTipBar.release();
	Base_release.call(this);
}



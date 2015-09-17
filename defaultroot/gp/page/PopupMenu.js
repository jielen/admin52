/* $Id: PopupMenu.js,v 1.2 2008/06/02 13:41:20 huangcb Exp $ */
/*
Title: gp.page.PopupMenu
Description: 弹出式菜单;
Company: 用友政务
Date: 2006.5.19
Author: leidh
*/

/**
html 的样例;
 */
 
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function PopupMenu(sId){
  Toolbar.call(this);

  this.CLASSNAME= "gp.page.PopupMenu";

  this.sName= this.CLASSNAME;
  this.oOuterObj= null;

  this.oContainer= null;     //private;
  this.oOuterPanel= null;    //private;
  this.oCallTable= null;     //private; 按钮行.

  this.oCallMap= new Map();  //private;
  
  this.tIsAllowHide= true;   //private;

  //public;
  this.make= PopupMenu_make;
  this.resize= PopupMenu_resize;
  this.setCallVisible= PopupMenu_setCallVisible;
  this.setRect= PopupMenu_setRect;
  this.addCall= PopupMenu_addCall;
  this.removeCall= PopupMenu_removeCall;
  this.setFocus= PopupMenu_setFocus;

  //private;
  this.isAllowHide= PopupMenu_isAllowHide;
  
  this.release = PopupMenu_release;
  this.make(sId);
  this.init();
}
//----------------------------------------------------------------------
//5.方法区 =function();
//----------------------------------------------------------------------
//public; 生成构件的HTML对象.
//返回值:成功: true, 失败: false;
function PopupMenu_make(sId){
  //alert("PopupMenu_make();");
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;
  this.oCallTable= this.oOuterPanel.all("CallsTable");
  
  this.oOuterPanel.oOwner= this;
  this.oCallTable.oOwner= this;
  var voFocusBtn= this.oOuterPanel.all("FocusButton");
  voFocusBtn.oOwner= this;
  
  for (var i= 0, len= this.oCallTable.rows.length, call= null; i< len; i++){
    call= this.oCallTable.rows[i].firstChild.firstChild;
    if (call== null) continue;
    call.oOwner= this;
    call.id= call.callId;
    this.oCallMap.put(call.callId, call);
  }

  this.setRectWithOuterPanel();
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//return: 成功: true, 失败: false;
function PopupMenu_resize(){
  return true;
}
//----------------------------------------------------------------------
//public; 设置按钮的可见性;
//返回值: void;
function PopupMenu_setCallVisible(sId, tIsVisible){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sId)) return;
  tIsVisible= PF.parseBool(tIsVisible);
  var voCall= this.getCall(sId);
  if (voCall== null) return;
  voCall.style.display= tIsVisible? "": "none";
  voCall.parentNode.parentNode.style.display= tIsVisible? "": "none";
  return;
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//返回值: void;
function PopupMenu_setRect(oRect){
}
//----------------------------------------------------------------------
//public;
//return: void;
function PopupMenu_addCall(oCall){
  var voTR= document.createElement("<tr>");
  var voTD= document.createElement("<td>");
  voTR.style.fontSize= "1px";
  voTR.appendChild(voTD);
  this.oCallTable.appendChild(voTR);
  voTD.appendChild(oCall);
}
//----------------------------------------------------------------------
//public;
//return: void;
function PopupMenu_removeCall(oCall){
  var voTR= oCall.parentNode.parentNode;
  this.oCallTable.removeChild(voTR);
}
//----------------------------------------------------------------------
//public;
//return: void;
function PopupMenu_setFocus(){
  var voFocusBtn= this.oOuterPanel.all("FocusButton");
  try{voFocusBtn.focus();}catch(e){};
}
//----------------------------------------------------------------------
//private;
//return: void;
function PopupMenu_isAllowHide(){
  return this.tIsAllowHide;
}
//----------------------------------------------------------------------

function hidePopupMenu(){
	var voMenu = PageX.getCtrlObj(PageX.getCtrlObj("toolbar").oOuterPanel.popupmenuid);
  if (voMenu.isAllowHide()){
    voMenu.setVisible(false);
  }
}

//----------------------------------------------------------------------
//6.事件响应区 =function();
//----------------------------------------------------------------------
//private;
//return: void;
function PopupMenu_FocusButton_onblur(){
  window.setTimeout('hidePopupMenu()',300);
}
//----------------------------------------------------------------------
//private;
//return: void;
function PopupMenu_eventAnswer_OnMouseOver(oSender, oEvent){
  this.tIsAllowHide= false;
  var voFocusBtn= this.oOuterPanel.all("FocusButton");
  try{voFocusBtn.focus();} catch(e){};
}
//----------------------------------------------------------------------
//private;
//return: void;
function PopupMenu_eventAnswer_OnMouseOut(oSender, oEvent){
  this.tIsAllowHide= true;
}
//----------------------------------------------------------------------
//private;
//return: void;
function PopupMenu_eventAnswer_OnMouseUp(oSender, oEvent){
  this.tIsAllowHide= true;
  this.setVisible(false);
}
//----------------------------------------------------------------------
//private; 加入按钮事件;
function PopupMenu_callOnMouseUp(){
  var voMenu= this.oOwner;
  voMenu.tIsAllowHide= true;
  voMenu.setVisible(false);
  Toolbar_callOnMouseUp.call(this);
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function PopupMenu_release() {
	if (this.oOuterPanel != null) {
	  var voFocusBtn= this.oOuterPanel.all("FocusButton");
	  voFocusBtn.oOwner = null;
	  voFocusBtn.onblur = null;
	}
	var callTable = this.oCallTable;
	if (callTable != null) {
		callTable.oOwner = null;
	  for (var i = 0, len = callTable.rows.length, call = null; i < len; i++){
	    call = callTable.rows[i].firstChild.firstChild;
	    if (call == null) continue;
	    call.oOwner= null;
	    this.oCallMap.put(call.callId, null);
	    call.onmouseover = null;
	    call.onmouseout = null;
	    call.onmouseup = null;
	  }
  }
	Toolbar_release.call(this);
}



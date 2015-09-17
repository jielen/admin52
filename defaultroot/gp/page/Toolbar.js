/* $Id: Toolbar.js,v 1.4 2008/06/02 13:41:20 huangcb Exp $ */
/*
Title: gp.page.Toolbar
Description: 工具条;
Company: 用友政务
Date: 2006.5.16
Author: leidh
*/

/**
html 的样例;
<div id='toolbar' componame="" isfromdb=true tabindex=0 popupmenuid="PopupMenuId_11483658796491"  class='clsToolbarContainer4' hidefocus='true'  style='display:; ' >
<table border="0" width="100%" cellspacing="0" cellpadding="0" class="clsToolbarTable4">
<tr>
<td width="10px"><img border="0" src="/style/img/gp5/toolbar/toolbar_left.jpg"></img></td>

<td width="100%" background="/style/img/gp5/toolbar/toolbar_middle.jpg" valign="center">
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr id="CallsTR">

<td>
<div callId="fnew" type="command" title="新增 ALT+N" accessKey="N" style="font-size:9pt;width:100%;padding:1px;" onkeydown='this.fireEvent("onmousedown");' onkeyup='this.fireEvent("onmouseup");' >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr height="18px" valign="bottom">
<td id="LeftSpaceTD" style="font-size:2px;">&nbsp;</td>
<td id="ImageTD" width="16px"><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/add_g.jpg"></img></td>
<td style="font-size:3px;">&nbsp;</td>
<td id="CaptionTD" nowrap>新增</td>
<td id="RightSpaceTD" style="font-size:2px;">&nbsp;</td>
</tr>
</table>
</div>
</td>

<td>
<div callId="fhelp" type="command" title="ALT+H" accessKey="H" style="font-size:9pt;width:100%;padding:1px;" onkeydown='this.fireEvent("onmousedown");' onkeyup='this.fireEvent("onmouseup");' >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr height="18px" valign="bottom">
<td id="LeftSpaceTD" style="font-size:2px;">&nbsp;</td>
<td id="ImageTD" width="16px"><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/help_g.jpg"></img></td>
<td style="font-size:3px;">&nbsp;</td>
<td id="CaptionTD" nowrap>帮助</td>
<td id="RightSpaceTD" style="font-size:2px;">&nbsp;</td>
</tr>
</table>
</div>
</td>

<td id="BlankTDOfToolbar5" width="100%">
</td>

</tr>
</table>
</td>

<td width="10px"><img id="MoreCallsImg" border="0" src="/style/img/gp5/toolbar/toolbar_right.jpg"></img></td>

</tr>
</table>
</div>
 */
 
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Toolbar(sId){
  Base.call(this);

  this.CLASSNAME= "gp.page.Toolbar";

  this.CALL_TYPE_COMMAND= "command";
  this.CALL_TYPE_CHECK= "check";
  this.CALL_TYPE_SEPARATOR= "separator";
  this.CALL_TYPE_GROUP= "group";

  this.sName= this.CLASSNAME;
  this.oOuterObj= null;

  this.oContainer= null;     //private;
  this.oOuterPanel= null;    //private;
  this.oCallTR= null;        //private; 按钮行.

  this.oCallMap= new Map();  //private;

  this.oRect= new Rect(0, 0, 100, 20);    //public;

  this.tHasInit= false;

  this.OnInit= "OnInit";                //参数: oSender;
  this.OnResize= "OnResize";            //参数: oSender;
  this.OnCallClick= "OnCallClick";      //参数: oSender, oCall, oEvent;

  //public;
  this.getCall= Toolbar_getCall;
  this.getCallCount= Toolbar_getCallCount;
  this.getCallIds= Toolbar_getCallIds;
  this.getCalls= Toolbar_getCalls;
  this.init= Toolbar_init;
  this.make= Toolbar_make;
  this.resize= Toolbar_resize;
  this.setCallVisible= Toolbar_setCallVisible;
  this.setClass= Toolbar_setClass;
  this.setRect= Toolbar_setRect;
  this.setStyle= Toolbar_setStyle;
  this.setStyleItem= Toolbar_setStyleItem;
  //以上已完成文档;

  this.isCallVisible= Toolbar_isCallVisible;
  this.setCallDisabled= Toolbar_setCallDisabled;
  this.isCallDisabled= Toolbar_isCallDisabled;
  this.addCall= Toolbar_addCall;
  this.removeCall= Toolbar_removeCall;
  this.fireCall= Toolbar_fireCall;

  //private;
  this.adjustStyle= Toolbar_adjustStyle;
  this.lightCall= Toolbar_lightCall;
  this.darkCall= Toolbar_darkCall;
  this.doOverflowCalls= Toolbar_doOverflowCalls;
  this.moveMenu= Toolbar_moveMenu;
  
  this.release = Toolbar_release;
  
  this.make(sId);
  this.init();
}
//----------------------------------------------------------------------
//5.方法区 =function();
//----------------------------------------------------------------------
//public; 生成构件的HTML对象.
//返回值:成功: true, 失败: false;
function Toolbar_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;
  this.oCallTR= this.oOuterPanel.all("CallsTR");
    
  this.oOuterPanel.oOwner= this;
  this.oCallTR.oOwner= this;
  
  var voMoreCallsImg= this.oOuterPanel.all("MoreCallsImg");
  voMoreCallsImg.oOwner= this;

  var voMenu= PageX.getCtrlObj(this.oOuterPanel.popupmenuid);
  voMenu.oOuterObj= this;
  
  for (var i= 0, len= this.oCallTR.childNodes.length, call= null; i< len; i++){
    call= this.oCallTR.childNodes[i].firstChild;
    if (call== null) continue;
    call.oOwner= this;
    call.id= call.callId;
    this.oCallMap.put(call.callId, call);
  }

  return true;
}
//----------------------------------------------------------------------
//private;
//return: void;
function Toolbar_lightCall(oCall){
  oCall.style.border= "solid 1px red";
  oCall.style.padding= 0;
}
//----------------------------------------------------------------------
//private;
//return: void;
function Toolbar_darkCall(oCall){
  oCall.style.border= "solid 0px red";
  oCall.style.padding= 1;
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function Toolbar_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;

  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值: 成功: true, 失败: false;
function Toolbar_resize(){
  if (this.tHasInit== false) return false;

  this.doOverflowCalls();
  return true;
}
//----------------------------------------------------------------------
//public; 查找按钮;
//返回值: 成功: 按钮对象 <TD>, 失败: null;
function Toolbar_getCall(id){
  //检查.
  if (this.tHasInit== false) return null;
  var voCall= this.oCallMap.get(id);  //查找按钮.
  return voCall;
}
//----------------------------------------------------------------------
//public; 设置按钮的可见性;
//返回值: void;
function Toolbar_setCallVisible(sId, tIsVisible){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sId)) return;
  tIsVisible= PF.parseBool(tIsVisible);
  var voCall= this.getCall(sId);
  if (voCall== null) return;
  voCall.style.display= tIsVisible? "": "none";
  voCall.parentNode.style.display= tIsVisible? "": "none";

  if (this.CLASSNAME== "gp.page.Toolbar"){
    var voMenu= PageX.getCtrlObj(this.oOuterPanel.popupmenuid);
    voMenu.setCallVisible(sId, tIsVisible);
  }
}
//----------------------------------------------------------------------
//public; 设置按钮的可见性;
//返回值: true/false;
function Toolbar_isCallVisible(sId){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  return voCall.style.display== "none"?false:true;
}
//----------------------------------------------------------------------
//public; 设置按钮的可用性;
//返回值: void;
function Toolbar_setCallDisabled(sId, tIsDisabled){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  voCall.disabled= PF.parseBool(tIsDisabled);
  voCall.parentNode.disabled= PF.parseBool(tIsDisabled);
  var voImgTD= voCall.all("ImageTD");
  voImgTD.firstChild.disabled= tIsDisabled;
  if (voCall.disabled) this.darkCall(voCall);
  
  if (this.CLASSNAME== "gp.page.Toolbar"){
    var voMenu= PageX.getCtrlObj(this.oOuterPanel.popupmenuid);
    voMenu.setCallDisabled(sId, tIsDisabled);
  }
}
//----------------------------------------------------------------------
//public; 设置按钮的可用性;
//返回值: true/ false;
function Toolbar_isCallDisabled(sId){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  return voCall.disabled;
}
//----------------------------------------------------------------------
//public; 获取所有按钮的 key 值;
//返回值: 成功: 所有按钮的 key 值所组成的数组; 否则: null;
function Toolbar_getCallIds(){
  if (this.tHasInit== false) return null;
  return this.oCallMap.getAllKey();
}
//----------------------------------------------------------------------
//public; 获取所有的按钮对象;
//返回值: 成功: 所有的按钮对象所组成的数组; 否则: null;
function Toolbar_getCalls(){
  if (this.tHasInit== false) return null;
  return this.oCallMap.getAllItem();
}
//----------------------------------------------------------------------
//public; 获取所有的按钮对象的个数;
//返回值: 成功: 按钮的个数; 否则: -1;
function Toolbar_getCallCount(){
  if (this.tHasInit== false) return -1;
  return this.oCallMap.size();
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//返回值: void;
function Toolbar_setRect(oRect){
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
function Toolbar_adjustStyle(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "adjustStyle");
  this.oOuterPanel.style.overflow= "visible";
  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Toolbar_setStyle(sStyle){
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
function Toolbar_setStyleItem(sName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyleItem");
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Toolbar_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Toolbar_addCall(oCall){
  var voBlankTD= this.oOuterPanel.all("BlankTDOfToolbar5");
  var voTD= document.createElement("<td>");
  this.oCallTR.insertBefore(voTD, voBlankTD);
  voTD.appendChild(oCall);
}
//----------------------------------------------------------------------
//public;
//return: void;
function Toolbar_removeCall(oCall){
  var voTD= oCall.parentNode;
  this.oCallTR.removeChild(voTD);
}
//----------------------------------------------------------------------
//private;
//return: void;
function Toolbar_doOverflowCalls(){
  var voMenu= PageX.getCtrlObj(this.oOuterPanel.popupmenuid);
  if (voMenu.isVisible()){
    var voMoreCallsImg= this.oOuterPanel.all("MoreCallsImg");
    this.moveMenu(voMenu, voMoreCallsImg);
  }

  var voCallsAreaCell= this.oOuterPanel.all("CallsAreaTD");
  var vaoInvisibleCall= new Array();
  var voRect= PF.getAbsRect(voCallsAreaCell, document.body);
  for (var i= 0; i< this.oCallTR.childNodes.length- 1; i++){
    var voCell= this.oCallTR.childNodes[i];
    voCell.style.display= "";
    var voMenuCall= voMenu.getCall(voCell.firstChild.callId);
    voMenuCall.parentNode.parentNode.style.display= "none";
    if (voCell.offsetLeft+ voCell.offsetWidth> voCallsAreaCell.offsetWidth){
      vaoInvisibleCall[vaoInvisibleCall.length]= voCell.firstChild;
    }else if (voCell.offsetLeft+ voCell.offsetWidth> document.body.clientWidth- voRect.iLeft){
      vaoInvisibleCall[vaoInvisibleCall.length]= voCell.firstChild;
    }
  }
  if (vaoInvisibleCall.length== 0) return;
  for (var i= 0; i< vaoInvisibleCall.length; i++){
    vaoInvisibleCall[i].parentNode.style.display= "none";
    var voMenuCall= voMenu.getCall(vaoInvisibleCall[i].callId);
    voMenuCall.parentNode.parentNode.style.display= "";
  }
  
  if (this.oOuterPanel.offsetWidth> document.body.clientWidth){
    this.oOuterPanel.style.width= document.body.clientWidth;
  }else{
    this.oOuterPanel.style.width= "100%";
  }
}
//----------------------------------------------------------------------
//private;
//return: void;
function Toolbar_moveMenu(oMenu, oMoreCallsImg){
  var voMenuPNode= document.body;//oMenu.oOuterPanel.parentNode;
  var voRect= PF.getAbsRect(oMoreCallsImg, voMenuPNode);
  var viLeft= (voMenuPNode.clientWidth- voRect.iLeft> oMenu.oOuterPanel.offsetWidth)? voRect.iLeft: voRect.iLeft- (oMenu.oOuterPanel.offsetWidth- (voMenuPNode.clientWidth- voRect.iLeft));
  oMenu.moveTo(viLeft, voRect.iTop+ voRect.iHeight);
}
//----------------------------------------------------------------------
//public;
function Toolbar_fireCall(sCallId){
  if (event!= null){
    if (event.button!= 0 && event.button!= 1){
      if (event.ctrlKey) return;
      if (event.shiftKey) return;
      if (!event.altKey) return;
    }
  }
  var voCall= this.getCall(sCallId);
  if(this.isCallDisabled(sCallId)) return;
  PageX.sOperationId= sCallId;
  //产生一个点击事件; 事件参数: oSender, oCall;
  this.fireEvent(this.OnCallClick, new Array(this, voCall, event));
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//6.事件响应区 =function();
//----------------------------------------------------------------------
//private; 加入按钮事件;
function Toolbar_callOnMouseOver(ss,sId){
  if(!initialized) return;
  var voTB= PageX.getCtrlObj(sId);
  voTB.lightCall(ss);
}
//----------------------------------------------------------------------
//private; 加入按钮事件;
function Toolbar_callOnMouseOut(ss,sId){
  if(!initialized) return;
  var voTB= PageX.getCtrlObj(sId);
  voTB.darkCall(ss);
}
//----------------------------------------------------------------------
//private; 加入按钮事件;
function Toolbar_callOnMouseUp(ss,sId){
  if(!initialized) return;
  var voTB= PageX.getCtrlObj(sId);
  voTB.fireCall(ss.callId);
}
//----------------------------------------------------------------------
//private;
//return: void;
function Toolbar_MoreCallsImg_onclick(sId){
  if(!initialized) return;
  var voTB= PageX.getCtrlObj(sId);
  var voMenu= PageX.getCtrlObj(voTB.oOuterPanel.popupmenuid);
  if (voMenu.getCallCount()<= 0) return;
  voMenu.setVisible(true);
  voMenu.setFocus();
  voTB.doOverflowCalls();
  voTB.moveMenu(voMenu, voTB.oOuterPanel.all("MoreCallsImg"));
}
//----------------------------------------------------------------------
//private;
//return: void;
function Toolbar_PopupMenu_OnCallClick(oSender, oCall, oEvent){
  var voTB= oSender.oOuterObj;
  voTB.fireCall(oCall.callId);
}
//----------------------------------------------------------------------

function Toolbar_release() {
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
	if (this.oOuterPanel != null) {
	  var voMoreCallsImg= this.oOuterPanel.all("MoreCallsImg");
	  if (voMoreCallsImg != null) {
		  voMoreCallsImg.oOwner= null;
		  voMoreCallsImg.onclick= null;
		}
	}
	Base_release.call(this);
}


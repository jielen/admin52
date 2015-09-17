/* $Id: Toolbar4.js,v 1.2 2008/04/28 07:14:44 liuxiaoyong Exp $ */
/*
Title: gp.page.Toolbar4
Description: ������;
Company: ��������
Date: 2004.10.21
Author: leidh
*/
// import PageX.sRootPath; // defined in ..\..\script\Community.js

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
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
  this.oCallTR= null;        //private; ��ť��.

  this.oTipBar= null;        //private;
  this.oCallMap= new Map();  //private;

  this.oRect= new Rect(0, 0, 100, 20);    //public;
  //this.iHeight= 24;

  this.tHasInit= false;

  this.OnInit= "OnInit";                //����: oSender;
  this.OnResize= "OnResize";            //����: oSender;
  this.OnCallClick= "OnCallClick";      //����: oSender, oCall, oEvent;

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
  //����������ĵ�;

  this.isCallVisible= Toolbar4_isCallVisible;
  this.setCallDisabled= Toolbar4_setCallDisabled;
  this.isCallDisabled= Toolbar4_isCallDisabled;

  //private;
  this.adjustStyle= Toolbar4_adjustStyle;
  this.addCallEvents= Toolbar4_addCallEvents;
  
  this.release = Toolbar4_release;
}
//----------------------------------------------------------------------
//5.������ =function();
//----------------------------------------------------------------------
//public; ���ɹ�����HTML����.
//����ֵ:�ɹ�: true, ʧ��: false;
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
//private; ���밴ť�¼�;
//oCall �� <table>;
//����ֵ: void;
function Toolbar4_addCallEvents(oCall){
  //�¼�.
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
    //����һ������¼�; �¼�����: oSender, oCall;
    voTB.fireEvent(voTB.OnCallClick, new Array(voTB, this, event));
  };
}
//----------------------------------------------------------------------
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
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
//public; ���������Ĵ�С.
//����ֵ: �ɹ�: true, ʧ��: false;
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

  //���ⷢ���¼�; OnResize
  //�¼�������Ӧͨ��,�����̳���ʹ��;
  if (PF.isExistMethodK(this.eventAnswer_OnResize)){
    this.eventAnswer_OnResize(this);
  }
  //���ⷢ���¼�; OnResize
  this.fireEvent(this.OnResize, new Array(this));
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//public; ���Ұ�ť;
//����ֵ: �ɹ�: ��ť���� <TD>, ʧ��: null;
function Toolbar4_getCall(id){
  //���.
  if (this.tHasInit== false) return null;
  //if (this.oCallTR.firstChild== null) return null;
  var voCall= this.oCallMap.get(id);  //���Ұ�ť.
  return voCall;
}
//----------------------------------------------------------------------
//public; ���ð�ť�Ŀɼ���;
//����ֵ: void;
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
//public; ���ð�ť�Ŀɼ���;
//����ֵ: true/false;
function Toolbar4_isCallVisible(sId){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  //return voCall.parentNode.style.display== "none"?false:true;
  return voCall.style.display== "none"?false:true;
}
//----------------------------------------------------------------------
//public; ���ð�ť�Ŀ�����;
//����ֵ: void;
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
//public; ���ð�ť�Ŀ�����;
//����ֵ: true/ false;
function Toolbar4_isCallDisabled(sId){
  if (this.tHasInit== false) return false;
  if (PF.isEmpty(sId)) return false;
  var voCall= this.getCall(sId);
  if (voCall== null) return false;
  return voCall.disabled;
}
//----------------------------------------------------------------------
//public; ��ȡ���а�ť�� key ֵ;
//����ֵ: �ɹ�: ���а�ť�� key ֵ����ɵ�����; ����: null;
function Toolbar4_getCallIds(){
  if (this.tHasInit== false) return null;
  return this.oCallMap.getAllKey();
}
//----------------------------------------------------------------------
//public; ��ȡ���еİ�ť����;
//����ֵ: �ɹ�: ���еİ�ť��������ɵ�����; ����: null;
function Toolbar4_getCalls(){
  if (this.tHasInit== false) return null;
  return this.oCallMap.getAllItem();
}
//----------------------------------------------------------------------
//public; ��ȡ���еİ�ť����ĸ���;
//����ֵ: �ɹ�: ��ť�ĸ���; ����: -1;
function Toolbar4_getCallCount(){
  if (this.tHasInit== false) return -1;
  return this.oCallMap.size();
}
//----------------------------------------------------------------------
//public; ���ö����С.
//����ֵ: void;
function Toolbar4_setRect(oRect){
  this.oRect.iLeft= oRect.iLeft;
  this.oRect.iTop= oRect.iTop;
  this.oRect.iWidth= oRect.iWidth;
  this.oRect.iHeight= oRect.iHeight;

  this.resize();
  return;
}
//----------------------------------------------------------------------
//private; �������,�Ա��������ؼ��ĵķ����ȷ��;
//����ֵ: void;
function Toolbar4_adjustStyle(){
  //alert(this.CLASSNAME+ ".adjustStyle();");
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "adjustStyle");
  this.oOuterPanel.style.overflow= "visible";
  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; ���÷��;
//����ֵ: void;
function Toolbar4_setStyle(sStyle){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; ���÷���е�ָ����Ŀ;
//param: sName ��д������Ϊ js ��д��,��: border-color,����д�� borderColor;
//����ֵ: void;
function Toolbar4_setStyleItem(sName, sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setStyleItem");
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; ���÷��;
//����ֵ: void;
function Toolbar4_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setStyle");
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



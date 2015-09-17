/* $Id: PopupTextBox.js,v 1.1 2008/02/20 11:42:02 liuxiaoyong Exp $ */
/*
Title: gp.page.PopupTextBox
Description:
���ڱ༭����;�������ڵ�����;
Company: ��������
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function PopupTextBox(){
  //1.���� =function();
  TextBox.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.PopupTextBox";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.

  this.oSelectButton= null;    //private; ѡ��ť;

  //4.�¼������� =function();
  //5.���������� =function();
  //public
  this.init= PopupTextBox_init;
  this.resize= PopupTextBox_resize;
  this.setReadOnly= PopupTextBox_setReadOnly;

  //private;
  this.makeK= PopupTextBox_makeK;
  
  this.release = PopupTextBox_release;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ���ɹ�����HTML����.
//����ֵ: true/false;
function PopupTextBox_makeK(){
  if (TextBox_makeK.call(this)== false) return false;
  this.oSelectButton= this.oOuterPanel.all("selectButton");
  this.oSelectButton.oOwner= this;

  this.oSelectButton.onmouseup= PopupTextBox_oSelectButton_onmouseup;
  this.oSelectButton.onfocus= PopupTextBox_oSelectButton_onfocus;
  this.oSelectButton.onblur= PopupTextBox_oSelectButton_onblur;
  return true;
}
//----------------------------------------------------------------------
//public; ��ʼ��.
//����:boolean����,�Ƿ�������������,optional
//����ֵ:�ɹ�: true, ʧ��: false;
function PopupTextBox_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;

  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; ���������Ĵ�С.
//����ֵ:�ɹ�: true, ʧ��: false;
function PopupTextBox_resize(){
  //alert(this.CLASSNAME+ ".resize();");
  if (TextBox_resize.call(this)== false) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= true;

  this.oSelectButton._iOffsetWidth= parseInt(this.oSelectButton.currentStyle.width=="auto"?this.oSelectButton.offsetWidth:this.oSelectButton.currentStyle.width);
  this.oSelectButton._iOffsetHeight= parseInt(this.oSelectButton.currentStyle.height=="auto"?this.oSelectButton.offsetHeight:this.oSelectButton.currentStyle.height);

  this.oInputBox.style.left= 0;
  this.oInputBox.style.top= 0;
  this.oInputBox.style.width= Math.abs(this.oOuterPanel._iClientWidth- this.oSelectButton._iOffsetWidth);
  this.oInputBox.style.height= this.oOuterPanel._iClientHeight;

  this.oSelectButton.style.left= parseInt(this.oInputBox.style.width);
  this.oSelectButton.style.top= this.oOuterPanel._iClientHeight- this.oSelectButton._iOffsetHeight;

  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//public; ����ֻ������.
//����ֵ: void;
function PopupTextBox_setReadOnly(tIsReadOnly){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
	if (this.isForceReadOnly()) tIsReadOnly= true;
  TextBox_setReadOnly.call(this, tIsReadOnly);
  this.oSelectButton.disabled= TextBox_isReadOnly.call(this);
  return;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private;
//return: void;
function PopupTextBox_oSelectButton_onmouseup(){
  if (event.shiftKey || event.altKey || event.ctrlKey) return;
  if (event.button== 0) return;
  var voBox= this.oOwner;
  var vsText= PageX.popupTextBox("�������ı�����", voBox.getValue(), false, true);
  voBox.setValue(vsText);
}
//----------------------------------------------------------------------
//���㴦���¼���;
//----------------------------------------------------------------------
//private; ��ý���.
//����ֵ:�ɹ�: true, ʧ��: false;
function PopupTextBox_oSelectButton_onfocus(){
  var voBox= this.oOwner;
  voBox.oFocusButton.focus();
}
//----------------------------------------------------------------------
//private; ��ý���.
//����ֵ:�ɹ�: true, ʧ��: false;
function PopupTextBox_oSelectButton_onblur(){
  var voBox= this.oOwner;
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function PopupTextBox_release() {
	var selectButton = this.oSelectButton;
	if (selectButton != null) {
		selectButton.oOwner = null;
		selectButton.onmouseup = null;
		selectButton.onfocus = null;
		selectButton.onblur = null;
	}
	TextBox_release.call(this);
}


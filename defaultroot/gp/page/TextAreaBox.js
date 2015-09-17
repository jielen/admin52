/* $Id: TextAreaBox.js,v 1.2 2008/06/02 13:41:19 huangcb Exp $ */
/*
Title: gp.page.TextAreaBox
Description:
�ı����������;���ڶ��е��ı��������;
Company: ��������
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function TextAreaBox(sid){
  //1.���� =function();
  TextBox.call(this,sid);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.TextAreaBox";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.

  //5.���������� =function();
  //public;

  //private;
  this.checkMaxLen= TextAreaBox_checkMaxLen;
  this.eventAnswer_OnChange= TextAreaBox_eventAnswer_OnChange;
}
//----------------------------------------------------------------------
//5.������ =function();
//----------------------------------------------------------------------
//private;��鲢������󳤶�
//return:void;
function TextAreaBox_checkMaxLen(){
  if (this.oInputBox.innerText.length<= this.getMaxLen()) return;
  this.oInputBox.innerText= this.oInputBox.innerText.substr(0, this.getMaxLen());
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private; ���ݸı��¼�.
//����ֵ: void;
function TextAreaBox_eventAnswer_OnChange(oSender, sValue, oEvent){
  this.checkMaxLen();
}
//----------------------------------------------------------------------

/* $Id: Listener.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.Listener
Description: �¼�������.
Company: ��������
Author:leidh
*/


//-------------------------------------------------------------------------------
//�¼�������.
//-------------------------------------------------------------------------------
function Listener(sEventName, oAnswerMethod, oDest){
  //1.���� =function();
  

  //2.���������� =function();
  this.CLASSNAME= "gp.common.Listener";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.�¼���Ӧ������.

  this.sEventName= sEventName;
  this.oAnswerMethod= oAnswerMethod;
  this.oDest= oDest;
  this.oSource= null;

  this.tEnabled= true;

  //4.�¼������� =function();

  //6.���������� =function();
  this.init= Listener_init;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//private; ��ʼ��;
function Listener_init(){
  if (this.oDest== null) this.oDest= window;
  if (this.oDest.sUID== null) this.oDest.sUID= PF.getUID();
  if (this.oSource!= null && this.oSource.sUID== null) this.oSource.sUID= PF.getUID();
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------



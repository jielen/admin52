/* $Id: Listener.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.Listener
Description: 事件侦听者.
Company: 用友政务
Author:leidh
*/


//-------------------------------------------------------------------------------
//事件侦听者.
//-------------------------------------------------------------------------------
function Listener(sEventName, oAnswerMethod, oDest){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.common.Listener";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.事件响应中有用.

  this.sEventName= sEventName;
  this.oAnswerMethod= oAnswerMethod;
  this.oDest= oDest;
  this.oSource= null;

  this.tEnabled= true;

  //4.事件声明区 =function();

  //6.方法声明区 =function();
  this.init= Listener_init;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//private; 初始化;
function Listener_init(){
  if (this.oDest== null) this.oDest= window;
  if (this.oDest.sUID== null) this.oDest.sUID= PF.getUID();
  if (this.oSource!= null && this.oSource.sUID== null) this.oSource.sUID= PF.getUID();
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------



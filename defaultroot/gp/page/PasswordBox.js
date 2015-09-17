/* $Id: PasswordBox.js,v 1.2 2008/06/02 13:41:20 huangcb Exp $ */
/*
Title: gp.page.PasswordBox
Description: 
口令输入框类;用于输入口令;
Company: 用友政务
Author:zhangcheng
*/
//----------------------------------------------------------------------
function PasswordBox(sid){
  //1.超类 =function();
  TextBox.call(this,sid);
  
  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.PasswordBox";
  
  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
}
//----------------------------------------------------------------------



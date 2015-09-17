/* $Id: TextAreaBox.js,v 1.2 2008/06/02 13:41:19 huangcb Exp $ */
/*
Title: gp.page.TextAreaBox
Description:
文本域输入框类;用于多行的文本输入输出;
Company: 用友政务
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function TextAreaBox(sid){
  //1.超类 =function();
  TextBox.call(this,sid);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.TextAreaBox";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.

  //5.方法声明区 =function();
  //public;

  //private;
  this.checkMaxLen= TextAreaBox_checkMaxLen;
  this.eventAnswer_OnChange= TextAreaBox_eventAnswer_OnChange;
}
//----------------------------------------------------------------------
//5.方法区 =function();
//----------------------------------------------------------------------
//private;检查并处理最大长度
//return:void;
function TextAreaBox_checkMaxLen(){
  if (this.oInputBox.innerText.length<= this.getMaxLen()) return;
  this.oInputBox.innerText= this.oInputBox.innerText.substr(0, this.getMaxLen());
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; 内容改变事件.
//返回值: void;
function TextAreaBox_eventAnswer_OnChange(oSender, sValue, oEvent){
  this.checkMaxLen();
}
//----------------------------------------------------------------------

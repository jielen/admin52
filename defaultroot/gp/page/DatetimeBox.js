/* $Id: DatetimeBox.js,v 1.2 2008/06/02 13:40:19 huangcb Exp $ */
/*
Title: gp.page.DatetimeBox
Description: 
日期编辑框类;用于日期的输入;
Company: 用友政务
Author: leidh
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function DatetimeBox(sid){
  //1.超类 =function();
  DateBox.call(this,sid);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.DatetimeBox";
  
  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
}
//----------------------------------------------------------------------


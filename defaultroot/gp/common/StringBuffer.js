/* $Id: StringBuffer.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.StringBuffer
Description: 
StringBuffer 类，提供一个字符串缓冲区,高速进字符串的拼接。
Company: 用友政务
Author:leidh
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function StringBuffer(){
  //1.超类 =function();
  List.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.common.StringBuffer";
  
  //3.变量声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.append= StringBuffer_append;
  this.toString= StringBuffer_toString;
  //以上已完成文档
  
  //private;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 追加新的串; 
//return: StringBuffer/null;
function StringBuffer_append(sItem){
  this.avItem[this.avItem.length]= sItem;
  return this;
}
//----------------------------------------------------------------------
//public; 输出成一个完整的字符串;
//返回值:成功: 字符串, 失败: null;
function StringBuffer_toString(){
  if (this.avItem== null) return null;
  return this.avItem.join("");
}
//----------------------------------------------------------------------

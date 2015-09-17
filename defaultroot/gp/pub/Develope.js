/* $Id: Develope.js,v 1.1 2008/02/20 11:42:04 liuxiaoyong Exp $ */
/*
Title: gp.pub.Develope
Description:
Develope 类，用于封装对页面数据的访问.
Company: 用友政务
Author:leidh
*/

//----------------------------------------------------------------------
//声明页面中的全局对象;
var Dev= new Develope();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Develope(){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.pub.Develope";

  //3.变量声明区 =function();
  this.oNoteBuf= new StringBuffer();
  this.tIsDebug= false;

  //5.方法声明区 =function();
  //public;
  this.dbDescribe= Develope_dbDescribe;
  this.getTime= Develope_getTime;
  this.getSecondMargin= Develope_getSecondMargin;
  this.addNote= Develope_addNote;
  this.getNote= Develope_getNote;
  this.clearNote= Develope_clearNote;

  //private;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public;
//return: array of 2 elements,[0]=true/false,[1]=message;
function Develope_dbDescribe(sTable){
  //alert("Develope_dbDescribe();");
  var vavRet= new Array();
  vavRet[0]= false;
  vavRet[1]= "参数无效;";
  if (PF.isEmpty(sTable)) return vavRet;
  var voResponse= Info.requestData("dbdescribe", "all", new Array("table"), new Array(sTable));
  if (voResponse== null){
    vavRet[1]= "回复为 null,服务器在执行此功能时已出错,请查看控制台和 Rolling.log 文件.";
    return vavRet;
  }
  var voRoot= PF.parseXml(voResponse.text);
  vtIsSuccess= PF.parseBool(voRoot.getAttribute("success"));
  vavRet[0]= vtIsSuccess;
  vavRet[1]= voRoot.text;
  return vavRet;
}
//----------------------------------------------------------------------
//public;
function Develope_getTime(){
  return (new Date()).getTime();
}
//----------------------------------------------------------------------
//public;
function Develope_getSecondMargin(lBeginTime, lEndTime){
 return (lEndTime-lBeginTime)/1000+ "s";
}
//----------------------------------------------------------------------
//public;
function Develope_addNote(sCap, sContent){
  if (!this.tIsDebug) return;
  this.oNoteBuf.append(PF.getSecond()).append(" ");
  this.oNoteBuf.append(PF.getFunctionName(Develope_addNote.caller));
  this.oNoteBuf.append(": ");
  this.oNoteBuf.append(sCap).append(" ").append(sContent);
  this.oNoteBuf.append("\n");
}
//----------------------------------------------------------------------
//public;
function Develope_getNote(){
  return this.oNoteBuf.toString();
}
//----------------------------------------------------------------------
//public;
function Develope_clearNote(){
  this.oNoteBuf.clear();
}
//----------------------------------------------------------------------


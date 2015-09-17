/* $Id: Develope.js,v 1.1 2008/02/20 11:42:04 liuxiaoyong Exp $ */
/*
Title: gp.pub.Develope
Description:
Develope �࣬���ڷ�װ��ҳ�����ݵķ���.
Company: ��������
Author:leidh
*/

//----------------------------------------------------------------------
//����ҳ���е�ȫ�ֶ���;
var Dev= new Develope();
//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function Develope(){
  //1.���� =function();
  

  //2.���������� =function();
  this.CLASSNAME= "gp.pub.Develope";

  //3.���������� =function();
  this.oNoteBuf= new StringBuffer();
  this.tIsDebug= false;

  //5.���������� =function();
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
//6.������ =function();
//----------------------------------------------------------------------
//public;
//return: array of 2 elements,[0]=true/false,[1]=message;
function Develope_dbDescribe(sTable){
  //alert("Develope_dbDescribe();");
  var vavRet= new Array();
  vavRet[0]= false;
  vavRet[1]= "������Ч;";
  if (PF.isEmpty(sTable)) return vavRet;
  var voResponse= Info.requestData("dbdescribe", "all", new Array("table"), new Array(sTable));
  if (voResponse== null){
    vavRet[1]= "�ظ�Ϊ null,��������ִ�д˹���ʱ�ѳ���,��鿴����̨�� Rolling.log �ļ�.";
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


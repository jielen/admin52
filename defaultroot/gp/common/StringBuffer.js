/* $Id: StringBuffer.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.StringBuffer
Description: 
StringBuffer �࣬�ṩһ���ַ���������,���ٽ��ַ�����ƴ�ӡ�
Company: ��������
Author:leidh
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function StringBuffer(){
  //1.���� =function();
  List.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.common.StringBuffer";
  
  //3.���������� =function();

  //5.���������� =function();
  //public;
  this.append= StringBuffer_append;
  this.toString= StringBuffer_toString;
  //����������ĵ�
  
  //private;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ׷���µĴ�; 
//return: StringBuffer/null;
function StringBuffer_append(sItem){
  this.avItem[this.avItem.length]= sItem;
  return this;
}
//----------------------------------------------------------------------
//public; �����һ���������ַ���;
//����ֵ:�ɹ�: �ַ���, ʧ��: null;
function StringBuffer_toString(){
  if (this.avItem== null) return null;
  return this.avItem.join("");
}
//----------------------------------------------------------------------

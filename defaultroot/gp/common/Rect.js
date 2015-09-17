/* $Id: Rect.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.Rect
Description: Rect �ࡣ
Company: ��������
Author:leidh
*/

function Rect(iLeft, iTop, iWidth, iHeight){
  

  //����;
  this.CLASSNAME= "gp.common.Rect";

  //����;
  this.iLeft= 0      //private;
  this.iTop= 0;      //private;
  this.iWidth= 0;    //private;
  this.iHeight= 0;   //private;

  //����;
  //public;
  this.getHeight= Rect_getHeight;
  this.getLeft= Rect_getLeft;
  this.getTop= Rect_getTop;
  this.getWidth= Rect_getWidth;
  this.setHeight= Rect_setHeight;
  this.setLeft= Rect_setLeft;
  this.setTop= Rect_setTop;
  this.setWidth= Rect_setWidth;
  this.isLeftPercent= Rect_isLeftPercent;
  this.isTopPercent= Rect_isTopPercent;
  this.isWidthPercent= Rect_isWidthPercent;
  this.isHeightPercent= Rect_isHeightPercent;

  //private;
  this.init= Rect_init;

  //����:
  this.init(iLeft, iTop, iWidth, iHeight);
}
//-------------------------------------------------------------------------------
//private; ��ʼ����
//return: �ɹ���true; ����: false;
function Rect_init(iLeft, iTop, iWidth, iHeight){
  this.setLeft(iLeft);
  this.setTop(iTop);
  this.setWidth(iWidth);
  this.setHeight(iHeight);
  return true;
}
//-------------------------------------------------------------------------------
//public; ���� ֵ;
//return: void;
function Rect_setLeft(iLeft){
  if (iLeft== null) this.iLeft= 0;
  else this.iLeft= iLeft;
}
//-------------------------------------------------------------------------------
//public; ���� ֵ;
//return: void;
function Rect_setTop(iTop){
  if (iTop== null) this.iTop= 0;
  else this.iTop= iTop;
}
//-------------------------------------------------------------------------------
//public; ���� ֵ;
//return: void;
function Rect_setWidth(iWidth){
  if (iWidth== null) this.iWidth= 0;
  else this.iWidth= iWidth;
}
//-------------------------------------------------------------------------------
//public; ���� ֵ;
//return: void;
function Rect_setHeight(iHeight){
  if (iHeight== null) this.iHeight= 0;
  else this.iHeight= iHeight;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_getLeft(){
  return this.iLeft;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_getTop(){
  return this.iTop;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_getWidth(){
  return this.iWidth;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_getHeight(){
  return this.iHeight;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_isLeftPercent(){
  return ((this.iLeft+ "").indexOf("%")> 0)? true: false;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_isTopPercent(){
  return ((this.iTop+ "").indexOf("%")> 0)? true: false;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_isWidthPercent(){
  return ((this.iWidth+ "").indexOf("%")> 0)? true: false;
}
//-------------------------------------------------------------------------------
//public; ��ȡ ֵ;
//return: void;
function Rect_isHeightPercent(){
  return ((this.iHeight+ "").indexOf("%")> 0)? true: false;
}
//-------------------------------------------------------------------------------


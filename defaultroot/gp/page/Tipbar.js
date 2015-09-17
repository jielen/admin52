/* $Id: Tipbar.js,v 1.1 2008/02/20 11:42:03 liuxiaoyong Exp $ */
/*
Title: gp.page.Tipbar
Description: 提示条;
Company: 用友政务
Date: 2004.10.21
Author: leidh
*/

//----------------------------------------------------------------------
function Tipbar(){
  this.CLASSNAME= "gp.page.Tipbar";

  this.sName= this.CLASSNAME;
  this.oOuterObj= null;        //外部对象;

  this.oContainer= null;  //private; 对象的容器; make()时给定;
  this.oOuterPanel= null; //private;
  this.oTA= null;         //private;
  this.oTextTD= null;     //private;

  this.oRect= new Rect(); //private;

  this.tHasInit= false;

  //public;
  this.getText= Tipbar_getText;
  this.init= Tipbar_init;
  this.isVisible= Tipbar_isVisible;
  this.make= Tipbar_make;
  this.resize= Tipbar_resize;
  this.setRect= Tipbar_setRect;
  this.setText= Tipbar_setText;
  this.setVisible= Tipbar_setVisible;

	this.release = Tipbar_release;
  //private;
}
//----------------------------------------------------------------------
//5.方法区 =function();
//----------------------------------------------------------------------
//public; 生成构件的HTML对象.
//返回值:成功: true, 失败: false;
function Tipbar_make(){
  this.oContainer= document.body;

  this.oOuterPanel= document.createElement("<div class='clsTipbarContainer4' id='TipDiv'>");
  this.oContainer.appendChild(this.oOuterPanel);

  this.oTA= document.createElement("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
  var vjTH= document.createElement("<thead>");
  var vjTB= document.createElement("<tbody>");
  var vjTR= document.createElement("<tr>");
  this.oTextTD= document.createElement("<td class='clsTipbarText4' nowrap>");

  this.oOuterPanel.appendChild(this.oTA);
  this.oTA.appendChild(vjTH);
  this.oTA.appendChild(vjTB);
  vjTB.appendChild(vjTR);
  vjTR.appendChild(this.oTextTD);

  this.oOuterPanel.oOwner= this;
  this.oTA.oOwner= this;
  this.oTextTD.oOwner= this;

  return true;
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function Tipbar_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;

  this.tHasInit= true;
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值: 成功: true, 失败: false;
function Tipbar_resize(){
  if (this.tHasInit== false) return false;

  if (this.oContainer.clientWidth< this.oRect.iLeft+ this.oOuterPanel.offsetWidth){
    this.oRect.iLeft= this.oContainer.clientWidth- this.oOuterPanel.offsetWidth;
  }

  this.oOuterPanel.style.left= this.oRect.iLeft;
  this.oOuterPanel.style.top= this.oRect.iTop;

  return true;
}
//----------------------------------------------------------------------
//public; 设置显示属性;
//返回值: void;
function Tipbar_setVisible(tIsVisible){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setVisible");
  tIsVisible= PF.parseBool(tIsVisible);

  if (tIsVisible){
    this.oOuterPanel.style.display= "block";
    this.oRect.iLeft= event.clientX+ 0;
    this.oRect.iTop= event.clientY+ 22;
    this.resize();
  }else{
    this.oOuterPanel.style.display= "none";
  }

  return;
}
//----------------------------------------------------------------------
//public; 隐藏;
//返回值: 可见: true; 否则: false;
function Tipbar_isVisible(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isVisible");
  if (this.oOuterPanel.style.display== "none") return false;
  return true;
}
//----------------------------------------------------------------------
//public; 设置提示文本;
//返回值: void;
function Tipbar_setText(sText){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setText");
  this.oTextTD.innerText= sText;
  return;
}
//----------------------------------------------------------------------
//public; 获取提示文本;
//返回值: 成功: 提示文本; 否则: null;
function Tipbar_getText(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getText");
  var vsText= this.oTextTD.innerText;
  return vsText;
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//返回值: void;
function Tipbar_setRect(oRect){
  this.oRect.iLeft= oRect.iLeft;
  this.oRect.iTop= oRect.iTop;
  this.oRect.iWidth= oRect.iWidth;
  this.oRect.iHeight= oRect.iHeight;

  this.resize();
  return;
}
//----------------------------------------------------------------------

function Tipbar_release() {
	this.oContainer = null;
	this.oOuterPanel.oOwner = null;
	this.oTA.oOwner = null;
	this.oTextTD.oOwner = null;
	for (var prop in this) {
		this[prop] = null;
	}
}



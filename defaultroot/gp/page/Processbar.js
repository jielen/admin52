/* $Id: Processbar.js,v 1.1 2008/02/20 11:42:03 liuxiaoyong Exp $ */
/*
Title: gp.page.Processbar
Description: 进度条;
Company: 用友政务
Author: leidh;
*/

//----------------------------------------------------------------------
function Processbar(){
  //1.超类 =function();
  Base.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.Processbar";

  this.CELL_WIDTH= "10px";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部对象;

  this.oContainer= null;
  this.oOuterPanel= null;                  //外部面板,
  this.oTA= null;
  this.oTR= null;

  this.oRect= new Rect(0, 0, 400, 20);     //private;控件大小.
  this.oDefRect= new Rect(0, 0, 400, 20);  //private; 对象默认的大小;

  this.nMin= 0.00;
  this.nMax= 99.00;
  this.nValue= 0.00;
  this.nScale= 0.00;
  this.iCellCount= 0;

  //面板风格.
  this.sBackColor= "";
  this.sForeColor= "#0A246A";
  this.iCellSpacing= 0;
  
  //自动运行参数;
  this.sSelfId= "";
  
  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.autoRun= Processbar_autoRun;
  this.getScale= Processbar_getScale;
  this.getValue= Processbar_getValue;
  this.init= Processbar_init;
  this.make= Processbar_make;
  this.resize= Processbar_resize;
  this.setClass= Processbar_setClass;
  this.setStyle= Processbar_setStyle;
  this.setStyleItem= Processbar_setStyleItem;
  this.setValue= Processbar_setValue;
  //以上已完成文档

  //private;
  this.makeK= Processbar_makeK;
  this.makeCell= Processbar_makeCell;
  this.adjustStyle= Processbar_adjustStyle;

  //friendly;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 生成构件的HTML对象.
//返回值:成功: true, 失败: false;
function Processbar_make(oContainer){
  if (oContainer== null) Info.throws("无效的参数;", this.CLASSNAME, "make", new Array("oContainer is null;"));
  this.oOuterPanel= document.createElement("<div id='OuterDiv' style='position:absolute; overflow:hidden; padding:2px'>");
  this.oContainer= oContainer;
  this.oContainer.appendChild(this.oOuterPanel);
  this.oOuterPanel.oOwner= this;
  return this.makeK(this.oOuterPanel);
}
//----------------------------------------------------------------------
//private; 生成构件的HTML对象.
//返回值:成功: true, 失败: false;
function Processbar_makeK(oOuterPanel){
  if (oOuterPanel== null) Info.throws("无效的参数;", this.CLASSNAME, "makeK", new Array("oOuterPanel is null;"));
  this.oOuterPanel= oOuterPanel;
  this.oOuterPanel.innerHTML= "";
  this.oTA= document.createElement("<table border=\"0\" width=\"100%\" height=\"100%\" style=\"position:absolute; font-size: 1pt\" cellpadding=\"0\" cellspacing=\""+ this.iCellSpacing+ "px\">");
  var voTH= document.createElement("<thead>");
  var voTB= document.createElement("<tbody>");
  this.oTR= document.createElement("<tr>");
  this.oOuterPanel.appendChild(this.oTA);
  this.oTA.appendChild(voTH);
  this.oTA.appendChild(voTB);
  voTB.appendChild(this.oTR);

  this.iCellCount= this.oOuterPanel.clientWidth/ parseInt(this.CELL_WIDTH);
  var voTD= null;
  for (var i= 0; i< this.iCellCount; i++){
    //voTD= document.createElement("<td width= \""+ (1/ this.iCellCount* 100)+ "%\">");
    voTD= document.createElement("<td width= \"10px\">");
    voTD.innerText= "0";
    this.oTR.appendChild(voTD);
  }
  return true;
}
//----------------------------------------------------------------------
//private; 生成构件的HTML对象.
//返回值:成功: true, 失败: false;
function Processbar_makeCell(){
  if (this.oOuterPanel== null) return;
  this.iCellCount= parseInt(this.oOuterPanel.clientWidth/ parseInt(this.CELL_WIDTH));
  var viCount= this.iCellCount- this.oTR.childNodes.length;
  var voTD= null;
  for (var i= 0; i< viCount; i++){
    //voTD= document.createElement("<td width= \""+ (1/ this.iCellCount* 100)+ "%\">");
    voTD= document.createElement("<td width= '"+ this.CELL_WIDTH+ "'; height='100%'>");
    voTD.innerText= "";
    this.oTR.appendChild(voTD);
  }
  for (var i= viCount; i< 0; i++) this.oTR.removeChild(this.oTR.firstChild);
  this.iCellCount= this.oTR.childNodes.length;
  return true;
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function Processbar_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;

  this.oOuterPanel.oOwner= this;
  this.oTA.oOwner= this;
  this.oTR.oOwner= this;

  this.sSelfId= "Obj_"+ PF.getUID();
  this.sSelfId= this.sSelfId.replace(/-/gi, "_");
  eval("window."+ this.sSelfId+ "= this;");
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值: void;
function Processbar_resize(){
  if (this.tHasInit== false) return false;
  
  if (this.oRect.iWidth< 20) this.oRect.iWidth= 20;
  if (this.oRect.iHeight< 18) this.oRect.iHeight= 18;
  
  var vtMakeCell= false;
  if (this.oRect.iWidth!= this.oOuterPanel.offsetWidth
      || this.oRect.iHeight!= this.oOuterPanel.offsetHeight){
    vtMakeCell= true;
  }

  //this.oOuterPanel.
  if (this.oOuterPanel== null) return false;
  this.oOuterPanel.style.left= this.oRect.iLeft;
  this.oOuterPanel.style.top= this.oRect.iTop;
  this.oOuterPanel.style.width= this.oRect.iWidth;
  this.oOuterPanel.style.height= this.oRect.iHeight;
  if (vtMakeCell) this.makeCell();
  
  this.iCellSpacing= parseInt(this.iCellSpacing);
  this.oTA.style.left= 0- this.iCellSpacing+ 1;
  this.oTA.style.top= 0- this.iCellSpacing+ 1;
  this.oTA.style.width= Math.abs(this.oOuterPanel.clientWidth+ this.iCellSpacing* 2- 2);
  this.oTA.style.height= Math.abs(this.oOuterPanel.clientHeight+ this.iCellSpacing* 2- 2);
  
  //alert(this.oTA.style.height+ ", "+ this.oTA.offsetHeight+ ", "+ this.oOuterPanel.offsetHeight+ ", "+ this.oRect.iHeight);
  return true;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值: void;
function Processbar_setValue(nValue){
  if (nValue== null) return;
  if (this.nMax== this.nMin) return;
  if (this.nValue== nValue) return;
  nValue= parseFloat(nValue);
  this.nValue= nValue;

  this.nScale= Math.abs((this.nValue* 1.00- this.nMin)/ (this.nMax- this.nMin));
  var viBlueTDCount= this.iCellCount* this.nScale;
  if (viBlueTDCount> this.iCellCount) viBlueTDCount= this.iCellCount;

  for (var i= 0; i< viBlueTDCount; i++) this.oTR.childNodes[i].style.backgroundColor= this.sForeColor;
  for (var i= viBlueTDCount; i< this.iCellCount; i++) this.oTR.childNodes[i].style.backgroundColor= this.sBackColor;
  return true;
}
//----------------------------------------------------------------------
//public; 获取当前的值;
//返回值: void;
function Processbar_getValue(){
  return this.nValue;
}
//----------------------------------------------------------------------
//public; 获取当前的值;百分比;
//返回值: void;
function Processbar_getScale(){
  return this.nScale;
}
//----------------------------------------------------------------------
//public; 自动运行;按时间,每 500 毫秒调用一次,一次运行 5 格;默认值为:0-99;
//返回值: void;
function Processbar_autoRun(tIsRepeat, iPeriod, iStep){
  //alert("Processbar_autoRun();");
  if (iPeriod== null) iPeriod= 500;
  if (iStep== null) iStep= 5;
  if (this.nValue>= this.nMax){
    tIsRepeat= PF.parseBool(tIsRepeat);
    if (tIsRepeat) this.nValue= 0;
    else return;
  }
  this.setValue(this.nValue+ iStep);
  window.setTimeout("window."+ this.sSelfId+ ".autoRun("+ tIsRepeat+ ","+ iPeriod+ ","+ iStep+ ");", iPeriod);
}
//----------------------------------------------------------------------
//private; 调整风格,以保持整个控件的的风格正确性;
//返回值: void;
function Processbar_adjustStyle(){
  //alert(this.CLASSNAME+ ".adjustStyle();");
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "adjustStyle");

  this.oOuterPanel.style.overflow= "hidden";

  if (isNaN(parseInt(this.oOuterPanel.currentStyle.width))){
    this.oOuterPanel.style.width= this.oDefRect.iWidth;
  }
  if (isNaN(parseInt(this.oOuterPanel.currentStyle.height))){
    this.oOuterPanel.style.height= this.oDefRect.iHeight;
  }

  this.oRect.setLeft(this.oOuterPanel.currentStyle.left);
  this.oRect.setTop(this.oOuterPanel.currentStyle.top);
  this.oRect.setWidth(this.oOuterPanel.offsetWidth);
  this.oRect.setHeight(this.oOuterPanel.offsetHeight);
  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Processbar_setStyle(sStyle){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格中的指定项目;
//param: sName 的写法必须为 js 的写法,如: border-color,必须写成 borderColor;
//返回值: void;
function Processbar_setStyleItem(sName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyleItem");
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Processbar_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------

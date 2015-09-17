/* $Id: Tabstrip.js,v 1.4 2008/06/05 08:51:36 liuxiaoyong Exp $ */
/*
Title: gp.page.Tabstrip
Description: 页签控件;
Company: 用友政务
Date: 2004.10.22
Author: leidh;
*/

/*
  Tab 对象创建及属性说明;
  var voTab= new Object();
  voTab.sId= "";
  voTab.oLabelHeadCell= null;
  voTab.oLabelBodyCell= null;
  voTab.oUserPanel= null;
  voTab.tIsSelected= false;
  voTab.tIsVisible= true;
//*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Tabstrip(){
  Base.call(this);

  this.CLASSNAME= "gp.page.Tabstrip";

  this.ORIENTATION_UP= "UP";
  this.ORIENTATION_DOWN= "DOWN";

  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部父控件. 需要定义 TabSelect() 事件方法.

  this.oOuterPanel= null;     //private; 外部面板.
  this.oInnerPanel= null;     //private; 内部面板.
  this.oLabelsPanel= null;    //private; 标签面板.
  this.oLabelsHeadRow= null;  //private; 标签<table>.
  this.oLabelsBodyRow= null;  //private; 标签<table>.
  this.oTopBorderDiv= null;   //private;

  this.oTabMap= null;         //private; 页签对象 key 所对应的序号;
  this.oSelTab= null;         //private; 选中的 Tab.
  this.oRect= new Rect(0, 0, 400, 300);    //private; Tabstrip 的外层大小.

  this.tHasInit= false;             //private;

  //3.事件声明区= function();
  this.OnInit= "OnInit";                //参数: oSender;
  this.OnResize= "OnResize";            //参数: oSender;
  this.OnTabSelected= "OnTabSelected";  //参数: oSender, oSelTab, oOldSelTab;

  //4.方法声明区= function();
  //public;
  this.getOrientation= Tabstrip_getOrientation;
  this.getSelTab= Tabstrip_getSelTab;
  this.getTab= Tabstrip_getTab;
  this.getTabByIndex= Tabstrip_getTabByIndex;
  this.getTabCaption= Tabstrip_getTabCaption;
  this.getTabCount= Tabstrip_getTabCount;
  this.getTabIndex= Tabstrip_getTabIndex;
  this.getTabPos= Tabstrip_getTabPos;
  this.init= Tabstrip_init;
  this.make= Tabstrip_make;
  this.resize= Tabstrip_resize;
  this.selTab= Tabstrip_selTab;
  this.selTabK= Tabstrip_selTabK;
  this.setClass= Tabstrip_setClass;
  this.setStyle= Tabstrip_setStyle;
  this.setStyleItem= Tabstrip_setStyleItem;
  this.setTabCaption= Tabstrip_setTabCaption;
  this.setTabIndex= Tabstrip_setTabIndex;

  this.getFirstTab= Tabstrip_getFirstTab;
  this.getLastTab= Tabstrip_getLastTab;
  this.getPreTab= Tabstrip_getPreTab;
  this.getNextTab= Tabstrip_getNextTab;
  this.setTabVisible= Tabstrip_setTabVisible;

  //private;
  this.initTabs= Tabstrip_initTabs;
  this.adjustStyle= Tabstrip_adjustStyle;
  this.setSelTabFacade= Tabstrip_setSelTabFacade;
  this.setNormTabFacade= Tabstrip_setNormTabFacade;
  this.getTabIdFromLabelBodyCell= Tabstrip_getTabIdFromLabelBodyCell;
  
  this.release = Tabstrip_release;
}
//----------------------------------------------------------------------
//5.方法区 =function();
//----------------------------------------------------------------------
//public; 生成 Grid 的 HTML DOM 对象；
//return:成功: true, 失败: false;
function Tabstrip_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;

  this.oInnerPanel= this.oOuterPanel.all("Tabstrip_InnerDiv"+ sId);
  this.oLabelsPanel= this.oOuterPanel.all("Tabstrip_LabelsDiv"+ sId);
  this.oTopBorderDiv= this.oOuterPanel.all("Tabstrip_TopBorderDiv"+ sId);
  
  this.oInnerPanel.oOwner= this;
  this.oLabelsPanel.oOwner= this;
  this.oTopBorderDiv.oOwner= this;
  
  var voLabelsTable= this.oLabelsPanel.firstChild;
  if (voLabelsTable!= null){
    this.oLabelsHeadRow= voLabelsTable.all("Tabstrip_LabelsHeadTR");
    this.oLabelsBodyRow= voLabelsTable.all("Tabstrip_LabelsBodyTR");
    this.oLabelsHeadRow.oOwner= this;
    this.oLabelsBodyRow.oOwner= this;
  }

  this.setRectWithOuterPanel();
  return true;
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值: 成功: true, 失败: false;
function Tabstrip_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;
  if (this.initTabs()== false) return false;

  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public;
//返回值: oTab/null;
function Tabstrip_getNextTab(oTab){
  if (oTab== null) return null;
  var viIndex= this.oTabMap.getKeyIndex(oTab.sId);
  var vasKey= this.oTabMap.getAllKey();
  viIndex++;
  if (viIndex>= vasKey.length) return null;
  return this.oTabMap.get(vasKey[viIndex]);
}
//----------------------------------------------------------------------
//public;
//返回值: oTab/null;
function Tabstrip_getPreTab(oTab){
  if (oTab== null) return null;
  var viIndex= this.oTabMap.getKeyIndex(oTab.sId);
  var vasKey= this.oTabMap.getAllKey();
  viIndex--;
  if (viIndex< 0) return null;
  return this.oTabMap.get(vasKey[viIndex]);
}
//----------------------------------------------------------------------
//public;
//返回值: oTab/null;
function Tabstrip_getFirstTab(){
  if (oTab== null) return null;
  var vasKey= this.oTabMap.getAllKey();
  if (vasKey.length<= 0) return null;
  return this.oTabMap.get(vasKey[0]);
}
//----------------------------------------------------------------------
//public;
//返回值: oTab/null;
function Tabstrip_getLastTab(){
  if (oTab== null) return null;
  var vasKey= this.oTabMap.getAllKey();
  if (vasKey.length<= 0) return null;
  return this.oTabMap.get(vasKey[vasKey.length- 1]);
}
//----------------------------------------------------------------------
//public;
//返回值: oTab/null;
function Tabstrip_setTabVisible(oTab, tIsVisible){
  if (oTab== null) return null;
  tIsVisible= PF.parseBool(tIsVisible);
  oTab.tIsVisible= tIsVisible;
  if (tIsVisible){
    oTab.oLabelHeadCell.style.display= "block";
    oTab.oLabelBodyCell.style.display= "block";
    oTab.oUserPanel.style.visibility= "visible";
  }else{
    oTab.oLabelHeadCell.style.display= "none";
    oTab.oLabelBodyCell.style.display= "none";
    oTab.oUserPanel.style.visibility= "hidden";
    if (oTab== this.oSelTab){
      var voSelTab= this.getNextTab(oTab);
      if (voSelTab== null || voSelTab.tIsVisible== false) voSelTab= this.getPreTab(oTab);
      if (voSelTab== null || voSelTab.tIsVisible== false){
        for (var i= 0, len= this.getTabCount(); i< len; i++){
          voSelTab= this.getTabByIndex(i);
          if (voSelTab== null || voSelTab.tIsVisible== false){
            voSelTab= null;
            continue;
          }
          break;
        }
      }
      if (voSelTab!= null){
        this.selTabK(voSelTab);
      }
    }
  }
  return;
}
//----------------------------------------------------------------------
//private; 初始化.
//返回值: 成功: true, 失败: false;
/*
  var voTab= new Object();
  voTab.sId= "";
  voTab.oLabelHeadCell= null;
  voTab.oLabelBodyCell= null;
  voTab.sMidBackGround= "";
  voTab.oUserPanel= null;
  voTab.tIsSelected= false;
  voTab.tIsVisible= true;
//*/
function Tabstrip_initTabs(){
  this.oTabMap= new Map();
  var voTD= null;
  var vsId= "";
  var vsBorderColor= this.oInnerPanel.currentStyle.borderColor;
  for (var i= 0; i< this.oLabelsBodyRow.childNodes.length; i++){
    voTD= this.oLabelsBodyRow.childNodes[i];
    vsId= this.getTabIdFromLabelBodyCell(voTD);
    
    var voTab= new Object();
    voTab.sId= vsId;
    voTab.oLabelHeadCell= this.oLabelsHeadRow.childNodes[i];
    voTab.oLabelBodyCell= voTD;
    voTab.oUserPanel= this.oInnerPanel.all("Tabstrip_UserPanel_"+ this.oOuterPanel.id+ vsId);
    voTab.tIsSelected= false;
    voTab.tIsVisible= true;
    
    this.oTabMap.put(vsId, voTab);

    voTab.oOwner= this;    
    voTab.oUserPanel.oTab= voTab;
    voTab.oLabelHeadCell.oTab= voTab;
    voTab.oLabelBodyCell.oTab= voTab;
    voTab.oLabelBodyCell.onclick= Tabstrip_Tab_onclick;

    voTab.sMidBackGround= voTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Mid_TD").background;
    voTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Left_Div").style.borderColor= vsBorderColor;
    voTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Right_Div").style.borderColor= vsBorderColor;
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Left_Line_TD").style.backgroundColor= vsBorderColor;
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Right_Line_TD").style.backgroundColor= vsBorderColor;
  }
  return true;
}
//----------------------------------------------------------------------
//private;
function Tabstrip_getTabIdFromLabelBodyCell(oTD){
  return oTD.id.substr(("Tabstrip_Label_Body_"+ this.oOuterPanel.id).length);
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值: 成功: true, 失败: false;
function Tabstrip_resize(){
  if (this.tHasInit!= true) return false;
  if (this.oOuterPanel== null) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= true;

  if (this.oRect.iWidth== null || (!this.oRect.isWidthPercent() && parseInt(this.oRect.iWidth)< 50)) this.oRect.iWidth= 50;
  if (this.oRect.iHeight== null || (!this.oRect.isHeightPercent() && parseInt(this.oRect.iHeight)< 50)) this.oRect.iHeight= 50;

  if (this.getPosition()== "absolute"){
    this.oOuterPanel.style.left= this.oRect.iLeft;
    this.oOuterPanel.style.top= this.oRect.iTop;
  }
  this.oOuterPanel.style.width= this.oRect.iWidth;
  this.oOuterPanel.style.height= this.oRect.iHeight;
  
  this.oOuterPanel._iClientHeight= this.oOuterPanel.clientHeight;
  this.oOuterPanel._iOffsetHeight= this.oOuterPanel._iClientHeight+ parseInt(this.oOuterPanel.currentStyle.borderTopWidth)+ parseInt(this.oOuterPanel.currentStyle.borderBottomWidth);

  this.oLabelsPanel._iOffsetHeight= this.oLabelsPanel.offsetHeight;
  this.oInnerPanel.style.height= Math.abs(this.oOuterPanel._iClientHeight- this.oLabelsPanel._iOffsetHeight- this.oTopBorderDiv.offsetHeight);//this.oOuterPanel.offsetHeight- this.oLabelsPanel.offsetHeight;

  this.oInnerPanel._iClientWidth= this.oInnerPanel.clientWidth;
  this.oInnerPanel._iClientHeight= this.oInnerPanel.clientHeight;
  var vaoTab= this.oTabMap.getAllItem();
  for (var i= 0; i< vaoTab.length; i++){
    vaoTab[i].oUserPanel.style.width= this.oInnerPanel._iClientWidth;
    vaoTab[i].oUserPanel.style.height= this.oInnerPanel._iClientHeight;
  }
  this.setSelTabFacade(this.oSelTab);

  this.fireOnResize();
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//public; 获取页签对象;
//返回值: 成功: 页签对象, 失败: null;
function Tabstrip_getTab(sId){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getTabByKey");
  if (sId== null) sId= "";
  var voTab= this.oTabMap.get(sId);
  return voTab;
}
//----------------------------------------------------------------------
//public; 获取页签对象;
//参数: iIndex 从 0 开始;
//返回值: 成功: 页签对象, 失败: null;
function Tabstrip_getTabByIndex(iIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getTab");
  if (iIndex== null) return null;
  if (iIndex< 0 || iIndex>= this.getTabCount()) return null;
  var vsId= this.getTabIdFromLabelBodyCell(this.oLabelsBodyRow.childNodes[iIndex]);
  var voTab= this.getTab(vsId);
  return voTab;
}
//----------------------------------------------------------------------
//public; 获取标签的序号;
//返回值: 成功: 标签的序号, 否则: -1;
function Tabstrip_getTabPos(oTab){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getTab");
  if (oTab== null) return -1;

  var voTD= oTab.oLabelBodyCell;
  for (var i= 0, len= voTD.parentNode.cells.length; i< len; i++){
    if (voTD.parentNode.cells[i]== voTD) return i;
  }
  return -1;
}
//----------------------------------------------------------------------
//public; 获取页签的个数;
//返回值: 成功: 页签的个数, 否则: -1;
function Tabstrip_getTabCount(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getTabCount");
  if (this.oLabelsBodyRow== null) return -1;
  return this.oLabelsBodyRow.childNodes.length;
}
//----------------------------------------------------------------------
//public; 获取标签的序号;
//返回值: caption / null;
function Tabstrip_getTabCaption(oTab){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getTab");
  if (oTab== null) return null;
  return oTab.oLabelBodyCell.firstChild.rows[0].childNodes[1].innerText;
}
//----------------------------------------------------------------------
//public; 设置标签的序号;
//返回值: void;
function Tabstrip_setTabCaption(oTab, sCaption){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getTab");
  if (oTab== null) return null;
  if (sCaption== null) sCaption= "";
  oTab.oLabelBodyCell.firstChild.rows[0].childNodes[1].innerText= sCaption;
}
//----------------------------------------------------------------------
//public; 选中用户页签;
//返回值: void;
function Tabstrip_getSelTab(){
  return this.oSelTab;
}
//----------------------------------------------------------------------
//public; 选中用户页签;
//返回值: void;
function Tabstrip_selTabK(oTab){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "selTab");
  if (oTab== null) return;
  if (this.oSelTab== oTab) return;
  if (!oTab.tIsVisible) return;
  
  this.setNormTabFacade(this.oSelTab);
  this.setSelTabFacade(oTab);
  
  if (this.oSelTab!= null){
    this.oSelTab.oUserPanel.style.left= -10000;
    this.oSelTab.oUserPanel.style.top= -10000;
    this.oSelTab.oLabelBodyCell.firstChild.style.color= "black";
    this.oSelTab.tIsSelected= false;
  }
  
  oTab.oUserPanel.style.left= this.oInnerPanel.currentStyle.paddingLeft;
  oTab.oUserPanel.style.top= this.oInnerPanel.currentStyle.paddingTop;
  oTab.oUserPanel.style.width= "100%";
  oTab.oUserPanel.style.height= "100%";
  oTab.oLabelBodyCell.firstChild.style.color= "black";
  oTab.tIsSelected= true;
  
  var voOldSelTab= this.oSelTab;
  this.oSelTab= oTab;

  //向外发送事件; OnTabSelected;
  if (PF.isExistMethodK(this.eventAnswer_OnTabSelected)){
    this.eventAnswer_OnTabSelected(this, this.oSelTab, voOldSelTab);
  }
  this.fireEvent(this.OnTabSelected, new Array(this, this.oSelTab, voOldSelTab));
  return true;
}
//----------------------------------------------------------------------
//public; 选中用户页签;
//返回值: void;
function Tabstrip_selTab(sId){
  var voTab= this.getTab(sId);
  this.selTabK(voTab);
}
//----------------------------------------------------------------------
//private;
//返回值: void;
function Tabstrip_setSelTabFacade(oTab){
  if (oTab== null) return;
  if (!oTab.tIsVisible) return;
  oTab.oLabelHeadCell.style.visibility= "visible";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Left_Img").style.display= "none";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Right_Img").style.display= "none";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Mid_TD").background= "";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Left_Div").style.borderWidth= "0 0 0 "+ this.oInnerPanel.currentStyle.borderLeftWidth;
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Right_Div").style.borderWidth= "0 "+ this.oInnerPanel.currentStyle.borderLeftWidth+ " 0 0";
  var voRect= PF.getAbsRect(oTab.oLabelBodyCell, this.oOuterPanel);
  if (voRect!= null){
    if (oTab.oLabelBodyCell.cellIndex== 0) voRect.iWidth-= 1; //修补,原因未查;leidh;20060627;
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Left_Line_TD").style.width= voRect.iLeft;
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Mid_Line_TD").style.width= Math.abs(voRect.iWidth);
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Right_Line_TD").style.width= Math.abs(this.oTopBorderDiv.offsetWidth- (voRect.iLeft+ voRect.iWidth));
  }else{
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Left_Line_TD").style.width= "50%";
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Mid_Line_TD").style.width= "0px";
    this.oTopBorderDiv.all("Tabstrip_Top_Border_Right_Line_TD").style.width= "50%";
  }
}
//----------------------------------------------------------------------
//private;
//返回值: void;
function Tabstrip_setNormTabFacade(oTab){
  if (oTab== null) return;
  oTab.oLabelHeadCell.style.visibility= "hidden";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Left_Img").style.display= "block";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Right_Img").style.display= "block";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Mid_TD").background= oTab.sMidBackGround;
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Left_Div").style.borderWidth= "0";
  oTab.oLabelBodyCell.all("Tabstrip_Tab_Label_Right_Div").style.borderWidth= "0";
}
//----------------------------------------------------------------------
//private; 调整风格,以保持整个控件的的风格正确性;
//返回值: void;
function Tabstrip_adjustStyle(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "adjustStyle");

  this.oOuterPanel.style.overflow= "hidden";
  this.oOuterPanel.style.borderWidth= "0";

  this.oInnerPanel.style.position= "relative";
  this.oInnerPanel.style.overflow= "hidden";
  this.oInnerPanel.style.borderStyle= "solid";
  this.oInnerPanel.style.display= "";
  this.oInnerPanel.style.visibility= "visible";

  if (isNaN(parseInt(this.oOuterPanel.currentStyle.width))){
    this.oOuterPanel.style.width= this.oDefRect.iWidth;
  }
  if (isNaN(parseInt(this.oOuterPanel.currentStyle.height))){
    this.oOuterPanel.style.height= this.oDefRect.iHeight;
  }

  this.oRect.iLeft= this.oOuterPanel.offsetLeft;
  this.oRect.iTop= this.oOuterPanel.offsetTop;
  this.oRect.iWidth= this.oOuterPanel.offsetWidth;
  this.oRect.iHeight= this.oOuterPanel.offsetHeight;
  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Tabstrip_setStyle(sStyle){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.oInnerPanel.style.cssText= PageX.getCssSheetText(this.oInnerPanel.className)+ "; "+ this.oInnerPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格中的指定项目;
//param: sName 的写法必须为 js 的写法,如: border-color,必须写成 borderColor;
//返回值: void;
function Tabstrip_setStyleItem(sName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyleItem");
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.oInnerPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//返回值: void;
function Tabstrip_setClass(sCssClassName){
  return;
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: orientation/ "";
function Tabstrip_getOrientation(){
  return this.oOuterPanel.orientation;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: tabindex/ -1;
function Tabstrip_getTabIndex(){
  return this.oOuterPanel.tabindex;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function Tabstrip_setTabIndex(iTabIndex){
  this.oOuterPanel.tabindex= iTabIndex;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//6.事件响应区 =function();
//----------------------------------------------------------------------
//private; 后退事件;
//返回值: void;
function Tabstrip_Tab_onclick(){
  var voTabstrip= this.oTab.oOwner;
  voTabstrip.selTabK(this.oTab);
}
//----------------------------------------------------------------------

function Tabstrip_release() {
	if (this.oInnerPanel != null) {
		this.oInnerPanel.oOwner = null;
	}
	if (this.oLabelsPanel != null) {
		this.oLabelsPanel.oOwner = null;
	}
	if (this.oTopBorderDiv != null) {
		this.oTopBorderDiv.oOwner = null;
	}
	if (this.oLabelsHeadRow != null) {
		this.oLabelsHeadRow.oOwner = null;
	}
	if (this.oLabelsBodyRow != null) {
		this.oLabelsBodyRow.oOwner = null;
	}
	var tabs = this.oTabMap.getAllItem();
	if (tabs != null) {
		for (var i = 0; i < tabs.length; i++) {
			 var tab = tabs[i];
			 tab.oLabelHeadCell.oTab = null;
			 tab.oLabelBodyCell.oTab = null;
			 tab.oUserPanel.oTab = null
			 tab.oLabelBodyCell.onclick = null;
			 tab.oLabelHeadCell = null;
			 tab.oLabelBodyCell = null;
			 tab.oUserPanel = null;
			 tab.oOwner = null;
			 tabs[i] = null;
		}
	}
	Base_release.call(this);
}

/* $Id: Grid_Hide_Lock.js,v 1.2 2008/04/29 12:57:53 liuxiaoyong Exp $ */
/*
Title: Grid_Hide_Lock.js
Description:
用于Grid的列锁定及隐藏
Company: 用友政务
Author: lijianwei
*/

var _oGrid_Hide_Lock = new Grid_Hide_Lock();

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Grid_Hide_Lock(){
  //1.超类 =function();

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.webpage.script.Grid_Hide_Lock";
  
  //3.变量声明区 =function();
	this.asFieldName = new Array();         //private; 所有字段名 
	this.oFieldMap= null;                          //private; 所有字段信息
	this.sLockedFieldName= "";                   //private; 锁定列字段名
	this.asHiddenFieldNames = new Array();   //private; 隐藏列字段
	this.sRowIdField= "";
	this.sGridClass= "";
	this.oRelBoxSet= null;
	this.bDisCard= null;
	
	this.oTabstrip= null;        //private;
	this.oHideTabPanel= null;                      //private;隐藏页签的Div
	this.oLockTabPanel= null;											 //private;锁定页签的Div
	this.oSortTabPanel= null;											 //private;排序页签的Div

  //4.事件声明区 =function();

	//5.方法声明区 = function();
	//private;
	this.init = Grid_Hide_Lock_init;
	this.makeTabstrip = Grid_Hide_Lock_makeTabstrip;
	this.makeHideTabContent = Grid_Hide_Lock_makeHideTabContent;
	this.makeLockTabContent = Grid_Hide_Lock_makeLockTabContent;
	this.makeSortTabContent= Grid_Hide_Lock_makeSortTabContent;
	this.ok = Grid_Hide_Lock_ok;
	this.cancel = Grid_Hide_Lock_cancel;
	this.selectField= Grid_Hide_Lock_selectField;
	this.ReselectField= Grid_Hide_Lock_ReselectField;
	this.setDisCardOrNot= Grid_Hide_Lock_setDisCardOrNot;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//private;初始化操作
//返回值：void
function Grid_Hide_Lock_init(){
	var voParams = window.dialogArguments;
	var vaoParam = voParams.param;
	this.asFieldName = vaoParam[1];
	this.oFieldMap = vaoParam[2];
	this.sLockedFieldName = vaoParam[3];
	this.asHiddenFieldNames = vaoParam[4];
	this.sRowIdField= vaoParam[5];
	this.sGridClass= vaoParam[6];
	this.oRelBoxSet= vaoParam[7];
	this.bDisCard= vaoParam[8];
	
	this.setDisCardOrNot();
	
	this.oTabstrip= PageX.getCtrlObj("Hide_Lock_Sort_Tabstrip");//Hide_Lock_Sort_Tabstrip.oOwner;//private;
  this.makeTabstrip();
}
//----------------------------------------------------------------------
//private;生成隐藏及锁定页签
//返回值：void
function Grid_Hide_Lock_makeTabstrip(){
  //var voTabstrip= new Tabstrip();
  //this.oTabstrip.setRect(new Rect(10, 10, 300, 300));
  //this.oTabstrip.iOrientation= voTabstrip.ORIENTATION_UP;
  
  //voTabstrip.make(document.body);
  //voTabstrip.init();
  //voTabstrip.resize();
  
  //voTabstrip.addTab("hide", "隐藏列设置");
  //voTabstrip.addTab("lock", "锁定列设置");
  //voTabstrip.addTab("sort", "排序列设置");
  
  var voTabHide= this.oTabstrip.getTab("hidetab");
  var voTabLock= this.oTabstrip.getTab("locktab");
  var voTabSort= this.oTabstrip.getTab("sorttab");
  
  this.oHideTabPanel = voTabHide.oUserPanel;
  this.oLockTabPanel = voTabLock.oUserPanel;
  this.oSortTabPanel = voTabSort.oUserPanel;
  
  this.makeHideTabContent();
  this.makeLockTabContent();
  this.makeSortTabContent();
}
//----------------------------------------------------------------------
//private;生成隐藏页签中的内容
//返回值：void
function Grid_Hide_Lock_makeHideTabContent(){
	var viRows;
	if(this.asFieldName.length%2 == 0){
		viRows = parseInt(this.asFieldName.length/2);
	}else{
		viRows = parseInt(this.asFieldName.length/2 + 1);
	}	
  
	var voBuf= new StringBuffer();
	voBuf.append("<table id=\"hideTabTable\" >\n");
	voBuf.append("<tbody>\n");
	  
  var viIndex= 0;
  var vsFieldName;
  var voField;
  var vsCaption;
  var vtIsChecked = false;
  
	for(var r=0; r<viRows; r++){
  	voBuf.append("<tr>\n");
    voBuf.append("<td width=\"10\">\n");
    voBuf.append("</td>\n");
  	for (var col= 0; col< 2; col++){
      if(viIndex<this.asFieldName.length){
      	if(col == 1){
      		vsFieldName= this.asFieldName[r+viRows];
      	}else{
    			vsFieldName= this.asFieldName[r];
    		}
    		voField= this.oFieldMap.get(vsFieldName);
    		vsCaption= voField.getAttribute("caption");
    		vtIsChecked = PF.parseBool(voField.currentStyle.display== "none");
      	voBuf.append("<td>\n");
      	voBuf.append("<input type='checkbox' id='Check_"+ vsFieldName+ "'");
       	if(vtIsChecked)
      		voBuf.append(" checked>\n");
      	else
      		voBuf.append(">\n");
      	voBuf.append("</td>\n");
      	voBuf.append("</td>\n");
      	voBuf.append("<td style=\"font-size:9pt\">\n");
      	voBuf.append(vsCaption);
      	voBuf.append("</td>\n");
      	voBuf.append("<td width=\"30\">\n");
      	voBuf.append("</td>\n");
      	viIndex++;
    	}
  	}
  	voBuf.append("</tr>\n");
	}
	voBuf.append("</tbody>\n");
	voBuf.append("</table>\n");

  this.oHideTabPanel.innerHTML= voBuf.toString();
}
//----------------------------------------------------------------------
//private;生成锁定页签中的内容
//返回值：void
function Grid_Hide_Lock_makeLockTabContent(){
	var viRows;
  if(this.asFieldName.length%2 == 0){
		viRows = parseInt((this.asFieldName.length)/2 + 1);
	}else{
		viRows = parseInt((this.asFieldName.length)/2 + 2);
	}
	var voBuf= new StringBuffer();
	voBuf.append("<table id=\"hideTabTable\">\n");
	voBuf.append("<tbody>\n");
	  
  var viIndex= 0;
  var vsFieldName;
  var voField;
  var vsCaption;
  
	for(var r=0; r<viRows; r++){
  	if(r == viRows-1){
  		voBuf.append("<tr>\n");
    	voBuf.append("<td width=\"10\">\n");
    	voBuf.append("</td>\n");
      voBuf.append("<td>\n");
      voBuf.append("<input type='radio' name='hidden' id='Radio_None'");
      if(this.sLockedFieldName == null || this.sLockedFieldName == "" ){
      	voBuf.append("checked>\n");
    	}else{
    		voBuf.append(">\n");
    	}
    	voBuf.append("</td>\n");
      voBuf.append("<td style=\"font-size:9pt\">\n");
      voBuf.append("不锁定列");
      voBuf.append("</td>\n");
      voBuf.append("<td width=\"30\">\n");
      voBuf.append("</td>\n");
      break;
  	}
  	voBuf.append("<tr>\n");
    voBuf.append("<td width=\"10\">\n");
    voBuf.append("</td>\n");
  	for (var col= 0; col< 2; col++){
      if(viIndex<this.asFieldName.length){
      	if(col == 1){
      		vsFieldName= this.asFieldName[r+viRows-1];
      	}else{
    			vsFieldName= this.asFieldName[r];
    		}
    		voField= this.oFieldMap.get(vsFieldName);
    		vsCaption= voField.getAttribute("caption");
  			var vtIsChecked = false;
    		if(vsFieldName == this.sLockedFieldName) vtIsChecked = true;
      	voBuf.append("<td>\n");
      	voBuf.append("<input type='radio' name='hidden' id='Radio_"+ vsFieldName + "'");
      	if(vtIsChecked)
      		voBuf.append(" checked>\n");
      	else
      		voBuf.append(">\n");
      	voBuf.append("</td>\n");
      	voBuf.append("<td style=\"font-size:9pt\">\n");
      	voBuf.append(vsCaption);
      	voBuf.append("</td>\n");
      	voBuf.append("<td width=\"30\">\n");
      	voBuf.append("</td>\n");
      	viIndex++;
    	}
  	}
  	voBuf.append("</tr>\n");
	}
	voBuf.append("</tbody>\n");
	voBuf.append("</table>\n");

  this.oLockTabPanel.innerHTML= voBuf.toString();
}
//----------------------------------------------------------------------
//private;生成锁定页签中的内容
//返回值：void
function Grid_Hide_Lock_makeSortTabContent(){
  var voOption= null;
  var voField= null;
  var vsField= "";
  var vsCaption= "";
  for (var i= 0; i< this.asFieldName.length; i++){
    vsField= this.asFieldName[i];
 		voField= this.oFieldMap.get(vsField);
 		vsCaption= voField.getAttribute("caption");

    voOption= document.createElement("option");
    voOption.value= vsField;
    voOption.innerText= vsCaption;
    FromFieldSelect.appendChild(voOption);
  }

  if (this.sGridClass== "gp.page.DataGrid"
      && !PF.isEmpty(this.sRowIdField) ){
    var voTab= this.oTabstrip.getTab("sorttab");
    this.oTabstrip.setTabVisible(voTab, false);
  }
  return;
}
//----------------------------------------------------------------------
//private;生成锁定页签中的内容
//返回值：void
function Grid_Hide_Lock_selectField(){
  var viIndex= FromFieldSelect.selectedIndex;
  if (viIndex< 0) return;
  var voOption= FromFieldSelect.options[viIndex];
  ToFieldSelect.appendChild(voOption);
  return;
}
//----------------------------------------------------------------------
//private;生成锁定页签中的内容
//返回值：void
function Grid_Hide_Lock_ReselectField(){
  var viIndex= ToFieldSelect.selectedIndex;
  if (viIndex< 0) return;
  var voOption= ToFieldSelect.options[viIndex];
  FromFieldSelect.appendChild(voOption);
  return;
}
//----------------------------------------------------------------------
//private;
//返回值:void
function Grid_Hide_Lock_ok(){
	var vaoReturn = new Array();
	var vasHiddenFieldNames = new Array();
	var vsLockedFieldName;
	var vsFieldName;
	 
	for(var i=0; i<this.asFieldName.length; i++){
		vsFieldName = this.asFieldName[i];
		if(document.getElementById("Check_" + vsFieldName).checked){
			vasHiddenFieldNames[vasHiddenFieldNames.length] = vsFieldName;
		}
		if(document.getElementById("Radio_" + vsFieldName).checked){
			vsLockedFieldName = vsFieldName;	
		}			
	}
	
	var va2xsSort= new Array();
	var vasField= new Array();
	for (var i= 0; i< ToFieldSelect.options.length; i++){
	  vasField[i]= ToFieldSelect.options[i].value;
	}
	va2xsSort[0]= vasField;
	va2xsSort[1]= SortDirection.value;
	
	//chupp;20061017
	var vbDisCard= false;
	if(document.getElementById("yes").checked)
	  vbDisCard= true;
	else if (document.getElementById("no").checked)
	  vbDisCard= false;
	else
		vbDisCard= null;    
	
	vaoReturn[0] = vasHiddenFieldNames;
	vaoReturn[1] = vsLockedFieldName;
	vaoReturn[2] = va2xsSort;
	vaoReturn[3]=  vbDisCard;
	window.returnValue = vaoReturn;
	window.close();
}
//----------------------------------------------------------------------
//private;
//返回值:void
function Grid_Hide_Lock_cancel(){
	window.close();	
}
//----------------------------------------------------------------------
//private;
//返回值:void;
function Grid_Hide_Lock_setDisCardOrNot(){
	var voEle= document.getElementById("DisCardOrNot");
	if(this.oRelBoxSet== null){
		voEle.style.display="none";
	}
  else {
    voEle.style.display="";
    if(!PF.isEmpty(this.bDisCard)){
    	if(this.bDisCard== true) { document.getElementById("yes").checked= true; }
      else {              
      	document.getElementById("no").checked= true; 
      }	  
    }
  }	
}	
//----------------------------------------------------------------------
		

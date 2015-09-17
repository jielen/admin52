/* $Id: ComboBox.js,v 1.4.2.1 2010/09/15 01:58:49 liuxiaoyong Exp $ */
/*
Title: gp.page.ComboBox
Description: 文本编辑框类;用于普通字符串的编辑;
Company: 用友政务
Date:2004/08/22
Author: zhangcheng, leidh
*/

//----------------------------------------------------------------------
function ComboBox(sid){
  TextBox.call(this,sid);

  this.CLASSNAME= "gp.page.ComboBox";
  this.SELECT_BUTTON_IMG2D= PageX.sRootPath+ "/gp/image/ico/downbutton_16x17_2D.gif";
  this.SELECT_BUTTON_IMG3D= PageX.sRootPath+ "/gp/image/ico/downbutton_16x17_3D.gif";

  this.SELECT_NULL_INDEX= -100;

  this.sName= this.CLASSNAME;  //对象名称.

  this.oSelectDiv= null;  //private; 用于包裹 this.oSelect 的层;
  this.oSelect= null;     //private; 选项框;
  this.oSelectButton= null;    //private; 下拉按钮图像;

  this.sValueSetCode= "";      //private; 值集;
  this.sOptionText= "";        //选项内容文本;
  this.sValCode= null;           //private;
  this.sValName= "";           //private;

  this.iInputAdjustWidth= 20;  //private;

  //public;
  this.getOptions = ComboBox_getOptions;
  this.getValue= ComboBox_getValue;
  this.init= ComboBox_init;
  this.setAllowInput= ComboBox_setAllowInput;
  this.setFlatButton= ComboBox_setFlatButton;
  this.setOptions = ComboBox_setOptions;
  this.setReadOnly= ComboBox_setReadOnly;
  this.setValue= ComboBox_setValue;
  this.getText= ComboBox_getText;
  this.setText= ComboBox_setText;
  //以上已完成文档.
  
  this.getSelectedIndex= ComboBox_getSelectedIndex;
  this.setSelectedIndex= ComboBox_setSelectedIndex;
  this.getSelectElement= ComboBox_getSelectElement;
  this.clear= ComboBox_clear;

  //private;
  this.initSelectedValue= ComboBox_initSelectedValue;
  this.displaySelect = ComboBox_displaySelect;
  this.hideSelect = ComboBox_hideSelect;
  
  this.release = ComboBox_release;
  this.make = ComboBox_make;

  return true;
}

function ComboBox_make(){
	TextBox_make.call(this);
	var row = this.oOuterPanel.rows[0];
  this.oSelectDiv= row.cells[2];
  this.oSelect= this.oSelectDiv.firstChild;
  this.oSelectButton= row.cells[3].firstChild;
  this.oSelectButton.oOwner= this;
  this.oSelectDiv.oOwner= this;
  this.oSelect.oOwner= this;
  
  this.oSelect.onchange= ComboBox_oSelect_onchange;
  this.oSelect.onkeydown = ComboBox_oSelect_onkeydown;
  this.oSelect.onblur= ComboBox_oSelect_onblur;
  this.oInputBox.onfocus=ComboBox_oInput_onfocus;
  this.oSelectButton.onmouseover= ComboBox_oSelectButton_onmouseover;
  this.oFocusButton.onfocus= ComboBox_oFocusButton_onfocus;
}
//----------------------------------------------------------------------
//public; 初始化.
//参数:boolean类型,是否是最终派生类,optional
//返回值:成功: true, 失败: false;
function ComboBox_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;

  if (tIsFinalClass){
    this.setInitMark();
 	}

  this.setAllowInput(false);
  this.initSelectedValue();
  return true;
}
//----------------------------------------------------------------------
//private
//return: void;
function ComboBox_initSelectedValue(){
  if (!PF.parseBool(this.oOuterPanel.isexistselected)){
    this.oSelect.selectedIndex= -1;
    return;
  }
  var viIndex= this.getSelectedIndex();
  this.setSelectedIndex(-1);
  if (viIndex>= 0) this.setSelectedIndex(viIndex);
}
//----------------------------------------------------------------------
//public; 设置 option. ax2sOption[x][0]= value; ax2sOption[x][1]= text;
//返回值: void;
function ComboBox_setOptions(ax2sOption){
  if (this.tHasInit== false) return;
  if (ax2sOption== null) return;
  this.oSelect.innerHTML= "";
	var voOption= null;
  for (var i=0,j=ax2sOption.length; i<j; i++){
    voOption= document.createElement("option");
    voOption.value= ax2sOption[i][0];
    voOption.innerText= ax2sOption[i][1];
    this.oSelect.appendChild(voOption);
  }
  if (this.oSelect.options.length> 0) this.setValue(ax2sOption[0][0]);
}
//----------------------------------------------------------------------
//public; 获取 option. ax2sOption[x][0]= value; ax2sOption[x][1]= text;
//返回值: options数组;
function ComboBox_getOptions(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getOptions");
	var vax2sOption= new Array();
  for (var i=0,j=this.oSelect.options.length; i<j; i++){
    vax2sOption[i]= new Array(this.oSelect.options[i].value, this.oSelect.options[i].innerText);
  }
  return vax2sOption;
}
//----------------------------------------------------------------------
//public; 设置只读属性.
//返回值: void;
function ComboBox_setReadOnly(tIsReadOnly){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setReadOnly");
	if (this.isForceReadOnly()) tIsReadOnly= true;
  TextBox_setReadOnly.call(this, tIsReadOnly);
  this.oSelect.disabled= TextBox_isReadOnly.call(this);
  this.oSelectButton.disabled= TextBox_isReadOnly.call(this);
  TextBox_setAllowInput.call(this, false);
  var vsColor= tIsReadOnly? this.DISABLED_COLOR: this.sNormColor;
  this.oInputBox.style.color= vsColor;
  return;
}
//----------------------------------------------------------------------
//public; 设置下拉按钮为扁平.
//返回值: void;
function ComboBox_setFlatButton(tIsFlat){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setFlatButton");
  if (this.tIsFlat) this.oSelectButton.src= this.SELECT_BUTTON_IMG2D;
  else this.oSelectButton.src= this.SELECT_BUTTON_IMG3D;
  return;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值:成功: 值, 失败: null;
function ComboBox_getText(){
  return this.sValName;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值:void;
function ComboBox_setText(sText){
 	var vtIsFireOnChange= this.tIsFireOnChange;
 	this.tIsFireOnChange= false;
  this.sValName= sText;
  if (typeof(this.sValName)== "undefined") this.sValName= "";
  this.oInputBox.value= this.sValName;
 	this.tIsFireOnChange= vtIsFireOnChange;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值:成功: 值, 失败: null;
function ComboBox_getValue(){
  return this.sValCode;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值: void;
function ComboBox_setValue(sValue){
  if (this.tHasInit== false) return;
  if (this.getValue()== sValue) return;
  this.oSelect.value= sValue;
  if (this.oSelect.selectedIndex>= 0){
    var voOption= this.oSelect.options(this.oSelect.selectedIndex);
    this.sValCode= this.oSelect.value;
    this.sValName= voOption.innerText;
  }else{
    this.oSelect.selectedIndex= this.SELECT_NULL_INDEX;
    this.sValCode= "";
    this.sValName= "";
  }
  if (typeof(this.sValName)== "undefined") this.sValName= "";
  TextBox_setValue.call(this, this.sValName);
}
//----------------------------------------------------------------------
//public; 设置允许键盘录入属性.
//返回值:void;
function ComboBox_setAllowInput(tAllowInput){
  if (this.tHasInit== false) return;
  TextBox_setAllowInput.call(this, false);
  var vsColor= this.isReadOnly()? this.DISABLED_COLOR: this.sNormColor;
  this.oInputBox.style.color= vsColor;
  return;
}
//----------------------------------------------------------------------
//public;
//return: index;
function ComboBox_getSelectedIndex(){
  return this.oSelect.selectedIndex;
}
//----------------------------------------------------------------------
//public;
//return: void;
function ComboBox_setSelectedIndex(index){
  if (index< 0 || index>= this.oSelect.options.length){
    this.oSelect.selectedIndex= index;
    return;
  }
  var voOption= this.oSelect.options(index);
  this.setValue(voOption.value);
}
//----------------------------------------------------------------------
//public;
//return: select of html element;
function ComboBox_getSelectElement(){
  return this.oSelect;
}
//----------------------------------------------------------------------

//清空所有选项
function ComboBox_clear(){
	var options = this.oSelect.options;
	for (var i = 0; i < options.length; i++) {
		var Option = options[i];
		Option = null;
	}
}

//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private;处理下拉列表选择事件
//返回值:void
function ComboBox_oSelect_onchange(){
  var voCombo = this.oOwner;
  voCombo.setValue(voCombo.oSelect.value);
}

function ComboBox_displaySelect(){
  var width = this.oOuterPanel.currentStyle.width;
  this.oRect.iWidth = width;
  this.oOuterPanel.rows[0].cells[2].style.display = "block";
  this.oOuterPanel.rows[0].cells[2].style.width = width;
  this.oSelect.style.width = width;
  //debugger;
  this.oOuterPanel.rows[0].cells[0].style.display = "none";
  this.oOuterPanel.rows[0].cells[3].style.display = "none";
	try{
		this.oSelect.focus();
		var WshShell = new ActiveXObject("Wscript.Shell");
		try{
		   WshShell.SendKeys("%{DOWN}");
		}
		catch(e){
			WshShell.Quit;
		}
	}catch(e){
		//可能在不可见区域
	}
}

function ComboBox_oSelect_onkeydown(){
	voBox = this.oOwner;
	if (!voBox.isInGrid){
	  var viKey= event.keyCode;
	  if (viKey== 9) viKey= 13;
	  if (viKey== 13){          //enter;
			PageX.focusNextBox(voBox.sid);
	  }
	}
}

function ComboBox_hideSelect(){
  this.oOuterPanel.rows[0].cells[0].style.display = "block";
  this.oOuterPanel.rows[0].cells[2].style.display = "none";
  this.oOuterPanel.rows[0].cells[3].style.display = "block";
}

//private; 处理选择按钮点击事件
// 触发下拉列表.
//返回值: void
function ComboBox_oSelectButton_onmouseover(){
	this.oOwner.displaySelect();
}
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值:成功: true, 失败: false;
function ComboBox_oFocusButton_onfocus(){
	var voBox = this.oOwner;
  if (voBox.isVisible() && !voBox.isReadOnly()){
		this.oOwner.displaySelect();
		this.oOwner.fireOnFocus();
  }
}
function ComboBox_oInput_onfocus(){
	this.oOwner.setFocus();
}
//----------------------------------------------------------------------
//焦点处理事件组;
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值:成功: true, 失败: false;
function ComboBox_oSelect_onfocus(){
  var voBox = this.oOwner;
  voBox.fireOnFocus();
}
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值:成功: true, 失败: false;
function ComboBox_oSelect_onblur(){
  var voBox = this.oOwner;
  voBox.hideSelect();
}
//----------------------------------------------------------------------

function ComboBox_release() {
	if (this.oSelectButton != null) {
		this.oSelectButton.oOwner = null;
		this.oSelectButton.onmouseover = null;
		this.oSelectButton.onfocus = null;
		this.oSelectButton.onblur = null;
	}
	
	if (this.oSelectDiv != null) {
		this.oSelectDiv.oOwner = null;
	}
	
	if (this.oSelect != null) {
		this.oSelect.oOwner = null;
		this.oSelect.onchange = null;
		this.oSelect.onmouseout = null;
		this.oSelect.onmousedown = null;
		this.oSelect.onfocus = null;
		this.oSelect.onblur = null;
	}
	TextBox_release.call(this);
}

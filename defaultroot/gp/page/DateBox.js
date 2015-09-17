/* $Id: DateBox.js,v 1.2 2008/06/02 13:40:19 huangcb Exp $ */
/*
Title: gp.page.DateBox
Description:
日期编辑框类;用于日期的输入;
Company: 用友政务
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function DateBox(sid){
  //1.超类 =function();
  TextBox.call(this,sid);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.DateBox";

  this.DATE_TYPE_DATE= "date";
  this.DATE_TYPE_DATETIME= "datetime";

  this.PICK_TYPE_YEAR= "year";
  this.PICK_TYPE_MONTH= "month";
  this.PICK_TYPE_DAY= "day";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.

  this.oSelectButton= null;    //private; 选择按钮;

  //4.事件声明区 =function();
  //5.方法声明区 =function();
  //public
  this.init= DateBox_init;
  this.setValue= DateBox_setValue;
  this.setReadOnly= DateBox_setReadOnly;
  this.setDateImgVisible = DateBox_setDateImgVisible;
  this.getDateType= DateBox_getDateType;
  this.setDateType= DateBox_setDateType;
  //以上已写文档
  
  this.getPickType= DateBox_getPickType;
  this.setPickType= DateBox_setPickType;
  this.getDateItems= DateBox_getDateItems;
  this.disposePickType= DateBox_disposePickType;

  //private;
  this.make = DateBox_make;
  this.autoDateInput= DateBox_autoDateInput;
  this.formatDate= DateBox_formatDate;
  this.eventAnswer_OnChange= DateBox_eventAnswer_OnChange;
  this.eventAnswer_OnKeyDown= DateBox_eventAnswer_OnKeyDown;
  
  this.release = DateBox_release;
  return true;
}
function DateBox_make(){
	TextBox_make.call(this);
  this.oSelectButton= this.oOuterPanel.rows[0].cells[2].firstChild;
  this.oSelectButton.oOwner= this;
  this.oSelectButton.onmouseup= DateBox_oSelectButton_onmouseup;
  this.oSelectButton.onfocus= DateBox_oSelectButton_onfocus;
  this.oInputBox.onkeypress= DateBox_oInputBox_onkeypress;
}
//----------------------------------------------------------------------
//public; 初始化.
//参数:boolean类型,是否是最终派生类,optional
//返回值:成功: true, 失败: false;
function DateBox_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//private; 激活日期选择框,注意这个方法需要依靠两个外部文件,calendar.js和date.js
//参数:_oInpubBox为输入框控件,选择完日期后,把日期值输入这个控件
//返回值:void
function DateBox_autoDateInput(){
  var vsDialogStyle= "";
  if (this.getDateType()== this.DATE_TYPE_DATE){
    vsDialogStyle= "dialogWidth=200px;dialogHeight=220px;status=0;help=0;maximize=0;minimize=0;";
  }else{
    vsDialogStyle= "dialogWidth=200px;dialogHeight=240px;status=0;help=0;maximize=0;minimize=0;";
  }
  var vasArg= new Array(this.oInputBox.value, this.getDateType());
  var vsNewDate= window.showModalDialog(PageX.sRootPath + "/script/date.htm", vasArg, vsDialogStyle);
  if (vsNewDate!= null) this.setValue(vsNewDate);

  return;
}
//----------------------------------------------------------------------
//private; 格式化日期统一为 xxxx-xx-xx格式。
//返回值:void
function DateBox_formatDate(value){
  var vsDate= value.replace(/\/|\./gi,"-");//转换分割符/为-
  vsDate= PF.ltrim(vsDate);
  var viPos= vsDate.indexOf(" ");
  if (viPos>= 0){
    vsDate= vsDate.substr(0, viPos);
  }
  if (vsDate.length> 10) vsDate= vsDate.substr(0, 10);
  return vsDate;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function DateBox_setValue(sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  if(sValue== null) sValue= "";
  if(PF.isValidDate(sValue)== false){
    alert("日期格式不正确!");
    return;
  }

  TextBox_setValue.call(this, this.disposePickType(sValue));
  return;
}
//----------------------------------------------------------------------
//public; 
//返回值: value;
function DateBox_disposePickType(sValue){
  vsValue= sValue;
  if (this.getDateType()== this.DATE_TYPE_DATE){
    vsValue= this.formatDate(vsValue);
  }else{
  }
  var vasItem= this.getDateItems(vsValue);
  if (vasItem== null) return vsValue;
  if (this.getDateType()== this.DATE_TYPE_DATE){
    if (this.getPickType()== this.PICK_TYPE_YEAR){
      vsValue= vasItem[0];
    }else if(this.getPickType()== this.PICK_TYPE_MONTH){
      vsValue= vasItem[0]+ "-"+ vasItem[1];
    }else{
      vsValue= vasItem[0]+ "-"+ vasItem[1] + "-"+ vasItem[2];
    }
  }
  return vsValue;
}
//----------------------------------------------------------------------
//public; 设置只读属性.
//返回值: void;
function DateBox_setReadOnly(tIsReadOnly){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
	if (this.isForceReadOnly()) tIsReadOnly= true;
  TextBox_setReadOnly.call(this, tIsReadOnly);
  this.oSelectButton.disabled= TextBox_isReadOnly.call(this);
  return;
}
//----------------------------------------------------------------------
//public; 设置日期IMG可见否.
//返回值: void;
function DateBox_setDateImgVisible(tIsVisible){
  if (this.tHasInit== false) return;
  this.oSelectButton.style.display = (tIsVisible)? "":"none";
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: date type/ "";
function DateBox_getDateType(){
  return this.oOuterPanel.datetype;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function DateBox_setDateType(sDateType){
  this.oOuterPanel.datetype= sDateType;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: pick type/ "";
function DateBox_getPickType(){
  return this.oOuterPanel.picktype
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function DateBox_setPickType(value){
  this.oOuterPanel.picktype= value;
}
//----------------------------------------------------------------------
//public; 
//return: date item array(): 
//        [0]= year, [1]= month, [2]= day, [3]= hour, [4]= minute;
function DateBox_getDateItems(sValue){
  var vsValue= sValue;
  if (vsValue== null || vsValue== "") return null;
  vsValue= PF.trim(vsValue);
  if (vsValue== null || vsValue== "") return null;
  var vasBlock= vsValue.split(" ");
  var vasItem= new Array("0", "0", "0", "0", "0");
  if (vasBlock.length>= 1){
    var vasDayPart= vasBlock[0].split("-");
    if (vasDayPart.length>= 1) vasItem[0]= vasDayPart[0];
    if (vasDayPart.length>= 2) vasItem[1]= vasDayPart[1];
    if (vasDayPart.length>= 3) vasItem[2]= vasDayPart[2];
  }
  if (vasBlock.length>= 2){
    var vasHourPart= vasBlock[1].split(":");
    if (vasHourPart.length>= 1) vasItem[3]= vasHourPart[0];
    if (vasHourPart.length>= 2) vasItem[4]= vasHourPart[1];
  }
  return vasItem;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; 表格滚动处理.
//点击 激活日期
//返回值:void;
function DateBox_oSelectButton_onmouseup(){
  if (event.shiftKey || event.altKey || event.ctrlKey) return;
  if (event.button== 0) return;
  var voBox= this.oOwner;
  if (voBox.isReadOnly()) return;
  voBox.autoDateInput();
}
//----------------------------------------------------------------------
//private; 处理键盘输入时间,只有数字,"-"等几个键盘输入为有效。
function DateBox_oInputBox_onkeypress(){
  //判断是否允许输入浮点数
  //首先判断event.KeyCode是否有效
  if (event.shiftKey || event.altKey || event.ctrlKey) event.keyCode= 0;
  var vikey= event.keyCode;
  if (!((vikey >= 48) && (vikey <= 57) || (vikey==45) || (vikey==47))){
    event.keyCode = 0;
  }
}
//----------------------------------------------------------------------
//private; 上下光标键为打开日期采摘器;
function DateBox_eventAnswer_OnKeyDown(){
	TextBox_eventAnswer_OnKeyDown.call(this);
  if (event.shiftKey || event.altKey || event.ctrlKey) return;
  if (event.keyCode == 123){ //F12
    this.autoDateInput();
	}  	
}
//----------------------------------------------------------------------
//private; 响应超类 TextBox 的OnChange 事件;
function DateBox_eventAnswer_OnChange(){
  if(!PF.isValidDate(this.oInputBox.value)){
    alert("日期格式不正确!");
    if (this.getDateType()== this.DATE_TYPE_DATE) this.oInputBox.value= this.disposePickType(PF.today());
    else if (this.getDateType()== this.DATE_TYPE_DATETIME) this.oInputBox.value= this.disposePickType(PF.getMinute());
  }
}
//----------------------------------------------------------------------
//焦点处理事件组;
//----------------------------------------------------------------------
//private; 获得焦点.
//返回值:成功: true, 失败: false;
function DateBox_oSelectButton_onfocus(boxId){
  var voBox= this.oOwner;
  voBox.oFocusButton.focus();
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------

function DateBox_release() {
	if (this.oSelectButton != null) {
		this.oSelectButton.oOwner = null;
		this.oSelectButton.onmouseup = null;
		this.oSelectButton.onfocus = null;
		this.oSelectButton.onblur = null;
	}
	if (this.oInputBox != null) {
		this.oInputBox.oOwner = null;
		this.oInputBox.onkeypress = null;
	}
	TextBox_release.call(this);
}


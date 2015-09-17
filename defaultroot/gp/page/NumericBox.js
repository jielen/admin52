/*
Title: gp.page.NumericBox
Description:
数字输入框类;用于数字的编辑;
Company: 用友政务
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function NumericBox(sid){
  //1.超类 =function();
  TextBox.call(this,sid);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.NumericBox";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.

  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.init= NumericBox_init;
  this.make = NumericBox_make;
  this.getLength= NumericBox_getLength;
  this.getMaxValue= NumericBox_getMaxValue;
  this.getMinValue= NumericBox_getMinValue;
  this.getScale= NumericBox_getScale;
  this.getValue= NumericBox_getValue;
  this.isKilo= NumericBox_isKilo;
  this.setKilo= NumericBox_setKilo;
  this.setLength= NumericBox_setLength;
  this.setMaxValue= NumericBox_setMaxValue;
  this.setMinValue= NumericBox_setMinValue;
  this.setScale= NumericBox_setScale;
  this.setValue= NumericBox_setValue;
  //以上已完成文档
  this.isValidNumber= NumericBox_isValidNumber;
  this.eventAnswer_OnChange= NumericBox_eventAnswer_OnChange;
  this.release = NumericBox_release;
}

function NumericBox_make(){
  if (TextBox_make.call(this)== false) return false;
  this.oInputBox.onkeypress= NumericBox_oInputBox_onkeypress;
  this.oInputBox.onkeyup= NumericBox_oInputBox_onkeyup;
  this.oInputBox.value = PF.parseNumeric(this.oInputBox.value, this.getLength(), this.getScale())[1];//进行精度处理20090220
}
//----------------------------------------------------------------------
//public; 初始化.
//参数:boolean类型,是否是最终派生类,optional
//返回值:成功: true, 失败: false;
function NumericBox_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;

  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//private; 判断是否是有效数字
//参数:number类型,需要判断的参数
//返回值:成功: true, 失败: false
function NumericBox_isValidNumber(sValue){
  if (sValue== null || sValue.length== 0) sValue= "0";

  var vnValue= parseFloat(sValue);
  if (vnValue< this.getMinValue() || vnValue> this.getMaxValue()){
    alert("输入的数字必须符合以下要求:\r\n"+ this.getMinValue()+ "<= x <="+ this.getMaxValue());
    if (vnValue< this.getMinValue()) vnValue= this.getMinValue();
    if (vnValue> this.getMaxValue()) vnValue= this.getMaxValue();
    this.setValue(vnValue);
    if (PF.isVisible(this.oInputBox)){
      this.oInputBox.style.display= "none"
      this.oInputBox.style.display= ""
      this.oInputBox.focus();
    }
    return false;
  }
  var tempValue = PF.parseInt(sValue) + "";
  if(tempValue.length >= this.getLength() - this.getScale()){
	  alert("输入的数字长度应该小于" + (this.getLength() - this.getScale() - 1));
	  this.setValue("0");
	  if (PF.isVisible(this.oInputBox)){
      this.oInputBox.style.display= "none"
      this.oInputBox.style.display= ""
      this.oInputBox.focus();
    }
	  return false;
  }

  return true;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function NumericBox_setValue(sValue){
  if (this.isKilo()) sValue= PF.parseKilo(sValue);
  else sValue= PF.clearKilo(sValue);
  TextBox_setValue.call(this, sValue);
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值:成功: 值, 失败: null;
function NumericBox_getValue(){
  var vsValue= PF.clearKilo(TextBox_getValue.call(this));
  return vsValue;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: maxvalue/ -1;
function NumericBox_getMaxValue(){
  return PF.parseFloat(this.oOuterPanel.maxvalue);
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function NumericBox_setMaxValue(nMaxValue){
  this.oOuterPanel.maxvalue= nMaxValue;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: minvalue/ -1;
function NumericBox_getMinValue(){
  return PF.parseFloat(this.oOuterPanel.minvalue);
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function NumericBox_setMinValue(nMinValue){
  this.oOuterPanel.minvalue= nMinValue;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: length/ -1;
function NumericBox_getLength(){
  return PF.parseInt(this.oOuterPanel.length);
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function NumericBox_setLength(iLen){
  this.oOuterPanel.length= iLen;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: scale/ -1;
function NumericBox_getScale(){
  return PF.parseInt(this.oOuterPanel.scale);
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function NumericBox_setScale(iScale){
  this.oOuterPanel.scale= iScale;
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: kilo/ -1;
function NumericBox_isKilo(){
  return PF.parseBool(this.oOuterPanel.iskilo);
}
//----------------------------------------------------------------------
//返回值:void;//public; 设置值.
function NumericBox_setKilo(tKilo){
  this.oOuterPanel.iskilo= tKilo;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; 处理onchange事件
//返回值:成功: true, 失败: false;
function NumericBox_eventAnswer_OnChange(oSender, sValue, oEvent){
  if (this.isValidNumber(sValue)== false) return;

  var vsValue= PF.parseSBCNumber(sValue);
  vsValue= vsValue.replace(Const.RE_NOT_NUMERIC, "");
  vsValue= parseFloat(vsValue)+ "";
  vsValue= PF.parseNumeric(vsValue, this.getLength(), this.getScale())[1];
  //临时去掉千分位，因为获取数据时没有去掉千分位运算不正确 lijianwei;
  //服务器中 RowManagerData.java 中已做统一处理,此处恢复原有功能; leidh; 20050915;
  //change by liubo :增加格式化功能
  if (this.isKilo()) vsValue= PF.parseKilo(vsValue);
  this.oInputBox.value= vsValue;
  this.sChangeOldValue= this.oInputBox.value;
  return;
}
//----------------------------------------------------------------------
//private; 处理 onkeypress 事件.
//asc('-')=45; asc('.')=46; asc('/')=47; asc('0')=48; asc('9)=57;
//返回值: void;
function NumericBox_oInputBox_onkeypress(){
  var voEditBox= this.oOwner;
  var viKey= event.keyCode;
  if (viKey== 13
      || viKey== 37
      || viKey== 38
      || viKey== 39
      || viKey== 40) return;

  if(viKey==46){
    //如果精度为0
    if (voEditBox.getScale() == 0) viKey = 0;
    //检查‘.’是不是只出现一次
    else if (this.value.indexOf('.')>-1) viKey=0;
  }
  else if(viKey== 45) {}
  else if(viKey< 48 || viKey> 57) viKey= 0;

  event.keyCode = viKey;
  return;
}
//----------------------------------------------------------------------
//private; 处理 onkeyup 事件.
//asc('-')=45; asc('.')=46; asc('/')=47; asc('0')=48; asc('9)=57;
//返回值: void;
function NumericBox_oInputBox_onkeyup(){
  var voEditBox= this.oOwner;
  var viKey= event.keyCode;
  if (viKey!= 0){
    var vsValue= voEditBox.oInputBox.value;
    if (voEditBox.tIsKilo) vsValue= PF.parseKilo(vsValue);
    if (this.value!= vsValue) this.value= vsValue;
  }

  return;
}
//----------------------------------------------------------------------

function NumericBox_release() {
	var inputBox = this.oInputBox;
	if (inputBox != null) {
		inputBox.onkeypress = null;
		inputBox.onkeyup = null;
	}
	TextBox_release.call(this);
}


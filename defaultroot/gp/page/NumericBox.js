/*
Title: gp.page.NumericBox
Description:
�����������;�������ֵı༭;
Company: ��������
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function NumericBox(sid){
  //1.���� =function();
  TextBox.call(this,sid);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.NumericBox";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.

  //4.�¼������� =function();

  //5.���������� =function();
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
  //����������ĵ�
  this.isValidNumber= NumericBox_isValidNumber;
  this.eventAnswer_OnChange= NumericBox_eventAnswer_OnChange;
  this.release = NumericBox_release;
}

function NumericBox_make(){
  if (TextBox_make.call(this)== false) return false;
  this.oInputBox.onkeypress= NumericBox_oInputBox_onkeypress;
  this.oInputBox.onkeyup= NumericBox_oInputBox_onkeyup;
  this.oInputBox.value = PF.parseNumeric(this.oInputBox.value, this.getLength(), this.getScale())[1];//���о��ȴ���20090220
}
//----------------------------------------------------------------------
//public; ��ʼ��.
//����:boolean����,�Ƿ�������������,optional
//����ֵ:�ɹ�: true, ʧ��: false;
function NumericBox_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;

  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//private; �ж��Ƿ�����Ч����
//����:number����,��Ҫ�жϵĲ���
//����ֵ:�ɹ�: true, ʧ��: false
function NumericBox_isValidNumber(sValue){
  if (sValue== null || sValue.length== 0) sValue= "0";

  var vnValue= parseFloat(sValue);
  if (vnValue< this.getMinValue() || vnValue> this.getMaxValue()){
    alert("��������ֱ����������Ҫ��:\r\n"+ this.getMinValue()+ "<= x <="+ this.getMaxValue());
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
	  alert("��������ֳ���Ӧ��С��" + (this.getLength() - this.getScale() - 1));
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
//public; ����ֵ.
//����ֵ:void;
function NumericBox_setValue(sValue){
  if (this.isKilo()) sValue= PF.parseKilo(sValue);
  else sValue= PF.clearKilo(sValue);
  TextBox_setValue.call(this, sValue);
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ:�ɹ�: ֵ, ʧ��: null;
function NumericBox_getValue(){
  var vsValue= PF.clearKilo(TextBox_getValue.call(this));
  return vsValue;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: maxvalue/ -1;
function NumericBox_getMaxValue(){
  return PF.parseFloat(this.oOuterPanel.maxvalue);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function NumericBox_setMaxValue(nMaxValue){
  this.oOuterPanel.maxvalue= nMaxValue;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: minvalue/ -1;
function NumericBox_getMinValue(){
  return PF.parseFloat(this.oOuterPanel.minvalue);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function NumericBox_setMinValue(nMinValue){
  this.oOuterPanel.minvalue= nMinValue;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: length/ -1;
function NumericBox_getLength(){
  return PF.parseInt(this.oOuterPanel.length);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function NumericBox_setLength(iLen){
  this.oOuterPanel.length= iLen;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: scale/ -1;
function NumericBox_getScale(){
  return PF.parseInt(this.oOuterPanel.scale);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function NumericBox_setScale(iScale){
  this.oOuterPanel.scale= iScale;
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ: kilo/ -1;
function NumericBox_isKilo(){
  return PF.parseBool(this.oOuterPanel.iskilo);
}
//----------------------------------------------------------------------
//����ֵ:void;//public; ����ֵ.
function NumericBox_setKilo(tKilo){
  this.oOuterPanel.iskilo= tKilo;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private; ����onchange�¼�
//����ֵ:�ɹ�: true, ʧ��: false;
function NumericBox_eventAnswer_OnChange(oSender, sValue, oEvent){
  if (this.isValidNumber(sValue)== false) return;

  var vsValue= PF.parseSBCNumber(sValue);
  vsValue= vsValue.replace(Const.RE_NOT_NUMERIC, "");
  vsValue= parseFloat(vsValue)+ "";
  vsValue= PF.parseNumeric(vsValue, this.getLength(), this.getScale())[1];
  //��ʱȥ��ǧ��λ����Ϊ��ȡ����ʱû��ȥ��ǧ��λ���㲻��ȷ lijianwei;
  //�������� RowManagerData.java ������ͳһ����,�˴��ָ�ԭ�й���; leidh; 20050915;
  //change by liubo :���Ӹ�ʽ������
  if (this.isKilo()) vsValue= PF.parseKilo(vsValue);
  this.oInputBox.value= vsValue;
  this.sChangeOldValue= this.oInputBox.value;
  return;
}
//----------------------------------------------------------------------
//private; ���� onkeypress �¼�.
//asc('-')=45; asc('.')=46; asc('/')=47; asc('0')=48; asc('9)=57;
//����ֵ: void;
function NumericBox_oInputBox_onkeypress(){
  var voEditBox= this.oOwner;
  var viKey= event.keyCode;
  if (viKey== 13
      || viKey== 37
      || viKey== 38
      || viKey== 39
      || viKey== 40) return;

  if(viKey==46){
    //�������Ϊ0
    if (voEditBox.getScale() == 0) viKey = 0;
    //��顮.���ǲ���ֻ����һ��
    else if (this.value.indexOf('.')>-1) viKey=0;
  }
  else if(viKey== 45) {}
  else if(viKey< 48 || viKey> 57) viKey= 0;

  event.keyCode = viKey;
  return;
}
//----------------------------------------------------------------------
//private; ���� onkeyup �¼�.
//asc('-')=45; asc('.')=46; asc('/')=47; asc('0')=48; asc('9)=57;
//����ֵ: void;
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


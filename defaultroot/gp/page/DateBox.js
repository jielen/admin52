/* $Id: DateBox.js,v 1.2 2008/06/02 13:40:19 huangcb Exp $ */
/*
Title: gp.page.DateBox
Description:
���ڱ༭����;�������ڵ�����;
Company: ��������
Author: zhangcheng; leidh;
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function DateBox(sid){
  //1.���� =function();
  TextBox.call(this,sid);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.DateBox";

  this.DATE_TYPE_DATE= "date";
  this.DATE_TYPE_DATETIME= "datetime";

  this.PICK_TYPE_YEAR= "year";
  this.PICK_TYPE_MONTH= "month";
  this.PICK_TYPE_DAY= "day";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.

  this.oSelectButton= null;    //private; ѡ��ť;

  //4.�¼������� =function();
  //5.���������� =function();
  //public
  this.init= DateBox_init;
  this.setValue= DateBox_setValue;
  this.setReadOnly= DateBox_setReadOnly;
  this.setDateImgVisible = DateBox_setDateImgVisible;
  this.getDateType= DateBox_getDateType;
  this.setDateType= DateBox_setDateType;
  //������д�ĵ�
  
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
//public; ��ʼ��.
//����:boolean����,�Ƿ�������������,optional
//����ֵ:�ɹ�: true, ʧ��: false;
function DateBox_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//private; ��������ѡ���,ע�����������Ҫ���������ⲿ�ļ�,calendar.js��date.js
//����:_oInpubBoxΪ�����ؼ�,ѡ�������ں�,������ֵ��������ؼ�
//����ֵ:void
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
//private; ��ʽ������ͳһΪ xxxx-xx-xx��ʽ��
//����ֵ:void
function DateBox_formatDate(value){
  var vsDate= value.replace(/\/|\./gi,"-");//ת���ָ��/Ϊ-
  vsDate= PF.ltrim(vsDate);
  var viPos= vsDate.indexOf(" ");
  if (viPos>= 0){
    vsDate= vsDate.substr(0, viPos);
  }
  if (vsDate.length> 10) vsDate= vsDate.substr(0, 10);
  return vsDate;
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function DateBox_setValue(sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
  if(sValue== null) sValue= "";
  if(PF.isValidDate(sValue)== false){
    alert("���ڸ�ʽ����ȷ!");
    return;
  }

  TextBox_setValue.call(this, this.disposePickType(sValue));
  return;
}
//----------------------------------------------------------------------
//public; 
//����ֵ: value;
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
//public; ����ֻ������.
//����ֵ: void;
function DateBox_setReadOnly(tIsReadOnly){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
	if (this.isForceReadOnly()) tIsReadOnly= true;
  TextBox_setReadOnly.call(this, tIsReadOnly);
  this.oSelectButton.disabled= TextBox_isReadOnly.call(this);
  return;
}
//----------------------------------------------------------------------
//public; ��������IMG�ɼ���.
//����ֵ: void;
function DateBox_setDateImgVisible(tIsVisible){
  if (this.tHasInit== false) return;
  this.oSelectButton.style.display = (tIsVisible)? "":"none";
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: date type/ "";
function DateBox_getDateType(){
  return this.oOuterPanel.datetype;
}
//----------------------------------------------------------------------
//public; ����ֵ;
//return: void;
function DateBox_setDateType(sDateType){
  this.oOuterPanel.datetype= sDateType;
}
//----------------------------------------------------------------------
//public; ��ȡֵ;
//����ֵ: pick type/ "";
function DateBox_getPickType(){
  return this.oOuterPanel.picktype
}
//----------------------------------------------------------------------
//public; ����ֵ;
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
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private; ����������.
//��� ��������
//����ֵ:void;
function DateBox_oSelectButton_onmouseup(){
  if (event.shiftKey || event.altKey || event.ctrlKey) return;
  if (event.button== 0) return;
  var voBox= this.oOwner;
  if (voBox.isReadOnly()) return;
  voBox.autoDateInput();
}
//----------------------------------------------------------------------
//private; �����������ʱ��,ֻ������,"-"�ȼ�����������Ϊ��Ч��
function DateBox_oInputBox_onkeypress(){
  //�ж��Ƿ��������븡����
  //�����ж�event.KeyCode�Ƿ���Ч
  if (event.shiftKey || event.altKey || event.ctrlKey) event.keyCode= 0;
  var vikey= event.keyCode;
  if (!((vikey >= 48) && (vikey <= 57) || (vikey==45) || (vikey==47))){
    event.keyCode = 0;
  }
}
//----------------------------------------------------------------------
//private; ���¹���Ϊ�����ڲ�ժ��;
function DateBox_eventAnswer_OnKeyDown(){
	TextBox_eventAnswer_OnKeyDown.call(this);
  if (event.shiftKey || event.altKey || event.ctrlKey) return;
  if (event.keyCode == 123){ //F12
    this.autoDateInput();
	}  	
}
//----------------------------------------------------------------------
//private; ��Ӧ���� TextBox ��OnChange �¼�;
function DateBox_eventAnswer_OnChange(){
  if(!PF.isValidDate(this.oInputBox.value)){
    alert("���ڸ�ʽ����ȷ!");
    if (this.getDateType()== this.DATE_TYPE_DATE) this.oInputBox.value= this.disposePickType(PF.today());
    else if (this.getDateType()== this.DATE_TYPE_DATETIME) this.oInputBox.value= this.disposePickType(PF.getMinute());
  }
}
//----------------------------------------------------------------------
//���㴦���¼���;
//----------------------------------------------------------------------
//private; ��ý���.
//����ֵ:�ɹ�: true, ʧ��: false;
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


/* $Id: FileBox.js,v 1.5 2008/09/22 06:42:21 zhuyulong Exp $ */
/*
Title: gp.page.FileBox
Description: �ļ��༭����;�����ļ����ϴ�����;
Company: ��������
Date: 2004/08/19
Author: zhangcheng; leidh;
*/
// import PageX.sRootPath; // defined in ..\..\script\Community.js

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯��;
function FileBox(sid){
  //1.���� =function();
  TextBox.call(this,sid);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.FileBox";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.
  this.oOuterObj= null;        //�ⲿ����;

  this.oActionBtnPanel= null;
  this.oAttachButton= null; //private; ���Ӱ�ť;
  this.oOpenButton= null;   //private; �򿪰�ť;
  this.oDeleteButton= null; //private; ɾ����ť;

  this.sFileId= "";            //private ;��ӦfieldId;ָ�������˵��ļ���.
  this.sBlobField= "";         //private;

  this.tHasInit= false;    //�����Ƿ�ʼ���ı�־;

  //4.�¼������� =function();

  //5.���������� =function();
  //public;
  this.getFileId= FileBox_getFileId;
  this.init= FileBox_init;
  this.readFile= FileBox_readFile;
  this.setFileId= FileBox_setFileId;
  this.setReadOnly= FileBox_setReadOnly;
  this.setValue= FileBox_setValue;
  //����������ĵ�
  
  this.deleteFile= FileBox_deleteFile;
  this.isAttachBtnVisible= FileBox_isAttachBtnVisible;
  this.isDelBtnVisible= FileBox_isDelBtnVisible;
  this.isOpenBtnVisible= FileBox_isOpenBtnVisible;
  this.setAttachBtnVisible= FileBox_setAttachBtnVisible;
  this.setDelBtnVisible= FileBox_setDelBtnVisible;
  this.setOpenBtnVisible= FileBox_setOpenBtnVisible;
  this.isMultiAttach= FileBox_isMultiAttach;
  this.setMultiAttach= FileBox_setMultiAttach;
  this.getInterfaceClass= FileBox_getInterfaceClass;
  this.setInterfaceClass= FileBox_setInterfaceClass;
  this.getInterfaceParams= FileBox_getInterfaceParams;
  this.setInterfaceParams= FileBox_setInterfaceParams;


  //private;
  this.adjustStyle= FileBox_adjustStyle;
  this.setValueK= FileBox_setValueK;
  this.make = FileBox_make;
  
  this.release = FileBox_release;
  return true;
}
function FileBox_make(){
	TextBox_make.call(this);
  this.oActionBtnPanel= this.oOuterPanel.all("FileBoxActionButtonDiv");
  this.oAttachButton= this.oActionBtnPanel.all("AttachButton");
  this.oDeleteButton= this.oActionBtnPanel.all("DeleteButton");
  this.oOpenButton= this.oActionBtnPanel.all("OpenButton");
  this.oActionBtnPanel.oOwner= this;
  this.oAttachButton.oOwner= this;
  this.oOpenButton.oOwner= this;
  this.oDeleteButton.oOwner= this;
  this.oDeleteButton.onclick= FileBox_DeleteButton_onclick;
  this.oAttachButton.onclick= FileBox_AttachButton_onclick;
  this.oOpenButton.onclick= FileBox_OpenButton_onclick;
}

//----------------------------------------------------------------------
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
function FileBox_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;
  this.sBlobField= this.getFieldName()+ "_BLOBID";
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function FileBox_setValue(sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValue");
  this.setValueK(sValue, true);
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function FileBox_setValueK(sValue, tIsSetFileId){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValue");
  if (tIsSetFileId== null) tIsSetFileId= true;
  tIsSetFileId= PF.parseBool(tIsSetFileId);
  
  TextBox_setValue.call(this, sValue);
  this.oOpenButton.style.display= "inline";
  if (PF.isEmpty(sValue)){
    if(this.isAttachBtnVisible()) this.oAttachButton.style.display= "inline";
    this.oDeleteButton.style.display= "none";
    this.oOpenButton.disabled= true;
  }else{
    if (!this.isMultiAttach()){
      if(this.isDelBtnVisible()) this.oDeleteButton.style.display= "inline";
      this.oAttachButton.style.display= "none";
    }
    this.oOpenButton.disabled= false;
  }

  if (tIsSetFileId
      && this.isDataRela()
      && this.oOuterObj!= null){
    var vsFileId= DataTools.getValue(this.getTableName(), this.getOuterObjCurRowX(), this.sBlobField);
    this.setFileId(vsFileId);
  }
  return;
}
//----------------------------------------------------------------------
//public; ����ֵ.
//����ֵ:void;
function FileBox_setFileId(sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValue");
  this.sFileId= PF.trim(sValue);
  if (this.isDataRela()
      && this.oOuterObj!= null){
    if (DataTools.isValidRow(this.getTableName(), this.getOuterObjCurRowX())){
      PageX.setValue(this.oOuterObj, this.getOuterObjCurRowX(), this.sBlobField, this.sFileId);
    } 
  }
}
//----------------------------------------------------------------------
//public; ��ȡֵ.
//����ֵ:�ɹ�: ֵ, ʧ��: null;
function FileBox_getFileId(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "getValue");
  return this.sFileId;
}
//----------------------------------------------------------------------
//public; ����ֻ������.
//����ֵ: void;
function FileBox_setReadOnly(tIsReadOnly){
	if (this.isForceReadOnly()) tIsReadOnly= true;
  tIsReadOnly= PF.parseBool(tIsReadOnly);
  TextBox_setReadOnly.call(this, tIsReadOnly);
  this.oFocusButton.disabled= tIsReadOnly;
  this.oAttachButton.disabled= tIsReadOnly;
  this.oDeleteButton.disabled= tIsReadOnly;
}
//----------------------------------------------------------------------
//public; ���÷��;
//����ֵ: void;
function FileBox_readFile(){
  if (PF.isEmpty(this.sFileId)){
  	if (this.oOuterObj!= null){
  	  this.sFileId= DataTools.getValue(this.getTableName(), this.getOuterObjCurRowX(), this.sBlobField); 	
    }
  }
  if (PF.isEmpty(this.sFileId)){
    alert("��������û�з����ļ���" + this.getValue()+ "����");
    return;
	}
  var voWin = window.open(BASE_URL + "/fileDownload.action?fileid=" + this.getFileId(), "_blank",
											"menubar=no,scrollbars=no,status=no,toolbar=yes,"
											+ "resizable=yes,titlebar=yes,scrollbars=yes,"
											+ "height=" + (screen.availHeight - 30) + ",width="
											+ (screen.availWidth - 10) + ",top=0,left=0");
}
//----------------------------------------------------------------------
//private; ɾ����ť����.
//return: true/false;
function FileBox_deleteFile(){
  if (PF.isEmpty(this.getFileId())) return true;
  var fileId = this.getFileId();
  var names = new Array();
  var values = new Array();
  names[0] = "fileid";
  values[0] = fileId;
  var vsResponseText= Info.requestDataK("fileDelete", "all",names,values);
 
if (vsResponseText=="false") return false;
  this.setValue("", false);
  this.setFileId("");
  return true;
}
//----------------------------------------------------------------------
//private; �������,�Ա��������ؼ��ĵķ����ȷ��;
//����ֵ: void;
function FileBox_adjustStyle(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "adjustStyle");

  this.oOuterPanel.style.overflow= "hidden";
  this.oOuterPanel.style.borderWidth= "0";

  this.oInputBox.style.position= "absolute";

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
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function FileBox_isAttachBtnVisible(){
  return PF.parseBool(this.oOuterPanel.isattachbtnvisible);
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function FileBox_isDelBtnVisible(){
  return PF.parseBool(this.oOuterPanel.isdelbtnvisible);
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function FileBox_isOpenBtnVisible(){
  return PF.parseBool(this.oOuterPanel.isopenbtnvisible);
}
//----------------------------------------------------------------------
//public;
//return: void;
function FileBox_setAttachBtnVisible(value){
  this.oOuterPanel.isattachbtnvisible= value;
}
//----------------------------------------------------------------------
//public;
//return: void;
function FileBox_setDelBtnVisible(value){
  this.oOuterPanel.isdelbtnvisible= value;
}
//----------------------------------------------------------------------
//public;
//return: void;
function FileBox_setOpenBtnVisible(value){
  this.oOuterPanel.isopenbtnvisible= value;
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function FileBox_isMultiAttach(){
  return PF.parseBool(this.oOuterPanel.ismultiattach);
}
//----------------------------------------------------------------------
//public;
//return: void;
function FileBox_setMultiAttach(value){
  this.oOuterPanel.ismultiattach= value;
}
//----------------------------------------------------------------------
//public;
//return: interfaceclass;
function FileBox_getInterfaceClass(){
  return this.oOuterPanel.interfaceclass;
}
//----------------------------------------------------------------------
//public;
//return: void;
function FileBox_setInterfaceClass(value){
  this.oOuterPanel.interfaceclass= value;
}
//----------------------------------------------------------------------
//public;
//return: interfaceparams;
function FileBox_getInterfaceParams(){
  return this.oOuterPanel.interfaceparams;
}
//----------------------------------------------------------------------
//public;
//return: void;
function FileBox_setInterfaceParams(value){
  this.oOuterPanel.interfaceparams= value;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private; ���Ӱ�ť����.
//����ֵ:�ɹ�: true, ʧ��: false;
function FileBox_AttachButton_onclick(){
  var voBox= this.oOwner;
  var vavArg= new Array();
  vavArg[0]= window;
  vavArg[1]= voBox.getFileId();
  vavArg[2]= voBox.getInterfaceClass();
  vavArg[3]= voBox.getInterfaceParams();
  var vasRet= window.showModalDialog(PageX.sRootPath + "/gp/webpage/html/FileBox_SelectFile.jsp", vavArg, "dialogWidth:400px; dialogHeight:150px; center:yes; resizable:no; status: no; scroll:no; help: no");
  if (vasRet== null || vasRet.length < 2) return;
  var dir = vasRet[0].lastIndexOf("\\") + 1;
  var fileng = vasRet[0].length - dir;
  vasRet[0] = vasRet[0].substr(dir,fileng);
  voBox.setFileId(vasRet[1]);
  voBox.setValueK(vasRet[0], false);
}
//----------------------------------------------------------------------
//private; ���Ӱ�ť����.
//����ֵ:�ɹ�: true, ʧ��: false;
function FileBox_OpenButton_onclick(){
  var voBox= this.oOwner;
  voBox.readFile();
}
//----------------------------------------------------------------------
//private; ɾ����ť����.
//����ֵ:�ɹ�: void
function FileBox_DeleteButton_onclick(){
  if (!confirm("ȷ��Ҫɾ�����ļ���\r\nע�����ȷ���󣬼�ʹδ����Ҳ��ɾ�����ļ���")){
     return;
  }
  var voBox= this.oOwner;
  if (voBox.getFileId()!=null && voBox.getFileId().length == 0 ){
     alert("�Բ�����ļ�idΪ�գ��޷�ɾ����");
     return;
  }

  var vtOldDisabledOfDel= voBox.oDeleteButton.disabled;  
  voBox.oDeleteButton.disabled= true;
  var vtRet= voBox.deleteFile();
  voBox.oDeleteButton.disabled= vtOldDisabledOfDel;
  if (!vtRet){
    alert("�Բ���ɾ��ʧ�ܣ�");
    return;
  }
  return;
}
//----------------------------------------------------------------------

function FileBox_release() {
	if (this.oActionBtnPanel != null) {
		this.oActionBtnPanel.oOwner = null;
	}
	if (this.oAttachButton != null) {
		this.oAttachButton.oOwner = null;
		this.oAttachButton.onclick = null;
	}
	if (this.oOpenButton != null) {
		this.oOpenButton.oOwner = null;
		this.oOpenButton.onclick = null;
	}
	
	if (this.oDeleteButton != null) {
		this.oDeleteButton.oOwner = null;
		this.oDeleteButton.onclick = null;
	}
	TextBox_release.call(this);
}

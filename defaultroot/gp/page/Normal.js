/*$Id: Normal.js,v 1.1 2008/02/20 11:42:02 liuxiaoyong Exp $*/
/*
Title: gp.page.Normal
Description:
ͨ�ñ༭��;���ڱ༭��Ƭʽ��ҵ�����;
Company: ��������
Date:2004/08/25
Author:zhangcheng,lijw
History:
����		        �޸���		�޸���������
20040930    zhangcheng created

*/
function Normal(){
	//1.���� =function();
	Base.call(this);

  //2.���������� =function();
	this.CLASSNAME= "gp.page.Normal";

	this.DOMID_NORMAL_TABLE= "BodyTable";
	this.DOMID_NORMAL_COLGROUP= "BodyColGroup";
	this.DOMID_SUFFIX_NORMAL= "_NormalDiv";
	this.DOMID_SUFFIX_CAPTION= "_Caption";
	this.DOMID_SUFFIX_TEXT= "_Text";
	this.DOMID_SUFFIX_CAPTION_COL= "_CaptionCol";
	this.DOMID_SUFFIX_TEXT_COL= "_TextCol";

	this.CAPTION_SPACING_WIDTH=6; 														//��������߿�֮��Ŀ��
	this.CONTENT_MIN_WIDTH=100;																//��������������С���
	this.CONTENT_MAX_WIDTH=150;                               //�����������������

	//3.���������� =function();
	this.tHasInit= false; 												            //public;�����Ƿ�ʼ���ı�־;
	this.sName= this.CLASSNAME;  															//public;��������.
	this.sTableName= null;     																//public; �ṩ��ʾ���ݷ����ϢԪ�ı���;
	this.oEditBoxMap=null;																		//public;���ֶ���Ϊkey,Editbox����Ϊvalue
	this.asFields = new Array();                              //private;�����ֶ���
	this.asCaptions = new Array();                            //private;�����ֶα���
	this.oRect=null;      																		//public; ����Ĵ�С;

	this.sRowHeight=null;																			//private;Normal�и�
	this.sPosition=null;                                      //private;
  this.oTableMeta= null; 																		//private; TableMeta;
  this.oTableData= null;    																//private; XML ��ʽ;
  this.oRS= null;           																//private; recordset ��ʽ;

	this.oPageMetaNormalNode=null;														//private;����Normal��ʾ�ģ�XMLDOMNode
	this.oOuterPanel= null; 																	//private; �ⲿ���,������ Normal �Ļ���ƽ̨.
	this.oBodyTable= null;  																	//private; ��ͷ�� <table>.
	this.captionColWidth = new Array();                       //private; �����е������

	//4.�¼������� =function();
  this.OnInit= "OnInit";                            //����: oSender;
  this.OnEnterRow= "OnEnterRow";                    //����: oSender, iNewRow, iOldRow;
  this.OnOutRow= "OnOutRow";                        //����: oSender, iRow;
  this.OnBeforeInsertRow= "OnBeforeInsertRow";  		//������oSender, iRowIndex;
  this.OnAfterInsertRow= "OnAfterInsertRow";    		//������oSender, iRowIndex;
  this.OnBeforeDeleteRow= "OnBeforeDeleteRow";  		//����: oSender, iRowIndex;
  this.OnAfterDeleteRow= "OnAfterDeleteRow";    		//����: oSender, iRowIndex;
	this.OnBeforeUpdate= "OnBeforeUpdate";        		//����: oSender, iRowIndex, sFieldName, vsValue, vsOldValue
	this.OnAfterUpdate= "OnAfterUpdate";          		//����: oSender, iRowIndex, sFieldName, vsValue, vsOldValue
	this.OnResize="OnResize";

	//5.���������� =function();
	//public:
	this.init = Normal_init;
	this.addCtrlObj = Normal_addCtrlObj;
	this.deleteCtrlObj = Normal_deleteCtrlObj;
	this.clear = Normal_clear;
	this.clearAllBox = Normal_clearAllBox;
	this.deleteRow = Normal_deleteRow;
	this.resize = Normal_resize;
	this.setCaptionColWidth = Normal_setCaptionColWidth;
	this.getCaptionColWidth = Normal_getCaptionColWidth;
	this.setTextColWidth = Normal_setTextColWidth;
	this.getTextColWidth = Normal_getTextColWidth;
	this.getCtrlObj = Normal_getCtrlObj;
	this.setValue = Normal_setValue;
	this.getValue = Normal_getValue;
	this.setColVisible = Normal_setColVisible;
	this.setFieldVisible = Normal_setFieldVisible;
	this.setFieldCaption = Normal_setFieldCaption;
	this.setFieldColor = Normal_setFieldColor;
	this.setCaptionColor = Normal_setCaptionColor;
	this.setFieldReadOnly = Normal_setFieldReadOnly;
	this.isFieldReadOnly =Normal_isFieldReadOnly;
	this.isFieldVisible = Normal_isFieldVisible;
	this.isValidRow = Normal_isValidRow;
	this.make = Normal_make;
	this.getCurRowIndex = Normal_getCurRowIndex;
	this.setValueByRowField = Normal_setValueByRowField;
	this.isValidFieldName = Normal_isValidFieldName;
	this.getAllFields = Normal_getAllFields;
	this.getFieldNames = Normal_getFieldNames;
	this.getAllCaptions = Normal_getAllCaptions;
	this.textBoxIsVisible = Normal_textBoxIsVisible;
	this.getInputBoxPosition = Normal_getInputBoxPosition;
	this.getCaptionPosition = Normal_getCaptionPosition;
	this.getFieldCaption = Normal_getFieldCaption;
	this.getColCount = Normal_getColCount;
	this.getTableName = Normal_getTableName;
	this.getWidth = Normal_getWidth;
	this.getHeight = Normal_getHeight;
	this.getVisible = Normal_getVisible;
	this.calculateCaptionWidth = Normal_calculateCaptionWidth;
	//����������ĵ�;

	this.getEditBox= Normal_getEditBox;
	this.getValueByRowField= Normal_getValueByRowField;

	//private:
	this.eventAnswer_EditBox_OnChange = Normal_eventAnswer_EditBox_OnChange;
	this.caculateTextWidth = Normal_caculateTextWidth;
	this.makeEditBox = Normal_makeEditBox;
	this.initMetaInfo = Normal_initMetaInfo;
	this.loadData = Normal_loadData;
	this.setInitValue = Normal_setInitValue;
	this.getMaxColCount = Normal_getMaxColCount;
	this.eventAnswer_OnKeyDown = Normal_eventAnswer_OnKeyDown;
	this.shortcutKeyDispose = Normal_shortcutKeyDispose;
	this.getNextEditBox = Normal_getNextEditBox;
	this.getPreviousEditBox = Normal_getPreviousEditBox;
	this.setFirstEidtFocus = Normal_setFirstEidtFocus;
	
	this.release = Normal_release;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ��ʼ��.
//����:boolean����,�Ƿ�������������,optional
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_init(tIsFinalClass){
	if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
	Base_init.call(this,false);
	//����Ĭ��ֵ;
	var viWidth = parseInt(this.oOuterPanel.getAttribute("width"));
	var viHeight = parseInt(this.oOuterPanel.getAttribute("height"));
	if(isNaN(viWidth)) viWdith = 800;
	if(isNaN(viHeight)) viHeight = 400;
	if(this.oRect==null)this.oRect=new Rect(0,0,viWidth,viHeight);
	this.sRowHeight=20;//20px
	this.sPosition="relative";
	this.oOuterPanel.style.position=this.sPosition;
	this.oBodyTable=this.oOuterPanel.all(this.DOMID_NORMAL_TABLE);
	this.oBodyTable.oOwner=this;

	this.initMetaInfo();
  this.oBodyTable.onkeypress = Normal_oBodyTable_onkeypress;

  this.calculateCaptionWidth();

  var voRS= DataTools.getRecordset(this.getTableName());
  if (voRS.RecordCount<= 0){
    DataTools.insertRow(this.getTableName(), null, null, -1, true);
  }
  
  if (tIsFinalClass) {
  	if (this.tHasInit && this.tHasBodyTableInit){
    	if (PF.isExistMethodK(this.eventAnswer_OnInit)){
      	this.eventAnswer_OnInit(this);
      }
      this.fireEvent(this.OnInit, new Array(this));
    }
  }
  this.tHasInit= true;
  this.setInitValue();
  return true;
}
//----------------------------------------------------------------------
//private::��������ı��ַ���,ռ��Ļ����������.
//����:����,�ַ���,Ԥ������ַ���
//����ֵ:�ɹ�:Text��ռ�Ŀ��,��λpx ʧ�ܣ�null;
function Normal_caculateTextWidth(sText,tIsPK){
	var viResult = 0;
	if(PF.parseBool(tIsPK))
	 viResult = PageX.getTextSize(sText + "*","����",null,"bold").getWidth();
	else
		viResult = PageX.getTextSize(sText + "*").getWidth();
	return viResult;
}

//----------------------------------------------------------------------
//public; ���������Ĵ�С.
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_resize(){
	//alert("Normal_resize()");
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "resize");
  if (this.tIsResizing) return;
  this.tIsResizing= true;

	//����oRect����ȷ���ؼ��Ĵ�С
	this.oOuterPanel.style.width=this.oRect.iWidth;
	this.oOuterPanel.style.height=this.oRect.iHeight;
	this.oOuterPanel.style.left=this.oRect.iLeft;
	this.oOuterPanel.style.top=this.oRect.iTop;

	var viWidth = 100;
	var viTextWidth = parseInt(this.oBodyTable.clientWidth);
	for(var i=0,j=this.captionColWidth.length; i<j; i++){
		if(!this.captionColWidth[i]) continue;
		this.oOuterPanel.all("" + i + "_CaptionCol").style.width = this.captionColWidth[i];
		viTextWidth = viTextWidth - (PF.parseInt(this.captionColWidth[i]) + 10);
	}
	if (this.captionColWidth.length> 0) viTextWidth = viTextWidth/this.captionColWidth.length;
	if(viTextWidth > this.CONTENT_MAX_WIDTH){
		viWidth = this.CONTENT_MAX_WIDTH;
	}else{
		viWidth = viTextWidth;
	}
	var voEditBoxRect;
	var vaoEditBoxKey = this.oEditBoxMap.getAllKey();
	var voEditBox = null;
	for(var i=0,j=vaoEditBoxKey.length;i<j;i++){
		voEditBox = this.oEditBoxMap.get(vaoEditBoxKey[i]);
		var viSetWidth = parseInt(voEditBox.getContainer().getAttribute("editBoxWidth"));
		var viCalWidth = parseInt(viWidth)*viSetWidth;

		if (voEditBox.CLASSNAME=="gp.page.ImageBox"){
		  viCalWidth = voEditBox.getContainer().clientWidth-10;
		}else if(voEditBox.CLASSNAME=="gp.page.TextBox"){
		  viCalWidth = voEditBox.getContainer().clientWidth-10;
		}else if(voEditBox.CLASSNAME=="gp.page.TextAreaBox"){
		  viCalWidth = voEditBox.getContainer().clientWidth-10;
		}

		if(viCalWidth > (voEditBox.getContainer().clientWidth-10)){
			viCalWidth = voEditBox.getContainer().clientWidth-10;
		}

		/*
		if (voEditBox.CLASSNAME=="gp.page.ImageBox")
		  viCalWidth = voEditBox.getContainer().clientWidth-10;
		//*/

		var viSetHeight = parseInt(voEditBox.getContainer().getAttribute("editBoxHeight"));
		voEditBoxRect=new Rect(0,0,viCalWidth,parseInt(this.sRowHeight)*viSetHeight);
		voEditBox.setRect(voEditBoxRect);
	}
	//���ⷢ��OnResize�¼�
	if (PF.isExistMethodK(this.eventAnswer_OnResize)){
		this.eventAnswer_OnResize(this);
	}
	//���ⷢ���¼�;
	this.fireEvent(this.OnResize, new Array(this));
  this.tIsResizing= false;
	return true;
}

//----------------------------------------------------------------------
//public; ���ñ�ǩ���п������п���������Normal��make����.
//����������õ��п�С�ڱ��ⳤ�ȴ�С,��ȡ���ⳤ��.
//����iColIndex:number���ͣ�Ҫ������index
//����iWidth:number���ͣ�Ҫ�����п�
//����ֵ: void;
function Normal_setCaptionColWidth(iColIndex, iWidth){
	var voCol = this.oOuterPanel.all("" + icolIndex + "_CaptionCol");
	voCol.style.width = iWidth;
}

//----------------------------------------------------------------------
//public; ��ȡ��ǩ���п�;
//����iColIndex:number���ͣ�Ҫ��ȡ��index
//����ֵ:�ɹ�: ����ָ���еĿ��, ʧ��: ���� -1;
function Normal_getCaptionColWidth(iColIndex){
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "getCaptionColWidth");
	var voCol = this.oOuterPanel.all("" + icolIndex + "_CaptionCol");
	return voCol.style.width;
}

//----------------------------------------------------------------------
//public; �����������п�
//����ֵ: void;
function Normal_setTextColWidth(iColIndex,iWidth){
	var voCol = this.oOuterPanel.all("" + icolIndex + "_TextCol");
	voCol.style.width = iWidth;
}

//----------------------------------------------------------------------
//public; ��ȡ�������п�;
//����ֵ:�ɹ�: ����ָ���еĿ��, ʧ��: ���� -1;
function Normal_getTextColWidth(iColIndex){
	var voCol = this.oOuterPanel.all("" + icolIndex + "_TextCol");
	return voCol.style.width;
}

//----------------------------------------------------------------------
//public;��Normal�������һ���ؼ�����
//����sFieldName:String����,Ҫ��ӵ��ֶ���
//����oEditBox:TextBox����,Ҫ��ӵĿؼ�
//����ֵ:�ɹ�: ;ʧ��: ;
function Normal_addCtrlObj(sFieldName,oEditBox){
	if(this.oEditBoxMap==null)this.oEditBoxMap=new Map();
	this.oEditBoxMap.put(sFieldName,oEditBox);
}
//----------------------------------------------------------------------
//public; ɾ��Normal����һ���ؼ�
//����sFieldName:String����,Ҫɾ���ؼ����ֶ���
//����ֵ:�ɹ�: ;ʧ��: ;
function Normal_deleteCtrlObj(sFieldName){
	if(this.oEditBoxMap==null) return;
	this.oEditBoxMap.remove(sFieldName);
}

//----------------------------------------------------------------------
//public;�����ֶ����ƻ�ȡ�ؼ�����
//����ֵ:�ɹ�: ;ʧ��: ;
function Normal_getCtrlObj(sFieldName){
	//alert("Normal_getCtrlObj");
 	return	this.oEditBoxMap.get(sFieldName);
}
//----------------------------------------------------------------------
//public;�����ֶ����ƻ�ȡ�ؼ�����;����һ��ͨ�ýӿ�.
//return:EditBox / null;
function Normal_getEditBox(sField){
	return this.getCtrlObj(sField);
}
//----------------------------------------------------------------------
//public;�����ֶ����ƻ�ȡ�ؼ�����
//����ֵ:�ɹ�:�ֶα��� ;ʧ��: null;
function Normal_getFieldCaption(sFieldName){
	var vsCaption;
	for(var i=0,j=this.asFields.length; i<j; i++){
		if(this.asFields[i] == sFieldName){
			vsCaption = this.asCaptions[i];
			break;
		}
	}
	return vsCaption;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶε�ֵ.
//����sFieldName:String����,Ҫ���µ��ֶ���
//����sFieldValue:String����,Ҫ���µ��ֶ�ֵ
//����vtUnfire:boolean����,�ı����ݺ��Ƿ񴥷��¼���true���������¼�
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_setValue(sFieldName,sFieldValue,vtUnfire,tNotChangeEditBox){
	//alert("Normal_setValue");
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setValue");
	if(sFieldName==null || typeof(sFieldName) != "string" )Info.throws("��������ȷ!;", this.CLASSNAME, "setValue");
	var vtIsValid = this.isValidFieldName(sFieldName);
	if(!vtIsValid){
		var voEditBox=this.getCtrlObj(sFieldName);
		if(voEditBox==null) return false;
		voEditBox.setValue(sFieldValue);
		return;
	}

	this.oRS.MoveFirst();
	if(!this.oRS(sFieldName)) return false;
	if (PF.trim(this.oRS(sFieldName)+ "")== PF.trim(sFieldValue)) return true;

	voBox = this.getCtrlObj(sFieldName);
	if(!voBox) return;
	var vsOldValue=this.oRS.fields.item(sFieldName).value;
	var vsValue= (sFieldValue== null)? "": sFieldValue;
  this.abortEvent(false);
	if (PF.isExistMethodK(this.eventAnswer_OnBeforeUpdate)){
		this.eventAnswer_OnBeforeUpdate(this, 0, sFieldName, vsValue, vsOldValue);
	}
	if (this.isAbortEvent()) return false;
	this.fireEvent(this.OnBeforeUpdate, new Array(this, 0, sFieldName, vsValue, vsOldValue));
	if (this.isAbortEvent()) return false;

	var voEditBox=this.getCtrlObj(sFieldName);
	if(voEditBox==null) return false;
  var vtOld= voEditBox.tIsFireOnChange;
  if(vtUnfire)
  	voEditBox.tIsFireOnChange= false;
	this.oRS.Update(sFieldName, sFieldValue);
	if(!tNotChangeEditBox)
		voEditBox.setValue(sFieldValue);
  voEditBox.tIsFireOnChange= vtOld;
	if (PF.isExistMethodK(this.eventAnswer_OnAfterUpdate)){
		this.eventAnswer_OnAfterUpdate(this, 0, sFieldName, vsValue, vsOldValue);
	}
	this.fireEvent(this.OnAfterUpdate, new Array(this, 0, sFieldName, vsValue, vsOldValue));
	return true;
}
//----------------------------------------------------------------------
//public; ��ȡ��ǰ����ָ���ֶε�ֵ.
//����:����String,Ҫ��ȡֵ���ֶ�����
//����ֵ:�ɹ�: ��Ԫ���ֵ, ʧ��: null;
function Normal_getValue(sFieldName,isName){
	//alert("Normal_getValue");
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "getValue");
	var vtIsValid = this.isValidFieldName(sFieldName);
	var vsValue = "";
	if(!vtIsValid || isName){
		var voEditBox=this.getCtrlObj(sFieldName);
		if(voEditBox==null) return null;
		vsValue = voEditBox.getValue();
		if(isName){
			if(voEditBox.CLASSNAME == "gp.page.ComboBox")	{
				vsValue = voEditBox.getText();
			}
		}
		return vsValue;
	}
	vsValue = DataTools.getValue(this.sTableName,0,sFieldName);
	if(PF.isEmpty(vsValue)){
		var voEditBox=this.getCtrlObj(sFieldName);
		if(voEditBox==null) return null;
		vsValue = voEditBox.getValue();
		if(isName){
			if(voEditBox.CLASSNAME == "gp.page.ComboBox")	{
				vsValue = voEditBox.getText();
			}
		}
	}
	if(!vsValue) vsValue = "";
	return vsValue;
}
//----------------------------------------------------------------------
//public;
//����ֵ:value/null;
function Normal_getValueByRowField(iRowIndex, sFieldName, isName){
  if (iRowIndex== null) iRowIndex= 0;
	if(iRowIndex != 0) return null;
	return this.getValue(sFieldName, isName);
}
//----------------------------------------------------------------------
//public; ����ָ���ֶε����Ƿ�ɼ�.
//����ֵ: void;
function Normal_setColVisible(sFieldName, tIsVisible){
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setColVisible");
	var viColIndex=parseInt(this.oPageMetaNormalNode.selectSingleNode("//field[@name='"+sFieldName+"']").getAttribute("colindex"));
	this.oBodyTable.all(viColIndex+"_CaptionCol").style.display=(tIsVisible)?"":"none";
	this.oBodyTable.all(viColIndex+"_TextCol").style.display=(tIsVisible)?"":"none";
	return;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ɼ�.
//����ֵ: void;
function Normal_setFieldVisible(sFieldName,tIsVisible){
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setColVisible");
	var voCaption = this.oBodyTable.all(sFieldName+"_Caption");
	if(voCaption)
		voCaption.style.display=(tIsVisible)?"":"none";
	var voText = this.oBodyTable.all(sFieldName+"_Text");
	if(voText){
		voText.style.display=(tIsVisible)?"":"none";
		var voEditBox = this.getCtrlObj(sFieldName);
		voEditBox.setVisible(tIsVisible);
		if (tIsVisible){
			voEditBox.resize();
		}
	}
	return;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ���ɫ.
//����ֵ: void;
function Normal_setFieldColor(sFieldName,color){
	var voText = this.oBodyTable.all(sFieldName+"_Text");
	if(voText)
		voText.style.color = color;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ���ɫ.
//����ֵ: void;
function Normal_setCaptionColor(sFieldName,color){
	var voCaption = this.oBodyTable.all(sFieldName+"_Caption");
	if(voCaption)
		voCaption.style.color = color;
}
//----------------------------------------------------------------------
//public; ����ָ���ֶ��Ƿ�ֻ��.
//����ֵ: void;
function Normal_setFieldReadOnly(sFieldName,tIsReadOnly){
	//alert("Normal_setFieldReadOnly");
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setColVisible");
	var voEditBox = this.getCtrlObj(sFieldName);
	if(voEditBox){
		voEditBox.setReadOnly(tIsReadOnly);
	}
}
//----------------------------------------------------------------------
//public; �ж�ָ���ֶ��Ƿ�ֻ��.
//����ֵ: true:��ֻ����false������ֻ��
function Normal_isFieldReadOnly(sFieldName){
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setColVisible");
	var voEditBox = this.getCtrlObj(sFieldName);
	if(voEditBox){
		return voEditBox.isReadOnly();
	}
}
//----------------------------------------------------------------------
//public; ����ָ���ֶα���.
//����ֵ: void;
function Normal_setFieldCaption(sFieldName,caption){
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setFieldCaption");
	var voFieldCaption = this.oBodyTable.all(sFieldName+"_Caption");
	if(voFieldCaption){
		voFieldCaption.innerHTML = caption;
	}
}
//----------------------------------------------------------------------
//public; �ж�ָ���ֶε����Ƿ�ɼ�.
//����ֵ:�ɼ�: true, ���ɼ�: false;
function Normal_isFieldVisible(sFieldName){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "isColVisible");
  var voText = this.oBodyTable.all(sFieldName+"_Text");
  return voText.style.display == "";
}
//----------------------------------------------------------------------
//public; ���� Normal �� HTML DOM ����
//����:����Object,ʢ��TextBox�ؼ�������.����Div,TD,SPAN�ȵ�
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_make(sId){
  //alert(this.CLASSNAME+ ".make();");
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;
  this.oOuterPanel.oOwner= this;

  if(this.oEditBoxMap == null)  this.oEditBoxMap = new Map();
  var voEditBoxIdSpan = this.oOuterPanel.firstChild;
  if(voEditBoxIdSpan){
  	var vsFieldName;
  	var vsFieldCaption;
  	var vsEditBoxId;
  	var voFields = voEditBoxIdSpan.childNodes;
  	for(var i=0,j=voFields.length; i<j; i++){
  		voField = voFields.item(i);
  		vsFieldName = voField.getAttribute("fieldname");
  		vsFieldCaption = voField.getAttribute("caption");
  		vsEditBoxId = voField.getAttribute("editboxid");;
  		this.asFields[i] = vsFieldName;
  		this.asCaptions[i] = vsFieldCaption;
  		this.oEditBoxMap.put(vsFieldName,this.oOuterPanel.all(vsEditBoxId).oOwner);
  	}
  }
  //*/
	this.makeEditBox();
	return true;
}
//----------------------------------------------------------------------
//private:: ����ÿһ��Normal�еı��,���� Normal�еĸ����ؼ�;
//����ֵ:��
function Normal_makeEditBox(){
	var vsEditBoxType= null;
  var voEditBox= null;
	var vsFieldName=null;
	var vsFieldValue=null;

  for (var i= 0,j = this.asFields.length; i< j; i++){
		vsFieldName= this.asFields[i];
		voEditBox = this.oEditBoxMap.get(vsFieldName);
		voEditBox.oOuterObj = this;
    voEditBox.iMaxWidth = voEditBox.oOuterPanel.parentElement.clientWidth;
    if (voEditBox.CLASSNAME== "gp.page.ImageBox"){
      voEditBox.setMaxWidth(voEditBox.iMaxWidth);
      voEditBox.setMaxHeight(voEditBox.iMaxWidth);
    }
    voEditBox.setPosition("relative");
    voEditBox.addListener(new Listener(voEditBox.OnChange,this.eventAnswer_EditBox_OnChange,this));
    voEditBox.addListener(new Listener(voEditBox.OnChange,field_Change,window));
  }
  return true;
}
//----------------------------------------------------------------------
//private:: ����Normal�еı���TD������caption�еĿ��;
//����ֵ:��
function Normal_calculateCaptionWidth(){
	//alert("Normal_calculateCaptionWidth");
	var vsId;
	var voCaptionTD = null;
	var viCaptionWidth = -1;
	var viCaptionColIndex = 0;

	var voTds=this.oBodyTable.getElementsByTagName("td");
	for(var i=0,j=voTds.length; i<j; i++){
		voCaptionTD = voTds.item(i);
		vsId = voCaptionTD.getAttribute("id");
		if(!(vsId.lastIndexOf("_CAPTION") != (vsId.length-8))) continue;
    viCaptionColIndex = parseInt(voCaptionTD.getAttribute("colindex"));
    viCaptionWidth = this.caculateTextWidth(voCaptionTD.innerText,true);
    if(viCaptionColIndex < this.getColCount()){
    	if(this.captionColWidth[viCaptionColIndex] == null ||
    			this.captionColWidth[viCaptionColIndex] < viCaptionWidth){
    		this.captionColWidth[viCaptionColIndex] = viCaptionWidth;
    	}
  	}
	}
}
//----------------------------------------------------------------------
//private:: ��ʼ������Ԫ��Ϣ
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_initMetaInfo(){
  //alert(this.CLASSNAME+ ".initMetaInfo();");
	this.sTableName=this.oOuterPanel.getAttribute("tablename");
	if(this.sTableName ==null)Info.throws("PageMetaԪ������Ϣ�����ڻ����д���!",this.CLASSNAME,"initMetaInfo");
  this.oTableMeta= DataTools.getTableMeta(this.sTableName);
  this.oTableData= DataTools.getTableData(this.sTableName);
	this.oRS=DataTools.getRecordset(this.sTableName);
  return true;
}

//----------------------------------------------------------------------
//private::���ó�ʼֵ.
//����ֵ:void
function Normal_setInitValue(){
	//alert("Normal_setInitValue()");
	for(var i=0,j=this.asFields.length;i<j;i++){
		var vsFieldName = this.asFields[i];
  	var vsXPathPattern = "//rowset/row[0]/"+vsFieldName;
  	voFieldValueNode = this.oTableData.selectSingleNode(vsXPathPattern);
  	//*
  	var voFieldMeta = this.oTableMeta.selectSingleNode("//fields/field[@name='" + vsFieldName + "']");
    var voDefault= null;
  	if(voFieldMeta){
  		voDefault = voFieldMeta.selectSingleNode("default");
  	}
  	//*/
		var vsFieldValue="";
		var voEditBox = this.getCtrlObj(vsFieldName);
		if(voFieldValueNode != null){
			vsFieldValue=voFieldValueNode.text;//���PageData���ݵ������ݡ�
		}else{
			vsFieldValue = DataTools.makeDefaultValue(voDefault);
		}
		if(vsFieldValue == null) vsFieldValue = "";
    var vtOld= voEditBox.tIsFireOnChange;
    voEditBox.tIsFireOnChange= false;
    voEditBox.setValue(vsFieldValue);
    voEditBox.tIsFireOnChange= vtOld;

	}
}
//----------------------------------------------------------------------
//public; �����ǰ���������ݣ��������ݲ��������ݿ���б���.
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_clear(){
	if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
	this.clearAllBox();
	DataTools.clearTableData(this.sTableName);
	return true;
}
//----------------------------------------------------------------------
//public; �ж�ָ�����ֶ����Ƿ���Ч.
//����ֵ:��Ч: true, ����: false;
function Normal_isValidFieldName(sFieldName){
  //if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "isValidFieldName");
  if (sFieldName== null) return false;
  if (sFieldName.length== 0) return false;
	return DataTools.isValidField(this.sTableName,sFieldName);
	/*
  var vtContain = this.oEditBoxMap.isContain(sFieldName);
  if(vtContain == true) return true;
	return DataTools.isValidField(this.sTableName,sFieldName);
	*/
}
//----------------------------------------------------------------------
//private::ȡ��ҳ�������������
//����ֵ:
function Normal_getMaxColCount(){
	var viDesc = parseInt(this.oOuterPanel.getAttribute("colcount"));
	/*
	var voColNodeList=this.oPageMetaNormalNode.firstChild.childNodes;
	var voField;
	var viMax = viDesc;
	for(var i=0,j=voColNodeList.length; i<j; i++){
		voField = voColNodeList.item(i);
		var viTemp = parseInt(voField.getAttribute("colindex")) + 1;
		if(viMax <  viTemp)
			viMax = viTemp;
	}
	return viMax;
	*/
	return viDesc;
}
//----------------------------------------------------------------------
//private::������Ӧ
//����ֵ:void
function Normal_shortcutKeyDispose(oSender,oEvent){
	//alert("Normal_shortcutKeyDispose");
  var viKey= event.keyCode;
  if(viKey == 9)
  	viKey= 13;
  //if(viKey != 13) return;
  if(viKey== 116 || viKey== 91 || viKey== 17 || viKey== 86 || viKey== 67 || viKey== 65) return;
  var voEventEle = oEvent.srcElement;
  if (voEventEle.tagName == "TEXTAREA")
    return;
  if(voEventEle.tagName != "INPUT" && voEventEle.tagName != "SELECT" &&
  	 voEventEle.tagName != "TEXTAREA"){
  	var voNextEditBox = this.getNextEditBox(this.asFields[this.asFields.length-1]);
  	if(voNextEditBox)
  		voNextEditBox.setFocus();
  	return;
  }
  if((viKey == 13) || ((viKey == 39) && (event.ctrlKey))){
  	if(voEventEle.getAttribute("id") != "Select"){
  		var voTD = voEventEle.parentElement.parentElement;
  	}else{
  		var voTD = voEventEle.parentElement.parentElement.parentElement;
  	}
  	var vsID = voTD.getAttribute("id");
  	var vsFieldName = vsID.substr(0,vsID.length-5);
  	var voNextEditBox = this.getNextEditBox(vsFieldName);
  	if(voNextEditBox)
  		voNextEditBox.setFocus();
  }else if((viKey == 37) && (event.ctrlKey)){
  	if(voEventEle.getAttribute("id") != "Select"){
  		var voTD = voEventEle.parentElement.parentElement;
  	}else{
  		var voTD = voEventEle.parentElement.parentElement.parentElement;
  	}
  	var vsID = voTD.getAttribute("id");
  	var vsFieldName = vsID.substr(0,vsID.length-5);
  	var voNextEditBox = this.getPreviousEditBox(vsFieldName);
  	if(voNextEditBox)
  		voNextEditBox.setFocus();
  }
}
//----------------------------------------------------------------------
//private::���ݵ�ǰ��ý����������ð��»س�����һ�������
//sFieldName:��ǰ�������ֶ���
//����ֵ:�ɹ������»س�����һ������򣻷���null
function Normal_getNextEditBox(sFieldName){
	var vsNextFieldName = null;
	var i=0;
	for(var j=this.asFields.length; i<j; i++){
		if(this.asFields[i] == sFieldName)
			break;
	}
	if(i != (this.asFields.length -1)){
		vsNextFieldName = this.asFields[i+1];
	}
	else{
		vsNextFieldName = this.asFields[0];
	}
	var voEditBox = this.getCtrlObj(vsNextFieldName);
	if(this.textBoxIsVisible(vsNextFieldName) && voEditBox.isReadOnly() == false){
		return voEditBox;
	}else{
		return this.getNextEditBox(vsNextFieldName);
	}
}
//----------------------------------------------------------------------
//private::���ݵ�ǰ��ý����������ð���Ctrl+�������ǰһ�������
//sFieldName:��ǰ�������ֶ���
//����ֵ:�ɹ�������Ctrl+�������ǰһ������򣻷���null
function Normal_getPreviousEditBox(sFieldName){
	var vsNextFieldName = null;
	var i=0;
	for(var j=this.asFields.length; i<j; i++){
		if(this.asFields[i] == sFieldName)
			break;
	}
	if(i != 0){
		vsNextFieldName = this.asFields[i-1];
	}
	else{
		vsNextFieldName = this.asFields[this.asFields.length-1];
	}
	var voEditBox = this.getCtrlObj(vsNextFieldName);
	if(this.textBoxIsVisible(vsNextFieldName) && voEditBox.isReadOnly() == false){
		return voEditBox;
	}else{
		return this.getPreviousEditBox(vsNextFieldName);
	}
}
//public:�����ֶ����ж�������Ƿ�ɼ�(�����ֶμ�ֵ��);
//����ֵ���ɼ�:true;����:false;
function Normal_textBoxIsVisible(sFieldName){
	var voEditBox = this.getCtrlObj(sFieldName);
	var vtIsVisible = voEditBox.isVisible();
	if(!vtIsVisible) return false;
	if(voEditBox){
		var voTD = voEditBox.getContainer();
		if(voTD.style.display == "none") return false;
		var voTable = voEditBox.getContainer().parentElement.parentElement.parentElement;
		if(voTable.getAttribute("id") == "InVisibleFieldTable"){
			if(voTable.style.display == "none") vtIsVisible = false;
			else vtIsVisible = true;
		}
	}
	return vtIsVisible;
}
//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();

//----------------------------------------------------------------------
//private:: BodyTable onkeypress ����;
//���ⷢ����굥���¼�; OnRowClick
//����ֵ:��;
function Normal_oBodyTable_onkeypress(){
}
//----------------------------------------------------------------------
//private::��һ��������ý���;
//����ֵ:��;
function Normal_setFirstEidtFocus(){
	if(event.keyCode != 13) return ;
	var voDivs=this.oOuterPanel.all("BodyTable").getElementsByTagName("Div");
	var vsCurDivId=event.srcElement.parentNode.id;
	var viIndex=0;
	for(var j=voDivs.length;viIndex<j;viIndex++){
		if(voDivs.item(viIndex).id==vsCurDivId)break;
	}
	if(viIndex <= voDivs.length-2){
		if(voDivs.item(viIndex+1).id==null || voDivs.item(viIndex+1).id=="")viIndex++;//���˵�combox box�ڲ���div�ؼ�
		if(viIndex <= voDivs.length-2)voDivs.item(viIndex+1).firstChild.focus();
	}

}
//----------------------------------------------------------------------
//public;�����ֶ�����ȡ������λ��
//����ֵ:�ɹ�:�����λ�� Rect;ʧ�ܣ�null;
function Normal_getInputBoxPosition(sFieldName){
	var voRect = null;
	var voEditBox = this.getCtrlObj(sFieldName);
	if(voEditBox){
		var voContainer = voEditBox.getContainer();
		voRect = new Rect();
  	voRect.iLeft= voContainer.offsetLeft;
  	voRect.iTop= voContainer.offsetTop;
  	voRect.iWidth= voContainer.offsetWidth;
  	voRect.iHeight= voContainer.offsetHeight;
	}
	return voRect;
}
//----------------------------------------------------------------------
//public;�����ֶ�����ȡ�����λ��
//����ֵ:�ɹ�:����λ�� Rect;ʧ�ܣ�null;
function Normal_getCaptionPosition(sFieldName){
	var voRect = null;
	var voEditBox = this.getCtrlObj(sFieldName);
	if(voEditBox){
		var voContainer = voEditBox.getContainer();
		voContainer = voContainer.previousSibling;
		voRect = new Rect();
  	voRect.iLeft= voContainer.offsetLeft;
  	voRect.iTop= voContainer.offsetTop;
  	voRect.iWidth= voContainer.offsetWidth;
  	voRect.iHeight= voContainer.offsetHeight;
	}
	return voRect;
}
//----------------------------------------------------------------------
//private::
//Normal�ļ��̴���
//����ֵ:void
function Normal_eventAnswer_OnKeyDown(oSender,oEvent){
	this.shortcutKeyDispose(oSender,oEvent);
}
//----------------------------------------------------------------------
//private:: ����EditBox ������OnChange�¼�.
//����:�ַ�������.
//����ֵ:void;
function Normal_eventAnswer_EditBox_OnChange(oSender, sValue, sOldValue){
  var voEditBox= oSender;
  var vsFieldName= voEditBox.getFieldName();
	this.setValue(vsFieldName, sValue,false,true);
}
//----------------------------------------------------------------------
//public;
//����ֵ��0
function Normal_getCurRowIndex(){
	return 0;
}
//----------------------------------------------------------------------
//public;
//����ֵ:��
function Normal_setValueByRowField(iRowIndex, sFieldName, sValue,vtUnfire){
	if(iRowIndex == 0){
		this.setValue(sFieldName,sValue,vtUnfire);
	}
}
//----------------------------------------------------------------------
//public;
//����ֵ:true:��Ч;false:��Ч
function Normal_isValidRow(iRowIndex){
	if(iRowIndex == 0){
		return true;
	}else
  	return false;
}
//----------------------------------------------------------------------
//public; ɾ��ָ������;
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_deleteRow(iRowIndex){
	//alert("Normal_deleteRow");
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "deleteRow");
  if (this.isValidRow(iRowIndex)== false){
    iRowIndex= this.getCurRowIndex();
    if (this.isValidRow(iRowIndex)== false) return false;
  }
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeDeleteRow)){
    this.eventAnswer_OnBeforeDeleteRow(this, iRowIndex);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeDeleteRow, new Array(this, iRowIndex));
  if (this.isAbortEvent()) return false;
	if(this.oRS.recordCount == 0) return false;
  this.oRS.MoveFirst();
  this.oRS.Delete();
  if (PF.isExistMethodK(this.eventAnswer_OnAfterDeleteRow)){
    this.eventAnswer_OnAfterDeleteRow(this, iRowIndex);
  }
  this.fireEvent(this.OnAfterDeleteRow, new Array(this, iRowIndex));
  return true;
}
//----------------------------------------------------------------------
//private; ���Ĭ��ֵ;
//����ֵ:�ɹ�: true, ʧ��: false;
function Normal_clearAllBox(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "clearAllBox");
  var vasFields= this.getAllFields();
  var voBox= null;
  for (var i= 0, len= vasFields.length; i< len; i++){
    voBox= this.getCtrlObj(vasFields[i]);
    var vtOld= voBox.tIsFireOnChange;
    voBox.tIsFireOnChange= false;
    voBox.clear();
    voBox.tIsFireOnChange= vtOld;
  }
  return true;
}

//----------------------------------------------------------------------
//public; ���������ֶ���
//����ֵ:�ֶ�������
function Normal_getAllFields(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "isValidFieldName");
	return this.asFields;
}
//----------------------------------------------------------------------
//public; ���������ֶ���
//����ֵ:�ֶ�������
function Normal_getFieldNames(){
	return this.getAllFields();
}
//----------------------------------------------------------------------
//public; ���������ֶα���
//����ֵ:�ֶ�������
function Normal_getAllCaptions(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "isValidFieldName");
	return this.asCaptions;
}
//----------------------------------------------------------------------
//public:����
//����ֵ:void
function Normal_loadData(){
  if (this.tHasInit== false) return;
  this.clearAllBox();
  this.setInitValue();
}
//----------------------------------------------------------------------
//public::��������
//����ֵ: number of colcount
function Normal_getColCount(){
	//if(this.tHasInit == false) return;
  return parseInt(this.oOuterPanel.getAttribute("colcount"));
}
//----------------------------------------------------------------------
//public::���ر���
//����ֵ: ����
function Normal_getTableName(){
  return this.oOuterPanel.getAttribute("tablename");
}
//----------------------------------------------------------------------
//public::���ؿ��
//����ֵ: ���
function Normal_getWidth(){
  return parseInt(this.oOuterPanel.getAttribute("width"));
}
//----------------------------------------------------------------------
//public::���ظ߶�
//����ֵ: �߶�
function Normal_getHeight(){
  return parseInt(this.oOuterPanel.getAttribute("height"));
}
//----------------------------------------------------------------------
//public::�Ƿ�ɼ�
//����ֵ:
function Normal_getVisible(){
  return PF.parseBool(this.oOuterPanel.getAttribute("visible"));
}
//----------------------------------------------------------------------


function Normal_release() {
	var bodyTable = this.oBodyTable;
	if (bodyTable != null) {
		bodyTable.oOwner = null;
		bodyTable.onkeypress = null;
	}
	var vaoEditBox = this.oEditBoxMap.getAllItem();
	if (vaoEditBox != null) {
		for (var i = 0; i < vaoEditBox.length; i++) {
			var voBox= vaoEditBox[i];
			voBox.release();
			vaoEditBox[i] = null;
		}
	}
	Base_release.call(this);
}

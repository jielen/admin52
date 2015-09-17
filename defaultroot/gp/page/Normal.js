/*$Id: Normal.js,v 1.1 2008/02/20 11:42:02 liuxiaoyong Exp $*/
/*
Title: gp.page.Normal
Description:
通用编辑类;用于编辑卡片式的业务对象;
Company: 用友政务
Date:2004/08/25
Author:zhangcheng,lijw
History:
日期		        修改人		修改内容描述
20040930    zhangcheng created

*/
function Normal(){
	//1.超类 =function();
	Base.call(this);

  //2.常量声明区 =function();
	this.CLASSNAME= "gp.page.Normal";

	this.DOMID_NORMAL_TABLE= "BodyTable";
	this.DOMID_NORMAL_COLGROUP= "BodyColGroup";
	this.DOMID_SUFFIX_NORMAL= "_NormalDiv";
	this.DOMID_SUFFIX_CAPTION= "_Caption";
	this.DOMID_SUFFIX_TEXT= "_Text";
	this.DOMID_SUFFIX_CAPTION_COL= "_CaptionCol";
	this.DOMID_SUFFIX_TEXT_COL= "_TextCol";

	this.CAPTION_SPACING_WIDTH=6; 														//标题与表格边框之间的宽度
	this.CONTENT_MIN_WIDTH=100;																//表格内容区域的最小宽度
	this.CONTENT_MAX_WIDTH=150;                               //表格内容区域的最大宽度

	//3.变量声明区 =function();
	this.tHasInit= false; 												            //public;对象是否被始化的标志;
	this.sName= this.CLASSNAME;  															//public;对象名称.
	this.sTableName= null;     																//public; 提供显示数据风格信息元的表名;
	this.oEditBoxMap=null;																		//public;以字段名为key,Editbox对象为value
	this.asFields = new Array();                              //private;所有字段名
	this.asCaptions = new Array();                            //private;所有字段标题
	this.oRect=null;      																		//public; 对象的大小;

	this.sRowHeight=null;																			//private;Normal行高
	this.sPosition=null;                                      //private;
  this.oTableMeta= null; 																		//private; TableMeta;
  this.oTableData= null;    																//private; XML 方式;
  this.oRS= null;           																//private; recordset 方式;

	this.oPageMetaNormalNode=null;														//private;用于Normal显示的，XMLDOMNode
	this.oOuterPanel= null; 																	//private; 外部面板,是整个 Normal 的基础平台.
	this.oBodyTable= null;  																	//private; 表头的 <table>.
	this.captionColWidth = new Array();                       //private; 标题列的最大宽度

	//4.事件声明区 =function();
  this.OnInit= "OnInit";                            //参数: oSender;
  this.OnEnterRow= "OnEnterRow";                    //参数: oSender, iNewRow, iOldRow;
  this.OnOutRow= "OnOutRow";                        //参数: oSender, iRow;
  this.OnBeforeInsertRow= "OnBeforeInsertRow";  		//参数：oSender, iRowIndex;
  this.OnAfterInsertRow= "OnAfterInsertRow";    		//参数：oSender, iRowIndex;
  this.OnBeforeDeleteRow= "OnBeforeDeleteRow";  		//参数: oSender, iRowIndex;
  this.OnAfterDeleteRow= "OnAfterDeleteRow";    		//参数: oSender, iRowIndex;
	this.OnBeforeUpdate= "OnBeforeUpdate";        		//参数: oSender, iRowIndex, sFieldName, vsValue, vsOldValue
	this.OnAfterUpdate= "OnAfterUpdate";          		//参数: oSender, iRowIndex, sFieldName, vsValue, vsOldValue
	this.OnResize="OnResize";

	//5.方法声明区 =function();
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
	//以上已完成文档;

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
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//参数:boolean类型,是否是最终派生类,optional
//返回值:成功: true, 失败: false;
function Normal_init(tIsFinalClass){
	if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
	Base_init.call(this,false);
	//设置默认值;
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
//private::计算给定文本字符串,占屏幕的像素数量.
//参数:类型,字符串,预计算的字符串
//返回值:成功:Text所占的宽度,单位px 失败：null;
function Normal_caculateTextWidth(sText,tIsPK){
	var viResult = 0;
	if(PF.parseBool(tIsPK))
	 viResult = PageX.getTextSize(sText + "*","宋体",null,"bold").getWidth();
	else
		viResult = PageX.getTextSize(sText + "*").getWidth();
	return viResult;
}

//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值:成功: true, 失败: false;
function Normal_resize(){
	//alert("Normal_resize()");
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "resize");
  if (this.tIsResizing) return;
  this.tIsResizing= true;

	//根据oRect对象确定控件的大小
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
	//向外发送OnResize事件
	if (PF.isExistMethodK(this.eventAnswer_OnResize)){
		this.eventAnswer_OnResize(this);
	}
	//向外发送事件;
	this.fireEvent(this.OnResize, new Array(this));
  this.tIsResizing= false;
	return true;
}

//----------------------------------------------------------------------
//public; 设置标签列列宽；标题列框设置先与Normal的make方法.
//并且如果设置的列宽小于标题长度大小,则取标题长度.
//参数iColIndex:number类型，要设置列index
//参数iWidth:number类型，要设置列宽
//返回值: void;
function Normal_setCaptionColWidth(iColIndex, iWidth){
	var voCol = this.oOuterPanel.all("" + icolIndex + "_CaptionCol");
	voCol.style.width = iWidth;
}

//----------------------------------------------------------------------
//public; 获取标签列列宽;
//参数iColIndex:number类型，要获取列index
//返回值:成功: 返回指定列的宽度, 失败: 返回 -1;
function Normal_getCaptionColWidth(iColIndex){
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getCaptionColWidth");
	var voCol = this.oOuterPanel.all("" + icolIndex + "_CaptionCol");
	return voCol.style.width;
}

//----------------------------------------------------------------------
//public; 设置内容列列宽；
//返回值: void;
function Normal_setTextColWidth(iColIndex,iWidth){
	var voCol = this.oOuterPanel.all("" + icolIndex + "_TextCol");
	voCol.style.width = iWidth;
}

//----------------------------------------------------------------------
//public; 获取内容列列宽;
//返回值:成功: 返回指定列的宽度, 失败: 返回 -1;
function Normal_getTextColWidth(iColIndex){
	var voCol = this.oOuterPanel.all("" + icolIndex + "_TextCol");
	return voCol.style.width;
}

//----------------------------------------------------------------------
//public;向Normal当中添加一个控件引用
//参数sFieldName:String类型,要添加的字段名
//参数oEditBox:TextBox类型,要添加的控件
//返回值:成功: ;失败: ;
function Normal_addCtrlObj(sFieldName,oEditBox){
	if(this.oEditBoxMap==null)this.oEditBoxMap=new Map();
	this.oEditBoxMap.put(sFieldName,oEditBox);
}
//----------------------------------------------------------------------
//public; 删除Normal当中一个控件
//参数sFieldName:String类型,要删除控件的字段名
//返回值:成功: ;失败: ;
function Normal_deleteCtrlObj(sFieldName){
	if(this.oEditBoxMap==null) return;
	this.oEditBoxMap.remove(sFieldName);
}

//----------------------------------------------------------------------
//public;根据字段名称获取控件引用
//返回值:成功: ;失败: ;
function Normal_getCtrlObj(sFieldName){
	//alert("Normal_getCtrlObj");
 	return	this.oEditBoxMap.get(sFieldName);
}
//----------------------------------------------------------------------
//public;根据字段名称获取控件引用;这是一个通用接口.
//return:EditBox / null;
function Normal_getEditBox(sField){
	return this.getCtrlObj(sField);
}
//----------------------------------------------------------------------
//public;根据字段名称获取控件标题
//返回值:成功:字段标题 ;失败: null;
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
//public; 更改指定字段的值.
//参数sFieldName:String类型,要更新的字段名
//参数sFieldValue:String类型,要更新的字段值
//参数vtUnfire:boolean类型,改变数据后是否触发事件，true：不触发事件
//返回值:成功: true, 失败: false;
function Normal_setValue(sFieldName,sFieldValue,vtUnfire,tNotChangeEditBox){
	//alert("Normal_setValue");
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValue");
	if(sFieldName==null || typeof(sFieldName) != "string" )Info.throws("参数不正确!;", this.CLASSNAME, "setValue");
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
//public; 获取当前行中指定字段的值.
//参数:类型String,要获取值的字段名称
//返回值:成功: 单元格的值, 失败: null;
function Normal_getValue(sFieldName,isName){
	//alert("Normal_getValue");
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getValue");
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
//返回值:value/null;
function Normal_getValueByRowField(iRowIndex, sFieldName, isName){
  if (iRowIndex== null) iRowIndex= 0;
	if(iRowIndex != 0) return null;
	return this.getValue(sFieldName, isName);
}
//----------------------------------------------------------------------
//public; 设置指定字段的列是否可见.
//返回值: void;
function Normal_setColVisible(sFieldName, tIsVisible){
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setColVisible");
	var viColIndex=parseInt(this.oPageMetaNormalNode.selectSingleNode("//field[@name='"+sFieldName+"']").getAttribute("colindex"));
	this.oBodyTable.all(viColIndex+"_CaptionCol").style.display=(tIsVisible)?"":"none";
	this.oBodyTable.all(viColIndex+"_TextCol").style.display=(tIsVisible)?"":"none";
	return;
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: void;
function Normal_setFieldVisible(sFieldName,tIsVisible){
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setColVisible");
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
//public; 设置指定字段颜色.
//返回值: void;
function Normal_setFieldColor(sFieldName,color){
	var voText = this.oBodyTable.all(sFieldName+"_Text");
	if(voText)
		voText.style.color = color;
}
//----------------------------------------------------------------------
//public; 设置指定字段颜色.
//返回值: void;
function Normal_setCaptionColor(sFieldName,color){
	var voCaption = this.oBodyTable.all(sFieldName+"_Caption");
	if(voCaption)
		voCaption.style.color = color;
}
//----------------------------------------------------------------------
//public; 设置指定字段是否只读.
//返回值: void;
function Normal_setFieldReadOnly(sFieldName,tIsReadOnly){
	//alert("Normal_setFieldReadOnly");
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setColVisible");
	var voEditBox = this.getCtrlObj(sFieldName);
	if(voEditBox){
		voEditBox.setReadOnly(tIsReadOnly);
	}
}
//----------------------------------------------------------------------
//public; 判断指定字段是否只读.
//返回值: true:是只读；false：不是只读
function Normal_isFieldReadOnly(sFieldName){
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setColVisible");
	var voEditBox = this.getCtrlObj(sFieldName);
	if(voEditBox){
		return voEditBox.isReadOnly();
	}
}
//----------------------------------------------------------------------
//public; 设置指定字段标题.
//返回值: void;
function Normal_setFieldCaption(sFieldName,caption){
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setFieldCaption");
	var voFieldCaption = this.oBodyTable.all(sFieldName+"_Caption");
	if(voFieldCaption){
		voFieldCaption.innerHTML = caption;
	}
}
//----------------------------------------------------------------------
//public; 判断指定字段的列是否可见.
//返回值:可见: true, 不可见: false;
function Normal_isFieldVisible(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isColVisible");
  var voText = this.oBodyTable.all(sFieldName+"_Text");
  return voText.style.display == "";
}
//----------------------------------------------------------------------
//public; 生成 Normal 的 HTML DOM 对象；
//参数:类型Object,盛放TextBox控件的容器.例如Div,TD,SPAN等等
//返回值:成功: true, 失败: false;
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
//private:: 遍历每一个Normal中的表格,加载 Normal中的各个控件;
//返回值:无
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
//private:: 遍历Normal中的表格的TD，计算caption列的宽度;
//返回值:无
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
//private:: 初始化数据元信息
//返回值:成功: true, 失败: false;
function Normal_initMetaInfo(){
  //alert(this.CLASSNAME+ ".initMetaInfo();");
	this.sTableName=this.oOuterPanel.getAttribute("tablename");
	if(this.sTableName ==null)Info.throws("PageMeta元数据信息不存在或者有错误!",this.CLASSNAME,"initMetaInfo");
  this.oTableMeta= DataTools.getTableMeta(this.sTableName);
  this.oTableData= DataTools.getTableData(this.sTableName);
	this.oRS=DataTools.getRecordset(this.sTableName);
  return true;
}

//----------------------------------------------------------------------
//private::设置初始值.
//返回值:void
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
			vsFieldValue=voFieldValueNode.text;//如果PageData数据岛有数据。
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
//public; 清除当前的所有数据；清理数据并不向数据库进行保存.
//返回值:成功: true, 失败: false;
function Normal_clear(){
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
	this.clearAllBox();
	DataTools.clearTableData(this.sTableName);
	return true;
}
//----------------------------------------------------------------------
//public; 判断指定的字段名是否有效.
//返回值:有效: true, 否则: false;
function Normal_isValidFieldName(sFieldName){
  //if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isValidFieldName");
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
//private::取得页面描述最大列数
//返回值:
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
//private::键盘响应
//返回值:void
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
//private::根据当前获得焦点的输入框获得按下回车后下一个输入框
//sFieldName:当前输入框的字段名
//返回值:成功：按下回车后下一个输入框；否则：null
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
//private::根据当前获得焦点的输入框获得按下Ctrl+左方向键后前一个输入框
//sFieldName:当前输入框的字段名
//返回值:成功：按下Ctrl+左方向键后前一个输入框；否则：null
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
//public:根据字段名判断输入框是否可见(隐藏字段及值集);
//返回值：可见:true;否则:false;
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
//7.事件响应区 =function();

//----------------------------------------------------------------------
//private:: BodyTable onkeypress 处理;
//向外发布鼠标单击事件; OnRowClick
//返回值:无;
function Normal_oBodyTable_onkeypress(){
}
//----------------------------------------------------------------------
//private::第一个输入框获得焦点;
//返回值:无;
function Normal_setFirstEidtFocus(){
	if(event.keyCode != 13) return ;
	var voDivs=this.oOuterPanel.all("BodyTable").getElementsByTagName("Div");
	var vsCurDivId=event.srcElement.parentNode.id;
	var viIndex=0;
	for(var j=voDivs.length;viIndex<j;viIndex++){
		if(voDivs.item(viIndex).id==vsCurDivId)break;
	}
	if(viIndex <= voDivs.length-2){
		if(voDivs.item(viIndex+1).id==null || voDivs.item(viIndex+1).id=="")viIndex++;//过滤掉combox box内部的div控件
		if(viIndex <= voDivs.length-2)voDivs.item(viIndex+1).firstChild.focus();
	}

}
//----------------------------------------------------------------------
//public;根据字段名获取输入框的位置
//返回值:成功:输入框位置 Rect;失败：null;
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
//public;根据字段名获取标题的位置
//返回值:成功:标题位置 Rect;失败：null;
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
//Normal的键盘处理
//返回值:void
function Normal_eventAnswer_OnKeyDown(oSender,oEvent){
	this.shortcutKeyDispose(oSender,oEvent);
}
//----------------------------------------------------------------------
//private:: 处理EditBox 发出的OnChange事件.
//参数:字符串类型.
//返回值:void;
function Normal_eventAnswer_EditBox_OnChange(oSender, sValue, sOldValue){
  var voEditBox= oSender;
  var vsFieldName= voEditBox.getFieldName();
	this.setValue(vsFieldName, sValue,false,true);
}
//----------------------------------------------------------------------
//public;
//返回值：0
function Normal_getCurRowIndex(){
	return 0;
}
//----------------------------------------------------------------------
//public;
//返回值:空
function Normal_setValueByRowField(iRowIndex, sFieldName, sValue,vtUnfire){
	if(iRowIndex == 0){
		this.setValue(sFieldName,sValue,vtUnfire);
	}
}
//----------------------------------------------------------------------
//public;
//返回值:true:有效;false:无效
function Normal_isValidRow(iRowIndex){
	if(iRowIndex == 0){
		return true;
	}else
  	return false;
}
//----------------------------------------------------------------------
//public; 删除指定的行;
//返回值:成功: true, 失败: false;
function Normal_deleteRow(iRowIndex){
	//alert("Normal_deleteRow");
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "deleteRow");
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
//private; 填充默认值;
//返回值:成功: true, 失败: false;
function Normal_clearAllBox(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "clearAllBox");
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
//public; 返回所有字段名
//返回值:字段名数组
function Normal_getAllFields(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isValidFieldName");
	return this.asFields;
}
//----------------------------------------------------------------------
//public; 返回所有字段名
//返回值:字段名数组
function Normal_getFieldNames(){
	return this.getAllFields();
}
//----------------------------------------------------------------------
//public; 返回所有字段标题
//返回值:字段名数组
function Normal_getAllCaptions(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isValidFieldName");
	return this.asCaptions;
}
//----------------------------------------------------------------------
//public:内容
//返回值:void
function Normal_loadData(){
  if (this.tHasInit== false) return;
  this.clearAllBox();
  this.setInitValue();
}
//----------------------------------------------------------------------
//public::返回列数
//返回值: number of colcount
function Normal_getColCount(){
	//if(this.tHasInit == false) return;
  return parseInt(this.oOuterPanel.getAttribute("colcount"));
}
//----------------------------------------------------------------------
//public::返回表名
//返回值: 表名
function Normal_getTableName(){
  return this.oOuterPanel.getAttribute("tablename");
}
//----------------------------------------------------------------------
//public::返回宽度
//返回值: 宽宽
function Normal_getWidth(){
  return parseInt(this.oOuterPanel.getAttribute("width"));
}
//----------------------------------------------------------------------
//public::返回高度
//返回值: 高度
function Normal_getHeight(){
  return parseInt(this.oOuterPanel.getAttribute("height"));
}
//----------------------------------------------------------------------
//public::是否可见
//返回值:
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

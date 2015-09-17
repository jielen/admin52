/*
Title: gp.page.Grid
Description:
表格类，用于显示 XML 数据，并提供数据的访问，
可以删除指定的行和插入新行,但不能进行其他的任何编辑行为。
Company: 用友政务
Author: leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Grid(){
  //1.超类 =function();
  Base.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.Grid";

  this.ROW_BACK_COLOR_LIGHT= "#F8F8F8";           //行背景的亮色.
  this.ROW_BACK_COLOR_DARK= "#E1E1E1";            //行背景的暗色.
  this.ROW_BACK_COLOR_SELECT_LIGHT= "#0A246A";    //行背景的选中亮色.
  this.ROW_BACK_COLOR_SELECT_DARK= "#D4D0C8";     //行背景的选中暗色.
  this.ROW_BACK_COLOR_NORMAL= "";                 //行普通背景色.
  this.ROW_FORE_COLOR_NORMAL= "black";            //行普通前景色.
  this.ROW_FORE_COLOR_SELECT= "white";            //行选中前景色.
  //this.ROW_FORE_COLOR_HIGHLIGHT= "highlighttext"; //行加亮前景色.

  this.DOMID_SUFFIX_COL= "_Col";
  this.DOMID_SUFFIX_HEAD_CELL= "_HeadCell";
  this.DOMID_PREFIX_PARENT_CELL= "PARENT_";

  this.SELECT_CHECK_COL_WIDTH= 30;           //单位: px;
  this.SELECT_CHECK_FIELD_NAME= "U_SelectCheckBox";
  this.EFFECT_PREFIX= "EFFECT_"+ PF.getUID()+ "_";

  this.VALID_WIDTH_OF_CHANGED_COL_WIDTH= 6;  //单位: px;
  this.COL_WIDTH_MIN= 10;
  this.COL_WIDTH_MAX= 1000;

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部对象;

  this.oOuterPanel= null; //private; 外部面板,是整个 Grid 的基础平台.
  this.oInnerPanel= null; //private;
  this.oHeadPanel= null;  //private; 表头面板.指 HeadDiv.
  this.oHeadTablePanel= null;  //private; 表头面板.指 HeadTableDiv.
  this.oBodyPanel= null;  //private; 表体面板.指 BodyDiv.
  this.oBodyImagePanel= null;  //private; 表体面板.指 BodyImageDiv.
  this.oBodyTableImagePanel= null;//private;
  this.oBodyTablePanel= null;     //private;
  this.oLockBodyTablePanel= null; //private;

  this.oHeadTable= null;  //private; 表头的 <table>.
  this.oHeadRepCellTable= null; //private; 列隐藏时,用于替换父单元格的<table>;
  this.oBodyTable= null;  //private; 表体的 <table>.
  this.oHeadColGroup= null; //private;
  this.oBodyColGroup= null; //private;
  this.oLockHeadColGroup= null; //private;
  this.oLockBodyColGroup= null; //private;

  this.oLockHeadPanel= null; //private; 表头的锁定面板.
  this.oLockHeadTablePanel= null;  //private; 表头面板.指 HeadTableDiv.
  this.oLockBodyPanel= null; //private; 表体的锁定面板.
  this.oLockBodyTablePanel= null;     //private;
  this.oLockHeadTable= null; //private; 表头的锁定<table>.
  this.oLockBodyTable= null; //private; 表体的锁定<table>.
  
  this.oSumRowPanel= null;          //private;
  this.oSumRowTablePanel= null;     //private;
  this.oSumRowTable= null;          //private;
  this.oSumRowColGroup= null;
  this.oLockSumRowPanel= null;      //private;
  this.oLockSumRowTablePanel= null; //private;
  this.oLockSumRowTable= null;      //private;
  this.oLockSumRowColGroup= null;
  this.iSumRowX= -1;
  this.iTotalRowX= -1;

  this.oActionButtonPanel= null; //private;
  this.oAppendRowButton= null;   //private;
  this.oInsertRowButton= null;   //private;
  this.oDeleteRowButton= null;   //private;
  this.oSavePropButton= null;    //private;
  this.oDeletePropButton= null;  //private;

  this.oActionButtonTable= null; //private;
  this.oUserDefinedButtonTable= null; //private;
  this.oUserBtnMap= new Map();   //private;

  this.oNewPanel= null;          //private; 新行生成面板;
  this.oMoveLine= null;          //private; 拖动行高或列宽时进行指示的移动线.
  this.oMoveColPanel= null;      //private; 移动列指示;
  this.oMoveColTD= null;         //private; 移动列指示;
  this.oSelectAllCheckBox= null; //private; 列头上的全选 checkbox;
  this.oFocusStopInput= null;    //private;
  this.oVSSpan= null;            //private;
  this.aiFieldVS = new Array();
  this.oPropXml= null;           //private;
  this.oDefValSpan= null;        //private;

  this.oDefRect= new Rect(0, 0, 400, 300);    //private; 对象默认的大小;
  this.oRect= new Rect(0, 0, 400, 300);       //private; 对象的大小;
  this.iBottomMargin= 0;

  this.oPagination= null; //private; 换页控制面板对象;

  this.iCurRow= -1;       //private; 当前行号;
  this.iCurCol= -1;       //private; 当前列号;

  this.oSumFieldMap= null; //private;

  this.asFieldName= new Array(); //private; 本表格所用的字段名,不含 U_SelectCheckBox 列;
  this.oFieldNameMap= new Map(); //private; 本表格所用的字段名 Map; Map 的内容为列序号;
  this.aoVSMap= new Array();     //private;
  
  this.asValueSet = "";//本表格所用字段为值集列，由值对组成, added by hmgkevin 08-05-21

  this.sLockedFieldName= ""; //private; 锁定字段名;
  this.iLockedCol= -1;       //private; 锁定列序,由 this.sLockedFieldName 计算得到;
  this.asHiddenFieldNames= new Array(); //private; 隐藏列的字段名;
  this.sEffectField= "";     //private;
  this.sEffectValue= "";     //private;
  this.sRowIdField= "";      //private;
  this.sCursorType= "hand";  //public;
  this.asSortField= new Array(); //private;
  this.tIsSortAscend= true;      //private;
  this.bDisCard= null;           //private;
  this.aoRepCellTable= new Array();//private; 列隐藏时，用于替换复杂表头中的父表头单元格的<talbe>;

  this.iFromRow= 0;           //private;

  this.tIsFocus= false;      //private; 焦点仍在本控件中;用于onblur时作判断;onmousedown时赋值;
  this.tIsReport= false;     //private;
  this.tHasInit= false;      //对象是否被始化的标志;
  //this.tHasLoadedInitData= false; //private;
  this.tHasLoadedInitData= true; //private;

  this.tIsPagiAtClient= false;//private; 仅用于 PageX.makeReportGrid();

  //调整列宽变量;
  this.tAllowChangeColWidth= false;  //private; 允许进行列宽的改变;
  this.tIsChangingColWidth= false;   //private; 正在进行列宽的改变;
  this.iMovingOffsetX= 0;            //private; 列宽改变时,移动指示线的偏移 X 值(相对于 this.oOuterPanel);
  this.iMovingStartX= 0;             //private; 列宽改变时的起始 X 值(相对于 this.oOuterPanel);
  this.sChangedFieldName= "";        //private; 被改变列宽的字段名;

  //调整列序变量;
  this.tAllowChangeColIndex= false;  //private;
  this.tIsChangingColIndex= false;   //private;
  this.iCellRelaX= 0;                //private;
  this.iCellRelaY= 0;                //private;

  //标志属性是否被改变;
  this.tIsColChanged= false; //private;
  this.tIsSortChanged= false;//private;
  this.tIsHeadChanged= false;//private;
  this.tIsDisCardChanged= false; //private;

  //风格;
  //this.sBodyBorderColor= "#DADBDD";      //private;
  this.sHeadBackNormalColor= "#F1F2F6";  //private;
  this.sHeadBackLightColor= "#F1F2F6";   //private;

  //4.事件声明区 =function();
  //凡是 Before 类的事件都是可以调用 abortEvent(true) 方法进行中止的.
  this.OnInit= "OnInit";                        //参数: oSender;
  this.OnResize= "OnResize";                    //参数: oSender;
  this.OnEnterRow= "OnEnterRow";                //参数: oSender, oNewRow, oOldRow;
  this.OnEnterCell= "OnEnterCell";              //参数: oSender, oNewCell, oOldCell;
  this.OnOutRow= "OnOutRow";                    //参数: oSender, oRow;
  this.OnOutCell= "OnOutCell";                  //参数: oSender, oCell;
  this.OnBeforeInsertRow= "OnBeforeInsertRow";  //oSender, iRowIndex;
  this.OnAfterInsertRow= "OnAfterInsertRow";    //oSender, iRowIndex;
  this.OnBeforeDeleteRow= "OnBeforeDeleteRow";  //参数: oSender, iRowIndex;
  this.OnAfterDeleteRow= "OnAfterDeleteRow";    //参数: oSender, iRowIndex;
  this.OnBeforeDeleteRows= "OnBeforeDeleteRows";//参数: oSender, aiRowIndex;
  this.OnAfterDeleteRows= "OnAfterDeleteRows";  //参数: oSender, aiRowIndex;
  this.OnRowClick= "OnRowClick";                //参数: oSender, oRow, oEvent;
  this.OnRowDblClick= "OnRowDblClick";          //参数: oSender, oRow, oEvent;
  this.OnRowSelected= "OnRowSelected";          //参数: oSender, oRow, tIsSelected;
  this.OnAllRowSelected = "OnAllRowSelected";   //参数:osender,tIsSelected;
  this.OnScroll= "OnScroll";                       //参数: oSender, oEvent;
  this.OnRowVisibleChange= "OnRowVisibleChange";   //oSender, iRowIndex, tIsVisible;
  this.OnColVisibleChange= "OnColVisibleChange";   //oSender, sFieldName, tIsVisible;
  this.OnColWidthChange= "OnColWidthChange";       //oSender, sFieldName, iNewWidth, iOldWidth;
  this.OnColIndexChange= "OnColIndexChange";       //oSender, sFieldName, iNewCol, iOldCol;
  this.OnLoadData= "OnLoadData";                   //oSender;
  //以上事件已完成文档;

  this.OnColLocked= "OnColLocked";                 //oSender, sFieldName;
  this.OnColUnlocked= "OnColUnlocked";             //oSender, sFieldName;
  this.OnUserButtonClick= "OnUserButtonClick";     //oSender, oButton, oEvent;
  this.OnBeforeInsertData= "OnBeforeInsertData";   //oSender, iFromRow;
  this.OnAfterInsertData= "OnAfterInsertData";     //oSender, iFromRow;

	//5.方法声明区= function();
	//public;
  this.clear= Grid_clear;
  this.deleteRow= Grid_deleteRow;
  this.deleteRows= Grid_deleteRows;
  this.deleteRowsK= Grid_deleteRowsK;
  this.deleteSelectedRows= Grid_deleteSelectedRows;
  this.fillRowBackColor= Grid_fillRowBackColor;
  //this.getBodyBorderColor= Grid_getBodyBorderColor;
  this.getCell= Grid_getCell;
  this.getCol= Grid_getCol;
  this.getColAlign= Grid_getColAlign;
  this.getColByField= Grid_getColByField;
  this.getColCount= Grid_getColCount;
  this.getColIndexByCell= Grid_getColIndexByCell;
  this.getColIndexByField= Grid_getColIndexByField;
  this.getColWidth= Grid_getColWidth;
  this.getCurRow= Grid_getCurRow;
  this.getCurRowIndex= Grid_getCurRowIndex;
  this.getDataRowX= Grid_getDataRowX;
  this.getEffectRows= Grid_getEffectRows;
  this.getFieldCaptions = Grid_getFieldCaptions;
  this.getFieldNameByCol= Grid_getFieldNameByCol;
  this.getFieldNames= Grid_getFieldNames;
  this.getGridRowX= Grid_getGridRowX;
  this.getHeadCell= Grid_getHeadCell;
  this.getLockedCol= Grid_getLockedCol;
  this.getRow= Grid_getRow;
  this.getRowBackColor= Grid_getRowBackColor;
  this.getRowCount= Grid_getRowCount;
  this.getRowForeColor= Grid_getRowForeColor;
  this.getRowIndexByCell= Grid_getRowIndexByCell;
  this.getRowValue= Grid_getRowValue;
  this.getSelectedRowIndexs= Grid_getSelectedRowIndexs;
  this.getValue= Grid_getValue;
  this.getValueByCell= Grid_getValueByCell;
  this.getValueByRC= Grid_getValueByRC;
  this.getValueByRowField= Grid_getValueByRowField;
  this.init= Grid_init;
  this.insertRow= Grid_insertRow;
  this.isColVisible= Grid_isColVisible;
  this.isRowVisible= Grid_isRowVisible;
  this.isValidCol= Grid_isValidCol;
  this.isValidFieldName= Grid_isValidFieldName;
  this.isValidRow= Grid_isValidRow;
  this.loadData= Grid_loadData;
  this.make= Grid_make;
  this.resize= Grid_resize;
  this.selectAllRow= Grid_selectAllRow;
  this.selectRows= Grid_selectRows;
  //this.setBodyBorderColor= Grid_setBodyBorderColor;
  this.setClass= Grid_setClass;
  this.setColAlign= Grid_setColAlign;
  this.setColVisible= Grid_setColVisible;
  this.setColWidth= Grid_setColWidth;
  this.setCurRow= Grid_setCurRow;
  this.setLockedCol= Grid_setLockedCol;
  //this.setPagination= Grid_setPagination;
  this.setRowBackColor= Grid_setRowBackColor;
  this.setRowForeColor= Grid_setRowForeColor;
  this.setRowVisible= Grid_setRowVisible;
  this.setStyle= Grid_setStyle;
  this.setStyleItem= Grid_setStyleItem;
  this.setRect= Grid_setRect;
  this.setFieldCaption = Grid_setFieldCaption;
  this.getFieldCaption = Grid_getFieldCaption;
  this.isSelectedRow= Grid_isSelectedRow;
  this.isAllSelBoxChecked= Grid_isAllSelBoxChecked;
  this.lightFocusRow= Grid_lightFocusRow;
  this.fillRowId= Grid_fillRowId;
  this.setFocus= Grid_setFocus;
  this.getDispRows= Grid_getDispRows;
  this.getDispRow= Grid_getDispRow;
  this.lostFocus= Grid_lostFocus;
  this.setHeadForeColor= Grid_setHeadForeColor;
  this.setHeadBackColor= Grid_setHeadBackColor;

  this.getCols= Grid_getCols;
  this.getRowHeight= Grid_getRowHeight;
  this.getTabIndex= Grid_getTabIndex;
  this.getTableName= Grid_getTableName;
  this.isDelPropBtnVisible= Grid_isDelPropBtnVisible;
  this.isEnterFirstRow= Grid_isEnterFirstRow;
  this.isExistCheck= Grid_isExistCheck;
  this.isLightRow= Grid_isLightRow;
  this.isMultiSel= Grid_isMultiSel;
  this.isReadOnly= Grid_isReadOnly;
  this.isSavePropBtnVisible= Grid_isSavePropBtnVisible;
  //this.isVisible= Grid_isVisible;
  this.makeHtmlData= Grid_makeHtmlData;
  this.saveAsExcel= Grid_saveAsExcel;
  this.setColIndex= Grid_setColIndex;
  this.setColIndexK= Grid_setColIndexK;
  this.setDelPropBtnVisible= Grid_setDelPropBtnVisible;
  this.setEnterFirstRow= Grid_setEnterFirstRow;
  this.setExistCheck= Grid_setExistCheck;
  this.setLightRow= Grid_setLightRow;
  this.setMultiSel= Grid_setMultiSel;
  this.setReadOnly= Grid_setReadOnly;
  this.setRowHeight= Grid_setRowHeight;
  this.setSavePropBtnVisible= Grid_setSavePropBtnVisible;
  this.setTabIndex= Grid_setTabIndex;
  this.setTableName= Grid_setTableName;
  //this.setVisible= Grid_setVisible;
  this.sort= Grid_sort;
  this.addVSOption= Grid_addVSOption;
  this.getDispCol= Grid_getDispCol;
  this.getSortField= Grid_getSortField;
  this.getIsSortAscend= Grid_getIsSortAscend;
  //以上已完成文档.

  this.getPaginationConsole= Grid_getPaginationConsole;
  this.effectRows= Grid_effectRows;
  this.insertDelta= Grid_insertDelta;
  this.getUsableCol= Grid_getUsableCol;
	this.getVisibleRowX= Grid_getVisibleRowX;
	this.getVisibleColX= Grid_getVisibleColX;
  this.getFirstVisibleRowX= Grid_getFirstVisibleRowX;
  this.getLastVisibleRowX= Grid_getLastVisibleRowX;
  this.loadField= Grid_loadField;
  this.loadFieldK= Grid_loadFieldK;
  this.getUserButton= Grid_getUserButton;
  this.insertData= Grid_insertData;
  this.insertTableDataRows= Grid_insertTableDataRows;
  this.getPropFileId= Grid_getPropFileId;
  this.setPropFileId= Grid_setPropFileId;
  this.getSumFields = Grid_getSumFields;
  this.getSumRowBackColor= Grid_getSumRowBackColor;
  this.isAutoAppear= Grid_isAutoAppear;
  this.setAutoAppear= Grid_setAutoAppear;
  this.refreshSumRow= Grid_refreshSumRow;
  this.loadRow= Grid_loadRow;
  this.setRowTip= Grid_setRowTip;
  this.setColValue= Grid_setColValue;
  this.getSumDescField= Grid_getSumDescField;
  this.getTotalDescField= Grid_getTotalDescField;
  this.getSumDesc= Grid_getSumDesc;
  this.getSumCond= Grid_getSumCond;
  this.getTotalDesc= Grid_getTotalDesc;
  this.clearSumTable= Grid_clearSumTable;
  this.formatValue= Grid_formatValue;
  this.getInnerLineColor= Grid_getInnerLineColor;
  this.setInnerLineColor= Grid_setInnerLineColor;
  this.getAllUserButton= Grid_getAllUserButton;
  this.setCardDisOrNot= Grid_setCardDisOrNot;
  this.initRelCardDisOrNot= Grid_initRelCardDisOrNot;
  this.getHeadRowHeight= Grid_getHeadRowHeight;
  this.setHeadRowHeight= Grid_setHeadRowHeight;
  
  this.getTableLabels = Grid_getTableLabels;
  this.getSelectedDataOneDelta = Grid_getSelectedDataOneDelta;
  

  //friendly;
  this.setInitMark= Grid_setInitMark;
  this.makePagination= Grid_makePagination;

	//private;
	this.makeBody= Grid_makeBody;
	this.makeBodyColGroup= Grid_makeBodyColGroup;
	this.makeBodyRow= Grid_makeBodyRow;
	this.initFields= Grid_initFields;
	this.initMeta= Grid_initMeta;
	this.initStyle= Grid_initStyle;
	this.initBodyTable= Grid_initBodyTable;
	this.initHead= Grid_initHead;
	this.initDefaultValue= Grid_initDefaultValue;
  this.initSumTable= Grid_initSumTable;
	this.insertRowToGrid= Grid_insertRowToGrid;
  this.deleteRowK= Grid_deleteRowK;
	this.deleteRowFromGrid= Grid_deleteRowFromGrid;
	this.recordProp= Grid_recordProp;
	this.deleteProp= Grid_deleteProp;
	this.restoreProp= Grid_restoreProp;
	this.addHeadChildCellToParent= Grid_addHeadChildCellToParent;
	this.eventAnswer_OnKeyDown= Grid_eventAnswer_OnKeyDown;
	this.eventAnswer_OnClick= Grid_eventAnswer_OnClick;
	this.eventDispose_OnFocus= Grid_eventDispose_OnFocus;
	this.adjustBodyTableImagePanel= Grid_adjustBodyTableImagePanel;
	this.adjustCellToView= Grid_adjustCellToView;
	this.adjustRepCell= Grid_adjustRepCell;
	this.adjustRepCellAfterColWidthChanged= Grid_adjustRepCellAfterColWidthChanged;
	this.adjustStyle= Grid_adjustStyle;
	this.initEffectRows= Grid_initEffectRows;
	this.getColID= Grid_getColID;
  this.getCurCell= Grid_getCurCell;
  this.getCurColIndex= Grid_getCurColIndex;
	this.getCellFromTableEvent= Grid_getCellFromTableEvent;
	this.getHeadCellID= Grid_getHeadCellID;
	this.getHeadParentCell= Grid_getHeadParentCell;
	this.getHeadParentCellID= Grid_getHeadParentCellID;
	this.grid_BodyPanel_onscroll_Dispose= Grid_grid_BodyPanel_onscroll_Dispose;
	this.grid_OuterPanel_onkeydown_Dispose= Grid_grid_OuterPanel_onkeydown_Dispose;
  this.setCurRowBackColor= Grid_setCurRowBackColor;
  this.setCurRowForeColor= Grid_setCurRowForeColor;
  this.setCurCell= Grid_setCurCell;
	this.setColVisibleToParent= Grid_setColVisibleToParent;
	this.setFocusK= Grid_setFocusK;
	this.getHeadCellCode= Grid_getHeadCellCode;
	this.setColIndex_HeadDispose= Grid_setColIndex_HeadDispose;
	this.setColIndex_HeadDispose_GetCell= Grid_setColIndex_HeadDispose_GetCell;
	this.setColIndex_HeadDispose_MakeDefaultParamMeta= Grid_setColIndex_HeadDispose_MakeDefaultParamMeta;
	this.setColIndex_HeadDispose_GetHeadTable= Grid_setColIndex_HeadDispose_GetHeadTable;
	this.getHeadTable= Grid_getHeadTable;
	this.getActionPanelWidth= Grid_getActionPanelWidth;
	this.getEditBox= Grid_getEditBox;
	this.loadSumRow= Grid_loadSumRow;
	this.refreshPageSumRow= Grid_refreshPageSumRow;
	this.refreshDBTotalRow= Grid_refreshDBTotalRow;
	this.disposeNewCurRow= Grid_disposeNewCurRow;
	this.getNewCurRow= Grid_getNewCurRow;
	this.getOuterTabStrip= Grid_getOuterTabStrip;
	this.calcGridHeight= Grid_calcGridHeight;
	this.setSortImg= Grid_setSortImg;
	this.resort= Grid_resort;
	this.getFieldIndex = Grid_getFieldIndex;
	this.prepareMakeBodyRow = Grid_prepareMakeBodyRow;
	//add by liubo:获取绑定表的字段属性
	this.getFieldAttr = Grid_getFieldAttr;
	this.formatColumn = Grid_formatColumn;
	this.getVSByFieldName = Grid_getVSByFieldName;
	this.makeLockedSumBody = Grid_makeLockedSumBody;
	this.makeBodyByOcx = Grid_makeBodyByOcx;
	this.makeBodyHead = Grid_makeBodyHead;
	this.makeBodyRowByOcx = Grid_makeBodyRowByOcx;
	this.getCurrentSelectedRowIndexsWithDataKeys = Grid_getCurrentSelectedRowIndexsWithDataKeys;
	this.getAllSelectedDataKeys = Grid_getAllSelectedDataKeys;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//return:成功: true, 失败: false;
function Grid_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;

  if (this.isSavePropBtnVisible()
      || this.isDelPropBtnVisible()
      || this.oPagination!= null){
    this.iBottomMargin= 22;
  }
	
  this.initDefaultValue();
  if (tIsFinalClass) this.setInitMark();
  
  if (PF.isEmpty(DataTools.getCompoName())){
    this.tAllowChangeColIndex= false;
  }
    
  return true;
}
//----------------------------------------------------------------------
//friendly; 初始化.
//return:成功: true, 失败: false;
function Grid_setInitMark(){
  this.tHasInit= true;
  if (this.tHasInit) Base_setInitMark.call(this);
  if (this.tHasInit && this.oPagination) this.oPagination.init();////
}
//----------------------------------------------------------------------
//private;
//return: void;
function Grid_initDefaultValue(){
  if (this.oDefValSpan== null) return;
  var voSpan= null;
  for (var i= 0; i< this.oDefValSpan.childNodes.length; i++){
    voSpan= this.oDefValSpan.childNodes[i];
    if (voSpan.nodeName!= "SPAN") continue;
    DataTools.setDefExpr(this.getTableName(), voSpan.field, voSpan.innerText);
  }
}
//----------------------------------------------------------------------
//private; 初始化.
//return:成功: true, 失败: false;
function Grid_initBodyTable(){
  this.oBodyTable= this.oBodyPanel.all("BodyTable");
  this.oLockBodyTable= this.oLockBodyPanel.all("BodyTable");
  this.oBodyColGroup= this.oBodyTablePanel.all("BodyColGroup");
  this.oLockBodyColGroup= this.oLockBodyPanel.all("BodyColGroup");
  if (this.oBodyTable== null || this.oLockBodyTable== null) return false;

  this.oBodyTable.oOwner= this;  //private; 表体的 <table>.
  this.oBodyColGroup.oOwner= this; //private;
  this.oLockBodyColGroup.oOwner= this; //private;
  this.oLockBodyTable.oOwner= this; //private; 表体的锁定<table>.

	this.oOuterPanel.onclick = null;
	this.oBodyTable.onclick= Grid_oBodyTable_onclick;
	this.oBodyTable.onfocus= Grid_oBodyTable_onfocus;
 	this.oLockBodyTable.onclick= Grid_oLockBodyTable_onclick;
 	this.oLockBodyTable.onfocus= Grid_oLockBodyTable_onfocus;

  this.initEffectRows();
  var vsEffectValue= this.sEffectValue;
  this.sEffectValue= "";
  this.effectRows(vsEffectValue);
 	return true;
}
//----------------------------------------------------------------------
//public;
//return:成功: true, 失败: false;
function Grid_initSumTable(){
  this.oSumRowTable= this.oSumRowTablePanel.all("BodyTable");
  this.oLockSumRowTable= this.oLockSumRowTablePanel.all("BodyTable");
  this.oSumRowColGroup= this.oSumRowTablePanel.all("BodyColGroup");
  this.oLockSumRowColGroup= this.oLockSumRowTablePanel.all("BodyColGroup");
  if (this.oSumRowTable== null || this.oSumRowTable.rows.length== 0) return;
  
  this.iSumRowX= (this.oSumRowPanel.sumrow== null)? -1: parseInt(this.oSumRowPanel.sumrow);
  this.iTotalRowX= (this.oSumRowPanel.totalrow== null)? -1: parseInt(this.oSumRowPanel.totalrow);
  if (this.iTotalRowX> 0 && this.oLockSumRowTable.rows.length> 0){
    this.oLockSumRowTable.rows[0].parentNode.appendChild(this.oLockSumRowTable.rows[0].cloneNode(true));
  }
}
//----------------------------------------------------------------------
//public;
//return: void;
function Grid_clearSumTable(){
  if (this.oSumRowTable== null) return;
  for (var x= 0; x< this.oSumRowTable.rows.length; x++){
    for (var i= 0; i< this.oSumRowTable.rows[x].cells.length; i++){
      this.oSumRowTable.rows[x].cells[i].innerText= " ";
    }
  }
  for (var x= 0; x< this.oLockSumRowTable.rows.length; x++){
    for (var i= 0; i< this.oLockSumRowTable.rows[x].cells.length; i++){
      if (i== 0 && this.isExistCheck()) continue;
      this.oLockSumRowTable.rows[x].cells[i].innerText= " ";
    }
  }
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//return:成功: true, 失败: false;
function Grid_resize(){
  if (this.tHasInit== false) return false;
  if (this.oOuterPanel.currentStyle== null) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= true;

  if (this.oRect.iWidth== null || (!this.oRect.isWidthPercent() && parseInt(this.oRect.iWidth)< 50)) this.oRect.iWidth= 50;
  if (this.oRect.iHeight== null || (!this.oRect.isHeightPercent() && parseInt(this.oRect.iHeight)< 50)) this.oRect.iHeight= 50;

  this.oOuterPanel.style.left= this.oRect.iLeft;
  this.oOuterPanel.style.top= this.oRect.iTop;
  this.oOuterPanel.style.width= this.oRect.iWidth;
  this.oOuterPanel.style.height= this.oRect.iHeight;

  this.oOuterPanel._iClientWidth= this.oOuterPanel.clientWidth;
  this.oOuterPanel._iClientHeight= this.oOuterPanel.clientHeight;

  if (this.oPagination!= null){
    this.oPagination.oRect.iLeft= this.oOuterPanel._iClientWidth- parseInt(this.oPagination.oRect.iWidth);
    this.oPagination.oRect.iTop= this.oOuterPanel._iClientHeight- parseInt(this.oPagination.oRect.iHeight);
    this.oPagination.resize();
  }

  if (this.isSavePropBtnVisible() || this.isDelPropBtnVisible()){
    var viButtonHeight= Math.max(this.oSavePropButton.offsetHeight, this.oDeletePropButton.offsetHeight);
    this.oActionButtonPanel.style.left= 0;
    this.oActionButtonPanel.style.top= this.oOuterPanel._iClientHeight- viButtonHeight;
    this.oActionButtonPanel.style.width= this.getActionPanelWidth();//this.oDeletePropButton.offsetLeft+ this.oDeletePropButton.offsetWidth;
    this.oActionButtonPanel.style.height= viButtonHeight;
  }else{
    this.oActionButtonPanel.style.left= -1000;
    this.oActionButtonPanel.style.top= -1000
    this.oActionButtonPanel.style.width= 10;
    this.oActionButtonPanel.style.height= 10;
  }

  this.oInnerPanel.style.left= 0;
  this.oInnerPanel.style.top= 0;
  this.oInnerPanel.style.width= "100%";//this.oOuterPanel._iClientWidth;
  this.oInnerPanel.style.height= Math.abs(this.oOuterPanel._iClientHeight- this.iBottomMargin);
  this.oInnerPanel._iClientWidth= Math.abs(this.oOuterPanel._iClientWidth- parseInt(this.oInnerPanel.currentStyle.borderLeftWidth)- parseInt(this.oInnerPanel.currentStyle.borderRightWidth));
  this.oInnerPanel._iClientHeight= Math.abs(parseInt(this.oInnerPanel.style.height)- parseInt(this.oInnerPanel.currentStyle.borderTopWidth)- parseInt(this.oInnerPanel.currentStyle.borderBottomWidth));

  this.oHeadTable._iOffsetHeight= this.oHeadTable.rows.length* this.getHeadRowHeight();

  this.oHeadPanel.style.left= 0;
  this.oHeadPanel.style.top= 0;
  this.oHeadPanel.style.width= this.oInnerPanel._iClientWidth;
  //this.oHeadPanel.style.height= this.oHeadTable.offsetHeight;
  this.oHeadPanel.style.height=this.oHeadTable._iOffsetHeight;
  this.oHeadPanel._iOffsetLeft= parseInt(this.oHeadPanel.style.left);
  this.oHeadPanel._iOffsetTop= parseInt(this.oHeadPanel.style.top);
  this.oHeadPanel._iOffsetWidth= parseInt(this.oHeadPanel.style.width);
  this.oHeadPanel._iOffsetHeight= parseInt(this.oHeadPanel.style.height);

  this.oHeadTablePanel.style.left= 0;
  this.oHeadTablePanel.style.top= 0;

  this.oLockHeadTablePanel.style.left= 0;
  this.oLockHeadTablePanel.style.top= 0;

  this.oBodyImagePanel.style.left= 0;
  this.oBodyImagePanel.style.top= this.oHeadPanel.currentStyle.height;//offsetHeight- 0;
  this.oBodyImagePanel._iOffsetLeft= parseInt(this.oBodyImagePanel.style.left);
  this.oBodyImagePanel._iOffsetTop= parseInt(this.oBodyImagePanel.style.top);
  this.oBodyImagePanel.style.width= "100%";//this.oInnerPanel._iClientWidth;
  this.oBodyImagePanel.style.height= Math.abs(this.oInnerPanel._iClientHeight- this.oBodyImagePanel._iOffsetTop);//- ((this.tIsPagination)? parseInt(this.oPagination.oRect.iHeight): 0);
  this.oBodyImagePanel._iOffsetWidth= this.oInnerPanel._iClientWidth;//parseInt(this.oBodyImagePanel.style.width);
  this.oBodyImagePanel._iOffsetHeight= parseInt(this.oBodyImagePanel.style.height);

  this.oLockBodyTablePanel.style.left= 0;
  this.oLockBodyTablePanel.style.top= 0;

  this.adjustBodyTableImagePanel();

  this.oMoveLine.style.left= -1000;
  this.oMoveLine.style.top= -1000;

  this.grid_BodyPanel_onscroll_Dispose();

  //向外发送事件;
  this.fireOnResize();
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//private;
//return: width/0;
function Grid_getActionPanelWidth(){
  return this.oActionButtonTable.offsetWidth;
}
//----------------------------------------------------------------------
//private; 调整 BodyTableImagePanel;
//return: void;
function Grid_adjustBodyTableImagePanel(){
  if (this.tHasInit== false) return;
  if (this.oBodyTable== null) return;
  var viLeftOffset= this.SELECT_CHECK_COL_WIDTH;
  if (this.isExistCheck()== false) viLeftOffset= 0;

  var viSumRowHeight= 0;
  if (this.iSumRowX>= 0){
    viSumRowHeight+= this.getRowHeight();
  }
  if (this.iTotalRowX>= 0){
    viSumRowHeight+= this.getRowHeight();
  }
  if (viSumRowHeight>= this.getRowHeight()){
    this.oLockSumRowPanel.style.display= "";
    this.oSumRowPanel.style.display= "";
  }else{
    this.oLockSumRowPanel.style.display= "none";
    this.oSumRowPanel.style.display= "none";
  }

  this.oBodyTable._iOffsetHeight= this.oBodyTable.rows.length* this.getRowHeight();

  this.oBodyTableImagePanel.style.left= 0;
  this.oBodyTableImagePanel.style.top= 0;
  this.oBodyTableImagePanel.style.width= this.oHeadTable.offsetWidth;
  this.oBodyTableImagePanel.style.height= this.oBodyTable._iOffsetHeight+ viSumRowHeight;
  this.oBodyTableImagePanel._iOffsetWidth= parseInt(this.oBodyTableImagePanel.style.width);
  this.oBodyTableImagePanel._iOffsetHeight= parseInt(this.oBodyTableImagePanel.style.height);

  var vtExistHoriScroll= true;
  var vtExistVertScroll= true;
  if (this.oBodyTableImagePanel._iOffsetWidth< this.oBodyImagePanel.clientWidth) vtExistHoriScroll= false;
  if (this.oBodyTableImagePanel._iOffsetHeight< this.oBodyImagePanel.clientHeight) vtExistVertScroll= false;
  if (this.oBodyTableImagePanel._iOffsetWidth< this.oBodyImagePanel._iOffsetWidth
      && this.oBodyTableImagePanel._iOffsetHeight< this.oBodyImagePanel._iOffsetHeight){
    vtExistHoriScroll= false;
    vtExistVertScroll= false;
  }
  
  this.oLockBodyPanel.style.left= this.oBodyImagePanel._iOffsetLeft;
  this.oLockBodyPanel.style.top= this.oBodyImagePanel._iOffsetTop;
  this.oLockBodyPanel.style.width= this.oLockBodyTable.offsetWidth;
  if (vtExistHoriScroll) this.oLockBodyPanel.style.height= Math.abs(this.oBodyImagePanel.clientHeight- viSumRowHeight);
  else this.oLockBodyPanel.style.height= Math.abs(this.oBodyImagePanel._iOffsetHeight- viSumRowHeight);
  this.oLockBodyPanel._iOffsetLeft= parseInt(this.oLockBodyPanel.style.left);
  this.oLockBodyPanel._iOffsetTop= parseInt(this.oLockBodyPanel.style.top);
  this.oLockBodyPanel._iOffsetWidth= parseInt(this.oLockBodyPanel.style.width);
  this.oLockBodyPanel._iOffsetHeight= parseInt(this.oLockBodyPanel.style.height);

  this.oLockHeadPanel.style.left= this.oHeadPanel._iOffsetLeft;
  this.oLockHeadPanel.style.top= this.oHeadPanel._iOffsetTop;
  this.oLockHeadPanel.style.width= this.oLockBodyPanel.offsetWidth;
  this.oLockHeadPanel.style.height= this.oHeadPanel._iOffsetHeight;

  this.oBodyPanel.style.left= this.oLockBodyPanel._iOffsetWidth;
  this.oBodyPanel._iOffsetLeft= parseInt(this.oBodyPanel.style.left);
  this.oBodyPanel.style.top= this.oLockBodyPanel._iOffsetTop;
  if (vtExistVertScroll) this.oBodyPanel.style.width= Math.abs(this.oBodyImagePanel.clientWidth- this.oBodyPanel._iOffsetLeft);
  else this.oBodyPanel.style.width= Math.abs(this.oBodyImagePanel._iOffsetWidth- this.oBodyPanel._iOffsetLeft);
  this.oBodyPanel.style.height= this.oLockBodyPanel._iOffsetHeight;
  this.oBodyPanel._iOffsetTop= parseInt(this.oBodyPanel.style.top);
  this.oBodyPanel._iOffsetWidth= parseInt(this.oBodyPanel.style.width);
  this.oBodyPanel._iOffsetHeight= parseInt(this.oBodyPanel.style.height);

  if (this.oBodyPanel.offsetLeft== 0) this.oBodyPanel.style.left= viLeftOffset;
  this.oBodyTablePanel.style.left= 0- (this.oBodyPanel.offsetLeft- viLeftOffset);
  this.oBodyTablePanel.style.top= 0;

  this.oLockSumRowPanel.style.left= this.oLockBodyPanel._iOffsetLeft;
  this.oLockSumRowPanel.style.top= this.oLockBodyPanel._iOffsetTop+ this.oLockBodyPanel._iOffsetHeight;
  this.oLockSumRowPanel.style.width= this.oLockBodyPanel._iOffsetWidth;
  this.oLockSumRowPanel.style.height= viSumRowHeight;

  this.oSumRowPanel.style.left= this.oBodyPanel._iOffsetLeft;
  this.oSumRowPanel.style.top= this.oBodyPanel._iOffsetTop+ this.oBodyPanel._iOffsetHeight;
  this.oSumRowPanel.style.width= this.oBodyPanel._iOffsetWidth;
  this.oSumRowPanel.style.height= viSumRowHeight;

  this.grid_BodyPanel_onscroll_Dispose();
  return;
}
//----------------------------------------------------------------------
//private; 给表头的父单元格加上对子单元格组的指向;用于列显示管理;
//在父单元格上加上属性: aoChildCell;
//return: 成功: vaoChildCell, 否则: null;
function Grid_addHeadChildCellToParent(oParentCell){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "addHeadChildCellToParent");
  if (oParentCell== null) return null;
  if (oParentCell.childfields== null || oParentCell.childfields.length== 0) return null;

  var vasChildField= oParentCell.childfields.split(";");
  var vsField= "";
  var vaoChildCell= new Array();

  for (var i= 0, len= vasChildField.length; i< len; i++){
    vsField= vasChildField[i];
    if (PF.ltrim(vsField)== "") continue;

    var voCell= this.getHeadCell(vsField);
    if (voCell!= null){
      vaoChildCell[vaoChildCell.length]= voCell;
    }else{
      var voPCell= this.getHeadParentCell(vsField);
      if (voPCell!= null){
        if (voPCell.aoChildCell!= null){
          vaoChildCell= vaoChildCell.concat(voPCell.aoChildCell)
        }else {
          var vaoChildCellX= this.addHeadChildCellToParent(voPCell);
          //voPCell.aoChildCell= vaoChildCellX;
          vaoChildCell= vaoChildCell.concat(vaoChildCellX);
        }
      }
    }
  }

  oParentCell.aoChildCell= vaoChildCell;
  return vaoChildCell;
}
//----------------------------------------------------------------------
//public; 设置指定的列是否可见.
//return: void;
function Grid_setColVisible(sFieldName, tIsVisible){
  if (this.tHasInit== false) return;
  if (this.isValidFieldName(sFieldName)== false) return;
  if (tIsVisible== null) tIsVisible= true;
  tIsVisible= PF.parseBool(tIsVisible);
  if (this.isColVisible(sFieldName)== tIsVisible) return;

  //根据列显示或隐藏操作,对父单元格进行处理;
  this.setColVisibleToParent(sFieldName,tIsVisible);

  //使用<col>实现对更的隐藏/显示;
  var voHeadCol= this.oHeadColGroup.all(this.getColID(sFieldName));
  voHeadCol.style.display= (tIsVisible)? "": "none";

  var voBodyCol= this.oBodyColGroup.all(this.getColID(sFieldName));
  voBodyCol.style.display= (tIsVisible)? "": "none";

  var voLockHeadCol= this.oLockHeadColGroup.all(this.getColID(sFieldName));
  voLockHeadCol.style.display= (tIsVisible)? "": "none";

  if (!PF.isEmpty(this.getSumFields()) && this.oSumRowColGroup!= null){
    var voSumRowCol= this.oSumRowColGroup.all(this.getColID(sFieldName));
    voSumRowCol.style.display= (tIsVisible)? "": "none";
  }

  this.adjustRepCell();
  this.adjustBodyTableImagePanel();

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnColVisibleChange)){
    this.eventAnswer_OnColVisibleChange(this, sFieldName, tIsVisible);
  }
  //向外发送事件; OnColVisibleChange
  this.fireEvent(this.OnColVisibleChange, new Array(this, sFieldName, tIsVisible));
  return;
}
//----------------------------------------------------------------------
//private; 设置指定的列父单元格的隐藏显示情况.
//属于 setColVisible() 方法的调用方法;
//return: void;
function Grid_setColVisibleToParent(sFieldName, tIsVisible){
  //alert(this.CLASSNAME+ ".setColVisibleToParent();");
  //根据列显示或隐藏操作,对父单元格进行处理;
  var voCell= this.getHeadCell(sFieldName);
  var viWidth= tIsVisible? voCell.offsetWidth: 0- voCell.offsetWidth;
  var voParentCell= null;
  var voRepCellTable= null;
  while(true){
    voParentCell= this.getHeadParentCell(voCell.parentcode);
    if (voParentCell== null) break;

    //如果隐藏/显示的字段所在单元格是父单元格的第一个单元格,
    //则要对父单元格进行 Replace Cell 处理;
    voRepCellTable= voParentCell.oRepCellTable;
    if (voParentCell.fieldname== sFieldName){
      if (voRepCellTable== null){
        voRepCellTable= this.oHeadRepCellTable.cloneNode(true);
        voParentCell.oRepCellTable= voRepCellTable;
        voRepCellTable.rows(0).cells(0).innerHTML= voParentCell.innerHTML;
        this.oHeadTablePanel.appendChild(voRepCellTable);

        voRepCellTable.oOuterObj= voParentCell;
        this.aoRepCellTable[this.aoRepCellTable.length]= voRepCellTable;
      }

      voRepCellTable.style.display= tIsVisible? "none": "";
      voRepCellTable.style.width= voParentCell.offsetWidth;
      voRepCellTable.style.visibility= "visible";
    }

    //如果有替换单元格;则要对替换单元格进行处理;
    if (voRepCellTable!= null
        && voRepCellTable.style.display!= "none"){

      //如果 Replace Cell 第一次被显示出来;
      if (voRepCellTable.offsetWidth== voParentCell.offsetWidth){
        var voRect= PF.getAbsRect(voParentCell, this.oHeadPanel);
        voRepCellTable.style.left= voRect.iLeft+ this.oBodyImagePanel.scrollLeft;
        voRepCellTable.style.top= voRect.iTop;
        voRepCellTable.style.height= voRect.iHeight;
        voRepCellTable.style.display= "";
      }

      //如果 Replace Cell 已被减小到不可见;
      if (voRepCellTable.style.visibility== "hidden"){
        voRepCellTable.style.visibility= "visible";
        voRepCellTable.style.width= viWidth;

      //否则,Replace Cell 正常减去指定字段所在列的列宽.
      }else{
        if (voRepCellTable.offsetWidth+ viWidth< 5){
          voRepCellTable.style.width= 1;
          voRepCellTable.style.visibility= "hidden";
        }else{
          voRepCellTable.style.width= Math.abs(voRepCellTable.offsetWidth+ viWidth);
        }
      }
    }
    voCell= voParentCell;
  }
  return;
}
//----------------------------------------------------------------------
//private; 列隐藏或显示后,对所有可见的 RepCellTable 的位置进行调整;
//return: 可见: true, 不可见: false;
function Grid_adjustRepCell(){
  var voRepCellTable= null;
  for (var i= 0, len= this.aoRepCellTable.length; i< len; i++){
    voRepCellTable= this.aoRepCellTable[i];
    if (voRepCellTable.style.display== "none"
        || voRepCellTable.style.visibility== "hidden") continue;

    voParentCell= voRepCellTable.oOuterObj;
    if (voParentCell.aoChildCell== null){
      this.addHeadChildCellToParent(voParentCell);
    }

    for (var j= 0, lenj= voParentCell.aoChildCell.length; j< lenj; j++){
      voCell= voParentCell.aoChildCell[j];
      if (this.getColByField(voCell.fieldname).style.display== "none") continue;
      var voRect= PF.getAbsRect(voCell, this.oHeadPanel);
      voRepCellTable.style.left= voRect.iLeft+ this.oBodyImagePanel.scrollLeft;
      break;
    }
  }
  return true;
}
//----------------------------------------------------------------------
//private; 列宽改变后,对所有相关的 RepCellTable 的位置进行调整;
//参数: oColWidthChangedCell: 列宽被改变的单元格;
//      iChangedWidth: 变动的宽度;
//return: 可见: true, 不可见: false;
function Grid_adjustRepCellAfterColWidthChanged(oColWidthChangedCell, iChangedWidth){
  if (oColWidthChangedCell== null) return true;
  if (iChangedWidth== null) return true;
  iChangedWidth= parseInt(iChangedWidth);
  if (iChangedWidth== 0) return true;

  var voRepCellTable= null;
  var voCell= oColWidthChangedCell;
  var voParentCell= null;
  while(true){
    voParentCell= this.getHeadParentCell(voCell.parentcode);
    voCell= voParentCell;
    if (voParentCell== null) break;
    voRepCellTable= voParentCell.oRepCellTable;
    if (voRepCellTable== null) continue;
    if (voRepCellTable.style.display== "none") continue;
    if (voRepCellTable.style.visibility== "hidden") continue;

    voRepCellTable.style.width= voRepCellTable.offsetWidth+ iChangedWidth;
  }

  this.adjustRepCell();
  return true;
}
//----------------------------------------------------------------------
//public; 判断指定的列是否可见.
//return: 可见: true, 不可见: false;
function Grid_isColVisible(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isColVisible");
  if (this.isValidFieldName(sFieldName)== false) return false;
  var voHeadCol= this.oHeadColGroup.all(this.getColID(sFieldName));
  var vtIsVisible= (voHeadCol.style.display== "none")? false: true;
  return vtIsVisible;
}
//----------------------------------------------------------------------
//public; 设置指定的行是否可见.
//return: void;
function Grid_setRowVisible(iRowIndex, tIsVisible){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setRowVisible");
  if (this.isValidRow(iRowIndex)== false) return;
  tIsVisible= PF.parseBool(tIsVisible);
  voRow= this.oBodyTable.rows(iRowIndex);
  voRow.style.display= (tIsVisible)? "": "none";
  voRow= this.oLockBodyTable.rows(iRowIndex);
  voRow.style.display= (tIsVisible)? "": "none";
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnRowVisibleChange)){
    this.eventAnswer_OnRowVisibleChange(this, iRowIndex, tIsVisible);
  }
  this.fireEvent(this.OnRowVisibleChange, new Array(this, iRowIndex, tIsVisible));
  return;
}
//----------------------------------------------------------------------
//public; 判断指定的行是否可见.
//return:可见: true, 不可见: false;
function Grid_isRowVisible(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isRowVisible");
  if (this.isValidRow(iRowIndex)== false) return false;
  voRow= this.oBodyTable.rows(iRowIndex);
  var vtIsVisible= (voRow.style.display== "none")? false: true;
  return vtIsVisible;
}
//----------------------------------------------------------------------
//public; 判断指定的行号是否有效.
//return:有效: true, 否则: false;
function Grid_isValidRow(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isValidRow");
  if (iRowIndex== null) return false;
  if (iRowIndex< 0 || iRowIndex>= this.getRowCount()) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 判断指定的列号是否有效.
//return:有效: true, 否则: false;
function Grid_isValidCol(iColIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isValidCol");
  if (iColIndex== null) return false;
  if (iColIndex< 0 || iColIndex>= this.getColCount()) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 判断指定的字段名是否有效.
//return:有效: true, 否则: false;
function Grid_isValidFieldName(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isValidFieldName");
  if (sFieldName== null) return false;
  if (sFieldName.length== 0) return false;
  var viCol= this.oFieldNameMap.get(sFieldName);//this.oParamFieldMap.get(sFieldName);
  if (viCol== null) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 设置列宽；
//return: void;
function Grid_setColWidth(sFieldName, iWidth){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setColWidth");
  if (this.isValidFieldName(sFieldName)== false) return;
  if (iWidth== null) iWidth= 0;
  if (iWidth< this.COL_WIDTH_MIN) iWidth= this.COL_WIDTH_MIN;
  if (iWidth> this.COL_WIDTH_MAX) iWidth= this.COL_WIDTH_MAX;
  var viOldWidth= this.getColWidth(sFieldName);
  if (iWidth== viOldWidth) return;

  var voHeadCol= this.oHeadColGroup.all(this.getColID(sFieldName));
  var viChangedWidth= parseInt(iWidth)- voHeadCol.offsetWidth;
  voHeadCol.style.width= iWidth;

  var voBodyCol= this.oBodyColGroup.all(this.getColID(sFieldName));
  voBodyCol.style.width= iWidth;

  var voLockHeadCol= this.oLockHeadColGroup.all(this.getColID(sFieldName));
  voLockHeadCol.style.width= iWidth;

  if (!PF.isEmpty(this.getSumFields()) && this.oSumRowColGroup!= null){
    var voSumRowCol= this.oSumRowColGroup.all(this.getColID(sFieldName));
    voSumRowCol.style.width= iWidth;
  }

  var voHeadCell= this.getHeadCell(sFieldName);
  this.adjustRepCellAfterColWidthChanged(voHeadCell, viChangedWidth);
  this.adjustBodyTableImagePanel();

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnColWidthChange)){
    this.eventAnswer_OnColWidthChange(this, sFieldName, iWidth, viOldWidth);
  }
  this.fireEvent(this.OnColWidthChange, new Array(this, sFieldName, iWidth, viOldWidth));
  return;
}
//----------------------------------------------------------------------
//public; 设置对象大小.
//return: void;
function Grid_setRect(oRect){
  this.oRect.iLeft= oRect.iLeft;
  this.oRect.iTop= oRect.iTop;
  this.oRect.iWidth= oRect.iWidth;
  this.oRect.iHeight= oRect.iHeight;

  this.oDefRect.iLeft= oRect.iLeft;
  this.oDefRect.iTop= oRect.iTop;
  this.oDefRect.iWidth= oRect.iWidth;
  this.oDefRect.iHeight= oRect.iHeight;

  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; 获取列宽;
//return:成功: 返回指定列的宽度, 失败: 返回 -1;
function Grid_getColWidth(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getColWidth");
  if (this.isValidFieldName(sFieldName)== false) return -1;
  var voHeadCol= this.oHeadColGroup.all(this.getColID(sFieldName));
  var viWidth= parseInt(voHeadCol.style.width);
  return viWidth;
}
//----------------------------------------------------------------------
//public; 设置列的对齐方式；
//return: void;
function Grid_setColAlign(sFieldName, sAlign){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setColAlign");
  if (this.isValidFieldName(sFieldName)== false) return;
  if (PF.isEmpty(sAlign)) sAlign= "auto";
  var voBodyCol= this.oBodyColGroup.all(this.getColID(sFieldName));
  if (voBodyCol== null) return;
  voBodyCol.style.textAlign= sAlign;
  return;
}
//----------------------------------------------------------------------
//public; 获取列的对齐方式；
//return: 成功: 水平对齐方式; 否则: null;
function Grid_getColAlign(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getColAlign");
  if (this.isValidFieldName(sFieldName)== false) return null;
  var voBodyCol= this.oBodyColGroup.all(this.getColID(sFieldName));
  if (voBodyCol== null) return null;
  return voBodyCol.style.textAlign;
}
//----------------------------------------------------------------------
//public; 设置指定表头的背景色.
//return: void;
function Grid_setHeadBackColor(sColor){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setHeadBackColor");
  this.oHeadTable.style.backgroundColor= sColor;
  this.oLockHeadTable.style.backgroundColor= sColor;
  return;
}
//----------------------------------------------------------------------
//public; 设置指定表头的前景色.
//return: void;
function Grid_setHeadForeColor(sColor){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setHeadForeColor");
  this.oHeadTable.style.color= sColor;
  this.oLockHeadTable.style.color= sColor;
  return;
}
//----------------------------------------------------------------------
//public; 设置指定行的背景色.
//return: void;
function Grid_setRowBackColor(iRowIndex, sBackColor, tIsKeep){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setRowBackColor");
  if (iRowIndex< 0 || iRowIndex> this.getRowCount()) return;
  var voRow= this.getRow(iRowIndex);
  if (voRow== null) return;
  if (tIsKeep== null) tIsKeep= true;
  voRow.style.backgroundColor= sBackColor;
  var voLockRow= this.oLockBodyTable.rows(iRowIndex);
  voLockRow.style.backgroundColor= sBackColor;
  if (tIsKeep){
    voRow.backcolor= sBackColor;
    voLockRow.backcolor= sBackColor;
  }
  return;
}
//----------------------------------------------------------------------
//private; 设置指定行的背景色.
//return: void;
function Grid_setCurRowBackColor(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setCurRowBackColor");
  if (this.isLightRow()== false) return;
  if (this.tIsFocus) this.setRowBackColor(this.iCurRow, this.ROW_BACK_COLOR_SELECT_LIGHT, false);
  else this.setRowBackColor(this.iCurRow, this.ROW_BACK_COLOR_SELECT_DARK, false);
  return;
}
//----------------------------------------------------------------------
//private; 设置指定行的背景色.
//return: void;
function Grid_setCurRowForeColor(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setCurRowBackColor");
  if (this.isLightRow()== false) return;
  if (this.tIsFocus) this.setRowForeColor(this.iCurRow, this.ROW_FORE_COLOR_SELECT, false);
  else this.setRowForeColor(this.iCurRow, this.ROW_FORE_COLOR_NORMAL, false);
  return;
}
//----------------------------------------------------------------------
//public; 获取指定行的背景色.
//return: 成功: 背景颜色字符串, 失败: null;
function Grid_getRowBackColor(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  if (iRowIndex< 0 || iRowIndex> this.getRowCount()) return null;
  var voRow= this.getRow(iRowIndex);
  if (voRow== null) return;
  var vsColor= voRow.backcolor;
  if (vsColor== null) vsColor= this.ROW_BACK_COLOR_NORMAL;
  return vsColor;
}
//----------------------------------------------------------------------
//public; 设置指定行的前景色.
//return: void;
function Grid_setRowForeColor(iRowIndex, sForeColor, tIsKeep){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  if (iRowIndex< 0 || iRowIndex> this.getRowCount()) return;
  var voRow= this.getRow(iRowIndex);
  if (voRow== null) return;
  if (tIsKeep== null) tIsKeep= true;
  voRow.style.color= sForeColor;
  var voLockRow= this.oLockBodyTable.rows(iRowIndex);
  voLockRow.style.color= sForeColor;
  if (tIsKeep){
    voRow.forecolor= sForeColor;
    voLockRow.forecolor= sForeColor;
  }
  return;
}
//----------------------------------------------------------------------
//public; 获取指定行的前景色.
//return: 成功: 前景颜色字符串, 失败: null;
function Grid_getRowForeColor(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getRowForeColor");
  if (iRowIndex< 0 || iRowIndex> this.getRowCount()) return null;
  var voRow= this.getRow(iRowIndex);
  if (voRow== null) return;
  var vsColor= voRow.forecolor;
  if (vsColor== null) vsColor= this.ROW_FORE_COLOR_NORMAL;
  return vsColor;
}
//----------------------------------------------------------------------
//public; 填充行的背景色.用 ROW_BACK_COLOR_LIGHT 和 ROW_BACK_COLOR_DARK 进行填充。
//return:成功: true, 失败: false;
function Grid_fillRowBackColor(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "fillRowBackColor");

  for (var i= 0, len= this.getRowCount(); i< len; i++){
    this.setRowBackColor(i, this.getRowBackColor(i));
  }
  return true;
}
//----------------------------------------------------------------------
//private; 获取指定行的背景色;
//return: 成功: 返回 ROW_BACK_COLOR_LIGHT 或 ROW_BACK_COLOR_DARK, 失败: "";
function Grid_getRowBackColor(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getRowBackColor");

  var vsBackColor= "";
  if (iRowIndex== 2* parseInt(iRowIndex/ 2)) vsBackColor= this.ROW_BACK_COLOR_LIGHT;
  else vsBackColor= this.ROW_BACK_COLOR_DARK;
  return vsBackColor;
}
//----------------------------------------------------------------------
//public; 获取当前表的有效的 FieldName 数组.
//return: 成功: this.asFieldName, 失败: null;
function Grid_getFieldNames(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getFieldNames");
  return this.asFieldName;
}
//----------------------------------------------------------------------
//public; 获取当前表的caption.
//return: 成功: caption数组, 失败: null;
function Grid_getFieldCaptions(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getFieldNames");
  var vasResult = new Array();
  var vsCaption;
  for(var i=0,j=this.asFieldName.length;i<j;i++){
  	vsCaption = this.getFieldCaption(this.asFieldName[i]);
  	vasResult[i] = vsCaption;
  }
  return vasResult;
}
//----------------------------------------------------------------------
//public; 通过列号获取字段名.
//return:成功: 字段名, 失败: null;
function Grid_getFieldNameByCol(iColIndex){
  if (this.tHasInit== false) return null;
  if (this.isValidCol(iColIndex)== false) return null;
  if (iColIndex< 0) return null;
  var vsFieldName= this.asFieldName[iColIndex];
  return vsFieldName;
}
//----------------------------------------------------------------------
//public; 通过字段名获取列号.
//return:成功: 列号, 失败: -1;
function Grid_getColIndexByField(sFieldName){
  if (sFieldName== null || sFieldName.length== 0) return -1;
  var viColIndex= this.oFieldNameMap.get(sFieldName);
  if (viColIndex== null) return -1;
  return viColIndex;
}
//----------------------------------------------------------------------
//public; 通过行列号获取指定单元格的值.
//不影响 this.oRS 的当前行;是从 PageDataXML 中取值;
//return:成功: 单元格的值, 失败: null;
function Grid_getValueByRC(iRowIndex, iColIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getValueByRC");
  if (this.isValidCol(iColIndex)== false) return null;
  if (iColIndex< 0) return null;

  var vsFieldName= this.getFieldNameByCol(iColIndex);
  var vsValue= this.getValueByRowField(iRowIndex, vsFieldName);
  return vsValue;
}
//----------------------------------------------------------------------
//public; 通过行列号获取指定单元格的值.
//不影响 this.oRS 的当前行;是从 PageDataXML 中取值;
//return:成功: 单元格的值, 失败: null;
function Grid_getValueByRowField(iRowIndex, sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getValueByRC");
  if (this.isValidRow(iRowIndex)== false) return null;
  if (this.isValidFieldName(sFieldName)== false) return null;
  var vsValue= DataTools.getValue(this.getTableName(), this.getDataRowX(iRowIndex), sFieldName);
  return vsValue;
}
//----------------------------------------------------------------------
//public; 获取当前行中指定字段的值.
//不影响 this.oRS 的当前行;是从 PageDataXML 中取值;
//return:成功: 单元格的值, 失败: null;
function Grid_getValue(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getValue");
  var vsValue= this.getValueByRowField(this.getCurRowIndex(), sFieldName);
  return vsValue;
}
//----------------------------------------------------------------------
//public; 获取指定单元格的值;
//return:成功: 单元格的值, 失败: null;
function Grid_getValueByCell(oCell){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getValueByCell");
  if (oCell== null || oCell.nodeName!= "TD" || oCell.parentNode== null) return null;
  var viRowIndex= this.getRowIndexByCell(oCell);
  var viColIndex= this.getColIndexByCell(oCell);
  var vsValue= this.getValueByRC(viRowIndex, viColIndex);
  return vsValue;
}
//----------------------------------------------------------------------
//public; 获取指定单元格所在的列号;
//这个方法要尽可能的少用,因为效率不高;
//return:成功: 列号, 失败: -1;
function Grid_getColIndexByCell(oCell){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getColIndexByCell");
  if (oCell== null || oCell.nodeName!= "TD" || oCell.parentNode== null) return -1;
  var viColIndex= -1;
  var voRow= oCell.parentNode;
  for (var i= 0, len= voRow.cells.length; i< len; i++){
    if (voRow.cells(i)== oCell) {viColIndex= i; break;}
  }
  if (voRow.parentNode.parentNode== this.oLockBodyTable){
    if (this.isExistCheck()) viColIndex--;
  }
  return viColIndex;
}
//----------------------------------------------------------------------
//public; 获取指定单元格所在的行号;
//return:成功: 行号, 失败: -1;
function Grid_getRowIndexByCell(oCell){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getRowIndexByCell");
  if (oCell== null || oCell.nodeName!= "TD" || oCell.parentNode== null) return -1;
  return oCell.parentNode.rowIndex;
}
//----------------------------------------------------------------------
//public; 获取指定行组的值集;
//return:成功: axxsValue, 失败: null;
function Grid_getRowValue(aiRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getRowValue");
  if (PF.isValidArray(aiRowIndex)== false) return null;

  var vaxxsValue= new Array();
  var viRow= -1;
  var vsFieldName= "";
  for (var i= 0, rows= aiRowIndex.length; i< rows; i++){
    viRow= aiRowIndex[i];
    vaxxsValue[i]= new Array();
    for (var j= 0, cols= this.asFieldName.length; j< cols; j++){
      vsFieldName= this.asFieldName[j];
      vaxxsValue[i][j]= this.getValueByRowField(viRow, vsFieldName);
    }
  }
  return vaxxsValue;
}
//----------------------------------------------------------------------
//public; 获取指定行号列号的单元格对象;
//return: 成功: 单元格对象, 失败: null;
function Grid_getCell(iRowIndex, iColIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getCell");
  var voRow= this.getRow(iRowIndex);
  if (voRow== null) return null;
  if (this.isValidCol(iColIndex)== false) return null;
  var voCurCell= voRow.cells(iColIndex);
  return voCurCell;
}
//----------------------------------------------------------------------
//public; 获取指定列的列对象;
//return: 成功: <col>, 失败: null;
function Grid_getCol(iColIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getCol");
  if (this.isValidCol(iColIndex)== false) return null;
  var voCol= this.oBodyColGroup.childNodes[iColIndex];
  return voCol;
}
//----------------------------------------------------------------------
//public; 获取指定列的列对象;
//return: 成功: <col>, 失败: null;
function Grid_getCols(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getCols");
  var vaoCol= this.oBodyColGroup.childNodes;
  return vaoCol;
}
//----------------------------------------------------------------------
//public; 获取指定列的列对象;
//return: 成功: <col>, 失败: null;
function Grid_getColByField(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getColByField");
  var viCol= this.getColIndexByField(sFieldName);
  var voCol= this.getCol(viCol);
  return voCol;
}
//----------------------------------------------------------------------
//public; 获取指定行的行对象;
//return: 成功: 行, 失败: null;
function Grid_getRow(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getRow");
  if (this.isValidRow(iRowIndex)== false) return null;
  var voRow= this.oBodyTable.rows(iRowIndex);
  return voRow;
}
//----------------------------------------------------------------------
//public; 获取当前行;
//return:成功: 当前行, 失败: null;
function Grid_getCurRow(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getCurRow");
  var voRow= this.getRow(this.getCurRowIndex());
  return voRow;
}
//----------------------------------------------------------------------
//private; 获取当前行;
//return:成功: 当前行, 失败: null;
function Grid_getCurCell(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getCurCell");
  var voCell= this.getCell(this.iCurRow, this.iCurCol);
  return voCell;
}
//----------------------------------------------------------------------
//private; 获取当前单元格的列号;
//return:成功: 当前单元格的列号, 失败: -1;
function Grid_getCurColIndex(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getCurColIndex");
  return parseInt(this.iCurCol);
}
//----------------------------------------------------------------------
//public; 获取当前行的行号;
//return: 成功: 当前行的行号, 失败: -1;
function Grid_getCurRowIndex(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  return this.iCurRow;
}
//----------------------------------------------------------------------
//public; 设置当前行;
//return: void;
function Grid_setCurRow(iRowIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setCurRow");
  if (this.getRowCount()< 0){
    this.iCurRow= -1;
    return;
  }
  if (this.isValidRow(iRowIndex)== false) return;
  if (iRowIndex== this.iCurRow) return;

  //恢复原当前行的背景色;
  var voCurRow= this.getCurRow();
  if (voCurRow!= null){
    this.setRowBackColor(this.iCurRow, voCurRow.backcolor== null? this.ROW_BACK_COLOR_NORMAL: voCurRow.backcolor, false);
    this.setRowForeColor(this.iCurRow, voCurRow.forecolor== null? this.ROW_FORE_COLOR_NORMAL: voCurRow.forecolor, false);

    //事件快速响应通道,仅供继承类使用;
    if (PF.isExistMethodK(this.eventAnswer_OnOutRow)){
      this.eventAnswer_OnOutRow(this, voCurRow);
    }
    //向外发送事件;
    this.fireEvent(this.OnOutRow, new Array(this, voCurRow));
  }

  //将新的行作为当前行;
  this.iCurRow= iRowIndex;
  if (this.isLightRow()){
    this.setCurRowBackColor();
    this.setRowForeColor(this.iCurRow, this.ROW_FORE_COLOR_SELECT, false);
  }

  if (this.oPagination!= null) this.oPagination.setCurRow(iRowIndex);

  //事件快速响应通道,仅供继承类使用;
  var voNewRow= this.getCurRow();
  if (PF.isExistMethodK(this.eventAnswer_OnEnterRow)){
    this.eventAnswer_OnEnterRow(this, voNewRow, voCurRow);
  }
  //向外发送事件;
  this.fireEvent(this.OnEnterRow, new Array(this, voNewRow, voCurRow));
  return;
}
//----------------------------------------------------------------------
//private; 设置当前单元格;
//return: void;
function Grid_setCurCell(iRowIndex, iColIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setCurRow");
  if (this.isValidRow(iRowIndex)== false) return;
  if (this.isValidCol(iColIndex)== false) return;
  var voCol= this.getCol(iColIndex);
  if (PF.parseBool(voCol.isboxvisible)== false){
    if (this.iCurCol>= 0) iColIndex= this.iCurCol;
  }

  var voCurCell= this.getCurCell();
  if (voCurCell!= null){
    //事件快速响应通道,仅供继承类使用;
    if (PF.isExistMethodK(this.eventAnswer_OnOutCell)){
      this.eventAnswer_OnOutCell(this, voCurCell);
    }
    //向外发送事件;
    this.fireEvent(this.OnOutCell, new Array(this, voCurCell));
  }

  this.setCurRow(iRowIndex);
  this.iCurCol= parseInt(iColIndex);
  var voNewCell= this.getCurCell();
  this.adjustCellToView(voNewCell);

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnEnterCell)){
    this.eventAnswer_OnEnterCell(this, voNewCell, voCurCell);
  }
  //向外发送事件;
  this.fireEvent(this.OnEnterCell, new Array(this, voNewCell, voCurCell));
  return;
}
//----------------------------------------------------------------------
//private; 移动移动输入框到当前单元格;
//return: void;
function Grid_adjustCellToView(oCell){
  if (oCell== null) return;
  var voRect= PF.getAbsRect(oCell, this.oBodyTable);
  if (voRect== null) return;

  var viSumRowHeight= 0;
  if (this.iSumRowX>= 0){
    viSumRowHeight+= this.getRowHeight();
  }
  if (this.iTotalRowX>= 0){
    viSumRowHeight+= this.getRowHeight();
  }
  var viLeftOffset= this.SELECT_CHECK_COL_WIDTH;
  if (this.isExistCheck()== false) viLeftOffset= 0;

  var viScrollLeft= this.oBodyImagePanel.scrollLeft;
  var viGapRight= voRect.iLeft+ voRect.iWidth+ viLeftOffset- this.oBodyImagePanel.clientWidth;
  var viGapBottom= voRect.iTop+ voRect.iHeight- this.oBodyImagePanel.clientHeight;

  if (viGapRight- this.oBodyImagePanel.scrollLeft> 0){
    this.oBodyImagePanel.scrollLeft= viGapRight;
  }
  if (viGapBottom- this.oBodyImagePanel.scrollTop+ viSumRowHeight> 0){
    this.oBodyImagePanel.scrollTop= viGapBottom+ viSumRowHeight;
  }
  if (voRect.iLeft- viScrollLeft< 0){
    this.oBodyImagePanel.scrollLeft= voRect.iLeft- 1;
  }
  if (voRect.iTop- this.oBodyImagePanel.scrollTop< 0){
    this.oBodyImagePanel.scrollTop= voRect.iTop;
  }
  return;
}
//----------------------------------------------------------------------
//public; 获取总行数;
//return: 成功: 行数, 失败: -1;
function Grid_getRowCount(){
  if (this.oBodyTable== null) return 0;
  var viRowCount= this.oBodyTable.rows.length;
  return viRowCount;
}
//----------------------------------------------------------------------
//public; 获取总列数;
//return:成功: 列数, 失败: -1;
function Grid_getColCount(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
  if (this.asFieldName== null) return 0;
  var viColCount= this.asFieldName.length;
  return viColCount;
}
//----------------------------------------------------------------------
//public; 设置锁定列;每次锁定都是从 0 列到 this.sLockedFieldName 列全部锁定,
//而每次新的锁定建立前,都要全部或部分撤消旧的锁定.
//Grid 中默认情况下都会对第 0 列进行锁定,如果 sFieldName== null,则将撤消全部的锁定.
//return: void;
function Grid_setLockedCol(sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setLockedCol");
  if (PF.isEmpty(sFieldName)) sFieldName= "";
  sFieldName= PF.trim(sFieldName);
  if (this.isValidFieldName(sFieldName)== false && sFieldName!= "") return;
  if (this.sLockedFieldName== sFieldName) return;
  this.sLockedFieldName= sFieldName;
  this.iLockedCol= this.getColIndexByField(this.sLockedFieldName);
  var viPageSize= -1;
  if (this.oPagination!= null) viPageSize= this.oPagination.getPageSize();
 	this.prepareMakeBodyRow(this.iFromRow, viPageSize);
  this.oLockBodyTablePanel.innerHTML= this.makeBodyByOcx(false);
  this.initBodyTable();
  if (!PF.isEmpty(this.getSumFields())){
    this.oLockSumRowTablePanel.innerHTML= this.makeLockedSumBody();
    this.initSumTable();
    this.refreshSumRow();
  }
  this.resize();
  this.setCurCell(this.iCurRow, this.iCurCol);
  //this.recordProp();

  //向外发送事件; OnColLocked / OnColUnlocked;
  if (this.iLockedCol>= 0){
    if (PF.isExistMethodK(this.eventAnswer_OnColLocked)){
      this.eventAnswer_OnColLocked(this, sFieldName);
    }
    this.fireEvent(this.OnColLocked, new Array(this, sFieldName));
  }else{
    if (PF.isExistMethodK(this.eventAnswer_OnColUnlocked)){
      this.eventAnswer_OnColUnlocked(this);
    }
    this.fireEvent(this.OnColUnlocked, new Array(this));
  }
  return;
}

function Grid_makeLockedSumBody(){
  vsStyle= "";
  vsBorderColor= this.getInnerLineColor();
  if (this.tHasLoadedInitData){
    vsStyle= this.oLockBodyTable.currentStyle.cssText;
    vsBorderColor= this.oLockBodyTable.borderColor;
  }
  var voBuf= new StringBuffer();
  if (PF.isEmpty(vsStyle)){
    voBuf.append("<table id='BodyTable' "+ this.oOuterPanel.bodytableclassandstyle+ "' cellpadding='0px'  cellspacing='0px' border='1px' bordercolor='"+ vsBorderColor+ "'>");
  }else{
    voBuf.append("<table id='BodyTable' style='"+ vsStyle+ "' cellpadding='0px'  cellspacing='0px' border='1px' bordercolor='"+ vsBorderColor+ "'>");
  }

  voBuf.append(this.makeBodyColGroup(false));
  voBuf.append("<tbody>\n");
  voBuf.append("<tr style='height:20px;'>");
	voBuf.append("<td class='clsCHKCell4'><input type='checkbox' class='clsCHK4' name='' tabindex='-100'></td>");
	for (var i = 0; i<= this.iLockedCol; i++){
		voBuf.append("<td class='clsGridBodyCell4' UNSELECTABLE='on'>&nbsp;</td>");
  }
  voBuf.append("</tr>");
  voBuf.append("</tbody>\n");
  voBuf.append("</table>\n");
  return voBuf.toString();
}

//----------------------------------------------------------------------
//public; 获取锁定的字段名;
//return:成功: 锁定的终止字段名, 失败: null;
function Grid_getLockedCol(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getLockedCol");
  return this.sLockedFieldName;
}
//----------------------------------------------------------------------
//public; 获取选中的行号组.
//return: 成功: aiRowIndex, 失败: null;
function Grid_getSelectedRowIndexs(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getSelectedRowIndexs");

  var vaiRowIndex= new Array();
  var voRow= null;
  var voCheckBox= null;

  for (var i= 0, len= this.getRowCount(); i< len; i++){
    voRow= this.oLockBodyTable.rows(i);
    if (voRow== null) continue;
    voCheckBox= voRow.firstChild.firstChild;
    if (voCheckBox== null || voCheckBox.nodeName!= "INPUT") continue;
    if (voCheckBox.checked) vaiRowIndex[vaiRowIndex.length]= voRow.rowIndex;
  }

  return vaiRowIndex;
}
//----------------------------------------------------------------------
//public; 判断指定行是否为选中行;
//return:成功: true, 失败: false;
function Grid_isSelectedRow(iRow){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isSelectedRow");
  if (this.isValidRow(iRow)== false) return false;
  var voRow= this.oLockBodyTable.rows(iRow);
  if (voRow== null) return false;
  var voCheckBox= voRow.firstChild.firstChild;
  if (voCheckBox== null || voCheckBox.nodeName!= "INPUT") return false;
  return voCheckBox.checked;
}
//----------------------------------------------------------------------
//public; 判断全选框是否被选中;
//return:成功: true, 失败: false;
function Grid_isAllSelBoxChecked(iRow){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isSelectedRow");
  if (this.oSelectAllCheckBox== null) return false;
  return this.oSelectAllCheckBox.checked;
}
//----------------------------------------------------------------------
//public; 根据行号组设置选中行.
//return:成功: true, 失败: false;
function Grid_selectRows(aiRow, tIsSelected){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "selectRow");
  if (PF.isValidArray(aiRow)== false) return false;
  if (tIsSelected== null) tIsSelected= true;
  tIsSelected= PF.parseBool(tIsSelected);

  var voRow= null;
  var voCheckBox= null;
  for (var i= 0, len= aiRow.length; i< len; i++){
    voRow= this.oLockBodyTable.rows[aiRow[i]];
    if (voRow== null) continue;
    voCheckBox= voRow.firstChild.firstChild;
    if (voCheckBox== null || voCheckBox.nodeName!= "INPUT") continue;
    voCheckBox.checked= tIsSelected;
    voBodyRow= this.oBodyTable.rows[aiRow[i]];

    //事件快速响应通道,仅供继承类使用;
    if (PF.isExistMethodK(this.eventAnswer_OnRowSelected)){
      this.eventAnswer_OnRowSelected(this, voBodyRow, tIsSelected);
    }
    //向外发送事件; OnRowSelected
    this.fireEvent(this.OnRowSelected, new Array(this, voBodyRow, tIsSelected));
  }
  return true;
}
//----------------------------------------------------------------------
//public; 选中当前页的所有行.
//return:成功: true, 失败: false;
function Grid_selectAllRow(tIsSelected){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "selectAllRow");
  this.oSelectAllCheckBox.checked= tIsSelected;
  this.oSelectAllCheckBox.fireEvent("onclick");
  this.fireEvent(this.OnAllRowSelected, new Array(this,tIsSelected));
  return true;
}
//----------------------------------------------------------------------
//public; 删除指定的行;
//return:成功: true, 失败: false;
function Grid_deleteRow(iRowIndex){
  return this.deleteRowK(iRowIndex);
}
//----------------------------------------------------------------------
//public; 删除指定的行;
//return:成功: true, 失败: false;
function Grid_deleteRowK(iRowIndex, iRowIdStartRow, tIsDisposeCurRow){
  if (this.tHasInit== false) return false;
  if (this.isReadOnly()) return false;
  if (this.isValidRow(iRowIndex)== false){
    iRowIndex= this.getCurRowIndex();
    if (this.isValidRow(iRowIndex)== false) return false;
  }
  if (iRowIdStartRow== null) iRowIdStartRow= -1;
  if (tIsDisposeCurRow== null) tIsDisposeCurRow= true;

  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeDeleteRow)){
    this.eventAnswer_OnBeforeDeleteRow(this, iRowIndex);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeDeleteRow, new Array(this, iRowIndex));
  if (this.isAbortEvent()) return false;

  var voRS= DataTools.getRecordset(this.getTableName());
  voRS.MoveFirst();
  voRS.Move(this.getDataRowX(iRowIndex), DataTools.RS_BOOK_MARK_FIRST);
  voRS.Delete();
  this.deleteRowFromGrid(iRowIndex);

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterDeleteRow)){
    this.eventAnswer_OnAfterDeleteRow(this, iRowIndex);
  }
  this.fireEvent(this.OnAfterDeleteRow, new Array(this, iRowIndex));
  if (iRowIdStartRow>= 0){
    this.fillRowId(iRowIdStartRow);
  }
  if (tIsDisposeCurRow){
    this.disposeNewCurRow();
  }
  return true;
}
//----------------------------------------------------------------------
//private;
//return: row index / -1;
function Grid_getNewCurRow(){
  if (this.tHasInit== false) return -1;
  var viNewRow= this.iCurRow;
  if (this.getRowCount()> 0){
    if (viNewRow>= this.getRowCount()) viNewRow= this.getRowCount()- 1;
    if (viNewRow< 0) viNewRow= 0;
  }else{
    viNewRow= -1;
  }
  return viNewRow;
}
//----------------------------------------------------------------------
//private;
//return: void;
function Grid_disposeNewCurRow(){
  if (this.tHasInit== false) return;
  var viNewRow= this.getNewCurRow();
  this.iCurRow= -1;
  this.setCurRow(viNewRow);
}
//----------------------------------------------------------------------
//private; 删除指定的行;
//return:成功: true, 失败: false;
function Grid_deleteRowFromGrid(iRowIndex){
  this.oLockBodyTable.deleteRow(iRowIndex);
  this.oBodyTable.deleteRow(iRowIndex);
  this.adjustBodyTableImagePanel(); //调整 BodyTableImagePanel;
  return true;
}
//----------------------------------------------------------------------
//public; 删除多行.
//return:成功: true, 失败: false;
function Grid_deleteRows(aiRowIndex){
  if(aiRowIndex == null){
  	var viRowCount = this.getRowCount();
  	if(viRowCount == 0) return;
  	aiRowIndex = new Array();
  	for(var i = 0; i < viRowCount; i++){
  	  aiRowIndex[i] = i;	
  	}
  }
  return this.deleteRowsK(aiRowIndex, false);
}
//----------------------------------------------------------------------
//public; 删除多行.
//return:成功: true, 失败: false;
function Grid_deleteRowsK(aiRowIndex, tIsProcess){
  if (this.tHasInit== false) return false;
  if (this.isReadOnly()) return false;
  if (PF.isValidArray(aiRowIndex)== false) return true;
  if (tIsProcess== null) tIsProcess= false;

  //向外发送事件; OnBeforeDeleteRows
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeDeleteRows)){
    this.eventAnswer_OnBeforeDeleteRows(this, aiRowIndex);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeDeleteRows, new Array(this, aiRowIndex));
  if (this.isAbortEvent()) return false;

  aiRowIndex.sort(PF.compareInt);
  if (tIsProcess){
    PageX.process(true, false);
  }
  var viNum= 0;
  for (var i= 0, len= aiRowIndex.length; i< len; i++){
    if (i== len- 1){
      if (this.deleteRowK(aiRowIndex[i]- viNum, aiRowIndex[0], true)) viNum++;
    }else{
      if (this.deleteRowK(aiRowIndex[i]- viNum, -1, false)) viNum++;
    }
    if (PageX.oProcessbar!= null){
      PageX.oProcessbar.setValue(i/(len- 1)*100);
    }
  }
  if (tIsProcess)
    PageX.closeProcess();

  //向外发送事件; OnAfterDeleteRows
  if (PF.isExistMethodK(this.eventAnswer_OnAfterDeleteRows)){
    this.eventAnswer_OnAfterDeleteRows(this, aiRowIndex);
  }
  this.fireEvent(this.OnAfterDeleteRows, new Array(this, aiRowIndex));
  
  this.disposeNewCurRow();
  return true;
}
//----------------------------------------------------------------------
//public; 删除所有的选中行.
//return:成功: true, 失败: false;
function Grid_deleteSelectedRows(tIsProcess){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "deleteSelectRows");

  var vaiRowIndex= this.getSelectedRowIndexs();
  var vtRet= this.deleteRowsK(vaiRowIndex, tIsProcess);
  return vtRet;
}
//----------------------------------------------------------------------
//private; 生成 字段相关的 Map 对象;
//return:成功: true, 失败: false;
function Grid_initFields(){
  //alert(this.CLASSNAME+ ".makeFieldMap();");
  var voCompoMeta= DataTools.getCompoMeta();
  if (voCompoMeta!= null){
    var voTable= voCompoMeta.selectSingleNode("tables//table[@name='"+ this.getTableName()+ "']");
    if (voTable!= null){
      this.sEffectField= PF.trim(voTable.getAttribute("effectfield"));
    }
  }

  this.asFieldName= new Array();
  this.oFieldNameMap.clear();
  var vsFieldName= "";
  var voCol= null;
  var voNoFieldMap= DataTools.getNoFieldMap();
  for (var i= 1, len= this.oHeadColGroup.childNodes.length; i< len; i++){
    voCol= this.oHeadColGroup.childNodes[i];
    vsFieldName= voCol.fieldname;
    if (voNoFieldMap!= null && voNoFieldMap.isContain(vsFieldName)){
      voCol.isallowinput= false;
    }
    if (PF.parseBool(voCol.isrowid) && vsFieldName!= this.sEffectField){
      this.sRowIdField= vsFieldName;
      voCol.isreadonly= true;
    }
    this.asFieldName[i- 1]= vsFieldName;
    this.oFieldNameMap.put(vsFieldName, i- 1);
  }
  return true;
}
//----------------------------------------------------------------------
//private; 生成 字段相关的 Map 对象;
//return:成功: true, 失败: false;
function Grid_initMeta(){
	for(var i=0,j=this.asFieldName.length; i<j; i++){
		this.oFieldNameMap.put(this.asFieldName[i],i);
	}
  return true;
}
//----------------------------------------------------------------------
//public; 生成 Grid 的 HTML DOM 对象；
//return:成功: true, 失败: false;
function Grid_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;

  this.oInnerPanel= this.oOuterPanel.all("InnerDiv");

  this.oBodyPanel= this.oInnerPanel.all("BodyDiv");
  this.oBodyTablePanel= this.oBodyPanel.all("BodyTableDiv");
  this.oBodyImagePanel= this.oInnerPanel.all("BodyImageDiv");
  this.oBodyTableImagePanel= this.oBodyImagePanel.all("BodyTableImageDiv");

  this.oLockBodyPanel= this.oInnerPanel.all("LockBodyDiv");
  this.oLockBodyTablePanel= this.oLockBodyPanel.all("LockBodyTableDiv");
  
  this.oSumRowPanel= this.oInnerPanel.all("Grid_SumRowDiv");
  this.oSumRowTablePanel= this.oSumRowPanel.all("Grid_SumRowTableDiv");
  this.oLockSumRowPanel= this.oInnerPanel.all("Grid_LockSumRowDiv");
  this.oLockSumRowTablePanel= this.oLockSumRowPanel.all("Grid_LockSumRowTableDiv");

  this.oActionButtonPanel= this.oOuterPanel.all("ActionButtonPanel");
  this.oActionButtonTable= this.oActionButtonPanel.all("ActionButtonTable");
  this.oAppendRowButton= this.oActionButtonPanel.all("AppendRowButton");
  this.oInsertRowButton= this.oActionButtonPanel.all("InsertRowButton");
  this.oDeleteRowButton= this.oActionButtonPanel.all("DeleteRowButton");
  this.oSavePropButton= this.oActionButtonPanel.all("SavePropButton");
  this.oDeletePropButton= this.oActionButtonPanel.all("DeletePropButton");
  this.oDefValSpan= this.oOuterPanel.all("FieldDefaultValueSpan");

  this.oUserDefinedButtonTable= this.oActionButtonPanel.all("UserDefinedButtonTable");
  if (this.oUserDefinedButtonTable!= null){
    for (var i= 0, len= this.oUserDefinedButtonTable.rows[0].cells.length; i< len; i++){
      var voBtn= this.oUserDefinedButtonTable.rows[0].cells[i].firstChild;
      if (voBtn== null) continue;
      if (voBtn.nodeName== "INPUT" && voBtn.type== "button"){
        voBtn.oOwner= this;
        voBtn.onclick= Grid_UserButtons_onclick;
        this.oUserBtnMap.put(voBtn.id, voBtn);
      }
    }
  }

  this.oNewPanel= this.oOuterPanel.all("NewDiv");
  this.oMoveLine= this.oOuterPanel.all("MoveLineDiv");
  this.oFocusStopInput= this.oOuterPanel.all("FocusStopInput");
  this.oPropXml= document.all(sId+ "_GridPropXML");
  this.initHead();
  this.initMeta();
  this.makePagination();
  var viPageSize= -1;
  if (this.oPagination!= null){
    viPageSize= this.oPagination.getPageSize();
  }

  this.oOuterPanel.oOwner= this;
  this.oInnerPanel.oOwner= this;
  this.oBodyPanel.oOwner= this;  //private; 表体面板.指 BodyDiv.
  this.oBodyImagePanel.oOwner= this;  //private; 表体面板.指 BodyDiv.
  this.oBodyTablePanel.oOwner= this;  //private; 表体的 <table>.
  this.oBodyTableImagePanel.oOwner= this; //private;
  this.oLockBodyPanel.oOwner= this; //private; 表体的锁定面板.
  this.oLockBodyTablePanel.oOwner= this;  //private;
  this.oMoveLine.oOwner= this; //private; 拖动行高或列宽时进行指示的移动线.
  this.oFocusStopInput.oOwner= this;
  this.oActionButtonPanel.oOwner= this;
  this.oAppendRowButton.oOwner= this;
  this.oInsertRowButton.oOwner= this;
  this.oDeleteRowButton.oOwner= this;
  this.oSavePropButton.oOwner= this;
  this.oDeletePropButton.oOwner= this;
  this.oActionButtonTable.oOwner= this;
  if (this.oDefValSpan!= null) this.oDefValSpan.oOwner= this;
  if (this.oUserDefinedButtonTable!= null) this.oUserDefinedButtonTable.oOwner= this;

  this.oBodyImagePanel.onmousedown= Grid_oBodyImagePanel_onmousedown;
  this.oBodyImagePanel.onscroll= Grid_oBodyImagePanel_onscroll;
  this.oOuterPanel.onmousemove= Grid_oOuterPanel_onmousemove;
  this.oOuterPanel.onmouseup= Grid_oOuterPanel_onmouseup;
  this.oOuterPanel.onfocus= Grid_oOuterPanel_onfocus;
  this.oOuterPanel.onblur= Grid_oOuterPanel_onblur;
  this.oBodyPanel.ondblclick= Grid_oBodyPanel_ondblclick;
  this.oLockBodyPanel.ondblclick= Grid_oLockBodyPanel_ondblclick;
  this.oSavePropButton.onclick= function(){this.oOwner.recordProp();};
  this.oDeletePropButton.onclick= function(){this.oOwner.deleteProp();};
  this.eventDispose_OnFocus();
  this.setRectWithOuterPanel();
  this.oDefRect.iLeft= this.oRect.iLeft;
  this.oDefRect.iTop= this.oRect.iTop;
  this.oDefRect.iWidth= this.oRect.iWidth;
  this.oDefRect.iHeight= this.oRect.iHeight;

  this.initBodyTable();
  this.initSumTable();
  return true;
}
//----------------------------------------------------------------------
//private;
//return: void;
function Grid_makePagination(){
  var voPagiDiv= this.oOuterPanel.all("PaginationConsoleDiv");
  if (voPagiDiv== null) return;
  this.oPagination= new PaginationConsole();
  this.oPagination.oOuterObj= this;
  this.oPagination.make(voPagiDiv);
  this.oPagination.setPagiAtClient(this.tIsPagiAtClient);
  //add by Bo
  this.oPagination.addListener(new Listener(this.oPagination.OnBeforeGo, Grid_oPagination_OnBeforeGo, this));
  this.oPagination.addListener(new Listener(this.oPagination.OnAfterGo, Grid_oPagination_OnAfterGo, this));
}
//----------------------------------------------------------------------
//private; 生成 Grid 的 HTML DOM 对象；
//return: void;
function Grid_initHead(){
  this.oHeadPanel= this.oInnerPanel.all("HeadDiv");
  this.oHeadTablePanel= this.oInnerPanel.all("HeadTableDiv");
  this.oMoveColPanel= this.oInnerPanel.all("HeadMoveColDiv");
  this.oMoveColTD= this.oInnerPanel.all("HeadMoveColTD");
  this.oLockHeadPanel= this.oInnerPanel.all("LockHeadDiv");
  this.oLockHeadTablePanel= this.oLockHeadPanel.all("LockHeadTableDiv");

  this.oHeadTable= this.oHeadPanel.all("HeadTable");
  this.oHeadRepCellTable= this.oHeadPanel.all("HeadRepCellTable");
  this.oLockHeadTable= this.oLockHeadPanel.all("HeadTable");

  this.oHeadColGroup= this.oHeadPanel.all("HeadColGroup");
  this.oLockHeadColGroup= this.oLockHeadPanel.all("HeadColGroup");
  this.oSelectAllCheckBox= this.oLockHeadTable.all(this.getHeadCellID(this.SELECT_CHECK_FIELD_NAME)).firstChild;

  this.oHeadPanel.oOwner= this;  //private; 表头面板.指 HeadDiv.
  this.oHeadTablePanel.oOwner= this;  //private; 表头面板.指 HeadTableDiv.
  this.oMoveColPanel.oOwner= this;
  this.oMoveColTD.oOwner= this;
  this.oHeadTable.oOwner= this;  //private; 表头的 <table>.
  this.oLockHeadPanel.oOwner= this; //private; 表头的锁定面板.
  this.oLockHeadTablePanel.oOwner= this;  //private; 表头面板.指 LockHeadTableDiv.
  this.oLockHeadTable.oOwner= this; //private; 表头的锁定<table>.
  this.oHeadColGroup.oOwner= this; //private;
  this.oLockHeadColGroup.oOwner= this; //private;
  this.oSelectAllCheckBox.oOwner= this; //private;

  this.oHeadTable.onmousemove= Grid_oHeadTable_onmousemove;
  this.oHeadTable.onmouseout= Grid_oHeadTable_onmouseout;
  this.oHeadTable.onmousedown= Grid_oHeadTable_onmousedown;
  this.oHeadTable.oncontextmenu= Grid_oHeadTable_oncontextmenu;
  //chupp;20061119; 平谷用户强烈要求增加该功能，等待雷工的确认
  //change by lcp 操作人员想拉动列宽，结果就变成排序了。结果之前整理好的数据就乱了。希望：双击鼠标才排序。
  //this.oHeadTable.onclick= Grid_oHeadTable_onclick;  
  this.oHeadTable.ondblclick= Grid_oHeadTable_onclick; 
  this.oLockHeadTable.oncontextmenu= Grid_oHeadTable_oncontextmenu;
  this.oSelectAllCheckBox.onclick= Grid_oSelectAllCheckBox_onclick;
  this.oHeadTablePanel.onmousemove= Grid_oHeadTablePanel_onmousemove;
  this.oMoveColPanel.onmouseup= Grid_oMoveColPanel_onmouseup;

  PF.setOpacity(this.oMoveColPanel, "#FF9933", 40, 40);
  return;
}
//----------------------------------------------------------------------
//private; 生成表体串;
//return:成功: 表体串, 失败: null;
function Grid_makeBody(iFromRow, tForBody){
  var voBuf= new StringBuffer();
  voBuf.append(this.makeBodyHead(tForBody));
  voBuf.append(this.makeBodyRow(iFromRow, tForBody)+ "\n");
  voBuf.append("</tbody>\n");
  voBuf.append("</table>\n");
  return voBuf.toString();
}

function Grid_makeBodyByOcx(tForBody){
  var voBuf= new StringBuffer();
  voBuf.append(this.makeBodyHead(tForBody));
  voBuf.append(this.makeBodyRowByOcx(tForBody)+ "\n");
  voBuf.append("</tbody>\n");
  voBuf.append("</table>\n");
  return voBuf.toString();
}

function Grid_makeBodyHead(tForBody){
  vsStyle= "";
  vsBorderColor= this.getInnerLineColor();
  if (this.tHasLoadedInitData){
    if (tForBody){
      vsStyle= this.oBodyTable.currentStyle.cssText;
      vsBorderColor= this.oBodyTable.borderColor;
    }else{
      vsStyle= this.oLockBodyTable.currentStyle.cssText;
      vsBorderColor= this.oLockBodyTable.borderColor;
    }
  }
  var voBuf= new StringBuffer();
  if (PF.isEmpty(vsStyle)){
    voBuf.append("<table id='BodyTable' "+ this.oOuterPanel.bodytableclassandstyle+ "' cellpadding='0px'  cellspacing='0px' border='1px' bordercolor='"+ vsBorderColor+ "'>");
  }else{
    voBuf.append("<table id='BodyTable' style='"+ vsStyle+ "' cellpadding='0px'  cellspacing='0px' border='1px' bordercolor='"+ vsBorderColor+ "'>");
  }

  if (this.tHasLoadedInitData){
    if (tForBody){
      voBuf.append(this.oBodyColGroup.outerHTML);
    }else{
      voBuf.append(this.makeBodyColGroup(tForBody));
    }
  }else{
    voBuf.append(this.makeBodyColGroup(tForBody));
  }
  voBuf.append("<tbody>\n");
  return voBuf.toString();
}

function Grid_getVSByFieldName(sFieldName){
	if (this.oVSSpan == null){
  	this.oVSSpan = this.oOuterPanel.all("ValueSetSpan");
	}
	return this.oVSSpan.all(sFieldName + "_VS");
}

function Grid_getFieldIndex(row){
	var aiFieldIndexes = new Array();
  for (var i= 0, len= this.asFieldName.length; i< len; i++){
  	aiFieldIndexes[i] = -1;
		for(var j=0, k =row.childNodes.length; j < k; j++){
			if (this.asFieldName[i] == row.childNodes[j].tagName){
				aiFieldIndexes[i] = j;
				break;
			}
		}
	}
	return aiFieldIndexes;
}
function Grid_prepareMakeBodyRow(iFromRow, iRowCount){
  var fieldnames = null;
  for (var i = 0,j = this.asFieldName.length; i<j; i++){
  	if (i == 0){
  		fieldnames = this.asFieldName[i];
  	}else{
  		fieldnames += "|" + this.asFieldName[i];
  	}
  }
  gridMaker.setIsExistCheck(this.isExistCheck());
  gridMaker.setValueSet(this.oOuterPanel.all("ValueSetSpan").outerHTML);
  gridMaker.setEffectField(this.sEffectField);
  gridMaker.setEffectPrefix(this.EFFECT_PREFIX);
  gridMaker.setFieldNames(fieldnames);

  if (iFromRow== null || iFromRow< 0) iFromRow= 0;
  var voTableData= DataTools.getTableData(this.getTableName());
  var dataCount = voTableData.childNodes[1].childNodes.length;  
  if (iFromRow + iRowCount > dataCount){
  	iRowCount = dataCount - iFromRow;
  }
  gridMaker.make(voTableData.xml,iFromRow,iRowCount,PF.trim(this.sLockedFieldName));
}
function Grid_makeBodyRowByOcx(tForBody){
  var s = null;
  if (tForBody){
		s = gridMaker.getBodyRowHtml();
	}else{
		s = gridMaker.getLockedBodyRowHtml();
	}
	return s;
}	
//----------------------------------------------------------------------
//private; 生成表体的 <tr> 串;
//params: iFromRow: 从 0 行开始;
//return:成功: 表体串, 失败: null;
function Grid_makeBodyRow(iFromRow, tForBody){
  if (iFromRow== null || iFromRow< 0) iFromRow= 0;
  var voTableData= DataTools.getTableData(this.getTableName());
  var voRow= voTableData.selectSingleNode("rowset").childNodes[iFromRow];
  var aiFieldIndexes = this.getFieldIndex(voRow);
  var voBuf= new StringBuffer();
  voBuf.append("<tr style='height:"+ this.getRowHeight()+ "px;'>\n");
  for (var l= 0, lenl= this.asFieldName.length; l< lenl; l++){
  	var vsValue = null;
    //在第一列加入 checkbox; 只在 LockBodyTable 上才加入;
	  var viEffectColX= DataTools.getFieldColX(this.getTableName(), this.sEffectField);
    if (tForBody== false && l== 0){
      if (viEffectColX< 0 || this.isExistCheck()== false){
        voBuf.append("<td class='clsCHKCell4'><input type='checkbox' class='clsCHK4' name='' tabindex='-100'></td>\n");
      }else{
			  var voCol= null;
        if (viEffectColX< voRow.childNodes.length){
        	voCol= voRow.childNodes[viEffectColX];
        }
        if (voCol== null || voCol.nodeName!= this.sEffectField){
          voCol= voRow.selectSingleNode(this.sEffectField);
        }
        if (voCol!= null){
        	vsValue= voCol.text;
        }else{
        	vsValue= "";
        }
        voBuf.append("<td class='clsCHKCell4'><input type='checkbox' class='clsCHK4' name='"+ this.EFFECT_PREFIX+ vsValue+ "' tabindex='-100'></td>\n");
      }
      if (this.sLockedFieldName== null || this.sLockedFieldName.length== 0) break;
    }

    if (aiFieldIndexes[l] >= 0){
   		vsValue= voRow.childNodes[aiFieldIndexes[l]].text;
  	}
    if (this.aiFieldVS[l]){
    	var vs = this.getVSByFieldName(this.asFieldName[l]);
    	vsValue= vs.getAttribute('a' + vsValue);
  	}else if (this.aiFieldVS[l] == undefined){
    	var vs = this.getVSByFieldName(this.asFieldName[l]);
      if (vs){
      	this.aiFieldVS[l] = true;
      	vsValue= vs.getAttribute('a' + vsValue);
      }else{
      	this.aiFieldVS[l] = false;
      }
    }
    if (vsValue== null || vsValue== "") vsValue= "&nbsp;";
    voBuf.append("<td class='clsGridBodyCell4' UNSELECTABLE='on'>"+ vsValue+ "</td>\n");

    //如是现在是生成锁定层的 BodyTable，则只生成到 this.sLockedFieldName 为止；
    if (tForBody== false && this.asFieldName[l] == this.sLockedFieldName) break;
  }
  voBuf.append("</tr>\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 生成<colGroup>串;
//return:成功: <colGroup>串, 失败: null;
function Grid_makeBodyColGroup(tForBody){
  var voBuf= new StringBuffer();
  voBuf.append("<colgroup id='BodyColGroup'>\n");

  //加入 checkbox 的 <col>;
  //只在 LockBodyTable 上才加入;
  if (tForBody== false){
    voBuf.append(this.oHeadColGroup.firstChild.outerHTML+ "\n");
  }

  var voCol= null;
  var vsCol= "";
  for (var i= 1, len= this.oHeadColGroup.childNodes.length; i< len; i++){
    if (tForBody== false
        && (this.sLockedFieldName== null
            || this.sLockedFieldName.length== 0)) break;
    if (tForBody== false && this.oBodyColGroup!= null){
      voCol= this.oBodyColGroup.childNodes[i- 1];
    }else{
      voCol= this.oHeadColGroup.childNodes[i];
    }
    vsCol= voCol.outerHTML;
    //vsCol= vsCol.substr(0, vsCol.length- 1)+ " style=''>";
    voBuf.append(vsCol.substr(0, vsCol.length- 1));
    voBuf.append(" style='");
    if (PF.isEmpty(voCol.align)){
      if (voCol.fieldtype== DataTools.DATA_TYPE_NUM){
        voBuf.append("text-align:right;");
      }
    }else{
      voBuf.append("text-align:"+ voCol.align+ ";");
    }
    voBuf.append("'>\n");
    //如是现在是生成锁定层的 BodyTable，则只生成到 this.sLockedFieldName 为止;
    if (tForBody== false && voCol.fieldname== this.sLockedFieldName) break;
  }

  voBuf.append("</colgroup>\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//public; 获取列头 <TD>;.
//return:成功: cell, 失败: null;
function Grid_getHeadCell(sFieldName){
  if (sFieldName== null || sFieldName.length== 0) return null;
  var vsCellID= this.getHeadCellID(sFieldName);
  if (vsCellID== null) return null;
  var voCell= this.oHeadTable.all(vsCellID);
  return voCell;
}
//----------------------------------------------------------------------
//private; 获取列头的父 <TD>;.
//return: 成功: cell, 失败: null;
function Grid_getHeadParentCell(sParentCode){
  if (sParentCode== null || sParentCode.length== 0) return null;
  var vsParentCellID= this.getHeadParentCellID(sParentCode);
  var voParentCell= this.oHeadTable.all(vsParentCellID);
  return voParentCell;
}
//----------------------------------------------------------------------
//private; 获取列头 <TD> 的id.
//return:成功: id, 失败: null;
function Grid_getHeadCellID(sFieldName){
  if (sFieldName== null || sFieldName.length== 0) return null;
  var vsCellID= sFieldName+ this.DOMID_SUFFIX_HEAD_CELL;
  return vsCellID;
}
//----------------------------------------------------------------------
//private; 获取列头 <TD> 的id.
//return:成功: id, 失败: null;
function Grid_getHeadParentCellID(sParentCode){
  var vsCellID= this.DOMID_PREFIX_PARENT_CELL+ sParentCode+ this.DOMID_SUFFIX_HEAD_CELL;
  return vsCellID;
}
//----------------------------------------------------------------------
//private; 根据列头 <TD> 的id. 获取 id 中所含的 code or fieldname;
//return:成功: id, 失败: null;
function Grid_getHeadCellCode(sHeadCellId){
  if (PF.isEmpty(sHeadCellId)) return "";
  var vsCode= "";
  if (sHeadCellId.indexOf(this.DOMID_PREFIX_PARENT_CELL)== 0){
    vsCode= sHeadCellId.substring(this.DOMID_PREFIX_PARENT_CELL.length, sHeadCellId.length- this.DOMID_SUFFIX_HEAD_CELL.length);
  }else{
    vsCode= sHeadCellId.substring(0, sHeadCellId.length- this.DOMID_SUFFIX_HEAD_CELL.length);
  }
  return vsCode;
}
//----------------------------------------------------------------------
//private; 获取列头 <colGroup> 中 <col> 的id.
//return:成功: id, 失败: null;
function Grid_getColID(sFieldName){
  if (sFieldName== null || sFieldName.length== 0) return null;
  var vsColID= sFieldName+ this.DOMID_SUFFIX_COL;
  return vsColID;
}
//----------------------------------------------------------------------
//private; 初始化风格;
//return: 成功:true; 否则:false;
function Grid_initStyle(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "initStyle");
  //this.setBodyBorderColor(this.sBodyBorderColor);
  return true;
}
//----------------------------------------------------------------------
//private; 响应 BodyPanel.onscroll 事件的处理方法.
//return: 成功: true, 失败: false;
function Grid_grid_BodyPanel_onscroll_Dispose(){
  if (this.oBodyPanel._iOffsetLeft== null) return;
  this.oHeadTablePanel.style.left= 0- this.oBodyImagePanel.scrollLeft;

  var viLeftOffset= this.SELECT_CHECK_COL_WIDTH;
  if (this.isExistCheck()== false) viLeftOffset= 0;
  this.oBodyTablePanel.style.left= 0- (this.oBodyImagePanel.scrollLeft+ (this.oBodyPanel._iOffsetLeft- viLeftOffset));
  this.oBodyTablePanel.style.top= 0- this.oBodyImagePanel.scrollTop;

	this.oLockBodyTablePanel.style.left= 0;
  this.oLockBodyTablePanel.style.top= 0- this.oBodyImagePanel.scrollTop;

  this.oSumRowTablePanel.style.left= this.oBodyTablePanel.style.left;
  this.oLockSumRowTablePanel.style.left= 0;
  return true;
}
//----------------------------------------------------------------------
//private; 获取可视的单元格;
//return: 成功: row index; 否则: -1;
function Grid_getVisibleRowX(iStep){
  var viNewRow= this.getCurRowIndex();
  if (this.isValidRow(viNewRow)== false) viCurRow= 0;
  if (this.isValidRow(viNewRow)== false) return -1;
  if (iStep== null || iStep== 0) return viNewRow;
  var viRowCount= this.getRowCount();
  while(true){
    viNewRow= viNewRow+ iStep;
    if (iStep< 0 && viNewRow< 0){
      viNewRow= this.getFirstVisibleRowX();
      break;
    }else if (iStep> 0 && viNewRow>= viRowCount){
      viNewRow= this.getLastVisibleRowX();
      break;
    }
    if (this.isRowVisible(viNewRow)) break;
  }
  return viNewRow;
}
//----------------------------------------------------------------------
//public; 获取可视的单元格;
//return: 成功: row index; 否则: -1;
function Grid_getFirstVisibleRowX(){
  var viRowCount= this.getRowCount();
  if (viRowCount<= 0) return -1;
  var viNewRow= 0;
  for (var i= 0; i< viRowCount; i++){
    viNewRow= i;
    if (this.isRowVisible(viNewRow)) break;
  }
  return viNewRow;
}
//----------------------------------------------------------------------
//public; 获取可视的单元格;
//return: 成功: row index; 否则: -1;
function Grid_getLastVisibleRowX(){
  var viRowCount= this.getRowCount();
  if (viRowCount<= 0) return -1;
  var viNewRow= 0;
  for (var i= viRowCount- 1; i>= 0; i--){
    viNewRow= i;
    if (this.isRowVisible(viNewRow)) break;
  }
  return viNewRow;
}
//----------------------------------------------------------------------
//private; 获取可视的单元格;
//return: 成功: Array(iRow, iCol); 否则: -1;
function Grid_getVisibleColX(iStep, tIsChangeRow){
  var viNewRow= this.getCurRowIndex();
  if (this.isValidRow(viNewRow)== false) viCurRow= 0;
  if (this.isValidRow(viNewRow)== false) return -1;
  var viNewCol= this.getCurColIndex();
  if (iStep== null || iStep== 0) return viNewCol;
  tIsChangeRow= PF.parseBool(tIsChangeRow);
  var viColCount= this.getColCount();
  while(true){
    viNewCol= viNewCol+ iStep;
    if (iStep< 0 && viNewCol< 0){
      viNewCol= this.getCurColIndex();
      break;
    }
    if (iStep> 0 && viNewCol>= viColCount){
      if (tIsChangeRow){
        viNewRow= this.getVisibleRowX(1);
        if (viNewRow!= this.getCurRowIndex()) viNewCol= 0;
        else viNewCol= this.getCurColIndex();
        tIsChangeRow= false;
      }else{
        viNewCol= this.getCurColIndex();
        break;
      }
    }
    var vsField= this.getFieldNameByCol(viNewCol);
    if (this.isColVisible(vsField)) break;
  }
  return new Array(viNewRow, viNewCol);
}
//----------------------------------------------------------------------
//private; 响应 OuterPanel.onkeydown 事件的处理方法.
//return: void;
function Grid_grid_OuterPanel_onkeydown_Dispose(){
  if (event.shiftKey) return;
  var viKey= event.keyCode;
  if (viKey== 9) viKey= 13;

  var viNewRow= this.getCurRowIndex();
  var viNewCol= this.getCurColIndex();
  var vtIsSetCurCell= false;
  if (viKey== 38){          //上;
    if (event.altKey) return;
    viNewRow= this.getVisibleRowX(-1);
    viNewCol= this.getCurColIndex();
    vtIsSetCurCell= true;
  }else if (viKey== 40){    //下;
    if (event.altKey) return;
    viNewRow= this.getVisibleRowX(1);
    viNewCol= this.getCurColIndex();
    vtIsSetCurCell= true;
  }else if (viKey== 37){    //左;
    if (event.altKey) return;
    var vaiRC= this.getVisibleColX(-1);
    viNewRow= vaiRC[0];
    viNewCol= vaiRC[1];
    vtIsSetCurCell= true;
  }else if (viKey== 39){    //右;
    if (event.altKey) return;
    var vaiRC= this.getVisibleColX(1);
    viNewRow= vaiRC[0];
    viNewCol= vaiRC[1];
    vtIsSetCurCell= true;
  }else if (viKey== 13){
    if (event.ctrlKey) return;
    if (event.altKey){
      //alt+ enter: 单行选中;
      var viRow= this.getCurRowIndex();
      if (this.isSelectedRow(viRow)) this.selectRows(new Array(""+ viRow), false);
      else this.selectRows(new Array(""+ viRow), true);
      vtIsSetCurCell= false;
    }else{
      //回车向右;
      var vaiRC= this.getVisibleColX(1, true);
      viNewRow= vaiRC[0];
      viNewCol= vaiRC[1];
      vtIsSetCurCell= true;
    }
  }else if (viKey== 33){    //上页;
    if (event.ctrlKey || event.altKey) return;
    viNewRow= this.getVisibleRowX(-10);
    viNewCol= this.getCurColIndex();
    vtIsSetCurCell= true;
  }else if (viKey== 34){    //下页;
    if (event.ctrlKey || event.altKey) return;
    viNewRow= this.getVisibleRowX(10);
    viNewCol= this.getCurColIndex();
    vtIsSetCurCell= true;
  }else if (viKey== 65 || viKey== 97){    //alt+ A: 全选; 大键盘,小键盘;
    if (event.ctrlKey || event.altKey== false) return;
    if (this.isAllSelBoxChecked()) this.selectAllRow(false);
    else this.selectAllRow(true);
    vtIsSetCurCell= false;
  }else if(viKey == 45){
	this.insertRow(-1);  
  }else if(viKey == 46){
	this.deleteRow(this.getCurRowIndex()); 
  }

  if (vtIsSetCurCell){
    if (this.isRowVisible(viNewRow)== false){
      viNewRow= this.getVisibleRowX(1);
    }
    var vsField= this.getFieldNameByCol(viNewCol);
    if (this.isColVisible(vsField)== false){
      viNewCol= this.getVisibleColX(1);
    }
    this.setCurCell(viNewRow, viNewCol);
  }
  return;
}
//----------------------------------------------------------------------
//private; 从 <table> 事件中获取 <TD> 事件源;
//return: 成功: <TD> 对象, 失败: null;
function Grid_getCellFromTableEvent(oTable){
  if (oTable== null || oTable.nodeName!= "TABLE") return null;
  var voCell= event.srcElement;
  while(true){
    if (voCell== oTable) {
      voCell== null;
      break;
    }
    if (voCell.nodeName== "TD" &&
        voCell.parentNode.parentNode.parentNode== oTable) break;
    voCell= voCell.parentNode;
  }

  if (voCell!= null
      && (voCell.nodeName!= "TD"
          || voCell.parentNode.parentNode.parentNode!= oTable)) voCell= null;
  return voCell;
}
//----------------------------------------------------------------------
//private; 影响字段值的处理;
//return: 成功: true, 失败: false;
function Grid_initEffectRows(){
  //alert("Grid_initEffectRows();");
  if (this.isExistCheck()== false) return true;
  if (this.sEffectField== null || this.sEffectField.length== 0) return true;

  var viRowCount= this.getRowCount();
  var voCell= null;
  for (var i= 0; i< viRowCount; i++){
    this.oLockBodyTable.rows[i].style.display= "none";
    this.oBodyTable.rows[i].style.display= "none";
  }
  return true;
}
//----------------------------------------------------------------------
//private; 调整风格,以保持整个控件的的风格正确性;
//return: void;
function Grid_adjustStyle(){
  //alert(this.CLASSNAME+ ".adjustStyle();");
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "adjustStyle");

  this.oOuterPanel.style.overflow= "hidden";
  this.oOuterPanel.style.borderWidth= "0";

  this.oInnerPanel.style.position= "absolute";
  this.oInnerPanel.style.overflow= "hidden";
  this.oInnerPanel.style.display= "block";
  this.oInnerPanel.style.visibility= "visible";

  this.oBodyImagePanel.style.position= "absolute";
  this.oBodyImagePanel.style.overflow= "auto";
  this.oBodyImagePanel.style.display= "block";
  this.oBodyImagePanel.style.visibility= "visible";
  this.oBodyImagePanel.style.borderWidth= "0";

  this.oHeadTable.style.position= "absolute";
  this.oHeadTable.style.display= "block";
  this.oHeadTable.style.visibility= "visible";
  this.oHeadTable.style.borderWidth= "0";
  this.oHeadTable.style.tableLayout= "fixed";
  this.oHeadTable.style.height= (this.oHeadTable.rows.length* this.getHeadRowHeight())+ "px";

  this.oLockHeadTable.style.position= "absolute";
  this.oLockHeadTable.style.display= "block";
  this.oLockHeadTable.style.visibility= "visible";
  this.oLockHeadTable.style.borderWidth= "0";
  this.oLockHeadTable.style.tableLayout= "fixed";

  this.oBodyTable.style.position= "absolute";
  this.oBodyTable.style.display= "block";
  this.oBodyTable.style.visibility= "visible";
  this.oBodyTable.style.borderWidth= "0";
  this.oBodyTable.style.tableLayout= "fixed";

  this.oLockBodyTable.style.position= "absolute";
  this.oLockBodyTable.style.display= "block";
  this.oLockBodyTable.style.visibility= "visible";
  this.oLockBodyTable.style.borderWidth= "0";
  this.oLockBodyTable.style.tableLayout= "fixed";

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
//return: void;
function Grid_setStyle(sStyle){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.oInnerPanel.style.cssText= PageX.getCssSheetText(this.oInnerPanel.className)+ "; "+ this.oInnerPanel.style.cssText+ "; "+ sStyle;
  this.oBodyImagePanel.style.cssText= PageX.getCssSheetText(this.oBodyImagePanel.className)+ "; "+ this.oBodyImagePanel.style.cssText+ "; "+ sStyle;
  this.oHeadTable.style.cssText= PageX.getCssSheetText(this.oHeadTable.className)+ "; "+ this.oHeadTable.style.cssText+ "; "+ sStyle+ ";left:;top:;width:;height:;";
  this.oLockHeadTable.style.cssText= PageX.getCssSheetText(this.oLockHeadTable.className)+ "; "+ this.oLockHeadTable.style.cssText+ "; "+ sStyle+ ";left:;top:;width:;height:;";
  this.oBodyTable.style.cssText= PageX.getCssSheetText(this.oBodyTable.className)+ "; "+ this.oBodyTable.style.cssText+ "; "+ sStyle+ ";left:;top:;width:;height:;";
  this.oLockBodyTable.style.cssText= PageX.getCssSheetText(this.oLockBodyTable.className)+ "; "+ this.oLockBodyTable.style.cssText+ "; "+ sStyle+ ";left:;top:;width:;height:;";
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格中的指定项目;
//param: sName 的写法必须为 js 的写法,如: border-color,必须写成 borderColor;
//return: void;
function Grid_setStyleItem(sName, sValue){
  if (this.tHasInit== false) return;
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.oInnerPanel.style[sName]= sValue;
  this.oBodyImagePanel.style[sName]= sValue;
  this.oHeadTable.style[sName]= sValue;
  this.oLockHeadTable.style[sName]= sValue;
  this.oBodyTable.style[sName]= sValue;
  this.oLockBodyTable.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//return: void;
function Grid_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------
//public; 表头锁定及隐藏设置;
//return: void;
function Grid_oHeadTable_oncontextmenu(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  var voGrid= this.oOwner;
  var voFieldMap= new Map();
  var vaFiedNames= new Array();
  var voCol= null;
  for (var i= 0; i< voGrid.asFieldName.length; i++){
    voCol= voGrid.getColByField(voGrid.asFieldName[i]);
    if (PF.parseBool(voCol.getAttribute("isallowvisible"))== false) continue;
    vaFiedNames[vaFiedNames.length]= voGrid.asFieldName[i];
    voFieldMap.put(voGrid.asFieldName[i], voCol);
  }

  var vsLockedFieldName= voGrid.getLockedCol();
  var vasHiddenFieldNames= voGrid.asHiddenFieldNames;
  var voRelBoxSet= PageX.getBoxSet(voGrid.getTableName(), "grid");
  
  var voParams= new Object();
  var vaoParam= new Array();
  vaoParam[0]= PF;
  vaoParam[1]= vaFiedNames;
  vaoParam[2]= voFieldMap;//voParamFieldMap;
  vaoParam[3]= vsLockedFieldName;
  vaoParam[4]= vasHiddenFieldNames;
  vaoParam[5]= voGrid.sRowIdField;
  vaoParam[6]= voGrid.CLASSNAME;
  vaoParam[7]= voRelBoxSet;
  vaoParam[8]= voGrid.bDisCard;
  voParams.param= vaoParam;
  var vaoResult= showModalDialog(PageX.sRootPath + "/gp/webpage/html/Grid_Hide_Lock.jsp?winmodal=1",voParams,"dialogHeight:405px;dialogWidth:330px;status:no");
  if(vaoResult){
    var va2xsSort= vaoResult[2];
    var vasField= va2xsSort[0];
    var vtIsAsc= PF.parseBool(va2xsSort[1]);

    var vtIsChanged= false;
    if (vtIsAsc!= voGrid.tIsSortAscend) vtIsChanged= true;
    if (PF.isValidArray(vasField)){
      if (PF.isValidArray(voGrid.asSortField)== false){
        vtIsChanged= true;
      }else if (PF.isEqualArray(vasField, voGrid.asSortField)== false){//vasField.toString()!= voGrid.asSortField.toString()){
        vtIsChanged= true;
      }
      if (vtIsChanged) voGrid.sort(vasField, vtIsAsc);
    }
    if (vtIsChanged) voGrid.tIsSortChanged= true;

  	var vasReturnHidden= vaoResult[0];
  	var vsReturnLocked= vaoResult[1];

    var voHiddenMap= new Map();
  	for(var i=0; i<vasReturnHidden.length; i++){
  	  voHiddenMap.put(vasReturnHidden[i], vasReturnHidden[i]);
  	}
    for (var i= 0; i< voGrid.asFieldName.length; i++){
      voCol= voGrid.getColByField(voGrid.asFieldName[i]);
      if (PF.parseBool(voCol.getAttribute("isallowvisible"))) continue;
      voHiddenMap.put(voGrid.asFieldName[i], voGrid.asFieldName[i]);
    }
  	for(var m=0; m<voGrid.asFieldName.length; m++){
  		var vsFieldName= voGrid.asFieldName[m];
  		if (voHiddenMap.get(vsFieldName)){
  		  if (voGrid.isColVisible(vsFieldName)){
      		voGrid.setColVisible(vsFieldName, false);
          voGrid.tIsColChanged= true;
  		  }
  		}else{
  		  if (voGrid.isColVisible(vsFieldName)== false){
      		voGrid.setColVisible(vsFieldName, true);
          voGrid.tIsColChanged= true;
  		  }
  	  }
  	}

  	if (vsReturnLocked!= voGrid.sLockedFieldName){
    	voGrid.setLockedCol(vsReturnLocked);
      voGrid.tIsColChanged= true;
  	}
  	
  	//chupp;20061017;
  	var vbDisCard= vaoResult[3];
  	if(!PF.isEmpty(vbDisCard) && vbDisCard!= voGrid.bDisCard){
  		voGrid.setCardDisOrNot(vbDisCard);
  		voGrid.tIsDisCardChanged= true;
  	}	
	}

 	event.returnValue= false;
  return;
}
//----------------------------------------------------------------------
//public; 获取被影响的表格的行序号组;
//return: void;
function Grid_effectRows(sEffectValue){
  if (this.sEffectField== null || this.sEffectField== "") return;
  if (sEffectValue== null || sEffectValue== "") return;
  if (this.sEffectValue== sEffectValue) return;
  var vaiRow= this.getEffectRows(this.sEffectValue);
  if (vaiRow!= null){
    for (var i= 0, len= vaiRow.length; i< len; i++){
      this.setRowVisible(vaiRow[i], false);
    }
  }

  vaiRow= this.getEffectRows(sEffectValue);
  if (vaiRow!= null){
    for (var i= 0, len= vaiRow.length; i< len; i++){
      this.setRowVisible(vaiRow[i], true);
    }
  }
  this.sEffectValue= sEffectValue;
  return;
}
//----------------------------------------------------------------------
//public; 获取被影响的表格的行序号组;
//return: 成功: 行序号组, 失败: null;
function Grid_getEffectRows(sEffectValue){
  if (sEffectValue== null || sEffectValue== "") return null;

  var vsEleName= this.EFFECT_PREFIX+ sEffectValue;
  var vaoElement= document.getElementsByName(vsEleName);
  var voRow= null;
  var vaiRow= new Array();
  for (var i= 0, len= vaoElement.length; i< len; i++){
    voRow= vaoElement[i].parentNode.parentNode;
    vaiRow[i]= voRow.rowIndex;
  }
  return vaiRow;
}
//----------------------------------------------------------------------
//public; 装载指定行指定字段的值;
//返回值: true/false;
function Grid_loadRow(iRowIndex){
  for (var i= 0; i< this.asFieldName.length; i++){
    this.loadField(iRowIndex, this.asFieldName[i]);
  }
  return true;
}
//----------------------------------------------------------------------
//public; 装载指定行指定字段的值;
//返回值: true/false;
function Grid_loadField(iRowIndex, sFieldName){
  var voRS= DataTools.getRecordset(this.getTableName());
  voRS.Move(this.getDataRowX(iRowIndex), DataTools.RS_BOOK_MARK_FIRST);
  var vsValue= voRS(sFieldName)+ "";
  this.loadFieldK(iRowIndex, sFieldName, vsValue);
  return true;
}
//----------------------------------------------------------------------
//private;
//return: null;
function Grid_getEditBox(sField){
  return null;
}
//----------------------------------------------------------------------
//public; 装载指定行指定字段的值;
//返回值: true/false;
function Grid_loadFieldK(iRowIndex, sFieldName, sValue, tIsUpdateEditBox){
  if (tIsUpdateEditBox== null) tIsUpdateEditBox= true;
  var viColIndex= this.getColIndexByField(sFieldName);
  var voCell= this.getCell(iRowIndex, viColIndex);
  if (voCell== null) return;
  var vsValue= this.formatValue(sFieldName, sValue);
  if (vsValue== "&nbsp;"){
    voCell.innerHTML= vsValue;
  }else{
    voCell.innerText= vsValue;
  }
  
  if (vsValue== "&nbsp;") vsValue= "";
   if (tIsUpdateEditBox && this.oCurEditBox!= null){
    if (voCell== this.oCurEditBox.oGridBodyCell){
    	var vtIsFire= this.oCurEditBox.isFireOnChange();
    	this.oCurEditBox.setFireOnChange(false);
   	  this.oCurEditBox.setValue(sValue);
    	this.oCurEditBox.setFireOnChange(vtIsFire);
    }
  }
  if (sFieldName== this.sEffectField) this.setValueByRowField_UpdateCheckBox(iRowIndex, sFieldName, vsValue);
  return true;
}
//----------------------------------------------------------------------
//public;
//return: String/null;
function Grid_formatValue(sFieldName, sValue){
  var vsValue= (sValue== null)? "": sValue;
  var viColIndex= this.getColIndexByField(sFieldName);
  var vsValue2= vsValue;
  var vs = this.getVSByFieldName(sFieldName);
  if (vs) vsValue2= vs.getAttribute('a' + vsValue);

  if (typeof(vsValue2)== "undefined"){
  	vsValue2= "";
  }else{
    var voBox= this.getEditBox(sFieldName);
    if (voBox!= null && voBox.CLASSNAME== "gp.page.NumericBox"){
      var viLen= voBox.getLength();
      var viScale= voBox.getScale();
      var vavValue= PF.parseNumeric(vsValue2, viLen, viScale);
      if (vavValue!= null) vsValue2= vavValue[1];
    }
  }

  if (PF.parseBool(DataTools.getTableFieldAttr(this.getTableName(), sFieldName, "iskilo"))){
    vsValue2= PF.parseKilo(vsValue2);
  }
  if (vsValue2== "") vsValue2= "&nbsp;";
  return vsValue2;
}
//----------------------------------------------------------------------
//public; 装载数据;
//return: void;
function Grid_loadData(){
  if (this.tHasInit== false) return;
  if (this.oLockBodyTablePanel== null || this.oBodyTablePanel== null) return;
  var viPageSize= -1;
  if (this.oPagination!= null && this.oPagination.isPagiAtClient()){
    viPageSize= this.oPagination.getPageSize();
  }else{
    viPageSize= DataTools.getTableRowCount(this.getTableName());
  }
 	this.prepareMakeBodyRow(this.iFromRow, viPageSize);
  this.oLockBodyTablePanel.innerHTML= this.makeBodyByOcx(false);
  this.oBodyTablePanel.innerHTML= this.makeBodyByOcx(true);
  this.initBodyTable();
  if (!PF.isEmpty(this.getSumFields()) 
      || DataTools.getTableTotal(this.getTableName())!= null){
    this.refreshSumRow();
  }
  this.tHasLoadedInitData= true;
  this.resize();

  //向外发送事件; OnLoadData
  if (PF.isExistMethodK(this.eventAnswer_OnLoadData)){
    this.eventAnswer_OnLoadData(this);
  }
  this.fireEvent(this.OnLoadData, new Array(this));

  var viOldCurRow= this.iCurRow;
  this.iCurRow= -1;
  if (this.oPagination!= null){
    this.oPagination.setCurRow(viOldCurRow);
  }else{
    this.setCurRow(0);
  }
  return;
}
//----------------------------------------------------------------------
//private;
function Grid_resort(){
  this.sort(this.asSortField, this.tIsSortAscend);
}
//----------------------------------------------------------------------
//private; 装载数据;
//return: void;
//deprecated;leidh;20060118;
function Grid_loadSumRow(){
	return; 
  if (this.tHasInit== false) return;
  var viRows= 0;
  if (!PF.isEmpty(this.getSumFields())) viRows++;
  if (DataTools.getTableTotal(this.getTableName())!= null) viRows++;
  if (viRows<= 0) return;
  this.oLockSumRowTablePanel.innerHTML= this.makeBody(0, false);
  this.oSumRowTablePanel.innerHTML= this.makeBody(0, true);
  this.initSumTable();
  return;
}
//----------------------------------------------------------------------
//public; 由表格的行号获取 XML 数据行号;
//return: 成功: data row index; 否则: -2;
function Grid_getDataRowX(iGridRowX){
  if (this.isValidRow(iGridRowX)== false) return -2;
  var viRow= this.iFromRow+ iGridRowX;
  return viRow;
}
//----------------------------------------------------------------------
//public; 由 XML 数据行号获取表格的行号;
//return: 成功: grid row index; 否则: -2;
function Grid_getGridRowX(iDataRowX){
  if (DataTools.isValidRow(this.getTableName(), iDataRowX)== false) return -2;
  var viRow= iDataRowX- this.iFromRow;
  return viRow;
}
//----------------------------------------------------------------------
//public; 清空;
//return:成功: true, 失败: false;
function Grid_clear(){
  DataTools.clearTableData(this.getTableName());
  this.iFromRow= 0;
  this.iCurRow= -1;       //private; 当前行号;
  this.iCurCol= -1;       //private; 当前列号;
  if (this.oPagination!= null && this.oPagination.isPagiAtClient()){
    this.oPagination.getPageData("first");
    if (this.iFromRow!= this.oPagination.iFromRow- 1){
      this.iFromRow= this.oPagination.iFromRow- 1;
    }
  }
  this.loadData();
  return true;
}
//----------------------------------------------------------------------
//public; 设置焦点.
//return: void;
function Grid_setFocus(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setFocus");
  this.setFocusK(true);
  return;
}
//----------------------------------------------------------------------
//private; 设置焦点.
//return: void;
function Grid_setFocusK(tIsForceFocusToOuterPanel){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setFocus");
  tIsForceFocusToOuterPanel= PF.parseBool(tIsForceFocusToOuterPanel);
  var viFirstRow= this.getDispRow(0);
  if (viFirstRow>= 0){
    if (this.isValidRow(this.iCurRow)== false){
      var viCol= this.getUsableCol(this.iCurRow);
      if (viCol>= 0){
        this.setCurCell(viFirstRow, viCol);
      }
    }
    else this.lightFocusRow(true);
  }else{
    if (PF.isVisible(this.oOuterPanel)) this.oOuterPanel.focus();
  }
  this.setHeadBackColor(this.sHeadBackLightColor);
  if (tIsForceFocusToOuterPanel) try{this.oOuterPanel.focus()}catch(e){};
  this.fireOnFocus();
  PageX.oCurFocusPart= this;
  return;
}
//----------------------------------------------------------------------
//public; 失去焦点.
//return: void;
function Grid_lostFocus(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "lostFocus");
  var viFirstRow= this.getDispRow(0);
  if (viFirstRow>= 0){
    if (this.isValidRow(this.iCurRow)== false) {}
    else this.lightFocusRow(false);
  }
  this.setHeadBackColor(this.sHeadBackNormalColor);
  this.fireOnBlur();
  return;
}
//----------------------------------------------------------------------
//public; 加亮显示焦点行.
//return: void;
function Grid_lightFocusRow(tIsLight){
  tIsLight= PF.parseBool(tIsLight);
  this.tIsFocus= tIsLight;
  this.setCurRowBackColor();
  this.setCurRowForeColor();
  return;
}
//----------------------------------------------------------------------
//public; 追加行值;
//return:成功: true, 失败: false;
function Grid_insertDelta(sDelta, iFromRow, tIsPK, tIsRowId, tIsAutoNo, sEffectValue, tIsClear, tIsAllowRM, tIsDefault){
  if (sDelta== null) return false;
  var voDelta= PF.parseXml(sDelta);
  if (voDelta== null) return false;
  var tableMeta = DataTools.getTableMeta(this.getTableName());
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "insertDelta");
  if (this.isValidRow(iFromRow)== false) iFromRow= this.getRowCount();
  var vasField= new Array();
  var vaxxsValue= new Array();
  for (var i= 0, len= voDelta.childNodes.length; i< len; i++){
    var voEntity= voDelta.childNodes[i];
    if (voEntity== null) continue;
    vaxxsValue[i]= new Array();
    for (var j= 0; j< voEntity.childNodes.length; j++){
      var voField= voEntity.childNodes[j];
      if (i== 0){
        vasField[j]= voField.getAttribute("name");
      }
      vaxxsValue[i][j]= this.formatColumn(tableMeta,voField);
    }
  }
  this.insertData(vasField, vaxxsValue, iFromRow, tIsPK, tIsRowId, tIsAutoNo, sEffectValue, tIsClear, tIsAllowRM, tIsDefault);
  return true;
}
//----------------------------------------------------------------------
//public; 追加行值;
//return:成功: true, 失败: false;
function Grid_insertData(asFieldName, axxsValue, iFromRow, tIsPK, tIsRowId, tIsAutoNo, sEffectValue, tIsClear, tIsAllowRM, tIsDefault){
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeInsertData)){
    this.eventAnswer_OnBeforeInsertData(this, iFromRow);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeInsertData, new Array(this, iFromRow));
  if (this.isAbortEvent()) return false;

  if (this.isValidRow(iFromRow)== false) iFromRow= this.getRowCount();
  if (PF.isEmpty(sEffectValue)){
    sEffectValue= this.sEffectValue;
  }
  if (PF.isEmpty(this.sEffectField)) sEffectValue= null;
  DataTools.insertData(this.getTableName(), asFieldName, axxsValue, iFromRow, tIsPK, tIsRowId, tIsAutoNo, sEffectValue, tIsClear, tIsAllowRM, tIsDefault);
  this.loadData();

  //向外发送事件; OnAfterInsertData
  if (PF.isExistMethodK(this.eventAnswer_OnAfterInsertData)){
    this.eventAnswer_OnAfterInsertData(this, iFromRow);
  }
  this.fireEvent(this.OnAfterInsertData, new Array(this, iFromRow));
  return true;
}
//----------------------------------------------------------------------
//public; 追加行值;
//return:成功: true, 失败: false;
function Grid_insertTableDataRows(aoTableDataRow, iFromRow, tIsPK, tIsRowId, tIsAutoNo, sEffectValue, tIsClear, tIsAllowRM, tIsDefault){
  if (aoTableDataRow== null) return true;

  var vaoRowMap= new Array();
  for (var i= 0; i< aoTableDataRow.length; i++){
    vaoRowMap[i]= DataTools.rowToMap(aoTableDataRow[i]);
  }

  var vasField= DataTools.getFieldNames(this.getTableName());
  var vaxxsValue= new Array();
  var voMap= null;
  for (var i= 0; i< vaoRowMap.length; i++){
    voMap= vaoRowMap[i];
    if (voMap== null) continue;
    vaxxsValue[i]= new Array();
    for (var j= 0; j< vasField.length; j++){
      vaxxsValue[i][j]= voMap.get(vasField[j]);
    }
  }

  return this.insertData(vasField, vaxxsValue, iFromRow, tIsPK, tIsRowId, tIsAutoNo, sEffectValue, tIsClear, tIsAllowRM, tIsDefault);
}
//----------------------------------------------------------------------
//public; 插入行;
//iRowIndex: 是指将要插入行的位置;
//如果 iRowIndex< 0 或大于当前的最大行,则作为追加进行处理;
//return:成功: 插入行的位置, 失败: -1;
function Grid_insertRow(iRowIndex){
  if (this.tHasInit== false) return -1;
  if (this.isReadOnly()) return -1;

  //事件快速响应通道,仅供继承类使用;
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeInsertRow)){
    this.eventAnswer_OnBeforeInsertRow(this, iRowIndex);
  }
  if (this.isAbortEvent()) return false;
  //向外发送事件; OnBeforeInsertRow
  this.fireEvent(this.OnBeforeInsertRow, new Array(this, iRowIndex));
  if (this.isAbortEvent()) return false;

  if (this.isValidRow(iRowIndex)) this.fillRowId(iRowIndex, iRowIndex+ 2);
  var viRowIndex= this.getGridRowX(DataTools.insertRow(this.getTableName(), null, null, this.getDataRowX(iRowIndex), true));

  this.setRowBackColor(this.iCurRow, "");
  this.setRowForeColor(this.iCurRow, this.ROW_FORE_COLOR_NORMAL);
  this.insertRowToGrid(viRowIndex);
  this.fillRowId(viRowIndex, viRowIndex+ 1, 1);

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterInsertRow)){
    this.eventAnswer_OnAfterInsertRow(this, viRowIndex);
  }
  this.fireEvent(this.OnAfterInsertRow, new Array(this, viRowIndex));
  return viRowIndex;
}
//----------------------------------------------------------------------
//private; 追加行值;
//axxsValue: 所要追加的二维数据值;
//return:成功: true, 失败: false;
function Grid_insertRowToGrid(iRowIndex){
  if (iRowIndex> this.getRowCount()) return false;
  if (iRowIndex< 0) return false;

  var viDataRow= this.iFromRow+ iRowIndex;
  var vsBodyRow= this.makeBody(viDataRow, true);
  var vsLockRow= this.makeBody(viDataRow, false);

  this.oNewPanel.innerHTML= vsLockRow;
  var voTable= this.oNewPanel.all("BodyTable");
  var voNewRow= voTable.rows[0];
  var voTBody= this.oLockBodyTable.tBodies[0];
  var voOldRow= null;
  if (iRowIndex< this.getRowCount()) voOldRow= this.oLockBodyTable.rows[iRowIndex];
  if (voOldRow== null) voTBody.appendChild(voNewRow);
  else voTBody.insertBefore(voNewRow, voOldRow);

  this.oNewPanel.innerHTML= vsBodyRow;
  var voTable= this.oNewPanel.all("BodyTable");
  var voNewRow= voTable.rows[0];
  var voTBody= this.oBodyTable.tBodies[0];
  var voOldRow= null;
  if (iRowIndex< this.getRowCount()) voOldRow= this.oBodyTable.rows[iRowIndex];
  if (voOldRow== null) voTBody.appendChild(voNewRow);
  else voTBody.insertBefore(voNewRow, voOldRow);

  this.oNewPanel.innerHTML= "";
  var voNewCell= voNewRow.firstChild;

  if (this.getRowCount()== 1) this.resize();
  this.adjustBodyTableImagePanel(); //调整 BodyTableImagePanel;
  this.adjustCellToView(voNewCell);

  var viCol= this.iCurCol;
  if (this.isValidCol(viCol)== false){
    viCol= this.getUsableCol(iRowIndex);
  }
  this.setCurCell(iRowIndex, viCol);
  return;
}
//----------------------------------------------------------------------
//public; 获取可见的行号组;
//return: 成功: 行号组; 否则: null;
function Grid_getDispRows(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getDispRows");
  var vaiRow= new Array();
  var voRow= null;
  for (var i= 0, len= this.getRowCount(); i< len; i++){
    voRow= this.oBodyTable.rows[i];
    if (voRow.style.display== "none") continue;
    vaiRow[vaiRow.length]= voRow.rowIndex;
  }
  return vaiRow;
}
//----------------------------------------------------------------------
//public; 获取指定的第几个可见的行号;
//return: 成功: 行号; 否则: -1;
function Grid_getDispRow(iIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getDispRow");
  if (iIndex== null || iIndex< 0) iIndex= 0;
  if (iIndex>= this.getRowCount()) return -1;
  var voRow= null;
  for (var i= 0, len= this.getRowCount(); i< len; i++){
    voRow= this.oBodyTable.rows[i];
    if (voRow.style.display== "none") continue;
    if (iIndex== 0) return voRow.rowIndex;
    iIndex--;
    voRow== null;
  }
  return -1;
}
//----------------------------------------------------------------------
//public; 获取指定的第几个可见的列号;
//return: 成功: 列号; 否则: -1;
function Grid_getDispCol(iRow, iIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getDispRow");
  if (this.isValidRow(iRow)== false) return -1;
  if (iIndex== null || iIndex< 0) iIndex= 0;
  if (iIndex>= this.getColCount()) return -1;

  var voRow= this.getRow(iRow);
  var voCell= null;
  var voCol= null;
  for (var i= 0, len= voRow.cells.length; i< len; i++){
    voCol= this.getCol(i);
    if (voCol.style.display== "none") continue;
    voCell= voRow.cells[i];
    if (voCell.style.display== "none") continue;
    if (iIndex== 0) return i;
    iIndex--;
    voCell== null;
  }
  return -1;
}
//----------------------------------------------------------------------
//public; 获取Grid的排序字段;
function Grid_getSortField(){
	return this.asSortField;
}
//----------------------------------------------------------------------
//public; 获取Grid的排序是否是升序;
function Grid_getIsSortAscend(){
	return this.tIsSortAscend;
}	
//----------------------------------------------------------------------
//public; 获取指定的第几个可见的列号;
//return: 成功: 列号; 否则: -1;
function Grid_getUsableCol(iRow, iIndex){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getDispRow");
  if (this.isValidRow(iRow)== false) return -1;
  if (iIndex== null || iIndex< 0) iIndex= 0;
  if (iIndex>= this.getColCount()) return -1;

  var voRow= this.getRow(iRow);
  var voCell= null;
  var voCol= null;
  for (var i= 0, len= voRow.cells.length; i< len; i++){
    voCol= this.getCol(i);
    if (voCol.style.display== "none") continue;
    if (PF.parseBool(voCol.isboxvisible)== false) continue;
    voCell= voRow.cells[i];
    if (voCell.style.display== "none") continue;
    if (iIndex== 0) return i;
    iIndex--;
    voCell== null;
  }
  return -1;
}
//----------------------------------------------------------------------
//public; 填充行号.
//return: 成功: true, 否则: false;
function Grid_fillRowId(iFromRow, iFromRowId, iRowCount){
  if (PF.isEmpty(this.sRowIdField)) return false;
  if (iFromRow== null) iFromRow= 0;
  if (iFromRowId== null) iFromRowId= iFromRow+ 1;
  if (iRowCount== null) iRowCount= this.getRowCount();

  var vtIsDel= false;
  var viNo_= PF.parseInt(this.getValueByRowField(iFromRow, this.sRowIdField));
  if (iFromRow+ 1< viNo_) vtIsDel= true;

  var viDataFromRow= this.getDataRowX(iFromRow);
  var viDataFromRowId= viDataFromRow+ (iFromRowId- iFromRow);

  //此种情况不许分页;
  if (this.sEffectField.length> 0){
    if (this.isValidRow(iFromRow)== false) return true;
    var viCol= this.getColIndexByField(this.sRowIdField);
    if (this.isValidCol(viCol)== false) return true;

    var viRowId= iFromRowId- iFromRow- 1;
    var voRow= null;
    var vax2iRow= new Array();
    for (var i= 0, len= this.getRowCount(); i< len; i++){
      voRow= this.oBodyTable.rows[i];
      if (voRow.style.display== "none") continue;
      viRowId++;
      if (i< iFromRow) continue;
      vax2iRow[vax2iRow.length]= new Array(i, viRowId);
      if (vax2iRow.length>= iRowCount) break;
    }

    if (PF.isExistMethodK(this.setValueByRowField)){
      var i= 0;
      var increment= 1;
      if (vtIsDel== false){
        i= vax2iRow.length- 1;
        increment= -1;
      }
      for (; i>= 0 && i< vax2iRow.length; i= i+ increment){
        this.setValueByRowField(vax2iRow[i][0], this.sRowIdField, vax2iRow[i][1]);
      }
    }else{
      var i= 0;
      var increment= 1;
      if (vtIsDel== false){
        i= vax2iRow.length- 1;
        increment= -1;
      }
      var voCell= null;
      for (; i>= 0 && i< vax2iRow.length; i= i+ increment){
        DataTools.setValue(this.getTableName(), this.getDataRowX(vax2iRow[i][0]), this.sRowIdField, vax2iRow[i][1]);
        voCell= this.oBodyTable.rows[vax2iRow[i][0]].cells[viCol];
        voCell.innerText= viRowId;
      }
    }
  }else{
    var viCol= this.getColIndexByField(this.sRowIdField);
    if (PF.isExistMethodK(this.setValueByRowField)== false
        || this.isValidRow(iFromRow)== false
        || this.isValidCol(viCol)== false){
      if (DataTools.fillRowId(this.getTableName(), viDataFromRow, viDataFromRowId)== false) return false;
    }
    if (this.isValidRow(iFromRow)== false) return true;
    if (this.isValidCol(viCol)== false) return true;

    if (PF.isExistMethodK(this.setValueByRowField)){
      var i= iFromRow;
      var increment= 1;
      if (vtIsDel== false){
        i= this.getRowCount()- 1;
        increment= -1;
      }
      for (; i>= iFromRow && i< this.getRowCount(); i= i+ increment){
        this.setValueByRowField(i, this.sRowIdField, viDataFromRowId+ (i- iFromRow));
        if (i>= iRowCount) break;
      }
    }else{
      var voCell= null;
      for (var i= iFromRow, len= this.getRowCount(); i< len; i++){
        voCell= this.getCell(i, viCol);
        voCell.innerText= viDataFromRowId+ (i- iFromRow);
        if (i>= iRowCount) break;
      }
    }
  }
  return true;
}
//----------------------------------------------------------------------
//private; 记录属性;
//return: void;
function Grid_recordProp(){
  if (this.tIsColChanged== false
      && this.tIsSortChanged== false
      && this.tIsHeadChanged== false
      && this.tIsDisCardChanged== false){
    alert("表格风格未曾改变,不用保存!");
    return;
  }

  var voBuf= new StringBuffer();
  voBuf.append("<root>\n");
  if (this.tIsColChanged){
    voBuf.append("<cols lockedfield=\""+ this.sLockedFieldName+ "\">\n");
    var voCol= null
    for (var i= 0; i< this.oBodyColGroup.childNodes.length; i++){
      voCol= this.oBodyColGroup.childNodes[i];
      voBuf.append("<col ");
      voBuf.append("name='"+ voCol.fieldname+ "' ");
      voBuf.append("isvisible='"+ ((voCol.style.display== "none")? false: true)+ "' ");
      voBuf.append("width='"+ PF.parseInt(voCol.style.width)+ "' ");
      voBuf.append("/>\n");
    }
    voBuf.append("</cols>\n");
  }else{
    var voCols= this.oPropXml.documentElement.selectSingleNode("cols");
    if (voCols!= null){
      voBuf.append(voCols.xml);
      voBuf.append("\n");
    }
  }

  if (this.tIsSortChanged){
    voBuf.append("<sortfields isascend='"+ this.tIsSortAscend+ "'>\n");
    if (PF.isValidArray(this.asSortField)) voBuf.append(this.asSortField.join(",")+ "\n");
    voBuf.append("</sortfields>\n");
  }else{
    var voSort= this.oPropXml.documentElement.selectSingleNode("sortfields");
    if (voSort!= null){
      voBuf.append(voSort.xml);
      voBuf.append("\n");
    }
  }

  if (this.tIsHeadChanged){
    voBuf.append("<head digest='"+ this.oOuterPanel.headdigest+ "'>\n");
    voBuf.append(this.getHeadTable()+ "\n");
    voBuf.append("</head>\n");
  }else{
    var voHead= this.oPropXml.documentElement.selectSingleNode("head");
    if (voHead!= null){
      voBuf.append(voHead.xml);
      voBuf.append("\n");
    }
  }
  
  //chupp; 20061017;
  if (this.tIsDisCardChanged){
  	voBuf.append("<discard>\n");
  	voBuf.append(this.bDisCard+ "\n");
  	voBuf.append("</discard>");
  }else {
    var voDisCard= this.oPropXml.documentElement.selectSingleNode("discard");
    if (voDisCard!= null){
      voBuf.append(voDisCard.xml);
      voBuf.append("\n");
    }  	
  }	
  voBuf.append("</root>\n");

  var vasName= new Array("userId", "pageName", "tableName", "gridId", "propFileId", "prop");
  var vasValue= new Array(DataTools.getSV("svUserID"), PageX.sName,
                          this.getTableName(), this.oOuterPanel.id,
                          this.getPropFileId(),
                          voBuf.toString());
  var voRetRoot= Info.requestData("saveGridProp", "all", vasName, vasValue);
  if (voRetRoot== null){
    alert("返回值为空,可能服务器出现异常,表格格式信息保存失败!\n");
  }else{
    if (PF.parseBool(voRetRoot.getAttribute("success"))){
      this.oPropXml.loadXML(voBuf.toString());
      this.tIsColChanged= false;
      this.tIsSortChanged= false;
      this.tIsHeadChanged= false;
      this.tIsDisCardChanged= false;
      alert("保存风格文件成功!");
    }else{
      alert("表格格式信息保存失败!\n"+ voRetRoot.text);
    }
  }
  return;
}
//----------------------------------------------------------------------
//private; 删除属性;
//return: void;
function Grid_deleteProp(){
  if (this.oPropXml== null || this.oPropXml.documentElement== null){
    alert("没有发现用户定制的风格,不用删除.");
    return;
  }

  var vasName= new Array("userId", "pageName", "tableName", "gridId", "propFileId");
  var vasValue= new Array(DataTools.getSV("svUserID"), PageX.sName,
                          this.getTableName(), this.oOuterPanel.id,
                          this.getPropFileId());
  var voRetRoot= Info.requestData("deleteGridProp", "all", vasName, vasValue);
  if (voRetRoot== null){
    alert("返回值为空,可能服务器出现异常,删除风格文件失败!\n");
  }else{
    if (PF.parseBool(voRetRoot.getAttribute("success"))){
      alert("删除风格文件成功!");
    }else{
      alert("删除风格文件失败!\n"+ voRetRoot.text);
    }
  }

  this.tIsColChanged= true;
  this.tIsSortChanged= true;
  this.tIsHeadChanged= true;
  this.tIsDisCardChanged= true;
  return;
}
//----------------------------------------------------------------------
//private; 恢复属性;
//return: void;
function Grid_restoreProp(){
  if (this.oPropXml== null) return;
  var voXmlDoc= this.oPropXml.documentElement;
  if (voXmlDoc== null) return;
  var voSortFields= voXmlDoc.selectSingleNode("//root/sortfields");
  if (voSortFields!= null){
    if (PF.isEmpty(voSortFields.text)== false){
      var vasSortField= voSortFields.text.split(",");
      var vtIsAscend= PF.parseBool(voSortFields.getAttribute("isascend"));
      this.sort(vasSortField, vtIsAscend);
    }
  }

  var voCols= voXmlDoc.selectSingleNode("//root/cols");
  if (voCols!= null){
    var vsLockedFieldName= voCols.getAttribute("lockedfield");
    if (PF.isEmpty(vsLockedFieldName)== false) this.setLockedCol(vsLockedFieldName);
  }
  
  this.adjustBodyTableImagePanel();
  this.tIsColChanged= false;
  this.tIsSortChanged= false;
  this.tIsHeadChanged= false;
  return;
}
//----------------------------------------------------------------------
//public; 设置字段标题;
//return: void;
function Grid_setFieldCaption(fieldName,captionValue){
	var voCell = this.getHeadCell(fieldName);
  if (voCell == null) return;
  var vsCellID= this.getHeadCellID(fieldName);
  if (vsCellID== null) return;
  var voLockCell= this.oLockHeadTable.all(vsCellID);

	var vsSource = voCell.innerHTML;
	var viIndex = vsSource.indexOf("<SPAN");
	var vsSpan = "";
	voCell.innerHTML = captionValue + vsSpan;
	voLockCell.innerHTML = captionValue + vsSpan;
	var voCol= this.getColByField(fieldName);
	voCol.caption= captionValue;
}
//----------------------------------------------------------------------
//public; 返回字段标题;
//return: 成功:字段标题;否则:null;
function Grid_getFieldCaption(fieldName){
	var voCell = this.getHeadCell(fieldName);
	if (voCell== null) return null;
	var vsSource = voCell.innerHTML;
	var viIndex = vsSource.indexOf("<SPAN");
	var vsResult = vsSource;
	if(viIndex != -1){
		vsResult = vsSource.substring(0,viIndex);
	}
	return vsResult;
}
//----------------------------------------------------------------------
//public; 列排序;
//return: void;
function Grid_sort(asField, tIsAscend){
  if (PF.isValidArray(asField)== false) return;
  var voTableData= DataTools.getTableData(this.getTableName());
  var vasFieldType= new Array();
  for (var i= 0; i< asField.length; i++){
    if (this.isValidFieldName(asField[i])== false) continue;
    if (this.oBodyColGroup!= null && this.oBodyColGroup.childNodes.length> 0){
      var voCol= this.getColByField(asField[i]);
      vasFieldType[i]= voCol.fieldtype;
    }else{
      var viCol= this.getColIndexByField(asField[i]);
      vasFieldType[i]= this.oHeadColGroup.childNodes[viCol+ 1].fieldtype;
    }
  }
  if (tIsAscend== null) tIsAscend= true;
  tIsAscend= PF.parseBool(tIsAscend);
  if (DataTools.sortTableData(voTableData, asField, vasFieldType, tIsAscend)== false) return;
  this.loadData();

  this.asSortField= asField;
  this.tIsSortAscend= tIsAscend;
  return;
}
//----------------------------------------------------------------------
//public; 设置指定的列的显示位置,序列序.
//return: void;
function Grid_setColIndex(sFromField, sToField){
  var viCol= this.getColIndexByField(sFromField);
  var viIndex= this.getColIndexByField(sToField);
  return this.setColIndexK(viCol, viIndex);
}
//----------------------------------------------------------------------
//public; 设置指定的列的显示位置,序列序.
//return: void;
function Grid_setColIndexK(iCol, iIndex){
  if (this.isValidCol(iCol)== false) return;
  if (this.isValidCol(iIndex)== false) return;
  if (iCol== iIndex) return;
  if (iCol+ 1== iIndex) return;

  var vsField= this.getFieldNameByCol(iCol);
  this.setColIndex_HeadDispose(iCol, iIndex);

  //使用<col>实现对列的换序;
  var voBodyCol= this.oBodyColGroup.childNodes[iCol];
  var voDestBodyCol= null;
  if (iIndex>= 0){
    voDestBodyCol= this.oBodyColGroup.childNodes[iIndex];
    voBodyCol.parentNode.insertBefore(voBodyCol, voDestBodyCol);
  }

  var viHeadCol= iCol+ 1;
  var viDestHeadCol= iIndex+ 1;
  var voLockBodyCol= this.oLockBodyColGroup.childNodes[viHeadCol];
  var voDestLockBodyCol= this.oLockBodyColGroup.childNodes[viDestHeadCol];
  if (voLockBodyCol!= null && voDestLockBodyCol!= null){
    voLockBodyCol.parentNode.insertBefore(voLockBodyCol, voDestLockBodyCol);
  }

  var voRow= null;
  var voCell= null;
  var voDestCell= null;
  for (var i= 0, len= this.getRowCount(); i< len; i++){
    voRow= this.oBodyTable.rows(i);
    voCell= voRow.cells(iCol);
    voDestCell= voRow.cells(iIndex);
    voRow.insertBefore(voCell, voDestCell);
  }

  if (!PF.isEmpty(this.getSumFields()) && this.oSumRowColGroup!= null){
    voRow= this.oSumRowTable.rows(0);
    voCell= voRow.cells(iCol);
    voDestCell= voRow.cells(iIndex);
    voRow.insertBefore(voCell, voDestCell);
    
    var voCol= this.oSumRowColGroup.childNodes[iCol];
    var voDestCol= this.oSumRowColGroup.childNodes[iIndex];
    this.oSumRowColGroup.insertBefore(voCol, voDestCol);
  }

  var viNewCol= this.getColIndexByField(vsField);
  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnColIndexChange)){
    this.eventAnswer_OnColIndexChange(this, vsField, viNewCol, iCol);
  }
  this.fireEvent(this.OnColIndexChange, new Array(this, vsField, viNewCol, iCol));
  return;
}
//----------------------------------------------------------------------
//private; 获取表头格式;
//return: head String/"";
function Grid_getHeadTable(){
  this.oNewPanel.innerHTML= this.oHeadTable.outerHTML;
  var voAllCheckTD= this.oNewPanel.all(this.getHeadCellID(this.SELECT_CHECK_FIELD_NAME));
  voAllCheckTD.parentNode.removeChild(voAllCheckTD);

  var voBuf= new StringBuffer();
  voBuf.append("<table border='1'>\n");
  voBuf.append("<tbody>\n");
  var voTB= this.oNewPanel.firstChild.tBodies[0];
  var voTR= null;
  var voTD= null;
  for (var i= 0, len= voTB.childNodes.length; i< len; i++){
    voTR= voTB.childNodes[i];
    voBuf.append("<tr>\n");
    for (var j= 0, lenj= voTR.childNodes.length; j< lenj; j++){
      voTD= voTR.childNodes[j];
      voBuf.append("<td");
      voBuf.append(" id= '"+ voTD.id+ "'");
      voBuf.append(" rowspan= '"+ voTD.rowSpan+ "'");
      voBuf.append(" colspan= '"+ voTD.colSpan+ "'");
      voBuf.append(" parentcode= '"+ voTD.parentcode+ "'");
      voBuf.append(" childfields= '"+ voTD.childfields+ "'");
      voBuf.append(">");
      if (i+ voTD.rowSpan>= len) voBuf.append(voTD.fieldname);
      else voBuf.append(voTD.innerText);
      voBuf.append("</td>\n");
    }
    voBuf.append("</tr>\n");
  }
  voBuf.append("</tbody>\n");
  voBuf.append("</table>\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 设置指定的列的显示位置,序列序.表头处理;
//return: void;
function Grid_setColIndex_HeadDispose(iCol, iIndex){
  if (iCol== iIndex || iCol+ 1== iIndex) return;

  var viHeadCol= iCol+ 1;
  var viDestHeadCol= iIndex+ 1;
  var voHeadCol= this.oHeadColGroup.childNodes[viHeadCol];
  var voDestHeadCol= this.oHeadColGroup.childNodes[viDestHeadCol];
  if (voHeadCol!= null && voDestHeadCol!= null){
    voHeadCol.parentNode.insertBefore(voHeadCol, voDestHeadCol);
  }

  var voLockHeadCol= this.oLockHeadColGroup.childNodes[viHeadCol];
  var voDestLockHeadCol= this.oLockHeadColGroup.childNodes[viDestHeadCol];
  if (voLockHeadCol!= null && voDestLockHeadCol!= null){
    voLockHeadCol.parentNode.insertBefore(voLockHeadCol, voDestLockHeadCol);
  }

  var voBuf= new StringBuffer();
  voBuf.append("<?xml version=\"1.0\" encoding=\"GBK\"?>\n");
  voBuf.append(this.getHeadTable());
  var voXml= PF.parseXml(voBuf.toString());
  var voTB= voXml.selectSingleNode("tbody");
  voBuf.clear();

  var vsField= this.getFieldNameByCol(iCol);
  var vsDestField= this.getFieldNameByCol(iIndex);

  //找出被换序的单元格组;
  var vaoOldCell= new Array();
  var voCell= null;
  var vsCellId= "";
  var vsPCellCode= "";
  var viRowSpan= 0;
  for (var i= voTB.childNodes.length- 1; i>= 0;){
    if (voCell== null){
      vsCellId= this.getHeadCellID(vsField);
    }else{
      vsPCellCode= voCell.getAttribute("parentcode");
      if (vsPCellCode== null || vsPCellCode== "") break;
      vsCellId= this.getHeadParentCellID(vsPCellCode);
    }
    voCell= voTB.selectSingleNode("tr/td[@id='"+ vsCellId+ "']");
    if (voCell== null){
      Info.throws("表头构造错误;", this.CLASSNAME, "setColIndex_HeadDispose");
    }
    viRowSpan= PF.parseInt(voCell.getAttribute("rowspan"));
    vaoOldCell[i- viRowSpan+ 1]= voCell;
    i-= viRowSpan;
  }

  //生成新的单元格组;
  var vaoNewCell= new Array();
  for (var i= vaoOldCell.length- 1; i>= 0; i--){
    if (vaoOldCell[i]== null) continue;
    voCell= vaoOldCell[i].cloneNode(true);
    voCell.setAttribute("colspan", 1);
    vaoNewCell[i]= voCell;
  }

  //拆分被插入位置的单元格组; 对于合并单元格的 colspan 也要进行处理;
  var vaoDestCell= new Array(); //[x][0]= previousSibling; [x][1]= nextSibling;
  var voRow= null;
  var viPos= 0;
  var viColSpan= 0;
  var vsCellCode= "";
  var voPreCell= null;
  for (var len= voTB.childNodes.length, i= len- 1; i>= 0;){
    if (i== len- 1){
      vsCellId= this.getHeadCellID(vsDestField);
    }else{
      vsPCellCode= voCell.getAttribute("parentcode");
      if (vsPCellCode== null || vsPCellCode== "") break;
      vsCellId= this.getHeadParentCellID(vsPCellCode);
    }
    voCell= voTB.selectSingleNode("tr/td[@id='"+ vsCellId+ "']");
    viColSpan= PF.parseInt(voCell.getAttribute("colspan"));
    voPreCell= null;
    if (viColSpan> 1){
      var vsChildFields= voCell.getAttribute("childfields");
      var vasChild= vsChildFields.split(";");
      for (var x= 0, len= vasChild.length; x< len; x++){
        if (PF.isEmpty(vasChild[x])) continue;
        if (vasChild[x]== vsCellCode) break;
        viPos++;
      }
      if (viPos> 0){
        voPreCell= voCell.cloneNode(true);
        voPreCell.setAttribute("id", "");
        voPreCell.setAttribute("colspan", viPos);
        voCell.setAttribute("colspan", viColSpan- viPos);
        voRow= voCell.parentNode;
        voRow.insertBefore(voPreCell, voCell);
      }
    }
    viRowSpan= PF.parseInt(voCell.getAttribute("rowspan"));
    vaoDestCell[i- viRowSpan+ 1]= voCell;//new Array(voPreCell, voCell);
    i-= viRowSpan;
    vsCellCode= this.getHeadCellCode(voCell.getAttribute("id"));
  }

  //获取定位的 cell;
  var vaoCellGroup= new Array();
  for (var len= voTB.childNodes.length, i= len- 1; i>= 0; i--){
    vaoCellGroup= this.setColIndex_HeadDispose_GetCell(voXml, i, iIndex);
    vaoDestCell[i]= vaoCellGroup[0];
  }

  //插入新的单元格组; rowspan 也需要进行处理;
  var voDestCell= null;
  var voRow= null;
  var viRowSpan= 0;
  var viDestRowSpan= 0;
  for (var i= vaoNewCell.length- 1, j= vaoDestCell.length- 1; i>= 0; i--){
    voCell= vaoNewCell[i];
    if (voCell== null) continue;
    voDestCell= vaoDestCell[i];
    voRow= vaoOldCell[i].parentNode;
    if (voDestCell== null) voRow.appendChild(voCell);
    else voRow.insertBefore(voCell, voDestCell);
  }

  //清除老的单元格组;
  for (var i= vaoOldCell.length- 1; i>= 0; i--){
    voCell= vaoOldCell[i];
    if (voCell== null) continue;
    viColSpan= PF.parseInt(voCell.getAttribute("colspan"));
    if (viColSpan> 1){
      viColSpan= PF.parseInt(voCell.getAttribute("colspan"));
      voCell.setAttribute("colspan", viColSpan- 1);
    }else voCell.parentNode.removeChild(voCell);
  }

  //父单元格左右融合;
  var voPreCell= null;
  var voNextCell= null;
  var viColSpan= 0;
  var viRowSpan= 0;
  var viPreRowSpan= 0;
  var viNextRowSpan= 0;
  var viCol= -1;
  if (iCol< iIndex) viCol= iIndex- 1;
  else viCol= iIndex;
  for (var i= vaoNewCell.length- 2; i>= 0; i--){
    voCell= vaoNewCell[i];
    if (voCell== null) continue;
    voPreCell= null;
    voNextCell= null;
    if (viCol> 0){
      vaoCellGroup= this.setColIndex_HeadDispose_GetCell(voXml, i, viCol- 1);
      voPreCell= vaoCellGroup[1];
    }
    if (viCol< this.getColCount()- 1){
      vaoCellGroup= this.setColIndex_HeadDispose_GetCell(voXml, i, viCol+ 1);
      voNextCell= vaoCellGroup[1];
    }

    viRowSpan= PF.parseInt(voCell.getAttribute("rowspan"));
    if (voPreCell!= null) viPreRowSpan= PF.parseInt(voPreCell.getAttribute("rowspan"));
    if (voNextCell!= null) viNextRowSpan= PF.parseInt(voNextCell.getAttribute("rowspan"));
    if (voPreCell!= null
        && voPreCell.text== voCell.text
        && viPreRowSpan== viRowSpan
        && voPreCell.parentNode== voCell.parentNode){
      viColSpan= PF.parseInt(voPreCell.getAttribute("colspan"));
      viColSpan++;
      voCell.parentNode.removeChild(voCell);
      if (voNextCell!= null
          && voPreCell.text== voNextCell.text
          && viPreRowSpan== viNextRowSpan
          && voPreCell.parentNode== voNextCell.parentNode){
        viColSpan+= PF.parseInt(voNextCell.getAttribute("colspan"));
        voNextCell.parentNode.removeChild(voNextCell);
      }
      voPreCell.setAttribute("colspan", viColSpan);
    }else if (voNextCell!= null
              && voNextCell.text== voCell.text
              && viNextRowSpan== viRowSpan
              && voNextCell.parentNode== voCell.parentNode){
      viColSpan= PF.parseInt(voNextCell.getAttribute("colspan"));
      viColSpan++;
      voCell.parentNode.removeChild(voCell);
      voNextCell.setAttribute("colspan", viColSpan);
    }
  }

  voBuf.clear();
  voBuf.append("<head>\n");
  voBuf.append(voXml.xml);
  voBuf.append("\n");
  voBuf.append("</head>\n");
  voBuf.append(this.setColIndex_HeadDispose_MakeDefaultParamMeta());
  this.setColIndex_HeadDispose_GetHeadTable(voBuf.toString());
  voBuf.clear();

  for (var i= 0; i< this.aoRepCellTable.length; i++){
    this.oHeadTablePanel.removeChild(this.aoRepCellTable[i]);
  }
  this.aoRepCellTable= new Array();
  this.initFields();
  this.initHead();
  this.restoreProp();
  return;
}
//----------------------------------------------------------------------
//private; 设置指定的列的显示位置,序列序.表头处理;获取指定位置看起来直观的cell;
//return: void;
function Grid_setColIndex_HeadDispose_GetHeadTable(sParamMeta){
  //alert("Grid_setColIndex_HeadDispose_GetHeadTable();");
  if (PF.isEmpty(sParamMeta)) return;
  var vaoCol= this.getCols();
  var vsPKFields= "";
  for (var i= 0, len= vaoCol.length; i< len; i++){
    if (PF.parseBool(vaoCol[i].ispk)== false) continue;
    vsPKFields+= vaoCol[i].fieldname+ ",";
  }
  var vsCompoName= DataTools.getCompoName();
  var vasName= new Array("compoName", "tableName", "paramMeta", "rowHeight", "pkFields");
  var vasValue= new Array(DataTools.getCompoNameByTable(this.getTableName()), this.getTableName(), sParamMeta, this.getHeadRowHeight(), vsPKFields);
  var vsRet= Info.requestDataK("getGridHeadTable", vsCompoName, vasName, vasValue);
  var viPos1= vsRet.indexOf("<tbody>");
  var viPos2= vsRet.indexOf("</tbody>");
  if (viPos1< 0 || viPos2< 10){
    Info.show(vsRet, this.CLASSNAME, "setColIndex_HeadDispose_GetHeadTable");
    return;
  }
  var vsTBody= vsRet.substring(viPos1, viPos2+ "</tbody>".length);
  this.oNewPanel.innerHTML= "<table>"+ vsTBody+ "</table>";
  var voTable= this.oNewPanel.firstChild;
  var voTBody= voTable.firstChild;
  if (voTBody== null) return;

  var voHeadTB= this.oHeadTable.tBodies[0];
  this.oHeadTable.removeChild(voHeadTB);
  this.oHeadTable.appendChild(voTBody);

  var voHeadTB= this.oLockHeadTable.tBodies[0];
  this.oLockHeadTable.removeChild(voHeadTB);
  this.oLockHeadTable.appendChild(voTBody.cloneNode(true));
  this.oNewPanel.innerHTML= "";
  return;
}
//----------------------------------------------------------------------
//private; 设置指定的列的显示位置,序列序.表头处理;获取指定位置看起来直观的cell;
//return: 成功:String; 否则:"";
function Grid_setColIndex_HeadDispose_MakeDefaultParamMeta(){
  var vasCap= this.getFieldCaptions();
  var voBuf= new StringBuffer();
  voBuf.append("<fields>\n");
  for (var i= 0, len= this.asFieldName.length; i< len; i++){
    voBuf.append("<field name=\"");
    voBuf.append(this.asFieldName[i]);
    voBuf.append("\" caption=\"");
    voBuf.append(vasCap[i]);
    voBuf.append("\" editboxtype=\"TextBox\" width=\"100\" align=\"\" isvisible=\"true\" isallowinput=\"true\" isreadonly=\"false\" iszoomimage=\"false\" ispopupimage=\"false\"/>\n");
  }
  voBuf.append("</fields>\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 设置指定的列的显示位置,序列序.表头处理;获取指定位置看起来直观的cell;
//return: 成功:cell; 否则:null;
function Grid_setColIndex_HeadDispose_GetCell(oTableXml, iRow, iCol){
  var vaxx2oMatrix= new Array(); //xx:行列;2:[0]=指定位置插入时用的单元格, [1]=显示时,指定位置的单元格;
  var vsKey= "";
  var voRow= null;
  var voCell= null;
  var viRowSpan= 0;
  var viColSpan= 0;
  var viRow= 0;
  var viCol= 0;
  var viColOffset= 0;
  var voTB= oTableXml.selectSingleNode("tbody");
  for (var i= 0, len= voTB.childNodes.length; i< len; i++){
    viColOffset= 0;
    voRow= voTB.childNodes[i];

    for (var j= 0, lenj= voRow.childNodes.length; j< lenj; j++){
      voCell= voRow.childNodes[j];
      viRowSpan= PF.parseInt(voCell.getAttribute("rowspan"));
      viColSpan= PF.parseInt(voCell.getAttribute("colspan"));

      for (var x= 0; x< viRowSpan; x++){
        viRow= i+ x;
        if (vaxx2oMatrix[viRow]== null) vaxx2oMatrix[viRow]= new Array();

        for (var y= 0; y< viColSpan; y++){
          viCol= j+ y+ viColOffset;
          if (vaxx2oMatrix[viRow][viCol]== null){
            vaxx2oMatrix[viRow][viCol]= new Array();
            if (x== 0) vaxx2oMatrix[viRow][viCol][0]= voCell;
            else vaxx2oMatrix[viRow][viCol][0]= null;
            vaxx2oMatrix[viRow][viCol][1]= voCell;
          }else{
            if (x== 0){
              for (var z= viCol; z< vaxx2oMatrix[viRow].length; z++){
                viColOffset++;
                viCol= j+ y+ viColOffset;
                if (vaxx2oMatrix[viRow][viCol]== null) break;
              }
              vaxx2oMatrix[viRow][viCol]= new Array();
              vaxx2oMatrix[viRow][viCol][0]= voCell;
            }else vaxx2oMatrix[viRow][viCol][0]= null;
            vaxx2oMatrix[viRow][viCol][1]= voCell;
          }
        }
      }
    }
  }

  var vaoCellGroup= vaxx2oMatrix[iRow][iCol];
  if (vaoCellGroup[0]== null){
    viCol= -1;
    for (var i= iCol; i< vaxx2oMatrix[iRow].length; i++){
      if (vaxx2oMatrix[iRow][i][0]!= null){
        viCol= i;
        break;
      }
    }
    if (viCol>= 0){
      vaoCellGroup[0]= vaxx2oMatrix[iRow][viCol][0];
    }
  }
  return vaoCellGroup;
}

function Grid_saveAsExcel(componame){
	var vsNames = new Array();
	var vsValues = new Array();
	var tabledata = DataTools.getTableData(this.getTableName());
	if(PF.isEmpty(componame))
		componame = DataTools.getCompoName();
	var ruleId = tabledata.getElementsByTagName("meta")[0].getAttribute("sqlid");
	var cond = tabledata.getElementsByTagName("meta")[0].getAttribute("condition");
	cond += ";" + PageX.getListCondition();
	vsNames[vsNames.length] = "tableName";
	vsValues[vsValues.length] = this.getTableName();
	vsNames[vsNames.length] = "tableHead";
	vsValues[vsValues.length] = this.getTableLabels();
	vsNames[vsNames.length] = "compoName";
	vsValues[vsValues.length] = componame;
	
	var selectRows = this.getSelectedRowIndexs();
	if(selectRows && selectRows.length >0){
		vsNames[vsNames.length] = "tableData";
		vsValues[vsValues.length] = this.getSelectedDataOneDelta();
	}else{
		vsNames[vsNames.length] = "ruleID";
		vsValues[vsValues.length] = ruleId;
		vsNames[vsNames.length] = "condition";
		vsValues[vsValues.length] = cond;
	}
	
	var vaoSearch= PageX.getFreeManager().getSearchByTableName(this.getTableName());
  if (vaoSearch != null && vaoSearch.length > 0){
  	vsNames[vsNames.length] = "type";
		vsValues[vsValues.length] = vaoSearch[0].searchType;
  }else{
  	vsNames[vsNames.length] = "type";
		vsValues[vsValues.length] = "simpleSearch";
  }
  
  var searchCond = tabledata.selectSingleNode("/*/meta").getAttribute("searchCond");
  if(searchCond){
    vsNames[vsNames.length] = "searchCond";
		vsValues[vsValues.length] = searchCond; 
  }
  
	vsNames[vsNames.length] = "valueSet";
	vsValues[vsValues.length] = this.asValueSet;
	Info.frameSubmit("exportExcelData", "all", vsNames, vsValues);
}
function Grid_getTableLabels(){
	var result = "";
  	result += "<elements>";
  	var vsFieldNames= this.getFieldNames();
  	if(vsFieldNames){
	  	for(var i = 0; i < vsFieldNames.length; i++){
	  		if(!this.isColVisible(vsFieldNames[i])){
		  		continue;
		  	}
		  	//----统计值集列，隐藏列除外------
		  	var valueSet = this.getFieldAttr(vsFieldNames[i], "valuesetcode");
		  	if(!PF.isEmpty(valueSet)){
		  		if(this.asValueSet != "")this.asValueSet += ";";
		  		this.asValueSet += vsFieldNames[i] + "=" + valueSet;
		  	}
		  	
		  	var voField = this.getHeadCell(vsFieldNames[i]);
		  	if(voField.style.display == "none"){
		  		continue;	
		  	}
		    result += "<element name=\"" + vsFieldNames[i] + "\" value=\"" + this.getFieldCaption(vsFieldNames[i]) + "\"/>\n";
	  	}
	}
  	result += "</elements>";
  	return result;
}
function Grid_getSelectedDataOneDelta(){
	//debugger;
	var result = "";
	var selectRows = this.getSelectedRowIndexs();
	if(selectRows && selectRows.length > 0){
		result += "<delta>\n";
		var fieldNames = this.getFieldNames();
		for (var i = 0; i < selectRows.length; i ++ ){
			result += "<entity name = \"body\">\n";
			for(var j = 0; j < fieldNames.length; j++){
				if(!this.isColVisible(fieldNames[j])){
			  		continue;
			  	}
				var fieldValue = this.getValueByRowField(selectRows[i], fieldNames[j]);
				//var vmVsMap = this.getVSMap(fieldNames[j]);
				//if(vmVsMap)
				//	fieldValue = vmVsMap.get(fieldValue);
				//if(fieldValue == null){
				//	fieldValue = "";	
				//}
				result += "<field name=\""+fieldNames[j]+"\" value=\""+PF.getHtmlEncode(fieldValue)+"\" />\n";
	 		}
	 		result += "</entity>\n";
  		}
  		result += "</delta>\n";
	}
	return result;
}
//----------------------------------------------------------------------
//public; 保存为 excel 文件;
//return: 成功:true; 否则:false;
/*function Grid_saveAsExcel(sFileName, sTitle){
  var vsFile= PF.forceFileExtName(sFileName, "xls");
  var vsText= this.makeHtmlData(sTitle);
  return PF.writeFile(vsFile, vsText);
}*/
//----------------------------------------------------------------------
//public; 生成文件内容 html;
//return: 成功:文件内容;否则:"";
function Grid_makeHtmlData(sTitle){
  if (PF.isEmpty(sTitle)){
    var voMap= PageX.getLanTransData(new Array(this.getTableName(), DataTools.getCompoName()));
    sTitle= voMap.get(this.getTableName());
    if (sTitle== this.getTableName()) sTitle= voMap.get(DataTools.getCompoName());
    if (sTitle== DataTools.getCompoName()) sTitle= this.getTableName();
    if (PF.isEmpty(sTitle)) sTitle= "未命名";
  }
  
  this.oNewPanel.innerHTML= this.oHeadTable.outerHTML;
  var voTable= this.oNewPanel.firstChild;
  var voSelectAllTD= voTable.all(this.getHeadCellID(this.SELECT_CHECK_FIELD_NAME));
  voSelectAllTD.parentNode.removeChild(voSelectAllTD);
  var voCell= null;
  for (var i= 0, len= voTable.rows.length; i< len; i++){
    for (var j= 0, lenj= voTable.rows[i].cells.length; j< lenj; j++){
      voCell= voTable.rows[i].cells[j];
      voCell.style.color= voCell.currentStyle.color;
      voCell.style.backgroundColor= voCell.currentStyle.backgroundColor;
      voCell.style.textAlign= voCell.currentStyle.textAlign;
      voCell.style.verticalAlign= voCell.currentStyle.verticalAlign;
    }
  }

  var voBuf= new StringBuffer();
  //add by liubo 
  voBuf.append("<html xmlns:v=\"urn:schemas-microsoft-com:vml\"\n");
  voBuf.append("xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n");
  voBuf.append("xmlns:x=\"urn:schemas-microsoft-com:office:excel\">\n");
  voBuf.append("<body>\n");
  voBuf.append("<table border='0'>\n");
  voBuf.append("<tbody>\n");
  voBuf.append("<tr>\n");
  voBuf.append("<td colspan=\""+ this.getColCount()+ "\" style=\"text-align:center;vertiacal-align:center;\">\n");
  voBuf.append(sTitle);
  voBuf.append("</td>\n");
  voBuf.append("</tr>\n");
  voBuf.append("<tr><td>&nbsp;</td></tr>\n");
  voBuf.append("</tbody>\n");
  voBuf.append("</table>\n");

  var vsBorderColor= this.oInnerPanel.currentStyle.borderColor;
  voBuf.append("<table border='1' borderColor='"+ vsBorderColor+ "'>\n");
  voBuf.append(this.oBodyColGroup.outerHTML+ "\n");
  voBuf.append("<tbody>\n");

  var tBodyHead= voTable.tBodies[0].innerHTML;
  while(tBodyHead.indexOf("*") > 0){//去掉表头*号
    tBodyHead= tBodyHead.replace("*","");
  }
	var imgIndex = tBodyHead.indexOf("<IMG");
	while(imgIndex > 0){
		var tmpVar = tBodyHead.substring(imgIndex);
		var imgIndex2 = tmpVar.indexOf(">");
	  tBodyHead = tBodyHead.substring(0, imgIndex) + tBodyHead.substring(imgIndex + imgIndex2 + 1);
	  imgIndex = tBodyHead.indexOf("<IMG");
	}
  voBuf.append(tBodyHead);

  var voRS= DataTools.getRecordset(this.getTableName());
  if (voRS!= null){
    voRS.MoveFirst();
    while(!voRS.EOF){
      voBuf.append("<tr>\n");
      for (var i= 0, len= this.asFieldName.length; i< len; i++){
        var voCol= this.oBodyColGroup.childNodes[i];
        var vsValue = voRS(this.asFieldName[i]);
        if (typeof(vsValue) == "object") {
        	vsValue = vsValue.value;
        }
        var valueTemp = vsValue.replace(",", "");
        while (valueTemp.indexOf(",") > 0) valueTemp = valueTemp.replace(",", "");
        var isLongNum= false;
        var isDot = true;
				if (!isNaN(valueTemp)) {
					if (valueTemp.length > 16 || (valueTemp.indexOf("0") == 0 && valueTemp.indexOf(".") < 0)) {
						isLongNum = false;
					} else {
						isLongNum = true;
						if (valueTemp.indexOf(".") < 0) {
							isDot = false;
						}
					}
				}
        if (vsValue == null || vsValue == "") vsValue = "&nbsp;";
        if (isLongNum== true){
        	if (isDot) {
          	voBuf.append("<TD class=Normal style='word-break:break-all;mso-number-format:\"#,##0.00\"' width=100 x:num='"+valueTemp+"'>"+vsValue+"&nbsp;</TD>\n");
        	} else {
        		voBuf.append("<TD class=Normal style='word-break:break-all;mso-number-format:\"#,##0\"' width=100 x:num='"+valueTemp+"'>"+vsValue+"&nbsp;</TD>\n");
        	}
        }else if (voCol.fieldtype.toUpperCase()== "TEXT"){
          voBuf.append("<TD class=Normal style='word-break:break-all' width=100 x:str='"+vsValue+"'>"+vsValue+"&nbsp;</TD>\n");
        }else{
          voBuf.append("<TD class=Normal style='word-break:break-all' width=100>"+vsValue+"</TD>\n");
        }
      }
      voBuf.append("</tr>\n");
      voRS.MoveNext();
    }
  }
  voBuf.append("</tbody>\n");
  voBuf.append("</table>\n");
  voBuf.append("</body>\n");
  voBuf.append("</html>");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//public; 增加值集选项;
//return: true / false;
function Grid_addVSOption(sField, sCode, sName){
	var vs = this.getVSByFieldName(sField);
	if (vs){
		vs.setAttribute('a' + sCode,sName);
	}
  return true;
}
//----------------------------------------------------------------------
//public;
function Grid_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public;
function Grid_setTableName(sTableName){
  this.oOuterPanel.tablename= sTableName;
}
//----------------------------------------------------------------------
//public;
function Grid_getInnerLineColor(){
  return this.oOuterPanel.innerlinecolor;
}
//----------------------------------------------------------------------
//public;
function Grid_setInnerLineColor(value){
  this.oOuterPanel.innerlinecolor= value;
  if (this.oBodyTable!= null) this.oBodyTable.borderColor= value;
  if (this.oLockBodyTable!= null) this.oLockBodyTable.borderColor= value;
}
//----------------------------------------------------------------------
//public;
function Grid_getPropFileId(){
  return this.oOuterPanel.propfileid;
}
//----------------------------------------------------------------------
//public;
function Grid_setPropFileId(sPropFileId){
  this.oOuterPanel.propfileid= sPropFileId;
}
//----------------------------------------------------------------------
//public;
function Grid_getRowHeight(){
  return PF.parseInt(this.oOuterPanel.rowheight);
}
//----------------------------------------------------------------------
//public;
function Grid_setRowHeight(iRowHeight){
  this.oOuterPanel.rowheight= iRowHeight;
}
//----------------------------------------------------------------------
//public;
function Grid_getHeadRowHeight(){
  return PF.parseInt(this.oOuterPanel.headrowheight);
}
//----------------------------------------------------------------------
//public;
function Grid_setHeadRowHeight(iRowHeight){
  this.oOuterPanel.headrowheight= iRowHeight;
}
//----------------------------------------------------------------------
//public;
function Grid_getTabIndex(){
  return PF.parseInt(this.oOuterPanel.tabindex);
}
//----------------------------------------------------------------------
//public;
function Grid_setTabIndex(iTabIndex){
  this.oOuterPanel.tabindex= iTabIndex;
}
//----------------------------------------------------------------------
//public;
function Grid_isReadOnly(){
  return PF.parseBool(this.oOuterPanel.isreadonly);
}
//----------------------------------------------------------------------
//public;
function Grid_setReadOnly(tIsReadOnly){
  this.oOuterPanel.isreadonly= tIsReadOnly;
}
//----------------------------------------------------------------------
//public;
function Grid_isLightRow(){
  return PF.parseBool(this.oOuterPanel.islightrow);
}
//----------------------------------------------------------------------
//public;
function Grid_setLightRow(tIsLightRow){
  this.oOuterPanel.islightrow= tIsLightRow;
}
//----------------------------------------------------------------------
//public;
function Grid_isExistCheck(){
  return PF.parseBool(this.oOuterPanel.isexistcheck);
}
//----------------------------------------------------------------------
//public;
function Grid_setExistCheck(tIsExistCheck){
  this.oOuterPanel.isexistcheck= tIsExistCheck;
}
//----------------------------------------------------------------------
//public;
function Grid_isEnterFirstRow(){
  return PF.parseBool(this.oOuterPanel.isenterfirstrow);
}
//----------------------------------------------------------------------
//public;
function Grid_setEnterFirstRow(tIsEnterFirstRow){
  this.oOuterPanel.isenterfirstrow= tIsEnterFirstRow;
}
//----------------------------------------------------------------------
//public;
function Grid_isMultiSel(){
  return PF.parseBool(this.oOuterPanel.ismultisel);
}
//----------------------------------------------------------------------
//public;
function Grid_setMultiSel(tIsMultiSel){
  this.oOuterPanel.ismultisel= tIsMultiSel;
}
//----------------------------------------------------------------------
//public;
function Grid_isSavePropBtnVisible(){
  return PF.parseBool(this.oOuterPanel.issavepropbutton);
}
//----------------------------------------------------------------------
//public;
function Grid_setSavePropBtnVisible(tIsButton){
  this.oOuterPanel.issavepropbutton= tIsButton;
  this.oSavePropButton.style.display= (this.isSavePropBtnVisible())? "": "none";
}
//----------------------------------------------------------------------
//public;
function Grid_isDelPropBtnVisible(){
  return PF.parseBool(this.oOuterPanel.isdeletepropbutton);
}
//----------------------------------------------------------------------
//public;
function Grid_setDelPropBtnVisible(tIsButton){
  this.oOuterPanel.isdeletepropbutton= tIsButton;
  this.oDeletePropButton.style.display= (this.isDelPropBtnVisible())? "": "none";
}
//----------------------------------------------------------------------
//public;
//return: PaginationConsole / null;
function Grid_getPaginationConsole(){
  return this.oPagination;
}
//----------------------------------------------------------------------
//public;
function Grid_getUserButton(sId){
  return this.oUserBtnMap.get(sId);
}
//----------------------------------------------------------------------
//public;
function Grid_getAllUserButton(){
  return this.oUserBtnMap.getAllItem();
}
//----------------------------------------------------------------------
//public;
function Grid_isAutoAppear(){
  return PF.parseBool(this.oOuterPanel.isautoappear);
}
//----------------------------------------------------------------------
//public;
function Grid_setAutoAppear(tValue){
  this.oOuterPanel.isautoappear= tValue;
}
//----------------------------------------------------------------------
//public;
function Grid_getSumFields(){
  return this.oOuterPanel.sumfields;
}
//----------------------------------------------------------------------
//public;
function Grid_getSumDescField(){
  return this.oOuterPanel.sumdescfield;
}
//----------------------------------------------------------------------
//public;
function Grid_getTotalDescField(){
  return this.oOuterPanel.totaldescfield;
}
//----------------------------------------------------------------------
//public;
function Grid_getSumDesc(){
  return this.oOuterPanel.sumdesc;
}
//----------------------------------------------------------------------
//public;
function Grid_getTotalDesc(){
  return this.oOuterPanel.totaldesc;
}
//----------------------------------------------------------------------
//public;
function Grid_getSumRowBackColor(){
  return this.oOuterPanel.sumbackcolor;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Grid_refreshSumRow(){
  if (this.oSumRowTable== null) return;
  this.clearSumTable();
  this.refreshPageSumRow();
  this.refreshDBTotalRow();
}
//----------------------------------------------------------------------
//private;
//return: void;
function Grid_refreshPageSumRow(){
  if (this.oSumRowTable== null) return;
  if (this.iSumRowX< 0) return;
  var sumFields = this.getSumFields();
  if (sumFields == null || sumFields == "") return;
  var sumfieldArray = sumFields.split(",");
  if (this.oSumFieldMap== null){
    this.oSumFieldMap= new Map();
    var vasField= new Array();
    for (var i= 0; i< sumfieldArray.length; i++){
      sumfieldArray[i]= PF.trim(sumfieldArray[i]);
      if (sumfieldArray[i]== null || sumfieldArray[i]== "") continue;
      vasField[i]= sumfieldArray[i];
  
      var viLen= 18;
      var viScale= 2;
    	var voField= DataTools.getTableFieldMeta(this.getTableName(), vasField[i]);
    	if (voField!= null){
        viLen= PF.parseInt(voField.getAttribute("length"));
        viScale= PF.parseInt(voField.getAttribute("scale"));
      }

      var voObj= new Object();
      voObj.field= vasField[i];
      voObj.rowIndex= i;
      voObj.length= viLen;
      voObj.scale= viScale;
      this.oSumFieldMap.put(vasField[i], voObj);
    }
  }

  var vasField= this.oSumFieldMap.getAllKey();
  for (var i= 0; i< vasField.length; i++){
    var voObj= this.oSumFieldMap.get(vasField[i]);
    if (!voObj) continue;
    var vsValue= DataTools.sum(this.getTableName(), voObj.field, this.getSumCond(), voObj.length, voObj.scale)[1];
    var viIndex= this.getColIndexByField(voObj.field);
    if (viIndex< 0) continue;
    var voCol= this.getCol(viIndex);
    if (vsValue== ""){
      vsValue= " ";
    }else if (PF.parseBool(voCol.iskilo)){
      vsValue= PF.parseKilo(vsValue);
    }
    this.oSumRowTable.rows[this.iSumRowX].cells[viIndex].innerText= vsValue;
    if (this.oLockSumRowTable.rows.length> 0 
        && viIndex< this.oLockSumRowTable.rows[this.iSumRowX].cells.length- 1){
      this.oLockSumRowTable.rows[this.iSumRowX].cells[viIndex+ 1].innerText= vsValue;
    }
  }
  
  var viCol= this.getColIndexByField(this.getSumDescField());
  if (viCol>= 0){
    var voCell= this.oSumRowTable.rows[this.iSumRowX].cells[viCol];
    voCell.style.textAlign= "center";
    voCell.innerText= this.getSumDesc();
    if (this.oLockSumRowTable.rows.length> 0 
        && viCol< this.oLockSumRowTable.rows[this.iSumRowX].cells.length- 1){
      var voCell= this.oLockSumRowTable.rows[this.iSumRowX].cells[viCol+ 1];
      voCell.style.textAlign= "center";
      voCell.innerText= this.getSumDesc();
    }
  }
  return;
}
//----------------------------------------------------------------------
//private;
//return: void;
function Grid_refreshDBTotalRow(){
  if (this.oSumRowTable== null) return;
  if (this.iTotalRowX< 0) return;
  var voTableTotal= DataTools.getTableTotal(this.getTableName());
  if (voTableTotal== null) return;

  for (var i= 0; i< voTableTotal.childNodes.length; i++){
    var voField= voTableTotal.childNodes[i];
    var viCol= this.getColIndexByField(voField.nodeName);
    if (viCol< 0) continue;
    var voCol= this.getCol(viCol);
    var vsValue= PF.parseNumeric(voField.text, PF.parseInt(voCol.length), PF.parseInt(voCol.scale))[1];
    if (vsValue== ""){
      vsValue= " ";
    }else if (PF.parseBool(voCol.iskilo)){
      vsValue= PF.parseKilo(vsValue);
    }
    this.oSumRowTable.rows[this.iTotalRowX].cells[viCol].innerText= vsValue;
    if (this.oLockSumRowTable.rows.length> 0 
        && viCol< this.oLockSumRowTable.rows[this.iTotalRowX].cells.length- 1){
      this.oLockSumRowTable.rows[this.iTotalRowX].cells[viCol + 1].innerText= vsValue;
    }
  }

  var viCol= this.getColIndexByField(this.getTotalDescField());
  if (viCol>= 0){
    var voCell= this.oSumRowTable.rows[this.iTotalRowX].cells[viCol];
    voCell.style.textAlign= "center";
    voCell.innerText= this.getTotalDesc();
    if (this.oLockSumRowTable.rows.length> 0 
        && viCol< this.oLockSumRowTable.rows[this.iTotalRowX].cells.length- 1){
      var voCell= this.oLockSumRowTable.rows[this.iTotalRowX].cells[viCol+ 1];
      voCell.style.textAlign= "center";
      voCell.innerText= this.getTotalDesc();
    }
  }
}
//----------------------------------------------------------------------
//public;
//return: void;
function Grid_setRowTip(iRow, sTip){
  var voRow= this.getRow(iRow);
  if (voRow== null) return;
  voRow.title= sTip;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Grid_setColValue(sField, sValue){
  if (sValue== null) return;
  if (this.getRowCount()<= 0) return;
  if (this.isValidFieldName(sField)== false) return;
  DataTools.setColValue(this.getTableName(), sField, sValue);
  var viRows= this.getRowCount();
  for (var i= 0; i< viRows; i++){
    this.loadField(i, sField);
  }
}
//----------------------------------------------------------------------
//public;
function Grid_getSumCond(){
  return this.oOuterPanel.sumcond;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; 表格滚动处理.
//return: void;
function Grid_oBodyImagePanel_onscroll(){
  var voGrid= this.oOwner;
  voGrid.oFocusStopInput.focus();
  voGrid.grid_BodyPanel_onscroll_Dispose();

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(voGrid.eventAnswer_OnScroll)){
    voGrid.eventAnswer_OnScroll(voGrid, event);
  }
  voGrid.fireEvent(voGrid.OnScroll, new Array(voGrid, event));
  return true;
}
//----------------------------------------------------------------------
//private; 表格滚动处理.
//return: void;
function Grid_oBodyImagePanel_onmousedown(){
  var voGrid= this.oOwner;
  voGrid.oFocusStopInput.focus();
  return true;
}
//----------------------------------------------------------------------
//以下的 5 个鼠标事件用于处理列宽的拖动.
//表头中每个基层单元格的最后 6px 宽度为拖动的有效区.
//----------------------------------------------------------------------
//private; HeadTable.onmousemove 处理;
//return: void;
function Grid_oHeadTable_onmousemove(){
  //从 this 中获取 oOwner 对象;
  var voGrid= this.oOwner;
  var voCell= event.srcElement;

  //只有在 voGrid.tIsChangingColWidth== false 时,才进行改变列宽的标志处理;
  if (voGrid.tIsChangingColWidth== false){
    if (voCell.nodeName== "TD" && PF.parseBool(voCell.isleaf)){
      if (voCell.offsetWidth- event.offsetX< voGrid.VALID_WIDTH_OF_CHANGED_COL_WIDTH){
        voGrid.oOuterPanel.style.cursor= "col-resize";
        voGrid.tAllowChangeColWidth= true;
        voGrid.tAllowChangeColIndex= false;
      }else{
        voGrid.oOuterPanel.style.cursor= "hand";
        voGrid.tAllowChangeColWidth= false;
        voGrid.tAllowChangeColIndex= true;
      }
    }else{
      voGrid.oOuterPanel.style.cursor= "hand";
      voGrid.tAllowChangeColWidth= false;
      voGrid.tAllowChangeColIndex= false;
    }
  }
  return;
}
//----------------------------------------------------------------------
//private; HeadTable.onmouseout 处理;
//return: void;
function Grid_oHeadTable_onmouseout(){
  //从 this 中获取 oOwner 对象;
  var voGrid= this.oOwner;
  //只有在 voGrid.tIsChangingColWidth== false 时,才进行改变列宽的标志处理;
  if (voGrid.tIsChangingColWidth== false){
    voGrid.oOuterPanel.style.cursor= "hand";
    voGrid.tAllowChangeColWidth= false;
    voGrid.tAllowChangeColIndex= false;
  }
  return;
}
//----------------------------------------------------------------------
//private; HeadTable.onmousedown 处理;
//return: void;
function Grid_oHeadTable_onmousedown(){
  //从 this 中获取 oOwner 对象;
  var voGrid= this.oOwner;
  var voCell= event.srcElement;
    if (event.button== 1
        && event.ctrlKey== false
        && event.altKey== false
        && event.shiftKey== false){
    //列宽改变处理;
    if (voGrid.tAllowChangeColWidth){
      voGrid.tIsChangingColWidth= true;

      var voRect= PF.getAbsRect(voCell, voGrid.oOuterPanel);
      var viX= voRect.iLeft+ voRect.iWidth- (voCell.offsetWidth- event.offsetX)+ 1;

      voGrid.sChangedFieldName= voCell.fieldname;
      voGrid.tAllowChangeColWidth= false;
      voGrid.iMovingOffsetX= event.clientX- viX;
      voGrid.iMovingStartX= voRect.iLeft;

      voGrid.oMoveLine.style.display= "";
      voGrid.oMoveLine.style.left= viX;
      voGrid.oMoveLine.style.top= 2;
      voGrid.oMoveLine.style.width= 1;
      voGrid.oMoveLine.style.height= voGrid.oHeadPanel.clientHeight+ voGrid.oBodyImagePanel.clientHeight- 4;
    }else if(voGrid.tAllowChangeColIndex 
        && !PF.isEmpty(DataTools.getCompoNameByTable(voGrid.getTableName()))){
      //拖动换列处理;
      voGrid.tIsChangingColIndex= true;
      voGrid.sChangedFieldName= voCell.fieldname;
      voGrid.tAllowChangeColIndex= false;
      voGrid.iCellRelaX= event.clientX- voCell.offsetLeft;
      voGrid.iCellRelaY= event.clientY- voCell.offsetTop;
      voGrid.oMoveColPanel.style.width= voCell.offsetWidth;
      voGrid.oMoveColPanel.style.height= voCell.offsetHeight;

      voGrid.oMoveColTD.innerText= voCell.innerText;
      voGrid.oMoveColTD.style.fontSize= voCell.currentStyle.fontSize;
    }
  }
  return;
}
//----------------------------------------------------------------------
//private; HeadTable.onmousemove 处理;
//return: void;
function Grid_oOuterPanel_onmousemove(){
  var voGrid= this.oOwner;
  if (voGrid.tIsChangingColWidth){
    var viX= event.clientX- voGrid.iMovingOffsetX;
    if (viX< voGrid.iMovingStartX) viX= voGrid.iMovingStartX;
    voGrid.oMoveLine.style.left= viX;
  }

  //调用超类的事件处理;
  Base_oOuterPanel_onmousemove.call(this);
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmouseup 处理;
//return: void;
function Grid_oOuterPanel_onmouseup(){
  var voGrid= this.oOwner;

  //如果是在改变列宽,则设置新的列宽.
  if (voGrid.tIsChangingColWidth){
    var viX= event.clientX- voGrid.iMovingOffsetX;
    var viNewWidth= viX- voGrid.iMovingStartX;
    voGrid.setColWidth(voGrid.sChangedFieldName, viNewWidth);
    voGrid.tIsColChanged= true;

    voGrid.oMoveLine.style.display= "none";
    voGrid.oOuterPanel.style.cursor= "hand";
    voGrid.tAllowChangeColWidth= false;
    voGrid.tIsChangingColWidth= false;
  }

  if (voGrid.tIsChangingColIndex){
    voGrid.oMoveColPanel.style.display= "none";
    voGrid.tAllowChangeColIndex= false;
    voGrid.tIsChangingColIndex= false;
  }

  //调用超类的事件处理;
  Base_oOuterPanel_onmouseup.call(this);
  return true;
}
//----------------------------------------------------------------------
//private; HeadTable.onmousemove 处理;
//return: void;
function Grid_oHeadTablePanel_onmousemove(){
  var voGrid= this.oOwner;
  if (voGrid.tIsChangingColIndex
      && !PF.isEmpty(DataTools.getCompoNameByTable(voGrid.getTableName()))){
    voGrid.oMoveColPanel.style.display= "";
    voGrid.oMoveColPanel.style.left= event.clientX- voGrid.iCellRelaX;
    voGrid.oMoveColPanel.style.top= event.clientY- voGrid.iCellRelaY;
  }
  return;
}
//----------------------------------------------------------------------
//private; OuterPanel.onmouseup 处理;
//return: void;
function Grid_oMoveColPanel_onmouseup(){
  //从 this 中获取 oOwner 对象;
  var voGrid= this.oOwner;

  //如果是在改变列宽,则设置新的列宽.
  if (voGrid.tIsChangingColIndex
      && !PF.isEmpty(DataTools.getCompoNameByTable(voGrid.getTableName()))){
    voGrid.oMoveColPanel.style.display= "none";
    voGrid.oOuterPanel.style.cursor= "hand";
    voGrid.tAllowChangeColIndex= false;
    voGrid.tIsChangingColIndex= false;

    var viX= voGrid.oMoveColPanel.offsetLeft+ voGrid.oMoveColPanel.clientWidth;
    if (voGrid.isExistCheck()) viX+= voGrid.SELECT_CHECK_COL_WIDTH;
    var voRow= null;
    var voCell= null;
    for (var i= 0; i< voGrid.oHeadTable.rows.length; i++){
      voRow= voGrid.oHeadTable.rows[i];
      for (var j= 0; j< voRow.cells.length; j++){
        voCell= voRow.cells[j];
        if (PF.parseBool(voCell.isleaf)== false){
          voCell= null;
          continue;
        }
        if (voCell.offsetLeft<= viX
            && viX<= voCell.offsetLeft+ voCell.offsetWidth) break;
        voCell= null;
      }
      if (voCell!= null) break;
    }
    if (voCell!= null){
      voGrid.setColIndex(voGrid.sChangedFieldName, voCell.fieldname);
      voGrid.tIsHeadChanged= true;
    }
  }
  return true;
}
//----------------------------------------------------------------------
//private; Base 的事件响应; OnKeyDown;
//return: void;
function Grid_eventAnswer_OnKeyDown(oSender, oEvent){
  this.grid_OuterPanel_onkeydown_Dispose();
}
//----------------------------------------------------------------------
//private; 键盘支持的处理;
//return: void;
function Grid_oSelectAllCheckBox_onclick(){
  //从 this 中获取 oOwner 对象;
  var voGrid= this.oOwner;
  var vtIsSelected = voGrid.oSelectAllCheckBox.checked;
  var vaiRow= new Array();
  for (var i= 0, len= voGrid.oLockBodyTable.rows.length; i< len; i++) vaiRow[i]= i;
  var vtRet= voGrid.selectRows(vaiRow, vtIsSelected);
}
//----------------------------------------------------------------------
//private; 侦听 PaginationConsole.OnBeforeGo 事件;
//return: void;

function Grid_oPagination_OnBeforeGo(oSender, iCurPageIndex, iNewPageIndex){
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeRefreshData)){
    this.eventAnswer_OnBeforeRefreshData(this, iCurPageIndex, iNewPageIndex);
  }
  this.oPagination.abortEvent(this.isAbortEvent());
  this.fireEvent(this.OnBeforeRefreshData, new Array(this, iCurPageIndex, iNewPageIndex));
  this.oPagination.abortEvent(this.isAbortEvent());
  this.oPagination.pageSelect[iCurPageIndex] = this.getCurrentSelectedRowIndexsWithDataKeys();//this.getSelectedRowIndexs();
  return;
}
//*/
//----------------------------------------------------------------------
//private; 侦听 PaginationConsole.OnAfterGo 事件;
//return: void;
function Grid_oPagination_OnAfterGo(oSender){
  if (this.oPagination.isPagiAtClient()){
    this.iFromRow= this.oPagination.iFromRow- 1;
  }
  this.resort();
  if(this.oPagination.pageSelect[this.oPagination.iCurPage]){
	var select = this.oPagination.pageSelect[this.oPagination.iCurPage].rowIndex;
	if (select != null && select.length > 0) {
		this.selectRows(select, true);
	}
  }
}

//----------------------------------------------------------------------
//private; oBodyTable onfocus 处理;
//向外发布鼠标单击事件;
//return: void;
function Grid_oBodyTable_onfocus(){
  var voGrid= this.oOwner;
  voGrid.setFocus();
  return;
}
//----------------------------------------------------------------------
//private; BodyTable onclick 处理;
//向外发布鼠标单击事件; OnRowClick
//return: void;
function Grid_oBodyTable_onclick(){
//	debugger;
  //change by liubo ,延迟onclik事件，使得其他的事件得到执行的机会
  var voGrid= this.oOwner;
  var voCell = voGrid.getCellFromTableEvent(this);
  var newEvent = _copyIeEvent(event);
  function _table_onclick() {
      if (voCell== null) return;               
      //voGrid.lightFocusRow(true);               
                     
      var voRow= voCell.parentNode;               
      var viColIndex= voGrid.getColIndexByCell(voCell);               
      voGrid.setCurCell(voRow.rowIndex, viColIndex);               
                     
      //事件快速响应通道,仅供继承类使用;               
      if (PF.isExistMethodK(voGrid.eventAnswer_OnRowClick)){               
        voGrid.eventAnswer_OnRowClick(voGrid, voRow, newEvent);               
      }               
      //向外发送事件; OnRowClick               
      voGrid.fireEvent(voGrid.OnRowClick, new Array(voGrid, voRow, newEvent)); 
  }
  window.setTimeout(_table_onclick,1);
  return;
}
//----------------------------------------------------------------------
//private; InnerPanel ondblclick 处理;
//向外发布鼠标双击事件; OnRowDblClick
//return: void;
function Grid_oBodyPanel_ondblclick(){
  var voGrid= this.oOwner;
  var voRow= voGrid.getCurRow();
  if (voRow== null) return;

  //向外发送事件; OnRowDblClick
  if (PF.isExistMethodK(voGrid.eventAnswer_OnRowDblClick)){
    voGrid.eventAnswer_OnRowDblClick(voGrid, voRow, event);
  }
  voGrid.fireEvent(voGrid.OnRowDblClick, new Array(voGrid, voRow, event));
}
//----------------------------------------------------------------------
//private; InnerPanel ondblclick 处理;
//向外发布鼠标双击事件; OnRowDblClick
//return: void;
function Grid_oLockBodyPanel_ondblclick(){
  var voGrid= this.oOwner;
  voGrid.oBodyPanel.fireEvent("ondblclick");
}
//----------------------------------------------------------------------
//private; oLockBodyTable onfocus 处理;
//向外发布鼠标单击事件;
//return: void;
function Grid_oLockBodyTable_onfocus(){
  //从 this 中获取 oOwner 对象;
  var voGrid= this.oOwner;
  voGrid.setFocus();
  return;
}
//----------------------------------------------------------------------
//private; LockBodyTable onclick 处理;
//向外发布鼠标单击事件; OnRowClick
//将 LockBodyTable 中的 cell 转换为 bodytable 中的 cell;
//return: void;
function Grid_oLockBodyTable_onclick(){
  var voGrid= this.oOwner;
  var voCell= voGrid.getCellFromTableEvent(this);
  if (voCell== null) return;
  voGrid.lightFocusRow(true);

  var voRow= voGrid.getRow(voCell.parentNode.rowIndex);
  var viColIndex= voGrid.getColIndexByCell(voCell);
  if (viColIndex>= 0){
    voCell= voGrid.getCell(voCell.parentNode.rowIndex, viColIndex);
    voGrid.setCurCell(voRow.rowIndex, viColIndex);
  }

  //向外发送事件; OnRowClick
  if (PF.isExistMethodK(voGrid.eventAnswer_OnRowClick)){
    voGrid.eventAnswer_OnRowClick(voGrid, voRow, event);
  }
  voGrid.fireEvent(voGrid.OnRowClick, new Array(voGrid, voRow, event));

  //向外发送事件; OnRowSelected
  if (viColIndex< 0){
    voGrid.setCurCell(voRow.rowIndex, voGrid.getCurColIndex());
    var vtIsSelected= voCell.firstChild.checked;
    if (PF.isExistMethodK(voGrid.eventAnswer_OnRowSelected)){
      voGrid.eventAnswer_OnRowSelected(voGrid, voRow, vtIsSelected);
    }
    voGrid.fireEvent(voGrid.OnRowSelected, new Array(voGrid, voRow, vtIsSelected));
  }
  return;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//8.焦点处理事件组= function();
//----------------------------------------------------------------------
//private; 获得焦点.
//return: void;
function Grid_oOuterPanel_onfocus(){
  var voGrid= this.oOwner;
  return;
}
//----------------------------------------------------------------------
//private; 失去焦点.
//return: void;
function Grid_oOuterPanel_onblur(){
  var voGrid= this.oOwner;
  if (voGrid.isKeepFocus()) return;
  voGrid.lostFocus();
  return;
}
//----------------------------------------------------------------------
//private; Base 的事件响应; OnClick;
//return: void;
function Grid_eventAnswer_OnClick(oSender, oEvent){
  var voOwner= PF.getOwner(event.srcElement);
  if (voOwner== this) this.setFocus();
}
//----------------------------------------------------------------------
//private; 焦点处理;
//return: void;
function Grid_eventDispose_OnFocus(){
  this.oInnerPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oHeadPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oHeadTablePanel.onfocus= function(){this.oOwner.setFocus();};
//  this.oBodyPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oBodyImagePanel.onfocus= function(){this.oOwner.oFocusStopInput.focus();};
  this.oFocusStopInput.onfocus= function(){
    var voGrid= this.oOwner;
    voGrid.tIsFocus= true;
    voGrid.setHeadBackColor(voGrid.sHeadBackLightColor);
    voGrid.setRowBackColor(voGrid.iCurRow, voGrid.ROW_BACK_COLOR_SELECT_LIGHT, false);
    voGrid.setCurRowForeColor();
  };
  this.oBodyTableImagePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oBodyTablePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockBodyTablePanel.onfocus= function(){this.oOwner.setFocus();};

  this.oHeadTable.onfocus= function(){this.oOwner.setFocus();};
  this.oHeadRepCellTable.onfocus= function(){this.oOwner.setFocus();};

  this.oLockHeadPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockHeadTablePanel.onfocus= function(){this.oOwner.setFocus();};
//  this.oLockBodyPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockBodyTablePanel.onfocus= function(){this.oOwner.setFocus();};
  this.oLockHeadTable.onfocus= function(){this.oOwner.setFocus();};

  this.oNewPanel.onfocus= function(){this.oOwner.setFocus();};
  this.oMoveLine.onfocus= function(){this.oOwner.setFocus();};
//  this.oSelectAllCheckBox.onfocus= function(){this.oOwner.setFocus();};
}
//----------------------------------------------------------------------
//private;
function Grid_UserButtons_onclick(){
  var voGrid= this.oOwner;
  if (PF.isExistMethodK(voGrid.eventAnswer_OnUserButtonClick)){
    voGrid.eventAnswer_OnUserButtonClick(voGrid, this, event);
  }
  voGrid.fireEvent(voGrid.OnUserButtonClick, new Array(voGrid, this, event));
  //add by liubo 20070815
  if (this.id == "btnPrev" || this.id == "btnNext") {
  	PageX.getRowManager().clearAll();
  }
  //end
}
//----------------------------------------------------------------------
//public;设置卡片是否显示;
function Grid_setCardDisOrNot(vbDisCard){
	this.bDisCard= vbDisCard;
	if(PF.isEmpty(vbDisCard)) return;
	var voBoxSet= PageX.getBoxSet(this.getTableName(), "grid");
	if (PF.isEmpty(voBoxSet)) return;
	
	var voGridPanelObj= this;
	var voBoxSetPanelObj= voBoxSet;
  var voOuterTabStrip1= this.getOuterTabStrip(voBoxSet);
  if (!PF.isEmpty(voOuterTabStrip1)) voBoxSetPanelObj= voOuterTabStrip1;
  var voOuterTabStrip2= this.getOuterTabStrip(this);
  if (!PF.isEmpty(voOuterTabStrip2)) voGridPanelObj= voOuterTabStrip2;
  
  var viBoxSetPanelHeight= voBoxSetPanelObj.oRect.iHeight;
  var viGridPanelHeight= voGridPanelObj.oRect.iHeight; 
  var viCalcGridHeight= this.calcGridHeight(viGridPanelHeight, viBoxSetPanelHeight, vbDisCard);

	
	if (vbDisCard== true){
	  if (voBoxSet.isVisible()) return;	
    voGridPanelObj.oRect.iHeight= viCalcGridHeight;
    voBoxSetPanelObj.setVisible(true);
    voGridPanelObj.resize();	  
	}
  else if (vbDisCard== false){
  	if (!voBoxSet.isVisible()) return;
    voGridPanelObj.oRect.iHeight= viCalcGridHeight;
    voBoxSetPanelObj.setVisible(false);
    voGridPanelObj.resize();
  }	
}
//----------------------------------------------------------------------
//private; 在是否显示卡片时，重新计算Grid的新的高度
function Grid_calcGridHeight(iGridHeight, iBoxSetHeight, vbDisCard){
	var viCalcResult= 0;
	var vsGridHeight= iGridHeight+ "";
	var vsBoxSetHeight= iBoxSetHeight+ "";
  var viClientHeight= document.body.clientHeight;
	if (vsGridHeight.indexOf("%")> 0){
	  if (vsBoxSetHeight.indexOf("%")> 0){
	  	if (vbDisCard== true)
	  	  viCalcResult= (PF.parseInt(iGridHeight)- PF.parseInt(iBoxSetHeight))+ "%";
	  	else
	  		viCalcResult= (PF.parseInt(iGridHeight)+ PF.parseInt(iBoxSetHeight))+ "%";  
	  }
	  else {
	  	if (vbDisCard== true){
		    iBoxSetHeight= PF.parseInt(iBoxSetHeight);
		    viCalcResult= (PF.parseInt(iGridHeight)- PF.parseInt(iBoxSetHeight*100/viClientHeight)) +"%";
		  }  
		  else {
		    iBoxSetHeight= PF.parseInt(iBoxSetHeight);		  	
		  	viCalcResult= (PF.parseInt(iGridHeight)+ PF.parseInt(iBoxSetHeight*100/viClientHeight))+ "%"; 
		  }	
	  }		
	}
  else { //Gird高度不是用百分比表示的
	  if (vsBoxSetHeight.indexOf("%")< 0){
	  	if (vbDisCard== true)
	  	  viCalcResult= PF.parseInt(iGridHeight)- PF.parseInt(iBoxSetHeight);
	  	else
	  		viCalcResult= PF.parseInt(iGridHeight)+ PF.parseInt(iBoxSetHeight);  
	  }
	  else {
	  	if (vbDisCard== true){
		    iBoxSetHeight= PF.parseInt(iBoxSetHeight);	  		
			  viCalcResult= PF.parseInt(iGridHeight)- PF.parseInt(iBoxSetHeight*viClientHeight/100);
			}  
			else{
		    iBoxSetHeight= PF.parseInt(iBoxSetHeight);			
				viCalcResult= PF.parseInt(iGridHeight)+ PF.parseInt(iBoxSetHeight*viClientHeight/100);  
			}	
    }	
  }
  
  return viCalcResult;	
}	
//----------------------------------------------------------------------
//得到一个控件对象外面的页签
function Grid_getOuterTabStrip(obj){
	var voOuterTabStrip= null;
	if (PF.isEmpty(obj)) return null;
	if (PF.isEmpty(obj.getOuterPanel())) return null;
	if (PF.isEmpty(obj.getOuterPanel().parentElement)) return null;
	if (PF.isEmpty(obj.getOuterPanel().parentElement.parentElement)) return null;
	if (PF.isEmpty(obj.getOuterPanel().parentElement.parentElement.parentElement)) return null;
	var vsTabStripId= obj.getOuterPanel().parentElement.parentElement.parentElement.id;
	if (PF.isEmpty(vsTabStripId)) return null;
	
  var voAllPageObj= PageX.getAllCtrlObj();
  for(var i=0,j=voAllPageObj.length; i<j; i++){
    if(voAllPageObj[i].CLASSNAME== "gp.page.Tabstrip" && voAllPageObj[i].getOuterPanel().id== vsTabStripId){
      voOuterTabStrip= voAllPageObj[i];
      break;
     }
  }
  
  return 	voOuterTabStrip;
}	
//----------------------------------------------------------------------
//public;初始化与该Grid相关联的BoxSet是否显示;
function Grid_initRelCardDisOrNot(){
  var voXmlDoc= null;
  if (!PF.isEmpty(this.oPropXml)) voXmlDoc= this.oPropXml.documentElement;
  var vbSuccess= false;
  if (voXmlDoc!= null){
    var voDisCard= voXmlDoc.selectSingleNode("//root/discard");
    if (voDisCard!= null){
      if (!PF.isEmpty(voDisCard.text)){
  	    var vsDisCard= voDisCard.text;
  		  this.setCardDisOrNot(PF.parseBool(vsDisCard));
  		  vbSuccess= true;
  	  }	
    }
  }  

  if (!vbSuccess){
    var voMap= PageX.getOptions("OPT_DIS_CARD", "AS_DISCARD_OPT", "*", "*");
    if (voMap!= null){
      var vsOptValue= voMap.get("OPT_DIS_CARD");
      if(!PF.isEmpty(vsOptValue))  this.setCardDisOrNot(PF.parseBool(vsOptValue));
     }  
  } 	
	return;
}	
	
//----------------------------------------------------------------------
//向外发布鼠标点击事件;
function Grid_oHeadTable_onclick(){
	if (!PF.isEmpty(this.sRowIdField)) return;
	
  var voCell= event.srcElement;
  if (voCell== null) return;
  if (voCell.nodeName!="TD" || voCell.isleaf!= "true") return;
  var vsSortDir= voCell.sortdir;
  var vbIsUp = true;
  if (vsSortDir == "0"){
    voCell.setAttribute("sortdir","1");
    vbIsUp = true;
  }else{
    voCell.setAttribute("sortdir","0");
    vbIsUp = false;
  }  
  var vsFieldName= voCell.fieldname;
  var voGrid= this.oOwner;  
  voGrid.setSortImg(voCell.fieldname, vbIsUp, voGrid);
  //保留原来的排序字段的设置 20061127;
  var vasOldSortField= voGrid.asSortField;
  var vtOldSortAscend= voGrid.tIsSortAscend; 
  voGrid.sort([vsFieldName], vbIsUp);	
  voGrid.asSortField= vasOldSortField;
  voGrid.tIsSortAscend= vtOldSortAscend;    
}
//----------------------------------------------------------------------
//private; 点击时，根据是升序还是降序设置不同的图标
function Grid_setSortImg(sFieldName, bIsUp, oGrid) {
	if (PF.isEmpty(sFieldName)) return;
	var viColIndex= oGrid.getColIndexByField(sFieldName);
	if (viColIndex <0) return;
	
	var vaoImgs =  this.oHeadTable.getElementsByTagName("img");
  for (var i=0,j=vaoImgs.length; i<j; i++){
    if (i!=viColIndex)
      vaoImgs.item(i).setAttribute("src","/style/img/main/blank.gif");
    else if (bIsUp)
      vaoImgs.item(i).setAttribute("src","/style/img/main/sortup.gif");
    else
      vaoImgs.item(i).setAttribute("src","/style/img/main/sortdown.gif");
  }
}	

//add by liubo begin
function Grid_getFieldAttr(fieldName,fieldAttr){
    var tablename = this.getTableName();
	var voFieldMeta = DataTools.getTableFieldMeta(tablename,fieldName);
	if(!voFieldMeta) return null;
	var vsFieldAttr = voFieldMeta.getAttribute(fieldAttr);
	return vsFieldAttr;
}	

//按as_tab_col中对字段格式的描述格式化数据
function Grid_formatColumn(tableMeta, field) {
  var fieldname = field.getAttribute("name");
  var res = field.getAttribute("value");
  var type = this.getFieldAttr(fieldname, "type");
  if (type == null) return res;
  if (type.toLowerCase() == "num") {
    var iskilo = this.getFieldAttr(fieldname, "iskilo");
    iskilo = iskilo==null ? false:eval(iskilo);
    var scale = this.getFieldAttr(fieldname, "scale");
    scale = scale==null ? 0:parseInt(scale);
    if (scale > 0) {
      if (res.indexOf(".") < 0) {
        res += ".";   
      }
      for (var i =0; i < scale ; i++) {
        res += "0";   
      }
      var temp = PF.parseNumeric(res,res.length,scale);
      if (temp) {
        res = temp[1];   
      }
    }
    if (iskilo) {
      res = PF.parseKilo(res);
    }
  }else if (type.toLowerCase() == "date") {
    res = res.substring(0,10);
  }else if (type.toLowerCase() == "datetime") {
    res = res.substring(0,16);
  }
  return res;
}

//用以保存IE event的状态
function NewEvent(){
    this.altKey = false;
    this.altLeft = false;
    this.ctrlKey = false;
    this.ctrlLeft = false;
    this.shiftKey = false;
    this.shiftLeft = false;
    this.keyCode = -1;
    this.button = -1;
    
    this.clientX = 0;
    this.clientY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.screenX = 0;
    this.screenY = 0;
    this.x = 0;
    this.y = 0;
    this.srcElement = null;
    this.type = "";
}	
//复制ie event的状态值
function _copyIeEvent(srcEvent) {
    var newEvent = new NewEvent();
    for (var prop in newEvent) {
        if (srcEvent[prop]) {
            newEvent[prop] = srcEvent[prop];   
        }   
    }
    return newEvent;
}
//add by liubo end

function Grid_release() {
	if (this.oInnerPanel != null) {
		this.oInnerPanel.oOwner = null;
	}
	if (this.oBodyPanel != null) {
		this.oBodyPanel.oOwner = null;
		this.oBodyPanel.ondblclick = null;
	}
	if (this.oBodyImagePanel != null) {
		this.oBodyImagePanel.oOwner = null;
		this.oBodyImagePanel.onmousedown = null;
		this.oBodyImagePanel.onscroll = null;
	}
	if (this.oBodyTablePanel != null) {
		this.oBodyTablePanel.oOwner = null;
	}
	if (this.oBodyTableImagePanel != null) {
		this.oBodyTableImagePanel.oOwner = null;
	}
	if (this.oLockBodyPanel != null) {
		this.oLockBodyPanel.oOwner = null;
		this.oLockBodyPanel.ondblclick = null;
	}
	if (this.oLockBodyTablePanel != null) {
		this.oLockBodyTablePanel.oOwner = null;
	}
	if (this.oMoveLine != null) {
		this.oMoveLine.oOwner = null;
	}
	if (this.oFocusStopInput != null) {
		this.oFocusStopInput.oOwner = null;
	}
	if (this.oActionButtonPanel != null) {
		this.oActionButtonPanel.oOwner = null;
	}
	if (this.oAppendRowButton != null) {
		this.oAppendRowButton.oOwner = null;
	}
	if (this.oInsertRowButton != null) {
		this.oInsertRowButton.oOwner = null;
	}
	if (this.oDeleteRowButton != null) {
		this.oDeleteRowButton.oOwner = null;
	}
	if (this.oSavePropButton != null) {
		this.oSavePropButton.oOwner = null;
		this.oSavePropButton.onclick = null;
	}
	if (this.oDeletePropButton != null) {
		this.oDeletePropButton.oOwner = null;
		this.oDeletePropButton.onclick = null;
	}
	if (this.oActionButtonTable != null) {
		this.oActionButtonTable.oOwner = null;
	}
	if (this.oDefValSpan != null) {
		this.oDefValSpan.oOwner = null;
	}
	if (this.oUserDefinedButtonTable != null) {
		this.oUserDefinedButtonTable.oOwner = null;
	}
	if (this.oHeadPanel != null) {
		this.oHeadPanel.oOwner = null;
	}
	if (this.oHeadTablePanel != null) {
		this.oHeadTablePanel.oOwner = null;
		this.oHeadTablePanel.onmousemove = null;
		this.oHeadTablePanel.onmouseout = null;
		this.oHeadTablePanel.onmousedown = null;
		this.oHeadTablePanel.onclick = null;
	}
	if (this.oMoveColPanel != null) {
		this.oMoveColPanel.oOwner = null;
		this.oMoveColPanel.onmouseup = null;
	}
	if (this.oMoveColTD != null) {
		this.oMoveColTD.oOwner = null;
	}
	if (this.oLockHeadPanel != null) {
		this.oLockHeadPanel.oOwner = null;
	}
	if (this.oLockHeadTablePanel != null) {
		this.oLockHeadTablePanel.oOwner = null;
	}
	if (this.oHeadColGroup != null) {
		this.oHeadColGroup.oOwner = null;
	}
	if (this.oLockHeadColGroup != null) {
		this.oLockHeadColGroup.oOwner = null;
	}
	if (this.oSelectAllCheckBox != null) {
		this.oSelectAllCheckBox.oOwner = null;
		this.oSelectAllCheckBox.onclick = null;
	}
	
	if (this.oBodyTable != null) {
		this.oBodyTable.oOwner = null;
		this.oBodyTable.onclick = null;
		this.oBodyTable.onfocus = null;
	}
	if (this.oLockBodyTable != null) {
		this.oLockBodyTable.oOwner = null;
		this.oLockBodyTable.onclick = null;
		this.oLockBodyTable.onfocus = null;
	}
	if (this.oHeadTable != null) {
		this.oHeadTable.oOwner = null;
	}
	if (this.oPagination != null) {
		this.oPagination.release();
	}
	Base_release.call(this);
}
/**
 * 获取当前页面所选择数据的主键
 * @return
 */
function Grid_getCurrentSelectedRowIndexsWithDataKeys(){
	if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getSelectedRowIndexs");
	
	var vsKeyFieldNames = DataTools.getKeyFieldNames(this.getTableName());
	var vaiRowIndex = new Array();
	var vaiDataKeys = new Array();
	var voRow= null;
	var voCheckBox= null;
	for (var i= 0, len = this.getRowCount(); i < len; i++){
		voRow= this.oLockBodyTable.rows(i);
	    if (voRow== null) continue;
	    voCheckBox= voRow.firstChild.firstChild;
	    if (voCheckBox== null || voCheckBox.nodeName!= "INPUT") continue;
	    if (voCheckBox.checked){
	    	vaiRowIndex[vaiRowIndex.length]= voRow.rowIndex;
	    	var tmpKeyValue = "";
	    	for(var j = 0 ; j < vsKeyFieldNames.length; j++){
	    		tmpKeyValue += vsKeyFieldNames[j] + "='" 
	    					+ this.getValueByRowField(voRow.rowIndex, vsKeyFieldNames[j]) + "';";
	    	}
	    	vaiDataKeys[vaiDataKeys.length] = tmpKeyValue;
	    }
	}
	return {"rowIndex" : vaiRowIndex, "dataKeys" : vaiDataKeys};
}
/**
 * 获取所有选择数据的主键，主持跨页选择
 * @return
 */
function Grid_getAllSelectedDataKeys(){
	var dataKeys = new Array();
	for(var i = 1; i < this.oPagination.pageSelect.length; i++){
		dataKeys = dataKeys.concat(this.oPagination.pageSelect[i].dataKeys);
	}
	var currentPageData = this.getCurrentSelectedRowIndexsWithDataKeys()
	if(currentPageData){
		dataKeys = dataKeys.concat(currentPageData.dataKeys);
	}
	return dataKeys;
}
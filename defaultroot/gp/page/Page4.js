/*
Title: gp.page.Page4
Description: 进行页面管理。
Company: 用友政务
Author: leidh
*/

//----------------------------------------------------------------------
//声明页面中的全局对象;
var PageX = null;
if (PF.isExistMethodK(window.WFPage4)){
	PageX = new WFPage4();
}else{
	PageX= new Page4();
}
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Page4(){
  //1.超类 =function();
  Base.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.Page4";

  this.PAGE_LAYOUT_AREA= "area";
  this.PAGE_LAYOUT_FREE= "free";

  this.PAGE_TYPE_LIST= "list";
  this.PAGE_TYPE_EDIT= "edit";
  this.PAGE_TYPE_REPORT= "report";
  this.PAGE_TYPE_SELECT= "select";
  this.PAGE_TYPE_CARD= "card";

  this.DISPLAY_TYPE_GRID= "GRID";
  this.DISPLAY_TYPE_NORMAL= "NORMAL";
  this.DISPLAY_TYPE_TREE= "TREE";
  this.DISPLAY_TYPE_FREE= "FREE";
  this.DISPLAY_TYPE_OBJECT= "OBJECT";

  this.DIRECT_PREV= "prev";
  this.DIRECT_NEXT= "next";
  this.DIRECT_PRETEN= "preten";
  this.DIRECT_NEXTTEN= "nextten";
  this.DIRECT_FIRST= "first";
  this.DIRECT_LAST= "last";

  this.DOM_PAGE_AREAS_TABLE= "U_PageAreasTable";
  this.GRID_KEY_PREFIX= "GridKey_";

  this.AUTO_NUM_TEXT= "自动编号";

  this.WINDOW_MODAL= "winmodal";  //winmodal=1
  this.WINDOW_MODAL_0= "0";  //winmodal=0;表示非modal;
  this.WINDOW_MODAL_1= "1";  //winmodal=1;表示modal;
  
  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;//对象名称.
  this.sPageLayout= this.PAGE_LAYOUT_FREE; //页面布局方式;
  this.sPageType= this.PAGE_TYPE_EDIT;     //页面类型;
  this.oPageAreasTable= null;              //private;
  this.oTextSizeTA= null;                 //private;
  this.sRootPath= BASE_URL;

  this.oCtrlMap= new Map();  //private; 页面上所有控件的所构成的 Map,以 Area+ "_"+ TabIndex 为 key 值;
  this.oCssMap= null;        //private;
  this.oFreeManager= null;   //private;
  this.oTableManager= null;  //private;
  this.oRowManager= null;    //private;
  this.oDataManager= null;   //private;
  this.oParentFrame= opener; //private;
	this.boxIndexes = null; 		//所有box的id顺序，焦点切换时用

  this.tIsDigest= true;      //public;
  this.tIsChanged= false;    //private;
  this.tIsNew= false;        //private;
  this.tHasInit= false;      //public;
  this.tHasInitData= false;  //private;
  this.tIsInitRSSuccess= false; //private;

  this.oDataPartMap= new Map();  //private;所存放的元素是对象数组;解决一表多Normal的情况.
  this.oDisappearTableMap= new Map();//private;
  

  //操作动作记录;
  this.sOperationId= null; //private;
  //processbar 参数;
  this.oProcessWin= null;  //private;
  this.oProcessbar= null;  //private;
  this.tIsForceOpenProcess= false;
  //opened window; child window;
  this.oOpenedWin= null;
  //XML 最近一次的准备状态,如果出现:interactive,则表示下一次complete来临时,当loaddata;
  this.sLastReadyStateOfXml= "";
  //processbar 的运行方式;
  this.tIsPrecessAutoRun= true;

  this.oDBDataRules= new Map();       //private;存放取数时调用的取数规则，再打印时用来重新取数
  
  //等待层;
  this.oWaitPanel= null;
  this.oWaitWin= null;
  this.tIsPageWaiting= false;

  //控制变量;
  this.tIsMsgOnReportFail= true;  //public;
  
  //资源本地化路径
  this.localResPath = "";
  
  //测试用;
  this.lBeginTime= (new Date()).getTime();
  this.lEndTime= (new Date()).getTime();

  //4.事件声明区 =function();
  this.OnInit= "OnInit";                        //参数: oSender;
  this.OnResize= "OnResize";                    //参数: oSender;

  //5.方法声明区 =function();
  //public;
  this.closeProcess= Page4_closeProcess;
  this.deleteBill= Page4_deleteBill;
  this.directBill= Page4_directBill;
  this.exportData= Page4_exportData;
  this.exportDataK= Page4_exportDataK;
  this.getAllCtrlKey= Page4_getAllCtrlKey;
  this.getAllCtrlObj= Page4_getAllCtrlObj;
  this.getAreaGrid= Page4_getAreaGrid;
  this.getCssSheetText= Page4_getCssSheetText;
  this.getCtrlObj= Page4_getCtrlObj;
  this.getCtrlObjByTableName= Page4_getCtrlObjByTableName;
  this.getFreeManager= Page4_getFreeManager;
  this.getListGrid= Page4_getListGrid;
  this.getRowManager= Page4_getRowManager;
  this.getRuleData= Page4_getRuleData;
  this.getStyleText= Page4_getStyleText;
  this.getTextSize= Page4_getTextSize;
  this.getValue= Page4_getValue;
  this.importData= Page4_importData;
  this.importDataK= Page4_importDataK;
  this.importDataFromDom = Page4_importDataFromDom;
  this.init= Page4_init;
  this.isChanged= Page4_isChanged;
  this.isEditBox= Page4_isEditBox;
  this.isFree= Page4_isFree;
  this.isGrid= Page4_isGrid;
  this.isNew= Page4_isNew;
  this.isNormal= Page4_isNormal;
  this.isTree = Page4_isTree;
  this.isTopWin= Page4_isTopWin;
  this.makeCondition= Page4_makeCondition;
  this.makeReportGrid= Page4_makeReportGrid;
  this.makeReportGridToArea= Page4_makeReportGridToArea;
  this.newBill= Page4_newBill;
  this.openBill= Page4_openBill;
  this.openEditPage= Page4_openEditPage;
  this.process= Page4_process;
  this.regCtrlObj= Page4_regCtrlObj;
  this.resize= Page4_resize;
  this.saveBill= Page4_saveBill;
  this.setValue= Page4_setValue;
  this.getDataPartObj= Page4_getDataPartObj;
  this.getLanTransData= Page4_getLanTransData;
  this.getFree= Page4_getFree;
  this.getSearch= Page4_getSearch;
  //以上已完成文档;

  this.loadTableData= Page4_loadTableData;
  this.getAreaNormal= Page4_getAreaNormal;
  this.getListCondition= Page4_getListCondition;
  this.getListConditionK= Page4_getListConditionK;
  this.getAdvOrderBy= Page4_getAdvOrderBy;
  this.openCardPage= Page4_openCardPage;
  this.getParentFrame= Page4_getParentFrame;
  this.setParentFrame= Page4_setParentFrame;
  this.showModalDialog= Page4_showModalDialog;
  this.saveBillK= Page4_saveBillK;
  this.checkEmptyValue= Page4_checkEmptyValue;
  this.checkEmptyValueK= Page4_checkEmptyValueK;
  this.makeCheckEmptyValueMessage= Page4_makeCheckEmptyValueMessage;
  this.deleteBillK= Page4_deleteBillK;
  this.setOpenedWinFocus= Page4_setOpenedWinFocus;
  this.getRuleDeltaXML= Page4_getRuleDeltaXML;
  this.getPageDigest= Page4_getPageDigest;
  this.directBillK= Page4_directBillK;
  this.showHelp= Page4_showHelp;
  this.dbExport= Page4_dbExport;
  this.dbExportK= Page4_dbExportK;
  this.setTableDisappear= Page4_setTableDisappear;
  this.isTableDisappear= Page4_isTableDisappear;
  this.isTree= Page4_isTree;
  this.setWait= Page4_setWait;
  this.rewriteToList= Page4_rewriteToList;
  this.rewriteToListK= Page4_rewriteToListK;
  this.saveOptions= Page4_saveOptions;
  this.saveOptionsByTable= Page4_saveOptionsByTable;
  this.saveOptionsByXml= Page4_saveOptionsByXml;
  this.getOptions= Page4_getOptions;
  this.regBoxSet= Page4_regBoxSet;
  this.getBoxSet= Page4_getBoxSet;
  this.getDataManager= Page4_getDataManager;
  this.isBoxSet= Page4_isBoxSet;
  this.getDataObjByTable= Page4_getDataObjByTable;
  this.popupTextBox= Page4_popupTextBox;
  this.showMessage= Page4_showMessage;
  this.getRoot= Page4_getRoot;
  this.selectFileName= Page4_selectFileName;
  this.wfConfig = {};
  this.focusNextBox = Page4_focusNextBox;
  this.focusPreviousBox = Page4_focusPreviousBox;
  
  // 工作流相关方法
  this.getDefaultTemplateId = Page4_getDefaultTemplateId;
  this.getSelectedTemplateDatas = Page4_getSelectedTemplateDatas;
  this.getSelectedTemplateDatasFromDialog = Page4_getSelectedTemplateDatasFromDialog;
  this.queryCompoEnableStartedTempate = Page4_queryCompoEnableStartedTempate;
  this.newInstCommit = Page4_newInstCommit; // 从业务单据草稿启动流程并提交到下一节点
  this.newCommit = Page4_newCommit; // 处理所有主表数据，从业务单据草稿启动流程并提交到下一节点
  
  //private;
  this.initNormal = Page4_initNormal;
  this.initGrid = Page4_initGrid;
  this.initTree = Page4_initTree;
  this.initData= Page4_initData;
  this.initDataPart= Page4_initDataPart;
  this.initRS= Page4_initRS;
  this.initTableData= Page4_initTableData;
  this.initNewBill  = Page4_initNewBill;
  this.resizeList= Page4_resizeList;
  this.resizeEdit= Page4_resizeEdit;
  this.resizeReport= Page4_resizeReport;
  this.importData_Init= Page4_importData_Init;
  this.makeReportGrid_init= Page4_makeReportGrid_init;
  this.initOther= Page4_initOther;
  this.getResourceForMakeCheckEmptyValueMessage= Page4_getResourceForMakeCheckEmptyValueMessage;
  this.initNewBill_NoFields= Page4_initNewBill_NoFields;
  this.makeUrl= Page4_makeUrl;
  this.initPageBoxSet= Page4_initPageBoxSet;
  this.initGridProp= Page4_initGridProp;

  this.resetDigest= Page4_resetDigest;
  this.resetTableDigest= Page4_resetTableDigest;

  this.release = Page4_release;
  this.setWfConfig = Page4_setWfConfig;
  this.getWfAction = Page4_getWfAction;
  this.debug_showCtrObjects = Page4_debug_showCtrObjects;
  
  this.oFreeManager= new FreeManager();
  this.oFreeManager.init();
  this.oRowManager= new RowManager();
  this.oDataManager= new DataManager();
  this.oTableManager= new TableManager();

  this.publishToReport = Page4_publishToReport;
  this.openPwdCheckDialog = Page4_openPwdCheckDialog;
  //friendly;
}

//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//private; 对页面中的 EditBox 进行分组,分给 Search 和 Free;
//返回值:成功: true, 失败: false;
function Page4_initGridProp(){
  var vaoCtrl= PageX.getAllCtrlObj();
  var voCtrl= null;
  for (var i= 0, len= vaoCtrl.length; i< len; i++){
    voCtrl= vaoCtrl[i];
    if (!this.isGrid(voCtrl)) continue;
    voCtrl.restoreProp();
  }
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function Page4_init(){
  if (Base_init.call(this, false)== false) return false;
  this.tIsInitRSSuccess= this.initRS();
  if (this.tIsInitRSSuccess){
  	this.oTableManager.init();
	  this.initDataPart();
	  this.oDataManager.init();
	  this.oDataManager.addListener(new Listener(this.oDataManager.OnDatasetComplete, Page4_PageDataXML_OnDatasetComplete, this));
	  if (this.shouldAddRow){
	    DataTools.insertRow(DataTools.getMainTableName(), null, null, null, true);
	  }else{
	    this.getRowManager().clearAll();
	  }
	  if (this.isNew()){//自动编号初始化
	  	var vasCompoNames= DataTools.getAllCompoNames();
	  	for(var i = 0; i < vasCompoNames.length; i++){
	  	  var vsMainTable= DataTools.getMainTableName(vasCompoNames[i]);
  		  var voNoFieldMap= DataTools.getNoFieldMap(vasCompoNames[i]);
          var voFree= PageX.getFree(vsMainTable);
          if (voFree!= null) this.initNewBill_NoFields(voFree, voNoFieldMap);
          var voBoxSet= PageX.getBoxSet(vsMainTable, "none");
  		  if (voBoxSet!= null) this.initNewBill_NoFields(voBoxSet, voNoFieldMap);
	  	}
	  }
	  this.oTableManager.autoEnterFirstRow();
		PrintX.init();
	}

  PageX.setInitMark();
  displaySessionInStatusbar();
  window.attachEvent("onunload",PageX.release);
  return true;
}

//----------------------------------------------------------------------
//private; 初始化页面上的工作环境信息；
function displaySessionInStatusbar(){
	if (window.status == null || window.status.length == 0) {
	  var result = "单位:[" + DataTools.getSV("svCoCode") + "]";
	  result += DataTools.getSV("svCoName") + "  ";
		var svAccountId = DataTools.getSV("svAccountId");
		if(svAccountId != null && svAccountId != "null"){
			result += "帐套:[" + svAccountId + "]";
		  var ACCOUNT_NAME = DataTools.getSV("svAccountName");
		  if(ACCOUNT_NAME != null && ACCOUNT_NAME != "null"){
		    result += ACCOUNT_NAME;
		  }
		  result += "  ";
		}
	  var transDateId = DataTools.getSV("svTransDate");
	  if(transDateId != null){
	    result += "业务日期:" + transDateId + "  ";
	  }
	  var svFiscalPeriod = DataTools.getSV("svFiscalPeriod");
	  if(svFiscalPeriod != null){
	    result += "会计期间:" + svFiscalPeriod + "  ";
	  }
  
  	if(top && top.msg && top.rtol){
  		top.msg = result;
  	  top.rtol();
  	}else{
	  	window.status = result;
		}
	}
}

//----------------------------------------------------------------------
//private; 初始化页面上的BoxSet是否显示；
function Page4_initPageBoxSet(){
  var voAllPageObj= PageX.getAllCtrlObj();
  var voAllPageBoxSet= new Array();
  var m= 0;
  for(var i=0,j=voAllPageObj.length; i<j; i++){
    if(voAllPageObj[i].CLASSNAME== "gp.page.BoxSet"){
       if (!PF.isEmpty(voAllPageObj[i].getRelaObjId())){
         voAllPageBoxSet[m]= voAllPageObj[i];
         m= m+1;
     }
   }
  }
  
  if (voAllPageBoxSet.length> 0){
    for (var i= 0, j= voAllPageBoxSet.length; i< j; i++){
  		var voPageBoxSet= voAllPageBoxSet[i];
  		var voRelGrid= PageX.getCtrlObj(voPageBoxSet.getRelaObjId());
  		voRelGrid.initRelCardDisOrNot();
  	}	
  }		
  return;	
}	
//----------------------------------------------------------------------
//private; 初始化;
//返回值: void;
function Page4_initOther(){
  if (PF.isExistMethodK(window.TableManager) && this.tIsInitRSSuccess){
    this.oTableManager.autoEnterFirstRow();
  }
  return;
}
//----------------------------------------------------------------------
//private; 初始化 this.oDataPartMap;
//返回值: 成功: true, 失败: false;
function Page4_initDataPart(){
  var vaoObj= this.getAllCtrlObj();
  var voObj= null;
  var vsTableName= "";
  var vaoTableObj= null;
  for (var i= 0; i< vaoObj.length; i++){
    voObj= vaoObj[i];
    if (this.isFree(voObj)== false
        && this.isNormal(voObj)== false
        && this.isGrid(voObj)== false) continue;
    vsTableName= voObj.getTableName();
    vaoTableObj= this.oDataPartMap.get(vsTableName);
    if (vaoTableObj== null) vaoTableObj= new Array();
    vaoTableObj[vaoTableObj.length]= voObj;
    this.oDataPartMap.put(vsTableName, vaoTableObj);
  }
  return true;
}
//----------------------------------------------------------------------
//private; 对页面中的 XML 数据进行记录集的初始化;
//此处先补数据,再提取 RS; 必须这么做,否则后果不堪设想. [IE: 6.0.2800.1106] (现已改,不必如此.)
//返回值: 成功: true, 失败: false;
function Page4_initRS(){
  var vasTable= DataTools.getAllTableNames();
  if (vasTable== null) return false;
  for (var i= 0, len= vasTable.length; i< len; i++){
    var voDataXml= DataTools.getDataXML(vasTable[i]);
    if (voDataXml== null) continue;
    var viValid= DataTools.isValidXMLData(voDataXml);
    if (viValid== DataTools.DATA_EMPTY){
      alert("table data xml 数据为空!\ntable name: "+ vasTable[i]);
      return false;
    }else if (viValid== DataTools.DATA_EXCEPTION){
      alert("table data xml 数据错误!\ntable name: "+ vasTable[i]+ "\n"+ DataTools.getPageDataXML().xml);
      return false;
    }

    var voRS= DataTools.getRecordset(vasTable[i]);
    var voTableData= voDataXml.documentElement;
    this.initTableData(voTableData);
  }
  return true;
}
//----------------------------------------------------------------------
//private; 对页面中的 XML 数据进行记录集的初始化;
//返回值: 成功: true, 失败: false;
function Page4_initTableData(oTableData){
  if (oTableData== null) return;
  var voMeta= oTableData.firstChild;
  var viFromRow= PF.parseInt(voMeta.getAttribute("fromrow"));
  var viToRow= PF.parseInt(voMeta.getAttribute("torow"));
  if (viFromRow== 0 && viToRow== 0) DataTools.clearTableData(oTableData.nodeName);
  return true;
}
//----------------------------------------------------------------------
//private; 对页面中的 XML 数据进行表名绑定的初始化;
//返回值: 成功: true, 失败: false;
function Page4_initData(sPageType){
  this.lBeginTime2= (new Date()).getTime();
  PageX.sPageType= sPageType;
  this.tHasInitData= true;
  this.lEndTime2= (new Date()).getTime();
  return true;
}
//----------------------------------------------------------------------
//private; 初始化Normal;
//返回值: 成功: true, 失败: false;
function Page4_initGrid(oGrid){
  oGrid.setPosition("relative");
  if (this.sPageType== this.PAGE_TYPE_EDIT){
    oGrid.addListener(new Listener(oGrid.OnAfterUpdate, window.grid_Field_Change));
  }
  if (this.sPageType== this.PAGE_TYPE_EDIT
      || this.sPageType== this.PAGE_TYPE_REPORT){
  }
  return true;
}
//----------------------------------------------------------------------
//private; 初始化Normal;
//返回值: 成功: true, 失败: false;
function Page4_initTree(oTree){
  var voTree= new TreeView();

  var voTabMeta= DataTools.getTabMeta(sAreaId, iTabIndex);
  var vsTableName= voTabMeta.getAttribute("tablename");
  var vtIsMakeTypeLevel= PF.parseBool(voTabMeta.getAttribute("ismaketypelevel"));
  var vtIsMakeTypePage= PF.parseBool(voTabMeta.getAttribute("ismaketypepage"));
  var vtIsCodeAndCap= PF.parseBool(voTabMeta.getAttribute("iscodeandcap"));
  if (vtIsMakeTypeLevel) voTree.iMakeType|= voTree.MAKE_TYPE_LEVEL;
  if (vtIsMakeTypePage) voTree.iMakeType|= voTree.MAKE_TYPE_PAGE;
  voTree.setMeta(vsTableName, null, null, null, null, vtIsCodeAndCap);

  voTree.make(oTabDataDiv);
  voTree.init();
  voTree.resize();
  voTree.setPosition("relative");
  voTree.oOuterObj= oAreaTD;

  var vsKey= this.makeKey(sAreaId, iTabIndex);
  this.oCtrlMap.put(vsKey, voTree);
  return true;
}
//----------------------------------------------------------------------
//private; 初始化Normal;
//返回值: 成功: true, 失败: false;
function Page4_initNormal(oNormal){
  var voRS= DataTools.getRecordset(oNormal.getTableName());
  if (voRS.RecordCount<= 0){
    DataTools.insertRow(oNormal.getTableName(), null, null, -1, true);
  }

  vaoEditBox = oNormal.oEditBoxMap.getAllItem();
  if (this.sPageType== this.PAGE_TYPE_EDIT){
    var voEditBox= null;
    for (var i= 0, len= vaoEditBox.length; i< len; i++){
      voEditBox= vaoEditBox[i];
      voEditBox.addListener(new Listener(voEditBox.OnChange, window.field_Change,window));
    }
  }
  return true;
}
//----------------------------------------------------------------------
//public; 页面尺寸调整;
//返回值: 成功: true, 失败: false;
function Page4_resize(){
  if (this.tHasInit== false) return false;
  if (this.sPageLayout!= this.PAGE_LAYOUT_AREA) return false;

  if (this.sPageType== this.PAGE_TYPE_LIST
      || this.sPageType== this.PAGE_TYPE_SELECT) this.resizeList();
  else if (this.sPageType== this.PAGE_TYPE_REPORT) this.resizeReport();
  else this.resizeEdit();

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnResize)){
    this.eventAnswer_OnResize(this);
  }
  //向外发送事件;
  this.fireEvent(this.OnResize, new Array(this));
  return true;
}
//----------------------------------------------------------------------
//private; 页面尺寸调整;
//返回值: 成功: true, 失败: false;
function Page4_resizeList(){
  if (this.tHasInit== false) return false;
  if (this.sPageLayout!= this.PAGE_LAYOUT_AREA) return false;
  if (this.sPageType!= this.PAGE_TYPE_LIST
      && this.sPageType!= this.PAGE_TYPE_SELECT) return false;

  var voRect= PF.getAbsRect(this.oPageAreasTable, document.body);
  viDistTop= voRect.iTop;
  var voRow= this.oPageAreasTable.rows(i);
  var voTD= this.oPageAreasTable.all("A3TD");//rows(0).firstChild;
  voTD.iWidth= document.body.clientWidth- 5;
  voTD.iHeight= document.body.clientHeight - viDistTop- 10;
  if (this.sPageType== this.PAGE_TYPE_SELECT){
    voTD.iWidth= document.body.clientWidth- 15;
    voTD.iHeight= document.body.clientHeight - viDistTop- 10;
  }

  var vasKey= this.oCtrlMap.getAllKey();
  var voCtrl= null;
  var voAreaTD= null;
  for (var i= 0; i< vasKey.length; i++){
    voCtrl= this.getCtrlObj(vasKey[i]);
    voAreaTD= voCtrl.oOuterObj;
    voCtrl.oRect.iWidth= voAreaTD.iWidth;
    voCtrl.oRect.iHeight= voAreaTD.iHeight;
    voCtrl.resize();
  }
  return true;
}
//----------------------------------------------------------------------
//private; 页面尺寸调整;
//返回值: 成功: true, 失败: false;
function Page4_resizeReport(){
  return PageX.resizeEdit();
}
//----------------------------------------------------------------------
//private; 页面尺寸调整;
//返回值: 成功: true, 失败: false;
function Page4_resizeEdit(){
  if (this.tHasInit== false) return false;
  if (this.sPageLayout!= this.PAGE_LAYOUT_AREA) return false;
  if (this.sPageType!= this.PAGE_TYPE_EDIT) return false;

  var voRect= PF.getAbsRect(this.oPageAreasTable, document.body);
  var viDistTop= voRect.getTop();
  this.oPageAreasTable.style.width= "100%";

  var viTotalWidth= document.body.clientWidth- 40;
  if (this.sPageType== this.PAGE_TYPE_LIST){
    viTotalWidth= document.body.clientWidth;
  }
  var viTotalHeight= document.body.clientHeight- viDistTop- 30;
  var viUsedWidth= 0;
  var viUsedHeight= 0;
  var voLastTD= null;
  var voTD= null;

  for (var i= 0, len= this.oPageAreasTable.rows.length; i< len; i++){
    var voRow= this.oPageAreasTable.rows(i);
    for (var j= 0, lenj= voRow.cells.length; j< lenj; j++){
      voTD= voRow.cells(j);
      if (voTD.firstChild.hasChildNodes()) voLastTD= voTD;
      voTD.iWidth= (voTD.clientWidth< viTotalWidth)? voTD.clientWidth: viTotalWidth;
      if (voTD.iHeight== null) voTD.iHeight= voTD.clientHeight;
      if (voTD.cellIndex== 0) viUsedHeight+= voTD.iHeight;
    }
  }
  if (voLastTD!= null && voLastTD.tAdjustHeight){
    voLastTD.iHeight+= (viTotalHeight- viUsedHeight> 0)? viTotalHeight- viUsedHeight: 0;
    voLastTD.style.height= voLastTD.iHeight;
  }
  var vasKey= this.oCtrlMap.getAllKey();
  var voCtrl= null;
  var voAreaTD= null;
  for (var i= 0; i< vasKey.length; i++){
    voCtrl= this.getCtrlObj(vasKey[i]);
    if (voCtrl== null) continue;
    if (voCtrl.getContainer()== null) continue;
    voAreaTD= voCtrl.getContainer().parentElement;
    if(voAreaTD.tagName != "TD"){
    	voAreaTD = voAreaTD.parentElement.parentElement;
    }
    voCtrl.oRect.iLeft= "";
    voCtrl.oRect.iTop= "";
    voCtrl.oRect.iWidth= voAreaTD.iWidth;//offsetWidth- 4;
    voCtrl.oRect.iHeight= voAreaTD.iHeight;//offsetHeight- 4;
    if (PageX.isGrid(voCtrl)){
      var viGridHeight= PF.parseInt(voCtrl.getOuterPanel().currentStyle.height);
      if (isNaN(viGridHeight)) viGridHeight= 200;
      voCtrl.oRect.iHeight= viGridHeight;
    }
    voCtrl.resize();
  }
  return true;
}
//----------------------------------------------------------------------
//public; 获取 控件从 oCtrlMap;
//返回值: 成功: Control Object, 失败: null;
function Page4_getCtrlObj(sKey){
  var voCtrl= this.oCtrlMap.get(sKey);
  return voCtrl;
}
//----------------------------------------------------------------------
//public; 获取 控件从 oCtrlMap;
//返回值: 成功: Control Object Array, 失败: null;
function Page4_getCtrlObjByTableName(sTableName){
  if (PF.isEmpty(sTableName)) return null;
  var vaoCtrl= new Array();
  var vaoAllCtrl= PageX.getAllCtrlObj();
  for (var i= 0; i< vaoAllCtrl.length; i++){
    if (PF.isExistMethodK(vaoAllCtrl[i].getTableName)== false) continue;
    if (vaoAllCtrl[i].getTableName()!= sTableName) continue;
    vaoCtrl[vaoCtrl.length]= vaoAllCtrl[i];
  }
  return vaoCtrl;
}
//----------------------------------------------------------------------
//public; 获取所有的控件从 oCtrlMap;
//返回值: 成功: All Control Object, 失败: null;
function Page4_getAllCtrlObj(){
  var vaoCtrl= this.oCtrlMap.getAllItem();
  var voFreeM= this.getFreeManager();
  if (voFreeM!= null && voFreeM.tHasInit){
    var vaoFree= voFreeM.getAllFree();
    vaoCtrl= (new Array()).concat(vaoCtrl, vaoFree);
  }
  return vaoCtrl;
}
//----------------------------------------------------------------------
//public; 获取所有的控件从 oCtrlMap;
//返回值: 成功: All Control Object, 失败: null;
function Page4_getAllCtrlKey(){
  return this.oCtrlMap.getAllKey();
}
//----------------------------------------------------------------------
//public; 设置 控件从 oCtrlMap;
//这个方法仅适用于 free 方式下的页面;
//返回值: void;
function Page4_regCtrlObj(sKey, oCtrl){
  if (oCtrl== null) return;
  oCtrl.id= sKey;
  this.oCtrlMap.put(sKey, oCtrl);
  return;
}
//----------------------------------------------------------------------
//public; 设置 控件从 oCtrlMap;
//这个方法仅适用于 free 方式下的页面;
//返回值: void;
function Page4_regBoxSet(sTable, sType, oCtrl){
  if (oCtrl== null) return;
  this.oFreeManager.oBoxSetMap.put(sTable+ "_"+ sType, oCtrl);
  return;
}
//----------------------------------------------------------------------
//public; 设置 控件从 oCtrlMap;
//这个方法仅适用于 free 方式下的页面;
//返回值: BoxSet Object / null;
function Page4_getBoxSet(sTable, sType){
  if (sTable== null) return null;
  if (this.oFreeManager== null) return null;
  if (this.oFreeManager.oBoxSetMap== null) return null;
  return this.oFreeManager.oBoxSetMap.get(sTable+ "_"+ sType);
}
//----------------------------------------------------------------------
//public; 获取数据,并生成报表的表格到指定的 area;
//返回值: void;
//fieldsWithKilo:数组类型，需要千分位显示的字段数组;
//pageSize:分页后每页记录数
//Page4_makeReportGridToArea= function();
function Page4_makeReportGridToArea(sRuleID, asName, asValue, sAreaId,
                               sTabName, tReadOnly, sStyle, sArrayStyle,
                               sFieldsWithKilo, iPageSize, sPageName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "makeReportGridToArea");

  var voAreaTD= this.oPageAreasTable.all(sAreaId+ "TD");
  var voAreaDiv= voAreaTD.all(sAreaId);
  if (sTabName != null && sTabName.length > 0)
    voAreaDiv = voAreaTD.all(sTabName + "TabData");
  voAreaTD.tAdjustHeight= true;
  voAreaDiv.innerHTML= "";

  var vsGridId= this.GRID_KEY_PREFIX+ sAreaId;
	if(!iPageSize) iPageSize = -1;
  //请求并装载数据;
  var vsResponseText= this.getRuleData(sRuleID, asName, asValue,
                                       sStyle, sArrayStyle, sFieldsWithKilo,
                                       iPageSize, vsGridId, sAreaId, sTabName);

  voAreaDiv.innerHTML= vsResponseText;
  this.makeReportGrid_init(vsGridId, iPageSize);

  var voGrid= PageX.getCtrlObj(vsGridId);
  if (voGrid== null) return;
  voGrid.setPosition("relative");
  voGrid.oOuterObj= voAreaTD;
  voGrid.addListener(new Listener(voGrid.OnRowDblClick,grid_eventAnswer_Grid_OnRowDblClick,this));
  var voRect = new Rect("","",document.body.clientWidth - 60,voGrid.oRect.iHeight);
  voGrid.setRect(voRect);

  //兼容 v3.1;
  initGrid(sAreaId);
  return;
}
//----------------------------------------------------------------------
//public; 获取数据,并生成报表的表格到指定的 container;
//返回值: void;
//fieldsWithKilo:数组类型，需要千分位显示的字段数组;
//pageSize:分页后每页记录数
//sKey: Report Grid.id;
//Page4_makeReportGrid= function();
function Page4_makeReportGrid(sRuleID, asName, asValue, sStyle, sArrayStyle,
                              sFieldsWithKilo, iPageSize, sKey,
                              tReadOnly, oContainer){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "makeReportGrid");
  if (oContainer== null) oContainer= document.body;
  if (tReadOnly== null) tReadOnly= true;
  tReadOnly= PF.parseBool(tReadOnly);
  var voOldGrid= this.getCtrlObj(sKey);
  if (voOldGrid!= null){
    PageX.oCtrlMap.remove(voOldGrid.oOuterPanel.id);
    PageX.oDataPartMap.remove(voOldGrid.getTableName());
    
    var vsTableName= voOldGrid.getTableName();
    DataTools.removeTableXml(vsTableName);
    voOldGrid.oOuterPanel.parentNode.removeChild(voOldGrid.oOuterPanel);
    voOldGrid.oOuterPanel.parentNode.outerHTML= "";
  }
  //请求并装载数据;
  var vsResponseText= this.getRuleData(sRuleID, asName, asValue,
                                       sStyle, sArrayStyle, sFieldsWithKilo,
                                       iPageSize, sKey, "", "");
  var voSpan= document.createElement("span");
  oContainer.appendChild(voSpan);
  voSpan.innerHTML= vsResponseText;
  if (vsResponseText.indexOf("error:") != 0) {
	  if (document.all(sKey)== null){
	    if (this.tIsMsgOnReportFail) alert("没有找到符合条件的数据!");
	    oContainer.removeChild(voSpan);
	    return;
	  }
	  this.makeReportGrid_init(sKey, iPageSize);
	}
  return;
}
//----------------------------------------------------------------------
//private; 报表 Grid 初始化;
//return: void;
function Page4_makeReportGrid_init(sId){
  var voGrid = new Grid();
  voGrid.tIsPagiAtClient= true;
  voGrid.make(sId);
  voGrid.initFields();
  voGrid.init();
  voGrid.resize();
  PageX.regCtrlObj(sId, voGrid);
  PageX.oDataPartMap.put(voGrid.getTableName(), new Array(voGrid));
  this.sPageType= this.PAGE_TYPE_REPORT;
  DataTools.addTableToCompoMeta(voGrid.getTableName());
}
//----------------------------------------------------------------------
//public; 获取指定 ruleid 的数据;
//返回值: 成功: 取来的文本; 否则: null;
//fieldsWithKilo:数组类型，需要千分位显示的字段数组;
//Page4_getRuleData= function();
function Page4_getRuleData(sRuleID, asName, asValue, sStyle, sArrayStyle,
                           sFieldsWithKilo, iPageSize, sGridId,
                           sAreaId, sTabName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getRuleData");
  if (PF.isEmpty(sGridId)){
    alert("参数错误;\nparameter: sGridId is empty;");
    return;
  }
  if (iPageSize== null) iPageSize= -1;
  if (sAreaId== null) sAreaId= "";
  if (sTabName== null) sTabName= "";
  if (asName== null) asName= new Array();
  if (asValue== null) asValue= new Array();

  var vasName = new Array();
  var vasValue = new Array();
  vasName[0] = "ruleID";
  vasValue[0] = sRuleID;
  vasName[1] = "param";
  var vsParam = "<entity>";
  for(var i = 0; i < asName.length; i++){
    vsParam += "<field name=\"" + asName[i] + "\" value=\"" + packSpecialChar(asValue[i]) + "\" />";
  }
  vsParam += "</entity>";
  vasValue[1] = vsParam;

  vasName[2] = "style";
  if(sStyle == null) sStyle= "";
  vasValue[2] = sStyle;
  vasName[3] = "arrayStyle";
  vasValue[3] = sArrayStyle;

	vasName[4] = "fieldsWithKilo";
	vasValue[4] = sFieldsWithKilo;

	vasName[5] = "pagesize";
	vasValue[5] = iPageSize;

	vasName[6] = "gridid";
	vasValue[6] = sGridId;


	vasName[7] = "pageName";
	vasValue[7]= PageX.sName;//DataTools.getCompoName()+ "_E";

	vasName[8] = "areaID";
	vasValue[8]= sAreaId;

	vasName[9] = "tabName";
	vasValue[9]= sTabName;

  var vsRuleKey = vasValue[7];
  if(!this.oDBDataRules.isContain(vsRuleKey)){
  	var params = new List();
  	params.add(vasValue[7]);
  	params.add(vasValue[6]);
  	this.oDBDataRules.put(vsRuleKey,params);
  }

  //请求并装载数据;
  var vsResponse= requestDataK("getruledata", "all", vasName, vasValue);
  return vsResponse;
}
//----------------------------------------------------------------------
//public; 获取指定 ruleid 的数据;
//返回值: 成功: delta documentelement; 否则: null;
//fieldsWithKilo:数组类型，需要千分位显示的字段数组;
function Page4_getRuleDeltaXML(sRuleID, asName, asValue, sFieldsWithKilo){
  if (typeof(asName) == "string") {
	if(asValue != null)
	  sFieldsWithKilo = asValue;
	var res = parseConStrToArray(asName);
	asName = res[0];
	asValue = res[1];
  }
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getRuleData");
  if (asName== null) asName= new Array();
  if (asValue== null) asValue= new Array();

  var vasName = new Array();
  var vasValue = new Array();
  vasName[0] = "ruleID";
  vasValue[0] = sRuleID;
  vasName[1] = "param";
  var vsParam = "<entity>";
  for(var i = 0; i < asName.length; i++){
  	if (asValue[i] == "") continue;
    vsParam += "<field name=\"" + asName[i] + "\" value=\"" + packSpecialChar(asValue[i]) + "\" />";
  }
  vsParam += "</entity>";
  vasValue[1] = vsParam;

	vasName[2] = "fieldsWithKilo";
	vasValue[2] = sFieldsWithKilo;

  //请求并装载数据;
  var voDomElement= requestData2("getruledelta", "all", vasName, vasValue);
  return voDomElement;
}
//----------------------------------------------------------------------
//public; 获取指定 LanTrans 的数据;
//返回值: 成功: Map; 否则: null;
function Page4_getLanTransData(asField){
  if (PF.isValidArray(asField)== false) return null;
  var voXML= Info.requestDataK("getlantrans", "all", new Array("fieldStr"), new Array(asField.join(",")));
  voXML= PF.parseXml(voXML);
  var voRowSet= voXML.selectSingleNode("rowset");
  var voRow= voRowSet.selectSingleNode("row");
  if (voRow== null || voRow.hasChildNodes()== false) return null;
  var voCol= null;
  var voMap= new Map();
  for (var i= 0; i< voRow.childNodes.length; i++){
    voCol= voRow.childNodes[i];
    voMap.put(voCol.nodeName, voCol.text);
  }
  return voMap;
}
//----------------------------------------------------------------------
//public; 获取 FreeManager;只有 Free 页面才能获取有效的值;
//返回值: 成功: FreeManager, 失败: null;
function Page4_getFreeManager(){
  return this.oFreeManager;
}
//----------------------------------------------------------------------
//public; 获取 TableManager;只有 Grid 页面才能获取有效的值;
//返回值: 成功: TableManager, 失败: null;
function Page4_getTableManager(){
  return DataTools.oDataSourceFrame.PageX.oTableManager;
}
//----------------------------------------------------------------------
//public; 获取 RowManager;
//返回值: 成功: RowManager, 失败: null;
function Page4_getRowManager(){
  return DataTools.oDataSourceFrame.PageX.oRowManager;
}
//----------------------------------------------------------------------
//public; 获取 RowManager;
//返回值: 成功: RowManager, 失败: null;
function Page4_getDataManager(){
  return DataTools.oDataSourceFrame.PageX.oDataManager;
}
//----------------------------------------------------------------------
//public; 判断对象是否是输入框;
//返回值:成功: true, 失败: false;
function Page4_isEditBox(oObj){
  if (oObj== null) return false;
  if (oObj.CLASSNAME== null) return false;
  return PF.parseBool(oObj.tIsEditBox);
}
//----------------------------------------------------------------------
//public; 判断对象是否是Grid;
//返回值:成功: true, 失败: false;
function Page4_isGrid(oObj){
  if (oObj== null) return false;
  if (oObj.CLASSNAME== null) return false;
  if (oObj.CLASSNAME== "gp.page.Grid"
      || oObj.CLASSNAME== "gp.page.DataGrid"
      || oObj.CLASSNAME== "gp.page.SelectGrid"){
    return true;
  }
  return false;
}
//----------------------------------------------------------------------
//public; 判断对象是否是Free;
//返回值:成功: true, 失败: false;
function Page4_isFree(oObj){
  if (oObj== null) return false;
  if (oObj.CLASSNAME== null) return false;
  if (oObj.CLASSNAME== "gp.page.Free") return true;
  return false;
}
//----------------------------------------------------------------------
//public; 判断对象是否是Free;
//返回值:成功: true, 失败: false;
function Page4_isBoxSet(oObj){
  if (oObj== null) return false;
  if (oObj.CLASSNAME== null) return false;
  if (oObj.CLASSNAME== "gp.page.BoxSet") return true;
  return false;
}
//----------------------------------------------------------------------
//public; 判断对象是否是Free;
//返回值:成功: true, 失败: false;
function Page4_isTree(oObj){
  if (oObj== null) return false;
  if (oObj.CLASSNAME== null) return false;
  if (oObj.CLASSNAME== "gp.page.TreeView") return true;
  return false;
}
//----------------------------------------------------------------------
//public; 判断对象是否是Normal;
//返回值:成功: true, 失败: false;
function Page4_isNormal(oObj){
  if (oObj== null) return false;
  if (oObj.CLASSNAME== null) return false;
  if (oObj.CLASSNAME== "gp.page.Normal") return true;
  return false;
}
//----------------------------------------------------------------------
//public; 判断对象是否是Tree;
//返回值:成功: true, 失败: false;
function Page4_isTree(oObj){
  if (oObj== null) return false;
  if (oObj.CLASSNAME== null) return false;
  if (oObj.CLASSNAME== "gp.page.TreeView") return true;
  return false;
}
//----------------------------------------------------------------------
function Page4_makeUrl(sFunc, sCompo, asName, asValue, sServlet){
  if (PF.isEmpty(sServlet)) sServlet= "";
  var vsURL= PageX.getRoot();
  if(sServlet == "") {
    vsURL += "/" + sFunc + ".action";
  }
  else{
  	vsURL += "/" + sServlet;
  }
  vsURL += "?componame=" + sCompo;
  
	if (PF.isValidArray(asName)){
	  vsURL+= "&"+ encodeParamArray(asName, asValue);
	}
	return vsURL;
}
//----------------------------------------------------------------------
//public; 将指定表名指定行指定字段组的数据生成条件。格式为：TableName.FieldName='value'。
//返回值: 成功: condition string; 否则: null;
function Page4_makeCondition(sTableName, iRow, asField){
  //alert("Page4_openEditPage();");
  sTableName= PF.trim(sTableName);
  if (sTableName== null || sTableName== "") return null;
  if (DataTools.isValidRow(sTableName, iRow)== false) return null;
  if (PF.isValidArray(asField)== false) return null;

  var vaoRow= DataTools.getFieldValues(sTableName, new Array(""+ iRow), asField);
  if (PF.isValidArray(vaoRow)== false) return null;

  var voCond= new StringBuffer();
  var voMap= vaoRow[0];
  var vasField= voMap.getAllKey();
  var vsField= "";
  var vsValue= "";

  for (var i= 0, len= vasField.length; i< len; i++){
    vsField= vasField[i];
    vsValue= voMap.get(vsField);
    voCond.append(vsField + "=" + vsValue + ";");
  }
  var temp = voCond.toString();
  return temp.length > 0?temp.substr(0,temp.length - 1):temp;
}
//----------------------------------------------------------------------
//public; 打开编辑页面;
//返回值: 成功: true; 否则: false;
function Page4_openEditPage(sTableName, iRow, iWidth, iHeight, asName, asValue, sOpenFeatures, oFrame, tIsShowProcess){
  sTableName= PF.trim(sTableName);
  if (sTableName== null || sTableName== "") return false;
  if (DataTools.isValidRow(sTableName, iRow)== false) return false;
  var vasKeyField= DataTools.getKeyFieldNames(sTableName);
  if (PF.isValidArray(vasKeyField)== false){
    alert("表没有描述主键信息,不能打开编辑页面.\ntable: "+ sTableName);
    return false;
  }
  var vsCondition= this.makeCondition(sTableName, iRow, vasKeyField);//change by liubo
  if (vsCondition== null) return false;
  if (tIsShowProcess== null) tIsShowProcess= true;

  this.openBill(vsCondition, iWidth, iHeight, asName, asValue, sOpenFeatures, oFrame, sTableName);
  return true;
}
//----------------------------------------------------------------------
//public; 打开编辑页面;
//返回值: 成功: true; 否则: false;
function Page4_openBill(sCondition, iWidth, iHeight, asName, asValue, sOpenFeatures, oFrame, sTableName, sCompoName){
  if (PF.isEmpty(sCondition)) sCondition= "1=0";
  if (iWidth== null) iWidth= screen.availWidth- 10;
  if (iHeight== null) iHeight= screen.availHeight- 80;
  if (sOpenFeatures== null) sOpenFeatures= "";

  if (sCompoName== null){
    sCompoName= DataTools.getMainCompoName();
  }
  if (sTableName== null){
    sTableName= DataTools.getMainTableName(sCompoName);
  }
  var vsPageName= sCompoName+ "_E";
  var vsFunction= "geteditpage";
  var vsURL= PageX.getRoot()+ "/getpage_" + sCompoName + ".action?function="+ vsFunction
  	  + "&componame=" + URLEncoding(escapeSpecial(sCompoName))
  	  + "&tablename=" + URLEncoding(escapeSpecial(sTableName))
  	  + "&condition=" + URLEncoding(escapeSpecial(sCondition));
	//change by liubo
	if (PF.isValidArray(asName)){
	  vsURL+= "&"+ encodeParamArray(asName, asValue);
	}

  var voRect= PF.getCenterRect(iWidth, iHeight);
  if (voRect.iLeft< 0) voRect.iLeft= 0;
  if (voRect.iTop< 0) voRect.iTop= 0;

  var vsStyle= "menubar= no, toolbar= no, scrollbars=no, status=yes, "
             + "resizable= yes, titlebar= yes, "
             + "left= "+ voRect.iLeft+ "px, top= "+ voRect.iTop+ "px, "
             + "width= "+ iWidth+ "px, height= "+ iHeight+ "px, "+ sOpenFeatures;
  if (oFrame== null){
    this.oOpenedWin= open(vsURL, vsPageName, vsStyle);
  }else{
    oFrame.location.href= vsURL;
  }
  window.setTimeout("PageX.setOpenedWinFocus();", 500);

  var voRM= PageX.getRowManager();
  voRM.setValidChanged(false);
  voRM.setValidChanged(true);
  return true;
}
//----------------------------------------------------------------------
//public; 打开编辑页面;
//返回值: 成功: true; 否则: false;
function Page4_openCardPage(sTableName, sDataSourceType, sColCount, sFields, sCondition, iWidth, iHeight, sOpenFeatures){
}
//----------------------------------------------------------------------
//public;
//void;
function Page4_showMessage(sTitle, sMessage){
  this.popupTextBox(sTitle, sMessage, true, false);
}
//----------------------------------------------------------------------
//public; 打开编辑页面;
//返回值: String/null;
function Page4_popupTextBox(sTitle, sMessage, tIsReadOnly, tIsShowCancelBtn, iWidth, iHeight, sOpenFeatures){
  if (sTitle== null) sTitle= "popup text box";
  if (sMessage== null) sMessage= "";
  tIsReadOnly= PF.parseBool(tIsReadOnly);
  if (tIsShowCancelBtn== null) tIsShowCancelBtn= true;
  tIsShowCancelBtn= PF.parseBool(tIsShowCancelBtn);
  if (iWidth== null) iWidth= 500;
  if (iHeight== null) iHeight= 400;
  var vsStyle= "dialogWidth:"+ iWidth+ "px;"
             + "dialogHeight:"+ iHeight+ "px;"
             + "resizable:yes;"
             + "scroll:no;"
             + "center:yes;"
             + "help:no;"
             + "status:no;"
             + sOpenFeatures;
  var vsRet= window.showModalDialog(PageX.getRoot()+ "/gp/webpage/html/PopupTextBox.jsp?"+ this.WINDOW_MODAL+ "="+ this.WINDOW_MODAL_1+ "&"+ encodeParams("title", sTitle), 
             [sMessage, tIsReadOnly+ "", tIsShowCancelBtn+ ""], 
             vsStyle);
  return vsRet;
}
//----------------------------------------------------------------------
//public; 打开编辑页面;
//返回值: 成功: true; 否则: false;
function Page4_showModalDialog(sFunc, sCompoName, asParamName, asParamValue, vDialogArguments, iWidth, iHeight, sOpenFeatures){
  if (PF.isEmpty(sFunc)) sFunc= "showmodaldialog";
  if (PF.isEmpty(sCompoName)){
    alert("参数无效;不能打开 showModalDialog;\nparameter: sCompoName 为空;");
    return;
  }
  if (sCompoName.toLowerCase()== "all"){
    alert("参数无效;不能打开 showModalDialog;\nparameter: sCompoName== \"all\",此功能为抽象功能,必须由业务系统重定义将要打开的 JSP 页面;");
    return;
  }
  if (PF.isValidArray(asParamName)!= PF.isValidArray(asParamValue)){
    alert("参数无效;不能打开 showModalDialog;\nparameter: asParamName 与 asParamValue 不匹配,其中一个为空,另一个非空;");
    return;
  }
  if (PF.isValidArray(asParamName)
      && asParamName.length!= asParamValue.length){
    alert("参数无效;不能打开 showModalDialog;\nparameter: asParamName 与 asParamValue 长度不一致;");
    return;
  }
  if (sOpenFeatures== null) sOpenFeatures= "";

  var vsURL= this.sRootPath+ "/"+ sFunc+ ".action"
      	  + "?componame=" + sCompoName
      	  + "&"+ this.WINDOW_MODAL+ "="+ this.WINDOW_MODAL_1
          + "&"+ encodeParamArray(asParamName, asParamValue);

  var vsStyle= "dialogWidth:"+ iWidth+ "px;"
             + "dialogHeight:"+ iHeight+ "px;"
             + "resizable:no;"
             + "scroll:no;"
             + "center:yes;"
             + "help:no;"
             + "status:no;"
             + sOpenFeatures;

  var vvRet= window.showModalDialog(vsURL, vDialogArguments, vsStyle);
  return vvRet;
}

//----------------------------------------------------------------------
//public; 开新单;
//只对新方式下的 edit 页面有效;
//返回值: 成功: true; 否则: false;
function Page4_newBill(){
  if (this.sPageType!= this.PAGE_TYPE_EDIT) return false;

  var voRM= this.getRowManager();
  voRM.clearAll();
  
  var vasCompoName= DataTools.getAllCompoNames();
  for (var x= 0; x< vasCompoName.length; x++){
    voRM.tAllowInsert= false;
    voRM.tAllowDelete= false;
    voRM.tAllowUpdate= false;
  
    var vaxxsTableName= DataTools.getLevelTables(vasCompoName[x]);
    var voCtrl= null;
    var vaoCtrl= null;
    var vsTableName= "";
    for (var i= vaxxsTableName.length- 1; i>= 0; i--){
      for (var j= 0; j< vaxxsTableName[i].length; j++){
        vsTableName= vaxxsTableName[i][j];
        vaoCtrl= this.getDataObjByTable(vsTableName, false);
        if (vaoCtrl== null) continue;
        for (var k= 0; k< vaoCtrl.length; k++){
          voCtrl= vaoCtrl[k];
          if (this.isGrid(voCtrl)== false
              && this.isFree(voCtrl)== false
              && this.isBoxSet(voCtrl)== false) continue;
          voCtrl.clear();
        }
      }
    }
    this.tIsNew= true;
    this.tIsChanged= false;
    voRM.tAllowInsert= true;
    voRM.tAllowDelete= true;
    voRM.tAllowUpdate= true;
    this.initNewBill(vasCompoName[x]);
  }

  voRM.setValidChanged(false);
  voRM.setValidChanged(true);
  return true;
}
//----------------------------------------------------------------------
//public; 获取数据块的对象.仅用于 v4.0 兼容页面.
//返回值: 成功: Free/Normal/Grid, 如果是 Normal,则返回一个数组. 失败: null;
function Page4_getDataPartObj(sTable){
  var vaoCtrl= this.oDataPartMap.get(sTable);
  if (PF.isValidArray(vaoCtrl)== false) return null;
  if (PageX.isNormal(vaoCtrl[0])) return vaoCtrl;
  return vaoCtrl[0];
}
//----------------------------------------------------------------------
//public; 获取 area 方式下的 Grid 对象;
//返回值: 成功: grid object; 否则: null;
function Page4_getAreaGrid(sTable){
  var voGrid= this.getDataPartObj(sTable);
  if (voGrid== null) return null;
  if (PageX.isGrid(voGrid)== false) return null;
  return voGrid;
}
//----------------------------------------------------------------------
//public; 获取 area 方式下的 Grid 对象;
//返回值: 成功: grid object; 否则: null;
function Page4_getAreaNormal(sTable){
  var vaoNormal= this.getDataPartObj(sTable);
  if (vaoNormal== null) return null;
  if (PageX.isNormal(vaoNormal[0])== false) return null;
  return vaoNormal;
}
//----------------------------------------------------------------------
//private; 初始化新单;
//返回值: 成功: true, 失败: false;
function Page4_initNewBill(sCompoName){
  if (this.isNew()== false) return false;
  var vsMainTable= DataTools.getMainTableName(sCompoName);
  var voNoFieldMap= DataTools.getNoFieldMap(sCompoName);
  var voFree= PageX.getFree(vsMainTable);
  if (voFree!= null){
    voFree.clear();
    if (PageX.getAreaGrid(vsMainTable)== null){
      voFree.insertRow();
    }else{
      voFree.fillDefaultValueToBox();
    }
    this.initNewBill_NoFields(voFree, voNoFieldMap);
  }
  var voBoxSet= PageX.getBoxSet(vsMainTable, "none");
  if (voBoxSet!= null){
    voBoxSet.clear();
    if (PageX.getAreaGrid(vsMainTable)== null){
      voBoxSet.insertRow();
    }else{
      voBoxSet.fillDefaultValueToBox();
    }
    this.initNewBill_NoFields(voBoxSet, voNoFieldMap);
  }
  return true;
}
//----------------------------------------------------------------------
//private;
//return: void;
function Page4_initNewBill_NoFields(oObj, oNoFieldMap){
  if (oObj== null) return;
  if (oNoFieldMap== null) return;
  var vasField= oNoFieldMap.getAllKey();
  for (var j= 0, len= vasField.length; j< len; j++){
    if (PF.isEmpty(vasField[j])) continue;
    this.setValue(oObj, 0, vasField[j], this.AUTO_NUM_TEXT);
  }
}
//----------------------------------------------------------------------
//public; 删除单据;
//只对新方式下的 edit 页面有效;
//返回值: 成功: true; 否则: false;
function Page4_deleteBill(sFunction, asName, asValue){
  var vavRet= this.deleteBillK(sFunction, asName, asValue);
  if (vavRet[0]) return true;
  else return vavRet[1];
}
//----------------------------------------------------------------------
//public; 删除单据;
//只对新方式下的 edit 页面有效;
//return: new Array(保存成功或失败[true/false], 返回的消息串)
function Page4_deleteBillK(sFunction, asName, asValue){
  var vavRet= new Array();
  vavRet[0]= false;
  vavRet[1]= "";

  if (this.sPageLayout!= this.PAGE_LAYOUT_FREE) return vavRet;
  if (this.sPageType!= this.PAGE_TYPE_EDIT) return vavRet;

  var voRM= this.getRowManager();
  voRM.clearAll();
  this.tIsChanged= false;

  var vasCompoName= DataTools.getAllCompoNames();
  for (var x= 0; x< vasCompoName.length; x++){
    var vsMainTable= DataTools.getMainTableName(vasCompoName[x]);
    voRM.recordTableRows(vsMainTable, voRM.ACTION_DELETE);
    DataTools.clearTableData(vsMainTable);
    var voCtrl= null;
    var vaoCtrl= null;
    vaoCtrl= this.getDataObjByTable(vsMainTable);
    if (vaoCtrl== null) return false;
    for (var k= 0; k< vaoCtrl.length; k++){
      voCtrl= vaoCtrl[k];
      if (this.isFree(voCtrl)){
        voCtrl.loadData();
      }else if (this.isBoxSet(voCtrl)){
        voCtrl.loadData();
      }else if (this.isGrid(voCtrl)){
        voCtrl.loadData();
      }else if (this.isNormal(voCtrl)){
        voCtrl.loadData();
      }
    }
  }

  vavRet= this.saveBillK(sFunction, asName, asValue, false);
  return vavRet;
}
//----------------------------------------------------------------------
//public; 保存单据;
//只对新方式下的 edit 页面有效;
//返回值: 成功: true; 否则: false 或 错误信息;
function Page4_saveBill(){
  var vavRet= this.saveBillK();
  if (vavRet[0]) return true;
  else return vavRet[1];
}
//----------------------------------------------------------------------
//public; 保存单据;
//只对新方式下的 edit 页面有效;
//return: new Array(保存成功或失败[true/false], 返回的消息串)
function Page4_saveBillK(sFunction, asName, asValue, isCheckEmpty, oResourceMap){
  var vavRet= new Array();
  vavRet[0]= false;
  vavRet[1]= "";

  if (this.isChanged()== false){
    vavRet[0]= true;
    vavRet[1]= "数据没有发生改变;";
    return vavRet;
  }
  if (asName== null) asName= new Array();
  if (asValue== null) asValue= new Array();
  if (sFunction== null) sFunction= "save";
  isCheckEmpty= PF.parseBool(isCheckEmpty);

  if (isCheckEmpty){
    var vavCheckRet= PageX.checkEmptyValue(oResourceMap);
    if (vavCheckRet[0]== false){
      vavRet[0]= false;
      vavRet[1]= vavCheckRet[1];
      return vavRet;
    }
  }

  var voRM= this.getRowManager();
  var vsData= voRM.getAllRecord();
  var vsCompoName= DataTools.getCompoName();
  var vasParamName= asName.concat(new Array("data", "isdigest"));
  var vasParamValue= asValue.concat(new Array(vsData, ""+ this.tIsDigest));
  var voRetRoot= Info.requestData(sFunction, vsCompoName, vasParamName, vasParamValue); //请求;
  if (voRetRoot== null){
    alert("保存返回值为:null,可能保存时出现异常.");
    return vavRet;
  }

  var vtSuccess= false;
  var vsMsg= "";
  var voResult= null;
  var voMessage= null;
  var voInfo= voRetRoot.selectSingleNode("info");
  if (voInfo== null) voInfo= PF.parseXml(voRetRoot.xml);
  if (voInfo== null){
    vsMsg= "保存后返回消息格式异常,不能被正常解析.\n"+ voRetRoot.text;
  }else{
    vtSuccess= PF.parseBool(voInfo.getAttribute("success"));
    voResult= voInfo.selectSingleNode("result");
    voMessage= voInfo.selectSingleNode("message");
    if (voMessage!= null) vsMsg= voMessage.text;
  }
  if (vtSuccess){
    var voDigest= voInfo.selectSingleNode("digest");
    if (voDigest != null){
      for (var i= 0; i< voDigest.childNodes.length; i++){
        var voTable= voDigest.childNodes[i];
        DataTools.setDigest(voTable.nodeName, voTable.text);
      }
    }
    if (voResult!= null){
      voRM.tAllowInsert= false;
      voRM.tAllowDelete= false;
      voRM.tAllowUpdate= false;
			this.getDataManager.isCloseMonitor = true;
      var oldTableName = null;
      var voRS = null;
      for (var x= 0; x< voResult.childNodes.length; x++){
        var voTable= voResult.childNodes[x];
        var vsTableName= voTable.getAttribute("name");
        if (vsTableName != oldTableName){
        	oldTableName = vsTableName;
       		voRS = DataTools.getRecordset(vsTableName);
      	}
        var vaoMainObj= this.getDataObjByTable(vsTableName, false);
        if (PF.isValidArray(vaoMainObj)){
        	/*
          for (var i= 0; i< vaoMainObj.length; i++){
            for (var j= 0, lenj= voTable.childNodes.length; j< lenj; j++){
              var vsField= voTable.childNodes[j].nodeName;
              var vsValue= voTable.childNodes[j].text;
              var vsTableRowId= voTable.getAttribute("rowid");
              var viRowIndex= DataTools.getRowXByRowId(vsTableName, vsTableRowId);
  						if (vaoMainObj[i].isValidFieldName(vsField)){
						    vaoMainObj[i].setValueByRowField(viRowIndex, vsField, vsValue,voRS);
						  }else{
  							voRS.Move(viRowIndex, DataTools.RS_BOOK_MARK_FIRST);
    						DataTools.setValueByRS(voRS,vsTableName, vsField, vsValue);
    					}
            }
          }
          */
          for (var j= 0, lenj= voTable.childNodes.length; j< lenj; j++){
            var vsField= voTable.childNodes[j].nodeName;
            var vsValue= voTable.childNodes[j].text;
            var vsTableRowId= voTable.getAttribute("rowid");
            var viRowIndex= DataTools.getRowXByRowId(vsTableName, vsTableRowId);
            
            for (var i= 0; i< vaoMainObj.length; i++){
  						if (vaoMainObj[i].isValidFieldName(vsField)){
						    vaoMainObj[i].setValueByRowField(viRowIndex, vsField, vsValue,voRS);
						  }
            }
            if(voRS(vsField) != vsValue){
            	voRS.Move(viRowIndex, DataTools.RS_BOOK_MARK_FIRST);
    					DataTools.setValueByRS(voRS,vsTableName, vsField, vsValue);
            }
          }
        }
      }
			this.getDataManager.isCloseMonitor = true;
      voRM.tAllowInsert= true;
      voRM.tAllowDelete= true;
      voRM.tAllowUpdate= true;
      this.tIsNew= false;
    }
    voRM.clearAll();
  }
  vavRet[0]= vtSuccess;
  vavRet[1]= vsMsg;
  return vavRet;
}
//----------------------------------------------------------------------
//public;
//return: array/null;
function Page4_getDataObjByTable(sTable, tIsBoxSetOfRela){
  var vaoObj= new Array();
  var voFree= PageX.getFree(sTable);
  if (voFree!= null) vaoObj[vaoObj.length]= voFree;
  var voBoxSet= PageX.getBoxSet(sTable, "none");
  if (voBoxSet!= null) vaoObj[vaoObj.length]= voBoxSet;
  if (tIsBoxSetOfRela){
    var voBoxSet= PageX.getBoxSet(sTable, "grid");
    if (voBoxSet!= null) vaoObj[vaoObj.length]= voBoxSet;
  }
  var voGrid= PageX.getAreaGrid(sTable);
  if (voGrid!= null) vaoObj[vaoObj.length]= voGrid;
  var vaoNorm= PageX.getAreaNormal(sTable);
  if (PF.isValidArray(vaoNorm)) vaoObj= vaoObj.concat(vaoNorm);
  return vaoObj;
}
//----------------------------------------------------------------------
//public;
//只对新方式下的 edit 页面有效;
//返回值: 成功: true; 否则: false;
function Page4_directBill(sDirection, oListGrid){
  if (this.sPageLayout!= this.PAGE_LAYOUT_FREE) return false;
  if (this.sPageType!= this.PAGE_TYPE_EDIT) return false;
  if (sDirection== null){
    Info.throws("无效的参数;", this.CLASSNAME, "directBill", new Array("parameter: sDirection is invalid;"));
  }
  var voOpener= opener;
  if (voOpener== null) voOpener= window;
  if (oListGrid== null){
  	oListGrid= voOpener.PageX.getAreaGrid(DataTools.getMainTableName(DataTools.getMainCompoName()));
  }
  if (oListGrid== null || this.isGrid(oListGrid)== false){
    Info.throws("无效的参数;", this.CLASSNAME, "directBill", new Array("parameter: oListGrid is invalid;"));
  }
  var vsListTable= oListGrid.getTableName();
  var viCurRow= oListGrid.getDataRowX(oListGrid.getCurRowIndex());
  var viRowCount= voOpener.DataTools.getTableRowCount(vsListTable);
  var viRow= -1;
  switch(sDirection){
    case this.DIRECT_PREV:
      viRow= viCurRow- 1;
      if (viRow< 0) viRow= 0;
      break;
    case this.DIRECT_NEXT:
      viRow= viCurRow+ 1;
      if (viRow>= viRowCount) viRow= viRowCount- 1;
      break;
    case this.DIRECT_PRETEN:
      viRow= viCurRow- 10;
      if (viRow< 0) viRow= 0;
      break;
    case this.DIRECT_NEXTTEN:
      viRow= viCurRow+ 10;
      if (viRow>= viRowCount) viRow= viRowCount- 1;
      break;
    case this.DIRECT_FIRST:
      viRow= 0;
      break;
    case this.DIRECT_LAST:
      viRow= viRowCount- 1;
      break;
  }
  if (viRow== viCurRow) return false;
  if (voOpener.DataTools.isValidRow(vsListTable, viRow)== false) return false;

  var vasKeyField= voOpener.DataTools.getKeyFieldNames(vsListTable);
  var vsCondition= voOpener.PageX.makeCondition(vsListTable, viRow, vasKeyField);
  if (vsCondition== null) return false;
  oListGrid.setCurRow(viRow);

  var voCompoMeta= voOpener.DataTools.getCompoMeta();
  var vsCompoName= voCompoMeta.getAttribute("name");
  return this.directBillK(vsCondition, vsCompoName);
}
//----------------------------------------------------------------------
//public;
//只对新方式下的 edit 页面有效;
//返回值: 成功: true; 否则: false;
function Page4_directBillK(sCond, sCompoName){
	var PROCESS_INST_ID = "";
  if (this.sPageLayout!= this.PAGE_LAYOUT_FREE) return false;

  if (this.sPageType!= this.PAGE_TYPE_EDIT) return false;
  if (sCond== null) return false;
  if (sCompoName== null) sCompoName= DataTools.getCompoName();

  var vsCompoName= sCompoName;
  var vsPageName= vsCompoName+ "_E";
  var vsFunction= "geteditpagedata";

  //组织参数包
  var params = "<delta>\n";
  var vasTableName = DataTools.getAllTableNames();
  for (var i = 0; i < vasTableName.length; i++){
    var vsTable = vasTableName[i];
    var root = DataTools.getDataXML(vsTable).XMLDocument;
  	var metaNode = root.selectSingleNode("/*/meta"); /* */
  	var sqlid = metaNode.getAttribute("sqlid");
  	var condition = sCond;//metaNode.getAttribute("condition");    
  	params += "<entity>\n";
  	params += "<field name=\"tablename\" value=\"" + vsTable +"\"/>\n";
  	params += "<field name=\"sqlid\" value=\"" + sqlid +"\"/>\n";
  	params += "<field name=\"condition\" value=\"" + condition +"\"/>\n";
  	params += "</entity>\n";  	
  }
  params += "</delta>";
  
  var vasName= new Array();
  var vasValue= new Array();
  vasName[0]= "params";
  vasValue[0]= params;
  
  //请求并装载数据;
  var vsResponseText= requestDataK(vsFunction, vsCompoName, vasName, vasValue);
  if (vsResponseText== null || vsResponseText.length== 0) return false;
  var voXml = new ActiveXObject("Microsoft.XMLDOM");
  voXml.loadXML(vsResponseText);
  //add by liubo
  var reg = /<PROCESS_INST_ID>((-)?\d+)<\/PROCESS_INST_ID>/ig;
  if (reg.test(vsResponseText)) {
  	PROCESS_INST_ID = RegExp.$1;
  }
  //end
  var vasTableName= DataTools.getAllTableNames();
  var vsTable= "";
  var voSourceData= null;
  var voRM= this.getRowManager();
  voRM.tAllowInsert= false;
  voRM.tAllowDelete= false;
  voRM.tAllowUpdate= false;
  for (var i= 0; i< vasTableName.length; i++){
    vsTable= vasTableName[i];
    voDataXml= DataTools.getDataXML(vsTable);
    if (voDataXml== null) continue;
    voSourceData= voXml.documentElement.selectSingleNode(vsTable);
    if (voSourceData== null){
      voDataXml.loadXML(DataTools.makeDefTableData(vsTable));
    }else{
      voDataXml.loadXML(voSourceData.xml);
    }
	  this.loadTableData(vsTable);
		DataTools.getTableAdditionalMeta(vsTable).setAttribute("torow",voDataXml.firstChild.firstChild.getAttribute("torow"));
		DataTools.getTableAdditionalMeta(vsTable).setAttribute("digest",voDataXml.firstChild.firstChild.getAttribute("digest"));
		DataTools.getTableAdditionalMeta(vsTable).setAttribute("condition",voDataXml.firstChild.firstChild.getAttribute("condition"));
  }
  voRM.tAllowInsert= true;
  voRM.tAllowDelete= true;
  voRM.tAllowUpdate= true;
  voRM.clearAll();
  //add by liubo
  if (PROCESS_INST_ID != null && PROCESS_INST_ID > 0) {
  	var userId = encodeURIComponent(DataTools.getSV("svUserID"));
  	var names = ["user","templateId","instanceId"];
  	var values = [userId,"0",PROCESS_INST_ID];
  	reLoadWfDataByInstanceId(names, values);
  }
  //end
  return true;
}
//----------------------------------------------------------------------
//private;
function Page4_resetDigest(){
  var vasCompoName= DataTools.getAllCompoNames();
  for (var i= 0; i< vasCompoName.length; i++){
    var vasTable= DataTools.getTableNames(vasCompoName[i]);
    for (var j=0; j< vasTable.length; j++){
      this.resetTableDigest(vasCompoName[i], vasTable[j]);
    }
  }
}
//----------------------------------------------------------------------
//private;
function Page4_resetTableDigest(sCompoName, sTableName){
  var voTableData = DataTools.getTableData(sTableName);
  var condition = voTableData.selectSingleNode("/*/meta").getAttribute("condition");
  var sqlid = voTableData.selectSingleNode("/*/meta").getAttribute("sqlid");

  var vasName= ["compoName", "tableName", "sqlid", "condition"];
  var vasValue=[sCompoName, sTableName, sqlid, condition];
  var vsResponseText= Info.requestDataK("getDigest", sCompoName, vasName, vasValue);
  if (vsResponseText!= null){
  	DataTools.setDigest(sTableName, vsResponseText);
  }	
}
//----------------------------------------------------------------------
//public; 导出单据数据;
//返回值: 成功: true; 否则: false;
function Page4_selectFileName(){
  return window.showModalDialog(this.getRoot()+ "/gp/webpage/html/SelectFile.htm", "请选择导出数据的目标文件:", "dialogWidth:400px; dialogHeight:130px; center:yes; resizable:no; status: no; scroll:no; help: no");
}
//----------------------------------------------------------------------
//public; 导出单据数据;
//返回值: 成功: true; 否则: false;
function Page4_exportData(){
  return this.exportDataK(this.selectFileName());
}
//----------------------------------------------------------------------
//public; 导出单据数据;
//返回值: 成功: true; 否则: false;
function Page4_exportDataK(sFileName){
  if (PF.isEmpty(sFileName)) return false;
  var voBuf= new StringBuffer();
  var vasTable= DataTools.getAllTableNames();
  if (vasTable== null || vasTable.length== 0) return false;
  voBuf.append("<?xml version=\"1.0\" encoding=\"GBK\"?>\n");
  voBuf.append("<data>\n");
  for (var i= 0, len= vasTable.length; i< len; i++){
    var tmpData = DataTools.getTableData(vasTable[i]);
    if (tmpData != null){
      voBuf.append(tmpData.xml);
      voBuf.append("\n");
    }
  }
  voBuf.append("</data>\n");
  return PF.writeFile(sFileName, voBuf.toString(), PF.OPEN_FILE_FORWRITING);
}
//----------------------------------------------------------------------
//public; 导入单据数据;
//如果是新单,则全导;
//如果不是新单,则不导主表数据,其他全导;
//返回值: 成功: true; 否则: false;
function Page4_importData(){
  var vsFileName= window.showModalDialog("gp/webpage/html/SelectFile.htm", "请选择导入数据的源文件:", "dialogWidth:400px; dialogHeight:130px; center:yes; resizable:no; status: no; scroll:no; help: no");
  return this.importDataK(vsFileName);
}
//----------------------------------------------------------------------
//private;将拼好的数据包导入到页面中；
function Page4_importDataFromDom(xmlDoc,isClearPK){
  if (isClearPK == null) isClearPK = true;
  var voTableData= null;
  var vsMainTable= DataTools.getMainTableName();
  var vasTableName= DataTools.getAllTableNames();
  var vsTable= "";
  var voRowSet= null;
  var vaoNewRow= null;
  var voRM= this.getRowManager();

  //获取主表关键字列集;
  var vax3KeyField= new Array();
  var vaoKeyField= DataTools.getKeyFields(vsMainTable);
  var vsField= "";
  var vsValue= "";
  var voField= null;
  for(var i= 0; i< vaoKeyField.length; i++){
    voField= vaoKeyField[i];
    if(PF.parseBool(voField.getAttribute("isrowid"))) continue;
    vsField= voField.getAttribute("name");
    vsValue= DataTools.getValue(vsMainTable, 0, vsField);
    vax3KeyField[vax3KeyField.length]= new Array(vsField, vsValue, -3);
  }

  //清除相关表;
  for (var i= 0; i< vasTableName.length; i++){
    vsTable= vasTableName[i];
    DataTools.clearTableData(vsTable);
  }
  //插入导入行;
  voRM.tAllowInsert= false;
  voRM.tAllowDelete= false;
  voRM.tAllowUpdate= false;
  for (var i= 0; i< vasTableName.length; i++){
    vsTable= vasTableName[i];
    voTableData= DataTools.getTableData(vsTable);
    if (voTableData== null) continue;

    voRowSet= voTableData.selectSingleNode("rowset");
    vaoNewRow= xmlDoc.documentElement.selectNodes(vsTable+ "/rowset/row");
    for (var j= 0; j< vaoNewRow.length; j++){
      voNoNode= null;
      for (var k= 0; k< vax3KeyField.length; k++){
        if (!isClearPK) break;
        if (vax3KeyField[k][2]< -1){
          for (var x= 0; x< vaoNewRow[j].childNodes.length; x++){
            if (vaoNewRow[j].childNodes[x].nodeName== vax3KeyField[k][0]){
              vax3KeyField[k][2]= x;
              break;
            }
          }
          if (vax3KeyField[k][2]< 0) vax3KeyField[k][2]-= 1;
        }
        if (vax3KeyField[k][2]>= 0) voNoNode= vaoNewRow[j].childNodes[vax3KeyField[k][2]];
        if (voNoNode== null || voNoNode.nodeName!= vax3KeyField[k][0]){
          voNoNode= vaoNewRow[j].selectSingleNode(vax3KeyField[k][0]);
        }
        if (voNoNode!= null) voNoNode.text= vax3KeyField[k][1];
      }
      voRowSet.appendChild(vaoNewRow[j]);
    }

    var vaoObj= this.oDataPartMap.get(vsTable);
    if (PF.isValidArray(vaoObj)){
      for (var x= 0; x< vaoObj.length; x++) vaoObj[x].loadData();
    }
  }

  voRM.tAllowInsert= true;
  voRM.tAllowDelete= true;
  voRM.tAllowUpdate= true;
  this.importData_Init();
  this.tIsChanged= true;
  return true;

}
//----------------------------------------------------------------------
//public; 导入单据数据;
//如果是新单,则全导;
//如果不是新单,则不导主表数据,其他全导;
//返回值: 成功: true; 否则: false;
function Page4_importDataK(sFileName){
  if (PF.isEmpty(sFileName)) return false;
  //读取导入文件;
  var vsText= PF.readFile(sFileName);
  var voXmldom = new ActiveXObject("Microsoft.XMLDOM");
  voXmldom.loadXML(vsText);
	this.importDataFromDom(voXmldom);
}
//----------------------------------------------------------------------
//private; 导入单据数据;
//如果是新单,则全导;
//如果不是新单,则不导主表数据,其他全导;
//返回值: 成功: true; 否则: false;
function Page4_importData_Init(oDataXMLDoc){
  var voRM= this.getRowManager();
  var vsMainTable= DataTools.getMainTableName();

  //更新 RowManager;
  if (this.isNew()){
    voRM.clearAll();
    voRM.recordAllRows(voRM.ACTION_INSERT);
  }else{
    var vasTableName= DataTools.getAllTableNames();
    for (var i= 0; i< vasTableName.length; i++){
      if (vasTableName[i]== vsMainTable) continue;
      voRM.recordTableRows(vasTableName[i], voRM.ACTION_INSERT);
    }
  }

  this.tIsChanged= true;
  return true;
}
//----------------------------------------------------------------------
//public; 是否发生了改变;
//返回值: 发生了改变: true, 否则: false;
function Page4_isChanged(){
  var voRM= this.getRowManager();
  if (voRM.isChanged()== false) DataTools.oDataSourceFrame.PageX.tIsChanged= false;
  return DataTools.oDataSourceFrame.PageX.tIsChanged;
}
//----------------------------------------------------------------------
//public; 是否是新单;
//返回值: 新单: true, 否则: false;
function Page4_isNew(){
  return this.tIsNew;
}
//----------------------------------------------------------------------
//public; 是否是顶层窗口;
//返回值: 是: true, 否则: false;
function Page4_isTopWin(){
  if (opener== null) return true;
  return false;
}
//----------------------------------------------------------------------
//public; 获取 list 页面下的 condition;
//返回值: 成功: condition; 否则: "";
function Page4_getListCondition(){
  if (this.sPageType!= this.PAGE_TYPE_LIST) return "";
  var vsMainTable= DataTools.getMainTableName();
  return this.getListConditionK(vsMainTable);
}
//----------------------------------------------------------------------
//public; 获取 list 页面下的 condition;
//返回值: 成功: condition; 否则: "";
function Page4_getListConditionK(sTable){
  if (PF.isEmpty(sTable)) return "";
  if (this.sPageType!= this.PAGE_TYPE_LIST) return "";
  //加入 Search 条件;
  var vaoSearch= PageX.getFreeManager().getSearchByTableName(sTable);
  vsCond= "";
  if (vaoSearch!= null){
    var vsTmp= "";
    for (var i= 0, len= vaoSearch.length; i< len; i++){
      if (vaoSearch[i]== null) continue;
      vsTmp= vaoSearch[i].getExecCond();
      if (PF.isEmpty(vsTmp)) continue;
      if (i> 0 && i< len- 1) vsCond += ";";
      vsCond +=  vsTmp;      
    }
  }
  return vsCond;
}
//----------------------------------------------------------------------
//public; 获取 list 页面下的 高级搜索的排序字段;
function Page4_getAdvOrderBy(sTable){
  if (PF.isEmpty(sTable)) return "";
  if (this.sPageType!= this.PAGE_TYPE_LIST) return "";
  var vaoSearch= PageX.getFreeManager().getSearchByTableName(sTable);
  var vsAdvOrderBy= "";
  if (vaoSearch!= null){
    var vsTmp= "";
    for (var i= 0, len= vaoSearch.length; i< len; i++){
      if (vaoSearch[i]== null) continue;
      vsTmp= vaoSearch[i].getAdvOrderBy();
      if (PF.isEmpty(vsTmp)) continue;
      if (i> 0 && i< len- 1) vsAdvOrderBy+= ",";
      vsAdvOrderBy+= vsTmp;
    }
  }
  return vsAdvOrderBy;
}
//----------------------------------------------------------------------
//public; 获取 list 页面下的 Grid Object;
//返回值: 成功: list grid object; 否则: null;
function Page4_getListGrid(){
  if (this.sPageType!= this.PAGE_TYPE_LIST) return null;
  var vsMainTable= DataTools.getMainTableName();
  var voCtrl= this.getDataPartObj(vsMainTable);
  return voCtrl;
}
//----------------------------------------------------------------------
//public; 设置值;仅针对 Grid, Free, Normal;
//返回值: void;
function Page4_setValue(oObj, iRow, sField, sValue){
  if (oObj== null) return;
  if (PF.isEmpty(sField)) return;
  if (iRow== null || iRow< 0) return;
  if (oObj.isValidFieldName(sField)){
    oObj.setValueByRowField(iRow, sField, sValue);
  }else{
    DataTools.setValue(oObj.getTableName(), iRow, sField, sValue);
  }
  return;
}
//----------------------------------------------------------------------
//public; 设置值;仅针对 Grid, Free, Normal;
//返回值: value of String/ null;
function Page4_getValue(oObj, iRow, sField){
  if (oObj== null) return null;
  if (PF.isEmpty(sField)) return null;
  var vsValue= "";
  if (oObj.isValidFieldName(sField)){
    vsValue= oObj.getValueByRowField(iRow, sField);
  }else{
    if (iRow== null || iRow< 0) return null;
    vsValue= DataTools.getValue(oObj.getTableName(), iRow, sField);
  }
  return vsValue;
}
//----------------------------------------------------------------------
//public; 获取页面中的 css sheet class 的文本;
//return: 成功:css sheet class 的文本;否则:null;
function Page4_getStyleText(oElement){
  if (oElement== null || oElement.style== null) return "";
  var vsStyle= PageX.getCssSheetText(oElement.className);
  if (vsStyle== null) vsStyle= "";
  vsStyle+= pageX.getCssSheetText(oElement.className)+ "; "+ oElement.style.cssText;
  return vsStyle;
}
//----------------------------------------------------------------------
//public; 获取页面中的 css sheet class 的文本;
//return: 成功:css sheet class 的文本;否则:null;
function Page4_getCssSheetText(sClassName){
  if (PF.isEmpty(sClassName)) return null;
  if (this.oCssMap== null){
    this.oCssMap= new Map();
    var voRule= null;
    for (var i= 0, len=document.styleSheets.length; i< len; i++){
      for (var j= 0, lenj= document.styleSheets[i].rules.length; j< lenj; j++){
        voRule= document.styleSheets[i].rules.item(j);
        this.oCssMap.put(voRule.selectorText, voRule.style.cssText);
      }
    }
  }
  var vsCssText= this.oCssMap.get("."+ sClassName);
  return vsCssText;
}
//----------------------------------------------------------------------
//public; 打开进度窗口.
//返回值: void;
function Page4_process(tIsForceOpen, tIsAutoRun){
  if (tIsForceOpen== null) tIsForceOpen= true;
  if (tIsAutoRun== null) tIsAutoRun= true;
  PageX.tIsForceOpenProcess= tIsForceOpen;
  PageX.tIsPrecessAutoRun= tIsAutoRun;
  var voRect= PF.getCenterRect(400, 100);
  if (tIsForceOpen){
    window.showModalDialog(PageX.sRootPath + "/gp/webpage/html/LaunchProcess.jsp", window, "center:yes;status:no;dialogWidth:20px;dialogHeight:20px;left:"+ voRect.iLeft+ "px;top:"+ voRect.iTop+ "px;");
  }else{
    var vsStyle= "menubar= no, toolbar= no, scrollbars= no, "
               + "resizable=no, resizable= no, titlebar= no, "
               + "left= "+ voRect.iLeft+ "px, top= "+ voRect.iTop+ "px, "
               + "width= "+ voRect.iWidth+ "px, height= "+ voRect.iHeight+ "px";
  	this.oProcessWin= open(PageX.sRootPath + "/gp/webpage/html/RunProcess.jsp", "_blank", vsStyle);
  	this.oProcessWin.focus();
  }
  return;
}
//----------------------------------------------------------------------
//public; 关闭进度窗口.
//返回值: void;
function Page4_closeProcess(){
  if (this.oProcessWin!= null) {this.oProcessWin.close(); this.oProcessbar= null;}
  if (window.opener!= null && window.opener.PageX!= null) window.opener.PageX.closeProcess();
  if (window.oProcessWin!= null) {window.oProcessWin.close(); window.oProcessbar= null;}
  if (window.opener!= null && window.opener.oProcessWin!= null) {window.opener.oProcessWin.close(); window.opener.oProcessbar= null;}
  return;
}
//----------------------------------------------------------------------
//public; 获取文本尺寸;
//返回值: 成功: Rect, 失败: null;
function Page4_getTextSize(sText, sFontName, sFontSize, sFontWeight){
  if (sText== null) return null;
  if (this.oTextSizeTA== null) return null;
  if (sFontName== null) sFontName= "宋体";
  if (sFontSize== null) sFontSize= "9pt";
  if(sFontWeight== null) sFontWeight = "normal";
  this.oTextSizeTA.style.fontFamily= sFontName;
  this.oTextSizeTA.style.fontSize= sFontSize;
  this.oTextSizeTA.style.fontWeight= sFontWeight;
  var voTD= this.oTextSizeTA.rows[0].cells[0];
  voTD.innerText= sText;
  var voRect= new Rect();
  voRect.iWidth= voTD.clientWidth;
  voRect.iHeight= voTD.clientHeight;
  voTD.innerText= "";
  return voRect;
}
//----------------------------------------------------------------------
//public;获取 Free 对象;
//return: Free / null;
function Page4_getFree(sTable){
  var voFM= this.getFreeManager();
  if (voFM== null) return null;
  return voFM.getFree(sTable);
}
//----------------------------------------------------------------------
//public;获取 Search 对象;
//return: Search / null;
function Page4_getSearch(sGroupId){
  var voFM= this.getFreeManager();
  if (voFM== null) return null;
  return voFM.getSearch(sGroupId);
}
//----------------------------------------------------------------------
//public;
//return: void;
function Page4_loadTableData(sTable){
  if (PF.isEmpty(sTable)) return;
  if (PageX.tHasInit== false) return;
  if (PageX.isTableDisappear(sTable)) return;
  var voDataXML= DataTools.getDataXML(sTable);
  if (voDataXML== null) return;
  var viValid= DataTools.isValidXMLData(voDataXML);
  if (viValid== DataTools.DATA_EMPTY) {
    alert("数据为空!\ntable name: "+ sTable);
    return false;
  }else if (viValid== DataTools.DATA_EXCEPTION) {
    alert("数据错误!\ntable name: "+ sTable+ "\n"+ voDataXML.xml);
    return false;
  }

  var voObj= null;
  var vaoCtrl= PageX.getAllCtrlObj();
  for (var i= 0; i< vaoCtrl.length; i++){
    voObj= vaoCtrl[i];
    if (PF.isExistMethodK(voObj.getTableName)== false) continue;
    if (voObj.getTableName()!= sTable) continue;
    if (PageX.isGrid(voObj)){
      voObj.iFromRow= 0;
      voObj.initMeta();
      if (voObj.tIsPagiAtClient && voObj.oPagination!= null){
        if (voObj.isAutoAppear()) voObj.oPagination.getPageData("first");
      }else{
        if (voObj.isAutoAppear()){
          voObj.loadData();
        }
      }
    }else if (PageX.isFree(voObj)){
      voObj.loadData();
    }else if (PageX.isTree(voObj)){
      if (voObj.isAutoAppear()) voObj.loadData();
    }else if (PageX.isNormal(voObj)){
      voObj.loadData();
    }else if (PageX.isBoxSet(voObj)) {
    	voObj.loadData();
    }
  }

  PageX.closeProcess();
  return;
}
//----------------------------------------------------------------------
function Page4_getParentFrame(){
  return this.oParentFrame;
}
//----------------------------------------------------------------------
function Page4_setParentFrame(oParentFrame){
  this.oParentFrame= oParentFrame;
}
//----------------------------------------------------------------------
//public;
//return: new Array(没有发现,表明检查通过: true 否则: false, check message);
function Page4_checkEmptyValue(oResourceMap){
  var vavRet= new Array();
  vavRet[0]= true;
  vavRet[1]= "";

  var voMap= PageX.checkEmptyValueK();
  if (voMap== null || voMap.size()<= 0) return vavRet;
  vavRet[0]= false;
  vavRet[1]= PageX.makeCheckEmptyValueMessage(voMap, oResourceMap);
  return vavRet;
}
//----------------------------------------------------------------------
//public;
//return:
//map: key= tablename, value= table empty record map;
//table empty record map: key= field, value= record object;
//record object:
//record.tablename= tablename;
//record.fieldname= fieldname;
function Page4_checkEmptyValueK(){
  var vasTable= DataTools.getAllTableNames();
  if (PF.isValidArray(vasTable)== false) return null;

  var voMap= new Map();
  for (var i= 0; i< vasTable.length; i++){
    var voTableMeta= DataTools.getTableMeta(vasTable[i]);
    var vaoField= voTableMeta.selectNodes("fields/field[@isallownull='false']");
    var voFieldMap= new Map();
    for (var j= 0; j< vaoField.length; j++){
      voFieldMap.put(vaoField[j].getAttribute("name"), null);
    }
    var voGrid= PageX.getAreaGrid(vasTable[i]);
    if (voGrid!= null){
      var vaoCol= voGrid.getCols();
      for (var x= 0; x< vaoCol.length; x++){
        if (PF.parseBool(vaoCol[x].isallownull)){
          if (voFieldMap.isContain(vaoCol[x].fieldname)){
            voFieldMap.remove(vaoCol[x].fieldname);
          }
          continue;
        }
        voFieldMap.put(vaoCol[x].fieldname, null);
      }
    }else{
      var voFree= PageX.getFree(vasTable[i]);
      if (voFree!= null){
        var vaoBox= voFree.getAllEditBox();
        for (var x= 0; x< vaoBox.length; x++){
          if (PF.parseBool(vaoBox[x].isAllowNull())){
            if (voFieldMap.isContain(vaoBox[x].getFieldName())){
              voFieldMap.remove(vaoBox[x].getFieldName());
            }
            continue;
          }
          voFieldMap.put(vaoBox[x].getFieldName(), null);
        }
      }
    }
    var vasField= voFieldMap.getAllKey();

    if (PF.isValidArray(vasField)== false) continue;
    var voTableData= DataTools.getTableData(vasTable[i]);
    if (voTableData== null) continue;

    for (var j= 0; j< vasField.length; j++){
      var voCol= voTableData.selectSingleNode("rowset/row[not("+ vasField[j]+ ") or "+ vasField[j]+ "='']");
      if (voCol== null) continue;
      var voTableMap= voMap.get(vasTable[i]);
      if (voTableMap== null){
        voTableMap= new Map();
        voMap.put(vasTable[i], voTableMap);
      }
      var voRecord= new Object();
      voRecord.tablename= vasTable[i];
      voRecord.fieldname= vasField[j];
      voTableMap.put(voRecord.fieldname, voRecord);
    }
  }
  return voMap;
}
//----------------------------------------------------------------------
//public;
//return: String;
function Page4_makeCheckEmptyValueMessage(oMap, oResourceMap){
  if (oMap== null) return "";
  var voBuf= new StringBuffer();
  voBuf.append("抱歉，以下信息不允许为空，请您修改。\n\n");
  var vasTable= oMap.getAllKey();
  for (var i= 0; i< vasTable.length; i++){
    var voTableMap= oMap.get(vasTable[i]);
    if (voTableMap== null) continue;

    voBuf.append(PageX.getResourceForMakeCheckEmptyValueMessage(vasTable[i], vasTable[i], oResourceMap)+ ":\n");
    var vaoRecord= voTableMap.getAllItem();
    for (var j= 0; j< vaoRecord.length; j++){
      if (vaoRecord[j]== null) continue;
      voBuf.append("["+ PageX.getResourceForMakeCheckEmptyValueMessage(vasTable[i], vaoRecord[j].fieldname, oResourceMap)+ "] 不允许为空.\n");
    }
    voBuf.append("\n");
  }
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private;
//return: String;
function Page4_getResourceForMakeCheckEmptyValueMessage(sTable, sKey, oResourceMap){
  if (sKey== null) return null;
  var vsValue= "";
  if (oResourceMap!= null){
    vsValue= oResourceMap.get(sKey);
  }
  if (PF.isEmpty(vsValue)) {
    if (sTable== sKey) return sKey;
    var voCtrl= PageX.getFree(sTable);
    if (voCtrl!= null){
      vsValue= voCtrl.getFieldCaption(sKey);
    } 
    if(PF.isEmpty(vsValue)){
    	var voCtrl = PageX.getBoxSet(sTable, "none");
    	if (voCtrl!= null){
        vsValue= voCtrl.getFieldCaption(sKey);
      }
    }
    if (PF.isEmpty(vsValue)){ 
      voCtrl= PageX.getAreaGrid(sTable);
      if (voCtrl!= null){
        vsValue= voCtrl.getFieldCaption(sKey);
      }
    }
  }
  if (PF.isEmpty(vsValue)) vsValue= sKey;
  return vsValue;
}
//----------------------------------------------------------------------
//public;
function Page4_setOpenedWinFocus(){
  if (this.oOpenedWin== null) return;
  try{
	  this.oOpenedWin.focus();
  }catch(e){
  		return;
  }
}
//----------------------------------------------------------------------
//public; 获取页面上的 digest,只针对 v4.0 jsp 页面,使用 Free 展示主表的页面;
//return: digest/null;
function Page4_getPageDigest(){
  var vsCompoName= DataTools.getCompoName();
  var vsMainTable= DataTools.getMainTableName();
  var voFree= PageX.getFree(vsMainTable);
  var vasKeyField= DataTools.getKeyFieldNames(vsMainTable);
  if (PF.isValidArray(vasKeyField)== false) return null;
  var vaoRowValueMap= DataTools.getFieldValues(vsMainTable, [0], vasKeyField);
  if (PF.isValidArray(vaoRowValueMap)== false) return null;
  var voValueMap= vaoRowValueMap[0];
  if (voValueMap== null) return null;

  var voBuf= new StringBuffer();
  for (var i= 0; i< vasKeyField.length; i++){
    if (i> 0) voBuf.append(" and ");
    voBuf.append(vsMainTable);
    voBuf.append(".");
    voBuf.append(vasKeyField[i]);
    voBuf.append("='");
    voBuf.append(voValueMap.get(vasKeyField[i]));
    voBuf.append("'");
  }

  var vasName= new Array("entityname", "condition");
  var vasValue= new Array(vsCompoName, voBuf.toString());
  var voRet= Info.requestData("getpagedigest", vsCompoName, vasName, vasValue, PageX.sRootPath + "/XmlProxy"); //请求;
  if (voRet== null){
    alert("返回值为:null,获取digest时出现异常.");
    return null;
  }
  var vsDigest= voRet.text;
  return vsDigest;
}
//----------------------------------------------------------------------
function Page4_showHelp(sHelpUrl){
  if (PF.isEmpty(sHelpUrl)){
  	var compoName = DataTools.getCompoName();
  	var subsys;
  	var root;
  	if (compoName.indexOf("_")>0){
  		subsys= compoName.substr(0, compoName.indexOf("_"));
  	}else{
  	  subsys= compoName.substr(0,2);
  	}
  	root= subsys;
    sHelpUrl= this.getRoot()+ "/help/" + subsys + "/"+ compoName + ".htm";
  }
  var win_help = open(sHelpUrl, "anonymous",
			"menubar=no,status=no,toolbar=yes,"
			+ "resizable=yes,titlebar=yes,scrollbars=yes,"
			+ "height=" + (screen.availHeight - 30)*2/3 + ",width="
			+ (screen.availWidth - 460) + ",top=0,left=450");
	win_help.focus();
	return;
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function Page4_dbExport(asName, asValue, sExportConfFile){
  var vsFileName= window.showModalDialog("gp/webpage/html/SelectFile.htm", "请选择导出数据的目标文件:", "dialogWidth:400px; dialogHeight:130px; center:yes; resizable:no; status: no; scroll:no; help: no");
  return PageX.dbExportK(vsFileName, asName, asValue, sExportConfFile);
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function Page4_dbExportK(sToFile, asName, asValue, sExportConfFile){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "dbExport");
  if (PF.isEmpty(sToFile)){
    alert("PageX.dbExport():\n参数 sToFile 为空,不能继续导出.");
    return false;
  }
  if (asName== null) asName= new Array();
  if (asValue== null) asValue= new Array();
  if (asName.length!= asValue.length){
    alert("PageX.dbExport():\n参数 asName 与 asValue 长度不匹配,不能继续导出.");
    return false;
  }
  var vasName= new Array("ex_conffile", "ex_compo");
  var vasValue= new Array(sExportConfFile, DataTools.getCompoName());
  vasName= vasName.concat(asName);
  vasValue= vasValue.concat(asValue);

  //请求并装载数据;
  var vsText= Info.requestDataK("dbexport", "all", vasName, vasValue);
  var vsErrMark= "Occur a error at com.anyi.erp.pub.DBExport.run(), 20051212.";
  if (vsText== null || vsText.indexOf(vsErrMark)>= 0){
    return false;
  }
  PF.writeFile(sToFile, vsText, PF.OPEN_FILE_FORWRITING);
  return true;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Page4_setTableDisappear(sTable, tIsDisappear){
  if (PF.parseBool(tIsDisappear)) this.oDisappearTableMap.put(sTable, sTable);
  else this.oDisappearTableMap.remove(sTable);
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function Page4_isTableDisappear(sTable){
  return this.oDisappearTableMap.isContain(sTable);
}
//----------------------------------------------------------------------
//public;
//return:void;
function Page4_setWait(tIsWait, tIsForceOpen, sMessage){
  if (this.oWaitPanel== null){
    this.oWaitPanel= document.createElement("<div style=\"position:absolute;left:0;top:0;width:100%;height:100%;cursor:wait;background-color:blue;z-index:2100000000;display:none;filter:Alpha(Opacity=1,FinishOpacity=1,Style=1)\">");
    document.body.appendChild(this.oWaitPanel);
  }
  if (tIsWait){
    this.tIsPageWaiting= true;
    this.oWaitPanel.style.display= "block";
    this.oWaitPanel.focus();
    window.showModelessDialog(PageX.sRootPath + "/gp/webpage/html/WaittingFor.htm", new Array(window, sMessage), "dialogWidth:300px;dialogHeight:100px;unadorned:yes;center:yes;status:no;resizable:no;help:no;scroll:no;");
    if (tIsForceOpen){
      window.showModalDialog(PageX.sRootPath + "/gp/webpage/html/ForceWaittingFor.htm", window, "center:yes;status:no;dialogWidth:20px;dialogHeight:20px;");
    }
  }else{
    this.oWaitPanel.style.display= "none";
    if (this.oWaitWin!= null) this.oWaitWin.close();
    this.tIsPageWaiting= false;
  }
}
//----------------------------------------------------------------------
//public; edit 页面更改后,回写list grid.加入 rowmanager add action
//sInsRowPosForNew: first / last;
//return: true/false;
function Page4_rewriteToList(oPwindow, sInsRowPosForNew, tIsShowErrInfo){
  if (oPwindow== null) oPwindow= opener;
  if (tIsShowErrInfo== null) tIsShowErrInfo= true;
  tIsShowErrInfo= PF.parseBool(tIsShowErrInfo);
  if ((oPwindow== null || oPwindow.PageX== null)){
    if (tIsShowErrInfo) alert("父窗口为空.");
    return false;
  }
  var vsListCompo= oPwindow.DataTools.getCompoName();
  if (vsListCompo!= DataTools.getCompoName()){
    if (tIsShowErrInfo) alert("父窗口与子窗口中内容不一致.");
    return false;
  }

  var vsMainTable= DataTools.getMainTableName();
  var voListGrid= oPwindow.PageX.getAreaGrid(vsMainTable);
  if (voListGrid== null){
    if (tIsShowErrInfo) alert("没有发现相关的 list grid.\n表: "+ vsMainTable);
    return false;
  }

  var voKeyMap= null;
  var voCondRowMap= null;
  var voRM= PageX.getRowManager();
  if (voRM== null) return false;
  var voXml= PF.parseXml(voRM.sMainTableOldValue);
  voKeyMap= DataTools.rowToMap(voXml);
  voXml= null;
  if (voRM.sMainTableAction!= voRM.ACTION_INSERT && voKeyMap== null) return false;
  
  return this.rewriteToListK(oPwindow, sInsRowPosForNew, tIsShowErrInfo, voRM.sMainTableAction, voKeyMap);
}
//----------------------------------------------------------------------
//public; edit 页面更改后,回写list grid.加入 rowmanager add action
//sInsRowPosForNew: first / last;
//return: true/false;
function Page4_rewriteToListK(oPwindow, sInsRowPosForNew, tIsShowErrInfo, sAction, oCondMap, oDataMap){
  var voRM= PageX.getRowManager();
  if (voRM== null) voRM= new RowManager();
  if (sAction!= voRM.ACTION_INSERT
      && sAction!= voRM.ACTION_DELETE
      && sAction!= voRM.ACTION_UPDATE){
    alert("PageX.rewriteToListK():\n参数无效!\n"+ "sAction: "+ sAction);
    return;
  }
  if (oCondMap== null){
    alert("PageX.rewriteToListK():\noCondMap 参数为空!\n");
    return;
  }

  var vsMainTable= DataTools.getMainTableName();
  var voListGrid= oPwindow.PageX.getAreaGrid(vsMainTable);
  var vaoDataRow= null;
  if (sAction!= voRM.ACTION_DELETE){
    vaoDataRow= DataTools.getTableRows(vsMainTable, [0]);
    if (!PF.isValidArray(vaoDataRow)) return false;
  }

  var vasKeyField= DataTools.getKeyFieldNames(vsMainTable);
  var voCondBuf= new StringBuffer();
  for(var i= 0; i< vasKeyField.length; i++){
    if (i> 0) voCondBuf.append(" and ");
    voCondBuf.append(vasKeyField[i]).append("='").append(oCondMap.get(vasKeyField[i])).append("'");
  }

  if (sAction== voRM.ACTION_INSERT){
    var va2xsSet= new Array();
    if (oDataMap!= null){
      va2xsSet[0]= oDataMap.getAllKey();
      va2xsSet[1]= oDataMap.getAllItem();
    }else{
      var vasField= oPwindow.DataTools.getFieldNames(vsMainTable);
      va2xsSet= DataTools.rowsToA2x(vaoDataRow, vasField);
    }
    oPwindow.DataTools.deleteTableData(vsMainTable, voCondBuf.toString());
    var viRowForNew= (sInsRowPosForNew== "first")? 0: -1;
    oPwindow.DataTools.insertData(vsMainTable, va2xsSet[0], va2xsSet[1], viRowForNew, false, false, false, null, false, false);
  }else if (sAction== voRM.ACTION_DELETE){
    oPwindow.DataTools.deleteTableData(vsMainTable, voCondBuf.toString());
  }else if (sAction== voRM.ACTION_UPDATE){
    var voDataMap= oDataMap;
    if (voDataMap== null){
      voDataMap= DataTools.rowToMap(vaoDataRow[0]);
    }
    var voListTable= oPwindow.DataTools.getTableData(vsMainTable);
    if (voListTable== null) return false;
    var voListRow= voListTable.selectSingleNode("rowset/row["+ voCondBuf.toString()+ "]");
    if (voListRow== null) return false;
    for (var i= 0; i< voListRow.childNodes.length; i++){
      voListRow.childNodes[i].text= voDataMap.get(voListRow.childNodes[i].nodeName);
    }
  }
  var viListRow= voListGrid.getCurRowIndex();
  voListGrid.loadData();
  voListGrid.setCurRow(viListRow);
  return true;
}
//----------------------------------------------------------------------
//public;
//return: array of 2 bounds,[0]=true/false,[1]=message;
function Page4_saveOptions(asOptId, asOptValue, sCompoName, sCoCode, sTransType, tIsSys){
  if (asOptId== null || asOptId.length<= 0) return this.saveOptionsByXml(null);
  if (asOptValue== null) return this.saveOptionsByXml(null);
  if (asOptId.length!= asOptValue.length) return this.saveOptionsByXml(null);
  if (sCompoName== null) sCompoName= "*";
  if (sCoCode== null) sCoCode= "*";
  if (sTransType== null) sTransType= "*";
  if (tIsSys== null) tIsSys= false;
  tIsSys= PF.parseBool(tIsSys);
  if(tIsSys== true){
    tIsSys= "Y";
  } else {
  	tIsSys= "N";
  }	 
  
  var voBuf= new StringBuffer();
  voBuf.append("<root>\n");
  for (var i= 0; i< asOptId.length; i++){
    voBuf.append("<row ");
    voBuf.append("OPT_ID=\"").append(asOptId[i]).append("\" ");
    voBuf.append("OPT_VAL=\"").append(asOptValue[i]).append("\" ");
    voBuf.append("COMPO_ID=\"").append(sCompoName).append("\" ");
    voBuf.append("CO_CODE=\"").append(sCoCode).append("\" ");
    voBuf.append("TRANS_TYPE=\"").append(sTransType).append("\" ");
    voBuf.append("IS_SYST_OPT=\"").append(tIsSys).append("\" ");
    voBuf.append("/>\n");
  }
  voBuf.append("</root>\n");
  return this.saveOptionsByXml(voBuf.toString());
}
//----------------------------------------------------------------------
//public;
//return: array of 2 bounds,[0]=true/false,[1]=message;
function Page4_saveOptionsByTable(sTempTable, sCompoName, sCoCode){
  if (sTempTable== null) sTempTable= DataTools.getMainTableName();
  if (sTempTable== null) return saveOptionsByXml(null);
  if (PageX.isChanged()== false) return new Array(true, "没有发生改变,不用保存.");
  var voTableData= DataTools.getTableData(sTempTable);
  var voRow= voTableData.selectSingleNode("rowset/row");
  if (voRow== null) return new Array(true, "没有找到表数据,不能保存.");
  var vasOptId= new Array();
  var vasOptValue= new Array();
  for (var i= 0; i< voRow.childNodes.length; i++){
    var voCol= voRow.childNodes[i];
    if (voCol.nodeName.indexOf("OPT_")!= 0) continue;
    vasOptId[vasOptId.length]= voCol.nodeName;
    vasOptValue[vasOptValue.length]= voCol.text;
  }
  
  var voRM= PageX.getRowManager();
  voRM.clearAll();
  return this.saveOptions(vasOptId, vasOptValue, sCompoName, sCoCode, null, false);
}
//----------------------------------------------------------------------
//public;
//return: array of 2 elements,[0]=true/false,[1]=message;
function Page4_saveOptionsByXml(sOptionXml){
  var vavRet= new Array();
  vavRet[0]= false;
  vavRet[1]= "参数无效。";
  if (PF.isEmpty(sOptionXml)) return vavRet;
  var voResponse= Info.requestData("saveOpt", "all", new Array("optionXml"), new Array(sOptionXml));
  if (voResponse== null){
    vavRet[1]= "服务器在响应请求时出现错误;请查看控制台和rolling.log;";
  }
  var voRoot= voResponse;//PF.parseXml(voResponse.text);
  vavRet[0]= PF.parseBool(voRoot.getAttribute("success"));
  vavRet[1]= voRoot.text;
  return vavRet;
}
//----------------------------------------------------------------------
//public;
//return: Map/null;
function Page4_getOptions(sOptIds, sCompoName, sCoCode, sTransType){
  if (PF.isEmpty(sOptIds)) return null;
  if (sCompoName== null) sCompoName= "*";
  if (sCoCode== null) sCoCode= "*";
  if (sTransType== null) sTransType= "*";
  var voRoot= Info.requestData("getOptions", sCompoName, new Array("optIds", "coCode", "compoId", "transType"), new Array(sOptIds, sCoCode, sCompoName, sTransType),null);
  if (voRoot== null) return null;
  vtIsSuccess= PF.parseBool(voRoot.getAttribute("success"));
  if (vtIsSuccess== false){
    alert("获取 options 信息失败;\n"+ voRoot.text);
    return null;
  }
  var voMap= new Map();
  for (var i= 0; i< voRoot.childNodes.length; i++){
    var voNode= voRoot.childNodes[i];
    voMap.put(voNode.getAttribute("OPT_ID"), voNode.getAttribute("OPT_VAL"));
  }
  return voMap;
}
//----------------------------------------------------------------------
function Page4_getRoot(){
  return this.sRootPath;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; 侦听 PageDataXML.onreadystatechange 事件;
//返回值: void;
//deprecated;leidh;20070119;
function Page4_PageDataXML_OnDatasetComplete(oSender, sTable, oEvent){
	PageX.loadTableData(sTable);
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//public; 得到部件使用的默认流程模板; 在AS_COMPO中描述的;
//返回值:存在可用的默认流程模板:返回流程模板id, 否则:返回"";
function Page4_getDefaultTemplateId(compoMeta){
  var vsDefTemplateId = compoMeta.getAttribute("wfdeftemp");
  var vtDefTemplateUsed = compoMeta.getAttribute("iswfusedtemp");
  if (vtDefTemplateUsed && PF.trim(vsDefTemplateId) != "")
    return vsDefTemplateId;
  else
    return "";
}

function Page4_queryCompoEnableStartedTempate(compoName) {
	var names = new Array("compoId");
	var values = new Array(compoName);
	var result = requestData("queryCompoEnableStartedTempate", "all", names, values);
	return (result != null? result.text: null);
}
//----------------------------------------------------------------------
//private; 通过对话框选择挂接的流程模板;
//返回值:选择的流程模板
function Page4_getSelectedTemplateDatasFromDialog(compoName){
  var vjNow= new Date();
  var vasTemplateDatas= new Array();
  var voWinSelect= showModalDialog(this.sRootPath+ "/Proxy?function=getSelectPage&componame="
		  + "WF_TEMPLATE" + "&condition="+ ""+"&sql="
        + "&originCompoName=" + compoName + "&ismulti=" + false
      	  + "&"+ this.WINDOW_MODAL+ "="+ this.WINDOW_MODAL_1
		  + "&d=" + vjNow.getMilliseconds(), new Array(window),"status:no;help:no;resizable:yes");
  if (voWinSelect){
      var vasNames= new Array();
      var vasValues= new Array();
      vasNames= voWinSelect[0];
      vasValues= voWinSelect[1];
      var viNamesLen= vasNames.length;
      for(var i=0; i<viNamesLen; i++){
        if(vasNames[i].toUpperCase()== "WF_TEMPLATE_ID"){
            vasTemplateDatas[1]= vasValues[i];
            break;
        }
      }
  }
  return vasTemplateDatas;
}
//----------------------------------------------------------------------
//private; 得到挂接的流程模板;
//返回值:挂接的流程模板;
function Page4_getSelectedTemplateDatas(compoName){
  var vasTemplateDatas= new Array();
  var vsCompoEnableStartedTemplate= this.queryCompoEnableStartedTempate(compoName);
  if(!vsCompoEnableStartedTemplate) return vasTemplateDatas;
  if(vsCompoEnableStartedTemplate.indexOf(",")== -1){
    vasTemplateDatas[1]= vsCompoEnableStartedTemplate;
    return vasTemplateDatas;
  }
  vasTemplateDatas= this.getSelectedTemplateDatasFromDialog(compoName);

  return vasTemplateDatas;
}

// cuiliguo 2006.05.22
// Page4_newInstance 已废弃。相关功能移到 Page4_newInstCommit 中实现。
function Page4_newInstance(compoName, compoData, instanceId) {
	var result = "";
	var compoMeta= DataTools.getCompoMeta(compoName);
	var templateId = this.getDefaultTemplateId(compoMeta);
	if (!templateId) {
		var vaTemplateData = this.getSelectedTemplateDatas(compoName);
		if (vaTemplateData && vaTemplateData.length >= 2)
			templateId = vaTemplateData[1];
	}
	if (!templateId) {
		alert("没有适合本张单据的流程模版，无法新建流程。");
		return "";
	}
	compoData = compoData.replace("<delta>\n", "").replace("<delta>", "").replace("\n</delta>", "").replace("</delta>", "");
	if (!compoName)
		compoName = DataTools.getCompoName();
	var wfData = "<entity>\n<field name=\"WF_TEMPLATE_ID\" value=\"" + templateId + "\"/>\n</entity>";
	var names = new Array("data", "componame", "wfdata");
	var values = new Array(compoData, compoName, wfData);
	var newIdXml = Info.requestData("newWFInstance", compoName, names, values);
	if (newIdXml.xml.indexOf("success=\"true\"") > -1)
		result = newIdXml.firstChild.text;
	return result;
}

// cuiliguo 2006.05.22
// Page4_commitNewInstance 已废弃。相关功能移到 Page4_newInstCommit 中实现。
function Page4_commitNewInstance(compoName, instanceId, userId) {
  if (!compoName)
    compoName = DataTools.getCompoName();
  var wfData = "";
  var coCode = DataTools.getSV("svCoCode");
  var orgCode = DataTools.getSV("svOrgCode");
  wfData += PF.getFieldXml("WF_COMPANY_CODE",coCode);
  wfData += PF.getFieldXml("WF_ORG_CODE" , orgCode);

  // 剩余业务部件的接口需补齐的数据提范例
  /*wfData +=" <entity name=\"WF_VARIABLE\">";
  wfData +=" <row>";
  wfData +=" <entity>";
  wfData +=" <field name=\"VariableId\" value=\"701\" />";
  wfData +=" <field name=\"VariableName\" value=\"vTest\" />";
  wfData +=" <field name=\"VariableValue\" value=\"01\" />";
  wfData +=" </entity>";
  wfData +=" </row>";
  wfData +=" </entity>";*/
  // 范例结束
  
  //检查业务部件的_before_newinstancecommit()提交接口  
  wfData = PF.getWraptXml("entity", wfData);
  var doc = new ActiveXObject("Microsoft.XMLDOM");
  doc.loadXML(wfData);
  var wfDataXml = doc.documentElement;
  var funcName = compoName + "_before_commitsimply";
  if (eval("typeof " + funcName + "==\"function\"")) {
	 wfData = eval(funcName + "(wfDataXml)");
  }
  var names = new Array();
  var values = new Array();
  names[0]="strInstanceId";
  values[0]=instanceId;
  names[1]="strTemplateId";
  values[1]="";
  names[2]="strCompoId";
  values[2]=compoName;
  names[3]="strUserId";
  values[3]=userId;
  names[4]="strWfData";
  values[4]= wfData;
  return Info.requestData("commitSimply", compoName, names, values, null); 
}

// cuiliguo 2006.05.22
// 把业务单据草稿送审，供内部使用。外部调用推荐使用 Page4_newCommit()。
function Page4_newInstCommit(compoName, compoData, userId, url) {
  var result = "";

  if (!compoName) {
    compoName = DataTools.getCompoName();
  }

  // 1、选择流程模板
  var compoMeta = DataTools.getCompoMeta(compoName);
  var templateId = this.getDefaultTemplateId(compoMeta);
  if (!templateId) {
    var vaTemplateData = this.getSelectedTemplateDatas(compoName);
    if (vaTemplateData && vaTemplateData.length >= 2)
      templateId = vaTemplateData[1];
  }
  if (!templateId) {
    return "没有适合本张单据的流程模版，无法新建流程。";
  }

  // 2、准备工作流数据

  var wfData = WFInterface.getWFSessionXml().xml;
  var infoAdded =  "<field name=\"WF_TEMPLATE_ID\" value=\"" + templateId + "\"/>";;
  wfData = wfData.replace("<entity>","<entity>"+ infoAdded );//加上信息
  var funcName = compoName + "_before_commitsimply";
  var wfData2;
  if (eval("typeof " + funcName + "==\"function\"")) {
	 wfData2 = eval(funcName + "(wfData)");
  }else{
  	wfData2 = wfData;
  }
  var funcName1 = "before_commitsimply";
  if (eval("typeof " + funcName1 + "==\"function\"")) {
	 wfData2 = eval(funcName1 + "(wfData2)");
  }else{
  	wfData2 = wfData;
  }

  var names = new Array("data", "componame", "wfdata");
  var values = new Array(compoData, compoName, wfData2);

	// 3、调用后台wfNewCommit()方法
	var actionName = this.getWfAction(WFConst.NEWCOMMIT);
	var retXml = Info.requestData(actionName, compoName, names, values, url);
	if (retXml) {
		var retText = retXml.text;
		var vtSuccess = PF.parseBool(retXml.getAttribute("success"));
		if (vtSuccess) {
			if (retText != "success")
				result = retText;
			else
				result = "success";
		} else
			result = retText; // cuiliguo 2006.07.24 各种返回信息的格式需要统一。
	} else {
		result = "单据送审失败，未能成功调用后台方法。";
	}

	return result;
}

// cuiliguo 2006.05.22
// 把业务单据草稿送审，默认处理页面主表所有记录。也可通过 aiRow 参数指定需要送审的记录行号。
function Page4_newCommit(aiRow, needTM,gridName) {
	var compoName;
	if(gridName){
	  compoName = DataTools.getCompoNameByTable(gridName);	
	}else{
	  compoName = DataTools.getCompoName();
	}
	var tableName = DataTools.getMainTableName(compoName);
	var rowCount = DataTools.getTableRowCount(tableName);
	if (rowCount > 0) {
		if (!aiRow) {
			aiRow = new Array(rowCount);
			for (var i = 0; i < rowCount; i++)
				aiRow[i] = i;
		}
		var userId = DataTools.getSV("svUserID");
		var compoData;

		if (needTM) {
			// 所有单据需要在一个事务内送审
			var retXml = "";
			var retText = "";
			var vtSuccess = false;
			var result = "";
			for (var i = 0; i < aiRow.length; i++) {
				compoData = "<delta>"
				if (eval("typeof getBusinessData ==\"function\"")){
		    	var vsBusinessData= eval("getBusinessData(tableName, aiRow)");
		    	compoData += vsBusinessData;
	    	}else {
					compoData += DataTools.getTableDataXML(tableName,aiRow[i]);
			  }
				compoData += "</delta>";
				retXml = this.newInstCommit(compoName, compoData, userId);
				if (retXml != "success") {
						result += "第" + (aiRow[i] + 1) + "行：调用后台时发生错误!错误原因:\n" + retXml + "\n";
				}
			}
	    if (result == "")
      	return "success";
    	else
	      return "处理失败!错误原因 ------ \n" + result;
		} else {
			// 每张单据都在不同的事务内送审
			compoData = "<delta>";
			var vsBusiData= "";
	    if (eval("typeof getBusinessData ==\"function\"")){
		    var vsBusinessData= eval("getBusinessData(tableName, aiRow)");
		    compoData += vsBusinessData;
	    } else {
				for (var i = 0; i < aiRow.length; i++) {
					compoData += DataTools.getTableDataXML(tableName,aiRow[i]);
				}
			}
			compoData += "</delta>";
			return  this.newInstCommit(compoName, compoData, userId);
		}
	} else {
		return "没有需要送审的单据！";
	}
}
//add by liubo
function reLoadWfDataByInstanceId(names, values) {
	var URL = PageX.getRoot()+ "/getWfdataByProcessInstId.action";
	var res = Info.requestDataByPost(URL,names,values,false);
	var dom = PF.parseXml(res);
	var flag = dom.getAttribute("success");
	if (flag === "true") {
		window.WFDataXML = PF.parseXml(dom.text);
	} else {
		alert("获取工工作流信息失败!");
	}
}

function Page4_focusNextBox(currentBoxId){
	var nextBoxIndex = 0;
	for (var i = 0, j = this.boxIndexes.length; i < j; i++){
		if (this.boxIndexes[i] == currentBoxId){
			nextBoxIndex = i + 1;
			if (nextBoxIndex == j){
				nextBoxIndex = 0;
			}
			break;
		}
	}
	var nextFocusBoxIndex = -1;
	for (var i = nextBoxIndex, j = this.boxIndexes.length; i < j; i++){
		if (PageX.getCtrlObj(this.boxIndexes[i]).canFocus()){
			nextFocusBoxIndex = i;
			break;
		}
	}
	if (nextFocusBoxIndex == -1){
		for (var i = 0, j = nextBoxIndex - 1; i < j; i++){
			if (PageX.getCtrlObj(this.boxIndexes[i]).canFocus()){
				nextFocusBoxIndex = i;
				break;
			}
		}
	}
	if (nextFocusBoxIndex >= 0){
		PageX.getCtrlObj(this.boxIndexes[nextFocusBoxIndex]).setFocus();
	}
}

function Page4_focusPreviousBox(currentBoxId){
	var currentBoxIndex = 0;
	for (var i = 0, j = this.boxIndexes.length; i < j; i++){
		if (this.boxIndexes[i] == currentBoxId){
			currentBoxIndex = i;
			break;
		}
	}
	var nextFocusBoxIndex = -1;
	for (var i = currentBoxIndex - 1; i >= 0; i--){
		if (PageX.getCtrlObj(this.boxIndexes[i]).canFocus()){
			nextFocusBoxIndex = i;
			break;
		}
	}
	if (nextFocusBoxIndex == -1){
		for (var i = this.boxIndexes.length - 1; i > currentBoxIndex; i--){
			if (PageX.getCtrlObj(this.boxIndexes[i]).canFocus()){
				nextFocusBoxIndex = i;
				break;
			}
		}
	}
	if (nextFocusBoxIndex >= 0){
		PageX.getCtrlObj(this.boxIndexes[nextFocusBoxIndex]).setFocus();
	}
}

function Page4_release() {
	var ctrs = PageX.oCtrlMap.getAllItem();
	for (var i = 0; i < ctrs.length; i++) {
		var ctr = ctrs[i];
		ctr.release();
	}
	CollectGarbage();
}

function parseConStrToArray(condition) {
	var names = new Array();
	var values = new Array();
	var pairs = condition.split(";");
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i];
		var index = pair.indexOf("=");
		names.push(pair.substr(0, index));
		values.push(pair.substr(index+1));
	}
	return [names, values];
}

function Page4_setWfConfig(wfConfig) {
	this.wfConfig = wfConfig;
}

function Page4_getWfAction(action) {
	var realAction = this.wfConfig[action];
	if (!realAction) {
		realAction = WFConst.defaultAction[action];
	}
	return realAction;
}

//本方法现暂时输出对象初始化时间
function Page4_debug_showCtrObjects(){
	var vNewTime = 0;
	var vInitTime = 0;
	var vInitTime1 = 0;
	var vInitTime2 = 0;
	var vInitTime3 = 0;
	var vInitTime4 = 0;
	var vInitTime5 = 0;
	var vMakeTime = 0;
	var vResizeTime = 0;
	var strShow = " CLASSNAME\t\t\tNew\tInit\tMake\tt1\tt2\tt3\tt4\tt5\tResize\t\tObject\n";	
	var objNames = this.oCtrlMap.getAllKey();
	for(var i = 0; i < objNames.length; i++){
		var obj = this.oCtrlMap.get(objNames[i]);
		strShow += obj.CLASSNAME + "\t\t" + obj.tNewTime;
		strShow += "\t" + obj.tInitTime;
		strShow += "\t" + obj.tMakeTime;
		strShow += "\t" + obj.tt1;
		strShow += "\t" + obj.tt2;
		strShow += "\t" + obj.tt3;
		strShow += "\t" + obj.tt4;
		strShow += "\t" + obj.tt5;
		strShow += "\t" + obj.tResizeTime + "\t\t" + objNames[i]+ "\n";
		
		vNewTime += obj.tNewTime;
		vInitTime += obj.tInitTime;
		vInitTime1 += obj.tt1;
		vInitTime2 += obj.tt2;
		vInitTime3 += obj.tt3;
		vInitTime4 += obj.tt4;
		vInitTime5 += obj.tt5;
		vMakeTime += obj.tMakeTime;
		vResizeTime += obj.tResizeTime;	
	}
	strShow += "TotalTime:\t\t\t" + vNewTime;
	strShow += "\t" + vMakeTime;
	strShow += "\t" + vInitTime;
	strShow += "\t" + vInitTime1;
	strShow += "\t" + vInitTime2;
	strShow += "\t" + vInitTime3;
	strShow += "\t" + vInitTime4;
	strShow += "\t" + vInitTime5;
	strShow += "\t" + vResizeTime + "\t\t" + this.totalTime;
	strShow += "\n--------------------------------------------------\n";
	
  var path= "C:\\UFGOV\\temp"
	PF.createPath(path, "\\");
	PF.writeFile(path + "\\temp.txt", strShow, 8);
}

function Page4_setWfConfig(wfConfig) {
	this.wfConfig = wfConfig;
}

function Page4_publishToReport(sqlid, condition) {
	var URL = "jsp/platform/publishDialog.jsp";
	var vsNames = new Array();
	var vsValues = new Array();
	var paramArray = new Array();
	var result = showModalDialog(URL, paramArray,"dialogWidth:300px;dialogHeight:200px;resizable:no;scroll:no;");
	if (result == "false") return;
	vsNames[vsNames.length] = "compoName";
	vsValues[vsValues.length] = DataTools.getCompoName();
	vsNames[vsNames.length] = "reportType";
	vsValues[vsValues.length] = paramArray[0];//"excel";
	vsNames[vsNames.length] = "portletId";
	vsValues[vsValues.length] = paramArray[1];//"login";
	vsNames[vsNames.length] = "ruleID";
	vsValues[vsValues.length] = sqlid;
	vsNames[vsNames.length] = "condition";
	vsValues[vsValues.length] = condition;
	var retXml = Info.requestData("exportToReport", "all", vsNames, vsValues);	
	if (retXml) {
		var flag = retXml.getAttribute("success");
		if (flag == "true") {
			return "success";
		} else {
			return retXml.text;
		}
	}
}


//密码检查
function Page4_openPwdCheckDialog(userId){
	var win_edit = window.showModalDialog("dispatcher.action?function=checkPwd&userId=" + userId,window,
  	                                "dialogHeight:250px;dialogWidth:450px;" +
    	                              "resizable:no;help:no;status:no");
	if(!win_edit){
		return false;
	}
	return win_edit;    	                              
}
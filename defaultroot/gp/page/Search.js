/*
Title: gp.page.Search
Description:
Search 对象类;
Company: 用友政务
Author: leidh;
*/

//----------------------------------------------------------------------
function Search(){
  //1.超类 =function();
  Base.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.Search"; 
  
  this.MATCH_TEXT_DEFAULT= "请输入要搜索的关键字";

  //3.变量声明区 =function();
  this.sName= "";
  this.oOuterObj= null;

  this.oOuterPanel= null;     //private;
  this.oMatchInput= null;     //private;
  this.oSearchButton= null;   //private;
  this.oAdvanceButton= null;  //private;
  this.oGroupButton= null;    //private;

  this.oMatchInputTD= null;     //private;
  this.oSearchButtonTD= null;   //private;
  this.oAdvanceButtonTD= null;  //private;
  this.oGroupButtonTD= null;    //private;

  this.oEditBoxMap= new Map();       //private;
  this.oEditBoxMapWithTableField= new Map();//priate;按表名和字段名注册.
  //this.oFieldValueREMap= new Map();  //private;

  //此变量专供 search 使用;表示本字段的数据搜索模型;
  //如: GL_VOU_HEAD.VOU_DATE>='{/from_VOU_DATE.value/}' and GL_VOU_HEAD.VOU_DATE<='{/to_VOU_DATE.value/}';
  //其中的 {/from_VOU_DATE.value/} 和 {/to_VOU_DATE.value/} 将会被输入框中的值所替代.
  //调用方法: getPattern() 来获取此值;
  this.sExecCond= "";
  this.sOldPattern= "";    //private; 与高级搜索条件切换时使用;
  this.bSetOldPattern= false; //private; 是否设置了变量sOldPattern的值；否则连续两次点高级搜索，再点搜索时条件不正确；chupp;
  this.sAdvCond= "";       //private; 高级搜索条件;
  this.sAdvOrderBy= "";

  this.tHasInit= false;
	
	this.searchType = "simpleSearch";
	
  //4.事件声明区 =function();
  this.OnInit= "OnInit";                    //参数: oSender;
  this.OnBeforeSearch= "OnBeforeSearch";    //oSender;
  this.OnAfterSearch= "OnAfterSearch";      //oSender;
	this.OnBoxChange= "OnBoxChange";          //参数: oSender, oBox, sValue, sOldValue;

  //5.方法声明区 =function();
  //public;
  this.addEditBox= Search_addEditBox;
  this.clear= Search_clear;
  this.getAllEditBox= Search_getAllEditBox;
  this.getCondition= Search_getCondition;
  this.getAdvOrderBy= Search_getAdvOrderBy;
  this.getEditBox= Search_getEditBox;
  this.init= Search_init;
  this.make= Search_make;
  this.search= Search_search;
  this.getGroupId= Search_getGroupId;
  this.isSearchBtnVisible= Search_isSearchBtnVisible;
  this.isAdvanceBtnVisible= Search_isAdvanceBtnVisible;
  this.isGroupBtnVisible= Search_isGroupBtnVisible;
  this.setSearchBtnVisible= Search_setSearchBtnVisible;
  this.setAdvanceBtnVisible= Search_setAdvanceBtnVisible;
  this.setGroupBtnVisible= Search_setGroupBtnVisible;
  //以上已完成文档;

  this.getTableName= Search_getTableName;
  this.setTableName= Search_setTableName;
  this.isValidFieldName= Search_isValidFieldName;
  this.getValue= Search_getValue;
  this.setValue= Search_setValue;
  this.searchK= Search_searchK;
  this.searchSQL= Search_searchSQL;
  this.searchList= Search_searchList;
  this.getMatchCondition= Search_getMatchCondition;
  this.getBoxCondition= Search_getBoxCondition;
  this.setMatchInputVisible= Search_setMatchInputVisible;
  this.isMatchInputVisible= Search_isMatchInputVisible;
  this.getFunction= Search_getFunction;
  this.setFunction= Search_setFunction;
  this.getPattern= Search_getPattern;
  this.setPattern= Search_setPattern;
  this.getTabIndex= Search_getTabIndex;
  this.setTabIndex= Search_setTabIndex;
  this.setGroupId= Search_setGroupId;
  this.getEditBoxK= Search_getEditBoxK;
  this.getCurRowIndex= Search_getCurRowIndex;
  this.getKiloFields= Search_getKiloFields;
  this.setKiloFields= Search_setKiloFields;
  this.searchEdit= Search_searchEdit;
  this.fillData= Search_fillData;
  this.getExecCond= Search_getExecCond;
  this.setExecCond= Search_setExecCond;

  this.setReadOnly= Search_setReadOnly;
  this.isReadOnly= Search_isReadOnly;
  this.setFieldReadOnly= Search_setFieldReadOnly;
  this.isFieldReadOnly= Search_isFieldReadOnly;
  this.setFieldVisible= Search_setFieldVisible;
  this.isFieldVisible= Search_isFieldVisible;
  this.setVisible= Search_setVisible;
  this.isVisible= Search_isVisible;

  //private;
  this.getKey= Search_getKey;
  this.getIdsFromPattern= Search_getIdsFromPattern;
  this.makeCaptionId= Search_makeCaptionId;
  this.makeBoxTDId= Search_makeBoxTDId;
  this.getListTypeFromPattern= Search_getListTypeFromPattern;
  
  this.release = Search_release;
  this.conditionEditor = default_editor;
  this.setConditionEditor = Search_setConditionEditor;
  this.tHasInit = true;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 生成 Grid 的 HTML DOM 对象；
//return:成功: true, 失败: false;
function Search_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;

  this.oMatchInputTD= this.oOuterPanel.all("MatchValueInputTD");
  this.oSearchButtonTD= this.oOuterPanel.all("SearchButtonTD");
  this.oAdvanceButtonTD= this.oOuterPanel.all("AdvanceButtonTD");
  this.oGroupButtonTD= this.oOuterPanel.all("GroupButtonTD");

  this.oMatchInput= this.oOuterPanel.all("MatchValueInput");
  this.oSearchButton= this.oOuterPanel.all("SearchButton");
  this.oAdvanceButton= this.oOuterPanel.all("AdvanceButton");
  this.oGroupButton= this.oOuterPanel.all("GroupButton");

  this.oOuterPanel.oOwner= this;
  this.oMatchInput.oOwner= this;
  this.oSearchButton.oOwner= this;
  this.oAdvanceButton.oOwner= this;
  this.oGroupButton.oOwner= this;

  this.oMatchInput.onfocus= Search_eventAnswer_MatchInput_onfocus;
  this.oMatchInput.onblur= Search_eventAnswer_MatchInput_onblur;
  this.oMatchInput.onkeypress= Search_eventAnswer_MatchInput_onkeypress;
  
  this.oSearchButton.onclick= Search_eventAnswer_SearchButton_onclick;
  this.oAdvanceButton.onclick= Search_eventAnswer_AdvanceButton_onclick;
  this.oGroupButton.onclick= Search_eventAnswer_GroupButton_onclick;
}
//----------------------------------------------------------------------
function Search_eventAnswer_MatchInput_onkeypress(){
	if (event.keyCode== 13){
		this.oOwner.search();
	}	
}	
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function Search_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (this.getTableName()== null || this.getTableName().length== 0) Info.throws("表名不能为空.", this.CLASSNAME, "init");
  if (Base_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//private;
//return: key string/ "";
function Search_getKey(sTable, sField){
  return sTable+ "_"+ sField;
}
//----------------------------------------------------------------------
//public; 加入 EditBox.
//返回值:成功: true, 失败: false;
function Search_addEditBox(oEditBox){
  if (PageX.isEditBox(oEditBox)== false) return false;
  this.oEditBoxMap.put(oEditBox.id, oEditBox);
  this.oEditBoxMapWithTableField.put(this.getKey(oEditBox.getTableName(), oEditBox.getFieldName()), oEditBox);
  oEditBox.oOuterObj= this;
  oEditBox.addListener(new Listener(oEditBox.OnChange, Search_oEditBox_OnChange, this));
  return true;
}
//----------------------------------------------------------------------
//public; 获取 EditBox.
//返回值: 成功: EditBox, 失败: null;
function Search_getEditBox(sField){
  return this.getEditBoxK(this.getTableName(), sField);
}
//----------------------------------------------------------------------
//public; 获取 EditBox.
//返回值: 成功: EditBox, 失败: null;
function Search_getEditBoxK(sTable, sField){
  var voEditBox= this.oEditBoxMapWithTableField.get(this.getKey(sTable, sField));
  return voEditBox;
}
//----------------------------------------------------------------------
//public; 获取所有的 EditBox.
//返回值: 成功: EditBox 数组, 失败: null;
function Search_getAllEditBox(){
  var vaoEditBox= this.oEditBoxMap.getAllItem()
  return vaoEditBox;
}
//----------------------------------------------------------------------
//public; 清除当前的所有数据；清理数据并不向数据库进行保存.
//返回值:成功: true, 失败: false;
function Search_clear(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "clear");

  var vaoEditBox= this.oEditBoxMap.getAllItem();
  var voBox= null;
  var vsFieldName= "";
  for (var i= 0, len= vaoEditBox.length; i< len; i++){
    voBox= vaoEditBox[i];
    voBox.setValue(voBox.getDefExpr());
  }
  return true;
}
//----------------------------------------------------------------------
//public; 获取查询用的 condition;
//返回值:成功: condition text, 失败: null;
function Search_getCondition(){
  var vsBoxCond= this.getBoxCondition();
  var vsMatchCond= this.getMatchCondition();
  if (PF.isEmpty(vsBoxCond)) return vsMatchCond;
  if (PF.isEmpty(vsMatchCond)) return vsBoxCond;
  return vsBoxCond + ";" + vsMatchCond;
}
//----------------------------------------------------------------------
//private; 获取 pattern 中所涉及到的所有的 box id;
//返回值: id array/null;
function Search_getIdsFromPattern(){
  if (PF.isEmpty(this.getPattern())) return null;
  var vasId= this.getPattern().match(/{\/\w*\.value\/}/gi);
  if (vasId== null) return null;
  for (var i= 0; i< vasId.length; i++){
    vasId[i]= vasId[i].replace(/{\//gi, "");
    vasId[i]= vasId[i].replace(/\.value\/}/gi, "");
  }
  return vasId;
}
//----------------------------------------------------------------------
//public; 获取查询用的 condition;
//返回值:成功: condition text, 失败: null;
function Search_getBoxCondition(){
	//debugger;
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getBoxCondition");
	var editBoxs = this.getAllEditBox();
  var vsCond = "";
  var compoName = DataTools.getCompoName();
  var userId = DataTools.getSV("svUserID");
  vsCond += "componame=" + compoName + ";";
  vsCond += "userid=" + userId + ";";
  for (var i= 0; i< editBoxs.length; i++){
    var box = editBoxs[i];
    var value = PF.trim(box.getValue());
    //if (value.length > 0) {
	    if (box.isexact) {
	    	vsCond += this.conditionEditor(box.id,value) + ";";
	  	} else {
	  		var temp = "%" + value + "%";
	  		vsCond += this.conditionEditor(box.id,temp) + ";";
	  	}
  	//}
  }
  return vsCond.substr(0,vsCond.length - 1);
}
//----------------------------------------------------------------------
//public; 获取查询用的 condition;
//返回值:成功: condition text, 失败: null;
function Search_getMatchCondition(){
  if (this.oMatchInput.value== this.MATCH_TEXT_DEFAULT) return null;
  if (PF.isEmpty(this.oMatchInput.value)) return null;
	var param = this.oMatchInput.value;
	return "matchCond=" + "%" + param + "%";
}
//----------------------------------------------------------------------
//public; 查询;
//返回值: 成功: true, 失败: false;
function Search_search(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "search");
  //高级搜索后,换页进,数据显示为全部数据,而非高级搜索条件的数据,所以做此改动;leidh;20050823;
  if (PF.isEmpty(this.sOldPattern)== false){
    this.setPattern(this.sOldPattern);
    this.sOldPattern= "";
    this.bSetOldPattern= false; //chupp; 20061019;
  }
  this.searchType = "simpleSearch";
  var vsCondition= this.getCondition();
  return this.searchK(vsCondition);
}
//----------------------------------------------------------------------
//public; 查询;
//返回值: 成功: true, 失败: false;
function Search_searchK(sCond){
	//debugger;
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "search");
  this.sExecCond= sCond;
  
  //向外发送事件; OnBeforeSearch
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeSearch)){
    this.eventAnswer_OnBeforeSearch(this);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeSearch, new Array(this));
  if (this.isAbortEvent()) return false;
  
	PageX.getDataManager().isCloseMonitor = true;
  DataTools.clearTableData(this.getTableName());
	PageX.getDataManager().isCloseMonitor = false;
  var voRM= PageX.getRowManager();
  if (voRM!= null) voRM.clear(this.getTableName());
//  PageX.loadTableData(this.getTableName());
  if (voRM!= null) voRM.clear(this.getTableName());

  var vsResponseText= "";
  if (this.getFunction()== "getlistpagedata"){
    vsResponseText= this.searchList(this.sExecCond);
  }else if (this.getFunction()== "geteditpagedata"){
    vsResponseText= this.searchEdit(this.sExecCond);
  }else if (this.getFunction()== "getdatabysql"){
    vsResponseText= this.searchSQL(this.sExecCond);
  }else{
    alert("非法的 function 参数: "+ this.getFunction());
    return false;
  }

  if (!this.fillData(vsResponseText)) return false;
  
  //chupp; 20061016 重新搜索后的数据没有排序；
  var voGrid= PageX.getAreaGrid(this.getTableName());
  voGrid.sort(voGrid.getSortField(), voGrid.getIsSortAscend());
  
  //向外发送事件; OnAfterSearch
  if (PF.isExistMethodK(this.eventAnswer_OnAfterSearch)){
    this.eventAnswer_OnAfterSearch(this);
  }
  this.fireEvent(this.OnAfterSearch, new Array(this));
  return true;
}
//----------------------------------------------------------------------
//private; 查询;
//返回值: 成功: true, 失败: false;
function Search_fillData(sData){
  if (sData.indexOf("<data>")< 0) return false;
  var voRetDoc= PF.parseXml(sData);
  var voRetData= voRetDoc.selectSingleNode("data");
  var voRetTotal= voRetDoc.selectSingleNode("total");
  var voRetDigest= voRetDoc.selectSingleNode("digest");

  for (var i= 0; i< voRetTotal.childNodes.length; i++){
    var voTable= voRetTotal.childNodes[i];
   	DataTools.loadTotalDataXml(voTable.getAttribute("name"), voTable.xml);
  }

  for (var i= 0; i< voRetData.childNodes.length; i++){
    var voTable= voRetData.childNodes[i];
    if (voTable.firstChild.getAttribute("rowcountofdb") == "0"){
    	continue;
    }
    DataTools.loadTableDataXml(voTable.nodeName, voTable.xml);
    if (voRetData.selectSingleNode("//rowset/row")== null){
      PageX.loadTableData(voTable.nodeName);
    }
    var voDataXML= DataTools.getDataXML(voTable.nodeName);
    if (voDataXML!= null){
      var viValid= DataTools.isValidXMLData(voDataXML);
      if (viValid== DataTools.DATA_EMPTY) {
        alert("表数据为空!\ntable: "+ voTable.nodeName);
        return false;
      }else if (viValid== DataTools.DATA_EXCEPTION) {
        alert("表数据错误!\ntable: "+ voTable.nodeName+ "\n"+ voDataXML.xml);
        return false;
      }
    }
  }
  for (var i= 0; i< voRetDigest.childNodes.length; i++){
    var voTable= voRetDigest.childNodes[i];
    DataTools.setDigest(voTable.nodeName, voTable.text);
  }
  return true;
}
//----------------------------------------------------------------------
//private; 查询;
//返回值: 成功: true, 失败: false;
function Search_searchList(sCondition){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "search");

  var vsCompoName= DataTools.getCompoNameByTable(this.getTableName());
  var vsCondition= sCondition;
  var viPageSize= Const.DEFAULT_PAGE_SIZE;
  var voGrid= PageX.getAreaGrid(this.getTableName());
  if (voGrid!= null){
    var voPagi= voGrid.getPaginationConsole();
    if (voPagi!= null) viPageSize= voPagi.getPageSize();
  }
  var viCurrentPage= 1;
  var vsDirection= "first";
  
  var vsTotalFields= "";
  var voTableTotal= DataTools.getTableTotal(this.getTableName());
  if (voTableTotal!= null){
    vsTotalFields= voTableTotal.getAttribute("totalfields");
  }
  var voTableData = DataTools.getTableData(this.getTableName());
  var condition = voTableData.selectSingleNode("/*/meta").getAttribute("condition");
  var sqlid = voTableData.selectSingleNode("/*/meta").getAttribute("sqlid");
  var sqlCountid = voTableData.selectSingleNode("/*/meta").getAttribute("sqlCountid");
  var sqlSumid = voTableData.selectSingleNode("/*/meta").getAttribute("sqlSumid");
  var userNumLimCondition = voTableData.selectSingleNode("/*/meta").getAttribute("userNumLimCondition");
  
  var vasParamName= new Array("condition", "searchCond","pagesize", "currentpage", "direction", "sqlid", "sqlSumid","sqlCountid","totalcount", "totalfields", "type","tablename", "userNumLimCondition");
  var vasParamValue= new Array(condition, sCondition, viPageSize, 1, vsDirection, sqlid, sqlSumid, sqlCountid, -1, vsTotalFields, this.searchType,this.getTableName(), userNumLimCondition);
  return Info.requestDataK("getlistpagedata", vsCompoName, vasParamName, vasParamValue);
}
//----------------------------------------------------------------------
//private; 查询;
//返回值: 成功: true, 失败: false;
function Search_searchEdit(sCondition){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "search");
  if (sCondition== null) sCondition= "1=1";

  var vsCompoName= DataTools.getCompoNameByTable(this.getTableName());
  
  var vasParamName= new Array("entityName", "condition");
  var vasParamValue= new Array(vsCompoName, sCondition);
  return Info.requestDataK("geteditpagedata5", vsCompoName, vasParamName, vasParamValue);
}
//----------------------------------------------------------------------
//private; 查询;
//返回值: 成功: true, 失败: false;
function Search_searchSQL(sSQL){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "search");

  var vsCompoName= DataTools.getCompoNameByTable(this.getTableName());
  var voCompoAddMeta= DataTools.getCompoAdditionalMeta(vsCompoName);
  var vsIsEdit= (voCompoAddMeta.getAttribute("pagetype")== "edit")? "true": "false";
  var vasParamName= new Array("sql", "kilofields", "componame", "table", "isedit");
  var vasParamValue= new Array(sSQL, this.getKiloFields(), vsCompoName, this.getTableName(), vsIsEdit);
  
  return Info.requestDataK(this.getFunction(), vsCompoName, vasParamName, vasParamValue);
}
//----------------------------------------------------------------------
//public; 获取值.
//返回值: tabindex/ -1;
function Search_getTabIndex(){
  return this.oOuterPanel.tabindex;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function Search_setTabIndex(iTabIndex){
  this.oOuterPanel.tabindex= iTabIndex;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: table name/ "";
function Search_getPattern(){
  return this.oOuterPanel.pattern;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function Search_setPattern(sPattern){
  this.oOuterPanel.pattern= sPattern;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: table name/ "";
function Search_getFunction(){
  return this.oOuterPanel.function4;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function Search_setFunction(sFunction){
  this.oOuterPanel.function4= sFunction;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: table name/ "";
function Search_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function Search_setTableName(sTable){
  this.oOuterPanel.tablename= sTable;
}
//----------------------------------------------------------------------
//public;
function Search_getGroupId(){
  return this.oOuterPanel.groupid;
}
//----------------------------------------------------------------------
//public;
function Search_setGroupId(sGroupId){
  this.oOuterPanel.groupid= sGroupId;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_setMatchInputVisible(tIsVisible){
  if (this.oMatchInputTD== null) return;
  this.oMatchInputTD.style.display= (tIsVisible)? "": "none";
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_setSearchBtnVisible(tIsVisible){
  if (this.oSearchButtonTD== null) return;
  this.oSearchButtonTD.style.display= (tIsVisible)? "": "none";
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_setAdvanceBtnVisible(tIsVisible){
  if (this.oAdvanceButtonTD== null) return;
  this.oAdvanceButtonTD.style.display= (tIsVisible)? "": "none";
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_setGroupBtnVisible(tIsVisible){
  if (this.oGroupButtonTD== null) return;
  this.oGroupButtonTD.style.display= (tIsVisible)? "": "none";
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_isMatchInputVisible(){
  return (this.oMatchInputTD.style.display== "none")? false: true;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_isSearchBtnVisible(){
  return (this.oSearchButtonTD.style.display== "none")? false: true;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_isAdvanceBtnVisible(){
  return (this.oAdvanceButtonTD.style.display== "none")? false: true;
}
//----------------------------------------------------------------------
//public;
//return: void;
function Search_isGroupBtnVisible(){
  return (this.oGroupButtonTD.style.display== "none")? false: true;
}
//----------------------------------------------------------------------
//public; 判断指定的字段名是否有效.
//返回值:有效: true, 否则: false;
function Search_isValidFieldName(sTable, sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isValidFieldName");
  if (sTable== null) sTable= this.getTableName();
  var voEditBox= this.getEditBoxK(sTable, sFieldName);
  if (voEditBox== null) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 获取当前行中指定字段的值.
//返回值:成功: 单元格的值, 失败: null;
function Search_getValue(sTable, sFieldName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "getValue");
  if (sTable== null) sTable= this.getTableName();
  var voBox= this.oEditBoxMapWithTableField.get(this.getKey(sTable, sFieldName));
  if (voBox== null) return null;
  var vsValue= voBox.getValue();
  return vsValue;
}
//----------------------------------------------------------------------
//public; 更改指定字段的值.
//返回值: void;
function Search_setValue(sTable, sFieldName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValueByRowField");
  if (sTable== null) sTable= this.getTableName();
  var voBox= this.oEditBoxMapWithTableField.get(this.getKey(sTable, sFieldName));
  if (voBox== null) return;
  voBox.setValue(sValue);
  return;
}
//----------------------------------------------------------------------
//public;
//return:-1;
function Search_getCurRowIndex(){
  return -1;
}
//----------------------------------------------------------------------
//public; 获取值;
//返回值: table name/ "";
function Search_getKiloFields(){
  return this.oOuterPanel.kilofields;
}
//----------------------------------------------------------------------
//public; 设置值;
//return: void;
function Search_setKiloFields(value){
  this.oOuterPanel.kilofields= value;
}
//----------------------------------------------------------------------
function Search_setExecCond(value){
  this.sExecCond= value;
}
//----------------------------------------------------------------------
function Search_getExecCond(){
  if (PF.isEmpty(this.sExecCond)) return this.getCondition();
  return this.sExecCond;
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: void;
function Search_setReadOnly(tIsReadOnly){
  var vaoBox= this.getAllEditBox();
  for (var i= 0, len= vaoBox.length; i< len; i++){
    if (vaoBox[i]== null) continue;
    vaoBox[i].setReadOnly(tIsReadOnly);
  }
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: true/false;
function Search_isReadOnly(){
  var vaoBox= this.getAllEditBox();
  for (var i= 0, len= vaoBox.length; i< len; i++){
    if (vaoBox[i]== null) continue;
    if (vaoBox[i].isReadOnly()== false) return false;
  }
  return true;
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: void;
function Search_setFieldReadOnly(sTable, sFieldName, tIsReadOnly){
  var voBox= this.getEditBoxK(sTable, sFieldName);
  if (voBox!= null){
    voBox.setReadOnly(tIsReadOnly);
  }
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: true/false;
function Search_isFieldReadOnly(sTable, sFieldName){
  var voBox= this.getEditBoxK(sTable, sFieldName);
  if (voBox== null) return false;
  voBox.isReadOnly();
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: void;
function Search_setFieldVisible(sTable, sFieldName, tIsVisible){
  var vsCapId= this.makeCaptionId(sTable, sFieldName);
  var vsBoxTDId= this.makeBoxTDId(sTable, sFieldName);
  if (vsCapId== null || vsCapId== "") return;
  if (vsBoxTDId== null || vsBoxTDId== "") return;
  var voCap= document.all(vsCapId);
  var voBoxTD= document.all(vsBoxTDId);
  var voBox= this.getEditBoxK(sTable, sFieldName);
  if (voCap!= null){
    voCap.style.display= (tIsVisible)? "": "none";
  }
  if (voBoxTD!= null){
    voBoxTD.style.display= (tIsVisible)? "": "none";
  }
  if (voBox!= null){
    voBox.setVisible(tIsVisible);
  }
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//return: true/false;
function Search_isFieldVisible(sTable, sFieldName){
  var voBox= this.getEditBoxK(sTable, sFieldName);
  if (voBox== null) return false;
  return voBox.isVisible();
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: void;
function Search_setVisible(tIsVisible){
  var vaoBox= this.getAllEditBox();
  for (var i= 0, len= vaoBox.length; i< len; i++){
    if (vaoBox[i]== null) continue;
    this.setFieldVisible(vaoBox[i].getTableName(), vaoBox[i].getFieldName(), tIsVisible);
  }
}
//----------------------------------------------------------------------
//public; 设置指定字段是否可见.
//返回值: true/false;
function Search_isVisible(){
  var vasField= this.getFieldNames();
  for (var i= 0, len= vasField.length; i< len; i++){
    if (this.isFieldVisible(vasField[i])) return true;
  }
  return false;
}
//----------------------------------------------------------------------
//private;
//return: id string;
function Search_makeCaptionId(sTable, sField){
  var voBox= this.getEditBoxK(sTable, sField);
  if (voBox== null) return null;
  return "label_"+ voBox.getOuterPanel().id;
}
//----------------------------------------------------------------------
//private;
//return: id string;
function Search_makeBoxTDId(sTable, sField){
  var voBox= this.getEditBoxK(sTable, sField);
  if (voBox== null) return null;
  return "editbox_"+ voBox.getOuterPanel().id;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//public; 处理 SearchButton 发出的 onclick 事件.
//返回值: void;
function Search_eventAnswer_SearchButton_onclick(){
  var voSearch= this.oOwner;
  voSearch.search();
  
  var viResult= DataTools.getTableRowCount(this.oOwner.getTableName());
  if (viResult== 0){
  	alert("没有满足条件的数据！");
  }	  
	return;
}
//----------------------------------------------------------------------
//public; 处理 AdvanceButton 发出的 onclick 事件.
//返回值: void;
function Search_eventAnswer_AdvanceButton_onclick(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "search");
  var voSearch= this.oOwner;
  var voCompoMeta= DataTools.getCompoMeta();
  var vsCompoName= voCompoMeta.getAttribute("name");
  var voSrch = new SearchPage();
  //高级搜索后,换页进,数据显示为全部数据,而非高级搜索条件的数据,所以做此改动;leidh;20050823;
  voSearch.sAdvCond= voSrch.searchData(vsCompoName);
  voSearch.sAdvOrderBy= voSrch.getSearchOrderBy();
  if (PF.isEmpty(voSearch.sAdvCond)) return;
  if (voSearch.sAdvCond== "ALL") voSearch.sAdvCond= "";
  if (voSearch.bSetOldPattern== false){ //chupp;20061019
    voSearch.sOldPattern= voSearch.getPattern();
    voSearch.bSetOldPattern= true;
  }
  var vsListType= voSearch.getListTypeFromPattern();
  //chupp;
  if (PF.isEmpty(vsListType)){
    if(!PF.isEmpty(voSearch.sAdvOrderBy)){
    	voSearch.setPattern(voSearch.sAdvCond + " Order by " + voSearch.sAdvOrderBy);
    }else{
    	voSearch.setPattern(voSearch.sAdvCond);
    }
  }  
  else {
  	if(!PF.isEmpty(voSearch.sAdvOrderBy)){
    	voSearch.setPattern(voSearch.sAdvCond + " listtype="+ vsListType + " Order by " + voSearch.sAdvOrderBy);
    }else{
    	voSearch.setPattern(voSearch.sAdvCond + " listtype="+ vsListType);
    }
  }	
  voSearch.searchType = "advancedSearch";
  //添加条件
  vsCond = voSearch.getCondition(); 
  //debugger;
  voSearch.searchK(voSearch.getPattern()+ "/" + vsCond);
  var viResult= DataTools.getTableRowCount(this.oOwner.getTableName());
  if (viResult== 0){
  	alert("没有满足条件的数据！");
  }	 
  return;
}
//----------------------------------------------------------------------
//private; 从pattern中得到listtype的值 chupp; 20061019
function Search_getListTypeFromPattern(){
	if (PF.isEmpty(this.sOldPattern)) return null;
	if (this.sOldPattern.indexOf("listtype=")< 0) return null;
	var viPos= this.sOldPattern.indexOf("listtype");
	var vsSubStr= this.sOldPattern.substring(viPos);
	var viStartPos= vsSubStr.indexOf("/");
	var viEndPos= vsSubStr.indexOf(".");
	if (viStartPos< 0 || viEndPos< 0) return null;
	var vsListTypeId= vsSubStr.substring(viStartPos+1, viEndPos);
	var voEditBox= PageX.getCtrlObj(vsListTypeId);
	if (PF.isEmpty(voEditBox)) return null;
	return voEditBox.getValue(); 
}	
//----------------------------------------------------------------------
//public; 处理 GroupButton 发出的 onclick 事件.
//返回值: void;
function Search_eventAnswer_GroupButton_onclick(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "search");
  var voCompoMeta= DataTools.getCompoMeta();
  var vsCompoName= voCompoMeta.getAttribute("name");
  var vsTablename = DataTools.getMainTableName();
  var voTableMeta= DataTools.getTableMeta(vsTablename);
  var vaokiloKeyField= voTableMeta.selectNodes("fields/field[@iskilo='true']");
  var voSrch = new SearchPage();
  voSrch.statSearch(vsCompoName,vsTablename,vaokiloKeyField);
	return;
}
//----------------------------------------------------------------------
function Search_eventAnswer_MatchInput_onfocus(){
  if (this.value== this.oOwner.MATCH_TEXT_DEFAULT){
    this.value= "";
  }
}
//----------------------------------------------------------------------
function Search_eventAnswer_MatchInput_onblur(){
  if (PF.isEmpty(this.value)){
    this.value= this.oOwner.MATCH_TEXT_DEFAULT;
  }
}
//----------------------------------------------------------------------
//public; 处理EditBox 发出的OnChange事件.
//参数:字符串类型.
//返回值:void;
function Search_oEditBox_OnChange(oSender, sValue, sOldValue){
  //向外发送事件; OnBoxChange
  if (PF.isExistMethodK(this.eventAnswer_OnBoxChange)){
  	this.eventAnswer_OnBoxChange(this, oSender, sValue, sOldValue);
  }
  this.fireEvent(this.OnBoxChange, new Array(this, oSender, sValue, sOldValue));
}
//----------------------------------------------------------------------
//public; 返回高级搜索的排序字段;
function Search_getAdvOrderBy(){
	return this.sAdvOrderBy;
}	
//----------------------------------------------------------------------

function Search_release() {
	var matchInput = this.oMatchInput;
	if (matchInput != null) {
		matchInput.oOwner = null;
		matchInput.onfocus = null;
		matchInput.onblur = null;
		matchInput.onkeypress = null;
	}
	var searchButton = this.oSearchButton;
	if (searchButton != null) {
		searchButton.oOwner = null;
		searchButton.onclick = null;
	}
	var advanceButton = this.oAdvanceButton;
	if (advanceButton != null) {
		advanceButton.oOwner = null;
		advanceButton.onclick = null;
	}
	var groupButton = this.oGroupButton;
	if (groupButton != null) {
		groupButton.oOwner = null;
		groupButton.onclick = null;
	}
	var editBoxMap = this.oEditBoxMap.getAllItem();
	if (editBoxMap != null) {
		for (var i = 0; i < editBoxMap.length; i++) {
			var voBox= editBoxMap[i];
			voBox.release();	
			editBoxMap[i] = null;		
		}
	}
	Base_release.call(this);
}

function default_editor(paramName, paramValue) {
	return paramName + "=" + paramValue;
}

function Search_setConditionEditor(edit) {
	this.conditionEditor = edit;
}
	
/**
 * 增加列表页面搜索方案
 */
function openMenu(event, id){
  var el, x, y;
  var maxLength;
  var menuWidth;
  var e=event.srcElement

  el = document.getElementById(id);
  if(el.style.display == "block"){
    el.style.display = "none";
  }else{
  	el.style.display = "block";
  }
  
  if(id == "searchMenu")
    maxLength = document.getElementById("searchMaxLen").value;
  if(id == "statMenu")
    maxLength = document.getElementById("statMaxLen").value;  
  if(maxLength < 4)
  	maxLength = 4;
  
  maxLength = maxLength * 16;

  if(id == "searchMenu"){
     isSearchVisible = true;
     searchFirstTime = true;
  }
  
  x = e.offsetWidth;
  y = e.offsetHeight;
  if(x + maxLength < 150){
  	x += 60;
  }
  el.style.width = maxLength + 45 + "px";
  el.style.left = x + "px";
  el.style.top  = y + "px";
  el.style.visibility = "visible";
}

function doHight(event){
  var el = event;
  el.style.color ="black";
  el.style.background ="#E5FAAC";

}

function clearHight(event,id){
  var el = document.getElementById(id);
  el.style.color ="black";
  el.style.background ="#D7E1F3";  //#E1E1E1
}

function directSearchF(highSearchSelect, compoId,searchId){
	openMenu(event, "searchMenu");
	var voSearch = PageX.getCtrlObj(searchId);
	voSearch.searchType = "advancedSearch";
	var cond = getScheSearchCondition(highSearchSelect, compoId) + "/" + voSearch.getCondition();
	//debugger;
	voSearch.searchK(cond);
}

function getScheSearchCondition(scheName, compoId){
	var names = new Array();
  var values = new Array();
  names[0] = "compoId";
  names[1] = "userId";
  names[2] = "schemaName";
  values[0] = compoId + "_search";
  values[1] = DataTools.getSV("svUserID");
  values[2] = scheName;
  var schema = Info.requestDataK("loadschema", "all", names, values);
  
  var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
  xmlDom.loadXML(schema);
  var root = xmlDom.getElementsByTagName("entity");
  if (!root) return;
 
  var sl = root.length;
  var userID = DataTools.getSV("svUserID");	
  var condition = "";
  var orderStr = "";
  var tableName = DataTools.getMainTableName();
	for(var i=0; i<sl; i++){
    var schemaLoca = root[i].getAttribute("name");
    var tmpS = root[i].childNodes;
    if(schemaLoca == "condition"){
    	var tCond = getSchemaCond(tableName, tmpS);
    	if(tCond != ""){
    		condition += tCond;
    	}
    }
    if(schemaLoca == "order"){
			var tOrder = getSchemaOrder(tmpS);
			if(tOrder != ""){
				if(orderStr != "")
					orderStr += ",";
				orderStr += tOrder;
			}
    }
  }
  //debugger;
  if(orderStr != "") condition += " order by " + orderStr;
  return condition;  
}

function getSchemaCond(tableName, tmpS){
	var condition = "";
  var l = tmpS.length;
  var fName;
  var fn;
  var fType = "";
  var str1 = "";
  var str2 = "";
  
  for(var i=0; i<l; i++){	
    fn = tmpS[i].getAttribute("name");
    fName = tmpS[i].getAttribute("value");
    if(fn == "C3"){
    	fType = DataTools.getTableFieldAttr(tableName, fName, "type");
      condition += " MASTER." + fName + " ";
    }else if(fn == "C4"){
    	if(fType == "TEXT"){
    		if(fName == "0"){
    			condition += " = ";
    			str1 = "'";
    			str2 = "'";
    		}else if(fName == "1"){
    			condition += " <> ";
    			str1 = "'";
    			str2 = "'";
    		}else if(fName == "2"){
    			condition += " like ";
    			str1 = "'%";
    			str2 = "%'";
    		}else if(fName == "3"){
    			condition += " not like ";
    			str1 = "'%";
    			str2 = "%'";
    		}else if(fName == "4"){
    			condition += " like ";
    			str2 = "%'";
    			str1 = "'"
    		}else if(fName == "5"){
    			condition += " like ";
    			str1 = "'%";
    			str2 = "'";
    		}else{
    			condition += " is null ";
    			str1 = "";
    			str2 = "";
    		}
    	}else{
    		if(fName == "0"){
    			condition += " = ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "1"){
    			condition += " <> ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "2"){
    			condition += " > ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "3"){
    			condition += " >= ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "4"){
    			condition += " < ";
    			str1 = "";
    			str2 = "";
    		}else if(fName == "5"){
    			condition += " <= ";
    			str1 = "";
    			str2 = "";
    		}else{
    			condition += " is null ";
    			str1 = "";
    			str2 = "";
    		}
    	}
    }
    else if(fn == "C5"){
			condition += " " + str1 + fName + str2 + " ";
    }else{
			condition += " " + fName + " ";
    }
  }
	return condition;
}

function getSchemaOrder(tmpS){
	var orderStr = "";
  var l = tmpS.length;
  var fName;
  
  for(var i=0; i<l; i++){
  	var fn = tmpS[i].getAttribute("name");
    fName = tmpS[i].getAttribute("value");
    if(fn == "01" && fName == "")
    	break;
		orderStr += " " + fName + " ";
  }
  return orderStr;
}
function searchF(){
	openMenu(event, "searchMenu");
	var advanceButton = document.getElementById("AdvanceButton");
	advanceButton.click();
}

//---- end 增加列表页面搜索方案

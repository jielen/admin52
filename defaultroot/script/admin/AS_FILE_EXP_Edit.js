/*为保证三层字表末级数据不丢失，故将Map对象作为缓存，其中TAB_ID字段值为key,与二级字表每一行相对应的末级字表的所有行
 *作为list对象，list对象中的每个元素又是一个Map对象，其中key为对应字段名，值为字段值。保存时，一二层字表以原方式保存
 *末级字表保存时先删除数据库中的原有数据，然后插入。
*/

var tab_options = null;
var field_options = null;
var voCompoId;
var voTabId;
var voFieldName;
var voIsMap;
var voGridMap = null;
var voPreRowIndex;
var voOldValueBuffer = null;
var voGrid2OldVal = null;
var isInsert = false;
var voExistFieldMap = null;

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
  voCompoId = voFree.getEditBox("COMPO_ID");
  voRuleId = voFree.getEditBox("RULE_ID");
  voGridMap = new Map();
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid1 = PageX.getCtrlObj("AS_FILE_EXP_TABLE_Grid");
	voGrid2 = PageX.getCtrlObj("AS_FILE_EXP_FIELD_Grid");
	voTabId = voGrid1.getEditBox("TAB_ID");
	voFieldName = voGrid2.getEditBox("FIELD_NAME");
	voIsMap = voGrid2.getEditBox("IS_MAP");
	
	voGrid1.addListener(new Listener(voGrid1.OnBeforeInsertRow, eventAnswer_Grid1_OnBeforeInsertRow, this));
	voGrid1.addListener(new Listener(voGrid1.OnAfterInsertRow, eventAnswer_Grid1_OnAfterInsertRow, this));
	voGrid1.addListener(new Listener(voGrid1.OnRowClick, eventAnswer_OnRowClick, this));
	voGrid1.addListener(new Listener(voGrid1.OnOutRow, eventAnswer_Grid1_OnOutRow, this));
	voGrid1.addListener(new Listener(voGrid1.OnBeforeDeleteRow, eventAnswer_Grid1_OnBeforeDeleteRow, this));
	voGrid1.addListener(new Listener(voGrid1.OnAfterDeleteRow, eventAnswer_Grid1_OnAfterDeleteRow, this));
	voGrid2.addListener(new Listener(voGrid2.OnAfterInsertRow, eventAnswer_Grid2_OnAfterInsertRow, this));
	voGrid2.addListener(new Listener(voGrid2.OnBeforeInsertRow, eventAnswer_Grid2_OnBeforeInsertRow, this));
	voIsMap.addListener(new Listener(voIsMap.OnChange, eventAnswer_IsMap_OnChange, this));
	voFieldName.addListener(new Listener(voFieldName.OnChange, eventAnswer_FieldName_OnChange, this));
	voCompoId.addListener(new Listener(voCompoId.OnChange, eventAnswer_Compo_OnChange, this));
	voTabId.addListener(new Listener(voTabId.OnChange, eventAnswer_OnChange, this));
	voToolbar.setCallDisabled("fsave", true);
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid1.setReadOnly(false);
		voGrid2.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fdelete", true);
	}
	else{
		voFree.setReadOnly(true);
		voGrid1.setReadOnly(true);
		voGrid2.setReadOnly(true);
	}
	after_Init();
}

/*当字段名发生改变时，检查是否有重复现象。
*/
function eventAnswer_FieldName_OnChange(){
	if(isInsert) return;
	if(isFieldExist(voGrid2.getValueByRowField(voGrid2.getCurRowIndex(),"FIELD_NAME"))){
			voGrid2.setValueByRowField(voGrid2.getCurRowIndex(),"FIELD_NAME","")
			alert("字段名已存在！");
			voGrid2.abortEvent(true);
			return;
	}
}

function eventAnswer_IsMap_OnChange(){
	if (voGrid2.getValueByRowField(voGrid2.getCurRowIndex(), "IS_MAP") == "Y"){
    setMap(voGrid2.getCurRowIndex(),false);
  }
  else{
    setMap(voGrid2.getCurRowIndex(),true);
  }
}

function eventAnswer_Grid1_OnBeforeDeleteRow(){
	if(voGrid1.isAllSelBoxChecked()){
		voGridMap.clear();
		return;
	}
	var rowCount = voGrid1.getRowCount();
	for(var i=0; i<rowCount; i++){
		if(voGrid1.isSelectedRow(i)){
			var voTab = voGrid1.getValueByRowField(i, "TAB_ID");
			if(voGridMap.get(voTab)!=null)
			{
				voGridMap.remove(voTab);
			}
		}
	}
}

function eventAnswer_Grid1_OnAfterDeleteRow(){
	voPreRowIndex = voGrid1.getCurRowIndex();
	getVS_field(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID"));
	setGridRowsValues();
}

function eventAnswer_Grid1_OnOutRow(){
	if(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID")==""||voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID").length==0){
		return;
	}else{
		getGridValue();
	}
}

function eventAnswer_Grid2_OnBeforeInsertRow(){
	isInsert = true;
	getAllExistField();
	if(voGrid1.getRowCount()==0){
		alert("请先输入表名！");
		isInsert = false;
		voGrid2.abortEvent(true);
		return;
	}
	if(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID")==""||voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID").length==0){
		alert("请先输入表名！");
		isInsert = false;
		voGrid2.abortEvent(true);
	}else{
		getVS_field(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID"));
		
		if(isFieldFull()){
			isInsert = false;
			voGrid2.abortEvent(true);
			return;
		}
	}
}

function eventAnswer_Grid2_OnAfterInsertRow(){
	if(!field_options) return;
	var curFieldList = voGridMap.get(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID"));
	var curListSize = 0;
	if(typeof(curFieldList)!='undefined' && curFieldList!=null){
		curListSize = curFieldList.length;
	}
	for(var i=0;i<field_options.length;i++){
		if(typeof(voExistFieldMap.get(field_options[i][0]))=='undefined'){
			voGrid2.setValueByRowField(voGrid2.getCurRowIndex(), "FIELD_NAME", field_options[i][0]);
			break;
		}
	}
	isInsert = false;
	setMap(voGrid2.getCurRowIndex(),true);
}

function getAllExistField(){
	voExistFieldMap = new Map();
	for(var i=0; i<voGrid2.getRowCount(); i++){
		voExistFieldMap.put(voGrid2.getValueByRowField(i, "FIELD_NAME"),true);
	}
}

function after_Init(){
  if (voFree.getValue("COMPO_ID") == null || voFree.getValue("COMPO_ID") == ""){
    return;
  }
  getVS_tab();
  var rowCount = voGrid1.getRowCount();
  if (rowCount>0 && (voGrid1.getValueByRowField(0, "TAB_ID") != "" || voGrid1.getValueByRowField(0, "TAB_ID") != null)){
    getVS_field(voGrid1.getValueByRowField(0, "TAB_ID"));
  }
  for (var i=0, l=rowCount; i<l; i++){
    setVS(i, "TAB_ID", tab_options, voGrid1);
  }
  rowCount = voGrid2.getRowCount();
  for (var i=0, l=rowCount; i<l; i++){
    setVS(i, "FIELD_NAME", field_options, voGrid2);
  }
  var voParaValues = DataTools.getTableNames();
  voGrid2OldVal = getGrid2OldValue(voParaValues[2]);
  voOldValueBuffer = new StringBuffer();
  voOldValueBuffer.append(getFreeOldValue(voParaValues[0]));
  voOldValueBuffer.append(getGrid1OldValue(voParaValues[1]));
  voOldValueBuffer.append(voGrid2OldVal);
  voGrid2.clear();
  setGridRowsValues();
  voPreRowIndex = voGrid1.getCurRowIndex();
}

/*设置末级字表对照部件及对照字段的只读属性
*/
function setMap(rowIndex,isMap){
  voGrid2.setCellReadOnly(rowIndex, 8, isMap);
  voGrid2.setCellReadOnly(rowIndex, 7, isMap);
}

/*根据所选部件，为表名下拉列表初始化
*/
function getVS_tab(){
	if (voFree.getValue("COMPO_ID") == null || voFree.getValue("COMPO_ID") == ""){
      alert("请先选择部件！");
  }
  tab_options = new Array();
  var names = new Array();
  var values = new Array();
  names[0] = "COMPO_ID";
  values[0] = voFree.getValue("COMPO_ID");
  var result = PageX.getRuleDeltaXML("admin-ruleData.AS_FILE_EXP_GETVSTab", names, values);
  if(result == null) return;
  if(result == null){
  	alert("部件代码不存在，请查证后再输入！");
  	voFree.setValue("COMPO_ID","");
  	return;
  	
  }
  var xmlDom = result.getElementsByTagName("entity");
  for(var j=0, l=xmlDom.length; j<l; j++){
    var result1 = xmlDom.item(j).childNodes;
    tab_options[j] = new Array(result1.item(0).getAttribute("value"), result1.item(1).getAttribute("value"));
  }
  if(tab_options.length == 0){
    alert("当前部件没有子表！");
    return;
  }
  voTabId.clear();
  voTabId.setOptions(tab_options);
}

/*根据所选表名，为字段名的下拉列表初始化
 *其中field_options为全局变量，是二维数组，分别保存下拉框的值和数据显示文本。
*/
function getVS_field(tabId){
  field_options = new Array();
  var names = new Array();
  var values = new Array();
  names[0] = "TAB_ID";
  values[0] = tabId;
  names[1] = "COMPO_ID";
  values[1] = voFree.getValue("COMPO_ID");
  var result = PageX.getRuleDeltaXML("admin-ruleData.AS_FILE_EXP_GETVSField", names, values);
  if(result == null) return;
  var xmlDom = result.getElementsByTagName("entity");
  field_options[0] = "";
  for(var j=0, l=xmlDom.length; j<l; j++){
    var result1 = xmlDom.item(j).childNodes;
    field_options[j] = new Array(result1.item(0).getAttribute("value"), result1.item(1).getAttribute("value"));
  }
  voFieldName.clear();
 	voFieldName.setOptions(field_options);
}

function setVS(rowIndex,field,opts,grid){
  opt1 = grid.getValueByRowField(rowIndex, field, false);
  for(var m=0, l=opts.length; m<l; m++){
    var code = opts[m][0];
    if (code == opt1){
      grid.setValueByRowField(rowIndex,field,code);
      break;
    }
  }
}

function eventAnswer_Grid1_OnBeforeInsertRow(){
  getVS_tab();
  if (!tab_options){
  	voGrid1.abortEvent(true);
    return;
  }else{
  	if(tab_options.length == 0){
  		voGrid1.abortEvent(true);
  		return;
  	}
  	if(isTabFull()){
  		voGrid1.abortEvent(true);
  		return;
  	}
  	getGridValue();
    return true;
  }
}

function eventAnswer_Grid1_OnAfterInsertRow(){
	if(!tab_options) return;
	voTabId.setOptions(tab_options);
	for(var i=0;i<tab_options.length;i++){
		if(!isTabExist(tab_options[i][0])){
			voGrid1.setValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID", tab_options[i][0]);
			break;
		}
	}
	
	voPreRowIndex = voGrid1.getCurRowIndex();
	voGrid2.clear();
}

function eventAnswer_Compo_OnChange(){
	voGridMap.clear();
	voGrid1.clear();
	voGrid2.clear();
	getVS_tab();
}

function after_fadd(){
  tab_options = null;
  field_options = null;
  voGridMap.clear();
}

function eventAnswer_OnChange(){
	if(!isTabExist(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(),"TAB_ID"))){
		getVS_field(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(),"TAB_ID"));
	}else{
		voGrid1.setValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID", "");
		alert("表名已存在，请检查！");
	}
}

function eventAnswer_OnRowClick(){
	if(voGrid1.getCurRowIndex()!= voPreRowIndex){
		setGridRowsValues();
	  getVS_field(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(),"TAB_ID"));
	  voPreRowIndex = voGrid1.getCurRowIndex();
	}
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
  	  voFree.setReadOnly(false);
			voGrid1.setReadOnly(false);
			voGrid2.setReadOnly(false);
			voToolbar.setCallDisabled("fedit", true);
		  voToolbar.setCallDisabled("fsave", false);
		  voToolbar.setCallDisabled("fdelete", true);
      PageX.newBill();
      after_fadd();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voCompoId.setReadOnly(true);
    	voGrid1.setReadOnly(false);
		  voGrid2.setReadOnly(false);
		  voToolbar.setCallDisabled("fedit", true);
		  voToolbar.setCallDisabled("fsave", false);
		  after_fedit();
      break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	if(!before_fsave()){
       	break;
    	}
       var vvRet= saveAllRows();
       if (vvRet[0]== true) {
         voFree.setReadOnly(true);
         voGrid1.setReadOnly(true);
				 voGrid2.setReadOnly(true);
				 voToolbar.setCallDisabled("fedit", false);
				 voToolbar.setCallDisabled("fdelete", false);
				 voToolbar.setCallDisabled("fsave", true);
				 after_fsave();
         alert("保存成功!");
       }
       else{
         alert("保存失败 ,失败的原因是: \n" + vvRet[1]);
       }
    
     break;      
  	//-----------------------删除-----------------------------
  	case "fdelete":
    	if (!confirm("确定删除？")) break;

      var vvRet = saveAllRows("delete");
      if (vvRet[0]== true) {
        PageX.newBill();
        voToolbar.setCallDisabled("fedit", true);
				voToolbar.setCallDisabled("fsave", false);
				voFree.setReadOnly(false);
        voGrid1.setReadOnly(false);
				voGrid2.setReadOnly(false);
        alert("删除成功");
      }
      else{
        alert("删除失败,失败的原因是: \n" + vvRet[1]);
      }
      break;
    	//-----------------------帮助-----------------------------
    	case "fhelp":
       PageX.showHelp();
       break;
    	//-----------------------缺省-----------------------------
  	default:
  }
  return;
}

function after_fedit(){
  var rowCount = voGrid2.getRowCount();
  for (var i=0, l=rowCount; i<l; i++){
    if (voGrid2.getValueByRowField(voGrid2.getCurRowIndex(), "IS_MAP") != "Y"){
      setMap(i, true);
    }
  }
}

/*此函数用于获取当前第三层字表的值存入voGridMap中
 *函数防止第二层字表的当前行失去焦点时三层字表的数据丢失
*/
function getGridValue(){
	var rowCount = voGrid2.getRowCount();
	var colCount = voGrid2.getColCount();
	var voRowList = new Array();
	
	for(var i=0; i<rowCount; i++){
		var voColMap = new Map();
		for(var j=0; j<colCount; j++){
			voColMap.put(voGrid2.getFieldNameByCol(j), voGrid2.getValueByRC(i, j));
		}
		voRowList[i] = voColMap;
	}
	if(voRowList.length > 0){
		voGridMap.put(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID"), voRowList);
	}else{
		voGridMap.put(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID"), "null");
	}
}

/*在二层子表焦点行切换时，清空三层子表与之不对应的数据，并插入与之对应的数据
*/
function setGridRowsValues(){
	voGrid2.clear();
	var voRowList = voGridMap.get(voGrid1.getValueByRowField(voGrid1.getCurRowIndex(), "TAB_ID"));
	if(voRowList=="null") return;
	var voStrDelta = listValueToDelta(voRowList);
	var res = voGrid2.insertDelta(voStrDelta, 0, true, true, true, "", false, true, false);
	if(res){
		after_fedit();
	}
}

/*
* 将与二层子表对应行的所有三层子表数据转化为delta类型
*/
function listValueToDelta(voParaList){
	var voColMap = null;
	var voValue = null;
	var voName = null;
	if(voParaList==null) return;
	var buffer = "<delta>";
	for(var i=0; i < voParaList.length; i++){
		buffer += "<entity name = \"\">";
		voColMap = voParaList[i];
		for(var j=1; j <= voColMap.size(); j++){
			voName = voGrid2.getFieldNameByCol(j);
			voValue = voColMap.get(voName);
			buffer += "<field name=\""+ voName +"\" value=\""+ voValue +"\"/>";
		}
		buffer += "</entity>";
	}
	buffer += "</delta>";
	return buffer;
}

function saveAllRows(sFunction, asName, asValue, isCheckEmpty, oResourceMap){
  var vavRet= new Array();
  vavRet[0]= false;
  vavRet[1]= "";

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

	var vsData = makeSaveData(sFunction);
	var voRM= PageX.getRowManager();
  var vsCompoName= DataTools.getCompoName();
  var vasParamName= asName.concat(new Array("data", "isdigest"));
  var vasParamValue= asValue.concat(new Array(vsData, ""+ PageX.tIsDigest));
  if (sFunction== "delete") sFunction= "save";
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
    for (var i= 0; i< voDigest.childNodes.length; i++){
      var voTable= voDigest.childNodes[i];
      DataTools.setDigest(voTable.nodeName, voTable.text);
    }
     if (voResult!= null){
      voRM.tAllowInsert= false;
      voRM.tAllowDelete= false;
      voRM.tAllowUpdate= false;
      
      if (voResult!= null){
        for (var x= 0; x< voResult.childNodes.length; x++){
          var voTable= voResult.childNodes[x];
          var vsTableName= voTable.getAttribute("name");
          var vaoMainObj= PageX.getDataObjByTable(vsTableName, false);
          if (PF.isValidArray(vaoMainObj)){
            for (var i= 0; i< vaoMainObj.length; i++){
              for (var j= 0, lenj= voTable.childNodes.length; j< lenj; j++){
                var vsField= voTable.childNodes[j].nodeName;
                var vsValue= voTable.childNodes[j].text;
                var vsTableRowId= voTable.getAttribute("rowid");
                //var viRowIndex= voRM.oTableRowIdMap.get(voRM.makeTableRowIdKey(vsTableName, vsTableRowId));
                var viRowIndex= DataTools.getRowXByRowId(vsTableName, vsTableRowId);
                this.setValue(vaoMainObj[i], viRowIndex, vsField, vsValue);
              }
            }
          }
          var voBoxSet= PageX.getBoxSet(vsTableName, "grid");
          if (voBoxSet!= null) voBoxSet.loadData();
        }
      }

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

/*拼出要保存的数据，如果是删除，则附加上所有的oldvalue，其他的则只需末级子表的数据即可
*/
function makeSaveData(sFunction){
	var voSaveBuffer = new StringBuffer();
	voSaveBuffer.append("<data>\n")
	var voRM = PageX.getRowManager();

  voSaveBuffer.append(voRM.getTableAddInfo());
  if(voOldValueBuffer!=null && voOldValueBuffer.toString().length>0){
     if("delete"==sFunction){
  			voSaveBuffer.append(voOldValueBuffer.toString());
  		}else{
  			voSaveBuffer.append(voGrid2OldVal);
  		}
  }
  if("save"==sFunction) voSaveBuffer.append(getSaveValue());
  voSaveBuffer.append("<dobusinessonsave classname=\"").append(voRM.sDoBusiClassName).append("\">");
  voSaveBuffer.append(PF.wraptWithCDATA(voRM.sDoBusiParams));
  voSaveBuffer.append("</dobusinessonsave>\n");
  return voSaveBuffer.append("</data>").toString();
}

function isTabFull(){
	var voflag = true;
	var voTabNum = tab_options.length;
	if(voGrid1.getRowCount()<voTabNum){
		voflag = false;
	}
  return voflag;
}

function isFieldFull(){
	var voflag = true;
	var voFieldNum = field_options.length;
	if(voGrid2.getRowCount()<voFieldNum){
		voflag = false;
	}
  return voflag;
}

function isTabExist(tableId){
	var voflag = false;
	for(var i=0; i<voGrid1.getRowCount(); i++){
		if(tableId==voGrid1.getValueByRowField(i,"TAB_ID") && i!=voGrid1.getCurRowIndex()){
			voflag = true;
			break;
		}
	}
	return voflag;
}

function isFieldExist(fieldName){
	var voflag = false;
	for(var i=0; i<voGrid2.getRowCount(); i++){
		if(fieldName==voGrid2.getValueByRowField(i,"FIELD_NAME") && i!=voGrid2.getCurRowIndex()){
			voflag = true;
			break;
		}
	}
	return voflag;
}

/*拼出主表oldvalue的delta类型，以便以后删除时使用
*/
function getFreeOldValue(voMasterTabNa){
	var voStrBuffer = new StringBuffer();
	voStrBuffer.append("<table name=\""+ voMasterTabNa +"\">\n");
	voStrBuffer.append("<record action='delete' rowid=''>\n");
	voStrBuffer.append("<oldvalue id=\"\">\n");
	for(var i=0,voNames = DataTools.getFieldNames(voMasterTabNa); i<voNames.length; i++){
		voStrBuffer.append("<"+ voNames[i] +">"+ voFree.getValue(voNames[i]) +"</"+ voNames[i] +">\n");
	}
	voStrBuffer.append("</oldvalue>\n</record>\n</table>\n");
	return voStrBuffer.toString();
}

/*拼出二层子表oldvalue的delta类型，以便以后删除时使用
*/
function getGrid1OldValue(voTabNa){
	var voStrBuffer = new StringBuffer();
	var voNames = DataTools.getFieldNames(voTabNa);
	voStrBuffer.append("<table name=\""+ voTabNa +"\">\n");
	for(var i=0; i<voGrid1.getRowCount(); i++){
		voStrBuffer.append("<record action='delete' rowid=''>\n");
		voStrBuffer.append("<oldvalue id=\"\">\n");
		for(var j=0; j<voNames.length; j++){
			voStrBuffer.append("<"+ voNames[j] +">"+ DataTools.getValue(voTabNa, i, voNames[j]) +"</"+ voNames[j] +">\n");
		}
		voStrBuffer.append("</oldvalue>\n</record>\n");
	}
	voStrBuffer.append("</table>\n");
	return voStrBuffer.toString();
}

/*初始化后保存末级字表的值，并将其转化为delta类型。
*/
function getGrid2OldValue(voTabNa){
	var voStrBuffer = new StringBuffer();
	var voNames = DataTools.getFieldNames(voTabNa);
	for(var i=0; i<voGrid1.getRowCount(); i++){
		voGridMap.put(voGrid1.getValueByRowField(i,"TAB_ID"), new Array());
	}
	voStrBuffer.append("<table name=\""+ voTabNa +"\">\n");
	for(var i=0; i<voGrid2.getRowCount(); i++){
		voStrBuffer.append("<record action='delete' rowid=''>\n");
		voStrBuffer.append("<oldvalue id=\"\">\n");
		var rowMap = new Map();
		for(var j=0; j<voNames.length; j++){
			voStrBuffer.append("<"+ voNames[j] +">"+ DataTools.getValue(voTabNa, i, voNames[j]) +"</"+ voNames[j] +">\n");
			rowMap.put(voNames[j], DataTools.getValue(voTabNa, i, voNames[j]));
		}
		var tabSeq = rowMap.get("TAB_SEQ");
		var tabId = null;
		for(var j=0; j<voGrid1.getRowCount(); j++){
			if(voGrid1.getValueByRowField(j, "TAB_SEQ")==tabSeq){
				tabId = voGrid1.getValueByRowField(j, "TAB_ID");
				break;
			}
		}
		var rowList = voGridMap.get(tabId);
		rowList[rowList.length] = rowMap;
		voStrBuffer.append("</oldvalue>\n</record>\n");
	}
	voStrBuffer.append("</table>\n");
	return voStrBuffer.toString();
}

/*取得要保存的数据，一二层字表要保存的数据通过行管理器取得
* 末级字表数据通过读取数据缓存Map对象取得
*/
function getSaveValue(){
	var voRM= PageX.getRowManager();
	var voParaValues = DataTools.getTableNames();
	var voSaveValBuffer = new StringBuffer();
	voSaveValBuffer.append(voRM.getTableRecord("AS_FILE_EXP"));
	voSaveValBuffer.append(voRM.getTableRecord("AS_FILE_EXP_TABLE"));
	voSaveValBuffer.append(getGrid2Val(voParaValues[2]));
	return voSaveValBuffer.toString();
}

/*拼出要保存末级字表数据的delta类型
*/
function getGrid2Val(voTabNa){
	var voStrBuffer = new StringBuffer();
	var voNames = DataTools.getFieldNames(voTabNa);
	var voRowList = null;
	var voRowMap = null;
	voStrBuffer.append("<table name=\""+ voTabNa +"\">\n");
	for(var i=0; i<voGrid1.getRowCount(); i++){
		voRowList = voGridMap.get(voGrid1.getValueByRowField(i,"TAB_ID"));
		for(var j=0; j<voRowList.length; j++){
			voRowMap = voRowList[j];
			if(voRowMap){
				voStrBuffer.append("<record action='insert' rowid=''>\n");
				voStrBuffer.append("<newvalue id=\"\">\n");
				for(var k=0; k<voNames.length; k++){
					if(voNames[k]=="COMPO_ID"){
						voStrBuffer.append("<"+ voNames[k] +">"+ voFree.getValue("COMPO_ID") +"</"+ voNames[k] +">\n");
						continue;
					}
					if(voNames[k]=="TAB_SEQ"){
						voStrBuffer.append("<"+ voNames[k] +">"+ voGrid1.getValueByRowField(i, "TAB_SEQ") +"</"+ voNames[k] +">\n");
						continue;
					}
				
					voStrBuffer.append("<"+ voNames[k] +">"+ voRowMap.get(voNames[k]) +"</"+ voNames[k] +">\n");
				}
				voStrBuffer.append("</newvalue>\n</record>\n");
			}
		}
	}
	voStrBuffer.append("</table>\n");
	return voStrBuffer.toString();
}

function before_fsave(){
	getGridValue();
	return true;
}

function after_fsave(){
	voGrid2OldVal = null;
	var voParaValues = DataTools.getTableNames();
  voGrid2OldVal = getGrid2AfterSaveValue(voParaValues[2]);
  voOldValueBuffer = new StringBuffer();
  voOldValueBuffer.append(getFreeOldValue(voParaValues[0]));
  voOldValueBuffer.append(getGrid1OldValue(voParaValues[1]));
  voOldValueBuffer.append(voGrid2OldVal);
}

function getGrid2AfterSaveValue(voTabNa){
		var voStrBuffer = new StringBuffer();
	var voNames = DataTools.getFieldNames(voTabNa);
	var voRowList = null;
	var voRowMap = null;
	voStrBuffer.append("<table name=\""+ voTabNa +"\">\n");
	for(var i=0; i<voGrid1.getRowCount(); i++){
		voRowList = voGridMap.get(voGrid1.getValueByRowField(i,"TAB_ID"));
		for(var j=0; j<voRowList.length; j++){
			voRowMap = voRowList[j];
			if(voRowMap){
				voStrBuffer.append("<record action='delete' rowid=''>\n");
				voStrBuffer.append("<oldvalue id=\"\">\n");
				for(var k=0; k<voNames.length; k++){
					if(voNames[k]=="COMPO_ID"){
						voStrBuffer.append("<"+ voNames[k] +">"+ voFree.getValue("COMPO_ID") +"</"+ voNames[k] +">\n");
						continue;
					}
					if(voNames[k]=="TAB_SEQ"){
						voStrBuffer.append("<"+ voNames[k] +">"+ voGrid1.getValueByRowField(i, "TAB_SEQ") +"</"+ voNames[k] +">\n");
						continue;
					}
				
					voStrBuffer.append("<"+ voNames[k] +">"+ voRowMap.get(voNames[k]) +"</"+ voNames[k] +">\n");
				}
				voStrBuffer.append("</oldvalue>\n</record>\n");
			}
		}
	}
	voStrBuffer.append("</table>\n");
	return voStrBuffer.toString();
}
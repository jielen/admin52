// $Id: ForeignBox.js,v 1.27.2.1 2009/12/27 09:09:13 zhuyulong Exp $
/*
Title: gp.page.ForeignBox
Description: 外部实体框类;用于进行外部提示的选择;
Company: 用友政务
author: huanghao,leidh;
*/

//----------------------------------------------------------------------
function ForeignBox(sid){
  TextBox.call(this,sid);

  this.CLASSNAME= "gp.page.ForeignBox";
  
  this.COMPO_FOREIGN_FOR_SQL= "AS_FOREIGN_FOR_SQL";

  this.sName= this.CLASSNAME; //对象名称.
  this.oForeign= null;        //private;
  this.oSelectButton= null;   //private; 选择按钮;

  this.sBeforeCond= "";       //private;
  this.oNoClearFieldsMap= new Map();//private;

  //选中时禁止响应 onchange; 键盘输入时响应 onchange;
  this.tAnswerOnChange= true;//private;
	
  //对选中值的暂存处理;
  this.a2xvSelResult= null;   //private;
  
  this.caption = "";//外部实体页面标题
  this.fcomponame = "";
  
  //事件声明;
  this.OnButtonClick= "OnButtonClick";         //oSender, oEvent;
  this.OnBeforeSelect= "OnBeforeSelect";       //参数: oSender;
  this.OnAfterSelect= "OnAfterSelect";         //参数: oSender;
  //add by liubo 20071010;多选时，决定是否插入
  this.isMultiInsert = true;
	//end
  //public;
  this.init= ForeignBox_init;
  this.isMultiSel = ForeignBox_isMultiSel;
  this.setReadOnly= ForeignBox_setReadOnly;
  //以上已完成文档
	
	this.sqlid = null;
	this.condition = null;
	
  this.setStrictInput= ForeignBox_setStrictInput;
  this.isStrictInput= ForeignBox_isStrictInput;
  this.setClearInput= ForeignBox_setClearInput;
  this.isClearInput= ForeignBox_isClearInput;
  this.fireSelect= ForeignBox_fireSelect;
  this.setAutoFillData= ForeignBox_setAutoFillData;
  this.isAutoFillData= ForeignBox_isAutoFillData;
  this.select= ForeignBox_select;
  this.selectK= ForeignBox_selectK;
  this.isBoxCondDisabled= ForeignBox_isBoxCondDisabled;
  this.setBoxCondDisabled= ForeignBox_setBoxCondDisabled;
  this.getUserCond= ForeignBox_getUserCond;
  this.setUserCond= ForeignBox_setUserCond;
  this.getBeforeCond= ForeignBox_getBeforeCond;
  this.setBeforeCond= ForeignBox_setBeforeCond;
  this.getSearchedFields= ForeignBox_getSearchedFields;
  this.isFuzzyMatch= ForeignBox_isFuzzyMatch;
  this.isAllCheckVisible= ForeignBox_isAllCheckVisible;
  this.setAllCheckVisible= ForeignBox_setAllCheckVisible;
  this.setMultiSel= ForeignBox_setMultiSel;
  this.setSqlid= ForeignBox_setSqlid;
  this.getSqlid= ForeignBox_getSqlid;
  this.setSql= ForeignBox_setSqlid;
  this.getSql= ForeignBox_getSqlid;
  this.createForeignXml= ForeignBox_createForeignXml;
  this.getSelectResult= ForeignBox_getSelectResult;

  //private;
  this.eventAnswer_OnKeyDown= ForeignBox_eventAnswer_OnKeyDown;
  this.eventAnswer_OnChange = ForeignBox_eventAnswer_OnChange;
  this.makeFieldMap= ForeignBox_makeFieldMap;
  this.selectExactMatch= ForeignBox_selectExactMatch;
  this.getCondition= ForeignBox_getCondition;
  this.getFixCondition= ForeignBox_getFixCondition;
  this.getEffectCondition= ForeignBox_getEffectCondition;
  this.getInputCondition= ForeignBox_getInputCondition;
  this.andString= ForeignBox_andString;
  this.fillMultiRow= ForeignBox_fillMultiRow;
  this.fillOneRow= ForeignBox_fillOneRow;
  //add by liubo :20071010
  this.fillOneRow2 = ForeignBox_fillOneRow2;
  //end 
  this.isTreeView= ForeignBox_isTreeView;
  this.fillBlankRow= ForeignBox_fillBlankRow;
  this.fillValue= ForeignBox_fillValue;
  this.getIsAdd= ForeignBox_getIsAdd;
  this.getTabRefName= ForeignBox_getTabRefName;
  this.disposeValueSetValue= ForeignBox_disposeValueSetValue;
  this.getCurForeignValues= ForeignBox_getCurForeignValues;
  this.isFillDataSuccess= ForeignBox_isFillDataSuccess;
  this.synchFKFieldValue= ForeignBox_synchFKFieldValue;
  this.rollbackOneRow= ForeignBox_rollbackOneRow;
  this.getOuterObjValue= ForeignBox_getOuterObjValue;
  
  this.release = ForeignBox_release;
  this.make = ForeignBox_make;
  return true;
}
function ForeignBox_make(){
	TextBox_make.call(this);
//	this.oInputBox.onblur = null;
//	this.oInputBox.onchange = ForeignBox_oInputBox_onchange;
  this.oSelectButton= this.oOuterPanel.rows[0].cells[2].firstChild;
  this.oSelectButton.oOwner= this;
  this.oSelectButton.onmouseup= ForeignBox_button_mouseup;
}
//----------------------------------------------------------------------
function ForeignBox_init(tIsFinalClass){
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (TextBox_init.call(this, false)== false) return false;

  var voForeignXml= document.all(this.oOuterPanel.foreignxmlid);
  if (voForeignXml!= null) this.oForeign= voForeignXml.documentElement;

  var vasNoClearField= new Array();
  if (this.oOuterPanel.noclearfields!= null){
    vasNoClearField= this.oOuterPanel.noclearfields.split(";");
  }
  for(var i= 0; i< vasNoClearField.length; i++){
    if (PF.isEmpty(vasNoClearField[i])) continue;
    this.oNoClearFieldsMap.put(vasNoClearField[i], vasNoClearField[i]);
  }
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 设置只读属性.
//返回值: void;
function ForeignBox_setReadOnly(tIsReadOnly){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
	if (this.isForceReadOnly()) tIsReadOnly= true;
  TextBox_setReadOnly.call(this, tIsReadOnly);
  this.oSelectButton.disabled= TextBox_isReadOnly.call(this);
  return;
}
//----------------------------------------------------------------------
function ForeignBox_isMultiSel(){
  var vtIsMulti= PF.parseBool(this.oForeign.getAttribute("ismultisel"));
  return vtIsMulti;
}
//----------------------------------------------------------------------
function ForeignBox_setMultiSel(tIsMultiSel){
  if (this.oForeign== null) return;
  this.oForeign.setAttribute("ismultisel", tIsMultiSel+ "");
}
//----------------------------------------------------------------------
function ForeignBox_setSqlid(value){
  if (this.oForeign== null) return;
  var voSql= this.oForeign.selectSingleNode("sqlid");
  if (voSql== null){
    voSql= this.oForeign.ownerDocument.createElement("sqlid");
    this.oForeign.appendChild(voSql);
  }
  voSql.text= value;
  this.sqlid = voSql.text;
}
//----------------------------------------------------------------------
function ForeignBox_getSqlid(){
  if (this.oForeign== null) return;
  if (this.sqlid) return this.sqlid;
  var voSql= this.oForeign.selectSingleNode("sqlid");
  if (voSql== null) return "";
  this.sqlid = voSql.text;
  return this.sqlid;
}

//----------------------------------------------------------------------
//public;
function ForeignBox_createForeignXml(){
  if (this.oForeign!= null) return;
  var voXml= document.createElement("<xml id='ForeignXML_'"+ PF.getUID("_")+ ">");
  document.body.appendChild(voXml);
  this.oForeign= voXml.createElement("foreign");
  voXml.appendChild(this.oForeign);

  var voAttr= voXml.createAttribute("name");
  this.oForeign.setAttributeNode(voAttr);
  var voAttr= voXml.createAttribute("fcomponame");
  voAttr.value= this.COMPO_FOREIGN_FOR_SQL;
  this.oForeign.setAttributeNode(voAttr);
  var voAttr= voXml.createAttribute("ftablename");
  this.oForeign.setAttributeNode(voAttr);
  var voAttr= voXml.createAttribute("ismultisel");
  voAttr.value= "false";
  this.oForeign.setAttributeNode(voAttr);
  var voAttr= voXml.createAttribute("istreeview");
  voAttr.value= "false";
  this.oForeign.setAttributeNode(voAttr);

  var voNode= voXml.createElement("sql");
  this.oForeign.appendChild(voNode);
  var voNode= voXml.createElement("condition");
  this.oForeign.appendChild(voNode);
  var voNode= voXml.createElement("fields");
  this.oForeign.appendChild(voNode);
  var voNode= voXml.createElement("effectfields");
  this.oForeign.appendChild(voNode);
}
//----------------------------------------------------------------------
//private; 获取条件;
//return: 成功:condition;否则:"";
function ForeignBox_getCondition(tIsExactMatch, tForceNeedCondi){
  if(this.condition)
  	return this.condition;
  
  if (this.oForeign== null) return "";
  var vsCond= this.getFixCondition();
  var s = this.getEffectCondition();
  vsCond = this.andString(vsCond, s);

  var vsInputValue = this.oInputBox.value;
  s = this.getInputCondition(vsInputValue, tIsExactMatch, tForceNeedCondi);
  vsCond = this.andString(vsCond, s);

  //v3.1接口;
  var tableField = this.getTableName() + "_" + this.getFieldName();
  if (eval("typeof " + tableField + "_AddCondition ==\"function\"")){
    s = eval(tableField + "_AddCondition()");
    vsCond = this.andString(vsCond, s);
  }

  vsCond = this.andString(vsCond, this.getUserCond());
  return vsCond;
  
}
//----------------------------------------------------------------------
//private; 获取外部实体的固定条件;
function ForeignBox_getFixCondition(){
	//alert("ForeignMeta_getFixCondition");
  var voCond= this.oForeign.selectSingleNode("condition");
  if (voCond== null) return "";
  var vsCond= voCond.text;
  if (PF.isEmpty(vsCond)) return "";
  var vsName= this.oForeign.getAttribute("name");
  var vsFTable= this.oForeign.getAttribute("ftablename");
  if (vsName!= vsFTable){
    var r = new RegExp(vsName + "\\\.", "g");
    vsCond = vsCond.replace(r, "MASTER.");
  }
  return vsCond;
}
//----------------------------------------------------------------------
//private;获取外部实体受其它字段影响的条件(变动条件)
//@param oOuterObj 外部对象，应提供 getValue 方法
function ForeignBox_getEffectCondition(){
  var vsCond= "";
  var voEffectFields= this.oForeign.selectSingleNode("effectfields");
  var vsFTable= this.oForeign.getAttribute("ftablename");
  var vsField= "";
  var vsFField= "";
  var vsValue= "";
  for (var i= 0; i< voEffectFields.childNodes.length; i++){
    vsField= voEffectFields.childNodes[i].getAttribute("name");
    vsFField= voEffectFields.childNodes[i].getAttribute("fname");
    vsValue= "";

    // TODO: 原来的逻辑还包括：如果子表没有这个字段，到主表中去找
    if (this.oOuterObj!= null){
      if (this.oOuterObj.CLASSNAME== "gp.page.Search"){
        value = this.oOuterObj.getValue(this.getTableName(), vsField);
      }else{
        if (DataTools.isValidField(this.oOuterObj.getTableName(), vsField)== false){
          var vsMainTable= DataTools.getMainTableName();
          vsValue= DataTools.getValue(vsMainTable, 0, vsField);
        }else{
          vsValue = DataTools.getValue(this.oOuterObj.getTableName(), this.getOuterObjCurRowX(), vsField);
        }
      }
    }
    if (null != vsValue && 0 != vsValue.length) {
      vsValue =  vsFField+ "=" + doubleApos(vsValue) + "";
      vsCond = this.andString(vsCond, vsValue);
    }
  }
  return vsCond;
}
//----------------------------------------------------------------------
//private;用 and 连接两个字符串，用于构造 SQL 条件语句
function ForeignBox_andString(s1, s2){
  if(!s2 || 0 == s2.length){
    if (!s1){
      s1= "";
    }
    return s1;
  }
  if(!s1 || 0 == s1.length) return s2;
  return s1 + ";" + s2;
}
//----------------------------------------------------------------------
//private;
function ForeignBox_getInputCondition(sInputValue, tIsExactMatch, tForceNeedCondi){
  //chupp;2006113;在输入代码后带不出名称;
  tForceNeedCondi= PF.parseBool(tForceNeedCondi);
  if (!tForceNeedCondi){
    if (this.isBoxCondDisabled()) return "";
  }
  
  tIsExactMatch= PF.parseBool(tIsExactMatch);
  var vsInputValue= sInputValue;

  var voForignField= this.oForeign.selectSingleNode("fields/field[@isfk='true']");
  if (voForignField== null) return "";
  var vsFfield= voForignField.getAttribute("fname");
  var vsFKfield= voForignField.getAttribute("name");
  
  //如果isfk的字段不是本输入框的字段,则提取isfk字段的值,
  //并检查isfk字段的值与输入框的值是否一致,在都不为空的情况下,以isfk为准.
  //leidh;20060531;
  if (vsFKfield!= this.getFieldName() && this.oOuterObj!= null){
    var vsFKfieldValue= null;
    var voFKfieldBox= this.oOuterObj.getEditBox(vsFKfield);
    if (voFKfieldBox!= null){
      vsFKfieldValue= voFKfieldBox.getValue();
    }
    else { //chupp;20061012
    	vsFKfieldValue= PF.trim(PageX.getValue(this.oOuterObj, this.getOuterObjCurRowX(), vsFKfield));
    }	
   
    if (vsFKfieldValue!=null && vsFKfieldValue!= vsInputValue){
      if (vsFKfieldValue!="" && vsInputValue!=""){
        vsInputValue= vsFKfieldValue;
      }
    }
  }
  
  if (vsInputValue== null) vsInputValue= "";
  vsInputValue = doubleApos(vsInputValue);
  vsInputValue = vsInputValue.replace(/%/g, "%25"); //_trick

  var vsFTable= this.oForeign.getAttribute("ftablename");
  var vsCond = "(MASTER."+ vsFfield + " like '"+ vsInputValue+ ((tIsExactMatch)?"')":"%')");
  return vsCond;
}
//----------------------------------------------------------------------
//private; 根据条件获取准确值;
//return: 成功:axxsData;否则:null;
function ForeignBox_selectExactMatch(sCondition){
  if (this.oForeign== null) return null;
  var vsCond= this.getCondition();
  vsCond= this.andString(this.sBeforeCond, vsCond);//值对
  
  var vsComponame = this.oForeign.getAttribute("fcomponame");
  var vsMasterCompo = this.oOuterPanel.componame;
  var vsFTableName = this.oForeign.getAttribute("ftablename");
  var voFfield= this.oForeign.selectSingleNode("fields/field[@name='"+ this.getFieldName()+ "']");
  var vsRealField= "";
  if (voFfield!= null){
    vsRealField= voFfield.getAttribute("fname");
  }  
  var vsMainTable= DataTools.getMainTableName();
  var vtIsSub= !(vsMainTable== this.getTableName());
  var vsFName= this.oForeign.getAttribute("name");
  var vtIsTree = this.isTreeView();
  var ismulti = this.isMultiSel();
  var isAdd= this.getIsAdd();
  var tabRefName= this.getTabRefName();
  var voForeignIsFk= this.oForeign.selectSingleNode("fields/field[@isfk='true']");
  var vsSelectField= "";
  if (voForeignIsFk!= null)
    vsSelectField= this.oForeign.selectSingleNode("fields/field[@isfk='true']").getAttribute("name");
 
  var vasName = new Array("masterCompoName", 
  												"masterTableName", 
  												"masterSelectField",
  												"tablename",
  												"realFieldName",
  												"componame",
  												"foreignname",
  												"sqlid",
  												"condition",
  												"ismulti",
  												"type",
  												"searchCond",
  												"totalcount");
  var vasValue = new Array(vsMasterCompo, 
  												this.getTableName(), 
  												vsSelectField,//vsRealField,//
  												vsFTableName,
  												vsRealField,
  												vsComponame,  												
  												vsFName,
  												this.getSqlid(),
  												vsCond,
  												ismulti+ "",
  												"advancedSearch",
  												sCondition,
  												"-1");
  var result = Info.requestData("getselectpagedata", vsComponame, vasName, vasValue);
  if (!result) return null;
  var voDom = PF.parseXml(result.xml);
  if (voDom== null || voDom.hasChildNodes()== false) return null;

  var vaxxsData= new Array();
  var vasField= new Array();
  var voEntity= voDom.firstChild;
  var voField= null;
  for (var i= 0; i< voEntity.childNodes.length; i++){
    voField= voEntity.childNodes[i];
    vasField[i]= voField.getAttribute("name");
  }
  vaxxsData[0]= vasField;
  for (var x= 0; x< voDom.childNodes.length; x++){
    voEntity= voDom.childNodes[x];
    var vasValue= new Array();
    for (var i= 0; i< voEntity.childNodes.length; i++){
      voField= voEntity.childNodes[i];
      vasValue[i]= voField.getAttribute("value");
    }
    vaxxsData[x+ 1]= vasValue;
  }
  return vaxxsData;
}
//----------------------------------------------------------------------
//public; 弹出选择框;
//return: new Array(asField, axxsValue)/ null;
function ForeignBox_select(sPageStyle){
  var vsCond= this.getCondition();
  //chupp;20061112;
  return this.selectK(vsCond, sPageStyle);
}
//----------------------------------------------------------------------
//public; 弹出选择框;
//return: new Array(asField, axxsValue)/ null;
function ForeignBox_selectK(sCondition, sPageStyle){
  var va2vRetData= new Array();
  this.a2xvSelResult= va2vRetData; //清空;

  //发出事件; OnBeforeSelect;
  this.abortEvent(false); //消除影响;
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeSelect)){
    this.eventAnswer_OnBeforeSelect(this);
  }
  if (this.isAbortEvent()) return null;
  this.fireEvent(this.OnBeforeSelect, new Array(this));
  if (this.isAbortEvent()) return null;

  if (this.oForeign== null) return null;
  sCondition= this.andString(this.sBeforeCond, sCondition);

  sCondition = this.andString(sCondition, this.getUserCond());//add 2008-5-11

  var vsSelPageStyle = "resizable:yes;help:no;status:no;scroll:no;";
  var vsMasterCompo = this.oOuterPanel.componame;
  
  var vsCompo = this.fcomponame;
  if(vsCompo == null || vsCompo == "")
  	vsCompo = this.oForeign.getAttribute("fcomponame");
  
  var vsFTableName = this.oForeign.getAttribute("ftablename");
  var voFfield= this.oForeign.selectSingleNode("fields/field[@name='"+ this.getFieldName()+ "']");
  var vsRealField= "";
  if (voFfield!= null){
    vsRealField= voFfield.getAttribute("fname");
  }
  var vsMainTable= DataTools.getMainTableName();
  var vtIsSub= !(vsMainTable== this.getTableName());
  var vsFName= this.oForeign.getAttribute("name");
  var vtIsTree = this.isTreeView();
  var ismulti = this.isMultiSel();
  var isAdd= this.getIsAdd();
  var tabRefName= this.getTabRefName();
  var isrelachildren = this.oForeign.getAttribute("isrelachildren");
  
  var masterFieldName = this.getFieldName();
	var voMasterForignField = this.oForeign.selectSingleNode("fields/field[@isfk='true']");
  if (voMasterForignField != null){
  	masterFieldName = voMasterForignField.getAttribute("name");
	}
	
  var vsParams= encodeParams("masterCompoName", vsMasterCompo,
                             "masterTableName", this.getTableName(),
                             "isSub", vtIsSub,
                             "masterFieldName", masterFieldName,//this.getFieldName(),//vsRealField
                             "tablename", vsFTableName,
                             "realFieldName", vsRealField,
                             "componame", vsCompo,
                             "foreignname", vsFName,
                             "sqlid", this.getSqlid(),
                             "condition", sCondition,
                             "ismulti", ismulti+ "",
                             "isadd", isAdd,
                             "tabRefName", tabRefName,
                             "caption", this.caption,
                             "isrelachildren", isrelachildren
                             );

  var vavDialogArgument= new Array(window,
                this.getSearchedFields(),
			          new String(this.isFuzzyMatch()),
			          this.oOuterPanel.defsearchtext,
			          new String(this.isAllCheckVisible()),
                this.getSql(),
                sCondition
			          );

  if (vtIsTree){
    var va2xsData = showModalDialog(PageX.sRootPath + "/dispatcher.action?function=selectTreePage&" + vsParams,
			vavDialogArgument, vsSelPageStyle);
    if (PF.isValidArray(va2xsData)== false
        || PF.isValidArray(va2xsData[0])== false
        || PF.isValidArray(va2xsData[1])== false
        || (ismulti && typeof(va2xsData[1][0])!="string" && PF.isValidArray(va2xsData[1][0])== false)) return null;
  }else{
    //chupp;2006112;
    var vsNotTreePageStyle= null;
    if(sPageStyle== null){
    	vsNotTreePageStyle= vsSelPageStyle;
    }
    else {
  	  vsNotTreePageStyle= sPageStyle;
    }	
    
    var va2xsData = showModalDialog(PageX.sRootPath + "/dispatcher.action?function=selectPage&" + vsParams,
			vavDialogArgument, vsNotTreePageStyle);
    if (PF.isValidArray(va2xsData)== false
        || PF.isValidArray(va2xsData[0])== false
        || PF.isValidArray(va2xsData[1])== false
        || (ismulti && typeof(va2xsData[1][0])!="string" && PF.isValidArray(va2xsData[1][0])== false)) return null;
  }

  this.tAnswerOnChange= false;
  var isMultiInsert = this.isMultiInsert;
  if (ismulti){
    if (PF.isValidArray(va2xsData[1]) && PF.isValidArray(va2xsData[1][0])){
      for (var i= 0; i< va2xsData[1].length; i++){
        for (var j= 0; j< va2xsData[1][i].length; j++){
          va2xsData[1][i][j]= this.disposeValueSetValue(va2xsData[1][i][j]);
        }
      }
      va2vRetData[0]= va2xsData[0];
      va2vRetData[1]= va2xsData[1];
      if (isMultiInsert) {
	      if (this.isAutoFillData()){
	        this.fillMultiRow(va2xsData[0], va2xsData[1]);
	      }
	    } else {
	    	if (this.isAutoFillData()) {
	    		this.fillOneRow2(va2xsData[0], va2xsData[1]);
	    	}
	    }
    }else{
      for (var i= 0; i< va2xsData[1].length; i++){
        va2xsData[1][i]= this.disposeValueSetValue(va2xsData[1][i]);
      }
      va2vRetData[0]= va2xsData[0];
      va2vRetData[1]= new Array(va2xsData[1]);
      if (this.isAutoFillData()){
        this.fillOneRow(va2xsData[0], va2xsData[1]);
      }
    }
  }else{
    for (var i= 0; i< va2xsData[1].length; i++){
      va2xsData[1][i]= this.disposeValueSetValue(va2xsData[1][i]);
    }
    va2vRetData[0]= va2xsData[0];
    va2vRetData[1]= new Array(va2xsData[1]);
    if (this.isAutoFillData()){
      this.fillOneRow(va2xsData[0], va2xsData[1]);
    }
  }
  this.tAnswerOnChange= true;
  this.sBeforeCond= "";
  
  //暂存;
  this.a2xvSelResult= va2vRetData; 

  //发出事件;  OnAfterSelect;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterSelect)){
    this.eventAnswer_OnAfterSelect(this);
  }
  this.fireEvent(this.OnAfterSelect, new Array(this));
  return va2vRetData;
}
//----------------------------------------------------------------------
//public;
function ForeignBox_getSelectResult(){
  return this.a2xvSelResult;
}
//----------------------------------------------------------------------
//private;
function ForeignBox_makeFieldMap(asFieldName){
  if (PF.isValidArray(asFieldName)== false) return null;
  var voFieldMap= new Map();
  for (var i= 0; i< asFieldName.length; i++){
    voFieldMap.put(asFieldName[i], i);
  }
  return voFieldMap;
}
//----------------------------------------------------------------------
//private; 
//return: a2xsValue/null;
function ForeignBox_getCurForeignValues(){
  if (this.oForeign== null) return null;
  var voForeignFields= this.oForeign.selectSingleNode("fields");
  if (voForeignFields== null) return null;
  var vasField= new Array();
  var vasValue= new Array();
  for (var i= 0; i< voForeignFields.childNodes.length; i++){
    var vsName= voForeignFields.childNodes[i].getAttribute("name");
    var vsFname= voForeignFields.childNodes[i].getAttribute("fname");
    vasField[vasField.length]= vsFname;
    vasValue[vasValue.length]= PageX.getValue(this.oOuterObj, this.getOuterObjCurRowX(), vsName);
  }
  return new Array(vasField, vasValue);
}
//----------------------------------------------------------------------
//private; 填入多行;
//return: void;
function ForeignBox_fillMultiRow(asField, axxsValue){
	if (asField== null) return;
	if (axxsValue== null) return;
  if (axxsValue.length<= 0) return;
  var voObj= this.oOuterObj;
  if (voObj== null) return;
  var voFieldMap= this.makeFieldMap(asField);
  if (voFieldMap== null) return;
  var viCol= -1;
  var voForeignFields= this.oForeign.selectSingleNode("fields");
  if (voForeignFields== null) return;
  var vsFValue= "";
  var vsValue= "";
  var vasFField= new Array();
  var vasValue= new Array();
  for (var x= 0; x< axxsValue.length; x++){
    if (x!= 0){
      voObj.setCurRow(voObj.insertRow());
    }
    vsFValue= "";
    vasValue= axxsValue[x];
    for (var i= 0; i< voForeignFields.childNodes.length; i++){
      var vsName= voForeignFields.childNodes[i].getAttribute("name");
      var vsFname= voForeignFields.childNodes[i].getAttribute("fname");

      //支持多个字段拼成一个字段;leidh;20050920;
      vasFField= vsFname.split(",");
      vsValue= "";
      if (vasFField.length> 1){
        for (var y= 0; y< vasFField.length; y++){
          viCol= voFieldMap.get(vasFField[y]);
          if (viCol== null || viCol< 0 || viCol>= vasValue.length) continue;
          if (y> 0) vsValue+= " ";
          vsValue+= vasValue[viCol];
        }
      }else{
        viCol= voFieldMap.get(vsFname);
        if (viCol== null || viCol< 0 || viCol>= vasValue.length) continue;
        vsValue= vasValue[viCol];
      }

      if (vsValue== null) continue;
      vsValue= PF.trim(vsValue);
      if (vsName== this.getFieldName()){
        vsFValue= vsValue;
        continue;
      }
      this.fillValue(vsName, vsValue);
    }
    this.fillValue(this.getFieldName(), vsFValue);
  }
  return;
}
//----------------------------------------------------------------------
//private; 填入一行;
//return: void;
function ForeignBox_fillOneRow(asField, asValue){
  if (asField== null) return;
  if (asValue== null) return;
  if (asValue.length<= 0) return;
  var voFieldMap= this.makeFieldMap(asField);
  if (voFieldMap== null) return;
  var voForeignFields= this.oForeign.selectSingleNode("fields");
  if (voForeignFields== null) return;
  var viCol= -1;
  var vsFValue= "";
  var vsValue= "";
  var vasFField= new Array();
  
  var vtIsRollback= false;
  var vasRollbackField= new Array();
  var vasRollbackValue= new Array();
  for (var i= 0; i< voForeignFields.childNodes.length; i++){
    var vsName= voForeignFields.childNodes[i].getAttribute("name");
    var vsFname= voForeignFields.childNodes[i].getAttribute("fname");
    
    //支持多个字段拼成一个字段;leidh;20050920;
    vasFField= vsFname.split(",");
    vsValue= "";
    if (vasFField.length> 1){
      for (var y= 0; y< vasFField.length; y++){
        viCol= voFieldMap.get(vasFField[y]);
        if (viCol== null || viCol< 0 || viCol>= asValue.length) continue;
        if (y> 0) vsValue+= " ";
        vsValue+= asValue[viCol];
      }
    }else{
      viCol= voFieldMap.get(vsFname);
      if (viCol== null || viCol< 0 || viCol>= asValue.length) continue;
      vsValue= asValue[viCol];
    }
    if (vsValue== null) continue;
    vsValue= PF.trim(vsValue);
    if (vsName== this.getFieldName()){
      vsFValue= vsValue;
      continue;
    }
    vasRollbackField[vasRollbackField.length]= vsName;
    vasRollbackValue[vasRollbackValue.length]= this.getOuterObjValue(vsName);
    this.fillValue(vsName, vsValue);

    //如果 fillValue 没有成功,回滚外部实体数据填充的操作;
    if (!vtIsRollback 
        && PageX.sPageLayout== PageX.PAGE_LAYOUT_FREE
        && PF.parseBool(this.oOuterPanel.isallowrollback)
        && !this.isFillDataSuccess(vsName, vsValue)){
      vtIsRollback= true;
      this.rollbackOneRow(vasRollbackField, vasRollbackValue);
      break;
    }
  }

  if (!vtIsRollback){
    if (this.oOuterObj== null){
      this.setValue(vsFValue);
    }else{
      vasRollbackField[vasRollbackField.length]= this.getFieldName();
      vasRollbackValue[vasRollbackValue.length]= this.getOuterObjValue(this.getFieldName());
      this.fillValue(this.getFieldName(), vsFValue);
      //如果 fillValue 没有成功,回滚外部实体数据填充的操作;
      if (!vtIsRollback 
          && PageX.sPageLayout== PageX.PAGE_LAYOUT_FREE
          && PF.parseBool(this.oOuterPanel.isallowrollback)
          && !this.isFillDataSuccess(this.getFieldName(), vsFValue)){
        vtIsRollback= true;
        this.rollbackOneRow(vasRollbackField, vasRollbackValue);
      }
    }
  }
}

//add by liubo
function ForeignBox_fillOneRow2(asField, asValue){
  //alert("ForeignBox_fillOneRow");
  if (asField== null) return;
  if (asValue== null) return;
  if (asValue.length<= 0) return;
  var voFieldMap= this.makeFieldMap(asField);
  if (voFieldMap== null) return;
  var voForeignFields= this.oForeign.selectSingleNode("fields");
  if (voForeignFields== null) return;
  var viCol= -1;
  var vsFValue= "";
  var vsValue= "";
  var vasFField= new Array();
  
  var vtIsRollback= false;
  var vasRollbackField= new Array();
  var vasRollbackValue= new Array();
  //var va2xOldValue= this.getCurForeignValues();
  for (var i= 0; i< voForeignFields.childNodes.length; i++){
    var vsName= voForeignFields.childNodes[i].getAttribute("name");
    var vsFname= voForeignFields.childNodes[i].getAttribute("fname");
    
    //支持多个字段拼成一个字段;leidh;20050920;
    vasFField= vsFname.split(",");
    vsValue= "";
    for (var m = 0; m < asValue.length; m++) {
	    if (vasFField.length> 1){
	      for (var y= 0; y< vasFField.length; y++){
	        viCol= voFieldMap.get(vasFField[y]);
	        if (viCol== null || viCol< 0) continue;
	        if (y> 0) vsValue+= " ";
	        vsValue+= asValue[m][viCol];
	      }
	    }else{
	      viCol= voFieldMap.get(vsFname);
	      if (viCol== null || viCol< 0 || viCol>= asValue.length) continue;
	      vsValue= asValue[m][viCol];
	    }
	    vsValue += ","
	  }
    if (vsValue== null) continue;
    //add by liubo
    if (vsValue.length > 0) {
    	vsValue = vsValue.substr(0,vsValue.length-1);
    }
    //end
    vsValue= PF.trim(vsValue);
    if (vsName== this.getFieldName()){
      vsFValue= vsValue;
      continue;
    }
    vasRollbackField[vasRollbackField.length]= vsName;
    vasRollbackValue[vasRollbackValue.length]= this.getOuterObjValue(vsName);
    this.fillValue(vsName, vsValue);

    //如果 fillValue 没有成功,回滚外部实体数据填充的操作;
    if (!vtIsRollback 
        && PageX.sPageLayout== PageX.PAGE_LAYOUT_FREE
        && PF.parseBool(this.oOuterPanel.isallowrollback)
        && !this.isFillDataSuccess(vsName, vsValue)){
      vtIsRollback= true;
      this.rollbackOneRow(vasRollbackField, vasRollbackValue);
      break;
    }
  }

  if (!vtIsRollback){
    if (this.oOuterObj== null){
      this.setValue(vsFValue);
    }else{
      vasRollbackField[vasRollbackField.length]= this.getFieldName();
      vasRollbackValue[vasRollbackValue.length]= this.getOuterObjValue(this.getFieldName());
      this.fillValue(this.getFieldName(), vsFValue);
      //如果 fillValue 没有成功,回滚外部实体数据填充的操作;
      if (!vtIsRollback 
          && PageX.sPageLayout== PageX.PAGE_LAYOUT_FREE
          && PF.parseBool(this.oOuterPanel.isallowrollback)
          && !this.isFillDataSuccess(this.getFieldName(), vsFValue)){
        vtIsRollback= true;
        this.rollbackOneRow(vasRollbackField, vasRollbackValue);
      }
    }
  }	
}
//----------------------------------------------------------------------
//private; 回滚
//return: void;
function ForeignBox_rollbackOneRow(asField, asValue){
  if (!PF.parseBool(this.oOuterPanel.isallowrollback)) return;
  var vtIsFire= this.isFireOnChange();
  this.setFireOnChange(false);
  for (var i= 0; i< asField.length; i++){
    this.fillValue(asField[i], asValue[i]);
  }
  this.setFireOnChange(vtIsFire);
}
//----------------------------------------------------------------------
//private;
//return: true/false;
function ForeignBox_isFillDataSuccess(sField, sValue){
	var bIn = DataTools.isValidField(this.getTableName(), sField);
  if(!bIn) return true;

  var vsCurValue= this.getOuterObjValue(sField);
  var vsTableName= this.oOuterObj.getTableName();
  
  if (!PF.isEmpty(vsTableName) && PF.parseBool(DataTools.getTableFieldAttr(vsTableName, sField, "iskilo"))){
    sValue= sValue.replace(Const.RE_SIGN_COMMA, "");
    vsCurValue= sValue.replace(Const.RE_SIGN_COMMA, "");    
  }
    
  if (vsCurValue!= sValue) return false;
  return true;
}
//----------------------------------------------------------------------
//private;
//return: value / null;
function ForeignBox_getOuterObjValue(sField){
  var vsCurValue= null;
  if (this.oOuterObj!= null){
    if (typeof(this.oOuterObj.isValidFieldName)== "function"){
      if (this.oOuterObj.CLASSNAME== "gp.page.Search"){
        if (this.oOuterObj.isValidFieldName(this.getTableName(), sField)){
          vsCurValue= this.oOuterObj.getValue(this.getTableName(), sField);
        }
      }else if (this.oOuterObj.isValidFieldName(sField)){
          vsCurValue= this.oOuterObj.getValueByRowField(this.getOuterObjCurRowX(), sField);
      }else{
        if (DataTools.getTableRowCount(this.oOuterObj.getTableName())> 0){
          vsCurValue= DataTools.getValue(this.oOuterObj.getTableName(), this.getOuterObjCurRowX(), sField);
        }
      }
    }
  }
  return vsCurValue;
}
//----------------------------------------------------------------------
//private;
//return: String/null;
function ForeignBox_disposeValueSetValue(sValue){
  if (sValue== null) return null;
  var vsValue= sValue;
  if(vsValue.indexOf("<SPAN") != -1){
    var beg2 = vsValue.indexOf(">");
    var beg1 = vsValue.indexOf("\"");
    var beg3 = beg1 + 1;
    var lengtht = beg2 - beg1 - 2;
    vsValue = vsValue.substr(beg3,lengtht);
  }
  return vsValue;
}
//----------------------------------------------------------------------
//private;
//return: void;
function ForeignBox_fillValue(sField, sValue){
  if (sField== null) return;
  if (sValue== null) return;
  var voObj= this.oOuterObj;
  if (voObj== null) return;

  //Normal 特殊处理;Normal可以一表多Normal,所以要特处.
  var vaoNormal= null;
  if (PageX.isNormal(voObj)){
    vaoNormal= PageX.getAreaNormal(voObj.getTableName());
  }
  //Normal 特殊处理;Normal可以一表多Normal,所以要特处.
  if (vaoNormal!= null){
    for (var i= 0; i< vaoNormal.length; i++){
      voObj= vaoNormal[i];
      if (voObj== null) continue;
      if (voObj.isValidFieldName(sField)){
        voObj.setValueByRowField(this.getOuterObjCurRowX(), sField, sValue);
      }else{
        DataTools.setValue(voObj.getTableName(), this.getOuterObjCurRowX(), sField, sValue);
      }
    }
  }else{
    if (voObj!= null && voObj.CLASSNAME== "gp.page.Search"){
      var vtAnswerOnChange= this.tAnswerOnChange;
      this.tAnswerOnChange= false;
      voObj.setValue(this.getTableName(), sField, sValue);
      this.tAnswerOnChange= vtAnswerOnChange;
    }else if (voObj!= null){
      if (voObj.isValidFieldName(sField)){
        voObj.setValueByRowField(this.getOuterObjCurRowX(), sField, sValue);
      }else{
        DataTools.setValue(this.getTableName(), this.getOuterObjCurRowX(), sField, sValue);
      }
    }
  }
}
//----------------------------------------------------------------------
//private; 是否树形显示，wantm;
//return: 是树:true;否则:false;
function ForeignBox_isTreeView(){
  var vtIsTree= PF.parseBool(this.oForeign.getAttribute("istreeview"));
  return vtIsTree;
}
//----------------------------------------------------------------------
//private; 外部实体的TAB_REF_NAME的值，chupp;
//return;
function ForeignBox_getTabRefName(){
  var vsTabRefName= this.oForeign.getAttribute("tabrefname");
  if (vsTabRefName== "null" || vsTabRefName== "undefined") vsTabRefName= "";
  return vsTabRefName;
}
//----------------------------------------------------------------------
//private; 填入空行;
//return: void;
function ForeignBox_fillBlankRow(tIsClearSelfField){
  //alert("ForeignBox_fillBlankRow");
  if (tIsClearSelfField== null) tIsClearSelfField= true;
  var voForeignFields= this.oForeign.selectSingleNode("fields");
  if (voForeignFields== null) return;
  for (var i= 0; i< voForeignFields.childNodes.length; i++){
    var vsName= voForeignFields.childNodes[i].getAttribute("name");
    if (this.oNoClearFieldsMap.isContain(vsName)) continue;
    if (vsName== this.getFieldName()){
      if (tIsClearSelfField== false) continue;
      if (this.isClearInput()== false) continue;
    }
    this.fillValue(vsName, "");
  }
}
//----------------------------------------------------------------------
//public; 输入内容后,是否调用 select 方法,进行外部实体检查,显示外部实体窗口.
//return: void;
function ForeignBox_setStrictInput(tIsStrict){
  this.oOuterPanel.isstrictinput= tIsStrict;
}
//----------------------------------------------------------------------
//public; 输入内容后,是否调用 select 方法,进行外部实体检查,显示外部实体窗口.
//return: true / false;
function ForeignBox_isStrictInput(){
  return PF.parseBool(this.oOuterPanel.isstrictinput);
}
//----------------------------------------------------------------------
//public; 输入内容后,是否调用 select 方法,进行外部实体检查,显示外部实体窗口.
//return: void;
function ForeignBox_setClearInput(tIsClear){
  this.oOuterPanel.isclearinput= tIsClear;
}
//----------------------------------------------------------------------
//public; 输入内容后,是否调用 select 方法,进行外部实体检查,显示外部实体窗口.
//return: true / false;
function ForeignBox_isClearInput(){
  return PF.parseBool(this.oOuterPanel.isclearinput);
}
//----------------------------------------------------------------------
//public;
//return: true / false;
function ForeignBox_isAutoFillData(){
  return PF.parseBool(this.oOuterPanel.isautofilldata);
}
//----------------------------------------------------------------------
//public;
//return: void;
function ForeignBox_setAutoFillData(tIsAutoFillData){
  this.oOuterPanel.isautofilldata= tIsAutoFillData;
}
//----------------------------------------------------------------------
//public;
//return: true / false;
function ForeignBox_isBoxCondDisabled(){
  return PF.parseBool(this.oOuterPanel.isboxconddisabled);
}
//----------------------------------------------------------------------
//public;
//return: void;
function ForeignBox_setBoxCondDisabled(tIsBoxCondDisabled){
  this.oOuterPanel.isboxconddisabled= tIsBoxCondDisabled;
}
//----------------------------------------------------------------------
//public;
function ForeignBox_getUserCond(){
  return this.oOuterPanel.usercond;
}
//----------------------------------------------------------------------
//public;
//return: void;
function ForeignBox_setUserCond(sUserCond){
  this.oOuterPanel.usercond= sUserCond;
}
//----------------------------------------------------------------------
//public;
function ForeignBox_getBeforeCond(){
  return this.sBeforeCond;
}
//----------------------------------------------------------------------
//public;
//return: void;
function ForeignBox_setBeforeCond(sCond){
  this.sBeforeCond= sCond;
}
//----------------------------------------------------------------------
//public;
function ForeignBox_getSearchedFields(){
  if (PF.isEmpty(this.oOuterPanel.searchedfields)) return null;
  return this.oOuterPanel.searchedfields.split(";");
}
//----------------------------------------------------------------------
//public;
function ForeignBox_isFuzzyMatch(){
  return PF.parseBool(this.oOuterPanel.isfuzzymatch);
}
//----------------------------------------------------------------------
//public;
function ForeignBox_isAllCheckVisible(){
  return PF.parseBool(this.oOuterPanel.isallcheckvisible);
}
//----------------------------------------------------------------------
//public;
function ForeignBox_setAllCheckVisible(value){
  return this.oOuterPanel.isallcheckvisible= value;
}
//----------------------------------------------------------------------
//private; 编辑框的内容发生改变
//return: void;
function ForeignBox_synchFKFieldValue(){
  if (this.oForeign== null) return;
  var voForignField= this.oForeign.selectSingleNode("fields/field[@isfk='true']");
  if (voForignField== null) return "";
  var vsFKfield= voForignField.getAttribute("name");
  if (vsFKfield== this.getFieldName()) return;
  if (this.oOuterObj== null) return;
  if (this.isStrictInput() == false) return;
  
  var voFKBox= this.oOuterObj.getEditBox(vsFKfield);
  if (voFKBox!= null){
    var vtIsFire= voFKBox.isFireOnChange();
    voFKBox.setFireOnChange(false);
    voFKBox.setValue(this.getValue());
    voFKBox.setFireOnChange(vtIsFire);
  }
  DataTools.setValue(this.getTableName(), this.getOuterObjCurRowX(), vsFKfield, this.getValue());
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//private; 编辑框的内容发生改变
//return: void;
function ForeignBox_eventAnswer_OnChange(oSender, sValue, oEvent){
	var voBox = this;
  if (voBox.tAnswerOnChange== false) return;
  voBox.synchFKFieldValue();
  voBox.fireSelect();
}
//----------------------------------------------------------------------
//private; 编辑框的内容发生改变
//return: void;
function ForeignBox_fireSelect(){
  if (this.tAnswerOnChange== false) return;
  this.tAnswerOnChange= false;
  var vsValue= this.getValue();
  if (PF.isEmpty(vsValue)){
    this.oInputBox.value= "";
    this.fillBlankRow(true);
    this.tAnswerOnChange= true;
    return;
  }
  if (this.oOuterObj== null) return;
  var vsXmlValue= DataTools.getValue(this.getTableName(), this.getOuterObjCurRowX(), this.getFieldName());
  var vsOldValue= this.sOldValue;
  if (vsOldValue== vsValue && vsValue== vsXmlValue){
    this.tAnswerOnChange= true;
    return;
  }
  if (this.oForeign== null) return;
  var voEffectFields= this.oForeign.selectSingleNode("effectfields");
  if (voEffectFields== null){
    this.tAnswerOnChange= true;
    return;
  }

  // var vsCondition = this.getCondition(true, true); //chupp; level_ctrl;
    var vsInputValue = this.oInputBox.value;
    var vsCondition = this.getInputCondition(vsInputValue,true,true);
  
  var vaxxsData= this.selectExactMatch(vsCondition);
  var voForignField= this.oForeign.selectSingleNode("fields/field[@isfk='true']");

  // 如果有准确值，填入并触发事件;
  if (vaxxsData!= null && vaxxsData.length== 2 && voForignField!= null ){ //chupp
    this.fillOneRow(vaxxsData[0], vaxxsData[1]);
  }else{
    if (this.isStrictInput()){
	  	this.fillBlankRow();
      if (vaxxsData== null || vaxxsData.length< 2){
        if (!this.oNoClearFieldsMap.isContain(this.getFieldName())){
          if (this.isClearInput()) this.oInputBox.value= "";
        }
      }
      this.oSelectButton.fireEvent("onmouseup");
    }
  }

  this.tAnswerOnChange= true;
  return;
}
//----------------------------------------------------------------------
//private; 选择按钮被点击
//return: void;
function ForeignBox_button_mouseup(){
  var voBox = this.oOwner;
  if (!voBox || voBox.isReadOnly()) return;
  var vsCondition = voBox.getCondition();
  voBox.selectK(vsCondition);

  //事件快速响应通道,仅供继承类使用;
  if (PF.isExistMethodK(this.eventAnswer_OnButtonClick)){
    voBox.eventAnswer_OnButtonClick(voBox, event);
  }
  voBox.fireEvent(voBox.OnButtonClick, new Array(voBox, event));
  return;
}
//----------------------------------------------------------------------
//private; 上下光标键为打开外部实体选择框;
//返回值: void
function ForeignBox_eventAnswer_OnKeyDown(){
/*
  if ((vkKey >= 48 and <=57) || (vkKey >= 65 and <=90)){
		this.isUpdatedByKeyBoard = true;
  	return;
  }
*/
  switch(event.keyCode){
    case 123: //F12;
      this.oSelectButton.fireEvent("onmouseup");
      break;
   	case 13:
   		try{
   			this.oSelectButton.focus();//触发onchange事件
   		}catch(e){
   		}
   		if (!this.isInGrid){
		  	if (event.shiftKey){
		  		PageX.focusPreviousBox(this.sid);
		  	}else{
					PageX.focusNextBox(this.sid);
				}
   		}
  }
  return;
}

//----------------------------------------------------------------------
//private; 外部实体选择框是否添加新增按钮;
//返回值: 添加为Y，默认为N，不添加
function ForeignBox_getIsAdd(){
  var tabId= this.getTableName();
  var fRefName= this.oForeign.getAttribute("name");
  if (fRefName == "") return "N";
  var names = new Array();
  var values = new Array();
  names[0] = "tabId";
  values[0] = tabId;
  names[1] = "fRefName";
  values[1]= fRefName;
  var voData = PageX.getRuleDeltaXML("gmap-common.ifAddForeignAddBtn", names, values);
  if (voData == null) return "N";
  var voRes = voData.getElementsByTagName("field");
  if(voRes == null || voRes.length == 0) return "N";
  var result = voRes.item(0).getAttribute("value");
  if(result == null || result == "") return "N" ;
  return result;
}
//----------------------------------------------------------------------

function ForeignBox_release() {
	var selectButton = this.oSelectButton;
	if (selectButton != null) {
		selectButton.oOwner = null;
		selectButton.onmouseup = null;
		selectButton.onfocus = null;
		selectButton.onblur = null;
	}
	TextBox_release.call(this);
}

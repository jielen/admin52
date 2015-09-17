/*
Title: gp.page.RowManager
Description:
行管理器类,用于对 XML 中行的变化进行记录;提供向数据库提供保存的所需信息.
本类在使用中;
Company: 用友政务
Author:zhangcheng; leidh;

      <rowset>
        <row id="0123456789">
          <Col1>B11</Col1>
          <Col2>B02</Col2>
          <Col3>B03</Col3>
          <Col4>B04</Col4>
        </row>
        <row>
          <Col1>B21</Col1>
          <Col2>B02</Col2>
          <Col3>B03</Col3>
          <Col4>B04</Col4>
        </row>
        ......
      </rowset>

setValidChanged(tIsValid)
isValidChanged()
用于设置更改是否为有效的更改。
作用如下：
var voRM= PageX.getRowManager();
voRM.setValidChanged(false);
则以前所有所做的更改被标记为无效更改，以后的更改也无效。这时，调用
voRM.isChanged()== false
也就是说，不论前面是否做过更改，voRM.isChanged()== false；
然后设置
voRM.setValidChanged(true);
则从这句之后，所有的更改为有效更改。
如果发生了更改，然后再调用
voRM.isChanged()== true

setValidChanged(tIsValid) 不会对 RowManager 的记录工作造成任何影响。
只是对所记录的更改标记为无效或有效。
voRM.setValidChanged(false) 之后，以前的所有更改为无效更改，以后的也为无效更改。
voRM.setValidChanged(true) 之后，对以前的更改是否有效没有影响，以后的发生更改时则所有更改标记为有效。
*/

//----------------------------------------------------------------------
function RowManager(){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.RowManager";

  this.ACTION_NONE= "none";
  this.ACTION_INSERT= "insert";
  this.ACTION_DELETE= "delete";
  this.ACTION_UPDATE= "update";

  this.RE_ROW_1= /<row /g;
  this.RE_ROW_2= /<\/row>/g;

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.

  this.oChangedMap= new Map();        //private; 所有变更的记录.每个元素是一个表的记录.
  this.oPKFieldMap= new Map();        //private; 指定表中的 PK field array;
  this.oActionMap= new Map();

  this.tAllowInsert= true;
  this.tAllowDelete= true;
  this.tAllowUpdate= true;
  this.tIsValidChanged= true;        //private; 表示行管理器所记录到的改变是有效的.
  this.tIsHappenValidChanged= false; //private; 发生了有效的改变;
  this.tHasInit= false;//对象是否完成初始化的标记;
  //for PageX.rewriteToList() parameters;
  this.sMainTableOldValue= null; //private;
  this.sMainTableAction= this.ACTION_NONE; //private;

  //保存时业务处理类及参数;
  this.sDoBusiClassName= "";
  this.sDoBusiParams= "";

  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.clear= RowManager_clear;
  this.clearAll= RowManager_clearAll;
  this.getAllRecord= RowManager_getAllRecord;
  this.getTableRecord= RowManager_getTableRecord;
  this.init= RowManager_init;
  this.isChanged= RowManager_isChanged;
  this.isTableChanged= RowManager_isTableChanged;
  this.isValidAction= RowManager_isValidAction;
  this.record= RowManager_record;
  this.recordAllRows= RowManager_recordAllRows;
  this.recordTableRows= RowManager_recordTableRows;
  //以上已完成文档

  this.isValidChanged= RowManager_isValidChanged;
  this.setValidChanged= RowManager_setValidChanged;
  this.updateAction= RowManager_updateAction;
  this.restoreAction= RowManager_restoreAction;
  this.clearAction= RowManager_clearAction;
  this.setDoBusinessOnSave= RowManager_setDoBusinessOnSave;

  //private;
  this.initXmlListen= RowManager_initXmlListen;
  this.recordOnEvent= RowManager_recordOnEvent;
  this.makeRecord= RowManager_makeRecord;
  this.makePageDataRowId= RowManager_makePageDataRowId;
  this.makeOldValue= RowManager_makeOldValue;
  this.makeNewValue= RowManager_makeNewValue;
  this.makeTableNewValue= RowManager_makeTableNewValue;
  this.getChangedRecord= RowManager_getChangedRecord;
  this.getRecord= RowManager_getRecord;
  this.isDeleteFromParent= RowManager_isDeleteFromParent;
  this.getTableMap= RowManager_getTableMap;
  //this.isRunning= RowManager_isRunning;
  this.setRunning= RowManager_setRunning;
  this.getCompoAddInfo= RowManager_getCompoAddInfo;
  //this.makeTableRowIdKey= RowManager_makeTableRowIdKey;
  this.getTableAddInfo= RowManager_getTableAddInfo;
  this.tHasInit= true;
}
//----------------------------------------------------------------------
//5.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function RowManager_init(){
  if (this.tHasInit) return true;
  this.initXmlListen();
  this.tHasInit= true;
  return true;
}
//----------------------------------------------------------------------
//private; 事侦听初始化;
//return: void;
function RowManager_initXmlListen(){
  var vasTable= DataTools.getAllTableNames();
  var voDataXml= null;
  for (var i= 0; i< vasTable.length; i++){
    voDataXml= DataTools.getDataXML(vasTable[i]);
    if (voDataXml== null) continue;
  }
}
//----------------------------------------------------------------------
//private; 当事件发生时,记录 XML data 的一次改变;
//如果是父表删除引起的本表的删除,则不用记录;
//params: iRow: 从 0 开始;
//返回值: 成功: true; 否则: false;
function RowManager_recordOnEvent(sTable, sAction){
  if (this.tHasInit== false) return false;
  if (sTable== null){
    this.setRunning(false);
    return false;
  }
  if (sAction== this.ACTION_INSERT && this.tAllowInsert== false) return;
  if (sAction== this.ACTION_UPDATE && this.tAllowUpdate== false) return;
  if (sAction== this.ACTION_DELETE && this.tAllowDelete== false) return;
  
  var voRecordSet= event.recordset;
  if (voRecordSet== null) return false;
  var viRow= voRecordSet.AbsolutePosition- 1;
  if (sAction== this.ACTION_DELETE && this.isDeleteFromParent(sTable, viRow)) return true;
  var vtRet= this.record(sTable, viRow, sAction);
  if (vtRet){
    PageX.tIsChanged= true;
    if (this.isValidChanged()){
      this.tIsHappenValidChanged= true;
    }
  }
  return vtRet;
}
//----------------------------------------------------------------------
//private; 当事件发生时, 判断本次的删除动作是否是由父表的删除而触发;
//返回值: 成功: true; 否则: false;
function RowManager_isDeleteFromParent(sTableName, iRow){
  if (this.tHasInit== false) return false;
  var vsCompoName= DataTools.getCompoNameByTable(sTableName);
  var vsMainTable= DataTools.getMainTableName(vsCompoName);
  if (sTableName== vsMainTable) return false;
  var voCompoMeta= DataTools.getCompoMeta(vsCompoName);
  voTable= voCompoMeta.selectSingleNode("//tables//table[@name='"+ sTableName+ "']");
  var voPTable= voTable.parentNode;
  var vsPTableName= voPTable.getAttribute("name");
  var vasKeyField= DataTools.getKeyFieldNames(vsPTableName);
  var vaoRow= DataTools.getFieldValues(sTableName, new Array(""+ iRow), vasKeyField);
  var voMap= vaoRow[0];
  var vsField= "";
  var vsValue= "";
  var vsSearch= "[";
  for (var i= 0; i< vasKeyField.length; i++){
    vsField= vasKeyField[i];
    vsValue= voMap.get(vsField);
    vsSearch+= vsField+ "='"+ vsValue+ "'";
    if (i< vasKeyField.length- 1) vsSearch+= " and ";
  }
  vsSearch+= "]";
  var voPRow= DataTools.getTableData(vsPTableName).selectSingleNode("rowset/row"+ vsSearch);
  if (voPRow== null) return true;
  return false;
}
//----------------------------------------------------------------------
//public; 记录 XML data 的一次改变;
//iRow: 从 0 开始;
//返回值: 成功: true; 否则: false;

//下面是一条行管理器记录的格式:
//如果action="insert", 虽不需要主键,但为 getRecordChangedRecord() 方法准备,所以要记录主键;
//如果action="delete", 则不需要 row 节点;
//如果action="update", 则都需要;
/*
  <record action="update">
    <oldvalue>
      <Col1>A01</Col1>
      <Col2>A02</Col2>
      <Col3>A03</Col3>
      <Col4>A04</Col4>
    </oldvalue>
    <newvalue>
      <Col1>A01</Col1>
      <Col2>A02</Col2>
      <Col3>A03</Col3>
      <Col4>A04</Col4>
    </newvalue>
  </record>
//*/
function RowManager_record(sTableName, iRow, sAction){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "record");
  if (PF.isEmpty(sTableName)) return false;
  if (this.isValidAction(sAction)== false) return false;
  if (DataTools.isValidRow(sTableName, iRow)== false) return false;

  var voTableMap= this.getTableMap(sTableName);
  var voRecord= this.getChangedRecord(sTableName, iRow);
  if (voRecord!= null){
    var vsOldAction= voRecord.sAction;
    if (vsOldAction== this.ACTION_DELETE){
      //象凭证中以行号为关键字时,会出现删除后再插入的现象;作为修改处理;
      if (sAction== this.ACTION_INSERT){
        voRecord.sAction= this.ACTION_UPDATE;
        return true;
      }
    }else if (vsOldAction== this.ACTION_INSERT){
      if (sAction== this.ACTION_DELETE){
        voTableMap.remove(voRecord.sKey);
        return true;
      }
    }else if (vsOldAction== this.ACTION_UPDATE){
      if (sAction== this.ACTION_DELETE){
        voRecord.sAction= sAction;
        return true;
      }else if(sAction == this.ACTION_UPDATE){
    	//debugger;
    	voTableMap.remove(voRecord.sKey);
    	voTableMap.put(voRecord.sKey, voRecord);
    	return true;
      }
    }
    return true;
  }

  var voRecord= this.makeRecord(sTableName, iRow, sAction);
  voTableMap.put(voRecord.sKey, voRecord);
  return true;
}
//----------------------------------------------------------------------
//private; 记录一个 XML 的改变; update;
//返回值: 成功: record node; 否则: null;
function RowManager_makeRecord(sTableName, iRow, sAction){
  var voRecord= new Object();
  voRecord.sTableName= sTableName;
  voRecord.sKey= this.makePageDataRowId(sTableName, iRow); //指向 PageDataXML 中的数据行;
  voRecord.sAction= sAction;
  voRecord.sOldValue= this.makeOldValue(sTableName, voRecord.sKey);
  voRecord.sNewValue= "";   //先不记,在获取 XML 文本时才统一处理;
  
  //从record()中挪到此处;20060519;
  if (voRecord!= null
      && sTableName== DataTools.getMainTableName()){
    this.sMainTableOldValue= voRecord.sOldValue;
    this.sMainTableAction= voRecord.sAction;
  }
  return voRecord;
}
//----------------------------------------------------------------------
//private; 在 PageDataXML 的 <row> 上加入 id 属性; 即: <row id="0123456789">
//返回值: 成功: id 值; 否则: null;
function RowManager_makePageDataRowId(sTableName, iRow){
  if (sTableName== null) return null;
  if (iRow== null) return null;
  var voRow= DataTools.getTableData(sTableName).selectSingleNode("rowset/row["+ iRow+ "]");
  var vsId= voRow.getAttribute("id");
  if (vsId!= null) return vsId;
  var voId= DataTools.getDataXML(sTableName).createAttribute("id");
  voId.value= PF.getUID();
  voRow.setAttributeNode(voId);
  return voId.value;
}
//----------------------------------------------------------------------
//private; 生成 <oldvalue>;
//返回值: 成功: oldvalue.xm; 否则: "";
function RowManager_makeOldValue(sTableName, sRowId){
  if (sTableName== null) return "";
  if (sRowId== null) return "";
  var voRow= DataTools.getTableData(sTableName).selectSingleNode("rowset/row[@id='"+ sRowId+ "']");
  var vsRowStr= voRow.xml;

  vsRowStr= vsRowStr.replace(this.RE_ROW_1, "<oldvalue ");
  vsRowStr= vsRowStr.replace(this.RE_ROW_2, "</oldvalue>");
  return vsRowStr;
}
//----------------------------------------------------------------------
//private; 生成 <newvalue>;
//返回值: 成功: newvalue.xm; 否则: "";
function RowManager_makeNewValue(sTableName, sRowId){
  if (sTableName== null) return "";
  if (sRowId== null) return "";
  var voRow= DataTools.getTableData(sTableName).selectSingleNode("rowset/row[@id='"+ sRowId+ "']");
  if (voRow== null){
    return "";
  }
  var vsRowStr= voRow.xml;
  vsRowStr= vsRowStr.replace(this.RE_ROW_1, "<newvalue ");
  vsRowStr= vsRowStr.replace(this.RE_ROW_2, "</newvalue>");
  return vsRowStr;
}
//----------------------------------------------------------------------
//private; 生成 指定表名的所有 Record 对象的 sRow;
//返回值: 成功: true; 否则: false;
function RowManager_makeTableNewValue(sTableName){
  if (PF.isEmpty(sTableName)) return false;
  var voTableMap= this.oChangedMap.get(sTableName);
  var vaoRecord= voTableMap.getAllItem();
  var voRecord= null;
  for (var j= 0, lenj= vaoRecord.length; j< lenj; j++){
    voRecord= vaoRecord[j];
    if (voRecord.sAction== this.ACTION_DELETE) continue;
    voRecord.sNewValue= this.makeNewValue(sTableName, voRecord.sKey);
  }
  return true;
}
//----------------------------------------------------------------------
//private; 获取 指定表中相关行的变更记录 record;
//return: 成功: record 节点对象; 否则: null;
function RowManager_getChangedRecord(sTableName, iRow){
  var voRow= DataTools.getTableData(sTableName).selectSingleNode("rowset/row["+ iRow+ "]");
  if (voRow== null) return null;
  var vsKey= voRow.getAttribute("id");
  if (vsKey== null) return null;
  var voTableMap= this.oChangedMap.get(sTableName);
  if (voTableMap== null) return null;
  var voRecord= voTableMap.get(vsKey);
  return voRecord;
}
//----------------------------------------------------------------------
//private;
//return: String / null;
function RowManager_getCompoAddInfo(){
  var voBuf= new StringBuffer();
  var vasCompoName= DataTools.oCompoMap.getAllKey();
  for (var i= 0; i< vasCompoName.length; i++){
    voAddMeta= DataTools.getCompoAdditionalMeta(vasCompoName[i]);
    
    //对一次性自动编号字段的处理;leidh;20060405;
    for (var j= 0; j< voAddMeta.childNodes.length; j++){
      var voTable= voAddMeta.childNodes[j];
      var vsOnceFields= voTable.getAttribute("onceautonumfields");
      if (PF.isEmpty(vsOnceFields)) continue;
      var vasField= vsOnceFields.split(",");
      if (!PF.isValidArray(vasField)) continue;
      
      var voOnceNumBuf= new StringBuffer();
      for (var k= 0; k< vasField.length; k++){
        if (k> 0) voOnceNumBuf.append(",");
        voOnceNumBuf.append(DataTools.getValue(voTable.getAttribute("name"), 0, vasField[k]));
      }
      voTable.setAttribute("onceautonums", voOnceNumBuf.toString());
    }
  
    voBuf.append(voAddMeta.xml);
    voBuf.append("\n");
  }
  return voBuf.toString();
}

function RowManager_getTableAddInfo(){
  var voBuf= new StringBuffer();
  voBuf.append("<digest>\n");
  var vasTableNames = DataTools.getAllTableNames();
  for (var i= 0; i< vasTableNames.length; i++){
    voAddMeta= DataTools.getTableAdditionalMeta(vasTableNames[i]);
    if(!voAddMeta) continue;
	
	var vaoSearch= PageX.getFreeManager().getSearchByTableName(vasTableNames[i]);
  	if (vaoSearch != null){
  		if(vaoSearch.length > 0){
  	  		voAddMeta.setAttribute("searchType", vaoSearch[0].searchType);
  		}
  	}
    
    var voTableData = DataTools.getTableData(vasTableNames[i]);
    if(voTableData != null){
    	var tmp = voTableData.selectSingleNode("/*/meta").getAttribute("condition");
    	if(tmp){
    		voAddMeta.setAttribute("condition", tmp); 
    	}
    	tmp = voTableData.selectSingleNode("/*/meta").getAttribute("searchCond");
    	if(tmp){
    		voAddMeta.setAttribute("searchCond", tmp); 
    	}
    	tmp = voTableData.selectSingleNode("/*/meta").getAttribute("userNumLimCondition");
    	if(tmp){
    		voAddMeta.setAttribute("userNumLimCondition", tmp); 
    	}
    	tmp = voTableData.selectSingleNode("/*/meta").getAttribute("digest");
    	if(tmp){
    		voAddMeta.setAttribute("digest", tmp); 
    	}
    	tmp = voTableData.selectSingleNode("/*/meta").getAttribute("fromrow");
    	if(tmp){
    		voAddMeta.setAttribute("fromrow", tmp); 
    	} 
    	tmp = voTableData.selectSingleNode("/*/meta").getAttribute("torow");
    	if(tmp){
    		voAddMeta.setAttribute("torow", tmp); 
    	}    
    }
          
    //对一次性自动编号字段的处理;
    var vsOnceFields= voAddMeta.getAttribute("onceautonumfields");
    if (PF.isEmpty(vsOnceFields)){
    	voBuf.append(voAddMeta.xml);
    	voBuf.append("\n");
    	continue;
    }
    var vasField= vsOnceFields.split(",");
    if (!PF.isValidArray(vasField)){
    	voBuf.append(voAddMeta.xml);
    	voBuf.append("\n");	
    	continue;
    }
     
    var voOnceNumBuf= new StringBuffer();
    for (var k= 0; k< vasField.length; k++){
      if (k> 0) voOnceNumBuf.append(",");
      voOnceNumBuf.append(DataTools.getValue(voAddMeta.getAttribute("name"), 0, vasField[k]));
    }
    voAddMeta.setAttribute("onceautonums", voOnceNumBuf.toString());
  	voBuf.append(voAddMeta.xml);
    voBuf.append("\n");
  }
  voBuf.append("</digest>\n");
  return voBuf.toString();
}

//----------------------------------------------------------------------
//public; 生成 所有记录的内容;以 XML 的格式给出;
//返回值: 成功: XML text; 否则: null;
function RowManager_getAllRecord(){
  //alert("RowManager_getAllRecord();");
  var vasTableName= this.oChangedMap.getAllKey();
  var vsTableName= "";
  var voStringB= new StringBuffer();
  voStringB.append("<data>\n");
  voStringB.append(this.getTableAddInfo());////
  for (var i= 0, len= vasTableName.length; i< len; i++){
    vsTableName= vasTableName[i];
    if (vsTableName== null) continue;
    voStringB.append(this.getTableRecord(vsTableName));
  }
  voStringB.append("<dobusinessonsave classname=\"").append(this.sDoBusiClassName).append("\">");
  //voStringB.append(PF.xmlToText(this.sDoBusiParams));
  voStringB.append(PF.wraptWithCDATA(this.sDoBusiParams));
  voStringB.append("</dobusinessonsave>\n");
  voStringB.append("</data>\n");

  return voStringB.toString();
}
//----------------------------------------------------------------------
//public; 获取 记录的内容;以 XML 的格式给出;
//return: 成功: XML text; 否则: null;
function RowManager_getTableRecord(sTableName){
  var voTableMap= this.oChangedMap.get(sTableName);
  if (voTableMap== null) return null;
  if (this.makeTableNewValue(sTableName)== false) return null;

  var vaoRecord= voTableMap.getAllItem();
  var voStringB= new StringBuffer();
  var voStringDelete = new StringBuffer();
  var voStringUpdate = new StringBuffer();
  var voStringInsert = new StringBuffer();
  
  var metaNode = DataTools.getTableData(sTableName).selectSingleNode("/*/meta");
  var isencryptdata = metaNode.getAttribute("isencryptdata");
  voStringB.append("<table name=\""+ sTableName+ "\" isencryptdata=\"" + isencryptdata + "\">\n");
  for (var i= 0, len= vaoRecord.length; i< len; i++){
	var tmpRecord = vaoRecord[i];
	if(tmpRecord.sAction == this.ACTION_INSERT){
	  voStringInsert.append(this.getRecord(tmpRecord));
	}else if(tmpRecord.sAction == this.ACTION_UPDATE){
	  voStringUpdate.append(this.getRecord(tmpRecord));
	}else if(tmpRecord.sAction == this.ACTION_DELETE){
	  voStringDelete.append(this.getRecord(tmpRecord));
	}
  }
  var voStringBuffer= new StringBuffer();
  voStringBuffer.append(voStringDelete.toString());
  voStringBuffer.append(voStringUpdate.toString());
  voStringBuffer.append(voStringInsert.toString());
  if(isencryptdata && isencryptdata == "true"){
	  voStringB.append(PF.wraptWithCDATA(Base64.encodeHex(voStringBuffer.toString())));
  }else{
	  voStringB.append(voStringBuffer.toString());
  }
  voStringB.append("</table>\n");
  return voStringB.toString();
}
//----------------------------------------------------------------------
//private; 获取 记录的内容;以 XML 的格式给出;
//return: 成功: XML text; 否则: null;
function RowManager_getRecord(oRecord){
  if (oRecord== null) return null;
  var voStringB= new StringBuffer();
  voStringB.append("<record action='").append(oRecord.sAction);
  voStringB.append("' rowid='").append(oRecord.sKey);
  voStringB.append("'>\n");
  if (oRecord.sAction== this.ACTION_UPDATE
      || oRecord.sAction== this.ACTION_DELETE){
    voStringB.append(oRecord.sOldValue+ "\n");
  }
  if (oRecord.sAction== this.ACTION_UPDATE
      || oRecord.sAction== this.ACTION_INSERT){
    if (PF.trim(oRecord.sNewValue)== "") return "";
    voStringB.append(oRecord.sNewValue+ "\n");
  }
  voStringB.append("</record>\n");
  return voStringB.toString();
}
//----------------------------------------------------------------------
//public; 清理指定表名的记录内容;
//返回值: void;
function RowManager_clear(sTableName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "clear");
  var voTableMap= this.oChangedMap.get(sTableName);
  if (voTableMap== null) return;
  voTableMap.clear();
  this.oChangedMap.remove(sTableName);
  this.setRunning(false);
  return;
}
//----------------------------------------------------------------------
//public; 清理所有记录的内容;
//返回值: void;
function RowManager_clearAll(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "clearAll");
  var vasTableName= this.oChangedMap.getAllKey();
  var vsTableName= "";
  for (var i= 0, len= vasTableName.length; i< len; i++){
    vsTableName= vasTableName[i];
    if (vsTableName== null) continue;
    this.clear(vsTableName);
  }
  this.setRunning(false);
  return;
}
//----------------------------------------------------------------------
//public; 是否发生了改变;
//返回值: 发生了改变: true, 否则: false;
function RowManager_isChanged(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isChanged");
  if (this.tIsHappenValidChanged== false) return false;
  var vasTable= this.oChangedMap.getAllKey();
  for (var i= 0; i< vasTable.length; i++){
    var voTableMap= this.oChangedMap.get(vasTable[i]);
    if (voTableMap!= null && voTableMap.size()> 0) return true;
  }
  return false;
}
//----------------------------------------------------------------------
//public; 是否发生了改变;
//返回值: 发生了改变: true, 否则: false;
function RowManager_isTableChanged(sTableName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "isChanged");
  var voTableMap= this.oChangedMap.get(sTableName);
  if (voTableMap== null) return false;
  if (voTableMap.size()== 0) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 将一个 XML 数据对象的所有行作为 insert 改变进行记录;
//返回值: 成功: true; 否则: false;
function RowManager_recordAllRows(sAction){
  if (this.isValidAction(sAction)== false) return false;
  var vasTable= DataTools.getTableNames();
  for (var i= 0; i< vasTable.length; i++){
    this.recordTableRows(vasTable[i], sAction);
  }
  return true;
}
//----------------------------------------------------------------------
//public; 将一个 XML 数据对象的所有行作为 insert 改变进行记录;
//返回值: 成功: true; 否则: false;
function RowManager_recordTableRows(sTableName, sAction, aiRow){
  if (sTableName== null || sTableName.length== 0) return false;
  if (this.isValidAction(sAction)== false) return false;

  var voTableData= DataTools.getTableData(sTableName);
  if (voTableData== null || voTableData.length== 0) return false;
  var voRowSet= voTableData.selectSingleNode("rowset");
  var voTableMap= this.getTableMap(sTableName);

  if (aiRow== null){
    aiRow= new Array();
    for (var j= 0, len= voRowSet.childNodes.length; j< len; j++){
      aiRow[j]= j;
    }
  }

  for (var j= 0, len= aiRow.length; j< len; j++){
    var voRecord= this.makeRecord(sTableName, aiRow[j], sAction);
    voTableMap.put(voRecord.sKey, voRecord);
  }

  PageX.tIsChanged= true;
  if (this.isValidChanged()){
    this.tIsHappenValidChanged= true;
  }
  return true;
}
//----------------------------------------------------------------------
//public; 判断一个动作参数是否有效;
//返回值: 成功: true; 否则: false;
function RowManager_isValidAction(sAction){
  if (sAction!= this.ACTION_INSERT
      && sAction!= this.ACTION_DELETE
      && sAction!= this.ACTION_UPDATE) return false;
  return true;
}
//----------------------------------------------------------------------
//private; 获取 table map object;
//返回值: 成功: table map object; 否则: table map object;
function RowManager_getTableMap(sTableName){
  sTableName= PF.trim(sTableName);
  if (PF.isEmpty(sTableName)) return null;
  var voTableMap= this.oChangedMap.get(sTableName);
  if (voTableMap== null){
    voTableMap= new Map();
    this.oChangedMap.put(sTableName, voTableMap);
  }
  return voTableMap;
}
//----------------------------------------------------------------------
//private; 设置 Running State;
//返回值: Running: true; 否则: false;
function RowManager_setRunning(tIsRunning){
  var voDM= PageX.getDataManager();
  if (voDM!= null) voDM.setRunning(tIsRunning);
}
//----------------------------------------------------------------------
//public; 表示行管理器所记录到的改变是有效的.此参数并不影响行管理器对改变的记录功能;
//return: void;
function RowManager_isValidChanged(){
  return this.tIsValidChanged;
}
//----------------------------------------------------------------------
//public; 表示行管理器所记录到的改变是有效的.此参数并不影响行管理器对改变的记录功能;
//return: void;
function RowManager_setValidChanged(tIsValid){
  var vtIsValid= PF.parseBool(tIsValid);;
  this.tIsValidChanged= vtIsValid;
  if (vtIsValid== false) this.tIsHappenValidChanged= false;
}
//----------------------------------------------------------------------
//public;
//return: 动作状态备份的 key 值,此值可用来恢复原有状态或清除备份状态;
function RowManager_updateAction(tAllowInsert, tAllowDelete, tAllowUpdate){
  if (tAllowInsert== null) tAllowInsert= true;
  if (tAllowDelete== null) tAllowDelete= true;
  if (tAllowUpdate== null) tAllowUpdate= true;

  var vsKey= PF.getUID();
  var voAction= new Object();
  voAction.tAllowInsert= this.tAllowInsert;
  voAction.tAllowDelete= this.tAllowDelete;
  voAction.tAllowUpdate= this.tAllowUpdate;
  this.oActionMap.put(vsKey, voAction);

  this.tAllowInsert= PF.parseBool(tAllowInsert);
  this.tAllowDelete= PF.parseBool(tAllowDelete);
  this.tAllowUpdate= PF.parseBool(tAllowUpdate);
  return vsKey;
}
//----------------------------------------------------------------------
//public;
//return: void;
function RowManager_restoreAction(sKey){
  var voAction= this.oActionMap.get(sKey);
  if (voAction== null) return;
  this.tAllowInsert= voAction.tAllowInsert;
  this.tAllowDelete= voAction.tAllowDelete;
  this.tAllowUpdate= voAction.tAllowUpdate;
}
//----------------------------------------------------------------------
//public;
//return: void;
function RowManager_clearAction(sKey){
  var voAction= this.oActionMap.get(sKey);
  if (voAction== null) return;
  voAction= null;
  this.oActionMap.remove(sKey);
}
//----------------------------------------------------------------------
function RowManager_setDoBusinessOnSave(sClassName, sParameters){
  this.sDoBusiClassName= sClassName;
  this.sDoBusiParams= sParameters;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//6.事件响应区 =function();
//----------------------------------------------------------------------
//----------------------------------------------------------------------


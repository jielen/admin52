/*
Title: gp.pub.DataTools4
Description:
DataTools4 类，用于封装对页面数据的访问.
Company: 用友政务
Author:leidh
*/

//----------------------------------------------------------------------
//声明页面中的全局对象;
var DataTools= new DataTools4();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function DataTools4(){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.pub.DataTools4";

  this.RS_BOOK_MARK_CURRENT= 0;
  this.RS_BOOK_MARK_FIRST= 1;
  this.RS_BOOK_MARK_LAST= 2;

  this.DATA_TYPE_TEXT= "TEXT";
  this.DATA_TYPE_NUM= "NUM";
  this.DATA_TYPE_DATE= "DATE";
  this.DATA_TYPE_DATETIME= "DATETIME";
  this.DATA_TYPE_BLOB= "BLOB";
  this.DATA_TYPE_SEQ= "SEQ";
  this.DATA_TYPE_LABEL= "LABEL";

  this.LAN_TRANS_TABLE_NAME= "ASLANTRANS";
  this.PAGEDATA_DIGEST_SPAN_ID= "PageData_Digest_Span";

  this.DATA_VALID= 0;
  this.DATA_EMPTY= -1;
  this.DATA_EXCEPTION= -2;

  //3.变量声明区 =function();
  this.oTableMetaMap= new Map();   //private;
  this.oRSFieldMap= new Map();     //private; Map 中有 Map;
  this.oDataSourceFrame= window;   //private;
  
  this.oCompoMap= new Map();       //private;
  this.oMainCompoMetaXml= null;    //private;
  this.oTableCompoMap= new Map();  //private;

  //table data 中 rowid 与 rowIndex 的映射;
  this.oTableRowIdMap= new Map();
  
  //5.方法声明区 =function();
  //public;
  this.addTableField= DataTools4_addTableField;
  this.clearTableData= DataTools4_clearTableData;
  this.emptyTableData= DataTools4_emptyTableData;
  this.fillRowDefaultValue= DataTools4_fillRowDefaultValue;
  this.fillRowId= DataTools4_fillRowId;
  this.getChildIndex= DataTools4_getChildIndex;
  this.getCompoMeta= DataTools4_getCompoMeta;
  this.getCompoMetaXML= DataTools4_getCompoMetaXML;
  this.getFieldColX= DataTools4_getFieldColX;
  this.getFieldValues= DataTools4_getFieldValues;
  this.getKeyFieldNames= DataTools4_getKeyFieldNames;
  this.getKeyFields= DataTools4_getKeyFields;
  this.getLevelTables= DataTools4_getLevelTables;
  this.getMainTableName= DataTools4_getMainTableName;
  this.getChildTableName=DataTools4_getChildTableName;
  this.getRecordset= DataTools4_getRecordset;
  this.getSessionXML= DataTools4_getSessionXML;
  this.getSV= DataTools4_getSV;
  this.getTableColCount= DataTools4_getTableColCount;
  this.getTableData= DataTools4_getTableData;
  this.getTableFieldMeta= DataTools4_getTableFieldMeta;
  this.getTableFieldNames= DataTools4_getTableFieldNames;
  this.getTableMeta= DataTools4_getTableMeta;
  this.getTableNames= DataTools4_getTableNames;
  this.getTableRowCount= DataTools4_getTableRowCount;
  this.getValue= DataTools4_getValue;
  this.getValueByRS = DataTools4_getValueByRS;
  this.setValueByRS = DataTools_setValueByRS;
  this.insertRow= DataTools4_insertRow;
  this.isValidField= DataTools4_isValidField;
  this.isValidRow= DataTools4_isValidRow;
  this.isValidXMLData= DataTools4_isValidXMLData;
  this.makeDefaultValue= DataTools4_makeDefaultValue;
  this.makeDefaultValueK= DataTools4_makeDefaultValueK;
  this.rowToMap= DataTools4_rowToMap;
  this.setValue= DataTools4_setValue;
  this.sortTableData= DataTools4_sortTableData;
  this.addTableToCompoMeta= DataTools4_addTableToCompoMeta;
  this.deleteTableFromCompoMeta= DataTools4_deleteTableFromCompoMeta;
  this.getDataXML= DataTools4_getDataXML;
  this.getDigest= DataTools4_getDigest;
  this.getFieldNames= DataTools4_getFieldNames;
  this.getNoFieldMap= DataTools4_getNoFieldMap;
  this.getTableDataId= DataTools4_getTableDataId;
  this.getTableFieldAttr= DataTools4_getTableFieldAttr;
  this.getTableMetaId= DataTools4_getTableMetaId;
  this.makeDefTableData= DataTools4_makeDefTableData;
  this.removeTableDataXml= DataTools4_removeTableDataXml;
  this.removeTableMetaXml= DataTools4_removeTableMetaXml;
  this.removeTableXml= DataTools4_removeTableXml;
  this.setDigest= DataTools4_setDigest;
  //以上已完成文档;
  
  this.setDefExpr= DataTools4_setDefExpr;
  this.getDefExpr= DataTools4_getDefExpr;
  this.getRowIndex= DataTools4_getRowIndex;
  this.getRowIdField= DataTools4_getRowIdField;
  this.insertData= DataTools4_insertData;
  this.getEffectField= DataTools4_getEffectField;
  this.getCompoTable= DataTools4_getCompoTable;
  this.getTableRows= DataTools4_getTableRows;
  this.getTableRows2= DataTools4_getTableRows2;
  this.sum= DataTools4_sum;
  this.isValidA2x= DataTools4_isValidA2x;
  this.a2xToMapRows= DataTools4_a2xToMapRows;
  this.rowsToA2x= DataTools4_rowsToA2x;
  this.deleteTableData= DataTools4_deleteTableData;
  this.getChildIndexs= DataTools4_getChildIndexs;
  this.getTableDelta= DataTools4_getTableDelta;
  this.getTableRowX= DataTools4_getTableRowX;
  this.addNodeAttr= DataTools4_addNodeAttr;
  this.getColValue= DataTools4_getColValue;
  this.setColValue= DataTools4_setColValue;
  this.getAllTableNames= DataTools4_getAllTableNames;
  this.getCompoAdditionalMeta= DataTools4_getCompoAdditionalMeta;
  this.getCompoNameByTable= DataTools4_getCompoNameByTable;
  this.getTableTotal= DataTools4_getTableTotal;
  this.getTableTotalXML= DataTools4_getTableTotalXML;
  this.getCompoMetaByTable= DataTools4_getCompoMetaByTable;
  this.getAllCompoNames= DataTools4_getAllCompoNames;
  this.getMainCompoName= DataTools4_getMainCompoName;
  this.getMainCompoMeta= DataTools4_getMainCompoMeta;
  this.getOrgPosiCode = DataTools4_getOrgPosiCode;
  this.getDBType= DataTools4_getDBType;
  this.loadTableDataXml= DataTools4_loadTableDataXml;
  this.loadTotalDataXml= DataTools4_loadTotalDataXml;
  this.getRowXByRowId= DataTools4_getRowXByRowId;
  this.getTableAdditionalMeta = DataTools4_getTableAdditionalMeta;
  
  //deprecated;  
  this.getCompoName= DataTools4_getCompoName;

  //private;
  this.initRSFieldMeta= DataTools4_initRSFieldMeta;
  this.getTableRowIndexs= DataTools4_getTableRowIndexs;
  this.regCompoMeta= DataTools4_regCompoMeta;
  this.regTableCompo= DataTools4_regTableCompo;
  this.loadTableDataXmlK= DataTools4_loadTableDataXmlK;
  this.getTableDataXML = DataTools4_getTableDataXML;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 从 XML Data 中获取指定表名的记录集;
//返回值: 成功: recordset, 失败: null;
function DataTools4_getRecordset(sTableName){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getRecordset");
  }
  var voDataXML= this.getDataXML(sTableName);
  var voRS= voDataXML.namedRecordset("", "rowset.row");

  this.initRSFieldMeta(sTableName, voRS);
  return voRS;
}
//----------------------------------------------------------------------
//private;
//返回值: void;
function DataTools4_initRSFieldMeta(sTableName, oRS){
  if (sTableName== null || sTableName.length== 0) return;
  if (oRS== null) return;
  if (this.oRSFieldMap.get(sTableName)== null){
    var voFieldMap= new Map();
    var voField= null;
    for (var i= 0, len= oRS.Fields.Count; i< len; i++){
      voField= oRS.Fields.item(i);
      voFieldMap.put(voField.Name, i);
    }
    this.oRSFieldMap.put(sTableName, voFieldMap);
  }
  return;
}
//----------------------------------------------------------------------
//public; 获取指定表名指定列名的列序号;
//返回值: 成功: 序号, 否则: -1;
function DataTools4_getFieldColX(sTableName, sFieldName){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getFieldColX");
  }
  var voFieldMap= this.oRSFieldMap.get(sTableName);
  if (voFieldMap== null) return -1;
  var viCol= voFieldMap.get(sFieldName);
  if (viCol== null) viCol= -1;
  return viCol;
}
//----------------------------------------------------------------------
//public; 从 XML Data 中判断是否存在某字段.
//返回值: 存在: true, 否则: false;
function DataTools4_isValidField(sTableName, sFieldName){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "isValidField");
  }
  var voFieldMap= this.oRSFieldMap.get(sTableName);
  if (voFieldMap== null) return false;
  return voFieldMap.isContain(sFieldName);
}
//----------------------------------------------------------------------
//public; 判断指定的行号是否有效.
//返回值:有效: true, 否则: false;
function DataTools4_isValidRow(sTableName, iRowIndex){
  if (sTableName== null) return false;
  if (iRowIndex== null) return false;
  if (iRowIndex< 0 || iRowIndex>= this.getTableRowCount(sTableName)) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 从 XML Data 中获取指定表名的数据行数;
//返回值: 存在: 行数, 否则: -1;
function DataTools4_getTableRowCount(sTableName){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getTableRowCount");
  }         
  var voTableData= this.getTableData(sTableName);
  if (voTableData== null) return -1;
  var voRowSetNode= voTableData.selectSingleNode("//rowset");
  if (voRowSetNode== null) return -1;
  return voRowSetNode.childNodes.length;
}
//----------------------------------------------------------------------
//public; 从 XML Data 中获取指定表名的数据列数;
//返回值: 存在: 列数, 否则: -1;
function DataTools4_getTableColCount(sTableName){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getTableRowCount");
  }

  var voTableData= this.getTableData(sTableName);
  var voRowNode= voTableData.selectSingleNode("//rowset/row");
  if (voRowNode== null) return -1;
  return voRowNode.childNodes.length;
}
//----------------------------------------------------------------------
//public; 在 XML Data 的 Recordset 中插入行.
//返回值:成功: 插入的行号,也是当前行号, 失败: -1;
function DataTools4_insertRow(sTableName, asFieldName, asValue, iRow, tIsFillDefaultValue){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "insertRow");
  }
  if (PF.isValidArray(asFieldName)
      && PF.isValidArray(asValue)
      && asFieldName.length!= asValue.length){
    Info.throws("asFieldName, asValue 参数无效!", this.CLASSNAME, "insertRow");
  }
  tIsFillDefaultValue= PF.parseBool(tIsFillDefaultValue);
  
  var voRS= this.getRecordset(sTableName);
  if (voRS== null) return -1;
  this.oTableRowIdMap.remove(sTableName);
  voRS.AddNew();

  var voRM= PageX.getRowManager();
  var vsRMKey= "";
  try{
    vsRMKey= voRM.updateAction(false, false, false);
    if (iRow!= null && iRow>= 0 && iRow < voRS.RecordCount){
      var voTableData= this.getTableData(sTableName);
      var voRowSetNode= voTableData.selectSingleNode("rowset");
      var voNewNode= voRowSetNode.lastChild;
      var voRefNode= voRowSetNode.childNodes[iRow];
      voRowSetNode.insertBefore(voNewNode, voRefNode);
    }else{
    	iRow= voRS.RecordCount- 1;
    }
  
    voRS.Move(iRow, this.RS_BOOK_MARK_FIRST);
    if (tIsFillDefaultValue) this.fillRowDefaultValue(sTableName, iRow);
    this.fillRowId(sTableName, iRow, iRow);
  
    voRS.Move(iRow, this.RS_BOOK_MARK_FIRST);
    if (PF.isValidArray(asFieldName) && PF.isValidArray(asValue)){
      for (var i= 0, len= asFieldName.length; i< len; i++){
        voRS.Update(asFieldName[i], asValue[i]);
      }
    }
    voRM.restoreAction(vsRMKey);
    voRM.clearAction(vsRMKey);
  }catch(e){
    voRM.restoreAction(vsRMKey);
    voRM.clearAction(vsRMKey);
    alert(e);
  }
  return iRow;
}
//----------------------------------------------------------------------
//public; 获取指定表;
//return: table node/ null;
function DataTools4_getCompoTable(sTableName){
  var voTable= null;
  var voCompoMeta= DataTools.getCompoMeta();
  if (voCompoMeta!= null){
    voTable= voCompoMeta.selectSingleNode("tables//table[@name='"+ sTableName+ "']");
  }
  return voTable;
}
//----------------------------------------------------------------------
//public; 获取字段;
//return: fieldname / null;
function DataTools4_getEffectField(sTableName){
  var voTable= this.getCompoTable(sTableName);
  if (voTable== null) return "";
  var vsEffectField= PF.trim(voTable.getAttribute("effectfield"));
  return vsEffectField;
}
//----------------------------------------------------------------------
//public; 获取行号字段;
//return: fieldname / null;
function DataTools4_getRowIdField(sTableName){
  var vsEffectField= this.getEffectField(sTableName);
  var voTableMeta= this.getTableMeta(sTableName);
  var voField= voTableMeta.selectSingleNode("fields/field[@isrowid='true' and @name!='"+ vsEffectField+ "']");
  var vsRowIdField= null;
  if (voField!= null){
    vsRowIdField= voField.getAttribute("name");
  }
  return vsRowIdField;
}
//----------------------------------------------------------------------
//public; 在 PageDataXML 的 Recordset 中插入多行.
//return: true / false;
//DataTools4_insertData= function();
function DataTools4_insertData(sTableName, asFieldName, axxsValue, iFromRow, 
                              tIsPK, tIsRowId, tIsAutoNo, sEffectValue, 
                              tIsClear, tIsAllowRM, tIsDefault){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "insertRow");
  }
  var vsIsPress=(axxsValue.length)>50?true:false;
  if(vsIsPress)
     PageX.process(true, false);    
  if (tIsPK== null) tIsPK= true;
  if (tIsRowId== null) tIsRowId= true;
  if (tIsAutoNo== null) tIsAutoNo= true;
  if (PF.isEmpty(sEffectValue)) sEffectValue= null;
  if (tIsClear== null) tIsClear= true;
  if (tIsAllowRM== null) tIsAllowRM= true;
  if (tIsDefault== null) tIsDefault= false;
  tIsPK= PF.parseBool(tIsPK);
  tIsRowId= PF.parseBool(tIsRowId);
  tIsAutoNo= PF.parseBool(tIsAutoNo);
  tIsClear= PF.parseBool(tIsClear);
  tIsAllowRM= PF.parseBool(tIsAllowRM);
  tIsDefault= PF.parseBool(tIsDefault);
  
  var voRS= this.getRecordset(sTableName);
  if (voRS== null) return false;

  var voRM= PageX.getRowManager();
  if (tIsClear){
    var vsRMKey= voRM.updateAction(false, false, false);
    this.clearTableData(sTableName);
    iFromRow= -1;
    voRM.restoreAction(vsRMKey);
    voRM.clearAction(vsRMKey);
  }
  if (PF.isValidArray(asFieldName)== false) return false;
  if (PF.isValidArray(axxsValue)== false) return false;
  
  var vasField= new Array();
  for (var i= 0; i< asFieldName.length; i++){
    vasField[i]= asFieldName[i];
  }

  var voFieldMap= this.oRSFieldMap.get(sTableName);
  var voParamFieldMap= new Map();
  for (var i= 0; i< vasField.length; i++){
    voParamFieldMap.put(vasField[i], i);
  }
  
  //默值处理
  if(tIsDefault){
    var vasAllField= this.getFieldNames(sTableName);
    var vaoDflt= new Array();
    for (var i= 0; i< vasAllField.length; i++){
      if (voParamFieldMap.isContain(vasAllField[i])){
        continue;
      }
      voParamFieldMap.put(vasAllField[i], vasField.length);
      vasField[vasField.length]= vasAllField[i];
      vaoDflt[vaoDflt.length]= this.getTableMeta(sTableName).selectSingleNode("fields/field[@name='"+ vasAllField[i]+ "']/default");
    }
    for (var i= 0; i< axxsValue.length; i++){
      for (var j= 0; j< vaoDflt.length; j++){
        axxsValue[i][axxsValue[i].length]= this.makeDefaultValue(vaoDflt[j]);
      }
    }
  }
  
  //主表主键处理;
  if (tIsPK){
    var vsMainTable= this.getMainTableName();
    var vasKeyField= this.getKeyFieldNames(vsMainTable);
    var voKeyMap= new Map();
    for (var i= 0; i< vasKeyField.length; i++){
      voKeyMap.put(vasKeyField[i], i);
    }
    if (vasKeyField!= null && vasKeyField.length> 0){
      var vsValue= "";
      for (var i= 0; i< vasKeyField.length; i++){
        if (PF.isEmpty(vasKeyField[i]) 
            || voFieldMap.isContain(vasKeyField[i])== false){
          voKeyMap.remove(vasKeyField[i]);
          continue;
        }
        vsValue= this.getValue(vsMainTable, 0, vasKeyField[i]);
        if (vsValue== null) vsValue= "";
        voKeyMap.put(vasKeyField[i], vsValue);
      }
      
      //获取主键的列序; 
      var vaiCol= new Array();
      for (var i= 0; i< vasKeyField.length; i++){
        vaiCol[i]= voParamFieldMap.get(vasKeyField[i]);
        if (vaiCol[i]== null){
          vaiCol[i]= vasField.length;
          vasField[vaiCol[i]]= vasKeyField[i];
          voParamFieldMap.put(vasKeyField[i], vaiCol[i]);
        }
      }
     
      //填充主键的值; 
      for (var i= 0; i< axxsValue.length; i++){
        for (var j= 0; j< vasKeyField.length; j++){
          axxsValue[i][vaiCol[j]]= voKeyMap.get(vasKeyField[j]);
        }
      }
    }
  }
  
  //自动编号处理;
  if (tIsAutoNo){
    var voNoFieldMap= this.getNoFieldMap(); //获取自动编号字段组;
    if (voNoFieldMap!= null){
      var vsMainTable= this.getMainTableName();
      var vasNoField= voNoFieldMap.getAllKey();
      var vsValue= "";
      for (var i= 0; i< vasNoField.length; i++){
        if (PF.isEmpty(vasNoField[i]) || voFieldMap.isContain(vasNoField[i])== false){
          voNoFieldMap.remove(vasNoField[i]);
          continue;
        }
        vsValue= this.getValue(vsMainTable, 0, vasNoField[i]);
        if (vsValue== null) vsValue= "";
        voNoFieldMap.put(vasNoField[i], vsValue);
      }
      
      //获取自动编号的列序; 
      //var vasNoField= voNoFieldMap.getAllKey();
      var vaiNoCol= new Array();
      for (var i= 0; i< vasNoField.length; i++){
        vaiNoCol[i]= voParamFieldMap.get(vasNoField[i]);
        if (vaiNoCol[i]== null){
          vaiNoCol[i]= vasField.length;
          vasField[vaiNoCol[i]]= vasNoField[i];
          voParamFieldMap.put(vasNoField[i], vaiNoCol[i]);
        }
      }
     
      //填充自动编号的值; 
      for (var i= 0; i< axxsValue.length; i++){
        for (var j= 0; j< vasNoField.length; j++){
          axxsValue[i][vaiNoCol[j]]= voNoFieldMap.get(vasNoField[j]);
        }
      }
    }
  }
  
  //影响字段处理;
  if (sEffectValue!= null){
    var vsEffectField= this.getEffectField(sTableName);
    var vsEffectValue= sEffectValue;
    if (PF.isEmpty(vsEffectField)== false 
        && voFieldMap.isContain(vsEffectField)){
      var viCol= voParamFieldMap.get(vsEffectField);
      if (viCol== null || viCol< 0){
        viCol= vasField.length;
        vasField[viCol]= vsEffectField;
        voParamFieldMap.put(vsEffectField, viCol);
      }
      
      //填充自动编号的值; 
      for (var i= 0; i< axxsValue.length; i++){
        axxsValue[i][viCol]= vsEffectValue;
      }
    }
  }
//  debugger;
  //插入行数据;
  //追加行数据;
  PageX.getDataManager().isCloseMonitor = true;
  var voRM= PageX.getRowManager();
  var vsRMKey= "";
  vsRMKey= voRM.updateAction(false, false, false);
  this.oTableRowIdMap.remove(sTableName);
  var viBeginRow= voRS.RecordCount;
  var vsValue= "";
  for (var j= 0, lenj= axxsValue.length; j< lenj; j++){
    voRS.AddNew();
    for (var i= 0, len= vasField.length; i< len; i++){
      if (axxsValue[j][i] == "") continue;
      if (voFieldMap!= null && voFieldMap.isContain(vasField[i])== false) continue;
      vsValue= axxsValue[j][i];
      if (vsValue== null) vsValue= "";
      if (vsValue== "&nbsp;") vsValue= "";
      voRS.Update(vasField[i], vsValue);
    }
    if (tIsAllowRM){
      var vtIns= voRM.tAllowInsert;
      voRM.tAllowInsert= true;
      voRM.recordTableRows(sTableName, voRM.ACTION_INSERT, [voRS.RecordCount- 1]);
      voRM.tAllowInsert= vtIns;
    }
    if (PageX.oProcessbar!= null){
      PageX.oProcessbar.setValue(j/(lenj- 1)*100);
    }     
  }
  PageX.getDataManager().isCloseMonitor = false;
  if (iFromRow!= null && iFromRow>= 0 && iFromRow < viBeginRow){
    var vaoNewRow= new Array();
    var voTableData= this.getTableData(sTableName);
    var voRowSetNode= voTableData.selectSingleNode("rowset");
    for (var i= 0, len= voRS.RecordCount- viBeginRow; i< len; i++){
      vaoNewRow[i]= voRowSetNode.childNodes[viBeginRow+ i];
    }

    for (var i= 0, len= vaoNewRow.length; i< len; i++){
      var voNewNode= vaoNewRow[i];
      var voRefNode= voRowSetNode.childNodes[iFromRow+ i];
      voRowSetNode.insertBefore(voNewNode, voRefNode);
    }
  }

  //行号处理;
  if (tIsRowId){  
    var vsRowIdField= this.getRowIdField(sTableName); //获取行号字段;
    if (PF.isEmpty(vsRowIdField)== false && voFieldMap.isContain(vsRowIdField)){
      var viRow= 1;
      voRS.MoveFirst();
      while(!voRS.EOF){
        voRS.Update(vsRowIdField, viRow++);
        voRS.MoveNext();
      }
    }
  }
  voRM.restoreAction(vsRMKey);
  voRM.clearAction(vsRMKey);
  if(vsIsPress){
    PageX.closeProcess(); 	
  } 
  return true;
}
//----------------------------------------------------------------------
//public;
//返回值: table meta id/ "";
function DataTools4_getTableMetaId(sTableName){
  return "TableMeta_"+ sTableName+ "_XML";
}
//----------------------------------------------------------------------
//public;
//返回值: table data id/ "";
function DataTools4_getTableDataId(sTableName){
  return "TableData_"+ sTableName+ "_XML";
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名的 TableData 的XML对象;
//返回值: 成功: TableData XML对象, 失败: null;
function DataTools4_getTableTotal(sTableName){
  if (sTableName== null || sTableName.length== 0) return null;
  var voDataXML= this.getTableTotalXML(sTableName);
  if (voDataXML== null) return null;
  return voDataXML.documentElement;
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名的 TableData 的XML对象;
//返回值: 成功: TableData XML对象, 失败: null;
function DataTools4_getTableTotalXML(sTableName){
  if (sTableName== null || sTableName.length== 0) return null;
  return this.oDataSourceFrame.document.all("TableTotal_"+ sTableName+ "_XML");
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名的 TableData 的XML对象;
//返回值: 成功: TableData XML对象, 失败: null;
function DataTools4_getDataXML(sTableName){
	//alert("DataTools4_getDataXML");
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getTableData");
  }
  var voDataXML= this.oDataSourceFrame.document.all(this.getTableDataId(sTableName));
  if(voDataXML != null && typeof(voDataXML) == "object" && voDataXML.length > 1){
  	voDataXML = voDataXML[0];
  }
  return voDataXML;
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名的 TableData 的XML对象;
//返回值: 成功: TableData XML对象, 失败: null;
function DataTools4_getTableData(sTableName){
  /*var voDataXML= this.getDataXML(sTableName);
  if (voDataXML== null) return null;
  return voDataXML.documentElement;*/
  //change by liubo
  var voDataXML= this.getDataXML(sTableName);
  if (voDataXML== null) return null;
  var dom = voDataXML.documentElement;
  if (dom == null) {
  	var xml = voDataXML.innerHTML;
  	dom = PF.parseXml(xml);
  }
  if (dom == null) {
  	dom = voDataXML;
  }
  return dom;
}
//add by liubo
function DataTools4_getTableDataXML(sTableName, aiRow){
	var voTableData= this.getTableData(sTableName);
	if (aiRow == null) aiRow= this.getTableRowIndexs(sTableName);
	if (this.isValidRow(sTableName, aiRow) == false) return null;
	var voTableRow = voTableData.selectSingleNode("rowset/row["+ aiRow+ "]");
	if (voTableRow == null) return null;
	var componame = this.getCompoName();
	var buffer = "<entity name=\"" + componame + "\">";
	for (var i = 0; i < voTableRow.childNodes.length; i++) {
		var node = voTableRow.childNodes[i];
		if (node.nodeType == 1) {
			buffer += PF.getFieldXml(node.nodeName,node.text);
		}
	}
	buffer += "</entity>";
	return buffer;
}
//----------------------------------------------------------------------
//public;
//return: 成功:attr string;否则:"";
function DataTools4_getTableFieldAttr(sTable, sField, sAttrName){
  var voField= this.getTableFieldMeta(sTable, sField);
  if (voField== null) return "";
  return voField.getAttribute(sAttrName);
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名、指定行号、指定列名的值;
//返回值: 成功: 列值, 失败: null;
function DataTools4_getValue(sTableName, iRow, sFieldName){
  if (this.isValidField(sTableName, sFieldName)== false) return null;
  if (this.isValidRow(sTableName, iRow)== false) return null;
  var voRS= this.getRecordset(sTableName);
  if (voRS== null) return null;
  voRS.Move(iRow, this.RS_BOOK_MARK_FIRST);
  var vsValue= voRS(sFieldName).Value;
  if (vsValue== null) vsValue= "";
  if (PF.parseBool(this.getTableFieldAttr(sTableName, sFieldName, "iskilo"))){
    vsValue= vsValue.replace(Const.RE_SIGN_COMMA, "");
  }
  return vsValue;
}

function DataTools4_getValueByRS(voRS,sTableName,sFieldName){
  if (this.isValidField(sTableName, sFieldName)== false) return null;
  var vsValue= voRS(sFieldName).Value;
  if (vsValue== null) vsValue= "";
  if (PF.parseBool(this.getTableFieldAttr(sTableName, sFieldName, "iskilo"))){
    vsValue= vsValue.replace(Const.RE_SIGN_COMMA, "");
  }
  return vsValue;
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名、指定行号、指定列名的值;
//return: void;
function DataTools4_setValue(sTableName, iRow, sFieldName, sValue){
  //if ((typeof sValue)== "undefined") sValue= null;
  if (this.isValidField(sTableName, sFieldName)== false) return;
  if (this.isValidRow(sTableName, iRow)== false) return;
  var voRS= this.getRecordset(sTableName);
  if (voRS== null) return;
  if (sValue== null) sValue= "";
  voRS.Move(iRow, this.RS_BOOK_MARK_FIRST);
  voRS.Update(sFieldName, sValue);
  return;
}

function DataTools_setValueByRS(voRS,sTableName, sFieldName, sValue){
  if (voRS== null) return;
  if (this.isValidField(sTableName, sFieldName)== false) return;
  if (sValue== null) sValue= "";
  voRS.Update(sFieldName, sValue);
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名、指定行号、指定列名的值;
//return: void;
function DataTools4_setColValue(sTable, sField, sValue){
  //if ((typeof sValue)== "undefined") sValue= null;
  if (this.isValidField(sTable, sField)== false) return;
  var voRS= this.getRecordset(sTable);
  if (voRS== null) return;
  var viRows= this.getTableRowCount(sTable);
  if (sValue== null) sValue= "";
  for (var i= 0; i< viRows; i++){
    voRS.Move(i, this.RS_BOOK_MARK_FIRST);
    if (voRS(sField).Value!= sValue){
      voRS.Update(sField, sValue);
    }
  }
  return;
}
//----------------------------------------------------------------------
//public; 从 PageDataXML 中获取指定表名、指定行号、指定列名的值;
//return: value array / null;
function DataTools4_getColValue(sTable, sField){
  //if ((typeof sValue)== "undefined") sValue= null;
  if (this.isValidField(sTable, sField)== false) return null;
  var voRS= this.getRecordset(sTable);
  if (voRS== null) return null;
  var vasValue= new Array();
  var viRows= this.getTableRowCount(sTable);
  for (var i= 0; i< viRows; i++){
    voRS.Move(i, this.RS_BOOK_MARK_FIRST);
    vasValue[i]= voRS(sField).Value;
  }
  return vasValue;
}
//----------------------------------------------------------------------
//public; 更改 TableMetaXML 中指定表的字段的默认值;
//返回值: void;
function DataTools4_setDefExpr(sTable, sField, sDefValue){
  var voTableMeta= this.getTableMeta(sTable);
  if (voTableMeta== null) return null;
  var voDef= voTableMeta.selectSingleNode("fields/field[@name='"+ sField+ "']/default");
  if (voDef== null) return;
  voDef.text= sDefValue;
  return;
}
//----------------------------------------------------------------------
//public; 获取 TableMetaXML 中指定表的字段的默认值;
//返回值: default value / "";
function DataTools4_getDefExpr(sTable, sField){
  var voTableMeta= this.getTableMeta(sTable);
  if (voTableMeta== null) return null;
  var voDef= voTableMeta.selectSingleNode("fields/field[@name='"+ sField+ "']/default");
  if (voDef== null) return "";
  return voDef.text;
}
//----------------------------------------------------------------------
//public; 从 TableMetaXML 中获取指定表的字段的信息;
//返回值:成功: 指定表的字段的XML对象, 失败: null;
function DataTools4_getTableFieldMeta(sTable, sField){
  var voTableMeta= this.getTableMeta(sTable);
  if (voTableMeta== null) return null;
  var voField= voTableMeta.selectSingleNode("fields/field[@name='"+ sField+ "']");
  return voField;
}
//----------------------------------------------------------------------
//public; 从 TableMetaXML 中获取指定表的 TableMeta 信息;
//返回值:成功: 指定表的XML对象, 失败: null;
function DataTools4_getTableMeta(sTableName){
  if (sTableName== null || sTableName== ""){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getTableMeta");
  }
  var voTableMeta= null;
  voTableMeta= this.oTableMetaMap.get(sTableName);
  if (voTableMeta== null){
    voMetaXML= this.oDataSourceFrame.document.all(this.getTableMetaId(sTableName));
    if (voMetaXML== null) return null;
    voTableMeta= voMetaXML.documentElement;
    this.oTableMetaMap.put(sTableName, voTableMeta);
  }
  return voTableMeta;
}
//----------------------------------------------------------------------
//public; 从TableData中去获取主表表名;
//返回值:成功: 主表的表名;失败: null;
function DataTools4_getCompoMeta(sCompoName){
  var voCompoMetaXML= this.getCompoMetaXML(sCompoName);
  if (voCompoMetaXML== null) return null;
  var voCompoMeta= voCompoMetaXML.documentElement;
  return voCompoMeta;
}
//----------------------------------------------------------------------
//public; 从TableData中去获取主表表名
//返回值:成功: 主表的表名;失败: null;
function DataTools4_getMainTableName(sCompoName){
  var voCompoMeta= this.getCompoMeta(sCompoName);
  if (voCompoMeta== null) return null;
  var voMainTable= voCompoMeta.selectSingleNode("//tables/table");
  return voMainTable.getAttribute("name");
}
//----------------------------------------------------------------------
//public; 从TableData中去获取指定表明的子表
//返回值:成功: 指定表的子表名数组;失败: null;
function DataTools4_getChildTableName(sTableName){
  var voTableMeta= this.getCompoMeta().selectSingleNode("//table[@name='" + sTableName + "']");
  var vasTableName = new Array();
  var voChild = voTableMeta.childNodes;
  for(var i=0,j=voChild.length; i<j; i++){
  	vasTableName[i] = voChild[i].getAttribute("name");
  }
  return vasTableName;
}
//----------------------------------------------------------------------
//deprecation;
//public; 获取部件名称;
//return:componame; 否则:"";
function DataTools4_getCompoName(){
  var voCompoMeta= this.getCompoMeta();
  if (voCompoMeta== null) return "";
  return voCompoMeta.getAttribute("name");
}
//----------------------------------------------------------------------
//public; 获取页面中的 TableMetaXML 中的 FieldName 组;
//返回值: 成功: FieldName 数组, 失败: null;
function DataTools4_getTableFieldNames(oTableMeta){
  //alert(this.CLASSNAME+ ".getTableFieldNames();");
  if (oTableMeta== null || typeof(oTableMeta)!= "object"){
    Info.throws("oTableMeta 参数无效!", this.CLASSNAME, "getTableFieldNames");
  }
  var vaoFields= oTableMeta.selectSingleNode("fields");
  if (vaoFields== null) return null;
  var voField= null;
  var vasFieldName= new Array();
  for (var i= 0, len= vaoFields.childNodes.length; i< len; i++){
    voField= vaoFields.childNodes[i];
    vasFieldName[i]= voField.getAttribute("name");
  }
  return vasFieldName;
}
//----------------------------------------------------------------------
//public; 获取页面中的 PageMetaXML 对象;
//返回值:成功: PageMetaXML, 失败: null;
function DataTools4_getCompoMetaXML(sCompoName){
  if (sCompoName== null || PF.isEmpty(sCompoName)){
    if (this.oMainCompoMetaXml== null && this.oCompoMap.size()> 0){
      this.oMainCompoMetaXml= this.oCompoMap.getAllItem()[0];
    }
    return this.oMainCompoMetaXml;
  }
  var voCompoMetaXml= this.oDataSourceFrame.document.all("CompoMeta_"+ sCompoName+ "_XML");
  if (voCompoMetaXml != null && !voCompoMetaXml.text) {
  	voCompoMetaXml = this.oDataSourceFrame.document.getElementById("CompoMeta_"+ sCompoName+ "_XML");
  }
  return voCompoMetaXml;
}
//----------------------------------------------------------------------
//public; 获取页面中的 PageMetaXML 对象;
//返回值:成功: PageMetaXML, 失败: null;
function DataTools4_getCompoAdditionalMeta(sCompoName){
  if (sCompoName== null || PF.isEmpty(sCompoName)){
    sCompoName= this.getCompoName();
  }
  var voAdditionalXml= this.oDataSourceFrame.document.all("CompoAdditionalMeta_"+ sCompoName+ "_XML");
  return voAdditionalXml.documentElement;
}
//----------------------------------------------------------------------
//public; 获取页面中的 TableAdditionalMeta_AS_NO_RULE_XML 对象;
//返回值:成功: PageMetaXML, 失败: null;
function DataTools4_getTableAdditionalMeta(sTableName){
  if (sTableName== null || PF.isEmpty(sTableName)){
    return null;
  }
  var voAdditionalXml= this.oDataSourceFrame.document.all("TableAdditionalMeta_"+ sTableName+ "_XML");
  if(voAdditionalXml)
  	return voAdditionalXml.documentElement;
  return null;	
}
//----------------------------------------------------------------------
//public; 获取 SessionXML;
//返回值:成功: SessionXML, 失败: null;
function DataTools4_getSessionXML(){
  return this.oDataSourceFrame.SessionXML;
}
//----------------------------------------------------------------------
//public; 获取指定表名指定行的列名组;
//返回值: 成功: field Array, 失败: null;
function DataTools4_getFieldNames(sTableName){
  if (sTableName== null || sTableName== "") return null;
  return this.getTableFieldNames(this.getTableMeta(sTableName));
}
//----------------------------------------------------------------------
//public; 获取指定表名指定行的关键字列名组;
//返回值: 成功: key field Array, 失败: null;
function DataTools4_getKeyFieldNames(sTableName){
  if (sTableName== null || sTableName== "") return null;
  var vaoKeyField= this.getKeyFields(sTableName);
  var vasKeyField= new Array();
  for (var i= 0, len= vaoKeyField.length; i< len; i++){
    vasKeyField[i]= vaoKeyField[i].getAttribute("name");
  }
  return vasKeyField;
}
//----------------------------------------------------------------------
//public; 获取指定表名指定行的关键字列名组;
//返回值: 成功: key field object Array, 失败: null;
function DataTools4_getKeyFields(sTableName){
  if (sTableName== null || sTableName== "") return null;
  var voTableMeta= this.getTableMeta(sTableName);
  var vaoKeyField= voTableMeta.selectNodes("fields/field[@ispk='true']");
  return vaoKeyField;
}
//----------------------------------------------------------------------
//public; 获取指定表名指定行的列值组;每一行是一个 Map(fieldname, fieldvalue);
//返回值: 成功: value 的 Map 数组, 失败: null;
function DataTools4_getFieldValues(sTableName, aiRow, asFieldName){
  if (sTableName== null || sTableName== "") return null;
  if (PF.isValidArray(asFieldName)== false) return null;
  if (aiRow== null) aiRow= this.getTableRowIndexs(sTableName);

  var vaoRow= new Array();
  var voTableData= this.getTableData(sTableName);
  var voTableRow= null;
  var voCol= null;
  var viRow= 0;
  var vsFieldName= "";
  var vsFieldValue= "";

  for (var i= 0, len= aiRow.length; i< len; i++){
    viRow= aiRow[i];
    if (this.isValidRow(sTableName, viRow)== false) continue;
    voTableRow= voTableData.selectSingleNode("rowset/row["+ viRow+ "]");
    var voMap= new Map();
    for (var j= 0, lenj= asFieldName.length; j< lenj; j++){
      vsFieldName= asFieldName[j];
      vsFieldValue= null;
      voCol= voTableRow.selectSingleNode(vsFieldName);
      if (voCol!= null) vsFieldValue= voCol.text;
      else if (this.isValidField(sTableName, vsFieldName)== false) vsFieldValue= "";
      voMap.put(vsFieldName, vsFieldValue);
    }
    vaoRow[vaoRow.length]= voMap;
  }

  return vaoRow;
}
//----------------------------------------------------------------------
//public; 检查页面中的数据是否有效;
//返回值: 正常: 0; null: -1; exception: -2;
function DataTools4_isValidXMLData(oXMLData){
  if (oXMLData== null) return this.DATA_EMPTY;
  if (oXMLData.innerHTML== null
      || oXMLData.innerHTML.length< 6) return this.DATA_EMPTY;
  if (oXMLData.xml.indexOf("SYSTEM_EXCEPTION_MESSAGE")>= 0) return this.DATA_EXCEPTION;
  return this.DATA_VALID;
}
//----------------------------------------------------------------------
//public; 清空指定表的数据;
//此方法不引发 XML 对象的 onreadystatechange 事件;
//但可以调用PageX.loadTableData()方法将更新后的数据进行装载.
//原XML.recordset对象将状态不变,所以,放心使用.
//返回值: 成功: true; 否则: false;
function DataTools4_clearTableData(sTableName){
  if (sTableName== null) return false;
  var voTableData= this.getTableData(sTableName);
  if (voTableData== null) return false;
  this.getRecordset(sTableName); //防止对象关闭;
  var vaoRow= voTableData.selectNodes("rowset/row");
  vaoRow.removeAll();
  var voMeta= voTableData.selectSingleNode("meta");
  if (voMeta!= null){
    voMeta.setAttribute("pageindex", "0");
    voMeta.setAttribute("rowcountofpage", "0");
    voMeta.setAttribute("fromrow", "0");
    voMeta.setAttribute("torow", "0");
    voMeta.setAttribute("rowcountofdb", "0");
  }
  this.oTableRowIdMap.remove(sTableName);
  return true;
}
//----------------------------------------------------------------------
//public; 将指定表的数据替代为空的 TableData,
//此方法将引发 XML 对象的 onreadystatechange 事件;
//同时将使原XML.recordset对象关闭,所以,不用为妙.
//返回值: 成功: true; 否则: false;
function DataTools4_emptyTableData(sTableName){
  if (sTableName== null) return false;
  var voDataXML= DataTools.getDataXML(sTableName);
  voDataXML.loadXML(DataTools.makeDefTableData(sTableName));
  this.oTableRowIdMap.remove(sTableName);
  return true;
}
//----------------------------------------------------------------------
//public; 获取所有的表名;
//返回值: 成功: table name array; 否则: null;
function DataTools4_getAllTableNames(){
  //alert("DataTools4_getAllTableNames();");
  var vsMainCompo= DataTools.getCompoName();
  var vasCompoName= this.oCompoMap.getAllKey();
  var vasTable= DataTools.getTableNames(vsMainCompo);
  for (var i= 0; i< vasCompoName.length; i++){
    if (vasCompoName[i]== vsMainCompo) continue;
    vasTable= vasTable.concat(DataTools.getTableNames(vasCompoName[i]));
  }
  return vasTable;
}
//----------------------------------------------------------------------
//public; 获取所有的表名;
//返回值: 成功: table name array; 否则: null;
function DataTools4_getTableNames(sCompoName){
  var voCompoMeta= DataTools.getCompoMeta(sCompoName);
  if (voCompoMeta== null) return null;
  var voTables= voCompoMeta.selectNodes("tables//table");
  var vasTable= new Array();
  for (var i= 0, len= voTables.length; i< len; i++){
    vasTable[i]= voTables[i].getAttribute("name");
  }
  return vasTable;
}
//----------------------------------------------------------------------
//public; 按层次获取表名;
//params: oTable: 递归调用参数;刚开始调用时,可以不给值;
//        iLevel: 递归调用参数;刚开始调用时,可以不给值;
//返回值: 成功: table name array (axxs); 否则: null;
function DataTools4_getLevelTables(sCompoName, oTables, iLevel){
  if (oTables== null){
    var voCompoMeta= DataTools.getCompoMeta(sCompoName);
    oTables= voCompoMeta.selectSingleNode("tables");
  }
  if (iLevel== null) iLevel= 0;
  var voTable= null;
  var vsTableName= "";
  var vaxxsTable= new Array();
  vaxxsTable[iLevel]= new Array();
  for (var i= 0; i< oTables.childNodes.length; i++){
    voTable= oTables.childNodes[i];
    vsTableName= voTable.getAttribute("name");
    vaxxsTable[iLevel][vaxxsTable[iLevel].length]= vsTableName;
    if (voTable.hasChildNodes()){
      var vaxxsTable2= this.getLevelTables(sCompoName, voTable, iLevel+ 1);
      for (var l= 0; l< vaxxsTable2.length; l++){
        if (vaxxsTable2[l]== null) continue;
        if (vaxxsTable[l]== null){
        	vaxxsTable[l]= vaxxsTable2[l];
        }else{
        	vaxxsTable[l]= (new Array()).concat(vaxxsTable[l], vaxxsTable2[l]);
        }
      }
    }
  }
  return vaxxsTable;
}
//----------------------------------------------------------------------
//public; 默认值计算;
//param: sExpress: 不同的表示方法有以下几种类型;
//       "ABC": 常量,直接返回;
//       "==PF.getUserId();": 恒等计算,只在第一次插入时计算一次,以后就直接使用;
//       "=PF.getUID();": 计算,每次插入时,都计算一次;
//return: 成功:计算结果;否则:null;
function DataTools4_makeDefaultValueK(sExpress){
  if (sExpress== null) return null;
  if (sExpress.indexOf("=")!= 0) return sExpress;
  var vsExpr= "";
  if (sExpress.indexOf("==")== 0) vsExpr= sExpress.substr(2);
  else if (sExpress.indexOf("=")== 0) vsExpr= sExpress.substr(1);
  if (vsExpr== "") return vsExpr;
  var vsValue= eval(vsExpr);
  return vsValue;
}
//----------------------------------------------------------------------
//public; 默认值计算;
//param: oDefaultNode: TableMetaXML 中的 field.default 结点;
//return: 成功:计算结果;否则:null;
function DataTools4_makeDefaultValue(oDefaultNode){
  if (oDefaultNode== null) return null;
  var vsExpr= oDefaultNode.text;
  if (vsExpr== null) return null;
  var vtIsIdentity= false;
  if (vsExpr.indexOf("==")== 0) vtIsIdentity= true;
  var vsValue= this.makeDefaultValueK(vsExpr);
  if (vsValue== null){
    var vsTable= oDefaultNode.parentNode.parentNode.parentNode.getAttribute("name");
    var vsField= oDefaultNode.parentNode.getAttribute("name");
    alert("默认值计算值为 null;请检查默认值计算表达式的正确性:\n表名: "+ vsTable+ "\n列名: "+ vsField+ "\n表达式: "+ vsExpr);
    vsValue= "";
  }
  //vsValue= this.makeDefaultValue_ValueSet(oDefaultNode, vsValue);
  if (vtIsIdentity){
    oDefaultNode.text= vsValue;
  }
  return vsValue;
}
//----------------------------------------------------------------------
//public; 填充 PageDataXML / ReportDataXML 的 Recordset 中当前行的默认值.
//params: iRow: 从 0 开始,这里是指数据的行,如果是分页显示,注意转换;
//返回值: 成功: true, 否则: false;
function DataTools4_fillRowDefaultValue(sTableName, iRow){
  //alert(this.CLASSNAME+ ".fillRowDefaultValue();");
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "fillRowDefaultValue");
  }
  if (this.isValidRow(sTableName, iRow)== false){
    Info.throws("iRow 参数无效!", this.CLASSNAME, "iRow");
  }
  var voRS= this.getRecordset(sTableName);
  if (voRS== null) return false;
  voRS.Move(iRow, DataTools.RS_BOOK_MARK_FIRST);

  var voTableMeta= this.getTableMeta(sTableName);
  if (voTableMeta== null) return false;
  var voFields= voTableMeta.selectSingleNode("fields");
  var voField= null;
  var voDefault= null;
  var vsField= "";
  var vsValue= "";
  for(var i= 0; i< voFields.childNodes.length; i++){
    voField= voFields.childNodes[i];
    voDefault= voField.selectSingleNode("default");
    vsValue= this.makeDefaultValue(voDefault);
    vsField= voField.getAttribute("name");
    if (this.isValidField(sTableName, vsField)){
      voRS.Update(vsField, vsValue);
    }
  }
  return true;
}
//----------------------------------------------------------------------
//public; 填充 PageDataXML / ReportDataXML 的 Recordset 中的行号.
//params: iFromRow: 从 0 开始,这里是指数据的行,如果是分页显示,注意转换;
//返回值: 成功: true, 否则: false;
function DataTools4_fillRowId(sTableName, iFromRow, iToRow, iFromRowId){
  //alert(this.CLASSNAME+ ".fillRowId();");
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "fillRowId");
  }
  if (this.isValidRow(sTableName, iFromRow)== false) return false;
  if (this.isValidRow(sTableName, iToRow)== false) iToRow= this.getTableRowCount(sTableName);
  if (iFromRowId== null) iFromRowId= iFromRow+ 1;

  var voTableMeta= this.getTableMeta(sTableName);
  if (voTableMeta== null) return false;
  var voField= voTableMeta.selectSingleNode("fields/field[@isrowid='true']");
  if (voField== null) return false;
  var vsField= voField.getAttribute("name");

  var voRS= this.getRecordset(sTableName);
  if (voRS== null) return false;
  voRS.Move(iFromRow, DataTools.RS_BOOK_MARK_FIRST);
  if (parseInt(voRS(vsField)+ "")== iFromRowId) return false;

  while(voRS.EOF== false){
    if (parseInt(voRS(vsField)+ "")!= voRS.AbsolutePosition){
      if (voRS.AbsolutePosition> iToRow+ 1) break;
      voRS.Update(vsField, voRS.AbsolutePosition);
    }
    voRS.MoveNext();
  }
  return true;
}
//----------------------------------------------------------------------
//public; 获取指定 session variant name　的 值;
//返回值: 成功: session value, 失败: null;
function DataTools4_getSV(sName){
  if (PF.isEmpty(sName)) return null;
  if (!this.getSessionXML()){
    if (window.getSv== null) return null;
    if (getSv(sName)){
      return getSv(sName);
    }else{
      return null;
    }
  }
  var voNode= this.getSessionXML().documentElement.selectSingleNode(sName);
  if (voNode== null) return null;
  return voNode.text;
}
//----------------------------------------------------------------------
//public; 获取指定子结点的序号;
//返回值: 成功: 序号, 失败: -1;
function DataTools4_getChildIndex(oPNode, sChildNodeName){
  if (oPNode== null) return -1;
  if (PF.isEmpty(sChildNodeName)) return -1;
  var viIndex= -1;
  var voNode= null;
  for (var j= 0, lenj= oPNode.childNodes.length; j< lenj; j++){
    voNode= oPNode.childNodes[j];
    if (voNode.nodeName== sChildNodeName){
      viIndex= j;
      break;
    }
  }
  return viIndex;
}
//----------------------------------------------------------------------
//public; 获取指定子结点的序号;
//返回值: index array/null;
function DataTools4_getChildIndexs(aoRow, sField){
  if (PF.isValidArray(aoRow)== false) return null;
  if (PF.isEmpty(sField)) return null;
  var vaiCol= new Array();
  var viIndex= 0;
  for (var j= 0, lenj= aoRow.length; j< lenj; j++){
    if (aoRow[j]== null || aoRow[j].childNodes.length<= 0){
      vaiCol[j]= -1;
      continue;
    }
    if (aoRow[j].childNodes.length<= viIndex) viIndex= 0;
    if (aoRow[j].childNodes[viIndex].nodeName== sField){
      vaiCol[j]= viIndex;
      continue;
    }
    if (aoRow[j].selectSingleNode(sField)== null) viIndex= -1;
    else viIndex= this.getChildIndex(aoRow[j], sField);
    vaiCol[j]= viIndex;
    if (viIndex< 0) viIndex= 0;
  }
  return vaiCol;
}
//----------------------------------------------------------------------
//public; 对指定表的指定字段进行排序;
//多字段排序;
//返回值: 成功: true, 失败: false;
function DataTools4_sortTableData(oTableData, asField, asFieldType, tIsAscend){
  if (oTableData== null) return false;
  if (PF.isValidArray(asField)== false) return false;
  tIsAscend= PF.parseBool(tIsAscend);
  var voRowSet= oTableData.selectSingleNode("rowset");
  if (voRowSet== null) return false;
  if (PF.isValidArray(asFieldType)== false) asFieldType= null;

  //整理字段及对行中没有指定字段的行进行处理;
  var vasField= new Array();
  for (var i= 0; i< asField.length; i++){
    if (voRowSet.selectSingleNode("row/"+ asField[i])== null) continue;
    vasField[vasField.length]= asField[i];
    this.addTableField(oTableData, asField[i], "");
  }
  if (vasField.length== 0) return true;

  //取出关键字字段的值组;
  var vaxxoCol= new Array();
  var vaoCol= new Array();
  for (var i= 0; i< vasField.length; i++){
    vaoCol= voRowSet.selectNodes("row/"+ vasField[i]);
    vaxxoCol[i]= vaoCol;
  }
  if (vaxxoCol== null || vaxxoCol.length<= 0) return true;
  
  //alert(asFieldType+ "");
  var DATA_LEN= 38;
  var vasSpace= new Array();
  var voBuf= new StringBuffer();
  vasSpace[0]= "";
  for (var i= 1; i< DATA_LEN; i++){
    voBuf.append("0");
    vasSpace[i]= voBuf.toString();
  }

  //将数据整理为多维的数组;
  var vaxxvRow= new Array();
  var viRowCount= vaxxoCol[0].length;
  var vsText= "";
  for (var i= 0; i< viRowCount; i++){
    vaxxvRow[i]= new Array();
    for (var j= 0, lenj= vaxxoCol.length; j< lenj; j++){
      vsText= vaxxoCol[j][i].text;
      if (asFieldType!= null 
          && asFieldType[j]!= null
          && (asFieldType[j].toUpperCase()== "NUM"
              || asFieldType[j].toUpperCase()== "SEQ")){
        vsText= PF.parseFloat(vsText);
        //comment by liubo
        /*if (vsText.length< DATA_LEN){
          vsText= vasSpace[DATA_LEN- vsText.length]+ vsText;
        }*/
      }
      vaxxvRow[i][j]= vsText;
    }
  }

  //加上行号;
  var viRowXCol= vaxxvRow[0].length;
  for (var i= 0, len= vaxxvRow.length; i< len; i++){
    vaxxvRow[i][viRowXCol]= i;
  }

  var voRM= PageX.getRowManager();
  var vtRM_isAllowInsert= true;
	var vtRM_isAllowDelete= true;
  if (voRM!= null){
	  vtRM_isAllowInsert= voRM.tAllowInsert;
	  vtRM_isAllowDelete= voRM.tAllowDelete;
	  voRM.tAllowInsert= false;
	  voRM.tAllowDelete= false;
  }

  //进行排序；修改排序方法,对于数字型简单的sort是不对的;目前好像不能实现多字段排序
  if (asFieldType!= null 
          && asFieldType[0]!= null
          && (asFieldType[0].toUpperCase()== "NUM"
              || asFieldType[0].toUpperCase()== "SEQ")) {
       vaxxvRow.sort(function(a,b){return parseFloat(a)-parseFloat(b)});
   } else {
        vaxxvRow.sort();
   }
  //vaxxvRow.sort();
  var viRow= -1;
  var vaoRow= new Array();
  for (var i= 0, len= vaxxvRow.length; i< len; i++){
    viRow= vaxxvRow[i][viRowXCol];
    vaoRow[i]= voRowSet.childNodes[viRow];
  }
  if (tIsAscend){
    for (var i= 0, len= vaoRow.length; i< len; i++){
      voRowSet.insertBefore(vaoRow[i], voRowSet.childNodes[i]);
    }
  }else{
    for (var i= vaoRow.length- 1, j= 0; i>= 0; i--, j++){
      voRowSet.insertBefore(vaoRow[i], voRowSet.childNodes[j]);
    }
  }

  if (voRM!= null){
    voRM.tAllowInsert= vtRM_isAllowInsert;
    voRM.tAllowDelete= vtRM_isAllowDelete;
  }
  return true;
}
//----------------------------------------------------------------------
//public; 对指定表数据中,统一加入指定字段;
//此方法对 recordset 没有影响;
//返回值: 成功: true, 失败: false;
function DataTools4_addTableField(oTableData, sField, sDefaultValue){
  if (oTableData== null) return false;
  if (PF.isEmpty(sField)) return false;
  if (sDefaultValue== null) sDefaultValue= "";
  var voRowSet= oTableData.selectSingleNode("rowset");
  if (voRowSet== null) return true;
  var vaoRow= voRowSet.selectNodes("row[not("+ sField+ ")]");
  if (vaoRow== null || vaoRow.length== 0) return true;
  var voCol= oTableData.ownerDocument.createElement(sField);
  voCol.text= sDefaultValue;
  var voRow= null;
  var voCol1= null;
  for (var i= 0, len= vaoRow.length; i< len; i++){
    vaoRow[i].appendChild(voCol.cloneNode(true));
  }
  voCol= null;
  return true;
}
//----------------------------------------------------------------------
//private;
//return: 
function DataTools4_getTableRowIndexs(sTableName){
  var vaiRow= new Array(this.getTableRowCount(sTableName));
  for (var i= 0, len= this.getTableRowCount(sTableName); i< len; i++){
    vaiRow[i]= i;
  }
  return vaiRow;
}
//----------------------------------------------------------------------
//public;
//return: delta xml string / null;
function DataTools4_getTableDelta(sTableName, aiRow){
  var va2xsSet= this.getTableRows2(sTableName, aiRow);
  if (va2xsSet== null) return null;
  var voBuf= new StringBuffer();
  var vasField= va2xsSet[0];
  var vaxxsValue= va2xsSet[1];
  voBuf.append("<delta>\n");
  for (var i= 0, len= vaxxsValue.length; i< len; i++){
    voBuf.append("<entity>\n");
    for (var j= 0, lenj= vasField.length; j< lenj; j++){
      voBuf.append("<field name=\""+ vasField[j]+ "\" value=\""+ PF.getHtmlEncode(vaxxsValue[i][j])+ "\" />\n");
    }
    voBuf.append("</entity>\n");
  }
  voBuf.append("</delta>\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//public; 从 XML Data 中获取指定表名的数据行 node array;
//return: new Array(asField, axxsValue)/ null;
function DataTools4_getTableRows2(sTableName, aiRow){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getTableRows2");
  }
  if (aiRow== null) aiRow= this.getTableRowIndexs(sTableName);
  var voRS= this.getRecordset(sTableName);
  if (voRS== null) return null;
  var vasField= new Array();
  var vsField= "";
  var vaxxsValue= new Array();
  for (var i= 0; i< aiRow.length; i++){
    voRS.Move(aiRow[i], this.RS_BOOK_MARK_FIRST);
    vaxxsValue[i]=new Array();
    for (var j= 0; j< voRS.Fields.Count; j++){
      vsField= voRS.Fields.item(j).Name;
      if (vsField.toUpperCase()== "$TEXT") continue;
      if (i== 0){
        vasField[j]= vsField;
      }
      vaxxsValue[i][j]= voRS(j).Value;
      if (vaxxsValue[i][j]== null) vaxxsValue[i][j]= "";
    }
  }
  var vavRet= new Array(vasField, vaxxsValue);
  return vavRet;
}
//----------------------------------------------------------------------
//public; 从 XML Data 中获取指定表名的数据行 node array;
//返回值: row node array/ null;
function DataTools4_getTableRows(sTableName, aiRow){
  if (sTableName== null || sTableName.length== 0){
    Info.throws("sTableName 参数无效!", this.CLASSNAME, "getTableRows");
  }
  if (aiRow== null) aiRow= this.getTableRowIndexs(sTableName);
  var voTableData= this.getTableData(sTableName);
  var voRowSet= voTableData.selectSingleNode("rowset");
  var vaoRow= new Array();
  for (var i= 0; i< aiRow.length; i++){
    if (aiRow[i]< 0 || aiRow[i]>= voRowSet.childNodes.length) continue;
    vaoRow[i]= voRowSet.childNodes[aiRow[i]];
  }
  return vaoRow;
}
//----------------------------------------------------------------------
//public; Row -> Map,每一行是一个 Map(fieldname, fieldvalue);
//返回值: 成功: value 的 Map 数组, 失败: null;
function DataTools4_rowToMap(oRow){
  if (oRow== null) return null;
  var voMap= new Map();
  var vsFieldName= "";
  var vsFieldValue= "";
  for (var i= 0, len= oRow.childNodes.length; i< len; i++){
    vsFieldName= oRow.childNodes[i].nodeName;
    vsFieldValue= oRow.childNodes[i].text;
    voMap.put(vsFieldName, vsFieldValue);
  }
  return voMap;
}
//----------------------------------------------------------------------
//public;
//return: String/ null;
function DataTools4_getCompoNameByTable(sTable){
  return this.oTableCompoMap.get(sTable);
}
//----------------------------------------------------------------------
//public;
//return: String/ null;
function DataTools4_getCompoMetaByTable(sTable){
  var vsCompoName= this.getCompoNameByTable(sTable);
  return this.getCompoMeta(vsCompoName);
}
//----------------------------------------------------------------------
//public; 设置 PageDataXML 的 digest;
//返回值: void;
function DataTools4_setDigest(sTable, sDigest){
//  var voAddMeta= this.getCompoAdditionalMeta(this.getCompoNameByTable(sTable));
//  var voTable= voAddMeta.selectSingleNode("//table[@name='"+ sTable+ "']");
//	var voTable = this.getTableAdditionalMeta(sTable);
//  if(voTable)
//  	voTable.setAttribute("digest", sDigest);
	var voTableData = DataTools.getTableData(sTable);
	if(voTableData)
		voTableData.selectSingleNode("/*/meta").setAttribute("digest", sDigest);
}
//----------------------------------------------------------------------
//public; 设置 PageDataXML 的 digest;
//返回值: digest string;
function DataTools4_getDigest(sTable){
//  var voAddMeta= this.getCompoAdditionalMeta(this.getCompoNameByTable(sTable));
//  var voTable= voAddMeta.selectSingleNode("//table[@name='"+ sTable+ "']");
//  var voTable = this.getTableAdditionalMeta(sTable);
//  if(voTable)
//  	return voTable.getAttribute("digest");
//  return null;
	var voTableData = DataTools.getTableData(sTable);
	if(voTableData)
		return voTableData.selectSingleNode("/*/meta").getAttribute("digest");
	return null;	
}
//----------------------------------------------------------------------
//public; 移除 table data xml;
//返回值: void;
function DataTools4_removeTableXml(sTableName){
  if (sTableName== null || sTableName== "") return;
  DataTools.removeTableMetaXml(sTableName);
  DataTools.removeTableDataXml(sTableName);
  DataTools.deleteTableFromCompoMeta(sTableName);
}
//----------------------------------------------------------------------
//public; 移除 table data xml;
//返回值: void;
function DataTools4_removeTableDataXml(sTableName){
  if (sTableName== null || sTableName== "") return;
  this.oTableRowIdMap.remove(sTableName);
  DataTools.clearTableData(sTableName);
  var vsId= DataTools.getTableDataId(sTableName);
  var voXml= this.oDataSourceFrame.document.all(vsId);
  if (voXml== null) return;
  voXml.removeNode(true);
}
//----------------------------------------------------------------------
//public; 移除 table meta xml;
//返回值: void;
function DataTools4_removeTableMetaXml(sTableName){
  if (sTableName== null || sTableName== "") return;
  var voTableMeta= DataTools.getTableMeta(sTableName);
  if (voTableMeta== null) return;
  var voFields= voTableMeta.selectNodes("fields");
  if (voFields!= null) voFields.removeAll();
  var voForeigns= voTableMeta.selectNodes("foreigns");
  if (voForeigns!= null) voForeigns.removeAll();
  //this.oDataSourceFrame.document.all(DataTools.getTableMetaId(sTableName)).removeNode(true);
  var vsId= DataTools.getTableMetaId(sTableName);
  var voXml= this.oDataSourceFrame.document.all(vsId);
  if (voXml== null) return;
  voXml.removeNode(true);
}
//----------------------------------------------------------------------
//public;
//return: void;
function DataTools4_addTableToCompoMeta(sTableName, sParentTableName){
  if (sTableName== null || sTableName== "") return;
  if (sParentTableName== null) sParentTableName= "";
  var voCompoMeta= DataTools.getCompoMeta();
  if (voCompoMeta!= null){
    if (voCompoMeta.selectSingleNode("tables//table[@name='"+ sTableName+ "']")!= null) return;
    var voPNode= voCompoMeta.selectSingleNode("tables//table[@name='"+ sParentTableName+ "']");
    if (voPNode== null){
      voPNode= voCompoMeta.selectSingleNode("tables");
    }
    var voTable= voPNode.ownerDocument.createElement("table");
    var voNameAttr= voPNode.ownerDocument.createAttribute("name");
    var voEffeAttr= voPNode.ownerDocument.createAttribute("effectfield");
    voNameAttr.value= sTableName;
    voEffeAttr.value= "";
    voTable.setAttributeNode(voNameAttr);
    voTable.setAttributeNode(voEffeAttr);
    voPNode.appendChild(voTable);
  }
  //为调用不着 initRSFieldMeta();
  var voRS= this.getRecordset(sTableName); 
}
//----------------------------------------------------------------------
//public;
//return: void;
function DataTools4_deleteTableFromCompoMeta(sTableName){
  if (sTableName== null || sTableName== "") return;
  var voCompoMeta= DataTools.getCompoMeta();
  if (voCompoMeta!= null){
    var voTable= voCompoMeta.selectSingleNode("tables//table[@name='"+ sTableName+ "']");
    if (voTable== null) return;
    voTable.parentNode.removeChild(voTable);
  }
}
//----------------------------------------------------------------------
//public;
//return: void;
function DataTools4_makeDefTableData(sTableName){
  if (sTableName== null || sTableName.length== 0) return "";
  var voBuf= new StringBuffer();
  voBuf.append("<"+ sTableName+ ">\n");
  voBuf.append("<meta pageindex=\"1\" fromrow=\"0\" torow=\"0\" rowcountofpage=\"0\" rowcountofdb=\"0\">\n");
  voBuf.append("</meta>\n");
  voBuf.append("<rowset>\n");
  voBuf.append("</rowset>\n");
  voBuf.append("</"+ sTableName+ ">\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//public;
//return: void;
function DataTools4_getNoFieldMap(sCompoName){
  var voMap= new Map();
  var voCompo= this.getCompoMeta(sCompoName);
  var vsNoField= voCompo.getAttribute("nofield");
  if (PF.isEmpty(vsNoField)== false){
    voMap.put(vsNoField, vsNoField);
    return voMap;
  }
  var vsFields= voCompo.getAttribute("autonumfields");
  if (PF.isEmpty(vsFields)) return null;
  var vasField= vsFields.split(",");
  for (var i= 0, len= vasField.length; i< len; i++){
    if (PF.isEmpty(vasField[i])) continue;
    voMap.put(vasField[i], vasField[i]);
  }
  return voMap;
}
//----------------------------------------------------------------------
//public;
//return: row index / -1;
function DataTools4_getRowIndex(oRow){
  if (oRow== null) return -1;
  var voRowSet= oRow.parentNode;
  if (voRowSet== null) return -1;
  var i= 0;
  for (i= 0, len= voRowSet.childNodes.length; i< len; i++){
    if (voRowSet.childNodes[i]== oRow) break;
  }
  return i;
}
//----------------------------------------------------------------------
//public;
//return: new Array(numeric, numeric string);
function DataTools4_sum(sTable, sField, sCond, iLen, iDec){
  var vavRet= new Array(0, "0");
  if (PF.isEmpty(sTable)) return vavRet;
  if (PF.isEmpty(sField)) return vavRet;
  if (PF.isEmpty(iLen)) iLen= 18;
  if (PF.isEmpty(iDec)) iDec= 2;

  var voTableData= DataTools.getTableData(sTable);
  var vaoCol= null;
  if (PF.isEmpty(sCond)){
    vaoCol= voTableData.selectNodes("rowset/row/"+ sField);
  }else{
    vaoCol= voTableData.selectNodes("rowset/row["+ sCond+ "]/"+ sField);
  }
  if (vaoCol== null) return vavRet;
  var vnSum= 0;
  for (var i= 0; i< vaoCol.length; i++){
    vnSum+= PF.parseFloat(vaoCol[i].text);
  }
  vavRet= PF.parseNumeric(vnSum, iLen, iDec);
  return vavRet;
}
//----------------------------------------------------------------------
//public;
//return: Map Array / null;
function DataTools4_a2xToMapRows(a2xsValue){
  if (this.isValidA2x(a2xsValue)== false) return null;
  var vasField= a2xsValue[0];
  var vaxxsValue= a2xsValue[1];
  var vasMapRow= new Array();
  for (var i= 0, len= vaxxsValue.length; i< len; i++){
    var voMap= new Map();
    for (var j= 0, lenj= vasField.length; j< lenj; j++){
      voMap.put(vasField[j], vaxxsValue[i][j]);
    }
    vasMapRow[i]= voMap;
  }
  return vasMapRow;
}
//----------------------------------------------------------------------
//public;
//return: new Array(asField, axxsValue)/ null;
function DataTools4_rowsToA2x(aoRow, asField){
  if (PF.isValidArray(aoRow)== false) return null;
  var vaxxsValue= new Array();
  var voMap= null;
  for (var i= 0, len= aoRow.length; i< len; i++){
    voMap= this.rowToMap(aoRow[i]);
    if (i== 0 && PF.isValidArray(asField)== false){
      asField= voMap.getAllKey();
    }
    vaxxsValue[i]= new Array();
    for (var j= 0, lenj= asField.length; j< lenj; j++){
      vaxxsValue[i][j]= voMap.get(asField[j]);
    }
  }
  return new Array(asField, vaxxsValue);
}
//----------------------------------------------------------------------
//public;
//return: true / false;
function DataTools4_isValidA2x(a2xsValue){
  if (a2xsValue== null) return false;
  if (a2xsValue.length!= 2) return false;
  if (a2xsValue[0]== null) return false;
  if (a2xsValue[1]== null) return false;
  if (a2xsValue[1].length<= 0) return false;
  if (a2xsValue[0].length!= a2xsValue[1][0].length) return false;
  return true;
}
//----------------------------------------------------------------------
//public;
//return: String/null;
function DataTools4_getDBType(){
  //alert("DataTools4_getDBType();");
  var ret= Info.requestDataK("getdbtype5", "all", null, null);
  return PF.trim(PF.parseXml(ret).text);
}
//----------------------------------------------------------------------
//public; 
//return: true/false;
function DataTools4_deleteTableData(sTableName, sCond){
  if (sTableName== null) return false; 
  if (PF.isEmpty(sCond)) return false;
  var voTableData= this.getTableData(sTableName);
  if (voTableData== null) return false;
  this.getRecordset(sTableName); //防止对象关闭;
  var vaoRow= voTableData.selectNodes("rowset/row["+ sCond+ "]");
  vaoRow.removeAll();
  var voMeta= voTableData.selectSingleNode("meta");
  if (voMeta!= null){
    voMeta.setAttribute("torow", this.getTableRowCount(sTableName)- 1);
  }
  this.oTableRowIdMap.remove(sTableName);
  return true;
}
//----------------------------------------------------------------------
//public;
//sXPath: 引号必须用单引号.
//return: row index / -1;
function DataTools4_getTableRowX(sTable, sXPath){
  if (PF.isEmpty(sTable)) return -1;
  if (PF.isEmpty(sXPath)) return -1;
  var voTableData= this.getTableData(sTable);
  if (voTableData== null) return -1;
  var voRowSet= voTableData.selectSingleNode("rowset");
  var voRow= voRowSet.selectSingleNode("row["+ sXPath+ "]");
  if (voRow== null) return -1;
  var i= 0;
  for (i= 0, len= voRowSet.childNodes.length; i< len; i++){
    if (voRowSet.childNodes[i]== voRow) break;
  }
  return i;
}
//----------------------------------------------------------------------
//public; 给指定结点加上属性;
//return: void;
function DataTools4_addNodeAttr(node, attrName, attrValue){
  if (node== null) return;
  if (attrName== null || PF.trim(attrName)== "") return;
  if (attrValue== null) return;
  var voAttr= node.getAttributeNode(attrName);
  if (voAttr== null){
    voAttr= node.ownerDocument.createAttribute(attrName);
    node.setAttributeNode(voAttr);
  }
  voAttr.value= attrValue;
}
//----------------------------------------------------------------------
//privte;
//return: void;
function DataTools4_regCompoMeta(sCompoName, oCompoMeta){
  this.oCompoMap.put(sCompoName, oCompoMeta);
  var vasTable= this.getTableNames(sCompoName);
  for (var i= 0; i< vasTable.length; i++){
    this.regTableCompo(vasTable[i], sCompoName);
  }
}
//----------------------------------------------------------------------
//private;
//return: void;
function DataTools4_regTableCompo(sTable, sCompo){
  this.oTableCompoMap.put(sTable, sCompo);
}
//----------------------------------------------------------------------
//privte;
//return: compo name array / null;
function DataTools4_getAllCompoNames(){
  return this.oCompoMap.getAllKey();
}
//----------------------------------------------------------------------
//privte;
//return: main compo name/ null;
function DataTools4_getMainCompoName(){
  return this.getCompoName();
}
//----------------------------------------------------------------------
//private;
//return: void; 
function DataTools4_loadTableDataXmlK(oDataXml, sXml){
  if (oDataXml== null) return;
  if (oDataXml.documentElement!= null){
    this.oTableRowIdMap.remove(oDataXml.documentElement.nodeName);
  }
  var voRS= oDataXml.namedRecordset("", "rowset.row");
  var vaoRow= oDataXml.selectNodes("//rowset/row");
  vaoRow.removeAll();
  var voMeta= oDataXml.selectSingleNode("//meta");
  if (voMeta!= null){
    voMeta.setAttribute("pageindex", "0");
    voMeta.setAttribute("rowcountofpage", "0");
    voMeta.setAttribute("fromrow", "0");
    voMeta.setAttribute("torow", "0");
    voMeta.setAttribute("rowcountofdb", "0");
  }
  var voTable= PF.parseXml(sXml);
  if (voTable.selectSingleNode("//rowset/row")== null
      && oDataXml.selectSingleNode("//rowset/row")== null){
    return;
  }
  oDataXml.loadXML(sXml);
}
//----------------------------------------------------------------------
//public;
//return: void; 
function DataTools4_loadTableDataXml(sTableName, sXml){
  var voDataXML= DataTools.getDataXML(sTableName);
  if (voDataXML== null) return;
  this.loadTableDataXmlK(voDataXML, sXml);
}
//----------------------------------------------------------------------
//public;
//return: void; 
function DataTools4_loadTotalDataXml(sTableName, sXml){
  var voDataXML= DataTools.getTableTotalXML(sTableName);
  if (voDataXML== null) return;
  voDataXML.removeChild(voDataXML.firstChild);
  voDataXML.loadXML(sXml);
}
//----------------------------------------------------------------------
//privte;
//return: main compo meta / null;
function DataTools4_getMainCompoMeta(){
  return this.getCompoMeta();
}
//----------------------------------------------------------------------
function DataTools4_getOrgPosiCode(coCode,orgCode,poCode,nd){
  //如果没有,则从sv中取
  if(!(coCode))
    coCode = DataTools.getSV("svCoCode"); 
  if(!(orgCode ))
    orgCode = DataTools.getSV("svOrgCode"); 
  if(!(poCode))
    poCode = DataTools.getSV("svPoCode"); 
  if(!(nd))
    nd = DataTools.getSV("svNd");

  var names = new Array();
  var values = new Array();
  names[0]="coCode";
  values[0]=coCode;
  names[1]="orgCode";
  values[1]=orgCode;
  names[2]="poCode";
  values[2]=poCode;
  names[3]="nd";
  values[3]=nd;
  var result = requestData("getOrgPosiCode", "all", names, values, null); 
  return (null==result?"":result.text);
}
//----------------------------------------------------------------------
//public;
//return: row index / -1;
function DataTools4_getRowXByRowId(sTable, sRowId){
  var voMap= this.oTableRowIdMap.get(sTable);
  if (voMap== null 
      || (this.getTableData(sTable)!= null
          && this.getTableData(sTable).selectSingleNode("rowset/row[@id='"+ sRowId+ "']")!= null)){
    voMap= new Map();
    var voTableData= this.getTableData(sTable);
    var voRowset= voTableData.selectSingleNode("rowset");
    for (var i= 0; i< voRowset.childNodes.length; i++){
      var vsRowId= voRowset.childNodes[i].getAttribute("id");
      if (vsRowId== null || vsRowId== "") continue;
      voMap.put(vsRowId, i);
    }
    this.oTableRowIdMap.put(sTable, voMap);
  }
  return voMap.get(sRowId)== null? -1: voMap.get(sRowId);
}
//----------------------------------------------------------------------

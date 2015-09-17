/* $Id: SelectGrid.js,v 1.2 2008/07/01 02:10:03 liubo Exp $ */
/*
Title: gp.page.SelectGrid
Description:
ѡ�����࣬������ʾ XML �󶨵����ݣ��ṩ���ݵķ��ʣ�
���������н���ѡ��, �Լ���ҳ�ж�ѡ��֧�֡�
Company: ��������
Author: leidh
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function SelectGrid(){
  //1.���� =function();
  Grid.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.SelectGrid";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.
  this.oSelectedMap= new Map();//private; ��ѡ�е��е� Map; �Թؼ��ֶε�������Ϊ key ֵ;
  this.asKeyField= new Array();//private;

  //4.�¼������� =function();
  
	//5.���������� = function();
	//public;
  this.init = SelectGrid_init;
	this.getSelected = SelectGrid_getSelected;
	this.record= SelectGrid_record;
	this.clearRecords= SelectGrid_clearRecords;
	
	//private;
	this.makeKey = SelectGrid_makeKey;
	this.eventAnswer_OnRowDblClick= SelectGrid_eventAnswer_OnRowDblClick;
	this.eventAnswer_OnRowSelected= SelectGrid_eventAnswer_OnRowSelected;
	this.eventAnswer_OnLoadData= SelectGrid_eventAnswer_OnLoadData;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
function SelectGrid_init(tIsFinalClass){
  //alert("SelectGrid_init();");
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Grid_init.call(this, false)== false) return false;

  //ȡ�� KeyField;
  /*
  var voCol= null;
  for (var i= 0, len= this.oBodyColGroup.childNodes.length; i< len; i++){
    voCol= this.oBodyColGroup.childNodes[i];
    if (PF.parseBool(voCol.ispk)==false) continue;
    this.asKeyField[i]= voCol.fieldname;
  }
  //*/
  this.asKeyField= DataTools.getKeyFieldNames(this.getTableName());
  if (PF.isValidArray(this.asKeyField)== false){
    this.asKeyField= DataTools.getFieldNames(this.getTableName());
  }
  if (PF.isValidArray(this.asKeyField)== false){
    Info.throws("��Ч����������,��Ϊ��������û�з����κ���Ч�����ֶ�.", this.CLASSNAME, "init", new Array("TableName: "+ this.getTableName()));
  }

  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; ��ȡ��ѡ�е�����;
//return: va2vRet / null;
//        [0]: asField; field array of one bound;
//        [1]: axxsValue[row][col]; value array of two bounds;
function SelectGrid_getSelected(){
  var vasItem= this.oSelectedMap.getAllItem();
  if (PF.isValidArray(vasItem)== false) return null;
  try {
   if (vasItem.length == 0) return null;
  } catch (error) {
   return null;
  }  
  var voBuf= new StringBuffer();
  voBuf.append("<rowset>");
  voBuf.append(vasItem.join("\n"));
  voBuf.append("</rowset>");
  var voRowSet= PF.parseXml(voBuf.toString());
  
  var vasField= DataTools.getFieldNames(this.getTableName());
  var vaxxsValue= new Array();
  for (var i= 0, len= voRowSet.childNodes.length; i< len; i++){
    var voRowMap= DataTools.rowToMap(voRowSet.childNodes[i]);
    vaxxsValue[i]= new Array();
    for (var j= 0, lenj= vasField.length; j< lenj; j++){
      vaxxsValue[i][j]= voRowMap.get(vasField[j]);
    }
  }
  
  var va2vRet= new Array(vasField, vaxxsValue);
  return va2vRet;
}
//----------------------------------------------------------------------
//private; ���� key ֵ;
//����ֵ: �ɹ�: key, ʧ��: null;
function SelectGrid_makeKey(oRowNode){
  if (oRowNode== null) return null;
  var voRowMap= DataTools.rowToMap(oRowNode);
  if (voRowMap== null) return null;

  var voKeySB= new StringBuffer();
  var vsField= "";
  var vsValue= "";
  for (var i= 0, len= this.asKeyField.length; i< len; i++){
    vsField= this.asKeyField[i];
    vsValue= voRowMap.get(vsField);
    if (vsValue== null) vsValue= "";
    voKeySB.append(vsValue);
    if (i< len- 1) voKeySB.append("*|*");
  }
  return voKeySB.toString();
}
//----------------------------------------------------------------------
//private;
//return: void;
function SelectGrid_record(iRow, tIsSelected){
  var viDataRow= this.getDataRowX(iRow);
  if (viDataRow< 0) return;
  var vaoRowNode= DataTools.getTableRows(this.getTableName(), new Array(""+ viDataRow));
  var vsKey= this.makeKey(vaoRowNode[0]);
  if (vsKey== null || vsKey== "") return;
  if (tIsSelected && this.oSelectedMap.isContain(vsKey)== false){
    this.oSelectedMap.put(vsKey, vaoRowNode[0].xml);
  }else if(!tIsSelected && this.oSelectedMap.isContain(vsKey)){
    this.oSelectedMap.remove(vsKey);
  }
  return;
}
//----------------------------------------------------------------------
//private;
//return: void;
function SelectGrid_clearRecords(){
  if (this.oSelectedMap== null) return;
  this.oSelectedMap.clear();
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private; ���� Grid.OnRowClick �¼�; ʹ���¼�������Ӧͨ��;
//����ֵ: void;
function SelectGrid_eventAnswer_OnRowSelected(oSender, oRow, tIsSelected){
  //alert(this.CLASSNAME+ ".eventAnswer_OnRowSelected();");
  //����� this -> SelectGrid; Ҳ��Grid;
  this.record(oRow.rowIndex, tIsSelected);
  return;
}
//----------------------------------------------------------------------
//private; ���� Grid.OnRowDblClick �¼�; ʹ���¼�������Ӧͨ��;
//����ֵ: void;
function SelectGrid_eventAnswer_OnRowDblClick(oSender, oRow, oEvent){
  //alert("SelectGrid_eventAnswer_OnRowDblClick();");
  //����� this -> SelectGrid; Ҳ��Grid;
  this.selectRows(new Array(""+ oRow.rowIndex), true);
  return;
}
//----------------------------------------------------------------------
//private; ���� Grid.OnHasRefreshedData �¼�; ʹ���¼�������Ӧͨ��;
//����ֵ: void;
function SelectGrid_eventAnswer_OnLoadData(oSender){
  //����� this -> SelectGrid; Ҳ��Grid;
  var vaiSelectedRowIndex= new Array();
  var vsKey= "";
  for (var i= 0, len= this.getRowCount(); i< len; i++){
    var vaoRowNode= DataTools.getTableRows(this.getTableName(), [""+ i]);
    vsKey= this.makeKey(vaoRowNode[0]);
    if (this.oSelectedMap.isContain(vsKey)){
      vaiSelectedRowIndex[vaiSelectedRowIndex.length]= i;
    }
  }
  this.selectRows(vaiSelectedRowIndex);
}
//----------------------------------------------------------------------



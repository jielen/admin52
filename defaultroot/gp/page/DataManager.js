/* $Id: DataManager.js,v 1.3 2008/06/04 09:05:19 liuxiaoyong Exp $ */
/*
Title: gp.pub.DataManager
Description:
DataManager �࣬���ڷ�װ���ݹ���.
Company: ��������
Author:leidh
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function DataManager(){
  //1.���� =function();
  Base.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.pub.DataManager";
  this.ACTION_NONE= "none";
  this.ACTION_INSERT= "insert";
  this.ACTION_DELETE= "delete";
  this.ACTION_UPDATE= "update";

  //3.���������� =function();
  //����ʱ���¼����Ʊ���;
  this.tIsRunning= false;   //private;
  this.iRunningTime= -1;    //private;
  this.sRunningText= "";    //private;
	this.isCloseMonitor = false; //DataTools.insertData�����޸����ݵ�ʱ���ر��¼���Ӧ

  //4.�¼������� =function();
  this.OnDatasetComplete= "OnDatasetComplete";  //oSender, sTable, oEvent;
  this.OnCellChange= "OnCellChange";       //oSender, sTable, iRow, sField;
  this.OnRowsInserted= "OnRowsInserted";   //oSender, sTable, iRow;
  this.OnRowsDelete= "OnRowsDelete";       //oSender, sTable, iRow;
  this.isNewComplete = false;
  this.newCompleteTable = null;
  //5.���������� =function();
  //public;

  //private;
  this.init= DataManager_init;
  this.isRunning= DataManager_isRunning;
  this.setRunning= DataManager_setRunning;
  this.doRowManager= DataManager_doRowManager;
  this.tHasInit= true;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//private;
function DataManager_init(){
  this.tHasInit= true;
	//return;//huangcb��ת�Ƶ���̨��
  var vasTable= DataTools.getAllTableNames();
  if (vasTable!= null){
    for (var i= 0; i< vasTable.length; i++){
      var voDataXml= DataTools.getDataXML(vasTable[i]);
      if (voDataXml== null) continue;
      eval("voDataXml.onreadystatechange= function(){DataManager_TableDataXML_onreadystatechange(\""+ vasTable[i]+ "\");}");
      eval("voDataXml.ondatasetcomplete= function(){DataManager_TableDataXML_onreadystatechange(\""+ vasTable[i]+ "\");}");
      eval("voDataXml.oncellchange= function(){DataManager_TableDataXML_oncellchange(\""+ vasTable[i]+ "\");}");
      eval("voDataXml.onrowsinserted= function(){DataManager_TableDataXML_onrowsinserted(\""+ vasTable[i]+ "\");}");
      eval("voDataXml.onrowsdelete= function(){DataManager_TableDataXML_onrowsdelete(\""+ vasTable[i]+ "\");}");
      eval("voDataXml.onrowenter= function(){DataManager_TableDataXML_onrowenter(\""+ vasTable[i]+ "\");}");
      eval("voDataXml.onrowexit= function(){DataManager_TableDataXML_onrowexit(\""+ vasTable[i]+ "\");}");
    }
  }
  this.tHasInit= true;
}
//----------------------------------------------------------------------
//private; ��ȡ Running State;
//����ֵ: Running: true; ����: false;
function DataManager_isRunning(sTable, sAction){
  if (event.recordset== null) return false;
  var viRow= -1;
  if (sAction== this.ACTION_INSERT){
	  viRow= event.recordset.RecordCount- 1;
  }else{
    viRow= event.recordset.AbsolutePosition- 1;
  }
  if (this.tIsRunning && viRow>= 0){
    if (sTable== null) return false;
    var voTableData= DataTools.getTableData(sTable);
    if (voTableData!= null){
      var voRow= voTableData.selectSingleNode("rowset/row["+ viRow+ "]");
      if (voRow!= null){
        var vsText= sTable+ "*"+ viRow+ "*"+ voRow.xml;
        if (this.sRunningText!= vsText) this.tIsRunning= false;
        this.sRunningText= vsText;
      }
    }
  }
  if (this.tIsRunning && (new Date().getTime())- this.iRunningTime>= 500){
    this.tIsRunning= false;
  }
  return this.tIsRunning;
}
//----------------------------------------------------------------------
//private; ���� Running State;
//����ֵ: Running: true; ����: false;
function DataManager_setRunning(tIsRunning){
  this.sRunningText= "";
  this.tIsRunning= PF.parseBool(tIsRunning);
  if (this.tIsRunning) this.iRunningTime= new Date().getTime();
  return;
}
//----------------------------------------------------------------------
//private;
//return: void;
function DataManager_doRowManager(sTable, sAction){
  var voRM= PageX.getRowManager();
  if (voRM!= null){
    voRM.recordOnEvent(sTable, sAction);
  }
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
function DataManager_TableDataXML_onreadystatechange(sTable){
	this.isNewComplete = true;
	this.newCompleteTable = sTable;
}

function DataManager_TableDataXML_ondatasetcomplete(sTable){
	if (!this.isNewComplete || sTable != this.newCompleteTable){
		return;
	}
	this.isNewComplete = false;
  var voDM= PageX.getDataManager();
  voDM.fireEvent(voDM.OnDatasetComplete, new Array(voDM, sTable, event));
}

//----------------------------------------------------------------------
//private; ���� XML Data �� update �¼�;
//return: void;
function DataManager_TableDataXML_oncellchange(sTable){
  var voDM= PageX.getDataManager();
  if (voDM.isCloseMonitor) return;
  if (voDM.tAllowUpdate== false) return;
  if (voDM.isRunning(sTable, voDM.ACTION_UPDATE)) return;
  voDM.setRunning(true);

  //����RowManager;
  voDM.doRowManager(sTable, voDM.ACTION_UPDATE);

  //���ⷢ���¼�; OnRowsDelete
  var viRow= event.recordset.AbsolutePosition- 1;
  var vsField= event.dataFld;
  voDM.fireEvent(voDM.OnCellChange, new Array(voDM, sTable, viRow, vsField));
}
//----------------------------------------------------------------------
//private; ���� XML Data �� has inserted row �¼�;
//return: void;
function DataManager_TableDataXML_onrowsinserted(sTable){
  var voDM= PageX.getDataManager();
  if (voDM.isCloseMonitor) return;
  if (voDM.tAllowInsert== false) return;
  voDM.setRunning(true);
  event.recordset.MoveLast();
  
  //����RowManager;
  voDM.doRowManager(sTable, voDM.ACTION_INSERT);

  //���ⷢ���¼�; OnRowsDelete
  var viRow= event.recordset.AbsolutePosition- 1;
  if (PF.isExistMethodK(voDM.eventAnswer_OnRowsInserted)){
    voDM.eventAnswer_OnRowsInserted(voDM, sTable, viRow);
  }
  voDM.fireEvent(voDM.OnRowsInserted, new Array(voDM, sTable, viRow));
}
//----------------------------------------------------------------------
//private; ���� XML Data �� will delete row �¼�;
//return: void;
function DataManager_TableDataXML_onrowsdelete(sTable){
  var voDM= PageX.getDataManager();
  if (voDM.isCloseMonitor) return;
  if (voDM.tAllowDelete== false) return;
  if (voDM.isRunning(sTable, voDM.ACTION_DELETE)) return;
  voDM.setRunning(true);
  
  //����RowManager;
  voDM.doRowManager(sTable, voDM.ACTION_DELETE);

  //���ⷢ���¼�; OnRowsDelete
  var viRow= event.recordset.AbsolutePosition- 1;
  voDM.fireEvent(voDM.OnRowsDelete, new Array(voDM, sTable, viRow));
}
//----------------------------------------------------------------------
//private; ���� XML Data �� enter row �¼�;
//return: void;
function DataManager_TableDataXML_onrowenter(sTable){
  var voDM= PageX.getDataManager();
  voDM.setRunning(false);
}
//----------------------------------------------------------------------
//private; ���� XML Data �� exit row �¼�;
//return: void;
function DataManager_TableDataXML_onrowexit(sTable){
  var voDM= PageX.getDataManager();
  voDM.setRunning(false);
}
//----------------------------------------------------------------------


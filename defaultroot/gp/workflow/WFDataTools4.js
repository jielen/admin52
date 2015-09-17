/* $Id: WFDataTools4.js,v 1.1 2008/02/20 11:42:05 liuxiaoyong Exp $ */
/*
Title: gp.pub.DataTools
Description:
WFDataTools4 �࣬���ڷ�װ�Թ�����ҳ�����ݵķ���.
Company: ��������
Author:chupp
*/

//----------------------------------------------------------------------
//����ҳ���е�ȫ�ֶ���;
var DataTools= new WFDataTools4();
//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function WFDataTools4(){
  //1.���� =function();
  DataTools4.call(this);


  //2.���������� =function();
  this.CLASSNAME= "gp.workflow.WFDataTool4";
  
  //5.���������� =function();
  //public;
  this.getMainTableName= WFDataTools4_getMainTableName;  
  this.getTableNames=WFDataTools4_getTableNames;
}
//----------------------------------------------------------------------
//public; ��TableData��ȥ��ȡ����������������б�ҳ��ı���
//��ĳЩ����²��ܴ�ҳ���compoMeta�л�á�
//����ֵ:�ɹ�: ����ı���;ʧ��: null;
function WFDataTools4_getMainTableName(sCompoName){
 var voCompoMeta= this.getCompoMeta(sCompoName);
 if (voCompoMeta== null) return null;
  var vsMainTableName=null;
  var vsWfListType=voCompoMeta.getAttribute("wflisttype");
  /*if(!PF.isEmpty(vsWfListType)&&PageX.sPageType==PageX.PAGE_TYPE_LIST){
    if(vsWfListType==WFConst.WF_LIST_TYPE_TODO)
      vsMainTableName=WFConst.WF_MAINTABLE_TODO;
    else if(vsWfListType==WFConst.WF_LIST_TYPE_DONE)
      vsMainTableName=WFConst.WF_MAINTABLE_DONE;
    }
  */
  if(vsMainTableName==null){
  var voMainTable= voCompoMeta.selectSingleNode("//tables/table");
  vsMainTableName=voMainTable.getAttribute("name");
	}
  return vsMainTableName;
}
//----------------------------------------------------------------------
//public; ��ȡ�������б����еı���;�������б�ҳ��ı���
//��ĳЩ����²��ܴ�ҳ���compoMeta�л�á�
//����ֵ: �ɹ�: table name array; ����: null;
function WFDataTools4_getTableNames(sCompoName){
 var voCompoMeta= this.getCompoMeta(sCompoName);
 if (voCompoMeta== null) return null;
  var vasTable= null;
  var vsWfListType=voCompoMeta.getAttribute("wflisttype");
  if(!PF.isEmpty(vsWfListType)&&PageX.sPageType==PageX.PAGE_TYPE_LIST){
	if(vsWfListType==WFConst.WF_LIST_TYPE_TODO)     
	  vasTable=new Array(WFConst.WF_MAINTABLE_TODO);
    else if(vsWfListType==WFConst.WF_LIST_TYPE_DONE)
      vasTable=new Array(WFConst.WF_MAINTABLE_DONE);
	}
  if(vasTable==null){
	  var voTables= voCompoMeta.selectNodes("tables//table");
	  vasTable= new Array();
	  for (var i= 0, len= voTables.length; i< len; i++){
	    vasTable[i]= voTables[i].getAttribute("name");
	  }
	}
  return vasTable;
}

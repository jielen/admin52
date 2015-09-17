/* $Id: WFDataTools4.js,v 1.1 2008/02/20 11:42:05 liuxiaoyong Exp $ */
/*
Title: gp.pub.DataTools
Description:
WFDataTools4 类，用于封装对工作流页面数据的访问.
Company: 用友政务
Author:chupp
*/

//----------------------------------------------------------------------
//声明页面中的全局对象;
var DataTools= new WFDataTools4();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function WFDataTools4(){
  //1.超类 =function();
  DataTools4.call(this);


  //2.常量声明区 =function();
  this.CLASSNAME= "gp.workflow.WFDataTool4";
  
  //5.方法声明区 =function();
  //public;
  this.getMainTableName= WFDataTools4_getMainTableName;  
  this.getTableNames=WFDataTools4_getTableNames;
}
//----------------------------------------------------------------------
//public; 从TableData中去获取主表表名；工作流列表页面的表明
//在某些情况下不能从页面的compoMeta中获得。
//返回值:成功: 主表的表名;失败: null;
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
//public; 获取工作流列表所有的表名;工作流列表页面的表明
//在某些情况下不能从页面的compoMeta中获得。
//返回值: 成功: table name array; 否则: null;
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

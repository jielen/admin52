/* $Id: WFConst.js,v 1.4 2008/05/17 08:44:30 zhuyulong Exp $ */
/*
Title: gp.workflow.WFConst
Description:
WFConst 类，提供工作流的公共常量.
Company: 用友政务
Author:chupp
*/

//----------------------------------------------------------------------
//声明页面中的全局对象
var WFConst= new WFConst();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数
function WFConst(){

  //常量声明区
  this.WF_ACTION= "WF_ACTION";
  this.WF_COMMENT= "WF_COMMENT";
  this.WF_CURRENT_EXECUTOR_ID= "WF_CURRENT_EXECUTOR_ID";
  this.WF_CURRENT_EXECUTOR_NAME= "WF_CURRENT_EXECUTOR_NAME";
  this.WF_DEFAULT_NEXT_EXECUTOR_ID= "WF_DEFAULT_NEXT_EXECUTOR_ID";
  this.WF_DEFAULT_NEXT_EXECUTOR_NAME= "WF_DEFAULT_NEXT_EXECUTOR_NAME";
  this.WF_INSTANCE_DESCRIPTION= "WF_INSTANCE_DESCRIPTION";
  this.WF_INSTANCE_ID= "WF_INSTANCE_ID";
  this.WF_INSTANCE_NAME= "WF_INSTANCE_NAME";
  this.WF_IS_BIND_COMMIT= "WF_IS_BIND_COMMIT";
  this.PROCESS_INST_ID_FIELD= "PROCESS_INST_ID";
  this.WF_NEED_EMAIL= "WF_NEED_EMAIL";
  this.WF_NEED_MESSAGE= "WF_NEED_MESSAGE";
  this.WF_NEED_SHORTMESSAGE= "WF_NEED_SHORTMESSAGE";
  this.WF_NEXT_EXECUTOR_ASS_ID= "WF_NEXT_EXECUTOR_ASS_ID";
  this.WF_NEXT_EXECUTOR_ASS_NAME= "WF_NEXT_EXECUTOR_ASS_NAME";
  this.WF_NEXT_EXECUTOR_ID= "WF_NEXT_EXECUTOR_ID";
  this.WF_NEXT_EXECUTOR_NAME= "WF_NEXT_EXECUTOR_NAME";
  this.WF_NODE_ID= "WF_NODE_ID";
  this.NODE_ID= "NODE_ID";
  this.WF_POSITION_ID= "WF_POSITION_ID";
  this.WF_PREVIOUS_NODE_ID= "WF_PREVIOUS_NODE_ID";
  this.WF_NEXT_TRANSFER_NODE_ID= "WF_NEXT_NODE_ID";//"WF_NEXT_TRANSFER_NODE_ID";TODO:重构
  this.WF_NEXT_GIVEBACK_NODE_ID= "WF_NEXT_NODE_ID";//"WF_NEXT_GIVEBACK_NODE_ID";
  this.WF_TASK_ID= "WF_TASK_ID";
  this.WF_TEMPLATE_ID= "WF_TEMPLATE_ID";
  this.WF_STATE_NODE_ID= "WF_STATE";
  this.WF_VARIABLE_NODE_ID= "WF_VARIABLE";

  //
  this.WF_LIST_TYPE_TODO="WF_TODO";
  this.WF_LIST_TYPE_DONE="WF_DONE";
  
  this.WF_LIST_TYPE_COMPO="WF_COMPO";
  this.WF_LIST_TYPE_COMPO="WF_COMPO_OTHER";
  this.WF_LIST_TYPE_COMPO="WF_COMPO_DRAFT";
  this.WF_LIST_TYPE_FILTER_COMPO="WF_FILTER_COMPO";
  this.WF_LIST_TYPE_FILTER_COMPO_TODO="WF_FILTER_COMPO_TODO";
  this.WF_LIST_TYPE_FILTER_COMPO_DONE="WF_FILTER_COMPO_DONE";
  this.WF_LIST_TYPE_FILTER_COMPO_INVALID="WF_FILTER_COMPO_INVALID";

  this.WF_MAINTABLE_TODO="AS_WF_TODO";
  this.WF_MAINTABLE_DONE="AS_WF_DONE";

  this.WF_COMPONAME_TODO= "WF_TODO";
  this.WF_COMPONAME_DONE= "WF_DONE";
  //其他常量
  this.WF_WATCH="WF_WATCH";
  this.WF_STATUS_ACTIVE="活动";
  this.WF_STATUS_SUSPENT="挂起";
  this.WF_STATUS_TERMINAL="中止";
  this.WF_STATUS_ABNORMAL="非正常中止";

this.WF_INSTANCE_STATUS_ACTIVE = 1;
this.WF_INSTANCE_STATUS_DEACTIVE = -1;
this.WF_INSTANCE_STATUS_FINISH = 9;
this.WF_INSTANCE_STATUS_INTERRUPT = -9;

//工作流选项对话框常量
  this.WF_FUNC_MANUALCOMMIT=0;
  this.WF_FUNC_SHOWOPTION=1;
  this.WF_FUNC_GIVEBACK=2;
  this.WF_FUNC_CALLBACK=3
  this.WF_FUNC_TRANSFER=4;
  this.WF_FUNC_HANDOVER=5;
  this.WF_FUNC_IMPOWER=6;
  this.WF_FUNC_AUTOCOMMIT=7;
  this.WF_FUNC_ACTIVE=8;
  this.WF_FUNC_DEACTIVE=9;
  this.WF_FUNC_INTERRUPT=10;
  this.WF_FUNC_REWORK=11;
  this.WF_FUNC_NEWINSTCOMMIT = 12;
  
  this.NEWCOMMIT = "newcommit";
  this.COMMITSIMPLY = "commitsimply";
  this.HANDCOMMIT = "handlecommit";
  this.UNTREADSIMPLY = "untreadsimply";
  this.UNTREAD = "untread";
  this.CALLBACK = "callback";
  this.REWORK = "rework";
  this.INTERRUPT = "interrupt";
  this.HANDOVER = "handover";
  this.DELETEDRAFT= "deletedraft";
  this.defaultAction = {
  		"newcommit":"wfNewCommit",
  	 "commitsimply":"commitSimply",
  	 "handlecommit":"commit",
  	"untreadsimply":"untreadSimply",
  	      "untread":"wfCommon",
  	     "callback":"wfCommon",
  	       "rework":"rework",
  	    "interrupt":"interruptInstance",
  	     "handover":"wfCommon",
  	     "deletedraft":"deleteDraftAndEntity"
  };
	
  this.WF_ALL_BUTTON=new Array("fmanualcommit","fshowoption","fgiveback","fcallback","ftransfer","fhandover","fimpower","fautocommit","factive","fdeactive","finterrupt");
}
//----------------------------------------------------------------------

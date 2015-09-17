<%--
$Id: commitDialog.jsp,v 1.13 2008/06/17 01:55:45 liubo Exp $
--%>
<%@page contentType="text/html;charset=GBK"%>
<%@page import="com.anyi.gp.message.*" %>
<%@page import="java.util.*"%>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="com.anyi.gp.workflow.util.WFConst"%>
<%@page import="com.kingdrive.workflow.ConfigureFacade"%>
<%@page import="com.kingdrive.workflow.ExecuteFacade"%>
<%@page import="com.kingdrive.workflow.dto.NodeMeta"%>
<%@page import="com.kingdrive.workflow.dto.ActionMeta"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>

<%@ taglib uri="/applus" prefix="applus" %>

<%
    String title = null;
    String sNodeId="0";
    String sInstanceId="0";
    String sTemplateId="0";
    String sCurrentExecutorId=null;
    String action="";
    //String sNextExecutorId="";
    String funcId="";
    int allowWhich= 1;//default
    String direction = "0";
    try{
      direction = (String)request.getParameter("direction");
      if (direction == null) direction = "3";
      sInstanceId = (String)request.getParameter(WFConst.PROCESS_INST_ID);
      sTemplateId = (String)request.getParameter(WFConst.WF_TEMPLATE_ID);
      sNodeId = (String)request.getParameter(WFConst.WF_NODE_ID);
      sCurrentExecutorId = (String)request.getParameter(WFConst.WF_CURRENT_EXECUTOR_ID);
      title = (String)request.getParameter("title");
      funcId = (String)request.getParameter("func_id");
      String StrAllowWhich = (String)request.getParameter("allowwhich");
      if(StrAllowWhich!=null){
        allowWhich = Integer.parseInt(StrAllowWhich);
        if(allowWhich<-1 || allowWhich > 2){
          allowWhich = 1;//default
        }
      }
    }catch(Exception e) {
      //throw new RuntimeException("字符集转换错误！Byte字符处理：" +
        //e.toString());
    }
		String webRoot = request.getContextPath();
%>
<html>
<head>
<title><%=title%></title>
<base href="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/" target="_self">
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<LINK href="script/applus.css" rel="stylesheet" type="text/css"></LINK>
<style type="text/css">
 BODY{
 	font-size: 12px;
 }
 TD{
 	font-size: 12px;
}
</style>

<applus:include language="javascript">
    gp.page.TextBox;
    gp.page.TextAreaBox;
    gp.page.NumericBox;
    gp.page.ComboBox;
    gp.page.DateBox;
    gp.page.Toolbar;
    gp.default.Btn_EventAdapter;
    gp.pub.PublicFunction;
    gp.pub.Information;
    gp.workflow.WFConst;
</applus:include>

<SCRIPT language="javascript" src="script/tab.js"></SCRIPT>
<!--SCRIPT language="javascript" src="gp/common/Map.js"></SCRIPT>
<SCRIPT language="javascript" src="gp/common/StringBuffer.js"></SCRIPT>
<SCRIPT language="javascript" src="gp/common/List.js"></SCRIPT
<SCRIPT language="javascript" src="gp/pub/PublicFunction.js"></SCRIPT>
<SCRIPT language="javascript" src="gp/pub/Information.js"></SCRIPT>
<SCRIPT language="javascript" src="gp/workflow/WFConst.js"></SCRIPT>
SCRIPT language="javascript" src="gp/workflow/WFData.js"></SCRIPT-->
<SCRIPT language="javascript">

/**
 * 输入参数，格式参见 PageData.js : getWfData
 * 使用到的数据项 ACTION_NAME, NEXT_EXECUTOR, NEXT_EXECUTOR_ASS, COMMENT,
 * WF_TEMPLATE_ID, WF_ACTIVITY_ID, funcId
 */
var oWfData = null;
var popWin = null;
var funcId=<%=funcId%>;
var svNd = '<%=SessionUtils.getAttribute(request, "svNd")%>';

function initExecutor(exes) {
		var domid = document.getElementById("NEXT_EXECUTOR_NAME");
		var options = domid.options;
		while(options.length >=1) {
			options[0] = null;
		}
		for (var i = 0; i < exes.length; i++) {
			var ele = document.createElement("option");
			ele.text = exes[i].name;
			ele.value = exes[i].id;
			domid.add(ele);
		}
}

function loadPreExecutor() {
	var defaultExes = WFInterface.getExecutorsByResource(oWfData);
	try {
		var exes = eval(defaultExes);
		initExecutor(exes);
	} catch (error) {
		alert(error.message);
	}
}

function loadRuntimeExecutor() {
	var runtimeExes = WFInterface.getRuntimeExecutor(oWfData);
	try {
		var exes = eval(runtimeExes);
		initExecutor(exes);
	} catch (error) {
		alert(error.message);
	}
}

function initPage() {
  if (window.dialogArguments) {
    //初始化页面控件赋默认值
    oWfData = window.dialogArguments;
    //add by liubo
    <%if (direction.equals("3")){%>
	    var options = document.getElementById("ACTION_NAME").options;
	    if (options.length > 0) {
	    	oWfData.setAction(options[0].value);
	    	loadPreExecutor();
	    }
    <%}%>
    <%if (direction.equals("4")){%>
	    var options = document.getElementById("ACTION_NAME").options;
	    oWfData.setAction("");
	    if (options.length > 0) {
	    	oWfData.setAction(options[0].value);
	    }
	    loadRuntimeExecutor();
    <%}%>
    //end
    if (!PF.isEmpty(oWfData.getAction()))
      System.ACTION_NAME.value = oWfData.getAction();
    
    if (!PF.isEmpty(oWfData.getNextExecutorId())){
    	var executorId = oWfData.getNextExecutorId();
      System.NEXT_EXECUTOR.value = executorId;
      var executorName = oWfData.getNextExecutorName();
      //add by liubo: 此时未考虑当executorId为多个的情况，有时更改values和解析方法即可
      if (executorName == null) {
      	var names = ["sql"];
      	var values = ["select t.USER_NAME from as_user t where t.USER_ID='" + executorId +"'"];
      	var responseText = qryData("BASE_SELECT",names,values);
				var xmldom = new ActiveXObject("Microsoft.XMLDOM");
				xmldom.loadXML(responseText);
				var result = xmldom.documentElement;
				executorName = result.firstChild.firstChild.getAttribute("value");
				if ( executorName == null ) {
					executorName = "";
				}
      	oWfData.setNextExecutorName(executorName);
      }
      //end
      System.NEXT_EXECUTOR_NAME.value = executorName;
      var empName;
      /*if(!oWfData.NEXT_EXECUTOR_NAME){
        oWfData.NEXT_EXECUTOR_NAME=oWfData.getNextExecutorId();
        var userId = oWfData.getNextExecutorId();
        oWfData.NEXT_EXECUTOR_NAME =
         "<%
         String userIds =request.getParameter(WFConst.NEXT_EXECUTOR);
         userIds = "undefined".equals(userIds)?"":userIds;
         String emps = "";
         if(null!=userIds && userIds.length()>0){
           String[] userIdss = userIds.split(",");
           for (int i = 0 ;i< userIdss.length;i++){
           	 Map empInfo = GeneralFunc.queryUserEmpInfo(userIdss[i]);
             emps += (String)empInfo.get("EMP_NAME")+",";
           }
           if(emps.length()>0){
             out.print(emps.substring(0,emps.length()-1));
           }
         }
         %>";
      }*/
    	if(trim(oWfData.getNextExecutorId()).length>0){
		    var aExecutorName_main=oWfData.getNextExecutorName().split(",");
		    var aExecutorCode_main=oWfData.getNextExecutorId().split(",");
    		//默认就是主办被选择状态
    		for(var i=0,j=aExecutorCode_main.length;i<j;i++){
    			addList(aExecutorName_main[i],aExecutorCode_main[i]);
    		}
    	}
    }else{
      if (funcId==WFConst.WF_FUNC_MANUALCOMMIT && !PF.isEmpty(oWfData.getDefaultNextExecutorId())){
        System.NEXT_EXECUTOR.value = oWfData.getDefaultNextExecutorId();
        System.NEXT_EXECUTOR_NAME.value  = oWfData.getDefaultNextExecutorName();
      }
    }
    if (!PF.isEmpty(oWfData.getNextExecutorAssId())){
      System.NEXT_EXECUTOR_ASS.value = oWfData.getNextExecutorAssId();
      System.NEXT_EXECUTOR_ASS_NAME.value = oWfData.getNextExecutorAssName();
    }else{
      if (funcId==WFConst.WF_FUNC_MANUALCOMMIT && !PF.isEmpty(oWfData.getDefaultNextExecutorId())){
			System.NEXT_EXECUTOR_ASS.value = oWfData.getDefaultNextExecutorAssId();
	       System.NEXT_EXECUTOR_ASS_NAME.value = oWfData.getDefaultNextExecutorAssName();
	   }
    }
    if (!PF.isEmpty(oWfData.getComment()))
      System.COMMENT.value = oWfData.getComment();

    //初始化页面控件的显示属性
	switch (funcId){
	case WFConst.WF_FUNC_MANUALCOMMIT :
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		//hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		//displayExecutorsByRelation();
		hideObject("NEXT_TRANSFER_NODE_ID");
		hideObject("NEXT_GIVEBACK_NODE_ID");
		if (oWfData.WF_TASK_RESPONSIBILITY==-1) 
		  hideObject("SELECT_EXECUTOR");
		break;
	case WFConst.WF_FUNC_SHOWOPTION:
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("NEXT_TRANSFER_NODE_ID");
		hideObject("ACTION_NAME_ID");
		hideObject("SELECT_EXECUTOR");
		hideObject("NEXT_GIVEBACK_NODE_ID");
		hideObject("NODE_TYPE_INFO");
		hideObject("DEFAULT_EXECUTOR_INFO");
		break;
	case WFConst.WF_FUNC_GIVEBACK:
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_TRANSFER_NODE_ID");
		// hideObject("NEXT_GIVEBACK_NODE_ID");
		hideObject("ACTION_NAME_ID");
		hideObject("SELECT_EXECUTOR");
		break;
	case WFConst.WF_FUNC_CALLBACK :
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_GIVEBACK_NODE_ID");
		hideObject("NEXT_TRANSFER_NODE_ID");
		hideObject("ACTION_NAME_ID");
		hideObject("SELECT_EXECUTOR");
		break;
	case WFConst.WF_FUNC_HANDOVER :
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_TRANSFER_NODE_ID");
		hideObject("ACTION_NAME_ID");
		hideObject("NEXT_GIVEBACK_NODE_ID");
		hideObject("DEFAULT_EXECUTOR_INFO");
		break;
	case WFConst.WF_FUNC_TRANSFER :
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_GIVEBACK_NODE_ID");
		hideObject("ACTION_NAME_ID");
		hideObject("DEFAULT_EXECUTOR_INFO");
		break;
	case WFConst.WF_FUNC_IMPOWER :
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_GIVEBACK_NODE_ID");
		hideObject("NEXT_TRANSFER_NODE_ID");
		hideObject("ACTION_NAME_ID");
		hideObject("DEFAULT_EXECUTOR_INFO");
		break;
	case WFConst.WF_FUNC_NEWINSTCOMMIT: 
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_GIVEBACK_NODE_ID");
		<%if (direction.equals("1")) {%>
			hideObject("ACTION_NAME_ID");
		<%}%>
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NEXT_TRANSFER_NODE_ID");
		showObject("COMMENT");
		break;
	case 14: 
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_GIVEBACK_NODE_ID");
	  //hideObject("ACTION_NAME_ID");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NEXT_TRANSFER_NODE_ID");
		hideObject("COMMENT");
		hideObject("main_exe");
		hideObject("assi_exe");
		break;
	case 15: 
		showObject('adBody');
		hideObject("OPTIONS_ADVANCE");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NODE_TYPE_INFO");
		hideObject("NEXT_GIVEBACK_NODE_ID");
	  hideObject("ACTION_NAME_ID");
		hideObject("DEFAULT_EXECUTOR_INFO");
		hideObject("NEXT_TRANSFER_NODE_ID");
		//hideObject("COMMENT");
		break;
	}

  <%IMessage m=MessageFactory.getMessageImp();
   if (!m.isMessageCanBeUsed()){%>
    hideObject("needMessage");
    hideObject("needShortMessage");
  <%}
    if (!m.isEmailCanBeUsed()){%>
      hideObject("needEmail");
    <%}
%>
  }
}//END FUNCTION INITPAGE

function hideObject(objId){
  var obj = document.getElementById(objId);
  if(obj)
    obj.style.display = "none";
}
function showObject(objId){
  var obj = document.getElementById(objId);
  if(obj)
    obj.style.display = "";
}

function commitTask(){
  if (oWfData.funcId==""){
    if (System.ACTION_NAME.value==""){
       alert("请选择处理!");
       return;
    }
  }
  var comment=System.COMMENT.value;
  if (comment.length>500){
     alert("意见内容不能大于500个汉字!");
     return;
  }
  if (funcId==WFConst.WF_FUNC_TRANSFER &&comment.length==0 ){
    alert("意见内容不能为空!");
    return;
  }

  getNextExecutorFromList();

	if (funcId==WFConst.WF_FUNC_HANDOVER && System.NEXT_EXECUTOR.value.length<=0) {
		alert("请选择移交工作的主办人。");
  	return ;
	}
  if (funcId==WFConst.WF_FUNC_HANDOVER && excutorHasSender(System.NEXT_EXECUTOR.value)==true){
    alert("任务不能移交给自己!");
    return;
  }
  if (funcId==WFConst.WF_FUNC_HANDOVER && System.COMMENT.value.length<=0){

		if(!confirm("您真的不希望输入移交意见吗?\n如果希望输入意见选否，如果不希望输入意见选是"))
			return ;
  }
  
	oWfData.setAction(System.ACTION_NAME.value);
	oWfData.setNextExecutorId(System.NEXT_EXECUTOR.value);
	//oWfData.setNextExecutorName(System.NEXT_EXECUTOR_NAME.value);
  oWfData.setNextExecutorName(System.NEXT_EXECUTOR_NAMESTR.value);
	oWfData.setNextExecutorAssId(System.NEXT_EXECUTOR_ASS.value);
	//oWfData.setNextExecutorAssName(System.NEXT_EXECUTOR_ASS_NAME.value);
  oWfData.setNextExecutorAssName(System.NEXT_EXECUTOR_ASS_NAMESTR.value);
	oWfData.setNextGiveBackNodeId(System.NEXT_GIVEBACK_NODE.value);
	oWfData.setNextTransferNodeId(System.NEXT_TRANSFER_NODE.value);
	oWfData.setComment(System.COMMENT.value);
	oWfData.setNeedMessage(System.needMessage.checked);
	oWfData.setNeedShortMessage(System.needShortMessage.checked);
	oWfData.setNeedEmail(System.needEmail.checked);

	window.returnValue = "isOk";
	window.close();
}

/**
 *从列表中获取主办人,和辅办人,并设置到隐藏域NEXT_EXECUTOR，以及NEXT_EXECUTOR_ASS中
 */
function getNextExecutorFromList(){
	var objExecutor_main=System.executor.options;
	var objExecutor_assistant=System.assistant.options;
	var firstLoop=true;
	var strExecutor_main="";
  var strExecutor_main_name="";
	var strExecutor_assistant="";
  var strExecutor_assistant_name="";
	for(var i=0,j=objExecutor_main.length;i<j;i++){
		if(!firstLoop){
     strExecutor_main+=",";
     strExecutor_main_name+=",";
		}
		strExecutor_main+=objExecutor_main[i].value;
    strExecutor_main_name+= objExecutor_main[i].text;
		firstLoop=false;
	}
	firstLoop=true;
	for(var i=0,j=objExecutor_assistant.length;i<j;i++){
		if(!firstLoop){
      strExecutor_assistant+=",";
      strExecutor_assistant_name+=",";
		}
		strExecutor_assistant+=objExecutor_assistant[i].value;
    strExecutor_assistant_name+=objExecutor_assistant[i].text;
		firstLoop=false;
	}

	//alert(strExecutor_main+"-"+strExecutor_assistant);
	System.NEXT_EXECUTOR.value=strExecutor_main;
  System.NEXT_EXECUTOR_NAMESTR.value=strExecutor_main_name;
	System.NEXT_EXECUTOR_ASS.value=strExecutor_assistant;
  System.NEXT_EXECUTOR_ASS_NAMESTR.value=strExecutor_assistant_name;
}

function displayExecutorsByRelation(){
  return true;
  /*var voRetRoot= 
    WFInterface.getExecutorsByRelation(System.ACTION_NAME.value);
  if (PF.parseBool(voRetRoot.getAttribute("success"))){
    setDefaultTaskExecutor(voRetRoot.text);
    return true;
  }else {
   alert("获取提交默认执行人失败:"+voRetRoot.text);
   return false;
  }*/
}

/**
 *将从服务器端获取到的默认执行人，进行解析并显示，以及
 *将默认执行人设置到主办人，辅办人列表框中
 *
 */
function setDefaultTaskExecutor(strDefaultInfo){

	var aDefaultInfo=strDefaultInfo.split(",");
	var needShowDefaultInfo=true;
	if(!aDefaultInfo || aDefaultInfo[0].length==0 || aDefaultInfo.length != 2)
		needShowDefaultInfo=false;
	if(!needShowDefaultInfo){
	//不需要显示默认执行人信息.
	  hideObject("DEFAULT_EXECUTOR_INFO");
	  return ;
	}

	document.getElementById("defaultExecutorInfoLabel").innerHTML=aDefaultInfo[0];
	document.getElementById("defaultExecutorInfoValue").innerHTML=aDefaultInfo[1];

	var strExecutorName_main=aDefaultInfo[1];
	var strExecutorCode_main=aDefaultInfo[2];
	//var strExecutorName_assistant=aDefaultInfo[3];
	//var strExecutorCode_assistant=aDefaultInfo[4];

	if(trim(strExecutorCode_main).length>0){
		var aExecutorName_main=strExecutorName_main.split(",");
		var aExecutorCode_main=strExecutorCode_main.split(",");
		//默认就是主办被选择状态
		for(var i=0,j=aExecutorCode_main.length;i<j;i++){
			addList(aExecutorName_main[i],aExecutorCode_main[i]);
		}
	}
	/*
	if(trim(strExecutorCode_assistant).length>0){
		var aExecutorName_assistant=strExecutorName_assistant.split(";");
		var aExecutorCode_assistant=strExecutorCode_assistant.split(";");
		disableAllTab('A3');
		EnableTab('NEXT_EXECUTOR_ASS_ID',true);
		tent=document.getElementById('assistant');
		for(var i=0,j=aExecutorCode_assistant.length;i<j;i++){
			addList(aExecutorName_assistant[i],aExecutorCode_assistant[i]);
		}
		//恢复主办页签被选状态
		disableAllTab('A3');
		EnableTab('NEXT_EXECUTOR_ID',true);
		tent=document.getElementById('executor');
	}
  */ 
}

function excutorHasSender(excutor){
   var hasSender=false;
   if (excutor.length>0){
     var s=excutor.indexOf("<%=sCurrentExecutorId%>");
     if (s<0){
     }else if(s==0){
        hasSender=true;
     }else{
        if (excutor.substr(s-1,1)==","){
          hasSender=true;
        }
     }
   }
   return hasSender;
}

function appendComment(){
   document.all("COMMENT").value+=document.all("SelectComment").value;
}

function EnableTab(tabName,isInit){
	var tab = document.getElementById(tabName + "Tab");
	var tablename = tab.getAttribute("tablename");
	tab.rows[0].cells[1].setAttribute("background","/style/img/tag/mid_select.gif");
	var valset = tab.getAttribute("valset");
	var imgL = document.getElementById(tabName + "L");
	imgL.setAttribute("src","/style/img/tag/left_select.gif");
	var imgR = document.getElementById(tabName + "R");
	imgR.setAttribute("src","/style/img/tag/right_select.gif");

	if(valset == "y"){
		var tabD = document.getElementById("valuesetTabData");
		tabD.style.display = "";
	}else{
		var tabD = document.getElementById(tabName + "TabData");
		tabD.style.display = "";
	}
	if (!isInit){
		if (getMainTableName().toUpperCase() != tablename.toUpperCase()){
			colResize(tablename);
		}
	}
}

function disableAllTab(tabName){
	var head = document.getElementById(tabName + "TabHead");
	for (var i=1,j=head.rows[0].cells.length; i<j; i++){
		var tabName = head.rows[0].cells[i].getAttribute("tabName");
		var valset = head.rows[0].cells[i].getAttribute("valset");
		var tab = document.getElementById(tabName + "Tab");
		tab.rows[0].cells[1].setAttribute("background", "/style/img/tag/mid_behind.gif");
		var imgL = document.getElementById(tabName + "L");
		imgL.setAttribute("src", "/style/img/tag/left_behind.gif");
		var imgR = document.getElementById(tabName + "R");
		imgR.setAttribute("src", "/style/img/tag/right_behind.gif");
		if(valset == "y"){
			var tabD = document.getElementById("valuesetTabData");
			tabD.style.display = "none";
		}else{
			var tabD = document.getElementById(tabName + "TabData");
			tabD.style.display = "none";
		}
	}
}

function nodeChecked(code,name,checked){

	if(checked){
		addList(name,code);
	}
	else{
		removeList(code);
	}
}

function addList(n,v){
	for(var i=0; i<tent.options.length; i++){
		if(v==tent.options[i].value)
			return;
	}
	tent.options[tent.options.length]=new Option(n,v,true,true);
}

function removeList(v){
	for(var i=0; i<tent.options.length; i++){
		if(v == tent.options[i].value)
			tent.options[i]=null;
	}
}

function showTreeDialog(){
	try{
	   var pd=popWin.document;
	}catch(e){
		//popWin = window.open("jsp/platform/treeSelectDialog.jsp?action=31&svCoCode=<%=SessionUtils.getAttribute(request,"svCoCode")%>&isall=off","treeCombox","toolbar=no,height=400, width=300, toolbar =no, menubar=no, scrollbars=no, resizable=yes, location=no, status=no");
		popWin = showModelessDialog("<%=webRoot%>/jsp/platform/treeSelectDialog.jsp?action=31&svCoCode=<%=SessionUtils.getAttribute(request,"svCoCode")%>&isall=<%=allowWhich>1?"on":"off"%>",window,"status:no;resizable:yes;help:no;dialogHeight:400px;dialogWidth:300px");
	}
}

//双击删除列表数据
function remov(){
	var ob=event.srcElement;
	if(ob.options.length>0){
		ob.removeChild(ob.options[ob.selectedIndex]);
		//ob.size--;
		}
	}
	

</SCRIPT>
</head>
<body leftMargin="" rightMargin="0" topMargin="0">

<applus:init>
	initPage();
  var voTB= toolbar.oOwner;
  voTB.addListener(new Listener(voTB.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));  
</applus:init>

<script>
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
  switch (oCall.id){
  	case "fok":
      commitTask();
    	break;
  	case "fcancel":
      window.close();
    	break;
  }
}
</script>

<applus:toolbar id="toolbar">
  <call id="fok" type="command" caption="确定" accesskey="O" isgranttoall="true" />
  <call id="fcancel" type="command" caption="取消" accesskey="C" isgranttoall="true" />
</applus:toolbar>

<form name="System" method="POST" action="">
<table>
  <tr>
    <td height="20"></td>
  </tr>
</table>
  <Table id="BodyTable" border="0" bgcolor=#BCBCBC cellspacing="1"  cellpadding="3" style="table-layout:fixed" width="98%" align="center">
    <TR id="ACTION_NAME_ID">
      <TD width="100" align="right" valign="top" bgcolor="#FFFFFF" class="normalFieldCaption">处理:</TD>
      <TD bgcolor="#FFFFFF">
	<select name="ACTION_NAME" onChange="displayExecutorsByRelation()" style="width: 98%">
	<%
	List actionList=null;
	Iterator actionIterator=null;
	if(sTemplateId!=null && sNodeId!=null &&
		((funcId.equals(WFConst.WF_FUNC_MANUALCOMMIT) ||funcId.equals(WFConst.WF_FUNC_SHOWOPTION))||funcId.equals("12")||funcId.equals("14"))
		){		
		actionList=ConfigureFacade.getActionList(Integer.parseInt(sTemplateId),Integer.parseInt(sNodeId));
		actionIterator=actionList.iterator();
		boolean endActionExists=false;
		while (actionIterator.hasNext()){
			action=(String)actionIterator.next();
			if(action.equalsIgnoreCase("结束")){//把处理放在下拉列表的最后一项
				endActionExists=true;
				continue;
			}
	%>
	<option value="<%=action%>"><%=action%></option>
	<%}//end for
	if(endActionExists){
	%>
	<option value="结束">结束</option>
	<%}//end if(endActionExists)
	}%>
        </select></TD>
    </TR>

   <TR id='NEXT_TRANSFER_NODE_ID'>
    <TD bgcolor="#FFFFFF" class="normalFieldCaption" align="right">跳转到:</TD>
    <TD bgcolor="#FFFFFF">
       <select name="NEXT_TRANSFER_NODE">
       <%if (sTemplateId!=null && funcId.equalsIgnoreCase(WFConst.WF_FUNC_TRANSFER)){
        List taskNodeList= ConfigureFacade.getTaskNodeList(Integer.parseInt(sTemplateId));
         Iterator i = taskNodeList.iterator();
         while (i.hasNext()){
           NodeMeta node=(NodeMeta)i.next();
           if (node.getId()!=Integer.parseInt(sNodeId)){%>
           <option value="<%=node.getId()%>"><%=node.getName()%></option>
       <%}
       }
       }%>
       </select>
    </TD>
  </TR>

  <TR id='NEXT_GIVEBACK_NODE_ID'>
    <TD bgcolor="#FFFFFF" class="normalFieldCaption" align="right">回退到:</TD>
    <TD bgcolor="#FFFFFF">
       <select name="NEXT_GIVEBACK_NODE">
       <%if (sInstanceId!=null&&funcId.equalsIgnoreCase(WFConst.WF_FUNC_GIVEBACK)){
          List taskNodeList =
      			ExecuteFacade.getExecutedNodeListBetween(Integer.parseInt(sTemplateId),
      			Integer.parseInt(sInstanceId),Integer.parseInt(sNodeId),
      			Integer.parseInt("-1"),false);

         int listSize=taskNodeList.size();
         if(listSize>0){
           //allowWhich:-1，仅起始，0，仅起始+前一个，1，仅前一个，2，所有
           if(allowWhich>-1){%>
             <option value="<%=((NodeMeta)taskNodeList.get(0)).getId()%>">上一个环节</option>
           <%}if(allowWhich!=1){%>
             <option value="<%=((NodeMeta)taskNodeList.get(listSize-1)).getId()%>">起始环节</option>
           <%}if(allowWhich==2){%>
             <option value="">----------------------------</option>
             <%    
               Iterator i = taskNodeList.iterator();
               while (i.hasNext()){
                 NodeMeta elem=(NodeMeta)i.next();
                 if (elem.getId() != Integer.parseInt(sNodeId)) {
                   %>
                   <option value="<%=elem.getId()%>"><%=elem.getName()%></option>
                 <%
                 }//end if elment != current activity id
               }//end while
             }//end if
           }//end if (size()>1)
       }//end if (sInstanceId!=null ){
       %>
       </select>
    </TD>
  </TR>

  <TR id='DEFAULT_EXECUTOR_INFO'>
    <TD bgcolor="#FFFFFF"  align="right" id="defaultExecutorInfoLabel">默认处理人:</TD>
    <TD  bgcolor="#FFFFFF"  id="defaultExecutorInfoValue" ></TD>
  </TR>
<TR id='NODE_TYPE_INFO'>
    <TD bgcolor="#FFFFFF"  align="right" id="defaultExecutorInfoLabel">当前环节类型:</TD>
    <TD  bgcolor="#FFFFFF"  id="nodeInfoValue" ></TD>
  </TR>

  <TR id='OPTIONS_ADVANCE'>
      <TD width="100" align="right" valign="top" bgcolor="#FFFFFF" class="normalFieldCaption">&nbsp;</TD>
      <TD bgcolor="#FFFFFF" ><input type="checkbox" onClick="if(this.checked){showObject('adBody');}else{hideObject('adBody');}">&nbsp;&nbsp;高级选项</TD>
  </TR>

  <TR bgcolor="#FFFFFF">
	  <TD width="100" align="right" valign="top" bgcolor="#FFFFFF" class="normalFieldCaption">意见:</TD>
	  <TD>
		  <Table id="AdBody" border="0" bgcolor=#FFFFFF cellspacing="0"  cellpadding="0" style="table-layout:fixed;display:none;" width="100%" align="left" >
		    <TR>
		      <TD bgcolor="#FFFFFF"> <textarea name="COMMENT" rows="5" cols="60" maxlength="100" ></textarea>
		        <br>
		        选择意见:
		        <select name="SelectComment" onchange="appendComment()">
		          <option></option>
		          <%
		         List commentArray=GeneralFunc.getValByValSetId("WF_COMMENT");
		         if(commentArray != null){
		           Iterator commentIterator = commentArray.iterator();
		           while(commentIterator.hasNext()){
		             Map vb = (Map)commentIterator.next();
		             out.println("<option value=\"" + vb.get("VAL")  + "\">" + vb.get("VAL") + "</option>");
		           }
		         }
		       %>
		        </select>
		        （限制输入50字） </TD>
		    </TR>
		    <TR id="needMessage">
		      <TD bgcolor="#FFFFFF"> <INPUT type="checkbox" name="needMessage">
		        即时提醒
		        <input type="checkbox" name="needShortMessage">
		        手机短信提醒
		        <input type="checkbox" name="needEmail">
		        邮件提醒 </TD>
		    </TR>
		    </Table>
    	</TD>
    </TR>

    <TR id="SELECT_EXECUTOR" bgcolor="#FFFFFF">
    	<TD colspan=2 align="right">
	  <Table id="A3TabHead" border="0" bgcolor=#FFFFFF style="border-left:1 solid silver ;border-right:1 solid silver ;" width="98%" align="center">
	    <tr >
			<td width="1" height="18" valign="top" nowrap></td>

	      <td width="1" nowrap valign="bottom" tabName="NEXT_EXECUTOR_ID" title='双击鼠标删除选择'>
	        <table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead"
				id="NEXT_EXECUTOR_IDTab" visible="true" tabName="NEXT_EXECUTOR_ID"
				tablename="NEXT_EXECUTOR_ID" areaName="A3" onclick="disableAllTab('A3');EnableTab('NEXT_EXECUTOR_ID',true);tent=document.getElementById('executor');">
				<tr>
					<td><img src="/style/img/tag/left_behind.gif" id="NEXT_EXECUTOR_IDL"></img></td>
					<td valign="middle" background="/style/img/tag/mid_behind.gif" nowrap>主办人&nbsp;</td>
					<td> <img src="/style/img/tag/right_behind.gif" id="NEXT_EXECUTOR_IDR"></img></td>
				</tr>
				</table>

	      </td>
	      <td height="30" valign="bottom" nowrap tabName="NEXT_EXECUTOR_ASS_ID" >
	        <table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead"
	    	 id="NEXT_EXECUTOR_ASS_IDTab" visible="true" tabName="NEXT_EXECUTOR_ASS_ID"
	    	 tablename="NEXT_EXECUTOR_ASS_ID" areaName="A3" >
					<tr>
						<td> <img src="/style/img/tag/left_behind.gif" id="NEXT_EXECUTOR_ASS_IDL" title='双击鼠标删除选择'></img></td>
						<td valign="middle" background="/style/img/tag/mid_behind.gif" nowrap title='双击鼠标删除选择' onclick="disableAllTab('A3');EnableTab('NEXT_EXECUTOR_ASS_ID',true);tent=document.getElementById('assistant');">辅办人&nbsp;</td>
						<td> <img src="/style/img/tag/right_behind.gif" id="NEXT_EXECUTOR_ASS_IDR" title='双击鼠标删除选择'></img></td>
						<%if(allowWhich>0){%>
						<td><img src="/style/img/main/search.gif" style="cursor: hand" onClick="showTreeDialog();" title='点击打开选择窗口'></td>
						<%}%>
					</tr>
				 </table>
	      </td>
	  </tr>
	</table>
	<div tabName="NEXT_EXECUTOR_ID" id="NEXT_EXECUTOR_IDTabData" style="width: 100%" align="center">
	  <Table  border="0" bgcolor=#BCBCBC cellspacing="1"  cellpadding="3" style="table-layout:fixed" width="98%" align="center">
	    <TR align="center" bgcolor="#FFFFFF" id='NEXT_EXECUTOR_ID'>
	      <TD width="50%" title='双击鼠标删除选择'>
	      	<select name="executor" id="NEXT_EXECUTOR_NAME"  size="8" multiple style="width: 99%;" ondblclick="remov();">
	        </select>
          <INPUT type="hidden" size="51" name="NEXT_EXECUTOR">
          <INPUT type="hidden" size="51" name="NEXT_EXECUTOR_NAMESTR">
        </TD>
	    </TR>
	  </table>
	</div>
	<div tabName="NEXT_EXECUTOR_ASS_ID" id="NEXT_EXECUTOR_ASS_IDTabData" style="width:100%" align="center">
	  <Table  border="0" bgcolor=#BCBCBC cellspacing="1"  cellpadding="3" style="table-layout:fixed" width="98%" align="center">
	    <TR align="center" bgcolor="#FFFFFF" id='NEXT_EXECUTOR_ID'>
	      <TD width="50%" title='双击鼠标删除选择'>
	      	<select name="assistant" id="NEXT_EXECUTOR_ASS_NAME" size="8" multiple style="width: 99%;" ondblclick="remov();">
	        </select>
          <INPUT type="hidden" size="51" name="NEXT_EXECUTOR_ASS">
          <INPUT type="hidden" size="51" name="NEXT_EXECUTOR_ASS_NAMESTR">
        </TD>
	    </TR>
	  </table>
	</div>
	</TD>
  </TR>

</table><!--主布局表格-->

 	<br>
  </form>
<script language="JavaScript">
var tent = document.forms[0].executor;
initTab("A3");
</script>
<applus:endpage />
</body>
</html>


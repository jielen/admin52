<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@page import="com.anyi.gp.domain.User"%>
<%@page import="com.anyi.gp.domain.Group"%>
<%@page import="com.anyi.gp.sso.SessionContext"%>
<%@page import="com.anyi.gp.desktop.TreeBuilder"%>
<%@page import="com.anyi.gp.desktop.MenuTreeBuilder"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>

<jsp:useBean id="DeskTopBeanId" scope="page" class="com.anyi.gp.desktop.DeskTopBean" />
<%
  String userName = (String)SessionUtils.getAttribute(request,"svUserID");
	DeskTopBeanId.setUserID(userName);
	
  String svCoCode = (String)SessionUtils.getAttribute(request,"svCoCode");
  String svOrgCode = (String)SessionUtils.getAttribute(request,"svOrgCode");

  String defTopMenuNodes = request.getParameter("defTitle");
  String defTopMenuNodesName = request.getParameter("defTitleName");
  if(defTopMenuNodesName == null){
  	defTopMenuNodesName = "";
  }
    
  String token = (String) SessionUtils.getToken(request);
  if(token == null){
  	token = "";
  }
  
  String menuHtml = "";
  String groupId = request.getParameter("groupId");
  if(groupId == null || groupId.length() == 0){
  	ServletContext context = session.getServletContext();
  	SessionContext sessionContext = (SessionContext) context.getAttribute(token);
  	User user = sessionContext.getCurrentUser();
  	List groupList = user.getGroupList();
  	if(groupList != null && !groupList.isEmpty()){
  	  groupId = ((Group)groupList.get(0)).getId();
  	}
  }
  if(groupId != null && groupId.length() > 0){  	
  	Map params = new HashMap();
  	params.put("rootCode", defTopMenuNodes);
  	params.put("userId", userName);
  	params.put("coCode", svCoCode == null ? "" : svCoCode);
  	params.put("orgCode", svOrgCode == null ? "" : svOrgCode);
  	params.put("isRemoveEmpty", "true");
    params.put("isOnlyInMenu", "true");
    params.put("posiCode", SessionUtils.getAttribute(request, "svPoCode"));//增加职位权限过滤
    
  	TreeBuilder builder = new MenuTreeBuilder();
  	menuHtml = builder.generateTree(params).toHtml();
  }
  
  String topMenuNodesSpan = defTopMenuNodes + "Span";
  String topMenuNodesChild = defTopMenuNodes + "Child";
  
  String appName = request.getContextPath();
  appName = appName.substring(1);
%>
<html>
<head>
<LINK href="script/applus_new.css" rel="stylesheet" type="text/css">
<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
<SCRIPT language="javascript" src="script/Menu.js"></SCRIPT>
<SCRIPT language="VBScript"   src="script/formenctype.vbs"></SCRIPT>
<script language="JavaScript">
function setTitle(){
	
}

function changeSysApp(Node,NodeName){

  document.getElementById("SYS_APP_NAME").innerHTML = NodeName;

	var vasNames = new Array();
	var vasValues = new Array();
	vasNames[0] = "userId";
	vasValues[0] = '<%=userName%>';
	vasNames[1] = "coCode";
	vasValues[1] = '<%=svCoCode%>';
	vasNames[2] = "orgCode";
	vasValues[2] = '<%=svOrgCode%>';
	vasNames[3] = "pageId";
	vasValues[3] = Node;
    vasNames[4] = "isHtml";
	vasValues[4] = true;
	vasNames[5] = "isRemoveEmpty";
	vasValues[5] = true;
	vasNames[6] = "token";
	vasValues[6] = TOKEN;
	vasNames[7] = "isOnlyInMenu";
	vasValues[7] = true;
	 
	var menuTree = requestDataK("getMenuTree", "all", vasNames, vasValues);

  	document.getElementById("menuTree").innerHTML = menuTree; 
}
</script>
</head>

<script language="JavaScript">
	var TOKEN = '<%=token%>';
	var APPNAME = '<%=appName%>';
	var serverScheme = '<%=request.getScheme()%>';   
	var serverIp = '<%=request.getServerName()%>';   
	var serverPort = '<%=request.getServerPort()%>';
</script>
<body  style="overflow:hidden" leftMargin="0" rightMargin="0" topMargin="0" onload="setTitle();" onunload="closeMenuPage()"  class="menuBody" nowrap>
<input id="selectNodes" type="hidden" name="selectNodes" value="<%=defTopMenuNodes%>">
<!-- begin add by xjh 3.18-->
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td height="27" background="/style/img/main/leftbg.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="font1">系统文件夹</td>
        <td width="25"><img src="/style/img/main/leftclose.gif" width="13" height="13" border="0" style="cursor:hand" onclick="javascript:parent.centerFrame.ImageChange();javascript:parent.centerFrame.ChangeFrameSize()"></td>
      </tr>
    </table></td>
  </tr>
  
  <tr>
    <td height="24" background="/style/img/main/leftappbg.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="28" align="right"><img src="/style/img/main/plusbq.gif" width="16" height="16"></td>
        <td>&nbsp;<a href="#" id="SYS_APP_NAME"><%=defTopMenuNodesName%></a></td>
      </tr>
    </table></td>
  </tr>
   <jsp:getProperty name="DeskTopBeanId" property="ie5menu" />
  <tr>
	    <td colspan="3"  valign="top"  align="center" height="90%">
	       <table  border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" >
	           <tr valign="top" style="overflow:visible">
	              <td width="5" valign="top"  height="100%" style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#CBCBCB', endColorStr='#F2F2F2', gradientType='0')"></td>
	              <td  valign="top"  style="filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#CBCBCB', endColorStr='#F2F2F2', gradientType='0')">
	                 <div cellpadding="0" cellspacing="0" STYLE="width:100%; height:100%;  overflow: auto; left:30px">
										 <font size="2.5" >  <nobr><span id="menuTree" name="menuTree"><%out.println(menuHtml);%></span></nobr> </font>
	                 </div>
	               </td>
	           </tr>
	       </table>
	    </td>
	 </tr>
</table>
<div style="display:none">
	<form name="compoForm" action="" method="post">
		<input type="hidden" name="token" value="<%=token%>">
	</form>	
<div>
<script language="javascript">
////document.getElementById("<%=topMenuNodesSpan%>").style.display ="block"
////document.getElementById("<%=topMenuNodesChild%>").style.display ="block"
</script>
<!-- end  add by xjh 3.18 -->
<script language="javascript">
  document.oncontextmenu=showNone;
  document.onmousedown=menuEvent;
  if(document.all&&window.print)
    document.body.onclick=hidemenuie5;

  var x=true;
function ChangeImg(){
  if (x){
    right_part.style.display="none";
    left_bar.style.display="";
    top.main_frame.frameSpacing=0;
    top.main_frame.frameBorder=0;
    top.main_frame.border=0;
    top.main_frame.cols="28,*";
    parent.document.all.main.noResize=true;
    parent.document.all.treeframe.noResize=true;
    x=false;
  }else{
    right_part.style.display="";
    left_bar.style.display="none";
    top.main_frame.cols="190,*";
    top.main_frame.frameSpacing=1;
    top.main_frame.frameBorder=1;
    top.main_frame.border=0;
    parent.document.all.main.noResize=false;
    parent.document.all.treeframe.noResize=false;
    x=true;
  }
}
function frameDrag() {
   if (event.srcElement.offsetWidth<50 && x){
     parent.document.all.main.noResize=true;
     parent.document.all.treeframe.noResize=true;
     ChangeImg();
   }
}
</script>
</body>
</html>

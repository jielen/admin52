<%--
Copyright 2004 ufgov.
Corporation home page: http://www.ufgov.com.cn
description: 业务上级页面
$Id: treeSelectDialog.jsp,v 1.15 2007/06/25 09:57:57 chupp Exp $
--%>
<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@ page import="java.util.*"%>
<%@ page import="javax.servlet.jsp.JspWriter"%>
<%@ page import="com.anyi.gp.util.StringTools"%>
<%@ page import="com.anyi.gp.pub.SessionUtils" %>
	<%	String action = request.getParameter("action");%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title></title>
<base href="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/" target="_self">
<LINK href="script/applus.css" rel=stylesheet type=text/css>
<LINK href="script/BusinessSuper.css" rel=stylesheet type=text/css>
<style type="text/css">
	BODY {
		background-color: #ffffff;
		background:none;
	}
</style>
 <SCRIPT language="javascript" src="script/page.js"></SCRIPT>
	<SCRIPT language="javascript" src="script/foreign.js"></SCRIPT>
  <SCRIPT language="javascript" src="script/grid.js"></SCRIPT>
  <SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
  <SCRIPT language="javascript" src="script/PageData.js"></SCRIPT>
  <SCRIPT language="javascript" src="script/GFunctions.js"></SCRIPT>
  <script language="JavaScript" src="script/tree.js"></script>
  <script language="JavaScript" src="script/loading.js"></script>

</head>
<body bgcolor="#ffffff"> 
<div align='center' id='loading' style='position: absolute; z-index: 9999; width: 288px; height: 193px; display:  none; left: 10px; top: 50px;'><img src=/style/img/businessJunior/appInstall_animated.gif>正在生成数据，请稍候...</div>
<script language="JavaScript">
	loading();
function getObjectById(id){ 
		if(document.all) {
			return(eval("document.all."+ id)); 
		}
		return(eval(id)); 
	}		
</script>
<%

	if(action == null)
		return;
	int ac = Integer.parseInt(action);
	if (ac <= 30){
%>
<script language="JavaScript">
		function clickNode(){
			var result = true;
			setCurrCode(event.srcElement.code);
			currCode = event.srcElement.code;
			convertHighlight(currCode);
			dialogArguments.putTab<%=action%>Value(currCode, event.srcElement.value);
		}
		function convertHighlight(code){
			if(document.getElementById(code + "TXT")){
				if(document.getElementById(code + "TXT").style.backgroundColor == "highlight"){
					document.getElementById(code + "TXT").style.backgroundColor = "#FFFFFF";
					document.getElementById(code + "TXT").style.color = "#000000";
				}else{
					document.getElementById(code + "TXT").style.backgroundColor = "highlight";
					document.getElementById(code + "TXT").style.color = "highlighttext";
				}
			}
		}
	
</script>
<jsp:useBean id="bj" class="com.anyi.gp.bean.BusinessJuniorBean" scope="session"/>
<%
  String svNd = SessionUtils.getAttribute(request,"svNd").toString();
	switch(ac){
		case 10:
		/////////////self-company set
		if(bj.getComsTreeStr(svNd)!="" && bj.getComsTreeStr(svNd)!=null)
			out.println(bj.getComsTreeStr(svNd));
		else
			out.println("没有可显示的单位或人员");	
			break;
		case 20:
		/////////////junior-company set
		if(bj.getComsTreeStr(svNd)!=""&&bj.getComsTreeStr(svNd)!=null)
			out.println(bj.getComsTreeStr(svNd));
		else	
			out.println("没有可显示的单位或人员");
			break;
		case 11:
		///////////self-org
		if(bj.getSuperOrgsTree(svNd)!=""&&bj.getSuperOrgsTree(svNd)!=null)
		  out.println(bj.getSuperOrgsTree(svNd));
		else 
			out.println("没有可显示的单位或人员");
		  break;
		case 21:
		///////////junior-org
		//System.out.println(bj.getJuniorOrgsTree(svNd));
		if(bj.getJuniorOrgsTree(svNd)!=""&&bj.getJuniorOrgsTree(svNd)!=null)
			out.println(bj.getJuniorOrgsTree(svNd));
		else	
			out.println("没有可显示的单位或人员");
			break;
		case 13:
		///////////  self-users
		if(bj.getSuperUsersTree(svNd)!=""&&bj.getSuperUsersTree(svNd)!=null)
			out.println(bj.getSuperUsersTree(svNd));
		else	
			out.println("没有可显示的单位或人员");
			break;
		case 23:
		///////////  junior-users
		if(bj.getJuniorUsersTree(svNd)!=""&&bj.getJuniorUsersTree(svNd)!=null)
			out.println(bj.getJuniorUsersTree(svNd));
		else
			out.println("没有可显示的单位或人员");	
			break;
		case 12:
		//////////   self-positions
		if(bj.getSuperPosisTree(svNd)!=""&&bj.getSuperPosisTree(svNd)!=null)
			out.println(bj.getSuperPosisTree(svNd));
		else	
			out.println("没有可显示的单位或人员");
			break;
		case 22:
		///////////  junior-positions
		if(bj.getJuniorPosisTree(svNd)!=""&&bj.getJuniorPosisTree(svNd)!=null)
			out.println(bj.getJuniorPosisTree(svNd));
		else	
			out.println("没有可显示的单位或人员");
			break;
		case 30:
		//////////  compos tree
		if(bj.getComsTreeStr(svNd)!=""&&bj.getComsTreeStr(svNd)!=null)
			out.println(bj.getComsTreeStr(svNd));
		else
			out.println("没有可显示的单位或人员");	
			break;
		default:
		  break;
	}
%>
<script language="JavaScript">
	var selectObjName = dialogArguments.event.srcElement.getAttribute("for");
	var selectObj = dialogArguments.document.getElementById(selectObjName+"3");
	if(selectObj){
		for(var i=0; i< selectObj.options.length; i++){
			convertHighlight(selectObj.options[i].value);
		}
	}
</script>
<%
}
else{
	switch(ac){
		case 31:
			//构造单位、组织、职位、人员树状选择
			String coms = request.getParameter("svCoCode");//根据当前登录人单位过滤
			String isAll = request.getParameter("isall");
%>			
<script language="javascript">
	_kTree_RelationToParent=false;
	function check_Click(code,pcode){
		var childrenNode = document.getElementById(code + "Child");
		if (childrenNode== null) {
			parseNode(code);
			return;
}
		var children = childrenNode.childNodes;
		for (var i=0,j=children.length; i<j; i++){
			var childCode = children.item(i).id;
			if (!childCode) continue;
			if (children.item(i).folder == "Y") continue;
			var childCode = children.item(i).id;
			check_Click(childCode,"");
		}
	}
	function parseNode(code){
		var node = document.getElementById(code);
		var prefix1 = node.PREFIX1;
		var prefix2 = node.PREFIX2;
		var prefix3 = node.PREFIX3;
		if(node.NODE_ICON!="/style/img/tree/user.png")
			return;
		if (dialogArguments!=null && dialogArguments.nodeChecked){
			
			dialogArguments.nodeChecked(code.substring((prefix1+prefix2+prefix3).length),
			document.getElementById(code+"TXT").value,event.srcElement.checked);
		}
	}
</script>
			<table width="98%" border="0" cellspacing="0" cellpadding="3">
			  <tr> 
			    <td>
			    	<% if(!"on".equals(isAll)){%>
			    		<a href="<%=request.getRequestURI()%>?action=31<%=coms==null?"":"&svCoCode="+coms%>&isall=off">
			    			<img src="/style/img/tree/icon-arrow3.gif" border=0>显示我的单位</a>			    	  
			    	<%}else{%>
							<a href="<%=request.getRequestURI()%>?action=31<%=coms==null?"":"&svCoCode="+coms%>&isall=on">
			    			<img src="/style/img/tree/icon-arrow3b.gif" border=0>显示全部</a>

			      <%}%>			    		
			      	|&nbsp;<a href="#" onClick="opener=null; window.close();" style="display:none">关闭窗口</a>
			   </td>
			  </tr>
			  <tr> 
			    <td>
			<%
			  String svNd = SessionUtils.getAttribute(request,"svNd").toString();
				if("on".equals(request.getParameter("isall")) && !StringTools.isEmptyString(coms))
				out.println(new com.anyi.gp.pub.TreeSelect().createTree("全部", svNd));
				else
				out.println(new com.anyi.gp.pub.TreeSelect().getTreeByCoCode(new String[]{coms}, svNd));
			%></td>
			  </tr>
			</table>
<%

			break;
		default:
			break;
	}
}

%>
<script>
	loadFinish();
</script>
</body>
</html>

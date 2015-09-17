<%--
Copyright 2004 ufgov.
Corporation home page: http://www.ufgov.com.cn
description: 业务上级设置页面
$Id: bpList.jsp,v 1.13 2006/06/21 01:29:35 cuiliguo Exp $
--%>
<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>

<%@page import="java.sql.Connection" %>
<%@page import="java.sql.SQLException"%>

<%@page import="java.io.PrintWriter" %>

<%@page import="com.anyi.gp.pub.DAOFactory"%>
<%@page import="com.anyi.gp.pub.DBHelper"%>
<%@page import="com.anyi.gp.pub.*" %>
<%@page import="com.anyi.gp.*" %>
<%@page import="com.anyi.gp.bean.*" %>
<%@page import="com.anyi.gp.TableData"%>
<%@page import="com.anyi.gp.pub.SessionUtils" %>
<%!
	String convert(String name){

    name = name.replaceAll(BusinessJuniorBean.SAME_CODE,"同级");
 		name = name.replaceAll(BusinessJuniorBean.SUP_CODE,"上级");
    name = name.replaceAll(BusinessJuniorBean.COMMON_CODE,"全部");
    return name;
	}
	String crop(String str, int len){
		if(str != null && str.length() > len)
			return str.substring(0,len)+"...";
		return str;
	}
%>
<jsp:useBean id="bj" class="com.anyi.gp.bean.BusinessJuniorBean" scope="session"/>
	<%

    String svNd = SessionUtils.getAttribute(request,"svNd").toString();
    
		if(request.getParameter("ID")!=null){
			if("edit".equals(request.getParameter("ac"))){
			//编辑
				bj = BusinessJuniorBean.doSelect(request.getParameter("ID"));
				session.setAttribute("bj",bj);
				out.println("<script>parent.location='"+request.getContextPath()+"/jsp/admin/BusinessSuperSet.jsp';</script>");
			}else{
				//删除
				try{
					bj.delete(request.getParameter("ID"));
				}catch(Exception e){
					out.println("<script>alert('删除失败："+e.getMessage()+"');</script>");
				}
			}
		}
		String ord = request.getParameter("ord")!=null?request.getParameter("ord"):"id";
		String desc = "desc".equals(request.getParameter("desc"))?"asc":"desc";
	%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<script language="javascript">
	function refresh() {
		window.location.reload();
	}
	window.onload = function() {
		//setTimeout(refresh, 5000);
	}
</script>
<title>业务上级列表</title>
<base href="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/">
<LINK href="script/applus.css" rel=stylesheet type=text/css>
<LINK href="script/BusinessSuper.css" rel=stylesheet type=text/css>
<style type="text/css">
	BODY {
		background-color: #ffffff;
	}
	.myGrid {
		color: #ffffff;
		background-color: #7284AA;
		cursor: hand;
	}
	a {
		color: WindowText;
		text-decoration: none;
	}
	
</style>
<script language="javascript">
	function doOrder(name){
		var URL = "<%=request.getRequestURI()%>";
		URL +="?ord="+name+"&desc=<%=desc%>";
		window.open(URL,'_self');
	}
</script> 
</head>

<body>
	
<table width="100%" border="0" cellspacing="1" cellpadding="1" bgColor="#ffffff">
	<tr>
		<td height="25" class="myGrid" onClick="doOrder('PROJECT_NAME')"><b>方案名称</b></td>
		<td class="myGrid" onClick="doOrder('PRIORITY')"><b>优先级</b></td>
		<td class="myGrid" onClick="doOrder('DESCRIPTION')"><b>描述</b></td>
		<td class="myGrid" onClick="doOrder('ID')"><b>操作</b></td>
	</tr>
  <%
  	Connection con = null;
  	try{
  		con = DAOFactory.getInstance().getConnection();
  		String sql = "select * from AS_WF_BUSINESS_SUPERIOR order by "+ord+" "+desc;
  		Delta data = DBHelper.queryToDelta(con, sql,new Object[0]);
  		for(int i=0; i< data.size(); i++) {
          TableData meta = (TableData)data.get(i);
           %>
  <tr bgcolor="#FFFFFF" > 
  	<form acion="<%=request.getRequestURI()%>" method="POST" onSubmit="return confirm('确实要删除此记录吗?');">
    <input type="hidden" name="ID" value="<%=meta.getField("ID")%>">
    <td class="borderall"><%=(String)meta.getField("PROJECT_NAME")%></td>
    <td class="borderall"><%=meta.getField("PRIORITY")%></td>
    <td class="borderall"><%=(String)meta.getField("DESCRIPTION")%></td>
    <td class="borderall"><span title='上级单位：<%=bj.getCompanyNames(convert((String)meta.getField("SUP_CO_CODE")), svNd)%>
上级机构：<%=bj.getOrganizationNames(convert((String)meta.getField("SUP_ORG_CODE")))%>
上级职位：<%=bj.getPositionNames(convert((String)meta.getField("SUP_POSI_CODE")))%>
上级员工：<%=bj.getUserNames(convert((String)meta.getField("SUP_EMP_CODE")))%>
------------------------
下级单位：<%=bj.getCompanyNames(convert((String)meta.getField("JUN_CO_CODE")), svNd)%>
下级机构：<%=bj.getOrganizationNames(convert((String)meta.getField("JUN_ORG_CODE")))%>
下级职位：<%=bj.getPositionNames(convert((String)meta.getField("JUN_POSI_CODE")))%>
下级员工：<%=bj.getUserNames(convert((String)meta.getField("JUN_EMP_CODE")))%>
------------------------
<%=(String)meta.getField("SUP_CONDITION")%>
'>详细信息</span> | 
<a href='<%out.print(Pub.encodeUrl(request.getRequestURI() + "?ID=" + meta.getField("ID") + "&ac=edit"));%>'>编辑</a> | 
<span style='cursor:hand' onClick="if(confirm('确实要删除此记录吗?')) document.forms[<%=i%>].submit();">删除</span>
</td>
</form>
  </tr>
  <%
      }
    }catch(Exception se){
     		se.printStackTrace();
     		out.println("查询数据库表[AS_WF_BUSINESS_SUPERIOR]出错.");
    }
    finally{
    	DBHelper.closeConnection(con);
    }
  %>
   
</table>
</body>
</html>

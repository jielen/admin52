<%@page import="com.anyi.gp.Pub" %>
<%

/**********************************************************

 *描述：预留字段的设置

 * 修改原因：根据预留字段名称修改对应值集名称

 * 修改时间：2003-3-26

 * 修改原因：去掉多语种，修改BUG

 * 修改时间：2003-2-27

 * 修改原因：获得部件对应表

 * 修改时间：2003-3-18

 * 作者：Macken Lee

 **********************************************************/

String compoId = "";

if(compoId==null) compoId="";

String dataItemType =request.getParameter("DATAITEMTYPE");

if(dataItemType==null) dataItemType="";

String vsEnable=request.getParameter("VSENABLE");

if(vsEnable==null) vsEnable="";

String  vsNameEnable = request.getParameter("VSNAMEENABLE");
if(vsNameEnable==null) vsNameEnable="";

String topUrl = Pub.encodeUrl("dispatcher.action?function=top&SYSDATAITEMTYPE=" + dataItemType 
							+ "&SYSCOMPOID=" + compoId + "&VSENABLE=" + vsEnable + "&VSNAMEENABLE=" + vsNameEnable);
String mainUrl = Pub.encodeUrl("dispatcher.action?function=main&SYSDATAITEMTYPE=" + dataItemType
						  + "&SYSCOMPOID=" + compoId + "&VSENABLE=" + vsEnable + "&VSNAMEENABLE=" + vsNameEnable);
%>

<html>

<head>

<title></title>

</head>

<frameset rows="70,*" frameborder="NO" border="0" framespacing="0">

  <frame name="topFrame" scrolling="no" noresize src="<%=topUrl%>">

  <frame name="mainFrame" scrolling="no" noresize src="<%=mainUrl%>">

</frameset>



<noframes>

<body bgcolor="#FFFFFF" text="#000000">

</body>

</noframes>

</html>


<%@page import="com.anyi.gp.Pub" %>
<%

/**********************************************************

 *������Ԥ���ֶε�����

 * �޸�ԭ�򣺸���Ԥ���ֶ������޸Ķ�Ӧֵ������

 * �޸�ʱ�䣺2003-3-26

 * �޸�ԭ��ȥ�������֣��޸�BUG

 * �޸�ʱ�䣺2003-2-27

 * �޸�ԭ�򣺻�ò�����Ӧ��

 * �޸�ʱ�䣺2003-3-18

 * ���ߣ�Macken Lee

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


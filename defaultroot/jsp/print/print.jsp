<%@ page contentType="text/html; charset=GB2312" %>
<%
	String fileName = request.getParameter("fileName");
	//fileName = new String(fileName.getBytes("iso-8859-1"), "GBK");
	//String host = request.getParameter("hostAddr");
	//String baseUrl = request.getParameter("baseUrl");
	//String addr = "http://" + host + baseUrl + "/"+fileName;
	//System.out.println("url==="+addr);
	//String pdfVersion = request.getParameter("pdfVersion");
%>
<html>
	<head>
	</head>
	<APPLET ID='JrPrint' CODE = 'JasperPrintApplet.class' CODEBASE = './' ARCHIVE = 'jasperPrint.jar' WIDTH = '0' HEIGHT = '0'>
		<PARAM NAME = "strURL" VALUE ="<%=request.getContextPath()%>/jrPrintPrinter.action?fileName=<%=fileName%>">
	</APPLET>
</html>
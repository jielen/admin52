<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String cocode = "";//SessionUtils.getAttribute(session, "svCoCode");
%>
<html>
  	<head>
    	<title>打印模板下发</title>
		<applus:include language="javascript">
			script.print.printTempDist
		</applus:include>
		<script type="text/javascript">
			var cocode = "<%=cocode%>";
		</script>
  	</head>
  	<body onload="setPageInit();">
  		<H3><FONT COLOR="#336699">请在要下发的模板前打勾，建议每次不超过10个</FONT>	</H3>
		<select name="templateinfo" style="font-family: Verdana, Arial; font-size: smaller; font-weight: normal;" onChange="changeTemplate();">
			<option value='gl' selected>帐务系统</option>
			<option value='other'>其他系统</option>
		</select>
		<input type='button' value='开始下发' onclick="distribute();" style="width:150px;">
		<input type='button' value='关闭窗口' onclick="closewin();" style="width:150px;">
    	<table border="1" id="glTplList" style="display:">
    		<th bgcolor="#cccc99" width="40"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">&nbsp;</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">打印模板名称</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">打印模板代码</FONT></th>
    		<tbody>
    		</tbody>
    	</table>
    	<table border="1" id="otherTplList" style="display:none">
    		<th bgcolor="#cccc99" width="40"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">&nbsp;</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">打印模板名称</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">打印模板代码</FONT></th>
    		<tbody>
    		</tbody>
    	</table>
  	</body>
</html>

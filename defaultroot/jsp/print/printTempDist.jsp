<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String cocode = "";//SessionUtils.getAttribute(session, "svCoCode");
%>
<html>
  	<head>
    	<title>��ӡģ���·�</title>
		<applus:include language="javascript">
			script.print.printTempDist
		</applus:include>
		<script type="text/javascript">
			var cocode = "<%=cocode%>";
		</script>
  	</head>
  	<body onload="setPageInit();">
  		<H3><FONT COLOR="#336699">����Ҫ�·���ģ��ǰ�򹴣�����ÿ�β�����10��</FONT>	</H3>
		<select name="templateinfo" style="font-family: Verdana, Arial; font-size: smaller; font-weight: normal;" onChange="changeTemplate();">
			<option value='gl' selected>����ϵͳ</option>
			<option value='other'>����ϵͳ</option>
		</select>
		<input type='button' value='��ʼ�·�' onclick="distribute();" style="width:150px;">
		<input type='button' value='�رմ���' onclick="closewin();" style="width:150px;">
    	<table border="1" id="glTplList" style="display:">
    		<th bgcolor="#cccc99" width="40"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">&nbsp;</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">��ӡģ������</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">��ӡģ�����</FONT></th>
    		<tbody>
    		</tbody>
    	</table>
    	<table border="1" id="otherTplList" style="display:none">
    		<th bgcolor="#cccc99" width="40"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">&nbsp;</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">��ӡģ������</FONT></th>
    		<th bgcolor="#cccc99" width="200"><FONT FACE="ARIAL" COLOR="#336699" SIZE="2">��ӡģ�����</FONT></th>
    		<tbody>
    		</tbody>
    	</table>
  	</body>
</html>

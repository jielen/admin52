<%@ page language="java" contentType="text/html; charset=GBK" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String articleId = request.getParameter("articleId");
%>
<html>
  	<head>
    	<title>���·���</title>
    	<style type="text/css">
    	<!--
    	th{
    		background:url(/portal/html/res/table_th.gif);
			line-height: 30px;
    	}
    	body, th, td {
  			font-family: Arial, Helvetica, Sans-serif;
  			font-size:12px;
		}
    	//-->
    	</style>
		<applus:include language="javascript">
			script.admin.AS_ARTICLE_Publish;
		</applus:include>
		<script type="text/javascript">
			var articleId = '<%=articleId%>';
		</script>
	</head>
  	<body onload="setPageInit();">
		<br>
    	<table border="0" cellspacing="1" cellpadding="0" bgcolor="#67A0D7" width="98%" align="center">
    		<tr><td>
    			<table border="0" cellspacing="0" cellpadding="0" width="100%" align="center">
    				<tr>
    					<th><input type='button' value='��ʼ����' onclick="publish();"></th>
	    				<th width="100%">���·���</th>
	    			</tr>
	    		</table>
	    		</td>
	    	</tr>
	    	<tr><td height="30" bgcolor="#ffffff">����Ҫ������Ƶ��ǰ��</td>
    		</tr>
    		<form name="portletForm">
    		<tr><td>
    			<table id="portlet" border="0" cellspacing="1" cellpadding="0" width="100%" align="center">
    				<tr>
			    		<th width="40"><input type='checkbox' name='chkall' onclick="chkAll();"></th>
			    		<th width="250">Ƶ������</th>
			    		<th width="150">Ƶ������</th>
	    			</tr>
    			</table>
    			</td>
    		</tr>
    		</form>
    	</table>
  	</body>
</html>

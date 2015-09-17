<%@ page language="java" pageEncoding="GBK"%>
<%
	String result = (String) request.getAttribute("result");
%>
<html>
	<head>
	<script type="text/javascript">
	function init(){
		var result = "<%=result%>";
		if(result != null){
			alert(result);
		}
	}
	</script>
	</head>
	<body onload="init()">
	</body>
</html>

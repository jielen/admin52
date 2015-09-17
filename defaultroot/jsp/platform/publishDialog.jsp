<!-- $Id: publishDialog.jsp,v 1.2 2008/05/30 08:20:44 liubo Exp $ -->
<%@ page contentType="text/html; charset=GBK" %>

<html>
<head>
<title>发布</title>
<script type="text/javascript">
	function confirm() {
			var params = window.dialogArguments;
			params[0] = document.getElementById("type").value;
			params[1] = document.getElementById("title").value;
			window.close();
	}
	function cancel() {
		window.returnValue = "false";
	}
</script>
</head>
<body>
	<table>
		<tr>
			<td>发布类型:</td>
			<td>
				<select id="type">
					<option value="excel">excel</option>
					<option value="pdf">pdf</option>
				</select>
			</td>
		</tr>
		<tr>
			<td>标题</td>
			<td>
				<textarea rows="3" cols="10" id="title"></textarea>
			</td>
		</tr>
		<tr>
			<td>
				<button onclick="javascript:confirm();">确定</button>
				<button onclick="javascript:cancel();">取消</button>
			</td>
		</tr>
	</table>
</body>

</html>

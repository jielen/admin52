<%@page language="java" contentType="text/html; charset=GBK"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
		<title>�ϴ��ļ�</title>
		<SCRIPT language="javascript" src="<%=path%>/script/Community.js"></SCRIPT>
		<SCRIPT language="javascript">
		function fileBack(result){ 
		     if(result.getAttribute("success")=="true"){
		        returnValue=new Array();
		        returnValue[0]=document.uploadform.addfile.value;
		        returnValue[1]=result.innerHtML;
		        alert("�ϴ��ɹ�!");
		        window.close();
		     }else{
		           alert(result.innerHTML);
		     }
		}
		</SCRIPT>
	</head>
	<body bgcolor="#C0C0C0">
		<form name="uploadform" method="post" enctype="multipart/form-data" action="<%=basePath%>resourceUpload.action" target="funcframe">
			<table border=0 cellpadding=0 cellspacing=5 >
				<tr>
					<td height="25" width="70">
						��&nbsp;&nbsp;&nbsp;&nbsp;��:
					</td>
					<td>
						<input type="file" name="addfile" />
					</td>
				<tr>
					<td width="90" height="25">
						�ļ�������
					</td>
					<td>
						<input type="text" id="fileDesc" name="fileDesc" />
					</td>
				</tr>
				<tr align='center' height="25">
					<td align='center' colspan="2">
						<input type="submit" value="�ϴ�">
					</td>
				</tr>
			</table>
		</form>
		<iframe name="funcframe" src="" style="display:none"></iframe>
	</body>
</html>





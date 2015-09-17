<%@ page language="java" contentType="text/html;charset=GBK"%>
<%@ page import= "com.anyi.gp.util.*"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<?xml version="1.0" encoding="gb2312"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>请选择文件</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<SCRIPT language="javascript" src="script/upload.js"></SCRIPT>
<style type="text/css">
</style>

<script>
var _avArg= window.dialogArguments;

function load(){
  //var vasArg= dialogArguments;
  //if (vasArg[0]== null) vasArg[0]= "";
  //if (vasArg[1]== null) vasArg[1]= "";
  //document.uploadform.addfile.value= vasArg[0];
  //document.uploadform.fileId.value= vasArg[1];
  
  if (_avArg[1]== null){
    document.uploadform.fileId.value= "";
  }else{
    document.uploadform.fileId.value= _avArg[1];
  }
  if (_avArg[2]== null){
    document.uploadform.InterfaceClassInput.value= "";
  }else{
    document.uploadform.InterfaceClassInput.value= _avArg[2];
  }
  if (_avArg[3]== null){
    document.uploadform.InterfaceParamsInput.value= "";
  }else{
    document.uploadform.InterfaceParamsInput.value= _avArg[3];
  }
	returnValue= null;
}

function fileBack(result){
	if (result.getAttribute("success") == "false"){
		alert(result.innerHTML);
	}else{
		returnValue = new Array();
		returnValue[0] = document.uploadform.addfile.value;
		returnValue[1] = result.innerHTML;
		window.close();
	}
}

function ok(){
	
	if (document.uploadform.addfile.value.length> 3){
		var index=document.uploadform.addfile.value.lastIndexOf("\\");
    document.uploadform.fileName.value=encodeURIComponent(document.uploadform.addfile.value.substring(index+1));

		document.uploadform.submit();
	}
}

function cancel(){
  window.close();
}
</script>
</head>
<body bgcolor="#C0C0C0" onload="load();">

<form name="uploadform" method="post" enctype="multipart/form-data" action="<%=basePath%>fileUpload.action" target="funcframe">
<table border="0" width="100%" style="font-size:9pt;">
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>
<input type="text" style="display:none" id="InterfaceClassInput" name="InterfaceClassInput"/>
</td>
</tr>
<tr>
<td>
<input type="text" style="display:none" id="InterfaceParamsInput" name="InterfaceParamsInput"/>
</td>
</tr>
<tr>
<td width="100%" nowrap>
<input type="text" style="display:none" id="fileId" name="fileId"/>
</td>
</tr>
<tr>
<td>
<input type="file" id="addfile" name="addfile" size="50" style="font-size:9pt; border-width:1px;"/>
<input type="hidden" id="fileName" name="fileName" />
</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td align="center" colspan=2 >
<input type="button" id="OKButton" value=" 确定 " onclick="ok();" style="font-size:9pt; border-width:1px;"/>
<input type="button" id="CancelButton" value=" 取消 " onclick="cancel();" style="font-size:9pt; border-width:1px;"/>
</td>
</tr>
</table>
</form>
<iframe name="funcframe" src="" style="display:none"></iframe>
</body>
</html>

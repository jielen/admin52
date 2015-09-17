<%@ page contentType="text/html; charset=GBK" %>
<%@ page import= "com.anyi.gp.*"%>
<%
request.setCharacterEncoding("GBK");
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<meta name="GENERATOR" content="Microsoft FrontPage 4.0">
<meta name="ProgId" content="FrontPage.Editor.Document">
<title><%=request.getParameter("title")==null?"":request.getParameter("title")%></title>

<link href="/<%=Pub.getWebRoot(request)%>/gp/css/pagestyle.css" rel="stylesheet" type="text/css" />
<style>
.clsPageBody{
background-image:url("/<%=Pub.getWebRoot(request)%>/gp/image/pic/bk_01.jpg");
}
</style>

<script>
function pageInit(){
  var vsText= window.dialogArguments[0];
  var vtIsReadOnly= window.dialogArguments[1]=="true"?true:false;
  var vtIsShowCancelBtn= window.dialogArguments[2]=="true"?true:false;
  InputTextArea.innerText= vsText== null?"":vsText;
  InputTextArea.readOnly= vtIsReadOnly;
  CancelBtn.style.display= vtIsShowCancelBtn?"":"none";
  window.returnValue= vsText;
}
function ok(){
  window.returnValue= InputTextArea.innerText;
  window.close();
}
function cancel(){
  window.close();
}
</script>
</head>

<body class="clsPageBody" onload="pageInit();">

<table border="0" style="width:100%;height:100%;">
  <tr>
    <td style="width:100%;height:100%;">

<textarea id="InputTextArea" style="font-size:9pt;width:100%;height:100%;overflow:auto;background-color:transparent;"></textarea>

    </td>
  </tr>
  <tr>
    <td width="100%" style="font-size:1px"></td>
  </tr>
  <tr>
    <td width="100%" style="text-align:center;">
    <input type="button" value=" 确定 " id="OKBtn" onclick="ok();" style="font-size:9pt;border:solid 1px gray;background-color:transparent;">
    <input type="button" value=" 取消 " id="CancelBtn" onclick="cancel();" style="font-size:9pt;border:solid 1px gray;background-color:transparent;">
    </td>
  </tr>
</table>

</body>

</html>

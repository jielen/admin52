<!-- $Id: PrnSetBGPicdesigner.jsp,v 1.3 2008/03/21 07:38:26 zhangkun Exp $ -->
<%@ page contentType="text/html; charset=GBK" %>
<html>
<head>
<title>设置打印模板的背景</title>
<SCRIPT language="javascript" src="script/print/PrnSetBGPic.js"></SCRIPT>
<body>
图像宽度：<input type="text" id="picWidth" size="6">
图像高度：<input type="text" id="picHeight" size="6">

<form name="uploadform" method="post" enctype="multipart/form-data"
 action="fileUpload.action" target="funcframe">
 <input type="hidden" id="fileName" name="fileName" />
<table border="0" width="65%">
<tr>
<td width="100%" nowrap>
<input type="input" style="display:none" id="fieldId" name="fileId">
</td>
</tr>
<tr>
<td>
<input type="file" id="upfile" name="addfile" size="30">
</td>
</tr>
<tr>
<td align="center" colspan=2 >
<input type="button" name="fileup" value="确定" onclick="ok();">
&nbsp;&nbsp;
<input type="button" value="无图" onclick="cancel();">
  &nbsp;&nbsp;
<input type="button" value="关闭" onclick="closes();">
</td>
</tr>
</table>
</form>
<iframe name="funcframe" src="" style="display:none"></iframe>
</body>
</html>

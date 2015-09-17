<%@page contentType="text/html;charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus" %>

<html>
	
<head>

<title>填写意见</title>

<base href="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/" target="_self">
<LINK href="script/applus.css" rel="stylesheet" type="text/css"></LINK>
<style type="text/css">
 BODY{
 	font-size: 12px;
 }
 TD{
 	font-size: 12px;
}
</style>

<applus:include language="javascript">
    gp.page.TextBox;
    gp.page.TextAreaBox;
    gp.page.Toolbar;
    gp.default.Btn_EventAdapter;
</applus:include>

<script language="javascript">
  var oComment;
  if (window.dialogArguments) {
    oComment = window.dialogArguments;
  }
</script>

</head>

<body leftMargin="" rightMargin="0" topMargin="0">

<applus:init>
  var voToolbar= toolbar.oOwner;
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
  commentBox.value = oComment.text;
  commentBox.focus();
</applus:init>

<applus:toolbar id="toolbar">
  <call id="fok" type="command" caption="确定" accesskey="O" isgranttoall="true" />
  <call id="fcancel" type="command" caption="取消" accesskey="C" isgranttoall="true" />
</applus:toolbar>

<blockquote>
	请填写意见（100字以内）：<br>
  <textarea name="commentBox" rows="8" cols="35" onkeyup="checkLength(this);"></textarea>
</blockquote>

<script language="javascript">

  function checkLength(which) {
    var maxChars = 100;
    if (which.value.length > maxChars)
      which.value = which.value.substring(0, maxChars);

  }

  function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent) {
    switch (oCall.id){
      case "fok":
        oComment.text = commentBox.value;
        window.returnValue = "isOk";
        break;
      case "fcancel":
        window.returnValue = "isCancel";
        break;
    }
    window.close();
  }

</script>
<applus:endpage />
</body>

</html>

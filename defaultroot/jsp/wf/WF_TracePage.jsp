<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>
<%@ page import="com.anyi.gp.Delta" %>
<%@ page import="com.anyi.gp.workflow.trace.WFTrace" %>

<jsp:useBean id="myTrace" scope="page" class="com.anyi.gp.workflow.trace.WFTrace" />

<%	myTrace.setRequest(request); %>

<link href="gp/css/pagestyle.css" rel="stylesheet" type="text/css">

<script>

	function showTips(tips, flag) {
		var tb = document.all.tipsbox;
		if(flag) {
   		tb.style.display = "";
   		tb.innerHTML = tips;
	   	tb.style.left = event.clientX - 50;
   		tb.style.top = event.clientY + 30;
		} else {
			tb.style.display = "none";
		}
	}

	function openEmp(){
		var fieldDiv = getFieldDiv(event);
		var href = fieldDiv.getAttribute("loc");
		var componame = fieldDiv.getAttribute("componame");
		var token = fieldDiv.getAttribute("token");
		var names = new Array();
		var values = new Array();
		names[0] = "function";
		values[0]= fieldDiv.getAttribute("function");
		names[names.length] = "tablename";
		values[values.length] = fieldDiv.getAttribute("tablename");
		names[names.length] = "condition";
		values[values.length] = fieldDiv.getAttribute("condition");
		var pUrl = encodeParamArray(names,values);
		
		pUrl += "&componame=" + componame;
        pUrl += "&token=" + token;
		//window.open(href + pUrl,"","help:no;Height:500px;Width:700px;center:yes;");

		}

	function getFieldDiv(event){
		var srcE = event.srcElement;
		if (srcE){
			return srcE.parentElement.children[0];
			}
		else {
			return null;
			}
		}
</script>

<%@ taglib uri="/applus" prefix="applus" %>

<html>

<head>



<base href="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/" target="_self">
<link href="script/applus.css" rel="stylesheet" type="text/css"></link>

<applus:include language="javascript">
    gp.page.Toolbar;
    gp.default.Btn_EventAdapter;
</applus:include>

</head>

<script language="javascript">

  function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent) {
    window.close();
  }

</script>

<body>

<applus:init>
  var voToolbar = toolbar.oOwner;
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
</applus:init>

<applus:toolbar id="toolbar">

</applus:toolbar>

<blockquote>
	<p class="clsFreeTable">

	<br>

	<br>
	<%
		int status = myTrace.getStatus();
		if (status == 9) {
	%>

	<%
		}
	%>

	</P>
</blockquote>

<table border="0" cellspacing="0" cellpadding="0">

<%= myTrace.toHtml() %>

</table>

<blockquote>
	<table border="0" cellspacing="0" cellpadding="0">
	  <tr>
    	<td width="30"><img border="0" src="/style/img/workflow/user_commit_small.gif" width="15" height="24"></td>

  	</tr>
  	<tr>
	    <td width="30"><img border="0" src="/style/img/workflow/user_task_small.gif" width="15" height="24"></td>

  	</tr>
  	<tr>
	    <td width="30"><img border="0" src="/style/img/workflow/user_untread_small.gif" width="15" height="24"></td>

  	</tr>
	</table>
</blockquote>

<p> </p>
<p> </p>

<div id="tipsbox" style="position:absolute;width:125;height:20;border:1 gray solid;font-size:9pt;background-color:#ffffff;color:#606060;display:none;filter: progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=3);">
</div>
<applus:endpage />
</body>

</html>

<%@ page contentType="text/html; charset=GBK" %>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%
	if(null == request.getParameter("userid")){
		RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");
		rd.forward(request,response);
	}else{
    	String userId = request.getParameter("userid");
 %>
<html>
  <head>
  	<script language=javascript event="OnCompleted(hResult,pErrorObject, pAsyncContext)" for=foo>
		var voLoginForm = document.createElement("form");
		voLoginForm.id="loginApp";
		voLoginForm.name = "loginFrom";
		voLoginForm.action = "/admin/loginDispatcher.action";
		voLoginForm.method="post";
		document.body.appendChild(voLoginForm);
		var voUser = document.createElement("input");
		voUser.name = "username";
		voUser.type = "text";
		voUser.value = "<%=userId%>";
		voUser.style.display="none";
		var voIp = document.createElement("input");
		voIp.name = "iparray";
		voIp.type = "text";
		voIp.value = joinArr(ipData);
		voIp.style.display="none";
		voLoginForm.appendChild(voUser);
		voLoginForm.appendChild(voIp);
		voLoginForm.submit();
		function joinArr(arrayData){
			var res = "";
			for(var i=0; i<arrayData.length; i++){
				for(var j=0; j<arrayData[i].length; j++){
					res += arrayData[i][j] + ',';
				}
			}
			return res;
		}
	</script>
	<script language=javascript event=OnObjectReady(objObject,objAsyncContext) for=foo> 
		if(objObject.IPEnabled != null && objObject.IPEnabled != "undefined" && objObject.IPEnabled == true){
			var rowData = new Array();
		    if(objObject.MACAddress != null && objObject.MACAddress != "undefined")
		    	rowData[0] = objObject.MACAddress;
		    if(objObject.IPEnabled && objObject.IPAddress(0) != null && objObject.IPAddress(0) != "undefined")
		    	rowData[1] = objObject.IPAddress(0);
		    ipData[ipData.length] = rowData;
	    }
	</script>
  </head>
  
  <body>
  	<object id=locator classid=CLSID:76A64158-CB41-11D1-8B02-00600806D9B6 VIEWASTEXT></object>
	<object id=foo classid=CLSID:75718C9A-F029-11d1-A1AC-00C04FB6C223></object>
	<script language=javascript>
		debugger;
		var service = locator.ConnectServer();
		var MACAddr;
		var IPAddr;
		var ipData = [];
		service.Security_.ImpersonationLevel=3;
		service.InstancesOfAsync(foo, 'Win32_NetworkAdapterConfiguration');
	</script>
  </body>
</html>

<%}%>
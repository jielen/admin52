<%@page contentType="text/html;charset=GBK"%>
<%@page import="com.anyi.gp.license.LicenseManager"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>
<%@page import="com.anyi.gp.license.LicenseStatus"%>

<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<meta name="GENERATOR" content="Microsoft FrontPage 4.0">
<meta name="ProgId" content="FrontPage.Editor.Document">
<SCRIPT language="javascript" src="script/Base64.js"></SCRIPT>
<SCRIPT language="javascript" src="script/ajax.js"></SCRIPT>
<title>用友GRP—A++ － 加密服务专用工具</title>
<%
 String host = null;
 String port = null;
 LicenseManager LicenseManager = (LicenseManager) ApplusContext.getBean("licenseManager");
 LicenseStatus status = LicenseManager.getLicenseStatus();
 if(status != null){
 		host = status.getHost();
 		port = "" + status.getPort();
 }else{
 		host = new String("");
 		port = new String("");
 }
%>
</head>

<body>

<script>
	
  function disableButtons() {
    Btn_Status.disabled = true;
    Btn_Remote.disabled = true;
  }
	
  function getSysInfo()
  {
  	disableButtons();
    Btn_SysInfo.value="正在执行，请稍等……";
    window.navigate("lm.jsp?sysinfo=1");
  }

  function showStatus()
  {
  	disableButtons();
    Btn_Status.value="正在执行，请稍等……";
    window.navigate("lm.jsp");
  }

  function startLocal()
  {
  	disableButtons();
    Btn_Local.value="正在执行，请稍等……";
    var vsUrl = Base64.encodeUrl("lm.jsp?host=&port=0");
    window.navigate(vsUrl);
  }

  function startRemote()
  {
    var host = hostInput.value;
    if (host.length == 0) {
      alert("请输入有效的加密服务器地址");
      hostInput.focus();
      return;
    }

    var port = portInput.value;
    var n = parseInt(port);
    if (isNaN(n) || n <= 0) {
      alert("请输入有效的加密服务器端口");
      portInput.focus();
      return;
    }

  	disableButtons();
    Btn_Remote.value="正在执行，请稍等……";
    var vsUrl = Base64.encodeUrl("lm.jsp?host=" + host + "&port=" + port);
    window.navigate(vsUrl);
  }

  function upgradeKeyInfo(){
	  //debugger;
	  Btn_Upgrade.disabled = true;
	  var ajax = new Ajax();
	  ajax.request(upgradeKeyInfo_re, "admin/upgradeKeyInfo.action", "encodedKeyInfo=" + document.all.encodedKeyInfo.value);
  }

  function upgradeKeyInfo_re(responseText){
	  alert(responseText);
	  Btn_Upgrade.disabled = false;
  }

</script>
<br>
<div align="left" style="position: relative; left: 15">
<b>加密服务工具页面提供下列操作：</b>
<p>1、查看加密服务状态：<input type="button" value="查看加密服务状态" name="Btn_Status" onclick="showStatus()"></p>
<p>2、启用加密服务：<input type="button" value="启用加密服务" name="Btn_Remote" onclick="startRemote()"></p>
<p>远程加密服务的地址：<input type="text" size="20" name="hostInput" value="<%=host%>"> 
端口：<input type="text" size="20" name="portInput" value="<%=port%>"></p>
</div>
<hr>
<div align="left" style="position: relative; left: 15">
<b>密钥信息升级（A++v52升级到A++v53）</b>
<p><textarea rows="5" name="encodedKeyInfo" cols="80" id="encodedKeyInfo"></textarea></p>
<p><input type="button" value="升级" name="Btn_Upgrade" onclick="upgradeKeyInfo();"></p>
</div>
</body>

</html>

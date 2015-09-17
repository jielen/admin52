
<%@ page contentType="text/html; charset=GBK" %>
<html>
<head>
<LINK href="script/applus.css" rel=stylesheet type=text/css>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<TITLE>登录</TITLE>
<script language="JavaScript" src="script/login.js"></script>
<script language="JavaScript" src="script/Community.js"></script>
<script language="JavaScript" src="gp/common/List.js"></script>
<script language="JavaScript" src="gp/common/StringBuffer.js"></script>
<script language="VBScript" src="script/formenctype.vbs"></script>
<style type="text/css">
<!--
.AnyiTitle {
  font-family: "宋体";
  font-size: 18px;
  font-weight: bold;
}
.unChangedFontSize {
  font-family: "宋体";
  font-size: 12px;
}
-->
<%
	String result = (String) request.getAttribute("fail");
%>

.sffocus {
	BORDER-RIGHT: #f90 1px solid; BORDER-TOP: #f90 1px solid; BACKGROUND: #fff; BORDER-LEFT: #f90 1px solid; COLOR: blue; BORDER-BOTTOM: #f90 1px solid
}
</style>

<script type="text/javascript">
	
	function initObject(type, tag, parentId) {
		if (window.attachEvent)	{
			window.attachEvent("onload"
				, function()	{
					var sfEls = (parentId == null) ? document.getElementsByTagName(tag) : document.getElementById(parentId).getElementsByTagName(tag);
					type(sfEls);
				}
			);
		}
	}
	
	sfFocus = function(sfEls) {
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onfocus=function() {
				this.className+=" sffocus";
				if( this.value == this.defaultValue ) { this.value = ""; }
			}
			sfEls[i].onblur=function() {
				this.className=this.className.replace(new RegExp(" sffocus\\b"), "");
				if( this.value == "" ) { this.value = this.defaultValue; }
			}
		}
	}

	initObject(sfFocus, "INPUT");
	var userList = getUserList();
	var strList = "userList";
	var objInputId = "userTxt";
	window.onload =function() {
		init();
		hideObject();
		arrList = new Array();
		var tmpStr1 = strList.split(",");
		//smanPromptList("userList", "userTxt");
		var result = "<%=result%>";
		if(result != "null" && result != "" && result != null){
			alert(result);
		}
		for(i=0;i<tmpStr1.length;i++){
			arrList[i] = eval(tmpStr1[i]);
			if(null == arrList[i]) return;
			arrList[i].sort(
				function(a,b){
					if(a.length>b.length)return 1;
					else if(a.length==b.length)return a.localeCompare(b);
					else return -1;
				}
			)
		}
		var selectedIndex=-1;
		var intTmp; //循环用的:)
		var objouter=document.getElementById("__smanDisp") //显示的DIV对象
		var objInput = document.getElementById(objInputId); //文本框对象
		var tmpStr = objInputId.split(",");
		for(i=0;i<tmpStr.length;i++){
			var objInput = document.getElementById(tmpStr[i]); //文本框对象
			//文本框失去焦点
			objInput.onblur=function(){
				objouter.style.display='none';
			}
			window.onfocus=function(){
				objouter.style.display='none';
			}
			//文本框按键抬起
			objInput.onkeydown=checkKeyCode;
			//文本框得到焦点
			objInput.onfocus=checkAndShow;
		}
		
		function checkKeyCode(obj){
			var ie = (document.all)? true:false
			if (ie){
				var keyCode=event.keyCode
				if (keyCode==40||keyCode==38){ //下上
				  var isUp=false
				  if(keyCode==40) isUp=true ;
				  chageSelection(isUp)
				}else if (keyCode==13){//回车
				  outSelection(selectedIndex);
				}else{
				  checkAndShow(keyCode);
				}
			}else{
				checkAndShow(keyCode);
			}
			divPosition()
		}
		
		function checkAndShow(keyCode){
			var objInput=null;
			var objList;
			for(i=0;i<document.all.tags('INPUT').length;i++) 
			{
				if(document.activeElement.islist=="true"){
					var objInput=document.activeElement;
					var objInputId = objInput.id;
					objList = arrList[objInput.list];
					//alert(objList.length)
				}
			}
			if(objInput!=null){
			  var strInput = objInput.value;
			  if((keyCode<91 && keyCode>64) || (keyCode<106 && keyCode>95)){
			  	strInput += String.fromCharCode(keyCode);
			  }
			  if (strInput!=""){
				  divPosition();
				  selectedIndex=-1;
				  objouter.innerHTML ="";                   
				  for (intTmp=0;intTmp<objList.length;intTmp++){
					  
					if (objList[intTmp].toUpperCase().indexOf(strInput.toUpperCase())!=-1){
						addOption(objList[intTmp],strInput);
					}
					 
				  }
				  objouter.style.display='';
			  }else{
			  	objouter.style.display='none';
			  }
			}
			function addOption(value,keyw){
				var v=value.replace(keyw,"<b><font color=red>"+keyw+"</font></b>");
				  objouter.innerHTML +="<div onmouseover=\"this.className='sman_selectedStyle'\" onmouseout=\"this.className=''\" onmousedown=\"document.getElementById('"+objInputId+"').value='" + value + "';window.focus();\">" + v + "</div>" 
			}
		}
		function chageSelection(isUp){
			if (objouter.style.display=='none'){
			objouter.style.display='';
			}else{
			if (isUp)
			  selectedIndex++
			else
			  selectedIndex--
			}
			var maxIndex = objouter.children.length-1;
			if (selectedIndex<0){selectedIndex=0}
			if (selectedIndex>maxIndex) {selectedIndex=maxIndex}
			for (intTmp=0;intTmp<=maxIndex;intTmp++){
				if (intTmp==selectedIndex){
				  objouter.children[intTmp].className="sman_selectedStyle";
				}else{
				  objouter.children[intTmp].className="";
				}
			}
		}
		
		function outSelection(Index){
			if(!objouter.children[Index])return;
			objInput.value = objouter.children[Index].innerText;
			objouter.style.display='none';
		}
		
		function divPosition(){
			var objInput=null;
			for(i=0;i<document.all.tags('INPUT').length;i++) 
			{
				if(document.activeElement.islist=="true"){
					var objInput=document.activeElement;
				}
			}
			if(objInput!=null){
				objouter.style.top =getAbsoluteHeight(objInput)+getAbsoluteTop(objInput);
				objouter.style.left =getAbsoluteLeft(objInput); 
				objouter.style.width=getAbsoluteWidth(objInput)
			}
		}
	}
	document.write("<div id='__smanDisp' style='position:absolute;display:none;background-Color:#ffffff;" + this.style + "' onbulr> </div>");
	document.write("<style>.sman_selectedStyle{background-Color:#0000FF;color:#FFFFFF}</style>");
	function getAbsoluteHeight(ob){
		return ob.offsetHeight
	}
	
	function getAbsoluteWidth(ob){
		return ob.offsetWidth
	}
	
	function getAbsoluteLeft(ob){
		var s_el=0;el=ob;while(el){s_el=s_el+el.offsetLeft;el=el.offsetParent;}; return s_el
	}
	
	function getAbsoluteTop(ob){
		var s_el=0;el=ob;while(el){s_el=s_el+el.offsetTop ;el=el.offsetParent;}; return s_el
	}
	function hideObject(){
		var locatorobj = document.getElementById("locator"); 
		locatorobj.style.display = "none"; 
		var fooObj = document.getElementById("foo");
		fooObj.style.display = "none";
	}
</script>

</head>
<body leftMargin="0" rightMargin="0" topMargin="0">
	
	
	<form id="formName" name="fLogin" method="POST" action="login.action">
		<%
			String url = request.getParameter("url");
			if (url == null) {
				url = "";
			}
		%>
		<input type="hidden" name="url" value="<%=url%>" />
	<table border=0 cellpadding="0" cellspacing="0" width=100% height=100% background="/style/img/login/loginbk.jpg">
	<tr>
		<td align="right">
			<a href="/download/平台应用控件.exe" style="font-size: 12px;color:red">平台应用控件下载</a>
		</td>
		<td width="20"></td>
	</tr>
	<tr>
	<td align=center valign=center>
	<table border=0 cellpadding="0" cellspacing="0" >
	  <tr>
	    <td colspan="3"><img src="/style/img/login/logintop1.gif"></td>
	  </tr>
	  <tr>
	    <td colspan="3"><img src="/style/img/login/logintop.jpg"></td>
	  </tr>
	  <tr>
	    <td  colspan="3" background="/style/img/login/login22.jpg" width="610" align=center>
	      <table border="0">
	          <tr>
	             <td align="center" valign=center class="unChangedFontSize" >登录帐号:</td>
	             <td><input id="userTxt" type="text" name="username" value="" size="14" tabindex="1" onkeyup="moveFocus()" islist="true" list="0" style="border:1 solid #6398E6;"></td>
	             <td width=10></td>
	             <td valign=center class="unChangedFontSize">密&nbsp;&nbsp;码:</td>
	             <td><input id="passwordTxt" type="password" name="password" size="14" tabindex="2" onkeypress="enterLogin()" style="border:1 solid #6398E6;"></td>
	          </tr>
	      </table>
	    </td>
	  </tr>
	  <tr>
	    <td  width="107"><img src="/style/img/login/login31.jpg"></td>
	    <td  background="/style/img/login/login32bk.jpg" width="420" align=center>
	       <table  border="0">
	          <tr>
	           <td class="unChangedFontSize" width=40></td>
	           <td align="right"><img src="/style/img/login/ok.gif" style="cursor:hand" onClick="login(fLogin)" alt="登录"></td>
	           <td class="unChangedFontSize" width=70>&nbsp;&nbsp;&nbsp;&nbsp;</td>
	           <td ><img src="/style/img/login/cancel.gif" style="cursor:hand" onClick="fLogin.reset();" alt="清空"></td>
	          </tr>
	       </table>
	    </td>
	    <td width="83"><img src="/style/img/login/login33.jpg" ></td>
	  </tr>
	  <tr>
	    <td colspan="3"><img src="/style/img/login/loginbottom.gif"></td>
	  </tr>
	</table>
	</td>
	</tr>
	</table>
	</form>
</body>
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
<object id=locator classid=CLSID:76A64158-CB41-11D1-8B02-00600806D9B6 VIEWASTEXT"></object>
	<object id=foo classid=CLSID:75718C9A-F029-11d1-A1AC-00C04FB6C223"></object>
	<SCRIPT language=JScript>
		var service = locator.ConnectServer();
		var MACAddr;
		var IPAddr;
		var ipData = [];
		service.Security_.ImpersonationLevel=3;
		service.InstancesOfAsync(foo, 'Win32_NetworkAdapterConfiguration');
	</SCRIPT>
</html>

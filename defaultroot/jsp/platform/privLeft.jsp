<!-- $Id: privLeft.jsp,v 1.5 2008/06/20 03:33:43 liuxiaoyong Exp $-->
<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>
<%@page import ="com.anyi.gp.taglib.components.Page"%>
<%@page import ="com.anyi.gp.Pub"%>
<%
	String webRoot = Page.LOCAL_RESOURCE_PATH + Pub.getWebRoot(request);
	String roleId = request.getParameter("roleId");
	String userId = request.getParameter("userId");
	if(roleId == null) roleId = "";
	if(userId == null) userId = "";
%>
<html>
<head>
<title>授权</title>
  <LINK href="script/applus.css" rel=stylesheet type=text/css>
  <SCRIPT language="javascript" src="<%=webRoot%>/script/Community.js"></SCRIPT>
  <SCRIPT language="javascript" src="<%=webRoot%>/script/page.js"></SCRIPT>
  <script language="JavaScript" src="<%=webRoot%>/script/tree.js"></script>
  <SCRIPT language="VBScript" src="<%=webRoot%>/script/formenctype.vbs"></SCRIPT>
  <script language="JavaScript" src="<%=webRoot%>/gp/pub/Information.js"></script>
</head>
<body leftMargin="0"
rightMargin="0" topMargin="0" bgcolor="white" nowrap>

<table border="0" width=100% cellpadding="0" cellspacing="0" >
  <tr>
    <td  background="/style/img/main/editcontentmidbk.jpg" height=19 width=100%>&nbsp;</td>
  </tr>
  <tr>
     <td >
         <table cellpadding="0" cellspacing="0" border=0>
          <tr>
             <td width=60%>
             </td>
             <td width=20>&nbsp;&nbsp;&nbsp;</td>
             <td><img id="ftest_leftImg" src="/style/img/func/left_behind.gif"></td>
             <td id="ftest_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
                 <input type="button" name="ftest" value="显示数值权限" id="ftestID" shortCutKey="" isCtrl="n" isShift="n" isAlt="n" title="" class="clsListCallEdit" onMouseOver="call_editPageMouseOver()" onMouseOut="call_editPageMouseOut()" onclick="fhide(0)">
             </td>
             <td><img id="ftest_rightImg" src="/style/img/func/right_behind.gif"></td>
             <td width=2>&nbsp;&nbsp;&nbsp;</td>
          </tr>
        </table>
     <td>
  </tr>  
</table>

<script language="JavaScript">
   var role = '<%=roleId%>';
   var user = '<%=userId%>';   
  
	function help(){
  var win_help = open("help/AS/AS_GRAN_FUNC.htm", null,
                      "menubar=no,status=no,toolbar=yes,"
                      + "resizable=yes,titlebar=yes,scrollbars=yes,"
                      + "height=" + (screen.availHeight - 30)*2/3 + ",width="
                      + (screen.availWidth - 460) + ",top=0,left=450");
	}

	function fsavefunc(){
  	var names = new Array();
  	var values = new Array();
  	names[0] = "roleId";
  	values[0] = role;
  	names[1] = "delta";
  	values[1] = getTreeData();
  	names[2] = "userId";
  	values[2] = user;
  	
   	top.right.changed = false;
  	Info.frameSubmit("savePriv", "all", names, values);
}
		
function fhide(switchSet) {
  	try {
    	switch (switchSet){
       case 2:
         top.roleright.rows = "*,0";
         top.right.document.all.ftestID.value="显示数值权限";
         break;
       case 1:
         top.roleright.rows = "50%,*";
         top.right.document.all.ftestID.value="隐藏数值权限";
         break;
       case 0:
         if (top.roleright.rows=="*,0") {
            top.roleright.rows = "50%,*";
            top.right.document.all.ftestID.value="隐藏数值权限";
         }else {
            top.roleright.rows = "*,0";
            top.right.document.all.ftestID.value="显示数值权限";
         }
       default:
         break;
    	}
  	}
  	catch (e) {}
	}
	
	function nodeClick(code){
		var realcode=getValue(code,"REALCODE");
		if(realcode != "fwatch" && realcode != "fquote"){
			alert("不允许设置" + realcode + "的数值权限！");
			fhide(2);
			return;
		}
		
  	var cType = getValue(code,"TYPE");
  	if (cType == "compo"){
    	subCompo = code;
  	}else{
    	if(cType == "func"){
      	subCompo = getValue(code,"P_CODE");
    	}else{
      	subCompo = "";
    	}
  	}

  	var p_code=getValue(code,"P_CODE");
  	
  	if (!document.all(code + "CHK").checked){
     	return;
  	}
  	if (getValue(code,"TYPE")!="func"){
     	return
  	}
  	
  	fhide(1);
  	menuId=top.privmenu.menuId;
  	top.bottom.location.replace("dispatcher.action?function=fieldList&role=" + role + "&user=" + user + "&p_code=" + p_code + "&realcode=" + realcode);
  	
  	return;
}
</script>
<table width=100%>
 <tr>
  <td width=50>

  </td>
  <td>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="largest">
    <tr>
      <td style='font-family:MS Sans Serif;font-size:16px;font-weight: bold;'>功能权限设置：</td>
    </tr>
    <tr>
      <td align="left">
        <div id="tree" class="clsMenuContainer">
        </div>
      </td>
    </tr>
  </table>
  </td>
  </tr>
  <tr>
     <td></td>
     <td align="center">
           <input name="help" class="clsGeneralBtn" type="button" style="width:80;height:30" value="帮助" id="help" onClick="help()">&nbsp;&nbsp;
           <input name="savefunc" class="clsGeneralBtn" type="button" style="width:80;height:30" value="保存" id="savefunc" onClick="fsavefunc()" disabled>
     </td>
  </tr>
 </table>
</body>
</html>

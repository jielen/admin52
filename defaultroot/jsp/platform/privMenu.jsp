<%@ page contentType="text/html; charset=GBK" %><%
%><%@ page language="java" %>
<%@page import="com.anyi.gp.domain.PrivMenuControl"%>
<%@page import="com.anyi.gp.desktop.MenuTreeBuilder"%>
<%
	String roleId = request.getParameter("roleId");
	String userId = request.getParameter("userId");
	if(roleId == null) roleId = "";
	if(userId == null) userId = "";
 %>
<html>
<head>
<script language="JavaScript">
   var role = '<%=roleId%>';
   var user = '<%=userId%>';
   var menuId;   
</script>
  <LINK href="script/applus.css" rel=stylesheet type=text/css>
  <SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
  <script language="JavaScript" src="script/tree.js"></script>
  <script language="VbScript" src="script/formenctype.vbs"></script>

<script language="JavaScript">
function nodeClick(code){
  top.right.subCompo = "";
  var fieldListWin = top.right;
  if (fieldListWin && fieldListWin.changed) {
    var r = confirm("��ǰҳ���ϵ��������޸ģ���û�б��棡\n\n����ȷ�����������򰴡�ȡ�������ڵ�ǰҳ�档");
    if (!r)
      return;
  }

  var names = new Array();
  var values = new Array();
  names[0] = "roleId";
  values[0] = role;
  names[1] = "menuId";
  values[1] = code;
  names[2] = "userId";
  values[2] = user;  
  menuId=code;

  var result = requestDataK("getPrivTree", "all", names, values);
  
  var fieldListWin = top.right;
  fieldListWin.tree.innerHTML = result;
  if (result==""){
    fieldListWin.savefunc.disabled=true;
  }else{
    fieldListWin.savefunc.disabled=false;
  }
  fieldListWin.changed = false;
  ////fhide(2);
}

</SCRIPT>
</head>
<body bgcolor="white" nowrap>
<%
	PrivMenuControl control = new PrivMenuControl();
	control.setRequest(request);
	control.setResponse(response);
	control.setTreeBuilder(new MenuTreeBuilder());
	String strMenu = control.generateMenuTree();
	if(strMenu != null){
		out.println(strMenu);
	}
%>

</body>
</html>

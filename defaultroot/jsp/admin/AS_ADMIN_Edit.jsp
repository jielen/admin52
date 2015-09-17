<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus"%>
<%
	String path = request.getParameter("path");
	String cond = "path="+path;
%>
<html>
	<head>
		<title><applus:resource code="AS_ADMIN" /></title>
		<applus:include language="javascript">
		  	gp.page.TextBox;
		  	gp.page.TextAreaBox;
		  	gp.page.NumericBox;
		  	gp.page.PasswordBox;
		  	gp.page.LabelBox;
		  	gp.page.ComboBox;
		  	gp.page.DateBox;
		  	gp.page.FileBox;
		  	gp.page.DatetimeBox;
		  	gp.page.ForeignBox;
		  	gp.page.Grid;
		  	gp.page.DataGrid;
		  	gp.page.PaginationConsole;
		  	gp.page.Free;
		  	gp.page.FreeManager;
		  	gp.page.Tipbar;
		  	gp.page.Toolbar;
		  	gp.page.Tabstrip;
		  	gp.page.Search;
		 	gp.webpage.script.SearchPage;
		  	gp.page.BoxSet;
		  	script.admin.AS_ADMIN_Edit;
		</applus:include>
	</head>
	<script language="javascript">
		var path= "<%=path%>";
	</script>

	<body class="clsPageBody">

		<applus:compometa name="AS_ADMIN" type="edit" ismain="true">
		</applus:compometa>
		<applus:tabledata
			sqlid="admin-editPage.getDataFromAS_ADMIN" 	tablename="AS_ADMIN" condition="<%=cond%>" pagesize="100"
			issave="true" isdigest="false" istablemeta="true">
		</applus:tabledata>
		<applus:sessiondata componame="AS_ADMIN" />
		<applus:init>
  			setPageInit();
 		</applus:init>

		<applus:toolbar id="toolbar">
			<call id="fsave" type="command" caption="保存" />
			<call id="fdelete" type="command" caption="删除" tip="" />
		</applus:toolbar>
		<p class="clsEditPageTitle">
			<applus:resource code='AS_ADMIN' />
		</p>
		<applus:grid id="AS_ADMIN_Grid" type="DataGrid" componame="AS_ADMIN" tablename="AS_ADMIN" cssclass="clsPageGridInTabstrip" style="height:300">
			<applus:meta>
				<head></head>
				<fields>
				<field name="USER_ID" caption="用户ID" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
				<field name="USER_NAME" caption="用户姓名" editboxtype="ForeignBox" width="400" isvisible="true"
					isallowinput="false" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_EMP" condition=""/>
				</fields>
			</applus:meta>
		</applus:grid>
		<applus:endpage />
	</body>
</html>

<%@ page language="java" import="com.anyi.gp.pub.*" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String parentCode = request.getParameter("parentCode");
	String adminPath = request.getParameter("path");
	String curPath = request.getParameter("currentPath"); 
%>
<%
	String userId = SessionUtils.getAttribute(session, "svUserID");
	String cond = "";
	if(!userId.equalsIgnoreCase("sa")){
		cond = "CO_CODE="+SessionUtils.getAttribute(session, "svCoCode");
	}
%>
  <html>
    <head>
    	<applus:include language="javascript">
        gp.page.TextBox;
        gp.page.TextAreaBox;
        gp.page.NumericBox;
        gp.page.PasswordBox;
        gp.page.LabelBox;
        gp.page.ComboBox;
        gp.page.DateBox;
        gp.page.DatetimeBox;
        gp.page.ForeignBox;
        gp.page.Grid;
        gp.page.DataGrid;
        gp.page.SelectGrid;
        gp.page.PaginationConsole;
        gp.page.Free;
        gp.page.FreeManager;
        gp.page.Tipbar;
        gp.page.Toolbar;
        gp.page.Tabstrip;
        gp.page.Search;
        gp.webpage.script.SearchPage;
        gp.default.Btn_EventAdapter;
        gp.default.Btn_Help;
        gp.default.Btn_New;
        gp.default.Btn_Save;
        gp.default.Btn_Delete;
        
        script.admin.AS_POSITION_Edit;
      </applus:include>
      <script type="text/javascript">
      	var vsParent = "<%= parentCode %>";
      	var vsParentCode = vsParent.split(",")[0];
      	var vsParentName = vsParent.split(",")[1];
		var adminPath = "<%= adminPath %>";
		var curPath = "<%= curPath %>";
      </script>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_POSITION" type="edit" ismain="true">	
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_POSITION" tablename="AS_POSITION" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_POSI_ROLE" tablename="AS_POSI_ROLE" condition="" issave="true">
			</applus:tabledata>
			
			<applus:sessiondata componame="AS_POSITION" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_POSITION" /></span>
      <applus:blankrow height="5" />	
		<table class="clsFreeTable" border ="0">
		<colgroup>
		  <col style="width:10%;" />
		  <col style="width:15%;" />
		  <col style="width:10%;" />
		  <col style="width:15%;" />
		  <col style="width:50%;" />
		</colgroup>
		
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_POSITION_POSI_CODE"><applus:resource code="POSI_CODE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="POSI_CODE" componame="AS_POSITION" tablename="AS_POSITION" fieldname="POSI_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_POSITION_POSI_NAME"><applus:resource code="POSI_NAME" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="POSI_NAME" componame="AS_POSITION" tablename="AS_POSITION" fieldname="POSI_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td></td>
    		</tr>
			</table>
			<applus:blankrow height="20"/>
				<applus:grid id="AS_POSITION_Grid" tabindex="0" type="DataGrid" componame="AS_POSITION" tablename="AS_POSI_ROLE" cssclass="clsListPageGrid" style="height:30%">
						<applus:meta>
							<fields>
								<field name="ROLE_ID" caption="<applus:resource code="ROLE_ID" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_POSI_ROLE" condition="<%=cond%>"/>
								<field name="ROLE_NAME" caption="<applus:resource code="ROLE_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>								
							</fields>
						</applus:meta>
      		</applus:grid>  		   			 		      					
			<applus:endpage />	
		</body>
  </html>

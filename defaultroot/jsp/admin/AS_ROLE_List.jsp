<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String userId = SessionUtils.getAttribute(session, "svUserID");
	String cond = "";
	if(!userId.equalsIgnoreCase("sa")){
		cond = "CO_CODE="+SessionUtils.getAttribute(session, "svCoCode")+";";
	}
	String nd = SessionUtils.getAttribute(session, "svNd");
	if(nd != null){
		cond = cond + "ND=" + nd;
	}else{
		cond = "";
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
        
        script.admin.AS_ROLE_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_ROLE" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_ROLE" tablename="AS_ROLE" condition="<%=cond%>" pagesize="100">
			</applus:tabledata>
			<applus:sessiondata componame="AS_ROLE" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="ÐÂÔö" accesskey="A" />
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_ROLE" />µÇ¼Ç²¾</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_ROLE_search" tablename="AS_ROLE" function="getlistpagedata" groupid="voucher_search" pattern="" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_ROLE_Grid" type="Grid" componame="AS_ROLE" tablename="AS_ROLE" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="ROLE_ID" caption="<applus:resource code="ROLE_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="ROLE_NAME" caption="<applus:resource code="ROLE_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="ROLE_DESC" caption="<applus:resource code="ROLE_DESC" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CO_CODE" caption="<applus:resource code="CO_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CO_NAME" caption="<applus:resource code="CO_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

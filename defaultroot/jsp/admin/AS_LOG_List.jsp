<%@ page language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>

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
        
        script.admin.AS_LOG_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_LOG" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_LOG" tablename="AS_LOG" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_LOG" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fexport2" type="command" caption="µ¼³ö" accesskey="A" isgranttoall="true"/>
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_LOG" />µÇ¼Ç²¾</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_LOG_search" tablename="AS_LOG" function="getlistpagedata" groupid="voucher_search" pattern="" tabindex="1" style="position:relative;"/>
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_LOG_Grid" type="Grid" componame="AS_LOG" tablename="AS_LOG" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="OPER_TIME" caption="<applus:resource code="OPER_TIME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="USER_ID" caption="<applus:resource code="USER_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="USER_NAME" caption="<applus:resource code="USER_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="OPER_DESC" caption="<applus:resource code="OPER_DESC" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="COMPO_NAME" caption="<applus:resource code="COMPO_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="PK_DESC" caption="<applus:resource code="PK_DESC" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="IF_SUC" caption="<applus:resource code="IF_SUC" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

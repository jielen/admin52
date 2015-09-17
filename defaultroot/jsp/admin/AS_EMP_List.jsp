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
        
        script.admin.AS_EMP_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_EMP" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_EMP" tablename="AS_EMP" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_EMP" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="ÐÂÔö" accesskey="A" />
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_EMP" />µÇ¼Ç²¾</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_EMP_search" tablename="AS_EMP" function="getlistpagedata" groupid="voucher_search" pattern="" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_EMP_Grid" type="Grid" componame="AS_EMP" tablename="AS_EMP" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="EMP_CODE" caption="<applus:resource code="EMP_CODE" />" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="EMP_NAME" caption="<applus:resource code="EMP_NAME" />" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="CO_NAME" caption="<applus:resource code="CO_NAME" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="SEX" caption="<applus:resource code="SEX" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="TITLE_TECH" caption="<applus:resource code="TITLE_TECH" />" editboxtype="NumericBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PHONE" caption="<applus:resource code="PHONE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="EMAIL" caption="<applus:resource code="EMAIL" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="IDENTITY_CARD" caption="<applus:resource code="IDENTITY_CARD" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="IS_LOGIN" caption="<applus:resource code="IS_LOGIN" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="USER_ID" caption="<applus:resource code="USER_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="RTXUIN" caption="<applus:resource code="RTXUIN" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="EMP_INDEX" caption="<applus:resource code="EMP_INDEX" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PHOTO" caption="<applus:resource code="PHOTO" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PHOTO_BLOBID" caption="<applus:resource code="PHOTO_BLOBID" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

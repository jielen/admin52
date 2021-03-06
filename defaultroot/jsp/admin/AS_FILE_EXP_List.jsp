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
        
        script.admin.AS_FILE_EXP_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_FILE_EXP" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_FILE_EXP" tablename="AS_FILE_EXP" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_FILE_EXP" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="����" accesskey="A" />
        <call id="fhelp" type="command" caption="����" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_FILE_EXP" />�Ǽǲ�</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_FILE_EXP_search" tablename="AS_FILE_EXP" function="getlistpagedata" groupid="voucher_search" pattern="BI_TRACK.FUND_CODE like ltrim('{/statusbox1.value/}%') AND (BI_TRACK.PROC_DATE BETWEEN TO_DATE('{/statusbox_begindate.value/}', 'YYYY-MM-DD') AND TO_DATE('{/statusbox_enddate.value/}', 'YYYY-MM-DD')) listtype={/statusbox.value/}" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_FILE_EXP_Grid" type="Grid" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="COMPO_ID" caption="<applus:resource code="COMPO_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="RULE_ID" caption="<applus:resource code="RULE_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="FILE_TITLE" caption="<applus:resource code="FILE_TITLE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FILE_WIDTH" caption="<applus:resource code="FILE_WIDTH" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="IS_NAME_DISP" caption="<applus:resource code="IS_NAME_DISP" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="IS_TRANS" caption="<applus:resource code="IS_TRANS" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CODE_FMT" caption="<applus:resource code="ROLE_DESC" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

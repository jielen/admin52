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
        
        script.admin.AS_FILE_EXP_NAME_RULE_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_FILE_EXP_NAME_RULE" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_FILE_EXP_NAME_RULE" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
        <call id="fprint" type="command" caption="打印" accesskey="P" isgranttoall="true" />
        <call id="fprn_tpl_set" type="command" caption="打印设置" accesskey="T" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_FILE_EXP_NAME_RULE" />登记簿</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_FILE_EXP_NAME_RULE_search" tablename="AS_NO_RULE" function="getlistpagedata" groupid="voucher_search" pattern="BI_TRACK.FUND_CODE like ltrim('{/statusbox1.value/}%') AND (BI_TRACK.PROC_DATE BETWEEN TO_DATE('{/statusbox_begindate.value/}', 'YYYY-MM-DD') AND TO_DATE('{/statusbox_enddate.value/}', 'YYYY-MM-DD')) listtype={/statusbox.value/}" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_FILE_EXP_NAME_RULE_Grid" type="Grid" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="RULE_CODE" caption="<applus:resource code="RULE_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="RULE_NAME" caption="<applus:resource code="RULE_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="NO_PREFIX" caption="<applus:resource code="NO_PREFIX" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="NO_INDEX_LEN" caption="<applus:resource code="NO_INDEX_LEN" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>
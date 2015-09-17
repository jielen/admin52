<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
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
        
        script.admin.AS_PRINT_JASPERTEMP_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_PRINT_JASPERTEMP" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" condition="<%=cond%>" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_PRINT_JASPERTEMP" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="����" accesskey="A" />
        <call id="fsaveas" type="command" caption="���Ϊ"/>
        <call id="ftemplatedistribute" type="command" caption="��ӡģ���·�������λ" />
        <call id="fprint" type="command" caption="��ӡ" isgranttoall="true" />
        <call id="fprn_tpl_set" type="command" caption="��ӡ����" isgranttoall="true" />
        <call id="fhelp" type="command" caption="����" accesskey="H" isgranttoall="true" />
        <call id="fexport" type="command" caption="������EXCEL�ļ�" accesskey="E" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_PRINT_JASPERTEMP" />�Ǽǲ�</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_PRINT_JASPERTEMP_search" tablename="AS_PRINT_JASPERTEMP" function="getlistpagedata" groupid="voucher_search" pattern="BI_TRACK.FUND_CODE like ltrim('{/statusbox1.value/}%') AND (BI_TRACK.PROC_DATE BETWEEN TO_DATE('{/statusbox_begindate.value/}', 'YYYY-MM-DD') AND TO_DATE('{/statusbox_enddate.value/}', 'YYYY-MM-DD')) listtype={/statusbox.value/}" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_PRINT_JASPERTEMP_Grid" type="Grid" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="PRN_COMPO_ID" caption="<applus:resource code="PRN_COMPO_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PRN_TPL_JPCODE" caption="<applus:resource code="PRN_TPL_JPCODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="PRN_TPL_NAME" caption="<applus:resource code="PRN_TPL_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PRN_TPL_OUTTYPE" caption="<applus:resource code="PRN_TPL_OUTTYPE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PRN_TPL_REPORTTYPE" caption="<applus:resource code="PRN_TPL_REPORTTYPE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="PRN_TPL_HANDLER" caption="<applus:resource code="PRN_TPL_HANDLER" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PRN_TPL_HANDLETIME" caption="<applus:resource code="PRN_TPL_HANDLETIME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="CO_CODE" caption="<applus:resource code="CO_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
					</fields>
				</applus:meta>
			 </applus:grid>	
      <applus:endpage/>	
		</body>
  </html>

<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String nd = SessionUtils.getAttribute(session, "svNd");
	String cond = "";
	if(nd != null){
		cond = "ND="+nd;
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
        
        script.admin.MA_COMPANY_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="MA_COMPANY" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromMA_COMPANY" tablename="MA_COMPANY" condition="<%=cond%>" pagesize="100">
			</applus:tabledata>
			<applus:sessiondata componame="MA_COMPANY" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle">单位登记簿</span>
      <applus:blankrow height="5" />
			
			<table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="MA_COMPANY_search" tablename="MA_COMPANY" function="getlistpagedata" groupid="voucher_search" pattern="BI_TRACK.FUND_CODE like ltrim('{/statusbox1.value/}%') AND (BI_TRACK.PROC_DATE BETWEEN TO_DATE('{/statusbox_begindate.value/}', 'YYYY-MM-DD') AND TO_DATE('{/statusbox_enddate.value/}', 'YYYY-MM-DD')) listtype={/statusbox.value/}" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
			<applus:grid id="MA_COMPANY_Grid" type="Grid" componame="MA_COMPANY" tablename="MA_COMPANY" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="CO_CODE" caption="<applus:resource code="CO_CODE" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CO_NAME" caption="<applus:resource code="CO_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CO_FULLNA" caption="<applus:resource code="CO_FULLNA" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="QUIC_CODE" caption="<applus:resource code="QUIC_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="BANK_ACC" caption="<applus:resource code="BANK_ACC" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="SHOP_CARD_NO" caption="<applus:resource code="SHOP_CARD_NO" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CORP_REPR" caption="<applus:resource code="CORP_REPR" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="IS_LOWEST" caption="<applus:resource code="IS_LOWEST" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="TRADE_NAME" caption="<applus:resource code="TRADE_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="POST_CODE" caption="<applus:resource code="POST_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="COMM_ADDR" caption="<applus:resource code="COMM_ADDR" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="COUNTRY" caption="<applus:resource code="COUNTRY" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PROVINCE" caption="<applus:resource code="PROVINCE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CITY" caption="<applus:resource code="CITY" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="ADDRESS" caption="<applus:resource code="ADDRESS" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PARENT_CO_CODE" caption="<applus:resource code="PARENT_CO_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PARENT_CO_NAME" caption="<applus:resource code="PARENT_CO_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="REAL_CO_CODE" caption="<applus:resource code="REAL_CO_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FI_LEADER" caption="<applus:resource code="FI_LEADER" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="IS_USED" caption="<applus:resource code="IS_USED" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />			
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>
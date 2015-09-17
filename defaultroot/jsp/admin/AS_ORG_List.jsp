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
        
        script.admin.AS_ORG_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_ORG" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_ORG" tablename="AS_ORG" condition="<%=cond%>" pagesize="100">
			</applus:tabledata>
			<applus:sessiondata componame="AS_ORG" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="ÐÂÔö" accesskey="A" />
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_ORG" />µÇ¼Ç²¾</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_ORG_search" tablename="AS_ORG" function="getlistpagedata" groupid="voucher_search" pattern="BI_TRACK.FUND_CODE like ltrim('{/statusbox1.value/}%') AND (BI_TRACK.PROC_DATE BETWEEN TO_DATE('{/statusbox_begindate.value/}', 'YYYY-MM-DD') AND TO_DATE('{/statusbox_enddate.value/}', 'YYYY-MM-DD')) listtype={/statusbox.value/}" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_ORG_Grid" type="Grid" componame="AS_ORG" tablename="AS_ORG" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="CO_CODE" caption="<applus:resource code="CO_CODE" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CO_NAME" caption="<applus:resource code="CO_NAME" />" editboxtype="TextBox" width="250" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="ORG_CODE" caption="<applus:resource code="ORG_CODE" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="ORG_NAME" caption="<applus:resource code="ORG_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="ND" caption="<applus:resource code="ND" />" editboxtype="NumericBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PRIN_CODE" caption="<applus:resource code="PRIN_CODE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="QUIC_CODE" caption="<applus:resource code="QUIC_CODE" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PARENT_ORG_CODE" caption="<applus:resource code="PARENT_ORG_CODE" />" editboxtype="TextBox" width="250" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="PARENT_ORG_NAME" caption="<applus:resource code="PARENT_ORG_NAME" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="LINKMAN" caption="<applus:resource code="LINKMAN" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="TELE" caption="<applus:resource code="TELE" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="ORG_ID" caption="<applus:resource code="ORG_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

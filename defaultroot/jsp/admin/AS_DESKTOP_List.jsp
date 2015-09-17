<%@ page language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%@ page import="com.anyi.gp.pub.SessionUtils"%>
<%
    String userName = SessionUtils.getAttribute(request,"svUserID");
    String cond="";
    if(!userName.equals("sa")){
    cond = "USER_ID=" + userName;
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
        
        script.admin.AS_DESKTOP_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_DESKTOP" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_DESKTOP" tablename="AS_DESKTOP" condition="<%=cond%>" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_DESKTOP" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_DESKTOP" />µÇ¼Ç²¾</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_DESKTOP_search" tablename="AS_DESKTOP" function="getlistpagedata" groupid="voucher_search" pattern="BI_TRACK.FUND_CODE like ltrim('{/statusbox1.value/}%') AND (BI_TRACK.PROC_DATE BETWEEN TO_DATE('{/statusbox_begindate.value/}', 'YYYY-MM-DD') AND TO_DATE('{/statusbox_enddate.value/}', 'YYYY-MM-DD')) listtype={/statusbox.value/}" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_DESKTOP_Grid" type="Grid" componame="AS_DESKTOP" tablename="AS_DESKTOP" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="AREA_ID" caption="<applus:resource code="AREA_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="IMG_NAME" caption="<applus:resource code="IMG_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="AREA_NAME" caption="<applus:resource code="AREA_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="AREA_INDEX" caption="<applus:resource code="AREA_INDEX" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="AREA_IMG" caption="<applus:resource code="AREA_IMG" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="USER_ID" caption="<applus:resource code="USER_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="DISPLAY_AMOUNT" caption="<applus:resource code="DISPLAY_AMOUNT" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="IS_DISPLAY_REC" caption="<applus:resource code="IS_DISPLAY_REC" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

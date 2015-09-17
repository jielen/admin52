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
        
        script.admin.AS_PORTLET_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_PORTLET" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_PORTLET" tablename="AP_PORTLET" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_PORTLET" />							
			<applus:init>
				setPageInit();
      </applus:init>      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="����" accesskey="A" />
        <call id="fhelp" type="command" caption="����" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_PORTLET" /></span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_PORTLET_search" tablename="AP_PORTLET" function="getlistpagedata" groupid="voucher_search" pattern="" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_PORTLET_Grid" type="Grid" componame="AS_PORTLET" tablename="AP_PORTLET" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="PORTLET_ID" caption="Ƶ�����"   editboxtype="TextBox" width="80" isvisible="false" isallowinput="false" isreadonly="true" />
						<field name="PORTLET_NAME" caption="Ƶ������" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PORTLET_URL" caption="Ƶ��URL"  editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PORTLET_DESC" caption="Ƶ������" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PORTLET_TYPE" caption="Ƶ������" editboxtype="TextBox" width="80" isvisible="false" isallowinput="false" isreadonly="true" />					
						<field name="PORTLET_CLASS" caption="���ݳ�ȡ��" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />					
						<field name="PORTLET_MORE_URL" caption="MOREҳ��URL" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />									
						<field name="PORTLET_DETAIL_URL" caption="DETAILҳ��URL" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />	
						<field name="IS_SYSTEM" caption="�Ƿ���ϵͳԤ��" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />								
					</fields>										
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

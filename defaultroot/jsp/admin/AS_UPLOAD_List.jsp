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
        
        script.admin.AS_UPLOAD_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_UPLOAD" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_UPLOAD" tablename="AS_UPLOAD" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_UPLOAD" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="f_upload" type="command" caption="�ϴ���Դ" accesskey="F" isgranttoall="true" />
        <call id="fdelete" type="command" caption="ɾ����Դ" accesskey="D" isgranttoall="true" />
        <call id="fhelp" type="command" caption="����" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_UPLOAD" />�Ǽǲ�</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_UPLOAD_search" tablename="AS_UPLOAD" function="getlistpagedata" groupid="voucher_search" pattern="" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_UPLOAD_Grid" type="Grid" componame="AS_UPLOAD" tablename="AS_UPLOAD" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="FILE_ID" caption="��Դ����" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FILE_NAME" caption="��Դ����" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FILE_DESC" caption="����" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FILE_CREATOR" caption="������" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FILE_UPLOADTIME" caption="�ϴ�ʱ��" editboxtype="DateBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />		
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

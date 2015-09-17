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
        
        script.admin.AS_FILEIMP_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_FILEIMP" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_FILEIMP" tablename="AS_FILEIMP_STYLE" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_FILEIMP" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="����" accesskey="A" />
        <!--<call id="fadd" type="command" caption="������" accesskey="A" />	-->
        <call id="fhelp" type="command" caption="����" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_FILEIMP" />�Ǽǲ�</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_FILEIMP_search" tablename="AS_FILEIMP_STYLE" function="getlistpagedata" groupid="voucher_search" pattern="" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_FILEIMP_Grid" type="Grid" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="FIMP_ID" caption="�ļ���ʽID" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FIMP_NAME" caption="�ļ���ʽ����" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FIMP_TABLE" caption="�������ݿ����" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
					  <field name="FILE_STARTLINE" caption="�ļ����뿪ʼ��" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="ENDLINE" caption="�ļ����������" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FIELDNUM" caption="�����ļ��ֶ�����" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
					  <field name="SEPERATOR" caption="�ļ�����ָ���" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="UPDATE_INSERT" caption="���ݵ����������" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="FILEIMP_CLASSNAME" caption="������ɺ�ִ�е�Java��" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />	
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

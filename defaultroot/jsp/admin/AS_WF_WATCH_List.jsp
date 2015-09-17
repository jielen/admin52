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
        script.admin.AS_WF_WATCH_List;
        gp.workflow.WFPage4;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="WF_WATCH" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromWF_WATCH" tablename="AS_WF_WATCH" condition="" pagesize="30">
			</applus:tabledata>
			<applus:sessiondata componame="WF_WATCH" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      <applus:toolbar id="toolbar">
     <!-- <call id="fnewcommit" type="command" caption="����" accesskey="N" />
      <call id="fautocommit" type="command" caption="�ύ" accesskey="F" />
      <call id="funtread" type="command" caption="�˻�" accesskey="U" />
      <call id="fcallback" type="command" caption="�ջ�" accesskey="C" />
      <call id="frework" type="command" caption="����" accesskey="R" />
      <call id="finterruptinstance" type="command" caption="����" accesskey="I" />-->
      <call id="fshowinstancetrace" type="command" caption="���̸���" accesskey="S" />
      <call id="fhelp" type="command" caption="����" accesskey="H" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle">���̼��</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
      <colgroup>
           <col style="width:40%;" />
           <col style="width:10%;" />
           <col style="width:40%;" />
        </colgroup>
				<tr class="clsFreeRow">
					<td nowrap width="4%" align="left" class="clsNormCaption">
            ��������
          </td>
         <td class="clsNormCaptionAtLeft"><applus:combobox sqlid="admin-selectPage.getDataFromWF_WATCH" id="templatename" isfromdb="true" componame="WF_WATCH" tablename="AS_WF_WATCH" fieldname="WF_TEMPLATE_NAME" groupid="voucher_search" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
          
          <td nowrap align="right">
            <applus:search id="AS_WF_WATCH_search" tablename="AS_WF_WATCH" function="getlistpagedata" groupid="voucher_search" isadvancebtnvisible="false" tabindex="1" style="position:relative;" />   
          </td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="WF_WATCH_Grid" type="Grid" componame="WF_WATCH" tablename="AS_WF_WATCH" pagesize="30" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="WF_INSTANCE_ID"  caption="ʵ�����" editboxtype="TextBox" width="80" isvisible="false" isallowinput="false" isreadonly="true" />
						<field name="WF_INSTANCE_NAME"  caption="����" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="WF_TEMPLATE_NAME"  caption="������" editboxtype="TextBox" width="200" isvisible="true" isallowinput="false" isreadonly="true" />		
						<field name="WF_INSTANCE_OWNER"  caption="ʵ��������" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="WF_INSTANCE_STATUS"  caption="����״̬" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
					  <field name="WF_INSTANCE_START_TIME"  caption="ʵ����ʼʱ��" editboxtype="TextBox" width="150" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="WF_INSTANCE_END_TIME"  caption="ʵ������ʱ��" editboxtype="TextBox" width="100" isvisible="true" isallowinput="false" isreadonly="true" />
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
      </br>
		</body>
  </html>

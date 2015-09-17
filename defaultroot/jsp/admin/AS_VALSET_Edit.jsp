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
        gp.default.Btn_Print;
        gp.default.Btn_Prn_tpl_set;
        script.admin.AS_VALSET_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_VALSET" type="edit" ismain="true">
		  </applus:compometa>
		  <applus:tabledata sqlid="admin-editPage.getDataFromAS_VALSET" tablename="AS_VALSET" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_VAL" tablename="AS_VAL" condition="" issave="true">
			</applus:tabledata>
			
			
			<applus:sessiondata componame="AS_VALSET" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_VALSET" /></span>
      <applus:blankrow height="5" />	

    	<table class="clsFreeTable" border ="0">
    		<colgroup>
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:10%;" />
        </colgroup>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_VALSET_VALSET_ID"><applus:resource code="VALSET_ID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="VALSET_ID" componame="AS_VALSET" tablename="AS_VALSET" fieldname="VALSET_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_VALSET_VALSET_NAME"><applus:resource code="VALSET_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="VALSET_NAME" componame="AS_VALSET" tablename="AS_VALSET" fieldname="VALSET_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_VALSET_VAL_SQL"><applus:resource code="VAL_SQL" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="VAL_SQL" componame="AS_VALSET" tablename="AS_VALSET" fieldname="VAL_SQL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    			<td class="clsKeyCaption nowrap id="label_AS_VALSET_LSTDATE"><applus:resource code="LSTDATE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:datebox id="LSTDATE" componame="AS_VALSET" tablename="AS_VALSET" fieldname="LSTDATE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_VALSET_IS_SYSTEM"><applus:resource code="IS_SYSTEM" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_SYSTEM" componame="AS_VALSET" tablename="AS_VALSET" fieldname="IS_SYSTEM" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
     			<td></td>
     			<td></td>
     		  <td></td>
     		</tr>
    	</table>
			<applus:blankrow height="20"/>
			    		
			<applus:grid id="AS_VAL_Grid" tabindex="0" type="DataGrid" componame="AS_VALSET" tablename="AS_VAL" cssclass="clsListPageGrid" style="height:30%">
				<applus:meta>
					<fields>
						<field name="VAL_ID" caption="<applus:resource code="VAL_ID" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>
						<field name="VAL" caption="<applus:resource code="VAL" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>	
						<field name="IS_SYSTEM" caption="<applus:resource code="IS_SYSTEM" />" editboxtype="ComboBox" width="100" isvisible="true"  defvalue="N" isallowinput="true" isreadonly="false"/>		
					  <field name="ORD_INDEX" caption="<applus:resource code="ORD_INDEX" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />					
					</fields>
				</applus:meta>
      </applus:grid>		
			
      		   			 		      					
			<applus:endpage />	
		</body>
  </html>

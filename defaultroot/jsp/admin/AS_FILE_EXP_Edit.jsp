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
        gp.page.FileBox;
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
        script.admin.AS_FILE_EXP_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_FILE_EXP" type="edit" ismain="true">
		  </applus:compometa>
		  <applus:tabledata sqlid="admin-editPage.getDataFromAS_FILE_EXP" tablename="AS_FILE_EXP" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_FILE_EXP_TABLE" tablename="AS_FILE_EXP_TABLE" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_FILE_EXP_FIELD" tablename="AS_FILE_EXP_FIELD" condition="" issave="true">
			</applus:tabledata>
			
			
			<applus:sessiondata componame="AS_FILE_EXP" />
					
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
      <span class="clsListPageTitle"><applus:resource code="AS_FILE_EXP" /></span>
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
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_EXP_COMPO_ID"><applus:resource code="COMPO_ID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="COMPO_ID" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="COMPO_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_COMPO" condition=""/></td>
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_EXP_RULE_ID"><applus:resource code="RULE_ID" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="RULE_ID" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="RULE_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_NO_RULE" condition=""/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_FILE_TITLE"><applus:resource code="FILE_TITLE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FILE_TITLE" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="FILE_TITLE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_EXP_FILE_WIDTH"><applus:resource code="FILE_WIDTH" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FILE_WIDTH" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="FILE_WIDTH" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_EXP_IS_NAME_DISP"><applus:resource code="IS_NAME_DISP" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_NAME_DISP" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="IS_NAME_DISP" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_EXP_IS_TRANS"><applus:resource code="IS_TRANS" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_TRANS" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="IS_TRANS" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_EXP_CODE_FMT"><applus:resource code="CODE_FMT" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="CODE_FMT" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="CODE_FMT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_FILE_EXP_IS_SINGLE_TXT"><applus:resource code="IS_SINGLE_TXT" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_SINGLE_TXT" componame="AS_FILE_EXP" tablename="AS_FILE_EXP" fieldname="IS_SINGLE_TXT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    	</table>
			<applus:blankrow height="20"/>

			<applus:grid id="AS_FILE_EXP_TABLE_Grid" tabindex="0" type="DataGrid" componame="AS_FILE_EXP" tablename="AS_FILE_EXP_TABLE" cssclass="clsListPageGrid" style="height:30%">
				<applus:meta>
					<fields>
						<field name="TAB_SEQ" caption="<applus:resource code="TAB_SEQ" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
						<field name="TAB_ID" caption="<applus:resource code="TAB_ID" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>	
						<field name="TAB_DELI" caption="<applus:resource code="TAB_DELI" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>											
					</fields>
				</applus:meta>
      </applus:grid>
			 <applus:grid id="AS_FILE_EXP_FIELD_Grid" tabindex="1" type="DataGrid" componame="AS_FILE_EXP" tablename="AS_FILE_EXP_FIELD" pagesize="-1" cssclass="clsListPageGrid" isreadonly="false" style="height:30%">
				<applus:meta>
					<fields>
						<field name="FIELD_SEQ" caption="<applus:resource code="FIELD_SEQ" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>
						<field name="CONST_VALUE" caption="<applus:resource code="CONST_VALUE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
					  <field name="FIELD_NAME" caption="<applus:resource code="FIELD_NAME" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>
						<field name="FIX_LEN" caption="<applus:resource code="FIX_LEN" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
					  <field name="DATA_ALIGN" caption="<applus:resource code="DATA_ALIGN" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
					  <field name="FIELD_DELI" caption="<applus:resource code="FIELD_DELI" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
						<field name="IS_MAP" caption="<applus:resource code="IS_MAP" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
						<field name="MAP_COMPO" caption="<applus:resource code="MAP_COMPO" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_COMPO" condition=""/>		
					  <field name="MAP_S_FIELD" caption="<applus:resource code="MAP_S_FIELD" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_TAB_COL" condition=""/>
						<field name="MAP_FIELD" caption="<applus:resource code="MAP_FIELD" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_TAB_COL" condition=""/>
					  <field name="ADD_BEFORE" caption="<applus:resource code="ADD_BEFORE" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
					  <field name="IS_COMMA" caption="<applus:resource code="IS_COMMA" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
						<field name="DEC_LEN" caption="<applus:resource code="DEC_LEN" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
						<field name="DATE_FMT" caption="<applus:resource code="DATE_FMT" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
					</fields>
				</applus:meta>
      </applus:grid> 	
				
				 	 
			<applus:endpage />	
		</body>
  </html>

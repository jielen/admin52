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
        gp.default.Btn_Save;
        gp.default.Btn_Delete;
        gp.default.Btn_New;
        script.admin.AS_FILE_EXP_NAME_RULE_Edit;
      </applus:include>
  </head>
  
  <body class="clsPageBody">
    	<applus:compometa name="AS_FILE_EXP_NAME_RULE" type="edit" ismain="true">
		</applus:compometa>
		<applus:tabledata sqlid="admin-editPage.getDataFromAS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" condition="" issave="true">
		</applus:tabledata>
		<applus:tabledata sqlid="admin-editPage.getDataFromAS_FILE_EXP_NAME_RULE_SEG" tablename="AS_NO_RULE_SEG" condition="" issave="true">
		</applus:tabledata>
		<applus:sessiondata componame="AS_FILE_EXP_NAME_RULE" />
		<applus:init>
			setPageInit();
      	</applus:init>
      	<applus:toolbar id="toolbar">
      		<call id="fadd" type="command" caption="新增" accesskey="A" />
      		<call id="fedit" type="command" caption="修改" accesskey="E" />
        	<call id="fsave" type="command" caption="保存" accesskey="S" />	
	        <call id="fdelete" type="command" caption="删除" accesskey="D" />	
	        <call id="fprint" type="command" caption="打印" accesskey="P" isgranttoall="true" />
        	<call id="fprn_tpl_set" type="command" caption="打印设置" accesskey="T" isgranttoall="true" />	
	        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      	</applus:toolbar>
      	<applus:blankrow height="5" />
      	<span class="clsListPageTitle"><applus:resource code="AS_FILE_EXP_NAME_RULE" /></span>
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
	    			<td class="clsKeyCaption" nowrap id="label_AS_FILE_EXP_NAME_RULE_RULE_CODE"><applus:resource code="RULE_CODE" /><span class="clsPageAsterisk">*</span></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="RULE_CODE" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" fieldname="RULE_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
	    			<td align="right" class="normalFieldCaption" nowrap id="label_AS_FILE_EXP_NAME_RULE_RULE_NAME"><applus:resource code="RULE_NAME" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="RULE_NAME" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" fieldname="RULE_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
	    		  <td></td>
	    		</tr>
	    		<tr>	
	    			<td class="clsKeyCaption" nowrap id="label_AS_FILE_EXP_NAME_RULE_COMPO_ID"><applus:resource code="COMPO_ID" /><span class="clsPageAsterisk">*</span></td>
	    			<td class="clsKeyCaptionAtLeft">
	    				<applus:foreignbox id="COMPO_ID" isfromdb="true" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" fieldname="COMPO_ID" cssclass="clsListPageEditBox" sqlid="admin-selectPage.getDataFromAS_COMPO" condition=""/>
	    			</td>
	    			<td align="right" class="normalFieldCaption" nowrap id="label_AS_FILE_EXP_NAME_RULE_NO_PREFIX"><applus:resource code="NO_PREFIX" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="NO_PREFIX" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" fieldname="NO_PREFIX" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
	    		  <td></td>
	    		</tr>
	    		<tr>	
	    			<td align="right" class="normalFieldCaption" nowrap id="label_AS_FILE_EXP_NAME_RULE_NO_INDEX_LEN"><applus:resource code="NO_INDEX_LEN" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="NO_INDEX_LEN" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" fieldname="NO_INDEX_LEN" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
	    			<td align="right" class="normalFieldCaption" nowrap id="label_AS_FILE_EXP_NAME_RULE_IS_INCL_ATOZ"><applus:resource code="IS_INCL_ATOZ" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_INCL_ATOZ" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE" fieldname="IS_INCL_ATOZ" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>				
	  			  <td></td>
	  			</tr>
	    	</table>
	    	<applus:blankrow height="20"/>
				<applus:grid id="AS_FILE_EXP_NAME_RULE_Grid" tabindex="0" type="DataGrid" componame="AS_FILE_EXP_NAME_RULE" tablename="AS_NO_RULE_SEG" cssclass="clsListPageGrid" style="height:50%">
						<applus:meta>
							<fields>
								<field name="ORD_INDEX" caption="<applus:resource code="ORD_INDEX" />" editboxtype="NumericBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
								<field name="SEG_FIELD" caption="<applus:resource code="SEG_FIELD" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_TAB_COL" condition=""/>	
								<field name="SEG_SV" caption="<applus:resource code="SEG_SV" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
							  	<field name="SEG_CONST" caption="<applus:resource code="SEG_CONST" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
							  	<field name="SEG_LEN" caption="<applus:resource code="SEG_LEN" />" editboxtype="NumericBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
							  	<field name="SEG_FILL_POSI" caption="<applus:resource code="SEG_FILL_POSI" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />
							  	<field name="SEG_FILL" caption="<applus:resource code="SEG_FILL" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
							  	<field name="SEG_DELI" caption="<applus:resource code="SEG_DELI" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
							  	<field name="DATE_FMT" caption="<applus:resource code="DATE_FMT" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
							  	<field name="IS_BEFORE_NO" caption="<applus:resource code="IS_BEFORE_NO" />" editboxtype="ComboBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />										
							</fields>
						</applus:meta>
      			</applus:grid>
			<applus:blankrow height="5" />	
			<applus:endpage />		
  </body>
</html>

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
        gp.common.List;
        gp.common.StringBuffer;
        gp.common.Map;
        gp.common.Base;
        gp.common.Listener;
        gp.common.Rect;
        gp.pub.Constant;
        gp.pub.PublicFunction;
        gp.pub.Information;
        gp.pub.DataTools4;
        gp.pub.Develope;
        gp.page.Head;
        script.Community;
        script.foreign;
        script.popmenu;
        script.tree;

				script.PageData;
				script.grid;
				script.General;
				script.GFunctions;
        script.admin.AS_SYS_OPT_Edit;
      </applus:include>
      <SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_SYS_OPT" type="edit" ismain="true">
			</applus:compometa>
			
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_SYS_OPT" tablename="AS_TEMP" condition="" issave="true" componame="AS_OPTION">
			</applus:tabledata>
			<applus:sessiondata componame="AS_SYS_OPT" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fsave" type="command" caption="±£´æ" accesskey="S" />		
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_SYS_OPT" /></span>
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
    			<td class="clsKeyCaption nowrap id="label_AS_SYS_OPT_OPT_CO_CODE"><applus:resource code="OPT_CO_CODE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_CO_CODE" componame="AS_SYS_OPT" tablename="AS_TEMP" fieldname="OPT_CO_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    			<td class="clsKeyCaption nowrap id="label_AS_SYS_OPT_OPT_EMP"><applus:resource code="OPT_EMP" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_EMP" componame="AS_SYS_OPT" tablename="AS_TEMP" fieldname="OPT_EMP" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption nowrap id="label_AS_SYS_OPT_OPT_EMP_LENGTH"><applus:resource code="OPT_EMP_LENGTH" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_EMP_LENGTH" isfromdb="true" componame="AS_SYS_OPT" tablename="AS_TEMP" fieldname="OPT_EMP_LENGTH" cssclass="clsListPageEditBox"/></td>
    			<td class="clsKeyCaption nowrap id="label_AS_SYS_OPT_OPT_HAS_ORG"><applus:resource code="OPT_HAS_ORG" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_HAS_ORG" componame="AS_SYS_OPT" tablename="AS_TEMP" fieldname="OPT_HAS_ORG" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption nowrap id="label_AS_SYS_OPT_OPT_AS_NAME_DUPL"><applus:resource code="OPT_AS_NAME_DUPL" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_AS_NAME_DUPL" componame="AS_SYS_OPT" tablename="AS_TEMP" fieldname="OPT_AS_NAME_DUPL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td></td>
    			<td></td>
    			<td></td>				
  			</tr>
			</table>
      		   			 		      					
			<applus:endpage />	
		</body>
  </html>

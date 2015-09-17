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
        script.admin.AS_COMPANY_OPT_Edit;
      </applus:include>
      <SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_COMPANY_OPT" type="edit" ismain="true">
			</applus:compometa>
			
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_COMPANY_OPT" tablename="AS_TEMP" condition="" issave="true">
			</applus:tabledata>
			<applus:sessiondata componame="AS_COMPANY_OPT" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fsave" type="command" caption="±£´æ" accesskey="S" />		
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_COMPANY_OPT" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
				<colgroup>
           <col style="width:40%;" />
           <col style="width:20%;" />
           <col style="width:40%;" />
         </colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_COMPANY_OPT_COMPANY"><applus:resource code="OPT_COMPANY" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_COMPANY" componame="AS_COMPANY_OPT" tablename="AS_TEMP" fieldname="OPT_COMPANY" isforcereadonly="true" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    		  <td></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption nowrap id="label_AS_COMPANY_OPT_ORG"><applus:resource code="OPT_ORG" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_ORG" isfromdb="true" componame="AS_COMPANY_OPT" tablename="AS_TEMP" fieldname="OPT_ORG" cssclass="clsListPageEditBox"/></td>
    		  <td></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption nowrap id="label_AS_COMPANY_OPT_ORG_LEVEL"><applus:resource code="OPT_ORG_LEVEL" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_ORG_LEVEL" componame="AS_COMPANY_OPT" tablename="AS_TEMP" fieldname="OPT_ORG_LEVEL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>		
  			  <td></td>
  			</tr>
			</table>
      		   			 		      					
			<applus:endpage />	
		</body>
  </html>

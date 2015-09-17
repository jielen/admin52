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
        script.admin.AS_MAIL_OPT_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_MAIL_OPT" type="edit" ismain="true">
		  </applus:compometa>
		  <applus:tabledata sqlid="admin-editPage.getDataFromAS_TEMP" tablename="AS_TEMP" condition="" issave="true" componame="AS_MAIL_OPT">
			</applus:tabledata>
			
			
			<applus:sessiondata componame="AS_MAIL_OPT" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="ÐÂÔö" accesskey="A" />
        <call id="fsave" type="command" caption="±£´æ" accesskey="S" />	
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_MAIL_OPT" /></span>
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
    			<td class="clsKeyCaption nowrap id="label_AS_MAIL_OPT_OPT_MAIL_SMTPHOST"><applus:resource code="OPT_MAIL_SMTPHOST" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_MAIL_SMTPHOST" componame="AS_MAIL_OPT" tablename="AS_TEMP" fieldname="OPT_MAIL_SMTPHOST" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_MAIL_OPT_OPT_MAIL_NEEDAUTH"><applus:resource code="OPT_MAIL_NEEDAUTH" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_MAIL_NEEDAUTH" componame="AS_MAIL_OPT" tablename="AS_TEMP" fieldname="OPT_MAIL_NEEDAUTH" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		   <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_MAIL_OPT_OPT_MAIL_ADMINEMAIL"><applus:resource code="OPT_MAIL_ADMINEMAIL" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_MAIL_ADMINEMAIL" componame="AS_MAIL_OPT" tablename="AS_TEMP" fieldname="OPT_MAIL_ADMINEMAIL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    			<td class="clsKeyCaption nowrap id="label_AS_MAIL_OPT_OPT_MAIL_USER"><applus:resource code="OPT_MAIL_USER" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_MAIL_USER" componame="AS_MAIL_OPT" tablename="AS_TEMP" fieldname="OPT_MAIL_USER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		   <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_MAIL_OPT_OPT_MAIL_PASSWORD"><applus:resource code="OPT_MAIL_PASSWORD" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_MAIL_PASSWORD" componame="AS_MAIL_OPT" tablename="AS_TEMP" fieldname="OPT_MAIL_PASSWORD" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
     			<td></td>
     			<td></td>
     		   <td></td>
     		</tr>
    	</table>
    	<applus:endpage />	
		</body>
  </html>

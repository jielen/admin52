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
        gp.page.FileBox;
        gp.page.DateBox;
        gp.page.DatetimeBox;
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
        script.admin.AS_STATINFO_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_STATINFO" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_STATINFO" tablename="AS_TEMP" condition="" totalfields="" issave="true">
			</applus:tabledata>
							
			<applus:sessiondata componame="AS_STATINFO" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_STATINFO" /></span>
      <applus:blankrow height="5" />
      <table class="clsFreeTable" border ="0">
      	<tr class="clsFreeRow">
      		<td>
						<table class="clsFreeTable" border ="0">
      				<tr class="clsFreeRow">
      				  <td class="clsKeyCaption nowrap id="label_AS_STATINFO_TOTALLOGINNUM"><applus:resource code="TOTALLOGINNUM" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="TOTALLOGINNUM" componame="AS_STATINFO" tablename="AS_TEMP" fieldname="TOTALLOGINNUM" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    					</tr>
						</table> 
				  </td>
				</tr>
				<tr class="clsFreeRow">
      		<td>
      			<table class="clsFreeTable" border ="0">
  						<tr class="clsFreeRow">
    						<td class="clsKeyCaption nowrap id="label_AS_STATINFO_USER_ID"><applus:resource code="USER_ID" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaption nowrap id="label_AS_STATINFO_ISSUER"><applus:resource code="ISSUER" /></td>
    						<td class="clsKeyCaption nowrap id="label_AS_STATINFO_ORGANIZATION"><applus:resource code="ORGANIZATION" /></td>
    						<td class="clsKeyCaption nowrap id="label_AS_STATINFO_TEMPLATE_CODE"><applus:resource code="TEMPLATE_CODE" /></td>    						
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaptionAtTop"><applus:textbox id="USER_ID" componame="AS_STATINFO" tablename="AS_TEMP" fieldname="USER_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td class="clsKeyCaptionAtTop"><applus:textbox id="ISSUER" componame="AS_STATINFO" tablename="AS_TEMP" fieldname="ISSUER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td class="clsKeyCaptionAtTop"><applus:textbox id="TEMPLATE_CODE" componame="AS_STATINFO" tablename="AS_TEMP" fieldname="TEMPLATE_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    						<td class="clsKeyCaptionAtTop"><applus:textbox id="ORGANIZATION" componame="AS_STATINFO" tablename="AS_TEMP" fieldname="ORGANIZATION" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    					</tr>
						</table>
      		</td>
				</tr>
			</table>		   			 		      					
			<applus:endpage />	
		</body>
  </html>

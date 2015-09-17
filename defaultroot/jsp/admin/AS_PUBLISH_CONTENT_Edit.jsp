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
        script.admin.AS_PUBLISH_CONTENT_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_PUBLISH_CONTENT" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" condition="" totalfields="" issave="true">
			</applus:tabledata>
							
			<applus:sessiondata componame="AS_PUBLISH_CONTENT" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fpublishToPortal" type="command" caption="发布"/>
        <call id="freturnPublish" type="command" caption="修改发布"/>
        <call id="fcallback" type="command" caption="收回"/>		
        <call id="fhandover" type="command" caption="移交"/>
        <call id="fimpower" type="command" caption="授权"/>
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_PUBLISH_CONTENT" /></span>
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
      		<td>
						<table class="clsFreeTable" border ="0">
  						<tr class="clsFreeRow">
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_SID"><applus:resource code="SID" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="SID" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="SID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_TEMPLATE_CODE"><applus:resource code="TEMPLATE_CODE" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="TEMPLATE_CODE" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="TEMPLATE_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    					  <td></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_ISSUER"><applus:resource code="ISSUER" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="ISSUER" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="ISSUER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_ORGANIZATION"><applus:resource code="ORGANIZATION" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="ORGANIZATION" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="ORGANIZATION" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    					  <td></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_START_TIME"><applus:resource code="START_TIME" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:datebox id="START_TIME" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="START_TIME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_EXPIRE_TIME"><applus:resource code="EXPIRE_TIME" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:datebox id="EXPIRE_TIME" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="EXPIRE_TIME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    					  <td></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_TITLE"><applus:resource code="TITLE" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="TITLE" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="TITLE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td></td>
    						<td></td>
    					  <td></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_KEYWORD"><applus:resource code="KEYWORD" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="KEYWORD" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="KEYWORD" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td></td>
    						<td></td>
    					  <td></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_ABSTRACT"><applus:resource code="ABSTRACT" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="ABSTRACT" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="ABSTRACT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    						<td></td>
    						<td></td>
    					  <td></td>
    					</tr>
						</table> 
				  </td>
				</tr>
				<tr class="clsFreeRow">
      		<td>
      			<table class="clsFreeTable" border ="0">
      				<tr class="clsFreeRow">
      				  <td class="clsKeyCaption nowrap id="label_AS_PUBLISH_CONTENT_CONTENT"><applus:resource code="CONTENT" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:filebox id="CONTENT" componame="AS_PUBLISH_CONTENT" tablename="AS_PUBLISH_CONTENT" fieldname="CONTENT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    					  <td></td>
    					  <td></td>
    					  <td></td>
    					</tr>
						</table> 
      		</td>
				</tr>
			</table>		   			 		      					
			<applus:endpage />	
		</body>
  </html>

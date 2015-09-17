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

        script.admin.AS_COMPO_NO_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_COMPO_NO" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_COMPO_NO" tablename="AS_COMPO" condition="" totalfields="" issave="true">
			</applus:tabledata>
							
			<applus:sessiondata componame="AS_COMPO_NO" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fedit" type="command" caption="ÐÞ¸Ä" accesskey="E" />
        <call id="fsave" type="command" caption="±£´æ" accesskey="S" />	
        <call id="fhelp" type="command" caption="°ïÖú" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_COMPO_NO" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
				<colgroup>
           <col style="width:40%;" />
           <col style="width:20%;" />
           <col style="width:40%;" />
         </colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_COMPO_NO_COMPO_ID"><applus:resource code="COMPO_ID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="COMPO_ID" componame="AS_COMPO_NO" tablename="AS_COMPO" fieldname="COMPO_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_COMPO_NO_COMPO_NAME"><applus:resource code="COMPO_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="COMPO_NAME" componame="AS_COMPO_NO" tablename="AS_COMPO" fieldname="COMPO_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_COMPO_NO_NO_FIELD"><applus:resource code="NO_FIELD" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="NO_FIELD" componame="AS_COMPO_NO" tablename="AS_COMPO" fieldname="NO_FIELD" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_TAB_COL" condition=""/></td>
    		  <td></td>
    		</tr>
			</table> 		   			 		      					
			<applus:endpage />	
		</body>
  </html>

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

        script.admin.AS_IP_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_IP" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_IP" tablename="AS_IP" condition="" totalfields="" issave="true">
			</applus:tabledata>
							
			<applus:sessiondata componame="AS_IP" />
					
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
      <span class="clsListPageTitle"><applus:resource code="AS_IP" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
				<colgroup>
           <col style="width:40%;" />
           <col style="width:20%;" />
           <col style="width:40%;" />
         </colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_IP_GRANT_IP"><applus:resource code="GRANT_IP" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="GRANT_IP" componame="AS_IP" tablename="AS_IP" fieldname="GRANT_IP" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_IP_IP_DESC"><applus:resource code="IP_DESC" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="IP_DESC" componame="AS_IP" tablename="AS_IP" fieldname="IP_DESC" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_IP_USER_ID"><applus:resource code="USER_ID" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="USER_ID" componame="AS_IP" tablename="AS_IP" fieldname="USER_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_EMP" condition=""/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_IP_PHYSICAL_ADDRESS"><applus:resource code="PHYSICAL_ADDRESS" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PHYSICAL_ADDRESS" componame="AS_IP" tablename="AS_IP" fieldname="PHYSICAL_ADDRESS" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_IP_CTRL_TYPE"><applus:resource code="CTRL_TYPE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="CTRL_TYPE" componame="AS_IP" tablename="AS_IP" fieldname="CTRL_TYPE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
			</table> 		   			 		      					
			<applus:endpage />	
		</body>
  </html>

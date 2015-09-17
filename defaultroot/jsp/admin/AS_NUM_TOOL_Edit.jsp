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

        script.admin.AS_NUM_TOOL_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_NUM_TOOL" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_NUM_TOOL" tablename="AS_NUM_TOOL" condition="" totalfields="" issave="true">
			</applus:tabledata>
							
			<applus:sessiondata componame="AS_NUM_TOOL" />
					
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
      <span class="clsListPageTitle"><applus:resource code="AS_NUM_TOOL" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
				<colgroup>
           <col style="width:40%;" />
           <col style="width:20%;" />
           <col style="width:40%;" />
         </colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_NUM_TOOL_NUM_TOOL_ID"><applus:resource code="NUM_TOOL_ID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="NUM_TOOL_ID" componame="AS_NUM_TOOL" tablename="AS_NUM_TOOL" fieldname="NUM_TOOL_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_NUM_TOOL_NUM_TOOL_NAME"><applus:resource code="NUM_TOOL_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="NUM_TOOL_NAME" componame="AS_NUM_TOOL" tablename="AS_NUM_TOOL" fieldname="NUM_TOOL_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_NUM_TOOL_IS_CONT"><applus:resource code="IS_CONT" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_CONT" componame="AS_NUM_TOOL" tablename="AS_NUM_TOOL" fieldname="IS_CONT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_NUM_TOOL_NUM_TOOL_DESC"><applus:resource code="NUM_TOOL_DESC" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="NUM_TOOL_DESC" componame="AS_NUM_TOOL" tablename="AS_NUM_TOOL" fieldname="NUM_TOOL_DESC" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
			</table> 		   			 		      					
			<applus:endpage />	
		</body>
  </html>

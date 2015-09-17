<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String nd = SessionUtils.getAttribute(session, "svNd");
	String cond = "";
	if(nd != null){
		cond = "ND="+nd;
	}else{
		cond = "";
	}
%>
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
        script.admin.AS_PRINT_JASPERTEMP_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_PRINT_JASPERTEMP" type="edit" ismain="true">
		  </applus:compometa>
		  <applus:tabledata sqlid="admin-editPage.getDataFromAS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" condition="" issave="true">
			</applus:tabledata>
			<applus:sessiondata componame="AS_PRINT_JASPERTEMP" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fprint" type="command" caption="打印" isgranttoall="true" />
        <call id="fprn_tpl_set" type="command" caption="打印设置" isgranttoall="true" />
        <call id="ftempdesigner" type="command" caption="模板设计器" accesskey="D" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_PRINT_JASPERTEMP" /></span>
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
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_PRN_COMPO_ID"><applus:resource code="PRN_COMPO_ID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="PRN_COMPO_ID" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_COMPO_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_COMPO" condition=""/></td>
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_PRN_TPL_JPCODE"><applus:resource code="PRN_TPL_JPCODE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PRN_TPL_JPCODE" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_TPL_JPCODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_PRN_TPL_NAME"><applus:resource code="PRN_TPL_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PRN_TPL_NAME" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_TPL_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_PRN_TPL_OUTTYPE"><applus:resource code="PRN_TPL_OUTTYPE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="PRN_TPL_OUTTYPE" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_TPL_OUTTYPE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_PRN_TPL_REPORTTYPE"><applus:resource code="PRN_TPL_REPORTTYPE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="PRN_TPL_REPORTTYPE" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_TPL_REPORTTYPE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_PRN_TPL_FIXROWCOUNT"><applus:resource code="PRN_TPL_FIXROWCOUNT" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PRN_TPL_FIXROWCOUNT" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_TPL_FIXROWCOUNT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_PRN_TPL_VERSION"><applus:resource code="PRN_TPL_VERSION" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PRN_TPL_VERSION" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_TPL_VERSION" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_NUM_PRN_TPL_HANDLER"><applus:resource code="PRN_TPL_HANDLER" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PRN_TPL_HANDLER" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="PRN_TPL_HANDLER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<!-- <td class="clsKeyCaption nowrap id="label_AS_PRINT_JASPERTEMP_CO_CODE"><applus:resource code="CO_CODE" /></td> -->
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="CO_CODE" componame="AS_PRINT_JASPERTEMP" tablename="AS_PRINT_JASPERTEMP" fieldname="CO_CODE" isreadonly="true" isvisible="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_COMPANY" condition="<%=cond %>"/></td>
    			<td></td>
    			<td></td>
    			<td></td>
    			<td></td>
    		</tr>
    	</table>
 					
			<applus:endpage />	
		</body>
  </html>

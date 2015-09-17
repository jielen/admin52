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
        script.admin.AS_SYS_INSTALL;
      </applus:include>
      <SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_SYS_INSTALL" type="edit" ismain="true">
			</applus:compometa>
			
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_SYS_INSTALL" tablename="AS_TEMP" condition="" issave="true" componame="AS_SYS_INSTALL">
			</applus:tabledata>
			<applus:sessiondata componame="AS_SYS_INSTALL" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle">系统设置</span>
      <applus:blankrow height="5" />
      <fieldset style="padding: 2;width:80%"  align="center">
				<legend>公共参数设置</legend>	
				<table class="clsFreeTable" border ="0">
					<colgroup>
	           <col style="width:40%;" />
	           <col style="width:20%;" />
	           <col style="width:40%;" />
	        </colgroup>
	  			<tr class="clsFreeRow">
	    			<td class="clsKeyCaption nowrap id="label_AS_SYS_INSTALL_OPT_PASSWD_TIME"><applus:resource code="OPT_PASSWD_TIME" /><span class="clsPageAsterisk">*</span></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_PASSWD_TIME" componame="AS_SYS_INSTALL" tablename="AS_TEMP" fieldname="OPT_PASSWD_TIME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
	    		  <td></td>
	    		</tr>
	    		
				</table>
			</fieldset>
			<fieldset style="padding: 2;width:80%"  align="center">
				<legend>GoCom参数设置</legend>	
				<table class="clsFreeTable" border ="0">
					<colgroup>
					 <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:10%;" />
          </colgroup>
          <tr class="clsFreeRow">
	    			<td class="clsKeyCaption nowrap id="label_AS_SYS_INSTALL_OPT_GOCOM_USED"><applus:resource code="OPT_GOCOM_USED" /><span class="clsPageAsterisk">*</span></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_GOCOM_USED" componame="AS_SYS_INSTALL" tablename="AS_TEMP" fieldname="OPT_GOCOM_USED" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
	    			<td class="clsKeyCaption nowrap id="label_AS_SYS_INSTALL_OPT_GOCOM_CLIENT"><applus:resource code="OPT_GOCOM_CLIENT" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_GOCOM_CLIENT" componame="AS_SYS_INSTALL" tablename="AS_TEMP" fieldname="OPT_GOCOM_CLIENT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
	    		  <td></td>
    			</tr>
    			<tr class="clsFreeRow">
	    			<td class="clsKeyCaption nowrap id="label_AS_SYS_INSTALL_OPT_GOCOM_SERVER"><applus:resource code="OPT_GOCOM_SERVER" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_GOCOM_SERVER" componame="AS_SYS_INSTALL" tablename="AS_TEMP" fieldname="OPT_GOCOM_SERVER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
	    			<td class="clsKeyCaption nowrap id="label_AS_SYS_INSTALL_OPT_GOCOM_AUTO_LOGIN"><applus:resource code="OPT_GOCOM_AUTO_LOGIN" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_GOCOM_AUTO_LOGIN" componame="AS_SYS_INSTALL" tablename="AS_TEMP" fieldname="OPT_GOCOM_AUTO_LOGIN" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
	    		  <td></td>
    			</tr>
        </table>
			</fieldset>
			
			<fieldset style="padding: 2;width:80%"  align="center">
				<legend>Umail参数设置</legend>	
				<table class="clsFreeTable" border ="0">
					<colgroup>
					 <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:10%;" />
          </colgroup>
          <tr class="clsFreeRow">
	    			<td class="clsKeyCaption nowrap id="label_AS_SYS_INSTALL_OPT_UMAIL_USED"><applus:resource code="OPT_UMAIL_USED" /><span class="clsPageAsterisk">*</span></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="OPT_UMAIL_USED" componame="AS_SYS_INSTALL" tablename="AS_TEMP" fieldname="OPT_UMAIL_USED" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
	    			<td class="clsKeyCaption nowrap id="label_AS_SYS_INSTALL_OPT_UMAIL_SERVER"><applus:resource code="OPT_UMAIL_SERVER" /></td>
	    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_UMAIL_SERVER" componame="AS_SYS_INSTALL" tablename="AS_TEMP" fieldname="OPT_UMAIL_SERVER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
	    		  <td></td>
    			</tr>
        </table>
			</fieldset>
      		   			 		      					
			<applus:endpage />	
		</body>
  </html>

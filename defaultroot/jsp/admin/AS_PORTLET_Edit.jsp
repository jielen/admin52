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
        script.admin.AS_PORTLET_Edit;
        script.yahoo.yahoo-min;
        script.yahoo.event-min;
        script.yahoo.dom-min;
        script.yahoo.element-beta-min;
        script.yahoo.container_core-min;
        script.yahoo.menu-min;
        script.yahoo.simpleeditor-beta-min;
      </applus:include>
			<link rel="stylesheet" type="text/css" href="script/yahoo/css/simpleeditor.css" />
			<link rel="stylesheet" type="text/css" href="script/yahoo/css/button.css" />
			<link rel="stylesheet" type="text/css" href="script/yahoo/css/menu.css" />
			<link rel="stylesheet" type="text/css" href="script/yahoo/css/yui.css" >
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_PORTLET" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_PORTLET" tablename="AP_PORTLET" condition="" issave="true" componame="AS_PORTLET">
			</applus:tabledata>		
			<applus:sessiondata componame="AS_PORTLET" />
					
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
      <span class="clsListPageTitle"><applus:resource code="AS_PORTLET" /></span>
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
  				<td class="clsKeyCaption" nowrap id="label_AS_PORTLET_ID">频道编号<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PORTLET_ID" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_ID" isreadonly="true" isallowinput="false" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td class="clsKeyCaption" nowrap id="label_AS_PORTLET_NAME">频道名称<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PORTLET_NAME" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
  				<td class="clsKeyCaption" nowrap id="label_AS_PORTLET_URL">频道URL<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PORTLET_URL" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_URL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
  				<td class="clsKeyCaption" nowrap id="label_AS_PORTLET_DESC">频道描述<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PORTLET_DESC" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_DESC" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>		  
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    		  <td class="clsKeyCaption" nowrap id="label_AS_PORTLET_TYPE">频道类型<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="PORTLET_TYPE" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_TYPE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td class="clsKeyCaption" nowrap id="label_AS_PORTLET_CLASS">数据抽取类<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PORTLET_CLASS" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_CLASS" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    		  <td class="clsKeyCaption" nowrap id="label_AS_PORTLET_MORE_URL">MORE页面URL<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PORTLET_MORE_URL" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_MORE_URL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td class="clsKeyCaption" nowrap id="label_AS_PORTLET_DETAIL_URL">DETAIL页面URL<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PORTLET_DETAIL_URL" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="PORTLET_DETAIL_URL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    		  <!--<td class="clsKeyCaption" nowrap id="label_AS_PORTLET_IS_SYSTEM">是否系统预置<span class="clsPageAsterisk"></span></td>-->
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_SYSTEM" componame="AS_PORTLET" tablename="AP_PORTLET" fieldname="IS_SYSTEM" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="false"/></td>
    		  <td></td>
    		  <td></td>
    		</tr>
			</table> 	  					 		      					
			<applus:endpage />	
		</body>
  </html>




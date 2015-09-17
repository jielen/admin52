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
        gp.page.textbox;
        gp.page.DateBox;
        gp.page.DatetimeBox;
        gp.page.ForeignBox;
        gp.page.ComboBox;
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
        script.admin.AS_DESKTOP_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_DESKTOP" type="edit" ismain="true">
		  </applus:compometa>
		  <applus:tabledata sqlid="admin-editPage.getDataFromAS_DESKTOP" tablename="AS_DESKTOP" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_DESKTOP_AREA" tablename="AS_DESKTOP_AREA" condition="" issave="true">
			</applus:tabledata>
			
			
			<applus:sessiondata componame="AS_DESKTOP" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdesktop_batch" type="command" caption="桌面批设置"/>
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_DESKTOP" /></span>
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
    			<td class="clsKeyCaption nowrap id="label_AS_DESKTOP_AREA_ID"><applus:resource code="AREA_ID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="AREA_ID" componame="AS_DESKTOP" tablename="AS_DESKTOP" fieldname="AREA_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_DESKTOP_AREA_NAME"><applus:resource code="AREA_NAME" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="AREA_NAME" componame="AS_DESKTOP" tablename="AS_DESKTOP" fieldname="AREA_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox"/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_DESKTOP_AREA_INDEX"><applus:resource code="AREA_INDEX" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="AREA_INDEX" componame="AS_DESKTOP" tablename="AS_DESKTOP" fieldname="AREA_INDEX" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_DESKTOP_AREA_IMG"><applus:resource code="AREA_IMG" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="AREA_IMG" componame="AS_DESKTOP" tablename="AS_DESKTOP" fieldname="AREA_IMG" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_DESKTOP_IMG" condition=""/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_DESKTOP_IMG_NAME"><applus:resource code="IMG_NAME" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="IMG_NAME" componame="AS_DESKTOP" tablename="AS_DESKTOP" fieldname="IMG_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td></td>
    			<td></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_DESKTOP_DISPLAY_AMOUNT"><applus:resource code="DISPLAY_AMOUNT" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="DISPLAY_AMOUNT" componame="AS_DESKTOP" tablename="AS_DESKTOP" fieldname="DISPLAY_AMOUNT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption nowrap id="label_AS_DESKTOP_IS_DISPLAY_REC"><applus:resource code="IS_DISPLAY_REC" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_DISPLAY_REC" componame="AS_DESKTOP" tablename="AS_DESKTOP" fieldname="IS_DISPLAY_REC" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    	</table>
			<applus:blankrow height="20"/>

			<applus:grid id="AS_DESKTOP_AREA_Grid" tabindex="0" type="DataGrid" componame="AS_DESKTOP" tablename="AS_DESKTOP_AREA" cssclass="clsListPageGrid" style="height:30%" isappendbutton= "false" isinsertbutton= "false">
				<applus:meta>
					<fields>
						<field name="COMPO_ID" caption="<applus:resource code="COMPO_ID" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_COMPO" condition=""/>
						<field name="COMPO_NAME" caption="<applus:resource code="COMPO_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>	
						<field name="MENU_ID" caption="<applus:resource code="MENU_ID" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_MENU" condition=""/>											
						<field name="MENU_NAME" caption="<applus:resource code="MENU_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>											
					</fields>
				</applus:meta>
      </applus:grid> 	 
			<applus:endpage />	
		</body>
  </html>

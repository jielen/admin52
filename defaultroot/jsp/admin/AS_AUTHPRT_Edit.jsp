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
        
        script.admin.AS_AUTHPRT_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_AUTHPRT" type="report" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_AUTHPRT" tablename="AS_TEMP" condition="" totalfields="" issave="true">
			</applus:tabledata>
			<applus:sessiondata componame="AS_AUTHPRT" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
      	<call id="fsaveas" type="command" caption="另存为" isgranttoall="true" />
      	<call id="fwatch" type="command" caption="查看" isgranttoall="true" />
      	<call id="fprint" type="command" caption="打印" isgranttoall="true" />
      	<call id="fprn_tpl_set" type="command" caption="打印设置" isgranttoall="true" />
        <call id="fpublish" type="command" caption="发布" isgranttoall="true" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_AUTHPRT" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
				<colgroup>
           <col style="width:40%;" />
           <col style="width:20%;" />
           <col style="width:40%;" />
         </colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption nowrap id="label_AS_AUTHPRT_OPT_USERID"><applus:resource code="OPT_USERID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="OPT_USERID" componame="AS_AUTHPRT" tablename="AS_TEMP" fieldname="OPT_USERID" isreadonly="false" isallowinput="true" value="15000102" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_EMP"  condition=""/></td>
    		  <td></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption nowrap id="label_AS_AUTHPRT_OPT_USERNAME"><applus:resource code="OPT_USERNAME" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="OPT_USERNAME" componame="AS_AUTHPRT" tablename="AS_TEMP" fieldname="OPT_USERNAME" isreadonly="false" isallowinput="true" value="周解波" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
  			
			</table>
      		   			 		      					
			<applus:endpage />	
		</body>
  </html>
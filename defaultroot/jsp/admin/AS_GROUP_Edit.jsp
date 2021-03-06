<%@ page language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>

  <html>
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> 
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

        script.admin.AS_GROUP_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_GROUP" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_GROUP" tablename="AS_GROUP" condition="" issave="true">
			</applus:tabledata>
			
			
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_USER_GROUP" componame="AS_GROUP" tablename="AS_USER_GROUP" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_ROLE_GROUP" componame="AS_GROUP" tablename="AS_ROLE_GROUP" condition="" issave="true">
			</applus:tabledata>
			
			<applus:sessiondata componame="AS_GROUP" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fgroupcopy" type="command" caption="用户组复制" accesskey="P"/>
        <call id="fpagedef" type="command" caption="页面定制" accesskey="P" />
        <call id="fpageContentdef" type="command" caption="页面布局风格定制" accesskey="C"/>
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_GROUP" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
				<colgroup>
           <col style="width:40%;" />
           <col style="width:20%;" />
           <col style="width:40%;" />
        </colgroup>
  			<tr class="clsFreeRow">
  				<td class="clsKeyCaption" nowrap id="label_AS_GROUP_GROUP_ID">用户组代码<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="GROUP_ID" componame="AS_GROUP" tablename="AS_GROUP" fieldname="GROUP_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">	
    			<td class="clsKeyCaption" nowrap id="label_AS_GROUP_GROUP_NAME">用户组名称<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="GROUP_NAME" componame="AS_GROUP" tablename="AS_GROUP" fieldname="GROUP_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">	
    			<td class="clsKeyCaption" nowrap id="label_AS_GROUP_GROUP_DESC">用户组描述<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="GROUP_DESC" componame="AS_GROUP" tablename="AS_GROUP" fieldname="GROUP_DESC" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
			</table>
			<applus:blankrow height="20"/>
			 <applus:tabstrip id="TABGriD_T"   orientation="up" cssclass="clsPageTabstrip1" style="height:50%">    
  		 <applus:tab id="YHMX" caption="用户明细">					
				<applus:grid id="AS_GROUP_Grid_1" tabindex="0" type="DataGrid" componame="AS_GROUP" tablename="AS_USER_GROUP" cssclass="clsListPageGrid">
						<applus:meta>
							<fields>
								<field name="USER_ID" caption="用户编号" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_USER_GROUP" condition=""/>
								<field name="USER_NAME" caption="用户名称" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>								
							  <field name="GROUP_ID" caption="组编号" editboxtype="TextBox" width="100" isvisible="false" isallowinput="true" isreadonly="false"/>
								</fields>
						</applus:meta>
      		</applus:grid>
       </applus:tab>
       
       <applus:tab id="JSMX" caption="角色明细">					
				<applus:grid id="AS_GROUP_Grid_2" tabindex="0" type="DataGrid" componame="AS_GROUP" tablename="AS_ROLE_GROUP" cssclass="clsListPageGrid">
						<applus:meta>
							<fields>
								<field name="ROLE_ID" caption="角色编号" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_ROLE_GROUP" condition=""/>
								<field name="ROLE_NAME" caption="角色名称" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>								
							  <field name="GROUP_ID" caption="组编号" editboxtype="TextBox" width="100" isvisible="false" isallowinput="true" isreadonly="false"/>
							</fields>
						</applus:meta>
      		</applus:grid>
       </applus:tab>
			 </applus:tabstrip>	 	   			 		      					
			<applus:endpage />	
		</body>
  </html>




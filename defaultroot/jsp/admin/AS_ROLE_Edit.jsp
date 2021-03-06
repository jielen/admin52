<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String nd = SessionUtils.getAttribute(session, "svNd");
	String condi = "";
	if(nd != null){
		condi = "ND="+nd;
	}else{
		condi = "";
	}
%>
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

        script.admin.AS_ROLE_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_ROLE" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_ROLE" tablename="AS_ROLE" componame="AS_ROLE" condition="" issave="true">
			</applus:tabledata>
			<applus:compometa name="AS_ROLE_GROUP" type="edit" ismain="false">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_GROUP_ROLE" componame="AS_ROLE_GROUP" tablename="AS_ROLE_GROUP" condition="" issave="true">
			</applus:tabledata>
			<applus:sessiondata componame="AS_ROLE" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fcopyright" type="command" caption="权限复制" />
        <call id="fgrantfunc" type="command" caption="权限设置" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_ROLE" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
				<colgroup>
           <col style="width:40%;" />
           <col style="width:20%;" />
           <col style="width:40%;" />
         </colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_AS_ROLE_ROLE_ID"><applus:resource code="ROLE_ID" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ROLE_ID" componame="AS_ROLE" tablename="AS_ROLE" fieldname="ROLE_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ROLE_ROLE_NAME"><applus:resource code="ROLE_NAME" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ROLE_NAME" componame="AS_ROLE" tablename="AS_ROLE" fieldname="ROLE_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		  <td></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ROLE_ROLE_DESC"><applus:resource code="ROLE_DESC" /></td>
  				<td class="clsKeyCaptionAtLeft"><applus:textbox id="ROLE_DESC" componame="AS_ROLE" tablename="AS_ROLE" fieldname="ROLE_DESC" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
  			  <td></td>
  			</tr>
  			<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ROLE_CO_CODE"><applus:resource code="CO_CODE" /></td>
  				<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="CO_CODE" componame="AS_ROLE" tablename="AS_ROLE" fieldname="CO_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromMA_COMPANY" condition="<%=condi%>"/></td>
  			  <td></td>
  			</tr>
  			<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ROLE_CO_NAME"><applus:resource code="CO_NAME" /></td>
  				<td class="clsKeyCaptionAtLeft"><applus:textbox id="CO_NAME" componame="AS_ROLE" tablename="AS_ROLE" fieldname="CO_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
  			  <td></td>
  			</tr>
  			
			</table>
      <applus:blankrow height="20"/>	
      	<applus:tabstrip id="TABGriD_T"   orientation="up" cssclass="clsPageTabstrip1" style="height:50%">
      		<applus:tab id="ZBSJ" caption="组明细">			
						<applus:grid id="AS_ROLE_GROUP_Grid" tabindex="0" type="DataGrid" componame="AS_ROLE_GROUP" tablename="AS_ROLE_GROUP" cssclass="clsListPageGrid">
								<applus:meta>
									<fields>
										<field name="GROUP_ID" caption="组代码" editboxtype="ForeignBox" width="120" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_GROUP" condition=""/>
			              <field name="GROUP_NAME" caption="组名称" editboxtype="TextBox" width="120" isvisible="true" isallowinput="true" isreadonly="false"/>
			              <field name="ROLE_ID" caption="组名称" editboxtype="TextBox" width="120" isvisible="false" isallowinput="true" isreadonly="false"/>
									</fields>
								</applus:meta>
		      		</applus:grid>
		      	</applus:tab>			
				</applus:tabstrip> 		 		      					
			<applus:endpage />	
		</body>
  </html>

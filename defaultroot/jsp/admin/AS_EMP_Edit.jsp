<%@ page language="java" import="com.anyi.gp.pub.*" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String currentName = request.getParameter("currentPathName");
	String adminPath = request.getParameter("path");
	String curPath = request.getParameter("currentPath"); 
	String pageType = request.getParameter("pageType");
%>
<%
	/*判断权限*/
	String userId = SessionUtils.getAttribute(session, "svUserID");
	String cond = "";
	if(!userId.equalsIgnoreCase("sa")){
		cond = "CO_CODE="+SessionUtils.getAttribute(session, "svCoCode");
	}
	String nd = SessionUtils.getAttribute(session, "svNd");
	String condi = "";
	if(nd != null){
		condi = "ND="+nd;
	}else{
		condi = "";
	}
	if(GeneralFunc.isCaRole(userId)){
		condi += ";CO_CODE="+SessionUtils.getAttribute(session, "svCoCode");
	}
%>
  <html>
    <head>
    	<title>个人信息</title>
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
        gp.page.ImageBox;
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
        script.admin.AS_EMP_Edit;
      </applus:include>
      <script type="text/javascript">
      	var currentName = "<%= currentName %>";
		var adminPath = "<%= adminPath %>";
		var currentPath = "<%= curPath %>";
		var pageType = "<%=pageType%>";
      </script>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_EMP" type="edit" ismain="true">
		  </applus:compometa>
		  <applus:tabledata sqlid="admin-editPage.getDataFromAS_EMP" componame="AS_EMP" tablename="AS_EMP" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_EMP_POSITION" componame="AS_EMP" tablename="AS_EMP_POSITION" condition="<%=condi%>" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_EMP_ROLE" componame="AS_EMP" tablename="AS_EMP_ROLE" condition="" issave="true">
			</applus:tabledata>
			
			<applus:compometa name="AS_USER" type="edit" ismain="false">
		  </applus:compometa>
		  <applus:tabledata sqlid="admin-editPage.getDataFromAS_EMP_USER" componame="AS_USER" tablename="AS_USER" condition="" issave="true">
			</applus:tabledata>
			
			<applus:compometa name="AS_USER_GROUP" type="edit" ismain="false">
		  </applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_EMP_GROUP" componame="AS_USER_GROUP" tablename="AS_USER_GROUP" condition="" issave="true">
			</applus:tabledata>
			
			
			<applus:sessiondata componame="AS_EMP" />
					
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
        <call id="fpsdreset" type="command" caption="密码重置" />		
        <call id="fsetpwd" type="command" caption="密码设置"/>
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_EMP" /></span>
      <applus:blankrow height="5" />	
		<table class="clsFreeTable" border ="0">
		<colgroup>
		  <col style="width:40%;" />
		  <col style="width:60%;" />
		</colgroup>
  			<tr class="clsFreeRow">
    			<td>
    				<table class="clsFreeTable" border ="0">
    				<colgroup>
					  <col style="width:40%;" />
					  <col style="width:60%;" />
					</colgroup>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_EMP_CODE"><applus:resource code="EMP_CODE" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="EMP_CODE" componame="AS_EMP" tablename="AS_EMP" fieldname="EMP_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_EMP_NAME"><applus:resource code="EMP_NAME" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="EMP_NAME" componame="AS_EMP" tablename="AS_EMP" fieldname="EMP_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="USER_NAME" componame="AS_USER" tablename="AS_USER" fieldname="USER_NAME" isvisible="false" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_SEX"><applus:resource code="SEX" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaptionAtLeft"><applus:combobox id="SEX" componame="AS_EMP" tablename="AS_EMP" fieldname="SEX" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_TITLE_TECH"><applus:resource code="TITLE_TECH" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="TITLE_TECH" componame="AS_EMP" tablename="AS_EMP" fieldname="TITLE_TECH" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_PHONE"><applus:resource code="PHONE" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="PHONE" componame="AS_EMP" tablename="AS_EMP" fieldname="PHONE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_EMAIL"><applus:resource code="EMAIL" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="EMAIL" componame="AS_EMP" tablename="AS_EMP" fieldname="EMAIL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_IDENTITY_CARD"><applus:resource code="IDENTITY_CARD" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="IDENTITY_CARD" componame="AS_EMP" tablename="AS_EMP" fieldname="IDENTITY_CARD" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_IS_LOGIN"><applus:resource code="IS_LOGIN" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_LOGIN" componame="AS_EMP" tablename="AS_EMP" fieldname="IS_LOGIN" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_RTXUIN"><applus:resource code="RTXUIN" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="RTXUIN" componame="AS_EMP" tablename="AS_EMP" fieldname="RTXUIN" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="usRTXUIN" componame="AS_USER" tablename="AS_USER" fieldname="RTXUIN" isvisible="false" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_USER_ID"><applus:resource code="USER_ID" /><span class="clsPageAsterisk">*</span></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="USER_ID" componame="AS_EMP" tablename="AS_EMP" fieldname="USER_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="usUSER_ID" componame="AS_USER" tablename="AS_USER" fieldname="USER_ID" isvisible="false" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_EMP_INDEX"><applus:resource code="EMP_INDEX" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="EMP_INDEX" componame="AS_EMP" tablename="AS_EMP" fieldname="EMP_INDEX" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    					<tr class="clsFreeRow">
    						<td class="clsKeyCaption" nowrap id="label_AS_EMP_CA_SERIAL"><applus:resource code="CA_SERIAL" /></td>
    						<td class="clsKeyCaptionAtLeft"><applus:textbox id="CA_SERIAL" componame="AS_EMP" tablename="AS_EMP" fieldname="CA_SERIAL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    					</tr>
    				</table>
    			</td>
    			<td align="left">
   					<table class="clsFreeTable" border ="0" >
   					<colgroup>
					  <col style="width:20%;" />
					  <col style="width:60%;" />
					  <col style="width:20%;" />
					</colgroup>
   						<tr class="clsFreeRow">
   							<td class="clsKeyCaption" id="label_AS_EMP_PHOTO"><applus:resource code="PHOTO" /></td>
   							<td class="clsKeyCaptionAtLeft"><applus:imagebox id="PHOTO" componame="AS_EMP" tablename="AS_EMP" fieldname="PHOTO" iszoom="true" zoomtype="scalebyheight" isstretch="true" maxwidth="200" maxheight="200" isreadonly="false" isallowinput="true" isallownull="true" cssclass="clsEditPageEditBox" /></td>
   							<td></td>
   						</tr>
   					</table>
    			</td>
    		</tr>
			</table>
			<applus:blankrow height="20"/>
			<applus:tabstrip id="TABGriD_T"   orientation="up" cssclass="clsPageTabstrip1" style="height:50%">    
  			<applus:tab id="ZBSJ" caption="任职情况">				
				<applus:grid id="AS_EMP_POSITION_Grid" tabindex="0" type="DataGrid" componame="AS_EMP" tablename="AS_EMP_POSITION" cssclass="clsListPageGrid">
						<applus:meta>
							<fields>
								<field name="CO_CODE" caption="<applus:resource code="CO_CODE" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_COMPANY" condition="<%=condi %>"/>
								<field name="CO_NAME" caption="<applus:resource code="CO_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>	
								<field name="ORG_CODE" caption="<applus:resource code="ORG_CODE" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_ORG" condition="<%=condi %>"/>		
							  <field name="ORG_NAME" caption="<applus:resource code="ORG_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />		
							  <field name="POSI_CODE" caption="<applus:resource code="POSI_CODE" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromV_AS_ORG_POSITION" condition="<%=condi %>"/>		
							  <field name="POSI_NAME" caption="<applus:resource code="POSI_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />									
							  <field name="ND" caption="<applus:resource code="ND" />" editboxtype="TextBox" width="100" isvisible="false" isallowinput="true" isreadonly="false" defValue="<%=nd%>"/>									
							</fields>
						</applus:meta>
      			</applus:grid>
      	 	</applus:tab>
      	 	<%--
   			 <applus:tab id="ZBSJ_2" caption="人员角色" style="display:none">
					<applus:grid id="AS_EMP_ROLE_Grid" tabindex="1" type="DataGrid" componame="AS_EMP" tablename="AS_EMP_ROLE" cssclass="clsListPageGrid" isreadonly="false">
						<applus:meta>
							<fields>
								<field name="ROLE_ID" caption="<applus:resource code="ORD_INDEX" />" editboxtype="ForeignBox" width="150" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_ROLE" condition="<%=cond%>"/>
								<field name="ROLE_NAME" caption="<applus:resource code="ROLE_NAME" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="true" isreadonly="false" />
							</fields>
						</applus:meta>
      			</applus:grid>
   			</applus:tab>--%>
   			<applus:tab id="ZBSJ_3" caption="用户组">
					<applus:grid id="AS_USER_GROUP_Grid" tabindex="2" type="DataGrid" componame="AS_USER_GROUP" tablename="AS_USER_GROUP" cssclass="clsListPageGrid" isreadonly="false">
						<applus:meta>
							<fields>
								<field name="USER_ID" caption="用户代码" editboxtype="TextBox" width="100" isvisible="false" isallowinput="true" isreadonly="false"/>
								<field name="GROUP_ID" caption="用户组代码" editboxtype="ForeignBox" width="150" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_GROUP" condition=""/>
								<field name="GROUP_NAME" caption="<applus:resource code="GROUP_NAME" />" editboxtype="TextBox" width="150" isvisible="true" isallowinput="true" isreadonly="false" />
							</fields>
						</applus:meta>
      		</applus:grid>
   			</applus:tab>			
			</applus:tabstrip>
      		   			 		      					
			<applus:endpage />	
		</body>
  </html>

<%@ page import="com.anyi.gp.pub.*" language="java" contentType="text/html; charset=GBK" %>
<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String parentCode = request.getParameter("parentCode");
	String adminPath = request.getParameter("path");
	String curPath = request.getParameter("currentPath"); 
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

        script.admin.AS_ORG_Edit;
      </applus:include>
      <script type="text/javascript">
      	var vsParent = "<%= parentCode %>";
      	var vsParentCode = vsParent.split(",")[0];
      	var vsParentName = vsParent.split(",")[1];
		var adminPath = "<%= adminPath %>";
		var curPath = "<%= curPath %>";
      </script>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_ORG" type="edit" ismain="true">
			</applus:compometa>
				<applus:tabledata sqlid="admin-editPage.getDataFromAS_ORG" tablename="AS_ORG" condition="<%=cond%>" issave="true">
				</applus:tabledata>				
				<applus:tabledata sqlid="admin-editPage.getDataFromAS_ORG_POSITION" tablename="AS_ORG_POSITION" condition="<%=cond%>" issave="true">
				</applus:tabledata>
			
			
			<applus:sessiondata componame="AS_ORG" />
					
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
      <span class="clsListPageTitle"><applus:resource code="AS_ORG" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable" border ="0">
		<colgroup>
		  <col style="width:20%;" />
		  <col style="width:30%;" />
		  <col style="width:20%;" />
		  <col style="width:30%;" />
		</colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_CO_CODE"><applus:resource code="CO_CODE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="CO_CODE" componame="AS_ORG" tablename="AS_ORG" fieldname="CO_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_COMPANY" condition="<%=cond%>"/></td>
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_CO_NAME"><applus:resource code="CO_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CO_NAME" componame="AS_ORG" tablename="AS_ORG" fieldname="CO_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_ORG_CODE"><applus:resource code="ORG_CODE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ORG_CODE" isfromdb="true" componame="AS_ORG" tablename="AS_ORG" fieldname="ORG_CODE" cssclass="clsListPageEditBox"/></td>
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_ORG_NAME"><applus:resource code="ORG_NAME" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ORG_NAME" componame="AS_ORG" tablename="AS_ORG" fieldname="ORG_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_NO_AS_OPT_RULE"><applus:resource code="AS_OPT_RULE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="AS_OPT_RULE" componame="AS_ORG" tablename="AS_ORG" fieldname="AS_OPT_RULE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_IS_LOWEST"><applus:resource code="IS_LOWEST" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_LOWEST" componame="AS_ORG" tablename="AS_ORG" fieldname="IS_LOWEST" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>				
  			</tr>
  			<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_NO_PARENT_ORG_CODE"><applus:resource code="PARENT_ORG_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="PARENT_ORG_CODE" componame="AS_ORG" tablename="AS_ORG" fieldname="PARENT_ORG_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromAS_ORG" condition="<%=cond%>"/></td>
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_ND"><applus:resource code="ND" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ND" componame="AS_ORG" tablename="AS_ORG" fieldname="ND" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>				
  			</tr>
  			<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_PARENT_ORG_NAME"><applus:resource code="PARENT_ORG_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PARENT_ORG_NAME" componame="AS_ORG" tablename="AS_ORG" fieldname="PARENT_ORG_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_ORG_TYPE_CODE"><applus:resource code="ORG_TYPE_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="ORG_TYPE_CODE" componame="AS_ORG" tablename="AS_ORG" fieldname="ORG_TYPE_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>				
  			</tr>
  			<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_NO_QUIC_CODE"><applus:resource code="QUIC_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="QUIC_CODE" componame="AS_ORG" tablename="AS_ORG" fieldname="QUIC_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_TELE"><applus:resource code="TELE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="TELE" componame="AS_ORG" tablename="AS_ORG" fieldname="TELE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>				
  			</tr>
  			<tr>	
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_NO_PRIN_CODE"><applus:resource code="PRIN_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PRIN_CODE" componame="AS_ORG" tablename="AS_ORG" fieldname="PRIN_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_AS_ORG_LINKMAN"><applus:resource code="LINKMAN" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="LINKMAN" componame="AS_ORG" tablename="AS_ORG" fieldname="LINKMAN" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>				
  			</tr>
			</table>
			<applus:blankrow height="20"/>
			<applus:tabstrip id="TABGriD_T"   orientation="up" cssclass="clsPageTabstrip1" style="height:50%">    
  		<applus:tab id="ZBSJ" caption="内部机构职位">				
				<applus:grid id="AS_ORG_Grid" tabindex="0" type="DataGrid" componame="AS_ORG" tablename="AS_ORG_POSITION" cssclass="clsListPageGrid" pagesize="10">

						<applus:meta>
							<fields>
								<field name="POSI_CODE" caption="<applus:resource code="POSI_CODE" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_POSITION" condition=""/>
								<field name="POSI_NAME" caption="<applus:resource code="POSI_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false"/>	
								<field name="LEADER_POSI_NAME" caption="<applus:resource code="LEADER_POSI_NAME" />" editboxtype="ForeignBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromV_AS_ORG_POSITION" condition="<%=cond%>"/>		
							  <field name="LEADER_ORG_NAME" caption="<applus:resource code="LEADER_ORG_NAME" />" editboxtype="TextBox" width="100" isvisible="true" isallowinput="true" isreadonly="false" />											
							</fields>
						</applus:meta>
      		</applus:grid>
      	 </applus:tab>		
			</applus:tabstrip>
      		   			 		      					
			<applus:endpage />	
		</body>
  </html>

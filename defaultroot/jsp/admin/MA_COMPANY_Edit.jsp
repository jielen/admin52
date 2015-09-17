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
        gp.default.Btn_Save;
        gp.default.Btn_Delete;
        gp.default.Btn_New;
        script.admin.MA_COMPANY_Edit;
      </applus:include>
      <script type="text/javascript">
      	var vsParent = "<%= parentCode %>";
      	var vsParentCode = vsParent.split(",")[0];
      	var vsParentName = vsParent.split(",")[1];
      	//alert(vsParentName);
		var adminPath = "<%= adminPath %>";
		var curPath = "<%= curPath %>";
      </script>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="MA_COMPANY" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromMA_COMPANY" tablename="MA_COMPANY" condition="<%=cond%>" issave="true">
			</applus:tabledata>
			<applus:sessiondata componame="MA_COMPANY" />
					
			<applus:init>
				setPageInit();
				
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />
        	<call id="fedit" type="command" caption="修改" accesskey="E" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle">单位</span>
      <applus:blankrow height="5" />	
		<table class="clsFreeTable" border ="0">
		<colgroup>
		  <col style="width:15%;" />
		  <col style="width:10%;" />
		  <col style="width:15%;" />
		  <col style="width:20%;" />
		  <col style="width:15%;" />
		  <col style="width:25%;" />
		</colgroup>
  			<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CO_CODE"><applus:resource code="CO_CODE" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CO_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CO_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CO_NAME"><applus:resource code="CO_NAME" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CO_NAME" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CO_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CO_FULLNA"><applus:resource code="CO_FULLNA" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CO_FULLNA" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CO_FULLNA" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_AS_OPT_RULE"><applus:resource code="AS_OPT_RULE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="AS_OPT_RULE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="AS_OPT_RULE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_IS_LOWEST"><applus:resource code="IS_LOWEST" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_LOWEST" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="IS_LOWEST" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_QUIC_CODE"><applus:resource code="QUIC_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="QUIC_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="QUIC_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_BANK_ACC"><applus:resource code="BANK_ACC" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="BANK_ACC" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="BANK_ACC" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_SHOP_CARD_NO"><applus:resource code="SHOP_CARD_NO" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="SHOP_CARD_NO" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="SHOP_CARD_NO" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CORP_REPR"><applus:resource code="CORP_REPR" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CORP_REPR" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CORP_REPR" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_TRADE_NAME"><applus:resource code="TRADE_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="TRADE_NAME" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="TRADE_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_TRADE_NAME"><applus:resource code="PARENT_CO_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft">
    				<applus:foreignbox id="PARENT_CO_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="PARENT_CO_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromMA_COMPANY" condition="<%=cond%>" isboxconddisabled="true"/>
    			</td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_TRADE_NAME"><applus:resource code="PARENT_CO_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PARENT_CO_NAME" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="PARENT_CO_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_COUNTRY"><applus:resource code="COUNTRY" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="COUNTRY" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="COUNTRY" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_PROVINCE"><applus:resource code="PROVINCE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="PROVINCE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="PROVINCE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CITY"><applus:resource code="CITY" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CITY" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CITY" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_ADDRESS"><applus:resource code="ADDRESS" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ADDRESS" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="ADDRESS" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_COMM_ADDR"><applus:resource code="COMM_ADDR" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="COMM_ADDR" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="COMM_ADDR" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_POST_CODE"><applus:resource code="POST_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="POST_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="POST_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_REAL_CO_CODE"><applus:resource code="REAL_CO_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="REAL_CO_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="REAL_CO_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromMA_COMPANY" condition="<%=cond%>"/></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_FI_LEADER"><applus:resource code="FI_LEADER" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FI_LEADER" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="FI_LEADER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_ND"><applus:resource code="ND" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ND" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="ND" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CO_TYPE_CODE"><applus:resource code="CO_TYPE_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="CO_TYPE_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CO_TYPE_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_F_ORG_CODE"><applus:resource code="F_ORG_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="F_ORG_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="F_ORG_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromV_MA_DEPT" condition="<%=cond%>" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_F_ORG_NAME"><applus:resource code="F_ORG_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="F_ORG_NAME" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="F_ORG_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_GB_CODE"><applus:resource code="GB_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="GB_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="GB_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_DIRECTOR_CODE"><applus:resource code="DIRECTOR_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="DIRECTOR_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="DIRECTOR_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromMA_COMPANY" condition="<%=cond%>"/></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_DIRECTOR_NAME"><applus:resource code="DIRECTOR_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="DIRECTOR_NAME" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="DIRECTOR_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_IS_SELF"><applus:resource code="IS_SELF" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_SELF" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="IS_SELF" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_F_CO_CODE"><applus:resource code="F_CO_CODE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="F_CO_CODE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="F_CO_CODE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" sqlid="admin-selectPage.getDataFromMA_COMPANY" condition="<%=cond%>" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_F_CO_NAME"><applus:resource code="F_CO_NAME" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="F_CO_NAME" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="F_CO_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_LINK_MAN"><applus:resource code="LINK_MAN" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="LINK_MAN" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="LINK_MAN" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CO_CLERK"><applus:resource code="CO_CLERK" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CO_CLERK" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CO_CLERK" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CO_LEADER"><applus:resource code="CO_LEADER" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CO_LEADER" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CO_LEADER" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_URL"><applus:resource code="URL" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="URL" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="URL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_LOCA_TELE"><applus:resource code="LOCA_TELE" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="LOCA_TELE" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="LOCA_TELE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_IS_USED"><applus:resource code="IS_USED" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="IS_USED" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="IS_USED" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
    		
    		<tr class="clsFreeRow">
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_FINA_LEVEL"><applus:resource code="FINA_LEVEL" /><span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="FINA_LEVEL" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="FINA_LEVEL" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_CO_KIND"><applus:resource code="CO_KIND" /></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="CO_KIND" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="CO_KIND" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    			<td class="clsKeyCaption" nowrap id="label_MA_COMPANY_MARK">备注</td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="MARK" componame="MA_COMPANY" tablename="MA_COMPANY" fieldname="MARK" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" /></td>
    		</tr>
			</table>
			<applus:blankrow height="20"/>  		   			 		      					
			<applus:endpage />	
		</body>
  </html>

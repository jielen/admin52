<%@ page language="java" contentType="text/html; charset=GBK" %>

<%@ page buffer="20kb" %>
<%@ taglib uri="/applus" prefix="applus" %>
<%
	String condition = (String)request.getAttribute("tabledatatag_interface_condition");
	String articleId = "";
	if(condition.indexOf(";") != -1){
		if(condition.indexOf("ID=")>=0){
			String vsCond = condition.substring(condition.indexOf("ID="));
			String idCond = vsCond.substring(0,condition.indexOf(";"));
			articleId = idCond.split("=")[1];
		}
	}else{
		if(condition.indexOf("ID=")>=0){
			articleId = condition.split("=")[1];
		}
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
        gp.page.FileBox;
        gp.webpage.script.SearchPage;
        gp.default.Btn_EventAdapter;
        gp.default.Btn_Help;
        script.admin.AS_ARTICLE_Edit;
      </applus:include>
      <script type="text/javascript" src="/fckeditor/fckeditor/fckeditor.js"></script>
      <script type="text/javascript">
      		articleId = '<%=articleId%>';
      		var fckBasePath = '/fckeditor/fckeditor/';
      </script>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_ARTICLE" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_ARTICLE" tablename="AP_ARTICLE" condition="" issave="true">
			</applus:tabledata>		
			<applus:sessiondata componame="AS_ARTICLE" />
					
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fedit" type="command" caption="修改" accesskey="E" />
        <call id="fsave" type="command" caption="保存" accesskey="S" />		
        <call id="fdelete" type="command" caption="删除" accesskey="D" />
        <call id="fpublish" type="command" caption="发布" accesskey="P" isgranttoall="true" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_ARTICLE" /></span>
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
  				<td class="clsKeyCaption" nowrap id="label_AS_ARTICLE_ID">文章编号<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ID" componame="AS_ARTICLE" tablename="AP_ARTICLE" fieldname="ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td class="clsKeyCaption" nowrap id="label_AS_ARTICLE_TITLE">文章标题<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="TITLE" componame="AS_ARTICLE" tablename="AP_ARTICLE" fieldname="TITLE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
  				<td class="clsKeyCaption" nowrap id="label_AS_ARTICLE_CREATOR">作者<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="CREATOR" componame="AS_ARTICLE" tablename="AP_ARTICLE" fieldname="CREATOR" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td class="clsKeyCaption" nowrap id="label_AS_ARTICLE_TYPE">文章类型<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft">
    				<applus:combobox id="TYPE" componame="AS_ARTICLE" tablename="AP_ARTICLE" fieldname="TYPE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true" isfromdb="true" />
    			</td>
    		  
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
  				<td class="clsKeyCaption" nowrap id="label_AS_ARTICLE_PUBTIME">发布时间<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:datebox id="PUBTIME" componame="AS_ARTICLE" tablename="AP_ARTICLE" fieldname="PUBTIME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    		  <td></td>
    			<td></td>
    		</tr>
    		<tr class="clsFreeRow">
    		<td class="clsKeyCaption" nowrap id="label_AS_ARTICLE_ATTATCHID">附件<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft">
    			<applus:filebox id="ATTATCH" componame="AS_ARTICLE" tablename="AP_ARTICLE" fieldname="ATTATCH" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    			<td></td>
    		  <td></td>
    		</tr>
			</table> 	  
		<table class="clsFreeTable" border="0" align="center">
		   <tr><td width="10%"></td> 
			<td width="80%"><script type="text/javascript">createRichEditor(fckBasePath)</script></td>
			<td width="10%"></td>
		   </tr>	 	
		  </table> 	
			<applus:endpage />
		</body>
  </html>




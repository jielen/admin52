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
        gp.default.Btn_New;
        
        script.admin.AS_ARTICLE_List;
      </applus:include>
    </head>

    <body class="clsPageBody">			
			<applus:compometa name="AS_ARTICLE" type="list" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-listPage.getDataFromAS_ARTICLE" tablename="AP_ARTICLE" condition="" pagesize="20">
			</applus:tabledata>
			<applus:sessiondata componame="AS_ARTICLE" />
							
			<applus:init>
				setPageInit();
      </applus:init>
      
      <applus:toolbar id="toolbar">
        <call id="fadd" type="command" caption="新增" accesskey="A" />
        <call id="fhelp" type="command" caption="帮助" accesskey="H" isgranttoall="true" />
      </applus:toolbar>
      <applus:blankrow height="5" />
      <span class="clsListPageTitle"><applus:resource code="AS_GROUP" />文章管理</span>
      <applus:blankrow height="5" />
      <table border="0" class="clsFreeTable">
				<tr class="clsFreeRow">
					<td nowrap align="right">
            <applus:search id="AS_ARTICLE_search" tablename="AP_ARTICLE" function="getlistpagedata" groupid="voucher_search" pattern="" tabindex="1" style="position:relative;" />
          </td>
          <td nowrap width="1%"></td>
				</tr>
		  </table>
		  <applus:blankrow height="5" />
			<applus:grid id="AS_ARTICLE_Grid" type="Grid" componame="AS_ARTICLE" tablename="AP_ARTICLE" pagesize="20" cssclass="clsListPageGrid">
				<applus:meta>
					<fields>
						<field name="ID" caption="文章编号" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="TITLE" caption="文章标题" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="CREATOR" caption="作者" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PUBTIME" caption="发布时间" editboxtype="DateBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="TYPE" caption="类型" editboxtype="TextBox" width="80" isvisible="true" isallowinput="false" isreadonly="true" />
						<field name="PORTLETNAME" caption="PORTLET" editboxtype="TextBox" width="80" isvisible="false" isallowinput="false" isreadonly="true" />						
					</fields>
				</applus:meta>
      </applus:grid>
      <applus:endpage />	
		</body>
  </html>

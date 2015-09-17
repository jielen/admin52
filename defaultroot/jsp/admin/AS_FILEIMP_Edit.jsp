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

        script.admin.AS_FILEIMP_Edit;
      </applus:include>
    </head>
    <body class="clsPageBody">
    	
			<applus:compometa name="AS_FILEIMP" type="edit" ismain="true">
			</applus:compometa>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_FILEIMP" tablename="AS_FILEIMP_STYLE" condition="" issave="true">
			</applus:tabledata>
			<applus:tabledata sqlid="admin-editPage.getDataFromAS_FILEIMP_FIELD" componame="AS_FILEIMP" tablename="AS_FILEIMP_FIELD" condition="" issave="true">
			</applus:tabledata>
			
			<applus:sessiondata componame="AS_FILEIMP" />
					
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
      <span class="clsListPageTitle"><applus:resource code="AS_FILEIMP" /></span>
      <applus:blankrow height="5" />	
			<table class="clsFreeTable">
				<colgroup>
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:20%;" />
           <col style="width:10%;" />
        </colgroup>
  			<tr class="clsFreeRow">
  				<td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIMP_ID">导入格式ID<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FIMP_ID" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="FIMP_ID" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
          <td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIMP_ID">更新/插入<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:combobox id="UPDATE_INSERT" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="UPDATE_INSERT" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>  		
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
  				<td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIMP_ID">导入格式名称<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FIMP_NAME" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="FIMP_NAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
          <td class="clsKeyCaption nowrap id="label_AS_FILEIMP_SEPERATOR">分隔符<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="SEPERATOR" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="SEPERATOR" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>  		
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
  				<td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIMP_ID">导入数据表<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:foreignbox id="FIMP_TABLE" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="FIMP_TABLE" cssclass="clsEditPageEditBox" isvisible="true" isallowinput="true" isreadonly="false" sqlid="admin-selectPage.getDataFromAS_TABLE" condition=""/></td>
          <td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIMP_ID">文件导入完成后执行的Java类<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FILEIMP_CLASSNAME" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="FILEIMP_CLASSNAME" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>  		
    		  <td></td>
    		</tr>
    		<tr class="clsFreeRow">
  				<td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIMP_ID">导入开始行<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FILE_STARTLINE" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="FILE_STARTLINE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
          <td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIMP_ID">导入结束行<span class="clsPageAsterisk"></span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="ENDLINE" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="ENDLINE" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>  		
    		  <td></td>
    		</tr>
    		 <tr class="clsFreeRow">
  				<td class="clsKeyCaption nowrap id="label_AS_FILEIMP_FIELDNUM">导入文件字段列数<span class="clsPageAsterisk">*</span></td>
    			<td class="clsKeyCaptionAtLeft"><applus:textbox id="FIELDNUM" componame="AS_FILEIMP" tablename="AS_FILEIMP_STYLE" fieldname="FIELDNUM" isreadonly="false" isallowinput="true" cssclass="clsEditPageEditBox" isvisible="true"/></td>
    		  <td></td>
    		  <td></td>
    		  <td></td>
    		</tr>
			</table>
			<applus:blankrow height="20"/>				
				<applus:grid id="AS_FILEIMP_Grid" tabindex="0" type="DataGrid" componame="AS_FILEIMP" tablename="AS_FILEIMP_FIELD" cssclass="clsListPageGrid"  isappendbutton= "false" isinsertbutton= "false" isdeletebutton= "false">
						<applus:meta>
							<fields>
								<field name="FIELD" caption="字段标识" editboxtype="TextBox" width="120" isvisible="true" isallowinput="false" isreadonly="true"/>
	              <field name="FIELDNAME" caption="字段名" editboxtype="TextBox" width="120" isvisible="true" isallowinput="false" isreadonly="true"/>
							  <field name="FIELD_FROM" caption="字段值来源" editboxtype="ComboBox" width="120" isvisible="true" isallowinput="true" isreadonly="false"/>
							  <field name="FIMP_ID" caption="文件导入ID" editboxtype="TextBox" width="120" isvisible="true" isallowinput="true" isreadonly="false"/>
							  <field name="IS_IMPORT" caption="是否向此字段导入数据" editboxtype="ComboBox" width="170" isvisible="true" isallowinput="true" isreadonly="false"/>
							  <field name="DEFAULT_VALUE" caption="字段默认值" editboxtype="TextBox" width="120" isvisible="true" isallowinput="true" isreadonly="false"/>
							  <field name="FIELD_FILE_COL" caption="字段在文件中的列号" editboxtype="TextBox" width="120" isvisible="true" isallowinput="true" isreadonly="false"/>
							  <field name="BEGINCOL" caption="开始位" editboxtype="TextBox" width="120" isvisible="true" isallowinput="true" isreadonly="false"/>
							  <field name="ENDCOL" caption="结束位" editboxtype="TextBox" width="120" isvisible="true" isallowinput="true" isreadonly="false"/>						
							</fields>
						</applus:meta>
      		</applus:grid>			 		      					
			<applus:endpage />	
		</body>
  </html>




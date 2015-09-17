<%@ page import="com.anyi.gp.pub.SessionUtils" language="java" contentType="text/html;charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus"%>

<%
	String path = (String)request.getAttribute("svAdminPath");
	String svNd = SessionUtils.getAttribute(session,"svNd");
	String cond = "svNd="+svNd;
	String allCoCode = "\'";
	String lastCoCodes = "\'";
	if (path != null && !path.equals("") && !path.equals("/")) {
		String[] paths = path.split("&");
		if(paths.length > 1) path = "/";
		String allPath = "\'";
		
		for(int i = 0; i < paths.length-1; i++){
			allPath += paths[i].substring(0, paths[i].indexOf("/")) + "\', \'";
			String[] coCodes = paths[i].split("/");
			for(int j = 0; j < coCodes.length-1; j++){
				if(!"".equals(coCodes[j])){
					allCoCode += coCodes[j] + "\', \'";
				}
			}
			lastCoCodes += coCodes[coCodes.length-1] + "\', \'";
		}
		allPath += paths[paths.length-1].substring(0, paths[paths.length-1].indexOf("/")) + "\'";
		String[] coCodes = paths[paths.length-1].split("/");
		for(int j = 0; j < coCodes.length-1; j++){
			if(!"".equals(coCodes[j])){
				allCoCode += coCodes[j] + "\', \'";
			}
		}
		lastCoCodes += coCodes[coCodes.length-1];
		cond += ";path=" + allPath;
	} else if (path == null || path.trim().length() == 0) {
		cond += ";cond=1";
	}
	allCoCode += "\'";
	lastCoCodes += "\'";
	if("\'\'".equals(allCoCode)) allCoCode = "";
	if("\'\'".equals(lastCoCodes)) lastCoCodes = "";
	//System.out.println("allCoCode == " + allCoCode);
%>
<html>
	<head>
		<applus:include language="javascript">
			gp.page.TreeView2;
			gp.page.Tipbar;
			gp.page.Toolbar;
			script.Base64;
			script.admin.AS_ORGTREE_Edit;
		</applus:include>
		<script language="javascript">
			var path = "<%=path%>";
			var adminPath = path;
			var userAllCoCode = "<%=allCoCode%>";
			var lastCoCodes = "<%=lastCoCodes%>";
		</script>
	</head>

	<body class="clsPageBody" oncontextmenu="return false;">
		<applus:compometa type="edit" name="AS_ORGANIZATION_TREE" ismain="true">
		</applus:compometa>
		<applus:tabledata
			sqlid="admin-editPage.getDataFromAS_ORGANIZATION_TREE"
			tablename="V_AS_ORGANIZATION_TREE" condition="<%=cond%>" pagesize="-1"
			issave="false" isdigest="false" istablemeta="false">
		</applus:tabledata>
		<applus:sessiondata componame="AS_ORGANIZATION_TREE" />

		<applus:init>
		  	setPageInit();
		</applus:init>

		<table border="0" cellspacing="0" cellpadding="0"
			style="width:100%;height:100%;font-size:9pt;">
			<tr>
				<td width="100%" nowrap>
					&nbsp;
				</td>
			</tr>
			<tr>
				<td width="100%" nowrap>
					<table border="0" width="100%">
						<tr>
							<td width="1%">
								&nbsp;
							</td>
							<td width="98%">
								<input type="text" id="searchInput"
									style="width:100%;border:1px solid gray;font-size:9pt;background-color:transparent;"
									onkeyup="if(event.keyCode==13){orgtree_search();}"
									onchange="orgtree_searchInputOnChange();">
							</td>
							<td>
								<input type="button" id="searchbtn" value=" 搜索 "
									class="clsPageNormButton" onclick="orgtree_search();"
									title="按此键执行搜索,反复按此键反复向前搜索.">
							</td>
							<td>
								<img id="clearSearchResultImg"
									src="/style/img/gp5/ico/leafdark_16x16.gif" width="16px"
									height="16px"
									onclick="orgtree_clearSearchResult();alert('已清理上次搜索的结果.');"
									onmouseover="this.src='/style/img/gp5/ico/leaflight_16x16.gif'"
									onmouseout="this.src='/style/img/gp5/ico/leafdark_16x16.gif'"
									title="清除上次搜索的结果,以便下次重新搜索.">
							</td>
							<td width="1%">
								&nbsp;
							</td>
						</tr>
					</table>

				</td>
			</tr>
			<tr style="height:100%">
				<td width="100%">
					<applus:treeview id="AS_ORGANIZATION_TREE_Tree" idsuffix=""
						tablename="V_AS_ORGANIZATION_TREE" isfromdb="false" maketype="1"
						pagesize="100" root="组织机构" roottip="组织机构" rootselimg=""
						rootnormalimg="" codefield="CODE" namefield="NAME"
						pcodefield="P_CODE" tipfield="" selimgfield="NORM_IMG"
						normalimgfield="NORM_IMG" isuseleafimg="false"
						iscodeandname="false" isexistcheck="false" isvisible="true"
						isrelachildren="false" isrelaparent="false" isupdatedata="true"
						iscollapseondblclick="false" initlevel="1" tabindex="0"
						cssclass=""
						style="position:relative;left:;top:;width:100%;height:100%;border-color:#dddddd;"
						oninit="">
					</applus:treeview>
				</td>
			</tr>
		</table>

		<applus:endpage />
		<div id="clickMenu" class="leftKeyMenu" onMouseover="highLight()"
			onMouseout="lowLight()">
			<div id="clickOpenEdit" class="menuitems" onclick="gotoOpenEdit()">
				&nbsp;&nbsp;编辑
			</div>
			<hr>
			<div id="clickNewCo" class="menuitems" onclick="gotoNewCo()">
				&nbsp;&nbsp;建单位
			</div>
			<div id="clickNewOrg" class="menuitems" onclick="gotoNewOrg()">
				&nbsp;&nbsp;建机构
			</div>
			<div id="clickNewPosi" class="menuitems" onclick="gotoNewPosi()">
				&nbsp;&nbsp;建职位
			</div>
			<div id="clickNewEmp" class="menuitems" onclick="gotoNewEmp()">
				&nbsp;&nbsp;建人员
			</div>
			<div id="clickNewAdmin" class="menuitems" onclick="gotoNewAdmin()">
				&nbsp;&nbsp;设置管理员
			</div>
		</div>
	</body>
</html>
<script language="javascript">
	if (document.all && window.print) {
		//document.oncontextmenu = hideMenu;
  	document.body.onclick = hideMenu;  	
  }
</script>

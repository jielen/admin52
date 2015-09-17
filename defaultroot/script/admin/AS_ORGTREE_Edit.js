
//----------------------------------------------------------------------
var RELA_PAGE_CONTENT_CO = "company";
var RELA_PAGE_CONTENT_ORG = "organization";
var RELA_PAGE_CONTENT_POSI = "position";
var RELA_PAGE_CONTENT_EMP = "employee";
var RELA_PAGE_CONTENT_ADMIN = "admin";
var NORM_IMG_CO = PageX.localResPath + "/style/img/gp5/ico/company.gif";
var NORM_IMG_ORG = PageX.localResPath + "/style/img/gp5/ico/department.gif";
var NORM_IMG_POSI = PageX.localResPath + "/style/img/gp5/ico/position.gif";
var NORM_IMG_EMP = PageX.localResPath + "/style/img/gp5/ico/employee.gif";
var FREE_POSI_CODE = "free_position_group_20060626";
var FREE_EMP_CODE = "free_employee_group_20060626";
//----------------------------------------------------------------------
var _sRelaNodeCode = "";
var _sRelaPageContent = RELA_PAGE_CONTENT_CO;
var _oSearchResult = new orgtree_SearchResult();
var _isAppendedChildrenOnBeforeCollapse = false;
//----------------------------------------------------------------------

//----------------------------------------------------------------------
var voToolbar = null;
var vsCurrentCode = null;
var vsCurrentName = null;
var currentPath = null;
var currentPathName = null;
var optHasOrg = null;//系统级选项设置-是否需要内部机构
//---------------------------------------------------------------------
function setPageInit() {
	voToolbar = PageX.getCtrlObj("toolbar");
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	voTree.addListener(new Listener(voTree.OnNodeClick, orgtree_EventAnswer_TreeView_OnNodeClick, this));
	voTree.addListener(new Listener(voTree.OnBeforeNodeCollapse, orgtree_EventAnswer_TreeView_OnBeforeNodeCollapse, this));
	voTree.addListener(new Listener(voTree.OnAfterNodeCollapse, orgtree_EventAnswer_TreeView_OnAfterNodeCollapse, this));
	orgtree_insertMoreNodesForChildNodes(voTree.getRootCode());
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//以下为分次从数据库中提取结点;以 collapse 为触发点;
//----------------------------------------------------------------------
//对于子结点全部加上 more node,假定它们都有子结点;
function orgtree_insertMoreNodesForChildNodes(sNodeCode) {
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	var vasChildCode = voTree.getChildCodes(sNodeCode);
	if (vasChildCode != null) {
		for (var i = 0, len = vasChildCode.length; i < len; i++) {
			var voNode = voTree.getNode(vasChildCode[i]);
			if (voTree.isCollapse(voNode) || voTree.hasChildNodesForAppear(voNode) || voTree.hasChildNodes("More...")) {
				continue;
			} else {
				orgtree_insertMoreNode(voTree.getNode(vasChildCode[i], false));
			}
		}
	}
}
//----------------------------------------------------------------------
function orgtree_insertMoreNode(oPNode) {
	if (oPNode == null) {
		return;
	}
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	var vsMoreHtm = "<table>" + voTree.makeMoreNode(voTree.getNodeCode(oPNode)) + "</table>";
	var voMore = voTree.makeNewObjs(vsMoreHtm)[0].firstChild;
	voTree.insertChildToTree(oPNode, voMore);
}
//----------------------------------------------------------------------
function orgtree_EventAnswer_TreeView_OnBeforeNodeCollapse(oSender, sCode) {
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	var voFirst = voTree.getFirstChildForAppear(voTree.getNode(sCode));
	if (!voTree.isMoreNode(voFirst)) {
		return;
	}
	//debugger;
	var voRM = PageX.getRowManager();
	vsRMKey = voRM.updateAction(false, false, false);
	var names = new Array();
	var values = new Array();
	names[0] = "svNd";
	values[0] = DataTools.getSV("svNd");
	names[1] = "sCode";
	values[1] = sCode;
	if (path != null && path != "" && path != "null" && path != "/" && sCode != "free_position_group_20060626") {
		var subPath = path.substring(path.indexOf("/") + 1, path.length);
		if (sCode + "/" != path) {
			names[names.length] = "path";
			values[values.length] = subPath.substring(0, subPath.indexOf("/"));
		}
		path = subPath;
		//alert(path);
	}
	var userId = DataTools.getSV("svUserID");
	
	if (sCode == "free_position_group_20060626" && userId != "sa" && isCampanyAdmin(userId) == '0') {
		names[names.length] = "userId";
		values[values.length] = userId;
	} else {
		if (sCode.indexOf("ORG_") > 0 && userId != "sa" && isCampanyAdmin(userId) == '0') {
			names[names.length] = "userCode";
			values[values.length] = userId;
		}
	}
	if("" != userAllCoCode && userAllCoCode.indexOf("\'" + sCode + "\'")!=-1){
		names[names.length] = "cocodes";
		values[values.length] = userAllCoCode + "," + lastCoCodes;
		names[names.length] = "isinrights";
		values[values.length] = "no";
	}
	names[names.length] = "sqlid";
	values[values.length] = "admin-ruleData.AS_ORGANIZATION_TREE";
	var voRowSet = doRequest("getTreeRowSet", "all", names, values, "");
	if (voRowSet != null) {
		var voXml = DataTools.getDataXML(voTree.getTableName());
		var voDataRowSet = voXml.selectSingleNode("//rowset");
		while (voRowSet.childNodes.length > 0) {
			var voRow = voRowSet.childNodes[0];
			voDataRowSet.appendChild(voRow);
			_isAppendedChildrenOnBeforeCollapse = true;
		}
	}
	voRM.clearAction(vsRMKey);
}

function isCampanyAdmin(userId){
	var result = PageX.getRuleDeltaXML("admin-ruleData.SELECT_AS_ADMIN_USERID", ["user_id"], [userId]);
	return result.firstChild.firstChild.firstChild.getAttribute("value");
}

//----------------------------------------------------------------------
function orgtree_EventAnswer_TreeView_OnAfterNodeCollapse(oSender, sCode) {
	if (!_isAppendedChildrenOnBeforeCollapse) {
		return;
	}
	orgtree_insertMoreNodesForChildNodes(sCode);
}
//----------------------------------------------------------------------
//分次从数据库中提取结点;结束;
//----------------------------------------------------------------------

//----------------------------------------------------------------------
function orgtree_SearchResult() {
	this.aoRow = new Array();
	this.iCursor = 0;
	this.sSearchKey = "";
}
//----------------------------------------------------------------------
function orgtree_search() {
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	if (_oSearchResult.sSearchKey != searchInput.value) {
		orgtree_clearSearchResult();
		_oSearchResult.sSearchKey = searchInput.value;
	}
	if (!PF.isValidArray(_oSearchResult.aoRow)) {
		_oSearchResult.aoRow = new Array();
		_oSearchResult.iCursor = 0;
		var vaoRow = DataTools.getTableData(voTree.getTableName()).selectNodes("rowset/row");
		if (PF.isValidArray(vaoRow)) {
			var vaoName = DataTools.getTableData(voTree.getTableName()).selectNodes("rowset/row/NAME");
			//alert(vaoName);
			for (var i = 0; i < vaoName.length; i++) {
				if (vaoName[i].text.indexOf(searchInput.value) < 0) {
					continue;
				}
				_oSearchResult.aoRow[_oSearchResult.aoRow.length] = vaoRow[i];
			}
		}
		if (!PF.isValidArray(_oSearchResult.aoRow)) {
			alert("\u6ca1\u6709\u53d1\u73b0\u76f8\u5173\u5185\u5bb9,\u8bf7\u60a8\u91cd\u65b0\u8f93\u5165\u67e5\u8be2\u5173\u952e\u5b57,\u518d\u641c.");
			return;
		}
	}
	if (_oSearchResult.iCursor >= _oSearchResult.aoRow.length) {
		if (confirm("\u5df2\u641c\u7d22\u5b8c\u6574\u68f5\u6811,\u662f\u5426\u91cd\u65b0\u4ece\u5934\u641c\u7d22.")) {
			_oSearchResult.iCursor = 0;
		}
	}
	if (_oSearchResult.iCursor >= _oSearchResult.aoRow.length) {
		return;
	}
	var vsPCode = voTree.getRowValue(_oSearchResult.aoRow[_oSearchResult.iCursor], "P_CODE");
	//-------------------------------------------
	//----搜索时展开所有节点------------------------
	if (!PF.isEmpty(vsPCode)) {
		voTree.collapse(vsPCode);
		var out = true;
		while (out) {
			var vsPCode = voTree.getParentCode(vsPCode);
			var parNode = voTree.getNode(vsPCode, false);
			if (voTree.isValidNode(parNode)) {
				if (!voTree.isCollapse(parNode)) {
					voTree.collapse(vsPCode);
				}
			} else {
				break;
			}
		}
	}
	var vsCode = voTree.getRowValue(_oSearchResult.aoRow[_oSearchResult.iCursor], "CODE");
	if (!PF.isEmpty(vsCode)) {
		voTree.setCurNode(voTree.getNode(vsCode, true));
	}
	_oSearchResult.iCursor++;
}
//----------------------------------------------------------------------
function orgtree_searchInputOnChange() {
	orgtree_clearSearchResult();
}
//----------------------------------------------------------------------
function orgtree_clearSearchResult() {
	if (_oSearchResult.aoRow != null) {
		_oSearchResult.aoRow.length = 0;
		_oSearchResult.aoRow = null;
		_oSearchResult.sSearchKey = "";
		_oSearchResult.iCursor = 0;
	}
}
//----------------------------------------------------------------------
// xiexx
function orgtree_EventAnswer_TreeView_OnNodeClick(oSender, sCode, oEvent) {
	setCurrentPath(sCode);
	if (event.button == 1) {
		gotoOpenEdit();
	} else {
		if (event.button == 2) {
			showMenu(oSender, sCode, oEvent);
		}
	}
}
function showMenu(oSender, sCode, oEvent) {
	vsCurrentCode = sCode;
	var viMenuWidth = 120, viMenuHeight = 80;
	var viRightEdge = document.body.clientWidth;
	var viBottomEdge = document.body.clientHeight;
	var viClickX = event.clientX;
	var viClickY = event.clientY;
	var viMenuX, viMenuY;
	if (viClickX >= viMenuWidth) {
		if ((viClickX + viMenuWidth) > viRightEdge) {
			viMenuX = viClickX - viMenuWidth;
		} else {
			viMenuX = viClickX;
		}
	} else {
		viMenuX = viClickX;
	}
	if (viClickY >= viMenuHeight) {
		if ((viClickY + viMenuHeight) > viBottomEdge) {
			viMenuY = viClickY - viMenuHeight;
		} else {
			viMenuY = viClickY;
		}
	} else {
		viMenuY = viClickY;
	}

	// 根据节点位置置灰菜单项
	var vsDisplay = null;
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
  //if (voTree.getCurNode()== null) vsDisplay = "null";
  //var vsCode= voTree.getNodeCode(voTree.getCurNode());
	if (voTree.isRoot(vsCurrentCode)) {
		vsDisplay = "root";
	}
	if (vsCurrentCode == FREE_POSI_CODE) {
		vsDisplay = "free";
	}
	if (vsCurrentCode == FREE_EMP_CODE) {
		vsDisplay = "free";
	}
	var voRow = voTree.getNodeRow(vsCurrentCode);
  //if (voRow== null) vsDisplay = "null";;
  //var vsCode= voTree.getRowValue(voRow, "CODE");
	var vsCoCode = voTree.getRowValue(voRow, "CO_CODE");
	var vsOrgCode = voTree.getRowValue(voRow, "ORG_CODE");
	var vsPosiCode = voTree.getRowValue(voRow, "POSI_CODE");
	var vsEmpCode = voTree.getRowValue(voRow, "EMP_CODE");
	if (!PF.isEmpty(vsEmpCode)) {
		vsDisplay = "emp";
	} else {
		if (!PF.isEmpty(vsPosiCode)) {
			vsDisplay = "posi";
		} else {
			if (!PF.isEmpty(vsOrgCode)) {
				vsDisplay = "org";
			} else {
				if (!PF.isEmpty(vsCoCode)) {
					vsDisplay = "co";
				}
			}
		}
	}
	switch (vsDisplay) {
	  case "root":
		clickOpenEdit.disabled = true;
		clickNewCo.disabled = false;
		clickNewOrg.disabled = true;
		clickNewPosi.disabled = true;
		clickNewEmp.disabled = true;
		clickNewAdmin.disabled = true;
		if (adminPath != null && adminPath != "null" && adminPath != "/") {
			clickNewCo.disabled = true;
		}
		break;
	  case "co":
		clickOpenEdit.disabled = false;
		clickNewCo.disabled = false;
		clickNewOrg.disabled = false;
		clickNewPosi.disabled = false;
		clickNewEmp.disabled = true;
		clickNewAdmin.disabled = false;
		if (adminPath != null && currentPath != null && adminPath.indexOf(currentPath) >= 0 && adminPath.length > currentPath.length) {
			clickOpenEdit.disabled = true;
			clickNewCo.disabled = true;
			clickNewOrg.disabled = true;
			clickNewAdmin.disabled = true;
		}
		break;
	  case "org":
		clickOpenEdit.disabled = false;
		clickNewCo.disabled = true;
		clickNewOrg.disabled = true;
		clickNewPosi.disabled = false;
		clickNewEmp.disabled = true;
		clickNewAdmin.disabled = false;
		if (adminPath != null && currentPath != null && adminPath.indexOf(currentPath) >= 0 && adminPath.length > currentPath.length) {
			clickOpenEdit.disabled = true;
			clickNewPosi.disabled = false;
			clickNewAdmin.disabled = true;
		}
		break;
	  case "posi":
		clickOpenEdit.disabled = false;
		clickNewCo.disabled = true;
		clickNewOrg.disabled = true;
		clickNewPosi.disabled = true;
		clickNewEmp.disabled = false;
		clickNewAdmin.disabled = true;
		if (adminPath != null && currentPath != null && currentPath.indexOf("free") >= 0) {
			clickNewEmp.disabled = true;
		}
		break;
	  case "emp":
		clickOpenEdit.disabled = false;
		clickNewCo.disabled = true;
		clickNewOrg.disabled = true;
		clickNewPosi.disabled = true;
		clickNewEmp.disabled = true;
		clickNewAdmin.disabled = true;
		break;
	  case "free":
		clickOpenEdit.disabled = true;
		clickNewCo.disabled = true;
		clickNewOrg.disabled = true;
		clickNewPosi.disabled = true;
		clickNewEmp.disabled = true;
		clickNewAdmin.disabled = true;
		break;
	  default:
	}
	clickMenu.style.top = viMenuY + document.body.scrollTop;
	clickMenu.style.left = viMenuX + document.body.scrollLeft;
	clickMenu.style.visibility = "visible";
	return false;
}
function hideMenu() {
	if (clickMenu.style.visibility == "visible") {
		clickMenu.style.visibility = "hidden";
	}
	event.returnValue = false;
}
function highLight() {
	if (event.srcElement.className == "menuitems") {
		event.srcElement.style.backgroundColor = "highlight";
		event.srcElement.style.color = "white";
	}
}
function lowLight() {
	if (event.srcElement.className == "menuitems") {
		event.srcElement.style.backgroundColor = "";
		event.srcElement.style.color = "black";
		window.status = "";
	}
}
function gotoOpenEdit() {
	if (clickOpenEdit.disabled == false) {
		orgtree_openEdit();
		hideMenu();
	} else {
		clickMenu.style.visibility = "visible";
	}
}
function gotoNewCo() {
	if (clickNewCo.disabled == false) {
		orgtree_newCo();
		hideMenu();
	} else {
		clickMenu.style.visibility = "visible";
	}
}
function gotoNewOrg() {
	if (clickNewOrg.disabled == false) {
		orgtree_newOrg();
		hideMenu();
	} else {
		clickMenu.style.visibility = "visible";
	}
}
function gotoNewPosi() {
	if (clickNewPosi.disabled == false) {
		orgtree_newPosi();
		hideMenu();
	} else {
		clickMenu.style.visibility = "visible";
	}
}
function gotoNewEmp() {
	if (clickNewEmp.disabled == false) {
		orgtree_newEmp();
		hideMenu();
	} else {
		clickMenu.style.visibility = "visible";
	}
}
function gotoNewAdmin() {
	if (clickNewAdmin.disabled == false) {
		orgtree_newAdmin();
		hideMenu();
	} else {
		clickMenu.style.visibility = "visible";
	}
}

//----------------------------------------------------------------------
function orgtree_openEdit() {
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	if (voTree.getCurNode() == null) {
		return;
	}
	var vsCode = voTree.getNodeCode(voTree.getCurNode());
	if (voTree.isRoot(vsCode)) {
		return;
	}
	if (vsCode == FREE_POSI_CODE) {
		return;
	}
	if (vsCode == FREE_EMP_CODE) {
		return;
	}
	var voRow = voTree.getNodeRow(vsCode);
	if (voRow == null) {
		return;
	}
	var vsCode = voTree.getRowValue(voRow, "CODE");
	var vsCoCode = voTree.getRowValue(voRow, "CO_CODE");
	var vsOrgCode = voTree.getRowValue(voRow, "ORG_CODE");
	var vsPosiCode = voTree.getRowValue(voRow, "POSI_CODE");
	var vsEmpCode = voTree.getRowValue(voRow, "EMP_CODE");
	var vsUrl = "";
	var vsFuncPre = "getpage_";
	var asNames = new Array();
	asNames[0] = "function";
	asNames[1] = "tablename";
	asNames[2] = "condition";
	asNames[3] = "path";
	asNames[4] = "currentPath";
	asNames[5] = "pageType";
	
	var curpath = currentPath.substring(0, currentPath.length-1);
	var parentPath = curpath.substring(0, curpath.lastIndexOf("/")+1);
	
	var curname = currentPathName.substring(0, currentPathName.length-1);
	var parentPathName = curname.substring(0, curname.lastIndexOf("/")+1);
	
	var parcode = parentPath.substring(0, parentPath.length-1);
	var parentcode = parcode.substring(parcode.lastIndexOf("/")+1);
	
	var parname = parentPathName.substring(0, parentPathName.length-1);
	var parentName = parname.substring(parname.lastIndexOf("/")+1);
	var asValues = new Array();
	if (vsEmpCode != "null" && vsEmpCode != "") {
		asValues[0] = "geteditpage";
		asValues[1] = "AS_EMP";
		asValues[2] = "EMP_CODE=" + vsEmpCode;
		asValues[3] = adminPath;
		asValues[4] = currentPath;
		asValues[5] = "edit";
		asNames[6] = "currentPathName";
		asValues[6] = parentPathName;
		vsUrl = PageX.makeUrl(vsFuncPre + "AS_EMP", "AS_EMP", asNames, asValues);
		_sRelaNodeCode = vsCode;
		_sRelaPageContent = RELA_PAGE_CONTENT_EMP;
	} else {
		if (vsPosiCode != "null" && vsPosiCode != "") {
			asValues[0] = "geteditpage";
			asValues[1] = "AS_POSITION";
			asValues[2] = "POSI_CODE=" + vsPosiCode;
			asValues[3] = adminPath;
			asValues[4] = currentPath;
			asValues[5] = "edit";
			vsUrl = PageX.makeUrl(vsFuncPre + "AS_POSITION", "AS_POSITION", asNames, asValues);
			_sRelaNodeCode = vsCode;
			_sRelaPageContent = RELA_PAGE_CONTENT_POSI;
		} else {
			if (vsOrgCode != "null" && vsOrgCode != "") {
				asValues[0] = "geteditpage";
				asValues[1] = "AS_ORG";
				asValues[2] = "CO_CODE=" + vsCoCode + ";ORG_CODE=" + vsOrgCode;
				asValues[3] = adminPath;
				asValues[4] = currentPath;
				asValues[5] = "edit";
				asNames[6] = "parentCode";
				asValues[6] = parentcode + "," + parentName;
				
				vsUrl = PageX.makeUrl(vsFuncPre + "AS_ORG", "AS_ORG", asNames, asValues);
				_sRelaNodeCode = vsCode;
				_sRelaPageContent = RELA_PAGE_CONTENT_ORG;
			} else {
				if (vsCoCode != "null" && vsCoCode != "") {
					asValues[0] = "geteditpage";
					asValues[1] = "MA_COMPANY";
					asValues[2] = "CO_CODE=" + vsCoCode;
					asValues[3] = adminPath;
					asValues[4] = currentPath;
					asValues[5] = "edit";
					asNames[6] = "parentCode";
					asValues[6] = parentcode + "," + parentName;
					vsUrl = PageX.makeUrl(vsFuncPre + "MA_COMPANY", "MA_COMPANY", asNames, asValues);
					_sRelaNodeCode = vsCode;
					_sRelaPageContent = RELA_PAGE_CONTENT_CO;
				}
			}
		}
	}
	orgtree_openUrl(vsUrl);
}
//----------------------------------------------------------------------
function orgtree_newCo() {
	var vsUrl = PageX.makeUrl("getpage_MA_COMPANY", "MA_COMPANY", ["function", "tablename", "condition", "path", "currentPath", "parentCode"], ["geteditpage", "MA_COMPANY", "1=0", adminPath, currentPath, vsCurrentCode+","+vsCurrentName]);
	orgtree_openUrl(vsUrl);
	_sRelaNodeCode = "";
	_sRelaPageContent = RELA_PAGE_CONTENT_CO;
}
//----------------------------------------------------------------------
function orgtree_newOrg() {
	getOptEmpRule();
	if(optHasOrg != "Y"){
		alert("系统级选项设置中设定不需要内部机构，故不能建内部机构！")
		return;
	}else{
		var vsUrl = PageX.makeUrl("getpage_AS_ORG", "AS_ORG", ["function", "tablename", "condition", "path", "currentPath", "parentCode"], ["geteditpage", "AS_ORG", "1=0", adminPath, currentPath, vsCurrentCode+","+vsCurrentName]);
		orgtree_openUrl(vsUrl);
		_sRelaNodeCode = "";
		_sRelaPageContent = RELA_PAGE_CONTENT_ORG;
	}
}
//----------------------------------------------------------------------
function orgtree_newPosi() {
	var vsUrl = PageX.makeUrl("getpage_AS_POSITION", "AS_POSITION", ["function", "tablename", "condition", "path", "currentPath", "parentCode"], ["geteditpage", "AS_POSITION", "1=0", adminPath, currentPath, vsCurrentCode+","+vsCurrentName]);
	orgtree_openUrl(vsUrl);
	_sRelaNodeCode = "";
	_sRelaPageContent = RELA_PAGE_CONTENT_POSI;
}
//----------------------------------------------------------------------
function orgtree_newEmp() {
	var vsUrl = PageX.makeUrl("getpage_AS_EMP", "AS_EMP", ["function", "tablename", "condition", "path", "currentPath", "currentPathName"], ["geteditpage", "AS_EMP", "1=0", adminPath, currentPath, currentPathName]);
	orgtree_openUrl(vsUrl);
	_sRelaNodeCode = "";
	_sRelaPageContent = RELA_PAGE_CONTENT_EMP;
}
//----------------------------------------------------------------------
function orgtree_newAdmin() {
	var vsUrl = PageX.makeUrl("getpage_AS_ADMIN", "AS_ADMIN", ["function", "path"], ["geteditpage", currentPath]);
	orgtree_openUrl(vsUrl);
	_sRelaNodeCode = "";
	_sRelaPageContent = RELA_PAGE_CONTENT_ADMIN;
}
//---------------------------系统级选项设置----------------------------------
function getOptEmpRule(){
  	//系统级选项设置-是否需要内部机构（Y-是；N-否）
  	var names = new Array("optIds", "type");
  	var values = new Array("OPT_HAS_ORG", "one");
  	var result = Info.requestData("getOptions", "all", names, values);
  	if(result.childNodes.length != 0){
  		optHasOrg =  result.childNodes[0].getAttribute("OPT_VAL");
  	}
}
//----------------------------------------------------------------------
function orgtree_openUrl(sUrl) {
	window.parent.clientframe.document.write("\u6b63\u5728\u88c5\u8f7d\u9875\u9762\uff0c\u656c\u8bf7\u7a0d\u5019......");
	window.parent.clientframe.location.href = sUrl;
	orgtree_addEditPageListener();
}
//----------------------------------------------------------------------
function orgtree_addEditPageListener() {
	if (window.parent.clientframe.toolbar == null || window.parent.clientframe.PageX == null || !window.parent.clientframe.PageX.tHasInit) {
		setTimeout("orgtree_addEditPageListener()", 500);
		return;
	}
	var voEditPageToolbar = window.parent.clientframe.toolbar.oOwner;
	voEditPageToolbar.addListener(new Listener(voEditPageToolbar.OnCallClick, orgtree_EventAnswer_EditPageToolbar_OnCallClick, this));
}
//----------------------------------------------------------------------
function orgtree_EventAnswer_EditPageToolbar_OnCallClick(oSender, oCall, oEvent) {
	switch (oCall.id) {
	  	case "fsave":
			orgtree_doRelaNode();
			break;
	  	case "fdelete":
			orgtree_deleteRelaNode();
			break;
	  	case "fadd":
			orgtree_addEditPageListener();
			break;
	  	default:
	}
}
//----------------------------------------------------------------------
function orgtree_deleteRelaNode() {
	if (!window.parent.clientframe._global_tIsDeleted) {
		return;
	}
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	voTree.deleteNode(_sRelaNodeCode);
}
//----------------------------------------------------------------------
//-------------modified by hmgkevin 08-04-11 ---------------------------
//----------------------------------------------------------------------
function orgtree_doRelaNode() {
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	var vaoNodeData = orgtree_getEditNodeData();
	if (vaoNodeData == null || vaoNodeData.length == 0) {
		return;
	}
	if(!window.parent.clientframe._global_tIsSaved){
		return;
	}else{
		if (!window.parent.clientframe._global_tIsNew) {//编辑页面
			voTree.setNodeValue(_sRelaNodeCode, "CO_CODE", vaoNodeData[0].sCoCode);
			voTree.setNodeName(_sRelaNodeCode, vaoNodeData[0].sCaption);
			if (_sRelaPageContent == RELA_PAGE_CONTENT_CO){
				return;
			}
		}
	}
	for (var i = 0; i < vaoNodeData.length; i++) {
		/*********图片显示处理**********/
		var vsLeafImg = voTree.IMG_LEAF_NORMAL;
		if (_sRelaPageContent == RELA_PAGE_CONTENT_EMP) {
			vsLeafImg = NORM_IMG_EMP;
		} else {
			if (_sRelaPageContent == RELA_PAGE_CONTENT_POSI) {
				vsLeafImg = NORM_IMG_POSI;
			} else {
				if (_sRelaPageContent == RELA_PAGE_CONTENT_ORG) {
					if (i == 0) {
						vsLeafImg = NORM_IMG_ORG;//一级(父节点)，放ORG图片
					} else {
						vsLeafImg = NORM_IMG_POSI;//子节点，放POSITION图片
					}
				} else {
					if (_sRelaPageContent == RELA_PAGE_CONTENT_CO) {
						vsLeafImg = NORM_IMG_CO;
					}
				}
			}
		}
		/*********图片显示处理结束**********/
		
		if (PF.isEmpty(vaoNodeData[i].sPCoCode)) {
			vaoNodeData[i].sPCoCode = orgtree_getPCoCodeWhereEmpty(vaoNodeData[i].sCoCode);
		}
		var vasPCode = orgtree_makeNodePCode(vaoNodeData[i]);
		for (var j = 0; j < vasPCode.length; j++) {
			if (PF.isEmpty(vasPCode[j])) {
				continue;
			}
			if (voTree.isExistNode(vasPCode[j])) {
				continue;
			}
			// ...
			var voPNode2 = voTree.getNode(vasPCode[vasPCode.length - 1], true);
			if (voPNode2 == null) {
				break;
			}
			switch (j) {
			  case 0:
				if (!PF.isEmpty(vaoNodeData[i].sPCoCode)) {
					var voNode = voTree.makeNode(vaoNodeData[i].sPCoCode, vaoNodeData[i].sCaption, null, null, NORM_IMG_CO, NORM_IMG_CO);
					voTree.insertChild(voTree.getRoot(), voNode);
					voTree.setNodeValue(vsCode, "CO_CODE", vaoNodeData[i].sCoCode);
					voTree.setNodeValue(vsCode, "NORM_IMG", NORM_IMG_CO);
				}
				break;
			  case 1:
				var voPNode = voTree.getRoot();
				if (!PF.isEmpty(vaoNodeData[i].sPCoCode)) {
					voPNode = voTree.getNode(vasPCode[0], true);
				}
				var voNode = voTree.makeNode(vaoNodeData[i].sCoCode, vaoNodeData[i].sCaption, null, null, NORM_IMG_CO, NORM_IMG_CO);
				voTree.insertChild(voPNode, voNode);
				voTree.setNodeValue(vsCode, "CO_CODE", vaoNodeData[i].sCoCode);
				voTree.setNodeValue(vsCode, "NORM_IMG", NORM_IMG_CO);
				break;
			  case 2:
				var voPNode = voTree.getNode(vasPCode[1], true);
				var voNode = voTree.makeNode(vaoNodeData[i].sOrgCode, vaoNodeData[i].sCaption, null, null, NORM_IMG_ORG, NORM_IMG_ORG);
				voTree.insertChild(voPNode, voNode);
				voTree.setNodeValue(vsCode, "CO_CODE", vaoNodeData[i].sCoCode);
				voTree.setNodeValue(vsCode, "ORG_CODE", vaoNodeData[i].sOrgCode);
				voTree.setNodeValue(vsCode, "NORM_IMG", NORM_IMG_ORG);
				break;
			  case 3:
				var voPNode = voTree.getNode(vasPCode[2], true);
				var voNode = voTree.makeNode(vaoNodeData[i].sPosiCode, vaoNodeData[i].sCaption, null, null, NORM_IMG_POSI, NORM_IMG_POSI);
				voTree.insertChild(voPNode, voNode);
				voTree.setNodeValue(vsCode, "CO_CODE", vaoNodeData[i].sCoCode);
				voTree.setNodeValue(vsCode, "ORG_CODE", vaoNodeData[i].sOrgCode);
				voTree.setNodeValue(vsCode, "POSI_CODE", vaoNodeData[i].sPosiCode);
				voTree.setNodeValue(vsCode, "NORM_IMG", NORM_IMG_POSI);
				break;
			  default:
			}
		}
		if (!PF.isEmpty(vasPCode[vasPCode.length - 1])) {
			voTree.collapse(vasPCode[vasPCode.length - 1]);
		}
		var voPNode = voTree.getNode(vasPCode[vasPCode.length - 1], true);
		if (voPNode == null) {
      //alert("没有发现父结点,不能将子结点加入或修改.n父结点:"+ vasPCode[vasPCode.length-1]);
      //continue;
      // 根结点下建单位的情况
			if (vsCurrentCode.indexOf("Root") >= 0) {
				voPNode = voTree.getRoot();
			} else {
				break;	// ...
			}
		}
		var vsCode = orgtree_makeNodeCode(vaoNodeData[i]);
		if (i == 0) {
			if(_sRelaNodeCode.indexOf(FREE_EMP_CODE) == 0){
				//自由人员成为非自由人员时，需要删除自由人员节点下的数据
				voTree.deleteNode(_sRelaNodeCode);
			}
			_sRelaNodeCode = vsCode;//自由人员的代码改为非自由人员的代码
		}
		if (PF.isEmpty(vsCode)) {
			return;
		}
		if (!voTree.isExistNode(vsCode)) {
			var voNode = voTree.makeNode(vsCode, vaoNodeData[i].sCaption, null, null, vsLeafImg, vsLeafImg);
			voTree.insertChild(voPNode, voNode);
			voTree.setCurNode(voNode);
			voNode.firstChild.style.color = "red";
		} else {
			var voNode = voTree.getNode(vsCode, true);
			voNode.firstChild.style.color = "green";
		}
		voTree.setNodeName(vsCode, vaoNodeData[i].sCaption);
		voTree.setNodeValue(vsCode, "CO_CODE", vaoNodeData[i].sCoCode);
		voTree.setNodeValue(vsCode, "ORG_CODE", vaoNodeData[i].sOrgCode);
		voTree.setNodeValue(vsCode, "POSI_CODE", vaoNodeData[i].sPosiCode);
		voTree.setNodeValue(vsCode, "EMP_CODE", vaoNodeData[i].sEmpCode);
		voTree.setNodeValue(vsCode, "NORM_IMG", vsLeafImg);
	}

  //检查职位是否被清除;
	if (_sRelaPageContent == RELA_PAGE_CONTENT_ORG) {
		var voPosiMap = new Map();
		for (var i = 1; i < vaoNodeData.length; i++) {
			if (PF.isEmpty(vaoNodeData[i].sPosiCode)) {
				continue;
			}
			voPosiMap.put(vaoNodeData[i].sPosiCode, vaoNodeData[i]);
		}
		var vsOrgNodeCode = orgtree_makeNodeCode(vaoNodeData[0]);
		var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
		var vaoNodeCodes = voTree.getChildCodes(vsOrgNodeCode, 1);
		if (vaoNodeCodes != null) {
			for (var i = 0; i < vaoNodeCodes.length; i++) {
				if (voPosiMap.isContain(voTree.getNodeValue(vaoNodeCodes[i], "POSI_CODE"))) {
					continue;
				}
				voTree.deleteNode(vaoNodeCodes[i]);
			}
		}
	}
	setTimeout("orgtree_addEditPageListener();", 2000);
}
//----------------------------------------------------------------------
function orgtree_NodeData() {
	this.sCoCode = "";
	this.sPCoCode = "";
	this.sOrgCode = "";
	this.sPosiCode = "";
	this.sEmpCode = "";
	this.sCaption = "";
}
//----------------------------------------------------------------------
function orgtree_makeNodeCode(oNodeData) {
	if (oNodeData == null) {
		return "";
	}
	var vasPCode = orgtree_makeNodePCode(oNodeData);
	var vsCode = "";
	if (!PF.isEmpty(oNodeData.sEmpCode)) {
		vsCode = vasPCode[vasPCode.length - 1] + "EMP_" + oNodeData.sEmpCode;
	} else {
		if (!PF.isEmpty(oNodeData.sPosiCode)) {
			vsCode = vasPCode[vasPCode.length - 1] + "PO_" + oNodeData.sPosiCode;
		} else {
			if (!PF.isEmpty(oNodeData.sOrgCode)) {
				vsCode = vasPCode[vasPCode.length - 1] + "ORG_" + oNodeData.sOrgCode;
			} else {
				if (!PF.isEmpty(oNodeData.sCoCode)) {
					vsCode = oNodeData.sCoCode;
				}
			}
		}
	}
	return vsCode;
}
//----------------------------------------------------------------------
function orgtree_makeNodePCode(oNodeData) {
	if (oNodeData == null) {
		return null;
	}
	var vasCode = new Array();
	if (!PF.isEmpty(oNodeData.sCoCode)) {
		vasCode[0] = oNodeData.sPCoCode;
	}
	if (!PF.isEmpty(oNodeData.sOrgCode)) {
		vasCode[1] = oNodeData.sCoCode;
	}
	if (!PF.isEmpty(oNodeData.sPosiCode)) {
		if (!PF.isEmpty(oNodeData.sCoCode)) {
			vasCode[2] = oNodeData.sCoCode + "ORG_" + oNodeData.sOrgCode;
		} else {
			vasCode[2] = FREE_POSI_CODE;
			return vasCode;
		}
	}
	if (!PF.isEmpty(oNodeData.sEmpCode)) {
		if (!PF.isEmpty(oNodeData.sCoCode)) {
			vasCode[3] = oNodeData.sCoCode + "ORG_" + oNodeData.sOrgCode + "PO_" + oNodeData.sPosiCode;
		} else {
			vasCode[3] = FREE_EMP_CODE;
			return vasCode;
		}
	}
	return vasCode;
}
//---------------------------------------------------------------------
//-------------changed by hmgkevin 08-04-11 ---------------------------
//---------------------------------------------------------------------
function orgtree_getEditNodeData() {
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	var voEditPage = window.parent.clientframe;
	var vaoNodeData = new Array();
	switch (_sRelaPageContent) {
	  case RELA_PAGE_CONTENT_CO:
		var voFree = voEditPage.PageX.getFree("MA_COMPANY");
		var voData = new orgtree_NodeData();
		voData.sCoCode = voFree.getValue("CO_CODE");
		voData.sPCoCode = voFree.getValue("PARENT_CO_CODE");
		voData.sCaption = "[" + voData.sCoCode + "] " + voFree.getValue("CO_NAME");
		vaoNodeData[vaoNodeData.length] = voData;
		break;
	  case RELA_PAGE_CONTENT_ORG:
		var voNorm = voEditPage.PageX.getFree("AS_ORG");
		var voData = new orgtree_NodeData();
		voData.sCoCode = voNorm.getValue("CO_CODE");
		voData.sOrgCode = voNorm.getValue("ORG_CODE");
		voData.sCaption = "[" + voData.sOrgCode + "] " + voNorm.getValue("ORG_NAME");
		vaoNodeData[vaoNodeData.length] = voData;
		var voGrid = voEditPage.PageX.getCtrlObj("AS_ORG_Grid");
		for (var i = 0; i < voGrid.getRowCount(); i++) {
			var voChild = new orgtree_NodeData();
			voChild.sCoCode = voData.sCoCode;
			voChild.sOrgCode = voData.sOrgCode;
			voChild.sPosiCode = voGrid.getValueByRowField(i, "POSI_CODE");
			voChild.sCaption = "[" + voChild.sPosiCode + "] " + voGrid.getValueByRowField(i, "POSI_NAME");
			vaoNodeData[vaoNodeData.length] = voChild;
		}
		break;
	  case RELA_PAGE_CONTENT_POSI:
		var vsPCode = voTree.getNodeValue(_sRelaNodeCode, "P_CODE");
		//if (vsPCode == FREE_POSI_CODE || PF.isEmpty(_sRelaNodeCode)) {//处理[自由职位]
			var voNorm = voEditPage.PageX.getFree("AS_POSITION");
			var voData = new orgtree_NodeData();
			voData.sPosiCode = voNorm.getValue("POSI_CODE");
			voData.sCaption = "[" + voData.sPosiCode + "] " + voNorm.getValue("POSI_NAME");
			voData.sCoCode = "";
			voData.sOrgCode = "";
			voData.sEmpCode = "";
			vaoNodeData[vaoNodeData.length] = voData;
		//}
		break;
	  case RELA_PAGE_CONTENT_EMP:
		var voNorm = voEditPage.PageX.getFree("AS_EMP");
		var voGrid = voEditPage.PageX.getCtrlObj("AS_EMP_POSITION_Grid");
		if (voGrid.getRowCount() > 0) {
			for (var i = 0; i < voGrid.getRowCount(); i++) {
				var voData = new orgtree_NodeData();
				voData.sEmpCode = voNorm.getValue("EMP_CODE");
				voData.sCaption = "[" + voData.sEmpCode + "] " + voNorm.getValue("EMP_NAME");
				voData.sCoCode = voGrid.getValueByRowField(i, "CO_CODE");
				voData.sOrgCode = voGrid.getValueByRowField(i, "ORG_CODE");
				voData.sPosiCode = voGrid.getValueByRowField(i, "POSI_CODE");
				vaoNodeData[vaoNodeData.length] = voData;
			}
		} else {
			voTree.deleteNode(_sRelaNodeCode);
			var voData = new orgtree_NodeData();
			voData.sEmpCode = voNorm.getValue("EMP_CODE");
			voData.sCaption = "[" + voData.sEmpCode + "] " + voNorm.getValue("EMP_NAME");
			voData.sCoCode = "";
			voData.sOrgCode = "";
			voData.sPosiCode = "";
			vaoNodeData[vaoNodeData.length] = voData;
		}
		break;
	  default:
	}
	return vaoNodeData;
}
//----------------------------------------------------------------------
function orgtree_getPCoCodeWhereEmpty(sCoCode) {
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	return voTree.getNodeValue(sCoCode, "P_CODE");
}
//----------------------------------------------------------------------
//chenhuan

function setCurrentPath(sCode) {
	if (sCode == null || sCode == "") {
		return;
	}
	currentPath = sCode + "/";
	vsCurrentCode = sCode;
	currentPathName = "";
	var voTree = AS_ORGANIZATION_TREE_Tree.oOwner;
	while (vsCurrentCode != null && vsCurrentCode != "") {
		var voRow = voTree.getNodeRow(vsCurrentCode);
		currentPathName = voTree.getRowValue(voRow, "NAME").split("]")[1] + "/" + currentPathName;
		var vsPCode = voTree.getRowValue(voRow, "P_CODE");
		currentPath = vsPCode + "/" + currentPath;
		vsCurrentCode = vsPCode;
	}
	currentPath = currentPath.substring(1, currentPath.length);
	
	var vsRow = voTree.getNodeRow(sCode);
	var vsPName = voTree.getRowValue(vsRow, "NAME");
	vsCurrentName = vsPName.split("]")[1];
}


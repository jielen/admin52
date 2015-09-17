
var voGrid = null;

//-------------------------------------------------------------
function setPageInit() {
	voToolbar = PageX.getCtrlObj("toolbar");
	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this)); 
	
	voGrid = PageX.getCtrlObj("AS_ADMIN_Grid");
	voGrid.addListener(new Listener(voGrid.OnAfterInsertRow, Grid_Insert_Row, this));
	
	voForeignBox = voGrid.getEditBox("USER_NAME");
	voForeignBox.setUserCond("code=0");
	voForeignBox.addListener(new Listener(voForeignBox.OnBeforeSelect, ForeignBox_setUserCond, this));
	
}

//-------------------------------------------------------------
function Grid_Insert_Row(oSender, iRowIndex) {
	//alert(iRowIndex);
	DataTools.setValue(oSender.getTableName(), iRowIndex, "PATH", path);
}	

//-------------------------------------------------------------
function ForeignBox_setUserCond(oSender) {
	var code = null;
	var cond = null;
	if (path != null && path != "") {
		if (path.indexOf("Root") > 0) {
			cond = "code = 1";
		}
		
		if (path.indexOf("ORG_") > 0) {//当前节点为机构
			code = path.substring(0, path.indexOf("ORG_"));
			var coCode = code.substring(code.lastIndexOf("/") + 1, code.length);
			var orgCode = path.substring(path.indexOf("ORG_") + 4, path.length - 1);
			cond = "code=2;co_code = " + coCode + ";org_code = " + orgCode;
		} else {//当前节点为单位,其它情况在左边菜单中已控制
			var tmppath = path.substring(0, path.length - 1);
			code = tmppath.substring(tmppath.lastIndexOf("/") + 1, tmppath.length);
			cond = "code=2;co_code = " + code;
		}
		//alert(cond);
	}
	oSender.sBeforeCond = cond;
}
//-----------------------------------------------------------
/*
  处理工具栏按钮点击事件
*/
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){ 
	switch (oCall.id) {
	  	case "fsave":
			if (PageX.isChanged() == false) {
				alert("\u6ca1\u6709\u53d1\u751f\u66f4\u6539,\u4e0d\u7528\u4fdd\u5b58!");
				return;
			}
			var result = saveCa();
			if ("true" == result + "") {
				alert("\u4fdd\u5b58\u6210\u529f");
			} else {
				alert(result);
			}
			break;
	  	case "fdelete":
				var result = PageX.deleteBill("saveAsCa");
				if ("true" == result + "") {
					alert("\u4fdd\u5b58\u6210\u529f");
				} else {
					alert(result);
				}
				break;
	  	default:
	}
	
	function saveCa(){
		var vavRet= PageX.saveBillK("saveAsCa");
  	if (vavRet[0]) return true;
  	else return vavRet[1];
	}
}


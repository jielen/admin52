var _global_tIsDeleted= false;//删除判断，组织树用
var _global_tIsSaved= false;
var _global_tIsNew = true;
function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  	voFree = PageX.getFree(mainTableName);
    
	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_POSITION_Grid");
	voToolbar.setCallDisabled("fsave", true);
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", true);
	}
	else{
		voFree.setReadOnly(true);
		voGrid.setReadOnly(true);
	}
	
}
//-------------------------------------------------------------
function before_fsave(){
	var posiCode = voFree.getValue("POSI_CODE");
	var posiName = voFree.getValue("POSI_NAME");
	if(PF.isEmpty(posiCode) || PF.isEmpty(posiName)){
		alert("职位码和职位名称不能为空！");
		return false;
	}
	if (PageX.isNew()){
		var result = PageX.getRuleDeltaXML("admin-ruleData.AS_POSI_IsExist", ["POSI_CODE"], [posiCode]);
	  	if(result.firstChild.firstChild.firstChild.getAttribute("value") != "0"){
	    	alert("职位代码（" + posiCode + "）已经存在！");
	    	return false;
	  	}
	}
	var rowCount = voGrid.getRowCount();
	if(rowCount <= 0){
	  	alert("职位必须设置相应角色");
	  	return false;
	}
	return true;
}
//-------------------------------------------------------------
function before_fdelete(){
	//先判断职位是否被引用
  	var names = new Array();
  	var values = new Array();
  	var pCode = voFree.getValue("POSI_CODE");
  	names[0] = "POSI_CODE";
  	values[0] = pCode;
  	var result = PageX.getRuleDeltaXML("admin-ruleData.AS_POSI_IsUsed", names, values);
  	if(result.firstChild.firstChild.firstChild.getAttribute("value") != "0"){
    	alert("职位（" + pCode + "）已经被使用，如果确实要删除，请先修改引用它的内部机构！");
    	return false;
  	}
  	return true;
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  	switch(oCall.id){
	    //-----------------------新建-----------------------------
	  	case "fadd":
	  		voFree.setReadOnly(false);
			voGrid.setReadOnly(false);
			voToolbar.setCallDisabled("fedit", true);
	    	voToolbar.setCallDisabled("fsave", false);
	    	voToolbar.setCallDisabled("fdelete", true);
	    	_global_tIsNew = true;
	      	PageX.newBill();
	      	break;
	  	//-----------------------修改-----------------------------
	    case "fedit":
	    	voFree.setReadOnly(false);
	    	voGrid.setReadOnly(false);
	    	voFree.setFieldReadOnly("POSI_CODE",true);
	    	voToolbar.setCallDisabled("fedit", true);
	    	voToolbar.setCallDisabled("fsave", false);
	    	_global_tIsNew = false;
	      	break;
	  	//-----------------------保存-----------------------------
	    case "fsave":
	    	if(!before_fsave()){
	       		break;
	    	}
	    	if (PageX.isChanged()== false){
	      		alert("没有发生更改,不用保存!");
	    	}else{
	       		var vvRet= PageX.saveBill();
	       		if (vvRet == true) {
	         		voFree.setReadOnly(true);
	         		voGrid.setReadOnly(true);
	         		voToolbar.setCallDisabled("fedit", false);
	         		voToolbar.setCallDisabled("fsave", true);
	         		voToolbar.setCallDisabled("fdelete", false);
	         		_global_tIsSaved = true;
	         		alert("保存成功!");
	       		}
	       		else{
	         		alert("保存失败 ,失败的原因是: \n" + vvRet);
	       		}
	     	}
	     	break;      
	  	//-----------------------删除-----------------------------
	  	case "fdelete":
	    	if (!confirm("确定删除？")) break;
	      	if(!before_fdelete()){
	       		break;
	    	}
	      	var vvRet = PageX.deleteBill();
	      	if (vvRet== true) {
	        	PageX.newBill();
	        	_global_tIsDeleted = true;
	        	alert("删除成功");
	      	}
	      	else{
	        	alert("删除失败,失败的原因是: \n" + vvRet);
	      	}
	      	break;
	    	//-----------------------帮助-----------------------------
	    case "fhelp":
	       	PageX.showHelp();
	       	break;
	    	//-----------------------缺省-----------------------------
	  	default:
  	}
  	return;
}
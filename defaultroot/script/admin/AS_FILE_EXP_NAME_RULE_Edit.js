var voRuleCode;

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
  voRuleCode = voFree.getEditBox("RULE_CODE");
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_FILE_EXP_NAME_RULE_Grid");
	voToolbar.setCallDisabled("fsave", true);
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
    voToolbar.setCallDisabled("fsave", false);
    voToolbar.setCallDisabled("fdelete", true);
		//voToolbar.
	}
	else{
		voFree.setReadOnly(true);
		voGrid.setReadOnly(true);
	}
	
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
      PageX.newBill();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voGrid.setReadOnly(false);
    	voRuleCode.setReadOnly(true);
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
      break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	if (PageX.isChanged()== false){
	      	alert("没有发生更改,不用保存!");
    	}
    	else{
       		var vvRet= PageX.saveBill();
       		if (vvRet== true) {
         		voFree.setReadOnly(true);
         		voGrid.setReadOnly(true);
         		voToolbar.setCallDisabled("fedit", false);
         		voToolbar.setCallDisabled("fsave", true);
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
      	var vvRet = PageX.deleteBill();
      	if (vvRet== true) {
	        PageX.newBill();
	        alert("删除成功");
      	}
      	else{
        	alert("删除失败,失败的原因是: \n" + vvRet);
      	}
      	break;
    case "fprint":
      	PrintX.fprint();
      	break;
    	
    case "fprn_tpl_set":
       	PrintX.fprintset();
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
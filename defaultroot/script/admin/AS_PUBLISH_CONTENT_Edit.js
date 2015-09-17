var voSID

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
  voSID = voFree.getEditBox("SID");
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	voToolbar.setCallDisabled("fsave", true);
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
    voToolbar.setCallDisabled("fsave", false);
    voToolbar.setCallDisabled("fdelete", true);
	}
	else{
		voFree.setReadOnly(true);
	}
	
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
      PageX.newBill();
      voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", true);
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voSID.setReadOnly(true);
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
      break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	//if(!before_fsave()){
      // 	break;
    	//}

    	if (PageX.isChanged()== false){
      	alert("没有发生更改,不用保存!");
    	}
    	else{
       var vvRet= PageX.saveBill();
       if (vvRet== true) {
         voFree.setReadOnly(true);
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
      //if(!before_fdelete()){
      // 	break;
    	//}

      var vvRet = PageX.deleteBill();
      if (vvRet== true) {
        PageX.newBill();
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
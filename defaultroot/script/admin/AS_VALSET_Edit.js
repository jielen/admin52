var voValId;

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
  voValId = voFree.getEditBox("VALSET_ID");
	voToolbar= PageX.getCtrlObj("toolbar");
	voGrid = PageX.getCtrlObj("AS_VAL_Grid");
	
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	voGrid.addListener(new Listener(voGrid.OnBeforeDeleteRow, eventAnswer_Before_AS_VAL_Del, this));
	voGrid.addListener(new Listener(voGrid.OnBeforeDeleteRows, eventAnswer_Before_AS_VAL_Del, this));
	

	voToolbar.setCallDisabled("fsave", true);
	
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid.setReadOnly(false);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fdelete", true);
		setDisabled();
	}
	else{
		voFree.setReadOnly(true);
		voGrid.setReadOnly(true);
		setDisabled();
	}
}

function setDisabled(){
  if (voFree.getValue("IS_SYSTEM") == "Y") {
    voToolbar.setCallDisabled("fdelete", true);
    voFree.setReadOnly(true);
  }
  for (var i=0, j=voGrid.getRowCount(); i<j; i++){
    var stat = voGrid.getValueByRowField(i,"IS_SYSTEM");
    if (stat == "Y")
			voGrid.setRowReadOnly(i,true);
    else
			voGrid.setRowReadOnly(i,false);
  }
}


function setRowChecked(iRow,checked){
  var voRow = voGrid.oLockBodyTable.rows(iRow);
  if (voRow== null) return false; 
  var voCheckBox= voRow.firstChild.firstChild;
  if (voCheckBox== null || voCheckBox.nodeName!= "INPUT") return;
  voCheckBox.checked = checked;
}

function eventAnswer_Before_AS_VAL_Del(){
  for (var i=0,j=voGrid.getRowCount(); i<j; i++){
    if (voGrid.getValueByRowField(i, "IS_SYSTEM")=="Y"){
      if (voGrid.isSelectedRow(i)){
        alert("不能删除系统预置的值！");
        voGrid.abortEvent(true);
      }
      setRowChecked(i, false);
    }
  }
  return true;
}

function before_fsave(){
  voFree.setValue("LSTDATE",DataTools.getSV("svSysDate"));
  return true;
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
  	  voFree.setReadOnly(false);
			voGrid.setReadOnly(false);
			voToolbar.setCallDisabled("fsave", false);
			voToolbar.setCallDisabled("fedit", true);
			voToolbar.setCallDisabled("fdelete", true);
      PageX.newBill();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voGrid.setReadOnly(false);
    	voValId.setReadOnly(true);
    	voToolbar.setCallDisabled("fedit", true);
			voToolbar.setCallDisabled("fsave", false);
			voToolbar.setCallDisabled("fdelete", false);
			setDisabled();
      break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	if(!before_fsave()){
       	break;
    	}

    	if (PageX.isChanged()== false){
      	alert("没有发生更改,不用保存!");
    	}
    	else{
       var vvRet= PageX.saveBill();
       if (vvRet== true) {
       	 voToolbar.setCallDisabled("fedit", false);
       	 voToolbar.setCallDisabled("fsave", true);
         voFree.setReadOnly(true);
         voGrid.setReadOnly(true);
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
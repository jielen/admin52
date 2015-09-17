var voAreaId;

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
  voAreaId = voFree.getEditBox("AREA_ID");
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_DESKTOP_AREA_Grid");
	voToolbar.setCallDisabled("fsave", true);
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid.setReadOnly(false);
	}
	else{
		voFree.setReadOnly(true);
		voGrid.setReadOnly(true);
	}
	
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voGrid.setReadOnly(false);
    	voAreaId.setReadOnly(true);
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
      //------------------------桌面批设置----------------------
      case "fdesktop_batch":
      fdesktop_batch();
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

function fdesktop_batch(){
    if(!confirm("确定要进行桌面批设置吗?"))
    return;
    var data ;
    var retValue = showModalDialog("jsp/admin/desktopbatch.jsp", data,
    "status:no;resizable:no;help:no;dialogHeight:450px;dialogWidth:500px");
    if (!retValue || !retValue.isOk)
    return;
    var userId = retValue.NEXT_EXECUTOR;
    var userName = retValue.NEXT_EXECUTOR_NAME;
    var userNums = userId.split(",").length;
    if (userNums >10){
      alert("对不起，您每次最多只能为10位用户进行桌面批设置，请重新选择用户！");
      return;
    }
    if (userNums==1 && userName==""){
      alert("您未选定任何用户，请重新选择用户");
      return;
    }
    var names = new Array();
    var values = new Array();
    names[0] = "areaId";
    values[0] = voFree.getValue("AREA_ID");
    names[1] = "areaName";
    values[1] = voFree.getValue("AREA_NAME");
    names[2] = "areaIndex";
    values[2] = voFree.getValue("AREA_INDEX");
    names[3] = "areaImg";
    values[3] = voFree.getValue("AREA_IMG");
    names[4] = "displayAmount";
    values[4] = voFree.getValue("DISPLAY_AMOUNT");
    names[5] = "isDisplayRec";
    values[5] = voFree.getValue("IS_DISPLAY_REC");
    
    names[6] = "userId";
    values[6]= userId;
    //values[1]= String(userId).split(',');
    var result = Info.requestData("desktopBatch", "all", names, values);
    //alert(result.xml);
    voToolbar.setCallDisabled("fdesktop_batch", true);
    if (result==null){
       var resu = "";
       return resu ;
    }else{
       return result.xml;
    }

}
var voToolId;
var voToolName;
var voIsCont;
function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
  voToolId = voFree.getEditBox("NUM_TOOL_ID");
  voToolName = voFree.getEditBox("NUM_TOOL_NAME");
  voIsCont = voFree.getEditBox("IS_CONT");
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_NUM_TOOL_Grid");
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

function before_fdelete(){
	//先判断当前编号器是否被使用
  var names = new Array();
  var values = new Array();
  names[0] = "NUM_TOOL_ID";
  values[0] = voFree.getValue("NUM_TOOL_ID");
  var result = PageX.getRuleDeltaXML("admin-ruleData.AS_NUMTOOL_IsUsed", names, values);//qryData(roleNo, names, values);
  result = result.getElementsByTagName("field");
	if( result!=null && result[0].getAttribute("value") != "0"){
		alert("本编号器已经被使用，目前不能删除！");
		return false;
	}
  return true;
}

function before_fedit(){
	var names = new Array();
  var values = new Array();
  names[0] = "NUM_TOOL_ID";
  values[0] = voFree.getValue("NUM_TOOL_ID");
  var result = PageX.getRuleDeltaXML("admin-ruleData.AS_NUMTOOL_IsUsed", names, values);//qryData(roleNo, names, values);
  result = result.getElementsByTagName("field");
	if( result!=null && result[0].getAttribute("value") != "0"){
		return false;
	}
	return true;
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
  	  voFree.setReadOnly(false);
  	  voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", true);
      PageX.newBill();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voToolId.setReadOnly(true);
    	voToolName.setReadOnly(true);
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	if(!before_fedit()){
    		voIsCont.setReadOnly(true);
    	}
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
      if(!before_fdelete()){
       	break;
    	}

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
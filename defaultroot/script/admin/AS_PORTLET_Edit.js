var portletType = null;

window.onbeforeunload = function closeEditPage(){
	if(PageX.sPageType == 'edit'){
		var iSearch = window.opener.PageX.getCtrlObj("AS_PORTLET_search");
		iSearch.search();
	}
}
function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
    voFree = PageX.getFree(mainTableName);   
	voToolbar= PageX.getCtrlObj("toolbar");
    voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	voToolbar.setCallDisabled("fsave", true);
	portletType = PageX.getCtrlObj("PORTLET_TYPE");
	portletType.addListener(new Listener(portletType.OnChange, eventAnswer_PORTLETTYPE_OnChange, this));
	if(voFree.getValue("PORTLET_ID")==""||voFree.getValue("PORTLET_ID")==null){
	    var currentDate = new Date();
	    voFree.setValue("PORTLET_ID",currentDate.getTime());
	  }
	  
	if(trim(voFree.getValue("IS_SYSTEM").toUpperCase())=="Y"){
		voToolbar.setCallDisabled("fdelete", true);
		voToolbar.setCallDisabled("fedit", true);
	}
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
function before_fsave(){
	voFree.setValue("IS_SYSTEM","N");
	return true;
}
function eventAnswer_PORTLETTYPE_OnChange(){
	var portlettype = voFree.getValue("PORTLET_TYPE");
	var result = PageX.getRuleDeltaXML("admin-ruleData.getPortletInfo", ["portletType", "IS_SYSTEM"], [portlettype, "Y"]);
	if(result != null){
		var entity = result.selectSingleNode("//entity");
		var portletUrl = entity.childNodes[0].getAttribute("value");
		var portletClass = entity.childNodes[1].getAttribute("value");
		var portletMoreUrl = entity.childNodes[2].getAttribute("value");
		var portletDetailUrl = entity.childNodes[3].getAttribute("value");
		voFree.setValue("PORTLET_URL",portletUrl);
		voFree.setValue("PORTLET_CLASS",portletClass);
		voFree.setValue("PORTLET_MORE_URL",portletMoreUrl);
		voFree.setValue("PORTLET_DETAIL_URL",portletDetailUrl);
	}
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
      var currentDate = new Date();
	    voFree.setValue("PORTLET_ID",currentDate.getTime());
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voFree.setFieldReadOnly("PORTLET_ID", true);
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
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
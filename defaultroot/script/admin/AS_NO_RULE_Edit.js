var voRuleCode;
var voRuleName;


function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
  voRuleCode = voFree.getEditBox("RULE_CODE");
  voRuleName = voFree.getEditBox("RULE_NAME");
  
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_NO_RULE_SEG_Grid");

	voToolbar.setCallDisabled("fsave", true);
	
	voSegField = voGrid.getEditBox("SEG_FIELD");
	voSegField.addListener(new Listener(voSegField.OnBeforeSelect, eventAnswer_SegField_OnBeforeSelect, this));
	
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
    voToolbar.setCallDisabled("fsave", false);
    voToolbar.setCallDisabled("fdelete", false);
	}
	else{
		voFree.setReadOnly(true);
		voGrid.setReadOnly(true);
	}
	
}

function eventAnswer_SegField_OnBeforeSelect(){
	var voCompoId = voFree.getValue("COMPO_ID");
	//if(voCompoId==""||voCompoId==null){
		//return false;
		//}
	//var voNames = new Array("COMPO_ID");
	//var voValues = new Array(voCompoId);
	//var reStr = PageX.getRuleDeltaXML("admin-ruleData.AS_COMPO_Table", voNames, voValues);
  //var voxmlDom = reStr.getElementsByTagName("field");
  //var voTabId = voxmlDom.item(0).getAttribute("value");
		voSegField.setUserCond("compo_id ="+ voCompoId);
}

function before_fdelete(){
	//先判断当前规则是否被使用
  var names = new Array();
  var values = new Array();
  names[0] = "COMPO_ID";
  values[0] = voFree.getValue("COMPO_ID");
  var result = PageX.getRuleDeltaXML("admin-ruleData.AS_RULE_IsUsed", names, values);
  var xmlDom = result.getElementsByTagName("field");
	if(xmlDom.item(0).getAttribute("value") != "0"){
		alert("本规则已经被使用，目前不能删除！");
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
    	voToolbar.setCallDisabled("fdelete", false);
      PageX.newBill();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voGrid.setReadOnly(false);
    	voRuleCode.setReadOnly(true);
    	voRuleName.setReadOnly(true);
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", false);
      break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	//if(!before_fsave()){
      // 	break;
    	//}

    	if (PageX.isChanged()== false){
        voFree.setReadOnly(true);
        voGrid.setReadOnly(true);
      	alert("没有发生更改,不用保存!");
    	}
    	else{
       var vvRet= PageX.saveBill();
       if (vvRet== true) {
         voFree.setReadOnly(true);
         voGrid.setReadOnly(true);
         voToolbar.setCallDisabled("fedit", false);
    		 voToolbar.setCallDisabled("fsave", true);
    		 voToolbar.setCallDisabled("fdelete", false);
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
        voToolbar.setCallDisabled("fedit", true);
    		voToolbar.setCallDisabled("fsave", false);
    		voToolbar.setCallDisabled("fdelete", true);
        alert("删除成功");
      }
      else{
        alert("删除失败,失败的原因是: \n" + vvRet);
      }
      break;
       //-----------------------打印--------------------------------
     	case "fprint":
      		//PrintX.setParameter("sqlid","admin-listPage.getDataFromAS_FILE_EXP_NAME_RULE");
      		//PrintX.setParameter("condition","");
      		PrintX.fprint();
      		break;
    	//-------------------------打印设置------------------------------
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
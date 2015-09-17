var voPrnCompoId;
var voPrnTplJpcode;

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  	voFree = PageX.getFree(mainTableName);
  	voPrnCompoId   = voFree.getEditBox("PRN_COMPO_ID");
  	voPrnTplJpcode = voFree.getEditBox("PRN_TPL_JPCODE");
    
	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	var voPrnTplJpCode= PageX.getCtrlObj("PRN_TPL_JPCODE");
	voPrnTplJpCode.addListener(new Listener(voPrnTplJpcode.OnChange, eventAnswer_PRN_TPL_JPCODE_Change, this));
  	
	voToolbar.setCallDisabled("fsave", true);
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
	    voToolbar.setCallDisabled("fsave", false);
	    voToolbar.setCallDisabled("fdelete", true);
	    voFree.setValue("PRN_TPL_HANDLER",DataTools.getSV("svUserID"));
	    setCoCode();
	}
	else{
		voFree.setReadOnly(true);
	}
}

function setCoCode(){
	var cocode = DataTools.getSV("svCoCode");
	var svUserId = DataTools.getSV("svUserID");
	if(cocode != null){
		if("sa" == svUserId){
			voFree.setValue("CO_CODE","*");	
		}else{
			voFree.setValue("CO_CODE",DataTools.getSV("svCoCode"));	
		}
	}else{
		voFree.setValue("CO_CODE","*");	
	}
}

function before_fsave(){
	var PRN_TPL_JPCODE = voFree.getValue("PRN_TPL_JPCODE");
	var PRN_COMPO_ID = voFree.getValue("PRN_COMPO_ID");
	var PRN_TPL_OUTTYPE = voFree.getValue("PRN_TPL_OUTTYPE");
	var PRN_TPL_REPORTTYPE = voFree.getValue("PRN_TPL_REPORTTYPE");
	if(PF.isEmpty(PRN_TPL_JPCODE)){
		alert("打印模板文件名不能为空");
		return false;
	}
	if(PF.isEmpty(PRN_COMPO_ID)){
		alert("部件代码不能为空");
		return false;
	}
	if(PF.isEmpty(PRN_TPL_OUTTYPE)){
		alert("文件输出类型不能为空");
		return false;
	}
	if(PF.isEmpty(PRN_TPL_REPORTTYPE)){
		alert("模板类型不能为空");
		return false;
	}
	return true;
}

function eventAnswer_PRN_TPL_JPCODE_Change(){
	var CO_CODE = voFree.getValue("CO_CODE");
	var svUserId = DataTools.getSV("svUserID");
	if(!CO_CODE){
		alert("请先填写单位代码！");
		return true;	
	}
	var PRN_TPL_JPCODE = voFree.getValue("PRN_TPL_JPCODE");
	if(PRN_TPL_JPCODE){
		if("sa" != svUserId){
			if(PRN_TPL_JPCODE.lastIndexOf("_") != -1){
				var subCoCode = PRN_TPL_JPCODE.substring(PRN_TPL_JPCODE.lastIndexOf("_") + 1);
				if(subCoCode != CO_CODE){
					voFree.setValue("PRN_TPL_JPCODE", PRN_TPL_JPCODE + "_" + CO_CODE);	
				}	
			}
			else{
				voFree.setValue("PRN_TPL_JPCODE", PRN_TPL_JPCODE + "_" + CO_CODE);	
			}
		}else{
			voFree.setValue("PRN_TPL_JPCODE", PRN_TPL_JPCODE);	
		}
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
      	voFree.setValue("PRN_TPL_HANDLER",DataTools.getSV("svUserID"));
      	setCoCode();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voPrnCompoId.setReadOnly(true);
    	voPrnTplJpcode.setReadOnly(true);
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
      //if(!before_fdelete()){
      // 	break;
    	//}

      	var vvRet = PageX.deleteBill();
      	if (vvRet== true) {
	        PageX.newBill();
	        alert("删除成功");
	        voFree.setReadOnly(false);
	        voToolbar.setCallDisabled("fedit", true);
         	voToolbar.setCallDisabled("fsave", false);
         	voToolbar.setCallDisabled("fdelete", true);
      	}
      	else{
        	alert("删除失败,失败的原因是: \n" + vvRet);
      	}
      	break;
    case "fprint":
    	//PrintX.setParameter("DynamicTpl","1");
    	//PrintX.setParameter("sqlid","admin-listPage.getDataFromAS_PRINT_JASPERTEMP");
    	PrintX.fprint();
    	break;
    case "fprn_tpl_set":
    	PrintX.fprintset();
    	break;
    //---------------------模板设计器---------------------------
    case "ftempdesigner":
    	voFree = PageX.getFree(mainTableName);
    	var compName = voFree.getValue("PRN_COMPO_ID");
    	var pageName = compName + "_E";
    	var tplCode = voFree.getValue("PRN_TPL_JPCODE");
    	//alert(pageName);
    	PrintX.jasperdesigner(pageName,compName,tplCode);
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
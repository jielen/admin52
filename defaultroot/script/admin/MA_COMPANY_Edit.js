//----------------------------------------------------------------------
// 全局变量
var voToolbar= null; // voToolbar全局变量
var voFree= null; // voFree全局变量
var vsCoCodeLevel= "";
var svNd= "";

var _global_tIsDeleted= false;
var _global_tIsSaved= false;
var _global_tIsNew = false;
//----------------------------------------------------------------------
function getParameter(oName) {
	var reg = new RegExp("(^|&)" + oName + "=([^&]*)(&|$)");
	var param = document.location.search.substring(1).match(reg);
	if (param != null) {
		return unescape(param[2]);
	}
	return null;	
}
//----------------------------------------------------------------------
//页面初始化的操作
function setPageInit(){
  	svNd= DataTools.getSV("svNd");
  	voToolbar= PageX.getCtrlObj("toolbar");
  	voFree = PageX.getFree("MA_COMPANY");
  	if (PageX.isNew()){
	    set_new_page_value();
	    voToolbar.setCallDisabled("fdelete",true);
	    voFree.setReadOnly(false);
	    voToolbar.setCallDisabled("fedit", true);
  	}
  	else{
    	//设置单位代码编码规则
	  	var vsCoCodeLevel= getCoCodeLevel("OPT_CO_CODE");
    	voFree.setValue("AS_OPT_RULE", vsCoCodeLevel);
    	voFree.setReadOnly(true);
			voToolbar.setCallDisabled("fsave",true);
  	}

  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));

  	var voParentCoCode= PageX.getCtrlObj("PARENT_CO_CODE");
  	voParentCoCode.addListener(new Listener(voParentCoCode.OnChange, eventAnswer_Parent_Co_Code_Change, this));

  	var voCoCode= PageX.getCtrlObj("CO_CODE");
  	voCoCode.addListener(new Listener(voCoCode.OnChange, eventAnswer_Co_Code_Change, this));

  	var voCoName= PageX.getCtrlObj("CO_NAME");
  	voCoName.addListener(new Listener(voCoName.OnChange, eventAnswer_Co_Name_Change, this));

  	

	
	if(adminPath != null && curPath != null && curPath.indexOf(adminPath) >= 0 && curPath.length == adminPath.length) {
		voFree.setFieldReadOnly("PARENT_CO_CODE",true);
		voFree.setFieldReadOnly("PARENT_CO_NAME", true);
  	}
  	var voRM= PageX.getRowManager();
  	voRM.setValidChanged(false);
  	voRM.setValidChanged(true);
  	//alert(adminPath+"|||||||||||"+curPath);
  	//置灰工具条
  	if(adminPath != null && curPath != null){
    	if(adminPath.indexOf(curPath) >= 0 && adminPath.length > curPath.length){
	    	voToolbar.setCallVisible("fadd",false); 
	    	voToolbar.setCallVisible("fsave",false);
	    	voToolbar.setCallVisible("fedit",false);    
	    	voToolbar.setCallVisible("fdelete",false);
	    	voFree.setReadOnly(true);
    	}	
    	
  	}
  if (PageX.isNew()){
		voFree.setReadOnly(false);
	}
	else{
		voFree.setReadOnly(true);
	}
  	return;
}
//----------------------------------------------------------------------
//上级单位代码发生改变时的事件
  function eventAnswer_Parent_Co_Code_Change(oSender, sValue, oEvent){
		var vsCoCode= voFree.getValue("CO_CODE");
		if(vsCoCode == sValue && sValue!= ""){
 			alert("一个单位不能引用自己作为上级单位代码！");
			voFree.setValue("PARENT_CO_CODE", "****"); //为了清掉原来的值做的处理
      		voFree.setValue("PARENT_CO_CODE", "");
			voFree.setValue("PARENT_CO_NAME", "");
		}
  }
//----------------------------------------------------------------------
//单位代码发生改变时的事件
function eventAnswer_Co_Code_Change(oSender, sValue, oEvent){
    //leidh:20060726;
    if (sValue!= null && sValue.indexOf(" ")){
      var vtIsFire= oSender.isFireOnChange();
      oSender.setFireOnChange(false);
      voFree.setValueByRowField(0, oSender.getFieldName(), PF.trimAll(sValue));
      //oSender.setValue(PF.trimAll(sValue));
      oSender.setFireOnChange(vtIsFire);
    }
    
		//voFree.setValue("PARENT_CO_CODE", "");
		//voFree.setValue("PARENT_CO_NAME", "");
	var viMinCoCodeLen = parseInt(vsCoCodeLevel.charAt(0));
    var viMaxCoCodeLen = 0;
    var num = 0, j = 0, k;
    var vaiEachLevelCoCodeLen = new Array();
    for(var i = 0; i < vsCoCodeLevel.length; i++){
    	var onechar=vsCoCodeLevel.charAt(i);
      	if(onechar <= "6" && onechar >= "1"){
	      	num = parseInt(onechar);
	        viMaxCoCodeLen = viMaxCoCodeLen + num;
	        vaiEachLevelCoCodeLen[j] = viMaxCoCodeLen;
	        j++;
      	}
    }

    var vsCoCode= voFree.getValue("CO_CODE");
	var viCoCodeLen = vsCoCode.length;
    var isFirst = 1;
    if (viCoCodeLen != viMinCoCodeLen)
    	isFirst=0;
    var isEqual=0;
    for( k=0;k<vaiEachLevelCoCodeLen.length;k++){
    	if (viCoCodeLen==vaiEachLevelCoCodeLen[k])
      	isEqual=1;
    }
    if(isEqual==0){
		var vsMessage= new StringBuffer();
		vsMessage.append("单位代码（");
		vsMessage.append(vsCoCode);
      	vsMessage.append("）长度不符合“单位级次设置（");
     	vsMessage.append(vsCoCodeLevel);
      	vsMessage.append("）”！");
		alert(vsMessage);
      	return false;
    }
    if( isFirst==0){
    	var superLength = 0;
      	for(k = 0; k < vaiEachLevelCoCodeLen.length; k++){
      		if(viCoCodeLen == vaiEachLevelCoCodeLen[k])
        		superLength = vaiEachLevelCoCodeLen[k-1];
      	}

		var vsSuperCoCode= vsCoCode.substring(0, superLength);
		isExistSuperCoCode(vsSuperCoCode);
    }
}

//----------------------------------------------------------------------
//单位名称改变之后的事件处理
function eventAnswer_Co_Name_Change(oSender, sValue, oEvent){
	var vsCoName= voFree.getValue("CO_NAME");
   	voFree.setValue("CO_FULLNA", vsCoName);
}

//----------------------------------------------------------------------
//判断一个上级单位代码是否存在
function isExistSuperCoCode(sSuperCoCode){
  	var names= new Array("PARENT_CO_CODE", "ND");
    var values= new Array(sSuperCoCode, svNd);
    var voResult= PageX.getRuleDeltaXML("admin-ruleData.MA_COMPANY_IsExist", names, values);
    processRet(voResult);
}
//----------------------------------------------------------------------
//对返回的上级单位信息进行处理
function processRet(voxmlDoc){
	if (voxmlDoc!= null){
		if( voxmlDoc.getElementsByTagName("field").length == 0){
		    voFree.setValue("PARENT_CO_CODE", "");
		    voFree.setValue("PARENT_CO_NAME", "");
		    alert("上级单位不存在，或者已经是末级，请重新录入单位代码！");
  		}else{
			var vsCoCode= voxmlDoc.selectSingleNode("//field[@name='CO_CODE']").getAttribute("value");
			var vsCoName= voxmlDoc.selectSingleNode("//field[@name='CO_NAME']").getAttribute("value");
        	voFree.setValue("PARENT_CO_CODE", vsCoCode);
    		voFree.setValue("PARENT_CO_NAME", vsCoName);
 		}
	}
}
//----------------------------------------------------------------------
//得到单位的编码规则值, 成功:单位编码规则值;
function getCoCodeLevel(sOptId){
   	var vasnames= new Array("optIds", "type");
	var vasvalues= new Array(sOptId, "one");
	//var voRetRoot= PageX.getRuleDeltaXML("admin-ruleData.GET_OPT_CO_CODE", vasnames, vasvalues);
	var result = Info.requestData("getOptions", "all", vasnames, vasvalues);
	if(result.childNodes.length > 0){
		vsCoCodeLevel = result.childNodes[0].getAttribute("OPT_VAL");
	}else{
		vsCoCodeLevel = "";
	}
	return vsCoCodeLevel;
}
//----------------------------------------------------------------------
//新增页面后的初始值设置
function set_new_page_value(){
  	var vsCoCodeLevel= getCoCodeLevel("OPT_CO_CODE");
  	voFree.setValue("AS_OPT_RULE", vsCoCodeLevel);
  	voFree.setValue("ND", svNd);
  	_global_tIsNew = true;
  	if (vsParentCode && vsParentCode != "null") {
	  	if (vsParentCode.indexOf("Root") < 0) {
	  		voFree.setFieldReadOnly("PARENT_CO_CODE", false);
	  		voFree.setValue("PARENT_CO_NAME", vsParentName);
	  		voFree.setValue("PARENT_CO_CODE", vsParentCode);
	  	}
	}
  if(voFree.getValue("CO_CODE")!=""||voFree.getValue("CO_CODE").length!=0){
  	voFree.setFieldReadOnly("AS_OPT_RULE",true);
  	voFree.setFieldReadOnly("PARENT_CO_NAME", true);
  	voFree.setFieldReadOnly("PARENT_CO_CODE", false);
  	voFree.setFieldReadOnly("F_ORG_NAME", true);
  	voFree.setFieldReadOnly("DIRECTOR_NAME", true);
  	voFree.setFieldReadOnly("F_CO_NAME", true);
  	//PageX.tIsChanged= false;
  }
}

//----------------------------------------------------------------------
//对按钮功能的响应
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
  	switch(oCall.id){
    	//-----------------------新建-----------------------------
		case "fadd":
      		if (! before_fadd()) return;
      		PageX.newBill();
	    	set_new_page_value();
      		voToolbar.setCallDisabled("fdelete",true);
      		voToolbar.setCallDisabled("fedit",true);
      		voToolbar.setCallDisabled("fsave",false);	 
      		voFree.setReadOnly(false);   
        	break;
		//-----------------------保存-----------------------------
    	case "fsave":
     		_global_tIsSaved= false;
			if (! before_fsave()){
				break;
			}
			if (!PageX.isChanged()){
      			alert("没有发生更改,不用保存!");
				break;
			}else{
      			var vvRet= PageX.saveBill();
      			if (vvRet == true || vvRet == "true") {
	        		PageX.rewriteToList(null, null, false);
	        		voToolbar.setCallDisabled("fdelete",false);
	        		voToolbar.setCallDisabled("fedit",false);
	        		voToolbar.setCallDisabled("fsave",true);
	        		voFree.setReadOnly(true);
	        		_global_tIsSaved= true;
        			alert("保存成功!");
				}else{
        			_global_tIsSaved= false;
      				alert("保存失败 ,失败的原因是: \n" + vvRet);
				}
    		}
    		break;
    	//-----------------------修改-----------------------------
    	case "fedit":
    		voFree.setReadOnly(false);
    		voToolbar.setCallDisabled("fedit",true);
	      voToolbar.setCallDisabled("fsave",false);
	      voFree.setFieldReadOnly("CO_CODE", true);
	      //voFree.setFieldReadOnly("CO_NAME", true);
    		_global_tIsNew = false;
      		break;
		//-----------------------删除-----------------------------
		case "fdelete":
	  		_global_tIsDeleted= confirm("确定删除？");
  			if (!_global_tIsDeleted) break;
	  		_global_tIsDeleted= before_fdelete();
  			if (!_global_tIsDeleted) break;
	  		_global_tIsDeleted= PageX.deleteBill();
  			if (!_global_tIsDeleted) {
    			alert("删除失败!");
				break;
			}
	  		else{
      			PageX.rewriteToList(null, null, false);
      			voToolbar.setCallDisabled("fdelete",true);
      			alert("删除成功!");      
    		}
    		PageX.newBill();
			set_new_page_value();
    		break;
		//-----------------------退出-----------------------------
  		case "fexit":
    		if (PageX.isChanged()== true){
      			var result = confirm("确实要离开该页面吗? \n  \n 当前页面上的数据已经修改,但没有保存! \n \n 按'确定'离开本页面,按'取消'留在本页面.") ;
				if (result==true){
					window.close();
				}
			}
			else{
      			window.close();
      			if (opener!= null) opener.location.reload();
			}
			break;
  
  		case "fhelp":
    		PageX.showHelp("help/AS/AS_COMPANY.htm");
    		break;		
		
  		}
  	return;
}
//----------------------------------------------------------------------
//在保存数据之前对单位代码的格式进行判断
function before_fsave(){
  	if (!checkEmptyValues()) return false;
  	
    var viCoCodeFirstLevel = parseInt(vsCoCodeLevel.charAt(0));
    var viCoCodeLen= PF.trim(voFree.getValue("CO_CODE")).length;
	var vsParentCoCode= voFree.getValue("PARENT_CO_CODE");
	if(viCoCodeFirstLevel!= viCoCodeLen && vsParentCoCode== ""){
		var voBuf= new StringBuffer();
		voBuf.append("单位代码（");
		voBuf.append(voFree.getValue("CO_CODE"));
		voBuf.append("）找不到父代码，或者代码格式不符合编码要求（");
		voBuf.append(vsCoCodeLevel);
		voBuf.append("）！");
		alert(voBuf.toString());
		return false;
	}
	
    var vsNd= voFree.getValue("ND");
	var viNd= parseInt(vsNd);
    if (viNd > 2025 || viNd< 1900){
      alert("年度值不正确！");
      return false;
    }
    if(PF.isEmpty(voFree.getValue("CO_TYPE_CODE"))){
    	alert("单位类型不能为空！");
    	return false;
    }
    
	if(PageX.isNew() && !isAllowedCoCode(voFree.getValue("CO_CODE"), vsNd)){
		return false;
	}
	 //对某些字段录入非法字段的判断	
    if (verifyInvalidChar()) return false;
		
   	return true;
}
//----------------------------------------------------------------------
//检查是否有非空字段而未填值
function checkEmptyValues(){
	var voMap= new Map();
	voMap.put("CO_CODE", "单位代码");
	voMap.put("CO_NAME", "单位名称");
	voMap.put("ND", "年度");
	voMap.put("MA_COMPANY", "单位部件");
	
	var va2xResult= PageX.checkEmptyValue(voMap);
	if ( !va2xResult[0]){
		alert(va2xResult[1]);
		return false;
	}	
	
	return true;
}	
	
function isHasInvalidChar(sFieldName){
	var vsFieldValue= voFree.getValue(sFieldName);
	if (PF.isEmpty(vsFieldValue)) return false;
	
	var regEx = /[^0-9_-]+/;
	return regEx.test(vsFieldValue); 
}


function verifyInvalidChar(){
	var vbResult= false;
  var vasVerifyFields= ["BANK_ACC", "SHOP_CARD_NO", "POST_CODE", "ND", "LOCA_TELE"];
  var vasVerifyFieldName= ["银行帐号", "营业证号", "邮编", "年度", "电话"]; 
  
  for (var i= 0, j= vasVerifyFields.length; i< j; i++){
  	var vsFieldName= vasVerifyFields[i];
  	var vbHasInvalidChar= isHasInvalidChar(vsFieldName);
  	if (vbHasInvalidChar){
  		alert(vasVerifyFieldName[i]+"中含有非法字符！");
  		vbResult= true;
  	}	
  }	
  return vbResult;	
}			
//----------------------------------------------------------------------
//在删除单位之前所做的处理
	function before_fdelete(){
		var vsCoCode= voFree.getValue("CO_CODE");
    var vsNd= voFree.getValue("ND");
  	if ( !isLowestCoCode(vsCoCode, vsNd))
    	return false;
    if (isQuotByOrg(vsCoCode, vsNd))
      return false;
    return true;
	}
//----------------------------------------------------------------------
//在新增单位之前所做的处理
	function before_fadd(){
		if (PageX.isChanged()== true){
      var vbresult = confirm("当前页面上的数据已经修改,确定不保存？") ;
			if (! vbresult)
        return false;
		}
		return true;
	}
//----------------------------------------------------------------------
//判断单位代码与年度的联合是否唯一
function isAllowedCoCode(sCoCode, sNd){
	var vasnames= new Array("CO_CODE", "ND");
	var vasvalues= new Array(sCoCode, sNd);
    var vsresult= PageX.getRuleDeltaXML("admin-ruleData.MA_COMPANY_IsAllowed", vasnames, vasvalues);

    var viCount= PF.parseInt(vsresult.selectSingleNode("//field").getAttribute("value"));
	if(viCount!= 0){
		alert("单位（单位代码："+ sCoCode+ "---年度："+ sNd+ "）已经存在！！");
      	return false;
	}

    return true;
}
//----------------------------------------------------------------------
//判断一个单位是否为末级单位
//true:是末级单位; false:不是末级单位;
function isLowestCoCode(sCoCode, sNd){
  	var vasnames = new Array("CO_CODE", "ND");
  	var vasvalues = new Array(sCoCode, sNd);
    var voResult= PageX.getRuleDeltaXML("admin-ruleData.MA_COMPANY_IsLowest", vasnames, vasvalues);
		if( PF.parseInt(voResult.selectSingleNode("//field").getAttribute("value")) != "0"  ){
			alert("这个单位（" + sCoCode + "）存在下级单位，如果确实要删除，"
					+ "请先删除其下级单位！");
			return false;
		}
    return true;
  }
//----------------------------------------------------------------------
//判断一个单位是否被组织引用
//true:被组织引用; false:未被组织引用
function isQuotByOrg(sCoCode, sNd){
    var vasnames= new Array("CO_CODE", "ND");
    var vasvalues= new Array(sCoCode, sNd);
    var voResult= PageX.getRuleDeltaXML("admin-ruleData.MA_COMPANY_IsOrg", vasnames, vasvalues);
		if( PF.parseInt(voResult.selectSingleNode("//field").getAttribute("value")) != "0"  ){
			alert("在这个单位（" + sCoCode + "）内已定义了内部机构，如果确实要删除，"
					+ "请先删除这个单位下的内部机构！");
			return true;
		}
  	return false;
  }
  
 

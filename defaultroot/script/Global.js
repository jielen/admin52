var msg;

function globalinit(){
    var vsGrantedUser= document.getElementById("svRealUserIDID").value;
    var viCount= queryGrantByGrantedUser(vsGrantedUser);
    if (viCount== 0){
			document.getElementById("svUserIDID").style.display="none";
      document.getElementById("svUserIDCaptionID").style.display="none";
      document.getElementById("svUserNameID").style.display="none";
      document.getElementById("svUserNameCaptionID").style.display="none";
      document.getElementById("svUserIDForeignIMGID").style.display="none";
    }
    
    var isUsedRpCompanySpan = document.getElementById("svRpUseFlgCaptionID");
    if((isUsedRpCompanySpan == undefined) || (isUsedRpCompanySpan == null)){
			return;
		}else{
    	var isUsedRpCompanyTD = isUsedRpCompanySpan.parentElement;
    	var isUsedRpCompanyTR = isUsedRpCompanyTD.parentElement;
    	isUsedRpCompanyTR.style.display="none";
    	if(bHasRP){
			var pNames = new Array();
			pNames[0] = "OPT_ID";
			var pValues = new Array();
			pValues[0] = "OPT_RP_ITEM_05";
			getDBData("gmap-global.GET_OPT_RP_ITEM_05", pNames, pValues, "re_svRpUseFlg");
		}		
		}
}

function re_svRpUseFlg(result){
	if (result.getAttribute("success") == "false"){
      alert(result.childNodes[0].nodeValue);
   } else {
			var entity = result.firstChild.firstChild;
			var isUsedRpCompany = entity.childNodes(0).getAttribute("value");
			if (isUsedRpCompany == "N"){
    		document.getElementById("svRpCoCodeCaptionID").parentElement.parentElement.style.display="none";
    		document.getElementById("svRpCoNameCaptionID").parentElement.parentElement.style.display="none";
    		document.getElementById("svRpUseFlgID").value = "N";
    	}
    	else {
    		document.getElementById("svRpUseFlgID").value = "Y";
   		}
   }
}

function svCoCode_Change(element){
	alert("in svCoCode_Change:" + event.srcElement.getAttribute("value"));
}

function queryGrantByGrantedUser(grantedUser){
  var vasNames= new Array("userId");
  var vasValues= new Array(grantedUser);
  var voRetRoot= requestData("queryGrantByGrantedUser", "all", vasNames, vasValues);
  var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
  xmlDom.loadXML(voRetRoot.xml);
  var viCount= xmlDom.selectSingleNode("//field[@name='COUNT']").getAttribute("value");
  return viCount;
}

function OK(){
  var doc = document.getElementById("fields");
  var checked = document.getElementById("checkID").checked;
  var field;
  var result = "<entity>";
  var cookieStr = '<entity>';
  var display = "";
  for(var i = 0; i < doc.childNodes.length; i++){
    field = doc.childNodes(i);
    var fieldName = field.getAttribute("field");

    var tmp = document.getElementById(fieldName + "ID");
    var name = document.getElementById(fieldName + "CaptionID").innerHTML;
    var value = tmp.getAttribute("value");

    result += "<field name='" + fieldName + "' value='" +
              value + "'";
    cookieStr += '<field name="' + fieldName + '" value="' +
                 value + '"';
    if(field.getAttribute("display") == "bottom"){
      if(fieldName != "svTransDate" && fieldName != "svCoCode" &&
					fieldName != "svCoName" && fieldName != "svUserID"){
        display += name + ":" + value + "  ";
      }
      cookieStr += ' disp="1"';
    }
    result += "/>";
    cookieStr += '/>';
  }
  result += "<field name='checkID' value='";
  if(document.getElementById("checkID").checked)
    result += "1'/>";
  else
    result += "0'/>";
  cookieStr += '<field name="checkID" value="';
  if(document.getElementById("checkID").checked)
    cookieStr += '1"/>';
  else
    cookieStr += '0"/>';
  result += "</entity>";
  cookieStr += '<field name="displayID" value="' + display + '"/>';
  cookieStr += '</entity>';
  
  display = "单位代码:" + document.getElementById("svCoCodeID").value + "  ";
	display += "单位名称:" + document.getElementById("svCoNameID").value + "  ";
	
	var svOrgCode = document.getElementById("svOrgCodeID");
  if(svOrgCode != null){
    result = "内部机构代码:" + svOrgCode.value + "  ";
  }
  var svOrgName = document.getElementById("svOrgNameID");
  if(svOrgName != null){
    result += "内部机构名称:" + svOrgName.value + "  ";
  }
  var svAccountId = document.getElementById("svAccountIdID");
  if(svAccountId != null){
    result += "帐套代码:" + svAccountId.value + "  ";
  }
  var ACCOUNT_NAME = document.getElementById("svAccountNameID");
  if(ACCOUNT_NAME != null){
    result += "帐套名称:" + ACCOUNT_NAME.value + "  ";
  }
  var transDateId = document.getElementById("svTransDateID");
  if(transDateId != null){
    result += "业务日期:" + transDateId.value + "  ";
  }
  var svFiscalYear = document.getElementById("svFiscalYearID");
  if(svFiscalYear != null){
    result += "会计年度:" + svFiscalYear.value + "  ";
  }
  var svFiscalPeriod = document.getElementById("svFiscalPeriodID");
  if(svFiscalPeriod != null){
    result += "会计期间:" + svFiscalPeriod.value + "  ";
  }
  var svNd = document.getElementById("svNdID");
  if(svNd != null){
    result += "年度:" + svNd.value + "  ";
  }
  var svRpType = document.getElementById("svRpTypeID");
  if(svRpType != null && svRpType.value != "null"){
    result += "表套代码:" + svRpType.value + "  ";
  }
  var svRpTypeName = document.getElementById("svRpTypeNameID");
  if(svRpTypeName != null && svRpTypeName.value != "null"){
    result += "表套名称:" + svRpTypeName.value + "  ";
  }
  var svPoCode = document.getElementById("svPoCodeID");
  if(svPoCode != null && svPoCode.value.length > 0){
    result += "职位代码:" + svPoCode.value + "  ";
  }
  var svPoName = document.getElementById("svPoNameID");
  if(svPoName != null && svPoName.value.length > 0){
    result += "职位名称:" + svPoName.value + "  ";
  }
  var userId = document.getElementById("svUserIdID").value;
  result += "登录帐号:" + userId + "  ";
  var userName = document.getElementById("svUserNameID").value;
  result += "登录帐号名:" + userName + "  ";
  var sysDateId = document.getElementById("svSysDateID");
  if(sysDateId != null){
    result += "系统日期:" + sysDateId.value + "  ";
  }
	display += result;
  
  msg = display + "                    ";
  
  globalcookie = cookieStr;
  
  setCookie(cookieStr);
}

function setCookie(cookie){
  var names = new Array();
  var values = new Array();
  names[0] = "cookie";
  values[0] = cookie;
	var result = requestDataK("saveSession", "all", names, values);
  //if(result == "true") 
  window.returnValue = msg;
  window.close();
}

function deleteCookie(name){
  var exp = new Date();
  exp.setTime (exp.getTime() - 1);
  // This cookie is history
  var cval = getCookie(name);
  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

function CANCEL(){
  msg = document.getElementById("cancelDisplayID").value;
  window.returnValue = msg;
  window.close();
}

function mouseDown(){
  var src = event.srcElement;
  src.style.borderBottom = "#FFFFFF solid 1px";
  src.style.borderLeft = "#666666 solid 1px";
  src.style.borderTop = "#666666 solid 1px";
  src.style.borderRight = "#FFFFFF solid 1px";
}

function mouseUp(){
  var src = event.srcElement;
  src.style.borderBottom = "#666666 solid 1px";
  src.style.borderLeft = "#FFFFFF solid 1px";
  src.style.borderTop = "#FFFFFF solid 1px";
  src.style.borderRight = "#666666 solid 1px";
}

function mouseEnterForeignIMG(){
  var src = event.srcElement;
  src.style.borderBottom = "#666666 solid 1px";
  src.style.borderLeft = "#FFFFFF solid 1px";
  src.style.borderTop = "#FFFFFF solid 1px";
  src.style.borderRight = "#666666 solid 1px";
}

function mouseOutForeignIMG(){
  var src = event.srcElement;
  src.style.border = "#FFFFFF solid 1px";
}

function call_mouseOver() {
  event.srcElement.style.color="#FBDD64";
}

function call_mouseOut() {
  event.srcElement.style.color = "white";
}

function text_Change(){
  changed = true;
}

function date_Change(){
  var doc = event.srcElement;
  if (!date_Check(event.srcElement))
    return;
  var fieldname = doc.getAttribute("fieldname");
  if (eval("typeof " + fieldname + "_Change ==\"function\"")){
    eval(fieldname + "_Change()");
  }
}

function svTransDate_Change(element){
  var names = new Array();
  var values = new Array();

  var transDate = event.srcElement.getAttribute("value");
  var first = transDate.indexOf("-");
  var last = transDate.lastIndexOf("-");
  if(first == last)
    alert("日期格式输入错误！");
  var year = transDate.substring(0, first);
  var month = transDate.substring(first + 1, last);
  var day = transDate.substr(last + 1);
  
  event.srcElement.setAttribute("value", year + "-" + month + "-" + day);
  var oldYear = document.getElementById("svNdID").getAttribute("value");
  if(oldYear != year){
	var setted = false;  
  	var empCode = document.getElementById("svEmpCodeHide").getAttribute("value")
  	var oDelta = getEmpInfo(empCode, year);
  	for (var i= 0, len= oDelta.childNodes.length; i< len; i++){
  	  if(setted){
  		  break;
  	  }
      voEntity= oDelta.childNodes[i];
      if (voEntity== null) continue;
      for (var j= 0; j< voEntity.childNodes.length; j++){
        voField= voEntity.childNodes[j];
        var fieldName = voField.getAttribute("name");
        var fieldValue = voField.getAttribute("value");
        var elementId = null;
        if(fieldName == "CO_CODE"){
        	elementId = "svCoCodeID";
        }else if(fieldName == "CO_NAME"){
        	elementId = "svCoNameID";
        }else if(fieldName == "ORG_CODE"){
        	elementId = "svOrgCodeID";
        }else if(fieldName == "ORG_NAME"){
        	elementId = "svOrgNameID";
        }else if(fieldName == "POSI_CODE"){
        	elementId = "svPoCodeID";
        }else if(fieldName == "POSI_NAME"){
        	elementId = "svPoNameID";
        }
        if(elementId == null) continue;
        document.getElementById(elementId).setAttribute("value",fieldValue);
        setted = true;
      }
    }
  }
  
  document.getElementById("svNdID").setAttribute("value",year);
  document.getElementById("svFiscalYearID").setAttribute("value", year);
  var result = requestData2("getPeriod", "all", ['iYea', 'iMont', 'iDa'], [year, month, day]);
  if(null == result){
  	alert("系统出现异常，请与管理员联系");
  	return;
  }
  if("false" == result.getAttribute("success")){
  	alert(result.firstChild.data);
  	return;
  }
  var curPeriod = result.firstChild.data;
  document.getElementById("svFiscalPeriodID").setAttribute("value", curPeriod);
  
}

function getEmpInfo(empCode, nd){
	var sql = "gmap-common.getPosiOrgCoCode";
    var vasName = new Array();
    var vasValue = new Array();
    vasName[0] = "empCode";
    vasValue[0] = empCode;
    vasName[1] = "nd";
    vasValue[1] = nd;
    return qryData(sql, vasName, vasValue); 
}

function Date_Select(name){
  var doc = document.getElementById(name + "ID");
  var srcID=name + "ID";
  var srcPaObj = event.srcElement.parentElement;
  var src=srcPaObj.all(srcID);
  //if (!src.isContentEditable) return;
  if (src.disabled) return;
  autoDateInput(src);
}

var coCode = "";
var orgCode = "";
var userId = "";
var nd = "";
var realUserId = "";
var condition = "";
var sqlid = "";

function setGlobalValues(){
	realUserId= document.getElementById("svRealUserIDID").value; 
  userId = document.getElementById("svUserIDID").value; 
   
  var company = document.getElementById("svCoCodeID");
  if(company){
    coCode = company.getAttribute("value");
  }

  var orgCodeObj= document.getElementById("svOrgCodeID");
  if (orgCodeObj!= null)
    orgCode= orgCodeObj.value;
  
  nd= document.getElementById("svNdID").value;    	
}

function foreign_Select(foreign){
  if (foreign == ""){
    alert("没有foreing的Name属性。");
    return;
  }
  setGlobalValues();
  
 
  if(foreign == "MA_CP_MA_CO_ACC"){
		selectCoAcc();
  }else if(foreign == "AS_COMPANY"){
  	selectAsCompany();
  }else if(foreign == "AS_ORG"){
    selectAsOrg();
  }else if(foreign == "AS_ORG_POSITION_V"){
		selectOrgPosition();
  }else if (foreign== "RP_RPT_TYPE"){
    selectRptType();
  }else if (foreign== "AS_USER_GRANT"){
  	selectUserGrant();
  }else if (foreign== "RP_COMPANY"){
		selectRpCompany(); 	
  }

  var sfieldname = event.srcElement.getAttribute("fieldname");
  var fieldEle = document.getElementById(sfieldname + "ID");
  if (!fieldEle.isContentEditable) return;

  var d = new Date();
  win_select = showModalDialog("dispatcher.action?function=selectPage&componame="
      + foreign + "&condition=" + condition + "&ismulti=n" + "&sqlid=" + sqlid +
      "&d=" + d.getMilliseconds()+ "&isGlobal=Y",
      new Array(window, null, "true", "", "true"),
      "resizable:no;status:no");

  if (win_select){
    changed = true;
    if(foreign == "AS_COMPANY"){
			selectAsCompanyReply(foreign);
    }
    if(foreign == "AS_ORG"){
			selectAsOrgReply(foreign);
    }
   //启用报表单位树情况：改变平台单位或年度或账套时候，报表单位跟随过滤显示 guoshang  2010/01/27  	
  	if(foreign == "MA_CP_MA_CO_ACC"){
		  selectAsAccountReply(foreign);
    }  
    names = win_select[0];
    values = win_select[1];
    var name = null;
    var foreignFields = document.getElementById(foreign + "fields").childNodes;
    for (var i=foreignFields.length-1; i>=0; i--){
      alias = foreignFields.item(i).getAttribute("alias");
      name = foreignFields.item(i).getAttribute("name");
      for (var m=0,n=names.length; m<n; m++){
        if (names[m] == alias){
          var element = document.getElementById(name + "ID");
          element.setAttribute("value", values[m]);
          break;
        }
      }
    }
    
    if(foreign== "AS_USER_GRANT"){
			processGrantSelect();
    }

  }
}

function selectAsCompany(){
	if (!nd || nd.length== 0){
  		alert("请先填了年度后，再选择单位！");
  		return;
  }	
  var temp = document.getElementById("svEmpCodeHide").getAttribute("value");
  if(temp.toUpperCase() == "SA"){
  	condition = "nd=" + nd;
  }else{
  	condition = "temp=" + temp;
  	condition += ";nd=" + nd;
  }
 sqlid = "gmap-global.getDataFromAS_COMPANY";
}

function selectCoAcc(){
  if(!coCode || coCode.length == 0){
    alert("请先输入单位代码后，再选择账套号！");
    return;
  }else{
  	condition = "coCode=" + coCode;
  	condition += ";nd=" + nd;
  }
  sqlid = "gmap-global.getDataFromMA_CO_ACC"
}

function selectAsOrg(){
	if(!coCode || coCode.length == 0){
    alert("请先选择单位代码后，再选择内部机构！");
    return;
  }else{
    var temp = document.getElementById("svEmpCodeHide").getAttribute("value");
    if(temp.toUpperCase() == "SA"){
    	condition = "coCode=" + coCode;
    	condition += ";nd=" + nd;
    }else{
    	condition = "temp=" + temp;
    	condition += ";coCode=" + coCode;
    	condition += ";nd=" + nd;
    }
  }
  
  sqlid = "gmap-global.getDataFromSELECT_AS_ORG";
  
}

function selectOrgPosition(){
	if(!coCode || coCode.length == 0){
		alert("请先输入单位代码!");
    return;
	}
	   
	condition = "coCode=" + coCode;
	condition += ";orgCode=" + orgCode;
	condition += ";nd=" + nd;
	condition += ";userId=" + userId;

  	sqlid = "gmap-global.getDataFromV_AS_ORG_POSITION";
}

function selectRptType(){
    condition = "";
  	sqlid = "gmap-global.getDataFromRP_RPT_TYPE";
}

function selectUserGrant(){
  var svSysDate= document.getElementById("svSysDateID").value;
  condition = "GRANTED_USER=" + realUserId + ";GRANT_START_DATE=" + svSysDate + ";GRANT_END_DATE=" + svSysDate;
  sqlid = "gmap-global.getDataFromAS_USER_GRANT";
}

function selectRpCompany(){
  if(!coCode || coCode.length == 0){
    alert("请先输入单位代码后，再选择报表单位代码！");
    return;
  }else{
    condition = "ND=" + nd + ";CO_CODE="+ coCode;
    sqlid = "gmap-global.getDataFromRP_COMPANY";
  } 
}

function selectAsCompanyReply(foreign){
      var accountId = document.getElementById("svAccountIdID");
      var accountName = document.getElementById("svAccountNameID");
      var posiId = document.getElementById("svPoCodeID");
      var posiName = document.getElementById("svPoNameID");
      var orgCode = document.getElementById("svOrgCodeID");
      var orgName = document.getElementById("svOrgNameID");
      var rpType = document.getElementById("svRpTypeID");
      var rpTypeName = document.getElementById("svRpTypeNameID");
      if(accountId != null)
        accountId.setAttribute("value", "");
      if(accountName != null)
        accountName.setAttribute("value", "");
      if(posiId != null)
        posiId.setAttribute("value", "");
      if(posiName != null)
        posiName.setAttribute("value", "");
      if(orgCode != null)
        orgCode.setAttribute("value", "");
      if(orgName != null)
        orgName.setAttribute("value", "");
        
      //带出机构代码、机构名称
      names = win_select[0];
      values = win_select[1];
      var name = null;
      var foreignFields = document.getElementById(foreign + "fields").childNodes;
      for (var i=foreignFields.length-1; i>=0; i--){
        alias = foreignFields.item(i).getAttribute("alias");
        name = foreignFields.item(i).getAttribute("name");
        for (var m=0,n=names.length; m<n; m++){
          if (names[m] == alias){
            var element = document.getElementById(name + "ID");
            element.setAttribute("value", values[m]);
            break;
          }
        }
      }
      
      var company = document.getElementById("svCoCodeID");
      var newCompanyId = null;
      if(company){
        newCompanyId = company.getAttribute("value");
      }
      var temp = document.getElementById("svEmpCodeHide").getAttribute("value");
      
      //if(temp.toUpperCase() == "SA"){
      //  sql ="select ORG_CODE, ORG_NAME from AS_ORG where AS_ORG.CO_CODE='" + newCompanyId + "' and AS_ORG.nd="+ nd ;
      //}else{
      //  sql ="select ORG_CODE, ORG_NAME from AS_ORG where AS_ORG.ORG_CODE in(select distinct AS_EMP_POSITION.ORG_CODE from ";
      //  sql = sql + "AS_EMP_POSITION where AS_EMP_POSITION.EMP_CODE='";
      //  sql = sql + temp + "' and AS_EMP_POSITION.CO_CODE='" + companyId + "')";
      //  sql = sql + " and AS_ORG.CO_CODE='" + newCompanyId + "' and AS_ORG.nd="+ nd;
      //}
      
      var sql = "gmap-global.getDataFromSELECT_AS_ORG";
      var vasName = new Array();
      var vasValue = new Array();
      vasName[0] = "coCode";
      vasValue[0] = newCompanyId;
      vasName[1] = "nd";
      vasValue[1] = nd;
      if(temp.toUpperCase() != "SA"){
      	vasName[2] = "temp";
      	vasValue[2] = temp;
    	}
      var voDomElement= qryData(sql, vasName, vasValue);
      
      var vaoInvertData= getInvertDataFormat(voDomElement);
      var names = vaoInvertData[0];
      var value = vaoInvertData[1];
      if(value != null && value[0] != null){
      	var newOrgCode = "";
      	var newOrgName = "";
      	for(var i = 0; i < names.length; i++){
      		if(names[i] == "ORG_CODE")
        		newOrgCode = value[0][i];
        	else if(names[i] == "ORG_NAME")
        		newOrgName = value[0][i];
      	}
        //alert(orgCode + " " + orgName);
        if(orgCode != null)
          orgCode.setAttribute("value", newOrgCode);
        if(orgName != null)
          orgName.setAttribute("value", newOrgName);
      }
      
      selectAsOrgReply(foreign);
      
      //改变平台单位或年度或账套时候，报表单位跟随过滤显示 guoshang  2010/01/27              
      if (document.getElementById("svRpCoCodeID") && document.getElementById("svRpUseFlgID").value == "Y")
      	setRpCo(nd);
    }
function selectAsOrgReply(foreign){
    	var accountId = document.getElementById("svAccountIdID");
      var accountName = document.getElementById("svAccountNameID");
      var posiId = document.getElementById("svPoCodeID");
      var posiName = document.getElementById("svPoNameID");
      var orgCode = document.getElementById("svOrgCodeID");
      var orgName = document.getElementById("svOrgNameID");
      var rpType = document.getElementById("svRpTypeID");
      var rpTypeName = document.getElementById("svRpTypeNameID");
      if(accountId != null)
        accountId.setAttribute("value", "");
      if(accountName != null)
        accountName.setAttribute("value", "");
      if(posiId != null)
        posiId.setAttribute("value", "");
      if(posiName != null)
        posiName.setAttribute("value", "");
      
      //带出帐套代码、帐套名称
      var company = document.getElementById("svCoCodeID");
      var newCompanyId = null;
      if(company){
        newCompanyId = company.getAttribute("value");
      }
      sql = "gmap-global.getDataFromMA_CO_ACC";
      
      var vasName = new Array();
      var vasValue = new Array();
      vasName[0] = "coCode";
      vasValue[0] = newCompanyId;
      vasName[1] = "nd";
      vasValue[1] = nd;
      var voDomElement= qryData(sql, vasName, vasValue);
      var vaoInvertData= getInvertDataFormat(voDomElement);
      var names = vaoInvertData[0];
      var value = vaoInvertData[1];
      if(value != null && value[0] != null){
      	var newAccountId = "";
      	var newAccountName = "";
      	for(var i = 0; i < names.length; i++){
      		if(names[i] == "ACCOUNT_ID")
        		newAccountId = value[0][i];
        	else if(names[i] == "ACCOUNT_NAME")	
        		newAccountName = value[0][i];
      	}
      
        if(accountId != null)
          accountId.setAttribute("value", newAccountId);
        if(accountName != null)
          accountName.setAttribute("value", newAccountName);
      }      
      
    //带出表套代码、表套名称
    if(bHasRP){
      if(rpType != null){
        var temp = document.getElementById("svEmpCodeHide").getAttribute("value");
        //if(temp.toUpperCase() == "SA"){
        //  sql = "select RP_TYPE_CODE, RP_TYPE_NAME from RP_RPT_TYPE where 0=0";
        //}else{
        //  sql = "select RP_TYPE_CODE, RP_TYPE_NAME from RP_RPT_TYPE where RP_RPT_TYPE.RP_TYPE_CODE like '%' "
        //}
        sql = "gmap-global.getDataFromRP_RPT_TYPE";
        var vasName = new Array();
        var vasValue = new Array();

        var voDomElement= qryData(sql, vasName, vasValue);
        var vaoInvertData= getInvertDataFormat(voDomElement);
        var names = vaoInvertData[0];
        var value = vaoInvertData[1];
        if(value != null && value[0] != null){
        	var newRpType = "";
        	var newRpTypeName = "";
        	for(var i = 0; i < names.length; i++){
          	if(names[i] == "RP_TYPE_CODE")
          		newRpType = value[0][i];
          	else if(names[i] == "RP_TYPE_NAME")
          		newRpTypeName = value[0][i];
        	}
          if(rpType != null)
            rpType.setAttribute("value", newRpType);
          if(rpTypeName != null)
            rpTypeName.setAttribute("value", newRpTypeName);
        }
      }
    }
      
      //带出职位代码、职位名称
      names = win_select[0];
      values = win_select[1];
      var name = null;
      var foreignFields = document.getElementById(foreign + "fields").childNodes;
      for (var i=foreignFields.length-1; i>=0; i--){
        alias = foreignFields.item(i).getAttribute("alias");
        name = foreignFields.item(i).getAttribute("name");
        for (var m=0,n=names.length; m<n; m++){
          if (names[m] == alias){
            var element = document.getElementById(name + "ID");
            element.setAttribute("value", values[m]);
            break;
          }
        }
      }
      
      var orgCode = document.getElementById("svOrgCodeID");
      var newOrgCodeId = null;
      if(orgCode){
        newOrgCodeId = orgCode.getAttribute("value");
      }
      var temp = document.getElementById("svEmpCodeHide").getAttribute("value");  	  
  	  var sql = "gmap-global.getDataFromV_AS_ORG_POSITION";
      var vasName = new Array();
      var vasValue = new Array();
      vasName[0] = "coCode";
      vasValue[0] = newCompanyId;
      vasName[1] = "orgCode";
      vasValue[1] = newOrgCodeId;
      vasName[2] = "nd";
      vasValue[2] = nd;
      vasName[2] = "userId";
      vasValue[2] = userId;      
      var voDomElement= qryData(sql, vasName, vasValue);
      
      var vaoInvertData= getInvertDataFormat(voDomElement);
      var names = vaoInvertData[0];
      var value = vaoInvertData[1];
      if(value != null && value[0] != null){
      	var newPoCode = "";
        var newPoName = "";
        for(var i = 0; i < names.length; i++){
        	if(names[i] == "POSI_CODE")
        		newPoCode = value[0][i];
        	else if(names[i] == "POSI_NAME")
        		newPoName = value[0][i];
      	}
        if(posiId != null)
          posiId.setAttribute("value", newPoCode);
        if(posiName != null)
          posiName.setAttribute("value", newPoName);
      }
    }

function processGrantSelect(){
    //var vsUserId= document.getElementById("svUserIDID").value;
    //document.location.href="Proxy?function=setgrantglobal&userId=" + vsUserId;
}


function date_Check(element){
  var src = element;
  var value = src.value;
  if (value == "") return true;
  result = true;
  pattern = /\b((19|20)\d{2})[\-\/](1[0-2]|0?[1-9])[\-\/](0?[1-9]|[12][0-9]|3[01])/;
  var fieldname = element.getAttribute("fieldname");
  var tablename = element.getAttribute("tablename");
  var fieldcaption = document.getElementById(tablename + "_"
      + fieldname + "CaptionID");
  var caption = fieldname;
  if (fieldcaption != null)
    caption = fieldcaption.innerHTML;
  if (pattern.test(value) == false){
    alert("“" + caption + "”的日期格式无效。");
    result = false;
  }else {
  //找分隔符
    first = value.indexOf("-");
    last = value.lastIndexOf("-");
    x1 = value.indexOf("/");
    x2 = value.lastIndexOf("/");
    var fir,sec;
    if (first == -1) {
      sec = x2;
      fir = x1
    } else if (x1 == -1) {
      sec = last;
      fir = first;
    } else if (x1 >first) {
      sec = x1;
      fir = first;
    } else {
      sec = first;
      fir = x1;
    }

    var year,month,day;
    year = parseInteger(value.substring(0, fir));
    month = parseInteger(value.substring(fir + 1, sec));
    day = parseInteger(value.substring(sec + 1, value.length));
    var daysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (((year % 4 ==0)&&(year % 100 !==0))||(year % 400 ==0))//闰年
      daysOfMonth[1] = 29;
    if (day > daysOfMonth[month-1]) {
      alert("“" + caption + "”的日期无效。");
      result = false;
    }
    strYear = value.substring(0, fir);
    strMonth = value.substring(fir + 1, sec);
    strDay = value.substr(sec + 1);
    if(fir == sec)
      alert("“" + caption + "”的日期数据无效。");
    if(strMonth.length == 1)
      strMonth = "0" + strMonth;
    if(strDay.length == 1)
      strDay = "0" + strDay;
    element.value = strYear + "-" + strMonth + "-" + strDay;
  }
  return result;
}

function getInvertDataFormat(oDelta){
	var vaoResult= new Array();

  var voEntity= null;
  var voField= null;
  var vasField= new Array();
  var vaxxsValue= new Array();
  for (var i= 0, len= oDelta.childNodes.length; i< len; i++){
    voEntity= oDelta.childNodes[i];
    if (voEntity== null) continue;
    vaxxsValue[i]= new Array();
    for (var j= 0; j< voEntity.childNodes.length; j++){
      voField= voEntity.childNodes[j];
      if (i== 0){
        vasField[j]= voField.getAttribute("name");
      }
      vaxxsValue[i][j]= voField.getAttribute("value");
    }
  }
  vaoResult[0]= vasField;
  vaoResult[1]= vaxxsValue;
  return vaoResult;
}

//改变平台单位或年度或账套时候，报表单位跟随过滤显示 guoshang  2010/01/27        
function selectAsAccountReply(foreign) {  
      names = win_select[0];
      values = win_select[1];
      var name = null;
      var foreignFields = document.getElementById(foreign + "fields").childNodes;
      for (var i=foreignFields.length-1; i>=0; i--){
        alias = foreignFields.item(i).getAttribute("alias");
        name = foreignFields.item(i).getAttribute("name");
        for (var m=0,n=names.length; m<n; m++){
          if (names[m] == alias){
            var element = document.getElementById(name + "ID");
            element.setAttribute("value", values[m]);
            break;
          }
        }
      }
      if (document.getElementById("svRpCoCodeID") && document.getElementById("svRpUseFlgID").value == "Y")
      	setRpCo(nd);	
}    

//启用报表单位树情况：改变平台单位或年度或账套时候，报表单位跟随过滤显示 guoshang  2010/01/27
function setRpCo(nd){
    var newCoCodeId = document.getElementById("svCoCodeID");
    var newCoCodeIdID="";
    if(newCoCodeId){
      newCoCodeIdID = newCoCodeId.getAttribute("value");
    }    	
    var newAccountId = document.getElementById("svAccountIdID");
    var newAccountIdID = "";
    if(newAccountId){
      newAccountIdID = newAccountId.getAttribute("value");
    } 	
		var rpCoCode = document.getElementById("svRpCoCodeID");
    var rpCoName = document.getElementById("svRpCoNameID");  
    if(rpCoCode != null)
        rpCoCode.setAttribute("value", "");
    if(rpCoName != null)
      rpCoName.setAttribute("value", "");
		var names = new Array();
  	var values = new Array();	
	  names=["ND","CO_CODE","ACCOUNT_ID"];
  	values=[nd,newCoCodeIdID,newAccountIdID];  	  	
  	var xmldom = qryData("gmap-global.getDataAS_GET_GLOBAL_RPCODE", names, values);
  	if (xmldom.hasChildNodes){
		var sValue1 = xmldom.childNodes[0].firstChild.getAttribute("value");
		var sName1 = xmldom.childNodes[0].firstChild.getAttribute("name");
		var sValue2 = xmldom.childNodes[0].firstChild.nextSibling.getAttribute("value");
		var sName2 = xmldom.childNodes[0].firstChild.nextSibling.getAttribute("name");
		if("RP_CODE"== sName1){	
      if(rpCoCode != null)
        rpCoCode.setAttribute("value", sValue1);
		}else{
			if("RP_NAME"== sName1){	
      	if(rpCoName != null)
        	rpCoName.setAttribute("value", sValue1);
			}else{
				if(rpCoCode != null)
        	rpCoCode.setAttribute("value", sValue2);
			}
		}
		if("RP_NAME"== sName2){	
      if(rpCoName != null)
        rpCoName.setAttribute("value", sValue2);
		}
	}
}
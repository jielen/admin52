
var MAX_ROW_NUM2=10;
var MAX_DRAFT_NUM2=1000;
var iWidth= screen.availWidth- 10;
var iHeight= screen.availHeight- 30;

var product_map = {"BI":"GK",
									 "DP":"GK",
									 "CP":"GK",
									 "AM":"GK"
									 };
var v51Products = ["GL","CU","GF","BG","RP","PR","FA","DB","PD","BD","NT","BM","HD","MOM","ZC","BF","TR"];

function getProductCode(compoId){
  var dotPos= compoId.indexOf("_");
  var productCode= compoId.substring(0, dotPos);
  return productCode;
}

function fgetEditPage(instanceId,condition,compoId, wfStatus, tableName, url){
  var productCode= getProductCode(compoId);
  var vsURL = url;
  if(!vsURL){
	if (isV51Product(productCode)) {
  	  var newCon = parseConditionTo51(condition, tableName);
	  vsURL = "/"+ productCode + "/portlet.jsp?function=geteditpage"
	    					+ "&componame=" + compoId + "&fieldvalue=" + compoId + "_E"
	    					+ "&condition=" + newCon    
	    					+ "&" +WFConst.PROCESS_INST_ID_FIELD + "=" + instanceId;  	
    } else {
		vsURL = "/" + getProductCode(compoId) 
						+ "/getpage_" + compoId +".action?" 
						+ "function=geteditpage"
						+ "&componame=" + compoId
						+ "&condition=" + condition
						+ "&workFlowStatus=" + wfStatus;  	
    }
  }
  if(TOKEN && TOKEN!= "null" && vsURL.indexOf("token") < 0){
		if(vsURL.indexOf("?") < 0){
			vsURL+= "?";
		}else{
			vsURL+= "&";
		}
	    vsURL+= "token=" + TOKEN;
	  }		
	/*
  var otherURL;
  if (eval("typeof "+compoId+"_openbill_url==\"function\"")){
	  otherURL =eval(compoId+"_openbill_url(instanceId)");
  }else{
  	otherURL = "condition=" + condition;
  }
  vsURL += "&" + otherURL;
  if(TOKEN!= "null"){
    vsURL+= "&token=" + TOKEN;
  }
  */
  var vsStyle= "menubar= no, toolbar= no, scrollbars=no, "
    + "resizable= yes, titlebar= yes, "
    + "left=0px, top=0px, "
    + "width="+iWidth+"px, height="+iHeight+"px";
  window.open(vsURL,"",vsStyle);
}
function fgetDraftList(compoId, url){
	var vsURL = url;
	if(!vsURL){
		var productCode = getProductCode(compoId);
		if (isV51Product(productCode)) {
			vsURL = "/"+getProductCode(compoId)+ "/portlet.jsp?function=getlistpage&condition="
			+ "&componame="+ compoId
			+"&listtype=WF_COMPO_DRAFT";		
		} else {
			vsURL = "/"+productCode+ "/getpage_" + compoId + ".action?function=getlistpage"
  						 +"&componame=" + compoId
    						 +"&condition=" + encodeURIComponent("listtype=WF_COMPO_DRAFT;componame="+compoId);		
		}
	}
	
	if(TOKEN && TOKEN!= "null" && vsURL.indexOf("token") < 0){
		if(vsURL.indexOf("?") < 0){
			vsURL+= "?";
		}else{
			vsURL+= "&";
		}
	    vsURL+= "token=" + TOKEN;
	  }	
  var vsStyle= "menubar= no, toolbar= no, scrollbars=no, "
    + "resizable= yes, titlebar= yes, "
    + "left=0px, top=0px, "
    + "width="+iWidth+"px, height="+iHeight+"px";
  window.open(vsURL,"",vsStyle);
}

function deleteDraft(compoId,instanceId){
  var vasParamName = new Array("compoId", "instanceId");
  var vasParamValue = new Array(compoId, instanceId);
  var productCode = getProductCode(compoId);
	var funName = product_map[productCode] + "_setWFConfigs";
	try {
		var func = eval(funName);
		if (typeof(func) == "function") {
			func.call(this, "deletedraft", "deleteDraftAndEntity", compoId);
		}
	} catch (error){}
	var actionName = PageX.getWfAction(WFConst.DELETEDRAFT);
	var doc = null;
	if (isV51Product(productCode)) {
	  var url = "url="+encodeURIComponent("/XmlProxy");
	  if(TOKEN && TOKEN!= "null"){
	    url+= "&token=" + TOKEN;
	  }
	  doc = requestDataFor51(actionName, compoId, vasParamName, vasParamValue,"/"+productCode+ "/portlet.jsp?"+url);
	} else {
		  doc = Info.requestData(actionName, compoId, vasParamName, vasParamValue,"/" + productCode);
	}
	alert("删除成功!");
	window.location.reload();
}

function newAndCommit(compoId,instanceId,userId,title,condition){  
  var compoData = makeDelta(instanceId,condition);
  
  var produceCode = getProductCode(compoId);
	var funName = product_map[produceCode] + "_setWFConfigs";
	try {
		var func = eval(funName);
		if (typeof(func) == "function") {
			 func.call(this, "newcommit", "wfNewCommit", compoId);
		}
	} catch(error){}
	var actionName = PageX.getWfAction(WFConst.NEWCOMMIT);
	var result = "";
	if (isV51Product(produceCode)) {
		var url = "url="+encodeURIComponent("/XmlProxy");
		if(TOKEN && TOKEN!= "null"){
			url+= "&token=" + TOKEN;
		}
		result = newInstCommitFor51(actionName, compoId, compoData, userId, "/"+produceCode+ "/portlet.jsp?"+url);
	} else {
		result = PageX.newInstCommit(compoId, compoData, userId, "/" + produceCode + "/" + actionName + ".action");
	}
	try {
	  var n = parseInt(result);
	  if("success"==result ||(!isNaN(n) && (n > 0))){
	    result = title + "送审成功!";
	  }
	} catch (Error) {};
  alert(result);
  window.location.reload();
}
function makeDelta(instanceId,condition){
  var compoData = PF.getFieldXml("PROCESS_INST_ID", instanceId);
  var conds = new Array();
  var nameValue = new Array();
  if(condition){
    while(condition.indexOf("'")>-1){
      condition = condition.replace("'","");//去掉单引号
    }
    conds = condition.split(";");
    for(i=0;i<conds.length;i++){
      nameValue = conds[i].split("=");//以=为分隔
      var fieldName = nameValue[0];
      if(fieldName){
        var ind = fieldName.indexOf(".");
        if(ind>-1){//去掉表名
          nameValue[0] = fieldName.substr(ind+1,fieldName.length-ind);
        }
      }
      compoData += PF.getFieldXml(nameValue[0], nameValue[1]);
    }
  }
  compoData = PF.getWraptXml("entity", compoData);
  compoData = PF.getWraptXml("delta", compoData);
  return compoData;
}

function switchImg(compoId,MAX_ROW_NUM){
  var imgPath ="/style/img/main/";
  var minus="minus.gif";
  var plus="plus.gif";
  if(event.srcElement.src.indexOf(minus)>-1){  //minus
    setDisplay(compoId,0);
    event.srcElement.src=imgPath + plus;
  }else{  //plus
    setDisplay(compoId,MAX_ROW_NUM);
    event.srcElement.src=imgPath + minus;
  }
}
function fshowMore(compoId,MAX_DRAFT_NUM){
   setDisplay(compoId,MAX_DRAFT_NUM);
}

//setDisplay(id,0):  all invisiable
//setDisplay(id,MAX_ROW_NUM):  n rows visiable
//setDisplay(id,MAX_INSTANCE_NUM):  all visiable
function setDisplay(id,count){
  var collections = document.all;
  var fullId="TR_"+id+"-";
  var jid=0;
  var maxId= fullId+PF.formatNum2Str(MAX_DRAFT_NUM2,4);
  for(var i=0;i<MAX_DRAFT_NUM2;i++){
    var longId = fullId+PF.formatNum2Str(i,4);
    var element = document.getElementById(longId);
    if(element){
      if(i>=count){
        element.style.display="none";
      }else{
        element.style.display="";
      }
    }else{
      break;
    }
  }
  var moreId = fullId +"MORE";
  var moreElement = document.getElementById(moreId);
  if(moreElement){
    if(count==0){
      moreElement.style.display="none";
    }else{
      moreElement.style.display="";
    }
  }  
}

function showTips(tips, flag,oSender) {
  var tb = document.all.tipsbox;
  if(flag) {
     tb.style.display = "";
     tb.innerHTML = tips;
     tb.style.left = event.clientX - 75;
     tb.style.top = event.clientY + 20;
     oSender.style.borderWidth=1;
  } else {
    tb.style.display = "none";
    oSender.style.borderWidth=0;
  }
}

function isV51Product(productCode){
  for(var i = 0; i < v51Products.length; i++){
  	if(productCode == v51Products[i])
  		return true;
  }
  return false;	
}

function parseConditionTo51(condition, tableName) {
	var newCon = "";
	var array = condition.split(";");  
	for (var i = 0; i < array.length; i++) {
		var temp = array[i].split("=");
		newCon += tableName + "." + temp[0] + "=" + "'" + temp[1] + "'" + " and ";
	}
	if (newCon.length > 0) {
		newCon = newCon.substring(0, newCon.length - 4);
	}
	return newCon;
}

function requestDataFor51(sFunction, sCompoName, asParamName, asParamValue, sURL){
  //alert("Information_requestDataK();");
  if (false && window.__pageStatus!= null && window.__pageStatus!= "complete"){
  	alert("页面尚未初始化完成,不能向服务器提交请求.");
  	return;
  }
	if (PF.isEmpty(sURL)) sURL= BASE_URL + "/XmlProxy";
	var voBuf= new StringBuffer();
	voBuf.append("<?xml version=\"1.0\"?>\n");
	voBuf.append("<root>\n");
	voBuf.append("<function>"+ sFunction+ "</function>\n");
	voBuf.append("<componame>"+ sCompoName+ "</componame>\n");
	if (PF.isEmpty(window.operationID)== false) PageX.sOperationId= window.operationID;
	if (PF.isEmpty(PageX.sOperationId)== false){
	  voBuf.append("<operation>"+ PageX.sOperationId+ "</operation>\n");
	  PageX.sOperationId= null;
	}
	if (PF.isValidArray(asParamName)){
	  var vsName= "";
	  var vsValue= "";
	  for (var i= 0; i< asParamName.length; i++){
	    vsName= asParamName[i];
	    vsValue= asParamValue[i];
	    if (PF.isValidXMLString(vsValue)== false) vsValue= "<![CDATA["+ vsValue+ "]]>";
    	voBuf.append("<"+ vsName+ ">");
    	voBuf.append(vsValue);
    	voBuf.append("</"+ vsName+ ">\n");
	  }
	}
	voBuf.append("</root>\n");
	var vsStream= voBuf.toString();
	voBuf.clear();

	var voXmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	voXmlhttp.Open("POST", sURL, false);
	voXmlhttp.setRequestHeader("Content-Length", vsStream.length);
	voXmlhttp.setRequestHeader("Content-Type","text/xml");
	voXmlhttp.send(vsStream);
	var vsResponseText = voXmlhttp.responseText;
	var voXmldom = new ActiveXObject("Microsoft.XMLDOM");
	voXmldom.loadXML(vsResponseText);
	if (voXmldom== null) return null;
	return voXmldom.documentElement;
}

function newInstCommitFor51(actionName, compoName, compoData, userId, url) {
  var result = "";

  // 1、选择流程模板
  var compoMeta = DataTools.getCompoMeta(compoName);
  var templateId = PageX.getDefaultTemplateId(compoMeta);
  if (!templateId) {
    var vaTemplateData = PageX.getSelectedTemplateDatas(compoName);
    if (vaTemplateData && vaTemplateData.length >= 2)
      templateId = vaTemplateData[1];
  }
  if (!templateId) {
    return "没有适合本张单据的流程模版，无法新建流程。";
  }

  // 2、准备工作流数据

  var wfData = WFInterface.getWFSessionXml().xml;
  var infoAdded =  "<field name=\"WF_TEMPLATE_ID\" value=\"" + templateId + "\"/>";;
  wfData = wfData.replace("<entity>","<entity>"+ infoAdded );//加上信息
  var funcName = compoName + "_before_commitsimply";
  var wfData2;
  if (eval("typeof " + funcName + "==\"function\"")) {
	 wfData2 = eval(funcName + "(wfData)");
  }else{
  	wfData2 = wfData;
  }

  var names = new Array("data", "componame", "wfdata");
  var values = new Array(compoData, compoName, wfData2);

	// 3、调用后台wfNewCommit()方法
	var retXml = requestDataFor51(actionName, compoName, names, values, url);
	return retXml.text;
}
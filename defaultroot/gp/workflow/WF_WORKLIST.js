
var MAX_INSTANCE_NUM2=1000;
var iWidth= screen.availWidth- 10;
var iHeight= screen.availHeight- 30;

var product_map = {"BI":"GK",
									 "DP":"GK",
									 "CP":"GK",
									 "AM":"GK",
								   "BC":"GK"
									 };

var v51Products = ["GL","CU","GF","BG","RP","PR","FA","DB","PD","BD","NT","BM","HD","MOM","ZC","BF","TR"];

function getProductCode(compoId){
  var dotPos= compoId.indexOf("_");
  var productCode= compoId.substring(0, dotPos);
  return productCode;
}

function fgetTodoList(compoId, url){
  var productCode= getProductCode(compoId);
  var vsURL = url;
  if(!vsURL){
	if (isV51Product(productCode)) {
		vsURL = "/"+productCode+ "/portlet.jsp?function=getlistpage&condition="
    + "&componame="+ compoId
    +"&listtype=WF_FILTER_COMPO_TODO";
	} else {
  	vsURL ="/"+getProductCode(compoId)+ "/getpage_" + compoId + ".action?function=getlistpage"
  				 + "&componame=" + compoId
  				 +"&condition=" + encodeURIComponent("listtype=WF_FILTER_COMPO_TODO;componame="+compoId);
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
  var vsStyle= "menubar= no, toolbar= no, scrollbars=no,resizable= yes,"
    +" titlebar= yes,left=0px, top=0px,"
    + "width="+iWidth+"px, height="+iHeight+"px";
  window.open(vsURL,"",vsStyle);
}
/**
 * @deprecated
 * @param compoId
 * @return
 */
function fgetTodoList2(compoId){
  var productCode= getProductCode(compoId);

  var vsURL ="/"+productCode+ "/portlet2.jsp?function=getlistpage&condition="
    + "&componame="+ compoId
    +"&listtype=WF_FILTER_COMPO_TODO";

  vsURL+= "&userid=" + DataTools.getSV("svUserID");

  var vsStyle= "menubar= no, toolbar= no, scrollbars=no,resizable= yes,"
    +" titlebar= yes,left=0px, top=0px,"
    + "width="+iWidth+"px, height="+iHeight+"px";
  window.open(vsURL,"",vsStyle);
}
function fgetDoneList(compoId, url){
  var productCode= getProductCode(compoId);
  var vsURL = url;
  if(!vsURL){	
	if (isV51Product(productCode)) {
  	vsURL = "/"+productCode+ "/portlet.jsp?function=getlistpage&condition="
    				+ "&componame="+ compoId
    				+"&listtype=WF_FILTER_COMPO_DONE";
	} else {
  	vsURL = "/"+getProductCode(compoId)+ "/getpage_" + compoId + ".action?function=getlistpage"
  				 	+"&componame=" + compoId;
  				 	+"&condition=" + encodeURIComponent("listtype=WF_FILTER_COMPO_DONE;componame="+compoId);		
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
  	    var param = parseCOnditionToParam(condition);
		  vsURL = "/" + productCode
						+ "/getpage_" + compoId +".action?" 
						+ "function=geteditpage"
						+ "&componame=" + compoId
						+ "&condition=" + condition
						+ "&workFlowStatus=" + wfStatus
						+ "&" + param	;
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

/**
 * @deprecated
 * @param instanceId
 * @param condition
 * @param compoId
 * @return
 */
function fgetEditPage2(instanceId,condition,compoId){
  var vsURL = "/"+getProductCode(compoId)+ "/portlet2.jsp?function=geteditpage"
    + "&componame=" + compoId + "&fieldvalue=" + compoId + "_E"    
    + "&" +WFConst.PROCESS_INST_ID_FIELD + "=" + instanceId;
  var otherURL;
  if (eval("typeof "+compoId+"_openbill_url==\"function\"")){
	  otherURL =eval(compoId+"_openbill_url(instanceId)");
  }else{
  	otherURL = "condition=" + condition;
  }
  vsURL += "&" + otherURL;
  vsURL+= "&userid=" + DataTools.getSV("svUserID");

  var vsStyle= "menubar= no, toolbar= no, scrollbars=no, "
    + "resizable= yes, titlebar= yes, "
    + "left=0px, top=0px, "
    + "width="+iWidth+"px, height="+iHeight+"px";
  window.open(vsURL,"",vsStyle);
}
function ftraceOne(instanceId){
  var vjNow = new Date();
  var svCondition=encodeParams("componame","WF_INSTANCE_TRACE",
  														 "instanceid",instanceId);
  window.showModalDialog("wfInstanceTrace.action?" + svCondition,
       new Array(window),
     'help:no;dialogHeight:500px;dialogWidth:700px;center:yes;');
}

/**
 * @deprecated
 * @param instanceId
 * @return
 */
function ftraceOne2(instanceId){
	var vjNow = new Date();
  var svCondition=encodeParams("componame","WF_INSTANCE_TRACE",
   "condition","",WFConst.WF_INSTANCE_ID,instanceId,
     "ismulti", false,"d",vjNow.getMilliseconds());
  var vsURL = "/admin/portlet.jsp?function=getSelectPage&" + svCondition;   
    var vsStyle= "menubar= no, toolbar= no, scrollbars=no,resizable= yes,"
    +" titlebar= yes,left=0px, top=0px,"
    + "width="+iWidth+"px, height="+iHeight+"px";
  if(TOKEN && TOKEN!= "null"){
    vsURL+= "&token=" + TOKEN;
  }
  window.showModalDialog(vsURL ,
       new Array(window),
     'help:no;dialogHeight:500px;dialogWidth:700px;center:yes;');
}

function fcommitOne(userId,instanceId,compoId,instanceName,wfSv){
  var reasons="您的数据因为以下原因没有提交成功,请检查数据:\n";
  if(!wfSv){
    wfSv= WFInterface.getWFSessionXml().xml;
  }
  result=fcommitSingle(userId,instanceId,compoId,wfSv);
  if(result.length != 0 && "success"!=result){
    reasons+=(instanceName+": "+result+"\n");
  }else{
    reasons=instanceName+" 提交成功";
  }
  alert(reasons);
  window.location.reload();
}
function funtreadOne(userId,instanceId,compoId,instanceName,wfSv){
  var reasons="您的数据因为以下原因没有退回成功,请检查数据:\n";
  if(!wfSv){
    wfSv= WFInterface.getWFSessionXml().xml;
  }
  result=funtreadSingle(userId,instanceId,compoId,wfSv);
  if("success"!=result){
    reasons+=(instanceName+": "+result+"\n");
  }else{
    reasons=instanceName+" 退回成功";
  }
  alert(reasons);
  window.location.reload();
}
//单条数据提交
function fcommitSingle(userId,instanceId,compoId,wfSv){
  var wfData2;
  //检查业务部件的批量提交接口
  if (eval("typeof "+compoId+"_before_commitsimply==\"function\"")){
   wfData2 =eval(compoId+"_before_commitsimply(instanceId,compoId,wfSv)");
  }else{
     wfData2=wfSv;
  }
  var names = new Array();
  var values = new Array();
  names[0]="strInstanceId";
  values[0]=instanceId;
  names[1]="strTemplateId";
  values[1]="";
  names[2]="strCompoId";
  values[2]=compoId;
  names[3]="strUserId";
  values[3]=userId;
  names[4]="strWfData";
  values[4]=wfData2;
  if(TOKEN && TOKEN!= "null"){
    names[5]="TOKEN";
    values[5]=TOKEN;
  }
  var produceCode = getProductCode(compoId);
	var funName = product_map[produceCode] + "_getRealWFActionName";
	var actionName = "commitSimply";
	try {
		var func = eval(funName);
		if (typeof(func) == "function") {
			 actionName = func.call(this, "commitSimply", compoId);
		}
	} catch (error) {}
	if (isV51Product(produceCode)) {
		//var temp = "/" + produceCode + "/Proxy?function=commitSimply&componame=" + compoId;
		var temp = "/"+produceCode+ "/portlet.jsp?function=commitSimply&componame=" +  compoId;
		var message  = Info.requestDataByPost(temp, names, values, false);
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		xmldom.loadXML(message);
		return xmldom.text;
	}	
  var result = Info.requestData(actionName, compoId, names, values, "/" + produceCode);
  return result.text;
}
//单条数据退回
function funtreadSingle(userId,instanceId,compoId,wfSv){
  var wfData;
  //检查业务部件的批量退回接口
  if (eval("typeof "+compoId+"_before_batchuntread==\"function\"")){
    eval(compoId+"_before_batchuntread(instanceId,compoId,wfSv)");
  }
  var names = new Array();
  var values = new Array();
  names[0]="instanceId";
  values[0]=instanceId;
  names[1]="userId";
  values[1]=userId;
  names[2]="comment";
  values[2]="";
  names[3]="toWhich";
  values[3]="-1";  
  if(TOKEN && TOKEN!= "null"){
    names[4]="TOKEN";
    values[4]=TOKEN;
  }
  var produceCode = getProductCode(compoId);
	if (isV51Product(produceCode)) {
		//var temp = "/" + produceCode + "/Proxy?function=commitSimply&componame=" + compoId;
		var temp = "/"+produceCode+ "/portlet.jsp?function=untreadSimply&componame=" +  compoId;
		var message = Info.requestDataByPost(temp, names, values, false);
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		xmldom.loadXML(message);
		return xmldom.text;
	}	
  var result = Info.requestData("untreadSimply",compoId, names, values);
  return result.text;
}
function fbatchUntread(userId,compoId,instIdArray,instNameArray){
  //alert(compoId);
  var instanceId;
  var result;
  var reasons="";
  var results="";
  var wfSv= WFInterface.getWFSessionXml().xml;
  for (var i=0, len=instIdArray.length; i<len; i++){
    instanceId=instIdArray[i];
    instanceName=instNameArray[i];
    result=funtreadSingle(userId,instanceId,compoId,wfSv);
    //提交不成功,记录名称及失败原因
    if("success"!=result){
      reasons+=instanceName+": "+result+"\n";
    }
  }//end for

  if(""==reasons){
    results="全部退回成功";
  }else{
    results+="您的以下数据因为以下对应的原因没有提交成功,请检查数据:\n";
    results+=reasons;
  }
  alert(results);
  window.location.reload();
}
function fbatchCommit(userId,compoId,instIdArray,instNameArray,wfSv){
  var instanceId;
  var result;
  var reasons="";
  var results="";
  var wfSv= WFInterface.getWFSessionXml().xml;
  for (var i=0, len=instIdArray.length; i<len; i++){
    instanceId=instIdArray[i];
    instanceName=instNameArray[i];
    result=fcommitSingle(userId,instanceId,compoId,wfSv);
    //提交不成功,记录名称及失败原因
    if(result.length != 0 && "success"!=result){
      reasons+=instanceName+": "+result+"\n";
    }
  }//end for

  if(""==reasons){
    results="全部提交成功";
  }else{
    results+="您的以下数据因为以下对应的原因没有提交成功,请检查数据:\n";
    results+=reasons;
  }
  alert(results);
  window.location.reload();
}

function switchImg(compoId,MAX_ROW_NUM){
  var imgPath ="/style/img/main/";
  var minus="minus.gif";
  var plus="plus.gif";
  if(event.srcElement.src.indexOf(minus)>-1){  //minus,switch to more
    setDisplay(compoId,0);
    event.srcElement.src = imgPath + plus;
  }else{  //plus  switch to less
    setDisplay(compoId,MAX_ROW_NUM);
    event.srcElement.src = imgPath + minus;
  }
}
function fshowMore(compoId,MAX_INSTANCE_NUM){
   setDisplay(compoId,MAX_INSTANCE_NUM);
}

//setDisplay(id,0):  all invisiable
//setDisplay(id,MAX_ROW_NUM):  n rows visiable
//setDisplay(id,MAX_INSTANCE_NUM):  all visiable
function setDisplay(id,count){
  var collections = document.all;
  var fullId="TR_"+id+"-";
  var jid=0;
  var maxId= fullId+PF.formatNum2Str(MAX_INSTANCE_NUM2,4);
  for(var i=0;i<MAX_INSTANCE_NUM2;i++){
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

function parseCOnditionToParam(condition) {
	var result = "";
	var array = condition.split(";");
	for ( var i = 0; i < array.length; i++) {
		var temp = array[i].split("=");
		result += temp[0] + "=" + temp[1] + "&";
	}
	if (result.length > 0) {
		result = result.substring(0, result.length - 1);
	}
	return result;
}

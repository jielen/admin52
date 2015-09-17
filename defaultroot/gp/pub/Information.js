/*
Title: gp.pub.Information
Description:
信息类，用于对外抛出错误或显示错误信息及向服务器的请求。
Company: 用友政务
Author:leidh
*/
// import BASE_URL; // defined in ..\..\script\Community.js

//----------------------------------------------------------------------
//声明页面中的全局对象;
var Info= new Information();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Information(){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.pub.Information";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.事件响应中有用.
  this.tHasInit= false; //对象是否被始化的标志;

  //5.方法声明区 =function();
  //public;
  this.throws= Information_throws;
  this.throwE= Information_throwE;
  this.show= Information_show;
  this.showE= Information_showE;
  this.getEMsg= Information_getEMsg;
  this.requestData= Information_requestData;
  this.requestDataK= Information_requestDataK;
  
  //add by liubo
  this.requestDataByPost=Information_requestDataByPost;
  
  //add by hmgkevin
  this.sendRequest = Information_sendRequest;
  this.frameSubmit = Information_frameSubmit;

  //private;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
function Information_throws(sInfo, sClassName, sMethodName, asOther){
  if (asOther== null) asOther= new Array();
  var vsMessage= "";
  vsMessage+= sClassName+"."+sMethodName+"():\r\n";
  vsMessage+= sInfo+ "\r\n";
  for (var i= 0; i< asOther.length; i++){
    vsMessage+= asOther[i]+ " ";
  }

  alert(vsMessage);
  throw vsMessage;
}
//----------------------------------------------------------------------
function Information_throwE(E, sClassName, sMethodName, asOther){
  var vsMessage= this.getEMsg(E);
  this.throws(vsMessage, sClassName, sMethodName, asOther);
}
//----------------------------------------------------------------------
function Information_show(sInfo, sClassName, sMethodName, asOther){
  //alert("Information_show();");
  try{
    if (asOther== null) asOther= new Array();
    var vsMessage= "";
    vsMessage+= sClassName+"."+sMethodName+"():\r\n";
    vsMessage+= sInfo+"\r\n";
    for (var i= 0; i< asOther.length; i++){
      vsMessage+= asOther[i]+" ";
    }

    alert(vsMessage);
    /*
    var vajDA= new Array();
    vajDA[0]= self;
    vajDA[1]= vsMessage;
    var vsRet= window.showModalDialog(JSC.sRoot+ "Linkdo.Tools/Components/HTML_ExceptionDialog.htm", vajDA, "dialogWidth:378px; dialogHeight:334px; center:yes; resizable:no; status:no; scroll:no");
    if (vsRet== "End") top.close();
    //*/
    return true;
  }catch(e){
    alert(this.CLASSNAME+ ".show():\r\n"+ vsMessage);
  }
}
//----------------------------------------------------------------------
function Information_showE(E, sClassName, sMethodName, asOther){
  try  {
    var vsMessage= this.getEMsg(E);
    this.show(vsMessage, sClassName, sMethodName, asOther);
  }catch(e){
    alert(this.CLASSNAME+ ".showE():\r\n"+ vsMessage);
  }
}
//----------------------------------------------------------------------
function Information_getEMsg(E){
  //alert("Information_getEMsg();");
  try{
    if (E== null) return "";
    var vsMessage= "";
    if (E.message!= null) vsMessage= E.message;
    else if ((typeof E.description)== "undefined") vsMessage= E;
    else vsMessage= E.description;

    return vsMessage;
  }catch(e1){
    //Info.showE(e1, "Information", "getEMsg");
    try{this.show(this.jE.message+ "\r\n"+ this.jE.description, "Information", "getEMsg");}
    catch(e2){alert("Information.getEMsg():\r\n无法抛出的错误.");};
    return "Information.getEMsg():\r\nError.";
  }
}
//----------------------------------------------------------------------
//public; 向服务器发送请求;
//返回: 成功:xmldom.documentElement; 否则:null;
function Information_requestData(sFunction, sCompoName, asParamName, asParamValue, sURL){
  //alert("Information_requestData();");
	var vsResponseText= this.requestDataK(sFunction, sCompoName, asParamName, asParamValue, sURL);
	var voXmldom = new ActiveXObject("Microsoft.XMLDOM");
	voXmldom.loadXML(vsResponseText);
	if (voXmldom== null) return null;
	return voXmldom.documentElement;
}
//----------------------------------------------------------------------
//public; 向服务器发送请求;
//返回: 成功:xmlhttp.responseText; 否则:null;
function Information_requestDataK(sFunction, sCompoName, asParamName, asParamValue, sURL){
	if (PF.isEmpty(sURL)) {
		if (typeof(BASE_URL)!="undefined") {
			sURL= BASE_URL + "/" + sFunction + ".action";
		} else {
			sURL = sFunction + ".action";
		}
	} else {
		sURL = sURL + "/" + sFunction + ".action";
	}
	var bCompo = true;
	var bTable = true;
	var bUserid = true;
	var bToken = true;
	for (var i = 0; i < asParamName.length; i++){
		if(asParamName[i] == "componame") bCompo = false;
		if(asParamName[i] == "tablename") bTable = false;
		if(asParamName[i] == "userid") bUserid = false;
		if (asParamName[i] == "token") bToken = false;
	}
	if(bCompo){
		asParamName[asParamName.length] = "componame";
		asParamValue[asParamName.length - 1] = sCompoName;
	}
	if(bTable){
		asParamName[asParamName.length] = "tablename";
		asParamValue[asParamName.length - 1] = DataTools.getMainTableName(sCompoName);
	}
	if(bUserid){
		asParamName[asParamName.length] = "userid";
		asParamValue[asParamName.length - 1] = DataTools.getSV("svUserID");
	}
	if (bToken) {
		try {
			asParamName[asParamName.length] = "token";
			asParamValue[asParamName.length - 1] = TOKEN;
		} catch (error){
			asParamValue[asParamName.length - 1] = "";
		}
	}
	
	var res = this.requestDataByPost(sURL,asParamName,asParamValue,false);
	return res;
}
//----------------------------------------------------------------------

//add by liubo : 用post方法与server交互
function Information_requestDataByPost(url, paramNames,paramValues, async) {
  var params = "";
  var length = paramNames.length;
  if (paramNames != null && length != 0) {
      for (var i = 0; i < length - 1; i++) {
          params += paramNames[i] + "=" + URLEncoding(escapeSpecial(paramValues[i])) + "&";
      }
      params += paramNames[length - 1] + "=" + URLEncoding(escapeSpecial(paramValues[length - 1]));
  }
  //debugger;
 	var voXmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	voXmlhttp.Open("POST", url, async);
	voXmlhttp.setRequestHeader("Content-Length", params.length);
	voXmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	voXmlhttp.send(params);
	return voXmlhttp.responseText;   
}

function escapeSpecial(value) {
  if ("string" != typeof value){
  	return value;
  }
  if (value == null) return null;
  value = value.replace(/%/g, "%25"); // 必须先做
  // 7 个保留字
  value = value.replace(/&/g, "%26");
  value = value.replace(/\//g, "%2F");
  value = value.replace(/:/g, "%3A");
  value = value.replace(/;/g, "%3B");
  value = value.replace(/=/g, "%3D");
  value = value.replace(/\?/g, "%3F");
  value = value.replace(/@/g, "%40");
  // 不安全的字符
  value = value.replace(/"/g, "%22");
  value = value.replace(/#/g, "%23");
  value = value.replace(/</g, "%3C");
  value = value.replace(/>/g, "%3E");
  // 处理加号和空格
  value = value.replace(/\+/g, "%2B");
  value = value.replace(/ /g, "+"); // 必须在 + 之后做
  return value;
}

function Information_sendRequest(functionname,url,paramNames,paramValues,isEscape,async) {//初始化、指定处理函数、发送请求的函数
	var sURL = BASE_URL + "/" + url + ".action";
	if(PF.isEmpty(async))async = true;
	var params = "";
  	var length = paramNames.length;
  	if(isEscape == "true"){
  		if (paramNames != null && length != 0) {
	      	for (var i = 0; i < length - 1; i++) {
	          	params += paramNames[i] + "=" + URLEncoding(paramValues[i]) + "&";
	      	}
	      	params += paramNames[length - 1] + "=" + URLEncoding(paramValues[length - 1]);
	  	}
  	}else{
	  	if (paramNames != null && length != 0) {
	      	for (var i = 0; i < length - 1; i++) {
	          	params += paramNames[i] + "=" + URLEncoding(escapeSpecial(paramValues[i])) + "&";
	      	}
	      	params += paramNames[length - 1] + "=" + URLEncoding(escapeSpecial(paramValues[length - 1]));
	  	}
	}
	http_request = false;
	//开始初始化XMLHttpRequest对象
	if(window.XMLHttpRequest) { //Mozilla 浏览器
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {//设置MiME类别
			http_request.overrideMimeType('text/xml;charset=gbk');
		}
	}
	else if (window.ActiveXObject) { // IE浏览器
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) { // 异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	http_request.onreadystatechange = functionname;
	// 确定发送请求的方式和URL以及是否同步执行下段代码，async=false时同步
	http_request.open("post",sURL,async);
	http_request.setRequestHeader("Content-Length", params.length);
	http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	http_request.setRequestHeader("Content-Type","text/html;charset=gbk");
	http_request.send(params);
	//return http_request.responseText;
}

//以隐藏表单方式提交，以便不影响浏览器接收response数据流
function Information_frameSubmit(functionID,componame,paramNames,paramValues){
	var sIframe = "<iframe id=\"pageframe\" width=\"1\" height=\"1\" style=\"display:none\">";
	var oIframe = document.createElement(sIframe);
	document.body.appendChild(oIframe);
	var doc = window.frames["pageframe"].document;
	doc.charset="GBK";
	form = doc.createElement("form");
	form.setAttribute("name","funcform");
	form.setAttribute("method","post");
	form.setAttribute("action", BASE_URL + "/" + functionID + ".action");
	doc.appendChild(form);
	if (paramNames != null){
		for(var i=0,j=paramNames.length;i<j;i++) {
			input = doc.createElement("input");
			input.setAttribute("type","hidden");
			input.setAttribute("name",paramNames[i]);
			input.setAttribute("value",paramValues[i]);
			form.appendChild(input);
		}
	}
	form.submit();
	
}
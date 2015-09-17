/*
Title: gp.pub.Information
Description:
��Ϣ�࣬���ڶ����׳��������ʾ������Ϣ���������������
Company: ��������
Author:leidh
*/
// import BASE_URL; // defined in ..\..\script\Community.js

//----------------------------------------------------------------------
//����ҳ���е�ȫ�ֶ���;
var Info= new Information();
//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function Information(){
  //1.���� =function();
  

  //2.���������� =function();
  this.CLASSNAME= "gp.pub.Information";

  //3.���������� =function();
  this.sName= this.CLASSNAME;  //��������.�¼���Ӧ������.
  this.tHasInit= false; //�����Ƿ�ʼ���ı�־;

  //5.���������� =function();
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
//6.������ =function();
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
    catch(e2){alert("Information.getEMsg():\r\n�޷��׳��Ĵ���.");};
    return "Information.getEMsg():\r\nError.";
  }
}
//----------------------------------------------------------------------
//public; ���������������;
//����: �ɹ�:xmldom.documentElement; ����:null;
function Information_requestData(sFunction, sCompoName, asParamName, asParamValue, sURL){
  //alert("Information_requestData();");
	var vsResponseText= this.requestDataK(sFunction, sCompoName, asParamName, asParamValue, sURL);
	var voXmldom = new ActiveXObject("Microsoft.XMLDOM");
	voXmldom.loadXML(vsResponseText);
	if (voXmldom== null) return null;
	return voXmldom.documentElement;
}
//----------------------------------------------------------------------
//public; ���������������;
//����: �ɹ�:xmlhttp.responseText; ����:null;
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

//add by liubo : ��post������server����
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
  value = value.replace(/%/g, "%25"); // ��������
  // 7 ��������
  value = value.replace(/&/g, "%26");
  value = value.replace(/\//g, "%2F");
  value = value.replace(/:/g, "%3A");
  value = value.replace(/;/g, "%3B");
  value = value.replace(/=/g, "%3D");
  value = value.replace(/\?/g, "%3F");
  value = value.replace(/@/g, "%40");
  // ����ȫ���ַ�
  value = value.replace(/"/g, "%22");
  value = value.replace(/#/g, "%23");
  value = value.replace(/</g, "%3C");
  value = value.replace(/>/g, "%3E");
  // ����ӺźͿո�
  value = value.replace(/\+/g, "%2B");
  value = value.replace(/ /g, "+"); // ������ + ֮����
  return value;
}

function Information_sendRequest(functionname,url,paramNames,paramValues,isEscape,async) {//��ʼ����ָ������������������ĺ���
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
	//��ʼ��ʼ��XMLHttpRequest����
	if(window.XMLHttpRequest) { //Mozilla �����
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {//����MiME���
			http_request.overrideMimeType('text/xml;charset=gbk');
		}
	}
	else if (window.ActiveXObject) { // IE�����
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) { // �쳣����������ʵ��ʧ��
		window.alert("���ܴ���XMLHttpRequest����ʵ��.");
		return false;
	}
	http_request.onreadystatechange = functionname;
	// ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ��룬async=falseʱͬ��
	http_request.open("post",sURL,async);
	http_request.setRequestHeader("Content-Length", params.length);
	http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	http_request.setRequestHeader("Content-Type","text/html;charset=gbk");
	http_request.send(params);
	//return http_request.responseText;
}

//�����ر���ʽ�ύ���Ա㲻Ӱ�����������response������
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
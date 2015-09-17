var comm = null;
var commpage = null;
var periodVal="";
var isException = false;
var operationID = null;
var BASE_URL = "/applus";
{
  // 初始化 BASE_URL ， http://localhost/GL 则等于 /GL
  // window.location.pathname 的值有时是 /GL/index.jsp ，有时是 "GL/Proxy"
  var i = window.location.pathname.indexOf('/', 1);
  if (-1 != i)
    BASE_URL = window.location.pathname.substr(0, i);
  if ("/" != BASE_URL.charAt(0))
    BASE_URL = "/" + BASE_URL;
}

function Community(){
	document.body.insertAdjacentHTML("afterBegin","<span id=\"SPANFUNC\"></span>");
	var span=document.all("SPANFUNC");
	span.style.display = "none";
	span.innerHTML = "<iframe name=\"funcframe\" src=\"blank.html\"></iframe>";
	this.busy = false;
	this.justpage = false;
	this.doRequest = doRequest;
	this.doRequestPage = doRequestPage;
}

function requestData(functionID, componame, paramNames, paramValues,url){
	var vsResponseText= requestDataK(functionID, componame, paramNames, paramValues,url);
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(vsResponseText);
	if (xmldom.documentElement && xmldom.documentElement.firstChild){
		return xmldom.documentElement.firstChild;
	}
	return null;
}

function requestData2(functionID, componame, paramNames, paramValues,url){
	var vsResponseText= requestDataK(functionID, componame, paramNames, paramValues,url);
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(vsResponseText);
	return xmldom.documentElement;
}

//返回 xmlhttp.responseText; leidh; 20040915;
function requestDataK(functionID, componame, paramNames, paramValues,url){
	if (!url)
	  url = BASE_URL + "/" + functionID + ".action";
	var bCompo = true;
	//debugger;  
	var str = ""
	if (paramNames != null){
		for (var i = 0; i < paramNames.length; i++){
			if(paramNames[i] == "componame") {
				bCompo = false;
				break;
			}
		}
		str += encodeParamArray(paramNames, paramValues);
		if(bCompo){
	  	str += "&componame=" + componame;
		}
	}
	else {
		str += "componame=" + componame;
	}
	
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.Open("POST",url,false);
	xmlhttp.setRequestHeader("Content-Length",str.length);
	xmlhttp.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
	xmlhttp.send(str);
	return xmlhttp.responseText;
}

/**
 * 生成编码后的字符串，作为 URL 的参数串
 * @return 合法的 URL 查询字符串
 */
function encodeParamArray(paramNames, paramValues) {
  var s = "";
  for(var i=0,j=paramNames.length;i<j; i++) {
    var value=paramValues[i];
    if ("string" == typeof value) {
      value = escapeSpecial(value);
    }
    if (0 != i){
      s += "&";
    }
    s += paramNames[i] + "=" + value;
  }

  s = URLEncoding(s);
  return s;
}

/**
 * 生成编码后的字符串，作为 URL 的参数串
 * @return 合法的 URL 查询字符串
 */
function encodeParamObject(paramObject) {
  var s = "";
  var name;
  var i = 0;
  for (name in paramObject) {
    var value = paramObject[name];
    var vtype = typeof value;
    // 忽略未定义、函数和空值
    if ("undefined" != vtype && "function" != vtype && null != value) {
      if ("string" == vtype) {
        value = escapeSpecial(value);
      }
      if (0 != i){
        s += "&";
      }
      s += name + "=" + value;
      i++;
    }
  }
  s = URLEncoding(s);
  return s;
}

/**
 * 生成编码后的字符串，作为 URL 的参数串
 * 参数个数不定，应该是一个偶数，参数依次为名称1，值1，名称2，值2，等等
 * @return 合法的 URL 查询字符串
 */
function encodeParams(name1, value1, name2, value2) {
  var names = new Array();
  var values = new Array();
  var n = 0;
  var args = encodeParams.arguments;
  for (var i = 0; i < args.length; i += 2, n++) {
    names[n] = args[i];
    if (i + 1 < args.length)
      values[n] = args[i + 1];
    else
      values[n] = "";
  }
  return encodeParamArray(names, values);
}

/**
 * 将特定的字符转义，用于构造 URL 的参数串
 * 保留字符 ";", "/", "?", ":", "@", "=", "&" 共 7 个
 * 不安全的字符 "<", ">", "\"", "#", "%"
 * 不处理中文字符，中文字符使用 URLEncodeing (在 formenctype.vbs 中) 转义
 * 参考: rfc1738
 * 参考: http://www.blooberry.com/indexdot/html/topics/urlencoding.htm
 */
function escapeSpecial(value) {
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

function doRequest(functionID,componame,paramNames,paramValues,callback) {
	var result = requestData2(functionID, componame, paramNames, paramValues);
	if(callback == null || callback == ""){
		return result;
	}else{
		var callfunc = eval(callback);
		callfunc(result);
	}
}

function getCommunity() {
	if (comm == null)
		comm = new Community();
	if (comm.justpage == true) {
		return comm;
	}else if (comm.busy == true ) {
		alert("通信正忙，请稍后再试。");
		return null;
	} else {
		return comm;
	}
}

//获得数据库类型，wtm,返回值为0是Oracle，返回值是1是SQLserver
function getDBType(){
      var names = new Array();
      var values = new Array();
      names[0] = "dbType";
      values[0] = "test";
      var result = requestData("getDBType", "all", names, values);
      return result.xml;
}

function PageCommunity(){
	var span=document.all("SPANPAGE");
	if (!span){
		document.body.insertAdjacentHTML("afterBegin","<span id=\"SPANPAGE\"></span>");
		span=document.all("SPANPAGE");
		span.style.display = "none";
	}
	span.innerHTML = "<iframe name=\"pageframe\" src=\"blank.html\"></iframe>";
	this.busy = false;
	this.justpage = false;
	this.doRequestPage = doRequestPage;
}

function doRequestPage(functionID,componame,paramNames,paramValues,target,url) {
	vtarget = "_blank";
	if (target == "" && functionID == "fprint")
		target = componame + "_WIN";
	if (target != null)
		vtarget = target;

	var pdfVersion;
	if(typeof(window.PrintX) == "object"){
		pdfVersion = PrintX.getPdfVersion();
	}else if(typeof(getPdfVersion) == "function"){
		pdfVersion = getPdfVersion();
	}
	if(pdfVersion != null && pdfVersion.indexOf("7") == 0){
		vtarget = vtarget + (new Date()).getTime();
	}

	var doc = window.frames["pageframe"].document;
	doc.charset="GBK";
	form = doc.createElement("form");
	form.setAttribute("name","funcform");
	form.setAttribute("method","post");
	form.setAttribute("target",vtarget);
	if (url == "" || url == null){
		form.setAttribute("action", BASE_URL + "/" + functionID + ".action");
	}else{
		form.setAttribute("action",url);
	}
	doc.appendChild(form);
	input = doc.createElement("input");
	input.setAttribute("type","hidden");
	input.setAttribute("name","function");
	input.setAttribute("value",functionID);
	form.appendChild(input);
	input = doc.createElement("input");
	input.setAttribute("type","hidden");
	input.setAttribute("name","componame");
	input.setAttribute("value",componame);
	form.appendChild(input);
	if (paramNames != null)
		for(var i=0,j=paramNames.length;i<j;) {
			input = doc.createElement("input");
			input.setAttribute("type","hidden");
			input.setAttribute("name",paramNames[i]);
			input.setAttribute("value",paramValues[i]);
			form.appendChild(input);
			i=i+1;
		}
	form.submit();
	document.all("SPANPAGE").innerHTML = "";
}

function getPageCommunity() {
	var commpage = new PageCommunity();
	return commpage;
}

function getPrintCommunity(){
	var commpage = new PrintCommunity();
	return commpage;
}

function PrintCommunity(){
	var span=document.all("SPANPRINTPAGE");
	if (!span){
		var pageName;
		try{
 			if(getPageName()){
 				pageName = getPageName();
 			}
    }catch(e){
     	if(PrintX.getPageName()){
     		pageName = PrintX.getPageName();
     	}
    }
    //var pageName = getPageName();
    if(pageName != null && pageName.substring(pageName.length - 2) == "_E"){
      document.body.insertAdjacentHTML("beforeBegin","<span id=\"SPANPRINTPAGE\"></span>");
    }
    else{
      document.body.insertAdjacentHTML("beforeEnd","<span id=\"SPANPRINTPAGE\"></span>");
    }
		span=document.all("SPANPRINTPAGE");
	}
	span.innerHTML = "<iframe name=\"pageprintframe\" src=\"blank.html\"></iframe>";
	this.busy = false;
	this.justpage = false;
	this.doPrintRequest = doPrintRequest;
}


function doPrintRequest(functionID,componame,paramNames,paramValues,target,url){
	vtarget = "_blank";
	if (target == "" && functionID == "fprint")
		target = componame + "_WIN";
	if (target != null)
		vtarget = target;
	var doc = window.frames["pageprintframe"].document;
	if(doc.charset=="utf-8")doc.charset="GBK";
	form = doc.createElement("form");
	form.setAttribute("name","funcform");
	form.setAttribute("method","post");
  	form.setAttribute("target","pageprintframe");
	if (url == "" || url == null){
		form.setAttribute("action", BASE_URL + "/" + functionID + ".action");
	}else{
		form.setAttribute("action",url);
	}
	doc.appendChild(form);
	input = doc.createElement("input");
	input.setAttribute("type","hidden");
	input.setAttribute("name","function");
	input.setAttribute("value",functionID);
	form.appendChild(input);
	input = doc.createElement("input");
	input.setAttribute("type","hidden");
	input.setAttribute("name","componame");
	input.setAttribute("value",componame);
	form.appendChild(input);
	if (paramNames != null)
		for(var i=0,j=paramNames.length;i<j;) {
			input = doc.createElement("input");
			input.setAttribute("type","hidden");
			input.setAttribute("name",paramNames[i]);
			input.setAttribute("value",paramValues[i]);
			form.appendChild(input);
			i=i+1;
		}
	form.submit();
  	myWindow = window.open("", "warningWindow", 'width=300, height=100')
  	myWindow.document.write("<h6><font size=\"2\" face=\"仿宋_GB2312\" color=\"#3366FF\">请稍候，正在下载数据，下载完毕后本提示窗口会自动关闭，谢谢合作！</font></h6>")
  	timeoutObj = window.setInterval("printIt()",500);
}

function printIt(){
  try{
    var doc = window.frames["pageprintframe"].document;//showMessage(doc.readyState);
    if( doc.readyState != "complete"){
      clearInterval(timeoutObj);
      timeoutObj = window.setInterval("printIt()",500);
    }
    else{
      if(myWindow != null)
        myWindow.close();
      window.frames["pageprintframe"].print();
      clearInterval(timeoutObj);
    }
  }catch(e){
    //
  }
}

function free() {
	if (comm != null)
		comm.busy = false;
}

function getDBData(ruleID,names,values,callback){
	var param = "<entity></entity>";
	if(names != null && names.length > 0){
		param = AS_arrayToEntityString(names, values);
	}
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	pValues[1] = param;
	var com = getCommunity();
	if (com != null){
		doRequest("getruledelta","all",pNames,pValues,callback);
	}
}

/****************************************************************************/
/**        modified by hmgkevin on 08-03-14 ;                               */
/**        modify return value from result.text to result;                  */
/****************************************************************************/
function qryData(ruleID, names, values){
	if (arguments.length == 2) {
		var res = parseConStrToArray(names);
		names = res[0];
		values = res[1];
	}
	var svNd = "";
	try{
		svNd= DataTools.getSV("svNd");
	}catch(e){
		try{
		  svNd = getSv("svNd");
		}catch(e){
		    //
		}
	}
	var param = "<entity></entity>";
	if(names != null && names.length > 0){
		names[names.length]= "svNd";
		values[values.length]= svNd;

		param = AS_arrayToEntityString(names, values);
	}
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	pValues[1] = param;
	var result = requestData("getruledelta", "all", pNames, pValues);
	if (result && "undefined" != result.text)
		return result;
	return null;
}

function setSv(entity){
	var names = new Array();
	var values = new Array();
	names[0] = "entity";
	values[0] = entity;
	var com = getCommunity();
	if (com != null){
		com.doRequest("setSv", "all", names, values, "setSv_R");
	}
}

function setSv_R(result){
	if (result.getAttribute("success") == "false"){
		alert(result.innerHTML);
	}else{
		/*只有设置当前业务日期不返回空值*/
		if(result.innerHTML.length > 0){
			setPeriod(win1,"getPer");
		}
	}
}

function getPer(perVal){
	periodVal = perVal.innerHTML;
	if(periodVal.length > 0){
		setSv("svFiscal", periodVal);
	}
}

function trim(str){  //去除字符串首尾的空格
	return ltrim(rtrim(str));
}

function ltrim(str){
  if (str == null) return "";
	var index = -1;
	for (var i=0,j=str.length; i<j; i++){
		if (str.charAt(i) != " "){
			index = i;
			break;
		}
	}
	if (index == -1){
		return "";
	}else{
		return str.substr(index);
	}
}

function rtrim(str){
  if (str == null) return "";
	var index = -1;
	for (var i=str.length-1 ,j=0; i>=j; i--){
		if (str.charAt(i) != " "){
			index = i;
			break;
		}
	}
	if(index == -1)
		return str;
	else
		return str.substring(0, index + 1);
}

function browseFile(){
	var name = event.srcElement.getAttribute("name");
	var tableName = event.srcElement.getAttribute("tablename");
	var mainTable = getMainTableName();
	var fieldEle = document.getElementById(tableName + "_" + name + "ID");
  if(fieldEle.getAttribute("alwaysreadonly") == "true" ||
     document.getElementById("status").getAttribute("value") == "edit") return;
	var fileID = null;
	if(tableName == mainTable){
		fileID = getField(name + "_BLOBID");
	}else{
		var row = getCurrentRow(tableName);
		fileID = getRowField(row, name + "_BLOBID");
	}
	var win_edit = showModalDialog("browseFile.htm", fileID,
																 "dialogHeight:100px;dialogWidth:400px;"
																 + "resizable:no;help:no;status:no");
	if(win_edit){
		var pathName = win_edit[0];
		var index = pathName.lastIndexOf("\\");
		var doc = document.getElementById(tableName + "_" + name + "ID");
		doc.setAttribute("value", pathName.substr(index + 1));
		if(tableName == mainTable){
			var doc1 = document.getElementById(tableName + "_" + name + "_BLOBIDID");
			doc1.setAttribute("value", win_edit[1]);
			changed = true;
		}else{
			var row = getCurrentRow(tableName);
			setRowField(row, name + "_BLOBID", win_edit[1]);
      changed = true;
		}
    if(eval("typeof after_browse_" + tableName + "_" + name + " == \"function\""))
      eval("after_browse_" + tableName + "_" + name + "()");
	}
  if (document.getElementById(tableName+"_"+name + "ID").value != ""){
    document.getElementById(name + "_DELID").style.display = "";
    document.getElementById(name + "_BWSID").style.display = "none";
  }
}

function readFile(){
	var name = event.srcElement.getAttribute("name");
	var tableName = event.srcElement.getAttribute("tablename");
	var fieldEle = document.getElementById(tableName + "_" + name + "ID");
	var value = fieldEle.getAttribute("value");
	var mainTable = getMainTableName();
	var fileId = "";
	if(mainTable == tableName){
		var doc = document.getElementById(tableName + "_" + name + "_BLOBIDID");
		fileId = doc.value;
		if (trim(fileId) == "") {
			alert("文件“" + value + "”在数据库中不存在！");
			return;
		}
	}else{
		var row = getCurrentRow(tableName);
		fileId = getRowField(row, name + "_BLOBID");
	}
	var win_edit = open("Proxy?function=readfile&fileid=" + fileId, 0,
											"menubar=no,scrollbars=no,status=no,toolbar=no,"
											+ "resizable=yes,titlebar=yes,scrollbars=yes,"
											+ "height=" + (screen.availHeight - 30) + ",width="
											+ (screen.availWidth - 10) + ",top=0,left=0");
}

/**********************************************************
 * 描述：预留字段设置
 * 时间：2003-3-26
 *********************************************************/
function doPreCol(compoId,dataItemType,vsEnable,vsNameEnable){
	window.open("PreCol?COMPOID=" + compoId + "&DATAITEMTYPE="
								+ dataItemType + "&VSENABLE=" + vsEnable
								+ "&VSNAMEENABLE=" + vsNameEnable, "",
								"width=400,height=240,menubar=no,scrollbars=no,status=no,"
								+ "toolbar=no,resizable=yes,titlebar=yes,scrollbars=yes");
}

function digitToChar(digit) {
	switch(digit)	{
		case '0':
			return "零";
		case '1':
			return "壹";
		case '2':
			return "贰";
		case '3':
			return "叁";
		case '4':
			return "肆";
		case '5':
			return "伍";
		case '6':
			return "陆";
		case '7':
			return "柒";
		case '8':
			return "捌";
		case '9':
			return "玖";
		}
}

/*基本思路：
	1.先检查输入参数的有效性（必须可解析为浮点数，不能大于 9999999999999999.99）
			比这大的数应该称为什么？  "XXXX亿亿"？

	2.如果解析后的浮点数取到分后等于0（不做舍入），则返回
		零分
	3.对整数部分和小数部分分别处理
		A. 对小数部分的处理最多取2位，先角后分，结果形式为
				X角X分；X角;X分
			这三种形式之一

		B. 对于整数的处理：
			a.从低位到高位，每4位一组进行处理
				例如对于 1234,3008 抽出 "3008"为第0组，"1234"为第1组
			b.对于每一组
				如果为值为0，
					对于第0位数字 处理为 空字符""
					其他位的数字  处理为 "零"
				如果值不为0
					对于第0位数字  输出该数字的 对应汉字大写形式
					对于第1、2、3位（从右往左），
							先处理为 	拾、佰、仟
							再加上该数字的 对应汉字大写形式

				例如 	对 "3008" 处理为 "捌零零仟叁"
						而 "3080" 处理为 "拾捌零仟叁"
			c.对于每一组的处理结果进行逆序
				例如 	"捌零零仟叁"		逆序后为  "叁仟零零捌"
			d.利用正则表达式的模式匹配替换功能，将连续出现的零合并为一个零
				继续上面的例子，
					var re=/零+/g;
					result=result.replace(re,"零");
					将 "叁仟零零捌元"  转换为 "叁仟零捌"

					还需进一步把以"零"结尾的情况加以处理，去掉结尾的零
					re=/零$/g;
					result=result.replace(re,"");

					如果当前组的处理结果不等于"零"，
						对于第0、1、2、3组，分别加上		"元"、"万"、"亿"、"万"，作为本组的处理结果
					如果当前组的处理结果等于"零"
						对于第0、1、2   组，分别输出		"元"、"零"、"亿"，作为本组的处理结果
			e.把各组的处理结果连起来
					例如 将第1组的处理结果"壹仟贰佰叁拾肆万" 与 第0组的处理结果"叁仟零捌元" 连起来，得到整数部分结果
						壹仟贰佰叁拾肆万叁仟零捌元
					而 1234,0000,0000,3008 经过上面的处理，成为
						壹仟贰佰叁拾肆万亿零叁仟零捌元

					要注意合并后还需对连续零合并，而且要考虑
						亿以下整数部分全为0的情况，这样会出现  XX亿零元 的情况，应该用正则表达式进行处理



	注意：小数部分不为0 是指  小数点的2位数字不全为0
	3.1 如果整数部分为0或不存在，小数部分不为0，只处理小数部分
	3.2 如果小数部分为0或不存在，整数部分不为0，只处理整数部分
			结果形式为
				整数部分转换结果  + "整"
	3.3 如果小数部分和整数部分都不为0，结果形式为
				整数部分转换结果 +  小数部分转换结果
	3.4 如果解析的浮点数为负，在结果前面加上"负"
*/
function checkValidity(numArg) {
	//如果有负号，必须在最前面
	if(numArg.indexOf("-")!=-1) {
		if (numArg.indexOf("-")!=0) {
			alert("负号必须在最前面！");
			return false;
		} else {
			numArg=numArg.replace("-","");
		}
	}
	//确保里面只包含0-9的数字和小数点，且首位不能为0
	var periodCount=0; //小数点个数
	for(var i=0;i<numArg.length;i++) {
		var curChar=numArg.charAt(i);
		if (curChar!="0" && curChar!="1" && curChar!="2"
			&& curChar!="3" && curChar!="4" && curChar!="5"
			&& curChar!="6" && curChar!="7" && curChar!="8"
			&& curChar!="9" && curChar!="." ) {
				alert("只能输入数值！");
				return false;
		}
		if(numArg.length != 1){
			if (i==0 && curChar=="0" && numArg.charAt(i+1)!=".") {
				alert("首位不能为01");
				return false;
			}
		}
		if (curChar==".") {
			periodCount++;
			if(periodCount>1) {
				alert("最多只能有一个小数点");
				return false;
			}
		}
	}
	return true;
}

function numMoneyToCnStr(numMoney) {
	var result = "";///转换的结果
	//去掉所有空格
	numMoney=numMoney.toString();
	var re=/[\s]*/g;
	numMoney=numMoney.replace(re,"");
	numMoney=numMoney.replace(/,/g,"");

	///首先判断是否是合法的数字字符；
	if(!checkValidity(numMoney)) {
		return null;
	}

	var dataVal = parseFloat(numMoney);
	if(isNaN(dataVal))
		return null;

	//解析后的浮点数不足1分，直接返回"零分"
	if(Math.abs(dataVal)<0.01) {
		return "零分";
	}

//  根据试验，浮点数的有效位数（整数部分+小数部分，不包括小数点），只能到17位
//  如果numMoney的位数很多（有效位数超过17），会丢失精度
//  所以能使用 Math.round(dataVal*100)/100来进行处理
//	如果整数部分长度超过了16位 ，也不知道如何用大写形式表达

	///求出是正还是负
	if(numMoney.indexOf("-")!=-1) { //有负号
		result+="负";
		numMoney=numMoney.replace("-","");
	}

	///求出小数点的位置，获取整数部分和小数部分
	var  decimalPosition = numMoney.indexOf(".");
	var  integerPart,fractionPart;
	if   (decimalPosition==-1) { //没有小数部分
		if(numMoney.length<=16) {
			//返回结果
			return result+handleIntegerPart(numMoney)+"整";

			} else { //长度超过16位，难以称呼
				return null;
			}
	}else  {//有小数部分
			//只取小数点后两位数字，多余部分截掉,增加四舍五入处理
			if(numMoney.length - decimalPosition == 2)
				numMoney += "0";
			var fractionLength = numMoney.substring(decimalPosition + 1).length;
			var fractionValBy100=parseInteger(numMoney.substring(decimalPosition + 1));
			var ac;
			for(var i = fractionLength - 2; i > 0; i--){
				ac = fractionValBy100%10;
				fractionValBy100 = parseInt(fractionValBy100/10);
				if(ac >= 5)
					fractionValBy100 += 1;
			}
			if (fractionValBy100>0)  {//小数部分不为0
				fractionValBy100 = fractionValBy100.toString();
				if(fractionValBy100.length == 1)
					fractionValBy100 = "0" + fractionValBy100;
				fractionPart =handleFractionPart(fractionValBy100);
				}
				else { //小数部分为0
					fractionPart="整";
				}
			var integerVal=parseInt(numMoney.substring(0,decimalPosition));
			if (integerVal>0) { //整数部分不为0
					integerStr=numMoney.substring(0,decimalPosition);
					if(integerStr.length<=16) {
						integerPart=handleIntegerPart(integerStr);
						if(fractionValBy100>0 && fractionValBy100.indexOf("0") == 0){
							integerPart += "零";
						}
					} else { //长度超过16位，难以称呼
							return null;
					}
			} else {	//整数部分为0
					integerPart="";
			}
			//返回结果
			return result+integerPart+fractionPart;
		}
}

function handleIntegerPart(integerPart) {
	var result="";
	var sectCount=0; //每4位数字作为一节处理
	var digitCount=0; //计算已经去了多少数字进入当前节
	var srcSects=new Array();  //保存提取的各节
	srcSects[sectCount]="";
	//装配各节
	for(var i=integerPart.length-1;i>=0;i--) {
		srcSects[sectCount]+=integerPart.charAt(i);
		digitCount++;
		if (digitCount==4) { //取够一节
			digitCount=0;  //节内计数器复位
			sectCount++;   //准备取下一节
			srcSects[sectCount]="";
		}
	}

	//处理各节，将结果合并起来
	for(var i=srcSects.length-1;i>=0;i--) {
		result+=handleSect(srcSects[i],i);
	}
	//合并重复零
	var re=/零+/g;
	result=result.replace(re,"零");

	//对"零元"进一步处理
	re =/零元/g;
	result=result.replace(re,"元");

	return result;
}

function handleSect(curSect,curSectIdx) {
	//因为最高节可能为空字符串，所以需要特别处理
	//注意handleIntegerPart() 中的
	//srcSects[sectCount]="";
	if(curSect=="") return "";

	var result="";
	var posInSect=0; //节内计数器
	//对节内各数字进行处理
	for(var i=0;i<curSect.length;i++) {
		var curChar=digitToChar(curSect.charAt(i));
		if (curChar!="零") {
			switch(i) {
				case 0:
					result+=curChar;
					break;
				case 1:
					result+="拾"+curChar;
					break;
				case 2:
					result+="佰"+curChar;
					break;
				case 3:
					result+="仟"+curChar;
					break;
				}
		} else {
			switch(i) {
				case 0:
					break;
				case 1:
				case 2:
				case 3:
					result+="零";
					break;
				}
		}
	}
	//对此结果作逆序处理
	result=strReverse(result);
	//利用正则表达式的模式匹配替换功能，将连续出现的零合并为一个零
	var re=/零+/g;
	result=result.replace(re,"零");
	//利用正则表达式的模式匹配替换功能，去掉结尾零
	re=/零$/g;
	result=result.replace(re,"");


	//如果当前组的处理结果不等于"零"，
	//	对于第0、1、2、3组，分别加上		"元"、"万"、"亿"、"万"，作为本组的处理结果
	//如果当前组的处理结果等于"零"
	//	对于第0、1、2、3组，分别输出		"元"、"零"、"亿"、"零"作为本组的处理结果
	if(result!="零" && result!="") {
		switch(curSectIdx) {
			case 0:
				result+="元";
				break;
			case 1:
				result+="万";
				break;
			case 2:
				result+="亿";
				break;
			case 3:
				result+="万";
				break;
			}
	} else {
		switch(curSectIdx) {
			//因为程序限制了数值的最大值，所以会出现
			// "XX亿亿零XXXX亿"的情况，所以case 3实际上执行不到
			//放在这里是为了以后扩展方便
			case 0:
				result="元";
				break;
			case 1:
				result="零";
				break;
			case 2:
				result="亿";
				break;
			case 3:
				result="零";
				break;

			}
	}
	return result;
}

function handleFractionPart(fractionPart) {
	var result="";
	for(var i=fractionPart.length-1,j=0;i>=0;i--,j++) {
		//由于前面已经舍入到分，此处最多循环2次
		var curChar=digitToChar(fractionPart.charAt(i));
		if(curChar!="零") {
			result+=((j==0)? "分" : "角")+curChar;
		}
	}
	return strReverse(result);
}

function strReverse(srcStr) {
	var result="";
	for (var i=srcStr.length-1;i>=0;i--) {
		result+=srcStr.charAt(i);
	}
	return result;
}

function capitalize(data){
  return numMoneyToCnStr(data);
}

function showMessage(message){
	window.info = message;
	var messageUrl= BASE_URL+"/message?";

	var formula = showModalDialog(messageUrl,window,
									'dialogHeight:500px;dialogWidth:600px;center:yes;help:no');
}


//把字符串中的双引号(")变换为&quot;
//把字符串中的大于号(>)变换为&gt;
//把字符串中的小于号(<)变换为&lt;
function transString(str){
	return packSpecialChar(str);
}

function transChar(str,originChar,replaceChar){
	return str.replace(originChar,replaceChar);
}

//把字符串中的单引号(')变换为两个单引号('')
//把字符串中的&gt;变换为大于号(>)
function doubleApos(str){
	if (null == str)
		return null;
	str = str.replace(/&nbsp;/g," "); // TODO: 2004-6-8 13:54 删除此行，调用处用 innerText
	str = str.replace(/\'/g,"''");
	return str;
}

/**
 * 处理字符产中的特殊字符: & < > "
 * 【注意】首先将所有的 &nbsp; 变为空格，以处理由 innerHTML 得到的字符串中的
 * 特殊字符，没有办法保留 &nbsp; 用 &amp;nbsp; 也不行
 */
function packSpecialChar(str1){
  str = "" + str1;
	if ((str == null) || (str == ""))
		return "";
	str = str.replace(/&nbsp;/g," ");
	str = str.replace(/&/g,"&amp;"); // 2004-4-29 17:43 HH add this
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/\"/g,"&quot;");
	return str;
}

/** 处理 \r\n 和 \n，替换为 &#10; */
function escapeLineBreak(str){
	if ((str == null) || (str == ""))
		return "";
	str = str.replace(/\r\n/g,"&#10;");
	str = str.replace(/\r/g,"&#10;");
	str = str.replace(/\n/g,"&#10;");
	return str;
}

/** FOP打印中使用 处理 \r\n 和 \n，替换为 &#13;&#10; */
function escapeLineBreak2(str){
	if ((str == null) || (str == ""))
		return "";
	str = str.replace(/\r\n/g,"&#13;&#10;");
	str = str.replace(/\r/g,"&#13;&#10;");
	str = str.replace(/\n/g,"&#13;&#10;");
	return str;
}

function setBtnVisible(func,visible){
	var funcbtn = document.getElementById(func + "ID");
  if (!funcbtn) return;
  var funcparentTd=funcbtn.parentNode;
  if (!funcparentTd) return;
  if  (funcparentTd.id==func + "_menuTd"){
     funcparentTd.parentNode.style.display = visible?"":"none";
     return;
  }
	if(funcbtn)
		funcbtn.style.display = visible?"":"none";
	var funcbtnLeftImg = document.getElementById(func + "_leftImg");
	if(funcbtnLeftImg)
		funcbtnLeftImg.style.display = visible?"":"none";
	var funcbtnRightImg = document.getElementById(func + "_rightImg");
	if(funcbtnRightImg)
		funcbtnRightImg.style.display = visible?"":"none";
}

function parseInteger(str){
	if((str == null) || (str.length == 0))
	  return 0;
	return parseInt(str, 10);
}

function copyNode(parentNode,node){
	var element = document.createElement(node.tagName);
	var attrs = node.attributes;
	for (var i=0,j=attrs.length; i<j; i++){
		var attrName = attrs[i].name;
		var attrValue = attrs[i].value;
		element.setAttribute(attrs[i].name,attrs[i].value);
	}
	parentNode.appendChild(element);
	for (var i=0,j=node.childNodes.length; i<j; i++){
		copyNode(element,node.childNodes[i]);
	}
}
/*
设置表格字段宽度
name:页面名或者部件名
tableName:表名
fieldName：字段名
width:宽度
*/
function setFieldWidth(name,tableName,fieldName,width){
  if (document.getElementById("svUserId")== null) return;
  var temp = document.getElementById("svUserId").value + ":" + tableName + ":" + fieldName;
	try{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var file1 = null;
		if (!fso.FileExists("c:\\cookies\\" + name + tableName + ".txt")){
  			file1 = createFile(name + tableName);
			file1.Write(temp + ":" + width);
		}
		else{
			file1 = fso.OpenTextFile("c:\\cookies\\" + name + tableName + ".txt",1);
			var before = file1.ReadAll();
			file1.Close();
			var index = before.indexOf(temp);
			if (index == -1){
				before += "&" + temp + ":" + width;
				file1 = fso.OpenTextFile("c:\\cookies\\" + name + tableName + ".txt",2);
				file1.Write(before);
			}
			else{
				var end = before.indexOf("&",index);
				var temp2;
        			if(end != -1)
	        			temp2 = before.substring(index,end);
        			else
					temp2 = before.substring(index);
				before = before.replace(temp2,temp + ":" + width);
				file1 = fso.OpenTextFile("c:\\cookies\\" + name + tableName + ".txt",2);
				file1.Write(before);
			}
		}
	}
	catch(e){
		isException = true;
		securityAlert();
	}
	finally{
		if(file1)
			file1.Close();
	}
}

function securityAlert() {
	open("securityReg.html");
}

function isFileExists(fileName){
	try{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		return fso.FileExists(fileName);
	}catch(e){
		securityAlert();
	}
}

/*
取得表格字段宽度
name:页面名或者部件名
tableName:表名
fieldName：字段名
返回值：字段宽度
*/
function getFieldWidth(name,tableName,fieldName){
	try{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var result;
	var file;
  var temp = document.getElementById("svUserId").value + ":" + tableName + ":" + fieldName;
	if (!fso.FileExists("c:\\cookies\\" + name + tableName + ".txt")){
		return 0;
	}else{
		file = fso.OpenTextFile("c:\\cookies\\" + name + tableName + ".txt",1);
		var before = file.ReadAll();
		var index = before.indexOf(temp);
		if (index == -1){
			return 0;
		}
		else{
			var end = before.indexOf("&",index);
			var temp2;
      			if (end != -1)
				temp2 = before.substring(index,end);
			else
				temp2 = before.substring(index);
			var tempLen = temp.length;
			result = temp2.substring(tempLen +1);
			result = parseInt(result);
			return result;
		}
	}
	}
	catch(e){
		isException = true;
		securityAlert();
	}
	finally{
		if(file)
			file.Close();
  	}
}
/*
设置表格表头标题的宽度
tableName：表名
fieldName:字段名
width:宽度值
*/
function setFieldCaptionWidth(tableName,fieldName,width1){
	var fieldID = document.getElementById(tableName + "_" + fieldName + "TableID");
	fieldID.style.width = width1- 2;
	var cel = document.getElementById(tableName + "_" + fieldName + "Cell");
	cel.style.width = width1;
}
/*
此函数用来创建文件.
fielName:文件名
*/
function createFile(fileName){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var file1 = null;
	if (!fso.FolderExists("c:\\cookies")){
		fso.CreateFolder("c:\\cookies");
	}
	if (!fso.FileExists("c:\\cookies\\" + fileName + ".txt"))
  		file1 = fso.CreateTextFile("c:\\cookies\\" + fileName + ".txt",true);
  	return file1;
}
//将数字以千分位显示(加逗号)
function kiloStyle(s1){
		var result = "";
		if ((s1 == null) || (s1 == ""))
			return result;
		var s = "";
		var s2 = "";
		s1 = "" + s1;
		var isMinus = false;
		if(s1.charAt(0) == "-"){
			s1 = s1.substring(1);
			isMinus = true;
		}
		var index = s1.indexOf(".");
		if (index != -1){
			s = s1.substring(0,index);
			s2 = s1.substring(index);
		}
		else{
			s = s1;
			s2 = "";
		}
    //千分位格式化后字符串中第一个逗号前字符个数.
    var head = s.length%3;
    //需要加入逗号的个数
    var numOfComma = Math.floor(s.length/3);
    if ((head != 0) && (numOfComma != 0)){
      result += s.substring(0, head);
      result += ",";
      for (var i = 0; i < numOfComma; i++) {
        result += s.substring(i*3+head,(i+1)*3+head);
				if (i != numOfComma - 1)
          result += ",";
      }
    }
    else if ((head != 0) && (numOfComma == 0)){
      result += s.substring(0,head);
    }
    else if ((head == 0) && (numOfComma != 0)){
      for (var j =0;j<numOfComma;j++){
        result += s.substring(j*3,(j+1)*3);
        if (j != numOfComma - 1)
          result += ",";
      }
    }
    else
      	result += "";
	result += s2;
	if(isMinus)
		result = "-" + result
  return result;
}
//删去千分位显示的逗号
function deleteComma(source1){
	var result = "";
	if ((source1 == "") || (source1 == null))
		return result;
	var index;
	var source;
	var source2;
	source1 = "" + source1;
  var isMinus = false;
	if(source1.charAt(0) == "-"){
		source1 = source1.substring(1);
		isMinus = true;
	}
	index = source1.indexOf(".");
	if (index != -1){
		source = source1.substring(0,index);
		source2 = source1.substring(index);
	}
	else{
		source = source1;
		source2 = "";
	}
	var first = source.indexOf(",");
	var last = first;
	if (first == -1){
		if(isMinus){
			source1 = "-" + source1;
		}
		return source1;
	}
	while(first != -1){
		result = result + source.substring(0,first);
		source = source.substring(first+1);
		last = first;
		first = source.indexOf(",");
	}
	result = result + source;
	result = result + source2;
	if(isMinus)
		result = "-" + result
	return result;
}


function setDebugMode() {
  window.doRequest = debugMode_doRequest;
  window.doRequestPage2 = debugMode_doRequestPage2;
  window.requestData = debugMode_requestData;
}

/////////////////////////////////////////////////////////////////////////////
// 平台调试函数
/////////////////////////////////////////////////////////////////////////////


function debugMode_doRequest(functionID, componame, paramNames, paramValues, callback) {
  var s;
  s = "*** doRequest\n"
    + "functionID=" + functionID + "\n"
    + "componame=" + componame + "\n"
    + "callback=" + callback + "\n"
    + "\n[paramNames / paramValues]\n";
  if (paramNames != null){
    for(var i = 0; i < paramNames.length; i++)
      s += paramNames[i] + "=" + paramValues[i] + "\n";
  }
  dump(s);

  // 这里试图模拟回调函数，但是时序有问题
  var result = document.createElement("span");
  result.setAttribute("success", "false");
  result.innerHTML = "<pre>测试环境，无法查询 caller=\n"
    + doRequest.caller + "</pre>";
  eval(callback + "(result)");
}

/**
 * 替换 doRequestPage2 : Community.js
 */
function debugMode_doRequestPage2(functionID, componame, paramNames, paramValues, target, url) {
  var s;
  s = "*** doRequestPage2\n"
    + "functionID=" + functionID + "\n"
    + "componame=" + componame + "\n"
    + "target=" + target + "\n"
    + "url=" + url + "\n"
    + "\n[paramNames / paramValues]\n";
  if (paramNames != null){
    for(var i = 0; i < paramNames.length; i++)
      s += paramNames[i] + "=" + paramValues[i] + "\n";
  }
  dump(s);
}

// 替换 requestData: Community.js
function debugMode_requestData(functionID, componame, paramNames, paramValues,url) {
  var s;
  s = "*** requestData\n"
    + "functionID=" + functionID + "\n"
    + "componame=" + componame + "\n"
    + "url=" + url + "\n"
    + "\n[paramNames / paramValues]\n";
  if (paramNames != null){
    for(var i = 0; i < paramNames.length; i++)
      s += paramNames[i] + "=" + paramValues[i] + "\n";
  }
  dump(s);

  // 这里试图模拟回调函数，但是时序有问题
  var xmldom = new ActiveXObject("Microsoft.XMLDOM");
  xmldom.loadXML("<xml id=\"result\" success=\"false\">测试环境，无法查询</xml>");
  var result = xmldom.documentElement.firstChild;
}

/** 调试用的函数 */
function dump(obj) {
  alert(obj);
}
/**
 * 取得每页可以打印的记录数
 * tplCode 打印模板代码
 */
function getPrintRowsPerPage(tplCode){
  var names = new Array();
  var values = new Array();
  names[0] = "TPL_CODE";
  values[0] = tplCode;
  var temp = requestData("fpreprint","all",names,values).text;
  if((temp) && (parseInt(temp))){
  	return parseInt(temp)
  }
  else{
  	return 0;
  }
}

/* 改变翻译 */
function changeTrans(resId, resNa){
  var names = new Array();
  var values = new Array();
  names[0] = "resId";
  values[0] = resId;
  names[1] = "resNa";
  values[1] = resNa;
  requestData("changeTrans", "all", names, values);
}

//获得财务主管名，wtm,20040830
function getFiLeader(){
      var names = new Array();
      var values = new Array();
      names[0] = "Fileader";
      values[0] = "String";
      var result = requestData("getFiLeader", "all", names, values);
      if (result==null){
         var resu = "";
         return resu ;
      }else{
      	 return result.xml;
      }
}

//
function closeMess(){
  var names = Array();
	var values = Array();
	names[0] = "userid";
	values[0] = getSv("svUserID");
	names[1] = "token";
	values[1] = TOKEN;
  var result = requestData("logout","all",names,values);
  //alert("客户端发送窗口关闭信息到后台！！");
}

//获得服务器端系统时间，wtm,20041130
function getSysDatetime(){
      var names = new Array();
      var values = new Array();
      names[0] = "sysTime";
      values[0] = "String";
      var result = requestData("getsysTime", "all", names, values);
      if (result==null){
         var resu = "";
         return resu ;
      }else{
      	 return result.xml;
      }
}
//内容发布模板提交。wtm，20041219
function pubsetSubmit(compoid,tplcode,tplhtml){
       var names = Array();
       var values = Array();
       names[0] = "compoid";
       values[0] = compoid;
       names[1] = "tplcode";
       values[1] = tplcode;
       names[2] = "tplhtml";
       values[2] = tplhtml;
       var t = requestData("pubset","all",names,values);
}


/**
 * 数值权限外部实体选择实现。wtm。20050112
 */
function fSelect(compoid,field){
	if(tableName){
		var pos = tableName.indexOf("_TEMP");//增加对虚表的过滤
		if(pos > 0){
			var tmp = tableName.substring(pos + 5);
			if(tmp.length == 0)
				return;
		}
	}
	
  var d = new Date();
  var win_select = null;
  var sCode="";
  var sName="";
  //var resultt = queryCompo(compoid,field);
  //if (resultt.length ==0){
  //  return;
  //}
  
  win_select = showModalDialog("dispatcher.action?function=selectPage&componame=" + compoid
  +"&condition=" + "&isFromSql=true&ismulti=true&sql=&d=" + d.getMilliseconds(),null,"resizable:no;status:no");
  if (win_select){
	   var aName=win_select[0];
	   var aValue=win_select[1];
	   var stype = typeof(win_select[1][0]);
	   if (stype=="string"){//单选
	   	 for(var i=0;i<aName.length;i++){
		      if (aName[i]==field){
            if (aValue[i] == "")
               continue;
            if (!(aValue[i].indexOf("SPAN")<0)){
               aValue[i] = getValId(aValue[i]);
            }
            if (sCode!="")
               sCode += ",";
           // if (resultt.toLowerCase()=="num"){
           //    sCode += aValue[i] ;
           // }else{
		           sCode += "'" + aValue[i] + "'";
           // }
		      }
	   	 }
       document.all("range_" + field).value = sCode;
	   }else{
	   	for(var i=0;i<aName.length;i++){
	   	   for(var j=0;j<aValue.length;j++){
		       if (aName[i]==field){
             if (aValue[j][i] =="")
                continue;
             if (!(aValue[j][i].indexOf("SPAN")<0)){
               aValue[j][i] = getValId(aValue[j][i]);
             }
             if (sCode!="")
                sCode += ",";
             //if (resultt.toLowerCase()=="num"){
            //   sCode +=  aValue[j][i] ;
            // }else{
		            sCode += "'" + aValue[j][i] +"'";
            // }
		       }
		     }
	   	}
      document.all("range_" + field).value = sCode;
    }
 }
}

/*
*查询部件是否虚部件，及获得字段的类型。wtm.20050119
*/
function queryCompo(compoid,field){
   var result = "";
   var names = Array();
   var values = Array();
   names[0] = "compoid";
   values[0] = compoid;
   names[1] = "field";
   values[1] = field;
   result = requestData("queryCompo","all",names,values);
   return result.text;
}

/*
*过滤数值权限外部实体选择页面中的值集。获取值集ID。WTM。20050119
*/
function getValId(value){
       var beg2 = value.indexOf(">");
       var beg1 = value.indexOf("\"");
       var beg3 = beg1 + 1;
       var lengtht = beg2 - beg1 - 2;
       value = value.substr(beg3,lengtht);
       return value;
}

/**
 * 附件删除功能。wtm。20050201
 */
function deleteFile(){
  var name = event.srcElement.getAttribute("name");
  var tableName = event.srcElement.getAttribute("tablename");
  var mainTable = getMainTableName();
  var fieldEle = document.getElementById(tableName + "_" + name + "ID");
  if(fieldEle.getAttribute("alwaysreadonly") == "true" ||
     document.getElementById("status").getAttribute("value") == "edit") return;
  if (!confirm("确定要删除吗？"+"\r\n"+"注：点击确定后，即使未保存也会删除该文件！"))
     return;
  var fileId = document.getElementById(tableName+"_"+name + "_BLOBIDID").value;
  if (!fileId){
    if (getCurrentRow(tableName)){
         var colName = name+"_BLOBID";
         fileId = getRowField(getCurrentRow(tableName),colName);
         setRowField(getCurrentRow(tableName),colName,"");
    }
  }
  var names = Array();
  var values = Array();
  names[0] = "fileid";
  values[0] = fileId;
  var t = requestData("delFile","all",names,values);
  document.getElementById(tableName+"_"+name + "ID").value = "";
  document.getElementById(tableName+"_"+name + "_BLOBIDID").value = "";
  if (document.getElementById(name + "_IMAGE") != null){
      document.getElementById(name + "_IMAGE").style.display = "none";
      document.getElementById(name + "_IMAGE").src = "";
  }
  document.getElementById(name + "_DELID").style.display = "none";
  document.getElementById(name + "_BWSID").style.display = "";
  changed = true;
}

//为西城财政局用户加的，在其他系统使用的时候，要根据短信服务器情况二改动
function sendShortMessage(receiver, message){
	var url = "http://10.48.178.39/Message/SmartSms.asp?ToSenderNumber="
  							+ receiver + "&Message=";
	var str = escapeSpecial(message);
  str = URLEncoding(str);
  url = url + str;
 	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 	xmlhttp.Open("POST", url, false);
 	xmlhttp.setRequestHeader("Content-Length", url.length);
 	xmlhttp.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
 	xmlhttp.send(url);
}

//最普通的发送邮件
function sendEmail(from, to, cc, bcc, subject, body, mimeType, callBack, compo_id){
  operationID = "sendEmail";
 	com_sendEmail("sendEmail", from, to, cc, bcc, subject, body, mimeType, callBack, compo_id);
}

//发送邮件给内部的职员，也就是系统到AS_EMP表中去查找职员的邮件地址。
function sendEmailToUser(from, to, cc, bcc, subject, body, mimeType, callBack, compo_id){
  operationID = "sendEmailToUser";
 	com_sendEmail("sendEmailToUser", from, to, cc, bcc, subject, body, mimeType, callBack, compo_id);
}

function com_sendEmail(func, from, to, cc, bcc, subject, body, mimeType, callBack, compo_id){
	var names = new Array();
	var values = new Array();
	names[0] = "from";
	values[0] = from; //发送用户
	names[1] = "to";
	values[1] = to; //接收用户列表
	names[2] = "cc";
	values[2] = cc;
	names[3] = "bcc";
	values[3] = bcc;
	names[4] = "subject";
	values[4] = subject;
	names[5] = "body";
	values[5] = body;
	names[6] = "mimeType";
	values[6] = mimeType;
  if(!callBack || null == callBack)
  	callBack = "sendEmail_R";
  if(compo_id == null || compo_id.toUpperCase() == "ALL")
  	compo_id = "AS_LOG";
	var com = getCommunity();
	if(com != null){
  	com.doRequest(func, compo_id, names, values, callBack);
	}
}

function sendEmail_R(){
}

//以金额的形式显示字符串，没有进行四舍五入
function kiloMoneyStyle(source){
  if(!source || source.length == 0 || source == null)
  	return "";
  var index = source.indexOf(".");
  var length = source.length;
  if(index == -1)
  	return kiloStyle(source + ".00");
  else{
    var temp = index + 3;
    if(temp == length){
      return kiloStyle(source);
    }
    if(temp == (length + 1)){
      return kiloStyle(source + "0");
    }
    if(temp < length){
      return kiloStyle(source.substring(0, temp));
    }
  }
}

function parseConStrToArray(condition) {
	var names = new Array();
	var values = new Array();
	var pairs = condition.split(";");
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i];
		var res = pair.split("=");
		names.push(res[0]);
		values.push(res[1]);
	}
	return [names, values];
}

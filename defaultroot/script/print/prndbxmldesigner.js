/* $Id: prndbxmldesigner.js,v 1.7.2.1 2009/12/04 07:53:43 liuxiaoyong Exp $*/
///打印模版的参照物
var reference = "templatebody";
var prnTplCode;
var yes = "y";
var no  = "n";
var isJasper = true;

//保存模板
function saveTemplate(prn_tpl_code,prn_tpl_name){
	if (!getaTempValid()){
		alert("模板定义高度小于模板高度，请将各个区域高度减小到适中高度!");
		return;
	}
	prnTplCode = prn_tpl_code;
	isOld = false;
	if(newflag){//newflag = false;//数据库中存在为false，不存在为true
	 	//alert("===============");
		savePrintMasterDetailData(prn_tpl_code,prn_tpl_name);
		if (componameprn!=""){
			var params = new Array();
			params[0]=componameprn;
			params[1]="jasperreport";
			params[2]="template";
			params[3]=prn_tpl_code;
			params[4]=0;
			setPrintSetParam(params);
		}
	}else
		saveTemplateToHTML(prn_tpl_code);
}
/*
将打印时的基本参数设置到cookie中进行存储
传入参数params为一维数组，为getPrintSetParam()函数的返回值

设置存储到cookie的值为一串字符：
处理说明：对传入参数params每一元素 以 部件名+“_L” 或 部件名+“_E”开始，"; expires=" + 日期 结束；
					中间部分按传入参数情况加有字符
		A。fop打印：传入参数两个元素
				"compopagename="+params[0]
				"blueprint="  + escape(params[1])
		B。jasperreport打印 页面打印 传入参数六个元素
				"compopagename="+params[0]
				"blueprint="  + escape(params[1]);
				"selectprint="  + escape(params[2]);
				"printEmpty=" + escape(params[3]);
				"printZero=" + escape(params[4]);
				"exportType=" + escape(params[5]);
		C。jasperreport打印 模板打印 传入参数五个元素
				"compopagename="+params[0]
				"blueprint="  + escape(params[1]);
				"selectprint="  + escape(params[2]);
				"tplcode="  + escape(params[3]);
				"tplexportType="  + escape(params[4]);
*/
function setPrintSetParam(params){
	var expire = new Date();
	var str = "";
	expire.setFullYear(expire.getFullYear(expire) + 1);
	var entityName=escape(params[0]);
	str = entityName + "compopagename=" + escape(params[0]);
	document.cookie = str + "; expires=" + expire.toGMTString();
	if (params[1]=="fop"){
		str = entityName + "blueprint="  + escape(params[1]);
		document.cookie = str + "; expires=" + expire.toGMTString();
		}
	else if (params[1]=="jasperreport"){
		str = entityName + "blueprint="  + escape(params[1]);
		document.cookie = str + "; expires=" + expire.toGMTString();
		if (params[2]=="notemplate"){
			str = entityName + "selectprint="  + escape(params[2]);
			document.cookie = str + "; expires=" + expire.toGMTString();
			str = entityName + "printEmpty=" + escape(params[3]);
			document.cookie = str + "; expires=" + expire.toGMTString();
			 str = entityName + "printZero=" + escape(params[4]);
			document.cookie = str + "; expires=" + expire.toGMTString();
			str = entityName + "exportType=" + escape(params[5]);
			document.cookie = str + "; expires=" + expire.toGMTString();
			}
		else if (params[2]=="template"){
			str = entityName + "selectprint="  + escape(params[2]);
			document.cookie = str + "; expires=" + expire.toGMTString();
			str = entityName + "tplcode="  + escape(params[3]);
			document.cookie = str + "; expires=" + expire.toGMTString();
			str = entityName + "tplexportType="  + escape(params[4]);
			document.cookie = str + "; expires=" + expire.toGMTString();
			}
	}
}
/**
 * 另存为模板
 */
function saveAsTemplate(){
	var win = showModalDialog("./jsp/print/prnmaindatadesigner.jsp",null,
	"dialogHeight:400px;dialogWidth:400px;center:yes;status:no");
	if(!win)
		return;
	else{
		var name = win[0];
		var code = win[1];
		prnTplCode=code;
		isOld = false;
		savePrintMasterDetailData(code,name);
	}
}
//保存模板
function saveTemplateToHTML(prn_tpl_code){
	var names = new Array();
	var values = new Array();
	names[0]  = "tableName";
	if(!isJasper)
		values[0] = "AS_PRINT_TEMPLATE";
	else
		values[0] = "AS_PRINT_JASPERTEMP";
	names[1]  = "fieldName";
	values[1] = "PRN_TPL_HTML";
	names[2]  = "condition";
	if(!isJasper)
		values[2] = "PRN_TPL_CODE = '"+prn_tpl_code+"'";
	else
		values[2] = "PRN_TPL_JPCODE = '" + prn_tpl_code + "'";
	names[3]  = "textData";
	var templateBodyObj = document.getElementById("templatebody");
	values[3] = templateBodyObj.outerHTML;
	var reg = /''/g;
	values[3] = values[3].replace(reg,"'");
	names[4] = "rowCount";
	var rowCount;
	if(prnFixRowCount==""||prnFixRowCount==null)
		rowCount = 0;
	else
		rowCount = prnFixRowCount
	values[4] = rowCount;
	communityLogin = getCommunity();
	if (communityLogin != null) {
		if(!isJasper)
			 communityLogin.doRequest("setTextData","RP_PRINT_TEMPLATE",names,values,"setHTMLTextData_re");
		else
			communityLogin.doRequest("setJasperTextData","AS_PRINT_TEMPLATE",names,values,"setHTMLTextData_re");
	}
}

function setHTMLTextData_re(result){
	if(result.getAttribute("success") == "false"){
		//取数出错处理
		alert("保存模板失败！\n失败信息:"+result.childNodes[0].nodeValue);
	}else{
		makeTemplate(prnTplCode);
	}
}

///保存打印母子数据
function savePrintMasterDetailData(prn_tpl_code,prn_tpl_name){
	 var ianames = new Array();
	 var iavalues = new Array();
	 ianames[0] = "data";
	 iavalues[0] = createPrintMasterDetailData(prn_tpl_code,prn_tpl_name);
	 ianames[1] = "componame";
	 if(!isJasper)
		 iavalues[1] = "AS_PRINT_TEMPLATE";
	 else
		 iavalues[1] = "AS_PRINT_JASPERTEMP";
	 communityLogin = getCommunity();
	 if (communityLogin != null) {
		 if(!isJasper)
				communityLogin.doRequest("savePrintTemplate","AS_PRINT_TEMPLATE",ianames,iavalues,"insert_re");
			else
				communityLogin.doRequest("savePrintTemplate","AS_PRINT_JASPERTEMP",ianames,iavalues,"insert_re");
	 }
}

function insert_re(result){
	if(result.getAttribute("success") == "false"){
		//出错处理
		alert("错误信息："+result.childNodes[0].nodeValue);
	}else{
		newflag = false;
		saveTemplateToHTML(prnTplCode);
	}
}

///形成母子表格式的XML数据:data
function createPrintMasterDetailData(prn_tpl_code,prn_tpl_name,prn_compo_id)
{
	///母表AS_PRINT_TEMPLATE
	if(!isJasper){
		var data = "<entity name=\"AS_PRINT_TEMPLATE\">";
		data += "<field name=\"PRN_TPL_NAME\" value=\""+prn_tpl_name+"\"/>";
		data += "<field name=\"PRN_TPL_CODE\" value=\""+prn_tpl_code+"\"/>";
		data += "<entity name=\"AS_PRINT_XML\">";
		data += "<row><entity name=\"AS_PRINT_XML\">";
		data += "</entity></row>";
		data += "</entity>";
		data += "</entity>";
		return data;
	}
	else{
		//var data = "<delta>";
		var data = "";
		data = data + "<entity name=\"AS_PRINT_JASPERTEMP\">";
		data = data + "<field name=\"PRN_COMPO_ID\" value=\"" + entityName + "\"/>";
		data = data + "<field name=\"PRN_TPL_JPCODE\" value=\"" + prn_tpl_code + "\"/>";
		data += "<field name=\"PRN_TPL_NAME\" value=\""+prn_tpl_name+"\"/>";
		var prnTplOutType = 0;
		data = data + "<field name=\"PRN_TPL_OUTTYPE\" value=\"" + prnTplOutType + "\"/>";
		var prnTplFixRowCount = prnFixRowCount;
		data = data + "<field name=\"PRN_TPL_FIXROWCOUNT\" value=\"" + prnTplFixRowCount + "\"/>";
		var reportType = prnReportType;
		data = data + "<field name=\"PRN_TPL_REPORTTYPE\" value=\"" + reportType + "\"/>";
		data = data + "<field name=\"CO_CODE\" value=\"" + cocode + "\"/>";
		data += "</entity>";
		//data += "</entity></delta>";
		return data;
	}
}

///取模板
function loadTemplate(prn_tpl_code,prn_tpl_name)
{
	if(newflag)
		return;
	///prn_tpl_code = "test";
	var names = new Array();
	var values = new Array();
	names[0]  = "tableName";
	values[0] = "AS_PRINT_JASPERTEMP";
	names[1]  = "fieldName";
	values[1] = "PRN_TPL_HTML";
	names[2]  = "condition";
	values[2] = "PRN_TPL_JPCODE = '"+prn_tpl_code+"'";

	communityLogin = getCommunity();
	///alert(names);
	///alert(values);
	if (communityLogin != null) {
		communityLogin.doRequest("getTextData","RP_PRINT_TEMPLATE",names,values,"getHTMLTextData_re");
	}
}
function getHTMLTextData_re(result){
	if(result.getAttribute("success") == "false"){
		//取数出错处理
		alert(result.childNodes[0].nodeValue);
	}else{
		///alert(result.innerHTML);
		var templateBodyObj = document.getElementById("templatebody");
		templateBodyObj.outerHTML = result.childNodes[0].nodeValue;
					setDivMustInit();
	}
}

//取模板从文件
function loadTemplateFromFile(prn_tpl_code)
{
		var names = new Array();
		var values = new Array();
		names[0]  = "prn_tpl_code";
		values[0] =prn_tpl_code;

		communityLogin = getCommunity();
		if (communityLogin != null) {
				communityLogin.doRequest("getTextDataFromFile","all",names,values,"getHTMLTextDataFromFile_re");
		}
}
function getHTMLTextDataFromFile_re(result){
		if(result.getAttribute("success") == "false"){
			//取数出错处理
			alert(result.childNodes[0].nodeValue);
		}
		else{
			if(result.childNodes[0].nodeValue.indexOf("false:") == 0){
				//alert("aaa");
				compoAutoTempLayout(prnSaveName,entityName,prnSavecnName, prnReportType);
			}
			else{
				var templateBodyObj = document.getElementById("templatebody");
				templateBodyObj.outerHTML = result.childNodes[0].nodeValue;
				var tableObj=document.getElementsByTagName("TABLE");
				for(var i=0;i<tableObj.length;i++)
					if(tableObj[i].id.indexOf("PRN_table_")>-1){
						tableObj[i].attachEvent("onmouseover",mouseIntoTable);
						tableObj[i].attachEvent("onmouseout", mouseOffTable);
						tableObj[i].attachEvent("onselectstart",selectStTable);
				}
				newflag = false;//数据库中存在为false，不存在为true
				setDivMustInit();
			}
		 }
}
///长度单位转换，把相对长度（象素）转换为绝对长度（pt）
function unitConvert(pixel)
{
	if(pixel == "")
		return pixel;
	var parsedPixel = parseInt(pixel);
	if(isNaN(parsedPixel))
		return pixel;
	else
		pixel = parsedPixel;
	var zoom = 100;
	var screenResolution = 96;
	var inchToPt = 72;///每英寸有多少个点
	var convertedValue = 0;
	convertedValue = Math.round(pixel/screenResolution*inchToPt*zoom/100);
	return convertedValue;
}
/**
 * 毫米转成pt(未使用)
 */
function mmToPt(mm){
	if(mm == "")
		return mm;
	var parsedmm = parseFloat(mm);
	if(isNaN(parsedmm))
		return mm;
	else
		mm = parsedmm;
	var convertedValue = 0;
	convertedValue = Math.round(mm*72/25.4);
	return convertedValue;
	}
/**
 * 毫米->象素
 */
function mmToPixel(mm){
	if(mm == "")
		return mm;
	var parsedmm = parseFloat(mm);
	if(isNaN(parsedmm))
		return mm;
	else
		mm = parsedmm;
	var convertedValue = 0;
	convertedValue = Math.round(mm*96/25.4);
	return convertedValue;
	}
/**
 * pixel -> 毫米
 */
function pixelToMm(pixel){
	if(pixel == "")
		return pixel;
	var parsedpixel = parseFloat(pixel);
	if(isNaN(parsedpixel))
		return pixel;
	else
		pixel = parsedpixel;
	var convertedValue = 0;
	convertedValue = Math.round(pixel*25.4/96);
	return convertedValue;
	}
///生成xml格式的模版并保存到数据库
function makeTemplate(prn_tpl_code){
	var xml;
	if(!isJasper){
		xml = makeTemplateXML(prn_tpl_code,newflag);
	}
	else{
		var templateBodyObj = document.getElementById("templatebody");
		var printpages = templateBodyObj.getAttribute("printpages");
		if(printpages=="y"){
			isMorePages = true;
			xml = getJasperXMLMorePages(prn_tpl_code);
		}
		else{
			isMorePages = false;
			xml = getJasperXML(prn_tpl_code);
		}
	}
	var names = new Array();
	var values = new Array();
	names[0]  = "tableName";
	values[0] = "AS_PRINT_XML";
	names[1]  = "fieldName";
	values[1] = "PRN_TPL_XML";
	names[2]  = "condition";
	values[2] = "PRN_TPL_CODE = '"+prn_tpl_code+"'";
	names[3]  = "textData";
	var reg = /''/g;
	values[3] = xml.replace(reg,"'");
	names[4] = "rowCount";
	values[4] = records;
	names[5] = "v51Product";
	values[5] = isV51Product(getProductCode(entityName));
	communityLogin = getCommunity();
	if (communityLogin != null) {
		if(!isJasper)
			communityLogin.doRequest("setTextData","RP_PRINT_TEMPLATE",names,values,"setXMLTextData_re");
		else
			communityLogin.doRequest("setJasperTextData","AS_PRINT_JASPERTEMP",names,values,"setXMLTextData_re");
	}
}

///生成xml格式的模版
function makeTemplateXML(prn_tpl_code,new_prn_tpl_flag){
	if(new_prn_tpl_flag){
		alert("新建打印模板时请先保存模板再生成模板！");
		return;
	}
	var xml = "<delta>\n";
	xml += "<entity name=\"pagesetup\">\n";
	xml += formatPageSetup();
	xml += "</entity>\n";
	///header
	xml += "<entity name=\"header\">\n";
	xml += formatHeader();
	xml += "</entity>\n";

	///rpbody
	xml += "<entity name=\"rpbody\">\n";
	xml += formatRpBody();
	xml += "</entity>\n";

	///footer
	xml += "<entity name=\"footer\">\n";
	xml += formatFooter();
	xml += "</entity>\n";

	xml += "</delta>\n";
	return xml;
}

function setXMLTextData_re(result){
	var message1 = "生成模板失败！\n";
	message1 += "----------------------------\n";
	message1 += "错误信息:\n\n";
	var message2 = "----------------------------\n\n";
	message2 += "请根据错误信息调整模板,如果无法实现,请将错误信息发回用友政务公司,我们会尽快给您回复！\n\n";
	message2 += "---------谢谢合作！---------";
	if(result.getAttribute("success") == "false"){
		//取数出错处理
		//showMessage(message1 + result.innerHTML + "\n\n" + message2);
		alert(message1 + result.childNodes[0].nodeValue + "\n\n" + message2);
	}else{
		if(result.childNodes[0].nodeValue=="valid"){
			alert("保存并生成模板成功！");
		}else{
			//showMessage(message1 + result.innerHTML + "\n\n" + message2);
			alert(message1 + result.childNodes[0].nodeValue + "\n\n" + message2);
		}
	}
}

///格式化打印设置
function formatPageSetup(pagesetup)
{
	var pageSetup = "";
	var templateBodyObj = document.getElementById("templatebody");
	//pageSetup += "<field name=\"unit\" value=\"mm\" />\n";
	pageSetup += "<field name=\"page-width\" value=\""+unitConvert(templateBodyObj.getAttribute("pwidth"))+"\" />\n";
	pageSetup += "<field name=\"page-height\" value=\""+unitConvert(templateBodyObj.style.height)+"\" />\n";
	pageSetup += "<field name=\"margin-top\" value=\""+unitConvert(templateBodyObj.style.paddingTop)+"\" />\n";
	pageSetup += "<field name=\"margin-bottom\" value=\""+unitConvert(templateBodyObj.style.paddingBottom)+"\" />\n";
	pageSetup += "<field name=\"margin-left\" value=\""+unitConvert(templateBodyObj.style.paddingLeft)+"\" />\n";
	pageSetup += "<field name=\"margin-right\" value=\""+unitConvert(templateBodyObj.style.paddingRight)+"\" />\n";
	pageSetup += "<field name=\"zoom\" value=\""+templateBodyObj.getAttribute("zoom")+"\" />\n";
	pageSetup += "<field name=\"blackWhite\" value=\""+templateBodyObj.getAttribute("blackwhite")+"\" />\n";
	pageSetup += "<field name=\"orientation\" value=\""+templateBodyObj.getAttribute("orientation")+"\" />\n";
	var isadjustheader = templateBodyObj.getAttribute("isadjustheader");
	if(isadjustheader == "y")
		pageSetup += "<field name=\"isadjustheader\" value=\"y\" />\n";
	else
		pageSetup += "<field name=\"isadjustheader\" value=\"n\" />\n";
	return pageSetup;
}

///格式化打印模版的页眉和表头
function formatHeader()
{
	var header = "";
	var pageHeaderObj = document.getElementById("pageheader");
	var rpHeaderObj = document.getElementById("rpheader");
	header += "<field name=\"region-before\" value=\""+unitConvert(rpHeaderObj.offsetHeight+getObsoluteTop(rpHeaderObj,"rpheader"))+"\" />\n";
	header += "<field name=\"items\" value=\""+(pageHeaderObj.children.length+rpHeaderObj.children.length)+"\" />\n";

	if(pageHeaderObj.children.length != 0)
		header += fetchChild(pageHeaderObj,"pageheader",0);

	if(rpHeaderObj.children.length != 0)
		header += fetchChild(rpHeaderObj,"rpheader",pageHeaderObj.children.length);
	///alert("header:"+header);
	return header;
}

///格式化打印模版的表体
function formatRpBody(){
	var rpBody = "";
	var rpbodyObj = document.getElementById("rpbody");
	if(rpbodyObj.children.length != 0)
		rpBody = fetchBody(rpbodyObj);
	return rpBody;
}

///格式化打印模版的表尾和页脚
function formatFooter(){
	var footer = "";
	var rpFooterObj = document.getElementById("rpfooter");
	var pageFooterObj = document.getElementById("pagefooter");
	footer += "<field name=\"region-after\" value=\""+unitConvert((pageFooterObj.offsetTop - rpFooterObj.offsetTop)+pageFooterObj.offsetHeight)+"\" />\n";
	footer += "<field name=\"items\" value=\""+(rpFooterObj.children.length+pageFooterObj.children.length)+"\" />\n";

	if(rpFooterObj.children.length != 0)
		footer += fetchChild(rpFooterObj,"rpfooter",0);

	if(pageFooterObj.children.length != 0)
		footer += fetchChild(pageFooterObj,"pagefooter",rpFooterObj.children.length);

	///alert("footer:"+footer);
	return footer;
}

///element:求相对于打印模版左边距的元素；
///reference:求相对于谁的左边距
function getObsoluteLeft(element)
{
	var left = element.offsetLeft;
	if(element.offsetParent.id != reference)
		left += getObsoluteLeft(element.offsetParent);

	return left;
}
///element:求相对于打印模版上边距的元素；
///reference:求相对于谁的上边距
function getObsoluteTop(element,who){
	var top = element.offsetTop;
	if((who == "rpfooter") || (who == "pagefooter"))	{
		var rpFooterObj = document.getElementById("rpfooter");
		return (top - rpFooterObj.offsetTop);
	}
	if(element.offsetParent.id != reference)
		top += getObsoluteTop(element.offsetParent,who);
	return top;
}
///取所有子节点的内容
function fetchChild(items,who,index){
	var childValue = "";
	if (items != "") {
		for (var j = 0; j < items.children.length; j++,index++) {
			///表格另外处理
			if(items.all(j).tagName == "TABLE")
				childValue += fetchTable(items.children.item(j));
			else{
				var prefix = "item-"+(index+1)+"-1-";
				childValue += "<field name=\"item-"+(index+1)+"-col\" value=\"1\" />\n";
				childValue += "<field name=\""+prefix+"offsetHeight\" value=\""+unitConvert(items.children.item(j).offsetHeight)+"\" />\n";
				childValue += "<field name=\""+prefix+"offsetWidth\" value=\""+unitConvert(items.children.item(j).offsetWidth)+"\" />\n";
				childValue += "<field name=\""+prefix+"offsetLeft\" value=\""+unitConvert(getObsoluteLeft(items.children.item(j)))+"\" />\n";
				childValue += "<field name=\""+prefix+"offsetTop\" value=\""+unitConvert(getObsoluteTop(items.children.item(j),who))+"\" />\n";
				childValue += getElementProperty(prefix,items.children.item(j),"DIV");
			}
		}
	}
	return childValue;
}

///取表体部分内容
function fetchBody(items){
	var recursionValue = "";
	if (items != "") {
		if (items.children.length != 0) {
			for (var j = 0; j < items.children.length; j++) {
				if(items.all(j).tagName == "TABLE")
					recursionValue += fetchTable(items.children.item(j),"TABLE");
			}
		}
		else{
			recursionValue += fetchOther(items);
		}
	}
	return recursionValue;
}

///取表体内容除table tag以外tag的内容；
function fetchOther(item)
{
	var otherInfo = "";
	var prefix = "item-1-1-";
	otherInfo += "<field name=\"items\" value=\"1\" />\n";
	otherInfo += "<field name=\"item-1-col\" value=\"1\" />\n";
	otherInfo += "<field name=\""+prefix+"offsetHeight\" value=\""+unitConvert(item.offsetHeight+1)+"\" />\n";
	otherInfo += "<field name=\""+prefix+"offsetLeft\" value=\""+unitConvert(getObsoluteLeft(item))+"\" />\n";
	otherInfo += "<field name=\""+prefix+"offsetTop\" value=\""+unitConvert(getObsoluteTop(item),"rpbody")+"\" />\n";
	otherInfo += "<field name=\""+prefix+"offsetWidth\" value=\""+unitConvert(item.offsetWidth)+"\" />\n";
	otherInfo += getElementProperty(prefix,item,"DIV");
	return otherInfo;
}

///取表体内容table tag的内容；
function fetchTable(tableObj){
	var tableFixedInfo = "";
	var tableRepeatInfo = "";
	var tablePrefix = "tab-1-";
	var totalTableInfo  = "<field name=\"tables\" value=\"1\" />\n";
	if(tableObj.getAttribute("print") == yes)
		totalTableInfo += "<field name=\""+tablePrefix+"isPrintBorder\" value=\"Y\" />\n";
	else
		totalTableInfo += "<field name=\""+tablePrefix+"isPrintBorder\" value=\"N\" />\n";
	if(tableObj.getAttribute("needadjust") == yes)
		totalTableInfo += "<field name=\"tab-1-needadjust\" value=\"Y\" />\n";
	totalTableInfo += getPrintTemplateType(tableObj);///得到打印模板的类型
	var countHeadlines = 0;
	var countBodylines = 0;
	var countCols = 0;
	var countHeader = 0;
	var countFooter = 0;
	var isHeader = true;///false : isFooter,  true : isHeader;
	///求某个单元格的绝对的列号（有跨行跨列时）
	var cellPos = parseTableCellPos(tableObj);
	//变动行为0时，临时保存各列的宽度（要求所有行中每列至少单独出现一次）
	var tmpInfo = "";
	var i,j;
	for (i=0; i < tableObj.rows.length; i++){
		var isRepeat = tableObj.rows(i).getAttribute("repeat");///固定行还是变动行
		if((isRepeat == no)||(!isRepeat)){///固定内容，表头
			countHeadlines++;
			if(isHeader)
				countHeader++;
			else
				countFooter++;
			for (j=0; j < tableObj.rows(i).cells.length; j++){
				if (tableObj.rows(i).cells(j).colSpan == 1){
					if (tmpInfo.indexOf("tab-1-"+cellPos[i][j]+"-width") == -1){
						tmpInfo += "<field name=\"tab-1-"+cellPos[i][j]+"-width\" value=\""+unitConvert(tableObj.rows(i).cells(j).offsetWidth)+"\" />\n";
						if (cellPos[i][j] > countCols)
							countCols = cellPos[i][j];
					}
				}
				var prefix = "tab-1-"+countHeadlines+"-"+(j+1)+"-";
				if(tableObj.rows(i).cells(j).getAttribute("colprint") == "n"){
					continue;
					}
				tableFixedInfo += "<field name=\""+prefix+"rows\" value=\""+tableObj.rows(i).cells(j).rowSpan+"\" />\n";
				tableFixedInfo += "<field name=\""+prefix+"cols\" value=\""+tableObj.rows(i).cells(j).colSpan+"\" />\n";
				tableFixedInfo += "<field name=\""+prefix+"bcol\" value=\""+cellPos[i][j]+"\" />\n";
				tableFixedInfo += "<field name=\""+prefix+"ecol\" value=\""+(tableObj.rows(i).cells(j).colSpan+cellPos[i][j]-1)+"\" />\n";
				tableFixedInfo += getElementProperty(prefix,tableObj.rows(i).cells(j),"TABLE");
			}
		}
		else{///变动内容
			countBodylines++;
			isHeader = false;
			for (j=0; j < tableObj.rows(i).cells.length; j++){
				var prefix = "line-1-"+countBodylines+"-"+(j+1)+"-";
				if(tableObj.rows(i).cells(j).getAttribute("colprint") == "n"){
					continue;
					}
				tableRepeatInfo += "<field name=\"tab-1-"+(j+1)+"-width\" value=\""+unitConvert(tableObj.rows(i).cells(j).offsetWidth)+"\" />\n";
				tableRepeatInfo += getElementProperty(prefix,tableObj.rows(i).cells(j),"TABLE");
			}
		}
	}
	///只有表的标题行，没有内容行（变动行）；
	if(countBodylines == 0)
		tableRepeatInfo += tmpInfo;
	totalTableInfo += "<field name=\"tab-1-cols\" value=\""+countCols+"\" />\n";
	totalTableInfo += "<field name=\"tab-1-headlines\" value=\""+countHeader+"\" />\n";
	totalTableInfo += "<field name=\"tab-1-footlines\" value=\""+countFooter+"\" />\n";

	var tempValue = tableObj.borderColor==""?"#000000":tableObj.borderColor;
	totalTableInfo += "<field name=\"tab-1-borderColor\" value=\""+tempValue+"\" />\n";
	tempValue = tableObj.style.borderStyle==""?"solid":tableObj.style.borderStyle;
	totalTableInfo += "<field name=\"tab-1-borderStyle\" value=\""+tempValue+"\" />\n";
	tempValue = tableObj.border==""?"0":tableObj.border;
	totalTableInfo += "<field name=\"tab-1-borderWidth\" value=\""+2*unitConvert(tempValue)+"\" />\n";
	totalTableInfo += tableFixedInfo;
	totalTableInfo += "<field name=\"tab-1-recordLines\" value=\""+countBodylines+"\" />\n";
	totalTableInfo += tableRepeatInfo;
	///showMessage("totalTableInfo:"+totalTableInfo);
	return totalTableInfo;
}

///得到打印模板的类型:normal 普通表格  fix 固定行数  single 类似工资条  long  纵向拆分表，表的模板大小超过纸张大小；
function getPrintTemplateType(tableObj){
	var templateType;
	var tpl = null;
	///类似工资条
	if(tableObj.getAttribute("repeat") == yes){
		tpl = "single";
		templateType = "<field name=\"tab-1-type\" value=\"" + tpl + "\" />\n";
		templateType += "<field name=\"tab-1-single-paddingBottom\" value=\""+tableObj.getAttribute("tablespace")+"\" />\n";
	}
	///补空行，固定行数
	if((tableObj.getAttribute("printnum") != null) && (parseInt(tableObj.getAttribute("printnum")) > 1))	{
		tpl = "fix";
		templateType = "<field name=\"tab-1-type\" value=\"" + tpl + "\" />\n";
		templateType += "<field name=\"tab-1-recordsPerTable\" value=\""+tableObj.getAttribute("printnum")+"\" />\n";
		if((tableObj.getAttribute("tailnum") != null) && (!isNaN(parseInt(tableObj.getAttribute("tailnum")))))
			templateType += "<field name=\"tab-1-fixtailnum\" value=\""+tableObj.getAttribute("tailnum")+"\" />\n";
	}
	var templateBodyObj = document.getElementById("templatebody");
	if(templateBodyObj.getAttribute("multiTemplatePage") == "Y")	{
		tpl = "long";
		templateType = "<field name=\"tab-1-type\" value=\"" + tpl + "\" />\n";
	}
	if(tpl == null){
		tpl = "normal";
		templateType = "<field name=\"tab-1-type\" value=\"" + tpl + "\" />\n";
	}
	return templateType;
}

function parseTableCellPos(tableObj){
	var cellflag = new Array(tableObj.rows.length);///对应虚拟的二位表格（是被求表格的最大行和最大列的二位数组）每个单元格是否被遍历过
	var result = new Array(tableObj.rows.length);///每个实际单元格所对应的绝对列号；
	var i,j;
	var maxCols = 0;
	///求最大列数
	for (i=0; i < tableObj.rows.length; i++) 	{
		maxCols = Math.max(maxCols,tableObj.rows(i).cells.length);
	}
	for (i=0; i < tableObj.rows.length; i++) 	{
		var cellflagCol = new Array(maxCols);
		var resultCol = new Array(tableObj.rows(i).cells.length);
		cellflag[i] = cellflagCol;
		result[i]   = resultCol;
	}
	for (i=0; i < tableObj.rows.length; i++) 	{
		for (j=0; j < tableObj.rows(i).cells.length; j++) {
			var k,h,iflag=1;
			for(k=0;k < maxCols;k++){
				if(cellflag[i][k] == 1)
					iflag++;
				else
					break;
			}
			cellflag[i][iflag-1] = 1;
			result[i][j] = iflag;
			for(k=0;k < tableObj.rows(i).cells(j).colSpan;k++,iflag++){
				if((tableObj.rows(i).cells(j).colSpan > 1)&& (k >0)){
					cellflag[i][iflag-1] = 1;
				}
				for(h = 0;h < tableObj.rows(i).cells(j).rowSpan;h++)
					if((tableObj.rows(i).cells(j).rowSpan > 1)&& (h >0)){
						cellflag[i+h][iflag-1] = 1;
					}
			}
		}
	}
	return result;
}

///取元素属性
function getElementProperty(prefix,element,flag){
	var property="";
	var tempValue;
	var print = element.getAttribute("print");///补空行
	if(print == yes || print == null){
		tempValue = element.innerText;
		tempValue = tempValue.replace(/&nbsp;/g," ");
		property += "<field name=\""+prefix+"name\" value=\""+tempValue+"\" />\n";
	}
	else
		property += "<field name=\""+prefix+"name\" value=\"\" />\n";
	var valSetCode = element.getAttribute("printValSetCode");
	if((valSetCode == "y") || (valSetCode == null)){
		property += "<field name=\"" + prefix + "printValSetCode\" value=\"y\" />\n";
	}
	else{
		property += "<field name=\"" + prefix + "printValSetCode\" value=\"n\" />\n";
	}
	///字体
	tempValue = element.style.color==""?"#000000":element.style.color;
	property += "<field name=\""+prefix+"color\" value=\""+tempValue+"\" />\n";
	tempValue = element.style.fontFamily==""?"simkai":element.style.fontFamily
	property += "<field name=\""+prefix+"fontFamily\" value=\""+tempValue+"\" />\n";
	var fontsize = element.style.fontSize==""?"16":element.style.fontSize;
	fontsize = parseInt(fontsize);
	var height = element.offsetHeight;
	if(fontsize >= height)
		fontsize = height - 4;
	property += "<field name=\""+prefix+"fontSize\" value=\""+unitConvert(fontsize)+"\" />\n";
	property += "<field name=\""+prefix+"paddingTop\" value=\""+unitConvert((height-fontsize)/2)+"\" />\n";
	property += "<field name=\""+prefix+"paddingBottom\" value=\""+unitConvert((height-fontsize)/2)+"\" />\n";
	tempValue = element.style.fontStyle==""?"normal":element.style.fontStyle
	property += "<field name=\""+prefix+"fontStyle\" value=\""+tempValue+"\" />\n";
	tempValue = element.style.fontWeight==""?"normal":element.style.fontWeight
	property += "<field name=\""+prefix+"fontWeight\" value=\""+tempValue+"\" />\n";
	tempValue = element.style.lineHeight==""?"normal":element.style.lineHeight
	property += "<field name=\""+prefix+"lineHeight\" value=\""+unitConvert(tempValue)+"\" />\n";
	tempValue = element.align==""?"left":element.align;
	property += "<field name=\""+prefix+"textAlign\" value=\""+tempValue+"\" />\n";
	if(flag == "TABLE")
		property += getTableBorder(prefix,element);
	if(flag == "DIV")
		property += getDIVBorder(prefix,element);
	///下划线
	if(element.style.textDecorationUnderline)
		property += "<field name=\""+prefix+"textDecorationUnderline\" value=\"Y\" />\n";
	return property;
}

///取DIV tag的边框
function getDIVBorder(prefix,element){
	var property = "";
	if(element.style.backgroundColor != "")
		property += "<field name=\""+prefix+"backgroundColor\" value=\""+element.style.backgroundColor+"\" />\n";
	///左边框
	if(element.style.borderLeftColor != "")
		property += "<field name=\""+prefix+"borderLeftColor\" value=\""+element.style.borderLeftColor+"\" />\n";
	if(element.style.borderLeftStyle != "")
		property += "<field name=\""+prefix+"borderLeftStyle\" value=\""+element.style.borderLeftStyle+"\" />\n";
	if(element.style.borderLeftWidth != "")
		property += "<field name=\""+prefix+"borderLeftWidth\" value=\""+unitConvert(element.style.borderLeftWidth)+"\" />\n";

	///上边框
	if(element.style.borderTopColor != "")
		property += "<field name=\""+prefix+"borderTopColor\" value=\""+element.style.borderTopColor+"\" />\n";
	if(element.style.borderTopStyle != "")
		property += "<field name=\""+prefix+"borderTopStyle\" value=\""+element.style.borderTopStyle+"\" />\n";
	if(element.style.borderTopWidth != "")
		property += "<field name=\""+prefix+"borderTopWidth\" value=\""+unitConvert(element.style.borderTopWidth)+"\" />\n";
	return property;
}

///取Table tag的边框
function getTableBorder(prefix,element)
{
	///alert("element.tagName:"+element.tagName);
	///alert("element.offsetParent.tagName:"+element.offsetParent.tagName);
	var tempValue;
	var property = "";

	if(element.bgColor=="")
		tempValue = element.offsetParent.bgColor==""?"#ffffff":element.offsetParent.bgColor;
	else
		tempValue = element.bgColor;
	property += "<field name=\""+prefix+"backgroundColor\" value=\""+tempValue+"\" />\n";

	///边框
	if(element.borderColor=="")
		tempValue = element.offsetParent.borderColor==""?"#000000":element.offsetParent.borderColor;
	else
		tempValue = element.borderColor;
	property += "<field name=\""+prefix+"borderColor\" value=\""+tempValue+"\" />\n";
	property += "<field name=\""+prefix+"borderStyle\" value=\"solid\" />\n";
	tempValue = element.offsetParent.border==""?"0":element.offsetParent.border;
	property += "<field name=\""+prefix+"borderWidth\" value=\""+unitConvert(tempValue)+"\" />\n";

	tempValue = element.getAttribute("isprintzero");///是否打印零
	if(tempValue == yes)
		property += "<field name=\""+prefix+"isprintzero\" value=\"Y\" />\n";
	else
		property += "<field name=\""+prefix+"isprintzero\" value=\"N\" />\n";

	tempValue = element.getAttribute("scale");///精度
	if((tempValue != null) && !(isNaN(parseInt(tempValue))))
		property += "<field name=\""+prefix+"scale\" value=\""+tempValue+"\" />\n";

	tempValue = element.getAttribute("delimiter");///分界符
	if((tempValue != null) && (tempValue != ""))
		property += "<field name=\""+prefix+"delimiter\" value=\""+tempValue+"\" />\n";

	///竖排
	tempValue = element.getAttribute("isVertical");
	if (tempValue != null &&
			(tempValue == "y" || tempValue == "Y"))
		property += "<field name=\""+prefix+"isVertical\" value=\"Y\" />\n";
	else
		property += "<field name=\""+prefix+"isVertical\" value=\"N\" />\n";

	tempValue = element.getAttribute("charsPerLine");
	if((tempValue != null) && !(isNaN(parseInt(tempValue))))
		property += "<field name=\""+prefix+"charsPerLine\" value=\""+tempValue+"\" />\n";

	tempValue = element.getAttribute("distance");
	if((tempValue != null) && !(isNaN(parseInt(tempValue))))
		property += "<field name=\""+prefix+"distance\" value=\""+tempValue+"\" />\n";

	return property;
}


var count = 0;
var headerCount = 0;
var footerCount = 0;
var bodyCount = 0;
var headerHeight = 0;
var bodyHeight = 0;
var footerHeigth = 0;
var parameterStr = "";
var fieldStr = "";
var variableStr = "";
var parameters = new Array();
var fields = new Array();
var variables = new Array();
var isPrintBorder = true; //是否打印表格线
var isBorderBond = true;//是否外框加宽
var records = 0; //每页的记录行数
var hostAddr; //服务器地址
var isOld = true; //是否是旧模板
var isMorePages = false;//是否每张纸打印多页
function getToolPath(){
	var productCode = getProductCode(entityName);
	if(isV51Product(productCode)){
		return "com.anyi.erp.print.util.DataFormatter.";
	}else{
		return "com.anyi.gp.print.util.DataFormatter.";
	}
};

/**
* 根据老模板生成jasperReport模板文件
* @param prn_tpl_code 打印模板代码
*/
function getOldJasperXML(prn_tpl_code){
	hostAddr = getHostAddr();
	parameters = new Array();
	fields = new Array();
	variables = new Array();
	var result = "";
	var data = "";
  result = getJaspgpageSetData(prn_tpl_code);
  data = data + "<background>\n";
  data = data + getEmptyBand();
  data = data + "</background>\n";
  data = data + "<title>\n";
  data = data + getEmptyBand();
  data = data + "</title>\n";
  var pageHeaderObj = document.getElementById("pageheader");
  data  = data + "<pageHeader>\n";
  data = data + getBandXML(pageHeaderObj);
  data = data + "</pageHeader>\n";
  var rpHeaderObj = document.getElementById("rpheader");
  data = data + "<columnHeader>";
  data = data + getBandXML(rpHeaderObj);
  data = data + "</columnHeader>\n";
  var rpBodyObj = document.getElementById("rpbody");
  var rpBodyStr =  getDetailXML(rpBodyObj);
  data = data + rpBodyStr[1];
  var rpFooterObj = document.getElementById("rpfooter");
  data = data + "<columnFooter>\n";
  data = data + getBandXML(rpFooterObj);
  data = data + "</columnFooter>\n";
  var pageFooterObj = document.getElementById("pagefooter");
  data = data + "<pageFooter>\n";
  data = data + getBandXML(pageFooterObj);
  data = data + "</pageFooter>\n";
  data = data + "<summary>\n";
  data = data + getEmptyBand();
  data = data + "</summary>\n";

  getAttrVariable("variables");
  getAttrVariable("parameters");
  filterRecords();
  result = result + parameterStr;
  result = result + fieldStr;
  result = result + variableStr;
	parameterStr = "";
	fieldStr = "";
	variableStr = "";
	if(rpBodyStr[0])
		result = result + rpBodyStr[0];
	result = result + data;
  result += "</jasperReport>\n";
	return result;
}
/**
*根据打印模板元素生成jasperReport模板文件
*@param prn_tpl_code 打印模板代码
*/

function getJasperXML(prn_tpl_code){
//	debugger;
	var templateBodyObj = document.getElementById("templatebody");
	var rpHeaderEachPage = templateBodyObj.getAttribute("rpHeaderEachPage");
	var rpFooterEachPage = templateBodyObj.getAttribute("rpFooterEachPage");
	var pageFooterEachPage = templateBodyObj.getAttribute("pageFooterEachPage");
	parameters = new Array();
	fields = new Array();
	variables = new Array();
	var result = "";
	var data = "";
  result = getJaspgpageSetData(prn_tpl_code);
  data = data + "<background>\n";
  data = data + getEmptyBand();
  data = data + "</background>\n";
  var rpHeaderObj = document.getElementById("rpheader");
  data = data + "<title>\n";
  if(rpHeaderEachPage == "n")
  	data = data + getBandXML(rpHeaderObj);
  else
  	data = data + getEmptyBand();
  data = data + "</title>\n";
  var pageHeaderObj = document.getElementById("pageheader");
  data  = data + "<pageHeader>\n";
  data = data + getBandXML(pageHeaderObj);
  data = data + "</pageHeader>\n";
  data = data + "<columnHeader>";
  if(rpHeaderEachPage == "n")
  	data = data + getEmptyBand();
  else
  	data = data + getBandXML(rpHeaderObj);
  data = data + "</columnHeader>\n";
  var rpBodyObj = document.getElementById("rpbody");
  var rpBodyStr =  getDetailXML(rpBodyObj);
  data = data + rpBodyStr[1];
  var rpFooterObj = document.getElementById("rpfooter");
  data = data + "<columnFooter>\n";
  if(rpFooterEachPage == "n")
  	data = data + getEmptyBand();
  else
  	data = data + getBandXML(rpFooterObj);
  data = data + "</columnFooter>\n";
  var pageFooterObj = document.getElementById("pagefooter");
  data = data + "<pageFooter>\n";
  if(pageFooterEachPage == "n")
  	data = data + getEmptyBand();
  else
  	data = data + getBandXML(pageFooterObj);
  data = data + "</pageFooter>\n";
  if(pageFooterEachPage == "n"){
  	data = data + "<lastPageFooter>\n";
  	data = data + getBandXML(pageFooterObj);
  	data = data + "</lastPageFooter>\n";
  }
  data = data + "<summary>\n";
  if(rpFooterEachPage == "n")
  	data = data + getBandXML(rpFooterObj);
  else
  	data = data + getEmptyBand();
  data = data + "</summary>\n";

  getAttrVariable("variables");
  getAttrVariable("parameters");
  filterRecords();
  result = result + parameterStr;
  result = result + fieldStr;
  result = result + variableStr;
	parameterStr = "";
	fieldStr = "";
	variableStr = "";
	if(rpBodyStr[0])
		result = result + rpBodyStr[0];
	result = result + data;
  result += "</jasperReport>\n";
	return result;
}
function getJasperXMLMorePages(prn_tpl_code){
	//hostAddr = getHostAddr();
	parameters = new Array();
	fields = new Array();
	variables = new Array();
	var result = "";
	var data = "";
  result = getJaspgpageSetData(prn_tpl_code);
  data = data + "<background>\n";
  data = data + getEmptyBand();
  data = data + "</background>\n";
  data = data + "<title>\n";
  data = data + getEmptyBand();
  data = data + "</title>\n";
  data  = data + "<pageHeader>\n";
  data = data + getEmptyBand();
  data = data + "</pageHeader>\n";
  data = data + "<columnHeader>";
  data = data + getEmptyBand();
  data = data + "</columnHeader>\n";
  var rpBodyObj = document.getElementById("rpbody");
  var rpBodyStr =  getDetailXML(rpBodyObj);
  data = data + rpBodyStr[1];
  var rpHeaderObj = document.getElementById("rpheader");
  var pageHeaderObj = document.getElementById("pageheader");
  rpBodyStr[0] = addStrToGroup( getBandXML(rpHeaderObj),getBandXML(pageHeaderObj),rpBodyStr[0],1);
  var rpFooterObj = document.getElementById("rpfooter");
  var pageFooterObj = document.getElementById("pagefooter");
  rpBodyStr[0] = addStrToGroup( getBandXML(rpFooterObj),getBandXML(pageFooterObj),rpBodyStr[0],2);
  data = data + "<columnFooter>\n";
  data = data + getEmptyBand();
  data = data + "</columnFooter>\n";
  data = data + "<pageFooter>\n";
  data = data + getEmptyBand();
  data = data + "</pageFooter>\n";
  data = data + "<summary>\n";
  data = data + getEmptyBand();
  data = data + "</summary>\n";

  getAttrVariable("variables");
  getAttrVariable("parameters");
  filterRecords();
  result = result + parameterStr;
  result = result + fieldStr;
  result = result + variableStr;
	parameterStr = "";
	fieldStr = "";
	variableStr = "";
	if(rpBodyStr[0])
		result = result + rpBodyStr[0];
	result = result + data;
  result += "</jasperReport>\n";
	return result;
}
/**
 *将模板设计器中页眉和表头的信息加入到组头中，页脚和表尾
 *加入到组尾中，用于每张纸打印多页面情况。
 *对于凭证套打，每张纸可能打印两张不同凭证号的凭证，所以
 *将页眉、表头、页脚和表尾中的参数都转换为字段，在传递的
 *数据包中将原来head和foot区的参数都移到body区中，并且
 *每个body中都要包含原来head和foot区的参数。
 *@rpStr 模板设计器中表头或表尾字符串
 *@pageStr 模板设计器中页眉或页脚字符串
 *@strGroup 组信息、组头和组尾串
 *@flag	标明是加入到组头还是组尾
 */
function addStrToGroup( rpStr,pageStr,strGroup,flag){
	var groupHeaderFrom = "<groupHeader>";
	var groupHeaderTo = "</groupHeader>";
	var groupFooterFrom = "<groupFooter>";
	var groupFooterTo = "</groupFooter>";
	var groupPosFirst;
	var groupPosLast;
	var group = "";
	if(flag==1){
		groupPosFirst = strGroup.indexOf(groupHeaderFrom);
		groupPosLast = strGroup.indexOf(groupHeaderTo);
		group = strGroup.substring(groupPosFirst + groupHeaderFrom.length,groupPosLast);
	}
	else{
		groupPosFirst = strGroup.indexOf(groupFooterFrom);
		groupPosLast = strGroup.indexOf(groupFooterTo);
		group = strGroup.substring(groupPosFirst + groupFooterFrom.length,groupPosLast);
	}
	var rpBandHeight = getBandHeight( rpStr);//修改band高度
	var pageBandHeight = getBandHeight( pageStr);
	var oldBandHeight = getBandHeight( group);
	var newBandHeight = parseInt(rpBandHeight) + parseInt(pageBandHeight) + parseInt(oldBandHeight);
	var heightPos = group.indexOf(oldBandHeight);
	group = group.substring(0,heightPos) + newBandHeight + group.substring(heightPos + oldBandHeight.length);
	var rpBandContent = getBandContent( rpStr);//合并band内容
	var pageBandContent = getBandContent( pageStr);
	var oldBandContent = getBandContent( group);
	if(flag==1){//修改band内元素y坐标
		rpBandContent = setBandContentTop(rpBandContent,parseInt(pageBandHeight));
		oldBandContent = setBandContentTop(oldBandContent,parseInt(pageBandHeight)+parseInt(rpBandHeight));
		var newBandContent = pageBandContent +rpBandContent+ oldBandContent;
	}
	else {
		rpBandContent = setBandContentTop(rpBandContent,parseInt(oldBandHeight));
		pageBandContent = setBandContentTop(pageBandContent,parseInt(oldBandHeight)+parseInt(rpBandHeight));
		var newBandContent = oldBandContent + rpBandContent + pageBandContent;
	}
	var contentPos = group.indexOf(">");
	group = group.substring(0,contentPos+1) + newBandContent + "</band>";
	if(flag==1)
		group = groupHeaderFrom + group ;
	else
		group = groupFooterFrom + group ;
	strGroup = strGroup.substring(0,groupPosFirst) + group + strGroup.substring(groupPosLast);
	//showMessage(strGroup);
	return strGroup;
}
//取得band高度
function getBandHeight( str){
	var height1 = str.indexOf("height=");
	var height2 = str.indexOf('"',height1+8);
	var height3 = str.substring(height1+8,height2);
	return height3;
}
//取得band内容
function getBandContent( str){
	var band1 = str.indexOf(">");
	var band2 = str.indexOf("</band>");
	var band = str.substring(band1+1,band2);
	return band;
}
//设置band内元素y坐标
function setBandContentTop( temp,top){
	var i ;
	var first = temp.indexOf(" y=");
  var subtemp = "";
  while (first!= -1 ){
  		i = temp.indexOf('"',first+4);
  		subtemp = temp.substring(first+4,i);
  		subtemp = parseInt(subtemp) + parseInt(top);
  		temp = temp.substring(0,first+4) + subtemp + temp.substring(i);
  		first = temp.indexOf(" y=",i);
  	}
	return temp;
}
/**
 *获取模板的页面属性信息
 * @param prn_tpl_code 打印模板代码
 */
function getJaspgpageSetData(prn_tpl_code){
	var templateBodyObj = document.getElementById("templatebody");
  var data = "<?xml version=\"1.0\" encoding=\"gb2312\" ?>\n";
  data = data + "<!DOCTYPE jasperReport PUBLIC \"//JasperReports//DTD Report Design//EN\" \"http://jasperreports.sourceforge.net/dtds/jasperreport.dtd\">";
  var reportName = prn_tpl_code;
  data = data + "<jasperReport name=\"" + reportName + "\"\n";
  var columnCount = 1;
  var printColumnsCount =  templateBodyObj.getAttribute("printColumnsCount");
  if(!printColumnsCount || printColumnsCount < 1)
  	printColumnsCount = 1;
  columnCount = unitConvert2(printColumnsCount);	
  data = data + " columnCount=\"" + columnCount + "\"\n";
  var printOrder = "Vertical";
  if(columnCount > 1)
  	printOrder = "Horizontal";
	data = data + " printOrder=\"" + printOrder + "\"\n";
	var tempOrient = templateBodyObj.getAttribute("orientation")
	var orientation;
	if(tempOrient == "portrait")
  	orientation = "Portrait";
  else
  	orientation = "Landscape";
  data = data + " orientation=\"" + orientation + "\"\n";
  var tempPageWidth = unitConvert2(templateBodyObj.getAttribute("pwidth"));
  var pageWidth = tempPageWidth;
	data = data +  " pageWidth=\"" + pageWidth + "\"\n";
  var tempPageHeight = unitConvert2(templateBodyObj.style.height);
  var pageHeight = tempPageHeight;
	data = data + " pageHeight=\"" + pageHeight + "\"\n";
	var tempTopMargin = unitConvert2(templateBodyObj.style.paddingTop);
	var tempLeftMargin = unitConvert2(templateBodyObj.style.paddingLeft);
	var tempRightMargin = unitConvert2(templateBodyObj.style.paddingRight);
	var tempBottomMargin = unitConvert2(templateBodyObj.style.paddingBottom);
  var columnWidth = tempPageWidth - tempLeftMargin - tempRightMargin;
  var columnSpacing = 0;
  if(columnCount > 1){
  	var printColumnsSpace =  templateBodyObj.getAttribute("printColumnsSpace");
  	if(!printColumnsSpace || printColumnsSpace < 1)
  		printColumnsSpace = 0;
  	columnSpacing = unitConvert2(printColumnsSpace);
  	columnWidth = unitConvert2((columnWidth - columnSpacing * (columnCount - 1))/columnCount);	
  }
	data = data + " columnWidth=\"" + columnWidth + "\"\n";
	data = data + " columnSpacing=\"" + columnSpacing + "\"";
 	var leftMargin = tempLeftMargin;
	data = data + " leftMargin=\"" + leftMargin + "\"";
	var rigthMargin = tempRightMargin;
  data = data + " rightMargin=\"" + rigthMargin + "\"";
  var topMargin = tempTopMargin;
  data = data + " topMargin=\"" + topMargin + "\"";
  var bottomMargin = tempBottomMargin;
	data += " bottomMargin=\"" + bottomMargin + "\"";
  var whenNoData = "NoPages";
  data = data + " whenNoDataType=\"" + whenNoData + "\"";
 	var scriptletClass = "";
  //data = data + " scriptletClass=\"" + scriptletClass + "\"";
  var isTitleNewPage = "false";
  data = data + " isTitleNewPage=\"" + isTitleNewPage + "\"";
  var isSummaryNewPage = "false";
  data = data + "  isSummaryNewPage=\"" + isSummaryNewPage + "\">\n";
  return data;
}
/**
* 获取模板中的表格信息，对应jasperReport模板的分组信息及detail区
* @param bandObj 表体设计区元素
*/
function getDetailXML(bandObj){
	var result = new Array();
	headerCount = 0;
	bodyCount = 0;
	footerCount = 0;
	var eles = bandObj.childNodes;
	if(eles.length == 0||(eles.length == 1 && !eles[0].id)){
		result[0] = "";
		var temp = "<detail>";
		temp += getEmptyBand();
		temp += "</detail>";
		result[1] = temp;
		return result;
	}
	for(var i=0,j=eles.length; i<j; i++){
		var ele = eles.item(i);
  	if(ele.tagName == "TABLE"){
  		result = getTableInfor(ele);
  		return result;
  	}
  	else{
			continue;
  	}
	}
  return result;
}
/**
 * 获得区内元素信息
 * @param bandObj 区域元素
 */
function getBandXML(bandObj){
  var result = "";
  result += "<band height=\"";
  var vheight = bandObj.offsetHeight;
  vheight = unitConvert2(vheight);
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = true;
  result += isSplitAllowed;
  result +="\">\n";
  var items = bandObj.childNodes;
  result += getChild(items);
  result += "</band>\n";
  return result;
}
/**
* 获取空区域模板信息
*/
function getEmptyBand(){
	var result = "";
  result += "<band height=\"";
  var vheight = 0;
  vheight = unitConvert2(vheight);
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = true;
  result += isSplitAllowed;
  result +="\">\n";
  result += "</band>\n";
	return result;
}
/**
 * 获取模板各个区域内的子元素信息
 * @param eles 区域内的子元素
 */
function getChild(eles){
	var childValue = "";
	if (eles != "") {
		for (var j = 0; j < eles.length; j++) {
      //取特定类型的标签
      var ele = eles.item(j);
      var labelType = ele.getAttribute("varflag");
      labelType = parseInt(labelType);
      //0表示静态文本
			if(labelType == 0){
        childValue += getStaticTextInfor(ele);
      }
      //1表示字段参数
    	else if(labelType == 1){
    		var varorfield = ele.getAttribute("varorfield");
    		if(varorfield == "svariable"){
    			childValue += getVariableInfor(ele);
    		
    		}else{
        	childValue += getTextFieldInfor(ele);
        }
      }
      //2表示变量
    	else if(labelType == 2){
    		childValue += getVariableInfor(ele);
    	}
      //3表示直线
      else if(labelType == 3){
        childValue += getLineInfor(ele);
      }
      //4表示矩形框
      else if(labelType == 4){
      	var temp = getRectInfor(ele);
      	childValue += temp;
      }
      //5表示图片
      else if(labelType == 5){
      	childValue += getImageInfor(ele);
      }
		}
	}
	return childValue;
}
/**
 * 取得静态文本信息
 * @param 静态文本元素
 */
function getStaticTextInfor(ele){
  var childValue = "";
	var print = ele.getAttribute("print");
	if(print && print == "n"){
		return childValue;
	}
	childValue += "<staticText>\n";
	childValue += getReportElement(ele);
  var printBorder = ele.getAttribute("printBorder");
  if(printBorder == "y"){
    var border = getBorderElement(null,null,"StaticText",null,null);
    isBorderBond = false;
    childValue += getBoxElement(border);
  }
	childValue += getTextElement(ele);
	childValue += getText(ele);
	childValue += "</staticText>\n";
  return childValue;
}
/**
 * 取得参数信息
 * @param ele 参数元素
 */
function getTextFieldInfor(ele){
  var childValue = "";
	var print = ele.getAttribute("print");
	if(print && print == "n"){
		return childValue;
	}
  childValue += "<textField isStretchWithOverflow=\"";
  var isStretchWithOverflow = false;
  var temp = ele.getAttribute("stretchOverflow");
  if(!(temp == "n"))
  	isStretchWithOverflow = true;
  childValue += isStretchWithOverflow;
  childValue += "\" pattern=\"";
  var pattern = "";
  childValue += pattern;
  childValue += "\" isBlankWhenNull=\"";
  var isBlankWhenNull = true;
  childValue += isBlankWhenNull;
  childValue += "\" evaluationTime=\"";
  var evaluationTime = "Now";
  childValue += evaluationTime;
  childValue += "\" hyperlinkType=\"";
  var hyperlinkType = "None";
  childValue += hyperlinkType;
  childValue += "\">\n";
  childValue += getReportElement(ele);
  var printBorder = ele.getAttribute("printBorder");
  if(printBorder == "y"){
    var border = getBorderElement(null,null,"TextField",null,null);
    isBorderBond = false;
    childValue += getBoxElement(border);
  }
  childValue += getTextElement(ele);
  childValue += getTextField(ele);
  childValue += "</textField>\n";
  return childValue;
}
/**
* 获取变量信息
* @param ele 变量元素
*/
function getVariableInfor(ele){
  var childValue = "";
	var print = ele.getAttribute("print");
	if(print && print == "n"){
		return childValue;
	}
  childValue += "<textField isStretchWithOverflow=\"";
  var isStretchWithOverflow = false;
  var temp = ele.getAttribute("stretchOverflow");
  if(!(temp == "n"))
  	isStretchWithOverflow = true;
  childValue += isStretchWithOverflow;
  childValue += "\" pattern=\"";
  var pattern = "";
  childValue += pattern;
  childValue += "\" isBlankWhenNull=\"";
  var isBlankWhenNull = true;
  childValue += isBlankWhenNull;
  childValue += "\" evaluationTime=\"";
  var evaluationTime;
  var temp = ele.innerHTML;
  if(temp.indexOf("^PAGES") != -1 || (ele.getAttribute("pageflag") && ele.getAttribute("pageflag") == "页数"))
  	evaluationTime = "Report";
  else
  	evaluationTime = "Now";
  childValue += evaluationTime;
  childValue += "\" hyperlinkType=\"";
  var hyperlinkType = "None";
  childValue += hyperlinkType;
  childValue += "\">\n";
  childValue += getReportElement(ele);
  var printBorder = ele.getAttribute("printBorder");
  if(printBorder == "y"){
    var border = getBorderElement(null,null,"Variable",null,null);
    isBorderBond = false;
    childValue += getBoxElement(border);
  }
  childValue += getTextElement(ele);
  childValue += getVariable(ele);
  childValue += "</textField>\n";
  return childValue;
}
/**
* 获取line元素信息
* @param 模板中的直线元素
*/
function getLineInfor(ele){
  var result = "";
  result = result + "<line direction=\"";
  var direction = ele.getAttribute("direction");
  result = result + direction;
  result = result + "\">" ;
  result = result + getReportElement(ele);
  result = result + getGraphicElement(ele);
  result = result + "</line>\n";
  return result;
}
/**
 * 获取矩形框信息
 */
function getRectInfor(ele){
  var result = "";
  result = result + "<rectangle radius=\"";
  var radius = 0;
  result = result + radius + "\">\n";
  result = result + getReportElement(ele);
  result = result + getGraphicElement(ele);
  result = result + "</rectangle>\n";
  return result;
}
/**
* 获取图片信息
* @param ele 图像字段
* @return 图像字段字符串信息
*/
function getImageInfor(ele){
  var result = "";
  result = result + "<image scaleImage=\"";
  var scaleImage = (ele.getAttribute("scaleImage")!=null)?ele.getAttribute("scaleImage"):"RetainShape";
  result = result + scaleImage + "\" vAlign=\"";
  var vAlign = "Top";
  result = result + vAlign + "\" hAlign=\"";
  var hAlign = "Left";
  result = result + hAlign + "\" isUsingCache=\"";
  var isUsingCache = true;
  result = result + isUsingCache + "\" evaluationTime=\"";
  var evaluationTime = "Now";
  result = result + evaluationTime + "\" hyperlinkType=\"";
  var hyperlinkType = "None";
  result = result + hyperlinkType + "\">\n";
  result = result + getReportElement(ele);
  result = result + getGraphicElement(ele);
  result = result + getImage(ele);
  result = result + "</image>\n";
  return result;
}
/**
* 获取模板中的图像字段内容，根据图像字段的文件id获取图像内容
* @param ele 图像字段
* @return 图像字段字符串信息
*/
function getImage(ele){
	var result = "";
  result = result + "<imageExpression class=\"";
  var classType = "java.io.File";
  result = result + classType + "\">";
  result = result +  "<![CDATA[";
  var value = "";
  var vexpression = ele.getAttribute("vexpression");
  var fileID = ele.getAttribute("picId");
  if(vexpression)
  	value = getToolPath() + "getPrintImage(" + vexpression + ")";
  else
  	value = getToolPath() + "getPrintImage(\"" + fileID + "\")";   
  result = result + value;
  result = result +  "]]>";
  result = result + "</imageExpression>\n";
  return result;
}

/**
 * 获取模板中表格信息，表格分标题行，数据行。表头对应jasperReport模板中分组的组头
 * 表体对应detail区，表尾对应分组组尾区
 * @param ele 标题元素
 * @return jasperReport模板的分组信息和detail区信息字符串
 */
function getTableInfor(ele){
  var result = new Array();
	var printBorder = ele.getAttribute("print");
	if(printBorder && printBorder == "n")
		isPrintBorder = false;
	else isPrintBorder = true;
  var borderBond = ele.getAttribute("isBorderBond");
  if(borderBond && borderBond == "n")
    isBorderBond = false;
  else
    isBorderBond = true;
	if(!isOld)
		records = parseInt(prnFixRowCount);
	else{
		var sigleLine = ele.getAttribute("repeat");
		if(sigleLine == "y")
			records = 1;
		var recordLine = ele.getAttribute("printnum");
		if(recordLine && parseInt(recordLine)>1)
			records  = parseInt(recordLine);
	}
  var data = "";
  var isHeader = true;
  for(var i=0,j=ele.rows.length; i<j; i++){
  	var rowObj = ele.rows[i];
  	var rowType = rowObj.getAttribute("repeat");
  	if(((rowType == "n")||(!rowType)) && (isHeader)){
  		headerCount++;
  	}
  	else if(((rowType == "n")||(!rowType)) && (!isHeader)){
  		footerCount++;
  	}
  	else if(rowType == "y"){
  		bodyCount++;
  		isHeader = false;
  	}
	}
	var data = "";
	data = data + "<group name=\"";
	var groupName = "table";
	data = data + groupName + "\" isStartNewColumn=\"";
	var isStartNewColumn = false;
	data = data + isStartNewColumn + "\" isStartNewPage=\"";
	var isStartNewPage;
	var templateBodyObj = document.getElementById("templatebody");
	if(!isOld){
			var printInNewPage = templateBodyObj.getAttribute("printInNewPage");
			if(printInNewPage == "n")
				isStartNewPage=false;
			else
				isStartNewPage=true;
			}
	else
		isStartNewPage = true;
	data = data + isStartNewPage + "\" isResetPageNumber=\"";
	var isResetPageNumber;
	if(!isOld){
			var resetPageNum = templateBodyObj.getAttribute("resetPageNum");
			if(resetPageNum == "y")
				isResetPageNumber=true;
			else
				isResetPageNumber=false;
			}
	else
		isResetPageNumber = false;
	data = data + isResetPageNumber + "\" isReprintHeaderOnEachPage=\"";
	var isReprintHeaderOnEachPage;
	if(!isOld){
		var gp = templateBodyObj.getAttribute("GP");
		if(gp == "y"){
			var headerEachPage = templateBodyObj.getAttribute("headerEachPage");
			if(headerEachPage == "n")
				isReprintHeaderOnEachPage=false;
			else
				isReprintHeaderOnEachPage=true;
		}
		else{
			isReprintHeaderOnEachPage=false;
		}
	}
	else
		isReprintHeaderOnEachPage = true;
	data = data + isReprintHeaderOnEachPage + "\" minHeightToStartNewPage=\"";
	var minHeightToStartNewPage = 0;
	data = data + minHeightToStartNewPage + "\">\n";
	data = data + "<groupExpression>";
	var groupExpression = "";
	var GP = templateBodyObj.getAttribute("GP");
	if(GP == "y"){
		var groupField = templateBodyObj.getAttribute("groupField");
		if(groupField == null || groupField == ""){
			if(records > 0)
				groupExpression = "$F{FIXROWCOUNT}";
			else
				groupExpression = "";
		}
		else{
			var groupFields = new Array();
			groupFields = groupField.split(";");
			for(var i = 0; i < groupFields.length; i++){
				groupExpression += "$F{" + groupFields[i] + "}";
				if(i < groupFields.length - 1){
					groupExpression += "+";
				}
				addField(groupFields[i]);
			}
		}
	}else{
		groupExpression = "";
	}
	data = data + "<![CDATA[" + groupExpression + "]]>\n";
	data = data + "</groupExpression>";
  data = data + getHeaderRow(ele,headerCount);
  var detailData = getDetailRow(ele,bodyCount);
  data = data + getFooterRow(ele,footerCount);
  data = data + "</group>\n";
  result[0] = data;
  result[1] = detailData;
  return result;
}
/**
* 获取表格表头行信息,模板中的表头行对应jasperReport模板中的分组的组头区
* @param tableObj 表格元素
* @param footerCount 表头行个数
* @return jasperReport模板的组头字符串信息
*/
function getHeaderRow(tableObj,headerCount){
	var result = "";
  result += "<groupHeader>";
  result += "<band height=\"";
  var vheight = 0;
  var isBorderBond = "y";
  for(var m=0,n=headerCount; m<n; m++){
  	var row = tableObj.rows[m];
  	vheight += parseInt(row.offsetHeight);
  }
  headerHeight = vheight;
  vheight = unitConvert2(vheight);
  vheight = vheight + 0;
  if(headerCount == 0 && bodyCount != 0 && isPrintBorder){
    vheight = 1;
  }
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = true;
  result += isSplitAllowed;
  result +="\">\n";

  var tableX = tableObj.offsetLeft - tableObj.parentElement.offsetLeft;
  var tableY = tableObj.offsetTop;
  if(headerCount == 0 && bodyCount != 0 && isPrintBorder){
		var templateBodyObj = document.getElementById("templatebody");
	  var printColumnsCount =  templateBodyObj.getAttribute("printColumnsCount");
	  if(!printColumnsCount || printColumnsCount < 1)
	  	printColumnsCount = 1;
	  if(printColumnsCount == 1)
	  	if(isBorderBond)
    		result += getBorderLine(tableObj);
    	else
    		result += getBorderLine1(tableObj);
  }
  for(var m=0,n=headerCount; m<n; m++){
  	for(var i=0; i<tableObj.rows(m).cells.length; i++){
  		var td = tableObj.rows(m).cells(i);
  		//if(isPrintBorder)
  			//result = result + getTableBorderInfor(td,tableX,null,"header");
  		var value = "";
  		if(td.innerHTML.indexOf("SPAN") != -1){
  			value = td.firstChild.innerHTML;
			}
			else
				value = td.innerHTML;
      var border = getBorderElement(tableObj,headerCount,"header",m,i);
  		if(value.indexOf("@") != -1){
        //result = result + getTableParamInfor(td,tableX,null,"header");
        result = result + getTableParamInfor(td,tableX,null,"header",border);
  		}
  		else{
  			result = result + getTableStaticText(td,tableX,null,"header",border);
  		}
  	}
	}
	result += "</band>";
  result += "</groupHeader>\n";
	return result;
}
/**
* 获取表格表尾行信息,模板中的表尾行对应jasperReport模板中的分组的组尾区
* @param tableObj 表格元素
* @param footerCount 表尾行个数
* @return jasperReport模板的组尾字符串信息
*/
function getFooterRow(tableObj,fooerCount){
	var result = "";
  result += "<groupFooter>";
  result += "<band height=\"";
  var vheight = 0;
  for(var m=headerCount+bodyCount,n=headerCount+bodyCount+footerCount; m<n; m++){
  	var row = tableObj.rows[m];
  	vheight += parseInt(row.offsetHeight);
  }
  footerHeight = vheight;
	vheight = unitConvert2(vheight);
	vheight = vheight + 0;
  if(footerCount == 0 && bodyCount != 0 && isPrintBorder){
    vheight = 1;
  }
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = true;
  result += isSplitAllowed;
  result +="\">\n";

  var tableX = tableObj.offsetLeft - tableObj.parentElement.offsetLeft;
  var tableY = tableObj.offsetTop;
  if(footerCount == 0 && bodyCount != 0 && isPrintBorder){
		var templateBodyObj = document.getElementById("templatebody");
	  var printColumnsCount =  templateBodyObj.getAttribute("printColumnsCount");
	  if(!printColumnsCount || printColumnsCount < 1)
	  	printColumnsCount = 1;
	  if(printColumnsCount == 1)
	  	if(isBorderBond)
    		result += getBorderLine(tableObj);
    	else
    		result += getBorderLine1(tableObj);
  }
  for(var m=headerCount+bodyCount,n=headerCount+bodyCount+footerCount; m<n; m++){
  	for(var i=0; i<tableObj.rows(m).cells.length; i++){
  		var td = tableObj.rows(m).cells(i);
  		//if(isPrintBorder)
  			//result = result + getTableBorderInfor(td,tableX,null,"footer");
  		var value = "";
  		if(td.innerHTML.indexOf("SPAN") != -1){
  			value = td.firstChild.innerHTML;
			}
			else
				value = td.innerHTML;
      var border = getBorderElement(tableObj,fooerCount,"footer",m,i);
  		if(value.indexOf("@") != -1){
  			//result = result + getTableParamInfor(td,tableX,null,"footer");
        result = result + getTableParamInfor(td,tableX,null,"footer",border);
  		}
  		else{
  			result = result + getTableStaticText(td,tableX,null,"footer",border);
  		}
  	}
	}
	result += "</band>";
  result += "</groupFooter>\n";
	return result;
}
/**
* 获取表格单元格边框信息
* @param tdEle 单元格元素
* @param tableX 表格元素离模板左边距离
* @param tableY 表格元素离模板上边距离
* @param band 单元格元素位于那个区域(表头，表体，表尾)
* @return 表格中单元格的边框信息字符串
*/
function getTableBorderInfor(tdEle,tableX,tableY,band){
  var result = "";
	var print = tdEle.getAttribute("print");
	if(print && print == "n"){
		return result;
	}
  result = result + "<rectangle radius=\"";
  var radius = 0;
  result = result + radius + "\">\n";
  result = result + getReportElement(tdEle,tableX,null,band);
  result = result + getGraphicElement(tdEle);
  result = result + "</rectangle>\n";
  return result;
}
/**
* 获取图形元素属性
* @param ele 图形元素
*/
function getGraphicElement(ele){
  var result = "";
  result = result + "<graphicElement stretchType=\"";
  var stretchType = "RelativeToBandHeight";
  result = result + stretchType + "\" pen=\"";
  var pen = "Thin";
  var temp = ele.getAttribute("pen");
  if(temp){
  	if(temp == "0px")
  		pen = "None";
  	else if(temp == "1px")
  		pen = "Thin";
  	else if(temp == "2px")
  		pen = "1Point";
  	else if(temp == "3px")
  		pen = "2Point";
  	else if(temp == "4px")
  		pen = "4Point";
	}
  result = result + pen + "\" fill=\"";
  var fill = "Solid";
  result = result + fill + "\"/>\n";
  return result;
}
/**
* 获取表格标题行中单元格为静态文本字段信息
* @param ele 单元格元素
* @param tableX 表格元素离模板左边距离
* @param tableY 表格元素离模板上边距离
* @param band 单元格元素位于那个区域(表头，表体，表尾)
* @return 表格中单元格字段的静态文本信息字符串
*/
function getTableStaticText(ele,tableX,tableY,band,border){
  var childValue = "";
	var print = ele.getAttribute("print");
	if(print && print == "n"){
		return childValue;
	}
	childValue += "<staticText>\n";
	childValue += getTableRE(ele,tableX,null,band);
  if(isPrintBorder)
    childValue += getBoxElement(border);
	childValue += getTextElement(ele);
	childValue += getTableText(ele);
	childValue += "</staticText>\n";
  return childValue;
}
/**
* 获取表格中单元格字段的通用属性
* @param ele 单元格元素
* @param tableX 表格元素离模板左边距离
* @param tableY 表格元素离模板上边距离
* @param band 单元格元素位于那个区域(表头，表体，表尾)
* @return 表格中单元格字段的属性信息字符串
*/
function getTableRE(ele,tableX,tableY,band){
	var childValue = "";
	childValue += "<reportElement";
  var mode = "Opaque";
  childValue = childValue + " mode=\"" + mode + "\"";
  var x;
  if(tableX){
  	//x = parseInt(ele.offsetLeft) + 2 + tableX;
    x = parseInt(ele.offsetLeft) + tableX
  }
  else{
		//x = parseInt(ele.offsetLeft) + 2;
    x = parseInt(ele.offsetLeft);
  }
  x = unitConvert2(x);
  childValue = childValue + " x=\"" + x + "\"";
  var y;
  var rowOffsetTop = 0;
  if(ele.tagName == "TD"){
  	if(band == "detail"){
  		rowOffsetTop = headerHeight;
  	}
  	else if(band == "footer"){
  		rowOffsetTop = headerHeight + bodyHeight;
  	}
  }
  if(tableY){
  	//y = parseInt(ele.offsetTop) + 2 + tableY - rowOffsetTop;
    y = parseInt(ele.offsetTop) + tableY - rowOffsetTop - 1;
  }
  else{
  	//y = parseInt(ele.offsetTop) + 2 - rowOffsetTop;
    y = parseInt(ele.offsetTop)  - rowOffsetTop - 1;
  }
  y = unitConvert2(y);
  childValue = childValue + " y=\"" + y + "\"";
  //var width = parseInt(ele.offsetWidth)-4;
  var width = parseInt(ele.offsetWidth);
  width = unitConvert2(width);
  childValue = childValue + " width=\"" + width + "\"";
  //var height = parseInt(ele.offsetHeight)-4;
  var height = parseInt(ele.offsetHeight);
  height = unitConvert2(height);
  childValue = childValue + " height=\"" + height + "\"";
  var temp;
  if(ele.style.color == ""){
  	temp = ele.offsetParent.style.color	== ""?"#000000":ele.offsetParent.style.color;
  }
	else
		temp = ele.style.color;
  var foreColor = temp;
  childValue = childValue + " forecolor=\"" + foreColor + "\"";
//  if(ele.style.backgroundColor == ""){
//  	temp = ele.offsetParent.style.backgroundColor	== ""?"#ffffff":ele.offsetParent.style.backgroundColor;
//  }
//  else
//  	temp = ele.style.backgroundColor;
	temp = "#ffffff";
  var backcolor = temp;
  childValue = childValue + " backcolor=\"" + backcolor + "\"";
  var key = "key" + count;
  count++;
  childValue = childValue + " key=\"" + key + "\"";
  var strechType = "RelativeToBandHeight";
  childValue = childValue + " stretchType=\"" + strechType + "\"";
  var positionType = "FixRelativeToTop";
  childValue = childValue + " positionType=\"" + positionType + "\"";
  var isPrintRepeatedValues = true;
  childValue = childValue + " isPrintRepeatedValues=\"" + isPrintRepeatedValues + "\"";
  var isRemoveLineWhenBlank = false;
  childValue = childValue + " isRemoveLineWhenBlank=\"" + isRemoveLineWhenBlank + "\"";
  var isPrintInFirstWholeBand = false;
  childValue = childValue + " isPrintInFirstWholeBand=\"" + isPrintInFirstWholeBand + "\"";
  var isPrintWhenDetailOverflows = true;
  childValue = childValue + " isPrintWhenDetailOverflows=\"" + isPrintWhenDetailOverflows + "\"";
  var isPrintInSplitedTemplate = ele.getAttribute("isPrintInSplitedTemplate");
  if(isPrintInSplitedTemplate == "y")
  	isPrintInSplitedTemplate = true;
  else
  	isPrintInSplitedTemplate = false;
  childValue = childValue + " isPrintInSplitedTemplate=\"" + isPrintInSplitedTemplate + "\"";
  childValue = childValue + "/>\n";
	return childValue;
}
/**
* 获得数据行信息
* @ param tableObj 表格元素
* @ return 表格中数据行拼成的jasperReport模板字符串
*/
function getDetailRow(tableObj){
	var result = "";
  result += "<detail>";
  result += "<band height=\"";
  var vheight = 0;
  for(var m=headerCount,n=headerCount+bodyCount; m<n; m++){
  	var row = tableObj.rows[m];
  	vheight += parseInt(row.offsetHeight);
  }
  bodyHeight = vheight;
  vheight = unitConvert2(vheight);
  vheight = vheight + 0;
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = false;//true;
  result += isSplitAllowed;
  result +="\">\n";

  var tableX = tableObj.offsetLeft - tableObj.parentElement.offsetLeft;
  var tableY = tableObj.offsetTop;
  for(var m=headerCount,n=headerCount+bodyCount; m<n; m++){
  	for(var i=0; i<tableObj.rows(m).cells.length; i++){
  		var td = tableObj.rows(m).cells(i);
  		//if(isPrintBorder)
  			//result = result + getTableBorderInfor(td,tableX,null,"detail");
  		var value = "";
  		if(td.innerHTML.indexOf("SPAN") != -1){
  			value = td.firstChild.innerHTML;
			}
			else
				value = td.innerHTML;
      var border = getBorderElement(tableObj,headerCount,"detail",m,i);
  		if(value.indexOf("@") != -1){
        //result = result + getTableParamInfor(td,tableX,null,"header");
        result = result + getTableTextFieldInfor(td,tableX,null,"detail",border);
  		}
  		else{
  			result = result + getTableStaticText(td,tableX,null,"detail",border);
  		}
  	}
	}
	result += "</band>";
  result += "</detail>\n";
	return result;
}
/**
* 获取表格数据行单元格字段信息
*/
function getTableTextFieldInfor(tdEle,tableX,tableY,band,border){
  var childValue = "";
	var print = tdEle.getAttribute("print");
	if(print && print == "n"){
		return childValue;
	}
	
  childValue += "<textField isStretchWithOverflow=\"";
  var isStretchWithOverflow = false;
  var temp = tdEle.getAttribute("stretchOverflow");
  if(!(temp == "n"))
  	isStretchWithOverflow = true;
  childValue += isStretchWithOverflow;
  childValue += "\" pattern=\"";
  var pattern = "";
  childValue += pattern;
  childValue += "\" isBlankWhenNull=\"";
  var isBlankWhenNull = true;
  childValue += isBlankWhenNull;
  childValue += "\" evaluationTime=\"";
  var evaluationTime = "Now";
  childValue += evaluationTime;
  childValue += "\" hyperlinkType=\"";
  var hyperlinkType = "None";
  childValue += hyperlinkType;
  childValue += "\">\n";
  childValue += getTableRE(tdEle,tableX,null,band);
  if(isPrintBorder)
    childValue += getBoxElement(border);
  childValue += getTextElement(tdEle);
  childValue += getTableTF(tdEle);
  childValue += "</textField>\n";
  return childValue;
}

/**
* 获取表格标题行参数字段信息
*/
function getTableParamInfor(tdEle,tableX,tableY,band,border){
  var childValue = "";
	var print = tdEle.getAttribute("print");
	if(print && print == "n"){
		return childValue;
	}
  childValue += "<textField isStretchWithOverflow=\"";
  var isStretchWithOverflow = false;
  var temp = tdEle.getAttribute("stretchOverflow");
  if(!(temp == "n"))
  	isStretchWithOverflow = true;
  childValue += isStretchWithOverflow;
  childValue += "\" pattern=\"";
  var pattern = "";
	var variflag = tdEle.getAttribute("varorfield");
  var vartype = tdEle.getAttribute("vartype");
  if(variflag=="svariable"&&(vartype=="java.lang.Integer"||vartype=="java.lang.Double"))
		pattern = getPattern(tdEle);
  childValue += pattern;
  childValue += "\" isBlankWhenNull=\"";
  var isBlankWhenNull = true;
  childValue += isBlankWhenNull;
  childValue += "\" evaluationTime=\"";
  var evaluationTime = "Now";
  childValue += evaluationTime;
  childValue += "\" hyperlinkType=\"";
  var hyperlinkType = "None";
  childValue += hyperlinkType;
  childValue += "\">\n";
  childValue += getTableRE(tdEle,tableX,null,band);
  if(isPrintBorder)
    childValue += getBoxElement(border);
  childValue += getTextElement(tdEle);
  childValue += getTableParam(tdEle);
  childValue += "</textField>\n";
  return childValue;
}
/**
* 获取表格数据行字段内容
*/
function getTableTF(ele){
	var result = "";
  result += "<textFieldExpression class=\"";
  var classType = "java.lang.String";
  var variflag = ele.getAttribute("varorfield");
	var vartype = ele.getAttribute("vartype");
	if(variflag == "svariable" && vartype != null)
		classType = vartype;
  result += classType;
  result += "\">";
  result += "<![CDATA[";
  var value = getTableTFSplit(ele);
  //if(ele.innerHTML.indexOf("SPAN") != -1){
  	//var temp = ele.firstChild.innerHTML;
  	//value=getTableTFSplit(ele);
  	//if(temp.indexOf("@") == 0)
  	//	temp = ele.firstChild.innerHTML.substring(1);
  	//addField(temp);
  	//value = "$F{" + temp +  "}";
	//}
	//else{
		//var temp = ele.innerHTML;
		//value=getTableTFSplit(ele);
  	//if(temp.indexOf("@") == 0)
  	//	temp = ele.innerHTML.substring(1);
		//addField(temp);
		//value = "$F{" + temp +  "}";
	//}
	var print = ele.getAttribute("print");
	var textValue = "";
	if(print == "y" || print == null){
  	textValue += value;
	}
	else{
		textValue += "";
	}
  var valSetCode = ele.getAttribute("printValSetCode");
  if((valSetCode == "n") || (valSetCode == null)){
  	textValue += "";
  }
	else{
		textValue = getToolPath() + "filterValSetCode(" + textValue + ")";
	}
	var printZero = ele.getAttribute("printZero");
  if((printZero == "n") || (printZero == null)){
  	textValue += "";
  }
	else{
		textValue = getToolPath() + "zeroData2Empty(" + textValue + ")";
	}
	var scale = ele.getAttribute("scale");
	if((scale != null) && !(isNaN(parseInt(scale))))
		textValue = getToolPath() + "scaleData(" + textValue + ",\"" + scale +"\")";
	var deli = ele.getAttribute("delimiter");
	if((deli != null) && (deli != ""))
		textValue = getToolPath() + "deliData(" + textValue + ",\"" + deli +"\")";
	var isUpper = ele.getAttribute("istoupper");
	if( isUpper && isUpper == "y")
		textValue = getToolPath() + "money2upper(" + textValue + ")";
  result += textValue;
  result += "]]>";
  result += "</textFieldExpression>\n";
  return result;
}
/**
* 获取表格标题行变量参数内容
*/
function getTableParam(ele){
	var result = "";
	var variflag = ele.getAttribute("varorfield");
	result += "<textFieldExpression class=\"";
	var classType = "java.lang.String";
	var vartype = ele.getAttribute("vartype");
	if(vartype!=null&&variflag=="svariable")
		classType = vartype;
	result += classType;
	result += "\">";
	result += "<![CDATA[";
	var value;
	if(ele.innerHTML.indexOf("SPAN") != -1){
		var temp = ele.firstChild.innerHTML.substring(1);
		if(variflag=="sfield" || variflag==null || variflag=="" || variflag=="sparameter"){
			if(!isMorePages){
				addParameter(temp);
				value = "$P{" + temp +  "}";
			}
			else{
				addField(temp);
				value = "$F{" + temp +  "}";
			}
		}else if(variflag == "sfieldud"){
			addField(temp);
			value = "$F{" + temp +  "}";	
		}else if(variflag=="svariable"){
			addVariable(temp,ele);
			value = "$V{" + temp +  "}";
		}
	}
	else{
		var temp = ele.innerHTML.substring(1);
		if(variflag=="sfield" || variflag==null || variflag=="" || variflag=="sparameter"){
			if(!isMorePages){
				addParameter(temp);
				value = "$P{" + temp +  "}";
			}
			else{
				addField(temp);
				value = "$F{" + temp +  "}";
			}
		}else if(variflag == "sfieldud"){
			addField(temp);
			value = "$F{" + temp +  "}";	
		}else if(variflag=="svariable"){
			addVariable(temp,ele);
			value = "$V{" + temp +  "}";
		}
	}
	var print = ele.getAttribute("print");
	var textValue = "";
	if(print == "y" || print == null){
		textValue += value;
	}
	else{
		textValue += "";
	}
	var valSetCode = ele.getAttribute("printValSetCode");
	if((valSetCode == "n") || (valSetCode == null)){
		textValue += "";
	}
	else{
		textValue = getToolPath() + "filterValSetCode(" + textValue + ")";
	}
	var printZero = ele.getAttribute("printZero");
	if((printZero == "n") || (printZero == null)){
		textValue += "";
	}
	else{
		textValue = getToolPath() + "zeroData2Empty(" + textValue + ")";
	}
	//var printzero = ele.getAttribute("isprintzero");
	//if(printzero && printzero != "y")
		//textValue = getToolPath() + "zeroData2Empty(" + textValue + ")";
	if(!(variflag=="svariable"&&(vartype=="java.lang.Integer"||vartype=="java.lang.Double"))){
		var scale = ele.getAttribute("scale");
		if((scale != null) && !(isNaN(parseInt(scale))))
			textValue = getToolPath() + "scaleData(" + textValue + ",\"" + scale +"\")";
		var deli = ele.getAttribute("delimiter");
		if((deli != null) && (deli != ""))
			textValue = getToolPath() + "deliData(" + textValue + ",\"" + deli +"\")";
	}
	var isUpper = ele.getAttribute("istoupper");
	if( isUpper && isUpper == "y")
		textValue = getToolPath() + "money2upper(" + textValue + ")";
	result += textValue;
	result += "]]>";
	result += "</textFieldExpression>\n";
	return result;
}
/**
* 获取元素通用属性信息
*/
function getReportElement(ele,tableX,tableY,band){
	//alert(ele.parentElement.outerHTML);
	var childValue = "";
	childValue += "<reportElement";
  var mode = "Opaque";
  childValue = childValue + " mode=\"" + mode + "\"";
  var x;
  if(tableX){
  	x = parseInt(ele.offsetLeft) + tableX;
  }
	else{
  	x = ele.offsetLeft;
  }
	if(ele.tagName != "TD"){
  	var parentDiv = ele.parentElement;
  	var parentDivOffsetLeft = parentDiv.offsetLeft;
  	x = x - parentDivOffsetLeft;
	}
	x = unitConvert2(x);
  childValue = childValue + " x=\"" + x + "\"";
  var y;
  var rowOffsetTop = 0;
  if(ele.tagName == "TD"){
  	if(band == "detail"){
  		rowOffsetTop = headerHeight;
  	}
  	else if(band == "footer"){
  		rowOffsetTop = headerHeight + bodyHeight;
  	}
  }
  if(tableY){
  	y = parseInt(ele.offsetTop) + tableY - rowOffsetTop;
  }
  else{
  	y = ele.offsetTop - rowOffsetTop;
	}
	if(ele.tagName != "TD"){
  	var parentDiv = ele.parentElement;
  	var parentDivOffsetTop = parentDiv.offsetTop;
  	y = y - parentDivOffsetTop;
	}
	y = unitConvert2(y);
	y = y - 1;
  childValue = childValue + " y=\"" + y + "\"";
  var width;
  var varType = ele.getAttribute("varflag");
  if(varType == 3){
  	width = parseInt(ele.getAttribute("lineToX")) - ele.offsetLeft;
  }
	else
   width = ele.offsetWidth;
  width = unitConvert2(width);
  childValue = childValue + " width=\"" + width + "\"";
  var height;
  if(varType == 3){
  	height = parseInt(ele.getAttribute("lineToY")) - ele.offsetTop;
  	height = Math.abs(height);
	}
	else
   height = ele.offsetHeight;
  childValue = childValue + " height=\"" + height + "\"";
  var foreColor = ele.style.color==""?"#000000":ele.style.color;
  childValue = childValue + " forecolor=\"" + foreColor + "\"";
  var backcolor = ele.style.backgroundColor == ""?"#FFFFFF":ele.style.backgroundColor;
  if(varType == 0 || varType == 1 || varType == 2)
  	backcolor = "#FFFFFF";
  childValue = childValue + " backcolor=\"" + backcolor + "\"";
  var key = "key" + count;
  count++;
  childValue = childValue + " key=\"" + key + "\"";
  var strechType = "NoStretch";
	if(ele.tagName == "TD"){
		strechType = "RelativeToBandHeight";
	}
  childValue = childValue + " stretchType=\"" + strechType + "\"";
  var positionType = "FixRelativeToTop";
  childValue = childValue + " positionType=\"" + positionType + "\"";
  var isPrintRepeatedValues = true;
  childValue = childValue + " isPrintRepeatedValues=\"" + isPrintRepeatedValues + "\"";
  var isRemoveLineWhenBlank = false;
  childValue = childValue + " isRemoveLineWhenBlank=\"" + isRemoveLineWhenBlank + "\"";
  var isPrintInFirstWholeBand = false;
  childValue = childValue + " isPrintInFirstWholeBand=\"" + isPrintInFirstWholeBand + "\"";
  var isPrintWhenDetailOverflows = true;
  childValue = childValue + " isPrintWhenDetailOverflows=\"" + isPrintWhenDetailOverflows + "\"";
  var isPrintInSplitedTemplate = ele.getAttribute("isPrintInSplitedTemplate");
  if(isPrintInSplitedTemplate == "y")
  	isPrintInSplitedTemplate = true;
  else
  	isPrintInSplitedTemplate = false;
  childValue = childValue + " isPrintInSplitedTemplate=\"" + isPrintInSplitedTemplate + "\"";
  childValue = childValue + "/>\n";
	return childValue;
}
/**
 * 获取元素属性信息
 */
function getTextElement(obj){
  var childValue = "";
	childValue = childValue + "<textElement ";
	var tempAlign = obj.align==""?"left":obj.align;
  var textAlignment = "Center";
  if(tempAlign == "left")
  	textAlignment = "Left";
  else if(tempAlign == "center")
  	textAlignment = "Center";
  else
  	textAlignment = "Right";
  childValue = childValue + " textAlignment=\"" + textAlignment + "\"";
  var verticalAlignment = "";
  var valign = obj.vAlign;
	if(valign=="top")
			verticalAlignment = "Top" ;
	else if(valign=="bottom")
			verticalAlignment = "Bottom" ;
	else
			verticalAlignment = "Middle" ;
  childValue = childValue + " verticalAlignment=\"" + verticalAlignment + "\"";
  var rotation = "None";
  childValue = childValue + " rotation=\"" + rotation + "\"";
  var lineSpacing = "Single";
  childValue = childValue + " lineSpacing=\"" + lineSpacing + "\"\n>";
	childValue = childValue + getFontInfor(obj);
	childValue = childValue + "</textElement>\n";
  return childValue;
}
/**
* 获取字体信息
*/
function getFontInfor(obj){
  var fontInfor = "";
  fontInfor = fontInfor + "<font ";
	var fontFamily = obj.style.fontFamily==""?"simsun":obj.style.fontFamily;
  var fontName = "宋体";
  var pdfFontName = "STSong-Light";
  var isPdfEmbedded = false;
  var pdfEncoding;
  if(fontFamily == "simsun"){
  	fontName = "宋体";
  	pdfFontName = "STSong-Light";
  	isPdfEmbedded = false;
  	pdfEncoding = "UniGB-UCS2-H";
  }
  else if(fontFamily == "simkai"){
  	fontName = "楷体_GB2312";
  	//pdfFontName = "http://" + hostAddr + "/appfont/appfont/simkai.ttf";
  	pdfFontName = "simkai.ttf";
  	isPdfEmbedded = true;
  	pdfEncoding = "Identity-H";
  }
  else if(fontFamily == "simhei"){
  	fontName = "黑体";
  	//pdfFontName = "http://" + hostAddr + "/appfont/appfont/simhei.ttf";
  	pdfFontName = "simhei.ttf";
  	isPdfEmbedded = true;
  	pdfEncoding = "Identity-H";
  }
  else if(fontFamily == "simfang"){
  	fontName = "仿宋_GB2312";
  	pdfFontName = "http://" + hostAddr + "/appfont/appfont/simfang.ttf";
  	pdfFontName = "simfang.ttf";
  	isPdfEmbedded = true;
  	pdfEncoding = "Identity-H";
  }
  else if(fontFamily == "simli"){
  	fontName = "隶书";
  	//pdfFontName = "http://" + hostAddr + "/appfont/appfont/SIMLI.TTF";
  	pdfFontName = "SIMLI.TTF";
  	isPdfEmbedded = true;
  	pdfEncoding = "Identity-H";
  }
  else if(fontFamily == "simyou"){
  	fontName = "幼圆";
  	//pdfFontName = "http://" + hostAddr + "/appfont/appfont/SIMYOU.TTF";
  	pdfFontName = "SIMYOU.TTF";
  	isPdfEmbedded = true;
  	pdfEncoding = "Identity-H";
  }
  fontInfor = fontInfor + " fontName=\"" + fontName + "\"";
  fontInfor = fontInfor + " pdfFontName=\"" + pdfFontName + "\"";
	var fontsize = obj.style.fontSize==""?"13":obj.style.fontSize;
	fontsize = parseInt(fontsize);
  fontInfor = fontInfor + " size=\"" + fontsize + "\"";
  var isBold = false;
  if(obj.style.fontWeight == "bold")
  	isBold = true;
  fontInfor = fontInfor + " isBold=\"" + isBold + "\"";
  var isItalic = false;
  if(obj.style.fontStyle == "italic")
  	isItalic = true;
  fontInfor = fontInfor + " isItalic=\"" + isItalic + "\"";
  var dec = obj.style.textDecoration;
  var isUnderline = false;
  if(dec == "underline"){
  	isUnderline = true;
  }
  fontInfor = fontInfor + " isUnderline=\"" + isUnderline + "\"";
  fontInfor = fontInfor + " isPdfEmbedded=\"" + isPdfEmbedded + "\"";
 	var fontOrient = obj.getAttribute("isVertical");
	if (fontOrient != null && (fontOrient == "y" || fontOrient == "Y"))
		pdfEncoding = "UniGB-UCS2-V";
  fontInfor = fontInfor + " pdfEncoding=\"" + pdfEncoding + "\"";
  var isStrikeThrough = false;
  fontInfor = fontInfor + " isStrikeThrough=\"" + isStrikeThrough + "\"/>\n";
  return fontInfor;
}
/**
* 获取标签字段的内容信息
*/
function getText(ele){
  var text = "";
  text += "<text>";
  text += "<![CDATA[";
  var value;
  if(ele.innerHTML.indexOf("SPAN") != -1){
  	value = ele.firstChild.innerText;
	}
	else
		value = ele.innerText;
	value = value.replace(/&nbsp;/g," ");
	var print = ele.getAttribute("print");
	var textValue = "";
	if(print == "y" || print == null){
  	textValue += value;
	}
	else{
		textValue += "";
	}
	text += textValue;
  text += "]]>";
  text += "</text>\n";
  return text;
}
/**
* 获取表格标题行中标签单元格的内容信息
*/
function getTableText(ele){
  var text = "";
  text += "<text>";
  text += "<![CDATA[";
  var value;
  if(ele.innerHTML.indexOf("SPAN") != -1){
  	value = ele.firstChild.innerHTML;
	}
	else
		value = ele.innerHTML;
	value = value.replace(/&nbsp;/g," ");
	var temp = "";
  if(value.indexOf("@") != -1){
  	temp = temp + "$P{";
  	temp = temp + value.substring(1);
  	temp = temp + "}";
  	addParameter(value.substring(1));
  }
	else{
		temp = temp + value;
	}
	value = temp;
	var print = ele.getAttribute("print");
	var textValue = "";
	if(print == "y" || print == null){
  	textValue += value;
	}
	else{
		textValue += "";
	}
	text = text + textValue;
  text += "]]>";
  text += "</text>\n";
  return text;
}
/**
* 获取参数字段的字段值
*/
function getTextField(ele){
	var result = "";
	result += "<textFieldExpression class=\"";
	var classType = "java.lang.String";
	result += classType;
	result += "\">";
	result += "<![CDATA[";
	var value;
	if(ele.innerHTML.indexOf("SPAN") != -1){
		var temp = ele.firstChild.innerHTML.substring(1);
		if(!isMorePages){
			var varorfield = ele.getAttribute("varorfield");
			if(varorfield == "sfield"){
				addField(temp);
				value = "$F{" + temp +  "}";
			}else if(varorfield == "svariable"){
				//
			}else{
				addParameter(temp);
				value = "$P{" + temp +  "}";
			}
		}
		else{
			addField(temp);
			value = "$F{" + temp +  "}";
		}
	}
	else{
		var temp = ele.innerHTML.substring(1);
		if(!isMorePages){
			var varorfield = ele.getAttribute("varorfield");
			if(varorfield == "sfield"){
				addField(temp);
				value = "$F{" + temp +  "}";
			}else if(varorfield == "svariable"){
				//
			}else{
				addParameter(temp);
				value = "$P{" + temp +  "}";
			}
		}
		else{
			addField(temp);
			value = "$F{" + temp +  "}";
		}
	}
	value = value.replace(/&nbsp;/g," ");
	var print = ele.getAttribute("print");
	var textValue = "";
	if(print == "y" || print == null){
		textValue += value;
	}
	else{
		textValue += "";
	}
	var valSetCode = ele.getAttribute("printValSetCode");
	if((valSetCode == "n") || (valSetCode == null)){
		textValue += "";
	}
	else{
		textValue = getToolPath() + "filterValSetCode(" + textValue + ")";
	}
	var printZero = ele.getAttribute("printZero");
	if((printZero == "n") || (printZero == null)){
		textValue += "";
	}
	else{
		textValue = getToolPath() + "zeroData2Empty(" + textValue + ")";
	}
	var isToUpper = ele.getAttribute("istoupper");
	if((isToUpper) && (isToUpper == "y"))
		textValue = getToolPath() + "money2upper(" + textValue + ")";
	var scale = ele.getAttribute("scale");
	if((scale != null) && !(isNaN(parseInt(scale))))
		textValue = getToolPath() + "scaleData(" + textValue + ",\"" + scale +"\")";
	var deli = ele.getAttribute("delimiter");
	if((deli != null) && (deli != ""))
		textValue = getToolPath() + "deliData(" + textValue + ",\"" + deli +"\")";
	result += textValue;
	result += "]]>";
	result += "</textFieldExpression>\n";
	return result;
}
/**
* 获取变量的变量值
*/
function getVariable(ele){
	var result = "";
  result += "<textFieldExpression class=\"";
  var value = "";
  if(ele.innerHTML.indexOf("SPAN") != -1){
  	var temp = ele.firstChild.innerHTML;
  	if(temp.indexOf("^PAGENO") != -1)
  		value = "$V{PAGE_NUMBER}";
  	else if(temp.indexOf("^PAGES") != -1)
  		value = "$V{PAGE_NUMBER}";
  	else if(temp.indexOf("@TABLE_COUNT") != -1)
  		value = "$V{table_COUNT}";
  	else
  		value = "$V{" +temp.substring(1) +  "}";
	}
	else{
  	var temp = ele.innerHTML;
  	if(temp.indexOf("^PAGENO") != -1)
  		value = "$V{PAGE_NUMBER}";
  	else if(temp.indexOf("^PAGES") != -1)
  		value = "$V{PAGE_NUMBER}";
  	else if(temp.indexOf("@TABLE_COUNT") != -1)
  		value = "$V{table_COUNT}";
  	else
  		value = "$V{" + temp.substring(1) + "}";
  }
	value = value.replace(/&nbsp;/g," ");
	var classType;
	if((value != "$V{PAGE_NUMBER}") && (value != "$V{COLUMN_COUNT}") && (value != "$V{REPORT_COUNT}")&& (value != "$V{table_COUNT}")){
		classType = "java.lang.String";
		addVariable(temp.substring(1),ele);
		}
  else
  	classType = "java.lang.Integer";
  var vartype = ele.getAttribute("vartype");
	if(vartype!=null)
		classType = vartype;
  result += classType;
  result += "\">";
  result += "<![CDATA[";
	var print = ele.getAttribute("print");
	var textValue = "";
	if(print == "y" || print == null){
  	textValue += value;
	}
	else{
		textValue += "";
	}
	var valSetCode = ele.getAttribute("printValSetCode");
	if((valSetCode == "n") || (valSetCode == null)){
		textValue += "";
	}
	else{
		textValue = getToolPath() + "filterValSetCode(" + textValue + ")";
	}
	var printZero = ele.getAttribute("printZero");
	if((printZero == "n") || (printZero == null)){
		textValue += "";
	}
	else{
		textValue = getToolPath() + "zeroData2Empty(" + textValue + ")";
	}
	var isToUpper = ele.getAttribute("istoupper");
	if((isToUpper) && (isToUpper == "y"))
		textValue = getToolPath() + "money2upper(" + textValue + ")";
	var scale = ele.getAttribute("scale");
	if((scale != null) && !(isNaN(parseInt(scale))))
		textValue = getToolPath() + "scaleData(" + textValue + ",\"" + scale +"\")";
	var deli = ele.getAttribute("delimiter");
	if((deli != null) && (deli != ""))
		textValue = getToolPath() + "deliData(" + textValue + ",\"" + deli +"\")";
  result += textValue;
  result += "]]>";
  result += "</textFieldExpression>\n";
  return result;
}
/**
* 向参数数组中加入参数字段
*/
function addParameter(pName){
	var isIn = isInArray(pName,parameters);
	if(isIn) return;
	parameterStr = parameterStr + "<parameter name=\"";
	parameterStr = parameterStr + pName + "\" isForPrompting=\"";
	var isForPrompting = false;
	parameterStr = parameterStr + isForPrompting + "\" class=\"";
	var classType = "java.lang.String";
	parameterStr = parameterStr + classType + "\"/>\n";
	parameters[parameters.length] = pName;
}
/**
* 向字段数组中加入一个字段（如果此字段在数组中不存在则加入，否则不加入）
*/
function addField(fName){
	var isIn = isInArray(fName,fields);
	if(isIn) return;
	fieldStr = fieldStr + "<field name=\"";
	fieldStr = fieldStr + fName + "\"";
	fieldStr = fieldStr + " class=\"";
	var classType = "java.lang.String";
	fieldStr = fieldStr + classType + "\"/>\n";
	fields[fields.length] = fName;
}
/**
* 向变量数组中加入变量字段
*/
function addVariable(pName,ele){
	var isIn = isInArray(pName,variables);
	if(isIn) return;
	variableStr = variableStr + "<variable name=\"";
	variableStr = variableStr + pName + "\" class=\"";
	var classType = "java.lang.String";
	var vartype = ele.getAttribute("vartype");
	if(vartype!=null)
		classType = vartype;
	variableStr = variableStr + classType + "\" resetType=\"";
	var resetType = ele.getAttribute("resettype");
	if(resetType==null)
		resetType = "None";
	variableStr = variableStr + resetType;
	if(resetType=="Group"){
		groupName = "table";
		variableStr = variableStr + "\" resetGroup=\"";
		variableStr = variableStr + groupName ;
	}
	variableStr = variableStr + "\" calculation=\"";
	var calculation = ele.getAttribute("caltype");
	if(calculation==null)
		calculation = "Nothing";
	variableStr = variableStr + calculation + "\">\n";
	var vexpression = ele.getAttribute("vexpression");
	if(vexpression == null)
		vexpression = "";
	if(vexpression!=null){
	  filterVariableExpression(vexpression);
		variableStr = variableStr + "<variableExpression><![CDATA[";
		variableStr = variableStr + vexpression;
		variableStr = variableStr + "]]></variableExpression>\n";
		}
	variableStr = variableStr + "</variable>\n";
	variables[variables.length] = pName;
}
/**
* 向变量数组中加入变量字段，变量从templatebody中获得。
* 处理在变量对话框中增加而在模板中没有显示的变量
*/
function addVariable1(variablesStr){
	var variableValues = new Array();
	variableValues = splitVari(variablesStr,"variables") ;
	var vname = variableValues[0];
	variableStr = variableStr + "<variable name=\"";
	variableStr = variableStr + vname + "\" class=\"";
	var classType = variableValues[2];
	variableStr = variableStr + classType + "\" resetType=\"";
	var resetType = variableValues[3];
	variableStr = variableStr + resetType;
	if(resetType=="Group"){
		var groupName = variableValues[4];
		variableStr = variableStr + "\" resetGroup=\"";
		variableStr = variableStr + groupName ;
	}
	variableStr = variableStr + "\" calculation=\"";
	var calculation = variableValues[5];
	variableStr = variableStr + calculation + "\">\n";
	var vexpression = variableValues[6];
	filterVariableExpression(vexpression);
	variableStr = variableStr + "<variableExpression><![CDATA[";
	variableStr = variableStr + vexpression;
	variableStr = variableStr + "]]></variableExpression>\n";

	variableStr = variableStr + "</variable>\n";
	variables[variables.length] = vname;
}

/**
*将变量表达式中引用的参数或字段加到模板中
*/
function filterVariableExpression(vexpression){
	if(!vexpression)
		return "";
	var fieldHead = "$F{";
	var parameterHead = "$P{";
	filterVariableExpressionReal(vexpression, fieldHead, 0);//字段
	filterVariableExpressionReal(vexpression, parameterHead, 1);//参数
}

function filterVariableExpressionReal(vexpression, vheadstr, vflag){
	if(!vexpression || !vheadstr)
		return "";
	var vStr = vexpression;
	while(vStr.indexOf(vheadstr) != -1){
		var i = vStr.indexOf(vheadstr);
		var j = vStr.indexOf("}");
		var temp = vStr.substring(i + vheadstr.length, j);
		if(vflag == 0){
			addField(temp);	
		}
		else if(vflag == 1){
			addParameter(temp);	
		}
		vStr = vStr.substring(j + 1);
	}
	return true;
}


/**
*取得templatebody属性中的变量串，并判断是否已经添加到变量数组中。
*若没有，则加入。对于变量的属性设置，若已经加到模板中，则以模板中的设置
*为准；否则以变量对话框中的设置为准。若没有设置，则自动设置默认值。
*/
function getAttrVariable(variable){
	var tempObj = document.getElementById("templatebody");
	var variablesStr = tempObj.getAttribute(variable);
	if(variablesStr==null||variablesStr=="")
		return;
	var variableArr = new Array();
	var variableValues = new Array();
	variableArr = splitVariables(variablesStr);
	for(var i=0;i<variableArr.length;i++){
		variableValues = splitVari(variableArr[i],variable) ;
		if(variable=="variables"){//变量
			for(var j=0;j<variables.length;j++){
				if(variableValues[0]==variables[j])
					break;
			}
			if(j<variables.length)
				continue;
			else
				addVariable1(variableArr[i])
		}
		else {//参数
			if(!isMorePages)
				addParameter(variableValues[0]);
			else
				addField(variableValues[0]);
		}
	}
}
/**
 *将多个变量组成的串拆分成一个个变量，并放到数组variablesArr中
 */
function splitVariables(variStr){
	var name = "name=" ;
	var variablesArr = new Array();

	var index0  =  variStr.indexOf(name);
	var index1 = variStr.indexOf(name,index0+1);
	var i = 0;
	while(index1!=-1){
		variablesArr[i] =  variStr.substring(index0,index1);
		index0 = index1;
		index1 = variStr.indexOf(name,index0+1);
		i++;
	}
	variablesArr[i] = variStr.substring(index0,variStr.length);
	return  variablesArr;
}
/**
 *将单个变量串拆分成一个个属性，并放到数组variableValues中
 */
function splitVari(variStr,variable){
	var name = "name=";
	var variableValues = new Array();
	if(variable=="variables")
		var variableNames = new Array("name=","title=","class=","resetType=","resetGroup=","calculation=","variableExpression=");
	else
		var variableNames = new Array("name=","item","title=");
	var interval = "|";
	var i=0;
	var index = variStr.indexOf(name);
	var intervalIndex = variStr.indexOf(interval);
	while(i<variableNames.length-1){
		variableValues[i] = variStr.substring(index + variableNames[i].length,intervalIndex);
		index = intervalIndex + 1;
		intervalIndex = variStr.indexOf(interval,index);
		i++;
	}
	variableValues[i] = variStr.substring(index + variableNames[i].length,variStr.length);
	return variableValues;
}
/**
*判断某个元素是否在数组中
*/
function isInArray(pName,array){
	var result = false;
	for(var i=0,j=array.length; i<j; i++){
		var tempName = array[i];
		if(tempName == pName){
			result = true;
			break;
		}
	}
	return result;
}
function unitConvert2(pixel){
	return parseInt(pixel);
}
/**
* 获得主机地址
*/
function getHostAddr(){
	var names = new Array();
	var values = new Array();
	var result = requestData("getHostAddr","all",names,values);
	return result.text;
}
/**
 *一个单元格内多个字段拆分
 */
function getTableTFSplit(ele){
	var value="";
	var variflag = ele.getAttribute("varorfield");
	var temp = "";
	if(ele.innerHTML.indexOf("SPAN") != -1){
  	temp = ele.firstChild.innerHTML;
	}else{
		temp = ele.innerHTML;
	}
	if(temp.indexOf(";") == 0)
		temp = temp.substring(1);
	if(temp.lastIndexOf(";") == temp.length - 1)
  	temp = temp.substring(0,temp.length - 1);
	if(temp.indexOf(";") == -1){
		if(temp.indexOf("@") == 0)
  		temp = temp.substring(1);
  	if(variflag=="sfield" || variflag==null || variflag=="" || variflag=="sfieldud"){
			addField(temp);
			value = "$F{" + temp +  "}";
		}else if(variflag == "sparameter"){
			addParameter(temp);
			value = "$P{" + temp +  "}";	
		}else if(variflag=="svariable"){
			addVariable(temp,ele);
			value = "$V{" + temp +  "}";
		}
  }else{
  	var tempArray = temp.split(";");
  	for(var i = 0; i < tempArray.length; i++){
  		var valuetemp;
  		var temp1 = tempArray[i];	
  		if(temp1.indexOf("\"") == 0 && temp1.lastIndexOf("\"") == (temp1.length - 1)){
  			valuetemp = temp1;
  		}
  		else{
      	if(temp1.indexOf("@") == 0)
      		temp1 = temp1.substring(1);
      	if(variflag=="sfield" || variflag==null || variflag=="" || variflag=="sfieldud"){
    			addField(temp1);
    			valuetemp = "$F{" + temp1 +  "}";
    		}else if(variflag == "sparameter"){
    			addParameter(temp1);
    			valuetemp = "$P{" + temp1 +  "}";	
    		}else if(variflag=="svariable"){
    			addVariable(temp1,ele);
    			valuetemp = "$V{" + temp1 +  "}";
    		}
  	  }
  		value += valuetemp;
  		if(i < tempArray.length - 1){
  			value += "+" +"\"" +"   "+ "\"" + "+";
  		}
  	}
  }
  return value;
}

function getPattern(ele){
	var pattern = "";
	var deli = ele.getAttribute("delimiter");
	var scale = ele.getAttribute("scale");
	if((deli != null) && (deli != ""))
		pattern = "#,##" ;
	else
		pattern = "###" ;
	var str = "0";
  if((scale != null) && !(isNaN(parseInt(scale)))){
		var strScale = "";
		for (var i = scale;i > 0;i--)
			strScale += str;
		if(strScale!="")
			str = str + "." + strScale;
	}
	if(((deli != null) && (deli != ""))||((scale != null) && !(isNaN(parseInt(scale)))))
		pattern += str ;
	else
		pattern = "";
	return pattern;
}
/**
 *过滤自定义变量、参数和分组，判断是否加入字段FIXROWCOUNT、字段Recordid和参数RecordTotal0
 */
function filterRecords(){
	if(records >0)
  	addField("FIXROWCOUNT");
	if(variableStr.indexOf("RecordTotal0")>0||parameterStr.indexOf("RecordTotal0")>0)
		addParameter("RecordTotal0");
  if(variableStr.indexOf("Recordid")>0||parameterStr.indexOf("Recordid")>0)
  	addField("Recordid");
}

/**
 * 取得单元格边框信息
 * return border
 */
function getBorderElement(tableObj,count,band,rowIndex,cellIndex){
  var border = new Array();
  border[0] = "";//leftBorder
  border[1] = "";//rightBorder
  border[2] = "";//topBorder;
  border[3] = "";//bottomBorder;
  switch(band){
    case "header":
      if(cellIndex == 0)
        border[0] = "left";
      if(cellIndex == tableObj.rows(rowIndex).cells.length - 1){
        var td = tableObj.rows(rowIndex).cells(cellIndex);
        var tableWidth = tableObj.offsetWidth;
        var tdLeft = td.offsetLeft;
        var tdWidth = td.offsetWidth;
        if(tdLeft + tdWidth == tableWidth - 1){
        	border[1] = "right";
        }
      }  
      if(rowIndex == 0)
        border[2] = "top";
      if(rowIndex == count - 1 && bodyCount == 0 && footerCount == 0)
        border[3] = "bottom";
      break;
    case "footer":
      if(cellIndex == 0)
        border[0] = "left";
      if(cellIndex == tableObj.rows(rowIndex).cells.length - 1){
        var td = tableObj.rows(rowIndex).cells(cellIndex);
        var tableWidth = tableObj.offsetWidth;
        var tdLeft = td.offsetLeft;
        var tdWidth = td.offsetWidth;
        if(tdLeft + tdWidth == tableWidth - 1){
        	border[1] = "right";
        }
      }
      if(rowIndex == 0 && bodyCount == 0 && headerCount == 0)
        border[2] = "top";
      if(rowIndex == headerCount + bodyCount + footerCount - 1)
        border[3] = "bottom";
      break;
    case "detail":
      if(cellIndex == 0)
        border[0] = "left";
      if(cellIndex == tableObj.rows(rowIndex).cells.length - 1)
        border[1] = "right";
      break;
    default:
      border[0] = "left";
      border[1] = "right";
      border[2] = "top";
      border[3] = "bottom";
  }
  
  var borderT = new Array();
  var borderSelf = new Array();
  borderT[0] =  border;
  if(tableObj){
  	var cell = tableObj.rows(rowIndex).cells(cellIndex);
  	borderSelf = getSelfBorderWidth(cell);
  }
  borderT[1] = borderSelf;
  return borderT;
}
function getSelfBorderWidth(cellObj){
	var borderSelf = new Array();
	if(!cellObj)
		return borderSelf;
	var borderWidth = "1";
	
	var leftBorderWidth = cellObj.style.borderLeftStyle;
	if(!leftBorderWidth){
		leftBorderWidth = parseInt(cellObj.style.borderLeftWidth);
		if(isNaN(borderWidth))
			leftBorderWidth = borderWidth;
	}
	borderSelf[0] = convertBorderToJasperB(leftBorderWidth);
	
	var rightBorderWidth = cellObj.style.borderRightStyle;
	if(!rightBorderWidth){
		rightBorderWidth = parseInt(cellObj.style.borderRightWidth);
		if(isNaN(rightBorderWidth))
			rightBorderWidth = borderWidth;
	}
	borderSelf[1] = convertBorderToJasperB(rightBorderWidth);
	
	var topBorderWidth = cellObj.style.borderTopStyle;
	if(!topBorderWidth){
		topBorderWidth = parseInt(cellObj.style.borderTopWidth);
		if(isNaN(topBorderWidth))
			topBorderWidth = borderWidth;
	}
	borderSelf[2] = convertBorderToJasperB(topBorderWidth);
	
	var bottomBorderWidth = cellObj.style.borderBottomStyle;
	if(!bottomBorderWidth){
		bottomBorderWidth = parseInt(cellObj.style.borderBottomWidth);
		if(isNaN(bottomBorderWidth))
			bottomBorderWidth = borderWidth;
	}
	borderSelf[3] = convertBorderToJasperB(bottomBorderWidth);
	
	return borderSelf;	
}

function convertBorderToJasperB(borderWidth){
	var jasperBorder = "Thin";
	switch(borderWidth){
		
		case "1":
			jasperBorder = "Thin";
			break;
		case "2":
			jasperBorder = "1Point";
			break;
		case "3":
			jasperBorder = "2Point";
			break;	
		case "4":
			jasperBorder = "4Point";
			break;
		case "none":
			jasperBorder = "None";
			break;
		case "dotted":
			jasperBorder = "Dotted";
			break;
		default:
			jasperBorder = "Thin";
			break;
	}
	return jasperBorder;
}

/**
 * 元素新增Box属性，用于为元素加边框
 */
function getBoxElement(borderT){
	var result = "";
	if(!borderT)
		return result;
	var border = borderT[0];
	var borderSelf = borderT[1]; 
	result += "<box ";
	var leftPadding = "1";
	result += "leftPadding=\"" + leftPadding + "\" ";
	//var rightPadding = "1";
	var rightPadding = "2";
	if(border[1] == "right")
    if(isBorderBond)
    	rightPadding = "3";
	result += "rightPadding=\"" + rightPadding + "\" ";
	var topPadding = "0";
	result += "topPadding=\"" + topPadding + "\" ";
	var bottomPadding = "0";
	result += "bottomPadding=\"" + bottomPadding + "\" ";
  var leftBorder = "Thin";
  if(border[0] == "left")
    if(isBorderBond)
      leftBorder = "2Point";
    else
      leftBorder = "1Point";
  if(borderSelf[0] && borderSelf[0] != "Thin")
  	leftBorder = borderSelf[0];
  result += "leftBorder=\"" + leftBorder + "\" ";
  var rightBorder = "Thin";
  if(border[1] == "right")
    if(isBorderBond)
      rightBorder = "2Point";
    else
      rightBorder = "1Point";
  if(borderSelf[1] && borderSelf[1] != "Thin")
  	rightBorder = borderSelf[1];
  result += "rightBorder=\"" + rightBorder + "\" ";
  var topBorder = "Thin";
  if(border[2] == "top")
    if(isBorderBond)
	    topBorder = "2Point";
    else
      topBorder = "1Point";
  if(borderSelf[2] && borderSelf[2] != "Thin")
  	topBorder = borderSelf[2];
	result += "topBorder=\"" + topBorder + "\" ";
	var bottomBorder = "Thin";
  if(border[3] == "bottom")
    if(isBorderBond)
      bottomBorder = "2Point";
    else
      bottomBorder = "1Point";
  if(borderSelf[3] && borderSelf[3] != "Thin")
  	bottomBorder = borderSelf[3];
	result += "bottomBorder=\"" + bottomBorder + "\" ";
	var leftBorderColor = "#000000";
	result += "leftBorderColor=\"" + leftBorderColor + "\" ";
	var rightBorderColor = "#000000";
	result += "rightBorderColor=\"" + rightBorderColor + "\" ";
	var topBorderColor = "#000000";
	result += "topBorderColor=\"" + topBorderColor + "\" ";
	var bottomBorderColor = "#000000";
	result += "bottomBorderColor=\"" + bottomBorderColor + "\" ";
	var borderColor = "#000000";
	result += "borderColor=\"" + borderColor + "\" ";
	result += "/>"
	return result;
}
/**
 * 若groupheader或者groupfooter中没有表格元素，而detail区有元素，需要在
 * groupheader或者groupfooter区中加一条直线，以使detail的上下边框与
 * 左右边框一样宽。
 * 规定这条直线的key为"keySpecialLine"，这样在分割模板和动态缩列时容易处理。
 */
function getBorderLine(tableObj){
  var result = "<line direction=\"TopDown\">\n";
  result += "<reportElement	mode=\"Opaque\" ";
  result += "x=";
  var tableX = tableObj.offsetLeft - tableObj.parentElement.offsetLeft + 1;
  result += "\""+tableX+"\"";
  result += " y=\"0\" ";
	result += "width=";
  var tableW = tableObj.offsetWidth - 2;
  result += "\""+tableW+"\"";
  result += " height=\"0\" ";
  result += "forecolor=\"#000000\"	backcolor=\"#FFFFFF\" ";
  result += "key=";
  var key = "key" + "SpecialLine";
  result += "\""+key+"\"";
  result += " stretchType=\"NoStretch\" ";
  result += "positionType=\"FixRelativeToTop\" ";
  result += "isPrintRepeatedValues=\"true\" ";
  result += "isRemoveLineWhenBlank=\"false\" ";
  result += "isPrintInFirstWholeBand=\"false\" ";
  result += "isPrintWhenDetailOverflows=\"false\"/>\n";
  result += "<graphicElement stretchType=\"NoStretch\" ";
  result += "pen=";
  var linePen = "2Point";
  result += "\""+linePen+"\"";
  result += " fill=\"Solid\" />";
	result += "</line>";
  return result;
}

function getBorderLine1(tableObj){
  var result = "<line direction=\"TopDown\">\n";
  result += "<reportElement	mode=\"Opaque\" ";
  result += "x=";
  var tableX = tableObj.offsetLeft - tableObj.parentElement.offsetLeft + 1;
  result += "\""+tableX+"\"";
  result += " y=\"0\" ";
	result += "width=";
  var tableW = tableObj.offsetWidth - 2;
  result += "\""+tableW+"\"";
  result += " height=\"0\" ";
  result += "forecolor=\"#000000\"	backcolor=\"#FFFFFF\" ";
  result += "key=";
  var key = "key" + "SpecialLine";
  result += "\""+key+"\"";
  result += " stretchType=\"NoStretch\" ";
  result += "positionType=\"FixRelativeToTop\" ";
  result += "isPrintRepeatedValues=\"true\" ";
  result += "isRemoveLineWhenBlank=\"false\" ";
  result += "isPrintInFirstWholeBand=\"false\" ";
  result += "isPrintWhenDetailOverflows=\"false\"/>\n";
  result += "<graphicElement stretchType=\"NoStretch\" ";
  result += "pen=";
  var linePen = "1Point";
  result += "\""+linePen+"\"";
  result += " fill=\"Solid\" />";
	result += "</line>";
  return result;
}

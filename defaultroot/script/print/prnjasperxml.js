/* $Id: prnjasperxml.js,v 1.2 2008/03/19 01:16:47 liuxiaoyong Exp $*/

var count = 0;
var headerCount = 0;
var footerCount = 0;
var bodyCount = 0;
/**
 *
 */
function getJasperXML(){	
  var data = getJasperPageSetData();
  data = data + getPageHeaderXML();
  data = data + getColumnHeaderXML();
  var detailBand = documnet.getElementById("detail");
  data = data + getDetailXML(detailBand);
  data = data + getPageFooterXML();
  data += "</jasperReport>\n";
  return data;
}
function getOldJasperXML(){
	var data = "";
  data = getJasperPageSetData();
  var pageHeaderObj = document.getElementById("pageheader");
  data  = data + "<pageHeader>";
  data = data + getBandXML(pageHeaderObj);
  data = data + "</pageHeader>";
  var rpHeaderObj = document.getElementById("rpheader");
  data = data + "<columnHeader>";
  data = data + getBandXML(rpHeaderObj);
  data = data + "</columnHeader>";
  var rpBodyObj = document.getElementById("rpbody");
  data = data + getDetailXML(rpBodyObj);
  var rpFooterObj = document.getElementById("rpfooter");
  data = data + "<columnFooter>";
  data = data + getBandXML(rpFooterObj);
  data = data + "</columnFooter>";
  var pageFooterObj = document.getElementById("pagefooter");
  data = data + "<pageFooter>";
  data = data + getBandXML(pageFooterObj);
  data = data + "</pageFooter>";
  data += "</jasperReport>\n";
	return data;
}
function getGroupXML(){
	var data = "";
	data = data + "<group name=\"";
	var groupName = "table";
	data = data + groupName + "\" isStartNewColumn=\"";
	var isStartNewColumn = false;
	data = data + isStartNewColumn + "\" isStartNewPage=\"";
	var isStartNewPage = false;
	data = data + isStartNewPage + "\" isResetPageNumber=\""; 
	var isResetPageNumber = false;
	data = data + isResetPageNumber + "\" isReprintHeaderOnEachPage=\"";
	var isReprintHeaderOnEachPage = true;
	data = data + isReprintHeaderOnEachPage + "\" minHeightToStartNewPage=\"";
	var minHeightToStartNewPage = 0;
	data = data + minHeightToStartNewPage + "\">\n";
	data = data + "<groupExpression>";
	var groupExpression = "$F{temp}";
	data = data + "<![CDATA[" + groupExpression + "]]>\n";
	data = data + "</groupExpression>";
  data = data + getGroupHeaderXML();
  data = data + getGroupFooterXML();
  data = data + "</group>\n";
  return data;
}
/**
 *
 */
function getJasperPageSetData(){
  var data = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";
  //data = data + "<!DOCTYPE jasperReport PUBLIC \"//JasperReports//DTD Report Design//EN\" \"http://jasperreports.sourceforge.net/dtds/jasperreport.dtd\">";
  var reportName = "as_role";
  data = data + "<jasperReport name=\"" + reportName + "\"\n";
  var columnCount = 1;
  data = data + " columnCount=\"" + columnCount + "\"\n";
  var printOrder = "Vertical";
	data = data + " printOrder=\"" + printOrder + "\"\n";
  var orientation = "Portrait";
  data = data + " orientation=\"" + orientation + "\"\n";
  var pageWidth = 595;
	data = data +  " pageWidth=\"" + pageWidth + "\"\n";
  var pageHeight = 842;
	data = data + " pageHeight=\"" + pageHeight + "\"\n";
  var columnWidth = 535;
	data = data + " columnWidth=\"" + columnWidth + "\"\n";
  var columnSpacing = 0;
	data = data + " columnSpacing=\"" + columnSpacing + "\"";
 	var leftMargin = 30;
	data = data + " leftMargin=\"" + leftMargin + "\"";
	var rigthMargin = 30;
  data = data + " rightMargin=\"" + rigthMargin + "\"";
  var topMargin = 20;
  data = data + " topMargin=\"" + topMargin + "\"";
  var bottomMargin = 20;
	data += " bottomMargin=\"" + bottomMargin + "\"";
  var whenNoData = "NoPages";
  data = data + " whenNoDataType=\"" + whenNoData + "\"";
 	var scriptletClass = "";
  data = data + " scriptletClass=\"" + scriptletClass + "\"";
  var isTitleNewPage = "false";
  data = data + " isTitleNewPage=\"" + isTitleNewPage + "\"";
  var isSummaryNewPage = "false";
  data = data + "  isSummaryNewPage=\"" + isSummaryNewPage + "\">\n";
  return data;
  }
/**
 * 取pageHeader信息
 */
function getPageHeaderXML(){
	var result = "";
	var pageHeaderObj = document.getElementById("pageHeader");
  result += "<pageHeader>";
	result += getBandXML(pageHeaderObj);
  result += "</pageHeader>\n";
  return result;
}
/**
 * 获得columnHeader信息
 */
function getColumnHeaderXML(){
	var result = "";
	var columnHeaderObj = document.getElementById("columnHeader");
  result += "<columnHeader>";
	result += getBandXML(columnHeaderObj);
  result += "</columnHeader>\n";
  return result;
}
/**
 * 分组头信息
 */
function getGroupHeaderXML(){
	var result = "";
	var groupHeaderObj = document.getElementById("groupHeader");
  result += "<groupHeader>";
	result += getBandXML(groupHeaderObj);
  result += "</groupHeader>\n";
  return result;
}
function getDetailXML(bandObj){
	var result = "";
	headerCount = 0;
	bodyCount = 0;
	footerCount = 0;
	parameterStr = "";
	fieldStr = "";
	var ele = bandObj.firstChild;
  if(ele.tagName == "TABLE"){
  	result += getTableInfor(ele);
  }
  return result;
}
/**
 * 分组尾信息
 */
function getGroupFooterXML(){
	var result = "";
	var groupFooterObj = document.getElementById("groupFooter");
  result += "<groupFooter>";
	result += getBandXML(groupFooterObj);
  result += "</groupFooter>\n";
  return result;
}
/**
 * columnFooter信息
 */
function getColumnFooterXML(){
	var result = "";
	var ColumnFooterObj = document.getElementById("columnFooter");
  result += "<columnFooter>";
	result += getBandXML(ColumnFooterObj);
  result += "</columnFooter>\n";
  return result;
}
/**
 * 页脚信息
 */
function getPageFooterXML(){
	var result = "";
	var pageFooterObj = document.getElementById("pageFooter");
  result += "<pageFooter>";
	result += getBandXML(pageFooterObj);
  result += "</pageFooter>\n";
  return result;
}
/**
 * 获得区内元素信息
 */
function getBandXML(bandObj){
  var result = "";
  result += "<band height=\"";
  var vheight = bandObj.offsetHeight;
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
 *
 */
function getChild(eles){
	var childValue = "";
	if (eles != "") {
		for (var j = 0; j < eles.length; j++) {
      //取特定类型的标签
      var ele = eles.item(j);
      var labelType = ele.getAttribute("varflag");
      labelType = parseInt(labelType);
      //1表示静态文本
			if((labelType == 1) || ((labelType == 0))){
        childValue += getStaticTextInfor(ele);
      }
      //2表示字段变量
      else if(labelType == 2){
        childValue += getTextFieldInfor(ele);
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
 */
function getStaticTextInfor(ele){
  var childValue = "";
	childValue += "<staticText>\n";
	childValue += getReportElement(ele);
	childValue += getTextElement(ele);
	childValue += getText(ele);
	childValue += "</staticText>\n";
  return childValue;
}
/**
 * 取得变量字段信息
 */
function getTextFieldInfor(ele){
  var childValue = "";
  childValue += "<textField isStretchWithOverflow=\"";
  var isStretchWithOverflow = false;
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
  childValue += getTextElement(ele);
  childValue += getTextField(ele);
  childValue += "</textField>\n";
  return childValue;
}
/**
 * 获取line元素信息
 */
function getLineInfor(ele){
  var result = "";
  result = result + "<line direction=\"";
  var direction = "BottomUp";
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
  result = result + "<rectangle radious=\"";
  var radious = 0;
  result = result + radious + "\">\n";
  result = result + getReportElement(ele);
  result = result + getGraphicElement(ele);
  result = result + "</rectangle>\n";
  return result;
}
/**
 * 获取图片信息
 */
function getImageInfor(ele){
  var result = "";
  result = result + "<image scaleImage=\"";
  var scaleImage = "FillFrame";
  result = result + scaleImage + "\" vAlign=\"";
  var vAlign = "Top";
  result = result + vAlign + "\" hAlign=\"";
  var hAlign = "Left";
  result = result + hAlign + "\" isUsingCache=\"";
  var isUsingCache = false;
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
 * 获取表格信息
 */
function getTableInfor(ele){
  var result = "";
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
	var isStartNewPage = false;
	data = data + isStartNewPage + "\" isResetPageNumber=\""; 
	var isResetPageNumber = false;
	data = data + isResetPageNumber + "\" isReprintHeaderOnEachPage=\"";
	var isReprintHeaderOnEachPage = true;
	data = data + isReprintHeaderOnEachPage + "\" minHeightToStartNewPage=\"";
	var minHeightToStartNewPage = 0;
	data = data + minHeightToStartNewPage + "\">\n";
	data = data + "<groupExpression>";
	var groupExpression = "$F{temp}";
	data = data + "<![CDATA[" + groupExpression + "]]>\n";
	data = data + "</groupExpression>";
  data = data + getHeaderRow(ele,headerCount);
  data = data + getFooterRow(ele,footerCount);
  data = data + "</group>\n";
  result = result + data;
  result = result + getDetailRow(ele,bodyCount);
  return result;
}
function getHeaderRow(tableObj,headerCount){
	var result = "";
  result += "<groupHeader>";
  result += "<band height=\"";
  var vheight = 0;
  for(var m=0,n=headerCount; m<n; m++){
  	var row = tableObj.rows[m];
  	vheight += parseInt(row.offsetHeight);
  }
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = true;
  result += isSplitAllowed;
  result +="\">\n";
    
  var tableX = tableObj.offsetLeft;
  var tableY = tableObj.offsetTop;
  for(var m=0,n=headerCount; m<n; m++){
  	for(var i=0; i<tableObj.rows(m).cells.length; i++){
  		var td = tableObj.rows(m).cells(i);
  		result = result + getTableBorder(td,tableX);
  		result = result + getTableStaticText(td,tableX);
  	}
	}
	result += "</band>";
  result += "</groupHeader>\n";
	return result;
}
function getFooterRow(tableObj,fooerCount){
	var result = "";
  result += "<groupFooter>";
  result += "<band height=\"";
  var vheight = 0;
  for(var m=headerCount+bodyCount,n=headerCount+bodyCount+footerCount; m<n; m++){
  	var row = tableObj.rows[m];
  	vheight += parseInt(row.offsetHeight);
  }
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = true;
  result += isSplitAllowed;
  result +="\">\n";

  var tableX = tableObj.offsetLeft;
  var tableY = tableObj.offsetTop;
  for(var m=headerCount+bodyCount,n=headerCount+bodyCount+footerCount; m<n; m++){
  	for(var i=0; i<tableObj.rows(m).cells.length; i++){
  		var td = tableObj.rows(m).cells(i);
  		result = result + getTableBorder(td,tableX);
  		result = result + getTableStaticText(td,tableX);
  	}
	}
	result += "</band>";
  result += "</groupFooter>\n";
	return result;
}
function getTableBorder(tdEle,tableX,tableY){
  var result = "";
  result = result + "<rectangle radious=\"";
  var radious = 0;
  result = result + radious + "\">\n";
  result = result + getReportElement(tdEle,tableX);
  result = result + getGraphicElement(tdEle);
  result = result + "</rectangle>\n";
  return result;
}
function getTableStaticText(ele,tableX,tableY){
  var childValue = "";
	childValue += "<staticText>\n";
	childValue += getTableRE(ele,tableX);
	childValue += getTextElement(ele);
	childValue += getText(ele);
	childValue += "</staticText>\n";
  return childValue;
}
function getTableRE(ele,tableX,tableY){
	var childValue = "";
	childValue += "<reportElement";
  var mode = "Opaque";
  childValue = childValue + " mode=\"" + mode + "\"";
  var x;
  if(tableX){
  	x = parseInt(ele.offsetLeft) + 2 + tableX
  }
  else{
		x = parseInt(ele.offsetLeft) + 2;
  }
  childValue = childValue + " x=\"" + x + "\"";
  var y;
  if(tableY){
  	y = parseInt(ele.offsetTop) + 2 + tableY;
  }
  else{
  	y = parseInt(ele.offsetTop) + 2;
  }
  childValue = childValue + " y=\"" + y + "\"";
  var width = parseInt(ele.offsetWidth)-4;
  childValue = childValue + " width=\"" + width + "\"";
  var height = parseInt(ele.offsetHeight)-4;
  childValue = childValue + " height=\"" + height + "\"";
  var foreColor = "#000000";
  childValue = childValue + " forecolor=\""; + foreColor + "\"";
  var backcolor = "#FFFFFF";
  childValue = childValue + " backcolor=\""; + backcolor + "\"";
  var key = "key" + count;
  count++;
  childValue = childValue + " key=\"" + key + "\"";
  var strechType = "NoStretch";
  childValue = childValue + " stretchType=\"" + strechType + "\"";
  var positionType = "FixRelativeToTop";
  childValue = childValue + " positionType=\"" + positionType + "\"";
  var isPrintRepeatedValues = true;
  childValue = childValue + " isPrintRepeatedValues=\"" + isPrintRepeatedValues + "\"";
  var isRemoveLineWhenBlank = false;
  childValue = childValue + " isRemoveLineWhenBlank=\"" + isRemoveLineWhenBlank + "\"";
  var isPrintInFirstWholeBand = false;
  childValue = childValue + " isPrintInFirstWholeBand=\"" + isPrintInFirstWholeBand + "\"";
  var isPrintWhenDetailOverflows = false;
  childValue = childValue + " isPrintWhenDetailOverflows=\"" + isPrintWhenDetailOverflows + "\"";
  childValue = childValue + "/>\n";
	return childValue;
}

function getDetailRow(tableObj){
	var result = "";
  result += "<detail>";
  result += "<band height=\"";
  var vheight = 0;
  for(var m=headerCount,n=headerCount+bodyCount; m<n; m++){
  	var row = tableObj.rows[m];
  	vheight += parseInt(row.offsetHeight);
  }
  result += vheight;
  result += "\" isSplitAllowed=\"";
  var isSplitAllowed = true;
  result += isSplitAllowed;
  result +="\">\n";

  var tableX = tableObj.offsetLeft;
  var tableY = tableObj.offsetTop;
  for(var m=headerCount,n=headerCount+bodyCount; m<n; m++){
  	for(var i=0; i<tableObj.rows(m).cells.length; i++){
  		var td = tableObj.rows(m).cells(i);
  		result = result + getTableBorder(td,tableX);
  		result = result + getTableTextField(td,tableX);
  	}
	}
	result += "</band>";
  result += "</detail>\n";
	return result;	
}
function getTableTextField(tdEle,tableX,tableY){
  var childValue = "";
  childValue += "<textField isStretchWithOverflow=\"";
  var isStretchWithOverflow = false;
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
  childValue += getTableRE(tdEle,tableX);
  childValue += getTextElement(tdEle);
  childValue += getTextField(tdEle);
  childValue += "</textField>\n";
  return childValue;
}
function getReportElement(ele,tableX,tableY){
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
  childValue = childValue + " x=\"" + x + "\"";
  var y;
  if(tableY){
  	y = parseInt(ele.offsetTop) + tableY;	
  }
  else{
  	y = ele.offsetTop;
	}
  childValue = childValue + " y=\"" + y + "\"";
  var width = ele.offsetWidth;
  childValue = childValue + " width=\"" + width + "\"";
  var height = ele.offsetHeight;
  childValue = childValue + " height=\"" + height + "\"";
  var foreColor = "#000000";
  childValue = childValue + " forecolor=\"" + foreColor + "\"";
  var backcolor = "#FFFFFF";
  childValue = childValue + " backcolor=\"" + backcolor + "\"";
  var key = "key" + count;
  count++;
  childValue = childValue + " key=\"" + key + "\"";
  var strechType = "NoStretch";
  childValue = childValue + " stretchType=\"" + strechType + "\"";
  var positionType = "FixRelativeToTop";
  childValue = childValue + " positionType=\"" + positionType + "\"";
  var isPrintRepeatedValues = true;
  childValue = childValue + " isPrintRepeatedValues=\"" + isPrintRepeatedValues + "\"";
  var isRemoveLineWhenBlank = false;
  childValue = childValue + " isRemoveLineWhenBlank=\"" + isRemoveLineWhenBlank + "\"";
  var isPrintInFirstWholeBand = false;
  childValue = childValue + " isPrintInFirstWholeBand=\"" + isPrintInFirstWholeBand + "\"";
  var isPrintWhenDetailOverflows = false;
  childValue = childValue + " isPrintWhenDetailOverflows=\"" + isPrintWhenDetailOverflows + "\"";
  var isPrintInSplitedTemplate = ele.getAttribute("isPrintInSplitedTemplate");
  if(isPrintInSplitedTemplate != "true")
  	isPrintInSplitedTemplate = false;
  childValue = childValue + " isPrintInSplitedTemplate=\"" + isPrintInSplitedTemplate + "\"";
  childValue = childValue + "/>\n";
	return childValue;
}
/**
 *
 */
function getTextElement(obj){
  var childValue = "";
	childValue = childValue + "<textElement ";
  var textAlignment = "Center";
  childValue = childValue + " textAlignment=\"" + textAlignment + "\"";
  var verticalAlignment = "Top";
  childValue = childValue + " verticalAlignment=\"" + verticalAlignment + "\"";
  var rotation = "None";
  childValue = childValue + " rotation=\"" + rotation + "\"";
  var lineSpacing = "Single";
  childValue = childValue + " lineSpacing=\"" + lineSpacing + "\"\n>";
	childValue = childValue + getFontInfor(obj);
	childValue = childValue + "</textElement>\n";
  return childValue;
}
function getFontInfor(obj){
  var fontInfor = "";
  fontInfor = fontInfor + "<font ";
  var fontName = "SansSerif";
  fontInfor = fontInfor + " fontName=\"" + fontName + "\"";
  var pdfFontName = "Helvetica";
  fontInfor = fontInfor + " pdfFontName=\"" + pdfFontName + "\"";
  var fontSize = 12;
  fontInfor = fontInfor + " size=\"" + fontSize + "\"";
  var isBold = false;
  fontInfor = fontInfor + " isBold=\"" + isBold + "\"";
  var isItalic = false;
  fontInfor = fontInfor + " isItalic=\"" + isItalic + "\"";
  var isUnderline = false;
  fontInfor = fontInfor + " isUnderline=\"" + isUnderline + "\"";
  var isPdfEmbedded = false;
  fontInfor = fontInfor + " isPdfEmbedded=\"" + isPdfEmbedded + "\"";
  var pdfEncoding = "CP1252";
  fontInfor = fontInfor + " pdfEncoding=\"" + pdfEncoding + "\"";
  var isStrikeThrough = false;
  fontInfor = fontInfor + " isStrikeThrough=\"" + isStrikeThrough + "\"/>\n";
  return fontInfor;
  }
function getGraphicElement(ele){
  var result = "";
  result = result + "<graphicElement stretchType=\"";
  var stretchType = "NoStretch";
  result = result + stretchType + "\" pen=\"";
  var pen = "Thin";
  result = result + pen + "\" fill=\"";
  var fill = "Solid";
  result = result + fill + "\"/>\n";
  return result;
}
function getText(ele){
  var text = "";
  text += "<text>";
  text += "<![CDATA[";
  var value;
  if(ele.innerHTML.indexOf("SPAN") != -1){
  	value = "$F{" + ele.firstChild.innerHTML.substring(1) +  "}";
	}
	else
		value = "$F{" + ele.innerHTML.substring(1) +  "}";
  text += value;
  text += "]]>";
  text += "</text>\n";
  return text;
}
function getTextField(ele){
	var result = "";
  result += "<textFieldExpression class=\"";
  var classType = "java.lang.String";
  result += classType;
  result += "\">";
  result += "<![CDATA[";
  var value;
  if(ele.innerHTML.indexOf("SPAN") != -1){
  	value = "$F{" + ele.firstChild.innerHTML.substring(1) +  "}";
	}
	else
		value = "$F{" + ele.innerHTML.substring(1) +  "}";
  result += value;
  result += "]]>";
  result += "</textFieldExpression>\n";
  return result;
}
function getImage(ele){
	var result = "";
  result = result + "<imageExpression class=\"";
  var classType = "java.lang.String";
  result = result + classType + "\">";
  result = result +  "<![CDATA[";
  var value = "";
  result = result + value;
  result = result +  "]]>";
  result = result + "</imageExpression>\n";
  return result;
}

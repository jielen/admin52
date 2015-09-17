<%@ page contentType="text/html; charset=GBK" %>
<html>
<head>
<title>打印设置</title>
<LINK href="script/applus.css" rel="stylesheet" type="text/css">
<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
<SCRIPT language="javascript" src="script/report.js"></SCRIPT>
<script language="JavaScript">
var direction = "portrait";
var printOrder="Vertical" ;
var whenNoDataType="NoPages";
var fixRowCount = "";
var tplOffset = 0.75;//模板实际偏移量

///窗口初始化
function windowload()
{
	var pageSetupObj = window.dialogArguments;
	document.all.leftMargin.value = (pageSetupObj.getAttribute("leftMargin")==null?pixelToMm(23):pixelToMm(pageSetupObj.getAttribute("leftMargin")));
	document.all.rightMargin.value = (pageSetupObj.getAttribute("rightMargin")==null?pixelToMm(23):pixelToMm(pageSetupObj.getAttribute("rightMargin")));
	document.all.topMargin.value = (pageSetupObj.getAttribute("topMargin")==null?pixelToMm(19):pixelToMm(pageSetupObj.getAttribute("topMargin")));
	document.all.bottomMargin.value = (pageSetupObj.getAttribute("bottomMargin")==null?pixelToMm(19):pixelToMm(pageSetupObj.getAttribute("bottomMargin")));
	//document.all.templatewidth.value = (pageSetupObj.getAttribute("templatewidth")==null?"":pageSetupObj.getAttribute("templatewidth"));
	document.all.groupField.value = pageSetupObj.getAttribute("groupField")==null?"":pageSetupObj.getAttribute("groupField");
	var rpHeaderEachPage = pageSetupObj.getAttribute("rpHeaderEachPage");
	if(rpHeaderEachPage == "n")
		document.all.rpHeaderEachPage.checked = false;
	else
		document.all.rpHeaderEachPage.checked = true;
	var rpFooterEachPage = pageSetupObj.getAttribute("rpFooterEachPage");
	if(rpFooterEachPage == "n")
		document.all.rpFooterEachPage.checked = false;
	else
		document.all.rpFooterEachPage.checked = true;
	var pageFooterEachPage = pageSetupObj.getAttribute("pageFooterEachPage");
	if(pageFooterEachPage == "n")
		document.all.pageFooterEachPage.checked = false;
	else
		document.all.pageFooterEachPage.checked = true;
	printPagesClick();
	eachPageClick();
	var printpages = pageSetupObj.getAttribute("printpages");
	if(printpages==""||printpages==null||printpages=="n")
		document.all.printpages.checked = false;
	else
		document.all.printpages.checked = true;
	var prnReportType=pageSetupObj.getAttribute("prnReportType");
	
	/*
	if(prnReportType.indexOf("mainTable_L")!=-1){
		document.all.GP.checked = false;
		document.all.GP.disabled = true;
		changeGP();
	}
	else	{ 
	*/
		setFixRowCount(pageSetupObj);
	//}
	/////if(pageSetupObj.getAttribute("blackwhite")&&(pageSetupObj.getAttribute("blackwhite") != "false"))
		//document.all.bwcolor.checked = true;
	//else
		//document.all.bwcolor.checked = false;
	direction = pageSetupObj.getAttribute("orientation");
	for (var i = 0; i < document.all.direction.length; i++) {
		if (document.all.direction[i].value == direction) {
			document.all.direction[i].checked = true;
			break;
		}
	}
	var paperType = pageSetupObj.getAttribute("psize");
	if(paperType == "Custom")	{
		document.all.width.value = pixelToMm(pageSetupObj.getAttribute("pageWidth"));
		document.all.height.value = pixelToMm(pageSetupObj.getAttribute("pageHeight"));
		document.all.custom.style.display = "block";
		setSelect(paperType);
	}
	else{
		document.all.custom.style.display = "none";
		setSelect(paperType);
	}
	whenNoDataType=pageSetupObj.getAttribute("whenNoDataType");
	for (var i = 0; i < document.all.whenNoDataType.length; i++){
		if (document.all.whenNoDataType[i].value == whenNoDataType){
			document.all.whenNoDataType[i].checked = true;
			break;
		}
	 }
	
	var printColumnsCount = !pageSetupObj.getAttribute("printColumnsCount")?"1":pageSetupObj.getAttribute("printColumnsCount");
	var printColumnsSpace = !pageSetupObj.getAttribute("printColumnsSpace")?"0":pageSetupObj.getAttribute("printColumnsSpace");
	if(printColumnsCount && printColumnsSpace && printColumnsCount != "1"){
		document.all.printColumns.checked = true;
		document.all.printColumnsDiv.style.display = "";
		document.all.printColumnsCount.value = printColumnsCount;
		document.all.printColumnsSpace.value = pixelToMm(printColumnsSpace);
	}else{
		document.all.printColumns.checked = false;
		document.all.printColumnsDiv.style.display = "none";
		document.all.printColumnsCount.value = "1";
		document.all.printColumnsSpace.value = "0";		
	}
	
}
//分组设置
function setFixRowCount(pageSetupObj)
{
	var GP = pageSetupObj.getAttribute("GP");
	fixRowCount=pageSetupObj.getAttribute("fixRowCount")==null?"0":pageSetupObj.getAttribute("fixRowCount");
	/*
	if(GP == "n"){
		document.all.GP.checked = false;
		document.all.group.style.display = "none";
		//document.all.printInNewPage.checked=false;
		//document.all.resetPageNum.checked=false;
		//document.all.headerEachPage.checked=false;
	}
	else {
	*/
		document.all.GP.checked = true;
		document.all.group.style.display = "block";
	//}
	document.all.fixRowCount.value= fixRowCount;
	var printInNewPage = pageSetupObj.getAttribute("printInNewPage");
	if(printInNewPage == "n")
		document.all.printInNewPage.checked=false;
	else
		document.all.printInNewPage.checked=true;
	var resetPageNum = pageSetupObj.getAttribute("resetPageNum");
	if(resetPageNum == "y")
		document.all.resetPageNum.checked=true;
	else
		document.all.resetPageNum.checked=false;
	var headerEachPage = pageSetupObj.getAttribute("headerEachPage");
	if(headerEachPage == "n")
		document.all.headerEachPage.checked=false;
	else
		document.all.headerEachPage.checked=true;
	fixRowCountOver();
}
//设置打印纸张的初始值
function setSelect(paperType)
{
	var listObj = document.all.paperSize;
	for(var i = 0;i<listObj.length;i++){
		if(listObj.options[i].text == paperType){
			listObj.selectedIndex = i;
			document.all.paperSizeValue.innerHTML = listObj.options[i].value;
			break;
		}
	}
}
function writePaperSize()
{
  var paperSize = "";
  paperSize += "<OPTION value=\"148×210毫米\">";
  paperSize += "A5</option>";
  paperSize += "<OPTION value=\"182×257毫米\">";
  paperSize += "B5(JIS)</option>";
  paperSize += "<OPTION value=\"211×297毫米\">";
  paperSize += "A4</option>";
  paperSize += "<OPTION value=\"257×364毫米\">";
  paperSize += "B4(JIS)</option>";
  paperSize += "<OPTION value=\"297×420毫米\">";
  paperSize += "A3</option>";
  paperSize += "<OPTION value=\"184×267毫米\">";
  paperSize += "Executive</option>";
  paperSize += "<OPTION value=\"216×356毫米\">";
  paperSize += "Letter</option>";
  paperSize += "<OPTION value=\"\">";
  paperSize += "Custom</option>";
  return paperSize;
}
function changePaperSize()
{
	var listObj = document.all.paperSize;
	document.all.paperSizeValue.innerHTML = listObj.options[listObj.selectedIndex].value;
	if(listObj.options[listObj.selectedIndex].text == "Custom")
		document.all.custom.style.display = "block";
	else
		document.all.custom.style.display = "none";
}
function clickPortrait()
{
	if(window.event.srcElement.value == direction)
		return;
	direction = window.event.srcElement.value;
	var leftMargin   = document.all.leftMargin.value;
	var rightMargin  = document.all.rightMargin.value;
	var topMargin    = document.all.topMargin.value;
	var bottomMargin = document.all.bottomMargin.value;
   	document.all.leftMargin.value  = topMargin;
    	document.all.rightMargin.value = bottomMargin;
	document.all.topMargin.value   = rightMargin;
	document.all.bottomMargin.value = leftMargin;
}
function clickLandscape()
{
	if(window.event.srcElement.value == direction)
		return;
	direction = window.event.srcElement.value;
	var leftMargin   = document.all.leftMargin.value;
	var rightMargin  = document.all.rightMargin.value;
	var topMargin    = document.all.topMargin.value;
	var bottomMargin = document.all.bottomMargin.value;
  document.all.leftMargin.value  = bottomMargin;
  document.all.rightMargin.value = topMargin;
	document.all.topMargin.value   = leftMargin;
	document.all.bottomMargin.value = rightMargin;
}
function clickwhenNoDataType()
{
	whenNoDataType=window.event.srcElement.value;
	
}
function fixRowCountOver()
{
	var var1="表格固定行数是0，代表增加组头和组尾，但不限定每页表格固定行数"; 
  var var2="表格固定行数是一个大于0的整数，代表增加组头和组尾，并且限定每页表格固定行数"; 
  var var3="未选择分组或表格固定行数是空，则不分组";
  var fixRowCountDiv=document.getElementById("groupDiv");
	if(document.all.fixRowCount.value==null||document.all.fixRowCount.value==""){
	fixRowCountDiv.title=var3;
	}
	else if(document.all.fixRowCount.value==0){
	fixRowCountDiv.title=var1;
	}
	else{
	fixRowCountDiv.title=var2;
	}
}
function changeGP()
{
	if(document.all.GP.checked == false){
		document.all.group.style.display = "none";
	}
	else{
		document.all.group.style.display = "block";
		//document.all.fixRowCount.value=fixRowCount;
		//document.all.printInNewPage.checked=false;
		//document.all.resetPageNum.checked=false;
		//document.all.headerEachPage.checked=false;
	}
	fixRowCountOver();
}
function clickOK()
{
	var listObj = document.all.paperSize;
	var pageHeight = 0;
	var pageWidth = 0;
	var paperType = listObj.options[listObj.selectedIndex].text;
	if(listObj.options[listObj.selectedIndex].text == "Custom")
	{
		pageWidth = document.all.width.value;
		pageHeight = document.all.height.value;
	}
	else
	{///148×210毫米
		var paperSize = listObj.options[listObj.selectedIndex].value;
		var widthEnd = paperSize.indexOf("×",0);
		if(widthEnd > 0)
			pageWidth = paperSize.substr(0,widthEnd);
		var heightEnd = paperSize.indexOf("毫",widthEnd);
		if(widthEnd > 0)
			pageHeight = paperSize.substring(widthEnd+1,heightEnd);
	}
	if(direction != "portrait"){///纵向不处理,处理横向
		var tmpExchange = pageWidth;
		pageWidth = pageHeight;
		pageHeight = tmpExchange;
	}
	var leftMargin = document.all.leftMargin.value;
	var rightMargin = document.all.rightMargin.value;
	var topMargin = document.all.topMargin.value;
	var bottomMargin = document.all.bottomMargin.value;
	//var bwcolor = document.all.bwcolor.checked;
	//var templatewidth = document.all.templatewidth.value;
	var GP = document.all.GP.checked;
	var fixRowCount=document.all.fixRowCount.value;
	var printInNewPage=document.all.printInNewPage.checked;
	var resetPageNum=document.all.resetPageNum.checked;
	var headerEachPage=document.all.headerEachPage.checked;
	var printpages = document.all.printpages.checked;
	var groupField = document.all.groupField.value;
	
	var pageSetupObj = window.dialogArguments;
	pageSetupObj.setAttribute("psize",paperType);
	pageSetupObj.setAttribute("pageWidth",mmToPixel(pageWidth));
	pageSetupObj.setAttribute("pageHeight",mmToPixel(pageHeight));
	pageSetupObj.setAttribute("leftMargin",mmToPixel(leftMargin));
	pageSetupObj.setAttribute("rightMargin",mmToPixel(rightMargin));
	pageSetupObj.setAttribute("topMargin",mmToPixel(topMargin));
	pageSetupObj.setAttribute("bottomMargin",mmToPixel(bottomMargin));
	//pageSetupObj.setAttribute("blackwhite",bwcolor);
	pageSetupObj.setAttribute("orientation",direction);
	pageWidth = mmToPixel(pageWidth);
	pageWidth = parseInt(pageWidth * tplOffset);
	pageSetupObj.setAttribute("pwidth",pageWidth);///为页面宽度大小，单位为pixel
	pageSetupObj.setAttribute("fixRowCount",fixRowCount);
	
	if(GP)
		pageSetupObj.setAttribute("GP","y");
	else 
		pageSetupObj.setAttribute("GP","n");
	if(!printInNewPage)
		pageSetupObj.setAttribute("printInNewPage","n");
	else 
		pageSetupObj.setAttribute("printInNewPage","y");
	if(resetPageNum)
		pageSetupObj.setAttribute("resetPageNum","y");
	else 
		pageSetupObj.setAttribute("resetPageNum","n");
	if(!headerEachPage)
		pageSetupObj.setAttribute("headerEachPage","n");
	else 
		pageSetupObj.setAttribute("headerEachPage","y");
	if(printpages)
		pageSetupObj.setAttribute("printpages","y");
	else 
		pageSetupObj.setAttribute("printpages","n");
	pageSetupObj.setAttribute("groupField",groupField);
	pageSetupObj.setAttribute("whenNoDataType",whenNoDataType);
	if(!document.all.rpHeaderEachPage.checked)
		pageSetupObj.setAttribute("rpHeaderEachPage","n");
	else
		pageSetupObj.setAttribute("rpHeaderEachPage","y");
	if(!document.all.rpFooterEachPage.checked)
		pageSetupObj.setAttribute("rpFooterEachPage","n");
	else
		pageSetupObj.setAttribute("rpFooterEachPage","y");
	if(!document.all.pageFooterEachPage.checked)
		pageSetupObj.setAttribute("pageFooterEachPage","n");
	else
		pageSetupObj.setAttribute("pageFooterEachPage","y");
	
	var printColumnsCount =  document.all.printColumnsCount.value ;
	if(!printColumnsCount || printColumnsCount < 1)
		printColumnsCount = 1;
	pageSetupObj.setAttribute("printColumnsCount",printColumnsCount);
	
	var printColumnsSpace =  document.all.printColumnsSpace.value ;
	if(!printColumnsSpace || printColumnsSpace < 1)
		printColumnsSpace = 0;
	pageSetupObj.setAttribute("printColumnsSpace",mmToPixel(printColumnsSpace));
	
	///pageSetupObj.setAttribute("templatewidth",templatewidth);///为模板宽度大小，单位为pixel
	///pageSetupObj.style.width = mmToPixel(pageWidth);
  ///alert("pageWidth -- templatewidth:"+pageWidth+" -- "+templatewidth);
  //var multiTemplatePage;
  //if(templatewidth == ""){
  	//multiTemplatePage = "N";
	//templatewidth = pageWidth;
  //}else{
  	//multiTemplatePage = "Y";
  //}
  ///alert("pageWidth -- templatewidth:"+pageWidth+" -- "+templatewidth);
  //pageSetupObj.setAttribute("multiTemplatePage",multiTemplatePage);
  //pageSetupObj.setAttribute("templatewidth",templatewidth);
  pageSetupObj.style.width = pageWidth;///为模板宽度大小，单位为pixel
  pageHeight = mmToPixel(pageHeight);
  pageHeight = Math.ceil(pageHeight * tplOffset);
  pageSetupObj.style.height = pageHeight;
  pageSetupObj.style.paddingLeft = mmToPixel(leftMargin);
  pageSetupObj.style.paddingRight = mmToPixel(rightMargin);
  pageSetupObj.style.paddingTop = mmToPixel(topMargin);
  pageSetupObj.style.paddingBottom = mmToPixel(bottomMargin);
  window.close();
}

function printPagesClick(){
	if(!document.all.printpages.checked){
		document.all.rpHeaderEachPage.disabled = false;
		document.all.rpFooterEachPage.disabled = false;
		document.all.pageFooterEachPage.disabled = false;
	}else{
		document.all.rpHeaderEachPage.disabled = true;
		document.all.rpFooterEachPage.disabled = true;
		document.all.pageFooterEachPage.disabled = true;
	}
}

function eachPageClick(){
	if(document.all.rpHeaderEachPage.checked && document.all.rpFooterEachPage.checked &&
		 document.all.pageFooterEachPage.checked){
		document.all.printpages.disabled = false;
	}else{
		document.all.printpages.disabled = true;
	}
}

function	printColumnsClick(){
	if(document.all.printColumns.checked){
		document.all.printColumnsDiv.style.display = "";
	}else{
		document.all.printColumnsDiv.style.display = "none";
	}
	document.all.printColumnsCount.value = "1";
	document.all.printColumnsSpace.value = "0";
}

function mmToPixel(mm)
{
	if(mm == "")
		return mm;
	var parsedmm = parseFloat(mm);
	if(isNaN(parsedmm))
		return mm;
	else
		mm = parsedmm;
	var convertedValue = 0;
	convertedValue = Math.round(mm*96/25.4*100)/100;
	return convertedValue;
}
function pixelToMm(pixel)
{
	if(pixel == "")
		return pixel;
	var parsedpixel = parseFloat(pixel);
	if(isNaN(parsedpixel))
		return pixel;
	else
		pixel = parsedpixel;
	var convertedValue = 0;
	convertedValue = Math.round(pixel*25.4/96*100)/100;
	return convertedValue;
}
function openHelp(){
	window.open("help/AS/AS_PRINT_JASPERTEMP.htm", "anonymous",
                      "menubar=no,status=no,toolbar=yes,"
                      + "resizable=yes,titlebar=yes,scrollbars=yes,"
                      + "height=" + (screen.availHeight - 30)*2/3 + ",width="
                      + (screen.availWidth - 460) + ",top=0,left=450")
	}
</script>
</head>
<body onLoad="windowload()" background="/style/img/main/global_bg.gif" leftMargin="0" rightMargin="0" topMargin="0">
<!--
<table width="100%" border="0" cellpadding="0" cellspacing="0" class="largest">
	<tr>
		<td align="right" width="15%" background="/style/img/main/toolbar_bg_1.gif">
			 <img src="/style/img/main/toolbar_h.gif">
		</td>
		<td align="left" valign="top" width="85%"
			background="/style/img/main/toolbar_bg_2.gif">
			<table border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td valign="top">
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
            	<td valign="top" height="23"background="/style/img/main/toolbar_bg.gif"><input type="button" name="OK" id="OKID" class="clsListCall" value="确定" onMouseOver="call_mouseOver()" onMouseOut="call_mouseOut()" onclick="clickOK()"></input>
						</tr>
					</table>
				</td>
				<td align="left">
					<img src="/style/img/main/toolbar_t.gif">
				</td>
			</tr>
			</table>
		</td>
	</tr>
</table>
-->
     <table border=0 cellpadding="0" cellspacing="0" width=100%>
     	<!--<tr>
        <td>
       		<!--<table border="0" width=100% cellpadding="0" cellspacing="0">
       			<tr>
       				<td rowspan="2"><img src="/style/img/main/headt1.jpg"></td>
       				<td rowspan="2" background="/style/img/main/headbk2.jpg" width=100%></td>
       				<td  background="/style/img/main/headtbk3.jpg"></td>
       				<td colspan="3"><img src="/style/img/main/headt4.jpg"></td>
        		</tr>
       			<tr>
       				<td><img src="/style/img/main/headb3.jpg"></td>
       				<td><img src="/style/img/main/headm41.jpg"></td>
       				<td><A href="help.htm" target="_blank\"><img src="/style/img/main/help.jpg" style="cursor:hand" border=0></A></td>
       				<td><img src="/style/img/main/headm43.jpg"></td>
       			</tr>
       			<tr>
       				<td colspan="6">
       					<table border="0" width=100% cellpadding="0" cellspacing="0" >
       						<tr>
       							<td  background="/style/img/main/editcontentmidbk.jpg" width=100%>&nbsp;</td>
       							<td><img src="/style/img/main/editcontentright.jpg"></td>
       						</tr>
       					</table>
       				</td>
       			</tr>
       		</table>
      	</td>
     	</tr>-->
     <tr>
       <td background="/style/img/main/bk.jpg" align=center valign=top height=100%>
       	<table border=0 width=100% cellpadding="0" cellspacing="0">
       		<tr>
        		<td height=1 width=100% bgcolor=#7184A9></td>
       		</tr>
      		<tr>
        	<td>
   					<table id="toolBarID" cellpadding="0" cellspacing="0" border=0>
         			<tr>
            			<td width=90%></td>
                  <td><img id="OK_leftImg" src="/style/img/func/left_behind.gif"></td>
                	<td id="OK_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
               			<input type="button" name="OK" value="确定" id="OKID" class="clsListCallEdit" onclick="clickOK()">
                	</td>
                	<td><img id="Ok_rightImg" src="/style/img/func/right_behind.gif"></td>
                	
                  <td><img  src="/style/img/func/left_behind.gif"></td>
                	<td  background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
               			<input type="button" name="OK" value="帮助"  class="clsListCallEdit" onclick="openHelp();">
                	</td>
                	<td><img  src="/style/img/func/right_behind.gif"></td>
         			</tr>
      	 		</table>
  			 	<br>
       		</td>
       		</tr>
       	</table>
    	</td>
     </tr>
  	</table>

<table style="position:absolute;left:30;"   width="480" height="300">
  <tr>  
  	<td width="227" height="120" valign="top">
  		<fieldset align="center">
  			<legend><em><font color="#0000FF" face="黑体">纸张大小</font></em></legend>
				<div title="纸张大小"  style="height:120" align="left"> 
        <select name="paperSize" onChange="changePaperSize()">
        <script language="JavaScript">document.writeln(writePaperSize());</script>
        </select>
        <div id="paperSizeValue"></div>
        <div id="custom" style="display :none">自定义纸张尺寸(毫米)<br>
          宽：
          <input name="width" type="text" size="10">
          <br>
          高：
          <input name="height" type="text" size="10">
        </div>
      	</div>
  		</fieldset> 
	  </td> 
    <td width="8"></td>
    <td width="227" height="120" valign="top">
  		<fieldset align="center">
  			<legend><em><font color="#0000FF" face="黑体">页边距（毫米）</font></em></legend> 
      <div title="页边距（毫米）"  style="height:120"> 左：
        <input name="leftMargin" type="text" size="10" value="5.30">
        <br>
        右：
        <input name="rightMargin" type="text" size="10" value="5.30">
        <br>
        上：
        <input name="topMargin" type="text" size="10" value="8.00">
        <br>
        下：
        <input name="bottomMargin" type="text" size="10" value="8.00">
        <br>
      </div></td>
  </tr>
  <tr> 
    <td width="227" height="110" valign="top">
  		<fieldset align="center">
  			<legend><em><font color="#0000FF" face="黑体">打印方向</font></em></legend>  
      <div title="打印方向"  style="height:75"> 
        <input type="radio" name="direction" value="portrait"  id="portrait" onClick='clickPortrait()' checked>
        <label for="portrait">纵向</label><br>
        <input type="radio" name="direction" value="landscape" id="landscape" onClick='clickLandscape()'>
        <label for="landscape">横向</label>
      </div>
    </td>
    <td></td>
     <td width="227" height="110" valign="top">
  		<fieldset align="center">
  			<legend><em><font color="#0000FF" face="黑体">当页面上没有数据时</font></em></legend>  
      <div title="页面上没有数据时处理方式"  style="height:75"> 
          <input type="radio" name="whenNoDataType" value="NoPages" id="NoPages" onClick='clickwhenNoDataType()' checked>
          <label for="NoPages">提示没有页面</label><br>
          <input type="radio" name="whenNoDataType" value="BlankPage" id="BlankPage" onClick='clickwhenNoDataType()' >
          <label for="BlankPage">显示空页面</label><br>
          <input type="radio" name="whenNoDataType" value="AllSectionsNoDetail" id="AllSectionsNoDetail" onClick='clickwhenNoDataType()'>
          <label for="AllSectionsNoDetail">显示除表体之外的所有部分</label>
      </div>
     </td>
  </tr>
  <tr > <!--
    <td width="227" height="110" valign="top">
  		<fieldset align="center">
  			<legend><em><font color="#0000FF" face="黑体">其他</font></em></legend>  
	 			<div title="其他" style="height:85;">  
	 			<div style="display:none">
		 		模板宽度(毫米): <input name="templatewidth" type="text" size="10">
		 		</div> 
		 			<br>
		 								
       	单色打印	 <input type="checkbox" name="bwcolor"><br>
       		  <input type="hidden" name="zoom" >
        	 <br>	
		</div>  
	</td>
    <td></td>-->
    <script language="JavaScript">
														function check(cObj){
													    if(!cObj) return;
													    if(!cObj.value) return;
													    var value = cObj.value;
													    value = value.replace(/[^0-9_]/ig, '')
															cObj.value = value;
														}
										</script>					
     <td width="480" colSpan="3" height="110" valign="top">
  		<fieldset align="center">
  			<legend><em><font color="#0000FF" face="黑体">
  			分组<input type="checkbox" name="GP" value="GP" onclick="changeGP()" >
  			</font></em></legend>  
        <div id="groupDiv" title=""  style="height:85"> 
      		<div id="group"  style="display :none"  >
        		<span onmouseover="fixRowCountOver();">
         			表格固定行数<input id="fixRowCount" type="text" size="10" onBlur="check(this);"></span>
         		<span>
         			分组字段<input title="默认值是FIXROWCOUNT" id="groupField" type="text" size="10" ></span>
         		<br>  
		 				<label for="printInNewPage">在新页打印</label><input type="checkbox" id="printInNewPage" />
		 				<label for="resetPageNum">重设页号</label><input type="checkbox" id="resetPageNum" />
		 				<label for="headerEachPage">在每页中打印组头</label><input type="checkbox" id="headerEachPage" />
		 				<br>
		 				<label for="printpages">每张纸打印多页</label><input type="checkbox" id="printpages" onclick="printPagesClick();" />
         		<br>
         		<label for="printColumns">每张纸打印多列（非表格列）</label><input type="checkbox" id="printColumns" onclick="printColumnsClick();" />
         		<span id= "printColumnsDiv">
         			列数<input id="printColumnsCount" size="2" value="1" onblur="check(this)"/>
         			列间距<input id="printColumnsSpace" size="5" value="0" onblur="check(this)"/>毫米
         		</span>
         		<hr>
         		<label for="rpHeaderEachPage">在每页中打印表头</label><input type="checkbox" id="rpHeaderEachPage" onclick="eachPageClick();" />
         		<label for="rpFooterEachPage">在每页中打印表尾</label><input type="checkbox" id="rpFooterEachPage" onclick="eachPageClick();" />
         		<label for="pageFooterEachPage">在每页中打印页脚</label><input type="checkbox" id="pageFooterEachPage" onclick="eachPageClick();" />
  	      </div>
     		</div>
      </td>
  </tr>
  <!--
	<tr>
		<td colspan="2">页眉页脚：
		<div class="clsGridContainer">
			<div>页眉：<input type="text" name="pageHeader" value="页码，&p/&P"></input></div>
			<div>页脚：<input type="text" name="pageFooter"></input></div>
		</div>
		</td>
	</tr>
	-->
</table>
</body>
</html>

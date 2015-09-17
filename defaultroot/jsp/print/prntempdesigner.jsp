<%@page contentType="text/html;charset=GBK"%>
<%
	String prnTplName = request.getParameter("prnTplName");
	String prnTplCode = request.getParameter("prnTplCode");
	String newflag = request.getParameter("newflag");
	String entityName = request.getParameter("componame");
	String prnFIXROWCOUNT = request.getParameter("FIXROWCOUNT");
	String prnreporttype = request.getParameter("reporttype");
	String componameprn = request.getParameter("componameprn");
	String cocode = request.getParameter("cocode");
	//newflag = false;//数据库中存在为false，不存在为true
%>
<html>
	<head>
		<title >文件输出模板设计器</title>
	</head>
	<LINK href="script/applus.css" rel="stylesheet" type="text/css">
	<script language="javascript" src="script/print/coolbuttons.js" > </script>
	<script language="javascript" src="script/print/dockbar.js" > </script>
	<script language="javascript" src="script/Menu.js" > </script>
	<script language="javascript" src="script/print/OldTPL2Jasper.js" > </script>
	<SCRIPT language="javascript" src="script/print/reportdesigner.js"></SCRIPT>
	<script language="javascript" src="script/print/prncompolayoutdesigner.js" > </script>
	<script language="javascript">
	var newflag = <%=newflag%>;///标记当前是否是新建还是更新；
	var entityName="<%=entityName%>";
	var prnSaveName="<%=prnTplCode%>";
	var prnSavecnName="<%=prnTplName%>";
	var prnFixRowCount="<%=prnFIXROWCOUNT%>";
	var prnReportType = "<%=prnreporttype%>";
	var componameprn = "<%=componameprn%>";
	var cocode = "<%=cocode%>";//单位代码
	var prnPrintInNewPage=true;
	var prnResetPageNum=false;
	var prnHeaderEachPage=true;
	function loadfile(){
 		templatebody.setAttribute("prnRplCode",prnSaveName);
	 	getRptFields();
	 	if (prnSavecnName!=null)
			document.title+="--"+prnSavecnName;
	 	else
			document.title+="--"+prnSaveName;
  		loadTemplateFromFile('<%=prnTplCode%>');
	}
	function refreshTemplate(){
		var fConfirmed = window.confirm("没有保存，继续刷新？");
		if(fConfirmed==true){
			window.location.href="prntempdesigner?componame="+entityName+"&prnTplName="+prnSavecnName+"&prnTplCode="+prnSaveName+"&reporttype="+prnReportType+"&FIXROWCOUNT="+prnFixRowCount;
			window.location.reload();
		}
		else return;
	}
	function getTempHelp(){
 		window.open("help/AS/AS_PRINT_JASPERTEMP.htm", "anonymous",
                      "menubar=no,status=no,toolbar=yes,"
                      + "resizable=yes,titlebar=yes,scrollbars=yes,"
                      + "height=" + (screen.availHeight - 30)*2/3 + ",width="
                      + (screen.availWidth - 460) + ",top=0,left=450");
	}
	function openPrintPreview(){
		if (!getaTempValid()){
			alert("模板定义高度小于模板高度，请将各个区域高度减小到适中高度!");
			return;
		}
		var templateBodyObj = document.getElementById("templatebody");
		var printpages = templateBodyObj.getAttribute("printpages");
		if(printpages=="y"){
			prnTplXml = getJasperXMLMorePages(prnTplCode);
		}else{
			prnTplXml = getJasperXML(prnTplCode);
		}
		var prnTplParameters = parameters;
   		var prnTplFields = fields;
		var names = new Array();
		var values = new Array();
		names[0]="tplCode";
		values[0]=prnTplCode;
		names[1]="prnTplXml";
		values[1]=prnTplXml;
		names[2]="prnTplParameters";
		values[2]=prnTplParameters;
		names[3]="prnTplFields";
		values[3]=prnTplFields;
		names[4]="prnFIXROWCOUNT";
		values[4]=prnFixRowCount;
		names[5]="fieldsDispFlag";
		values[5]="true";
		names[6] = "v51Product";
		values[6] = isV51Product(getProductCode(entityName));
		var com = getPageCommunity();
		if (com != null){
			com.doRequestPage("jrPrintPreview","all",names,values,"preview");
		}
	}
	</script>
	<script language="javascript" src="script/print/prntempdesigner.js" > </script>
	<script language="javascript" src="script/print/prntabledesigner.js" > </script>
	<script language="javascript" src="script/print/prnrztabledesigner.js" > </script>
	<script language="javascript" src="script/print/prnpreviewdesigner.js" > </script>
	<script language="javascript" src="script/print/prntestdesigner.js" > </script>
	<script language="javascript" src="script/print/prndbxmldesigner.js" > </script>
	<script language="javascript" src="script/print/prnlinedesigner.js" > </script>
	<script language="javascript" src="script/General.js" > </script>
	<script language="javascript" src="script/Community.js" > </script>
	<SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
	<body id=body onload="loadfile();" leftMargin="0" rightMargin="0" topMargin="0">
	<div id="toolbar" onselectstart="return false">
		<span id="handle" title="Drag to move the container">
		</span>
		<span class="coolButton" title="页眉[pageheader]" onclick="defTemplate('pageheader');">
			<img src="/style/img/printtpl/funcIcons/pageHeader.jpg" align="absmiddle" width=24 height=24 hspace="3" vspace="3">
		</span>
		<span class="coolButton" title="表头[rpheader]" onclick="defTemplate('rpheader');">
			<img src="/style/img/printtpl/funcIcons/columnHeader.jpg" align="absmiddle" width=24 height=24 hspace="3" vspace="3">
		</span>
		<span class="coolButton" title="表体[rpbody]" onclick="defTemplate('rpbody');">
			<img src="/style/img/printtpl/funcIcons/detail.JPG" align="absmiddle" width=24 height=24 hspace="3" vspace="3">
		</span>
		<span class="coolButton" title="表尾[rpfooter]" onclick="defTemplate('rpfooter');">
			<img src="/style/img/printtpl/funcIcons/columnFooter.jpg" align="absmiddle" width=24 height=24 hspace="3" vspace="3">
		</span>
		<span class="coolButton" title="页脚[pagefooter]" onclick="defTemplate('pagefooter');">
			<img src="/style/img/printtpl/funcIcons/pageFooter.jpg" align="absmiddle" width=24 height=24 hspace="3" vspace="3">
		</span>
	 	<span id="handle1" title="Drag to move the container">
		</span>
		<span class="coolButton" title="拖放信息pointer" onclick="openFieldsDragDrop();"><img src="/style/img/printtpl/funcIcons/pointer.jpg" id="toolBarPointer" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
	<!--  <span class="coolButton" title="参数parameter" onclick="addLable(1);"><img src="/style/img/printtpl/funcIcons/parameters.jpg" id="toolBarParam" align="absmiddle" width=24 height=24></span>-->
		<span class="coolButton" title="变量variable" onclick="openVariable();"><img src="/style/img/printtpl/funcIcons/variable.jpg" id="toolBarParam" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="参数parameter" onclick="openFields();"><img src="/style/img/printtpl/funcIcons/Field.jpg" id="toolBarField" width=24 height=24 align="absmiddle" hspace="3" vspace="3"></span>
		<span class="coolButton" title="文本text"  onclick="addLable(0);"><img src="/style/img/printtpl/funcIcons/Text.jpg" id="toolBarText" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="表格table"  onclick="insertTable();"><img src="/style/img/printtpl/funcIcons/Table.JPG" id="toolBarTable" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="线line" onclick="insertLine();"><img src="/style/img/printtpl/funcIcons/Line.jpg" id="toolBarLine" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="图形text"  onclick="setPicture();"><img src="/style/img/printtpl/funcIcons/Image.jpg" id="toolBarImage" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<!--<span class="coolButton" title="网格显示"  onclick="alert('图形');"><img src="/style/img/printtpl/funcIcons/Image.jpg" id="toolBargrid" align="absmiddle" width=24 height=24></span>-->
		<span class="coolButton" title="背景设置"  onclick="setBGPicture();"><img src="/style/img/printtpl/funcIcons/backgroup.jpg" id="toolBarbackground" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="系统重新布局" onclick="setTempLayout();"><img src="/style/img/printtpl/funcIcons/buju.jpg" id="toolBarLayout" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="水平对齐－以选择的第一个元素为基准" onclick = setFieldsLayout("Horizontal")><img src="/style/img/printtpl/funcIcons/shuiping.jpg" id="toolBarHorizon" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="垂直对齐－以选择的第一个元素为基准" onclick = setFieldsLayout("Vertical")><img src="/style/img/printtpl/funcIcons/chuizhi.jpg" id="toolBarVertical" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="等宽－以选择的第一个元素为基准" onclick = setFieldsLayout("Width")><img src="/style/img/printtpl/funcIcons/dengkuan.jpg" id="toolBarSameW" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
		<span class="coolButton" title="等高－以选择的第一个元素为基准" onclick = setFieldsLayout("Height")><img src="/style/img/printtpl/funcIcons/denggao.jpg" id="toolBarSameH" align="absmiddle" width=24 height=24 hspace="3" vspace="3"></span>
	<!--  <span class="coolButton" title="矩形rectangle" onclick="setBtnStyle();"><img src="/style/img/printtpl/funcIcons/rectTool1.jpg" id="toolBarRect" align="absmiddle" width=24 height=24></span>-->
	</div>
	<div id="contentDiv">
	
	<!--组件面板开始   新模板中隐藏不显示  先不删除 -->
	 <div id="PRN_compent" poid="body" style="DISPLAY: none;FONT-SIZE: 14px; LEFT: 50px;TOP: 160px;z-index=1;
					position:absolute;height: 20px;BACKGROUND-COLOR:#cfcfcf " >
		组件列表:
		<span>
				 x:<input type=text id=mx  size=10>
				 y:<input type=text id=my  size=10>
		</span>
		<div>
			<a href="javascript:void(0);" onclick="openFieldsDragDrop();">字段可视拖放</a> &nbsp;
			<a href="javascript:void(0);" onclick="insertTable()" >表格 </a> &nbsp;
			<a href="javascript:void(0);" onclick="addLable(0);" >标题 </a> &nbsp;
			<a href="javascript:void(0);" onclick="addLable(1);" >变量 </a> &nbsp;
			<a href="javascript:void(0);" onclick="addLable(2);" >常量 </a> &nbsp;
		</div>
	 </div>
		<!--标尺 -->
	<DIV id="PRN_ruler" poid="body" style="height:30;background-color:#717171;border-width:0px;
													z-index=1;position:absolute;top:30;left:20;
													filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50)"
				onmouseover="mouseOverRuler('PRN_ruler');">
		<DIV onmouseover="mouseOverRulerImg();"><img src="/style/img/printtpl/ruler.gif" title="水平标尺"></DIV>
	</DIV>
	<DIV id="PRN_ruler2" poid="body" style="width:30;background-color:#717171;border-width:0px;
													z-index=1;position:absolute;top:45;left:0;
													filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50)"
				onmouseover="mouseOverRuler('PRN_ruler2');">
		<img src="/style/img/printtpl/erect_ruler.gif" title="竖直标尺" onmouseover="mouseOverRulerImg();">
	</DIV>
	<DIV id="PRN_pixelruler" poid="body" style="display:none;height:30;background-color:#717171;border-width:0px;
													z-index=1;position:absolute;top:30;left:23;
													filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50)"
				onmouseover="mouseOverRuler('PRN_pixelruler');">
		<DIV onmouseover="mouseOverRulerImg();"><img src="/style/img/printtpl/pixelruler.gif" title="水平标尺"></DIV>
	</DIV>
	<DIV id="PRN_pixelruler2" poid="body" style="display:none;width:30;background-color:#717171;border-width:0px;
													z-index=1;position:absolute;top:47;left:0;
													filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50)"
				onmouseover="mouseOverRuler('PRN_pixelruler2');">
		<img src="/style/img/printtpl/pixelerect_ruler.gif" title="竖直标尺" onmouseover="mouseOverRulerImg();">
	</DIV>
	<table border=0 cellpadding="0" cellspacing="0" width=100%>
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
										<td><img id="save_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="save_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											 <input type="button" name="save" value="保存" id="saveID" class="clsListCallEdit" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="saveTemplate('<%=prnTplCode%>','<%=prnTplName%>');">
										</td>
										<td><img id="save_rightImg" src="/style/img/func/right_behind.gif"></td>
										<td><img id="saveas_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="saveas_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											 <input type="button" name="saveas" value="另存为" id="saveasID" class="clsListCallEdit" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="saveAsTemplate();">
										</td>
										<td><img id="saveas_rightImg" src="/style/img/func/right_behind.gif"></td>
	
										<td><img id="preview_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="preview_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="preview" id="previewID" class="clsListCallEdit" value="预览" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="openPrintPreview();"></input>
										</td>
										<td><img id="preview_rightImg" src="/style/img/func/right_behind.gif"></td>
	
										<td><img id="refresh_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="refresh_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="refresh" id="refreshID" class="clsListCallEdit" value="刷新" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="refreshTemplate();"></input>
										</td>
										<td><img id="refresh_rightImg" src="/style/img/func/right_behind.gif"></td>
										<td><img id="grid_leftImg" src="/style/img/func/left_behind.gif"></td>
											<td id="grid_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="grid" id="gridID" class="clsListCallEdit" value="白板" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="showgrid();"></input>
										</td>
										<td><img id="grid_rightImg" src="/style/img/func/right_behind.gif"></td>
	
										<td><img id="cursor_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="cursor_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
												<input type="button" name="cursor" id="cursorID"  class="clsListCallEdit" value="光标指示" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="cursorSet();"></input>
										</td>
										<td><img id="cursor_rightImg" src="/style/img/func/right_behind.gif"></td>
										<td><img id="parameterSet_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="parameterSet_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="parameterSet" id="parameterSetID" class="clsListCallEdit" value="基本参数" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="getPrnParam('<%=prnFIXROWCOUNT%>');"></input>
										</td>
										<td><img id="parameterSet_rightImg" src="/style/img/func/right_behind.gif"></td>
										<td><img id="ruler_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="ruler_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="ruler" id="rulerID" class="clsListCallEdit" value="隐藏标尺" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="hideRulers();"></input>
										</td>
										<td><img id="ruler_rightImg" src="/style/img/func/right_behind.gif"></td>
										<td><img id="rulerStyle_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="rulerStyle_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="rulerStyle" id="rulerStyleID" class="clsListCallEdit" value="象素标尺" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="pixelRulers();"></input>
										</td>
										<td><img id="rulerStyle_rightImg" src="/style/img/func/right_behind.gif"></td>
	<!--
											<td><img id="bgpicture_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="bgpicture_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="bgpicture" id="bgpictureID"  class="clsListCallEdit" value="背景" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="setBGPicture();"></input>
										</td>
										<td><img id="bgpicture_rightImg" src="/style/img/func/right_behind.gif"></td>
											-->
										<td><img id="help_leftImg" src="/style/img/func/left_behind.gif"></td>
										<td id="help_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
											<input type="button" name="help" id="helpID"  class="clsListCallEdit" value="帮助" onMouseOver="call_editPageMouseOver()"  onMouseOut="call_editPageMouseOut()" onclick="getTempHelp();"></input>
										</td>
										<td><img id="help_rightImg" src="/style/img/func/right_behind.gif"></td>
								 </tr>
							 </table>
						 <br>
						 </td>
						 </tr>
					 </table>
				</td>
			 </tr>
			</table>
		<div id="prnbase"
				style="width:800;height:300;BACKGROUND-COLOR:#0000ff;display:none;">
			page
			 <hr>
		</div>
	  <div id="templatebody"
				style="width:598;height:842;
							padding-left:23;
							padding-right:23;
							padding-top:19;
							padding-bottom:19;
							left:23px;
							top:53px;
							position:absolute;
							background-color: #FFFFFF;
							border-width: 1px;
							border-style: groove;
							border-color: silver;"
							zoom ="100" orientation="portrait" psize="A4" pwidth="598"
			ondrop="handleDrop()"
			ondragover="handleDragOver()"
			ondragenter="handleDragEnter()">
	    <!--打印体结尾  -->
	    <div id="pageheader"
				style="height:20;
							background-color: #FFFFFF;
	            BACKGROUND: url(img/printtpl/funcIcons/grid.jpg);
							border-width: 1px;
							border-style: dashed;
							filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);
							border-color: inactivecaption;"
							title="页眉设计区" onclick="defTemplate('pageheader');">
			<DIV style="POSITION: absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);" ></DIV>
		</div>
		<div id="rpheader"
					style="height:50;
							background-color: #FFFFFF;
	            BACKGROUND: url(img/printtpl/funcIcons/grid.jpg);
							border-width: 1px;
							border-style: dashed;
							filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);
							border-color: inactivecaption;"
							title="表头设计区"  onclick="defTemplate('rpheader');">
			<DIV style="POSITION: absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);" ></DIV>
		</div>
		<div id="rpbody"
					style="height:50;
								background-color: #FFFFFF;
	              BACKGROUND: url(img/printtpl/funcIcons/grid.jpg);
								border-width: 1px;
								border-style: dashed;
								filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);
								border-color: inactivecaption;"
					title="表体设计区"  onclick="defTemplate('rpbody');">
		</div>
		<div id="rpfooter"
					style="height:20;
							background-color: #FFFFFF;
	            BACKGROUND: url(img/printtpl/funcIcons/grid.jpg);
							border-width: 1px;
							filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);
							border-style: dashed;
							border-color: inactivecaption;"
						title="表尾设计区"  onclick="defTemplate('rpfooter');">
		</div>
		<div id="pagefooter"
					style="height:20;
							background-color: #FFFFFF;
	            BACKGROUND: url(img/printtpl/funcIcons/grid.jpg);
							border-width: 1px;
							border-style: dashed;
							filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);
							border-color: inactivecaption;"
					title="页脚设计区"  onclick="defTemplate('pagefooter');">
			<DIV style="POSITION: absolute;" ></DIV>
		</div>
	 <div style="display:none">
		<input type=text id=mx1 size=30>
		 <input type=text id=my1 size=30>
		<br>
		 <input type=text id=mx2 size=30>
		 <input type=text id=my2 size=30>
		 <br>
			<input type=text id=mx3 size=30>
			<input type=text id=my3 size=30>
		 <br>
		 <input type=text id=mx4 size=30>
		 <input type=text id=my4 size=30>
		</div>
	 </div>
	 <!--打印体结尾  -->
	
	<textarea id="txt"  style="display:none"  rows=20  cols=40 value="new line"> </textarea>
	<textarea id="txt2" style="display:none"  rows=20  cols=40 value="new line"> </textarea>
	<jsp:include page="prnmenudesigner.jsp"  flush="true" />
	<jsp:include page="prntbcolordesigner.jsp"  flush="true" />
	</div>
	</body>
</html>

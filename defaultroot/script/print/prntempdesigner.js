var MOVETAG="PRN";
var TITLE="TITLE"; //移动一个整体的上方一行DIV.id
var TITLE_COLOR="#1E90FF"; //移动行标题颜色
var MBODY_COLOR="FFE4C4";  //移动菜单体整个后背颜色
var SEL_DIV_BGCOLOR="#00FFFF";
var NEWX=200;
var NEWY=100;
var iMinLeft=215;
var iMinTop=68;
var iMaxLeft=630;
var iMaxTop=474;
var iTwoW=95;
var iThreeW=40;
var iDivWidth=130;
var iDivBT=20;
var iDivCurrent=0;
var iDivNum=0;
var iIniLeft=iMinLeft+iTwoW;
var dragMousekey=1;  //左键拖动操作
var nowDivID=null; //used to cursor div display or modify flag
var nowBodyID=null; //当前操作模板体
var minTableHeight=50; //最小table 高度，如果小于此高度则不能作表
var bcrflag=false;  //背景色修改标志
var tablePopFlag=false; //表格右键菜单打开标志
var tagdragFlag=false;

var firstTableStyle = false;
var fieldsDivArray=null;//多选项设置数组
var fieldsDispFlag=true;//显示模板字段标志
var currentX = 0;
var currentY = 0; //
var whichEl = null; //
var cursorObj;  //光标位置的对象
var cursorFlag=false; //光标闪烁标志
var popflag=false; //POP　菜单工作标志
var menuOffsetX=50;
var menuOffsetY=50;
var differSubMenu;
	document.onmousedown = grabDiv;
	document.onmousemove = moveDiv;
	document.onmouseup = dropDiv;
	document.oncontextmenu=popmenu;
	setInterval("cursorDivDisp()", 700);
	document.onclick = closeContextMenu;
	//document.ondblclick = popmenu;
	document.onkeydown = keydown;
/**
* 关闭菜单
*/
function closeTableBodyMenu(menuID){
	var menu = document.getElementById(menuID);
	var contentDiv=document.getElementById("contentDiv");
	if(menu.style.display == ""){
		var menuLeft = menu.offsetLeft;
		var menuTop = menu.offsetTop;
		//var eventClientX = event.clientX + document.body.scrollLeft;
		//var eventClientY = event.clientY + document.body.scrollTop;
		var eventClientX = window.event.clientX+contentDiv.scrollLeft-39;//39、3为差值
		var eventClientY = window.event.clientY+contentDiv.scrollTop-3;
		if((eventClientX < menuLeft) || (eventClientX > (menuLeft+menu.offsetWidth))
				|| (eventClientY < menuTop) || (eventClientY > (menuTop+menu.offsetHeight)))
			menu.style.display = "none";
	}
}
function closeContextMenu(){
	closeTableBodyMenu("tablepopup");
	closeTableBodyMenu("pageDataSet");
	closeTableBodyMenu("PRN_tablestyle");
	//closeTableBodyMenu("PRN_fieldsDragDrop");
	closeTableBodyMenu("PRN_linestyle");
	closeTableBodyMenu("PRN_picstyle");
	closeTableBodyMenu("PRN_fieldsArray");
	if(fieldsDivArray!=null&&!event.ctrlKey)//多选项情况
		closeFieldsArrayPopMenu();
	closeTableBodyMenu("PRN_fieldstyle");
	closeTableBodyMenu("PRN_templatearea");
	closeTablePop("tablemerge");
	closeTablePop("PRN_tablemodify");
	closeTablePop("PRN_tablecell");
	closeTablePop("PRN_tablecellcontent");
	var colmodify = document.getElementById("PRN_colmodify");
	if(colmodify.style.display == ""){
		closeTablePop("PRN_colmodify");
		restoreColColor();
	}
  closeOtherSubMenu("aa");
  var eobj = event.srcElement ;
  var newobj = eobj ;
  var pobj = eobj.parentElement ;
  if(eobj.tagName=="SPAN" && pobj.id!=null && pobj.id.indexOf("PRN_FIELD_")==0){
  	newobj = pobj ;
  }
  if(newobj.id.indexOf("FIELD")>0&&fieldsDivArray==null){
		 closeCursorDiv();
		 nowDivID = newobj.id;
		 openCursorDiv();
	}
}
function closeTablePop(menuID){
	closeTableBodyMenu(menuID);
	var obj = document.getElementById(menuID);
	popflag=false;
	if(cursorObj){
		if(!bcrflag) //有无背影色的修改标志
  		cursorObj.style.backgroundColor=tdoldColor;
  	bcrflag=false;
		if( (cursorObj.tagName.indexOf("T")==0) &&(tableOpenFlag==true || cellTagOpenFlag !=-1 ||(cellopenflag==true))){
			closeTableCursor();
			tableOpenFlag=false;
			cellTagOpenFlag=-1;
			cellopenflag=false;
  	}
	}
}
function cursorDivDisp()
{
	if(cursorFlag==false)
  	return;
  if( nowDivID==null ||nowDivID.indexOf("FIELD")==-1 )
	 return;
	else
	if(nowDivID.indexOf("table")!=-1){
		nowDivID=null;
			return;
	}
	var nowObj=getObj(nowDivID);
  if(nowObj==null){
  	nowDivID = null;
  	return;
  }
	if(nowObj.style.display=="none")
		nowObj.style.display="";
	else
		nowObj.style.display="none";
}
function openCursorDiv()
{
	try{
		if(nowDivID==null)
			 return;
		var nowObj=getObj(nowDivID);
		nowObj.style.borderStyle="dashed"; //"solid";
	}
	catch(e){
	}
}

function closeCursorDiv(){
	try{
		if(nowDivID==null)
			 return;
		var nowObj=getObj(nowDivID);
		nowObj.style.display="";
		nowObj.style.borderStyle="ridge";
	}
	catch(e){
		alert("prntempdesigner.js error-71:"+e);
	}
}

function getObj(id){
	 return document.getElementById(id);

}

//所有 popup 类操作
function popmenu(){
	closeOtherContextMenu();
	var eobj=event.srcElement;
	var pobj=eobj.parentElement;
	var newObj=null;
	if( (eobj.tagName=="SPAN" && pobj.tagName=="TD") ||
  	(eobj.tagName=="SPAN" && pobj.id!=null && pobj.id.indexOf("PRN_FIELD_")==0)){
      newObj=pobj;
	 }
	else
  	newObj=eobj;
	var obj=newObj;
	event.cancelBubble=true;
	if(isTemplateBody(obj)){
		cursorObj=obj;
		cursorObj.cx=event.clientX;
		cursorObj.cy=event.clientY;
		document.getElementById("tablepopup").style.display = "none";
		poptablemenu("pageDataSet");
		return false;
	}
	//对直线进行处理
	if(pobj!=null&&pobj.id.indexOf("PRN_LINE_")==0){
		lineObj=pobj;
		getLineStyle(pobj);
	}
	//多选项处理
	if(fieldsDivArray!=null&&getStylesNotOpen()){
		if(newObj!=null){
			if(setFields(newObj))
				return false;
		}
	}
	//对图形进行处理
	if(eobj!=null&&eobj.id.indexOf("PRN_PICTURE_")==0){
		nowDivID=eobj.id;
		getPicStyle(eobj);
		}
	//对字段类信息作处理
	if(obj.id.indexOf("FIELD")>0 ){
		 getFieldStyle(obj);
		 closeCursorDiv();
		 nowDivID=obj.id;
		 openCursorDiv();
	};
	//对表格类信息作处理
	if(obj.tagName=="TD"){
		if(cellopenflag){  //单元格处理
			closeTableCursor();
			cursorObj=obj;
			cellAttribute();
      return false;
		 }
		 if(cellTagOpenFlag!=-1){
				closeTableCursor();
				cursorObj=obj;
				addCellContext(cellTagOpenFlag);
				return false;
		 }
		 if(selflag && obj.selected){  //用于单元格的选中后合并或删除
				cursorObj=obj;
				poptablemenu("tablemerge");
		 }
		 else if(tableOpenFlag==false){
				cursorObj=obj;
				poptablemenu("tablepopup");
		 }
	}
	return false;
}
/**
* 弹出右键菜单之前关闭其他右键菜单
*/
function closeOtherContextMenu(){
	var pageDataSet = document.getElementById("pageDataSet");
	var table = document.getElementById("tablepopup");
	var field = document.getElementById("PRN_fieldstyle");
	var merge = document.getElementById("tablemerge");
	var tablemodify = document.getElementById("PRN_tablemodify");
	var cellmodify = document.getElementById("PRN_tablecell");
	var colmodify = document.getElementById("PRN_colmodify");
	var tableStyle = document.getElementById("PRN_tablestyle");
	var templateArea = document.getElementById("PRN_templatearea");
	var lineMenu=document.getElementById("PRN_linestyle");
	lineMenu.style.display = "none";
	var picMenu=document.getElementById("PRN_picstyle");
	picMenu.style.display = "none";
	var fieldsArrayObj=getObj("PRN_fieldsArray");
	fieldsArrayObj.style.display="none";
  templateArea.style.display = "none";
  table.style.display = "none";
	field.style.display = "none";
	if(merge.style.display == ""){
		closePopMenuById("tablemerge");
	}
  if(tablemodify.style.display==""){
		closePopMenuById("PRN_tablemodify");
  }
	if(cellmodify.style.display == ""){
		closePopMenuById("PRN_tablecell");
	}
	if(colmodify.style.display == ""){
		closePopMenuById("PRN_colmodify");
		restoreColColor();
	}
	if(tableStyle.style.display == ""){
		closePopMenuById("PRN_tablestyle");
	}
	if(pageDataSet.style.display == ""){
		closePopMenuById("pageDataSet");
	}
}
/**
* 根据菜单ID关闭弹出菜单
*/
function closePopMenuById(menuID){
	var obj = document.getElementById(menuID);
	obj.style.display = "none";
	popflag=false;
	if(cursorObj){
		if(!bcrflag) //有无背影色的修改标志
  		cursorObj.style.backgroundColor=tdoldColor;
  	bcrflag=false;
		if( (cursorObj.tagName.indexOf("T")==0) &&(tableOpenFlag==true || cellTagOpenFlag !=-1 ||(cellopenflag==true))){
			closeTableCursor();
			tableOpenFlag=false;
			cellTagOpenFlag=-1;
			cellopenflag=false;
  	}
	}
}
function pmenuover(){
	var obj=event.srcElement;
	obj.style.backgroundColor ="#00006A"
	obj.style.color="#FFFFFF";
}

/**
 * 仅用于弹出式菜单移动光标条
 * @return
 */
function pmenuout(){
	var obj=event.srcElement;
	obj.style.backgroundColor =""
	obj.style.color="";
}


/**
 * 此函数仅用于弹出式菜单打开后，点击非菜单条条，自动关闭当前菜单时用
 * @return
 */
function popclose(){
	try{
		event.cancelBubble = true;
		var obj=event.srcElement;
		var pobj=obj.parentElement;
		if(pobj.id=="body" || pobj.id == "contentDiv")
				obj.style.display="none";
		else
				pobj.style.display="none";
		 popflag=false;
		}
		catch(e){
			 alert("prntemplatedesigner.js error-128:"+e);
		}
}
/**
function popclose(){
	try{
		event.cancelBubble = true;
		var obj=event.srcElement;
		var pobj=obj.parentElement;
		if(pobj.id=="body")
				obj.style.display="none";
		else
				pobj.style.display="none";
		 popflag=false;
		}
		catch(e){
			 alert("prntemplatedesigner.js error-128:"+e);
		}
}
**/

function poptablemenu(popid){
	var popobj=document.getElementById(popid);
	popobj.style.display="";
	popflag=true; //全程变量标志，仅在POPMENU有用
	setPopMenuPos(popobj);
	if(!popobj.isPopup){
		 var sobj;
		 for(i=0;i<popobj.all.length;i++){
				sobj=popobj.all[i];
				sobj.attachEvent("onmouseout",pmenuout);
				sobj.attachEvent("onmouseover",pmenuover);
		 }
		 popobj.setAttribute("isPopup","true");
		 popobj.style.position="absolute";
		 popobj.attachEvent("onclick",popclose);
		 popobj.style.zIndex=10;
	}
	//popobj.scrollIntoView();
	return false;
}

//用于调整字段属性
function getFieldStyle(fObj){
	popflag=true; //弹出菜单打开标志
	styleObj=getObj("PRN_fieldstyle");
	styleObj.style.display="";
	setPopMenuPos(styleObj);
	styleObj.all.content.value=fObj.innerText
	var varflag=fObj.getAttribute("varflag");
	if(varflag==0){//静态文本
		styleObj.all.TITLE.innerHTML="文本属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;\" onclick=\"closePopMenu();\">";
		styleObj.all.variables.style.display = "none";
		styleObj.all.isVerticalDiv.style.display = "";
		styleObj.all.istoupperDiv.style.display = "none";
		styleObj.all.stretchOver.style.display = "none";
		styleObj.all.printValSetCodeDiv.style.display = "none";
		styleObj.all.scaleAndDelimiter.style.display = "none";
		styleObj.all.printZeroDiv.style.display = "none";
		styleObj.all.svarorfieldDiv.style.display = "none";
	}
	else if(varflag==1){//参数
		styleObj.all.TITLE.innerHTML="参数属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;\" onclick=\"closePopMenu();\">";
		styleObj.all.variables.style.display = "none";
		styleObj.all.isVerticalDiv.style.display = "";
		styleObj.all.istoupperDiv.style.display = "";
		styleObj.all.stretchOver.style.display = "";
		styleObj.all.printValSetCodeDiv.style.display = "";
		styleObj.all.scaleAndDelimiter.style.display = "";
		styleObj.all.printZeroDiv.style.display = "";
		styleObj.all.svarorfieldDiv.style.display = "";
		var varorfield = fObj.getAttribute("varorfield");
    if(varorfield == null || varorfield == "" ||varorfield == "sparameter"){
     	styleObj.all.ssparameter.checked = true;
     	styleObj.all.variables.style.display = "none";
     	styleObj.all.TITLE.innerHTML="参数属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;\" onclick=\"closePopMenu();\">";
    }else if(varorfield == "sfield"){
     	styleObj.all.ssfield.checked = true;
     	styleObj.all.variables.style.display = "none";
     	styleObj.all.TITLE.innerHTML="字段属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;\" onclick=\"closePopMenu();\">";
    }else{
     	styleObj.all.ssvariable.checked = true;
     	styleObj.all.variables.style.display = "";
     	var vartype = fObj.getAttribute("vartype");
     	styleObj.all.vartype.value = vartype==null?"java.lang.String":vartype;
     	var caltype = fObj.getAttribute("caltype");
     	styleObj.all.caltype.value = caltype;
     	var resettype = fObj.getAttribute("resettype");
     	styleObj.all.resettype.value = resettype;
     	var vexpression= fObj.getAttribute("vexpression");
     	styleObj.all.vexpression.value = vexpression;
     	styleObj.all.TITLE.innerHTML="变量属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;\" onclick=\"closePopMenu();\">";
    }
  }
	else if(varflag==2){//变量
		styleObj.all.TITLE.innerHTML="变量属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;\" onclick=\"closePopMenu();\">";
		styleObj.all.isVerticalDiv.style.display = "";
		styleObj.all.istoupperDiv.style.display = "none";
		styleObj.all.stretchOver.style.display = "";
		styleObj.all.printValSetCodeDiv.style.display = "none";
		styleObj.all.scaleAndDelimiter.style.display = "none";
		styleObj.all.printZeroDiv.style.display = "none";
		styleObj.all.svarorfieldDiv.style.display = "none";
		var vcontent = styleObj.all.content.value;
		if(vcontent!="@PAGE_NUMBER"&&vcontent!="@COLUMN_COUNT"&&vcontent!="@REPORT_COUNT"&&vcontent!="@TABLE_COUNT"&&vcontent!="^PAGENO"&&vcontent!="^PAGES"){
			styleObj.all.variables.style.display = "";
			var vartype = fObj.getAttribute("vartype");
			styleObj.all.vartype.value = vartype==null?"java.lang.String":vartype;
			var caltype = fObj.getAttribute("caltype");
			styleObj.all.caltype.value = caltype==null?"Nothing":caltype;
			var resettype = fObj.getAttribute("resettype");
			styleObj.all.resettype.value = resettype==null?"None":resettype;
			var vexpression= fObj.getAttribute("vexpression");
			styleObj.all.vexpression.value = vexpression==null?"":vexpression;
		}
		else{
			styleObj.all.variables.style.display = "none";
		}
	}
  var printValSetCode = fObj.getAttribute("printValSetCode");
  if((printValSetCode == "n") || (printValSetCode == null))
  	styleObj.all.printValSetCode.checked = false;
  else
  	styleObj.all.printValSetCode.checked = true;
  
  var stretchOverflow = fObj.getAttribute("stretchOverflow");
  if(stretchOverflow == "n")
  	styleObj.all.stretchOverflow.checked = false;
  else
  	styleObj.all.stretchOverflow.checked = true;
  getFieldAlign(fObj,styleObj);
	var delimiter=fObj.getAttribute("delimiter");
	if(delimiter==null)
		delimiter="";
	styleObj.all.delimiter.value=delimiter;
	var scale=fObj.getAttribute("scale");
	if(scale==null)
		scale="";
	styleObj.all.scale.value=scale;
	var underline=fObj.style.textDecoration;
	if(underline!=null && underline=="underline")
		styleObj.all.underline.checked=true;
	else
		styleObj.all.underline.checked=false;
	var italic=fObj.style.fontStyle;//斜体
	if(italic!=null && italic=="italic")
		styleObj.all.italic.checked=true;
	else
		styleObj.all.italic.checked=false;
	var bold=fObj.style.fontWeight;//粗体
	if(bold!=null && bold=="bold")
		styleObj.all.bold.checked=true;
	else
		styleObj.all.bold.checked=false;
	var istoupper=fObj.getAttribute("istoupper","y");//人民币大小写转化
	if(istoupper && istoupper=="y")
			 styleObj.all.istoupper.checked=true;
	else
			 styleObj.all.istoupper.checked=false;
	var isVertical=fObj.getAttribute("isVertical","y");
	if(isVertical && isVertical=="y")
			 styleObj.all.isVertical.checked=true;
	else
			 styleObj.all.isVertical.checked=false;
	var print= fObj.getAttribute("print");
	if(print==null ||print=="y"  ) //默认情况下是打印的
		print=true;
	else
		print=false;
	if(print)
		styleObj.all.printyes.checked=true;
	else
		styleObj.all.printno.checked=true;
	var printZero = fObj.getAttribute("printZero");
  if(printZero == "y")
  	styleObj.all.printZero.checked = true;
  else
  	styleObj.all.printZero.checked = false;
  var printBorder = fObj.getAttribute("printBorder");
  if(printBorder == "y")
  	styleObj.all.printBorderYes.checked = true;
  else
  	styleObj.all.printBorderNo.checked = true;
	styleObj.all.fcolor.value=fObj.style.color;
	appendSelectDivColor(styleObj.all.fcolor);
	styleObj.all.bgcolor.value=fObj.style.backgroundColor;
	appendSelectDivColor(styleObj.all.bgcolor);
	setFontSizeSelect(fObj.style.fontSize,styleObj);
	styleObj.all.fontname.value=fObj.style.fontFamily;
	var areaId = fObj.getAttribute("poid") ;
	var areaObj = document.getElementById(areaId) ;
	var left = fObj.offsetLeft - areaObj.offsetLeft ;
	left = pixelToMm(left*100)/100 ;
	styleObj.all.left.value = left ;
	var top = fObj.offsetTop - areaObj.offsetTop ;
	top = pixelToMm(top*100)/100 ;
	styleObj.all.top.value = top ;
	styleObj.all.width.value = pixelToMm(fObj.offsetWidth*100)/100 ;
	styleObj.all.height.value = pixelToMm(fObj.offsetHeight*100)/100 ;
	styleObj.all.area.value=getAreaName(fObj.getAttribute("poid"));
	var isPrintInSplitedTemplate = fObj.getAttribute("isPrintInSplitedTemplate");
	if(isPrintInSplitedTemplate == "y")
		styleObj.all.isPrintInSplitedTemplate.checked = true;
	else
		styleObj.all.isPrintInSplitedTemplate.checked = false;
}
function getFieldAlign(fObj,styleObj){
	var align=fObj.align;
  if(align == ""||align == null)
  	align = "left";
  styleObj.all.fcalign.value = align;
	//if(align=="" ||align=="left")
	//	 styleObj.all.alignleft.checked=true;
	//if(align=="right")
	//	 styleObj.all.alignright.checked=true;
	//if(align=="center")
	//	styleObj.all.aligncenter.checked=true;
	var valign=fObj.getAttribute("vAlign");
	if(valign == ""||valign == null)
		valign = "middle" ;
	styleObj.all.fcvalign.value = valign;
	//if(valign=="" ||valign==null||valign=="middle")
	//	 styleObj.all.valignmiddle.checked=true;
	//if(valign=="top")
	//	 styleObj.all.valigntop.checked=true;
	//if(valign=="bottom")
	//	styleObj.all.valignbottom.checked=true;
	}
function deleteDiv(objid){
	nowDivID=null;
	var fobj=getObj(objid);
	fobj.outerHTML="";
	var styleObj=getObj("PRN_fieldstyle");
	styleObj.style.display="none"
}

//在打开POPMENU　的情况点击"应用" 操作
function setFieldStyle(objid){
	var fObj=getObj(objid);
	styleObj=getObj("PRN_fieldstyle");
	fObj.innerText=styleObj.all.content.value;
	var varflag=fObj.getAttribute("varflag");
	if(varflag==2){//变量
		var vcontent = styleObj.all.content.value;
		if(vcontent!="@PAGE_NUMBER"&&vcontent!="@COLUMN_COUNT"&&vcontent!="@REPORT_COUNT"&&vcontent!="@TABLE_COUNT"&&vcontent!="^PAGENO"&&vcontent!="^PAGES"){
			var vartype = styleObj.all.vartype.value;
			fObj.setAttribute("vartype",vartype);
			var caltype = styleObj.all.caltype.value;
			fObj.setAttribute("caltype",caltype);
			var resettype = styleObj.all.resettype.value;
			fObj.setAttribute("resettype",resettype);
			var vexpression = styleObj.all.vexpression.value;
			fObj.setAttribute("vexpression",vexpression);
		}
	}else if(varflag == 1){
  	if( styleObj.all.ssfield.checked){
  		fObj.setAttribute("varorfield","sfield");
  	}else if(styleObj.all.ssparameter.checked){
  		fObj.setAttribute("varorfield","sparameter");	
  	}else{
  		fObj.setAttribute("varorfield","svariable");
  		var vartype = styleObj.all.vartype.value;
  		fObj.setAttribute("vartype",vartype);
  		var caltype = styleObj.all.caltype.value;
  		fObj.setAttribute("caltype",caltype);
  		var resettype = styleObj.all.resettype.value;
  		fObj.setAttribute("resettype",resettype);
  		var vexpression= styleObj.all.vexpression.value;
  		fObj.setAttribute("vexpression",vexpression);
  	}
	}
  if(styleObj.all.printValSetCode.checked)
  	 fObj.setAttribute("printValSetCode","y");
  else
  	 fObj.setAttribute("printValSetCode","n");
  if(styleObj.all.stretchOverflow.checked)
  	 fObj.setAttribute("stretchOverflow","y");
  else
  	 fObj.setAttribute("stretchOverflow","n");
  setFieldAlign(fObj,styleObj);
	if(styleObj.all.underline.checked)
		 fObj.style.textDecoration="underline"
	else
		 fObj.style.textDecorationUnderline="";
	if(styleObj.all.italic.checked)//斜体
		 fObj.style.fontStyle="italic"
	else
		 fObj.style.fontStyle="";
	if(styleObj.all.bold.checked)//粗体
		 fObj.style.fontWeight="bold"
	else
		 fObj.style.fontWeight="";
	var istoupper=styleObj.all.istoupper.checked;//人民币大小写转换
	if(istoupper==true)
  	fObj.setAttribute("istoupper","y");
	else
  	fObj.setAttribute("istoupper","n");
  var isVertical=styleObj.all.isVertical.checked;
	if(isVertical==true)
		fObj.setAttribute("isVertical","y");
  else
		fObj.setAttribute("isVertical","n");
	var  delimiter=styleObj.all.delimiter.value;
	fObj.setAttribute("delimiter",delimiter);
	var scale=styleObj.all.scale.value;
	fObj.setAttribute("scale",scale);
	fObj.style.color=styleObj.all.fcolor.value;
	if(styleObj.all.printno.checked)
		 fObj.setAttribute("print","n");
	else
		 fObj.setAttribute("print","y");
  if(styleObj.all.printBorderYes.checked)
		 fObj.setAttribute("printBorder","y");
	else
		 fObj.setAttribute("printBorder","n");
	if(styleObj.all.printZero.checked)
  	 fObj.setAttribute("printZero","y");
  else
  	 fObj.setAttribute("printZero","n");
	fObj.style.backgroundColor=styleObj.all.bgcolor.value;
	var listObj = styleObj.all.fsize;
	fObj.style.fontSize=listObj.options[listObj.selectedIndex].value;
	fObj.style.fontFamily=styleObj.all.fontname.value;
	var areaId = fObj.getAttribute("poid") ;
	var areaObj = document.getElementById(areaId) ;
	var left = mmToPixel(styleObj.all.left.value) + areaObj.offsetLeft ;
	fObj.style.left = left ;
	var top = mmToPixel(styleObj.all.top.value) + areaObj.offsetTop ;
	fObj.style.top = top ;
	fObj.style.width = mmToPixel(styleObj.all.width.value);
	fObj.style.height = mmToPixel(styleObj.all.height.value);
	var isPrintInSplitedTemplate = styleObj.all.isPrintInSplitedTemplate.checked;
	if(isPrintInSplitedTemplate)
		fObj.setAttribute("isPrintInSplitedTemplate", "y");
	else
		fObj.setAttribute("isPrintInSplitedTemplate", "n");
}
function setFieldAlign(fObj,styleObj){
	var align="left";
  align = styleObj.all.fcalign.value;
	//if(styleObj.all.alignleft.checked)
	//		align="left";
	//if(styleObj.all.alignright.checked)
	//		align="right";
	//if(styleObj.all.aligncenter.checked)
	//		align="center";
	fObj.align=align;
	var valign="top";
	valign = styleObj.all.fcvalign.value;
	//if(styleObj.all.valigntop.checked)
	//		valign="top";
	//if(styleObj.all.valignmiddle.checked)
	//		valign="middle";
	//if(styleObj.all.valignbottom.checked)
	//		valign="bottom";
	fObj.setAttribute("vAlign",valign);
	}

//创建一个行的显示行,用于占位显示
function addSpaceLine(){
	if(nowBodyID==null){
		alert("请先选择区域!");
		return;
		}
	var idnum=getDivID();
	var newID="PRN_FIELD_"+idnum;
	closeCursorDiv();
	nowDivID=newID;
	openCursorDiv();
	var nowBobj=getObj(nowBodyID)
	var pos=getBodyPos(nowBobj);
	var lyr = document.createElement("DIV");
	lyr.id=newID;
	lyr.style.position = "absolute";
	lyr.style.height ="15px";
	lyr.style.borderWidth="1px";
	lyr.style.width=nowBobj.clientWidth-2;
	lyr.style.backgroundColor ="#BAD0FF";
	lyr.style.visibility = "visible";
	lyr.style.padding= "0px 0px 0px 0px"
	lyr.style.fontSize="14px";
	lyr.setAttribute("poid",nowBodyID);
	lyr.setAttribute("varflag",4);
	nowBobj.appendChild(lyr);
}

function createDiv(sName,flag){
	var sid="PRN_FIELD_";
	var nowBobj=getObj(nowBodyID);
	var idnum=getDivID();
	var sid0;
	var checkObj
	while(true){
		sid0=sid+idnum;
		checkObj=getObj(sid0);
		if(checkObj==null)
			break;
		idnum++;
	}
	sid+=idnum;
	sName+=idnum;
	var pos=getBodyPos(nowBobj);
	var lyr = document.createElement("DIV");
	lyr.id=sid;
	lyr.style.position = "absolute";
	lyr.style.width =iDivWidth;
	lyr.style.height ="17px";
	lyr.style.borderWidth="1px";
	if(flag==0)lyr.style.backgroundColor="#FFFFEE";
	if(flag==1)lyr.style.backgroundColor="#FFFFDA";
	if(flag==2)lyr.style.backgroundColor="#FFFFFF";
	lyr.style.visibility = "visible";
	lyr.style.overflow="hidden";
	lyr.style.padding= "0px 0px 0px 0px"
	lyr.style.fontSize="12px";
	lyr.style.fontFamily="simsun";
	lyr.innerHTML=sName;
	lyr.title="静态文本";
	lyr.setAttribute("poid",nowBodyID);
	lyr.setAttribute("varflag",flag);
	var divobj=nowBobj.getElementsByTagName("div");
	lyr.style.left=nowBobj.offsetLeft+(divobj.length+1)*2;
	lyr.style.top=nowBobj.offsetTop+(divobj.length+1)*2;
	nowBobj.appendChild(lyr);
	var areaheight=parseInt(lyr.style.top)-parseInt(nowBobj.offsetTop)+parseInt(lyr.style.height);
	if (nowBobj.offsetHeight<areaheight)
		templatearea(nowBodyID,pixelToMm(areaheight+2));
	closeCursorDiv();
	nowDivID=sid;
	openCursorDiv();
}
function createDivT(sName,sTitle,flag){
	var sid="PRN_FIELD_";
	var nowBobj=getObj(nowBodyID);
	var idnum=getDivID();
	var sid0;
	var checkObj
	while(true){
		sid0=sid+idnum;
		checkObj=getObj(sid0);
		if(checkObj==null)
			break;
		idnum++;
	}
	sid+=idnum;
	var pos=getBodyPos(nowBobj);
	//alert(getPosStr(pos));
	var lyr = document.createElement("DIV");
	lyr.id=sid;
	lyr.style.position = "absolute";
	lyr.style.width =iDivWidth;
	lyr.style.height ="17px";
	lyr.style.borderWidth="1px";
	if(flag==0)lyr.style.backgroundColor="#FFFFEE";
	if(flag==1)lyr.style.backgroundColor="#FFFFDA";
	if(flag==2)lyr.style.backgroundColor="#FFFFFF";
	lyr.style.visibility = "visible";
	lyr.style.overflow="hidden";
	lyr.style.padding= "0px 0px 0px 0px"
	lyr.style.fontSize="12px";
	lyr.style.fontFamily="simsun";
	lyr.innerHTML=sName;
	lyr.title=sTitle;
	lyr.setAttribute("poid",nowBodyID);
	lyr.setAttribute("varflag",flag);
	if (sName="PAGE_NUMBER"){
		lyr.setAttribute("pageflag",sTitle);
		}
	var divobj=nowBobj.getElementsByTagName("div");
	//return divobj.length;
	//alert(divobj.length);
	lyr.style.left=nowBobj.offsetLeft+(divobj.length+1)*2;
	lyr.style.top=nowBobj.offsetTop+(divobj.length+1)*2;
	nowBobj.appendChild(lyr);
	var areaheight=parseInt(lyr.style.top)-parseInt(nowBobj.offsetTop)+parseInt(lyr.style.height);
	if (nowBobj.offsetHeight<areaheight)
		templatearea(nowBodyID,pixelToMm(areaheight+2));
	closeCursorDiv();
	nowDivID=sid;
	openCursorDiv();
}
/**
 * 加入可视化拖放的常量
 * @return
 */
function getInitDragConst(){
	 var options= dragConst.options;
	 var option=document.createElement("option");
	 option.setAttribute("value","@PAGE_NUMBER");
	 option.innerText="页码";
	 options.appendChild(option);
	 option=document.createElement("option");
	 option.setAttribute("value","@PAGE_NUMBER");
	 option.innerText="页数";
	 options.appendChild(option);
	 option=document.createElement("option");
	 option.setAttribute("value","@REPORT_COUNT");
	 option.innerText="表记录数";
	 options.appendChild(option);
	 option=document.createElement("option");
	 option.setAttribute("value","@COLUMN_COUNT");
	 option.innerText="列记录数";
	 options.appendChild(option);
	 option=document.createElement("option");
	 option.setAttribute("value","@TABLE_COUNT");
	 option.innerText="组记录数";
	 options.appendChild(option);
}
function openVariable(){
	if(nowBodyID==null){
		alert("请先选择区域!");
		return;
	}
	else{if (nowBodyID=="rpbody"){
		alert("不能选择表体设计区!");
		return;
		}
	}
	var obj=getObj("templatebody");
	var result = showModalDialog("dispatcher.action?function=prnsvariabledesigner",obj,"status:no;dialogWidth:300px;dialogHeight:330px");
	if (!result) {
	//alert(result);
	return;}
	var i=0;
	//alert(result.length);
	while (result[i]){
	var resultrow=new Array();
	resultrow=result[i];
	var sName="@"+resultrow[0];
	var sTitle=resultrow[1];
	var flag=2;
	//alert("i="+i+" sName="+sName);
	createDivT(sName,sTitle,flag);
	if(resultrow[0].indexOf("SYSTEM_") == 0){
		var divObj = getObj(nowDivID);
		divObj.setAttribute("vartype","java.lang.String");	
		divObj.setAttribute("caltype","Nothing");
		divObj.setAttribute("resettype","None");
		var vexpression;
		if(resultrow[0] == "SYSTEM_DATE")
			vexpression = "new SimpleDateFormat(\"yyyy/MM/dd\' \'HH:mm:ss\").format(new Date((new Date()).getTime()))";
		if(resultrow[0] == "SYSTEM_YEAR")
			vexpression = "new SimpleDateFormat(\"yyyy\").format(new Date((new Date()).getTime()))";
		if(resultrow[0] == "SYSTEM_MONTH")
			vexpression = "new SimpleDateFormat(\"MM\").format(new Date((new Date()).getTime()))";
		if(resultrow[0] == "SYSTEM_DAY")
			vexpression = "new SimpleDateFormat(\"dd\").format(new Date((new Date()).getTime()))";
		divObj.setAttribute("vexpression",vexpression);
	}
	i++;
	}
}

function openFields(){
	//var entityName=event.srcElement.getAttribute("AS_COMPO_NAME");
	//alert("entityName="+entityName);
	if(nowBodyID==null){
		alert("请先选择区域!");
		return;
	}
	else{if (nowBodyID=="rpbody"){
		alert("不能选择表体设计区!");
		return;
		}
	}
	var obj=getObj("templatebody");
	var result = showModalDialog("dispatcher.action?function=prnsltfielddesigner&componame="+entityName,obj,"status:no;dialogWidth:380px;dialogHeight:380px");
	if (!result) {
	//alert(result);
	return;}
	var i=0;
	//alert(result.length);
	while (result[i]){
	var resultrow=new Array();
	resultrow=result[i];
	var sName="@"+resultrow[0];
	var sTitle=resultrow[1];
	var flag=1;
	//alert("i="+i+" sName="+sName);
	createDivT(sName,sTitle,flag)
	i++;
	}
}
function openFieldsDragDrop(){
	PRN_fieldsDragDrop.style.display="";
	event.cancelBubble = true;
}

function getRptFields(){
	getInitDragConst();
	//getCompoFields();
	getCompoField();
}

function getCompoField(){
  	var names = new Array();
	var values = new Array();
	names[0]="compo_id";
	values[0]=entityName;
	//alert(entityName);
	
	var result=qryData("print-ruleData.AS_COMPO_FIELD",names,values);//返回dalta格式数据
	if (!result) {
    	result = qryData("print-ruleData.AS_COMPO_FIELD_NO_AS_TABLE",names,values);
		if(!result)
			return;
  	}
  	
	//var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	//xmldom.loadXML(sdetaildelta);
	//var result = sdetaildelta;
	//alert(result.childNodes.length);
	//if(!result){
		//sdetaildelta=qryData("print-ruleData.AS_COMPO_FIELD_NO_AS_TABLE",names,values);
		//xmldom.loadXML(sdetaildelta);
		//result = xmldom.documentElement;
		//result = qryData("print-ruleData.AS_COMPO_FIELD_NO_AS_TABLE",names,values);
		//if(!result)
		//	return;	
	//}
  	var vfields=new Array(); //fields,
  	var lbfields=new Array(); //fieldCaption
  	//if(result.getAttribute("success") == "false"){//出错处理
    //	alert("错误信息："+result.innerHTML);
  	//}
  	//else{
	if (result.childNodes.length == 0)
		return;
	for (var i=0,j=result.childNodes.length; i<j; i++){
  		var field = result.childNodes.item(i).childNodes;
		vfields[i] = field.item(0).getAttribute("value");
		//alert(vfields[i] +i );
   		lbfields[i] = field.item(1).getAttribute("value");
		//alert(lbfields[i] +i );
     	}
  	//}
  	var lboptions=dragLabel.options;
  	var fieldoptions=dragField.options;
	for(var i=0;i<vfields.length;i++){//首先处理varField
			for(var j = 0; j < fieldoptions.childNodes.length; j++){
	 	 		if(fieldoptions.childNodes[j].value == ("@" + vfields[i]))
	 	 			break;
	 	 	}
	 	 	if(j >= fieldoptions.childNodes.length){
				var option=document.createElement("option");
				option.value="@"+vfields[i];
				option.innerText=lbfields[i];
				fieldoptions.appendChild(option);
			}
	}
	var maxlength = 0;
	for(var i=0;i<lbfields.length;i++){//再处理lableField
	 	 if(lbfields[i] != "" && lbfields[i] != null){
	 	 	for(var j = 0; j < lboptions.childNodes.length; j++){
	 	 		if(lboptions.childNodes[j].value == lbfields[i])
	 	 			break;
	 	 		}
	 	 	if(j >= lboptions.childNodes.length){
			 	var option=document.createElement("option");
			 	option.value=lbfields[i];
			 	option.innerText=option.value;
			 	lboptions.appendChild(option);
			 	if(lbfields[i].length > maxlength)
			 	 	maxlength = lbfields[i].length;
	 	 	 }
	 	 }
	 }
	 //var title= prnSavecnName;
	 option=document.createElement("option");
	 option.value=prnSavecnName;
	 option.innerText=option.value;
	 lboptions.appendChild(option);
	 if(prnSavecnName.length > maxlength)
	 	maxlength = (prnSavecnName.length + maxlength  + 4 + 8) * 12 ;
	 else
	 	maxlength = (maxlength * 2 + 4 + 8) * 12 ;
	 var PRN_fieldsDragDropObj = document.getElementById("PRN_fieldsDragDrop");
	 var titleObj = PRN_fieldsDragDropObj.firstChild;
	 PRN_fieldsDragDropObj.style.width = maxlength;
	 titleObj.style.width = maxlength;
}
function fieldDisp(isDisp){
	closeDragPopMenu();
	var tdObj=templatebody.getElementsByTagName("td");
	for(var i=0;i<tdObj.length;i++){
			 var iobj=tdObj[i].innerHTML;
			 if(iobj.indexOf("@")==0){
					var sobj="<span>"+iobj+"</span>&nbsp;";
					tdObj[i].innerHTML=sobj;
			 }
	}
	for(var i=0;i<tdObj.length;i++){
			 var iobj=tdObj[i].innerText;
			 if(iobj.indexOf("@")==0 ){
					var sobj=tdObj[i].firstChild;
					if(isDisp==true){
						 sobj.style.display="";
						 tdObj[i].innerHTML=sobj.outerHTML;
					}
					else{
						sobj.style.display="none";
						tdObj[i].innerHTML=sobj.outerHTML+"&nbsp;";
					}
			 }
	}
	///// 处理一般标签 /////////////////
	var dObj=templatebody.getElementsByTagName("div");
	//老模板处理
	for(var i=0;i<dObj.length;i++){
		 var obj=dObj[i];
		 var iobj=obj.innerHTML;
		 if( obj.id!=null && obj.id.indexOf("PRN_FIELD_")==0 && iobj.indexOf("@")==0){
				var sobj="<span>"+iobj+"</span>";
				obj.innerHTML=sobj;
		 }
	}
 for(var i=0;i<dObj.length;i++){
		var obj=dObj[i];
		var iobj=dObj[i].innerText;
		if( obj.id!=null && obj.id.indexOf("PRN_FIELD_")==0 && iobj.indexOf("@")==0){
				var sobj=obj.firstChild;
				if(isDisp==true){
					 sobj.style.display="";
					 obj.innerHTML=sobj.outerHTML;
				 }
				 else{
					 sobj.style.display="none";
					 obj.innerHTML=sobj.outerHTML;
				 }
		}
 }
 fieldsDispFlag=isDisp;//是否显示模板字段
}

function attachNewEvent(obj,eventName,method){
	var oldmethod=obj.getAttribute(eventName);
	if(oldmethod==null)
		 obj.attachEvent(eventName,method);
}

function oldVarXhg(){
	var tdObj=templatebody.getElementsByTagName("td");
	//老模板td标签处理
	for(var i=0;i<tdObj.length;i++){
		var iobj=tdObj[i].innerHTML;
		if(iobj.indexOf("@")==0){
			 var sobj="<span>"+iobj+"</span>";
			 tdObj[i].innerHTML=sobj;
		}
	}
	///// 处理老模板一般标签 /////////////////
	var dObj=templatebody.getElementsByTagName("div");
	//老模板处理
	for(var i=0;i<dObj.length;i++){
		var obj=dObj[i];
		var iobj=obj.innerHTML;
		if( obj.id!=null && obj.id.indexOf("PRN_FIELD_")==0 && iobj.indexOf("@")==0){
			 var sobj="<span>"+iobj+"</span>";
			 obj.innerHTML=sobj;
		}
	}
}

function setDivMustInit()
{
	if(document.getElementById("templatebody")==null){
		alert("当前模板载入有错，不能正常工作.\n很可能是报表模板生成的打印模板,请到对应处编辑!");
		window.close();
		return;
	}
	//getRptFields();
	oldVarXhg();
	attachNewEvent(templatebody,"ondrop",handleDrop);
	attachNewEvent(templatebody,"ondragover",handleDragOver);
	attachNewEvent(templatebody,"ondragenter",handleDragEnter);
	var ondrag=templatebody.getAttribute("ondrop");
	var divs=templatebody.all;
	for( var i=0;i<divs.length;i++){
		 // alert(i+":\n"+divs[i].outerHTML);
	}
	for(var i=0;i<divs.length;i++){
		dobj=divs[i];
		dobj.style.cursor="";
		if(dobj.tagName.indexOf("T")==0)
			//dobj.style.borderStyle="";
		if(dobj.id.length>0 && dobj.id.indexOf("PRN_FIELD")>=0){
			dobj.style.borderStyle="ridge";
			var print=dobj.getAttribute("print");
			if(print=="true"){
				 dobj.setAttribute("print","y");
			}
		}
	}
	/*
	//只能采用递减方法删除，否则会不完整或出错
	for(var i=divs.length-1;i>=0;i--){
	 dobj=divs[i];
	 if(deleteNullDiv(dobj))
		 continue;
	}
	*/
}

/**
 * 删除后返回真，否则为假
 * @return
 */
function deleteNullDiv(obj){
	var result=false;
	if(obj && obj.tagName=="DIV"){
		var str=obj.innerText;
			str=str.replace(/s/g,""); //全程将所有空格清空，以便作检查
			if( (str==null || str.length==0) && obj.id.length==0){
				 obj.outerHTML="";
				 result=true;
			}
	}
	return result;
}

function moveDiv(){  // onmousemove
	if(tagdragFlag==true)
		return;
	var mkey=event.button;
	if(lineDragObject!=null&&lineDragFlag==true&&mkey==1){//line拖动处理
		lineDragMouseMove();
		return;
	}
	// dispCursorPos();
	var eobj=event.srcElement;
	var pobj=eobj.parentElement;
	var newObj=null;
	if((eobj.tagName=="SPAN" && pobj.tagName=="TD") ||
			(eobj.tagName=="SPAN" && pobj.id!=null && pobj.id.indexOf("PRN_FIELD_")==0))
		newObj=pobj;
	else
		newObj=eobj;
	if(event.shiftKey){
		var obj=newObj;
		if(obj.tagName.indexOf("T")==0) //table,tr,td 拖放操作处理
			 rzTableMove();
		return;
	}
	if (whichEl == null) { return };
	if(whichEl.id!=null && whichEl.id.indexOf("templatebody")!=-1)
		 return;
	//popup 菜单不作移动处理,在prnmenu.jsp 的弹出菜单内定义，其含意是POPMENU 不作移动。
	var popup=whichEl.getAttribute("popup");
	if(popup=="true")
		return;
	var pobj=getObj(whichEl.poid);
		if(pobj==null)
			 return;
	newX = (event.clientX + document.body.scrollLeft);
	newY = (event.clientY + document.body.scrollTop);
	var ipx=(newX - currentX);
	var ipy=(newY - currentY);
	var tx=ipy+","+whichEl.style.pixelTop+","+(whichEl.style.pixelTop+ipy);
	var ty="pl:"+pobj.offsetTop+","+newY;
	if( !(whichEl.poid=="body") ){
		var distx=whichEl.style.pixelWidth!=0?whichEl.style.pixelWidth:whichEl.clientWidth;
		var disty=whichEl.style.pixelHeight!=0?whichEl.style.pixelHeight:whichEl.clientHeight;
		if((whichEl.style.pixelLeft+ipx)<=pobj.offsetLeft
				||(whichEl.style.pixelLeft+distx+ipx)>(pobj.offsetLeft+pobj.offsetWidth)){
			 return;
		}
		if((whichEl.style.pixelTop+ipy)<=pobj.offsetTop
				||(whichEl.style.pixelTop+disty+ipy)>(pobj.offsetTop+pobj.offsetHeight)
			 ){
			return;
		}
//		if((whichEl.offsetLeft+ipx)<0 || (whichEl.offsetLeft + whichEl.offsetWidth + ipx)>pobj.offsetWidth){
//      	return;
//      }
//    if(((whichEl.offsetTop + ipy)<0) || (whichEl.offsetTop+whichEl.offsetHeight+ipy)>pobj.offsetHeight){
//      	return;
//      }
	}
	distanceX = ipx;
	distanceY = ipy;
	currentX = newX;
	currentY = newY;
	if(fieldsDivArray == null){
		whichEl.style.pixelLeft += distanceX;
		whichEl.style.pixelTop += distanceY;
	}
	else{
		for(var i = 0 ;i < fieldsDivArray.length ;i++){
			if(fieldsDivArray[i].id == whichEl.id)
			break;
		}
		if(i < fieldsDivArray.length){
		for(var i = 0 ;i < fieldsDivArray.length ;i++){
			fieldsDivArray[i].style.pixelLeft += distanceX;
		  fieldsDivArray[i].style.pixelTop += distanceY;
			}
		}
	 	else {
		whichEl.style.pixelLeft += distanceX;
		whichEl.style.pixelTop += distanceY;
		}
	}
	event.returnValue = false;
}

function dispCursorPos(){
	var obj=event.srcElement;
	mx.value=obj.offsetLeft+",s:"+obj.style.left;
	my.value=obj.offsetTop+",s:"+obj.style.top;
}

function dispPos(sx,sy){
	var objx=document.getElementById("mx");
	objx.value=sx;
	var objy=document.getElementById("my");
	objy.value=sy;
}

function isTagTD(obj){
	if(obj.tagName=="TD" )
		 return true;
	var pobj=obj.parentElement;
	if(obj.tagName=="SPAN" && pobj.tagName=="TD")
		return true;
	else
		return false;
}
// onmousedown
function grabDiv(){
	if(tagdragFlag==true)
		return;
	var eobj=event.srcElement;
	var pobj=eobj.parentElement;
	var newObj=null;
	var mkey=event.button;
	makeOnTop(eobj);
	if(eobj.tagName.indexOf("TD")==0&&mkey==1){//表格改变大小处理
		if(eobj.style.cursor=="row-resize"||eobj.style.cursor=="col-resize"
		||eobj.style.cursor=="se-resize"||eobj.style.cursor=="sw-resize"){
			rztableX=event.clientX;
			rztableY=event.clientY;
			rzObj=eobj;
			cursorSign=eobj.style.cursor;
			rzTableBefore(rzObj);
			sign=1;
			return;
		}
	}
	if(lineAtObj!=null&&lineSign==1){//直线处理
		getLineFromPos();
		return;
	}
	if(pobj!=null && pobj.id.indexOf("PRN_LINE_")==0){
		if(mkey==1){
			lineDragObject=pobj;
			lineDragMouseDown();
			return;
			}
	}
	if((eobj.tagName=="SPAN" && pobj.tagName=="TD") ||
			(eobj.tagName=="SPAN" && pobj.id!=null && pobj.id.indexOf("PRN_FIELD_")==0))
			newObj=pobj;
	else
			newObj=eobj;

	if(selflag && ! event.ctrlKey && !popflag ){ //清除选中单元格
		whichEl=newObj;
		if(whichEl.tagName=="TD" ){
			if( !whichEl.selected  || whichEl.selected=="false"){
				 clearSelCellFlag(getTableObj(cursorObj)); //在选中情况下，如果不是点中单元格，则释放全部选择
			}
		}
		else{
				clearSelCellFlag(getTableObj(cursorObj)); //在选中情况下，如果不是点中单元格，则释放全部选择
		}
		return;
	}
	if(mkey!=dragMousekey){
		whichEl = null;
		return;
	}
	whichEl=newObj;
	if(whichEl.tagName.indexOf("TD")!=-1 && event.ctrlKey){
		cursorObj=whichEl;
		selectCell();
		return;
	}
	if(!event.ctrlKey&&fieldsDivArray!=null&&pobj.className.indexOf("coolButton")==-1&&getObj("PRN_fieldsArray").style.display=="none"){
		releaseFields();//多选项处理
		return;
	}
  if(whichEl.id.indexOf("FIELD")!=-1&&event.ctrlKey){
    getFields();
    currentX = (event.clientX + document.body.scrollLeft);
		currentY = (event.clientY + document.body.scrollTop);
		return;
  }
	if (whichEl.id.indexOf(MOVETAG) == -1){
		pDiv=whichEl.parentElement;
		if(pDiv==null)
			 return;
		if (pDiv == null )
				return  //没有需要移动标签
		if(pDiv.id.indexOf(MOVETAG)!=-1 && whichEl.id.indexOf(TITLE)!=-1)
	 whichEl=pDiv;
		else{
			 ppDiv=pDiv.parentElement; //tbody
			 if(ppDiv==null)
					return;
			 pppDiv=ppDiv.parentElement; //table
			 if(pppDiv==null)
				 return;
			 if(pppDiv.id.indexOf("PRN_table_")!=-1){
					whichEl=pppDiv
			 }
			 else
					return ; //非标题行
		}
	}
	whichEl.style.pixelLeft = whichEl.offsetLeft;
	whichEl.style.pixelTop = whichEl.offsetTop;
	currentX = (event.clientX + document.body.scrollLeft);
	currentY = (event.clientY + document.body.scrollTop);
}

function isTemplateBody(obj){
	var pobj=obj.parentElement;
	if(pobj==null)
			return false;
	if(pobj.id=="templatebody" || obj.id=="templatebody")
			return true;
	else
			return false;

}

function closePopMenu(){
	 try{
			var obj=event.srcElement.parentElement.parentElement;
			if(obj==null)
				return;
	}
	catch(e){
		alert("error: popmenu 139 ");
}
	 popflag=false;
	 obj.style.display="none"
}

function setItemBack(boj)
{
	return false;
}


function addLable(flag){
	if(nowBodyID==null){
		alert("请先选择区域!");
		return;
		}
	else{if (nowBodyID=="rpbody"){
		alert("不能选择表体设计区!");
		return;
		}
	}
	var dname;
	switch(flag){
		case 0:
				dname="文本";
				break;
	 case 1:
				dname="@var";
				break;
	 case 2:
				dname="@page";
				break;
	};
	createDiv(dname,flag)
}


/**
 * 返回当前操作体内(templatebody)新增DIV 元素的个数
 * @return
 */
function getDivID(){
	var pobj=document.getElementById("templatebody");
	var divobj=pobj.getElementsByTagName("div");
		return divobj.length;
}


function dropDiv(){ // onmouseup
	var mkey=event.button
	var eobj=event.srcElement;
	if(mkey==1&&sign==1){
		rzTableMoveTo(rzObj,cursorSign);
		sign=0;
		rzObj=null;
	}
	if(lineAtObj!=null&&lineSign==1){//画线处理
		getLineToPos();
	}
	if(lineDragFlag==true){
		lineDragMouseUp();
	}
	if(overflag){
		overflag=false;
		whichEl=null;
		return;
	}
	if (whichEl){
		var aDel=false;
		var aDivID=whichEl.id;
		whichEl = null;
	}
}
function setTable(){
	var obj=getObj("PRN_tablestyle");
	var poid=obj.compoid;
	var pobj=getObj(poid); //parent object id
	var ntable=document.createElement("table");
	ntable.style.fontSize=obj.all.fsize.value;
	ntable.title="按Ctrl+鼠标左键,选中单元格\n 按shift 键可改表格大小";
	ntable.style.position="absolute";
	ntable.style.borderStyle="solid";
	ntable.style.borderColor="#111111";
	//ntable.style.borderCollapse = "collapse";
	ntable.style.tableLayout="fixed";
	ntable.style.width=(75*obj.all.cols.value>pobj.offsetWidth==true)?pobj.offsetWidth:75*obj.all.cols.value;
	ntable.style.height=(25*obj.all.rows.value>pobj.offsetHeight==true)?pobj.offsetHeight:25*obj.all.rows.value;
	ntable.border=1;
	ntable.cellPadding=0;
	ntable.cellSpacing=0;
	ntable.attachEvent("onmouseover",mouseIntoTable);
	ntable.attachEvent("onmouseout", mouseOffTable);
	ntable.attachEvent("onselectstart",selectStTable); //用于返回
	ntable.setAttribute("poid",poid);
	var cols=obj.all.cols.value;
	var trobj,tdobj;
	var oCols = new Array();
	for(i=0;i<obj.all.rows.value;i++){
		trobj=ntable.insertRow();
		for(j=0;j<cols;j++){
			 tdobj=trobj.insertCell();
			 if(i==0){
			 	var col = document.createElement("<col id='col" + j + "'>");
			 	col.width = (75*obj.all.cols.value>pobj.offsetWidth==true)?pobj.offsetWidth/obj.all.cols.value:75;
			 	oCols[oCols.length] = col;
			 }
			 tdobj.innerHTML="c"+i+"_"+j;
			 tdobj.style.borderColor="#111111";
			 //tdobj.style.borderCollapse = "collapse";
		}
	}
	var colGroup = document.createElement("colgroup");
	for(var k=0; k<oCols.length; k++){
		colGroup.appendChild(oCols[k]);
	}
	var tpobj=document.getElementById("templatebody");
	var tnum =tpobj.getElementsByTagName("table");
	ntable.id="PRN_table_"+tnum.length;
	ntable.appendChild(colGroup);
	//alert(ntable.outerHTML);
	pobj.appendChild(ntable);
	//var areaheight=parseInt(ntable.style.top)-parseInt(pobj.offsetTop)+parseInt(ntable.height);
	//if (pobj.offsetHeight<areaheight)
	//	templatearea(nowBodyID,pixelToMm(areaheight+2));
	obj.style.display="none";
	//alert(ntable.outerHTML)
	ntable.childNodes[0].childNodes[1].setAttribute("repeat","y");
	for(var i = 0; i < ntable.rows.length; i++ )
		ntable.rows[i].height= ntable.rows[i].offsetHeight;
}

/**
 * 得到当前操作菜单的合适位置
 * @return
 */
function getMenuPos(menuID){
	//var bobj=getObj(nowBodyID);
	//var pos=getBodyPos(bobj);
	var result = new objPos();
	var menu =document.getElementById(menuID);
	result.left = menu.offsetLeft;
	result.top = menu.offsetTop;
	result.width = menu.offsetWidth;
	result.height = menu.offsetHeigth;
	return result;
}

/**
 * 设置POPMENU　打开时弹出菜单的显示位置
 * @return
 */
function setPopMenuPos(menuObj){
	var rightedge = document.body.clientWidth;
	var bottomedge = document.body.clientHeight;
	var clickX = event.clientX;
	var clickY = event.clientY;
	var menuWidth = menuObj.offsetWidth;
	var menuHeight = menuObj.offsetHeight;
	var menuX, menuY;
	if(clickX >= menuWidth){
		if((clickX + menuWidth) > rightedge)
			menuX = clickX - menuWidth;
		else
			menuX = clickX;
	}else
		menuX = clickX;
	if(clickY >= menuHeight){
		if((clickY + menuHeight) > bottomedge)
			menuY = clickY - menuHeight;
		else
			menuY = clickY;
	}else
		menuY = clickY;
	//menuObj.style.pixelLeft=menuX+document.body.scrollLeft;
	//menuObj.style.pixelTop=menuY+document.body.scrollTop;
	var contentDiv=document.getElementById("contentDiv");
	menuObj.style.pixelLeft=menuX+contentDiv.scrollLeft-32;
	menuObj.style.pixelTop=menuY+contentDiv.scrollTop;
}

function setMenuPos(menuObj){
	var bobj=getObj(nowBodyID);
	var pos=getBodyPos(bobj)
	menuObj.style.pixelLeft=pos.left+menuOffsetX;
	menuObj.style.pixelTop=pos.top+menuOffsetY;
}

function clearmybody(){
	var obj=getObj("PRN_templatearea");
	obj.style.display="none";
	var bobj=getObj(obj.compoid);
	bobj.innerHTML="";
}

/**
 * 一次性自动检测并自动调所有区域内所有元素位置及区域大小
 * @return
 */
function autoAdjustAllBodyFields(){
	var bodys=new Array("pageheader","rpheader","rpbody","rpfooter","pagefooter");
for(var i=0;i<bodys.length;i++)
		 autoAdjustBodyFields(templatebody.all(bodys[i]));
}

/**
 *
 * 自动调整当前区体的所有元素位置，自动将其放置到所在区体内，如果区体位置不够，则自动扩大区体，包括高度或宽度
 * bobj 是区体对象
 * @return
 */
function autoAdjustBodyFields(bobj){
	var pos=getObjPosAtts(bobj);
	var objs=bobj.all;
	var mintop=pos.top;
	var maxRight=0;
	var maxBottom=0;
	for(var i=0;i<objs.length;i++){
		var sobj=objs[i];
		if(sobj.tagName=="DIV" || sobj.tagName=="TABLE"){
			//调整元素顶部位置
			var ofy=parseInt(sobj.offsetTop);
			if(ofy< mintop)
				sobj.style.top=mintop;
			 //测试最右边位置
			var ofw=parseInt(sobj.offsetLeft)+parseInt(sobj.offsetWidth);
			if(maxRight<ofw)
				 maxRight=ofw;
		 //测试最下边位置
		var ofh=parseInt(sobj.offsetTop)+parseInt(sobj.offsetHeight);
		if(maxBottom<ofh)
			maxBottom=ofh;
		}
	}
	//自动调整右边界
	if( (pos.left+pos.width)<maxRight)
	 bobj.style.width=maxRight-pos.left;
		 //自动调整下边界
		 if( (pos.top+pos.height)<maxBottom)
			 bobj.style.height=maxBottom-pos.top;
}

/**
 * 自动设置当前区域的最小高度，其它不变
 * @return
 */
function autoSetBodyMinHeight(bobj){
	var pos=getObjPosAtts(bobj);
	var objs=bobj.all;
	var maxBottom=0;
	for(var i=0;i<objs.length;i++){
		 var sobj=objs[i];
			 if(sobj.tagName=="DIV" || sobj.tagName=="TABLE"){
			 //测试最下边位置
				 var ofh=parseInt(sobj.offsetTop)+parseInt(sobj.offsetHeight);
				 if(maxBottom<ofh)
					 maxBottom=ofh;
			 }
	}
	//自动调整下边界
	var oldheight=pos.height;
	if(maxBottom==0)
		var newheight=0;
	else
		var newheight=maxBottom-pos.top;
	var dis=newheight-oldheight;
	move_tempbody(bobj,dis);
	if(maxBottom==0){
		if(bobj.innerHTML=="")
			bobj.innerHTML = "<div></div>";
			bobj.style.height=0;
			return;
	}
	else
		bobj.style.height=maxBottom-pos.top;
}

function setTemplateBody(){
	var obj=getObj("PRN_templatearea");
	obj.style.display="none";
	var bobj=getObj(obj.compoid);
	bobj.style.backgroundColor=obj.all.bgcolor.value;
	var oldheight=parseInt(bobj.style.height);
	var newheight=parseInt(mmToPixel(obj.all.height.value));
	var setBottom=parseInt(bobj.offsetTop)+parseInt(mmToPixel(obj.all.height.value));
	var objs=bobj.all;
	var maxBottom=0;
	for(var i=0;i<objs.length;i++){
		 var sobj=objs[i];
		 if(sobj.tagName=="DIV" || sobj.tagName=="TABLE"){
			 var offy=parseInt(sobj.offsetTop)+parseInt(sobj.offsetHeight);
			 if(maxBottom<offy)
				maxBottom=offy;
		 }
	}
	//自动调整打印体高度
	var oldh=parseInt(bobj.offsetTop)+parseInt(bobj.offsetHeight);
	var newh=parseInt(mmToPixel(obj.all.height.value));
	//alert(maxBottom+",sb:"+setBottom+",oldh:"+oldh);
	if(maxBottom>setBottom){
			newh=maxBottom-parseInt(bobj.offsetTop);
			newheight=newh;
			//alert("您设的高度值太小，系统自动为您放大为："+pixelToMm(newh));
	}
	var dis=newheight-oldheight;
	move_tempbody(bobj,dis);
	if(bobj.innerHTML=="")
		bobj.innerHTML = "<div></div>";
	if(parseInt(obj.all.height.value)==0&&maxBottom==0)
		newh = 0;
	bobj.style.height = newh;
  fobj = getObj("templatebody");
	var isheader="n"; //是否调整表头
	if(obj.all.isadjustheaderyes.checked)
		 isheader="y";
		 fobj.setAttribute("isadjustheader",isheader);
		// alert(bobj.outerHTML);
}
//移动模板内的元素
function move_tempbody(bobj,dis){

	var tbObj=bobj.parentElement;
	for(var i=0;i<tbObj.childNodes.length;i++){
		if(tbObj.childNodes[i].id=="pageheader"||tbObj.childNodes[i].id=="rpheader"||
		tbObj.childNodes[i].id=="rpbody"||tbObj.childNodes[i].id=="rpfooter"||
		tbObj.childNodes[i].id=="pagefooter")
		if(tbObj.childNodes[i].id==bobj.id)
	        break;
	        }
	if(dis<0){
		for(var j=i+1;j<tbObj.childNodes.length-1;j++){
			if(tbObj.childNodes[j].id=="pageheader"||tbObj.childNodes[j].id=="rpheader"||
			tbObj.childNodes[j].id=="rpbody"||tbObj.childNodes[j].id=="rpfooter"||
			tbObj.childNodes[j].id=="pagefooter")
			move_tempchild(tbObj.childNodes[j],dis);
		  	}
		}
	else if(dis>0){
		for(var j=tbObj.childNodes.length-1;j>i;j--){
			if(tbObj.childNodes[j].id=="pageheader"||tbObj.childNodes[j].id=="rpheader"||
			tbObj.childNodes[j].id=="rpbody"||tbObj.childNodes[j].id=="rpfooter"||
			tbObj.childNodes[j].id=="pagefooter")
			move_tempchild(tbObj.childNodes[j],dis);
		 	}
		}
}
function move_tempchild(obj,dis){
		for(var i=0;i<obj.childNodes.length;i++){
			obj.childNodes[i].style.top = parseInt(obj.childNodes[i].offsetTop) + dis;
			if(obj.childNodes[i].id.indexOf("PRN_LINE_") == 0){
				var lineToY = obj.childNodes[i].getAttribute("lineToY") ;
				lineToY = parseInt(lineToY) + dis ;
				obj.childNodes[i].setAttribute("lineToY",lineToY);
			}
		}
}

function openTemplateBody(bobj){
	var obj=getObj("PRN_templatearea");
	obj.style.display="";
	setPopMenuPos(obj);
	obj.all.height.value = pixelToMm(bobj.style.pixelHeight);
	obj.all.bgcolor.value=bobj.style.backgroundColor;
	obj.all.areaName.innerText=bobj.title;
	appendSelectDivColor(obj.all.bgcolor);
	obj.setAttribute("compoid",bobj.id); //知道当前的组件ID
	//是否调整表头处理
	fobj=getObj("templatebody");
	var isheader=fobj.getAttribute("isadjustheader");
	if(isheader==null ||isheader=="n")
		obj.all.isadjustheaderno.checked=true;
	else
	 obj.all.isadjustheaderyes.checked=true;
}

function getXColor(sColor){
	 if(sColor.indexOf("#")==-1)
			return "#FFFFFF"
	 var   sColor1="0x"+sColor.substring(1);
	 var nColor=parseInt(sColor1);
		 nColor^=0xffffff;
	return "#"+toHex(nColor);
}

function enHex(aDigit)
{
		return("0123456789ABCDEF".substring(aDigit, aDigit+1))
}

function toHex(n)
{
		return (enHex((0xf00000 & n) >> 20) +
						enHex((0x0f0000 & n) >> 16) +
						enHex((0x00f000 & n) >> 12) +
						enHex((0x000f00 & n) >>  8) +
						enHex((0x0000f0 & n) >>  4) +
						enHex((0x00000f & n) >>  0))
}

function defTemplate(areaid){

	var areas=new Array(
								"prnbase", //设置打印纸张大小，上下左右边距，横向或纵向打印，页面水印
								"pageheader",
								"rpheader",
								"rpbody",
								"rpfooter",
								"pagefooter"
								);
	var objdom,domname
	for(i=0;i<areas.length;i++){
		 objdom=document.getElementById(areas[i]);
		 objdom.style.borderStyle="dotted";
		 objdom.style.borderColor="silver";
		 objdom.style.borderWidth="1px";
	}
	objdom=document.getElementById(areaid);
	nowBodyID=areaid;
	//alert(objdom.parentElement.outerHTML);
	objdom.style.borderStyle="solid";
	objdom.style.borderWidth="2px";
	objdom.style.borderColor="#000000";
	redrawComponent(objdom);
}

function redrawComponent(selobj)
{
	var compo=getObj("PRN_compent");
	var tpobj=getObj("templatebody");
	var tpox=tpobj.offsetLeft;
	var tpoy=tpobj.offsetTop;
	var x= selobj.offsetLeft+tpox+5;
	var y= selobj.offsetTop+tpoy-40;
	compo.style.pixelLeft=x;
	compo.style.pixelTop=y;
	var scrolly=y>20?y-20:0;
	document.body.scrollTop=scrolly;
}

function objPos(){
	var left;
	var top;
	var width;
	var height;
}

function getObjPosAtts(obj){
	var pos= new objPos();
	pos.left=parseInt(obj.offsetLeft);
	pos.top=parseInt(obj.offsetTop);
	pos.width=parseInt(obj.offsetWidth);
	pos.height=parseInt(obj.offsetHeight);
	return pos;
}

function getPosStr(pos){
	var str="x="+pos.left+",y="+pos.top+",w="+pos.width+",h="+pos.height;
	return str;
}

function getBodyPos(bobj){
	var tpobj=getObj("templatebody");
	var tpox=tpobj.offsetLeft;
	var tpoy=tpobj.offsetTop;
	var pos= new objPos();
	pos.left=tpox+bobj.offsetLeft;
	pos.top= tpoy+bobj.offsetTop;
	pos.width=bobj.style.pixelWidth;
	pos.height=bobj.style.pixelHeight;
	return pos;

}

function getCompoPos(blockID)
{
	var compo=getObj("PRN_compent");
	var tpobj=getObj("templatebody");
	var tpox=tpobj.offsetLeft;
	var tpoy=tpobj.offsetTop;
	var blockObj=getObj(blockID);
	var pos= new Array();
	pos[0]= blockObj.offsetLeft+tpox+5;  //组件面板最外层边宽5
	pos[1]= blockObj.offsetTop+tpoy-40;  //将组件面板当成40 高
	return pos;
}


//得到当前点击模板体ID 号
function getNowPrnBodyObj(){
	var bobj=event.srcElement;
	var pobj=bobj;
	while(true){
		pobj=bobj.parentElement;
		if(pobj==null)
			 return null;
		if(pobj.id.indexOf("templatebody")!=-1)
			return bobj;
		bobj=pobj;
	}
}

function getPrnParam(prnFIXROWCOUNT){
	 var obj=getObj("templatebody");
	 var width=obj.style.width;
	 var height=obj.style.height;
	 var left =obj.style.paddingLeft;
	 var right=obj.style.paddingRight;
	 var top=obj.style.paddingTop;
	 var bottom=obj.style.paddingBottom;
	 var psize=obj.getAttribute("psize");
	 var zoom=obj.getAttribute("zoom");
	 var orientation=obj.getAttribute("orientation");
	 var blackwhite=obj.getAttribute("blackwhite");
	 obj.setAttribute("fixRowCount",prnFixRowCount);
	 //obj.setAttribute("printInNewPage",prnPrintInNewPage);
	 //obj.setAttribute("resetPageNum",prnResetPageNum);
	 //obj.setAttribute("headerEachPage",prnHeaderEachPage);
	 obj.setAttribute("prnReportType",prnReportType);

	 var query="width="+width;
	 query+="&height="+height;
	 query+="&left="+left;
	 query+="&right="+right;
	 query+="&top="+top;
	 query+="&bottom="+bottom;
	 query+="&psize="+psize;
	 //query+="&zoom="+zoom;
	 query+="&orientation="+orientation;
	 query+="&blackwhite="+blackwhite;
	 var prnbase = showModalDialog("dispatcher.action?function=printSetupdesigner&" +query
	,obj,"resizable:no;status:no;dialogWidth:550px;dialogHeight:470px;");
	 //pwidth 为实际页面宽
	 var pagewidth=obj.pwidth;
	 var pgleft=getpxNum(obj.style.paddingLeft);
	 var pgright=getpxNum(obj.style.paddingRight);
	 pagewidth-=pgleft;
	 pagewidth-=pgright;
	 pagewidth-=8;
	 if(pagewidth<=0){
		 return;
	 }
	 prnFixRowCount = obj.getAttribute("fixRowCount");
	 prnPrintInNewPage = obj.getAttribute("printInNewPage");
	 prnResetPageNum = obj.getAttribute("resetPageNum");
	 prnHeaderEachPage = obj.getAttribute("headerEachPage");
	 setDivWidth("pageheader",pagewidth);
	 setDivWidth("pagefooter",pagewidth);
   setDivWidth("rpbody",pagewidth);
	 setDivWidth("rpheader",pagewidth);
	 setDivWidth("rpfooter",pagewidth);
}

function getpxNum(pixNum){
	var pixNum=pixNum.substring(0,pixNum.length-2);
	return pixNum;
}

function setDivWidth(objid,width){
	obj=getObj(objid);
	obj.style.pixelWidth=width;
}

function cursorSet(){
	var  obj=event.srcElement;
	if(cursorFlag){
		cursorFlag=false;
		closeCursorDiv();
	}
	else{
		cursorFlag=true;
	}
}

function templateSaveAs(obj)
{
	if(obj.value==null ||obj.value.length==0){
		alert("文件名不能为空");
		obj.focus();
		return;
	}
	var prn_code=obj.value;
	var prn_name=obj.value;
	savePrintMasterDetailData(prn_code,prn_name);
}

function clearDiv(obj){
	obj.innerHTML="";
}

function dispHtmlouter(obj){
	showMessage(obj.outerHTML);
}

function dispHtmlinner(obj){
	showMessage(obj.innerHTML);
}

function divCopy(obj){
	var tmpObj=document.createElement("div");
	tmpObj.innerHTML=obj.innerHTML;
	var pobj=obj.parentElement;
	var poffy=parseInt(obj.offsetTop);
	if(pobj.id=="templatebody"){
		var objs=tmpObj.all;
		for(var i=0;i<objs.length;i++){
			var sobj=objs[i];
			if(sobj.tagName=="DIV" || sobj.tagName=="TABLE"){
				var offy=parseInt(sobj.style.top)-poffy;
				sobj.style.top=offy;
			}
		}
	}
	window.clipboardData.setData("Text",tmpObj.innerHTML);
 }

 function divPaste(obj){
	 var divText=window.clipboardData.getData("Text");
	 var pobj=obj.parentElement;
	 obj.innerHTML=divText;
	 if(pobj.id=="templatebody" && obj.id!="templatebody"){
		 var poffy=parseInt(obj.offsetTop);
		 var objs=obj.all;
		 var maxBottom=0;
		 for(var i=0;i<objs.length;i++){
			 var sobj=objs[i];
			 if(sobj.tagName=="DIV" || sobj.tagName=="TABLE"){
					var offy=parseInt(sobj.style.top)+poffy;
					sobj.poid=obj.id;
					sobj.style.top=offy;
					var bottom=offy+parseInt(sobj.offsetHeight);
					if(maxBottom<bottom)
							 maxBottom=bottom;
				 }
		 }
		 //自动调整打印体高度
		 var bodyHeight=parseInt(obj.offsetTop)+parseInt(obj.offsetHeight);
		 if(maxBottom>(bodyHeight-10)){
				var newHeight=maxBottom-bodyHeight+10;
				obj.style.height=parseInt(obj.offsetHeight)+newHeight;
		 }
	 }
 }

function closeDragPopMenu(){
	PRN_fieldsDragDrop.style.display="none";
	whichEl=null;
	tagdragFlag=false;
}

 function getFieldName(){
	 var obj=event.srcElement;
	 tagField.innerText=obj.value;
	 var range=document.body.createTextRange();
	 range.moveToElementText(tagField);
	 range.select();
	 whichEl=null;
	 tagdragFlag=true;
 }

 function setDragBack(){
		 whichEl=null;
		 tagdragFlag=true;
 }

 function tagDragdStart(){
	 var obj=event.srcElement;
	 whichEl=null;
	 tagdragFlag=true;
	 var oData =window.event.dataTransfer;
	 oData.setData('Text', obj.innerText);
	 oData.effectAllowed = "copylink";
 }


function releaseDrag(){
	 tagdragFlag=false;
	 grabDiv();
}

function tagDragEnd(){
	var obj=event.srcElement;
	mx.value="end:"+obj.innerText;
	event.dataTransfer.clearData();
}

function tagdrag(){
	var obj=event.srcElement;
	my.value=obj.innerText+","+event.clientX+","+event.clientY;
}

function handleDrop()
{
	var oTarg = event.srcElement;
	var tagName=oTarg.tagName;
	event.returnValue=false;
	var isTarget=false;
	if( tagName=="DIV" && oTarg.id.indexOf("PRN_FIELD_")==0)
			isTarget=true;
	if(tagName=="TD" && oTarg.parentElement.parentElement.parentElement.id.indexOf("PRN_table_")==0)
		 isTarget=true;
	if(tagName=="SPAN"){  //<td >  <span> </span></td>
		 var pobj=oTarg.parentElement;
		 if(pobj.tagName=="TD"){
			if(pobj.parentElement.parentElement.parentElement.id.indexOf("PRN_table_")==0)
					isTarget=true;
			}
			if( pobj.tagName=="DIV" && pobj.id.indexOf("PRN_FIELD_")==0)
				isTarget=true;
	 }
	 if(isTarget==false)
		 return;
	 var oData = window.event.dataTransfer;
	 oTarg.innerText = oData.getData("text");
 }

// This function sets the dropEffect when the user moves the
//  mouse over the target object.
function handleDragEnter()
{
	var oData = window.event.dataTransfer;
	handleDragOver();
	oData.dropEffect = "move";
}

function handleDragOver(){
	event.returnValue=false;
}
/**
* 弹出子菜单
*/
function showSubMenu(menuID){
	var subMenu = document.getElementById(menuID);
  closeOtherSubMenu(menuID);
  if(!subMenu)
  	return;
	subMenu.style.display = "";
	setSubMenuPosition(menuID);
}
/**
 * 打开其他子菜单之前关闭其他子菜单
 */
function closeOtherSubMenu(menuID){
  if(menuID != "rowSubMenu"){
    document.getElementById("rowSubMenu").style.display = "none";
    }
  if(menuID != "colSubMenu"){
    document.getElementById("colSubMenu").style.display = "none";
    }
  if(menuID != "tableSubMenu"){
    document.getElementById("tableSubMenu").style.display = "none";
    }
  if(menuID != "cellSubMenu"){
    document.getElementById("cellSubMenu").style.display = "none";
    }
  if(menuID != "editSubMenu"){
    document.getElementById("editSubMenu").style.display = "none";
    }
  if(menuID != "scriptSubMenu"){
    document.getElementById("scriptSubMenu").style.display = "none";
    }
  }
/**
* 设置子菜单弹出的位置
*/
function setSubMenuPosition(menuID){
	var menuObj = document.getElementById(menuID);
	var parentDivID = menuObj.getAttribute("parentDiv");
	var parentDiv = document.getElementById(parentDivID);
	var rightedge = document.body.clientWidth;
	var bottomedge = document.body.clientHeight;
	var parentLeft = parseInt(parentDiv.offsetLeft) + parseInt(parentDiv.offsetWidth);
//	var parentTop = parseInt(event.clientY) + parseInt(document.body.scrollTop) -
//										parseInt(event.offsetY) + parseInt(event.srcElement.offsetTop);
	var parentTop = parseInt(parentDiv.offsetTop) + parseInt(event.srcElement.offsetTop);
	var menuWidth = menuObj.offsetWidth;
	var menuHeight = menuObj.offsetHeight;
	var menuX, menuY;
	if(parentLeft >= menuWidth){
		if((parentLeft + menuWidth) > rightedge)
			menuX = parentLeft - menuWidth - parentDiv.offsetWidth;
		else
			menuX = parentLeft;
	}else
		menuX = parentLeft;
	if(parentTop >= menuHeight){
		if((parentTop + menuHeight) > bottomedge)
			menuY = parentTop - menuHeight + 50;
		else
			menuY = parentTop;
	}else
		menuY = parentTop;
	menuObj.style.pixelLeft=menuX;
	menuObj.style.pixelTop=menuY;
}
/**
* 隐藏子菜单
*/
function hideSubMenu(menuID){
  var func = "differHide('" + menuID + "')";
	differSubMenu = setTimeout(func,200);
}
function differHide(menuID){
  var subMenu = document.getElementById(menuID);
	subMenu.style.display = "none";
  clearTimeout(differSubMenu);
}
/**
* 响应子菜单mouseover事件
*/
function subMenuMouseOver(menuID){
  clearTimeout(differSubMenu);
	var subMenu = document.getElementById(menuID);
	subMenu.style.display = "";
	subMenu.style.cursor = "hand";
	var parentDivID = subMenu.getAttribute("parentDiv");
	var parent = document.getElementById(parentDivID);
	parent.style.display = "";
}
/**
* 响应子菜单mouseout事件
*/
function subMenuMouseOut(menuID){
	var subMenu = document.getElementById(menuID);
	subMenu.style.display = "none";
}
/**
* 关闭子菜单同时关闭父菜单
*/
function closeSubMenu(menuID){
	event.cancelBubble = true;
	var obj=event.srcElement;
	var pobj=obj.parentElement;
	if(pobj.id == "contentDiv"){
		obj.style.display="none";
	}
	else{
	  pobj.style.display="none";
		var parentDivID = pobj.getAttribute("parentDiv");
		if(parentDivID){
			document.getElementById(parentDivID).style.display = "none";
		}
	}
  popflag=false;
}
/**
function closeSubMenu(menuID){
	event.cancelBubble = true;
	var obj=event.srcElement;
	var pobj=obj.parentElement;
  pobj.style.display="none";
	var parentDivID = pobj.getAttribute("parentDiv");
	if(parentDivID){
		document.getElementById(parentDivID).style.display = "none";
	}
  popflag=false;
}
**/
/**
* 显示表格自菜单（未使用）
*/
function showTableSubMenu(menuID){
	var subMenu = document.getElementById(menuID);
	subMenu.style.display = "";
	var parentDivID = subMenu.getAttribute("parentDiv");
	var parentDivEle = document.getElementById(parentDivID);
	var posiLeft = parseInt(parentDivEle.offsetLeft) + parseInt(parentDivEle.offsetWidth);
	var posiTop = parseInt(event.clientY) + parseInt(document.body.scrollTop) - parseInt(event.offsetY) + parseInt(event.srcElement.offsetTop);
	subMenu.style.pixelLeft = parseInt(posiLeft);
	subMenu.style.pixelTop = parseInt(posiTop);
}
/**
* 隐藏表格子菜单（未使用）
*/
function hideTableSubMenu(menuID){
	var subMenu = document.getElementById(menuID);
	subMenu.style.display = "none";
}
/**
* 响应标尺mouseove事件
*/
function mouseOverRuler(rulerID){
	if(rulerID == null)
		return;
	var rulerEle = document.getElementById(rulerID);
	rulerEle.style.cursor="hand";
}
/**
* 隐藏标尺
*/
function hideRulers(){
	var rulerBtn = document.getElementById("rulerID");
	var ruler = document.getElementById("PRN_ruler");
	var ruler2 = document.getElementById("PRN_ruler2");
	var pixelruler = document.getElementById("PRN_pixelruler");
	var pixelruler2 = document.getElementById("PRN_pixelruler2");
	if(rulerBtn.getAttribute("value") == "隐藏标尺"){
		ruler.style.display = "none";
		ruler2.style.display = "none";
		pixelruler.style.display = "none";
		pixelruler2.style.display = "none";
		rulerBtn.value = "显示标尺";
	}
	else{
		ruler.style.display = "";
		ruler2.style.display = "";
		pixelruler.style.display = "none";
		pixelruler2.style.display = "none";
		rulerBtn.value = "隐藏标尺";
	}
}
/**
* 显示网格
*/
function showgrid(){
	var gridBtn = document.getElementById("gridID");
	var areas=new Array(
								"pageheader",
								"rpheader",
								"rpbody",
								"rpfooter",
								"pagefooter"
									 );
	var objdom;

	//redrawComponent(objdom);
	if(gridBtn.getAttribute("value") == "网格"){
		for(i=0;i<areas.length;i++){
		 objdom=document.getElementById(areas[i]);
		 objdom.style.background='url(/style/img/printtpl/funcIcons/grid.jpg)';
     //background: url(/style/img/printtpl/funcIcons/grid.jpg);
		}
  gridBtn.value = "白板";
	}
	else{

for(i=0;i<areas.length;i++){
		 objdom=document.getElementById(areas[i]);
		 objdom.style.background='';
		}
		gridBtn.value = "网格";
	}
}
/**
* 象素标尺和厘米标尺之间切换
*/
function pixelRulers(){
	var rulerStyleBtn = document.getElementById("rulerStyleID");
	var ruler = document.getElementById("PRN_ruler");
	var ruler2 = document.getElementById("PRN_ruler2");
	var pixelruler = document.getElementById("PRN_pixelruler");
	var pixelruler2 = document.getElementById("PRN_pixelruler2");
	if(rulerStyleBtn.getAttribute("value") == "象素标尺"){
		ruler.style.display = "none";
		ruler2.style.display = "none";
		pixelruler.style.display = "";
		pixelruler2.style.display = "";
		rulerStyleBtn.value = "厘米标尺";
	}
	else{
		ruler.style.display = "";
		ruler2.style.display = "";
		pixelruler.style.display = "none";
		pixelruler2.style.display = "none";
		rulerStyleBtn.value = "象素标尺";
	}
}
/**
* 响应标尺图标的mouseover事件
*/
function mouseOverRulerImg(){
	event.srcElement.style.cursor = "wait";
}

function call_editPageMouseOver() {
  event.srcElement.style.color="red";
  var elementId=event.srcElement.id;
  elementId=elementId.substring(0,elementId.length-2);
  document.all(elementId + "_leftImg").src= "/style/img/func/left_select.gif";
//  alert(document.all(elementId + "_midBk").background);
  document.all(elementId + "_midBk").background= "/style/img/func/mid_select.jpg";
  document.all(elementId + "_rightImg").src= "/style/img/func/right_select.gif";
//  alert(elementId);
}

function call_editPageMouseOut() {
  event.srcElement.style.color = "black";
  var elementId=event.srcElement.id;
  elementId=elementId.substring(0,elementId.length-2);
  document.all(elementId + "_leftImg").src= "/style/img/func/left_behind.gif";
  document.all(elementId + "_midBk").background="/style/img/func/mid_behind.jpg";
  document.all(elementId + "_rightImg").src= "/style/img/func/right_behind.gif";
}

function call_disabledButtonMouseOut(funcName) {
  elementId=funcName;
  document.all(elementId + "ID").style.color = "black";
  document.all(elementId + "_leftImg").src="/style/img/func/left_behind.gif";
  document.all(elementId + "_midBk").background= "/style/img/func/mid_behind.jpg";
  document.all(elementId + "_rightImg").src= "/style/img/func/right_behind.gif";
}
/**
* 设置打印模板的背景图片
*/
function setBGPicture(){
	if(nowBodyID==null){
		alert("请先选择区域!");
		return;
		}
	else{if (nowBodyID=="rpbody"){
		alert("不能选择表体设计区!");
		return;
		}
	}
	var result = showModalDialog("dispatcher.action?function=PrnSetBGPicdesigner",null,"status:no;dialogWidth:360px;dialogHeight:180px");
	var template;
	if(!result){
		//alert("信息"+result);
		return;
	}

	var fileName = result[0];
	var picWidth = result[1];
	var picHeight = result[2];
	var fileId = result[3];
	//alert("信息"+fileName);
	if(fileName=="1"){
		//alert("信息"+fileName);
		template = document.getElementById("templatebody");
		template.style.background = '';
		return;
	}
	if(!fileId){
		var date = new Date();
		fileId = "" + date;
	}
	template = document.getElementById("templatebody");
	if(picWidth){
		template.style.width = parseInt(picWidth);
	}
	if(picHeight){
		template.style.height = parseInt(picHeight);
	}
	if(fileName){
		bgPicFileId = fileId;
		var urlStr = "fileDownload.action?fileid=" + parseInt(fileId);
		template.style.backgroundImage = 'url(' + urlStr + ')';
	}else{
	template.style.background = '';
		}

}
/**
* 处理鼠标双击事件
*/
function chgContentEditable() {
	var obj=event.srcElement
 	if(obj.getAttribute("varflag")==0)
		obj.contentEditable = true;
	else popmenu();
}
/**
* 处理键盘事件
*/
function keydown(){
	if(event.keyCode==46&&nowDivID!=null&&getStylesNotOpen()){
		var fobj=getObj(nowDivID);
		fobj.outerHTML="";
		nowDivID=null;
		window.event.returnValue = false;
		window.event.cancelBubble = true;
	}
	else if((event.keyCode==86||event.keyCode==118)&&fieldsDivArray!=null){
		setFieldsLayout("Vertical");
	}
 	else if((event.keyCode==72||event.keyCode==104)&&fieldsDivArray!=null){
		setFieldsLayout("Horizontal");
	}
	else {
		var pobj=event.srcElement.parentElement;
		var styleObj=getObj("PRN_fieldstyle");
		if(fieldsDivArray!=null){
			for(var i=0;i<fieldsDivArray.length;i++)
					if(event.keyCode==37&&fieldsDivArray[i].offsetLeft>pobj.offsetLeft)
						fieldsDivArray[i].style.left = fieldsDivArray[i].offsetLeft-1;
					else if(event.keyCode==38&&fieldsDivArray[i].offsetTop>pobj.offsetTop)
						fieldsDivArray[i].style.top = fieldsDivArray[i].offsetTop-1;
			  	else if(event.keyCode==39&&(fieldsDivArray[i].offsetLeft + fieldsDivArray[i].offsetWidth)<(pobj.offsetLeft + pobj.offsetWidth))
			  		fieldsDivArray[i].style.left = fieldsDivArray[i].offsetLeft+1;
			  	else if(event.keyCode==40&&(fieldsDivArray[i].offsetTop + fieldsDivArray[i].offsetHeight)<(pobj.offsetTop + pobj.offsetHeight))
			  		fieldsDivArray[i].style.top = fieldsDivArray[i].offsetTop+1;
			window.event.returnValue = false;
			window.event.cancelBubble = true;
		}
		else if(nowDivID!=null&&getStylesNotOpen()){
			var obj=getObj(nowDivID);
				if(event.keyCode==37&&obj.offsetLeft>pobj.offsetLeft)
					obj.style.left = obj.offsetLeft-1;
				else if(event.keyCode==38&&obj.offsetTop>pobj.offsetTop)
					obj.style.top = obj.offsetTop-1;
				else if(event.keyCode==39&&(obj.offsetLeft + obj.offsetWidth)<(pobj.offsetLeft + pobj.offsetWidth))
					obj.style.left = obj.offsetLeft+1;
				else if(event.keyCode==40&&(obj.offsetTop + obj.offsetHeight)<(pobj.offsetTop + pobj.offsetHeight))
					obj.style.top = obj.offsetTop+1;
			window.event.returnValue = false;
			window.event.cancelBubble = true;
		}
		else{
			window.event.returnValue = true;
			window.event.cancelBubble = false;
		}
	}
}
function getStylesNotOpen(){
	var notOpenFlag=false;
	if(getObj("PRN_fieldstyle").style.display=="none"&&getObj("PRN_tablemodify").style.display=="none"
		&&getObj("PRN_tablecell").style.display=="none"&&getObj("PRN_tablestyle").style.display=="none"
		&&getObj("PRN_linestyle").style.display=="none"&&getObj("PRN_picstyle").style.display=="none"
		&&getObj("PRN_tablecellcontent").style.display=="none"&&getObj("PRN_templatearea").style.display=="none"
		&&getObj("PRN_colmodify").style.display=="none")
			notOpenFlag=true;
	return notOpenFlag;
}
/**
* 关于多选项处理
*/
function setFieldsLayout(flag){
	if(fieldsDivArray==null)
		return;
	for(var i=1;i<fieldsDivArray.length;i++){
			if(fieldsDivArray[i]!=null){
				if(flag == "Horizontal")
					fieldsDivArray[i].style.top = fieldsDivArray[0].offsetTop;
				if(flag == "Vertical")
					fieldsDivArray[i].style.left = fieldsDivArray[0].offsetLeft;
				if(flag == "Width")
					fieldsDivArray[i].style.width = fieldsDivArray[0].offsetWidth;
				if(flag == "Height")
					fieldsDivArray[i].style.height = fieldsDivArray[0].offsetHeight;
		}
	}
}
function setSameFont(type){
	if(fieldsDivArray==null)
		return;
	var fieldsArrayObj=getObj("PRN_fieldsArray");
	var fieldsDivArrayObj ;
	if(type == "size")
		fieldsDivArrayObj = fieldsArrayObj.all.fsize;
	else
		fieldsDivArrayObj = fieldsArrayObj.all.fontname;
	var value = fieldsDivArrayObj.options[fieldsDivArrayObj.selectedIndex].value ;
	for(var i=0;i<fieldsDivArray.length;i++)
			if(fieldsDivArray[i]!=null){
				if(type == "size")
					fieldsDivArray[i].style.fontSize = value ;
				else
					fieldsDivArray[i].style.fontFamily = value ;
		    }
}
function setSameAlign(type,align){
	if(fieldsDivArray==null)
		return;
	if(type == "content"){
		if(align==1)
			align=fieldsDivArray[0].parentElement.offsetLeft;
		else if(align==2)
			align=fieldsDivArray[0].parentElement.offsetLeft+fieldsDivArray[0].parentElement.offsetWidth/2-fieldsDivArray[0].offsetWidth/2;
		else
			align=fieldsDivArray[0].parentElement.offsetLeft+fieldsDivArray[0].parentElement.offsetWidth-fieldsDivArray[0].offsetWidth;
		for(var i=0;i<fieldsDivArray.length;i++)
			if(fieldsDivArray[i]!=null){
				fieldsDivArray[i].style.left=align;
		       	}
	}
	else{
		if(align==1)
			align="left";
		else if(align==2)
			align="center";
		else
			align="right";
		for(var i=0;i<fieldsDivArray.length;i++)
			if(fieldsDivArray[i]!=null){
				fieldsDivArray[i].align=align;
		   }
	}
}
function getFieldsArrayStyle(PRN_fieldsArray){
	popflag=true; //弹出菜单打开标志
	var fieldsArrayObj=getObj("PRN_fieldsArray");
	fieldsArrayObj.style.display="";
	setPopMenuPos(fieldsArrayObj);
}
function closeFieldsArrayPopMenu(){
	var fieldsArrayObj=getObj("PRN_fieldsArray");
	fieldsArrayObj.style.display="none";
	if(fieldsDivArray==null)
		return;
	for(var i=1; i<fieldsDivArray.length; i++)
			if(fieldsDivArray[i]!=null)
				fieldsDivArray[i].style.borderStyle="ridge";
	nowDivID=fieldsDivArray[0].id;
	openCursorDiv();
	fieldsDivArray=null;
}
function deleteFieldsArray(){
	var fieldsArrayObj=getObj("PRN_fieldsArray");
	fieldsArrayObj.style.display="none";
	if(fieldsDivArray==null)
		return;
	for(var i=0;i<fieldsDivArray.length;i++)
			if(fieldsDivArray[i]!=null){
				fieldsDivArray[i].outerHTML="";
		      		}
			else break;
	fieldsDivArray=null;
	nowDivID=null;
}
//预览
function prnTplPreview(prnTplCode){
	if (!getaTempValid()){
		alert("模板定义高度小于模板高度，请将各个区域高度减小到适中高度!");
		return;
	}
	isOld=false;
	var prnTplXml;
	var templateBodyObj = document.getElementById("templatebody");
	var printpages = templateBodyObj.getAttribute("printpages");
	if(printpages=="y")
			prnTplXml = getJasperXMLMorePages(prnTplCode);
	else
			prnTplXml = getJasperXML(prnTplCode);
	var prnTplParameters=parameters;
	var prnTplFields=fields;
	
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
	values[5]=fieldsDispFlag;
	
	var com = getPageCommunity();
	if (com != null){
		//var params = 
		
		com.doRequestPage("JRfprintpreview","all",names,values,"PrintPreview");
	}
}
//模板重新布局
function setTempLayout(){
	var pageHeaderObj=getObj("pageheader");
	pageHeaderObj.innerHTML="";
	var rpHeaderObj=getObj("rpheader");
	rpHeaderObj.innerHTML="";
	var rpBodyObj=getObj("rpbody");
	rpBodyObj.innerHTML="";
	var rpFooterObj=getObj("rpfooter");
	rpFooterObj.innerHTML="";
	var pageFooterObj=getObj("pagefooter");
	pageFooterObj.innerHTML="";
	nowDivID=null;
	compoAutoTempLayout(prnSaveName,entityName,prnSavecnName, prnReportType);//自动布局
}
/*
 *获得多个Fields进行多选项设置
 */
function getFields(){
	if(fieldsDivArray==null){
       if(nowBodyID==null) return ;
       fieldsDivArray=new Array() ;
       if(nowDivID!=null){
       	 var obj = getObj(nowDivID) ;
       	 var poid = obj.getAttribute("poid") ;
       	 var pobj = getObj(poid) ;
       	 var elpoid = whichEl.getAttribute("poid") ;
       	 var elpobj = getObj(elpoid) ;
       	 if( pobj.id == elpobj.id ){
       	 		fieldsDivArray[0] = getObj(nowDivID) ;
       	 		fieldsDivArray[1]=whichEl ;
       	 	}
       	 	else{
       	 		closeCursorDiv();
       	 		fieldsDivArray[0]=whichEl ;
       	 	}
       }
       else{
         fieldsDivArray[0]=whichEl;
       }
       whichEl.style.borderStyle="dashed";
       nowDivID=null;
  }
  else{
			for(var i=0; i<fieldsDivArray.length; i++){
				if(fieldsDivArray[i].id==whichEl.id){
					break;
					}
			}
			if(i >= fieldsDivArray.length ){
			fieldsDivArray[i]=whichEl;
			whichEl.style.borderStyle="dashed";
			}
		}
}
/*
 *释放选择的多个Fields
 */
function releaseFields(){
		for(var i=0;i<fieldsDivArray.length;i++)
			if(fieldsDivArray[i]!=null)
				fieldsDivArray[i].style.borderStyle="ridge";
		nowDivID = fieldsDivArray[0].id;
		fieldsDivArray = null;
		openCursorDiv();
}
/*
 *多选项右键设置
 */
function setFields(eobj){
		var flag = false;
		for(var i=0; i<fieldsDivArray.length; i++){
				if(fieldsDivArray[i].id==eobj.id)
					break;
		}
		if(i < fieldsDivArray.length) {
				getFieldsArrayStyle(PRN_fieldsArray);
				flag = true ;
		}
	  else {
				for(var i=0; i<fieldsDivArray.length; i++)
					if(fieldsDivArray[i]!=null)
						fieldsDivArray[i].style.borderStyle="ridge";
				fieldsDivArray=null;
		}
		return flag ;
}
/*
 *模板定义的高度与模板的高度比较，大于等于则返回为true，否则返回false
 */
function getaTempValid(){
	 var TempValid = false;
	 var obj=getObj("templatebody");
	 var tempheight=obj.style.height;
	 var temptop=obj.style.paddingTop;
	 var tempbottom=obj.style.paddingBottom;
	 var objph=getObj("pageheader");
	 var objrh=getObj("rpheader");
	 var objrb=getObj("rpbody");
	 var objrf=getObj("rpfooter");
	 var objpf=getObj("pagefooter");
	if ((parseInt(tempheight)-parseInt(temptop)-parseInt(tempbottom)-parseInt(objph.style.height)-parseInt(objrh.style.height)-parseInt(objrb.style.height)-parseInt(objrf.style.height)-parseInt(objpf.style.height))>=0){
			TempValid=true;
		}else{
			TempValid=false;
		}
	return TempValid ;
}

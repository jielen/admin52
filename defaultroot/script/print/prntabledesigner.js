/* $Id: prntabledesigner.js,v 1.3 2008/03/19 02:16:43 liuxiaoyong Exp $*/
var tdselColor="#8BB9C5"; //"#0000FF";
var tdoldColor;
var selflag=false;
var cellopenflag=false; //单元格右键菜单打开标志
var tableOpenFlag=false; //table,tr attribute menu flag
var cellTagOpenFlag=-1; //单元格变量、标题、常量打开标志
function isTableCell( obj){
	var tagName=obj.tagName;
	if(tagName!=null && tagName.indexOf("TD")!=-1)
		return true;
	else
		return false;
}

function getTableObj(tdObj){
	return tdObj.parentElement.parentElement.parentElement;
}

/*
ip=0 左边一列
 ,1  右边一列
 ,-1 最后一列
*/

function insertTableCol(ip)
{
	var tdobj=cursorObj;
	var tbobj=tdobj.parentElement.parentElement.parentElement;
	if(ip==-1){// 处理最后一列
		var row0=tbobj.rows[0];
		var lastCell=row0.cells[row0.cells.length-1]
		var cells=getRightSameCols(lastCell);
		if(cells.length==0){
			 setTableCursor(tdobj);
			 alert("尾部边界不对齐，不可以作插入操作");
			 restoreTableCursor(tdobj);
			 return;
		}
		insertTBGroupCol(tbobj,cursorObj,ip);
		for(var i=0;i<cells.length;i++){
			 var index=cells[i];
			 var cell=tbobj.rows[index[0]].insertCell(-1);
			 cell.rowSpan=index[2];
			 cell.innerText=index[0]+"_"+index[1];
			 cell.width=50;
			 cell.style.borderColor="#111111";
			 //cell.colSpan=index[3];
		}
		//tbobj.width=tbobj.offsetWidth+50;
	 return;
	}
	if(ip==0){ //处理左边列
		var cells=getLeftSameCols(tdobj);
		if(cells.length==0){
			 setTableCursor(tdobj);
			 alert("单元格左边不对齐，不可以作插入操作");
			 restoreTableCursor(tdobj);
			 return;
		 }
		 insertTBGroupCol(tbobj,cursorObj,ip)
		 for(var i=0;i<cells.length;i++){
				var index=cells[i];
				var cell=tbobj.rows[index[0]].insertCell(index[1]);
				cell.rowSpan=index[2];
				cell.innerText=index[0]+"_"+index[1];
				cell.width=50;
				cell.style.borderColor="#111111";
		 }
		 //tbobj.width=tbobj.offsetWidth+50;
		return;
	}
	if(ip==1){ //处理右边列
		var cells=getRightSameCols(tdobj);
		if(cells.length==0){
			 setTableCursor(tdobj);
			 alert("单元格右边不对齐，不可以作插入操作");
			 restoreTableCursor(tdobj);
			 return;
		}
		insertTBGroupCol(tbobj,cursorObj,ip);
		for(var i=0;i<cells.length;i++){
			 var index=cells[i];
			 //alert(index);
			 var cell=tbobj.rows[index[0]].insertCell(index[1]+1);
			 cell.rowSpan=index[2];
			 cell.innerText=index[0]+"_"+index[1];
			 cell.width=50;
			 cell.style.borderColor="#111111";
			 //cell.colSpan=index[3];
		}
		//tbobj.width=tbobj.offsetWidth+50;
		return;
	}
}

/*
ip=0 前一列
 ,1  后一列
 ,-1 最后一列
*/
function insertTableCell(ip)
{
	var tdobj=cursorObj;
	var trobj=tdobj.parentElement;
	var colIndex=ip==-1?-1:tdobj.cellIndex+ip;
	tdobj=trobj.insertCell(colIndex);
	tdobj.innerHTML="c:"+tdobj.cellIndex+","+"r:"+colIndex;
	tdobj.style.borderColor="#111111";
}

/*
ip=0 前一行
 ,1  下一行
 ,-1 最后一行
*/
function insertTableRow(ip)
{
	var tdobj=cursorObj;
	var trobj=tdobj.parentElement;
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var cellNum=trobj.cells.length;
	var colGroup = 	tbobj.lastChild;
	var childLength = colGroup.childNodes.length;
	cellNum = childLength ;
	var rowIndex ;
	if(ip==0){
		rowIndex = trobj.rowIndex ;
		while(tbobj.rows[rowIndex].cells.length < childLength )
			rowIndex -= 1 ;
	}
	else if(ip==1){
		rowIndex = trobj.rowIndex + tdobj.rowSpan - 1 + ip ;
		if( rowIndex < tbobj.rows.length){
			while(tbobj.rows[rowIndex].cells.length < childLength ){
				rowIndex += 1 ;
				if( rowIndex >= tbobj.rows.length){
					rowIndex = -1 ;
					break ;
					}
				}
		}
		else{
			rowIndex = -1 ;
		}
	}
	else{
		rowIndex = ip ;
	}
	var tbobj=getTableObj(tdobj);
	var colIndex=tdobj.cellIndex;
	trobj=tbobj.insertRow(rowIndex);
	for(i=0;i<cellNum;i++){
			tdobj=trobj.insertCell();
			tdobj.innerHTML="c:"+i+",r:"+rowIndex;
			tdobj.style.borderColor="#111111";
	}
	trobj.height=25;
	tbobj.height=tbobj.offsetHeight+25;
	// alert("col:"+colIndex+",row:"+rowIndex);
}

function delCell(){
	 var tdobj=cursorObj;
	 var trobj=tdobj.parentElement;
	 trobj.deleteCell(tdobj.cellIndex);
}

function delCellText(){
	cursorObj.innerHTML="&nbsp;";
}

function delRow()
{
	var trobj=cursorObj.parentElement;
	var tbobj=trobj.parentElement.parentElement;
	tbobj.height=tbobj.offsetHeight-trobj.offsetHeight;
	tbobj.deleteRow(trobj.rowIndex);
}

function delTable(){
	var tbobj=getTableObj(cursorObj);
	tbobj.outerHTML="";
}

function testIndex(){
	var tdobj=event.srcElement;
	//insertTableRow(tdobj,-1);
	insertTableCell(tdobj,1);
}

/**单元格新增标题、常量、变量
 * 根据当前打开单元格，作回设处理
 * flag:=0  caption
 *       1  variable
 *       2  constant
 *       3
 *
 * @return
 */
function setCellContext()
{
	var tdobj=cursorObj;
	tdobj.style.backgroundColor=tdoldColor; //??
	var sobj=getObj("PRN_tablecellcontent");
	sobj.style.display="none";
	sobj.setAttribute("varflag",sobj.varflag);
	fobj=tdobj;
	fobj.setAttribute("varflag",sobj.varflag);
	tdobj.style.backgroundColor=tdoldColor;
	fobj.style.backgroundColor=sobj.all.bgcolor.value;
	fobj.style.color=sobj.all.fcolor.value;
	fobj.style.width=sobj.all.fwidth.value;
	if(sobj.all.underline.checked)
			fobj.style.textDecoration="underline"
	else
			fobj.style.textDecorationUnderline="";
	fobj.innerHTML=sobj.all.context.value;
	var align="left";
	if(sobj.all.alignleft.checked)
		 align="left";
	if(sobj.all.aligncenter.checked)
		align="center";
	if(sobj.all.alignright.checked)
		align="right";
	fobj.align=align;
}

/**
 * 单元格新增变量、常量、标题
 * @return
 */
function addCellContext(flag)
{
	cellTagOpenFlag=flag;
	//event.cancelBubble = true;
	var tdobj= cursorObj; //TD　object
	openTableCursor();
	var styleObj=getObj("PRN_tablecellcontent");
	styleObj.style.display="";
	appendSelectDivColor(styleObj.all.fcolor);
	appendSelectDivColor(styleObj.all.bgcolor);
	styleObj.setAttribute("varflag",flag);
	styleObj.all.context.value=tdobj.innerHTML;
	styleObj.all.context.focus();
	setPopMenuPos(styleObj);
}

/**
 * 关闭当前打开表(table)或行(tr)的对应光标
 * @return
 */
function closeTableCursor(){
	//if(cursorObj.tagName=="TD"){
	//	restoreTableCursor(cursorObj);
	//	return;
	//}
	//if(cursorObj.tagName=="TABLE" || cursorObj.tagName=="TR"){
		var oldColor=cursorObj.getAttribute("bkcolor");
		cursorObj.style.backgroundColor=oldColor;
		return;
	//}
}

/**
 * 打开当前表(table) or 行 (tr)的对应光标藏
 * @return
 */
function openTableCursor(){
	//if(cursorObj.tagName=="TD"){
	//	setTableCursor(cursorObj);
	//	return;
	//}
	//if(cursorObj.tagName=="TABLE" || cursorObj.tagName=="TR"){
		var oldColor=cursorObj.style.backgroundColor;
		cursorObj.setAttribute("bkcolor",oldColor);
		cursorObj.style.backgroundColor=tdselColor;
		return;
	//}
}

/**
 *
 * 设置表格(table,tr)光标
 * 在设置前必须先保存原有属性
 * obj.tagName=TABLE or TR
 * @return
 */
function setTableCursor(obj){
	var borderWidth=obj.style.borderWidth;
	var borderStyle=obj.style.borderStyle;
	var borderColor=obj.style.borderColor;
	obj.setAttribute("borderwidth",borderWidth);
	obj.setAttribute("borderStyle",borderStyle);
	obj.setAttribute("bordercolor",borderColor);
//	obj.style.borderWidth="3px";
	obj.style.borderStyle="dotted";
	obj.style.borderColor="blue";
}

function restoreTableCursor(obj){
	try {
		var borderWidth=obj.getAttribute("borderwidth");
		var borderStyle=obj.getAttribute("borderStyle");
		var borderColor=obj.getAttribute("bordercolor");
		if(borderWidth)
			obj.style.borderWidth=borderWidth;
		else
			obj.style.borderWidth="";
		if(borderStyle)
			obj.style.borderStyle=borderStyle;
		else
			obj.style.borderStyle="";
		if(borderColor)
			obj.style.borderColor=borderColor;
		else
			obj.style.borderColor="";
			obj.style.borderColor="#111111";
	}
	catch (e) {
			alert("error:"+e+"\n"+obj.outerHTML);
	}
}


/**
 * 用于关闭POPMENU 菜单，也关闭POPMENU 打开之后的菜单
 * @return
 */
function closeTablePopMenu()
{
	var obj=event.srcElement.parentElement.parentElement;
	if(obj==null)
		 return;
	popflag=false;
	obj.style.display="none"
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

/**
 * 设置一个表格内的全部属性，菜单关闭，回设
 * @return
 */
function setCellAttribute(){
	var styleObj=getObj("PRN_tablecell");
	if( styleObj.all.sfield.checked){
		cursorObj.setAttribute("varorfield","sfieldud");
	}else if(styleObj.all.sparameter.checked){
		cursorObj.setAttribute("varorfield","sparameter");	
	}else{
		cursorObj.setAttribute("varorfield","svariable");
		var vartype = styleObj.all.vartype.value;
		cursorObj.setAttribute("vartype",vartype);
		var caltype = styleObj.all.caltype.value;
		cursorObj.setAttribute("caltype",caltype);
		var resettype = styleObj.all.resettype.value;
		cursorObj.setAttribute("resettype",resettype);
		var vexpression= styleObj.all.vexpression.value;
		cursorObj.setAttribute("vexpression",vexpression);
	}
  if(styleObj.all.printValSetCode.checked){
  	  cursorObj.setAttribute("printValSetCode","y");
  }
  else{
  	  cursorObj.setAttribute("printValSetCode","n");
  }
	cursorObj.innerHTML=styleObj.all.context.value;
	var print;
	if(styleObj.all.printno.checked)
			print="n";
	 else
			print="y";
	cursorObj.setAttribute("print",print);
/*	var align="left";
	if(styleObj.all.alignleft.checked)
			align="left";
	if(styleObj.all.alignright.checked)
			align="right";
	if(styleObj.all.aligncenter.checked)
			align="center";
	cursorObj.align=align;
	var valign="top";
	if(styleObj.all.valigntop.checked)
			valign="top";
	if(styleObj.all.valignmiddle.checked)
			valign="middle";
	if(styleObj.all.valignbottom.checked)
			valign="bottom";
	cursorObj.vAlign=valign;*/
	setFieldAlign(cursorObj,styleObj);
	cursorObj.style.fontFamily=styleObj.all.fontname.value;
	cursorObj.style.color=styleObj.all.fcolor.value;
	cursorObj.style.backgroundColor=styleObj.all.bgcolor.value;

	var beforeTDWidth = cursorObj.offsetWidth;
	var mmWidth = styleObj.all.width.value;
	var currentTDWidth = mmToPixel(mmWidth);
	var balWidth = currentTDWidth - beforeTDWidth;
	var tdIndex = cursorObj.cellIndex;
	var trobj=cursorObj.parentElement;
	var tableobj=cursorObj.parentElement.parentElement.parentElement;
	var beforeTableWidth = tableobj.offsetWidth;
	var trIndex = cursorObj.parentElement.rowIndex;
	var cellPos = parseTableCellPos(tableobj);
	var eventTDPos = cellPos[trIndex][tdIndex];
	var number = getTBColSpans(cursorObj) ;
	var groupCol = tableobj.lastChild.childNodes[number];
  groupCol.width = parseInt(groupCol.width) + balWidth;
	var beforeTDHeight = cursorObj.offsetHeight;
	var currentTDHeight = mmToPixel(styleObj.all.height.value);
	tableobj.height=tableobj.offsetHeight+currentTDHeight-beforeTDHeight;
	var trIndex0 = getTBRowSpans(cursorObj) ;
	tableobj.firstChild.childNodes[trIndex0].height = tableobj.firstChild.childNodes[trIndex0].offsetHeight + currentTDHeight - beforeTDHeight;
	cursorObj.style.fontSize=styleObj.all.fsize.value;
	if(styleObj.all.underline.checked)//下划线
		 cursorObj.style.textDecoration="underline"
	else
		 cursorObj.style.textDecorationUnderline="";
	if(styleObj.all.italic.checked)//斜体
		 cursorObj.style.fontStyle="italic"
	else
		 cursorObj.style.fontStyle="";
	if(styleObj.all.bold.checked)//粗体
		 cursorObj.style.fontWeight="bold"
	else
		 cursorObj.style.fontWeight="";
	bcrflag=true; //背影色修改标志
	var  delimiter=styleObj.all.delimiter.value;
	cursorObj.setAttribute("delimiter",delimiter);
	var scale=styleObj.all.scale.value;
	cursorObj.setAttribute("scale",scale);
	var isVertical=styleObj.all.isVertical.checked;
	if(isVertical==true)
  	cursorObj.setAttribute("isVertical","y");
	else
  	cursorObj.setAttribute("isVertical","n");
	var istoupper=styleObj.all.istoupper.checked;
	if(istoupper==true)
  	cursorObj.setAttribute("istoupper","y");
	else
  	cursorObj.setAttribute("istoupper","n");
  if(styleObj.all.stretchOverflow.checked)
  	  cursorObj.setAttribute("stretchOverflow","y");
  else
  	  cursorObj.setAttribute("stretchOverflow","n");
  if(styleObj.all.printZero.checked)
  	  cursorObj.setAttribute("printZero","y");
  else
  	  cursorObj.setAttribute("printZero","n");
  setBorderWidth(cursorObj, styleObj);
  deleteTBWidth(tableobj);

}

/**
 * 设置一个表格内的全部属性,打开工作菜单，
 * @return
 */
function cellAttribute(){
	openTableCursor();
	cellopenflag=true; //专用于单元格属性
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	tbobj.style.position="absolute";
	var styleObj=getObj("PRN_tablecell");
	styleObj.style.display="";
	setPopMenuPos(styleObj);
	styleObj.all.context.value=cursorObj.innerText;
	styleObj.all.context.focus();
	var varorfield = cursorObj.getAttribute("varorfield");
	if(varorfield == "sfield" || varorfield == null || varorfield == ""){//兼容
		var repeat = cursorObj.parentElement.getAttribute("repeat");
		if(repeat == "y"){
			varorfield = "sfieldud";	
		}else{
			varorfield = "sparameter";
		}	
	}
	if(varorfield == "sfieldud"){
		styleObj.all.sfield.checked = true;
		styleObj.all.variables.style.display = "none";
	}else if(varorfield == "sparameter"){
		styleObj.all.sparameter.checked = true;
		styleObj.all.variables.style.display = "none";	
	}else if(varorfield == "svariable"){
		styleObj.all.svariable.checked = true;
		styleObj.all.variables.style.display = "";
		var vartype = cursorObj.getAttribute("vartype");
		styleObj.all.vartype.value = vartype==null?"java.lang.String":vartype;
		var caltype = cursorObj.getAttribute("caltype");
		styleObj.all.caltype.value = caltype;
		var resettype = cursorObj.getAttribute("resettype");
		styleObj.all.resettype.value = resettype;
		var vexpression= cursorObj.getAttribute("vexpression");
		styleObj.all.vexpression.value = vexpression;
	}
  var printValSetCode = cursorObj.getAttribute("printValSetCode");
  if((printValSetCode == "n") || (printValSetCode == null))
  	styleObj.all.printValSetCode.checked = false;
  else
  	styleObj.all.printValSetCode.checked = true;
	var print=cursorObj.getAttribute("print");
	if(print==null ||print=="y")
			styleObj.all.printyes.checked=true;
	 else
		 styleObj.all.printno.checked=true;
	/*var align=cursorObj.align;
	if(align=="" ||align=="left")
		 styleObj.all.alignleft.checked=true;
	if(align=="right")
		 styleObj.all.alignright.checked=true;
	if(align=="center")
		styleObj.all.aligncenter.checked=true;
	var valign=cursorObj.vAlign ;
	if(valign=="" ||valign=="middle")
		 styleObj.all.valignmiddle.checked=true;
	if(valign=="top")
		 styleObj.all.valigntop.checked=true;
	if(valign=="bottom")
		styleObj.all.valignbottom.checked=true;	*/
	getFieldAlign(cursorObj,styleObj);
	styleObj.all.fcolor.value=cursorObj.style.color;
	appendSelectDivColor(styleObj.all.fcolor);
	styleObj.all.bgcolor.value=cursorObj.style.backgroundColor;
	appendSelectDivColor(styleObj.all.bgcolor);
	var width = cursorObj.offsetWidth ;
	styleObj.all.width.value=pixelToMm(width*100)/100;
	var height = cursorObj.offsetHeight ;
	styleObj.all.height.value=pixelToMm(height*100)/100;
	styleObj.all.fsize.value=cursorObj.style.fontSize==""?12:cursorObj.style.fontSize;
	styleObj.all.fontname.value=cursorObj.style.fontFamily==""?"simsun":cursorObj.style.fontFamily;
	var underline=cursorObj.style.textDecoration;//下划线
	 if(underline!=null && underline=="underline")
			styleObj.all.underline.checked=true;
	 else
			styleObj.all.underline.checked=false;
	 var italic=cursorObj.style.fontStyle;//斜体
	 if(italic!=null && italic=="italic")
			styleObj.all.italic.checked=true;
	 else
			styleObj.all.italic.checked=false;
	 var bold=cursorObj.style.fontWeight;//粗体
	 if(bold!=null && bold=="bold")
			styleObj.all.bold.checked=true;
	 else
			styleObj.all.bold.checked=false;
	styleObj.all.area.value=getAreaName(tbobj.getAttribute("poid"));
	var delimiter=cursorObj.getAttribute("delimiter");
		 if(delimiter==null)
				delimiter="";
	styleObj.all.delimiter.value=delimiter;
	var scale=cursorObj.getAttribute("scale");
		 if(scale==null)
				scale="";
	styleObj.all.scale.value=scale;
	var isVertical=cursorObj.getAttribute("isVertical","y");
	if(isVertical && isVertical=="y")
			 styleObj.all.isVertical.checked=true;
	else
			 styleObj.all.isVertical.checked=false;

	var istoupper=cursorObj.getAttribute("istoupper","y");
	if(istoupper && istoupper=="y")
			 styleObj.all.istoupper.checked=true;
	else
			 styleObj.all.istoupper.checked=false;
	var stretchOverflow = cursorObj.getAttribute("stretchOverflow");
  if(stretchOverflow == "n")
  	styleObj.all.stretchOverflow.checked = false;
  else
  	styleObj.all.stretchOverflow.checked = true;
  var printZero = cursorObj.getAttribute("printZero");
  if(printZero == "y")
  	styleObj.all.printZero.checked = true;
  else
  	styleObj.all.printZero.checked = false;
  getBorderWidth(cursorObj, styleObj)
}

function setBorderWidth(cursorObj, styleObj){
	if(!cursorObj)
		return;
	if(!styleObj)
		return;
	/*
	var borderWidth = styleObj.all.borderWidth.value;
	if(!borderWidth)
		borderWidth = "1";alert(borderWidth)
	if(borderWidth == "dotted" || borderWidth == "none"){
		cursorObj.style.borderLeftStyle = borderWidth;
		cursorObj.style.borderRightStyle = borderWidth;
		cursorObj.style.borderTopStyle = borderWidth;
		cursorObj.style.borderBottomStyle = borderWidth;
	}
	else{ 
		cursorObj.style.borderLeftWidth = borderWidth;
		cursorObj.style.borderLeftStyle = "";
		cursorObj.style.borderRightWidth = borderWidth;
		cursorObj.style.borderRightStyle = "";
		cursorObj.style.borderTopWidth = borderWidth;
		cursorObj.style.borderTopStyle = "";
		cursorObj.style.borderBottomWidth = borderWidth;
		cursorObj.style.borderBottomStyle = "";
	}
	cursor.setAttribute("borderWidth", borderWidth);
	*/
	
	var borderWidth = styleObj.all.leftBorderWidth.value;
	if(!borderWidth)
		borderWidth = "1";
	if(borderWidth == "dotted" || borderWidth == "none"){
		cursorObj.style.borderLeftStyle = "none";
	}
	else{
		cursorObj.style.borderLeftWidth = borderWidth;
		cursorObj.style.borderLeftStyle = "";
	}

	borderWidth = styleObj.all.rightBorderWidth.value;
	if(!borderWidth)
		borderWidth = "1";
	if(borderWidth == "dotted" || borderWidth == "none")
		cursorObj.style.borderRightStyle = borderWidth;
	else{ 
		cursorObj.style.borderRightWidth = borderWidth;
		cursorObj.style.borderRightStyle = "";
	}
		
	borderWidth = styleObj.all.topBorderWidth.value;
	if(!borderWidth)
		borderWidth = "1";
	if(borderWidth == "dotted" || borderWidth == "none")
		cursorObj.style.borderTopStyle = borderWidth;
	else{ 
		cursorObj.style.borderTopWidth = borderWidth;
		cursorObj.style.borderTopStyle = "";
	}
		
	borderWidth = styleObj.all.bottomBorderWidth.value;
	if(!borderWidth)
		borderWidth = "1";
	if(borderWidth == "dotted" || borderWidth == "none")
		cursorObj.style.borderBottomStyle = borderWidth;
	else{ 
		cursorObj.style.borderBottomWidth = borderWidth;
		cursorObj.style.borderBottomStyle = "";
	}
}

function getBorderWidth(cursorObj, styleObj){
	if(!cursorObj)
		return;
	if(!styleObj)
		return;
	
	/*
	var borderWidth = cursor.getAttribute("borderWidth");
	if(!borderWidth){
		borderWidth = "1";
	}
	styleObj.all.borderWidth.value = borderWidth;
	*/
	
	var borderWidth = cursorObj.style.borderLeftStyle;
	if(!borderWidth){
		borderWidth = parseInt(cursorObj.style.borderLeftWidth);
		if(isNaN(borderWidth))
			borderWidth = "1";
	}
	styleObj.all.leftBorderWidth.value = borderWidth;
	
	borderWidth = cursorObj.style.borderRightStyle;
	if(!borderWidth){
		borderWidth = parseInt(cursorObj.style.borderRightWidth);
		if(isNaN(borderWidth))
			borderWidth = "1";
	}
	styleObj.all.rightBorderWidth.value = borderWidth;
	
	borderWidth = cursorObj.style.borderTopStyle;
	if(!borderWidth){
		borderWidth = parseInt(cursorObj.style.borderTopWidth);
		if(isNaN(borderWidth))
			borderWidth = "1";
	}
	styleObj.all.topBorderWidth.value = borderWidth;
	
	borderWidth = cursorObj.style.borderBottomStyle;
	if(!borderWidth){
		borderWidth = parseInt(cursorObj.style.borderBottomWidth);
		if(isNaN(borderWidth))
			borderWidth = "1";
	}
	styleObj.all.bottomBorderWidth.value = borderWidth;
		
}

//关闭当打开的 table,tr,cell 选择
function closecursorObj()
{
	if(!bcrflag)
		 cursorObj.style.backgroundColor=tdoldColor;
	cellopenflag=false;
}

/**
 * 打开选择的 table,tr,td
 * @return
 */
function opencursorObj()
{
	cellopenflag=true;
}

/**
 * 将一个公用 <select> 颜色操作依附于div(id )下面，首先检查当前div(id)
 * 是否存在，如不存在，则加入，否则就加入
 * @return
 */
function appendSelectDivColor(idobj)
{
	var pobj=idobj.parentElement;
	var selObj=pobj.all.selcolor;
	if(selObj!=null){ //当前DIV　已存在颜色选择框
		if(idobj.value==null)
			 idobj.value="";

				pobj.all.selcolor.defaultselected=idobj.value;
			return;
	}
	var selObj=getObj("selcolor");
	var mysrobj=document.createElement("select");
	mysrobj.setAttribute("id","selcolor");
	pobj.appendChild(mysrobj);
	mysrobj=pobj.all.selcolor;
	mysrobj.outerHTML=selObj.outerHTML;
	pobj.all.selcolor.style.display="";
	pobj.all.selcolor.defaultselected=idobj.value;  //"#7FFFD4";
}

/**
 * 用于设置表与行属性
flag=1: tr
		 2: table
**/
var align;
var valign;
var fontname;
var fcolor;
var bgColor;
var fsize;
function tableAttribute(flag){
	tableOpenFlag=true; //表，行(table,tr)属性打开标志
	if(flag==1)
  	cursorObj=cursorObj.parentElement;
	if(flag==2){
  	cursorObj=cursorObj.parentElement.parentElement.parentElement;
	}
	var styleObj=getObj("PRN_tablemodify");
	styleObj.style.display="";
	//设置POPMENU 的左上角位置
	setPopMenuPos(styleObj);
	//对数据表设置数据处理行数
  if(flag==2){//表格
  	styleObj.all.TITLE.innerHTML="表格属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;left:225\" onclick=\"closeTablePopMenu();\">";
  	styleObj.all.pprintnum.style.display="";
  	styleObj.all.print.style.display="";
  	styleObj.all.tablePos.style.display="";
    styleObj.all.isBorderBondDiv.style.display="";
  	styleObj.all.repeat.style.display="none";
  	styleObj.all.stretchOver.style.display="none";
  	styleObj.all.trPos.style.display="none";
  	if(prnReportType.indexOf("mainTable_L")!=-1){//分组信息,若是列表页面模板,则置灰;
			styleObj.all.pprintnum.disabled = true;
		}
		var printnum=prnFixRowCount;
		if(printnum==null)
			printnum="";
		styleObj.all.printnum.value=printnum;
		if(prnPrintInNewPage == "n")
			styleObj.all.printInNewPage.checked = false ;
		else
			styleObj.all.printInNewPage.checked = true ;
		if(prnResetPageNum == "y")
			styleObj.all.resetPageNum.checked = true ;
		else
			styleObj.all.resetPageNum.checked = false ;
		if(prnHeaderEachPage == "n")
			styleObj.all.headerEachPage.checked = false ;
		else
			styleObj.all.headerEachPage.checked = true ;
    var areaId = cursorObj.getAttribute("poid") ;
    var areaObj = document.getElementById(areaId) ;
    var left = cursorObj.offsetLeft - areaObj.offsetLeft ;
    left = pixelToMm(left*100)/100 ;
    styleObj.all.left.value = left ;
    var top = cursorObj.offsetTop - areaObj.offsetTop ;
    top = pixelToMm(top*100)/100 ;
    styleObj.all.top.value = top ;
    styleObj.all.area.value=getAreaName(areaId);
	}
	else{//行
		styleObj.all.TITLE.innerHTML="行属性设置"+"<img src=\"/style/img/button/menu_close.gif\" style=\"cursor=hand;left:225\" onclick=\"closeTablePopMenu();\">";
   	styleObj.all.pprintnum.style.display="none";
  	styleObj.all.print.style.display="none";
    styleObj.all.isBorderBondDiv.style.display="none";
  	styleObj.all.repeat.style.display="";
  	styleObj.all.stretchOver.style.display="";
    styleObj.all.tablePos.style.display="none";
    styleObj.all.trPos.style.display="";
    styleObj.all.area.value=getAreaName(cursorObj.parentElement.parentElement.getAttribute("poid"));
		var stretchOverflow = cursorObj.getAttribute("stretchOverflow");
  	if(stretchOverflow == "n")
  		styleObj.all.stretchOverflow.checked = false;
  	else
  		styleObj.all.stretchOverflow.checked = true;
	}
  var repeat=cursorObj.getAttribute("repeat");
  if(repeat==null||repeat=="n" )
   	repeat=false; //默认情况况是标题行，不重复
  else
   	repeat=true;
	if(repeat)
   	styleObj.all.repeatyes.checked=true;
  else
   	styleObj.all.repeatno.checked=true;

  var print=cursorObj.getAttribute("print");
  if(print==null ||print=="y")
  	print=true;
  else
  	print=false;
	if(print)
  	styleObj.all.printyes.checked=true;
	else
  	styleObj.all.printno.checked=true;

  var isBorderBond=cursorObj.getAttribute("isBorderBond");
  if(isBorderBond==null ||isBorderBond=="y")
  	isBorderBond=true;
  else
  	isBorderBond=false;
	if(isBorderBond)
  	styleObj.all.isBorderBondYes.checked=true;
	else
  	styleObj.all.isBorderBondNo.checked=true;

  var cprint=cursorObj.getAttribute("cprint");
  if(cprint==null ||cprint=="y")
  	cprint=true;
  else
  	cprint=false;
	if(cprint)
  	styleObj.all.cprintyes.checked=true;
	else
  	styleObj.all.cprintno.checked=true;
	align = cursorObj.getAttribute("align");
  if(align == ""||align == null)
  	align = "left";
  styleObj.all.fcalign.value = align;
	valign=cursorObj.getAttribute("vAlign");
	if(valign == ""||valign == null)
		valign = "middle" ;
	styleObj.all.fcvalign.value = valign;
	fcolor = cursorObj.style.color;
	styleObj.all.fcolor.value = fcolor;
	appendSelectDivColor(styleObj.all.fcolor);
	bgColor = cursorObj.style.backgroundColor;
	styleObj.all.bgcolor.value = bgColor;
	appendSelectDivColor(styleObj.all.bgcolor);
	var vheight;
	if(cursorObj.height==null)
		 vheight="";
	else
		 vheight=cursorObj.offsetHeight;
	styleObj.all.height.value=pixelToMm(vheight*100)/100;
	var vtrheight;
	if(cursorObj.height=="")
		 vtrheight=cursorObj.offsetHeight;
	else
		 vtrheight=cursorObj.height;
	styleObj.all.trheight.value=pixelToMm(vtrheight*100)/100;
	var width;
	if(cursorObj.width==null)
  	width=""
  else
  	width=cursorObj.offsetWidth;
	styleObj.all.width.value=pixelToMm(width*100)/100;
	fsize = cursorObj.style.fontSize;
	if(fsize == ""){
		fsize = "12px";
	}
	styleObj.all.fsize.value = fsize;
	fontname = cursorObj.style.fontFamily;
	if(fontname == ""){
		fontname = "simsun";
	}
	styleObj.all.fontname.value = fontname;
	
	var underline=cursorObj.style.textDecoration;//下划线
	if(underline!=null && underline=="underline")
		styleObj.all.underline.checked=true;
	else
		styleObj.all.underline.checked=false;
	var vitalic=cursorObj.style.fontStyle;//斜体
	if(italic!=null && italic=="italic")
		styleObj.all.italic.checked=true;
	else
		styleObj.all.italic.checked=false;
	var bold=cursorObj.style.fontWeight;//粗体
	if(bold!=null && bold=="bold")
		styleObj.all.bold.checked=true;
	else
		styleObj.all.bold.checked=false;
	openTableCursor();
}
function setCellsHeight(rowObj){
	for(var k=0;k<rowObj.cells.length;k++){
		var tdobj=rowObj.cells(k);
		tdobj.style.heigth="";
		tdobj.height="";
	}
}
function setCellsHeight(rowObj){
	for(var k=0;k<rowObj.cells.length;k++){
		var tdobj=rowObj.cells(k);
		tdobj.style.heigth="";
		tdobj.height="";
	}
}
function setCellsFont(rowObj){
	for(var k=0;k<rowObj.cells.length;k++){
		var tdobj=rowObj.cells(k);
		tdobj.style.fontFamily=rowObj.style.fontFamily;
		tdobj.style.fontSize=rowObj.style.fontSize;
	}
}
function setTableAttribute(){
	closeTablePopMenu();
  var styleObj=getObj("PRN_tablemodify");
	styleObj.style.display="none";
	var alignset = "left";
  alignset = styleObj.all.fcalign.value;
  if(alignset != align){
		cursorObj.setAttribute("align",alignset);
	}
	var valignset = "top";
	if(valignset != valign){
		valignset = styleObj.all.fcvalign.value;
	}
	cursorObj.setAttribute("vAlign",valignset);
	var repeat;
	if(styleObj.all.repeatyes.checked)
		repeat="y";
  else
		repeat="n";
  cursorObj.setAttribute("repeat",repeat);
	var print="n";
	if(styleObj.all.printyes.checked)
		print="y";
  cursorObj.setAttribute("print",print);
  var isBorderBond="y";
	if(styleObj.all.isBorderBondNo.checked)
		isBorderBond="n";
  cursorObj.setAttribute("isBorderBond",isBorderBond);
  var cprint="n";
	if(styleObj.all.cprintyes.checked)
		cprint="y";
  cursorObj.setAttribute("cprint",cprint);
 	if(cursorObj.tagName =="TABLE"){
		prnFixRowCount=styleObj.all.printnum.value;
		if(styleObj.all.printInNewPage.checked == false)
			prnPrintInNewPage = "n" ;
		else
			prnPrintInNewPage = "y" ;
		if(styleObj.all.resetPageNum.checked == true)
			prnResetPageNum = "y" ;
		else
			prnResetPageNum = "n" ;
		if(styleObj.all.headerEachPage.checked == false)
			prnHeaderEachPage = "n" ;
		else
			prnHeaderEachPage = "y" ;
		var groupCol = cursorObj.lastChild;
		var childLength = groupCol.childNodes.length;
		var beforeTBWidth = cursorObj.offsetWidth;
		var currentTBWidth = mmToPixel(styleObj.all.width.value) ;
		var width = (currentTBWidth-beforeTBWidth)/childLength ;
		for(var i=0; i<childLength; i++){
			groupCol.childNodes[i].width = parseInt(groupCol.childNodes[i].width) + width;
			}
		for(var i=0; i<cursorObj.rows.length; i++){
		for(var j=0; j<cursorObj.rows[i].cells.length;j++){
    	var td = cursorObj.rows[i].cells[j];
    	td.setAttribute("print",cprint);
    	if(alignset != align){
    		td.align = alignset;
    	}
    	if(valignset != valign){
				td.vAlign = valignset;
			}
			}
		}
		cursorObj.height=mmToPixel(styleObj.all.height.value) ;
		var beforeTBHeight = cursorObj.offsetHeight ;
		var currentTBHeight =  mmToPixel(styleObj.all.height.value) ;
		var balHeight = currentTBHeight - beforeTBHeight ;
		var eHeight = balHeight/cursorObj.rows.length ;
		for(var i = 0 ; i < cursorObj.rows.length ; i++)
			cursorObj.rows[i].height = cursorObj.rows[i].offsetHeight + eHeight ;
		deleteTBWidth(cursorObj);
	}
	if(cursorObj.tagName =="TR"){
		cursorObj.parentElement.parentElement.height=cursorObj.parentElement.parentElement.offsetHeight+mmToPixel(styleObj.all.trheight.value)-cursorObj.offsetHeight;
		cursorObj.height=mmToPixel(styleObj.all.trheight.value);
		var stretchOverflow = "y";
  	if(!styleObj.all.stretchOverflow.checked)
  	  stretchOverflow = "n";
  	cursorObj.setAttribute("stretchOverflow",stretchOverflow);
		for(var j=0; j<cursorObj.cells.length;j++){
    	var td = cursorObj.cells[j];
			td.setAttribute("print",cprint);
			td.setAttribute("stretchOverflow",stretchOverflow);
			if(alignset != align){
    		td.align = alignset;
    	}
    	if(valignset != valign){
				td.vAlign = valignset;
			}
		}
	}
	if(fontname != styleObj.all.fontname.value){
  	cursorObj.style.fontFamily=styleObj.all.fontname.value;
  }
  if(fcolor != styleObj.all.fcolor.value){
		cursorObj.style.color=styleObj.all.fcolor.value;
	}
	if(bgColor != styleObj.all.bgcolor.value){
		cursorObj.style.backgroundColor=styleObj.all.bgcolor.value;
	}
	if(fsize != styleObj.all.fsize.value){
		cursorObj.style.fontSize=styleObj.all.fsize.value;
	}
	if(cursorObj.tagName=="TR"){
		if(fsize != styleObj.all.fsize.value){
			setCellsFont(cursorObj);
		}
		setCellsHeight(cursorObj);
	}
	var areaId = cursorObj.getAttribute("poid") ;
	if(areaId!=null){
		var areaObj = document.getElementById(areaId) ;
    var left = mmToPixel(styleObj.all.left.value) + areaObj.offsetLeft ;
 	  cursorObj.style.left = left ;
 	  var top = mmToPixel(styleObj.all.top.value) + areaObj.offsetTop ;
	 	cursorObj.style.top = top ;
	}
	if(styleObj.all.underline.checked)//下划线
		cursorObj.style.textDecoration="underline"
	else
		cursorObj.style.textDecorationUnderline="";
	if(styleObj.all.italic.checked)//斜体
		cursorObj.style.fontStyle="italic"
	else
		cursorObj.style.fontStyle="";
	if(styleObj.all.bold.checked)//粗体
		cursorObj.style.fontWeight="bold"
	else
		cursorObj.style.fontWeight="";
	cursorObj=null;
}

/**
*清除选中单元格
**/
function delSelCells()
{
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var tdobj,trobj;
	var cellIndex;
	for(var i=0;i<tbobj.rows.length;i++){
			 trobj=tbobj.rows(i);
			 for(var j=trobj.cells.length-1 ;j>=0;j--){
					 tdobj=trobj.cells(j);
					 if(!tdobj.selected)
								continue;
								trobj.deleteCell(j);
			 }
	 }
	 selflag=false;
}


function selectCell(){
	var tdobj=cursorObj;
	if(tdobj.selected && tdobj.selected=="y"){
		 //格子已选中过,格子不选中时，应全部查一遍，如果没有一个选中，则清除标志
	  tdobj.selected="";
		 restoreTableCursor(tdobj);
		 checkTableSelected(tdobj.parentElement.parentElement.parentElement);
	 }
	 else{//格子首次选中
	  tdobj.setAttribute("selected","y");
		 selflag=true;
		 setTableCursor(tdobj);
	}
}

/**
 * 检查当前表是否还有选中单元
 * @return
 */
function checkTableSelected(tbobj){
	var num=0;
	for(var i=0;i<tbobj.rows.length;i++){
		 var row=tbobj.rows[i];
		 for(var j=0;j<row.cells.length;j++){
					var cell=row.cells[j];
					if(cell.selected && cell.selected=="y")
						 return;  //只要找到一个就返回
			 }
	}
	selflag=false;
}

/**
*清除选中标志
**/
function clearSelCellFlag(tbobj)
{
//  var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var tdobj,trobj;
	for(i=0;i<tbobj.rows.length;i++){
			trobj=tbobj.rows(i);
			for(j=0;j<trobj.cells.length;j++){
					tdobj=trobj.cells(j);
					restoreTableCursor(tdobj);
					tdobj.selected="";
					}
	}
	selflag=false;
}

/**
*清除选中标志,用于合并单元格
**/
function clearSelCellFlag1(tbobj, selCells)
{
	for(var i=0;i<selCells.length;i++){ //行检查
	 	var rowAttrs=selCells[i];
		for(var j=0;j<rowAttrs.length;j++){ //列检查
			var row=rowAttrs[j][0];
			var col=rowAttrs[j][1];
			tdobj=tbobj.rows[row].cells[col];
			restoreTableCursor(tdobj);
			tdobj.selected="";
		}
	}
	selflag=false;
}

//新增一个表格
function insertTable()
{
		if(nowBodyID==null){
			alert("请先选择区域!");
			return;
		}
		else if (nowBodyID!="rpbody"){
			alert("请选择表体设计区!");
			return;
		}
		else{
			nowBodyObj = getObj(nowBodyID);
			for(var i = 0; i < nowBodyObj.childNodes.length ; i++){
				if(nowBodyObj.childNodes[i].id.indexOf("PRN_table_") != -1){
					break;
					}
			}
			if(i < nowBodyObj.childNodes.length){
				alert("最多只能添加一个表格！");
				return;
			}
		}
		var obj=getObj("PRN_tablestyle");
		obj.style.display="";
		event.cancelBubble = true;
		setMenuPos(obj);
		obj.all.del.style.display="none";
		appendSelectDivColor(obj.all.fcolor);
		appendSelectDivColor(obj.all.bgcolor);
		obj.setAttribute("compoid",nowBodyID); //知道当前的组件ID
}

/**
 * 定义单元格在表格中的索引号
 * @return
 */
function cellIndex(col,row){
	var colIndex=col;
	var rowIndex=row;
}


//合并单元格操作
function mergeCells()
{
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var selCells=new Array();
	var cellAttrs; //cell rows,cols,rowSpan,colSpan
	var rowAtttrs;
	var tdobj,trobj;
	var colIndex; //当前行选中单元的列序号，用于数组记数
	var rowIndex=0; //当前选中列的序号，用于数组记数
	var cols; //colspan
	var rows; //rospan
	var tocolNum=0; //记录总列数colSpan
	var torowNum=0; //记录总行数 rowSpan
	var toWidth=0;
	var toHeight=0;
	var maxRight=0,maxBottom=0; //最右上角的
	var colselNum=0,colselNum0;//当前列的累计数
	var rowselNum=0; //当前行的累计数
	var minrowSpan; //一行的最小rowspan
	try{
			 //第一步找出已选单元格，并同时找总行数，总列数
			for(var i=0;i<tbobj.rows.length;i++){
					trobj=tbobj.rows(i);
					colIndex=0;  //记录从第一个格开始后的序号
					rowAttrs=null;
					rowAttrs= new Array();
					for(var j=0;j<trobj.cells.length;j++){
						 tdobj=trobj.cells(j);
						 cellAttrs=null;
						 cellAttrs=new Array();
						 if(!tdobj.selected || (tdobj.selected!="y") ){
								continue;
							}
						 var pos=getObjPosAtts(tdobj);
						 cellAttrs[0]=i;//row  index;
						 cellAttrs[1]=j; //col index
						 cols=tdobj.colSpan;
						 rows=tdobj.rowSpan;
						 cellAttrs[2]=rows;
						 cellAttrs[3]=cols;
						 rowAttrs[colIndex]=cellAttrs;
						 colIndex++;
					}
				 if(colIndex>0){//如果当前行有选中的格，则作操作增行操作
						 selCells[rowIndex]=rowAttrs;
						 rowIndex++;
					}
				}
		//第二步清除选中单元格
		selflag=false;
		clearSelCellFlag1(tbobj, selCells);
		var isSelOk=true; //检测选择是否合法
		//alert("test point ");
		//选择单元格操作的合法性检查
		var swidth;
		var sheight;
		var sleft;
		var stop;
		var pos;
		//第三步： 求最
		 for(var i=0;i<selCells.length;i++){ //行检查
				 rowAttrs=selCells[i];
					for(var j=0;j<rowAttrs.length;j++){ //列检查
						var row=rowAttrs[j][0];
						var col=rowAttrs[j][1];

						if(i==0) //只求第一行
							tocolNum+=rowAttrs[j][3];

						if(j==0) //只求第一列
							torowNum+=rowAttrs[0][2];

								tdobj=tbobj.rows[row].cells[col];
								pos=getObjPosAtts(tdobj);
						if( (pos.left+pos.width)>maxRight)
							 maxRight=pos.left+pos.width;
						if( (pos.top+pos.height)>maxBottom)
							 maxBottom=pos.top+pos.height;
						 toWidth+=pos.width;
						 toHeight+=pos.height;
						// alert(tdobj.innerText+"\nx:"+pos.left+",y:"+pos.top+",w:"+pos.width+",h:"+pos.height+"\ntw:"+toWidth+",th:"+toHeight+",rx:"+maxRight+",ry:"+maxBottom);

					}
			}

		//alert(toWidth+","+toHeight);
			for(var i=0;i<selCells.length;i++){ //行检查
				rowAttrs=selCells[i];
				for(var j=0;j<rowAttrs.length;j++){ //列检查
								 var row=rowAttrs[j][0];
								 var col=rowAttrs[j][1];
								 var cell=tbobj.rows[row].cells[col];
						var pos=getObjPosAtts(cell);
					 if(j==0) continue;
					 if( rowAttrs[j][1]-rowAttrs[j-1][1]!=1){
									 isSelOk=false;
									 break;
						//alert("有不合法的选择格");
					}
				}

			 if(isSelOk==false)
				 break;
			}

	 if(isSelOk==false)
	 {
		 alert("有不合法的选择格");
		 return;
	 }
	 //合并操作
	 //alert("sel length:"+selCells.length);
	 var col,row;
	 var index;
	 for(var i=selCells.length-1;i>=0;i--){
			rowAttrs=selCells[i];
			for(var j=selCells[i].length-1;j>=0;j--){
				 if(i==0&& j==0)
						continue;
				 row=selCells[i][j][0];
				 col=selCells[i][j][1];
				 tbobj.rows(row).deleteCell(col);
				}
			}
			row=selCells[0][0][0];
			col=selCells[0][0][1];
			tbobj.rows(row).cells(col).colSpan=tocolNum;
			tbobj.rows(row).cells(col).rowSpan=torowNum;
		 }
		 catch(e){
			 alert("prntable.js error-327:"+e);
			}
}

//合并单元格操作
function mergeCells2()
{
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var selCells=new Array();
	var cellAttrs; //cell rows,cols,rowSpan,colSpan
	var rowAtttrs;
	var tdobj,trobj;
	var colIndex; //当前行选中单元的列序号，用于数组记数
	var rowIndex=0; //当前选中列的序号，用于数组记数
	var cols; //colspan
	var rows; //rospan
	var colselNum=0,colselNum0;//当前列的累计数
	var rowselNum=0; //当前行的累计数
	var minrowSpan; //一行的最小rowspan
	try{
			for(i=0;i<tbobj.rows.length;i++){
					trobj=tbobj.rows(i);
					colIndex=0;  //记录从第一个格开始后的序号
					colselNum0=0;
					rowAttrs=null;
					rowAttrs= new Array();
					colselNum0=0;
					minrowSpan=10000;
					for(j=0;j<trobj.cells.length;j++){
							tdobj=trobj.cells(j);
							cellAttrs=null;
							cellAttrs=new Array();
							if(!tdobj.selected || (tdobj.selected!="y") ){
									continue;
							 }
							 cellAttrs[0]=i;//row  index;
							 cellAttrs[1]=j; //col index
							 cols=tdobj.colSpan;
							 rows=tdobj.rowSpan;
							 cellAttrs[2]=rows;
							 cellAttrs[3]=cols;
							 colselNum0+=cols;
							 if(minrowSpan>rows)
									minrowSpan=rows;
							 tdobj.selected="";
							 tdobj.style.backgroundColor=tdoldColor;
							 rowAttrs[colIndex]=cellAttrs;
							 colIndex++;
					}
					if(colselNum<colselNum0)
							colselNum=colselNum0;
							if(colIndex>0){//如果当前行有选中的格，则作操作增行操作
										//alert(rowAttrs);
											selCells[rowIndex]=rowAttrs;
											rowIndex++;
											rowselNum+=minrowSpan;
										 }

							}
		 //alert("test point ");
		 //选择单元格操作的合法性检查
			for(i=0;i<selCells.length;i++){ //行检查
					rowAttrs=selCells[i];
					for(j=0;j<rowAttrs.length;j++){ //列检查
							if(j!=0 && rowAttrs[j][1]-rowAttrs[j-1][1]!=1){
									 alert("有不合法的选择格");
									 return; //找到左右不相邻的格
							}
					}
			}
	//合并操作
	//alert("sel length:"+selCells.length);
	var col,row;
	var index;
	for(i=0;i<selCells.length;i++){
				 rowAttrs=selCells[i];
				 for(j=0;j<selCells[i].length;j++){
						if( !(i==0&& j==0)){
									row=selCells[i][j][0];
									col=selCells[i][j][1];
									if(col> tbobj.rows.length-1){
										col=-1;
									}
									tbobj.rows(row).deleteCell(col);
						}
				 }
	}
	row=selCells[0][0][0];
	col=selCells[0][0][1];
	tbobj.rows(row).cells(col).colSpan=colselNum;
	tbobj.rows(row).cells(col).rowSpan=rowselNum;
	}
	catch(e){
			 alert("prntable.js error-327:"+e);
	}
	selflag=false;
	clearSelCellFlag(tbobj);

}

/**
 * 返回与tdobj单元格左边处于同一线的单元格数组，必须
 * @return
 */
function getLeftSameCols(tdobj){
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var pos=getObjPosAtts(tdobj);
	var cells=new Array();
	var lastPos=null;
	for(var i=0;i<tbobj.rows.length;i++){
			var row=tbobj.rows[i];
			var isok=true;
			var cellIndex=-1;
			for(var j=0;j<row.cells.length;j++){
				 var cell=row.cells[j];
				 var cellPos=getObjPosAtts(cell);
				 if(cellPos.left==pos.left )
				 {
						if(i==0){ //第一行
								 cellIndex=j;
								 lastPos=cellPos;
								 isok=true;
								 break;
						 }
						 else{
								 if( (lastPos.top+lastPos.height)==cellPos.top){ //同一列连续
											 isok=true;
											 cellIndex=j;
											 lastPos=cellPos;
											 break;
										}
									}
									setTableCursor(cell);
									alert("找到不合适的单元格");
									restoreTableCursor(cell);
									return new Array();
								}
								if(  cellPos.left<pos.left &&
										 (cellPos.left+cellPos.width) > pos.left
										){
										setTableCursor(cell);
										alert("找到不合适的单元格");
										restoreTableCursor(cell);
										return new Array();
								}
					}
					if(isok==true && cellIndex!=-1){
								var cellAttr=new Array();
								cellAttr[0]=i;
								cellAttr[1]=cellIndex;
								cellAttr[2]=row.cells[cellIndex].rowSpan;
								cellAttr[3]=row.cells[cellIndex].colSpan;
								cells[cells.length]=cellAttr;
								//alert(row.cells[cellIndex].outerHTML+"\n"+cells);
					}
	 }
	 return cells;
}


/**
 * 返回与tdobj单元格右边处于同一线的单元格数组
 * @return
 */
function getRightSameCols(tdobj){
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var pos=getObjPosAtts(tdobj);
	var baseRight=pos.left+pos.width;//右边位置
	var cells=new Array();
	var lastPos=null;
	try{
	 for(var i=0;i<tbobj.rows.length;i++){
			var row=tbobj.rows[i];
			var isok=true;
			var cellIndex=-1;
					for(var j=0;j<row.cells.length;j++){
								var cell=row.cells[j];
								var cellPos=getObjPosAtts(cell);
								var cellRight=cellPos.left+cellPos.width;
								if( cellRight==baseRight )
								{
									if(i==0){ //第一行
										cellIndex=j;
										lastPos=cellPos;
										isok=true;
										break;
									}
									else{
										if( (lastPos.top+lastPos.height)==cellPos.top){ //同一列连续
											 isok=true;
											 cellIndex=j;
											 lastPos=cellPos;
											 break;
										}
									}
									setTableCursor(cell);
									alert("找到不合适的单元格");
									restoreTableCursor(cell);
									return new Array();
								}

								if(  cellPos.left<cellRight &&
										 (cellPos.left+cellPos.width) > cellRight
										){
										setTableCursor(cell);
										alert("找到不合适的单元格");
										restoreTableCursor(cell);
										return new Array();
								}

					}
					if(isok==true && cellIndex!=-1){
								var cellAttr=new Array();
								cellAttr[0]=i;
								cellAttr[1]=cellIndex;
								cellAttr[2]=row.cells[cellIndex].rowSpan;
								cellAttr[3]=row.cells[cellIndex].colSpan;
								cells[cells.length]=cellAttr;
								//alert(row.cells[cellIndex].outerHTML+"\n"+cells);
					}
	 	}
	}
	catch (e) {
			alert("error:"+e+"\n");
	}
	 return cells;

}


/**
 * 返回与 tdobj 处在同一列的所有单元格序号数组,(row,col)
 * @return
 */
function getSameWidthCols(tdobj){
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var pos=getObjPosAtts(tdobj);
	var cells=new Array();
	for(var i=0;i<tbobj.rows.length;i++){
			var row=tbobj.rows[i];
			var isok=true;
			var cellIndex=-1;
			for(var j=0;j<row.cells.length;j++){
					 var cell=row.cells[j];
					 var cellPos=getObjPosAtts(cell);
					 if(cellPos.left==pos.left && cellPos.width==pos.width)
					 {
							isok=true;
							cellIndex=j;
							break;
						}
					 if( (cellPos.left+cellPos.width) == (pos.left+pos.width) &&
						 cellPos.width!=pos.width
						 ){
							isok=false; //找到不合适的单元格
							setTableCursor(cell);
							alert("找到不合适的单元格");
							restoreTableCursor(cell);
							return new Array();
					}
					if( (cellPos.left+cellPos.width) > (pos.left+pos.width) )
							break; //当前行肯定有空格行， 前一个rowSpan >1
			}
					if(isok==true && cellIndex!=-1){
						var cellAttr=new Array();
						cellAttr[0]=i;
						cellAttr[1]=cellIndex;
						cellAttr[2]=row.cells[cellIndex].rowSpan;
						cellAttr[3]=row.cells[cellIndex].colSpan;
						cells[cells.length]=cellAttr;
						//alert(row.cells[cellIndex].outerHTML+"\n"+cells);
					}
	 }

	 return cells;
}


//删除一个整单元列
function delCol(){
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
	var cells= getSameWidthCols(cursorObj);
	if(cells.length==0){
			 openTableCursor();
			 alert("当前单元格所在列不可以删除，所有单元格不相似，\n您可以选择删除单个单元格!");
			 closeTableCursor();
			 return;
	}
	tbobj.width=tbobj.offsetWidth-tbobj.childNodes[0].childNodes[0].childNodes[cells[0][1]].offsetWidth;
	deleteTBGroupCol(tbobj,cursorObj);
	for(var i=0;i<cells.length;i++){
			var index=cells[i];
			tbobj.rows[index[0]].deleteCell(index[1]);
	}
}

function checkDataLine(){

}

function updatecode()
{
	var pobj=getObj("templatebody");
	var dobjs=pobj.getElementsByTagName("div");
	updateAttrs(dobjs,"print");
	updateAttrs(dobjs,"repeat");
	dobjs=null;
	dobjs=pobj.getElementsByTagName("table");
	updateAttrs(dobjs,"print");
	updateAttrs(dobjs,"repeat");
	updateAttrs(dobjs,"needadjust");
	var mx1=getObj("mx1");
	if(mx1!=null){
		 mx1.parentElement.style.display="none";
	}
	alert("升级成功！");

}

function updateAttrs(objs,attrName){
	var attrValue;
	var subobjs;
	for(i=0;i<objs.length;i++){
			setAttrValue(objs[i],attrName);
			subobjs=objs[i].all;
			for(j=0;j<subobjs.length;j++){
					setAttrValue(subobjs[j],attrName);
			}
	}
}

function setAttrValue(obj,attrName)
{
	var attrValue=obj.getAttribute(attrName);
	if(attrValue==null ) return;
	if(attrValue==true|| attrValue=="true")
			obj.setAttribute(attrName,"y");
	if(attrValue==false || attrValue=="false")
			obj.setAttribute(attrName,"n");

}

function updatetbcode()
{	alert("此功能暂时未实现！");
	/*
	var trobj=cursorObj.parentElement;
	var tbobj=trobj.parentElement.parentElement;
	tbobj.attachEvent("onmouseover",mouseIntoTable);
	tbobj.attachEvent("onmouseout", mouseOffTable);
	tbobj.attachEvent("onselectstart",selectStTable); //用于返回
	var tsdiv=document.createElement("div");
	tsdiv.setAttribute("id","testbody");
	tsdiv.style.display="none";
	var  pobj=getObj("templatebody");
	pobj.appendChild(tsdiv);
	addTxtDiv("mx1");
	 addTxtDiv("my1");
			 addBR();
			 addTxtDiv("mx2");
			 addTxtDiv("my2");
			 addBR();

			 addTxtDiv("mx3");
			 addTxtDiv("my3");
			 addBR();

			 addTxtDiv("mx4");
			 addTxtDiv("my4");

	*/
}
function addBR()
{
	var brobj=document.createElement("br");
	var pobj=getObj("testbody");
			pobj.appendChild(brobj);

}

function addTxtDiv(id)
{

	var checkObj=getObj(id);
		 if(checkObj!=null)
				 return;

	var pobj=getObj("testbody");

	var inobj=document.createElement("input");
			 inobj.setAttribute("type","text");
			 inobj.setAttribute("id",id);
			 inobj.setAttribute("size",30);
			 pobj.appendChild(inobj);

}

/**
 * 检查某一列是否有相同宽度
 * @return
 */
function isSameWidthCol(tdobj){
	var pos=getObjPosAtts(tdobj);

	var tbobj=tdobj.parentElement.parentElement.parentElement;
	for(var i=0;i<tbobj.rows.length;i++){
			var row=tbobj.rows[i];
			var isok=false;
					for(var j=0;j<row.cells.length;j++){
						 var cell=row.cells[j];
								 var cellPos=getObjPosAtts(cell);
								 if(cellPos.left>pos.left)
										break;
								 if(cellPos.left==pos.left && cellPos.width==pos.width)
								 {
									 isok=true;
									 break;
								 }

					}
			if(isok==false)
				 return false;
	}

	return true;

}

function copyTable(){
	//alert(cursorObj.outerHTML);
	var tbobj=cursorObj.parentElement.parentElement.parentElement;
 window.clipboardData.setData("Text",tbobj.outerHTML)
}
/**
* 关闭修改列属性菜单
*/
function closeColPopMenu(){
	var obj=event.srcElement.parentElement.parentElement;
	if(obj==null)
		 return;
	popflag=false;
	obj.style.display="none"
	if(!bcrflag) //有无背影色的修改标志
		 cursorObj.style.backgroundColor=tdoldColor;
  bcrflag=false;
	restoreColColor();
}
function colAttribute(){
	var styleObj=getObj("PRN_colmodify");
	styleObj.style.display="";
	styleObj.all.area.value=getAreaName(cursorObj.parentElement.parentElement.parentElement.getAttribute("poid"));
	setPopMenuPos(styleObj);
	setColColor();
	var print=cursorObj.getAttribute("print");
	if(print==null ||print=="y")
			styleObj.all.printyes.checked=true;
	 else
		 styleObj.all.printno.checked=true;
	getFieldAlign(cursorObj,styleObj)
	/*
	align=cursorObj.align;
	if(align=="" ||align=="left")
		 styleObj.all.alignleft.checked=true;
	if(align=="right")
		 styleObj.all.alignright.checked=true;
	if(align=="center")
		styleObj.all.aligncenter.checked=true;
	valign=cursorObj.vAlign ;
	if(valign=="" ||valign=="middle")
		 styleObj.all.valignmiddle.checked=true;
	if(valign=="top")
		 styleObj.all.valigntop.checked=true;
	if(valign=="bottom")
		styleObj.all.valignbottom.checked=true;
	*/
	fcolor = cursorObj.style.color;
	styleObj.all.fcolor.value = fcolor;
	appendSelectDivColor(styleObj.all.fcolor);
	bgColor = cursorObj.style.backgroundColor;
	styleObj.all.bgcolor.value = bgColor;
	appendSelectDivColor(styleObj.all.bgcolor);
	var delimiter=cursorObj.getAttribute("delimiter");
	if(delimiter==null)
		delimiter="";
	styleObj.all.delimiter.value=delimiter;
	var scale=cursorObj.getAttribute("scale");
	if(scale==null)
		scale="";
	styleObj.all.scale.value=scale;
	var isVertical=cursorObj.getAttribute("isVertical","y");
	if(isVertical && isVertical=="y")
			 styleObj.all.isVertical.checked=true;
	else
			 styleObj.all.isVertical.checked=false;
	var istoupper=cursorObj.getAttribute("istoupper","y");
	if(istoupper && istoupper=="y")
			 styleObj.all.istoupper.checked=true;
	else
			 styleObj.all.istoupper.checked=false;
	fsize = cursorObj.style.fontSize==""?"12px":cursorObj.style.fontSize;
	styleObj.all.fsize.value = fsize;
	fontname = cursorObj.style.fontFamily==""?"simsun":cursorObj.style.fontFamily;
	styleObj.all.fontname.value = fontname;
	var width = cursorObj.offsetWidth ;
	styleObj.all.width.value = pixelToMm(width*100)/100;
	var isPrintInSplitedTemplate = cursorObj.getAttribute("isPrintInSplitedTemplate");
	if(isPrintInSplitedTemplate == "y")
		styleObj.all.isPrintInSplitedTemplate.checked = true;
	else
		styleObj.all.isPrintInSplitedTemplate.checked = false;
	
}
/**
* 设置所选列的背景颜色
*/
function setColColor(){
	var eventTD = cursorObj;
	var tdIndex = eventTD.cellIndex;
	var trIndex = eventTD.parentElement.rowIndex;
	var table = eventTD.parentElement.parentElement.parentElement;
	var cellPos = parseTableCellPos(table);
	var eventTDPos = cellPos[trIndex][tdIndex];
	for(var i=0; i<table.rows.length; i++){
		for(var j=0; j<table.rows[i].cells.length;j++){
    	var td = table.rows[i].cells[j];
			if(cellPos[i][j] == eventTDPos){
				var bkColor = td.style.backgroundColor;
				td.setAttribute("bkcolor",bkColor);
				td.style.backgroundColor = tdselColor;
				break;
			}
		}
	}
}
/**
* 回复所选列的背景颜色
*/
function restoreColColor(){
	var eventTD = cursorObj;
	var tdIndex = eventTD.cellIndex;
	var trIndex = eventTD.parentElement.rowIndex;
	var table = eventTD.parentElement.parentElement.parentElement;
	var cellPos = parseTableCellPos(table);
	var eventTDPos = cellPos[trIndex][tdIndex];
	for(var i=0; i<table.rows.length; i++){
		for(var j=0; j<table.rows[i].cells.length;j++){
    	var td = table.rows[i].cells[j];
			if(cellPos[i][j] == eventTDPos){
				var bkColor = td.getAttribute("bkcolor");
				td.style.backgroundColor = bkColor;
				break;
			}
		}
	}
}
/**
* 设置列属性
*/
function setColAttribute(){
	var styleObj=getObj("PRN_colmodify");
	var eventTD = cursorObj;
/*	var align="left";
	if(styleObj.all.alignleft.checked)
			align="left";
  if(styleObj.all.alignright.checked)
			align="right";
  if(styleObj.all.aligncenter.checked)
			align="center";
	var valign="top";
	if(styleObj.all.valigntop.checked)
			valign="top";
	if(styleObj.all.valignmiddle.checked)
			valign="middle";
	if(styleObj.all.valignbottom.checked)
			valign="bottom";*/
	var alignset="left";
  alignset = styleObj.all.fcalign.value;
	cursorObj.setAttribute("align",alignset);
	var valignset="top";
	valignset = styleObj.all.fcvalign.value;
	//cursorObj.setAttribute("vAlign",valign);
	var tdIndex = eventTD.cellIndex;
	var trIndex = eventTD.parentElement.rowIndex;
	var table = eventTD.parentElement.parentElement.parentElement;
	var cellPos = parseTableCellPos(table);
	var eventTDPos = cellPos[trIndex][tdIndex];
	var beforeTDWidth = cursorObj.offsetWidth ;
	var currentTDWidth = mmToPixel(styleObj.all.width.value);
	var balWidth = currentTDWidth - beforeTDWidth ;
	var number = getTBColSpans(eventTD) ;
	number = number - eventTD.colSpan + 1 ;
	var groupCol = table.lastChild.childNodes[number];
  groupCol.width = parseInt(groupCol.width) + balWidth;
	//setTBGroupColWidth(cursorObj,balWidth);
	for(var i=0; i<table.rows.length; i++){
		for(var j=0; j<table.rows[i].cells.length;j++){
			if(cellPos[i][j] == eventTDPos){
				currentTD = table.rows[i].cells[j];
				var print;
				if(styleObj.all.printno.checked)
					print="n";
        else
          print="y";
        currentTD.setAttribute("print",print);
        currentTD.setAttribute("colprint",print);
        if(align != alignset){
        	currentTD.align=alignset;
        }
        if(valign != valignset){
					currentTD.vAlign=valignset;
				}
				if(fontname != styleObj.all.fontname.value){
					currentTD.style.fontFamily=styleObj.all.fontname.value;
				}
				if(fcolor != styleObj.all.fcolor.value){
					currentTD.style.color=styleObj.all.fcolor.value;
				}
				if(bgColor != styleObj.all.bgcolor.value){
					currentTD.style.backgroundColor=styleObj.all.bgcolor.value;
				}
				if(fsize != styleObj.all.fsize.value){
					currentTD.style.fontSize=styleObj.all.fsize.value;
				}
				bcrflag=true; //背影色修改标志
        var  delimiter=styleObj.all.delimiter.value;
				currentTD.setAttribute("delimiter",delimiter);
				var scale=styleObj.all.scale.value;
				currentTD.setAttribute("scale",scale);
				var isVertical=styleObj.all.isVertical.checked;
				if(isVertical==true)
					currentTD.setAttribute("isVertical","y");
        else
					currentTD.setAttribute("isVertical","n");
				var istoupper=styleObj.all.istoupper.checked;
				if(istoupper==true)
					currentTD.setAttribute("istoupper","y");
        else
					currentTD.setAttribute("istoupper","n");
				var isPrintInSplitedTemplate = styleObj.all.isPrintInSplitedTemplate.checked;
				if(isPrintInSplitedTemplate)
					currentTD.setAttribute("isPrintInSplitedTemplate","y");		
				else
					currentTD.setAttribute("isPrintInSplitedTemplate","n");				
				break;
			}
			else if(cellPos[i][j] < eventTDPos){
				currentTD = table.rows[i].cells[j];
				var isPrintInSplitedTemplate = styleObj.all.isPrintInSplitedTemplate.checked;
				if(isPrintInSplitedTemplate)
					currentTD.setAttribute("isPrintInSplitedTemplate","y");		
				else
					currentTD.setAttribute("isPrintInSplitedTemplate","n");
			}
		}
	}
	deleteTBWidth(table);
}
/*
 *计算当前单元格跨越原子列的数量
 */
function getTBColSpans(tdEle){
	var flag = getTBSpans(tdEle) ;
	var count = 0;
	if(flag=="true"){
		var tdIndex = tdEle.cellIndex;
		var trObj = tdEle.parentElement;
		for(var i=0; i<=tdIndex; i++){
			count += trObj.childNodes[i].colSpan;
		}
	}else{
		count = flag ;
	}
	return count-1;
}
/*
 *计算当前单元格跨越原子行的数量
 */
function getTBRowSpans(tdEle){
	var tdIndex = tdEle.cellIndex ;
	var trObj = tdEle.parentElement ;
	var trIndex = trObj.rowIndex ;
	if(tdEle.rowSpan > 1){
		trIndex = trIndex + tdEle.rowSpan - 1 ;
	}
	return trIndex ;
}
function getTBSpans(tdEle){
	var flag = "true" ;
	var rowspans = new Array() ;
	var tdIndex = tdEle.cellIndex ;
	var trIndex = tdEle.parentElement.rowIndex ;
	var table = tdEle.parentElement.parentElement.parentElement ;
	for(var i = 0; i < trIndex; i++){
		for(var j = 0; j < table.rows[i].cells.length ;j++){
			var td = table.rows[i].cells[j] ;
			var trIndex0 = td.parentElement.rowIndex
			if( trIndex0 + td.rowSpan > trIndex){
				var span = new Array() ;
				span[0] = td.cellIndex ;
				span[1] = trIndex0 ;
				span[2] = td.colSpan ;
				span[3] = td.rowSpan ;
				rowspans[rowspans.length] = span ;
 				}
			}
		}//alert(rowspans)
	if(rowspans!=""){
		var minCellIndex = rowspans[0][0] ;
		var sumRowSpan = 0 ;
		var rowIndex = getTBRowSpans(tdEle) ;
		var rowSpans = 0 ;
		for(var j = 0; j < table.rows[rowIndex].cells.length ;j++){
			var td = table.rows[rowIndex].cells[j] ;
			if(td.colSpan > 1)
				rowSpans += (td.colSpan - 1) ;
			}
		tdIndex = tdIndex + rowSpans ;
		for(var i = 0; i < rowspans.length; i++){
			if(rowspans[i][0] < minCellIndex){
				minCellIndex = rowspans[i][0] ;
			}
			var colIndex ;
			if(i > 0 && rowspans[i-1][1] == rowspans[i][1]){
				colIndex = rowspans[i][0] - rowspans[i-1][2] + 1;
			}else{
				colIndex = rowspans[i][0] ;
			}		//alert(colIndex)
			if(colIndex <= tdIndex){
				sumRowSpan += rowspans[i][2] ;
			}
		}
		if(minCellIndex <= tdIndex){
			flag = tdIndex + sumRowSpan + 1 ;
			}
	}//alert(tdIndex);alert(flag)
	return flag ;
}
/*
 *设置表格colgroup中每列的宽度
 */
function setTBGroupColWidth(tdEle,width){
	var table = tdEle.parentElement.parentElement.parentElement;
	var number = getTBColSpans(tdEle) ;
	var groupCol = table.lastChild.childNodes[number];
  groupCol.width = parseInt(groupCol.width) + width;
}
/*
 *表格增加列时，同时增加colgroup中的对应col，并调整变化的col的width。
 *ip=0 左边增加一列;ip=1 右边增加一列;ip=-1 尾部增加一列

 */
function insertTBGroupCol(table,tdEle,ip){
	var number = getTBColSpans(tdEle);
	var colGroup = 	table.lastChild;
	var childLength = colGroup.childNodes.length;
	if(ip==-1){
		var col = document.createElement("<col id='col" + childLength + "'>");
		col.width = 50;
		colGroup.appendChild(col);
	}
	else{
		for(var i=number+ip; i<childLength; i++){
			colGroup.childNodes[i].id = "col" + (i+1);
		}
		var col = document.createElement("<col id='col" + (number +ip) + "'>");
		col.width = 50;
		if(i < childLength)
			colGroup.childNodes[number+ip].insertAdjacentElement("beforeBegin",col);
		else
			colGroup.appendChild(col);
	}
}
/*
 *表格删除列时，同时删除colgroup中的对应col，并调整变化的col的width。
 */
function deleteTBGroupCol(table,tdEle){
	var number = getTBColSpans(tdEle);
	var colGroup = 	table.lastChild;
	var childLength = colGroup.childNodes.length;
	for(var i=number; i<childLength-1; i++){
		colGroup.childNodes[i].width = parseInt(colGroup.childNodes[i+1].width);
	}
	var lastChild = colGroup.lastChild;
	colGroup.removeChild(lastChild);
}


/**
 * 单元格属性设置对话框中处理字段和变量的转换
 */
function varorfield(){
	var styleObj=getObj("PRN_tablecell");
	if(styleObj.all.sfield.checked){
		styleObj.all.variables.style.display = "none";
	}
	if(styleObj.all.sparameter.checked){
		styleObj.all.variables.style.display = "none";
	}
	if(styleObj.all.svariable.checked){
		styleObj.all.variables.style.display = "";
		var vartype = cursorObj.getAttribute("vartype");
		styleObj.all.vartype.value = vartype==null?"java.lang.String":vartype;
		var caltype = cursorObj.getAttribute("caltype");
		styleObj.all.caltype.value = caltype==null?"Nothing":caltype;
		var resettype = cursorObj.getAttribute("resettype");
		styleObj.all.resettype.value = resettype==null?"None":resettype;
		var vexpression= cursorObj.getAttribute("vexpression");
		styleObj.all.vexpression.value = vexpression==null?"":vexpression;
	}
}
  
/**
 * 字段属性设置对话框中处理字段和变量的转换
 */
function svarorfield(){
	var styleObj=getObj("PRN_fieldstyle");
	if(styleObj.all.ssfield.checked){
		styleObj.all.variables.style.display = "none";
	}
	if(styleObj.all.ssparameter.checked){
		styleObj.all.variables.style.display = "none";
	}
	if(styleObj.all.ssvariable.checked){
		styleObj.all.variables.style.display = "";
		var fObj = getObj(nowDivID);
		var vartype = fObj.getAttribute("vartype");
		styleObj.all.vartype.value = vartype==null?"java.lang.String":vartype;
		var caltype = fObj.getAttribute("caltype");
		styleObj.all.caltype.value = caltype==null?"Nothing":caltype;
		var resettype = fObj.getAttribute("resettype");
		styleObj.all.resettype.value = resettype==null?"None":resettype;
		var vexpression= fObj.getAttribute("vexpression");
		styleObj.all.vexpression.value = vexpression==null?"":vexpression;
	}
}
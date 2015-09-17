
/**直线元素的处理，画直线，直线拖动，直线设置对话框
 * 图形元素的处理，上传图片，图形拖动，图形元素设置对话框
 */
var lineAtObj=null;	//直线所在区域对象
var lineSign=0;			//画直线标志
var lineFromPos;		//直线起点
var lineToPos;			//直线终点
var lineName;				//直线ID
var xo = 0 ;
var yo = 0 ;
var Ox = -1 ;
var Oy = -1 ;
var rad = Math.PI/180 ;
var color = "#333333" ;
var font_size="3px";
var lineDragObject=null;//直线拖动对象
var checkZIndex = true;
var lineDragFlag=false;//直线拖动标志
var lineObj=null;//直线对象
var lineMenuObj=null;//直线属性设置对话框对象

//画直线调用函数
function insertLine()
{
	if(nowBodyID==null){
		alert("请先选择区域!");
		return;
		}
	else{if (nowBodyID=="rpbody"){
		alert("不能选择表体设计区!");
		return;
		}
	}
	var obj=getObj(nowBodyID);
	lineAtObj=obj;
	lineSign=1;

}
//取得直线起点坐标
function getLineFromPos() {
	lineFromPos=new Array();
	var contentDiv=document.getElementById("contentDiv");
	lineFromPos[0]=window.event.clientX-87+23+2+contentDiv.scrollLeft;
	lineFromPos[1]=window.event.clientY-67+19+2+contentDiv.scrollTop;
}
//取得直线终点坐标
function getLineToPos(){
	lineToPos=new Array();
	var contentDiv=document.getElementById("contentDiv");
	lineToPos[0]=window.event.clientX-87+23+2+contentDiv.scrollLeft;
	lineToPos[1]=window.event.clientY-67+19+2+contentDiv.scrollTop;
	createLine();
	lineAtObj=null;
	lineSign=0;
}
//画直线
function createLine(){
	var x=lineFromPos[0];
	var y=lineFromPos[1];
	var w=lineToPos[0];
	var h=lineToPos[1];
	lineName=getLineID();
	var direction=getLineDirection(x,y,w,h);
	var pen=font_size;
	createLineDiv(x,y,1,1,direction,pen);
	Line(0,0,w-x,h-y) ;
	init();
}
function getLineID(){
	var lid="PRN_LINE_";
	var lidnum=getDivID();
	var lid0;
	var checkObj;
	while(true){
		lid0=lid+lidnum;
		checkObj=getObj(lid0);
		if(checkObj==null)
			break;
		lidnum++;
	}
	lid+=lidnum;
	return lid;
}
function getLineDirection(x,y,w,h){
	var k;
	var lineDirection;
	if(x==w){
		 k=0;
	}
	else{
		 k=(h-y)/(w-x);
	}
	if(k>0){
		 lineDirection="TopDown";
	}
	else{
		 lineDirection="BottomUp";
	}
	return lineDirection;
}
//画直线所在的DIV
function createLineDiv(x,y,w,h,direction,pen){
	var linediv = document.createElement("DIV");
	linediv.id=lineName;
	linediv.className=lineName;
	linediv.style.position = "absolute";
	linediv.style.left =x;
	linediv.style.top =y;
	linediv.style.width =w;
	linediv.style.height =h;
	linediv.style.borderWidth="1px";
	linediv.style.backgroundColor ="#ffffff";
	linediv.style.visibility = "visible";
	linediv.style.padding= "0px 0px 0px 0px";
	linediv.style.fontSize="14px";

	linediv.setAttribute("lineToX", lineToPos[0]);
	linediv.setAttribute("lineToY", lineToPos[1]);
	linediv.setAttribute("poid",lineAtObj.id);
	linediv.setAttribute("varflag","3");
	linediv.setAttribute("direction",direction);
	linediv.setAttribute("pen",pen);
	linediv.style.color = color;
	var obj=document.getElementById(lineAtObj.id);
	obj.appendChild(linediv);
}
function Line(x1,y1,x2,y2) {
	x2 = Math.round(x2) ;
	y2 = Math.round(y2) ;
	xo = x2 ;
	yo = y2 ;
	var str = "" ;
	var i=0 ;

	var x = x1 ;
	var y = y1 ;
	dx = Math.abs(x2-x1) ;
	dy = Math.abs(y2-y1) ;
	s1 = sign(x2-x1) ;
	s2 = sign(y2-y1) ;

	if(dx==0 || dy==0) {
	ShowLine(x1,y1,x2-x1,y2-y1) ;
	return ;
	}

	if(dx>dy) {
	temp = dx ;
	dx = dy ;
	dy = temp ;
	key = 1 ;
	}
	else
	key = 0;
	e=2*dy-dx ;

	for(i=0;i<dx;i++) {
	px = 0 ;
	py = 0 ;
	Plot(x,y) ;
	while(e>=0) {
	if(key==1) {
	x += s1 ;
	px += s1 ;
	}else {
	y += s2 ;
	py += s2 ;
	}
	e = e-2*dx ;
	}
	if(key==1)
	y += s2 ;
	else
	x += s1 ;
	e = e+2*dy ;

	}
}

function sign(n) {
	if(n>0)
	return 1;
	if(n<0)
	return -1 ;
	return n ;
}

function ShowLine(x,y,w,h) {
	if(w<0) {
	x += w ;
	w = Math.abs(w) ;
	}
	if(h<0) {
	y += h ;
	h = Math.abs(h) ;
	}
	if(w<1) w=1;
	if(h<1) h=1;

	outPlot(x,y,Math.round(w),Math.round(h));
}

function Plot(x,y) {
	outPlot(x,y,1,1);
	if(Ox>=0 || Oy>=0) {
	ShowLine(Ox,Oy,x-Ox,y-Oy);
	}
	Ox = x ;
	Oy = y ;
}
//由SPAN的点组成直线
function outPlot(x,y,w,h) {
	var sp=	document.createElement("SPAN");
	sp.id=lineName;
	sp.className=lineName;
	sp.style.position = "absolute";
	sp.style.left =x;
	sp.style.top =y;
	sp.style.height=h;
	sp.style.width=w;
	sp.style.backgroundColor =color;
	sp.style.fontSize=font_size;

	var lineDiv=document.getElementById(lineName);
	lineDiv.appendChild(sp);

}
function init(){
	 xo=0;
	 yo=0;
	 Ox=-1;
	 Oy=-1;
	 rad =Math.PI/180;
	 color="#333333";
	 font_size="3px";
}
//直线拖动处理
function lineDragMouseDown(){
		//if (checkZIndex) makeOnTop(lineDragObject);
		lineDragFlag=true;
		var ty = window.event.clientY - parseInt(lineDragObject.offsetTop);
		var tx = window.event.clientX - parseInt(lineDragObject.offsetLeft);
		var tw = window.event.clientX - lineDragObject.getAttribute("lineToX");
		var th = window.event.clientY - lineDragObject.getAttribute("lineToY");
		lineDragObject.setAttribute("tx",tx);
		lineDragObject.setAttribute("ty",ty);
		lineDragObject.setAttribute("th",th);
		lineDragObject.setAttribute("tw",tw);
}

function lineDragMouseMove(){
	//if (window.event.clientX >= 0 && window.event.clientY >= 0) {
	lineDragObject.style.left = window.event.clientX - lineDragObject.getAttribute("tx");
	lineDragObject.style.top = window.event.clientY - lineDragObject.getAttribute("ty");
	//}
}

function lineDragMouseUp(){
//	if (window.event.clientX >= 0 && window.event.clientY >= 0) {
						var lineToX = window.event.clientX - lineDragObject.getAttribute("tw");
			var lineToY = window.event.clientY - lineDragObject.getAttribute("th");
			lineDragObject.setAttribute("lineToX",lineToX);
			lineDragObject.setAttribute("lineToY",lineToY);
	//	lineDragObject.style.left = window.event.clientX -lineDragObject.getAttribute("tx");
	//	lineDragObject.style.top = window.event.clientY - lineDragObject.getAttribute("ty");
	//	}
	if(lineDragObject) {
		lineDragObject = null;
		lineDragFlag=false;
	}
}

function makeOnTop(eobj) {
	if(nowBodyID==null)
		return;
	var newobj = eobj ;
  var pobj = eobj.parentElement ;
  if(eobj.tagName=="SPAN" && pobj.id!=null && pobj.id.indexOf("PRN_FIELD_")==0){
  	newobj = pobj ;	
  }
  if(eobj.tagName=="SPAN" && pobj.id!=null && pobj.id.indexOf("PRN_LINE_")==0){
  	newobj = pobj ;	
  }  
	if(newobj.id.indexOf("PRN_FIELD_")!=-1||newobj.id.indexOf("PRN_LINE_")!=-1
			||newobj.id.indexOf("PRN_PICTURE_")!=-1){
		var daiz;
		var max = 0;
		var nowBodyObj = getObj(nowBodyID);
		for (var i=0; i<nowBodyObj.childNodes.length; i++) {
			daiz = nowBodyObj.childNodes[i].style.zIndex;
			if (daiz != "" && daiz > max)
				max = daiz;
		}
		newobj.style.zIndex = max + 1;
	}
}
function writelineDirection(){
	 var lineDirection = "";
	 lineDirection += "<OPTION value=\"TopDown\">";
	 lineDirection += "TopDown</option>";
	 lineDirection += "<OPTION value=\"BottomUp\">";
	 lineDirection += "BottomUp</option>";
	 return  lineDirection;
}

function setlineDirectionSelect(x1,y1,x2,y2,lineMenuObj){
	var lineDirection=getLineDirection(x1,y1,x2,y2);
	var listObj = lineMenuObj.all.lineDirection;
	for(var i = 0;i<listObj.length;i++){
		if(listObj.options[i].text == lineDirection){
			listObj.selectedIndex = i;
			break;
		}
	}
}
function changelineDirection(){
	if(lineObj!=null){
	var x = parseInt(lineObj.style.left) ;
	var y = parseInt(lineObj.style.top) ;
	var w = lineObj.getAttribute("lineToX");
	var h = lineObj.getAttribute("lineToY");
	var t=y;
	y=h;
	h=t;
	color = lineObj.firstChild.style.backgroundColor;
	font_size = lineObj.firstChild.style.fontSize;
	lineToPos[0]=w;
	lineToPos[1]=h;
	lineAtObj=lineObj.parentElement;
	lineName=lineObj.id;
	lineObj.parentElement.removeChild(lineObj);
	var direction=getLineDirection(x,y,w,h);
	var pen=font_size;
	createLineDiv(x,y,1,1,direction,pen);
	Line(0,0,w-x,h-y) ;
	init();
	lineObj=document.getElementById(lineName);
	var areaId = lineObj.getAttribute("poid") ;
	var areaObj = document.getElementById(areaId) ;
	var left = x - areaObj.offsetLeft ;
	left = pixelToMm(left*100)/100 ;
	var top = y - areaObj.offsetTop ;
	top = pixelToMm(top*100)/100 ;
	var width = w - areaObj.offsetLeft ;
	width = pixelToMm(width*100)/100 ;
	var height = h - areaObj.offsetTop ;
	height = pixelToMm(height*100)/100 ;
	lineMenuObj.all.left.value = left ;
	lineMenuObj.all.top.value = top ;
	lineMenuObj.all.width.value = width ;
	lineMenuObj.all.height.value =  height ;
	}
}
function writelinePen(){
	var linePen = "";
	linePen += "<OPTION value=\"1px\">";
	linePen += "1Point</option>";
	linePen += "<OPTION value=\"2px\">";
	linePen += "2Point</option>";
	linePen += "<OPTION value=\"3px\">";
	linePen += "3Point</option>";
	linePen += "<OPTION value=\"4px\">";
	linePen += "4Point</option>";
	return  linePen;
}

function writelinePen2(){
	var linePen = "";
	linePen += "<OPTION value=\"0px\">";
	linePen += "无</option>";
	linePen += "<OPTION value=\"1px\">";
	linePen += "1Point</option>";
	linePen += "<OPTION value=\"2px\">";
	linePen += "2Point</option>";
	linePen += "<OPTION value=\"3px\">";
	linePen += "3Point</option>";
	linePen += "<OPTION value=\"4px\">";
	linePen += "4Point</option>";
	return  linePen;
}

function setlinePenSelect(linepen1,lineMenuObj){
	var linepen;
	if(linepen1=="1px"){
		 linepen="1Point";
	}
	else if(linepen1=="2px"){
		 linepen="2Point";
	}
	else if(linepen1=="3px"){
		 linepen="3Point";
	}
	else if(linepen1=="4px"){
		 linepen="4Point";
	}
	var listObj = lineMenuObj.all.linePen;
	for(var i = 0;i<listObj.length;i++){
		if(listObj.options[i].text == linepen){
			listObj.selectedIndex = i;
			break;
		}
	}
}
function changelinePen(){
	var listObj = lineMenuObj.all.linePen;
	var fsize=listObj.options[listObj.selectedIndex].value
	for(i=0;i<lineObj.childNodes.length;i++)
		lineObj.childNodes[i].style.fontSize=fsize;
	lineObj.setAttribute("pen",fsize);
}

//用于调整直线属性
function getLineStyle(lObj){
	popflag=true; //弹出菜单打开标志
	lineMenuObj=getObj("PRN_linestyle");
	lineMenuObj.style.display="";
	setPopMenuPos(lineMenuObj);

	var x1 = parseInt(lObj.style.left);
	var y1 = parseInt(lObj.style.top);
	var x2 = lObj.getAttribute("lineToX");
	var y2 = lObj.getAttribute("lineToY");
	var poid=lObj.getAttribute("poid");
	lineMenuObj.all.area.value=getAreaName(poid);
	lineMenuObj.all.backcolor.value = lObj.firstChild.style.backgroundColor;
	appendSelectDivColor(lineMenuObj.all.backcolor);
	var linepen1 = lObj.firstChild.style.fontSize;
	setlineDirectionSelect(x1,y1,x2,y2,lineMenuObj);
	//alert(document.all.top.value);
	if(x1>x2){
	var t=x1;x1=x2;x2=t;
			t=y1;y1=y2;y2=t;
	}
	var areaId = lObj.getAttribute("poid") ;
	var areaObj = document.getElementById(areaId) ;
	var left = x1 - areaObj.offsetLeft ;
	left = pixelToMm(left*100)/100 ;
	var top = y1 - areaObj.offsetTop ;
	top = pixelToMm(top*100)/100 ;
	var width = x2 - areaObj.offsetLeft ;
	width = pixelToMm(width*100)/100 ;
	var height = y2 - areaObj.offsetTop ;
	height = pixelToMm(height*100)/100 ;
	lineMenuObj.all.left.value = left ;
	lineMenuObj.all.top.value = top ;
	lineMenuObj.all.width.value = width ;
	lineMenuObj.all.height.value = height;
	setlinePenSelect(linepen1,lineMenuObj);
}

function deleteLine(){
	nowDivID=null;
	lineObj.parentElement.removeChild(lineObj);
	lineMenuObj.style.display="none"
	lineObj=null;
	lineAtObj=null;
	init();
}

function setLineStyle(){
	if(lineObj!=null){
		var areaId = lineObj.getAttribute("poid") ;
	  var areaObj = document.getElementById(areaId) ;
		var x = mmToPixel(lineMenuObj.all.left.value) + areaObj.offsetLeft ;
	 	var y = mmToPixel(lineMenuObj.all.top.value) + areaObj.offsetTop ;
	 	var w = mmToPixel(lineMenuObj.all.width.value) + areaObj.offsetLeft;
	 	var h = mmToPixel(lineMenuObj.all.height.value) + areaObj.offsetTop ;
		color = lineMenuObj.all.backcolor.value;
	 	var listObj1 = lineMenuObj.all.linePen;
	 	font_size = listObj1.options[listObj1.selectedIndex].value;
		lineToPos[0]=w;
	 	lineToPos[1]=h;
		lineAtObj=lineObj.parentElement;
	 	lineName=lineObj.id;
	 	lineObj.parentElement.removeChild(lineObj);
	 	var direction=getLineDirection(x,y,w,h);
		var pen=font_size;
		createLineDiv(x,y,1,1,direction,pen);
	 	Line(0,0,w-x,h-y) ;
	 	init();
	 	lineObj=document.getElementById(lineName);
	 	}
}

function getAreaName(id){
	if(id=="pageheader"){
		return "页眉设计区"
	}
	else if(id=="rpheader"){
		return "表头设计区"
	}
	else if(id=="rpbody"){
		return "表体设计区"
	}
	else if(id=="rpfooter"){
		return "表尾设计区"
	}
	else if(id=="pagefooter"){
		return "页脚设计区"
	}
	else if(id=="GPHeader"){
		return "组头设计区"
	}
	else if(id=="GPFooter"){
		return "组尾设计区"
	}
	else {
		return ""
		}
}

function writeFontSize(){
	 var size = "";
	 for(var i=3;i<=48;){
	 	if(i==12) size += "<OPTION value="+i+" selected>";
	 	else	size += "<OPTION value="+i+">";
	 	size += i+"px"+"</option>";
	 	if(i==5){ i+=3; }
	 	else if(i==18) { i+=6; }
	 	else if(i==24||i==36) { i+=12; }
	 	else if(i==10||i==11) { i+=1; }
	 	else { i+=2; }
	 }
	 return  size;
}

function setFontSizeSelect(fsize,MenuObj){
	var listObj = MenuObj.all.fsize;
	for(var i = 0;i<listObj.length;i++){
		if(listObj.options[i].text == fsize){
			listObj.selectedIndex = i;
			break;
		}
	}
}
/*
function clickStretchOverflow(){
	if(document.all.stretchOverflow.checked == false){
		document.all.stretch.style.display = "none";
		}
	else if(document.all.stretchOverflow.checked == true){
		document.all.stretch.style.display = "";
		}
	}
	*/
//设置直线为特殊的直线：水平线、垂直线
function setSpecLine(){
	var areaId = lineObj.getAttribute("poid") ;
	var areaObj = document.getElementById(areaId) ;
	var x = mmToPixel(lineMenuObj.all.left.value) + areaObj.offsetLeft ;
	var y = mmToPixel(lineMenuObj.all.top.value) + areaObj.offsetTop ;
	var w = mmToPixel(lineMenuObj.all.width.value) + areaObj.offsetLeft;
	var h = mmToPixel(lineMenuObj.all.height.value) + areaObj.offsetTop ;
	color = lineMenuObj.all.backcolor.value;
	var listObj1 = lineMenuObj.all.linePen;
	font_size = listObj1.options[listObj1.selectedIndex].value;
	lineAtObj=lineObj.parentElement;
	lineName=lineObj.id;
	lineObj.parentElement.removeChild(lineObj);
	if(lineMenuObj.all.horizontalLine.checked){
		h=y;
		//lineMenuObj.all.height.value=h;
		}
	if(lineMenuObj.all.verticalLine.checked){
		 w=x;
		 //lineMenuObj.all.width.value=w;
		 }
	if(lineMenuObj.all.recover.checked){
		//w=temp[0];
		//h=temp[1];
		//lineMenuObj.all.width.value=w;
		//lineMenuObj.all.height.value=h;
	}
	lineToPos[0]=w;
	lineToPos[1]=h;
	var direction=getLineDirection(x,y,w,h);
	var pen=font_size;
	createLineDiv(x,y,1,1,direction,pen);
	Line(0,0,w-x,h-y) ;
	init();
	lineObj=document.getElementById(lineName);
}

/**
* 设置图形
*/
function setPicture(){
	if(nowBodyID==null){
		alert("请先选择区域!");
		return;
		}
	else{if (nowBodyID=="rpbody"){
		alert("不能选择表体设计区!");
		return;
		}
	}
	var result = showModalDialog("dispatcher.action?function=PrnSetPicdesigner",null,"status:no;dialogWidth:360px;dialogHeight:180px");
	if(!result){
		//alert("信息"+result);
		return;
	}
	var obj=getObj(nowBodyID);
	var pid=getPictureID();
	createPicDiv(pid);
	var fileName = result[0];
	var picWidth = result[1];
	var picHeight = result[2];
	var fileId = result[3];
	if(!fileId){
		var date = new Date();
		fileId = "" + date;
	}
	var picDiv = document.getElementById(pid);
	if(picWidth){
		picDiv.style.width = parseInt(picWidth);
	}
	if(picHeight){
		picDiv.style.height = parseInt(picHeight);
	}
	if(fileName){
		bgPicFileId = fileId;
		var urlStr = "fileDownload.action?fileid=" + parseInt(fileId);
		picDiv.style.backgroundImage = 'url(' + urlStr + ')';
	}else{
	picDiv.style.background = '';
	}
	picDiv.setAttribute("picId",parseInt(fileId));
	picDiv.setAttribute("varflag","5");
	var areaheight=parseInt(picDiv.offsetTop)-parseInt(obj.offsetTop)+parseInt(picDiv.style.height);
	if (obj.offsetHeight<areaheight)
		templatearea(nowBodyID,pixelToMm(areaheight+2));
	//alert(picDiv.outerHTML);
}

function getPictureID(){
	var Pid="PRN_PICTURE_";
	var Pidnum=getDivID();
	var Pid0;
	var checkObj;
	while(true){
		Pid0=Pid+Pidnum;
		checkObj=getObj(Pid0);
		if(checkObj==null)
			break;
		Pidnum++;
	}
	Pid+=Pidnum;
	return Pid;
}

function createPicDiv(pid){
	var linediv = document.createElement("DIV");
	linediv.id=pid;
	linediv.className=pid;
	linediv.style.position = "absolute";
	linediv.style.width =80;
	linediv.style.height =80;
	linediv.style.borderWidth="1px";
	linediv.style.borderStyle="dashed"
	linediv.style.backgroundColor ="#ffffff";
	linediv.style.visibility = "visible";
	linediv.style.padding= "0px 0px 0px 0px";
	linediv.style.fontSize="14px";
	linediv.setAttribute("poid",nowBodyID);
	var obj=document.getElementById(nowBodyID);
	obj.appendChild(linediv);
}

function getPicStyle(pobj){
	popflag=true; //弹出菜单打开标志
	picMenuObj=getObj("PRN_picstyle");
	picMenuObj.style.display="";
	setPopMenuPos(picMenuObj);
	var Area=pobj.getAttribute("poid");
	picMenuObj.all.area.value=getAreaName(Area);
	var areaId = pobj.getAttribute("poid") ;
	var areaObj = document.getElementById(areaId) ;
	var left = pobj.offsetLeft - areaObj.offsetLeft ;
	left = pixelToMm(left*100)/100 ;
	picMenuObj.all.left.value = left ;
	var top = pobj.offsetTop - areaObj.offsetTop ;
	top = pixelToMm(top*100)/100 ;
	picMenuObj.all.top.value = top ;
	picMenuObj.all.width.value = pixelToMm(pobj.offsetWidth*100)/100 ;
	picMenuObj.all.height.value = pixelToMm(pobj.offsetHeight*100)/100 ;
	var scaleImage= pobj.getAttribute("scaleImage");
	if(scaleImage==null||scaleImage=="RetainShape")
		picMenuObj.all.RetainShape.checked=true;
	else if(scaleImage=="FillFrame")
		picMenuObj.all.FillFrame.checked=true;
	else
		picMenuObj.all.Clip.checked=true;
	var vexpression = pobj.getAttribute("vexpression");
	if(vexpression == null)
		vexpression = "";
	picMenuObj.all.vexpression.value = vexpression;
	
	var pen = pobj.getAttribute("pen");
	if(!pen)
		pen = "1px";
	picMenuObj.all.linePen.value = pen;
}

function deletePic(objid){
	nowDivID=null;
	var fobj=getObj(objid);
	fobj.outerHTML="";
	var styleObj=getObj("PRN_picstyle");
	styleObj.style.display="none"
}

function setPicStyle(){
	picMenuObj=getObj("PRN_picstyle");
	var pobj=getObj(nowDivID);
	var areaId = pobj.getAttribute("poid") ;
	var areaObj = document.getElementById(areaId) ;
	var left = mmToPixel(picMenuObj.all.left.value) + areaObj.offsetLeft ;
	pobj.style.left = left ;
	var top = mmToPixel(picMenuObj.all.top.value) + areaObj.offsetTop ;
	pobj.style.top = top ;
	pobj.style.width = mmToPixel(picMenuObj.all.width.value);
	pobj.style.height = mmToPixel(picMenuObj.all.height.value);
	if(picMenuObj.all.RetainShape.checked)
		 pobj.setAttribute("scaleImage","RetainShape");
	else if(picMenuObj.all.FillFrame.checked)
		 pobj.setAttribute("scaleImage","FillFrame");
	else
		 pobj.setAttribute("scaleImage","Clip");
	var vexpression = picMenuObj.all.vexpression.value;
	pobj.setAttribute("vexpression", vexpression);
	
	var pen = picMenuObj.all.linePen.value;
	pobj.setAttribute("pen", pen);
}


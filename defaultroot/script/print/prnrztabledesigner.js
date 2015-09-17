
/**利用鼠标、键盘改变表格大小
 * 效果与列表页面改变表格大小基本一致 
 */

var dipx=6;  //X 方向的偏差
var dipy=6; //Y 方向的偏差
var cursorip=20; //移动有效偏差
var pdim= new Array(2); //parent dimen,记录当前父节点(table)位置标识，left,top
var overflag=false;
var dipshow=5;//鼠标形状改变的偏差
var rowPos;//记录行位置
var colPos;//记录列位置
var tabPos;//记录表格位置
var rztableX=0;//鼠标拖动起点X
var rztableY=0;//鼠标拖动起点Y
var sign=0;//改变表格大小标志
var rzObj;//当前单元格对象
var cursorSign;//鼠标形状标志

/**
* 光标在表上
*/
function mouseIntoTable(){
	if(tableOpenFlag==true)
  	return;
 	var obj=event.srcElement;
  if(obj.tagName.indexOf("TD")==0 ){  
  	obj.style.cursor="move"; 
		var tbobj=obj.parentElement.parentElement.parentElement;
		var bobj=getObj(tbobj.poid);
		var pbobj=bobj.parentElement;
		if(tbobj.width==0)
  		tbobj.width=tbobj.offsetWidth;
 		pdim[0]=tbobj.offsetLeft+pbobj.offsetLeft+dipx;
  	pdim[1]=tbobj.offsetTop+pbobj.offsetTop  +dipy;
		overflag=true;
	}
}
/**
* 光标离开表格
*/
function mouseOffTable(){
	if(tableOpenFlag==true)
		 return;
 	var obj=event.srcElement;
  if(obj.tagName=="TABLE"){
  	obj.style.cursor="";
  }
}
//得到当前TD 的父节点TABLE的坐标
function initParentDim(pobj){
	pdim[0]=pobj.offsetLeft+dipx;
	pdim[1]=pobj.offsetTop+dipy;
}
//返回当前TD 所在绝对坐标位置
function getCursorDim(obj){
	var odim= new Array(2);
  odim[0]=pdim[0]+obj.offsetLeft;
	odim[1]=pdim[1]+obj.offsetTop;
  odim[2]=obj.offsetWidth;
	odim[3]=obj.offsetHeight;
	return odim;
}
//返回对象的位置
function getPosition(obj){
	var pos=new Array(4);
	pos[0]=obj.offsetLeft;
 	pos[1]=obj.offsetTop;
  pos[2]=obj.offsetWidth;
  pos[3]=obj.offsetHeight;
	return pos;	
}
//保存表格改变前的位置
function rzTableBefore(rzObj){
	var tableObj=rzObj.parentElement.parentElement.parentElement;
	colPos=new Array(tableObj.rows[0].cells.length)
	rowPos=new Array(tableObj.rows.length)
	tabPos=getPosition(tableObj);
	for(var i=0; i<tableObj.rows[0].cells.length;i++){
		colPos[i]=getPosition(tableObj.childNodes[0].childNodes[0].childNodes[i]);
		}
	for(var j=0; j<tableObj.rows.length;j++){
		rowPos[j]=getPosition(tableObj.childNodes[0].childNodes[j])
	}
}
//鼠标移动时的形状变化
function rzTableMove(){
	try{
  	var obj=event.srcElement;
		dispPos("mo:"+event.clientX,event.clientY);
		if(obj.tagName.indexOf("TD")!=-1){ //td,tr,tbody,table
			var trobj=obj.parentElement;
			var tbobj=trobj.parentElement.parentElement;
			var bobj=getObj(tbobj.poid);
			var pbobj=bobj.parentElement;
			var mkey=event.button;  // mouse key code 1,2
			var objdim=getCursorDim(obj);
		 	var bottom1=objdim[1]+objdim[3];  //下边界,y
		 	var right1= objdim[0]+objdim[2];  //右边界,x
		 	var contentDiv=document.getElementById("contentDiv");
		 	var curX=event.clientX-34+contentDiv.scrollLeft;
		 	var curY=event.clientY+2+contentDiv.scrollTop;
		 	var isLastRow,isFirstRow,isLastCol,isFirstCol;
			if(trobj.rowIndex==0)  //第一行
      			isFirstRow=true;
      else
      			isFirstRow=false;
      if(trobj.rowIndex== (tbobj.rows.length-1) ) //最后一行
						isLastRow=true;
      else
       			isLastRow=false;
     	if(obj.cellIndex==0)  //第一列
						isFirstCol=true;
      else
						isFirstCol=false;
      if(obj.cellIndex==trobj.cells.length-1)  //最后一列
      			isLastCol=true;
      else
      			isLastCol=false;
      if( isFirstRow && isFirstCol &&
      			(curX-objdim[0]>-3&&curX-objdim[0]<=8)
      			&&(curY-objdim[1]>-3)&&(curY-objdim[1]<=8) )
     				obj.style.cursor="se-resize";           //左上角
     			
     	else if(isLastRow && isFirstCol &&
     				(curY-bottom1>=-dipshow&&curY-bottom1<0)
						&&curX-objdim[0]>-3&&curX-objdim[0]<=8)   //左下角
      			obj.style.cursor="sw-resize";
			else if(isFirstRow && isLastCol &&
      			(curY-objdim[1]>-3)&&(curY-objdim[1]<=8)
			 			&&(curX-right1>=-dipshow)&&(curX-right1<0))
      	    obj.style.cursor="sw-resize";           //右上角
			else if(isLastRow && isLastCol &&
						(curX-right1>=-dipshow)&&(curX-right1<0)
						&&(curY-bottom1>=-dipshow&&curY-bottom1<0))
						obj.style.cursor="se-resize";            //右下角
      //else if(isFirstCol&&curX-objdim[0]>-3&&curX-objdim[0]<5){ 
			//obj.style.cursor="col-resize";firstSign=1; }	    //第一列
			else if((curX-right1>=-dipshow)&&(curX-right1<0))
						obj.style.cursor="col-resize";             
			//else if(isFirstRow&&(curY-objdim[1]>-3)&&(curY-objdim[1]<5)){
			//obj.style.cursor="row-resize"; firstSign=1; }       //第一行
			else if(curY-bottom1>=-dipshow&&curY-bottom1<0)
						obj.style.cursor="row-resize";
			else 	obj.style.cursor="move";
		 	}
}
	catch(e){
		alert("move error -113:"+e);
	}
	
}
//改变表格大小
function rzTableMoveTo(rzObj,cursorSign){
	try{
		var trObj=rzObj.parentElement;
  	var tdIndex = rzObj.cellIndex;
		var trIndex = rzObj.parentElement.rowIndex;
   	rztableToX = event.clientX ;
		rztableToY = event.clientY ;
		var ipx=(rztableToX - rztableX);
		var ipy=(rztableToY - rztableY);	
		var isLastRow,isFirstRow,isLastCol,isFirstCol;
		if(trObj.rowIndex==0)  //第一行
      		isFirstRow=true;
    else
      		isFirstRow=false;
    if(trObj.rowIndex== (trObj.parentElement.rows.length-1) ) //最后一行
					isLastRow=true;
    else
       		isLastRow=false;
    if(rzObj.cellIndex==0)  //第一列
					isFirstCol=true;
    else
					isFirstCol=false;
		if(rzObj.cellIndex==trObj.cells.length-1)  //最后一列
      		isLastCol=true;
    else
      		isLastCol=false;
    if(cursorSign=="row-resize"){
      		if(ipy!=0){
      			moveVertical(trObj,ipy,trIndex);
      			}
		}
    else if(cursorSign=="col-resize"){
					if(ipx!=0){
						moveHorizon(trObj,ipx,tdIndex);
						}
 		}
	  else {
					rsTable(trObj,ipx,ipy,isFirstRow,isFirstCol,isLastRow,isLastCol);
		}
    }
	catch(e){
		alert("move error -113:"+e);
	}
}
//水平移动
function moveHorizon(trObj,ipx,tdIndex){
	var tableObj=trObj.parentElement.parentElement;
	//colPos[tdIndex][2]=colPos[tdIndex][2]+ipx;
	//for(var i=tdIndex+1;i<tableObj.rows[0].cells.length;i++){
	//	colPos[i][0]=colPos[i][0]+ipx;
	//}
	//tabPos[2]=tabPos[2]+ipx;
	//rzTableAfter(tableObj);
	rzGroupColWidth(tableObj,ipx,tdIndex);
}
//垂直移动
function moveVertical(trObj,ipy,trIndex){
	var tableObj=trObj.parentElement.parentElement;
	trIndex = getTBRowSpans(rzObj) ;
	rowPos[trIndex][3]=rowPos[trIndex][3]+ipy;
	for(var i=trIndex+1;i<tableObj.rows.length;i++){
		rowPos[i][1]=rowPos[i][1]+ipy;
	}
	tabPos[3]=tabPos[3]+ipy;
	rzTableAfter(tableObj);
}
//表格改变大小后重画表格
function rzTableAfter(tableObj){
	for(var j=0; j<tableObj.rows.length;j++){
		tableObj.childNodes[0].childNodes[j].style.left=rowPos[j][0];
		tableObj.childNodes[0].childNodes[j].style.top=rowPos[j][1];
		//tableObj.childNodes[0].childNodes[j].width=rowPos[j][2];
		tableObj.childNodes[0].childNodes[j].height=rowPos[j][3];
	}
	//var groupCol = tableObj.lastChild;
	//var childLength = groupCol.childNodes.length;
	for(var i=0; i<tableObj.rows[0].cells.length;i++){
		tableObj.childNodes[0].childNodes[0].childNodes[i].style.left=colPos[i][0];
		tableObj.childNodes[0].childNodes[0].childNodes[i].style.top=colPos[i][1];
		tableObj.childNodes[0].childNodes[0].childNodes[i].width=colPos[i][2];
		//tableObj.childNodes[0].childNodes[0].childNodes[i].height=colPos[i][3];
	}
	tableObj.style.left=tabPos[0];
	tableObj.style.top=tabPos[1];
	tableObj.style.width=tabPos[2];
	tableObj.style.height = tabPos[3];
	for(var i=0; i<tableObj.rows[0].cells.length;i++){
  		colPos[i]=null;
		}
 	for(var i=0; i<tableObj.length;i++){
  		rowPos[i]=null;
		}	
  	tabPos=null;
}
//拖动表格四角改变表格大小
function rsTable(trObj,ipx,ipy,isFirstRow,isFirstCol,isLastRow,isLastCol){
	var tableObj=trObj.parentElement.parentElement;
	if(isFirstRow&&isFirstCol){
      		tabPos[0]=tabPos[0]+ipx;
      		tabPos[1]=tabPos[1]+ipy;
      		tabPos[2]=tabPos[2]-ipx;
      		tabPos[3]=tabPos[3]-ipy;
      		for(var i=0;i<tableObj.rows.length;i++){
      			if(i!=0){
								rowPos[i][1]=rowPos[i][1]+ipy/(tableObj.rows.length);}
								rowPos[i][3]=rowPos[i][3]-ipy/(tableObj.rows.length);
							}
					for(var i=0;i<tableObj.rows[0].cells.length;i++){
						if(i!=0){
								colPos[i][0]=colPos[i][0]+ipx/(tableObj.rows[0].cells.length);
							}
					colPos[i][2]=colPos[i][2]-ipx/(tableObj.rows[0].cells.length);
					}
	}
	else if(isLastRow&&isFirstCol){
					tabPos[0]=tabPos[0]+ipx;
      		tabPos[2]=tabPos[2]-ipx;
      		tabPos[3]=tabPos[3]+ipy;
      		for(var i=0;i<tableObj.rows.length;i++){
      			if(i!=0){
							rowPos[i][1]=rowPos[i][1]+ipy/(tableObj.rows.length);
						}
					rowPos[i][3]=rowPos[i][3]+ipy/(tableObj.rows.length);
					}
					for(var i=0;i<tableObj.rows[0].cells.length;i++){
						if(i!=0){
							colPos[i][0]=colPos[i][0]-ipx/(tableObj.rows[0].cells.length);
						}
					colPos[i][2]=colPos[i][2]-ipx/(tableObj.rows[0].cells.length);
					  }
	}
  else if(isFirstRow&&isLastCol){
        	tabPos[1]=tabPos[1]+ipy;
      		tabPos[2]=tabPos[2]+ipx;
      		tabPos[3]=tabPos[3]-ipy;
      		for(var i=0;i<tableObj.rows.length;i++){
      			if(i!=0){
							rowPos[i][1]=rowPos[i][1]-ipy/(tableObj.rows.length);
						}
					rowPos[i][3]=rowPos[i][3]-ipy/(tableObj.rows.length);
					}
					for(var i=0;i<tableObj.rows[0].cells.length;i++){
						if(i!=0){
							colPos[i][0]=colPos[i][0]+ipx/(tableObj.rows[0].cells.length);
						}
					colPos[i][2]=colPos[i][2]+ipx/(tableObj.rows[0].cells.length);
					}
	}
	else if(isLastRow&&isLastCol){
					tabPos[2]=tabPos[2]+ipx;
      		tabPos[3]=tabPos[3]+ipy;
      		for(var i=0;i<tableObj.rows.length;i++){
      			if(i!=0){
							rowPos[i][1]=rowPos[i][1]+ipy/(tableObj.rows.length);
						}
					rowPos[i][3]=rowPos[i][3]+ipy/(tableObj.rows.length);
					}
					for(var i=0;i<tableObj.rows[0].cells.length;i++){
						if(i!=0){
							colPos[i][0]=colPos[i][0]+ipx/(tableObj.rows[0].cells.length);
						}
					colPos[i][2]=colPos[i][2]+ipx/(tableObj.rows[0].cells.length);
					}
	}
  rzTableAfter(tableObj);
}
function setValue(id,value){
 var iobj=document.getElementById(id);
 iobj.value=value;
}
/**
 * 根据当前的TD对象得到,第一行的对应的 TD对象
 * @return
 */
function getrzTdObj(tbobj,tdobj){
	 var cellIndex=tdobj.cellIndex;
   return tbobj.rows(0).cells(cellIndex);
}
function selectStTable(){
	return false;
}
/*
 *通过调整表格中colgroup的col宽度来改变表格宽度
 */
function rzGroupColWidth(tableObj,ipx,tdIndex){
	var number = getTBColSpans(rzObj);//alert(number)
  var groupCol = tableObj.lastChild;//alert(groupCol.outerHTML)
	var childLength = groupCol.childNodes.length;
	var width = parseInt(groupCol.childNodes[number].width);
	if(width + ipx <0)
		groupCol.childNodes[number].width = 1
	else
		groupCol.childNodes[number].width = width + ipx;
	deleteTBWidth(tableObj);	
}
function deleteTBWidth(tableObj){
	if(tableObj.width!="") 
		tableObj.removeAttribute("width");
	if(tableObj.style.width!="")
		tableObj.style.width = "" ;
} 
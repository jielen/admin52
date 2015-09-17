

function testPos(){
	alert("此功能暂时未实现！")
	/*
  var tbobj=cursorObj.parentElement.parentElement.parentElement;
  var pos=getObjPosAtts(tbobj);

  var str1=(tbobj.style.cssText+"\nx="+pos.left+",y="+pos.top+",w="+pos.width+",h="+pos.height);
 var bobj=tbobj.parentElement;
 var    pos2=getBodyPos(bobj);
       pos=getObjPosAtts(bobj);
     alert(str1+"\n"+bobj.offsetLeft+","+bobj.offsetTop+"\nx="+pos.left+",y="+pos.top+",w="+pos.width+",h="+pos.height+
            "\nx="+pos2.left+",y="+pos2.top+",w="+pos2.width+",h="+pos2.height);
*/
}
function tspos(){
  var obj=event.srcElement;
  //alert(obj.outerHTML);

}

function testdiv(){
  var tobj=getObj("templatebody");
  showMessage(tobj.outerHTML);


}

function tssetcellHeight()
{
  var trobj=cursorObj;
   showMessage(trobj.outerHTML);
  for(i=0;i<trobj.cells.length;i++){
    var tdobj=trobj.cells(i)
        tdobj.height="";
  }
  alert("行高升级完成!!");

}

function tssettable(){
  cursorObj.style.position="";
  alert(cursorObj.outerHTML);

}

function testmydiv(){
  var obj=getObj(nowDivID);
    alert(obj.outerHTML);
  alert(obj.parentElement.outerHTML);

}
function tsdrag()
{
  alert("is darg");
}
function tsselect(){
  alert("is select");
  return false;
}

function ts1(){
  var bobj=getObj("rpbody");
  var pop=getBodyPos(bobj);
      alert(pop);

}

function testmy(){
 var obj=event.srcElement;
   alert(obj.outerHTML);

}

function tsnum(){

var sColor="#00f0ff";
    s=getXColor(sColor);
    alert("color:"+s);


}
function tstb1(){
var tb=document.getElementById("PRN_FIELD_cells");

    for(i=0;i<tb.rows.length;i++){

            }

}



function tstb1(){
var tb=document.getElementById("PRN_FIELD_cells");

    for(i=0;i<tb.rows.length;i++){

            }

}


function tsfield(n)
{
  var obj=getObj(nowDivID);
  alert(n+",\n test field:\n"+obj.outerHTML);

}

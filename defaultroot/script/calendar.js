var gdCtrl = new Object();
var goSelectTag = new Array();
var gcGray = "#FBF6DD";
var gcToggle = "#ffffff";
var gcToggle2 = "#000000";
var gcBG = "#91A9E3";
var gcbc = "#000000";
var previousObject = null;

var gdCurDate = new Date();
var giYear = gdCurDate.getFullYear();
var giMonth = gdCurDate.getMonth()+1;
var giDay = gdCurDate.getDate();

var gCalMode = "";
var gCalDefDate = "";

var CAL_MODE_NOBLANK = "2";
function setNowSelect(){
  if(nowSelect!=""||nowSelect==null){
    nowSelectArray=nowSelect.split("-");
    if(nowSelectArray.length<3){
      return;
    }
    else{
      giYear=nowSelectArray[0];
      giMonth=nowSelectArray[1];
      giDay=nowSelectArray[2];
    }
  }

}
//setNowSelect();

function fSetDate(iYear, iMonth, iDay){
  if(isNaN(iDay)){
    window.returnValue=null;//返回选择的日期
    window.close();
    return;

  }
  if (((iYear == 0) && (iMonth == 0) && (iDay == 0))||(isNaN(iDay))){
    gdCtrl.value = "";
  }
  else{
    iMonth = iMonth + 100 + "";
    iMonth = iMonth.substring(1);
    iDay   = iDay + 100 + "";
    iDay   = iDay.substring(1);
    gdCtrl.value = iYear+"-"+iMonth+"-"+iDay;
  }

  for (i in goSelectTag)
    goSelectTag[i].style.visibility = "visible";
    goSelectTag.length = 0;
    var result;
   if(dateType=="datetime" )
     result=gdCtrl.value+" "+timeUser.innerText;//返回选择的日期与时间
   else
     result=gdCtrl.value;//返回选择的日期

       window.returnValue=result;
  window.close();
}

function setTime(selobj,spanObj){
    spanObj.innerText=selobj.value;
}

function HiddenDiv(){
  var i;
  VicPopCal.style.visibility = "hidden";
  for (i in goSelectTag)
    goSelectTag[i].style.visibility = "visible";
    goSelectTag.length = 0;

    }

    function fSetSelected(aCell){
  var iOffset = 0;
  var iYear = parseInt(tbSelYear.value);
  var iMonth = parseInt(tbSelMonth.value);

  aCell.bgColor = gcBG;
  with (aCell.children["cellText"]){
    var iDay = parseInt(innerText);
    if (color==gcGray)
      iOffset = (Victor<10)?-1:1;

    if( color == gcGray ){
      iOffset = (iDay < 15 )?1:-1;
    }

    iMonth += iOffset;
    if (iMonth<1) {
      iYear--;
      iMonth = 12;
    }else if (iMonth>12){
      iYear++;
      iMonth = 1;
    }
  }
  fSetDate(iYear, iMonth, iDay);
  }

  function Point(iX, iY){
    this.x = iX;
    this.y = iY;
  }

  function fBuildCal(iYear, iMonth) {
    var aMonth=new Array();
    for(i=1;i<7;i++)
      aMonth[i]=new Array(i);

    var dCalDate=new Date(iYear, iMonth-1, 1);
    var iDayOfFirst=dCalDate.getDay();
    var iDaysInMonth=new Date(iYear, iMonth, 0).getDate();
    var iOffsetLast=new Date(iYear, iMonth-1, 0).getDate()-iDayOfFirst+1;
    var iDate = 1;
    var iNext = 1;

    for (d = 0; d < 7; d++)
      aMonth[1][d] = (d<iDayOfFirst)?-(iOffsetLast+d):iDate++;
    for (w = 2; w < 7; w++)
      for (d = 0; d < 7; d++)
        aMonth[w][d] = (iDate<=iDaysInMonth)?iDate++:-(iNext++);
    return aMonth;
  }

  function fDrawCal(iYear, iMonth, iCellHeight, sDateTextSize) {
    var WeekDay = new Array("日","一","二","三","四","五","六");
    var styleTD = " bgcolor='"+gcBG+"' bordercolor='"+gcBG+"' valign='middle' align='center' height='"+iCellHeight+"' style='font-size:12px; ";
    var styleTDSelect = " bgcolor='"+gcToggle+"' bordercolor='"+gcBG+"' valign='middle' align='center' height='"+iCellHeight+"' style='font-size:12px; ";
    myMonth = fBuildCal(iYear, iMonth);
    with (document) {
      write("<tr>");
      for(i=0; i<7; i++)
        write("<td "+styleTD+" color:#000000' >" + WeekDay[i] + "</td>");
      write("</tr>");

      for (w = 1; w < 7; w++) {
        write("<tr>");
        for (d = 0; d < 7; d++) {
          if(myMonth[w][d]==giDay){
            write("<td id=calCell "+styleTDSelect+"cursor:hand;' onMouseOver='this.bgColor=gcToggle' onMouseOut='this.bgColor=gcToggle' onclick='fSetSelected(this)'>");
            write("<font id=cellText ><b> </b></font>");
            write("</td>")
          }
            else{
              write("<td id=calCell "+styleTD+"cursor:hand;' onMouseOver='this.bgColor=gcToggle' onMouseOut='this.bgColor=gcBG' onclick='fSetSelected(this)'>");
              write("<font id=cellText ><b> </b></font>");
              write("</td>")
            }
        }
        write("</tr>");
      }
    }
  }

  function fUpdateCal(iYear, iMonth) {
    myMonth = fBuildCal(iYear, iMonth);
    var i = 0;
    for (w = 0; w < 6; w++){
      for (d = 0; d < 7; d++)
        with (cellText[(7*w)+d]) {
      Victor = i++;
      if (myMonth[w+1][d]<0) {
        color = gcGray;
        innerText = "";

      }else{
        if( d == 0 ){
          color = "red";
        }else if( d == 6 ){
          color = "red";
        }
        else{
          color = "black";
        }
        innerText = myMonth[w+1][d];
      }
      }
    }
  }

  function fSetYearMon(iYear, iMon){
    tbSelMonth.options[iMon-1].selected = true;
    for (i = 0; i < tbSelYear.length; i++)
      if (tbSelYear.options[i].value == iYear)
        tbSelYear.options[i].selected = true;
    fUpdateCal(iYear, iMon);
  }

  function fPrevMonth(){
    var iMon = tbSelMonth.value;
    var iYear = tbSelYear.value;

    if (--iMon<1) {
      iMon = 12;
      iYear--;
    }

    fSetYearMon(iYear, iMon);
  }

  function fNextMonth(){
    var iMon = tbSelMonth.value;
    var iYear = tbSelYear.value;

    if (++iMon>12) {
      iMon = 1;
      iYear++;
    }

    fSetYearMon(iYear, iMon);
  }

  function fToggleTags(){
    with (document.all.tags("SELECT")){
      for (i=0; i<length; i++)
        if ((item(i).Victor!="Won")&&fTagInBound(item(i))){
      item(i).style.visibility = "hidden";
      goSelectTag[goSelectTag.length] = item(i);
        }
    }
  }

  function fTagInBound(aTag){
    with (VicPopCal.style){
      var l = parseInt(left);
      var t = parseInt(top);
      var r = l+parseInt(width);
      var b = t+parseInt(height);
      var ptLT = fGetXY(aTag);
      return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
    }
  }

  function fGetXY(aTag){
    var oTmp = aTag;
    var pt = new Point(0,0);
    do {
      pt.x += oTmp.offsetLeft;
      pt.y += oTmp.offsetTop;
      oTmp = oTmp.offsetParent;
    } while(oTmp.tagName!="BODY");
    return pt;
  }
// Main: popCtrl is the widget beyond which you want this calendar to appear;
//       dateCtrl is the widget into which you want to put the selected date.
// i.e.: <input type="text" name="dc" style="text-align:center" readonly><INPUT type="button" value="V" onclick="fPopCalendar(dc,dc);return false">
  function fPopCalendar(popCtrl, dateCtrl, mode, defDate){
    gCalMode = mode;
    gCalDefDate = defDate;

    if (popCtrl == previousObject){
      if (VicPopCal.style.visibility == "visible"){
        //HiddenDiv();
        return true;
      }
    }
    previousObject = popCtrl;
    gdCtrl = dateCtrl;
    fSetYearMon(giYear, giMonth);
    var point = fGetXY(popCtrl);

    with (VicPopCal.style){
      left = point.x;
      top  = point.y+popCtrl.offsetHeight;
      width = VicPopCal.offsetWidth;
      height = VicPopCal.offsetHeight;
      fToggleTags(point);
      visibility = 'visible';
    }
  }

  var gMonths = new Array("1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月");

  with (document) {
    write("<Div id='VicPopCal' style='OVERFLOW:hidden;POSITION:absolute;VISIBILITY:hidden;border:0px ridge;width:100%;height:100%;top:0;left:0;z-index:100;overflow:hidden'>");
    write("<table border='0' bgcolor='#91A9E3'>");
    write("<TR>");
    write("<td valign='middle' align='center'><input type='button' name='PrevMonth' value='<' style='height:20;width:20;FONT:bold' onClick='fPrevMonth()'>");
    write("&nbsp;<SELECT name='tbSelYear' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' Victor='Won'>");
    for(i=1900;i<2026;i++)
      write("<OPTION value='"+i+"'>"+i+"年</OPTION>");
    write("</SELECT>");
    write("&nbsp;<select name='tbSelMonth' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' Victor='Won'>");
    for (i=0; i<12; i++)
      write("<option value='"+(i+1)+"'>"+gMonths[i]+"</option>");
    write("</SELECT>");
    write("&nbsp;<input type='button' name='PrevMonth' value='>' style='height:20;width:20;FONT:bold' onclick='fNextMonth()'>");
    write("</td>");
    write("</TR><TR>");
    write("<td align='center'>");
    write("<DIV style='background-color:#ffffff'><table width='100%' border='0'>");
    fDrawCal(giYear, giMonth, 8, '12');
    write("</table></DIV>");
    write("</td>");
    write("</TR><TR><TD align='left'>");
    write("<B style='color:"+gcbc+";cursor:hand; font-size:12px' onclick='fSetDate(giYear,giMonth,giDay)' onMouseOver='this.style.color=gcToggle2' onMouseOut='this.style.color=gcbc'>上次日期: "+giYear+"-"+giMonth+"-"+giDay+"</B><br>");
    write("<TABLE width='100%'><TR><TD align='center'>");
   // write("<B ID=\"CAL_B_BLANK\" style='color:"+gcbc+"; visibility:visible; cursor:hand; font-size:12px' onclick='fSetDate(0,0,0)' onMouseOver='this.style.color=gcToggle2' onMouseOut='this.style.color=gcbc'>清空选择</B>");
    write("</td><td algin='center'>");

    write("</td></tr></table>");
    write("</TD></TR>");
    write("</TABLE>");
    writeln("<div id=timeA style='display:none;font-size=12;'>                      ");
    writeln("   <span>时间:<span id=timeUser><span id=hourA>12</span>:<span id=minusA>25</span></span>");
    writeln("      (<select id=selhourA onchange=setTime(this,hourA);>");
    writeln("      </select><span style='font-weight:bold;'>:</span>");
    writeln("      <select id=selminusA onchange=setTime(this,minusA);>");
    writeln("      </select>)");
    writeln("   </span>");
    writeln("</div>");

    write("</div>");



  }

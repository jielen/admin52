//$Id: page.js,v 1.2 2008/03/19 02:27:00 liuxiaoyong Exp $
var vlPubEndTime= (new Date()).getTime();


var changed = false;
/**
 * isSearchPage 专用于WEB 实体页面返回时处理方式，
 * =true: 时，页面返回后，启用页面自身的函数，函数名为 exeCallBack(myobj,backobj)
 *            如在searchPage.jsp 中的实现方法
 * =false:时，页面返回后，系统作统一处理
 */
var isSearchPage=false;
var areaId = null;
var isTab = false;
var areaTabName = null;
var fieldChecked = true;
var _AllowGridLock= true;  //是否允许表格锁定；leidh; 20040715;
var oPopup = window.createPopup();
var valsetFilter = new Array();

/** 键码 (keyCode) */
var KEY_TAB = 9;
var KEY_ENTER = 13;

function getChanged(){
  return changed;
}

function setChanged(param){
  changed = param;
}

function text_Change(){
  changed = true;
  if (text_Check(event.srcElement)){
    fieldChecked = true;
    field_Change(event.srcElement);
  }else
    fieldChecked = false;
}

function text_KeyPress(){
  fieldBlur();
}

function num_KeyPress(){
  if (fieldBlur()) return;
  var src=event.srcElement;
  strValue = src.value;
  keyCode = event.keyCode;
  digit = 0;
  if (src.getAttribute("decLength") != null)
    digit = parseInt(src.getAttribute("decLength"));
  if(keyCode>57 || keyCode<45 || keyCode==47 ){
    keyCode= 0;
  }else {
    if(keyCode==46)
      if (digit == 0)
          keyCode = 0;
      else
        if (strValue.indexOf('.')>-1) //检查‘.’是不是只出现一次
          keyCode = 0;
    if (keyCode==45){//判断num型中的-是否位置正确,wtm,20040927
        if (src.value.charAt(0) == "-" ){//第一个字符是否为-
  	  keyCode = 0;
        }else{
          if (strValue.indexOf('-')>-1){ //检查‘-’是不是只出现一次
            keyCode = 0;
          }
        }
    }
  }
  event.keyCode = keyCode;
}

function fieldBlur(){
  var fieldType = event.srcElement.getAttribute("fieldType");
  if (fieldType == "num"){
       var value = event.srcElement.getAttribute("value");//判断num型中的-是否位置正确,wtm,20040927
       var pos = value.indexOf("-");
       if (pos >0 ){
  	   alert("数字格式不正确,请重新输入!");
  	   event.srcElement.setAttribute("value","");
           event.srcElement.focus();
           return false;
       }
  }
  if (event.keyCode == KEY_ENTER){
  	//event.srcElement.fireEvent("onchange");
  	return true;
  }
}

//检验数据的最大值和最小值/
function num_Change(){
  changed = true;
  if (num_Check(event.srcElement)){
    fieldChecked = true;
    field_Change(event.srcElement);
  }else
    fieldChecked = false;
  //如果是中文输入法,则无法在 keypress 上进行判断;所以要在此进行补充处理;leidh;20040622;
  var vjInput= event.srcElement;
  var vsOldValue= vjInput.value;
  var vsNewValue= vsOldValue.replace(/[^0-9.\-]/gi, "");
  vjInput.value= vsNewValue;
/*
  tmpValue = vjInput.value;
  while (tmpValue.length > 0){
    if (tmpValue.substring(0,1) == "0")
      tmpValue = tmpValue.substring(1);
    else
      break;
  }
  vjInput.value = tmpValue;
*/
}

function date_KeyPress(){
  if (fieldBlur()) return;
  key = event.keyCode;
  if (!((key >= 48) && (key <=57) || (key==45) || (key==47)))
    event.keyCode = 0;
}
function datetime_KeyPress(){
  if (fieldBlur()) return;
  key = event.keyCode;
  if (!((key >= 48) && (key <=57) || (key==45) || (key==47)))
    event.keyCode = 0;
}
function date_Change(){
  changed = true;
  if (date_Check(event.srcElement)){
    fieldChecked = true;
    field_Change(event.srcElement);
  }else
    fieldChecked = false;
}
function datetime_Change(){
   if (datetime_Check(event.srcElement)){
     changed = true;
     fieldChecked = true;
     field_Change(event.srcElement);
   }else
    fieldChecked = false;
}

function valueSet_I_Focus(){
	valueSet_I_Display(event.srcElement);
}

function valueSet_I_Display(src){
  var field = src.getAttribute("fieldname");
  var tablename = src.getAttribute("tablename");
  var isNew = true;
  var tf = tablename + "." + field;
  for(var i=0,l=valsetFilter.length; i<l; i++){
    if(valsetFilter[i] == tf){
      isNew = false;
      break;
    }
  }
  if (src.getAttribute("read")=="false"){
    select = document.getElementById(tablename + "_" + field+"IDS");
    src.style.display = "none";
    if(isNew){
      valsetFilter[valsetFilter.length] = tf;
      var vn = new Array();
      var vv = new Array();
      vn[0] = "compoName";
      vv[0] = getCompoName();
      vn[1] = "fieldName";
      vv[1] = field;
      vn[2] = "userId";
      vv[2] = getSv("svUserID");
      vn[3] = "options";
      vv[3] = optionsToDelta(select);
      var voData = requestData("getNumLim", getCompoName(), vn, vv);
      var optList = "";
      if(voData && voData.text){
        optList = voData.text;
      }
      if(optList && optList.length > 0){
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
        xmlDom.loadXML(optList);
        var root=xmlDom.getElementsByTagName("entity");
        var sl = root.length;
        select.options.length = sl;
        for(var i=0; i<sl; i++){
          var optVT=root[i].childNodes;
          select.options[i].value = optVT[0].getAttribute("value");
          select.options[i].text = optVT[1].getAttribute("value");
        }
      }
    }
    select.style.display = "";
    select.focus();
  }
}

function valueSet_S_Change(){
  changed = true;
  var src = event.srcElement;
  var field = src.getAttribute("fieldname");
  var tablename = src.getAttribute("tablename");
  var input = document.getElementById(tablename + "_" + field + "ID");
  if (src.options.length > 0){
   input.setAttribute("value",src.options[src.selectedIndex].text);
  }else{
    input.setAttribute("value","");
  }
  field_Change(src);
}

function valueSet_S_Blur(){
  var src = event.srcElement;
  var field = src.getAttribute("fieldname");
  var tablename = src.getAttribute("tablename");
  var input = document.getElementById(tablename + "_" + field + "ID");
  if (src.options.length > 0){
   input.setAttribute("value",src.options[src.selectedIndex].text);
  }else{
    input.setAttribute("value","");
  }
  src.style.display = "none";
  input.style.display = "";
}

function valueSet_S_Filter(tableName){
  var src = event.srcElement;
  var field = src.getAttribute("fieldname");
  var value = src.options[src.selectedIndex].text;
  var blankIndex = value.indexOf(" ");
  if (blankIndex > 0){
    value = value.substring(0,blankIndex);
  }
  filterTable(tableName,field,value);
  if (eval("typeof " + field + "_Change ==\"function\""))
    eval(field + "_Change()");
}

function checkLength(Str ,minlength){ //检查输入的数据是否不够长
  var strlength=0;
  var sztemp;
  if(Str==null)
    Str="";
  for(var i=0;i<Str.length;i++){
    sztemp = Str.substring(i,i+1);
    if(sztemp>'\u20AC')
      strlength=strlength+2;
    else
      strlength=strlength+1;
  }
  if(strlength>=minlength)
    return true;  //1为超短,0为输入的数据正确
  else
    return false;
}

function text_Check(element){
  var src = element;
  var minlen = 0;
  var result = true;

  var valueTmp = trim(src.value);
  src.value = valueTmp;

  if(typeof src.minLength != null){
    minlen = src.minLength;
    if(minlen>0){
      if(!checkLength(src.value,src.minLength)){
        var fieldname = element.getAttribute("fieldname");
        var tablename = element.getAttribute("tablename");
        var fieldcaption = document.getElementById(tablename + "_"
            + fieldname + "CaptionID");
        var caption = fieldname;
        if (fieldcaption != null)
          caption = fieldcaption.innerHTML;
        var index = caption.indexOf("<SPAN");
    		if(index > 1){
        	alert(caption.substr(0, index) + "字段输入数据至少应为"
           	+ minlen + "位,请重新输入");
        }
				else
        	alert(caption + "字段输入数据至少应为"
           	+ minlen + "位,请重新输入");
        result = false;
      }
    }
  }
  return result;
}

function date_Check(element){

  var src = element;
  var value = src.value;
  if (value == "") return true;
  result = true;
  pattern = /\b((19|20)\d{2})[\-\/](1[0-2]|0?[1-9])[\-\/](0?[1-9]|[12][0-9]|3[01])/;
  var fieldname = element.getAttribute("fieldname");
  var tablename = element.getAttribute("tablename");
  var fieldcaption = document.getElementById(tablename + "_"
      + fieldname + "CaptionID");
  var caption = fieldname;
  if (fieldcaption != null)
    caption = fieldcaption.innerHTML;
  if (pattern.test(value) == false){
    var index = caption.indexOf("<SPAN");
    if(index > 1){
  		alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  	}
		else
			alert("“" + caption + "”的日期格式无效。");
  	result = false;
  }else {
  //找分隔符
    first = value.indexOf("-");
    last = value.lastIndexOf("-");
    x1 = value.indexOf("/");
    x2 = value.lastIndexOf("/");
    var fir,sec;
    if (first == -1) {
      sec = x2;
      fir = x1
    } else if (x1 == -1) {
      sec = last;
      fir = first;
    } else if (x1 >first) {
      sec = x1;
      fir = first;
    } else {
      sec = first;
      fir = x1;
    }

    var year,month,day;
    year = parseInt(value.substring(0,fir));
    //日期录入-08-99，保存时报错。wtm,20040809
        month = parseInt(value.substring(fir+1,sec),10);

    day = parseInt(value.substring(sec+1,value.length));
    var daysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (((year % 4 ==0)&&(year % 100 !==0))||(year % 400 ==0))//闰年
      daysOfMonth[1] = 29;
    if (day > daysOfMonth[month-1]) {
    	var index = caption.indexOf("<SPAN");
    	if(index > 1){
  			alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  		}
			else
    	  alert("“" + caption + "”的日期无效。");
    	result = false;
    }
    strYear = value.substring(0, fir);
    strMonth = value.substring(fir + 1, sec);
    strDay = value.substr(sec + 1);
    if(fir == sec){
    	var index = caption.indexOf("<SPAN");
    	if(index > 1){
  			alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  		}
			else
     	 alert("“" + caption + "”的日期数据无效。");
   	 }
    if(strMonth.length == 1)
      strMonth = "0" + strMonth;
    if(strDay.length == 1)
      strDay = "0" + strDay;
    element.value = strYear + "-" + strMonth + "-" + strDay;
  }
  return result;
}
function datetime_Check(element){
  var src = element;
  var value = src.value;
  if (value == "") return true;
  result = true;
  //pattern = /\b((19|20)\d{2})[\-\/](1[0-2]|0?[1-9])[\-\/](0?[1-9]|[12][0-9]|3[01])/;
  pattern = /\b((19|20)\d{2})[\-\/](1[0-2]|0?[1-9])[\-\/](0?[1-9]|[12][0-9]|3[01])\s(0?[0-9]|1[0-9]|2[0-3])[:](0?[0-9]|([1-5][0-9]))/;
  var fieldname = element.getAttribute("fieldname");
  var tablename = element.getAttribute("tablename");
  var fieldcaption = document.getElementById(tablename + "_"
      + fieldname + "CaptionID");
  var caption = fieldname;
  if (fieldcaption != null)
    caption = fieldcaption.innerHTML;
  if (pattern.test(value) == false){
    var index = caption.indexOf("<SPAN");
    if(index > 1){
  		alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  	}
		else
			alert("“" + caption + "”的日期格式无效。");
    result = false;
  }else {
  //找分隔符
    first = value.indexOf("-");
    last = value.lastIndexOf("-");
    blank=value.indexOf(" ");
    point = value.indexOf(":");
    x1 = value.indexOf("/");
    x2 = value.lastIndexOf("/");
    var fir,sec;
    if (first == -1) {
      sec = x2;
      fir = x1
    } else if (x1 == -1) {
      sec = last;
      fir = first;
    } else if (x1 >first) {
      sec = x1;
      fir = first;
    } else {
      sec = first;
      fir = x1;
    }

    var year,month,day,hour,minute;
    year = parseInt(value.substring(0,fir));
    month = parseInt(value.substring(fir+1,sec));
    //day = parseInt(value.substring(sec+1,value.length));
    day = parseInt(value.substring(sec+1,blank));
    hour = parseInt(value.substring(blank+1,point));
    minute = parseInt(value.substring(point+1,value.length));


    if(hour>=24){
    	var index = caption.indexOf("<SPAN");
    	if(index > 1){
  			alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  		}
			else
    	 alert(caption + "的日期时间格式无效");
     result = false;
    }
    if(minute>=60){
    	var index = caption.indexOf("<SPAN");
    	if(index > 1){
  			alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  		}
			else
    	 alert(caption + "的日期时间格式无效");
     result = false;
    }

    var daysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (((year % 4 ==0)&&(year % 100 !==0))||(year % 400 ==0))//闰年
      daysOfMonth[1] = 29;
    if (day > daysOfMonth[month-1]) {
    	var index = caption.indexOf("<SPAN");
    	if(index > 1){
  			alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  		}
			else
     	 alert("“" + caption + "”的日期时间格式无效。");
      result = false;
    }
    strYear = value.substring(0, fir);
    strMonth = value.substring(fir + 1, sec);
    strDay = value.substring(sec + 1,blank);
    strHour = value.substring(blank+1,point);
    strMinute = value.substring(point+1,value.length);
    if(fir == sec){
    	var index = caption.indexOf("<SPAN");
      if(index > 1){
  			alert("“" + caption.substr(0, index) + "”的日期格式无效。");
  		}
			else
      	alert("“" + caption + "”的日期时间无效。");
      result = false;
     }
    if(strMonth.length == 1)
      strMonth = "0" + strMonth;
    if(strDay.length == 1)
      strDay = "0" + strDay;
    if(strHour.length == 1)
      strHour = "0" + strHour;
    if(strMinute.lenth == 1)
      strMinute = "0" + strMinute;
    //alert("MMMMMMMMMMMMMinute is:"+strMinute);
    element.value = strYear + "-" + strMonth + "-" + strDay + " " + strHour + ":" +strMinute;
  }
  return result;
}
function num_Check(element){
  var src = element;
  var curV;
  result = true;
  if (trim(src.value) == ""){
    src.value = 0;
  }
  digit = 0;
  if (src.getAttribute("decLength") != null)
    digit = parseInt(src.getAttribute("decLength"), 10);
  if (digit == 0){
    curV = parseInt(src.value, 10);
  }else{
    var val = src.value;
    var index = val.indexOf(".");
    if(index > -1){
      if(index < val.length - digit)
        val = val.substring(0, index + digit + 1);
      //20040927 小数位不足时补足
      else
        val = val + addZero(digit - (val.length - index - 1));
      if(index == 0)
        val = "0" + val;
      src.value = val;
      curV = parseFloat(val);
    }else{
      curV = parseInt(src.value, 10);
      //20040927 小数位不足时补足
      val = val + "." + addZero(digit);
      src.value = val;
    }
  }
  if (isNaN(curV)){
    var fieldname = element.getAttribute("fieldname");
    var tablename = element.getAttribute("tablename");
    var fieldcaption = document.getElementById(tablename + "_"
        + fieldname + "CaptionID");
    var caption = fieldname;
    if (fieldcaption != null){
      caption = fieldcaption.innerHTML;
    }
    var index = caption.indexOf("<SPAN");
    if(index > 1){
  		alert("“" + caption.substr(0, index) + "”的值无效。");
  	}
		else
	    alert(caption + "的值无效");
    result = false;
  }
  /*检查最小值*/
  if (src.getAttribute("minValue") != null){
    minV = parseFloat(src.getAttribute("minValue"));
    if (curV < minV) {
      var fieldname = element.getAttribute("fieldname");
      var tablename = element.getAttribute("tablename");
      var fieldcaption = document.getElementById(tablename + "_"
          + fieldname + "CaptionID");
      var caption = fieldname;
      if (fieldcaption != null){
        caption = fieldcaption.innerHTML;
      }
    	var index = caption.indexOf("<SPAN");
      if(index > 1){
  			alert(caption.substr(0, index) + "的值不能小于"+minV);
  		}
			else
      	alert(caption + "的值不能小于"+minV);
      result = false;
    }
  }
  /*检查最大值*/
  if (src.getAttribute("maxValue") != null){
    maxV = parseFloat(src.getAttribute("maxValue"));
    if (curV > maxV) {
      var fieldname = element.getAttribute("fieldname");
      var tablename = element.getAttribute("tablename");
      var fieldcaption = document.getElementById(tablename + "_"
          + fieldname + "CaptionID");
      var caption = fieldname;
      if (fieldcaption != null){
        caption = fieldcaption.innerHTML;
      }
    	var index = caption.indexOf("<SPAN");
      if(index > 1){
  			alert(caption.substr(0, index) + "的值不能大于"+maxV);
  		}
			else
      	alert(caption + "的值不能大于"+maxV);
      result = false;
    }
  }
  return result;
}

function getSrcParent(src,parTag){
  if(src.tagName=='BODY'){
    src.id='error';
  }	else if(src && src.tagName!=parTag)
    src=getSrcParent(src.parentElement,parTag);
  return src;
}

function field_Change(src){
  var fieldName = src.getAttribute("fieldname");
  var tableName = src.getAttribute("tablename");
  var mainTable = getMainTableName();

  if(tableName == mainTable){
    if (eval("typeof " + fieldName + "_Change ==\"function\"")){
      eval(fieldName + "_Change()");
    }
  }else{
/*
  	if(!isFieldChange)
  	 	return;//如果字段没有改变就 回车了，就不出清空后面字段 zhangcheng20040730
  	else
  	  isFieldChange=false;//isFieldChange重置
*/
    if (eval("typeof " + tableName + "_" + fieldName +
             "_Change ==\"function\"")){
      eval(tableName + "_" + fieldName + "_Change()");
    }
  }
}

function field_Blur(){
  var fieldName = event.srcElement.getAttribute("fieldname");
  var tableName = event.srcElement.getAttribute("tablename");
  var mainTable = getMainTableName();
	var value = event.srcElement.getAttribute("value");
	var fieldType = event.srcElement.getAttribute("fieldType");
	if (fieldType == "num"){
		var pos = value.indexOf("-");//判断num型中的-是否位置正确,wtm,20040927
                if (pos >0 ){
  	               event.srcElement.setAttribute("value","");
  	               event.srcElement.focus();
                }else{
                   var isKiloStyle = event.srcElement.getAttribute("kiloStyle");
		   if ((isKiloStyle == true) || (isKiloStyle == "true")){
			 var temp = kiloStyle(value);
			 event.srcElement.setAttribute("value",temp);
		   }
                }
	}
  if(tableName == mainTable){
    if (eval("typeof " + fieldName + "_Blur ==\"function\"")){
      eval(fieldName + "_Blur()");
    }
  }else{
    if (eval("typeof " + tableName + "_" + fieldName +
             "_Blur ==\"function\"")){
      eval(tableName + "_" + fieldName + "_Blur()");
    }
  }
}

function field_Focus(){
  var fieldName = event.srcElement.getAttribute("fieldname");
  var tableName = event.srcElement.getAttribute("tablename");
  var mainTable = getMainTableName();
	var value = event.srcElement.getAttribute("value");
	var fieldType = event.srcElement.getAttribute("fieldType");
	if (fieldType == "num"){
		  var pos = value.indexOf("-");//判断num型中的-是否位置正确,wtm,20040927
                  if (pos >0 ){
  	              alert("数字格式不正确,请重新输入!");
  	              value = "";
  	              event.srcElement.setAttribute("value","");
  	              event.srcElement.focus();
                  }
		var isKiloStyle = event.srcElement.getAttribute("kiloStyle");
		if ((isKiloStyle == true) || (isKiloStyle == "true")){
			var temp = deleteComma(value);
			event.srcElement.setAttribute("value",temp);
		}
	}
	if (tableName == mainTable){
		if (eval("typeof " + fieldName + "_Blur ==\"function\"")){
			eval(fieldName + "_Blur()");
		}
	}else{
		if (eval("typeof " + tableName + "_" + fieldName + "_Blur == \"function\"")){
			eval(tableName + "_" + fieldName + "_Blur()");
		}
	}
}

function call_mouseOver() {
  event.srcElement.style.color="#FBDD64";
}

function call_mouseOut() {
  event.srcElement.style.color = "white";
}

function call_editPageMouseOver() {
  event.srcElement.style.color="red";
  var elementId=event.srcElement.id;
  elementId=elementId.substring(0,elementId.length-2);
  document.all(elementId + "_leftImg").src="/style/img/func/left_select.gif";
//  alert(document.all(elementId + "_midBk").background);
  document.all(elementId + "_midBk").background="/style/img/func/mid_select.jpg";
  document.all(elementId + "_rightImg").src="/style/img/func/right_select.gif";
//  alert(elementId);
}

function call_editPageMouseOut() {
  event.srcElement.style.color = "black";
  var elementId=event.srcElement.id;
  elementId=elementId.substring(0,elementId.length-2);
  document.all(elementId + "_leftImg").src="/style/img/func/left_behind.gif";
  document.all(elementId + "_midBk").background="/style/img/func/mid_behind.jpg";
  document.all(elementId + "_rightImg").src="/style/img/func/right_behind.gif";
}

function call_disabledButtonMouseOut(funcName) {
  elementId=funcName;
  document.all(elementId + "ID").style.color = "black";
  document.all(elementId + "_leftImg").src="/style/img/func/left_behind.gif";
  document.all(elementId + "_midBk").background="/style/img/func/mid_behind.jpg";
  document.all(elementId + "_rightImg").src="/style/img/func/right_behind.gif";
}

function ShowMenu() {
	var vSrc = document.all("menuleft");
//	var h = vSrc.offsetHeight;
	var w = vSrc.offsetWidth;
//	var l = vSrc.offsetLeft;
//  var t = vSrc.offsetTop;
//	var vParent = vSrc.offsetParent;
//	while (vParent.tagName.toUpperCase() != "BODY")
//	{
//		l += vParent.offsetLeft;
//		t += vParent.offsetTop;
//		vParent = vParent.offsetParent;
//	}
//alert(t + ":" + event.screenY + ":" + event.y + ":" +  vSrc.clientTop + ":" + vSrc.style.posTop);
//alert(vSrc.id);
var oPopBody = oPopup.document.body;
oPopBody.style.background = "transparent";
var content=document.all("menuDiv").innerHTML;
oPopup.document.createStyleSheet(BASE_URL + "/script/applus.css");
oPopBody.innerHTML = content;

var vSrc1 = event.srcElement;
var l1 = event.offsetX;
var t1 = event.offsetY;
var vParent1 = vSrc1;

while (vParent1.tagName.toUpperCase() != "TABLE")
	{
		l1 += vParent1.offsetLeft;
		t1 += vParent1.offsetTop;
		vParent1 = vParent1.offsetParent;
	}
//document.all("lll").value=mm;
//document.all("lll").value="event.offsetX:" + event.offsetX + "event.screenX:" + event.screenX + ":event.x:" + event.x + ":l:" +  l + ":top.screenLeft:" + top.screenLeft + ":vSrc.style.clientTop:" + vSrc.style.clientTop;
oPopup.show(event.screenX- top.screenLeft- l1,event.screenY-top.screenTop-t1,w,menuTb.offsetHeight,oPopup.document.body);
//oPopup.show(event.screenX- top.screenLeft- event.x -document.body.scrollLeft + l +2 ,event.screenY-top.screenTop-event.y-document.body.scrollTop + t+1,w,menuTb.offsetHeight,oPopup.document.body);

//if (top!=window){
//   oPopup.show(event.screenX- top.screenLeft- event.x -document.body.scrollLeft + l +2 ,event.screenY-top.screenTop-event.y-document.body.scrollTop + t +1,w,menuTb.offsetHeight,oPopup.document.body);
//}else{
//   oPopup.show(l+2,t+2,w,menuTb.offsetHeight,oPopup.document.body);
//}

//	menuDiv.style.top = t;
//	menuDiv.style.left = l;
//	menuDiv.style.visibility = "visible";

//  menuDiv.style.zIndex=1000;
//  RP_RPTTabData.style.zIndex=-1000;
//  Spreadsheet1.style.zIndex=-1000;
//  alert(menuDiv.style.zIndex);
//  alert(RP_RPTTabData.style.zIndex);
//  alert(Spreadsheet1.style.zIndex)
	//isvisible = true;
}

function hiddenmenu(){
  oPopup.hide();
//  document.all("menuDiv").style.visibility = "hidden";
}
function call_menuMouseOver(){
  event.srcElement.style.color="red";
  vSrc = window.event.srcElement;
  var menuItemId=vSrc.id;
  menuItemId=menuItemId.substring(0,menuItemId.length-2);

  document.all(menuItemId + "_menuTd").bgColor="#E5FAAB";
}
function call_menuMouseOut(){
  event.srcElement.style.color = "black";
  vSrc = window.event.srcElement;
  var menuItemId=vSrc.id;
  menuItemId=menuItemId.substring(0,menuItemId.length-2);
  document.all(menuItemId + "_menuTd").bgColor="#D6E2F2";
}
function mouseDown(){
  var src = event.srcElement;
  src.style.borderBottom = "#FFFFFF solid 1px";
  src.style.borderLeft = "#666666 solid 1px";
  src.style.borderTop = "#666666 solid 1px";
  src.style.borderRight = "#FFFFFF solid 1px";
}

function mouseUp(){
  var src = event.srcElement;
  src.style.borderBottom = "#666666 solid 1px";
  src.style.borderLeft = "#FFFFFF solid 1px";
  src.style.borderTop = "#FFFFFF solid 1px";
  src.style.borderRight = "#666666 solid 1px";
}

function mouseEnterForeignIMG(){
  var src = event.srcElement;
  src.style.borderBottom = "#666666 solid 1px";
  src.style.borderLeft = "#FFFFFF solid 1px";
  src.style.borderTop = "#FFFFFF solid 1px";
  src.style.borderRight = "#666666 solid 1px";
}

function mouseOutForeignIMG(){
  var src = event.srcElement;
  src.style.border = "#FFFFFF solid 1px";
}

//在加载页面后设置首条,下一条,上一条,末条按钮的状态
function setNaviBtnDisabled(){
	if (opener != null){
		var doc;
		try{
    	doc = opener.document;
    }catch(exception){
    	return;
    }
    var win = opener;
    if ((doc.getElementById("grid") == null) || (doc.getElementById("grid") == "")){
			if ( opener.main != null){
	   		doc = opener.main.document;
	     	win = opener.main;
			}else{
				return;
			}
    }
		if ((doc) && (win)) {
      		var names = getPrimaryFields();
      		var session = document.getElementById("sessionParam").childNodes;
      		var tmpNames = new Array();
      		var values = new Array();
      		for (var i = 0,j = names.length; i < j; i++){
        		var isFilter = false;
        		for(var x = 0, y = session.length; x < y; x++){
          		var item = session.item(x);
          		if(item.getAttribute("filter") != null){
            			alias = item.getAttribute("alias");
            			if(alias == null)
              				name = item.getAttribute("name");
            			else
              				name = alias;
            			if(name == names[i]){
              				isFilter = true;
              				break;
            			}
          		}
        		}
        		if(!isFilter){
          			tmpNames[tmpNames.length] = names[i];
          			values[values.length] = getField(names[i],null,true);
          		}
      		}
					//找到当前编辑页面在列表页面的行数
					var row = null;
					var wfData = getWfData();
					// 不是流程模式时才调用 locateRow 2004-3-31
					if (!wfData.getTemplateId())
					  row = win.locateRow(tmpNames,values);
					if(row == null) return;
          var numOfRow = doc.getElementById("gridBodyTable").rows.length;
    			var currentPage = parseInt(doc.getElementById("currentPageID").innerHTML);
					var totalPage = parseInt(doc.getElementById("totalPageID").innerHTML);
          if (row !=null){
					//设置"首条","前一条"按钮禁用
					if (row.rowIndex == 0){
  					setBtnDisabled("ffirstrec",true);
  					setBtnDisabled("fprerec",true);
					}
					//设置"末条","后一条"按钮禁用
					if (row.rowIndex == numOfRow - 1){
						setBtnDisabled("fnextrec",true);
						setBtnDisabled("flastrec",true);
					}
  			}
			}
    }
}
//设置按钮不可用.funcID-函数名称;disabled-true设置按钮不可用.
function setBtnDisabled(funcID,disabled){
  try{
    var ele = document.getElementById(funcID + "ID")
	  if (ele != null){
  	  ele.disabled = disabled;
      call_disabledButtonMouseOut(funcID);
	  }
  }catch(e){
  }
}

function onPageEnter(){
  var tableName = "";
  var fieldName = "";
  var source = "";
  tableName = event.srcElement.getAttribute("tablename");
  fieldName = event.srcElement.getAttribute("fieldname");
  fieldType = event.srcElement.getAttribute("fieldtype");
  if(!tableName){
    tableName = getMainTableName();
  }
  if(!tableName) return;

  //20040802 zhangys 手工录入外部实体，然后用光标点入其他表格，出错——fieldName = null
	if(!fieldName) return;

  if(event.keyCode == KEY_ENTER){

    // 20040728 编辑框中输入回车时不跳转
    var voEle= document.getElementById(tableName + "_" + fieldName + "ID");
    if (voEle== null || voEle.tagName == "TEXTAREA"){
      return;
    }
    //var body = document.getElementById(tableName + "Body");
    var body = null;

    // <inline>
    //在一个网页中可能存在 2 个相同的 id, 所以做如下的改动;leidh;20040604;
    var vajAllTable = document.getElementsByTagName("table");
    if(vajAllTable == null || vajAllTable.length <= 0){
      return;
    }
    var vajTableBody = new Array();
    for(var i = 0; i < vajAllTable.length; i++){
      body = vajAllTable[i];
      if(body.id == tableName + "Body"){
        vajTableBody[vajTableBody.length] = body;
      }
    }
    if(vajTableBody.length == 0){
      return;
    }
    // </inline>

    for(var x = 0; x < vajTableBody.length; x++){
      body = vajTableBody[x];
      var row = -1, col = -1;
      // <inline>
      for(var r = 0; r < body.rows.length; r++){
        for(var c = 1; c < body.rows[r].cells.length; c += 2){
          var cell = body.rows[r].cells[c];
          if(cell.hasChildNodes()){

            //防止出错;leidh;20040621;
            var vsFieldNameTmp= "";
            try{vsFieldNameTmp= cell.firstChild.firstChild.getAttribute("fieldname");}catch(e){}
            if(vsFieldNameTmp == fieldName){
              row = r;
              col = c;
              break;
            }
          }
        }
      }
      // </inline>
      if((row == -1) || (col == -1)){
        continue;
      }

      for(var r2 = row; r2 < body.rows.length; r2++){
        if(r2 == row){
          // <inline>
          for(var c2 = col + 2; c2 < body.rows[r2].cells.length; c2 += 2){
            var cell = body.rows[r2].cells[c2];
            var tempTableName, tempFieldName;
            if(cell.hasChildNodes()){

              //防止出错;leidh;20040621;
              tempTableName= "";
              tempFieldName= "";
              try{tempTableName = cell.firstChild.firstChild.getAttribute("tablename");}catch(e){}
              try{tempFieldName = cell.firstChild.firstChild.getAttribute("fieldname");}catch(e){}
              if (tempTableName== null || tempTableName.length== 0) continue;
              if (tempFieldName== null || tempFieldName.length== 0) continue;
            }
            if((cell.style.display != "none") && (cell.hasChildNodes())
               && (!isFieldReadOnly(tempFieldName))){
              var ele = document.getElementById(tempTableName + "_"
                  + tempFieldName + "ID");
              if((ele) && (ele.style.display != "none")){
                ele.focus();
                if ("TEXTAREA" != ele.tagName)
                  ele.select();
                event.keyCode = KEY_TAB;
                return false;
              }
            }
          }
          // </inline>
        } else{
          // <inline>
          for(var c2 = 1; c2 < body.rows[r2].cells.length; c2 += 2){
            var cell = body.rows[r2].cells[c2];
            var tempTableName, tempFieldName;
            if(cell.hasChildNodes()){

              //防止出错;leidh;20040621;
              tempTableName= "";
              tempFieldName= "";
              try{tempTableName = cell.firstChild.firstChild.getAttribute("tablename");}catch(e){}
              try{tempFieldName = cell.firstChild.firstChild.getAttribute("fieldname");}catch(e){}
              if (tempTableName== null || tempTableName.length== 0) continue;
              if (tempFieldName== null || tempFieldName.length== 0) continue;
            }
            if((cell.style.display != "none") && (cell.hasChildNodes())
               && (!isFieldReadOnly(tempFieldName))){
              var ele = document.getElementById(tempTableName + "_"
                  + tempFieldName + "ID");
              if((ele) && (ele.style.display != "none")){
                ele.focus();
                if ("TEXTAREA" != ele.tagName)
                  ele.select();
                event.keyCode = KEY_TAB;
                return false;
              }
            }
          } // end for body.rows[r2].cells
          // </inline>
        }
      } // end for body.rows
    } // end for vajTableBody.length
  } // end if event.keyCode
}

//设置页面相应键盘事件
function setPageEvent(){
	//window.onkeydown = shortCutDispose;
	//window.document.onkeykown = shortCutDispose;
	//window.onkeypress = shortCutDispose;
	//window.document.onkeypress = shortCutDispose;
	window.onkeyup = shortCutDispose;
	window.document.onkeyup = shortCutDispose;
}
//快捷键响应事件

function shortCutDispose(){
	var funcs = new Array();
	funcs = getPageFunctions();
  if(funcs == null) return;
	for (var n = 0; n < funcs.length; n++){
	var funcName = funcs[n];
	var funcID = funcName + "ID";
	var element = document.getElementById(funcID);
	var funID = element.getAttribute("name");
	var shortCutKey = element.getAttribute("shortCutKey");
	var isCtrl = element.getAttribute("isCtrl");
	var isShift = element.getAttribute("isShift");
	var isAlt = element.getAttribute("isAlt");
	var key = event.keyCode;
  	var keyStr = String.fromCharCode(key);
  	//keyStr = String.toUpperCase(keyStr);
  	//alert("keyStr:" + keyStr);
	if ((event.shiftKey) && (event.ctrlKey) && (event.altKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "y") && (isAlt == "y")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
	}
	else if ((event.shiftKey) && (event.altKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "y") && (isAlt == "y")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
	}
	else if ((event.shiftKey) && (event.ctrlKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "y") && (isAlt == "n")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
	}
	else if ((event.ctrlKey) && (event.altKey)){
		if ((keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "n") && (isAlt == "y")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
	}
	else if (event.ctrlKey){
		if ((key != 45) && (key != 46) && (keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "n") && (isAlt == "n")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
		else if ((key == 45) && (keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "n") && (isAlt == "n")){
			grid_Add2();
		}
		else if ((key == 46) && (keyStr == shortCutKey) && (isCtrl == "y") && (isShift == "n") && (isAlt == "n")){
			grid_Del2();
		}
	}
  else if (event.shiftKey){
		if ((keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "y") && (isAlt == "n")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
  	}
	else if (event.altKey){
		if ((keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "n") && (isAlt == "y")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
  	}
	else{
		//alert("key :" + key + "keyStr:" + keyStr + "shortCutKey" + shortCutKey + "funID:" + funID + "e:" + (keyStr==shortCutKey));
		if ((key == 37)  && (keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "n") && (isAlt == "n")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
		else if ((key == 38) && (keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "n") && (isAlt == "n")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
		else if ((key == 39) && (keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "n") && (isAlt == "n")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
		else if ((key == 40) && (keyStr == shortCutKey) && (isCtrl == "n") && (isShift == "n") && (isAlt == "n")){
			if (eval("typeof Call_ClickF==\"function\""))
				Call_ClickF(funID);
		}
		}
	}//for循环
}

function getPageFunctions(){
	var element = document.getElementById("toolBarID");
	var funcs =  new Array();
	if (element != null){
		var elementChild = element.getElementsByTagName("input");
		for (var i = 0; i < elementChild.length; i++){
			funcs[funcs.length] = elementChild.item(i).getAttribute("name");
		}
		return funcs;
	}
	return null;
}

function init(){
  vlBeginTime= (new Date()).getTime();
  if (top!=window){
     document.all("pageHeadRight").style.display="";
//     document.all("pagebottom").style.display="none";
  }
//	hideMsg();
	setNaviBtnDisabled();
	setPageEvent();
  setFuncDisabled("fsave", true);
  hideWorkflowButtons();
  initFieldsWidth();
  var table1 = document.getElementById("maintable");//表筛选
  if (table1.hasChildNodes()){
    var table1Name = table1.getAttribute("tablename");
    var table2s = table1.childNodes;
    for (var i=0,j=table2s.length; i<j; i++){
      var table2Name = table2s.item(i).getAttribute("tablename");
      filterTable(table2Name);
    }
  }
  initGrids();
	initPopMenu();
	disableNaviBtn();
  if (typeof page_Init == "function"){
    page_Init();
  }
  if (document.getElementById("status").getAttribute("value") != "new"){
    setPageReadOnly(true);
  }else{
    Call_ClickF("fadd");
  }
  if (typeof after_Page_Init == "function"){
    after_Page_Init();
  }

  //800x600时，滚动棒不可见；leidh;20040601;
  //resizeAllArea();
  windowResize();
  /*
  vlEndTime= (new Date()).getTime();
  //alert("v3.1 init: "+ (vlEndTime- vlBeginTime)/1000+ " s");
  //try{
	alert("server time:"+ (vlPubEndTime- opener.vlPubBeginTime)/1000+ " s\n"
	      + "middle time:"+ (vlBeginTime- vlPubEndTime)/1000+ " s\n"
	      + "page init:"+ (vlEndTime- vlBeginTime)/1000+ " s");
	//}catch(e){}
	//*/
}
/**
 * 用于页面新增状态时禁用首条，末条，前条，后条功能按钮
 */
function disableNaviBtn(){
  var status = document.getElementById("status").getAttribute("value");
  if(status == "new"){
  	setBtnDisabled("ffirstrec",true);
  	setBtnDisabled("fprerec",true);
    setBtnDisabled("fnextrec",true);
    setBtnDisabled("flastrec",true);
    }
  }
function initPopMenu(){
  //document.oncontextmenu=showNone;
  if(document.all&&window.print)
    document.body.onclick=hidemenuie5;
}

function initFieldsWidth(){
  var maintable = document.getElementById("maintable").getAttribute("tablename");
  var vfields = document.getElementById("fields").childNodes;
  for (var i=0,j=vfields.length; i<j; i++){
    var fieldname = vfields.item(i).getAttribute("fieldname");
    var fieldspan = document.getElementById(maintable + "_" + fieldname + "Span");
    if (!fieldspan) continue;
    var colspan = fieldspan.parentNode.getAttribute("colspan");
    if (!colspan) continue;
    if (parseInt(colspan) > 1){
      var edit = document.getElementById(maintable + "_" + fieldname + "ID");
      var tdwidth = fieldspan.parentNode.clientWidth;
      if (tdwidth <= 0) continue;
      if (document.getElementById(maintable + "_" + fieldname + "ForeignIMGID") == null){
        edit.style.width = "100%";
      }else{
        //22 太小,28正好,否则会造成页面无限度的长宽;leidh;20040525;
        //edit.style.width = tdwidth - 22;
        edit.style.width = tdwidth - 28;
      }
      fieldspan.parentNode.style.width = tdwidth;
    }
  }
}

function filterTable(tableName, field, value)
{
  var tmeta = document.getElementById(tableName + "Meta");

  if (tmeta.getAttribute("effectField") != null)
  {
    var fieldName = tmeta.getAttribute("effectField");
    var fieldValue = null;
    var mainTable = document.getElementById("maintable");
    if(value != null){
      fieldValue = value;
    }else{
      if (tmeta.parentNode == mainTable){
        fieldValue = getField(fieldName);
      }else{
        var parentTable = tmeta.parentNode.getAttribute("tablename");
        fieldValue = getCurrentFieldValue(parentTable,fieldName);
      }
    }
    uneditGrid(tableName);
    var grid = document.getElementById(tableName + "BodyTable");
    var colNo = parseInt(document.getElementById(tableName + "_" + fieldName + "Cell").colno);
    var selectAll = true, isDisplayRow = false;
    for (var i=0,j=grid.rows.length; i<j; i++){
      var row = grid.rows[i];
      var rowValue = row.cells[colNo].innerHTML;
      /**
      var index = rowValue.indexOf(" ");
      if(index > 0)
        rowValue = rowValue.substring(0, index);
      */
      var index= rowValue.indexOf("SPAN");
      if (index > 0){
        rowValue = row.cells[colNo].firstChild.value;
      }
      if (rowValue != fieldValue){
        row.style.display = "none";
      }else{
        row.style.display = "";
        isDisplayRow = true;
      }
      if(row.style.display == "none") continue;
      if(row.cells[0].firstChild.checked == false)
        selectAll = false;
      if (row.clientHeight < 22) row.style.height = 22;
    }
    var head = document.getElementById(tableName + "HeadTable");
    if(grid.rows.length == 0){
      head.rows[0].cells[0].firstChild.checked = false;
    }else{
      if(isDisplayRow){
        head.rows[0].cells[0].firstChild.checked = selectAll;
      }else{
        head.rows[0].cells[0].firstChild.checked = false;
      }
    }
    fillTableColor(tableName);
  }

  else if(document.getElementById(tableName + "valueset") != null)
  {
    var fieldName = null;
    if(field == null){
      var valset = document.getElementById(tableName + "valueset");
      fieldName = valset.getAttribute("valsetfield");
    }else
      fieldName = field;
    var selectFieldValue = null;
    if(value == null){
      for(var i = 1; i < valset.cells.length; i++){
        var img = valset.cells[i].firstChild.firstChild.firstChild.firstChild;
        if(img.firstChild.src.indexOf("left_select.jpg") > 1){
          var id = img.firstChild.id;
          selectFieldValue = id.substring(0, id.length - 1);
        }
      }
    }else
      selectFieldValue = value;
    uneditGrid(tableName);
    var grid = document.getElementById(tableName + "BodyTable");
    var colNo = parseInt(document.getElementById(tableName + "_" + fieldName +
        "Cell").colno);
    var selectAll = true, isDisplayRow = false;
    for (var i=0,j=grid.rows.length; i<j; i++){
      var row = grid.rows[i];
      var rowValue = row.cells[colNo].innerHTML;
      var index= rowValue.indexOf("SPAN");
      if (index > 0){
        rowValue = row.cells[colNo].firstChild.value;
      }
      /**
      var index = rowValue.indexOf(" ");
      if(index > 0)
        rowValue = rowValue.substring(0, index);
      */
      if (rowValue != selectFieldValue){
        row.style.display = "none";
      }else{
        row.style.display = "";
        isDisplayRow = true;
      }
      if(row.style.display == "none") continue;
      if(row.cells[0].firstChild.checked == false)
        selectAll = false;
      if (row.clientHeight < 22) row.style.height = 22;
    }
    var head = document.getElementById(tableName + "HeadTable");
    if(grid.rows.length == 0){
      head.rows[0].cells[0].firstChild.checked = false;
    }else{
      if(isDisplayRow){
        head.rows[0].cells[0].firstChild.checked = selectAll;
      }else{
        head.rows[0].cells[0].firstChild.checked = false;
      }
    }
    fillTableColor(tableName);
  }

  for (var i=0,j=tmeta.childNodes.length; i<j; i++)
  {
    filterTable(tmeta.childNodes.item(i).getAttribute("tablename"));
  }
}

//只在页面上进行行筛选;leidh;20040413;
function filterTable2(tableName, field, value)
{
    var fieldName = field;
    var fieldValue = value;

    uneditGrid(tableName);
    var grid = document.getElementById(tableName + "BodyTable");
    var colNo = parseInt(document.getElementById(tableName + "_" + fieldName + "Cell").U_ColIndex);

    for (var i=0,j=grid.rows.length; i<j; i++)
    {
      var row = grid.rows[i];
      var rowValue = row.cells[colNo].innerHTML;
      //var index = rowValue.indexOf(" ");
      //if(index > 0) rowValue = rowValue.substring(0, index);
      if (rowValue != fieldValue)
      {
        row.style.display = "none";
      }
      else
      {
        row.style.display = "";
      }
    }

    fillTableColor(tableName);
    return true;
}

function getCurrentFieldValue(tableName,fieldName){
  var result = null;
  if (tableName == getMainTableName()){
    result = getField(fieldName);
  }else{
    var gridHead = document.getElementById(tableName + "HeadTable");
    var gridBody = document.getElementById(tableName + "BodyTable");
    if (gridHead.getAttribute("editing") == "y"){
      if (gridHead.getAttribute("editingfield").toUpperCase() == fieldName.toUpperCase()){
        result = getField(fieldName,tableName);
      }else{
        var row = parseInt(gridHead.getAttribute("row"));
        var col = parseInt(document.getElementById(tableName + "_" + fieldName + "Cell").colno);
        result = gridBody.rows[row].cells[col].innerHTML;
      }
    }else{
      //zhangys 2004-09-26 不点2层表，直接点3层表，修改后，删除3层表的记录，会把3层表的数据全部删除
      var allRows = getAllRows(tableName);
      var col = parseInt(document.getElementById(tableName + "_" + fieldName + "Cell").colno);
      if(allRows.length > 0)
      	result = allRows[0].cells[col].innerHTML;
    }
  }
  return result;
}

function windowResize(){
  if (initialized){
    initGrids();
    initFieldsWidth();
    resizeAllArea();
  }
}

function initGrids(){
  var table1 = document.getElementById("maintable");
  if (table1.hasChildNodes()){
    var table1Name = table1.getAttribute("tablename");
    var table2s = table1.childNodes;
    for (var i=0,j=table2s.length; i<j; i++){
      var table2Name = table2s.item(i).getAttribute("tablename");
			var displayType= table2s.item(i).getAttribute("display_type");
			if(displayType == "normal"){
				//二层表格不用Grid格式显示，则不执行initGrid();
			}
			else{
      	//初始化第二层表格
	      initGrid(table2Name);
	    }
      var table3s = table2s.item(i).childNodes;
      for (var i3=0,j3=table3s.length; i3<j3; i3++){
        var table3Name = table3s.item(i3).getAttribute("tablename");
        //初始化第三层表格
        initGrid(table3Name);
      }
    }
  }
}

function Date_Select(tableName, name){
//  var src = document.getElementById(tableName + "_" + name + "ID");
  var srcID=tableName + "_" + name + "ID";
  var srcPaObj = event.srcElement.parentElement;
  var src=srcPaObj.all(srcID);
  if (!src.isContentEditable) return;
  autoDateInput(src);
}
function Datetime_Select(tableName,name){
  var srcID=tableName + "_" + name + "ID";
  var srcPaObj = event.srcElement.parentElement;
  var src=srcPaObj.all(srcID);
  if (!src.isContentEditable) return;
  autoDateTimeInput(src);
}
function selectAll() {
  var isSelected = event.srcElement.checked;
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    gridBodyTable.rows[i].cells[0].firstChild.checked = isSelected;
  }
}

function selectPart(){
  /*
  event.cancelBubble = true;
  var curSelected = event.srcElement.checked;
  var same = true;
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    same = gridBodyTable.rows[i].cells[0].firstChild.checked == curSelected;
    if (!same) break;
  }
  if (same){
    head.rows[0].cells[0].firstChild.checked = curSelected;
  }else{
    head.rows[0].cells[0].firstChild.checked = false;
  }*/
  event.cancelBubble = true;
//  alert(event.srcElement.parentNode.parentNode.outerHTML);
  var tablename = event.srcElement.parentNode.parentNode.getAttribute("tablename");
//  alert("tableName:---" + tablename);
  if(tablename == null)
    tablename = "";
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var head = document.getElementById(tablename + "HeadTable");
  var curSelected = event.srcElement.checked;
  var same = true;
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    same = gridBodyTable.rows[i].cells[0].firstChild.checked == curSelected;
    if (!same) break;
  }
  if (same){
    head.rows[0].cells[0].firstChild.checked = curSelected;
  }else{
    head.rows[0].cells[0].firstChild.checked = false;
  }
}

function setFuncDisabled(funcName, isDisabled){
  //isDisabled为true，表示不允许
  try{
    var doc = document.getElementById(funcName + "ID");
    if(doc != null){
       doc.disabled = isDisabled;
       call_disabledButtonMouseOut(funcName);
    }
  }catch(e){
  }
}
//对getDBDataToArea取得的数据进行分页显示,取得第一页数据；
function gridfirstpage(){
  setSpeFields();
	pNames = new Array();
	pValues = new Array();
	pNames[0] = "pagename";
	var meta = document.getElementById("meta");
	var name = meta.getAttribute("pageName");
	pValues[0] = name;
	pNames[1] = "areaname";
	pValues[1] = event.srcElement.getAttribute("areaName");
	pNames[2] = "tabname";
	pValues[2] = event.srcElement.getAttribute("tabName");
  if(document.getElementById("A3Container")
     && document.getElementById("A3Container").readonly == "false"){
    pNames[3] = "newPageData";
    pValues[3] = collectData();
  }
  var com = getCommunity();
  if (com != null){
    doRequest("gridfirstpage","all",pNames,pValues,"getDBDataToArea_R");
  }
}
//对getDBDataToArea取得的数据进行分页显示,取得前一页数据；
function gridprepage(){
  setSpeFields();
	pNames = new Array();
	pValues = new Array();
	pValues = new Array();
	pNames[0] = "pagename";
	var meta = document.getElementById("meta");
	var name = meta.getAttribute("pageName");
	pValues[0] = name;
	pNames[1] = "areaname";
	pValues[1] = event.srcElement.getAttribute("areaName");
	pNames[2] = "tabname";
	pValues[2] = event.srcElement.getAttribute("tabName");
  if(document.getElementById("A3Container")
     && document.getElementById("A3Container").readonly == "false"){
    pNames[3] = "newPageData";
    pValues[3] = collectData();
  }
  var com = getCommunity();
  if (com != null){
    doRequest("gridprepage","all",pNames,pValues,"getDBDataToArea_R");
  }
}
//对getDBDataToArea取得的数据进行分页显示,取得后一页数据；
function gridnextpage(){
  setSpeFields();
	pNames = new Array();
	pValues = new Array();
	pValues = new Array();
	pNames[0] = "pagename";
	var meta = document.getElementById("meta");
	var name = meta.getAttribute("pageName");
	pValues[0] = name;
	pNames[1] = "areaname";
	pValues[1] = event.srcElement.getAttribute("areaName");
	pNames[2] = "tabname";
	pValues[2] = event.srcElement.getAttribute("tabName");
  if(document.getElementById("A3Container")
     && document.getElementById("A3Container").readonly == "false"){
    pNames[3] = "newPageData";
    pValues[3] = collectData();
  }
  var com = getCommunity();
  if (com != null){
    doRequest("gridnextpage","all",pNames,pValues,"getDBDataToArea_R");
  }
}
//对getDBDataToArea取得的数据进行分页显示,取得最后一页数据；
function gridlastpage(){
  setSpeFields();
	pNames = new Array();
	pValues = new Array();
	pValues = new Array();
	pNames[0] = "pagename";
	var meta = document.getElementById("meta");
	var name = meta.getAttribute("pageName");
	pValues[0] = name;
	pNames[1] = "areaname";
	pValues[1] = event.srcElement.getAttribute("areaName");
	pNames[2] = "tabname";
	pValues[2] = event.srcElement.getAttribute("tabName");
  if(document.getElementById("A3Container")
     && document.getElementById("A3Container").readonly == "false"){
    pNames[3] = "newPageData";
    pValues[3] = collectData();
  }
  var com = getCommunity();
  if (com != null){
    doRequest("gridlastpage","all",pNames,pValues,"getDBDataToArea_R");
  }
}

function jumpToPage_KeyPress(){
   if (event.keyCode == 13){
     gridspepage();
   }
}

function gridspepage(){
  var totalPage = parseInt(document.getElementById("totalPageID").innerHTML);
  var currPage = parseInt(document.getElementById("currentPageID").innerHTML);
  var jumpToPageID = document.getElementById("jumpTopageID");
  var inpuPage = jumpToPageID.value;
  if(totalPage == 0 || inpuPage == currPage){
    jumpToPageID.value="";
    return;
  }
  if(inpuPage > totalPage || inpuPage < 1 || inpuPage.indexOf(".") > -1){
    alert("请重新输入正确的页码！");
    jumpToPageID.value="";
    return;
  }
  setSpeFields();
  pNames = new Array();
  pValues = new Array();
  pNames[0] = "pagename";
  var meta = document.getElementById("meta");
  var name = meta.getAttribute("pageName");
  pValues[0] = name;
  pNames[1] = "areaname";
  pValues[1] = event.srcElement.getAttribute("areaName");
  pNames[2] = "tabname";
  pValues[2] = event.srcElement.getAttribute("tabName");
  if(document.getElementById("A3Container")
     && document.getElementById("A3Container").readonly == "false"){
    pNames[3] = "newPageData";
    pValues[3] = collectData();
  }
  pNames[4] = "inpupage";
  pValues[4] = inpuPage;
  var com = getCommunity();
  if (com != null){
    doRequest("gridspepage","all",pNames,pValues,"getDBDataToArea_R");
  }
}

/*
fieldsWithKilo:数组类型，需要千分位显示的字段数组
pageSize:分页后每页记录数
*/
function getDBDataToArea(ruleID, names, values, area, tabName, readOnly,
                         style, arrayStyle,fieldsWithKilo,pageSize,pageName,
                         numTypeFields, maxLen, decLen, saveTable, saveSQL){
  var pNames = new Array();
  var pValues = new Array();
  pNames[0] = "ruleID";
  pValues[0] = ruleID;
  pNames[1] = "areaName";
  pValues[1] = area;
  pNames[2] = "tabName";
  pValues[2] = tabName;
  pNames[3] = "param";
  var str = "<entity>";
  for(var i = 0; i < names.length; i++){
    str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
  }
  str += "</entity>";

  pValues[3] = str;
  pNames[4] = "readOnly";
  pValues[4] = readOnly;
  pNames[5] = "style";
  if(style == null)
    pValues[5] = "<delta></delta>";
  else
    pValues[5] = style;
  pNames[6] = "arrayStyle";
  pValues[6] = arrayStyle;
	pNames[7] = "fieldsWithKilo";
	pValues[7] = fieldsWithKilo;
	pNames[8] = "pageSize";
	pValues[8] = "" + pageSize;
  pNames[9] = "callback";
  pValues[9] = "getDBDataToArea_R";
	pNames[10] = "pagename";
	var meta = document.getElementById("meta");
	var name = meta.getAttribute("pageName");
	pValues[10] = name;
  pNames[11] = "numTypeFields";
  pValues[11] = numTypeFields;
  pNames[12] = "maxLen";
  pValues[12] = maxLen;
  pNames[13] = "decLen";
  pValues[13] = decLen;
  pNames[14] = "saveTable";
  pValues[14] = saveTable;
  pNames[15] = "saveSQL";
  pValues[15] = saveSQL;
  if(area != null)
    areaId = area;
  if((tabName != null) && (tabName.length > 0)){
    areaTabName = tabName;
    isTab = true;
  }
  var com = getCommunity();
  if (com != null){
    doRequest("getdbdatatoarea","all",pNames,pValues,"getDBDataToArea_R");
  }
}

function getDBDataToArea_R(result){

//注释部分是对取数的优化，但有时会造成指针丢失，脚本函数不能执行，这是由iframe引起的。
//  if(result.getAttribute("success") == "true"){
//    var tempId = null;
//    if(isTab == true){
//      tempId = areaTabName + "TabData";
//      document.getElementById(areaTabName + "Tab").setAttribute("tablename",
//          areaId + areaTabName);
//    }else
//      tempId = areaId;
//    if(tempId != null){
//      /*
//		zhangcheng 2004/07/26
//		先把所有的行移动到缓冲区
//		这样可以减少操作表格的行数，
//		加快操作，然后再填充回去 */
//		if(result.getElementsByTagName("div").length<2)return;
//		var bodyDiv=result.getElementsByTagName("div")[1];
//		var trArray=bodyDiv.getElementsByTagName("tr");
//		if(trArray.length<1)return;
//		var trParent=trArray[0].parentNode;
//		var trGrandfather=trParent.parentNode;
//		var copyofTBody1=trParent.cloneNode();
//		var copyofTBody2=trParent.cloneNode(true);
//
//		var copyofTr=copyofTBody2.childNodes(0);
//		trParent.removeNode(true);
//		copyofTBody1.appendChild(copyofTr);
//
//		trGrandfather.appendChild(copyofTBody1);
//
//		var a3div=document.getElementById(tempId);
//      	a3div.innerHTML = result.innerHTML;
//
//      	var areaTableName = areaId;
//      	page_setAreaToFitHeight(areaTableName);//leidh;20040604;
//        var vjArea= document.getElementById(areaTableName);//leidh;20040609;
//
//      	if(isTab == true){
//        	document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
//        	areaTableName += areaTabName;
//      	}
//      	if (tname == areaTableName){
//        	if(twidth > 0){
//          	var grid = document.getElementById(areaTableName + "Container");
//          	//grid.style.width = twidth;
//            grid.style.width = "100%"; //自动适应窗口的宽度;Leidh;20040408;
//          	twidth = -1;
//        	}
//        	if(theight > 0){
//          	var grid = document.getElementById(areaTableName + "Container");
//          	//grid.style.height = theight;
//          	grid.style.height = Math.abs(vjArea.clientHeight- 20); //leidh;20040609;
//          	if (grid.offsetHeight< theight) grid.style.height = theight;
//          	//theight = -1;
//          	theight = grid.offsetHeight;
//        	}
//      	}
//      	initColResize(areaTableName);
//				initPageAreaData();
//				colResize(areaTableName);
//      	//gridColResize(areaTableName);
//
//        //    zhangcheng 2004/07/26
//      	//把数据还原回去
//      var tTr=a3div.getElementsByTagName("div")[1].getElementsByTagName("tr")[0];
//     while(copyofTBody2.childNodes.length> 0)
//	  	{
//		  //tTr.insertAdjacentElement("beforeEnd",copyofTBody2.childNodes(0));
//		  tTr.insertAdjacentElement("afterEnd",copyofTBody2.childNodes(copyofTBody2.childNodes.length- 1));
//	  }
//
//      	data_fillTableColor(areaTableName);
//      	if (eval("typeof after_getDBDataToArea ==\"function\""))
//        	eval("after_getDBDataToArea()");
//    }
//		else{
//			alert(result.innerHTML);
//		}
//  }else
//    showMessage(result.innerHTML);

//以下过程没有对取数过程进行优化，避免了指针丢失的问题。
  if(result.getAttribute("success") == "true"){
    var tempId = null;
    if(isTab == true){
      tempId = areaTabName + "TabData";
      document.getElementById(areaTabName + "Tab").setAttribute("tablename",
          areaId + areaTabName);
    }else
      tempId = areaId;
    if(tempId != null){
      	document.getElementById(tempId).innerHTML = result.innerHTML;
      	var areaTableName = areaId;
      	page_setAreaToFitHeight(areaTableName);//leidh;20040604;
        var vjArea= document.getElementById(areaTableName);//leidh;20040609;

      	if(isTab == true){
        	document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
        	areaTableName += areaTabName;
      	}
      	if (tname == areaTableName){
        	if(twidth > 0){
          	var grid = document.getElementById(areaTableName + "Container");
          	//grid.style.width = twidth;
            grid.style.width = "100%"; //自动适应窗口的宽度;Leidh;20040408;
          	twidth = -1;
        	}
        	if(theight > 0){
          	var grid = document.getElementById(areaTableName + "Container");
          	//grid.style.height = theight;
          	grid.style.height = Math.abs(vjArea.clientHeight- 20); //leidh;20040609;
          	if (grid.offsetHeight< theight) grid.style.height = theight;
          	//theight = -1;
          	theight = grid.offsetHeight;
        	}
      	}
      	initColResize(areaTableName);
				initPageAreaData();
				colResize(areaTableName);
      	//gridColResize(areaTableName);
      	data_fillTableColor(areaTableName);
      	if (eval("typeof after_getDBDataToArea ==\"function\""))
        	eval("after_getDBDataToArea()");
        setPageGrid();
    }
		else{
			alert(result.innerHTML);
		}
  }else
    alert("没有可以查看的数据！\n"+result.innerHTML);
}

//设置getDBDataToArea取得的数据的翻页功能按钮可用否
function initPageAreaData(){
	if(document.getElementById("currentPageID")){
		var currentPage = document.getElementById("currentPageID").innerHTML;
		var totalPage = document.getElementById("totalPageID").innerHTML;
		if (currentPage == "1"){
			document.getElementById("gridfirstpageID").disabled = true;
			document.getElementById("gridprepageID").disabled = true;
		}
		if (currentPage ==  totalPage){
			document.getElementById("gridnextpageID").disabled = true;
			document.getElementById("gridlastpageID").disabled = true;
		}
	}
}
function qryDataAsGrid(ruleID, names, values, readOnly, style, arrayStyle,
                       area, tabName,fieldsWithKilo,pageSize){
//  alert("tab:" + tabName + "-----style:" + style + "-----array:" + arrayStyle);
//  alert("in getDBDataToArea");
  var pNames = new Array();
  var pValues = new Array();
  pNames[0] = "ruleID";
  pValues[0] = ruleID;
  pNames[1] = "areaName";
  pValues[1] = area;
  pNames[2] = "tabName";
  pValues[2] = tabName;
  pNames[3] = "param";
  var str = "<entity>";
  for(var i = 0; i < names.length; i++){
    str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
  }
  str += "</entity>";

  pValues[3] = str;
  pNames[4] = "readOnly";
  pValues[4] = readOnly;
  pNames[5] = "style";
  if(style == null)
    pValues[5] = "<delta></delta>";
  else
    pValues[5] = style;
  pNames[6] = "arrayStyle";
  pValues[6] = arrayStyle;
	pNames[7] = "fieldsWithKilo";
	pValues[7] = fieldsWithKilo;
	pNames[8] = "pageSize";
	pValues[8] = "" + pageSize;
	pNames[9] = "pagename";
	var meta = document.getElementById("meta");
	var name = meta.getAttribute("pageName");
	pValues[9] = name;
  if(area != null)
    areaId = area;
  if((tabName != null) && (tabName.length > 0)){
    areaTabName = tabName;
    isTab = true;
  }
  var result = requestData("getdbdatatoarea", "all", pNames, pValues);
//  alert("noback------:" + result.nodeName + "---" + result.text);
  if(area == null && tabName == null)
    return result.text;
  var tempId = null;
  if(isTab == true){
    tempId = areaTabName + "TabData";
    document.getElementById(areaTabName + "Tab").setAttribute("tablename",
        areaId + areaTabName);
  }else
    tempId = areaId;
  if(tempId != null){
	if(result.text.substring(10,13).toUpperCase() == "DIV"){
    document.getElementById(tempId).innerHTML = result.text;
    var areaTableName = areaId;
    if(isTab == true){
      document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
      areaTableName += areaTabName;
    }
//\u00CEó\u00BD\u00E2±¨\u00B4í\u00C9\u00BE\u00D6\u00AE      document.getElementById(areaTableName + "HeadTable").setAttribute("dataChanged", true);
//    alert(tname + "----5-----" + areaTableName);
    if (tname == areaTableName){
      if(twidth > 0){
        var grid = document.getElementById(areaTableName + "Container");
        grid.style.width = twidth;
        twidth = -1;
      }
      if(theight > 0){
        var grid = document.getElementById(areaTableName + "Container");
        grid.style.height = theight;
        theight = -1;
      }
    }
    colResize(areaTableName);
    data_fillTableColor(areaTableName);
    initPageAreaData();
    if (eval("typeof after_" + areaTableName + "_Grid ==\"function\""))
      eval("after_" + areaTableName + "_Grid()");
  }
  else{
	alert(result.text);
  }
  }
}
function resizeAllArea(){
  resizeArea("A1");
  resizeArea("A2");
  resizeArea("A3");
  resizeArea("A4");
  resizeArea("A5");
  resizeArea("A6");
  resizeArea("A7");
  resizeArea("A8");
}

function resizeArea(areaName){
  if (document.getElementById(areaName + "TabHead")){
    resizeTabButton(areaName,"right");
  }
}

function setTextAreaWidth(tableName, fieldName, width){
  var span = document.getElementById(tableName + "_" + fieldName + "Span");
  span.firstChild.style.width = width;
}

function setTextAreaHeight(tableName, fieldName, height){
  var span = document.getElementById(tableName + "_" + fieldName + "Span");
  span.firstChild.style.height = height;
}

function hideMsg(){
	document.getElementById("msgID").style.display = "none";
}

function alertMsg(message){
	document.getElementById("msgID").style.display = "";
	document.getElementById("msgTXT").innerHTML = message;
}



///////////以下部分专用于打印模板可视字段获取，刘明，2003－10－8///////////////////

/**
 *返回相关数据表的字段及相应标题
 * @return
 */
function getTableFieds(rptfields,tableName){
//  var rptfields=new Array(2);
  var varFields=rptfields[0];
  var lableFields=rptfields[1];

  var tbobj=document.getElementById(tableName+"HeadTable");
  if(!tbobj)
     return rptfields;
    //var tbobj=document.getElementById(tableName+"EditTable");
  //alert( tbobj.outerHTML);
	if(tbobj == null)
		return;
  for(var j=0;j<tbobj.rows.length;j++){

    var cells=tbobj.rows[j].cells;
     for(var i=1;i<cells.length;i++){ //不要第一个checkBox

       var tdobj=cells[i].getElementsByTagName("td")[0];
        if(tdobj){
          var spobj=tdobj.firstChild;
            // alert("page.js:"+spobj.outerHTML);
          var field=spobj.field;

            if( !(field==undefined || (checkArrayHasValue(varFields,field)==true) )
                ){
              varFields[varFields.length]=field;
            }

        var lable=spobj.innerText;
            if( !(lable==undefined || (checkArrayHasValue(lableFields,lable)==true))
                )
              lableFields[lableFields.length]=lable;
       // alert(spobj.outerHTML+"\n"+tdobj.outerHTML);
      }

    //alert(cells[i].outerHTML);
     // alert(tdobj.outerHTML);
    }
//  alert(rptfields);
  }
  return rptfields;

}

/**
 * 检查数组arrayobj是否包含value
 * @return
 */
function checkArrayHasValue(arrayobj,value){
  for(var i=0;i<arrayobj.length;i++){
    if(arrayobj[i]==value)
      return true;

  }
  return false;

}

function getRptViewDragFields(rptfields){
  /*
  var rptfields=new Array(2);
  var varFields=new Array();
  var lableFields= new Array();
      rptfields[0]=varFields;
      rptfields[1]=lableFields;
      */
  if(maintable){
    var table2s=maintable.childNodes;
    if(table2s){
      for(var i=0;i<table2s.length;i++){
            // alert(table2s[i].outerHTML);
             var table2=table2s[i].tablename;

             if(table2 && table2!=null){
               getTableFieds(rptfields,table2);
               //alert("return:\n"+rptfields);

               var table3s=table2s[i].childNodes;
                  for(var j=0;j<table3s.length;j++){
                    var table3=table3s[j].tablename;
                        if(table3 && table3!=null){
                          getTableFieds(rptfields,table3);
                          //alert("return:\n"+rptfields);


                        }
                    //alert(table3s[j].outerHTML);
                  }
             }
      }
    }
  }
}


/**
 * 得到虚部件名称列表
 * @return
 */
function getRptVirtualCompoFields(rptfields){
  var varfields=rptfields[0];
  var lbfields= rptfields[1];
  for(var i=3;i<=10;i++){ //检查A3－－＞A10
     var A3obj=document.getElementById("A"+i+"HeadTable");
         if(!A3obj)
            continue;
     var virtualTableName="A"+i;
     getTableFieds(rptfields,virtualTableName);

  }
}
/*
*取得分页取数后的所有数据
×areaName-- 区名
×tabName 页签名
×return 取得分页取数后的所有数据
*/
function getAreaTabData(areaName,tabName){
	var names = new Array();
	var values = new Array();
	names[0]="pageName";
	values[0]=document.getElementById("meta").getAttribute("pagename");
  names[1]="areaName";
	values[1]=areaName;
	names[2]="tabName";
	values[2]=tabName;
  //names[3] = "callback";
  //values[3] = "getAreaTabData_R";
/*
  var com = getCommunity();
  if (com != null){
			doRequest("getAreaTabData","all",names,values,"getAreaTabData_R");
  }
*/
	var result=requestData("getAreaTabData","all",names,values);
	return result.text;
}
/*
function getAreaTabData_R(result){
	if(result){
		return result.innerHTML;
	}
}
*/
function setFieldColor(fieldName,color){
  var tableName = getMainTableName();
  var caption = document.getElementById(tableName + "_" + fieldName + "CaptionID");
  var field = document.getElementById(tableName + "_" + fieldName + "ID");
  field.style.color = color;
}

function setCaptionColor(fieldName,color){
  var tableName = getMainTableName();
  var caption = document.getElementById(tableName + "_" + fieldName + "CaptionID");
  caption.style.color = color;
}

//设置主表边框颜色。wtm，20041014
function setTableBorderColor(tableName,color){
  var tabBody = document.getElementById(tableName+"Body");
  tabBody.style.backgroundColor = color;
}
/**
 * 本函数由刘明编写，2003－10－8
 * 获取主子表字段信息，专用于打印模板设计,可视化字段拖放专用
 * @return
 */
//alert("is my page?");
function getPrnTemplateFields(){
  var prfields=new Array(2); //0:fields,1:fieldCaption
  var vfields=new Array();
  var lbfields=new Array();
  //获取主表信息

  if(fields){

    //alert(fields.outerHTML);
    var objs=fields.all;
    var maintable=fields.tablename;
    for(var i=0;i<objs.length;i++){
      vfields[vfields.length]=objs[i].fieldname;
      //var captionID=GL_VOU_HEAD_INPUTORCaptionID
      var captionID=maintable+"_"+objs[i].fieldname+"CaptionID";
          //alert("id:"+captionID);
      var lbobj=document.getElementById(captionID);
          if(lbobj)
          lbfields[lbfields.length]=lbobj.innerText;
      //alert(objs[i].outerHTML);
    }
    prfields[0]=vfields;
    prfields[1]=lbfields;

  }

  getRptViewDragFields(prfields);
  getRptVirtualCompoFields(prfields); //得到虚部件字段名称列表
 // alert(lbfields+"\ndrag fields--\n"+prfields);

  return prfields;

}
//////////////以上部专用于打印模板字段获取，刘明　2003－10－13  //////////

/**
 * 对话框 Ok 处理通用函数
 * 设置 window.returnValue 为关联数组，属性 isOk = true
 * 【引用】
 * PageData() : 读取页面数据
 */
function dlgonclickOk() {
  var r = new PageData();
  r.isOk = true;
  window.returnValue = r;
  window.close();
}

/**
 * 对话框 Cancel 处理通用函数
 * 设置 window.returnValue 为关联数组，属性 isOk = false
 * 【引用】
 * PageData() : 读取页面数据
 */
function dlgonclickCancel() {
  var r = new PageData();
  r.isOk = false;
  window.returnValue = r;
  window.close();
}


//---------------------------------------------------------------------
//调整最后一个有效区域自动适应为最大高度;leidh;20040604;
//返回值:成功:高调整后的高度;失败:-1;
function page_setLastAreaToFitHeight()
{
  var vsAreaName= "";
  var vjArea= null;
  for (var i= 20; i> 0; i--)
  {
    vsAreaName= "A"+ i;
    vjArea= document.getElementById(vsAreaName);
    if (vjArea== null) continue;
    if (vjArea.hasChildNodes()) break;
    vjArea= null;
  }
  if (vjArea== null) return -1;

  var viHeight= page_setAreaToFitHeight(vsAreaName);
  return viHeight;
}
//---------------------------------------------------------------------
//调整指定区域自动适应为最大高度;leidh;20040604;
//返回值:成功:高调整后的高度;失败:-1;
function page_setAreaToFitHeight(sAreaName)
{
  if (sAreaName== null) return -1;
  var vjBody= document.getElementsByTagName("body").item(0);
  var viBodyHeight= vjBody.offsetHeight;
  var vjLayoutTable= page_getLayoutTable();
  if (vjLayoutTable== null) return null;
  var vjArea= document.getElementById(sAreaName);
  vjArea.style.height= "100%";
  if (vjArea== null) return null;
  var vjAreaTD= vjArea.parentNode;
  if (vjAreaTD== null) return null;

  var viFreeHeight= viBodyHeight- vjLayoutTable.offsetTop- vjLayoutTable.offsetHeight- 30;
  if (viFreeHeight> 0) vjAreaTD.style.height= vjAreaTD.offsetHeight+ viFreeHeight;

  return vjAreaTD.offsetHeight;
}
//---------------------------------------------------------------------
//获取 LayoutTable;leidh;20040604;
//返回值: 成功:Table 对象; 失败:null;
function page_getLayoutTable()
{
  var vjArea= document.getElementById("A1");
  if (vjArea== null) return null;
  var vjAreaTD= vjArea.parentNode;
  if (vjAreaTD== null) return null;
  var vjLayoutTable= vjAreaTD;
  while(true)
  {
    vjLayoutTable= vjLayoutTable.parentNode;
    if (vjLayoutTable.nodeName.toUpperCase()== "TABLE") break;
  }
  //if (vjLayoutTable.nodeName.toUpperCase()!= "TABLE") vjLayoutTable= null;

  return vjLayoutTable;
}
//---------------------------------------------------------------------
//设置页头的可见性;
//返回值:成功:true; 失败:false;
function page_setPageHeadVisible(isVisible)
{
  if (isVisible== null) isVisible= true;
  var vjPageHead= document.getElementById("pagehead");
  if (vjPageHead== null) return false;
  vjPageHead.style.display= (isVisible) ? "" : "none";
  return true;
}
//---------------------------------------------------------------------
/**
 * 判断用户对某部件某功能是否拥有权限
 * userID 用户名
 * CompoName 部件名
 * action 功能
 */
function isAllowed(userID,compoName,action){
  var result = false;
  var pNames = new Array();
  var pValues = new Array();
  pNames[0] = "user";
  pValues[0] = userID;
  pNames[2] = "compoName";
  pValues[2] = compoName;
  pNames[1] = "action";
  pValues[1] = action;
  var temp = requestData("isallowed","all",pNames,pValues).text;
  if(temp == "true"){
    result = true;
    }
  return result;
  }
/**
 * 设置日期类型字段后的图片可见否
* tableName 表名
* fieldName 字段名
* visible 是否可见
 */
function setDateImgVisible(tableName,fieldName,visible){
  var ele = document.getElementById(tableName + "_" + fieldName + "DateIMGID");
  if(ele){
    if(visible){
    	ele.style.display = "";
    }
    else{
    	ele.style.display = "none";
    }
    }
  }

//20040927 小数位不足时补足
function addZero(zeros){
  var z = "";
  while(zeros > 0){
    z+="0";
    zeros--;
  }
  return z;
}

function collectData(){
  uneditGrid("A3");
  var iRows=getAllRows("A3");
  var result = "<delta>\n";
  for (var i=0;i<iRows.length;i++){
    result += "  <entity>\n";
    var colInfo = document.getElementById("A3ColTable").rows[0];
    for(var k = 1, kl = colInfo.cells.length - 1; k < kl; k++){
      var item = colInfo.cells[k].field;
      if(item == "HFill" || item == "TFill" || item == "CHK"){
        continue;
      }
      var val = getRowField(iRows[i], item);
      result += "<field name=\"" + item + "\" value=\"" + val + "\"/>\n";
    }
    result += "</entity>\n";
  }
  result += "</delta>\n";
  return result;
}

function saveDBArea(area, tabName){
  var pNames = new Array();
  var pValues = new Array();
  pNames[0] = "pagename";
  var meta = document.getElementById("meta");
  var name = meta.getAttribute("pageName");
  pValues[0] = name;
  pNames[1] = "areaname";
  pValues[1] = area;
  pNames[2] = "tabname";
  pValues[2] = tabName;
  pNames[3] = "newPageData";
  pValues[3] = collectData();
  var com = getCommunity();
  if (com != null){
    requestData("saveDBArea","all",pNames,pValues);
    after_saveDBArea();
  }
}

function after_saveDBArea(){
  alert("保存完成！");
  changed = false;
}

function fwatch_sche(){
	var user_id = getSv("svUserID");
  var compo_id = document.getElementById("meta").getAttribute("componame");
  var win = showModalDialog("watchSche.htm", compo_id + "," + user_id,
  														"dialogHeight:150px;dialogWidth:550px;"
                              + "resizable:no;help:no;status:no");
  if(win){
  	var prefix = win[0];
  	var scheName =  win[1];
  	if(prefix == "save"){
    	sche_save(user_id, compo_id, scheName);
  	}else if(prefix == "delete"){
    	sche_delete(user_id, compo_id, scheName);
  	}else{
    	sche_apply(user_id, compo_id, scheName);
  	}
  }
}

function sche_save(user_id, compo_id, scheName){
	var fields = document.getElementById("fields").childNodes;
  var entity = getPageData();
  var names = new Array();
  var values = new Array();
  names[0] = "schema";
  values[0] = entity;
  names[1] = "compoId";
  values[1] = compo_id;
  names[2] = "userId";
  values[2] = user_id;
  names[3] = "schemaName";
  values[3] = scheName;
  requestDataK("saveStatSchema","all",names,values);
}

function sche_apply(user_id, compo_id, scheName){
  var names = new Array();
  var values = new Array();
  names[0] = "svUserID";
  values[0] = user_id;
  names[1] = "compo_id";
  values[1] = compo_id;
  names[2] = "sche_name";
  values[2] = scheName;
  var tempResult = qryData("AS_GET_WATCH_SCHE", names, values);
  var xmldom = new ActiveXObject("Microsoft.XMLDOM");
  xmldom.loadXML(tempResult);
  var entity = xmldom.documentElement.firstChild.firstChild.getAttribute("value");
  var xmldom1 = new ActiveXObject("Microsoft.XMLDOM");
  xmldom1.loadXML(entity);
  var fields = xmldom1.firstChild.childNodes;
  for(var i = 0, j = xmldom1.firstChild.childNodes.length; i < j; i++){
    var fieldName = fields.item(i).getAttribute("name");
    var fieldValue = fields.item(i).getAttribute("value");
    setField(fieldName, fieldValue, null, null, false);
  }
}


function sche_delete(user_id, compo_id, scheName){
  var names = new Array();
  var values = new Array();
  names[0] = "compoId";
  values[0] = compo_id;
  names[1] = "userId";
  values[1] = user_id;
  names[2] = "schemaName";
  values[2] = scheName;
  requestDataK("deleStatSchema","all",names,values);
}

function optionsToDelta(select){
  var oData = "<delta>";
  var sl = select.options.length;
  for(var i=0; i<sl; i++){
    oData += "<entity name=\"\">";
    oData += "<field name=\"OPT_VALUE\" value=\"" + packSpecialChar(select.options[i].value) + "\"/>";
    oData += "<field name=\"OPT_TEXT\" value=\"" + packSpecialChar(select.options[i].text) + "\"/>";
    oData +=  "</entity>";
  }
  oData +=  "</delta>";
  return oData;
}

function setAreaBtnVisible(areaName, func, visible){
  var add = document.getElementById(areaName + func);
  if(!add) return;
  if (visible){
    add.style.display = "";
  }else{
    add.style.display = "none";
  }
}

function areaRowDelete(){
  var dRows = "";
  var src = event.srcElement;
  var tablename = src.getAttribute("tableName");
  var areaname = src.getAttribute("areaName");
  var tabname = src.getAttribute("tabName");
  var table = document.getElementById(tablename + "BodyTable");
  var vjHeadTable= document.getElementById(tablename + "HeadTable");
  var vaiColWidth= new Array();
  var vkIsDeleteFirtstRow= false;
  for(var i=table.rows.length-1; i>=0; i-- ){
    if(table.rows[i].cells[1].firstChild.checked){
      dRows += i + ",";
      if(i == 0){
        vkIsDeleteFirtstRow= true;
        for (var j=0, l=table.rows[0].childNodes.length; j<l; j++){
          vaiColWidth[j] = table.rows[0].childNodes[j].offsetWidth;
        }
      }
      table.deleteRow(i);
    }
  }
  if(dRows.length == 0){
    alert("请先选择需要删除的行！");
    return;
  }
  dRows = dRows.substring(0, dRows.length-1);
  if (vkIsDeleteFirtstRow && table.rows.length> 0){
    table.style.width= vjHeadTable.offsetWidth;
    var vjFirstTR= table.rows[0];
    for (var i= 0; i< vjFirstTR.childNodes.length; i++){
      vjFirstTR.childNodes[i].style.width= vaiColWidth[i];
    }
  }
  fillTableColor(tablename);
//  sessionAreaRowDelete(areaname, tabname, dRows);
}

/*function sessionAreaRowDelete(areaname, tabname, dRows){
  pNames = new Array();
  pValues = new Array();
  pNames[0] = "pagename";
  var meta = document.getElementById("meta");
  var name = meta.getAttribute("pageName");
  pValues[0] = name;
  pNames[1] = "areaname";
  pValues[1] = areaname;
  pNames[2] = "tabname";
  pValues[2] = tabname;
  pNames[2] = "deleteRows";
  pValues[2] = dRows;
  var com = getCommunity();
  if (com != null){
    doRequest("deleteAreaData","all",pNames,pValues,"");
  }
}*/

function getCompoName(){
  return getPageMeta().getCompoName();
}

function getMainTableName(){
  return document.getElementById("maintable").getAttribute("tablename");
}
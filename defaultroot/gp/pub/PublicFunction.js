/* $Id: PublicFunction.js,v 1.9 2008/09/23 10:29:36 dingyy Exp $ */
/*
Title: gp.pub.PublicFunction
Description: 提供 公共方法。
Company: 用友政务
Author:leidh
*/

//----------------------------------------------------------------------
/*构建全局实例，供全局调用*/
var PF=new PublicFunction();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function PublicFunction(){
  //1.超类 =function();

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.pub.PublicFunction";

  //打开文件的 io mode 参数;
  this.OPEN_FILE_FORREADING= 1;
  this.OPEN_FILE_FORWRITING= 2;
  this.OPEN_FILE_FORAPPENDING= 8;

  //清理空格;
  this.RE_SPACE= / /gi;
  this.RE_TRIM_L= /(\S)/gi;
  this.RE_TRIM_R= /((\S)(\s+)$)/gi;

  //用于判断是否是数字;
  this.RE_INT01= /(\d+)/gi;
  this.RE_INT02= /(\+)(\d+)/gi;
  this.RE_INT03= /(\-)(\d+)/gi;

  this.RE_FLOAT01= /(\d*)(\.)(\d+)/gi;
  this.RE_FLOAT02= /(\+)(\d*)(\.)(\d+)/gi;
  this.RE_FLOAT03= /(\-)(\d*)(\.)(\d+)/gi;

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;
  this.iIncrement= 0;    //private;
  this.lUidTime= 0;      //private;
  this.sIP= "127.0.0.1"; //需要server端填充;

  //5.方法声明区 =function();
  this.compareInt= PublicFunction_compareInt;
  this.createFSO= PublicFunction_createFSO;
  this.createPath= PublicFunction_createPath;
  this.getAbsRect= PublicFunction_getAbsRect;
  this.getCenterRect= PublicFunction_getCenterRect;
  this.getMinute= PublicFunction_getMinute;
  this.getOwner= PublicFunction_getOwner;
  this.getSecond= PublicFunction_getSecond;
  this.getUID= PublicFunction_getUID;
  this.isEmpty= PublicFunction_isEmpty;
  this.isExistMethod= PublicFunction_isExistMethod;
  this.isExistMethodK= PublicFunction_isExistMethodK;
  this.isFloat= PublicFunction_isFloat;
  this.isInt= PublicFunction_isInt;
  this.isNumber= PublicFunction_isNumber;
  this.isValidArray= PublicFunction_isValidArray;
  this.isValidDate= PublicFunction_isValidDate;
  this.isValidXMLString= PublicFunction_isValidXMLString;
  this.isVisible= PublicFunction_isVisible;
  this.ltrim= PublicFunction_ltrim;
  this.parseBool= PublicFunction_parseBool;
  this.parseFloat= PublicFunction_parseFloat;
  this.parseInt= PublicFunction_parseInt;
  this.parseKilo= PublicFunction_parseKilo;
  this.parseNumeric= PublicFunction_parseNumeric;
  this.parseSBCNumber= PublicFunction_parseSBCNumber;
  this.parseXml= PublicFunction_parseXml;
  this.parseXmlK= PublicFunction_parseXmlK;
  this.readFile= PublicFunction_readFile;
  this.rtrim= PublicFunction_rtrim;
  this.today= PublicFunction_today;
  this.trim= PublicFunction_trim;
  this.trimAll= PublicFunction_trimAll;
  this.writeFile= PublicFunction_writeFile;
  this.createPath= PublicFunction_createPath;
  this.createFSO= PublicFunction_createFSO;
  this.parseXml= PublicFunction_parseXml;
  this.parseXmlK= PublicFunction_parseXmlK;
  this.getCenterRect= PublicFunction_getCenterRect;
  this.getOwner= PublicFunction_getOwner;
  this.clearKilo= PublicFunction_clearKilo;
  this.forceFileExtName= PublicFunction_forceFileExtName;
  this.getBiggerKey= PublicFunction_getBiggerKey;
  this.isVisible= PublicFunction_isVisible;
  this.setOpacity= PublicFunction_setOpacity;
  //以上已完成文档;

  this.isEqualArray= PublicFunction_isEqualArray;
  this.getFileNames = PublicFunction_getFileNames;
  this.getCurrPath = PublicFunction_getCurrPath;
  this.deleteFile = PublicFunction_deleteFile;
  this.getIP= PublicFunction_getIP;
  //this.getSaveAsFileName= PublicFunction_getSaveAsFileName;
  this.isNaN= PublicFunction_isNaN;
  this.formatNum2Str = PublicFunction_formatNum2Str;
  this.getFieldXml = PublicFunction_getFieldXml;
  this.getWraptXml = PublicFunction_getWraptXml;
  this.getNaturalXmlString= PublicFunction_getNaturalXmlString;
  this.textToXml= PublicFunction_textToXml;
  this.xmlToText= PublicFunction_xmlToText;
  this.escapeXmlMark= PublicFunction_escapeXmlMark;
  this.getParentObj= PublicFunction_getParentObj;
  this.wraptWithCDATA = PublicFunction_wraptWithCDATA;
  
  //private;
  this.addListener= PublicFunction_addListener;
  this.deleteListener= PublicFunction_deleteListener;
  this.findListener= PublicFunction_findListener;
  this.fireEvent= PublicFunction_fireEvent;
  this.setListenerEnabled= PublicFunction_setListenerEnabled;
  this.isValidListener= PublicFunction_isValidListener;
  this.execEvent= PublicFunction_execEvent;
  this.makeListenerKey= PublicFunction_makeListenerKey;
  this.getFunctionName= PublicFunction_getFunctionName;
  this.getHtmlEncode= PublicFunction_getHtmlEncode;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
function PublicFunction_parseInt(sValue){
  if (sValue== null) return 0;
  if (sValue== "") return 0;
  try{
    sValue= (sValue+"").replace(Const.RE_SIGN_COMMA, "");
    sValue= parseInt(sValue, 10);
  }catch(e){return 0;}
  return sValue;
  //if (isNaN(sValue)) return 0;
  //return parseInt(sValue);
}
//----------------------------------------------------------------------
function PublicFunction_parseFloat(sValue){
  if (sValue== null) return 0;
  try{
    sValue= (sValue+"").replace(Const.RE_SPACE, "");
    if (sValue== "") return 0;
    sValue= (sValue+"").replace(Const.RE_SIGN_COMMA, "");
    sValue= parseFloat(sValue);
  }catch(e){return 0;}
  return sValue;
  //if (isNaN(sValue)) return 0;
  //return parseFloat(sValue);
}
//----------------------------------------------------------------------
function PublicFunction_parseBool(sValue){
  if (sValue== null) return false;
  if (sValue== true) return true;
  if (sValue== false) return false;
  if (sValue== "") return false;
  if (sValue.toUpperCase()== "TRUE") return true;
  if (sValue.toUpperCase()== "Y") return true;
  if (sValue.toUpperCase()== "T") return true;
  return false;
}
//----------------------------------------------------------------------
//public; 解析全角数字为阿拉伯数字;
//返回值: 成功: sNumber, 否则: null;
function PublicFunction_parseSBCNumber(sNumber){
  if (sNumber== null || sNumber.length== 0) return sNumber;
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_0, "0");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_1, "1");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_2, "2");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_3, "3");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_4, "4");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_5, "5");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_6, "6");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_7, "7");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_8, "8");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_9, "9");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_SUB, "-");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_FULLSTOP, ".");
  sNumber= sNumber.replace(Const.RE_SIGN_SBC_COMMA, ",");
  return sNumber;
}
//----------------------------------------------------------------------
//public; 清除千分位",";
//返回值: 成功: 字符串, 否则: null;
function PublicFunction_clearKilo(sNumber){
  if (sNumber== null) return null;
  var vsNumber= sNumber+ "";
  if (vsNumber.length== 0) return vsNumber;
  vsNumber= this.trim(vsNumber.replace(Const.RE_SIGN_COMMA, ""));
  return vsNumber;
}
//----------------------------------------------------------------------
//public; 精确解析小数;并进行四舍五入;
//返回值: 成功: 字符串, 否则: null;
function PublicFunction_parseKilo(sNumber){
  if (sNumber== null) return null;
  var vsNumber= sNumber+ "";
  if (vsNumber.length== 0) return vsNumber;
  vsNumber= this.trim(vsNumber.replace(Const.RE_NOT_NUMERIC, ""));

  var viStart= vsNumber.length;
  var viStart2= vsNumber.indexOf(".");
  if (viStart2>= 0) viStart= viStart2;
  for(var i= viStart- 3; i> 0; i= i- 3){
    if (vsNumber.substring(i-1, i)== "-"
        || vsNumber.substring(i-1, i)== "+") continue;
    vsNumber= vsNumber.substring(0, i)+ ","+ vsNumber.substr(i);
  }
  return vsNumber;
}
//----------------------------------------------------------------------
//public; 精确解析小数;并进行四舍五入;
//返回值: 成功: new Array(nNumeric, sNumeric), 否则: null;
function PublicFunction_parseNumeric(nNumeric, iLength, iScale){
  //alert(this.CLASSNAME+ ".parseNumeric();")
  //检查参数,并整理参数;
  if (iLength== null || iLength< 0 || isNaN(iLength)) return new Array(0, "0");
  if (iScale== null || isNaN(iScale)) iScale= 0;
  if (iScale< 0) iScale= 0;
  if (iLength<= iScale) iLength= iScale+ 1;
  //if (nNumeric== null || isNaN(nNumeric)) nNumeric= "0";
  nNumeric= PF.parseFloat(nNumeric);
  if (isNaN(nNumeric)) nNumeric= 0;
  var vtIsPlus= (nNumeric>= 0)?true:false;
  nNumeric= ""+ Math.abs(nNumeric);
  if (nNumeric.indexOf("e-") > -1 || nNumeric.indexOf("E-") > -1
     || nNumeric.indexOf("e+") > -1 || nNumeric.indexOf("E+") > -1){
    var aaa = new Number(nNumeric);
    nNumeric=aaa.toFixed(iScale + 1);
  }
  var vsNumber= (nNumeric+ "").replace(Const.RE_NOT_NUMERIC, "")
  if (vsNumber.length== 0) vsNumber= "0";
  var vnNumeric= parseFloat(vsNumber);
  if (isNaN(vnNumeric)) vnNumeric= 0;

  var vsNumeric= "";

  //小数处理及四舍五入处理;
  if (iScale== 0){
    vnNumeric= Math.round(vnNumeric);
    vsNumeric= vnNumeric+ "";
  }else{
    var viIntPart= Math.floor(vnNumeric);
    //var vnDecPart= vnNumeric- viIntPart; //会产生浮点,不能用; //例如:(9999.03565, 10, 4) --> 9999.0356 / 9999.0357
    var vnDecPart= parseFloat((""+ vnNumeric).substr((""+ viIntPart).length, iLength));
    if (isNaN(vnDecPart)) vnDecPart= 0;

    //数据长度处理;
    var viIntLength= iLength- iScale- 1;
    if ((""+ viIntPart).length> viIntLength){
      viIntPart= parseInt((""+ viIntPart).substr((""+ viIntPart).length- viIntLength, viIntLength));
    }
    if (isNaN(viIntPart)) viIntPart= 0

    //生成 vnNumeric;
    var viPow= Math.pow(10, iScale);
    var vnNew= Math.round((1+ vnDecPart)* viPow);
    vnNumeric= viIntPart+ ((vnNew- viPow)/ viPow);

    //生成 vsNumeric;
    viIntPart= viIntPart+ parseInt((""+ vnNew).substr(0, 1))- 1;
    var vsDecPart= (""+ vnNew).substr(1, iScale);
    vsNumeric= viIntPart+ "."+ vsDecPart;
  }
  
  if (!vtIsPlus){
    vnNumeric= 0- vnNumeric;
    vsNumeric= "-"+ vsNumeric;
  }
  return new Array(vnNumeric, vsNumeric);
}
//----------------------------------------------------------------------
//public; 是否为有效的日期;主要是日期格式检查;
//返回值: 成功: true, 否则: false;
function PublicFunction_isValidDate(sDate){
  return true;
  if (sDate== null) return true;
  var vsDate= this.trim(sDate);
  if (vsDate== "") return true;
  if (vsDate.length< 8) return false;
  //var vsDate= this.trimAll(sDate);
  //if (vsDate.length< 8) return false;

  vsDate= this.parseSBCNumber(vsDate);
  vsDate= vsDate.replace(Const.RE_SIGN_SBC_BIAS, "/");
  var vtIsValid= Const.DATE_EXPRESSION.test(vsDate);
  vtIsValid= true; //暂用;
  return vtIsValid;
}
//----------------------------------------------------------------------
function PublicFunction_isNumber(sValue){
  //alert(sValue);
  if (this.isInt(sValue)) return true;
  if (this.isFloat(sValue)) return true;
  return false;
}
//----------------------------------------------------------------------
function PublicFunction_isInt(sValue){
  if (sValue== null) return false;
  var vsValue= this.trim(sValue+ "");
  var vsResult= "";
  vsResult= vsValue.replace(this.RE_INT01, "");
  if (vsResult.length== 0) return true;
  vsResult= vsValue.replace(this.RE_INT02, "");
  if (vsResult.length== 0) return true;
  vsResult= vsValue.replace(this.RE_INT03, "");
  if (vsResult.length== 0) return true;
  return false;
}
//----------------------------------------------------------------------
//iPrecision: 18; iScale: 2; Length: 18+ 2+ 1= 21
function PublicFunction_isFloat(sValue){
  if (sValue== null) return false;
  var vsValue= this.trim(sValue+ "");
  var vsResult= "";
  vsResult= vsValue.replace(this.RE_FLOAT01, "");
  if (vsResult.length== 0) return true;
  vsResult= vsValue.replace(this.RE_FLOAT02, "");
  if (vsResult.length== 0) return true;
  vsResult= vsValue.replace(this.RE_FLOAT03, "");
  if (vsResult.length== 0) return true;
  return false;
}
//----------------------------------------------------------------------
//判断一个值是否为空;或空格串;
function PublicFunction_isEmpty(sValue){
  if (sValue== null || sValue.length== 0 || sValue == "null") return true;
  if (typeof(sString)== "object") return false;
  sValue= this.ltrim(sValue);
  if ((sValue+"").length== 0) return true;
  return false;
}
//----------------------------------------------------------------------
//判断一个元素是否可见.
function PublicFunction_isVisible(oEle){
  if (oEle== null) return false;
  var voEle= oEle;
  var vtIsVisible= false;
  if (voEle.nodeName== "FRAME"){
    vtIsVisible= voEle.style.display== "none"? false: true;
    if (vtIsVisible) vtIsVisible= voEle.style.visibility== "hidden"? false: true;
    return vtIsVisible;
  }
  while(voEle!= document.body){
    vtIsVisible= voEle.style.display== "none"? false: true;
    if (vtIsVisible== false) break;
    vtIsVisible= voEle.style.visibility== "hidden"? false: true;
    if (vtIsVisible== false) break;
    voEle= voEle.parentNode;
  }
  return vtIsVisible;
}
//----------------------------------------------------------------------
//获取指定元素的绝对位置;
//返回值: 成功: Rect; 否则: null;
function PublicFunction_getAbsRect(oElement, oParent){
  if (oElement== null) return null;
  var voRect= new Rect();
  voRect.iWidth= oElement.offsetWidth;
  voRect.iHeight= oElement.offsetHeight;
//debugger;
  var viLeft= 0;
  var viTop= 0;

  while(true){
    if (oParent== null){
      if (oElement.nodeName.toUpperCase()== "BODY") break;
    } else {
      if (oElement== oParent) break;
    }
    if (oElement== null) return null;
    viLeft+= oElement.offsetLeft;
    viTop+= oElement.offsetTop;
    oElement= oElement.offsetParent;//parentNode;
  }

  voRect.iLeft= viLeft;
  voRect.iTop= viTop;

  return voRect;
}
//----------------------------------------------------------------------
function PublicFunction_isValidArray(oObj){
  try{
    if (oObj== null) return false;
    if (typeof(oObj)!="object") return false;
    if (oObj.length < 0) return false;
    //var voElement= oObj[0];
    //if ((typeof voElement)== "undefined") return false;
    //this.Arg(2, oObj, voElement);
    return true;
  }catch(e){
    //Info.ThrowE(e, this.CLASSNAME, "IsArray");
    return false;
  }
}
//----------------------------------------------------------------------
//public; 比较数组内容是否相同;
//return: true / false;
function PublicFunction_isEqualArray(avArray1, avArray2){
  if (avArray1== null && avArray2== null) return true;
  if (avArray1!= null && avArray2!= null && avArray1.length== 0 && avArray2.length== 0) return true;
  if (PF.isValidArray(avArray1)== false) return false;
  if (PF.isValidArray(avArray2)== false) return false;
  var vsStr1= "";
  var vsStr2= "";
  try{vsStr1= avArray1.toString();}
  catch(e){
    var vavCopy= new Array();
    for (var i= 0, len= avArray1.length; i< len; i++){
      vavCopy[i]= avArray1[i];
    }
    vsStr1= vavCopy.toString();
  }
  try{vsStr2= avArray2.toString();}
  catch(e){
    var vavCopy= new Array();
    for (var i= 0, len= avArray2.length; i< len; i++){
      vavCopy[i]= avArray2[i];
    }
    vsStr2= vavCopy.toString();
  }
  return vsStr1== vsStr2;
}
//----------------------------------------------------------------------
//private;
//生成调用外部事件.
function PublicFunction_fireEvent(oSender, sEvent, aoArg){
	//alert("PublicFunction_fireEvent();");
  if (oSender== null) return;
  if (sEvent== null) return;
  if (sEvent.length== 0) return;
  if (oSender.oEventMap== null) return;
  var voListenerMap= oSender.oEventMap.get(sEvent);
  if (voListenerMap== null) return;

  var vaoListener= voListenerMap.getAllItem();
  var voListener= null;

  for (var i= 0; i< vaoListener.length; i++){
    voListener= vaoListener[i];
    if (voListener== null) continue;
    if (voListener.tEnabled== false) continue;
    if (voListener.sEventName== null) continue;
    if (voListener.sEventName!= sEvent) continue;
    if (voListener.oAnswerMethod== null) continue;
    this.execEvent(oSender, voListener.oAnswerMethod, aoArg, voListener.oDest);
     voListener.oOwnerFrame = null;
  }
  return true;
}
//----------------------------------------------------------------------
//private;
//生成调用外部事件.
function PublicFunction_execEvent(oSender, oAnswerMethod, aoArg, oDest){
 //alert("CPublicFunction_ExecEvent();");
  if (oSender== null) return;
  if (oAnswerMethod== null) return;
  if (this.isValidArray(aoArg)== false) {aoArg= new Array(); aoArg[0]= oSender;}

  var vsEvent= "";
  var voDest= null;
  var vsArg= "";
  var vvRet= null;

  if (oDest== null) voDest= oSender.oDest;
  else voDest= oDest;

  for (var i= 0; i< aoArg.length; i++){
    vsArg+= "aoArg[" +i+ "]";
    if (i< aoArg.length -1) vsArg+= ", ";
  }

  //执行事件.
  if (voDest== null){
    vsEvent= "oAnswerMethod(" +vsArg+ ");";
  }else{
    vsEvent= "oAnswerMethod.call(oDest, " +vsArg+ ");";
  }
  vvRet= eval(vsEvent);
  return vvRet;
}
//----------------------------------------------------------------------
//判断指定的方法是否存在.
function PublicFunction_isExistMethod(oObject, sMethodName){
  if ((typeof oObject)!= "object") return false;
  if (oObject== null) return false;
  var vsMethodName= ""+ sMethodName;
  if (vsMethodName.length== 0) return false;

  var vtExist= true;
  var voMethodPoint= null;

  //分不同的情况确定方法是否存在.
  if (oObject== null) eval("try{voMethodPoint= " +vsMethodName+ ";} catch(e){vtExist= false;}");
  else eval("try{voMethodPoint= oObject." +vsMethodName+ ";} catch(e){vtExist= false;}");

  if (voMethodPoint== null) vtExist= false;
  return vtExist;
}
//
//----------------------------------------------------------------------
//判断指定的方法是否存在.
function PublicFunction_isExistMethodK(oMethod){
  if (typeof(oMethod)== "function"
      || typeof(oMethod)== "object") return true;
  return false;
}
//----------------------------------------------------------------------
//private;
//public; 侦听者是否有效;
//return: true/ false;
function PublicFunction_isValidListener(oListener){
  //alert("PublicFunction_addListener();");
  if (oListener== null) return false;
  if (oListener.CLASSNAME!= "gp.common.Listener") return false;
  if (oListener.oDest== null) return false;
  if (oListener.oAnswerMethod== null) return false;
  if (oListener.sEventName== null || oListener.sEventName.length== 0) return false;
  return true;
}
//----------------------------------------------------------------------
//private;
//增加事件侦听对象.
function PublicFunction_addListener(oListener){
  //alert("PublicFunction_addListener();");
  if (this.isValidListener(oListener)== false) return false;
  var voSour= oListener.oSource;
  if (voSour.oEventMap== null) voSour.oEventMap= new Map();
  var voListenerMap= voSour.oEventMap.get(oListener.sEventName);
  if (voListenerMap== null){
    voListenerMap= new Map();
    voSour.oEventMap.put(oListener.sEventName, voListenerMap);
  }
  var vsKey= this.makeListenerKey(oListener.sEventName, oListener.oSource, oListener.oDest, oListener.oAnswerMethod);
  if (vsKey== null) return false;
  voListenerMap.put(vsKey, oListener);
  return true;
}
//----------------------------------------------------------------------
//private;
//删除事件侦听对象.
//以侦听的目标对象 类名+名称 为标志,来决定一个对象.
//同时,如果存在 事件名, 则只删除指定的事件名的侦听者对象,否则,是此对象的侦听全删除.
function PublicFunction_deleteListener(sEvent, oSource, oDest, oAnswerMethod){
  if (sEvent== null) return true;
  if (oSource== null) return true;
  if (oDest== null) return true;
  if (oSource.oListenerMap== null) return true;
  if (oSource.oEventMap== null) return true;
  var voListenerMap= oSource.oEventMap.get(sEvent);
  if (voListenerMap== null) return true;
  var vsKey= this.makeListenerKey(sEvent, oSource, oDest, oAnswerMethod);
  voListenerMap.remove(vsKey);
  return true;
}
//----------------------------------------------------------------------
//private;
//设置事件侦听的可用性.
//以侦听的目标对象 类名+UID 为标志,来决定一个对象.
//同时,如果存在 事件名, 则只删除指定的事件名的侦听者对象,否则,是此对象的侦听全删除.
function PublicFunction_setListenerEnabled(oListener, tEnabled){
  if (this.isValidListener(oListener)== false) return false;
  if (tEnabled== null) tEnabled= false;
  oListener.tEnabled= tEnabled;
  return true;
}
//----------------------------------------------------------------------
//private; 生成事件侦听的 map key;
//return: key; 否则: null;
function PublicFunction_makeListenerKey(sEvent, oSour, oDest, oAnswerMethod){
  if (sEvent== null) return null;
  if (oSour== null) return null;
  if (oDest== null) return null;
  if (oAnswerMethod== null) return null;
  var vsKey= sEvent+ "_"+ oSour.sUID+ "_"+ oDest.sUID+ "_"+ this.getFunctionName(oAnswerMethod);
  return vsKey;
}
//----------------------------------------------------------------------
//private;
function PublicFunction_getFunctionName(oFunction){
  var vsText= oFunction.toString();
  var pos1= vsText.indexOf("function");
  var pos2= vsText.indexOf("(");
  var vsName= vsText.substring(pos1+ "function".length, pos2);
  vsName= this.trimAll(vsName);
  return vsName;
}
//----------------------------------------------------------------------
//private;
//发现事件侦听对象.
function PublicFunction_findListener(sEvent, oSour, oDest, oAnswerMethod){
  if (oSour== null) return null;
  if (oDest== null) oDest= window;
  if (oSour.oEventMap== null) return null;
  var voListenerMap= oSour.oEventMap.get(sEvent);
  if (voListenerMap== null) return null;
  var vsKey= this.makeListenerKey(sEvent, oSour, oDest, oAnswerMethod);
  var voListener= voListenerMap.get(vsKey);
  return voListener;
}
//----------------------------------------------------------------------
function PublicFunction_getIP(){
  return this.sIP;
}
//----------------------------------------------------------------------
function PublicFunction_getUID(sJoinChar){
  //alert("PublicFunction_getUID();");
  if (sJoinChar== null) sJoinChar= "-";
  var vlTime= new Date()/1;
  if (vlTime== this.lUidTime){
    this.iIncrement++;
  }else{
    this.lUidTime= vlTime;
    this.iIncrement= 0;
  }
  var vsUID= this.getIP().replace(/\./gi, sJoinChar)+ sJoinChar+ vlTime+ sJoinChar+ this.iIncrement;
  return vsUID;
}
//----------------------------------------------------------------------
//删除左右空格.
function PublicFunction_trim(sString){
  if (sString== null) return sString;
  if (typeof(sString)== "object") return sString;
  var vsString= sString+ "";
  var viPos1= vsString.search(this.RE_TRIM_L);
  if (viPos1< 0) return "";
  var viPos2= vsString.search(this.RE_TRIM_R);
  if (viPos2< 0) viPos2= vsString.length;
  if (viPos1> viPos2) return "";
  var vsNewStr= vsString.substring(viPos1, viPos2+ 1);
  return vsNewStr;
}
//----------------------------------------------------------------------
//删除左空格.
function PublicFunction_ltrim(sString){
  if (sString== null) return sString;
  if (typeof(sString)== "object") return sString;
  var vsString= sString+ "";
  var viIndex= vsString.search(this.RE_TRIM_L);
  if (viIndex< 0) return "";
  var vsNewStr= vsString.substr(viIndex);
  //alert(vsNewStr);
  return vsNewStr;
}
//----------------------------------------------------------------------
//删除右空格.
function PublicFunction_rtrim(sString){
  if (sString== null) return sString;
  if (typeof(sString)== "object") return sString;
  var vsString= sString+ "";
  var viIndex= vsString.search(this.RE_TRIM_R);
  if (viIndex< 0) viIndex= vsString.length;
  var vsNewStr= vsString.substring(0, viIndex+ 1);
  return vsNewStr;
}
//----------------------------------------------------------------------
//删除所有的空格.
function PublicFunction_trimAll(sString){
  if (sString== null) return sString;
  var vsString= sString+ "";
  var vsNewStr= vsString.replace(this.RE_SPACE, "");
  return vsNewStr;
}
//----------------------------------------------------------------------
//public; 获取今天的日期串;
//return: 成功: 今天的日期串; 否则: null;
function PublicFunction_today(){
  var vjDateObj= new Date();
  var viYear= vjDateObj.getUTCFullYear();
  var viMonth= vjDateObj.getUTCMonth() +1;
  var viDay= vjDateObj.getUTCDate();

  var vsDate= "";
  vsDate+= viYear+ "-";

  if (viMonth< 10) vsDate+= "0"+ viMonth+ "-";
  else vsDate+= viMonth+ "-";

  if (viDay< 10) vsDate+= "0"+ viDay;
  else vsDate+= viDay;

  return vsDate;
}
//----------------------------------------------------------------------
//获取当前时间;以文本形式表式;
function PublicFunction_getMinute(){
  var vjNow= new Date();
  var vsYear= vjNow.getUTCFullYear()+ "";
  var vsMonth= (vjNow.getUTCMonth()+ 1)+ "";
  var vsDay= vjNow.getUTCDate()+ "";
  var vsHours= vjNow.getHours()+ "";
  var vsMinutes= vjNow.getUTCMinutes()+ "";
  var vsSeconds= vjNow.getUTCSeconds()+ "";

  if (vsMonth.length< 2) vsMonth= "0"+ vsMonth;
  if (vsDay.length< 2) vsDay= "0"+ vsDay;
  if (vsHours.length< 2) vsHours= "0"+ vsHours;
  if (vsMinutes.length< 2) vsMinutes= "0"+ vsMinutes;
  var vsTime= ""+ vsYear+ "-"+ vsMonth+ "-"+ vsDay+ " "+ vsHours+ ":"+ vsMinutes;
  return vsTime;
}
//----------------------------------------------------------------------
//获取当前时间;以文本形式表式;
function PublicFunction_getSecond(){
  var vjNow= new Date();
  var vsYear= vjNow.getUTCFullYear()+ "";
  var vsMonth= (vjNow.getUTCMonth()+ 1)+ "";
  var vsDay= vjNow.getUTCDate()+ "";
  var vsHours= vjNow.getHours()+ "";
  var vsMinutes= vjNow.getUTCMinutes()+ "";
  var vsSeconds= vjNow.getUTCSeconds()+ "";

  if (vsMonth.length< 2) vsMonth= "0"+ vsMonth;
  if (vsDay.length< 2) vsDay= "0"+ vsDay;
  if (vsHours.length< 2) vsHours= "0"+ vsHours;
  if (vsMinutes.length< 2) vsMinutes= "0"+ vsMinutes;
  if (vsSeconds.length< 2) vsSeconds= "0"+ vsSeconds;
  var vsTime= ""+ vsYear+ "-"+ vsMonth+ "-"+ vsDay+ " "+ vsHours+ ":"+ vsMinutes+ ":"+ vsSeconds;
  return vsTime;
}
//----------------------------------------------------------------------
//检查字符串中是否有 XML 拼串中的敏感字符;
function PublicFunction_isValidXMLString(sText){
  if (sText== null) return true;
  if (typeof(sText)!= "string") sText+= "";
  if (sText.length== 0) return true;
  if (sText.indexOf("<")>= 0) return false;
  if (sText.indexOf("\"")>= 0) return false;
  if (sText.indexOf("\'")>= 0) return false;
  if (sText.indexOf("&")>= 0) return false;
  return true;
}
//----------------------------------------------------------------------
function PublicFunction_getNaturalXmlString(sText){
  if (sText== null) return "";
  if (typeof(sText)!= "string") sText+= "";
  if (sText.length== 0) return "";
  sText= sText.replace(/&lt;/gi, "<");
  sText= sText.replace(/&gt;/gi, ">");
  sText= sText.replace(/&quot;/gi, "\"");
  return sText;
}
//----------------------------------------------------------------------
//用于数组排序; 整型数字;
function PublicFunction_compareInt(iFirst, iSecond){
  if (parseInt(iFirst)== parseInt(iSecond)) return 0;
  if (parseInt(iFirst)< parseInt(iSecond)) return -1;
  return 1;
}
//----------------------------------------------------------------------
function PublicFunction_readFile(sFileName){
  if (this.isEmpty(sFileName)) return null;
  var voFSO= this.createFSO();
	if (!voFSO.FileExists(sFileName)) return null;
	var voFile= voFSO.OpenTextFile(sFileName, this.OPEN_FILE_FORREADING, true);
	if (voFile== null) return null;
	var vsText= voFile.ReadAll();
	voFile.Close();
  return vsText;
}
//----------------------------------------------------------------------
function PublicFunction_writeFile(sFileName, sText, iIOMode){
  if (this.isEmpty(sFileName)) return false;
  if (iIOMode== null) iIOMode= this.OPEN_FILE_FORWRITING;
  var voFSO= this.createFSO();
	try {  
		var voFile= voFSO.OpenTextFile(sFileName, iIOMode, true);
		if (voFile== null) return false;
		voFile.Write(sText);
		voFile.Close();
		return true;
	}catch(err){ 
		alert(sFileName+":"+err.description)
		return false;
	}
}
//----------------------------------------------------------------------
//创建文件路径,使用绝对路径.
function PublicFunction_createPath(sPath, sSeparator){
  var vasElement= sPath.split(sSeparator);
  if (vasElement.length< 2) return false;

  var voFSO= this.createFSO();
  var vsPath= vasElement[0];
  for (var i= 1; i< vasElement.length; i++){
    if (this.isEmpty(vasElement[i])) continue;
    vsPath+= sSeparator+ vasElement[i];
    if (voFSO.FolderExists(vsPath)) continue;
    voFSO.CreateFolder(vsPath);
  }
  return true;
}
//----------------------------------------------------------------------
function PublicFunction_createFSO(){
  var voFSO= new ActiveXObject("Scripting.FileSystemObject");
  return voFSO;
}
//----------------------------------------------------------------------
function PublicFunction_parseXml(sText){
  if (sText== null || sText== "") return null;
  return this.parseXmlK(sText).documentElement;
}
//----------------------------------------------------------------------
function PublicFunction_parseXmlK(sText){
  if (sText== null || sText== "") return null;
	var voXmldom = new ActiveXObject("Microsoft.XMLDOM");
	voXmldom.loadXML(sText);
	return voXmldom;
}
//----------------------------------------------------------------------
//获取指定大小的区域在屏幕中心的位置;
function PublicFunction_getCenterRect(iWidth, iHeight){
  var voRect= new Rect();
	var viScreenWidth= screen.availWidth- 10;
	var viScreenHeight= screen.availHeight- 30;
	if (iWidth== null) iWidth= viScreenWidth;
	if (iHeight== null) iHeight= viScreenHeight;
	voRect.iLeft= (viScreenWidth- parseInt(iWidth))/ 2;
	voRect.iTop= (viScreenHeight- parseInt(iHeight))/ 2;
	voRect.iWidth= iWidth;
	voRect.iHeight= iHeight;
	return voRect;
}
//----------------------------------------------------------------------
//获取指定 HTML 对象的 oOwner 对象;
function PublicFunction_getOwner(oObj){
  if (oObj== null) return null;
  if (typeof(oObj)!= "object") return null;
  var voObj= oObj;
  while(true){
    if (voObj== null) return null;
    if (voObj.nodeName== "BODY") return null;
    if (voObj== document) return null;
    if (voObj.oOwner!= null) return voObj.oOwner;
    voObj=  voObj.parentNode;
  }
  return null;
}
//----------------------------------------------------------------------
function PublicFunction_setOpacity(oElement, sColor, iStartOpacity, iFinishOpacity, iStyle){
  if (oElement== null) return;
  if (iStartOpacity== null) iStartOpacity= Const.BACK_START_OPACITY;
  if (iFinishOpacity== null) iFinishOpacity= Const.BACK_FINISH_OPACITY;
  if (iStyle== null) iStyle= Const.BACK_STYLE;
  if (sColor== null) sColor= Const.BACK_COLOR;

  if (iStartOpacity< 0 || iStartOpacity> 100) iStartOpacity= Const.BACK_START_OPACITY;
  if (iFinishOpacity< 0 || iFinishOpacity> 100) iFinishOpacity= Const.BACK_FINISH_OPACITY;
  if (iStyle< 0 || iStyle> 3) iFinishOpacity= Const.BACK_STYLE;

  //PF.Arg(iStartOpacity, iFinishOpacity, iStyle, sColor);
  oElement.style.backgroundColor= sColor;
  oElement.style.filter= "Alpha(Opacity= "+ iStartOpacity+ ", FinishOpacity= "+ iFinishOpacity+ ", Style= "+ iStyle+ ")";
  //alert("Alpha(Opacity= "+ iStartOpacity+ ", FinishOpacity= "+ iFinishOpacity+ ", Style= "+ iStyle+ ")");
  return;
}
//----------------------------------------------------------------------
//public; 强制文件的扩展名;
//return: 成功:file name; 否则:"";
function PublicFunction_forceFileExtName(sFile, sExt){
  if (PF.isEmpty(sExt)) return sFile;
  var vsFile= sFile;
  var vsExt= "."+ sExt;
  if (sFile.substr(sFile.length- vsExt.length)!= vsExt){
    vsFile= sFile+ vsExt;
  }
  return vsFile;
}
//----------------------------------------------------------------------
//public; 获取 较大的 key 值串;
//return: 成功: key 串, 失败: "";
function PublicFunction_getBiggerKey(sKey){
  //alert("TreeView_getBiggerKey();");
  if (sKey== null || sKey== "") return "";
  var viPos= sKey.length- 1;
  var vsLast= sKey.charAt(viPos);
  var viCode= vsLast.charCodeAt()+ 1;
  var vsNew= sKey.substring(0, viPos)+ String.fromCharCode(viCode);
  return vsNew;
}
//----------------------------------------------------------------------
function PublicFunction_getFileNames(sPathName){
  var voFSO= this.createFSO();
  if (sPathName == null || sPathName == "")
    sPathName = voFSO.GetFolder(".");
  var f;
  try {
    f = voFSO.GetFolder(sPathName);
  } catch (e){
    return new Array();
  }
  var ff = new Enumerator(f.Files);
  var vsFileNames = new Array();
  var i = 0;
  for (; !ff.atEnd(); ff.moveNext()){
    vsFileNames[i] = "" + ff.item();
    i++;
  }
  return vsFileNames;
}
//----------------------------------------------------------------------
function PublicFunction_getCurrPath(){
  var voFSO= this.createFSO();
  return "" + voFSO.GetFolder(".");
}
//----------------------------------------------------------------------
function PublicFunction_deleteFile(sFileName){
  var voFSO= this.createFSO();
  return voFSO.DeleteFile(sFileName);
}
//----------------------------------------------------------------------
/*
function PublicFunction_getSaveAsFileName(){
  var voDialog = new ActiveXObject("MSComDlg.CommonDialog");
  voDialog.CancelError = true;
  voDialog.DialogTitle = "保存文件";
  voDialog.FileName = "";
  voDialog.Filter = "文本文件(*.txt)|*.txt";
  voDialog.Flags= 8192;//voDialog.FileOpenConstants.cdlOFNCreatePrompt;
  voDialog.ShowSave();
  return voDialog.FileName;
}
//*/
//----------------------------------------------------------------------
function PublicFunction_isNaN(nNum){
  if (nNum== null) return true;
  if (nNum== "") return true;
  if (isNaN(PF.parseFloat(nNum))) return true;
  return false;
}
//----------------------------------------------------------------------
function PublicFunction_textToXml(text, level){
  if (level== null) level= 0;
  text= text.replace(new RegExp("%LESSTHEN"+ level+ "%", "g"), "<");
  text= text.replace(new RegExp("%MORETHEN"+ level+ "%", "g"), ">");
  return text;
}
//----------------------------------------------------------------------
function PublicFunction_xmlToText(text, level){
  if (level== null) level= 0;
  text= text.replace(/</g, "%LESSTHEN"+ level+ "%");
  text= text.replace(/>/g, "%MORETHEN"+ level+ "%");
  return text;
}
//----------------------------------------------------------------------
function PublicFunction_escapeXmlMark(text){
  text= text.replace(/</g, "&lt;");
  text= text.replace(/>/g, "&gt;");
  return text;
}
//----------------------------------------------------------------------
function PublicFunction_getParentObj(oChildEle, oPNodeName){
  if (oChildEle== null) return null;
  if (oPNodeName== null) return null;
  var voEle= oChildEle;
  for (var i= 0; i< 1000; i++){
    if (voEle.nodeName== "BODY") return null;
    voEle= voEle.parentNode;
    if (voEle.nodeName== oPNodeName.toUpperCase()) break;
  }
  return voEle;
}
//----------------------------------------------------------------------
//
function PublicFunction_formatNum2Str(num2,digit2){
   var str2=new Array(digit2);
   var result="";
   var tempNum=1;
   var temp;
   for(var i=1;i<=digit2;i++){
      if(num2>=tempNum){
        temp = num2%10;
        str2[digit2-i]=temp+"";
        num2=(num2-temp)/10;
      }else{
        str2[digit2-i]="0";
      }
   }
   for(var j=0;j<digit2;j++){
      result += str2[j]; 
   }
   return result;
}
function PublicFunction_getFieldXml(fieldName,fieldValue){
  var result = "";
  result += "<field name=\"";
  result += fieldName;
  result += "\" value=\"";
  result += this.getHtmlEncode(fieldValue) +"\"/>";
  return result;
}
function PublicFunction_getWraptXml(wraper,content){
  var result = "";
  result += "<"+ wraper+">";
  result += content;   
  result += "</"+ wraper+">";
  return result;
}
function PublicFunction_wraptWithCDATA(text){
  return "<![CDATA[" + text + "]]>";
}
function PublicFunction_getHtmlEncode(fString){
	if(fString==null || typeof(fString)=="undefined") return "";
	fString = fString.replace(/\&/g, "&amp;");  //&
	fString = fString.replace(/\>/g, "&gt;");   //大于号">"
	fString = fString.replace(/\</g, "&lt;");   //小于号 "<"
	fString = fString.replace(/\042/g, "&quot;"); //双引号
	return fString;
}

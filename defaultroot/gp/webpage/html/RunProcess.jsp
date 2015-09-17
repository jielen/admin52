<%@page language="java" contentType="text/html; charset=GBK" %>
<%@taglib uri="/applus" prefix="applus"%>

<html>
<head>
<meta http-eq_iv="Content-Type" content="text/html; charset=gb2312" />
<title>请稍候...</title>

<applus:include language="javascript">
gp.page.Processbar;
</applus:include>

<script>
//----------------------------------------------------------------------
window.focus();
window.onblur= function(){window.focus();};
//----------------------------------------------------------------------
var _oPB= null;
var _iBaseComplete= 0;
var _tIsAutoRun= true;
//----------------------------------------------------------------------
function pageInit(){
  if (opener== null){
    _tIsAutoRun= PF.parseBool(window.dialogArguments);
  }else{
    _tIsAutoRun= opener.PageX.tIsPrecessAutoRun
  }
  process();
  setPercent();
  if (opener!= null){
    opener.PageX.oProcessbar= _oPB;
    if (opener.PageX.tIsForceOpenProcess) opener.top.closeWin();
  }
}
//----------------------------------------------------------------------
function process(){
  _oPB= new Processbar();
  _oPB.iCellSpacing= 2;
  _oPB.make(document.body);
  _oPB.init();
  _oPB.resize();
  _oPB.setStyle("position:position; border:inset 1 ;");
  if (_tIsAutoRun) _oPB.autoRun();
  _oPB.setRect(new Rect(20, 30, 358, 20));
}
//----------------------------------------------------------------------
function setPercent(){
  var viComplete= parseInt(_oPB.getScale()* 100);
  if (viComplete>= 100){
    viComplete= 100;
    _iBaseComplete+= parseInt((100- _iBaseComplete)/2);
  }
  percentText.value= "  已完成: "+ parseInt(_iBaseComplete+ parseInt(viComplete/100*(100- _iBaseComplete)))+ "%";
  window.setTimeout("setPercent();", 500);
}
//----------------------------------------------------------------------
</script>
</head>

<body bgcolor="#C0C0C0" onload="pageInit();">
<br>
<br>
<br>
<input type="text" id="percentText" value="" style="text-align:left; font-size:9pt; border-width:0px; background-color:#C0C0C0;">
</body>
</html>

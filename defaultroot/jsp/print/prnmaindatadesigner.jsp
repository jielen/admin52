<%@ page contentType="text/html; charset=GBK" %>
<html>
<head>
<LINK href="../../script/applus.css" rel="stylesheet" type="text/css">

<SCRIPT language="javascript">
function clickOK()
{
	var prnTemplateName = document.all.PRN_TPL_NAMEID.value;
	///alert(prnTemplateName);
	if(prnTemplateName == "")
	{
		alert("请输入打印模板名称！");
		return;
	}

	var prnTemplateCode = document.all.PRN_TPL_CODEID.value;
	///alert(prnTemplateCode);
	if(!prnTemplateCode)
	{
		alert("请输入打印模板代码！");
		return;
	}
	
	if(prnTemplateCode.length > 0){
		var digi = /[0-9]/;
		if(digi.test(prnTemplateCode.charAt(0))){
			alert("打印模板代码的首字母不能是数字！");
			return;
		}	
	}

	var value = new Array(2);
	value[0] = prnTemplateName;
	value[1] = prnTemplateCode;
	window.returnValue = value;
	window.close();
}
</SCRIPT>
<title>打印模板</title>
</head>

<body leftMargin="0" rightMargin="0" topMargin="0">
     <table border=0 cellpadding="0" cellspacing="0" width=100%>
     	<tr>
        <td>
       		<table border="0" width=100% cellpadding="0" cellspacing="0">
       			<tr>
       				<td colspan="6">
       					<table border="0" width=100% cellpadding="0" cellspacing="0" >
       						<tr>
       							<td  background="/style/img/main/editcontentmidbk.jpg" width=100%>&nbsp;</td>
       							<td><img src="/style/img/main/editcontentright.jpg"></td>
       						</tr>
       					</table>
       				</td>
       			</tr>
       		</table>
      	</td>
     	</tr>
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
                  <td><img id="OK_leftImg" src="/style/img/func/left_behind.gif"></td>
                	<td id="OK_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
										<input type="button" name="OK" id="OKID"  class="clsListCall" value="确定" onclick="clickOK()"></input>
                	</td>
                	<td><img id="Ok_rightImg" src="/style/img/func/right_behind.gif"></td>
         			</tr>
      	 		</table>
  			 	<br>
       		</td>
       		</tr>
       	</table>
    	</td>
     </tr>
  	</table>

<table width="384">

  <tr id="showPrnTemplate">
    <td width="116" height="28"><span name="PRN_TPL_NAMECaption" id="PRN_TPL_NAMECaptionID" class="normalFieldCaption">打印模板名称</span></td>
    <td width="224"><span id="PRN_TPL_NAMESpan"><input type="text" name="PRN_TPL_NAMEEdit" id="PRN_TPL_NAMEID" style="BACKGROUND-COLOR: transparent;BORDER-BOTTOM: 1px groove #F8B8B8;BORDER-LEFT:0px;BORDER-RIGHT:0px;BORDER-TOP:0px;COLOR: #60BBFF;FONT-FAMILY:宋体;FONT-SIZE:13px;"></input>
      </span></td>
	</tr>
	<tr>

    <td height="28"><span name="PRN_TPL_CODECaption" id="PRN_TPL_CODECaptionID" class="normalFieldCaption">打印模板代码</span></td>
    <td><span id="PRN_TPL_CODESpan"><input type="text" name="PRN_TPL_CODEEdit" id="PRN_TPL_CODEID" style="BACKGROUND-COLOR: transparent;BORDER-BOTTOM: 1px groove #F8B8B8;BORDER-LEFT:0px;BORDER-RIGHT:0px;BORDER-TOP:0px;COLOR: #60BBFF;FONT-FAMILY:宋体;FONT-SIZE:13px;"></input>
      </span></td>
	</tr>
</table>
</body>
</html>

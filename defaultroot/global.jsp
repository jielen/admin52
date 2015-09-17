<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>
<%@page import="java.util.List"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@page import="com.anyi.gp.Pub"%>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>

<%
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>

<%
	boolean bHasRP = false;
	List appNames = (List)session.getServletContext().getAttribute(SessionUtils.APP_NAME_LIST_KEY);
	if(appNames == null) {
		appNames = GeneralFunc.getAppNames();
		session.getServletContext().setAttribute(SessionUtils.APP_NAME_LIST_KEY, appNames);
	}
	if(appNames != null && appNames.contains("RP")){
		bHasRP = true;
	}
	
	String localImgPath = "/";
	String localResourcePath = "/" + Pub.getWebRoot(request);
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<LINK href="<%=localResourcePath%>/script/applus.css" rel=stylesheet type=text/css>

<SCRIPT language='javascript' src='<%=localResourcePath%>/script/General.js'></SCRIPT>
<SCRIPT language='javascript' src='<%=localResourcePath%>/script/Community.js'></SCRIPT>
<SCRIPT language="javascript" src="/admin/script/Global.js"></SCRIPT>
<SCRIPT language="javascript" src="<%=localResourcePath%>/script/date.js"></SCRIPT>
<SCRIPT language="VBScript" src="<%=localResourcePath%>/script/formenctype.vbs"></SCRIPT>

<title>我的工作环境</title>

</head>

<SCRIPT language="javascript">
	var bHasRP = <%=bHasRP%>;
</SCRIPT>
<body onload="globalinit()"  leftMargin="0" rightMargin="0" topMargin="0" background="" class="pageBody">

<div id='toolbar' class='clsToolbarContainer4' hidefocus='true'  style='display:; ' >
<table border="0" cellspacing="0" cellpadding="0" class="clsToolbarTable4" >
<tr>
<td width="11px"><img border="0" src="<%=localImgPath%>style/img/gp5/toolbar/toolbar_left.jpg"></img></td>
<td id="CallsAreaTD" background="<%=localImgPath%>style/img/gp5/toolbar/toolbar_middle.jpg" valign="center" style="overflow:hidden;width:100%;" >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr id="CallsTR">
<td>
<div callId="fok" type="command" style="font-size:9pt;width:100%;padding:1px;" onclick='OK();' >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr height="18px" valign="bottom">
<td id="LeftSpaceTD" style="font-size:2px;">&nbsp;</td>
<td id="ImageTD" width="16px"><img border="0" width="16px" height="16px" src="<%=localImgPath%>style/img/gp5/ico/ok_g.jpg"></img></td>
<td style="font-size:3px;">&nbsp;</td>
<td id="CaptionTD" nowrap>确定</td>
<td id="RightSpaceTD" style="font-size:2px;">&nbsp;</td>
</tr>
</table>
</div>
</td>
<td>
<div callId="fcancel" type="command" style="font-size:9pt;width:100%;padding:1px;" onclick='CANCEL();' >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr height="18px" valign="bottom">
<td id="LeftSpaceTD" style="font-size:2px;">&nbsp;</td>
<td id="ImageTD" width="16px"><img border="0" width="16px" height="16px" src="<%=localImgPath%>style/img/gp5/ico/cancel_g.jpg"></img></td>
<td style="font-size:3px;">&nbsp;</td>
<td id="CaptionTD" nowrap>取消</td>
<td id="RightSpaceTD" style="font-size:2px;">&nbsp;</td>
</tr>
</table>
</div>
</td>
<td id="BlankTDOfToolbar5" width="100%">
</td>
</tr>
</table>
</td>
<td width="14px"><img id="MoreCallsImg" border="0" src="<%=localImgPath%>style/img/gp5/toolbar/toolbar_right.jpg"></img></td>
</tr>
</table>
</div>

<span id='fields'>
  <span field='svPoCode' alias='POSI_CODE' display='bottom'></span>
  <span field='svPoName' alias='POSI_NAME'></span>
  <span field='svOrgCode' alias='ORG_CODE'></span>
  <span field='svOrgName' alias='ORG_NAME'></span>
  <span field='svTransDate' alias='svTransDate' display='bottom'></span>
  <span field='svNd' alias='svNd'></span>
  <span field='svFiscalYear' alias='svFiscalYear'></span>
  <span field='svCoCode' alias='CO_CODE' display='bottom'></span>
  <span field='svCoName' alias='CO_NAME'></span>
  <span field='svUserID' alias='GRANT_USER' display='bottom'></span>
  <% if(bHasRP){%>
  <span field='svRpUseFlg' alias='svRpUseFlg'></span>
  <span field='svRpCoCode' alias='RP_CODE' display='bottom'></span>
  <span field='svRpCoName' alias='RP_NAME'></span>
  <span field='svRpType' alias='RP_TYPE_CODE' display='bottom'></span>
  <span field='svRpTypeName' alias='RP_TYPE_NAME'></span>
  <%} %>
  <span field='svFiscalPeriod' alias='svFiscalPeriod'></span>
  <span field='svRealUserID' alias='svRealUserID' display='bottom'></span>
  <span field='svAccountId' alias='ACCOUNT_ID' display='bottom'></span>
  <span field='svAccountName' alias='ACCOUNT_NAME'></span>
</span>
<span id='svEmpCodeHide' value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svEmpCode"),"")%>'></span>
<br>
<span id='foreigns'>
  <span id='AS_ORG_POSITION_Vfields'>
    <span name='svPoCode' + alias='POSI_CODE'></span>
    <span name='svPoName' alias='POSI_NAME'></span>
  </span>
  <span id='AS_ORGfields'>
    <span name='svOrgCode' + alias='ORG_CODE'></span>
    <span name='svOrgName' alias='ORG_NAME'></span>
  </span>
  <span id='AS_COMPANYfields'>
    <span name='svCoCode' + alias='CO_CODE'></span>
    <span name='svCoName' alias='CO_NAME'></span>
  </span>
  <span id='AS_USER_GRANTfields'>
    <span name='svUserID' + alias='GRANT_USER'></span>
    <span name='null' alias='null'></span>
  </span>
  <span id='RP_COMPANYfields'>
    <span name='svRpCoCode' + alias='RP_CODE'></span>
    <span name='svRpCoName' alias='RP_NAME'></span>
  </span>
  <span id='RP_RPT_TYPEfields'>
    <span name='svRpType' + alias='RP_TYPE_CODE'></span>
    <span name='svRpTypeName' alias='RP_TYPE_NAME'></span>
  </span>
  <span id='MA_CP_MA_CO_ACCfields'>
    <span name='svAccountId' + alias='ACCOUNT_ID'></span>
    <span name='svAccountName' alias='ACCOUNT_NAME'></span>
  </span>
</span>

<center><div>
<table border="0" cellpadding="0" cellspacing=3 align="center">
  <tr>
    <td align="right"><span name="svCoCodeCaption" id="svCoCodeCaptionID" class="normalFieldCaption" fieldname="svCoCode">单位代码</span>    </td>
    <td><span id="svCoCodeSpan"><input type="text" name="svCoCodeEdit" id="svCoCodeID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svCoCode"),"")%>' disabled='disabled' fieldname="svCoCode" class="normalFieldEditMain" fieldType="foreignKey"></input><img fieldname="svCoCode" id="svCoCodeForeignIMGID" src="<%=localImgPath%>style/img/main/search.gif" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="foreign_Select('AS_COMPANY')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svCoNameCaption" id="svCoNameCaptionID" class="normalFieldCaption" fieldname="svCoName">单位名称</span>    </td>
    <td><span id="svCoNameSpan"><input type="text" name="svCoNameEdit" class="normalFieldEditMain" id="svCoNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svCoName"),"")%>' disabled='disabled' fieldname="svCoName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svOrgCodeCaption" id="svOrgCodeCaptionID" class="normalFieldCaption" fieldname="svOrgCode">内部机构代码</span>    </td>
    <td><span id="svOrgCodeSpan"><input type="text" name="svOrgCodeEdit" id="svOrgCodeID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svOrgCode"),"")%>' disabled='disabled' fieldname="svOrgCode" class="normalFieldEditMain" fieldType="foreignKey"></input><img fieldname="svOrgCode" id="svOrgCodeForeignIMGID" src="<%=localImgPath%>style/img/main/search.gif" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="foreign_Select('AS_ORG')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svOrgNameCaption" id="svOrgNameCaptionID" class="normalFieldCaption" fieldname="svOrgName">内部机构名称</span>    </td>
    <td><span id="svOrgNameSpan"><input type="text" name="svOrgNameEdit" class="normalFieldEditMain" id="svOrgNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svOrgName"),"")%>' disabled='disabled' fieldname="svOrgName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svAccountIdCaption" id="svAccountIdCaptionID" class="normalFieldCaption" fieldname="svAccountId">账套代码</span>    </td>
    <td><span id="svAccountIdSpan"><input type="text" name="svAccountIdEdit" id="svAccountIdID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svAccountId"),"")%>' disabled='disabled' fieldname="svAccountId" class="normalFieldEditMain" fieldType="foreignKey"></input><img fieldname="svAccountId" id="svAccountIdForeignIMGID" src="<%=localImgPath%>style/img/main/search.gif" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="foreign_Select('MA_CP_MA_CO_ACC')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svAccountNameCaption" id="svAccountNameCaptionID" class="normalFieldCaption" fieldname="svAccountName">账套名称</span>    </td>
    <td><span id="svAccountNameSpan"><input type="text" name="svAccountNameEdit" class="normalFieldEditMain" id="svAccountNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svAccountName"),"")%>' disabled='disabled' fieldname="svAccountName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svTransDateCaption" id="svTransDateCaptionID" class="normalFieldCaption" fieldname="svTransDate">业务日期</span>    </td>
    <td><span id="svTransDateSpan"><input type="text" readonly name="svTransDateEdit" id="svTransDateID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svTransDate"),"")%>' fieldname="svTransDate" class="normalFieldEditMain" fieldType="date" onchange="date_Change();"></input><img fieldname="svTransDate" id="svTransDateDateIMGID" src="<%=localImgPath%>style/img/main/calendar_16x16.gif" width="20" height="18" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="Date_Select('svTransDate')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svFiscalYearCaption" id="svFiscalYearCaptionID" class="normalFieldCaption" fieldname="svFiscalYear">会计年度</span>    </td>
    <td><span id="svFiscalYearSpan"><input type="text" name="svFiscalYearEdit" id="svFiscalYearID" fieldname="svFiscalYear" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svFiscalYear"),"")%>' disabled='disabled' class="normalFieldEditMain" fieldType="num"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svFiscalPeriodCaption" id="svFiscalPeriodCaptionID" class="normalFieldCaption" fieldname="svFiscalPeriod">会计期间</span>    </td>
    <td><span id="svFiscalPeriodSpan"><input type="text" name="svFiscalPeriodEdit" id="svFiscalPeriodID" fieldname="svFiscalPeriod" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svFiscalPeriod"),"")%>' disabled='disabled' class="normalFieldEditMain" fieldType="num"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svNdCaption" id="svNdCaptionID" class="normalFieldCaption" fieldname="svNd">年度</span>    </td>
    <td><span id="svNdSpan"><input type="text" name="svNdEdit" id="svNdID" fieldname="svNd" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svNd"),"")%>' class="normalFieldEditMain" fieldType="num"></input></span></td>
  </tr>
  <% if(bHasRP){%>
  <tr>
    <td align="right"><span name="svRpTypeCaption" id="svRpTypeCaptionID" class="normalFieldCaption" fieldname="svRpType">表套代码</span>    </td>
    <td><span id="svRpTypeSpan"><input type="text" name="svRpTypeEdit" id="svRpTypeID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svRpType"),"")%>' disabled='disabled' fieldname="svRpType" class="normalFieldEditMain" fieldType="foreignKey"></input><img fieldname="svRpType" id="svRpTypeForeignIMGID" src="<%=localImgPath%>style/img/main/search.gif" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="foreign_Select('RP_RPT_TYPE')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svRpTypeNameCaption" id="svRpTypeNameCaptionID" class="normalFieldCaption" fieldname="svRpTypeName">表套名称</span>    </td>
    <td><span id="svRpTypeNameSpan"><input type="text" name="svRpTypeNameEdit" class="normalFieldEditMain" id="svRpTypeNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svRpTypeName"),"")%>' disabled='disabled' fieldname="svRpTypeName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <% }%>
  <tr>
    <td align="right"><span name="svPoCodeCaption" id="svPoCodeCaptionID" class="normalFieldCaption" fieldname="svPoCode">职位代码</span>    </td>
    <td><span id="svPoCodeSpan"><input type="text" name="svPoCodeEdit" id="svPoCodeID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svPoCode"),"")%>' disabled='disabled' fieldname="svPoCode" class="normalFieldEditMain" fieldType="foreignKey"></input><img fieldname="svPoCode" id="svPoCodeForeignIMGID" src="<%=localImgPath%>style/img/main/search.gif" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="foreign_Select('AS_ORG_POSITION_V')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="POSI_NAMECaption" id="svPoNameCaptionID" class="normalFieldCaption" fieldname="svPoName">职位名称</span>    </td>
    <td><span id="svPoNameSpan"><input type="text" name="svPoNameEdit" class="normalFieldEditMain" id="svPoNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svPoName"),"")%>' disabled='disabled' fieldname="svPoName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svUserIDCaption" id="svUserIDCaptionID" class="normalFieldCaption" fieldname="svUserID">登录帐号</span>    </td>
    <td><span id="svUserIDSpan"><input type="text" name="svUserIDEdit" id="svUserIDID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svUserID"),"")%>' disabled='disabled' fieldname="svUserID" class="normalFieldEditMain" fieldType="foreignKey"></input><img fieldname="svUserID" id="svUserIDForeignIMGID" src="<%=localImgPath%>style/img/main/search.gif" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="foreign_Select('AS_USER_GRANT')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svRealUserIDCaption" id="svRealUserIDCaptionID" class="normalFieldCaption" fieldname="svRealUserID">登录帐号</span>    </td>
    <td><span id="svRealUserIDSpan"><input type="text" name="svRealUserIDEdit" class="normalFieldEditMain" id="svRealUserIDID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svRealUserID"),"")%>' disabled='disabled' fieldname="svRealUserID" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <% if(bHasRP){%>
  <tr>
    <td align="right"><span name="svRpUseFlgCaption" id="svRpUseFlgCaptionID" class="normalFieldCaption" fieldname="svRpUseFlg">报表单位数启用标志</span>    </td>
    <td><span id="svRpUseFlgSpan"><input type="text" name="svRpUseFlgEdit" class="normalFieldEditMain" id="svRpUseFlgID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svRpUseFlg"),"")%>' disabled='disabled' fieldname="svRpUseFlg" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svRpCoCodeCaption" id="svRpCoCodeCaptionID" class="normalFieldCaption" fieldname="svRpCoCode">报表单位代码</span>    </td>
    <td><span id="svRpCoCodeSpan"><input type="text" name="svRpCoCodeEdit" id="svRpCoCodeID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svRpCoCode"),"")%>' disabled='disabled' fieldname="svRpCoCode" class="normalFieldEditMain" fieldType="foreignKey"></input><img fieldname="svRpCoCode" id="svRpCoCodeForeignIMGID" src="<%=localImgPath%>style/img/main/search.gif" align="absbottom" class="foreignIMG" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();" onclick="foreign_Select('RP_COMPANY')"></img></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svRpCoNameCaption" id="svRpCoNameCaptionID" class="normalFieldCaption" fieldname="svRpCoName">报表单位名称</span>    </td>
    <td><span id="svRpCoNameSpan"><input type="text" name="svRpCoNameEdit" class="normalFieldEditMain" id="svRpCoNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svRpCoName"),"")%>' disabled='disabled' fieldname="svRpCoName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <% }%>
      <tr>
    <td align="right"><span name="svUserNameCaption" id="svUserNameCaptionID" class="normalFieldCaption" fieldname="svUserName">帐 号 名</span>    </td>
    <td><span id="svUserNameSpan"><input type="text" name="svUserNameEdit" class="normalFieldEditMain" id="svUserNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svUserName"),"")%>' disabled='disabled' fieldname="svUserName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svRealUserNameCaption" id="svRealUserNameCaptionID" class="normalFieldCaption" fieldname="svRealUserName">登录帐号名</span>    </td>
    <td><span id="svRealUserNameSpan"><input type="text" name="svRealUserNameEdit" class="normalFieldEditMain" id="svRealUserNameID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svRealUserName"),"")%>' disabled='disabled' fieldname="svRealUserName" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align="right"><span name="svSysDateCaption" id="svSysDateCaptionID" class="normalFieldCaption" fieldname="svSysDate">系统日期</span>    </td>
    <td><span id="svSysDateSpan"><input type="text" name="svSysDateEdit" class="normalFieldEditMain" id="svSysDateID" value='<%=Pub.isNull(SessionUtils.getAttribute(request, "svSysDate"),"")%>' disabled='disabled' fieldname="svSysDate" fieldType="text" onchange="text_Change();"></input></span></td>
  </tr>
  <tr>
    <td align='right'>
    	<%
    		String checkID = SessionUtils.getAttribute(request, "checkID");
    		if(checkID == null || checkID.equals("0")){
    	%>
    	<input type='checkbox' id='checkID' ></input>
    	<%
    	}
    else{
    	%>
    	<input type='checkbox' id='checkID' checked></input>
    	<%
    	}
    	%>
    </td>  
    <td class="normalFieldCaption"><span>下次登录时，显示我的工作环境</span></td>
  </tr>
</table>
</div></center>
<% 
	String svCoCode = (String)Pub.isNull(SessionUtils.getAttribute(request, "svCoCode"),"");
	String svAccountId = (String)Pub.isNull(SessionUtils.getAttribute(request, "svAccountId"),"");
	String svTransDate = (String)Pub.isNull(SessionUtils.getAttribute(request, "svTransDate"),"");
	String svRpType = (String)Pub.isNull(SessionUtils.getAttribute(request, "svRpType"),"");
	String svPoCode = (String)Pub.isNull(SessionUtils.getAttribute(request, "svPoCode"),"");
	String svUserID = (String)Pub.isNull(SessionUtils.getAttribute(request, "svUserID"),"");
	String svRealUserID = (String)Pub.isNull(SessionUtils.getAttribute(request, "svRealUserID"),"");
	String svRpCoCode = (String)Pub.isNull(SessionUtils.getAttribute(request, "svRpCoCode"),"");
%>
<span id="cancelDisplayID" style="display:none" value='单位代码:<%=svCoCode%>  账套代码:<%=svAccountId%>  业务日期:<%=svTransDate%>  表套代码:<%=svRpType%>  职位代码:<%=svPoCode%>  登录帐号:<%=svUserID%> 登录帐号:<%=svRealUserID%>  报表单位代码:<%=svRpCoCode%>  '></span>

</body>

</html>

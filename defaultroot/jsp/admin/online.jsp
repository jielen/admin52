<%@page contentType="text/html;charset=GBK"%>
<%@page import="com.anyi.gp.pub.DAOFactory"%>
<%@page import="com.anyi.gp.pub.DBHelper"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Date"%>
<%@page import="java.sql.SQLException"%>
<html>
<head>
<title class="selTitle">在线统计</title>

<LINK href="script/applus.css" rel=stylesheet type=text/css>
<link href="gp/css/pagestyle.css" rel=stylesheet type=text/css>

<style type="text/css">
<!--
.STYLE1 {font-family: "宋体"}
.STYLE2 {font-family: "宋体"; font-size: 12px; }
-->
</style>
<script language="JavaScript">
  function showHelp(){
    sHelpUrl= "help/AS/AS_STATINFO.htm";
    var win_help = open(sHelpUrl, "anonymous",
			"menubar=no,status=no,toolbar=yes,"
			+ "resizable=yes,titlebar=yes,scrollbars=yes,"
			+ "height=" + (screen.availHeight - 30)*2/3 + ",width="
			+ (screen.availWidth - 460) + ",top=0,left=450");
	  win_help.focus();
	  return;
}
</script>
</head>
<body       leftMargin="0" rightMargin="0" topMargin="0"
      class="clsPageBody">
<xml id="CompoMeta_AS_STATINFO_XML" asynch="false">
<compometa name="AS_STATINFO" defaultpage="" nofield="" autonumfields="" typefield="" typetable="" wfflowtype="" wflisttype="" wfdeftemp="" iswfusedtemp="false" titlefield="">
 <tables>
 <table name="AS_TEMP" effectfield="">
 <table name="AS_TEMP_D" effectfield="">
 </table>
 </table>
 </tables>
 <calls>
 </calls>
</compometa>
</xml>

<xml id="TableMeta_AS_TEMP_XML" asynch="false" encoding="GBK">
<table  istable="false" name="AS_TEMP">
  <fields >
  <field  foreignname="AS_USER" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="OPT_USERID" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="AS_USER" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="OPT_USERNAME" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="60" maxvalue="60" minvalue="0" name="OPT_COMPANY" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_CO_CODE" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_EMP" scale="0" type="TEXT" valuesetcode="VS_CODE_TYPE"><default >N</default></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="1" maxvalue="1" minvalue="0" name="OPT_DIS_CARD" scale="0" type="TEXT" valuesetcode="VS_Y/N"><default >Y</default></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_EMP_LENGTH" scale="0" type="TEXT" valuesetcode=""><default >0</default></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_MAIL_ADMINEMAIL" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_MAIL_PASSWORD" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_MAIL_USER" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_ORG_LEVEL" scale="0" type="TEXT" valuesetcode=""><default >2-2</default></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="TOTALLOGINNUM" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="200" maxvalue="200" minvalue="0" name="OPT_PUBLISH_URL" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="200" maxvalue="200" minvalue="0" name="OPT_PUBLISH_FORWARDURL" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_ORG" scale="0" type="TEXT" valuesetcode="VS_Y/N"><default >N</default></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_MAIL_SMTPHOST" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_MAIL_NEEDAUTH" scale="0" type="TEXT" valuesetcode="VS_Y/N"><default >N</default></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="1" maxvalue="1" minvalue="0" name="OPT_AS_NAME_DUPL" scale="0" type="TEXT" valuesetcode="VS_Y/N"><default >Y</default></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="200" maxvalue="200" minvalue="0" name="OPT_DB_URL" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="1" maxvalue="1" minvalue="0" name="OPT_HAS_ORG" scale="0" type="TEXT" valuesetcode="VS_Y/N"><default >Y</default></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="OPT_DB_USER" scale="0" type="TEXT" valuesetcode=""><default /></field>
  </fields>
  <foreigns >
   <foreign  fcomponame="AS_EMP" ftablename="AS_EMP" ismultisel="false" istreeview="false" name="AS_USER" tabrefname="null">
    <sql />
<condition />
    <fields >
    <field  fname="USER_ID" isfk="true" name="OPT_USERID"/>
    <field  fname="EMP_NAME" isfk="false" name="OPT_USERNAME"/>
    </fields>
    <effectfields >
    </effectfields>
   </foreign>
  </foreigns>
 </table>
</xml>

<xml id="TableData_AS_TEMP_XML" asynch="false" encoding="GBK">
<AS_TEMP>
<meta pageindex="1" fromrow="0" torow="0" rowcountofpage="0" rowcountofdb="0"></meta>
<rowset>
<row>
<OPT_USERID></OPT_USERID>
<OPT_USERNAME></OPT_USERNAME>
<OPT_COMPANY></OPT_COMPANY>
<OPT_CO_CODE></OPT_CO_CODE>
<OPT_EMP></OPT_EMP>
<OPT_DIS_CARD></OPT_DIS_CARD>
<OPT_EMP_LENGTH></OPT_EMP_LENGTH>
<OPT_MAIL_ADMINEMAIL></OPT_MAIL_ADMINEMAIL>
<OPT_MAIL_PASSWORD></OPT_MAIL_PASSWORD>
<OPT_MAIL_USER></OPT_MAIL_USER>
<OPT_ORG_LEVEL></OPT_ORG_LEVEL>
<TOTALLOGINNUM></TOTALLOGINNUM>
<OPT_PUBLISH_URL></OPT_PUBLISH_URL>
<OPT_PUBLISH_FORWARDURL></OPT_PUBLISH_FORWARDURL>
<OPT_ORG></OPT_ORG>
<OPT_MAIL_SMTPHOST></OPT_MAIL_SMTPHOST>
<OPT_MAIL_NEEDAUTH></OPT_MAIL_NEEDAUTH>
<OPT_AS_NAME_DUPL></OPT_AS_NAME_DUPL>
<OPT_DB_URL></OPT_DB_URL>
<OPT_HAS_ORG></OPT_HAS_ORG>
<OPT_DB_USER></OPT_DB_USER>
</row>

</rowset>
</AS_TEMP>
</xml>
<xml id="TableMeta_AS_TEMP_D_XML" asynch="false" encoding="GBK">
<table  istable="false" name="AS_TEMP_D">
  <fields >
  <field  foreignname="" isallownull="true" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="ACC_CODE" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="ACC_ITEM_NAME" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="ACC_ITEM_OPT" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="1" maxvalue="1" minvalue="0" name="ACC_ITEM_VAL" scale="0" type="TEXT" valuesetcode="VS_Y/N"><default >Y</default></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="ACC_NAME" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="true" isrowid="false" issave="false" length="16" maxvalue="2147483647" minvalue="0" name="ADJ_RATE" scale="4" type="NUM" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="CUR_CODE" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="true" isrowid="false" issave="false" length="16" maxvalue="2147483647" minvalue="0" name="DEPRVAL" scale="4" type="NUM" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="false" length="10" maxvalue="10" minvalue="0" name="E_DATE" scale="0" type="DATE" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="16" maxvalue="2147483647" minvalue="0" name="FATYPE_CODE" scale="4" type="NUM" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="16" maxvalue="2147483647" minvalue="0" name="FATYPE_NAME" scale="4" type="NUM" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="true" length="2" maxvalue="2147483647" minvalue="0" name="FIS_PERD" scale="0" type="NUM" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="GL_BAL_ITEM" scale="0" type="TEXT" valuesetcode="GL_BAL_ITEM"><default ></default></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="1" maxvalue="1" minvalue="0" name="IS_FORCE" scale="0" type="TEXT" valuesetcode="VS_Y/N"><default >Y</default></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="MULTI_MODE" scale="0" type="TEXT" valuesetcode="GL_MULTI_MODE"><default >1</default></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="ORG_CODE" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="30" maxvalue="30" minvalue="0" name="ORG_NAME" scale="0" type="TEXT" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="false" isrowid="false" issave="true" length="30" maxvalue="30" minvalue="0" name="STATUS" scale="0" type="TEXT" valuesetcode="VS_FIS_STAT"><default >Opened</default></field>
  <field  foreignname="" isallownull="true" iskilo="false" ispk="false" isrowid="false" issave="false" length="10" maxvalue="10" minvalue="0" name="S_DATE" scale="0" type="DATE" valuesetcode=""><default /></field>
  <field  foreignname="" isallownull="false" iskilo="false" ispk="true" isrowid="false" issave="false" length="16" maxvalue="2147483647" minvalue="0" name="TRANS_TYPE" scale="4" type="NUM" valuesetcode=""><default /></field>
  </fields>
  <foreigns >
  </foreigns>
 </table>
</xml>

<xml id="TableData_AS_TEMP_D_XML" asynch="false" encoding="GBK">
<AS_TEMP_D>
<meta pageindex="1" fromrow="0" torow="0" rowcountofpage="0" rowcountofdb="0"></meta>
<rowset>
<row>
<ACC_CODE></ACC_CODE>
<ACC_ITEM_NAME></ACC_ITEM_NAME>
<ACC_ITEM_OPT></ACC_ITEM_OPT>
<ACC_ITEM_VAL></ACC_ITEM_VAL>
<ACC_NAME></ACC_NAME>
<ADJ_RATE></ADJ_RATE>
<CUR_CODE></CUR_CODE>
<DEPRVAL></DEPRVAL>
<E_DATE></E_DATE>
<FATYPE_CODE></FATYPE_CODE>
<FATYPE_NAME></FATYPE_NAME>
<FIS_PERD></FIS_PERD>
<GL_BAL_ITEM></GL_BAL_ITEM>
<IS_FORCE></IS_FORCE>
<MULTI_MODE></MULTI_MODE>
<ORG_CODE></ORG_CODE>
<ORG_NAME></ORG_NAME>
<STATUS></STATUS>
<S_DATE></S_DATE>
<TRANS_TYPE></TRANS_TYPE>
</row>

</rowset>
</AS_TEMP_D>
</xml>
<xml id="SessionXML" asynch="false">
<session>
  <svEmpCode>sa</svEmpCode>
  <svUserName>系统管理员</svUserName>
  <svPoCode></svPoCode>
  <ACCOUNT_NAME>市财政局_2账套</ACCOUNT_NAME>
  <svCoName>市财政局</svCoName>
  <svTransDate>2007-06-22</svTransDate>
  <svOrgCode></svOrgCode>
  <svNd>2007</svNd>
  <svFiscalYear>2007</svFiscalYear>
  <svCoCode>000</svCoCode>
  <svUserID>sa</svUserID>
  <svOrgName></svOrgName>
  <svFiscalPeriod>6</svFiscalPeriod>
  <svRealUserID>sa</svRealUserID>
  <svStdCurrency>RMB</svStdCurrency>
  <POSI_NAME>null</POSI_NAME>
  <svAccountId>000_2</svAccountId>
  <svSysDate>2007-06-22</svSysDate>
  <svRealUserName>系统管理员</svRealUserName>
  <svOrgPoCode></svOrgPoCode>

</session>
</xml>
<xml id="CompoAdditionalMeta_AS_STATINFO_XML" asynch="false">
<compo name="AS_STATINFO" ismain="true" pagetype="edit">
<table name="AS_TEMP" physicaltable="AS_TEMP" isdigest="true" digest="" keyfields="" numericfields="" datefields="" datetimefields="" onceautonumfields="" onceautonums="" notsavefields="OPT_USERID,OPT_USERNAME,TOTALLOGINNUM" >
<table name="AS_TEMP_D" physicaltable="AS_TEMP_D" isdigest="true" digest="" keyfields="ACC_CODE,ACC_ITEM_NAME,ACC_ITEM_OPT,ACC_ITEM_VAL,ACC_NAME,ADJ_RATE,CUR_CODE,DEPRVAL,FATYPE_CODE,FATYPE_NAME,FIS_PERD,GL_BAL_ITEM,IS_FORCE,MULTI_MODE,ORG_CODE,ORG_NAME,TRANS_TYPE" numericfields="ADJ_RATE,DEPRVAL,FATYPE_CODE,FATYPE_NAME,FIS_PERD,TRANS_TYPE" datefields="E_DATE,S_DATE" datetimefields="" onceautonumfields="" onceautonums="" notsavefields="ACC_CODE,ACC_ITEM_NAME,ACC_ITEM_OPT,ACC_ITEM_VAL,ACC_NAME,ADJ_RATE,CUR_CODE,DEPRVAL,E_DATE,FATYPE_CODE,FATYPE_NAME,GL_BAL_ITEM,IS_FORCE,ORG_CODE,ORG_NAME,S_DATE,TRANS_TYPE" >
</table>
</table>
</compo>
</xml>


  <span id="meta" componame="AS_STATINFO" pageName="AS_STATINFO_E" unique="" printtype="0">
    <span id="calls">
    </span>
  <span id="status" value="new"></span>
  </span>

  <span id="sessionParam">
    <span name="svEmpCode" value="sa"></span>
    <span name="svUserName" value="系统管理员"></span>
    <span name="svPoCode" value="" filter="true"></span>
    <span name="ACCOUNT_NAME" value="市财政局_2账套"></span>
    <span name="svCoName" value="市财政局"></span>
    <span name="svTransDate" value="2007-06-22"></span>
    <span name="svOrgCode" value="" filter="true"></span>
    <span name="svNd" value="2007" filter="true"></span>
    <span name="svFiscalYear" value="2007" filter="true"></span>
    <span name="svCoCode" value="000" filter="true"></span>
    <span name="svUserID" value="sa" filter="true"></span>
    <span name="svOrgName" value=""></span>
    <span name="svFiscalPeriod" value="6"></span>
    <span name="svRealUserID" value="sa" alias="PPP" filter="true"></span>
    <span name="svStdCurrency" value="RMB"></span>
    <span name="POSI_NAME" value=""></span>
    <span name="svAccountId" value="000_2" filter="true"></span>
    <span name="svSysDate" value="2007-06-22"></span>
    <span name="svRealUserName" value="系统管理员"></span>
    <span name="svOrgPoCode" value=""></span>
  </span>




<xml id="FieldReadOnlyXML">

<fields>
</fields>


</xml>



  <table border="0" width=100% borderColor="red" cellpadding="0" cellspacing="0" height=100%>
    <tr style="display:none;">
    <td>

    <!-- 页面头部开始 -->
    <table border="0" width=100% cellpadding="0" cellspacing="0" id="pagehead" >
    <tr>
      <td rowspan="2"><img src="/style/img/main/headt1.jpg"></td>
      <td rowspan="2" background="/style/img/main/headbk2.jpg" width=100%></td>
      <td  background="/style/img/main/headtbk3.jpg"></td>
      <td colspan="3"><img src="/style/img/main/headt4.jpg"></td>
    </tr>
    <tr>
      <td><img src="/style/img/main/headb3.jpg"></td>
      <td><img src="/style/img/main/headm41.jpg"></td>
      <td><A href="help.htm" target="_blank"><img src="/style/img/main/help.jpg" style="cursor:hand" border=0></A></td>
      <td><img src="/style/img/main/headm43.jpg"></td>
    </tr>
    </table>

  </td>
  </tr>
  <tr style="display:none;">
  <td colspan=6>
  <table border="0" width=100% cellpadding="0" cellspacing="0" >
    <tr>
      <td  align="middle" background="/style/img/main/editcontentmidbk.jpg" width=100%><img id="headimgarrowimg" src="/style/img/main/arrow_up.gif" onClick="hideHead();" style="cursor:hand"></td>
        <td id ="pageHeadRight" style="display:none"><img src="/style/img/main/editcontentright.jpg"></td>
    </tr>
  </table>
  </td>
  </tr>
  <!-- 页面头部结束 -->

  <tr>
     <td colspan=6 width=100%>
<div id='toolbar' componame="" isfromdb=true tabindex=0 popupmenuid="PopupMenuId_11824778671891"  class='clsToolbarContainer4' hidefocus='true'  style='display:; ' >
  <span class="clsEditBoxOuterPanel4 " style=";border-width:0px;display:;z-index:10;;overflow:hidden;padding:0px;margin:0px;">
  <input name="text" type='text' class='clsEditBoxInputBox4 ' id='TextInput' style=';text-align:left;left:0px;top:0px;width:0px;height:0px;border-width: 0px;;position:absolute;border-width:0px;' tabindex='1'  value='' maxlength='30'>
  </span>
  <table border="0" cellspacing="0" cellpadding="0" class="clsToolbarTable4" >
<tr>
<td width="11px"><img border="0" src="/style/img/gp5/toolbar/toolbar_left.jpg"></img></td>
<td id="CallsAreaTD" background="/style/img/gp5/toolbar/toolbar_middle.jpg" valign="center" style="overflow:hidden;width:100%;" >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr id="CallsTR">
<td>
<div callId="fhelp" type="command" title="" accessKey="" style="font-size:9pt;width:100%;padding:1px;" onkeydown='this.fireEvent("onmousedown");' onkeyup='this.fireEvent("onmouseup");' >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr height="18px" valign="bottom">
<td id="LeftSpaceTD" style="font-size:2px;">&nbsp;</td>
<td id="ImageTD" width="16px"><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/help_g.jpg"></img></td>
<td style="font-size:3px;">&nbsp;</td>
<td id="CaptionTD" nowrap  language=javascript onclick="return showHelp()">帮助</td>
<td id="RightSpaceTD" style="font-size:2px;">&nbsp;</td>
</tr>
</table>
</div></td>
<td id="BlankTDOfToolbar5" width="100%"></td>
</tr>
</table></td>
<td width="14px"><img id="MoreCallsImg" border="0" src="/style/img/gp5/toolbar/toolbar_right.jpg"></img></td>
</tr>
</table>
</div>

<div id='PopupMenuId_11824778671891' componame="AS_STATINFO" isfromdb=true tabindex=0  class='clsPopupMenuContainer5' hidefocus='true'  style='display:none; ' >
<input type='button' id='FocusButton' tabindex='0' style='position:absolute;left:-1000px;top:-1000px;'>
<table id="CallsTable" border="0" cellspacing="0" cellpadding="0" style="border:solid 1px #DCDCDD;font-size:9pt;width:80px;">
<tr style="font-size:1px;">
<td style="font-size:1px;">
<div callId="fhelp" type="command" title="" accessKey="" style="font-size:9pt;width:100%;padding:1px;" onkeydown='this.fireEvent("onmousedown");' onkeyup='this.fireEvent("onmouseup");' >
<table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
<tr height="18px" valign="bottom">
<td id="LeftSpaceTD" style="font-size:2px;">&nbsp;</td>
<td id="ImageTD" width="16px"><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/help_g.jpg"></img></td>
<td style="font-size:3px;">&nbsp;</td>
<td id="CaptionTD" nowrap>帮助</td>
<td id="RightSpaceTD" style="font-size:2px;">&nbsp;</td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</div>


     </td>
  </tr>

  <tr>
     <td colspan=6 width=100% align="center">
       <br>
       <p class="clsEditPageTitle">在线统计</p>
     </td>
  </tr>

  <tr>
  <td colspan=6 height=100%>

    <table border=0 cellpadding="0" cellspacing="0" width=100% height=100%>
    <tr>
    <td background="" align=center valign=top height=100%>

  <table border=0 width=96% cellpadding="0" cellspacing="0">
   <tr>
   <td background="">

   <table border=0 width=100% cellpadding="0" cellspacing="0">
     <tr>
       <td align=center height=300 valign=top>
			   <table id="U_PageAreasTable" border="0" cellpadding="1"  width=90% class="pagebody"  cellspacing="0">
    <tr>
      <td valign="top" id="A1TD" onresize="resizeArea('A1');">

<div id="A1" width="100%">
<div id="AS_TEMP_Normal_11824778672350"  tablename="AS_TEMP" width="700" height="70" colcount="1" isvisible="true" iswritable="true" style="" class="">
<span id="EditBoxIdSpan" style="display:none;">
  <span fieldname="TOTALLOGINNUM" caption="当前登录用户数" editboxid="AS_TEMP_TOTALLOGINNUM_BOX"></span>
</span>

<table width="100%" border="1"  cellpadding="0" cellspacing="1" borderColor="#DCDCDD" id="BodyTable" style="table-layout:fixed;border-width:0;display:none">
    <colgroup>
    <col id="0_CaptionCol" style=""/>
    <col id="0_TextCol" style=""/>
  </colgroup>
<% 
Connection conn = null;
PreparedStatement pst = null;
ResultSet rs = null;
try{
	String sql = " select t.USER_ID, u.USER_NAME, t.IP, t.CREATE_TIME from AS_USER_TICKET t, AS_USER u "
 			   + " where t.USER_ID = u.USER_ID order by USER_ID, CREATE_TIME ";
	conn = DAOFactory.getInstance().getConnection();
	pst = conn.prepareStatement(sql);
	rs = pst.executeQuery();
%>
      <tr>
      <td width="107" class="normalFieldCaption STYLE1 td td" id="TOTALLOGINNUM_Caption" nowap colindex="0">当前登录用户数</td>
      <td width="381" id="TOTALLOGINNUM_Text"  editBoxWidth="1" editBoxHeight="1"><span class="STYLE2"><%=rs.getFetchSize()%>人
      </span></td>
    </tr> 
</table>
<table border="0"  cellpadding="0" cellspacing="1" bgColor="#DCDCDD" id="BodyTable" style="table-layout:fixed;border-width:0">
    <colgroup>
    <col id="0_CaptionCol" style=""/>
    <col id="0_TextCol" style=""/>
  </colgroup>
      <tr  height="20">
      <td class="normalFieldCaption STYLE1 td td" id="TOTALLOGINNUM_Caption" nowap colindex="0" bgColor="#F1F2F6" align="CENTER" style="cursor:hand;font-family:宋体;color:#232e66;" >账号代码</td>
      <td id="TOTALLOGINNUM_Text"  editBoxWidth="1" editBoxHeight="1" bgColor="#F1F2F6" align="CENTER" style="cursor:hand;"><span class="STYLE2" style="font-family:宋体;color:#232e66;">姓名</span></td>
      <td id="TOTALLOGINNUM_Text"  editBoxWidth="1" editBoxHeight="1" bgColor="#F1F2F6" align="CENTER" style="cursor:hand;"><span class="STYLE2" style="font-family:宋体;color:#232e66;">登录IP地址</span></td>
      <td id="TOTALLOGINNUM_Text"  editBoxWidth="1" editBoxHeight="1" bgColor="#F1F2F6" align="CENTER" style="cursor:hand;"><span class="STYLE2" style="font-family:宋体;color:#232e66;">登录时间</span></td>
      </tr>
<%
	String userId = null;
	while(rs.next()){
		String temp = rs.getString("USER_ID");
		if(!temp.equals(userId)){
			userId = temp;
%>
      <tr style="height:18px;" >
      <td class="normalFieldCaption STYLE1 td td" id="TOTALLOGINNUM_Caption" nowap colindex="0" bgColor="#ffffff" style="cursor:hand;"><%=rs.getString("USER_ID")%></td>
      <td id="TOTALLOGINNUM_Text"  editBoxWidth="1" editBoxHeight="1" bgColor="#ffffff" style="cursor:hand;"><span class="STYLE2"><%=rs.getString("USER_NAME")%></span></td>
      <td id="TOTALLOGINNUM_Text"  editBoxWidth="1" editBoxHeight="1" bgColor="#ffffff" style="cursor:hand;"><span class="STYLE2"><%=rs.getString("IP")==null?"":rs.getString("IP")%></span></td>
      <td id="TOTALLOGINNUM_Text"  editBoxWidth="1" editBoxHeight="1" bgColor="#ffffff" style="cursor:hand;"><span class="STYLE2"><%=new Date(Long.parseLong(rs.getString("CREATE_TIME")))%></span></td>
      </tr>
<%
		}
	}
}catch(SQLException e){
}finally{
	DBHelper.closeConnection(conn, pst, rs);
}
%>
</table>
<Table id="InVisibleFieldTable" style="display:none" >
  <tr>
  </tr>
</Table>
</div>

</div>      </td>
      <td valign="top" id="A2TD" onresize="resizeArea('A2');">

<div id="A2" width="100%">
</div>      </td>
    </tr>
    <tr>
      <td valign="top" id="A3TD" onresize="resizeArea('A3');" colspan="2">

<div id="A3" width="100%">
</div>      </td>
    </tr>
    <tr>
      <td valign="top" id="A4TD" onresize="resizeArea('A4');" colspan="2">

<div id="A4" width="100%">
</div>      </td>
    </tr>
    <tr>
      <td valign="top" id="A5TD" onresize="resizeArea('A5');" colspan="2">

<div id="A5" width="100%">
</div>      </td>
    </tr>
    <tr>
      <td valign="top" id="A6TD" onresize="resizeArea('A6');" colspan="2">

<div id="A6" width="100%">
</div>      </td>
    </tr>
  </table>

       </td>
     </tr>
    </table>
   </td>
   </tr>
</table>
<br>
<div id="ie5menu" class="clsPopMenu" onClick="clickMenu()"><table cellspacing="0px" cellpadding="0px" border="0px" id="popTable" style="font-size: 12px;"><tr><td colspan=2 align="right" style="background-color:#333399;color:white">列风格设置<img src="/style/img/button/menu_close.gif" onClick="hidemenuie5();"></td></tr><tr><td colspan=2><div style= "border-style:groove; border-width:2px"><input type="radio" value="V1" checked name="__U_PopMenu_Option_LockOrHidden" id="__U_PopMenu_LockOption" onClick="selectFuncOption();">锁定列<br><input type="radio" value="V2" name="__U_PopMenu_Option_LockOrHidden" id="__U_PopMenu_HideOption" onClick="selectFuncOption();">隐藏列</div></td></tr></table></div>    </td>
  </tr>
 </table>
<DIV class="clsSlide" id="slide"></DIV>
<IFRAME id="exportFrame" style="display:none" src="blank.html"></IFRAME>
<IFRAME id="printframe" src="blank.html" width="1" height="1" style="display:none">;</IFRAME>

 </td>
</tr>
</table>

</body>
</html>

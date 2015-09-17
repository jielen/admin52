<%@page language="java" contentType="text/html; charset=GBK" %>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.anyi.gp.pub.LangResource"%>
<%@ page import="com.anyi.gp.pub.GeneralFunc"%>
<%
/**********************************************************
 *描述：预留字段的设置
 * 修改原因：根据预留字段名称修改对应值集名称
 * 修改时间：2003-3-26
 * 修改原因：去掉多语种，修改BUG
 * 修改时间：2003-2-27
 * 修改原因：获得部件对应表
 * 修改时间：2003-3-18
 * 作者：Macken Lee
 **********************************************************/
String tabId = request.getParameter("TABID");
LangResource lr = LangResource.getInstance();
Map resMap = null;

String sysCompoId=request.getParameter("SYSCOMPOID");
String sysDataItemType = request.getParameter("SYSDATAITEMTYPE");
String sysVSEnable = request.getParameter("VSENABLE");

boolean vsFlag=false;//是否修改值集的名字
String  vsNameEnable = request.getParameter("VSNAMEENABLE");
if(vsNameEnable==null) vsNameEnable="";
if(vsNameEnable!=null && vsNameEnable.equalsIgnoreCase("true")) vsFlag=true;

String dataItemType =request.getParameter("DATAITEMTYPE");
%>
<html>
<head>
<title></title>
<link href="gp/css/pagestyle.css" rel=stylesheet type=text/css>
<script language="JavaScript" src="script/admin/AS_PRECOL.js"></script>
<SCRIPT language="javascript" src="script/page.js"></SCRIPT>
<SCRIPT language="javascript" src="script/foreign.js"></SCRIPT>
<SCRIPT language="javascript" src="script/Base64.js"></SCRIPT>
<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
<%
if(sysCompoId!=null && sysCompoId.length()>0){
  String jsFile=sysCompoId+".js";
  String jsPath=sysCompoId.substring(0,sysCompoId.indexOf("_"));
%>
<script language="JavaScript" src="script/<%=jsPath%>/<%=jsFile%>"></script>
<%
}
%>
<LINK href="script/applus.css" rel=stylesheet type=text/css>
</head>

<body topmargin=0 bottommargin=0 leftmargin=0 rightmargin=0
  class="clsPageBody">
<FORM  name="PRECOL" method="post">
<input type="hidden" name="VAL">
<input type="hidden" name="VSENABLE" value="<%=sysVSEnable%>">
<input type="hidden" name="VSNAMEENABLE" value="<%=vsNameEnable%>">





<table border="0" width=100% cellpadding="0" cellspacing="0" background="" >
  <tr>
    <td rowspan=2 valign=top id="contentleft" style="display:">
    <img src="/style/img/main/contentleft.gif">
    </td>
    
    <td width="100%">
    
     <table width=100% cellpadding="0" cellspacing="0" border= "0">
      <tr>
      <td  background="/style/img/main/editcontentmidbk.jpg" height=19>&nbsp;</td>
      <td width="179"><img src="/style/img/main/editcontentright.jpg"></td>
     </tr>
     </table>
     
    </td>
  </tr>
  
  
  <tr>
    <td colspan=1  align="right">
     
      <table cellpadding="0" cellspacing="0" border=0 >
        <tr>
      
          <td width=100% align="left">
            <font size=2 color="black"><b>&nbsp;预留字段设置</b></font>
          </td>
             
          <td></td>
             
             
          <td><img id="fadd_leftImg" src="/style/img/func/left_behind.gif"></td>
             
          <td id="fadd_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
<input type="button" name="submit_button" value=" <%=lr.getLang("fsave")%> " class="clsListCall" onMouseOver="call_mouseOver()" onMouseOut="call_mouseOut()"      onClick="dsave()">
          </td>
          
          <td><img id="fadd_rightImg" src="/style/img/func/right_behind.gif"></td>
          
          
          <td><img id="fhelp_leftImg" src="/style/img/func/left_behind.gif"></td>
          
          <td id="fhelp_midBk" background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
<input type="button" name="reset_button" value=" <%=lr.getLang("reset")%> "  class="clsListCall" onMouseOver="call_mouseOver()" onMouseOut="call_mouseOut()"      onClick="dreset()">
          </td>
          
          <td><img id="fhelp_rightImg" src="/style/img/func/right_behind.gif"></td>

          <td width=2>&nbsp;</td>
          
          </tr>
        </table>
        
     <td>
     
  </tr>
  </table>


<table height="10px">
<tr>
<td>
</td>
</tr>
</table>


<table width="88%" border="0" cellpadding="0" cellspacing="0" align="center">
<tr>
<td width="50%">
</td>
<td width="25%">
<%
if(sysCompoId!=null && sysCompoId.length()>0){
  tabId=GeneralFunc.getCompoTabId(sysCompoId);
%>
  <input type="hidden" name="TABID" value="<%=tabId%>">
<%
}
else{
%>
  <select name="TABID" style='border:1 solid #8B8B89;' onChange="PRECOL_change()">
  <option><%=lr.getLang("SEL_TAB")%></option>
<%
  List listTabCol = GeneralFunc.getPreTabId();
  if(listTabCol!=null && listTabCol.size()>0){
    for(int i=0;i<listTabCol.size();i++){
      resMap = (Map)listTabCol.get(i);
      String tableId = (String)resMap.get("TAB_ID");
      String tableName = lr.getLang(tableId);
      if(tableId!=null && !tableId.equals("PR_PAYLIST")){
%>
      <option value="<%=tableId%>"
      <%
        if(tableId.equals(tabId)){
      %>
      selected
      <%
        }
      %>
      >
      <%=tableName%></option>
<%
      }
    }
  }
%>
</select>
<%
}
%>

</td>
<td width="25%">
 &nbsp;&nbsp;
<%
if(sysDataItemType!=null && sysDataItemType.length()>0){
%>
<input type="hidden"  name="DATAITEMTYPE" value="<%=sysDataItemType%>">
<%
}
else{
%>
<select name="DATAITEMTYPE" style='border:1 solid #8B8B89;' onChange="PRECOL_change()">
<option><%=lr.getLang("SELECTDATAITEMTYPE")%>
</option>
<option value="Text"
<%
if(dataItemType!=null && dataItemType.equals("Text")){
  out.print("selected");
}
%>
><%=lr.getLang("STRINGTYPE")%></option>
<option value="Num"
<%
if(dataItemType!=null && dataItemType.equals("Num")){
  out.print("selected");
}
%>
><%=lr.getLang("NUMBERTYPE")%></option>
<option value="Date"
<%
if(dataItemType!=null && dataItemType.equals("Date")){
  out.print("selected");
}
%>
><%=lr.getLang("DATETYPE")%></option>

</select>
<%
}
%>
</td>

</tr>
</table>

</FORM>
</body>
</html>


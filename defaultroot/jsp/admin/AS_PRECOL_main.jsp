<%@page language="java" contentType="text/html; charset=GBK" %>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.anyi.gp.pub.LangResource"%>
<%@ page import="com.anyi.gp.pub.GeneralFunc"%>
<%
/**********************************************************
 *������Ԥ���ֶε�����
 * �޸�ԭ������before_Save()�����ӿ�
 * �޸�ʱ�䣺2003-4-1
 * �޸�ԭ�򣺽�ֹͬһ������ֶ�����ͬ
 * �޸�ʱ�䣺2003-3-31
 * �޸�ԭ�򣺸���Ԥ���ֶ������޸Ķ�Ӧֵ������
 * �޸�ʱ�䣺2003-3-26
 * �޸�ԭ��ȥ�������֣��޸�BUG
 * �޸�ʱ�䣺2003-2-27
 * �޸�ԭ�򣺻�ò�����Ӧ��
 * �޸�ʱ�䣺2003-3-18
 * ���ߣ�Macken Lee
 **********************************************************/
String sysCompoId=request.getParameter("SYSCOMPOID");
String sysDataItemType = request.getParameter("SYSDATAITEMTYPE");
String sysVSEnable = request.getParameter("VSENABLE");
boolean vsFlag=false;
String  vsNameEnable = request.getParameter("VSNAMEENABLE");
if(vsNameEnable==null) vsNameEnable="";
if(vsNameEnable!=null && vsNameEnable.equalsIgnoreCase("true")) vsFlag=true;

String tabId = request.getParameter("TABID");

String dataItemType =request.getParameter("DATAITEMTYPE");
if(dataItemType==null) dataItemType="";

if(sysCompoId!=null && sysCompoId.length()>0){
  tabId=GeneralFunc.getCompoTabId(sysCompoId);
}
if(sysDataItemType!=null && sysDataItemType.length()>0){
  dataItemType=sysDataItemType;
}

String langItem = "C";
LangResource lr = LangResource.getInstance();
String dataItem = "";
String dataItemNa = "";
String dataType="";
String isUsed = "";
String valSetId = "";
String vsId="";
String valSetName = "";
//�ɲ�����ö�Ӧ��
List listTabCol = GeneralFunc.getPreColByTabId(tabId);//���Ԥ���ֶ�
%>
<html>
<head>
<title></title>
<LINK href="script/applus.css" rel=stylesheet type=text/css>
<link href="gp/css/pagestyle.css" rel=stylesheet type=text/css>
<script language="JavaScript" src="script/admin/AS_PRECOL.js"></script>
<%
if(sysCompoId!=null && sysCompoId.length()>0){
  String jsFile=sysCompoId+".js";
  String jsPath=sysCompoId.substring(0,sysCompoId.indexOf("_"));
%>
<script language="JavaScript" src="script/<%=jsPath%>/<%=jsFile%>"></script>
<%
}
%>
</head>
<body topmargin=0 leftmargin=0 rightmargin=0
	onLoad="initPage();" onresize="windowResize()"
  class="clsPageBody">
<FORM  name="PRECOL" method="post">
<input type="hidden" name="DATA">
<input type="hidden" name="VSNAMEENABLE" value="<%=vsNameEnable%>">
<input type="hidden" name="VSENABLE" value="<%=sysVSEnable%>">
<input type="hidden" name="TABID" value="<%=tabId%>">
<input type="hidden" name="DATAITEMTYPE" value="<%=dataItemType%>">
<table  width="100%" border="0" id="dataTableID" onmousemove="mousemove()">
  <tr>
  <td>
  <div id="grid" class="clsGridContainer">
<table id="head" width="88%" cellspacing="0px" cellpadding="0px" border="0px"  align="center">
<tbody>
<tr class="tsz">
<td width="20">&nbsp;</td>
<td>�ֶδ���</td>
<td>
<%
if(sysVSEnable!=null && sysVSEnable.equals("false")){
%>
&nbsp;&nbsp;
<%
}
else{
%>
<%=lr.getLang("VALSET_TYPE")%>
<%
}
%>
</td>
<td>�ֶ���</td>
</tr>
</tbody>
</table>

<div id="gridBody" class="clsGridBody" onscroll="body_Scroll()">
<table id="gridBodyTable" width="88%"  cellpadding="4px" cellspacing="2px" border="0px" align="center">
<tbody>
<%
Map resMap = null;
if (tabId!=null && !tabId.equals("")){
if(listTabCol!=null && listTabCol.size()>0){
      for(int i=0;i<listTabCol.size();i++){
            resMap = (Map)listTabCol.get(i);
            if(resMap!=null){
                  dataItem = (String)resMap.get("DATA_ITEM");
                  dataItemNa = lr.getLang(dataItem);
                  if (dataItemNa.equals(dataItem)) dataItemNa="";
                  isUsed = (String)resMap.get("IS_USED");
                  vsId = (String)resMap.get("VAL_SET_ID");
                  if(vsId==null) vsId="";
                  dataType=(String)resMap.get("DATA_TYPE");
                  //�ж��ֶ�������ʾ
                  boolean flag=false;
                  if(dataItemType!=null && dataItemType.length()>0){
                    if(dataItemType.equals(dataType)) flag=true;
                  }
                  else{
                    flag = true;
                  }
                  if(flag){
%>

<tr>
<!-- ��ѡ�� -->
<td  class="td"  align="right" width="20">
                             <input type="checkbox" name="<%=dataItem%>"
                             <%
                             if(isUsed.equals("y") || isUsed.equals("Y")){
                             %>
                             checked
                             <%
                             }
                             %>
                             onClick="checkbox_click()" >
</td>

<td class="td">&nbsp;<%=dataItem%></td>
<!-- ֵ�� -->
<td class="td">
<%
if(sysVSEnable!=null && sysVSEnable.equals("false")){
%>
<input type="hidden" name="VALSETID" value="<%=vsId%>">
<%
}
else{
%>
<select name="VALSETID"
                             <%
                               if(!isUsed.equals("y") && !isUsed.equals("Y")){
                             %>
                               disabled= true
                             <%
                               }
                             %>
                             >
<option value=""></option>
<%
  List vs = GeneralFunc.getValSet();
                             for(int j=0;j<vs.size();j++){
                               resMap = (Map) vs.get(j);
                               valSetId = (String)resMap.get("VALSET_ID");
                               valSetName = (String)resMap.get("VALSET_NAME");
                               if(valSetName==null)valSetName="";
%>
<option value="<%=valSetId%>"
<%
  if(vsId!=null && vsId.equals(valSetId)){
%>
selected
<%
  }
%>
><%=valSetName%></option>
<%
  }
%>
</select>
<%
}
%>
</td>
<!-- �ֶ��� -->
<td class="td">
<input type="text" size=14 class="specialTextEdit" name="DATAITEMNA" value="<%=dataItemNa%>"
                                                           <%
                             if(!isUsed.equals("y") && !isUsed.equals("Y")){
                             %>
                             disabled= true
                             <%
                             }
                             %>
>
</td>
</tr>
<input type="hidden" name="OLDCHECKBOX" value="<%=isUsed%>">
<input type="hidden" name="OLDSELECT" value="<%=vsId%>">
<input type="hidden" name="OLDTEXT" value="<%=dataItemNa%>">
<%
                  }
            }
      }
}
}
%>
</tbody>
</table>

    </div>

  </div>


  </td>
  </tr>
</table>

</FORM>
<DIV class="clsSlide" id="slide"></DIV>
</body>
</html>

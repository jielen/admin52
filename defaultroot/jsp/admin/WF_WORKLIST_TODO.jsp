<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/applus" prefix="applus"%>

<%@page import="java.util.HashMap" %>
<%@page import="java.net.URLEncoder" %>
<%@page import="java.util.*" %>
<%@page import="com.anyi.gp.util.StringTools" %>
<%@page import="com.anyi.gp.workflow.WFWorkList" %>
<%@page import="com.anyi.gp.workflow.util.WFUtil" %>
<%@page import="com.anyi.gp.workflow.util.WFConst" %>
<%@page import="com.anyi.gp.pub.SessionUtils" %>
<%@page import="com.anyi.gp.pub.DataTools" %>
<%@page import="com.anyi.gp.context.ApplusContext" %>
<%@page import="com.anyi.gp.pub.ServiceFacade" %>

<LINK href="script/applus.css" rel=stylesheet type=text/css>

<%
	String token = (String) SessionUtils.getToken(request);
  if(token == null){
  	token = "";
  }
%>
<html>
<head>
  <title> 待办事宜 </title>
</head>
<style>
  A:link {color:#000000; TEXT-DECORATION: none;}
  A:visited {color:#9f9f9f; TEXT-DECORATION: none;}
  A:hover {COLOR: #0e4582; TEXT-DECORATION: none;}
</style>
<applus:include language="javascript">
gp.workflow.WFConst;
gp.workflow.WF_WORKLIST;
gp.workflow.GK_WF;
</applus:include>
<applus:init />

<script language="javascript">
  var TOKEN = '<%=token%>';
</script>
<body>
<div id="tipsbox" 
style="position:absolute;width:160;height:20;border:1 gray solid;font-size:9pt;background-color:#ffffff;color:#606060;display:none;filter: progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=3);"></div>

<%
  int compoNum= 0;
  int MAX_ROW_NUM=10;
  ServiceFacade serviceFacade = (ServiceFacade)ApplusContext.getBean("serviceFacade");
  
  String compoId= new String();

  List compositedData = null;
  List oneRowData = null;
  String[] instIdArray;
  String[] instNameArray;
  String[] instBriefArray;
  String curCompoId,tempInstId,tempTitle,tempBrief,tempCondition;
  String userId = (String)SessionUtils.getAttribute(request,"svUserID");
  List compoList = WFWorkList.getTodoCompoListByUser(userId);
  if(null==compoList || (null!=compoList &&compoList.size()==0)){%>
    <table><tr class="clsFreeRow">
      <td align="center" class="clsNormalCaption"><center>您目前没有待办工作</center></td>
    </tr></table>
 <%}else{%>
   <page><div style='height:100%;overflow:auto'>
    <table width=100%><tr class="clsFreeRow" align="center" >
    <td align="center" class="clsNormalCaption" style="font-size:13pt;"><b>待办事宜<b></td>
   </tr></table>

  <!--table cellspacing='0px' cellpadding='0px' border='1px' 
    borderColor='#DADBDD' class='clsListPageGrid'-->
<%
  for(int i=0;i<compoList.size();i++){
    curCompoId = (String)compoList.get(i);
    compositedData = serviceFacade.getWfdataListByUserComp(userId, curCompoId,"WF_FILTER_COMPO_TODO",MAX_ROW_NUM + 1);
    compoNum = compositedData.size();
    if(compoNum==0){
      continue;
    }
    int realNum = (compoNum>MAX_ROW_NUM)?MAX_ROW_NUM:compoNum;
    instIdArray = new String[realNum];
    instNameArray = new String[realNum];
    instBriefArray = new String[realNum];
    for(int k=0;k<realNum;k++){
      instIdArray[k] = (String)((List)compositedData.get(k)).get(0);
      instNameArray[k] = (String)((List)compositedData.get(k)).get(1);
      instBriefArray[k] = (String)((List)compositedData.get(k)).get(2);
    }
    %>
    <script language="javascript">
      var <%=curCompoId%>_instIds= new Array();
      var <%=curCompoId%>_instNames = new Array();
      <%for(int m=0;m<realNum;m++){%>
        <%=curCompoId%>_instIds[<%=m%>] = "<%=instIdArray[m]%>";
        <%=curCompoId%>_instNames[<%=m%>] = "<%=instNameArray[m]%>";
      <%}%>
    </script>
    <%String subsysId = curCompoId.substring(0, curCompoId.indexOf("_"));
    String compoJsPath= "/"+subsysId+"/script/"+subsysId+"/"+curCompoId+".js";%>
	  <script language="javascript" src="<%=compoJsPath%>"></script>
      <table cellspacing='0px' cellpadding='0px' border="1"
        style="table-layout:fixed;" 
        bordercolorlight="#DADBDD" bordercolordark="white">
      <tr bgcolor="#F1F2F6">
        <td width=0 class="clsGridHeadKeyCell4" width=2% align="left" >
          <img src="/style/img/main/minus.gif" id="treenode"
          onclick="switchImg('<%=curCompoId%>','<%=(MAX_ROW_NUM<compoNum)?MAX_ROW_NUM:compoNum%>')"></img>
        </td>
        <td align="left" width=28% class="clsNormalCaption">
         <b><a href="javascript:fgetTodoList('<%=curCompoId%>')"
           tips="查看所有待办单据 （<applus:resource code='<%=curCompoId%>' />）"
           onmousemove="showTips(this.tips, 1,this)"
           onmouseout="showTips(this.tips, 0,this)" style="font-size:9pt;">
         <applus:resource code='<%=curCompoId%>' /></a></b></td>
        <td align="left" width=30% class="clsNormalCaption" 
          style="font-size:9pt;">
         共 <%=compoNum%> 条</td>
        <td align="left" width=15%>
          <div style="border:solid 0px red;overflow:hidden;width:100%;height:100%;" 
            onmouseover="this.style.borderWidth=1;" onmouseout="this.style.borderWidth=0;"
            onclick="fbatchCommit('<%=userId%>','<%=curCompoId%>',<%=curCompoId%>_instIds,<%=curCompoId%>_instNames);">
          <table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
          <tr>
            <td><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/auto_commit_g.jpg"></img></td>
            <td>通过以下<%=realNum%>条</td>
            </tr></table></div></td>
        <td align="left" width=15%>
          <div style="border:solid 0px red;overflow:hidden;width:100%;height:100%;" 
            onmouseover="this.style.borderWidth=1;" onmouseout="this.style.borderWidth=0;"
            onclick="fbatchUntread('<%=userId%>','<%=curCompoId%>',<%=curCompoId%>_instIds,<%=curCompoId%>_instNames);">
          <table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
          <tr>
            <td><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/untread_g.jpg"></img></td>
            <td>退回以下<%=(compoNum>MAX_ROW_NUM)?MAX_ROW_NUM:compoNum%>条</td>
            </tr></table></div></td>
        <td width=10%>&nbsp;</td>
      </tr>
  <%for(int compoIndex=0;compoIndex<compositedData.size();){
      oneRowData = (List)compositedData.get(compoIndex);
      tempInstId = (String)oneRowData.get(0);
      tempTitle = (String)oneRowData.get(1);
      tempBrief = (String)oneRowData.get(2);
      tempBrief=((tempBrief==null||tempBrief.trim().equals("null"))?"":tempBrief);
      tempCondition = URLEncoder.encode((String)oneRowData.get(3));
      //begin of one line%>
      <tr id="TR_<%=curCompoId%>-<%=StringTools.formatNum2Str(compoIndex,4)%>"
          style="display:<%=((compoIndex<MAX_ROW_NUM)?"":"none")%>"
          bgcolor="transparent">
        <td width=2%>&nbsp;</td>
        <td align="left" width=28%  class="clsNormalCaption">
         <a name="fgetEditPage" value="<%=tempTitle%>"
          id="fcommitID" shortCutKey="" class="clsGridActionButton4"
          href=javascript:fgetEditPage('<%=tempInstId%>',"<%=tempCondition%>",'<%=curCompoId%>','WF_FILTER_COMPO_TODO')
          tips="查看 <%=tempTitle%> （<applus:resource code='<%=curCompoId%>' />）"
          onmousemove="showTips(this.tips, 1, this)"
          onmouseout="showTips(this.tips, 0, this)" >
          <%=tempTitle%></a></td>
        <td align="left" width=30%><%=tempBrief==null?"":tempBrief%></td>
        <td align="left" width=15%>
          <div style="border:solid 0px red;overflow:hidden;width:100%;height:100%;"
            onmousemove="showTips(this.tips, 1,this)" onmouseout="showTips(this.tips, 0,this)"
            onclick="fcommitOne('<%=userId%>','<%=tempInstId%>','<%=curCompoId%>','<%=tempTitle%>');"
            tips="通过 <%=tempTitle%> （<applus:resource code='<%=curCompoId%>' />）">
          <table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
          <tr>
            <td><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/auto_commit_g.jpg"></img></td>
            <td>通过</td>
            </tr></table></div></td>
        <td align="left" width=15%>
          <div style="border:solid 0px red;overflow:hidden;width:100%;height:100%;"
            onmousemove="showTips(this.tips, 1,this)" onmouseout="showTips(this.tips, 0,this)"
            tips="退回 <%=tempTitle%> （<applus:resource code='<%=curCompoId%>' />）"
            onclick="funtreadOne('<%=userId%>','<%=tempInstId%>','<%=curCompoId%>','<%=tempTitle%>');">
          <table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
          <tr>
            <td><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/untread_g.jpg"></img></td>
            <td>退回</td>
            </tr></table></div></td>
        <td align="left" width=10%>
          <div style="border:solid 0px red;overflow:hidden;width:100%;height:100%;"
            onmousemove="showTips(this.tips, 1,this)" onmouseout="showTips(this.tips, 0,this)"
            tips="流程跟踪 <%=tempTitle%> （<applus:resource code='<%=curCompoId%>' />）"
            onclick="ftraceOne('<%=tempInstId%>')">
          <table border="0" cellspacing="0" cellpadding="0" style="font-size:9pt;">
          <tr>
            <td><img border="0" width="16px" height="16px" src="/style/img/gp5/ico/show_instance_trace_g.jpg"></img></td>
            <td>流程跟踪</td>
            </tr></table></div></td>
      </tr>
    <%
      compoIndex ++;
      if(compoIndex == MAX_ROW_NUM + 1 && compoNum > MAX_ROW_NUM){//is the last one%>
       <tr  id="TR_<%=curCompoId%>-MORE"
         style="display:<%=((compoIndex>MAX_ROW_NUM)?"":"none")%>">
        <td width=2%>&nbsp;</td>
        <td align="left" width=28% colSpan=5><a name="fmore"
          id="fmoreID"  class="clsGridActionButton4"
          tips="查看所有待办单据 （<applus:resource code='<%=curCompoId%>' />）"
          onmousemove="showTips(this.tips, 1, this)"
          onmouseout="showTips(this.tips, 0, this)"
          href="javascript:fgetTodoList('<%=curCompoId%>')">更多...
          </a></td>
      </tr>
    <%
        out.flush();
      }//end of "more"
    }//end of many row%>
    </table><br>
      <%
    out.flush();
  }//end of many compo
  %>
<!--/table-->
<%}//end of not null%>
  </div>
  <span>
</page>
<%
  out.println("\n");
  out.println("<xml id=\"SessionXML\" asynch=\"false\">\n");
  out.println(DataTools.getSessionDataXML("",request));
  out.println("</xml>\n");
%>

<%=WFUtil.getWFSessionXml(request)%>
<applus:endpage />
</body>
</html>
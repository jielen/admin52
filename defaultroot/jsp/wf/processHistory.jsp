<%@page contentType="text/html;charset=GBK"%><%

// $Id: processHistory.jsp,v 1.2 2008/03/24 10:42:05 liuxiaoyong Exp $
/**
 * 流程历史
 * 【参数】
 * "PROCESS_INST_ID" (全部小写) 流程ID
 */
/*
TODO: 使用通用的方法生成页面框架，现在一旦改变页面风格，大量 jsp 页面需要重写 2004-3-25

*/
%>
<%@page import="java.util.*, java.sql.Connection"%>
<%@page import="com.anyi.gp.util.StringTools"%>
<%@page import="com.anyi.gp.pub.DAOFactory"%>
<%@page import="com.anyi.gp.workflow.util.WFConst"%>
<%@page import="com.anyi.gp.workflow.WFFactory"%>
<%@page import="com.anyi.gp.workflow.WFService"%>
<%@page import="com.anyi.gp.workflow.bean.WorkitemBean"%>
<%@page import="com.anyi.gp.workflow.WFWorkList"%>
<%

    // 因为 WFConst 是接口， Weblogic 似乎不接受 :( WFConst.PROCESS_INST_ID.toLowerCase()
    String processInstId = request.getParameter(WFConst.WF_INSTANCE_ID);
//    Connection conn = DAOFactory.getInstance().getConnection();
    WFService wfs = WFFactory.getInstance().getService();
    List workitems = wfs.getProcessHistory(processInstId,0);
//    conn.close();
    int viCount = 0;
%>

<%@ taglib uri="/applus" prefix="applus" %>

<html>
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<title>审核意见</title>
<LINK href="script/applus.css" rel="stylesheet" type="text/css"></LINK>

<applus:include language="javascript">
    gp.page.Toolbar;
    gp.default.Btn_EventAdapter;
</applus:include>

</head>

<script language="javascript">

  function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent) {
    window.close();
  }

</script>

<body leftMargin="0" rightMargin="0" topMargin="0">

<applus:init>
  var voToolbar= toolbar.oOwner;
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
</applus:init>

<applus:toolbar id="toolbar">
  <call id="fclose" type="command" caption="关闭" accesskey="C" isgranttoall="true" />
</applus:toolbar>

<blockquote>

<table>
  <tr>
    <td height="20"></td>
  </tr>
</table>
<TABLE class="clsGridBodyTable" cellSpacing="1" cellPadding="1" border="0">
  <THEAD>
    <TR class="clsGridHeadRow" bgcolor="#F8F8F8">
      <TH nowrap width="20%">时间</TH>
      <TH nowrap width="20%">执行者</TH>
      <TH nowrap width="20%">环节</TH>
      <TH nowrap width="40%">意见</TH>
    </TR>
    <TR></TR>
  </THEAD>
<%
    // TODO: 先将 WorkitemBean 转成 TableData，再用通用方法输出
    for (Iterator i = workitems.iterator(); i.hasNext(); ) {
      WorkitemBean b = (WorkitemBean) i.next();
      WFWorkList wfwl=new WFWorkList();
      String comment=b.getComment();
      if (comment!=null && comment.trim().length()>0){
        StringBuffer s = new StringBuffer();
        s.append("<tr>\n");
        s.append("<td>");
        s.append(wfwl.toTimeString(b.getExecuteTime().toString()));
        s.append("</td>");
        s.append("<td align=center>");
        s.append(b.getExecutorName());
        s.append("</td>");
        s.append("<td align=center>");
        s.append(b.getActivityName());
        s.append("</td>");
        s.append("<td>");
        s.append(b.getComment());
        s.append("</td>");
        s.append("</tr>\n");
        out.print(s.toString());
        viCount++;
      }
    }
%>
</TABLE>


<%
    if (viCount == 0) {
      out.print("\n<p class=\"clsFreeTable\">暂时没有审核意见。</p>\n");
    }
%>

</blockquote>

<applus:endpage />
</body>
</html>

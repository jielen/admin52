<%@ page import="com.anyi.gp.pub.*" contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus"%>

<%
	String vsUserId = SessionUtils.getAttribute(session, "svUserID");
	String fromYear = "";
	String toYear = "";
	if (vsUserId == null || vsUserId.equals("sa") == false) {
		out.println();
		out.println();
		out.println("请以 sa 登录,方可进行基础资料年度结转操作!");
		out.println("现在的用户是: " + ((vsUserId == null) ? "''" : vsUserId));
		out.println();
	} else {
		fromYear = SessionUtils.getAttribute(session, "svNd");
		toYear = String.valueOf(Integer.parseInt(fromYear) + 1);
	}
%>

<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="script/applus.css">
		<script type="text/javascript" src="gp/pub/Information.js"></script>
		<script type="text/javascript" src="gp/pub/PublicFunction.js"></script>
		<script type="text/javascript" src="script/admin/AS_BASIC_CARRY_FORWARD.js"></script>
		<script type="text/javascript" src="script/Community.js"></script>
		<SCRIPT language="VBScript"  src="script/formenctype.vbs"></SCRIPT>
		<script type="text/javascript">
			var fromYear = "<%=fromYear%>";
			var toYear = "<%=toYear%>";
		</script>
	</head>
	<body class="clsPageBody">
		<table border="0" width="100%"
			style="font-size:11pt;border:solid gray 1px;">
			<tr>
				<td width="100%" align="center">

					<p>
					</p>
					<p>
						基础资料年度结转
					</p>
					<table border="0" width="100%">
						<tr>
							<td id="fromYearTD" align="right" width="50%" nowrap>
								<%=fromYear%>
							</td>
							<td nowrap>
								--&gt;
							</td>
							<td id="toYearTD" align="left" width="50%" nowrap>
								<%=toYear%>
							</td>
						</tr>
					</table>
					<p>
						<input type="button" value=" 确定 " name="OKBtn" onclick="startCarry();">
					</p>
					<p>
					</p>

				</td>
			</tr>
		</table>

	</body>
</html>


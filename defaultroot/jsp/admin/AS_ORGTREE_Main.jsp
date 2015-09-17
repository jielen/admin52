<%@page import="com.anyi.gp.*" language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus"%>
<html>
	<head>
	  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
		<title><applus:resource code="AS_ORGANIZATION_TREE" />
		</title>
	</head>
	<frameset id="WorkFrameSet" cols="280,*" frameborder="yes" border="5"
		bordercolor="#DDDDDD" MARGINWIDTH="0" MARGINHEIGHT="0" LEFTMARGIN="0"
		TOPMARGIN="0">
		<frame src="/<%=Pub.getWebRoot(request)%>/getAdminPath.action"
			name="treeframe" id="treeframe" frameBorder=0 scrolling="no">
		<frame src="" name="clientframe" id="clientframe" scrolling="auto"
			frameBorder=0>
	</frameset>

	<noframes>
		<body>
		</body>
	</noframes>
</html>

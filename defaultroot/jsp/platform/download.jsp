<%@ page contentType="text/html; charset=GBK" %><%@ page import="java.io.*" %><%
	String id = (String)request.getAttribute("ufgov_key");
	if (id != null && !id.equals("")) {
		response.setContentType("application/x-download");
		response.setHeader("Content-Disposition", "attachment;filename=\"ufgov_key\"");
		response.setContentLength(id.length());
		BufferedWriter o = null;
		try {
			o = new BufferedWriter(response.getWriter());
			o.write(id);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (o != null) {
				o.close();
			}
		}
	} else {
		out.print("<center><font color=\"red\">ÍøÂç´«Êä´íÎó£¬ÇëÉÔºóÖØÊÔ£¡</font></center>");
	}
%>
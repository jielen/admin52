<%@ page contentType="text/html; charset=GBK" %>
<%@page import ="java.util.Map"%>
<%@page import ="java.util.List"%>
<%@page import ="java.util.Iterator"%>
<%@page import ="java.math.BigDecimal" %>
<%@page import ="java.io.PrintWriter"%>
<%@page import ="java.io.IOException"%>
<%@page import ="com.anyi.gp.access.FileExportService"%>
<%@page import ="com.anyi.gp.pub.SessionUtils"%>
<%@page import ="com.anyi.gp.meta.CompoMeta"%>
<%@page import ="com.anyi.gp.meta.MetaManager"%>
<%@page import ="com.anyi.gp.pub.RightUtil"%>
<%@page import ="com.anyi.gp.util.StringTools" %>
<%@page import ="com.anyi.gp.core.action.PageAction" %>

<%
	//TODO:可以进行优化
	String ruleID = request.getParameter("ruleID");
	String condition = request.getParameter("condition");
	String tableHead = request.getParameter("tableHead");
	String tableData = request.getParameter("tableData");	
	String tableName = request.getParameter("tableName");	
	String valueSet = request.getParameter("valueSet");	
	String compoName = request.getParameter("compoName");
	String type = request.getParameter("type");
	String searCond = request.getParameter("searchCond");
	
    FileExportService fileExport = new FileExportService();	 
	/*****获取页头显示格式数据**************/
    Map headMap = fileExport.getTableHeadMap(tableHead);
	/********************获取body体数据**************************/
    List dataList = null;
    if (tableData != null) {
    	dataList = fileExport.getTableBodyList(headMap, tableData, valueSet);
    }else{
		if (!type.equalsIgnoreCase(PageAction.ADVANCED_SEARCH) && !type.equalsIgnoreCase(PageAction.ADVANCED_PAGINATION)) {
			condition += ";" + searCond;
		}
    	String userNumLimCondition = getUserNumLimCondition(request, tableName, compoName);
    	if(type.equalsIgnoreCase(PageAction.ADVANCED_SEARCH) || type.equalsIgnoreCase(PageAction.ADVANCED_PAGINATION)){//搜索类型为高级搜索时，将搜索条件附加上；
      		String conSql = searCond.substring(0, searCond.indexOf("/"));
      		String keySql = searCond.substring(searCond.indexOf("/")+1);
      		condition += ";" + keySql;
      		if(userNumLimCondition != null && userNumLimCondition.length() > 0)
        		userNumLimCondition += " and ";
      		userNumLimCondition += conSql;
		}
		
    	List dataString = fileExport.getDataListByRuleID(tableName, ruleID, condition, userNumLimCondition);
      	dataList = fileExport.getTableBodyList(headMap, dataString, valueSet);
    }
    
	printHSSFWorkbook(response, tableName, headMap, dataList);
	
%>

<%! 
	public String getUserNumLimCondition(HttpServletRequest request, String tableName, String compoName){
		String userNumLimCondition = "";
		String userId = SessionUtils.getAttribute(request, "svUserID");
    	if(tableName != null){
      		CompoMeta compoMeta = MetaManager.getCompoMeta(compoName);
      		if(compoMeta != null && tableName.equals(compoMeta.getMasterTable())){
        		userNumLimCondition = RightUtil.getUserNumLimCondition(request, userId, "fwatch", compoName, null, null);
      		}
    	}
    	return userNumLimCondition;
	}
		
	public void printHSSFWorkbook(HttpServletResponse response, String tableName, Map headMap, List dataList){
		PrintWriter out = null;
		try{
			out = response.getWriter();
			response.setContentType("application/vnd.ms-excel;charset=GBK");
			response.setHeader("Content-Disposition", "attachment; filename=" + tableName + ".xls");
			out.println("<HTML><meta http-equiv=\"Content-Type\" content=\"text/html; charset=GBK\">");
			out.println("<head><title>");
			out.println(tableName);
			out.println("</title></head>");
			out.println("<body>");
			out.println("<TABLE borderColor=#111111 cellSpacing=0 cellPadding=2 width=1200 align=center border=1>");
			
			printHSSFRow(out, headMap);
			if(dataList != null){
				int size = dataList.size();
				for(int i = 0; i < size; i++){
					printHSSFRow(out, (Map)dataList.get(i));
				}	
			}
			
			out.println("</TABLE>");
			out.println("</body>");
			out.println("</HTML>");  
			
			out.flush();
			
		}catch(IOException e){
		}finally{
			out.close();
		}
	}
	
	public void printHSSFRow(PrintWriter out, Map rowMap) throws IOException{
		if(rowMap == null || rowMap.isEmpty()){
			return;
		}
		
		out.println("<TR>");
		Iterator itera = rowMap.entrySet().iterator();
		while(itera.hasNext()){
			Map.Entry entry = (Map.Entry)itera.next();
			out.println("<TD align=middle width=\"10%\" height=20 rowSpan=1>");
			
			Object tmpValue = entry.getValue();
          	if(tmpValue == null){
            	out.println("");
          	}else if(tmpValue instanceof BigDecimal){
            	out.println(StringTools.addZero(tmpValue.toString(), 2)); 
          	}else{
            	out.println(tmpValue.toString());
          	}
			
			out.println("</TD>");
		}
		
		out.println("</TR>");
	}
%>
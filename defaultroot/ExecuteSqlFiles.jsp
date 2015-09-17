<%@page contentType="text/html; charset=GBK"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileReader"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.io.FileNotFoundException"%>
<%@page import="java.io.IOException"%>
<%@page import="com.anyi.gp.core.dao.BaseDao"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%!
	public void traversalFiles(String path){
	   File directory = new File(path);
	   File[] files = directory.listFiles();
	   for (int i = 0; i < files.length; i++) {
	   	   File curFile = files[i];
		   if(curFile.isDirectory()){
		   	 traversalFiles(path + curFile.getName() + "/");
		   }else{
		   	 System.out.println("file :" + curFile.getName());
		   	 String fileName = curFile.getName();
		   	 String afterName = fileName.substring(fileName.lastIndexOf(".") + 1);
		   	 if("sql".equals(afterName)) readAndExecuteSql(path + curFile.getName());
		   }
	   }
   }
   public void readAndExecuteSql(String path){
		List sqls = readSql(path); 
		if(executeSqls(sqls))
			System.out.println("成功执行文件：" + path +"中数据库脚本！");
		else
			System.out.println("文件：" + path + "中脚本执行出错！");
    }
    public List readSql(String path){
    	List sqls = new ArrayList();
    	FileReader fr = null;
    	try{
    		fr = new FileReader(path); 
				int count = fr.read(); 
				int i = 0;
				char[] sql = new char[1024 * 2];
				while(count != -1) {
					if(';' == (char)count){
						fr.skip(1);
						String res = new String(sql, 0, i);
						sqls.add(res);
						i = 0;
					}else{
						sql[i++] = (char)count;
					}
					count = fr.read();
				}
    	}catch(FileNotFoundException e){
    		System.out.println("没有找到文件：" + path);
    	}catch(IOException e){
    		System.out.println("读取文件错误！");
    	}finally{
    		try{
    			fr.close();
    			}catch(IOException e){
    				System.out.println("文件关闭出错！");
    			}
    	}
		
		return sqls;
    }
    public boolean executeSqls(List sqls){
    	BaseDao dao = (BaseDao) ApplusContext.getBean("baseDao");
    	if(null == sqls) return true;
    	for(int i = 0; i < sqls.size(); i++){
    		try{
    			dao.executeBySql((String)sqls.get(i), null);
    			System.out.println((String)sqls.get(i));
    		}catch(Exception e){
    			System.out.println(e.getMessage());
    		}
    	}
    	return true;
    }
%>
<% 
   //String path = "E:/weblogic/domains/mydomain/applications/admin";
    System.out.println(request.getSession().getServletContext().getRealPath(""));
   Object userName = SessionUtils.getAttribute(request, "svUserID");
	if (null == userName || !userName.toString().equals("sa")) {
		userName = request.getRemoteUser();
	}
  if (null == userName || !userName.toString().equals("sa")) {
  	out.println("<h1>用户名：" + userName + "</h1>");
		out.println("<h1>只有系统管理员(sa)有权运行此工具！</h1>");
	} else {
   String dir = request.getSession().getServletContext().getRealPath("") + "/conf/db/";
   traversalFiles(dir);
   out.println("<h1>数据初始化成功！</h1>");
  }
  
%>


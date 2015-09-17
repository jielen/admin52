<%@page contentType="text/plain;charset=GBK"%><%@
 page import="java.io.*,java.sql.*,com.anyi.gp.pub.SessionUtils" %><%!

/**
 * 数据库导出工具
 * 参数: <表名> <SQL 语句>
 */
public static class DBExport{

  public static boolean bOracle = true;

  private JspWriter out;
  private String theSql;
  private String theTable;

  private static Connection getConnection() {
    try {
      return com.anyi.gp.pub.DAOFactory.getInstance().getConnection();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  public static void main(String theTable, String theSql, JspWriter out) throws Exception{
    main(new String[]{theTable, theSql}, out);
  }

  public static void main(String[] args, JspWriter out) throws Exception{
    DBExport e = new DBExport();
    e.theTable = "";
    if(2 != args.length){
      out.println("Usage: java -cp %theCP% -DtheUser=%theUser% -DthePW=%thePW% -DtheDriver=%theDriver% -DtheUrl=%theUrl% -DtheTarget=%theTarget DBExport <TABLENAME> <SQL>");
      throw new RuntimeException("无效的参数");
    }
    e.out = out;
    e.theTable = args[0];
    e.theSql = args[1];
    e.setup();
    e.run();
  }

  public void setup(){
  }

  public static String getDbURL() throws SQLException {
    Connection conn = null;
    try{
      conn = getConnection();
      return conn.getMetaData().getURL() + ", user=" + conn.getMetaData().getUserName();
    } finally{
      closeConnection(conn, null, null);
    }
  }

  public void run() throws Exception{
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    try{
      conn = getConnection();
      stmt = conn.createStatement();
      out.println("--*** " + theSql);
      rs = stmt.executeQuery(theSql);
      generateInsertSql(rs, theTable, bOracle);
    } finally{
      closeConnection(conn, stmt, rs);
    }
  }

  public void generateInsertSql(ResultSet rs, String theTable, boolean bOracle) throws Exception{
    ResultSetMetaData meta = rs.getMetaData();
    int count = meta.getColumnCount();
    StringBuffer sInsert = new StringBuffer();
    sInsert.append("insert into ").append(theTable).append("(");
    sInsert.append(meta.getColumnName(1));
    for(int i = 2; i <= count; i++){
      sInsert.append(", ").append(meta.getColumnName(i));
    }
    sInsert.append(") values (");
    while(rs.next()){
      StringBuffer s = new StringBuffer();
      s.append(sInsert);
      quote(s, rs.getObject(1), bOracle);
      for(int i = 2; i <= count; i++){
        s.append(", ");
        quote(s, rs.getObject(i), bOracle);
      }
      s.append(");");
      out.println(s);
    }
  }

  public static void quote(StringBuffer s, Object o, boolean bOracle){
    if(null == o){
      s.append("NULL");
    } else if(o instanceof String){
      quoteString(s, o.toString());
    } else if(o instanceof java.sql.Timestamp){
      quoteTimestamp(s, o.toString(), bOracle);
    } else if(o instanceof java.sql.Date){
      quoteDate(s, o.toString(), bOracle);
    } else if(o instanceof java.sql.Time){
      quoteString(s, o.toString());
    } else if(o instanceof Boolean){
      quoteBoolean(s, o);
    } else if(o instanceof Clob){
      quoteClob(s, (Clob)o);
    } else{
      s.append(doubleApos(o.toString()));
    }
  }

  private static void quoteString(StringBuffer s, String o){
    if(null == o){
      s.append("NULL");
    } else{
      s.append("'");
      s.append(doubleApos(o));
      s.append("'");
    }
  }

  private static String doubleApos(String s){
    String result = s;
    for(int i = 0, j = 0; i < result.length(); i = j + 2){
      j = result.indexOf("'", i);
      if(j < 0){
        break;
      }
      result = result.substring(0, j) + "'" + result.substring(j, result.length());
    }
    return result;
  }

  private static void quoteTimestamp(StringBuffer s, String o, boolean bOracle){
    if(null == o){
      s.append("NULL");
    } else if (bOracle){
      int dot = o.indexOf('.');
      if (-1 != dot){
        o = o.substring(0, dot);
      }
      s.append("to_date('");
      s.append(doubleApos(o));
      s.append("', 'YYYY-MM-DD HH24:MI:SS')");
    } else{
      quoteString(s, o);
    }
  }

  private static void quoteDate(StringBuffer s, String o, boolean bOracle){
    if(null == o){
      s.append("NULL");
    } else if (bOracle){
      s.append("to_date('");
      s.append(doubleApos(o));
      s.append("', 'YYYY-MM-DD')");
    } else{
      quoteString(s, o);
    }
  }

  private static void quoteBoolean(StringBuffer s, Object o){
    if(null == o){
      s.append("NULL");
    } else if (((Boolean)o).booleanValue()){
      s.append(1);
    } else {
      s.append(0);
    }
  }

  private static void quoteClob(StringBuffer s, Clob clob){
    try {
      Reader in = new BufferedReader(clob.getCharacterStream());
      StringWriter out = new StringWriter();
      int c;
      while (-1 != (c = in.read()) ) {
        out.write(c);
      }
      quoteString(s, out.toString());
    } catch (SQLException e) {
      throw new RuntimeException(e.toString());
    } catch (IOException e) {
      throw new RuntimeException(e.toString());
    }
  }

  public static void closeConnection(Connection conn, Statement stmt, ResultSet rs) {
    try {
      if (null != rs) {
        rs.close();
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    try {
      if (null != stmt) {
        stmt.close();
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
    try {
      if (null != conn) {
        if (!conn.isClosed())
          conn.close();
      }
    } catch (SQLException e) {

      e.printStackTrace();
    }
  }

}

  public static String getTemplateXML(String templateId){
    String sql;
    Connection conn = null;
    ResultSet rs = null;
    Statement sm = null;
    StringBuffer strResult = new StringBuffer("");;
    try {
      conn = com.anyi.gp.pub.DAOFactory.getInstance().getConnection();
  		sm = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
  	   		ResultSet.CONCUR_READ_ONLY);
  	  sql = "select XML_CONTENT from WF_TEMPLATE where TEMPLATE_ID='" + templateId+ "'";
	  	rs = sm.executeQuery(sql);
	  	if (rs != null) {
		  	Reader reader = null;
	  		BufferedReader bufReader = null;
	  		if (rs.first()) {
	   			reader = rs.getCharacterStream("XML_CONTENT");
	  			if(reader!=null){
	  				bufReader = new BufferedReader(reader);
	  			}
	  			if (bufReader != null) {
			  		String line;
		  			while ((line = bufReader.readLine()) != null) {
			  			strResult.append(line);
			  			strResult.append("\r\n");
					}
				}
			}
		}
	} catch (IOException e) {
    e.printStackTrace();
  } catch(SQLException se){
    se.printStackTrace();
  } finally{
    DBExport.closeConnection(conn, sm, rs);
  }
  return strResult.toString();
  }


%><%

Object userName = SessionUtils.getAttribute(request,"svUserID");
if (null == userName || !userName.toString().equals("sa")) {
  out.println("只有系统管理员(sa)有权运行此工具！");
  return;
}

String templateId = request.getQueryString();
if (null == templateId) {
  out.println("-- 例如： exportWF.jsp?工作流模板ID");
  out.println("-- 例如： exportWF.jsp?701");
  return;
}

String WHERE_WF_TEMPLATE =  " where WF_TEMPLATE_ID='" + templateId +"'";
String WHERE_TEMPLATE =  " where TEMPLATE_ID='" + templateId +"'";
String WHERE_NODE = " where NODE_ID in (select NODE_ID from WF_NODE where TEMPLATE_ID='" + templateId +"')";
String WHERE_LINK = " where NODE_LINK_ID in (select NODE_LINK_ID from WF_LINK where TEMPLATE_ID='" + templateId +"')";

/////////////////////////////////////////////////////////////////////////////
// ◆开始导出数据
/////////////////////////////////////////////////////////////////////////////

out.println("-- 以下导出工作流模板定义数据库记录，放到d_insert目录中");
out.println("-- format 5.0");

DBExport.main("AS_WF_ACTIVITY_COMPO","select * from AS_WF_ACTIVITY_COMPO" + WHERE_WF_TEMPLATE,out);
DBExport.main("AS_WF_ACTIVITY_FIELD","select * from AS_WF_ACTIVITY_FIELD" + WHERE_WF_TEMPLATE,out);
DBExport.main("AS_WF_BIND_STATE","select * from AS_WF_BIND_STATE" + WHERE_WF_TEMPLATE,out);
DBExport.main("AS_WF_BIND_VARIABLE","select * from AS_WF_BIND_VARIABLE" + WHERE_WF_TEMPLATE,out);
DBExport.main("AS_WF_FUNC_ACTIVITY","select * from AS_WF_FUNC_ACTIVITY" + WHERE_WF_TEMPLATE,out);
DBExport.main("WF_DELEGATION","select * from WF_DELEGATION" + WHERE_TEMPLATE,out);
DBExport.main("WF_DELEGATION_HISTORY","select * from WF_DELEGATION_HISTORY" + WHERE_TEMPLATE,out);
DBExport.main("WF_EXECUTOR_ORDER","select * from WF_EXECUTOR_ORDER" + WHERE_NODE,out);
DBExport.main("WF_EXECUTOR_SOURCE","select * from WF_EXECUTOR_SOURCE" +WHERE_NODE,out);
DBExport.main("WF_LINK","select * from WF_LINK" + WHERE_TEMPLATE,out);
DBExport.main("WF_LINK_STATE","select * from WF_LINK_STATE" +WHERE_LINK,out);
DBExport.main("WF_NODE","select * from WF_NODE" + WHERE_TEMPLATE,out);
DBExport.main("WF_NODE_STATE","select * from WF_NODE_STATE" + WHERE_NODE,out);
DBExport.main("WF_STATE","select * from WF_STATE" + WHERE_TEMPLATE,out);
DBExport.main("WF_TEMPLATE",
    "select TEMPLATE_ID,NAME,DESCRIPTION,TEMPLATE_TYPE,VERSION,START_TIME,"
    +"EXPIRE_TIME,CREATE_TIME,CREATE_STAFF_ID,IS_ACTIVE from WF_TEMPLATE" 
    + WHERE_TEMPLATE,out);
DBExport.main("WF_VARIABLE","select * from WF_VARIABLE" + WHERE_TEMPLATE,out);


out.println("");
out.println("");
out.println("");
out.println("-- 以下导出工作流模板定义xml内容");
out.println("-- 另存成文件%id%.xml(例如701.xml),放到w_template目录中");
out.print(getTemplateXML(templateId));

%>

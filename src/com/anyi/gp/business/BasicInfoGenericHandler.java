 package com.anyi.gp.business;
 
 import com.anyi.gp.Pub;
 import com.anyi.gp.pub.DAOFactory;
 import com.anyi.gp.pub.DBHelper;
 import com.anyi.gp.util.StringTools;
 import com.anyi.gp.util.XMLTools;
 import java.sql.Connection;
 import java.sql.PreparedStatement;
 import java.sql.ResultSet;
 import java.sql.ResultSetMetaData;
 import java.sql.SQLException;
 import java.sql.Statement;
 import java.util.ArrayList;
 import java.util.Iterator;
 import java.util.List;
 import javax.xml.transform.TransformerException;
 import org.apache.log4j.Logger;
 import org.apache.xpath.XPathAPI;
 import org.w3c.dom.Document;
 import org.w3c.dom.Node;
 import org.w3c.dom.NodeList;
 
 public class BasicInfoGenericHandler
   implements IBasicInfoHandler
 {
   private final Logger log = Logger.getLogger(BasicInfoGenericHandler.class);
   private static final String CARRAY_NODE = "basic-information-carray-forward";
   private static final String AFTER_NODE = "after";
   private static final String AFTER_UID_RELA = "uid-rela";
   private List confList;
 
   public BasicInfoGenericHandler()
   {
     this.confList = new ArrayList();
   }
 
   public BasicInfoGenericHandler(List confList) {
     this.confList = confList;
   }
 
   public synchronized void carryForward(int fromYear, int toYear) {
     Connection conn = null;
     try {
       conn = DAOFactory.getInstance().getConnection();
       conn.setAutoCommit(false);
       for (Iterator iter = this.confList.iterator(); iter.hasNext(); ) {
         String conf = (String)iter.next();
         carryWithConf(conn, conf, fromYear, toYear);
       }
       conn.commit();
     } catch (SQLException e) {
       this.log.error(e);
       throw new RuntimeException(e);
     } finally {
       DBHelper.closeConnection(conn);
     }
   }
 
   protected void carryWithConf(Connection conn, String conf, int fromYear, int toYear) {
     Node node = getCarryNode(conf);
     if (node == null)
       return;
     XMLTools.trimChildNodes(node);
     int i = 0; for (int len = node.getChildNodes().getLength(); i < len; i++) {
       Node child = node.getChildNodes().item(i);
       TableInfo info = new TableInfo(null);
       info.name = XMLTools.getNodeAttr(child, "name");
       info.ndField = XMLTools.getNodeAttr(child, "ndfield");
       info.uidFields = StringTools.split(XMLTools.getNodeAttr(child, "uidfields"), ",");
 
       info.exceptFields = StringTools.split(XMLTools.getNodeAttr(child, "exceptfields"), ",");
 
       XMLTools.trimChildNodes(child);
       if (child.hasChildNodes()) {
         int j = 0; for (int lenj = child.getChildNodes().getLength(); j < lenj; j++) {
           Node childj = child.getChildNodes().item(j);
 
           if ("after".equals(childj.getNodeName())) {
             info.afterNode = childj;
           }
         }
       }
       carryTable(conn, info, fromYear, toYear);
     }
   }
 
   private Node getCarryNode(String conf) {
     Document doc = BasicInfoManager.getDoc(conf);
     if (doc == null) {
       this.log.info("\n基础资料结转配置文件没有发现; file: " + conf);
       return null;
     }
     Node node = null;
     try {
       node = XPathAPI.selectSingleNode(doc.getDocumentElement(), "basic-information-carray-forward");
     } catch (TransformerException e) {
       throw new RuntimeException(e);
     }
     if (node == null) {
       throw new RuntimeException("\n基础资料结转配置文件中没有发现结点: basic-information-carray-forward, 不能进行结转工作.");
     }
 
     return node;
   }
 
   protected void carryTable(Connection conn, TableInfo info, int fromYear, int toYear) {
     PreparedStatement insStmt = null;
     Statement stmt = null;
     ResultSet rs = null;
     String sql = "select * from " + info.name + " where " + info.ndField + "='" + fromYear + "'";
     try
     {
       stmt = conn.createStatement();
       String delSql = getDeleteSql(info, toYear);
       try {
         stmt.execute(delSql);
       } catch (SQLException e) {
         throw new RuntimeException("执行删除操作失败!\n" + e.getMessage() + "\n" + delSql, e);
       }
       try {
         rs = stmt.executeQuery(sql);
       } catch (SQLException e) {
         throw new RuntimeException("执行查询操作失败!\n" + e.getMessage() + "\n" + sql, e);
       }
       InsSql insSql = getInsertSql(rs.getMetaData(), info, fromYear, toYear);
       insStmt = conn.prepareStatement(insSql.sql);
       try {
         if (insSql.uidFields.isEmpty())
           insStmt.execute();
         else
           while (rs.next()) {
             carryTable_setUidParams(insStmt, insSql, rs);
             insStmt.execute();
           }
       }
       catch (SQLException e) {
         throw new RuntimeException("执行插入操作失败!\n" + e.getMessage() + "\n" + insSql, e);
       }
     } catch (SQLException e) {
       throw new RuntimeException(e);
     } finally {
       DBHelper.closeConnection(null, stmt, rs);
       DBHelper.closeConnection(null, insStmt, rs);
     }
 
     doAfter(conn, info, toYear);
   }
 
   private void carryTable_setUidParams(PreparedStatement pstmt, InsSql insSql, ResultSet rs) throws SQLException
   {
     int index = 1;
     for (int len = insSql.uidFields.size(); index <= len; index++) {
       pstmt.setString(index, Pub.getUID());
     }
     for (Iterator iter = insSql.uidFields.iterator(); iter.hasNext(); ) {
       String field = (String)iter.next();
       pstmt.setString(index++, rs.getString(field));
     }
   }
 
   private InsSql getInsertSql(ResultSetMetaData rsMeta, TableInfo info, int fromYear, int toYear) throws SQLException
   {
     InsSql insSql = new InsSql(null);
     StringBuffer insBuf = new StringBuffer();
     StringBuffer seleBuf = new StringBuffer();
     StringBuffer uidWhereBuf = new StringBuffer();
     try {
       int i = 1; for (int len = rsMeta.getColumnCount(); i <= len; i++) {
         String field = rsMeta.getColumnName(i);
         if (insBuf.length() > 0) {
           insBuf.append(",");
           seleBuf.append(",");
         }
         insBuf.append(field);
         if (info.ndField.equalsIgnoreCase(field)) {
           seleBuf.append("'");
           seleBuf.append(String.valueOf(toYear));
           seleBuf.append("'");
         } else if (info.uidFields.contains(field)) {
           seleBuf.append("?");
           if (uidWhereBuf.length() > 0)
             uidWhereBuf.append(" and ");
           uidWhereBuf.append(field).append("=?");
           insSql.uidFields.add(field);
         } else if (info.exceptFields.contains(field)) {
           seleBuf.append("null");
         } else {
           seleBuf.append(field);
         }
       }
     } catch (SQLException e) {
       throw e;
     }
     String sql = "insert into " + info.name + " (" + insBuf.toString() + ") " + " select " + seleBuf.toString() + " from " + info.name + " where " + info.ndField + "='" + fromYear + "'";
 
     if (uidWhereBuf.length() > 0) {
       sql = sql + " and " + uidWhereBuf;
     }
     insSql.sql = sql;
     return insSql;
   }
 
   private String getDeleteSql(TableInfo info, int toYear) {
     String sql = "delete from " + info.name + " where " + info.ndField + "='" + toYear + "'";
 
     return sql;
   }
 
   protected void doAfter(Connection conn, TableInfo info, int toYear)
   {
     String type = XMLTools.getNodeAttr(info.afterNode, "type");
     if ("uid-rela".equals(type))
       doAfterForUidRela(conn, info, toYear);
   }
 
   protected void doAfterForUidRela(Connection conn, TableInfo info, int toYear)
   {
     String selfUidField = XMLTools.getNodeAttr(info.afterNode, "selfuidfield");
     String parentUidField = XMLTools.getNodeAttr(info.afterNode, "parentuidfield");
     if (StringTools.isEmptyString(selfUidField))
       return;
     if (StringTools.isEmptyString(parentUidField)) {
       return;
     }
     Statement stmt = null;
     PreparedStatement stmt2 = null;
     PreparedStatement stmt3 = null;
     ResultSet rs = null;
     String sql = "select * from " + info.name + " where " + info.ndField + "='" + toYear + "'";
     try
     {
       stmt = conn.createStatement();
       try {
         rs = stmt.executeQuery(sql);
       } catch (SQLException e) {
         throw new RuntimeException("执行查询操作失败!\n" + e.getMessage() + "\n" + sql, e);
       }
       String sql2 = "update " + info.name + " set " + selfUidField + "= ? where " + selfUidField + "= ? and " + info.ndField + "='" + toYear + "'";
 
       String sql3 = "update " + info.name + " set " + parentUidField + "= ? where " + parentUidField + "= ? and " + info.ndField + "='" + toYear + "'";
 
       stmt2 = conn.prepareStatement(sql2);
       stmt3 = conn.prepareStatement(sql3);
       try {
         while (rs.next()) {
           String oldSelf = rs.getString(selfUidField);
           String newSelf = Pub.getUID();
           stmt2.setString(1, newSelf);
           stmt2.setString(2, oldSelf);
           stmt2.execute();
           stmt3.setString(1, newSelf);
           stmt3.setString(2, oldSelf);
           stmt3.execute();
         }
       } catch (SQLException e) {
         throw new RuntimeException("执行后处理操作失败! table: " + info.name + "\n" + e.getMessage(), e);
       }
     }
     catch (SQLException e) {
       throw new RuntimeException(e);
     } finally {
       DBHelper.closeConnection(null, stmt, rs);
       DBHelper.closeConnection(null, stmt2, rs);
       DBHelper.closeConnection(null, stmt3, rs);
     }
   }
 
   private class InsSql
   {
     public List uidFields;
     public String sql;
     private final BasicInfoGenericHandler this$0;
 
     private InsSql()
     {
       this.this$0 = null;
       this.uidFields = new ArrayList();
     }
 
     InsSql(BasicInfoGenericHandler obj)
     {
       this();
     }
   }
 
   private class TableInfo
   {
     public String name;
     public String ndField;
     public List uidFields;
     public List exceptFields;
     public Node afterNode;
     private final BasicInfoGenericHandler this$0;
 
     private TableInfo()
     {
       this.this$0 = null; 
       } 
     TableInfo(BasicInfoGenericHandler obj) { 
    	 this();
     }
   }
 }
 
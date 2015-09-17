 package com.anyi.admin.encrypt.impl;
 
 import com.anyi.admin.encrypt.EncryptService;
 import com.anyi.gp.license.RegisterTools;
 import com.anyi.gp.license.SystemStatus;
 import com.anyi.gp.pub.DAOFactory;
 import com.anyi.gp.pub.DBHelper;
 import com.caucho.hessian.server.HessianServlet;
 import java.io.ByteArrayInputStream;
 import java.io.ByteArrayOutputStream;
 import java.io.InputStream;
 import java.sql.Connection;
 import java.sql.DatabaseMetaData;
 import java.sql.PreparedStatement;
 import java.sql.ResultSet;
 import java.sql.ResultSetMetaData;
 import java.sql.SQLException;
 import java.sql.Statement;
 import java.util.ArrayList;
 import java.util.List;
 
 public class EncryptServlet extends HessianServlet
   implements EncryptService
 {
   public Object[][] getAllProducts()     throws Exception
   {
     List resultList = new ArrayList();
     Connection connection = null;
     Statement stmt = null;
     ResultSet rst = null;
     try {
       StringBuffer sqlBuffer = new StringBuffer();
       sqlBuffer.append(" select distinct a.product_code, nvl(b.res_na, a.product_code), max(a.version), '' from As_Product_Ver a ");
       sqlBuffer.append(" left join as_lang_trans b on a.product_code = b.res_id ");
       sqlBuffer.append(" where a.product_code not in('admin', 'portal', 'style', 'WFDesigner', 'WF')");
       sqlBuffer.append(" group by a.product_code, b.res_na order by a.product_code ");
 
       connection = DAOFactory.getInstance().getConnection();
       stmt = connection.createStatement();
       rst = stmt.executeQuery(sqlBuffer.toString());
       int fieldCount = rst.getMetaData().getColumnCount();
       while (rst.next()) {
         List l = new ArrayList();
         for (int i = 0; i < fieldCount; i++) {
           Object object = rst.getObject(i + 1);
           l.add(object);
         }
         resultList.add(l.toArray());
       }
       Object[][] retVal = new Object[resultList.size()][fieldCount];
       for (int i = 0; i < resultList.size(); i++) {
         retVal[i] = ((Object[])resultList.get(i));
       }
       return retVal; 
       }
     finally { 
    	 DBHelper.closeConnection(connection, stmt, rst); 
     } 

   }
 
   public void saveConfigure(String key, byte[] data) throws Exception
   {
     Connection connection = null;
     PreparedStatement pstmt = null;
     ResultSet rst = null;
     try {
       connection = DAOFactory.getInstance().getConnection();
       checkAndAddDataField(connection);
 
       pstmt = connection.prepareStatement("delete from As_Info where key = ?");
       pstmt.setString(1, key);
       pstmt.execute();
       pstmt.close();
       pstmt = connection.prepareStatement("insert into AS_INFO (KEY, DATA) values(?, ?)");
 
       pstmt.setString(1, key);
       pstmt.setBinaryStream(2, new ByteArrayInputStream(data), data.length);
       pstmt.execute();
     } finally {
       DBHelper.closeConnection(connection, pstmt, rst);
     }
   }
 
   private void checkAndAddDataField(Connection connection) throws SQLException {
     ResultSet columns = connection.getMetaData().getColumns(null, null, "AS_INFO", "DATA");
 
     if (!columns.next()) {
       Statement createStatement = connection.createStatement();
       createStatement.execute("alter table AS_INFO add DATA blob");
       createStatement.close();
     }
   }
 
   public byte[] getConfigure(String key) throws Exception {
     Connection connection = null;
     PreparedStatement pstmt = null;
     ResultSet rst = null;
     try {
       connection = DAOFactory.getInstance().getConnection();
       checkAndAddDataField(connection);
 
       pstmt = connection.prepareStatement("select DATA from As_Info where key = ?");
       pstmt.setString(1, key);
       rst = pstmt.executeQuery();
       if (rst.next()) {
         ByteArrayOutputStream bos = new ByteArrayOutputStream();
         InputStream in = rst.getBinaryStream(1);
         if (in == null) {
           return null;
         }
         byte[] buffer = new byte[1024];
         for (int len = 0; (len = in.read(buffer)) > -1; ) {
           bos.write(buffer, 0, len);
         }
         return bos.toByteArray();
       } } finally { DBHelper.closeConnection(connection, pstmt, rst);
     }
     return null;
   }
 
   public String encodeString(String source) {
     return RegisterTools.encodeString(source);
   }
 
   public void saveKeyToDB(String valueString) throws Exception {
     String sqlDeleteKey = " DELETE FROM as_info WHERE KEY =?";
     if (DAOFactory.getWhichFactory() == 1) {
       sqlDeleteKey = " DELETE FROM as_info WHERE [KEY] =?";
     }
     String sqlInsertKey = "INSERT INTO as_info (key, value) VALUES(?, ?) ";
     DBHelper.executeSQL(sqlDeleteKey, new Object[] { "license_key_info" });
     DBHelper.executeSQL(sqlInsertKey, new Object[] { "license_key_info", valueString });
   }
 
   public int getAccountCount() throws Exception
   {
     return new SystemStatus().getAccountCount();
   }
 
   public int getCompanyCount() throws Exception {
     return new SystemStatus().getCompanyCount();
   }
 }

 
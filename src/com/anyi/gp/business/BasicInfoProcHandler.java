 package com.anyi.gp.business;
 
 import com.anyi.gp.pub.DAOFactory;
 import com.anyi.gp.pub.DBHelper;
 import java.sql.CallableStatement;
 import java.sql.Connection;
 import java.sql.SQLException;
 import java.util.ArrayList;
 import java.util.Iterator;
 import java.util.List;
 import org.apache.log4j.Logger;
 
 public class BasicInfoProcHandler
   implements IBasicInfoHandler
 {
   private static final Logger log = Logger.getLogger(BasicInfoProcHandler.class);
   private List confList;
 
   public BasicInfoProcHandler()
   {
     this.confList = new ArrayList();
   }
 
   public BasicInfoProcHandler(List confList) {
     this.confList = confList;
   }
   public void carryForward(int fromYear, int toYear) {
     for (Iterator iter = this.confList.iterator(); iter.hasNext(); ) {
       String procName = (String)iter.next();
       executeProcedure(procName, fromYear, toYear);
     }
   }
 
   private void executeProcedure(String procName, int fromYear, int toYear) {
     Connection conn = null;
     CallableStatement pst = null;
     try {
       conn = DAOFactory.getInstance().getConnection();
       pst = conn.prepareCall("{call " + procName + " (?, ?)}");
       int index = 1;
       pst.setInt(index++, fromYear);
       pst.setInt(index++, toYear);
       pst.execute();
     } catch (SQLException e) {
       log.debug(e);
       throw new RuntimeException(e);
     } finally {
       DBHelper.closeConnection(conn, pst, null);
     }
   }
 }

 
 package com.anyi.admin.action;
 
 import com.anyi.gp.BusinessException;
 import com.anyi.gp.Pub;
 import com.anyi.gp.core.action.ServletAction;
 import com.anyi.gp.pub.DBHelper;
 import com.anyi.gp.pub.Row;
 import com.anyi.gp.pub.RowDelta;
 import com.anyi.gp.pub.RowTableData;
 import com.anyi.gp.pub.ServiceFacade;
 import java.util.List;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import org.apache.log4j.Logger;
 
 public class SaveAsCaAction extends ServletAction
 {
   private static final long serialVersionUID = 1L;
   private String data;
   private String isdigest;
   private ServiceFacade serviceFacade;
   public static final String ACTION_INSERT = "insert";
   public static final String ACTION_DELETE = "delete";
   public static final String ACTION_UPDATE = "update";
   private static final Logger logger = Logger.getLogger(SaveAsCaAction.class);
 
   public String execute(HttpServletRequest request, HttpServletResponse response) throws BusinessException
   {
     String deleteSql = "delete from as_emp_role where emp_code = (select emp_code from as_emp where user_id = ? )";
     String insertSql = "insert into as_emp_role(emp_code, role_id) values((select emp_code from as_emp where user_id = ? ) , 'ca' )";
     String updateSql = "update as_emp_role set emp_code= (select emp_code from as_emp where user_id = ? )  where emp_code= (select emp_code from as_emp where user_id = ? )";
     try {
       this.resultstring = this.serviceFacade.save(this.data, this.isdigest, request);
       RowDelta rowDelta = new RowDelta(this.data);
       List rows = rowDelta.getRowTableData("AS_ADMIN").getRecords();
       for (int i = 0; i < rows.size(); i++) {
         Row row = (Row)rows.get(i);
         String vsAction = row.getAction();
         if (!"insert".equals(vsAction))
           if ("delete".equals(vsAction)) {
             String[] params = new String[1];
             params[0] = row.getOldString("USER_ID");
             DBHelper.executeSQL(deleteSql, params); } else {
             if ("update".equals(vsAction))
               continue;
             throw new BusinessException("不支持的动作类型。 action: " + vsAction);
           }
       }
       for (int i = 0; i < rows.size(); i++) {
         Row row = (Row)rows.get(i);
         String vsAction = row.getAction();
         if ("insert".equals(vsAction)) {
           String[] params = new String[1];
           params[0] = row.getNewString("USER_ID");
           DBHelper.executeSQL(insertSql, params);
         } else if (!"delete".equals(vsAction)) {
           if ("update".equals(vsAction)) {
             String[] params = new String[2];
             params[0] = row.getNewString("USER_ID");
             params[1] = row.getOldString("USER_ID");
             DBHelper.executeSQL(updateSql, params);
           } else {
             throw new BusinessException("不支持的动作类型。 action: " + vsAction);
           }
         }
       }
     } catch (BusinessException be) {
       logger.debug(be);
       this.resultstring = Pub.makeRetInfo2(false, "", be.getMessage(), "");
     }
     return "success";
   }
 
   public String getData() {
     return this.data;
   }
 
   public void setData(String data) {
     this.data = data;
   }
 
   public String getIsdigest() {
     return this.isdigest;
   }
 
   public void setIsdigest(String isdigest) {
     this.isdigest = isdigest;
   }
 
   public ServiceFacade getServiceFacade() {
     return this.serviceFacade;
   }
 
   public void setServiceFacade(ServiceFacade serviceFacade) {
     this.serviceFacade = serviceFacade;
   }
 }
 
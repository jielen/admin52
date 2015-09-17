 package com.anyi.admin.action;
 
 import com.anyi.admin.access.AdminService;
 import com.anyi.gp.core.action.AjaxAction;
 import com.opensymphony.webwork.interceptor.ServletRequestAware;
 import javax.servlet.http.HttpServletRequest;
 
 public class DeleteEmpRelationAction extends AjaxAction
   implements ServletRequestAware
 {
   private static final long serialVersionUID = 1986949135124273107L;
   private String userId;
   private String data;
   private String isdigest;
   private AdminService as;
   private HttpServletRequest servletRequest = null;
 
   public AdminService getAs()
   {
     return this.as;
   }
 
   public void setAs(AdminService as) {
     this.as = as;
   }
 
   public String getData() {
     return this.data;
   }
 
   public void setData(String data) {
     this.data = data;
   }
 
   public String getIsdigest()
   {
     return this.isdigest;
   }
 
   public void setIsdigest(String isdigest) {
     this.isdigest = isdigest;
   }
 
   public String getUserId()
   {
     return this.userId;
   }
 
   public void setUserId(String userId) {
     this.userId = userId;
   }
 
   public String doExecute() throws Exception
   {
     String dataStr = "";
     try
     {
       dataStr = this.as.deleteEmp(this.userId, this.data, this.isdigest, this.servletRequest);
     } catch (Exception ex) {
       dataStr = ex.getMessage();
     }
     this.resultstring = dataStr;
     return "success";
   }
 
   public void setServletRequest(HttpServletRequest request) {
     this.servletRequest = request;
   }
 }
 
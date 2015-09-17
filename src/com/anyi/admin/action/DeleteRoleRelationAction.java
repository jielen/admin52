 package com.anyi.admin.action;
 
 import com.anyi.admin.access.AdminService;
 import com.anyi.gp.core.action.AjaxAction;
 import com.opensymphony.webwork.interceptor.ServletRequestAware;
 import javax.servlet.http.HttpServletRequest;
 
 public class DeleteRoleRelationAction extends AjaxAction
   implements ServletRequestAware
 {
   private static final long serialVersionUID = 1986949135124273107L;
   private String roleId;
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
 
   public String getRoleId()
   {
     return this.roleId;
   }
 
   public void setRoleId(String roleId) {
     this.roleId = roleId;
   }
 
   public String doExecute()
     throws Exception
   {
     String dataStr = "";
     try
     {
       dataStr = this.as.deleteRole(this.roleId, this.data, this.isdigest, this.servletRequest);
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
 
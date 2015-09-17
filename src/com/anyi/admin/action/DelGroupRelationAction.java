 package com.anyi.admin.action;
 
 import com.anyi.admin.access.AdminService;
 import com.anyi.gp.core.action.AjaxAction;
 
 public class DelGroupRelationAction extends AjaxAction
 {
   private static final long serialVersionUID = -4263388716967453421L;
   private String groupId;
   private AdminService as;
 
   public AdminService getAs()
   {
     return this.as;
   }
 
   public void setAs(AdminService as) {
     this.as = as;
   }
 
   public String getGroupId() {
     return this.groupId;
   }
 
   public void setGroupId(String groupId) {
     this.groupId = groupId;
   }
 
   public String doExecute() throws Exception {
     String dataStr = "";
     try {
       dataStr = this.as.deleteGroupRelation(this.groupId);
     } catch (Exception ex) {
       dataStr = ex.getMessage();
     }
     this.resultstring = dataStr;
     return "success";
   }
 }
 
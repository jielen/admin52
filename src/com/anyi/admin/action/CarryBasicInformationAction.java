 package com.anyi.admin.action;
 
 import com.anyi.gp.business.BasicInfoManager;
 import com.anyi.gp.core.action.AjaxAction;
 
 public class CarryBasicInformationAction extends AjaxAction
 {
   private static final long serialVersionUID = 1L;
   private String fromYear;
   private String toYear;
 
   public String getFromYear()
   {
     return this.fromYear;
   }
 
   public void setFromYear(String fromYear) {
     this.fromYear = fromYear;
   }
 
   public String getToYear() {
     return this.toYear;
   }
 
   public void setToYear(String toYear) {
     this.toYear = toYear;
   }
 
   public String doExecute() {
     try {
       BasicInfoManager manager = new BasicInfoManager();
       manager.carryForward(Integer.parseInt(this.fromYear), Integer.parseInt(this.toYear));
       this.resultstring = "true";
     } catch (Exception e) {
       this.resultstring = e.getMessage();
       return "success";
     }
     return "success";
   }
 }

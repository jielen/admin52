 package com.anyi.admin.action;
 
 import com.anyi.gp.core.action.AjaxAction;
 
 public class UpgradeKeyInfoAction extends AjaxAction
 {
   private static final long serialVersionUID = -2670516573901597968L;
   public String encodedKeyInfo;
 
   public void setEncodedKeyInfo(String encodedKeyInfo)
   {
     this.encodedKeyInfo = encodedKeyInfo;
   }
 
   public String doExecute()
   {
     return "success";
   }
 }
 
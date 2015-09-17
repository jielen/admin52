 package com.anyi.admin.action;
 
 import com.anyi.gp.core.action.AjaxAction;
 import com.anyi.gp.license.RegisterTools;
 import org.json.JSONObject;
 
 public class GetServerInfoAction extends AjaxAction
 {
   private static final long serialVersionUID = 4725572169477558627L;
 
   public String doExecute()
     throws Exception
   {
     this.resultstring = RegisterTools.getHostName().toString();
 
     return "success";
   }
 }
 
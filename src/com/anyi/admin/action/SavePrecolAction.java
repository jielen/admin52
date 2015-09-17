 package com.anyi.admin.action;
 
 import com.anyi.gp.core.action.AjaxAction;
 import com.anyi.gp.pub.GeneralFunc;
 import com.anyi.gp.pub.LangResource;
 import com.anyi.gp.util.StringTools;
 import com.opensymphony.webwork.interceptor.ServletRequestAware;
 import java.util.ArrayList;
 import java.util.List;
 import javax.servlet.http.HttpServletRequest;
 
 public class SavePrecolAction extends AjaxAction
   implements ServletRequestAware
 {
   private static final long serialVersionUID = -6897331802761593048L;
   private HttpServletRequest request;
 
   public HttpServletRequest getRequest()
   {
     return this.request;
   }
 
   public String doExecute() throws Exception {
     boolean vsFlag = false;
     String vsNameEnable = this.request.getParameter("VSNAMEENABLE");
     if (vsNameEnable == null)
       vsNameEnable = "";
     if ((vsNameEnable != null) && (vsNameEnable.equalsIgnoreCase("true"))) {
       vsFlag = true;
     }
     String dataItem = "";
     String dataItemNa = "";
     String arrVal = "";
     String tabId = "";
     String isUsed = "";
     String valSetId = "";
     List lData = new ArrayList();
     List lPara = new ArrayList();
     LangResource lr = LangResource.getInstance();
 
     String data = this.request.getParameter("DATA");
     tabId = this.request.getParameter("TABID");
 
     if ((data != null) && (!data.equals(""))) {
       lData = StringTools.split(data, ",");
       if ((lData != null) && (lData.size() > 0)) {
         for (int i = 0; i < lData.size(); i++) {
           arrVal = (String)lData.get(i);
           lPara = StringTools.split(arrVal, ":");
           if ((lPara != null) && (lPara.size() > 0)) {
             dataItem = (String)lPara.get(0);
             isUsed = (String)lPara.get(1);
             valSetId = (String)lPara.get(2);
             GeneralFunc.updatePreCol(tabId, dataItem, dataItemNa, isUsed, valSetId);
             lr.changeTrans(dataItem, dataItemNa);
             if (vsFlag) {
               GeneralFunc.updateValSetName(valSetId, dataItemNa);
             }
           }
         }
       }
     }
     return "success";
   }
 
   public void setServletRequest(HttpServletRequest request)
   {
     this.request = request;
   }
 }
 
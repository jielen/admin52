 package com.anyi.admin.integrate.gocom;
 
 import com.anyi.admin.integrate.gocom.service.GoComCommonService;
 import com.anyi.gp.BusinessException;
 import com.anyi.gp.access.WorkflowService;
 import com.anyi.gp.context.ApplusContext;
 import com.anyi.gp.core.dao.BaseDao;
 import com.anyi.gp.meta.MetaManager;
 import com.anyi.gp.meta.TableMeta;
 import com.anyi.gp.workflow.WFWorkList;
 import com.anyi.gp.workflow.util.WFException;
 import java.io.PrintStream;
 import java.sql.SQLException;
 import java.util.ArrayList;
 import java.util.List;
 import java.util.Map;
 import org.apache.commons.logging.Log;
 import org.apache.commons.logging.LogFactory;
 import org.quartz.Job;
 import org.quartz.JobExecutionContext;
 import org.quartz.JobExecutionException;
 
 public class SynMessageToGocom
   implements Job
 {
   private static Log _log = LogFactory.getLog(SynMessageToGocom.class);
 
   private static final String[] v51Products = { "GL", "CU", "GF", "BG", "RP", "PR", "FA", "DB", "PD", "BD", "NT", "BM", "HD", "MOM", "ZC" };
 
   private final String GET_USER_LIST = "integrate-gocom.getUserList";
   private GoComCommonService goComCommonService;
   private WorkflowService wfService;
 
   public void execute(JobExecutionContext context)
     throws JobExecutionException
   {
     if ((null == this.goComCommonService) || (null == this.wfService)) {
       init();
     }
 
     List userList = getUserList();
     List compoList = new ArrayList();
     for (int n = 0; n < userList.size(); n++) {
       String userId = (String)((Map)userList.get(n)).get("USER_ID");
       String mobile = this.goComCommonService.getMobileNumber(userId);
       try
       {
         compoList = WFWorkList.getTodoCompoListByUser(userId);
       } catch (WFException e) {
         _log.error(e);
         System.out.println("WFWorkList.getTodoCompoListByUser方法调用失败" + e.getMessage());
       }
 
       for (int i = 0; i < compoList.size(); i++) {
         String compoId = (String)compoList.get(i);
         List wfdata = new ArrayList();
         try {
           wfdata = this.wfService.getWrappedWfdataListByUserComp(userId, compoId, "WF_FILTER_COMPO_TODO", 5000);
         }
         catch (BusinessException e) {
           _log.error(e);
           System.out.println("wfService.getWrappedWfdataListByUserComp方法调用失败" + e.getMessage());
         }
         List urlList = populateUrl(compoId, wfdata);
         for (int j = 0; j < urlList.size(); j++) {
           String vsUrl = (String)urlList.get(j);
           String messTitle = (String)((Map)wfdata.get(j)).get("WF_PAGE_TITLE");
           String messContent = (String)((Map)wfdata.get(j)).get("WF_BRIEF");
           String sender = (String)((Map)wfdata.get(j)).get("WF_CREATOR");
           Object tempId = ((Map)wfdata.get(j)).get("TASK_ID");
 
           if (tempId == null) {
             continue;
           }
           String resId = this.goComCommonService.getUserState(userId);
           boolean isOnLine = false;
           if (("1".equals(resId)) || ("2".equals(resId)) || ("3".equals(resId)) || ("4".equals(resId))) {
             isOnLine = true;
           }
           String taskId = tempId.toString();
           System.out.println(vsUrl + ";" + messTitle + ";" + messContent + ";" + sender + ";" + taskId);
           this.goComCommonService.saveTodoWorkMessageToGoCom(sender, messTitle, messContent, vsUrl, userId, taskId, isOnLine, mobile);
         }
       }
     }
   }
 
   private void init()
   {
     this.goComCommonService = ((GoComCommonService)ApplusContext.getBean("goComCommonService"));
     this.wfService = ((WorkflowService)ApplusContext.getBean("workflowService"));
   }
 
   public GoComCommonService getGoComCommonService() {
     return this.goComCommonService;
   }
 
   public void setGoComCommonService(GoComCommonService goComCommonService) {
     this.goComCommonService = goComCommonService;
   }
 
   public WorkflowService getWfService() {
     return this.wfService;
   }
 
   public void setWfService(WorkflowService wfService) {
     this.wfService = wfService;
   }
   private List populateUrl(String compoId, List datas) {
     String url = "";
     List result = new ArrayList();
     if (datas != null) {
       for (int i = 0; i < datas.size(); i++) {
         Map data = (Map)datas.get(i);
         url = getDataURL(compoId, data);
 
         result.add(url);
       }
     }
     return result;
   }
 
   private String getDataURL(String compoId, Map data)
   {
     String processInsId = data.get("PROCESS_INST_ID").toString();
 
     String condition = (String)data.get("WF_CONDITION");
     String productCode = getProductCode(compoId);
     String newParam = parseCondition(condition);
     String result = "/" + productCode;
     if (isV51Product(productCode)) {
       String tableName = null;
       TableMeta meta = MetaManager.getTableMetaByCompoName(compoId);
       if (meta != null) {
         tableName = meta.getName();
       }
       condition = parseConditionTo51(condition, tableName);
       result = result + "/portlet.jsp?fieldvalue=" + compoId + "_E&PROCESS_INST_ID=" + processInsId;
     }
     else {
       result = result + "/getpage_" + compoId + ".action?" + newParam;
     }
     result = result + "&function=geteditpage";
     result = result + "&componame=" + compoId;
     result = result + "&condition=(" + condition + ")";
 
     return result;
   }
 
   private String parseCondition(String condition)
   {
     String result = "";
     String[] array = condition.split(";");
     for (int i = 0; i < array.length; i++) {
       String[] temp = array[i].split("=");
       result = result + temp[0] + "=" + temp[1] + "&";
     }
     if (result.length() > 0) {
       result = result.substring(0, result.length() - 1);
     }
     return result;
   }
 
   private String getProductCode(String compoId) {
     int dotPos = compoId.indexOf("_");
     String productCode = compoId.substring(0, dotPos);
     return productCode;
   }
 
   private boolean isV51Product(String productCode) {
     for (int i = 0; i < v51Products.length; i++) {
       if (productCode.equals(v51Products[i])) {
         return true;
       }
     }
     return false;
   }
 
   private String parseConditionTo51(String condition, String tableName) {
     String newCon = "";
     String[] array = condition.split(";");
     for (int i = 0; i < array.length; i++) {
       String[] temp = array[i].split("=");
       if (tableName != null) {
         newCon = newCon + tableName + ".";
       }
       newCon = newCon + temp[0] + "=" + "\\'" + temp[1] + "\\'" + " and ";
     }
     if (newCon.length() > 0) {
       newCon = newCon.substring(0, newCon.length() - 4);
     }
     return newCon;
   }
 
   private List getUserList() {
     BaseDao dao = (BaseDao)ApplusContext.getBean("baseDao");
     List userList = new ArrayList();
     try {
       userList = dao.queryForList("integrate-gocom.getUserList");
     } catch (SQLException e) {
       _log.error(e);
       e.printStackTrace();
     }
     return userList;
   }
 }
 
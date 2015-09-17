 package com.anyi.admin.integrate.gocom.service.impl;
 
 import com.anyi.admin.integrate.gocom.service.GoComCommonService;
 import com.anyi.gp.context.ApplusContext;
 import com.anyi.gp.context.EnvironmentConfig;
 import com.anyi.gp.core.dao.BaseDao;
 import com.anyi.gp.pub.GeneralFunc;
 import java.io.PrintStream;
 import java.net.MalformedURLException;
 import java.net.URL;
 import java.sql.SQLException;
 import java.text.SimpleDateFormat;
 import java.util.ArrayList;
 import java.util.Date;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 import org.apache.log4j.Logger;
 import org.codehaus.xfire.client.Client;
 
 public class GoComCommonServiceImpl
   implements GoComCommonService
 {
   private BaseDao baseDao;
   private static final Logger logger = Logger.getLogger(GoComCommonServiceImpl.class);
   private static final String SQL_GET_COMPANY_ORG = "integrate-gocom.getCompanyOrg";
   private static final String SQL_GET_EMP = "integrate-gocom.getEmp";
   private static final String SQL_SAVE_TEMP = "integrate-gocom.savaTemp";
   private static final String SQL_GET_TEMP = "integrate-gocom.getTemp";
   private static final String SQL_GET_USER = "integrate-gocom.getUserMobile";
   private static final String SQL_GET_UPDATE_TIME = "integrate-gocom.getUpdateTime";
   private static final String SQL_GET_LAST_UPDATE_TIME = "integrate-gocom.getLastUpdateTime";
   private static final String SQL_INSERT_UPDATE_TIME = "integrate-gocom.insertUpdateTime";
   private static final String SQL_UPDATE_TIME = "integrate-gocom.updateTime";
   private static final String WORK_TO_DO = "WORK_TO_DO";
   private static final String OPT_GOCOM_SERVER = "OPT_GOCOM_SERVER";
 
   public BaseDao getBaseDao()
   {
     return this.baseDao;
   }
 
   public void setBaseDao(BaseDao baseDao) {
     this.baseDao = baseDao;
   }
 
   public void saveTodoWorkMessageToGoCom(String acceptMen, String messTitle, String messContent, String vsUrl, String userId, String taskId, boolean isOnLine, String mobile)
   {
     if ((messContent == null) || (messContent.equals("")))
       messContent = "您有一条待办工作，请及时办理！";
     else {
       messContent = messContent + "等待您审批。";
     }
     if ((messTitle == null) || (messTitle.equals(""))) {
       messTitle = "消息提醒";
     }
 
     SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
     String messStr = "江阴财政网上办公平台于" + dateFormat.format(new Date()) + "提示您:" + messContent;
 
     StringBuffer htmlContent = null;
     String portalServerUrl = ApplusContext.getEnvironmentConfig().get("portalAddress");
 
     if (portalServerUrl == null) {
       portalServerUrl = "http:localhost:7001";
     }
     String vsStyle = "menubar= no,toolbar= no,scrollbars=no,resizable= yes,titlebar=yes,left=10px,top=10px,width=800px,height=600px";
     String vsUrlBegin = "buildSession.action?userId=";
 
     Client client = getGoComWebService();
     String result = null;
     String type = "WORK_TO_DO";
     System.out.println("userId = " + userId + "; isOnLine = " + isOnLine);
     if (exitTask(taskId, type, userId)) {
       return;
     }
     if (acceptMen.indexOf(",") > 0) {
       String[] acceptIds = acceptMen.split(",");
       for (int i = 0; i < acceptIds.length; i++) {
         if ((vsUrl != null) && (!vsUrl.equals(""))) {
           vsUrl = vsUrl.replaceAll("&", "%26");
           String url = portalServerUrl + vsUrlBegin + acceptIds[i] + "&url=" + vsUrl;
 
           htmlContent = new StringBuffer();
           htmlContent.append("<a style=\"cursor:hand\" onclick=\"window.open('");
 
           htmlContent.append(url);
           htmlContent.append("','new','");
           htmlContent.append(vsStyle);
           htmlContent.append("');\">");
           htmlContent.append(messContent);
           htmlContent.append("</a>");
           try
           {
             if (isOnLine)
             {
               Object[] params = { userId, acceptIds[i], htmlContent.toString(), messTitle, "" };
 
               client.invoke("sendOAMessage", params);
             }
             else if ((null != mobile) && (!"".equals(mobile)) && (!"null".equals(mobile)) && (isSendMessage(userId)))
             {
               Object[] params = { userId, messStr, mobile, "" };
               client.invoke("smsSend", params);
             }
           } catch (Exception e) {
             logger.error(e);
           }
         }
         else
         {
           try {
             if (isOnLine)
             {
               Object[] params = { userId, acceptIds[i], messContent, "" };
 
               client.invoke("sendMessage", params);
             } else if ((null != mobile) && (!"".equals(mobile)) && (!"null".equals(mobile)) && (isSendMessage(userId)))
             {
               Object[] params = { userId, messStr, mobile, "" };
               client.invoke("smsSend", params);
             }
           } catch (Exception e) {
             logger.error(e);
           }
         }
       }
     }
     else if ((vsUrl != null) && (!vsUrl.equals(""))) {
       vsUrl = vsUrl.replaceAll("&", "%26");
       String url = portalServerUrl + vsUrlBegin + acceptMen + "&url=" + vsUrl;
 
       htmlContent = new StringBuffer();
       htmlContent.append("<a style=\"cursor:hand\" onclick=\"window.open('");
 
       htmlContent.append(url);
       htmlContent.append("','new','");
       htmlContent.append(vsStyle);
       htmlContent.append("');\">");
       htmlContent.append(messContent);
       htmlContent.append("</a>");
       try {
         if (isOnLine)
         {
           Object[] params = { userId, acceptMen, htmlContent.toString(), messTitle, "" };
 
           client.invoke("sendOAMessage", params);
         } else if ((null != mobile) && (!"".equals(mobile)) && (!"null".equals(mobile)) && (isSendMessage(userId)))
         {
           Object[] params = { userId, messStr, mobile, "" };
           client.invoke("smsSend", params);
         }
       } catch (Exception e) {
         logger.error(e);
       }
     }
     else if (isOnLine)
     {
       Object[] params = { userId, acceptMen, messContent, "" };
       try {
         client.invoke("sendMessage", params);
       } catch (Exception e) {
         logger.error(e);
       }
     } else if ((null != mobile) && (!"".equals(mobile)) && (!"null".equals(mobile)) && (isSendMessage(userId)))
     {
       Object[] params = { userId, messStr, mobile, "" };
       try {
         client.invoke("smsSend", params);
       } catch (Exception e) {
         logger.error(e);
       }
 
     }
 
     System.out.println("return value :" + result + ";acceptMen :" + acceptMen + ";mobile = " + mobile);
 
     if ("0".trim().equals(result))
       saveTempToDB(taskId, type, userId);
   }
 
   private Client getGoComWebService()
   {
     String goComServerUrl = GeneralFunc.getOption("OPT_GOCOM_SERVER");
     if (goComServerUrl == null)
       goComServerUrl = "http:127.0.0.1:9901/";
     else if (!goComServerUrl.endsWith("/")) {
       goComServerUrl = goComServerUrl + "/";
     }
     String goComWebServiceUrl = goComServerUrl + "GoComWebServiceGoComWebService?wsdl";
 
     Client client = null;
     try {
       client = new Client(new URL(goComWebServiceUrl));
     } catch (MalformedURLException e) {
       logger.error(e);
     } catch (Exception e) {
       logger.error(e);
     }
     return client;
   }
 
   public void orgTreeSynchronizeToGoCom(String svNd) {
     Client client = getGoComWebService();
     List deptList = null;
     List timeList = null;
     try {
       timeList = getBaseDao().queryForList("integrate-gocom.getLastUpdateTime");
     } catch (SQLException e1) {
       logger.error(e1);
     }
 
     Map map = new HashMap();
     map.put("nd", svNd);
     if ((null != timeList) && (timeList.size() > 0) && (null != timeList.get(0)) && (null != ((Map)timeList.get(0)).get("VALUE")) && (!"".equals(((Map)timeList.get(0)).get("VALUE"))))
     {
       map.put("updateTime", ((Map)timeList.get(0)).get("VALUE").toString());
     }
     try
     {
       deptList = getBaseDao().queryForList("integrate-gocom.getCompanyOrg", map);
     } catch (SQLException e) {
       logger.error(e);
     }
     if ((null == deptList) || (deptList.size() == 0)) {
       return;
     }
     int length = deptList.size() % 200 == 0 ? deptList.size():200 + 1;
 
     for (int i = 0; i < length; i++) {
       List depts = deptList.size() - 1 > i * 200 + 199 ? deptList.subList(i * 200, i * 200 + 199) : deptList.subList(i * 200, deptList.size());
 
       String deptstr = toCompanyOrgListXml(deptList);
       Object[] params = { deptstr, "" };
       System.out.println(depts);
       if ((null == deptstr) || (deptstr.trim().equals("")))
         continue;
       System.out.println("单位数据已生成！");
       try {
         client.invoke("addBatchDept", params);
       } catch (Exception e) {
         logger.error(e);
       }
     }
   }
 
   public void importEmpList(String nd)
   {
     Client client = getGoComWebService();
     List empList = null;
     List timeList = null;
     try {
       timeList = getBaseDao().queryForList("integrate-gocom.getLastUpdateTime");
     } catch (SQLException e1) {
       logger.error(e1);
     }
     Map map = new HashMap();
     map.put("nd", nd);
     if ((null != timeList) && (timeList.size() > 0) && (null != timeList.get(0)) && (null != ((Map)timeList.get(0)).get("VALUE")) && (!"".equals(((Map)timeList.get(0)).get("VALUE"))))
     {
       map.put("updateTime", ((Map)timeList.get(0)).get("VALUE").toString());
     }
     try
     {
       empList = getBaseDao().queryForList("integrate-gocom.getEmp", map);
     } catch (SQLException e) {
       logger.error(e);
     }
     if ((null == empList) || (empList.size() == 0)) {
       return;
     }
     int length = empList.size() % 200 == 0 ? empList.size():200 + 1;
 
     for (int i = 0; i < length; i++) {
       List emps = empList.size() - 1 > i * 200 + 199 ? empList.subList(i * 200, i * 200 + 199) : empList.subList(i * 200, empList.size());
 
       String users = toUserListXml(emps);
       Object[] params = { users, "" };
       System.out.println(users);
       if ((null == users) || (users.trim().equals("")))
         continue;
       System.out.println("人员数据已生成！");
       try
       {
         client.invoke("addBatchUser", params);
       } catch (Exception e) {
         logger.error(e);
       }
     }
 
     saveUpdateTimeToDB();
   }
 
   private String convertNull(String inputStr) {
     if (inputStr == null) {
       return "";
     }
     return inputStr;
   }
 
   private String getUserPassword(String userPassword)
   {
     if ((userPassword == null) || (userPassword.equals("")))
       return "1";
     return GeneralFunc.recodePwd(userPassword);
   }
 
   private void saveTempToDB(String taskId, String type, String userId) {
     Map param = new HashMap();
     param.put("taskId", taskId);
     param.put("type", type);
     param.put("userId", userId);
     try {
       getBaseDao().insert("integrate-gocom.savaTemp", param);
     }
     catch (SQLException e) {
       logger.error(e);
       e.printStackTrace();
     }
   }
 
   private boolean exitTask(String taskId, String type, String userId) {
     List res = null;
     Map param = new HashMap();
     param.put("taskId", taskId);
     param.put("type", type);
     param.put("userId", userId);
     try {
       res = getBaseDao().queryForList("integrate-gocom.getTemp", param);
     }
     catch (SQLException e) {
       logger.error(e);
       e.printStackTrace();
     }
 
     return (null != res) && (res.size() > 0);
   }
 
   public void deleteAll()
   {
     Client client = getGoComWebService();
     String result = null;
     System.out.println("deleteall has called!");
     try {
       if (null == client) {
         System.out.println("client is null!");
       }
 
       Object[] params = { "" };
       client.invoke("delAllDepartMent", params);
       System.out.println("delAllDepartMent result = " + result);
     } catch (Exception e) {
       System.out.println("error: " + e.getMessage());
       logger.error(e);
     }
     try
     {
       Object[] params = { "" };
       client.invoke("delAllUser", params);
       System.out.println("deleteAllUsers result = " + result);
     } catch (Exception e) {
       System.out.println("error: " + e.getMessage());
       logger.error(e);
     }
   }
 
   private String getUserCompany(List empList, int index) {
     Map preMap = (Map)empList.get(index++);
     String p_code = convertNull((String)preMap.get("CO_CODE")) + "_" + convertNull((String)preMap.get("P_CODE"));
 
     String preUserId = (String)preMap.get("USER_ID");
     while (index < empList.size()) {
       Map empMap = (Map)empList.get(index++);
       String userId = (String)empMap.get("USER_ID");
       if (preUserId.equals(userId)) {
         p_code = p_code + "|" + convertNull((String)empMap.get("CO_CODE")) + "_" + convertNull((String)empMap.get("P_CODE"));
       }
       else {
         return p_code;
       }
     }
     return p_code;
   }
 
   public String getUserState(String userId) {
     Client client = getGoComWebService();
     String result = "";
     try
     {
       Object[] params = { userId };
       client.invoke("getUserState", params);
     } catch (Exception e) {
       logger.error(e);
     }
     return result;
   }
 
   public String getMobileNumber(String userId) {
     List res = null;
     Map param = new HashMap();
     param.put("userId", userId);
     try {
       res = getBaseDao().queryForList("integrate-gocom.getUserMobile", param);
     }
     catch (SQLException e) {
       logger.error(e);
       e.printStackTrace();
     }
     String mobile = "";
     if ((null != res) && (res.size() > 0)) {
       Map userMap = (Map)res.get(0);
       mobile = (String)userMap.get("PHONE");
     }
     return mobile;
   }
 
   private boolean isSendMessage(String userId) {
     List res = null;
     Map param = new HashMap();
     param.put("userId", userId);
     try {
       res = getBaseDao().queryForList("integrate-gocom.getUserMobile", param);
     }
     catch (SQLException e) {
       logger.error(e);
       e.printStackTrace();
     }
     boolean result = false;
     if ((null != res) && (res.size() > 0)) {
       Map userMap = (Map)res.get(0);
       String isSendMess = (String)userMap.get("IS_SEND_MESSAGE");
       if ("Y".equals(isSendMess.toUpperCase())) {
         result = true;
       }
     }
     return result;
   }
 
   private String toUserListXml(List empList) {
     if ((null == empList) || (empList.size() == 0)) {
       return null;
     }
     StringBuffer buf = new StringBuffer();
     buf.append("<users>");
     for (int i = 0; i < empList.size(); i++) {
       Map user = (Map)empList.get(i);
       String subdpt = getUserCompany(empList, i);
       String departmentId = convertNull((String)user.get("CO_CODE")) + "_" + convertNull((String)user.get("P_CODE"));
 
       buf.append("<user  username=\"");
       buf.append((String)user.get("USER_ID")).append("\"  realname=\"");
       buf.append(convertNull((String)user.get("EMP_NAME"))).append("\"  password=\"");
 
       buf.append(convertNull(getUserPassword((String)user.get("PASSWD")))).append("\"  departmentid=\"\"  strdepartmentid=\"");
 
       buf.append(convertNull(departmentId)).append("\"  subdepartmentid=\"");
 
       buf.append(convertNull(subdpt)).append("\"  position=\"\"  telphone=\"");
 
       buf.append(convertNull((String)user.get("PHONE"))).append("\"  mobile=\"");
 
       buf.append(convertNull((String)user.get("PHONE"))).append("\"  email=\"");
 
       buf.append(convertNull((String)user.get("EMAIL"))).append("\"  from=\"ufgov\" />");
 
       String[] companys = subdpt.split("\\|");
       if (companys.length > 1) {
         i += companys.length - 1;
       }
     }
 
     buf.append("</users>");
     return buf.toString();
   }
 
   private String toCompanyOrgListXml(List list) {
     if ((null == list) || (list.size() == 0)) {
       return null;
     }
     StringBuffer buf = new StringBuffer();
     buf.append("<depts>");
     for (int i = 0; i < list.size(); i++) {
       Map dept = (Map)list.get(i);
       String parentId = (String)dept.get("P_CODE");
       String parentOrg = (String)dept.get("P_ORG");
       if ((null == parentId) || (parentId.trim().equals("")) || ("null".equals(parentId)))
       {
         parentId = "1";
         buf.append("<dept  departmentid=\"\"  strdepartmentid=\"");
         buf.append((String)dept.get("DEPT_ID")).append("\"  departmentname=\"");
 
         buf.append(convertNull((String)dept.get("DEPT_NAME"))).append("\"  parentid=\"");
 
         buf.append(convertNull(parentId)).append("\"  strparentid=\"\"  position=\"\"  from=\"ufgov\" />");
       }
       else
       {
         if ((null != parentOrg) && (!"".equals(parentOrg)) && (!"null".equals(parentOrg)))
         {
           parentId = parentId + "_" + parentOrg;
         }
         buf.append("<dept  departmentid=\"\"  strdepartmentid=\"");
         buf.append((String)dept.get("DEPT_ID")).append("\"  departmentname=\"");
 
         buf.append(convertNull((String)dept.get("DEPT_NAME"))).append("\"  parentid=\"\"  strparentid=\"");
 
         buf.append(convertNull(parentId)).append("\"  position=\"\"  from=\"ufgov\" />");
       }
     }
 
     buf.append("</depts>");
     return buf.toString();
   }
 
   private boolean isInUpdateLog() {
     List res = null;
     try {
       res = getBaseDao().queryForList("integrate-gocom.getUpdateTime");
     } catch (SQLException e) {
       logger.error(e);
     }
 
     return (null != res) && (res.size() != 0);
   }
 
   private void saveUpdateTimeToDB()
   {
     SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
     String curTime = formatter.format(new Date());
     Map params = new HashMap();
     params.put("alterTime", curTime);
     if (isInUpdateLog())
       try {
         getBaseDao().update("integrate-gocom.updateTime", params);
       } catch (SQLException e) {
         logger.error(e);
       }
     else
       try {
         getBaseDao().insert("integrate-gocom.insertUpdateTime", params);
       } catch (SQLException e) {
         logger.error(e);
       }
   }
 
   public static void main(String[] args)
   {
     List a = new ArrayList();
     a.add("aaaaa");
     a.add("bbbbb");
     List b = a.subList(0, a.size());
     System.out.println(b.get(0).toString() + b.get(1).toString());
   }
 }
 
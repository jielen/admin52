 package com.ufgov.gmap.org.service.impl;
 
 import com.anyi.gp.Guid;
 import com.anyi.gp.core.dao.BaseDao;
 import com.anyi.gp.pub.SessionUtils;
 import com.ufgov.gmap.org.priv.service.AbstractHessianService;
 import com.ufgov.gmap.org.service.OrganizationService;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.Iterator;
 import java.util.List;
 import java.util.Map;
 import javax.servlet.http.HttpServletRequest;
 
 public class OrganizationServiceImpl extends AbstractHessianService
   implements OrganizationService
 {
   private static final long serialVersionUID = -4957854594143630798L;
   private static final String COMPANY_TYPE = "company";
   private static final String ORG_TYPE = "org";
   private static final String POSI_TYPE = "posi";
   private static final String EMP_TYPE = "emp";
   private static final String GET_COMPANY_INFO_BY_CODE = "gmap-org.getCompanyInfoByCode";
   private static final String GET_ORG_INFO_BY_CODE = "gmap-org.getOrgInfoByCode";
   private static final String GET_POSI_INFO_BY_CODE = "gmap-org.getPosiInfoByCode";
   private static final String GET_EMP_INFO_BY_CODE = "gmap-org.getEmpInfoByCode";
   private static final String GET_ORG_COUNT_BY_CODE = "gmap-org.getCompanyOrgCount";
   private static final String GET_ORG_POSI_COUNT_BY_CODE = "gmap-org.getOrgPosiCount";
   private static final String GET_EMP_POSI_COUNT_BY_CODE = "gmap-org.getEmpPosiCount";
   private static final String INSERT_COMPANY_INFO = "gmap-org.insertCompanyInfo";
   private static final String UPDATE_COMPANY_INFO = "gmap-org.updateCompanyInfo";
   private static final String DELETE_COMPANY_INFO = "gmap-org.deleteCompanyInfo";
   private static final String DELETE_ORG_INFO = "gmap-org.deleteOrgInfo";
   private static final String DELETE_ORG_POSI_INFO = "gmap-org.deleteOrgPosiInfo";
   private static final String DELETE_EMP_POSI_INFO = "gmap-org.deleteEmpPosiInfo";
   private static final String GET_OPT_CO_CODE = "gmap-org.getOptCoCodeInfo";
   private static final String INSERT_ORG_INFO = "gmap-org.insertOrgInfo";
   private static final String UPDATE_ORG_INFO = "gmap-org.updateOrgInfo";
   private static final String GET_ORG_POSI_INFO = "gmap-org.getOrgPosiInfo";
   private static final String GET_EMP_POSI_INFO = "gmap-org.getEmpPosiInfo";
   private static final String INSERT_ORG_POSI_INFO = "gmap-org.insertOrgPosiInfo";
   private static final String GET_ORG_COMPANY_LIST = "gmap-org.getOrgCompanyList";
   private static final String GET_COMPANY_LIST = "gmap-org.getCompanyList";
   private static final String GET_NUM_LIM_CHECKED_TYPE_LIST = "gmap-org.getNumLimCheckedType";
   private static final String CLEAR_CHECKED_NUM_LIM_TYPE = "gmap-org.clearCheckedNLType";
   private static final String SAVE_NUM_LIM_CHECKED_TYPE_LIST = "gmap-org.saveCheckedNLTypeList";
   private static final String UPDATE_ORG_COMPANY_INFO = "gmap-org.updateOrgCompanyInfo";
   private static final String DELETE_ORG_COMPANY_INFO_BY_CODE = "gmap-org.deleteOrgCompanyInfoByCode";
   private static final String INSERT_DEFAULT_EMP_POSI_INFO = "gmap-org.insertDefaultEmpPosiInfo";
   private static final String INSERT_EMP_INFO = "gmap-org.insertEmpInfo";
   private static final String INSERT_USER_INFO = "gmap-org.insertUserInfo";
   private static final String UPDATE_EMP_INFO = "gmap-org.updateOrgInfo";
   private static final String UPDATE_USER_INFO = "gmap-org.updateEmpInfo";
   private static final String DELETE_EMP_INFO = "gmap-org.deleteEmpInfo";
   private static final String DELETE_USER_INFO = "gmap-org.deleteUserInfo";
   private static final String INSERT_POSI_INFO = "gmap-org.insertPosiInfo";
   private static final String UPDATE_POSI_INFO = "gmap-org.updatePosiInfo";
   private static final String DELETE_POSI_INFO = "gmap-org.deletePosiInfo";
   private static final String DELETE_EMP_PRIV_INFO = "gmap-org.deleteEmpPrivInfo";
   private static final String DELETE_USER_GORUP_INFO = "gmap-org.deleteUserGroupInfo";
 
   public void deleteCompany(String coCode, String nd, boolean deleteAll)
     throws SQLException
   {
     Map param = new HashMap();
     param.put("coCode", coCode);
     param.put("nd", nd);
     this.baseDao.delete("gmap-org.deleteCompanyInfo", param);
     if (deleteAll) {
       this.baseDao.delete("gmap-org.deleteOrgInfo", param);
       this.baseDao.delete("gmap-org.deleteOrgPosiInfo", param);
       this.baseDao.delete("gmap-org.deleteEmpPosiInfo", param);
     }
   }
 
   public Map getCompanyInfo(String coCode, String nd) {
     Map resMap = null;
     if ((coCode != null) && (coCode.trim().length() != 0) && (nd != null) && (nd.trim().length() != 0))
     {
       Map param = new HashMap();
       param.put("coCode", coCode);
       param.put("nd", nd);
       try {
         List resList = this.baseDao.queryForList("gmap-org.getCompanyInfoByCode", param);
         if ((resList != null) && (resList.size() > 0))
           resMap = (Map)resList.get(0);
       }
       catch (SQLException e) {
         e.printStackTrace();
       }
     }
     return resMap;
   }
 
   public void insertCompanyInfo(Map param) throws SQLException {
     this.baseDao.insert("gmap-org.insertCompanyInfo", param);
   }
 
   public void updateCompanyInfo(Map param) throws SQLException {
     this.baseDao.update("gmap-org.updateCompanyInfo", param);
   }
 
   public boolean isDeletePermit(String dataType, Map param) {
     int count = 0;
     if ("company".equals(dataType)) {
       count = getInfoCount("gmap-org.getCompanyOrgCount", param) + getInfoCount("gmap-org.getOrgPosiCount", param) + getInfoCount("gmap-org.getEmpPosiCount", param);
     }
     else if ("org".equals(dataType)) {
       count = getInfoCount("gmap-org.getOrgPosiCount", param) + getInfoCount("gmap-org.getEmpPosiCount", param);
     }
     else if (!"posi".equals(dataType))
     {
       if (!"emp".equals(dataType));
     }
     return count == 0;
   }
 
   private int getInfoCount(String sqlId, Map param) {
     if (param == null) {
       return 0;
     }
     param.put("nd", SessionUtils.getAttribute((HttpServletRequest)getRequest(), "svNd"));
     try
     {
       List resList = this.baseDao.queryForList(sqlId, param);
       if ((resList != null) && (resList.size() > 0)) {
         Object count = ((Map)resList.get(0)).get("COUNT");
         if (count != null)
           return Integer.parseInt(count.toString());
       }
     }
     catch (SQLException e) {
       e.printStackTrace();
     }
     return 0;
   }
 
   public Map getOrgInfo(String coCode, String orgCode, String nd) {
     Map resMap = null;
     if ((orgCode != null) && (orgCode.trim().length() != 0) && (nd != null) && (nd.trim().length() != 0))
     {
       Map param = new HashMap();
       param.put("coCode", coCode);
       param.put("orgCode", orgCode);
       param.put("nd", nd);
       try {
         List resList = this.baseDao.queryForList("gmap-org.getOrgInfoByCode", param);
         if ((resList != null) && (resList.size() > 0))
           resMap = (Map)resList.get(0);
       }
       catch (SQLException e) {
         e.printStackTrace();
       }
     }
     return resMap;
   }
 
   public String getOptCoCode() {
     String optCoCode = null;
     try {
       List resList = this.baseDao.queryForList("gmap-org.getOptCoCodeInfo");
       if ((resList != null) && (resList.size() > 0)) {
         Map resMap = (Map)resList.get(0);
         optCoCode = (String)resMap.get("OPT_CO_CODE");
       }
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return optCoCode;
   }
 
   public void deleteOrg(String coCode, String orgCode, String nd, boolean deleteAll) throws SQLException
   {
     Map param = new HashMap();
     param.put("coCode", coCode);
     param.put("orgCode", orgCode);
     param.put("nd", nd);
     this.baseDao.delete("gmap-org.deleteOrgInfo", param);
     if (deleteAll) {
       this.baseDao.delete("gmap-org.deleteOrgPosiInfo", param);
       this.baseDao.delete("gmap-org.deleteEmpPosiInfo", param);
     }
   }
 
   public void insertOrgInfo(Map param) throws SQLException {
     this.baseDao.insert("gmap-org.insertOrgInfo", param);
     param.put("posiCode", "-1");
     this.baseDao.insert("gmap-org.insertOrgPosiInfo", param);
   }
 
   public void updateOrgInfo(Map param) throws SQLException {
     this.baseDao.update("gmap-org.updateOrgInfo", param);
   }
 
   public List getOrgPosiList(Map param) {
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-org.getOrgPosiInfo", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return resList;
   }
 
   public List getEmpPosiList(Map param) {
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-org.getEmpPosiInfo", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return resList;
   }
 
   public void saveOrgPosiInfo(List insertMap, List deleteMap) throws SQLException {
     if (deleteMap != null) {
       Iterator it = deleteMap.iterator();
       while (it.hasNext()) {
         Map param = (Map)it.next();
         this.baseDao.delete("gmap-org.deleteOrgPosiInfo", param);
       }
     }
     if (insertMap != null) {
       Iterator it = insertMap.iterator();
       while (it.hasNext()) {
         Map param = (Map)it.next();
         this.baseDao.insert("gmap-org.insertOrgPosiInfo", param);
       }
     }
   }
 
   public List getOrgCompanyList(String fCoCode, String fOrgCode, String nd) {
     List resList = null;
     if ((fCoCode == null) || (fOrgCode == null) || (fCoCode.trim().length() == 0) || (fOrgCode.trim().length() == 0))
     {
       return resList;
     }
     Map param = new HashMap();
     if ((nd == null) || (nd.trim().length() == 0)) {
       nd = SessionUtils.getAttribute((HttpServletRequest)getRequest(), "svNd");
     }
     param.put("fCoCode", fCoCode);
     param.put("fOrgCode", fOrgCode);
     param.put("nd", nd);
     try {
       resList = this.baseDao.queryForList("gmap-org.getOrgCompanyList", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return resList;
   }
 
   public List getCompanyList(String nd) {
     List resList = null;
     Map param = new HashMap();
     if ((nd == null) || (nd.trim().length() == 0)) {
       nd = SessionUtils.getAttribute((HttpServletRequest)getRequest(), "svNd");
     }
     param.put("nd", nd);
     try {
       resList = this.baseDao.queryForList("gmap-org.getCompanyList", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return resList;
   }
 
   public void saveOrgCompanyInfo(String fOrgCode, String fCoCode, String nd, List coList) throws SQLException
   {
     if ((coList != null) && (coList.size() > 0)) {
       Map param = new HashMap();
       param.put("fOrgCode", fOrgCode);
       param.put("fCoCode", fCoCode);
       param.put("nd", nd);
       param.put("list", coList);
       this.baseDao.update("gmap-org.deleteOrgCompanyInfoByCode", param);
       this.baseDao.update("gmap-org.updateOrgCompanyInfo", param);
     }
   }
 
   public void deleteOrgCompanyInfo(String fOrgCode, String fCoCode, String nd) throws SQLException
   {
     Map param = new HashMap();
     param.put("fOrgCode", fOrgCode);
     param.put("fCoCode", fCoCode);
     param.put("nd", nd);
     this.baseDao.update("gmap-org.deleteOrgCompanyInfoByCode", param);
   }
 
   public Map getPosiInfo(String posiCode) {
     Map resMap = null;
     if ((posiCode != null) && (posiCode.trim().length() != 0)) {
       Map param = new HashMap();
       param.put("posiCode", posiCode);
       try {
         List resList = this.baseDao.queryForList("gmap-org.getPosiInfoByCode", param);
         if ((resList != null) && (resList.size() > 0))
           resMap = (Map)resList.get(0);
       }
       catch (SQLException e) {
         e.printStackTrace();
       }
     }
     return resMap;
   }
 
   public Map getEmpInfo(String empCode) {
     Map resMap = null;
     if ((empCode != null) && (empCode.trim().length() != 0)) {
       Map param = new HashMap();
       param.put("empCode", empCode);
       try {
         List resList = this.baseDao.queryForList("gmap-org.getEmpInfoByCode", param);
         if ((resList != null) && (resList.size() > 0))
           resMap = (Map)resList.get(0);
       }
       catch (SQLException e) {
         e.printStackTrace();
       }
     }
     return resMap;
   }
 
   public List getCheckedNumPrivList() {
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-org.getNumLimCheckedType");
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return resList;
   }
 
   public void saveCheckedNumLimType(List typeList, Map param) throws SQLException {
     if (param == null) {
       param = new HashMap();
     }
     param.put("list", typeList);
     this.baseDao.update("gmap-org.clearCheckedNLType");
     this.baseDao.update("gmap-org.saveCheckedNLTypeList", param);
   }
 
   public void saveDefaultEmpPosiInfo(String empCode, String coCode, String orgCode) throws SQLException
   {
     Map param = new HashMap();
     param.put("coCode", coCode);
     param.put("orgCode", orgCode);
     param.put("empCode", empCode);
     param.put("posiCode", "-1");
     param.put("empPosiId", new Guid().toString().substring(2));
     String nd = SessionUtils.getAttribute((HttpServletRequest)getRequest(), "svNd");
     param.put("nd", (null == nd) || (nd.length() == 0) ? "2010" : nd);
     this.baseDao.insert("gmap-org.insertDefaultEmpPosiInfo", param);
   }
 
   public void saveEmpUserInfo(boolean isNew, Map param) throws SQLException {
     if (isNew) {
       this.baseDao.insert("gmap-org.insertEmpInfo", param);
       this.baseDao.insert("gmap-org.insertUserInfo", param);
     } else {
       this.baseDao.update("gmap-org.updateOrgInfo", param);
       this.baseDao.update("gmap-org.updateEmpInfo", param);
     }
   }
 
   public void saveEmpPosiInfo(List insertList, List deleteList) throws SQLException {
     if ((deleteList != null) && (deleteList.size() > 0)) {
       Iterator it = deleteList.iterator();
       while (it.hasNext()) {
         Map param = (Map)it.next();
         this.baseDao.delete("gmap-org.deleteEmpPosiInfo", param);
       }
     }
     if ((insertList != null) && (insertList.size() > 0)) {
       Iterator it = insertList.iterator();
       while (it.hasNext()) {
         Map param = (Map)it.next();
         param.put("empPosiId", new Guid().toString().substring(2));
         this.baseDao.insert("gmap-org.insertDefaultEmpPosiInfo", param);
       }
     }
   }
 
   public void deleteUser(String empCode, String userId, Map param, boolean isAll) throws SQLException {
     param.put("empCode", empCode);
     param.put("userId", userId);
     this.baseDao.delete("gmap-org.deleteEmpInfo", param);
     this.baseDao.delete("gmap-org.deleteUserInfo", param);
     if (isAll) {
       Map params = new HashMap();
       params.put("empCode", empCode);
       param.put("userId", userId);
       this.baseDao.delete("gmap-org.deleteEmpPosiInfo", params);
       this.baseDao.delete("gmap-org.deleteEmpPrivInfo", params);
       this.baseDao.delete("gmap-org.deleteUserGroupInfo", params);
     }
   }
 
   public void savePosiInfo(boolean isNew, String posiCode, String posiName) throws SQLException
   {
     Map param = new HashMap();
     param.put("posiCode", posiCode);
     param.put("posiName", posiName);
     if (isNew)
       this.baseDao.insert("gmap-org.insertPosiInfo", param);
     else
       this.baseDao.update("gmap-org.updatePosiInfo", param);
   }
 
   public void deletePosiInfo(String posiCode, boolean isAll) throws SQLException
   {
     Map param = new HashMap();
     param.put("posiCode", posiCode);
     this.baseDao.delete("gmap-org.deletePosiInfo", param);
     if (isAll) {
       this.baseDao.delete("gmap-org.deleteOrgPosiInfo", param);
       this.baseDao.delete("gmap-org.deleteEmpPosiInfo", param);
     }
   }
 }
 
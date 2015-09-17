 package com.anyi.admin.access;
 
 import com.anyi.gp.BusinessException;
 import com.anyi.gp.core.dao.BaseDao;
 import com.anyi.gp.pub.ServiceFacade;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 import javax.servlet.http.HttpServletRequest;
 import org.apache.log4j.Logger;
 
 public class AdminService
 {
   private static final Logger log = Logger.getLogger(AdminService.class);
   public static final String DEL_ROLE_FUNC_ID = "admin-editPage.deleteRoleFunc";
   public static final String DEL_ROLE_NUMLIM_ID = "admin-editPage.deleteRoleNumLim";
   public static final String DEL_ROLE_SUBNUMLIM_ID = "admin-editPage.deleteRoleSubLim";
   public static final String DEL_USER_FUNC_ID = "admin-editPage.deleteUserFunc";
   public static final String DEL_USER_GRANT_ID = "admin-editPage.deleteUserGrant";
   public static final String DEL_USER_NUM_LIM_ID = "admin-editPage.deleteUserNumLiim";
   public static final String DEL_USER_SESSION_ID = "admin-editPage.deleteUserSession";
   public static final String DEL_USER_SCHE_ID = "admin-editPage.deleteUserSche";
   public static final String DEL_USER_SUB_NUMLIM_ID = "admin-editPage.deleteUserSubNumLim";
   public static final String SEL_GROUP_PAGE = "admin-editPage.selectGroupPage";
   public static final String DEL_GROUP_PAGE = "admin-editPage.deleteGroupPage";
   public static final String DEL_GROUP_APMENU = "admin-editPage.deleteGroupApMenu";
   public static final String SEL_GROUP_APMENUCOMPO = "admin-editPage.deleteGroupApMenuCompo";
   private BaseDao dao;
   private ServiceFacade sf;
 
   public AdminService()
   {
   }
 
   public AdminService(BaseDao dao, ServiceFacade sf)
   {
     this.dao = dao;
     this.sf = sf;
   }
 
   public String deleteRole(String roleId, String data, String isdigest, HttpServletRequest servletRequest) throws BusinessException
   {
     Map params = new HashMap();
     params.put("roleId", roleId);
     String resStr = "";
     try {
       this.dao.delete("admin-editPage.deleteRoleFunc", params);
       this.dao.delete("admin-editPage.deleteRoleNumLim", params);
       this.dao.delete("admin-editPage.deleteRoleSubLim", params);
       resStr = this.sf.save(data, isdigest, servletRequest);
     }
     catch (SQLException e) {
       resStr = e.getMessage();
       throw new BusinessException(e);
     }
     return resStr;
   }
 
   public String deleteEmp(String userId, String data, String isdigest, HttpServletRequest servletRequest) throws BusinessException
   {
     Map params = new HashMap();
     params.put("userId", userId);
     String resStr = "";
     try {
       this.dao.delete("admin-editPage.deleteUserFunc", params);
       this.dao.delete("admin-editPage.deleteUserGrant", params);
       this.dao.delete("admin-editPage.deleteUserNumLiim", params);
       this.dao.delete("admin-editPage.deleteUserSession", params);
       this.dao.delete("admin-editPage.deleteUserSche", params);
       this.dao.delete("admin-editPage.deleteUserSubNumLim", params);
       resStr = this.sf.save(data, isdigest, servletRequest);
     }
     catch (SQLException e) {
       resStr = e.getMessage();
       throw new BusinessException(e);
     }
     return resStr;
   }
 
   public String deleteGroupRelation(String GroupId) {
     Map params = new HashMap();
     List pageId = null;
     String resStr = "";
     params.put("GroupId", GroupId);
     try {
       pageId = this.dao.queryForList("admin-editPage.selectGroupPage", params);
       for (int i = 0; i < pageId.size(); i++) {
         Map params1 = (Map)pageId.get(i);
         this.dao.delete("admin-editPage.deleteGroupPage", params1);
         this.dao.delete("admin-editPage.deleteGroupApMenuCompo", params1);
         this.dao.delete("admin-editPage.deleteGroupApMenu", params1);
       }
     } catch (Exception e) {
       resStr = e.getMessage();
     }
     return resStr;
   }
 }


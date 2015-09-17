 package com.ufgov.gmap.org.priv.service;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.tree.JNodeData;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.Iterator;
 import java.util.List;
 import java.util.Map;
 import java.util.Set;
 
 public abstract class AbstractPrivService extends AbstractHessianService
   implements PrivService
 {
   private static final long serialVersionUID = 6322057675977422187L;
   private static final String GET_GROUP_PAGES = "gmap-func-priv.getGroupPages";
   private static final String GET_USER_GROUP = "gmap-func-priv.getUserGroup";
 
   public List getGroupPages(String groupId)
   {
     Map param = new HashMap();
     param.put("groupId", groupId);
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-func-priv.getGroupPages", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return resList;
   }
 
   public List getUserGroup() {
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-func-priv.getUserGroup");
     } catch (SQLException e) {
       e.printStackTrace();
     }
     return resList;
   }
 
   protected void savePriv(String keyCode, String insertRuleId, String deleteRuleId, Map insertMap, Map deleteMap)
     throws SQLException
   {
     if ((keyCode == null) || (keyCode.trim().length() == 0)) {
       return;
     }
     if ((deleteMap != null) && (deleteMap.size() > 0)) {
       Iterator it = deleteMap.keySet().iterator();
       while (it.hasNext()) {
         String key = it.next().toString();
         List children = (List)deleteMap.get(key);
         Iterator childIt = children.iterator();
         while (childIt.hasNext()) {
           JNodeData nodeData = (JNodeData)childIt.next();
           Map param = new HashMap();
           param.put("funcId", nodeData.getCode());
           param.put("compoId", key);
           param.put("keyCode", keyCode);
           this.baseDao.delete(deleteRuleId, param);
         }
       }
     }
     if ((insertMap != null) && (insertMap.size() > 0)) {
       Iterator it = insertMap.keySet().iterator();
       while (it.hasNext()) {
         String key = it.next().toString();
         List children = (List)insertMap.get(key);
         Iterator childIt = children.iterator();
         while (childIt.hasNext()) {
           JNodeData nodeData = (JNodeData)childIt.next();
           Map param = new HashMap();
           param.put("funcId", nodeData.getCode());
           param.put("compoId", key);
           param.put("keyCode", keyCode);
           this.baseDao.insert(insertRuleId, param);
         }
       }
     }
   }
 }

 
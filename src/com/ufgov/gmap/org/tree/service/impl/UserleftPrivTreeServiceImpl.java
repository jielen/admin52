 package com.ufgov.gmap.org.tree.service.impl;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.tree.service.UserPrivTreeService;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 
 public class UserleftPrivTreeServiceImpl extends UserPrivTreeServiceImpl
   implements UserPrivTreeService
 {
   private static final long serialVersionUID = 1838942263770820044L;
   private static final String GET_USER_LEFT_PRIV_CHILDREN_BY_PARENT = "gmap-func-priv.getleftPrivTreeNodesByParent";
 
   public List getChildrenList(String parent, Map param)
   {
     if (param == null) {
       param = new HashMap();
     }
     param.put("parent", parent);
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-func-priv.getleftPrivTreeNodesByParent", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
 
     return formatNodeData(resList, parent);
   }
 }
 
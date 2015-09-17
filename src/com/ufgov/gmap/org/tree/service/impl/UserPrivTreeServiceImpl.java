 package com.ufgov.gmap.org.tree.service.impl;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.priv.service.AbstractHessianService;
 import com.ufgov.gmap.org.tree.JNodeData;
 import com.ufgov.gmap.org.tree.service.TreeService;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 
 public class UserPrivTreeServiceImpl extends AbstractHessianService
   implements TreeService
 {
   private static final long serialVersionUID = 2951395300213525527L;
   private static final String GET_USER_PRIV_CHILDREN_BY_PARENT = "gmap-func-priv.getUserPrivTreeNodesByParent";
   private static final String GET_TREE_ROOT = "gmap-priv.getTreeRootData";
 
   public List getChildrenList(String parent, Map param)
   {
     if (param == null) {
       param = new HashMap();
     }
     param.put("parent", parent);
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-func-priv.getUserPrivTreeNodesByParent", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
 
     return formatNodeData(resList, parent);
   }
 
   public JNodeData getRoot(Map param) {
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-priv.getTreeRootData", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
     resList = formatNodeData(resList, null);
     if ((resList != null) && (resList.size() > 0)) {
       return (JNodeData)resList.get(0);
     }
     return null;
   }
 }
 
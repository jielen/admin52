 package com.ufgov.gmap.org.tree.service.impl;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.priv.service.AbstractHessianService;
 import com.ufgov.gmap.org.tree.JNodeData;
 import com.ufgov.gmap.org.tree.service.PosiPrivLTreeService;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 
 public class PosiPrivLTreeServiceImpl extends AbstractHessianService
   implements PosiPrivLTreeService
 {
   private static final long serialVersionUID = -5931429545367523545L;
   private static final String GET_POSI_PRIV_LEFT_CHILDREN_BY_PARENT = "gmap-func-priv.getleftPosiPrivTreeNodesByParent";
 
   public List getChildrenList(String parent, Map param)
   {
     if (param == null) {
       param = new HashMap();
     }
     param.put("parent", parent);
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-func-priv.getleftPosiPrivTreeNodesByParent", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
 
     return formatNodeData(resList, parent);
   }
 
   public JNodeData getRoot(Map param) {
     return null;
   }
 }

 
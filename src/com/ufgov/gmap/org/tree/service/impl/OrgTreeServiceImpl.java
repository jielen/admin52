 package com.ufgov.gmap.org.tree.service.impl;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.priv.service.AbstractHessianService;
 import com.ufgov.gmap.org.tree.JNodeData;
 import com.ufgov.gmap.org.tree.service.SearchTreeService;
 import java.sql.SQLException;
 import java.util.ArrayList;
 import java.util.HashMap;
 import java.util.Iterator;
 import java.util.List;
 import java.util.Map;
 
 public class OrgTreeServiceImpl extends AbstractHessianService
   implements SearchTreeService
 {
   private static final long serialVersionUID = 741676694505928418L;
   private static final String GET_TREE_NODES_BY_PARENT = "gmap-org.getTreeNodesByParent";
 
   public List getChildrenList(String parent, Map param)
   {
     if (param == null) {
       param = new HashMap();
     }
     param.put("parent", parent);
     List resList = null;
     try {
       resList = this.baseDao.queryForList("gmap-org.getTreeNodesByParent", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
 
     return formatNodeData(resList, parent);
   }
 
   public JNodeData getRoot(Map param) {
     JNodeData root = new JNodeData();
     root.setCode(param.get("code").toString());
     root.setLeaf(false);
     root.setName("根节点");
     root.setParent(null);
     return root;
   }
 
   public Map getTreeDataByKeyword(String root, String keyword, Map param) {
     List children = getChildrenList(root, param);
     List findList = new ArrayList();
     Map resMap = new HashMap();
     Iterator it = children.iterator();
     while (it.hasNext()) {
       JNodeData node = (JNodeData)it.next();
       if ((node.getCode().indexOf(keyword) > -1) || (node.getName().indexOf(keyword) > -1)) {
         findList.add(node);
       }
       Map childTreeData = getTreeDataByKeyword(node.getCode(), keyword, param);
       if ((childTreeData != null) && (childTreeData.size() > 0)) {
         findList.add(node);
         resMap.putAll(childTreeData);
       }
     }
     if ((findList != null) && (findList.size() > 0)) {
       resMap.put(root, findList);
     }
     return resMap;
   }
 }
 
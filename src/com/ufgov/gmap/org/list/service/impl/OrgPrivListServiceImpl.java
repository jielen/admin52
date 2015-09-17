 package com.ufgov.gmap.org.list.service.impl;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.list.service.OrgPrivListService;
 import com.ufgov.gmap.org.priv.service.AbstractHessianService;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 
 public class OrgPrivListServiceImpl extends AbstractHessianService
   implements OrgPrivListService
 {
   private static final long serialVersionUID = 7582383104649635175L;
   private static final String GET_ORG_LEFT_PRIV = "gmap-value-priv.getOrgLeftPrivList";
   private static final String GET_ORG_RIGHT_PRIV = "gmap-value-priv.getOrgRightPrivList";
 
   public List getLeftObjectList(String nd, Map param)
   {
     List resList = null;
     try {
       if (param == null) {
         param = new HashMap();
       }
       param.put("nd", nd);
       resList = this.baseDao.queryForList("gmap-value-priv.getOrgLeftPrivList", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
 
     return formatListData(resList);
   }
 
   public List getRightObjectList(String nd, Map param) {
     List resList = null;
     try {
       if (param == null) {
         param = new HashMap();
       }
       param.put("nd", nd);
       resList = this.baseDao.queryForList("gmap-value-priv.getOrgRightPrivList", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
 
     return formatListData(resList);
   }
 }

 
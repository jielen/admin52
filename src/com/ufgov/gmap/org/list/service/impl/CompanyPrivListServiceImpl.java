 package com.ufgov.gmap.org.list.service.impl;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.list.service.CompanyPrivListService;
 import com.ufgov.gmap.org.priv.service.AbstractHessianService;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 
 public class CompanyPrivListServiceImpl extends AbstractHessianService
   implements CompanyPrivListService
 {
   private static final long serialVersionUID = -5938698698787543L;
   private static final String GET_COMPANY_LEFT_PRIV = "gmap-value-priv.getCompanyLeftPrivList";
   private static final String GET_COMPANY_RIGHT_PRIV = "gmap-value-priv.getCompanyRightPrivList";
 
   public List getLeftObjectList(String nd, Map param)
   {
     List resList = null;
     try {
       if (param == null) {
         param = new HashMap();
       }
       param.put("nd", nd);
       resList = this.baseDao.queryForList("gmap-value-priv.getCompanyLeftPrivList", param);
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
       resList = this.baseDao.queryForList("gmap-value-priv.getCompanyRightPrivList", param);
     } catch (SQLException e) {
       e.printStackTrace();
     }
 
     return formatListData(resList);
   }
 }

 
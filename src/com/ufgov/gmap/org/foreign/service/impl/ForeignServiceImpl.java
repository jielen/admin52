 package com.ufgov.gmap.org.foreign.service.impl;
 
 import com.anyi.gp.core.dao.BaseDao;
 import com.ufgov.gmap.org.foreign.service.ForeignService;
 import com.ufgov.gmap.org.priv.service.AbstractHessianService;
 import java.sql.SQLException;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 
 public class ForeignServiceImpl extends AbstractHessianService
   implements ForeignService
 {
   private static final long serialVersionUID = 1L;
 
   public List getForeignData(String sqlId, Map param)
   {
     List resList = null;
     if ((sqlId != null) && (sqlId.trim().length() != 0)) {
       if (param == null)
         param = new HashMap();
       try
       {
         resList = this.baseDao.queryForList(sqlId, param);
       } catch (SQLException e) {
         e.printStackTrace();
       }
     }
     return resList;
   }
 }
 
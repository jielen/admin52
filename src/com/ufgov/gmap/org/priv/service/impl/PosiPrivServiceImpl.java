 package com.ufgov.gmap.org.priv.service.impl;
 
 import com.ufgov.gmap.org.priv.service.AbstractPrivService;
 import com.ufgov.gmap.org.priv.service.PosiPrivService;
 import java.sql.SQLException;
 import java.util.Map;
 
 public class PosiPrivServiceImpl extends AbstractPrivService
   implements PosiPrivService
 {
   private static final long serialVersionUID = -6333039110405699799L;
   private static final String INSERT_POSI_PRIV = "gmap-func-priv.insertPosiFunc";
   private static final String DELETE_POSI_PRIV = "gmap-func-priv.deletePosiFunc";
 
   public void savePosiPriv(String rolePosiCode, Map insertMap, Map deleteMap)
     throws SQLException
   {
     savePriv(rolePosiCode, "gmap-func-priv.insertPosiFunc", "gmap-func-priv.deletePosiFunc", insertMap, deleteMap);
   }
 }

 
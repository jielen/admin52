 package com.ufgov.gmap.org.priv.service.impl;
 
 import com.ufgov.gmap.org.priv.service.AbstractPrivService;
 import com.ufgov.gmap.org.priv.service.UserPrivService;
 import java.sql.SQLException;
 import java.util.Map;
 
 public class UserPrivServiceImpl extends AbstractPrivService
   implements UserPrivService
 {
   private static final long serialVersionUID = -4714497975836480158L;
   private static final String INSERT_USER_FUNC = "gmap-func-priv.insertUserFunc";
   private static final String DELETE_USER_FUNC = "gmap-func-priv.deleteUserFunc";
 
   public void saveUserPriv(String userId, Map insertMap, Map deleteMap)
     throws SQLException
   {
     savePriv(userId, "gmap-func-priv.insertUserFunc", "gmap-func-priv.deleteUserFunc", insertMap, deleteMap);
   }
 }

 
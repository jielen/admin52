 package com.ufgov.gmap.org.list;
 
 import java.io.Serializable;
 import java.util.Map;
 
 public class JListData
   implements Serializable
 {
   private static final long serialVersionUID = -85547598098698232L;
   private Map expandMap;
 
   public void setExpandMap(Map expandMap)
   {
     this.expandMap = expandMap;
   }
 
   public Object getAttribute(String key) {
     if (this.expandMap != null) {
       return this.expandMap.get(key);
     }
     return null;
   }
 
   public String toString()
   {
     return this.expandMap.get("NAME").toString();
   }
 }

 
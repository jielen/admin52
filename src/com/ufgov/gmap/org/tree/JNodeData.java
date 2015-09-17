 package com.ufgov.gmap.org.tree;
 
 import java.io.Serializable;
 import java.util.Map;
 
 public class JNodeData
   implements Serializable
 {
   private static final long serialVersionUID = -8554759895897743505L;
   private String code;
   private String name;
   private String parent;
   private boolean isLeaf;
   private Map expandMap;
 
   public String getCode()
   {
     return this.code;
   }
 
   public void setCode(String code) {
     this.code = code;
   }
 
   public String getName() {
     return this.name;
   }
 
   public void setName(String name) {
     this.name = name;
   }
 
   public String getParent() {
     return this.parent;
   }
 
   public void setParent(String parent) {
     this.parent = parent;
   }
 
   public boolean isLeaf() {
     return this.isLeaf;
   }
 
   public void setLeaf(boolean isLeaf) {
     this.isLeaf = isLeaf;
   }
 
   public void setExpandMap(Map expandMap) {
     this.expandMap = expandMap;
   }
 
   public Object getAttribute(String key) {
     if (this.expandMap != null) {
       return this.expandMap.get(key);
     }
     return null;
   }
 
   public void setAttribute(String key, Object value) {
     if (key != null)
       this.expandMap.put(key, value);
   }
 }

 
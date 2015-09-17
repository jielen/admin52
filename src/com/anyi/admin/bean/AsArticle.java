 package com.anyi.admin.bean;
 
 import java.util.Date;
 
 public class AsArticle
 {
   private String id;
   private String title;
   private String creator;
   private Date pubtime;
   private String type;
   private String attatch;
   private String attatch_blobid;
   private String portletid;
   private String content;
 
   public String getAttatch()
   {
     return this.attatch;
   }
 
   public void setAttatch(String attatch) {
     this.attatch = attatch;
   }
 
   public String getAttatch_blobid() {
     return this.attatch_blobid;
   }
 
   public void setAttatch_blobid(String attatch_blobid) {
     this.attatch_blobid = attatch_blobid;
   }
 
   public String getContent() {
     return this.content;
   }
 
   public void setContent(String content) {
     this.content = content;
   }
 
   public String getCreator() {
     return this.creator;
   }
 
   public void setCreator(String creator) {
     this.creator = creator;
   }
 
   public String getId() {
     return this.id;
   }
 
   public void setId(String id) {
     this.id = id;
   }
 
   public String getPortletid() {
     return this.portletid;
   }
 
   public void setPortletid(String portletid) {
     this.portletid = portletid;
   }
 
   public Date getPubtime() {
     return this.pubtime;
   }
 
   public void setPubtime(Date pubtime) {
     this.pubtime = pubtime;
   }
 
   public String getTitle() {
     return this.title;
   }
 
   public void setTitle(String title) {
     this.title = title;
   }
 
   public String getType() {
     return this.type;
   }
 
   public void setType(String type) {
     this.type = type;
   }
 }

 
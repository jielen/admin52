 package com.anyi.admin.action;
 
 import com.anyi.admin.access.ArticleService;
 import com.anyi.admin.bean.AsArticle;
 import com.anyi.gp.util.StringTools;
 import com.opensymphony.webwork.ServletActionContext;
 import com.opensymphony.xwork.ActionSupport;
 import javax.servlet.http.HttpServletRequest;
 
 public class SaveArticleAction extends ActionSupport
 {
   private static final long serialVersionUID = -2315222140075034930L;
   private String id;
   private String title;
   private String creator;
   private String pubtime;
   private String type;
   private String attatch;
   private String attatch_blobid;
   private String portletid;
   private String content;
   private ArticleService articleService;
 
   public ArticleService getArticleService()
   {
     return this.articleService;
   }
 
   public void setArticleService(ArticleService articleService) {
     this.articleService = articleService;
   }
 
   public String getAttatch() {
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
 
   public String getPubtime() {
     return this.pubtime;
   }
 
   public void setPubtime(String pubtime) {
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
 
   public String execute() throws Exception {
     HttpServletRequest request = ServletActionContext.getRequest();
     String dataStr = "";
     try {
       AsArticle article = new AsArticle();
       article.setId(this.id);
       if (this.title != null) article.setTitle(this.title);
       if (this.content != null) {
         article.setContent(this.content);
       }
       if (this.creator != null) article.setCreator(this.creator);
       if (this.pubtime != null) article.setPubtime(StringTools.toDate(this.pubtime));
       if (this.type != null) article.setType(this.type);
       if (this.attatch != null) article.setAttatch(this.attatch);
       if (this.attatch_blobid != null) article.setAttatch_blobid(this.attatch_blobid);
       if (this.portletid != null) article.setPortletid(this.portletid);
       getArticleService().saveArticle(article);
       dataStr = "保存成功！";
     } catch (Exception ex) {
       dataStr = ex.getMessage();
     }
     request.setAttribute("result", dataStr);
     return "success";
   }
 }
 
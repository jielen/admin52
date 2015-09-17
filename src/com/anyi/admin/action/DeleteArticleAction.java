 package com.anyi.admin.action;
 
 import com.anyi.admin.access.ArticleService;
 import com.anyi.gp.core.action.AjaxAction;
 
 public class DeleteArticleAction extends AjaxAction
 {
   private static final long serialVersionUID = 1386005575676105269L;
   private String id;
   private ArticleService articleService;
 
   public ArticleService getArticleService()
   {
     return this.articleService;
   }
 
   public void setArticleService(ArticleService articleService) {
     this.articleService = articleService;
   }
 
   public String getId() {
     return this.id;
   }
 
   public void setId(String id) {
     this.id = id;
   }
 
   public String doExecute() throws Exception {
     String dataStr = "";
     String flag = "false";
     try {
       this.articleService.deleteArticle(this.id);
       flag = "true";
       dataStr = "删除成功！";
     } catch (Exception ex) {
       dataStr = ex.getMessage();
     }
     this.resultstring = wrapResultStr(flag, dataStr);
     return "success";
   }
 }

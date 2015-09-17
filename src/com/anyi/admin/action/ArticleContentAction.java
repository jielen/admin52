 package com.anyi.admin.action;
 
 import com.anyi.admin.access.ArticleService;
 import com.anyi.admin.bean.AsArticle;
 import com.anyi.gp.core.action.AjaxAction;
 
 public class ArticleContentAction extends AjaxAction
 {
   private static final long serialVersionUID = 8939074979913826522L;
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
     AsArticle article = null;
     try {
       article = getArticleService().selectArticleById(this.id);
       if (article == null)
         dataStr = "";
       else {
         dataStr = article.getContent();
       }
       flag = "true";
     } catch (Exception ex) {
       dataStr = ex.getMessage();
     }
     this.resultstring = wrapResultStr(flag, dataStr);
     return "success";
   }
 }

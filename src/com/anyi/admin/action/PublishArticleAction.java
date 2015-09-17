 package com.anyi.admin.action;
 
 import com.anyi.admin.access.ArticleService;
 import com.anyi.gp.core.action.AjaxAction;
 import com.opensymphony.webwork.ServletActionContext;
 import javax.servlet.http.HttpServletRequest;
 
 public class PublishArticleAction extends AjaxAction
 {
   private static final long serialVersionUID = 1L;
   private ArticleService articleService;
 
   public ArticleService getArticleService()
   {
     return this.articleService;
   }
 
   public void setArticleService(ArticleService articleService) {
     this.articleService = articleService;
   }
 
   public String doExecute() throws Exception {
     HttpServletRequest request = ServletActionContext.getRequest();
     String dataStr = "";
     String flag = "";
     String addPortlet = (String)request.getAttribute("addPortlet");
     String delPortlet = (String)request.getAttribute("delPortlet");
     String articleId = (String)request.getAttribute("articleId");
     try {
       getArticleService().publishArticle(addPortlet, delPortlet, articleId);
       flag = "true";
       dataStr = "保存成功！";
     } catch (Exception ex) {
       flag = "false";
       dataStr = ex.getMessage();
     }
     this.resultstring = wrapResultStr(flag, dataStr);
     return "success";
   }
 }
 
 package com.anyi.admin.access;
 
 import com.anyi.admin.bean.ApArticlePortlet;
 import com.anyi.admin.bean.AsArticle;
 import com.anyi.gp.core.dao.BaseDao;
 import java.util.HashMap;
 import java.util.List;
 import java.util.Map;
 import org.apache.log4j.Logger;
 
 public class ArticleService
 {
   private final Logger log = Logger.getLogger(ArticleService.class);
   private static final String SQL_INSERT_ARTICLE = "admin-editPage.insertAsArticle";
   private static final String SQL_UPDATE_ARTICLE = "admin-editPage.updateAsArticle";
   private static final String SQL_DELETE_ARTICLE = "admin-editPage.deleteAsArticle";
   private static final String SQL_SELECT_ARTICLE = "admin-editPage.selectAsArticle";
   private static final String SQL_DELETE_ARTICLE_PORTLET = "admin-editPage.deleteArticlePortlet";
   private static final String SQL_INSERT_ARTICLE_PORTLET = "admin-editPage.insertArticlePortlet";
   private static final String SQL_SELECT_ARTICLE_PORTLET = "admin-editPage.selectArticlePortlet";
   private BaseDao baseDao;
 
   public BaseDao getBaseDao()
   {
     return this.baseDao;
   }
 
   public void setBaseDao(BaseDao baseDao) {
     this.baseDao = baseDao;
   }
 
   public void saveArticle(AsArticle article) {
     try {
       String id = article.getId();
       List isExist = this.baseDao.queryForList("admin-editPage.selectAsArticle", id);
       if ((isExist != null) && (isExist.size() > 0)) {
         AsArticle art = (AsArticle)isExist.get(0);
         if (article.getAttatch() != null) art.setAttatch(article.getAttatch());
         if (article.getAttatch_blobid() != null) art.setAttatch_blobid(article.getAttatch_blobid());
         if (article.getContent() != null) art.setContent(article.getContent());
         if (article.getCreator() != null) art.setCreator(article.getCreator());
         if (article.getPortletid() != null) art.setPortletid(article.getPortletid());
         if (article.getPubtime() != null) art.setPubtime(article.getPubtime());
         if (article.getTitle() != null) art.setTitle(article.getTitle());
         if (article.getType() != null) art.setType(article.getType());
         this.baseDao.update("admin-editPage.updateAsArticle", art);
       } else {
         this.baseDao.insert("admin-editPage.insertAsArticle", article);
       }
     } catch (Exception e) {
       this.log.error(e);
       throw new RuntimeException(e);
     }
   }
 
   public void deleteArticle(String id) {
     try {
       List isExist = this.baseDao.queryForList("admin-editPage.selectAsArticle", id);
       if ((isExist != null) && (isExist.size() > 0)) {
         this.baseDao.delete("admin-editPage.deleteAsArticle", id);
       }
       Map map = new HashMap();
       map.put("ARTICLEID", id);
       List apArticlePortlet = this.baseDao.queryForList("admin-editPage.selectArticlePortlet", map);
       if ((apArticlePortlet != null) && (apArticlePortlet.size() > 0))
         for (int i = 0; i < apArticlePortlet.size(); i++) {
           ApArticlePortlet arp = (ApArticlePortlet)apArticlePortlet.get(i);
           this.baseDao.delete("admin-editPage.deleteArticlePortlet", arp);
         }
     }
     catch (Exception e) {
       this.log.error(e);
       throw new RuntimeException(e);
     }
   }
 
   public AsArticle selectArticleById(String id) {
     AsArticle article = null;
     try {
       List list = this.baseDao.queryForList("admin-editPage.selectAsArticle", id);
       if ((list != null) && (list.size() > 0))
         article = (AsArticle)list.get(0);
     }
     catch (Exception e) {
       this.log.error(e);
       throw new RuntimeException(e);
     }
     return article;
   }
 
   public void publishArticle(String addPortlet, String delPortlet, String articleId) {
     if (addPortlet.length() > 0) {
       if (addPortlet.indexOf(",") > 0) {
         String[] portletId = addPortlet.split(",");
         for (int i = 0; i < portletId.length; i++) {
           ApArticlePortlet art = new ApArticlePortlet();
           art.setArticleId(articleId);
           art.setPortletId(portletId[i]);
           art.setPortletType("01");
           try {
             this.baseDao.insert("admin-editPage.insertArticlePortlet", art);
           } catch (Exception e) {
             this.log.error(e);
             throw new RuntimeException(e);
           }
         }
       } else {
         ApArticlePortlet art = new ApArticlePortlet();
         art.setArticleId(articleId);
         art.setPortletId(addPortlet);
         art.setPortletType("01");
         try {
           this.baseDao.insert("admin-editPage.insertArticlePortlet", art);
         } catch (Exception e) {
           this.log.error(e);
           throw new RuntimeException(e);
         }
       }
     }
     if (delPortlet.length() > 0)
       if (delPortlet.indexOf(",") > 0) {
         String[] portletId = delPortlet.split(",");
         for (int i = 0; i < portletId.length; i++) {
           ApArticlePortlet art = new ApArticlePortlet();
           art.setArticleId(articleId);
           art.setPortletId(portletId[i]);
           try {
             this.baseDao.delete("admin-editPage.deleteArticlePortlet", art);
           } catch (Exception e) {
             this.log.error(e);
             throw new RuntimeException(e);
           }
         }
       } else {
         ApArticlePortlet art = new ApArticlePortlet();
         art.setArticleId(articleId);
         art.setPortletId(delPortlet);
         try {
           this.baseDao.delete("admin-editPage.deleteArticlePortlet", art);
         } catch (Exception e) {
           this.log.error(e);
           throw new RuntimeException(e);
         }
       }
   }
 }


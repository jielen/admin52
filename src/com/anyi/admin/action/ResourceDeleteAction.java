 package com.anyi.admin.action;
 
 import com.anyi.gp.access.FileService;
 import com.anyi.gp.core.action.AjaxAction;
 import com.anyi.gp.core.bean.AsFile;
 import org.apache.log4j.Logger;
 
 public class ResourceDeleteAction extends AjaxAction
 {
   private static final Logger log = Logger.getLogger(ResourceDeleteAction.class);
   private static final long serialVersionUID = 6154973269813444328L;
   private String fileid;
   private FileService service;
 
   public FileService getService()
   {
     return this.service;
   }
 
   public void setService(FileService service) {
     this.service = service;
   }
 
   public String getFileid() {
     return this.fileid;
   }
 
   public void setFileid(String fileid) {
     this.fileid = fileid;
   }
 
   public String doExecute()
   {
     String dataStr = "";
     String flag = "false";
     try {
       AsFile file = new AsFile();
       file.setFileId(this.fileid);
       this.service.deleteResource(file);
       flag = "true";
       dataStr = "删除成功！";
     } catch (Exception e) {
       log.error(e);
       dataStr = e.getMessage();
     }
     this.resultstring = wrapResultStr(flag, dataStr);
     return "success";
   }
 }
 
 package com.anyi.admin.integrate.gocom;
 
 import com.anyi.admin.integrate.gocom.service.GoComCommonService;
 import com.anyi.gp.context.ApplusContext;
 import java.util.GregorianCalendar;
 import org.apache.commons.logging.Log;
 import org.apache.commons.logging.LogFactory;
 import org.quartz.Job;
 import org.quartz.JobExecutionContext;
 import org.quartz.JobExecutionException;
 
 public class SynEmpToGocom
   implements Job
 {
   private static Log _log = LogFactory.getLog(SynEmpToGocom.class);
   private GoComCommonService gocomService;
 
   public void execute(JobExecutionContext context)
     throws JobExecutionException
   {
     if (null == this.gocomService) {
       init();
     }
     GregorianCalendar g = new GregorianCalendar();
     int year = g.get(1);
 
     this.gocomService.orgTreeSynchronizeToGoCom(String.valueOf(year));
     this.gocomService.importEmpList(String.valueOf(year));
   }
 
   public GoComCommonService getGocomService() {
     return this.gocomService;
   }
 
   public void setGocomService(GoComCommonService gocomService) {
     this.gocomService = gocomService;
   }
 
   private void init() {
     this.gocomService = ((GoComCommonService)ApplusContext.getBean("goComCommonService"));
   }
 }
 
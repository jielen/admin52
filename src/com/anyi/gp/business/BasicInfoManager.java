 package com.anyi.gp.business;
 
 import com.anyi.gp.context.ApplusContext;
 import com.anyi.gp.util.XMLTools;
 import java.io.InputStream;
 import java.util.ArrayList;
 import java.util.Iterator;
 import java.util.List;
 import javax.servlet.ServletContext;
 import javax.xml.transform.TransformerException;
 import org.apache.log4j.Logger;
 import org.apache.xpath.XPathAPI;
 import org.w3c.dom.Document;
 import org.w3c.dom.Node;
 import org.w3c.dom.NodeList;
 
 public class BasicInfoManager
 {
   private static final Logger log = Logger.getLogger(BasicInfoManager.class);
   private static final String BUSI_CONF = "busi-conf.xml";
   private List generalHandlerList = new ArrayList();
 
   private List procHandlerList = new ArrayList();
 
   private List otherHandlerList = new ArrayList();
 
   public BasicInfoManager() {
     init();
   }
 
   private void init() {
     Document doc = getDoc("busi-conf.xml");
     if (doc == null) {
       throw new RuntimeException("\n基础资料配置文件没有发现; file: busi-conf.xml");
     }
     Node node = null;
     try {
       node = XPathAPI.selectSingleNode(doc.getDocumentElement(), "conf-files");
     } catch (TransformerException e) {
       throw new RuntimeException(e);
     }
     if (node == null) {
       throw new RuntimeException("\n基础资料配置文件中没有发现结点: conf-files.");
     }
 
     XMLTools.trimChildNodes(node);
     int i = 0; for (int len = node.getChildNodes().getLength(); i < len; i++) {
       Node child = node.getChildNodes().item(i);
       String temp = XMLTools.getNodeAttr(child, "file");
       if ((temp != null) && (temp.length() > 0)) {
         this.generalHandlerList.add(temp);
       } else {
         temp = XMLTools.getNodeAttr(child, "procedure");
         if ((temp != null) && (temp.length() > 0)) {
           this.procHandlerList.add(temp);
         } else {
           temp = XMLTools.getNodeAttr(child, "handler");
           if ((temp != null) && (temp.length() > 0))
             this.otherHandlerList.add(temp);
         }
       }
     }
   }
 
   public synchronized void carryForward(int fromYear, int toYear)
   {
     if (!this.generalHandlerList.isEmpty()) {
       IBasicInfoHandler handler = new BasicInfoGenericHandler(this.generalHandlerList);
       handler.carryForward(fromYear, toYear);
     }
     if (!this.procHandlerList.isEmpty()) {
       IBasicInfoHandler handler = new BasicInfoProcHandler(this.procHandlerList);
       handler.carryForward(fromYear, toYear);
     }
     Iterator iter;
     if (!this.otherHandlerList.isEmpty())
       for (iter = this.otherHandlerList.iterator(); iter.hasNext(); ) {
         String handlerName = (String)iter.next();
         try {
           IBasicInfoHandler handler = (IBasicInfoHandler)Class.forName(handlerName).newInstance();
           handler.carryForward(fromYear, toYear);
         } catch (InstantiationException e) {
           log.error(e);
           throw new RuntimeException(e);
         } catch (IllegalAccessException e) {
           log.error(e);
           throw new RuntimeException(e);
         } catch (ClassNotFoundException e) {
           log.error(e);
           throw new RuntimeException(e);
         }
       }
   }
 
   public static Document getDoc(String conf)
   {
     InputStream in = getResourceByContext(conf);
     if (in == null)
       return null;
     return XMLTools.inputStreamToDocument(in);
   }
 
   public static InputStream getResourceByContext(String path) {
     ServletContext context = ApplusContext.getServletContext();
     InputStream in = context.getResourceAsStream(path);
     if (in == null) {
       String msg = "\nNot found \"" + path + "\";";
       log.error(msg);
     }
     return in;
   }
 }

 
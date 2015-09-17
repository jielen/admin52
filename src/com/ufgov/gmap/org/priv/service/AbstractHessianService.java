 package com.ufgov.gmap.org.priv.service;
 
 import com.anyi.gp.context.ApplusContext;
 import com.anyi.gp.core.dao.BaseDao;
 import com.caucho.hessian.server.HessianServlet;
 import com.ufgov.gmap.org.list.JListData;
 import com.ufgov.gmap.org.tree.JNodeData;
 import java.io.IOException;
 import java.util.ArrayList;
 import java.util.Iterator;
 import java.util.List;
 import java.util.Map;
 import javax.servlet.ServletException;
 import javax.servlet.ServletRequest;
 import javax.servlet.ServletResponse;
 import org.apache.log4j.Logger;
 
 public abstract class AbstractHessianService extends HessianServlet
 {
   protected static Logger logger = Logger.getLogger(AbstractHessianService.class);
   private static final long serialVersionUID = -2175510996959719400L;
   protected BaseDao baseDao;
   private ServletRequest request;
   private ServletResponse response;
 
   public AbstractHessianService()
   {
     this.baseDao = ((BaseDao)ApplusContext.getBean("baseDao"));
   }
 
   public AbstractHessianService(BaseDao baseDao) {
     this.baseDao = baseDao;
   }
 
   public void service(ServletRequest request, ServletResponse response) throws IOException, ServletException
   {
     this.request = request;
     this.response = response;
     super.service(request, response);
   }
 
   protected List formatNodeData(List source, String parent)
   {
     List children = new ArrayList();
     if ((source != null) && (source.size() > 0)) {
       Iterator it = source.iterator();
       while (it.hasNext()) {
         Map temp = (Map)it.next();
         JNodeData node = new JNodeData();
         node.setCode(temp.get("CODE").toString());
         node.setName((String)temp.get("NAME"));
         node.setParent(parent);
         node.setExpandMap(temp);
         children.add(node);
       }
     }
     return children;
   }
 
   public ServletRequest getRequest() {
     return this.request;
   }
 
   public ServletResponse getResponse() {
     return this.response;
   }
 
   protected List formatListData(List source) {
     List children = new ArrayList();
     if ((source != null) && (source.size() > 0)) {
       Iterator it = source.iterator();
       while (it.hasNext()) {
         Map temp = (Map)it.next();
         JListData list = new JListData();
         list.setExpandMap(temp);
         children.add(list);
       }
     }
     return children;
   }
 }


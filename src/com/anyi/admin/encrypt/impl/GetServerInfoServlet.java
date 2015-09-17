 package com.anyi.admin.encrypt.impl;
 
 import com.anyi.gp.license.RegisterTools;
 import java.io.IOException;
 import java.io.PrintWriter;
 import javax.servlet.ServletException;
 import javax.servlet.http.HttpServlet;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;
 import org.json.JSONObject;
 
 public class GetServerInfoServlet extends HttpServlet
 {
   protected void doGet(HttpServletRequest req, HttpServletResponse resp)
     throws ServletException, IOException
   {
     resp.setContentType("text;charset=gb2312");
     PrintWriter out = resp.getWriter();
//     out.print(RegisterTools.getServerInfo().toString());
     out.flush();
   }
 }

 
<%@ page contentType="text/html; charset=GBK" %>
<%@page import="com.anyi.gp.bean.About" %>

<html>
<head>
<jsp:useBean id="aboutID" scope="page" class="com.anyi.gp.bean.About" />
<LINK href="script/applus.css" rel="stylesheet" type="text/css">

<%

   aboutID.init();

%>

<title>用友GRP版本说明 </title>
</head>
<body  leftMargin="0" rightMargin="0" topMargin="0" background="img/main/aboutbkg.jpg" style="overflow:hidden;">
<table>
   <tr>
       <td><img src="/style/img/logo/logo.gif" style="POSITION:absolute;left:30;top:10; font-size:14;"></td>
   </tr>
   <tr>
       <td width="400" style="POSITION:absolute;left:80;top:60;">产品列表：<br>&nbsp;</br>
          <div style="POSITION:absolute;left:30;top:30;height=220;width=380;overflow:auto;">
             <table  width="100%" border=1 cellpadding=2 cellspacing=0 style="font-size:14;">
               <tr align="center">
                 <th>产品名称</th>
                 <th >产品线</th>
                 <th>版本号</th>
               </tr>
  <%
               for(int i=0;i<aboutID.getProductsNum();i++ ){
  %>
               <tr  align="left">
                  <td width="180"><%=aboutID.getValue(i,0)%></td>
                  <td width="180"><%=aboutID.getValue(i,1)%></td>
                  <td width="80"><%=aboutID.getValue(i,2)%></td>
               </tr>
  <%
   }
  %>
             </table>
         </div>
        </td>
   </tr>
   <tr>
      <td colspan="2">
        <table>
           <tr>
              <td style="POSITION:absolute;left:20;top:350;overflow:auto;font-size:12;">
                 <%=aboutID.getRightCN()%><br>&nbsp;</br>
                <%=aboutID.getRightEN()%>
              </td>
           </tr>
           <tr>
              <td> <img src="/style/img/main/global_ok.gif" style="POSITION:absolute;top:360;right:80px;cursor:hand" onclick="closemywin();"></td>
           </tr>
         </table>
      </td>
   </tr>
</table>
 <script>

  function closemywin(){
    close();
  }


 </script>
</body>
</html>

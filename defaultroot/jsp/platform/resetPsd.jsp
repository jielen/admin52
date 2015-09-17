<!-- $Id: resetPsd.jsp,v 1.3 2008/06/23 12:16:01 liubo Exp $ -->
<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>
<%@ page import="com.anyi.gp.pub.LangResource"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%
LangResource Lang = LangResource.getInstance();
String errorInfo = (String)request.getAttribute("ERRORINFO");
String userId = (String)request.getAttribute("USERID");
%>

<html>
<head>
<title>密码重置</title>
<LINK href="script/applus.css" rel="stylesheet" type="text/css">
<SCRIPT language="javascript" src="script/page.js"></SCRIPT>
<SCRIPT language="javascript" src="script/foreign.js"></SCRIPT>
<SCRIPT language="javascript" src="script/grid.js"></SCRIPT>
<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
<SCRIPT language="javascript" src="script/PageData.js"></SCRIPT>
<SCRIPT language="javascript" src="script/GFunctions.js"></SCRIPT>
<LINK href="script/applus.css" rel=stylesheet type=text/css>
</head>

<body onmouseup="mouseup()" leftMargin="5"
rightMargin="5" topMargin="0" background="/style/img/main/passbkg.jpg" class="pageBody" nowrap>
<form name="ASUSER" method="post" action="savePassword.action">
<input type="hidden" name="userId" value="<%=userId%>">
<input type="hidden" name="oldPassword" value="">
<input type="hidden" name="ISRESET" value="y">

  <table  border="0" cellspacing="0" cellpadding="0" align="center">
    <tr>
      <td ><img src="/style/img/logo/logo.gif" style="POSITION:absolute;left:10;top:5; font-size:14;"></td>
    </tr>
    <tr class="td">
      <td  style="POSITION:absolute;left:135;top:100;"  class="normalFieldCaption"><%=Lang.getLang("NEW_PASSWD")%></td>
      <td  style="POSITION:absolute;left:180;top:100;" class="td">
        <input type="password" class="normalFieldEditMain" name="newPassword">
      </td>
    </tr>
    <tr class="td">
      <td style="POSITION:absolute;left:100;top:160;"  class="normalFieldCaption"><%=Lang.getLang("CONFIRM_PASSWD")%></td>
      <td style="POSITION:absolute;left:180;top:160;" class="td">
        <input type="password" class="normalFieldEditMain" name="confirmPassword">
      </td>
    </tr>
    <tr>
      <td name="Submit" id="SubmitID" class="clsListCall"><img style="POSITION:absolute;top:260;left:120px;cursor:hand" src="/style/img/main/global_ok.gif" onClick="return checkPass()">
      </td>
      <td name="Cancel" id="CancelID" class="clsListCall" style="POSITION:absolute;top:260;right:120px;cursor:hand" onMouseOver="call_mouseOver()" onMouseOut="call_mouseOut()"> <img src="/style/img/main/global_cancel.gif" onClick="javascript:window.close()">
      </td>
    </tr>
  </table>
</form>
</body>
<script>
function checkPass() {
      var rtnflag=checkData();
      if (rtnflag){
         ASUSER.submit();
        }
   }


/**
 *
 * @return
 */
function checkData(){
      var pass = document.ASUSER.confirmPassword.value;
      if(document.ASUSER.newPassword.value!= document.ASUSER.confirmPassword.value){
            alert("两次口令不一致");
            document.ASUSER.newPassword.value="";
            document.ASUSER.confirmPassword.value="";
            return false;
      }else{
          if (document.ASUSER.newPassword.value.length<8 && document.ASUSER.newPassword.value.length!=0){
             alert("请重新输入密码，密码长度不能小于8位");
             document.ASUSER.newPassword.value="";
             document.ASUSER.confirmPassword.value="";
             return false;
          }else{
              var res = examSamepsd(pass);
              var resu = examDegreepsd(pass);
              var resul = reverpsd(pass);
              if (res || resu || resul){
              	 alert("您输入的密码过于简单，请重新输入密码"+"\r\n"+"\r\n"+"注：请不要使用相同或顺序的字符做密码");
                 document.ASUSER.newPassword.value="";
                 document.ASUSER.confirmPassword.value="";
              	 return false;
              }
              return true;
          }
      }
}

/**
*检查密码是否由相同字符组成，如果相同，返回true。wtm，20041223
*/
function examSamepsd(pass){
   var result = true;
   var flag = 1;
   var leng = pass.length;
   for (var i=1; i < leng; i++){
       if (pass.charAt(0)==pass.charAt(i))
         flag++;
   }
   if (flag != leng){
       result = false;
   }
   return result;
}

/**
*检查密码是否递增字符组成，如果顺序增加，返回true。wtm。20041223
*/
function examDegreepsd(pass){
   var diff = 1;
   var leng = pass.length;
   var first = pass.charCodeAt(0);
   var result = true;
   if(leng == 0) result = false;
   for (var i=1;i<leng;i++){
   	diff = pass.charCodeAt(i)- first;
   	if (diff !=1){
   	   result = false;
   	   break;
   	}else{
   	  first = pass.charCodeAt(i);
   	  continue;
   	}
   }
   return result;
}

/**
*密码递减检查,如果顺序递减，返回true。wtm。20041223
*/
function reverpsd(pass){
   var diff = 1;
   var leng = pass.length;
   var first = pass.charCodeAt(0);
   var result = true;
   if(leng == 0) result = false;
   for (var i=1;i<leng;i++){
   	diff = first - pass.charCodeAt(i);
   	if (diff !=1){
   	   result = false;
   	   break;
   	}else{
   	  first = pass.charCodeAt(i);
   	  continue;
   	}
   }
   return result;
}
</script>
</html>
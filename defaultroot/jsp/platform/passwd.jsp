<!-- $Id: passwd.jsp,v 1.4.2.1 2010/04/13 01:02:56 zhuangkun Exp $ -->
<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>

<%@ page import="com.anyi.gp.pub.LangResource"%>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@ taglib uri="/applus" prefix="applus" %>

<%
LangResource Lang = LangResource.getInstance();

String userId = (String)request.getAttribute("USERID");
String errorInfo = (String)request.getAttribute("ERRORINFO");
%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" /> 
<title>修改密码</title>
<LINK href="script/applus.css" rel="stylesheet" type="text/css">

<applus:include language="javascript">
    gp.page.TextBox;
    gp.page.TextAreaBox;
    gp.page.Toolbar;
    gp.default.Btn_EventAdapter;
</applus:include>

</head>

<applus:init>
  var voToolbar= toolbar.oOwner;
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
</applus:init>

<body onmouseup="" leftMargin="0" rightMargin="0" topMargin="0" class="pageBody" nowrap>
<%
if(errorInfo!=null){
%>
<script language = "JavaScript">
window.alert("<%=errorInfo%>");
</script>
<%
}
%>

<applus:toolbar id="toolbar">
  <call id="fok" type="command" caption="确定" accesskey="O" isgranttoall="true" />
  <call id="fcancel" type="command" caption="取消" accesskey="C" isgranttoall="true" />
</applus:toolbar>

<script language="javascript">

  function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent) {
    switch (oCall.id){
      case "fok":
        window.returnValue = checkPass();
        break;
      case "fcancel":
    	window.returnValue = false;
        break;
    }
    window.close();
  }

</script>

<p></p>

<form name="ASUSER" method="post" action="savePassword.action">
<input type="hidden" name="userId" value="<%=userId%>">
<input type="hidden" name="ISRESET" value="n">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
    <tr class="td">
      <td style="POSITION:absolute;left:140;top:80;" class="normalFieldCaption"> <%=Lang.getLang("OLD_PASSWD")%> </td>
      <td style="POSITION:absolute;left:180;top:80;" class="td">
        <input type="password" class="normalFieldEditMain" name="oldPassword">
      </td>
    </tr>
    <tr class="td">
      <td style="POSITION:absolute;left:140;top:120;"  class="normalFieldCaption"><%=Lang.getLang("NEW_PASSWD")%></td>
      <td style="POSITION:absolute;left:180;top:120;" class="td">
        <input type="password" class="normalFieldEditMain" name="newPassword">
      </td>
    </tr>
    <tr class="td">
      <td style="POSITION:absolute;left:100;top:160;"  class="normalFieldCaption"><%=Lang.getLang("CONFIRM_PASSWD")%></td>
      <td style="POSITION:absolute;left:180;top:160;" class="td">
        <input type="password" class="normalFieldEditMain" name="confirmPassword">
      </td>
    </tr>
  </table>
</form>
<applus:endpage />
</body>

<script>

function checkPass() {
   var rtnflag=checkData();
   if (rtnflag) ASUSER.submit();
   return rtnflag;
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

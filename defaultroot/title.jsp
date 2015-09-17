<%@page contentType="text/html; charset=GBK"%>
<%@page import="com.anyi.gp.desktop.*" %>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<%@page import="com.anyi.gp.domain.User"%>
<%@page import="com.anyi.gp.domain.Group"%>
<%@page import="com.anyi.gp.sso.SessionContext"%>
<%@page import="com.anyi.gp.license.LicenseManager"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>
<html>
<%
  String token = (String) SessionUtils.getToken(request);
  if(token == null){
  	token = "";
  }
  String groupId = request.getParameter("groupId");
  String coCode = (String)SessionUtils.getAttribute(request,"svCoCode");
  String orgCode = (String)SessionUtils.getAttribute(request,"svOrgCode");
  String userId = (String)SessionUtils.getAttribute(request,"svUserID");
  ServletContext context = session.getServletContext();
  SessionContext sessionContext = (SessionContext) context.getAttribute(token);
  User user = sessionContext.getCurrentUser(); 
  String password = user.getPassword();
  String passwordSign = "true";
  String passwordFuction = ApplusContext.getEnvironmentConfig().get("checkPassword");
  passwordFuction = null == passwordFuction || "".equals(passwordFuction) ? "false" : passwordFuction;
  if((password == null || "".equals(password)) && "true".equals(passwordFuction)){
	passwordSign = "false";
  }
  java.util.List userGroups = user.getGroupList();
  
  if(groupId == null || groupId.length() == 0){
  	if(userGroups != null && userGroups.size() > 0){
  		Group group = (Group)userGroups.get(0);
  		groupId = group.getId();
  	}
  }
  
  String topMenu = "";
  String defTopMenuNodes = "";
  String defTopMenuNodesName = "";
  int rowNums = 0;
  if(groupId != null){
  	TitleControl control = new TitleControl();
  	control.setGroupId(groupId);
  	control.setUserId(userId);
  	control.setCoCode(coCode);
  	control.setOrgCode(orgCode);
  	control.setPosiCode((String)SessionUtils.getAttribute(request,"svPoCode"));//����ְλȨ�޹���
  	topMenu = control.getTitleHtml();
  	Title defTitle = control.getDefTitle();
  	if(defTitle != null){
  		defTopMenuNodes = defTitle.getTitleId();
  		defTopMenuNodesName = defTitle.getTitleName();
  	}
  	rowNums = control.getRowNums();
  }
  LicenseManager licenseManager = (LicenseManager)ApplusContext.getBean("licenseManager");
  String coName = licenseManager.getCompanyName();
  String titleMessage = licenseManager.getTitleMessage(" " + coName);
  String alertMessage = licenseManager.getLoginMessage();
  String menuTreeUrl = com.anyi.gp.Pub.encodeUrl("dispatcher.action?function=createMenu&groupId=" + groupId + "&token=" + token
		  			+ "&defTitle=" + defTopMenuNodes + "&defTitleName=" + defTopMenuNodesName);
%>
<head>
<LINK href="script/applus_new.css" rel="stylesheet" type="text/css">
<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
<SCRIPT language="javascript" src="script/General.js"></SCRIPT>
<SCRIPT language="javascript" src="script/Base64.js"></SCRIPT>
<SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
<SCRIPT language="javascript">

var TOKEN = '<%=token%>';
var rowNums = <%=rowNums%>;
var titleMessage = "<%=titleMessage%>";
var loginMessage = "<%=alertMessage%>";

function init(){
   //var menuTreeUrl = "dispatcher.action?function=createMenu&groupId=<%=groupId%>&token=<%=token%>"
  //				  + "&defTitle=<%=defTopMenuNodes%>&defTitleName=";
   top.treeframe.location = '<%=menuTreeUrl%>';	 
}

function doLoad(){
  after_Login();
  checkRegister();
  
}

function checkRegister(){
	//var message = requestData2("checkRegister", "all", new Array(), new Array());
	//if (message.text.length > 0) {
	//	alert(message.text);
	//}
	if (loginMessage.length > 0) alert(loginMessage);
	if (titleMessage.length > 0) {
		top.document.title = titleMessage;
	}
}

function after_Login(){
  //var day = getModiTime();
  //if (day >=600)
  //  alert("���Ѿ�"+day+"��δ�޸ĵ�¼���룬���޸ģ�");

  // dirty quick solution
  if ("function" == typeof after_Login_GL) after_Login_GL();
  checkPassword();
}

function checkPassword(){
	var vsDate = new Date();
	var passwordSign = <%=passwordSign%>;			
	if (!passwordSign) {
		var changePassword = confirm ("����Ϊ�գ����޸����룡��ȷ���޸����룬ȡ���򽫷�����ҳ����");
		if (changePassword) {
		//alert (changePassword);
			var closeResult = window.showModalDialog("/admin/dispatcher.action?function=passwd&USERID=<%=userId%>&token=<%=token%>", vsDate.getTime(),
				"left="+ (screen.availWidth/2 - 200) +"px,top=" + (screen.availHeight/2 - 150) + "px,width=400,height=200,menubar=no,scrollbars=no,toolbar=no,resizable=no");
			if(!closeResult) {
				parent.location.reload();
			}
		} else {
			relogin();
		}
		
	}
}

function hideMenu(menuId){
	var id = top.treeframe.document.getElementById(menuId + "Span");
  if(id) id.style.display = "none";
}

function displayMenu(menuId){
	var id = top.treeframe.document.getElementById(menuId + "Span");
  if(id) id.style.display = "";
}

  //����û������޸����ڣ�wtm,20040830
  function getModiTime(){
      var names = new Array();
      var values = new Array();
      names[0] = "moditime";
      values[0] = "String";
      //�ı�����ʽ,����action
      var result = requestData("psdModiTime", "all", names, values);
      if (result==null){
         var resu = "";
         return resu ;
      }else{
      	 return result.xml;
      }
  }

  // ȡ�û�������, Tangxn, 20041207
  function getSv(svName){
    var result = document.getElementById(svName);
    if(result != null){
      return result.value;
    }else{
      return "";
    }
  }

  function setGlobal(){
    var win_edit = window.showModalDialog("dispatcher.action?function=global&token=" + TOKEN,window,
  	                                "dialogHeight:590px;dialogWidth:585px;" +
    	                              "resizable:no;help:no;status:no");  
  	if(win_edit){
  	  top.msg = win_edit;
  	  top.rtol();	     	
      if (eval("typeof after_Global ==\"function\"")){
        eval("after_Global()");
      }
   	}
  }
  
  /*
   * ��Ҫ����ҳ���ˢ��
   */
	function after_Global(){
		top.head.history.go(0);
		top.main.history.go(0);
     	top.treeframe.history.go(0);
	}
	
  function loadGlobalPage(entityname,names,values){
    com = getCommunity();
    if (com != null){
      com.doRequestPage("setglobal",null,null,null,
                        "LLL");
    }
  }

  function about(){
   showModalDialog("about.jsp","",
     "resizable:no;dialogHeight:430px;dialogWidth:600px;help:no;status:no");
  }

  function setDate(){
    var win = showModalDialog("setDate.htm","",
    "resizable:no;dialogHeight:150px;dialogWidth:460px;help:no;status:no");
    if (win){
      setSv("svTransDate", win);
    }
  }

  function relogin(){
	closeMess();//ע������  
    top.location.href = "index.jsp";
  }

  function gotoWelcomePage(){
    /* �������ʱ��title�ָ�ԭ�������� zhangys 2005-05-20*/
    var tmpTitle = top.document.title;
    var index = tmpTitle.indexOf("������");
    var newTitle = tmpTitle;
    if(index > 1) newTitle = tmpTitle.substring(0, index)
    top.document.title = newTitle;
    /*-----------------------------*/

    parent.main.location.href="dispatcher.action?function=mainHome&token=" + TOKEN;
  }
  function gotoConfigPage(){
    parent.main.location.href = "clientconfig.jsp";
  }


  function setKey(){
     var userID='<% out.print(SessionUtils.getAttribute(request,"svUserID")); %>';
      var win = window.open(Base64.encodeUrl("dispatcher.action?function=passwd&METH=main&USERID="+userID + "&token=" + TOKEN),"new",
      "left=" + (screen.availWidth-450)/2 + "px,top=" + (screen.availHeight-400)/2 + "px,width=450px,height=300px,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no");
  }

  function help(){
    var win_help = open("help.htm", null,
                        "menubar=no,scrollbars=no,status=no,toolbar=yes,"
                        + "resizable=yes,titlebar=yes,"
                        + "height=" + (screen.availHeight - 30)*4/5 + ",width="
                        + (screen.availWidth - 10)*5/6 + ",top=0,left=0");

    //alert("help��δʵ�֣����Ժ����ԣ�");
  }

  function change(){
    gsmcDisplay.innerHTML = gsmc.options[gsdm.selectedIndex].text;
    top.main.location = "main.htm";
  }

  function mouseOver(){
    var head = event.srcElement.src.substr(0,event.srcElement.src.length - 5);
    event.srcElement.src = head + "2.gif";
  }
  function mouseOut(){
    var head = event.srcElement.src.substr(0,event.srcElement.src.length - 5);
    event.srcElement.src = head + "1.gif";
  }
  function showNone(){
    event.returnValue = false;
  }

  //new add 2005-01-27
  function SwitchUser(){
    top.location.href = "index.jsp";
  }
  function ImageChangeTop(){
  	if(document.getElementById("topMenu1") == null)
  		return;
  	var topMenuStyle = document.getElementById("topMenu1").style.display;
  	if(topMenuStyle == 'none'){
	   	document.getElementById("topMenu0").style.display = "block";
	   	document.getElementById("topMenu1").style.display = "block";
	   	if(rowNums > 2){
	   		document.getElementById("topMenu2").style.display = "block";
	   		parent.banner.rows = "92,*,24,0"
	   	}else{
	   		parent.banner.rows = "74,*,24,0"
	   	}
	   	//�ı����ĸ߶�
	   	
		}else{
			document.getElementById("topMenu1").style.display = "none";
	  	document.getElementById("topMenu0").style.display = "block";
	  	if(rowNums > 2){
	   		document.getElementById("topMenu2").style.display = "none";
	   	}
	  	//�ı����ĸ߶�
	  	parent.banner.rows = "60,*,24,0"
		}
		//����ת����ť
		document.getElementById("topControlImg").src=(document.getElementById("topControlImg").src.indexOf("up.gif")>0?'/style/img/main/topchangedown.gif':'/style/img/main/topchangeup.gif');
 }
 function OnFocus(Node,NodeName){
   //���ԭ����״̬
   var oldNode = document.getElementById("selectNodes").value;
   if(document.getElementById(oldNode+"A")){
   	 	document.getElementById(oldNode+"A").innerHTML = "";
   }
   if(document.getElementById(oldNode+"B"))
   		document.getElementById(oldNode+"B").className = "menunew3";
   if(document.getElementById(oldNode+"C"))	
   	document.getElementById(oldNode+"C").innerHTML = "";
   
   //����Ϊѡ��
   document.getElementById("selectNodes").value=Node;
   //����ѡ�е�״̬
   document.getElementById(Node+"A").innerHTML = "<img src='/style/img/main/toptdleft.gif'>";
   document.getElementById(Node+"B").className = "menunew2";
   document.getElementById(Node+"C").innerHTML = "<img src='/style/img/main/toptdright.gif'>";
   //������ߵ���
   parent.treeframe.changeSysApp(Node,NodeName);
 }
 
 function groupChange(){
 	var groupId = "";
 	var gElement = document.all("USER_GROUP");
 	var opts = gElement.options;
 	for(var i = 0; i < opts.length; i++){
 		var opt = opts[i];
 		if(opt.selected){
 			groupId = opt.value;
 			break;
 		}
 	}

  parent.frames["head"].location = Base64.encodeUrl("dispatcher.action?function=title&groupId=" + groupId + "&token=" + TOKEN);
  parent.frames["treeframe"].location = Base64.encodeUrl("dispatcher.action?function=createMenu&groupId=" + groupId + "&token=" + TOKEN);
 }
</SCRIPT></head>
<body leftMargin="0" rightMargin="0" topMargin="0" onload="init();">
<span id="svStdCurrency" value='<%out.print(SessionUtils.getAttribute(request,"svStdCurrency")); %>'></span>
<span id="svFiscalPeriod" value='<%out.print(SessionUtils.getAttribute(request,"svFiscalPeriod")); %>'></span>
<span id="svNd" value='<%out.print(SessionUtils.getAttribute(request,"svNd")); %>'></span>
<span id="svFiscalYear" value='<%out.print(SessionUtils.getAttribute(request,"svFiscalYear")); %>'></span>
<span id="svTransDate" value='<%out.print(SessionUtils.getAttribute(request,"svTransDate")); %>'></span>
<span id="svSysDate" value='<%out.print(SessionUtils.getAttribute(request,"svSysDate")); %>'></span>
<span id="svUserId" value='<%out.print(SessionUtils.getAttribute(request,"svUserID")); %>'></span>
<span id="svUserName" value='<%out.print(SessionUtils.getAttribute(request,"svUserName")); %>'></span>
<span id="svCoCode" value='<%out.print(SessionUtils.getAttribute(request,"svCoCode")); %>'></span>
<span id="svCoName" value='<%out.print(SessionUtils.getAttribute(request,"svCoName")); %>'></span>
<span id="svAccountId" value='<%out.print(SessionUtils.getAttribute(request,"svAccountId")); %>'></span>
<span id="svAccountName" value='<%out.print(SessionUtils.getAttribute(request,"svAccountName")); %>'></span>
<span id="svOrgCode" value='<%out.print(SessionUtils.getAttribute(request,"svOrgCode")); %>'></span>
<span id="svOrgName" value='<%out.print(SessionUtils.getAttribute(request,"svOrgName")); %>'></span>
<span id="svEmpCode" value='<%out.print(SessionUtils.getAttribute(request,"svEmpCode")); %>'></span>
<span id="svPoCode" value='<%out.print(SessionUtils.getAttribute(request,"svPoCode")); %>'></span>
<span id="svPoName" value='<%out.print(SessionUtils.getAttribute(request,"svPoName")); %>'></span>
<span id="svRpType" value='<%out.print(SessionUtils.getAttribute(request,"svRpType")); %>'></span>
<span id="svRpTypeName" value='<%out.print(SessionUtils.getAttribute(request,"svRpTypeName")); %>'></span>
<span id="svBankCode" value='<%out.print(SessionUtils.getAttribute(request,"svBankCode")); %>'></span>
<span id="svBankNodeCode" value='<%out.print(SessionUtils.getAttribute(request,"svBankNodeCode")); %>'></span>

<table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <input id="selectNodes" type="hidden" name="selectNodes" value="<%=defTopMenuNodes%>" >
  <tr>
    <td height="31"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="top1">&nbsp;</td>
        <td width="65"><a href="#"><img src="/style/img/main/topsy.jpg" width="65" height="31" border="0"  style="cursor:hand" onClick="gotoWelcomePage()"></a></td>
        <td width="91"><a href="#"><img src="/style/img/main/topgzhj.jpg" width="91" height="31" border="0" style="cursor:hand" onClick="setGlobal()"></a></td>
        <%if("".equals(SessionUtils.getAttribute(request,"CertLoginState")) || SessionUtils.getAttribute(request,"CertLoginState") == null){%>
        <td width="88"><a href="#"><img src="/style/img/main/topcxdl.jpg" width="88" height="31" border="0" style="cursor:hand" onClick="relogin()"></a></td>
        <td width="87"><a href="#"><img src="/style/img/main/topxgmm.jpg" width="87" height="31" border="0" style="cursor:hand" onClick="setKey()"></a></td>
        <%}else{
					 String strLoginState = ((String)SessionUtils.getAttribute(request,"CertLoginState")).trim();
					 if(strLoginState.equalsIgnoreCase("MultiUser")){ }}%>
        <td width="88"><a href="#"><img src="/style/img/main/topcpsm.jpg" width="88" height="31" border="0" style="cursor:hand" onClick="about()"></a></td>
        <td width="110"><a href="#"><img src="/style/img/main/topkhdsz.jpg" width="110" height="31" border="0" style="cursor:hand" onClick="gotoConfigPage()"></a></td>
        <td width="100" bgcolor="#585858">
        	<SELECT NAME="USER_GROUP" SIZE="1" onchange="groupChange();">
          <%
          if(userGroups != null){
            for(int i = 0; i < userGroups.size(); i++){
              Group group = (Group)userGroups.get(i);
              if(group != null){
              	if(group.getId().equals(groupId)){
              	%>
              		<OPTION VALUE="<%=group.getId()%>" selected><%=group.getGroupName()%></OPTION>           
              	<%}else{               
            	%> 
                 	<OPTION VALUE="<%=group.getId()%>"><%=group.getGroupName()%></OPTION>           
           		<%
           	  	}
           	  }
            }
          }
           %>
          </SELECT>
        </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="34" bgcolor="#585858" style="border-top:1px solid #ccc; ">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="menu" id="topMenu"><%=topMenu%></td>
        <%if(rowNums > 0){%>
        <td width="40" align="left">
          <a href="#" onclick="javascript:ImageChangeTop();">
            <img id="topControlImg" src="/style/img/main/topchangedown.gif" width="16" height="21" border="0">
          </a>
        </td>
        <%} %>
      </tr>
    </table>
    </td>
  </tr>
</table>
</body>
</html>

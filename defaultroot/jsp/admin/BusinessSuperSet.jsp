<%--
Copyright 2004 ufgov.
Corporation home page: http://www.ufgov.com.cn
description: ҵ���ϼ�����ҳ��
$Id: BusinessSuperSet.jsp,v 1.19 2006/07/28 08:45:48 zhanggh Exp $
--%>
<%@ page language="java" contentType="text/html; charset=GBK"%>
<%
request.setCharacterEncoding("GBK");
%>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.anyi.gp.meta.MetaManager" %>
<%@ page import="com.anyi.gp.pub.LangResource" %>
<%@ page import="com.anyi.gp.meta.TableMeta" %>
<%@ page import="com.anyi.gp.util.StringTools"%>
<%@ page import="com.anyi.gp.workflow.BusinessJuniorExp" %>
<%@ page import="com.anyi.gp.pub.SessionUtils" %>
<%@ page import="com.anyi.gp.bean.*" %>
<%!
	String convert(String o){
		if(o!=null)
		try{
			o = new String(o.getBytes("ISO8859-1"),"GBK");
		}catch(Exception e){}
		return o;
	}
%>
<%
	//--------��������
	if(request.getParameter("actionEvent_new")!=null){
		//clear session temp data
		session.removeAttribute("temp");
		session.removeAttribute("bj");
	} 
%>
<jsp:useBean id="bj" class="com.anyi.gp.bean.BusinessJuniorBean" scope="session"/>
<%
	String[] tabs0 = new String[]{"��������","���÷�Χ","��������"};
	String[] tabs1 = new String[]{"��λ","����","ְλ","��Ա"};
	String[] tabs2 = new String[]{"��λ","����","ְλ","��Ա"};
  String   svNd  = bj.getNd();

  if (svNd == null || "".equals(svNd)) {
    svNd = SessionUtils.getAttribute(request,"svNd").toString();
  }

	String[] posiCode = request.getParameterValues("posiCode");
	if(posiCode != null && !bj.getSuperPositions().equals(posiCode)){
		bj.setSuperPositions(posiCode);
	}


		
	String[] compoCodes = request.getParameterValues("compoCode");
	String[] fieldCodes = request.getParameterValues("fieldCode");
	String[] ccSymbols = request.getParameterValues("ccSymbol");
	String[] ccVals = request.getParameterValues("ccVal");
	if(bj.getName() == null ){
    bj.setName("ҵ���ϼ�����");
  }
  if(bj.getDesc() == null ){
    bj.setDesc("ҵ���ϼ�����");
  }
  if(bj.getNd() == null ||(bj.getNd()!=null && bj.getNd()=="")){
    bj.setNd(""+SessionUtils.getAttribute(request,"svNd").toString());
  }
	if(request.getParameterValues("juniorComs")!=null){
    	bj.setJuniorComs(request.getParameterValues("juniorComs"));
    }
	if(request.getParameterValues("juniorOrgs")!=null){
		bj.setJuniorOrgs(request.getParameterValues("juniorOrgs"));
    }
	if(request.getParameterValues("juniorUsers")!=null){
		bj.setJuniorUsers(request.getParameterValues("juniorUsers"));
    }
	if(request.getParameterValues("juniorPositions")!=null){
		bj.setJuniorPositions(request.getParameterValues("juniorPositions"));
    }    
	if(request.getParameterValues("superPositions")!=null){
		bj.setSuperPositions(request.getParameterValues("superPositions"));
    }        
	if(request.getParameterValues("selfComs")!=null){
		bj.setSuperComs(request.getParameterValues("selfComs"));
    }
	if(request.getParameterValues("selfOrgs")!=null){
		bj.setSuperOrgs(request.getParameterValues("selfOrgs"));
    }
   
	if(request.getParameterValues("selfUsers")!=null){
		bj.setSuperUsers(request.getParameterValues("selfUsers"));
    }
  if(request.getParameter("projectName") != null){
  	bj.setName(request.getParameter("projectName"));
  }
  if(request.getParameter("desc") != null){
  	bj.setDesc(request.getParameter("desc"));
  }
  if(request.getParameter("priority") != null){
  	bj.setPriority(request.getParameter("priority"));
  }  
  if (request.getParameter("nd") != null) {
    bj.setNd(request.getParameter("nd"));
  }
	//---------�������
	if(request.getParameter("addCompoCondition")!= null){
		bj.setCompoConditions(compoCodes, fieldCodes, ccSymbols, ccVals);
		bj.addCompoConditions("","","","");
	}
	//---------�޸�����
	if("true".equals(request.getParameter("updCompoCondition"))){
				bj.setCompoConditions(compoCodes, fieldCodes, ccSymbols, ccVals);
	}
	//---------ɾ������
	if(request.getParameter("delCompoCondition")!=null)
		bj.removeCompoCondition();
	//--------���淽��
	if(request.getParameter("actionEvent_save")!=null && bj.needSave()){
	 	try{
			bj.save();
			//clear session temp data
			//session.removeAttribute("temp");
			//session.removeAttribute("bj");
		}catch(SQLException e){
			out.println("<script>alert('����ʧ�ܣ�"+e.getMessage()+"');</script>");
		}catch(RuntimeException re){
			out.println("<script>alert('"+re.getMessage()+"');</script>");
		}
  }
	/*���id*/
	String tab1 = request.getParameter("tab1");
	if(tab1 == null)
		tab1 = "0";
	String tab2 = request.getParameter("tab2");
	if(tab2 == null)
		tab2 = "0";
	String tab0 = request.getParameter("tab0");
	if(tab0 == null)
		tab0 = "1";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
      <title>
        ҵ���ϼ�����
      </title>
<base href="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/" target="_self">
<LINK href="script/applus.css" rel=stylesheet type=text/css>
<LINK href="script/BusinessSuper.css" rel=stylesheet type=text/css>
<script language="JavaScript" src="script/loading.js"></script>
<script language="JavaScript" src="script/Base64.js"></script>
<script language="JavaScript">
	//�л����
function openTab(tab,tabValue) {
	var selectObj = document.getElementsByTagName("select");
	for(var i=0; i< selectObj.length; i++){
		for(var j = 0; j<selectObj[i].options.length; j++){
			selectObj[i].options[j].selected = true;
		}
	}
	document.forms[0][tab].value = tabValue;
	document.forms[0].action.value = "switchtab";
	document.forms[0].submit();
}
//���ύ
function submitAction(actionValue, theForm, formName) {
	if (theForm == null) {
		theForm = document.forms[formName];
	}
	theForm.framename.value = window.name;

	if (actionValue == "set") {
		theForm.action.value = "set";
	} else if (actionValue == "cancel") {
		theForm.action.value = "cancel";
	}
	theForm.submit();
	return false;
}
//��ʾ��״ѡ���
function showTreeBox(tab){
	showModalDialog(Base64.encodeUrl("<%=request.getContextPath()%>/jsp/admin/treeSelectDialog.jsp?action=" + tab), window,"status:no;resizable:yes;help:no;dialogHeight:240px;dialogWidth:320px");
}
function putTab30Value(c,v){
	var obj = getObjectById("compoCodeSet");
	for(var i=0; i< obj.options.length; i++){
		obj.options[i].selected= false;
		if(obj.options[i].value==v)
			obj.options[i].selected=true;
	}
}
//�������λ��
function computePosition(obj){
    var e = window.event.srcElement;
    var o = obj.style;
 		var t = e.offsetTop,  h = e.clientHeight, l = e.offsetLeft, p = e.type;
 		while (e = e.offsetParent){
 			t += e.offsetTop; 
 			l += e.offsetLeft;
 		}
    o.display = ""; 
    var cw = obj.clientWidth, ch = obj.clientHeight;
    var dw = document.body.clientWidth, dl = document.body.scrollLeft, dt = document.body.scrollTop;
    
    if (document.body.clientHeight + dt - t - h >= ch) 
    	o.top = t + h;
    else 
      o.top  = (t - dt < ch) ? ((p=="image")? t + h : t + h + 6) : t - ch;
    if (dw + dl - l >= cw)
      o.left = l; 
    else 
       o.left = (dw >= cw) ? dw - cw + dl : dl;
}
//˫��ɾ���б�����
function remov(){
	var ob=event.srcElement;
	if(ob.options.length>0){
		ob.removeChild(ob.options[ob.selectedIndex]);
		//ob.size--;
		}
}
function selectAll(){
	var ob=event.srcElement;
	for(var i=0; i<ob.options.length;i++){
		ob.options[i].selected= true;
	}
}
//����б�
function addOptions(currentSelect,v,code){
	//�鿴�Ƿ����ظ�����
	for(var i=0;i<currentSelect.options.length; i++){
		//�У���ɾ��
		if(currentSelect.options[i].value==code){
			currentSelect.removeChild(currentSelect.options[i]);
			return;
		}
	}
	currentSelect.options[currentSelect.options.length]=new Option(v, code, true,true);
}
<%
	Map sessionData = session.getAttribute("temp")==null?new HashMap():(Map)session.getAttribute("temp");
	//Handle the cancel action
	if(request.getParameter("cancel")!=null){
		//clear session temp data
		session.removeAttribute("temp");
		session.removeAttribute("bj");
		out.println("parent.parent.window.close();");
	}
%>

	function enableObj(obj,enable){
		obj.disabled=!enable;
		if(enable){
			obj.style["background-color"]='';
		}
		else{
			obj.style["background-color"]='menu';
		}
		
	}


	function getObjectById(id){ 
		if(document.all) 
			return(eval("document.all."+ id)); 
		return(eval(id)); 
	}	

</script>
<script language="JavaScript" type="text/JavaScript">
<!--
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);
//-->
</script>
</head>
<body unselectable="on" class="dialog" onLoad="loadFinish()"  onUnload="loading()"> 
<div align='center' id='loading' style='position: absolute; z-index: 9999; width: 288px; height: 80px; display:  none; left: 187px; top: 13px;'><img src=/style/img/businessJunior/appInstall_animated.gif>����ִ�в��������Ժ�...</div>
<form name="myForm" action="<%=request.getRequestURI()%>" method="post" target="_self" >
<table border="0" width=100% cellpadding="0" cellspacing="0" >
  <tr>
    <td  background="/style/img/main/editcontentmidbk.jpg" height=19 width=100%>&nbsp;</td>
  </tr>
  <tr>
     <td >
        <table width="1" border="0" cellspacing="0" cellpadding="0" align="right">
          <tr> 
             <td><img src="/style/img/func/left_behind.gif"></td>
              <td background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
              <% if(request.getParameter("showList") != null || 
	 request.getParameter("actionEvent_save")!=null){%>
              <input type="submit" name="hideList" value="<<&nbsp;�����б�" class="clsListCall"> 
              <% }else{%>
              <input type="submit" name="showList" value="��ʾ�б�&nbsp;>>" class="clsListCall">
              <%}%>
            </td>
              <td><img src="/style/img/func/right_behind.gif"></td>
              <td><img src="/style/img/func/left_behind.gif"></td>
              <td background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
              <input type="button" value="��&nbsp;��" class="clsListCall" onClick="window.open('<%=request.getRequestURI()%>?actionEvent_new=0','_self');"> 
            	</td>
            	<td><img src="/style/img/func/right_behind.gif"></td>
              <td><img src="/style/img/func/left_behind.gif"></td>
              <td background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
              <input type="submit" name="actionEvent_save" value="��&nbsp;��" class="clsListCall"> 
            	</td>
            	<td><img src="/style/img/func/right_behind.gif"></td>
              <td><img src="/style/img/func/left_behind.gif"></td>
              <td background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
              <input type="submit" name="cancel" value="ȡ&nbsp;��" class="clsListCall"> 
            </td>
            <td><img src="/style/img/func/right_behind.gif"></td>
          </tr>
        </table>
     <td>
  </tr>
</table>  	
<table width="100%" border="0" cellspacing="0" cellpadding="0" height="290">

    <input type="hidden" name="action" value="ok">
    <input type="hidden" name="tab0" value="<%=tab0%>">
    <input type="hidden" name="tab1" value="<%=tab1%>">
    <input type="hidden" name="tab2" value="<%=tab2%>">
    <input type="hidden" name="actionEvent" value="">
    <tr> 
      <td valign="top"> <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF">
        </table><div id="Layer1" style="width:100%;" class="dialogtabstart">
        <table border="0" cellpadding="0" cellspacing="0" class="maxwidth" style="empty-cells: show;">
          <tr> 
            <%
								for(int i=0; i< tabs0.length; i++){
									if(i == Integer.parseInt(tab0)){ 
						%>
							<td nowrap>
                <table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead">
									<tr>
										<td valign="top"><img src="/style/img/tag/left_select.jpg"></img></td>
										<td valign="middle" class="TabMiddle" nowrap><span class="tabactive" unselectable="on" ><%=tabs0[i]%></span></td>
										<td  valign="top"> <img src="/style/img/tag/right_select.jpg"></img></td>
									</tr>
								</table>
							</td>
            <%
								    } else{
							%>
							 <td nowrap>
	               <table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead">
										<tr>
											<td valign="top"><img src="/style/img/tag/left_behind.jpg"></img></td>
											<td valign="middle" class="TabMiddleLow" nowrap><a class="tab" href="javascript:openTab('tab0','<%=i%>');" ><%=tabs0[i]%></a></td>
											<td valign="top"> <img src="/style/img/tag/right_behind.jpg"></img></td>
										</tr>
									</table>
							</td>
            <%
									}
								}
							%>
            <td class="maxwidth"></td>
          </tr>
          <tr> 
            <%
								for(int i=0; i< tabs0.length; i++){
									if(i == Integer.parseInt(tab0)){ 
						%>
            <td></td>
            <%
								    } else{
						%>
            <td class="dialogtabrow"></td>
            <%
									}
								}
							%>
            <td class="dialogtabrow"></td>
          </tr>
        </table>
        <%
							if("1".equals(tab0)){
						%>
        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
          <table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%" >
            <!--tr> 
              <td height="50" class="borderoff" colspan="2">
			   </td>
            </tr-->
            <tr> 
              <td valign="top"> <fieldset>
                <legend><img src="/style/img/businessJunior/people_logo.png">ҵ���¼�����</legend>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr> 
                    <td nowrap> <div id="Layer1" style="width:100%; " class="dialogtabstart"> 
                        <table border="0" cellpadding="0" cellspacing="0" class="maxwidth" style="empty-cells: show;">
                          <tr> 
                            <%
								for(int i=0; i< tabs2.length; i++){
									if(i == Integer.parseInt(tab2)){ 
							%>
							<td nowrap>
                <table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead">
									<tr>
										<td valign="top"><img src="/style/img/tag/left_select.jpg"></img></td>
										<td valign="middle" class="TabMiddle" nowrap><span class="tabactive" unselectable="on" ><%=tabs2[i]%></span></td>
										<td  valign="top"> <img src="/style/img/tag/right_select.jpg"></img></td>
									</tr>
								</table>
							</td>
            <%
								    } else{
							%>
							 <td nowrap>
	               <table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead">
										<tr>
											<td valign="top"><img src="/style/img/tag/left_behind.jpg"></img></td>
											<td valign="middle" class="TabMiddleLow" nowrap><a class="tab" href="javascript:openTab('tab2','<%=i%>');" ><%=tabs2[i]%></a></td>
											<td valign="top"> <img src="/style/img/tag/right_behind.jpg"></img></td>
										</tr>
									</table>
							</td><%
									}
								}
							%>
                            <td class="maxwidth"></td>
                          </tr>
                          <tr> 
                            <%
								for(int i=0; i< tabs2.length; i++){
									if(i == Integer.parseInt(tab2)){ 
							%>
                            <td></td>
                            <%
								    } else{
							%>
                            <td class="dialogtabrow"></td>
                            <%
									}
								}
							%>
                            <td class="dialogtabrow"></td>
                          </tr>
                        </table>
                        <%
						 if("0".equals(tab2)){
						 	boolean isAll = bj.COMMON_CODE.equals(bj.getJuniorComs()[0]) && bj.getJuniorComs().length==1;
						 %>
                        <script language="JavaScript">
							function  putTab20Value(code, v){
								var currentSelect = getObjectById("juniorComs3");
								addOptions(currentSelect,v,code);
							}
						</script>
                        <div class="dialogtabcontent" id="tabcontent" style="height: 100px;"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="juniorComs" id="juniorComs1" onClick="enableObj(this.form.juniorComs[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="juniorComs1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%> name="juniorComs" id="juniorComs2"  for="juniorComs" onClick="enableObj(this.form.juniorComs[2], true); showTreeBox(20);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="juniorComs2">���б���ѡ��</label> <b> </b><img src="/style/img/main/search.gif" for="juniorComs" style="cursor: hand" onClick="showTreeBox(20);"></td>
                            </tr>
                            <tr> 
                              <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td>
                                    	<select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="juniorComs" id="juniorComs3" ondblclick='remov()' onClick='selectAll()'>
										                  <%
																		  	String[] juniorComs = bj.getJuniorComs();
																				for(int i=0;i<juniorComs.length; i++){
																					if(bj.COMMON_CODE.equals(juniorComs[i]) || "".equals(juniorComs[i]))
																						continue;
																					out.println("<option value='"+juniorComs[i]+"' selected >"+bj.getCompanyName(juniorComs[i], svNd)+"</option>");
																				}
																		  %>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></tr>
                          </table>
                        </div>
                        <%}%>
                        <!--///////////////////////�¼���������-->
                        <%
						if("1".equals(tab2)){
						boolean isAll = bj.COMMON_CODE.equals(bj.getJuniorOrgs()[0]) && bj.getJuniorOrgs().length==1;
						%>
                        <script language="JavaScript">
						function  putTab21Value(code, v){
							var currentSelect = getObjectById("JuniorOrgs3");
							addOptions(currentSelect,v,code);
						}
						</script>
                        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="juniorOrgs" id="JuniorOrgs1" onClick="enableObj(this.form.juniorOrgs[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="JuniorOrgs1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%>  name="juniorOrgs" id="JuniorOrgs2" for="juniorOrgs" onClick="enableObj(this.form.juniorOrgs[2], true); showTreeBox(21);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="JuniorOrgs2">���б���ѡ��</label> <b> </b><img src="/style/img/main/search.gif" for="juniorOrgs" style="cursor: hand" onClick="showTreeBox(21);"></td>
                            </tr>
                            <tr> 
                              <td> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td><select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="juniorOrgs" id="JuniorOrgs3" ondblclick='remov()' onClick='selectAll()'>
                                        <%
																			String[] JuniorOrgs = bj.getJuniorOrgs();
																				for(int i=0;i<JuniorOrgs.length; i++){
																				if(bj.COMMON_CODE.equals(JuniorOrgs[i]) || "".equals(JuniorOrgs[i]) )
																					continue;
																				out.println("<option value='"+JuniorOrgs[i]+"' selected>"+bj.getOrganizationName(JuniorOrgs[i])+"</option>");
																			}
																			%>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                        </div>
                        <%}%>
                        <!--///////////////////////�¼�ְλ����-->
                        <%
						if("2".equals(tab2)){
							boolean isAll = bj.COMMON_CODE.equals(bj.getJuniorPositions()[0]) && bj.getJuniorPositions().length==1;
						%>
                        <script language="JavaScript">
						function  putTab22Value(code, v){
							var currentSelect = getObjectById("JuniorPositions3");
							addOptions(currentSelect,v,code);
						}
						</script>
                        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="juniorPositions" id="JuniorPositions1" onClick="enableObj(this.form.juniorPositions[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="JuniorPositions1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%>  name="juniorPositions" for="juniorPositions" id="JuniorPositions2" onClick="enableObj(this.form.juniorPositions[2], true); showTreeBox(22);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="JuniorPositions2">���б���ѡ��</label> <b> 
                                </b><img src="/style/img/main/search.gif" style="cursor: hand" for="juniorPositions" onClick="showTreeBox(22);"></td>
                            </tr>
                            <tr> 
                              <td> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td><select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="juniorPositions" id="JuniorPositions3" ondblclick='remov()' onClick='selectAll()'>
                                        <%
						String[] JuniorPositions = bj.getJuniorPositions();
							for(int i=0;i<JuniorPositions.length; i++){
							if(bj.COMMON_CODE.equals(JuniorPositions[i]) || "".equals(JuniorPositions[i]) )
								continue;
							out.println("<option value='"+JuniorPositions[i]+"' selected>"+bj.getPositionName(JuniorPositions[i])+"</option>");
						}
						%>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                        </div>
                        <%}%>
                        <!--///////////////////////�¼���Ա����-->
                        <%
						if("3".equals(tab2)){
							boolean isAll = bj.COMMON_CODE.equals(bj.getJuniorUsers()[0]) && bj.getJuniorUsers().length==1;
						%>
                        <script language="JavaScript">
						function  putTab23Value(code, v){
							var currentSelect = getObjectById("JuniorUsers3");
							addOptions(currentSelect,v,code);
						}
						</script>
                        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="juniorUsers" id="JuniorUsers1" onClick="enableObj(this.form.juniorUsers[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="JuniorUsers1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%> for="juniorUsers"  name="juniorUsers" id="JuniorUsers2" onClick="enableObj(this.form.juniorUsers[2], true); showTreeBox(23);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="JuniorUsers2">���б���ѡ��</label> <b> </b><img src="/style/img/main/search.gif" for="juniorUsers" style="cursor: hand" onClick="showTreeBox(23);"></td>
                            </tr>
                            <tr> 
                              <td> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td><select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="juniorUsers" id="JuniorUsers3" ondblclick='remov()' onClick='selectAll()'>
                                        <%
						String[] JuniorUsers = bj.getJuniorUsers();
							for(int i=0;i<JuniorUsers.length; i++){
							if(bj.COMMON_CODE.equals(JuniorUsers[i]) || "".equals(JuniorUsers[i]) )
								continue;
							out.println("<option value='"+JuniorUsers[i]+"' selected>"+bj.getUserName(JuniorUsers[i])+"</option>");
						}
						%>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                        </div>
                        <%}%>
                      </div></td>
                  </tr>
                </table>
                </fieldset></td>
                
              <td valign="top" width="50%"> <fieldset>
                <legend><img src="/style/img/businessJunior/people_logo.png">ҵ���ϼ�����</legend>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr> 
                    <td nowrap> <div id="Layer1" style="width:100%;" class="dialogtabstart"> 
                        <table border="0" cellpadding="0" cellspacing="0" class="maxwidth" style="empty-cells: show;">
                          <tr> 
                            <%
								for(int i=0; i< tabs1.length; i++){
									if(i == Integer.parseInt(tab1)){ 
							%>
                            <td nowrap>
	                  	        <table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead">
																<tr>
																	<td valign="top"><img src="/style/img/tag/left_select.jpg"></img></td>
																	<td valign="middle" class="TabMiddle" nowrap><span class="tabactive" unselectable="on" ><%=tabs1[i]%></span></td>
																	<td  valign="top"> <img src="/style/img/tag/right_select.jpg"></img></td>
																</tr>
															</table>
                            </td>
                            <%
								    } else{
							%>
                            <td nowrap>
                            	<table border="0" cellpadding="0" cellspacing="0"	class="clsTabHead">
																<tr>
																	<td valign="top"><img src="/style/img/tag/left_behind.jpg"></img></td>
																	<td valign="middle" class="TabMiddleLow" nowrap><a class="tab" href="javascript:openTab('tab1','<%=i%>');" ><%=tabs1[i]%></a></td>
																	<td valign="top"> <img src="/style/img/tag/right_behind.jpg"></img></td>
																</tr>
															</table>
                            </td>
                            <%
									}
								}
							%>
                            <td class="maxwidth"></td>
                          </tr>
                          <tr> 
                            <%
								for(int i=0; i< tabs1.length; i++){
									if(i == Integer.parseInt(tab1)){ 
							%>
                            <td></td>
                            <%
								    } else{
							%>
                            <td class="dialogtabrow"></td>
                            <%
									}
								}
							%>
                            <td class="dialogtabrow"></td>
                          </tr>
                        </table>
            <%
							if("0".equals(tab1)){
								boolean isAll = bj.COMMON_CODE.equals(bj.getSuperComs()[0]) && bj.getSuperComs().length==1;
						%>
            <script language="JavaScript">
							function  putTab10Value(code, v){
								var currentSelect = getObjectById("selfComs3");
								addOptions(currentSelect,v,code);
							}
						</script>
                        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="selfComs" id="selfComs1" onClick="enableObj(this.form.selfComs[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="selfComs1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%> name="selfComs" id="selfComs2" for='selfComs' onClick="enableObj(this.form.selfComs[2], true); showTreeBox(10);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="selfComs2">���б���ѡ��</label> <b> </b><img src="/style/img/main/search.gif" for='selfComs' style="cursor: hand" onClick="showTreeBox(10);"></td>
                            </tr>
                            <tr> 
                              <td> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td><select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="selfComs" id="selfComs3" ondblclick='remov()' onClick='selectAll()'>
                                        <%
								  	String[] selfComs = bj.getSuperComs();
									for(int i=0;i<selfComs.length; i++){
										if(bj.COMMON_CODE.equals(selfComs[i]) || "".equals(selfComs[i]) )
											continue;
										out.println("<option value='"+selfComs[i]+"' selected>"+bj.getCompanyName(selfComs[i], svNd)+"</option>");
									}
								  %>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                        </div>
                        <%}%>
                        <!--///////////////////////ҵ���ϼ���������-->
                        <%
						if("1".equals(tab1)){
							boolean isAll =bj.COMMON_CODE.equals(bj.getSuperOrgs()[0]) && bj.getSuperOrgs().length==1;
						%>
                        <script language="JavaScript">
						function  putTab11Value(code, v){
							var currentSelect = getObjectById("SelfOrgs3");
								addOptions(currentSelect,v,code);
						}
						</script>
                        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="selfOrgs" id="SelfOrgs1" onClick="enableObj(this.form.selfOrgs[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="SelfOrgs1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%>  name="selfOrgs" id="SelfOrgs2" for="selfOrgs" onClick="enableObj(this.form.selfOrgs[2], true); showTreeBox(11);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="SelfOrgs2">���б���ѡ��</label> <b> </b><img src="/style/img/main/search.gif" for="selfOrgs" style="cursor: hand" onClick="showTreeBox(11);"></td>
                            </tr>
                            <tr> 
                              <td> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td><select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="selfOrgs" id="SelfOrgs3" ondblclick='remov()' onClick='selectAll()'>
                                        <%
						String[] SelfOrgs = bj.getSuperOrgs();
							for(int i=0;i<SelfOrgs.length; i++){
							if(bj.COMMON_CODE.equals(SelfOrgs[i]) || "".equals(SelfOrgs[i]) )
								continue;
							out.println("<option value='"+SelfOrgs[i]+"' selected>"+bj.getOrganizationName(SelfOrgs[i])+"</option>");
						}
						%>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                        </div>
                        <%}%>
                        <!--///////////////////////ҵ���ϼ�ְλ����-->
                        <%
						if("2".equals(tab1)){
							boolean isAll = bj.COMMON_CODE.equals(bj.getSuperPositions()[0]) && bj.getSuperPositions().length==1;
						%>
                        <script language="JavaScript">
						function  putTab12Value(code, v){
							var currentSelect = getObjectById("SuperPositions3");
							addOptions(currentSelect,v,code);
						}
						</script>
                        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="superPositions" id="SuperPositions1" onClick="enableObj(this.form.superPositions[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="JuniorPositions1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%>  name="superPositions" for="superPositions" id="SuperPositions2" onClick="enableObj(this.form.superPositions[2], true); showTreeBox(12);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="SuperPositions2">���б���ѡ��</label> <b> 
                                </b><img src="/style/img/main/search.gif" style="cursor: hand" onClick="showTreeBox(12);" for="superPositions"></td>
                            </tr>
                            <tr> 
                              <td> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td><select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="superPositions" id="SuperPositions3" ondblclick='remov()' onClick='selectAll()'>
                                        <%
						String[] SuperPositions = bj.getSuperPositions();
							for(int i=0;i<SuperPositions.length; i++){
							if(bj.COMMON_CODE.equals(SuperPositions[i]) || "".equals(SuperPositions[i]) )
								continue;
							out.println("<option value='"+SuperPositions[i]+"' selected>"+bj.getPositionName(SuperPositions[i])+"</option>");
						}
						%>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                        </div>
                        <%}%>                        
                        <!--//////////////////       ҵ���ϼ���Ա���� ---------------->
                        <%
						if("3".equals(tab1)){
						boolean isAll = bj.COMMON_CODE.equals(bj.getSuperUsers()[0]) && bj.getSuperUsers().length==1;
						%>
                        <script language="JavaScript">
						function  putTab13Value(code, v){
							var currentSelect = getObjectById("SelfUsers3");
							addOptions(currentSelect,v,code);
						}
						</script>
                        <div class="dialogtabcontent" style="height: 100px;"  id="tabcontent"> 
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr> 
                              <td><input type="radio" <%= isAll?"checked":""%> name="selfUsers" id="SelfUsers1" onClick="enableObj(this.form.selfUsers[2], false);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="SelfUsers1">ȫ��</label></td>
                            </tr>
                            <tr> 
                              <td> <input type="radio" <%= isAll?"":"checked"%>  name="selfUsers" for="selfUsers" id="SelfUsers2" onClick="enableObj(this.form.selfUsers[2], true); showTreeBox(13);" value="<%=bj.COMMON_CODE%>"> 
                                <label for="SelfUsers2">���б���ѡ��</label> <b> </b><img src="/style/img/main/search.gif" for="selfUsers" style="cursor: hand" onClick="showTreeBox(13);"></td>
                            </tr>
                            <tr> 
                              <td> <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr> 
                                    <td><select size="6" multiple style="width:200px;" <%= isAll?"disabled":""%> name="selfUsers" id="SelfUsers3" ondblclick='remov()' onClick='selectAll()'>
                                        <%
						String[] SelfUsers = bj.getSuperUsers();
							for(int i=0;i<SelfUsers.length; i++){
							if(bj.COMMON_CODE.equals(SelfUsers[i]) || "".equals(SelfUsers[i]) )
								continue;
							out.println("<option value='"+SelfUsers[i]+"' selected>"+bj.getUserName(SelfUsers[i])+"</option>");
						}
						%>
                                      </select></td>
                                    <td><img src="/style/img/businessJunior/help.gif" alt="˫���б�ȡ��ѡ��"></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table>
                        </div>
                        <%}%>
                      </div></td>
                  </tr>
                </table>
                </fieldset></td>
            </tr>
          </table>
        </div>
        <%} else if("2".equals(tab0)) { %>
        <div class="dialogtabcontent" style="height: 260px;"  id="tabcontent"> 
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr> 
              <td> <fieldset>
                <legend><img src="/style/img/businessJunior/rule_setting.png">��ҵ�񲿼���<img src="/style/img/businessJunior/help.gif" alt="ÿ���������'��'�Ĺ�ϵ�����Ҫ���'��'��ϵ������[����]��ť�������á�"></legend>
                <table  border="0" cellspacing="0" cellpadding="0">
                  <tr> 
                    <td width="100">������</td>
                    <td width="100">���ԣ�</td>
                    <td width="50">�������</td>
                    <td width="150">ֵ��</td>
                  </tr>
                  <%
                  	  Map compos = bj.getCompos();
                    	
                    	List compoConditions = bj.getCompoConditions();
                    	if(compoConditions.size()>0)
                    	for(int i=0; i< compoConditions.size(); i++){
                    		BusinessJuniorBean.CompoCondition cc =(BusinessJuniorBean.CompoCondition) compoConditions.get(i);
                  %>
                  <tr>
                  	<td><select name="compoCode" onChange="this.form.updCompoCondition.value='true';this.form.submit();" style="width: 130px"> 			
                  <%	
	                  		Iterator it = compos.keySet().iterator();
	                  		String compoCode = cc.getCompoCode();
	                  		if(StringTools.isEmptyString(compoCode)){
	                  			out.println("<option value=''>--����--</option>");
	                  		}
	                  		while(it.hasNext()){
	                    				String k = (String)it.next();
	                    				out.println("<option value='"+k+"' "+(cc.getCompoCode().equals(k)?"selected":"")+">"+compos.get(k)+"</option>");
	                    				
	                    	}
	                %>
	                		</select>
	                	</td>
	                	<td><select name="fieldCode" onChange="this.form.updCompoCondition.value='true';this.form.submit();" style="width: 200px">
	                		<option value=''>--�� ��--</option>
	                		<%
	                			if(!StringTools.isEmptyString(compoCode)){
		                			TableMeta tabMeta = MetaManager.getTableMetaByCompoName(compoCode);
													List fieldList=tabMeta.getSaveFieldNames();
													for(int j=0; j< fieldList.size();j++){
														String ctrlField = (String)fieldList.get(j);
														out.println("<option value='"+ctrlField+"' "+(cc.getFieldCode().equals(ctrlField)?"selected":"")+">"+LangResource.getInstance().getLang("C",ctrlField)+"</option>");
													}
													
													List childTables = tabMeta.getChildTableNames();
													for(int j=0; j< childTables.size(); j++){
														String cn = (String)childTables.get(j);
														out.println("<optgroup label='"+LangResource.getInstance().getLang("C",cn)+"'>");
														TableMeta childMeta = tabMeta.getChildTable(cn,true);
														List cfieldList=childMeta.getSaveFieldNames();
														for(int n=0; n< cfieldList.size();n++){
															String ctrlField = (String)cfieldList.get(n);
															out.println("<option value='"+cn+"."+ctrlField+"' "+(cc.getFieldCode().equals(cn+"."+ctrlField)?"selected":"")+">"+LangResource.getInstance().getLang("C",ctrlField)+"</option>");
														}
														out.println("</optgroup>");
													}
												}
												
	                		%>
	                		</select></td>
                    <td><select name="ccSymbol" onChange="this.form.updCompoCondition.value='true';this.form.submit();" >
                        <option value="<%=BusinessJuniorExp.BIGGER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.BIGGER)?"selected":""%>>����</option>
                        <option value="<%=BusinessJuniorExp.BIGGER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.BIGGER_EQUAL)?"selected":""%>>���ڵ���</option>
                        <option value="<%=BusinessJuniorExp.SMALLER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.SMALLER)?"selected":""%>>С��</option>
                        <option value="<%=BusinessJuniorExp.SMALLER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.SMALLER_EQUAL)?"selected":""%>>С�ڵ���</option>
                        <option value="<%=BusinessJuniorExp.EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.EQUAL)?"selected":""%>>����</option>
                        <option value="<%=BusinessJuniorExp.NOT_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NOT_EQUAL)?"selected":""%>>������</option>
                        <option value="<%=BusinessJuniorExp.LIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.LIKE)?"selected":""%>>����</option>
                        <option value="<%=BusinessJuniorExp.NOT_LIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NOT_LIKE)?"selected":""%>>������</option>
                        <optgroup label='��ֵ'>
                        	<option value="<%=BusinessJuniorExp.TBIGGER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TBIGGER)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.TBIGGER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TBIGGER_EQUAL)?"selected":""%>>���ڵ���</option>
                        	<option value="<%=BusinessJuniorExp.TSMALLER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TSMALLER)?"selected":""%>>С��</option>
                        	<option value="<%=BusinessJuniorExp.TSMALLER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TSMALLER_EQUAL)?"selected":""%>>С�ڵ���</option>
                        	<option value="<%=BusinessJuniorExp.TEQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TEQUAL)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.TNOT_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TNOT_EQUAL)?"selected":""%>>������</option>
                       	 	<option value="<%=BusinessJuniorExp.TLIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TLIKE)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.TNOT_LIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.TNOT_LIKE)?"selected":""%>>������</option>
                       </optgroup>
                       <optgroup label='���ֵ'>
                       		<option value="<%=BusinessJuniorExp.XBIGGER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XBIGGER)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.XBIGGER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XBIGGER_EQUAL)?"selected":""%>>���ڵ���</option>
                        	<option value="<%=BusinessJuniorExp.XSMALLER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XSMALLER)?"selected":""%>>С��</option>
                        	<option value="<%=BusinessJuniorExp.XSMALLER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XSMALLER_EQUAL)?"selected":""%>>С�ڵ���</option>
                        	<option value="<%=BusinessJuniorExp.XEQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XEQUAL)?"selected":""%>>����</option>
                       	 	<option value="<%=BusinessJuniorExp.XNOT_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XNOT_EQUAL)?"selected":""%>>������</option>
                        	<option value="<%=BusinessJuniorExp.XLIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XLIKE)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.XNOT_LIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.XNOT_LIKE)?"selected":""%>>������</option>
                       </optgroup>
                       <optgroup label='��Сֵ'>
                       		<option value="<%=BusinessJuniorExp.NBIGGER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NBIGGER)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.NBIGGER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NBIGGER_EQUAL)?"selected":""%>>���ڵ���</option>
                        	<option value="<%=BusinessJuniorExp.NSMALLER%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NSMALLER)?"selected":""%>>С��</option>
                        	<option value="<%=BusinessJuniorExp.NSMALLER_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NSMALLER_EQUAL)?"selected":""%>>С�ڵ���</option>
                        	<option value="<%=BusinessJuniorExp.NEQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NEQUAL)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.NNOT_EQUAL%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NNOT_EQUAL)?"selected":""%>>������</option>
                        	<option value="<%=BusinessJuniorExp.NLIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NLIKE)?"selected":""%>>����</option>
                        	<option value="<%=BusinessJuniorExp.NNOT_LIKE%>" <%= cc.getSymbol().equals(BusinessJuniorExp.NNOT_LIKE)?"selected":""%>>������</option>
                       </optgroup>
                      </select> </td>
                    <td><input type="text" name="ccVal" onChange="this.form.updCompoCondition.value='true';this.form.submit();" value="<%=cc.getVal()%>"></td>
                  </tr>
	               	<%
                    	}
                  %>
                  
                  <tr> 
                    <td colspan="4"><input type="submit" name="addCompoCondition" value="���ӹ���"> <input type="submit" name="delCompoCondition" value="ɾ������"><input type="hidden" name="updCompoCondition" value="false"></td>
                  </tr>
                </table>
                </fieldset>
                <!--fieldset>
                <legend>��ϵͳ������</legend>
                <table  border="0" cellspacing="0" cellpadding="0">
                  <tr> 
                    <td width="100">������</td>
                    <td width="50">�������</td>
                    <td width="150">ֵ��</td>
                  </tr>
                  <tr> 
                    <td><select name="variable">
                      </select></td>
                    <td><select name="symbol">
                        <option value="<%=BusinessJuniorExp.BIGGER%>">����</option>
                        <option value="<%=BusinessJuniorExp.BIGGER_EQUAL%>">���ڵ���</option>
                        <option value="<%=BusinessJuniorExp.SMALLER%>">С��</option>
                        <option value="<%=BusinessJuniorExp.SMALLER_EQUAL%>">С�ڵ���</option>
                        <option value="<%=BusinessJuniorExp.EQUAL%>" selected>����</option>
                        <option value="<%=BusinessJuniorExp.NOT_EQUAL%>">������</option>
                        <option value="<%=BusinessJuniorExp.LIKE%>">����</option>
                        <option value="<%=BusinessJuniorExp.NOT_LIKE%>">������</option>
                        <optgroup label='��ֵ'>
	                        <option value="<%=BusinessJuniorExp.TBIGGER%>">����</option>
	                        <option value="<%=BusinessJuniorExp.TBIGGER_EQUAL%>">���ڵ���</option>
	                        <option value="<%=BusinessJuniorExp.TSMALLER%>">С��</option>
	                        <option value="<%=BusinessJuniorExp.TSMALLER_EQUAL%>">С�ڵ���</option>
	                        <option value="<%=BusinessJuniorExp.TEQUAL%>">����</option>
	                        <option value="<%=BusinessJuniorExp.TNOT_EQUAL%>">������</option>
	                        <option value="<%=BusinessJuniorExp.TLIKE%>">����</option>
	                        <option value="<%=BusinessJuniorExp.TNOT_LIKE%>">������</option>                        
                        </optgroup>
                        <optgroup label='���ֵ'>
	                        <option value="<%=BusinessJuniorExp.XBIGGER%>">����</option>
	                        <option value="<%=BusinessJuniorExp.XBIGGER_EQUAL%>">���ڵ���</option>
	                        <option value="<%=BusinessJuniorExp.XSMALLER%>">С��</option>
	                        <option value="<%=BusinessJuniorExp.XSMALLER_EQUAL%>">С�ڵ���</option>
	                        <option value="<%=BusinessJuniorExp.XEQUAL%>">����</option>
	                        <option value="<%=BusinessJuniorExp.XNOT_EQUAL%>">������</option>
	                        <option value="<%=BusinessJuniorExp.XLIKE%>">����</option>
	                        <option value="<%=BusinessJuniorExp.XNOT_LIKE%>">������</option>                        
                        </optgroup>
                        <optgroup label='��Сֵ'>
	                        <option value="<%=BusinessJuniorExp.NBIGGER%>">����</option>
	                        <option value="<%=BusinessJuniorExp.NBIGGER_EQUAL%>">���ڵ���</option>
	                        <option value="<%=BusinessJuniorExp.NSMALLER%>">С��</option>
	                        <option value="<%=BusinessJuniorExp.NSMALLER_EQUAL%>">С�ڵ���</option>
	                        <option value="<%=BusinessJuniorExp.NEQUAL%>">����</option>
	                        <option value="<%=BusinessJuniorExp.NNOT_EQUAL%>">������</option>
	                        <option value="<%=BusinessJuniorExp.NLIKE%>">����</option>
	                        <option value="<%=BusinessJuniorExp.NNOT_LIKE%>">������</option>                        
                        </optgroup>
                      </select> </td>
                    <td><input type="text" name="val"></td>
                  </tr>
                  <tr> 
                    <td colspan="4"><input type="button" value="���ӹ���">
                      <input type="button" value="ɾ������"></td>
                  </tr>
                </table>
                </fieldset--></td>
            </tr>
          </table>
        </div>
      <%} else if ("0".equals(tab0)){%>
      	<div class="dialogtabcontent" style="height: 260px;"  id="tabcontent"> 
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr> 
            <td nowrap width="100" >�������ƣ�</td>
            <td><input type="text" name="projectName" value="<%=StringTools.isEmptyString(bj.getName())?("ҵ���ϼ�����"):bj.getName()%>" size=22>
              </td>
                          </tr>
                          <tr>
                            <td nowrap>
                              ���ȼ���
                            </td>
                            <td>
                              <input type="text" name="priority" value="<%= bj.getPriority() %>" size=4>
                            </td>
                          </tr>
                          <tr>
                            <td nowrap>
                              ��ȣ�
                            </td>
                            <td>
                              <input type="text" name="nd" value="<%= StringTools.isEmptyString(bj.getNd())? svNd: bj.getNd() %>" size=4>
                            </td>
                          </tr>
                          <tr>
                            <td colspan=2>
            	  <fieldset><legend><img src="/style/img/businessJunior/base_setting.png">��ע����</legend>
            		<textarea name="desc" style="width: 95%" rows="8"><%=StringTools.isEmptyString(bj.getDesc())?("ҵ���ϼ�����"):bj.getDesc()%></textarea>
            		</fieldset>
            	</td>
            </tr>
          </table>
          	</div>
      	<%}%>
      
      </td>
    </tr>

</table>
  </form>
<%
if(request.getParameter("showList") != null || 
	 request.getParameter("actionEvent_save")!=null){
%>
<script language="JavaScript">
	window.resizeTo(640,600);
</script>
<table height="200" width="100%" border="0" cellspacing="0" cellpadding="0"  name="listTable" id="listTable">
	<tr>
		<td>
			<iframe src="jsp/admin/bpList.jsp" name="listFrame" id="listFrame" frameborder=0 width=100% height=100%>
			</iframe>
		</td>
	</tr>
</table>
<%
}else{
	
%>
<script language="JavaScript">
	window.resizeTo(640,440);
</script>
<%}%>
</body>
</html>


<%@ page language="java" contentType="text/html;charset=GBK"%>
<%@page import ="com.anyi.gp.bean.RightBean"%>
<%@page import ="com.anyi.gp.meta.TableMeta"%>
<%@page import ="com.anyi.gp.meta.MetaManager"%>
<%@page import ="com.anyi.gp.pub.*"%>
<%@page import ="java.util.*"%>
<%@page import ="com.anyi.gp.taglib.components.Page"%>
<%@page import ="com.anyi.gp.Pub"%>

<%
	String webRoot = Page.LOCAL_RESOURCE_PATH + Pub.getWebRoot(request);
%>

<html>

<head>
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gbk">
<LINK href="script/applus.css" rel=stylesheet type=text/css>
<SCRIPT language="javascript" src="<%=webRoot%>/script/Community.js"></SCRIPT>
<SCRIPT language="VBScript" src="<%=webRoot%>/script/formenctype.vbs"></SCRIPT>
<script language="JavaScript" src="<%=webRoot%>/gp/pub/Information.js"></script>

<title>数值权限设置</title>
</head>
<style>
 .clsFieldContainer{
	font-family: MS Sans Serif;
	background-color: #FFFFFF;
	margin: 0px;
	padding: 0px;
	border-top-width: 1px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-top-color: silver;
	border-right-color: silver;
	border-bottom-color: silver;
	border-left-color: silver;
	overflow: hidden;
	position: relative;
        height: 180px;
        width: 480px;
        overflow: auto;
}
</style>
<body>
<form name="form1" method="post" action="">
<table width=100%>
 <tr>
  <td width=20>
  </td>
  <td>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" class="largest">
    <tr>
      <td style='font-family:MS Sans Serif;font-size:16px;font-weight: bold;'>数值权限设置：</td>
    </tr>
    <tr>
      <td align="left">
        <div class="clsFieldContainer">
<table id="Field_table" width=100% borderColor="#FFFFFF" style="font-size:12px">
<tr class="clsGridHeadRow" >
   <td style="background-color: #E8F4FF" align=center >
      字段名
   </td>
   <td style="background-color: #E8F4FF"  align=center>
      控制
   </td>
   <td style="background-color: #E8F4FF"  align=center>
      范围
   </td>
   <!--
   <td style="background-color: #E8F4FF"  align=center>
      关联授权
   </td>
   -->
</tr>
<%
try {
	String role = request.getParameter("role");
	String user = request.getParameter("user");
	String p_code = request.getParameter("p_code");
	String realcode = request.getParameter("realcode");

	if (role == null && user == null){
  	throw new Exception("role、user为空");
	}
	if(p_code == null){
  	throw new Exception("p_code为空");
	}
	if(realcode == null){
  	throw new Exception("realcode为空");
	}
	
  RightBean rightBean=new RightBean();
  rightBean.setRoleId(role);
  rightBean.setUserId(user);
  rightBean.setCompoId(p_code);
  rightBean.setFuncId(realcode);
  
  List rightArr = null;
  if(user != null && user.length() > 0){
  	rightArr = RightUtil.getUserNumLimList(user, realcode, p_code);
  }
	else{
  	rightArr = RightUtil.getRoleNumLimList(role, realcode, p_code);
  }
  String ctrlField, granRange, revoRange, isGrant, allowSelected, notAllowSelected, notDisSelected;
  String relationEnable="";
  boolean primaryKey=false;
  
  TableMeta tabMeta = MetaManager.getTableMetaByCompoName(p_code);
  List primaryKeyList=tabMeta.getKeyFieldNames();
//  for(int i=0;i<primaryKeyList.size();i++){
//       out.println((String)primaryKeyList.get(i) + "<br>");
//  }

  List fieldList=tabMeta.getSaveFieldNames();
  for(int i=0;i<fieldList.size();i++){
      ctrlField=(String)fieldList.get(i);
      granRange="";
      revoRange="";
      isGrant="";
      allowSelected="";
      notAllowSelected="";
      notDisSelected="";
      relationEnable="";
      for(int j=0;j<rightArr.size();j++){
        if (!ctrlField.equalsIgnoreCase(((RightBean) rightArr.get(j)).getCtrlField())){
           continue;
        }else{
            granRange = ((RightBean) rightArr.get(j)).getGranRange();
            granRange = granRange ==null ? "" : granRange;
            revoRange =((RightBean) rightArr.get(j)).getRevoRange();
            revoRange = revoRange==null ? "" : revoRange;
            isGrant = ((RightBean) rightArr.get(j)).getIsGrant();
            if (isGrant.equalsIgnoreCase("0")){
               allowSelected="Selected";
            }else if(isGrant.equalsIgnoreCase("1")) {
               notAllowSelected="Selected";
            }else if(isGrant.equalsIgnoreCase("2")) {
               notDisSelected="Selected";
            }
            break;
        }
      }%>
  <tr Id="<%=ctrlField%>">
   <td width=100>
      <%=LangResource.getInstance().getLang("C",ctrlField)%><!--<%=ctrlField%>-->
   </td>
   <td>
      <select name="control_<%=ctrlField%>" onchange="rangeDis('<%=ctrlField%>')">
         <option value="0" <%=allowSelected%>>0 允许</option>
         <option value="1" <%=notAllowSelected%>>1 禁止</option>
         <%primaryKey=primaryKeyList.contains(ctrlField);
           if (!primaryKey && realcode.equalsIgnoreCase("fwatch")){
           relationEnable="disabled";%>
           <option value="2" <%=notDisSelected%>>2 不可见</option>
         <%}%>
      </select>
   </td>
   <td>
      <%
      if (isGrant.equalsIgnoreCase("0")){%>
        <input type="text" name="range_<%=ctrlField%>" value="<%=granRange%>" onkeyup="enterRange('<%=ctrlField%>',<%=primaryKey%>)">
      <%if (granRange.length()==0) relationEnable="disabled";
        }else if(isGrant.equalsIgnoreCase("1")) {%>
         <input type="text" name="range_<%=ctrlField%>" value="<%=revoRange%>" onkeyup="enterRange('<%=ctrlField%>',<%=primaryKey%>)">
      <%if (revoRange.length()==0) relationEnable="disabled";
        }else if(isGrant.equalsIgnoreCase("2")){%>
        <input type="text" name="range_<%=ctrlField%>" value="" disabled="true" onkeyup="enterRange('<%=ctrlField%>',<%=primaryKey%>)">
      <%}else{%>
        <input type="text" name="range_<%=ctrlField%>" value="" onkeyup="enterRange('<%=ctrlField%>',<%=primaryKey%>)">
      <%relationEnable="disabled";
       }%>
       <img fieldname="<%=ctrlField%>" tablename="<%=p_code%>" treeview="false" id="<%=ctrlField%>IMGID"
         src="/style/img/main/search.gif" align="absbottom" class="foreignIMG"
         onclick="fSelect('<%=p_code%>','<%=ctrlField%>')" ></img>
   </td>
   <td>
   	<!--
      <input type="button" name="gorr_<%=ctrlField%>" value="关联按钮" onclick="frelationF('<%=ctrlField%>')" <%=relationEnable%>>
    -->  
      <input type="hidden" name="gorrValue_<%=ctrlField%>" value="">
      <input type="hidden" name="gorrCompo_<%=ctrlField%>" value="">
      <input type="hidden" name="noGorrValue_<%=ctrlField%>" value="">
      <input type="hidden" name="noGorrCompo_<%=ctrlField%>" value="">
   </td>
</tr>
<%}%>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</table>

<table width=90%>
<tr>
  <td align="center">
       <input name="savefunc" class="clsGeneralBtn" type="button" style="width:80;height:30" value="保存" id="savefunc" onclick="fsave()" value="保存">&nbsp;&nbsp;&nbsp;&nbsp;
       <input name="reset" class="clsGeneralBtn" style="width:80;height:30" type="reset" value="重置">
  </td>
</tr>
</table>

</form>
</body>
</html>
<script language="">
var fieldName;
var tableName = "<%=tabMeta.getName()%>";
var compoId = "<%=p_code%>";
var roleId = "<%=role%>";
var userId = "<%=user%>";
var funcId = "<%=realcode%>";
function fsave(){
   var target = document.all("Field_table");
   var ctrlField;
   var condition = "<delta>";
   for (i=1; i<target.rows.length; i++){
    condition += "<entity name=\"\">";
    ctrlField=target.rows(i).id;
//    if (document.getElementById("range_" + ctrlField).value.length>0 || document.getElementById("Control_" + ctrlField).value=="2" ){
      condition += "<field name=\"fieldname\" value=\""
               + ctrlField +"\"/>";
      condition += "<field name=\"grant\" value=\""
             + document.getElementById("Control_" + ctrlField).value +"\"/>";
      condition += "<field name=\"range\" value=\""
             + transString(document.getElementById("range_" + ctrlField).value) +"\"/>";
      condition += "<field name=\"gorr\" value=\""
             + document.getElementById("gorrValue_" + ctrlField).value +"\"/>";
      condition += "<field name=\"gorrCompo\" value=\""
             + document.getElementById("gorrCompo_" + ctrlField).value +"\"/>";
      condition += "<field name=\"noGorr\" value=\""
             + document.getElementById("noGorrValue_" + ctrlField).value +"\"/>";
      condition += "<field name=\"noGorrCompo\" value=\""
             + document.getElementById("noGorrCompo_" + ctrlField).value +"\"/>";
      condition += "</entity>";
//    }
    //alert(condition);
    //alert(document.getElementById("Control_" + ctrlField).value);
   }
   condition += "</delta>";
//   alert(condition);

   var names = new Array();
   var values = new Array();
   names[0] = "roleId";
   values[0] = "<%=role%>";
   names[1] = "funcId";
   values[1] = "<%=realcode%>";
   names[2] = "compoId";
   values[2] = "<%=p_code%>";
   names[3] = "delta";
   values[3] = condition;
   names[4] = "userId";
   values[4] = "<%=user%>";   

   top.right.changed = false;
   Info.frameSubmit("saveNumPriv", "all", names, values);
}

function rangeDis(ctrlField){
   if (document.all("Control_" + ctrlField).value==2){
      document.all("range_" + ctrlField).value="";
      document.all("range_" + ctrlField).disabled=true;
//      document.all("gorr_" + ctrlField).disabled=true;
   }else{
      document.all("range_" + ctrlField).disabled=false;
//      document.all("gorr_" + ctrlField).disabled=false;
   }
}
function enterRange(ctrlField,isPrimaryKey){
 //if (document.all("range_" + ctrlField).value.length>0 && isPrimaryKey){
 //   document.all("gorr_" + ctrlField).disabled=false;
 //}else{
 //   document.all("gorr_" + ctrlField).disabled=true;
 //}
}
</script>
<%
}catch (Exception ex) {
  out.print(ex.getMessage());
}
%>

<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.anyi.gp.pub.LangResource" %>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="java.util.*"%>
<html>
<head>
<title>产品注册和用户密钥生成器</title>
</head>
<style>
.clsNormCaption{
  font-family:宋体;
  font-size: 9pt;
  overflow: visible;
  vertical-align:middle;
  word-break:keep-all;
}
</style>
<script type="text/javascript">
<!--
    var productList = new Array();
	function validate(form) {
		var sn = form.sn.value;
		var companyName = form.companyName.value;
		var address = form.address.value;
		var postcode = form.postcode.value;
		var linkman = form.linkman.value;
		var linkTel = form.linkTel.value;
		var agentName = form.agentName.value;
		var coCount = form.coCount.value;
		var accCount = form.accCount.value;
		if (sn.length == 0
			|| companyName.length == 0
			|| address.length == 0
			|| postcode.length == 0
			|| linkman.length == 0
			|| linkTel.length == 0
			|| agentName.length == 0
			|| coCount.length == 0
			|| accCount.length == 0) {
			alert("请把带*号的选项填写完整！");
			form.sn.focus();
			return false;
		}

		var productString = "";
		for(var i = 0; i < productList.length; i++){
			var proCode = productList[i];
			if(form.all[proCode].checked){
				productString += form.all[proCode].value + ",";
			}
		}
		if(productString.length > 0){
			productString = productString.substring(0, productString.length - 1);
		}
		form.products.value = productString;
				
		return true;
	}
-->
</script>
<%
	List products = GeneralFunc.getAppNames();
	if(products != null){
		Iterator iterator = products.iterator();
		while(iterator.hasNext()){
			String proCode = (String)iterator.next();
			if(proCode.equals("style") || proCode.equals("admin") 
				|| proCode.equals("WFDesigner") || proCode.equals("AS")){
				iterator.remove();
			}
		}
	}
%>
<body>
<br>
<div align="center">
<font color="red" size="6pt">注意：此信息必须连接客户的服务器填写，否则将无效！</font>
</div>
<br>
<form action="createKey.action" method="POST" onsubmit="return validate(this)">
  <table border="0" cellspacing="5" cellpadding="0" align="center">
    <tr align="center">
      <td align="center" class="clsNormCaption" colspan="2">(带“<font color="red">*</font>”为必填项)</td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">加密狗序列号：
      </td>
      <td>
        <input name="sn" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>    
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;客户名称：
      </td>
      <td>
        <input name="companyName" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：
      </td>
      <td>
        <input name="address" maxlength="100" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮编：
      </td>
      <td>
        <input name="postcode" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;联系人：
      </td>
      <td>
        <input name="linkman" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;联系电话：
      </td>
      <td>
        <input name="linkTel" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">代理商名称：
      </td>
      <td>  
        <input name="agentName" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">购买单位数：
      </td>
      <td>  
        <input name="coCount" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">购买账套数：
      </td>
      <td>
        <input name="accCount" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;购买产品：
      </td>
      <td>
      	<table class="clsNormCaption">
        <%if(products != null){
        	LangResource lr = LangResource.getInstance();
        	for(int i = 0; i < products.size(); i++){
        	  String fullName = products.get(i) + "-" + lr.getLang((String)products.get(i));
        	  if(i%2 == 0){
        %>
        	<tr>
        	<%} %>
        	<script type="text/javascript">
        		productList[productList.length] = "<%=products.get(i)%>";
        	</script>
        	<td>
        		<input type="checkbox" name="<%=products.get(i)%>" value="<%=fullName%>" maxlength="50"><%=fullName%>
        	</td>
        	<% if(i%2 == 1){%>
        	</tr>
        <%	 }
        	} 
          } %>
          	</tr>
          </table>
      </td>
    </tr>                
    <tr>
      <td></td>
      <td>
        <table>
          <tr>
            <td align="right"><input type="submit" value="生成密钥文件">
            </td>
            <td align="left"><input type="reset" value="清空">
            </td>
          </tr>
       </table>   
      </td>
    </tr>
  </table>
  <input type="hidden" name="products" value="">
</form>
</body>
</html>
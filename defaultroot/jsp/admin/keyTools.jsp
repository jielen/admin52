<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.anyi.gp.pub.LangResource" %>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="java.util.*"%>
<%@page import="com.anyi.gp.license.LicenseManager"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>

<%@page import="com.anyi.gp.license.RegisterTools"%>
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
	function validate() {
		var sn = document.getElementById("sn1").value;
		var companyName = document.getElementById("companyName1").value;
		var address = document.getElementById("address1").value;
		var postcode = document.getElementById("postcode1").value;
		var linkman = document.getElementById("linkman1").value;
		var linkTel = document.getElementById("linkTel1").value;
		var agentName = document.getElementById("agentName1").value;
		var coCount = document.getElementById("coCount1").value;
		var accCount = document.getElementById("accCount1").value;
		var encodeType = "0";
		if (document.getElementById("encodeType2").checked) encodeType = "1"; 
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
			if(document.getElementById(proCode).checked){
				productString += document.getElementById(proCode).value + ",";
			}
		}
		if(productString.length > 0){
			productString = productString.substring(0, productString.length - 1);
		}
		form.products.value = productString;
		form.sn.value = sn;
		form.coCount.value = coCount;
		form.accCount.value = accCount;
		form.encodeType.value = encodeType;
		form.linkTel.value = linkTel;
		form.postcode.value = postcode;
		form.companyName.value = companyName;
		form.address.value = address;
		form.linkman.value = linkman;
		form.agentName.value = agentName;
		form.submit();
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

  <table border="0" cellspacing="5" cellpadding="0" align="center">
    <tr align="center">
      <td align="center" class="clsNormCaption" colspan="2">(带“<font color="red">*</font>”为必填项)</td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">加密狗序列号：
      </td>
      <td>
        <input id="sn1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>    
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;客户名称：
      </td>
      <td>
        <input id="companyName1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址：
      </td>
      <td>
        <input id="address1" maxlength="100" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮编：
      </td>
      <td>
        <input id="postcode1" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;联系人：
      </td>
      <td>
        <input id="linkman1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;联系电话：
      </td>
      <td>
        <input id="linkTel1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">代理商名称：
      </td>
      <td>  
        <input id="agentName1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">购买单位数：
      </td>
      <td>  
        <input id="coCount1" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">购买账套数：
      </td>
      <td>
        <input id="accCount1" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
    	
      <td align="right" class="clsNormCaption">加密方式：
      </td>
      <td>
        <input type="radio" id="encodeType1" name="encodeType1" value="0" checked/>硬加密
        <input type="radio" id="encodeType2" name="encodeType1" value="1"/>软加密
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
        		<input type="checkbox" name="<%=products.get(i)%>" value="<%=products.get(i)%>" maxlength="50"><%=fullName%>
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
            <td align="right"><input type="button" value="生成密钥文件" onclick="javascript:validate();">
            </td>
            <td align="left"><input type="reset" value="清空">
            </td>
          </tr>
       </table>   
      </td>
    </tr>
  </table>
  <input type="hidden" name="products" value="">

<table border="0" cellspacing="5" cellpadding="0" align="center">
	  <tr align = "center">
	  	<td><font color="red" size="5pt">A++产品注册说明</font></td>
	  </tr>
		<tr>
			<td>
				1、渠道成员对已购的A++成品，需要注册后方可使用。
		  </td>	
		</tr>
		<tr>
			<td>
				2、渠道成员购买产品后，启动产品安装，在产品安装盘的"DOC/产品注册"目录下找到《用户注册登记表》并填写。
		  </td>	
		</tr>
		<tr>
			<td>
				3、除在产品上填写《用户注册登记表》，发邮件给总部营销服务部外，还应将用户注册登记表打印，由客户方、服务商分别加盖公章，发传真到总部营销服务部。
		  </td>	
		</tr>
		<tr>
			<td>
				4、经营销部核实后，将《用户注册登记表》发给生产部。
		  </td>	
		</tr>
		<tr>
			<td>
				5、生产部接到《用户注册登记表》后，给渠道成员发出相应产品的注册码。
		  </td>	
		</tr>
		<tr>
			<td>
				6、A++产品第二年注册，同样执行上述流程。以后每年注册都按同样流程执行。
		  </td>	
		</tr>
</table>
<form name="form" style="display:none" action="createKey.action" method="POST" >
	<input name="sn" />
	<input name="companyName" />
	<input name="address" />
	<input name="postcode" />
	<input name="linkman" />
	<input name="linkTel" />
	<input name="agentName" />
	<input name="coCount" />
	<input name="accCount" />
	<input name="encodeType" />
	<input name="products" />
</form>
</body>
</html>
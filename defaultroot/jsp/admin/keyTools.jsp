<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.anyi.gp.pub.LangResource" %>
<%@page import="com.anyi.gp.pub.GeneralFunc"%>
<%@page import="java.util.*"%>
<%@page import="com.anyi.gp.license.LicenseManager"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>

<%@page import="com.anyi.gp.license.RegisterTools"%>
<html>
<head>
<title>��Ʒע����û���Կ������</title>
</head>
<style>
.clsNormCaption{
  font-family:����;
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
			alert("��Ѵ�*�ŵ�ѡ����д������");
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
<font color="red" size="6pt">ע�⣺����Ϣ�������ӿͻ��ķ�������д��������Ч��</font>
</div>
<br>

  <table border="0" cellspacing="5" cellpadding="0" align="center">
    <tr align="center">
      <td align="center" class="clsNormCaption" colspan="2">(����<font color="red">*</font>��Ϊ������)</td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">���ܹ����кţ�
      </td>
      <td>
        <input id="sn1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>    
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;�ͻ����ƣ�
      </td>
      <td>
        <input id="companyName1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��ַ��
      </td>
      <td>
        <input id="address1" maxlength="100" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;�ʱࣺ
      </td>
      <td>
        <input id="postcode1" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;&nbsp;&nbsp;��ϵ�ˣ�
      </td>
      <td>
        <input id="linkman1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;��ϵ�绰��
      </td>
      <td>
        <input id="linkTel1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">���������ƣ�
      </td>
      <td>  
        <input id="agentName1" maxlength="50" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">����λ����
      </td>
      <td>  
        <input id="coCount1" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">������������
      </td>
      <td>
        <input id="accCount1" maxlength="10" size="40"> <font color="red">*</font>
      </td>
    </tr>
    <tr>
    	
      <td align="right" class="clsNormCaption">���ܷ�ʽ��
      </td>
      <td>
        <input type="radio" id="encodeType1" name="encodeType1" value="0" checked/>Ӳ����
        <input type="radio" id="encodeType2" name="encodeType1" value="1"/>�����
      </td>
    </tr>
    <tr>
      <td align="right" class="clsNormCaption">&nbsp;&nbsp;�����Ʒ��
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
            <td align="right"><input type="button" value="������Կ�ļ�" onclick="javascript:validate();">
            </td>
            <td align="left"><input type="reset" value="���">
            </td>
          </tr>
       </table>   
      </td>
    </tr>
  </table>
  <input type="hidden" name="products" value="">

<table border="0" cellspacing="5" cellpadding="0" align="center">
	  <tr align = "center">
	  	<td><font color="red" size="5pt">A++��Ʒע��˵��</font></td>
	  </tr>
		<tr>
			<td>
				1��������Ա���ѹ���A++��Ʒ����Ҫע��󷽿�ʹ�á�
		  </td>	
		</tr>
		<tr>
			<td>
				2��������Ա�����Ʒ��������Ʒ��װ���ڲ�Ʒ��װ�̵�"DOC/��Ʒע��"Ŀ¼���ҵ����û�ע��ǼǱ�����д��
		  </td>	
		</tr>
		<tr>
			<td>
				3�����ڲ�Ʒ����д���û�ע��ǼǱ������ʼ����ܲ�Ӫ�������⣬��Ӧ���û�ע��ǼǱ��ӡ���ɿͻ����������̷ֱ�Ӹǹ��£������浽�ܲ�Ӫ�����񲿡�
		  </td>	
		</tr>
		<tr>
			<td>
				4����Ӫ������ʵ�󣬽����û�ע��ǼǱ�������������
		  </td>	
		</tr>
		<tr>
			<td>
				5���������ӵ����û�ע��ǼǱ��󣬸�������Ա������Ӧ��Ʒ��ע���롣
		  </td>	
		</tr>
		<tr>
			<td>
				6��A++��Ʒ�ڶ���ע�ᣬͬ��ִ���������̡��Ժ�ÿ��ע�ᶼ��ͬ������ִ�С�
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
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/applus" prefix="applus"%>

<html>
<head>
<title></title>

<applus:include language="javascript">
script.AS.Business;
</applus:include>

<script>
function ok(){
  if (prompt("��������ɿ���:", "")!= "older-lei"){
    alert("�Բ���,������Ŀ����ȷ.");
    return;
  }
  var vavRet= Busi.carryBasicInfo("2006", "3000");
  if (vavRet[0]){
    alert("��ת�ɹ�!")
  }else{
    alert("��תʧ��!\n"+ vavRet[1]);
  }
}
</script>

</head>

<body class="clsPageBody">

<applus:init>
</applus:init>


<table border="1" width="100%" style="font-size:11pt;">
  <tr>
    <td width="100%" align="center">

<p>��</p>
<p>Basic Information Carry Forward Test</p>
<p>2006 --&gt; 3000</p>
<p><input type="button" value=" ȷ�� " name="OKBtn" onclick="ok();"></p>

    </td>
  </tr>
</table>

</body>
</html>



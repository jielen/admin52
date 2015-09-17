<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus"%>
<HTML>
<HEAD>
<SCRIPT language="javascript" src="gp/page/Head.js"></SCRIPT>
<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
<SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
<script language="javascript">
function uploadLicense(str){
  //read file    
  if (str == null || str.value == "") {
    alert("请选择文件！");
    return false;
  }
  //debugger;
  var fileNameStr = str.value;
  var fileName = fileNameStr.replace(/\\/g,"\\\\");
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var ts = fso.OpenTextFile(fileName, 1);
  var license = "";  
  while (!ts.AtEndOfStream) {
   license += ts.ReadLine(); 
  }
  ts.close();
  //do request
  var names = new Array();
  var values = new Array();
  names[0] = "text";
  values[0] = license;
  var com = getCommunity();
  if (com != null){
    com.doRequest("uploadLicense","all",names,values,"ok"); 
  }  
}

function ok(result){
  alert(result.childNodes[0].nodeValue);	
}
</script>
</HEAD>

<body BACKGROUND='/style/img/main/graybg.jpg'  style="font:14">
<form method='post' action='listpagetodbs' enctype='multipart/form-data'>
<div style='color:#0000FF'>请选择license文件：</div>
<input type='file' id='filename' size=40><br>
<input type='button' value='上传' onclick="uploadLicense(filename);"><br>
</form>
</body>
</HTML>
<%@page contentType="text/html;charset=GBK"%><%@page
 import="java.util.*, com.anyi.gp.pub.*, com.anyi.gp.access.*,com.anyi.gp.workflow.*"%>
<html>
<head>
<title>选择桌面批处理设置用户</title>
<LINK href="<%=request.getContextPath()%>/script/applus.css" rel="stylesheet" type="text/css"></LINK>
<SCRIPT language="javascript" src="<%=request.getContextPath()%>/script/page.js"></SCRIPT>
<SCRIPT language="javascript"><!--
function initPage() {
  var userListE=document.getElementById("U_EXECUTOR_LIST");
  var destin=document.getElementById("EXECUTOR_LIST");
  if (userListE != null){
    listFillToSelect(userListE,destin);
  }
  if (window.dialogArguments) {
    var data = window.dialogArguments;
    System.NEXT_EXECUTOR_LIST.options.length = 0;
    stringToSelect(data.NEXT_EXECUTOR, System.NEXT_EXECUTOR_LIST);
  }
}

function PageData() {
  // TODO: 判断是否重复，过滤无效用户名
  this.NEXT_EXECUTOR = selectToString(System.NEXT_EXECUTOR_LIST);
  this.NEXT_EXECUTOR_NAME = selectTextToString(System.NEXT_EXECUTOR_LIST);
}

// <import>

function trim(str)
{
  var i;
	for(i = 0 ; i<str.length && str.charAt(i)==" " ; i++ )
	  ;
	return str.substring(i, str.length);
}

function stringToSelect(str,field)
{
  var vjExecutorOptions= document.getElementById("EXECUTOR_LIST");

	for(var  beg=0 ; beg < str.length ; beg = end+1)
	{
		if(-1 == (end = str.indexOf(",",beg)))
		  end = str.length;
		var entry = trim(str.substring(beg,end));
		if(entry!="")
		{
		  //leidh;20040622;
      for (var x= 0; x< vjExecutorOptions.length; x++)
		  {
		    if (vjExecutorOptions.item(x).value!= entry) continue;
        var des=document.createElement("OPTION");
        des.text=vjExecutorOptions.item(x).text;
        des.value=entry;
        field.add(des);
		  }
//		  field.options.add(document.createElement("OPTION"));
//		  var viIndex= field.options.length- 1;
//		  field.options[viIndex].value = entry;
//	    field.options[viIndex].text = entry;
//		  for (var x= 0; x< vjExecutorOptions.length; x++)
//		  {
//		    if (vjExecutorOptions.item(x).value!= entry) continue;
//		    field.options[viIndex].text = vjExecutorOptions.item(x).text;
//		    break;
//		  }
		  //field.options[field.options.length++].text = entry;
		}
	}
}


function selectToString(field)
{
	if (field.length!=0)
	{
	var str = "";
	var i;
	for(i=0 ; i < field.options.length-1 ; i++)
		str += field.options[i].value + ",";
	return str += field.options[i].value;
	}
	else return "";
}

function selectTextToString(field)
{
	if (field.length!=0)
	{
	var str = "";
	var i;
	for(i=0 ; i < field.options.length-1 ; i++)
		str += field.options[i].text + ",";
	return str += field.options[i].text;
	}
	else return "";
}

function AddClick(field) {
  var sel = System.EXECUTOR_LIST;
  if (sel.selectedIndex == -1)
    return;
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].selected) {
      var sText = sel.options[i].text;
      var sID = sel.options[i].value;
      // 判断是否重复
      if (!findDup(sID))
        field.options[field.options.length] = new Option(sText,sID);
    }
  }
}

function findDup(s) {
  var i;
  var sel = System.NEXT_EXECUTOR_LIST;
  for (i = 0; i < sel.options.length; i++)
    if (s == sel.options[i].value)
      return true;
  sel = System.NEXT_EXECUTOR_LIST;
  for (i = 0; i < sel.options.length; i++)
    if (s == sel.options[i].value)
      return true;
  return false;
}

function RemoveClick(field)
{
	if (field.length != 0 && field.selectedIndex != -1) {
		for(var i=field.options.length - 1; i >= 0; i--)
			{
				if (field.options[i].selected)
					{
						field.options.remove(i);
					}
			}
	}
}

function RemoveAllClick()
{
    System.NEXT_EXECUTOR_LIST.options.length = 0;
}
 function listFillToSelect(sourceSpan,destin){

      var userList = sourceSpan.childNodes;
      for (var m = 0, n = userList.length; m < n; m++){
        id = userList.item(m).getAttribute("id");
        value = userList.item(m).getAttribute("value");
        var des=document.createElement("OPTION");
        des.text=value;
        des.value=id.substring(2, id.length);
        destin.add(des);
      }
}
function listChange() {
  while(System.EXECUTOR_LIST.options.length > 0){
    try{
     System.EXECUTOR_LIST.options.remove(0);
    } catch(e){
    }
  }
  var srcList=System.Select1.value + "_EXECUTOR_LIST";
  var srcListE=document.getElementById(srcList);
  if (System.Select1.value=="U") {
     document.all("listDept").style.display="none";
     destin=document.all("EXECUTOR_LIST");
     removeAllFromSelect(destin);
     listFillToSelect(srcListE,destin);
  }else{
     document.all("listDept").style.display="";
     destin=document.all("Select2");
     removeAllFromSelect(destin);
     listFillToSelect(srcListE,document.all("Select2"));
     if (document.all("Select2").options.length>0){
        loadUserList(System.Select1.value,document.all("Select2").options(0).value);
     }
  }
}
function removeAllFromSelect(destin){
  destin.options.length = 0;
}
function loadUserList(type,id){
  //alert(type + ":" + id);
  var xmlDoc = document.all.XML_User.XMLDocument;
  xmlDoc.async = false;
  xmlDoc.resolveExternals = false;
  xmlDoc.load("/applus/jsp/platform/userListXml.jsp?type=" + type + "&id=" + id);
  refreshUserList();
}
function refreshUserList(){
  destin=document.all("EXECUTOR_LIST");
  removeAllFromSelect(destin);
  var rs = document.all.XML_User.recordset;
  if (rs==null){
     return;
  }
  if (!rs.EOF && !rs.BOF){
    if (rs.Fields.Count > 1){
    while (!rs.EOF){
      var des=document.createElement("OPTION");
      des.text=rs("USER_NAME");
      des.value=rs("USER_ID");
      destin.add(des);
      rs.MoveNext;
    }
    }
  }
}
function selectAllClick(){
  var sel = System.EXECUTOR_LIST;
  for (var i = 0; i < sel.options.length; i++) {
    sel.options[i].selected=true;
  }
}
-->
</SCRIPT>
</head>
<body onload="initPage()" leftMargin="0" rightMargin="0" topMargin="0">
<%=WFGeneral.getUserViewStr()%>
<form name="System" method="POST" action="">

<table border="0" width=100% cellpadding="0" cellspacing="0" >
  <tr>
    <td  background="/style/img/main/editcontentmidbk.jpg" height=19 width=100%>&nbsp;</td>
  </tr>
  <tr>
     <td >
         <table cellpadding="0" cellspacing="0" border=0>
          <tr>
             <td width=90%>
             </td>
             <td><img src="/style/img/func/left_behind.gif"></td>
              <td background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
                <input type="button" name="Ok"  class="clsListCall" value="确定"
                  onclick="dlgonclickOk()"></input>
             <td><img src="/style/img/func/right_behind.gif"></td>
             <td><img src="/style/img/func/left_behind.gif"></td>
              <td background="/style/img/func/mid_behind.jpg" valign=center align=center nowrap>
                <input type="button" name="Cancel"  class="clsListCall" value="取消"
                  onclick="dlgonclickCancel()"></input>
              </td>
             <td><img src="/style/img/func/right_behind.gif"></td>
             <td width=2>&nbsp;&nbsp;&nbsp;</td>
          </tr>
        </table>
     <td>
  </tr>
</table>
<table>
  <tr>
    <td height="20"></td>
  </tr>
</table>
<TABLE id="Table1" cellSpacing="1" cellPadding="1" border="0">
<!--
  <TR>
    <TD width="50">查找:</TD>
    <TD>
      <p><input type="text" name="T1" size="20"></p>
    </TD>
    <TD></TD>
  </TR>
-->
  <TR>
    <TD width="50">类别:</TD>
    <TD><SELECT id="Select1" name="Select1" size="1"
      style="WIDTH:150px" onChange="listChange()">
        <OPTION selected value="U">人员</OPTION>
      </SELECT>
    <TD></TD>
  </TR>
  <TR id="listDept" style="display:none">
    <TD width="50">列表:</TD>
    <TD><select id="Select2" style="WIDTH:150px" onChange="loadUserList(document.all.Select1.value,this.value)"></select></TD>
    <TD></TD>
  </TR>
  <TR>
    <TD width="50"></TD>
    <TD valign="top"><SELECT multiple size="17" name="EXECUTOR_LIST"
      style="WIDTH:150px">
      </SELECT></TD>
    <TD valign="top">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td valign="top" align="right"><input type="button" name="B1"
            value="用户名: -&gt;" onclick="AddClick(form.NEXT_EXECUTOR_LIST)"></input>
            <br><input type="button" name="B2"
            value="&lt;--" onclick="RemoveClick(form.NEXT_EXECUTOR_LIST)"></input>
            <br><br><input type="button" name="B5"
            value="全部选择" onclick="selectAllClick()">
            <br><input type="button" name="B5"
            value="全部删除" onclick="RemoveAllClick()"></td>
          <td><SELECT multiple size="16" name="NEXT_EXECUTOR_LIST" style="WIDTH:150px">
            </SELECT>
          </td>
        </tr>
<!--
        <tr>
          <td valign="top" align="right"><input type="button" name="B3"
            value="辅办: -&gt;" onclick="AddClick(form.NEXT_EXECUTOR2_LIST)">
            <br><input type="button" name="B4"
            value="&lt;--" onclick="RemoveClick(form.NEXT_EXECUTOR2_LIST)">
            <br><br><input type="button" name="B5"
            value="全部选择" onclick="selectAllClick()">
            <br><input type="button" name="B5"
            value="全部删除" onclick="RemoveAllClick()"></td>
          <td><SELECT multiple size="9" name="NEXT_EXECUTOR2_LIST" style="WIDTH:150px">
            </SELECT>
          </td>
        </tr>
-->
      </table>
    </TD>
  </TR>
</TABLE>
<XML ID="XML_User">
</XML>
<div id="userListDiv">
</div>
</form>
</body>
</html>

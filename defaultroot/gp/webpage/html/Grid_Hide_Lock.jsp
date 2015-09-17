<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/applus" prefix="applus"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>表头锁定及隐藏</title>

<applus:include language="javascript">
gp.page.Tabstrip;
gp.webpage.script.Grid_Hide_Lock;
</applus:include>
</head>

<body class="clsPageBody">

<applus:init>
  _oGrid_Hide_Lock.init();
</applus:init>


<applus:tabstrip id="Hide_Lock_Sort_Tabstrip"
                 orientation="up"
                 style="position:relative; left:10px; top:10px; width:300px; height:300px;"
                 >
  <applus:tab id="hidetab" caption="隐藏列设置">
  </applus:tab>
  <applus:tab id="locktab" caption="锁定列设置">
  </applus:tab>
  <applus:tab id="sorttab" caption="排序列设置">
<table id="SortTabTable" border="0" width="37%" style="font-size: 9pt" height="61">
  <tr>
    <td width="33%" height="14">
    源字段：
    </td>
    <td width="33%" height="14">
    </td>
    <td width="34%" height="14">
    目标字段：
    </td>
  </tr>
  <tr>
    <td width="33%" height="71"><select size="9" id="FromFieldSelect" style="width: 120; height: 200; font-size:9pt;" ondblclick="_oGrid_Hide_Lock.selectField();"></select></td>
    <td width="33%" height="71"><input type="button" value=" -&gt; " id="SelectButton" style="border-width:1px" onclick="_oGrid_Hide_Lock.selectField();">
    <br>
    <br>
    <input type="button" value=" &lt;- " id="ReselectButton" style="border-width:1px" onclick="_oGrid_Hide_Lock.ReselectField();">
    </td>
    <td width="34%" height="71"><select size="9" id="ToFieldSelect" style="width: 120; height: 200; font-size:9pt;" ondblclick="_oGrid_Hide_Lock.ReselectField();"></select></td>
  </tr>
  <tr>
    <td width="100%" colspan="3" style="vertical-align: top; font-size:9pt;" height="1">
    排序方向：<select size="1" id="SortDirection" style="font-size: 9pt">
    <option selected value="true">升序</option>
    <option value="false">降序</option>
    </select>
    </td>
  </tr>
</table>
  </applus:tab>
</applus:tabstrip>

<div id="DisCardOrNot" style="position:absolute; left:97; top:320; width:160; height:20">
  是否显示卡片
  <input id="yes" type="radio" value="Y" name="carddis">是
  <input id="no" type="radio" value="N" name="carddis">否
</div>

<div style="position:absolute; left:120; top:350; width:160; height:20">
<input type="button" value=" 确定 " name="ok" style="font-size: 9pt; border-style: solid; border-width: 1" onclick="_oGrid_Hide_Lock.ok()">
<input type="button" value=" 取消 " name="cancel" style="font-size: 9pt; border-style: solid; border-width: 1" onclick="_oGrid_Hide_Lock.cancel()">
</div>

<applus:endpage />
</body>
</html>


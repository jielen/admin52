<%@ page contentType="text/html; charset=GBK" %>
<%@ page language="java" %>
<%@page import="com.anyi.gp.pub.SessionUtils"%>
<html>
<%
	String webRoot = request.getContextPath();
%>
<head>
<LINK href="<%=webRoot%>/script/applus_new.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=webRoot%>/script/tree/fonts-min.css" />
<link rel="stylesheet" type="text/css" href="<%=webRoot%>/script/tree/treeview.css" />
<script type="text/javascript" src="<%=webRoot%>/script/tree/yahoo-min.js"></script>
<script type="text/javascript" src="<%=webRoot%>/script/tree/event-min.js"></script>
<script type="text/javascript" src="<%=webRoot%>/script/tree/treeview-min.js"></script>
<SCRIPT language="javascript" src="<%=webRoot%>/script/Community.js"></SCRIPT>
<SCRIPT language="javascript" src="<%=webRoot%>/script/General.js"></SCRIPT>
<SCRIPT language="javascript" src="<%=webRoot%>/gp/pub/PublicFunction.js"></SCRIPT>
<SCRIPT language="VBScript" src="<%=webRoot%>/script/formenctype.vbs"></SCRIPT>
<title>�û���ҳ�涨��</title>
</head>
<%
  String token = (String) SessionUtils.getToken(request);
  if(token == null){
  	token = "";
  }
	String groupId = request.getParameter("groupId");
	String groupName = request.getParameter("groupName");
	if(groupName == null) groupName = "";
%>
<body onload="pageInit();" leftmargin="20" rightmargin="20" topmargin="50">
	<div id="menuTreeDiv" style="display:block;margin:0;padding:0;width:28%;float:left;">
	</div>
	<div style="width=90%;font-weight: bold;" id="selectedNodeInfo">��ǰ�༭�Ľ�㣺<%=groupName%></div>
	<div><hr></div>	
	<div id="editPageDiv" style="display:block;margin:0;padding:0;width:70%;float:right;">
		<div style="border: 0px solid #959595;width=90%">
			<div style="font-weight: bold;">������ҳ��</div>
			<table>
				<tr>
					<td>���ҳ������</td>
					<td><input type="text" size="30" name="add_page_name"/></td>
					<td><input name="bt_add_page_name" type="button" value="����" onclick="addNewPage();"/></td>
				</tr>
			</table>
		</div>
		<div style="width=90%">
			<hr>
		</div>
		<div style="border:0px solid #959595;width=90%">
			<div style="font-weight: bold;">������ҳ�����ʾ����</div>
			<table>
				<tr>
					<td>
						<select name="pageItems" size="15">
						</select>
					</td>
					<td>
						<a style="cursor:hand;" name="bt_up_page" onclick="moveUpPageItem()">����</a><br>
						<a style="cursor:hand;" name="bt_down_page" onclick="moveDownPageItem()">����</a><br>
						<a style="cursor:hand;" name="bt_delete_page" onclick="deletePageItem()">ɾ��</a><br>
					</td>
				</tr>
			</table>
			<input type="button" name="bt_update_page_index" value="������ʾ����" onclick="updatePageItemIndex();"/>
		</div>
	</div>
	
	<div id="editMenuDiv" style="display:none;margin:0;padding:0;width:70%;float:right;">
		<div style="border: 0px solid #959595;width=90%">
			<div style="font-weight: bold;">���Ʋ˵���Ϣ</div>
			<table>
				<tr>
					<td>��ӷ�����</td>
					<td><input type="text" size="30" name="add_node_name"/></td>
					<td><input type="button" name="bt_add_node_name" value="���"/ onclick="addNewNode();"></td>
				</tr>
				<tr>
					<td>���ķ���������</td>
					<td><input type="text" size="30" name="change_node_name"/></td>
					<td><input type="button" name="bt_change_node_name" value="����"/ onclick="changeNodeName();"></td>
				</tr>
				<tr>
					<td>ɾ��������</td>
					<td><input type="button" name="bt_delete_node_name" value="ɾ��������"/ onclick="deleteNode();"></td>
					<td></td>
				</tr>
			</table>
		<div style="width=90%">
			<hr>
		</div>
		<div style="font-weight: bold;">��Ӳ���</div>
			<table>	
				<tr>
					<td>��ѡ���Ʒ����</td>
					<td>
						<select name="compoStyles" width="50" onchange="queryCompo()">
							<option selected>---------------</option>
						</select>
					</td>
				</tr>			
				<tr>
					<td>��ѡ�񲿼�</td>
					<td>
						<select name="compoItems" width="50" onchange="changeCompoItem()">
							<option selected>---------------</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>��������</td>
					<td><input type="text" size="30" name="compo_name"/></td>
				</tr>
				<tr>
					<td>�Ƿ����´��ڴ�</td>
					<td>
						<select name="is_always_new" width="50">
							<option value="N" selected>��</option>
							<option value="Y">��</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>�Ƿ��ڲ˵�����ʾ</td>
					<td>
						<select name="is_in_menu" width="50">
							<option value="N">��</option>
							<option value="Y" selected>��</option>
						</select>
					</td>
				</tr>				
				<tr>
					<td>�Ƿ�򿪵��༭ҳ��</td>
					<td>
						<select name="is_goto_edit" width="50">
							<option value="N" selected>��</option>
							<option value="Y">��</option>
						</select>
					</td>
				</tr>				
				<tr>
					<td>����URL��ַ</td>
					<td><input type="text" size="30" name="compo_url"/></td>
				</tr>				
				<tr>
					<td><input type="button" name="bt_add_compo" value="��Ӳ���"/ onclick="addNewCompo();"></td>
				</tr>												
			</table>
		</div>
		<div style="width=80%">
			<hr>
		</div>
		<div id="impExpMenu" style="display:none; border: 0px solid #959595;width=90%">
			<div style="font-weight: bold;">����\�����˵���Ϣ</div>
			<textarea cols="77" rows="10" name="menuinfo"></textarea>
			<br>
			<input type="button" name="bt_imp_menuInfo0" value="���ļ�����"/ onclick="impMenuInfoFromFile();">
			<input type="button" name="bt_imp_menuInfo1" value="����"/ onclick="impMenuInfo();">
			<input type="button" name="bt_exp_menuInfo" value="����"/ onclick="expMenuInfo();">
		</div>
	</div>
	
	<div id="editCompoDiv" style="display:none;margin:0;padding:0;width:70%;float:right;">
		<div style="border: 0px solid #959595;width=90%">
			<div style="font-weight: bold;">�༭����</div>
				<table>
					<tr>
						<td>��������</td>
						<td><input type="text" size="30" name="e_compo_name"/></td>
					</tr>
					<tr>
						<td>�Ƿ��ڲ˵�����ʾ</td>
						<td>
							<select name="e_is_in_menu" width="50">
								<option value="N">��</option>
								<option value="Y" selected>��</option>
							</select>
						</td>
					</tr>					
					<tr>
						<td>�Ƿ����´��ڴ�</td>
						<td>
							<select name="e_is_always_new" width="50">
								<option value="N" selected>��</option>
								<option value="Y">��</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>�Ƿ�򿪵��༭ҳ��</td>
						<td>
							<select name="e_is_goto_edit" width="50">
								<option value="N" selected>��</option>
								<option value="Y">��</option>
							</select>
						</td>
					</tr>				
					<tr>
						<td>����URL��ַ</td>
						<td><input type="text" size="30" name="e_compo_url"/></td>
					</tr>				
					<tr>
						<td><input type="button" name="bt_update_compo" value="���²���"/ onclick="updateCompo();"></td>
						<td><input type="button" name="bt_delete_compo" value="ɾ������"/ onclick="deleteCompo();"></td>
					</tr>												
			</table>			
		</div>
	</div>
	
</body>
</html>

<SCRIPT language="javascript">
	var TOKEN = '<%=token%>';
	var tree = new YAHOO.widget.TreeView("menuTreeDiv");
	var currentNode = null;
	var groupId = '<%=groupId%>';
	var groupName = '<%=groupName%>';
	var pageItems = document.getElementById("pageItems");
	var compoItems = document.getElementById("compoItems");
	var compoStyles = document.getElementById("compoStyles");
	var selectedNodeInfo = document.getElementById("selectedNodeInfo");
	var menu = new ActiveXObject("Scripting.Dictionary");
	var compoList = null;
	
	/**
	* ҳ���ʼ��
	*/
	function pageInit(){
		var vasNames = new Array();
 		var vasValues = new Array();
 		vasNames[0] = "groupId";
 		vasValues[0] = groupId;
 		vasNames[1] = "isHtml";
 		vasValues[1] = "false";
 		var topMenu = requestData2("getTopMenu", "all", vasNames, vasValues);
 		
 		
 		var rootObj = {code:"root",label:groupName, type:"page"};
 		var root = new YAHOO.widget.TextNode(rootObj, tree.getRoot(), true);	
 		currentNode = root;
 		if(topMenu){
 			var childNodes = topMenu.childNodes;
 			for(var i = 0; i < childNodes.length; i++){
 				var entity = childNodes[i];
 				var fieldNodes = entity.childNodes;
 				if(fieldNodes.length > 1){
 					var code = fieldNodes[0].getAttribute("value");
 					var label = fieldNodes[1].getAttribute("value");
 					var tempObj = {code:code, label:label, type:"page"};
 					var tmpNode = new YAHOO.widget.TextNode(tempObj, root, false);								
 					
 					var opt = new Option(label, code);
 					pageItems.options[pageItems.options.length] = opt;
 				}	
 			}
 		}
 		
 		tree.subscribe("labelClick", labelClick); 
 		tree.draw();
 		queryCompoStyle();
 		
 		//���ð�ť������admin��sa�û���ֻ�ܵ���
 		if(groupId == "admin" || groupId == "sa"){
 			document.all.bt_up_page.disabled = true;
 			document.all.bt_down_page.disabled = true;
 			document.all.bt_delete_page.disabled = true; 			 			
 			document.all.bt_update_page_index.disabled = true;
 			document.all.bt_update_compo.disabled = true;
 			document.all.bt_imp_menuInfo1.disabled = true;
 			document.all.bt_imp_menuInfo0.disabled = true;
 			document.all.bt_delete_node_name.disabled = true;
 			document.all.bt_delete_compo.disabled = true;
 			document.all.bt_change_node_name.disabled = true;
 			document.all.bt_add_node_name.disabled = true;
 			document.all.bt_add_page_name.disabled = true;
 			document.all.bt_add_compo.disabled = true;
 			
 		}
	}
	
	/**
	 * ������¼�
	 */
	function labelClick(node){
		selectedNodeInfo.innerHTML = "��ǰ�༭�Ľ�㣺" + node.data["label"];
		
		currentNode = node;
		document.all.add_page_name.value = "";
		document.all.add_node_name.value = "";
		document.all.change_node_name.value = "";
		var iCode = node.data["code"];
		var iType = node.data["type"];
		
		if("root" == iCode){
		  document.getElementById("editPageDiv").style.display = "block";
		  document.getElementById("editMenuDiv").style.display = "none";
		  document.getElementById("editCompoDiv").style.display = "none";
		}
		else{
			if(iType == "compo"){
				document.getElementById("editCompoDiv").style.display = "block";
				document.getElementById("editMenuDiv").style.display = "none";
				document.getElementById("editPageDiv").style.display = "none";
				document.all.e_compo_name.value = node.data["label"];
				document.all.e_compo_url.value = node.data["url"];
				var isGotoEditItems = document.getElementById("e_is_goto_edit");
				if(node.data["is_goto_edit"] == "Y")
					isGotoEditItems.selectedIndex = 1;
				else
					isGotoEditItems.selectedIndex = 0;
					
				var isNewItems = document.getElementById("e_is_always_new");	
				if(node.data["is_always_new"] == "Y")
					isNewItems.selectedIndex = 1;
				else
					isNewItems.selectedIndex = 0;
				
				var isInWindowItems = document.getElementById("e_is_in_menu");	
				if(node.data["is_in_menu"] == "Y")
					isInWindowItems.selectedIndex = 1;
				else
					isInWindowItems.selectedIndex = 0;
							
			}
			else{
				document.getElementById("editCompoDiv").style.display = "none";
				document.getElementById("editMenuDiv").style.display = "block";
				document.getElementById("editPageDiv").style.display = "none";
				if(node.parent.data["code"] == "root"){
					document.getElementById("impExpMenu").style.display = "block";
				}
				else{
					document.getElementById("impExpMenu").style.display = "none";
				}
			}
			if(node.parent.data["code"] == "root"){
			   var menuData = getMenuData(iCode);
				if (!menu.Exists(iCode)){
        		menu.add(iCode, menuData);
        }
				document.getElementById("menuinfo").value = menuData.xml;
				if(menuData &&(node.children == null || node.children.length == 0)){
					var folderNodes = menuData.childNodes;
					if(folderNodes){
						for(var i = 0; i < folderNodes.length; i++)
							buildTree(node, folderNodes[i], false);
					}
				}
				currentNode.refresh();
			}
		}
	}
	
	/**
	 * ��ȡ�ض�pageId�Ĳ˵�����
	 */
	function getMenuData(pageId){
		var vasNames = new Array();
 		var vasValues = new Array();
 		vasNames[0] = "pageId";
 		vasValues[0] = pageId;
 		vasNames[1] = "isHtml";
 		vasValues[1] = "false";
 		vasNames[1] = "isRemoveEmpty";
 		vasValues[1] = "false";
 		vasNames[2] = "userId";
 		vasValues[2] = "sa";
 		
 		return requestData2("getMenuTree", "all", vasNames, vasValues); 
	}
	
	/**
	 * �����˵���
	 */
	function buildTree(node, iData, iOpen){
		if(!iData) return;
		var tmpObj = {"code":iData.getAttribute("code")
							, "label":iData.getAttribute("name")
							, "type":iData.getAttribute("type")};
		if(iData.getAttribute("type") == "compo"){
			tmpObj["is_goto_edit"] = iData.getAttribute("is_goto_edit");
			tmpObj["is_always_new"] = iData.getAttribute("is_always_new");
			tmpObj["is_in_menu"] = iData.getAttribute("is_in_menu");
			tmpObj["ord_index"] = iData.getAttribute("ord_index");
			tmpObj["url"] = iData.getAttribute("url").replace(new RegExp("amp;", "g"), "&");
		}					
		var tmpNode = new YAHOO.widget.TextNode(tmpObj, node, iOpen);								
 		var leafNodes = iData.childNodes;
 		if(leafNodes){
 			for(var j = 0; j < leafNodes.length; j++){
 				buildTree(tmpNode, leafNodes[j], false);
 			}
 		}
	}
	
	function queryCompoStyle(){
		var names = new Array();
		var values = new Array();
		var result = qryData("gmap-priv.selectCompoStyle", names, values);
		if(result){
			var compoStys = result.childNodes;
			for(var i = 0; i < compoStys.length; i++){
				var compoSty = compoStys[i];
				if(compoSty){
					var fields = compoSty.childNodes;
					var optCode = ""
					var optName = "";
					for(var j = 0; j < fields.length; j++){
						var fieldName = fields[j].getAttribute("name");
						var fieldValue = fields[j].getAttribute("value");
						if(fieldName == "RES_ID")
							optCode = fieldValue;
						if(fieldName == "RES_NA")
							optName = fieldValue;	
					}
					
					var opt = new Option(optCode + " " + optName, optCode);
 					compoStyles.options[compoStyles.options.length] = opt;
				}
			}
		}
	}
	
	/**
	 * ��ѯ����
	 */
	function queryCompo(){
		compoList = null;
		compoList = new Array();
		var sIndex = compoStyles.selectedIndex;
		var curCompoStyle
		if(sIndex < 1){
			alert("����ѡ���Ʒ���ͣ�");
			return;
		}
  
  	for(var i=compoItems.options.length-1;i>0;i--)   
       compoItems.options.remove(i);
		curCompoStyle = compoStyles.options[sIndex].value;
		var names = new Array();
		var values = new Array();
		names[0] = "compo_id";
		values[0] = curCompoStyle + "%";
		var result = qryData("gmap-priv.selectCompo", names, values);
		if(result){
			var compos = result.childNodes;
			for(var i = 0; i < compos.length; i++){
				var compo = compos[i];
				if(compo){
					var fields = compo.childNodes;
					var optCode = ""
					var optName = "";
					var optUrl = "";
					for(var j = 0; j < fields.length; j++){
						var fieldName = fields[j].getAttribute("name");
						var fieldValue = fields[j].getAttribute("value");
						if(fieldName == "COMPO_ID")
							optCode = fieldValue;
						if(fieldName == "COMPO_NAME")
							optName = fieldValue;
						if(fieldName == "COMPO_URL")
							optUrl = fieldValue;		
					}
					
					var opt = new Option(optCode + " " + optName, optCode);
 					compoItems.options[compoItems.options.length] = opt;
 					var tempCompo = {"compoId" : optCode,
 									 "compoName" : optName,
 									 "compoUrl" : optUrl};
 					compoList[compoList.length] = tempCompo;				 
				}
			}
		}
	}
	
	/**
	 * ����ҳ��
	 */
	function addNewPage(){
		var pageName = document.all.add_page_name.value;
		if(pageName == ""){
			alert("������ҳ������!");
			return;
		}
		var pageIndex = currentNode.children.length + 1;
		var pageParam = "<root>\n<page group_id=\"" + groupId + "\" page_name=\"" + pageName 
									+ "\" page_order=\"" + pageIndex + "\"/>\n</root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "insert";
		names[1] = "params";
		values[1] = pageParam;
		
		var result = requestData2("updateGroupPage", "all", names, values); 
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		
		var tmpObj = {"code":result.childNodes[0].nodeValue
								,"label":pageName
								,"type":"page"};
		var tmpNode = new YAHOO.widget.TextNode(tmpObj, currentNode, true);								
		tree.draw();
		
		currentNode = tmpNode.parent;
		
		document.all.add_page_name.value = "";
		var opt = new Option(pageName, result.childNodes[0].nodeValue);
 		pageItems.options[pageItems.options.length] = opt;
 		
 		alert("��ӳɹ���");
	}
	
	/**
	 * page������
	 */	
	function moveUpPageItem(){
		var sIndex = pageItems.selectedIndex;
		if(sIndex < 1)
			return;
		var upOptValue = pageItems.options[sIndex - 1].value;	
		var upOptText = pageItems.options[sIndex - 1].text;	
		var selectedOpt = pageItems.options[sIndex];
		
		var selectNode = tree.getNodeByProperty("code", selectedOpt.value);
		var upNode = tree.getNodeByProperty("code", upOptValue);
		tree.popNode(selectNode);
		selectNode.insertBefore(upNode);
		tree.draw();
		
		pageItems.options[sIndex - 1].value = selectedOpt.value;
		pageItems.options[sIndex - 1].text = selectedOpt.text;
		pageItems.options[sIndex].value = upOptValue;
		pageItems.options[sIndex].text = upOptText;
		pageItems.options[sIndex - 1].selected = true;
		
	}
	
	/**
	 * page������
	 */
	function moveDownPageItem(){
		var sIndex = pageItems.selectedIndex;
		if(sIndex < 0 || sIndex >= pageItems.length - 1)
			return;
		var upOptValue = pageItems.options[sIndex + 1].value;	
		var upOptText = pageItems.options[sIndex + 1].text;	
		var selectedOpt = pageItems.options[sIndex];
		
		var selectNode = tree.getNodeByProperty("code", selectedOpt.value);
		var upNode = tree.getNodeByProperty("code", upOptValue);
		tree.popNode(selectNode);
		selectNode.insertAfter(upNode);
		tree.draw();
				
		pageItems.options[sIndex + 1].value = selectedOpt.value;
		pageItems.options[sIndex + 1].text = selectedOpt.text;
		pageItems.options[sIndex].value = upOptValue;
		pageItems.options[sIndex].text = upOptText;
		pageItems.options[sIndex + 1].selected = true;		
	}
	
	function updatePageItemIndex(){
		var opts = pageItems.options;
		if(pageItems.options == null || pageItems.options.length == 0){
			return;
		}
		var pageParam = "<root>";
		for(var i = 0; i < opts.length; i++){
			pageParam += "<page group_id=\"" + groupId + "\" page_id=\"" + opts[i].value 
			+ "\" page_name=\"" + opts[i].text + "\" page_order=\"" + opts[i].index + "\"/>\n";
		}
		pageParam += "</root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "update";
		names[1] = "params";
		values[1] = pageParam;
		
		var result = requestData2("updateGroupPage", "all", names, values);
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		
		alert("���³ɹ���");
	}
	
	/**
	 * ɾ��page��
	 */
	function deletePageItem(){
		var sIndex = pageItems.selectedIndex;
		if(sIndex < 0 || sIndex >= pageItems.length)
			return;
			
		var selectedOpt = pageItems.options[sIndex];

		var pageParam = "<root>\n<page group_id=\"" + groupId + "\" page_id=\"" 
								+ selectedOpt.value + "\"/>\n</root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "delete";
		names[1] = "params";
		values[1] = pageParam;
		
		var result = requestData2("updateGroupPage", "all", names, values);
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		
		pageItems.remove(pageItems.selectedIndex);
		
		var tmpNode = tree.getNodeByProperty("code", selectedOpt.value);
		tree.removeNode(tmpNode, true);	
		
		alert("ɾ���ɹ���");	
	}
	
	/**
	 * ���½������
	 */
	function changeNodeName(){
		var nodeName = document.all.change_node_name.value;
		if(nodeName == ""){
			alert("�����������ƣ�");
			return;
		}
		var nodeCode = currentNode.data["code"];
		var parentId = currentNode.parent.data["code"];
		var dataType = currentNode.data["type"];
		if(dataType == "page"){
			var pageIndex = currentNode.children.length + 1;
			var pageParam = "<root><page group_id=\"" + groupId + "\" page_id=\"" + nodeCode +"\" page_name=\"" 
									+ nodeName + "\" page_order=\"" + pageIndex + "\"/></root>"
		}else{
			var pageParam = "<root><menu menu_id=\"" + nodeCode + "\" parent_id=\""
									+ parentId + "\" menu_name=\"" + nodeName + "\"/></root>";
		}
		
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "update";
		names[1] = "params";
		values[1] = pageParam;
		names[2] = "type";
		values[2] = dataType;
		if(dataType == "page"){
			var result = requestData2("updateGroupPage", "all", names, values);
		}else{
			var result = requestData2("updateMenuTree", "all", names, values);
		}
		
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		
		currentNode.label = nodeName;
		currentNode.data["label"] = nodeName;						
		tree.draw();
		alert("�����ɹ���");
		
		labelClick(currentNode);
	}	
	
	/**
	 * ����½��
	 */
	function addNewNode(){
		if(document.all.add_node_name.value == ""){
			alert("�����������ƣ�");
			return;
		}
		var parentId = currentNode.data["code"];
		var nodeIndex = 0;
		if(currentNode.hasChildren())
			nodeIndex = currentNode.children.length + 1;
		var nodeName = document.all.add_node_name.value;

		var pageParam = "<root><menu menu_name=\"" + nodeName + "\" ord_index=\""
									+ nodeIndex + "\" parent_id=\"" + parentId + "\"/></root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "insert";
		names[1] = "params";
		values[1] = pageParam;
		names[2] = "type";
		values[2] = "menu";
		
		var result = requestData2("updateMenuTree", "all", names, values);
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		var tmpObj = {code:result.childNodes[0].nodeValue
								, label:nodeName
								, type:"menu"
								, ord_index:nodeIndex};		
		var tmpNode = new YAHOO.widget.TextNode(tmpObj, currentNode, true);								
		tree.draw();
		
		currentNode = tmpNode.parent;
		document.all.add_node_name.value = "";
		alert("�����ɹ���");
	}
	
	/**
	 * ɾ�����
	 */
	function deleteNode(){
		if(currentNode.parent.data["code"] == "root"){
			alert("����ѡ���Ϊҳ���㣬����ѡ��������ɾ����");
			return;
		}
		var nodeCode = currentNode.data["code"];
		var pageParam = "<root><menu menu_id=\"" + nodeCode + "\"/></root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "delete";
		names[1] = "params";
		values[1] = pageParam;
		names[2] = "type";
		values[2] = "menu";
		
		var result = requestData2("updateMenuTree", "all", names, values);
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		
		//var tmpNode = tree.getNodeByIndex(currentNode.index + 1);
		//if(!tmpNode)
		var	tmpNode = currentNode.parent;
		
		tree.removeNode(currentNode, true);
		tree.draw();
		alert("ɾ���ɹ���");
		
		labelClick(tmpNode);
	}
	
	function changeCompoItem(){
		var optText = compoItems.options[compoItems.selectedIndex].text;
		var optValue = compoItems.options[compoItems.selectedIndex].value;
		var pos = optText.indexOf(" ");
		if(pos > 0)
			optText = optText.substring(pos + 1);
		document.all.compo_name.value = optText;
		if(compoList){
			for(var i = 0; i < compoList.length; i++){
				var tempCompo = compoList[i];
				if(optValue == tempCompo["compoId"]){
					document.all.compo_url.value = tempCompo["compoUrl"];
					break;
				}
			}
		}
	}
	
	function addNewCompo(){
		var isGotoEditItems = document.getElementById("is_goto_edit");
		var isNewItems = document.getElementById("is_always_new");
		var isInWindowItems = document.getElementById("is_in_menu");
		var menuId = currentNode.data["code"];
		var compoId = compoItems.options[compoItems.selectedIndex].value;
		var compoName = document.all.compo_name.value;
		var isGotoEdit = isGotoEditItems.options[isGotoEditItems.selectedIndex].value;
		var isNew = isNewItems.options[isNewItems.selectedIndex].value;
		var isInWindow = isInWindowItems.options[isInWindowItems.selectedIndex].value;
		var compoUrl = document.all.compo_url.value;
		var orderIndex = 0;
		if(currentNode.hasChildren())
			orderIndex = currentNode.children.length + 1;
		
		var pageParam = "<root><compo compo_id=\"" + compoId + "\" compo_name=\""
				+ compoName + "\" menu_id=\"" + menuId + "\" ord_index=\""
				+ orderIndex + "\" is_goto_edit=\"" + isGotoEdit + "\" is_always_new=\""
				+ isNew + "\" is_in_menu=\"" + isInWindow + "\" url=\"" + compoUrl + "\"/></root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "insert";
		names[1] = "params";
		values[1] = pageParam;
		names[2] = "type";
		values[2] = "compo";

		var result = requestData2("updateMenuTree", "all", names, values);
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		var tmpObj = {code:result.childNodes[0].nodeValue
								, label:compoName
								, type:"compo"
								, is_goto_edit:isGotoEdit
								, is_always_new:isNew
								, is_in_menu:isInWindow
								, "url":compoUrl
								, "ord_index":orderIndex};		
		var tmpNode = new YAHOO.widget.TextNode(tmpObj, currentNode, true);								
		tree.draw();
		
		currentNode = tmpNode.parent;
		
		document.all.compo_name.value = "";
		document.all.compo_url.value = "";
		compoItems.selectedIndex = 0;
		var iCode = currentNode.data["code"];
		var menuData = getMenuData(iCode);
		document.getElementById("menuinfo").value = menuData.xml;
		alert("�����ɹ���");				
	}
	
	function deleteCompo(){
		var menuId = currentNode.parent.data["code"];
		var compoId = currentNode.data["code"];
		
		var pageParam = "<root><compo menu_id=\"" + menuId + "\" compo_id=\""
									+ compoId + "\"/></root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "delete";
		names[1] = "params";
		values[1] = pageParam;
		names[2] = "type";
		values[2] = "compo";

		var result = requestData2("updateMenuTree", "all", names, values);
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		
		var tmpNode = tree.getNodeByIndex(currentNode.index + 1);
		if(!tmpNode)
			tmpNode = currentNode.parent;
			
		tree.removeNode(currentNode, true);
		currentNode = tmpNode;
		
		alert("ɾ���ɹ���");
		labelClick(currentNode);			
	}
	
	function updateCompo(){
		var isGotoEditItems = document.getElementById("e_is_goto_edit");
		var isNewItems = document.getElementById("e_is_always_new");
		var isInWindowItems = document.getElementById("e_is_in_menu");
		var menuId = currentNode.parent.data["code"];
		var compoId = currentNode.data["code"];
		var compoName = document.all.e_compo_name.value;
		var isGotoEdit = isGotoEditItems.options[isGotoEditItems.selectedIndex].value;
		var isNew = isNewItems.options[isNewItems.selectedIndex].value;
		var isInWindow = isInWindowItems.options[isInWindowItems.selectedIndex].value;
		var compoUrl = document.all.e_compo_url.value;
		var orderIndex = 0;
		
		var pageParam = "<root><compo compo_id=\"" + compoId + "\" compo_name=\""
				+ compoName + "\" menu_id=\"" + menuId + "\" ord_index=\""
				+ orderIndex + "\" is_goto_edit=\"" + isGotoEdit + "\" is_always_new=\""
				+ isNew + "\" is_in_menu=\"" + isInWindow +"\" url=\"" + compoUrl + "\"/></root>";
		var names = new Array();
		var values = new Array();
		names[0] = "action";
		values[0] = "update";
		names[1] = "params";
		values[1] = pageParam;
		names[2] = "type";
		values[2] = "compo";

		var result = requestData2("updateMenuTree", "all", names, values);
		if(result == null){
			alert("����ʧ�ܣ�");
			return;
		}
		if(result.getAttribute("success") == "false"){
			alert("����ʧ�ܣ�" + result.childNodes[0].nodeValue);
			return;
		}
		
		currentNode.label = compoName;
		currentNode.data["label"] = compoName;
		currentNode.data["ord_index"] = orderIndex;
		currentNode.data["is_goto_edit"] = isGotoEdit;
		currentNode.data["is_always_new"] = isNew;
		currentNode.data["url"] = compoUrl;
		currentNode.data["is_in_menu"] = isInWindow;
							
		tree.draw();
				
		alert("�����ɹ���");
		labelClick(currentNode);							
	}
	
	function impMenuInfoFromFile(){
		if(!confirm("�������֮ǰ��ɾ��ԭ�������ݣ�")){
			return;
		}
		var url = "<%=webRoot%>/gp/webpage/html/SelectFile.htm";
		var root = showModalDialog(url, window,
                          "menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;" +
                        "scrollbars=yes;dialogHeight=10" +
                         ";DialogWidth=30" + ";top=0;left=0;" +
                         "help=no");
    if(root==""){
    	alert("��ѡ���ļ���");
    	return false;   	
    	} 
    if(root==null){
    	return false;
    }

     var pageId = currentNode.data["code"];	
    var names = new Array();
    var values = new Array();
    names[0] = "root";
    values[0] = PF.readFile(root);
    names[1] = "pageId";
    values[1] = pageId;
    //debugger;
    var readValue = requestData2("impMenuInfo", "all", names, values);
    document.getElementById("menuinfo").value = readValue.xml;
    alert("����ɹ���");	
 
	}
	
	function impMenuInfo(){
		if(!confirm("�������֮ǰ��ɾ��ԭ�������ݣ�")){
			return;
		}
    var pageId = currentNode.data["code"];	
    var names = new Array();
    var values = new Array();
    names[0] = "root";
    values[0] = document.getElementById("menuinfo").value;
    names[1] = "pageId";
    values[1] = pageId;
    //debugger;
    var readValue = requestData2("impMenuInfo", "all", names, values);
    alert("����ɹ���");
	}
		
	function expMenuInfo(){
		var url = "<%=webRoot%>/gp/webpage/html/SelectFolder.htm";
		var root = showModalDialog(url, window,
                          "menubar=no;status=no;toolbar=no;resizable=no;titlebar=yes;" +
                        "scrollbars=yes;dialogHeight=10" +
                         ";DialogWidth=20" + ";top=0;left=0;" +
                         "help=no");	                   
    if(root==""){
    	alert("��ѡ���ļ���");
    	return false;
    	}  
    if(root==null){
    	return false;
    	}                  
    var memuinfo = 	document.getElementById("menuinfo").value;
    var result = PF.writeFile(root, memuinfo, PF.OPEN_FILE_FORWRITING);
    if(result==true)
    alert("�����ɹ���");
	}	
		
</SCRIPT>
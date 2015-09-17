// $Id: tree.js,v 1.1 2008/03/04 10:50:38 liuxiaoyong Exp $

//是否使用上下级关联的参数;leidh;20040420;
var _kTree_RelationToChildren= true;
var _kTree_RelationToParent= true;
var isTab;
var imgPath= "/style/img/main/";

function isTreeExists(){
	return document.getElementById("rootID")?true:false;
}

function getRoot(){
	return document.getElementById("rootID").value;
}

function getCurrCode(){
  var curV = document.getElementById("currID");
  if (curV)
    return curV.value;
  else
    return "";
}

function setCurrCode(code){
	document.getElementById("currID").value = code;
}

function openBranch() {
	var source = event.srcElement;
	child = document.getElementById(source.code + "Child");
	if (child.style.display == "none"){
		child.style.display ="";
		source.src = imgPath + "minus.gif";
		//不可见的结点在点击时就已经被选中，不用在此处理；leidh;20040528;
		/*
		if (child.changed == "Y"){
			if (document.getElementById(source.code + "CHK")){
				var checked = document.getElementById(source.code + "CHK").checked;
				checkDown(source.code,checked);
			}
		}
		//*/
	}else{
		child.style.display ="none";
		source.src = imgPath + "plus.gif";
	}
}

function openTree(level){
  openSubTree(level, getRoot() + "Child");
}

function openSubTree(level, code){
//level表示展开层数；-1为所有层
//openSubTree(1, getRoot() + "Child")相当于按普通方式显示一棵树
//openSubTree(-1, getRoot() + "Child")将整棵树完全展开
  var children = document.getElementById(code).childNodes;
  for (var i=0,j=children.length; i<j; i++){
    var child = children.item(i);
    var childCode = child.id;
    if (!childCode) continue;
    if ((level > 0 || level == -1) && child.folder == "Y"){
      if (child.style.display == "none"){
        child.style.display ="";
        var tmp = document.getElementById("IMG_" + childCode.substring(0, childCode.length-5));
        tmp.src = imgPath + "minus.gif";

//        document.getElementById(code.substring(0, code.length-5)).src = imgPath + "minus.gif";
      }
      if(level > 0){
        openSubTree(level-1, childCode);
      }else{
        openSubTree(level, childCode);
      }
    }
  }
}

function checkClick(){
	//alert("checkClick();");
	var code = event.srcElement.code;
	var p_code = event.srcElement.p_code;
	var checked = event.srcElement.checked;
	changed = true; // 2004-6-22 HH add

	if (eval("typeof before_check_Click ==\"function\"")){
		eval("before_check_Click(\"" + code + "\",\"" + p_code + "\")");
	}

	//根据参数值确定是否使用上下级的关联;leidh;20040420;
	//checkDown(code,checked);
	//checkUp(p_code,checked);
	if (_kTree_RelationToChildren)
	  checkDown(code,checked,true);
	if (_kTree_RelationToParent)
	  checkUp(p_code,checked);

	if (eval("typeof check_Click ==\"function\"")){
		eval("check_Click(\"" + code + "\",\"" + p_code + "\")");
	}
}

function getChildrenCode(p_code){
	var result = new Array();
	var childrenNode = document.getElementById(p_code + "Child");
	var children = childrenNode.childNodes;
	for (var i=0,j=children.length; i<j; i++){
		var childCode = children.item(i).id;
		if (!childCode) continue;
		if (children.item(i).folder == "Y") continue;
		result[result.length] = children.item(i).id;
	}
	return result;
}

function checkDown(code,checked,deep){
  //不用如此处理；leidh;20040528;
  /*
	var childrenNode = document.getElementById(code + "Child");
	if(!childrenNode) return;
	if((!deep)&&(childrenNode.style.display == "none")){
		childrenNode.changed = "Y";
		return;
	}
	childrenNode.changed = "N";
	//*/

	var childrenNode = document.getElementById(code + "Child");
	if (childrenNode== null) return;
	var children = childrenNode.childNodes;
	for (var i=0,j=children.length; i<j; i++){
		var childCode = children.item(i).id;
		if (!childCode) continue;
		if (children.item(i).folder == "Y") continue;
		var childCode = children.item(i).id;
		document.getElementById(childCode + "CHK").checked = checked;

		if (deep) checkDown(childCode,checked,deep);//leidh;20040528;
	}
}

function checkUp(p_code,checked){
	if(!document.getElementById(p_code + "CHK")) return;
	var parent = document.getElementById(p_code + "CHK");
	if (!checked){
		parent.checked = checked;
	}else{
		var allChecked = true;
		var children = document.getElementById(p_code + "Child").childNodes;
		for (var i=0,j=children.length; i<j; i++){
			var childCode = children.item(i).id;
			if (!childCode) continue;
			if (children.item(i).folder == "Y") continue;
			if (!document.getElementById(childCode + "CHK").checked){
				allChecked = false;
				break;
			}
		}
		parent.checked = allChecked;
	}
	checkUp(parent.p_code,checked);
}

function getValue(code,attrName){
	var element = document.getElementById(code);
	if (attrName == "NAME"){
		return document.getElementById(code + "TXT").value;
	}else	if (attrName != "IS_CHECKED"){
		return element.getAttribute(attrName);
	}else{
		var p_code = document.getElementById(code + "CHK").getAttribute("p_code");
		for(;p_code != getRoot();){
			var pelement = document.getElementById(p_code + "Child");
			if(pelement.changed == "Y"){
				var checked = document.getElementById(p_code + "CHK").checked;
				checkDown(p_code,checked,true);
				break;
			}else{
				p_code = document.getElementById(p_code + "CHK").getAttribute("p_code");
			}
		}
		return document.getElementById(code + "CHK").checked ? "Y" : "N";
	}
}

function setValue(code,attrName,value){
	var element = document.getElementById(code);
	if (attrName == "NAME"){
		document.getElementById(code + "TXT").value = value;
	}else	if (attrName != "IS_CHECKED"){
		element.setAttribute(attrName,value);
	}else{
		var p_code = document.getElementById(code + "CHK").getAttribute("p_code");
		for(;(p_code != getRoot())&&(p_code != "");){
			var pelement = document.getElementById(p_code + "Child");
			if(pelement.changed == "Y"){
				var checked = document.getElementById(p_code + "CHK").checked;
				checkDown(p_code,checked,true);
				break;
			}else{
				p_code = document.getElementById(p_code + "CHK").getAttribute("p_code");
			}
		}
		var checked = value=="Y";
		document.getElementById(code + "CHK").checked = checked;

		//根据参数值确定是否使用上下级的关联;leidh;20040420;
		//checkDown(code,checked);
		//checkUp(document.getElementById(code + "CHK").p_code,checked);
		if (_kTree_RelationToChildren) checkDown(code,checked,true);
		if (_kTree_RelationToParent) checkUp(document.getElementById(code + "CHK").p_code,checked);
	}
}

function clickNode(){
	var result = true;
	if(eval("typeof before_NodeClick ==\"function\"")){
		result = eval("before_NodeClick(\"" + event.srcElement.code + "\")");
	}
	if(!result) return;
	document.getElementById(getCurrCode() + "TXT").style.backgroundColor = "#FFFFFF";
	document.getElementById(getCurrCode() + "TXT").style.color = "#000000";
	setCurrCode(event.srcElement.code);
	document.getElementById(getCurrCode() + "TXT").style.backgroundColor = "highlight";
	document.getElementById(getCurrCode() + "TXT").style.color = "highlighttext";
	currCode = event.srcElement.code;
	if (eval("typeof nodeClick ==\"function\"")){
		eval("nodeClick(\"" + event.srcElement.code + "\")");
	}
}

function getTreeData(onlyLeaf,onlyChecked){
	var isCheckTree = document.getElementById(getRoot() + "CHK");
	return "<delta>"
						+ getNodeData(getRoot(),isCheckTree,onlyLeaf,onlyChecked,-1)
						+ "</delta>";
}

/*
description : 得到指定节点及其字节点的数据
parameter   ：code 指定节点代码
parameter   ：isCheckTree 是否是带checkbox的树
parameter   ：onlyLeaf 是否只取叶子节点的数据
parameter   ：onlyChecked 是否只取checkbox选中的节点数据
parameter   ：deep 取至第几层子节点，-1表示所有层，0表示只取指定节点，
										1表示取指定节点及其第一层子节点，2表示......
parameter   ：tableData 是否打包成TableData格式
*/
function getNodeData(code,isCheckTree,onlyLeaf,onlyChecked,deep,tableData){
	var result = "";
	var element = document.getElementById(code);
	var p_code = element.P_CODE;
	if (code == getRoot()){ p_code = ""; }
	var name = document.getElementById(code + "TXT").value;
	result = "<entity name=\"" + packSpecialChar(code) + "\">";
	result += "<field name=\"CODE\" value=\"" + packSpecialChar(code) + "\"/>";
	result += "<field name=\"P_CODE\" value=\"" + packSpecialChar(p_code) + "\"/>";
	result += "<field name=\"NAME\" value=\"" + packSpecialChar(name) + "\"/>";
	var checkTmp = "N";
	if (isCheckTree){
		result += "<field name=\"IS_CHECKED\" value=\"";
		checkTmp = document.getElementById(code + "CHK").checked?"Y":"N";
		result +=	checkTmp + "\"/>";
	}
	if ((code == "root") || ((onlyLeaf) && (!isLeafNode(code)))
			|| ((isCheckTree) && (onlyChecked) && (checkTmp == "N"))){
		result = "";
	}else{
		for (var i=0,j=fieldNames.childNodes.length; i<j; i++){
			var fieldName = fieldNames.childNodes[i].getAttribute("name");
			if (fieldName == "P_CODE"){ continue; }
			result += "<field name=\"" + packSpecialChar(fieldName)
										 +"\" value=\""
										 + packSpecialChar(element.getAttribute(fieldName))
										 + "\"/>";
		}
		if (!tableData){
			result +="</entity>";
		}
	}

	if (((deep < 0) || (deep > 0))
					&& (document.getElementById(code + "Child"))){
		if (isCheckTree){
			if (document.getElementById(code + "Child").changed == "Y"){
				checkDown(code,document.getElementById(code + "CHK").checked,true);
			}
		}
		if (tableData){
			result += "<entity name=\"" + packSpecialChar(code) + "\">";
		}
		var children = document.getElementById(code + "Child").childNodes;
		for (var i=0,j=children.length; i<j; i++){
			var childCode = children.item(i).id;
			if (!childCode) continue;
			if (children.item(i).folder == "Y") continue;
			if (tableData){
				result += "<row>";
			}
			result += getNodeData(childCode,isCheckTree,onlyLeaf,onlyChecked,deep - 1,tableData);
			if (tableData){
				result += "</row>";
			}
		}
		if (tableData){
			result += "</entity>";
		}
	}
	if (tableData){
		result += "</entity>";
	}
	return result;
}

function isSysAttribute(aname){
	var result = false;
	for (var i=0,j=rootID.attributes.length; i<j; i++){
		if (rootID.attributes.item(i).name == aname){
			result = true;
			break;
		}
	}
	return result;
}

function isLeafNode(code){
	return document.getElementById(code + "Child")?false:true;
}

function getTreeToFrame(ruleID, names, values,frameName){
	fName = frameName;
	getTreeToArea(ruleID, names, values,"null","null","getTreeDataToArea_R2");
}

function getTreeToArea(ruleID, names, values,area, tabName,callback){
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	var str = "<entity>";
	for(var i = 0; i < names.length; i++){
		str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
	}
	str += "</entity>";

	pValues[1] = str;
	if(area != null){ areaId = area; }
	if((tabName != null) && (tabName.length > 0)){
		areaTabName = tabName;
		isTab = true;
	}
	if (!callback){
		callback = "getTreeDataToArea_R";
	}
	var com = getCommunity();
	if (com != null){
		doRequest("gettree","all",pNames,pValues,callback);
	}
}

function qryDataAsTree(ruleID, names, values, area, tabName){
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	var str = "<entity>";
	for(var i = 0; i < names.length; i++){
		str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
	}
	str += "</entity>";

	pValues[1] = str;
	if(area != null){ areaId = area; }
	if((tabName != null) && (tabName.length > 0)){
		areaTabName = tabName;
		isTab = true;
	}
	var result = requestData("gettree","all",pNames,pValues);

	if(area == null && tabName == null)
		return result.text;
	var tempId = null;
	if(isTab == true){
		tempId = areaTabName + "TabData";
		document.getElementById(areaTabName + "Tab").setAttribute("tablename",
				areaId + areaTabName);
	}else{
		tempId = areaId;
	}
	if(tempId != null){
		document.getElementById(tempId).innerHTML = result.text;
		var areaTableName = areaId;
		if(isTab == true){
			document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
			areaTableName += areaTabName;
		}
		if (eval("typeof after_getTreeDataToArea ==\"function\""))
			eval("after_getTreeDataToArea()");
	}
}

function getTreeByRootToFrame(ruleID, names, values,frameName,rootCode){
	fName = frameName;
	getTreeByRootToArea(ruleID, names, values,"null","null",rootCode,"getTreeDataToArea_R2");
}

function getTreeByRootToArea(ruleID, names, values,area, tabName, rootCode,callback){
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	var str = "<entity>";
	for(var i = 0; i < names.length; i++){
		str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
	}
	str += "</entity>";

	pValues[1] = str;
	pNames[2] = "rootCode";
	pValues[2] = rootCode;
	if(area != null){ areaId = area; }
	if((tabName != null) && (tabName.length > 0)){
		areaTabName = tabName;
		isTab = true;
	}
	if (!callback){
		callback = "getTreeDataToArea_R";
	}
	var com = getCommunity();
	if (com != null){
		doRequest("gettreebyroot","all",pNames,pValues,callback);
	}
}

function qryDataAsTreeByRoot(ruleID, names, values,area, tabName,  rootCode){
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	var str = "<entity>";
	for(var i = 0; i < names.length; i++){
		str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
	}
	str += "</entity>";

	pValues[1] = str;
	pNames[2] = "rootCode";
	pValues[2] = rootCode;
	if(area != null){ areaId = area; }
	if((tabName != null) && (tabName.length > 0)){
		areaTabName = tabName;
		isTab = true;
	}
	var result = requestData("gettreebyroot","all",pNames,pValues);
	if(area == null && tabName == null)
		return result.text;

	var tempId = null;
	if(isTab == true){
		tempId = areaTabName + "TabData";
		document.getElementById(areaTabName + "Tab").setAttribute("tablename",
				areaId + areaTabName);
	}else{
		tempId = areaId;
	}
	if(tempId != null){
		document.getElementById(tempId).innerHTML = result.text;
		var areaTableName = areaId;
		if(isTab == true){
			document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
			areaTableName += areaTabName;
		}
		if (eval("typeof after_getTreeDataToArea ==\"function\""))
			eval("after_getTreeDataToArea()");
	}
}

function getTreeWithRootToFrame(ruleID, names, values,frameName,rootCode){
	fName = frameName;
	getTreeWithRootToArea(ruleID, names, values,"null","null",rootCode,"getTreeDataToArea_R2");
}

function getTreeWithRootToArea(ruleID, names, values,area, tabName, rootCaption,callback){
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	var str = "<entity>";
	for(var i = 0; i < names.length; i++){
		str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
	}
	str += "</entity>";

	pValues[1] = str;
	pNames[2] = "rootCaption";
	pValues[2] = rootCaption;
	if(area != null){ areaId = area; }
	if((tabName != null) && (tabName.length > 0)){
		areaTabName = tabName;
		isTab = true;
	}
	if (!callback){
		callback = "getTreeDataToArea_R";
	}
	var com = getCommunity();
	if (com != null){
		doRequest("gettreewithroot","all",pNames,pValues,callback);
	}
}

function qryDataAsTreeWithRoot(ruleID, names, values,area, tabName,  rootCaption){
	var pNames = new Array();
	var pValues = new Array();
	pNames[0] = "ruleID";
	pValues[0] = ruleID;
	pNames[1] = "param";
	var str = "<entity>";
	for(var i = 0; i < names.length; i++){
		str += "<field name=\"" + names[i] + "\" value=\"" + values[i] + "\" />";
	}
	str += "</entity>";

	pValues[1] = str;
	pNames[2] = "rootCaption";
	pValues[2] = rootCaption;
	if(area != null){ areaId = area; }
	if((tabName != null) && (tabName.length > 0)){
		areaTabName = tabName;
		isTab = true;
	}
	var result = requestData("gettreewithroot","all",pNames,pValues);
	if(area == null && tabName == null)
		return result.text;

	var tempId = null;
	if(isTab == true){
		tempId = areaTabName + "TabData";
		document.getElementById(areaTabName + "Tab").setAttribute("tablename",
				areaId + areaTabName);
	}else{
		tempId = areaId;
	}
	if(tempId != null){
		document.getElementById(tempId).innerHTML = result.text;
		var areaTableName = areaId;
		if(isTab == true){
			document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
			areaTableName += areaTabName;
		}
		if (eval("typeof after_getTreeDataToArea ==\"function\""))
			eval("after_getTreeDataToArea()");
	}
}

function getTreeDataToArea_R(result){
	if(result.getAttribute("success") == "true"){
		var tempId = null;
		if(isTab == true){
			tempId = areaTabName + "TabData";
			document.getElementById(areaTabName + "Tab").setAttribute("tablename",
					areaId + areaTabName);
		}else{
			tempId = areaId;
		}
		if(tempId != null){
			document.getElementById(tempId).innerHTML = result.innerHTML;
			var areaTableName = areaId;
			if(isTab == true){
				document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
				areaTableName += areaTabName;
			}
			if (eval("typeof after_getTreeDataToArea ==\"function\""))
				eval("after_getTreeDataToArea()");
		}
	}else{
		showMessage(result.innerHTML);
	}
}

function getTreeDataToArea_R2(result){
	if(result.getAttribute("success") == "true"){
		var fm = window.frames[fName];
			fm.document.body.innerHTML = result.innerHTML;
	}else{
		showMessage(result.innerHTML);
	}
}

function getTreeWithDelta(delta, area, tabName){
  var pNames = new Array();
  var pValues = new Array();
  pNames[0] = "delta";
  pValues[0] = delta;
  if(area != null){ areaId = area; }
  if((tabName != null) && (tabName.length > 0)){
    areaTabName = tabName;
    isTab = true;
  }
  var result = requestData("gettreewithdelta","all",pNames,pValues);

  if(area == null && tabName == null)
    return result.text;
  var tempId = null;
  if(isTab == true){
    tempId = areaTabName + "TabData";
    document.getElementById(areaTabName + "Tab").setAttribute("tablename",
        areaId + areaTabName);
  }else{
    tempId = areaId;
  }
  if(tempId != null){
    document.getElementById(tempId).innerHTML = result.text;
    var areaTableName = areaId;
    if(isTab == true){
      document.getElementById(areaTabName + "Tab").setAttribute("changed", true);
      areaTableName += areaTabName;
    }
    if (eval("typeof after_getTreeDataToArea ==\"function\""))
      eval("after_getTreeDataToArea()");
  }
}



//------------------------------------------------------------------------------------
//获取子节点;leidh;20040421;
function Tree_getChildren(jNode, kDeep)
{
	var vajAllChildNode= new Array();
	var vajChildNode= new Array();

  var vsCode= Tree_getNodeCode(jNode);
	var childrenNode = document.getElementById(vsCode + "Child");
	if(!childrenNode) return null;

	var children = childrenNode.childNodes;
	for (var i=0,j=children.length; i<j; i++)
	{
		var childCode = children.item(i).id;
		if (!childCode) continue;
		if (children.item(i).folder == "Y") continue;

		var vjChildNode = children.item(i);
		if (kDeep)
		{
		  vajChildNode= Tree_getChildren(vjChildNode, kDeep);
		}

		vajAllChildNode[vajAllChildNode.length]= vjChildNode;
		if (vajChildNode!= null && vajChildNode.length> 0)
		{
			vajAllChildNode= vajAllChildNode.concat(vajChildNode);
		}
	}

	return vajAllChildNode;
}

//获取父节点;leidh;20040421;
function Tree_getParent(jNode, kDeep)
{
	if (jNode== null) return null;

	var vsParentCode= jNode.getAttribute("P_CODE");
	var vjParentNode= Tree_getNode(vsParentCode);

	var vajParentNode= new Array();
	vajParentNode[vajParentNode.length]= vjParentNode;

	var vajPNode2= new Array();
	if (kDeep)
	{
		vajPNode2= Tree_getParent(vjParentNode, kDeep);
	}

	if (vajPNode2!= null && vajPNode2.length> 0)
	{
		vajParentNode= vajParentNode.concat(vajPNode2);
	}

	return vajParentNode;
}


//获取节点;leidh;20040421;
function Tree_getNode(sCode)
{
	if (sCode== null || sCode.length== 0) return null;
	var vjNode= document.getElementById(sCode);
	return vjNode;
}

//获取节点代码;leidh;20040421;
function Tree_getNodeCode(jNode)
{
	if (jNode== null) return null;
  var vsCode= jNode.id;
	return vsCode;
}


//设置节点是否选中;leidh;20040421;
function Tree_setNodeChecked(jNode, kChecked)
{
	var vsCode= Tree_getNodeCode(jNode);
	if (vsCode== null || vsCode.length<= 0) return false;

	var vjCheckNode= document.getElementById(vsCode + "CHK");
	if (vjCheckNode== null) return false;

	vjCheckNode.checked= kChecked;

  //根据参数值确定是否使用上下级的关联;leidh;20040420;
	if (_kTree_RelationToChildren) checkDown(vsCode, kChecked,true);
	if (_kTree_RelationToParent) checkUp(document.getElementById(vsCode + "CHK").p_code, kChecked);

	return true;
}


//获取节点是否选中;leidh;20040421;
function Tree_getNodeChecked(jNode)
{
	var vsCode= Tree_getNodeCode(jNode);
	if (vsCode== null || vsCode.length<= 0) return false;

	var vjCheckNode= document.getElementById(vsCode + "CHK");
	if (vjCheckNode== null) return false;

	return vjCheckNode.checked;
}
//------------------------------------------------------------------------------------

function dblClickNode(){
	var result = true;
	if(eval("typeof before_dblNodeClick ==\"function\"")){
		result = eval("before_dblNodeClick(\"" + event.srcElement.code + "\")");
	}
	if(!result) return;
	document.getElementById(getCurrCode() + "TXT").style.backgroundColor = "#FFFFFF";
	document.getElementById(getCurrCode() + "TXT").style.color = "#000000";
	setCurrCode(event.srcElement.code);
	document.getElementById(getCurrCode() + "TXT").style.backgroundColor = "highlight";
	document.getElementById(getCurrCode() + "TXT").style.color = "highlighttext";
	currCode = event.srcElement.code;
	if (eval("typeof dblNodeClick ==\"function\"")){
		eval("dblNodeClick(\"" + event.srcElement.code + "\")");
	}
}

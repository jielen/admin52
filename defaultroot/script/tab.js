//$Id: tab.js,v 1.1 2008/04/29 00:48:26 liubo Exp $
function initTab(areaName){
	var head = document.getElementById(areaName + "TabHead");
	var tabName = head.rows[0].cells[1].getAttribute("tabName");
	disableAllTab(areaName);
	EnableTab(tabName,true);
	initTabButton(areaName);
}

function initTabButton(areaName){
	var container = document.getElementById(areaName + "TabContainer");
	if (!container){ return; }
	if(!container.rows[0].cells[1]){ return; }
  if (getTabWidth(areaName) <= getBodyWidth()){
/*
		container.rows[0].cells[1].style.display = "none";
		container.rows[0].cells[2].style.display = "none";
		container.rows[0].cells[3].style.display = "none";
		container.rows[0].cells[4].style.display = "none";
*/
	}else{
		resizeTabButton(areaName,"right");
	}
}

function tab_Click(){
	if (eval("typeof localTabClick == \"function\"")){
		localTabClick();
		return;
	}
	var tab = null;
	if (event.srcElement.tagName == "TD"){
	 tab = event.srcElement.parentNode.parentNode.parentNode;
	}else if (event.srcElement.tagName == "TR"){
		tab = event.srcElement.parentNode.parentNode;
	}else{
		tab = event.srcElement.parentNode.parentNode.parentNode.parentNode;
	}
	var areaName = tab.getAttribute("areaName");
	var tabName = tab.getAttribute("tabName");
	var tablename = tab.getAttribute("tablename");
	var valset = tab.getAttribute("valset");
	var r = true;
	if (eval("typeof before_" + areaName + "_" + tabName + "_Click ==\"function\"")){
		r = eval("before_" + areaName + "_" + tabName + "_Click()");
	}
	if (!r) return;
	activeTab(areaName,tabName);
	if(valset == "y"){
		var fieldName = document.getElementById(tablename
												 + "valueset").getAttribute("valsetfield");
		filterTable(tablename, fieldName, tabName);
		if(eval("typeof " + areaName + "_" + tabName + "_Click == \"function\"")){
			eval(areaName + "_" + tabName + "_Click()");
		}
	}else{
		if (eval("typeof " + areaName + "_" + tabName + "_Click ==\"function\"")){
			eval(areaName + "_" + tabName + "_Click()");
		}
	}
}

function disableAllTab(areaName){
	var head = document.getElementById(areaName + "TabHead");
	for (var i=1,j=head.rows[0].cells.length; i<j; i++){
		var tabName = head.rows[0].cells[i].getAttribute("tabName");
		var valset = head.rows[0].cells[i].getAttribute("valset");
		var tab = document.getElementById(tabName + "Tab");
		tab.rows[0].cells[1].setAttribute("background",BASE_URL+ "/img/tag/mid_behind.jpg");
		var imgL = document.getElementById(tabName + "L");
		imgL.setAttribute("src",BASE_URL+ "/img/tag/left_behind.jpg");
		var imgR = document.getElementById(tabName + "R");
		imgR.setAttribute("src",BASE_URL+ "/img/tag/right_behind.jpg");
		if(valset == "y"){
			var tabD = document.getElementById("valuesetTabData");
			tabD.style.display = "none";
		}else{
			var tabD = document.getElementById(tabName + "TabData");
			tabD.style.display = "none";
		}
	}
}

function EnableTab(tabName,isInit){
	var tab = document.getElementById(tabName + "Tab");
	var tablename = tab.getAttribute("tablename");
	tab.rows[0].cells[1].setAttribute("background",BASE_URL+ "/img/tag/mid_select.jpg");
	var valset = tab.getAttribute("valset");
	var imgL = document.getElementById(tabName + "L");
	imgL.setAttribute("src",BASE_URL+ "/img/tag/left_select.jpg");
	var imgR = document.getElementById(tabName + "R");
	imgR.setAttribute("src",BASE_URL+ "/img/tag/right_select.jpg");

	if(valset == "y"){
		var tabD = document.getElementById("valuesetTabData");
		tabD.style.display = "";
	}else{
		var tabD = document.getElementById(tabName + "TabData");
		tabD.style.display = "";
	}
	if (!isInit){
		if (getMainTableName().toUpperCase() != tablename.toUpperCase()){
			colResize(tablename);
		}
	}
	initFieldsWidth();
}

function activeTab(areaName,tabName){
	disableAllTab(areaName);
	EnableTab(tabName);
}

function getActiveTab(area){
	var areaId = document.getElementById(area + "TabHead");
	if ((areaId != null) && (areaId != "")){
	var element = areaId.firstChild.firstChild.childNodes;
	for(var i = 1; i < element.length; i++){
		var tabName = element.item(i).getAttribute("tabName")
		var tabN = document.getElementById(tabName + "R");
		if(tabN.getAttribute("src").indexOf("right_select.jpg") > 0)
			return tabName;
	}
	}
	else
		return null;
}

function getTabTable(tab){
	return document.getElementById(tab + "Tab").tablename;
}

function setTabVisible(tabName,visible){
	var tabHead = document.getElementById(tabName + "Tab");
	var tabD = document.getElementById(tabName + "TabData");
	if (visible){
		tabHead.style.display = "";
		tabHead.setAttribute("visible","true");
		var imgL = document.getElementById(tabName + "L");
		if (imgL.src.substr(imgL.src.length - 15) == "left_select.jpg"){
			tabD.style.display = "";
		}
	}else{
		tabHead.style.display = "none";
		tabHead.setAttribute("visible","false");
		tabD.style.display = "none";
	}
	resizeTabButton(tabHead.areaName)
}

//得到所有可见页签的总宽度
function getTabWidth(areaName){
	var head = document.getElementById(areaName + "TabHead");
	if (head){
		return head.clientWidth;
	}else{
		return 0;
	}
}

function getBodyWidth(){
	return document.getElementById("toolBarID").clientWidth;
}

//设置前移、后移按钮的宽度、是否显示
function resizeTabButton(areaName,direction){
	var availableWidth = getBodyWidth() - 80;
	if (getTabWidth(areaName) <= availableWidth){ return; }
	var head = document.getElementById(areaName + "TabHead");
	var width = 1;
	if (direction == "right"){//右移
		for (var i=1,j=head.rows[0].cells.length; i<j; i++){
			var tabName = head.rows[0].cells[i].getAttribute("tabName");
			var tab = document.getElementById(tabName + "Tab");
			if (tab.style.display == "none") continue;
			width += tab.clientWidth;
			if (width > availableWidth){
				tab.style.display = "none";
			}
		}
	}else{//左移
		for (var i=head.rows[0].cells.length-1,j=0; i>j; i--){
			var tabName = head.rows[0].cells[i].getAttribute("tabName");
			var tab = document.getElementById(tabName + "Tab");
			if (tab.style.display == "none") continue;
			width += tab.clientWidth;
			if (width > availableWidth){
				tab.style.display = "none";
			}
		}
	}
}

function tabMove(areaName,direction){
	var head = document.getElementById(areaName + "TabHead");
	if (direction == "first"){//右移至第一个
		for (var i=1,j=head.rows[0].cells.length; i<j; i++){
			var tabName = head.rows[0].cells[i].getAttribute("tabName");
			var tab = document.getElementById(tabName + "Tab");
			if (tab.getAttribute("visible") != "true"){
				continue;
			}else if (tab.style.display == "none"){
				tab.style.display = "";
			}
		}
		resizeTabButton(areaName,"right");
	}else if (direction == "right"){//右移
		var newDis = false;
		for (var i=head.rows[0].cells.length - 1,j=0; i>j; i--){
			var tabName = head.rows[0].cells[i].getAttribute("tabName");
			var tab = document.getElementById(tabName + "Tab");
			if (tab.getAttribute("visible") != "true"){
				continue;
			}else if (tab.style.display == "none"){
				newDis = true;
				tab.style.display = "";
			}else{
				break;
			}
		}
		if (!newDis){ return; }
		for (var i=1,j=head.rows[0].cells.length; i<j; i++){
			var tabName = head.rows[0].cells[i].getAttribute("tabName");
			var tab = document.getElementById(tabName + "Tab");
			if (tab.getAttribute("visible") != "true"){
				continue;
			}else if (tab.style.display == "none"){
				continue;
			}else{
				tab.style.display = "none";
				break;
			}
		}
		resizeTabButton(areaName,"right");
	}else if (direction == "left"){//左移
		var outTab = null;
		for (var i=1,j=head.rows[0].cells.length; i<j; i++){
			var tabName = head.rows[0].cells[i].getAttribute("tabName");
			var tab = document.getElementById(tabName + "Tab");
			if (tab.getAttribute("visible") != "true"){
				continue;
			}else if (tab.style.display == "none"){
				outTab = tab;
			}else{
				break;
			}
		}
		if(outTab != null){
			outTab.style.display = "";
		}
		resizeTabButton(areaName,"right");
	}else if (direction == "last"){
		for (var i=1,j=head.rows[0].cells.length; i<j; i++){
			var tabName = head.rows[0].cells[i].getAttribute("tabName");
			var tab = document.getElementById(tabName + "Tab");
			if (tab.getAttribute("visible") != "true"){
				continue;
			}else if (tab.style.display == "none"){
				tab.style.display = "";
			}
		}
		resizeTabButton(areaName,"left");
	}
}
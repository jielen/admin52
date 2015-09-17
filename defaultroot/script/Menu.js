var imgPath = "/style/img/main/";
var selectSrc = null;
newPageNumber = 0;
var isNewAdd;
var subWindowName = new Array();
var sysTitle;
var currCode = null;
var ie = new ActiveXObject("Wscript.Shell");

// 为兼容v51
var v51Products = [ "GL", "CU", "GF", "BG", "RP", "PR", "FA", "DB", "PD", "BD",
		"NT", "BM", "HD", "MOM", "ZC", "BF", "TR" ];

function drawTree(doc, node, left) {
	var item = doc.createElement("span");
	var leftMagin;
	for ( var i = 0, j = left.length; i < j; i++) {
		leftMagin = doc.createElement("span");
		leftMagin.innerHTML = "&nbsp;&nbsp;&nbsp;";
		item.appendChild(leftMagin);
	}
	if (node.nodeName == "menuDes") {
		var itemIMG = doc.createElement("img");
		itemIMG.src = imgPath + "star.gif";
		itemIMG.width = 18;
		itemIMG.height = 16;
		item.appendChild(itemIMG);
		var itemTXT = doc.createElement("span");
		itemTXT.innerHTML = "&nbsp;" + node.getAttribute("name");
		item.appendChild(itemTXT);
		item.appendChild(doc.createElement("br"));
		if (node.childNodes.length > 0) {
			var itemID = node.getAttribute("id");
			var children = doc.createElement("span");
			children.setAttribute("id", itemID + "Child");
			for ( var i = 0, j = node.childNodes.length; i < j; i++) {
				children.appendChild(drawTree(doc, node.childNodes[i], left));
			}
			item.appendChild(children);
		}
	} else if (node.getAttribute("id") == "favorites") {
		var itemIMG = doc.createElement("img");
		itemIMG.name = node.getAttribute("id");
		itemIMG = getImage(node, itemIMG);
		left += "1";
		item.appendChild(itemIMG);
		var itemTXT = doc.createElement("span");
		itemIMG.name = node.getAttribute("id");
		itemTXT.innerHTML = "&nbsp;" + node.getAttribute("name");
		item.appendChild(itemTXT);
		item.appendChild(doc.createElement("br"));
		var children = doc.createElement("span");
		children.style.display = "none";
		children.setAttribute("id", node.getAttribute("id") + "Child");
		for ( var i = 0, j = node.childNodes.length; i < j; i++) {
			child = drawTree(doc, node.childNodes[i], left);
			children.appendChild(child);
		}
		item.appendChild(children);
	} else {
		if (node.childNodes.length > 0) {
			item.name = node.getAttribute("id");
			var itemIMG = doc.createElement("img");
			itemIMG.name = node.getAttribute("id");
			if (node.nextSibling == null) {
				left += "0";
			} else {
				left += "1";
			}
			itemIMG = getImage(node, itemIMG);
			item.appendChild(itemIMG);
			var itemTXT = doc.createElement("span");
			itemIMG.name = node.getAttribute("id");
			itemTXT.innerHTML = "&nbsp;" + node.getAttribute("name");
			item.appendChild(itemTXT);
			item.appendChild(doc.createElement("br"));
			var children = doc.createElement("span");
			children.style.display = "none";
			children.setAttribute("id", node.getAttribute("id") + "Child");
			for ( var i = 0, j = node.childNodes.length; i < j; i++) {
				child = drawTree(doc, node.childNodes[i], left);
				children.appendChild(child);
			}
			item.appendChild(children);
		} else {
			item.name = node.getAttribute("entity");
			item.isgotoedit = node.getAttribute("is_goto_edit");
			var itemIMG = doc.createElement("img");
			itemIMG.name = node.getAttribute("entity");
			itemIMG.isgotoedit = node.getAttribute("is_goto_edit");
			itemIMG = getImage(node, itemIMG);
			item.appendChild(itemIMG);
			var itemTXT = doc.createElement("span");
			itemTXT.name = node.getAttribute("entity");
			itemTXT.isgotoedit = node.getAttribute("is_goto_edit");
			itemTXT.innerHTML = "&nbsp;" + node.getAttribute("name");
			itemTXT.onclick = clickLeaf;
			itemTXT.style.cursor = "hand";
			item.appendChild(itemTXT);
			item.appendChild(doc.createElement("br"));
		}
	}
	return item;
}

function getImage(node, image) {
	if (node.childNodes.length > 0) {
		image.src = imgPath + "plus.gif";
		image.width = 10;
		image.height = 10;
		image.style.cursor = "hand";
		image.onclick = openBranch;
		image.setAttribute("border", "0");
	} else {
		image.src = imgPath + "dot.gif";
		image.width = 8;
		image.height = 8;
		image.onclick = null;
		// image.style.cursor ="hand";
		image.setAttribute("border", "0");
	}
	return image;
}

function openBranch() {
	var source = event.srcElement;
	var matchstr = null;

	if (source.name.lastIndexOf("_txt") > 0)
		matchstr = source.name.substring(0, source.name.lastIndexOf("_txt"));
	else
		matchstr = source.name

	child = document.getElementById(matchstr + "Child");
	if (child.style.display == "none") {
		child.style.display = "";
		document.getElementById(matchstr).src = imgPath + "minus.gif";
	} else {
		child.style.display = "none";
		document.getElementById(matchstr).src = imgPath + "plus.gif";
	}
}

function desktopMenuEvent() {
	selectSrcTemp = event.srcElement;
	if (selectSrcTemp.name != null) {
		selectSrc = selectSrcTemp;
	}
}

function menuEvent() {
	selectSrcTemp = event.srcElement;
	if (selectSrcTemp.name != null) {
		selectSrc = selectSrcTemp;
		if (event.button == 2) {
			if ((selectSrc.tagName == "SPAN") && (selectSrc.isgotoedit != null)) {
				if (selectSrc.parentNode.parentNode.parentNode.firstChild.name == "favorites") {
					showmenu(true);
				} else {
					showmenu(false);
				}
			}
		}
	}
}
function clickItem(isNew) {
	var src = selectSrc;
	var url = src.url;
	if (url.indexOf("token") == -1) {
		url = url + "&token=" + TOKEN;
	}
	
	if(getProductCode(src.name) == "PD"){
		openPDCompo(url);
	}else{
	window.open(url, null, "menubar=no,scrollbars=yes,status=yes,toolbar=no,"
			+ "resizable=yes,titlebar=no,scrollbars=yes,location=no,"
			+ "height=" + (screen.availHeight - 30) + ",width="
			+ (screen.availWidth - 10) + ",top=0,left=0");
	}
	return;
}
function clickLeaf(isNew) {
	var src = selectSrc;
	if (src.isalwaysnew.toLowerCase() == "y") {
		isNew = true;
		newPageNumber++;
	}
	if ((src.url != null) && (src.url.length > 1) && (src.url != "null")) {
		var result = "";
		var url = src.url;
		var first = url.indexOf("@");
		var isCycle = true;
		if (first > -1) {
			while ((first > -1) && isCycle) {
				result += url.substring(0, first);
				url = url.substr(first + 1);
				var last = url.indexOf("@");
				var param;
				if (last == -1) {
					param = url.substr(0, url.length);
					isCycle = false;
				} else {
					param = url.substring(0, last);
					url = url.substring(last + 1);
				}
				if (param == "password") {
					var ns = new Array();
					var vs = new Array();
					ns[0] = "userId";
					vs[0] = top.head.document.getElementById("svUserId").value;
					var password = requestData("getpassword", "all", ns, vs);
					result += password.text;
				} else {
					try {
						value = top.head.document.getElementById(param).value;
					} catch (e) {
						// alert(param +
						// ":参数top.head.document.getElementById获取不到！");
						value = "@" + param + "@";
					}
					result += value;
				}
				first = url.indexOf("@");
				if (first < 0)
					result += url;
			}
		} else {
			result = url;
		}
		if (result.indexOf("token") == -1) {
			if (result.indexOf("?") < 0) {
				result = result + "?token=" + TOKEN;
			} else {
				result = result + "&token=" + TOKEN;
			}
		}
		result = result.replace(new RegExp("amp;", "gm"), "&");

		// 修改将菜单放入收藏夹，url不弹出错误。增加对字段isNewAdd的判断.wtm.20041012
		if (isNew || isNewAdd) {
			if(getProductCode(src.name) == "PD"){
				openPDCompo(result);
			}else{
			window
					.open(
							result,
							"A" + newPageNumber,
							"menubar=no,scrollbars=yes,status=yes,toolbar=no,"
									+ "resizable=yes,titlebar=no,scrollbars=yes,location=no,"
									+ "height=" + (screen.availHeight - 30)
									+ ",width=" + (screen.availWidth - 10)
									+ ",top=0,left=0");
			}
		} else {
			window.open(result, "main");
		}
		return;
	}

	if (src.isalwaysnew.toLowerCase() == "y") {
		isNew = true;
		newPageNumber++;
	}
	if (!isNew) {
		if (currCode != null) {
			if (document.getElementById(currCode)) {
				document.getElementById(currCode).style.color = "#134396";
			}
		}
		currCode = src.id;
		document.getElementById(currCode).style.color = "#FFFFFF";
	}
	if (!isNeedSave())
		return;
	// 修改点击收藏夹，首页IE左上角显示错误，wtm，20040727
	if (!sysTitle) {
		sysTitle = "用友A++";
	}
	// 改点击首页中的连接，IE的title错误。wtm，20041116
	var getInnerLen = src.innerHTML.indexOf("G>");
	if (!(getInnerLen < 0)) {
		top.document.title = sysTitle + "———"
				+ src.innerHTML.substr(getInnerLen + 2);
	} else {
		top.document.title = sysTitle + "———" + src.innerHTML.substr(6);
	}

	executiveURL(src.name, isNew, src.isgotoedit);

}

function executiveURL(componame, isNew, isGotoEdit) {
	var actionType = "getlistpage";
	var vsCond = "";
	if (isGotoEdit.toLowerCase() == "y") {
		actionType = "geteditpage";
		vsCond = "1=0";
	}
	if (isGotoEdit.toLowerCase() == "a") {
		actionType = "geteditpage";
		// vsCond = "1=0";
	}

	var parentCompo = selectSrc.parentcompo;
	if ((parentCompo == null) || (parentCompo == "") || (parentCompo == "null")) {
		parentCompo = componame;
	}

	var win_edit = null;
	var productCode = getProductCode(componame);
	var vsURL = "/" + productCode + "/getpage_" + componame
			+ ".action?function=" + actionType + "&condition=" + vsCond
			+ "&componame=" + componame + "&token=" + TOKEN;

	if (isV51Product(productCode))
		vsURL = "/" + productCode + "/Proxy?function=" + actionType
				+ "&condition=" + vsCond + "&componame=" + componame
				+ "&fieldvalue=" + parentCompo + "_E&unique=&token=" + TOKEN;

	if (isNew == true) {
		if(productCode == "PD"){
			openPDCompo(vsURL);
		}else{
		win_edit = open(vsURL, "A" + newPageNumber,
				"menubar=no,scrollbars=no,status=yes,toolbar=no,"
						+ "resizable=yes,titlebar=yes,scrollbars=yes,"
						+ "height=" + (screen.availHeight - 40) + ",width="
						+ (screen.availWidth - 10) + ",top=0,left=0");

		subWindowName[subWindowName.length] = win_edit;
		}
	} else {
		win_edit = top.main;
		win_edit.location.href = vsURL;
	}
	win_edit.focus();

}

function addMenuToA() { // 向桌面区域中加入项目
	var src = selectSrc;
	var doc = document;

	var com = getCommunity();
	if (com != null) {
		names = new Array();
		values = new Array();
		names[0] = "areaID";
		values[0] = event.srcElement.innerHTML;
		names[1] = "menuId";
		values[1] = src.id;

		com.doRequest("addItem", src.name, names, values, "addToA_R");
	}
}

function addToA_R(result) {

	if (result.getAttribute("success") == "false") {
		alert(result.childNodes[0].nodeValue);
		return;
	}
	if (parent.document.getElementById("main").src.indexOf("function=mainHome") > 0)
		window.open(parent.document.getElementById("main").src, "main");
}

function showNone() {
	event.returnValue = false;
}

function showmenu(bol) {
	var menuWidth = 120, menuHeight = 80;
	var rightedge = document.body.clientWidth;
	var bottomedge = document.body.clientHeight;
	var clickX = event.clientX;
	var clickY = event.clientY;
	var menuX, menuY;
	if (clickX >= menuWidth) {
		if ((clickX + menuWidth) > rightedge)
			menuX = clickX - menuWidth;
		else
			menuX = clickX;
	} else
		menuX = clickX;
	if (clickY >= menuHeight) {
		if ((clickY + menuHeight) > bottomedge)
			menuY = clickY - menuHeight;
		else
			menuY = clickY;
	} else
		menuY = clickY;
	if (bol) {
		// ie5add.disabled = true;
		if (typeof (ie5add1) != 'undefined')
			ie5add1.disabled = true;
		if (typeof (ie5add2) != 'undefined')
			ie5add2.disabled = true;
		if (typeof (ie5add3) != 'undefined')
			ie5add3.disabled = true;
		if (typeof (ie5add0) != 'undefined')
			ie5add0.disabled = true;
		// ie5del.disabled = false;
	} else {
		// ie5add.disabled = false;
		// ie5del.disabled = true;
		if (typeof (ie5add1) != 'undefined')
			ie5add1.disabled = false;
		if (typeof (ie5add2) != 'undefined')
			ie5add2.disabled = false;
		if (typeof (ie5add3) != 'undefined')
			ie5add3.disabled = false;
		if (typeof (ie5add0) != 'undefined')
			ie5add0.disabled = false;
	}
	ie5menu.style.top = menuY + document.body.scrollTop;
	ie5menu.style.left = menuX + document.body.scrollLeft;
	ie5menu.style.visibility = "visible";
	return false;
}

function hidemenuie5() {
	ie5menu.style.visibility = "hidden"
}

function highlightie5() {
	if (event.srcElement.className == "menuitems") {
		event.srcElement.style.backgroundColor = "highlight";
		event.srcElement.style.color = "white";
	}
}

function gotoNewPage() {
	isNew = true;
	newPageNumber++;
	clickLeaf(true);
}

function addToA() {
	addMenuToA();
	if (parent.document.getElementById("main").src == "main.jsp")
		window.open("main.jsp", "main");
}

function lowlightie5() {
	if (event.srcElement.className == "menuitems") {
		event.srcElement.style.backgroundColor = "";
		event.srcElement.style.color = "black";
		window.status = '';
	}
}

function closeMenuPage() {
	for ( var i = 0; i < subWindowName.length; i++) {
		subWindowName[i].close();
	}
}

function isNeedSave() {
	var result = true;
	var fs = top.main.document.getElementById("fsaveID");
	if ((fs) && (!fs.isDisabled) && (fs.style.display != "none")) {
		if (top.main.document.getElementById("status")) {
			var pageStatus = top.main.document.getElementById("status")
					.getAttribute("value");
			if ((pageStatus != "new") && (pageStatus != "edit")
					&& (pageStatus != "editing")) {
				result = true;
			}
			fs.focus();
			if (top.main.getChanged()) {
				result = confirm("当前页面上的已修改数据，真的离开吗?");
			}
		}
	}
	return result;
}

function getProductCode(compoId) {
	var dotPos = compoId.indexOf("_");
	var productCode = compoId.substring(0, dotPos);
	if (productCode == "WF") {
		var i = window.location.pathname.indexOf('/', 1);
		if (-1 != i)
			productCode = window.location.pathname.substr(1, i);
		if ("/" == productCode.charAt(0))
			productCode = productCode.substr(1, productCode.length());
	} else if (productCode == "AS" || compoId == "MA_COMPANY") {
		productCode = "admin";
	}
	return productCode;
}

function isV51Product(productCode) {
	for ( var i = 0; i < v51Products.length; i++) {
		if (productCode == v51Products[i])
			return true;
	}

	return false;
}

function openPDCompo(compoUrl) {
	var strUrl;
	if (compoUrl.indexOf(serverScheme) == 0) {
		strUrl = compoUrl;
	} else {
		strUrl = serverScheme + "://" + serverIp + ":" + serverPort + compoUrl;
	}
	ie.run("iexplore.exe" + " " + strUrl);

}
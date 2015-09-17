var hasPortlet = "";
//-------------------------页面初始化---------------------------------------
function setPageInit(){
	getHasPortletInfo();
	getPortletInfo();
}
//---------------------获取频道信息---------------------------------
function getPortletInfo(){
	var names = new Array();
	var values = new Array();
	names[0] = "portletType";
	values[0] = "01";
	var result = qryData("admin-ruleData.getPortletInfo", names, values);
	showPortletInfo(result);
}
//---------------------获取已经发布的频道信息---------------------------------
function getHasPortletInfo(){
	var names = new Array();
	var values = new Array();
	names[0] = "articleId";
	values[0] = articleId;
	var result = qryData("admin-ruleData.getHasPortletInfo", names, values);
	if(result != null){
		var entity = result.getElementsByTagName("entity");
		var portletId = null;
		var portletName = null;
		if(entity != null){
			for(i=0;i<entity.length;i++){
				if(hasPortlet != "")hasPortlet += ",";
				portletId = entity[i].childNodes(1).getAttribute("value");
				hasPortlet += portletId;
			}
		}
	}
}
//----------------------------频道信息显示-----------------------------------
function showPortletInfo(result){
	if(result != null){
		var entity = result.getElementsByTagName("entity");
		var portletId = null;
		var portletName = null;
		if(entity != null){
			for(i=0;i<entity.length;i++){
				portletId = entity[i].childNodes(4).getAttribute("value");
				portletName = entity[i].childNodes(5).getAttribute("value");
				var selected = "";
				if(portletId != null){
					if((','+hasPortlet+',').indexOf(','+portletId+',') >= 0){
						selected = " checked";
					}
					var portlet = document.getElementById("portlet");
					newRow = portlet.insertRow();
						newCell = newRow.insertCell();
							newCell.bgColor = "#ffffff";
							newCell.height = "25px";
							newCell.align = "center";
							newCell.innerHTML = "<input name='checkbox' type=\"checkbox\""+selected+">";
						newCell = newRow.insertCell();
							newCell.bgColor = "#ffffff";
							newCell.align = "center";
							newCell.innerHTML = portletName;
						newCell = newRow.insertCell();
							newCell.bgColor = "#ffffff";
							newCell.align = "center";
							newCell.innerHTML = portletId;
				}
			}
		}
	}
}
//----------------------选择/取消所有频道--------------------------------
function chkAll(){
	var form = document.getElementById("portletForm");
	for (var i=0;i<form.elements.length;i++) {
	    var e = form.elements[i];
	    if (e.name != 'chkall'){e.checked = form.chkall.checked;}
    }
}
//-------------------------发布文章到所选频道-----------------------------------------
function publish(){
	var result = "";
	var delPortlet = "";
	var addPortlet = "";
	var showTable = document.getElementById("portlet");
	for(var i=1; i<showTable.rows.length; i++){
		var row = showTable.rows[i];
		if(row.cells[0].firstChild.checked){
			result += row.cells[2].innerText;	
			result += ",";
		}	
	}
	if(result.length > 0){
		result = result.substring(0, result.length-1);	
		var portletId = result.split(",");
		for(var i=0; i<portletId.length; i++){
			if((','+hasPortlet+',').indexOf(','+portletId[i]+',') == -1){
				if(addPortlet != "")addPortlet += ",";
				addPortlet += portletId[i];
			}
		}
	}
	if(hasPortlet.length > 0){
		var hasPortletId = hasPortlet.split(",");
		for(var i=0; i<hasPortletId.length; i++){
			if((','+result+',').indexOf(','+hasPortletId[i]+',') == -1){
				if(delPortlet != "")delPortlet += ",";
				delPortlet += hasPortletId[i];
			}
		}
	}
	if(addPortlet.length == 0 && delPortlet.length == 0){
		alert("没有选择要发布的频道，或者所选频道已经发布！")	
	}else{
		window.returnValue = new Array(addPortlet, delPortlet);
		window.close();
	}
}


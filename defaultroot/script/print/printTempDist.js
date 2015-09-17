var coTplCode = "";//单位模板
//var cocode = null;//单位代码

//-------------------------页面初始化---------------------------------------
function setPageInit(){
	//cocode = DataTools.getSV("svCoCode");
	getTemplateInfo();
	getTemplateInfo(cocode);
}
//---------------------获取打印模板信息---------------------------------
function getTemplateInfo(cocode){
	var names = new Array();
	var values = new Array();
	if(!PF.isEmpty(cocode)){
		names[0] = "CO_CODE";
		values[0] = cocode;
		var result = qryData("print-ruleData.AS_GET_PRINT_TEMPINFO", names, values);
		showCoCodeTempInfo(result);
	}else{
		var result = qryData("print-ruleData.AS_GET_PRINT_TEMPINFO", names, values);
		showTempInfo(result);
	}
}

//----------------------------处理打印模板信息显示-----------------------------------
function showTempInfo(result){
	if(result != null){
		var entity = result.getElementsByTagName("entity");
		var tplCode = null;
		var tplName = null;
		if(entity != null){
			for(i=0;i<entity.length;i++){
				tplCode = entity[i].childNodes(0).getAttribute("value");
				tplName = entity[i].childNodes(1).getAttribute("value");
				if(tplCode != null && tplCode.indexOf("GL_") == 0){
					var glTemp = document.getElementById("glTplList");
					newRow = glTemp.insertRow();
						newCell = newRow.insertCell();
							newCell.bgColor = "#f7f7e7";
							newCell.innerHTML = "<input type=\"checkbox\">";
						newCell = newRow.insertCell();
							newCell.bgColor = "#f7f7e7";
							newCell.innerHTML = "<FONT FACE=\"ARIAL\" SIZE=\"2\">"+tplName+"</FONT></TD>";
						newCell = newRow.insertCell();
							newCell.bgColor = "#f7f7e7";
							newCell.innerHTML = "<FONT FACE=\"ARIAL\" SIZE=\"2\">"+tplCode+"</FONT></TD>";
				}else{
					var otherTemp = document.getElementById("otherTplList");
					newRow = otherTemp.insertRow();
						newCell = newRow.insertCell();
							newCell.bgColor = "#f7f7e7";
							newCell.innerHTML = "<input type=\"checkbox\">";
						newCell = newRow.insertCell();
							newCell.bgColor = "#f7f7e7";
							newCell.innerHTML = "<FONT FACE=\"ARIAL\" SIZE=\"2\">"+tplName+"</FONT></TD>";
						newCell = newRow.insertCell();
							newCell.bgColor = "#f7f7e7";
							newCell.innerHTML = "<FONT FACE=\"ARIAL\" SIZE=\"2\">"+tplCode+"</FONT></TD>";
				}
			}
		}
	}
}

//----------------------------处理单位打印模板信息显示-----------------------------------
function showCoCodeTempInfo(result){
	if(result != null){
		var entity = result.getElementsByTagName("entity");
		var tplCode = null;
		var tplName = null;
		if(entity != null){
			for(i=0;i<entity.length;i++){
				if(coTplCode != "")coTplCode += ",";
				tplCode = entity[i].childNodes(0).getAttribute("value");
				coTplCode += tplCode;
			}
		}
	}
}
//----------------切换模板-------------------------
function changeTemplate(){
	var selects = document.getElementById("templateinfo").value;
	//document.getElementById("templateinfo2").value = selects;
	if(selects == "gl"){
		document.getElementById("glTplList").style.display = "";
		document.getElementById("otherTplList").style.display = "none";
	}
	else{
		document.getElementById("glTplList").style.display = "none";
		document.getElementById("otherTplList").style.display = "";
	}
}
//-----------------------模板分发----------------------------
function distribute(){
	//debugger;
	var result = "";
	var isredo = false;
	var distTemp = new Array();
	var nonDistTemp = new Array();
	var showTable = null;
	if(document.getElementById("glTplList").style.display == "none"){
		showTable = document.getElementById("otherTplList");
	}else{
		showTable = document.getElementById("glTplList");
	}
	for(var i=1; i<showTable.rows.length; i++){
		var row = showTable.rows[i];
		if(row.cells[0].firstChild.checked){
			result += row.cells[2].innerText;	
			result += ",";
		}	
	}
	if(result.length > 0){
		result = result.substring(0, result.length-1);	
		var tplCode = result.split(",");
		var coTpl = coTplCode.split(",");
		for(var i=0; i<tplCode.length; i++){
			for(var j=0; j< coTpl.length; j++){
				if((tplCode[i]+"_"+cocode) == coTpl[j])break;
			}
			if(j < coTpl.length){
				distTemp[distTemp.length] = tplCode[i];
			}
			else{
				nonDistTemp[nonDistTemp.length] = tplCode[i];	
			}
		}
		if(distTemp.length > 0){
			if(confirm("模板 "+distTemp+" 已经下发过，是否重新下发？")){
				isredo = true;
			}	
		}
	}
	window.returnValue = new Array(result, isredo, nonDistTemp.join(","));
	window.close();
}
function closewin(){
	window.returnValue = null;
	window.close();	
}

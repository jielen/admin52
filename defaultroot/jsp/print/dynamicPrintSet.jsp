<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus"%>
<%
	String componame = request.getParameter("componame");
	String pageName = request.getParameter("pageName");
	if (componame == null || componame.equals("undefined")) {
		componame = "";
	}
	String path = request.getContextPath();
%>

<html>
	<head>
		<title>打印设置</title>
		<link href="<%=path%>/script/applus.css" rel="stylesheet" type="text/css">
		<SCRIPT language="javascript" src="<%=path%>/script/Community.js"></SCRIPT>
		<SCRIPT language="javascript" src="<%=path%>/script/General.js"></SCRIPT>
		<SCRIPT language="VBScript" src="<%=path%>/script/formenctype.vbs"></SCRIPT>
		<SCRIPT language="javascript" src="<%=path%>/script/print.js"></SCRIPT>
		<SCRIPT language="javascript" src="<%=path%>/script/prndbxml.js"></SCRIPT>
		<script language="javascript">
		var	svUserID = "";
		var	vsCompoName = "<%=componame%>";
		var pageName = "<%=pageName%>";
		var vsPageType;
		var params;
		function init(){
			var names = new Array();
			var values = new Array();
			names[0] = "pageName";
			values[0] = pageName;
			var com = getCommunity();
			if(com != null){
				com.doRequest("compoTplInfo",vsCompoName,names,values,"getPrintSet");
			}
		}
		function getPrintSet(result){
			//debugger;
			if(result!=null){
				var compoTplInfo = result.getElementsByTagName("CompoTplInfo");
				var tplCode = "";
				var tplName = "";
				var coCode = "";
				if(compoTplInfo!=null){
					for(i=0;i<compoTplInfo.length;i++){
						tplCode = compoTplInfo[i].getElementsByTagName("tplCode")[0].firstChild.data;
						coCode = compoTplInfo[i].getElementsByTagName("coCode")[0].firstChild.data;
						document.getElementById("tplCode").add(document.createElement("OPTION"));
						document.getElementById("tplCode").options[i].value = tplCode;
						document.getElementById("tplCode").options[i].text = tplCode;
						document.getElementById("tplCode").options[i].id = coCode;
					}
					var optionFirst = document.createElement("OPTION");
					optionFirst.setAttribute("value","notemplate");
					optionFirst.setAttribute("id","notemplate");
          			optionFirst.appendChild(document.createTextNode("无模板"));
					document.getElementById("tplCode").appendChild(optionFirst);
					var optionSec = document.createElement("OPTION");
					optionSec.setAttribute("value","multitemplate");
					////optionSec.setAttribute("id","multitemplateCode");
          			optionSec.appendChild(document.createTextNode("多模板"));
					document.getElementById("tplCode").appendChild(optionSec);
					for(i=0;i<compoTplInfo.length;i++){
						tplCode = compoTplInfo[i].getElementsByTagName("tplCode")[0].firstChild.data;
						tplName = compoTplInfo[i].getElementsByTagName("tplName")[0].firstChild.data;
						coCode = compoTplInfo[i].getElementsByTagName("coCode")[0].firstChild.data;
						document.getElementById("tplName").add(document.createElement("OPTION"));
						document.getElementById("tplName").options[i].value = tplCode;
						document.getElementById("tplName").options[i].text = tplName;
						document.getElementById("tplName").options[i].id = coCode;
					}
					var optionFirst = document.createElement("OPTION");
					optionFirst.setAttribute("value","notemplate");
					optionFirst.setAttribute("id","notemplate");
          			optionFirst.appendChild(document.createTextNode("无模板"));
					document.getElementById("tplName").appendChild(optionFirst);
					//var optionSec = document.createElement("OPTION");
					//optionSec.setAttribute("value","multitemplate");
					//optionSec.setAttribute("id","multitemplate");
          //			optionSec.appendChild(document.createTextNode("多模板"));
					//document.getElementById("tplName").appendChild(optionSec);
				}
			}
			params = window.dialogArguments;
			if(!params)	return;
			initParams(params);
			svUserID = params["UserID"];
			var vsTplCode = params["TplCode"];
			if(vsTplCode)
				vsTplCode = vsTplCode.replace(/%2C/g,",");
			setSelectTplCode(vsTplCode);
			setSelectTplName(vsTplCode);
			var vsExportType = params["ExportType"];
			setSelectExportType(vsExportType);
			var vsIsPreview = params["IsPreview"];
			setSelectIsPreview(vsIsPreview);
			setTempalteDesigner();
		}
		function setSelectTplCode(vsTplCode){
			var voTplCodeSelect = getObjectById("tplcode");
			if(!voTplCodeSelect)
				return;
			//alert(voTplCodeSelect.options[voTplCodeSelect.selectedIndex].id);
			if(!vsTplCode || vsTplCode == "notemplate"){
				voTplCodeSelect.value = "notemplate";
			}
			else if(vsTplCode.indexOf(",") == -1){
				if(isExistSelectedTplCode(vsTplCode))
					voTplCodeSelect.value = vsTplCode;
				else
					voTplCodeSelect.selectedIndex = 0;
			}
			else{
				voTplCodeSelect.value = "multitemplate";
			}
		}
		
		function setSelectTplName(vsTplCode){
			var voTplNameSelect = getObjectById("tplname");
			if(!voTplNameSelect)
				return;
			if(!vsTplCode || vsTplCode == "notemplate"){
				setTplNameVisible();
				setMultiTemplateHidden();
				voTplNameSelect.value = "notemplate";
			}
			else if(vsTplCode.indexOf(",") == -1){
				setTplNameVisible();
				setMultiTemplateHidden();
				if(isExistSelectedTplCode(vsTplCode))
					voTplNameSelect.value = vsTplCode;
				else
					voTplNameSelect.selectedIndex = 0;
			}
			else{
				setTplNameHidden();
				setMultiTemplateVisible();
				var voMultiTemplate = getObjectById("multitemplate");
				if(voMultiTemplate)
					voMultiTemplate.value = vsTplCode;
			}
		}
		
		function isExistSelectedTplCode(vsTplCode){
			var isExist = true;
			var voTplCodeSelect = getObjectById("tplcode");
			if(!voTplCodeSelect)
				return !isExist;
			for(var i = 0; i < voTplCodeSelect.options.length; i++){
				if(voTplCodeSelect.options[i].value == vsTplCode)
					break;
			}
			if(i >= voTplCodeSelect.options.length)
				isExist = false;
			return isExist;
		}
		
		function setSelectExportType(vsExportType){
			if(!vsExportType)
				vsExportType = "0";
			var voExportType = getObjectById("exporttype");
			if(voExportType)
				voExportType.value = vsExportType;
			if(vsExportType == "0")
				setIsPreviewVisible();
			else
				setIsPreviewHidden();
		}
		
		function setSelectIsPreview(vsIsPreview){
			var voIsPreview = getObjectById("ispreview");
			if(voIsPreview)
				if(vsIsPreview == "N")
					voIsPreview.checked = false;
				else
					voIsPreview.checked = true;
		}
		
		function setTempalteDesigner(){
			if(svUserID != "sa"){
				setTemplateDesignerDisabled();
			}
			else{
				var voTplCode = getObjectById("tplcode");
				if(!voTplCode)
					return;
				if(voTplCode.value == "notemplate" || voTplCode.value == "multitemplate")
					setTemplateDesignerDisabled();
				else
					setTemplateDesignerEnabled();
			}
		}
		
		function initParams(params){
			if(!params)
				return;
			vsPageType = params["PageType"];
			if(!vsCompoName)
				vsCompoName = params["CompoID"];
		}
		
		function getObjectById(name){
			return document.getElementById(name);
		}
		
		function cancelSet(){
			window.close();
		}
		
		function applySet(){
			var vasValues = getPrintSetValues();
			vasValues["TemplateDesigner"] = "N" ;
			window.returnValue = vasValues;
			window.close();
		}
		
		/**
		 *
		 */
		function templatedesigner(){
			var vasValues = getPrintSetValues();
			vasValues["TemplateDesigner"] = "Y" ;
			window.returnValue = vasValues;
			window.close();
		}
		
		/**
		 *
		 */
		function getPrintSetValues(){
			var vasValues = new Array();
			vasValues["UserID"] = svUserID;
			vasValues["CompoID"] = vsCompoName;
			vasValues["PageType"] = vsPageType;
			vasValues["TplCode"] = getTplCode();
			vasValues["ExportType"] = getExportType();
			vasValues["IsPreview"] = getIsPreview();
			return vasValues;
		}
		
		
		/**
		 *
		 */
		function getTplCode(){
			var vsTplCode = "";
			var voTplCodeSelect = getObjectById("tplcode");
			if(!voTplCodeSelect)
				return;
			if(voTplCodeSelect.value == "multitemplate"){
				vsTplCode = getObjectById("multitemplate").value;
			}
			else if(voTplCodeSelect.value == "notemplate"){
				vsTplCode = voTplCodeSelect.value;
			}
			else{
				vsTplCode = voTplCodeSelect.value;
			}
			vsTplCode = vsTplCode.replace(/，/g, ",");
			return vsTplCode;
		}
		
		/**
		 *
		 */
		function getExportType(){
			var vsExportType = "0";
			var voExportType = getObjectById("exporttype");
			if(voExportType)
				vsExportType = voExportType.value;
			return vsExportType;
		}
		
		/**
		 *
		 */
		function getIsPreview(){
			var vsIsPreview = "N";
			var voIsPreview = getObjectById("ispreview");
			if(voIsPreview){
				if(getExportType() == "0")
					if(voIsPreview.checked)
						vsIsPreview = "Y";
			}
			return vsIsPreview;
		}
		
		
		/**
		 *
		 */
		
		function setTemplateDesignerDisabled(){
			var voTemplateDesigner = getObjectById("templatedesigner");
			if(voTemplateDesigner)
				voTemplateDesigner.disabled = true;
		}
		
		/**
		 *
		 */
		function setTemplateDesignerEnabled(){
			var voTemplateDesigner = getObjectById("templatedesigner");
			if(voTemplateDesigner)
				voTemplateDesigner.disabled = false;
		}
		
		/**
		 *
		 */
		
		function setTemplateDesignerVisible(){
			var voTemplateDesigner = getObjectById("templatedesignertd");
			if(voTemplateDesigner)
				voTemplateDesigner.style.display = "";
		}
		
		/**
		 *
		 */
		function setTemplateDesignerHidden(){
			var voTemplateDesigner = getObjectById("templatedesignertd");
			if(voTemplateDesigner)
				voTemplateDesigner.style.display = "none";
		}
		
		/**
		 *
		 */
		
		function setMultiTemplateVisible(){
			var voMultiTemplate = getObjectById("multitemplatetr");
			if(voMultiTemplate)
				voMultiTemplate.style.display = "";
		}
		
		/**
		 *
		 */
		function setMultiTemplateHidden(){
			var voMultiTemplate = getObjectById("multitemplatetr");
			if(voMultiTemplate)
				voMultiTemplate.style.display = "none";
		}
		
		/**
		 *
		 */
		
		function setTplNameVisible(){
			var voTplName = getObjectById("tplNametr");
			if(voTplName)
				voTplName.style.display = "";
		}
		
		/**
		 *
		 */
		function setTplNameHidden(){
			var voTplName = getObjectById("tplNametr");
			if(voTplName)
				voTplName.style.display = "none";
		}
		
		
		/**
		 *
		 */
		
		function setIsPreviewVisible(){
			var voIsPreview = getObjectById("ispreviewtr");
			if(voIsPreview)
				voIsPreview.style.display = "";
		}
		
		/**
		 *
		 */
		function setIsPreviewHidden(){
			var voIsPreview = getObjectById("ispreviewtr");
			if(voIsPreview)
				voIsPreview.style.display = "none";
		}
		
		/**
		 *
		 */
		
		function setIsPreviewChecked(){
			var voIsPreview = getObjectById("ispreview");
			if(voIsPreview)
				voIsPreview.checked = true;
		}
		
		/**
		 *
		 */
		function setIsPreviewUnChecked(){
			var voIsPreview = getObjectById("ispreview");
			if(voIsPreview)
				voIsPreview.checked = false;
		}
		
		/**
		 *
		 */
		
		function tplCode_change(){
			var voTplCode = getObjectById("tplcode");
			if(!voTplCode)
				return;
			var voTplName = getObjectById("tplname");
			if(voTplName)
				voTplName.value = voTplCode.value;
			if(voTplCode.value == "multitemplate"){
				setTplNameHidden();
				setMultiTemplateVisible();
			}
			else{
				setMultiTemplateHidden();
				setTplNameVisible();
			}
			setTempalteDesigner();
		}
		
		function tplName_change(){
			var voTplName = getObjectById("tplname");
			if(!voTplName)
				return;
			var voTplCode = getObjectById("tplcode");
			if(voTplCode)
				voTplCode.value = voTplName.value;
			if(voTplName.value == "multitemplate"){
				setTplNameHidden();
				setMultiTemplateVisible();
			}
			else{
				setMultiTemplateHidden();
				setTplNameVisible();
			}
			setTempalteDesigner();
		}
		
		function exportType_change(){
			var voExportType = getObjectById("exporttype");
			if(!voExportType)
				return;
			if(voExportType.value == "0"){
				setIsPreviewVisible();
				setIsPreviewChecked();
			}
			else{
				setIsPreviewHidden();
				setIsPreviewUnChecked()
			}
		}
		</script>
	</head>
	<body onload="init();" background="/style/img/main/global_bg.gif">
		<table width="100%" border="0">
			<tr>
				<td>
					<table width="100%" border="0">
						<tr>
							<td>
								<div align="right">	打印模板代码&nbsp;&nbsp;</div>
							</td>
							<td>
								<select id="tplcode" name="tplcode" onChange="tplCode_change();" style="width:200px;">
								</select>
							</td>
						</tr>
						<tr id="tplnametr">
							<td>
								<div align="right">	打印模板名称&nbsp;&nbsp;</div>
							</td>
							<td>
								<select id="tplname" name="tplname" onChange="tplName_change();" style="width:200px;">
								</select>
							</td>
						</tr>
						<tr id="multitemplatetr">
							<td>
								<div align="right">	输入多模板代码	</div>
							</td>
							<td>
								<input title="多模版代码，英文逗号分隔" name="multitemplate" type="text"
									id="multitemplate" value="" size="20">
							</td>
						</tr>
						<tr>
							<td>
								<div align="right">
									输出文件类型&nbsp;&nbsp;
								</div>
							</td>
							<td>
								<select id="exporttype" name="select"
									onChange="exportType_change();">
									<option value="0" selected>
										PDF
									</option>
									<option value="1">
										XLS
									</option>
									<option value="5">
										RTF
									</option>
									<option value="2">
										HTML
									</option>
									<option value="3">
										CSV
									</option>
								</select>
							</td>
						</tr>
						<tr id="ispreviewtr">
							<td>
								<div align="right">
									打印之前预览&nbsp;&nbsp;
								</div>
							</td>
							<td>
								<input name="ispreview" type="checkbox" id="ispreview" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<table width="100%" border="0">
						<tr>
							<td width="180" align="right">
								<div id="templatedesignertd">
									<input type="button" name="tempdesigner" id="templatedesigner"
										value="进入模板设计器" onclick="templatedesigner()">
								</div>
							</td>
							<td width="80" align="right">
								<input type="button" name="Button" value="确定" onclick="applySet()">
							</td>
							<td width="90" align="center">
								<input type="button" name="Button" value="返回" onclick="cancelSet()">
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>

	</body>
</html>

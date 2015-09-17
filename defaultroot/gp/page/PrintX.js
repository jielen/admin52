/*
Title: gp.page.PrintX
Description: 打印管理。
Company: 用友政务
Author: zhangyw;
*/
// import PageX.sRootPath; // defined in ..\..\script\Community.js

//----------------------------------------------------------------------
//声明页面中的全局对象;
var PrintX = new PrintX();
//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function PrintX(){

  this.CLASSNAME= "gp.page.PrintX";

  this.sName= this.CLASSNAME;//对象名称.
  this.vPrintParameters = new Map();//打印参数
	this.vPrintSetParameters = new Map();//打印设置参数
  
  //public;
  this.init= PrintX_init;
  this.fprintset = PrintX_fprintset;
  this.fdynamicPrintSet = PrintX_fdynamicPrintSet;
  this.jasperdesigner = PrintX_jasperdesigner;
  this.getPrintSetParam = PrintX_getPrintSetParam;
  this.setPrintSetParam = PrintX_setPrintSetParam;
  this.getJSESSIONID = PrintX_getJSESSIONID;
	this.setJSESSIONID = PrintX_setJSESSIONID;
  this.getPSCookiesFromFile = PrintX_getPSCookiesFromFile;
  this.setPSCookiesToFile = PrintX_setPSCookiesToFile;
  this.getPrintSetOptions = PrintX_getPrintSetOptions;
  this.getPSOptionsFromFile = PrintX_getPSOptionsFromFile;
  this.setPSOptionsToFile = PrintX_setPSOptionsToFile;
  this.getAdvancedPrintSet = PrintX_getAdvancedPrintSet;
  this.getPSFromDB = PrintX_getPSFromDB;
  this.setPSToDB = PrintX_setPSToDB;
	this.getPrintSetXML = PrintX_getPrintSetXML;
	this.setPrintSetXML = PrintX_setPrintSetXML;
	this.getPSCookiesFromServer = PrintX_getPSCookiesFromServer;
	this.setPSCookiesToServer = PrintX_setPSCookiesToServer;
	this.getPSOptionsFromServer = PrintX_getPSOptionsFromServer;
	this.setPSOptionsToServer = PrintX_setPSOptionsToServer;
	this.getSvUserID = PrintX_getSvUserID;
	
  this.fprint = PrintX_fprint;
  this.fprint_list = PrintX_fprint_list;
  this.fprint_edit = PrintX_fprint_edit;
  this.fprint_report = PrintX_fprint_report;
  this.fprint_select = PrintX_fprint_select;
  
  this.printWithTemplate_L = PrintX_printWithTemplate_L;
  this.printNoTemplate_L = PrintX_printNoTemplate_L;
  this.printWithTemplate_E = PrintX_printWithTemplate_E;
  this.printNoTemplate_E = PrintX_printNoTemplate_E;
  this.printWithTemplate_R = PrintX_printWithTemplate_R;
  this.printNoTemplate_R = PrintX_printNoTemplate_R;

	this.callEditPagePrintWithTpl = PrintX_callEditPagePrintWithTpl;
	this.getListSelectPrintData = PrintX_getListSelectPrintData;
	this.getListSelectPrintDataOneDelta = PrintX_getListSelectPrintDataOneDelta;
	this.getListPagePrintData = PrintX_getListPagePrintData;
	this.getAllListCurrentPagePrintData = PrintX_getAllListCurrentPagePrintData;
  this.extractParams = PrintX_extractParams;
  this.getListPageParameter = PrintX_getListPageParameter;
  this.isExistHtmlFile = PrintX_isExistHtmlFile;
  this.getTplFile = PrintX_getTplFile;
  this.getPrintDataXML = PrintX_getPrintDataXML;
  this.getPageDataXML = PrintX_getPageDataXML;
  this.getVisualChildTableName = PrintX_getVisualChildTableName;
  this.isPrintDirect = PrintX_isPrintDirect;
  this.getPageName = PrintX_getPageName;
  this.getRealPageName = PrintX_getRealPageName;
  this.getPageWidth = PrintX_getPageWidth;
  this.getPagePrams = PrintX_getPagePrams;
  this.getTabstripObjHTML = PrintX_getTabstripObjHTML;
  this.getTableLabels_L = PrintX_getTableLabels_L;
  this.getTableFields_L = PrintX_getTableFields_L;
  this.getMainTableData = PrintX_getMainTableData;
  this.isSupport = PrintX_isSupport;
  this.getDomTreeDepth = PrintX_getDomTreeDepth;
  this.getPageLabels_E = PrintX_getPageLabels_E;
  this.getTableLabels_E = PrintX_getTableLabels_E;
  this.getTitleLabel_E = PrintX_getTitleLabel_E;
  this.getMainDataLabels_E = PrintX_getMainDataLabels_E;
  this.getPageFields_E = PrintX_getPageFields_E;
  this.getVisualChildTableName = PrintX_getVisualChildTableName;  

  this.getFixRowCount = PrintX_getFixRowCount;
  this.getMaxRowCount = PrintX_getMaxRowCount;
  this.calMaxRowCount = PrintX_calMaxRowCount;
  this.getObjHeight = PrintX_getObjHeight;
  this.unitConvert = PrintX_unitConvert;
  this.getRowHeaderHeight = PrintX_getRowHeaderHeight;
  this.getRowDetailHeight = PrintX_getRowDetailHeight;
  this.getChildTableObj = PrintX_getChildTableObj;
  this.getPageHeaderH = PrintX_getPageHeaderH;
  this.getPageFooterH = PrintX_getPageFooterH;
  this.getFFCaption = PrintX_getFFCaption;
  this.getFFCaptionValue = PrintX_getFFCaptionValue;
  this.getReportTableObj = PrintX_getReportTableObj;
  this.getChildTableName = PrintX_getChildTableName;
  
  this.setParameter = PrintX_setParameter;
  this.getParameter = PrintX_getParameter;
  this.setPrintSetParameter = PrintX_setPrintSetParameter;
	this.getPrintSetParameter = PrintX_getPrintSetParameter;
  
  this.printpg_printer = PrintX_printpg_printer;
  this.createPrintFrame = PrintX_createPrintFrame;
	this.getHostAddr = PrintX_getHostAddr;
	this.isAcrobatPlugin = PrintX_isAcrobatPlugin;
	this.getPdfVersion = PrintX_getPdfVersion;
	this.AcroPluginCheck = PrintX_AcroPluginCheck;
	this.NNShowVersionInfo = PrintX_NNShowVersionInfo;
	this.IEShowVersionInfo = PrintX_IEShowVersionInfo;
	
	this.isListPageTemplate = PrintX_isListPageTemplate;
	this.getContinuePrintCondition = PrintX_getContinuePrintCondition;
	
	this.getPrintSetInfo = PrintX_getPrintSetInfo;
	this.setPrintSetInfo = PrintX_setPrintSetInfo;
	this.getBeforeFprintPrintSetInfo = PrintX_getBeforeFprintPrintSetInfo;
	this.getBeforeFdynamicPrintSetInfo = PrintX_getBeforeFdynamicPrintSetInfo;
	this.getCookiesPrintSetInfo = PrintX_getCookiesPrintSetInfo;
	this.getDefaultPrintSetInfo = PrintX_getDefaultPrintSetInfo;
	this.setCookiesPrintSetInfo = PrintX_setCookiesPrintSetInfo;
	this.getPageType = PrintX_getPageType;
	this.isListPage = PrintX_isListPage;
	this.formatPrintSetInfo = PrintX_formatPrintSetInfo;
	this.resolvePrintSetInfo = PrintX_resolvePrintSetInfo;
	this.setPrintSetInfoToServer = PrintX_setPrintSetInfoToServer;
	this.getServerPrintSetInfo = PrintX_getServerPrintSetInfo;
	this.getPrintSetInfoFromServer = PrintX_getPrintSetInfoFromServer;
	this.getCompoPageTplCode = PrintX_getCompoPageTplCode;
	this.getDefaultTplCode = PrintX_getDefaultTplCode;
	this.evaluatePrintSetInfo = PrintX_evaluatePrintSetInfo;
	this.evaluatePrintSetInfo1 = PrintX_evaluatePrintSetInfo1;
	this.isNoTemplatePrint = PrintX_isNoTemplatePrint;
	
	this.getCompoName = PrintX_getCompoName;
	this.doPrintStart = PrintX_doPrintStart;
	this.isPreview = PrintX_isPreview;
	this.addChildTableForCompoMeta = PrintX_addChildTableForCompoMeta;
	this.encodeAllSelectedKeys = PrintX_encodeAllSelectedKeys;
	this.setPrintCommonParamters = PrintX_setPrintCommonParamters;
	this.setParamtersWithSql = PrintX_setParamtersWithSql;
	this.setValueSetParamter = PrintX_setValueSetParamter;
	
  //private;
  //this.init();
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function PrintX_init(tIsFinalClass){
  this.vPrintParameters.put("PageType",PageX.sPageType);
  this.vPrintParameters.put("DynamicTpl","0");
}
//----------------------------------------------------------------------
//public;打印设置
//返回值:void;
function PrintX_fprintset(){
	this.fdynamicPrintSet();
}
//----------------------------------------------------------------------
//public;打印设置
//返回值:void;
function PrintX_fdynamicPrintSet(){
	var vasInfo = new Array();
	var componame = "";
	var pageName = "";
	try{
		vasInfo = this.getPrintSetInfo();
		var vasBfInfo = this.getBeforeFdynamicPrintSetInfo();
		vasInfo = this.evaluatePrintSetInfo1(vasInfo, vasBfInfo);
		componame = this.getCompoName();
		pageName = this.getPageName();
	}
	catch(e){
		vasInfo["UserID"] = this.getSvUserID();
		vasInfo["CompoID"] = this.getCompoName();
		vasInfo["PageType"] = this.getPageType();	
	}
	var win = showModalDialog(PageX.sRootPath + "/dispatcher.action?function=dynamicPrintSet&componame="+componame+"&pageName="+pageName+"",vasInfo,
													"resizable:yes;status:no;help:no;dialogHeight:263px;dialogWidth:425px;");
	try{
		if(win){
			var params = win;
			this.setPrintSetInfo(params);
			if(params["TemplateDesigner"] == "Y"){
				if(params["TplCode"])
					if(params["TplCode"] != "notemplate" && params["TplCode"] != "multitemplate")
						this.jasperdesigner(pageName,componame,params["TplCode"]);
			}
		}
	}
	catch(e){
		//
	}
}

//---------------------------------------------------------------------//
//进入jasperreport模板设计器，modified by hmgkevin on 08-03-12
//---------------------------------------------------------------------//
function PrintX_jasperdesigner(entityName,componame,tpl_code){
	var names = new Array();
	var values = new Array();
	names[0] = "componame";
	values[0] = componame;
	names[1] = "tplCode";
	names[2] = "reportType";
	if(trim(tpl_code)!=""){
		values[1] = tpl_code;
		values[2] = "";
	}else{
		values[1] = "";
		if(entityName.charAt(entityName.length-1)=="L"){
			values[2]= '%L';
		}else if (entityName.charAt(entityName.length-1)=="E"){
			values[2]= '%E';
		}else
			values[2]= "";
	}
	var result = qryData("print-ruleData.AS_GET_PRINT_JASPERTEMP",names,values);
	var prn_compo_id;
	var prn_tpl_jpcode;
	var prn_tpl_name;
	var prn_tpl_reporttype;
	var prn_tpl_fixrowcount;
	var newflag=true;//数据库中存在为false，不存在为true
	if(result){
		if(result.childNodes.length == 0){
			prn_compo_id = entityName.substring(0,entityName.length-2);
			prn_tpl_jpcode=entityName;
			if (opener != null){
					doc= opener.document;
					if (doc){
						prn_tpl_name=doc.title;
					}
			}else
				prn_tpl_name=entityName;
			if (entityName.charAt(entityName.length-1)=="L"){
				prn_tpl_reporttype = "mainTable_L";
			}
			else if (entityName.charAt(entityName.length-1)=="E"){
				prn_tpl_reporttype = "mainTable_E";
			}
			prn_tpl_fixrowcount=0;
		}else{
			prn_compo_id=result.firstChild.firstChild.getAttribute("value");
			prn_tpl_jpcode=result.firstChild.firstChild.nextSibling.getAttribute("value");
			prn_tpl_name=result.firstChild.firstChild.nextSibling.nextSibling.getAttribute("value");
			prn_tpl_reporttype=result.firstChild.firstChild.nextSibling.nextSibling.nextSibling.getAttribute("value");
			prn_tpl_fixrowcount=result.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("value");
			newflag=false;//数据库中存在为false，不存在为true
		}
	}else{
		prn_compo_id = entityName.substring(0,entityName.length-2);
		prn_tpl_jpcode=entityName;
		if(opener != null){
			doc= opener.document;
			if (doc){
				prn_tpl_name = doc.title;
			}
		}else{
			prn_tpl_name = entityName;
		}
		if(entityName.charAt(entityName.length-1)=="L"){
			prn_tpl_reporttype = "mainTable_L";
		}else if (entityName.charAt(entityName.length-1)=="E"){
			prn_tpl_reporttype = "mainTable_E";
		}
		prn_tpl_fixrowcount = 0;
	}
	var componameprn = entityName;
	var cocode = DataTools.getSV("svCoCode");
	var svUserId = DataTools.getSV("svUserID");
	if(cocode != null){
		if("sa" == svUserId){
			cocode = "*";	
		}
	}else{
		cocode = "*";	
	}
	var win = window.open(PageX.sRootPath + "/dispatcher.action?function=prntempdesigner&componame="+prn_compo_id+"&prnTplName="+prn_tpl_name+"&prnTplCode="+prn_tpl_jpcode+"&reporttype="+prn_tpl_reporttype+"&newflag="+newflag+"&FIXROWCOUNT="+prn_tpl_fixrowcount+"&componameprn="+componameprn+"&cocode="+cocode,"模板设计器",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
}
//----------------------------------------------------------------------
//public;获取打印参数
//返回值: 成功：参数数组;失败：null；
/*
  获取打印时的基本参数，返回参数为一数组，遵循以下原则：
  	1.	某部件cookie管理设置优先级最高;
  	2.	在没有设置上图参数时，系统根据某部件的情况来决定打印情况，
  		i.	若部件已设置过打印模板则以第一个打印模板为默认打印情况;
  		ii.	若部件没有设置打印模板则直接打印为默认打印情况;
  
  返回参数为一数组result情况的说明：三种情况
  A。fop打印：返回两个元素
  		result[0]:为部件名+“_L” 或 部件名+“_E” ;列表页面为部件名+“_L”；编辑页面为部件名+“_E”；
  		result[1]:值为"fop" 区分fop/jasperreport
  B。jasperreport打印 页面打印  返回六个元素
  		result[0]:为部件名+“_L” 或 部件名+“_E” ;列表页面为部件名+“_L”；编辑页面为部件名+“_E”；
  		result[1]:值为"jasperreport" 区分fop/jasperreport
  		result[2]:值为"notemplate" 区分notemplate/template
  		result[3]:值为true/false  要求打印空数据列
  		result[4]:值为true/false  要求打印零数据列
  		result[5]:值为0/1/2/3/4 输出文件的五种类型（PDF、XLS、CSV、HTML、XML）
  C。jasperreport打印 模板打印  返回五个元素
  		result[0]:为部件名+“_L” 或 部件名+“_E” ;列表页面为部件名+“_L”；编辑页面为部件名+“_E”；
  		result[1]:值为"jasperreport" 区分fop/jasperreport
  		result[2]:值为"template" 区分notemplate/template
  		result[3]:值为当前设置的模板文件名代码
  		result[4]:值为0/1/2/3/4 输出文件的五种类型（PDF、XLS、CSV、HTML、XML）
*/
function PrintX_getPrintSetParam(){
	if(typeof(before_fdynamicPrintSet) == "function")
		eval("before_fdynamicPrintSet()");	
	var result = new Array();
	var aCookie = document.cookie.split("; ");
	var entityName = this.getPageName();
	var m=0;
  	var bnotemp;
  	var bblueprint;
  	for (var i=0; i < aCookie.length; i++){
    	var aCrumb = aCookie[i].split("=");
    	if (entityName + "compopagename" == aCrumb[0]){
      	result[m] = aCrumb[1];
				m++;
    	}
    	if (entityName + "blueprint" == aCrumb[0]){
    		var printType = this.getPrintSetParameter("PrintType");
			if(printType == "fop"){
				result[m] = "fop";
				return result;
			} 
      		result[m] = aCrumb[1];
				if (aCrumb[1]=="jasperreport")
					bblueprint=true;
				m++;
    		}   	
			if (bblueprint){
		    	if (entityName + "selectprint" == aCrumb[0]){
		      		result[m] = aCrumb[1];
					if (aCrumb[1]=="notemplate")
							bnotemp="notemplate";
					else
							bnotemp="template";
					m++;
		    	}
				if (bnotemp=="notemplate"){
				   	if (entityName + "printEmpty" == aCrumb[0]){
				      	result[m] = aCrumb[1];
						m++;
				    }
				   	if(entityName + "printZero" == aCrumb[0]){
				    	result[m] = aCrumb[1];
						m++;
				    }
				   	if(entityName + "exportType" == aCrumb[0]){
				   		var exportType = this.getPrintSetParameter("ExportType");
			  		 	if(!exportType)
			  			 	result[m] = aCrumb[1];
			  		 	else
			  			 	result[m]=exportType; 	
						m++;
				    }
			 	}
				if (bnotemp=="template"){
				   if(entityName + "tplcode" == aCrumb[0]){
				   		if(aCrumb[1] && aCrumb[1] != "" && aCrumb[1] != null && aCrumb[1].length > 0)
				   			aCrumb[1] = aCrumb[1].replace("%2C",",")
				    		var tplCode = this.getPrintSetParameter("TplCode");
								if(!tplCode)
				    			result[m] = aCrumb[1];
		  					else
		  						result[m] = tplCode;
							m++;
				    	}
				   if(entityName + "tplexportType" == aCrumb[0]){
				   	 var exportType = this.getPrintSetParameter("ExportType");
			  		 if(!exportType)
			  			 result[m] = aCrumb[1];
			  		 else
			  			 result[m]=exportType; 
							m++;
				    	}
			  	}
			}
  	}
  //如果存在打印模板默认为模板打印信息，
  //否则列表页面默认为直接打印，编辑页面为模板打印
	if (!result || result.length==0){
		var params = this.getPSCookiesFromFile(entityName);
		if(params && params.length > 0){
			result[0] = entityName;
			var printType = this.getPrintSetParameter("PrintType");
			if(printType == "fop"){
				result[1] = "fop";
				return result;
			}
			result[1] = params[1];
 			if(params[1]=="jasperreport"){
 				result[2] = params[2];
				if(params[2]=="notemplate"){
					result[3] = params[5];
					result[4] = params[6];
		  		var exportType = this.getPrintSetParameter("ExportType");
		  		if(!exportType)
		  			result[5] = params[4];
		  		else
		  			result[5]=exportType; 		
				}
				else if (params[2]=="template"){
					var tplCode = this.getPrintSetParameter("TplCode");
					if(!tplCode)
 						result[3] = params[3];
 					else
 						result[3] = tplCode;
			  	var exportType = this.getPrintSetParameter("ExportType");
		  		if(!exportType)
		  			result[4] = params[4];
		  		else
		  			result[4]=exportType;						
				}
			}
		}else{
			result[0]=entityName;
			var printType = this.getPrintSetParameter("InitPrintType");
			if(printType == "fop"){
				result[1] = "fop";
				return result;
			}
			result[1]="jasperreport";
			var names = new Array();
  			var values = new Array();
  			names[0] = "componame";
  			values[0] = this.getCompoName();
  			//names[1] = ""
			names[1] = "reportType";
			if (entityName.charAt(entityName.length-1)=="L"){
 				values[1] = '%L';
			}
			else if (entityName.charAt(entityName.length-1)=="E"){
 				values[1] = '%E';
			}
    		var sdetaildelta=qryData("print-ruleData.AS_GET_PRINT_JASPERTEMP",names,values);
			if (!sdetaildelta){//没有模板
				//if (entityName.charAt(entityName.length-1)=="L"){
				result[2]="notemplate";
		  		result[3]=true;
		  		result[4]=true;
		  		var exportType = this.getPrintSetParameter("InitExportType");
		  		if(!exportType)
		  			result[5]=0;
		  		else
		  			result[5]=exportType;
		  		//setPSCookiesToFile(result);
				//}
	  		}
			else{
				//var xmldom = new ActiveXObject("Microsoft.XMLDOM");
				//xmldom.loadXML(sdetaildelta);
				var results = sdetaildelta;
   				var vfields=new Array();
   				var vouttype;
 				if(results.getAttribute("success") == "false"){
					vfields[0]="";
 				}else{
					for (var i=0,j=results.childNodes.length; i<j; i++){
	    				var field = results.childNodes.item(i).childNodes;
	     				vfields[i] = field.item(1).getAttribute("value");
         				vouttype= field.item(5).getAttribute("value");
     				}
      				if (results.childNodes.length == 0)
      					vfields[0]="";
  				}
				if (vfields[0]!=""){
					result[2]="template";
					var tplCode = this.getPrintSetParameter("InitTplCode");
					if(!tplCode)
 						result[3]=vfields[0];
					else
						result[3] = tplCode;
					if (vouttype!="")
 						result[4]=vouttype;
      				else
      					result[4]=0;
		  			var exportType = this.getPrintSetParameter("InitExportType");
			  		if(!exportType)
			  			result[4]=0;
			  		else
	  					result[4]=exportType;
				}
				else{
					//if (entityName.charAt(entityName.length-1)=="L"){
					result[2]="notemplate";
		  			result[3]=true;
		  			result[4]=true;
			  		var exportType = this.getPrintSetParameter("InitExportType");
			  		if(!exportType)
			  			result[5]=0;
			  		else
			  			result[5]=exportType;
	  			}
			}
		}
	}
  	return result;
}
//----------------------------------------------------------------------
//public;设置打印参数
//返回值: void;
function PrintX_setPrintSetParam(params){
	//var expire = new Date();
	var vsJSESSIONID = this.getJSESSIONID();
  	var str = "";
	//expire.setFullYear(expire.getFullYear(expire) + 1);
	var entityName=escape(params[0]);
	str = entityName + "compopagename=" + escape(params[0]);
  	document.cookie = str;
	//document.cookie = str + "; expires=" + expire.toGMTString();
	var result = new Array();
	result[0] = entityName;
	result[1] = params[1];
	if (params[1]=="fop"){
		str = entityName + "blueprint="  + escape(params[1]);
		document.cookie = str;
		for(var i = 2; i < 7; i++){
			result[i] = "";
		}
	}
	else if (params[1]=="jasperreport"){
		str = entityName + "blueprint="  + escape(params[1]);
		document.cookie = str;
		result[2] = params[2];
		if (params[2]=="notemplate"){
			str = entityName + "selectprint="  + escape(params[2]);
			document.cookie = str;
			str = entityName + "printEmpty=" + escape(params[3]);
			document.cookie = str;
		 	str = entityName + "printZero=" + escape(params[4]);
			document.cookie = str;
		  	str = entityName + "exportType=" + escape(params[5]);
			document.cookie = str;
			result[3] = "";
			result[4] = params[5];
			result[5] = params[3];
			result[6] = params[4];
		}
		else if (params[2]=="template"){
			str = entityName + "selectprint="  + escape(params[2]);
			document.cookie = str;
			str = entityName + "tplcode="  + params[3];
			document.cookie = str;
			str = entityName + "tplexportType="  + escape(params[4]);
			document.cookie = str;
			result[3] = params[3];
			result[4] = params[4];
			result[5] = "";
			result[6] = "";
		}
	}
	this.setJSESSIONID(vsJSESSIONID);
	this.setPSCookiesToFile(result);
}
//----------------------------------------------------------------------
//public;从cookie中取得JSESSIONID
//返回值: 成功：JSESSIONID;失败：null；
function PrintX_getJSESSIONID(){//TODO:统一获取cookie信息
	var vsJSESSIONID = null;
	var J_SESSION_ID = "JSESSIONID";
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++){
		var aCrumb = aCookie[i].split("=");
		if(J_SESSION_ID == aCrumb[0]){
			vsJSESSIONID = aCrumb[1];
			break;	
		}
	}
	return vsJSESSIONID;
}
//----------------------------------------------------------------------
//public;设置JSESSIONID；
//返回值: 成功：true;失败：false；
function PrintX_setJSESSIONID(vsJSESSIONID){//TODO:统一设置cookie信息
	if(!vsJSESSIONID)
		return;
	var J_SESSION_ID = "JSESSIONID";
	var aCookie = document.cookie.split("; ");
	var i=0;
	for (; i < aCookie.length; i++){
		var aCrumb = aCookie[i].split("=");
		if(J_SESSION_ID == aCrumb[0]){
			break;	
		}
	}
	if(i >= aCookie.length){
		document.cookie = J_SESSION_ID + "=" + vsJSESSIONID;
	}
	return true;
}

//----------------------------------------------------------------------
//public;从文件获取打印参数
//返回值: 成功：参数数组;失败：null；
/*
  *打印设置时，若不能使用cookies，从存储cookies信息的文件读取设置参数
  *存储格式如下：
  *<PRINTSETCOOKIES><pageName att1 att2 .... /></PRINTSETCOOKIES>
  *pageName为标记名
  *attr1为属性，顺序如下：
  *1.printType
  *2.isTemplate
  *3.tplCode
  *4.exportType
  *5.printNull
  *6.printZero
  *前7个参数是打印基本设置，从第8个开始是新增的打印高级选项
*/
function PrintX_getPSCookiesFromFile(pageName){
	
	var result = this.getPSCookiesFromServer(pageName);
	return result;
	
	var result = new Array();
	var fileName = "PRINTSETCOOKIES";
	try{
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (!fso.FolderExists("c:\\cookies")){
			fso.CreateFolder("c:\\cookies");
	}
	if (!fso.FileExists("c:\\cookies\\" + fileName + ".txt")){
		return 0;
	}else{
		var file = fso.OpenTextFile("c:\\cookies\\" + fileName + ".txt",1);
		var psCookies = file.ReadAll();
		file.close();
		if(psCookies != "" && psCookies.length > 0){
			var xmldom = new ActiveXObject("Microsoft.XMLDOM");
			xmldom.loadXML(psCookies);
			var results = xmldom.documentElement;
			if(results.childNodes.length != 0){
				var pageNodes = results.getElementsByTagName(pageName);
				if(pageNodes != null && pageNodes.length > 0){
					result[0] = pageName;
					var attributes = pageNodes[0].attributes;
					for(var i = 0; i < attributes.length; i++)
						result[i+1] = attributes[i].value;
				}
				else{
					return 0;
				}
			}
			else{
				return 0;
			}
		}
		else{
			return 0;
		}
	}
		return result;
	}
	catch(e){
		alert("出现异常情况，此操作要读写本地硬盘文件以记住打印参数。\n这个功能要对IE浏览器设置。\n\n"+
		"具体操作方法是: " + "\n\t点击浏览器的     工具——>Internet选项——>安全——>本地Intranet——>自定义级别，\n"+
		"将对没有标记为安全的ActiveX控件进行初始化和脚本运行设置成『启用』。并将站点设置位可信任站点。" +
		"\n\n\t如有其他安全工具也要求降低安全设置。");
	}
}
//----------------------------------------------------------------------
//public;将打印参数写入文件
//返回值: void;
/*
 *打印设置时，使用cookies存储信息的同时也用文件保存。
 *文件位置：c:\cookies÷PRINTSETCOOKIES;
*/
function PrintX_setPSCookiesToFile(params){

	this.setPSCookiesToServer(params);
	return;
	
	var pageName = params[0];
	var fileName = "PRINTSETCOOKIES";
	try{
	  var result;
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		if (!fso.FolderExists("c:\\cookies")){
			fso.CreateFolder("c:\\cookies");
		}
		var file = null;
		if (!fso.FileExists("c:\\cookies\\" + fileName + ".txt")){
  			file = createFile(fileName);
  			var root = "<PRINTSETCOOKIES>" + "\n" + "</PRINTSETCOOKIES>";
				file.Write(root);
				file.close();
		}
		file = fso.OpenTextFile("c:\\cookies\\" + fileName + ".txt",1);
		var psCookies = file.ReadAll();
		file.close();
		if(psCookies == "" || psCookies.length == 0)
			psCookies = "<PRINTSETCOOKIES>" + "\n" + "</PRINTSETCOOKIES>";
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		xmldom.loadXML(psCookies);
		var results = xmldom.documentElement;
		var pageNodes = results.getElementsByTagName(pageName);
		if(pageNodes == null || pageNodes.length == 0){
			var pageNode=xmldom.createNode(1, pageName, "");
			pageNode.setAttribute("printType",params[1]);
			pageNode.setAttribute("isTemplate",params[2]);
			pageNode.setAttribute("tplCode",params[3]);
			pageNode.setAttribute("exportType",params[4]);
      if (params[5]==null)
        params[5]="";
			if (params[6]==null)
        params[6]="";
			pageNode.setAttribute("printNull",escape(params[5]));
			pageNode.setAttribute("printZero",escape(params[6]));
			results.appendChild(pageNode);
		}
		else{
			var attributes = pageNodes[0].attributes;
			for(var i = 0; i < attributes.length; i++){
				if(i != 2){
					params[i+1] = escape(params[i+1]);
				}
				pageNodes[0].setAttribute(attributes[i].name,params[i+1]);
			}
		}
		file = fso.OpenTextFile("c:\\cookies\\" + fileName + ".txt",2);
		file.Write(results.xml);
		file.close();
	}
	catch(e){
    alert("出现异常情况，此操作要读写本地硬盘文件以记住打印参数。\n这个功能要对IE浏览器设置。\n\n"+
		"具体操作方法是: " + "\n\t点击浏览器的     工具——>Internet选项——>安全——>本地Intranet——>自定义级别，\n"+
		"将对没有标记为安全的ActiveX控件进行初始化和脚本运行设置成『启用』。并将站点设置位可信任站点。" +
		"\n\n\t如有其他安全工具也要求降低安全设置。");
	}
}
//----------------------------------------------------------------------
//public;取得打印高级选项设置
//返回值: 成功：XML格式数据;失败："";
/*
 *取得打印高级选项设置，数据格式是<elements><element>......<element><elements>。
 *在使用时，同其他参数一起传递给服务器。names是options，value是上述数据。
 *可以传递多个模板的设置参数，以<elements>分隔。
 */
function PrintX_getPrintSetOptions(){
	var result = "";
	var pageName = "";
	var tplCode = new Array();
	var params = this.getPrintSetParam();
	if(params[1] == "jasperreport")
		if(params[2] == "template"){
			pageName = params[0];
			if(params[3]){
				tplCode = params[3].split(",");
			}
		}
	if(pageName != ""){
		var params = new Array();
		for(var i = 0; i < tplCode.length; i++){
			var param = this.getPSOptionsFromFile(pageName,tplCode[i]);
			if(param && param.length > 0)
				params[i] = param;
		}
		result = this.getAdvancedPrintSet(params);
	}
  return result;
}
//----------------------------------------------------------------------
//public;读取打印高级选项
//返回值: 成功：参数数组;失败：null;
/*
 *	从存储cookies的文件中读取打印高级选项，格式如下：
 * <AS_COMPANY_E printType="jasperreport" isTemplate="template" tplCode="AS_COMPANY_E3"
 * exportType="0" printNull="" printZero="" >  -----打印基本信息
 *   <AS_COMPANY_E3 pageSize="" pageWidth="" pageHeight="" pageLeftMargin="" pageRightMargin=""
 *	 pageTopMargin="" pageBottomMargin="" />   -----打印高级选项
 * </AS_COMPANY_E>
 * return:
 * params[0] = "pageName" + "," + "tplName"
 * params[1] = "pageSize"
 * params[2] = "pageWidth"
 * params[3] = "pageHeight"
 * params[4] = "pageLeftMargin"
 * params[5] = "pageRightMargin"
 * params[6] = "pageTopMargin"
 * params[7] = "pageBottomMargin"
 * params[8] = "printOrder"
 * params[9] = "printDirect"
 */
function PrintX_getPSOptionsFromFile(pageName,tplName){

	var result = this.getPSOptionsFromServer(pageName, tplName);
	return result;
	
	var result = new Array();
	var fileName = "PRINTSETCOOKIES";
	try{
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		if (!fso.FolderExists("c:\\cookies")){
			fso.CreateFolder("c:\\cookies");
		}
		if (!fso.FileExists("c:\\cookies\\" + fileName + ".txt")){
			return 0;
		}
		var file = fso.OpenTextFile("c:\\cookies\\" + fileName + ".txt",1);
		var psCookies = file.ReadAll();
		file.close();
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		xmldom.loadXML(psCookies);
		var results = xmldom.documentElement;
		var pageNodes = results.getElementsByTagName(pageName);
		var tplNodes = pageNodes[0].getElementsByTagName(tplName);
		if(tplNodes != null && tplNodes.length > 0){
			result[0] = tplName;
			var attributes = tplNodes[0].attributes;
			for(var i = 0; i < attributes.length; i++)
				result[i+1] = attributes[i].value;
		}
		else{
			return 0;
		}
		return result;
	}
	catch(e){
    alert("出现异常情况，此操作要读写本地硬盘文件以记住打印参数。\n这个功能要对IE浏览器设置。\n\n"+
		"具体操作方法是: " + "\n\t点击浏览器的     工具——>Internet选项——>安全——>本地Intranet——>自定义级别，\n"+
		"将对没有标记为安全的ActiveX控件进行初始化和脚本运行设置成『启用』。并将站点设置位可信任站点。" +
		"\n\n\t如有其他安全工具也要求降低安全设置。");
	}
}
//----------------------------------------------------------------------
//public;设置打印高级选项
//返回值: void;
/*
 *将打印高级选项存储到文件中，存储格式如下：
 * <AS_COMPANY_E printType="jasperreport" isTemplate="template" tplCode="AS_COMPANY_E3"
 * exportType="0" printNull="" printZero="" >  -----打印基本信息
 *   <AS_COMPANY_E3 pageSize="" pageWidth="" pageHeight="" pageLeftMargin="" pageRightMargin=""
 *	 pageTopMargin="" pageBottomMargin="" />   -----打印高级选项
 * </AS_COMPANY_E>
 * params是打印高级选项，具体含义：
 * params[0] = "pageName" + "," + "tplName"
 * params[1] = "pageSize"
 * params[2] = "pageWidth"
 * params[3] = "pageHeight"
 * params[4] = "pageLeftMargin"
 * params[5] = "pageRightMargin"
 * params[6] = "pageTopMargin"
 * params[7] = "pageBottomMargin"
 * params[8] = "printOrder"
 * params[9] = "printDirect"
 */
function PrintX_setPSOptionsToFile(params){
	
	this.setPSOptionsToServer(params);
	return;
	
	var fileName = "PRINTSETCOOKIES";
	var pageName = params[0].substring(0,params[0].indexOf(","));
	var tplName = params[0].substring(params[0].indexOf(",") + 1);
	try{
	  var result;
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		if (!fso.FolderExists("c:\\cookies")){
			fso.CreateFolder("c:\\cookies");
		}
		var file1 = null;
		if (!fso.FileExists("c:\\cookies\\" + fileName + ".txt")){
  			file1 = createFile(fileName);
  			var root = "<PRINTSETCOOKIES>" + "\n" + "</PRINTSETCOOKIES>";
				file1.Write(root);
				file1.close();
		}
		var file = fso.OpenTextFile("c:\\cookies\\" + fileName + ".txt",1);
		var psCookies = file.ReadAll();
		file.close();
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		xmldom.loadXML(psCookies);
		var results = xmldom.documentElement;
		var pageNodes = results.getElementsByTagName(pageName);
		if(pageNodes != null && pageNodes.length >= 0){
			var tplNodes = pageNodes[0].getElementsByTagName(tplName);
			if(tplNodes == null || tplNodes.length == 0){
				var tplNode = xmldom.createNode(1, tplName, "");
				tplNode.setAttribute("pageSize",params[1]);
				tplNode.setAttribute("pageWidth",params[2]);
				tplNode.setAttribute("pageHeight",params[3]);
				tplNode.setAttribute("pageLeftMargin",params[4]);
				tplNode.setAttribute("pageRightMargin",params[5]);
				tplNode.setAttribute("pageTopMargin",params[6]);
				tplNode.setAttribute("pageBottomMargin",params[7]);
        tplNode.setAttribute("printOrder",params[8]);
				tplNode.setAttribute("printDirect",params[9]);
				pageNodes[0].appendChild(tplNode);
			}
			else{
				var attributes = tplNodes[0].attributes;
				for(var i = 0; i < attributes.length; i++)
					tplNodes[0].setAttribute(attributes[i].name,params[i+1]);
        if(attributes.getNamedItem("printOrder") == null)
					tplNodes[0].setAttribute("printOrder",params[8]);
				if(attributes.getNamedItem("printDirect") == null)
					tplNodes[0].setAttribute("printDirect",params[9]);
			}
		}
		file = fso.OpenTextFile("c:\\cookies\\" + fileName + ".txt",2);
		file.Write(results.xml);
		file.close();
	}
	catch(e){
    alert("出现异常情况，此操作要读写本地硬盘文件以记住打印参数。\n这个功能要对IE浏览器设置。\n\n"+
		"具体操作方法是: " + "\n\t点击浏览器的     工具——>Internet选项——>安全——>本地Intranet——>自定义级别，\n"+
		"将对没有标记为安全的ActiveX控件进行初始化和脚本运行设置成『启用』。并将站点设置位可信任站点。" +
		"\n\n\t如有其他安全工具也要求降低安全设置。");
	}
}
//----------------------------------------------------------------------
//public;取得打印高级选项设置
//返回值: 成功：XML格式数据;失败："";
/**
 * 打印高级选项向服务器端传递的参数，在有些情况下需要覆盖。
 * 传递的数据是xml格式，<elements><element>...
 * ......</element></elements>,其中每一个<element>包含每个模板的高级选项。
 * 每个<element>包含的参数如下：
 * <tplCode></tplCode> 模板代码
 * <pageWidth></pageWidth>
 * <pageHeight></pageHeight>
 * <pageLeftMargin></pageLeftMargin>
 * <pageRightMargin></pageRightMargin>
 * <pageTopMargin></pageTopMargin>
 * <pageBottomMargin></pageBottomMargin>
 * <printDirect></printDirect> 是否直接输出到打印机
 * 这些参数也可以不传。如果传递，模板代码是必传项。
 */
function PrintX_getAdvancedPrintSet(params){
	if(!params || params.length == 0)
		return "";
	result = "";
  result += "<elements>";
  for(var i = 0; i < params.length; i++){
  	result += "<element>";
  	result += "<tplCode>";
  	result += params[i][0].substring(params[i][0].indexOf(",") + 1);
  	result += "</tplCode>";
  	result += "<pageWidth>";
  	result += params[i][2];
  	result += "</pageWidth>";
  	result += "<pageHeight>";
  	result += params[i][3];
  	result += "</pageHeight>";
  	result += "<pageLeftMargin>";
  	result += params[i][4];
  	result += "</pageLeftMargin>";
  	result += "<pageRightMargin>";
  	result += params[i][5];
  	result += "</pageRightMargin>";
  	result += "<pageTopMargin>";
  	result += params[i][6];
  	result += "</pageTopMargin>";
 	  result += "<pageBottomMargin>";
  	result += params[i][7];
  	result += "</pageBottomMargin>";
    result += "<printDirect>";
		result += params[i][9];
		result += "</printDirect>";
  	result += "</element>";
  }
  result += "</elements>";
  return result;
}
//----------------------------------------------------------------------
//public;打印
//返回值: void;
function PrintX_fprint(){
	var beforeF = true;
	if(typeof(before_fprint) == "function")
			beforeF = eval("before_fprint()");
	if(!beforeF) return;
	var sPageType = this.getParameter("PageType");
	if(!sPageType){
		sPageType = PageX.sPageType;
	}
	if(sPageType == "list"){
		this.fprint_list();
	}else if(sPageType == "edit"){
		this.fprint_edit();
	}else if(sPageType == "report"){
		this.fprint_report();
	}else if(sPageType == "select"){
		this.fprint_select();//此功能没有实现
	}
}

//----------------------------------------------------------------------
//public;列表页面打印函数
//返回值: void;
function PrintX_fprint_list(){
	var names = new Array();
	var values = new Array();
	var vasInfo = this.getPrintSetInfo();
	if(this.isNoTemplatePrint(vasInfo)){
		values[0] = "30,0,50,20,printer_title,n,打印人: ";
		values[1] = "70,0,80,20,printer,n," + DataTools.getSV("svUserName");
		this.printNoTemplate_L(vasInfo, names, values, 40, 40);	
	}
	else{
		var continuePrint = this.getParameter("ContinuePrint");
		if(continuePrint){
			this.callEditPagePrintWithTpl(vasInfo);
		}else{
			var tplCode = vasInfo["TplCode"];
			var vsIsListPageTemplate = this.isListPageTemplate(tplCode);
			if(!vsIsListPageTemplate){
	 	 	  	this.callEditPagePrintWithTpl(vasInfo);
			}
	 	  	else{
		 	  	this.printWithTemplate_L(vasInfo, names, values);
	 	  	}
		}		
	}
}
//----------------------------------------------------------------------
//public;编辑页面打印函数
//返回值: void;
function PrintX_fprint_edit(){
	var names = new Array();
	var values = new Array();	
	var vasInfo = this.getPrintSetInfo();
	if (this.isNoTemplatePrint(vasInfo)){
		names[0] = "0,0,50,20,printer,n,打印人";
		names[1] = "50,0,100,20,printer1,n," + DataTools.getSV("svUserName");
		var pageHeaderContent = this.getParameter("PageHeaderContent");
		if(!pageHeaderContent)pageHeaderContent = " 编辑页面无模板打印";
		this.printNoTemplate_E(vasInfo, names, values , pageHeaderContent, 220, 40);
	}
	else{
		this.setPrintCommonParamters(names, values);
		names[names.length] = "PRINT_DATA";
		var printData = this.getParameter("PrintData");
		if(!printData){
			printData = this.getPrintDataXML();
		}
		values[values.length] = printData;
		
		this.printWithTemplate_E(vasInfo, names, values);
	}
}
//----------------------------------------------------------------------
//public;报表页面打印函数
//返回值: void;
function PrintX_fprint_report(){
	var names = new Array();
	var values = new Array();
	var vasInfo = this.getPrintSetInfo();
	if (this.isNoTemplatePrint(vasInfo)){
		names[0] = "0,0,50,20,printer,n,打印人";
		names[1] = "50,0,100,20,printer1,n," + DataTools.getSV("svUserName");
		this.printNoTemplate_R(vasInfo, " ",names,"报表页面无模板打印",100,40);
	}
	else{
		var printData = this.getParameter("PrintData");
		if(printData){
			this.fprint_edit();	
		}else{
			this.setPrintCommonParamters(names, values);
			if(this.getParameter("sqlid")){
				names[names.length] = "ruleID";
				values[values.length] = this.getParameter("sqlid");
			}
			if(this.getParameter("condition")){
				names[names.length] = "condition";
				values[values.length] = this.getParameter("condition");
			}
		this.printWithTemplate_R(vasInfo, names, values);
		}
	}
}
//----------------------------------------------------------------------
//public;选择页面打印函数
//返回值: void;
function PrintX_fprint_select(){
	alert("页面打印功能没有实现！");
}
//----------------------------------------------------------------------
//public;列表页面有模板打印
//返回值: void;
/**
 * 列表页面有模板打印
 * @param paramName 模板中定义的参数字段数据
 * @param paramValue 与参数字段对应的参数值
 * @param templateName 打印模板名称
 */
function PrintX_printWithTemplate_L(vasInfo, paramName, paramValue){

	var names = new Array();
	var values = new Array();
	
	this.setPrintCommonParamters(names, values);
	names[names.length] = "parameters";
	this.getListPageParameter(paramName, paramValue);
	values[values.length] = this.extractParams(paramName,paramValue);
	this.setParamtersWithSql(names, values);
	names[names.length] = "printType";
	values[values.length] = "LIST_TPL";
	this.setValueSetParamter(names, values);
	
	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;列表页面无模板打印
//返回值: void;
/**
 * 列表页面动态打印
 * @param params 动态打印时根据需要动态加入的元素位置内容等信息
 * @param pageHeaderH 指定jasperReport模板的表头区域高度
 * @param pageFooterH 指定jasperReport模板的表尾区域高度
 */
function PrintX_printNoTemplate_L(vasInfo, pnames, pvalues, pageHeaderH, pageFooterH){
	var names = new Array();
	var values = new Array();
	var valueSet = "";
	var voListGrid = PageX.getListGrid();
	var tablemeta = DataTools.getTableData(voListGrid.getTableName());
	names[0] = "compoName";
	values[0] = this.getCompoName();
	names[1] = "pageWidth";
	values[1] = this.getPageWidth(voListGrid);
	names[2] = "pageHeight";
	values[2] = "";
	names[3] = "rowHeaderHeight";
	values[3] = this.getRowHeaderHeight(voListGrid);
	names[4] = "rowDetailHeight";
	values[4] = this.getRowDetailHeight();
	names[5] = "params";
	values[5] = this.getPagePrams(pvalues);
	names[6] = "labels";
	values[6] = this.getTableLabels_L(voListGrid);
  	names[7] = "fields";
  	values[7] = this.getTableFields_L(voListGrid);
  	//alert(values[6]);
	names[8] = "cnName";
  	values[8] = "列表页面无模板打印";
  	names[9] = "printEmpty";
  	values[9] = "";
  	names[10] = "printZero";
  	values[10] = "";
  	names[11] = "exportType";
  	values[11] = vasInfo["ExportType"];
  	names[12] = "pageHeaderH";
  	values[12] = pageHeaderH;
  	names[13] = "pageFooterH";
  	values[13] = pageFooterH;
  	
  	this.setValueSetParamter(names, values);
	
	names[names.length]= "printType";
  	values[values.length] = "LIST_NOTPL";
  	
  	var printData = this.getParameter("PrintData");
	if(printData){
		names[names.length] = "PRINT_DATA";
		values[values.length] = printData;
	}else{		
	  	this.setParamtersWithSql(names, values);
	} 
	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;列表页面调用编辑页面的打印接口，实现连续打印
//返回值: void;
function PrintX_callEditPagePrintWithTpl(vasInfo){
	var names = new Array();
	var values = new Array();
	
	this.setPrintCommonParamters(names, values);
	this.setValueSetParamter(names, values);
	
	var printData = this.getParameter("PrintData");
	if(!printData){
		names[names.length] = "CONTINUE_CONDITION";
		values[values.length] = this.getContinuePrintCondition();
		names[names.length] = "CONTINUE_RULEID";
		var ruleID = this.getParameter("sqlid");
		if(!ruleID) {
			ruleID = "";
		}
		values[values.length] = ruleID;
		
		this.setParamtersWithSql(names, values);
	}else{
		names[names.length] = "PRINT_DATA";
		values[values.length] = printData;
	}
	var continuePrint = this.getParameter("ContinuePrint");
	if(continuePrint){
		names[names.length] = "ContinuePrint";
		values[values.length] = continuePrint;
	}	
	var childTableName = this.getParameter("ChildTableName");
	if(childTableName){
		names[names.length] = "ChildTableName";
		values[values.length] = childTableName;	
	}
  	this.printWithTemplate_E(vasInfo,names,values);	
}

/**
 * @deprecated
 * @return
 */
function PrintX_getAllListCurrentPagePrintData(){//TODO:去掉前台拼接printdata
	var result = "";
	var voListGrid = PageX.getListGrid();
  	var vaiRowIndex= new Array();
  	for (var i= 0, len= voListGrid.getRowCount(); i< len; i++){
	    voRow= voListGrid.oLockBodyTable.rows(i);
	    if (voRow== null) continue;
	    voCheckBox= voRow.firstChild.firstChild;
	    if (voCheckBox== null || voCheckBox.nodeName!= "INPUT") continue;
	    vaiRowIndex[vaiRowIndex.length]= voRow.rowIndex;
  	}
	if(!vaiRowIndex || vaiRowIndex.length == 0){
		result = "<template><delta></delta></template>";
		return result;
	}
	result += "<template>\n";
	result += "<delta>\n";
	var fieldNames = voListGrid.getFieldNames();
	for (var i = 0; i < vaiRowIndex.length; i ++ ){
		result += "<entity name = \"head\">\n";
		for(var j = 0; j < fieldNames.length; j++){
			var fieldValue = voListGrid.getValueByRowField(vaiRowIndex[i], fieldNames[j]);
			if(fieldValue == null)fieldValue = "";
			result += "<field name=\""+fieldNames[j]+"\" value=\""+fieldValue+"\" />\n";
 		}
 		result += "</entity>\n";
  	}
	result += "</delta>\n";
	result += "</template>\n";
  	return result;
}
//----------------------------------------------------------------------
/**
 * 取得列表页面选中行的打印数据包
 * @deprecated
 * @return xml数据
 */
function PrintX_getListSelectPrintDataOneDelta(){//TODO:去掉前台拼接printdata
	var result = "";
	var sDynamicTpl = this.getParameter("DynamicTpl");
	var voListGrid = PageX.getListGrid();
	var selectRows = voListGrid.getSelectedRowIndexs();
	if(!selectRows || selectRows.length == 0){
		result = "<template><delta></delta></template>";
		return result;
	}
	result += "<template>\n";
	result += "<delta>\n";
	var fieldNames = voListGrid.getFieldNames();
	for (var i = 0; i < selectRows.length; i ++ ){
		result += "<entity name = \"body\">\n";
		for(var j = 0; j < fieldNames.length; j++){
			if(!voListGrid.isColVisible(fieldNames[j]) && sDynamicTpl == "1"){
		  		continue;
		  	}
			var fieldValue = voListGrid.getValueByRowField(selectRows[i], fieldNames[j]);
			result += "<field name=\""+fieldNames[j]+"\" value=\""+fieldValue+"\" />\n";
 		}
 		result += "</entity>\n";
  }
  result += "</delta>\n";
 	result += "</template>\n";
  //showMessage(result)
  return result;
}
//----------------------------------------------------------------------
/**
 * 取得列表页面选中行的打印数据包
 * @deprecated 
 */
function PrintX_getListSelectPrintData(){//TODO:去掉前台拼接printdata
	var result = "";
	var voListGrid = PageX.getListGrid();
	var selectRows = voListGrid.getSelectedRowIndexs();
	if(!selectRows || selectRows.length == 0){
		result = "<template><delta></delta></template>";
		return result;
	}
	var fieldNames = voListGrid.getFieldNames();
	for (var i = 0; i < selectRows.length; i ++ ){
		result += "<template>\n";
		result += "<delta>\n";
		result += "<entity name = \"head\">\n";
		for(var j = 0; j < fieldNames.length; j++){
			var fieldValue = voListGrid.getValueByRowField(selectRows[i], fieldNames[j]);
			if(fieldValue == null){
				fieldValue = "";	
			}
			result += "<field name=\""+fieldNames[j]+"\" value=\""+fieldValue+"\" />\n";
 		}
 		result += "</entity>\n";
 		result += "</delta>\n";
 		result += "</template>\n";
  }
  //showMessage(result)
  return result;
 }
/**
 * @deprecated
 * @return
 */
function PrintX_getListPagePrintData(){//TODO:去掉前台拼接printdata
	var result = "";
	var voListGrid = PageX.getListGrid();
	var selectRows = voListGrid.getSelectedRowIndexs();
	if(!selectRows || selectRows.length == 0){
		result = "<template><delta></delta></template>";
		return result;
	}
	var selectRowArray = new Array();
	var selectRow = this.getContinuePrintCondition();
	selectRowArray = selectRow.split(",");
	var tabledataXML = DataTools.getTableData(DataTools.getMainTableName());
	var tableDataRow = tabledataXML.selectNodes("//row");
	
	for(var i = 0; i < selectRows.length; i++){
		result += "<template>\n";
		result += "<delta>\n";
		result += "<entity name = \"head\">\n";
		var vasKeyField = selectRowArray[i].split(";");//主键字段
		for(var j=0;j<tableDataRow.length;j++){
			var isSelectRow = true;
			for(var k=0;k<vasKeyField.length;k++){
				var vasKey = vasKeyField[k].split("=")[0];
				var vasValue = vasKeyField[k].split("=")[1];
				var tableValue = tableDataRow[j].getElementsByTagName(vasKey)[0].firstChild.data;
				if(tableValue != vasValue){
					isSelectRow = false;
					break;
				}
			}
			if(isSelectRow){
				var nodeList = tableDataRow[j].childNodes;
				for(var m=0;m<nodeList.length;m++){
					var nodeName = nodeList[m].nodeName;
					var nodeValue = nodeList[m].text;
					if(nodeValue == null)nodeValue = "";
					result += "<field name=\""+nodeName+"\" value=\""+PF.getHtmlEncode(nodeValue)+"\" />\n";
				}
				break;
			}
		}
		result += "</entity>\n";
 		result += "</delta>\n";
 		result += "</template>\n";
	}
	return result;
}
function PrintX_getContinuePrintCondition(){
	var result = "";
	var voListGrid = PageX.getListGrid();
	var sTableName = voListGrid.getTableName();
	var vasKeyField= DataTools.getKeyFieldNames(sTableName);
	var selectRows = voListGrid.getSelectedRowIndexs();
	if(!selectRows || selectRows.length == 0){
		return result;
	}
	var iRow = 0;
	var vsCondition = "";
	for (var i = 0; i < selectRows.length; i ++ ){
		iRow = selectRows[i];
		vsCondition= PageX.makeCondition(sTableName, iRow, vasKeyField);
		result += vsCondition;
		if(i != selectRows.length - 1)
			result += ",";
	}
  return result;
}

function PrintX_getListPageParameter(names, values){
	if(!names) names = new Array();
	if(!values) values = new Array();
  var vsMainTable= DataTools.getMainTableName();
  var voFree= null;
  voFree= PageX.getFree(vsMainTable);
  if (voFree == null) {
  	var voSearch = PageX.getFreeManager().getSearchByTableName(vsMainTable);
  	if(voSearch == null) return false;
  	var vaoEditBox = null;
  	for(var j = 0; j < voSearch.length; j++){
	  	vaoEditBox = voSearch[j].getAllEditBox();
	  	if(vaoEditBox == null) continue;
	  	var vsEditBoxValue;
	  	for (var k= 0; k< vaoEditBox.length; k++){
	  		if(!vaoEditBox[k]) continue;
	  		if(vaoEditBox[k].CLASSNAME == "gp.page.ComboBox"){
		    	vsEditBoxValue = vaoEditBox[k].getText();
		    }else{
		    	vsEditBoxValue = vaoEditBox[k].getValue();
		    }
	  		if(vaoEditBox[k].getFieldName()){
			    names[names.length] = vaoEditBox[k].getFieldName();
			    values[values.length] = vsEditBoxValue;
		    }
		    if(vaoEditBox[k].getOuterPanel().id){
		    	if(vaoEditBox[k].getOuterPanel().id != vaoEditBox[k].getFieldName()){
				    names[names.length] = vaoEditBox[k].getOuterPanel().id;
				    values[values.length] = vsEditBoxValue;
			    }
		    }
		  }
	  }
  }
  else{
	  var vasFieldNames = voFree.getFieldNames();
	  if(vasFieldNames == null) return false;
	  for (var k= 0; k< vasFieldNames.length; k++){
	  	if(vasFieldNames[k]){
		    names[names.length] = vasFieldNames[k];
		    values[values.length] = voFree.getValue(vasFieldNames[k]);
	    }
	  }
  }
}
//----------------------------------------------------------------------
//public;编辑页面有模板打印
//返回值: void;
function PrintX_printWithTemplate_E(vasInfo, names, values){
	names[names.length]= "printType";
  	values[values.length] = "EDIT_TPL";
	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;编辑页面无模板打印
//返回值: void;
/**
 * 编辑页面动态打印
 * @param params 动态打印时根据需要动态加入的元素位置内容等信息
 * @param pageHeaderContent 页眉显示的内容
 * @param pageHeaderH 指定jasperReport模板的表头区域高度
 * @param pageFooterH 指定jasperReport模板的表尾区域高度
 */
function PrintX_printNoTemplate_E(vasInfo, pnames, pvalues,pageHeaderContent,pageHeaderH,pageFooterH){
  	var support = this.isSupport();
  	if(!support){
	    alert("此部件不支持动态打印!请选择非动态打印方式");
	  	return;
  	}
  	var names = new Array();
  	var values = new Array();
  	var voEditGrid = this.getChildTableObj();
  	names[0] = "compoName";
  	values[0]= this.getCompoName();
  	names[1] = "pageWidth";
  	values[1] = this.getPageWidth(voEditGrid);
  	names[2] = "pageHeight";
  	values[2] = "";
  	names[3] = "rowHeaderHeight";
  	values[3] = this.getRowHeaderHeight(voEditGrid);
  	names[4] = "rowDetailHeight";
	values[4] = this.getRowDetailHeight();
  	names[5] = "params";
  	values[5] = this.getPagePrams(pnames);  
  	names[6] = "labels";
  	values[6] = this.getPageLabels_E(voEditGrid);
  	names[7] = "fields";
	values[7] = this.getPageFields_E(voEditGrid);
	names[8] = "cnName";
  	values[8] = pageHeaderContent;
  	//alert(values[6]);

  	names[9] = "printEmpty";
  	values[9] = "";
  	names[10] = "printZero";
  	values[10] = "";
  	names[11] = "exportType";
  	values[11] = vasInfo["ExportType"];
  	names[12] = "PRINT_DATA";
  	values[12] = this.getPrintDataXML();
  	//alert(values[12]);
  	names[13] = "pageHeaderH";
  	values[13] = this.getPageHeaderH(voEditGrid);
  	if(values[13] == 0)
  		values[13] = pageHeaderH;
  	names[14] = "pageFooterH";
  	values[14] = this.getPageFooterH();
  	if(values[14] == 0)
  		values[14] = pageFooterH;
  	names[15]= "printType";
  	values[15] = "EDIT_NOTPL";

	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;报表页面有模板打印
//返回值: void;
function PrintX_printWithTemplate_R(vasInfo, names, values){
	names[names.length]= "printType";
  	values[values.length] = "REPORT_TPL";
	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;报表页面无模板打印
//返回值: void;
/**
 * 报表页面无模板打印
 * @param areaName 取数放置的区域名\uFFFD
 * @param params 动态打印时根据需要动态加入的元素位置内容等信息
 * @param pageHeaderContent 页眉显示的内容
 * @param pageHeaderH 指定jasperReport模板的表头区域高度
 * @param pageFooterH 指定jasperReport模板的表尾区域高度
 */
function PrintX_printNoTemplate_R(vasInfo, areaName,params,pageHeaderContent,pageHeaderH,pageFooterH){
  	var support = this.isSupport();
  	if(!support){
	    alert("此部件不支持动态打印!请选择非动态打印方式");
	  	return;
  	}
  	var voReportGrid = this.getReportTableObj();
  	if(!voReportGrid){
	    alert("没有查询结果，不能进行无模板打印！");
	  	return;
  	}
  	var names = new Array();
  	var values = new Array();
  	names[0] = "compoName";
  	values[0]= this.getCompoName();
  	names[1] = "pageWidth";
  	values[1] = this.getPageWidth(voReportGrid);
  	names[2] = "pageHeight";
  	values[2] = "";
  	names[3] = "rowHeaderHeight";
  	values[3] = this.getRowHeaderHeight(voReportGrid);
  	names[4] = "rowDetailHeight";
  	values[4] = this.getRowDetailHeight();
  	names[5] = "params";
  	values[5] = this.getPagePrams(params);
  	//alert("params==="+values[5]);
  	names[6] = "labels";
  	values[6] = this.getPageLabels_E(voReportGrid);
  	names[7] = "fields";
  	values[7] = this.getPageFields_E(voReportGrid);
	names[8] = "cnName";
  	values[8] = pageHeaderContent;
  	//alert("labels==="+values[7]);

  	names[9] = "printEmpty";
  	values[9] = "";
  	names[10] = "printZero";
  	values[10] = "";
  	names[11] = "exportType";
  	values[11] = vasInfo["ExportType"];
  	names[12] = "mainTableData";
  	values[12] = this.getMainTableData(voReportGrid);
  	//alert("mainTableData=="+values[12]);
  	names[13] = "pageHeaderH";
  	values[13] = this.getPageHeaderH(voReportGrid);
  	if(values[13] == 0)
  		values[13] = pageHeaderH;
  	names[14] = "pageFooterH";
  	values[14] = this.getPageFooterH();
  	if(values[14] == 0)
  		values[14] = pageFooterH;
  	var voParams = PageX.oDBDataRules.get(this.getRealPageName());
	if(!voParams){
		//alert("请先进行查看！");
		return;
	}
	//alert("voParams=="+voParams);
  	names[15] = "pageName";
  	values[15] = voParams.item(0);
  	names[16] = "gridID";
  	values[16] = voParams.item(1);
  	names[17] = "areaName";
  	values[17] = "";
	names[18]= "printType";
  	values[18] = "REPORT_NOTPL";
  	if(this.getParameter("sqlid")){
  		names[names.length] = "ruleID";
  		values[values.length] = this.getParameter("sqlid");
  	}
  	if(this.getParameter("condition")){
  		names[names.length] = "condition";
  		values[values.length] = this.getParameter("condition");
  	}
  	if(this.getParameter("PrintData")){
  		names[names.length] = "PRINT_DATA";
  		values[values.length] = this.getParameter("PrintData");
  	}
	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;fop打印
//返回值: void;
function PrintX_fopPrintWithTemplate(param,names,values){
	var com = getPageCommunity();
	if (com != null)
		com.doRequestPage("fprint",this.getCompoName(),names,values,"");
}
//----------------------------------------------------------------------
//public;参数解析
//返回值: 成功：xml格式的字符串；失败：空串；
/**
 * 参数解析，根据传来的参数字段数组及参数值数组生成xml格式的参数信息
 * @param paramName 模板中定义的参数字段数据
 * @param paramValue 与参数字段对应的参数值
 * @return xml格式的字符串
 */
function PrintX_extractParams(paramName,paramValue){
  paramStr = "";
  paramStr +="<parameters>";
  for(var i=0,j=paramName.length; i<j; i++){
  	if(paramName[i]){
			paramStr += "<param>";
	    paramStr += "<name>";
	    paramStr += paramName[i];
	    paramStr += "</name>";
	    paramStr += "<value>";
	    paramStr += paramValue[i];
	    paramStr += "</value>";
	    paramStr += "</param>";
    }
  }
  paramStr += "</parameters>";
  return paramStr;
}
//----------------------------------------------------------------------
//public;打印文件是否存在
//返回值: 成功：true; 失败：false;
function PrintX_isExistHtmlFile(tplCode){
  	if(!tplCode)
    	return false;
  	if(tplCode == "notemplate")
  		return true;
  	
  	var flag = true;
	var tplCodeArray = tplCode.split(",");
	for(var i = 0; i < tplCodeArray.length; i++){
		//读取模板HTML文件
		var result = this.getTplFile(tplCodeArray[i]);
		if(!result){
			alert(result);
			flag = false;
			break;
		}
		else if(result.childNodes[0].nodeValue.indexOf("false:") == 0){
			alert("请先确认打印模板 [ " + tplCodeArray[i] + " ] 存放在路径下：" + result.childNodes[0].nodeValue.substring(6));
			flag = false;
			break;
		}
	}
  return flag;
}
//----------------------------------------------------------------------
//public;取得打印模板HTML文件内容
//返回值: 成功：result对象; 失败："";
function PrintX_getTplFile(prn_tpl_code){
	var result = "";
	var names = new Array();
	var values = new Array();
	names[0]  = "prn_tpl_code";
	values[0] = prn_tpl_code;
	var com = getCommunity();
	if(com != null){
		var result = com.doRequest("getTextDataFromFile","all",names,values);
	}
	return result;
}
//----------------------------------------------------------------------
//public;取得新编辑页面数据
//返回值: 成功：XML格式数据; 失败："";
/**
 * 取得新编辑页面数据，数据格式：
 * <XMLDATA>
 *   <compometa>……</ compometa>//确定主、子表关系
 *   <session>……</session>     //session数据
 *   <pagedata>……</pagedata>   //页面数据，包括主表和子表
 * </XMLDATA>
 */
function PrintX_getPrintDataXML(){//TODO:去掉前台拼接printdata
	var result = "";
	result += "<XMLDATA>\n";
	var vsCompoMetaXML = this.getParameter("CompoMetaXML");
	if(!vsCompoMetaXML){
		vsCompoMetaXML = DataTools.getCompoMetaXML().xml;
		vsCompoMetaXML = this.addChildTableForCompoMeta(vsCompoMetaXML);
	}
	result += vsCompoMetaXML;
	result += this.getPageDataXML();
	var Parameter = this.getParameter("Parameter");
	if(Parameter){
		var sessionData = DataTools.getSessionXML().xml;
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		xmldom.loadXML(sessionData);
		var voDoc= xmldom.documentElement;
		var node=xmldom.createNode(1, Parameter[0], "");
		node.text = Parameter[1];
		voDoc.appendChild(node);
		result += voDoc.xml;
	}else{
		result += DataTools.getSessionXML().xml;
	}
	result += "</XMLDATA>";
	
	return result;
}
//----------------------------------------------------------------------
//public;对单表处理，增加子表信息
//返回值: 成功：XML格式数据; 失败：XML格式数据;
function PrintX_addChildTableForCompoMeta(vsCompoMetaXML){
	try{
		var mainTableName = DataTools.getMainTableName();
		var visualChildTableName = this.getVisualChildTableName();
		//chupp; 20070808
		if (mainTableName== visualChildTableName){
			return vsCompoMetaXML;
		}
		
		if(visualChildTableName != "" && visualChildTableName != null){
			var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
			xmlDom.loadXML(vsCompoMetaXML);
			var compoMetaDom = xmlDom.documentElement;
			var tables = compoMetaDom.getElementsByTagName("tables").item(0).firstChild;
			if(tables.getAttribute("name") == mainTableName){
				if(tables.childNodes.length == 0){
					var xmldom2 = new ActiveXObject("Microsoft.XMLDOM");
					var newTable = xmldom2.createNode(1, "table", "");
					newTable.setAttribute("name", visualChildTableName);
					tables.appendChild(newTable);	
					return compoMetaDom.xml;
				}
			}
		}
	}catch(e){
		//	
	}
	return vsCompoMetaXML;
}

//----------------------------------------------------------------------
//public;取得主表、子表数据
//返回值: 成功：XML格式数据; 失败："";
function PrintX_getPageDataXML(){//TODO:去掉前台拼接printdata
	var pageData = "";
	pageData += "<pagedata>";
	pageData += "<data>";
	var mainTableName = DataTools.getMainTableName();
	pageData += DataTools.getTableData(mainTableName).xml;
	var visualChildTableName = this.getVisualChildTableName();
	if(visualChildTableName != "" && visualChildTableName != null
		&& visualChildTableName != mainTableName){
		pageData += DataTools.getTableData(visualChildTableName).xml;
	}
	pageData += "</data>";
	pageData += "</pagedata>";
	return pageData;
}

//----------------------------------------------------------------------
//public;取得多页签情况可见页签的子表名称
//返回值: 成功：子表名称; 失败："";
function PrintX_getVisualChildTableName(){
	var tableName = "";
	var oHeadPanels = document.all("HeadDiv");
  if(oHeadPanels == null)
  	return tableName;
  for( var i = 0; i < oHeadPanels.length; i++){
  	var tabscripObj = oHeadPanels.item(i);
  	var oTabBody = tabscripObj.parentElement.parentElement.parentElement;
  	if( oTabBody != null){
  		if(oTabBody.style.display != "none"){
  			tableName = tabscripObj.parentElement.parentElement.getAttribute("tablename");
  			break;
  		}else{
  			continue;
  		}
  	}	
  }
  return tableName;
}
//----------------------------------------------------------------------
//public;判断是否直接输出到打印机
//返回值: 成功：返回true; 失败：返回false;
function PrintX_isPrintDirect(tplCode){
	if(tplCode == null || tplCode =="")
		return false;
	if(tplCode.indexOf(",") != -1)
		tplCode = tplCode.substring(0,tplCode.indexOf(","));
	var result = this.getPSOptionsFromFile(this.getPageName(),tplCode);
	if(result){
		if(result[9] == "y"){
			return true;
		}
	}
	return false;
}
//----------------------------------------------------------------------
//public;取得页面名称
//返回值: 成功：返回pageName; 失败：返回"";
function PrintX_getPageName(){
  /*
  return PageX.sName;
  */
	var pageName = "";
	var compoName = this.getCompoName();
	var pageType = PageX.sPageType;
	if(pageType == "list"){
		pageName = compoName + "_L";	
	}else{
		pageName = compoName + "_E";
	}
	return pageName;
}
//----------------------------------------------------------------------
//public;取得页面名称
//返回值: 成功：返回pageName; 失败：返回"";
function PrintX_getRealPageName(){
  return PageX.sName;
  /*
	var pageName = "";
	var compoName = this.getCompoName();
	var pageType = PageX.sPageType;
	if(pageType == "list"){
		pageName = compoName + "_L";	
	}else{
		pageName = compoName + "_E";
	}
	return pageName;
	*/
}
//----------------------------------------------------------------------
//public;取得页面宽度
//返回值: 成功：iPageWidth; 失败：返回576;
function PrintX_getPageWidth(voGrid){
	var iPageWidth = 576;
	if(voGrid != null){
		var voRect= PF.getAbsRect(voGrid.getOuterPanel());
		if(voRect != null){
			iPageWidth = voRect.iWidth;
		}
	}
  return iPageWidth;	
}
//----------------------------------------------------------------------
//public;解析动态打印时传递的参数
//返回值: 成功：返回XML数据; 失败：XML数据;
function PrintX_getPagePrams(params){
  result = "<elements>";
  for(var i=0,j=params.length; i<j; i++){
    var tempStr = params[i];
    var paramDetail = tempStr.split(",");
    result += "<element>"
    result += "<x>";
    result += paramDetail[0];
    result += "</x>";
    result += "<y>";
    result += paramDetail[1];
    result += "</y>";
    result += "<width>";
    result += paramDetail[2];
    result += "</width>";
    result += "<height>";
    result += paramDetail[3];
    result += "</height>";
    result += "<name>";
    result += paramDetail[4]
    result += "</name>";
    result += "<classType>";
    result += "java.lang.String";
    result += "</classType>";
    result += "<isPrint>"
    result += "Y";
    result += "</isPrint>";
    result += "<isHeader>"
    result += paramDetail[5];
    result += "</isHeader>";
    result += "</element>";
    result += "<content name=\"";
    result += paramDetail[4];
    result += "\">";
    result += paramDetail[6]
    result += "</content>";
  }
  result += "</elements>";
  return result;
}
//----------------------------------------------------------------------
//public;取得可见的子表对象
//返回值: 成功：返回子表对象; 失败：null;
function PrintX_getTabstripObjHTML(){
	var tabscripObj = null;
	var oHeadPanels = document.all("HeadDiv");
  if(oHeadPanels == null)
  	return null;
  if(!oHeadPanels.length){
  	tabscripObj = document.getElementById("HeadDiv");
  }else{
  	for( var i = 0; i < oHeadPanels.length; i++){
  		tabscripObj = oHeadPanels.item(i);
  		var oTabBody = tabscripObj.parentElement.parentElement.parentElement;
  		if( oTabBody != null){
  			if(oTabBody.style.display == "none"){
  				continue;	
  			}else{
  				break;
  			}
  		}	
  	}
  }
  if(tabscripObj != null){
  	return 	tabscripObj.firstChild.firstChild;
  }else{
  	return null;
  }	
}
//----------------------------------------------------------------------
//public;获得列表页面的标签字段信息
//返回值: 成功：返回XML数据; 失败：XML空数据;
function PrintX_getTableLabels_L(voListGrid){
	result = "";
  result += "<elements>";
  if(voListGrid == null){
  	result += "</elements>";
  	return result;
  }
  var vsFieldNames= voListGrid.getFieldNames();
  for(var i = 0; i < vsFieldNames.length; i++){
  	var voField = voListGrid.getHeadCell(vsFieldNames[i]);
  	if(voField.style.display == "none"){
  		continue;	
  	}
  	var voRect= PF.getAbsRect(voField);
    result += "<element>"
    result += "<x>";
    result += voRect.iLeft;
    result += "</x>";
    result += "<y>";
    result += 0;
    result += "</y>";
    result += "<width>";
    result += voRect.iWidth;
    result += "</width>";
    result += "<height>";
    result += voRect.iHeight;
    result += "</height>";
    result += "<content>";
    result += voListGrid.getFieldCaption(vsFieldNames[i]);
    result += "</content>";
    result += "<name>";
    result += vsFieldNames[i];
    result += "</name>";
    result += "<classType>";
    result += "java.lang.String";
    result += "</classType>";
    result += "<isPrint>"
    result += "Y";
    result += "</isPrint>";
    result += "<position>"
    result += "tableHeader";
    result += "</position>";
    result += "</element>";
  }
  result += "</elements>";
  return result;
}
//----------------------------------------------------------------------
//public;获得列表页面的字段信息
//返回值: 成功：返回XML数据; 失败：XML数据;
function PrintX_getTableFields_L(voListGrid){
	result = "";
  result += "<elements>";
  if(voListGrid == null){
  	result += "</elements>";
  	return result;
  }
  var vsFieldNames= voListGrid.getFieldNames();
  for(var i = 0; i < vsFieldNames.length; i++){
  	var voField = voListGrid.getHeadCell(vsFieldNames[i]);
  	var voRect= PF.getAbsRect(voField);
    result += "<element>"
    result += "<x>";
    result += voRect.iLeft;
    result += "</x>";
    result += "<y>";
    result += voRect.iTop;
    result += "</y>";
    result += "<width>";
    result += voRect.iWidth;
    result += "</width>";
    result += "<height>";
    result += voRect.iHeight;
    result += "</height>";
    result += "<content>";
    result += vsFieldNames[i];
    result += "</content>";
    result += "<name>";
    result += vsFieldNames[i];
    result += "</name>";
    result += "<classType>";
    result += "java.lang.String";
    result += "</classType>";
    result += "<isPrint>"
    result += "Y";
    result += "</isPrint>";
    result += "</element>";
  }
  result += "</elements>";
  return result;
}
//----------------------------------------------------------------------
//public;报表页面取得主表信息
//返回值: 成功：XML数据; 失败：返回"";	
function PrintX_getMainTableData(voGrid){
	var mainTableName = DataTools.getMainTableName();
	var delta = "<entity name=\"" + mainTableName + "\">";
	var vofields = new Array();
	//var mainTableData = DataTools.getTableData(mainTableName);
	var voFree = PageX.getFree(mainTableName);
  if(voFree){
	  var vaNV = voFree.getNamesValues();
	  for(var i = 0; i < vaNV[0].length; i++){
	    var name = vaNV[0][i];
	    var value = vaNV[1][i];
	    delta += "<field name=\"" + name + "\" value=\"";
	    delta += value + "\"/>"; 
	    vofields[name] = value;  
	  }
  }
  var vaoCtrlObj = PageX.getAllCtrlObj();
  if(vaoCtrlObj){
    for(var i = 0, j = vaoCtrlObj.length; i < j; i++){
      var voCtrlObj = vaoCtrlObj[i];
      if(PageX.isEditBox(voCtrlObj)){
        var name = voCtrlObj.getFieldName();
        var value = "";
        if(voCtrlObj.CLASSNAME == "gp.page.ComboBox"){
          value = voCtrlObj.getText();
        }else{
          value = voCtrlObj.getValue();
        }
        delta += "<field name=\"" + name + "\" value=\"";
        delta += value + "\"/>";
        vofields[name] = value;
      }
    }
  }
	//var rows = mainTableData.selectSingleNode("//row");
	/*
	for(var i = 0; i < rows.childNodes.length; i++){
		var row = rows.childNodes[i];
		var name = row.nodeName;
		var value = "";
		if(row.firstChild != null){
			value = row.firstChild.nodeValue;
		}
		delta += "<field name=\"" + name + "\" value=\"";
    delta += value + "\"/>";	
    vofields[name] = value;
	}
	*/
	var sessionData = DataTools.getSessionXML().firstChild;
	for(var i = 0; i < sessionData.childNodes.length; i++){
		var row = sessionData.childNodes[i];
		var name = row.nodeName;
		var value = "";
		if(row.firstChild != null){
			value = row.firstChild.nodeValue;
		}
		delta += "<field name=\"" + name + "\" value=\"";
    delta += value + "\"/>";
	}
	//var tableHeaderDiv = document.getElementById("HeadDiv");
	//var table = tableHeaderDiv.firstChild.firstChild;
	var table = null;
	if(voGrid != null){
		table = voGrid.getOuterPanel().firstChild.firstChild.firstChild.firstChild;
	}
	if(table != null){
		for(var i = 0; i < table.rows.length; i++){
			var tr = table.rows[i];
			for(var j = 0; j < tr.cells.length; j++){
				var td = tr.cells[j];
				var name = td.getAttribute("fieldname");
				var value = td.innerText;
				if(value == null){
					value = "";
				}
				if( null != vofields[name])
          continue;	
				delta += "<field name=\"" + name + "\" value=\"";
	    	delta += value + "\"/>";		
			}	
		}
	}
	delta += "</entity>";
  return delta;
}
//----------------------------------------------------------------------
//public;判断某部件编辑页面是否支持动态打印
//返回值: 成功：true; 失败：false;	
function PrintX_isSupport(){
	var compoMetaXML = DataTools.getCompoMetaXML().xml;
	var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
	xmlDom.loadXML(compoMetaXML);
	var compoMetaDom = xmlDom.documentElement;
	var tables = compoMetaDom.getElementsByTagName("tables").item(0);
	var depth = this.getDomTreeDepth(tables,0,0);
	if(depth > 1){
		return false;
	}else{
		return true;
	}
}
//----------------------------------------------------------------------
//public;获得树的最大深度
//返回值: 成功：最大深度; 失败：0;	
function PrintX_getDomTreeDepth(root, depth, nodeDepth){
	if(root == null){
		return depth;	
	}
	if(root.hasChildNodes()){
		if(nodeDepth > depth){
			depth = nodeDepth;	
		}
		root = root.firstChild;
		var tableName = root.getAttribute("name");
		var tableData = DataTools.getTableData(tableName);
		if(tableData == null){
			return depth - 1;
		}else{
			return this.getDomTreeDepth(root,depth,nodeDepth + 1);
		}	
	}else{
		pNode = root.parentNode;
		nNode = root.nextSibling;
		if(pNode != null){
			pNode.removeChild(root);
		}
	 	if(nNode != null){
			root = nNode;
			return this.getDomTreeDepth(root,depth,nodeDepth);
		}else{
			root = pNode;
			return this.getDomTreeDepth(root,depth,nodeDepth - 1);
		}
	}
}
//----------------------------------------------------------------------
//public;获得动态打印页面的标签元素
//返回值: 成功：xml数据; 失败：xml空数据;	
function PrintX_getPageLabels_E(voGrid){
  	result = "";
  	result += "<elements>";
  	if(voGrid != null)
	  	result += this.getTableLabels_E(voGrid);
  	result += this.getTitleLabel_E();
  	result += this.getMainDataLabels_E();
  	result += "</elements>";
  	return result;
}
//----------------------------------------------------------------------
//public;获得编辑页面的标签信息
//返回值: 成功：xml数据; 失败：xml空数据;	
function PrintX_getTableLabels_E(voGrid){
	var result = "";
	if(voGrid == null)
		return result;
	var table = voGrid.getOuterPanel().firstChild.firstChild.firstChild.firstChild;
  	var fieldNames = new Array();
  	var groupCol = table.firstChild;
  	if(groupCol){
		var cols;
		for(var i = 1; i < groupCol.childNodes.length; i++){
			col = groupCol.childNodes[i];
			if(col.style.display == "none"){
				continue;
			}else{
				var fieldName = col.getAttribute("fieldname");
				fieldNames[fieldNames.length] = fieldName;
			}
		}
	}
	for(var i = 0; i < table.rows.length; i++){
		var row = table.rows[i];
		for(var j = 0; j < row.cells.length; j++){
			var td = row.cells[j];
			if(td.style.display == "none"){
    		continue;
    	}
    	var fieldName = td.getAttribute("fieldname");
    	var isLeaf = td.getAttribute("isleaf");
    	if(isLeaf == null){
    		continue;	
    	}
    	if(isLeaf == "true"){
    		var k = 0;
    		for(; k < fieldNames.length; k++){
    			if(fieldName == fieldNames[k]){
    				break;	
    			}	
    		}
    		if(k >= fieldNames.length){
    			continue;	
    		}	
    	}
    	result += "<element>"
	    result += "<x>";
  	  	result += td.offsetLeft;
    	result += "</x>";
	    result += "<y>";
  	  	result += td.offsetTop;
	   	result += "</y>";
  	  	result += "<width>";
    	result += td.offsetWidth;
	    result += "</width>";
  	  	result += "<height>";
    	result += td.offsetHeight;
	    result += "</height>";
  	  	result += "<content>";
    	result += td.innerText;
	    result += "</content>";
  	  	result += "<name>";
    	result += fieldName;
	    result += "</name>";
  	  	result += "<classType>";
    	result += "java.lang.String";
	    result += "</classType>";
  	  	result += "<isPrint>"
    	result += "Y";
	    result += "</isPrint>";
  	  	result += "<position>"
    	result += "tableHeader";
	    result += "</position>";
  	  	result += "</element>";
		}	
	}
  	return result;
}
//----------------------------------------------------------------------
//public;获得编辑页面的标题字段信息
//返回值: 成功：xml数据; 失败：xml空数据;	
function PrintX_getTitleLabel_E(){
  	var result = "";
  	var td = document.getElementById("HeadTitleID");
  	if(td == null){
  		return result;	
  	}
	result += "<element>"
	result += "<x>";
  	result += td.offsetLeft;
  	result += "</x>";
	result += "<y>";
  	result += td.offsetTop;
  	result += "</y>";
  	result += "<width>";
  	result += td.offsetWidth;
  	result += "</width>";
  	result += "<height>";
  	result += td.offsetHeight;
  	result += "</height>";
  	result += "<content>";
  	result += td.innerText;
  	result += "</content>";
  	result += "<name>";
  	result += "HeadTitle";
  	result += "</name>";
  	result += "<classType>";
  	result += "java.lang.String";
  	result += "</classType>";
  	result += "<isPrint>"
  	result += "Y";
  	result += "</isPrint>";
  	result += "<position>";
  	result += "pageHeader";
  	result += "</position>";
  	result += "</element>";
  	return result;
}
//----------------------------------------------------------------------
//public;获得编辑页面主表字段标签信息，（编辑页面动态打印时，主表字段作为标签处理）
//返回值: 成功：xml数据; 失败：xml空数据;	
function PrintX_getMainDataLabels_E(){
  	var result = "";
  	var sMainTableName = DataTools.getMainTableName();
  	var voChildTableNames = DataTools.getChildTableName(sMainTableName);
  	var voDataPartObj = null;
  	if(voChildTableNames)
  		if(voChildTableNames[0])
    		voDataPartObj = PageX.getDataPartObj(voChildTableNames[0]);
  	var voRect = null;
  	if(voDataPartObj){
  		if(voDataPartObj[0])
  			voRect = PF.getAbsRect(voDataPartObj[0].getOuterPanel());
  	}
  	var iTopX = 0;
  	if(voRect){
  		iTopX = voRect.iTop;	
  	}
  	var oFree = PageX.getFree(sMainTableName);
  	if(!oFree){
  		oFree = PageX.getBoxSet(sMainTableName, "none");
  		if(!oFree){
  			oFree = PageX.getBoxSet(sMainTableName, "grid");
  		}
  		if(!oFree){
  			return "";
  		}
  	}
  	var voAllEditBox = oFree.getAllEditBox();
  	for(var i = 0; i < voAllEditBox.length; i++){
	  	var voEditBox = voAllEditBox[i];
	  	if(!voEditBox || !voEditBox.isVisible()){
	  		continue;	
	  	}
	  	var voFieldPos = PF.getAbsRect(voEditBox.getOuterPanel().parentElement);
	    result += "<element>";
	    result += "<x>";
			result += voFieldPos.iLeft;
	    result += "</x>";
	    result += "<y>";
			result += voFieldPos.iTop;
	    result += "</y>";
	    result += "<width>";
	    result += voFieldPos.iWidth;
	    result += "</width>";
	    result += "<height>";
	    result += voFieldPos.iHeight;
	    result += "</height>";
	    result += "<content>";
	    result += voEditBox.getValue();
	    result += "</content>";
	    result += "<name>";
	    result += voEditBox.getFieldName();
	    result += "</name>";
	    result += "<classType>";
	    result += "java.lang.String";
	    result += "</classType>";
	    if(iTopX != 0 && voFieldPos.iTop >= iTopX){
	    	result += "<isPrint>"
	    	result += "N";
	    	result += "</isPrint>";
	    	result += "<position>"
	    	result += "pageFooter";
	    	result += "</position>";
    	}else{
			result += "<isPrint>";
	    	result += "Y";
	    	result += "</isPrint>";
	    	result += "<position>"
	    	result += "pageHeader";
	    	result += "</position>";
    	}
    	result += "</element>\n";
		
		var voCaption = this.getFFCaption(voEditBox);
		var voCaptionPos = PF.getAbsRect(voCaption);    
	    result += "<element>"
	    result += "<x>";
			result += voCaptionPos.iLeft;
	    result += "</x>";
	    result += "<y>";
			result += voCaptionPos.iTop;
	    result += "</y>";
	    result += "<width>";
	    result += voCaptionPos.iWidth;
	    result += "</width>";
	    result += "<height>";
	    result += voCaptionPos.iHeight;
	    result += "</height>";
	    result += "<content>";
	    result += this.getFFCaptionValue(voCaption);
	    result += "</content>";
	    result += "<name>";
	    result += voEditBox.getFieldName();
	    result += "</name>";
	    result += "<classType>";
	    result += "java.lang.String";
	    result += "</classType>";
	    if(iTopX != 0 && voCaptionPos.iTop >= iTopX){
	     	result += "<isPrint>"
	    	result += "N";
	    	result += "</isPrint>";
	    	result += "<position>"
	    	result += "pageFooter";
	    	result += "</position>";
	    }else{
			result += "<isPrint>"
	    	result += "Y";
	    	result += "</isPrint>";
	    	result += "<position>"
	    	result += "pageHeader";
	    	result += "</position>";
	    }
    	result += "</element>\n";
  	}
  	return result;
}
//----------------------------------------------------------------------
//public;获得页面的字段信息
//返回值: 成功：xml数据; 失败：xml空数据;	
function PrintX_getPageFields_E(voGrid){
	if(voGrid == null)
		return "<elements></elements>";
  	result = "";
  	var fieldNames = new Array();
  	var table = voGrid.getOuterPanel().firstChild.firstChild.firstChild.firstChild;
	var groupCol = table.firstChild;
	if(groupCol){
		var cols;
		for(var i = 1; i < groupCol.childNodes.length; i++){
			col = groupCol.childNodes[i];
			if(col.style.display == "none"){
				continue;
			}else{
				var fieldName = col.getAttribute("fieldname");
				fieldNames[fieldNames.length] = fieldName;
			}
		}
	}
  	result += "<elements>";
  	for(var i = 0; i < table.rows.length; i++){
		var row = table.rows[i];
		for(var j = 0; j < row.cells.length; j++){
			var td = row.cells[j];
			if(td.style.display == "none"){
    			continue;
    		}
	    	var fieldName = td.getAttribute("fieldname");
	    	var isLeaf = td.getAttribute("isleaf");
	    	if(!isLeaf || isLeaf == "false"){
	    		continue;
	    	}else{
	    		var k = 0;
	    		for(; k < fieldNames.length; k++){
	    			if(fieldName == fieldNames[k]){
	    				break;	
	    			}	
	    		}
	    		if(k >= fieldNames.length){
	    			continue;	
	    		}	
	    	}
	    	result += "<element>"
	    	result += "<x>";
	    	result += td.offsetLeft;
	    	result += "</x>";
	    	result += "<y>";
	    	result += td.offsetTop + td.offsetHeight;
	    	result += "</y>";
	    	result += "<width>";
	    	result += td.offsetWidth;
	    	result += "</width>";
	    	result += "<height>";
	    	result += 20;
	    	result += "</height>";
	    	result += "<content>";
	    	result += fieldName;
	    	result += "</content>";
	    	result += "<name>";
	    	result += fieldName;
	    	result += "</name>";
	    	result += "<classType>";
	    	result += "java.lang.String";
	    	result += "</classType>";
	    	result += "<isPrint>"
	    	result += "Y";
	    	result += "</isPrint>";
	    	result += "</element>";
  		}
  	}
  	result += "</elements>";
  	return result;
}
//----------------------------------------------------------------------
//public;获得编辑页面的可见子表名称
//返回值: 成功：子表名称; 失败："";	
function PrintX_getVisualChildTableName(){
	var tableName = "";
	var childName = this.getParameter("ChildTableName");
	if(childName)return childName;
	var oHeadPanels = document.all("HeadDiv");
  if(oHeadPanels == null)
  	return tableName;
  if(!oHeadPanels.length){
  	oHeadPanels = document.getElementById("HeadDiv");
  	if(oHeadPanels != null){
  		tableName =	oHeadPanels.parentElement.parentElement.getAttribute("tablename");
  	}
  	return tableName;
  }
  for( var i = 0; i < oHeadPanels.length; i++){
  	var tabscripObj = oHeadPanels.item(i);
  	var oTabBody = tabscripObj.parentElement.parentElement.parentElement;
  	if( oTabBody != null){
  		if(oTabBody.style.display != "none"){
  			tableName = tabscripObj.parentElement.parentElement.getAttribute("tablename");
  			break;
  		}else{
  			continue;
  		}
  	}	
  }
  return tableName;
}
//----------------------------------------------------------------------
//public;获取表格固定行数
//返回值: 成功：表格数据行数; 失败：返回0;	
function PrintX_getFixRowCount(tpl_code){
	var prn_tpl_fixrowcount = 0;
  	var names = new Array();
  	var values = new Array();
  	names[0] = "componame";
  	values[0] = this.getCompoName();
  	names[1] = "tplCode";
  	if(trim(tpl_code)!=""){
  		values[1] = tpl_code;
  	}
	var result=qryData("print-ruleData.AS_GET_PRINT_JASPERTEMP",names,values);
	if(result){
		if(result.childNodes.length != 0) {
		    prn_tpl_fixrowcount = result.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("value");
	    }
  	}
  	return prn_tpl_fixrowcount ;
}
//----------------------------------------------------------------------
//public;获取最大数据行数
//返回值: 成功：返回最大数据行数; 失败：返回0;	
/**
 *计算在一页中最多能够打印多少行数据，当打印高级选项中纸张大小
 *大于模板纸张大小时，重新计算。
 *如果模板中没有表格或者表格中没有数据行，返回0；否则，返回最大数据行数。
 */
function PrintX_getMaxRowCount(prn_tpl_code){
	var result = this.getTplFile(prn_tpl_code);
	if(!result){
		alert(result);
		return;
	}
	else {
		if(result.childNodes[0].nodeValue.indexOf("false:") == 0){
			alert("请先确认打印模板 [ " + prn_tpl_code + " ] 存放在路径下：" + result.childNodes[0].nodeValue.substring(6));
			return;
		}
	}

	var pageName = this.getPageName();
	var maxRowCount =  this.calMaxRowCount(result, pageName, prn_tpl_code);
	return maxRowCount;
}
//----------------------------------------------------------------------
//public;计算表格固定行数
//返回值: 成功：返回最大数据行数; 失败：返回0;	
function PrintX_calMaxRowCount(result, pageName, tplCode){
	var maxRowCount = 0;
	var span=document.all("SPANPRINTSET");
	if (!span){
		document.body.insertAdjacentHTML("afterBegin","<span id=\"SPANPRINTSET\"></span>");
		span=document.all("SPANPRINTSET");
		span.style.display = "none";
	}
	span.innerHTML = result;
	var templateBodyObj = span.firstChild;
	var pageHeight = 0;
	var pageTopMargin = 0;
	var pageBottomMargin = 0;
	var pageHeaderHeight = 0;
	var rpHeaderHeight = 0;
	var rpFooterHeight = 0;
	var pageFooterHeight = 0;
	var groupHeaderHeight = 0;
	var groupFooterHeight = 0;
	var detailHeight = 0;
	//var params = this.getPSOptionsFromFile(pageName,tplCode);
	//if(params != 0){
		//pageHeight = this.unitConvert(params[3]);
		//pageTopMargin = this.unitConvert(params[6]);
		//pageBottomMargin = this.unitConvert(params[7]);
	//}
	//else{
		pageHeight = this.unitConvert(templateBodyObj.style.height);
		pageTopMargin = this.unitConvert(templateBodyObj.style.paddingTop);
		pageBottomMargin = this.unitConvert(templateBodyObj.style.paddingBottom);
	//}
	var pageHeaderObj = templateBodyObj.document.getElementById("pageheader");
	pageHeaderHeight = this.getObjHeight(pageHeaderObj);
	var rpHeaderObj = templateBodyObj.document.getElementById("rpheader");
	rpHeaderHeight = this.getObjHeight(rpHeaderObj);
	var rpFooterObj = templateBodyObj.document.getElementById("rpfooter");
	rpFooterHeight = this.getObjHeight(rpFooterObj);
	var pageFooterObj = templateBodyObj.document.getElementById("pagefooter");
	pageFooterHeight = this.getObjHeight(pageFooterObj);
	var rpBodyObj = templateBodyObj.document.getElementById("rpbody");
	var eles = rpBodyObj.childNodes;
	if(eles.length == 0||(eles.length == 1 && rpBodyObj.innerHTML == "<DIV></DIV>")){
		maxRowCount = 0;
	}
	else{
		var headerCount = 0;
		var footerCount = 0;
		var bodyCount = 0;
		var isHeader = true;
		for(var i=0,j=eles.length; i<j; i++){
			var ele = eles.item(i);
  		if(ele.tagName == "TABLE"){
  			for(var i=0,j=ele.rows.length; i<j; i++){
  				var rowObj = ele.rows[i];
  				var rowType = rowObj.getAttribute("repeat");
  				if(((rowType == "n")||(!rowType)) && (isHeader)){
  					headerCount++;
  				}
  				else if(((rowType == "n")||(!rowType)) && (!isHeader)){
  					footerCount++;
  				}
  				else if(rowType == "y"){
  					bodyCount++;
  					isHeader = false;
  				}
				}
				for(var m=0,n=headerCount; m<n; m++){
  				var row = ele.rows[m];
  				groupHeaderHeight += this.getObjHeight(row);
  			}
				for(var m=headerCount,n=headerCount+bodyCount; m<n; m++){
  				var row = ele.rows[m];
  				detailHeight += this.getObjHeight(row);
  			}
  			for(var m=headerCount+bodyCount,n=headerCount+bodyCount+footerCount; m<n; m++){
  				var row = ele.rows[m];
  				groupFooterHeight += this.getObjHeight(row);
  			}
  		}
  		else{
				continue;
  		}
		}
		maxRowCount = parseInt((pageHeight - pageTopMargin - pageBottomMargin - pageHeaderHeight -
										rpHeaderHeight -rpFooterHeight - pageFooterHeight - groupHeaderHeight
										 - groupFooterHeight)/detailHeight);
	}
	return maxRowCount;
}
//----------------------------------------------------------------------
//public;取得HTML对象的高度
//返回值: 成功：高度值; 失败：返回0;	
function PrintX_getObjHeight(obj){
	var height = obj.style.height;
  	if(height == "")
  		height = obj.height;
  	if(height == "")
  		height = obj.offsetHeight;
  	return parseInt(height);
}
//----------------------------------------------------------------------
//public;单位转换，像素转换为int型
//返回值: 成功：返回int型; 失败：返回0;	
function PrintX_unitConvert(pixel){
	return parseInt(pixel);
}
//----------------------------------------------------------------------
//public;取得标题行高度
//返回值: 成功：标题行宽度; 失败：返回20;	
function PrintX_getRowHeaderHeight(voGrid){
	var iRowHeaderHeight = 0;
	if(voGrid != null){
		var table = voGrid.getOuterPanel().firstChild.firstChild.firstChild.firstChild;
		for(var i = 0; i < table.rows.length; i++){
			var tr = table.rows[i];
			iRowHeaderHeight += this.getObjHeight(tr);	
		}	
	}
	if(iRowHeaderHeight == 0){
		iRowHeaderHeight = 20;	
	}
	return iRowHeaderHeight;
}
//----------------------------------------------------------------------
//public;取得数据行高度
//返回值: 成功：数据行宽度; 失败：返回20;
function PrintX_getRowDetailHeight(){
	var iRowDetailHeight = 20;
	return iRowDetailHeight;
}
//----------------------------------------------------------------------
//public;取得当前可见子表对象
//返回值: 成功：子表对象; 失败：null;
//modified by hmgkevin 08-03-25
//modified content: return value: from voGrid[0] to voGrid
function PrintX_getChildTableObj(){
	var vsMainTableName = DataTools.getMainTableName();
	var vsChildTableName = DataTools.getChildTableName(vsMainTableName);
	var voGrid= PageX.getDataPartObj(vsChildTableName);
	if(voGrid == null){
		voGrid = PageX.getAreaGrid(vsMainTableName);
	}
	return voGrid;	
}
//----------------------------------------------------------------------
//public;取得编辑页面页眉区域高度
//返回值: 成功：页眉高度; 失败：返回0;
function PrintX_getPageHeaderH(voGrid){
	var iPageHeaderH = 0;
	if(voGrid != null){
		var voRect= PF.getAbsRect(voGrid.getOuterPanel());
		if(voRect != null){
			iPageHeaderH = voRect.iTop;
		}
	}
	return iPageHeaderH;
}
//----------------------------------------------------------------------
//public;取得编辑页面页脚区域高度
//返回值: 成功：页脚高度; 失败：返回0;
function PrintX_getPageFooterH(){
	var iPageFooterH = 0;
	return iPageFooterH;
}
//----------------------------------------------------------------------
//public;取得free页面field的caption对象
//返回值: 成功：caption对象; 失败：返回null;
function PrintX_getFFCaption(voEditBox){
	var voCaption = null;
	if(voEditBox != null){
		voCaption = voEditBox.oOuterPanel.parentElement.previousSibling;
	}
	return voCaption;
}
//----------------------------------------------------------------------
//public;取得free页面field的caption值
//返回值: 成功：caption值; 失败：返回"";
function PrintX_getFFCaptionValue(voCaption){
	var sCaption = "";
	if(voCaption != null){
		sCaption = voCaption.innerText;
	}
	return sCaption;
}
//----------------------------------------------------------------------
//public;取得报表页面的子表对象
//返回值: 成功：voReportTable; 失败：null;
function PrintX_getReportTableObj(){
	var voReportTable = null;
	var vsChildTableName = this.getChildTableName();
	var voGrid= PageX.getDataPartObj(vsChildTableName);
	if(voGrid != null){
		voReportTable = voGrid;	
	}
	return voReportTable;	
}
//----------------------------------------------------------------------
//public;取得报表页面的子表名
//返回值: 成功：子表名; 失败：返回"";
function PrintX_getChildTableName(){
	var sChildTableName = "";
	var voParams = PageX.oDBDataRules.get(this.getRealPageName());//PageX.oDBDataRules.get(this.getCompoName()+ "_E");
	if(!voParams){
		alert("请先进行查看！");
		return;
	}
	sChildTableName = voParams.item(1);
	if(!sChildTableName)
	  sChildTableName = "rpjournal";
	return sChildTableName;
}
//----------------------------------------------------------------------
//public;设置打印参数，参数名称包括：
//	PageType   	页面类型
//  PrintType  	打印类型
//	TplCode    	模板代码
//  PrintData  	打印数据
//	ExportType 	输出类型
//	DynamicTpl 	动态缩列 
//返回值: 成功：; 失败：返回;
function PrintX_setParameter(pName,pValue){
	if(!pName){
		return;	
	}
	if(!this.vPrintParameters){
		this.vPrintParameters = new Map();	
	}
	this.vPrintParameters.put(pName,pValue);
	return true;
}
//----------------------------------------------------------------------
//public;获取打印参数，参数名称包括：
//	PageType   	页面类型
//  PrintType  	打印类型
//	TplCode    	模板代码
//  PrintData  	打印数据
//	ExportType 	输出类型
//	DynamicTpl 	动态缩列 
//返回值: 成功：pValue; 失败：返回"";
function PrintX_getParameter(pName){
	var pValue = null;
	if(!pName){
		return pValue;	
	}
	if(!this.vPrintParameters){
		return pValue;	
	}
	return this.vPrintParameters.get(pName);
}

//----------------------------------------------------------------------
//public;设置打印设置参数，参数名称包括：
//	InitPrintType  初始打印类型,只在没有设置打印类型时起作用
//  PrintType  	   打印类型  
//  InitTplCode    初始模板代码，只在没有设置模板代码时起作用
//	TplCode    	   模板代码
//  InitExportType 初始输出类型,只在没有设置输出类型时起作用
//	ExportType 	   输出类型 
//返回值: 成功：; 失败：返回;
//----------------------------------------------------------------------
function PrintX_setPrintSetParameter(pName,pValue){
	if(!pName){
		return;	
	}
	if(!this.vPrintSetParameters){
		this.vPrintParameters = new Map();	
	}
	this.vPrintSetParameters.put(pName,pValue);
	return true;
}

//----------------------------------------------------------------------
//public;获取打印设置参数，参数名称包括：
//	InitPrintType  初始打印类型,只在没有设置打印类型时起作用
//  PrintType  	   打印类型  
//  InitTplCode    初始模板代码，只在没有设置模板代码时起作用
//	TplCode    	   模板代码
//  InitExportType 初始输出类型,只在没有设置输出类型时起作用
//	ExportType 	   输出类型 
//返回值: 成功：; 失败：返回;
//----------------------------------------------------------------------
function PrintX_getPrintSetParameter(pName){
	var pValue = null;
	if(!pName){
		return pValue;	
	}
	if(!this.vPrintSetParameters){
		return pValue;	
	}
	return this.vPrintSetParameters.get(pName);
}

//----------------------------------------------------------------------
/**
 * 将打印设置信息发送到服务器
 *
 */
//----------------------------------------------------------------------
function PrintX_getPSFromDB(svUserID){
	var names = new Array();
	var values = new Array();
	names[0] = "userId";
	values[0] = svUserID;	
	var vsResponseText = requestDataK("getPSParameter", "all", names, values);
	if(!vsResponseText)
		return;
	var XML_BEGIN = "<PRINTSETCOOKIES>";
	var XML_END = "</PRINTSETCOOKIES>";
	if(vsResponseText.indexOf(XML_BEGIN) != -1)
		vsResponseText = vsResponseText.substring(vsResponseText.indexOf(XML_BEGIN));
	if(vsResponseText.indexOf(XML_END) != -1)
		vsResponseText = vsResponseText.substring(0, vsResponseText.indexOf(XML_END) + XML_END.length);
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(vsResponseText);
	return xmldom.documentElement;
}

//----------------------------------------------------------------------
/**
 * 从服务器请求打印设置信息
 *
 */
//----------------------------------------------------------------------
function PrintX_setPSToDB(svUserID, voPrintSet){
	var names = new Array();
	var values = new Array();
	names[0] = "userId";
	values[0] = svUserID;
	names[1] = "parameter";
	if(!voPrintSet || !voPrintSet.xml)	
		return;
	values[1] = voPrintSet.xml;
	requestDataK("setPSParameter", "all", names, values);
}
//----------------------------------------------------------------------
/**
 * 从服务器端取得打印设置
 *
 */
//----------------------------------------------------------------------
function PrintX_getPrintSetXML(){
	/*
	initPrintSetSpan();
	return	document.all("PRINTSET");
	*/
	var voPrintSetXML;
	var svUserID = this.getSvUserID();
	var voPrintSet = this.getPSFromDB(svUserID);//showMessage(voPrintSet);//showMessage(voPrintSet.xml)
	if(!voPrintSet || voPrintSet.childNodes.length == 0){
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		voPrintSetXML = xmldom.createNode(1, "PRINTSETCOOKIES", "");
	}
	else{
		voPrintSetXML = voPrintSet;
	}
	return voPrintSetXML;
}
//----------------------------------------------------------------------
/**
 * 保存打印设置到服务器
 *
 */
//----------------------------------------------------------------------
function PrintX_setPrintSetXML(voPrintSetXML){
	if(!voPrintSetXML)
		return;
	var svUserID = this.getSvUserID();
	this.setPSToDB(svUserID, voPrintSetXML);
}
//----------------------------------------------------------------------
/**
 * 从服务器端取得打印保存的Cookies信息
 *
 */
//----------------------------------------------------------------------
function PrintX_getPSCookiesFromServer(pageName){
	if(!pageName)
		return;
	var voPrintSetXML = this.getPrintSetXML();//showMessage(voPrintSet);showMessage(voPrintSet.xml)
	var pageNodes = voPrintSetXML.getElementsByTagName(pageName);
	if(!pageNodes || pageNodes.length == 0)
		return;
	var result = new Array();
	result[0] = pageName;
	var attributes = pageNodes[0].attributes;
	for(var i = 0; i < attributes.length; i++)
		result[i+1] = attributes[i].value;
		
	return result;
}




/*
function initPrintSetSpan(){
	var span=document.all("SPANPRINTSET");
	if (!span){
		document.body.insertAdjacentHTML("afterBegin","<span id=\"SPANPRINTSET\"></span>");
		span=document.all("SPANPRINTSET");
		span.style.display = "none";
		var vsPrintSetXml = "";
		var voPrintSet = getPSFromDB();
		if(voPrintSet)
			vsPrintSetXml = voPrintSet.xml;
		span.innerHTML = "<xml id=\"PRINTSET\" encoding=\"GBK\">\n" + vsPrintSetXml + "\n</xml>";
	}
}
*/
//----------------------------------------------------------------------
/**
 * 将打印设置Cookies信息保存到服务器端
 *
 */
//----------------------------------------------------------------------
function PrintX_setPSCookiesToServer(params){
	if(!params)
		return;
	var pageName = params[0];
	if(!pageName)
		return;
		
	var voPrintSetXML = this.getPrintSetXML();//showMessage(voPrintSet);//showMessage(voPrintSet.xml)
	var pageNodes = voPrintSetXML.getElementsByTagName(pageName);
	
	var pageNode;
	if(!pageNodes || pageNodes.length == 0)
	{
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		pageNode = xmldom.createNode(1, pageName, "");
	}
	else
	{
		pageNode = pageNodes[0];
	}
	
	pageNode.setAttribute("printType",params[1]);
	pageNode.setAttribute("isTemplate",params[2]);
	pageNode.setAttribute("tplCode",params[3]);
	pageNode.setAttribute("exportType",params[4]);
  if (!params[5])	params[5]=false;
	if (!params[6])	params[6]=false;
	pageNode.setAttribute("printNull",escape(params[5]));
	pageNode.setAttribute("printZero",escape(params[6]));
	
	voPrintSetXML.appendChild(pageNode);
	
	this.setPrintSetXML(voPrintSetXML)
}
//----------------------------------------------------------------------
/**
 * 从服务器端取得打印设置模板信息
 *
 */
//----------------------------------------------------------------------
function PrintX_getPSOptionsFromServer(pageName,tplName){
	if(!pageName || !tplName)
		return;
	var voPrintSetXML = this.getPrintSetXML();
	var pageNodes = voPrintSetXML.getElementsByTagName(pageName);
	if(!pageNodes || pageNodes.length == 0)
		return;
	var tplNodes = pageNodes[0].getElementsByTagName(tplName);
	if(!tplNodes || tplNodes.length == 0)
		return;
	
	var result = new Array();
	result[0] = tplName;
	var attributes = tplNodes[0].attributes;
	for(var i = 0; i < attributes.length; i++)
		result[i+1] = attributes[i].value;

	return result;
}
//----------------------------------------------------------------------
/**
 * 将打印设置模板信息保存到服务器端
 *
 */
//----------------------------------------------------------------------
function PrintX_setPSOptionsToServer(params){
	if(!params)
		return;		
	var pageName = params[0].substring(0,params[0].indexOf(","));
	var tplName = params[0].substring(params[0].indexOf(",") + 1);
	if(!pageName || !tplName)
	 return;

	var voPrintSetXML = this.getPrintSetXML();
	var pageNodes = voPrintSetXML.getElementsByTagName(pageName);
	if(!pageNodes || pageNodes.length == 0)
		return;
		
	var tplNodes = pageNodes[0].getElementsByTagName(tplName);
	var tplNode;
	if(!tplNodes || tplNodes.length == 0)
	{
		var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		tplNode = xmldom.createNode(1, tplName, "");
	}
	else
	{
		tplNode = tplNodes[0];
	}
	
	tplNode.setAttribute("pageSize",params[1]);
	tplNode.setAttribute("pageWidth",params[2]);
	tplNode.setAttribute("pageHeight",params[3]);
	tplNode.setAttribute("pageLeftMargin",params[4]);
	tplNode.setAttribute("pageRightMargin",params[5]);
	tplNode.setAttribute("pageTopMargin",params[6]);
	tplNode.setAttribute("pageBottomMargin",params[7]);
  	tplNode.setAttribute("printOrder",params[8]);
	tplNode.setAttribute("printDirect",params[9]);
	pageNodes[0].appendChild(tplNode);	
	
	this.setPrintSetXML(voPrintSetXML);
	
}
//----------------------------------------------------------------------
/**
 * 取得登录UserID，作为在服务器端保存打印设置信息的文件名
 *
 */
//----------------------------------------------------------------------
function PrintX_getSvUserID(){
	try{
		return DataTools.getSV("svUserID");
	}
	catch(e){
		if(typeof(svUserID) == "string")
			return svUserID;	
	}
}
//----------------------------------------------------------------------
//private;直接输出到打印机的回调函数
//返回值: 
function PrintX_printpg_printer(result){
	var fileName = "";
	if(result != null && result.getAttribute("success") == "true"){
		fileName = result.childNodes[0].nodeValue;	
	}
	if(fileName == ""){
		alert("生成打印文件出错");
		return;	
	}
	if(!this.isAcrobatPlugin()){
		alert("请先安装Acrobat Reader !");
		return;	
	}
	if(!window.frames["printframe"]){
		this.createPrintFrame();	
	}
	var loadAddr = "jsp/print/print.jsp?fileName="+fileName;
	this.createPrintFrame(loadAddr);
	//openWin = window.open(loadAddr,"","menubar=no,status=no,toolbar=no,resizable=yes,titlebar=yes,scrollbars=yes,height=30,width=300,top=50,left=50");
	//window.setTimeout("openWin.close()",60 * 1000);
}
function PrintX_createPrintFrame(src){
	var sIframe = "<iframe id=\"printframe\" src='" + src + "' width=\"1\" height=\"1\" style=\"display:none\">";
	var oIframe = document.createElement(sIframe);
	document.body.appendChild(oIframe);
}
//----------------------------------------------------------------------
//public;获得主机地址
//返回值: 成功：主机地址; 失败：返回"";
function PrintX_getHostAddr(){
	var names = new Array();
	var values = new Array();
	var result = doRequest("getHostAddr","all",names,values);
	return result;
}
//----------------------------------------------------------------------
//public;判断是否安装了Acrobat Reader
//返回值: 成功：true; 失败：返回false;
function PrintX_isAcrobatPlugin(){
	var pdfVersion = this.getPdfVersion();
	if(pdfVersion == "no"){
		return false;	
	}else{
		return true;
	}
}
//----------------------------------------------------------------------
//public;取得安装的Acrobat Reader的版本
//返回值: 成功：版本号; 失败：返回"no";
function PrintX_getPdfVersion(){
	return this.AcroPluginCheck();
}
function PrintX_AcroPluginCheck(){
	var agt=navigator.userAgent.toLowerCase();
	
	if(agt.indexOf("msie") != -1)
	{
		return this.IEShowVersionInfo();
	}
	else if(agt.indexOf("mozilla") != -1 && ((agt.indexOf("netscape") != -1) || (agt.indexOf("; nav") != -1)))
	{
		return this.NNShowVersionInfo();
	}

}
function PrintX_NNShowVersionInfo(){
	
	if (navigator.plugins && navigator.plugins["Adobe Acrobat"].description != "") 
	{
		var description = navigator.plugins["Adobe Acrobat"].description; 
		var regEx = /(\d+)/;
		var version = 0;
		if(regEx.test(description))
		{
			version = RegExp.$1;
		}
		
		return version;

	}
	else
	{
		return "no";
	}
	
}
function PrintX_IEShowVersionInfo(){
	var acrobatVersion;
	var ePdfObj = document.createElement("OBJECT");
	ePdfObj.classid = "clsid:CA8A9780-280D-11CF-A24D-444553540000";
	//ePdfObj.classid = "clsid:05BFD3F1-6319-4F30-B752-C7A22889BCC4";
	ePdfObj.id = "pdfObj";
	document.body.appendChild(ePdfObj);
	try{	
		// Call the ActiveX Object and get the Version Information
		var versionData = pdfObj.GetVersions();
		// Create an Array of all of the Plugin Names
		var versionDataArray = versionData.split(",");
		
		if(versionData.indexOf("6.0.0") != -1)
		{
			acrobatVersion = "6";
			if(versionData.indexOf("6.0.1") != -1)
			{
				acrobatVersion = "6.0.1";
			}
		}
		else if(versionData.indexOf("5.0") != -1)
		{
			acrobatVersion = "5";
			if(versionData.indexOf("5.0.5") != -1)
			{
				acrobatVersion = "5.0.5";
			}
		}
		else if(versionData.indexOf("7.0.0") != -1)
		{
			acrobatVersion = "7";
			if(versionData.indexOf("7.0.1") != -1)
			{
				acrobatVersion = "7.0.1";
			}
		}
	}catch(ex){
		acrobatVersion = "no";
	}
	document.body.removeChild(ePdfObj); 
	return acrobatVersion;	
}
//----------------------------------------------------------------------
//public;判断模板类型
//返回值: 列表页面模板：true; 其他：返回 false;
function PrintX_isListPageTemplate(tpl_code){
	var isListPageTemplate = true;
	if(!tpl_code)
		return !isListPageTemplate;
	if(tpl_code.indexOf(",") != -1){
		tpl_code = tpl_code.substring(0, tpl_code.indexOf(","));	
	}
	var names = new Array();
	var values = new Array();
	names[0] = "componame";
	values[0] = this.getCompoName();
	names[1] = "tplCode";
	values[1] = tpl_code;
	var xmldata = qryData("print-ruleData.AS_GET_PRINT_JASPERTEMP",names,values);
	//if(!sdetaildelta)
	//	return !isListPageTemplate;
	//var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	//xmldom.loadXML(sdetaildelta);
	//var xmldata = xmldom.documentElement;	
	if(!xmldata || xmldata.childNodes.length == 0)
		return !isListPageTemplate;
	var tplType = xmldata.firstChild.childNodes[3].getAttribute("value");
	if(!tplType)
		return !isListPageTemplate;
	if(tplType.substring(tplType.length - 2, tplType.length) == "_L")
		return isListPageTemplate;
	return !isListPageTemplate;
}


//----------------------------------------------------------------------
//
//
function PrintX_getPrintSetInfo(){
	var vasValues = this.getCookiesPrintSetInfo();
	if(!vasValues || !vasValues["TplCode"]){
		vasValues = this.getServerPrintSetInfo();
	}
	if(!vasValues || !vasValues["TplCode"]){
		vasValues = this.getDefaultPrintSetInfo();
	}
	var vasJSValues = this.getBeforeFprintPrintSetInfo();
	vasValues = this.evaluatePrintSetInfo(vasValues, vasJSValues);
	return vasValues;
}

//----------------------------------------------------------------------
//
//
function PrintX_setPrintSetInfo(vasValues){
	if(!vasValues)
		return;
	
	if(!vasValues["UserID"])
		vasValues["UserID"] = this.getSvUserID();
	if(!vasValues["CompoID"])
		vasValues["CompoID"] = this.getCompoName();
	if(!vasValues["PageType"])
		vasValues["PageType"] = this.getPageType();
		
	this.setCookiesPrintSetInfo(vasValues);
	
	var vsCondition = this.formatPrintSetInfo(vasValues);
	this.setPrintSetInfoToServer(vsCondition);	
}

//----------------------------------------------------------------------
//
//
function PrintX_getBeforeFprintPrintSetInfo(){
	var vasValues = new Array();
	vasValues["UserID"] = this.getSvUserID();
	vasValues["CompoID"] = this.getCompoName();
	vasValues["PageType"] = this.getPageType();
	var beforeF = true;
	if(typeof(before_fprint) == "function"){
		try{
			beforeF = eval("before_fprint()");
		}
		catch(e){
			beforeF = true;
		}
	}
	if(!beforeF) 
		return;
	if(this.getParameter("TplCode"))
		vasValues["TplCode"] = this.getParameter("TplCode");
	if(this.getParameter("ExportType"))
		vasValues["ExportType"] = this.getParameter("ExportType");
	if(this.getParameter("IsPreview"))
		vasValues["IsPreview"] = this.getParameter("IsPreview");
	return vasValues;
}

//----------------------------------------------------------------------
//
//
function PrintX_getBeforeFdynamicPrintSetInfo(){
	var vasValues = new Array();
	vasValues["UserID"] = this.getSvUserID();
	vasValues["CompoID"] = this.getCompoName();
	vasValues["PageType"] = this.getPageType();
	var beforeF = true;
	if(typeof(before_fdynamicPrintSet) == "function"){
		try{
			beforeF = eval("before_fdynamicPrintSet()");
		}
		catch(e){
			beforeF = true;
		}
	}
	if(!beforeF) 
		return;
	if(this.getPrintSetParameter("TplCode"))
		vasValues["TplCode"] = this.getPrintSetParameter("TplCode");
	if(this.getPrintSetParameter("InitTplCode"))
		vasValues["InitTplCode"] = this.getPrintSetParameter("InitTplCode");
	if(this.getPrintSetParameter("ExportType"))
		vasValues["ExportType"] = this.getPrintSetParameter("ExportType");
	if(this.getPrintSetParameter("InitExportType"))
		vasValues["InitExportType"] = this.getPrintSetParameter("InitExportType");
	if(this.getPrintSetParameter("IsPreview"))
		vasValues["IsPreview"] = this.getPrintSetParameter("IsPreview");
	if(this.getPrintSetParameter("InitIsPreview"))
		vasValues["InitIsPreview"] = this.getPrintSetParameter("InitIsPreview");
	
	return vasValues;
}

//----------------------------------------------------------------------
//
//
function PrintX_getCookiesPrintSetInfo(){
	var vasValues = new Array();
	var pageName = this.getPageName();
	var vsUserID = this.getSvUserID();
	var vsCompoID = this.getCompoName();
	var vsPageType = this.getPageType();
	var vasCookies = document.cookie.split("; ");
	if(!vasCookies || vasCookies.length == 1)
		return vasValues;
	
	var vasRecord = new Array();	
	for (var i=0; i < vasCookies.length; i++){
		if(!vasCookies[i])
			continue;
		vasRecord = vasCookies[i].split("$$");
		if(vasRecord[0] == pageName)
			break;
	}
	if(i < vasCookies.length){
		for(var i = 1; i < vasRecord.length; i++){
			if(!vasRecord[i])
				continue;
			var vasItem = vasRecord[i].split("=");
			vasValues[vasItem[0]] = vasItem[1];	
		}	
	}
	return vasValues;
}

//----------------------------------------------------------------------
//
//
function PrintX_getDefaultPrintSetInfo(){
	var vasValues = new Array();
	vasValues["UserID"] = this.getSvUserID();
	vasValues["CompoID"] = this.getCompoName();
	vasValues["PageType"] = this.getPageType();
	var vsTplCode = this.getDefaultTplCode();
	if(vsTplCode)
		vasValues["TplCode"] = vsTplCode;
	else
	  vasValues["TplCode"] = "notemplate";
	vasValues["ExportType"] = "0";
	vasValues["IsPreview"] = "Y";
	vasValues["IsDefault"] = "Y";
	return vasValues;	
}

//----------------------------------------------------------------------
//
//
function PrintX_setCookiesPrintSetInfo(vasValues){
	if(!vasValues)
		return;
	var vsJSESSIONID = this.getJSESSIONID();
	var pageName = this.getPageName();
	var str = "";
	str += pageName;
	str += "$$";
	str += "UserID=";
	str += vasValues["UserID"];
	str += "$$";
	str += "CompoID=";
	str += vasValues["CompoID"];
	str += "$$";
	str += "PageType=";
	str += vasValues["PageType"];
	str += "$$";
	str += "TplCode=";
	str += vasValues["TplCode"];
	str += "$$";
	str += "ExportType=";
	str += vasValues["ExportType"];
	str += "$$";
	str += "IsPreview=";
	str += vasValues["IsPreview"];	
	document.cookie = str;
	this.setJSESSIONID(vsJSESSIONID);
}

//----------------------------------------------------------------------
//
//
function PrintX_getPageType(){
	
	return this.getPageName();

}

//----------------------------------------------------------------------
//
//
function PrintX_isListPage(vsPageName){
	var isListPage = false;
	if(!vsPageName)
		vsPageName = this.getPageName();
	if(vsPageName)
		if(vsPageName.lastIndexOf("_L") == (vsPageName.length - 2))
			isListPage = true;	
	return isListPage;
}

//----------------------------------------------------------------------
//
//
function PrintX_formatPrintSetInfo(vasValues){
	var result = "";
	if(!vasValues)
		return result;
	result += "<delta>";
	result += "<entity name = \"head\">";
	if(vasValues["UserID"])
		result += "<field name = \"UserID\" value = \"" + vasValues["UserID"] + "\" />";
	if(vasValues["CompoID"])
		result += "<field name = \"CompoID\" value = \"" + vasValues["CompoID"] + "\" />";
	if(vasValues["PageType"])
		result += "<field name = \"PageType\" value = \"" + vasValues["PageType"] + "\" />";
	if(vasValues["TplCode"])
		result += "<field name = \"TplCode\" value = \"" + vasValues["TplCode"] + "\" />";
	if(vasValues["ExportType"])
		result += "<field name = \"ExportType\" value = \"" + vasValues["ExportType"] + "\" />";
	if(vasValues["IsPreview"])
		result += "<field name = \"IsPreview\" value = \"" + vasValues["IsPreview"] + "\" />";
	result += "</entity>";
	result += "</delta>";
	return result;
}

//----------------------------------------------------------------------
//
//
function PrintX_resolvePrintSetInfo(vsText){
	var vasValues = new Array();
	if(!vsText){	
		return vasValues;
	}
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(vsText);
	if(!xmldom || !xmldom.documentElement)
		return vasValues;
	
	var results = xmldom.documentElement.firstChild;
	for(var i=0; i < results.childNodes.length; i++){
		var voField = results.childNodes.item(i);
		var vsfieldname = voField.getAttribute("name");
		if(vsfieldname)
			vasValues[vsfieldname] = voField.getAttribute("value");
	}
	return vasValues;
}

//----------------------------------------------------------------------
//
//
function PrintX_setPrintSetInfoToServer(vsInfo){
	if(!vsInfo)
		return;
	var names = new Array();
	var values = new Array();
	names[0] = "userId";
	values[0] = this.getSvUserID();
	names[1] = "parameter";
	values[1] = vsInfo;
	requestDataK("setPSParameter", "all", names, values);
}

//----------------------------------------------------------------------
//
//
function PrintX_getServerPrintSetInfo(){
	var vasValues = new Array();
	vasValues["UserID"] = this.getSvUserID();
	vasValues["CompoID"] = this.getCompoName();
	vasValues["PageType"] = this.getPageType();
	var vsCondition = this.formatPrintSetInfo(vasValues);
	var vsText = this.getPrintSetInfoFromServer(vsCondition);
	return this.resolvePrintSetInfo(vsText);	
}

//----------------------------------------------------------------------
//
//
function PrintX_getPrintSetInfoFromServer(vsCondition){
	if(!vsCondition)
		return;
	var names = new Array();
	var values = new Array();
	names[0] = "userId";
	values[0] = vsCondition;	
	return requestDataK("getPSParameter", "all", names, values);
}


//----------------------------------------------------------------------
//modified by hmgkevin 08-03-12
//---------------------------------------------------------------------
function PrintX_getCompoPageTplCode(vsCompoName, vsPageType){
	if(!vsCompoName)
		vsCompoName = this.getCompoName();
	if(!vsPageType)
		vsPageType = this.getPageType();
	var names = new Array();
	var values = new Array();
	names[names.length] = "componame";
	values[values.length] = vsCompoName;
	names[names.length] = "reportType";
	if(this.isListPage(vsPageType)){
		values[values.length]= '%L';
	}else{
		values[values.length]= '%E';
	}
	return qryData("print-ruleData.AS_GET_PRINT_JASPERTEMP", names, values);
}

//----------------------------------------------------------------------
//
//
function PrintX_getDefaultTplCode(){
	var vsCompoName = this.getCompoName();
	var vsPageType = this.getPageType();
	var result = this.getCompoPageTplCode(vsCompoName, vsPageType);
	if(result.childNodes.length == 0)
		return;
	return result.firstChild.childNodes[1].getAttribute("value");
}

//----------------------------------------------------------------------
//
//
function PrintX_evaluatePrintSetInfo(vasValues, vasNewValues){
	if(!vasNewValues)
		return vasValues;
	if(!vasValues)
		vasValues = new Array();
	if(vasNewValues["TplCode"])
		vasValues["TplCode"] = vasNewValues["TplCode"];
	if(vasNewValues["ExportType"])
		vasValues["ExportType"] = vasNewValues["ExportType"];
	if(vasNewValues["IsPreview"])
		if(vasValues["ExportType"] == "0")
			vasValues["IsPreview"] = vasNewValues["IsPreview"];
	return vasValues;
}

//----------------------------------------------------------------------
//
//
function PrintX_evaluatePrintSetInfo1(vasValues, vasNewValues){
	if(!vasNewValues)
		return vasValues;
	if(!vasValues)
		vasValues = new Array();
	if(vasNewValues["TplCode"])
		vasValues["TplCode"] = vasNewValues["TplCode"];
	if(vasNewValues["ExportType"])
		vasValues["ExportType"] = vasNewValues["ExportType"];
	if(vasNewValues["IsPreview"])
		if(vasValues["ExportType"] == "0")
			vasValues["IsPreview"] = vasNewValues["IsPreview"];	
			
	if(vasValues["IsDefault"]){
		if(vasNewValues["InitTplCode"])
			vasValues["TplCode"] = vasNewValues["InitTplCode"];
		if(vasNewValues["InitExportType"])
			vasValues["ExportType"] = vasNewValues["InitExportType"];
		if(vasNewValues["InitIsPreview"])
			if(vasValues["ExportType"] == "0")
				vasValues["IsPreview"] = vasNewValues["InitIsPreview"];
	}
	return vasValues;
}


//----------------------------------------------------------------------
//
//
function PrintX_isNoTemplatePrint(vasInfo){
	isNoTemplate = false;
	try{
		if(!vasInfo || !vasInfo["TplCode"] || vasInfo["TplCode"] == "notemplate")
			isNoTemplate = true;
	}
	catch(e){
		//	
	}
	return isNoTemplate;
}

//----------------------------------------------------------------------
//
//
function PrintX_getCompoName(){
	return DataTools.getCompoName();	
}

//----------------------------------------------------------------------
//
//
function PrintX_doPrintStart(vasInfo, functionID, names, values){
	
	if(vasInfo["ExportType"] == "3"){
	  	if(!this.isExistHtmlFile(vasInfo["TplCode"])){
	    	return;
	  	}
  	}
	names[names.length] = "IsPreview";
	values[values.length] = vasInfo["IsPreview"];
	if(!this.isPreview(vasInfo)){
		
		names[names.length]  = "xmlhttp";
		values[values.length] = "true";
		var com = getCommunity();
		if (com != null){
			var result = com.doRequest(functionID,this.getCompoName(),names,values,"");
			//alert(result.xml);
			this.printpg_printer(result);
		}
	}
	else{
		var com = getPageCommunity();
		if (com != null){
			com.doRequestPage(functionID, this.getCompoName(),names, values);
		}
	}	
}

//----------------------------------------------------------------------
//
//
function PrintX_isPreview(vasInfo){
	var isPreview = true;
	if(vasInfo["ExportType"] == "0" && vasInfo["IsPreview"] == "N")
		isPreview = false;
	return isPreview;	
}

/**
 * 获取列表页面所选行的主键信息：json对象
 */
function PrintX_encodeAllSelectedKeys(){
	var voListGrid = PageX.getListGrid();
	if(!voListGrid){
		return "[]";
	}
	
	var allKeys = voListGrid.getAllSelectedDataKeys();
	if(allKeys.length == 0){
		return '';
	}
	
	var result = "["
	for(var i=0; i<allKeys.length; i++){
		if(i==allKeys.length-1){
			result += "{" + allKeys[i] + "}]";
		}else{
			result += "{" + allKeys[i] + "},";
		}
	}
	return result;
}

/**
 * 设置打印公用的基本参数
 * TPL_CODE, compoName, parameters, exportType, DynamicTpl
 * @param names
 * @param values
 * @return
 */
function PrintX_setPrintCommonParamters(names, values){
	var vasInfo = this.getPrintSetInfo();
	names[names.length] = "TPL_CODE";
	values[values.length] = vasInfo["TplCode"];
	names[names.length] = "compoName";
	values[values.length] = this.getCompoName();
	names[names.length] = "exportType";
	values[values.length] = vasInfo["ExportType"];
	var sDynamicTpl = this.getParameter("DynamicTpl");
	if(sDynamicTpl == "1"){
		names[names.length] = "DynamicTpl";
		values[values.length] = "1";	
	}	
}
/**
 * 使用sqlid从后台查询数据的打印方式来设置sqlid，condition，keyCondition等参数
 * 仅支持列表页面
 * @param names
 * @param values
 * @return
 */
function PrintX_setParamtersWithSql(names, values){
	var voListGrid = PageX.getListGrid();
	if(!voListGrid){
		return;
	}
	
	var tablemeta = DataTools.getTableData(voListGrid.getTableName());
	//var condition = this.getParameter("condition");
	//if(!condition){
	condition = tablemeta.getElementsByTagName("meta")[0].getAttribute("condition");
	condition += ";" + PageX.getListCondition();
	//}
	if(condition){	
		names[names.length] = "condition";
		values[values.length] = condition;
	}
	//var ruleID = this.getParameter("sqlid");
	//if(!ruleID){
	ruleID = tablemeta.getElementsByTagName("meta")[0].getAttribute("sqlid");
	//}
	if(ruleID){
		names[names.length] = "ruleID";
		values[values.length] = ruleID;
	}
	names[names.length] = "keyCondition";                          
	values[values.length] = this.encodeAllSelectedKeys();
}

/**
 * 设置值集参数
 * @param names
 * @param values
 * @return
 */
function PrintX_setValueSetParamter(names, values){
	var voListGrid = PageX.getListGrid();
	if(!voListGrid){
		return;
	}
	
	var sDynamicTpl = this.getParameter("DynamicTpl");
	var valueSet = "";
	var fieldNames = voListGrid.getFieldNames();
	for(var j = 0; j < fieldNames.length; j++){
		if(!voListGrid.isColVisible(fieldNames[j]) && sDynamicTpl == "1"){
	  		continue;
	  	}
	  	var valueSetTemp = voListGrid.getFieldAttr(fieldNames[j], "valuesetcode");
	  	if(!PF.isEmpty(valueSetTemp)){
	  		if(valueSet != "")valueSet += ";";
	  		valueSet += fieldNames[j] + "=" + valueSetTemp;
	  	}
	}
	names[names.length] = "valueSet";
	values[values.length] = valueSet;
}

/*
Title: gp.page.PrintX
Description: ��ӡ����
Company: ��������
Author: zhangyw;
*/
// import PageX.sRootPath; // defined in ..\..\script\Community.js

//----------------------------------------------------------------------
//����ҳ���е�ȫ�ֶ���;
var PrintX = new PrintX();
//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function PrintX(){

  this.CLASSNAME= "gp.page.PrintX";

  this.sName= this.CLASSNAME;//��������.
  this.vPrintParameters = new Map();//��ӡ����
	this.vPrintSetParameters = new Map();//��ӡ���ò���
  
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
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
function PrintX_init(tIsFinalClass){
  this.vPrintParameters.put("PageType",PageX.sPageType);
  this.vPrintParameters.put("DynamicTpl","0");
}
//----------------------------------------------------------------------
//public;��ӡ����
//����ֵ:void;
function PrintX_fprintset(){
	this.fdynamicPrintSet();
}
//----------------------------------------------------------------------
//public;��ӡ����
//����ֵ:void;
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
//����jasperreportģ���������modified by hmgkevin on 08-03-12
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
	var newflag=true;//���ݿ��д���Ϊfalse��������Ϊtrue
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
			newflag=false;//���ݿ��д���Ϊfalse��������Ϊtrue
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
	var win = window.open(PageX.sRootPath + "/dispatcher.action?function=prntempdesigner&componame="+prn_compo_id+"&prnTplName="+prn_tpl_name+"&prnTplCode="+prn_tpl_jpcode+"&reporttype="+prn_tpl_reporttype+"&newflag="+newflag+"&FIXROWCOUNT="+prn_tpl_fixrowcount+"&componameprn="+componameprn+"&cocode="+cocode,"ģ�������",
													"menubar=no,status=no,toolbar=no,"
													+ "resizable=yes,titlebar=yes,scrollbars=yes,"
													+ "height=" + (screen.availHeight - 30) + ",width="
													+ (screen.availWidth - 10) + ",top=0,left=0");
}
//----------------------------------------------------------------------
//public;��ȡ��ӡ����
//����ֵ: �ɹ�����������;ʧ�ܣ�null��
/*
  ��ȡ��ӡʱ�Ļ������������ز���Ϊһ���飬��ѭ����ԭ��
  	1.	ĳ����cookie�����������ȼ����;
  	2.	��û��������ͼ����ʱ��ϵͳ����ĳ�����������������ӡ�����
  		i.	�����������ù���ӡģ�����Ե�һ����ӡģ��ΪĬ�ϴ�ӡ���;
  		ii.	������û�����ô�ӡģ����ֱ�Ӵ�ӡΪĬ�ϴ�ӡ���;
  
  ���ز���Ϊһ����result�����˵�����������
  A��fop��ӡ����������Ԫ��
  		result[0]:Ϊ������+��_L�� �� ������+��_E�� ;�б�ҳ��Ϊ������+��_L�����༭ҳ��Ϊ������+��_E����
  		result[1]:ֵΪ"fop" ����fop/jasperreport
  B��jasperreport��ӡ ҳ���ӡ  ��������Ԫ��
  		result[0]:Ϊ������+��_L�� �� ������+��_E�� ;�б�ҳ��Ϊ������+��_L�����༭ҳ��Ϊ������+��_E����
  		result[1]:ֵΪ"jasperreport" ����fop/jasperreport
  		result[2]:ֵΪ"notemplate" ����notemplate/template
  		result[3]:ֵΪtrue/false  Ҫ���ӡ��������
  		result[4]:ֵΪtrue/false  Ҫ���ӡ��������
  		result[5]:ֵΪ0/1/2/3/4 ����ļ����������ͣ�PDF��XLS��CSV��HTML��XML��
  C��jasperreport��ӡ ģ���ӡ  �������Ԫ��
  		result[0]:Ϊ������+��_L�� �� ������+��_E�� ;�б�ҳ��Ϊ������+��_L�����༭ҳ��Ϊ������+��_E����
  		result[1]:ֵΪ"jasperreport" ����fop/jasperreport
  		result[2]:ֵΪ"template" ����notemplate/template
  		result[3]:ֵΪ��ǰ���õ�ģ���ļ�������
  		result[4]:ֵΪ0/1/2/3/4 ����ļ����������ͣ�PDF��XLS��CSV��HTML��XML��
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
  //������ڴ�ӡģ��Ĭ��Ϊģ���ӡ��Ϣ��
  //�����б�ҳ��Ĭ��Ϊֱ�Ӵ�ӡ���༭ҳ��Ϊģ���ӡ
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
			if (!sdetaildelta){//û��ģ��
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
//public;���ô�ӡ����
//����ֵ: void;
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
//public;��cookie��ȡ��JSESSIONID
//����ֵ: �ɹ���JSESSIONID;ʧ�ܣ�null��
function PrintX_getJSESSIONID(){//TODO:ͳһ��ȡcookie��Ϣ
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
//public;����JSESSIONID��
//����ֵ: �ɹ���true;ʧ�ܣ�false��
function PrintX_setJSESSIONID(vsJSESSIONID){//TODO:ͳһ����cookie��Ϣ
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
//public;���ļ���ȡ��ӡ����
//����ֵ: �ɹ�����������;ʧ�ܣ�null��
/*
  *��ӡ����ʱ��������ʹ��cookies���Ӵ洢cookies��Ϣ���ļ���ȡ���ò���
  *�洢��ʽ���£�
  *<PRINTSETCOOKIES><pageName att1 att2 .... /></PRINTSETCOOKIES>
  *pageNameΪ�����
  *attr1Ϊ���ԣ�˳�����£�
  *1.printType
  *2.isTemplate
  *3.tplCode
  *4.exportType
  *5.printNull
  *6.printZero
  *ǰ7�������Ǵ�ӡ�������ã��ӵ�8����ʼ�������Ĵ�ӡ�߼�ѡ��
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
		alert("�����쳣������˲���Ҫ��д����Ӳ���ļ��Լ�ס��ӡ������\n�������Ҫ��IE��������á�\n\n"+
		"�������������: " + "\n\t����������     ���ߡ���>Internetѡ���>��ȫ����>����Intranet����>�Զ��弶��\n"+
		"����û�б��Ϊ��ȫ��ActiveX�ؼ����г�ʼ���ͽű��������óɡ����á�������վ������λ������վ�㡣" +
		"\n\n\t����������ȫ����ҲҪ�󽵵Ͱ�ȫ���á�");
	}
}
//----------------------------------------------------------------------
//public;����ӡ����д���ļ�
//����ֵ: void;
/*
 *��ӡ����ʱ��ʹ��cookies�洢��Ϣ��ͬʱҲ���ļ����档
 *�ļ�λ�ã�c:\cookies��PRINTSETCOOKIES;
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
    alert("�����쳣������˲���Ҫ��д����Ӳ���ļ��Լ�ס��ӡ������\n�������Ҫ��IE��������á�\n\n"+
		"�������������: " + "\n\t����������     ���ߡ���>Internetѡ���>��ȫ����>����Intranet����>�Զ��弶��\n"+
		"����û�б��Ϊ��ȫ��ActiveX�ؼ����г�ʼ���ͽű��������óɡ����á�������վ������λ������վ�㡣" +
		"\n\n\t����������ȫ����ҲҪ�󽵵Ͱ�ȫ���á�");
	}
}
//----------------------------------------------------------------------
//public;ȡ�ô�ӡ�߼�ѡ������
//����ֵ: �ɹ���XML��ʽ����;ʧ�ܣ�"";
/*
 *ȡ�ô�ӡ�߼�ѡ�����ã����ݸ�ʽ��<elements><element>......<element><elements>��
 *��ʹ��ʱ��ͬ��������һ�𴫵ݸ���������names��options��value���������ݡ�
 *���Դ��ݶ��ģ������ò�������<elements>�ָ���
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
//public;��ȡ��ӡ�߼�ѡ��
//����ֵ: �ɹ�����������;ʧ�ܣ�null;
/*
 *	�Ӵ洢cookies���ļ��ж�ȡ��ӡ�߼�ѡ���ʽ���£�
 * <AS_COMPANY_E printType="jasperreport" isTemplate="template" tplCode="AS_COMPANY_E3"
 * exportType="0" printNull="" printZero="" >  -----��ӡ������Ϣ
 *   <AS_COMPANY_E3 pageSize="" pageWidth="" pageHeight="" pageLeftMargin="" pageRightMargin=""
 *	 pageTopMargin="" pageBottomMargin="" />   -----��ӡ�߼�ѡ��
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
    alert("�����쳣������˲���Ҫ��д����Ӳ���ļ��Լ�ס��ӡ������\n�������Ҫ��IE��������á�\n\n"+
		"�������������: " + "\n\t����������     ���ߡ���>Internetѡ���>��ȫ����>����Intranet����>�Զ��弶��\n"+
		"����û�б��Ϊ��ȫ��ActiveX�ؼ����г�ʼ���ͽű��������óɡ����á�������վ������λ������վ�㡣" +
		"\n\n\t����������ȫ����ҲҪ�󽵵Ͱ�ȫ���á�");
	}
}
//----------------------------------------------------------------------
//public;���ô�ӡ�߼�ѡ��
//����ֵ: void;
/*
 *����ӡ�߼�ѡ��洢���ļ��У��洢��ʽ���£�
 * <AS_COMPANY_E printType="jasperreport" isTemplate="template" tplCode="AS_COMPANY_E3"
 * exportType="0" printNull="" printZero="" >  -----��ӡ������Ϣ
 *   <AS_COMPANY_E3 pageSize="" pageWidth="" pageHeight="" pageLeftMargin="" pageRightMargin=""
 *	 pageTopMargin="" pageBottomMargin="" />   -----��ӡ�߼�ѡ��
 * </AS_COMPANY_E>
 * params�Ǵ�ӡ�߼�ѡ����庬�壺
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
    alert("�����쳣������˲���Ҫ��д����Ӳ���ļ��Լ�ס��ӡ������\n�������Ҫ��IE��������á�\n\n"+
		"�������������: " + "\n\t����������     ���ߡ���>Internetѡ���>��ȫ����>����Intranet����>�Զ��弶��\n"+
		"����û�б��Ϊ��ȫ��ActiveX�ؼ����г�ʼ���ͽű��������óɡ����á�������վ������λ������վ�㡣" +
		"\n\n\t����������ȫ����ҲҪ�󽵵Ͱ�ȫ���á�");
	}
}
//----------------------------------------------------------------------
//public;ȡ�ô�ӡ�߼�ѡ������
//����ֵ: �ɹ���XML��ʽ����;ʧ�ܣ�"";
/**
 * ��ӡ�߼�ѡ����������˴��ݵĲ���������Щ�������Ҫ���ǡ�
 * ���ݵ�������xml��ʽ��<elements><element>...
 * ......</element></elements>,����ÿһ��<element>����ÿ��ģ��ĸ߼�ѡ�
 * ÿ��<element>�����Ĳ������£�
 * <tplCode></tplCode> ģ�����
 * <pageWidth></pageWidth>
 * <pageHeight></pageHeight>
 * <pageLeftMargin></pageLeftMargin>
 * <pageRightMargin></pageRightMargin>
 * <pageTopMargin></pageTopMargin>
 * <pageBottomMargin></pageBottomMargin>
 * <printDirect></printDirect> �Ƿ�ֱ���������ӡ��
 * ��Щ����Ҳ���Բ�����������ݣ�ģ������Ǳش��
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
//public;��ӡ
//����ֵ: void;
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
		this.fprint_select();//�˹���û��ʵ��
	}
}

//----------------------------------------------------------------------
//public;�б�ҳ���ӡ����
//����ֵ: void;
function PrintX_fprint_list(){
	var names = new Array();
	var values = new Array();
	var vasInfo = this.getPrintSetInfo();
	if(this.isNoTemplatePrint(vasInfo)){
		values[0] = "30,0,50,20,printer_title,n,��ӡ��: ";
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
//public;�༭ҳ���ӡ����
//����ֵ: void;
function PrintX_fprint_edit(){
	var names = new Array();
	var values = new Array();	
	var vasInfo = this.getPrintSetInfo();
	if (this.isNoTemplatePrint(vasInfo)){
		names[0] = "0,0,50,20,printer,n,��ӡ��";
		names[1] = "50,0,100,20,printer1,n," + DataTools.getSV("svUserName");
		var pageHeaderContent = this.getParameter("PageHeaderContent");
		if(!pageHeaderContent)pageHeaderContent = " �༭ҳ����ģ���ӡ";
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
//public;����ҳ���ӡ����
//����ֵ: void;
function PrintX_fprint_report(){
	var names = new Array();
	var values = new Array();
	var vasInfo = this.getPrintSetInfo();
	if (this.isNoTemplatePrint(vasInfo)){
		names[0] = "0,0,50,20,printer,n,��ӡ��";
		names[1] = "50,0,100,20,printer1,n," + DataTools.getSV("svUserName");
		this.printNoTemplate_R(vasInfo, " ",names,"����ҳ����ģ���ӡ",100,40);
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
//public;ѡ��ҳ���ӡ����
//����ֵ: void;
function PrintX_fprint_select(){
	alert("ҳ���ӡ����û��ʵ�֣�");
}
//----------------------------------------------------------------------
//public;�б�ҳ����ģ���ӡ
//����ֵ: void;
/**
 * �б�ҳ����ģ���ӡ
 * @param paramName ģ���ж���Ĳ����ֶ�����
 * @param paramValue ������ֶζ�Ӧ�Ĳ���ֵ
 * @param templateName ��ӡģ������
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
//public;�б�ҳ����ģ���ӡ
//����ֵ: void;
/**
 * �б�ҳ�涯̬��ӡ
 * @param params ��̬��ӡʱ������Ҫ��̬�����Ԫ��λ�����ݵ���Ϣ
 * @param pageHeaderH ָ��jasperReportģ��ı�ͷ����߶�
 * @param pageFooterH ָ��jasperReportģ��ı�β����߶�
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
  	values[8] = "�б�ҳ����ģ���ӡ";
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
//public;�б�ҳ����ñ༭ҳ��Ĵ�ӡ�ӿڣ�ʵ��������ӡ
//����ֵ: void;
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
function PrintX_getAllListCurrentPagePrintData(){//TODO:ȥ��ǰ̨ƴ��printdata
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
 * ȡ���б�ҳ��ѡ���еĴ�ӡ���ݰ�
 * @deprecated
 * @return xml����
 */
function PrintX_getListSelectPrintDataOneDelta(){//TODO:ȥ��ǰ̨ƴ��printdata
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
 * ȡ���б�ҳ��ѡ���еĴ�ӡ���ݰ�
 * @deprecated 
 */
function PrintX_getListSelectPrintData(){//TODO:ȥ��ǰ̨ƴ��printdata
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
function PrintX_getListPagePrintData(){//TODO:ȥ��ǰ̨ƴ��printdata
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
		var vasKeyField = selectRowArray[i].split(";");//�����ֶ�
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
//public;�༭ҳ����ģ���ӡ
//����ֵ: void;
function PrintX_printWithTemplate_E(vasInfo, names, values){
	names[names.length]= "printType";
  	values[values.length] = "EDIT_TPL";
	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;�༭ҳ����ģ���ӡ
//����ֵ: void;
/**
 * �༭ҳ�涯̬��ӡ
 * @param params ��̬��ӡʱ������Ҫ��̬�����Ԫ��λ�����ݵ���Ϣ
 * @param pageHeaderContent ҳü��ʾ������
 * @param pageHeaderH ָ��jasperReportģ��ı�ͷ����߶�
 * @param pageFooterH ָ��jasperReportģ��ı�β����߶�
 */
function PrintX_printNoTemplate_E(vasInfo, pnames, pvalues,pageHeaderContent,pageHeaderH,pageFooterH){
  	var support = this.isSupport();
  	if(!support){
	    alert("�˲�����֧�ֶ�̬��ӡ!��ѡ��Ƕ�̬��ӡ��ʽ");
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
//public;����ҳ����ģ���ӡ
//����ֵ: void;
function PrintX_printWithTemplate_R(vasInfo, names, values){
	names[names.length]= "printType";
  	values[values.length] = "REPORT_TPL";
	this.doPrintStart(vasInfo, "jrPrint", names, values);
}
//----------------------------------------------------------------------
//public;����ҳ����ģ���ӡ
//����ֵ: void;
/**
 * ����ҳ����ģ���ӡ
 * @param areaName ȡ�����õ�������\uFFFD
 * @param params ��̬��ӡʱ������Ҫ��̬�����Ԫ��λ�����ݵ���Ϣ
 * @param pageHeaderContent ҳü��ʾ������
 * @param pageHeaderH ָ��jasperReportģ��ı�ͷ����߶�
 * @param pageFooterH ָ��jasperReportģ��ı�β����߶�
 */
function PrintX_printNoTemplate_R(vasInfo, areaName,params,pageHeaderContent,pageHeaderH,pageFooterH){
  	var support = this.isSupport();
  	if(!support){
	    alert("�˲�����֧�ֶ�̬��ӡ!��ѡ��Ƕ�̬��ӡ��ʽ");
	  	return;
  	}
  	var voReportGrid = this.getReportTableObj();
  	if(!voReportGrid){
	    alert("û�в�ѯ��������ܽ�����ģ���ӡ��");
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
		//alert("���Ƚ��в鿴��");
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
//public;fop��ӡ
//����ֵ: void;
function PrintX_fopPrintWithTemplate(param,names,values){
	var com = getPageCommunity();
	if (com != null)
		com.doRequestPage("fprint",this.getCompoName(),names,values,"");
}
//----------------------------------------------------------------------
//public;��������
//����ֵ: �ɹ���xml��ʽ���ַ�����ʧ�ܣ��մ���
/**
 * �������������ݴ����Ĳ����ֶ����鼰����ֵ��������xml��ʽ�Ĳ�����Ϣ
 * @param paramName ģ���ж���Ĳ����ֶ�����
 * @param paramValue ������ֶζ�Ӧ�Ĳ���ֵ
 * @return xml��ʽ���ַ���
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
//public;��ӡ�ļ��Ƿ����
//����ֵ: �ɹ���true; ʧ�ܣ�false;
function PrintX_isExistHtmlFile(tplCode){
  	if(!tplCode)
    	return false;
  	if(tplCode == "notemplate")
  		return true;
  	
  	var flag = true;
	var tplCodeArray = tplCode.split(",");
	for(var i = 0; i < tplCodeArray.length; i++){
		//��ȡģ��HTML�ļ�
		var result = this.getTplFile(tplCodeArray[i]);
		if(!result){
			alert(result);
			flag = false;
			break;
		}
		else if(result.childNodes[0].nodeValue.indexOf("false:") == 0){
			alert("����ȷ�ϴ�ӡģ�� [ " + tplCodeArray[i] + " ] �����·���£�" + result.childNodes[0].nodeValue.substring(6));
			flag = false;
			break;
		}
	}
  return flag;
}
//----------------------------------------------------------------------
//public;ȡ�ô�ӡģ��HTML�ļ�����
//����ֵ: �ɹ���result����; ʧ�ܣ�"";
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
//public;ȡ���±༭ҳ������
//����ֵ: �ɹ���XML��ʽ����; ʧ�ܣ�"";
/**
 * ȡ���±༭ҳ�����ݣ����ݸ�ʽ��
 * <XMLDATA>
 *   <compometa>����</ compometa>//ȷ�������ӱ��ϵ
 *   <session>����</session>     //session����
 *   <pagedata>����</pagedata>   //ҳ�����ݣ�����������ӱ�
 * </XMLDATA>
 */
function PrintX_getPrintDataXML(){//TODO:ȥ��ǰ̨ƴ��printdata
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
//public;�Ե����������ӱ���Ϣ
//����ֵ: �ɹ���XML��ʽ����; ʧ�ܣ�XML��ʽ����;
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
//public;ȡ�������ӱ�����
//����ֵ: �ɹ���XML��ʽ����; ʧ�ܣ�"";
function PrintX_getPageDataXML(){//TODO:ȥ��ǰ̨ƴ��printdata
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
//public;ȡ�ö�ҳǩ����ɼ�ҳǩ���ӱ�����
//����ֵ: �ɹ����ӱ�����; ʧ�ܣ�"";
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
//public;�ж��Ƿ�ֱ���������ӡ��
//����ֵ: �ɹ�������true; ʧ�ܣ�����false;
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
//public;ȡ��ҳ������
//����ֵ: �ɹ�������pageName; ʧ�ܣ�����"";
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
//public;ȡ��ҳ������
//����ֵ: �ɹ�������pageName; ʧ�ܣ�����"";
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
//public;ȡ��ҳ����
//����ֵ: �ɹ���iPageWidth; ʧ�ܣ�����576;
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
//public;������̬��ӡʱ���ݵĲ���
//����ֵ: �ɹ�������XML����; ʧ�ܣ�XML����;
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
//public;ȡ�ÿɼ����ӱ����
//����ֵ: �ɹ��������ӱ����; ʧ�ܣ�null;
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
//public;����б�ҳ��ı�ǩ�ֶ���Ϣ
//����ֵ: �ɹ�������XML����; ʧ�ܣ�XML������;
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
//public;����б�ҳ����ֶ���Ϣ
//����ֵ: �ɹ�������XML����; ʧ�ܣ�XML����;
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
//public;����ҳ��ȡ��������Ϣ
//����ֵ: �ɹ���XML����; ʧ�ܣ�����"";	
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
//public;�ж�ĳ�����༭ҳ���Ƿ�֧�ֶ�̬��ӡ
//����ֵ: �ɹ���true; ʧ�ܣ�false;	
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
//public;�������������
//����ֵ: �ɹ���������; ʧ�ܣ�0;	
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
//public;��ö�̬��ӡҳ��ı�ǩԪ��
//����ֵ: �ɹ���xml����; ʧ�ܣ�xml������;	
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
//public;��ñ༭ҳ��ı�ǩ��Ϣ
//����ֵ: �ɹ���xml����; ʧ�ܣ�xml������;	
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
//public;��ñ༭ҳ��ı����ֶ���Ϣ
//����ֵ: �ɹ���xml����; ʧ�ܣ�xml������;	
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
//public;��ñ༭ҳ�������ֶα�ǩ��Ϣ�����༭ҳ�涯̬��ӡʱ�������ֶ���Ϊ��ǩ����
//����ֵ: �ɹ���xml����; ʧ�ܣ�xml������;	
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
//public;���ҳ����ֶ���Ϣ
//����ֵ: �ɹ���xml����; ʧ�ܣ�xml������;	
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
//public;��ñ༭ҳ��Ŀɼ��ӱ�����
//����ֵ: �ɹ����ӱ�����; ʧ�ܣ�"";	
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
//public;��ȡ���̶�����
//����ֵ: �ɹ��������������; ʧ�ܣ�����0;	
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
//public;��ȡ�����������
//����ֵ: �ɹ������������������; ʧ�ܣ�����0;	
/**
 *������һҳ������ܹ���ӡ���������ݣ�����ӡ�߼�ѡ����ֽ�Ŵ�С
 *����ģ��ֽ�Ŵ�Сʱ�����¼��㡣
 *���ģ����û�б����߱����û�������У�����0�����򣬷����������������
 */
function PrintX_getMaxRowCount(prn_tpl_code){
	var result = this.getTplFile(prn_tpl_code);
	if(!result){
		alert(result);
		return;
	}
	else {
		if(result.childNodes[0].nodeValue.indexOf("false:") == 0){
			alert("����ȷ�ϴ�ӡģ�� [ " + prn_tpl_code + " ] �����·���£�" + result.childNodes[0].nodeValue.substring(6));
			return;
		}
	}

	var pageName = this.getPageName();
	var maxRowCount =  this.calMaxRowCount(result, pageName, prn_tpl_code);
	return maxRowCount;
}
//----------------------------------------------------------------------
//public;������̶�����
//����ֵ: �ɹ������������������; ʧ�ܣ�����0;	
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
//public;ȡ��HTML����ĸ߶�
//����ֵ: �ɹ����߶�ֵ; ʧ�ܣ�����0;	
function PrintX_getObjHeight(obj){
	var height = obj.style.height;
  	if(height == "")
  		height = obj.height;
  	if(height == "")
  		height = obj.offsetHeight;
  	return parseInt(height);
}
//----------------------------------------------------------------------
//public;��λת��������ת��Ϊint��
//����ֵ: �ɹ�������int��; ʧ�ܣ�����0;	
function PrintX_unitConvert(pixel){
	return parseInt(pixel);
}
//----------------------------------------------------------------------
//public;ȡ�ñ����и߶�
//����ֵ: �ɹ��������п��; ʧ�ܣ�����20;	
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
//public;ȡ�������и߶�
//����ֵ: �ɹ��������п��; ʧ�ܣ�����20;
function PrintX_getRowDetailHeight(){
	var iRowDetailHeight = 20;
	return iRowDetailHeight;
}
//----------------------------------------------------------------------
//public;ȡ�õ�ǰ�ɼ��ӱ����
//����ֵ: �ɹ����ӱ����; ʧ�ܣ�null;
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
//public;ȡ�ñ༭ҳ��ҳü����߶�
//����ֵ: �ɹ���ҳü�߶�; ʧ�ܣ�����0;
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
//public;ȡ�ñ༭ҳ��ҳ������߶�
//����ֵ: �ɹ���ҳ�Ÿ߶�; ʧ�ܣ�����0;
function PrintX_getPageFooterH(){
	var iPageFooterH = 0;
	return iPageFooterH;
}
//----------------------------------------------------------------------
//public;ȡ��freeҳ��field��caption����
//����ֵ: �ɹ���caption����; ʧ�ܣ�����null;
function PrintX_getFFCaption(voEditBox){
	var voCaption = null;
	if(voEditBox != null){
		voCaption = voEditBox.oOuterPanel.parentElement.previousSibling;
	}
	return voCaption;
}
//----------------------------------------------------------------------
//public;ȡ��freeҳ��field��captionֵ
//����ֵ: �ɹ���captionֵ; ʧ�ܣ�����"";
function PrintX_getFFCaptionValue(voCaption){
	var sCaption = "";
	if(voCaption != null){
		sCaption = voCaption.innerText;
	}
	return sCaption;
}
//----------------------------------------------------------------------
//public;ȡ�ñ���ҳ����ӱ����
//����ֵ: �ɹ���voReportTable; ʧ�ܣ�null;
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
//public;ȡ�ñ���ҳ����ӱ���
//����ֵ: �ɹ����ӱ���; ʧ�ܣ�����"";
function PrintX_getChildTableName(){
	var sChildTableName = "";
	var voParams = PageX.oDBDataRules.get(this.getRealPageName());//PageX.oDBDataRules.get(this.getCompoName()+ "_E");
	if(!voParams){
		alert("���Ƚ��в鿴��");
		return;
	}
	sChildTableName = voParams.item(1);
	if(!sChildTableName)
	  sChildTableName = "rpjournal";
	return sChildTableName;
}
//----------------------------------------------------------------------
//public;���ô�ӡ�������������ư�����
//	PageType   	ҳ������
//  PrintType  	��ӡ����
//	TplCode    	ģ�����
//  PrintData  	��ӡ����
//	ExportType 	�������
//	DynamicTpl 	��̬���� 
//����ֵ: �ɹ���; ʧ�ܣ�����;
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
//public;��ȡ��ӡ�������������ư�����
//	PageType   	ҳ������
//  PrintType  	��ӡ����
//	TplCode    	ģ�����
//  PrintData  	��ӡ����
//	ExportType 	�������
//	DynamicTpl 	��̬���� 
//����ֵ: �ɹ���pValue; ʧ�ܣ�����"";
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
//public;���ô�ӡ���ò������������ư�����
//	InitPrintType  ��ʼ��ӡ����,ֻ��û�����ô�ӡ����ʱ������
//  PrintType  	   ��ӡ����  
//  InitTplCode    ��ʼģ����룬ֻ��û������ģ�����ʱ������
//	TplCode    	   ģ�����
//  InitExportType ��ʼ�������,ֻ��û�������������ʱ������
//	ExportType 	   ������� 
//����ֵ: �ɹ���; ʧ�ܣ�����;
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
//public;��ȡ��ӡ���ò������������ư�����
//	InitPrintType  ��ʼ��ӡ����,ֻ��û�����ô�ӡ����ʱ������
//  PrintType  	   ��ӡ����  
//  InitTplCode    ��ʼģ����룬ֻ��û������ģ�����ʱ������
//	TplCode    	   ģ�����
//  InitExportType ��ʼ�������,ֻ��û�������������ʱ������
//	ExportType 	   ������� 
//����ֵ: �ɹ���; ʧ�ܣ�����;
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
 * ����ӡ������Ϣ���͵�������
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
 * �ӷ����������ӡ������Ϣ
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
 * �ӷ�������ȡ�ô�ӡ����
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
 * �����ӡ���õ�������
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
 * �ӷ�������ȡ�ô�ӡ�����Cookies��Ϣ
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
 * ����ӡ����Cookies��Ϣ���浽��������
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
 * �ӷ�������ȡ�ô�ӡ����ģ����Ϣ
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
 * ����ӡ����ģ����Ϣ���浽��������
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
 * ȡ�õ�¼UserID����Ϊ�ڷ������˱����ӡ������Ϣ���ļ���
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
//private;ֱ���������ӡ���Ļص�����
//����ֵ: 
function PrintX_printpg_printer(result){
	var fileName = "";
	if(result != null && result.getAttribute("success") == "true"){
		fileName = result.childNodes[0].nodeValue;	
	}
	if(fileName == ""){
		alert("���ɴ�ӡ�ļ�����");
		return;	
	}
	if(!this.isAcrobatPlugin()){
		alert("���Ȱ�װAcrobat Reader !");
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
//public;���������ַ
//����ֵ: �ɹ���������ַ; ʧ�ܣ�����"";
function PrintX_getHostAddr(){
	var names = new Array();
	var values = new Array();
	var result = doRequest("getHostAddr","all",names,values);
	return result;
}
//----------------------------------------------------------------------
//public;�ж��Ƿ�װ��Acrobat Reader
//����ֵ: �ɹ���true; ʧ�ܣ�����false;
function PrintX_isAcrobatPlugin(){
	var pdfVersion = this.getPdfVersion();
	if(pdfVersion == "no"){
		return false;	
	}else{
		return true;
	}
}
//----------------------------------------------------------------------
//public;ȡ�ð�װ��Acrobat Reader�İ汾
//����ֵ: �ɹ����汾��; ʧ�ܣ�����"no";
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
//public;�ж�ģ������
//����ֵ: �б�ҳ��ģ�壺true; ���������� false;
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
 * ��ȡ�б�ҳ����ѡ�е�������Ϣ��json����
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
 * ���ô�ӡ���õĻ�������
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
 * ʹ��sqlid�Ӻ�̨��ѯ���ݵĴ�ӡ��ʽ������sqlid��condition��keyCondition�Ȳ���
 * ��֧���б�ҳ��
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
 * ����ֵ������
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

/* $Id: SearchPage.js,v 1.3 2008/03/29 08:29:51 liuxiaoyong Exp $ */
/*
Title: SearchPage.js
Description:
用于高级搜索及统计搜索
Company: 用友政务
Author: lijianwei
*/
//----------------------------------------------------------------
function SearchPage(){
  //1.超类 =function();

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.webpage.script.SearchPage";
  
  //3.变量声明区 =function();
  this.sSearchOrderBy= ""; //private;
	
  //4.事件声明区 =function();
	
	//5.方法声明区 = function();
	//public;
	this.searchData = SearchPage_searchData;
	this.statSearch = SearchPage_statSearch;
	this.getSearchOrderBy= SearchPage_getSearchOrderBy;
	
	//private;
	
}
//----------------------------------------------------------------------
//6.方法区 =function();
function SearchPage_getSearchOrderBy(){
  return this.sSearchOrderBy;
}
//----------------------------------------------------------------------
function SearchPage_searchData(entityName){
  //alert("SearchPage_searchData();");
  var ignoreFields = "";
  var vasSearch = showModalDialog(PageX.getRoot()+ "/dispatcher.action?function=searchPage" +
                                  "&componame=" + entityName +
                                  "&ignoreFields=" + ignoreFields +
                                  "&pageType=listPage",
  																null,
                                  "resizable:no;status:no;help:no;dialogWidth:700px");
  var window_search= "";
  var vsOrderBy= "";
  if (vasSearch== null) vasSearch= new Array("", "");
  if (vasSearch.length>= 1) window_search= vasSearch[0];
  if (vasSearch.length>= 2) vsOrderBy= vasSearch[1];
  this.sSearchOrderBy= vsOrderBy;

  if (window_search) {
    if(window_search == "ALL"){      
      return "ALL";
    }
    if(window_search  && window_search.length==0){
      return "";
    }
    var pageCond = "";
    var condId = document.getElementById("pageCondition");
    if(condId != null){
      pageCond = condId.getAttribute("value");
    }
    var names = new Array();
    var values = new Array();
    names[0] = "condition";
    if(condId != null && pageCond != ""){
      values[0] = window_search + " and (" + pageCond + ")";
    }else{
      values[0] = window_search;
    }

  if("function" == typeof getListCondition){
    var listCondition = getListCondition();
    if(values[0].length > 1){
      values[0] += " and (" + listCondition + ")";
    }else{
      values[0] = listCondition;
    }
  }
	return values[0];	
	}
	return "";
}

/**
*统计查询
*/
function SearchPage_statSearch(entityName,tableName,vaokiloKeyField){
  var window_search;
  var foreign=null;
  if(window.dialogArguments){
    foreign=dialogArguments;
  }
  window_search = showModalDialog(PageX.getRoot()+ "/Proxy?function=getStatSearchPage" +
                                  "&componame=" + entityName +
                                  "&pageType=listPage",foreign,
                                  "resizable:no;status:no;help:no;dialogHeight:450px;dialogWidth:700px;");

	if (window_search){
		var length = window_search.length;
		var isExitStatSche = false;
		if(length == 2){
		  if(window_search[0] > 1)
		 	isExitStatSche = true;
			isSetStatSchema = window_search[1]
			window_search = null;
		}
	}

	if (window_search) {
		    if(window_search[6] > 1)
		    	isExitStatSche = true;
	  var vsLastCond= ""; //leidh;20060725;
		var returnR = new Array();
		returnR[0] = window_search[0];
		returnR[1] = window_search[1];
		returnR[2] = window_search[2];
		returnR[3] = window_search[3];
 		returnR[4] = window_search[4];
	 		isSetStatSchema = window_search[5]
		var pageCond = "";
		var condId = document.getElementById("pageCondition");
		if(condId != null){
			pageCond = condId.getAttribute("value");
		}
		if(condId != null && pageCond != ""){
			returnR[1] += " and (" + pageCond + ")";
		}
	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(returnR[1].length > 1){
			if((listCondition != null) && (listCondition != "")){
				returnR[1] += " and (" + listCondition + ")";
				}
			}else{
				returnR[1] = listCondition;
			}
		}

		vsLastCond= returnR[1]; //leidh;20060725;

		var names = new Array();
		var values = new Array();
		names[0] = "condition";
		var conditionValue = "";
		var tableName = DataTools.getMainTableName();
		if(returnR[0].length !=0){
			conditionValue += "select " + returnR[0];
		}
		else{
			conditionValue += "select *"
		}
		conditionValue += " from " + tableName;
		if(returnR[1].length != 0){
			conditionValue += " where " + returnR[1];
		}
		if(returnR[2].length !=0){
			conditionValue += " group by " + returnR[2];
		}
		if(returnR[3].length !=0){
			conditionValue += " order by " + returnR[3];
		}
		values[0] = conditionValue;
		//alert(conditionValue);
		conditionValue = escapeSpecial(conditionValue);

		conditionValue= vsLastCond; //leidh;20060725;
		conditionValue = escapeSpecial(conditionValue);
		win = open(PageX.getRoot()+ "/Proxy?function=statSearchDataToPage" +
																	"&componame=" + entityName +
                                  "&kilocol=" + returnR[4] +
																	"&condition=" + conditionValue+
																	"&orderBy=" + returnR[3]+
																	"&groupBy=" + returnR[2]+
																	"&groupList=" + returnR[0],
																	"",
																	"resizable=no,status=no,help=no,"
													                + "height=" + 380 + ",width="+ 450+",top=180,left=250");
  }
}

function addfunc(){
  var sCondition= "1=0";
  var iWidth= screen.availWidth;
  var iHeight= screen.availHeight;
  var sCompoName= _sCompo;
  var productCode= getProductCode(sCompoName);
  var vsPageName= sCompoName+ "_E";
  var vsFunction= "geteditpage";
  var vsURL= "/"+ productCode+ "/portlet.jsp?function="+ vsFunction+ "&"
                + encodeParams("condition", sCondition)
  	            + "&componame=" + sCompoName
	              + "&fieldvalue=" + vsPageName;
	    
  if(TOKEN!= "null"){
    vsURL+= "&token=" + TOKEN;
  }

  var voRect= PF.getCenterRect(iWidth, iHeight);
  if (voRect.iLeft< 0) voRect.iLeft= 0;
  if (voRect.iTop< 0) voRect.iTop= 0;

  var vsStyle= "resizable:yes;status:no;"
               + "dialogLeft:"+ voRect.iLeft+ "px;dialogTop:"+ voRect.iTop+ "px;"
               + "dialogWidth:"+ iWidth+ "px;dialogHeight:"+ iHeight+ "px";
  window.showModalDialog(vsURL, "", vsStyle);
  
  _sSearchCond= " ( "+ _sSearchCond+ " ) "; //为了使search()方法能够执行查询操作
  search();
  
  return true;	
}

function getProductCode(compoId){
  var dotPos= compoId.indexOf("_");
  var productCode= compoId.substring(0, dotPos);
  return productCode;
}

//----------------------------------------------------------------------
//7.事件响应区 =function();

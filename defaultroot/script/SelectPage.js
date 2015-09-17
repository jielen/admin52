var isSelectRow = false;
var changed = false;
var currPage = 1;

var vlPubBeginTime= (new Date()).getTime();

var delNumber = 0;
var fcall = null;
var pageNumber = 0;
var currentRowIndex = 0;
var subWindowName = new Array();
// 记录跨页选取列表页面记录的主键值
var selectedRowsVal = new Array();
//记录跨页选取记录的行对象
var selectedRowsObj = new Array();
//记录跨页选取记录的所有值
var selectedRowsAllVal = new Array();
//记录列表页面的字段的名称
var listPageFieldNames = new Array();
//高级搜索弹出菜单是否可见
var isSearchVisible = false;
//统计弹出菜单是否可见
var isStatVisible = false;
//高级搜索首次点击时状态
var searchFirstTime = false;
//高级搜索首次点击时状态
var statFirstTime = false;
//是否做了设置高级搜索处理
var isSetSearchSchema = false;
//是否做了设置统计处理
var isSetStatSchema = false;

var msg;
var start = 1;
var control;

var _sDefSearchText= "输入要搜索的关键字";

//为兼容v51
var v51Products = ["GL","CU","GF","BG","RP","PR","FA","DB","PD","BD","NT","BM","HD","MOM","ZC","BF","TR"];

function gridRow_Click(rowIndex) {
  //确定是否是多选中的单选,wtm,20040924
  var selectedRowslength = selectedRowsVal.length ;
  for (var i=0,j=selectedRowsObj.length; i<j; i++){

     	if (!selectedRowsVal[i][0]){
          selectedRowslength = selectedRowslength - 1;      
        }
  }
  if ((head.rows[0].cells[1].style.display != "none")&& (selectedRowslength > 0)) return;
	var names = new Array();
	var values = new Array();
  var fields= getFoeignFields();
  if (fields== null){
    fields = entityMeta.getElementsByTagName("field");
  }
	for (var i = 0; i < fields.length; i++) {
		names[i]= fields.item(i).getAttribute("name");
		values[i] = gridBodyTable.rows[rowIndex]
            .cells[parseInt(fields.item(i).getAttribute("no")) + COLUMN_OFFSET].innerHTML;
		values[i] = values[i].replace(/&nbsp;/g," ");
		values[i]= trim(values[i]);
	}
	returnValue = new Array();
	returnValue[0] = names;
	returnValue[1] = values;
        isSelectRow = true;
	close();
}

function okF(){
  var rows = getSelectedMultiRows();
  var names = new Array();
  var values = new Array();
  var fields= getFoeignFields();
  if (fields== null){
    fields = entityMeta.getElementsByTagName("field");
  }

  for (var i = 0; i < fields.length; i++) {

    names[i]= fields.item(i).getAttribute("name");
  }
  var viRow= 0;
  for (var i=0,j=rows.length; i<j; i++){
   	if (rows[i]== null) continue;
    values[viRow] = new Array();
    for (var m=0,n=fields.length; m<n; m++){
      values[viRow][m] = rows[i][m];

      //values[i][m] = rows[i].cells[parseInt(fields.item(m).getAttribute("no")) + COLUMN_OFFSET].innerHTML;
			//values[i][m] = values[i][m].replace(/&nbsp;/g," ")
    }
    viRow++;
  }
  returnValue = new Array();
  returnValue[0] = names;
  returnValue[1] = values;
  isSelectRow = true;
  close();
}

function getFoeignFields(){
  var voForeignFieldMeta= document.getElementById("foreignfieldmeta");
  if (voForeignFieldMeta== null) return null;
  return voForeignFieldMeta.childNodes;
}

function fadd() {
  var condition = "1=0";
  var fieldValue = getEntityName() + "_E";

  if (getEntityName().toUpperCase() == "FA_CARD"){
    var win = showModalDialog("selectLb.htm","",
    "resizable:no;dialogHeight:240px;dialogWidth:300px;help:no");
    if (!win) return;
		fieldValue = win[0];
		fa = win;
  }
  Query_Click(getEntityName(),condition,fieldValue);
  
}

function Query_Click(entityname,condition,fieldvalue,type,name) {
  if (eval("typeof query_Click ==\"function\"")){
    eval("query_Click(\"" + entityname + "\",\""
      + condition + "\",\"" + fieldvalue + "\")");
  }else{

    var win_edit = open("blank.html","",
                        "menubar=no,scrollbars=no,status=no,toolbar=no,"
                        + "resizable=yes,titlebar=yes,scrollbars=yes,"
                        + "height=" + (screen.availHeight - 30) + ",width="
                        + (screen.availWidth - 10) + ",top=0,left=0");
    win_edit.location.href = "Proxy?function=geteditpage&condition=1=0" +
                             "&componame=" + entityname +
                             "&fieldvalue=" +fieldvalue + "&unique=";
    var names = new Array();
    var values = new Array();
    names[0] = "condition";
    values[0] = condition;
    names[1] = "fieldvalue";
    values[1] = fieldvalue;
    if (type){
      win_edit.style = fieldvalue;
      win_edit.type = type;
      win_edit.name = name;
    }
    names[2] = "unique";
    values[2] = uniqueID.getAttribute("value");
    win_edit.entityname = entityname;
    win_edit.names = names;
    win_edit.values = values;
    win_edit.focus();
  }
}

function addfunc(){
  var sCondition= "1=0";
  var iWidth= screen.availWidth;
  var iHeight= screen.availHeight;
  var sCompoName= compoName;
  var vsPageName= sCompoName+ "_E";
  /*
  var vsFunction= "geteditpage";
  var productCode= getProductCode(sCompoName);
  var vsURL= "/"+ productCode+ "/portlet.jsp?function="+ vsFunction+ "&"
                + encodeParams("condition", sCondition)
  	            + "&componame=" + sCompoName
	              + "&fieldvalue=" + vsPageName;
	    
  if(TOKEN!= "null"){
    vsURL+= "&token=" + TOKEN;
  }
*/
	var vsCond= "1=0";
  var productCode = getProductCode(compoName);
  if(isV51Product(productCode))
  	vsURL = "/" + productCode + "/Proxy?function=geteditpage&condition=" + vsCond
							+ "&componame=" + compoName + "&fieldvalue=" + vsPageName + "_E&unique=&token=" + TOKEN;	
  else
  	vsURL = "/" + productCode + "/getpage_" + compoName + ".action?function=geteditpage&condition="
												+ vsCond + "&componame=" + compoName + "&token=" + TOKEN;
												
  var voRect= PF.getCenterRect(iWidth, iHeight);
  if (voRect.iLeft< 0) voRect.iLeft= 0;
  if (voRect.iTop< 0) voRect.iTop= 0;

  var vsStyle= "resizable:yes;status:no;"
               + "dialogLeft:"+ voRect.iLeft+ "px;dialogTop:"+ voRect.iTop+ "px;"
               + "dialogWidth:"+ iWidth+ "px;dialogHeight:"+ iHeight+ "px";
  window.showModalDialog(vsURL, "", vsStyle);
  simpleSearch();
  
  return true;
}

function closeSelectPage(){
  if(isSelectRow == false)
    returnValue = false;
}

function setChanged(param){
  changed = param;
}

function getProductCode(compoId){
  var dotPos= compoId.indexOf("_");
  var productCode= compoId.substring(0, dotPos);
  if(productCode == "WF"){
  	var i = window.location.pathname.indexOf('/', 1);
  	if (-1 != i)
      productCode = window.location.pathname.substr(1, i);
    if ("/" == productCode.charAt(0))
      productCode = productCode.substr(1, productCode.length());
  }
  else if(productCode == "AS" || compoId == "MA_COMPANY"){
  	productCode = "admin";
  }
  return productCode;
}

function isV51Product(productCode){
  for(var i = 0; i < v51Products.length; i++){
  	if(productCode == v51Products[i])
  		return true;
  }
  
  return false;	
}

/*
//----------------------------------------------listpage
function openMenu(event, id){
  var el, x, y;
  var isExitSche;
  var maxLength;
  var menuWidth;
  var e=event.srcElement
  //if(isSetStatSchema){
   // alert("修改了方案！");
  //	updateScheMenu("stat");
  //	isSetStatSchema = false;
  //}
  if(isSetSearchSchema){
  // alert("修改了方案！");
  	updateScheMenu("search");
  	isSetSearchSchema = false;
  }

  isExitSche = document.getElementById(id+1).value;
  if(trim(isExitSche) =="" || isExitSche == null){
  	if(id == "searchMenu")
  		searchF();
  	//if(id == "statMenu")
  	//    statSearch();
  	return;
  }
  el = document.getElementById(id);
  if(id == "searchMenu")
    maxLength = document.getElementById("searchMaxLen").value;
  if(id == "statMenu")
    maxLength = document.getElementById("statMaxLen").value;
  if(maxLength < 4)
  	maxLength = 4;
  //maxLength = maxLength * 20 + 50;
  maxLength = maxLength * 16 + 45;
  if (window.event) {
    x = window.event.clientX + document.documentElement.scrollLeft
                             + document.body.scrollLeft;
    y =  e.offsetHeight + document.documentElement.scrollTop +
                             + document.body.scrollTop;
  }
  else {
    x = event.clientX + window.scrollX;
    y = e.offsetHeight + window.scrollY;
  }
  if(id == "searchMenu"){
     isSearchVisible = true;
     searchFirstTime = true;
  }
  //if(id == "statMenu"){
  //   isStatVisible = true;
  //   statFirstTime = true;
  //}
  menuWidth = document.body.clientWidth - x;
  if(event.clientY > 100)
  	y += 120;
  else y += 45;
  if((event.clientY - y) > 0)  //调整位置
  	  	y = event.clientY + 4;
  if(menuWidth < maxLength)
  	x +=-maxLength;
  x -= 2; y -= 2;
  el.style.width = maxLength + "px";
  el.style.left = x + "px";
  el.style.top  = y + "px";
  el.style.visibility = "visible";
}

function closeMenu(event) {
   var searchCurrent, statCurrent;
	searchCurrent = document.getElementById("searchMenu");
    statCurrent = document.getElementById("statMenu");
    if(searchFirstTime){
      if(statCurrent.style.visibility == "visible")
       	statCurrent.style.visibility = "hidden";
      searchFirstTime = false;
      return;
    }
    if(statFirstTime){
      if(searchCurrent.style.visibility == "visible")
        searchCurrent.style.visibility = "hidden";
      statFirstTime = false;
      return;
    }
    if(isSearchVisible && searchCurrent.style.visibility == "visible"){
      searchCurrent.style.visibility = "hidden";
    }
    if(isStatVisible && statCurrent.style.visibility == "visible"){
      statCurrent.style.visibility = "hidden";
    }
}

function getCompoName(){
	return document.getElementById("entityMeta").getAttribute("entityName");
}

function getWfType(){
	return document.getElementById("entityMeta").getAttribute("wftype");
}

//2004-08-04 zhangys 搜索框焦点事件，获得焦点清空内容 
function matchValue_Focus(){
	if(event.srcElement.value == _sDefSearchText){
		event.srcElement.value = '';
	}
}

function matchValue_KeyPress(){
	 if (event.keyCode == 13){
		 simpleSearch();
	 }
}

//2005/09/23 fuwb 高级搜索，统计框焦点事件，失去焦点清空内容 
function matchValue_Blur(){
	if(event.srcElement.value == ''){
		event.srcElement.value = _sDefSearchText;
	}
}

//双击页面上得搜索框，清空内容。wtm，20040913

function matchValue_DblClick(){
	 event.srcElement.value = '';
}

function menuChange(event){
  var e = event.toElement;
  e.style.borderBottom = "#888380 solid 1px";
  e.style.borderRight = "#827E74 none 1px";
  e.style.borderLeft = "#888380 none 1px";
  e.style.borderTop = "#827E74 solid 1px";
  e.background = "red";//"#D7E1F3";
}

function menuBlur(id){
  var e = document.getElementById(id);
	e.style.border="0px";
	e.background = "/style/img/main/buttonmid.gif";
}

function clearSelectedRows(){
  delNumber = 0;
  selectedRowsVal = new Array();
  selectedRowsObj = new Array();
  selectedRowsAllVal = new Array();
}

function simpleSearch(){
  //alert("simpleSearch();");
  clearSelectedRows();
	var condition = "";
	var doc = document.getElementById("entityMeta");
	var tableName = doc.getAttribute("tableName");
	
  //leidh;20051230;
	if (pageTypeID!= null && pageTypeID.value== "selectPage"){
	  disposeSearchCond();
	}
	//即使是全部返回,也要加上相应的页面条件;leidh;20040420;
	var vjPageCondObj= document.getElementById("pageCondition");
	if (vjPageCondObj!= null) condition= vjPageCondObj.getAttribute("value");

	if(document.getElementById("matchValue") != null){
  	//leidh;20060716;
	  var fieldCondition= "";
  	var matchValue = trim(document.getElementById("matchValue").getAttribute("value"));
    if ((window._sSelectSql!=null && window._sSelectSql!= "")){
      for (var x= 0; x< doc.childNodes.length; x++){
        if (fieldCondition!= ""){
          fieldCondition+= " or ";
        }
        fieldCondition+= doc.childNodes[x].getAttribute("name")+ " like '%"+ matchValue+ "%'";
      }
    }else{
			var fields = doc.getElementsByTagName("field");
			if(matchValue != null && matchValue != "" && matchValue != _sDefSearchText){
        var condnames = new Array();
        var condvalues = new Array();
        condnames[0] = "compoName";
        condvalues[0] = getCompoName();
        condnames[1] = "mValue";
        condvalues[1] = matchValue;
        var voData = requestData("getSimpleSearchCondition", "all", condnames, condvalues);
        if(voData && voData.text){
          fieldCondition = "( " + voData.text + ")";
        }
			}
		}
		if (fieldCondition!= null && trim(fieldCondition)!= ""){
    	if(condition.length > 1)
  	  	condition += " and " + fieldCondition;
  		else
  			condition = fieldCondition;
		}
	}

	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(condition.length > 1){
			if((listCondition != null) && (listCondition != "")){
				condition += " and (" + listCondition + ")";
			}
		}else{
			condition = listCondition;
		}
	}

	
	var names = new Array();
	var values = new Array();
	names[0] = "condition";
	values[0] = condition;

	var com = getCommunity();
	if (com != null){
		names[1] = "pageType";
		values[1] = document.getElementById("pageTypeID").value;
		names[2] = "pageUniqueID";
		values[2] = uniqueID.getAttribute("value");
		if(document.getElementById("searchStartDate") != null){
			var startTime = document.getElementById("searchStartDate").getAttribute("value");
			var endTime = document.getElementById("searchendDate").getAttribute("value");
			names[3] = "startTime";
			values[3] = startTime;
			names[4] = "endTime";
			values[4] = endTime;
		}
		names[5] = "sql";
		values[5] = window._sSelectSql==null?"":window._sSelectSql;
		com.doRequest("getSearchResult", getEntityName(), names, values, "search_refreshData");

	}
}

function searchF(){
  closeMenu(event);
  clearSelectedRows();
	var entityName = getEntityName();
	var window_search;
	var foreign=null;

	var ignoreFields = "";
	var tablename = document.getElementById("entityMeta").getAttribute("tableName");
	if (document.getElementById(tablename + "ColTable")== null) return;
	var cols = document.getElementById(tablename + "ColTable").rows[0];
	for (var i = 2, l=cols.cells.length - 1;i<l; i++){
		var vjHeadFieldTD = document.getElementById(tablename + "_" + cols.cells[i].field + "Cell");
		if (vjHeadFieldTD.V_Hidden == true){
			ignoreFields = ignoreFields + cols.cells[i].field + ",";
		}
	}

	if(window.dialogArguments){
		foreign=dialogArguments;
	}
	var vasSearch = showModalDialog("Proxy?function=getSearchPage" +
																	"&componame=" + entityName +
																	"&ignoreFields=" + ignoreFields +
																	"&pageType=listPage",foreign,
																	"resizable:no;status:no;help:no;dialogWidth:900px;dialogHeight:600px");

	var window_search= "";
	var vsOrderBy= "";
	if (vasSearch== null) vasSearch= new Array("", "","","");
	if (vasSearch.length>= 1) window_search= vasSearch[0];
	if (vasSearch.length>= 2) vsOrderBy= vasSearch[1];
	isSetSearchSchema = vasSearch[2];
	var isExitSche = false;
    if(vasSearch[3] > 1)
    	isExitSche = true;
    updateImg("search",isExitSche)
		if(window_search == "ALL"){
			highSearchAll();
			return;
		}
		//leidh;20051230;
  	if (pageTypeID!= null && pageTypeID.value== "selectPage"){
	    disposeSearchCond();
	  }
		var pageCond = "";
		var condId = document.getElementById("pageCondition");
		if(condId != null){
			pageCond = condId.getAttribute("value");
		}
		var names = new Array();
		var values = new Array();
		names[0] = "condition";
		if(condId != null && pageCond != "" && window_search != ""){
			values[0] = window_search + " and (" + pageCond + ")";
		}else if(condId != null && pageCond != ""){
			values[0] = pageCond;
		}else{
			values[0] = window_search;
		}

	if("function" == typeof getListCondition){
		var listCondition = getListCondition();
		if(values[0].length > 1){
			if((listCondition != null) && (listCondition != "")){
				values[0] += " and (" + listCondition + ")";
			}
		}else{
			values[0] = listCondition;
		}
	}

		names[1] = "OrderBy";
		values[1] = vsOrderBy;
		var com = getCommunity();
		if (com != null){
			names[2] = "pageType";
			values[2] = document.getElementById("pageTypeID").value;
			names[3] = "pageUniqueID";
			values[3] = uniqueID.getAttribute("value");
			names[4] = "sql";
			values[4] = window._sSelectSql==null?"":window._sSelectSql;
			com.doRequest("getSearchResult", getEntityName(), names, values, "search_refreshData");

	}
}

function search_refreshData(tableData,vtotalPage) {
	if (tableData.getAttribute("success") == "false")
		alert(tableData.innerHTML);
	else {
		deleteTableRows();
  		var totalPage = 1;
		var headNode = tableData.firstChild;
		var dataNode = headNode.firstChild;
		var pNode = dataNode.firstChild;


		var pagesBool = true, countsBool = true;
		while (pagesBool || countsBool){
			var pName = pNode.getAttribute("name");
			if((pName == "PAGES") || (pName == "TOTALCOUNTS")){
				if(pName == "PAGES"){
					totalPage = pNode.getAttribute("value");
					pageBool = false;
					var tmpNode = pNode.nextSibling;
					if(tmpNode == null)
						break;
					else
						pNode = tmpNode;
				}
				if(pName == "TOTALCOUNTS"){
					totalCounts = pNode.getAttribute("value");
					countsBool = false;
					var tmpNode = pNode.nextSibling;
					if(tmpNode == null)
						break;
					else
						pNode = tmpNode;
				}
			}
			else{
				var tmpNode = pNode.nextSibling;
				if(tmpNode == null)
					break;
				else
					pNode = tmpNode;
			}
		}

		headNode.removeChild(headNode.firstChild);
		addTableRows(headNode);
		var currentPage = 0;
		if (isNaN(totalPage)) totalPage = 0;
		if (totalPage != 0) currentPage = 1;
		setCurrentTotalPage(currentPage, totalPage);
		setTotalCounts(totalCounts);
		if(typeof after_Simple_Search == "function"){
			after_Simple_Search();
		}
	}
}
*/
//--------------------------------------翻页
function firstpage(){
  currPage = 1;
  pagination("first");
}

function priorpage(){
	if (currPage > 1){
		currPage = parseInt(currentPageID.innerHTML) - 1;
		//pagination("priorpage");
		jumpToPageID.value= currPage;
		pagination("to");
	}
}


function nextpage(){
  if (nextpageID.disabled) return;
  currPage = parseInt(currentPageID.innerHTML) + 1;
	jumpToPageID.value= currPage;
	pagination("to");
}

function lastpage(){
  currPage = parseInt(totalPageID.innerHTML);
  pagination("last");
}


// 按钮GO的onclick事件，wtm，20040707
function go(){

   totalCounts = parseInt(totalCountsID.innerHTML);
   total = parseInt(totalPageID.innerHTML);
   currPage=jumpToPageID.value;
   var index = currPage.indexOf(".");
   if(index > -1){
     alert("请重新输入正确的页码！");
     jumpToPageID.value="";
     return;
   }
   if ((currPage>total)&&(total!=0)&&(totalCounts!= 0)){
   	jumpToPageID.value=total;
   	currPage=total;
   }else if((currPage<1)&&(total>0)&&(totalCounts!= 0)){
   	jumpToPageID.value=1;
   	currPage=1;
   }else if ((currPage>=1)&&(currPage<=total)&&(totalCounts!= 0)){
        currPage=parseInt(jumpToPageID.value);
   }else if((total==0)&&(currPage==0)){
   	    jumpToPageID.value="";
        alert("请重新输入正确的页码！");
        return;
   }else{
        alert("请重新输入正确的页码！");
        jumpToPageID.value="";
        return;

   }

   pagination("to");

}

function pagination(direction)	{
	firstpageID.disabled = true;
	priorpageID.disabled = true;
	nextpageID.disabled = true;
	lastpageID.disabled = true;
  	var names = new Array();
  	var values = new Array();
  	var matchValue = document.getElementById("matchValue").value;
  	if(!matchValue || matchValue == "输入要搜索的关键字"){
  		matchValue = "";
  	}
  
  	names[names.length] = "totalcount";
  	values[values.length] = entityMeta.getAttribute("totalcount");  
  	names[names.length] = "sqlid";
  	values[values.length] = entityMeta.getAttribute("sqlid"); 
  	names[names.length] = "condition";
  	values[values.length] = entityMeta.getAttribute("condition"); 
  	names[names.length] = "currentpage";
  	values[values.length] = currPage;
  	names[names.length] = "direction";
  	values[values.length] = direction;
  	names[names.length] = "masterCompoName";
  	values[values.length] = entityMeta.getAttribute("masterCompoName");  
  	names[names.length] = "masterTableName";
  	values[values.length] = entityMeta.getAttribute("masterTableName"); 
  	names[names.length] = "masterSelectField";
  	values[values.length] = entityMeta.getAttribute("masterSelectField"); 
  	names[names.length] = "realFieldName";
  	values[values.length] = entityMeta.getAttribute("realFieldName");
  	
  	var spanUser = document.getElementById("svUserID");
  	if(spanUser){
	  	names[names.length] = "userid";
	  	values[values.length] = spanUser.getAttribute("value");  	
  	}
  	if(searchType != "advancedSearch"){  
	  	if(matchValue != ""){
		  	names[names.length] = "searchCond";
		  	values[values.length] = "matchCond=%" + matchValue + "%";
	  	}
	  	names[names.length] = "type";
		values[values.length] = "simpleSearch";
  	}else{
  		if(!PF.isEmpty(searchCondition)){
			if(!PF.isEmpty(vsOrderBy)){
				names[names.length] = "searchCond";
				values[values.length] = searchCondition + "Order by" + vsOrderBy;
				names[names.length] = "type";
				values[values.length] = searchType;
			}else{
				names[names.length] = "searchCond";
				values[values.length] = searchCondition;
				names[names.length] = "type";
				values[values.length] = searchType;
			}
		}
  	}
      
  	var componame = getEntityName();
  	var tableData = Info.requestData("getselectpagedata", componame, names, values);
  
    head.rows[0].cells[1].firstChild.checked = false;
    deleteTableRows();
    addTableRows(tableData);
  	currentPageID.innerHTML = currPage;
  
  	initialTotalPage();     
}

function getEntityName() {
  return entityMeta.getAttribute("entityName");
}

function getTableName() {
  var tname = entityMeta.getAttribute("tableName");
  if(tname == null || tname == "null")
  	tname = getEntityName();
  return tname;
}

function setCurrentTotalPage(currentPage, totalPage) {
	currentPageID.innerHTML = currentPage;
  if (totalPage){
    totalPageID.innerHTML = totalPage;
  }
  initialTotalPage();
}

function initialTotalPage(){
  var currentPage = parseInt(currentPageID.innerHTML);
  var totalPage = parseInt(totalPageID.innerHTML);
  if (totalPage == 0 || totalPage == 1) {
    firstpageID.disabled = true;
    priorpageID.disabled = true;
    nextpageID.disabled = true;
    lastpageID.disabled = true;
  } else if(totalPage > 1) {
    if(currentPage == 1) {
      firstpageID.disabled = true;
      priorpageID.disabled = true;
      nextpageID.disabled = false;
      lastpageID.disabled = false;
    } else if(currentPage > 1 && currentPage < totalPage) {
      firstpageID.disabled = false;
      priorpageID.disabled = false;
      nextpageID.disabled = false;
      lastpageID.disabled = false;
    } else if(currentPage == totalPage) {
      firstpageID.disabled = false;
      priorpageID.disabled = false;
      nextpageID.disabled = true;
      lastpageID.disabled = true;
    }
  }
}

function closePage() {
  for(var i = 0; i < subWindowName.length; i++){
    subWindowName[i].close();
  }
}

function call_mouseOver() {
  event.srcElement.style.color="#FBDD64";
}

function call_mouseOut() {
  event.srcElement.style.color = "white";
}

function setTotalCounts(totalCounts){
	totalCountsID.innerHTML = totalCounts;
}

	/**
   * 输入跳转页码，按回车，自动执行GO.
   * WTM,20040820
   */
function jumpToPage_KeyPress(){
   if (event.keyCode == 13){
     go();
   }
}  
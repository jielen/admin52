//$Id: Pagination.js,v 1.10 2008/08/28 06:31:57 liuxiaoyong Exp $
/**处理外部实体的页面控制 */
var currPage = 1;
var oPopup = window.createPopup();
function setRowSelected(){

	var primaryFields = listPage_getPrimaryFields();
  var primaryFieldsNo = primaryFields[0];
	var primaryFieldsName = primaryFields[1];
	var primaryFieldsType = primaryFields[2];
	for(var i=0; i<gridBodyTable.rows.length; i++){
		for(var m=0; m<selectedRowsVal.length; m++){
      var equal = true;
			for(var j=0;j<primaryFieldsNo.length; j++){
        if(primaryFieldsType[j].toLowerCase() == "valueset"){
       		var vVal = doubleApos(gridBodyTable.rows[i].cells[primaryFieldsNo[j]+COLUMN_OFFSET].innerHTML);
          if (!(vVal.indexOf("SPAN")<0)){
            vVal = doubleApos(gridBodyTable.rows[i].cells[primaryFieldsNo[j]+COLUMN_OFFSET].firstChild.value);
          }
         	if(vVal != selectedRowsVal[m][j]){
						equal = false;
						break;
					}
				}else{
					var vVal = gridBodyTable.rows[i].cells[primaryFieldsNo[j]+COLUMN_OFFSET].innerHTML;
          if(vVal != selectedRowsVal[m][j]){
				 		equal = false;
						break;
					}
        }
			}
      if(!equal)
				continue;
      else{
				gridBodyTable.rows[i].cells[1].firstChild.checked = true;
				find = true;
				break;
    	}
    }
	}
  var same = true;
  //wtm,20040719,删除列表页面倒数第2页的一条记录（注：倒数第1页只有1条记录）后——点下一页察看最后的记录，报错
  if (!gridBodyTable.rows[0]){
   jumpToPageID.value=parseInt(totalCountsID.innerHTML);
   go();
   return ;
  }
  var firstRow = gridBodyTable.rows[0].cells[1].firstChild.checked
  for(var i=1,j=gridBodyTable.rows.length; i<j; i++ ){
    same = (gridBodyTable.rows[i].cells[1].firstChild.checked == firstRow);
    if (!same) break;
  }
  if (same){
    head.rows[0].cells[1].firstChild.checked = firstRow;
  }else{
    head.rows[0].cells[1].firstChild.checked = false;
  }
}
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

/** modified by hmgkevin 08-04-17
  * 增加外部实体高级搜索时翻页功能，搜索条件和类型来自ListPage.js
  */
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
  	names[names.length] = "isFromSql";
  	values[values.length] = entityMeta.getAttribute("isFromSql"); 
    names[names.length] = "realFieldName";
  	values[values.length] = entityMeta.getAttribute("realFieldName");
  	
  	var spanUser = document.getElementById("svUserID");
  	if(spanUser){
	  	names[names.length] = "userid";
	  	values[values.length] = spanUser.getAttribute("value");  	
  	}
  	//alert(searchType);
  	
  	if(!PF.isEmpty(searchType) && searchType == "advancedSearch"){  
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
  	}else{
  		if(matchValue != ""){
		  	names[names.length] = "searchCond";
		  	values[values.length] = "matchCond=%" + matchValue + "%";
	  	}
	  	names[names.length] = "type";
		values[values.length] = "simpleSearch";
  	}
  	var componame = getEntityName();
  	var tableData = Info.requestData("getselectpagedata", componame, names, values);
  	refreshSelectData(tableData);
  	//增加搜索后方法处理
  	if(typeof(afterPagination) == "function"){
  		afterPagination();
  	}   
}

//用delta格式数据刷新页面 2008.02.19
function refreshSelectData(tableData){
	
  	head.rows[0].cells[1].firstChild.checked = false;
  	deleteTableRows();
  	var iTotalCount = 0;
 	var iTotalPage = 0;
  	var iCurrentPage = 0;
  	
  	if(tableData){
	  	addTableRows(tableData);
	  	iTotalCount = tableData.getAttribute("totalCount");
	  	iTotalPage = tableData.getAttribute("totalPage");
	  	iCurrentPage = tableData.getAttribute("currentPage");
  	}
	else{
		alert("没有符合条件的数据！");
	}
	
  	entityMeta.setAttribute("totalcount", iTotalCount);
  	setCurrentTotalPage(iCurrentPage, iTotalPage);
	setTotalCounts(iTotalCount);
	jumpToPageID.value = iCurrentPage;  
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

function getFields(){
  	var result = new Array();
	var fieldsNo = new Array();
	var fieldsName = new Array();
	var fieldsType = new Array();
	var fieldsPK = new Array();
  	var meta = document.getElementById("entityMeta");
  	var fields = meta.getElementsByTagName("field");
  	for (var i = 0, j = fields.length; i < j; i++) {
		fieldNo = fields.item(i).getAttribute("no");
    	fieldName = fields.item(i).getAttribute("name");
		fieldType = fields.item(i).getAttribute("type");
		fieldPK = fields.item(i).getAttribute("pk");
		arrayLength = fieldsNo.length;
		fieldsNo[arrayLength] = fieldNo;
		fieldsName[arrayLength] = fieldName;
		fieldsType[arrayLength] = fieldType;
		fieldsPK[arrayLength] = fieldPK;
  	}
	result[0] = fieldsNo;
	result[1] = fieldsName;
	result[2] = fieldsType;
	result[3] = fieldsPK;
  	return result;
}

function setCurrentTotalPage(currentPage, totalPage) {
	currentPageID.innerHTML = currentPage;
  //if (totalPage){
  totalPageID.innerHTML = totalPage;
  //}
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
function call_editPageMouseOver() {
  event.srcElement.style.color="red";
  var elementId=event.srcElement.id;
  elementId=elementId.substring(0,elementId.length-2);
  document.all(elementId + "_leftImg").src="/style/img/func/left_select.gif";
//  alert(document.all(elementId + "_midBk").background);
  document.all(elementId + "_midBk").background="/style/img/func/mid_select.jpg";
  document.all(elementId + "_rightImg").src="/style/img/func/right_select.gif";
//  alert(elementId);
}

function call_editPageMouseOut() {
  event.srcElement.style.color = "black";
  var elementId=event.srcElement.id;
  elementId=elementId.substring(0,elementId.length-2);
  document.all(elementId + "_leftImg").src="/style/img/func/left_behind.gif";
  document.all(elementId + "_midBk").background="/style/img/func/mid_behind.jpg";
  document.all(elementId + "_rightImg").src="/style/img/func/right_behind.gif";
}

function ShowMenu() {
	 var vSrc = document.all("menuleft");
	 var w = vSrc.offsetWidth;
  var oPopBody = oPopup.document.body;
  oPopBody.style.background = "transparent";
  var content=document.all("menuDiv").innerHTML;
  oPopup.document.createStyleSheet(BASE_URL + "/script/applus.css");
  oPopBody.innerHTML = content;

  var vSrc1 = event.srcElement;
  var l1 = event.offsetX;
  var t1 = event.offsetY;
  var vParent1 = vSrc1;

  while (vParent1.tagName.toUpperCase() != "TABLE")	{
		l1 += vParent1.offsetLeft;
		t1 += vParent1.offsetTop;
		vParent1 = vParent1.offsetParent;
	}
  oPopup.show(event.screenX- top.screenLeft- l1,event.screenY-top.screenTop-t1,w,menuTb.offsetHeight,oPopup.document.body);
}

function hiddenmenu(){
  oPopup.hide();
}
function call_menuMouseOver(){
  event.srcElement.style.color="red";
  var vSrc = window.event.srcElement;
  var menuItemId=vSrc.id;
  menuItemId=menuItemId.substring(0,menuItemId.length-2);
  document.all(menuItemId + "_menuTd").bgColor="#E5FAAB";
}
function call_menuMouseOut(){
  event.srcElement.style.color = "black";
  var vSrc = window.event.srcElement;
  var menuItemId=vSrc.id;
  menuItemId=menuItemId.substring(0,menuItemId.length-2);

  document.all(menuItemId + "_menuTd").bgColor="#D6E2F2";
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

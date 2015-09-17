/* $Id: grid.js,v 1.225 2007/04/28 07:19:48 xiexx Exp $ */
//拖动表格宽度变量
var sign=false;
var begin_x = 0;//mousedown时，x坐标位置
var td = null;
var fieldname = null;
var originColor = null;
var initialized = false;
var imgPath = "/style/img/main/";
var tname = null;
var row_color1 = "#E1E1E1";
var row_color2 = "#F8F8F8";
var selectedRow = null;//鼠标单击子表的行
var selectedCell = null; //鼠标单击子表的单元格
var sortedColumn = -1; // 排序的列序号
var sortedDirection = 1 ;//排序方向
var _Grid_IsInitEnterFirstRow= true;  //初始化时,自动进入第一行;
var isFieldChange=false;			//判断表格中的字段是否修改
var gridexp = "";       //记录A3多表头格式
var expHead= "";        //多层表头导出表头接口

function mousedown() {
  if(!sign){
    fieldname = event.srcElement.getAttribute("fieldname");
    var tableChanged = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    tname = tableChanged.parentNode.getAttribute("tablename");
    var grid = document.getElementById(tname + "Container");
    window.event.cancelBubble = true;
    begin_x =  window.event.clientX;
    td = event.srcElement.parentNode.parentNode.parentNode.parentNode;
    slide.style.left= window.event.clientX;
    slide.style.height = grid.clientHeight;
    slide.style.top = grid.offsetTop + 2;
    slide.style.display = "";
    sign=true;
  }
}

function mousemove() {
  if(sign){
    //slide.style.left= window.event.clientX;
  }
}

function mouseup() {
  if(sign){
    var minWidth = 24;
    if (isBlobField(fieldname,tname)){
      minWidth = 84;
    }
    var x1 = window.event.clientX - begin_x;
    if (td.clientWidth + x1 <= minWidth){
      x1 = 0;
      return;
    }

    var head = document.getElementById(tname + "HeadTable");
    var vjBodyTable = document.getElementById(tname + "BodyTable");
    if (x1 > 0){
      head.style.width = head.clientWidth + x1;
    }else{
      td.firstChild.style.width = td.firstChild.clientWidth + x1;
    }
    var cells = new Array();
    cells[0] = td;
    var parent = td.getAttribute("parent");
    while (parent != "null"){
      var parentCell = document.getElementById(tname + "_" + parent + "Cell");
      cells[cells.length] = parentCell;
      parent = parentCell.getAttribute("parent");
    }
    for (var i=0; i<cells.length; i++){
      if (cells[i].clientWidth + x1 > minWidth){
        cells[i].style.width = cells[i].clientWidth + x1;
      }
    }
    if (x1 < 0){
      head.style.width = head.clientWidth + x1;
    }else{
      td.firstChild.style.width = td.firstChild.clientWidth + x1;
    }
    if (document.getElementById(tname + "EditTable") != null){
      var edit = document.getElementById(tname + "_" + fieldname + "ID");
      if (document.getElementById(tname + "_" + fieldname + "ForeignIMGID") != null){
        edit.style.width = td.clientWidth - 22;
      }else if (isBlobField(fieldname,tname)){
        edit.style.width = td.clientWidth - 84;
      }else{
        edit.style.width = td.clientWidth;
      }
    }
    var temp = parseInt(document.getElementById(tname + "_" + fieldname + "Cell").clientWidth);
    var meta = document.getElementById("meta");
    var pageName = meta.pageName;
    if(isException == false){
      setFieldWidth(pageName,tname,fieldname,temp);
    }
    begin_x = 0;
    //slide.style.display = "none";
    colResize(tname);
    document.selection.clear();
    sign=false;

    vjBodyTable.style.width= head.offsetWidth;//宽度一致;leidh;20040412;
  }
}

//移动滚动条
function body_Scroll()
{
  //alert("body_Scroll();");
  var tablename = event.srcElement.getAttribute("tablename");
  var head = document.getElementById(tablename + "HeadTable");
  var gridBody = document.getElementById(tablename + "Body");
  head.style.left = -gridBody.scrollLeft;
}

function color_bh(){//改变表格颜色
  var tr = event.srcElement.parentNode;
  originColor = tr.style.backgroundColor;
  tr.style.backgroundColor = "highlight";
  tr.style.color = "highlighttext";
}

function color_re(){//恢复颜色
  var tr = event.srcElement.parentNode;
  tr.style.backgroundColor = originColor;
  tr.style.color = "black";
}

function fillTableColor(tablename){
  var grid = document.getElementById(tablename + "BodyTable");
	if(grid == null){ return; }
  var qian = false;
  for (var i=0,j=grid.rows.length; i<j; i++){
    if (grid.rows[i].style.display == "none") continue;
    if (qian){
      setRowBackGround_W(grid.rows[i]);
      qian = false;
    }else{
      setRowBackGround_B(grid.rows[i]);
      qian = true;
    }
  }
}

function setRowBackGround_W(row){
  row.style.backgroundColor = row_color1;
}

function setRowBackGround_B(row){
  row.style.backgroundColor = row_color2;
}

function colResize2(tablename){
  if(tablename == null){return;}
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var head = document.getElementById(tablename + "HeadTable");
  if (head.style.display == "none") return;
  var editTable = document.getElementById(tablename + "EditTable");
  var grid = document.getElementById(tablename + "Container");
  var gridBody = document.getElementById(tablename + "Body");
  gridBody.style.width = grid.clientWidth;
  //gridBody.style.width = "100%";//自动适应窗口的宽度；Leidh;20040331;
  gridBodyTable.style.width = head.clientWidth;

  var viColXOffset= getColIndexOffset(tablename);  //获取列序号的编移；leidh; 20040511;

  if (gridBodyTable.rows.length > 0){
    gridBodyTable.rows[0].cells[0+ viColXOffset].style.width = 30;
    for(var i=1+ viColXOffset,j=editTable.rows[0].cells.length; i<j; i++){
      var fieldName = editTable.rows[0].cells[i].getAttribute("fieldname");
      if(document.getElementById(tablename + "_" + fieldName + "Cell").style.display != "none"){
        gridBodyTable.rows[0].cells[i].style.width
            = document.getElementById(tablename + "_" + fieldName + "Cell").offsetWidth;
       }
    }
    gridBody.style.top = head.clientHeight;
    gridBody.style.height = grid.clientHeight-head.clientHeight;
  }
  head.style.left = -gridBody.scrollLeft;
}


function colResize(tablename)
{
  if(tablename == null){return;}

  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var head = document.getElementById(tablename + "HeadTable");

  if(head == null){return;}
  if (head.style.display == "none") return;

  var editTable = document.getElementById(tablename + "EditTable");
  var grid = document.getElementById(tablename + "Container");
  var gridBody = document.getElementById(tablename + "Body");

  gridBody.style.width = grid.clientWidth;
  //gridBody.style.width = "100%";//自动适应窗口的宽度；Leidh;20040331;
  gridBodyTable.style.width = head.clientWidth;

  var headLen = 0;

  if (gridBodyTable.rows.length > 0)
  {
    var head0 = head.rows[0].cells[0];
    gridBodyTable.rows[0].cells[0].style.width = head0.offsetWidth;
    headLen += head0.offsetWidth;
    var s = "";

    for(var i=1,j=editTable.rows[0].cells.length; i<j; i++)
    {
      var fieldName = editTable.rows[0].cells[i].getAttribute("fieldname");
      if(document.getElementById(tablename + "_" + fieldName + "Cell").style.display != "none")
      {
        gridBodyTable.rows[0].cells[i].style.width
                = document.getElementById(tablename + "_" + fieldName + "Cell").offsetWidth;
        s += i + "  " + fieldName + "  " + document.getElementById(tablename + "_" + fieldName + "Cell").offsetWidth + "\n";
        headLen += document.getElementById(tablename + "_" + fieldName + "Cell").offsetWidth;
      }
    }

//    showMessage(s);
    gridBody.style.top = head.clientHeight;
    gridBody.style.height = grid.clientHeight-head.clientHeight;
  }

  head.style.left = -gridBody.scrollLeft;
}


function initColResize(tablename)
{
  if(tablename == null){ return; }
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var head = document.getElementById(tablename + "HeadTable");
  if (head.style.display == "none"){ return; }
  var pageName = document.getElementById("meta").pageName;
  if (!isFileExists("c:\\cookies\\" + pageName + tablename + ".txt")){ return; }
  var editTable = document.getElementById(tablename + "EditTable");
  var grid = document.getElementById(tablename + "Container");
  var gridBody = document.getElementById(tablename + "Body");
  gridBody.style.width = grid.clientWidth;
  //gridBody.style.width = "100%";//自动适应窗口的宽度；Leidh;20040331;
  gridBodyTable.style.width = head.clientWidth;
  var headLen = 0;
  if (gridBodyTable.rows.length > 0){
    var head0 = head.rows[0].cells[0];
    gridBodyTable.rows[0].cells[0].style.width = head0.offsetWidth;
    headLen += head0.offsetWidth;
  }
  for(var i=1,j=editTable.rows[0].cells.length; i<j; i++){
    var fieldName = editTable.rows[0].cells[i].getAttribute("fieldname");
    var cell = document.getElementById(tablename + "_" + fieldName + "Cell");
    if(cell.style.display != "none"){
      var width1 = 0;
      if(isException == false){
        width1 = getFieldWidth(pageName,tablename,fieldName)//从文件中取得上次保存的宽度
      }
      if ((width1) && (!sign)){
        cell.style.width = width1;
        cell.firstChild.style.width = width1;
      }
		  if (gridBodyTable.rows.length > 0){
        gridBodyTable.rows[0].cells[i].style.width = cell.offsetWidth;
      }
      headLen += cell.offsetWidth;
    }
    gridBody.style.top = head.clientHeight;
    gridBody.style.height = grid.clientHeight-head.clientHeight;
  }
  head.style.left = -gridBody.scrollLeft;
  if(headLen){ head.width = headLen; }
}

function initGrid(tablename){
  //判断本表格是否已经初始化;leidh;20040614;
  var vjHeadTable= document.getElementById(tablename + "HeadTable");
  var vsInitTag= tablename+ "_"+ "IsInitialized";
  if (vjHeadTable== null) return false;
  if (vjHeadTable.getAttribute(vsInitTag)== "true") return false;

  if (_Grid_IsInitEnterFirstRow)
  {
    //window resize 时,出现表格被锁定的现象;leidh;20040601;
    uneditGrid(tablename); //leidh;20040607;

    var headTable = document.getElementById(tablename + "HeadTable");
    var vjCurTD= null;
    var vsCurField= "";
    if (headTable.getAttribute("editing") == "y")
    {
      var vsEditingField= headTable.getAttribute("editingfield")
      vsCurField= vsEditingField;
      var vjCurHeadCell= document.getElementById(tablename + "_" + vsEditingField + "Cell");
      if (vjCurHeadCell!= null)
      {
        var viColNo= parseInt(vjCurHeadCell.colno);
        if (viColNo>= 0)
        {
          vjCurRow= getCurrentRow(tablename);
          if (vjCurRow!= null)
          {
            vjCurTD= vjCurRow.cells[viColNo];
          }
        }
      }
    }
  }
  else uneditGrid(tablename);

  initColResize(tablename);
  colResize(tablename);
  fillTableColor(tablename);
  initialized = true;

  if (_Grid_IsInitEnterFirstRow)
  {
    //默认将焦点进入第一行；如果有curTD,则重回curTD;leidh;20040531;
    var gridBodyTable = document.getElementById(tablename + "BodyTable");
    var editTable = document.getElementById(tablename + "EditTable");
    var tmeta = document.getElementById(tablename + "Meta");
    if (gridBodyTable.rows.length> 0)
    {
      if (vjCurTD== null)
      {
        vjCurTD= gridBodyTable.rows[0].cells[1+ getColIndexOffset(tablename)];
        vsCurField = editTable.rows[0].cells[1+ getColIndexOffset(tablename)].getAttribute("fieldname");
      }
      if (tmeta.hasChildNodes()) enterGridCell(vjCurTD); //有子项才做，暂如此；leidh;20040602;
    }

    uneditGrid(tablename); //leidh;20040607;
  }

  //对本表格加入已经初始化的标志;leidh;20040614;
  vjHeadTable.setAttribute(vsInitTag, "true");
}

function selectAll(tablename,isall) {
  var isSelected;
  if((tablename == null) || (tablename.length == 0))
    tablename = "";

  //var isSelected = event.srcElement.checked;
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var head = document.getElementById(tablename + "HeadTable");

  //确定检查框列的序号；leigh; 20040430;
  var viCheckCol= 0;
  if (head.rows[0].cells[0].firstChild== null
      || head.rows[0].cells[0].firstChild.nodeName.toUpperCase()!= "INPUT") viCheckCol= 1;
  if (isall){
    isSelected = true;
    document.getElementById("selectAllID").checked = true;
  }else{
    if (!event) return;
    isSelected = event.srcElement.checked;
  }
  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    if(gridBodyTable.rows[i].style.display == "none") continue;
    gridBodyTable.rows[i].cells[viCheckCol].firstChild.checked = isSelected;
  }
  if(eval("typeof after_" + tablename + "_selectAll == \"function\"")){
    eval("after_" + tablename + "_selectAll()");
  }
}

function selectPart(){
  if (rowNum){  //若取数页面有选定页面，恢复原背景色。wtm，20041126
    rowNum.style.color = "";
    rowNum.style.backgroundColor = initColor;
  }
  event.cancelBubble = true;

  var tablename = event.srcElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("tablename");
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var head = document.getElementById(tablename + "HeadTable");
  var curSelected = event.srcElement.checked;
  var same = true;

	//新增一行，再删除上面一行，编辑框上下乱跳 zhangys 2004-08-18
	uneditGrid(tablename);

	//设置当前行号； 20040714
  head.setAttribute("row",event.srcElement.parentNode.parentNode.rowIndex);

  //确定检查框列的序号；leigh; 20040430;
  var viCheckCol= 0;
  if (head.rows[0].cells[0].firstChild== null
      || head.rows[0].cells[0].firstChild.nodeName.toUpperCase()!= "INPUT") viCheckCol= 1;

  for(var i=0,j=gridBodyTable.rows.length; i<j; i++ ){
    if(gridBodyTable.rows[i].style.display == "none") continue;
    same = gridBodyTable.rows[i].cells[viCheckCol].firstChild.checked == curSelected;
    if (!same) break;
  }
  if (same){
    head.rows[0].cells[viCheckCol].firstChild.checked = curSelected;
  }else{
    head.rows[0].cells[viCheckCol].firstChild.checked = false;
  }
  if(eval("typeof after_" + tablename + "_selectPart == \"function\"")){
    eval("after_" + tablename + "_selectPart()");
  }
}

function sortTable(tablename,colIndex) {
//	uneditGrid(tablename);
    sortedColumn = colIndex;
  var head = document.getElementById(tablename + "HeadTable");
  var editRowIndex = -1;
  var editColIndex = -1;
  var currRow = null;
  if (head.getAttribute("editing") == "y"){
     editRowIndex = parseInt(head.getAttribute("row"));
     editColIndex = parseInt(head.getAttribute("col"));
     currRow = getCurrentRow(tablename);
   }
  var preSortDir = event.srcElement.getAttribute("sortdir");
  var isUp = true;
  if (preSortDir == "0"){
    event.srcElement.setAttribute("sortdir","1");
    isUp = true;
    sortedDirection = 1;
  }else{
    event.srcElement.setAttribute("sortdir","0");
    isUp = false;
    sortedDirection = 0;
  }
  var fieldName = event.srcElement.getAttribute("field");
  //如果鼠标点击在表格标题旁的"*"处，不进行排序
  if((fieldName  == null) || (fieldName == ""))
    return;
  setSortImg(tablename,fieldName,isUp);
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  if (gridBodyTable.rows.length < 2) return;
  var fieldType = getFieldType(tablename,fieldName);
  var values = new Array();
  for (var i=0,j=gridBodyTable.rows.length; i < j; i++) {
    var originValue = null;
    if ((colIndex == editColIndex) && (i == editRowIndex)){
      originValue = getRowField(getCurrentRow(tablename),fieldName,true);
    }else{
      originValue = gridBodyTable.rows[i].cells(colIndex).innerHTML;
    }
    values[i] = getComparableValue(fieldType,originValue);
  }
  for (var i=0,j=values.length; i<j; i++){
    var tmp = values[i];
    for (var m=0; m<i; m++){
      var tmpValue = values[m];
      if (isUp){
        if (tmp < tmpValue){
          gridBodyTable.moveRow(i,m);
          for (var n = i; n>m; n--){
            values[n] = values[n-1];
          }
          values[m] = tmpValue;
          break;
        }
      }else{
        if (tmp > tmpValue){
          gridBodyTable.moveRow(i,m);
          for (var n = i; n>m; n--){
            values[n] = values[n-1];
          }
          values[m] = tmp;
          break;
        }
      }
    }
  }
  if (currRow){
    head.setAttribute("row",currRow.rowIndex);
  }
  fillTableColor(tablename);
  colResize(tablename);
//	filterTable(tablename);
}

function setSortImg(tablename,fieldName, isUp)
{
  var head = document.getElementById(tablename + "HeadTable");
  var imgs = head.getElementsByTagName("img");
  for (var i=0,j=imgs.length; i<j; i++)
  {
    if (imgs.item(i).getAttribute("field") != fieldName)
      imgs.item(i).setAttribute("src",imgPath+"blank.gif");
    else if (isUp)
      imgs.item(i).setAttribute("src",imgPath+"sortup.gif");
    else
      imgs.item(i).setAttribute("src",imgPath+"sortdown.gif");
  }
}

function getComparableValue(ftype,cValue) {
  if (ftype.toUpperCase() == "NUM"){
    cValue = deleteComma("" + cValue);
    var myNum = parseFloat(cValue);
    if (isNaN(myNum)){
      return 0;
    }else{
      return myNum;
    }
  }else{
    return cValue.toUpperCase();
  }
}

function getFieldType(tablename,fieldName){
  var field = document.getElementById(tablename + "_" + fieldName + "ID");
  return field.getAttribute("fieldType");
}

function gridRowClick(){
  gridRow_ClickF(event.srcElement.parentNode.rowIndex);
  if (eval("typeof " + event.srcElement.parentNode.getAttribute("tablename")
           + "_Click == \"function\"")){
    eval(event.srcElement.parentNode.getAttribute("tablename") + "_Click()");
  }
  selectedRow = event.srcElement.parentNode;
  selectedCell = event.srcElement;
}

function deleteTableRow(tablename,rowIndex)
{
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  /*
    var vjHeadTable= document.getElementById(tablename + "HeadTable");

	//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040412;
	var vaiColWidth= new Array();
	if (rowIndex== 0)
	{
	  var vjFirstTR= gridBodyTable.rows[rowIndex];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vaiColWidth[i]= vjFirstTR.childNodes[i].offsetWidth;
	  }
	}
	//*/

  deleteRow(gridBodyTable.rows[rowIndex]);

  /*
  //恢复列宽.
  //alert(vaiColWidth);
	if (rowIndex== 0 && gridBodyTable.rows.length> 0)
	{
		gridBodyTable.style.width= vjHeadTable.offsetWidth;
	  var vjFirstTR= gridBodyTable.rows[rowIndex];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vjFirstTR.childNodes[i].style.width= vaiColWidth[i];
	  }
	}
	//*/

  return true;
}

function deleteRow(row){
  var tablename = row.getAttribute("tablename");
  var head = document.getElementById(tablename + "HeadTable");
  if ((head.getAttribute("editing") == "y")
      && (parseInt(head.getAttribute("row")) == row.rowIndex)){
    uneditGrid(tablename);
  }
  var effectedField = null;
  var effectedTables = new Array();
  var tmeta = document.getElementById(tablename + "Meta");
  for (var m=0,n=tmeta.childNodes.length; m<n; m++){
    effectedTables[m] = tmeta.childNodes.item(m).getAttribute("tablename");
    effectedField = tmeta.childNodes.item(m).getAttribute("effectField");
  }
  //alert("tableName:" + tablename + "effected:" + effectedField);
  if (effectedField != null){
    var value = getRowField(row,effectedField);
    for (var m=0,n=effectedTables.length; m<n; m++){
      var rows = getAllRows(effectedTables[m]);
      for (var p=0,q=rows.length; p<q; p++){
        if (getRowField(rows[p],effectedField) == value){
          deleteRow(rows[p]);
        }
      }
    }
  }
  //为解决凭证在删除三层子表时得到错误焦点,传入对应二层子表的序号.wtm,20040923
  var childTableMeta = document.getElementById(tablename + "Meta");
  var fieldName = childTableMeta.getAttribute("effectField");
  if (fieldName == null){
  	var tempRow = -1;
  }else{
     var tempRow = getRowField(row,fieldName)-1;
  }
  changeCurrentThirdCount(tablename,-1,tempRow);

  var autoField = null;
  var effField = tmeta.getAttribute("effectField");
  var editTable = document.getElementById(tablename + "EditTable");
  for (var i=1,j=editTable.rows[0].cells.length; i<j; i++){
    var fieldName = editTable.rows[0].cells[i].getAttribute("fieldname");
    if ((getInitial(fieldName,tablename) == "-999") && (fieldName != effField)){
      autoField = fieldName;
      break;
    }
  }
  var table = document.getElementById(tablename + "BodyTable");
    var vjHeadTable= document.getElementById(tablename + "HeadTable");

  	//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040412;
	var vaiColWidth= new Array();
	var vkIsDeleteFirtstRow= false;
	if (row.rowIndex== 0)
	{
	  var vjFirstTR= row;
	  vkIsDeleteFirtstRow= true;
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vaiColWidth[i]= vjFirstTR.childNodes[i].offsetWidth;
	  }
	}


  if (autoField != null){
    var value = parseInt(getRowField(row,autoField));
    for (var i=0,j=table.rows.length; i<j; i++){
      if (i == row.rowIndex) continue;
      var curRow = table.rows[i];
      if (effField != null){
        if (getRowField(row,effField) != getRowField(curRow,effField)){
          continue;
        }
      }
      var value2 = parseInt(getRowField(curRow,autoField));
      if (value2 <= value) continue;
      setRowField(curRow,autoField,value2 - 1);
      if (autoField == effectedField){//修改子表
        for (var m=0,n=effectedTables.length; m<n; m++){
          var rows = getAllRows(effectedTables[m]);
          for (var p=0,q=rows.length; p<q; p++){
            if (parseInt(getRowField(rows[p],autoField)) == value2){
              setRowField(rows[p],autoField,value2 - 1);
            }
          }
        }
      }
    }
  }
  if ((head.getAttribute("editing") == "y")
        && (parseInt(head.getAttribute("row")) > row.rowIndex)){
    head.setAttribute("row",parseInt(head.getAttribute("row"))-1);
  }
  table.deleteRow(row.rowIndex);

  //恢复列宽.
  //alert(vaiColWidth);
	if (vkIsDeleteFirtstRow && table.rows.length> 0)
	{
		table.style.width= vjHeadTable.offsetWidth;
	  var vjFirstTR= table.rows[0];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vjFirstTR.childNodes[i].style.width= vaiColWidth[i];
	  }
	}

  changed = true;
  fillTableColor(tablename);
  filterTable(tablename);
  colResize(tablename);
}

function deleteAllRows(tablename){
  uneditGrid(tablename);
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
    gridBodyTable.deleteRow(0);
  }
}

function addTableRows(tablename,data){
  if (data.firstChild.childNodes.length == 0) return;
  var fields = data.firstChild.firstChild.childNodes;
  var head = document.getElementById(tablename + "HeadTable");
  var editTable = document.getElementById(tablename + "EditTable");
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var fieldOrder = new Array();

  var viT3SeqNoCol= -1; //leidh;20040609;

	//得到tablename表中的字段名，在data中对应的序号、名称
  for (var i=1,j=editTable.rows[0].cells.length; i<j; i++){
    var noFieldName = new Array(2);
    var m, n = fields.length;
    for (m=0; m<n; m++){
      if (fields.item(m).getAttribute("name").toUpperCase()
          == editTable.rows[0].cells[i].getAttribute("fieldname").toUpperCase()){
        noFieldName[0] = m;
        noFieldName[1] = "";
        break;
      }
    }
    if(m == n){
      noFieldName[0] = -1;
      noFieldName[1] = editTable.rows[0].cells[i].getAttribute("fieldname");
    }
    fieldOrder[i-1] = noFieldName;
  }
  for (var i=0,j=data.firstChild.childNodes.length; i<j; i++){
    var field = data.firstChild.childNodes.item(i).childNodes;
    seqNo = document.getElementById(tablename + "BodyTable").rows.length + 1;
    var row;
    if (seqNo == 1){
      row = createRow(tablename);
    }else{
      row = cloneRow(tablename);
    }
    /*
    var row = gridBodyTable.insertRow(-1);
    row.tablename = tablename;
    row.onclick = gridRowClick;
    var cell = row.insertCell(-1);
    cell.style.width = 30;
    cell.align = "center";
    cell.innerHTML = "<input type=\"checkbox\" onclick=\"selectPart()\"></input>";
    */
    for (var m=0,n=fieldOrder.length; m<n; m++){
      //cell = row.insertCell(-1);
      cell = row.cells[m + 1];
      if (fieldOrder[m][0] != -1){
        var tempValue = field.item(fieldOrder[m][0]).getAttribute("value");
        var fieldName = field.item(fieldOrder[m][0]).getAttribute("name");
        var select = document.getElementById(tablename + "_" + fieldName + "IDS");
        if(select != null){
  				for(var x = 0, y = select.options.length; x < y; x++){
    				var txt = select.options[x].text;
    				var code = select.options[x].value;
            if(code == tempValue){
              cell.innerHTML =  "<span value=\"" + code + "\"><span><span value=\"" + txt + "\">" + txt + "</span>";
              break;
            }
  				}
        }else{
        	cell.innerHTML = tempValue;
        }
      }else{
        var docField = document.getElementById(tablename + "_" + fieldOrder[m][1] + "ID");
        if(docField.getAttribute("default") == "-999")
        {
          cell.innerHTML = row.rowIndex + 1;

          //leidh;20040609;
          if (viT3SeqNoCol< 0)
          {
            var vjCellObj= document.getElementById(tablename + "_" + fieldOrder[m][1] + "Cell");
            viT3SeqNoCol= vjCellObj.colno;
          }
        }
      }
    }
    row.cells[0].firstChild.checked = head.cells[0].firstChild.checked;
  }
  fillTableColor(tablename);
  colResize(tablename);
  var imgs = head.getElementsByTagName("img");
  for (var i=0,j=imgs.length; i<j; i++){
    imgs.item(i).setAttribute("src","/style/img/main/blank.gif");
  }

  //对三层子表的处理;leidh;20040609;
  var vjTable3Meta= document.getElementById(tablename + "Meta");
  var vsEffectField= vjTable3Meta.getAttribute("effectField");
  if (vsEffectField!= null && vsEffectField.length> 0 && viT3SeqNoCol>= 0)
  {
    var vsTable2Name= vjTable3Meta.parentNode.tablename;
    var vjTable2Body= document.getElementById(vsTable2Name + "BodyTable");

    if (vjTable2Body!= null && vjTable2Body.rows.length> 0)
    {
      var vjCellObj= document.getElementById(vsTable2Name + "_" + vsEffectField + "Cell");
      var viTable2EffectCol= vjCellObj.colno;
      var vjCellObj= document.getElementById(tablename + "_" + vsEffectField + "Cell");
      var viTable3EffectCol= vjCellObj.colno;

      var vsTable2EffectValue= "";
      var vsTable3EffectValue= "";
      for (var i= 0; i< vjTable2Body.rows.length; i++)
      {
        vsTable2EffectValue= getRowField(vjTable2Body.rows[i], vsEffectField, false);//vjTable2Body.rows[i].cells[viTable2EffectCol].innerText;
        var viT3SeqNo= 0;
        for (var j= 0; j< gridBodyTable.rows.length; j++)
        {
          vsTable3EffectValue= gridBodyTable.rows[j].cells[viTable3EffectCol].innerText;
          if (vsTable2EffectValue== vsTable3EffectValue)
          {
            viT3SeqNo++;
            gridBodyTable.rows[j].cells[viT3SeqNoCol].innerText= viT3SeqNo;
          }
        }

        vjTable2Body.rows[i].setAttribute(tablename, viT3SeqNo);
      }
    }
  }
}

function insertNewRow(tableName,index1){
  var tr = null;
  var autoNum = -2;
  var grid = document.getElementById(tableName + "BodyTable");
  var editTable = document.getElementById(tableName + "EditTable");
  var tableMeta = document.getElementById(tableName + "Meta");
  var effectFieldName = null;
  var effectFieldValue = null;
  if (tableMeta.getAttribute("effectField") != null){
    parentTableMeta = tableMeta.parentNode;
    effectFieldName = tableMeta.getAttribute("effectField");
    effectFieldValue = getCurrentFieldValue(parentTableMeta.tablename,
        effectFieldName);
  }
  var effectedTables = new Array();
  var effectedField = null;
  for(var m = 0; m < tableMeta.childNodes.length; m++){
    effectedTables[m] = tableMeta.childNodes.item(m).getAttribute("tableName");
    effectedField = tableMeta.childNodes.item(m).getAttribute("effectField");
    }
  var autoField = null;
  var effField = tmeta.getAttribute("effectField");
  for (var i=1,j=editTable.rows[0].cells.length; i<j; i++){
    var fieldName = editTable.rows[0].cells[i].getAttribute("fieldname");
    if ((getInitial(fieldName,tableName) == "-999") && (effField != fieldName)){
      autoNum = i;
      autoField = fieldName;
      break;
    }
  }
  if(autoField){
    if (((sortedColumn == autoNum) && (sortedDirection == 1)) || (sortedColumn == -1)){
      for(var j = grid.rows.length - 1; j >= index1; j--){
        if((effectFieldName && (getRowField(grid.rows[j],effectFieldName) == effectFieldValue)) || (!effectFieldName)){
          if(grid.rows[j].cells[autoNum].innerHTML){
            var value = parseInt(grid.rows[j].cells[autoNum].innerHTML);
            grid.rows[j].cells[autoNum].innerHTML = value + 1;
            if (autoField == effectedField){//修改子表字段
              for (var m=0,n=effectedTables.length; m<n; m++){
                var rows = getAllRows(effectedTables[m]);
                for (var p=0,q=rows.length; p<q; p++){
                  if (parseInt(getRowField(rows[p],autoField)) == value){
                    setRowField(rows[p],autoField,value + 1);
                  }
                }
              }
            }//修改子表字段if
          }
        }
      }
      tr = grid.insertRow(index1);
    }
    else
     tr = grid.insertRow(-1);
  }
  return tr;
}

function insertNewRow3(tableName,index1){
  var tr = null;
  var autoNum = -2;
  var grid = document.getElementById(tableName + "BodyTable");
  var editTable = document.getElementById(tableName + "EditTable");
  var tableMeta = document.getElementById(tableName + "Meta");
  var effectedTables = new Array();
  var effectedField = null;
  for(var m = 0; m < tableMeta.childNodes.length; m++){
    effectedTables[m] = tableMeta.childNodes.item(m).getAttribute("tableName");
    effectedField = tableMeta.childNodes.item(m).getAttribute("effectField");
    }
  var autoField = null;
  var effField = tmeta.getAttribute("effectField");
  for (var i=1,j=editTable.rows[0].cells.length; i<j; i++){
    var fieldName = editTable.rows[0].cells[i].getAttribute("fieldname");
    if ((getInitial(fieldName,tableName) == "-999") && (effField != fieldName)){
      autoNum = i;
      autoField = fieldName;
      break;
    }
  }
  if(autoField){
    if (((sortedColumn == autoNum) && (sortedDirection == 1)) || (sortedColumn == -1)){
      for(var j = grid.rows.length - 1; j >= index1; j--){
        if(grid.rows[j].cells[autoNum].innerHTML){
          var value = parseInt(grid.rows[j].cells[autoNum].innerHTML);
          grid.rows[j].cells[autoNum].innerHTML = value + 1;
          if (autoField == effectedField){//修改子表字段
            for (var m=0,n=effectedTables.length; m<n; m++){
              var rows = getAllRows(effectedTables[m]);
              for (var p=0,q=rows.length; p<q; p++){
                if (parseInt(getRowField(rows[p],autoField)) == value){
                  setRowField(rows[p],autoField,value + 1);
                }
              }
            }
          }//修改子表字段if
        }
      }
      tr = grid.insertRow(index1);
    }
    else
     tr = grid.insertRow(-1);
  }
  return tr;
}

var newRow = null;
function addBlankRow(tablename,flag){
  var tableMeta = document.getElementById(tablename + "Meta");
  var effectFieldName = null;
  var effectFieldValue = null;
  var seqNo = 0;
  if (tableMeta.getAttribute("effectField") != null){
    parentTableMeta = tableMeta.parentNode;
    effectFieldName = tableMeta.getAttribute("effectField");
    effectFieldValue = getCurrentFieldValue(parentTableMeta.tablename,
        effectFieldName);
    seqNo = getCurrentThirdCount(parentTableMeta.tablename,tablename) + 1;
    changeCurrentThirdCount(tablename,1);
  }else{
    seqNo = document.getElementById(tablename + "BodyTable").rows.length + 1;
  }
  if (effectFieldName != null && (effectFieldValue == null && !flag) ) return;
  var selectFieldValue = null;
  var selectFieldName = null;
  var valset = document.getElementById(tablename + "valueset");
  if(valset != null){
    selectFieldName = valset.getAttribute("valsetfield");
    for(var i = 1; i < valset.cells.length; i++){
      var img = valset.cells[i].firstChild.firstChild.firstChild.firstChild;
      if(img.firstChild.src.indexOf("left_select.gif") > 1){
        var id = img.firstChild.id;
        selectFieldValue = id.substring(0, id.length - 1);
      }
    }
  }
  if (seqNo == 1){
    newRow = createRow(tablename);
  }else{
    newRow = cloneRow(tablename);
  }
  setRowInitial(tablename,newRow,effectFieldName,effectFieldValue,selectFieldName,selectFieldValue,seqNo);
  var head = document.getElementById(tablename + "HeadTable");

  //如果现在是二层表，则要初始化记录第三层子表序号的属性值；leidh; 20040429;
  if (tableMeta.getAttribute("effectField") == null)
  {
    var vsThirdTableName= "";
    if (tableMeta.firstChild!= null) vsThirdTableName= tableMeta.firstChild.tablename;
    if (vsThirdTableName!= null && vsThirdTableName.length> 0 && newRow!= null)
    {
      newRow.setAttribute(vsThirdTableName, "0");
    }
  }

  newRow.cells[0].firstChild.checked = head.rows[0].cells[0].firstChild.checked;
  if ((seqNo % 2) == 1){
    setRowBackGround_B(newRow);
  }else{
    setRowBackGround_W(newRow);
  }
  newRow.scrollIntoView();
  var imgs = head.getElementsByTagName("img");
  for (var i=0,j=imgs.length; i<j; i++){
    imgs.item(i).setAttribute("src","/style/img/main/blank.gif");
  }
  changed = true;
  if(!flag){
    if (eval("typeof after_" + tablename + "_Add ==\"function\"")){
      eval("after_" + tablename + "_Add()");
    }
  }
  return newRow;
}

function getCurrentThirdCount(tableName,thirdTableName){
  var result = 0;
  if (tableName != getMainTableName()){
    var gridHead = document.getElementById(tableName + "HeadTable");
    var gridBody = document.getElementById(tableName + "BodyTable");
    var row = parseInt(gridHead.getAttribute("row"));
		if(isNaN(row)){
			return 0;
		}
    if(!gridBody.rows[row]){
      return 0;
    }
    result = parseInt(gridBody.rows[row].getAttribute(thirdTableName));
    if (isNaN(result)){ result = 0; }
  }
  return result;
}

function changeCurrentThirdCount(tableName,step,tempRow){
  var tableMeta = document.getElementById(tableName + "Meta");
  if (tableMeta.getAttribute("effectField") != null){
    parentTableMeta = tableMeta.parentNode;
    var parentTableName = parentTableMeta.tablename;
    if (parentTableName != getMainTableName()){
      var gridHead = document.getElementById(parentTableName + "HeadTable");
      var gridBody = document.getElementById(parentTableName + "BodyTable");
      //取得三层子表记录对应二层子表的序号.wtm,20040923
      if (tempRow >= 0 ){
      	 var row = tempRow;
      }else{
         var row = parseInt(gridHead.getAttribute("row"));
      }
      if (isNaN(row)){ return; }
      if(!gridBody.rows[row]){
      	return;
      }
      var originalCount = parseInt(gridBody.rows[row].getAttribute(tableName));
      if (isNaN(originalCount)){ originalCount = 0; }
      gridBody.rows[row].setAttribute(tableName, originalCount + step);
    }
  }
}

function createRow(tablename){
  var grid = document.getElementById(tablename + "BodyTable");
  var tr = grid.insertRow(-1);
  tr.style.color = "#000000";
  tr.style.fontFamily = "MS Sans Serif";
  tr.style.fontSize = "12px";
  tr.tablename = tablename;
  tr.onclick = gridRowClick;
  var cell = tr.insertCell(0);
  cell.align = "center";
  cell.style.width = 30;
  cell.innerHTML = "<input type=\"checkbox\" onclick=\"selectPart()\"></input>";
  var edit = document.getElementById(tablename + "EditTable").rows[0];
  for(var i=1,j = edit.cells.length; i<j; i++){
    cell = tr.insertCell(-1);

    //leidh;20040617;
    var fieldName = edit.cells[i].getAttribute("fieldname");
    var vjColObj= document.getElementById(tablename + fieldName + "COL");
    if (vjColObj== null) vjColObj= document.getElementById(tablename + fieldName + "_COL");
    if(vjColObj.style.display!= "none" && document.getElementById(tablename + "_" + fieldName + "Cell").style.display == "none")
    {
      cell.style.display= "none";
    }
  }
  colResize(tablename);
  return tr;
}

function cloneRow(tableName){
  uneditGrid(tableName);
  var grid = document.getElementById(tableName + "BodyTable");
  var trParent = grid.firstChild.nextSibling;
  tr = grid.rows[0].cloneNode(true);
  trParent.appendChild(tr);
  tr.onclick = gridRowClick;
  tr.style.display = "";
  for(var i = 1, j = tr.cells.length; i < j; i++){
    tr.cells[i].setAttribute("read", false);
  }
  return tr;
}

function isSameField(fieldname1,fieldname2){
  return fieldname1 == fieldname2;
}

function setRowInitial(tablename,theRow,effectFieldName,effectFieldValue,selectFieldName,selectFieldValue,seqNo){
  var edit = document.getElementById(tablename + "EditTable").rows[0];
  for(var i=1,j = edit.cells.length; i<j; i++){
    var cell = theRow.cells[i];
    var fieldname = edit.cells[i].fieldname;
    if (isSameField(fieldname,effectFieldName)){
      setEffectFieldValue(tablename,cell,fieldname,effectFieldValue);
    }else if(isSameField(fieldname,selectFieldName)){
      cell.innerHTML = selectFieldValue;
    }else{
      var initial = getInitial(fieldname,tablename,true);
      if (initial == "-999"){
        initial = seqNo;
      }
      cell.innerHTML = initial;
    }

    var cellHead = document.getElementById(tablename + "_" + fieldname + "Cell");
    if(cellHead.getAttribute("type") == "Num"){
      cell.style.textAlign = "right";
    }
  }
}

function setEffectFieldValue(tablename,cell,fieldname,effectFieldValue){
  var fieldId = document.getElementById(tablename + "_" + fieldname + "ID");
  var fieldType = fieldId.getAttribute("fieldType");
  if(fieldType == "select"){
    var select = document.getElementById(tablename + "_" + fieldname + "IDS");
    for(var m=0,n=select.options.length; m<n; m++){
      var txt = select.options[m].text;
      var code = select.options[m].value;
//      var blankIndex = txt.indexOf(" ");
//      if (blankIndex > 0){
//        code = txt.substring(0, blankIndex);
//      }
      if (code == effectFieldValue) {
        cell.innerHTML = txt;
        select.selectedIndex = m;
        break;
      }
    }
  }else{
    cell.innerHTML = effectFieldValue;
  }
}

function getCurrentRow(tablename){
  var head = document.getElementById(tablename + "HeadTable");
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  if (head== null
      || gridBodyTable== null
      || gridBodyTable.rows.length<= 0) return null; //leidh;20040601;
  if (head.getAttribute("editing") == "y"){
    return gridBodyTable.rows[parseInt(head.getAttribute("row"))];
  }else	if (event){
    if (event.srcElement.tagName == "TD"){
      if (event.srcElement.parentNode.tablename == tablename){
        return event.srcElement.parentNode;
      }
    }
    // 20040714
    if (event.srcElement.tagName == "INPUT"){
      if (event.srcElement.type == "checkbox"){
        return gridBodyTable.rows[parseInt(head.getAttribute("row"))];
      }
      //修改子表取不到列，wtm,20040803
      if (event.srcElement.type == "button" &&
      		event.srcElement.getAttribute("name") == "ADD" &&
      		event.srcElement.getAttribute("tablename") == tablename){
        return gridBodyTable.rows[parseInt(gridBodyTable.rows.length) - 1];
      }
    }
  }else{
    return gridBodyTable.rows[parseInt(gridBodyTable.rows.length) - 1];
  }
}

function getAllRows(tablename){
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var result = new Array();
  for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
    result[result.length] = gridBodyTable.rows[i];
  }
  return result;
}

//判断子表主键是否重复，wtm，20040725
//tableName-子表名,fieldName-主键英文名,trans-主键中文名
//本函数只判断子表有一个主键状况
function isGridRepeat(tableName,fieldName,trans){
    var result = 1;
    var roles = getAllRows(tableName);
    var fieldNames = new Array();
    for(var i = 0; i < roles.length; i++){
		fieldNames[i] = getRowField(roles[i], fieldName);
    }
    fieldNames.sort();
	var temp = "";
	for(var i = 0; i < fieldNames.length; i++){
		if(i == 0){
			temp = fieldNames[0];
			continue;
		}
		if(fieldNames[i] == temp){
			if(temp == ""){
				alert("重复输入空的“"+trans+"”，请删除后再保存！");
			}else{
				alert(trans+"“" + temp + "”重复输入，请删除一个再保存！");
			}
      result = 0;
			return result;
		}else{
			temp = fieldNames[i];
		}
	}
  return result;
}

function getFilterRows(tableName, fieldName, fieldValue){
  var gridBodyTable = document.getElementById(tableName + "BodyTable");
  var result = new Array();
  for (var i = 0, j = gridBodyTable.rows.length; i < j; i++){
    var currRow = gridBodyTable.rows[i];
    if(getRowField(currRow, fieldName) == fieldValue){
      result[result.length] = currRow;
    }
  }
  return result;
}

function getSelectedRows(tablename){
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var viColXOffset= getColIndexOffset(tablename); //获取偏移；leidh; 20040511;
  var result = new Array();
  for (var i=0,j=gridBodyTable.rows.length; i<j; i++){
    //列序号中加上偏移；leidh; 20040511;
    if (gridBodyTable.rows[i].cells[0+ viColXOffset].firstChild.checked){
      result[result.length] = gridBodyTable.rows[i];
    }
  }
  return result;
}

function getRowField(row,fieldName,withName)
{
  var tablename = row.getAttribute("tablename");
  var headTable = document.getElementById(tablename + "HeadTable");
  var editTable = document.getElementById(tablename + "EditTable");
  var ele = document.getElementById(tablename + "_" + fieldName + "ID");
  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);

	var vjHFillCell= document.getElementById(tablename+ "_HFillCell");//锁定用前置列;leidh;20040409;

  if (colNo != 0)
  {
    if ((parseInt(headTable.getAttribute("col")) == colNo)
        && (parseInt(headTable.getAttribute("row")) == row.rowIndex)
        && (headTable.getAttribute("editing") == "y"))
    {
        return getField(fieldName,tablename,withName);
    }
    else
    {
			if (vjHFillCell!= null) colNo++; //如果有锁定,则要多加一列;leidh;20040409;

      var result = row.cells[colNo].innerHTML;

        if (ele.getAttribute("fieldType") == "select")
        {
          if(row.cells[colNo].firstChild != null &&
          		(row.cells[colNo].firstChild.tagName == "span" ||
          		row.cells[colNo].firstChild.tagName == "SPAN")){
             if (!withName){
          	result = row.cells[colNo].firstChild.value;
             }else{
                result = row.cells[colNo].innerText;
             }
          }else{
            result = row.cells[colNo].innerHTML;
            var select = document.getElementById(tablename + "_" + fieldName + "IDS");
      	    for(var m=0,n=select.options.length; m<n; m++){
      	      var txt = select.options[m].text;
      	      var code = select.options[m].value;
              if(result == txt){
                if (!withName){
               	   result = code;
                }else{
                   result = txt;
                }
                 break;
              }
            }
          }
//          var blankIndex = result.indexOf(" ");
//          if (blankIndex > 0)
//          {
//            result = result.substring(0,blankIndex);
//          }
          if(result.length == 0) result = " ";
        }


      if(ele.getAttribute("fieldType") == "num")
      {
        if((result == null) || (result.length == 0))
        {
          result = 0;
        }
        else
        {
          result = deleteComma(result);
        }
      }

    	//alert(row.rowIndex+ "|"+ fieldName+ "|"+ withName+ "|"+ result);
      return result;
    }
  }

  else
  {
    alert("没有" + fieldName + "字段。");
  }
}

function getRowFieldText(row,fieldName){
  var tablename = row.getAttribute("tablename");
  var headTable = document.getElementById(tablename + "HeadTable");
  var editTable = document.getElementById(tablename + "EditTable");
  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);

	var vjHFillCell= document.getElementById(tablename+ "_HFillCell");//锁定用前置列;leidh;20040409;

  if (colNo != 0){
    if ((parseInt(headTable.getAttribute("col")) == colNo)
        && (parseInt(headTable.getAttribute("row")) == row.rowIndex)
        && (headTable.getAttribute("editing") == "y")){
      return getFieldText(fieldName,tablename,false);
    }else{
			if (vjHFillCell!= null) colNo++; //如果有锁定,则要多加一列;leidh;20040409;

      return row.cells[colNo].innerHTML;
    }
  }else{
    alert("没有" + fieldName + "字段。");
  }
}

function getRowFieldNum(row,fieldName){
  var tablename = row.getAttribute("tablename");
  var headTable = document.getElementById(tablename + "HeadTable");
  var editTable = document.getElementById(tablename + "EditTable");
  if (!document.getElementById(tablename + "_" + fieldName + "Cell")){
    alert("没有" + fieldName + "字段。");
    return;
  }
  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);

	var vjHFillCell= document.getElementById(tablename+ "_HFillCell");//锁定用前置列;leidh;20040409;

  if ((parseInt(headTable.getAttribute("row")) == row.rowIndex)
      && (parseInt(headTable.getAttribute("col")) == colNo)
      && (headTable.getAttribute("editing") == "y")){
    return getFieldNum(fieldName,tablename);
  }else{
			if (vjHFillCell!= null) colNo++; //如果有锁定,则要多加一列;leidh;20040409;

    var result = row.cells[colNo].innerHTML;
    if((result == null) || (result.length == 0)){
      result = 0;
    }else{
      result = deleteComma(result);
    }
    return result;
  }
}

function setRowField(row,fieldName,fieldValue,unfire)
{
  var tablename = row.getAttribute("tablename");
  var headTable = document.getElementById(tablename + "HeadTable");
  if(document.getElementById(tablename + "_" + fieldName + "Cell") == null) return;

  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);
  var ele = document.getElementById(tablename + "_" + fieldName + "ID");
  var fieldType = ele.getAttribute("fieldType");
  var isKiloStyle = ele.getAttribute("kiloStyle");

	var vjHFillCell= document.getElementById(tablename+ "_HFillCell");//锁定用前置列;leidh;20040409;

  if (colNo != 0)
  {
    if ((headTable.getAttribute("editing") == "y")
        && (parseInt(headTable.getAttribute("row")) == row.rowIndex)
        && (parseInt(headTable.getAttribute("col")) == colNo))
    {
      setField(fieldName,fieldValue,tablename,false,unfire);
    }
    else
    {
			if (vjHFillCell!= null) colNo++; //如果有锁定,则要多加一列;leidh;20040409;

    if (fieldType == "num")
    {
      if ((isKiloStyle == "true") || (isKiloStyle == true)){
        var temp = kiloStyle(fieldValue);
        row.cells[colNo].innerHTML = temp;
      }
      else
      row.cells[colNo].innerHTML = fieldValue;
    }
    if (fieldType == "select"){//凭证二级子表值集不正确，wtm，20041112
      var tmpi = fieldValue.indexOf(" ");
      if(tmpi > -1){
        fieldValue = fieldValue.substring(tmpi+1);
      }
           var select = document.getElementById(tablename + "_" + fieldName + "IDS");
      	    for(var m=0,n=select.options.length; m<n; m++){
      	        var txt = select.options[m].text;
      	        var code = select.options[m].value;
                if(fieldValue == code || fieldValue == txt ){
               	   fieldValue = txt;
               	   fieldValue = "<span value=\"" + code + "\"><span><span value=\"" + txt + "\">" + txt + "</span>";
                   break;
                }
      	    }
          row.cells[colNo].innerHTML = fieldValue;
    }else
      row.cells[colNo].innerHTML = fieldValue;
    }
  }else{
    alert("没有" + fieldName + "字段。");
  }
}

function setTblBtnVisible(tableName,visible){
  var add = document.getElementById(tableName + "ADD");
  var del = document.getElementById(tableName + "DEL");
  var ins = document.getElementById(tableName + "INSERT");
  if (visible){
    add.style.display = "";
    del.style.display = "";
    ins.style.display = "";
  }else{
    add.style.display = "none";
    del.style.display = "none";
    ins.style.display = "none";
  }
}

function setGridBtnVisible(tableName, func, visible){
  var add = document.getElementById(tableName + func);
  if (visible){
    add.style.display = "";
  }else{
    add.style.display = "none";
  }
}

function setAreaVisible(areaName, visible){
  var area = document.getElementById(areaName);
  if(visible){
    area.style.display = "";
  }else{
    area.style.display = "none";
  }
}

function setTabName(tabId, tabName){
  var tmp = document.getElementById(tabId + "L");
  var tab = tmp.parentNode.parentNode.childNodes.item(1);
  tab.innerHTML = tabName;
}

function setRowChecked(row,checked){
  row.cells[0].firstChild.checked = checked;
}

function setCellReadOnly(row,fieldName,readOnly){
  var tablename = row.getAttribute("tablename");
  var headTable = document.getElementById(tablename + "HeadTable");
  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);
  if (colNo != 0){
    row.cells[colNo].setAttribute("read",readOnly);
  }else{
    alert("没有" + fieldName + "字段。");
  }

  //如果设置为只读，而当前的列单元又被选中，则要立即处理；leidh; 20040512;
  //方案：转移焦点单元格；
  var bodyTable = document.getElementById(tablename + "BodyTable");
  if (readOnly && headTable.getAttribute("editingfield")== fieldName)
  {
    var vjEditableCell= getNextEditableCell(tablename, row.rowIndex, 1+ getColIndexOffset(tablename));
    if (vjEditableCell== null)
    {
      for (var i= 1+ getColIndexOffset(tablename); i< row.cells.length; i++)
      {
        var vjEditableCell= row.cells[i];
        if (vjEditableCell.style.display!= "none"
            && !vjEditableCell.getAttribute("read")) break;
        vjEditableCell= null;
      }
    }

    if (vjEditableCell!= null)
    {
      enterGridCell(vjEditableCell);
    }
  }
}
function isCellReadOnly(fieldName,row){
  var result = false;
  var tablename = row.getAttribute("tablename");
  var headTable = document.getElementById(tablename + "HeadTable");
  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);
  if ( colNo != 0){
    var cellElement = row.cells[colNo];
    result = (!cellElement.isContentEditable);
    return result;
  }
  else{
    alert("没有" + fieldName + "字段。");
  }
}

function isCellReadOnly(fieldName,row){
  var result = false;
  var tablename = row.getAttribute("tablename");
  var headTable = document.getElementById(tablename + "HeadTable");
  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);
  if ( colNo != 0){
    var cellElement = row.cells[colNo];
    result = (!cellElement.isContentEditable);
    return result;
  }
  else{
    alert("没有" + fieldName + "字段。");
  }
}

function setChildTableField(tableName, fieldName, value){
  var grid = document.getElementById(tableName + "BodyTable");
  if(grid == null)
    return;
  var head = document.getElementById(tableName + "HeadTable");
  var colIndex = 0;
  for(var k = 1; k < head.rows[0].cells.length; k++){
    var name = head.rows[0].cells[k].getElementsByTagName("span").item(0).getAttribute("field");
    if(name == fieldName){
      colIndex = k;
      break;
    }
  }
  for (var i=0,j=grid.rows.length; i<j; i++){
    grid.rows[i].cells[colIndex].innerHTML = value;
  }
}

function getGridFieldName(){
  var src = event.srcElement;
  return src.firstChild.firstChild.getAttribute("fieldname");
}

function getGridFieldCaption(tableName, fieldName){
  var doc = document.getElementById(tableName + "_" + fieldName + "CaptionID");
  return doc.innerHTML;
}

function setGridFieldCaption(tableName, fieldName, value){
  var doc = document.getElementById(tableName + "_" + fieldName + "CaptionID");
  doc.innerHTML = value;
}


function setGridFieldVisible(tablename, fieldname, visible,unResize)
{
	//alert("setGridFieldVisible();");
	  var grid = document.getElementById(tablename + "BodyTable");
  if(grid == null) return false;

  var doc = document.getElementById(tablename + "_" + fieldname + "Cell");
  if (doc.U_Hidden== true) return false;
  if((visible) && doc.style.display == ""){ return false; }
  if((!visible) && doc.style.display == "none"){ return false; }
  var head = document.getElementById(tablename + "HeadTable");

  //*
  if(visible)
  {
    head.width = Math.abs(parseInt(head.offsetWidth) + parseInt(doc.offsetWidth));
  }
  else
  {
    if (Math.abs(parseInt(head.offsetWidth) - parseInt(doc.offsetWidth))> 0)
    {
      head.width = Math.abs(parseInt(head.offsetWidth) - parseInt(doc.offsetWidth));
    }
  }
  grid.style.width = head.clientWidth;
  //*/

  //alert(fieldname+ "|"+ doc.colno+ "|"+ doc.offsetWidth);
  //锁定列处理;
 	//分组处理(复杂表头处理);
 	var vsParentNo= "";
 	var vjParentTD= null;
 	var vjTD= doc;
 	var vjNeighbourTD= null;

 	while(true)
 	{
   	vsParentNo= vjTD.parent;
   	if (vsParentNo== "null") break;
   	vjParentTD= document.getElementById(tablename+ "_"+ vsParentNo+ "Cell");

    //看了左边看右边;leidh;20040402;
    if (vjNeighbourTD== null)
    {
    	if (vjTD== vjTD.parentNode.firstChild) vjNeighbourTD= null;
	 	  else
	 	  {
    	  vjNeighbourTD= vjTD;
	 	 	  while(true)
	 	 	  {
   	 	   vjNeighbourTD= vjNeighbourTD.previousSibling;//parentNode.childNodes[vjNeighbourTD.cellIndex- 1];
   	 	   if (vjNeighbourTD.style.display!= "none") break;

         if (vjNeighbourTD== vjNeighbourTD.parentNode.firstChild)
         {
   	 	     vjNeighbourTD= null;
   	 	     break;
         }

   	 	   //vjNeighbourTD= null;
	 	 	 }
	 	 }
 	  }
    if (vjNeighbourTD== null)
    {
    	if (vjTD== vjTD.parentNode.lastChild) vjNeighbourTD= null;
	 	  else
	 	 	{
    	  vjNeighbourTD= vjTD;
		 	 	while(true)
		 	 	{
   	 	   vjNeighbourTD= vjNeighbourTD.nextSibling;//parentNode.childNodes[vjNeighbourTD.cellIndex+ 1];
   	 	   if (vjNeighbourTD.style.display!= "none") break;

         if (vjNeighbourTD== vjNeighbourTD.parentNode.lastChild)
         {
   	 	     vjNeighbourTD= null;
   	 	     break;
         }

   	 	   //vjNeighbourTD= null;
	 	 	 }
	 	 }
 	  }

	  //alert(vjTD.innerText+ "|"+ vjNeighbourTD.innerText);
    if (visible== false)
    {
	   	if (vjNeighbourTD!= null && vjNeighbourTD.parent== vsParentNo)
	   	{
	   		vjParentTD.style.width= vjParentTD.offsetWidth- vjTD.offsetWidth;
	    }
	    else
	    {
      	//vjTD= vjParentTD;
	    	vjParentTD.style.display= "none";
	    }
    }
    else
    {
    	if (vjParentTD.style.display== "none") vjParentTD.style.display= "";
    	else
      {
    	  vjParentTD.style.width= vjParentTD.offsetWidth+ vjTD.offsetWidth;
    	}
    }

  	vjTD= vjParentTD;
  	vjNeighbourTD= null;
 	}


  //隐藏(实现锁定)处理;
  //隐藏处理;
  doc.style.display = visible?"":"none";
  //document.getElementById(tablename + fieldname + "COL").style.display = visible?"":"none";
  //grid.style.width = head.clientWidth;

  var vjGridTBody= null;
  var vjRow= null;
  var vjDataTD= null;
  var viDataTDIndex= parseInt(doc.colno)+ getColIndexOffset(tablename);

  for (var i= 0; i< grid.childNodes.length; i++)
  {
  	vjGridTBody= grid.childNodes[i];
  	if (vjGridTBody.nodeName== "TBODY") break;
  	vjGridTBody= null;
  }

  if (vjGridTBody!= null)
  {
  	for (var i= 0; i< vjGridTBody.childNodes.length; i++)
  	{
  		vjRow= vjGridTBody.childNodes[i];
  		vjDataTD= vjRow.childNodes[viDataTDIndex];
      vjDataTD.style.display = visible?"":"none";
  	}
  }

  if (!unResize)
  {
  	colResize(tablename);
 	}

 	return true;
}


function getFieldCaption(tableName, isVisible){
  var mainTableName = getMainTableName();
  var isMain = false;
  if((tableName == null) || (tableName == mainTableName)){
    tableName = mainTableName;
    isMain = true;
  }
  var num = 0;
  var fieldnames = new Array();
  var fieldcaptions = new Array();
  if(isMain == true){
    var fields = document.getElementById("fields").childNodes;
    for(var i = 0; i < fields.length; i++){
      fieldName = fields.item(i).getAttribute("fieldname");
      var caption = document.getElementById(tableName + "_" + fieldName + 'CaptionID');
      var captionName = caption.innerHTML;
      var index = captionName.indexOf("<SPAN");
      if(index > 0)
        captionName = captionName.substr(0, index);
      if(isVisible == true){
        if(caption.style.display == ""){
          fieldnames[num] = fieldName;
          fieldcaptions[num] = captionName;
          num++;
        }
      }else{
        fieldnames[num] = fieldName;
        fieldcaptions[num] = captionName;
        num++;
      }
    }
  }else{
    var editTable = document.getElementById(tableName + "EditTable");
    var row0 = editTable.rows[0];
    for (var i=1,j=row0.cells.length; i<j; i++){
      var fieldName = row0.cells[i].getAttribute("fieldname");
      if ((fieldName == "CHK")||(fieldName == "TFill")) continue;
      var element = document.getElementById(tableName + "_" + fieldName + 'Cell');
      var captionName = document.getElementById(tableName + "_" + fieldName + "CaptionID").innerHTML;
      var index = captionName.indexOf("<SPAN");
      if(index > 0)
        captionName = captionName.substr(0, index);
      if(isVisible == true){
        if(element.style.display == ""){
          fieldnames[num] = fieldName;
          fieldcaptions[num] = captionName;
          num++;
        }
      }else{
        fieldnames[num] = fieldName;
        fieldcaptions[num] = captionName;
        num++;
      }
    }
  }
  var result = new Array();
  result[0] = fieldnames;
  result[1] = fieldcaptions;
  return result;
}

function setRowReadOnly(row, readonly){
  for(var i = 0; i < row.cells.length; i++){
    row.cells[i].setAttribute("read", readonly);
  }
}

function setGridRowColor(row, color){
  row.style.color = color;
}

function setGridRowBgColor(row, color){
  row.style.backgroundColor = color;
}

function setCellFocus(tablename,fieldName,row){
  if (row== null) return false;//leidh;20040614;
  var colNo = parseInt(document.getElementById(tablename + "_" + fieldName + "Cell").colno);
  enterGridCell(row.cells[colNo]);
}
/*
function tableKeyPress(tablename){
  if (event.keyCode == 13){
    if(!fieldChecked) return;
    if (document.getElementById(tablename + "HeadTable").getAttribute("read")
        == "true") return;
    var head = document.getElementById(tablename + "HeadTable");
    if (head.getAttribute("editing") =="y"){
       event.srcElement.blur();
      var row = parseInt(head.getAttribute("row"));
      var col = parseInt(head.getAttribute("col"));
      var cell = getNextEditableCell(tablename,row,col + 1);
      if (cell == null){
        var nextRowIndex = getNextRowIndex(tablename,row);
        cell = getNextEditableCell(tablename,nextRowIndex,1);
      }
      if (cell != null){
        enterGridCell(cell);
      }
    }
  }
}
*/
function tableKeyPress(tablename){
  if (event.keyCode == 13){
    if(event.srcElement.getAttribute("onchange"))
      event.srcElement.fireEvent("onchange");
//    if(event.srcElement.getAttribute("fieldType") == "foreignKey")
//      return;
    if(!fieldChecked) return;
    if (document.getElementById(tablename + "HeadTable").getAttribute("read")
        == "true") return;
    var head = document.getElementById(tablename + "HeadTable");
    if (head.getAttribute("editing") =="y"){
      var row = parseInt(head.getAttribute("row"));
      var col = parseInt(head.getAttribute("col"));
      var cell = getNextEditableCell(tablename,row,col + 1);
      if (cell == null){
        var isAddNewRow = true;
        if (eval("typeof " + tablename + "_IsAddRow == \"function\"")){
          isAddNewRow = eval(tablename + "_IsAddRow()");
        }
        if (isAddNewRow){
          var nextRowIndex = getNextRowIndex(tablename,row);

          //leidh;20040616;
          //cell = getNextEditableCell(tablename,nextRowIndex,1);
          if (nextRowIndex>= 0)
          {
            cell = getNextEditableCell(tablename,nextRowIndex,1);
          }
        }
      }
      if (cell != null){
        enterGridCell(cell);
      }
    }
  }
   else{
	isFieldChange=true;//判断字段有没有被修改
  }
}

function getNextRowIndex(tableName,currRowNo){
  var nextRow = null;
  var bodyTable = document.getElementById(tableName + "BodyTable");
  for( var i=currRowNo + 1,j=bodyTable.rows.length; i<j; i++){
    if (bodyTable.rows[i].style.display != "none"){
      nextRow = bodyTable.rows[i];
      break;
    }
  }
  if (!nextRow){
    if((document.getElementById(tableName + "ADD"))
        &&(document.getElementById(tableName + "ADD").style.display != "none")
        &&(document.getElementById(tableName + "ADD").getAttribute("read") == "false")){
      nextRow = addBlankRow(tableName);
    }
  }

  //leidh;20040616;
  var viRowIndex= -1;
  if (nextRow!= null) viRowIndex= nextRow.rowIndex;
  return viRowIndex;
}

function getNextEditableCell(tableName,currRowNo,startColNo){
  var edit = document.getElementById(tableName + "EditTable");
  var bodyTable = document.getElementById(tableName + "BodyTable");
  var cell = null;
  for (var i=startColNo,j= edit.rows[0].cells.length; i<j; i++){
    var fieldName = edit.rows[0].cells[i].getAttribute("fieldname");
    if(fieldName == "HFill" || fieldName == "TFill" || fieldName == "CHK") continue;
    if ((document.getElementById(tableName + "_" + fieldName + "Cell").style.display != "none")
        && (!isFieldReadOnly(fieldName,tableName))
        && (!bodyTable.rows[currRowNo].cells[i].getAttribute("read"))){
      cell = bodyTable.rows[currRowNo].cells[i];
      break;
    }
  }
  return cell;
}

function enterGridCell(td){
  var tr = td.parentNode;
  var tablename = tr.getAttribute("tablename");
  var head = document.getElementById(tablename + "HeadTable");
  var colIndex = 0;
  var rowIndex = tr.rowIndex;
  var curValue = td.innerHTML;
//  alert("td.innerHTML:" + curValue);
  var bodyTable = document.getElementById(tablename + "BodyTable");
  for (var i=1,j=bodyTable.rows[rowIndex].cells.length; i<j; i++){
    if (td == bodyTable.rows[rowIndex].cells[i]){
      colIndex = i;
      break;
    }
  }
  var editTable = document.getElementById(tablename + "EditTable");
  var fieldname = editTable.rows[0].cells[colIndex].getAttribute("fieldname");
  if(fieldname.toUpperCase() == "TFILL") return;
  var select = document.getElementById(tablename + "_" + fieldname + "IDS");
  uneditGrid(tablename);
  head.setAttribute("editing","y");
  head.setAttribute("row",rowIndex);
  head.setAttribute("col",colIndex);
  head.setAttribute("editingfield",fieldname);
  if(select != null){
    if(td.firstChild != null && td.firstChild.value)
    	curValue = td.firstChild.value;
//    alert("td.firstChild.value: " + curValue);
  }
  setField(fieldname,curValue,tablename,false,true);
  td.innerHTML = editTable.rows[0].cells[colIndex].innerHTML;
  editTable.rows[0].cells[colIndex].innerHTML = "";

  tmeta = document.getElementById(tablename + "Meta");
  if(tmeta){
    for (var i=0,j=tmeta.childNodes.length; i<j; i++){
      filterTable(tmeta.childNodes.item(i).getAttribute("tablename"));
    }
  }
  var fieldId = document.getElementById(tablename + "_" + fieldname + "ID");
  var td = document.getElementById(tablename + "_" + fieldname + "Cell");
  if (document.getElementById(tablename + "_" + fieldname + "ForeignIMGID") != null){
    if (td.clientWidth > 24){
      fieldId.style.width = td.clientWidth - 22;
    }else{
      fieldId.style.width = 2;
    }
  }else if(document.getElementById(tablename + "_" + fieldname + "_BLOBIDID")){
    if (td.clientWidth > 84){
      fieldId.style.width = td.clientWidth - 84;
    }else{
      fieldId.style.width = 2;
    }
  }else{
    fieldId.style.width = td.clientWidth;
  }
  td.scrollIntoView();
  if (isFieldReadOnly(fieldname,tablename) || td.getAttribute("read")){
    setReadOnly(fieldname,true,tablename,true);
    if (eval("typeof " + tablename + "_EnterRow == \"function\"")){
      eval(tablename + "_EnterRow()");
    }
  }else{
    setReadOnly(fieldname,false,tablename,true);
    if (document.getElementById(tablename + "_" + fieldname + "ID") != null){
      //延迟调用,状态都变了,黄花菜也凉了;leidh;20040623;
      setTimeout("focusOnElement('" + tablename + "','" + fieldname + "')" ,10);
      //eval("focusOnElement('" + tablename + "','" + fieldname + "')");
    }
  }

}

function focusOnElement(tablename,fieldname){
  try{
    if (document.getElementById(fieldname + "_BWSID")){
      document.getElementById(fieldname + "_BWSID").focus();
    }else if (document.getElementById(tablename + "_" + fieldname+"IDS")){
      valueSet_I_Display(document.getElementById(tablename + "_" + fieldname+"ID"));
    }else{
      document.getElementById(tablename + "_" + fieldname + "ID").focus();
    }
  }catch (e){
  }
  if (eval("typeof " + tablename + "_EnterRow == \"function\"")){
    eval(tablename + "_EnterRow()");
   }
}

function grid_Add(){
    if(!fieldChecked) return;//zhangcheng 如果字段检查失败,就不能进行增加行的操作
  var tableName = event.srcElement.getAttribute("tablename");
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")
      == "true") return;
  if (eval("typeof " + tableName + "_Add ==\"function\"")){
    eval(tableName + "_Add()");
  }else{
    var rtn = true;
    if (eval("typeof before_" + tableName + "_Add ==\"function\"")){
      rtn = eval("before_" + tableName + "_Add()");
    }
    if(!rtn) return;
    var tr = addBlankRow(tableName);
  }
}

//用快捷键进行记录增加
function grid_Add2(){
  //var tableName = event.srcElement.getAttribute("tablename");
  var active = document.activeElement;
  if (active == null){ return; }
  var mainTableName = getMainTableName();
  var child1,child2;
  var tableName = active.getAttribute("tablename");
  if (active.hasChildNodes())
    child1 = active.firstChild;
  if ((child1 != null) && (child1.hasChildNodes())){
    tableName = child1.getAttribute("tablename");
    child2 = child1.firstChild;
  }
  if ((child2) && (child2.outerHTML)){
    tableName = child2.getAttribute("tablename");
  }
  if (!tableName){
    tableName = active.getAttribute("tablename");
  }
  if ((tableName == null) || (tableName == "")){
    for (var n = 1;n <= 9;n++){
      var areaName = "A" + n;
      var tabName;
      if (document.getElementById(areaName + "TD")){
        tabName = getActiveTab(areaName);
        if (tabName){
          tableName = getTabTable(tabName);
          break;
        }
      }
    }
  }
  if(tableName == mainTableName){
    var main = document.getElementById("maintable");
    var firstChild;
    if((main) && (main.hasChildNodes()))
      firstChild= main.firstChild;
       tableName = firstChild.getAttribute("tablename");
    }
  if ((tableName != null) && (tableName != "") && (tableName != mainTableName)){
    if (document.getElementById(tableName + "HeadTable").getAttribute("read")
        == "true") return;
    if (eval("typeof " + tableName + "_Add ==\"function\"")){
      eval(tableName + "_Add()");
    }else{
      var rtn = true;
      if (eval("typeof before_" + tableName + "_Add ==\"function\"")){
        rtn = eval("before_" + tableName + "_Add()");
      }
      if(!rtn) return;
      var tr = addBlankRow(tableName);
    }
  }
}

function grid_Del(){
	//alert("grid_Del()");
  var tableName = event.srcElement.getAttribute("tablename");
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")
      == "true") return;
  if (eval("typeof " + tableName + "_Del ==\"function\"")){
    eval(tableName + "_Del()");
  }else{
    var rtn = true;
    if (eval("typeof before_" + tableName + "_Del ==\"function\"")){
      rtn = eval("before_" + tableName + "_Del()");
    }
    if(!rtn) return;
    var table = document.getElementById(tableName + "BodyTable");
    var vjHeadTable= document.getElementById(tableName + "HeadTable");
    var viOffetColX= getColIndexOffset();

    if (table.rows.length<= 0) return false;//leidh;20040531;

	//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040412;
  var vkIsDeleteFirstTR= table.rows[0].cells[0+ viOffetColX].firstChild.checked
	var vaiColWidth= new Array();
	if (vkIsDeleteFirstTR)
	{
	  var vjFirstTR= table.rows[0];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vaiColWidth[i]= vjFirstTR.childNodes[i].offsetWidth;
	  }
	}

    //做 删除 之前，将表格置为不可编辑状态;
    //以免 page.js.filterTable().getCurrentFieldValue() 出错及其他连锁错误；leidh;20040429;
    uneditGrid(tableName);

    var vjTableMeta = document.getElementById(tableName + "Meta");
    var vsKeyValue= "";
    for (var i= 0; i< vjTableMeta.childNodes.length; i++)
    {
      var vjChildTableName= vjTableMeta.childNodes.item(i).getAttribute("tablename");
      var vjChildTableMeta = document.getElementById(vjChildTableName + "Meta");
      var fieldName = vjChildTableMeta.getAttribute("effectField");
      var fieldValue = "";

      for (var j= 0; j< table.rows.length; j++)
      {
        if (table.rows[j].cells[0+ viOffetColX].firstChild.checked== false) continue;

        var viCol = parseInt(document.getElementById(tableName + "_" + fieldName + "Cell").colno);
        vsKeyValue= table.rows[j].cells[viCol].innerText;
        vsKeyValue= trim(vsKeyValue);

        var vjChildHeadTable= document.getElementById(vjChildTableName + "HeadTable");
        var vjChildTable = document.getElementById(vjChildTableName + "BodyTable");
        var viColNo = parseInt(document.getElementById(vjChildTableName + "_" + fieldName + "Cell").colno);

        uneditGrid(vjChildTableName);
        for (var x= vjChildTable.rows.length- 1; x>= 0 ; x--)
        {
          var vjRow= vjChildTable.rows[x];
          var vsRowValue = vjRow.cells[viColNo].innerText;
          vsRowValue= trim(vsRowValue);

          if (vsRowValue == vsKeyValue)
          {
          	//如果删除的是第一行,需要对各列的列宽进行处理,否则会出现列混乱.leidh;20040412;
            var vkIsDeleteFirstTROfChild= (x== 0);
          	var vaiColWidthOfChild= new Array();
          	if (vkIsDeleteFirstTROfChild)
          	{
          	  var vjFirstTROfChild= vjChildTable.rows[0];
          	  for (var i= 0; i< vjFirstTROfChild.childNodes.length; i++)
          	  {
          	  	vaiColWidthOfChild[i]= vjFirstTROfChild.childNodes[i].offsetWidth;
          	  }
          	}

            vjChildTable.deleteRow(x);

            //恢复列宽.leidh;20040412;
          	if (vkIsDeleteFirstTROfChild && vjChildTable.rows.length> 0)
          	{
          		vjChildTable.style.width= vjChildHeadTable.offsetWidth;
          	  var vjFirstTROfChild= vjChildTable.rows[0];
          	  for (var i= 0; i< vjFirstTROfChild.childNodes.length; i++)
          	  {
          	  	vjFirstTROfChild.childNodes[i].style.width= vaiColWidthOfChild[i];
          	  }
          	}
          }
        }
      }
    }
    vjHeadTable.setAttribute("row", "applus");


    //删除后,调整 SeqNo 列中的序号; leidh; 20040519;
    //因为 SeqNo 列是关键字,所以只能更改最后一层子表;
    //现在改为对二层子表及三层子表都可处理；leidh; 20040521;
    //if (vjTableMeta.childNodes.length== 0)
    //{
      //获取三层子表中的 SeqNo 列；leidh; 20040519;
      var vsSeqNoField= "";
      var viSeqNoCol= -1;
      var vsEffectFieldName= vjTableMeta.getAttribute("effectField");;

      var vjValset = document.getElementById(tableName + "valueset");
      var vsSelectFieldName= "";
      if(vjValset != null) vsSelectFieldName = vjValset.getAttribute("valsetfield");

      var vjEditRow = document.getElementById(tableName + "EditTable").rows[0];
      for(var a= 1+ viOffetColX; a< vjEditRow.cells.length; a++)
      {
        var vsTmpField = vjEditRow.cells[a].fieldname;
        if (isSameField(vsTmpField, vsEffectFieldName)) continue;
        else if(isSameField(vsTmpField, vsSelectFieldName)) continue;
        else
        {
          var initial = getInitial(vsTmpField, tableName, true);
          if (initial == "-999")
          {
            vsSeqNoField= vsTmpField;
            viSeqNoCol= a;
            break;
          }
        }
      }

      var vaiSeqNo= new Array();

    //执行删除;
    for(var i=0;i< table.rows.length; ){
      if (table.rows[i].cells[0+ viOffetColX].firstChild.checked)
      {
        if (viSeqNoCol>= 0) vaiSeqNo[vaiSeqNo.length]= parseInt(table.rows[i].cells[viSeqNoCol].innerText); //记录序号;leidh;20040526;
        table.deleteRow(i);
      }
      else
      {
        i++;
      }
    }


      //调整列序;
      //只对可见的行进行调整;
      if (viSeqNoCol>= 0)
      {
        var viSeqNo= 0;
        var vjRow= null;
        for (var i= 0; i< table.rows.length; i++)
        {
          vjRow= table.rows[i];
          if (vjRow.style.display== "none") continue;
          viSeqNo++;
          vjRow.cells[viSeqNoCol].innerText= viSeqNo;
        }

        //更改二层子表中当前行对三层子表最大行的记录值;
        if (vjTableMeta.childNodes.length== 0)
        {
          var vsParentTableName= vjTableMeta.parentNode.getAttribute("tablename");
          if (vsParentTableName!= null)
          {
            var vjParentTableCurRow= getCurrentRow(vsParentTableName);
            if (vjParentTableCurRow!= null)
            {
              vjParentTableCurRow.setAttribute(tableName, viSeqNo);
            }
          }
        }
        else
        {
          //对于二层子表不用记录最大的 seqNo;
          //但要对三层子表的 effectfield 进行调整；leidh; 20040526;
          var vjChild3TableMeta= vjTableMeta.firstChild;
          var vsChild3TableName= vjChild3TableMeta.tablename;
          var vjChild3EditRow = document.getElementById(vsChild3TableName + "EditTable").rows[0];
          var viChild3SeqNoCol= -1;
          for(var a= 1; a< vjChild3EditRow.cells.length; a++)
          {
            var vsTmpField = vjChild3EditRow.cells[a].fieldname;
            if (isSameField(vsTmpField, vsSeqNoField))
            {
              viChild3SeqNoCol= a;
              break;
            }
          }

          //alert(viChild3SeqNoCol);
          if (viChild3SeqNoCol> 0)
          {
            var vjChild3TableBody= document.getElementById(vsChild3TableName + "BodyTable");
            //vaiSeqNo.sort();
            var viOldSeqNo= -1;
            var viNewSeqNo= -1;
            for (var a= 0; a< vjChild3TableBody.rows.length; a++)
            {
              var vjChild3SeqNoCell= vjChild3TableBody.rows[a].cells[viChild3SeqNoCol];
              var viChild3SeqNo= parseInt(vjChild3SeqNoCell.innerText);

              //记住老序号,不用每次都比较,用于加速;leidh;20040526;
              if (viChild3SeqNo!= viOldSeqNo)
              {
                viOldSeqNo= viChild3SeqNo;
                viNewSeqNo= viChild3SeqNo;
                for (var b= 0; b< vaiSeqNo.length; b++)
                {
                  if (viChild3SeqNo> vaiSeqNo[b]) viNewSeqNo--;
                }
              }
              vjChild3SeqNoCell.innerText= viNewSeqNo;
            }
          }
        }
      }
    //}

    //对不含行号的三层子表进行处理；leidh;20040531;
    if (viSeqNoCol< 0)
    {
      if (vjTableMeta.childNodes.length== 0)
      {
        var vsParentTableName= vjTableMeta.parentNode.getAttribute("tablename");
        if (vsParentTableName!= null)
        {
          var vjParentTableCurRow= getCurrentRow(vsParentTableName);
          if (vjParentTableCurRow!= null)
          {
            vjParentTableCurRow.setAttribute(tableName, "0");
          }
        }
      }
    }

    changed = true;
    fillTableColor(tableName);
    filterTable(tableName);
    colResize(tableName);
    var head = document.getElementById(tableName + "HeadTable");
    head.rows[0].cells[0+ viOffetColX].firstChild.checked = false;

  //恢复列宽.
	if (vkIsDeleteFirstTR && table.rows.length> 0)
	{
		table.style.width= vjHeadTable.offsetWidth;
	  var vjFirstTR= table.rows[0];
	  for (var i= 0; i< vjFirstTR.childNodes.length; i++)
	  {
	  	vjFirstTR.childNodes[i].style.width= vaiColWidth[i];
	  }
	}

    if (eval("typeof after_" + tableName + "_Del ==\"function\"")){
      eval("after_" + tableName + "_Del()");
    }
  }

}

function grid_Del2(){
	//alert("grid_Del2()");
  var active = document.activeElement;
  var tableName;
  var mainTableName = getMainTableName();
  if (active != null){
    var child1,child2;
    //tableName = active.getAttribute("tablename");
    tableName = active.getAttribute("tablename");
    if (active.hasChildNodes())
      child1 = active.firstChild;
    if ((child1 != null) && (child1.hasChildNodes())){
      tableName = child1.getAttribute("tablename");
      child2 = child1.firstChild;
    }
    if (child2 != null)
      tableName = child2.getAttribute("tablename");
    if ((tableName == null) || (tableName == "")){
      tableName = active.getAttribute("tablename");
    }
    //alert(active.outerHTML);
  }
  else
    return;

  if ((tableName == null) || (tableName == "")){
    for (var n = 1;n <= 9;n++){
      var areaName = "A" + n;
      var tabName;
      if (document.getElementById(areaName + "TD")){
        tabName = getActiveTab(areaName);
        if (tabName){
          tableName = getTabTable(tabName);
          break;
        }
      }
    }
  }
  if ((tableName != null) && (tableName != "") && (tableName != mainTableName)){
    //var tableName = "TEST_PJB";
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")
      == "true") return;
  if (eval("typeof " + tableName + "_Del ==\"function\"")){
    eval(tableName + "_Del()");
  }else{
    var rtn = true;
    if (eval("typeof before_" + tableName + "_Del ==\"function\"")){
      rtn = eval("before_" + tableName + "_Del()");
    }
    if(!rtn) return;
    var table = document.getElementById(tableName + "BodyTable");
    var vjHeadTable= document.getElementById(tableName + "HeadTable");


    for(var i=0;i< table.rows.length; ){
      if (table.rows[i].cells[0].firstChild.checked){
        deleteRow(table.rows[i]);
      }else{
        i++;
      }
    }

    if (eval("typeof after_" + tableName + "_Del ==\"function\"")){
      eval("after_" + tableName + "_Del()");
    }
  }
}

}

function gridRow_ClickF(){
  var tmpTD = event.srcElement;
  if(tmpTD.tagName.toLowerCase() == "td"){
      if((tmpTD.getAttribute("read") == "true")||
         (tmpTD.getAttribute("read") == true)) return;
  }
  if (event.srcElement.tagName.toLowerCase() != "td") return;
  if (event.srcElement.cellIndex == 0) return;
  if(!fieldChecked) return;
  var tmpChild = event.srcElement.firstChild;
  if(tmpChild != null){
    if(tmpChild.firstChild != null && tmpChild.firstChild.tagName.toLowerCase() != "span")
      return;
  }
  enterGridCell(event.srcElement);
}

function uneditGrid(tablename){
  var head = document.getElementById(tablename + "HeadTable");
  if (head.getAttribute("editing") == "y"){
    var fieldname = head.getAttribute("editingfield");
    //alert("in uneditGrid fieldname:" + fieldname + "---tablename:" + tablename);
    var curValue = getField(fieldname, tablename, false);
    var editTable = document.getElementById(tablename + "EditTable");
    var bodyTable = document.getElementById(tablename + "BodyTable");
    var row = parseInt(head.getAttribute("row"));
    var col = parseInt(head.getAttribute("col"));
    editTable.rows[0].cells[col].innerHTML = bodyTable.rows[row].cells[col].innerHTML;
    var element = document.getElementById(tablename + "_" + fieldname+'ID');
    if (element != null){
      var type = element.getAttribute("fieldType");
      var kilo = element.getAttribute("kiloStyle");
      if (type == "num"){
        if ((kilo == "true") || (kilo == true)){
              curValue = kiloStyle(curValue);
        }
      }
      if(type == "select"){
        var select = document.getElementById(tablename + "_" + fieldname+'IDS');
//        alert("uneditGrid curValue: " + curValue);
    		for(var m=0,n=select.options.length; m<n; m++){
      		var txt = select.options[m].text;
      		var code = select.options[m].value;
          if(code == curValue){
            curValue = "<span value=\"" + code + "\"></span><span value=\"" + txt + "\">" + txt + "</span>";
            break;
          }
    		}
      }
    }
    bodyTable.rows[row].cells[col].innerHTML = curValue;
    head.setAttribute("editing", "n");
//		setReadOnly(fieldname,isFieldReadOnly(fieldname,tablename),tablename);
  }
}

//解决取数页面数据量大的问题，初始化的时候速度明显加快
function gridColResize(tablename){
  if(tablename == null){return;}
  var gridBodyTable = document.getElementById(tablename + "BodyTable");
  var head = document.getElementById(tablename + "HeadTable");
  if (head.style.display == "none") return;
  var editTable = document.getElementById(tablename + "EditTable");
  var grid = document.getElementById(tablename + "Container");
  var gridBody = document.getElementById(tablename + "Body");
  gridBody.style.display = "";
  gridBodyTable.style.display = "";
  var temp = grid.style.width;
//  var temp = grid.clientWidth;
  gridBody.style.width = temp;
  //gridBody.style.width = "100%";//自动适应窗口的宽度；Leidh;20040331;
//  gridBodyTable.style.width = head.clientWidth;
  gridBodyTable.style.width = head.style.width;
  if (gridBodyTable.rows.length > 0){
    gridBodyTable.rows[0].cells[0].style.width = 30;
    d2 = new Date();
    for(var i=1,j=editTable.rows[0].cells.length; i<j; i++){
      var fieldName = editTable.rows[0].cells[i].getAttribute("fieldname");
      var cell = document.getElementById(tablename + "_" + fieldName + "Cell");
      if(cell.style.display != "none"){
        var tt = cell.width;
//        var offWidth = cell.offsetWidth;
        if(tt != 0){
//        if(offWidth != 0){
          gridBodyTable.rows[0].cells[i].style.display = "";
//          gridBodyTable.rows[0].cells[i].style.width = offWidth;
          gridBodyTable.rows[0].cells[i].style.width = parseInt(tt) + 2;
        }
      }
    }
    gridBody.style.top = head.clientHeight;
    gridBody.style.height = grid.clientHeight-head.clientHeight;
  }
  head.style.left = -gridBody.scrollLeft;
}


function setGridFieldsVisible(tablename, fieldsName, visible)
{
  var grid = document.getElementById(tablename + "BodyTable");
  if(grid == null) return;

  var head = document.getElementById(tablename + "HeadTable");
  var len = 0;

  for(var k = 0; k < fieldsName.length; k++)
  {
    fieldname = fieldsName[k];
    var doc = document.getElementById(tablename + "_" + fieldname + "Cell");
    if((visible) && doc.style.display == "") continue;
    if((!visible) && doc.style.display == "none") continue;

    if(visible)
    {
      len += parseInt(doc.width);
    }
    else
    {
      len -= parseInt(doc.width);
    }
    doc.style.display = visible?"":"none";
    document.getElementById(tablename + fieldname + "COL").style.display = visible?"":"none";
  }

  head.width = parseInt(head.width) + len;
  grid.style.width = head.clientWidth;
  //colResize(tablename);
}


function setParentCellWidth(td,width){
    var cells = new Array();
    var tableName = td.getAttribute("tablename");
    var x1 = width - 100;
    var parent = td.getAttribute("parent");
    while (parent != "null"){
      var parentCell = document.getElementById(tableName + "_" + parent + "Cell");
      cells[cells.length] = parentCell;
      parent = parentCell.getAttribute("parent");
    }
    for (var i=0; i<cells.length; i++){
      cells[i].style.width = cells[i].clientWidth + x1;
    }
  }

function deleteRows(tableName){
  var table = document.getElementById(tableName + "BodyTable");
  for(var i=0;i< table.rows.length; ){
    if (table.rows[i].cells[0].firstChild.checked){
      table.deleteRow(i);
    }else{
      i++;
    }
  }
  changed = true;
  fillTableColor(tableName);
  filterTable(tableName);
  colResize(tableName);
}

//--------------------------------------------------------------------
//获取表格的列序号编移；leidh; 20040511;
function getColIndexOffset(tableName)
{
  var vjHFillTD= document.getElementById(tableName + "_" + "HFill" + "Cell");
  if (vjHFillTD!= null) return 1;
  return 0;
}
//--------------------------------------------------------------------

function grid_Insert(){
      if(!fieldChecked) return;//zhangcheng 如果字段检查失败,就不能进行插入行的操作
  var tableName = event.srcElement.getAttribute("tablename");
  if (document.getElementById(tableName + "HeadTable").getAttribute("read")
      == "true") return;
  if (eval("typeof " + tableName + "_Insert ==\"function\"")){
    eval(tableName + "_Insert()");
  }else{
    var rtn = true;
    if (eval("typeof before_" + tableName + "_Insert ==\"function\"")){
      rtn = eval("before_" + tableName + "_Insert()");
    }
    if(!rtn) return;
    var tr = insertBlankRow(tableName);
  }
}

function insertBlankRow(tablename,flag){
  var currRow = getCurrentRow(tablename);
//如果得到的当前行号为null，执行‘增加’动作
  if (currRow == null)
    return addBlankRow(tablename,flag);
  var seqNo = currRow.rowIndex + 1;

  uneditGrid(tablename);
  newRow = null;
  var tableMeta = document.getElementById(tablename + "Meta");
  var effectFieldName = null;
  var effectFieldValue = null;

  if (tableMeta.getAttribute("effectField") == null){
    var c3Meta = tableMeta.firstChild;
    if (c3Meta != null){
      var c3EffectNo = -1;
      var c3Table = c3Meta.tablename;
      var c3Effect = c3Meta.effectField;
        if (c3Effect != null){
        var c3grid = document.getElementById(c3Table + "BodyTable");
        var c3tmpRow = document.getElementById(c3Table + "EditTable").rows[0];
        for (var i=1,j=c3tmpRow.cells.length; i<j; i++){
          if (isSameField(c3tmpRow.cells[i].fieldname), c3Effect){
            c3EffectNo = i;
            break;
          }
        }
        if (c3EffectNo > -1){
          for (var i=0; i<c3grid.rows.length; i++){
            var c3tmpCell = c3grid.rows[i].cells[c3EffectNo];
            tmpNo = parseInt(c3tmpCell.innerText) + 1;
            if (seqNo < tmpNo)
              c3tmpCell.innerText = tmpNo;
          }
        }
      }
    }
  }

  if (tableMeta.getAttribute("effectField") != null){
    parentTableMeta = tableMeta.parentNode;
    effectFieldName = tableMeta.getAttribute("effectField");
    effectFieldValue = getCurrentFieldValue(parentTableMeta.tablename,
        effectFieldName);
    changeCurrentThirdCount(tablename,1);
  }

  var seqField = null;
  seqFieldNo = -1;
  var grid = document.getElementById(tablename + "BodyTable");
	var tmpRow = document.getElementById(tablename + "EditTable").rows[0];
  for (var i=1,j=tmpRow.cells.length; i<j; i++){
    var tmpField = tmpRow.cells[i].fieldname;
    if (tmpField == null) continue;
    if (isSameField(tmpField,effectFieldName)) continue;
    if (isSameField(tmpField,selectFieldName)) continue;
    if (getInitial(tmpField,tablename,true) == "-999"){
      seqFieldNo = i;
      seqField = tmpField;
      break;
    }
  }

  c3SeqNo = -1;
  if (tableMeta.getAttribute("effectField") != null){
    if (seqFieldNo > -1)
      c3SeqNo = parseInt(currRow.cells[seqFieldNo].innerText);
  }

  if (effectFieldName != null && (effectFieldValue == null && !flag) ) return;
  var selectFieldValue = null;
  var selectFieldName = null;
  var valset = document.getElementById(tablename + "valueset");
  if(valset != null){
    selectFieldName = valset.getAttribute("valsetfield");
    for(var i = 1; i < valset.cells.length; i++){
      var img = valset.cells[i].firstChild.firstChild.firstChild.firstChild;
      if(img.firstChild.src.indexOf("left_select.gif") > 1){
        var id = img.firstChild.id;
        selectFieldValue = id.substring(0, id.length - 1);
      }
    }
  }

  newRow = cloneInsertRow(tablename, seqNo-1);

  if (c3SeqNo == -1){  //第二层
	  setRowInitial(tablename,newRow,effectFieldName,effectFieldValue,selectFieldName,selectFieldValue,seqNo);
  }else{  //第3层
	  setRowInitial(tablename,newRow,effectFieldName,effectFieldValue,selectFieldName,selectFieldValue,c3SeqNo);
  }

  var head = document.getElementById(tablename + "HeadTable");
  var viOffsetColX= getColIndexOffset();

  if (tableMeta.getAttribute("effectField") == null)
  {
    var vsThirdTableName= "";
    if (tableMeta.firstChild!= null) vsThirdTableName= tableMeta.firstChild.tablename;
    if (vsThirdTableName!= null && vsThirdTableName.length> 0 && newRow!= null)
    {
      newRow.setAttribute(vsThirdTableName, "0");
    }
  }

  if (seqFieldNo > -1){
    if (tableMeta.getAttribute("effectField") == null){
      for (var i=seqNo; i<grid.rows.length; i++){
        var tmpCell = grid.rows[i].cells[seqFieldNo];
        tmpNo = parseInt(tmpCell.innerText) + 1;
        tmpCell.innerText = tmpNo;
      }
    }else{
      for (var i=1,j=tmpRow.cells.length; i<j; i++){
        var tmpField = tmpRow.cells[i].fieldname;
        if (tmpField == null) continue;
        if (isSameField(tmpField,effectFieldName)){
          effectFieldNo = i;
          break;
        }
      }
      for (var i=seqNo; i<grid.rows.length; i++){
        var tmpCell = grid.rows[i].cells[seqFieldNo];
        if (grid.rows[i].cells[effectFieldNo].innerText == effectFieldValue){
          tmpNo = parseInt(tmpCell.innerText) + 1;
          tmpCell.innerText = tmpNo;
        }
      }
    }
  }

  newRow.cells[0+ viOffsetColX].firstChild.checked = head.rows[0].cells[0+ viOffsetColX].firstChild.checked;
  newRow.scrollIntoView();
  var imgs = head.getElementsByTagName("img");
  for (var i=0,j=imgs.length; i<j; i++){
    imgs.item(i).setAttribute("src","/style/img/main/blank.gif");
  }
  changed = true;
  fillTableColor(tablename);
  filterTable(tablename);
  colResize(tablename);

	//设置当前行号； 20040714
  head.setAttribute("row",newRow.rowIndex);

  if(!flag){
    if (eval("typeof after_" + tablename + "_Insert ==\"function\"")){
      eval("after_" + tablename + "_Insert()");
    }
  }
  return newRow;

}

function cloneInsertRow(tableName, rowNo){
  uneditGrid(tableName);
  var grid = document.getElementById(tableName + "BodyTable");
  var trParent = grid.firstChild.nextSibling;
  tr = grid.rows[0].cloneNode(true);
  trParent.insertBefore(tr, grid.rows[rowNo]);
  tr.onclick = gridRowClick;
  tr.style.display = "";
  for(var i = 1, j = tr.cells.length; i < j; i++){
    tr.cells[i].setAttribute("read", false);
  }
  return tr;
}

/**
*导出页面子表数据到EXCEL中,wtm,20040805
*适用于取数页面，需传入tableName；
*/
function gridExport(tableName , isGrid){
	var numGrid;
	if(!isGrid) numGrid = 2;
	else numGrid = 1;
//  var tablename = document.getElementById("maintable").childNodes[0].getAttribute("tableName");
  var data;
  var dataArr= new Array();
  var dataArrlen= 0;
  if (eval("typeof " + tableName + "_setHead ==\"function\"")){
     dataArr[dataArrlen]= eval(tableName + "_setHead()"); 
     dataArrlen++;
     //data = eval(tableName + "_setHead()");
  }else{
     dataArr[dataArrlen]= getheadTableExport(tableName, numGrid); 
     dataArrlen++;
     //data = getheadTableExport(tableName, numGrid);
  }
  if (tableName != "A3" || !document.getElementById("gridfirstpageID")){
     dataArr[dataArrlen]= getAllRowsData(tableName, numGrid); 
     dataArrlen++;
     //data += getAllRowsData(tableName, numGrid);
  }else{
     dataArr[dataArrlen]= getAllPagesData(tableName, numGrid); 
     dataArrlen++;
     //data += getAllPagesData(tableName, numGrid);
  }
  data= dataArr.join("");
  exportFrame.document.open("text/html","replace");
  exportFrame.document.charset="gb2312";
  exportFrame.document.writeln(data);
  exportFrame.document.close();
  exportFrame.focus();
  var filename = "fwatch_"
  var dt = new Date();
  var month = (parseInt(dt.getMonth(),10)+1).toString(10);
  filename += dt.getYear() + "-" + month + "-" +dt.getDate() + ".xls";
  exportFrame.document.execCommand('SaveAs',false,filename);
}

/**
*得到所有子表列名,wtm,20040805
*/
function getheadTableExport(tableName, numGrid){
	var head = document.getElementById(tableName + "HeadTable");
	var result = "";
	var tabhead= new Array();
	var headlen= 0 ;
  for(var i = numGrid , j = head.rows[0].cells.length ; i < j ; i++){
  	var s = head.rows[0].cells[i].innerText.indexOf("*");
  	if (s!=-1){
  	  tabhead[headlen]= head.rows[0].cells[i].innerText.substring(0, s)+ "\t";
  	  headlen++;
  		//result += head.rows[0].cells[i].innerText.substring(0, s)+ "\t";
  	}else{
  	  tabhead[headlen]= head.rows[0].cells[i].innerText + "\t";
  	  headlen++;
		//result += head.rows[0].cells[i].innerText + "\t";
	  }

  }
  tabhead[headlen]= "\r\n";
  headlen++;
	//result += "\r\n";
	result= tabhead.join("");
  return result;
}

/**
*得到子表所有记录,wtm,20040805
*/
function getAllRowsData(tableName, numGrid){
	var result = "";
	var rows = getAllRows(tableName);
	for(var i = 0, j = rows.length; i < j; i++){
		for(var x = numGrid, y = rows[i].cells.length; x < y; x++){
			var valueTemp = parseInt(rows[i].cells[x].innerText,10) ;
			if(isNaN(valueTemp) == false){
                            if (!(rows[i].cells[x].innerText.indexOf(".") < 0 )){
                               result += parseFloat(rows[i].cells[x].innerText) + "\t";
                            }else{
                                 if (rows[i].cells[x].innerText.length > 15){
                                    result += "'"+rows[i].cells[x].innerText + "\t";
                                 }else{
                                    result += rows[i].cells[x].innerText + "\t";
                                 }
                            }
			}else{
         result += rows[i].cells[x].innerText + "\t";
		  }
		}
    result +=" \r\n";
	}
	return result;
}

/**
*得到子表所有记录（分页显示时） Tangxn 2005-01-17
*/
function getAllPagesData(tableName, numGrid){
  var result = "";
  var rows = getAreaTabData(tableName);
  var record= new Array();
	var reclen= 0;
  var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
  xmlDom.loadXML(rows);
  var root=xmlDom.getElementsByTagName("entity");
  for(var i=0,l=root.length; i<l; i++){
    var fields=root[i].childNodes;
    for(var j=0,jl=fields.length; j<jl; j++){
      value=fields[j].getAttribute("value");
      var valueTemp = parseInt(value, 10) ;
      if(isNaN(valueTemp) == false){
        if (!(value.indexOf(".") < 0 )){
          record[reclen]= parseFloat(value) + "\t";
          reclen++;
          //result += parseFloat(value) + "\t";
        }else{
          if (value.length > 15 )
           record[reclen]= "'" + value + "\t";
          else 
           record[reclen]=  value + "\t";
          reclen++;
          //result += "'" + value + "\t";
        }
      }else{
          record[reclen]= value + "\t";
          reclen++;
        //result += value + "\t";
      }
    }
          record[reclen]= " \r\n";
          reclen++;
    //result +=" \r\n";
  }
  result= record.join("");
  return result;
}

//A3区域导出。wtm,20050308
function gridA3Export(tableName,secondlever,thirdlever){
  //需传入的参数  var secondlever = new Array("VOU_MONTH","VOU_DAY");//二层字段
  //var thirdlever = new Array();//三层字段
  //解析多层表头
  var headfirst = new Array();
  var headsecond = new Array();
  var headthird = new Array();	
  var firlen = 0;
  var secleng = 0;
  var thirdlen = 0;
  var xmlDom = new ActiveXObject("Microsoft.XMLDOM");

  xmlDom.loadXML(gridexp);
  var deltaNode = xmlDom.documentElement;
  if (deltaNode.hasChildNodes){
     var childlength = deltaNode.childNodes.length;
     var entityNode = deltaNode.childNodes;
     for (i=0;i<childlength;i++){       
       var fieldcap = "";
       var fieldname = "";
       var fieldNode = entityNode.item(i).childNodes;
       if (fieldNode.length == 4){
       	 for (j=0;j<4;j++){
       	   if (fieldNode.item(j).getAttribute("name")=="NAME"){
       	     fieldcap = fieldNode.item(j).getAttribute("value");
       	     fieldname = fieldcap;
       	   }
       	   if (document.getElementById(tableName+"_"+fieldcap+"CaptionID")){
             fieldcap = document.getElementById(tableName+"_"+fieldcap+"CaptionID").innerHTML;
           }  
       	   break;
       	 }
       	             
       }else{
         for (j=0;j<5;j++){
           if (fieldNode.item(j).getAttribute("name")=="NAME"){
              fieldname = fieldNode.item(j).getAttribute("value");
              continue;
           }
           if(fieldNode.item(j).getAttribute("name")=="CAPTION"){
              fieldcap = fieldNode.item(j).getAttribute("value");
              continue;
           }
         }      
       }
       if (fieldname == "null" || fieldcap == "null") continue;
       if (checkStringInArray(fieldname,secondlever)||checkStringInArray(fieldcap,secondlever)){
         if (!checkStringInArray(fieldcap,headsecond)){
       	  //判断该name是否在参数数组中(二层),在且二层head表中无放入headsecond[i]={[0][0][0]}
       	  headsecond[secleng]= new Array();
       	  headsecond[secleng][0]= fieldNode.item(1).getAttribute("value");
       	  headsecond[secleng][1]= fieldNode.item(2).getAttribute("value");
       	  headsecond[secleng][2]= fieldcap;
       	  headsecond[secleng][3]= fieldname;
       	  secleng++;  
       	  continue;
        }else{//在二层中，且二层head表中有,判断是否name也相同，相同继续。不同放入headsecond
          if (!checkStringInArray(fieldname,headsecond,true)){
            headsecond[secleng]= new Array();
       	    headsecond[secleng][0]= fieldNode.item(1).getAttribute("value");
       	    headsecond[secleng][1]= fieldNode.item(2).getAttribute("value");
       	    headsecond[secleng][2]= fieldcap;
       	    headsecond[secleng][3]= fieldname;
       	    secleng++;  
       	    continue;
          }
          continue;        
        }
       }else if (checkStringInArray(fieldname,thirdlever)){
       //判断该name是否在数组中(三层)，在放入headthird[i]={[0][0][0]}
        headthird[thirdlen]= new Array();
       	headthird[thirdlen][0]= fieldNode.item(1).getAttribute("value");
       	headthird[thirdlen][1]= fieldNode.item(2).getAttribute("value");
       	headthird[thirdlen][2]= fieldcap;
       	thirdlen++;  
       	continue;
       }
       if (!checkStringInArray(fieldcap,headfirst)){       	      
       //不在的话看一维中是否有该列，没有则放入 headfirst[i]={[0][0][0]} 
       //多表头重复行
        if (fieldcap.length== 0) continue;
        headfirst[firlen]= new Array();
       	headfirst[firlen][0]= fieldNode.item(1).getAttribute("value");
       	headfirst[firlen][1]= fieldNode.item(2).getAttribute("value");
       	headfirst[firlen][2]= fieldcap;
       	firlen++;
       	continue;  
       }
     } 
  }

  var data = "";
  data +="<HTML><HEAD><TITLE>EXCEL报表</TITLE>\n";
  data +="<META http-equiv=Content-Type content='text/html; charset=gb2312'>\n";
  data +="</HEAD>";
  data +="<BODY>";
 
  data +="<TABLE cellSpacing=0 align='center' style='font-size:20px' cellPadding=0 width=20000 border=0 id='HeadTitleID'>\n";
  data +="<TBODY>\n";

  data +="<TR>\n";
  var halfFirstHeadLeng = Math.round(headfirst.length/2);
  for (i=0;i<halfFirstHeadLeng;i++){
    data +="<TD></TD>\n";
  }
  data +="<TD class=Normal style='word-break:break-all' bgcolor='' width=100";
  data +=" rowspan=1 colspan=5>";
  var tit = document.getElementById("HeadTitleID").innerHTML;
  if (tit == null || tit.length == 0) {
  	tit = document.all.HeadTitleID.value;	
  }
  if (expHead!=null && expHead.length > 0){
    data +=expHead+tit+"</TD>\n";
  }else{
    data +=tit+"</TD>\n";
  }
  data +="</TR>\n";
  data +="</TBODY>\n";
  data +="</TABLE>\n";
  data +="<TABLE cellSpacing=0 align='center' style='font-size:14px' cellPadding=0 width=20000 border=1 id='Table1'>\n";
  data +="<TBODY>\n";

  data +="<TR>\n";
  for (i=0;i<headfirst.length;i++){
    data +="<TD align='center' class=Normal style='word-break:break-all' bgcolor='#C6C3C6' width=100";
    data +=" rowspan="+headfirst[i][0]+" colspan="+headfirst[i][1]+">";
    data +=headfirst[i][2]+"</TD>\n";
  }
  data +="</TR>\n";
  if (headsecond.length > 0){
    data +="<TR>\n";
        for (k=0;k<headsecond.length;k++){
          data +="<TD align='center' class=Normal style='word-break:break-all' bgcolor='#C6C3C6' width=100";
          data +=" rowspan="+headsecond[k][0]+" colspan="+headsecond[k][1]+">";
          data +=headsecond[k][2]+"</TD>\n";
        }
    data +="</TR>\n";
  }
  if (headthird.length > 0){
     data +="<TR>\n";
        for (k=0;k<headthird.length;k++){
          data +="<TD align='center' class=Normal style='word-break:break-all' bgcolor='#C6C3C6' width=100";
          data +=" rowspan="+headthird[k][0]+" colspan="+headthird[k][1]+">";
          data +=headthird[k][2]+"</TD>\n";
        }
    data +="</TR>\n";
  }
  data +="</TBODY>\n";
  data +="</TABLE>\n";
  data +="<TABLE cellSpacing=0 align='center' style='font-size:14px' cellPadding=0 width=20000 border=1 id='Table1'>\n";
  data +="<TBODY>\n";

  //var rows = getAllRows(tableName);
  var hasfill = false;
  var numgrid =0;
  if (document.getElementById(tableName+"HFillField")) numgrid++;
  if (document.getElementById(tableName+"CHKField")) numgrid++;
  if (document.getElementById(tableName+"TFillField")) hasfill = true;
  if (document.getElementById("gridfirstpageID")){
	  var rows = getAreaTabData(tableName);
	  var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
	  xmlDom.loadXML(rows);
	  var root=xmlDom.getElementsByTagName("entity");
	  var dataArr= new Array();
	  var dataArrlen= 0;
	  for(var i=0,l=root.length; i<l; i++){
	    var fields=root[i].childNodes;
	    dataArr[dataArrlen]= "<TR>\n";
	    dataArrlen++;
	    //data +="<TR>\n";
	    for(var j=0,jl=fields.length; j<jl; j++){
	      value=fields[j].getAttribute("value");
	      var valueTemp = parseInt(value, 10) ;
	      if(isNaN(valueTemp) == false){
	        if (!(value.indexOf(".") < 0 )){
	          result= parseFloat(deleteComma(value));
	        }else{
            result= "'"+value;
	        }
	      }else{
	        result= value ;
	      }
	      dataArr[dataArrlen]= "<TD class=Normal style='word-break:break-all' width=100>"+result+"</TD>\n";
	      dataArrlen++;
			  //data +="<TD class=Normal style='word-break:break-all' width=100>";
	      //data +=result+"</TD>\n";      
	    }
	    dataArr[dataArrlen]= "</TR>\n";
	    dataArrlen++;
	    //data +="</TR>\n";
	  }
	  data+=dataArr.join("");
	}else{
		  var rows = getAllRows(tableName);
		  for(var i = 0, j = rows.length; i < j; i++){
		     	        data +="<TR>\n";
		     	        if (hasfill){
		     	          collen = rows[i].cells.length-1;
		     	        }else{
		     	          collen = rows[i].cells.length;
		     	        }
				for(var x = numgrid, y = collen; x < y; x++){
					var valueTemp = parseInt(rows[i].cells[x].innerText,10) ;
					if(isNaN(valueTemp) == false){
		                            if (!(rows[i].cells[x].innerText.indexOf(".") < 0 )){
		                                 result = parseFloat(deleteComma(rows[i].cells[x].innerText)) ;
		                            }else{
		                                 result = ""+rows[i].cells[x].innerText ;
		                            }
					}else
					   result = rows[i].cells[x].innerText ;
				       data +="<TD class=Normal noWrap width=100>";
		                       data +=result+"</TD>\n";
				}
				data +="</TR>\n";
		  }
	}
  data +="</TBODY>\n"+ "</TABLE>\n"+ "</body>\n"+ "</HTML>";
  //data +="</TABLE>\n";
  //data +="</body>\n";
  //data +="</HTML>";
  expExcelSave(data,tit);

}

//判断字符串name是否在数组filenames中，是，返回：true；
function checkStringInArray(name,filenames,twlel){	
  var leng = filenames.length;
  if (leng==0 || name.length==0){
    return false;
  }
  var compname = "";
  if (twlel){
    for (i=0;i<leng;i++){
      compname = filenames[i][3];
      if (name==compname){
        return true;
      }
    }
    return false;	
  }else{
    for (i=0;i<leng;i++){
      if (filenames[i][2]){
    	compname = filenames[i][2];
      }else{
        compname = filenames[i];
      }  
      if (name==compname){
        return true;
      } 
    }
  }
  return false;
}

//保存导出的数据。wtm20040308
function expExcelSave(data,title){
  exportFrame.document.open("text/html","replace");
  exportFrame.document.charset="gb2312";
  exportFrame.document.writeln(data);
  exportFrame.document.close();
  exportFrame.focus();
  var filename = title+"_";
  var dt = new Date();
  var month = (parseInt(dt.getMonth(),10)+1).toString(10);
  filename += dt.getYear() + "-" + month + "-" +dt.getDate() + ".xls";
  exportFrame.document.execCommand('SaveAs',false,filename);
}

function showNone(){
	event.returnValue = false;
}

function highlightie5(){
	if (event.srcElement.className=="menuitems"){
		event.srcElement.style.backgroundColor="highlight";
		event.srcElement.style.color="white";
	}
}

function lowlightie5(){
	if (event.srcElement.className=="menuitems"){
		event.srcElement.style.backgroundColor="";
		event.srcElement.style.color="black";
		window.status='';
	}
}

function clickMenu(){
	event.cancelBubble = true;
}

function menuEvent(tableName){
	var popMenu = document.getElementById("popTable");
	if (popMenu== null) return false;//leidh;20040604;

  //复杂表头不锁定，也不隐藏；leidh; 20040427;
  var vjHeadTable= null;
  if ((typeof head)!= "undefined") vjHeadTable= head;
  if (vjHeadTable== null) vjHeadTable = document.getElementById(tableName + "HeadTable");
  //alert(vjHeadTable.rows.length);
  if (vjHeadTable== null) return false;
  if (vjHeadTable.rows.length!= 1) return false;

	if(event.button == 2){
		createMenu(tableName);
		showmenu();
	}
}

function deleteMenuItem(){
	var popMenu = document.getElementById("popTable");
	while(popMenu.rows.length > 2){
		popMenu.deleteRow(2);
	}
}

var menuHeight = 0;
var menuWidth = 0;
function createMenu(tableName)
{
	deleteMenuItem();
	menuHeight = 20;
	menuWidth = 20;
	maxWidth = 0;

	var popMenu = document.getElementById("popTable");
	var cols = document.getElementById(tableName + "ColTable").rows[0];
	popMenu.sTableName= tableName;
  createMenuItem(tableName);
}

function createMenuItem(tableName)
{
	deleteMenuItem();
	menuHeight = 20;
	menuWidth = 20;
	maxWidth = 0;

	var popMenu = document.getElementById("popTable");
	var cols = document.getElementById(tableName + "ColTable").rows[0];

	var vjLockOption= document.getElementById("__U_PopMenu_LockOption");
	var vjHideOption= document.getElementById("__U_PopMenu_HideOption");

	var chkHTML = "<input type=\"checkbox\" onclick=\"selectItem('" + tableName + "')\" checked></input>";
	var unChkHTML = "<input type=\"checkbox\" onclick=\"selectItem('" + tableName + "')\"></input>";

	for (var i = 2;i<cols.cells.length - 1; i++)
	{
    var vjHeadFieldTD = document.getElementById(tableName + "_" + cols.cells[i].field + "Cell");

		var newItem = popMenu.insertRow(-1);
		var cell = newItem.insertCell(-1);

		if (vjLockOption.checked== true && cols.cells[i].locked == "true")
		{
			cell.innerHTML = chkHTML;
		}
		else
		{
      if (vjHideOption.checked== true && vjHeadFieldTD.U_Hidden == true)
      {
		  	cell.innerHTML = chkHTML;
		  }
	  	else
		  {
		  	cell.innerHTML = unChkHTML;
		  }
		}
		cell.field = cols.cells[i].field;
		cell = newItem.insertCell(-1);

		cell.style.fontSize = "12px";
		cell.innerHTML = cols.cells[i].innerHTML;
    // 20040806 setListFieldVisible
    if (vjHeadFieldTD.V_Hidden == true){
      newItem.style.display = "none";
      continue;
    }

		menuHeight = menuHeight + 20;
		var curWidth = cols.cells[i].innerHTML.length * 12;
		if (curWidth > maxWidth ){ maxWidth = curWidth; }
	}

	menuWidth += maxWidth;
}

function selectFuncOption()
{
	var popMenu = document.getElementById("popTable");
	var vjLockOption= document.getElementById("__U_PopMenu_LockOption");
	var vjHideOption= document.getElementById("__U_PopMenu_HideOption");
	createMenuItem(popMenu.sTableName);
}

function selectItem(tableName)
{
	var popMenu = document.getElementById("popTable");
	var vjLockOption= document.getElementById("__U_PopMenu_LockOption");
	var vjHideOption= document.getElementById("__U_PopMenu_HideOption");


	if (vjLockOption.checked== true)
	{
		if (event.srcElement.checked){
			var maxIndex = event.srcElement.parentNode.parentNode.rowIndex;
			for(var i = 2; i < maxIndex; i++){
				popMenu.rows[i].cells[0].firstChild.checked = true;
			}
		}else{
			var minIndex = event.srcElement.parentNode.parentNode.rowIndex;
			for(var i = minIndex; i < popMenu.rows.length; i++){
				popMenu.rows[i].cells[0].firstChild.checked = false;
			}
		}
	}
	applyLock(tableName);
	event.cancelBubble = true;

	return true;
}

function applyLock(tableName)
{
	var vjLockOption= document.getElementById("__U_PopMenu_LockOption");
	var vjHideOption= document.getElementById("__U_PopMenu_HideOption");

	var cols = document.getElementById(tableName + "ColTable").rows[0];
	var popMenu = document.getElementById("popTable");

	var vjCell= null;
	var vjHeadFieldTD= null;

	for (var i = 2; i < cols.cells.length - 1; i++)
	{
		vjCell= popMenu.rows[i].cells[0];
    vjHeadFieldTD = document.getElementById(tableName + "_" + vjCell.field + "Cell");
		//cols.cells[i].locked = "" + popMenu.rows[i-1].cells[0].firstChild.checked;

		if (vjLockOption.checked== true)
		{
		  cols.cells[i].locked = "" + vjCell.firstChild.checked;
		}
		else if (vjHideOption.checked== true)
		{
		  if (vjCell.firstChild.checked== true)
		  {
		    setGridFieldVisible(tableName,vjCell.field,false,false);
  		  vjHeadFieldTD.U_Hidden = true;
		  }
		  else
		  {
  		  vjHeadFieldTD.U_Hidden = false;
		    setGridFieldVisible(tableName,vjCell.field,true,false);
		  }
		}
	}
}

function showmenu(){
	var rightedge = document.body.clientWidth;
	var bottomedge = document.body.clientHeight;
	var clickX = event.clientX;
	var clickY = event.clientY;
	var menuX, menuY;
	if(clickX >= menuWidth){
		if((clickX + menuWidth) > rightedge)
			menuX = clickX - menuWidth;
		else
			menuX = clickX;
	}else
		menuX = clickX;
	if(clickY >= menuHeight){
		if((clickY + menuHeight) > bottomedge)
			menuY = clickY - menuHeight;
		else
			menuY = clickY;
	}else
		menuY = clickY;

	ie5menu.style.top = menuY + document.body.scrollTop;
	ie5menu.style.left = menuX + document.body.scrollLeft;
	ie5menu.style.visibility = "visible";

  //调整弹出式菜单的尺寸和位置；leidh; 20040525;
	popmenu_adjustSize();
	return false;
}

function hidemenuie5(){
	ie5menu.style.visibility="hidden"
}

//调整弹出式菜单的尺寸和位置；leidh; 20040525;
function popmenu_adjustSize()
{
  var vjBody= document.getElementsByTagName("body").item(0);
  var vjMenuDiv= document.getElementById("ie5menu");
  var vjMenuTA= document.getElementById("popTable");

  var viFitHeight= vjMenuTA.offsetHeight+ 4;
  var viWinHeight= vjBody.offsetHeight;
  //alert(viWinHeight);
  if (viFitHeight> viWinHeight)
  {
    vjMenuDiv.style.height= viWinHeight- 10;
    vjMenuDiv.style.width= vjMenuTA.offsetWidth+ 20;
    vjMenuDiv.style.top= 2;
    vjMenuDiv.style.overflow= "auto";
  }
  else
  {
    vjMenuDiv.style.height= viFitHeight;
    vjMenuDiv.style.width= vjMenuTA.offsetWidth+ 4;
    if (vjMenuDiv.offsetTop+ vjMenuDiv.offsetHeight> viWinHeight)
    {
      vjMenuDiv.style.top= viWinHeight- vjMenuDiv.offsetHeight- 4;
    }
    vjMenuDiv.style.overflow= "hidden";
  }

  return true;
}

function setPopMenuItemVisible(tableName, fieldName, isVisible){
  var temp = document.getElementById(tableName + "_" + fieldName + "Cell");
  if(!temp) return;
  temp.V_Hidden = !isVisible;
}

function setPopMenuItem_HideChecked(tableName, fieldName, isChecked, isColResize){
  var temp = document.getElementById(tableName + "_" + fieldName + "Cell");
  if(!temp) return;
  setGridFieldVisible(tableName, fieldName , !isChecked, !isColResize);
  temp.U_Hidden = isChecked;
}

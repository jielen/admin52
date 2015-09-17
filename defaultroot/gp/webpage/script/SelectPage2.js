var _oGrid= null;
var _tIsMultiSel= false;

function SelectPage2_init(){
  //alert("SelectPage2_init();");
  var vsKey= "U_SelectGrid";
  _oGrid= PageX.getCtrlObj(vsKey);
  //_oGrid.tIsMultiSel= _tIsMultiSel;
  
  submitID.onclick= SelectPage2_submit_Click;
  searchID.onclick= SelectPage2_search_Click;
  _oGrid.addListener(new Listener(_oGrid.OnRowDblClick, SelectPage2_oGrid_OnRowDblClick, this));
  return true;
}

function SelectPage2_resize(){
  //alert(window.dialogWidth);
  _oGrid.oRect.setLeft(10);
  _oGrid.oRect.setTop(50);
  _oGrid.oRect.setWidth(parseInt(window.dialogWidth)- _oGrid.oRect.getLeft()*2- 6);
  _oGrid.oRect.setHeight(parseInt(window.dialogHeight)- _oGrid.oRect.getTop()- 30);
  _oGrid.resize();
}

function SelectPage2_makeReturnValue(){
  //alert("SelectPage2_makeReturnValue();");
  var vaxxValue= _oGrid.getSelected();
  if (vaxxValue== null)	{returnValue= false; return;}
	returnValue = new Array();
	returnValue[0] = _oGrid.asFieldName;
  if (_tIsMultiSel) returnValue[1] = vaxxValue;
  else returnValue[1] = vaxxValue[0];
  return;
}

function SelectPage2_submit_Click(){
  //alert("SelectPage2_submit_Click();");
  SelectPage2_makeReturnValue();
  close();
}

function SelectPage2_search_Click(){
}

function SelectPage2_oGrid_OnRowDblClick(oSender, oRow, oEvent){
  SelectPage2_submit_Click();
}

function closeSelectPage(){
  if(isSelectRow == false) returnValue = false;
}

document.onkeydown= function(){
  if (event.shiftKey) return;
  var viKey= event.keyCode;
  switch(viKey){
    case 27: //Esc;
      if (event.ctrlKey || event.altKey) return;
      window.close();
      break;
    case 88: //X;
      if (event.ctrlKey || event.altKey== false) return;
      window.close();
      break;
    case 13: //enter;
      if (event.ctrlKey== false || event.altKey) return;
      _oGrid.setFocus();
      break;
  }
};



/*
var isSelectRow = false;

function gridRow_Click(rowIndex) {
  if (head.rows[0].cells[1].style.display != "none") return;
	var names = new Array();
	var values = new Array();
  var fields = entityMeta.getElementsByTagName("field");
	for (var i = 0; i < fields.length; i++) {
		names[i]= fields.item(i).getAttribute("name");
		values[i] = gridBodyTable.rows[rowIndex]
            .cells[parseInt(fields.item(i).getAttribute("no")) + COLUMN_OFFSET].innerHTML;
		values[i] = values[i].replace(/&nbsp;/g," ");
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
  var fields = entityMeta.getElementsByTagName("field");
  
  for (var i = 0; i < fields.length; i++) {
  	
    names[i]= fields.item(i).getAttribute("name");
  }
  for (var i=0,j=rows.length; i<j; i++){
    values[i] = new Array();
    for (var m=0,n=fields.length; m<n; m++){
      values[i][m] = rows[i][m];  
       
    
      //values[i][m] = rows[i].cells[parseInt(fields.item(m).getAttribute("no")) + COLUMN_OFFSET].innerHTML;
			//values[i][m] = values[i][m].replace(/&nbsp;/g," ")
    }
  }
  returnValue = new Array();
  returnValue[0] = names;
  returnValue[1] = values;
  isSelectRow = true;
  close();
}

function fadd() {
  var condition = "1=0";
  var fieldValue = getEntityName() + "_E";
  if (getEntityName().toUpperCase() == "FA_CARD"){
    var win = showModalDialog("selectLb.htm","",
    "resizable:no;dialogHeight:120px;dialogWidth:200px;help:no");
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

    var win_edit = open("","",
                        "menubar=no,scrollbars=no,status=no,toolbar=no,"
                        + "resizable=yes,titlebar=yes,scrollbars=yes,"
                        + "height=" + (screen.availHeight - 30) + ",width="
                        + (screen.availWidth - 10) + ",top=0,left=0");
    win_edit.location.href = "Proxy?function=geteditpage&condition=1=0" +
                             "&componame=" + entityname +
                             "&fieldvalue=" + "&unique=";
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
//*/



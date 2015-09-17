var _oTree= null;
var _tIsMultiSel= false;

function SelectTreePage2_init(){
  //alert("SelectTreePage2_init();");
  var vsKey= "U_SelectTree";
  _oTree= PageX.getCtrlObj(vsKey);
  _oTree.collapseLevel(1);
  
  submitID.onclick= SelectTreePage2_submit_Click;
  searchID.onclick= SelectTreePage2_search_Click;
  _oTree.addListener(new Listener(_oTree.OnNodeDblClick, SelectTreePage2_oTree_OnNodeDblClick, this));
  return true;
}

function SelectPage2_resize(){
  //alert(window.dialogWidth);
  _oTree.oRect.setLeft(10);
  _oTree.oRect.setTop(50);
  _oTree.oRect.setWidth(parseInt(window.dialogWidth)- _oTree.oRect.getLeft()*2- 6);
  _oTree.oRect.setHeight(parseInt(window.dialogHeight)- _oTree.oRect.getTop()- 40);
  _oTree.resize();
}

function SelectTreePage2_makeReturnValue(){
  //alert("SelectTreePage2_makeReturnValue();");
  var voNode= _oTree.getCurNode();
  if (voNode== null)	{
  	returnValue= null; 
  	return;
  }
  
  /*
  var vsTable= _oTree.getNodeTable(voNode);
  var vsKey= _oTree.getNodeKey(voNode);
  var voParamMeta= _oTree.getTableParamMeta(vsTable);
  var voRow= _oTree.oDataXML.documentElement.selectSingleNode("data/"+ vsTable+ "/rowset/row["+ voParamMeta.sKeyField+ "='"+ vsKey+ "']");
  var vasField= new Array();
  var vasValue= new Array();
  
  for (var i= 0; i< voRow.childNodes.length; i++){
    vasField[i]= voRow.childNodes[i].nodeName;
    vasValue[i]= voRow.childNodes[i].text;
  }
  //*/
  var voRowMap= _oTree.getNodeData(voNode);
  if (voRowMap== null) return;
  var vasField= voRowMap.getAllKey();
  var vasValue= voRowMap.getAllItem();
  
  returnValue = new Array();
  returnValue[0] = vasField;
  returnValue[1] = vasValue;
  //alert(returnValue[0]+"  ,  "+returnValue[1]);
  return;
}

function SelectTreePage2_submit_Click(){
  //alert("SelectTreePage2_submit_Click();");
  SelectTreePage2_makeReturnValue();
  var voNode= _oTree.getCurNode();
  if (_oTree.isRootNode(voNode)) return;
  close();
}

function SelectTreePage2_search_Click(){
}

function SelectTreePage2_oTree_OnNodeDblClick(oSender, oNode, oEvent){
  SelectTreePage2_submit_Click();
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
      _oTree.setFocus();
      break;
  }
};


/*
var isSelectRow = false;

function TreeRow_Click(rowIndex) {
  if (head.rows[0].cells[1].style.display != "none") return;
	var names = new Array();
	var values = new Array();
  var fields = entityMeta.getElementsByTagName("field");
	for (var i = 0; i < fields.length; i++) {
		names[i]= fields.item(i).getAttribute("name");
		values[i] = TreeBodyTable.rows[rowIndex]
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



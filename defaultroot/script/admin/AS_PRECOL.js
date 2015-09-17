/**********************************************************
 * 模块：自定义预留字段
 * 修改时间：2003-3-17
 * 修改描述：为了使预留字段设置在各个子系统单独进行。需要平
 * 台对现有方式进行一下改造：方案如下：
 * 抽象一函数，该函数的参数是：
 * 1）表名。当给定表时，在界面上就不允许下拉表名（选择表名的
 * 下拉框隐藏），这个参数为为空时，允许选择表名。
 * 2）数据类型。数据类型分别为num,text,date,当给定时，隐藏该
 * 下拉框，当这个参数为空时，允许先择数据类型。
 * 3）是否显示选择值集。当为Y时，中间的选择值集可见，否则不
 * 可见。默认为Y。
 * 这个函数做出来之后，原来的“预留字段设置”部件保留，并用
 * 新的函数替代（三个参数均为空）。
 *********************************************************/

/**********************************************************
 * 选择部件或字段类型
 * 修改时间：2003-3-4
 * 修改描述：设置部件及字段类型的显示
 * 修改时间：2003-3-17
 *********************************************************/

function PRECOL_change(){
//  var indexCompoId = PRECOL.COMPOID.selectedIndex;
//  var compoId = PRECOL.COMPOID.options[indexCompoId].value;
//  var indexDataItemType = PRECOL.DATAITEMTYPE.selectedIndex;
//  var dataItemType = PRECOL.DATAITEMTYPE.options[indexDataItemType].value;
   var tabId = PRECOL.TABID.value;
   var dataItemType = PRECOL.DATAITEMTYPE.value;
   var vsEnable = PRECOL.VSENABLE.value;
   var vsNameEnable =PRECOL.VSNAMEENABLE.value;
   if(tabId==""){
     alert("请选择预留字段的表");
   }
   else{
     if(parent.mainFrame.isChanged()){
       if(confirm("页面数据已经改变，是否保存?"))dsave();parent.mainFrame.location.href="dispatcher.action?function=main&TABID="+tabId+"&DATAITEMTYPE="+dataItemType+"&VSENABLE="+vsEnable+"&VSNAMEENABLE="+vsNameEnable;
     }
     else{
       parent.mainFrame.location.href=Base64.encodeUrl("dispatcher.action?function=main&TABID="+tabId+"&DATAITEMTYPE="+dataItemType+"&VSENABLE="+vsEnable+"&VSNAMEENABLE="+vsNameEnable);
     }
   }
}


/***********************************************************
 * 复选框点击改变状态
 ***********************************************************/
function checkbox_click(){
  var objInput = event.srcElement;
  var status = false;
  if(objInput.checked){
    status = false;
  }
  else{
    status = true;
  }
  var objTD = objInput.parentElement;//TD
  var objTR = objTD.parentElement;//TR
  for(var i=2;i<objTR.cells.length;i++){
    var objOptions = objTR.cells[i];
    var objOption = objOptions.firstChild;
    objOption.disabled = status;
  }
}



/***********************************************************
 * 描述：保存预留字段
 * 更新时间：2003-3-4
 **********************************************************/
function dsave(){
  var r = true;
  if (eval("typeof before_Save ==\"function\"")){
    r = before_Save();
  }
  if(r){
    var j=0;
    var data = new Array();
    var formOption=parent.mainFrame.document.forms[0];
    var formElement,formValue,elementName,elementValue;
    var checkValue,selValue,textValue;

    for(var i=0;i<formOption.elements.length;i++){
      formElement = formOption.elements[i];
      elementName = formElement.name;
      if(formElement.type == "checkbox"){
        if(formElement.checked){
          checkValue = "y";
        }
        else{
          checkValue = "n";
        }
        selValue = formOption.elements[i+1].value;
        textValue = formOption.elements[i+2].value;
        elementValue=elementName+":"+checkValue+":"+selValue+":"+textValue;
        data[j]=elementValue;
        j++;
        i=i+2;
      }

    }
   
    formOption.DATA.value=data;
    formOption.action="savePrecolAction.action";
    formOption.submit();
  }
}

/**********************************************************
 * 部件选项重置成初始状态
 * 修改时间：2003-3-4
 *********************************************************/
function dreset(){
  var mainOption=parent.mainFrame.document.forms[0];
  mainOption.reset();
  formReset();
}

/**********************************************************
 * 页面元素恢复成初始状态
 * 修改时间：2003-3-4
 **********************************************************/
function formReset(){
  var formOption=parent.mainFrame.document.forms[0];
  var formElement,elementName;
  var status = false;

  for(var i=0;i<formOption.elements.length;i++){
    formElement = formOption.elements[i];
    elementName = formElement.name;
    if(formElement.type == "checkbox"){
      if(formElement.checked){
        status = false;
      }
      else{
        status = true;
      }
      formOption.elements[i+1].disabled = status;
      formOption.elements[i+2].disabled = status;
      i=i+2;
    }
  }
}

/**********************************************************
 * 判断当前页面数据是否改变
 * 修改时间：2003-3-5
 *********************************************************/
function isChanged(){
  var status=false;
  var formOption=parent.mainFrame.document.forms[0];
  var formElement,elementName,elementValue,oldFormElement,oldElementName,oldElementValue;

  for(var i=0;i<formOption.elements.length;i++){
    status = false;
    formElement = formOption.elements[i];
    elementName = formElement.name;
    if(formElement.type == "text" || formElement.type == "checkbox" || formElement.type == "select-one"){
      oldFormElement = formOption.elements[i+3];
      oldElementName = oldFormElement.name;
      oldElementValue = oldFormElement.value;
      if(formElement.type == "text" || formElement.type == "select-one"){
        elementValue = formElement.value;
        if(elementValue != oldElementValue){
          status =true;
          break;
        }
      }
      else if(formElement.type == "checkbox"){
        if(formElement.checked){
          elementValue = "y";
          if(oldElementValue != "Y" && oldElementValue !="y"){
            status =true;
            break;
          }
        }
        else{
          elementValue = "n";
          if(oldElementValue == "y" || oldElementValue =="Y"){
            status =true;
            break;
          }
        }
      }
    }
  }
  return status;
}

/**
 *
 * @return
 */
function Call_ClickF(call){
  if (eval("typeof " + call + " ==\"function\"")){
    var r = true;
    r = eval(call +"()");
    if (r) {
      if (eval("typeof " + call + "F ==\"function\"")){
        eval(call + "F()");
      }
    }
  }
  else if (eval("typeof " + call + "F ==\"function\"")){
    var r2 = true;
    if (eval("typeof before_" + call + " ==\"function\""))
      r2 = eval("before_" + call + "()");
    if (r2)
      eval(call + "F()");
  }else{
    var auto = false;
    var param = document.getElementById(call + "Meta");
    if (param != null){
      params = param.childNodes;
      auto = true;
      for (var i=0,j=params.length; i<j; i++){
        if (!isFieldExist(params.item(i).getAttribute("name"))){
          auto = false;
          alert("此功能的参数在页面上不存在！");
          break;
        }
      }
    }
    if (auto)
      sendParam(call);
    else
      alert("此功能目前还未定义，请以后再试！");
  }
}




/**********************************************************
 * 描述：判断字段名是否重复(genglx)
 * 建立时间：2003-3-31
 * @return true or false
 *********************************************************/
function isValid(){
  var flag = true;
  var formOption=parent.mainFrame.document.forms[0];
  var formElement,elementName;
  var dataItemName,dataItems,dataItem,dataItemNa;
  var arrPreDataItem = new Array();
  var arrDataItem = new Array();
  var preDataItem = formOption.PREDATAITEM.value;
  if(preDataItem!="" && preDataItem.length>0){
    for(var i=0;i<formOption.elements.length;i++){
      formElement = formOption.elements[i];
      if(formElement.type == "text"){
        dataItemName = formElement.value;
        elementName = formOption.elements[i-2].name;
        alert(elementName);
        var arrPreDataItem =preDataItem.split(";");
        for(var j=0;j<arrPreDataItem.length;j++){
          dataItems = arrPreDataItem[j];
          arrDataItem = dataItems.split(":");
          dataItem = arrDataItem[0];
          dataItemNa = arrDataItem[1];
          if(dataItemName==dataItemNa && dataItem!=elementName){
            flag=false;
            alert(elementName+"字段名已经被定义");
            break;
          }
        }
      }
    }
  }
  return flag;
}

function initPage(){
  pageResize();
  initialized = true;
  if (typeof init == "function"){
    init();
  }
}

function pageResize(){
  grid.style.height = document.body.clientHeight - 40;
  gridBody.style.width = grid.clientWidth;
  colResize()
}

  function colResize(){
    gridBodyTable.style.width = head.clientWidth;
    if (gridBodyTable.rows.length > 0){
      for (var i=1,j = head.rows[0].cells.length; i<j; i++){
        gridBodyTable.rows[0].cells[i].style.width = head.rows[0].cells[i].offsetWidth;
        gridBodyTable.rows[0].cells[i].style.visibility = head.rows[0].cells[i].style.visibility
      }
      gridBody.style.top = head.clientHeight;
      gridBody.style.height = grid.clientHeight-head.clientHeight;
    }
    head.style.left = -gridBody.scrollLeft;
  }

  function windowResize(){
    if (initialized){
      pageResize();
    }
  }

  function body_Scroll() {//移动滚动条
    head.style.left = -gridBody.scrollLeft;
  }

  function mousemove() {
    if(sign){
      slide.style.left= window.event.clientX;
    }
  }

//拖动表格宽度变量
  var sign=false;
  var begin_x = 0;
  var td = null;
  var originColor = null;
  var initialized = false;
  var imgPath = "img/main/";
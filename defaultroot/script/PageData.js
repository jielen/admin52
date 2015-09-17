// $Id: PageData.js,v 1.227 2007/03/15 02:41:46 zhangyw Exp $
// 编辑页面专用

/** 页面数据缓冲 */
var _thePageData = new Object();

var initElement = "",coCodeField = "";
var twidth = -1,theight = -1,tname = "";

function setBtnEnable(func,enable){
  var id = document.getElementById(func + "ID");
  if(id == null)
    return;
  else
    id.disabled = !enable;
}

function getCompoName(){
	return DataTools.getCompoName();
  //return getPageMeta().getCompoName();
}

function getMainTableName(){
  return document.getElementById("maintable").getAttribute("tablename");
}

function setInitial(fieldName,tableName,withName){
  if (tableName == null)
    tableName = getMainTableName();
  var initElement = document.getElementById(tableName + "_" + fieldName + "ID");
  if ( initElement ==null) return;
  var fieldType = initElement.getAttribute("fieldType");
  if (fieldType != "select"){
    if (document.getElementById(fieldName + "_BWSID")){
      document.getElementById(fieldName + "_DELID").style.display = "none";
      document.getElementById(fieldName + "_BWSID").style.display = "";
      if (document.getElementById(fieldName + "_IMAGE") != null)
         document.getElementById(fieldName + "_IMAGE").style.display = "none";
    }
    if(initElement.getAttribute("autonum") == "true"){
      initElement.setAttribute("value", "自动编号");
    }else if (initElement.tagName == "textarea"){
      initElement.innerHTML = initElement.getAttribute("default");
    }else if (initElement.getAttribute("norulenum") == "true"){
      initElement.setAttribute("value", "编号器编号");
    }else{
      var isDflt = false;
      var global = document.getElementById("sessionParam").childNodes;
      for (var i = global.length - 1; i >= 0; i--){
        name = global.item(i).getAttribute("name");
        var alias = global.item(i).getAttribute("alias");
        var tmpName = null;
        if(alias != null)
          tmpName = alias;
        else
          tmpName = name;
        if(tmpName == fieldName){
          initElement.setAttribute("value", getSv(name));
          isDflt = true;
          return;
        }
      }
      if(!isDflt)
        initElement.setAttribute("value", initElement.getAttribute("default"));
    }
  }else{
    var select = document.getElementById(tableName + "_" + fieldName + "ID");
    setField(fieldName,select.getAttribute("default"),tableName,withName,true);
  }
}

function getCoCode_R(result){
  if (result.getAttribute("success") == "false"){
    alert(result.innerHTML);
  }else{
    initElement.setAttribute("value", result.innerHTML);
  }
}

//专为子表取初始值使用 zhangys 2004-10-12
function getInitial(fieldName, tableName, withName){
  var result = "";
  if (tableName == null)
    tableName = getMainTableName();
  var element = document.getElementById(tableName + "_" + fieldName + "ID");
  if (element == null ) return;
  var fieldType = element.getAttribute("fieldType");
  if (fieldType != "select"){
    result = element.getAttribute("default");
  }else{
    var select = document.getElementById(tableName + "_" + fieldName + "ID");
    var selectList = document.getElementById(tableName + "_" + fieldName + "IDS");
    if(selectList.length == 0){
      alert("值集没有设置，请先设置值集，在进行操作！");
      return false;
    }
    var dftId = selectList.options[0].value;
    var dftTxt = selectList.options[0].text;
    result = "<span value=\"" + dftId + "\"><span><span value=\"" + dftTxt + "\">" + dftTxt + "</span>";
    defaultValue = select.getAttribute("default");
    for(var m=0,n=selectList.options.length; m<n; m++){
      var txt = selectList.options[m].text;
      var code = selectList.options[m].value;
      if (code == defaultValue) {
        result = "<span value=\"" + code + "\"><span><span value=\"" + txt + "\">" + txt + "</span>";;
        break;
      }
    }
  }
  if (result == "null" ){
    result = "";
  }
  return result;
}

function setField(fieldName,value,tableName,withName,unfire){
  if (tableName == null){
    tableName = getMainTableName();
  }
  var element = document.getElementById(tableName + "_" + fieldName + 'ID');
  if (element == null) return;
  var fieldType = element.getAttribute("fieldType");
  var isKiloStyle = element.getAttribute("kiloStyle");
  if (fieldType == "foreignKey"){
    var disable = element.disabled;
    element.disabled = true;
    element.setAttribute("value", value);
    element.disabled = false;
    if (!unfire){
      element.setAttribute("reselect","true");
      element.fireEvent("onchange");
    }
    element.disabled = disable;
  }else if (fieldType != "select"){
    var disable = element.disabled;
    element.disabled = true;
    if (element.tagName == "textarea"){
      element.innerHTML = value;
    }if (fieldType == "num"){
      var pageStatus = document.getElementById("status").getAttribute("value");
      if ((pageStatus == "editing") || (pageStatus == "new")){
        if ((isKiloStyle == true) || (isKiloStyle == "true")){
          var temp = deleteComma(value);
          var temp2 = kiloStyle(temp);
          element.setAttribute("value",temp2);
        }else{
                  element.setAttribute("value","" + value);
              }
      }
      else if (pageStatus == "edit"){
        element.setAttribute("value","" + value);
      }
      else{
        element.setAttribute("value","" + value);
      }
    }else{
      element.setAttribute("value",value);
      if (value.length >= 0 && document.getElementById(fieldName + "_BWSID")){//子表附件若存在，则显示删除按钮。wtm,20050216
         if (value.length > 0){
             document.getElementById(fieldName + "_DELID").style.display = "";
             document.getElementById(fieldName + "_BWSID").style.display = "none";
         }else{
             document.getElementById(fieldName + "_DELID").style.display = "none";
             document.getElementById(fieldName + "_BWSID").style.display = "";
         }
      }
    }
    element.disabled = false;
    if (!unfire){
      element.fireEvent("onchange");
    }
    element.disabled = disable;
  }else {
    /*值集类型*/
    var select = document.getElementById(tableName + "_" + fieldName+"IDS");
    if(select.options.length == 0)
    {
      //没有选项,返回空格;leidh;20040623;
      element.innerText= "";
      return;
    }
    var blkIndex = value.indexOf(" ");
    if (value == ""){
      value = select.options[0].text;
    }
    var value2 = value;
    if(blkIndex > 0)
      value2 = value.substring(0, blkIndex);
    for(var m=0,n=select.options.length; m<n; m++){
      var txt = select.options[m].text;
      var code = select.options[m].value;
//      alert("id----" + code + "    name----" + txt + "    value2:" + value2);
//      var blankIndex = txt.indexOf(" ");
//      if (blankIndex > 0){
//        code = txt.substring(0, blankIndex);
//      }
      if (code == value2 || txt == value2) {
        var disable = select.disabled;
        select.disabled = true;
        element.setAttribute("value",txt);
        select.selectedIndex = m;
        select.disabled = false;
        if (!unfire){
          select.fireEvent("onchange");
        }
        select.disabled = disable;
        break;
      }
    }
  }
}

function getField(fieldName,tableName,withName){
  if (tableName == null)
    tableName = getMainTableName();
  var element = document.getElementById(tableName + "_" + fieldName+'ID');
  if(element == null){
    return null;
  }
  var result;
  var fieldType = element.getAttribute("fieldType");
  var isKiloStyle = element.getAttribute("kiloStyle");
  if (fieldType == "select"){
    /*值集类型*/
    var select = document.getElementById(tableName + "_" + fieldName + "IDS");
    result = trim(element.getAttribute("value"));
    for(var m=0,n=select.options.length; m<n; m++){
      var txt = select.options[m].text;
      var code = select.options[m].value;
      if(txt == result){
        if(!withName){
          result = code;
        }else{
          result = txt;
        }
        break;
      }
    }
    if(result.length == 0)
      result = " ";
  }else if(fieldType == "num"){
    result = element.getAttribute("value");
    if((result == "") || (result == null)){
      result = 0;
    }else{
      var temp = deleteComma(result);
			result = temp;
    }
  }else if (element.tagName == "textarea"){
    result = element.innerHTML;
  }else{
    result = element.getAttribute("value");
  }
  return result;
}

function isFieldExist(fieldName,tableName){
  if (tableName == null)
    tableName = getMainTableName();
  var element = document.getElementById(tableName + "_" + fieldName+'ID');
  if (element != null)
    return true;
  else
    return false;
}

/**
 * @Title 设置表中某一字段为只读或可写，readOnly = true为只读
 * @toEdit true:只设置当前单元格只读属性 false:设置当前列的只读属性
 * @return
 */
function setReadOnly(fieldName, readOnly, tableName,toEdit){
  if (tableName == null){
    tableName = getMainTableName();
  }
  var element = document.getElementById(tableName + "_" + fieldName + 'ID');
  if (element != null){
  if (!toEdit){//设置列只读属性
    var span = document.getElementById(tableName + "_" + fieldName + "Span");
    if( span != null){
       if (document.getElementById(tableName + "_" + fieldName + 'DateIMGID')!=null ){
       	   var disp = "";
           if (readOnly) disp = "none";
      	   document.getElementById(tableName + "_" + fieldName + 'DateIMGID').style.display = disp ;
       }
      span.setAttribute("read","" + readOnly);
    }
  }
  var autonum = element.getAttribute("autonum");
  var norulenum = element.getAttribute("norulenum");
  if((autonum == "true") || (norulenum == "true")){
    element.style.color = "red";
    element.contentEditable = false;
  }else{
    var alwaysReadonly = element.getAttribute("alwaysReadonly");
    var blob = document.getElementById(tableName + "_" + fieldName + "_BLOBIDID");
    var read = (alwaysReadonly == "true") || readOnly || blob;
    element.style.color = read ? "gray" : "blue";
    if (element.getAttribute("read") != null){//值集类型
      if (element.getAttribute("hasEffectTable") == null){
        element.read = read ? "true" : "false";
      }else{
        element.read = "false";
      }
    }else{
      element.contentEditable = !read;
       if (blob){
         element.contentEditable = false;
         if(read)
           blob.setAttribute("read", "true");
         else
           blob.setAttribute("read", "false");
       }
    }
  }
  }
}

function isFieldReadOnly(fieldName, tableName){
  if (tableName == null){
    tableName = getMainTableName();
  }
  var result = false;
  var element = document.getElementById(tableName + "_" + fieldName + 'ID');
  if (element == null) return;
  var blob = document.getElementById(tableName + "_" + fieldName + "_BLOBIDID");
  if (element.read){
    return element.read == "true";
  }else if (blob){
    return blob.read == "true";
  }else{
    return ((!element.isContentEditable) || (element.autonum == "true") ||
            (element.norulenum == "true"));
  }

  var span = document.getElementById(tableName + "_" + fieldName + "Span");
  var result = (result) || (span.getAttribute("read") == "true");
  return result;
}
/**
 * T@设置页面的读写属性， isReadOnly = true为只读
 * @return
 */
function setPageReadOnly(isReadOnly){
  /* 得到所有的field */
  var fields = document.getElementById("fields").childNodes;
  for (var i=0,j=fields.length; i<j; i++){
    /* 先将所有的field设置为Read Only */
    setReadOnly(fields.item(i).getAttribute("fieldname"), isReadOnly);
  }
  var table2s = document.getElementById("maintable").childNodes;
  for (var i=0,j=table2s.length; i<j; i++){
    /*得到主表名*/
    var table2Name = table2s.item(i).getAttribute("tablename");
    var displayType= table2s.item(i).getAttribute("display_type");
		if(displayType == "normal"){
			//二层表格不用Grid格式显示，则不执行setTableReadOnly;
      var childTables = document.getElementById("childTableFields").childNodes;
      for(var x=0; x<childTables.length; x++){
      	var tableName = childTables.item(x).getAttribute("tableName");
        if(table2Name == tableName){
          var childFields = document.getElementById(tableName + "Fields").childNodes;
  				for (var k=0,y=childFields.length; k<y; k++){
    				setReadOnly(childFields.item(k).getAttribute("fieldName"), isReadOnly,table2Name);
        	}
        }
      }
    }
		else{
    	setTableReadOnly(table2Name,isReadOnly);
		}
    var table3s = table2s.item(i).childNodes;
    for(var m=0,n=table3s.length; m<n; m++){
      var table3Name = table3s.item(m).getAttribute("tablename");
      setTableReadOnly(table3Name,isReadOnly);
    }
  }
}

function setTableReadOnly(tableName,isReadOnly){
  var sreadOnly = "false";
  if (isReadOnly) sreadOnly = "true";
  var head = document.getElementById(tableName + "HeadTable");
  head.setAttribute("read",sreadOnly);
  var fields = getFieldCaption(tableName);
  for (var i=0,j=fields[0].length; i<j; i++){
    setReadOnly(fields[0][i],isReadOnly,tableName);
  }
}

function getPageData(){
  var meta = document.getElementById("maintable");
  var maintable = meta.getAttribute("tablename");
  var delta = "<entity name=\"" + maintable + "\">";
  var vfields = document.getElementById("fields").childNodes;
  for(var i=0,j=vfields.length; i<j; i++){
    var fieldname = vfields.item(i).getAttribute("fieldname");
    var element = document.getElementById(maintable + "_" +
      fieldname + "ID");
    var fieldType = element.getAttribute("fieldType");
    var isKiloStyle = element.getAttribute("kiloStyle");
    delta += "<field name=\"" + fieldname + "\" value=\"";
    var vv = getField(fieldname,maintable);
    if (vv == null )  return;
    if (document.getElementById(maintable + "_" + fieldname
        + "ID").getAttribute("fieldType") ==  "text"){
      vv = escapeLineBreak(packSpecialChar(vv));
    }
    else if (fieldType == "num"){
      if ((isKiloStyle == "true") || (isKiloStyle == true))
        vv = packSpecialChar(deleteComma(vv));
      else
        vv = packSpecialChar(vv);
    }
    delta += vv + "\"/>";
  }

    /**zhangcheng 2004-7-28 16:19   使用数组缓冲替换文件缓冲机制*/
          var aCache=new Array();

  var table2s = meta.childNodes;
  for (var i=0,j=table2s.length; i<j; i++){
    var table2 = table2s.item(i);
    var table2Name = table2.getAttribute("tablename");
    delta += "<entity name=\"" + table2Name + "\">";
    var table2Grid = document.getElementById(table2Name + "BodyTable");
    var table2Head = document.getElementById(table2Name + "EditTable").rows[0];
    var head2 = document.getElementById(table2Name + "HeadTable");
    var rowIndex = -1;
    var colIndex = -1;
     if (head2.getAttribute("editing") == "y"){
       rowIndex = parseInt(head2.getAttribute("row"));
      colIndex = parseInt(head2.getAttribute("col"));
    }
    for (var ix=0,jx=table2Grid.rows.length; ix<jx; ix++){
      /*每隔10行写一次，以保证delta不会太长*/
     if (ix % 10== 0)
		  	  {
		        aCache[ix]=delta;
		    		delta= "";
		  	  }

      delta += "<row><entity name=\"" + table2Name + "\">";
      var row = table2Grid.rows[ix];
      var effectField = null;
      var effectValue = null
      if (table2.childNodes.length > 0){
        effectField = table2.childNodes.item(0).getAttribute("effectField");
      }

      for (var ir=1,jr=table2Head.cells.length; ir<jr; ir++){
        var fieldName2 = table2Head.cells[ir].getAttribute("fieldName");
        var fieldValue2 = null;
        if ((ix == rowIndex) && (ir == colIndex)){
          fieldValue2 = getRowField(row,fieldName2,true);
        }else{
          fieldValue2 = row.cells[ir].innerHTML;
        }
        if (effectField == fieldName2){
          effectValue = fieldValue2;
        }
        var caption = document.getElementById(table2Name + "_" + fieldName2 +
            "CaptionID");
        var capValue = caption.innerHTML;
        var index = capValue.indexOf("<SPAN");
        if(index > 1){
          //为非空字段或主键
          if((fieldValue2 == null) || (fieldValue2.length == 0)){
            alert("“" + capValue.substr(0, index) + "”不允许为空！");
            return null;
          }
        }

        var element = document.getElementById(table2Name + "_" + fieldName2+'ID');
        var fieldType = element.getAttribute("fieldType");
        var isKiloStyle = element.getAttribute("kiloStyle");
        if (fieldType == "select"){
          /*值集类型*/
         var tmlen = select.length;
         fieldValue2 = row.cells[ir].firstChild.value;
         if ((row.cells[ir].innerHTML).indexOf("select")>=0 ){
              fieldValue2 = select.options[select.selectedIndex].value;
          }else {
              for (var ind=0;ind < tmlen ; ind++){
                if (row.cells[ir].innerHTML == select.options[ind].text){
                	fieldValue2 = select.options[ind].value;
                        break;
                }else if (row.cells[ir].innerHTML == select.options[ind].value){
                	break;
                }
              }
          }
//          var index = fieldValue2.indexOf(" ");
//          if(index > 0)
//            fieldValue2 = fieldValue2.substring(0, index);
        } else if (fieldType == "num"){
          if ((isKiloStyle == "true") || (isKiloStyle == true))
            fieldValue2 = deleteComma(fieldValue2);
        }
        delta += "<field name=\"" + fieldName2 +"\" value=\"";
        delta += packSpecialChar(fieldValue2) + "\"/>";
      }
      for (var it=0,jt=table2.childNodes.length; it<jt; it++){
        var table3 = table2.childNodes.item(it);
        var table3Name = table3.getAttribute("tablename");
        delta += "<entity name=\"" + table3Name + "\">";
        var colNo = parseInt(document.getElementById(table3Name + "_" + effectField + "Cell").colno);
        var table3Grid = document.getElementById(table3Name + "BodyTable");
        var table3Head = document.getElementById(table3Name + "EditTable").rows[0];
        var head3 = document.getElementById(table3Name + "HeadTable");
        var rowIndex3 = -1;
        var colIndex3 = -1;
         if (head3.getAttribute("editing") == "y"){
           rowIndex3 = parseInt(head3.getAttribute("row"));
          colIndex3 = parseInt(head3.getAttribute("col"));
        }
        for (var ir3=0,jr3=table3Grid.rows.length; ir3<jr3; ir3++){
          var table3Row = table3Grid.rows[ir3];
          if (table3Row.cells[colNo].innerHTML == effectValue){
            delta += "<row><entity name=\"" + table3Name + "\">";
            for (var ic=1,jc=table3Head.cells.length; ic<jc; ic++){
              if (ic != colNo){
                delta += "<field name=\"";
                fieldName3 = table3Head.cells[ic].getAttribute("fieldName");
                delta += fieldName3;
                var element3 = document.getElementById(table3Name + "_" + fieldName3+'ID');
                var fieldValue3 = null;
                if ((ir3 == rowIndex3) && (ic == colIndex3)){
                  fieldValue3 = getRowField(table3Row,fieldName3,true);
                }else{
                  fieldValue3 = table3Row.cells[ic].innerHTML;
                }

                var caption = document.getElementById(table3Name + "_" + fieldName3 +
                    "CaptionID");
                var capValue = caption.innerHTML;
                var index = capValue.indexOf("<SPAN");
                if(index > 1){
                  //为非空字段或主键
                  if((fieldValue3 == null) || (fieldValue3.length == 0)){
                    alert("“" + capValue.substr(0, index) + "”不允许为空！");
                    return null;
                  }
                }

                var fieldType3 = element3.getAttribute("fieldType");
                var isKiloStyle = element3.getAttribute("kiloStyle");
                if(fieldType3 == "select"){
                  /*处理值集*/
                  var index = fieldValue3.indexOf(" ");
                  if(index > 0)
                    fieldValue3 = fieldValue3.substring(0, index);
                } else if (fieldType3 == "num"){
                  if ((isKiloStyle == "true") || (isKiloStyle == true))
                    fieldValue3 = deleteComma(fieldValue3);
                }
                delta += "\" value=\"" + packSpecialChar(fieldValue3);
                delta += "\"/>";
              }
            }
            delta += "</entity></row>";
          }
        }
        delta += "</entity>";
      }
      delta += "</entity></row>";
    }
    delta += "</entity>";
  }
  delta += "</entity>";

  delta=aCache.join("")+delta;

  return delta;
}

function getMainFields(){
  var result = new Array();
  var meta = document.getElementById("fields");
  var vfields = meta.getElementsByTagName("span");
  for (var i=0,j=vfields.length; i<j; i++){
    result[result.length] = vfields.item(i).getAttribute("fieldname");
  }
  return result;
}

function getPrimaryFields(){
  var result = new Array();
  var vfields = document.getElementById("fields").getElementsByTagName("span");
  for (var i=0,j=vfields.length; i<j; i++){
    if (vfields.item(i).getAttribute("pk") == "true"){
      result[result.length] = vfields.item(i).getAttribute("fieldname");
    }
  }
  return result;
}

function setOptions(fieldname,options,tablename){
  var table = tablename;
  if (!table){
    table = getMainTableName();
  }
  var select = document.getElementById(table + "_" + fieldname + "IDS");
  if (select){
    select.options.length = options.length;
    for (var i=0,j=options.length; i<j; i++){
      var blankIndex = options[i].indexOf(" ");
      var text;
      var value;
      if (blankIndex > 0){
        text = options[i].substring(blankIndex+1);
        value = options[i].substring(0,blankIndex);
      }
      if(options[i].length == 0){
        text = "";
        value ="";
      }
      select.options[i].text = text;
      select.options[i].value = value;
    }
  }
  var fieldValue = getField(fieldname,table);
  var isInner = false;
  for(var m=0,n=select.options.length; m<n; m++){

    if(fieldValue == select.options[m].value){
      isInner = true;
      break;
    }
  }
  if (isInner){
    document.getElementById(table + "_" + fieldname + "ID").value = select.options[m].text;
  }else{
    document.getElementById(table + "_" + fieldname + "ID").value = select.options[0].text;
  }
}

function addFieldBtn(fieldname,tablename,foreignName,imgFile){
  var table = tablename;
  if (!table){
    table = getMainTableName();
  }
  if (!foreignName){
    foreignName = "";
  }
  if (!imgFile){
    imgFile = "/style/img/main/search.gif";
  }
  if (document.getElementById(table + "_" + fieldname + "ForeignIMGID")){
    document.getElementById(table + "_" + fieldname + "ForeignIMGID").style.display = "";
  }else{
    var span = document.getElementById(table + "_" +fieldname + "Span");
    span.innerHTML = span.innerHTML + "<img fieldname=\"" + fieldname
                 + "\" tablename=\"" + table + "\" id=\""
                 + table + "_" + fieldname + "ForeignIMGID\""
                 + " src=\"" + imgFile + "\" align=\"absbottom\""
                 + " class=\"foreignIMG\""
                 + " onmouseenter=\"mouseEnterForeignIMG();\""
                 + " onmouseout=\"mouseOutForeignIMG();\""
                 + " onmousedown=\"mouseDown();\" onmouseup=\"mouseUp();\""
                 + " onclick=\"foreign_Select('" + foreignName + "')\"></img>";
  }
}

function delFieldBtn(fieldname,tablename){
  var table = tablename;
  if (!table){
    table = getMainTableName();
  }
  if (document.getElementById(table + "_" + fieldname + "ForeignIMGID")){
    document.getElementById(table + "_" + fieldname + "ForeignIMGID").style.display = "none";
  }
}
function getSv(name){
  var value = "";
  try{
	  var sessionParam = document.getElementById("sessionParam").childNodes;
	  for (var m = 0, n = sessionParam.length; m < n; m++){
	    paramName = sessionParam.item(m).getAttribute("name");
	    if(paramName == name){
	      value = sessionParam.item(m).getAttribute("value");
	    }else
	      continue;
	  }
	}catch(e){
		//
	}
  return value;
}

function setFieldVisible(fieldName,visible,tableName){
  if (tableName == null)
    tableName = getMainTableName();
  var element = document.getElementById(tableName + "_" + fieldName + 'ID');
  var caption = document.getElementById(tableName + "_" + fieldName + 'CaptionID');
  var span = document.getElementById(tableName + "_" + fieldName + 'Span');
  if (visible){
    element.style.display = "";
    caption.style.display = "";
    span.style.display = "";
  }else{
    element.style.display = "none";
    caption.style.display = "none";
    span.style.display = "none";
  }
}

function dblClick(){
  var tablename = event.srcElement.getAttribute("tablename");
  var fieldname = event.srcElement.getAttribute("fieldname");
  if (fieldname && tablename){
    if (eval("typeof " + tablename + "_" + fieldname + "_DblClick == \"function\"")){
      if (document.getElementById(tablename + "_" + fieldname + "ID").isContentEditable){
        eval(tablename + "_" + fieldname + "_DblClick()");
      }
    }
  }
}

function setGridTableHeight(tableName, height){
  var doc = document.getElementById(tableName + "Container");
  if (doc){
    doc.style.height = height;
    colResize(tableName);
  }
  tname = tableName;
  theight = height;
}

function setGridTableWidth(tableName, width)
{
  var doc = document.getElementById(tableName + "Container");
  if (doc){
    doc.style.width = "100%"; //自动适应窗口的宽度;Leidh;20040331;
    colResize(tableName);
  }
  tname = tableName;
  twidth = width;
}

function setGridRowWidth(tableName, fieldName, width){
  var doc = document.getElementById(tableName + "_" + fieldName + "Cell");
  var head = document.getElementById(tableName + "HeadTable");
  var beforeWidth = parseInt(doc.width);
  var tempWidth = width - beforeWidth;
  doc.setAttribute("width", width);
  if(head.width){
    head.width = parseInt(head.width) + tempWidth;
  }
  var doc1 = document.getElementById(tableName + "_" + fieldName + "TableID");
  if(doc1){
    doc1.setAttribute("width", width);
  }
  colResize(tableName);
}

/** 判断是否强制关闭的标志位 */
var _forceLeave = false;
function isForceLeave() { return _forceLeave;}
function setForceLeave() { _forceLeave = true;}

function closeEdit(){
  if (isForceLeave()) return;

  var isRun = true;
  if(eval("typeof closeEditPage == 'function'")){
    isRun = eval("closeEditPage()");
  }
  if(isRun){
    closeEidtF();
  }
}

function closeEidtF(){
  if (!(top.document.getElementById("status"))) return;//判断当前窗口是否有上级窗口
  var pageStatus = document.getElementById("status").getAttribute("value");
  if ((pageStatus != "new") && (pageStatus != "edit")
      && (pageStatus != "editing")){
    return;
  }
  var fs = document.getElementById("fsaveID");
  if ((fs)&&(!fs.isDisabled)	&&(fs.style.display != "none")){
    fs.focus();
    if (getChanged()){
      event.returnValue = "当前页面上的数据已修改，但没有保存！";
    }
  }
}

function setDecLength(fieldName,tableName,bits){
  if (tableName == null) tableName = getMainTableName();
  var element = document.getElementById(tableName + "_" + fieldName + "ID");
  var fieldType = element.getAttribute("fieldType");
  if (fieldType == "num"){
    if (bits >= 0){
      element.setAttribute("decLength","" + bits);
    }
  }
}

function isVisible(fieldName,tableName){
  if (tableName == null)
    tableName = getMainTableName();
  var element = document.getElementById(tableName + "_" + fieldName + 'Span');
  return element.style.display == "";
}

function isTableExist(tableName){
  return document.getElementById(tableName + "Container")?true:false;
}

function addForeignWatchBtn(fieldname, tablename, imgFile){
  var table = tablename;
  if (!table){
    table = getMainTableName();
  }
  if (!imgFile){
    imgFile = "/style/img/main/search.gif";
  }
    var span = document.getElementById(table + "_" +fieldname + "Span");
    span.innerHTML = span.innerHTML + "<img fieldname=\"" + fieldname
                 + "\" tablename=\"" + table + "\" id=\""
                 + table + "_" + fieldname + "WatchIMGID\""
                 + " src=\"" + imgFile + "\" align=\"absbottom\""
                 + " class=\"foreignIMG\""
                 + " onmouseenter=\"mouseEnterForeignIMG();\""
                 + " onmouseout=\"mouseOutForeignIMG();\""
                 + " onmousedown=\"mouseDown();\" onmouseup=\"mouseUp();\""
                 + " onclick=\"foreign_Watch()\"></img>";
}

function foreign_Watch(){
  var sfieldname = event.srcElement.getAttribute("fieldname");
  if (eval("typeof " + sfieldname + "_Watch == \"function\"")){
    eval(sfieldname + "_Watch()");
    return;
  }
}

function setForeignVisible(tableName, fieldName, visible){
  var foreignId = document.getElementById(tableName + "_" + fieldName +
      "ForeignIMGID");
  foreignId.style.display = visible ? "" : "none";
}

function fprint(){
 var beforeF = true;
 if (eval("typeof before_fprint ==\"function\"")){
 		beforeF = eval("before_fprint()");
 }
 if(!beforeF)
  	return;
  
  var names = new Array();
  var values = new Array();
  var vasInfo = getPrintSetInfo();
 if (isNoTemplatePrint(vasInfo)){
  names[0] = "0,0,50,20,printer,n,打印人";
  names[1] = "50,0,100,20,printer1,n," + getSv("svUserName");
 }else {
  var vsMainTable = getMainTableName();
  var printData = getPrintParameter("PrintData");
  if(isNotSplitPrint() || printData){
   names[0] = "TPL_CODE";
   values[0] = vasInfo["TplCode"];
   names[1] = "PRINT_DATA";
   values[1] = getPrintParameter("PrintData");
   if(!values[1]){
    values[1] = getPrintDataDirect();
   }
   names[2] = "EXPORT_TYPE";
   values[2] = vasInfo["ExportType"];
      names[3] = "componame";
      values[3] = getCompoName();
      var sDynamicTpl = getPrintParameter("DynamicTpl");
   if(sDynamicTpl == "1"){
    names[4] = "DynamicTpl";
    values[4] = "1";
   }
  }else{
   /*
   var voParams = PageX.oDBDataRules.get(DataTools.getCompoName()+ "_E");
    if(!voParams){
     alert("请先查看数据，再打印！");
     return;
    }
    */
   names[0] = "TPL_CODE";
   values[0] = vasInfo["TplCode"];
    names[1] = "pagename";
    values[1] = getPageMeta().getPageName();
   names[2] = "AREA_NAME";
   values[2] = getAreaName();
    names[3] = "PRINT_DATA";
   values[3] = getMainTableData();
    names[4] = "componame";
   values[4]= getCompoName();
   names[5] = "EXPORT_TYPE";
   values[5] = vasInfo["ExportType"];
   var sDynamicTpl = getPrintParameter("DynamicTpl");
   if(sDynamicTpl == "1"){
    names[6] = "DynamicTpl";
    values[6] = "1";
   }
  }
 }
 fprintStart(vasInfo, names, values);
}
 
/**
 *
 */
function fprintStart(vasInfo, names, values){
 var vsMainTable = getMainTableName();
 if(isNoTemplatePrint(vasInfo)){
  if (isNotSplitPrint()){
   printNoTemplate(vasInfo, names, values, " ",220,40);
  }else{
   splitPrintNoTemplate(vasInfo, getAreaName(),names," ",100,40);
  }
 }else{
  var printData = getPrintParameter("PrintData");
  if (isNotSplitPrint() || printData){
   printWithTemplate(vasInfo, names, values);
  }else if (isSplitPrint(names,"pagename")){
    splitPrintWithTemplate(vasInfo, names, values);
  }else{
   printWithTemplate(vasInfo, names, values);
  }
 }
 
}
 
//判断是否是分页打印， 有可能是报表页面但执行的是无分页打印，其他应用程序中调用
function isSplitPrint(fieldName,splitprint){
 var isSplitPrint=false;
  if(fieldName.length>0){
   for (var i=0,count=fieldName.length;i<count;i++){
    if (fieldName[i]==splitprint){
     isSplitPrint=true;
     break;
    }
   }
 }
 return isSplitPrint;
}
 
function isNotSplitPrint(){
 var isNotSplitPrint = true;
 var vsMainTable = getMainTableName();
 isNotSplitPrint = (vsMainTable.substr(vsMainTable.indexOf("_")) != "_TEMP") && (!document.getElementById("gridfirstpageID"));
 return isNotSplitPrint;
}

/*
//打印接口，复杂打印可以覆盖
function fprint(){
	var names = new Array();
	var values = new Array();
	var params = getPrintSetParam();
	if (params[1]=="jasperreport"){
		if (params[2]=="notemplate"){
			names[0] = "0,0,50,20,printer,n,打印人";
			names[1] = "50,0,100,20,printer1,n," + getSv("svUserName");
		}else {
			if (params[2]=="template"){
				var vsMainTable=getMainTableName();
				var printData = getPrintParameter("PrintData");
				if ((!document.getElementById("gridfirstpageID")) || vsMainTable.substr(vsMainTable.indexOf("_")) != "_TEMP" || printData){
					names[0] = "TPL_CODE";
					values[0] = getPrintParameter("TplCode");
					if(!values[0]){
						values[0] = params[3];
					}
					names[1] = "PRINT_DATA";
					values[1] = getPrintParameter("PrintData");
					if(!values[1]){
						values[1] = getPrintDataDirect();
					}
					if(values[1].indexOf("SPAN") > -1)
						values[1] = filterValSet(values[1]);
					names[2] = "EXPORT_TYPE";
					values[2] = getPrintParameter("ExportType");
					if(!values[2]){
						values[2] = params[4];
					}
					names[3] = "options";
					values[3] = getPrintSetOptions();
					names[4] = "componame";
  	      values[4] = getCompoName();
					var sDynamicTpl = getPrintParameter("DynamicTpl");
					if(sDynamicTpl == "1"){
						names[5] = "DynamicTpl";
						values[5] = "1";	
					}
			 }else{
					names[0] = "TPL_CODE";
					values[0] = getPrintParameter("TplCode");
					if(!values[0]){
						values[0]= params[3];
					}
					names[1] = "pagename";
					values[1] = getPageMeta().getPageName();
					names[2] = "AREA_NAME";
					values[2] = getAreaName();
					names[3] = "PRINT_DATA";
					values[3] = getMainTableData();
					names[4] = "componame";
					values[4]= getCompoName();
					names[5] = "options";
					values[5] = getPrintSetOptions();
					names[6] = "EXPORT_TYPE";
					values[6] = getPrintParameter("ExportType");
					if(!values[6]){
						values[6] = params[4];
					}
					var sDynamicTpl = getPrintParameter("DynamicTpl");
					if(sDynamicTpl == "1"){
						names[7] = "DynamicTpl";
						values[7] = "1";	
					}
			 }
			}
		}
	}
	else{
		if (params[1]=="fop"){
				var vsMainTable =getMainTableName();
				if (vsMainTable.substr(vsMainTable.indexOf("_")) != "_TEMP"){
					names[0] = "TPL_CODE";
				  values[0]= getCompoName();
				  names[1] = "PRINT_DATA";
				  values[1] = getPrintParameter("PrintData");
					if(!values[1]){
						values[1] = getPrintDataDirect();
					}
					if(values[1].indexOf("SPAN") > -1)
						values[1] = filterValSet(values[1]);
					names[2] = "EXPORT_TYPE";
					values[2] ="0";
				}else{
				  names[0] = "pagename";
  				values[0] = getPageMeta().getPageName();
	  			names[1] = "AREA_NAME";
  				values[1] =getAreaName();
	  			names[2] = "PRINT_DATA";
  				values[2] = getPrintData_s(getAreaName());
				}
		}
	}
	fprintStart(params,names,values);
}
//底层打印函数，编辑页面不带分页子表打印，其他应用中打印调用fprintSet(param,names,values)即可
function fprintStart(param,names,values){
	if (param[1]=="jasperreport"){
		var vsMainTable=getMainTableName();
		if (param[2]=="notemplate"){
			if (vsMainTable.substr(vsMainTable.indexOf("_")) != "_TEMP"){
				printNoTemplate(names," ",220,40);
			}else if (!document.getElementById("gridfirstpageID")){
				printNoTemplate(names," ",220,40);
			}else{
				splitPrintNoTemplate(getAreaName(),names," ",100,40);
			}
		}else if (param[2]=="template"){
			var printData = getPrintParameter("PrintData");
			if (vsMainTable.substr(vsMainTable.indexOf("_")) != "_TEMP" || printData)
				printWithTemplate(param,names,values);
			else if (!document.getElementById("gridfirstpageID")){
                          	printWithTemplate(param,names,values);
			}else if (isSplitPrint(names,"pagename")){
				 splitPrintWithTemplate(param,names,values);
			}else{
				printWithTemplate(param,names,values);
			}
		}
	}
	else{
		if (param[1]=="fop")
			fopPrintWithTemplate(param,names,values);
	}
}
//判断是否是分页打印， 有可能是报表页面但执行的是无分页打印，其他应用程序中调用
function isSplitPrint(fieldName,splitprint){
	var isSplitPrint=false;
  if(fieldName.length>0){
  	for (var i=0,count=fieldName.length;i<count;i++){
  		if (fieldName[i]==splitprint){
  			isSplitPrint=true;
  			break;
  		}
  	}
	}
	return isSplitPrint;
}
*/

function isBlobField(fieldName,tableName){
  if(!tableName){
    tableName = getMainTableName();
  }
  result = false;
  if (document.getElementById(tableName + "_" + fieldName + "_BLOBIDID")){
    result = true;
  }
  return result;
}

function getValueSets(tableName, fieldName){
  var ids = document.getElementById(tableName + "_" + fieldName + "IDS");
  var result = new Array();
  for(var i = 0, j = ids.options.length; i < j; i++){
    result[result.length] = ids.options[i].value + " " + ids.options[i].text;
  }
  return result;
}

function fpagedesign(){
  var win_edit = open("Proxy?function=fpagedesign&componame=" + getCompoName(),
                          "编辑页面设置",
                          "menubar=no,scrollbars=no,status=no,toolbar=no," +
                          "resizable=yes,titlebar=yes,scrollbars=yes," +
                          "height=" + (screen.availHeight - 30) + ",width=" +
                          (screen.availWidth - 10) + ",top=0,left=0");
    win_edit.focus();
}

function fprint_s(fArea, fTab){
	var params = getPrintSetParam();
  var names = new Array();
  var values = new Array();
	if (params[1]=="fop"){
	  names[0] = "pagename";
  	values[0] = getPageMeta().getPageName();
	  names[1] = "AREA_NAME";
  	values[1] = fArea + fTab;
	  names[2] = "PRINT_DATA";
  	values[2] = getPrintData_s(fArea);
  	}else{
		if (params[1]=="jasperreport"){
			if (params[2]=="notemplate"){
  		names[0] = "0,0,50,20,printer,n,打印人";
  		names[1] = "50,0,100,20,printer1,n," + getSv("svUserName");
			}else if (params[2]=="template"){
					names[0] = "TPL_CODE";
					values[0]= params[3];
		  		names[1] = "pagename";
		  		values[1] = getPageMeta().getPageName();
		  		names[2] = "AREA_NAME";
		  		values[2] = fArea + fTab;
		  		names[3] = "PRINT_DATA";
		  		values[3] = getPrintData_s(fArea);
		  		names[4] = "componame";
					values[4]= getCompoName();
			}
		}
	}
  fprintStart_s(params,names,values);
}
//底层打印函数，编辑页面带分页子表打印，其他应用中打印调用fprintStart_s(param,names,values)即可
function fprintStart_s(param,names,values){
	if (param[1]=="jasperreport"){
		if (param[2]=="notemplate"){
  		//splitPrintNoTemplate(values[2],param," ",220,40);
  		splitPrintNoTemplate(getAreaName(),names," ",100,40);
//        splitPrintNoTemplate(areaName,params,pageHeaderContent,pageHeaderH,pageFooterH)
		}else
		{if (param[2]=="template"){
			  var com = getPageCommunity();
  			if (com != null){
			    com.doRequestPage("splitprint",getCompoName(),names,values,"printpg_s");
			  }
		  }
		}
	}
	else{
		if (param[1]=="fop"){
        var com = getPageCommunity();
  			if (com != null){
			    com.doRequestPage("fprint_S",getCompoName(),names,values,"printpg_s");
			  }
		}
	}
}

/**
 * 设置页面上某个字段获得焦点.
 * fieldName: 字段名
 */
function setPageFieldFocus(fieldName){
  var tableName = getMainTableName();
  var ele = document.getElementById(tableName + "_" + fieldName + "ID");
  if(ele)
    ele.focus();
  else
    alert("设置页面聚焦元素时候出现错误,没有" + fieldName + "字段");
  }

/**
 * 获得页面数据
 * 【格式】
 * <delta>
 *   <entity name="主表表名">
 *     <field name="列名" value="值"/>...
 *   </entity>
 *   <childtable2 name="子表表名"> ? </childtable2>
 *     <field name=""> ? </fields>
 * </delta>
 */
function getPageData1(){
  var meta = document.getElementById("maintable");
  var maintable = meta.getAttribute("tablename");
  var delta = "";//"<?xml version=\"1.0\" encoding=\"gb2312\"?>";
  delta += "<delta>";

  // 1. 取主表数据
  delta += "<entity name=\"" + maintable + "\">";
  var vfields = document.getElementById("fields").childNodes;
  for(var i=0,j=vfields.length; i<j; i++){
    var fieldname = vfields.item(i).getAttribute("fieldname");
    var element = document.getElementById(maintable + "_" +
      fieldname + "ID");
    var fieldType = element.getAttribute("fieldType");
    var isKiloStyle = element.getAttribute("kiloStyle");
    delta += "<field name=\"" + fieldname + "\" value=\"";
    var vv = getField(fieldname,maintable);
    if (vv == null )  return;
    if (document.getElementById(maintable + "_" + fieldname
        + "ID").getAttribute("fieldType") ==  "text"){
      vv = escapeLineBreak(packSpecialChar(vv));
    }
    else if (fieldType == "num"){
      if ((isKiloStyle == "true") || (isKiloStyle == true))
        vv = packSpecialChar(deleteComma(vv));
      else
        vv = packSpecialChar(vv);
    }else{
      vv = packSpecialChar(vv);
    }
    delta += vv + "\"/>";
  }
  delta += "</entity>";

  // 2. 取子表数据
  var table2s = meta.childNodes;
  for (var i=0,j=table2s.length; i<j; i++){
    var table2 = table2s.item(i);
    var table2Name = table2.getAttribute("tablename");
		var displayType = table2.getAttribute("display_type");
		if(displayType == "normal"){
			//二层表格数据不以Grid格式显示，单独打包
      var childTables = document.getElementById("childTableFields").childNodes;
      for(var x=0; x<childTables.length; x++){
      	var tableName = childTables.item(x).getAttribute("tableName");
        if(table2Name == tableName){
        	delta += getNormalChildData(tableName);
        }
      }
		}
    else{
			//二层表格数据以Grid格式显示
    	delta += "<childtable2 name=\"" + table2Name + "\">";
    	uneditGrid(table2Name);
    	var table2Grid = document.getElementById(table2Name + "BodyTable");
    	delta += deleteImgs(table2Grid.tBodies[0].innerHTML);
    	delta += "</childtable2>";
    	var table2Head = document.getElementById(table2Name + "COL");
    	delta += "<fields name=\"" + table2Name + "\">";
    	delta += table2Head.innerHTML;
    	delta += "</fields>";

        // 3. 取孙子表数据
    	for (var it=0,jt=table2.childNodes.length; it<jt; it++){
      	var table3 = table2.childNodes.item(it);
      	var table3Name = table3.getAttribute("tablename");
      	uneditGrid(table3Name);
      	var table3Grid = document.getElementById(table3Name + "BodyTable");
      	delta += "<childtable3 name=\"" + table3Name + "\">";
      	delta += table3Grid.tBodies[0].innerHTML;
      	delta += "</childtable3>";
      	var table3Head = document.getElementById(table3Name + "COL");
      	delta += "<fields name=\"" + table3Name + "\">";
      	delta += table3Head.innerHTML;
      	delta += "</fields>";
    	}
  	}
  }
  delta += "</delta>";
  return delta;
}
/**
 * 取得以Normal类型显示的子表数据
 * tableName 表名
 */
function getNormalChildData(tableName){
  var result = "";
  result += "<childtable2 name=\"" + tableName + "\">\n";
  result += "<TR tableName=\"" + tableName + "\">\n";
  result += "<TD><INPUT onclick=selectPart() type=checkbox></INPUT></TD>\n";
  var childTableFields = document.getElementById(tableName + "Fields").childNodes;
  for(var r=0; r<childTableFields.length; r++){
  	var fieldName = childTableFields.item(r).getAttribute("fieldName");
    var ele = document.getElementById(tableName + "_" + fieldName + "ID");
    var fieldType = ele.getAttribute("fieldType");
    var value = getField(fieldName,tableName);
    if(fieldType == "text"){
    	value = escapeLineBreak(packSpecialChar(value));
    }
    result += "<TD>" + value + "</TD>\n";
  }
  result += "</TR>\n";
  result += "</childtable2>\n";
  result += "<fields name=\"" + tableName + "\">\n";
  //result += "<COL id=\"chkCol\" name=\"chkCol\"></COL>";
  for(var r=0; r<childTableFields.length; r++){
  	var fieldName = childTableFields.item(r).getAttribute("fieldName");
    result += "<COL id=" + tableName + fieldName + "COL name=\"" + fieldName + "\"></COL>\n";
  }
  result += "</fields>\n";
  return result;
  }

/**
 * 工作流相关数据
 * @method getIsBindCommit 是否在提交时更新整条记录 "Y" 更新
 */
function WfData() {
  this.getWFVariable = getWFVariable; //; 获取工作流变量值
  this.getWFState = getWFState; //; 获取工作流状态值
  this.setWFVariable = setWFVariable;
}

WfData.prototype.getTemplateId = function(){return this.WF_TEMPLATE_ID;}; //; 工作流程模板ID
WfData.prototype.getActivityId = function(){return this.WF_ACTIVITY_ID;}; //; 工作流活动ID
WfData.prototype.getProcessInstId = function(){return this.PROCESS_INST_ID;}; //; 工作流实例ID
WfData.prototype.getWorkitemId = function(){return this.WORKITEM_ID;};        //; 工作项ID
WfData.prototype.getInstanceStatus = function(){return this.WF_INSTANCE_STATUS;};        //; 实例状态

WfData.prototype.getNextExecutor = function(){return this.NEXT_EXECUTOR;};   //; 主办人
WfData.prototype.getNextExecutorName = function(){return this.NEXT_EXECUTOR_NAME;};   //; 主办人
WfData.prototype.getDefaultNextExecutor = function(){return this.DEFAULTNEXT_EXECUTOR;};   //; 默认主办人
WfData.prototype.getDefaultNextExecutorName = function(){return this.DEFAULTNEXT_EXECUTOR_NAME;};   //; 默认主办人名列表
WfData.prototype.getNextExecutor2 = function(){return this.NEXT_EXECUTOR2;}; //; 辅办人
WfData.prototype.getNextExecutor2Name = function(){return this.NEXT_EXECUTOR2_NAME;}; //; 辅办人
WfData.prototype.getNextActivity = function(){return this.NEXT_ACTIVITY;};   //; 下一环节
WfData.prototype.getActionId = function(){return this.ACTION_NAME;};         //; 动作名称
WfData.prototype.getPositionId = function(){return this.POSITION_ID;};       //; 职位ID
WfData.prototype.getComment = function(){return this.COMMENT;};              //; 意见
WfData.prototype.getIsBindCommit = function(){return this.WF_IS_BIND_COMMIT;}; //; 是否绑定提交
WfData.prototype.getResponsibility = function(){return this.WF_TASK_RESPONSIBILITY;}; //; 主办辅办
WfData.prototype.getNeedMessage = function(){return this.NEED_MESSAGE;}; //; 是否消息通知
WfData.prototype.getNeedShortMessage = function(){return this.NEED_SHORTMESSAGE;}; //; 是否短信通知
WfData.prototype.getNeedEmail = function(){return this.NEED_EMAIL;}; //; 是否短信通知
WfData.prototype.getSvUserName = function(){return this.USERNAME;}; //; 用户名
//--WfData.prototype.getWFVariable = getWFVariable; //; 获取工作流变量值
//--WfData.prototype.getWFState = getWFState; //; 获取工作流状态值

WfData.prototype.setNextExecutor = function(v){this.NEXT_EXECUTOR = v;};
WfData.prototype.setNextExecutorName = function(v){this.NEXT_EXECUTOR_NAME = v;};
WfData.prototype.setDefaultNextExecutor = function(v){this.DEFAULTNEXT_EXECUTOR = v;};
WfData.prototype.setDefaultNextExecutorName = function(v){this.DEFAULTNEXT_EXECUTOR_NAME = v;};
WfData.prototype.setNextExecutor2 = function(v){this.NEXT_EXECUTOR2 = v;};
WfData.prototype.setNextExecutor2Name = function(v){this.NEXT_EXECUTOR2_NAME = v;};
WfData.prototype.setNextActivity = function(v){this.NEXT_ACTIVITY = v;};
WfData.prototype.setActionId = function(v){this.ACTION_NAME = v;};
WfData.prototype.setPositionId = function(v){this.POSITION_ID = v;};
WfData.prototype.setComment = function(v){this.COMMENT = v;};
WfData.prototype.setIsBindCommit = function(v){this.WF_IS_BIND_COMMIT = v;};
WfData.prototype.setResponsibility = function(v){this.WF_TASK_RESPONSIBILITY = v;};
WfData.prototype.setNeedMessage = function(v){this.NEED_MESSAGE = v;};
WfData.prototype.setNeedShortMessage = function(v){this.NEED_SHORTMESSAGE = v;};
WfData.prototype.setNeedEmail = function(v){this.NEED_EMAIL = v;};
WfData.prototype.setSvUserName = function(v){this.USERNAME = v;};
//--WfData.prototype.setWFVariable = setWFVariable;

WfData.prototype.toString = WfDataToString;


function WfDataToString(obj,entityName) {
  if (!obj)
    obj = this;
  var s = "";
  var name, value;
  for (name in obj) {
    value = obj[name];
    var vtype = typeof value;
    // 忽略未定义、函数和空值
    if ("undefined" != vtype && "function" != vtype && null != value) {
      name = packSpecialChar(name);
      value = packSpecialChar(value.toString());
      value = escapeLineBreak(value);
      s += "<field name=\"" + name + "\" value=\"" + value + "\"/>";
    }
  }
  s += "<entity name=\"_WFVARIABLE\">";
  var wfvariableE=document.getElementById("_WFVARIABLE");
  if (wfvariableE!=null){
    var wfvariableList = wfvariableE.childNodes;
    for (var m = 0, n = wfvariableList.length; m < n; m++){
      if (wfvariableList.item(m).getAttribute("isSet")=="true"){
        s += "<row>";
        s += "<entity>";
        paramName = wfvariableList.item(m).getAttribute("name");
      	vId=wfvariableList.item(m).getAttribute("vId");
      	value=wfvariableList.item(m).value;
      	s += "<field name=\"VariableName\" value=\"" + paramName + "\"/>";
      	s += "<field name=\"VariableId\" value=\"" + vId + "\"/>";
      	s += "<field name=\"VariableValue\" value=\"" + value + "\"/>";
      	s += "</entity>";
      	s += "</row>";
      }
    }
  }
  s += "</entity>";
  if ("" != s) {
    var header = "<entity";
    if (entityName) {
      header += " name=\"" + packSpecialChar(entityName) + "\"";
    }
    s = header + ">" + s + "</entity>";
  }
  return s;
}

/** 获取页面的工作流相关数据 */
function getWfData() {
  if (! _thePageData.wfData) {
    var o = new WfData();
    AS_initObjectByChildNodes(o, document.getElementById("_WFDATA"));
    _thePageData.wfData = o;
  }
  return _thePageData.wfData;
}

/** 编辑页面的 meta 数据 */
function EditPageMeta() {
}
EditPageMeta.prototype.getFlowType = function(){return this.WF_FLOW_TYPE;};
EditPageMeta.prototype.getPageName = function(){return this.pageName;};
EditPageMeta.prototype.getCompoName = function(){return this.componame;};
// TODO: EditPageMeta.getParentCompoName =
EditPageMeta.prototype.getUnique = function(){return this.unique;};

/** 获取页面的 meta 数据 */
function getPageMeta() {
  if (! _thePageData.pageMeta) {
    var o = new EditPageMeta();
    AS_initObjectByAttributes(o, document.getElementById("meta"));
    _thePageData.pageMeta = o;
  }
  return _thePageData.pageMeta;
}

/** 功能按钮相关数据 */
function FuncBean() {
}
FuncBean.prototype.getFuncId = function(){return this.name;};
FuncBean.prototype.getIsBindCommit = function(){return toBooleanTrueFalse(this.WF_IS_BIND_COMMIT);}; // 是否绑定提交
FuncBean.prototype.getActionId = function(){return this.ACTION_NAME;}; // 动作名称


/** 获取功能按钮相关数据 */
function getFuncBean(funcName) {
//  if (! _thePageData.funcBeans)
//    _thePageData.funcBeans = new Object();
//  if (! _thePageData.funcBeans.funcName) {
    var e = document.getElementById(funcName + "ID");
    if (!e)
      return null;
    var o = new FuncBean();
    AS_initObjectByAttributes(o, e);
    return o;
//    _thePageData.funcBeans.funcName = o;
//  }
//  return _thePageData.funcBeans.funcName;
}

/**
 * 生成页面数据的 entity 字符串
 * @param tableName 表名，可以为 null，表示取主表表名
 * @param fieldNames 字段名数组
 * @return 包含指定字段名和字段值的 XML 字符串。格式参见 TableData
 */
function pageDataToEntityString(tableName, fieldNames) {
  if (null == tableName) {
    tableName = getMainTableName();
  }
  var fieldValues = new Array();
  for(var i = 0; i < fieldNames.length; i++){
    fieldValues[i] = getField(fieldNames[i], tableName);
  }
  return AS_arrayToEntityString(fieldNames, fieldValues, tableName);
}
/*
 *获取表格固定行数
 */
function getFixRowCount(tpl_code){
	var sqljpcode;
  var names = new Array();
  var values = new Array();
  names[0] = "componame";
  values[0] = getCompoName();
  names[1] = "sqljpcode";
  if (trim(tpl_code)!=""){
	  sqljpcode=" and PRN_TPL_JPCODE='"+tpl_code+"'";
  	values[1] = sqljpcode;
  }
	var sdetaildelta=qryData("AS_GET_PRINT_JASPERTEMP",names,values);
	//showMessage(sdetaildelta);
  if (!sdetaildelta ||  (sdetaildelta.substring(0,24)=="SYSTEM_EXCEPTION_MESSAGE")) {
		window.close();
		return;
  }
	var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	xmldom.loadXML(sdetaildelta);
	var result = xmldom.documentElement;
	var prn_tpl_fixrowcount;
	if (result){
      if(result.getAttribute("success") == "false"){
    		alert("错误信息："+result.innerHTML);
				return;
	  	}
	    if (result.childNodes.length == 0) {
        prn_tpl_fixrowcount=0;
      }
      else{
	    	prn_tpl_fixrowcount=result.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute("value");
      }
  }
  else{
    prn_tpl_fixrowcount=0;
  }
  return prn_tpl_fixrowcount ;
}

function deleteImgs(s){
  var i = 0;
  var j = 0;
  while(i > -1 && j > -1){
    s = deleteImg(s);
    i = s.indexOf("<TABLE");
    j = s.indexOf("</TABLE>");
  }
  return s;
}

function deleteImg(saveStr){
  var i = saveStr.indexOf("<TABLE");
  var j = saveStr.indexOf("</TABLE>");
  var newStr;
  if(i > -1 && j > -1){
    newStr = saveStr.substring(0,i-2);
    newStr += saveStr.substring(j + 8);
  }else{
    return saveStr;
  }
  return newStr;
}
function getDigest(){
	return document.getElementById("digest").getAttribute("value");
}

//多页签子表获取页面delta。wtm，20050407
function getMultiChildTablePageData(){
  var meta = document.getElementById("maintable");
	var maintable = meta.getAttribute("tablename");
	var delta = "<entity name=\"" + maintable + "\">";
	var vfields = document.getElementById("fields").childNodes;
	for(var i=0,j=vfields.length; i<j; i++){
		var fieldname = vfields.item(i).getAttribute("fieldname");
		var element = document.getElementById(maintable + "_" +
			fieldname + "ID");
		var fieldType = element.getAttribute("fieldType");
		var isKiloStyle = element.getAttribute("kiloStyle");
		delta += "<field name=\"" + fieldname + "\" value=\"";
		var vv = getField(fieldname,maintable);
		if (vv == null )  return;
		if (document.getElementById(maintable + "_" + fieldname
				+ "ID").getAttribute("fieldType") ==  "text"){
			vv = escapeLineBreak(packSpecialChar(vv));
		}
		else if (fieldType == "num"){
			if ((isKiloStyle == "true") || (isKiloStyle == true))
				vv = packSpecialChar(deleteComma(vv));
			else
				vv = packSpecialChar(vv);
		}
		delta += vv + "\"/>";
	}
  var maindelta= delta;
  delta="";
  //主表处理完毕。
  var aCache=new Array();
  var tabDeltaArray= new Array();
  var table2s = meta.childNodes;

  for (var i=0,j=table2s.length; i<j; i++){
		var table2 = table2s.item(i);
   tabDeltaArray[i]= aCache.join("");
   for(var cachenum=0,cachelen=aCache.length;cachenum<cachelen;cachenum++){
     aCache[cachenum]="";
   }

		var table2Name = table2.getAttribute("tablename");
		delta += "<entity name=\"" + table2Name + "\">";
		var table2Grid = document.getElementById(table2Name + "BodyTable");
		var table2Head = document.getElementById(table2Name + "EditTable").rows[0];
		var head2 = document.getElementById(table2Name + "HeadTable");
		var rowIndex = -1;
		var colIndex = -1;
		 if (head2.getAttribute("editing") == "y"){
			 rowIndex = parseInt(head2.getAttribute("row"));
			colIndex = parseInt(head2.getAttribute("col"));
		}
    for (var ix=0,jx=table2Grid.rows.length; ix<jx; ix++){
			/*每隔10行写一次，以保证delta不会太长*/
    var czchlen;
		 if (ix >= 10){
       if (ix % 10== 0){
         czchlen= ix/10;
         aCache[czchlen]=delta;
         delta= "";
       }
     }
		 delta += "<row><entity name=\"" + table2Name + "\">";
		 var row = table2Grid.rows[ix];
		 var effectField = null;
		 var effectValue = null
		 if (table2.childNodes.length > 0){
				effectField = table2.childNodes.item(0).getAttribute("effectField");
			}

		 for (var ir=1,jr=table2Head.cells.length; ir<jr; ir++){
				var fieldName2 = table2Head.cells[ir].getAttribute("fieldName");
				var fieldValue2 = null;
				if ((ix == rowIndex) && (ir == colIndex)){
					fieldValue2 = getRowField(row,fieldName2,true);
				}else{
					fieldValue2 = row.cells[ir].innerHTML;
				}
				if (effectField == fieldName2){
					effectValue = fieldValue2;
				}
				var caption = document.getElementById(table2Name + "_" + fieldName2 +
						"CaptionID");
				var capValue = caption.innerHTML;
				var index = capValue.indexOf("<SPAN");
				if(index > 1){
					//为非空字段或主键
					if((fieldValue2 == null) || (fieldValue2.length == 0)){
						alert("“" + capValue.substr(0, index) + "”不允许为空！");
						return null;
					}
				}

				var element = document.getElementById(table2Name + "_" + fieldName2+'ID');
				var fieldType = element.getAttribute("fieldType");
				var isKiloStyle = element.getAttribute("kiloStyle");
				if (fieldType == "select"){
					/*值集类型*/
				 var tmlen = select.length;
				 fieldValue2 = row.cells[ir].firstChild.value;
				 if ((row.cells[ir].innerHTML).indexOf("select")>=0 ){
							fieldValue2 = select.options[select.selectedIndex].value;
					}else {
							for (var ind=0;ind < tmlen ; ind++){
								if (row.cells[ir].innerHTML == select.options[ind].text){
									fieldValue2 = select.options[ind].value;
												break;
								}else if (row.cells[ir].innerHTML == select.options[ind].value){
									break;
								}
							}
					}
				} else if (fieldType == "num"){
					if ((isKiloStyle == "true") || (isKiloStyle == true))
						fieldValue2 = deleteComma(fieldValue2);
				}
				delta += "<field name=\"" + fieldName2 +"\" value=\"";
				delta += packSpecialChar(fieldValue2) + "\"/>";
			}
			for (var it=0,jt=table2.childNodes.length; it<jt; it++){
				var table3 = table2.childNodes.item(it);
				var table3Name = table3.getAttribute("tablename");
				delta += "<entity name=\"" + table3Name + "\">";
				var colNo = parseInt(document.getElementById(table3Name + "_" + effectField + "Cell").colno);
				var table3Grid = document.getElementById(table3Name + "BodyTable");
				var table3Head = document.getElementById(table3Name + "EditTable").rows[0];
				var head3 = document.getElementById(table3Name + "HeadTable");
				var rowIndex3 = -1;
				var colIndex3 = -1;
				 if (head3.getAttribute("editing") == "y"){
					 rowIndex3 = parseInt(head3.getAttribute("row"));
					colIndex3 = parseInt(head3.getAttribute("col"));
				}
				for (var ir3=0,jr3=table3Grid.rows.length; ir3<jr3; ir3++){
					var table3Row = table3Grid.rows[ir3];
					if (table3Row.cells[colNo].innerHTML == effectValue){
						delta += "<row><entity name=\"" + table3Name + "\">";
						for (var ic=1,jc=table3Head.cells.length; ic<jc; ic++){
							if (ic != colNo){
								delta += "<field name=\"";
								fieldName3 = table3Head.cells[ic].getAttribute("fieldName");
								delta += fieldName3;
								var element3 = document.getElementById(table3Name + "_" + fieldName3+'ID');
								var fieldValue3 = null;
								if ((ir3 == rowIndex3) && (ic == colIndex3)){
									fieldValue3 = getRowField(table3Row,fieldName3,true);
								}else{
									fieldValue3 = table3Row.cells[ic].innerHTML;
								}

								var caption = document.getElementById(table3Name + "_" + fieldName3 +
										"CaptionID");
								var capValue = caption.innerHTML;
								var index = capValue.indexOf("<SPAN");
								if(index > 1){
									//为非空字段或主键
									if((fieldValue3 == null) || (fieldValue3.length == 0)){
										alert("“" + capValue.substr(0, index) + "”不允许为空！");
										return null;
									}
								}

								var fieldType3 = element3.getAttribute("fieldType");
								var isKiloStyle = element3.getAttribute("kiloStyle");
								if(fieldType3 == "select"){
									/*处理值集*/
									var index = fieldValue3.indexOf(" ");
									if(index > 0)
										fieldValue3 = fieldValue3.substring(0, index);
								} else if (fieldType3 == "num"){
									if ((isKiloStyle == "true") || (isKiloStyle == true))
										fieldValue3 = deleteComma(fieldValue3);
								}
								delta += "\" value=\"" + packSpecialChar(fieldValue3);
								delta += "\"/>";
							}
						}
						delta += "</entity></row>";
					}
				}
				delta += "</entity>";
			}

			delta += "</entity></row>";
		}
		delta += "</entity>";
	}
  //二层表处理

  delta= maindelta + tabDeltaArray.join("") + delta;
  delta+= "</entity>";
  return delta;
}
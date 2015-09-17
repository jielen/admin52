var imgPath = "/style/img/main/";
addOrder = false;
addCond = false;
var isLastStatus = false;//上一次方案是系统还是用户级
var isCurrStatus = false;//当前方案状态：默认还是用户

var _oEditTD= null;

function searchPage_cancel(){
	close();
}

function searchPage_ok(){
	var isRight = true;
	var condition = "";
  var meta = document.getElementById("entityMeta");
  var fields = meta.getElementsByTagName("field");
  for(var i=0,j=fields.length; i<j; i++){
    fieldname = fields.item(i).getAttribute("name");
		var field = null;
		var fieldSelect = null;
		field = document.getElementById(fieldname + "ID");
		fieldSelect = document.getElementById(fieldname + "IDS");
		if (field == null || fieldSelect == null) continue;
		if (field.value.length == 0) continue;
		fieldtype = field.getAttribute("fieldType");
    if (fieldtype.toLowerCase() == "text") {
			var fieldValue = field.value.replace("'","''");
			if (fieldSelect.value.toLowerCase().indexOf("like") != -1) {
				condition += " and " + fieldname + " " +fieldSelect.value + " '%"
							 + doubleApos(fieldValue) + "%'";
			} else {
				condition += " and " + fieldname + " " +fieldSelect.value + " '"
							 + doubleApos(fieldValue) + "'";
			}
		} else if (fieldtype.toLowerCase() == "num") {
			condition += " and " + fieldname + " " +fieldSelect.value + " "
							+ field.value;
		} else if (fieldtype.toLowerCase() == "date") {
			condition += " and " + fieldname + " " +fieldSelect.value + " '"
							+ doubleApos(field.value) + "'";
		} else if (fieldtype.toLowerCase() == "valueset") {
			condition += " and " + fieldname + " = '" + doubleApos(field.value) + "'";
		}
	}
	//alert(condition);
	if (isRight) {
		if (condition.length >= 5) {
			returnValue = condition.substr(5);
		} else {
			returnValue = "1=1";
		}
		close();
	}
}

function searchPage_valueSet_onChange(selObj) {
	var name = selObj.name;
	var fieldName = name + "ID";
	var field = document.getElementById(fieldName);
	var index = selObj.selectedIndex;
	if (index == 0) {
		field.value = "";
	} else {
		field.value = selObj.options[index].value;
	}
}

function searchPage_checkField(element){
  var result = true;
	var type = element.getAttribute("fieldType")
	if (type == "text"){
		result = text_Check(element);
		if (!result){
			element.setFocus();
		}
	}else if (type == "num"){
		result = quantity_Check(element);
		if (!result){
			element.setFocus();
		}
	}else if (type == "date"){
		result = date_Check(element);
		if (!result){
			element.setFocus();
		}
	}
  return result;
}


//为解决OA门户高级搜索无效问题，将searchpage.jsp中的所有脚本移到这里。wtm。20041009


  isSearchPage=true;
function exeCallBack(foreign,myobj,backobj){
 try{
     var names=new Array();
     names=backobj[0];
     values=backobj[1];
     var name = null;
     var value="";
     var foreignField = null;
     var foreignFields = document.getElementById(foreign + "fields").childNodes;
     //alert(foreignFields.length);
     var valueIndex = new Array();
     var fieldnames = new Array();
     var alias = new Array();
     for (var i=0,j=foreignFields.length; i<j; i++){
             alias[i] = foreignFields.item(i).getAttribute("alias");
             fieldnames[i] = foreignFields.item(i).getAttribute("fieldname");
             for (var m=0,n=names.length; m<n; m++){
                     if (names[m] == alias[i]){
                             valueIndex[i] = m;
                             break;
                     }
             }
      }
      //alert("is ponit 2");
      for (var i=foreignFields.length-1; i>=0; i--){
          name = foreignFields.item(i).getAttribute("fieldname");
          foreignField = foreignFields.item(i).getAttribute("alias");
          isFK = foreignFields.item(i).getAttribute("isFK");
          //alert("na2:"+name);
          if(isFK == "true"){
                  for (var m=0,n=names.length; m<n; m++){
                       if (names[m] == foreignField){
                            value=values[m]
                            //setField(name,values[m],tablename);
                            break;
                         }
                  }
            }
            // alert("na3:"+name);
      }
      var myTD=myobj.parentElement.parentElement.parentElement;
      var editobj=myTD.all.userinput.firstChild.all[0];
      //  editobj.value=backobj[1][0];
      editobj.value=value;
    }
    catch(e){
      eout("searchPage 25 error;"+e.toString());
    }
  }
function foreignKey_Change(foreign){

  }

function dispHTML(objname){
    var obj=document.getElementById(objname);
    alert(obj.outerHTML);
    var obj2=obj.firstChild;
    if(obj2)
       alert("out:"+obj2.outerHTML);
    else
       alert("child object  is null ");
  }

function deleteItem(){
    //得到当前行指针
    var mytr=event.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    //得到当前行索引号
    var index= mytr.rowIndex;
    var  mytable=mytr.parentElement;
    mytable.deleteRow(index);
  }
  //新增一个查询条件项
function inserNewItem()
  {
     var stable=document.getElementById("searchTableID");
     var newRow= stable.insertRow();    
     var id="r"+newRow.rowIndex;
     //得到一个还没使用过的ID号
     while(true){
         if(!document.getElementById(id) ){
         	break; //检查当前ID 号是否存在
         }else{id+="1";}
     }
     //图标项 TD,第一格用于操作条件 and or  处理
     var nowCell=newRow.insertCell();
     var firstTD="";
     // var firstTD='<img src="/style/img/button/del.gif" onclick="deleteItem();" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();"  alt="点击图标删当前行查询条件">';
     firstTD+='<font size=2><input id=rdand type=radio name='+id+' value=0 checked >与 <\/input></font> ';
     firstTD+='<font size=2><input id=rdor  type=radio name='+id+' value=1>或 <\/input></font> ';
     nowCell.innerHTML=firstTD;

     //第2个TD，处理括号开始
     nowCell=newRow.insertCell();
     var leftbkTD='<td><table><tr><td><font size=2>增减括号</font></td><td><img src="' + imgPath + 'subb.jpg" onclick="openBKmenu();" id="bksta"></td></tr></table>';
     nowCell.innerHTML=leftbkTD;
     
     //TD 第3格TD，字段选择
     nowCell=newRow.insertCell();
     nowCell.setAttribute("id","bkstart"); //括号开始单元格
     nowCell.innerText=" ";
     
     //TD 第3格TD，字段选择
     nowCell=newRow.insertCell();
     var fieldSelect=document.getElementById("fieldselect");
     nowCell.innerHTML="&nbsp;" + fieldSelect.innerHTML;

     // 第4个TD，操作符入　及用户录入
     nowCell=newRow.insertCell();
     var fieldCondi=document.getElementById("firstfield");
     nowCell.innerHTML="&nbsp;" + fieldCondi.innerHTML;

     //第5个TD，处理括号开始
     nowCell=newRow.insertCell();
     nowCell.setAttribute("id","bkend"); //括号开始单元格
     nowCell.innerText=" ";

     //第5个TD，处理括号开始
     nowCell=newRow.insertCell();
     var rightbkTD='<td><table><tr><td ><font size=2>增减括号</font></td><td><img src="' + imgPath + 'subb.jpg" onclick="openBKmenu();" id="bken"></td></tr></table>';
     nowCell.innerHTML=rightbkTD;

     //TD 第6格TD，删除图标
     var nowCell=newRow.insertCell();
     nowCell.align= "center";
     nowCell.borderColor="white";
     var imgTD='<td valign="center" nowrap><table border=0 cellpadding=0 cellspacing=0><tr><td><img src="' + imgPath + 'buttonleft.gif"></td><td background="/style/img/main/buttonmid.gif" valign=center align=center nowrap><input type="button" class="clsStatSearchCallEdit" value="删除" onclick="deleteItem()"></td><td><img src="' + imgPath + 'buttonright.gif"></tr></table>';
     //<img src="/style/img/button/del.gif" onclick="deleteItem();" onmouseenter="mouseEnterForeignIMG();" onmouseout="mouseOutForeignIMG();" onmousedown="mouseDown();" onmouseup="mouseUp();"  alt="点击图标删当前行查询条件">';
     nowCell.innerHTML=imgTD;

     //alert("innerHTML:"+newRow.innerHTML);
     return newRow;
  }

//删除当前项的查询条件项
function deleteCurrItem(){
   //得到只能是当前行的处理图标
   var y= confirm("您确实想删除当前项吗 (Y/N)？");
  //alert("result:"+y);
   var obj=event.srcElement.pararentElement.paratentElement;
  }

  /**改变当前字段列表项后，操作条件，及输入内容框也作相应变化
   * 1. 如果文本型字段，则操作条件应有对应的文本型，日期与数字是同一类型
   * 2. 输入内容可能是一般文本、数值、日期
   * 3. 也可能是值集，WEB 实体
   *
   */
function changeField(){
    //得到当前下拉对象
    var nowSelect=event.srcElement;
    //得到当前下拉对象的索引值
    var index=nowSelect.selectedIndex;
    //得到选取的option
    var selObj=nowSelect.options[index];
    //得到所所字段名
    var sfieldName=selObj.value;
    //得到当前tr
    var nowTR= nowSelect.parentElement.parentElement;
    var editTD=nowTR.cells[4];
    var fieldObj=document.getElementById(sfieldName);
    var fieldType=fieldObj.getAttribute("type");
    var condiSelect;
    if(fieldType=="text")
          condiSelect=document.getElementById("textcondi");
    else
          condiSelect=document.getElementById("numcondi");
    var userEdit=document.getElementById(sfieldName+"text");
    var  userObj=condiSelect.outerHTML+userEdit.innerHTML
    editTD.innerHTML="&nbsp;" + userObj;
    // alert("userEdit=\n"+userEdit.outerHTML);
    // alert("userObj\n"+editTD.innerHTML);
    // alert("nowField:"+sfieldName+"\ntr=\n"+editTD.outerHTML);

		//以上写法少见少见;以下补救实属无赖;参见date.js 21;leidh;20060716;
		_oEditTD= editTD; 
  }

function changeCondi(){
    var obj=event.srcElement;
    var objValue=getSelectValue(obj);
    var tdobj=obj.parentElement;
    var useredit=tdobj.all.userinput;
    if(objValue=="is null"){
         useredit.style.display="none";
    }
    else{
         useredit.style.display="";
    }
  }

function getSelectValue(selobj){
   try{
       var index=selobj.selectedIndex;
       var selvalue=selobj.options[index].value;
       return selvalue;
   }
   catch(e){
     eout("searchPage.jsp 144 error:"+e.toString());
     return "";
   }
  }

function submitItem(){
  //获取排序项;leidh;20040608;
  var vsOrderBy= getOrderBy();
  if (vsOrderBy== null)
  {
    alert("不允许指定重复的排序项!请您更正.");
    return false;
  }
    var stable=document.getElementById("searchTableID");
    var result="(";
    var rows=stable.rows;
    var userEdit;  //用户输入
    //var useroption;  //用户操作选择
    var fieldName;   //字段名
    var fieldValue;
    var fieldCondi; //字段间操作条件
    var fieldType;//字段类型
    var tdobj;
    var trobj;
    //var index;
    //var selobj;
    var fieldobj;
    var where;
    var rdand; //radio and  condition
    var rdandor;//and:true; or:false;
    var fieldIndex=0;
    try {
     //依次求每一行的内容
      //var tablename=maintable.getAttribute("tablename");
      var tablename = "MASTER";//要求主表的别名必须是MASTER,hmgkevin 08-04-15
      var isoracle =maintable.getAttribute("isoracle");
      var bkstText;
      var bkendText;
      //  alert("tablename:"+tablename);
      for(i=0;i<rows.length;i++){
        trobj=rows[i]; //tr obj
        /** hmgkevin 08-04-15
          * cells[0]:and or; cells[1]:brack operation; cells[2]:brackstart; cells[3]:fieldselect; cells[4]:operation,edit
          * cells[5]:brackend; cells[6]:brack operation; cells[7]:delbutton
          */
        //求字段名称
        tdobj=trobj.cells[3]; //得到字段信息,fieldselect
        rdand=trobj.cells[0].all.rdand;//and or
        bkstText =trobj.cells[2].innerText;
        bkendText=trobj.cells[5].innerText;
        fieldName=getSelectValue(tdobj.all.fieldoptions); //每个字段下拉框id=fieldoptions
        fieldobj=document.getElementById(fieldName);
        //这句话新加入，2003－6－25　　刘明
        fieldName=tablename+"."+fieldName;
        fieldType=fieldobj.getAttribute("type");
        //alert("html=\n"+fieldobj.outerHTML);
        //求字段操作条件及字段值
        tdobj=trobj.cells[4];
        fieldCondi=getSelectValue(tdobj.all.condi); //所有字段的操作条件id=condi
        if(fieldCondi=="is null"){
           where=fieldName+" is null ";
        }else{
           userEdit=tdobj.all.userinput.firstChild;
           fieldValue=userEdit.getAttribute("value");
           if(!fieldValue)
              fieldValue=userEdit.firstChild.getAttribute("value");
           //输入为空时，不作处理
           if(trim(fieldValue) =="输入要搜索的关键字")
             fieldValue ="";
           if(((fieldType == "date")|| (fieldType=="num") || (fieldType=="datetime"))&& (fieldValue.length==0)){
               continue;
           }
           //处理日期类型输入
           if((fieldType == "date") && (fieldValue.length>0)){
              if(isoracle=="n")
                fieldValue = "'" + fieldValue + "'";
              else
                fieldValue =" TO_DATE('"+fieldValue+"','yyyy-mm-dd')";
           }
           //处理日期时间类型
           if((fieldType == "datetime") && (fieldValue.length>0)){
             if(isoracle=="n")
                fieldValue = "'" + fieldValue + "'";
             else
               fieldValue =" TO_DATE('"+fieldValue+"','yyyy-mm-dd hh:mm')";
           }
           if( fieldType=="text"){
               if( fieldValue==null || fieldValue.length==0 ){
                   continue;
               }else{
                   fieldValue = doubleApos(fieldValue);
               }
           }
           if ((fieldType == "num")&&(fieldValue.length > 0)){
               fieldValue = deleteComma(fieldValue);
               var fvTmp = parseInt(fieldValue);
               if (isNaN(fvTmp)){
                 alert(fieldName.substring(fieldName.indexOf(".")+1) + "的值无效！");
                 fieldValue = 0;
               }
           }
           fieldCondi=fieldCondi.replace("value",fieldValue);
           where=fieldName+fieldCondi;
      }

      //递交处理
      if(fieldIndex==0){
          result+=bkstText+" ("+where+") "+bkendText;
      }
      else{
         rdandor=rdand.getAttribute("checked");
         if(rdandor)
            result+= "and "+bkstText+"("+where+") "+bkendText;
         else
            result+= "or "+bkstText+"("+where+") " +bkendText;
      }
      fieldIndex++;
   }
   result+=")";

/*   var resultSche = "<delta>";
   resultSche += getScheCond();
   resultSche += getScheOrderCol();
   resultSche += "</delta>";
   saveSearchSche(resultSche);
   */
   var length = document.getElementById("scheNameOptions").length;
   returnValue= new Array(result, vsOrderBy,isSetSearchSchema,length);
   //savecookieCondition(result);
   close();
  }
  catch (e) {
      eout("searchpage.jsp 165 submititem error:"+e.toString());
      returnValue="";
      close();
      return ;
  }
}

function getScheCond(){
  var sTable = document.getElementById("searchTableID");
  var result = "";
  for(var i = 0, j = sTable.rows.length; i < j; i++){
    result += "<entity name=\"condition\">\n";
    var trObj = sTable.rows[i];
    var vAndOr = trObj.cells[0].all.rdand; //与、或
    var vLeft = trObj.cells[2].innerText; //左括号
    var fieldNames = trObj.cells[3]; //字段名
    var vControl = trObj.cells[4]; //操作符
    var fieldValue; //用户输入的值
    var vRight = trObj.cells[5].innerText; //右括号"

		if(i > 0){
			var rdandor = vAndOr.getAttribute("checked");
			if(rdandor)
				result += "<field name=\"C1\" value=\"and\"/>\n";
			else
				result += "<field name=\"C1\" value=\"or\"/>\n";
    }
    result += "<field name=\"C2\" value=\"" + vLeft + "\"/>";

    var fieldName = getSelectValue(fieldNames.all.fieldoptions);
    result += "<field name=\"C3\" value=\"" + fieldName + "\"/>";

    var fieldObj = document.getElementById(fieldName);
    var fieldType = fieldObj.getAttribute("type");
    var fieldCondi = getSelectValue(vControl.all.condi); //所有字段的操作条件id=condi
    result += "<field name=\"C4\" value=\"" + vControl.all.condi.selectedIndex + "\"/>\n";

    if(fieldCondi != "is null"){
      userEdit = vControl.all.userinput.firstChild;
      fieldValue = userEdit.getAttribute("value");
      if(!fieldValue)
         fieldValue = userEdit.firstChild.getAttribute("value");
           //输入为空时，不作处理
      if(trim(fieldValue) =="输入要搜索的关键字")
         fieldValue ="";
      /*if(((fieldType == "date")|| (fieldType=="num") || (fieldType=="datetime"))&& (fieldValue.length==0)){
      	continue;
      }*/
    }
    result += "<field name=\"C5\" value=\"" + fieldValue + "\"/>\n";
    result += "<field name=\"C6\" value=\"" + vRight + "\"/>\n";
    result += "</entity>";
  }
	return result;
}

function getSchemaDesc(isSystemSche){
  var schemaName = document.getElementById("currSchemaName").value;
  if(schemaName == null || trim(schemaName).length == 0){
    alert("请输入方案名称！");
    return false;
  }
  var names = new Array();
  var values = new Array();
  names[0] = "compoId";
  values[0] = meta.componame + "_search";
  names[1] = "userId";
  values[1] = document.getElementById("svUserID").value;
  names[2] = "schemaName";
  values[2] = schemaName;
  var status = requestDataK("getschemastatus", "all",names, values);
  //xmlhttp.responseText
  if(status == "exit"){
    if(isSystemSche){
       if(!confirm("方案‘" + schemaName + "’已经存在，确定要保存为默认方案吗？"))
       return false;
    }else if(!confirm("方案‘" + schemaName + "’已经存在，确定要保存吗？"))
       return false;
  }
  if(status == "isSystemSche"){
    alert("此方案名已经被设为系统默认，请重新输入方案名称！");
    document.getElementById("currSchemaName").value = "";
    return false;
  }
  return true;
}

function saveSearchSche(defaultSche){
  var isSystemSche = false;
  if(defaultSche == "defaultSche")
     isSystemSche = true;
  var resultSche = "<delta>";
  resultSche += getScheCond();
  resultSche += getScheOrderCol();
  resultSche += "</delta>";
  if(!getSchemaDesc(isSystemSche))
  	return;  
  var schemaName = document.getElementById("currSchemaName").value;
  var names = new Array();
  var values = new Array();
  names[0] = "schemaValue";
  names[1] = "compoId";
  names[2] = "schemaName";
  names[3] = "userId";
  names[4] = "systemSchema";
  values[0] = resultSche;
  values[1] = meta.componame + "_search";
  values[2] = schemaName;
  values[3] = document.getElementById("svUserID").getAttribute("value");
  values[4] = "n";  
  if(isSystemSche)
     values[4] = "y";
  var saveRes = requestDataK("saveschema", "all", names, values);
  if(trim(saveRes) == "success"){
      alert("'" + schemaName + "'"+"方案保存成功！");
      addSchemaNameToOption(schemaName);
      isSetSearchSchema = true;
      var length = document.getElementById("scheNameOptions").length;
      returnValue = new Array("","",isSetSearchSchema,length);
  }
}

function getScheOrderCol(){
  var result = "";
  var table = document.getElementById("SortTableID");
  var rows = table.rows;
  var orderCols = new Array();
  for(var i=0; i<rows.length;i++){
    result += "<entity name=\"order\">\n";
    var tr = rows[i];
    var fieldTD = tr.cells[0];
    var fieldName = getSelectValue(fieldTD.all.fieldoptions);
    result += "<field name=\"01\" value=\"" + fieldName + "\"/>\n";
    var desc_ascTD = tr.cells[1];
    var desc_asc = getSelectValue(desc_ascTD.all.SortTypeSelect);
    result += "<field name=\"02\" value=\"" + desc_asc + "\"/>\n";
    result += "</entity>\n";
  }
  return result;
}

 function searchAll(){
  //获取排序项;leidh;20040608;
  var vsOrderBy= getOrderBy();
  if (vsOrderBy== null)
  {
    alert("不允许指定重复的排序项!请您更正.");
    return false;
  }
    var length = document.getElementById("scheNameOptions").length;
    returnValue= new Array("ALL", vsOrderBy,isSetSearchSchema,length);
    close();
 }

function cancelItem(){
    returnValue= new Array("", "");
    close();
  }

  /**
  * 恢复为初始查询状态
  * @return
  */
function resetItem(){
 	resetConItem();
 	resetOrderItem();
 	resetSchemaItem();
}
  
  /**
  * 条件项恢复为初始查询状态
  * @return
  */
function resetConItem(){
    var stable=document.getElementById("searchTableID");
    while(true){
       if( stable.rows(1))
           stable.deleteRow(1)
       else
          break;
    }
    nowCell=stable.rows(0).cells(2); //bkstart clear
    nowCell.innerHTML="&nbsp;";
    nowCell=stable.rows(0).cells(5); //bkend clear
    nowCell.innerHTML="&nbsp;";
    nowCell=stable.rows(0).cells(3);
    var fieldSelect=document.getElementById("fieldselect");
    nowCell.innerHTML="&nbsp;" + fieldSelect.innerHTML;
    nowCell=stable.rows(0).cells(4);
    var fieldCondi=document.getElementById("firstfield"); 
    nowCell.innerHTML="&nbsp;" + fieldCondi.innerHTML;
    if(isLastStatus)
       setTableRowWrite(stable.rows(0));
}

  /**
  * 排序项恢复为初始查询状态
  * @return
  */
function resetOrderItem(){
    var stable=document.getElementById("SortTableID");
    while(true){
       if( stable.rows(1))
           stable.deleteRow(1)
       else
          break;
    }
    var SortFieldTD=document.getElementById("SortFieldTD");
    SortFieldTD.childNodes[0].childNodes[0].selected=true;
    var SortTypeTD=document.getElementById("SortTypeSelect");
    SortTypeTD[0].selected=true;
    if(isLastStatus)
       setTableRowWrite(stable.rows(0));
}

  /**
  * 方案选择项恢复为初始状态
  * @return
  */
function resetSchemaItem(){
    var selectSchemaName=document.getElementById("scheNameOptions");
    document.getElementById("scheNameOptions")[0].selected=true;
    document.getElementById("currSchemaName").value="";
    if(isLastStatus)
      setSchemaName();
}

/**
* 页面初始化处理
*/
function pageInit(){
  //leidh;20040608;
  OrderByInit();

  var foreign=dialogArguments;
  if(foreign==null){
    foreign="";
  }
   var  fobj=document.getElementById("buffer");
   fobj.all("foreign").innerText=foreign;
   //alert(fobj.outerHTML);
   var length = document.getElementById("scheNameOptions").length;
   returnValue = new Array("","",isSetSearchSchema,length);
}

var bkobj;    //标识 bk cursor Object,用于 addBK or subBK
var bkstObj;  //标识　bkstart
var bkendObj; //标识bk end 对象
/**
 * obj 可以是任何一个括号对象，span
 * @return
 */
function findBKstTOend(obj){
    var tdbkobj=obj.parentElement;
    var trobj=tdbkobj.parentElement;
    var tbobj=trobj.parentElement.parentElement;
    var rowsnum=tbobj.rows.length;
    var trIndex=trobj.rowIndex;
    var bkIndex;
    var bknum=0; //到最内层括号个数
    var bkcount=0;
    var tmpobj;
    var tablebk=getBKList();
    if(tdbkobj.tagName=="TD"){
        if( tdbkobj.id=="bkstart" ){
             closeBKCursor(); //设置bkstObj=null,bkendObj=null;
             var objs=tdbkobj.getElementsByTagName("span");
               //求出现括号的序号
             for(var i=0;i<objs.length;i++){
                  if(objs[i]==obj){
                      bkIndex=i;
                      bknum=objs.length-i;
                      break;
                  }
             }
             if(bknum==0)
                 return; //没有找到配对的
             //在同行检查是否有配对情况
             if(tablebk[trIndex][1].length>= bknum){ //在同行找到
                 var sobj=trobj.cells[5].getElementsByTagName("span")[bknum-1];
                 openBKCursor(obj,sobj);
                return;
             }
             //求指针开始序号,这一行不会出现 trIndex==rowsnum-1 的情况
             var stcount=bknum;
             for(var j=rowsnum-1;j<trIndex;j--){
                 stcount=tablebk[j][0].length;
                 if(stcount>0){
                   var endcount=0;
                   for(var i=j;i<rowsnum;i++){
                      endcount+=tablebk[j][1].length;
                      if(endcount>=stcount){

                      }
                      else
                        tablebk[j][1]="";

                   }
                 }
             }
             for(var i=trIndex+1;i<rowsnum;i++){
                stcount+=tablebk[i][0].length;
             }
             for(var i=trIndex;i<rowsnum;i++){
               endcount+=tablebk[i][1].length;
                if(endcount>=stcount){ //找到配对行
                   bkIndex=stcount+tablebk[i][1].length-endcount-1;
                   var sobj=tbobj.rows[i].cells[5].getElementsByTagName("span")[bkIndex];
                   openBKCursor(obj,sobj);
                   return;  //找到配对，成功返回
                }
             }
             return; //说明没有找到配对情况
          }
          else if(tdbkobj.id=="bkend"){
            closeBKCursor();
            bkendObj=obj;
            var objs=tdbkobj.getElementsByTagName("span");
              //求出现括号的序号
              for(var i=0;i<objs.length;i++){
                 if(objs[i]==obj){
                     bkIndex=i;
                     bknum=i+1;
                     break;
                 }
              }

            if(bknum==0)
                 return; //没有找到配对的

            for(var i=trIndex;i>=0;i--){
               var tdobj=tbobj.rows[i].cells[2]; //第4格为括号
               var spobj=tdobj.getElementsByTagName("span");
                  if( (bkcount+spobj.length) >=bknum){ //说明找到回程括号
                    tmpobj=spobj[spobj.length-bknum+bkcount];
                    openBKCursor(tmpobj,obj);
                    break;
                  }
                  else
                    bkcount+=spobj.length;
            }
            //如果在此bkendObj==null，说明没有找到结尾标志
          }
        }
}


function closeBKCursor(){
  if(bkstObj && bkendObj){
     bkstObj.style.backgroundColor="";
     bkendObj.style.backgroundColor="";
     bkstObj=null;
     bkendObj=null;
  }
}

function openBKCursor(stobj,endobj){
   bkstObj=stobj;
   bkendObj=endobj;
   bkstObj.style.backgroundColor="#00FFFF";
   bkendObj.style.backgroundColor="#00FFFF";

}

function openBKmenu(){
    var mobj=event.srcElement;
    var pmobj=mobj.parentElement.parentElement.parentElement.parentElement.parentElement;
       if(mobj.tagName=="IMG" && mobj.id.indexOf("bks")==0){
         openBK(pmobj.parentElement.childNodes[2]);
       }
       else if(mobj.tagName=="IMG" && mobj.id.indexOf("bke")==0){
         openBK(pmobj.parentElement.childNodes[5]);
       }
       else if(mobj.tagName=="SPAN" &&
               pmobj.tagName=="TD" && pmobj.id.indexOf("bk")==0){
         openBK(pmobj);
       }
       else
         bkobj=null;
}

function openBK(mobj){

  bkmenu.style.display="";
  //var x=parseInt(mobj.offsetLeft)+parseInt(mobj.offsetWidth)-parseInt(bkmenu.offsetWidth);
  var x= window.event.clientX + document.documentElement.scrollLeft
                             + document.body.scrollLeft;
  var y= window.event.clientY + document.documentElement.scrollTop
                             + document.body.scrollTop;    
                                              
  //var y=event.srcElement.offsetHeight;
 //  bkmenu.style.left=event.clientX+document.body.scrollLeft;
 //  bkmenu.style.top =event.clientY+document.body.scrollTop;
    bkmenu.style.left=x - 50;
    bkmenu.style.top =y - 45;
    mx.value=mobj.offsetLeft+","+mobj.offsetWidth+","+bkmenu.offsetWidth;
    my.value=y;

   event.cancelBubble=true;
   bkobj=mobj;
}

/**
 * 得到括号的全部列表
 * @return
 */
function getBKList(){
  var rows=searchTableID.rows;
  var rowsnum=rows.length;
  var tablebk= new Array();
  var str;
  //取括号
      for(var i=0;i<rowsnum;i++){
        var rowbk=new Array(2);
        var str=rows[i].cells[2].innerText;
            str=str.replace(/ /g,"");
           rowbk[0]=str;
           str=rows[i].cells[5].innerText;
           str=str.replace(/ /g, "");
          rowbk[1]=str;
          tablebk[i]=rowbk;
          //alert(tablebk.length+"--"+rowbk+"\n total:"+tablebk);
      }

     return tablebk;

}

/**
 * 检查括号是否配对，如果有不配对的地方则用红色表示
 * 从最后一个括号开始检查
 * @return
 */
function checkBK(){
  var rows=searchTableID.rows;
  var rowsnum=rows.length;
  //取括号
  clearBKSpan(searchTableID);
  var tablebk= getBKList();
  //alert("result:"+tablebk);
  //括号检查
  var endcount;
  var stcount;
  //alert("bk:-->"+tablebk);
  //从最内层括号检查配对情况，遇到第一个不配对时退出,返回false;
      for(var i=rowsnum-1;i>=0;i--){
        var rowbk=tablebk[i];
            //检查配对
            stcount=rowbk[0].length;
            if(stcount>0){
               endcount=0;
               //alert("stn:"+stcount);
               for(var j=i;j<rowsnum;j++){
                  endcount+=tablebk[j][1].length;
                  //alert(j+":end cn:"+endcount);
                  if(endcount>=stcount){ //找到回来的括号
                    tablebk[j][1]=tablebk[j][1].substring(tablebk[j].length-endcount+stcount);
                    break;
                  }
                  else
                    tablebk[j][1]=""; //清空 尾
               }
               tablebk[i][0]=tablebk[i][0].substring(endcount);
               //alert(i+"--\n"+tablebk);
            }
      }
     for(var i=0;i<rowsnum;i++){
       var rowbk=tablebk[i];
             setBKSpanError(rows[i],rowbk);
     }
}

function clearBKSpan(tbobj){
    var rows=tbobj.rows;
    for(var i=0;i<rows.length;i++){
        var s1=rows[i].cells[2].getElementsByTagName("span");
          for(var j=0;j<s1.length;j++)
             s1[j].style.backgroundColor="";
        var s2=rows[i].cells[5].getElementsByTagName("span");
          for(var j=0;j<s2.length;j++){
             s2[j].style.backgroundColor="";
          }
   }
}

function setBKSpanError(trobj,rowbk){
  if(rowbk[0].length>0){
     var sobj=trobj.cells[2].getElementsByTagName("span");
     for(var i=0;i<rowbk[0].length;i++){
         sobj[i].style.backgroundColor="red";
     }
  }
  if(rowbk[1].length>0){
     var sobj=trobj.cells[5].getElementsByTagName("span");
     var num=sobj.length;
     if(num>0)
      for(var i=num-1;i>=(num-rowbk[1].length);i--){
         sobj[i].style.backgroundColor="red";
      }
  }
}

/**
 * 新增一个括号
 * @return
 */
function addbk(){
  var sobj=document.createElement("span");
  sobj.style.fontSize=13;
  var bkstr="?";
      if(!bkobj)
         return;
      if(bkobj.id=="bkstart")
         bkstr="(";
      else
         bkstr=")";
      sobj.innerText=bkstr;
      bkobj.appendChild(sobj);
      checkBK();
      findBKstTOend(sobj);
  //alert(bkobj.outerHTML);
}

/**
 * 减少一个括号
 * @return
 */
function subbk(){
     if(!bkobj)
           return;
 var sobjs=bkobj.getElementsByTagName("span");
     if(sobjs.length==0)
        return;
     sobjs[sobjs.length-1].outerHTML="";
     checkBK();
     //alert(bkobj.outerHTML);
}


//-------------------------------------------





function savecookieCondition(searchCondition){
  var  foreign=document.getElementById("buffer").all("foreign").innerText;
  var searchName=meta.componame+foreign+"-sr";
  setCookie(searchName,searchCondition);
}


function loadcookieSearchCondition(){
  //载入客户先前页面存入的查询内容
  var  foreign=document.getElementById("buffer").all("foreign").innerText;
  var searchName=meta.componame+foreign+"-sr";
  var lastSearch = loadCurrStatSchema();
  //var lastSearch=getCookie(searchName);
  return lastSearch;
}

function loadCurrStatSchema(schemaN){
  var schemaName;
  if(trim(schemaN) != "")
    schemaName = schemaN;
  else schemaName = document.getElementById("scheNameOptions").value;
  if(schemaName == null || trim(schemaName).length == 0){
    alert("请选择方案名称！");
    return;
  }
  if(trim(schemaN) == "")
    document.getElementById("currSchemaName").value = schemaName;
  var names = new Array();
  var values = new Array();
  names[0] = "compoId";
  names[1] = "userId";
  names[2] = "schemaName";
  values[0] = meta.componame + "_search";
  values[1] = document.getElementById("svUserID").getAttribute("value");
  values[2] = schemaName;
  var schema = requestDataK("loadschema", "all", names, values);
  loadSchema(schema);  
}

function loadSchema(schema){
  //alert(schema);
  if(!schema || schema.length == 0){
    //resetPage(); //无此方法,此句何用;
    return;
  }
  var isSystemSche = false;
  addOrder = false;
  addCond = false;
  var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
  xmlDom.loadXML(schema);
  var root = xmlDom.getElementsByTagName("entity");
//  var root = xmlDom.childNodes;
  if (!root) return;
  var sl = root.length;
  var systemSche;
  if (sl >= 1)
    systemSche = root[sl-1].getAttribute("name");
  if(systemSche == "systemSche"){
     isSystemSche =true;
     isCurrStatus = true;
  }else isCurrStatus = false;
  resetSchemaAreaRW(isSystemSche);
  var userID = document.getElementById("svUserID").value;
  userID = userID.toLowerCase();
  for(var i=0; i<sl; i++){
    var schemaLoca = root[i].getAttribute("name");
    var tmpS = root[i].childNodes;
    if(userID != "sa" && isSystemSche){
        if(schemaLoca == "condition") setDefaultSchemaCond(tmpS);
        if(schemaLoca == "order"){
           setDefaultSchemaOrder(tmpS);
           isLastStatus = true;
        }
    }else{
       if(userID == "sa") setSchemaName();
    	if(schemaLoca == "condition") setSchemaCond(tmpS);
    	if(schemaLoca == "order"){
    	   setSchemaOrder(tmpS);
    	   isLastStatus = false;
    	}
   }
  }
}

function getValIndex(vals, val){
  var r;
  for(var k=0; k<vals.options.length; k++){
    if(vals.options[k].value == val){
      r = k;
      break;
    }
  }
  return r;
}

function setSchemaCond(tmpS){
  var table = document.getElementById("searchTableID");
  var l = tmpS.length;
  var fName;
  var fn;
  var row;
  var index;
  var fieldType;
  if(!addCond){
    resetTables(table);
    row = table.rows[0];
    addCond = true;
  }else{
    row = inserNewItem();
  }
  for(var i=0; i<l; i++){
    fn = tmpS[i].getAttribute("name");
    fName = tmpS[i].getAttribute("value");
    if(fn == "C2"){
    	/*var sobj = document.createElement("span");
  		sobj.style.fontSize = 13;
  		if (fName.replace(/ /gi, "")== "") fName= "";
      sobj.innerText = fName;
      row.cells[2].appendChild(sobj);*/
      row.cells[2].innerText = fName;
    }
    if(fn == "C6"){
    	/*var sobj = document.createElement("span");
  		sobj.style.fontSize = 13;
  		if (fName.replace(/ /gi, "")== "") fName= "";
      sobj.innerText = fName;
      row.cells[5].appendChild(sobj);*/
      row.cells[5].innerText = fName;
    }
    if(fn == "C3"){
      var aa = row.cells[3].all.fieldoptions;
      fieldType = document.getElementById(fName).getAttribute("type");
      aa.selectedIndex = getValIndex(aa, fName);
      var condiSelect = document.getElementById("numcondi");
      if(fieldType == "text")
        condiSelect = document.getElementById("textcondi");
      var editTD=row.cells[4];
      var userEdit = document.getElementById(fName + "text");
      var userObj = condiSelect.outerHTML + userEdit.innerHTML;
      editTD.innerHTML = "&nbsp;" + userObj;
      //20090630 add dangzw   
      _oEditTD= editTD; 
    }
    if(fn == "C1"){
      if(fName == "and")
        row.cells[0].all.rdand.checked = true;
      else
        row.cells[0].all.rdor.checked = true;
    }
    if(fn == "C4"){
      var aa = row.cells[4].all.condi;
      aa.selectedIndex = fName;
    }
    if(fn == "C5"){
      var userinput = row.cells[4].all.userinput;
      if(fName == "undefined")
         fName = "";
      if(userinput.firstChild.tagName == "SELECT"){
        userinput.firstChild.value = fName;
      }else{
        userinput.firstChild.all[0].value = fName;
      }
    }
  }
  if(isLastStatus&&!isCurrStatus)
     setTableRowWrite(row);
  return row;
}

function setSchemaOrder(tmpS){
  var table = document.getElementById("SortTableID");
  var l = tmpS.length;
  var fName = tmpS[0].getAttribute("value");
  var row;
  var index;
  if(!addOrder){
    resetTables(table);
    row = table.rows[0];
    addOrder = true;
  }else{
    row = inserNewOrderCol();
  }
  for(var i=0; i<l; i++){
    fn = tmpS[i].getAttribute("name");
    fName = tmpS[i].getAttribute("value");
    if(fn == "01"){
		var aa = row.cells[0].all.fieldoptions;
  		aa.selectedIndex = getValIndex(aa, fName);
    }
    if(fn == "02"){
		var aa = row.cells[1].all.SortTypeSelect;
  		aa.selectedIndex = getValIndex(aa, fName);
    }
  }
  if(isLastStatus&&!isCurrStatus)
     setTableRowWrite(row);
  return row;
}

function resetTables(table){
  while(table.rows.length > 1){
    table.deleteRow(1);
  }
}

	/*
	*增加一排序列
	*/
function inserNewOrderCol(){
	 var stable=document.getElementById("SortTableID");
	 var newRow= stable.insertRow();
//     nowCell = newRow.insertCell();
//     nowCell.innerHTML = "&nbsp;";
     
	//TD	第1格TD，数值字段选择
     nowCell = newRow.insertCell();
     var cell_1 = document.getElementById("SortFieldTD");
     nowCell.innerHTML = cell_1.innerHTML;

	nowCell=newRow.insertCell();
	var fieldSelect=document.getElementById("SortTypeTD");
	nowCell.innerHTML=fieldSelect.innerHTML;

//  nowCell = newRow.insertCell();
//  nowCell.innerHTML = "&nbsp;";

	//TD	第2格TD，删除图标
	nowCell=newRow.insertCell();
    nowCell.align= "center";
    var imgTD='<td valign=center nowrap><table border=0 cellpadding=0 cellspacing=0><tr><td><img src="' + imgPath + 'buttonleft.gif"></td><td background="/style/img/main/buttonmid.gif" valign=center align=center nowrap><input type="button" class="clsStatSearchCallEdit" value="删除" onclick="deleteItem();"></td><td><img src="' + imgPath + 'buttonright.gif"></tr></table></td>';
    nowCell.innerHTML=imgTD;

	return	newRow;
}
/**
 * 此函数据onload 事件作处理，初始化页面
 * 回设查询条件，
 * 1、先将查询条件从客户端内存读出
 * 2、解析读出的内容
 * 3、分析内容的正确性
 * 4、只将正确的内容写入当前的查询语句中
 * 5、同时检查括号的正确性
 * 返回内容：
 * 将存贮的在内存中的字串重新回显在查询页面
 *
 */
function backSetSearchOptions(searchCondition){

var list=parseConditionList(searchCondition);
    //alert("result list:\n"+list);

var listIndex=0;
var optionIndex;
var opion;
var trobj;
    for(var i=0;i<list.length;i++){
       option=list[i];
       optionIndex=getFieldOptionIndex(option);
       if(optionIndex==-1)
               continue;
       if(listIndex==0){
         option[6]=-1;
         trobj=searchTableID.rows[0];
         addcookieNewItem(trobj,option);
       }
       else{
         trobj=inserNewItem();
         addcookieNewItem(trobj,option);
       }
       listIndex++;
      // alert(listIndex+"\n"+trobj.outerHTML);
    }

}

function addcookieNewItem(trobj,option){
  //alert("search-475:"+trobj.outerHTML+  "\n"+option);
  var sfieldName=option[1];

  //置入字段名
  var fieldSelectObj=trobj.cells[3].getElementsByTagName("select")[0];
      fieldSelectObj.value=sfieldName;

  //置入操作条件及用户输入值
      var editTD=trobj.cells[4];
      var fieldObj=document.getElementById(sfieldName);

      var fieldType=fieldObj.getAttribute("type");
      var condiSelect;
          if(fieldType=="text")
              condiSelect=document.getElementById("textcondi");
          else
              condiSelect=document.getElementById("numcondi");

      var userEdit=document.getElementById(sfieldName+"text");
      var  userObj=condiSelect.outerHTML+userEdit.innerHTML
          editTD.innerHTML=userObj;
         //alert(editTD.outerHTML);

  //置入操作条件
     var condi=editTD.all.condi; //这是一个select 标签
         //alert("search-condi-498:"+condi.outerHTML+"\n"+option[2]);
         condi.value=option[2];

  //置入用户的操作值
   var userinput=editTD.all.userinput;
        //alert("search 503:"+userinput.outerHTML+"\n "+option[3]);
         if(userinput.firstChild.tagName=="SELECT"){
            userinput.firstChild.value=option[3];

         }else{
         userinput.firstChild.all[0].value=option[3];
         }

    if(option[3]=="is null"){
        userinput.style.display="none";
    }
    else{
        userinput.style.display="";
    }
  //置入操作条件 and or 操作符
    switch(option[5]){
       case 0:  //and
         trobj.all.rdand.checked=true;
         break;
       case 1:  //or
       trobj.all.rdor.checked=true;
         break;
       default:
          break;


    }

}


  /** 用于检查当前字段的合法性，主要是数据库结构的变化会偶尔导至存在客户的内容发生了变化，不能及时反映
   * foption 有6部分
      * 1、括号开始(((
      * 2、表名及字段名 tablename.fieldname
      * 3、操作条件 = <> >= <= like not not like
      * 4、操作条件对应值
      * 5、括号结束 )))
      * 6、当前行的操作条件 -1,0:or,1:and

   * @return
      * 如果在当前页面的下拉框内找到相关字段，则返回字段对应index 号，
        如果没有找到，否返回　-1
   */
 function getFieldOptionIndex(foption){
   var fieldname=foption[1];

   var options=fieldselect.all.fieldoptions.options;
       for(var i=0;i<options.length;i++){
           if(options[i].value==fieldname)
                           return i;
       }
       return -1;
 }

/**
 * 解析存贮条件为一个条件列表，用于还原显示查询部分
 * condis的格式可能为 tab1.field1='value1' or tab2.field2 like '%value%' and tab3.field3 > 123.45
 * 还可能为 ((tab1.field1='value1' or tab2.field2 like '%value%') and tab3.field3 > 123.45)
 * @return
 */
 function parseConditionList(condis){
 var ops=new Array(" and "," or ");
 var index;
 var indexAnd,indexOR;
 var fieldStr;
 var list=new Array();
 var previewCondi=-1;  //前一个字串的条件，第一个总是-1; 0:and,1:or
 var oneList; //每行的条件解析结果

       while(true){
       var i;

           indexAnd=condis.indexOf(ops[0]);
           indexOR=condis.indexOf(ops[1]);

           if(indexAnd==-1 && indexOR==-1){
             oneList=getOneConditionValues(condis);
             if(oneList!=null){
                oneList[5]=previewCondi;
                list[list.length]=oneList;
                //alert("<-->"+oneList);
             }
             ;
             //alert(condis+"\n onelast-->"+oneList+"\n list:"+list);
             break;
           };

           if(indexAnd!=-1 && indexOR !=-1){
             if(indexAnd<indexOR){
               index=indexAnd;
               i=0;
              }
              else{
               index=indexOR;
               i=1;
             }
           }
           else{
               if(indexAnd!=-1){
                     index=indexAnd;
                     i=0;
               }
               else{
                     index=indexOR;
                     i=1;
               }
           }
           ;
           fieldStr=condis.substring(0,index);
           condis=condis.substring(index+ops[i].length);
      //  alert(index+"--searchPage-602 now:"+fieldStr+"\n next str:"+condis);
           oneList=getOneConditionValues(fieldStr);
           if(oneList!=null){
              oneList[5]=previewCondi;
              list[list.length]=oneList;
              //alert("<-->"+oneList);
           }
           previewCondi=i;

        //alert("fieldstr:"+fieldStr+"\n\totalstr:"+condis+"\n-->"+oneList+"\n result:\n"+list);
       }
       return list;
 }

 /**
  * 得到一个工作条件几个值
  * 0:1、括号开始(((
  * 1:2、表名及字段名 tablename.fieldname
  * 2:3、操作条件 = <> >= <= like not not like
  * 3:4、操作条件对应值
  * 4:5、括号结束 )))
  * 5:6、当前行的操作条件 -1,0:and,1:or
  * @return
  */
function getOneConditionValues(condi){
    var options=new Array(6); //应为4　个
    var index;
    /*
     对Oracle 处理方法,先清除 oracle　日期字段的格式处理部分
          fieldValue =" TO_DATE('"+fieldValue+"','yyyy-mm-dd')";
          fieldValue =" TO_DATE('"+fieldValue+"','yyyy-mm-dd hh:mm')";
    */
    var oracleDate=" TO_DATE('";
   // alert("before:"+condi);
   //正则表达式不可以采用或操作完成所有替换处理
   //  var reg=/to_date\('|','yyyy-mm-dd\)'|','yyyy-mm-dd hh:mm'\)/gi;

    var reg=/to_date\('/gi;
        condi=condi.replace(reg,"");
        reg=/','yyyy-mm-dd hh:mm'\)/gi;
        condi=condi.replace(reg,"");
        reg=/','yyyy-mm-dd'\)/gi;
        condi=condi.replace(reg,"");
     //alert("reg:"+condi);

    //第一部分,先求括号,
        index=condi.lastIndexOf("(");
        if(index!=-1){
          //alert(index);
          options[0]=condi.substring(0,index+1);
          condi=condi.substring(index+1);
        }

    //第二部分，找操作符，可以确定前后内容
    /*
    "=value",     //0
    "<>value",    //1
    ">value",     //2
    ">=value",    //3
    "<value",     //4
    "<=value",    //5
    " like '%value%' ",     //2
    " not like '%value%' ",     //3
    "is null"
    */
  var ops=new Array("<>",">=","<=",">","<","="," not like "," like "," is null "," in ");
      index=-1;
      var i=0;
        for(i=0;i<ops.length;i++){
          index=condi.indexOf(ops[i]);
          if(index!=-1)
                    break;
        }

        if(i==options.length ||index<2) //至少一个字段字符
             return null;
    
   //第二部分，得到表名与字段名,tablename.filedname
   var fieldname=condi.substring(0,index);
        condi=condi.substring(index);

        //清除点符号,以后这部分要作修改
         index=fieldname.indexOf(".");
      fieldname=fieldname.substring(index+1);
      options[1]=fieldname;

   //第三部分，得到操作条件,> < >= <= etc.
   options[2]= condi.substring(0,ops[i].length);
        condi=condi.substring(ops[i].length);

  //先求第五部分，尾括号，其余为字段的值
    index=condi.indexOf(")");
      if(index!=-1){
        options[4]=condi.substring(index); //得到括号
        options[3]=condi.substring(0,index);//得到比较字段的值
      }
      else{
        options[3]=condi; //得至无尾括号时的比较字段的值
      }

  //处理ORACLE　日期字段值的部分
   // alert("value:"+options[3]);
    index=options[3].indexOf(oracleDate);
    if(index!=-1){
    options[3]=options[3].substring(index+oracleDate.length);
          index=options[3].indexOf("'");
          options[3]=options[3].substring(0,index);
   }

   //处理单引号' 及　%　'　的问题,还原操作条件 ,like "%value%" ,>value, ='value' etc.
  var condivalue=options[3];
   //alert("search-689:"+options);

   if(options[3]!=null && options[3].length>0){
      options[3]=options[3].replace(reg,"");
      reg=/'/g;
      options[3]=options[3].replace(reg,"");
      reg=/%/g;
      options[3]=options[3].replace(reg,"");
      reg=new RegExp(" ");
      options[3]=options[3].replace(reg,"");
    //alert(condivalue+"-len:"+condivalue.length+"\n--797-value:\n"+options[3]+"-"+options[3].length);
      condivalue=getCondiValue(condivalue,options[3]);
      index=options[3].indexOf(" ");
     // alert("space index: "+index); //used to test

   }

   //还原最初操作条件 like %value, > vlaue
   options[2]+=condivalue;
    //alert("search-705:"+options);
   return options;

}

/**
 * 此函数本来可以用正则表达式，可是不能处理++ 等符号
 * @return
 */
function getCondiValue(saveStr,valstr){
  var result;
  var index=saveStr.indexOf(valstr);
      result=saveStr.substring(0,index)+"value";
      result+=saveStr.substring(index+valstr.length);
      return result;

}
/**
 * 除去首尾空格
 * @return
 */
function trimR(str){
 //除尾空格
 var index;
   alert(str+",length-start:"+str.length);
 while(true){
    index=str.lastIndexOf(" ");
    if(index==-1)
        break;
    str=str.substring(0,index);
 }
 alert(str+",length-end:"+str.length);
 return str;

}
function getCookie(Name) {
  var search = Name + "="
  if (document.cookie.length > 0) { // 页面COOKIE　存在
    offset = document.cookie.indexOf(search);
    if (offset != -1) { //COOKIE　中存在对应的值
      offset += search.length
      // set index of beginning of value
      end = document.cookie.indexOf(";", offset) //找到COOKIE　结尾
      // set index of end of cookie value
      if (end == -1)
        end = document.cookie.length
      return unescape(document.cookie.substring(offset, end))
    }
  }
  return null;
}


function setCookie(name,value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 1000*60*60*24*365); //365　天后过期
    document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString() + ";path=/";

}

function ts1(){
  var value="liuming";
  var s=value.substring(value.length);
    // alert("-->"+s+"-"+s.length);
  var s="liuming % abc kong beijing汉字A++3.45 %";
  var reg=new RegExp(value,"g");
  var s2=s.replace(reg,"gerui");
     alert(s+"\n"+s2);
}

/**
 *
 * condis的格式可能为 tab1.field1='ming1' or tab2.field2 like '%study%' and tab3.field3 > 123.45
 * 还可能为 ((tab1.field1='valab1' or tab2.field2 like '%china%') and tab3.field3 > 123.45)
 * @return
*/
function ts1_e(){
 var s= " ((tab1.field1='mingliu1' or tab2.field2 like '%A+ 版本中国3.45%') and tab3.field3 > TO_DATE('2003-12-12','yyyy-mm-dd')) and tab4.departno>1234.98";
 var list= parseConditionList(s);
 alert("last: \n"+list);

}

 /**
  * 测试字串解析函数
  * @return
  */

function ts2(){
/*
  var s="0123456789";
     alert(s.substring(0,3)+"--");
     */
  var ops=getOneConditionValues("(((table1.fieldcompoasdf not like  TO_DATE('1999-12-32','yyyy-mm-dd hh:mm')))");
  alert(ops);
}

function tsmenuout(){
   var mobj=event.srcElement;
      if(mobj.id && mobj.id=="bkmenu"){
       alert(event.srcElement.outerHTML);
      }
}

function closeBKmenu(){
   bkmenu.style.display="none";
   //alert(bkmenu.outerHTML);
}



//----------------------------------------------------------------
//leidh;20040608;
//新增一个排序项;
function inserNewSortItem()
{
   var stable=document.getElementById("SortTableID");
   var newRow= stable.insertRow();
   var nowCell= null;
   var id="r"+newRow.rowIndex;

//   nowCell=newRow.insertCell();
//   nowCell.innerText= " ";

   nowCell=newRow.insertCell();
   var vjFirstTD= document.getElementById("SortFieldTD");
   nowCell.innerHTML= vjFirstTD.innerHTML;

   nowCell=newRow.insertCell();
   var vjFirstTD= document.getElementById("SortTypeTD");
   nowCell.innerHTML= vjFirstTD.innerHTML;

//   nowCell=newRow.insertCell();
//   nowCell.innerText= " ";

   nowCell=newRow.insertCell();
   nowCell.align= "center";
   var imgTD='<td valign=center nowrap><table border=0 cellpadding=0 cellspacing=0><tr><td><img src="' + imgPath + 'buttonleft.gif"></td><td background="/style/img/main/buttonmid.gif" valign=bottom align=center nowrap><input type="button" class="clsStatSearchCallEdit" value="删除" onclick="deleteItem();"></td><td><img src="' + imgPath + 'buttonright.gif"></tr></table></td>';
   nowCell.innerHTML= imgTD;

   //alert("innerHTML:"+newRow.innerHTML);
   return newRow;
}

//获取排序字段串;leidh;20040608;
//反回: 成功: Order By 串; 失败: null;
function getOrderBy()
{
  var vjSortTable= document.getElementById("SortTableID");
  //var tableName=maintable.getAttribute("tablename");
  var tableName = "MASTER";//主表的别名必须是MASTER
  var vsOrderBy= "";
  var vsSortField= "";
  var vsSortType= "";

  var vjRow= null;
  var vjCell= null;
  var vjSelect= null;

  for (var i= 0; i< vjSortTable.rows.length; i++)
  {
    vjRow= vjSortTable.rows[i];
    vjCell= vjRow.cells[0];
    vjSelect= vjCell.firstChild;
    vsSortField= vjSelect.value;
    if (vsSortField== null || vsSortField.length== 0) continue;

    vjCell= vjRow.cells[1];
    vjSelect= vjCell.firstChild;
    vsSortType= vjSelect.value;

    if (vsOrderBy.indexOf(" "+ vsSortField+ " ")>= 0)
    {
      return null;
    }

    if (vsOrderBy.length> 0) vsOrderBy+= ", ";
    vsOrderBy+= " " + tableName + "."+ vsSortField+ " "+ vsSortType+ " ";
  }

  //alert(vsOrderBy);
  return vsOrderBy;
}

//Order By 初始化;
function OrderByInit()
{
  var vjSortFieldTD= document.getElementById("SortFieldTD");
  var vjSortFieldSelect= vjSortFieldTD.firstChild;
  var vjOption= document.createElement("<option>");
  vjSortFieldSelect.options.add(vjOption, 0);
  vjSortFieldSelect.selectedIndex= 0;

  vjSortFieldSelect.onchange= null;
  return true;
}

function deleCurrSearchSchema(){
  var schemaOpt = document.getElementById("scheNameOptions");
  var schemaName = document.getElementById("currSchemaName").value;
  var isExitSche = false;
  if(schemaName == null || trim(schemaName).length == 0){
    alert("请输入方案名称！");
    return;
  }else{
  	for(var i=0;i<schemaOpt.length;i++){
     	if(schemaOpt.options[i].value == schemaName){
     	  isExitSche = true;
     	  break;
     	}
    }
    if(!isExitSche){
       	alert("请输入正确的方案名称！");
       	return;
   }
  }
  if(!confirm("确实要删除方案‘" + schemaName + "’吗？")){
    return ;
  }
  var names = new Array();
  var values = new Array();
  names[0] = "compoId";
  names[1] = "userId";
  names[2] = "schemaName";
  values[0] = meta.componame + "_search";
  values[1] = document.getElementById("svUserID").value;
  values[2] = schemaName;
  var result = requestDataK("deleteschema","all",names,values);
  //result = result.text;
  if(result == "success"){
     alert("删除成功！");
     deleteSchemaNameFromOption(schemaName);
     isSetSearchSchema = true;
     var length = document.getElementById("scheNameOptions").length;
     returnValue = new Array("","",isSetSearchSchema,length);     
  }
  else 
     alert("删除失败！");
  document.getElementById("scheNameOptions").value = "";
  document.getElementById("currSchemaName").value = "";
  resetPage();
}

function deleStatSchema_R(){
  document.getElementById("scheNameOptions").value = "";
  document.getElementById("currSchemaName").value = "";
  resetPage();
  alert("删除成功！");
}

function resetPage(){
  table = document.getElementById("searchTableID");
  resetTables(table);
  table = document.getElementById("SortTableID");
  resetTables(table);
  resetItem();
}

function setDefaultSchemaCond(tmpS){
  var row = setSchemaCond(tmpS);
  setTableRowReadOnly(row);
}

function setDefaultSchemaOrder(tmpS){
  var row = setSchemaOrder(tmpS);
  setTableRowReadOnly(row);
}

/**
 * 设置“保存方案”“删除方案”为无效
 */
function setDefaultSchemaName(){
	var saveScheRow = document.getElementById("saveSchemaButtonID");
	var deleteScheRow = document.getElementById("deleteSchemaButtonID");
    setTableRowReadOnly(saveScheRow);
    setTableRowReadOnly(deleteScheRow);
}

function setSchemaName(){
	var saveScheRow = document.getElementById("saveSchemaButtonID");
	var deleteScheRow = document.getElementById("deleteSchemaButtonID");
    setTableRowWrite(saveScheRow);
    setTableRowWrite(deleteScheRow);
}

/**
 *row 表行对象
 * 设置表行为不可写
 */
function setTableRowReadOnly(row){
	 var rowLen = row.cells.length;
	 for(var i=0;i<rowLen;i++){
	   var cellLen = row.cells[i].all.length;
	   for(var j=0;j<cellLen;j++)
	     row.cells[i].all[j].disabled = true;
	 }
}

function setTableRowWrite(row){
	 var rowLen = row.cells.length;
	 for(var i=0;i<rowLen;i++){
	   var cellLen = row.cells[i].all.length;
	   for(var j=0;j<cellLen;j++)
	     row.cells[i].all[j].disabled = false;
	 }
}

/**
 *isSystemSche “系统方案”还是“用户方案”
 * 重设方案区域读写性
 */
function resetSchemaAreaRW(isSystemSche){   
    if(isSystemSche){ 
       setDefaultSchemaName();
    }else if(isLastStatus){ 
      setSchemaName();
      var table = document.getElementById("searchTableID");
  	  var row = table.rows[0];
      setTableRowWrite(row);
    }
}

/**
 * 保存方案后在“选择方案”中加入刚保存的方案名
 */
function addSchemaNameToOption(schemaName){
	var listObj = document.getElementById("scheNameOptions");
	var newOpt = document.createElement("OPTION"); 
	var isExitSche = false;
	var index;
	for(var i=0;i<listObj.length;i++){
		if(listObj.options[i].text == schemaName){
		    index = i;
			isExitSche = true;
			break;
		}
	}
	if(!isExitSche){
		newOpt.text = schemaName;
		newOpt.value = schemaName;
		listObj.options.add(newOpt,1);
		listObj.options[1].selected = true;
	}else{
	  listObj.options[index].selected = true;
	}
}

function deleteSchemaNameFromOption(schemaName){
	var listObj = document.getElementById("scheNameOptions");
	var index = listObj.selectedIndex;
	if(index > 0)
		listObj.options.remove(index);
}

//-------------------------------------------page.js
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

function call_menuMouseOver(){
  event.srcElement.style.color="red";
  vSrc = window.event.srcElement;
  var menuItemId=vSrc.id;
  menuItemId=menuItemId.substring(0,menuItemId.length-2);

  document.all(menuItemId + "_menuTd").bgColor="#E5FAAB";
}
function call_menuMouseOut(){
  event.srcElement.style.color = "black";
  vSrc = window.event.srcElement;
  var menuItemId=vSrc.id;
  menuItemId=menuItemId.substring(0,menuItemId.length-2);
  document.all(menuItemId + "_menuTd").bgColor="#D6E2F2";
}
function mouseDown(){
  var src = event.srcElement;
  src.style.borderBottom = "#FFFFFF solid 1px";
  src.style.borderLeft = "#666666 solid 1px";
  src.style.borderTop = "#666666 solid 1px";
  src.style.borderRight = "#FFFFFF solid 1px";
}

function mouseUp(){
  var src = event.srcElement;
  src.style.borderBottom = "#666666 solid 1px";
  src.style.borderLeft = "#FFFFFF solid 1px";
  src.style.borderTop = "#FFFFFF solid 1px";
  src.style.borderRight = "#666666 solid 1px";
}

function mouseEnterForeignIMG(){
  var src = event.srcElement;
  src.style.borderBottom = "#666666 solid 1px";
  src.style.borderLeft = "#FFFFFF solid 1px";
  src.style.borderTop = "#FFFFFF solid 1px";
  src.style.borderRight = "#666666 solid 1px";
}

function mouseOutForeignIMG(){
  var src = event.srcElement;
  src.style.border = "#FFFFFF solid 1px";
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
// $Id: General.js,v 1.8 2008/08/21 12:56:17 liuxiaoyong Exp $
// 列表页面、编辑页面都用到的通用函数

/** 列表页面、编辑页面都用到的常量 */

/** 列表页面数据列下标的偏移量 2004-5-20 */
var COLUMN_OFFSET = 2;//zhangcheng 2004/08/03 修正错位

function getExRate(gDate,gCurr,callback){
  var names = new Array();
  var values = new Array();

  names[0]="date";
  values[0]=gDate;
  names[1]="curr";
  values[1]=gCurr;

  var com = getCommunity();
  if (com != null)
    com.doRequest("exrate","all",names,values,callback);
}


function getFormulaVal(f_para,callback){
  var names = new Array();
  var values = new Array();

  names[0]="f_para";
  values[0]=f_para;

  var com = getCommunity();
  if (com != null)
    com.doRequest("getFormulaVal","all",names,values,callback);
}

function getOptions(optId,compoId,tType,callback){
  var names = new Array();
  var values = new Array();

  names[0]="optId";
  values[0]=optId;
  names[1]="compoId";
  values[1]=compoId;
  names[2]="tType";
  values[2]=tType;

  var com = getCommunity();
  if (com != null)
    com.doRequest("options","all",names,values,callback);
}

function getOption(optId,callback){
  var names = new Array();
  var values = new Array();

  names[0]="optId";
  values[0]=optId;

  var com = getCommunity();
  if (com != null)
    com.doRequest("option","all",names,values,callback);
}

function getPeriod(sDate,callback){
  var names = new Array();
  var values = new Array();

  names[0]="sYear";
  values[0]=sDate.substr(0, 4);
  names[1]="sMonth";
  values[1]=sDate.substr(5, 2);
  names[2]="sDay"
  values[2]=sDate.substr(8, 2);
  var com = getCommunity();
  if (com != null)
    com.doRequest("periods","all",names,values,callback);
}

function setoptpage(compoId,transType){

  var com=getCommunity();
  if(com!=null){
    var names = new Array();
    var values = new Array();
    names[0]="tType";
    values[0]=transType;
    com.doRequest("loadOpt",compoId,names,values,"setop");
  }

}

function setop(result){

  var deltaNode=result.documentElement;
  var entityNode=deltaNode.firstChild;
  var fieldNode=entityNode.firstChild;
  while(true){
    if(fieldNode == null)
    	break;
    setField(fieldNode.getAttribute("name"),fieldNode.getAttribute("value"));
    var tmpNode = fieldNode.nextSibling;
    if(tmpNode == null)
      break;
    else
      fieldNode = tmpNode;
  }
  changed=false;
}

function saveoption_c(compoId,f_opt,v_opt,callback){

  var result=getPageData();
  var com=getCommunity();
  if(com!=null){
    var names = new Array();
    var values = new Array();
    names[0]="data";
    names[1]="f_opt";
    names[2]="v_opt";
    values[0]=result;
    values[1]=f_opt;
    values[2]=v_opt;
    com.doRequest("saveOpt",compoId,names,values,callback);
  }

}
function fexportF2(){
   showMessage(document.body.outerHTML);
}

function fexportF(){
    var data=getPageData();
     //alert("当前导出页面数据存入客户端 \n"+data);
    var status=document.getElementById("status");
        status="<status>"+status.value+"</status>"
        data="<xml> "+data +status+"</xml>";
       // alert("当前导出页面数据存入客户端 \n"+data);
        exportFrame.document.open("text/html","replace");
        exportFrame.document.charset="gb2312";
        exportFrame.document.writeln(data);
        exportFrame.document.close();
        exportFrame.focus();
  var titlename=document.title;

  var filename=titlename+"exp-";
  var dt=new Date();
      filename+=dt.getYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate()+".xml";
//        exportFrame.document.execCommand('SaveAs',false,'GRP数据导出.xml');
        exportFrame.document.execCommand('SaveAs',false,filename);


//        data=data.replace


}

function fexport_DBArea(areaName, tabName){
  var data=getAreaTabData(areaName, tabName);
  var status=document.getElementById("status");
  status="<status>"+status.value+"</status>"
  data="<xml> "+data +status+"</xml>";
  exportFrame.document.open("text/html","replace");
  exportFrame.document.charset="gb2312";
  exportFrame.document.writeln(data);
  exportFrame.document.close();
  exportFrame.focus();
  var titlename=document.title;
  var filename=titlename+"exp-";
  var dt=new Date();
  filename+=dt.getYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate()+".xml";
  exportFrame.document.execCommand('SaveAs',false,filename);
}

/**
* 检查导入文件是否合法
*/
function checkImportFileIsOK(xmlroot){
    try{
    var entrys=xmlroot.getElementsByTagName("entity");
    var mtable=maintable.tablename;
    var filetablename=entrys[0].getAttribute("name");
       if(filetablename==mtable)
          return true;
    }catch(e){
         return false;
    }
     return false;

}

/**
* 导入前对页面原有数据作清理,针对数据行
*/
function clearImpRowPageData(isClearRows){
   var subtables=maintable.getElementsByTagName("span");
  var tables=new Array();
   for(var i=0;i<subtables.length;i++){
          var tabname=subtables[i].getAttribute("tablename");
              if(tabname && tabname.length>0)
                  tables[tables.length]=tabname;
   } 
   //alert(tables);
  if(tables.length>0){
    var isClear=true;
    if(isClearRows && isClearRows==false)
       isClear=false;
           //isClear=confirm("确定：清除面列表行数据\n取消:不清除列表行数据");
      if(isClear==true){
        for(var i=0;i<tables.length;i++){
           deleteAllRows(tables[i]);
        }
        //alert("清除完成！按任一键开始导入");
     }
 }
}

function isMyValue(arrays,value){
    for(var i=0;i<arrays.length;i++){
       if(arrays[i]==value)
          return true;
    }
    return false;

}
function fimportF(){
  _fimportF(false,true);
  if (eval("typeof after_fimport ==\"function\"")){
    eval("after_fimport()");
  }
}

/**页面数据导入操作，本函数由刘明编写 2003-4-21
 * 在页面菜单名称为 "打开"，也就是要打开本地文件上传到页面
 *isClearPK: 是否清除主键
 *isClearRows:是否清除列表行
 */
function _fimportF(_isClearPK,_isClearRows){
  var status="resizable:no;dialogHeight:200px;dialogWidth:400px;help:no";
  var xmlDoc=showModalDialog("importPage.jsp",null,status);
  if(xmlDoc==null)
       return;
  var isfileOK=checkImportFileIsOK(xmlDoc);
  if(isfileOK==false){
     alert("导入文件与当前页面格式不符，当前操作有错，导入无效！");
	    return;
  }
  var root=xmlDoc.getElementsByTagName("entity");
   //清除页面原有数据
   var mfields=document.getElementById("fields").getElementsByTagName("span");
   var pkfields=new Array();
   for(var i=0;i<mfields.length;i++){
         var ispk=mfields[i].getAttribute("pk");
             if(ispk=="true"){
                 pkfields[pkfields.length]=mfields[i].getAttribute("fieldname");
             }
   }
  var isclearPK=confirm("确定：清除主键数据\n取消：保留主键数据");
  //var isclearPK=true;
  //清除行数据
  clearImpRowPageData();
  //保存状态还原--status处理
  var status=xmlDoc.getElementsByTagName("status");
  var statusValue=status[0].firstChild.nodeValue;
  var statusObj=document.getElementById("status");
  var statusObjVal = statusObj.getAttribute("value");
  if((statusObjVal == "edit") || (statusObjVal == "editing")){
  	statusObj.setAttribute("value",statusValue);
  }
  var fields=root[0].childNodes;
  var name,value;
    for(var i=0;i<fields.length;i++){
        if(fields[i].tagName=="field"){
            name=fields[i].getAttribute("name");
            var ispk=isMyValue(pkfields,name);
            value=fields[i].getAttribute("value");
            if(!value)
                 value="";
           if(isclearPK==true || ispk==false )
             setField(name,value);
          }
    }
  var subEntrys=root[0].getElementsByTagName("entity");
  var tableName;
    //修改第三层表结构数据
 var maintab=maintable.tablename;
  var relname=new Array(); //第二层表与第三层表关联的名称
  var sub2tab=maintable.firstChild; //第二层表
     if(sub2tab){
        var sub2tablename=sub2tab.tablename;
        var sub3tabs=sub2tab.all;
        var sub3rel=new Array(2); //第0　个为子表名，第二个为关联字段名
            for(var i=0;i<sub3tabs.length;i++){
              var effectField=sub3tabs[i].getAttribute("effectField");
                  if(effectField && effectField.length>0){
                    sub3rel[0]=sub3tabs[i].tablename;//关联表名
	                  sub3rel[1]=effectField;//关联字段名
                    relname[relname.length]=sub3rel;
                  }
            }
     }
   for(var i=0;i<relname.length;i++){
      for(var j=0;j<subEntrys.length;j++){
        var reltablename=subEntrys[j].getAttribute("name");
         if(reltablename==sub2tablename &&
            (subEntrys[j].parentNode && subEntrys[j].parentNode.tagName=="row") &&
            (subEntrys[j].firstChild && subEntrys[j].firstChild.tagName=="field")
            ){
            	var objs=subEntrys[j].childNodes;
            	var relvalue=null;
            	//找到关联点，并求关联点值
            	for(var k=0;k<objs.length;k++){
            	    var subname=objs[k].getAttribute("name");
            	        if(subname==relname[i][1]){
            	        	relvalue=objs[k].getAttribute("value");
            	        	break;
            	        }
            	};
		         if(relvalue==null) //关联点无效，作下一个测试
	                    continue;
            	//找到第三级row
            	objs=subEntrys[j].getElementsByTagName("row");
            	for(var k=0;k<objs.length;k++){
            		//根据原型求重得第一个操作的根节点
            		var fobj=objs[k].firstChild;
            		var newobj=getNewRelDot(relname[i][1],relvalue);
            		    fobj.appendChild(newobj); //至此关联补充完成
            	}
             }
      }
   }
   var rows=root[0].getElementsByTagName("row");

    /**zhangcheng 2004-7-16 11:22
     *根据Dom模型生成二级子表，和三级子表的html字符串
     *然后插入到二层子表，三层子表的Div XXXBody当中，
     但这种优化只想与二层子表，三层子表妹有多个的情况。
     */

   var bIsCallOptmizeCode=false;

   var meta = document.getElementById("maintable");
   var table2s = meta.childNodes;

  if(table2s.length==1){//如果二层子表数量为1，
    var table2 = table2s.item(0);
       if(table2.childNodes.length<=1){//如果三层子表数量为1，
      //调用优化后的导入代码
   var sOneRow="";//一行的Html
   var sSubTable2="";//二级子表的Html字符串
   var sSubTable3="";//三级子表的Html字符串
   var table2Name;
   var table3Name;
   var vCellWidth;
   var vCellValue="";
   var fieldName;
   var vjRowChildNode;
   var tablename;
   var headTable;
   var editTable;
   bIsCallOptmizeCode=true;
   var table3 = table2.childNodes.item(0);

     table2Name = table2.getAttribute("tablename");
     table3Name = table3.getAttribute("tablename");

    var table2Grid = document.getElementById(table2Name + "BodyTable");

   var vjBodyDiv2=document.getElementById(table2Name+"Body");
   var vjBodyDiv3=document.getElementById(table3Name+"Body");

    var vsBodyDiv2InnerHTML=vjBodyDiv2.innerHTML;
    var vsBodyDiv3InnerHTML=vjBodyDiv3.innerHTML;
    vsBodyDiv2InnerHTML=vsBodyDiv2InnerHTML.substr(0,vsBodyDiv2InnerHTML.length-16);
    vsBodyDiv3InnerHTML=vsBodyDiv3InnerHTML.substr(0,vsBodyDiv3InnerHTML.length-16);

   var table2rowcount=0;
   var table3rowcount=0;
   var rowbackgroundColor="#DBDFE8";
   for(var j=0;j<rows.length;j++){
   	tablename=rows[j].parentNode.getAttribute("name");
	if(tablename.indexOf("_ASS")==-1){
		table2rowcount++;
		rowbackgroundColor=(table2rowcount%2)?"#F7F8FA":"#DBDFE8";
	}
	else{
		table3rowcount++;
	rowbackgroundColor=(table3rowcount%2)?"#F7F8FA":"#DBDFE8";
		}
   	sOneRow="<TR class=\"gridData\" style=\"background-color:"+rowbackgroundColor+";\" valign=\"middle\" onclick=\"gridRowClick()\"";
	sOneRow+=" tablename=\""+tablename+"\" ";//+tablename+"_ASS=\""+nItem+"\"";


	sOneRow+= " >";
	headTable = document.getElementById(tablename + "HeadTable");
	editTable = document.getElementById(tablename + "EditTable");
	//第一列
	var vCell0Width = headTable.rows[0].cells[0].offsetWidth;

	sOneRow+="<TD  width=\""+vCell0Width+"px\" align=\"center\" >"+"<input type=\"checkbox\" onclick=\"selectPart()\"></input></TD>";
	//后面n-1列
	vjRowChildNode=rows[j].firstChild.childNodes;
	for(var k=1;k<editTable.rows[0].cells.length;k++){
		vCellWidth=0;
		fieldName = editTable.rows[0].cells[k].getAttribute("fieldname");
  	       if(document.getElementById(tablename + "_" + fieldName + "Cell").style.display != "none")
  	             	vCellWidth = document.getElementById(tablename + "_" + fieldName + "Cell").offsetWidth;

		//从XML Dom模型中读取表格内应添的数据
	       vCellValue="";
	       for(var jj=0;jj<vjRowChildNode.length;jj++){
  			if(fieldName==vjRowChildNode[jj].getAttribute("name")){
  			vCellValue=vjRowChildNode[jj].getAttribute("value");
  			break;
  				}
		   }
	        if(!vCellValue || vCellValue== undefined || vCellValue== "undefined") vCellValue="";
		sOneRow+="<TD width=\""+vCellWidth+"px\" align=\"right\" >"+vCellValue+"</TD>";

		}
	sOneRow+="</TR>";
	//检查该行是属于二级子表还是三级子表

	if(tablename.indexOf("_ASS")==-1){
		//如果是二级子表
		sSubTable2+=sOneRow;
	}else{

		sSubTable3+=sOneRow;
	}

    }
		//如果是二级子表
	vsBodyDiv2InnerHTML+=sSubTable2+"</TBody></Table>";

	vsBodyDiv3InnerHTML+=sSubTable3+"</TBody></Table>";

   vjBodyDiv2.innerHTML=vsBodyDiv2InnerHTML;
   vjBodyDiv3.innerHTML=vsBodyDiv3InnerHTML;
       	}
  	}

  //如果出现多个二层子表，或者多个三层子表，调用未优化的代码
  if(bIsCallOptmizeCode==false){
	for(var j=0;j<rows.length;j++){
			var pobj=rows[j].parentNode;
		      var tableName=pobj.getAttribute("name");
		      var tbobj= setImpRowData(tableName,rows[j]);
	 }
  }

  //导入完成后，对三层子表的 SeqNo 进行整理和记录；leidh; 20040521;
  if(sub2tab)
  {
    var sub3tabs=sub2tab.all;
    var vjTable2= document.getElementById(sub2tab.tablename+ "BodyTable");
    var vjTable3= null;
    var vsTable3Name= "";
    //var vjTable3Meta= null;
    for(var x=0; x< sub3tabs.length; x++)
    {
      vsTable3Name= sub3tabs[x].tablename;
      vjTable3= document.getElementById(vsTable3Name+ "BodyTable");
      //vjTable3Meta= document.getElementById(sub3tabs[x].tablename+ "Meta");
      var effectField= sub3tabs[x].getAttribute("effectField");
      if(effectField && effectField.length> 0)
      {
        var viColNo = parseInt(document.getElementById(vsTable3Name+ "_"+ effectField+ "Cell").colno);
        var vaiEffectSeqNo= new Array();
        var viTable2RowNo= -1;

        //获取二层子表相关行的相应三层子表的最大 SeqNo;记录在 vaiEffectSeqNo[] 中；
        for (var i= 0; i< vjTable3.rows.length; i++)
        {
          viTable2RowNo= parseInt(vjTable3.rows[i].cells[viColNo].innerText)- 1;
          if (vaiEffectSeqNo[viTable2RowNo]== null) vaiEffectSeqNo[viTable2RowNo]= 1;
          else vaiEffectSeqNo[viTable2RowNo]++;
        }

        //在二层子表的相关行上设置最大的SeqNo;
        for (var i= 0; i< vaiEffectSeqNo.length; i++)
        {
          if (vaiEffectSeqNo[i]== null) continue;
          vjTable2.rows[i].setAttribute(vsTable3Name, vaiEffectSeqNo[i]);
        }
      }
    }
  }

   changed=true;
   return;
}

/**
* 将页面还原，数据来源 xmldom 数据格式包
* xmldom 符合 getPageData() 返回的的格式，但用getPageData() 得到是的XMLDOM　格式
* 的字串，必须将其转换为XMLDOM 数据包后才能用。
* 具体用法参见 fimportF();
*
*/
function restorePage(xmlDoc,_isClearPK){
  if(xmlDoc==null)
      return;
  var isfileOK=checkImportFileIsOK(xmlDoc);
  if(isfileOK==false){
     alert("导入文件与当前页面格式不符，当前操作有错，导入无效！");
     return;
  }
  var root=xmlDoc.getElementsByTagName("entity");
  //清除页面原有数据
  var mfields=document.getElementById("fields").getElementsByTagName("span");
  var pkfields=new Array();
  for(var i=0;i<mfields.length;i++){
       var ispk=mfields[i].getAttribute("pk");
       if(ispk=="true"){
             pkfields[pkfields.length]=mfields[i].getAttribute("fieldname");
       }
   }
  //var isclearPK=confirm("确定：清除主键数据\n取消：保留主键数据");
  var isclearPK=true;
  if( _isClearPK && _isClearPK==false)
     isclearPK=false;

  //清除行数据
  clearImpRowPageData();
  var fields=root[0].childNodes;
  var name,value;
  for(var i=0;i<fields.length;i++){
       if(fields[i].tagName=="field"){
            name=fields[i].getAttribute("name");
            if(!name ||name==null || name=="undefined")
               continue;
           if (!isFieldExist(name))
             continue;
            var ispk=isMyValue(pkfields,name);
            value=fields[i].getAttribute("value");
            if(!value)
                 value="";
           if(isclearPK==true || ispk==false )
             setField(name,value);
          }
    }
  var subEntrys=root[0].getElementsByTagName("entity");
  var tableName;
  //修改第三层表结构数据
 var maintab=maintable.tablename;
  var relname=new Array(); //第二层表与第三层表关联的名称
  var sub2tab=maintable.firstChild; //第二层表
  if(sub2tab){
      var sub2tablename=sub2tab.tablename;
      var sub3tabs=sub2tab.all;
      var sub3rel=new Array(2); //第0　个为子表名，第二个为关联字段名
      for(var i=0;i<sub3tabs.length;i++){
              var effectField=sub3tabs[i].getAttribute("effectField");
                  if(effectField && effectField.length>0){
                    sub3rel[0]=sub3tabs[i].tablename;//关联表名
	                  sub3rel[1]=effectField;//关联字段名
                    relname[relname.length]=sub3rel;
                  }
      }
  }
  for(var i=0;i<relname.length;i++){
     for(var j=0;j<subEntrys.length;j++){
        var reltablename=subEntrys[j].getAttribute("name");
        if(reltablename==sub2tablename &&
           (subEntrys[j].parentNode && subEntrys[j].parentNode.tagName=="row") &&
            (subEntrys[j].firstChild && subEntrys[j].firstChild.tagName=="field")
            ){
            	var objs=subEntrys[j].childNodes;
            	var relvalue=null;
            	for(var k=0;k<objs.length;k++){
            	    var subname=objs[k].getAttribute("name");
            	        if(subname==relname[i][1]){
            	        	relvalue=objs[k].getAttribute("value");
            	        	break;
            	        }
            	};
		         if(relvalue==null) //关联点无效，作下一个测试
	                    continue;
            	objs=subEntrys[j].getElementsByTagName("row");
            	for(var k=0;k<objs.length;k++){
               // alert(objs[k].xml);
            		var fobj=objs[k].firstChild;
            		 // alert("第三级根节点吗？"+fobj.xml);
            		var newobj=getNewRelDot(relname[i][1],relvalue);
            		    fobj.appendChild(newobj); //至此关联补充完成
            	}
             }
      }
   }
   var rows=root[0].getElementsByTagName("row");
   for(var j=0;j<rows.length;j++){
       var pobj=rows[j].parentNode;
       var tableName=pobj.getAttribute("name");
       var tbobj= setImpRowData(tableName,rows[j],1);
   }
  changed=true;
  return;
}

/**
*
*/
function getNewRelDot(name,value){
 var xmldom = new ActiveXObject("Microsoft.XMLDOM");
 var dot= xmldom.createElement("field");
     dot.setAttribute("name",name);
     dot.setAttribute("value",value);
     return dot;
}

/**
 * 此函数由刘明编写，专用于页面数据导入
 * @return
 */
function setImpRowData(tableName,rowNode,flag){
  //try{
    if(rowNode==null ||
       rowNode.firstChild==null ||
       rowNode.firstChild.childNodes.length==0){
        alert("row data is null ");
        return;
    }
    var row=addBlankRow(tableName,true);
    //if(tableName=="GL_ILACC")
    //alert("st:"+row.outerHTML);
    var fields=rowNode.firstChild.childNodes;
        for(var m=0;m<fields.length;m++){
	        if(fields[m].tagName == "entity") continue;
          //alert(row.outerHTML+",tag:"+fields[m].tagName+"\n name:"+fields[m].getAttribute("name")+",value:"+fields[m].getAttribute("value"));
          //alert(m+",tag:"+fields[m].tagName+"\n name:"+fields[m].getAttribute("name")+",value:"+fields[m].getAttribute("value"));
          if(row){
            var name=fields[m].getAttribute("name");
            if(flag){
             if(!name ||name==null || name=="undefined")
               continue;
             if (!isFieldExist(name, tableName))
               continue;
            }
            var value=fields[m].getAttribute("value");
            if(!value || value== undefined || value== "undefined"){
                value="";
            }
            setRowField(row,name,value);
          }
        }
      //if(tableName=="GL_ILACC")
      // alert("tableName:"+tableName+" \n row:\n"+row.outerHTML);
      //showMessage(row.parentElement.parentElement.outerHTML);
    return row.parentElement.parentElement;
/*
  }
  catch(e){
    alert("General-221 import row data error:"+e.toString());

  }
   */
}
/**
 * 根据entity Node 返回对应的pageData 数据包
 * @return
 */
/*function getEntityData(entityNode){
    if(entityNode==null||entityNode.childNodes.length==0)
       return "";
    var fields=entityNode.getElementsByTagName("field");
    var tableName=entityNode.getAttribute("name");
    var result="<delta><entity name='"+tableName+"'>"
    var name,value;
       for(i=0;i<fields.length;i++){
         name=fields[i].getAttribute("name");
         if(name==null)
            continue;
         value=fields[i].getAttribute("value");
         result+="<field name='"+name+" value='"+value+"' />";
       }
       result+="</entity></delta>"
       alert("General -201,result:"+result);
    return result;
}
*/
	/*
	* 使用该函数要在页面实现callback方法，该方法中应调用freeValToXML函数
	* callback方法主要是为freeValToXML方法提供更新数据所必要的字段名数组
	*/
function saveoption(compoId, callback){
	if(callback == "" || callback == null) return null;
	var callfunc = eval(callback);
	var result=callfunc();
  var com=getCommunity();
  if(com!=null){
    var names = new Array();
    var values = new Array();
    names[0]="optionXml";
    names[1]="f_opt";
    names[2]="v_opt";
    values[0]=result;
    values[1]="";
    values[2]="";
    var vores = Info.requestData("saveOpt",compoId,names,values);
    saveoption_R(vores);
  }
}

function getPrintData(){
	var meta = document.getElementById("maintable");
	var maintable = meta.getAttribute("tablename");
  if (maintable.substr(maintable.indexOf("_")) != "_TEMP"){
    var delta = "PageData:";
  	delta += "<entity name=\"" + maintable + "\">";
  	var vfields = document.getElementById("sessionParam").childNodes;
	  for(var i=0,j=vfields.length; i<j; i++){
  		var fieldname = vfields.item(i).getAttribute("name");
      var vv = vfields.item(i).getAttribute("value");
		  delta += "<field name=\"" + fieldname + "\" value=\"";
      delta += vv + "\"/>";
    }
  	vfields = document.getElementById("fields").childNodes;
	  for(var i=0,j=vfields.length; i<j; i++){
		  var fieldname = vfields.item(i).getAttribute("fieldname");
  		delta += "<field name=\"" + fieldname + "\" value=\"";
	  	var vv = getField(fieldname,maintable,true);
		  if (document.getElementById(maintable + "_" + fieldname
			  													+ "ID").getAttribute("fieldType") ==  "text"){
  			vv = packSpecialChar(vv);
	  	}
      delta += vv + "\"/>";
    }
    var table2s = meta.childNodes;
    for (var i=0,j=table2s.length; i<j; i++){
      var table2 = table2s.item(i);
      var table2Name = table2.getAttribute("tablename");
      delta += "<entity name=\"" + table2Name + "\">";
      uneditGrid(table2Name);
      var table2Grid = document.getElementById(table2Name + "BodyTable");
      var table2Head = document.getElementById(table2Name + "EditTable").rows[0];
      for (var ix=0,jx=table2Grid.rows.length; ix<jx; ix++){
        delta += "<row><entity name=\"" + table2Name + "\">";
        var row = table2Grid.rows[ix];
        var effectField = null;
        var effectValue = null
        if (table2.childNodes.length > 0){
          effectField = table2.childNodes.item(0).getAttribute("effectField");
        }
        for (var ir=1,jr=table2Head.cells.length; ir<jr; ir++){
          var fieldName2 = table2Head.cells[ir].getAttribute("fieldName");
          var fieldValue2 = row.cells[ir].innerHTML;
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
/*
          if (fieldType == "select"){
            //值集类型
            var index = fieldValue2.indexOf(" ");
            if(index > 0)
              fieldValue2 = fieldValue2.substring(0, index);
          }
*/
          delta += "<field name=\"" + fieldName2 +"\" value=\"";
          delta += packSpecialChar(fieldValue2) + "\"/>";
        }
        for (var it=0,jt=table2.childNodes.length; it<jt; it++){
          var table3 = table2.childNodes.item(it);
          var table3Name = table3.getAttribute("tablename");
          delta += "<entity name=\"" + table3Name + "\">";
          uneditGrid(table3Name);
          var colNo = parseInt(document.getElementById(table3Name + "_" + effectField + "Cell").colno);
          var table3Grid = document.getElementById(table3Name + "BodyTable");
          var table3Head = document.getElementById(table3Name + "EditTable").rows[0];
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
                  fieldValue3 = table3Row.cells[ic].innerHTML;

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
									/*
                  if(fieldType3 == "select"){
                    //处理值集
                    var index = fieldValue3.indexOf(" ");
                    if(index > 0)
                      fieldValue3 = fieldValue3.substring(0, index);
                  }
									*/
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
  	return delta;
  }
	var delta = "PageData:" + "<entity name=\"" + maintable + "\">";
	var vfields = document.getElementById("sessionParam").childNodes;
	for(var i=0,j=vfields.length; i<j; i++){
		var fieldname = vfields.item(i).getAttribute("name");
    var vv = vfields.item(i).getAttribute("value");
		delta += "<field name=\"" + fieldname + "\" value=\"";
    delta += vv + "\"/>";
  }
	vfields = document.getElementById("fields").childNodes;
	for(var i=0,j=vfields.length; i<j; i++){
		var fieldname = vfields.item(i).getAttribute("fieldname");
		delta += "<field name=\"" + fieldname + "\" value=\"";
		var vv = getField(fieldname,maintable);
		if (document.getElementById(maintable + "_" + fieldname
																+ "ID").getAttribute("fieldType") ==  "text"){
			vv = packSpecialChar(vv);
		}
    delta += vv + "\"/>";
  }

  var fieldNames = new Array();
  for (var i=2;i<11;i++){
    meta = document.getElementById("A" + i + "Container");
    if (meta == null)
      continue;
    var fields = new Array();
    var used = new Array();
    var k = -1;
    var headTable = document.getElementById("A" + i + "HeadTable");
    var headlines = headTable.rows.length;
    for (var ih=0;ih<headlines; ih++){
      var row = headTable.rows[ih];
      var jh = 0;
      if (ih == 0)
        jh = 1;
      for (;jh<row.cells.length;jh++){
        var fName = row.cells[jh].getAttribute("id");
        var fieldId = fName.substr(fName.indexOf("_")+1);
				fName = fName.substr(0,fName.indexOf("_")+1)
        fieldId = fieldId.substr(0,fieldId.length-4);
        k++;
        fields[k] = fieldId;
        used[k] = "Y";
        var p_p = row.cells[jh].getAttribute("parent");
				while (p_p != "null"){
          for (var fi=0;fi<fields.length;fi++){
            if (fields[fi] == p_p){
              used[fi] = "N";
              p_p = document.getElementById(fName+p_p+"Cell").getAttribute("parent");
              break;
            }
          }
				}
      }
    }

    var fNo = -1;
    for (var ih=0;ih<fields.length; ih++){
      if (used[ih] == "Y"){
        fNo++;
        fieldNames[fNo] = fields[ih];
      }
    }
    break;
  }

  delta += "<entity name=\"A" + i + "\">";
  var bodyTable = document.getElementById("A" + i + "BodyTable");
  if(bodyTable){
		var bodylines = bodyTable.rows.length;
  	for (var ih=0;ih<bodylines; ih++){
    	delta += "<row><entity name=\"A" + i + "\">";
    	var row = bodyTable.rows[ih];
    	for (var jh=1;jh<row.cells.length; jh++){
      	delta += "<field name=\"" + fieldNames[jh-1] +"\" value=\"";
      	delta += row.cells[jh].innerHTML + "\"/>";
    	}
    	delta += "</entity></row>";
  	}
	}
  delta += "</entity>";

  delta += "</entity>:A" + i;
	return delta;
}
/**
* 取得打印数据，其中取数回来的数据用列的Meta数据进行获取
*/
function getPrintDataDirect(){
	var meta = document.getElementById("maintable");
	var maintable = meta.getAttribute("tablename");
  if (maintable.substr(maintable.indexOf("_")) != "_TEMP"){
    var delta = "PageData:";
  	delta += "<entity name=\"" + maintable + "\">";
  	var vfields = document.getElementById("sessionParam").childNodes;
	  for(var i=0,j=vfields.length; i<j; i++){
  		var fieldname = vfields.item(i).getAttribute("name");
      var vv = vfields.item(i).getAttribute("value");
		  delta += "<field name=\"" + fieldname + "\" value=\"";
      delta += vv + "\"/>";
    }
  	vfields = document.getElementById("fields").childNodes;
	  for(var i=0,j=vfields.length; i<j; i++){
		  var fieldname = vfields.item(i).getAttribute("fieldname");
  		delta += "<field name=\"" + fieldname + "\" value=\"";
	  	var vv = getField(fieldname,maintable,true);
		  if (document.getElementById(maintable + "_" + fieldname
			  													+ "ID").getAttribute("fieldType") ==  "text"){
  			vv = packSpecialChar(vv);
	  	}
      delta += vv + "\"/>";
    }
    /**zhangcheng 2004-7-28 16:19   使用数组缓冲替换文件缓冲机制*/
    var aCache=new Array();
		var cacheIndex = 0;
    var table2s = meta.childNodes;
    for (var i=0,j=table2s.length; i<j; i++){
      var table2 = table2s.item(i);
      var table2Name = table2.getAttribute("tablename");
      delta += "<entity name=\"" + table2Name + "\">";
      uneditGrid(table2Name);
      var table2Grid = document.getElementById(table2Name + "BodyTable");
      var table2Head = document.getElementById(table2Name + "EditTable").rows[0];
      for (var ix=0,jx=table2Grid.rows.length; ix<jx; ix++){
           /*每隔10行写一次，以保证delta不会太长*/
		  if (ix % 10== 0)
		  	  {
		         aCache[cacheIndex++]=delta;
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
          var fieldValue2 = row.cells[ir].innerHTML;
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
/*
          if (fieldType == "select"){
            //值集类型
            var index = fieldValue2.indexOf(" ");
            if(index > 0)
              fieldValue2 = fieldValue2.substring(0, index);
          }
*/
          delta += "<field name=\"" + fieldName2 +"\" value=\"";
          fieldValue2 = packSpecialChar(fieldValue2);
          fieldValue2 = filterComma(fieldValue2);
          delta += fieldValue2 + "\"/>";
        }

        for (var it=0,jt=table2.childNodes.length; it<jt; it++){
          var table3 = table2.childNodes.item(it);
          var table3Name = table3.getAttribute("tablename");
          delta += "<entity name=\"" + table3Name + "\">";
          uneditGrid(table3Name);
          var colNo = parseInt(document.getElementById(table3Name + "_" + effectField + "Cell").colno);
          var table3Grid = document.getElementById(table3Name + "BodyTable");
          var table3Head = document.getElementById(table3Name + "EditTable").rows[0];
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
                  fieldValue3 = table3Row.cells[ic].innerHTML;

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
									/*
                  if(fieldType3 == "select"){
                    //处理值集
                    var index = fieldValue3.indexOf(" ");
                    if(index > 0)
                      fieldValue3 = fieldValue3.substring(0, index);
                  }
									*/
									fieldValue3 = packSpecialChar(fieldValue3);
          				fieldValue3 = filterComma(fieldValue3);
                  delta += "\" value=\"" + fieldValue3;
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

  //zhangcheng 把缓冲起来的字符串数据构造为一个完整的字符串。
   delta=aCache.join("")+delta;

  	return delta;
  }
	var delta = "PageData:" + "<entity name=\"" + maintable + "\">";
	var vfields = document.getElementById("sessionParam").childNodes;
	for(var i=0,j=vfields.length; i<j; i++){
		var fieldname = vfields.item(i).getAttribute("name");
    var vv = vfields.item(i).getAttribute("value");
		delta += "<field name=\"" + fieldname + "\" value=\"";
    delta += vv + "\"/>";
  }
	vfields = document.getElementById("fields").childNodes;
	for(var i=0,j=vfields.length; i<j; i++){
		var fieldname = vfields.item(i).getAttribute("fieldname");
		delta += "<field name=\"" + fieldname + "\" value=\"";
		var vv = getField(fieldname,maintable,true);//zhangcheng 20040803
		if (document.getElementById(maintable + "_" + fieldname
																+ "ID").getAttribute("fieldType") ==  "text"){
			vv = packSpecialChar(vv);
		}
    delta += vv + "\"/>";
  }

  var fieldNames = new Array();
  for (var i=2;i<11;i++){
    meta = document.getElementById("A" + i + "Container");
    if (meta == null)
      continue;
		break;
  }
	var groupCol = document.getElementById("A" + i + "_COLGROUP");
	if(groupCol){
		var cols = groupCol.childNodes;
		for(var c=2; c<cols.length; c+=2){
			var fieldName = cols.item(c).getAttribute("fieldName");
			fieldNames[fieldNames.length] = fieldName;
		}
	}
  delta += "<entity name=\"A" + i + "\">";
  var bodyTable = document.getElementById("A" + i + "BodyTable");

  /**zhangcheng 2004-7-28 16:19   使用数组缓冲替换文件缓冲机制*/
  var aCache=new Array();

  if(bodyTable){
        var fieldsIndex = AS_getFieldsIndex("A" + i, fieldNames);
		var bodylines = bodyTable.rows.length;
  	for (var ih=0;ih<bodylines; ih++){
  	  /*每隔10行写一次，以保证delta不会太长*/
		  if (ih % 10== 0)
		  	  {
		        aCache[ih]=delta;
		    		delta= "";
		  	  }

    	delta += "<row><entity name=\"A" + i + "\">";
    	var row = bodyTable.rows[ih];
			/*
    	for (var jh=2;jh<row.cells.length-1; jh++){
      	delta += "<field name=\"" + fieldNames[jh-2] +"\" value=\"";
      	delta += row.cells[jh].innerHTML + "\"/>";
    	}
			*/
			for(var fieldIndex=0;fieldIndex<fieldNames.length; fieldIndex++){
      	delta += "<field name=\"" + fieldNames[fieldIndex] +"\" value=\"";
      	//delta += getRowField(row,fieldNames[fieldIndex]) + "\"/>";

      	 var sValue = AS_getRowFieldByIndex(row, fieldsIndex[fieldIndex] + COLUMN_OFFSET - 1);
         sValue = packSpecialChar(sValue);
         sValue = filterComma(sValue);
         delta += sValue + "\"/>";
			}
    	delta += "</entity></row>";
  	}
	}
  delta += "</entity>";
  delta += "</entity>:A" + i;

    //zhangcheng 把缓冲起来的字符串数据构造为一个完整的字符串。
  delta=aCache.join("")+delta;
	return delta;
}

function filterComma(value){
	while(value.indexOf(",")>-1){
		value=value.replace(",","");
	}
	return value;
}

function getPageData_oneGrid(){
  var result = getPrintData();
  result = result.substring(9);
  var i = result.indexOf("</entity>:A");
  if (i > -1){
    result = result.substr(0,i+9);
  }
  return result;
}

function getPrintData_s(fArea){
	var meta = document.getElementById("maintable");
	var maintable = meta.getAttribute("tablename");
	var delta = "<entity name=\"" + maintable + "\">";
	var vfields = document.getElementById("sessionParam").childNodes;
	for(var i=0,j=vfields.length; i<j; i++){
		var fieldname = vfields.item(i).getAttribute("name");
    var vv = vfields.item(i).getAttribute("value");
		delta += "<field name=\"" + fieldname + "\" value=\"";
    delta += vv + "\"/>";
  }
	vfields = document.getElementById("fields").childNodes;
	for(var i=0,j=vfields.length; i<j; i++){
		var fieldname = vfields.item(i).getAttribute("fieldname");
		delta += "<field name=\"" + fieldname + "\" value=\"";
		var vv = getField(fieldname,maintable);
		if (document.getElementById(maintable + "_" + fieldname
																+ "ID").getAttribute("fieldType") ==  "text"){
			vv = packSpecialChar(vv);
		}
    delta += vv + "\"/>";
  }

  delta += "</entity>";
	return delta;
}

/**
 * 将数组转为 entity 字符串 (对应于 TableData 的 XML 表示)
 * 字段值依次使用 packSpecialChar 和 escapeLineBreak 编码
 * @param names 字段名数据
 * @param values 字段值数组
 * @param entityName 实体名
 * @return 包含指定字段名和字段值的 XML 字符串。格式参见 TableData
 */
function AS_arrayToEntityString(names, values, entityName) {
  var s = "";
  var name, value;
  for(var i = 0; i < names.length; i++){
    name = packSpecialChar(names[i]);
    value = values[i];
    if (null == value) {
      value = "null";
    } else{
      value = packSpecialChar(value.toString());
      value = escapeLineBreak(value);
    }
    s += "<field name=\"" + name + "\" value=\"" + value + "\"/>";
  }
  if ("" != s) {
    var header = "<entity";
    if (entityName) {
      header += " name=\"" + packSpecialChar(entityName) + "\"";
    }
    s = header + ">" + s + "</entity>";
  }
  return s;
}

/**
 * 将对象转为 entity 字符串 (对应于 TableData 的 XML 表示)
 * 字段值依次使用 packSpecialChar 和 escapeLineBreak 编码
 * @param obj 待转换的对象
 * @param entityName 实体名
 * @return 合法的 XML 字符串(中文未编码)，并且不含换行符。格式参见 TableData
 */
function AS_objectToEntityString(obj, entityName) {
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
      if (null == value) {
        value = "null";
      } else{
        value = packSpecialChar(value.toString());
        value = escapeLineBreak(value);
      }
      s += "<field name=\"" + name + "\" value=\"" + value + "\"/>";
    }
  }
  if ("" != s) {
    var header = "<entity";
    if (entityName) {
      header += " name=\"" + packSpecialChar(entityName) + "\"";
    }
    s = header + ">" + s + "</entity>";
  }
  return s;
}

/** 将 entity 字符串(对应于 TableData 的 XML 表示) 转为对象 */
function AS_entityStringToObject(s) {
  var obj = new Object();
  // TODO: ...
  return obj;
}

/** 根据源对象 childNodes 中元素的 name/value 属性，设置目的对象的关联数组 */
function AS_initObjectByChildNodes(thisObj, srcElement) {
  if (!srcElement || !srcElement.childNodes) return;
  for (var i = 0; i < srcElement.childNodes.length; i++) {
    var node = srcElement.childNodes.item(i);
    var name = node.getAttribute("name");
    if ("string" != typeof name) continue;
    var value = node.getAttribute("value");
    thisObj[name] = value;
  }
}

/** 根据源对象的 attributes 属性的 nodeName/nodeValue，设置目的对象的关联数组 */
function AS_initObjectByAttributes(thisObj, srcElement) {
  if (!srcElement || !srcElement.attributes) return;
  for (var i = 0; i < srcElement.attributes.length; i++) {
    var attribute = srcElement.attributes.item(i);
    if (!attribute.specified) continue;
    var name = attribute.nodeName;
    var value = attribute.nodeValue;
    thisObj[name] = value;
  }
}

/** 如果 value 是字符串 "true"，返回真值，否则返回 false */
function toBooleanTrueFalse(value) {
  if ("string" == typeof value)
    return ("true" == value);
  return false;
}

/** 调试用的函数 */
function assert(u) {
  if (!u)
    dump("\nassert fails: " + assert.caller);
}

function assertEquals(u, v) {
  if (u != v)
    dump("\nassertEqual fails:" + "\n1:" + u + "\n2:" + v
      + "\n" + assertEquals.caller);
}


/**
 * 取得一行中指定列的值
 * 参考 grid.js: function getRowField(row,fieldName,withName)
 */
function AS_getRowFieldByIndex(row, nIndex) {
  if (nIndex <=0) return "";
  return row.cells[nIndex].innerHTML;
}

/**
 * 根据列名得到列序号
 * @param tablename 表名
 * @param fields 列名数组 (TODO: 也可以是列名)
 * 参考 grid.js: function getRowField(row,fieldName,withName)
 */
function AS_getFieldsIndex(tablename, fields) {
  var result = new Array();
  for (var i = 0; i < fields.length; i++) {
    var e = document.getElementById(tablename + "_" + fields[i] + "Cell");
    var n = -1;
    if (e && e.colno)
      n = parseInt(e.colno);
    result[i] = n;
  }
  return result;
}

function saveoption_R(result){
	if(result == null){
		alert("系统出现异常！");
	}else {
		if (result.getAttribute("success") == "false"){
      //取数出错处理
     	alert(result.innerHTML);
  	}else{
     alert(result.text);
  	}
  }
}

/*
 * freeValToXML方法实现数据拼接功能
 *
 */
function freeValToXML(voParas, voCoCode, voCompoName, voTransType){
	var buffer = "<entity name=\"" + voCompoName + "\">";
	var i = 0;
	for(i; i < voParas.length; i++){
		buffer += "<field OPT_ID=\"" + voParas[i] + "\" OPT_VAL=\"" + voFree.getValue(voParas[i]) + "\" IS_SYST_OPT=\"N\" CO_CODE=\"" + voCoCode + "\" COMPO_ID=\"" + voCompoName + "\" TRANS_TYPE=\"" + voTransType + "\" />";
	}
	buffer += "</entity>";
	return buffer;
}

/* $Id: prncompolayoutdesigner.js,v 1.5 2008/06/19 03:15:59 wangfei Exp $*/
var stplcode,scompocode,stplname,sreporttype,smastertab;
/*完成部件模板初始化自动部局元素
输入参数
	sTPLcode  打印模板代码
	sCompocode  打印设置模板部件
	sTPLname  打印模板名称
	sReporttype 打印报表类型(mainTable_E，mainTable_L，subTable_E，subTable_L，)
作者zuodf
日期2004/09/07
*/
function compoAutoTempLayout(sTPLcode,sCompocode,sTPLname,sReporttype){
	stplcode=sTPLcode;
	scompocode=sCompocode;
	stplname=sTPLname;
	//alert(stplname);
	sreporttype=sReporttype;
	var names = new Array();
	var values = new Array();
	if (sreporttype.charAt(sreporttype.length-1)=="E" || sreporttype.charAt(sreporttype.length-1)=="C"){
		names[0] = "pagename";
		values[0] = scompocode + "_E";
		names[1] = "componame";
		values[1] = scompocode;
		getDBData("print-ruleData.AS_GET_EDITPAGEFIELDS",names,values,"selectfieldlayout_re");
	}
	else{
		var smastertab;
		names[0]="compo_id";
		values[0]=sCompocode;
		var smastertabdelta=qryData("print-ruleData.AS_COMPO_MASTER_TAB",names,values);
		if (!smastertabdelta) 
			smastertab = sCompocode;
		//var xmldom = new ActiveXObject("Microsoft.XMLDOM");
		//xmldom.loadXML(smastertabdelta);
		var result = smastertabdelta;
		if(!result || result.childNodes.length == 0 || result.getAttribute("success") == "false")
			smastertab = sCompocode;
		else
			smastertab = result.firstChild.firstChild.getAttribute("value");
		names[0] = "tablename";
		values[0] = smastertab;
		getDBData("print-ruleData.AS_GET_LISTPAGEFIELDS",names,values,"selectfieldlayout_re");
	}
}

/*完成部件字段初始化自动部局元素，回调函数
输入参数
	result  部件字段信息数据源

作者zuodf
日期2004/09/07
*/
function selectfieldlayout_re(result){
	var vfields = new Array();
	var lbfields = new Array();
	var lbfield,vfield;
	var elementoffsetHeight=19;
   if(result.getAttribute("success") == "false"){
    //出错处理
    alert("错误信息："+result.innerHTML);
  }else{
	if (result.firstChild.childNodes.length == 0) return;
		addtitlecenter("rpheader",stplname);
		var nowBobj;
		var titileobj;
		var tableobj;
		var tpobj;
		var width;
//编辑页面
	if (sreporttype.charAt(sreporttype.length-1)=="E" || sreporttype.charAt(sreporttype.length-1)=="C"){
	  nowBodyID="rpheader";
		nowBobj=getObj(nowBodyID);
		for (var i=0,j=result.firstChild.childNodes.length; i<j; i++){
			var fields = result.firstChild.childNodes.item(i).childNodes;
			vfield ="@"+ fields.item(0).getAttribute("value");
      lbfield= fields.item(1).getAttribute("value");
			createDivT(lbfield,lbfield,0);
			titileobj=getObj(getObjId());
			//width 749  两边为100，中间25，间隔2，130×4=520
			if ((i % 2)==0){
				titileobj.style.left=nowBobj.offsetLeft+5;
				titileobj.style.top=nowBobj.offsetTop+elementoffsetHeight*(2+i/2);
			}
			if ((i % 2)==1){
				titileobj.style.left=nowBobj.offsetLeft+130*(2)+20;
				titileobj.style.top=nowBobj.offsetTop+elementoffsetHeight*(2+(i-1)/2);
			}
			createDivT(vfield,lbfield,1);
			titileobj=getObj(getObjId());//alert(titileobj.outerHTML)
			if ((i % 2)==0){
				titileobj.style.left=nowBobj.offsetLeft+130*1+6;
				titileobj.style.top=nowBobj.offsetTop+elementoffsetHeight*(2+i/2);
			}
			if ((i % 2)==1){
				titileobj.style.left=nowBobj.offsetLeft+130*3+21;
				titileobj.style.top=nowBobj.offsetTop+elementoffsetHeight*(2+(i-1)/2);
			}
    }
		titileobj=getObj(getObjId());
		var areaheight=pixelToMm(parseInt(titileobj.offsetTop)-parseInt(nowBobj.offsetTop)+20);
		templatearea(nowBodyID,areaheight);
		//编辑页面列表；子表
		detaillayout();
		}
	else{
		//列表页面
		nowBodyID="rpheader";
		nowBobj=getObj(nowBodyID);
		titileobj=getObj(getObjId());
		var areaheight=pixelToMm(parseInt(titileobj.offsetTop)-parseInt(nowBobj.offsetTop)+20);
		templatearea(nowBodyID,areaheight);
		if (sreporttype.charAt(sreporttype.length-1)=="L"){
			var colcount=result.firstChild.childNodes.length;
			addareaTable("rpbody",2,colcount);
			tpobj=document.getElementById("templatebody");
			var tnum =tpobj.getElementsByTagName("table");
			tableobj=getObj("PRN_table_"+(tnum.length-1));
			for (var i=0,j=result.firstChild.childNodes.length; i<j; i++){
 				var fields = result.firstChild.childNodes.item(i).childNodes;
				lbfield= fields.item(1).getAttribute("value");
				vfield = fields.item(0).getAttribute("value");
				if(lbfield!=""&&lbfield!=null){
					tableobj.rows[0].cells[i].innerText=lbfield;
				}
				else{
					tableobj.rows[0].cells[i].innerHTML="&nbsp;";
				}
				tableobj.rows[0].cells[i].style.fontFamily="simsun";
				tableobj.rows[0].cells[i].style.fontSize="12px";
				if(vfield!=""&&vfield!=null){
					tableobj.rows[1].cells[i].innerText="@"+vfield;
				}
				else{
					tableobj.rows[1].cells[i].innerHTML="&nbsp;";
				}
				tableobj.rows[1].cells[i].style.fontFamily="simsun";
				tableobj.rows[1].cells[i].style.fontSize="12px";
			}
			tableobj.rows[0].height= tableobj.rows[0].offsetHeight;
			tableobj.rows[1].height=20;
			nowBodyID="rpbody";
			nowBobj=getObj(nowBodyID);
    	if(tableobj.width==""){
				if (parseInt(nowBobj.offsetWidth)<parseInt(tableobj.offsetWidth)){
					tableobj.width=nowBobj.offsetWidth-20;
					tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.offsetWidth))/2;
					}else
					{
					tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.offsetWidth))/2;
					}
      }else{
				if (parseInt(nowBobj.offsetWidth)<parseInt(tableobj.offsetWidth)){
					tableobj.width=nowBobj.offsetWidth-20;
					tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.width))/2;
					}
				else{
				tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.width))/2;
					}
      }
      //alert(nowBodyID+" ; "+tableobj.style.height);
			templatearea(nowBodyID,pixelToMm(tableobj.style.height)+3);
			}
		}
  }
	var doc;
	var companyname;
	if (opener != null){
    	doc= opener.document;
		}
	if (doc){
		if (sreporttype.charAt(sreporttype.length-1)=="L"){
			if (!doc.getElementById("sessionParam")){
				var winName = opener.window.name;
				if(winName == "main" || opener == null){
					companyname= opener.window.top.head.document.getElementById("svCoName").getAttribute("value");
				}else{
					companyname= opener.opener.window.top.head.document.getElementById("svCoName").getAttribute("value");
				}
			}else{
					var session = doc.getElementById("sessionParam").childNodes;
					for(var x = 0, y = session.length; x < y; x++){
          	var item = session.item(x);
            if (item.getAttribute("name")=="svCoName")
							companyname=item.getAttribute("value");
          	}			
			}
		}else if (sreporttype.charAt(sreporttype.length-1)=="E"){
				try{
					if (!doc.getElementById("sessionParam")){
						doc= opener.opener.document;
					}
					if (doc.getElementById("sessionParam")){
						var session = doc.getElementById("sessionParam").childNodes;
						for(var x = 0, y = session.length; x < y; x++){
	          	var item = session.item(x);
	            if (item.getAttribute("name")=="svCoName")
								companyname=item.getAttribute("value");
	          	}
	        }
        }catch(e){
        	companyname = "";
        }
       }
    }
		nowBodyID="pageheader";
		addpagetitlecenter(nowBodyID,companyname);
		templatearea("rpfooter",pixelToMm(2));
		nowBodyID="pagefooter";
		addpagefootercenter(nowBodyID);
}
/*
获取当前加入元素的ID
*/
function getObjId(){
 		var sid="PRN_FIELD_";
		var idnum=getDivID();
		var sid0;
		var checkObj
		while(true){
		sid0=sid+idnum;
		checkObj=getObj(sid0);
		if(checkObj==null)
			break;
		idnum++;
		}
		idnum--;
		sid+=idnum;
    return sid;
}
/*
有子表的部件子表布局，以表格形式显示，
部件有多个子表，或嵌套子表，则全显示在表格中
*/
function detaillayout(){
	var names = new Array();
	var values = new Array();
	//names[0]="compo_id";
	//values[0]=scompocode;
	//names[1]="TAB_ID";
	//values[1]="<>'"+smastertab+"'";
	//var sdetaildelta=qryData("AS_COMPO_TAB_FIELD",names,values);
	names[0] = "pagename";
	values[0] = scompocode + "_E";
	names[1] = "ismaster";
	values[1] = "!=";
	names[2] = "componame";
	values[2] = scompocode;
	var sdetaildelta = qryData("print-ruleData.AS_GET_EDITPAGEFIELDS",names,values);
	//var xmldom = new ActiveXObject("Microsoft.XMLDOM");
	//xmldom.loadXML(sdetaildelta);
	//var result = xmldom.documentElement;//.firstChild;
	var result = sdetaildelta;
	var lbfield,vfield;
	var sid;
	var nowBobj;
	var idnums;
	var tableobj;
	var tpobj;
	var width;
  //if(result.getAttribute("success") == "false"){
    //出错处理
  //  alert("错误信息："+result.innerHTML);
  //}else
  if(result != null){
			if (result.childNodes.length == 0) return;
			var colcount=result.childNodes.length;
			addareaTable("rpbody",2,colcount);
			tpobj=document.getElementById("templatebody");
			var tnum =tpobj.getElementsByTagName("table");
			tableobj=getObj("PRN_table_"+(tnum.length-1));
			for (var i=0,j=result.childNodes.length; i<j; i++){
 				var fields = result.childNodes.item(i).childNodes;
				lbfield= fields.item(1).getAttribute("value");
				vfield = fields.item(0).getAttribute("value");
				if(lbfield!=""&&lbfield!=null){
					tableobj.rows[0].cells[i].innerText=lbfield;
				}
				else{
					tableobj.rows[0].cells[i].innerHTML="&nbsp;";
				}
				tableobj.rows[0].cells[i].style.fontFamily="simsun";
				tableobj.rows[0].cells[i].style.fontSize="12px";
				if(vfield!=""&&vfield!=null){
					tableobj.rows[1].cells[i].innerText="@"+vfield;
				}
				else{
					tableobj.rows[1].cells[i].innerHTML="&nbsp;";
				}
				tableobj.rows[1].cells[i].style.fontFamily="simsun";
				tableobj.rows[1].cells[i].style.fontSize="12px";
			}
			tableobj.rows[0].height= tableobj.rows[0].offsetHeight;
			tableobj.rows[1].height=20;
			nowBodyID="rpbody";
			nowBobj=getObj(nowBodyID);
			if(tableobj.width==""){
				if (parseInt(nowBobj.offsetWidth)<parseInt(tableobj.offsetWidth)){
					tableobj.width=nowBobj.offsetWidth-20;
					tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.offsetWidth))/2;
					}else
					{
					tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.offsetWidth))/2;
					}
				}
  			else{
				if (parseInt(nowBobj.offsetWidth)<parseInt(tableobj.offsetWidth)){
					tableobj.width=nowBobj.offsetWidth-20;
					tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.width))/2;
					}
				else{
				tableobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(tableobj.width))/2;
					}
  			}	
  		//alert(nowBodyID+" ; "+tableobj.style.height);
			templatearea(nowBodyID,pixelToMm(tableobj.style.height)+3);
  	}
  setDivMustInit();
}
/*
	增加标题元素至某区域并居中
  输入参数：
  areaname：区域名
  stplname：标题内容
*/
function addtitlecenter(areaname,stplname){
	nowBodyID=areaname;
	addLable(0);
	if(stplname == ""){
		stplname = "模板名称";
		}
	var titileobj=getObj(getObjId());
	var nowBobj=getObj(nowBodyID);
	titileobj.title=stplname;
	titileobj.innerHTML=stplname;
	titileobj.style.fontSize="18px";
	titileobj.style.fontWeight="bold";
	titileobj.style.width = nowBobj.offsetWidth-10;
	titileobj.style.height ="20px";
	titileobj.align="center";
	titileobj.valign="center";
	if(titileobj.style.width=="NaN"){
  	titileobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(titileobj.offsetWidth))/2;
		}
  else{
		titileobj.style.left=parseInt(nowBobj.offsetLeft)+(parseInt(nowBobj.offsetWidth)-parseInt(titileobj.style.width))/2;
  		}
}
/*
	增加标题元素至某区域（页眉）并居中
  输入参数：
  areaname：区域名
  stplname：标题内容
*/
function addpagetitlecenter(areaname,stplname){
	if(stplname == undefined)
		stplname = "公司名称";
	nowBodyID=areaname;
	addLable(0);
	var titileobj=getObj(getObjId());
	var nowBobj=getObj(nowBodyID);
	titileobj.title="单位名称";
	titileobj.innerHTML=stplname;
	titileobj.style.fontSize="18px";
	titileobj.style.fontWeight="bold";
	titileobj.style.width = 300;
	titileobj.style.height ="20px";
	titileobj.align="center";
	titileobj.valign="center";
	titileobj.style.left=parseInt(nowBobj.offsetLeft)+parseInt(nowBobj.offsetWidth)-305;
	titileobj.style.top=nowBobj.offsetTop+(parseInt(nowBobj.offsetHeight)-parseInt(titileobj.offsetHeight))/2;	
	//templatearea(nowBodyID,pixelToMm(2));
}
/*
	增加页码，页数至某区域（页脚）并分居页两边
  输入参数：
  areaname：区域名
*/
function addpagefootercenter(areaname){
	nowBodyID=areaname;
	createDivT("@PAGE_NUMBER","页码",2)
	var titileobj=getObj(getObjId());
	var nowBobj=getObj(nowBodyID);
	titileobj.align="center";
	titileobj.valign="center";
	titileobj.style.left=parseInt(nowBobj.offsetLeft)+100;
	titileobj.style.top=nowBobj.offsetTop+(parseInt(nowBobj.offsetHeight)-parseInt(titileobj.offsetHeight))/2;
	createDivT("@PAGE_NUMBER","页数",2)
	var titileobj=getObj(getObjId());
	var nowBobj=getObj(nowBodyID);
	titileobj.align="center";
	titileobj.valign="center";
	titileobj.style.left=parseInt(nowBobj.offsetLeft)+parseInt(nowBobj.offsetWidth)-230;
	titileobj.style.top=nowBobj.offsetTop+(parseInt(nowBobj.offsetHeight)-parseInt(titileobj.offsetHeight))/2;
}
/*
	增加静态文本至某区域
  输入参数：
  areaname：区域名
  slabel：静态文本内容
*/
function addarealable(areaname,slable){
	nowBodyID=areaname;
	addLable(0);
	var titileobj=getObj(getObjId());
	var nowBobj=getObj(nowBodyID);
	titileobj.title=slable;
	titileobj.innerHTML=slable;
	titileobj.align="center";
	titileobj.valign="center";
	//titileobj.style.left=nowBobj.offsetLeft+nowBobj.style.width/2;
	//titileobj.style.left=nowBobj.offsetLeft+210;
	//titileobj.style.top=nowBobj.offsetTop+(divobj.length+1)*2;
}
/*
	增加变量参数至某区域
  输入参数：
  areaname：区域名
  sName：变量中文名
*/
function addareaVariable(areaname,sName){
	nowBodyID=areaname;
	createDivT(sName,sName,2)
	var titileobj=getObj(getObjId());
	var nowBobj=getObj(nowBodyID);
	titileobj.align="center";
	titileobj.valign="center";
	//titileobj.style.left=nowBobj.offsetLeft+nowBobj.style.width/2;
	//titileobj.style.left=nowBobj.offsetLeft+210;
	//titileobj.style.top=nowBobj.offsetTop+(divobj.length+1)*2;
}
/*
	某区域设置高度
  输入参数：
  areaname：区域名
  heifhtvalue：高度值
*/
function templatearea(areaname,heightvalue){
	var obj=getObj("PRN_templatearea");
	nowBodyID=areaname;
	var bobj=getObj(nowBodyID);
	obj.all.areaName.innerText=bobj.title;
	obj.all.bgcolor.value="#FFFFFF";
	obj.setAttribute("compoid",bobj.id);
	//obj.style.display="none";
	obj.all.height.value=heightvalue;
	setTemplateBody();
}
/*
	某区域增加表格
  输入参数：
  areaname：区域名
  rows：表格行数
  cols：表格列数
*/
function addareaTable(areaname,rows,cols){
	var obj=getObj("PRN_tablestyle");
	nowBodyID=areaname;
	var bobj=getObj(nowBodyID);
	obj.setAttribute("compoid",bobj.id);
	//obj.style.display="none";
	obj.all.cols.value=cols;
	obj.all.rows.value=rows;
	setTable();
}


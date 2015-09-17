/*********************************
 作者：刘明
 功能：选择日历中的日期到文本框中
 说明：textName:文本框的name
 **********************************/
function autoDateInput(obj){
	var strStyle = "dialogWidth=200px;dialogHeight=220px;status=0;help=0;maximize=0;minimize=0;";
	var MyDialog=obj.value;
	var dateA=new Array();
  dateA[0]=obj.value;
  dateA[1]="date";
	var oldDate=obj.value;
  //strTitle =  window.showModalDialog("script/date.htm",MyDialog,strStyle);
  strTitle =  window.showModalDialog("script/date.htm",dateA,strStyle);
  if(strTitle!=null){
    obj.value=strTitle;
    if(oldDate!=strTitle)
      obj.fireEvent("onchange");
    
		//无赖的补救;参见statSearchPage.js 285;leidh;20060716;
		if (window._oEditTD!= null){
      var voDateInput= window._oEditTD.all(obj.id);
      voDateInput.value= obj.value;
      voDateInput.focus;
    }else{
      obj.focus();
    }
  }
}

function autoDateTimeInput(obj){
	var strStyle = "dialogWidth=200px;dialogHeight=240px;status=0;help=0;maximize=0;minimize=0;";
	var dateA=new Array();
  dateA[0]=obj.value;
  dateA[1]="datetime";
	var oldDate=obj.value;
  //strTitle =  window.showModalDialog("script/date.htm",MyDialog,strStyle);
  strTitle =  window.showModalDialog("script/date.htm",dateA,strStyle);
  if(strTitle!=null){
    obj.value=strTitle;
    if(oldDate!=strTitle)
      obj.fireEvent("onchange")
    obj.focus();
  }
}


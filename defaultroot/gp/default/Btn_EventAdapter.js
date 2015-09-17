function defaultInit(){
	voToolbar= PageX.getCtrlObj("toolbar");
	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this)); 
}

/*
  处理工具栏按钮点击事件
*/
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){ 
	var f;
	var vsFlag;
	if ("function" == typeof (f = window["before_" + oCall.id])){
		var beforeResult = f();
		if(!beforeResult) return;
	}

	if ("function" == typeof (f = window[oCall.id])){
		f();
	}else if ("function" == typeof (f = window[oCall.id + "F"])){
		vsFlag=f();
	}else{
		alert("此功能目前还未定义，请以后再试！");
	}
	
  if ("function" == typeof (f = window["after_" + oCall.id]) && vsFlag != false ){
	  f();
	}
	
}


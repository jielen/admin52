function defaultInit(){
	voToolbar= PageX.getCtrlObj("toolbar");
	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this)); 
}

/*
  ����������ť����¼�
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
		alert("�˹���Ŀǰ��δ���壬���Ժ����ԣ�");
	}
	
  if ("function" == typeof (f = window["after_" + oCall.id]) && vsFlag != false ){
	  f();
	}
	
}


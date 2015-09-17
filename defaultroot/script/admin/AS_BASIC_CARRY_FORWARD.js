
//----------------------确定开始结转--------------------------------------
function startCarry() {
	if (!confirm("\u8bf7\u614e\u91cd\u8fdb\u884c\u8fd9\u6837\u7684\u64cd\u4f5c!\n\u7a0b\u5e8f\u5c06" + fromYear + "\u5e74\u7684\u57fa\u7840\u8d44\u6599\u6570\u636e\u590d\u5236\u5230" + toYear + "\u5e74\u5ea6\u4e2d,\u5e76\u4fdd\u6301\u5b8c\u5168\u4e00\u81f4.")) {
		return;
	}
	Info.sendRequest(getReturnValue, "carryBasicInformation", ["fromYear", "toYear"], [fromYear, toYear]);
}
//----------------------------------------------------------------------
function getReturnValue() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			//debugger;
			var textobj = http_request.responseText;
			if (textobj == "true") {
				alert("结转成功");
			} else {
				alert(textobj);
			}
		}
	}
}



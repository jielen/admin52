/* $Id: PrnSetBGPic.js,v 1.3 2008/03/21 07:59:28 zhangkun Exp $ */
function ok(){
	if (document.getElementById("upfile").value){

		var fileName = document.getElementById("upfile").getAttribute("value");
		fileName = fileName.substr(fileName.lastIndexOf("\\") + 1);
		document.getElementById("fileName").setAttribute("value",fileName);
		document.getElementById("uploadform").submit();
	}
}
function fileBack(result){
	if (result.getAttribute("success") == "false"){
		alert(result.innerHTML);
	}
	else{
		returnValue = new Array();
		returnValue[0] = document.getElementById("upfile").value;
		returnValue[1] = document.getElementById("picWidth").value;
		returnValue[2] = document.getElementById("picHeight").value;
		returnValue[3] = result.innerHTML;
		close();
	}
}
function cancel(){
  returnValue = new Array();
  returnValue[0] ="1";
	close();
}
function closes(){
	window.close();
}

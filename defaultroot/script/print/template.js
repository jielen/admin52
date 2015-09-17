var pressed = false;
var pressedEle = null;


function setBarPos(){
		toolbar.style.border = "0 solid buttonface";
		toolbar.style.width = 36;
		toolbar.style.height = "100%";
		toolbar.style.top = 36;
		toolbar.style.left = 0;
		
		menuBar.style.border = "0 solid buttonface";
		menuBar.style.width = "100%";
		menuBar.style.height = 36;
		menuBar.style.top = 0;
		menuBar.style.left = 0;
}
function setBtnStyle(){
	var ele = event.srcElement;
	if(pressed){
		//alert(pressedEle + ":" + ele.getAttribute("id"));
		if(ele.getAttribute("id") == pressedEle){
			ele.style.borderStyle = "none";
			pressed = false;
			pressedEle = "";
		}
		else{
			if(pressedEle){
				var before = document.getElementById(pressedEle);
				if(before){
					before.style.borderStyle = "none";
					ele.style.borderStyle = "inset";
					ele.style.borderWidth="2px";
					pressed = true;
					pressedEle = ele.getAttribute("id");
				}
				else{
					pressed = false;
					pressedEle = "";
				}
			}
			else{
				pressed = false;
				pressedEle = "";
			}
		}
	}	
	else{
		ele.style.borderStyle="inset";
		ele.style.borderWidth="2px";
		pressedEle = ele.getAttribute("id");
		pressed = true;
	}	
}

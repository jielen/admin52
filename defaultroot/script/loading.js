function getObjectById(id){ 
	if(document.all) 
		return(eval("document.all."+ id)); 
	return(eval(id)); 
}
function loading() //主调函数
{    

    var o = getObjectById("loading").style; 
		o.display = ""; 	
		if( !window.event)
    	return;
    var e = window.event.srcElement;   
		if(e==null)
			return;

    eventSrc = e;
 		if (arguments.length == 0) 
 			objExport = e;
    else 
    	objExport = eval(arguments[0]);
 		var t = e.offsetTop,  h = e.clientHeight, l = e.offsetLeft, p = e.type;
 		while (e = e.offsetParent){
 			t += e.offsetTop; 
 			l += e.offsetLeft;
 		}
   		
    	var cw = getObjectById("loading").clientWidth, ch = getObjectById("loading").clientHeight;
    	var dw = document.body.clientWidth, dl = document.body.scrollLeft, dt = document.body.scrollTop;
    	if (document.body.clientHeight + dt - t - h >= ch) 
    		o.top = (p=="image")? t + h : t + h + 6;
    	else 
    		o.top  = (t - dt < ch) ? ((p=="image")? t + h : t + h + 6) : t - ch;
    	if (dw + dl - l >= cw) 
    		o.left = l; 
    	else 
    		o.left = (dw >= cw) ? dw - cw + dl : dl;
}    

function loadFinish()
{
	getObjectById("loading").style.display = "none";
}
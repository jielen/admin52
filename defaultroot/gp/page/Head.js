
var INCLUDED_SCRIPT_ID= "included_script_id_20051210";

function includeJS(jsURL){
  var voIncludedScript= document.getElementById(INCLUDED_SCRIPT_ID);
  var voScript= voIncludedScript.cloneNode(true);
  voIncludedScript.parentNode.appendChild(voScript);
  voScript.src= jsURL;
}

function getJSRootFrame(curTop){
	//alert("getJSRootFrame();");
	if (curTop== null) curTop= top;
	var root= null;
	if (typeof(curTop.Page4)== "function"
	    || typeof(curTop.Page4)== "object"){
	  root= curTop;
	}
	else if (curTop.opener== null) return null;
	if (root== null){
		root= getJSRootFrame(curTop.opener.top);
	}
	return root;
}

function createObject(jsClassName){
	var obj= eval("new "+ jsClassName+ "();");
	obj.oOwnerFrame= window;
	return obj;
}


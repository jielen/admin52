var GrantIp;
var voFree = null;
var articleId;

window.onbeforeunload = function closeEditPage(){
	if(PageX.sPageType == 'edit'){
		var iSearch = window.opener.PageX.getCtrlObj("AS_ARTICLE_search");
		iSearch.search();
	}
}

function setEditorValue() {
	var names = new Array();
   	var values = new Array();
   	names[0] = "id";
   	values[0] = articleId;
   	var area_content = Info.requestData("articleContent", "all", names, values);
	return area_content.text;
}
function getTextValue() {
	var editor = (document.getElementById("tempArea___Frame").contentWindow.document.getElementById("xEditingArea")).firstChild;
	if(editor.tagName.toUpperCase() == "IFRAME"){
		return editor.contentWindow.document.body.innerHTML;
	}else{
		return editor.innerText;
	}
}
function setTextValue(textValue) {
	(document.getElementById("tempArea___Frame").contentWindow.document.getElementById("xEditingArea")).firstChild.contentWindow.document.body.innerHTML = textValue;
}
function setPageInit(){
	var mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  	voFree = PageX.getFree(mainTableName);
  
	voToolbar= PageX.getCtrlObj("toolbar");
  	voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	voToolbar.setCallDisabled("fsave", true);
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", true);
    	voToolbar.setCallDisabled("fpublish", true);
	}
	else{
		voFree.setReadOnly(true);
	}
}
function createRichEditor(fckBasePath){
	var oFCKeditor = new FCKeditor("tempArea");
	oFCKeditor.BasePath = fckBasePath;
	oFCKeditor.Value = setEditorValue();
	oFCKeditor.Width = "100%";
	oFCKeditor.Height = "400";
	oFCKeditor.ToolbarSet = "Article";
	oFCKeditor.Create() ;
	
}
function before_fsave(){
	var id = voFree.getValue("ID");
	var name = voFree.getValue("TITLE");
	if(PF.isEmpty(id)){
		alert("文章编号不能为空！");
		return false;
	}
	if(PF.isEmpty(name)){
		voFree.setValue("TITLE", "无标题文章");
	}
	return true;
}
function before_fdelete(){
	if(confirm("删除文章将同时删除已发布在频道中的信息，确认否？"))return true;
	else return false;
}
function before_fpublish(){
	var id = voFree.getValue("ID");
	if(PF.isEmpty(id)){
		alert("文章编号为空，不能发布！");
		return false;
	}
	return true;
}
function farticlePublish(){
	var win = PageX.showModalDialog("dispatcher","AS_ARTICLE",["function", "articleId"],["articlePublish", voFree.getValue("ID")]);
	var params = win;
	if(!params){
		return false;	
	}
	var names = new Array();
	var values = new Array();
	names[0] = "addPortlet";
	values[0] = params[0];
	names[1] = "delPortlet";
	values[1] = params[1];
	names[2] = "articleId";
	values[2] = articleId;
	var result = Info.requestData("publishArticle", "AS_ARTICLE", names, values);
	if(result.getAttribute("success") == "true"){
		alert("文章发布成功！");
		return true;	
	}else{
		alert("文章发布失败！");
		return false;	
	}
}
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  	switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
  		voFree.setReadOnly(false);
  		voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", true);
    	voToolbar.setCallDisabled("fpublish", true);
    	voFree.setValue("ID","");
    	voFree.setValue("TITLE","");
    	voFree.setValue("CREATOR","");
    	voFree.setValue("PUBTIME","");
    	voFree.setValue("TYPE","");
    	voFree.setValue("ATTATCH","");
    	voFree.setValue("CONTENT","");
    	setTextValue("");
      	break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", false);
    	voToolbar.setCallDisabled("fpublish", false);
      	break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	if(!before_fsave())break;
      	var names = new Array();
      	var values = new Array();
      	names[names.length] = "id";
      	values[values.length] = voFree.getValue("ID");
      	names[names.length] = "title";
      	values[values.length] = voFree.getValue("TITLE");
      	names[names.length] = "creator";
      	values[values.length] = voFree.getValue("CREATOR");
      	names[names.length] = "pubtime";
      	values[values.length] = voFree.getValue("PUBTIME");
      	names[names.length] = "type";
      	values[values.length] = voFree.getValue("TYPE");
      	names[names.length] = "attatch";
      	values[values.length] = voFree.getValue("ATTATCH");
      	names[names.length] = "attatch_blobid";
      	values[values.length] = PageX.getCtrlObj("ATTATCH").getFileId();
      	names[names.length] = "content";
      	values[values.length] = getTextValue();
      	
       	Info.frameSubmit("saveArticle", "all", names, values);
      	voFree.setReadOnly(true);
      	voToolbar.setCallDisabled("fedit", false);
      	voToolbar.setCallDisabled("fsave", true);
      	voToolbar.setCallDisabled("fdelete", false);
      	voToolbar.setCallDisabled("fpublish", false);
      	
      	articleId = voFree.getValue("ID");
     	break;      
  	//-----------------------删除-----------------------------
  	case "fdelete":
      	if(!before_fdelete())break;
      	var is_del = Info.requestData("deleteArticle", "all", ["id"], [voFree.getValue("ID")]);
      	voFree.setValue("ID","");
    	voFree.setValue("TITLE","");
    	voFree.setValue("CREATOR","");
    	voFree.setValue("PUBTIME","");
    	voFree.setValue("TYPE","");
    	voFree.setValue("ATTATCH","");
    	voFree.setValue("PORTLETID","");
    	voFree.setValue("CONTENT","");
    	setTextValue("");
    	voToolbar.setCallDisabled("fedit", true);
    	voToolbar.setCallDisabled("fsave", false);
    	voToolbar.setCallDisabled("fdelete", true);
    	voToolbar.setCallDisabled("fpublish", true);
	    alert(is_del.text);
      	break;
    case "fpublish":
    	if(!before_fpublish()){
    		break;
    	}
       	farticlePublish();
    	break;
    	//-----------------------帮助-----------------------------
    case "fhelp":
       	PageX.showHelp();
       	break;
    	//-----------------------缺省-----------------------------
  	default:
  	}
  	return;
}

function setPageInit(){
    voToolbar= PageX.getCtrlObj("toolbar");
    voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	voGrid = PageX.getCtrlObj("AS_UPLOAD_Grid");
	//voGrid.addListener(new Listener(voGrid.OnRowDblClick, eventAnswer_VouHeadGrid_OnRowDblClick, this));  		
}

function eventAnswer_VouHeadGrid_OnRowDblClick(oSender, oRow, oEvent){
	var names = new Array(); 
    var values = new Array();
   
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------上传-----------------------------
  	case "f_upload":
  	  var voBox= this.oOwner;
	  var vavArg= new Array();
	  vavArg[0]= window;
  	  var win = window.showModalDialog(PageX.sRootPath + "/gp/webpage/html/ResourceUpload.jsp",
  	                         vavArg, "dialogWidth:400px; dialogHeight:130px; center:yes; resizable:no; status: no; scroll:no; help: no");
      if(win){
      	var iSearch = PageX.getCtrlObj("AS_UPLOAD_search");
		iSearch.search();
      }
      break;
    //-----------------------删除-----------------------------
    case "fdelete":
		var voListGrid = PageX.getListGrid();
		var selectRows = voListGrid.getSelectedRowIndexs();
		if(!selectRows || selectRows.length == 0){
			alert("请选择要删除的文件！")
		}
		else{
		     if (!confirm("确定删除？")) break;
		     
			var fieldNames = voListGrid.getFieldNames();
			var fileNames = new Array();
		    var fileValues = new Array();
			for (var i = 0; i < selectRows.length; i ++ ){
					var fileId = voListGrid.getValueByRowField(selectRows[i], "FILE_ID");
					fileNames[0] = "fileid";
		            fileValues[0] = fileId;
		            var vsResponseText= Info.requestDataK("resourceDelete", "all",fileNames,fileValues);
		 		}	
		    var is_del = Info.requestData("resourceDelete", "all", fileNames, fileValues); 
		    alert(is_del.text);
		    var iSearch = PageX.getCtrlObj("AS_UPLOAD_search");
		    iSearch.search();	
	    }	  
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
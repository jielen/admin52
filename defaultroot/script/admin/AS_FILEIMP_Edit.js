  
 
//--------------------------------------------------------------OnAfterSelect

function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	voToolbar.setCallDisabled("fsave", true);
	
	voGrid = PageX.getCtrlObj("AS_FILEIMP_Grid");
	voGrid.setReadOnly(true);
	
	voFimpTable = PageX.getCtrlObj("FIMP_TABLE");
	voFimpTable.addListener(new Listener(voFimpTable.OnAfterSelect, eventAnswer_FimpTable_OnAfterSelect, this));
	
	
	if (PageX.isNew()){
		voFree.setReadOnly(false);
		voGrid.setReadOnly(false);
		voToolbar.setCallDisabled("fedit", true);
		voToolbar.setCallDisabled("fsave", false);
		voToolbar.setCallDisabled("fdelete", true);
	}
	else{
		voFree.setReadOnly(true);
	}
	
}

function eventAnswer_FimpTable_OnAfterSelect(){
        var tableName=voFree.getValue("FIMP_TABLE");
        if(tableName==null || tableName.length==0)
           return;
       
         //var url="impfieldtable?table="+tableName;
        // alert("url:"+url);
        var names= new Array("table");
        var values= new Array(tableName);
        var result=PageX.getRuleDeltaXML("admin-ruleData.AS_FILEIMP_FIELD", names, values); //取得服务器端返回值
         //alert("同步数据:\n"+result);
         
        if(result==null ||result.length==0)
            return; //从SERVLET 返回的数据有问题，不可用
        voFree.setValue("FIMP_ID",tableName);
        voFree.setValue("FIMP_NAME",tableName);
        var data=result.getElementsByTagName("delta")[0];
        var dataS= data.xml;
        voGrid.clear();
        var res = voGrid.insertDelta(dataS, 0, true, true, true, "", false, true, false);
        rowsInit();
	}

function rowsInit(){
	var voCount=voGrid.getRowCount();
  if(voCount==0 )
  	return;
    for(var i=0;i<voCount;i++){
    var value=voGrid.getValueByRowField(i,"FIELD_FROM");
		var is_import = voGrid.getValueByRowField(i,"IS_IMPORT");
    //voGrid.setCellReadOnly(rows[i],"FIELD",true)
    //setCellReadOnly(rows[i],"FIELDNAME",true)
    //setRowField(rows[i],"IS_IMPORT","Y");
    
    if(value==null)
    {
     	value=0;
     	//setRowField(rows[i],"FIELD_FROM",0);
     	voGrid.setValueByRowField(i, "FIELD_FROM", 0);
    }
    if((value==1) || (value == 4)){ //来源于手工
    	//setCellReadOnly(iRowIndex, iColIndex, tIsReadOnly)
      voGrid.setCellReadOnly(i,"DEFAULT_VALUE",false);
      voGrid.setCellReadOnly(i,"FIELD_FILE_COL",true);
    }
    else{ //来源于文件
     	voGrid.setCellReadOnly(i,"DEFAULT_VALUE",true);
     	voGrid.setCellReadOnly(i,"FIELD_FILE_COL",false);
    }
  	if((is_import==null) ||(is_import.length==0)||(is_import==" ")||(is_import == "N")){
  		voGrid.setValueByRowField(i,"DEFAULT_VALUE","");
    	voGrid.setValueByRowField(i,"FIELD_FILE_COL","");
			voGrid.setValueByRowField(i,"FIELD_FROM","");
			voGrid.setCellReadOnly(i,"FIELD_FILE_COL",true);
			voGrid.setCellReadOnly(i,"FIELD_FROM",true);
  	}
		else{
			voGrid.setCellReadOnly(i,"FIELD_FROM",false);
			voGrid.setCellReadOnly(i,"FIELD_FILE_COL",false);
		}
  }
}
//--------------------控制字表------------------------------
function AS_FILEIMP_FIELD_IS_IMPORT_Change(){
	var row=getCurrentRow("AS_FILEIMP_FIELD");
  if(row == null){
  	return;
  }
	var value=getRowField(row,"IS_IMPORT",false);
  if(value==null || (value.length==0)|| (value==" ")||(value == "N")){
  	setRowField(row,"DEFAULT_VALUE","");
    setRowField(row,"FIELD_FILE_COL","");
		setRowField(row,"FIELD_FROM","");
		setCellReadOnly(row,"FIELD_FROM",true);
		setCellReadOnly(row,"FIELD_FILE_COL",true);
		setRowField(row,"BEGINCOL","");
		setCellReadOnly(row,"BEGINCOL",true);
		setRowField(row,"ENDCOL","");
		setCellReadOnly(row,"ENDCOL",true);
    return;
  }
	else{
		setCellReadOnly(row,"FIELD_FROM",false);
		setCellReadOnly(row,"FIELD_FILE_COL",false);
		setCellReadOnly(row,"BEGINCOL",false);
		setCellReadOnly(row,"ENDCOL",false);
	}
}
function  AS_FILEIMP_FIELD_FIELD_FROM_Change(){
	var row=getCurrentRow("AS_FILEIMP_FIELD");
  if(row==null)
  	return;
	var value=getRowField(row,"FIELD_FROM",false);
  if(value==null || (value.length==0)|| (value==" ") )
  {
  	setRowField(row,"DEFAULT_VALUE","");
    setRowField(row,"FIELD_FILE_COL","");
    return;
  }
    if((value==1) || (value == 4)){ //来源于手工
	  setCellReadOnly(row,"DEFAULT_VALUE",false);
    setCellReadOnly(row,"FIELD_FILE_COL",true);
	}
	else if(value==0){ //来源于文件
	  setCellReadOnly(row,"DEFAULT_VALUE",true);
    setCellReadOnly(row,"FIELD_FILE_COL",false);
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
      PageX.newBill();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
    	voGrid.setReadOnly(false);
		  voToolbar.setCallDisabled("fedit", true);
		  voToolbar.setCallDisabled("fsave", false);
      break;
  	//-----------------------保存-----------------------------
    case "fsave":
    	//if(!before_fsave()){
      // 	break;
    	//}
    	if (PageX.isChanged()== false){
      	alert("没有发生更改,不用保存!");
    	}
    	else{
       var vvRet= PageX.saveBill();
       if (vvRet== true) {
         voFree.setReadOnly(true);
				 voToolbar.setCallDisabled("fedit", false);
				 voToolbar.setCallDisabled("fsave", true);
				 voToolbar.setCallDisabled("fdelete", false);
         alert("保存成功!");
       }
       else{
         alert("保存失败 ,失败的原因是: \n" + vvRet);
       }
     }
     break;      
  	//-----------------------删除-----------------------------
  	case "fdelete":
    	if (!confirm("确定删除？")) break;
      //if(!before_fdelete()){
      // 	break;
    	//}
      var vvRet = PageX.deleteBill();
      if (vvRet== true) {
        PageX.newBill();
        voFree.setReadOnly(false);
        voToolbar.setCallDisabled("fedit", true);
				voToolbar.setCallDisabled("fsave", false);
				voToolbar.setCallDisabled("fdelete", true);
        alert("删除成功");
      }
      else{
        alert("删除失败,失败的原因是: \n" + vvRet);
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
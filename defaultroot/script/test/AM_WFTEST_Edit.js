function setPageInit(){
	mainTableName = DataTools.getMainTableName(DataTools.getCompoName());
  voFree = PageX.getFree(mainTableName);
    
	voToolbar= PageX.getCtrlObj("toolbar");
  voToolbar.addListener(new Listener(voToolbar.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
	
	if (PageX.isNew()){
		voFree.setReadOnly(false);
	}
	else{
		voFree.setReadOnly(true);
	}
	
}

function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
 
  switch(oCall.id){
    //-----------------------新建-----------------------------
  	case "fadd":
      PageX.newBill();
      break;
  	//-----------------------修改-----------------------------
    case "fedit":
    	voFree.setReadOnly(false);
      break;
    //-------------------------送审--------------------------------
    case "fnewcommit":
    	newcommit();
      break;
         
  	//-----------------------保存-----------------------------
    case "fsave":
    	//if(!before_fsave()){
      // 	break;
    	//}

    	if (PageX.isChanged()== false){
        voFree.setReadOnly(true);
       
      	alert("没有发生更改,不用保存!");
    	}
    	else{
       var vvRet= PageX.saveBill();
       if (vvRet== true) {
         voFree.setReadOnly(true);
        
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
    	case "fgrantfunc":
       fgrantfuncF();
       break;       
    	//-----------------------缺省-----------------------------
  	default:
  }
  return;
}
   
//送审操作
function newcommit() {
	vsRet = PageX.newCommit([0], true);
  if(""==vsRet){
    alert("送审成功！");
  }else {
    alert(vsRet);
  }
  //if (voSearch) voSearch.search(); //刷新页面
  PageX.tIsChanged= false;
}

//提交
function commit() {
  var vsRet = PageX.autoCommitSimply(aiRow);;

  
  if(vsRet == "success"){
    alert("提交成功！");
  }else {
    if (vsRet != "")
      alert(vsRet);
  }  

}  
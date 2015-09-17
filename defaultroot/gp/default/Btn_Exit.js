var isExit = false;
/*
  关闭窗口
*/
function fexitF(){
  if (PageX.isChanged() == true){
    var result = confirm("确实要离开该页面吗? \n  \n 当前页面上的数据已经修改,但没有保存! \n \n 按'确定'离开本页面,按'取消'留在本页面.") ;
    if (result==true){
      isExit = true;
      window.close();
    }
  }else{
    isExit = true;
    window.close();
  }
}

//----------------------------------------------------------------------
// 处理窗口关闭事件
window.onbeforeunload= function closeEditPage(){
  if (isExit){ return; }
  try {
	  if(PageX.isChanged() == true) 
	    event.returnValue="\n当前页面上的数据已经修改,但没有保存! \n";
	} catch (Error) {
	}
}

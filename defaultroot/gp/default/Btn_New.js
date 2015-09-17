/*
  点击"新增"按钮”
*/
function fnewF(){
  if (PageX.isChanged()== true){
	  var result = confirm("当前页面上的数据已经修改,但没有保存! \n \n 确定要丢弃这些修改吗?") ;
		if (result==true){
			PageX.newBill();
			return true;
		}else{
			return false;
		}
  }else{
		PageX.newBill();
		return true;
  }
}

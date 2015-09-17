/*
  点击"删除"按钮”
*/
function fdeleteF(){
	if (PageX.isNew() && !PageX.isChanged()){
	  return;
	}  
	
  if (!confirm("确定要删除吗？")){
    return;
  }
  if (PageX.isNew()){
    PageX.newBill();
    return;
  }
  var vvRet = PageX.deleteBill();
  if (vvRet== true) {
    PageX.newBill();
    alert("删除成功!");
  }else{
    alert("删除失败,失败的原因是: \n" + vvRet);
  }
}

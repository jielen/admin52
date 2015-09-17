/*
  点击"保存"按钮”
*/
function fsaveF(){
  if (PageX.isChanged()){// 如果数据发生变化
    var result = PageX.saveBill();
    if (result == true){
      alert("保存成功!");
    }else{
      alert(result);
    }
  }
}

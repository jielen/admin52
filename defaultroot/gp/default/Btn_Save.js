/*
  ���"����"��ť��
*/
function fsaveF(){
  if (PageX.isChanged()){// ������ݷ����仯
    var result = PageX.saveBill();
    if (result == true){
      alert("����ɹ�!");
    }else{
      alert(result);
    }
  }
}

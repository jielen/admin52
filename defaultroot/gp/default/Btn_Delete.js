/*
  ���"ɾ��"��ť��
*/
function fdeleteF(){
	if (PageX.isNew() && !PageX.isChanged()){
	  return;
	}  
	
  if (!confirm("ȷ��Ҫɾ����")){
    return;
  }
  if (PageX.isNew()){
    PageX.newBill();
    return;
  }
  var vvRet = PageX.deleteBill();
  if (vvRet== true) {
    PageX.newBill();
    alert("ɾ���ɹ�!");
  }else{
    alert("ɾ��ʧ��,ʧ�ܵ�ԭ����: \n" + vvRet);
  }
}

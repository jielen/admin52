/*
  ���"����"��ť��
*/
function fnewF(){
  if (PageX.isChanged()== true){
	  var result = confirm("��ǰҳ���ϵ������Ѿ��޸�,��û�б���! \n \n ȷ��Ҫ������Щ�޸���?") ;
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

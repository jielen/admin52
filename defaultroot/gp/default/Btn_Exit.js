var isExit = false;
/*
  �رմ���
*/
function fexitF(){
  if (PageX.isChanged() == true){
    var result = confirm("ȷʵҪ�뿪��ҳ����? \n  \n ��ǰҳ���ϵ������Ѿ��޸�,��û�б���! \n \n ��'ȷ��'�뿪��ҳ��,��'ȡ��'���ڱ�ҳ��.") ;
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
// �����ڹر��¼�
window.onbeforeunload= function closeEditPage(){
  if (isExit){ return; }
  try {
	  if(PageX.isChanged() == true) 
	    event.returnValue="\n��ǰҳ���ϵ������Ѿ��޸�,��û�б���! \n";
	} catch (Error) {
	}
}

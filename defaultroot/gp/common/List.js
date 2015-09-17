/* $Id: List.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.List
Description:
List �࣬���ڽ���Ԫ���γ�һ�����У����ṩ׷�ӡ����롢ɾ���Ȳ�����
Company: ��������
Author:leidh
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function List(){
  //1.���� =function();
  

  //2.���������� =function();
  this.CLASSNAME= "gp.common.List";

  //3.���������� =function();
  this.avItem= new Array();  //private;

  //6.���������� =function();
  //public;
  this.add= List_add;
  this.clear= List_clear;
  this.getAllItems= List_getAllItems;
  this.size= List_size;
  this.item= List_item;
  this.remove= List_remove;
  //����������ĵ�

  //private;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; �����µ�Ԫ��;
//���ָ���� iIndex,�� vItem ���뵽ָ����λ��,
//���û��ָ����< 0,����׷�ӵ�ĩβ;
//����ֵ:�ɹ�: �µ�Ԫ�ص�λ�����, ʧ��: -1;
function List_add(vItem, iIndex){
  if (iIndex== null || iIndex< 0 || iIndex>= this.avItem.length){
    iIndex= this.avItem.length;
    this.avItem[iIndex]= vItem;
  }else if (iIndex== 0){
    var vavItem= new Array();
    vavItem[0]= vItem;
    this.avItem= vavItem.concat(this.avItem);
  }else if (iIndex> 0){
    var vavItem= new Array();
    vavItem= this.avItem.slice(0, iIndex);
    vavItem[iIndex]= vItem;
    this.avItem= vavItem.concat(this.avItem.slice(iIndex));
  }else{
    iIndex= this.avItem.length;
    this.avItem[iIndex]= vItem;
  }

  return iIndex;
}
//----------------------------------------------------------------------
//public; ɾ��ָ��λ�õ�Ԫ��;
//����ֵ:�ɹ�: true, ʧ��: false;
function List_remove(iIndex){
  if (iIndex== null || iIndex< 0 || iIndex>= this.avItem.length) return false;
  this.avItem[iIndex]= null;
  if (iIndex== 0){
    this.avItem= this.avItem.slice(iIndex+1);
  }else if (iIndex> 0){
    var vavItem= new Array();
    vavItem= this.avItem.slice(0, iIndex);
    this.avItem= vavItem.concat(this.avItem.slice(iIndex+ 1));
  }

  return true;
}
//----------------------------------------------------------------------
//public; ��ȡָ��λ�õ�Ԫ��;
//����ֵ:�ɹ�: ָ��Ԫ�ص�ֵ, ʧ��: null;
function List_item(iIndex){
  if (iIndex== null || iIndex< 0 || iIndex>= this.avItem.length) return null;
  return this.avItem[iIndex];
}
//----------------------------------------------------------------------
//public; ��ȡ���е�Ԫ��;
//����ֵ:�ɹ�: ������Ԫ�ص�����, ʧ��: null;
function List_getAllItems(){
  return this.avItem;
}
//----------------------------------------------------------------------
//public; ��ȡ����Ԫ�صĸ���;
//����ֵ:�ɹ�: ����, ʧ��: -1;
function List_size(){
  if (this.avItem== null) return -1;
  return this.avItem.length;
}
//----------------------------------------------------------------------
//public; ������е����е�Ԫ��;
//����ֵ:�ɹ�: true, ʧ��: false;
function List_clear(){
  if (this.avItem== null){
    this.avItem= new Array();
    return true;
  }
  this.avItem.length= 0;
  this.avItem= null;
  this.avItem= new Array();
  return true;
}
//----------------------------------------------------------------------


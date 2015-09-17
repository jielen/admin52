/* $Id: FreeManager.js,v 1.2 2008/06/02 13:40:56 huangcb Exp $ */
/*
Title: gp.page.FreeManager
Description:
����������������࣬��ҳ���ʼ��ʱ�����ڶ�ҳ���ע��������ɨ�裬
������ EditBox �� TableName �� FreeCode ���з��飬��ÿ������
һ�� Free �� Search ������й���
Company: ��������
Author: leidh;
*/

//----------------------------------------------------------------------
function FreeManager(){
  //1.���� =function();
  

  //2.���������� =function();
  this.CLASSNAME= "gp.page.FreeManager";

  //3.���������� =function();
  this.sName= "";
  this.oOuterObj= null;

  this.oFreeMap= new Map();   //private;
  this.oSearchMap= new Map(); //private;
  this.oBoxSetMap= new Map();   //private;

  this.tHasInit= false;

  //4.�¼������� =function();

  //5.���������� =function();
  //public;
  this.getAllFree= FreeManager_getAllFree;
  this.getAllSearch= FreeManager_getAllSearch;
  this.getFree= FreeManager_getFree;
  this.getSearch= FreeManager_getSearch;
  this.init= FreeManager_init;
  this.regFree= FreeManager_regFree;
  //����������ĵ�;
  
  this.getSearchByTableName= FreeManager_getSearchByTableName;

  //private;
  this.tHasInit= true;
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
function FreeManager_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;

  if (tIsFinalClass){
    this.tHasInit= true;
  }
  return true;
}
//----------------------------------------------------------------------
//public; ��ȡ Free ����;
//����ֵ: �ɹ�: Free ����, ʧ��: null;
function FreeManager_getFree(sTableName){
  if (sTableName== null) return null;
  var voFree= this.oFreeMap.get(sTableName);
  return voFree;
}
//----------------------------------------------------------------------
//public; ��ȡ���� Free ����;
//����ֵ: �ɹ�: Free ����, ʧ��: null;
function FreeManager_getAllFree(){
  var vaoFree= this.oFreeMap.getAllItem();
  return vaoFree;
}
//----------------------------------------------------------------------
//public; ��ȡ Search ����;
//����ֵ: �ɹ�: Search ����, ʧ��: null;
function FreeManager_getSearch(sGroupId){
  if (sGroupId== null) return null;
  var voSearch= this.oSearchMap.get(sGroupId);
  return voSearch;
}
//----------------------------------------------------------------------
//public; ��ȡ Search ����;
//����ֵ: �ɹ�: Search ������, ʧ��: null;
function FreeManager_getSearchByTableName(sTableName){
  if (sTableName== null) return null;
  var vaoAll= this.getAllSearch();
  var vaoSearch= new Array();
  for (var i= 0; i< vaoAll.length; i++){
    if (vaoAll[i].getTableName()== sTableName){
      vaoSearch[vaoSearch.length]= vaoAll[i];
    }
  }
  return (vaoSearch.length== 0)? null: vaoSearch;
}
//----------------------------------------------------------------------
//public; ��ȡ���� Search ����;
//����ֵ: �ɹ�: Search ����, ʧ��: null;
function FreeManager_getAllSearch(){
  var vaoSearch= this.oSearchMap.getAllItem();
  return vaoSearch;
}
//----------------------------------------------------------------------
//public; ע�� Free ����;
//����ֵ: �ɹ�: true, ʧ��: false;
function FreeManager_regFree(sTableName, oFree){
  this.oFreeMap.put(sTableName, oFree);
  return true;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//----------------------------------------------------------------------



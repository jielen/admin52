/* $Id: FreeManager.js,v 1.2 2008/06/02 13:40:56 huangcb Exp $ */
/*
Title: gp.page.FreeManager
Description:
自由输入框对象管理类，在页面初始化时，用于对页面的注册对象进行扫描，
将各种 EditBox 按 TableName 和 FreeCode 进行分组，将每组分配给
一个 Free 或 Search 对象进行管理；
Company: 用友政务
Author: leidh;
*/

//----------------------------------------------------------------------
function FreeManager(){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.FreeManager";

  //3.变量声明区 =function();
  this.sName= "";
  this.oOuterObj= null;

  this.oFreeMap= new Map();   //private;
  this.oSearchMap= new Map(); //private;
  this.oBoxSetMap= new Map();   //private;

  this.tHasInit= false;

  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.getAllFree= FreeManager_getAllFree;
  this.getAllSearch= FreeManager_getAllSearch;
  this.getFree= FreeManager_getFree;
  this.getSearch= FreeManager_getSearch;
  this.init= FreeManager_init;
  this.regFree= FreeManager_regFree;
  //以上已完成文档;
  
  this.getSearchByTableName= FreeManager_getSearchByTableName;

  //private;
  this.tHasInit= true;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function FreeManager_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;

  if (tIsFinalClass){
    this.tHasInit= true;
  }
  return true;
}
//----------------------------------------------------------------------
//public; 获取 Free 对象;
//返回值: 成功: Free 对象, 失败: null;
function FreeManager_getFree(sTableName){
  if (sTableName== null) return null;
  var voFree= this.oFreeMap.get(sTableName);
  return voFree;
}
//----------------------------------------------------------------------
//public; 获取所有 Free 对象;
//返回值: 成功: Free 对象, 失败: null;
function FreeManager_getAllFree(){
  var vaoFree= this.oFreeMap.getAllItem();
  return vaoFree;
}
//----------------------------------------------------------------------
//public; 获取 Search 对象;
//返回值: 成功: Search 对象, 失败: null;
function FreeManager_getSearch(sGroupId){
  if (sGroupId== null) return null;
  var voSearch= this.oSearchMap.get(sGroupId);
  return voSearch;
}
//----------------------------------------------------------------------
//public; 获取 Search 对象;
//返回值: 成功: Search 对象组, 失败: null;
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
//public; 获取所有 Search 对象;
//返回值: 成功: Search 对象, 失败: null;
function FreeManager_getAllSearch(){
  var vaoSearch= this.oSearchMap.getAllItem();
  return vaoSearch;
}
//----------------------------------------------------------------------
//public; 注册 Free 对象;
//返回值: 成功: true, 失败: false;
function FreeManager_regFree(sTableName, oFree){
  this.oFreeMap.put(sTableName, oFree);
  return true;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//----------------------------------------------------------------------



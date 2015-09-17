/* $Id: Map.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.Map
Description:
Map 类，存储时按关键字存储,提取时按关键字提取,提供高效的方案。
Company: 用友政务
Author:leidh
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Map(){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.common.Map";

  //3.变量声明区 =function();
  this.asKey= new Array();   //private; 按序号存储的关键字;
  this.aiIndex= new Array(); //private; 按关键字存储的序号;
  this.avItem= new Array();  //private;
  this.avItemByIndex= new Array(); //private;

  //5.方法声明区 =function();
  //public;
  this.clear= Map_clear;
  this.get= Map_get;
  this.getAllItem= Map_getAllItem;
  this.getAllKey= Map_getAllKey;
  this.isContain= Map_isContain;
  this.put= Map_put;
  this.remove= Map_remove;
  this.size= Map_size;
  //以上已完成文档

  //private;
  this.getKeyIndex= Map_getKeyIndex;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 增加新的元素;
//返回值:成功: true, 失败: false;
function Map_put(sKey, vItem){
  if (sKey== null || sKey.length== 0) return false;

  var viIndex= this.aiIndex[sKey];
  if (viIndex== null) viIndex= this.asKey.length;
  this.asKey[viIndex]= sKey;
  this.aiIndex[sKey]= viIndex;
  this.avItem[sKey]= vItem;
  this.avItemByIndex[viIndex]= vItem;
  return true;
}
//----------------------------------------------------------------------
//*
//public; 获取指定 Key 值的序号;
//返回值: 成功: 序号, 失败: -1;
function Map_getKeyIndex(sKey){
  var viIndex= this.aiIndex[sKey];
  if (viIndex== null) viIndex= -1;
  return viIndex
}
//*/
//----------------------------------------------------------------------
/*
//private; 获取指定关键字的序号;
//返回值:成功: 序号, 失败: -1;
function Map_getKeyIndex(sKey){
  if (sKey== null || sKey.length== 0) return false;
  var viIndex= -1;
  for (var i= 0; i< this.asKey.length; i++){
    if (this.asKey[i]== sKey){
      viIndex= i;
      break;
    }
  }
  return viIndex;
}
//*/
//----------------------------------------------------------------------
//public; 删除指定的元素;
//返回值:成功: true, 失败: false;
function Map_remove(sKey){
  if (sKey== null || sKey.length== 0) return false;
  var viIndex= this.getKeyIndex(sKey);//this.aiIndex[sKey];
  if (typeof (viIndex)== "undefined" || viIndex== null) return false;

  //this.avItemKey[this.avItem[sKey]]= null;
  this.avItem[sKey]= null;
  this.aiIndex[sKey]= null;
  this.asKey[viIndex]= null;
  this.avItemByIndex[viIndex]= null;
  if (viIndex== 0){
    this.asKey= this.asKey.slice(viIndex+ 1);
    this.avItemByIndex= this.avItemByIndex.slice(viIndex+ 1);
  }else if (viIndex> 0){
    var vasKey= new Array();
    vasKey= this.asKey.slice(0, viIndex);
    this.asKey= vasKey.concat(this.asKey.slice(viIndex+ 1));
    var vaoItem= new Array();
    vaoItem= this.avItemByIndex.slice(0, viIndex);
    this.avItemByIndex= vaoItem.concat(this.avItemByIndex.slice(viIndex+ 1));
  }

  this.aiIndex= new Array();
  for (var i= 0, len= this.asKey.length; i< len; i++){
    this.aiIndex[this.asKey[i]]= i;
  }
  return true;
}
//----------------------------------------------------------------------
//public; 获取指定位置的元素;
//返回值:成功: 指定元素的值, 失败: null;
function Map_get(sKey){
  return this.avItem[sKey];
}
//----------------------------------------------------------------------
//public; 获取所有关键字元素的数组;
//返回值:成功: 含所有关键字元素的数组, 失败: null;
function Map_getAllKey(){
  return this.asKey;
}
//----------------------------------------------------------------------
//public; 获取所有对象项的数组;
//返回值:成功: 所有对象项的数组, 失败: null;
function Map_getAllItem(){
  return this.avItemByIndex;
}
//----------------------------------------------------------------------
//public; 获取所有的元素的个数;
//返回值:成功: 所有的元素的个数, 失败: -1;
function Map_size(){
  return this.asKey.length;
}
//----------------------------------------------------------------------
//public; 判断是否包含指定关键字的元素;
//返回值: 如果包含指定关键字的元素：true, 否则: false;
function Map_isContain(sKey){
  if (this.avItem[sKey]== null) return false;
  return true;
}
//----------------------------------------------------------------------
//public; 清空现有的所有的元素;
//返回值: void;
function Map_clear(){
  if (this.avItem== null) this.avItem= new Array();
  this.avItem.length= 0;
  this.avItem= null;
  this.avItem= new Array();

  //this.asItemKey.length= 0;
  //this.asItemKey= nll;
  //this.asItemKey= new Array();

  if (this.asKey== null) this.asKey= new Array();
  this.asKey.length= 0;
  this.asKey= null;
  this.asKey= new Array();

  //*
  if (this.aiIndex== null) this.aiIndex= new Array();
  this.aiIndex.length= 0;
  this.aiIndex= null;
  this.aiIndex= new Array();
  //*/

  if (this.avItemByIndex== null) this.avItemByIndex= new Array();
  this.avItemByIndex.length= 0;
  this.avItemByIndex= null;
  this.avItemByIndex= new Array();
  return;
}
//----------------------------------------------------------------------


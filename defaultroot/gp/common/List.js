/* $Id: List.js,v 1.1 2008/02/20 11:41:59 liuxiaoyong Exp $ */
/*
Title: gp.common.List
Description:
List 类，用于将各元素形成一个队列，并提供追加、插入、删除等操作。
Company: 用友政务
Author:leidh
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function List(){
  //1.超类 =function();
  

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.common.List";

  //3.变量声明区 =function();
  this.avItem= new Array();  //private;

  //6.方法声明区 =function();
  //public;
  this.add= List_add;
  this.clear= List_clear;
  this.getAllItems= List_getAllItems;
  this.size= List_size;
  this.item= List_item;
  this.remove= List_remove;
  //以上已完成文档

  //private;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 增加新的元素;
//如果指定了 iIndex,则将 vItem 插入到指定的位置,
//如果没有指定或< 0,则将其追加到末尾;
//返回值:成功: 新的元素的位置序号, 失败: -1;
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
//public; 删除指定位置的元素;
//返回值:成功: true, 失败: false;
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
//public; 获取指定位置的元素;
//返回值:成功: 指定元素的值, 失败: null;
function List_item(iIndex){
  if (iIndex== null || iIndex< 0 || iIndex>= this.avItem.length) return null;
  return this.avItem[iIndex];
}
//----------------------------------------------------------------------
//public; 获取所有的元素;
//返回值:成功: 含所有元素的数组, 失败: null;
function List_getAllItems(){
  return this.avItem;
}
//----------------------------------------------------------------------
//public; 获取现有元素的个数;
//返回值:成功: 长度, 失败: -1;
function List_size(){
  if (this.avItem== null) return -1;
  return this.avItem.length;
}
//----------------------------------------------------------------------
//public; 清空现有的所有的元素;
//返回值:成功: true, 失败: false;
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


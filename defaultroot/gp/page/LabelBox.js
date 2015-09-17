/* $Id: LabelBox.js,v 1.1 2008/02/20 11:42:02 liuxiaoyong Exp $ */
/*
Title: gp.page.LabelBox
Description: 
标签框类;用于标签的显示;
Company: 用友政务
Author:$Id
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function LabelBox(){
  //1.超类 =function();
  this.oSuper= new TextBox();
  
  //----------------------------------------------------------------------
  //扩展超类;
  //----------------------------------------------------------------------
  this.oSuper.extend= function(){
    //2.常量声明区 =function();
    this.CLASSNAME= "gp.page.LabelBox";
    
    //3.变量声明区 =function();
    this.sName= this.CLASSNAME;  //对象名称.
  
    this.tAllowInput= false;  //private; 是否允许键盘录入;
    this.tIsReadOnly= true; //private; 是否只读;
    
    //4.事件声明区 =function();
    
    //----------------------------------------------------------------------
    //5.方法区 =function();
    //----------------------------------------------------------------------
    //public; 初始化.
    //参数:boolean类型,是否是最终派生类,optional
    //返回值:成功: true, 失败: false;
    this.init_TextBox= this.init;
    this.init= function(tIsFinalClass){
      if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
      
      //todo: 代码.
      this.init_TextBox(false);
      
      if (tIsFinalClass) this.addEventAnswer();  //增加事件响应;并向外传递通用事件;
      this.tHasInit= true;
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; 调整构件的大小.
    //返回值:成功: true, 失败: false;
    this.resize= function(){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "resize");
      
      //todo: 代码.
      
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; 生成构件的HTML对象.
    //参数:类型Object,盛放TextBox控件的容器.例如Div,TD,SPAN等等 
    //返回值:成功: true, 失败: false;
    this.make= function(oContainer){
      
      //todo: 代码.
      
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; 设置值.
    //返回值:void;
    this.setValue= function(sValue){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
      
      //todo: 代码.
      //发送 OnChange 事件;
      
      return;
    }//:~
    //----------------------------------------------------------------------
    //public; 获取值.
    //返回值:成功: 值, 失败: null;
    this.getValue= function(){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
      
      //todo: 代码.
      
      return null;
    }//:~
    //----------------------------------------------------------------------
  
  
    //----------------------------------------------------------------------
    //6.事件响应区 =function();
    //----------------------------------------------------------------------
    //private; 增加事件响应;
    //返回值: 成功: true, 失败: false;
    this.addEventAnswer_TextBox= this.addEventAnswer;
    this.addEventAnswer= function(){
      //调用超类的增加事件响应的方法;
      this.addEventAnswer_TextBox();
  
      //----------------------------------------------------------------------
      //增加事件响应;并向外传递通用事件;
      //----------------------------------------------------------------------
      //private; 表格滚动处理.
      //返回值:成功: true, 失败: false;
      this.oOuterPanel.onfocus= function(){
        
        //todo: 代码.
        //这儿的 this -> event.srcElement;
        //从 this 中获取 oOwner 对象;
        
        return true;
      }//:~
      //----------------------------------------------------------------------
      //private; 表格滚动处理.
      //返回值:成功: true, 失败: false;
      this.oOuterPanel.onblur= function(){
        
        //todo: 代码.
        //这儿的 this -> event.srcElement;
        //从 this 中获取 oOwner 对象;
        
        return true;
      }//:~
      //----------------------------------------------------------------------
      
      return true;
    }//:~
  }
  //----------------------------------------------------------------------


  //----------------------------------------------------------------------
  //9.返回 =function();
  //----------------------------------------------------------------------
  this.oSuper.extend();
  this.release = function(){
  	this.oOuterPanel.onblur = null;
  	this.oOuterPanel.onfocus = null;
  	this.oOuterPanel = null;
  	
  };
  return this.oSuper; 
}
//----------------------------------------------------------------------



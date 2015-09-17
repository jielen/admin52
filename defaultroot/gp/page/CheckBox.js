/* $Id: CheckBox.js,v 1.2 2008/06/02 13:40:19 huangcb Exp $ */
/*
Title: gp.page.CheckBox
Description: 
检查框类;用于处理是或否之类的值集;
Company: 用友政务
Date:2004/08/24
Author:zhangcheng
History:
日期		        修改人		修改内容描述
20040930    zhangcheng created
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function CheckBox(sid){
  //1.超类 =function();
  this.oSuper= new TextBox(sid);
  
  //----------------------------------------------------------------------
  //扩展超类;
  //----------------------------------------------------------------------
  this.oSuper.extend= function(){
    //2.常量声明区 =function();
    this.CLASSNAME= "gp.page.CheckBox";
    
    //3.变量声明区 =function();
    this.sName= this.CLASSNAME;  //对象名称.
    this.oOptionGroup=null;
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
      this.init_TextBox(false);
      this.oOptionGroup=this.oInputBox.nextSibling;//实际上是一个span内部包含了一些input type=option的控间
       if(this.mpValueSet.getAllKeys().length>0)this.loadValueSet();
      if (tIsFinalClass) this.addEventAnswer();  //增加事件响应;并向外传递通用事件;
      this.tHasInit= true;
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; 调整构件的大小.
    //返回值:成功: true, 失败: false;
    this.resize= function(){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "resize");
      return true;
    }//:~
    
      //----------------------------------------------------------------------
    //public;
    //返回值:void
    this.loadValueSet= function(){
      var vmpKey=this.mpValueSet.getAllKeys();
    for(var i=0,j=vmpKey.length;i<j;i++){
        var oOption = this.createOptionNode();
        this.oOptionGroup.appendChild(oOption);
        oOption.innerText = vmpKey[i];
        oOption.value = this.mpValueSet.getItem(vmpKey[i]);
    }
      return ;
    }//:~
    
    //----------------------------------------------------------------------
    //public; 生成构件的HTML对象.
    //返回值:成功: true, 失败: false;
    this.make_TextBox=this.init;
    this.make= function(){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
      this.make_TextBox(false);
      this.oOuterPanel.appendChild(this.createOptionGroup());
      return true;
    }//:~

 //----------------------------------------------------------------------
    //private; 创建Select 节点.
    //返回值:成功：Input 节点的HTML字符串;失败：null
    this.createOptionNode= function(){
     var voResult=document.createElement("input");
     voResult.type="option";
      voResult.id=this.DOMID_SELECT;
      voResult.className=this.STYLE_SELECT;
      voResult.size="5";//TODO
      //result.height="200";
      return voResult;
    }//:~

 //----------------------------------------------------------------------
    //private; 创建Select 节点.
    //返回值:成功：Input 节点的HTML字符串;失败：null
    this.createOptionGroup= function(){
     var result=document.createElement("span");
      result.id=this.DOMID_OPTION_GROUP;
      result.className=this.STYLE_OPTION_GROUP;
      return result;
    }//:~
        
    //----------------------------------------------------------------------
    //public; 设置值.
    //参数:字符串类型	
    //返回值:void;
    this.setValue= function(sValue){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
	//TODO
      var vaArg=new Array(this.sFieldName,sValue);
      this.fireEvent("OnChange",vaArg);	  
      
      return;
    }//:~
    //----------------------------------------------------------------------
    //public; 获取值.
    //返回值:成功: 值, 失败: null;
    this.getValue= function(){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
      
      return null;
    }//:~
    //----------------------------------------------------------------------
    //public; 设置允许键盘录入属性.
    //返回值:void;
    this.setAllowInput= function(tAllowInput){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
      return;
    }//:~
    //----------------------------------------------------------------------
    //public; 设置只读属性.
    //返回值: void;
    this.setReadOnly= function(tIsReadOnly){
      if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "Resize");
      
      return;
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
      //----------------------------------------------------------------------
      
      return true;
    }//:~
  }
  //----------------------------------------------------------------------

  //----------------------------------------------------------------------
  //9.返回 =function();
  //----------------------------------------------------------------------
  this.oSuper.extend();
  this.release = function(){};
  return this.oSuper; 
}
//----------------------------------------------------------------------



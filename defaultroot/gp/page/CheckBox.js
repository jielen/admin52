/* $Id: CheckBox.js,v 1.2 2008/06/02 13:40:19 huangcb Exp $ */
/*
Title: gp.page.CheckBox
Description: 
������;���ڴ����ǻ��֮���ֵ��;
Company: ��������
Date:2004/08/24
Author:zhangcheng
History:
����		        �޸���		�޸���������
20040930    zhangcheng created
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function CheckBox(sid){
  //1.���� =function();
  this.oSuper= new TextBox(sid);
  
  //----------------------------------------------------------------------
  //��չ����;
  //----------------------------------------------------------------------
  this.oSuper.extend= function(){
    //2.���������� =function();
    this.CLASSNAME= "gp.page.CheckBox";
    
    //3.���������� =function();
    this.sName= this.CLASSNAME;  //��������.
    this.oOptionGroup=null;
    //4.�¼������� =function();
    
    //----------------------------------------------------------------------
    //5.������ =function();
    //----------------------------------------------------------------------
    //public; ��ʼ��.
    //����:boolean����,�Ƿ�������������,optional
    //����ֵ:�ɹ�: true, ʧ��: false;
    this.init_TextBox= this.init;
    this.init= function(tIsFinalClass){
      if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
      this.init_TextBox(false);
      this.oOptionGroup=this.oInputBox.nextSibling;//ʵ������һ��span�ڲ�������һЩinput type=option�Ŀؼ�
       if(this.mpValueSet.getAllKeys().length>0)this.loadValueSet();
      if (tIsFinalClass) this.addEventAnswer();  //�����¼���Ӧ;�����⴫��ͨ���¼�;
      this.tHasInit= true;
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; ���������Ĵ�С.
    //����ֵ:�ɹ�: true, ʧ��: false;
    this.resize= function(){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "resize");
      return true;
    }//:~
    
      //----------------------------------------------------------------------
    //public;
    //����ֵ:void
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
    //public; ���ɹ�����HTML����.
    //����ֵ:�ɹ�: true, ʧ��: false;
    this.make_TextBox=this.init;
    this.make= function(){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
      this.make_TextBox(false);
      this.oOuterPanel.appendChild(this.createOptionGroup());
      return true;
    }//:~

 //----------------------------------------------------------------------
    //private; ����Select �ڵ�.
    //����ֵ:�ɹ���Input �ڵ��HTML�ַ���;ʧ�ܣ�null
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
    //private; ����Select �ڵ�.
    //����ֵ:�ɹ���Input �ڵ��HTML�ַ���;ʧ�ܣ�null
    this.createOptionGroup= function(){
     var result=document.createElement("span");
      result.id=this.DOMID_OPTION_GROUP;
      result.className=this.STYLE_OPTION_GROUP;
      return result;
    }//:~
        
    //----------------------------------------------------------------------
    //public; ����ֵ.
    //����:�ַ�������	
    //����ֵ:void;
    this.setValue= function(sValue){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
	//TODO
      var vaArg=new Array(this.sFieldName,sValue);
      this.fireEvent("OnChange",vaArg);	  
      
      return;
    }//:~
    //----------------------------------------------------------------------
    //public; ��ȡֵ.
    //����ֵ:�ɹ�: ֵ, ʧ��: null;
    this.getValue= function(){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
      
      return null;
    }//:~
    //----------------------------------------------------------------------
    //public; �����������¼������.
    //����ֵ:void;
    this.setAllowInput= function(tAllowInput){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
      return;
    }//:~
    //----------------------------------------------------------------------
    //public; ����ֻ������.
    //����ֵ: void;
    this.setReadOnly= function(tIsReadOnly){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
      
      return;
    }//:~
    //----------------------------------------------------------------------
  
  
    //----------------------------------------------------------------------
    //6.�¼���Ӧ�� =function();
    //----------------------------------------------------------------------
    //private; �����¼���Ӧ;
    //����ֵ: �ɹ�: true, ʧ��: false;
    this.addEventAnswer_TextBox= this.addEventAnswer;
    this.addEventAnswer= function(){
      //���ó���������¼���Ӧ�ķ���;
      this.addEventAnswer_TextBox();
  
      //----------------------------------------------------------------------
      //�����¼���Ӧ;�����⴫��ͨ���¼�;
      //----------------------------------------------------------------------
      //----------------------------------------------------------------------
      
      return true;
    }//:~
  }
  //----------------------------------------------------------------------

  //----------------------------------------------------------------------
  //9.���� =function();
  //----------------------------------------------------------------------
  this.oSuper.extend();
  this.release = function(){};
  return this.oSuper; 
}
//----------------------------------------------------------------------



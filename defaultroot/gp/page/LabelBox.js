/* $Id: LabelBox.js,v 1.1 2008/02/20 11:42:02 liuxiaoyong Exp $ */
/*
Title: gp.page.LabelBox
Description: 
��ǩ����;���ڱ�ǩ����ʾ;
Company: ��������
Author:$Id
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function LabelBox(){
  //1.���� =function();
  this.oSuper= new TextBox();
  
  //----------------------------------------------------------------------
  //��չ����;
  //----------------------------------------------------------------------
  this.oSuper.extend= function(){
    //2.���������� =function();
    this.CLASSNAME= "gp.page.LabelBox";
    
    //3.���������� =function();
    this.sName= this.CLASSNAME;  //��������.
  
    this.tAllowInput= false;  //private; �Ƿ��������¼��;
    this.tIsReadOnly= true; //private; �Ƿ�ֻ��;
    
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
      
      //todo: ����.
      this.init_TextBox(false);
      
      if (tIsFinalClass) this.addEventAnswer();  //�����¼���Ӧ;�����⴫��ͨ���¼�;
      this.tHasInit= true;
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; ���������Ĵ�С.
    //����ֵ:�ɹ�: true, ʧ��: false;
    this.resize= function(){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "resize");
      
      //todo: ����.
      
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; ���ɹ�����HTML����.
    //����:����Object,ʢ��TextBox�ؼ�������.����Div,TD,SPAN�ȵ� 
    //����ֵ:�ɹ�: true, ʧ��: false;
    this.make= function(oContainer){
      
      //todo: ����.
      
      return true;
    }//:~
    //----------------------------------------------------------------------
    //public; ����ֵ.
    //����ֵ:void;
    this.setValue= function(sValue){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
      
      //todo: ����.
      //���� OnChange �¼�;
      
      return;
    }//:~
    //----------------------------------------------------------------------
    //public; ��ȡֵ.
    //����ֵ:�ɹ�: ֵ, ʧ��: null;
    this.getValue= function(){
      if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "Resize");
      
      //todo: ����.
      
      return null;
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
      //private; ����������.
      //����ֵ:�ɹ�: true, ʧ��: false;
      this.oOuterPanel.onfocus= function(){
        
        //todo: ����.
        //����� this -> event.srcElement;
        //�� this �л�ȡ oOwner ����;
        
        return true;
      }//:~
      //----------------------------------------------------------------------
      //private; ����������.
      //����ֵ:�ɹ�: true, ʧ��: false;
      this.oOuterPanel.onblur= function(){
        
        //todo: ����.
        //����� this -> event.srcElement;
        //�� this �л�ȡ oOwner ����;
        
        return true;
      }//:~
      //----------------------------------------------------------------------
      
      return true;
    }//:~
  }
  //----------------------------------------------------------------------


  //----------------------------------------------------------------------
  //9.���� =function();
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



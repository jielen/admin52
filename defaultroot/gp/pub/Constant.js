/* $Id: Constant.js,v 1.1 2008/02/20 11:42:04 liuxiaoyong Exp $ */
/*
Title: gp.pub.Constant
Description: �ṩ ����������
Company: ��������
Author:leidh
*/

//----------------------------------------------------------------------
/*����ȫ��ʵ������ȫ�ֵ���*/
var Const= new Constant();

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function Constant(){
  //1.���� =function();
  
  
  //2.���������� =function();
  this.CLASSNAME= "gp.pub.Constant";

  this.EDIT_BOX_TEXTBOX= "TextBox";
  this.EDIT_BOX_TEXTAREABOX= "TextAreaBox";
  this.EDIT_BOX_PASSWORDBOX= "PassWordBox";
  this.EDIT_BOX_NUMERICBOX= "NumericBox";
  this.EDIT_BOX_DATEBOX= "DateBox";
  this.EDIT_BOX_DATETIMEBOX= "DatetimeBox";
  this.EDIT_BOX_COMBOBOX= "ComboBox";
  this.EDIT_BOX_FOREIGNBOX= "ForeignBox";
  this.EDIT_BOX_IMAGEBOX= "ImageBox";
  this.EDIT_BOX_LABELBOX= "LabelBox";
  this.EDIT_BOX_FILEBOX= "FileBox";
  
  this.RE_SIGN_SBC_0= /��/gi;
  this.RE_SIGN_SBC_1= /��/gi;
  this.RE_SIGN_SBC_2= /��/gi;
  this.RE_SIGN_SBC_3= /��/gi;
  this.RE_SIGN_SBC_4= /��/gi;
  this.RE_SIGN_SBC_5= /��/gi;
  this.RE_SIGN_SBC_6= /��/gi;
  this.RE_SIGN_SBC_7= /��/gi;
  this.RE_SIGN_SBC_8= /��/gi;
  this.RE_SIGN_SBC_9= /��/gi;
  this.RE_SIGN_SBC_SUB= /��/gi;
  this.RE_SIGN_SBC_BIAS= /��/gi;
  this.RE_SIGN_SBC_FULLSTOP= /��/gi;
  this.RE_SIGN_SBC_COMMA= /��/gi;
  this.RE_SIGN_COMMA= /,/gi;
  this.RE_SIGN_DOT= /./gi;
  this.RE_SIGN_ASTERISK= /\*/gi;
  this.RE_SIGN_JAVA_PATH= /\//gi;
  this.RE_SIGN_DOS_PATH= /\\/gi;

  this.RE_NOT_NUMERIC= /[^\d\.\-]/gi;

	//�ж��Ƿ�Ϊ���ڵ�������ʽ.
	this.DATE_EXPRESSION= /\b((10|90)\d{2})[\-\/\.](1[0-2]|0?[1-9])[\-\/\.](0?[1-9]|[12][0-9]|3[01])$/;
	
  this.DEFAULT_PAGE_SIZE= 100;

  //��������;
  this.BACK_START_OPACITY= 0;
  this.BACK_FINISH_OPACITY= 20;
  this.BACK_STYLE= 1;
  this.BACK_COLOR= "blue";
}
//----------------------------------------------------------------------



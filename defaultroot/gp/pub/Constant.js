/* $Id: Constant.js,v 1.1 2008/02/20 11:42:04 liuxiaoyong Exp $ */
/*
Title: gp.pub.Constant
Description: 提供 公共常量。
Company: 用友政务
Author:leidh
*/

//----------------------------------------------------------------------
/*构建全局实例，供全局调用*/
var Const= new Constant();

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function Constant(){
  //1.超类 =function();
  
  
  //2.常量声明区 =function();
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
  
  this.RE_SIGN_SBC_0= /０/gi;
  this.RE_SIGN_SBC_1= /１/gi;
  this.RE_SIGN_SBC_2= /２/gi;
  this.RE_SIGN_SBC_3= /３/gi;
  this.RE_SIGN_SBC_4= /４/gi;
  this.RE_SIGN_SBC_5= /５/gi;
  this.RE_SIGN_SBC_6= /６/gi;
  this.RE_SIGN_SBC_7= /７/gi;
  this.RE_SIGN_SBC_8= /８/gi;
  this.RE_SIGN_SBC_9= /９/gi;
  this.RE_SIGN_SBC_SUB= /－/gi;
  this.RE_SIGN_SBC_BIAS= /／/gi;
  this.RE_SIGN_SBC_FULLSTOP= /。/gi;
  this.RE_SIGN_SBC_COMMA= /，/gi;
  this.RE_SIGN_COMMA= /,/gi;
  this.RE_SIGN_DOT= /./gi;
  this.RE_SIGN_ASTERISK= /\*/gi;
  this.RE_SIGN_JAVA_PATH= /\//gi;
  this.RE_SIGN_DOS_PATH= /\\/gi;

  this.RE_NOT_NUMERIC= /[^\d\.\-]/gi;

	//判断是否为日期的正则表达式.
	this.DATE_EXPRESSION= /\b((10|90)\d{2})[\-\/\.](1[0-2]|0?[1-9])[\-\/\.](0?[1-9]|[12][0-9]|3[01])$/;
	
  this.DEFAULT_PAGE_SIZE= 100;

  //背景参数;
  this.BACK_START_OPACITY= 0;
  this.BACK_FINISH_OPACITY= 20;
  this.BACK_STYLE= 1;
  this.BACK_COLOR= "blue";
}
//----------------------------------------------------------------------



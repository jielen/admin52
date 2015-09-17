/* $Id: ImageBox.js,v 1.5 2008/06/16 02:56:16 hemg Exp $ */
/*
Title: gp.page.ImageBox
Description:
图像框类;用于图像的显示及上载图像;
Company: 用友政务
Author:$Id
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数;
function ImageBox(sid){
  //1.超类 =function();
  FileBox.call(this, sid);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.ImageBox";

  this.ZOOM_TYPE_ORIGINAL= "original";
  this.ZOOM_TYPE_SCALE_BY_WIDTH= "scalebywidth";
  this.ZOOM_TYPE_SCALE_BY_HEIGHT= "scalebyheight";
  this.ZOOM_TYPE_FIXED_SIZE= "fixedsize";

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部对象;
  
  this.oImagePanel= null;
  this.oImage= null;

  this.tHasInit= false;    //对象是否被始化的标志;
  this.iSpacingWithStretch= 4; //private;
  this.tResizeFromEvent= false;//private;

  //4.事件声明区 =function();

  //5.方法声明区 =function();
  //public;
  this.init= ImageBox_init;
  this.resize= ImageBox_resize;
  this.setFileId= ImageBox_setFileId;
  this.setValue= ImageBox_setValue;
  //以上已完成文档;

  this.setStretch= ImageBox_setStretch;
  this.isStretch= ImageBox_isStretch;
  this.setBoxBorderVisibleWidthImg= ImageBox_setBoxBorderVisibleWidthImg;
  this.isBoxBorderVisibleWidthImg= ImageBox_isBoxBorderVisibleWidthImg;
  this.setZoomType= ImageBox_setZoomType;
  this.getZoomType= ImageBox_getZoomType;
  this.getImgWidth= ImageBox_getImgWidth;
  this.getImgHeight= ImageBox_getImgHeight;
  this.setImgWidth= ImageBox_setImgWidth;
  this.setImgHeight= ImageBox_setImgHeight;
  this.getMaxWidth= ImageBox_getMaxWidth;
  this.getMaxHeight= ImageBox_getMaxHeight;
  this.setMaxWidth= ImageBox_setMaxWidth;
  this.setMaxHeight= ImageBox_setMaxHeight;
  this.getImgBorderStyle= ImageBox_getImgBorderStyle;
  this.getImgBorderWidth= ImageBox_getImgBorderWidth;
  this.getImgBorderColor= ImageBox_getImgBorderColor;
  this.isImgVisible= ImageBox_isImgVisible;

  //private;
  this.resizeButton= ImageBox_resizeButton;
  this.make= ImageBox_make;
  this.initMaxSize= ImageBox_initMaxSize;
  
  this.release = ImageBox_release;
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 生成构件的HTML对象.
//返回值: true/false;
function ImageBox_make(){
  //debugger;
  if (FileBox_make.call(this)== false) return false;
  this.oImagePanel= this.oOuterPanel.all("FileBoxImagePanel");
  this.oImage= this.oImagePanel.all("imageInput");
  this.oImagePanel.oOwner= this;
  this.oImage.oOwner= this;
  this.oImage.onreadystatechange= ImageBox_oImage_onreadystatechange;
  return true;
}
//----------------------------------------------------------------------
//public; 初始化.
//返回值:成功: true, 失败: false;
function ImageBox_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (FileBox_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//private;
function ImageBox_initMaxSize(){
  if (this.oRect.isWidthPercent()){
    if (this.getMaxWidth()< this.oImagePanel.style.width){
      this.setMaxWidth(this.oImagePanel.style.width);
    }
  }else{
    if (this.getMaxWidth()< this.oRect.iWidth){
      this.setMaxWidth(this.oRect.iWidth);
    }
  }
  if (this.oRect.isHeightPercent()){
    if (this.getMaxHeight()< this.oImagePanel.style.height){
      this.setMaxHeight(this.oImagePanel.style.height);
    }
  }else{
    if (this.getMaxHeight()< this.oRect.iHeight){
      this.setMaxHeight(this.oRect.iHeight);
    }
  }
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//返回值: 成功: true, 失败: false;
function ImageBox_resize(){
  //alert("ImageBox_resize");
  //if (FileBox_resize.call(this)== false) return false;
  //if (this.tIsResizing) return;
  //debugger;
  this.tIsResizing= true;
  this.bindResizeToOuterPanel(false);
  this.initMaxSize();
  
  if (this.isImgVisible()){
    this.oImage.style.width= "";
    this.oImage.style.height= "";
    if (this.getZoomType()== this.ZOOM_TYPE_ORIGINAL){
    }else if (this.getZoomType()== this.ZOOM_TYPE_SCALE_BY_WIDTH){
      var viHeight= (this.oImage.offsetHeight/ this.oImage.offsetWidth)* this.getImgWidth();
      this.oImage.style.width= this.getImgWidth();
      this.oImage.style.height= viHeight;
    }else if (this.getZoomType()== this.ZOOM_TYPE_SCALE_BY_HEIGHT){
      var viWidth= (this.oImage.offsetWidth/ this.oImage.offsetHeight)* this.getImgHeight();
      this.oImage.style.width= viWidth;
      this.oImage.style.height= this.getImgHeight();
    }else if (this.getZoomType()== this.ZOOM_TYPE_FIXED_SIZE){
      this.oImage.style.width= this.getImgWidth();
      this.oImage.style.height= this.getImgHeight();
    }
  
    //this.oImagePanel.style.width= this.oImage.offsetWidth+ this.getImgBorderWidth()* 2;
    //this.oImagePanel.style.height= this.oImage.offsetHeight+ this.getImgBorderWidth()* 2;
  
    if (this.isStretch()){
      if (this.oImagePanel.offsetWidth> this.getMaxWidth()){
        this.oImagePanel.style.width= this.getMaxWidth();
      }else{
        this.oImagePanel.style.width= this.oImagePanel.offsetWidth;
      }
      if (this.oImagePanel.offsetHeight> this.getMaxHeight()){
        this.oImagePanel.style.height= this.getMaxHeight();
      }else{
        this.oImagePanel.style.height= this.oImagePanel.offsetHeight+ this.oActionBtnPanel.offsetHeight+ this.iSpacingWithStretch;
      }
    }
  
    if (this.oImagePanel.offsetWidth> this.oOuterPanel.offsetWidth){
      this.oImagePanel.style.width= this.oOuterPanel.offsetWidth;
    }
    var viImgPanelMaxHeight= Math.abs(this.oOuterPanel.clientHeight- this.oActionBtnPanel.offsetHeight- this.iSpacingWithStretch);
    if (this.oImagePanel.offsetHeight> viImgPanelMaxHeight){
      this.oImagePanel.style.height= viImgPanelMaxHeight;
    }
  }

  //this.resizeButton();
  this.tIsResizing= false;
  setTimeout(this.oOuterPanel.id+ ".oOwner.bindResizeToOuterPanel(true);", 50);
  return true;
}
//----------------------------------------------------------------------
//private; 调整button及blobid位置.
//返回值: 成功: true, 失败: false;
function ImageBox_resizeButton(){
  this.oActionBtnPanel.style.width= 68;
  var viInputBoxWidth= this.oOuterPanel.clientWidth- this.oActionBtnPanel.offsetWidth- 1;
  this.oInputBox.style.left= 0;
  this.oInputBox.style.width= (viInputBoxWidth> 0)? viInputBoxWidth: 0;
  this.oInputBox.style.height= this.oAttachButton.offsetHeight;
  if (this.isImgVisible()){
    this.oInputBox.style.top= Math.abs(this.oOuterPanel.clientHeight- this.oActionBtnPanel.offsetHeight);
    if (this.isBoxBorderVisibleWidthImg()== false){
      if (this.oInputBox.originalborderwidth== null){
        this.oInputBox.originalborderwidth= this.oInputBox.currentStyle.borderWidth;
      }
      this.oInputBox.style.borderWidth= "0px";
    }
  }else{
    this.oInputBox.style.top= Math.abs(this.oOuterPanel.clientHeight- this.oActionBtnPanel.offsetHeight)/2;
    if (this.isBoxBorderVisibleWidthImg()== false){
      if (this.oInputBox.originalborderwidth!= null){
        this.oInputBox.style.borderWidth= this.oInputBox.originalborderwidth;
      }
    }
  }
  
  this.oActionBtnPanel.style.left= this.oInputBox.offsetWidth+ 1;
  this.oActionBtnPanel.style.top= this.oInputBox.offsetTop;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function ImageBox_setValue(sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setValue");
  FileBox_setValue.call(this, sValue);
  return;
}
//----------------------------------------------------------------------
//public; 设置值.
//返回值:void;
function ImageBox_setFileId(sValue){
  //alert("ImageBox_setFileId");
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setFileId");
  FileBox_setFileId.call(this, sValue);
  this.sFileId= PF.trim(sValue);
  if (PF.isEmpty(sValue)){
    this.oImagePanel.style.display = "none";
    this.resize();
  }else{
    this.oImagePanel.style.display = "";
  }
  this.oImage.src= "fileDownload.action?fileid=" + sValue;//"Proxy?function=ReadFile4&fileid="+sValue;
  return;
}
//----------------------------------------------------------------------
function ImageBox_isImgVisible(){
  return (this.oImagePanel.style.display== "none")?false:true;
}
//----------------------------------------------------------------------
//public; 
//返回值:void;
function ImageBox_setStretch(tIsStretch){
  this.oOuterPanel.isstretch= PF.parseBool(tIsStretch);
}
//----------------------------------------------------------------------
//public; 
//返回值:void;
function ImageBox_isStretch(){
  return PF.parseBool(this.oOuterPanel.isstretch);
}
//----------------------------------------------------------------------
//public; 
//返回值:void;
function ImageBox_setBoxBorderVisibleWidthImg(tIsBoxBorderVisibleWidthImg){
  this.oOuterPanel.isboxbordervisiblewithimg= PF.parseBool(tIsBoxBorderVisibleWidthImg);
}
//----------------------------------------------------------------------
//public; 
//返回值:void;
function ImageBox_isBoxBorderVisibleWidthImg(){
  return PF.parseBool(this.oOuterPanel.isboxbordervisiblewithimg);
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_setZoomType(sZoomType){
  this.oOuterPanel.zoomtype= sZoomType;
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getZoomType(){
  return this.oOuterPanel.zoomtype;
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getImgWidth(){
  return PF.parseInt(this.oOuterPanel.imgwidth);
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_setImgWidth(value){
  return this.oOuterPanel.imgwidth= value;
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getImgHeight(){
  return PF.parseInt(this.oOuterPanel.imgheight);
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_setImgHeight(value){
  return this.oOuterPanel.imgheight= value;
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getMaxWidth(){
  return PF.parseInt(this.oOuterPanel.maxwidth);
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_setMaxWidth(value){
  return this.oOuterPanel.maxwidth= value;
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getMaxHeight(){
  return PF.parseInt(this.oOuterPanel.maxheight);
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_setMaxHeight(value){
  return this.oOuterPanel.maxheight= value;
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getImgBorderStyle(){
  return this.oOuterPanel.imgborderstyle;
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getImgBorderWidth(){
  return PF.parseInt(this.oOuterPanel.imgborderwidth);
}
//----------------------------------------------------------------------
//public;
//返回值:void;
function ImageBox_getImgBorderColor(){
  return this.oOuterPanel.imgbordercolor;
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//9.事件响应区 =function();
//----------------------------------------------------------------------
//private;
//return: void;
function ImageBox_oImage_onreadystatechange(){
  if (event.srcElement.readyState!="complete") return;
  var voBox= this.oOwner;
  if (voBox.isImgVisible()== false) return;
  voBox.resize();
}
//----------------------------------------------------------------------

function ImageBox_release() {
	var imagePanel = this.oImagePanel;
	if (imagePanel != null) {
		imagePanel.oOwner = null;
	}
	var img = this.oImage;
	if (img != null) {
		img.oOwner = null;
		img.onreadystatechange = null;
	}
	FileBox_release.call(this);
}


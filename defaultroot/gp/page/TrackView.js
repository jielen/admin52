/* $Id: TrackView.js,v 1.1 2008/02/20 11:42:03 liuxiaoyong Exp $ */
/*
Title: gp.page.TrackView
Description: ����ͼ;
Company: ��������
Date: 20060710;
Author: leidh;
*/

//----------------------------------------------------------------------
//���������Ҳ����Ĺ��캯����
function TrackView(){
  //1.���� =function();
  Base.call(this);

  //2.���������� =function();
  this.CLASSNAME= "gp.page.TrackView";

  //3.���������� =function();
  this.oOuterObj= null;        //�ⲿ����;

  this.oOuterPanel= null; //private; �ⲿ���,������ TrackView �Ļ���ƽ̨��ʵ������һ��Div����
  this.oBaseFrameTable= null; //private;
  this.oNodeIdMap= null;  //private;
  this.oFlowIdMap= null;  //private;
  this.oNodeFrameIdMap= null; //private;

  //4.�¼������� =function();
  this.OnNodeClick= "OnNodeClick";          //����: oSender, oNode;
  this.OnNodeDblClick= "OnNodeDblClick";    //����: oSender, oNode;
  this.OnFlowClick= "OnFlowClick";          //����: oSender, oFlow;
  this.OnFlowDblClick= "OnFlowDblClick";    //����: oSender, oFlow;

  //5.���������� =function();
  //public;
  this.init= TrackView_init;
  this.make= TrackView_make;
  this.resize= TrackView_resize;
  this.setClass= TrackView_setClass;
  this.setRect= TrackView_setRect;
  this.setStyle= TrackView_setStyle;
  this.setStyleItem= TrackView_setStyleItem;
  this.getNode= TrackView_getNode;
  this.getFlow= TrackView_getFlow;
  this.getNodeCell= TrackView_getNodeCell;
  this.getFlowCell= TrackView_getFlowCell;
  this.getRootId= TrackView_getRootId;
  this.getValue= TrackView_getValue;
  this.setValue= TrackView_setValue;

  //private;
  this.makeIdMapFromSpan= TrackView_makeIdMapFromSpan;
  this.drawAllArrow= TrackView_drawAllArrow;
  this.drawArrow= TrackView_drawArrow;
  
}
//----------------------------------------------------------------------
//6.������ =function();
//----------------------------------------------------------------------
//public; ���ɹ�����HTML����.
//����ֵ: true/false;
function TrackView_make(sId){
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;
  this.oOuterPanel.oOwner= this;
  
  this.oBaseFrameTable= this.oOuterPanel.all("InnerBaseFrameTable");
  this.oBaseFrameTable.oOwner= this;
  
  this.oNodeFrameIdMap= this.makeIdMapFromSpan(this.oOuterPanel.all("FlowNodeFrameIdsSpan"));
  this.oNodeIdMap= this.makeIdMapFromSpan(this.oOuterPanel.all("NodeIdsSpan"), "node");
  this.oFlowIdMap= this.makeIdMapFromSpan(this.oOuterPanel.all("FlowIdsSpan"), "flow");
  
  this.setRectWithOuterPanel();
  this.oDefRect.iLeft= this.oRect.iLeft;
  this.oDefRect.iTop= this.oRect.iTop;
  this.oDefRect.iWidth= this.oRect.iWidth;
  this.oDefRect.iHeight= this.oRect.iHeight;
  return true;
}
//----------------------------------------------------------------------
//public; ��ʼ��.
//����ֵ:�ɹ�: true, ʧ��: false;
function TrackView_init(){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;
  if (tIsFinalClass) this.setInitMark();
  this.drawAllArrow();
  return true;
}
//----------------------------------------------------------------------
//public; ���������Ĵ�С.
//����ֵ: �ɹ�: true, ʧ��: false;
function TrackView_resize(){
  if (this.tHasInit== false) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= true;
  this.oOuterPanel.style.width= this.oBaseFrameTable.offsetWidth+ 6;
  this.oOuterPanel.style.height= this.oBaseFrameTable.offsetHeight+ 6;
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//private; 
//return: void;
function TrackView_drawAllArrow(){
  //alert("TrackView_drawAllArrow();");
  var vaoFlow= this.oFlowIdMap.getAllItem();
  for (var i= 0; i< vaoFlow.length; i++){
    this.drawArrow(vaoFlow[i]);
  }
}
//----------------------------------------------------------------------
//private; 
//return: void;
function TrackView_drawArrow(oFlow){
  //alert("TrackView_drawArrow();");
  var voNodeFrame= PF.getParentObj(oFlow, "TABLE");
  var voFlowCell= this.getFlowCell(this.getValue(oFlow, this.oOuterPanel.flowidfield));
  var voSourNodeCell= this.getNodeCell(this.getValue(oFlow, this.oOuterPanel.flowsournodeidfield));
  var voDestNodeCell= this.getNodeCell(this.getValue(oFlow, this.oOuterPanel.flowdestnodeidfield));
  var voOuterArrowCell= voNodeFrame.all(voNodeFrame.id+ "_ArrowCell_O");
  var voMidArrowCell= voNodeFrame.all(voNodeFrame.id+ "_ArrowCell_M");
  
  var voSourRect= PF.getAbsRect(voSourNodeCell, this.getOuterPanel());
  var voDestRect= PF.getAbsRect(voDestNodeCell, this.getOuterPanel());
  var voFlowRect= PF.getAbsRect(voFlowCell, this.getOuterPanel());
  var voOuterArrowRect= PF.getAbsRect(voOuterArrowCell, this.getOuterPanel());
  var voMidArrowRect= PF.getAbsRect(voMidArrowCell, this.getOuterPanel());
  
  var voLine1= this.oOuterPanel.all(oFlow.id+ "_FlowLine1");
  var voLine2= this.oOuterPanel.all(oFlow.id+ "_FlowLine2");
  var voArrow= this.oOuterPanel.all(oFlow.id+ "_FlowArrow");
  
  //�������;
  var x1= voSourRect.iLeft+ voSourRect.iWidth;
  var y1= voSourRect.iTop+ voSourRect.iHeight/2;
  var x2= voFlowRect.iLeft;
  var y2= voFlowRect.iTop+ voFlowRect.iHeight;
  var x3= voFlowRect.iLeft+ voFlowRect.iWidth;
  var y3= y2;
  var x4= voDestRect.iLeft;
  var y4= voDestRect.iTop+ voDestRect.iHeight/2;
  
  //�߶�ƽ��;
  if (y2>= voSourRect.iTop && y2<= voSourRect.iTop+ voSourRect.iHeight){
    y1= y2;
  }
  if (y2>= voDestRect.iTop && y2<= voDestRect.iTop+ voDestRect.iHeight){
    y4= y2;
  }

  if (oFlow.U_FlowWay== "back"){
    voLine1.from= x4+ ","+ y4;
    voLine1.to= x3+ ","+ y3;
    voLine2.from= voLine1.to;
    voLine2.to= x2+ ","+ y2;
    voArrow.from= voLine2.to;
    voArrow.to= x1+ ","+ y1;
  }else{
    voLine1.from= x1+ ","+ y1;
    voLine1.to= x2+ ","+ y2;
    voLine2.from= voLine1.to;
    voLine2.to= x3+ ","+ y3;
    voArrow.from= voLine2.to;
    voArrow.to= x4+ ","+ y4;
  }
}
//----------------------------------------------------------------------
//public; 
//return: root node id / null;
function TrackView_getRootId(){
  return this.oOuterPanel.rootid;
}
//----------------------------------------------------------------------
//public; 
//return: node <table> / null;
function TrackView_getNode(nodeId){
  return this.oOuterPanel.all("node_"+ nodeId);
}
//----------------------------------------------------------------------
//public; 
//return: node <table> / null;
function TrackView_getNodeCell(nodeId){
  var voNode= this.getNode(nodeId);
  if (voNode== null) return null;
  return voNode.rows[1].firstChild;
}
//----------------------------------------------------------------------
//public; 
//return: flow node <table> / null;
function TrackView_getFlow(flowId){
  return this.oOuterPanel.all("flow_"+ flowId);
}
//----------------------------------------------------------------------
//public; 
//return: flow <table> / null;
function TrackView_getFlowCell(flowId){
  var voFlow= this.getFlow(flowId);
  if (voFlow== null) return null;
  return voFlow.rows[0].firstChild;
}
//----------------------------------------------------------------------
//public; ���ö����С.
//����ֵ: void;
function TrackView_setRect(oRect){
  this.oRect.iLeft= oRect.iLeft;
  this.oRect.iTop= oRect.iTop;
  this.oRect.iWidth= oRect.iWidth;
  this.oRect.iHeight= oRect.iHeight;

  this.oDefRect.iLeft= oRect.iLeft;
  this.oDefRect.iTop= oRect.iTop;
  this.oDefRect.iWidth= oRect.iWidth;
  this.oDefRect.iHeight= oRect.iHeight;

  this.resize();
  return;
}
//----------------------------------------------------------------------
//private; �������,�Ա��������ؼ��ĵķ����ȷ��;
//����ֵ: void;
function TrackView_adjustStyle(){
  //alert(this.CLASSNAME+ ".adjustStyle();");
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "adjustStyle");

  this.oOuterPanel.style.overflow= "hidden";

  if (isNaN(parseInt(this.oOuterPanel.currentStyle.width))){
    this.oOuterPanel.style.width= this.oDefRect.iWidth;
  }else{
    //this.setAutoWidth(this.AUTO_WIDTH_NONE); //ȡ���Զ����;
  }
  if (isNaN(parseInt(this.oOuterPanel.currentStyle.height))){
    this.oOuterPanel.style.height= this.oDefRect.iHeight;
  }

  this.oRect.setLeft(this.oOuterPanel.currentStyle.left);
  this.oRect.setTop(this.oOuterPanel.currentStyle.top);
  this.oRect.setWidth(this.oOuterPanel.offsetWidth);
  this.oRect.setHeight(this.oOuterPanel.offsetHeight);
  this.resize();
  return;
}
//----------------------------------------------------------------------
//public; ���÷��;
//����ֵ: void;
function TrackView_setStyle(sStyle){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; ���÷���е�ָ����Ŀ;
//param: sName ��д������Ϊ js ��д��,��: border-color,����д�� borderColor;
//����ֵ: void;
function TrackView_setStyleItem(sName, sValue){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setStyleItem");
  if (PF.isEmpty(sName)) return;
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; ���÷��;
//����ֵ: void;
function TrackView_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------
//private;
//return: Map / null;
function TrackView_makeIdMapFromSpan(oSpan, type){
  if (oSpan== null) return null;
  var voMap= new Map();
  for (var i= 0; i< oSpan.childNodes.length; i++){
    var vsId= oSpan.childNodes[i].field;
    var voObj= null;
    if (type== "flow"){
      voObj= this.getFlow(vsId);
      var voFlowCell= voObj.rows[0].firstChild;
      voFlowCell.style.cursor= "hand";
      voFlowCell.oOwner= this;
      voFlowCell.oOwnerFlow= voObj;
      voFlowCell.onclick= TrackView_Node_OnClick;
      voFlowCell.ondblclick= TrackView_Node_OnDblClick;
      voFlowCell.onmouseover= TrackView_Node_And_Flow_OnMouseOver;
      voFlowCell.onmouseout= TrackView_Node_And_Flow_OnMouseOut;
    }else if (type== "node"){
      voObj= this.getNode(vsId);
      var voFlowCell= voObj.rows[1].firstChild;
      voFlowCell.style.cursor= "hand";
      voFlowCell.oOwner= this;
      voFlowCell.oOwnerNode= voObj;
      voFlowCell.onclick= TrackView_Flow_OnClick;
      voFlowCell.ondblclick= TrackView_Flow_OnDblClick;
      voFlowCell.onmouseover= TrackView_Node_And_Flow_OnMouseOver;
      voFlowCell.onmouseout= TrackView_Node_And_Flow_OnMouseOut;
    }else{
      voObj= this.oOuterPanel.all(vsId);
    }
    voObj.oOwner= this;
    voMap.put(vsId, voObj);
  }
  return voMap;
}
//----------------------------------------------------------------------
//public;
//return: variant value / null;
function TrackView_getValue(oNode, sField){
  if (oNode== null) return null;
  if (sField== null) return null;
  return oNode.getAttribute("_"+ sField);
}
//----------------------------------------------------------------------
//public;
//return: void;
function TrackView_setValue(oNode, sField, sValue){
  if (oNode== null) return;
  if (sField== null) return;
  return oNode.setAttribute("_"+ sField, sValue);
}
//----------------------------------------------------------------------


//----------------------------------------------------------------------
//7.�¼���Ӧ�� =function();
//----------------------------------------------------------------------
//private;
function TrackView_Node_OnClick(){
  var voTV= this.oOwner;
  //�����¼�;
  if (PF.isExistMethodK(voTV.eventAnswer_OnNodeClick)){
    voTV.eventAnswer_OnNodeClick(voTV, this.oOwnerNode);
  }
  voTV.fireEvent(voTV.OnNodeClick, new Array(voTV, this.oOwnerNode));
}
//----------------------------------------------------------------------
//private;
function TrackView_Node_OnDblClick(){
  var voTV= this.oOwner;
  //�����¼�;
  if (PF.isExistMethodK(voTV.eventAnswer_OnNodeDblClick)){
    voTV.eventAnswer_OnNodeDblClick(voTV, this.oOwnerNode);
  }
  voTV.fireEvent(voTV.OnNodeDblClick, new Array(voTV, this.oOwnerNode));
}
//----------------------------------------------------------------------
//private;
function TrackView_Flow_OnClick(){
  var voTV= this.oOwner;
  //�����¼�;
  if (PF.isExistMethodK(voTV.eventAnswer_OnFlowClick)){
    voTV.eventAnswer_OnFlowClick(voTV, this.oOwnerFlow);
  }
  voTV.fireEvent(voTV.OnFlowClick, new Array(voTV, this.oOwnerFlow));
}
//----------------------------------------------------------------------
//private;
function TrackView_Flow_OnDblClick(){
  var voTV= this.oOwner;
  //�����¼�;
  if (PF.isExistMethodK(voTV.eventAnswer_OnFlowDblClick)){
    voTV.eventAnswer_OnFlowDblClick(voTV, this.oOwnerFlow);
  }
  voTV.fireEvent(voTV.OnFlowDblClick, new Array(voTV, this.oOwnerFlow));
}
//----------------------------------------------------------------------
//private;
function TrackView_Node_And_Flow_OnMouseOver(){
  var voTV= this.oOwner;
  this.style.backgroundColor= "yellow";
}
//----------------------------------------------------------------------
//private;
function TrackView_Node_And_Flow_OnMouseOut(){
  var voTV= this.oOwner;
  this.style.backgroundColor= "";
}
//----------------------------------------------------------------------





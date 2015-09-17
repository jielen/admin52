/* $Id: TreeView.js,v 1.4 2008/06/19 09:26:30 liuxiaoyong Exp $ */
/*
Title: gp.page.TreeView
Description: 树视图控件;使用此控件,请将数据先按增序排列;
Company: 用友政务
Date:
Author: leidh;
*/

//----------------------------------------------------------------------
//类的声明，也是类的构造函数；
function TreeView(){
  //1.超类 =function();
  Base.call(this);

  //2.常量声明区 =function();
  this.CLASSNAME= "gp.page.TreeView";

  this.IMG_TRANSPARENT= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/transparent_16x16.gif";
  this.IMG_RETRACT= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/retract_16x16.gif";
  this.IMG_COLLAPSE= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/collapse_16x16.gif";
  this.IMG_OPENED= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/folderopened_16x16.gif";
  this.IMG_CLOSED= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/folderclosed_16x16.gif";
  this.IMG_LEAF_NORMAL= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/leafdark_16x16.gif";
  this.IMG_LEAF_SELECT= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/leaflight_16x16.gif";
  this.IMG_MORE= PageX.localResPath + PageX.sRootPath + "/gp/image/ico/more_16x16.gif";

  this.KEY_PREFIX= "NodeCode_TB_";

  this.MAX_LEVEL= 100;
  this.PAGE_SIZE= 100;

  this.MAKE_TYPE_ALL= 0;
  this.MAKE_TYPE_LEVEL= 1;
  this.MAKE_TYPE_PAGINATION= 2;

  this.ATTR_HASADDED= "hasadded";  //private;

  //3.变量声明区 =function();
  this.sName= this.CLASSNAME;  //对象名称.
  this.oOuterObj= null;        //外部对象;

  this.oContainer= null;       //private;
  this.oOuterPanel= null;      //private;
  this.oInnerPanel= null;      //private;
  this.oTA= null;              //private;
  this.oNewPanel= null;        //private;
  this.oNewPanel2= null;       //private;

  this.oTableData= null;       //private;

  this.sSelImg= this.IMG_OPENED;
  this.sNormalImg= this.IMG_CLOSED;
  this.sLeafSelImg= this.IMG_LEAF_SELECT;
  this.sLeafNormalImg= this.IMG_LEAF_NORMAL;

  this.oRoot= null;
  this.sRootCode= "Root_"+ PF.getUID("_");
  this.sMoreCode= "More...";
  this.sMoreText= "more...";
  this.sMoreTip= "点击显示更多的内容";
  this.sMoreNodeId= "";

  this.oDefRect= new Rect(0, 0, 150, 200);    //private; 对象默认的大小;
  this.oRect= new Rect(0, 0, 150, 200);       //private; 对象的大小;

  this.oTipBar= null;        //public;
  this.oCurNode= null;       //private;

  this.tHasInit= false;      //对象是否被始化的标志;

  this.oRowHasAddedAttr= null; //private;

  //4.事件声明区 =function();
  this.OnInit= "OnInit";                    //参数: oSender;
  this.OnNodeClick= "OnNodeClick";          //参数: oSender, sCode, oEvent;
  this.OnNodeDblClick= "OnNodeDblClick";    //参数: oSender, sCode, oEvent;
  this.OnNodeSelected= "OnNodeSelected";    //参数: oSender, sCode, sOldCode;
  this.OnNodeChecked= "OnNodeChecked";      //参数: oSender, sCode, tIsCheck;
  this.OnBeforeNodeRetract= "OnBeforeNodeRetract";     //参数: oSender, sCode;
  this.OnAfterNodeRetract= "OnAfterNodeRetract";      //参数: oSender, sCode;
  this.OnBeforeNodeCollapse= "OnBeforeNodeCollapse";   //参数: oSender, sCode;
  this.OnAfterNodeCollapse= "OnAfterNodeCollapse";    //参数: oSender, sCode;

  //5.方法声明区 =function();
  //public;
  this.make= TreeView_make;
  this.makeNode= TreeView_makeNode;
  this.init= TreeView_init;
  this.resize= TreeView_resize;
  this.checkNode= TreeView_checkNode;
  this.checkChildren= TreeView_checkChildren;
  this.checkParent= TreeView_checkParent;
  this.collapse= TreeView_collapse;
  this.collapseLevel= TreeView_collapseLevel;
  this.retract= TreeView_retract;
  this.deleteNode= TreeView_deleteNode;
  this.getChildCodes= TreeView_getChildCodes;
  this.getCurNode= TreeView_getCurNode;
  this.setCurNode= TreeView_setCurNode;
  this.getNode= TreeView_getNode;
  this.getNodeName= TreeView_getNodeName;
  this.getNodeCode= TreeView_getNodeCode;
  this.getNodeMeta= TreeView_getNodeMeta;
  this.getNodeNormalImg= TreeView_getNodeNormalImg;
  this.getNodeSelImg= TreeView_getNodeSelImg;
  this.getNodeTip= TreeView_getNodeTip;
  this.getChildRows= TreeView_getChildRows;
  this.getParentRows= TreeView_getParentRows;
  this.getParentCode= TreeView_getParentCode;
  this.getParentCodes= TreeView_getParentCodes;
  this.getRoot= TreeView_getRoot;
  this.getRootCode= TreeView_getRootCode;
  this.hasChildNodes= TreeView_hasChildNodes;
  this.getFirstChild= TreeView_getFirstChild;
  
  this.insertChild= TreeView_insertChild;
  this.insertNode= TreeView_insertNode;
  
  this.isChecked= TreeView_isChecked;
  this.isCollapse= TreeView_isCollapse;
  this.isRoot= TreeView_isRoot;
  this.isExistNode= TreeView_isExistNode;
  this.isLeafNode= TreeView_isLeafNode;
  this.isRowAppeared= TreeView_isRowAppeared;
  this.setNodeName= TreeView_setNodeName;
  this.setNodeNormalImg= TreeView_setNodeNormalImg;
  this.setNodeSelImg= TreeView_setNodeSelImg;
  this.setNodeTip= TreeView_setNodeTip;

  this.setClass= TreeView_setClass;
  this.setStyle= TreeView_setStyle;
  this.setStyleItem= TreeView_setStyleItem;

  this.getData= TreeView_getData;
  this.getDataWithXml= TreeView_getDataWithXml;
  this.getDataK= TreeView_getDataK;
  this.getNodeRow= TreeView_getNodeRow;
  this.loadData= TreeView_loadData;

  this.getTableName= TreeView_getTableName;
  this.setTableName= TreeView_setTableName;
  this.getMakeType= TreeView_getMakeType;
  this.setMakeType= TreeView_setMakeType;
  this.getPageSize= TreeView_getPageSize;
  this.setPageSize= TreeView_setPageSize;
  this.getCodeField= TreeView_getCodeField;
  this.getNameField= TreeView_getNameField;
  this.getCheckField= TreeView_getCheckField;
  this.getPCodeField= TreeView_getPCodeField;
  this.getTipField= TreeView_getTipField;
  this.getSelImgField= TreeView_getSelImgField;
  this.getNormalImgField= TreeView_getNormalImgField;
  this.isUseLeafImg= TreeView_isUseLeafImg;
  this.isCodeAndName= TreeView_isCodeAndName;
  this.isRelaParent= TreeView_isRelaParent;
  this.setRelaParent= TreeView_setRelaParent;
  this.isRelaChildren= TreeView_isRelaChildren;
  this.setRelaChildren= TreeView_setRelaChildren;
  this.getTabIndex= TreeView_getTabIndex;
  this.setTabIndex= TreeView_setTabIndex;
  this.getInitLevel= TreeView_getInitLevel;
  this.isExistCheck= TreeView_isExistCheck;
  this.isUpdateData= TreeView_isUpdateData;
  this.setUpdateData= TreeView_setUpdateData;
  this.getCheckedValue= TreeView_getCheckedValue;
  this.getUncheckedValue= TreeView_getUncheckedValue;
  this.isAutoAppear= TreeView_isAutoAppear;
  this.setAutoAppear= TreeView_setAutoAppear;
  this.isReadOnly= TreeView_isReadOnly;
  this.setReadOnly= TreeView_setReadOnly;
  this.isValidNode= TreeView_isValidNode;
  this.insertChildToTree= TreeView_insertChildToTree;
  this.insertNodeToTree= TreeView_insertNodeToTree;
  this.deleteNodeFromTree= TreeView_deleteNodeFromTree;
  this.getNodeValue= TreeView_getNodeValue;
  this.isCollapseOnDblClick= TreeView_isCollapseOnDblClick;

  //private;
  this.makeNodeText= TreeView_makeNodeText;
  this.makeNodeTextOfRow= TreeView_makeNodeTextOfRow;
  this.makeNodeTextBegin= TreeView_makeNodeTextBegin;
  this.makeNodeTextEnd= TreeView_makeNodeTextEnd;
  this.makeNodeContainerTextBegin= TreeView_makeNodeContainerTextBegin;
  this.makeNodeContainerTextEnd= TreeView_makeNodeContainerTextEnd;
  this.makeNodeRow= TreeView_makeNodeRow;
  this.makeNodeName= TreeView_makeNodeName;
  this.parseNodeName= TreeView_parseNodeName;
  this.adjustStyle= TreeView_adjustStyle;
  this.rcNode= TreeView_rcNode;
  this.eventAnswer_OnClick= TreeView_eventAnswer_OnClick;
  this.eventAnswer_OnDblClick= TreeView_eventAnswer_OnDblClick;
  this.eventAnswer_OnMouseMove= TreeView_eventAnswer_OnMouseMove;
  this.eventAnswer_OnMouseOut= TreeView_eventAnswer_OnMouseOut;
  this.getNodeEventTD= TreeView_getNodeEventTD;
  this.makeMoreNode= TreeView_makeMoreNode;
  this.isMoreNode= TreeView_isMoreNode;
  this.showMore= TreeView_showMore;
  this.makeNewObjs= TreeView_makeNewObjs;
  this.showMore= TreeView_showMore;
  this.showMoreNodes= TreeView_showMoreNodes;
  this.getChildContainer= TreeView_getChildContainer;
  this.setRowValue= TreeView_setRowValue;
  this.getRowValue= TreeView_getRowValue;
  this.setNodeValue= TreeView_setNodeValue;
  this.getNodeNameSpan= TreeView_getNodeNameSpan;
  this.hasMoreChild= TreeView_hasMoreChild;
  this.addRowAddedAttr= TreeView_addRowAddedAttr;
  this.makeNodeTextOfRow_1= TreeView_makeNodeTextOfRow_1;
  this.makeNodeTextOfRow_2= TreeView_makeNodeTextOfRow_2;
  this.checkNodeK= TreeView_checkNodeK;
  this.createNodeOnNotFound= TreeView_createNodeOnNotFound;
  this.hasChildNodesForAppear= TreeView_hasChildNodesForAppear;
  this.getFirstChildForAppear= TreeView_getFirstChildForAppear;
  this.getNodeCheckBox= TreeView_getNodeCheckBox;
  this.getNodeImgBox= TreeView_getNodeImgBox;
  this.createNodeId= TreeView_createNodeId;
  this.convertCheckedValue= TreeView_convertCheckedValue;
  this.getCheckTDIndex= TreeView_getCheckTDIndex;
  this.getRCImgTDIndex= TreeView_getRCImgTDIndex;
  this.getOpenImgTDIndex= TreeView_getOpenImgTDIndex;
  this.getCapTDIndex= TreeView_getCapTDIndex;
  
  this.release = TreeView_release;
  this.disposeDataForRoot = TreeView_disposeDataForRoot;
  
}
//----------------------------------------------------------------------
//6.方法区 =function();
//----------------------------------------------------------------------
//public; 生成构件的HTML对象.
//返回值: true/false;
function TreeView_make(sId){
  //alert("TreeView_make();");
  if (sId== null || sId== "") return false;
  this.oOuterPanel= document.all(sId);
  if (this.oOuterPanel== null) return false;
  
  this.oInnerPanel= this.oOuterPanel.all("TreeView_InnerPanel");
  this.oOuterPanel.oOwner= this;
  this.oInnerPanel.oOwner= this;

  this.oTipBar= new Tipbar();
  this.oTipBar.make();
  this.oTipBar.init();

  this.setRectWithOuterPanel();
  return true;
}
//----------------------------------------------------------------------
//public; .
//返回值: true/false;
function TreeView_loadData(){
  //this.oOuterPanel.innerHTML= "";
  this.disposeDataForRoot();////对数据进行处理,权宜之计
  this.oInnerPanel.innerHTML= "";
  this.oTableData= DataTools.getTableData(this.getTableName());
  this.oCurNode= null;

  var vsRootSelImg= this.oOuterPanel.rootselimg;
  var vsRootNormalImg= this.oOuterPanel.rootnormalimg;
  if (vsRootSelImg== null || vsRootSelImg== "") vsRootSelImg= this.sSelImg;
  if (vsRootNormalImg== null || vsRootNormalImg== "") vsRootNormalImg= this.sNormalImg;

  var voBuf= new StringBuffer();
  voBuf.append(this.makeNodeContainerTextBegin());
  voBuf.append(this.makeNodeTextBegin(this.sRootCode, this.oOuterPanel.roottext, false, false, null, vsRootSelImg, vsRootNormalImg, false, true));
  var voRow= this.oTableData.selectSingleNode("rowset/row["+ this.getPCodeField()+ "='']");
  if (voRow!= null){
	  if ((this.getMakeType() & this.MAKE_TYPE_LEVEL)> 0){
	    voBuf.append(this.makeNodeContainerTextBegin());
	    voBuf.append(this.makeNodeText(null, this.getInitLevel()));
	    voBuf.append(this.makeNodeContainerTextEnd());
	  }else{
	    voBuf.append(this.makeNodeContainerTextBegin());
	    voBuf.append(this.makeNodeText());
	    voBuf.append(this.makeNodeContainerTextEnd());
	  }
  }
  voBuf.append(this.makeNodeTextEnd());
  voBuf.append(this.makeNodeContainerTextEnd());

  voBuf.append("<div id='NewDiv' style='position:absolute; left:-1000px; top:-1000px;'>\n");
  voBuf.append("</div>\n");
  voBuf.append("<div id='NewDiv2' style='position:absolute; left:-1000px; top:-1000px;'>\n");
  voBuf.append("</div>\n");
  //this.oOuterPanel.innerHTML= voBuf.toString();
  this.oInnerPanel.innerHTML= voBuf.toString();
  voBuf.clear();

  this.oTA= this.oOuterPanel.firstChild;
  this.oRoot= this.oOuterPanel.all(this.createNodeId(this.sRootCode));
  this.oNewPanel= this.oOuterPanel.all("NewDiv");
  this.oNewPanel2= this.oOuterPanel.all("NewDiv2");

  this.oTA.oOwner= this;
  this.oRoot.oOwner= this;

  var viInitLevel= this.getInitLevel();
  this.collapseLevel(viInitLevel);
  return;
}
//----------------------------------------------------------------------
//private; 从一个 table 的树的 HTML.
//return: 成功: 节点串, 失败: "";
function TreeView_makeMoreNode(sPCode){
  if (sPCode== "") sPCode= null;
  var vsMoreInfo= "";
  if (sPCode!= null) vsMoreInfo+= "morekey='"+ sPCode+ "'";
  var voBuf= new StringBuffer();
  voBuf.append(this.makeNodeTextBegin(this.sMoreCode, this.sMoreText, false, false, this.sMoreTip, this.IMG_MORE, this.IMG_MORE, false, false, vsMoreInfo));
  voBuf.append(this.makeNodeTextEnd());
  var vsRet= voBuf.toString();
  voBuf.clear();
  return vsRet;
}
//----------------------------------------------------------------------
//private; 根据父key,从一个子表中建立一棵树; table 的树的 HTML.
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeText(sPCode, iLevel){
  //alert("TreeView_makeNodeText();");
  if (sPCode== null) sPCode= "";
  if (iLevel<= 0) return "";
  if (iLevel== null) iLevel= this.MAX_LEVEL;
  if (this.oTableData== null) return "";

  //获取本表数据中的子节点行;
  //获取子表中的 PCode 与 sPCode 相同的所有的行;
  var vaoRow= null;
  if (this.getPCodeField()!= null && this.getPCodeField()!= ""){
    vaoRow= this.oTableData.selectNodes("rowset/row["+ this.getPCodeField()+ "= '"+ sPCode+ "' and (not(@"+ this.ATTR_HASADDED+ ") or @"+ this.ATTR_HASADDED+ "!='true')]");
  }else{
    vaoRow= this.oTableData.selectNodes("rowset/row[(not(@"+ this.ATTR_HASADDED+ ") or @"+ this.ATTR_HASADDED+ "!='true')]");
  }
  if (vaoRow== null || vaoRow.length== 0) return "";

  //生成结点HTML;
  var voBuf= new StringBuffer();
  var voRow= null;
  for (var i= 0, len= vaoRow.length; i< len; i++){
    voRow= vaoRow[i];
    voBuf.append(this.makeNodeTextOfRow(voRow, iLevel));
    if ((this.getMakeType() & this.MAKE_TYPE_PAGINATION)> 0
        && i>= this.getPageSize()- 1){
      voBuf.append(this.makeMoreNode(sPCode));
      break;
    }
  }
  //var vsRet= voBuf.toString();
  //voBuf.clear();
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 从一个 table 的树的 HTML.
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeTextOfRow(oRow, iLevel){
  if (oRow== null) return "";
  if (oRow.getAttribute(this.ATTR_HASADDED)== "true") return "";
  if (iLevel<= 0) return "";
  if (iLevel== null) iLevel= this.MAX_LEVEL;

  //加上已加入的标记;
  this.addRowAddedAttr(oRow);

  var vsSelImg= this.getRowValue(oRow, this.getSelImgField());
  var vsNormalImg= this.getRowValue(oRow, this.getNormalImgField());
  var vsCode= this.getRowValue(oRow, this.getCodeField());
  var vsName= this.getRowValue(oRow, this.getNameField());
  var vtIsCheck= false;
  if (this.isExistCheck()) vtIsCheck= PF.parseBool(this.getRowValue(oRow, this.getCheckField()));
  var vsTip= this.getRowValue(oRow, this.getTipField());

  //获取本表数据中的子节点行;
  var voRow= null;
  if (this.getPCodeField()!= null && this.getPCodeField()!= ""){
    voRow= this.oTableData.selectSingleNode("rowset/row["+ this.getPCodeField()+ " = '"+ vsCode+ "' and (not(@"+ this.ATTR_HASADDED+ ") or @"+ this.ATTR_HASADDED+ "!='true')]");
  }
  //本表中无子结点;
  var vsRet= "";
  if (voRow== null){
    vsRet= this.makeNodeTextOfRow_1(vsCode, vsName, vtIsCheck, vsTip, vsSelImg, vsNormalImg);
    //vsRet= this.makeNodeTextOfRow_1(vsCode, vsName, vsTip, vsSelImg, vsNormalImg);
  //本表中有子结点;
  }else{
    vsRet= this.makeNodeTextOfRow_2(vsCode, vsName, vtIsCheck, vsTip, vsSelImg, vsNormalImg, iLevel);
    //vsRet= this.makeNodeTextOfRow_2(vsCode, vsName, vsTip, vsSelImg, vsNormalImg, iLevel);
  }
  return vsRet;
}
//----------------------------------------------------------------------
//private; 给指定行加上已加入的标记;
//return: void;
function TreeView_addRowAddedAttr(oRow){
  if (oRow== null) return;
  if (this.oRowHasAddedAttr== null){
    this.oRowHasAddedAttr= this.oTableData.ownerDocument.createAttribute(this.ATTR_HASADDED);
    this.oRowHasAddedAttr.value= "true";
  }
  var voRowHasAddedAttr= this.oRowHasAddedAttr.cloneNode(true);
  oRow.setAttributeNode(voRowHasAddedAttr);
  //oRow.setAttribute(this.ATTR_HASADDED, "true");
}
//----------------------------------------------------------------------
//private; 
//return: true/false;
function TreeView_isRowAppeared(oRow){
  if (oRow== null) return false;
  var vsValue= oRow.getAttribute(this.ATTR_HASADDED);
  return PF.parseBool(vsValue);
}
//----------------------------------------------------------------------
//private; 生成本表中无子结点的结点;
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeTextOfRow_1(sCode, sName, tIsCheck, sTip, sSelImg, sNormalImg){
  var voBuf= new StringBuffer();
  voBuf.append(this.makeNodeTextBegin(sCode, sName, tIsCheck, this.isCodeAndName(), sTip, sSelImg, sNormalImg, this.isUseLeafImg(), false));
  voBuf.append(this.makeNodeTextEnd());
  //var vsRet= voBuf.toString();
  //voBuf.clear();
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 本表中有子结点;
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeTextOfRow_2(sCode, sName, tIsCheck, sTip, sSelImg, sNormalImg, iLevel){
  var voBuf= new StringBuffer();
  voBuf.append(this.makeNodeTextBegin(sCode, sName, tIsCheck, this.isCodeAndName(), sTip, sSelImg, sNormalImg, this.isUseLeafImg(), true));
  voBuf.append(this.makeNodeContainerTextBegin());

  //子结点的子结点的处理;
  if ((this.getMakeType() & this.MAKE_TYPE_LEVEL)== 0 || iLevel> 1){
    voBuf.append(this.makeNodeText(sCode, iLevel- 1));
  }else{
    voBuf.append(this.makeMoreNode(sCode));
  }
  voBuf.append(this.makeNodeContainerTextEnd());
  voBuf.append(this.makeNodeTextEnd());
  //var vsRet= voBuf.toString();
  //voBuf.clear();
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 生成构件的HTML对象.
//return: 成功: 节点串, 失败: "";
//TreeView_makeNodeTextBegin= function();
function TreeView_makeNodeTextBegin(sCode, sName, tIsCheck, tIsCodeAndCap,
                                    sTip, sSelImg, sNormalImg, tIsUseLeafImg,
                                    tHasChildren, sMoreInfo){
  if (sCode== null || sCode== "") return "";
  if (sName== null) sName= "";
  if (sTip== "") sTip= null;
  if (sMoreInfo== null) sMoreInfo= "";
  if (sSelImg== null || sSelImg== ""){
    if (tIsUseLeafImg && tHasChildren== false) sSelImg= this.sLeafSelImg;
    else sSelImg= this.sSelImg;
  }
  if (sNormalImg== null || sNormalImg== ""){
    if (tIsUseLeafImg && tHasChildren== false) sNormalImg= this.sLeafNormalImg;
    else sNormalImg= this.sNormalImg;
  }
  var voBuf= new StringBuffer();
  voBuf.append("<tbody id='");
  voBuf.append(this.createNodeId(sCode));
  voBuf.append("' code='");
  voBuf.append(sCode);
  voBuf.append("' name='");
  voBuf.append(sName);
  voBuf.append("' ");
  if (sTip!= null){
    voBuf.append("tip='");
    voBuf.append(sTip);
    voBuf.append("' ");
  }
  voBuf.append(sMoreInfo);
  voBuf.append(">");
  voBuf.append("<tr style='height:16px;'>");

  //voBuf.append("<td id='RCImgTD'><input type='image' src='");
  voBuf.append("<td id='RCImgTD'><img src='");
  if (tHasChildren) voBuf.append(this.IMG_RETRACT);
  else voBuf.append(this.IMG_TRANSPARENT);
  voBuf.append("'></td>");

  if (this.isExistCheck()){
    //voBuf.append("<td id='CheckTD' style=\"display:"+ (this.isExistCheck()?"":"none")+ ";\"><input type='checkbox' style='width:16px; height:16px;' ");
    voBuf.append("<td id='CheckTD'><input type='checkbox' style='width:16px; height:16px;' ");
    if (tIsCheck) voBuf.append(" checked ");
    if (sMoreInfo!= "") voBuf.append(" disabled ");
    voBuf.append("></td>");
  }

  voBuf.append("<td id='OpenImgTD' ");
  if (sSelImg!= this.sSelImg){
    voBuf.append(" selimg= '");
    voBuf.append(sSelImg);
    voBuf.append("' ");
  }
  if (sNormalImg!= this.sNormalImg){
    voBuf.append(" normalimg= '");
    voBuf.append(sNormalImg);
    voBuf.append("' ");
  }
  //voBuf.append("><input type='image' src='");
  voBuf.append("><img src='");
  voBuf.append(sNormalImg);
  voBuf.append("'></td>");

  var vsCap= this.makeNodeName(sCode, sName, tIsCodeAndCap);
  //var vsCap= sName;
  //if (tIsCodeAndCap) vsCap= "["+ sCode+ "] "+ vsCap;
  voBuf.append("<td id='CapTD' nowrap><span>"+ vsCap+ "</span></td>");
  voBuf.append("</tr>");
  voBuf.append("<tr style='display:none;'>");
  voBuf.append("<td></td>");
  voBuf.append("<td colSpan='"+ (this.isExistCheck()?3:2)+ "' align='left' valign='top'>");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//pvivate; 生成构件的HTML对象.
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeName(sCode, sCap, tIsCodeAndCap){
  if (tIsCodeAndCap== null) tIsCodeAndCap= this.isCodeAndName();
  if (tIsCodeAndCap) return "["+ sCode+ "] "+ sCap;
  return sCap;
}
//----------------------------------------------------------------------
//private; 生成构件的HTML对象.
//return: 成功: 节点串, 失败: "";
function TreeView_parseNodeName(oNode, tIsCodeAndCap){
  if (tIsCodeAndCap== null) tIsCodeAndCap= this.isCodeAndName();
  var vsName= this.getNodeName(oNode.getNodeCode());
  if (tIsCodeAndCap){
    return vsName.substr(("["+ this.getNodeCode(oNode)+ "] ").length);
  }else{
    return vsName;
  }
}
//----------------------------------------------------------------------
//private; 生成构件的HTML对象.
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeTextEnd(){
  return "</td></tr></tbody>";
}
//----------------------------------------------------------------------
//private; 生成构件的HTML对象.
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeContainerTextBegin(){
  var voBuf= new StringBuffer();
  //table-layout:fixed;
  voBuf.append("<table id='GroupTA' border='0' cellspacing='0' cellpadding='0' style='font-size:9pt; '>");
  voBuf.append("<colgroup>");
  voBuf.append("<col style='width:16px; text-align:center; vertical-align:top; table-layout:fixed;'>");
  if (this.isExistCheck()){
    voBuf.append("<col style='text-align:center; vertical-align:top; table-layout:fixed; width:"+ (this.isExistCheck()? "16px": "0px")+ ";'>");
    //voBuf.append("<col style='width:16px; text-align:center; vertical-align:top; table-layout:fixed;'>");
  }
  voBuf.append("<col style='width:16px; text-align:center; vertical-align:top; table-layout:fixed;'>");
  voBuf.append("<col style='width:95%; text-align:left; vertical-align:bottom; padding:0 0 0 4;'>");
  voBuf.append("</colgroup>");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//private; 生成构件的HTML对象.
//return: 成功: 节点串, 失败: "";
function TreeView_makeNodeContainerTextEnd(){
  return "</table>";
}
//----------------------------------------------------------------------
//public; 获取 key 值串;
//return: 成功: key 串, 失败: null;
function TreeView_createNodeId(sCode){
  return this.KEY_PREFIX+ sCode;
}
//----------------------------------------------------------------------
//public; 初始化.
//return:成功: true, 失败: false;
function TreeView_init(tIsFinalClass){
  if (this.tHasInit) return true;
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;
  if (typeof(this.oOuterPanel)!= "undefined" && this.oOuterPanel!= null){
    this.oOuterPanel.oOwner= this;
    if (this.oOuterPanel.onclick== null) this.oOuterPanel.onclick= Base_oOuterPanel_onclick;
    if (this.oOuterPanel.ondblclick== null) this.oOuterPanel.ondblclick= Base_oOuterPanel_ondblclick;
  	this.bindResizeToOuterPanel(true);
  }
  
  if (tIsFinalClass) this.setInitMark();
  return true;
}
//----------------------------------------------------------------------
//public; 调整构件的大小.
//return: 成功: true, 失败: false;
function TreeView_resize(){
  //alert("TreeView_resize();");
  if (this.tHasInit== false) return false;
  if (this.tIsResizing) return;
  this.tIsResizing= true;
  
  if (this.oRect.iWidth== null || (!this.oRect.isWidthPercent() && parseInt(this.oRect.iWidth)< 50)) this.oRect.iWidth= 50;
  if (this.oRect.iHeight== null || (!this.oRect.isHeightPercent() && parseInt(this.oRect.iHeight)< 50)) this.oRect.iHeight= 50;

  var voStyle= this.oOuterPanel.style;
  if (voStyle.left!= this.oRect.iLeft) voStyle.left= this.oRect.iLeft;
  if (voStyle.top!= this.oRect.iTop) voStyle.top= this.oRect.iTop;
  if (voStyle.width!= this.oRect.iWidth) voStyle.width= this.oRect.iWidth;
  if (voStyle.height!= this.oRect.iHeight) voStyle.height= this.oRect.iHeight;

  this.fireOnResize();
  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//private; 调整风格,以保持整个控件的的风格正确性;
//return: void;
function TreeView_adjustStyle(){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "adjustStyle");
  if (isNaN(parseInt(this.oOuterPanel.currentStyle.width))){
    this.oOuterPanel.style.width= this.oDefRect.iWidth;
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
//public; 设置风格;
//return: void;
function TreeView_setStyle(sStyle){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sStyle)) return;
  this.oOuterPanel.style.cssText= PageX.getCssSheetText(this.oOuterPanel.className)+ "; "+ this.oOuterPanel.style.cssText+ "; "+ sStyle;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格中的指定项目;
//param: sName 的写法必须为 js 的写法,如: border-color,必须写成 borderColor;
//return: void;
function TreeView_setStyleItem(sName, sValue){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyleItem");
  this.oOuterPanel.style[sName]= sValue;
  this.adjustStyle();
  return;
}
//----------------------------------------------------------------------
//public; 设置风格;
//return: void;
function TreeView_setClass(sCssClassName){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "setStyle");
  if (PF.isEmpty(sCssClassName)) return;
  var vsStyle= PageX.getCssSheetText(sCssClassName);
  this.setStyle(vsStyle);
  return;
}
//----------------------------------------------------------------------
//public; 是否是 root 节点;
//return: 是:true; 否则:false;
function TreeView_isRoot(sCode){
  return sCode== this.getRootCode();
}
//----------------------------------------------------------------------
//public; 是否是 More 节点;
//return: 是:true; 否则:false;
function TreeView_isMoreNode(oNode){
  if (this.isValidNode(oNode)== false) return false;
  var vsMoreId= this.createNodeId(this.sMoreCode);
  return (oNode.id== vsMoreId);
}
//----------------------------------------------------------------------
//pubic; 节点是否有效;
//return: 是:true; 否则:false;
function TreeView_isValidNode(oNode){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "collapse");
  if (oNode== null) return false;
  if (oNode.nodeName!= "TBODY") return false;
  if (oNode.childNodes.length!= 2) return false;
  if (this.isExistCheck() && oNode.firstChild.childNodes.length!= 4) return false;
  if (!this.isExistCheck() && oNode.firstChild.childNodes.length!= 3) return false;
  if (oNode.childNodes[1].childNodes.length!= 2) return false;
  return true;
}
//----------------------------------------------------------------------
//public;
//return: 是:true; 否则:false;
function TreeView_isExistNode(sCode){
  return this.getNodeRow(sCode)!=null;
}
//----------------------------------------------------------------------
//public;
//return: 是:true; 否则:false;
function TreeView_isLeafNode(sCode){
  if (PF.isEmpty(sCode)) return false;
  var voRow= null;
  if (this.isRoot(sCode)){
    voRow= this.oTableData.selectSingleNode("rowset/row");
  }else{
    voRow= this.oTableData.selectSingleNode("rowset/row["+ this.getPCodeField()+ " = '"+ sCode+ "']");
  }
  return voRow== null;
}
//----------------------------------------------------------------------
//private; 是否有子节点;
//return: 有:true; 否则:false;
function TreeView_hasChildNodesForAppear(oNode){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "collapse");
  if (this.isValidNode(oNode)== false) return false;
  return oNode.childNodes[1].childNodes[1].hasChildNodes();
}
//----------------------------------------------------------------------
//public; 是否有子节点;
//return: 有:true; 否则:false;
function TreeView_hasChildNodes(sCode){
  var voRow= null;
  if (this.isRoot(sCode)){
    voRow= this.oTableData.selectSingleNode("rowset/row["+ this.getPCodeField()+ "='' or not("+ this.getPCodeField()+ ")]");
  }else{
    voRow= this.oTableData.selectSingleNode("rowset/row["+ this.getPCodeField()+ "='"+ sCode+ "']");
  }
  return voRow!= null;
}
//----------------------------------------------------------------------
//public; 判断子节点是否已展开;
//return: 有:true; 否则:false;
function TreeView_isCollapse(oNode){
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "collapse");
  if (this.hasChildNodesForAppear(oNode)== false) return false;
  if (oNode.childNodes[1].style.display== "none") return false;
  return true;
}
//----------------------------------------------------------------------
//public; 展开指定层的节点;
//return: void;
function TreeView_collapseLevel(iLevel){
  //alert("TreeView_collapseLevel();");
  if (iLevel== null) return;
  if (iLevel== 0) return;
  if (iLevel>= this.MAX_LEVEL) return;
  this.collapse(this.getNodeCode(this.getRoot()));
  iLevel--;
  var vasCode= this.getChildCodes(this.getNodeCode(this.getRoot()), iLevel);
  if (PF.isValidArray(vasCode)== false) return;
  for (var i= 0; i< vasCode.length; i++){
    this.collapse(vasCode[i]);
  }
  return;
}
//----------------------------------------------------------------------
//public; 展开节点;
//return: void;
function TreeView_collapse(sCode){
  //alert("TreeView_collapse();");
  //事件;
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeNodeCollapse)){
    this.eventAnswer_OnBeforeNodeCollapse(this, sCode);
  }
  if (this.isAbortEvent()) return;
  this.fireEvent(this.OnBeforeNodeCollapse, new Array(this, sCode));
  if (this.isAbortEvent()) return;

  var voNode= this.getNode(sCode);
  if (voNode== null){
    voNode= this.getNode(sCode, true);
    var vasPcode= this.getParentCodes(sCode, this.MAX_LEVEL);
    for (var i= vasPcode.length- 1; i>= 0; i--){
      var voPNode= this.getNode(vasPcode[i]);
      this.rcNode(voPNode, true);
    }
    this.rcNode(voNode, true);
  }else{
    this.rcNode(voNode, true);
  }
  var voFirst= this.getFirstChildForAppear(voNode);
  this.showMore(voFirst);

  //事件;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterNodeCollapse)){
    this.eventAnswer_OnAfterNodeCollapse(this, sCode);
  }
  this.fireEvent(this.OnAfterNodeCollapse, new Array(this, sCode));
}
//----------------------------------------------------------------------
//public; 收缩节点;
//return: void;
function TreeView_retract(sCode){
  //事件;
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeNodeRetract)){
    this.eventAnswer_OnBeforeNodeRetract(this, sCode);
  }
  if (this.isAbortEvent()) return;
  this.fireEvent(this.OnBeforeNodeRetract, new Array(this, sCode));
  if (this.isAbortEvent()) return;

  var voNode= this.getNode(sCode);
  if (voNode== null) return;
  this.rcNode(voNode, false);

  //事件;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterNodeRetract)){
    this.eventAnswer_OnAfterNodeRetract(this, sCode);
  }
  this.fireEvent(this.OnAfterNodeRetract, new Array(this, sCode));
}
//----------------------------------------------------------------------
//private; 收缩/展开节点;
//return: void;
function TreeView_rcNode(oNode, tIsCollapse){
  //alert("TreeView_rcNode();");
  if (this.tHasInit== false) Info.throws("对象尚未初始化或初始化不成功;", this.CLASSNAME, "collapse");
  if (this.hasChildNodesForAppear(oNode)== false) return;
  tIsCollapse= PF.parseBool(tIsCollapse);
  if (this.isCollapse(oNode)== tIsCollapse) return;

  var voChildrenIcoTD= oNode.firstChild.firstChild;
  //var voCheckTD= oNode.firstChild.childNodes[1];
  var voOpenIcoTD= oNode.firstChild.childNodes[this.getOpenImgTDIndex()];
  var vsSelImg= voOpenIcoTD.selimg;
  var vsNormalImg= voOpenIcoTD.normalimg;
  var voChildrenTR= oNode.childNodes[1];

  if (tIsCollapse){
    voChildrenIcoTD.firstChild.src= this.IMG_COLLAPSE;
    //voOpenIcoTD.firstChild.src= (vsSelImg== null? this.IMG_OPENED: vsSelImg);
    voChildrenTR.style.display= "";
  }else{
    voChildrenIcoTD.firstChild.src= this.IMG_RETRACT;
    //voOpenIcoTD.firstChild.src= (vsNormalImg== null? this.IMG_CLOSED: vsNormalImg);
    voChildrenTR.style.display= "none";
  }
  return;
}
//----------------------------------------------------------------------
//public; 选中节点;
//return: void;
function TreeView_getCurNode(){
  return this.oCurNode;
}
//----------------------------------------------------------------------
//private;
function TreeView_getCheckTDIndex(){
  return this.isExistCheck()?1:-1;
}
//----------------------------------------------------------------------
//private;
function TreeView_getCapTDIndex(){
  return this.isExistCheck()?3:2;
}
//----------------------------------------------------------------------
//private;
function TreeView_getOpenImgTDIndex(){
  return this.isExistCheck()?2:1;
}
//----------------------------------------------------------------------
//private;
function TreeView_getRCImgTDIndex(){
  return 0;
}
//----------------------------------------------------------------------
//public; 选中节点;
//return: void;
function TreeView_setCurNode(oNode){
  if (!this.isValidNode(oNode)) return;
  var voOldNode= this.oCurNode;
  this.oCurNode= oNode;
  if (this.isValidNode(voOldNode)){
    var voOpenIcoTD= voOldNode.firstChild.childNodes[this.getOpenImgTDIndex()];
    var voCapTD= voOldNode.firstChild.childNodes[this.getCapTDIndex()];
    var vsSelImg= voOpenIcoTD.selimg;
    var vsNormalImg= voOpenIcoTD.normalimg;
    if (PF.isEmpty(vsSelImg)) vsSelImg= vsNormalImg;
    if (PF.isEmpty(vsNormalImg)) vsNormalImg= vsSelImg;
    voOpenIcoTD.firstChild.src= (vsNormalImg== null? this.IMG_CLOSED: vsNormalImg);
    voCapTD.firstChild.style.backgroundColor= voOldNode.style.backgroundColor;
    voCapTD.firstChild.style.color= voOldNode.style.color;
  }

  var voOpenIcoTD= this.oCurNode.firstChild.childNodes[this.getOpenImgTDIndex()];
  var voCapTD= this.oCurNode.firstChild.childNodes[this.getCapTDIndex()];
  var vsSelImg= voOpenIcoTD.selimg;
  var vsNormalImg= voOpenIcoTD.normalimg;
  if (PF.isEmpty(vsSelImg)) vsSelImg= vsNormalImg;
  if (PF.isEmpty(vsNormalImg)) vsNormalImg= vsSelImg;
  voOpenIcoTD.firstChild.src= (vsSelImg== null? this.IMG_OPENED: vsSelImg);
  voCapTD.firstChild.style.backgroundColor= "#0A246A";
  voCapTD.firstChild.style.color= "white";

  //事件;
  if (PF.isExistMethodK(this.eventAnswer_OnNodeSelected)){
    this.eventAnswer_OnNodeSelected(this, this.getNodeCode(this.oCurNode), this.getNodeCode(voOldNode));
  }
  this.fireEvent(this.OnNodeSelected, new Array(this, this.getNodeCode(this.oCurNode), this.getNodeCode(voOldNode)));
  return;
}
//----------------------------------------------------------------------
//public; 获取父结点;
//return: 成功:parent code; 否则: null;
function TreeView_getParentCode(sCode){
  var vaoPCode= this.getParentCodes(sCode, 1);
  return (vaoPCode== null || vaoPCode.length<= 0)?null:vaoPCode[0];
}
//----------------------------------------------------------------------
//public; 获取父结点;
//return: 成功:parent code array; 否则: null;
function TreeView_getParentCodes(sCode, iLevel){
  var vaoRow= this.getParentRows(sCode, iLevel);
  if (vaoRow== null || vaoRow.length<= 0) return null;
  var vaiCol= DataTools.getChildIndexs(vaoRow, this.getCodeField());
  var vasCode= new Array();
  for (var i= 0, len= vaiCol.length; i< len; i++){
    if (vaiCol[i]< 0) continue;
    vasCode[i]= vaoRow[i].childNodes[vaiCol[i]].text;
  }
  if (iLevel> vaiCol.length){
    vasCode[vaiCol.length]= this.getNodeCode(this.getRoot());
  }
  return vasCode;
}
//----------------------------------------------------------------------
//public; 获取子结点;
//return: 成功:child code array; 否则: null;
function TreeView_getChildCodes(sCode, iLevel){
  var vaoRow= this.getChildRows(sCode, iLevel);
  if (vaoRow== null || vaoRow.length<= 0) return null;
  var vaiCol= DataTools.getChildIndexs(vaoRow, this.getCodeField());
  var vasCode= new Array();
  for (var i= 0, len= vaiCol.length; i< len; i++){
    if (vaiCol[i]< 0) continue;
    vasCode[i]= vaoRow[i].childNodes[vaiCol[i]].text;
  }
  return vasCode;
}
//----------------------------------------------------------------------
//private; 获取子结点;
//return: 成功:child node code; 否则: null;
function TreeView_getFirstChild(sPCode){
  var vaoChildRow= this.getChildRows(sPCode);
  if (vaoChildRow== null || vaoChildRow.length<= 0) return null;
  var voCol= vaoChildRow[0].selectSingleNode(this.getCodeField());
  if (voCol== null) return null;
  return voCol.text;
}
//----------------------------------------------------------------------
//private; 获取子结点;
//return: 成功:child node; 否则: null;
function TreeView_getFirstChildForAppear(oPNode){
  if (this.hasChildNodesForAppear(oPNode)== false) return null;
  var voTBodies= oPNode.childNodes[1].childNodes[1].firstChild.tBodies;
  var voFirst= voTBodies[0];
  if (!this.isValidNode(voFirst)) voFirst= null;
  return voFirst;
}
//----------------------------------------------------------------------
//public; 获取结点 key 值;
//return: 成功:key; 否则: "";
function TreeView_getNodeCode(oNode){
  if (oNode== null) return "";
  var vsCode= oNode.id.substr(this.KEY_PREFIX.length);
  return vsCode;
}
//----------------------------------------------------------------------
//public; 获取结点 caption 值;
//return: 成功:caption; 否则: "";
function TreeView_getNodeName(sCode){
  var voNodeMeta= this.getNodeMeta(sCode);
  if (voNodeMeta== null) return "";
  return voNodeMeta.sName;
}
//----------------------------------------------------------------------
//private; 获取结点 checkbox 值;
//return: 成功:checkbox; 否则: null;
function TreeView_getNodeCheckBox(oNode){
  if (oNode== null) return null;
  if (!this.isExistCheck()) return null;
  var voCheckTD= oNode.firstChild.childNodes[1];
  return voCheckTD.firstChild;
}
//----------------------------------------------------------------------
//private; 获取结点 image box 值;
//return: 成功:image box; 否则: null;
function TreeView_getNodeImgBox(oNode){
  if (oNode== null) return null;
  var voImgTD= oNode.firstChild.childNodes[this.getOpenImgTDIndex()];
  return voImgTD.firstChild;
}
//----------------------------------------------------------------------
//public; 判断结点是否被选中;
//return: 选中: true; 否则: false;
function TreeView_isChecked(sCode){
  var voNodeMeta= this.getNodeMeta(sCode);
  if (voNodeMeta== null) return "";
  return voNodeMeta.tIsChecked;
}
//----------------------------------------------------------------------
//public; 设置结点的选中状态;
//return: void;
function TreeView_checkNode(sCode, tIsCheck){
  this.checkNodeK(sCode, tIsCheck, false);
}
//----------------------------------------------------------------------
//private; 设置结点的选中状态;
//return: void;
function TreeView_checkNodeK(sCode, tIsCheck, tIsFromClick){
  //alert("TreeView_checkNodeK();");
  if (this.isExistCheck()== false) return;
  if (sCode== null || sCode== "") return;
  //if (oNode== null) return;
  var voNode= this.getNode(sCode);
  tIsCheck= PF.parseBool(tIsCheck);
  if (tIsFromClick== null) tIsFromClick= false;
  voCheck= this.getNodeCheckBox(voNode);
  if (voCheck!= null){
    if (!tIsFromClick && voCheck.checked== tIsCheck) return;
    voCheck.checked= tIsCheck;
  }
  var voRow= this.getNodeRow(sCode);
  if (voRow!= null){
    this.setRowValue(voRow, this.getCheckField(), this.convertCheckedValue(tIsCheck));
  }

  if (this.isRelaChildren()){
    this.checkChildren(sCode);
  }
  if (this.isRelaParent()){
    this.checkParent(sCode);
  }

  //事件;
  if (PF.isExistMethodK(this.eventAnswer_OnNodeChecked)){
    this.eventAnswer_OnNodeChecked(this, sCode, tIsCheck);
  }
  this.fireEvent(this.OnNodeChecked, new Array(this, sCode, tIsCheck));
  return;
}
//----------------------------------------------------------------------
//private; 是否有更多的子结点;
//return: 有:true; 否则:false;
function TreeView_hasMoreChild(oNode){
  if (oNode== null) return false;
  var voTable= this.getChildContainer(oNode);
  if (voTable== null) return false;
  var voNode= null;
  for (var i= 0, len= voTable.tBodies.length; i< len; i++){
    voNode= voTable.tBodies[i];
    if (this.isMoreNode(voNdoe)) return true;
  }
  return false;
}
//----------------------------------------------------------------------
//public; 检查框选中/取消后影响子结点;
//return: void;
function TreeView_checkChildren(sCode){
  //alert("TreeView_checkChildren();");
  if (this.isExistCheck()== false) return;
  if (this.isRelaChildren()== false) return;
  if (this.getCheckField()== null || this.getCheckField()== "") return;
  var vtIsCheck= this.isChecked(sCode);
  var vaoChildRow= null;
  if (this.isRoot(sCode)){
    vaoChildRow= this.oTableData.selectNodes("rowset/row");
  }else{
    vaoChildRow= this.getChildRows(sCode, this.MAX_LEVEL);
  }
  if (vaoChildRow== null || vaoChildRow.length<= 0) return;

  this.setRelaChildren(false);
  var vaiCol= DataTools.getChildIndexs(vaoChildRow, this.getCheckField());
  for (var i= 0, len= vaiCol.length; i< len; i++){
    if (vaiCol[i]>= 0){
      vaoChildRow[i].childNodes[vaiCol[i]].text= this.convertCheckedValue(vtIsCheck);
    }else{
      this.setRowValue(vaoChildRow[i], this.getCheckField(), this.convertCheckedValue(vtIsCheck));
    }
  }
  
  var vaoAppearRow= new Array();
  for (var i= 0, len= vaoChildRow.length; i< len; i++){
    if (this.isRowAppeared(vaoChildRow[i])== false) continue;
    vaoAppearRow[vaoAppearRow.length]= vaoChildRow[i];
  }
  if (!this.isRoot(sCode)) vaoChildRow.length= 0;
  vaoChildRow= null;
  var vaiCol= DataTools.getChildIndexs(vaoAppearRow, this.getCodeField());
  if (vaiCol!= null){
    for (var i= 0, len= vaiCol.length; i< len; i++){
      if (vaiCol[i]< 0) continue;
      var voNode= this.getNode(vaoAppearRow[i].childNodes[vaiCol[i]].text);
      if (voNode== null) continue;
      var voCheckBox= this.getNodeCheckBox(voNode);
      if (voCheckBox== null) continue;
      voCheckBox.checked= vtIsCheck;
    }
  }
  vaoAppearRow.length= 0;
  vaoAppearRow= null;
  this.setRelaChildren(true);
  return;
}
//----------------------------------------------------------------------
//public; 检查框选中/取消后影响父结点;
//return: void;
function TreeView_checkParent(sCode){
  //alert("TreeView_checkParent();");
  if (this.isExistCheck()== false) return;
  if (this.isRelaParent()== false) return;
  if (this.isRoot(sCode)) return;

  //处理相关父结点;
  this.setRelaParent(false);
  var vsCode= sCode;
  var vtIsCheck= this.isChecked(vsCode);
  var vaoParentRow= this.getParentRows(vsCode, this.MAX_LEVEL);
  if (vaoParentRow!= null && vaoParentRow.length> 0){
    var vaiCodeCol= DataTools.getChildIndexs(vaoParentRow, this.getCodeField());
    var vaiCheckCol= DataTools.getChildIndexs(vaoParentRow, this.getCheckField());
    for (var i= 0, len= vaiCodeCol.length; i< len; i++){
      vsCode= vaoParentRow[i].childNodes[vaiCodeCol[i]].text;
      if (vtIsCheck){
        var voTmpRow= this.oTableData.selectSingleNode("rowset/row["+ this.getPCodeField()+ "='"+ vsCode+ "' and (not("+ this.getCheckField()+ ") or "+ this.getCheckField()+ "!='"+ this.getCheckedValue()+ "')]");
        if (voTmpRow!= null){
          break;
        }
      }
      if (vaiCheckCol[i]>= 0){
        vaoParentRow[i].childNodes[vaiCheckCol[i]].text= this.convertCheckedValue(vtIsCheck);
      }else{
        this.setRowValue(vaoParentRow[i], this.getCheckField(), this.convertCheckedValue(vtIsCheck));
      }
      var voNode= this.getNode(vsCode);
      if (voNode== null) continue;
      var voCheckBox= this.getNodeCheckBox(voNode);
      if (voCheckBox== null) continue;
      voCheckBox.checked= vtIsCheck;
      
      vsCode= vaoParentRow[i].childNodes[vaiCodeCol[i]].text;
    }
  }

  //处理根结点;
  var voCheckBox= this.getNodeCheckBox(this.getRoot());
  if (voCheckBox!= null){
    if (vtIsCheck){
      var voTmpRow= this.oTableData.selectSingleNode("rowset/row[(not("+ this.getPCodeField()+ ") or "+ this.getPCodeField()+ "='') and (not("+ this.getCheckField()+ ") or "+ this.getCheckField()+ "!='"+ this.getCheckedValue()+ "')]");
      if (voTmpRow== null) voCheckBox.checked= true;
      else voCheckBox.checked= false;
    }else{
      voCheckBox.checked= false;
    }
  }
  
  this.setRelaParent(true);
  return;
}
//----------------------------------------------------------------------
//private; 获取指定结点的子结点容器;
//return: 成功:容器 Table; 否则:null;
function TreeView_getChildContainer(oNode){
  if (this.isValidNode(oNode)== false) return null;
  var voTable= oNode.childNodes[1].childNodes[1].firstChild;
  return voTable;
}
//----------------------------------------------------------------------
//public; 获取结点信息对象;
//return: 成功:node info object; 否则:null;
function TreeView_getNodeMeta(sCode){
  //if (this.isValidNode(oNode)== false) return null;
  var voInfo= new Object();
  voInfo.sTableName= this.getTableName();
  voInfo.sCode= null;
  voInfo.oDataRow= null;
  voInfo.oNode= null;
  voInfo.sPCode= null;
  voInfo.sName= null;
  voInfo.sTip= "";
  voInfo.tIsChecked= false;
  voInfo.sSelImg= this.sSelImg;
  voInfo.sNormalImg= this.sNormalImg;

  if (this.isRoot(sCode)){
    voInfo.sCode= this.sRootCode;
    voInfo.oDataRow= null;
    voInfo.oNode= this.oRoot;
    voInfo.sPCode= null;
    voInfo.sName= this.sRootText;
    voInfo.sTip= this.sRootTip;
    var voCheckBox= this.getNodeCheckBox(this.getRoot());
    if (voCheckBox!= null){
      voInfo.tIsChecked= voCheckBox.checked;
    }
    voInfo.sSelImg= this.getRoot().firstChild.all("OpenImgTD").selimg;
    voInfo.sNormalImg= this.getRoot().firstChild.all("OpenImgTD").normalimg;
    return voInfo;
  }

  voInfo.sCode= sCode;
  voInfo.oDataRow= this.getNodeRow(voInfo.sCode);
  voInfo.oNode= this.getNode(sCode, false);
  voInfo.sPCode= this.getParentCode(voInfo.sCode);
  if (this.isValidNode(voInfo.oNode)){
    voInfo.sSelImg= voInfo.oNode.firstChild.all("OpenImgTD").selimg;
    voInfo.sNormalImg= voInfo.oNode.firstChild.all("OpenImgTD").normalimg;
  }
  var voCol= voInfo.oDataRow.selectSingleNode(this.getNameField());
  if (voCol!= null) voInfo.sName= voCol.text;
  voCol= null;
  if (this.getTipField()!="") voCol= voInfo.oDataRow.selectSingleNode(this.getTipField());
  if (voCol!= null) voInfo.sTip= voCol.text;
  voCol= null;
  if (this.getCheckField()!="") voCol= voInfo.oDataRow.selectSingleNode(this.getCheckField());
  if (voCol!= null) voInfo.tIsChecked= voCol.text==this.getCheckedValue()?true:false;
  voCol= null;
  if (this.getSelImgField()!="") voCol= voInfo.oDataRow.selectSingleNode(this.getSelImgField());
  if (voCol!= null) voInfo.sSelImg= voCol.text;
  voCol= null;
  if (this.getNormalImgField()!="") voCol= voInfo.oDataRow.selectSingleNode(this.getNormalImgField());
  if (voCol!= null) voInfo.sNormalImg= voCol.text;
  if (PF.isEmpty(voInfo.sSelImg)) voInfo.sSelImg= this.sSelImg;
  if (PF.isEmpty(voInfo.sNormalImg)) voInfo.sNormalImg= this.sNormalImg;
  
  return voInfo;
}
//----------------------------------------------------------------------
//public;
//return: data row;
function TreeView_getNodeRow(sCode){
  if (this.isRoot(sCode)) return null;
  /*
  var vaoRow= this.oTableData.selectNodes("rowset/row["+ this.getCodeField()+ "='"+ sCode+ "']");
  if (vaoRow== null || vaoRow.length<= 0){
    Info.throws("数据错误！", this.CLASSNAME, "getNodeRow", new Array("有显示结点,没有相关数据;\nkey:"+ sCode));
  }else if (vaoRow.length> 1){
    Info.throws("关键值重复！", this.CLASSNAME, "getNodeRow", new Array("key:"+ sCode));
  }
  return vaoRow[0];
  //*/
  return this.oTableData.selectSingleNode("rowset/row["+ this.getCodeField()+ "='"+ sCode+ "']");
}
//----------------------------------------------------------------------
//public;
//return: value / null;
function TreeView_getNodeValue(sCode, sField){
  if (this.isRoot(sCode)) return null;
  var voRow= this.oTableData.selectSingleNode("rowset/row["+ this.getCodeField()+ "='"+ sCode+ "']");
  if (voRow== null) return null;
  return this.getRowValue(voRow, sField);
}
//----------------------------------------------------------------------
//public; 插入子结点;
//return: 成功:true; 否则:false;
function TreeView_insertChild(oPNode, oNode, iIndex){
  if (this.isValidNode(oPNode)== false) return false;
  if (this.isValidNode(oNode)== false) return false;
  if (iIndex== null) iIndex= -1;
  if (this.insertChildToTree(oPNode, oNode, iIndex)== false) return false;
  if (this.isUpdateData()== false) return true;

  var voNewRow= this.makeNodeRow(oNode);
  var voRowSet= this.oTableData.selectSingleNode("rowset");
  if (voRowSet.childNodes.length<= iIndex || iIndex< 0){
    voRowSet.appendChild(voNewRow);
  }else{
    voRefRow= voRowSet.childNodes[iIndex];
    voRowSet.insertBefore(voNewRow, voRefRow);
  }
  this.addRowAddedAttr(voNewRow);
  return true;
}
//----------------------------------------------------------------------
//public; 插入结点;
//return: 成功:true; 否则:false;
function TreeView_insertNode(oNewNode, oOldNode, tIsBefore){
  if (this.isValidNode(oNewNode)== false) return false;
  if (this.isValidNode(oOldNode)== false) return false;
  if (this.insertNodeToTree(oNewNode, oOldNode, tIsBefore)== false) return false;
  if (this.isUpdateData()== false) return true;

  var voRow= this.makeNodeRow(oNewNode);
  var voOldRow= this.getNodeRow(oOldNode.getNodeCode());
  if (tIsBefore== false) voOldRow= voOldRow.nextSibling;
  if (voOldRow!= null) voOldRow.parentNode.insertBefore(voRow, voOldRow);
  else voOldRow.parentNode.appendChild(voRow);
  this.addRowAddedAttr(voRow);
  return true;
}
//----------------------------------------------------------------------
//private; 生成数据行;
//return: 成功: row object; 否则:null;
function TreeView_makeNodeRow(oNode){
  if (oNode== null) return null;
  var vsSelImg= oNode.firstChild.all("OpenImgTD").selimg;
  var vsNormalImg= oNode.firstChild.all("OpenImgTD").normalimg;
  var voPNode= oNode.parentNode.parentNode.parentNode.parentNode;
  var vsPCode= voPNode.code;
  if (this.isRoot(vsPCode)) vsPCode= "";
  var voCheck= this.getNodeCheckBox(oNode);

  var voRow= this.oTableData.ownerDocument.createElement("row");
  if (PF.isEmpty(this.getCodeField())== false) this.setRowValue(voRow, this.getCodeField(), oNode.code);
  if (PF.isEmpty(this.getNameField())== false) this.setRowValue(voRow, this.getNameField(), oNode.name);
  if (PF.isEmpty(this.getPCodeField())== false) this.setRowValue(voRow, this.getPCodeField(), vsPCode);
  if (PF.isEmpty(this.getTipField())== false) this.setRowValue(voRow, this.getTipField(), oNode.tip);
  if (PF.isEmpty(this.getCheckField())== false) this.setRowValue(voRow, this.getCheckField(), voCheck!=null?voCheck.checked:false);
  if (PF.isEmpty(this.getSelImgField())== false) this.setRowValue(voRow, this.getSelImgField(), vsSelImg);
  if (PF.isEmpty(this.getNormalImgField())== false) this.setRowValue(voRow, this.getNormalImgField(), vsNormalImg);
  return voRow;
}
//----------------------------------------------------------------------
//public; 删除结点;
//return: 成功:true; 否则:false;
function TreeView_deleteNode(sCode){
  var voNode= this.getNode(sCode);
  if (voNode!= null){
    if (this.deleteNodeFromTree(voNode)== false) return false;
  }
  if (this.isUpdateData()== false) return true;
  var voRow= this.getNodeRow(sCode);
  if (voRow== null) return false;
  var vtRet= !(voRow.parentNode.removeChild(voRow)== null);
  return vtRet;
}
//----------------------------------------------------------------------
//public; 生成结点;
//return: 成功:node object; 否则:null;
//function TreeView_makeNode(sCode, sName, sTip, sSelImg, sNormalImg, tIsUseLeafImg, sMoreInfo){
function TreeView_makeNode(sCode, sName, tIsCheck, sTip, sSelImg, sNormalImg, sMoreInfo){
  var voBuf= new StringBuffer();
  voBuf.append("<table>");
  voBuf.append(this.makeNodeTextBegin(sCode, sName, tIsCheck, this.isCodeAndName(),
                                   sTip, sSelImg, sNormalImg, this.isUseLeafImg(), false,
                                   sMoreInfo));
  voBuf.append(this.makeNodeTextEnd());
  voBuf.append("</table>");
  var voObjs= this.makeNewObjs(voBuf.toString());
  voBuf.clear();
  if (voObjs== null || voObjs.length== 0) return null;
  var voNode= voObjs[0].firstChild;
  return voNode;
}
//----------------------------------------------------------------------
//public; 插入子结点;
//return: 成功:true; 否则:false;
function TreeView_insertChildToTree(oPNode, oNewNode, iIndex, tIsAllowUpdateParentImg){
  //alert("TreeView_insertChildToTree();");
  if (oNewNode== null) return false;
  if (this.isValidNode(oNewNode)== false) return false;
  if (iIndex== null) iIndex= -1;
  if (tIsAllowUpdateParentImg== null) tIsAllowUpdateParentImg= true;

  var voTable= this.getChildContainer(oPNode);
  if (voTable== null){
    this.oNewPanel2.innerHTML= "";
    this.oNewPanel2.appendChild(oNewNode);
    var voBuf= new StringBuffer();
    voBuf.append(this.makeNodeContainerTextBegin());
    voBuf.append(this.makeNodeContainerTextEnd());
    var vaoNode= this.makeNewObjs(voBuf.toString());
    voBuf.clear();
    if (vaoNode== null || vaoNode.length== 0) return false;
    voTable= vaoNode[0];
    for (var i= 0; i< voTable.tBodies.length; i++){
      voTable.removeChild(voTable.tBodies[i]);
    }

    var voChildrenIcoTD= oPNode.firstChild.firstChild;
    voChildrenIcoTD.firstChild.src= this.IMG_RETRACT;
  }
  if (voTable== null) return false;
  oPNode.childNodes[1].childNodes[1].appendChild(voTable);
  if (voTable.tBodies.length<= iIndex || iIndex< 0){
    if (voTable.appendChild(oNewNode)== null) return false;
  }else{
    return this.insertNodeToTree(oNewNode, voTable.tBodies[iIndex], true);
  }

  if (tIsAllowUpdateParentImg){
    var vsPCode= this.getNodeCode(oPNode);
    if (this.getNodeSelImg(vsPCode)== this.sLeafSelImg){
      this.setNodeSelImg(vsPCode, this.sSelImg);
    }
    if (this.getNodeNormalImg(vsPCode)== this.sLeafNormalImg){
      this.setNodeNormalImg(vsPCode, this.sNormalImg);
    }
  }
  return true;
}
//----------------------------------------------------------------------
//public; 插入结点;
//return: 成功:true; 否则:false;
function TreeView_insertNodeToTree(oNewNode, oOldNode, tIsBefore){
  //if (this.isValidNode(oNewNode)== false) return false;
  //if (this.isValidNode(oOldNode)== false) return false;
  if (tIsBefore== null) tIsBefore= true;
  tIsBefore= PF.parseBool(tIsBefore);
  if (tIsBefore){
    oOldNode.parentNode.insertBefore(oNewNode, oOldNode);
    //if (oOldNode.insertAdjacentElement("beforeBegin", oNewNode)== null) return false;
  }else{
    if (oOldNode.insertAdjacentElement("afterEnd", oNewNode)== null) return false;
  }
  return true;
}
//----------------------------------------------------------------------
//public; 删除结点;
//return: 成功:true; 否则:false;
function TreeView_deleteNodeFromTree(oNode){
  if (oNode== null) return false;
  var voPTable= oNode.parentNode;
  voPTable.removeChild(oNode);
  oNode= null;
  if (voPTable.tBodies.length<= 0){
    voPTable.parentNode.removeChild(voPTable);
    voPTable= null;
  }
  return true;
}
//----------------------------------------------------------------------
//private; 根据 More 节点显示更多的结点;
//return: void;
function TreeView_showMore(oMoreNode){
  //alert("TreeView_showMore();");
  if (this.isMoreNode(oMoreNode)== false) return;
  var vaoNode= this.showMoreNodes(oMoreNode.morekey);

  if (vaoNode!= null && vaoNode.length> 0){
    var voNode= null;
    var voWhere= oMoreNode;
    for (var i= vaoNode.length- 1; i>= 0; i--){
      voNode= vaoNode[i];
      if (this.insertNodeToTree(voNode, voWhere, true)== false) break;
      voWhere= voNode;
    }
  }else{
    var voPNode= this.getNode(oMoreNode.morekey);
    var voChildrenIcoTD= voPNode.firstChild.firstChild;
    voChildrenIcoTD.firstChild.src= this.IMG_TRANSPARENT;
  }
  this.deleteNodeFromTree(oMoreNode);
  return;
}
//----------------------------------------------------------------------
//private; 根据 More 节点显示更多的结点;
//return: void;
function TreeView_showMoreNodes(sPCode){
  //alert("TreeView_showMoreNodes();");
  if (this.isRoot(sPCode)){
  	sPCode= "";
  }
  var newNodesHtm= this.makeNodeText(sPCode, 1);
  if (newNodesHtm== null || newNodesHtm.length< 40) return null;
  var voBuf= new StringBuffer();
  voBuf.append("<table>");
  voBuf.append(newNodesHtm);
  voBuf.append("</table>");
  var voObjs= this.makeNewObjs(voBuf.toString());
  voBuf.clear();
  if (voObjs== null || voObjs.length== 0) return null;
  return voObjs[0].childNodes;
}
//----------------------------------------------------------------------
//private; 生成新的结点对象集;
//return: 成功: node objects, 失败: null;
function TreeView_makeNewObjs(sHtml){
  if (sHtml== null || sHtml== "") return null;
  this.oNewPanel.innerHTML= "";
  this.oNewPanel.innerHTML= sHtml;
  var voObjs= this.oNewPanel.childNodes;
  return voObjs;
}
//----------------------------------------------------------------------
//private; 从 PageDataXML 中获取指定行对象、指定列名的值;
//return: 成功: 列值, 失败: "";
function TreeView_getRowValue(oRow, sFieldName){
  if (oRow== null) return "";
  if (sFieldName== null || sFieldName== "") return "";
  var voCol= oRow.selectSingleNode(sFieldName);
  if (voCol== null) return "";
  return voCol.text;
}
//----------------------------------------------------------------------
//private; 从 PageDataXML 中获取指定行对象、指定列名的值;
//return: void;
function TreeView_setRowValue(oRow, sFieldName, sValue){
  if (oRow== null) return;
  if (sFieldName== null || sFieldName== "") return;
  if (sValue== null) sValue= "";
  var voCol= oRow.selectSingleNode(sFieldName);
  if (voCol== null){
    voCol= oRow.ownerDocument.createElement(sFieldName);
    oRow.appendChild(voCol);
  }
  voCol.text= ""+ sValue;
  return;
}
//----------------------------------------------------------------------
//private; 设置结点的相应的 XML 中的值;
//return: void;
function TreeView_setNodeValue(sCode, sField, sName){
  if (this.isUpdateData()== false) return;
  if (this.isRoot(sCode)) return;
  var voDataRow= this.getNodeRow(sCode);
  /*
  if (voDataRow== null){
    Info.throws("数据错误;", this.CLASSNAME, "setNodeValue", new Array("有显示结点,没有发现相应的数据;\nkey: "+ voNodeMeta.sCode+ "\ncaption: "+ voNodeMeta.sName));
  }
  //*/
  if (voDataRow== null) return;
  if (PF.isEmpty(sField)) return;
  this.setRowValue(voDataRow, sField, sName);
  return;
}
//----------------------------------------------------------------------
//private; 设置结点的值;
//return: 成功: span object; 否则: null;
function TreeView_getNodeNameSpan(oNode){
  if (oNode== null) return null;
  var voSpan= oNode.firstChild.childNodes[this.getCapTDIndex()].firstChild;
  return voSpan;
}
//----------------------------------------------------------------------
//public; 设置结点的值;
//return: void;
function TreeView_setNodeName(sCode, sName){
  //alert("TreeView_setNodeName();");
  if (this.isRoot(sCode)){
    this.sRootText= sName;
  }else{
    this.setNodeValue(sCode, this.getNameField(), sName);
  }
  var voNode= this.getNode(sCode);
  if (voNode== null) return;
  var voSpan= this.getNodeNameSpan(voNode);
  if (voSpan== null) return;
  voSpan.innerText= sName;
}
//----------------------------------------------------------------------
//public; 设置结点的值;
//return: void;
function TreeView_setNodeTip(sCode, sTip){
  if (this.isRoot(sCode)){
    this.sRootTip= sName;
  }else{
    this.setNodeValue(sCode, this.getTipField(), sTip);
  }
  var voNode= this.getNode(sCode);
  if (voNode== null) return;
  voNode.tip= sTip;
}
//----------------------------------------------------------------------
//public; 获取结点的值;
//return: 成功: tip;否则: "";
function TreeView_getNodeTip(sCode){
  var voNodeMeta= this.getNodeMeta(sCode);
  if (voNodeMeta== null) return "";
  return voNodeMeta.sTip;
}
//----------------------------------------------------------------------
//public; 设置结点的值;
//return: void;
function TreeView_setNodeSelImg(sCode, sSelImg){
  this.setNodeValue(sCode, this.getSelImgField(), sSelImg);
  var voNode= this.getNode(sCode);
  if (voNode== null) return;
  if (PF.isEmpty(sSelImg)) sSelImg== this.sSelImg;
  var voTD= voNode.childNodes[0].all("OpenImgTD");
  voTD.selimg= sSelImg;
  if (voNode== this.oCurNode){
    voTD.firstChild.src= sSelImg;
  }
}
//----------------------------------------------------------------------
//public; 设置结点的值;
//return: void;
function TreeView_setNodeNormalImg(sCode, sNormalImg){
  this.setNodeValue(sCode, this.getNormalImgField(), sNormalImg);
  var voNode= this.getNode(sCode);
  if (voNode== null) return;
  if (PF.isEmpty(sNormalImg)) sNormalImg== this.sNormalImg;
  var voTD= voNode.childNodes[0].all("OpenImgTD");
  voTD.normalimg= sNormalImg;
  if (voNode!= this.oCurNode){
    voTD.firstChild.src= sNormalImg;
  }
}
//----------------------------------------------------------------------
//public; 获取结点的值;
//return: 成功:img src; 否则:"";
function TreeView_getNodeSelImg(sCode){
  var voNodeMeta= this.getNodeMeta(sCode);
  if (voNodeMeta== null) return "";
  return voNodeMeta.sSelImg;
}
//----------------------------------------------------------------------
//public; 获取结点的值;
//return: 成功:img src; 否则:"";
function TreeView_getNodeNormalImg(sCode){
  var voNodeMeta= this.getNodeMeta(sCode);
  if (voNodeMeta== null) return "";
  return voNodeMeta.sNormalImg;
}
//----------------------------------------------------------------------
//public; 获取结点的子结点的行数据;
//return: 成功:xml string; 否则:null;
function TreeView_getRoot(){
  return this.oRoot;
}
//----------------------------------------------------------------------
//public; 
//return: string;
function TreeView_getRootCode(){
  return this.sRootCode;
}
//----------------------------------------------------------------------
//public; 获取结点的子结点的行数据;
//return: 成功:xml string; 否则:null;
function TreeView_getNode(sCode, tIsCreateOnNotFound){
  var vsId= this.createNodeId(sCode);
  var voNode= this.oOuterPanel.all(vsId);
  if (voNode== null && tIsCreateOnNotFound){
    this.createNodeOnNotFound(sCode);
  }
  var voNode= this.oOuterPanel.all(vsId);
  return voNode;
}
//----------------------------------------------------------------------
//private;
//return: void;
function TreeView_createNodeOnNotFound(sCode){
  var voNode= this.getNode(sCode);
  if (voNode!= null) return;
  var vasCode= this.getParentCodes(sCode, this.MAX_LEVEL);
  if (vasCode== null) return;
  for (var i= vasCode.length- 1; i>= 0; i--){
    voNode= this.getNode(vasCode[i]);
    if (voNode== null) break;
    voFirst= this.getFirstChildForAppear(voNode);
    this.showMore(voFirst);
  }
  return;
}
//----------------------------------------------------------------------
//public; 
//return: row array / null;
function TreeView_getParentRows(sCode, iLevel){
  if (iLevel== null) iLevel= 1;
  if (this.isRoot(sCode)) return null;
  
  var vaoRow= new Array();
  var voRow= this.getNodeRow(sCode);
  if (voRow== null) return null;
  
  for (var i= 0; i< iLevel; i++){
    var voPCol= voRow.selectSingleNode(this.getPCodeField());
    if (voPCol== null) break;
    if (voPCol.text== null || voPCol.text== "") break;
    voRow= this.getNodeRow(voPCol.text);
    vaoRow[i]= voRow;
  }
  return vaoRow;
}  
//----------------------------------------------------------------------
//public; 
//return: row array / null;
function TreeView_getChildRows(sCode, iLevel){
  if (iLevel== null) iLevel= 1;

  var vaoRow= new Array();
  var voCol= null;
  
  if (iLevel== this.MAX_LEVEL){
    if (this.isRoot(sCode)){
      vaoRow= this.oTableData.selectNodes("rowset/row");
      return vaoRow;
    }
  }
  
  var vaoEle= new Array();
  vaoEle[0]= new Object();
  vaoEle[0].code= sCode;//this.getNodeCode(oNode);
  vaoEle[0].level= 0;

  for (var i= 0; i< vaoEle.length; i++){
    if (vaoEle[i].level>= iLevel) continue;
    var vaoNode= null;
    if (this.isRoot(vaoEle[i].code)){
      vaoNode= this.oTableData.selectNodes("rowset/row["+ this.getPCodeField()+ " = '' or not("+ this.getPCodeField()+ ")]");
    }else{
      vaoNode= this.oTableData.selectNodes("rowset/row["+ this.getPCodeField()+ " = '"+ vaoEle[i].code+ "']");
    }
    if (vaoNode== null) continue;
    
    for (var k= 0; k< vaoNode.length; k++){
      if (vaoNode[k]== null) continue;
      vaoRow[vaoRow.length]= vaoNode[k];
      voCol= vaoNode[k].selectSingleNode(this.getCodeField());
      if (voCol== null) continue;

      var voEle= new Object();
      voEle.code= voCol.text;
      voEle.level= vaoEle[i].level+ 1;
      vaoEle[vaoEle.length]= voEle;
    }
  }
  vaoEle.length= 0;
  vaoEle= null;
  return vaoRow;
}  
//----------------------------------------------------------------------
//public; 获取结点的子结点的行数据;
//return: new Array(asField, axxsValue)/ null;
function TreeView_getData(sCode, tIsOnlyChecked, tIsOnlyLeaf, iLevel, asField){
  var vaoRow= this.getDataK(sCode, tIsOnlyChecked, tIsOnlyLeaf, iLevel);
  if (vaoRow== null) return null;
  if (asField== null){
    var voTableMeta= DataTools.getTableMeta(this.getTableName());
    if (voTableMeta!= null){
      asField= DataTools.getFieldNames(this.getTableName());
    }
  }
  var va2xsValue= DataTools.rowsToA2x(vaoRow, asField);
  return va2xsValue;
}  
//----------------------------------------------------------------------
//public; 获取结点的子结点的行数据;
//return: 成功:xml string; 否则:null;
function TreeView_getDataWithXml(sCode, tIsOnlyChecked, tIsOnlyLeaf, iLevel){
  var vaoRow= this.getDataK(sCode, tIsOnlyChecked, tIsOnlyLeaf, iLevel);
  if (vaoRow== null) return null;
  
  var voBuf= new StringBuffer();
  voBuf.append("<"+ this.getTableName()+ ">\n");
  voBuf.append("<meta></meta>\n");
  voBuf.append("<rowset>\n");
  for (var i= 0; i< vaoRow.length; i++){
    voBuf.append(vaoRow[i].xml);
    voBuf.append("\n");
  }
  voBuf.append("</rowset>\n");
  voBuf.append("</"+ this.getTableName()+ ">\n");
  return voBuf.toString();
}
//----------------------------------------------------------------------
//public; 获取结点的子结点的行数据;
//return: row node array / null;
function TreeView_getDataK(sCode, tIsOnlyChecked, tIsOnlyLeaf, iLevel){
  tIsOnlyChecked= PF.parseBool(tIsOnlyChecked);
  tIsOnlyLeaf= PF.parseBool(tIsOnlyLeaf);
  if (iLevel== null) iLevel= this.MAX_LEVEL;

  var vaoRow= this.getChildRows(sCode, iLevel);
  var voCol= null;
  
  if (tIsOnlyChecked 
      && this.isExistCheck() 
      && this.getCheckField()!= null 
      && this.getCheckField()!= ""){
    var vaoRow2= new Array();
    for (var i= 0; i< vaoRow.length; i++){
      voCol= vaoRow[i].selectSingleNode(this.getCheckField());
      if (voCol== null) continue;
      if (voCol.text!= this.getCheckedValue()) continue;
      vaoRow2[vaoRow2.length]= vaoRow[i];
    }
    vaoRow= null;
    vaoRow= vaoRow2;
    vaoRow2= null;
  }
  
  if (tIsOnlyLeaf){
    var vaoRow2= new Array();
    var voTmpNode= null;
    for (var i= 0; i< vaoRow.length; i++){
      voCol= vaoRow[i].selectSingleNode(this.getCodeField());
      if (voCol== null) continue;
      var voTmpNode= this.oTableData.selectSingleNode("rowset/row["+ this.getPCodeField()+ " = '"+ voCol.text+ "']");
      if (voTmpNode!= null) continue;
      vaoRow2[vaoRow2.length]= vaoRow[i];
    }
    vaoRow= null;
    vaoRow= vaoRow2;
    vaoRow2= null;
  }
  
  return vaoRow;
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function TreeView_isExistCheck(){
  return PF.parseBool(this.oOuterPanel.isexistcheck);
}
//----------------------------------------------------------------------
//public;
function TreeView_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public;
function TreeView_setTableName(sTableName){
  this.oOuterPanel.tablename= sTableName;
}
//----------------------------------------------------------------------
//public;
function TreeView_getCheckField(){
  return this.oOuterPanel.checkfield;
}
//----------------------------------------------------------------------
//public;
function TreeView_getMakeType(){
  return PF.parseInt(this.oOuterPanel.maketype);
}
//----------------------------------------------------------------------
//public;
function TreeView_setMakeType(iMakeType){
  this.oOuterPanel.maketype= iMakeType;
}
//----------------------------------------------------------------------
//public;
function TreeView_getPageSize(){
  return PF.parseInt(this.oOuterPanel.pagesize);
}
//----------------------------------------------------------------------
//public;
function TreeView_setPageSize(iPageSize){
  this.oOuterPanel.pagesize= iPageSize;
}
//----------------------------------------------------------------------
//public;
function TreeView_getCodeField(){
  return this.oOuterPanel.codefield;
}
//----------------------------------------------------------------------
//public;
function TreeView_getNameField(){
  return this.oOuterPanel.namefield;
}
//----------------------------------------------------------------------
//public;
function TreeView_getPCodeField(){
  return this.oOuterPanel.pcodefield;
}
//----------------------------------------------------------------------
//public;
function TreeView_getTipField(){
  return this.oOuterPanel.tipfield;
}
//----------------------------------------------------------------------
//public;
function TreeView_getCheckedValue(){
  return this.oOuterPanel.checkedvalue;
}
//----------------------------------------------------------------------
//public;
function TreeView_getUncheckedValue(){
  return this.oOuterPanel.uncheckedvalue;
}
//----------------------------------------------------------------------
//public;
function TreeView_getSelImgField(){
  return this.oOuterPanel.selimgfield;
}
//----------------------------------------------------------------------
//public;
function TreeView_getNormalImgField(){
  return this.oOuterPanel.normalimgfield;
}
//----------------------------------------------------------------------
//public;
function TreeView_isUseLeafImg(){
  return PF.parseBool(this.oOuterPanel.isuseleafimg);
}
//----------------------------------------------------------------------
//public;
function TreeView_isCodeAndName(){
  return PF.parseBool(this.oOuterPanel.iscodeandname);
}
//----------------------------------------------------------------------
//public;
function TreeView_isAutoAppear(){
  return PF.parseBool(this.oOuterPanel.isautoappear);
}
//----------------------------------------------------------------------
//public;
function TreeView_setAutoAppear(tValue){
  this.oOuterPanel.isautoappear= tValue;
}
//----------------------------------------------------------------------
//public;
function TreeView_isReadOnly(){
  return PF.parseBool(this.oOuterPanel.disabled);
}
//----------------------------------------------------------------------
//public;
function TreeView_setReadOnly(tIsReadOnly){
  this.oOuterPanel.disabled= tIsReadOnly;
}
//----------------------------------------------------------------------
//public;
function TreeView_isRelaParent(){
  return PF.parseBool(this.oOuterPanel.isrelaparent);
}
//----------------------------------------------------------------------
//public;
function TreeView_setRelaParent(tIsRela){
  this.oOuterPanel.isrelaparent= tIsRela;
}
//----------------------------------------------------------------------
//public;
function TreeView_isRelaChildren(){
  return PF.parseBool(this.oOuterPanel.isrelachildren);
}
//----------------------------------------------------------------------
//public;
function TreeView_setRelaChildren(tIsRela){
  this.oOuterPanel.isrelachildren= tIsRela;
}
//----------------------------------------------------------------------
//public;
function TreeView_getTabIndex(){
  return PF.parseInt(this.oOuterPanel.tabindex);
}
//----------------------------------------------------------------------
//public;
function TreeView_setTabIndex(iTabIndex){
  this.oOuterPanel.tabindex= iTabIndex;
}
//----------------------------------------------------------------------
//public;
function TreeView_getInitLevel(){
  return PF.parseInt(this.oOuterPanel.initlevel);
}
//----------------------------------------------------------------------
//public;
function TreeView_isCollapseOnDblClick(){
  return PF.parseBool(this.oOuterPanel.iscollapseondblclick);
}
//----------------------------------------------------------------------
//public;
function TreeView_isUpdateData(){
  return PF.parseBool(this.oOuterPanel.isupdatedata);
}
//----------------------------------------------------------------------
//public;
function TreeView_setUpdateData(tIsUpdateData){
  this.oOuterPanel.isupdatedata= tIsUpdateData;
}
//----------------------------------------------------------------------
//private;
function TreeView_convertCheckedValue(tValue){
  if (tValue) return this.getCheckedValue();
  return this.getUncheckedValue();
}
//----------------------------------------------------------------------

//----------------------------------------------------------------------
//7.事件响应区 =function();
//----------------------------------------------------------------------
//private; Base 的事件响应; OnClick;
//return: void;
function TreeView_eventAnswer_OnClick(oSender, oEvent){
  //alert("TreeView_eventAnswer_OnClick();");
  var voTag= this.getNodeEventTD(event.srcElement);
  if (voTag!= null){
    var voNode= voTag.parentNode.parentNode;
    var vsCode= this.getNodeCode(voNode);
    if (this.isMoreNode(voNode)) this.showMore(voNode);
    else if (voTag.id== "RCImgTD"){
      if (this.isCollapse(voNode)) this.retract(vsCode);
      else this.collapse(vsCode);
    }else if (voTag.id== "OpenImgTD"){
      this.setCurNode(voNode);
      //事件;
      if (PF.isExistMethodK(this.eventAnswer_OnNodeClick)){
        this.eventAnswer_OnNodeClick(this, vsCode, event);
      }
      this.fireEvent(this.OnNodeClick, new Array(this, vsCode, event));
    }else if (voTag.id== "CapTD" && event.srcElement.nodeName== "SPAN"){
      this.setCurNode(voNode);
      //事件;
      if (PF.isExistMethodK(this.eventAnswer_OnNodeClick)){
        this.eventAnswer_OnNodeClick(this, vsCode, event);
      }
      this.fireEvent(this.OnNodeClick, new Array(this, vsCode, event));
    }else if (voTag.id== "CheckTD"){
      var voCheckBox= voTag.firstChild;
      this.checkNodeK(vsCode, voCheckBox.checked, true);
    }
  }
  this.oTipBar.setVisible(false);
}
//----------------------------------------------------------------------
//private; Base 的事件响应; OnDblClick;
//return: void;
function TreeView_eventAnswer_OnDblClick(oSender, oEvent){
  var voTag= this.getNodeEventTD(event.srcElement);
  if (voTag!= null){
    if (voTag.id== "OpenImgTD" || voTag.id== "CapTD"){
      var voNode= voTag.parentNode.parentNode;
      var vsCode= this.getNodeCode(voNode);
      if (this.isCollapseOnDblClick()){
        if (this.isCollapse(voNode)) this.retract(vsCode);
        else this.collapse(vsCode);
      }

      //事件;
      if (PF.isExistMethodK(this.eventAnswer_OnNodeDblClick)){
        this.eventAnswer_OnNodeDblClick(this, vsCode, event);
      }
      this.fireEvent(this.OnNodeDblClick, new Array(this, vsCode, event));
    }
  }
}
//----------------------------------------------------------------------
//private; Base 的事件响应;
//return: void;
function TreeView_eventAnswer_OnMouseMove(oSender, oEvent){
  var voTag= this.getNodeEventTD(event.srcElement);
  if (voTag!= null){
    var voNode= voTag.parentNode.parentNode;
    if (voTag.id== "CapTD" && event.srcElement.nodeName== "SPAN"){
      if (PF.isEmpty(voNode.tip)== false){
        this.oTipBar.setText(voNode.tip);
        if (this.oTipBar.isVisible()== false) this.oTipBar.setVisible(true);
      }else{
        this.oTipBar.setVisible(false);
      }
    }else{
      this.oTipBar.setVisible(false);
    }
  }else{
    this.oTipBar.setVisible(false);
  }
}
//----------------------------------------------------------------------
//private; Base 的事件响应;
//return: void;
function TreeView_eventAnswer_OnMouseOut(oSender, oEvent){
  this.oTipBar.setVisible(false);
}
//----------------------------------------------------------------------
//private; 事件源 id 是什么;
//return: 成功: RCImgTD/ OpenImgTD/ CapTD; 否则: null;
function TreeView_getNodeEventTD(oEle){
  if (oEle== null) return null;
  var voTag= null;
  if (oEle.nodeName== "TD" && oEle.id== "CapTD") voTag= oEle;
  else{
    voTag= oEle.parentNode;
  }
  if (voTag.nodeName== "TD" && voTag.id== "RCImgTD") return voTag;
  if (voTag.nodeName== "TD" && voTag.id== "CheckTD") return voTag;
  if (voTag.nodeName== "TD" && voTag.id== "OpenImgTD") return voTag;
  if (voTag.nodeName== "TD" && voTag.id== "CapTD") return voTag;
  return null;
}
//----------------------------------------------------------------------

function TreeView_release() {
	var innerPanel = this.oInnerPanel;
	if (innerPanel != null) {
		innerPanel.oOwner = null;
	}
	if (this.oTA != null) {
  	this.oTA.oOwner = null;
	}
	if (this.oRoot!= null) {
  	this.oRoot.oOwner = null;
	}
	this.oInnerPanel.innerHTML = "";
	this.oTipBar.release();
	removeAllNode(this.oInnerPanel);
	Base_release.call(this);
}

function TreeView_disposeDataForRoot(){
  var voTableData= DataTools.getTableData(this.getTableName());
  if (voTableData== null) return;
  var voRowSet= voTableData.selectSingleNode("rowset");
  for (var i= 0, len= voRowSet.childNodes.length; i< len; i++){
    var voPCode= voRowSet.childNodes[i].selectSingleNode(this.getPCodeField());
    if (voPCode== null) continue;
    if (voPCode.text == "") return;
    if (voRowSet.selectSingleNode("row[" + this.getCodeField() + "='"+ voPCode.text+ "']")== null){
      voPCode.text= "";
    }
  }
  return;
}

function removeAllNode(node) {
	if (node.hasChildNodes(node)) {
		for (var i=node.childNodes.length-1;  i>-1; i--) {
			removeAllNode(node.childNodes[i]);
		}
	}
	node.parentNode.removeChild(node);
	node.onclick = null;
}



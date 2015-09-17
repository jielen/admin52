/*
Title: gp.page.PaginationConsole
Description:
���ݷ�ҳ����̨�࣬���ڶ� XML �����ݽ��з�ҳ��ȡ����;
Company: ��������
*/

//----------------------------------------------------------------------
function PaginationConsole(){
  Base.call(this);
  this.CLASSNAME= "gp.page.PaginationConsole";

  this.sName= this.CLASSNAME;  //��������.
  this.oOuterObj= null;        //�ⲿ����;
  this.oDataXML= null;    //private; �����Ƶ� XML ����Դ��

  this.oOuterPanel= null; //private; �ⲿ���,������ PaginationConsole �Ļ���ƽ̨.
  this.oLayoutTable= null;//private; �����õ� <table>;
  this.oInfoCell= null;   //private; ��Ϣ��ʾ�õĵ�Ԫ��;
  this.oJumpBox= null;    //private; ת���ڼ�ҳ�������;
  this.oGoButton= null;   //private; ִ��ת��İ�ť;

  this.oFirstButton= null;//private; ��ͷ���.ָ HeadDiv.
  this.oPreButton= null;  //private; �������.ָ BodyDiv.
  this.oNextButton= null; //private; ��ͷ�� <table>.
  this.oLastButton= null; //private; ����� <table>.
  
  this.sCondition= "";    //private;
  this.sAdvOrderBy= "";   //private;

  this.iCurRow= -1;       //private; ��ǰ��;��ֵ���ⲿ�Ķ������,һ��Ϊ Grid;
  this.iTopPadding= 2;

  this.tHasInit= false; //�����Ƿ�ʼ���ı�־;

  //private; ������ҳ���еķ�ҳ;liubo
  this.iCurPage= 1;
  this.iFromRow= 0;
  this.iToRow= 0;
  this.iRowCountOfDB= -1;

  this.OnBeforeGo= "OnBeforeGo";  //����: oSender;
  this.OnAfterGo= "OnAfterGo";    //����: oSender.;

  //public;

  //private;
  this.init= PaginationConsole_init;
  this.resize = PaginationConsole_resize;
  this.setCurRow = PaginationConsole_setCurRow;
  this.getTableName= PaginationConsole_getTableName;
  this.setTableName= PaginationConsole_setTableName;
  this.getPageSize= PaginationConsole_getPageSize;
  this.setPageSize= PaginationConsole_setPageSize;
  this.isPagiAtClient= PaginationConsole_isPagiAtClient;
  this.setPagiAtClient= PaginationConsole_setPagiAtClient;
  
  this.getCondition= PaginationConsole_getCondition;
  this.setCondition= PaginationConsole_setCondition;
  
  this.getAdvOrderBy= PaginationConsole_getAdvOrderBy;
  this.setAdvOrderBy= PaginationConsole_setAdvOrderBy;

  this.make = PaginationConsole_make;
  this.addEventAnswer= PaginationConsole_addEventAnswer;
  this.getPageData = PaginationConsole_getPageData;
  this.refreshInfo = PaginationConsole_refreshInfo;
  this.getPageData2= PaginationConsole_getPageData2;
  this.refreshInfo2= PaginationConsole_refreshInfo2;
  this.refreshData= PaginationConsole_refreshData;
  
  this.release = PaginationConsole_release;
  this.getMetaAttribute = PaginationConsole_getMetaAttribute;
  this.pageSelect = new Array();
}
//----------------------------------------------------------------------
//public;
//return: true/false;
function PaginationConsole_init(tIsFinalClass){
  //alert("PaginationConsole_init();");
  if (typeof (tIsFinalClass)== "undefined" || tIsFinalClass== null) tIsFinalClass= true;
  if (Base_init.call(this, false)== false) return false;
  this.oDataXML= DataTools.getDataXML(this.getTableName());
  if (tIsFinalClass) this.setInitMark();
  if (this.isPagiAtClient()){
  	var root = this.oDataXML.XMLDocument;/////
  	var metaNode = root.selectSingleNode("/*/meta");
  	var totalcount = metaNode.getAttribute("rowcountofdb");
		if(parseInt(totalcount) > 0)
    	this.getPageData2("first");
  }
  this.refreshInfo();
  return true;
}
//----------------------------------------------------------------------
//public; ���������Ĵ�С.
//����ֵ:�ɹ�: true, ʧ��: false;
function PaginationConsole_resize(){
  if (this.tHasInit== false) Info.throws("������δ��ʼ�����ʼ�����ɹ�;", this.CLASSNAME, "resize");
  if (this.tIsResizing) return;
  this.tIsResizing= true;

  if (this.oRect.iWidth< 100) this.oRect.iWidth= 100;
  if (this.oRect.iHeight!= 22+ this.iTopPadding) this.oRect.iHeight= 22+ this.iTopPadding;

  this.oOuterPanel.style.left= this.oRect.iLeft;
  this.oOuterPanel.style.top= this.oRect.iTop;
  this.oOuterPanel.style.width= this.oRect.iWidth;
  this.oOuterPanel.style.height= this.oRect.iHeight;

  this.tIsResizing= false;
  return true;
}
//----------------------------------------------------------------------
//public; ���� PaginationConsole �� HTML DOM ����;
//����ֵ:�ɹ�: true, ʧ��: false;
function PaginationConsole_make(oOuterPanel){
  //alert("PaginationConsole.make");
  if (oOuterPanel== null) return false;
  //�ȴ��� oOuterPanel,Ȼ����ƴ��,��HTML�����뵽oOuterPanel��;
  this.oRect= new Rect(0, 0, 517, 22+ this.iTopPadding);
  this.oOuterPanel= oOuterPanel;
  this.oLayoutTable= this.oOuterPanel.all("LayoutTable");
  this.oInfoCell= this.oOuterPanel.all("InfoCellTD");
  this.oJumpBox= this.oOuterPanel.all("JumpTextBox");
  this.oGoButton= this.oOuterPanel.all("GoButton");

  this.oFirstButton= this.oOuterPanel.all("FirstButton");
  this.oPreButton= this.oOuterPanel.all("PreviousButton");
  this.oNextButton= this.oOuterPanel.all("NextButton");
  this.oLastButton= this.oOuterPanel.all("LastButton");

  this.oOuterPanel.oOwner= this;
  this.oGoButton.oOwner= this;
  this.oFirstButton.oOwner= this;
  this.oPreButton.oOwner= this;
  this.oNextButton.oOwner= this;
  this.oLastButton.oOwner= this;

  this.addEventAnswer();  //�����¼���Ӧ;�����⴫��ͨ���¼�;
  return true;
}
//----------------------------------------------------------------------
//private; �����¼���Ӧ;
//����ֵ: �ɹ�: true, ʧ��: false;
function PaginationConsole_addEventAnswer(){
  this.oGoButton.onclick= function(){
    this.oOwner.getPageData("to");
  }
  this.oFirstButton.onclick= function(){
    this.oOwner.getPageData("first");
  }
  this.oLastButton.onclick= function(){
    this.oOwner.getPageData("last");
  }
  this.oPreButton.onclick= function(){
    this.oOwner.getPageData("prev");
  }
  this.oNextButton.onclick= function(){
    this.oOwner.getPageData("next");
  }

  return true;
}
//----------------------------------------------------------------------
function PaginationConsole_getPageData2(direction){
  //alert("PaginationConsole_getPageData2();");
  this.iRowCountOfDB= DataTools.getTableRowCount(this.getTableName());
  var viPageCount= parseInt(this.iRowCountOfDB/ this.getPageSize());
  if (this.iRowCountOfDB % this.getPageSize()> 0) viPageCount++;
  var viPageIndex= 0;
  switch(direction){
    case "to":
      viPageIndex= parseInt(this.oJumpBox.value);
      if (isNaN(viPageIndex)){
        this.oJumpBox.value="";
        alert("������������ȷ��ҳ�룡");
        return false;
      }
      if (viPageIndex<= 0) viPageIndex= 1;
      if (viPageIndex> viPageCount) viPageIndex= viPageCount;
      break;
    case "first":
      viPageIndex= 1;
      break;
    case "last":
      viPageIndex= viPageCount;
      break;
    case "prev":
      viPageIndex= this.iCurPage- 1;
      if (viPageIndex<= 0) viPageIndex= 1;
      break;
    case "next":
      viPageIndex= this.iCurPage+ 1;
      if (viPageIndex> viPageCount) viPageIndex= viPageCount;
      break;
  }
  if (viPageIndex== this.iCurPage) return false;
  
  //�����¼�;OnBeforeGo;
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeGo)){
    this.eventAnswer_OnBeforeGo(this);
  }
  if (this.isAbortEvent()) return false;
  this.fireEvent(this.OnBeforeGo, new Array(this));
  if (this.isAbortEvent()) return false;

  this.iCurPage= viPageIndex;
  this.iFromRow= (this.iCurPage- 1)* this.getPageSize()+ 1;
  if (this.iRowCountOfDB- this.iFromRow> this.getPageSize()){
    this.iToRow= this.iFromRow+ this.getPageSize()- 1;
  }else{
    this.iToRow= this.iRowCountOfDB;
  }
  this.refreshInfo2();

  //�����¼�;OnAfterGo;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterGo)){
    this.eventAnswer_OnAfterGo(this);
  }
  this.fireEvent(this.OnAfterGo, new Array(this));
  return true;
}
//----------------------------------------------------------------------
function PaginationConsole_getPageData(direction){
  //---------------------------------------------
  
  
  if (this.isPagiAtClient()) return this.getPageData2(direction);
  if (null == this.oDataXML){
    this.oDataXML = DataTools.getDataXML(this.getTableName());
  }
  /*
  var componame = DataTools.getCompoName();
  if (!componame) return false;

  var condition = ""; // TODO
  var pagesize = this.getPageSize();
  var currentpage = 0;
  if ("to" == direction){
    currentpage = this.oJumpBox.value;
  } else{
    var root = this.oDataXML.XMLDocument;
    //*/
    //var metaNode = root.selectSingleNode("/*/meta");
    /*
    if (metaNode){
      currentpage = metaNode.getAttribute("pageindex");
    }
  }
  var param = encodeParams("componame", componame,
                           "condition", condition,
                           "pagesize", pagesize,
                           "currentpage", currentpage,
                           "direction", direction);
  var newsrc = "Proxy?function=getlistpagedata&" + param;
  //*/

  //���� Search ����;
  /*
  var vaoSearch= PageX.getFreeManager().getSearchByTableName(this.getTableName());
  if (vaoSearch!= null){
    var vsCond= "";
    var vsTmp= "";
    for (var i= 0, len= vaoSearch.length; i< len; i++){
      if (vaoSearch[i]== null) continue;
      vsTmp= vaoSearch[i].getCondition();
      if (PF.isEmpty(vsTmp)) continue;
      if (i> 0 && i< len- 1) vsCond+= " and ";
      vsCond+= "("+ vsTmp+ ")";
    }
    this.setCondition(vsCond);
  }
  //*/
  this.setCondition(PageX.getListConditionK(this.getTableName()));
  this.setAdvOrderBy(PageX.getAdvOrderBy(this.getTableName()));
  
  //this.oDataXML.src = newsrc;
  this.refreshData(direction);
  return true;
}
//----------------------------------------------------------------------
//private;
//return: void;
function PaginationConsole_refreshData(direction){
  //var componame = DataTools.getMainCompoName();
  var componame= DataTools.getCompoNameByTable(this.getTableName());
  if (!componame) return false;

  //�����¼�;OnBeforeGo;
  this.abortEvent(false);
  if (PF.isExistMethodK(this.eventAnswer_OnBeforeGo)){
    this.eventAnswer_OnBeforeGo(this);
  }
  if (this.isAbortEvent()) return false;
  if (this.isAbortEvent()) return false;
  var root = this.oDataXML.XMLDocument;
  var metaNode = root.selectSingleNode("/*/meta");
  var sqlid = metaNode.getAttribute("sqlid");
  var condition = metaNode.getAttribute("condition");
  var searchCond = metaNode.getAttribute("searchCond");
  var totalcount = metaNode.getAttribute("rowcountofdb");
  var userNumLimCondition = metaNode.getAttribute("userNumLimCondition");
  var isencryptdata = metaNode.getAttribute("isencryptdata");
  
  ////var condition = this.getCondition();
  var pagesize = this.getPageSize();
  var currentpage = 0;
  if ("to" == direction){
    currentpage = this.oJumpBox.value;
  } else{
    if (metaNode){
      currentpage = metaNode.getAttribute("pageindex");
    }
  }
  //add by liubo
  this.fireEvent(this.OnBeforeGo, new Array(this, this.iCurPage));
  if (direction == "prev") {
  	if (currentpage <=1) {
  		return;
  	}
  }
  if(direction == "next" && pagesize && currentpage){
  	var iTotalCount = parseInt(pagesize) * parseInt(currentpage);
  	if(iTotalCount >= parseInt(totalcount))
  		return;
  }
  
  if (direction == "last" || direction == "first") {
  	if (totalcount <=pagesize) {
  		return;
  	}
  }
  
  var voSearchType = "pagination";	
  var vaoSearch= PageX.getFreeManager().getSearchByTableName(this.getTableName());
  if (vaoSearch!= null){
  	if(vaoSearch.length > 0 && vaoSearch[0].searchType == "advancedSearch"){
  	  voSearchType = "advancedPagination";
  	}
  }
  
  var vsAdvOrderBy= this.getAdvOrderBy();
  var vasParamName= new Array("condition", "tablename","searchCond", "pagesize", "currentpage", "direction", "sqlid", "totalcount", "type", "userNumLimCondition");
  var vasParamValue= new Array(condition, this.getTableName(), searchCond, pagesize, currentpage, direction, sqlid, totalcount, voSearchType, userNumLimCondition);
	
  var vsResponseText= Info.requestDataK("getlistpagedata", componame, vasParamName, vasParamValue);
    
  if (vsResponseText== null) return;
  if (vsResponseText.indexOf("<row>")> 0){
    var viValid= DataTools.isValidXMLData(this.oDataXML);
    if (viValid== DataTools.DATA_EMPTY) {
      alert("PageDataXML ����Ϊ��!");
      return;
    }
    else if (viValid== DataTools.DATA_EXCEPTION) {
      alert("PageDataXML ���ݴ���!\n"+ this.oDataXML.xml);
      return;
    }
    this.oDataXML.loadXML(vsResponseText);
  }

  //�����¼�;OnAfterGo;
  if (PF.isExistMethodK(this.eventAnswer_OnAfterGo)){
    this.eventAnswer_OnAfterGo(this);
  }
  //add by liubo
  if (direction == "to") {
  	if (this.oJumpBox.value < totalcount) {
  		this.iCurPage = this.oJumpBox.value;
  	} else {
  		this.iCurPage = totalcount;
  	}
  }
  if (direction == "next") {
  	var temp = this.iCurPage + 1;
  	if (temp < totalcount) {
  		this.iCurPage = temp;
  	} else {
  		this.iCurPage = totalcount;
  	}
  }
  if (direction == "prev") {
  	var temp = this.iCurPage - 1;
  	if (temp > 0) {
  		this.iCurPage = temp;
  	} else {
  		this.iCurPage = 1;
  	}
  }
  if (direction == "first") {
  	this.iCurPage = 1;
  }
  if (direction == "last") {
  	this.iCurPage = totalcount;
  }
  this.fireEvent(this.OnAfterGo, new Array(this));
  return;
}
//----------------------------------------------------------------------
//public; ˢ����ʾ��Ϣ;
// meta ����:
// <meta pageindex="1" fromrow="1" torow="4" rowcountofpage="15" rowcountofdb="100" />
//��ʽ: 102 / 100-199 / 1008 ��  2 / 11 ҳ;
//����ֵ:�ɹ�: true, ʧ��: false;
function PaginationConsole_refreshInfo(){
  //alert("PaginationConsole_refreshInfo();");
  if (this.isPagiAtClient()) return this.refreshInfo2();
  //var sInfoCell = "" + (this.iCurRow+ 1);
  var sInfoCell= "";// + (this.iCurRow+ 1);
  var currentpage = 0;
  if (null == this.oDataXML){
    this.oDataXML = DataTools.getDataXML(this.getTableName());
  }
  if ("complete" != this.oDataXML.readyState){
    sInfoCell = this.oDataXML.readyState;
  }else{
    var root = this.oDataXML.XMLDocument;
    var metaNode = root.selectSingleNode("/*/meta");
    if (metaNode){
      currentpage = metaNode.getAttribute("pageindex");
      var pagesize = metaNode.getAttribute("rowcountofpage");
      var fromrow = metaNode.getAttribute("fromrow");
      var torow = metaNode.getAttribute("torow");
      var rowcountofdb = metaNode.getAttribute("rowcountofdb");
      var viPageCount= parseInt(rowcountofdb/ pagesize);
      if (rowcountofdb % pagesize> 0) viPageCount++;
      if (isNaN(viPageCount)) viPageCount= 0;
      sInfoCell+= (parseInt(this.iCurRow)+ parseInt(fromrow));
      if (this.iCurRow< 0) sInfoCell= "";
      //sInfoCell+= (parseInt(this.iCurRow)+ parseInt(fromrow))+ " / " + rowcountofdb
      //  + " ��  �� " + currentpage + " ҳ";
      sInfoCell+= " / " + fromrow + "-" + torow + " / " + rowcountofdb
               +  " ��  " + currentpage + " / "+ viPageCount+ " ҳ";
        //+ " ��  �� " + currentpage + " ҳ";
    }
  }

  this.oInfoCell.innerText = sInfoCell;
  this.oJumpBox.value = currentpage;
  return true;
}
//----------------------------------------------------------------------
//private; ˢ����ʾ��Ϣ;
// meta ����:
// <meta pageindex="1" fromrow="1" torow="4" rowcountofpage="15" rowcountofdb="4" />
//��ʽ: 102 / 100-199 / 1008 ��  2 / 11 ҳ;
//����ֵ:�ɹ�: true, ʧ��: false;
function PaginationConsole_refreshInfo2(){
  this.iRowCountOfDB= DataTools.getTableRowCount(this.getTableName());
  var viPageCount= parseInt(this.iRowCountOfDB/ this.getPageSize());
  if (this.iRowCountOfDB % this.getPageSize()> 0) viPageCount++;
  if (isNaN(viPageCount)) viPageCount= 0;
  var vsInfoCell = "" + (this.iCurRow+ this.iFromRow);
  if (this.iCurRow< 0) vsInfoCell= "";
  //vsInfoCell+= " / " + this.iRowCountOfDB
  //          +  " ��  " + this.iCurPage + " / "+ viPageCount+ " ҳ";
  vsInfoCell+= " / " + this.iFromRow + "-" + this.iToRow + " / " + this.iRowCountOfDB
            +  " ��  " + this.iCurPage + " / "+ viPageCount+ " ҳ";
  this.oInfoCell.innerText = vsInfoCell;
  this.oJumpBox.value = this.iCurPage;
  return true;
}
//----------------------------------------------------------------------
//public; ���õ�ǰ��;
//return: void;
function PaginationConsole_setCurRow(iRow){
  this.iCurRow = iRow;
  this.refreshInfo();
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_getTableName(){
  return this.oOuterPanel.tablename;
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_setTableName(sTableName){
  this.oOuterPanel.tablename= sTableName;
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_getPageSize(){
  return PF.parseInt(this.oOuterPanel.pagesize);
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_setPageSize(iPageSize){
  this.oOuterPanel.pagesize= iPageSize;
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_isPagiAtClient(){
  return PF.parseBool(this.oOuterPanel.ispagiatclient);
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_setPagiAtClient(tIsPagiAtClient){
  this.oOuterPanel.ispagiatclient= tIsPagiAtClient;
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_getCondition(){
  return this.sCondition;
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_setCondition(sCondition){
  this.sCondition= sCondition;
  if (this.sCondition== null) this.sConditon= "";
}
//----------------------------------------------------------------------
//public;
function PaginationConsole_setAdvOrderBy(sAdvOrderBy){ 
  this.sAdvOrderBy= sAdvOrderBy;
  if (this.sAdvOrderBy== null) this.sAdvOrderBy= "";	
}	
//----------------------------------------------------------------------
//public;
function PaginationConsole_getAdvOrderBy(){
  return this.sAdvOrderBy;
}

function PaginationConsole_getAdvOrderBy(){
  return this.sAdvOrderBy;
}

function PaginationConsole_release() {
	this.oDataXML = null;
	if (this.oLayoutTable != null) {
		this.oLayoutTable.oOwner = null;
	}
	if (this.oInfoCell != null) {
		this.oInfoCell.oOwner = null;
	}
	if (this.oJumpBox != null) {
		this.oJumpBox.oOwner = null;
	}
	if (this.oGoButton != null) {
		this.oGoButton.oOwner = null;
		this.oGoButton.onclick = null;
	}	
	if (this.oFirstButton != null) {
		this.oFirstButton.oOwner = null;
		this.oFirstButton.onclick = null;
	}
	if (this.oPreButton != null) {
		this.oPreButton.oOwner = null;
		this.oPreButton.onclick = null;
	}
	if (this.oNextButton != null) {
		this.oNextButton.oOwner = null;
		this.oNextButton.onclick = null;
	}
	if (this.oLastButton != null) {
		this.oLastButton.oOwner = null;
		this.oLastButton.onclick = null;
	}
	Base_release.call(this);
}

function PaginationConsole_getMetaAttribute(attrName) {
	var root = this.oDataXML.XMLDocument;
  var metaNode = root.selectSingleNode("/*/meta");
  return metaNode.getAttribute(attrName);
}

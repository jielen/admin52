<%@ page language="java" contentType="text/html;charset=GBK"%>
<%@ page import="java.util.*" %>
<%@ page import="org.apache.log4j.Logger" %>
<%@ page import="com.anyi.gp.access.PageDataProvider"%>
<%@ page import="com.anyi.gp.meta.TableMeta"%>
<%@ page import="com.anyi.gp.meta.MetaManager"%>
<%@ page import="com.anyi.gp.meta.Foreign"%>
<%@ page import="com.anyi.gp.pub.LangResource" %>
<%@ page import="com.anyi.gp.Datum" %>
<%@ page import="com.anyi.gp.pub.DBHelper" %>
<%@ page import="com.anyi.gp.pub.SessionUtils" %>
<%@ page import="com.anyi.gp.pub.RightUtil"%>
<%@ page import="com.anyi.gp.util.StringTools" %>
<%@ page import="com.anyi.gp.context.ApplusContext"%>
<%@ taglib uri="/applus" prefix="applus"%>

<%
  Logger log = Logger.getLogger("selectTreePage");
  String masterCompoName = (String)request.getParameter("masterCompoName");
  String compoName = (String)request.getParameter("componame");
  String tableName = MetaManager.getCompoMeta(compoName).getMasterTable();
  String masterTable = (String)request.getParameter("masterTableName");
  String masterSelectField = request.getParameter("masterFieldName");  
  String foreignName = (String)request.getParameter("foreignname");
  String condition = (String)request.getParameter("condition");
  String sqlid = (String)request.getParameter("sqlid");
  boolean ismultisel = Boolean.valueOf(request.getParameter("ismulti")).booleanValue();
  LangResource lr = LangResource.getInstance();
  String title = lr.getLang(compoName);
  String isAdd= (String)request.getParameter("isadd");
  boolean isRelaChildren = Boolean.valueOf(request.getParameter("isrelachildren")).booleanValue();
  String subSys = StringTools.getSubSys(masterCompoName);
  log.info("masterCompoName: "+ masterCompoName+ "; compoName: "+ compoName);

  Foreign foreign= null;
  String sqlCompo= "";
  String tmpOrder = "";
  StringBuffer voFieldBuf= new StringBuffer();
  
  foreign = MetaManager.getTableMeta(masterTable.toUpperCase()).getForeign(foreignName.toUpperCase());
  if(foreign == null){
    /*
    out.println("<body>在页面描述["+masterCompoName.toUpperCase()+
        "]中没有找到对应的外部实体["+foreignName.toUpperCase()+"]</body>");
    return;
    */
    foreign = new Foreign();
    foreign.setOnlyLeaf(false);
  }	
	Datum datum = null;
	String userNumLimCondition = "";

    String userId = SessionUtils.getAttribute(request, "svUserID");
    if(masterTable != null && masterTable.length() > 0
      && masterCompoName != null && masterCompoName.length() > 0){
      if(masterTable.equals(MetaManager.getCompoMeta(masterCompoName).getMasterTable())){
        //userNumLimCondition =RightUtil.getUserNumLimCondition(request, userId, "fwatch", masterCompoName, tableName, masterSelectField); 
          String[] sTemp = masterSelectField.split(",");
          for(int i = 0; i < sTemp.length; i++){
            if(i == 0){
              userNumLimCondition = RightUtil.getUserNumLimCondition(request, 
                userId, "fwatch", masterCompoName, tableName, sTemp[i]); 
            }
            else{
            	String cond = RightUtil.getUserNumLimCondition(request, 
                        userId, "fwatch", masterCompoName, tableName, sTemp[i]); 
            	if(cond != null && cond.length() > 0)
              userNumLimCondition = " and " +  cond;
            }
          }      
      }
    }

    String cond = RightUtil.getUserNumLimCondition(request,
    	      userId, "fquote", compoName, null, null);
    if(cond != null && cond.length() > 0){
      if(userNumLimCondition != null && userNumLimCondition.length() > 0){
        userNumLimCondition += " and " + cond;
      }else{
        userNumLimCondition += cond;
      }
    }
          
	PageDataProvider dataProvider = (PageDataProvider) ApplusContext
				.getBean("pageDataProvider");
		
    dataProvider.setUserNumLimCondition(userNumLimCondition);
    boolean isBlank = false;
    int pageIndex = 0;
    int pageSize = 0;
	Map params = new HashMap();
	DBHelper.parseParamsSimpleForSql(condition,params);
	if (condition.indexOf("1=0") >= 0) {
		isBlank = true;
	}

	int totalCount = 0;
	
	datum = dataProvider.getPageData(pageIndex + 1, totalCount,
				pageSize, tableName, sqlid, params, isBlank);
		
	datum.addMetaField("sqlid", sqlid);
	datum.addMetaField("condition", condition);
	
	List data = datum.getData();
	if(data != null && data.size() > 0){
		Map map = (Map)data.get(0);
		Set fields = map.keySet();
		Iterator itera = fields.iterator();
		while(itera.hasNext()){
			voFieldBuf.append(itera.next() + ";");
		}
		
	}
	
  TableMeta voTreeTableMeta = MetaManager.getTableMeta(compoName.toUpperCase());
  datum.setName(voTreeTableMeta.getName());
  String pageName = LangResource.getInstance().getLang(compoName);
  pageName = "选择" + pageName;

  String vsMessage = "";
  if (ismultisel){
    vsMessage+= "只有选中复选框才有效。";
  }
  if (foreign.isOnlyLeaf()){
    vsMessage+= "只有选中末级结点才有效。";
  }
  if (!vsMessage.trim().equals("")){
    vsMessage= "提示："+ vsMessage;
  }
%>

<%
	String token = (String) SessionUtils.getToken(request);
  if(token == null){
  	token = "";
  }
%>
<html>
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<title><%=pageName%></title>

<applus:include language="javascript">
gp.page.TreeView;
gp.page.Toolbar;
gp.page.Search;
gp.page.Tipbar;
gp.webpage.script.SearchPage;
</applus:include>
<SCRIPT language="javascript" src="script/ListPage.js"></SCRIPT>
<SCRIPT language="javascript" src="script/<%=subSys%>/<%=compoName%>.js"></SCRIPT>
<SCRIPT language="javascript" src="script/Menu.js"></SCRIPT>
<script language="javascript">
//----------------------------------------------------------------------
var isTreeView = true;
var _sMasterCompo= "<%=masterCompoName%>";
var _sCompo= "<%=compoName%>";
var _sTableName= "<%=voTreeTableMeta.getName()%>";
var _asField= null;
var userNumLimCondition = "<%=userNumLimCondition%>";

var _oPwin= null;
var _asSearchField= null;
var _tIsFuzzyMatch= true;
var _sDefSearchText= "";
var _tIsAllCheckVisible= true;
if (window.dialogArguments!= null
    && window.dialogArguments[0]!= null
    && window.dialogArguments.length== 5){
  _oPwin= window.dialogArguments[0];
  _asSearchField= window.dialogArguments[1];
  _tIsFuzzyMatch= window.dialogArguments[2]=="true"?true:false;
  _sDefSearchText= window.dialogArguments[3];
  _tIsAllCheckVisible= window.dialogArguments[4]=="true"?true:false;
}

var _tIsMultiSel= <%=ismultisel%>;
var _tIsLeaf= <%=foreign.isOnlyLeaf()%>;
var _sSearchCond= "1=1";

var TOKEN = '<%=token%>';
var isadd="<%=isAdd %>";
//----------------------------------------------------------------------
window.returnValue= null;
//----------------------------------------------------------------------
function pageInit(){
  //alert("pageInit();");
  disposeFirstNode();

  var voTree= selecttree.oOwner;
  //voTree.loadData();

  _asField= fieldsInput.value.split(";");
  if (!PF.isValidArray(_asSearchField)){
    _asSearchField= _asField;
  }
  isFuzzyCheck.checked= _tIsFuzzyMatch;
  if (_sDefSearchText== null || _sDefSearchText== ""){
    _sDefSearchText= "请输入要搜索的关键字";
    searchInput.value= _sDefSearchText;
  }

  var voTB= toolbar.oOwner;
  voTB.addListener(new Listener(voTB.OnCallClick, eventAnswer_Toolbar_OnCallClick, this));
  voTree.addListener(new Listener(voTree.OnNodeDblClick, eventAnswer_Tree_OnNodeDblClick, this));
  if (isadd.toUpperCase()== "N"){
    voTB.setCallVisible("fadd", false);
    voTB.setCallVisible("fnew", false);
  }   
  
  return;
}
//----------------------------------------------------------------------
function disposeFirstNode(){
  //alert(_sTableName);
  //if (!_tIsLeaf) return;
  var voTableData= DataTools.getTableData(_sTableName);
  if (voTableData== null) return;
  //var voRow= voTableData.selectSingleNode("rowset/row[P_CODE='']");
  //if (voRow!= null) return;
  var voRowSet= voTableData.selectSingleNode("rowset");
  var vaoRow= voTableData.selectNodes("rowset/row[P_CODE!='']");
  for (var i= 0, len= vaoRow.length; i< len; i++){
    //var voPCode= vaoRow[i].selectSingleNode("P_CODE");
    //voPCode.text= "";
    var voPCode= voRowSet.childNodes[i].selectSingleNode("P_CODE");
    if (voPCode== null) continue;
    if (voRowSet.selectSingleNode("row[CODE='"+ voPCode.text+ "']")== null){
      voPCode.text= "";
    }
  }
}
//----------------------------------------------------------------------
//整理树数据;
function disposeDataForRoot(){
  //alert("disposeDataForRoot();");
  var voTableData= DataTools.getTableData(_sTableName);
  if (voTableData== null) return;
  var voRowSet= voTableData.selectSingleNode("rowset");
  //if (voRowSet.childNodes.length== 1) return;
  for (var i= 0, len= voRowSet.childNodes.length; i< len; i++){
    var voPCode= voRowSet.childNodes[i].selectSingleNode("P_CODE");
    if (voPCode== null) continue;
    /*
    if (_tIsLeaf){
      voPCode.text= "";
    }else{
    //*/
      if (voRowSet.selectSingleNode("row[CODE='"+ voPCode.text+ "']")== null){
        voPCode.text= "";
      }
    //}
  }
  return;
}
//----------------------------------------------------------------------
//整理树数据;
function disposeDataForLeaf(){
  var voTableData= DataTools.getTableData(_sTableName);
  if (voTableData== null) return;
  var voRowSet= voTableData.selectSingleNode("rowset");
  if (voRowSet.childNodes.length!= 1) return;
  for (var i= voRowSet.childNodes.length- 1; i>= 0; i++){
    var voCode= voRowSet.childNodes[i].selectSingleNode("CODE");
    if (voCode== null) continue;
    if (voRowSet.selectSingleNode("row[P_CODE='"+ voCode.text+ "']")!= null){
      voRowSet.removeChild(voRowSet.childNodes[i]);
    }
  }
  return;
}
//----------------------------------------------------------------------
function getCond(){
  var voBuf= new StringBuffer();
  voBuf.append("(");
  for (var i= 0; i< _asSearchField.length; i++){
    if (i> 0) voBuf.append(" or ");
    voBuf.append(_asSearchField[i]);
    if (isFuzzyCheck.checked){
      voBuf.append(" like '%").append(searchInput.value).append("%'");
    }else{
      voBuf.append(" like '").append(searchInput.value).append("'");
    }
  }
  voBuf.append(")");
  return voBuf.toString();
}
//----------------------------------------------------------------------
function search(){
  //alert("search();");
  var vsCond= "matchCond=";
  if (searchInput.value!= _sDefSearchText){
    if (isFuzzyCheck.checked){
    	vsCond += "%" + searchInput.value + "%";
  	}
  	else{
    	vsCond += searchInput.value;
  	}
  }

  if (vsCond== _sSearchCond) return;
  _sSearchCond= vsCond;

  var vasName= new Array("sqlid", "condition", "searchCond", "userNumLimCondition");
  var vasValue= new Array("<%=sqlid%>", "<%=condition%>", vsCond, userNumLimCondition);
  var vsData= Info.requestDataK("getTreeRowSet", _sMasterCompo, vasName, vasValue);
  
  if (vsData == null || vsData == ""){
    alert("没有查到相关数据;");
    return;
  }
  vsData = "<" + _sTableName + ">" + vsData + "</" + _sTableName + ">";
  var voDataXML= DataTools.getDataXML(_sTableName); 
  voDataXML.loadXML(vsData);
  //if (_tIsLeaf) disposeDataForLeaf();
  //if (!(searchInput.value== "" && isFuzzyCheck.checked)) disposeDataForRoot();

  var voTree= selecttree.oOwner;
  voTree.loadData();
}
//----------------------------------------------------------------------
function eventAnswer_Toolbar_OnCallClick(oSender, oCall, oEvent){
  switch(oCall.id){
    case "fcommit":
      ok();
      break;
    case "fadd":
      addfunc();
      break;
    case "fnew":
      addfunc();
      break;
        
    default:
  }
}
//----------------------------------------------------------------------
function eventAnswer_Tree_OnNodeDblClick(oSender, sCode, oEvent){
  var voTree= oSender;
  if (voTree.isRoot(sCode)) return;
  if (_tIsLeaf && !voTree.isLeafNode(sCode)) return;
  ok();
}
//----------------------------------------------------------------------
function getCurRowData(tIsLeaf){
  tIsLeaf= PF.parseBool(tIsLeaf);
  var voTree= selecttree.oOwner;
  var voNode= voTree.getCurNode();
  if (voNode== null) return null;
  if (tIsLeaf && !voTree.isLeafNode(voTree.getNodeCode(voNode))) return null;
  var voRow= voTree.getNodeRow(voTree.getNodeCode(voNode));
  if (voRow== null) return null;
  var va2xsSet= DataTools.rowsToA2x([voRow], _asField);
  return va2xsSet;
}
//----------------------------------------------------------------------
function ok(){
  //alert("ok");
  var va2xsSet= getCurRowData(_tIsLeaf);
  var voTree= selecttree.oOwner;
  if (_tIsMultiSel){
    va2xsSet= voTree.getData(voTree.getRootCode(), true, _tIsLeaf, null, _asField);
  }else{
    if (va2xsSet!= null){
      va2xsSet[1]= va2xsSet[1][0];
    }
  }
  window.returnValue= va2xsSet;
  window.close();
}
//----------------------------------------------------------------------
function SearchInput_OnFocus(){
  if (searchInput.value== _sDefSearchText){
    searchInput.value= "";
  }
}
//----------------------------------------------------------------------
function SearchInput_OnBlur(){
  if (searchInput.value== ""){
    searchInput.value= _sDefSearchText;
  }
}
//----------------------------------------------------------------------
</script>
</head>

<body class="clsPageBody">
<%
datum.pringDataX(out,voTreeTableMeta.getName());
%>
<applus:init>
  pageInit();
</applus:init>

<table border="0" cellspacing="0" cellpadding="0" style="width:100%;height:100%;">
  <tr>
    <td width="100%" colspan="3">
<applus:toolbar id="toolbar">
  <call id="fcommit" type="command" caption="确定" accesskey="Y" isgranttoall="true" />
  <call id="fadd"    type="command" caption="新增" accesskey="N"/> 
  <call id="fnew"    type="command" caption="新增" accesskey="N"/>  
</applus:toolbar>
    </td>
  </tr>
  <tr>
    <td width="1%"></td>
    <td width="98%">
      <table border="0" width="100%">
        <tr>
          <td width="10%">&nbsp;</td>
          <td width="80%">
            <input type="text" id="searchInput" style="width:100%;border:1px solid blue;font-size:9pt;background-color:transparent;" onkeyup="if(event.keyCode==13){search();}" onfocus="SearchInput_OnFocus();" onblur="SearchInput_OnBlur();">
          </td>
          <td>
            <input type="button" id="searchbtn" value=" 搜索 " class="clsPageNormButton" onclick="search();">
          </td>
          <td>
<table border="0" cellspacing="0" cellpadding="0" style="border:1px solid #808080;width:100%;height:100%;font-size:9pt;">
  <tr>
    <td width="100%" nowrap>
    <label for="isFuzzyCheck"><input type="checkbox" id="isFuzzyCheck" style="height:17px;">模糊查找</label>
    </td>
  </tr>
</table>
          </td>
          <td width="10%">&nbsp;</td>
        </tr>
      </table>
    </td>
    <td width="1%"></td>
  </tr>
  <tr style="height:100%">
    <td width="1%"></td>
    <td width="98%">
<applus:treeview id="selecttree"
                 idsuffix=""
                 tablename="<%=voTreeTableMeta.getName()%>"
                 isfromdb= "false"
                 maketype="1"
                 pagesize="100"

                 root="所有选项"
                 roottip="根结点"
                 rootselimg=""
                 rootnormalimg=""

                 codefield="CODE"
                 namefield="NAME"
                 pcodefield="P_CODE"
                 tipfield=""
                 selimgfield=""
                 normalimgfield=""
                 isuseleafimg="true"
                 iscodeandname="true"
                 isexistcheck="<%=ismultisel%>"

                 isvisible= "true"
                 isrelachildren="<%=isRelaChildren%>"
                 isrelaparent="false"
                 isupdatedata= "false"
                 initlevel="1"
                 tabindex="0"

                 cssclass=""
                 style="position:relative;left:;top:;width:100%;height:100%;"
                 oninit=""
                 >
</applus:treeview>
    </td>
    <td width="1%"></td>
  </tr>
  <tr style="font-size:1px;height:2px;">
    <td width="1%"></td>
    <td width="98%"></td>
    <td width="1%"></td>
  </tr>
  <%if (!vsMessage.trim().equals("")){%>
  <tr style="font-size:9pt;color:red;">
    <td width="1%"></td>
    <td width="98%">
      <%=vsMessage%>
    </td>
    <td width="1%"></td>
  </tr>
  <%}%>
  <tr style="font-size:1px;height:2px;">
    <td width="1%"></td>
    <td width="98%"></td>
    <td width="1%"></td>
  </tr>
</table>


<input type="hidden" id="sqlInput" value="<%=sqlCompo%>">
<input type="hidden" id="sqlOrderInput" value="<%=tmpOrder%>">
<input type="hidden" id="fieldsInput" value="<%=voFieldBuf.substring(0, voFieldBuf.length() - 1)%>">

<applus:endpage />
</body>
<HEAD> 
<META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE"> 
</HEAD> 
</html>

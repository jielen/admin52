<%@ page contentType="text/html;charset=GBK" %><%@
 page import ="java.sql.*,java.util.*, com.anyi.gp.access.*, com.anyi.gp.util.*,com.anyi.gp.pub.RightUtil, com.anyi.gp.pub.*, com.anyi.gp.Delta, com.anyi.gp.TableData"%><%@
 taglib uri="/applus" prefix="applus"%><%!

// $Id: AS_NEW.jsp,v 1.5 2008/05/04 14:38:17 liuxiaoyong Exp $

// com.anyi.portal.AsNewBean

public static class AsNewBean {

  public static int compoCountsInEachRow= 3;
  public static Map usedWfCompoForProducts= null;
  public static Map usedWfProductAndName= null;
  public  List hasRightCompo= null;
  private HttpServletRequest request = null;
  	
  private String[] productOrder= new String[]{"DB", "BI", "DP", "CP", "AM", "BB", "PR", "FA", "GL"};

  public AsNewBean(HttpServletRequest request) {
  	this.request = request;
  }

  /**
   * 得到查询用户有权限的部件的sql语句
   * 不考虑是否有org,因为AS_ORG,AS_POSITION两个部件也不挂接工作流
   */
  private String getQueryRightCompoSql(String userID, String coCode, String orgCode){
    StringBuffer result = new StringBuffer();
    result.append("select distinct a.compo_id ");
    result.append("from v_as_menu_compo a, as_compo b, v_as_usr_func c, ");
    result.append("as_menu d ");
    result.append("where upper(is_in_menu) != 'N' and a.compo_id = b.compo_id ");
    result.append("and a.compo_id=c.compo_id and c.user_id='" + userID + "'");
    result.append(" and c.func_id!='fquote' and a.menu_id = d.menu_id ");
    result.append(" union ");
    result.append(" select distinct a.compo_id ");
    result.append("from v_as_menu_compo a, as_compo b, v_as_emp_func c ");
    result.append("where upper(is_in_menu) != 'N' and a.compo_id = b.compo_id ");
    result.append(" and a.compo_id=c.compo_id and c.user_id='" + userID + "'");
    result.append(" and c.func_id!='fquote' and c.co_code='" + coCode + "'");
    result.append(" and c.org_code='" + orgCode + "' ");
    return result.toString();
  }

  private void setHasRightCompoList(String userID, String coCode, String orgCode){
    hasRightCompo= new ArrayList();
    String querySql= getQueryRightCompoSql(userID, coCode, orgCode);

    Connection conn= null;
    Object[] compoIdObj= null;
    try {
      conn= DAOFactory.getInstance().getConnection();
      compoIdObj= DBHelper.queryOneColumn(conn, querySql, new String[]{});
    }
    catch(Exception ex){
      ex.printStackTrace();
      throw new RuntimeException("查询"+ ex.toString());
    }
    finally{
      DBHelper.closeConnection(conn);
    }

    setHasRightCompoListByQueryResult(compoIdObj);
  }

  private void setHasRightCompoListByQueryResult(Object[] queryObj){
    if (queryObj== null) return;
    for (int i= 0, j= queryObj.length; i< j; i++){
      String compoId= (String)queryObj[i];
      hasRightCompo.add(compoId);
    }
  }
  /**
   * 得到使用了工作流的系统代码
   * @return
   */
  private List getUsedWfProducts(){
    List result= new ArrayList();
    StringBuffer querySql= new StringBuffer();
    querySql.append("select distinct b.PRODUCT_CODE ");
    querySql.append("from as_compo a, as_product_ver b where a.compo_id like b.product_code || '%' ");
    querySql.append("and upper(a.template_is_used)='Y' and upper(b.product_code)!='WF' ");

    Connection conn= null;
    Delta delta= null;
    try {
      conn= DAOFactory.getInstance().getConnection();
      delta= DBHelper.queryToDelta(conn, querySql.toString(), new String[]{});
    }
    finally{
      DBHelper.closeConnection(conn);
    }

    Iterator iter= delta.iterator();
    TableData td= null;
    String productCode= null;
    while(iter.hasNext()){
      td= (TableData)iter.next();
      productCode= (String)td.getField("PRODUCT_CODE");
      result.add(productCode);
    }

    return result;
  }

  /**
   * 得到使用了工作流的系统代码与名字
   * @return
   */
  public Map getUsedWfProductAndName(){
    if (usedWfProductAndName== null){
      usedWfProductAndName= new HashMap();
      List usedWfProducts= getUsedWfProducts();
      String productName= null, productCode= null;
      for (int i= 0, j= usedWfProducts.size(); i< j; i++){
        productCode= (String)usedWfProducts.get(i);
        productName= LangResource.getInstance().getLang("C", productCode);
        if (productName== null || productName.trim().length()== 0)
          productName= productCode;

        usedWfProductAndName.put(productCode, productName);
      }

    }
    return usedWfProductAndName;
  }

  /**
   * 得到各个系统挂接的工作流部件
   * @return
   */
  public Map getUsedWfCompoForProducts(){
    //if (usedWfCompoForProducts== null){
      usedWfCompoForProducts= new HashMap();
      createUsedWfProductsAndCompos();
    //}

    return usedWfCompoForProducts;
  }

  private void createUsedWfProductsAndCompos(){
    List usedWfCompo= getUsedWfProducts();
    if (usedWfCompo.size()== 0) return;
		
    Connection conn= DAOFactory.getInstance().getConnection();
    try{
	    Iterator iter= usedWfCompo.iterator();
	    String product= null;
	    while(iter.hasNext()){
	      product= (String)iter.next();
	      createMapForEachProduct(conn, product);
	    }
		}finally{
    	DBHelper.closeConnection(conn);
    }
  }
  /**
   * 得到每一个产品挂接了工作流的部件
   * @param conn
   * @param product 产品代码
   */
  private void createMapForEachProduct(Connection conn, String product){
    String querySql= getCreateSqlForEachProduct(product);
    Delta result= null;
    
    result= DBHelper.queryToDelta(conn, querySql, new String[] {});
    //DBHelper.closeConnection(conn);
    CompoInfo compoInfo= null;
    List wfCompos= null;

    if (result.size()> 0){
      wfCompos= new ArrayList();
      Iterator iter= result.iterator();
      TableData td= null;
      String compoId= null, compoName= null;
      while(iter.hasNext()){
        td= (TableData)iter.next();
        compoId= (String)td.getField("COMPO_ID");
        compoName= (String)td.getField("RES_NA");
        //增加权限的判断
        if ( !hasRightCompo.contains(compoId)) continue;
        if (compoName== null || compoName.trim().length()== 0)
          compoName= compoId;

        compoInfo= new CompoInfo(compoId, compoName);
        wfCompos.add(compoInfo);
      }
      usedWfCompoForProducts.put(product, wfCompos);
    }

  }
  /**
   * 构造需要的查询sql语句
   * @param products 系统中安装的产品
   * @return
   */
  private String getCreateSqlForEachProduct(String product){
    StringBuffer querySql= new StringBuffer();
    querySql.append("select a.COMPO_ID, b.RES_NA  from as_compo a, as_lang_trans b ");
    querySql.append("where a.compo_id= b.res_id and upper(a.template_is_used)='Y' and ");
    querySql.append("a.compo_id like '");
    querySql.append(product);
    querySql.append("%'");
    querySql.append(" order by a.compo_id");
    return querySql.toString();
  }

  /**
   * 生成页面上的页签下对应的内容的HTML代码
   * @return
   */
  public String createPageHtml(String userID, String coCode, String orgCode){
    setHasRightCompoList(userID, coCode, orgCode);
    StringBuffer result= new StringBuffer();
    Map usedWfCompoForProducts= getUsedWfCompoForProducts();
    Map usedWfProductAndName= getUsedWfProductAndName();
    Set tempUsedWfProducts= usedWfCompoForProducts.keySet();

    List usedWfProducts= new ArrayList();

    for (int i= 0, j= productOrder.length; i< j; i++){
      String eachProduct= productOrder[i];
      if (tempUsedWfProducts.contains(eachProduct)){
        usedWfProducts.add(eachProduct);
       }
    }
    result.append("<applus:tabstrip id=\"as_new_tabstrip\" style=\"left:5%;top:5%;width:80%;height:90%;\" orientation=\"up\" >");
    Iterator iter= usedWfProducts.iterator();
    while (iter.hasNext()){
      String productCode= (String)iter.next();
      String productName= (String)usedWfProductAndName.get(productCode);
      List wfComposForProduct= (List)usedWfCompoForProducts.get(productCode);
      result.append(createPageHtmlForEachProductOfNew(productCode, productName, wfComposForProduct) );
    }
    result.append("</applus:tabstrip>\n");
    return result.toString();
  }

  /**
   * 得到页面上的一个产品对应的页面的HTML代码
   * @param productCode
   * @param productName
   * @param wfComposForProduct
   * @return
   */
  private String createPageHtmlForEachProductOfNew(String productCode, String productName,
                                              List wfComposForProduct){
    StringBuffer result= new StringBuffer();
    result.append("<applus:tab id=\""+ productCode+ "\" caption=\""+ productName+ "\">");
    result.append("      <table width=\"100%\" border=\"0\" cellspacing=\"10\">\n");
    int wfCompoCounts= wfComposForProduct.size();

    int rowCounts= calcRowCounts(wfCompoCounts);
    for (int i= 1; i<= rowCounts; i++){
      result.append("        <tr>\n");
      for (int j= i*3- 3; j<= i*3- 1 && j< wfCompoCounts; j++){
        CompoInfo compoInfo= (CompoInfo)wfComposForProduct.get(j);
        result.append(createPageHtmlForEachTd(productCode, compoInfo));
        result.append("\n");
      }
      result.append("        </tr>\n");
    }
    result.append("      </table>\n");
    result.append("</applus:tab>\n");
    return result.toString();
  }

  private String createPageHtmlForEachProduct(String productCode, String productName,
      List wfComposForProduct){
    StringBuffer result= new StringBuffer();
    result.append("<div id="+productCode+" class=WebTabs-external-page-container>\n");
    result.append("  <div class=WebTabs-internal-page-container>\n");
    result.append("    <div style=\"height: 90%; margin: 10px; background-color: white; overflow: auto; \">\n");
    result.append("      <table width=\"100%\" border=\"0\" cellspacing=\"10\">\n");
    int wfCompoCounts= wfComposForProduct.size();

    int rowCounts= calcRowCounts(wfCompoCounts);
    for (int i= 1; i<= rowCounts; i++){
      result.append("        <tr>\n");
      for (int j= i*3- 3; j<= i*3- 1 && j< wfCompoCounts; j++){
        CompoInfo compoInfo= (CompoInfo)wfComposForProduct.get(j);
        result.append(createPageHtmlForEachTd(productCode, compoInfo));
        result.append("\n");
      }
      result.append("        </tr>\n");
    }
    result.append("      </table>\n");
    result.append("      </div>\n");
    result.append("  </div>\n");
    result.append("</div>\n");
    return result.toString();
  }

  /**
   * 计算行数
   * @param wfCompoCounts
   * @return
   */
  private int calcRowCounts(int wfCompoCounts){
    int rowCounts= 0;
    int remain= wfCompoCounts%compoCountsInEachRow;
    if (remain!= 0) rowCounts= wfCompoCounts/compoCountsInEachRow+ 1;
    else rowCounts= wfCompoCounts/compoCountsInEachRow;
    return rowCounts;
  }

  /**
   * 得到页面上的一个<td>对应的HTML代码
   * @param productCode 产品代码
   * @param compoInfo 一个部件的信息
   * @return
   */
  private String createPageHtmlForEachTd(String productCode, CompoInfo compoInfo){
    String eachTdUrl= getEachTdUrl(productCode, compoInfo);

    StringBuffer result= new StringBuffer();
    result.append("          <td width=\"25%\"><p style=\"font-size: 13; \" align=\"center\">");
    result.append("<a href=\"");
    result.append(eachTdUrl);
    result.append("\" target=\"_new\" >" );
    result.append("<img src=\"/style/img/gp5/ico/docstar_24x24.gif\" border=\"0\" />");
    result.append("<br>");
    result.append(compoInfo.getCompoName());
    result.append("</a>");
    result.append("</p></td>");

    return result.toString();
  }

  /**
   * 得到每一个td对应的url地址
   * @param productCode 产品代码
   * @param compoInfo
   * @return
   */
  private String getEachTdUrl(String productCode, CompoInfo compoInfo){
    StringBuffer result= new StringBuffer();
    result.append("/");
    result.append(productCode);
    result.append("/getpage_");
    result.append(compoInfo.getCompoId());
    result.append(".action?componame=");
    result.append(compoInfo.getCompoId());
    result.append("&function=geteditpage&condition=1=0&token=");
    result.append((String) SessionUtils.getToken(request));
    return result.toString();
  }

  /**
   * 一个内部的类,标识部件
   */
  public static class CompoInfo {
    public String compoId;
    public String compoName;

    public CompoInfo(String compoId, String compoName){
      this.compoId= compoId;
      this.compoName= compoName;
    }

    public String getCompoId(){
      return compoId;
    }

    public String getCompoName(){
      return compoName;
    }
  }
}

%>
<%
    //String userId= (String)request.getSession().getAttribute("svUserID");
    String userId= (String)SessionUtils.getAttribute(request, "svUserID");
    String coCode= (String)SessionUtils.getAttribute(request, "svCoCode");
    String orgCode= (String)SessionUtils.getAttribute(request, "svOrgCode");
    //String coCode= (String)request.getSession().getAttribute("svCoCode");
    //String orgCode= (String)request.getSession().getAttribute("svOrgCode");
    AsNewBean asNewBean= new AsNewBean(request);
    Map usedWfProductAndName= asNewBean.getUsedWfProductAndName();
    String contentHtml= asNewBean.createPageHtml(userId, coCode, orgCode);
%>

<html>
<head>
<title>新办任务</title>

<applus:include>
gp.page.Tabstrip;
</applus:include>

<%--
<style>
body {  font-family: Tahoma; font-size: 12px; margin:  0px }
div,td{font-size:9pt;}
</style>
--%>


</head>

<%--
<body onload="f_start()">
<div id=WebTabs_container></div>
--%>

<body>

<applus:init>
</applus:init>

<applus:area>
<%=contentHtml%>
</applus:area>
<applus:endpage />
</body>
</html>

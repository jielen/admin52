<!-- $Id: searchPage.jsp,v 1.3 2008/08/21 12:56:17 liuxiaoyong Exp $ -->
<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/applus" prefix="applus"%>
<%@ page import="com.anyi.gp.pub.SessionUtils" %>

<%
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
%>

<html>
	<head>
		<jsp:useBean id="searchID" scope="request"
			class="com.anyi.gp.core.bean.SearchPageBean" />
		<LINK href="script/applus.css" rel="stylesheet" type="text/css">
		<SCRIPT language="javascript" src="script/date.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/General.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/util.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/foreign.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/page.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/SearchPage.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/ListPage.js"></SCRIPT>								
		<SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>

		<%
			String componame = request.getParameter("componame");
			String ignoreFields = request.getParameter("ignoreFields");
			String pageType = request.getParameter("pageType");

			request.setAttribute("componame", componame);
			request.setAttribute("ignoreFields", ignoreFields);
			request.setAttribute("pageType", pageType);

			int va = searchID.init(request, out);
			if (va == 0) {
				out.println("<script >");
				//out.println("  alert('this is null page ok,no any save fileds!!');\n");
				out.println("   returnValue='';");
				out.println("  close();\n");
				out.println("</script>\n");
			}
		%>

		<title><%=searchID.getPageTitle()%></title>

	</head>

	<body nowrap onload="pageInit();" background="/style/img/main/bk.jpg">
		<span id="compo_id"
			value="<%out.print(request.getAttribute("componame"));%>"></span>
		<span id="svUserID"
			value="<%out.print(SessionUtils.getAttribute(request, "svUserID"));%>"></span>

		<table border="0" width="100%" cellpadding="0" cellspacing="0"
			background=/style/img/main/bk.jpg " style="font-size: 1px" height=100%>
			<tr>
				<td width="100%">
					<table width="100%" cellpadding="0" cellspacing="0" border="0"
						style="font-size: 8px">
						<tr>
							<td height="8" width="100%"
								background="/style/img/main/editcontentmidbk.jpg"
								style="font-size: 40px">
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr align=center id="condi">
				<td colspan=1 align="right">
					<table cellpadding="0" cellspacing="0" border="0"
						background="/style/img/main/bk.jpg">
						<tr>
							<td>
								<table id=reValueButtonID cellpadding="0" cellspacing="0"
									border="0" background="/style/img/main/bk.jpg">
									<tr>
										<td>
											<img id="reValue_leftImg" src="/style/img/func/left_behind.gif">
										</td>
										<td id="reValue_midBk" background="/style/img/func/mid_behind.jpg"
											valign=center align=center nowrap>
											<input type="button" name="reset" value="��λ" id="reValueID"
												class="clsListCall" onMouseOver="call_editPageMouseOver()"
												onMouseOut="call_editPageMouseOut()" onclick="resetItem();">
											</input>
										</td>
										<td>
											<img id="reValue_rightImg" src="/style/img/func/right_behind.gif">
										</td>
									</tr>
								</table>
							</td>
							<td>
								<img id="search_leftImg" src="/style/img/func/left_behind.gif">
							</td>
							<td id="search_midBk" background="/style/img/func/mid_behind.jpg"
								valign=center align=center nowrap>
								<input type="button" name="save" value="����" id="searchID"
									class="clsListCall" onMouseOver="call_editPageMouseOver()"
									onMouseOut="call_editPageMouseOut()" onclick="submitItem();">
								</input>
							</td>
							<td>
								<img id="search_rightImg" src="/style/img/func/right_behind.gif">
							</td>
						</tr>
					</table>
				<td>
			</tr>
			<tr>
				<td colspan=6 height=100%>
					<table border=0 cellpadding="0" cellspacing="0" width=100%
						height=100%>
						<tr>
							<td background="/style/img/main/bk.jpg" align=center valign=top
								height=100%>

								<table border=0 width=100% cellpadding="0" cellspacing="0">
									<tr>
										<td></td>
									</tr>
									<tr>
										<td class="clsReportTitle" align=center>
											<br>
											�߼�����
											<br>
										</td>
									</tr>
								</table>
								<br/>
								<table align=right border=0 width=95% cellpadding="0"
									cellspacing="0">
									<tr>
										<td>
											<table align=left border=0 width=100% cellpadding="0"
												cellspacing="0" bgcolor="white">
												<tr>
													<td>
													</td>
													<td background="/style/img/tag/linebk2.jpg">
													</td>
													<td>
													</td>
												</tr>
												
												<tr>
													<td background="/style/img/tag/linebk1.jpg" width=4></td>
													<td align=left height=300 valign=top>
														<table id="schemaID" border=0 cellpadding=0 cellspacing=0>
															<tr>
																<td height=8></td>
															</tr>
															<tr>
																<td width=7></td>
																<td class="normalFieldCaption">
																	<b>���������</b>
																</td>
															</tr>
															<tr>
																<td width=7></td>
																<td id="selectScheID" class="clsStatSearchCallEdit">
																	<span id="selectSchemaName"><%=searchID.getSchemaNameHTML("search")%>
																	</span>
																</td>
																<td class="normalFieldCaption">
																	&nbsp;��������:
																</td>
																<td>
																	<span><input id="currSchemaName" type="text"
																			value="" ondblclick='matchValue_DblClick()'
																			onFocus='matchValue_Focus()'
																			onKeyPress='matchValue_KeyPress()'></input> </span>
																</td>

																<td valign=center nowrap>
																	<table id=saveSchemaButtonID border=0 cellpadding='0'
																		cellspacing='0'>
																		<tr>
																			<td>
																				<img src="/style/img/main/buttonleft.gif">
																			</td>
																			<td background="/style/img/main/buttonmid.gif" valign=bottom
																				align=center nowrap>
																				<input type='button' id="fsaveID"
																					class="clsStatSearchCallEdit" name="saveSchema"
																					value="���淽��" onClick="saveSearchSche();">
																			</td>
																			<td>
																				<img src="/style/img/main/buttonright.gif">
																			</td>
																		</tr>
																	</table>
																</td>
																<%
																	String userID =  SessionUtils.getAttribute(request, "svUserID");
																	if ("sa".equalsIgnoreCase(userID)) {
																		out.println("<td width=4></td>");
																		out
																		.println("<td valign=center nowrap><table id=saveDefaultSchemaID border=0 cellpadding='0' cellspacing='0'><tr><td><img src=\"/style/img/main/buttonleft.gif\"></td><td background=\"/style/img/main/buttonmid.gif\" valign=bottom align=center nowrap>");
																		out
																		.println("<input type='button' id=\"fdefaultsaveID\" class=\"clsStatSearchCallEdit\" name=\"saveSchema\" value=\"����Ĭ�Ϸ���\" onClick=\"saveSearchSche('defaultSche')\"></td>");
																		out
																		.println("<td><img src=\"/style/img/main/buttonright.gif\"></td></tr></table>");
																		out.println("</td>");
																	}
																%>
																<td width=4></td>
																<td valign=center nowrap>
																	<table id=deleteSchemaButtonID border=0 cellpadding='0'
																		cellspacing='0'>
																		<tr>
																			<td>
																				<img src="/style/img/main/buttonleft.gif">
																			</td>
																			<td background="/style/img/main/buttonmid.gif" valign=bottom
																				align=center nowrap>
																				<input type='button' id='deleteId '
																					class="clsStatSearchCallEdit" name="deleSchema"
																					value="ɾ������" onClick="deleCurrSearchSchema();">
																			</td>
																			<td>
																				<img src="/style/img/main/buttonright.gif">
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
														<br>
														<hr size="1pt" color="#C0C0C0">
														<table width="100%">
															<tr>
																<td width=1></td>
																<td class="normalFieldCaption">
																	<b> ��ѯ�����</b>
																</td>
															</tr>
															<tr>
																<td width=1></td>
																<td>
																	<table border=1 id='searchTableID' cellpadding=0
																		cellspacing=0
																		style="border-top:white 1px solid;height:35px"
																		;
												    bordercolordark="white"
																		bordercolorlight="#C0C0C0">
																		<tr>
																			<td borderColor="#C0C0C0" id=testid width="11%">
																				&nbsp;
																			</td>
																			<td borderColor="#C0C0C0">
																				<table>
																					<tr>
																						<td class="normalFieldCaption">
																							��������
																						</td>
																						<td>
																							<img src="/style/img/main/subb.jpg"
																								onclick="openBKmenu();" id="bksta">
																						</td>
																					</tr>
																				</table>
																			</td>
																			<td borderColor="#C0C0C0" id=bkstart width="4%">
																				&nbsp;
																			</td>
																			<td borderColor="#C0C0C0">
																				&nbsp;
																				<%=searchID.getSelectField()%>
																				&nbsp;
																			</td>
																			<td borderColor="#C0C0C0">
																				&nbsp;
																				<%=searchID.getFirstCondi()%>
																			</td>
																			<td borderColor="#C0C0C0" id=bkend width="4%">
																				&nbsp;
																			</td>
																			<td borderColor="#C0C0C0">
																				<table>
																					<tr>
																						<td class="normalFieldCaption">
																							��������
																						</td>
																						<td>
																							<img src="/style/img/main/subb.jpg"
																								onclick="openBKmenu();" id="bken">
																						</td>
																					</tr>
																				</table>
																			</td>
																			<td borderColor="white">
																				<table align=center border=0 cellpadding=0
																					cellspacing=0>
																					<tr>
																						<td>
																							<img src="/style/img/main/buttonleft.gif">
																						</td>
																						<td background="/style/img/main/buttonmid.gif"
																							valign=center align=center nowrap>
																							<input type="button"
																								class="clsStatSearchCallEdit" value="����"
																								onclick="inserNewItem();">
																						</td>
																						<td>
																							<img src="/style/img/main/buttonright.gif">
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
														<br>
														<hr size="1pt" color="#C0C0C0">
														<table border=0 align="left">
															<tr>
																<td width=1></td>
																<td class="normalFieldCaption" width=100>
																	<b>�����</b>
																</td>
															</tr>
															<tr>
																<td width=1></td>
																<td>
																	<table width="100%" border=0 align="center"
																		id='SortTableID' name='SortTableID' cellpadding=0
																		cellspacing=0 bordercolordark="#C0C0C0"
																		bordercolorlight="#C0C0C0">
																		<tr>
																			<!--td id=testid>&nbsp;</td-->
																			<td id="SortFieldTD" name="SortFieldTD">
																				<%=searchID.getSelectField()%>
																			</td>
																			<td id="SortTypeTD" name="SortTypeTD">
																				<select id="SortTypeSelect" name="SortTypeSelect">
																					<option value="ASC" checked>
																						����
																					</option>
																					<option value="DESC">
																						����
																					</option>
																				</select>
																			</td>
																			<td id="SortDeleteButtonTD" name="SortDeleteButtonTD">
																				<table border=0 cellpadding=0 cellspacing=0>
																					<tr>
																						<td>
																							<img src="/style/img/main/buttonleft.gif">
																						</td>
																						<td background="/style/img/main/buttonmid.gif"
																							valign=center align=center nowrap>
																							<input type="button"
																								class="clsStatSearchCallEdit" value="����"
																								onclick="inserNewSortItem();">
																						</td>
																						<td>
																							<img src="/style/img/main/buttonright.gif">
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
														<br>
													</td>
													<td background="/style/img/tag/linebk3.jpg" width=4></td>
												</tr>
												<tr>
													<td width=2>
													</td>
													<td background="/style/img/tag/linebk4.jpg"></td>
													<td width=2>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>

								<br>
								<!--div id="ie5menu" class="clsPopMenu" onclick="clickMenu()"><table cellspacing="0px" cellpadding="0px" border="0px" id="popTable" style="font-size: 12px;"><tr><td colspan=2 align="right" style="background-color:#333399;color:white">�з������<img src="/style/img/button/menu_close.gif" onclick="hidemenuie5();"></td></tr><tr><td colspan=2><div style= "border-style:groove; border-width:2px"><input type="radio" value="V1" checked name="__U_PopMenu_Option_LockOrHidden" id="__U_PopMenu_LockOption" onclick="selectFuncOption();">������<br><input type="radio" value="V2" name="__U_PopMenu_Option_LockOrHidden" id="__U_PopMenu_HideOption" onclick="selectFuncOption();">������</div></td></tr></table></div-->
							</td>
						</tr>
						<!--ҳ��ײ���ʼ -->
						<!--ҳ��ײ����� -->
					</table>
					<DIV class="clsSlide" id="slide"></DIV>
					<IFRAME id="exportFrame" style="display:none" src="blank.html"></IFRAME>
					<IFRAME id="printframe" src="blank.html" width="1" height="1"
						style="display:none">
						;
					</IFRAME>

				</td>
			</tr>
		</table>

		<div id=buffer style="display:none">
			<span id=foreign></span>
		</div>
		<div id="bkmenu"
			style="width=45;
                       height:60;
                       position:absolute;
                       display:none;
                       BACKGROUND-COLOR:#D7E1F3;
                       font-size:13;
                       left:100;top=100;
                       BORDER-RIGHT: #6081BB 2px solid;
   					   BORDER-TOP: #F0F5F9 2px solid;
   					   BORDER-LEFT: #F0F5F9 2px solid;
                       BORDER-BOTTOM: #6081BB 2px solid;
                       
                       "
			align="center">
			<!--div style="color:blue;font-size:10pt">����</div-->
			<input id="addId" type="button" class="srButton2" name=bkadd
				value="����" onmouseover='doHight(event.toElement)'
				onmouseout='clearHight(event,"addId")' onclick="addbk();">
			<hr size='1px' color='#7184A9'>
			<input id="subbId" type="button" class="srButton2" name=bksubb
				value="����" onmouseover='doHight(event.toElement)'
				onmouseout='clearHight(event,"subbId")' onclick="subbk();">
			<hr size='1px' color='#7184A9'>
			<input id="closeId" type=button class="srButton2" value="�ر�"
				��name="closebk" onmouseover='doHight(event.toElement)'
				onmouseout='clearHight(event,"closeId")' onclick="closeBKmenu();">
		</div>
		<div style="display:none">
			<input id=mx type=text size=30>
			<input id=my type=text size=30>
		</div>
	</body>
</html>

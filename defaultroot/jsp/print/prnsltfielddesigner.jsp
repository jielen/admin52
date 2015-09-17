<%@ page contentType="text/html; charset=GBK"%>
<HTML>
	<HEAD>
		<TITLE class="selTitle">字段选择</TITLE>
		<META http-equiv="Content-Type" content="text/html; charset=gb2312">
		<LINK href="script/applus.css" type="text/css" rel="stylesheet">
		<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/page.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/grid.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/datagrid.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/PageData.js"></SCRIPT>
		<SCRIPT language="javascript" src="script/General.js"></SCRIPT>
		<SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
		<SCRIPT language="javascript" src="script/print/prnsltfielddesigner.js"></SCRIPT>
	</HEAD>
	<BODY onLoad="windowload()">
		<%
		String entityName = request.getParameter("componame");
		%>
		<SCRIPT language="javascript">
  var entityName="<%=entityName%>";
  </SCRIPT>


		<span id="meta" componame="AS_COMPO_FIELD" pageName="AS_COMPO_FIELD_E" />
			<span id="calls"> </span> <span id="AS_COMPO_FIELDMeta"
			tablename="AS_COMPO_FIELD"> </span> <span id="status" value="edit"></span>
			<span id="digest" value="9gX9f87QXY3Cp405WgxToGFsIHk="></span> </span>
		<TABLE class=pagebody cellSpacing=0 cellPadding=1 width="100%"
			border=0>
			<TBODY>
				<TR>
					<TD id=A3TD onresize="resizeArea('A3');" vAlign=top colSpan=2>
						<DIV id=A3 width="100%">
							<DIV class=clsGridContainer id=AS_COMPO_FIELDContainer
								style="WIDTH: 100%; HEIGHT: 300px" tablename="AS_COMPO_FIELD">
								<TABLE class=clsGridHeadTable id=AS_COMPO_FIELDHeadTable
									borderColor=#ffffff cellSpacing=0 cellPadding=0 width=330
									border=1>
									<TBODY>
										<TR>
											<TD vAlign=center align=middle width=30>
												<INPUT class=clsCHK id=selectAllID
													onclick="selectAll('AS_COMPO_FIELD')" type=checkbox
													name=selectAll></INPUT>
											</TD>
											<TD id=AS_COMPO_FIELD_DATA_ITEMCell vAlign=center
												align=middle width=100 type="Text" U_ColIndex="1" colno="1"
												parent="null">
												<TABLE id=AS_COMPO_FIELD_DATA_ITEMTableID cellSpacing=0
													cellPadding=0 width=100 border=0>
													<TBODY>
														<TR>
															<TD align=middle>
																<SPAN class=clsGridHeadKeyCell
																	id=AS_COMPO_FIELD_DATA_ITEMCaptionID
																	onclick="sortTable('AS_COMPO_FIELD',1)"
																	tablename="AS_COMPO_FIELD" sortdir="0"
																	field="DATA_ITEM">数据项<SPAN class=asterisk>*</SPAN>
																</SPAN>
																<IMG src="/style/img/main/blank.gif" field="DATA_ITEM"></IMG>
															</TD>
															<TD class=clsColResize onmousedown=mousedown() width=6
																tablename="AS_COMPO_FIELD" fieldname="DATA_ITEM"></TD>
														</TR>
													</TBODY>
												</TABLE>
											</TD>
											<TD id=AS_COMPO_FIELD_DATA_ITEM_NACell vAlign=center
												align=middle width=100 type="Text" U_ColIndex="2" colno="2"
												parent="null">
												<TABLE id=AS_COMPO_FIELD_DATA_ITEM_NATableID cellSpacing=0
													cellPadding=0 width=100 border=0>
													<TBODY>
														<TR>
															<TD align=middle>
																<SPAN class=clsGridHeadCell
																	id=AS_COMPO_FIELD_DATA_ITEM_NACaptionID
																	onclick="sortTable('AS_COMPO_FIELD',2)"
																	tablename="AS_COMPO_FIELD" sortdir="0"
																	field="DATA_ITEM_NA">数据项名</SPAN>
																<IMG src="/style/img/main/blank.gif" field="DATA_ITEM_NA"></IMG>
															</TD>
															<TD class=clsColResize onmousedown=mousedown() width=6
																tablename="AS_COMPO_FIELD" fieldname="DATA_ITEM_NA"></TD>
														</TR>
													</TBODY>
												</TABLE>
											</TD>

											<TD id=AS_COMPO_FIELD_TAB_NACell vAlign=center align=middle
												width=100 type="Text" U_ColIndex="3" colno="3" parent="null">
												<TABLE id=AS_COMPO_FIELD_TAB_NATableID cellSpacing=0
													cellPadding=0 width=100 border=0>
													<TBODY>
														<TR>
															<TD align=middle>
																<SPAN class=clsGridHeadCell
																	id=AS_COMPO_FIELD_TAB_NACaptionID
																	onclick="sortTable('AS_COMPO_FIELD',3)"
																	tablename="AS_COMPO_FIELD" sortdir="0" field="TAB_NA">标题</SPAN>
																<IMG src="/style/img/main/blank.gif" field="TAB_NA"></IMG>
															</TD>
															<TD class=clsColResize onmousedown=mousedown() width=6
																tablename="AS_COMPO_FIELD" fieldname="TAB_NA"></TD>
														</TR>
													</TBODY>
												</TABLE>
											</TD>
										</TR>
									</TBODY>
								</TABLE>

								<TABLE class=hideArea id=AS_COMPO_FIELDEditTable>
									<TBODY>
										<TR>
											<TD>
												<INPUT type=checkbox value=checkbox name=checkbox></INPUT>
											</TD>
											<TD fieldname="DATA_ITEM">
												<SPAN id=AS_COMPO_FIELD_DATA_ITEMSpan><INPUT
														class=normalFieldEdit id=AS_COMPO_FIELD_DATA_ITEMID
														name=DATA_ITEMEdit tablename="AS_COMPO_FIELD"
														fieldname="DATA_ITEM" fieldType="foreignKey" default=""
														isRight="Y" treeview="false"></INPUT>
												</SPAN>
											</TD>
											<TD fieldname="DATA_ITEM_NA">
												<SPAN id=AS_COMPO_FIELD_DATA_ITEM_NASpan><INPUT
														class=normalFieldEdit onkeypress=text_KeyPress();
														id=AS_COMPO_FIELD_DATA_ITEM_NAID maxLength=30 size=32
														name=DATA_ITEM_NAEdit tablename="AS_COMPO_FIELD"
														fieldname="DATA_ITEM_NA" minLength="0" fieldType="text"
														default=""></INPUT>
												</SPAN>
											</TD>
											<TD fieldname="TAB_NA">
												<SPAN id=AS_COMPO_FIELD_TAB_NASpan><INPUT
														class=normalFieldEdit onkeypress=text_KeyPress();
														id=AS_COMPO_FIELD_TAB_NAID maxLength=30 size=32
														name=TAB_NAEdit tablename="AS_COMPO_FIELD"
														fieldname="TAB_NA" minLength="0" fieldType="text"
														default="" alwaysReadonly="true"></INPUT>
												</SPAN>
											</TD>
										</TR>
									</TBODY>
								</TABLE>
								<DIV class=clsGridBody id=AS_COMPO_FIELDBody
									onscroll=body_Scroll() tablename="AS_COMPO_FIELD">
									<TABLE class=clsGridBodyTable
										onkeypress='tableKeyPress("AS_COMPO_FIELD")'
										id=AS_COMPO_FIELDBodyTable borderColor=#ffffff cellSpacing=0
										cellPadding=0 border=1>
										<COLGROUP id=AS_COMPO_FIELDCOL>
											<COL id=chkCol name="chk Col"></COL>
											<COL id=AS_COMPO_FIELDDATA_ITEMCOL name="DATA_ITEM"></COL>
											<COL id=AS_COMPO_FIELDDATA_ITEM_NACOL name="DATA_ITEM_NA"></COL>
											<COL id=AS_COMPO_FIELDTAB_NACOL name="TAB_NA"></COL>
										</COLGROUP>
										<TBODY vAlign=center>

										</TBODY>
									</TABLE>
								</DIV>
							</DIV>
							<INPUT class=clsCall id=AS_COMPO_FIELDADD
								title="快捷键是:Ctrl + Insert" onclick=grid_Add() type=button
								value=增加 name=ADD tablename="AS_COMPO_FIELD" read="false"></INPUT>
							<INPUT class=clsCall id=AS_COMPO_FIELDDEL
								title="快捷键是:Ctrl + Delete" onclick=grid_Del() type=button
								value=删除 name=DEL tablename="AS_COMPO_FIELD" read="false"></INPUT>
							<INPUT class=clsCall id=AS_COMPO_FIELDINSERT
								onclick=grid_Insert() type=button value=插入 name=INSERT
								tablename="AS_COMPO_FIELD" read="false"></INPUT>
						</DIV>
					</TD>
				</TR>
			</TBODY>
		</TABLE>
		<table border="0" width="65%">
			<tr>
			<td align="center" colspan=2>
				<input type="button" name="selectfield" value="选择字段"
					tablename="AS_COMPO_FIELD" read="false" onclick="selectfield();">
				&nbsp;&nbsp;
				<input type="button" name="fileup" value="确定"
					tablename="AS_COMPO_FIELD" read="false" onclick="ok();">
				&nbsp;&nbsp;
				<input type="button" value="关闭" onclick="closes();">
			</td>
			</tr>
		</table>
		<DIV class="clsSlide" id="slide"></DIV>
	</BODY>

</HTML>


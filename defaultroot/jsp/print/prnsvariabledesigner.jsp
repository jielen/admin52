<%@ page contentType="text/html; charset=GBK" %>
<HTML><HEAD>
<TITLE class="selTitle">����ѡ��</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=gb2312">
<LINK href="script/applus.css" type="text/css" rel="stylesheet">
<SCRIPT language="javascript" src="script/Community.js"></SCRIPT>
<SCRIPT language="javascript" src="script/page.js"></SCRIPT>
<SCRIPT language="javascript" src="script/grid.js"></SCRIPT>
<SCRIPT language="javascript" src="script/datagrid.js"></SCRIPT>
<SCRIPT language="javascript" src="script/PageData.js"></SCRIPT>
<SCRIPT language="javascript" src="script/General.js"></SCRIPT>
<SCRIPT language="VBScript" src="script/formenctype.vbs"></SCRIPT>
<SCRIPT language="javascript" src="script/print/prnsvariabledesigner.js"></SCRIPT>

</HEAD>
<DIV id="PRN_fieldstyle"  poid="body"
			style="z-index:10;display:none;width:230;
				padding-left:5;
				padding-right:5;
				padding-bottom:5;
      	FONT-SIZE:12px;
       	POSITION:absolute ;
       	border-top: thin outset #FFFFFF;
        border-right: thin outset #333333;
        border-bottom: thin outset #333333;
        border-left: thin outset #FFFFFF;
        background-color:menu;
       	border-color:#D9D9D9;">
  <div id=TITLE  align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
		�Զ����������
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();">
	</div>
	<DIV  style="border-style:groove;border-width:2px">
		<div>
			������:&nbsp;&nbsp;<input id=item type="text" size=10><BR>
			��������:<input id=itemname type="text" size=10>
  	</div>
  	<div>
  		��������:<select  id=vartype>
           <option  value="java.lang.String">java.lang.String</option>
           <option  value="java.lang.Integer">java.lang.Integer</option>
           <option  value="java.lang.Double">java.lang.Double</option>
         <!--<option  value="java.lang.Float">java.lang.Float</option>
           <option  value="java.lang.Boolean">java.lang.Boolean</option>
           <option  value="java.lang.Byte">java.lang.Byte</option>
           <option  value="java.lang.Long">java.lang.Long</option>
           <option  value="java.lang.Short">java.lang.Short</option>
           <option  value="java.util.Date">java.util.Date</option>
           <option  value="java.sql.Timestamp">java.sql.Timestamp</option>
           <option  value="java.sql.Time">java.sql.Time</option>
           <option  value="java.math.BigDecimal">java.math.BigDecimal</option>-->
        		</select>
 		</div>
  </DIV>
	<DIV  style="border-style:groove;border-width:2px">
    ��������:<select  id=caltype>
           <option  value="Nothing">--</option>
           <option  value="Count">��¼��</option>
           <option  value="Sum">���</option>
           <option  value="Average">ƽ��ֵ</option>
           <option  value="Lowest">��Сֵ</option>
           <option  value="Highest">���ֵ</option>
        </select><br>
    �������:<select  id=resettype>
           <option  value="None">----</option>
           <option  value="Report">��</option>
           <option  value="Page">ҳ</option>
           <option  value="Column">��</option>
           <option  value="Group">��</option>
        </select><br>
    �������ʽ��<textarea cols="27" rows="3" id="vexpression"></textarea>
  </DIV>
  <div align=center>
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setModify();">
  </div>
</DIV>
<BODY onLoad="windowload()">
  <span id="meta" componame="AS_COMPO_FIELD" pageName="AS_COMPO_FIELD_E"/>
    <span id="calls">
    </span>
      <span id="AS_COMPO_FIELDMeta" tablename="AS_COMPO_FIELD">
      </span>
  <span id="status" value="edit"></span>
  <span id="digest" value="9gX9f87QXY3Cp405WgxToGFsIHk="></span>
  </span>
  <TABLE class=pagebody cellSpacing=0 cellPadding=1
                        width="100%" border=0>
                                <TBODY>
                          <TR>
                            <TD id=A3TD onresize="resizeArea('A3');" vAlign=top
                            colSpan=2>
                              <DIV id=A3 width="100%">
                              <DIV class=clsGridContainer
                              id=AS_COMPO_FIELDContainer
                              style="WIDTH: 100%; HEIGHT: 250px"
                              tablename="AS_COMPO_FIELD">
                              <TABLE class=clsGridHeadTable
                              id=AS_COMPO_FIELDHeadTable borderColor=#ffffff
                              cellSpacing=0 cellPadding=0 width=230 border=1>
                                <TBODY>
                                <TR>
                                <TD vAlign=center align=middle width=30><INPUT
                                class=clsCHK id=selectAllID
                                onclick="selectAll('AS_COMPO_FIELD')"
                                type=checkbox name=selectAll></INPUT></TD>
                                <TD id=AS_COMPO_FIELD_DATA_ITEMCell vAlign=center
                                align=middle width=100 type="Text"
                                U_ColIndex="1" colno="1" parent="null">
                                <TABLE id=AS_COMPO_FIELD_DATA_ITEMTableID
                                cellSpacing=0 cellPadding=0 width=100 border=0>
                                <TBODY>
                                <TR>
                                <TD align=middle><SPAN class=clsGridHeadKeyCell
                                id=AS_COMPO_FIELD_DATA_ITEMCaptionID
                                onclick="sortTable('AS_COMPO_FIELD',1)"
                                tablename="AS_COMPO_FIELD" sortdir="0"
                                field="DATA_ITEM">������<SPAN
                                class=asterisk>*</SPAN></SPAN><IMG
                                src="/style/img/main/blank.gif"
                                field="DATA_ITEM"></IMG></TD>
                                <TD class=clsColResize onmousedown=mousedown()
                                width=6 tablename="AS_COMPO_FIELD"
                                fieldname="DATA_ITEM"></TD></TR></TBODY></TABLE></TD>
                                <TD id=AS_COMPO_FIELD_DATA_ITEM_NACell vAlign=center
                                align=middle width=100 type="Text"
                                U_ColIndex="2" colno="2" parent="null">
                                <TABLE id=AS_COMPO_FIELD_DATA_ITEM_NATableID
                                cellSpacing=0 cellPadding=0 width=100 border=0>
                                <TBODY>
                                <TR>
                                <TD align=middle><SPAN class=clsGridHeadCell
                                id=AS_COMPO_FIELD_DATA_ITEM_NACaptionID
                                onclick="sortTable('AS_COMPO_FIELD',2)"
                                tablename="AS_COMPO_FIELD" sortdir="0"
                                field="DATA_ITEM_NA">��������</SPAN><IMG
                                src="/style/img/main/blank.gif"
                                field="DATA_ITEM_NA"></IMG></TD>
                                <TD class=clsColResize onmousedown=mousedown()
                                width=6 tablename="AS_COMPO_FIELD"
                                fieldname="DATA_ITEM_NA"></TD></TR></TBODY></TABLE></TD></TR></TBODY></TABLE>

                              <TABLE class=hideArea id=AS_COMPO_FIELDEditTable>
                                <TBODY>
                                <TR>
                                <TD><INPUT type=checkbox value=checkbox
                                name=checkbox></INPUT></TD>
                                <TD fieldname="DATA_ITEM"><SPAN
                                id=AS_COMPO_FIELD_DATA_ITEMSpan><INPUT
                                class=normalFieldEdit
                                id=AS_COMPO_FIELD_DATA_ITEMID
                                name=DATA_ITEMEdit tablename="AS_COMPO_FIELD"
                                fieldname="DATA_ITEM" fieldType="foreignKey"
                                default="" isRight="Y"
                                treeview="false"></INPUT></SPAN></TD>
                                <TD fieldname="DATA_ITEM_NA"><SPAN
                                id=AS_COMPO_FIELD_DATA_ITEM_NASpan><INPUT
                                class=normalFieldEdit
                                onkeypress=text_KeyPress();
                                id=AS_COMPO_FIELD_DATA_ITEM_NAID maxLength=30
                                size=32
                                name=DATA_ITEM_NAEdit tablename="AS_COMPO_FIELD"
                                fieldname="DATA_ITEM_NA" minLength="0"
                                fieldType="text"
                                default=""></INPUT></SPAN></TD></TR></TBODY></TABLE>
                              <DIV class=clsGridBody id=AS_COMPO_FIELDBody
                              onscroll=body_Scroll() tablename="AS_COMPO_FIELD">
                              <TABLE class=clsGridBodyTable
                              onkeypress='tableKeyPress("AS_COMPO_FIELD")'
                              id=AS_COMPO_FIELDBodyTable borderColor=#ffffff
                              cellSpacing=0 cellPadding=0 border=1>
                                <COLGROUP id=AS_COMPO_FIELDCOL>
                                <COL id=chkCol name="chk Col"></COL>
                                <COL id=AS_COMPO_FIELDDATA_ITEMCOL
                                name="DATA_ITEM"></COL>
                                <COL id=AS_COMPO_FIELDDATA_ITEM_NACOL
                                name="DATA_ITEM_NA"></COL></COLGROUP>
                                <TBODY vAlign=center>

                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>PAGE_NUMBER</TD>
                                <TD>ҳ��</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>PAGE_NUMBER</TD>
                                <TD>ҳ��</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>REPORT_COUNT</TD>
                                <TD>���¼��</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>COLUMN_COUNT</TD>
                                <TD>�м�¼��</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>TABLE_COUNT</TD>
                                <TD>���¼��</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>SYSTEM_DATE</TD>
                                <TD>����</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>SYSTEM_YEAR</TD>
                                <TD>��</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>SYSTEM_MONTH</TD>
                                <TD>��</TD></TR>
                                <TR class=gridData onclick=gridRowClick()
                                vAlign=center tablename="AS_COMPO_FIELD">
                                <TD align=middle width=30><INPUT
                                onclick=selectPart() type=checkbox
                                name=selectAll></INPUT></TD>
                                <TD>SYSTEM_DAY</TD>
                                <TD>��</TD></TR>
                                </TBODY></TABLE></DIV></DIV><INPUT class=clsCall id=AS_COMPO_FIELDADD title="��ݼ���:Ctrl + Insert" onclick=grid_Add() type=button value=���� name=ADD tablename="AS_COMPO_FIELD" read="false"></INPUT>
<INPUT class=clsCall id=AS_COMPO_FIELDDEL title="��ݼ���:Ctrl + Delete" onclick=grid_Del() type=button value=ɾ�� name=DEL tablename="AS_COMPO_FIELD" read="false"></INPUT>
<INPUT class=clsCall id=AS_COMPO_FIELDINSERT onclick=grid_Insert() type=button value=���� name=INSERT tablename="AS_COMPO_FIELD" read="false"></INPUT>
<INPUT class=clsCall id=AS_COMPO_FIELDMODIFY onclick=grid_Modify() type=button value=�޸� name=MODIFY tablename="AS_COMPO_FIELD" read="false"></INPUT>
                              </DIV></TD></TR>
                          </TBODY></TABLE>
                    <SCRIPT language="javascript">
                      //window.onload= function(){initGrid("AS_COMPO_FIELD");};
                    </SCRIPT>
                    <table border="0" width="65%">
                    <tr>
                    <td align="center" colspan=2 ><input type="button" name="fileup" value="ȷ��" tablename="AS_COMPO_FIELD" read="false" onclick="ok();">
&nbsp;&nbsp;
  &nbsp;&nbsp;
<input type="button" value="�ر�" tablename="AS_COMPO_FIELD" onclick="closes();">
</td>
</tr>
</table>
                    </BODY>

                    </HTML>


<%@page contentType="text/html;charset=GBK"%>

<!--��������޸�,��������������-->
<DIV id="PRN_tablemodify"  poid="body"
     style="z-index:10;display:none;FONT-SIZE:12px;width:250;
						padding-left:5;
						padding-right:5;
						padding-bottom:5;
            POSITION:absolute;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;"
		onclick="event.cancelBubble=true;">
  <div id=TITLE   align="right" noWrap  style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
		�����������
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;left:225" onclick="closeTablePopMenu();">
	</div>
	<div style="border-style:groove;border-width:2px">
  	��������:<input name="area" type="text" size="10" disabled ></input>
  <div id="trPos" >
		��&nbsp;&nbsp;&nbsp;&nbsp;��:<input id=trheight type="text" value="" size=10>
	</div>
	<div id="tablePos" >
		����λ��:<br>
			&nbsp;��߾�:&nbsp;<input name="left" type="text" size="6" value=""></input>&nbsp;
			�ϱ߾�:<input name="top" type="text" size="6" value=""></input>
  		&nbsp;��&nbsp;&nbsp;��:&nbsp;<input id=width type="text" value="100%" size=6>&nbsp;
			��&nbsp;&nbsp;��:<input id=height type="text" value="100%" size=6>
	</div>
	</div>
	<div style="border-style:groove;border-width:2px">
  <div id=repeat >
  	<!--	<span id=tableyes>��Ƭ��ʽ</span>-->
  	<span id=tryes><label for="repeatyes">��&nbsp;��&nbsp;��</label></span>:
  	<input id=repeatyes name=repeat1 type=radio  >&nbsp;&nbsp;&nbsp;&nbsp;
  	<!--  <span id=tableno>�б�ʽ</span>-->
  	<span id=trno ><label for="repeatno">��&nbsp;&nbsp;��&nbsp;&nbsp;��</label></span>:
  	<input id=repeatno  name=repeat1 type=radio  >
  </div>
	<!--<div style="border-style:groove;border-width:2px">
  	�Զ����е���:<input id=adjustyes name=cajust type=radio  >&nbsp;&nbsp;
    �̶���:<input id=adjustno  name=cajust type=radio  >
  </div>
  -->
  <div id=print >
    <span><label for="printyes">�߿��ӡ</label></span>:
    <input id=printyes name=prn type=radio  >&nbsp;&nbsp;&nbsp;&nbsp;
    <span><label for="printno">�߿򲻴�ӡ</label></span>:
    <input id=printno  name=prn type=radio >
  </div>
  <div id="isBorderBondDiv" >
    <span><label for="printyes">���Ӵ�</label></span>:
    <input id="isBorderBondYes" name="isBorderBond" type="radio"  >&nbsp;&nbsp;&nbsp;&nbsp;
    <span><label for="printno">��򲻼Ӵ�</label></span>:
    <input id="isBorderBondNo"  name="isBorderBond" type="radio" >
  </div>
  <div>
    <label for="cprintyes">���ݴ�ӡ:</label>
    <input id=cprintyes name=pprint1 type=radio  >
    &nbsp;&nbsp;&nbsp;
    <label for="cprintno">���ݲ���ӡ:</label>
    <input id=cprintno  name=pprint1 type=radio  >
  </div>
  <div>
  		<span>ˮƽ����
  			<select  id=fcalign>
           <option  value="left">����</option>
           <option  value="center">����</option>
           <option  value="right">����</option>
      	</select>
      </span>
      <span>��ֱ����
  			<select  id=fcvalign>
           <option  value="top">����</option>
           <option  value="middle">����</option>
           <option  value="bottom">����</option>
      	</select>
      </span>
   </div>
  <!--<div>ˮƽ
  	����:<input id=alignleft name=falign type=radio  >
  	&nbsp;
  	����:<input id=aligncenter name=falign type=radio  >
  	&nbsp;
  	����:<input id=alignright name=falign type=radio >
	<br>
  ��ֱ
	 		����:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		����:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		����:<input id=valignbottom name=fcvalign type=radio >
		</div>-->
  </div>
	<!--�Ŀ��:<input id=border type="text" value="1" size=5> -->
  <!-- <div>
		����:<input id=left type="text" value="1" size=5>
		&nbsp;&nbsp;
		�ҿ��:<input id=right type="text" value="1" size=5>
  </div>
 	<div>
		�Ͽ��:<input id=top type="text" value="1" size=5>
    &nbsp;&nbsp;
		�¿��:<input id=bottom type="text" value="1" size=5>
  </div>  -->
	<div style="border-style:groove;border-width:2px">
  <div>
		��&nbsp;&nbsp;&nbsp;&nbsp;��:<select  id="fontname">
           <option  value="simsun" selected="selected">���� </option>
           <option  value="simkai">���� </option>
           <option  value="simhei">����</option>
           <option  value="simfang">������</option>
           <option  value="simli">������</option>
           <option  value="simyou">��Բ��</option>
        </select>
		�ִ�С:<input id=fsize  type="text" value="12" size=5>
  </div>
 	<div id=divfcolor ondblclick="tssetcellHeight();">
		��&nbsp;��&nbsp;ɫ:<input id=fcolor type="text" value="0000FF" size=10>
  </div>
 	<div id=divbgcolor>
		��&nbsp;��&nbsp;ɫ:<input id=bgcolor type="text" value="FFE4C4" size=10>
  </div>
  <div>
  	<label for="underline">��&nbsp;��&nbsp;��</label>
		<input name="funderline" id="underline" type=checkbox > &nbsp;&nbsp;
		<label for="italic">б��</label>
		<input name="fitalic" id="italic" type=checkbox > &nbsp;&nbsp;
		<label for="bold">����</label>
		<input name="fbold" id="bold" type=checkbox >
 	</div>
	<!--<div id=divbrcolor >
		����ɫ:<input id=bordercolor type="text" value="#FF1493" size=10>
  </div> -->
	</div>
  <!--�����Խ��Ա���Ч  -->
	<!--	<div id=ttablespace>
		��Ƭʽ��֮��ļ��:<input id="tablespace" type="text" value="10" size=5>
  </div>  -->
  <!-- �������Խ������������Ч   -->
  <div id="pprintnum" style="border-style:groove;border-width:2px;display:none">
  	����:&nbsp;���̶�����:<input id=printnum type=text size=5 ><br>
  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="printInNewPage">����ҳ��ӡ
    &nbsp;&nbsp;<input type="checkbox" name="resetPageNum">����ҳ��<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="headerEachPage">��ÿҳ�д�ӡ��ͷ
  </div>
  <div id=stretchOver style="border-style:groove;border-width:2px;display:">
  <span >
  	�������ʱ����&nbsp;<input name="stretchOverflow" type="checkbox" id="stretchOverflow" >
	</span>
	</div>
	<!--<div id="ttailnum" style="display:none">
	<script language=javascript >
  	function checkTailNumInput(obj){
    	var pnumobj=getObj("printnum");
    	var pnum=parseInt(pnumobj.value);
    	var val=parseInt(obj.value)
      if((pnum==NaN) || (pnum==0) || (val== NaN) ||(val>= pnum) ){
      	obj.value=pnum-1;
        alert("���벻�Ϸ�:"+pnum+"<="+val)
      }
 		}
	</script>
  	β���ϼ�����:<input id="tailnum" type=text size=5 onchange="checkTailNumInput(this);">
  </div>-->
  <div align=center>
    <!--�����ڶ�һ���Ѵ��ڵı��������  -->
    <input type=button name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closeTablePopMenu();">
    <input type=button name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setTableAttribute();">
  </div>
</DIV>

<!--��Ԫ�������޸�,���Ա����� -->
<DIV id="PRN_tablecell"  poid="body"
     style="z-index:10;display:none;FONT-SIZE:12px;width:250;
						padding-left:5;
						padding-right:5;
						padding-bottom:5;
            POSITION:absolute;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;"
		onclick="event.cancelBubble=true;">
	<div id=TITLE   align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
			��Ԫ����������
     	<img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closeTablePopMenu();">
	</div>
	<div style="border-style:groove;border-width:2px">
	��������:<input name="area" type="text" size="15" disabled ></input>
	<div>
		��&nbsp;&nbsp;&nbsp;&nbsp;��:<input id=width type="text" value="100%" size=5>
		&nbsp;&nbsp;
		��&nbsp;&nbsp;&nbsp;&nbsp;��:<input id=height type="text" value="100%" size=5>
	<!--�Ŀ��:<input id=border type="text" value="1" size=5>
	</div>
	<div>-->
	<!--	�Ŀ��:<input id=border type="text" value="1" size=5> -->
	</div>
  <div>
  	<label for="sfield">��&nbsp;��:</label>
  	<input id=sfield name=varorfield type=radio onclick = "varorfield();" />
    &nbsp;
    <label for="sparameter">��&nbsp;��:</label>
    <input id=sparameter name=varorfield type=radio onclick = "varorfield();" />
    &nbsp;
    <label for="svariable">��&nbsp;��:</label>
    <input id=svariable name=varorfield type=radio onclick = "varorfield();" />  
  </div>
  </div>
  <div style="border-style:groove;border-width:2px">
  <div>
    ��&nbsp;&nbsp;&nbsp;&nbsp;��:<input id=context type=text size=15 >
  </div>
  <div>
  		<span>ˮƽ����
  			<select  id=fcalign>
           <option  value="left">����</option>
           <option  value="center">����</option>
           <option  value="right">����</option>
      	</select>
      </span>
      <span>��ֱ����
  			<select  id=fcvalign>
           <option  value="top">����</option>
           <option  value="middle">����</option>
           <option  value="bottom">����</option>
      	</select>
      </span>
  </div>
  <div>
      <label for="printyes">���ݴ�ӡ:&nbsp;</label>
      <input id=printyes   name=print type=radio  />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label for="printno">���ݲ���ӡ:&nbsp;</label>
      <input id=printno  name=print type=radio  />
  </div>
 <!-- <div>
    ���ݴ�ӡ:&nbsp;<input id=printyes name=pprint type=radio  >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    ���ݲ���ӡ:&nbsp;<input id=printno  name=pprint type=radio  >
  </div>
  ˮƽ
    ����:<input id=alignleft name=falign type=radio  >
    &nbsp;
    ����:<input id=aligncenter name=falign type=radio  >
    &nbsp;
    ����:<input id=alignright name=falign type=radio >
  <br>
  ��ֱ
	 		����:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		����:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		����:<input id=valignbottom name=fcvalign type=radio >-->
		</div>
	<!--<div style="border-style:groove;border-width:2px">
    ��ӡ��:&nbsp;&nbsp;<input id=printzeroyes name=prnzero type=radio  title="��Ԫ��������β�����ӡ">
    &nbsp;&nbsp;&nbsp;&nbsp;
    ����ӡ��:&nbsp;&nbsp;<input id=printzerono  name=prnzero type=radio  title= "��Ԫ��������β���㲻��ӡ">
  </div>-->
	<DIV style="border-style:groove;border-width:2px">
  <div>
  	��&nbsp;&nbsp;&nbsp;&nbsp;��:<select  id=fontname>
           <option  value="simsun">���� </option>
           <option  value="simkai">���� </option>
           <option  value="simhei">����</option>
           <option  value="simfang">������</option>
           <option  value="simli">������</option>
           <option  value="simyou">��Բ��</option>
        </select>
		&nbsp;&nbsp;
		��С:<input id=fsize  type="text" value="12" size=5 >
  </div>
 	<div>
		��&nbsp;��&nbsp;ɫ:<input id=fcolor type="text" value="0000ff" size=10>
  </div>
 	<div>
		��&nbsp;��&nbsp;ɫ:<input id=bgcolor type="text" value="FFE4C4" size=10>
  </div>
  <div>
  	<label for="underline">��&nbsp;��&nbsp;��</label>
		<input name="funderline" id="underline" type=checkbox > &nbsp;&nbsp;
		<label for="italic">б��</label>
		<input name="fitalic" id="italic" type=checkbox > &nbsp;&nbsp;
		<label for="bold">����</label>
		<input name="fbold" id="bold" type=checkbox >
 	</div>
  <!--<div>
		����ɫ:<input id=bordercolor type="text" value="FF1493" size=10>
  </div>-->
	</DIV>
	<div id=variables style="border-style:groove;border-width:2px">
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
        		</select><br>
    ��������:<select  id=caltype>
           <option  value="Nothing">--</option>
           <option  value="Count">��¼��</option>
           <option  value="Sum">���</option>
           <option  value="Average">ƽ��ֵ</option>
           <option  value="Lowest">��Сֵ</option>
           <option  value="Highest">���ֵ</option>
        </select>
    �������:<select  id=resettype>
           <option  value="None">--</option>
           <option  value="Report">��</option>
           <option  value="Page">ҳ</option>
           <option  value="Column">��</option>
           <option  value="Group">��</option>
        </select><br>
    �������ʽ��<textarea cols="28" rows="3" id="vexpression"></textarea>
    <!--<input id=vexpression  type="text" value="" size=18>-->
  </div>
  <div style="border-style:groove;border-width:2px">
 	<div>
		<span>
		���Ŵ�ӡ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="isVertical"  type="checkbox" />
	<!--	:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��<input id=isVerticalYes type="radio"  name='isVertical'>&nbsp;
      					��<input id=isVerticalNo type="radio"  name='isVertical' checked>-->
  	</span>
 		 <span id=stretchOver>
  	�������ʱ����&nbsp;<input name="stretchOverflow" type="checkbox" id="stretchOverflow" >
	</span>
  </div>
  <!--<div>
		����ʱÿ�е�����:<input id=charsPerLine  type="text" size=4 value="1">
  </div>
 	<div>
		����ʱ�м��(��):<input id=distance  type="text" size=4 value="0">
  </div>  -->
  <div>
  <span>
    ����ӡֵ������<input id="printValSetCode"  type="checkbox" />
  </span>
  <span>
		<label for="istoupper">תΪ����Ҵ�д</label>
		<input id="istoupper"  type="checkbox" />
	<!--	:&nbsp;��<input id=istoupperYes type="radio"  name='istoupper'>&nbsp;
      									��<input id=istoupperNo type="radio"  name='istoupper' checked>-->
  	</span>
	</div>
	<div>
      ����ӡ��<input id="printZero"  type="checkbox" />
  </div>
 	<div>
		С��λ:<input id=scale type="text" value="100%" size=5  title="��ǰ��Ԫ��С����ȷλ��">
		&nbsp;&nbsp;
		�ֽ��:<select id=delimiter >
         		<option value="">&nbsp;&nbsp; </option>
         		<option value=",">,</option>
     			 </select>
  </div>
  </div>
  
	<script language=javascript >
		function writeBorderSelectOption(){
			var result = "";
			result += "<option value=\"1\" selected>1</option>";
			result += "<option value=\"2\">2</option>";
			result += "<option value=\"3\">3</option>";
			result += "<option value=\"4\">4</option>";
			result += "<option value=\"none\">��</option>";
			result += "<option value=\"dotted\">����</option>";
			return result;
		}
	</script>
	
	<DIV style="border-style:groove;border-width:2px">
  <!--
  <div>
		�߿���:
		<select id="borderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
	</div>
	-->
 	<div>
 		����:&nbsp;&nbsp;
 		<select id="leftBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
    �ҿ��:
 		<select id="rightBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
	</div>
 	<div>
    �Ͽ��:&nbsp;&nbsp;
		<select id="topBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
		�¿��:
		<select id="bottomBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
  </div>
  </div>

  <div align=center>
    <!--�����ڶ�һ���Ѵ��ڵı��������  -->
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closeTablePopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setCellAttribute();">
  </div>
</DIV>

<!--�����鿪ʼ -->
<DIV id="PRN_tablestyle"
     poid="body"
     style="z-index:10;display:none;FONT-SIZE:12px;width:250;
						padding-left:5;
						padding-right:5;
						padding-bottom:5;
            position:absolute;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;
            border-color:#D9D9D9;" onclick="event.cancelBubble=true;">
  <div id=TITLE   align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
    �û��Զ�����
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();"></div>
	<div style="border-style:groove;border-width:2px">
  	<div>
			��&nbsp;&nbsp;��:<input id=cols type="text" value="5" size=7>
  		&nbsp;��&nbsp;&nbsp;��:<input id=rows  type="text" value="2" size=7>
  	</div>
  </div>
  <br>
  <!--<div style="border-style:groove;border-width:2px">
     <div>
			����:<input id=border type="text" value="2" size=6>
			�ڿ��:<input id=cellspacing type="text" value="2" size=6>
  	</div>
  </div>
  <br>-->
  <div style="border-style:groove;border-width:2px">
  <div>
    ��&nbsp;&nbsp;��:<select  id=fontname>
           <option  value="simsun">���� </option>
           <option  value="simkai">���� </option>
           <option  value="simhei">����</option>
           <option  value="simfang">������</option>
           <option  value="simli">������</option>
           <option  value="simyou">��Բ��</option>
        </select>
		�ִ�С:<input id=fsize  type="text" value="12" size=7>
  </div>
 	<div>����ɫ:<input id=fcolor type="text" value="" size=7>
	</div>
  </div>
  <br>
  <div style="border-style:groove;border-width:2px">
 	<div>����ɫ:<input id=bgcolor type="text" value="" size=7>
	</div>
	</div>
  <!--<div>����ɫ:
  	<input id=bordercolor type="text" value="#FF1493" size=7>
  </div>-->
  <br>
  <div align=center>
    <!--�����ڶ�һ���Ѵ��ڵı��������  -->
    <input   type=button  id="del" value="ɾ��" onclick="deleteDiv();" style="display:none" >
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setTable();">
  </div>
</DIV>
<!--���嶨��鿪ʼ -->
<DIV id="PRN_fieldstyle"  poid="body"
			style="z-index:10;display:none;width:250;
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
		�ֶ���������
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();">
	</div>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
			��������:<input name="area" type="text" size="10" disabled ></input>
		</div>
  	<div>
      ����λ��:
  		<br>
  		<div>&nbsp;��߾�:&nbsp;<input name="left" type="text" size="6" value=""></input>
  			&nbsp;�ϱ߾�:<input name="top" type="text" size="6" value=""></input>
  		</div>
 			<div>
	  		&nbsp;��&nbsp;&nbsp;��:&nbsp;<input name="width" type="text" size="6" value=""></input>
  			&nbsp;��&nbsp;&nbsp;��:<input name="height" type="text" size="6" value=""></input>
			</div>
		</div>
	</DIV>
	<DIV id="svarorfieldDiv" style="border-style:groove;border-width:2px">
  	<label for="ssfield">��&nbsp;��:</label>
  	<input id=ssfield name=svarorfield type=radio onclick = "svarorfield();" />
    &nbsp;
    <label for="ssparameter">��&nbsp;��:</label>
    <input id=ssparameter name=svarorfield type=radio onclick = "svarorfield();" />
    &nbsp;
    <label for="ssvariable">��&nbsp;��:</label>
    <input id=ssvariable name=svarorfield type=radio onclick = "svarorfield();" />  
  </DIV>
	<DIV style="border-style:groove;border-width:2px">
  	<div >
			��&nbsp;&nbsp;&nbsp;��:&nbsp;<input id=content type="text" size=21>
  	</div>
  	<div>
  		<span>ˮƽ����
  			<select  id=fcalign>
           <option  value="left">����</option>
           <option  value="center">����</option>
           <option  value="right">����</option>
      	</select>
      </span>
      <span>��ֱ����
  			<select  id=fcvalign>
           <option  value="top">����</option>
           <option  value="middle">����</option>
           <option  value="bottom">����</option>
      	</select>
      </span>
     </div>
     <div id="printBorder" >
       <span><label for="printBorderYes">�߿��ӡ</label></span>:
       <input id="printBorderYes" name="printBorder" type="radio"  >&nbsp;&nbsp;&nbsp;&nbsp;
       <span><label for="printBorderNo">�߿򲻴�ӡ</label></span>:
       <input id="printBorderNo"  name="printBorder" type="radio" >
     </div>
     <div>
      <label for="printyes">���ݴ�ӡ:</label>
      <input name=print id=printyes  type=radio  >
      &nbsp;&nbsp;&nbsp;
      <label for="printno">���ݲ���ӡ:</label>
      <input name=print id=printno   type=radio  >
  	</div>
<!--	 		����:<input id=alignleft name=fcalign type=radio  >
  		&nbsp;
  		����:<input id=aligncenter name=fcalign type=radio >
  		&nbsp;
  		����:<input id=alignright name=fcalign type=radio >
		</div>
		<div>��ֱ
	 		����:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		����:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		����:<input id=valignbottom name=fcvalign type=radio >
		</div>-->
	</DIV>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
			��&nbsp;&nbsp;&nbsp;&nbsp;��:<select  id=fontname>
           <option  value="simsun">���� </option>
           <option  value="simkai">���� </option>
           <option  value="simhei">����</option>
           <option  value="simfang">������</option>
           <option  value="simli">������</option>
           <option  value="simyou">��Բ��</option>
        </select>
			&nbsp;&nbsp;��С:<select name="fsize" >
          <script language="JavaScript">document.writeln(writeFontSize());</script>
        </select>
  	</div>
  	<div>
			��&nbsp;��&nbsp;ɫ:<input id=fcolor type="text" value="2" size=10>
		</div>
		<div>
			��&nbsp;��&nbsp;ɫ:<input id=bgcolor type="text" value="2" size=10>
  	</div>
  	<div>
			<label for="underline">��&nbsp;��&nbsp;��</label>
			<input name="funderline" id="underline" type="checkbox"> &nbsp;&nbsp;
			<label for="italic">б��</label>
			<input name="fitalic" id="italic" type=checkbox > &nbsp;&nbsp;
			<label for="bold">����</label>
			<input name="fbold" id="bold" type=checkbox >
  	</div>
 		<!--<div>
			��&nbsp;&nbsp;��:<input id=fwidth type="text" value="2" size=6>
			��&nbsp;&nbsp;��:<input id=fheight  type="text" value="12" size=6>
  	</div>   -->
	</DIV>
	  <div id=variables style="border-style:groove;border-width:2px">
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
        		</select><br>
    ��������:<select  id=caltype>
           <option  value="Nothing">--</option>
           <option  value="Count">��¼��</option>
           <option  value="Sum">���</option>
           <option  value="Average">ƽ��ֵ</option>
           <option  value="Lowest">��Сֵ</option>
           <option  value="Highest">���ֵ</option>
        </select>
    �������:<select  id=resettype>
           <option  value="None">--</option>
           <option  value="Report">��</option>
           <option  value="Page">ҳ</option>
           <option  value="Column">��</option>
           <option  value="Group">��</option>
        </select><br>

    �������ʽ��<textarea cols=28" rows="3" id="vexpression"></textarea>
    <!--<input id=vexpression  type="text" value="" size=18>-->
  </div>
 	<DIV id=notStaticText style="border-style:groove;border-width:2px" >
 		<div>
 			<span id=isVerticalDiv>
				���Ŵ�ӡ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input id="isVertical"  type="checkbox" />
  		</span>
  		<span id=stretchOver>
  		�������ʱ����&nbsp;<input name="stretchOverflow" type="checkbox" id="stretchOverflow" >
		  </span>
    </div>
    <div>
    <span id=printValSetCodeDiv>
      ����ӡֵ������<input id="printValSetCode"  type="checkbox" checked="checked"/>
    </span>
    <span id=istoupperDiv>
				<label for="istoupper">תΪ����Ҵ�д</label>
				<input id="istoupper"  type="checkbox" />
  	</span>
    </div>
		<!--<div id=stretch>��������<select name="stretchType">
        <option value="NoStretch">������</option>
        <option value="RelativeToTallestObjec">�뱾����ߵ�Ԫ��һ��</option>
        <option value="RelativeToBandHeight">�뱾�εĸ߶�һ��</option>
      </select>
		</div>  -->
		<div id="printZeroDiv">
      ����ӡ��<input id="printZero"  type="checkbox" />
  	</div>
		<DIV id=scaleAndDelimiter>
			С&nbsp;��&nbsp;λ:<input id=scale type="text" value="100%" size=5  title="��ǰ��Ԫ��С����ȷλ��">
			&nbsp;
			��&nbsp;��&nbsp;��:<select id=delimiter >
         		 	<option value="">&nbsp;&nbsp; </option>
         			<option value=",">,</option>
     				 </select>
		</DIV>
  	<div>
  		<label for="isPrintInSplitedTemplate">ģ��ָ�ʱÿҳ��ӡ����</label>
  		<input id="isPrintInSplitedTemplate" type="checkbox"/>
  	</div>
  </DIV>
  <div align=center>
    <input   type=button  id="del" name=del value="ɾ��" style="color:blue;border:1;cursor:hand;" onclick="deleteDiv(nowDivID);">
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setFieldStyle(nowDivID);">
  </div>
</DIV>
<!--ֱ��������ʼ -->
<!--ֱ�߶���鿪ʼ -->
<DIV id="PRN_linestyle"  poid="body"
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
  <div id=TITLE   align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
  	ֱ����������
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();">
	</div>
	<DIV style="border-style:groove;border-width:2px">
  	<div >
  		��������:<input name="area" type="text" size="10" disabled ></input>
  		<br>
  		ֱ�߷���:<select name="lineDirection" onChange="changelineDirection()">
          			<script language="JavaScript">document.writeln(writelineDirection());</script>
        			 </select>
  	</div>
   	<br>
	</DIV>
	<DIV style="border-style:groove;border-width:2px">
  	<input id=horizontalLine type=radio name=setSpecLine onclick="setSpecLine();">ˮƽ�� &nbsp;
   	<input id=verticalLine type=radio  name=setSpecLine onclick="setSpecLine();">��ֱ�� &nbsp;
   	<input id=recover type=radio  name=setSpecLine onclick="setSpecLine();">��ԭ &nbsp;
	</DIV>
	<br>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
  	ֱ������:
  	</div>
  	<div> &nbsp;���   &nbsp;X:<input name="left" type="text" size="10" value=""></input>
  	</div>
  	<div> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; Y:<input name="top" type="text" size="10" value=""></input>
  	</div>
 		<div>
	 		&nbsp;�յ�  &nbsp;X:<input name="width" type="text" size="10" value=""></input>
  	</div>
  	<div>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; Y:<input name="height" type="text" size="10" value=""></input>
		</div>
	</DIV>
	<br>
 	<div style="border-style:groove;border-width:2px">
 		<div>������ϸ:<select name="linePen" onChange="changelinePen()">
          					<script language="JavaScript">document.writeln(writelinePen());</script>
        					</select>
    </div>
  	<div>
			ֱ����ɫ:<input name="backcolor" type="text" size="8" >
		</div>
  </div>
  <div align=center>
    <input   type=button  id="del" name=del value="ɾ��" style="color:blue;border:1;cursor:hand;" onclick="deleteLine();">
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setLineStyle();">
  </div>
</DIV>
<!--ֱ���������� -->

<!--ͼ��������ʼ -->
<!--ͼ�ζ���鿪ʼ -->
<DIV id="PRN_picstyle"  poid="body"
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
  <div id=TITLE   align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
  	ͼ����������
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();">
	</div>
	<DIV style="border-style:groove;border-width:2px">
  	<div >
			��������:<input name="area" type="text" size="10" disabled ></input>
  	</div><br>
  	<div>
      ����λ��:
  		<br>
  		<div >��߾�:<input name="left" type="text" size="6" value=""></input>
  			&nbsp;�ϱ߾�:<input name="top" type="text" size="6" value=""></input>
  		</div>
 			<div>
	  		��&nbsp;&nbsp;��:<input name="width" type="text" size="6" value=""></input>
  			&nbsp;��&nbsp;&nbsp;��:<input name="height" type="text" size="6" value=""></input>
			</div>
  	</div>
	</DIV>
	<br>
	<DIV style="border-style:groove;border-width:2px">
		ͼƬ��С��ָ��ͼ��Ԫ�ش�С��һ��ʱ:
    <input id=RetainShape type=radio  name=scaleImage >����ԭ�д�С
		<input id=FillFrame type=radio name=scaleImage >����
   	<input id=Clip  type=radio  name=scaleImage >����
	</DIV>
	<div style="border-style:groove;border-width:2px">
 		<div>�߿�:<select name="linePen">
          					<script language="JavaScript">document.writeln(writelinePen2());</script>
        					</select>
    </div>
  </div>
	<DIV style="border-style:groove;border-width:2px">
		���ʽ:
		<textarea cols="28" rows="3" id="vexpression"></textarea>
	</DIV>
	<br>
  <div align=center>
    <input   type=button  id="del" name=del value="ɾ��" style="color:blue;border:1;cursor:hand;" onclick="deletePic(nowDivID);">
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setPicStyle();">
  </div>
</DIV>
<!--ͼ���������� -->
<!-- �������޸Ĳ˵�  -->
<div id="tablepopup" poid="body" popup="true"
			style="z-index:1;display:none;width=90;FONT-SIZE:12px;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;">
	<div style="width=90" onmouseover="showSubMenu('rowSubMenu')" onmouseout="hideSubMenu('rowSubMenu')">��</div>
  <div onmouseover="showSubMenu('colSubMenu')" onmouseout="hideSubMenu('colSubMenu')">��</div>
  <div onmouseover="showSubMenu('tableSubMenu')" onmouseout="hideSubMenu('tableSubMenu')">��</div>
  <div onmouseover="showSubMenu('cellSubMenu')" onmouseout="hideSubMenu('cellSubMenu')">��Ԫ��</div>
	<!-- <div onmouseover="showSubMenu('aa')" onclick="addCellContext(0);";>�������� </div>
  <div onmouseover="showSubMenu('aa')" onclick="addCellContext(1);";>�������� </div>
  <div onmouseover="showSubMenu('aa')" onclick="addCellContext(2);";>�������� </div>-->
  <div onmouseover="showSubMenu('aa')" onclick="updatetbcode();"> ��������</div>
	</div>
<DIV id="cellSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none;FONT-SIZE:12px;width=90;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('cellSubMenu');"onmouseout="subMenuMouseOut('cellSubMenu');" onclick="closeSubMenu('cellSubMenu');">
  <div style="width:100%" onclick="cellAttribute();" onmouseover="pmenuover()" onmouseout="pmenuout()">��Ԫ������</div>
  <div style="width:100%" onclick="delCell();" onmouseover="pmenuover()" onmouseout="pmenuout()">ɾ����Ԫ�� </div>
  <div style="width:100%" onclick="insertTableCell(0);" onmouseover="pmenuover()" onmouseout="pmenuout()">������һ��</div>
  <div style="width:100%" onclick="insertTableCell(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">�ҷ�����һ�� </div>
  <div style="width:100%" onclick="insertTableCell(-1);" onmouseover="pmenuover()" onmouseout="pmenuout()">β������һ�� </div>
  <div style="width:100%" onclick="delCellText();" onmouseover="pmenuover()" onmouseout="pmenuout()">ɾ����Ԫ������ </div>
</DIV>
<DIV id="rowSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none;FONT-SIZE:12px;width=90;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('rowSubMenu');"onmouseout="subMenuMouseOut('rowSubMenu');" onclick="closeSubMenu('rowSubMenu');">
   <div style="width:100%" onclick="tableAttribute(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">������ </div>
   <div style="width:100%" onclick="delRow();" onmouseover="pmenuover()" onmouseout="pmenuout()">ɾ������� </div>
   <div style="width:100%" onclick="insertTableRow(0);" onmouseover="pmenuover()" onmouseout="pmenuout()">�Ϸ�����һ�� </div>
   <div style="width:100%" onclick="insertTableRow(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">�·�����һ�� </div>
   <div style="width:100%" onclick="insertTableRow(-1);" onmouseover="pmenuover()" onmouseout="pmenuout()">β������һ�� </div>
</DIV>
<DIV id="colSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none; FONT-SIZE:12px;width=90;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('colSubMenu');"onmouseout="subMenuMouseOut('colSubMenu');" onclick="closeSubMenu('colSubMenu');">
   <div style="width:100%" onclick="colAttribute();" onmouseover="pmenuover()" onmouseout="pmenuout()">������ </div>
   <div style="width:100%" onclick="delCol();" onmouseover="pmenuover()" onmouseout="pmenuout()">ɾ������� </div>
   <div style="width:100%" onclick="insertTableCol(0);" onmouseover="pmenuover()" onmouseout="pmenuout()">�������һ�� </div>
   <div style="width:100%" onclick="insertTableCol(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">�ұ�����һ�� </div>
   <div style="width:100%" onclick="insertTableCol(-1);" onmouseover="pmenuover()" onmouseout="pmenuout()">β������һ�� </div>
</DIV>
<DIV id="tableSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none; FONT-SIZE:12px;width=100;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('tableSubMenu');"onmouseout="subMenuMouseOut('tableSubMenu');" onclick="closeSubMenu('tableSubMenu');">
   <div style="width:100%" onclick="tableAttribute(2);" onmouseover="pmenuover()" onmouseout="pmenuout()">������ </div>
   <div style="width:100%" onclick="testPos();" onmouseover="pmenuover()" onmouseout="pmenuout()">���ڼӱ� </div>
   <div style="width:100%" onclick="delTable();" onmouseover="pmenuover()" onmouseout="pmenuout()">ɾ��������� </div>
   <div style="width:100%" onclick="copyTable();" onmouseover="pmenuover()" onmouseout="pmenuout()">���Ʊ�񵽼����� </div>
</DIV>
<div id=tablemerge  popup="true"
		style="display:none; FONT-SIZE:12px;width=100;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;">
	<div style="width:100%" onclick="mergeCells();" >ѡ�б��ϲ�</div>
  <div style="width:100%" onclick="delSelCells();" >ѡ�б��ɾ�� </div>
</div>
<div id="pageDataSet"  popup="true"
			style="display:none;FONT-SIZE: 12px; width:170;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;">
  <div style="width=170;" onmouseover="showSubMenu('editSubMenu');" onmouseout="hideSubMenu('editSubMenu');">�༭</div>
  <div onmouseover="showSubMenu('scriptSubMenu')" onmouseout="hideSubMenu('scriptSubMenu')">Դ�ļ��༭</div>
	<div onmouseover="showSubMenu('aa')" onclick="fieldDisp(true);" >��ʾģ���ֶ�</div>
  <div onmouseover="showSubMenu('aa')" onclick="fieldDisp(false);" >����ģ���ֶ�</div>
  <div onmouseover="showSubMenu('aa')" onclick="openTemplateBody(cursorObj);" >������ǰ��������</div>
  <div onclick="autoSetBodyMinHeight(cursorObj);" >�Զ����õ�ǰ������С�߶�</div>
  <div onclick="autoAdjustBodyFields(cursorObj);" >�Զ�������ǰ������Ԫ��λ��</div>
  <div onclick="autoAdjustAllBodyFields();" >�Զ���������������Ԫ��λ��</div>
</div>
<DIV id="editSubMenu" parentDiv="pageDataSet"
			style="display:none;position:absolute;FONT-SIZE:12px;width:100;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
  			border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
  			background-color:menu;"
			onmouseover="subMenuMouseOver('editSubMenu');"onmouseout="subMenuMouseOut('editSubMenu');" onclick="closeSubMenu('editSubMenu');">
	<div style="width=80;"onclick="divCopy(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">��ǰ������</div>
	<div onclick="divPaste(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">��ǰ����ճ�� </div>
	<div onclick="clearDiv(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">��ǰ�������</div>
	<div onclick="divCopy(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">����ģ�帴��</div>
	<div onclick="divPaste(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">����ģ��ճ��</div>
	<div onclick="clearDiv(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">����ģ�����</div>
</DIV>
<DIV id="scriptSubMenu" parentDiv="pageDataSet"
			style="display:none;position:absolute;FONT-SIZE:12px;width:150;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
  			border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
  			background-color:menu;"
			onmouseover="subMenuMouseOver('scriptSubMenu');" onmouseout="subMenuMouseOut('scriptSubMenu');" onclick="closeSubMenu('scriptSubMenu');">
	<div onclick="dispHtmlouter(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">��ʾ��ǰ����ű�</div>
	<div onclick="dispHtmlinner(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">��ʾ��ǰ�����ڽű�</div>
  <div onclick="dispHtmlouter(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">��ʾ��ǰ����ģ��ű�</div>
	<div onclick="dispHtmlinner(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">��ʾ��ǰ����ģ���ڽű�</div>
</DIV>
<!--����ڵı��⡢�������������ÿ�ʼ -->
<DIV id=PRN_tablecellcontent
     poid="body"
     style="z-index:10;display:none;width:230;
						padding-left:5;
						padding-right:5;
						padding-bottom:5;
            FONT-SIZE:12px;
            position:absolute;
						border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
        		border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
        		background-color:menu;">
  <div id=TITLE   align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
     <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closeTablePopMenu();">
 	</div>
 	<div>
		��&nbsp;&nbsp;��:<input id=context type=text size=20>
 	</div>
 	<div align="center" style="border-style:groove;border-width:2px">
   	����:<input id=alignleft name=falign type=radio  > &nbsp;&nbsp;&nbsp;
   	����:<input id=aligncenter name=falign type=radio  >&nbsp;&nbsp;&nbsp;
   	����:<input id=alignright name=falign type=radio >
  </div>
 	<div style="border-style:groove;border-width:2px">
		��&nbsp;&nbsp;��:<input id=fwidth type=text size=5>
		�»���:<input id="underline" type="checkbox">
 	</div>
	<DIV style="border-style:groove;border-width:2px">
 		<div>
			��&nbsp;&nbsp;��:<select  id=fontname>
      	<option  value="simsun">���� </option>
      	<option  value="simkai">���� </option>
      	<option  value="simhei">����</option>
      	<option  value="simfang">������</option>
      	<option  value="simli">������</option>
      	<option  value="simyou">��Բ��</option>
   		</select>
			�ִ�С:<input id=fsize  type="text" value="12" size=6>
 		</div>
  	<div>
			����ɫ:<input id=fcolor type="text" value="" size=8>
  	</div>
  	<div>
			����ɫ:<input id=bgcolor type="text" value="" size=8>
   	</div>
	</DIV>
  <br>
  <div align=center>
  	<input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closeTablePopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setCellContext();">
  </div>
</DIV>
<!--�����ӡ����ʼ  popup=true ��ǰ�˵����϶���=null or false �������϶�  -->
<DIV id=PRN_templatearea poid="body"
     style="z-index:10;display:none;width:220;
						padding-left:5;
						padding-right:5;
						padding-bottom:5;
            FONT-SIZE: 12px;
            position:absolute;
						border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
        		border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
        		background-color:menu;">
 	<div id=TITLE   align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
 		�Զ����ӡ��������
 		<img src="/style/img/button/menu_close.gif" onclick="closePopMenu();">
 	</div>
  <div style="background-color:#F0FFFF">��������:
    <span id=areaName ></span>
  </div>
 	<br>
  <div >��&nbsp;&nbsp;��:
    <input id=height type=text size=7>
  </div>
 	<div>����ɫ:
    <input id=bgcolor type="text" value="" size=7 >
  </div>
 	<div style="border-style:groove;border-width:2px">
		��������ͷ:<input name=isadjustheader type=radio id=isadjustheaderno >
    &nbsp;&nbsp;&nbsp;
    ������ͷ:<input name=isadjustheader type=radio id=isadjustheaderyes >
  </div>
  <br>
  <div align=center>
    <input type=button name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input type=button value="�������" style="color:blue;border:1;cursor:hand;" onclick="clearmybody();" >
    <input type=button name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setTemplateBody();">
  </div>
</DIV>
<!--�ֶο��ӻ��ϷŲ��� -->
<DIV id=PRN_fieldsDragDrop  poid="body"
       style="z-index:10;display:none;
       			FONT-SIZE: 12px;
       			POSITION:absolute ;
						width:200;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;">
  <div id=TITLE   align=right noWrap style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;" onmousedown="releaseDrag();">
  	�ֶο��ӻ��ϷŲ���&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="/style/img/button/menu_close.gif" onclick="closeDragPopMenu();"></div>
  <div onclick="setDragBack();"  >
     <table border=0 style="font-size:12px" cellspacing=0 cellpadding=0 onclick="getFieldName();" width=100%>
      <tr>
        <td>����</td>
        <td>�ֶα���</td>
        <td>�ֶα���</td>
      </tr>
      <tr>
        <td><select id=dragConst> </select></td>
        <td><select id=dragLabel> </select></td>
        <td><select id=dragField> </select></td>
      </tr>
     </table>
      <div> ѡ���ǩ����<span id=tagField  ondragstart="tagDragdStart();" ondrag="tagdrag();" ondragend="tagDragEnd();" onclick="setDragBack();"> </span>
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
  </div>
</DIV>
<!-- �������޸�-->
<DIV id=PRN_colmodify  poid="body"
     style="z-index:10;display:none;FONT-SIZE:12px;width:250;
						padding-left:5;
						padding-right:5;
						padding-bottom:5;
            POSITION:absolute;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;"
		onclick="event.cancelBubble=true;">
  <div id=TITLE   align="right" noWrap  style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
    	����������
     	<img src="/style/img/button/menu_close.gif" style="cursor=hand;left:225" onclick="closeColPopMenu();">
	</div>
	<div style="border-style:groove;border-width:2px">
	<div>
	��������:<input name="area" type="text" size="10" disabled ></input>
	</div>
	<div>
		��&nbsp;&nbsp;&nbsp;&nbsp;��:<input id=width type="text" size=10>
		&nbsp;&nbsp;
	<!--	�Ŀ��:<input id=border type="text" size=5> -->
	</div>
	</div>
  <div style="border-style:groove;border-width:2px">
  <div>
	<label for="printyes">���ݴ�ӡ:</label>
	<input id=printyes name=pprint type=radio  >
  &nbsp;&nbsp;&nbsp;
  <label for="printno">���ݲ���ӡ:</label>
  <input id=printno  name=pprint type=radio  >
	</div>
	<div>
  		<span>ˮƽ����
  			<select  id=fcalign>
           <option  value="left">����</option>
           <option  value="center">����</option>
           <option  value="right">����</option>
      	</select>
      </span>
      <span>��ֱ����
  			<select  id=fcvalign>
           <option  value="top">����</option>
           <option  value="middle">����</option>
           <option  value="bottom">����</option>
      	</select>
      </span>
  </div>
<!--  <div>
  ˮƽ
    ����:<input id=alignleft name=falign type=radio  >
    &nbsp;
    ����:<input id=aligncenter name=falign type=radio  >
    &nbsp;
    ����:<input id=alignright name=falign type=radio >
  <br>
  ��ֱ
	 		����:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		����:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		����:<input id=valignbottom name=fcvalign type=radio >
  </div>-->
  </div>
	<!-- <div style="border-style:groove;border-width:2px">
      ��ӡ��:&nbsp;&nbsp;<input id=printzeroyes name=prnzero type=radio  title="��Ԫ��������β�����ӡ">
      &nbsp;&nbsp;&nbsp;&nbsp;
      ����ӡ��:&nbsp;&nbsp;<input id=printzerono  name=prnzero type=radio  title= "��Ԫ��������β���㲻��ӡ">
  </div>-->
	<DIV style="border-style:groove;border-width:2px">
  <div>
  	��&nbsp;&nbsp;&nbsp;&nbsp;��:<select  id=fontname>
           <option  value="simsun">���� </option>
           <option  value="simkai">���� </option>
           <option  value="simhei">����</option>
           <option  value="simfang">������</option>
           <option  value="simli">������</option>
           <option  value="simyou">��Բ��</option>
        </select>
		&nbsp;&nbsp;
		��С:<input id=fsize  type="text" value="12" size=5>
  </div>
  <div>
  </div>
 	<div>
		��&nbsp;��&nbsp;ɫ:<input id=fcolor type="text" value="" size=10>
  </div>
 	<div>
		��&nbsp;��&nbsp;ɫ:<input id=bgcolor type="text" value="" size=10>
  </div>
  <!--	<div>
		����ɫ:<input id=bordercolor type="text" value="" size=10>
  </div> -->
	</DIV>
	<DIV style="border-style:groove;border-width:2px">
	<div>
		<span>
		<label for="isVertical">���Ŵ�ӡ</label>
		<input id="isVertical"  type="checkbox" />
	<!--	:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��<input id=isVerticalYes type="radio"  name='isVertical'>&nbsp;
      					��<input id=isVerticalNo type="radio"  name='isVertical' checked>-->
  	</span>&nbsp;&nbsp;
 		<span>
		<label for="istoupper">ת��Ϊ����Ҵ�д</label>
		<input id="istoupper"  type="checkbox" />
	<!--	:&nbsp;��<input id=istoupperYes type="radio"  name='istoupper'>&nbsp;
      									��<input id=istoupperNo type="radio"  name='istoupper' checked>-->
  	</span>
  </div>
 	<div>
		С&nbsp;��&nbsp;λ:<input id=scale type="text" value="" size=4  title="��ǰ��С����ȷλ��">
		��&nbsp;��&nbsp;��:<select id=delimiter >
         		<option value="">&nbsp;&nbsp; </option>
         		<option value=",">,</option>
     			</select>
  </div>
  <!--	<div>
		����:<input id=left type="text" size=5>
		&nbsp;&nbsp;
    �ҿ��:<input id=right type="text" size=5>
	</div>
 	<div>
    �Ͽ��:<input id=top type="text" size=5>
    &nbsp;&nbsp;
		�¿��:<input id=bottom type="text" size=5>
  </div>  -->
  <div>
  	<label for="isPrintInSplitedTemplate">ģ��ָ�ʱÿҳ��ӡ����</label>
  	<input id="isPrintInSplitedTemplate" type="checkbox"/>
  </div>
  </div>
  <!--	<div>
		����ʱÿ�е�����:<input id=charsPerLine  type="text" size=4 value="1">
  </div>
 	<div>
		����ʱ�м��(��):<input id=distance  type="text" size=4 value="0">
  </div> -->
  <div align=center>
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closeColPopMenu();">
    <input   type=button  name=apply value="Ӧ��" style="color:blue;border:1;cursor:hand;" onclick="setColAttribute();">
  </div>
</DIV>
<DIV id=PRN_fieldsArray  poid="body"
     style="z-index:10;display:none;FONT-SIZE:12px;width:250;
						padding-left:5;
						padding-right:5;
						padding-bottom:5;
            POSITION:absolute;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;"
		onclick="event.cancelBubble=true;">
  <div id=TITLE   align="right" noWrap  style="BACKGROUND-COLOR:#00006A;color:#FFFFFF;">
  	��ѡ������
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;left:225" onclick="closeFieldsArrayPopMenu();">
	</div><br>
	<DIV style="border-style:groove;border-width:2px">
		&nbsp;&nbsp;&nbsp;&nbsp;<span class="coolButton" title="ˮƽ���룭��ѡ��ĵ�һ��Ԫ��Ϊ��׼" onclick = setFieldsLayout("Horizontal")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
		background: buttonface; padding: 3px; margin: 5px;" type=button value="ˮƽ����" size=8 onclick = setFieldsLayout("Horizontal") ></span>
		<span class="coolButton" title="��ֱ���룭��ѡ��ĵ�һ��Ԫ��Ϊ��׼" onclick = setFieldsLayout("Vertical")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
			background: buttonface; padding: 3px; margin: 5px;" type=button value="��ֱ����" size=8 onclick = setFieldsLayout("Vertical") ></span>
		<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="coolButton" title="�ȿ���ѡ��ĵ�һ��Ԫ��Ϊ��׼" onclick = setFieldsLayout("Width")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
			background: buttonface; padding: 3px; margin: 5px;" type=button value="�ȿ�" size=8 onclick = setFieldsLayout("Width") ></span>
		<span class="coolButton" title="�ȸߣ���ѡ��ĵ�һ��Ԫ��Ϊ��׼" onclick = setFieldsLayout("Height")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
			background: buttonface; padding: 3px; margin: 5px;" type=button  value="�ȸ�" size=8 onclick = setFieldsLayout("Height") ></span>
	</DIV><br>
	<div><font size=4>����:</font>
	</div>
	<DIV style="border-style:groove;border-width:2px">
	  ����:<input id=calignleft name=fcalign type=radio  onclick = setSameAlign("content",1) >
  	&nbsp;&nbsp;
  	����:<input id=caligncenter name=fcalign type=radio onclick = setSameAlign("content",2) >
  	&nbsp;&nbsp;
  	����:<input id=calignright name=fcalign type=radio onclick = setSameAlign("content",3) >
	</DIV><br>
	<div><font size=4>����:</font>
	</div>
	<DIV style="border-style:groove;border-width:2px">
	 	����:<input id=alignleft name=falign type=radio  onclick = setSameAlign("layout",1) >
  	&nbsp;&nbsp;
  	����:<input id=aligncenter name=falign type=radio onclick = setSameAlign("layout",2) >
  	&nbsp;&nbsp;
  	����:<input id=alignright name=falign type=radio onclick = setSameAlign("layout",3) >
	</DIV><br>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
			�ִ�С:<select name="fsize" onclick = setSameFont("size")>
              <script language="JavaScript">document.writeln(writeFontSize());</script>
             </select>
      ��&nbsp;&nbsp;��:<select  id=fontname onclick = setSameFont("name")>
           <option  value="simsun">���� </option>
           <option  value="simkai">���� </option>
           <option  value="simhei">����</option>
           <option  value="simfang">������</option>
           <option  value="simli">������</option>
           <option  value="simyou">��Բ��</option>
        </select>
  	</div>
  </DIV><br>
  <div align=center>
    <input   type=button  name=delete value="ɾ��" style="color:blue;border:1;cursor:hand;" onclick="deleteFieldsArray();">&nbsp;&nbsp;&nbsp;
    <input   type=button  name=return value="����" style="color:blue;border:1;cursor:hand;" onclick="closeFieldsArrayPopMenu();">
  </div>
</DIV>

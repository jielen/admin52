<%@page contentType="text/html;charset=GBK"%>

<!--表格属性修改,对整个表及行属性-->
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
		表格属性设置
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;left:225" onclick="closeTablePopMenu();">
	</div>
	<div style="border-style:groove;border-width:2px">
  	所属区域:<input name="area" type="text" size="10" disabled ></input>
  <div id="trPos" >
		行&nbsp;&nbsp;&nbsp;&nbsp;高:<input id=trheight type="text" value="" size=10>
	</div>
	<div id="tablePos" >
		坐标位置:<br>
			&nbsp;左边距:&nbsp;<input name="left" type="text" size="6" value=""></input>&nbsp;
			上边距:<input name="top" type="text" size="6" value=""></input>
  		&nbsp;宽&nbsp;&nbsp;度:&nbsp;<input id=width type="text" value="100%" size=6>&nbsp;
			高&nbsp;&nbsp;度:<input id=height type="text" value="100%" size=6>
	</div>
	</div>
	<div style="border-style:groove;border-width:2px">
  <div id=repeat >
  	<!--	<span id=tableyes>卡片方式</span>-->
  	<span id=tryes><label for="repeatyes">数&nbsp;据&nbsp;行</label></span>:
  	<input id=repeatyes name=repeat1 type=radio  >&nbsp;&nbsp;&nbsp;&nbsp;
  	<!--  <span id=tableno>列表方式</span>-->
  	<span id=trno ><label for="repeatno">标&nbsp;&nbsp;题&nbsp;&nbsp;行</label></span>:
  	<input id=repeatno  name=repeat1 type=radio  >
  </div>
	<!--<div style="border-style:groove;border-width:2px">
  	自动缩列调整:<input id=adjustyes name=cajust type=radio  >&nbsp;&nbsp;
    固定列:<input id=adjustno  name=cajust type=radio  >
  </div>
  -->
  <div id=print >
    <span><label for="printyes">边框打印</label></span>:
    <input id=printyes name=prn type=radio  >&nbsp;&nbsp;&nbsp;&nbsp;
    <span><label for="printno">边框不打印</label></span>:
    <input id=printno  name=prn type=radio >
  </div>
  <div id="isBorderBondDiv" >
    <span><label for="printyes">外框加粗</label></span>:
    <input id="isBorderBondYes" name="isBorderBond" type="radio"  >&nbsp;&nbsp;&nbsp;&nbsp;
    <span><label for="printno">外框不加粗</label></span>:
    <input id="isBorderBondNo"  name="isBorderBond" type="radio" >
  </div>
  <div>
    <label for="cprintyes">内容打印:</label>
    <input id=cprintyes name=pprint1 type=radio  >
    &nbsp;&nbsp;&nbsp;
    <label for="cprintno">内容不打印:</label>
    <input id=cprintno  name=pprint1 type=radio  >
  </div>
  <div>
  		<span>水平对齐
  			<select  id=fcalign>
           <option  value="left">居左</option>
           <option  value="center">居中</option>
           <option  value="right">居右</option>
      	</select>
      </span>
      <span>垂直对齐
  			<select  id=fcvalign>
           <option  value="top">居上</option>
           <option  value="middle">居中</option>
           <option  value="bottom">居下</option>
      	</select>
      </span>
   </div>
  <!--<div>水平
  	居左:<input id=alignleft name=falign type=radio  >
  	&nbsp;
  	居中:<input id=aligncenter name=falign type=radio  >
  	&nbsp;
  	居右:<input id=alignright name=falign type=radio >
	<br>
  垂直
	 		居上:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		居中:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		居下:<input id=valignbottom name=fcvalign type=radio >
		</div>-->
  </div>
	<!--四框宽:<input id=border type="text" value="1" size=5> -->
  <!-- <div>
		左框宽:<input id=left type="text" value="1" size=5>
		&nbsp;&nbsp;
		右框宽:<input id=right type="text" value="1" size=5>
  </div>
 	<div>
		上框宽:<input id=top type="text" value="1" size=5>
    &nbsp;&nbsp;
		下框宽:<input id=bottom type="text" value="1" size=5>
  </div>  -->
	<div style="border-style:groove;border-width:2px">
  <div>
		字&nbsp;&nbsp;&nbsp;&nbsp;体:<select  id="fontname">
           <option  value="simsun" selected="selected">宋体 </option>
           <option  value="simkai">楷体 </option>
           <option  value="simhei">黑体</option>
           <option  value="simfang">仿宋体</option>
           <option  value="simli">隶书体</option>
           <option  value="simyou">幼圆体</option>
        </select>
		字大小:<input id=fsize  type="text" value="12" size=5>
  </div>
 	<div id=divfcolor ondblclick="tssetcellHeight();">
		字&nbsp;颜&nbsp;色:<input id=fcolor type="text" value="0000FF" size=10>
  </div>
 	<div id=divbgcolor>
		背&nbsp;景&nbsp;色:<input id=bgcolor type="text" value="FFE4C4" size=10>
  </div>
  <div>
  	<label for="underline">下&nbsp;划&nbsp;线</label>
		<input name="funderline" id="underline" type=checkbox > &nbsp;&nbsp;
		<label for="italic">斜体</label>
		<input name="fitalic" id="italic" type=checkbox > &nbsp;&nbsp;
		<label for="bold">粗体</label>
		<input name="fbold" id="bold" type=checkbox >
 	</div>
	<!--<div id=divbrcolor >
		框颜色:<input id=bordercolor type="text" value="#FF1493" size=10>
  </div> -->
	</div>
  <!--此属性仅对表有效  -->
	<!--	<div id=ttablespace>
		卡片式表之间的间高:<input id="tablespace" type="text" value="10" size=5>
  </div>  -->
  <!-- 下面属性仅对整个表格有效   -->
  <div id="pprintnum" style="border-style:groove;border-width:2px;display:none">
  	分组:&nbsp;表格固定行数:<input id=printnum type=text size=5 ><br>
  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="printInNewPage">在新页打印
    &nbsp;&nbsp;<input type="checkbox" name="resetPageNum">重设页号<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="headerEachPage">在每页中打印表头
  </div>
  <div id=stretchOver style="border-style:groove;border-width:2px;display:">
  <span >
  	数据溢出时拉伸&nbsp;<input name="stretchOverflow" type="checkbox" id="stretchOverflow" >
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
        alert("输入不合法:"+pnum+"<="+val)
      }
 		}
	</script>
  	尾部合计行数:<input id="tailnum" type=text size=5 onchange="checkTailNumInput(this);">
  </div>-->
  <div align=center>
    <!--仅用于对一个已存在的表格作操作  -->
    <input type=button name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closeTablePopMenu();">
    <input type=button name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setTableAttribute();">
  </div>
</DIV>

<!--单元格属性修改,仅对表格而言 -->
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
			单元格属性设置
     	<img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closeTablePopMenu();">
	</div>
	<div style="border-style:groove;border-width:2px">
	所属区域:<input name="area" type="text" size="15" disabled ></input>
	<div>
		宽&nbsp;&nbsp;&nbsp;&nbsp;度:<input id=width type="text" value="100%" size=5>
		&nbsp;&nbsp;
		高&nbsp;&nbsp;&nbsp;&nbsp;度:<input id=height type="text" value="100%" size=5>
	<!--四框宽:<input id=border type="text" value="1" size=5>
	</div>
	<div>-->
	<!--	四框宽:<input id=border type="text" value="1" size=5> -->
	</div>
  <div>
  	<label for="sfield">字&nbsp;段:</label>
  	<input id=sfield name=varorfield type=radio onclick = "varorfield();" />
    &nbsp;
    <label for="sparameter">参&nbsp;数:</label>
    <input id=sparameter name=varorfield type=radio onclick = "varorfield();" />
    &nbsp;
    <label for="svariable">变&nbsp;量:</label>
    <input id=svariable name=varorfield type=radio onclick = "varorfield();" />  
  </div>
  </div>
  <div style="border-style:groove;border-width:2px">
  <div>
    内&nbsp;&nbsp;&nbsp;&nbsp;容:<input id=context type=text size=15 >
  </div>
  <div>
  		<span>水平对齐
  			<select  id=fcalign>
           <option  value="left">居左</option>
           <option  value="center">居中</option>
           <option  value="right">居右</option>
      	</select>
      </span>
      <span>垂直对齐
  			<select  id=fcvalign>
           <option  value="top">居上</option>
           <option  value="middle">居中</option>
           <option  value="bottom">居下</option>
      	</select>
      </span>
  </div>
  <div>
      <label for="printyes">内容打印:&nbsp;</label>
      <input id=printyes   name=print type=radio  />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label for="printno">内容不打印:&nbsp;</label>
      <input id=printno  name=print type=radio  />
  </div>
 <!-- <div>
    内容打印:&nbsp;<input id=printyes name=pprint type=radio  >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    内容不打印:&nbsp;<input id=printno  name=pprint type=radio  >
  </div>
  水平
    居左:<input id=alignleft name=falign type=radio  >
    &nbsp;
    居中:<input id=aligncenter name=falign type=radio  >
    &nbsp;
    居右:<input id=alignright name=falign type=radio >
  <br>
  垂直
	 		居上:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		居中:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		居下:<input id=valignbottom name=fcvalign type=radio >-->
		</div>
	<!--<div style="border-style:groove;border-width:2px">
    打印零:&nbsp;&nbsp;<input id=printzeroyes name=prnzero type=radio  title="单元格内数据尾部零打印">
    &nbsp;&nbsp;&nbsp;&nbsp;
    不打印零:&nbsp;&nbsp;<input id=printzerono  name=prnzero type=radio  title= "单元格内数据尾部零不打印">
  </div>-->
	<DIV style="border-style:groove;border-width:2px">
  <div>
  	字&nbsp;&nbsp;&nbsp;&nbsp;体:<select  id=fontname>
           <option  value="simsun">宋体 </option>
           <option  value="simkai">楷体 </option>
           <option  value="simhei">黑体</option>
           <option  value="simfang">仿宋体</option>
           <option  value="simli">隶书体</option>
           <option  value="simyou">幼圆体</option>
        </select>
		&nbsp;&nbsp;
		大小:<input id=fsize  type="text" value="12" size=5 >
  </div>
 	<div>
		字&nbsp;颜&nbsp;色:<input id=fcolor type="text" value="0000ff" size=10>
  </div>
 	<div>
		背&nbsp;景&nbsp;色:<input id=bgcolor type="text" value="FFE4C4" size=10>
  </div>
  <div>
  	<label for="underline">下&nbsp;划&nbsp;线</label>
		<input name="funderline" id="underline" type=checkbox > &nbsp;&nbsp;
		<label for="italic">斜体</label>
		<input name="fitalic" id="italic" type=checkbox > &nbsp;&nbsp;
		<label for="bold">粗体</label>
		<input name="fbold" id="bold" type=checkbox >
 	</div>
  <!--<div>
		框颜色:<input id=bordercolor type="text" value="FF1493" size=10>
  </div>-->
	</DIV>
	<div id=variables style="border-style:groove;border-width:2px">
		变量类型:<select  id=vartype>
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
    计算类型:<select  id=caltype>
           <option  value="Nothing">--</option>
           <option  value="Count">记录数</option>
           <option  value="Sum">求和</option>
           <option  value="Average">平均值</option>
           <option  value="Lowest">最小值</option>
           <option  value="Highest">最大值</option>
        </select>
    计算对象:<select  id=resettype>
           <option  value="None">--</option>
           <option  value="Report">表</option>
           <option  value="Page">页</option>
           <option  value="Column">列</option>
           <option  value="Group">组</option>
        </select><br>
    变量表达式：<textarea cols="28" rows="3" id="vexpression"></textarea>
    <!--<input id=vexpression  type="text" value="" size=18>-->
  </div>
  <div style="border-style:groove;border-width:2px">
 	<div>
		<span>
		竖排打印&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="isVertical"  type="checkbox" />
	<!--	:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是<input id=isVerticalYes type="radio"  name='isVertical'>&nbsp;
      					否<input id=isVerticalNo type="radio"  name='isVertical' checked>-->
  	</span>
 		 <span id=stretchOver>
  	数据溢出时拉伸&nbsp;<input name="stretchOverflow" type="checkbox" id="stretchOverflow" >
	</span>
  </div>
  <!--<div>
		竖排时每行的字数:<input id=charsPerLine  type="text" size=4 value="1">
  </div>
 	<div>
		竖排时行间隔(行):<input id=distance  type="text" size=4 value="0">
  </div>  -->
  <div>
  <span>
    不打印值集代码<input id="printValSetCode"  type="checkbox" />
  </span>
  <span>
		<label for="istoupper">转为人民币大写</label>
		<input id="istoupper"  type="checkbox" />
	<!--	:&nbsp;是<input id=istoupperYes type="radio"  name='istoupper'>&nbsp;
      									否<input id=istoupperNo type="radio"  name='istoupper' checked>-->
  	</span>
	</div>
	<div>
      不打印零<input id="printZero"  type="checkbox" />
  </div>
 	<div>
		小数位:<input id=scale type="text" value="100%" size=5  title="当前单元格小数精确位数">
		&nbsp;&nbsp;
		分界符:<select id=delimiter >
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
			result += "<option value=\"none\">无</option>";
			result += "<option value=\"dotted\">虚线</option>";
			return result;
		}
	</script>
	
	<DIV style="border-style:groove;border-width:2px">
  <!--
  <div>
		边框宽度:
		<select id="borderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
	</div>
	-->
 	<div>
 		左框宽:&nbsp;&nbsp;
 		<select id="leftBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
    右框宽:
 		<select id="rightBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
	</div>
 	<div>
    上框宽:&nbsp;&nbsp;
		<select id="topBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
		下框宽:
		<select id="bottomBorderWidth" >
			<script language="JavaScript">document.writeln(writeBorderSelectOption());</script>
    </select>
  </div>
  </div>

  <div align=center>
    <!--仅用于对一个已存在的表格作操作  -->
    <input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closeTablePopMenu();">
    <input   type=button  name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setCellAttribute();">
  </div>
</DIV>

<!--表格定义块开始 -->
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
    用户自定义表格
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();"></div>
	<div style="border-style:groove;border-width:2px">
  	<div>
			列&nbsp;&nbsp;数:<input id=cols type="text" value="5" size=7>
  		&nbsp;行&nbsp;&nbsp;数:<input id=rows  type="text" value="2" size=7>
  	</div>
  </div>
  <br>
  <!--<div style="border-style:groove;border-width:2px">
     <div>
			外框宽:<input id=border type="text" value="2" size=6>
			内框宽:<input id=cellspacing type="text" value="2" size=6>
  	</div>
  </div>
  <br>-->
  <div style="border-style:groove;border-width:2px">
  <div>
    字&nbsp;&nbsp;体:<select  id=fontname>
           <option  value="simsun">宋体 </option>
           <option  value="simkai">楷体 </option>
           <option  value="simhei">黑体</option>
           <option  value="simfang">仿宋体</option>
           <option  value="simli">隶书体</option>
           <option  value="simyou">幼圆体</option>
        </select>
		字大小:<input id=fsize  type="text" value="12" size=7>
  </div>
 	<div>字颜色:<input id=fcolor type="text" value="" size=7>
	</div>
  </div>
  <br>
  <div style="border-style:groove;border-width:2px">
 	<div>背景色:<input id=bgcolor type="text" value="" size=7>
	</div>
	</div>
  <!--<div>框颜色:
  	<input id=bordercolor type="text" value="#FF1493" size=7>
  </div>-->
  <br>
  <div align=center>
    <!--仅用于对一个已存在的表格作操作  -->
    <input   type=button  id="del" value="删除" onclick="deleteDiv();" style="display:none" >
    <input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setTable();">
  </div>
</DIV>
<!--字体定义块开始 -->
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
		字段属性设置
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();">
	</div>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
			所属区域:<input name="area" type="text" size="10" disabled ></input>
		</div>
  	<div>
      坐标位置:
  		<br>
  		<div>&nbsp;左边距:&nbsp;<input name="left" type="text" size="6" value=""></input>
  			&nbsp;上边距:<input name="top" type="text" size="6" value=""></input>
  		</div>
 			<div>
	  		&nbsp;宽&nbsp;&nbsp;度:&nbsp;<input name="width" type="text" size="6" value=""></input>
  			&nbsp;高&nbsp;&nbsp;度:<input name="height" type="text" size="6" value=""></input>
			</div>
		</div>
	</DIV>
	<DIV id="svarorfieldDiv" style="border-style:groove;border-width:2px">
  	<label for="ssfield">字&nbsp;段:</label>
  	<input id=ssfield name=svarorfield type=radio onclick = "svarorfield();" />
    &nbsp;
    <label for="ssparameter">参&nbsp;数:</label>
    <input id=ssparameter name=svarorfield type=radio onclick = "svarorfield();" />
    &nbsp;
    <label for="ssvariable">变&nbsp;量:</label>
    <input id=ssvariable name=svarorfield type=radio onclick = "svarorfield();" />  
  </DIV>
	<DIV style="border-style:groove;border-width:2px">
  	<div >
			内&nbsp;&nbsp;&nbsp;容:&nbsp;<input id=content type="text" size=21>
  	</div>
  	<div>
  		<span>水平对齐
  			<select  id=fcalign>
           <option  value="left">居左</option>
           <option  value="center">居中</option>
           <option  value="right">居右</option>
      	</select>
      </span>
      <span>垂直对齐
  			<select  id=fcvalign>
           <option  value="top">居上</option>
           <option  value="middle">居中</option>
           <option  value="bottom">居下</option>
      	</select>
      </span>
     </div>
     <div id="printBorder" >
       <span><label for="printBorderYes">边框打印</label></span>:
       <input id="printBorderYes" name="printBorder" type="radio"  >&nbsp;&nbsp;&nbsp;&nbsp;
       <span><label for="printBorderNo">边框不打印</label></span>:
       <input id="printBorderNo"  name="printBorder" type="radio" >
     </div>
     <div>
      <label for="printyes">内容打印:</label>
      <input name=print id=printyes  type=radio  >
      &nbsp;&nbsp;&nbsp;
      <label for="printno">内容不打印:</label>
      <input name=print id=printno   type=radio  >
  	</div>
<!--	 		居左:<input id=alignleft name=fcalign type=radio  >
  		&nbsp;
  		居中:<input id=aligncenter name=fcalign type=radio >
  		&nbsp;
  		居右:<input id=alignright name=fcalign type=radio >
		</div>
		<div>垂直
	 		居上:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		居中:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		居下:<input id=valignbottom name=fcvalign type=radio >
		</div>-->
	</DIV>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
			字&nbsp;&nbsp;&nbsp;&nbsp;体:<select  id=fontname>
           <option  value="simsun">宋体 </option>
           <option  value="simkai">楷体 </option>
           <option  value="simhei">黑体</option>
           <option  value="simfang">仿宋体</option>
           <option  value="simli">隶书体</option>
           <option  value="simyou">幼圆体</option>
        </select>
			&nbsp;&nbsp;大小:<select name="fsize" >
          <script language="JavaScript">document.writeln(writeFontSize());</script>
        </select>
  	</div>
  	<div>
			字&nbsp;颜&nbsp;色:<input id=fcolor type="text" value="2" size=10>
		</div>
		<div>
			背&nbsp;景&nbsp;色:<input id=bgcolor type="text" value="2" size=10>
  	</div>
  	<div>
			<label for="underline">下&nbsp;划&nbsp;线</label>
			<input name="funderline" id="underline" type="checkbox"> &nbsp;&nbsp;
			<label for="italic">斜体</label>
			<input name="fitalic" id="italic" type=checkbox > &nbsp;&nbsp;
			<label for="bold">粗体</label>
			<input name="fbold" id="bold" type=checkbox >
  	</div>
 		<!--<div>
			块&nbsp;&nbsp;宽:<input id=fwidth type="text" value="2" size=6>
			块&nbsp;&nbsp;高:<input id=fheight  type="text" value="12" size=6>
  	</div>   -->
	</DIV>
	  <div id=variables style="border-style:groove;border-width:2px">
  	变量类型:<select  id=vartype>
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
    计算类型:<select  id=caltype>
           <option  value="Nothing">--</option>
           <option  value="Count">记录数</option>
           <option  value="Sum">求和</option>
           <option  value="Average">平均值</option>
           <option  value="Lowest">最小值</option>
           <option  value="Highest">最大值</option>
        </select>
    计算对象:<select  id=resettype>
           <option  value="None">--</option>
           <option  value="Report">表</option>
           <option  value="Page">页</option>
           <option  value="Column">列</option>
           <option  value="Group">组</option>
        </select><br>

    变量表达式：<textarea cols=28" rows="3" id="vexpression"></textarea>
    <!--<input id=vexpression  type="text" value="" size=18>-->
  </div>
 	<DIV id=notStaticText style="border-style:groove;border-width:2px" >
 		<div>
 			<span id=isVerticalDiv>
				竖排打印&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input id="isVertical"  type="checkbox" />
  		</span>
  		<span id=stretchOver>
  		数据溢出时拉伸&nbsp;<input name="stretchOverflow" type="checkbox" id="stretchOverflow" >
		  </span>
    </div>
    <div>
    <span id=printValSetCodeDiv>
      不打印值集代码<input id="printValSetCode"  type="checkbox" checked="checked"/>
    </span>
    <span id=istoupperDiv>
				<label for="istoupper">转为人民币大写</label>
				<input id="istoupper"  type="checkbox" />
  	</span>
    </div>
		<!--<div id=stretch>拉伸类型<select name="stretchType">
        <option value="NoStretch">不拉伸</option>
        <option value="RelativeToTallestObjec">与本组最高的元素一致</option>
        <option value="RelativeToBandHeight">与本段的高度一致</option>
      </select>
		</div>  -->
		<div id="printZeroDiv">
      不打印零<input id="printZero"  type="checkbox" />
  	</div>
		<DIV id=scaleAndDelimiter>
			小&nbsp;数&nbsp;位:<input id=scale type="text" value="100%" size=5  title="当前单元格小数精确位数">
			&nbsp;
			分&nbsp;界&nbsp;符:<select id=delimiter >
         		 	<option value="">&nbsp;&nbsp; </option>
         			<option value=",">,</option>
     				 </select>
		</DIV>
  	<div>
  		<label for="isPrintInSplitedTemplate">模板分割时每页打印此项</label>
  		<input id="isPrintInSplitedTemplate" type="checkbox"/>
  	</div>
  </DIV>
  <div align=center>
    <input   type=button  id="del" name=del value="删除" style="color:blue;border:1;cursor:hand;" onclick="deleteDiv(nowDivID);">
    <input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setFieldStyle(nowDivID);">
  </div>
</DIV>
<!--直线新增开始 -->
<!--直线定义块开始 -->
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
  	直线属性设置
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();">
	</div>
	<DIV style="border-style:groove;border-width:2px">
  	<div >
  		所属区域:<input name="area" type="text" size="10" disabled ></input>
  		<br>
  		直线方向:<select name="lineDirection" onChange="changelineDirection()">
          			<script language="JavaScript">document.writeln(writelineDirection());</script>
        			 </select>
  	</div>
   	<br>
	</DIV>
	<DIV style="border-style:groove;border-width:2px">
  	<input id=horizontalLine type=radio name=setSpecLine onclick="setSpecLine();">水平线 &nbsp;
   	<input id=verticalLine type=radio  name=setSpecLine onclick="setSpecLine();">垂直线 &nbsp;
   	<input id=recover type=radio  name=setSpecLine onclick="setSpecLine();">还原 &nbsp;
	</DIV>
	<br>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
  	直线坐标:
  	</div>
  	<div> &nbsp;起点   &nbsp;X:<input name="left" type="text" size="10" value=""></input>
  	</div>
  	<div> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; Y:<input name="top" type="text" size="10" value=""></input>
  	</div>
 		<div>
	 		&nbsp;终点  &nbsp;X:<input name="width" type="text" size="10" value=""></input>
  	</div>
  	<div>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; Y:<input name="height" type="text" size="10" value=""></input>
		</div>
	</DIV>
	<br>
 	<div style="border-style:groove;border-width:2px">
 		<div>线条粗细:<select name="linePen" onChange="changelinePen()">
          					<script language="JavaScript">document.writeln(writelinePen());</script>
        					</select>
    </div>
  	<div>
			直线颜色:<input name="backcolor" type="text" size="8" >
		</div>
  </div>
  <div align=center>
    <input   type=button  id="del" name=del value="删除" style="color:blue;border:1;cursor:hand;" onclick="deleteLine();">
    <input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setLineStyle();">
  </div>
</DIV>
<!--直线新增结束 -->

<!--图形新增开始 -->
<!--图形定义块开始 -->
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
  	图形属性设置
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;" onclick="closePopMenu();">
	</div>
	<DIV style="border-style:groove;border-width:2px">
  	<div >
			所属区域:<input name="area" type="text" size="10" disabled ></input>
  	</div><br>
  	<div>
      坐标位置:
  		<br>
  		<div >左边距:<input name="left" type="text" size="6" value=""></input>
  			&nbsp;上边距:<input name="top" type="text" size="6" value=""></input>
  		</div>
 			<div>
	  		宽&nbsp;&nbsp;度:<input name="width" type="text" size="6" value=""></input>
  			&nbsp;高&nbsp;&nbsp;度:<input name="height" type="text" size="6" value=""></input>
			</div>
  	</div>
	</DIV>
	<br>
	<DIV style="border-style:groove;border-width:2px">
		图片大小与指定图形元素大小不一致时:
    <input id=RetainShape type=radio  name=scaleImage >保持原有大小
		<input id=FillFrame type=radio name=scaleImage >伸缩
   	<input id=Clip  type=radio  name=scaleImage >剪切
	</DIV>
	<div style="border-style:groove;border-width:2px">
 		<div>边框:<select name="linePen">
          					<script language="JavaScript">document.writeln(writelinePen2());</script>
        					</select>
    </div>
  </div>
	<DIV style="border-style:groove;border-width:2px">
		表达式:
		<textarea cols="28" rows="3" id="vexpression"></textarea>
	</DIV>
	<br>
  <div align=center>
    <input   type=button  id="del" name=del value="删除" style="color:blue;border:1;cursor:hand;" onclick="deletePic(nowDivID);">
    <input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input   type=button  name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setPicStyle();">
  </div>
</DIV>
<!--图形新增结束 -->
<!-- 定义表格修改菜单  -->
<div id="tablepopup" poid="body" popup="true"
			style="z-index:1;display:none;width=90;FONT-SIZE:12px;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;">
	<div style="width=90" onmouseover="showSubMenu('rowSubMenu')" onmouseout="hideSubMenu('rowSubMenu')">行</div>
  <div onmouseover="showSubMenu('colSubMenu')" onmouseout="hideSubMenu('colSubMenu')">列</div>
  <div onmouseover="showSubMenu('tableSubMenu')" onmouseout="hideSubMenu('tableSubMenu')">表</div>
  <div onmouseover="showSubMenu('cellSubMenu')" onmouseout="hideSubMenu('cellSubMenu')">单元格</div>
	<!-- <div onmouseover="showSubMenu('aa')" onclick="addCellContext(0);";>新增变量 </div>
  <div onmouseover="showSubMenu('aa')" onclick="addCellContext(1);";>新增标题 </div>
  <div onmouseover="showSubMenu('aa')" onclick="addCellContext(2);";>新增常量 </div>-->
  <div onmouseover="showSubMenu('aa')" onclick="updatetbcode();"> 程序升级</div>
	</div>
<DIV id="cellSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none;FONT-SIZE:12px;width=90;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('cellSubMenu');"onmouseout="subMenuMouseOut('cellSubMenu');" onclick="closeSubMenu('cellSubMenu');">
  <div style="width:100%" onclick="cellAttribute();" onmouseover="pmenuover()" onmouseout="pmenuout()">单元格属性</div>
  <div style="width:100%" onclick="delCell();" onmouseover="pmenuover()" onmouseout="pmenuout()">删除单元格 </div>
  <div style="width:100%" onclick="insertTableCell(0);" onmouseover="pmenuover()" onmouseout="pmenuout()">左方增加一格</div>
  <div style="width:100%" onclick="insertTableCell(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">右方增加一格 </div>
  <div style="width:100%" onclick="insertTableCell(-1);" onmouseover="pmenuover()" onmouseout="pmenuout()">尾部增加一格 </div>
  <div style="width:100%" onclick="delCellText();" onmouseover="pmenuover()" onmouseout="pmenuout()">删除单元格内容 </div>
</DIV>
<DIV id="rowSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none;FONT-SIZE:12px;width=90;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('rowSubMenu');"onmouseout="subMenuMouseOut('rowSubMenu');" onclick="closeSubMenu('rowSubMenu');">
   <div style="width:100%" onclick="tableAttribute(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">行属性 </div>
   <div style="width:100%" onclick="delRow();" onmouseover="pmenuover()" onmouseout="pmenuout()">删除表格行 </div>
   <div style="width:100%" onclick="insertTableRow(0);" onmouseover="pmenuover()" onmouseout="pmenuout()">上方增加一行 </div>
   <div style="width:100%" onclick="insertTableRow(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">下方增加一行 </div>
   <div style="width:100%" onclick="insertTableRow(-1);" onmouseover="pmenuover()" onmouseout="pmenuout()">尾部增加一行 </div>
</DIV>
<DIV id="colSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none; FONT-SIZE:12px;width=90;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('colSubMenu');"onmouseout="subMenuMouseOut('colSubMenu');" onclick="closeSubMenu('colSubMenu');">
   <div style="width:100%" onclick="colAttribute();" onmouseover="pmenuover()" onmouseout="pmenuout()">列属性 </div>
   <div style="width:100%" onclick="delCol();" onmouseover="pmenuover()" onmouseout="pmenuout()">删除表格列 </div>
   <div style="width:100%" onclick="insertTableCol(0);" onmouseover="pmenuover()" onmouseout="pmenuout()">左边增加一列 </div>
   <div style="width:100%" onclick="insertTableCol(1);" onmouseover="pmenuover()" onmouseout="pmenuout()">右边增加一列 </div>
   <div style="width:100%" onclick="insertTableCol(-1);" onmouseover="pmenuover()" onmouseout="pmenuout()">尾部增加一列 </div>
</DIV>
<DIV id="tableSubMenu" parentDiv="tablepopup"
		style="z-index:5;display:none; FONT-SIZE:12px;width=100;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;"
		onmouseover="subMenuMouseOver('tableSubMenu');"onmouseout="subMenuMouseOut('tableSubMenu');" onclick="closeSubMenu('tableSubMenu');">
   <div style="width:100%" onclick="tableAttribute(2);" onmouseover="pmenuover()" onmouseout="pmenuout()">表属性 </div>
   <div style="width:100%" onclick="testPos();" onmouseover="pmenuover()" onmouseout="pmenuout()">格内加表 </div>
   <div style="width:100%" onclick="delTable();" onmouseover="pmenuover()" onmouseout="pmenuout()">删除整个表格 </div>
   <div style="width:100%" onclick="copyTable();" onmouseover="pmenuover()" onmouseout="pmenuout()">复制表格到剪贴板 </div>
</DIV>
<div id=tablemerge  popup="true"
		style="display:none; FONT-SIZE:12px;width=100;position:absolute;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
        border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
        background-color:menu;">
	<div style="width:100%" onclick="mergeCells();" >选中表格合并</div>
  <div style="width:100%" onclick="delSelCells();" >选中表格删除 </div>
</div>
<div id="pageDataSet"  popup="true"
			style="display:none;FONT-SIZE: 12px; width:170;
    				border-top: thin outset #FFFFFF;
						border-right: thin outset #333333;
            border-bottom: thin outset #333333;
						border-left: thin outset #FFFFFF;
            background-color:menu;">
  <div style="width=170;" onmouseover="showSubMenu('editSubMenu');" onmouseout="hideSubMenu('editSubMenu');">编辑</div>
  <div onmouseover="showSubMenu('scriptSubMenu')" onmouseout="hideSubMenu('scriptSubMenu')">源文件编辑</div>
	<div onmouseover="showSubMenu('aa')" onclick="fieldDisp(true);" >显示模板字段</div>
  <div onmouseover="showSubMenu('aa')" onclick="fieldDisp(false);" >隐藏模板字段</div>
  <div onmouseover="showSubMenu('aa')" onclick="openTemplateBody(cursorObj);" >调整当前区域属性</div>
  <div onclick="autoSetBodyMinHeight(cursorObj);" >自动设置当前区域最小高度</div>
  <div onclick="autoAdjustBodyFields(cursorObj);" >自动调整当前区域内元素位置</div>
  <div onclick="autoAdjustAllBodyFields();" >自动调整所有区域与元素位置</div>
</div>
<DIV id="editSubMenu" parentDiv="pageDataSet"
			style="display:none;position:absolute;FONT-SIZE:12px;width:100;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
  			border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
  			background-color:menu;"
			onmouseover="subMenuMouseOver('editSubMenu');"onmouseout="subMenuMouseOut('editSubMenu');" onclick="closeSubMenu('editSubMenu');">
	<div style="width=80;"onclick="divCopy(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">当前区域复制</div>
	<div onclick="divPaste(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">当前区域粘贴 </div>
	<div onclick="clearDiv(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">当前区域清空</div>
	<div onclick="divCopy(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">整体模板复制</div>
	<div onclick="divPaste(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">整体模板粘贴</div>
	<div onclick="clearDiv(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">整体模板清空</div>
</DIV>
<DIV id="scriptSubMenu" parentDiv="pageDataSet"
			style="display:none;position:absolute;FONT-SIZE:12px;width:150;
				border-top: thin outset #FFFFFF;
				border-right: thin outset #333333;
  			border-bottom: thin outset #333333;
				border-left: thin outset #FFFFFF;
  			background-color:menu;"
			onmouseover="subMenuMouseOver('scriptSubMenu');" onmouseout="subMenuMouseOut('scriptSubMenu');" onclick="closeSubMenu('scriptSubMenu');">
	<div onclick="dispHtmlouter(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">显示当前区域脚本</div>
	<div onclick="dispHtmlinner(cursorObj);" onmouseover="pmenuover()" onmouseout="pmenuout()">显示当前区域内脚本</div>
  <div onclick="dispHtmlouter(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">显示当前整体模板脚本</div>
	<div onclick="dispHtmlinner(templatebody);" onmouseover="pmenuover()" onmouseout="pmenuout()">显示当前整体模板内脚本</div>
</DIV>
<!--表格内的标题、变量、常量设置开始 -->
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
		内&nbsp;&nbsp;容:<input id=context type=text size=20>
 	</div>
 	<div align="center" style="border-style:groove;border-width:2px">
   	居左:<input id=alignleft name=falign type=radio  > &nbsp;&nbsp;&nbsp;
   	居中:<input id=aligncenter name=falign type=radio  >&nbsp;&nbsp;&nbsp;
   	居右:<input id=alignright name=falign type=radio >
  </div>
 	<div style="border-style:groove;border-width:2px">
		宽&nbsp;&nbsp;度:<input id=fwidth type=text size=5>
		下划线:<input id="underline" type="checkbox">
 	</div>
	<DIV style="border-style:groove;border-width:2px">
 		<div>
			字&nbsp;&nbsp;体:<select  id=fontname>
      	<option  value="simsun">宋体 </option>
      	<option  value="simkai">楷体 </option>
      	<option  value="simhei">黑体</option>
      	<option  value="simfang">仿宋体</option>
      	<option  value="simli">隶书体</option>
      	<option  value="simyou">幼圆体</option>
   		</select>
			字大小:<input id=fsize  type="text" value="12" size=6>
 		</div>
  	<div>
			字颜色:<input id=fcolor type="text" value="" size=8>
  	</div>
  	<div>
			背景色:<input id=bgcolor type="text" value="" size=8>
   	</div>
	</DIV>
  <br>
  <div align=center>
  	<input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closeTablePopMenu();">
    <input   type=button  name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setCellContext();">
  </div>
</DIV>
<!--定义打印区域开始  popup=true 当前菜单可拖动，=null or false 则不云能拖动  -->
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
 		自定义打印区域属性
 		<img src="/style/img/button/menu_close.gif" onclick="closePopMenu();">
 	</div>
  <div style="background-color:#F0FFFF">区域名称:
    <span id=areaName ></span>
  </div>
 	<br>
  <div >高&nbsp;&nbsp;度:
    <input id=height type=text size=7>
  </div>
 	<div>背景色:
    <input id=bgcolor type="text" value="" size=7 >
  </div>
 	<div style="border-style:groove;border-width:2px">
		不调整表头:<input name=isadjustheader type=radio id=isadjustheaderno >
    &nbsp;&nbsp;&nbsp;
    调整表头:<input name=isadjustheader type=radio id=isadjustheaderyes >
  </div>
  <br>
  <div align=center>
    <input type=button name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closePopMenu();">
    <input type=button value="清除内容" style="color:blue;border:1;cursor:hand;" onclick="clearmybody();" >
    <input type=button name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setTemplateBody();">
  </div>
</DIV>
<!--字段可视化拖放操作 -->
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
  	字段可视化拖放操作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="/style/img/button/menu_close.gif" onclick="closeDragPopMenu();"></div>
  <div onclick="setDragBack();"  >
     <table border=0 style="font-size:12px" cellspacing=0 cellpadding=0 onclick="getFieldName();" width=100%>
      <tr>
        <td>变量</td>
        <td>字段标题</td>
        <td>字段变量</td>
      </tr>
      <tr>
        <td><select id=dragConst> </select></td>
        <td><select id=dragLabel> </select></td>
        <td><select id=dragField> </select></td>
      </tr>
     </table>
      <div> 选择标签名：<span id=tagField  ondragstart="tagDragdStart();" ondrag="tagdrag();" ondragend="tagDragEnd();" onclick="setDragBack();"> </span>
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
  </div>
</DIV>
<!-- 列属性修改-->
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
    	列属性设置
     	<img src="/style/img/button/menu_close.gif" style="cursor=hand;left:225" onclick="closeColPopMenu();">
	</div>
	<div style="border-style:groove;border-width:2px">
	<div>
	所属区域:<input name="area" type="text" size="10" disabled ></input>
	</div>
	<div>
		列&nbsp;&nbsp;&nbsp;&nbsp;宽:<input id=width type="text" size=10>
		&nbsp;&nbsp;
	<!--	四框宽:<input id=border type="text" size=5> -->
	</div>
	</div>
  <div style="border-style:groove;border-width:2px">
  <div>
	<label for="printyes">内容打印:</label>
	<input id=printyes name=pprint type=radio  >
  &nbsp;&nbsp;&nbsp;
  <label for="printno">内容不打印:</label>
  <input id=printno  name=pprint type=radio  >
	</div>
	<div>
  		<span>水平对齐
  			<select  id=fcalign>
           <option  value="left">居左</option>
           <option  value="center">居中</option>
           <option  value="right">居右</option>
      	</select>
      </span>
      <span>垂直对齐
  			<select  id=fcvalign>
           <option  value="top">居上</option>
           <option  value="middle">居中</option>
           <option  value="bottom">居下</option>
      	</select>
      </span>
  </div>
<!--  <div>
  水平
    居左:<input id=alignleft name=falign type=radio  >
    &nbsp;
    居中:<input id=aligncenter name=falign type=radio  >
    &nbsp;
    居右:<input id=alignright name=falign type=radio >
  <br>
  垂直
	 		居上:<input id=valigntop name=fcvalign type=radio  >
  		&nbsp;
  		居中:<input id=valignmiddle name=fcvalign type=radio >
  		&nbsp;
  		居下:<input id=valignbottom name=fcvalign type=radio >
  </div>-->
  </div>
	<!-- <div style="border-style:groove;border-width:2px">
      打印零:&nbsp;&nbsp;<input id=printzeroyes name=prnzero type=radio  title="单元格内数据尾部零打印">
      &nbsp;&nbsp;&nbsp;&nbsp;
      不打印零:&nbsp;&nbsp;<input id=printzerono  name=prnzero type=radio  title= "单元格内数据尾部零不打印">
  </div>-->
	<DIV style="border-style:groove;border-width:2px">
  <div>
  	字&nbsp;&nbsp;&nbsp;&nbsp;体:<select  id=fontname>
           <option  value="simsun">宋体 </option>
           <option  value="simkai">楷体 </option>
           <option  value="simhei">黑体</option>
           <option  value="simfang">仿宋体</option>
           <option  value="simli">隶书体</option>
           <option  value="simyou">幼圆体</option>
        </select>
		&nbsp;&nbsp;
		大小:<input id=fsize  type="text" value="12" size=5>
  </div>
  <div>
  </div>
 	<div>
		字&nbsp;颜&nbsp;色:<input id=fcolor type="text" value="" size=10>
  </div>
 	<div>
		背&nbsp;景&nbsp;色:<input id=bgcolor type="text" value="" size=10>
  </div>
  <!--	<div>
		框颜色:<input id=bordercolor type="text" value="" size=10>
  </div> -->
	</DIV>
	<DIV style="border-style:groove;border-width:2px">
	<div>
		<span>
		<label for="isVertical">竖排打印</label>
		<input id="isVertical"  type="checkbox" />
	<!--	:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是<input id=isVerticalYes type="radio"  name='isVertical'>&nbsp;
      					否<input id=isVerticalNo type="radio"  name='isVertical' checked>-->
  	</span>&nbsp;&nbsp;
 		<span>
		<label for="istoupper">转换为人民币大写</label>
		<input id="istoupper"  type="checkbox" />
	<!--	:&nbsp;是<input id=istoupperYes type="radio"  name='istoupper'>&nbsp;
      									否<input id=istoupperNo type="radio"  name='istoupper' checked>-->
  	</span>
  </div>
 	<div>
		小&nbsp;数&nbsp;位:<input id=scale type="text" value="" size=4  title="当前列小数精确位数">
		分&nbsp;界&nbsp;符:<select id=delimiter >
         		<option value="">&nbsp;&nbsp; </option>
         		<option value=",">,</option>
     			</select>
  </div>
  <!--	<div>
		左框宽:<input id=left type="text" size=5>
		&nbsp;&nbsp;
    右框宽:<input id=right type="text" size=5>
	</div>
 	<div>
    上框宽:<input id=top type="text" size=5>
    &nbsp;&nbsp;
		下框宽:<input id=bottom type="text" size=5>
  </div>  -->
  <div>
  	<label for="isPrintInSplitedTemplate">模板分割时每页打印此项</label>
  	<input id="isPrintInSplitedTemplate" type="checkbox"/>
  </div>
  </div>
  <!--	<div>
		竖排时每行的字数:<input id=charsPerLine  type="text" size=4 value="1">
  </div>
 	<div>
		竖排时行间隔(行):<input id=distance  type="text" size=4 value="0">
  </div> -->
  <div align=center>
    <input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closeColPopMenu();">
    <input   type=button  name=apply value="应用" style="color:blue;border:1;cursor:hand;" onclick="setColAttribute();">
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
  	多选项设置
    <img src="/style/img/button/menu_close.gif" style="cursor=hand;left:225" onclick="closeFieldsArrayPopMenu();">
	</div><br>
	<DIV style="border-style:groove;border-width:2px">
		&nbsp;&nbsp;&nbsp;&nbsp;<span class="coolButton" title="水平对齐－以选择的第一个元素为基准" onclick = setFieldsLayout("Horizontal")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
		background: buttonface; padding: 3px; margin: 5px;" type=button value="水平对齐" size=8 onclick = setFieldsLayout("Horizontal") ></span>
		<span class="coolButton" title="垂直对齐－以选择的第一个元素为基准" onclick = setFieldsLayout("Vertical")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
			background: buttonface; padding: 3px; margin: 5px;" type=button value="垂直对齐" size=8 onclick = setFieldsLayout("Vertical") ></span>
		<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="coolButton" title="等宽－以选择的第一个元素为基准" onclick = setFieldsLayout("Width")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
			background: buttonface; padding: 3px; margin: 5px;" type=button value="等宽" size=8 onclick = setFieldsLayout("Width") ></span>
		<span class="coolButton" title="等高－以选择的第一个元素为基准" onclick = setFieldsLayout("Height")><input  style=" position: relative;top:0px;left: 0px;height:25;width:70; border: 2px outset white;
			background: buttonface; padding: 3px; margin: 5px;" type=button  value="等高" size=8 onclick = setFieldsLayout("Height") ></span>
	</DIV><br>
	<div><font size=4>内容:</font>
	</div>
	<DIV style="border-style:groove;border-width:2px">
	  居左:<input id=calignleft name=fcalign type=radio  onclick = setSameAlign("content",1) >
  	&nbsp;&nbsp;
  	居中:<input id=caligncenter name=fcalign type=radio onclick = setSameAlign("content",2) >
  	&nbsp;&nbsp;
  	居右:<input id=calignright name=fcalign type=radio onclick = setSameAlign("content",3) >
	</DIV><br>
	<div><font size=4>布局:</font>
	</div>
	<DIV style="border-style:groove;border-width:2px">
	 	居左:<input id=alignleft name=falign type=radio  onclick = setSameAlign("layout",1) >
  	&nbsp;&nbsp;
  	居中:<input id=aligncenter name=falign type=radio onclick = setSameAlign("layout",2) >
  	&nbsp;&nbsp;
  	居右:<input id=alignright name=falign type=radio onclick = setSameAlign("layout",3) >
	</DIV><br>
	<DIV style="border-style:groove;border-width:2px">
  	<div>
			字大小:<select name="fsize" onclick = setSameFont("size")>
              <script language="JavaScript">document.writeln(writeFontSize());</script>
             </select>
      字&nbsp;&nbsp;体:<select  id=fontname onclick = setSameFont("name")>
           <option  value="simsun">宋体 </option>
           <option  value="simkai">楷体 </option>
           <option  value="simhei">黑体</option>
           <option  value="simfang">仿宋体</option>
           <option  value="simli">隶书体</option>
           <option  value="simyou">幼圆体</option>
        </select>
  	</div>
  </DIV><br>
  <div align=center>
    <input   type=button  name=delete value="删除" style="color:blue;border:1;cursor:hand;" onclick="deleteFieldsArray();">&nbsp;&nbsp;&nbsp;
    <input   type=button  name=return value="返回" style="color:blue;border:1;cursor:hand;" onclick="closeFieldsArrayPopMenu();">
  </div>
</DIV>

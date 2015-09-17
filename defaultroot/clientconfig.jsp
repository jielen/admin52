<%@page contentType="text/html; charset=GBK"%>

<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">


<%
   String svToken = (String)com.anyi.gp.pub.SessionUtils.getToken(session);
   String svDBInstall = "\\DB\\DBInstall.exe";
   String svUnZip = "\\download\\upiea.zip?token=" + svToken;
   String svGalInstall = "\\GAL\\regGalEnv.exe";
   String svRpInstall = "\\RP\\regRp53Ocx.exe";   
%>


<head>
<meta http-equiv=Content-Type content="text/html; charset=GB2312">
<meta name=ProgId content=Word.Document>
<meta name=Generator content="Microsoft Word 9">
<meta name=Originator content="Microsoft Word 9">
<link rel=File-List href="./clientconfig22.files/filelist.xml">
<link rel=Edit-Time-Data href="./clientconfig22.files/editdata.mso">
<!--[if !mso]>
<style>
v\:* {behavior:url(#default#VML);}
o\:* {behavior:url(#default#VML);}
w\:* {behavior:url(#default#VML);}
.shape {behavior:url(#default#VML);}
</style>
<![endif]-->
<title>客户端设置</title>
<!--[if gte mso 9]><xml>
 <o:DocumentProperties>
  <o:Author>chenhonghua</o:Author>
  <o:LastAuthor>chenhonghua</o:LastAuthor>
  <o:Revision>3</o:Revision>
  <o:TotalTime>3</o:TotalTime>
  <o:Created>2006-07-04T03:08:00Z</o:Created>
  <o:LastSaved>2006-07-04T03:09:00Z</o:LastSaved>
  <o:Pages>1</o:Pages>
  <o:Words>227</o:Words>
  <o:Characters>1298</o:Characters>
  <o:Company>番茄花园</o:Company>
  <o:Lines>10</o:Lines>
  <o:Paragraphs>2</o:Paragraphs>
  <o:CharactersWithSpaces>1594</o:CharactersWithSpaces>
  <o:Version>9.2812</o:Version>
 </o:DocumentProperties>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <w:WordDocument>
  <w:Zoom>111</w:Zoom>
  <w:DrawingGridVerticalSpacing>7.8 磅</w:DrawingGridVerticalSpacing>
  <w:Compatibility>
   <w:UseFELayout/>
  </w:Compatibility>
 </w:WordDocument>
</xml><![endif]-->
<style>
<!--
 /* Font Definitions */
@font-face
	{font-family:宋体;
	panose-1:2 1 6 0 3 1 1 1 1 1;
	mso-font-alt:SimSun;
	mso-font-charset:134;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:3 135135232 16 0 262145 0;}
@font-face
	{font-family:"\@宋体";
	panose-1:2 1 6 0 3 1 1 1 1 1;
	mso-font-charset:134;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:3 135135232 16 0 262145 0;}
 /* Style Definitions */
p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-parent:"";
	margin:0cm;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:宋体;
	mso-bidi-font-family:"Times New Roman";}
a:link, span.MsoHyperlink
	{color:blue;
	text-decoration:underline;
	text-underline:single;}
a:visited, span.MsoHyperlinkFollowed
	{color:blue;
	text-decoration:underline;
	text-underline:single;}
p
	{margin-right:0cm;
	mso-margin-top-alt:auto;
	mso-margin-bottom-alt:auto;
	margin-left:0cm;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:宋体;
	mso-bidi-font-family:"Times New Roman";}
 /* Page Definitions */
@page
	{mso-page-border-surround-header:no;
	mso-page-border-surround-footer:no;}
@page Section1
	{size:595.3pt 841.9pt;
	margin:72.0pt 90.0pt 72.0pt 90.0pt;
	mso-header-margin:42.55pt;
	mso-footer-margin:49.6pt;
	mso-paper-source:0;}
div.Section1
	{page:Section1;}
 /* List Definitions */
@list l0
	{mso-list-id:1701853237;
	mso-list-type:hybrid;
	mso-list-template-ids:619350776 -628614576 -280709968 1551133532 635606556 522457192 -1083812256 436271736 1923224310 -1344619856;}
ol
	{margin-bottom:0cm;}
ul
	{margin-bottom:0cm;}
-->
</style>

<script language="JavaScript">
function updateIEZoneMapReg() {
  var sUrl = "ZoneMapReg.jsp";
  sUrl += "?" + "url=" + document.location;
  location.href = sUrl;
}


function init_DB() {
  var sUrl = "/DB/jsp/DB/Rundll.jsp";
  var strToken="<%=svToken%>";
  sUrl += "?" + "url=" + document.location + "&token=" + strToken;
  location.href = sUrl;
}

</script>
</head>

<body lang=ZH-CN link=blue vlink=blue style='tab-interval:21.0pt' leftmargin=0
rightMargin=0 topmargin=0 scroll=auto>

<div class=Section1>

<table border=0 cellspacing=0 cellpadding=0 width="100%" style='width:100.0%;
 mso-cellspacing:0cm;mso-padding-alt:0cm 0cm 0cm 0cm'>
 <tr>
  <td style='padding:0cm 0cm 0cm 0cm'>
  <p class=MsoNormal><span lang=EN-US><img width=19 height=30 id="_x0000_i1025"
  src="/style/img/main/contentleft.jpg"><o:p></o:p></span></p>
  </td>
  <td width="100%" style='width:100.0%;padding:0cm 0cm 0cm 0cm'
  background="/style/img/main/contentmidbk.jpg">
  <p class=MsoNormal><span lang=EN-US>&nbsp;</span></p>
  </td>
  <td style='padding:0cm 0cm 0cm 0cm'>
  <p class=MsoNormal><span lang=EN-US><img width=179 height=30 id="_x0000_i1026"
  src="/style/img/main/contentright.jpg"></span></p>
  </td>
 </tr>
</table>

<p style='margin-right:36.0pt;margin-left:36.0pt'>【软件环境】</p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US>Windows
2000/XP，IE6 (SP1)以上，Acrobat Reader 6 以上版本（打印使用）,JRE 1.4.2 及以上版本（工作流中使用）</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>【<span lang=EN-US> IE 设置】</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>1.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>为了系统可以正常运行，请检查您的<span
lang=EN-US>IE浏览器是否安装了“上网助手”，如果您安装了，请在使用本系统前卸载“上网助手”。</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>2.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>请您下载执行<span
lang=EN-US>“<a href="javascript:updateIEZoneMapReg()">updateIEZoneMap.reg</a>”文件，选择“打开”，它将帮您进行IE浏览器设置。<b>操作完成后，需要关闭IE，再重新打开。</b>这时IE窗口右下角有“可信站点”的字样，说明设置成功了。然后，点击“<a
href="javascript:init_DB()">报表初始化</a>”，此步骤根据网络带宽情况需要几秒到几十分钟时间不等。如果您执行了以上操作，下面的操作就不需要执行了。如果您没有执行以上操作，也可以根据下面的操作进行手工设置IE浏览器。</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>3.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>打开<span
lang=EN-US>IE浏览器，选择主菜单【工具】－【Internet选项】，在【常规】页签中点击“Internet临时文件”下的【设置】按钮，选中“每次访问此页时检查”选项，点击【确定】按钮。<o:p></o:p></span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><!-- 要使 http://servername 成为 Internet Explorer 的可信站点，请单击“工具”－【Internet选项】，然后指向“Internet 选项”，指向“安全”，指向“可信站点”，然后单击“站点”。键入 http://servername，并单击“确定”。
    TODO: 待完善 mk:@MSITStore:C:\WINNT\Help\cmconcepts.chm::/sag_CSWprocs_reqfile.htm --><![if !supportLists]><span
lang=EN-US>4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>在【安全】页签中选择<span
lang=EN-US>“受信任的站点”，然后点击【站点】按钮进入，在【可信站点】窗口中首先去掉 “对该区域中的所有站点要求服务器验证(https)”前面的勾，然后填写当前正在访问的网址，点击【添加】按钮，点击【确定】按钮。</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>5.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>在【安全】页签中选择<span
lang=EN-US>“受信任的站点”，然后点击【自定义级别】按钮，将“ActiveX控件和插件”中的5项均选为“启用”，点击【确定】按钮。</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>【相关下载】</p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="http://download.microsoft.com/download/ie6sp1/finrel/6_sp1/W98NT42KMeXP/CN/ie6setup.exe">下载
IE6CHS+SP1 </a>(链接微软网站下载文件，需要连接Internet；大小：472 KB)</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="javascript:updateIEZoneMapReg()">updateIEZoneMap.reg</a></span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="<%=svRpInstall%>">电子报表53控件下载(4MB)</a>，下载到本地路径后双击进行安装</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="<%=svDBInstall%>">部门预算软件下载(20MB)</a>，自解压到本地路径后运行setup.exe进行安装</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="<%=svGalInstall%>">总预算会计运行环境下载(400kB)</a>，下载到本地路径后双击进行安装</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="installpdf.htm">自动安装 Acrobat Reader</a> | <a
href="\download\AdbeRdr70_chs_full.exe">下载 Acrobat Reader</a> (25 MB) </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>获得最新的<span lang=EN-US>
Acrobat Reader：<a href="http://www.adobe.com/products/acrobat/alternate.html">http://www.adobe.com</a>
</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\download\j2re-1_4_2_07-windows-i586-p.exe">下载 JRE1.4</a> (15 MB) </span></p>

  <p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\download\jre-6u10-beta-windows-i586-p.exe">智能客户端环境下载</a> (15 MB) </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\FA\jsp\FA\download\MSASYNC410_CHS.exe">下载 资产同步软件 </a> (7 MB)，下载后直接双击MSASYNC410_CHS.exe运行安装 </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>清理流氓软件：使用瑞星卡卡，或者下载<span
lang=EN-US><a href="<%=svUnZip%>">清理流氓软件Upiea.zip(0.8 MB)</a>(下载到本地机器上，解压zip文件后，先运行reg.bat注册，然后运行Upiea.exe进行清理工作。建议在其界面的【插件管理】页签上，删除类型为【浏览器帮助项】的插件。)</span></p>
	
<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\admin\ExecuteSqlFiles.jsp?token=<%=svToken%>">数据初始化工具</a> </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US>&nbsp;</span></p>

</div>

</body>

</html>

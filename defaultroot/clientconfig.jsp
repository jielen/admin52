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
<title>�ͻ�������</title>
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
  <o:Company>���ѻ�԰</o:Company>
  <o:Lines>10</o:Lines>
  <o:Paragraphs>2</o:Paragraphs>
  <o:CharactersWithSpaces>1594</o:CharactersWithSpaces>
  <o:Version>9.2812</o:Version>
 </o:DocumentProperties>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <w:WordDocument>
  <w:Zoom>111</w:Zoom>
  <w:DrawingGridVerticalSpacing>7.8 ��</w:DrawingGridVerticalSpacing>
  <w:Compatibility>
   <w:UseFELayout/>
  </w:Compatibility>
 </w:WordDocument>
</xml><![endif]-->
<style>
<!--
 /* Font Definitions */
@font-face
	{font-family:����;
	panose-1:2 1 6 0 3 1 1 1 1 1;
	mso-font-alt:SimSun;
	mso-font-charset:134;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:3 135135232 16 0 262145 0;}
@font-face
	{font-family:"\@����";
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
	font-family:����;
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
	font-family:����;
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

<p style='margin-right:36.0pt;margin-left:36.0pt'>�����������</p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US>Windows
2000/XP��IE6 (SP1)���ϣ�Acrobat Reader 6 ���ϰ汾����ӡʹ�ã�,JRE 1.4.2 �����ϰ汾����������ʹ�ã�</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>��<span lang=EN-US> IE ���á�</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>1.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>Ϊ��ϵͳ�����������У���������<span
lang=EN-US>IE������Ƿ�װ�ˡ��������֡����������װ�ˣ�����ʹ�ñ�ϵͳǰж�ء��������֡���</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>2.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>��������ִ��<span
lang=EN-US>��<a href="javascript:updateIEZoneMapReg()">updateIEZoneMap.reg</a>���ļ���ѡ�񡰴򿪡���������������IE��������á�<b>������ɺ���Ҫ�ر�IE�������´򿪡�</b>��ʱIE�������½��С�����վ�㡱��������˵�����óɹ��ˡ�Ȼ�󣬵����<a
href="javascript:init_DB()">�����ʼ��</a>�����˲������������������Ҫ���뵽��ʮ����ʱ�䲻�ȡ������ִ�������ϲ���������Ĳ����Ͳ���Ҫִ���ˡ������û��ִ�����ϲ�����Ҳ���Ը�������Ĳ��������ֹ�����IE�������</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>3.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>��<span
lang=EN-US>IE�������ѡ�����˵������ߡ�����Internetѡ����ڡ����桿ҳǩ�е����Internet��ʱ�ļ����µġ����á���ť��ѡ�С�ÿ�η��ʴ�ҳʱ��顱ѡ������ȷ������ť��<o:p></o:p></span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><!-- Ҫʹ http://servername ��Ϊ Internet Explorer �Ŀ���վ�㣬�뵥�������ߡ�����Internetѡ���Ȼ��ָ��Internet ѡ���ָ�򡰰�ȫ����ָ�򡰿���վ�㡱��Ȼ�󵥻���վ�㡱������ http://servername����������ȷ������
    TODO: ������ mk:@MSITStore:C:\WINNT\Help\cmconcepts.chm::/sag_CSWprocs_reqfile.htm --><![if !supportLists]><span
lang=EN-US>4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>�ڡ���ȫ��ҳǩ��ѡ��<span
lang=EN-US>�������ε�վ�㡱��Ȼ������վ�㡿��ť���룬�ڡ�����վ�㡿����������ȥ�� ���Ը������е�����վ��Ҫ���������֤(https)��ǰ��Ĺ���Ȼ����д��ǰ���ڷ��ʵ���ַ���������ӡ���ť�������ȷ������ť��</span></p>

<p class=MsoNormal style='margin-right:36.0pt;mso-margin-top-alt:auto;
mso-margin-bottom-alt:auto;margin-left:72.0pt;text-indent:-18.0pt;mso-list:
l0 level1 lfo2;tab-stops:list 36.0pt'><![if !supportLists]><span lang=EN-US>5.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><![endif]>�ڡ���ȫ��ҳǩ��ѡ��<span
lang=EN-US>�������ε�վ�㡱��Ȼ�������Զ��弶�𡿰�ť������ActiveX�ؼ��Ͳ�����е�5���ѡΪ�����á��������ȷ������ť��</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>��������ء�</p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="http://download.microsoft.com/download/ie6sp1/finrel/6_sp1/W98NT42KMeXP/CN/ie6setup.exe">����
IE6CHS+SP1 </a>(����΢����վ�����ļ�����Ҫ����Internet����С��472 KB)</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="javascript:updateIEZoneMapReg()">updateIEZoneMap.reg</a></span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="<%=svRpInstall%>">���ӱ���53�ؼ�����(4MB)</a>�����ص�����·����˫�����а�װ</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="<%=svDBInstall%>">����Ԥ���������(20MB)</a>���Խ�ѹ������·��������setup.exe���а�װ</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="<%=svGalInstall%>">��Ԥ�������л�������(400kB)</a>�����ص�����·����˫�����а�װ</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="installpdf.htm">�Զ���װ Acrobat Reader</a> | <a
href="\download\AdbeRdr70_chs_full.exe">���� Acrobat Reader</a> (25 MB) </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>������µ�<span lang=EN-US>
Acrobat Reader��<a href="http://www.adobe.com/products/acrobat/alternate.html">http://www.adobe.com</a>
</span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\download\j2re-1_4_2_07-windows-i586-p.exe">���� JRE1.4</a> (15 MB) </span></p>

  <p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\download\jre-6u10-beta-windows-i586-p.exe">���ܿͻ��˻�������</a> (15 MB) </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\FA\jsp\FA\download\MSASYNC410_CHS.exe">���� �ʲ�ͬ����� </a> (7 MB)�����غ�ֱ��˫��MSASYNC410_CHS.exe���а�װ </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'>������å�����ʹ�����ǿ�������������<span
lang=EN-US><a href="<%=svUnZip%>">������å���Upiea.zip(0.8 MB)</a>(���ص����ػ����ϣ���ѹzip�ļ���������reg.batע�ᣬȻ������Upiea.exe�����������������������ġ��������ҳǩ�ϣ�ɾ������Ϊ�������������Ĳ����)</span></p>
	
<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US><a
href="\admin\ExecuteSqlFiles.jsp?token=<%=svToken%>">���ݳ�ʼ������</a> </span></p>

<p style='margin-right:36.0pt;margin-left:36.0pt'><span lang=EN-US>&nbsp;</span></p>

</div>

</body>

</html>

<%@page contentType="regfile"%><%@page import="com.anyi.gp.pub.ZoneMapReg"%><%

  response.setHeader("Content-Disposition", "attachment; filename=updateIEZoneMap.reg;");

  ZoneMapReg reg = new ZoneMapReg();
  String url = request.getParameter("url");
  if (null == url) {
    url = "http://" + request.getServerName();
  }
  String zoneMapString = reg.getZoneMap(url);

%>REGEDIT4

[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings]
"SyncMode5"=dword:00000003

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\ActiveX Compatibility\{0002E520-0000-0000-C000-000000000046}]
"Compatibility Flags"=dword:00000020

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\ActiveX Compatibility\{0002E500-0000-0000-C000-000000000046}]
"Compatibility Flags"=dword:00000020

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\ActiveX Compatibility\{0002E510-0000-0000-C000-000000000046}]
"Compatibility Flags"=dword:00000020

[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings\Zones\2]
"CurrentLevel"=dword:00000000
"1001"=dword:00000000
"1004"=dword:00000001
"1200"=dword:00000000
"1201"=dword:00000000
"1206"=dword:00000000
"1400"=dword:00000000
"1402"=dword:00000000
"1405"=dword:00000000
"1406"=dword:00000000
"1407"=dword:00000000
"1601"=dword:00000000
"1604"=dword:00000000
"1605"=dword:00000000
"1606"=dword:00000000
"1607"=dword:00000000
"1800"=dword:00000000
"1802"=dword:00000000
"1803"=dword:00000000
"1804"=dword:00000000
"1805"=dword:00000000
"1A00"=dword:00000000
"1A02"=dword:00000000
"1A03"=dword:00000000
"1C00"=hex:00,00,03,00
"1E05"=dword:00030000
"1608"=dword:00000000
"1609"=dword:00000001
"1A04"=dword:00000000
"1A05"=dword:00000000
"1A06"=dword:00000000
"1A10"=dword:00000000

<%=zoneMapString%>


[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\Main]
"DEPOff"=dword:00000001
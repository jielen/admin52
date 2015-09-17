<%@ page contentType="text/html; charset=GBK" %>
<%!
public static String convertURL(String url, HttpSession session) {
    StringBuffer result = new StringBuffer();
    int currentHead = 0;
    int firstIndex = url.indexOf('@');
    int secondIndex = url.indexOf('@', firstIndex + 1);
    while (-1 != firstIndex && -1 != secondIndex) {
      String key = url.substring(firstIndex + 1, secondIndex);
      Object value = "";
      if(key.equalsIgnoreCase("fxCoCode")){
        String cocodeStr = (String)session.getAttribute("svCoCode");
        if(cocodeStr == null) cocodeStr = "";
        String tempStr = "";
        char plus = '*';
        for(int i=0; i<10; i++) {
          if(i < cocodeStr.length()){
            tempStr = tempStr + (int)cocodeStr.charAt(i);
          }
          else{
        	  tempStr = tempStr + (int)plus;
        	}
        }
        value = tempStr; 
      }
      else{
        value = session.getAttribute(key);
        if (null == value)
          value = "";
      }
      
      result.append(url.substring(currentHead, firstIndex)).append(value);
      currentHead = secondIndex + 1;
      firstIndex = url.indexOf('@', secondIndex + 1);
      secondIndex = url.indexOf('@', firstIndex + 1);
    }
    if (currentHead < url.length())
      result.append(url.substring(currentHead));
    return result.toString();
  }
%>

<%
	String url = request.getParameter("url");
	if(url == null){
		out.println("转发的url地址为null！");
	}
	
	boolean hasParameter = false;
	if(url.indexOf("?") > 0){
		hasParameter = true;	
	}
	
	java.util.Enumeration tmp = request.getParameterNames();
	while(tmp.hasMoreElements()){
		String parameterName = (String)tmp.nextElement();
		if(parameterName.equals("url") || url.indexOf(parameterName) > 0){
			continue;
		}
		
		if(hasParameter){
			url += "&";
		}else{
			url += "?";
			hasParameter = true;
		}
		url += parameterName + "=" + request.getParameter(parameterName);
	}
	
	//session.setAttribute("svCoCode", "000");
	url = convertURL(url, session);
	//System.out.println("url:" + url);
	
	response.sendRedirect(url );
%>
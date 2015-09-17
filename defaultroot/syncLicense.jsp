<%@page import="com.anyi.gp.license.*"%>
<%@page import="com.anyi.gp.context.ApplusContext"%>

<%
	LicenseManager licenseManager = (LicenseManager) ApplusContext.getBean("licenseManager");
	
	String companyCount = (String)request.getAttribute("companyCount");
	String accountCount = (String)request.getAttribute("accountCount");	
	java.util.List allowedProducts = (java.util.List)request.getAttribute("allowedProducts");
/**		
	LicenseStatus licenseStatusD = licenseManager.licenseStatus;
	if(licenseStatusD == null){
		licenseStatusD = new LicenseStatus();
	}
	if(companyCount != null && companyCount.length() > 0){
		licenseStatusD.setCompanyCount(Integer.parseInt(companyCount));
	}
	if(accountCount != null && accountCount.length() > 0){
		licenseStatusD.setAccountCount(Integer.parseInt(accountCount));
	}
	if(allowedProducts != null && !allowedProducts.isEmpty()){	
		licenseStatusD.setAllowedProducts(allowedProducts);
	}
	licenseManager.licenseStatus = licenseStatusD;
	
	String licenseSN = (String)request.getAttribute("licenseSN");
	if(licenseSN != null && licenseSN.length() > 0){
		License licenseD = licenseManager.getLicense();
		if(licenseD == null){
			licenseD = new License();
		}
		licenseD.setSn(licenseSN);
		licenseManager.license = licenseD;
	}
	*/
%>
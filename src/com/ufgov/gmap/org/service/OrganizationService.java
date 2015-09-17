package com.ufgov.gmap.org.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public abstract interface OrganizationService
{
  public abstract Map getCompanyInfo(String paramString1, String paramString2);

  public abstract Map getOrgInfo(String paramString1, String paramString2, String paramString3);

  public abstract Map getPosiInfo(String paramString);

  public abstract Map getEmpInfo(String paramString);

  public abstract List getOrgPosiList(Map paramMap);

  public abstract List getEmpPosiList(Map paramMap);

  public abstract String getOptCoCode();

  public abstract void insertCompanyInfo(Map paramMap)
    throws SQLException;

  public abstract void deleteCompany(String paramString1, String paramString2, boolean paramBoolean)
    throws SQLException;

  public abstract void updateCompanyInfo(Map paramMap)
    throws SQLException;

  public abstract void insertOrgInfo(Map paramMap)
    throws SQLException;

  public abstract void deleteOrg(String paramString1, String paramString2, String paramString3, boolean paramBoolean)
    throws SQLException;

  public abstract void updateOrgInfo(Map paramMap)
    throws SQLException;

  public abstract boolean isDeletePermit(String paramString, Map paramMap);

  public abstract void saveOrgPosiInfo(List paramList1, List paramList2)
    throws SQLException;

  public abstract void saveOrgCompanyInfo(String paramString1, String paramString2, String paramString3, List paramList)
    throws SQLException;

  public abstract void deleteOrgCompanyInfo(String paramString1, String paramString2, String paramString3)
    throws SQLException;

  public abstract List getOrgCompanyList(String paramString1, String paramString2, String paramString3);

  public abstract List getCompanyList(String paramString);

  public abstract List getCheckedNumPrivList();

  public abstract void saveCheckedNumLimType(List paramList, Map paramMap)
    throws SQLException;

  public abstract void saveDefaultEmpPosiInfo(String paramString1, String paramString2, String paramString3)
    throws SQLException;

  public abstract void saveEmpUserInfo(boolean paramBoolean, Map paramMap)
    throws SQLException;

  public abstract void deleteUser(String paramString1, String paramString2, Map paramMap, boolean paramBoolean)
    throws SQLException;

  public abstract void saveEmpPosiInfo(List paramList1, List paramList2)
    throws SQLException;

  public abstract void savePosiInfo(boolean paramBoolean, String paramString1, String paramString2)
    throws SQLException;

  public abstract void deletePosiInfo(String paramString, boolean paramBoolean)
    throws SQLException;
}

 
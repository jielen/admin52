package com.anyi.admin.integrate.gocom.service;

public abstract interface GoComCommonService
{
  public abstract void saveTodoWorkMessageToGoCom(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5, String paramString6, boolean paramBoolean, String paramString7);

  public abstract void orgTreeSynchronizeToGoCom(String paramString);

  public abstract void importEmpList(String paramString);

  public abstract String getUserState(String paramString);

  public abstract String getMobileNumber(String paramString);

  public abstract void deleteAll();
}
 
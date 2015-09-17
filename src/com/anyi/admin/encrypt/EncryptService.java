package com.anyi.admin.encrypt;

public abstract interface EncryptService
{
  public abstract Object[][] getAllProducts()
    throws Exception;

  public abstract void saveConfigure(String paramString, byte[] paramArrayOfByte)
    throws Exception;

  public abstract byte[] getConfigure(String paramString)
    throws Exception;

  public abstract void saveKeyToDB(String paramString)
    throws Exception;

  public abstract String encodeString(String paramString);

  public abstract int getCompanyCount()
    throws Exception;

  public abstract int getAccountCount()
    throws Exception;
}
 
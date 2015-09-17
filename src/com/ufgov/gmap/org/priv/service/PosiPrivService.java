package com.ufgov.gmap.org.priv.service;

import java.sql.SQLException;
import java.util.Map;

public abstract interface PosiPrivService extends PrivService
{
  public abstract void savePosiPriv(String paramString, Map paramMap1, Map paramMap2)
    throws SQLException;
}

 
package com.ufgov.gmap.org.foreign.service;

import java.util.List;
import java.util.Map;

public abstract interface ForeignService
{
  public abstract List getForeignData(String paramString, Map paramMap);
}
 
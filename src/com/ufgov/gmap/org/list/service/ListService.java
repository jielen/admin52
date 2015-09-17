package com.ufgov.gmap.org.list.service;

import java.util.List;
import java.util.Map;

public abstract interface ListService
{
  public abstract List getLeftObjectList(String paramString, Map paramMap);

  public abstract List getRightObjectList(String paramString, Map paramMap);
}

 
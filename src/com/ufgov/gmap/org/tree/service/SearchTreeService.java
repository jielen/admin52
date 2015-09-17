package com.ufgov.gmap.org.tree.service;

import java.util.Map;

public abstract interface SearchTreeService extends TreeService
{
  public abstract Map getTreeDataByKeyword(String paramString1, String paramString2, Map paramMap);
}
 
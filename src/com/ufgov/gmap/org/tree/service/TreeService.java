package com.ufgov.gmap.org.tree.service;

import com.ufgov.gmap.org.tree.JNodeData;
import java.util.List;
import java.util.Map;

public abstract interface TreeService
{
  public abstract List getChildrenList(String paramString, Map paramMap);

  public abstract JNodeData getRoot(Map paramMap);
}

 
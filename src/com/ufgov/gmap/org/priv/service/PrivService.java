package com.ufgov.gmap.org.priv.service;

import java.util.List;

public abstract interface PrivService
{
  public abstract List getUserGroup();

  public abstract List getGroupPages(String paramString);
}
 
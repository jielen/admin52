/**
*本文件为通用jAVASCRIPT 工具类处理
*作者：　刘明
*开始写作日期：2003-2-17

**/


//用正则表达式对JAVASCRIPT　页面的字串作全程替换,
//即将　str中的 oldstr 部分用 newstr 进行替换
function replace(str,oldstr,newstr)
{
     var reg= new RegExp(oldstr,"g")  //用正则表达式更换 ><  ---> > \n < 全程进行(用参数 g)
     var result=str.replace(reg,newstr);
     return result

}
function getDocId(idName)
{
  var obj=document.getElementById(idName)
    return obj
}

//提示框
function eout(str)
{
   //alert(str);
}

function sout(str)
{
  alert(str);
}

function getXmlDoc(){
  var xmldoc = new ActiveXObject("microsoft.XMLDOM");
      xmldoc.async="false";
      return xmldoc;
}

/**
 * 根据一个节点集，得到当前节点集下，name="(name)" 的　value;
 * 如果没有则返回null
 * @return
 */
function getDomValue(dom,name){
  for(n=0;n<dom.length;n++){
    if(dom[n].getAttribute("name")==name){
      return dom[n].getAttribute("value");
    }
  }
  return null;
}

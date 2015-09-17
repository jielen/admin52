var isOldUser = true;
function trim(str){  //去除字符串中间的空格
  var oldstr = str;
  for(var i=0;i<oldstr.length;i++)
    str =  str.replace(" ","");
  return str;
}

function getIEVersion(){
	var ua = navigator.userAgent;
	var IEOffset = ua.indexOf("MSIE ");
	return parseInt(ua.substr(IEOffset + 5,1));
}

function login(formName){ //登录
	var version = navigator.appVersion;
	if ((navigator.appVersion.indexOf("MSIE") == -1) ||
					(getIEVersion() < 6)){
            if(confirm("此软件不能在您现在的浏览器上运行，请升级到IE 6.0以上！\n" +
            "确定要升级吗？")){
              open("http://www.microsoft.com/downloads/details.aspx?displaylang=zh-cn&FamilyID=1e1550cb-5e5d-48f5-b02b-20b602228de6", "ie6setup_sp1",
              		"menubar=yes,scrollbars=yes,status=yes,toolbar=yes,"
                  + "resizable=yes,titlebar=yes,scrollbars=yes,location=yes");
            }
						return;
	}

  transSA();
  var formElement = formName.elements;
  var userNameE;
  var passwordE;
  var actionE;
  var urlE;
  var xmlPacketLogin;
  for(var i=0;i<formElement.length;i++){
    if(formElement[i].name=="username")
      userNameE = formElement[i];
    if(formElement[i].name=="password")
      passwordE = formElement[i];
    if(formElement[i].name=="action")
      actionE = formElement[i];
    if (formElement[i].name=="url") 
    	urlE = formElement[i];
  }
  userNameE.value = trim(userNameE.value);
  if(userNameE.value ==''){ //若用户名与密码都输入时的处理.
    alert("请输入登陆帐号！");
  } 
  var userList = getUserList();
  if(null == userList) userList = new Array();
  userList = insertUser(userList, userNameE.value);
   var voForm = document.getElementById("formName");
   var voIpArr = document.createElement("input");
   voIpArr.type = "text";
   voIpArr.name = "iparray";
   voIpArr.value = joinArr(ipData);
   voForm.appendChild(voIpArr);
   document.cookie = jointCookieStr(userList);
   /*var aaaa = 'not fond!';
   for(var i =0; i<voForm.elements.length; i++){
   		if(voForm.elements[i].name=="iparray")
   			aaaa = voForm.elements[i].value;
   }
   alert(aaaa);*/
   formName.submit();
}

function joinArr(arrayData){
	var res = "";
	for(var i=0; i<arrayData.length; i++){
		for(var j=0; j<arrayData[i].length; j++){
			res += arrayData[i][j] + ',';
		}
	}
	return res;
}

function transSA(){
  var tmpUser = document.getElementById("userTxt").value;
  if(tmpUser.toLowerCase() == "sa"){
    document.getElementById("userTxt").value = "sa";
  }
}

function enterLogin(){
  if(event.keyCode == 13){
    var userName = document.getElementById("userTxt").value;
    var formName = document.getElementById("formName");
    if(userName){
      login(formName);
    }else{
      alert("请输入登陆帐号！");
      document.getElementById("userTxt").focus();
    }
  }
}

function moveFocus(){
  if(event.keyCode == 13){
    var userName = document.getElementById("userTxt").value;
    if(userName == null || userName.length == 0){
      alert("请输入登陆帐号！");
    }else{
      document.getElementById("passwordTxt").focus();
    }
  }
}

function init(){
  document.getElementById("userTxt").focus();
  clearAllTxt();
}

function clearAllTxt(){
  document.getElementById("userTxt").value="";
  document.getElementById("passwordTxt").value="";
}

 /**
* 在登录页面底部显示欢迎信息。
*/
function scroll(seed){
   var mess1="";
   var mess2= "欢迎您使用用友政务GRP-A++系统！";
   var day = new Date( );
   var hr = day.getHours( );
   if (( hr >= 0 ) && (hr <= 4 )){
      mess1="深夜了，注意身体哦...， ";
   }
   if (( hr >= 5 ) && (hr <= 7)){
      mess1="清晨好，起得真早啊...， ";
   }
   if (( hr >= 8 ) && (hr <= 11)){
      mess1="早上好，";
   }
   if (( hr >= 12) && (hr < 13)){
      mess1="午饭时间喔，";
   }
   if (( hr >= 13) && (hr <= 16)){
      mess1="下午好， ";
   }
   if (( hr >= 17) && (hr <= 18)){
      mess1="进入傍晚了，";
   }
   if ((hr >= 18) && (hr < 19)){
      mess1="该吃晚饭了，";
   }
   if ((hr >= 19) && (hr <= 23)){
      mess1="又到晚上黄金时间了，";
   }
   var msg=mess1+mess2;
   var out = " ";
   var c = 1;
   if (seed > 200) {
      seed-=2;
      var cmd="scroll(" + seed + ")";
      timerTwo=window.setTimeout(cmd,150);
   }else if (seed <= 200 && seed > 0) {
      for (c=0 ; c < seed ; c++) {
      out+=" ";
      }
      out+=msg;
      seed-=2;
      var cmd="scroll(" + seed + ")";
      window.status=out;
      timerTwo=window.setTimeout(cmd,150);
   }else if (seed <= 0) {
      if (-seed < msg.length) {
        out+=msg.substring(-seed,msg.length);
        seed--;
        var cmd="scroll(" + seed + ")";
        window.status=out;
        timerTwo=window.setTimeout(cmd,180);
      }else {
        window.status=" ";
        timerTwo=window.setTimeout("scroll(40)",500);
      }
   }
}

function jointCookieStr(userList){
	if(null == userList || 0 == userList.length){
		return "";
	}
	
	var today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 15 * 24 * 60 * 60 * 1000);
	var result = new StringBuffer();
	result.append("username=");
	for(var i=0; i<userList.length-1; i++){
		result.append(trim(userList[i]) + ",");
	}
	result.append(trim(userList[i]) + ";expires=");
	result.append(expire.toGMTString() + ";");
	return result.toString();
}

function getUserList(){
	var acookie=document.cookie.split(";");
	for(var i=0;i<acookie.length;i++){
		var arr=acookie[i].split("=");
		if("username"==arr[0]){
			if(arr.length>1)
				return arr[1].split(",");
			else
				return null;
		}
	}
	return null;
}

function insertUser(userList, userName){
	for(var i=0; i<userList.length; i++){
		if(trim(userName) == trim(userList[i]))
		 return userList;
	}
	userList[userList.length]=userName;
	return userList;
}

   timerONE=window.setTimeout('scroll(40)',200);



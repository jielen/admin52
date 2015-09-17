function GK_getRealWFActionName(sActionName,compoName) {
		var vsRealActionName = sActionName;
	if(isOwnAction(sActionName, compoName)){
		vsRealActionName = getActionName(sActionName, compoName);
	}
	return vsRealActionName;
}

function GK_setWFConfigs(sConfigName,sActionName,compoName){
	var vsRealActionName = sActionName;
	if(isOwnAction(sActionName, compoName)){
		vsRealActionName = getActionName(sActionName, compoName);
	}
	var voConfig =null;
	switch(sConfigName){
		case "newcommit": voConfig = {newcommit:vsRealActionName};break;
		case "commitsimply": voConfig = {commitsimply:vsRealActionName};break;
		case "handlecommit": voConfig = {handlecommit:vsRealActionName};break;
		case "untreadsimply": voConfig = {untreadsimply:vsRealActionName};break;
		case "untread": voConfig = {untread:vsRealActionName};break;
		case "callback": voConfig = {callback:vsRealActionName};break;
		case "rework": voConfig = {rework:vsRealActionName};break;
		case "interrupt": voConfig = {interrupt:vsRealActionName};break;
		case "handover": voConfig = {handover:vsRealActionName};break;
		case "deletedraft": voConfig = {deletedraft:vsRealActionName};break;		
	}
	PageX.setWfConfig(voConfig);
}

function getActionName(sCommonActionName,compoName){
	var vsCompoName = compoName;
	return vsCompoName+"_"+sCommonActionName;
}

function isOwnAction(sActionType, compoName){
			var f = "getMapOf"+sActionType;
			if("function"==typeof(window[f])){
				var voCompoMap = eval(f+"()");
			}else{
				return true;
			}
			var vsCompoName = compoName;
			var vsFlag = voCompoMap[vsCompoName];
			if(sActionType == "wfNewCommit")return PF.parseBool(voCompoMap[vsCompoName]);
			else{
					if(vsFlag == null)return true;
					else return false;
			}
}

//与功能对应的map，map的key是部件名,值是Y或N，代表是否走自己的action
function getMapOfwfNewCommit(){
		var voFlagMap = {
			"DP_EDIT_XX":"Y",
			"DP_FREEZE":"Y",
			"BI_ABI_XXX":"Y",
			"BI_ABI_ASSIGN":"Y",
			"BI_ABI_ADJ":"Y",
			"BI_TBI_XXX":"Y",
			"BI_TBI_ASSIGN":"Y",
			"BI_TBI_ADJ":"Y",
			"BI_DBI_XXX":"Y",
			"BI_DBI_DEL":"Y",
			"BI_DBI_ADJ":"Y",
			"BI_DBI_ADJU_V":"Y",
			"BI_DBI_ABICTRL_XXX":"Y",
			"BI_DBI_FREEZE":"Y",
			"AM_BPAE":"Y",
			"AM_BPAE_COLLECT":"Y",
			"AM_PVM_RETURN":"Y",
			"AM_PVM_BI":"Y",
			"CP_DV_DP":"Y",
			"BI_ADJUST":"Y",
			"CP_AV_RETURN_NEW":"Y",
			"BI_DBI_TBICTRL_XXX":"Y"
		};
		return voFlagMap;
}
function getMapOfcommitSimply(){
		var voFlagMap = {
			"Example":"N"
			};
		return voFlagMap;
}
function getMapOfcommit(){
		var voFlagMap = {"Example":"N"};
		return voFlagMap;
}
function getMapOfdeleteDraftAndEntity(){
		var voFlagMap = {
			"DP_UNFREEZE":"N",
			"DP_NBI_EDIT":"N",
			"DP_NBI_INCREASE":"N",
			"DP_NBI_UNFREEZE":"N",
			"AM_BPAE_COLLECT":"N",
			"AM_WPAE":"N",
			"AM_PVP_BI":"N",
			"AM_PVP_DP":"N",
			"AM_PVM_AM":"N",
			"AM_PVE":"N",
			"AM_PVM_RETURN":"N",
			"CP_DV_NC":"N",
			"CP_DV_RETURN":"N",
			"CP_AV_NC":"N",
			"CP_AV_RETURN":"N",
			"CP_AV_RETURN_NEW":"N",
			"CP_AV_NC":"N",			
			"BI_ABI_XXX":"N",
			"BI_ABI_UNFREEZE":"N",
			"BI_TBI_XXX":"N",
			"BI_TBI_UNFREEZE":"N",
			"BI_DBI_XXX":"N",
			"BI_DBI_UNFREEZE":"N",
			"BI_ADJUST":"N"
			};
		return voFlagMap;
}
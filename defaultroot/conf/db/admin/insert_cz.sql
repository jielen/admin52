insert into AS_GROUP(GROUP_ID, GROUP_NAME, GROUP_DESC)
values('czgroup', '单位用户组', '财政或财务单位用户组');

insert into AP_GROUP_PAGE (PAGE_ID, PAGE_ORDER, PAGE_DESC, GROUP_ID, PAGE_TITLE)
select m.menu_id || '_CZ' as page_id, m.ord_index || '' as page_order
, m.menu_name as page_desc, 'czgroup' as group_id, t.res_na as page_title
from as_menu m, as_lang_trans t
where ((parent_id is null and menu_id not in ('GRP_FI','GRP_GFI'))
or parent_id in ('GRP_FI','GRP_GFI'))
and m.menu_id = t.res_id and menu_id <> 'SYS'
and m.menu_id || '_CZ' not in (select page_id from AP_GROUP_PAGE);

insert into AP_MENU(MENU_ID, MENU_NAME, ORD_INDEX, PARENT_ID, ICON_NAME)
select sm.menu_id || '_CZ', lt.res_na, sm.ord_index, sm.parent_id || '_CZ', sm.icon_name
from as_menu sm, as_lang_trans lt where sm.menu_id = lt.res_id
and sm.menu_id || '_CZ' not in (select menu_id from AP_MENU);

update AP_MENU set parent_id = '' where parent_id = '_CZ';

insert into AP_MENU_COMPO(MENU_ID, COMPO_ID, COMPO_NAME, ORD_INDEX, IS_GOTO_EDIT, IS_ALWAYS_NEW, URL, IS_IN_MENU)
select sm.menu_id || '_CZ', sm.compo_id, lt.res_na as compo_name, sm.ord_index, sm.is_goto_edit, sm.is_always_new, sm.url, sm.is_in_menu
from as_menu_compo sm, as_lang_trans lt
where sm.compo_id = lt.res_id
and sm.menu_id || '_CZ' not in(select menu_id from AP_MENU_COMPO where AP_MENU_COMPO.COMPO_ID = sm.compo_id);

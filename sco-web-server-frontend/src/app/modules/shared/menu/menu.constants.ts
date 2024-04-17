import { MenuItem } from "sco-angular-components";
import { LOGIN_MENU_ITEM, LOGOUT_MENU_ITEM, OPTIONS_MENU_ITEM, SERVER_MENU_ITEM, USERS_MENU_ITEM, USERS_MENU_ITEM_GROUP } from "./menu-item.constants";

export const MENU_SUPER_ADMIN: MenuItem[] = [
  SERVER_MENU_ITEM,
  USERS_MENU_ITEM_GROUP,
  OPTIONS_MENU_ITEM,
  LOGOUT_MENU_ITEM,
];

export const MENU_ADMIN: MenuItem[] = [
  SERVER_MENU_ITEM,
  USERS_MENU_ITEM,
  OPTIONS_MENU_ITEM,
  LOGOUT_MENU_ITEM,
];

export const MENU_USER: MenuItem[] = [
  SERVER_MENU_ITEM,
  OPTIONS_MENU_ITEM,
  LOGOUT_MENU_ITEM,
];

export const MENU_LOGOUT: MenuItem[] = [
  OPTIONS_MENU_ITEM,
  LOGIN_MENU_ITEM,
];

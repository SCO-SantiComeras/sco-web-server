import { MenuItem } from "sco-angular-components";
import { LOGIN_MENU_ITEM, LOGOUT_MENU_ITEM, SERVER_MENU_ITEM, USERS_MENU_ITEM, USERS_MENU_ITEM_GROUP } from "./menu-item.constants";

export const MENU_SUPER_ADMIN: MenuItem[] = [
  SERVER_MENU_ITEM,
  USERS_MENU_ITEM_GROUP,
  LOGOUT_MENU_ITEM,
];

export const MENU_ADMIN: MenuItem[] = [
  SERVER_MENU_ITEM,
  USERS_MENU_ITEM,
  LOGOUT_MENU_ITEM,
];

export const MENU_USER: MenuItem[] = [
  LOGOUT_MENU_ITEM,
];

export const MENU_LOGOUT: MenuItem[] = [
  LOGIN_MENU_ITEM,
];

import { MenuItem } from "sco-angular-components";
import { LOGIN_MENU_ITEM, LOGOUT_MENU_ITEM, OPTIONS_MENU_ITEM, RESUME_MENU_ITEM, USERS_MENU_ITEM } from "./menu-item.constants";

export const MENU_SUPER_ADMIN: MenuItem[] = [
  RESUME_MENU_ITEM,
  USERS_MENU_ITEM,
  OPTIONS_MENU_ITEM,
  LOGOUT_MENU_ITEM,
];

export const MENU_ADMIN: MenuItem[] = [
  RESUME_MENU_ITEM,
  USERS_MENU_ITEM,
  OPTIONS_MENU_ITEM,
  LOGOUT_MENU_ITEM,
];

export const MENU_USER: MenuItem[] = [
  RESUME_MENU_ITEM,
  OPTIONS_MENU_ITEM,
  LOGOUT_MENU_ITEM,
];

export const MENU_LOGOUT: MenuItem[] = [
  OPTIONS_MENU_ITEM,
  LOGIN_MENU_ITEM,
];

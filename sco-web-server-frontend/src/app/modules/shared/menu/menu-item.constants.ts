import { MenuItem } from "sco-angular-components";

export const USERS_MENU_ITEM_GROUP: MenuItem = {
  icon: "fa fa-caret-down",
  text: "label.menu.users.group",
  children: [
    {
      text: "label.menu.users",
      route: "users",
      icon: "fa fa-user"
    },
    {
      text: "label.menu.roles",
      route: "roles",
      icon: "fa fa-user"
    },
    {
      text: "label.menu.permissions",
      route: "permissions",
      icon: "fa fa-user"
    }
  ]
}

export const USERS_MENU_ITEM: MenuItem = {
  icon: "fa fa-user",
  text: "label.menu.users",
  route: "users",
}

export const LOGIN_MENU_ITEM: MenuItem = {
  icon: "fa fa-sign-in",
  text: "label.menu.login",
  route: "/login",
}

export const LOGOUT_MENU_ITEM: MenuItem = {
  icon: "fa fa-sign-out",
  text: "label.menu.logout",
  route: "/logout",
}

export const SERVER_MENU_ITEM: MenuItem = {
  icon: "fa fa-server",
  text: "label.menu.node-server",
  route: "/node-server",
}
import { MenuItem } from "sco-angular-components";

export const USERS_MENU_ITEM: MenuItem = {
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

export const OPTIONS_MENU_ITEM: MenuItem = {
  icon: "fa fa-gear",
  text: "label.menu.options",
  route: "/options",
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

export const RESUME_MENU_ITEM: MenuItem = {
  icon: "fa fa-paper-plane",
  text: "label.menu.resume",
  route: "/resume",
}

export const PDF_EXAMPLE_MENU_ITEM: MenuItem = {
  icon: "fa fa-file",
  text: "label.menu.pdf-example",
  route: "/pdf-example",
}
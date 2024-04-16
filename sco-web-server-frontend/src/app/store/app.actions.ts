import { ScoDisplayResize } from "sco-angular-components";

export class SetApplicationTheme {
  static readonly type = '[App] Set Application Theme';
  constructor(public payload: { theme: string } ) {}
}

export class SetDisplayMode {
  static readonly type = '[App] Set Application Display Mode';
  constructor(public payload: { scoDisplayResize: ScoDisplayResize } ) {}
}
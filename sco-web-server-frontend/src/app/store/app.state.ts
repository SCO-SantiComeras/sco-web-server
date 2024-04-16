import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ScoConstantsService, ScoDisplayResize, ScoThemeService, ScoTranslateService } from "sco-angular-components";
import { SetApplicationTheme, SetDisplayMode } from "./app.actions";

export class AppStateModel {
  currentTheme: string;
  scoDisplayResize: ScoDisplayResize;
  success: boolean;
  successMsg: string;
  errorMsg: string;
}

export const AppStateDefaults: AppStateModel = {
    currentTheme: '',
    scoDisplayResize: undefined,
    success: false,
    successMsg: undefined,
    errorMsg: undefined,
};

@State<AppStateModel>({
  name: 'app',
  defaults: AppStateDefaults,
}) 

@Injectable()
export class AppState {

  constructor(
    private readonly constantsService: ScoConstantsService,
    private readonly translateService: ScoTranslateService,
    private readonly themeService: ScoThemeService,
  ) {}

  @Selector()
  static currentTheme(state: AppStateModel): string {
      return state.currentTheme;
  }

  @Selector()
  static scoDisplayResize(state: AppStateModel): ScoDisplayResize {
      return state.scoDisplayResize;
  }

  @Selector()
  static success(state: AppStateModel): boolean {
      return state.success;
  }

  @Selector()
  static successMsg(state: AppStateModel): string {
      return state.successMsg;
  }

  @Selector()
  static errorMsg(state: AppStateModel): string {
      return state.errorMsg;
  }

  @Action(SetApplicationTheme)
  public setApplicationTheme(
      { patchState }: StateContext<AppStateModel>,
      { payload }: SetApplicationTheme
  ) {
    const theme: string = payload.theme;

    const allThemes: string[] = [
        this.constantsService.ScoThemeConstants.THEME_DEFAULT,
        this.constantsService.ScoThemeConstants.THEME_BLUE,
        this.constantsService.ScoThemeConstants.THEME_DARK,
    ];

    const existTheme: string = allThemes.find(t => t == theme);
    if (!existTheme) {
        patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.app.state.theme.not.found'),
        });
        return;
    }

    try {
        this.themeService.changeTheme(theme);
        patchState({
            currentTheme: theme,
            success: true,
            successMsg: this.translateService.getTranslate('label.app.state.theme.success'),
        });
    } catch (error) {
        patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.app.state.theme.error'),
        });
    }
  }

  @Action(SetDisplayMode)
  public setDisplayMode(
      { patchState }: StateContext<AppStateModel>,
      { payload }: SetDisplayMode
  ) {
    patchState({
        scoDisplayResize: payload.scoDisplayResize,
        success: true,
        successMsg: this.translateService.getTranslate('label.app.state.displayMode.success'),
    });
  }
}
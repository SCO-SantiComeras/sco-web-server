import { CACHE_CONSTANTS } from './constants/cache.constants';
import { Component, ViewEncapsulation } from '@angular/core';
import { WebsocketsService } from './websockets/websockets.service';
import { MenuItem, ScoCacheService, ScoConfigService, ScoConstantsService, ScoDisplayResize, ScoPdfViewerService, ScoThemeService, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { MENU_LOGOUT } from './modules/shared/menu/menu.constants';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetApplicationTheme, SetDisplayMode } from './store/app.actions';
import { AppState } from './store/app.state';
import { AuthState } from './modules/auth/store/auth.state';
import { MenuService } from './modules/shared/menu/menu.service';
import { CONFIG_CONSTANTS } from './constants/config.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  title: string = 'sco-web-server';

  public CACHE_CONSTANTS = CACHE_CONSTANTS;

  constructor(
    public readonly pdfViewerService: ScoPdfViewerService,
    public readonly cacheService: ScoCacheService,
    public readonly themeService: ScoThemeService,
    public readonly configService: ScoConfigService,
    public readonly constantsService: ScoConstantsService,
    private readonly translateService: ScoTranslateService,
    private readonly toastService: ScoToastService,
    private readonly websocketsService: WebsocketsService,
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    this.setTheme();
    this.websocketsService.connectWebSocket();
    
    if (this.store.selectSnapshot(AuthState.loggedUser)) {
      this.cacheService.setElement(CACHE_CONSTANTS.MENU_ITEMS, this.menuService.selectMenu(this.store.selectSnapshot(AuthState.loggedUser)));
    } else {
      this.cacheService.setElement(CACHE_CONSTANTS.MENU_ITEMS, MENU_LOGOUT);
    }
  }

  onClickMenuItem($event: MenuItem) {
    if (!$event || ($event && !$event.route)) {
      return;
    }

    this.router.navigateByUrl($event.route);
  }

  onCLickLogo($event: boolean) {
    if (!$event) return;
    this.router.navigateByUrl('login');
  }

  private setTheme() {
    let currentTheme: string = this.store.selectSnapshot(AppState.currentTheme);
    if (!currentTheme || (currentTheme && currentTheme.length == 0)) {
      currentTheme = this.configService.getData(CONFIG_CONSTANTS.THEME);
    }

    this.store.dispatch(new SetApplicationTheme({ theme: currentTheme })).subscribe();
  }

  onDisplayResize($event: ScoDisplayResize) {
    this.store.dispatch(new SetDisplayMode({ scoDisplayResize: $event })).subscribe();
  }

  onPdfViewerEvent(event: string, value: boolean = false): void {
    if (event == 'onGoBack') {
      this.pdfViewerService.unLoadPdf();
      return;
    }

    if (event == 'onDownload') {
      if (value) {
        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.translateService.getTranslate('label.pdf-viewer.component.onDownload')
        );
      } else {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.translateService.getTranslate('label.pdf-viewer.component.onDownload.error')
        );
      }
      return;
    }

    if (event == 'onLoad') {
      if (value) {
        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.translateService.getTranslate('label.pdf-viewer.component.onLoad')
        );
        return;
      }
    }
  }
}

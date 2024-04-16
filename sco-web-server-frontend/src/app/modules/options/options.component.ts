import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ScoCacheService, ScoConfigService, ScoConstantsService, ScoDisplayResize, ScoSelectItem, ScoTranslateService } from 'sco-angular-components';
import { SetApplicationTheme } from '../../store/app.actions';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { CACHE_CONSTANTS } from 'src/app/constants/cache.constants';
import { CONFIG_CONSTANTS } from 'src/app/constants/config.constants';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  public CACHE_CONSTANTS = CACHE_CONSTANTS;

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  public themeSelected: string;
  public themeOptions: ScoSelectItem<string>[];
  public themeSetSelectedItem: ScoSelectItem<string>;

  constructor(
    private readonly configService: ScoConfigService,
    public readonly cacheService: ScoCacheService,
    public readonly translateService: ScoTranslateService,
    public readonly constantsService: ScoConstantsService,
    private readonly store: Store,
  ) { 
    this.cacheService.setElement(CACHE_CONSTANTS.TITLE, this.translateService.getTranslate('label.options.component.cache.title'));

    this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
      this.scoDisplayResize = scoDisplayResize;
    });
  }

  ngOnInit() {
    this.setInitThemeOption();
  }

  /* Init Options */
  setInitThemeOption() {
    this.themeSelected = this.store.selectSnapshot(AppState.currentTheme) || this.configService.getData(CONFIG_CONSTANTS.THEME);
    this.themeOptions = [
      {label: this.translateService.getTranslate('label.themes.default'), value: "theme-default"},
      {label: this.translateService.getTranslate('label.themes.dark'), value: "theme-dark"},
      {label: this.translateService.getTranslate('label.themes.blue'), value: "theme-blue"},
    ];
    this.themeSetSelectedItem = undefined;
  }

  /* Default Options */
  onClickDefaultsOptions() {
    this.store.dispatch(new SetApplicationTheme({ theme: this.configService.getData(CONFIG_CONSTANTS.THEME) || 'theme-default' })).subscribe({
      next: () =>  {
        this.themeSelected = this.configService.getData('theme') || 'theme-default';
        this.themeSetSelectedItem = this.themeOptions.find(o => o.value == this.themeSelected);
      }
    });
  }

  /* Options Functions */
  selectTheme() {
    this.store.dispatch(new SetApplicationTheme({ theme: this.themeSelected })).subscribe();
  }
}

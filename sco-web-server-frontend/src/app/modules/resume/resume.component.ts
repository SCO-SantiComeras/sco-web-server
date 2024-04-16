import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { User } from '../users/model/user';
import { AuthState } from '../auth/store/auth.state';
import { AppState } from 'src/app/store/app.state';
import { Observable } from 'rxjs';
import { ScoCacheService, ScoConstantsService, ScoDisplayResize, ScoTranslateService } from 'sco-angular-components';
import { CACHE_CONSTANTS } from 'src/app/constants/cache.constants';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {

  public CACHE_CONSTANTS = CACHE_CONSTANTS;

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  public user: User;
  public dateNow: Date;

  constructor(
    public readonly cacheService: ScoCacheService,
    public readonly constantsService: ScoConstantsService,
    private readonly translateService: ScoTranslateService,
    private readonly store: Store,
  ) { 
    this.cacheService.setElement(CACHE_CONSTANTS.TITLE, this.translateService.getTranslate('label.resume.component.cache.title'));
    this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
      this.scoDisplayResize = scoDisplayResize;
    });

    this.user = this.store.selectSnapshot(AuthState.loggedUser);
    this.dateNow = new Date();
  }
}

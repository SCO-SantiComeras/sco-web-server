import { cloneDeep } from 'lodash-es';
import { User } from '../../../users/model/user';
import { AppState } from './../../../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ScoCacheService, ScoConstantsService, ScoDisplayResize, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEmail, FetchUserByEmail } from '../../store/auth.actions';
import { AuthState } from '../../store/auth.state';
import { CACHE_CONSTANTS } from 'src/app/constants/cache.constants';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  public CACHE_CONSTANTS = CACHE_CONSTANTS;

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  public email: string; // Url Param
  public user: User; // User Fetched By pwdRecovery Url Param

  public finishedProcess: boolean;
  public activatedUser: boolean;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    public readonly cacheService: ScoCacheService,
    private readonly toastService: ScoToastService,
    public readonly translateService: ScoTranslateService,
    public readonly constantsService: ScoConstantsService,
  ) { 
    this.cacheService.setElement(CACHE_CONSTANTS.TITLE, this.translateService.getTranslate('label.confirm-email.component.cache.title'));

    this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
      this.scoDisplayResize = scoDisplayResize;
    });
  }

  ngOnInit() {
    this.email = '';
    this.user = new User();
    this.finishedProcess = false;
    this.activatedUser = false;

    // Get Route Param
    if (this.route.snapshot.paramMap.has('email')) {
      this.email = this.route.snapshot.paramMap.get('email')
    }

    // Check if Param is reported
    if (!this.email) {
      this.router.navigateByUrl('login');
      return;
    }
    
    /* If Param is reported, fetch user by pwd token */
    this.fetchUser(this.email);
  }

  /* Store Actions */
  fetchUser(email: string): void {
    this.store.dispatch(new FetchUserByEmail({ email: email })).subscribe({
      next: async () => {
        const user: User = this.store.selectSnapshot(AuthState.user);
        if (!user) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(AuthState.errorMsg),
          );

          // If Users if NOT fetched, stop pwd recovery flow and go login
          this.router.navigateByUrl('login');
          return;
        }

        // If User is fetched OK, Go to initial validation (Token and Time request)
        this.user = cloneDeep(user);
        if (this.user.active == true) {
          this.toastService.addSuccessMessage(
            this.translateService.getTranslate('label.success'),
            this.translateService.getTranslate('label.confirm-email.component.user.already.activated')
          );
          this.router.navigateByUrl('login');
          return;
        }

        this.activateUser(this.user);
      },
      error: (err) => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(AuthState.errorMsg),
        );
        this.router.navigateByUrl('login');
        return;
      }
    });
  }

  activateUser(user: User): void {
    this.store.dispatch(new ConfirmEmail({ email: user.email })).subscribe({
      next: async () => {
        this.finishedProcess = true;

        const success: boolean = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(AuthState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(AuthState.successMsg),
        );
        this.activatedUser = true;
        return;
      },
      error: (err) => {
        this.finishedProcess = true;

        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(AuthState.errorMsg),
        );
        return;
      }
    });
  }

  /* Redirection Actions */
  onCLickGoLogin() {
    this.router.navigateByUrl('login');
  }
}

import { AppState } from './../../../../store/app.state';
import { VALIDATION_PATTERNS_CONSTANTS } from '../../../../constants/validation-patterns.constants';
import { User } from '../../../users/model/user';
import { AuthState } from './../../store/auth.state';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import * as moment from 'moment';
import { ScoCacheService, ScoConfigService, ScoConstantsService, ScoDisplayResize, ScoFormError, ScoFormErrorsService, ScoSpinnerService, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { FetchUserRecoveryPwd, ResetPassword } from '../../store/auth.actions';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CACHE_CONSTANTS } from 'src/app/constants/cache.constants';
import { CONFIG_CONSTANTS } from 'src/app/constants/config.constants';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})

export class PasswordRecoveryComponent implements OnInit {

  public CACHE_CONSTANTS = CACHE_CONSTANTS;

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  public pwdRecovery: string; // Url Param
  public user: User; // User Fetched By pwdRecovery Url Param
  
  public type_input_pwd: string;
  public type_input_pwd_confirm: string;

  public resetPasswordForm: FormGroup;
  public formErrors: ScoFormError[];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    public readonly translateService: ScoTranslateService,
    public readonly constantsService: ScoConstantsService,
    public readonly cacheService: ScoCacheService,
    private readonly formErrorsService: ScoFormErrorsService,
    private readonly toastService: ScoToastService,
    private readonly configservice: ScoConfigService,
    private readonly spinnerService: ScoSpinnerService,
  ) { 
    this.cacheService.setElement(CACHE_CONSTANTS.TITLE, this.translateService.getTranslate('label.password-recovery.component.cache.title'));

    this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
      this.scoDisplayResize = scoDisplayResize;
    });
  }

  ngOnInit() {
    this.pwdRecovery = '';
    this.user = new User();
    this.type_input_pwd = "password";
    this.type_input_pwd_confirm = "password";

    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
    this.formErrors = [];

    // Get Route Param
    if (this.route.snapshot.paramMap.has('pwdRecovery')) {
      this.pwdRecovery = this.route.snapshot.paramMap.get('pwdRecovery')
    }

    // Check if Param is reported
    if (!this.pwdRecovery) {
      this.router.navigateByUrl('login');
      return;
    }
    
    /* If Param is reported, fetch user by pwd token */
    this.fetchUser();
  }

  /* Store Actions */
  fetchUser() {
    this.spinnerService.showSpinner();

    this.store.dispatch(new FetchUserRecoveryPwd({ pwdRecoveryToken: this.pwdRecovery })).subscribe({
      next: async () => {
        this.spinnerService.hideSpinner(500);

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

        if (!this.validatePwdRecovery()) {
          this.router.navigateByUrl('login');
        }
      },
      error: (err) => {
        this.spinnerService.hideSpinner(500);
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(AuthState.errorMsg),
        );

        // If Users if NOT fetched, stop pwd recovery flow and go login
        this.router.navigateByUrl('login');
        return;
      }
    });
  }

  /* Initial Validation With Fetched User */
  validatePwdRecovery(): boolean {
    const actualDate = moment(new Date());
    const recoveryDate = moment(new Date(this.user.pwdRecoveryDate));

    const hours: number = actualDate.diff(recoveryDate,'hours');
    const minutes: number = actualDate.diff(recoveryDate,'minutes'); 

    const maxMinutesExpire: number = this.configservice.getData(CONFIG_CONSTANTS.PWD_RECOVERY_EXPIRE) || 30;
    if ((minutes >= maxMinutesExpire)) {
      this.toastService.addErrorMessage(
        this.translateService.getTranslate('label.error'),
        `${this.translateService.getTranslate('label.password-recovery.component.validations.expire.time')} (${maxMinutesExpire})`
      );
      return false;
    }

    // Validate Pwd Recovery token Of The User With The Pwd Recovery Token param in URL
    if ((this.pwdRecovery !== this.user.pwdRecoveryToken)) {
      this.toastService.addErrorMessage(
        this.translateService.getTranslate('label.error'),
        this.translateService.getTranslate('label.password-recovery.component.validations.invalid.token')
      );
      return false;
    }

    return true;
  }

  /* Form Actions */ 
  onClickGoLogin() {
    this.router.navigateByUrl('login');
  }

  onClickCancelForm() {
    this.resetPasswordForm = this.formErrorsService.cleanErrors(this.resetPasswordForm);
  }

  onClickSubmitForm() {
    const { password, newPassword} = this.resetPasswordForm.value;
    this.validateFormValues(password, newPassword);
    if (this.formErrors && this.formErrors.length > 0) {
      return;
    }

    this.user.password = newPassword
    this.user.newPassword = newPassword;
    this.editPassword();
  }

  validateFormValues(password: string, newPassword: string) {
    this.formErrors = [];

    if (!password) {
      this.formErrors.push({ 
        formControlName: 'password', 
        error: this.translateService.getTranslate('label.validation.user.password'),
      });
    } else {
      if (password.length < 8) {
        this.formErrors.push({ 
          formControlName: 'password', 
          error: this.translateService.getTranslate('label.validation.user.password.min.length'),
        });
      }

      if (!VALIDATION_PATTERNS_CONSTANTS.PASSWORD.PATTERN.test(password)) {
        this.formErrors.push({ 
          formControlName: 'password', 
          error: this.translateService.getTranslate(VALIDATION_PATTERNS_CONSTANTS.PASSWORD.ERROR),
        });
      }
    }

    if (!newPassword) {
      this.formErrors.push({ 
        formControlName: 'newPassword', 
        error: this.translateService.getTranslate('label.validation.user.newPassword'),
      });
    } else {
      if (newPassword.length < 8) {
        this.formErrors.push({ 
          formControlName: 'newPassword', 
          error: this.translateService.getTranslate('label.validation.user.newPassword.min.length'),
        });
      }

      if (!VALIDATION_PATTERNS_CONSTANTS.PASSWORD.PATTERN.test(newPassword)) {
        this.formErrors.push({ 
          formControlName: 'newPassword', 
          error: this.translateService.getTranslate(VALIDATION_PATTERNS_CONSTANTS.PASSWORD.ERROR),
        });
      }

      if (password != newPassword) {
        this.formErrors.push({ 
          formControlName: 'newPassword', 
          error: this.translateService.getTranslate('label.validation.user.newPassword.not.equals'),
        });
      }
    }

    this.resetPasswordForm = this.formErrorsService.setErrors(this.resetPasswordForm, this.formErrors);
  }

  editPassword() {
    this.spinnerService.showSpinner();

    this.store.dispatch(new ResetPassword({ pwdRecoveryToken: this.pwdRecovery, user: this.user })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);
        
        const success = this.store.selectSnapshot(AuthState.success);
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
        
        this.router.navigateByUrl('login');
      },
      error: (err) => {
        this.spinnerService.hideSpinner(500);
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(AuthState.errorMsg),
        );
      }
    });
  }
}

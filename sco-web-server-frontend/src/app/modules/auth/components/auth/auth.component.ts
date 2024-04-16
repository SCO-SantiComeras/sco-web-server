import { VALIDATION_PATTERNS_CONSTANTS } from '../../../../constants/validation-patterns.constants';
import { Router } from '@angular/router';
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { first } from 'rxjs';
import { ILogin, ScoCacheService, ScoConfigService, ScoConstantsService, ScoFormError, ScoFormErrorsService, ScoModalService, ScoSpinnerService, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { AuthState } from '../../store/auth.state';
import { LogIn, RequestPassword, SendReoveryPasswordEmail } from '../../store/auth.actions';
import { User } from '../../../users/model/user';
import { MenuService } from './../../../shared/menu/menu.service';
import environment from 'src/environments/environment';
import { CACHE_CONSTANTS } from 'src/app/constants/cache.constants';
import { CONFIG_CONSTANTS } from 'src/app/constants/config.constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthComponent),
      multi: true
    }
  ]
})
export class AuthComponent implements OnInit {

  public CACHE_CONSTANTS = CACHE_CONSTANTS;

  public formErrors: ScoFormError[];

  public recoveryPasswordForm: FormGroup;
  public formErrorsModal: ScoFormError[];

  constructor(
    public readonly translateService: ScoTranslateService,
    public readonly cacheService: ScoCacheService,
    public readonly constantsService: ScoConstantsService,
    private readonly configService: ScoConfigService,
    private readonly formErrorsService: ScoFormErrorsService,
    private readonly spinnerService: ScoSpinnerService,
    private readonly toastService: ScoToastService,
    private readonly modalService: ScoModalService,
    private readonly menuService: MenuService,
    private readonly store: Store,
    private readonly router: Router
  ) { 
    this.cacheService.setElement(CACHE_CONSTANTS.TITLE, this.translateService.getTranslate('label.auth.component.cache.title'));
  }

  ngOnInit(): void {
    this.formErrors = [];

    this.recoveryPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
    this.formErrorsModal = [];
  }

  /* Store Functions */
  login(login: ILogin) {
    this.spinnerService.showSpinner();

    this.store.dispatch(new LogIn({ login: login })).pipe(first()).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(AuthState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(AuthState.successMsg),
        );

        const user: User = this.store.selectSnapshot(AuthState.loggedUser);
        this.cacheService.setElement(CACHE_CONSTANTS.MENU_ITEMS, this.menuService.selectMenu(user));
        this.router.navigateByUrl('resume');
      }, 
      error: () => {
        this.spinnerService.hideSpinner(500);

        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(AuthState.errorMsg),
        );
      }
    });
  }

  passwordRecovery(email: string) {
    this.spinnerService.showSpinner();

    this.store.dispatch(new RequestPassword({ email: email })).pipe(first()).subscribe({
      next: () => {
        const success = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.spinnerService.hideSpinner(500);
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(AuthState.errorMsg),
          );
          return;
        }

        this.sendPasswordRecoveryEmail(email, false);
      }, error: () => {
        this.spinnerService.hideSpinner(500);
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(AuthState.errorMsg),
        );
      }
    });
  }

  sendPasswordRecoveryEmail(email: string, showSpinner: boolean = true) {
    if (showSpinner) {
      this.spinnerService.showSpinner();
    }

    this.store.dispatch(new SendReoveryPasswordEmail({ 
      sendRecoveryPassword: { 
        email: email, 
        appHost: environment.hostname, 
        appPort: Number.parseInt(environment.port),
        tokenExpiration: Number.parseInt(this.configService.getData(CONFIG_CONSTANTS.PWD_RECOVERY_EXPIRE)) || 30,
      } 
    })).subscribe({
      next: () =>  {
        this.spinnerService.hideSpinner(500);

        const success = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(AuthState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(AuthState.successMsg),
        );
        this.onCloseModal();
      },
      error: () => {
        this.spinnerService.hideSpinner(500);
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(AuthState.errorMsg),
        );
      }
    })
  }

  /* Login Component Functions */
  onConfirmButton($event: ILogin) {
    this.validateFormValues($event);
    if (this.formErrors && this.formErrors.length > 0) {
      return;
    }

    this.login($event);
  }

  onPwdRecovery() {
    this.formErrorsModal = [];
    this.modalService.open("auth-pwd-recovery");
  }

  onRegisterUser() {
    this.router.navigateByUrl("register");
  }

  /* Modal Pwd Recovery Functions */
  onCloseModal() {
    this.modalService.close("auth-pwd-recovery");
  }

  onConfirmModal() {
    const formValue: any = this.recoveryPasswordForm.value;
    this.validatePasswordRecoveryValues(formValue.email);
    if (this.formErrorsModal && this.formErrorsModal.length > 0) {
      return;
    }

    this.passwordRecovery(formValue.email);
  }

  /* Form Functions */
  private validateFormValues(iLogin: ILogin) {
    this.formErrors = [];

    if (!iLogin.name) {
      this.formErrors.push({ 
        formControlName: 'name', 
        error: this.translateService.getTranslate('label.validation.login.name'),
      });
    }

    if (iLogin.name && iLogin.name.length < 4) {
      this.formErrors.push({ 
        formControlName: 'name', 
        error: this.translateService.getTranslate('label.validation.login.name.min.length'),
      });
    }

    if (iLogin.name && iLogin.name.includes('@')) {
      if (iLogin.name && !VALIDATION_PATTERNS_CONSTANTS.EMAIL.PATTERN.test(iLogin.name)) {
        this.formErrorsModal.push({ 
          formControlName: 'name', 
          error: VALIDATION_PATTERNS_CONSTANTS.EMAIL.ERROR,
        });
      }
    }

    if (!iLogin.password) {
      this.formErrors.push({ 
        formControlName: 'password', 
        error: this.translateService.getTranslate('label.validation.login.password'),
      });
    }

    if (iLogin.password && iLogin.password.length < 8) {
      this.formErrors.push({ 
        formControlName: 'password', 
        error: this.translateService.getTranslate('label.validation.login.password.min.length'),
      });
    }
  }

  private validatePasswordRecoveryValues(email: string) {
    this.formErrorsModal = [];

    if (!email) {
      this.formErrorsModal.push({ 
        formControlName: 'email', 
        error: this.translateService.getTranslate('label.validation.user.email'),
      });
    }

    if (email && !VALIDATION_PATTERNS_CONSTANTS.EMAIL.PATTERN.test(email)) {
      this.formErrorsModal.push({ 
        formControlName: 'email', 
        error: VALIDATION_PATTERNS_CONSTANTS.EMAIL.ERROR,
      });
    }

    this.recoveryPasswordForm = this.formErrorsService.setErrors(this.recoveryPasswordForm, this.formErrorsModal);
  }
}
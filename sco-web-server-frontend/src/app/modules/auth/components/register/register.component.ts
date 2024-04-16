import { VALIDATION_PATTERNS_CONSTANTS } from './../../../../constants/validation-patterns.constants';
import { ROLES_CONSTANTS } from '../../../../constants/roles.constants';
import { Role } from '../../../roles/model/role';
import { ScoCacheService, ScoConfigService, ScoConstantsService, ScoDisplayResize, ScoFormError, ScoFormErrorsService, ScoSpinnerService, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { User } from '../../../users/model/user';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { RegisterUser, SendActiveUserEmail } from '../../store/auth.actions';
import { AuthState } from '../../store/auth.state';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import environment from 'src/environments/environment';
import { CACHE_CONSTANTS } from 'src/app/constants/cache.constants';
import { CONFIG_CONSTANTS } from 'src/app/constants/config.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public CACHE_CONSTANTS = CACHE_CONSTANTS;

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  public registerForm: FormGroup;
  public formErrors: ScoFormError[];

  public type_input_pwd: string;
  public type_input_pwd_confirm: string;

  constructor(
    public readonly constantsService: ScoConstantsService,
    public readonly translateService: ScoTranslateService,
    public readonly cacheService: ScoCacheService,
    private readonly configService: ScoConfigService,
    private readonly formErrorsService: ScoFormErrorsService,
    private readonly spinnerService: ScoSpinnerService,
    private readonly toastService: ScoToastService,
    private readonly store: Store,
    private readonly router: Router
  ) {
    this.cacheService.setElement(CACHE_CONSTANTS.TITLE, this.translateService.getTranslate('label.register.component.cache.title'));

    this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
      this.scoDisplayResize = scoDisplayResize;
    });
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
    this.formErrors = [];

    this.type_input_pwd = "password";
    this.type_input_pwd_confirm = "password";
  }

  /* Store Functions */
  createUser(user: User){  
    this.spinnerService.showSpinner();

    this.store.dispatch(new RegisterUser({ user: user })).subscribe({
      next: () => {
        const success = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.spinnerService.hideSpinner(500);
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(AuthState.errorMsg)
          );
          return;
        }

        if (this.configService.getData(CONFIG_CONSTANTS.NEW_USER_ACTIVED)) { 
          this.spinnerService.hideSpinner(500);
          this.toastService.addSuccessMessage(
            this.translateService.getTranslate('label.success'),
            this.store.selectSnapshot(AuthState.successMsg)
          );

          this.onClickCancelForm();
          this.router.navigateByUrl("login");
          return;
        }

        this.sendActivationUserEmail(user, false);
      },
      error: (err) => {
        this.spinnerService.hideSpinner(500);
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(AuthState.errorMsg)
        );
      }
    });
  }

  sendActivationUserEmail(user: User, showSpinner: boolean) {
    if (showSpinner) {
      this.spinnerService.showSpinner();
    }

    this.store.dispatch(new SendActiveUserEmail({ 
      sendActivationUser: { 
        user: user, 
        appHost: environment.hostname, 
        appPort: Number.parseInt(environment.port) 
      } 
    })).subscribe({ 
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success = this.store.selectSnapshot(AuthState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(AuthState.errorMsg)
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(AuthState.successMsg)
        );

        this.onClickCancelForm();
        this.router.navigateByUrl("login");
        return;
      },
      error: () => {
        this.spinnerService.hideSpinner(500);
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(AuthState.errorMsg)
        );
      }
    });
  }

  /* Form Actions */
  onClickCancelForm() {
    this.registerForm = this.formErrorsService.cleanErrors(this.registerForm);
  }

  onClickSubmitForm() {
    const user: User = this.registerForm.value;
    this.validateFormValues(user);
    if (this.formErrors && this.formErrors.length > 0) {
      return;
    }

    user.role = new Role(ROLES_CONSTANTS.USER.NAME);
    user.active = this.configService.getData(CONFIG_CONSTANTS.NEW_USER_ACTIVED) ? true : false;

    this.createUser(user);
  }

  onClickGoLogin() {
    this.router.navigateByUrl('login');
  }

  private validateFormValues(user: User) {
    this.formErrors = [];

    if (!user.name) {
      this.formErrors.push({ 
        formControlName: 'name', 
        error: this.translateService.getTranslate('label.validation.user.name'),
      });
    } else {
      if (user.name.length < 4) {
        this.formErrors.push({ 
          formControlName: 'name', 
          error: this.translateService.getTranslate('label.validation.user.name.min.length'),
        });
      }

      if (user.name.length > 15) {
        this.formErrors.push({ 
          formControlName: 'name', 
          error: this.translateService.getTranslate('label.validation.user.name.max.length'),
        });
      }
    }

    if (!user.email) {
      this.formErrors.push({ 
        formControlName: 'email', 
        error: this.translateService.getTranslate('label.validation.user.email'),
      });
    } else {
      if (!VALIDATION_PATTERNS_CONSTANTS.EMAIL.PATTERN.test(user.email)) {
        this.formErrors.push({ 
          formControlName: 'email', 
          error: this.translateService.getTranslate(VALIDATION_PATTERNS_CONSTANTS.EMAIL.ERROR),
        });
      }
    }

    if (!user.password) {
      this.formErrors.push({ 
        formControlName: 'password', 
        error: this.translateService.getTranslate('label.validation.user.password'),
      });
    } else {
      if (user.password.length < 8) {
        this.formErrors.push({ 
          formControlName: 'password', 
          error: this.translateService.getTranslate('label.validation.user.password.min.length'),
        });
      }

      if (!VALIDATION_PATTERNS_CONSTANTS.PASSWORD.PATTERN.test(user.password)) {
        this.formErrors.push({ 
          formControlName: 'password', 
          error: this.translateService.getTranslate(VALIDATION_PATTERNS_CONSTANTS.PASSWORD.ERROR),
        });
      }
    }

    if (!user.newPassword) {
      this.formErrors.push({ 
        formControlName: 'newPassword', 
        error: this.translateService.getTranslate('label.validation.user.newPassword'),
      });
    } else {
      if (user.newPassword.length < 8) {
        this.formErrors.push({ 
          formControlName: 'newPassword', 
          error: this.translateService.getTranslate('label.validation.user.newPassword.min.length'),
        });
      }

      if (!VALIDATION_PATTERNS_CONSTANTS.PASSWORD.PATTERN.test(user.newPassword)) {
        this.formErrors.push({ 
          formControlName: 'newPassword', 
          error: this.translateService.getTranslate(VALIDATION_PATTERNS_CONSTANTS.PASSWORD.ERROR),
        });
      }

      if (user.password != user.newPassword) {
        this.formErrors.push({ 
          formControlName: 'newPassword', 
          error: this.translateService.getTranslate('label.validation.user.newPassword.not.equals'),
        });
      }
    }

    this.registerForm = this.formErrorsService.setErrors(this.registerForm, this.formErrors);
  }
}

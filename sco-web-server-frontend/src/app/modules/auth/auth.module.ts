import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth.state';
import { ScoAngularComponentsModule } from 'sco-angular-components';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoAngularComponentsModule,
    SharedModule,
    NgxsModule.forFeature(
      [
        AuthState
      ]
    )
  ],
  declarations: [
    AuthComponent,
    LogoutComponent,
    PasswordRecoveryComponent,
    RegisterComponent,
    ConfirmEmailComponent,
  ],
  exports: [
    AuthComponent,
    LogoutComponent,
    PasswordRecoveryComponent,
    RegisterComponent,
    ConfirmEmailComponent,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './modules/options/options.component';
import { LogoutComponent } from './modules/auth/components/logout/logout.component';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { PasswordRecoveryComponent } from './modules/auth/components/password-recovery/password-recovery.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { ConfirmEmailComponent } from './modules/auth/components/confirm-email/confirm-email.component';
import { ResumeComponent } from './modules/resume/resume.component';
import { AuthGuard } from './guards/auth.guard.service';
import { PermissionsComponent } from './modules/permissions/components/permissions/permissions.component';
import { AdminGuard } from './guards/admin.guard.service';
import { RolesComponent } from './modules/roles/components/roles/roles.component';
import { UsersComponent } from './modules/users/components/users/users.component';
import { PdfExampleComponent } from './modules/pdf-example/pdf-example.component';

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'reset-password/:pwdRecovery',
    component: PasswordRecoveryComponent,
  },
  {
    path: 'confirm-email/:email',
    component: ConfirmEmailComponent,
  },
  
  {
    path: 'options',
    component: OptionsComponent,
  },
  
  {
    path: 'resume',
    component: ResumeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: 'pdf-example',
    component: PdfExampleComponent,
    canActivate: [AuthGuard],
  },
  
  //
  { path: '', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

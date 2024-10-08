import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './modules/auth/components/logout/logout.component';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { PasswordRecoveryComponent } from './modules/auth/components/password-recovery/password-recovery.component';
import { ConfirmEmailComponent } from './modules/auth/components/confirm-email/confirm-email.component';
import { AuthGuard } from './guards/auth.guard.service';
import { PermissionsComponent } from './modules/permissions/components/permissions/permissions.component';
import { AdminGuard } from './guards/admin.guard.service';
import { RolesComponent } from './modules/roles/components/roles/roles.component';
import { UsersComponent } from './modules/users/components/users/users.component';
import { NodeServerComponent } from './modules/node-server/components/node-server/node-server.component';
import { SuperAdminGuard } from './guards/superadmin.guard.service';

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
    path: 'reset-password/:pwdRecovery',
    component: PasswordRecoveryComponent,
  },
  {
    path: 'confirm-email/:email',
    component: ConfirmEmailComponent,
  },

  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [AuthGuard, AdminGuard, SuperAdminGuard],
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuard, AdminGuard, SuperAdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },

  {
    path: '',
    component: NodeServerComponent,
    canActivate: [AuthGuard],
  },
  
  //
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

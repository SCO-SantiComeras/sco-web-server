import { HttpErrorsService } from './../../shared/http-error/http-errors.service';
import { ScoTranslateService } from 'sco-angular-components';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map, tap } from 'rxjs/operators';
import { Role } from '../model/role';
import { RolesService } from '../roles.service';
import { CreateRole, DeleteRole, FetchRoles, SubscribeRoleWS, UnSubscribeRoleWS, UpdateRole } from './roles.actions';

export class RoleStateModel {
    roles: Role[];
    role: Role;
    success: boolean;
    notifyChangeRoles:boolean;
    errorMsg: string;
    successMsg: string;
}
  
export const RoleStateDefaults: RoleStateModel = {
    roles: [],
    role: undefined,
    success: false,
    notifyChangeRoles:false,
    errorMsg: '',
    successMsg: '',
};

@State<RoleStateModel>({
    name: 'roles',
    defaults: RoleStateDefaults,
})

@Injectable()
export class RoleState {

  constructor(
    private readonly roleService: RolesService,
    private readonly translateService: ScoTranslateService,
    private readonly httpErrorsService: HttpErrorsService,
  ) {}

  @Selector()
  static roles(state: RoleStateModel): Role[] {
    return state.roles;
  }

  @Selector()
  static role(state: RoleStateModel): Role {
    return state.role;
  }

  @Selector()
  static success(state: RoleStateModel): boolean {
    return state.success;
  }
  @Selector()
  static notifyChangeRoles(state: RoleStateModel): boolean {
    return state.notifyChangeRoles;
  }

  @Selector()
  static errorMsg(state: RoleStateModel): string {
    return state.errorMsg;
  }

  @Selector()
  static successMsg(state: RoleStateModel): string {
    return state.successMsg;
  }

  @Action(FetchRoles)
  public fetchRoles(
    { patchState }: StateContext<RoleStateModel>,
    { payload }: FetchRoles
  ) {
    return this.roleService.fetchRoles(payload.filter).pipe(
      map((roles: Role[]) => {
        if (roles) {
          patchState({
            roles: roles
          });
        } else {
          patchState({
            roles: []
          });
        }
      })
    );
  }

  @Action(CreateRole)
  public createRole(
    { patchState }: StateContext<RoleStateModel>,
    { payload }: CreateRole
  ) {
    return this.roleService.createRole(payload.role).pipe(
      tap((role: Role) => {
        if (role) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.roles.state.create.success'),
            role: role,
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.roles.state.create.error'),
            role: undefined,
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.roles.state.create.error');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
          role: undefined,
        });
        throw new Error(error);
      })
    );
  }

  @Action(UpdateRole)
  public updateRole(
    { patchState }: StateContext<RoleStateModel>,
    { payload }: UpdateRole
  ) {
    return this.roleService.updateRole(payload._id, payload.role).pipe(
      tap((role: Role) => {
        if (role) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.roles.state.update.success'),
            role: role,
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.roles.state.update.error'),
            role: undefined,
          });
        }
        }),
        catchError((error) => {
          let errorMsg: string = this.translateService.getTranslate('label.roles.state.update.error');
          if (this.httpErrorsService.getErrorMessage(error.error.message)) {
            errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
          }

          patchState({
            success: false,
            errorMsg: errorMsg,
            role: undefined,
          });
          throw new Error(error);
        }
      )
    );
  }

  @Action(DeleteRole)
  public deleteRole( 
    { patchState }: StateContext<RoleStateModel>,
    { payload }: DeleteRole
  ) {
    return this.roleService.deleteRole(payload._id).pipe(
      tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.roles.state.delete.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.roles.state.delete.error'),
          });
        }
        }),
        catchError((error) => {
          let errorMsg: string = this.translateService.getTranslate('label.roles.state.delete.error');
          if (this.httpErrorsService.getErrorMessage(error.error.message)) {
            errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
          }

          patchState({
            success: false,
            errorMsg: errorMsg,
          });
          throw new Error(error);
        }
      )
    );
  }

  /* Web Sockets */
  @Action(SubscribeRoleWS)
  public suscribeRoleWS(ctx: StateContext<RoleStateModel>) {
    return this.roleService.getRoleBySocket().pipe(
      map((change: boolean) => {
        if (change) {
          let state = ctx.getState();

          state = {
            ...state,
            notifyChangeRoles : !state.notifyChangeRoles,
          };

          ctx.setState({
            ...state,
          });
        }
      })
    )
  }

  @Action(UnSubscribeRoleWS)
  public unsuscribeRoleWS(ctx: StateContext<RoleStateModel>) {
    this.roleService.removeSocket();
  }
}
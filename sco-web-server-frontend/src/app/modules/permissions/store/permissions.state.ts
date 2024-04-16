import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, map, tap } from "rxjs/operators";
import { Permission } from "../model/permission";
import { PermissionsService } from "../permissions.service";
import { CreatePermission, DeletePermission, EditPermission, FetchPermissions, SubscribePermissionsWS, UnSubscribePermissionsWS } from "./permissions.actions";
import { ScoTranslateService } from "sco-angular-components";
import { HttpErrorsService } from "../../shared/http-error/http-errors.service";

export class PermissionsStateModel {
  permissions: Permission[];
  permission: Permission;
  success: boolean;
  notifyChangePermissions: boolean;
  errorMsg: string;
  successMsg: string;
}

export const PermissionsStateDefault: PermissionsStateModel = {
  permissions: [],
  permission: undefined,
  success: false,
  notifyChangePermissions: false,
  errorMsg: '',
  successMsg: '',
};

@State<PermissionsStateModel>({
  name: "permissions",
  defaults: PermissionsStateDefault,
})

@Injectable()
export class PermissionsState {

  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly translateService: ScoTranslateService,
    private readonly httpErrorsService: HttpErrorsService,
  ) {}

  @Selector()
  static permissions(state: PermissionsStateModel): Permission[] {
    return state.permissions;
  }

  @Selector()
  static permission(state: PermissionsStateModel): Permission {
    return state.permission;
  }

  @Selector()
  static success(state: PermissionsStateModel): boolean {
    return state.success;
  }
  @Selector()
  static notifyChangePermissions(state: PermissionsStateModel): boolean {
    return state.notifyChangePermissions;
  }

  @Selector()
  static errorMsg(state: PermissionsStateModel): string {
    return state.errorMsg;
  }

  @Selector()
  static successMsg(state: PermissionsStateModel): string {
    return state.successMsg;
  }
  
  @Action(FetchPermissions)
  public fetchPermissions (
    { patchState }: StateContext<PermissionsStateModel>,
    { payload }: FetchPermissions
  ) {
    return this.permissionsService.fetchPermissions(payload.filter).pipe(
      map((permissions: Permission[]) => {
        if (permissions) {
          patchState({
            permissions: permissions
          });
        } else {
          patchState({
            permissions: []
          });
        }
      })
    );
  }

  @Action(CreatePermission)
  public createPermission(
    { patchState }: StateContext<PermissionsStateModel>,
    { payload }: CreatePermission
  ) {
    return this.permissionsService.createPermission(payload.permission).pipe(
      tap((permission: Permission) => {
        if (permission) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.permissions.state.create.success'),
            permission: permission,
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.permissions.state.create.error'),
            permission: undefined,
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.permissions.state.create.error');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
            errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
            success: false,
            errorMsg: errorMsg,
            permission: undefined,
        });
        throw new Error(error);
      })
    );
  }

  @Action(EditPermission)
  public editPermission(
    { patchState }: StateContext<PermissionsStateModel>,
    { payload }: EditPermission
  ) {
    return this.permissionsService
      .editPermission(payload._id, payload.permission)
      .pipe(
        tap((permission: Permission) => {
          if (permission) {
            patchState({
              success: true,
              successMsg: this.translateService.getTranslate('label.permissions.state.update.success'),
              permission: permission,
            });
          } else {
            patchState({
              success: false,
              errorMsg: this.translateService.getTranslate('label.permissions.state.update.error'),
              permission: undefined,
            });
          }
        }),
        catchError((error) => {
          let errorMsg: string = this.translateService.getTranslate('label.permissions.state.update.error');
          if (this.httpErrorsService.getErrorMessage(error.error.message)) {
              errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
          }

          patchState({
              success: false,
              errorMsg: errorMsg,
              permission: undefined,
          });
          throw new Error(error);
        })
      );
  }

  @Action(DeletePermission)
  deletePermission(
    { patchState }: StateContext<PermissionsStateModel>,
    { payload }: DeletePermission
  ) {
    return this.permissionsService.deletePermission(payload._id)
      .pipe(tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.permissions.state.delete.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.permissions.state.delete.error'),
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.permissions.state.delete.error');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
        });
        throw new Error(error);
    }));
  }

  /* Web sockets */
  @Action(SubscribePermissionsWS)
  public suscribePermissionsWS(ctx: StateContext<PermissionsStateModel>) {
    return this.permissionsService.getPermissionsBySocket().pipe(
      map((change: boolean) => {
        if(change){
          let state = ctx.getState();

          state = {
            ...state,
            notifyChangePermissions: !state.notifyChangePermissions,
          };

          ctx.setState({
            ...state,
          });
        }
      })
    )
  }

  @Action(UnSubscribePermissionsWS)
  public unsuscribePermissionsWS(ctx: StateContext<PermissionsStateModel>) {
    this.permissionsService.removeSocket();
  }
}


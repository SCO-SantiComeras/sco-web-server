import { VALIDATION_PATTERNS_CONSTANTS } from './../../../../constants/validation-patterns.constants';
import { Role } from './../../../roles/model/role';
import { cloneDeep } from 'lodash-es';
import { ExcelState } from './../../../excel/store/excel.state';
import { CreateExcelFile } from './../../../excel/store/excel.actions';
import { Excel, ExcelExtensionEnum } from 'src/app/modules/excel/model/excel';
import { UtilsService } from 'src/app/modules/shared/utils/utils.service';
import { AppState } from './../../../../store/app.state';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from 'rxjs';
import { ScoAction, ScoBlockItem, ScoCallback, ScoConstantsService, ScoDisplayResize, ScoFormError, ScoFormErrorsService, ScoSelectItem, ScoSelectedItem, ScoSpinnerService, ScoTableCol, ScoTableItem, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { UsersState } from '../../store/users.state';
import { User } from '../../model/user';
import { UserFilter } from '../../model/user-filter';
import { CreateUser, DeleteUser, FetchUsers, SubscribeUserWS, UnSubscribeUserWS, UpdateUser } from '../../store/users.actions';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { RoleState } from 'src/app/modules/roles/store/roles.state';
import { FetchRoles, SubscribeRoleWS, UnSubscribeRoleWS } from 'src/app/modules/roles/store/roles.actions';
import { CONFIG_CONSTANTS } from 'src/app/constants/config.constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class UsersComponent implements OnInit, OnDestroy {
  
  public CONFIG_CONSTANTS = CONFIG_CONSTANTS;

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  private subManager: Subscription;
  @Select(UsersState.users)
  users$: Observable<User[]>;
  @Select(UsersState.notifyChangeUsers)
  notifyChangeUsers$: Observable<boolean>;

  @Select(RoleState.roles)
  roles$: Observable<Role[]>;
  @Select(RoleState.notifyChangeRoles)
  notifyChangeRoles$: Observable<boolean>;
  public roleFilterOptions: ScoSelectItem<Role>[];
  public roleOptions: ScoSelectItem<Role>[];

  public cols: ScoTableCol[]; // Lista de columnas de la tabla
  public tableItems: ScoTableItem<User>[]; // Lista para almacenar los items creados para la tabla
  public blockItems: ScoBlockItem<User>[]; // Lista para almacenar los items creados para el block list
  public elementSelected: User; // Objeto para almacenar el elemento seleccionado en las acciones de la tabla / block list
  public filter: UserFilter; // Objeto para filtrar la búsqueda de permisos
  public formErrors: ScoFormError[]; // Errores del fomulario
  public mode: string; // Indicador para el formulario new/update del formulario

  public setRoleDropdown: ScoSelectItem<Role>;
  public updatePassword: boolean;
  public showPasswordInput: boolean;
  public showConfirmInput: boolean;

  constructor(
    public readonly formErrorsService: ScoFormErrorsService,
    public readonly constantsService: ScoConstantsService,
    private readonly translateService: ScoTranslateService,
    private readonly toastService: ScoToastService,
    public readonly utilsService: UtilsService,
    private readonly spinnerService: ScoSpinnerService,
    private readonly store: Store,
  ) { 
    this.subManager = new Subscription();

    this.roleFilterOptions = [];
    this.roleOptions = [];

    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
    this.cols = [
      {label: this.translateService.getTranslate('label.id'), property: "_id"},
      {label: this.translateService.getTranslate('label.users.component.input.name'), property: "name"},
      {label: this.translateService.getTranslate('label.users.component.input.email'), property: "email"},
      {label: this.translateService.getTranslate('label.users.component.input.active'), property: "active"},
      {label: this.translateService.getTranslate('label.users.component.input.role'), property: "role"},
    ];
    this.tableItems = [];
    this.blockItems = [];
    this.elementSelected = undefined;
    this.filter = new UserFilter();
    this.formErrors = [];

    this.updatePassword = false;

    this.showPasswordInput = false;
    this.showConfirmInput = false;

    this.subManager.add(this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
        this.scoDisplayResize = scoDisplayResize;
      },
    ));
  }

  /* Angular Flow Functions */
  ngOnDestroy(): void {
    this.store.dispatch(new UnSubscribeUserWS());
    this.store.dispatch(new UnSubscribeRoleWS());
    this.subManager.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.notifyChangeUsers();

    this.fetchRoles();
    this.notifyChangeRoles(); 
  }

  /* Store Functions */
  notifyChangeUsers(){
    this.store.dispatch(new SubscribeUserWS());
    this.subManager.add(this.notifyChangeUsers$.subscribe({
      next: () => {
        this.store.dispatch(new FetchUsers({ filter: this.filter }))
      }
    }));
  }

  fetchUsers() {
    this.spinnerService.showSpinner();
    this.subManager.add(this.users$.subscribe({
      next: () => {
        this.blockItems = [];
        this.tableItems = [];

        if (
          this.store.selectSnapshot(UsersState.users) 
          && this.store.selectSnapshot(UsersState.users).length > 0
        ) {
          this.createItems(this.store.selectSnapshot(UsersState.users));
          return;
        }

        this.spinnerService.hideSpinner(500);
      },
      error: () => {
        this.spinnerService.hideSpinner(500);
      },
    }));
  }

  createUser($ev: ScoCallback<User>) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new CreateUser({ user: $ev.item })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(UsersState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(UsersState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(UsersState.successMsg),
        );

        this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
        this.updatePassword = false;
        this.showPasswordInput = false;
        this.showConfirmInput = false;
        $ev.callBack();
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(UsersState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  updateUser(_id: string, $ev: ScoCallback<User>) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new UpdateUser({ _id: _id, user: $ev.item })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(UsersState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(UsersState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(UsersState.successMsg),
        );

        this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
        this.updatePassword = false;
        this.showPasswordInput = false;
        this.showConfirmInput = false;
        $ev.callBack();
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(UsersState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  deleteUser($ev: User) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new DeleteUser({ _id: $ev._id })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(UsersState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(UsersState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(UsersState.successMsg),
        );
      },
      error: (err) => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(UsersState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  notifyChangeRoles(){
    this.store.dispatch(new SubscribeRoleWS());
    this.subManager.add(this.notifyChangeRoles$.subscribe({
      next: () => {
        this.store.dispatch(new FetchRoles({ filter: undefined }))
      }
    }));
  }

  fetchRoles() {
    this.subManager.add(this.roles$.subscribe({
      next: () => {
        this.roleOptions = [];
        this.roleFilterOptions = [];

        if (
          this.store.selectSnapshot(RoleState.roles) 
          && this.store.selectSnapshot(RoleState.roles).length > 0
        ) {

          this.roleFilterOptions.push({
            label: this.translateService.getTranslate('label.all'), value: undefined,
          })

          for (const role of this.store.selectSnapshot(RoleState.roles)) {
            this.roleFilterOptions.push({ label: cloneDeep(role.name), value: cloneDeep(role) });
          }

          this.roleOptions = cloneDeep(this.utilsService.getArrayFromPosition(this.roleFilterOptions, 1));
          return;
        }
      },
      error: () => {
        this.roleOptions = [];
        this.roleFilterOptions = [];
      },
    }));
  }

  /* Filter functions */
  search() {
    this.store.dispatch(new FetchUsers({ filter: this.filter }));
  }

  clearFilter() {
    this.filter = new UserFilter();
    this.search();
  }

  /* Form Crud */
  onDownloadExcel($event: boolean) {
    if (!this.tableItems || (this.tableItems && this.tableItems.length == 0)  || !$event) {
      return;
    }

    const users: User[] = this.tableItems.map((data) => {
      return data.item;
    });

    // Create Excel Dto For Transfer To Backend
    const excelDto: Excel = {
      columns: [
        this.translateService.getTranslate('label.id'), 
        this.translateService.getTranslate('label.users.component.input.name'),
        this.translateService.getTranslate('label.users.component.input.email'),
        this.translateService.getTranslate('label.users.component.input.active'),
        this.translateService.getTranslate('label.users.component.input.role'),
        this.translateService.getTranslate('label.users.component.input.pwdRecoveryToken'),
        this.translateService.getTranslate('label.users.component.input.pwdRecoveryDate'),
        this.translateService.getTranslate('label.created.at'),
        this.translateService.getTranslate('label.updated.at')
      ],
      data: users.map((data) => {
        return [
          data._id ? data._id : '--',
          data.name ? data.name : '--',
          data.email ? data.email : '--',
          data.active ? this.translateService.getTranslate('label.yes') : this.translateService.getTranslate('label.no'),
          data.role ? data.role.name : '--',
          data.pwdRecoveryToken ? data.pwdRecoveryToken : '--',
          data.pwdRecoveryDate ? moment(data.pwdRecoveryDate).format('DD/MM/yyyy HH:mm:ss') : '--',
          data.createdAt ? moment(data.createdAt).format('DD/MM/yyyy HH:mm:ss') : '--',
          data.updatedAt ? moment(data.updatedAt).format('DD/MM/yyyy HH:mm:ss') : '--',
        ]
      }),
      workbook: XLSX.utils.book_new(),
      extension: ExcelExtensionEnum.XLSX,
      fileName: `users-${moment(new Date()).format('DD_MM_yyyy')}`
    };

    // Dispatch Generate Excel File Action
    this.store.dispatch(new CreateExcelFile({ excel: excelDto })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(ExcelState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(ExcelState.errorMsg)
          );
          return;
        }

        const generatedFile: any = this.store.selectSnapshot(ExcelState.generatedFile);
        if (!generatedFile) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(ExcelState.errorMsg)
          );
          return;
        }

        if (!this.utilsService.downloadExcelFile(generatedFile, excelDto.fileName)) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(ExcelState.errorMsg)
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(ExcelState.successMsg)
        );
      },
      error: (err) => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(ExcelState.errorMsg)
        );
      }
    });
  }

  onItemSelected($event: ScoSelectedItem<User>) {

  }

  onActionSelected($event: ScoAction<User>) {
    this.elementSelected = cloneDeep($event.item);

    if ($event.value == this.constantsService.ScoFormCrudConstants.UPDATE_ACTION) {
      this.mode = this.constantsService.ScoFormCrudConstants.MODE_UPDATE;
      this.setRoleDropdown = this.roleOptions.find(o => o.value.name == $event.item.role.name);
    }

    if ($event.value == this.constantsService.ScoFormCrudConstants.DELETE_ACTION) {

    }
    
  }

  onChangePage($event: number) {

  }

  onCloseOptions($event: MouseEvent) {

  }

  onGoToCreate($event: User) {
    this.formErrors = [];
    this.elementSelected = $event;
    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
  }

  onFormCancel($event: User) {
    this.elementSelected = $event;
    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
    this.updatePassword = false;
    this.showPasswordInput = false;
    this.showConfirmInput = false;
  }

  onFormConfirm($event: ScoCallback<User>) {
    if ($event.item.active == undefined) $event.item.active = false;
    
    if (!this.validateDetailFormFields($event.item)) return;

    if (this.mode != this.constantsService.ScoFormCrudConstants.MODE_UPDATE) {
      this.createUser($event);
    } else {
      this.updateUser(this.elementSelected._id, $event);
    }
  }

  onFormClose($event: User) {
    this.elementSelected = $event;
    this.updatePassword = false;
    this.showPasswordInput = false;
    this.showConfirmInput = false;
  }

  onConfirmDeleteModal($event: boolean) {
    if (!$event) return;

    this.deleteUser(cloneDeep(this.elementSelected));
    this.elementSelected = new User();
  }

  onCloseDeleteModal($event: boolean) {
    if (!$event) return;

    this.elementSelected = new User();
  }

  private createItems(users: User[]) {
    if (!users || (users && users.length == 0)) {
      if (this.spinnerService.show) {
        this.spinnerService.hideSpinner(500);
      }
      return;
    }

    for (const user of users) {
      const actions: ScoAction<User>[] = [
        {
          label: this.translateService.getTranslate('label.actions.update'),
          value: this.constantsService.ScoFormCrudConstants.UPDATE_ACTION,
          icon : 'fa fa-edit'
        },
        {
          label: this.translateService.getTranslate('label.actions.delete'),
          value : this.constantsService.ScoFormCrudConstants.DELETE_ACTION,
          icon: 'fa fa-trash'
        }
      ];

      this.blockItems.push({
        item: user,
        actions: actions,
      });

      this.tableItems.push({
        item: user,
        actions: actions,
        index: users.indexOf(user),
      });
    }

    this.spinnerService.hideSpinner(500);
  }
  
  private validateDetailFormFields(user: User): boolean {
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

    if (!user.role) {
      this.formErrors.push({ 
        formControlName: 'role', 
        error: this.translateService.getTranslate('label.validation.user.role'),
      });
    }

    if (!user.password && 
      ( 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_NEW || 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_UPDATE && 
        this.updatePassword
      )
    ) {
      this.formErrors.push({ 
        formControlName: 'password', 
        error: this.translateService.getTranslate('label.validation.user.password'),
      });
    } else if(user.password && 
      ( 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_NEW || 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_UPDATE && 
        this.updatePassword
      )) {
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

    if (!user.newPassword && 
      ( 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_NEW || 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_UPDATE && 
        this.updatePassword
      )
    ) {
      this.formErrors.push({ 
        formControlName: 'newPassword', 
        error: this.translateService.getTranslate('label.validation.user.newPassword'),
      });
    } else if (user.newPassword && 
      ( 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_NEW || 
        this.mode == this.constantsService.ScoFormCrudConstants.MODE_UPDATE && 
        this.updatePassword
      )) {
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

    if (this.formErrors && this.formErrors.length > 0) {
      return false;
    }

    return true;
  }
}

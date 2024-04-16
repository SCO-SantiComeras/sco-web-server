import { FetchPermissions, SubscribePermissionsWS, UnSubscribePermissionsWS } from './../../../permissions/store/permissions.actions';
import { cloneDeep } from 'lodash-es';
import { ExcelState } from './../../../excel/store/excel.state';
import { CreateExcelFile } from './../../../excel/store/excel.actions';
import { Excel, ExcelExtensionEnum } from 'src/app/modules/excel/model/excel';
import { UtilsService } from 'src/app/modules/shared/utils/utils.service';
import { AppState } from './../../../../store/app.state';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { ScoAction, ScoBlockItem, ScoCallback, ScoConstantsService, ScoDisplayResize, ScoFormError, ScoFormErrorsService, ScoJoinPipe, ScoSelectItem, ScoSelectedItem, ScoSpinnerService, ScoTableCol, ScoTableItem, ScoToastService, ScoTranslateService } from "sco-angular-components";
import { RoleState } from '../../store/roles.state';
import { Role } from '../../model/role';
import { RoleFilter } from '../../model/role-filter';
import { CreateRole, DeleteRole, FetchRoles, SubscribeRoleWS, UnSubscribeRoleWS, UpdateRole } from '../../store/roles.actions';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { PermissionsState } from '../../../permissions/store/permissions.state';
import { Permission } from 'src/app/modules/permissions/model/permission';
import { CONFIG_CONSTANTS } from 'src/app/constants/config.constants';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class RolesComponent implements OnInit, OnDestroy {

  public CONFIG_CONSTANTS = CONFIG_CONSTANTS;

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  private subManager: Subscription;
  @Select(RoleState.roles)
  roles$: Observable<Role[]>;
  @Select(RoleState.notifyChangeRoles)
  notifyChangeRoles$: Observable<boolean>;

  @Select(PermissionsState.permissions)
  permissions$: Observable<Permission[]>;
  @Select(PermissionsState.notifyChangePermissions)
  notifyChangePermissions$: Observable<boolean>;
  public permissionsItems: ScoSelectItem<Permission>[];
  public selectedPermissions: Permission[];

  public cols: ScoTableCol[]; // Lista de columnas de la tabla
  public tableItems: ScoTableItem<Role>[]; // Lista para almacenar los items creados para la tabla
  public blockItems: ScoBlockItem<Role>[]; // Lista para almacenar los items creados para el block list
  public elementSelected: Role; // Objeto para almacenar el elemento seleccionado en las acciones de la tabla / block list
  public filter: RoleFilter; // Objeto para filtrar la búsqueda de permisos
  public formErrors: ScoFormError[]; // Errores del fomulario
  public mode: string; // Indicador para el formulario new/update del formulario

  constructor(
    public readonly formErrorsService: ScoFormErrorsService,
    public readonly constantsService: ScoConstantsService,
    private readonly translateService: ScoTranslateService,
    private readonly toastService: ScoToastService,
    private readonly utilsService: UtilsService,
    private readonly spinnerService: ScoSpinnerService,
    private readonly store: Store,
    private readonly joinPipe: ScoJoinPipe,
  ) { 
    this.subManager = new Subscription();
    this.permissionsItems = [];
    this.selectedPermissions = [];

    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
    this.cols = [
      {label: this.translateService.getTranslate('label.id'), property: "_id"},
      {label: this.translateService.getTranslate('label.roles.component.input.name'), property: "name"},
      {label: this.translateService.getTranslate('label.roles.component.input.permissions'), property: "permissions"},
    ];
    this.tableItems = [];
    this.blockItems = [];
    this.elementSelected = undefined;
    this.filter = new RoleFilter();
    this.formErrors = [];

    this.subManager.add(this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
        this.scoDisplayResize = scoDisplayResize;
      },
    ));
  }

  /* Angular Flow Functions */
  ngOnDestroy(): void {
    this.store.dispatch(new UnSubscribePermissionsWS());
    this.store.dispatch(new UnSubscribeRoleWS());
    this.subManager.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchRoles();
    this.notifyChangeRoles();

    this.fetchPermissions();
    this.notifyChangePermissions();
  }

  /* Store Functions */
  notifyChangeRoles(){
    this.store.dispatch(new SubscribeRoleWS());
    this.subManager.add(this.notifyChangeRoles$.subscribe({
      next: () => {
        this.store.dispatch(new FetchRoles({ filter: this.filter}))
      }
    }));
  }

  fetchRoles() {
    this.spinnerService.showSpinner();
    this.subManager.add(this.roles$.subscribe({
      next: () => {
        this.blockItems = [];
        this.tableItems = [];

        if (
          this.store.selectSnapshot(RoleState.roles) 
          && this.store.selectSnapshot(RoleState.roles).length > 0
        ) {
          this.createItems(this.store.selectSnapshot(RoleState.roles));
          return;
        }

        this.spinnerService.hideSpinner(500);
      },
      error: () => {
        this.spinnerService.hideSpinner(500);
      },
    }));
  }

  createRole($ev: ScoCallback<Role>) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new CreateRole({ role: $ev.item })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(RoleState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(RoleState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(RoleState.successMsg),
        );

        this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
        $ev.callBack();
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(RoleState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  updateRole(_id: string, $ev: ScoCallback<Role>) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new UpdateRole({ _id: _id, role: $ev.item })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(RoleState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(RoleState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(RoleState.successMsg),
        );

        this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
        $ev.callBack();
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(RoleState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  deleteRole($ev: Role) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new DeleteRole({ _id: $ev._id })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(RoleState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(RoleState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(RoleState.successMsg),
        );
      },
      error: (err) => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(RoleState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  notifyChangePermissions(){
    this.store.dispatch(new SubscribePermissionsWS());
    this.subManager.add(this.notifyChangePermissions$.subscribe({
      next: () => {
        this.store.dispatch(new FetchPermissions({ filter: undefined }))
      }
    }));
  }

  fetchPermissions() {
    this.spinnerService.showSpinner();
    this.subManager.add(this.permissions$.subscribe({
      next: () => {
        this.permissionsItems = [];

        if (
          this.store.selectSnapshot(PermissionsState.permissions) 
          && this.store.selectSnapshot(PermissionsState.permissions).length > 0
        ) {
          for (const permissions of this.store.selectSnapshot(PermissionsState.permissions)) {
            this.permissionsItems.push({
              label: permissions.name,
              value: permissions,
            })
          }
          return;
        }
      },
      error: () => {
      },
    }));
  }

  /* Filter functions */
  search() {
    this.store.dispatch(new FetchRoles({ filter: this.filter }));
  }

  clearFilter() {
    this.filter = new RoleFilter();
    this.search();
  }

  /* Form Crud */
  onDownloadExcel($event: boolean) {
    if (!this.tableItems || (this.tableItems && this.tableItems.length == 0)  || !$event) {
      return;
    }

    const data: Role[] = this.tableItems.map((data) => {
      return data.item;
    });

    // Create Excel Dto For Transfer To Backend
    const excelDto: Excel = {
      columns: [
        this.translateService.getTranslate('label.id'), 
        this.translateService.getTranslate('label.roles.component.input.name'),
        this.translateService.getTranslate('label.roles.component.input.permissions'),
        this.translateService.getTranslate('label.created.at'),
        this.translateService.getTranslate('label.updated.at')
      ],
      data: data.map((data) => {
        return [
          data._id ? data._id : '--',
          data.name ? data.name : '--',
          data.permissions && data.permissions.length > 0 
            ? this.joinPipe.transform(this.getPermissionsOfRole(data), ',') 
            : '--',
          data.createdAt ? moment(data.createdAt).format('DD/MM/yyyy HH:mm:ss') : '--',
          data.updatedAt ? moment(data.updatedAt).format('DD/MM/yyyy HH:mm:ss') : '--',
        ]
      }),
      workbook: XLSX.utils.book_new(),
      extension: ExcelExtensionEnum.XLSX,
      fileName: `roles-${moment(new Date()).format('DD_MM_yyyy')}`
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

  onItemSelected($event: ScoSelectedItem<Role>) {

  }

  onActionSelected($event: ScoAction<Role>) {
    this.elementSelected = $event.item;

    if ($event.value == this.constantsService.ScoFormCrudConstants.UPDATE_ACTION) {
      this.mode = this.constantsService.ScoFormCrudConstants.MODE_UPDATE;
      this.selectedPermissions = cloneDeep(this.elementSelected.permissions);
    }

    if ($event.value == this.constantsService.ScoFormCrudConstants.DELETE_ACTION) {

    }
  }

  onChangePage($event: number) {

  }

  onCloseOptions($event: MouseEvent) {

  }

  onGoToCreate($event: Role) {
    this.formErrors = [];
    this.elementSelected = $event;
    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
    this.selectedPermissions = [];
  }

  onFormCancel($event: Role) {
    this.elementSelected = $event;
    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
  }

  onFormConfirm($event: ScoCallback<Role>) {
    if (!this.validateDetailFormFields($event.item)) return;

    const newRole: Role = cloneDeep($event.item);
    newRole.permissions = this.selectedPermissions;
    $event.item = cloneDeep(newRole);

    if (this.mode != this.constantsService.ScoFormCrudConstants.MODE_UPDATE) {
      this.createRole($event);
    } else {
      this.updateRole(this.elementSelected._id, $event);
    }
  }

  onFormClose($event: Role) {
    this.elementSelected = $event;
  }

  onConfirmDeleteModal($event: boolean) {
    if (!$event) return;

    this.deleteRole(cloneDeep(this.elementSelected));
    this.elementSelected = new Role();
  }

  onCloseDeleteModal($event: boolean) {
    if (!$event) return;

    this.elementSelected = new Role();
  }

  private createItems(items: Role[]) {
    if (!items || (items && items.length == 0)) {
      if (this.spinnerService.show) {
        this.spinnerService.hideSpinner(500);
      }
      return;
    }

    for (const role of items) {
      const actions: ScoAction<Role>[] = [
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
        item: role,
        actions: actions,
      });

      this.tableItems.push({
        item: role,
        actions: actions,
        index: items.indexOf(role),
      });
    }

    this.spinnerService.hideSpinner(500);
  }
  
  private validateDetailFormFields(item: Role): boolean {
    this.formErrors = [];

    if (!item.name) {
      this.formErrors.push({ 
        formControlName: 'name', 
        error: this.translateService.getTranslate('label.validation.role.name'),
      });
    }

    if (this.formErrors && this.formErrors.length > 0) {
      return false;
    }

    return true;
  }

  getPermissionsOfRole(role: Role): string[] {
    const permissions: string[] = [];

    if (role && role.permissions && role.permissions.length > 0) {
      for (const permission of role.permissions) {
        permissions.push(permission.name);
      }
    }

    return permissions;
  }
}
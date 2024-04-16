import { CONFIG_CONSTANTS } from './../../../../constants/config.constants';

import { cloneDeep } from 'lodash-es';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ScoAction, ScoBlockItem, ScoCallback, ScoConstantsService, ScoDisplayResize, ScoFormError, ScoFormErrorsService, ScoSelectedItem, ScoSpinnerService, ScoTableCol, ScoTableItem, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { CreatePermission, DeletePermission, EditPermission, FetchPermissions, SubscribePermissionsWS, UnSubscribePermissionsWS } from '../../store/permissions.actions';
import { PermissionsState } from '../../store/permissions.state';
import { Excel, ExcelExtensionEnum } from '../../../excel/model/excel';
import { CreateExcelFile } from '../../../excel/store/excel.actions';
import { PermissionFilter } from '../../model/permission-filter';
import { UtilsService } from '../../../shared/utils/utils.service';
import { AppState } from './../../../../store/app.state';
import { ExcelState } from './../../../excel/store/excel.state';
import { Permission } from '../../model/permission';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class PermissionsComponent implements OnInit, OnDestroy {

  public CONFIG_CONSTANTS = CONFIG_CONSTANTS;
  
  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  private subManager: Subscription;
  @Select(PermissionsState.permissions)
  permissions$: Observable<Permission[]>;
  @Select(PermissionsState.notifyChangePermissions)
  notifyChangePermission$: Observable<boolean>;

  public cols: ScoTableCol[]; // Lista de columnas de la tabla
  public tableItems: ScoTableItem<Permission>[]; // Lista para almacenar los items creados para la tabla
  public blockItems: ScoBlockItem<Permission>[]; // Lista para almacenar los items creados para el block list
  public elementSelected: Permission; // Objeto para almacenar el elemento seleccionado en las acciones de la tabla / block list
  public filter: PermissionFilter; // Objeto para filtrar la búsqueda de permisos
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
  ) { 
    this.subManager = new Subscription();

    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
    this.cols = [
      {label: this.translateService.getTranslate('label.id'), property: "_id"},
      {label: this.translateService.getTranslate('label.permissions.component.input.name'), property: "name"},
    ];
    this.tableItems = [];
    this.blockItems = [];
    this.elementSelected = undefined;
    this.filter = new PermissionFilter();
    this.formErrors = [];

    this.subManager.add(this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
        this.scoDisplayResize = scoDisplayResize;
      },
    ));
  }

  /* Angular Flow Functions */
  ngOnDestroy(): void {
    this.store.dispatch(new UnSubscribePermissionsWS());
    this.subManager.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchPermissions();
    this.notifyChangePermissions();
  }

  /* Store Functions */
  notifyChangePermissions(){
    this.store.dispatch(new SubscribePermissionsWS());
    this.subManager.add(this.notifyChangePermission$.subscribe({
      next: () => {
        this.store.dispatch(new FetchPermissions({ filter: this.filter}))
      }
    }));
  }

  fetchPermissions() {
    this.spinnerService.showSpinner();
    this.subManager.add(this.permissions$.subscribe({
      next: () => {
        this.blockItems = [];
        this.tableItems = [];

        if (
          this.store.selectSnapshot(PermissionsState.permissions) 
          && this.store.selectSnapshot(PermissionsState.permissions).length > 0
        ) {
          this.createItems(this.store.selectSnapshot(PermissionsState.permissions));
          return;
        }

        this.spinnerService.hideSpinner(500);
      },
      error: () => {
        this.spinnerService.hideSpinner(500);
      },
    }));
  }

  createPermission($ev: ScoCallback<Permission>) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new CreatePermission({ permission: $ev.item })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(PermissionsState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(PermissionsState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(PermissionsState.successMsg),
        );

        this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
        $ev.callBack();
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(PermissionsState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  editPermission(_id: string, $ev: ScoCallback<Permission>) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new EditPermission({ _id: _id, permission: $ev.item })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(PermissionsState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(PermissionsState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(PermissionsState.successMsg),
        );

        this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
        $ev.callBack();
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(PermissionsState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  deletePermission($ev: Permission) {
    this.spinnerService.showSpinner();
    this.store.dispatch(new DeletePermission({ _id: $ev._id })).subscribe({
      next: () => {
        this.spinnerService.hideSpinner(500);

        const success: boolean = this.store.selectSnapshot(PermissionsState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate("label.error"),
            this.store.selectSnapshot(PermissionsState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate("label.success"),
          this.store.selectSnapshot(PermissionsState.successMsg),
        );
      },
      error: (err) => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate("label.error"),
          this.store.selectSnapshot(PermissionsState.errorMsg),
        );

        this.spinnerService.hideSpinner(500);
      },
    });
  }

  /* Filter functions */
  search() {
    this.store.dispatch(new FetchPermissions({ filter: this.filter }));
  }

  clearFilter() {
    this.filter = new PermissionFilter();
    this.search();
  }

  /* Form Crud */
  onDownloadExcel($event: boolean) {
    if (!this.tableItems || (this.tableItems && this.tableItems.length == 0)  || !$event) {
      return;
    }

    const permissions: Permission[] = this.tableItems.map((data) => {
      return data.item;
    });

    // Create Excel Dto For Transfer To Backend
    const excelDto: Excel = {
      columns: [
        this.translateService.getTranslate('label.id'), 
        this.translateService.getTranslate('label.permissions.component.input.name'),
        this.translateService.getTranslate('label.created.at'),
        this.translateService.getTranslate('label.updated.at')
      ],
      data: permissions.map((data) => {
        return [
          data._id ? data._id : '--',
          data.name ? data.name : '--',
          data.createdAt ? moment(data.createdAt).format('DD/MM/yyyy HH:mm:ss') : '--',
          data.updatedAt ? moment(data.updatedAt).format('DD/MM/yyyy HH:mm:ss') : '--',
        ]
      }),
      workbook: XLSX.utils.book_new(),
      extension: ExcelExtensionEnum.XLSX,
      fileName: `permissions-${moment(new Date()).format('DD_MM_yyyy')}`
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

  onItemSelected($event: ScoSelectedItem<Permission>) {

  }

  onActionSelected($event: ScoAction<Permission>) {
    this.elementSelected = $event.item;

    if ($event.value == this.constantsService.ScoFormCrudConstants.UPDATE_ACTION) {
      this.mode = this.constantsService.ScoFormCrudConstants.MODE_UPDATE;
    }

    if ($event.value == this.constantsService.ScoFormCrudConstants.DELETE_ACTION) {

    }
  }

  onChangePage($event: number) {

  }

  onCloseOptions($event: MouseEvent) {

  }

  onGoToCreate($event: Permission) {
    this.formErrors = [];
    this.elementSelected = $event;
    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
  }

  onFormCancel($event: Permission) {
    this.elementSelected = $event;
    this.mode = this.constantsService.ScoFormCrudConstants.MODE_NEW;
  }

  onFormConfirm($event: ScoCallback<Permission>) {
    if (!this.validateDetailFormFields($event.item)) return;

    if (this.mode != this.constantsService.ScoFormCrudConstants.MODE_UPDATE) {
      this.createPermission($event);
    } else {
      this.editPermission(this.elementSelected._id, $event);
    }
  }

  onFormClose($event: Permission) {
    this.elementSelected = $event;
  }

  onConfirmDeleteModal($event: boolean) {
    if (!$event) return;

    this.deletePermission(cloneDeep(this.elementSelected));
    this.elementSelected = new Permission();
  }

  onCloseDeleteModal($event: boolean) {
    if (!$event) return;

    this.elementSelected = new Permission();
  }

  private createItems(permissions: Permission[]) {
    if (!permissions || (permissions && permissions.length == 0)) {
      if (this.spinnerService.show) {
        this.spinnerService.hideSpinner(500);
      }
      return;
    }

    for (const permission of permissions) {
      const actions: ScoAction<Permission>[] = [
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
        item: permission,
        actions: actions,
      });

      this.tableItems.push({
        item: permission,
        actions: actions,
        index: permissions.indexOf(permission),
      });
    }

    this.spinnerService.hideSpinner(500);
  }
  
  private validateDetailFormFields(permission: Permission): boolean {
    this.formErrors = [];

    if (!permission.name) {
      this.formErrors.push({ 
        formControlName: 'name', 
        error: this.translateService.getTranslate('label.validation.permission.name'),
      });
    }

    if (this.formErrors && this.formErrors.length > 0) {
      return false;
    }

    return true;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu/menu.service';
import { HttpErrorsService } from './http-error/http-errors.service';
import { HasPermissionPipe } from './has-permission/has-permission.pipe';
import { UtilsService } from './utils/utils.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HasPermissionPipe,
  ],
  exports: [
    HasPermissionPipe,
  ],
  providers: [
    MenuService,
    HttpErrorsService,
    UtilsService,
  ]
})
export class SharedModule { }

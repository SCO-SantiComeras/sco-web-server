import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ExcelState } from './store/excel.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from './excel.service';
import { ScoAngularComponentsModule } from 'sco-angular-components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoAngularComponentsModule,
    SharedModule,
    NgxsModule.forFeature(
      [
        ExcelState,
      ]
    )
  ],
  declarations: [
    
  ],
  exports: [
    
  ],
  providers:[
    ExcelService,
  ]
})
export class ExcelModule { }

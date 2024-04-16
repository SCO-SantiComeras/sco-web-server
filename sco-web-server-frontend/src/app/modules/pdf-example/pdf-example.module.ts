import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExampleComponent } from './pdf-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoAngularComponentsModule } from 'sco-angular-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoAngularComponentsModule,
    SharedModule,
  ],
  declarations: [
    PdfExampleComponent,
  ],
  exports: [
    PdfExampleComponent,
  ],
  providers: [

  ]
})
export class PdfExampleModule { }

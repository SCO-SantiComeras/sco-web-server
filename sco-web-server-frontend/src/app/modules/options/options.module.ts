import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoAngularComponentsModule } from 'sco-angular-components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoAngularComponentsModule,
    SharedModule,
  ],
  declarations: [
    OptionsComponent
  ],
  exports: [
    OptionsComponent,
  ],
  providers: [
    
  ]
})
export class OptionsModule { }

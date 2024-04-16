import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { SharedModule } from '../shared/shared.module';
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
    ResumeComponent,
  ],
  exports: [
    ResumeComponent,
  ],
  providers: [
    TitleCasePipe,
    DatePipe,
  ]
})
export class ResumeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { EmailerState } from './store/emailer.state';
import { ScoAngularComponentsModule } from 'sco-angular-components';
import { EmailerService } from './emailer.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ScoAngularComponentsModule,
    NgxsModule.forFeature(
      [
        EmailerState
      ]
    ),
  ],
  declarations: [
    
  ],
  exports: [
    
  ],
  providers:[
    EmailerService,
  ]
})

export class EmailerModule { }

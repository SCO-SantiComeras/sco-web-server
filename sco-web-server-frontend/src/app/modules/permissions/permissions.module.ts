import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsService } from './permissions.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { PermissionsState } from './store/permissions.state';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { ScoAngularComponentsModule, ScoJoinPipe } from 'sco-angular-components';
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
        PermissionsState
      ]
    )
  ],
  declarations: [
    PermissionsComponent
  ],
  exports: [
    PermissionsComponent
  ],
  providers:[
    PermissionsService,
    ScoJoinPipe,
  ]
})
export class PermissionsModule { }

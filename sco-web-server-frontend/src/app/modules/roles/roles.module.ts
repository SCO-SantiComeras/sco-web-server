import { SharedModule } from './../shared/shared.module';
import { RolesComponent } from './components/roles/roles.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { RoleState } from './store/roles.state';
import { RolesService } from './roles.service';
import { ScoAngularComponentsModule, ScoJoinPipe } from 'sco-angular-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoAngularComponentsModule,
    SharedModule,
    NgxsModule.forFeature(
      [
        RoleState
      ]
    )
  ],
  declarations: [
    RolesComponent,
  ],
  exports: [
    RolesComponent
  ],
  providers: [
    RolesService,
    ScoJoinPipe
  ]
})
export class RolesModule { }

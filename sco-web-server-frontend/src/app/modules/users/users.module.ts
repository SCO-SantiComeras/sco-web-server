import { SharedModule } from './../shared/shared.module';
import { UsersService } from './users.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './store/users.state';
import { UsersComponent } from './components/users/users.component';
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
        UsersState,
      ]
    )
  ],
  declarations: [
    UsersComponent,
  ],
  exports: [
    UsersComponent,
  ],
  providers: [
    UsersService,
    ScoJoinPipe,
  ],
})

export class UsersModule {}
